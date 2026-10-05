package repository

import (
	"context"
	"database/sql"
	"fmt"
	"math"
	"strconv"
	"strings"

	"katharos-backend/internal/model"
)

type PostgresBibleRepository struct {
	db *sql.DB
}

func NewPostgresBibleRepository(db *sql.DB) *PostgresBibleRepository {
	return &PostgresBibleRepository{db: db}
}

func (r *PostgresBibleRepository) Ping(ctx context.Context) error {
	return r.db.PingContext(ctx)
}

func (r *PostgresBibleRepository) GetTranslations(ctx context.Context) ([]model.Translation, error) {
	query := `
		SELECT id, code, name, language, created_at
		FROM translations
		ORDER BY id ASC;
	`
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to query translations: %w", err)
	}
	defer rows.Close()

	var translations []model.Translation
	for rows.Next() {
		var t model.Translation
		if err := rows.Scan(&t.ID, &t.Code, &t.Name, &t.Language, &t.CreatedAt); err != nil {
			return nil, fmt.Errorf("failed to scan translation: %w", err)
		}
		translations = append(translations, t)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return translations, nil
}

func (r *PostgresBibleRepository) GetBooks(ctx context.Context, translationCode string) ([]model.Book, error) {
	if translationCode == "" {
		translationCode = "TB"
	}

	query := `
		SELECT b.id, b.translation_id, b.order_num, b.code, b.name, b.abbreviation, b.testament, b.total_chapters
		FROM books b
		JOIN translations t ON b.translation_id = t.id
		WHERE t.code = $1
		ORDER BY b.order_num ASC;
	`
	rows, err := r.db.QueryContext(ctx, query, strings.ToUpper(translationCode))
	if err != nil {
		return nil, fmt.Errorf("failed to query books: %w", err)
	}
	defer rows.Close()

	var books []model.Book
	for rows.Next() {
		var b model.Book
		if err := rows.Scan(
			&b.ID,
			&b.TranslationID,
			&b.OrderNum,
			&b.Code,
			&b.Name,
			&b.Abbreviation,
			&b.Testament,
			&b.TotalChapters,
		); err != nil {
			return nil, fmt.Errorf("failed to scan book: %w", err)
		}
		books = append(books, b)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}
	return books, nil
}

func (r *PostgresBibleRepository) GetChapterVerses(
	ctx context.Context,
	translationCode, bookIdentifier string,
	chapterNumber int,
) (*model.ReadChapterResponse, error) {
	if translationCode == "" {
		translationCode = "TB"
	}
	if chapterNumber <= 0 {
		chapterNumber = 1
	}

	// 1. Get Translation
	var tr model.Translation
	err := r.db.QueryRowContext(ctx, `
		SELECT id, code, name, language, created_at
		FROM translations
		WHERE code = $1;
	`, strings.ToUpper(translationCode)).Scan(&tr.ID, &tr.Code, &tr.Name, &tr.Language, &tr.CreatedAt)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("translation '%s' not found", translationCode)
		}
		return nil, fmt.Errorf("failed to get translation: %w", err)
	}

	// 2. Identify Book (support code like GEN, abbreviation like Kej, order_num like 1, or name)
	var book model.Book
	var bookQuery string
	var bookArg interface{}

	trimmedBook := strings.TrimSpace(bookIdentifier)
	if orderVal, errOrder := strconv.Atoi(trimmedBook); errOrder == nil {
		bookQuery = `
			SELECT id, translation_id, order_num, code, name, abbreviation, testament, total_chapters
			FROM books
			WHERE translation_id = $1 AND order_num = $2;
		`
		bookArg = orderVal
	} else {
		bookQuery = `
			SELECT id, translation_id, order_num, code, name, abbreviation, testament, total_chapters
			FROM books
			WHERE translation_id = $1 AND (
				UPPER(code) = UPPER($2) OR 
				LOWER(abbreviation) = LOWER($2) OR 
				LOWER(name) = LOWER($2)
			);
		`
		bookArg = trimmedBook
	}

	err = r.db.QueryRowContext(ctx, bookQuery, tr.ID, bookArg).Scan(
		&book.ID,
		&book.TranslationID,
		&book.OrderNum,
		&book.Code,
		&book.Name,
		&book.Abbreviation,
		&book.Testament,
		&book.TotalChapters,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("book '%s' not found for translation '%s'", bookIdentifier, translationCode)
		}
		return nil, fmt.Errorf("failed to get book: %w", err)
	}

	// 3. Query Verses for this chapter
	verseQuery := `
		SELECT v.id, v.verse_number, v.text
		FROM verses v
		JOIN chapters c ON v.chapter_id = c.id
		WHERE c.book_id = $1 AND c.chapter_number = $2
		ORDER BY v.verse_number ASC;
	`
	rows, err := r.db.QueryContext(ctx, verseQuery, book.ID, chapterNumber)
	if err != nil {
		return nil, fmt.Errorf("failed to query verses: %w", err)
	}
	defer rows.Close()

	var verses []model.Verse
	for rows.Next() {
		var v model.Verse
		if err := rows.Scan(&v.ID, &v.VerseNumber, &v.Text); err != nil {
			return nil, fmt.Errorf("failed to scan verse: %w", err)
		}
		verses = append(verses, v)
	}
	if verses == nil {
		verses = []model.Verse{}
	}

	// 4. Calculate Navigation (Prev & Next)
	nav := model.ChapterNavigation{}

	// Previous Chapter
	if chapterNumber > 1 {
		nav.Prev = &model.ChapterRef{
			BookCode:      book.Code,
			BookName:      book.Name,
			ChapterNumber: chapterNumber - 1,
		}
	} else if book.OrderNum > 1 {
		// Look up previous book
		var prevBook model.Book
		errPrev := r.db.QueryRowContext(ctx, `
			SELECT code, name, total_chapters
			FROM books
			WHERE translation_id = $1 AND order_num = $2;
		`, tr.ID, book.OrderNum-1).Scan(&prevBook.Code, &prevBook.Name, &prevBook.TotalChapters)
		if errPrev == nil {
			nav.Prev = &model.ChapterRef{
				BookCode:      prevBook.Code,
				BookName:      prevBook.Name,
				ChapterNumber: prevBook.TotalChapters,
			}
		}
	}

	// Next Chapter
	if chapterNumber < book.TotalChapters {
		nav.Next = &model.ChapterRef{
			BookCode:      book.Code,
			BookName:      book.Name,
			ChapterNumber: chapterNumber + 1,
		}
	} else {
		// Look up next book
		var nextBook model.Book
		errNext := r.db.QueryRowContext(ctx, `
			SELECT code, name, total_chapters
			FROM books
			WHERE translation_id = $1 AND order_num = $2;
		`, tr.ID, book.OrderNum+1).Scan(&nextBook.Code, &nextBook.Name, &nextBook.TotalChapters)
		if errNext == nil {
			nav.Next = &model.ChapterRef{
				BookCode:      nextBook.Code,
				BookName:      nextBook.Name,
				ChapterNumber: 1,
			}
		}
	}

	return &model.ReadChapterResponse{
		Translation: tr,
		Book:        book,
		Chapter:     chapterNumber,
		Verses:      verses,
		Navigation:  nav,
	}, nil
}

func (r *PostgresBibleRepository) SearchVerses(
	ctx context.Context,
	translationCode, query string,
	page, limit int,
) (*model.SearchResult, error) {
	if translationCode == "" {
		translationCode = "TB"
	}
	if page < 1 {
		page = 1
	}
	if limit < 1 || limit > 100 {
		limit = 20
	}
	offset := (page - 1) * limit

	trimmedQuery := strings.TrimSpace(query)
	if trimmedQuery == "" {
		return &model.SearchResult{
			Query:       query,
			Translation: translationCode,
			Total:       0,
			Page:        page,
			Limit:       limit,
			TotalPages:  0,
			Items:       []model.SearchVerseItem{},
		}, nil
	}

	// Count query
	countSQL := `
		SELECT COUNT(v.id)
		FROM verses v
		JOIN chapters c ON v.chapter_id = c.id
		JOIN books b ON c.book_id = b.id
		JOIN translations t ON b.translation_id = t.id
		WHERE t.code = $1
		  AND (
			to_tsvector('simple', v.text) @@ plainto_tsquery('simple', $2)
			OR v.text ILIKE '%' || $2 || '%'
		  );
	`
	var total int
	err := r.db.QueryRowContext(ctx, countSQL, strings.ToUpper(translationCode), trimmedQuery).Scan(&total)
	if err != nil {
		return nil, fmt.Errorf("failed to count search results: %w", err)
	}

	// Fetch paginated items
	dataSQL := `
		SELECT 
			v.id,
			t.code,
			b.code,
			b.name,
			c.chapter_number,
			v.verse_number,
			v.text
		FROM verses v
		JOIN chapters c ON v.chapter_id = c.id
		JOIN books b ON c.book_id = b.id
		JOIN translations t ON b.translation_id = t.id
		WHERE t.code = $1
		  AND (
			to_tsvector('simple', v.text) @@ plainto_tsquery('simple', $2)
			OR v.text ILIKE '%' || $2 || '%'
		  )
		ORDER BY b.order_num ASC, c.chapter_number ASC, v.verse_number ASC
		LIMIT $3 OFFSET $4;
	`
	rows, err := r.db.QueryContext(ctx, dataSQL, strings.ToUpper(translationCode), trimmedQuery, limit, offset)
	if err != nil {
		return nil, fmt.Errorf("failed to query search verses: %w", err)
	}
	defer rows.Close()

	var items []model.SearchVerseItem
	for rows.Next() {
		var item model.SearchVerseItem
		if err := rows.Scan(
			&item.VerseID,
			&item.Translation,
			&item.BookCode,
			&item.BookName,
			&item.ChapterNumber,
			&item.VerseNumber,
			&item.Text,
		); err != nil {
			return nil, fmt.Errorf("failed to scan search verse: %w", err)
		}
		items = append(items, item)
	}
	if items == nil {
		items = []model.SearchVerseItem{}
	}

	totalPages := int(math.Ceil(float64(total) / float64(limit)))

	return &model.SearchResult{
		Query:       trimmedQuery,
		Translation: translationCode,
		Total:       total,
		Page:        page,
		Limit:       limit,
		TotalPages:  totalPages,
		Items:       items,
	}, nil
}
