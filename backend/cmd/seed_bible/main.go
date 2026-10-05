package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"flag"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	_ "github.com/lib/pq"
	"katharos-backend/internal/config"
)

const defaultDatasetURL = "https://raw.githubusercontent.com/jameschristianw/alkitab-data/main/books/v1/Alkitab.json"

type CanonicalBook struct {
	OrderNum      int
	Code          string
	Name          string
	Abbreviation  string
	Testament     string
	TotalChapters int
}

var canonicalBooks = []CanonicalBook{
	{1, "GEN", "Kejadian", "Kej", "OT", 50},
	{2, "EXO", "Keluaran", "Kel", "OT", 40},
	{3, "LEV", "Imamat", "Im", "OT", 27},
	{4, "NUM", "Bilangan", "Bil", "OT", 36},
	{5, "DEU", "Ulangan", "Ul", "OT", 34},
	{6, "JOS", "Yosua", "Yos", "OT", 24},
	{7, "JDG", "Hakim-hakim", "Hak", "OT", 21},
	{8, "RUT", "Rut", "Rut", "OT", 4},
	{9, "1SA", "1 Samuel", "1Sam", "OT", 31},
	{10, "2SA", "2 Samuel", "2Sam", "OT", 24},
	{11, "1KI", "1 Raja-raja", "1Raj", "OT", 22},
	{12, "2KI", "2 Raja-raja", "2Raj", "OT", 25},
	{13, "1CH", "1 Tawarikh", "1Taw", "OT", 29},
	{14, "2CH", "2 Tawarikh", "2Taw", "OT", 36},
	{15, "EZR", "Ezra", "Ezr", "OT", 10},
	{16, "NEH", "Nehemia", "Neh", "OT", 13},
	{17, "EST", "Ester", "Est", "OT", 10},
	{18, "JOB", "Ayub", "Ayb", "OT", 42},
	{19, "PSA", "Mazmur", "Mzm", "OT", 150},
	{20, "PRO", "Amsal", "Ams", "OT", 31},
	{21, "ECC", "Pengkhotbah", "Pkh", "OT", 12},
	{22, "SNG", "Kidung Agung", "Kid", "OT", 8},
	{23, "ISA", "Yesaya", "Yes", "OT", 66},
	{24, "JER", "Yeremia", "Yer", "OT", 52},
	{25, "LAM", "Ratapan", "Rat", "OT", 5},
	{26, "EZK", "Yehezkiel", "Yeh", "OT", 48},
	{27, "DAN", "Daniel", "Dan", "OT", 12},
	{28, "HOS", "Hosea", "Hos", "OT", 14},
	{29, "JOL", "Yoel", "Yl", "OT", 3},
	{30, "AMO", "Amos", "Am", "OT", 9},
	{31, "OBA", "Obaja", "Ob", "OT", 1},
	{32, "JON", "Yunus", "Yun", "OT", 4},
	{33, "MIC", "Mikha", "Mik", "OT", 7},
	{34, "NAM", "Nahum", "Nah", "OT", 3},
	{35, "HAB", "Habakuk", "Hab", "OT", 3},
	{36, "ZEP", "Zefanya", "Zef", "OT", 3},
	{37, "HAG", "Hagai", "Hag", "OT", 2},
	{38, "ZEC", "Zakharia", "Za", "OT", 14},
	{39, "MAL", "Maleakhi", "Mal", "OT", 4},
	{40, "MAT", "Matius", "Mat", "NT", 28},
	{41, "MRK", "Markus", "Mrk", "NT", 16},
	{42, "LUK", "Lukas", "Luk", "NT", 24},
	{43, "JHN", "Yohanes", "Yoh", "NT", 21},
	{44, "ACT", "Kisah Para Rasul", "Kis", "NT", 28},
	{45, "ROM", "Roma", "Rm", "NT", 16},
	{46, "1CO", "1 Korintus", "1Kor", "NT", 16},
	{47, "2CO", "2 Korintus", "2Kor", "NT", 13},
	{48, "GAL", "Galatia", "Gal", "NT", 6},
	{49, "EPH", "Efesus", "Ef", "NT", 6},
	{50, "PHP", "Filipi", "Flp", "NT", 4},
	{51, "COL", "Kolose", "Kol", "NT", 4},
	{52, "1TH", "1 Tesalonika", "1Tes", "NT", 5},
	{53, "2TH", "2 Tesalonika", "2Tes", "NT", 3},
	{54, "1TI", "1 Timotius", "1Tim", "NT", 6},
	{55, "2TI", "2 Timotius", "2Tim", "NT", 4},
	{56, "TIT", "Titus", "Tit", "NT", 3},
	{57, "PHM", "Filemon", "Flm", "NT", 1},
	{58, "HEB", "Ibrani", "Ibr", "NT", 13},
	{59, "JAS", "Yakobus", "Yak", "NT", 5},
	{60, "1PE", "1 Petrus", "1Ptr", "NT", 5},
	{61, "2PE", "2 Petrus", "2Ptr", "NT", 3},
	{62, "1JN", "1 Yohanes", "1Yoh", "NT", 5},
	{63, "2JN", "2 Yohanes", "2Yoh", "NT", 1},
	{64, "3JN", "3 Yohanes", "3Yoh", "NT", 1},
	{65, "JUD", "Yudas", "Yud", "NT", 1},
	{66, "REV", "Wahyu", "Why", "NT", 22},
}

type DatasetVerse struct {
	Number int    `json:"number"`
	Title  string `json:"title"`
	Text   string `json:"text"`
}

type DatasetChapter struct {
	ChapterNumber int            `json:"chapter_number"`
	Verses        []DatasetVerse `json:"verses"`
}

type DatasetBook struct {
	BookName     string           `json:"bookname"`
	ChapterCount int              `json:"chapter_count"`
	BookNumber   int              `json:"book_number"`
	Chapters     []DatasetChapter `json:"chapters"`
}

type DatasetRoot struct {
	Type  string `json:"type"`
	Books struct {
		OldTestament []DatasetBook `json:"old_testament"`
		NewTestament []DatasetBook `json:"new_testament"`
	} `json:"books"`
}

func main() {
	cfg := config.Load()

	datasetURL := flag.String("url", defaultDatasetURL, "URL dataset JSON Alkitab TB")
	localFile := flag.String("file", os.Getenv("BIBLE_JSON_PATH"), "Path ke file JSON lokal (opsional)")
	batchSize := flag.Int("batch-size", 500, "Ukuran batch insert ayat per transaksi")
	flag.Parse()

	log.Println("[Katharos Seeder] Memulai automated Bible TB Seeder...")

	// 1. Unduh atau baca dataset JSON
	var rawData []byte
	var err error

	if *localFile != "" && fileExists(*localFile) {
		log.Printf("[Katharos Seeder] Membaca dataset dari file lokal: %s", *localFile)
		rawData, err = os.ReadFile(*localFile)
		if err != nil {
			log.Fatalf("[Katharos Seeder ERROR] Gagal membaca file %s: %v", *localFile, err)
		}
	} else {
		log.Printf("[Katharos Seeder] Mengunduh dataset dari: %s", *datasetURL)
		client := &http.Client{Timeout: 60 * time.Second}
		req, _ := http.NewRequestWithContext(context.Background(), http.MethodGet, *datasetURL, nil)
		req.Header.Set("User-Agent", "Katharos-Bible-Seeder/1.0")

		resp, err := client.Do(req)
		if err != nil {
			log.Fatalf("[Katharos Seeder ERROR] Gagal mengunduh dataset: %v", err)
		}
		defer resp.Body.Close()

		if resp.StatusCode != http.StatusOK {
			log.Fatalf("[Katharos Seeder ERROR] Server dataset mengembalikan status HTTP %d", resp.StatusCode)
		}

		rawData, err = io.ReadAll(resp.Body)
		if err != nil {
			log.Fatalf("[Katharos Seeder ERROR] Gagal membaca stream unduhan: %v", err)
		}
		log.Printf("[Katharos Seeder] Unduhan selesai (%.2f MB).", float64(len(rawData))/1024/1024)
	}

	// 2. Parse JSON
	var dataset DatasetRoot
	if err := json.Unmarshal(rawData, &dataset); err != nil {
		log.Fatalf("[Katharos Seeder ERROR] Gagal parse JSON dataset: %v", err)
	}

	var allBooks []DatasetBook
	allBooks = append(allBooks, dataset.Books.OldTestament...)
	allBooks = append(allBooks, dataset.Books.NewTestament...)

	log.Printf("[Katharos Seeder] Terbaca %d kitab dari dataset.", len(allBooks))

	// 3. Hubungkan ke PostgreSQL
	dbDSN := cfg.DSN()
	log.Printf("[Katharos Seeder] Menghubungkan ke PostgreSQL: host=%s port=%s dbname=%s user=%s...",
		cfg.DBHost, cfg.DBPort, cfg.DBName, cfg.DBUser)

	db, err := sql.Open("postgres", dbDSN)
	if err != nil {
		log.Fatalf("[Katharos Seeder ERROR] Gagal inisialisasi koneksi db: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("[Katharos Seeder ERROR] Database ping gagal: %v", err)
	}
	log.Println("[Katharos Seeder] Terhubung ke PostgreSQL dengan sukses.")

	startTime := time.Now()
	ctx := context.Background()

	// A. Upsert Translation 'TB'
	var tbID int
	err = db.QueryRowContext(ctx, `
		INSERT INTO translations (code, name, language)
		VALUES ('TB', 'Terjemahan Baru (LAI)', 'id')
		ON CONFLICT (code) DO UPDATE
		SET name = EXCLUDED.name, language = EXCLUDED.language
		RETURNING id;
	`).Scan(&tbID)
	if err != nil {
		log.Fatalf("[Katharos Seeder ERROR] Gagal upsert translations TB: %v", err)
	}
	log.Printf("[Katharos Seeder] Translation 'TB' siap (ID: %d).", tbID)

	// B. Upsert 66 Books
	log.Println("[Katharos Seeder] Menyiapkan 66 kitab kanonikal...")
	for _, cb := range canonicalBooks {
		_, err := db.ExecContext(ctx, `
			INSERT INTO books (translation_id, order_num, code, name, abbreviation, testament, total_chapters)
			VALUES ($1, $2, $3, $4, $5, $6, $7)
			ON CONFLICT (translation_id, code) DO UPDATE
			SET order_num = EXCLUDED.order_num,
				name = EXCLUDED.name,
				abbreviation = EXCLUDED.abbreviation,
				testament = EXCLUDED.testament,
				total_chapters = EXCLUDED.total_chapters;
		`, tbID, cb.OrderNum, cb.Code, cb.Name, cb.Abbreviation, cb.Testament, cb.TotalChapters)
		if err != nil {
			log.Fatalf("[Katharos Seeder ERROR] Gagal upsert book %s: %v", cb.Code, err)
		}
	}

	// Fetch mapping order_num -> book_id
	rows, err := db.QueryContext(ctx, `SELECT order_num, id FROM books WHERE translation_id = $1`, tbID)
	if err != nil {
		log.Fatalf("[Katharos Seeder ERROR] Gagal query books: %v", err)
	}
	orderToBookID := make(map[int]int)
	for rows.Next() {
		var o, id int
		if err := rows.Scan(&o, &id); err == nil {
			orderToBookID[o] = id
		}
	}
	rows.Close()

	// C. Upsert Chapters
	log.Println("[Katharos Seeder] Menyiapkan seluruh pasal (chapters)...")
	tx, err := db.BeginTx(ctx, nil)
	if err != nil {
		log.Fatalf("[Katharos Seeder ERROR] Gagal memulai transaksi: %v", err)
	}

	stmtCh, err := tx.PrepareContext(ctx, `
		INSERT INTO chapters (book_id, chapter_number)
		VALUES ($1, $2)
		ON CONFLICT (book_id, chapter_number) DO NOTHING;
	`)
	if err != nil {
		tx.Rollback()
		log.Fatalf("[Katharos Seeder ERROR] Gagal prepare stmt chapter: %v", err)
	}

	for _, b := range allBooks {
		bookID, ok := orderToBookID[b.BookNumber]
		if !ok {
			continue
		}
		for _, ch := range b.Chapters {
			if _, err := stmtCh.ExecContext(ctx, bookID, ch.ChapterNumber); err != nil {
				tx.Rollback()
				log.Fatalf("[Katharos Seeder ERROR] Gagal insert chapter: %v", err)
			}
		}
	}
	stmtCh.Close()
	if err := tx.Commit(); err != nil {
		log.Fatalf("[Katharos Seeder ERROR] Gagal commit chapters: %v", err)
	}

	// Query chapter_id mapping: key is "bookID:chapterNumber"
	chRows, err := db.QueryContext(ctx, `
		SELECT c.book_id, c.chapter_number, c.id
		FROM chapters c
		JOIN books b ON c.book_id = b.id
		WHERE b.translation_id = $1;
	`, tbID)
	if err != nil {
		log.Fatalf("[Katharos Seeder ERROR] Gagal query chapters mapping: %v", err)
	}
	chMap := make(map[string]int)
	for chRows.Next() {
		var bID, chNum, chID int
		if err := chRows.Scan(&bID, &chNum, &chID); err == nil {
			key := fmt.Sprintf("%d:%d", bID, chNum)
			chMap[key] = chID
		}
	}
	chRows.Close()
	log.Printf("[Katharos Seeder] Terdaftar %d pasal di database.", len(chMap))

	// D. Collect and Batch Insert Verses
	type VerseRecord struct {
		ChapterID   int
		VerseNumber int
		Text        string
	}

	var allVerses []VerseRecord
	for _, b := range allBooks {
		bookID, ok := orderToBookID[b.BookNumber]
		if !ok {
			continue
		}
		for _, ch := range b.Chapters {
			key := fmt.Sprintf("%d:%d", bookID, ch.ChapterNumber)
			chID, ok := chMap[key]
			if !ok {
				continue
			}
			for _, v := range ch.Verses {
				cleanText := strings.TrimSpace(v.Text)
				if v.Number > 0 && cleanText != "" {
					allVerses = append(allVerses, VerseRecord{
						ChapterID:   chID,
						VerseNumber: v.Number,
						Text:        cleanText,
					})
				}
			}
		}
	}

	totalVerses := len(allVerses)
	log.Printf("[Katharos Seeder] Total ayat siap insert: %d", totalVerses)

	insertedCount := 0
	bSize := *batchSize
	if bSize <= 0 {
		bSize = 500
	}

	for i := 0; i < totalVerses; i += bSize {
		end := i + bSize
		if end > totalVerses {
			end = totalVerses
		}
		batch := allVerses[i:end]

		// Build multi-row parameterized query
		var queryBuilder strings.Builder
		queryBuilder.WriteString("INSERT INTO verses (chapter_id, verse_number, text) VALUES ")
		args := make([]interface{}, 0, len(batch)*3)

		for idx, v := range batch {
			if idx > 0 {
				queryBuilder.WriteString(", ")
			}
			p1 := idx*3 + 1
			p2 := idx*3 + 2
			p3 := idx*3 + 3
			queryBuilder.WriteString(fmt.Sprintf("($%d, $%d, $%d)", p1, p2, p3))
			args = append(args, v.ChapterID, v.VerseNumber, v.Text)
		}

		queryBuilder.WriteString(" ON CONFLICT (chapter_id, verse_number) DO UPDATE SET text = EXCLUDED.text;")

		if _, err := db.ExecContext(ctx, queryBuilder.String(), args...); err != nil {
			log.Fatalf("[Katharos Seeder ERROR] Gagal insert batch ayat [%d..%d]: %v", i, end, err)
		}

		insertedCount += len(batch)
		pct := (float64(insertedCount) / float64(totalVerses)) * 100.0
		log.Printf("  -> Progress: %d / %d ayat (%.1f%%)...", insertedCount, totalVerses, pct)
	}

	elapsed := time.Since(startTime)
	log.Printf("\n========================================================")
	log.Printf("[Katharos Seeder SUKSES] Selesai dalam %v!", elapsed.Round(time.Millisecond))
	log.Printf("Data Alkitab Terjemahan Baru (TB):")
	log.Printf(" - 66 Kitab Kanonikal")
	log.Printf(" - %d Pasal (Chapters)", len(chMap))
	log.Printf(" - %d Ayat (Verses) tersimpan lengkap di katharos_db!", totalVerses)
	log.Printf("========================================================\n")
}

func fileExists(path string) bool {
	info, err := os.Stat(path)
	if err != nil {
		return false
	}
	return !info.IsDir()
}
