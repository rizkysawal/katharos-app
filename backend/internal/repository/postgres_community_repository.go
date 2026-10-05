package repository

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"katharos-backend/internal/model"
)

type PostgresCommunityRepository struct {
	db *sql.DB
}

func NewPostgresCommunityRepository(db *sql.DB) *PostgresCommunityRepository {
	return &PostgresCommunityRepository{db: db}
}

func (r *PostgresCommunityRepository) GetTodayDevotional(ctx context.Context) (*model.Devotional, error) {
	// First attempt: match current date
	queryToday := `
		SELECT 
			id,
			to_char(publish_date, 'YYYY-MM-DD'),
			title,
			COALESCE(author, ''),
			COALESCE(passage_ref, ''),
			COALESCE(passage_text, ''),
			content,
			COALESCE(quote, ''),
			COALESCE(prayer, ''),
			COALESCE(image_url, ''),
			COALESCE(status, 'published'),
			created_at,
			updated_at
		FROM devotionals
		WHERE publish_date = CURRENT_DATE
		LIMIT 1;
	`
	var d model.Devotional
	err := r.db.QueryRowContext(ctx, queryToday).Scan(
		&d.ID,
		&d.PublishDate,
		&d.Title,
		&d.Author,
		&d.PassageRef,
		&d.PassageText,
		&d.Content,
		&d.Quote,
		&d.Prayer,
		&d.ImageURL,
		&d.Status,
		&d.CreatedAt,
		&d.UpdatedAt,
	)
	if err == nil {
		return &d, nil
	}

	// Fallback to latest available devotional if today's is not yet posted
	queryLatest := `
		SELECT 
			id,
			to_char(publish_date, 'YYYY-MM-DD'),
			title,
			COALESCE(author, ''),
			COALESCE(passage_ref, ''),
			COALESCE(passage_text, ''),
			content,
			COALESCE(quote, ''),
			COALESCE(prayer, ''),
			COALESCE(image_url, ''),
			COALESCE(status, 'published'),
			created_at,
			updated_at
		FROM devotionals
		ORDER BY publish_date DESC
		LIMIT 1;
	`
	errLatest := r.db.QueryRowContext(ctx, queryLatest).Scan(
		&d.ID,
		&d.PublishDate,
		&d.Title,
		&d.Author,
		&d.PassageRef,
		&d.PassageText,
		&d.Content,
		&d.Quote,
		&d.Prayer,
		&d.ImageURL,
		&d.Status,
		&d.CreatedAt,
		&d.UpdatedAt,
	)
	if errLatest != nil {
		if errLatest == sql.ErrNoRows {
			return nil, fmt.Errorf("no devotionals found")
		}
		return nil, fmt.Errorf("failed to get devotional: %w", errLatest)
	}

	return &d, nil
}

func (r *PostgresCommunityRepository) GetDevotionalsArchive(ctx context.Context, month, year int) ([]model.Devotional, error) {
	if year <= 0 {
		year = time.Now().Year()
	}

	var query string
	var args []interface{}

	if month > 0 && month <= 12 {
		query = `
			SELECT 
				id,
				to_char(publish_date, 'YYYY-MM-DD'),
				title,
				COALESCE(author, ''),
				COALESCE(passage_ref, ''),
				COALESCE(passage_text, ''),
				content,
				COALESCE(quote, ''),
				COALESCE(prayer, ''),
				COALESCE(image_url, ''),
				COALESCE(status, 'published'),
				created_at,
				updated_at
			FROM devotionals
			WHERE EXTRACT(MONTH FROM publish_date) = $1 
			  AND EXTRACT(YEAR FROM publish_date) = $2
			ORDER BY publish_date DESC;
		`
		args = []interface{}{month, year}
	} else {
		query = `
			SELECT 
				id,
				to_char(publish_date, 'YYYY-MM-DD'),
				title,
				COALESCE(author, ''),
				COALESCE(passage_ref, ''),
				COALESCE(passage_text, ''),
				content,
				COALESCE(quote, ''),
				COALESCE(prayer, ''),
				COALESCE(image_url, ''),
				COALESCE(status, 'published'),
				created_at,
				updated_at
			FROM devotionals
			WHERE EXTRACT(YEAR FROM publish_date) = $1
			ORDER BY publish_date DESC;
		`
		args = []interface{}{year}
	}

	rows, err := r.db.QueryContext(ctx, query, args...)
	if err != nil {
		return nil, fmt.Errorf("failed to query devotionals archive: %w", err)
	}
	defer rows.Close()

	var items []model.Devotional
	for rows.Next() {
		var d model.Devotional
		if err := rows.Scan(
			&d.ID,
			&d.PublishDate,
			&d.Title,
			&d.Author,
			&d.PassageRef,
			&d.PassageText,
			&d.Content,
			&d.Quote,
			&d.Prayer,
			&d.ImageURL,
			&d.Status,
			&d.CreatedAt,
			&d.UpdatedAt,
		); err != nil {
			return nil, fmt.Errorf("failed to scan devotional: %w", err)
		}
		items = append(items, d)
	}
	if items == nil {
		items = []model.Devotional{}
	}

	return items, nil
}

func (r *PostgresCommunityRepository) CreateDevotional(ctx context.Context, d *model.Devotional) error {
	status := d.Status
	if status == "" {
		status = "published"
	}
	query := `
		INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP)
		ON CONFLICT (publish_date) DO UPDATE
		SET title = EXCLUDED.title,
		    author = EXCLUDED.author,
		    passage_ref = EXCLUDED.passage_ref,
		    passage_text = EXCLUDED.passage_text,
		    content = EXCLUDED.content,
		    quote = EXCLUDED.quote,
		    prayer = EXCLUDED.prayer,
		    image_url = EXCLUDED.image_url,
		    status = EXCLUDED.status,
		    updated_at = CURRENT_TIMESTAMP
		RETURNING id, created_at, updated_at;
	`
	return r.db.QueryRowContext(
		ctx,
		query,
		d.PublishDate,
		d.Title,
		d.Author,
		d.PassageRef,
		d.PassageText,
		d.Content,
		d.Quote,
		d.Prayer,
		d.ImageURL,
		status,
	).Scan(&d.ID, &d.CreatedAt, &d.UpdatedAt)
}

func (r *PostgresCommunityRepository) GetUpcomingEvents(ctx context.Context, limit int) ([]model.Event, error) {
	if limit <= 0 || limit > 50 {
		limit = 10
	}

	query := `
		SELECT 
			id,
			title,
			COALESCE(category, 'General'),
			start_time,
			end_time,
			COALESCE(location, ''),
			COALESCE(google_maps_url, ''),
			COALESCE(speaker, ''),
			COALESCE(notes, ''),
			is_alert,
			created_at
		FROM events
		WHERE start_time >= (NOW() - INTERVAL '6 hours')
		ORDER BY start_time ASC
		LIMIT $1;
	`
	rows, err := r.db.QueryContext(ctx, query, limit)
	if err != nil {
		return nil, fmt.Errorf("failed to query upcoming events: %w", err)
	}
	defer rows.Close()

	var events []model.Event
	for rows.Next() {
		var e model.Event
		if err := rows.Scan(
			&e.ID,
			&e.Title,
			&e.Category,
			&e.StartTime,
			&e.EndTime,
			&e.Location,
			&e.GoogleMapsURL,
			&e.Speaker,
			&e.Notes,
			&e.IsAlert,
			&e.CreatedAt,
		); err != nil {
			return nil, fmt.Errorf("failed to scan event: %w", err)
		}
		events = append(events, e)
	}
	if events == nil {
		events = []model.Event{}
	}

	return events, nil
}

func (r *PostgresCommunityRepository) CreateEvent(ctx context.Context, e *model.Event) error {
	query := `
		INSERT INTO events (title, category, start_time, end_time, location, google_maps_url, speaker, notes, is_alert)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id, created_at;
	`
	return r.db.QueryRowContext(
		ctx,
		query,
		e.Title,
		e.Category,
		e.StartTime,
		e.EndTime,
		e.Location,
		e.GoogleMapsURL,
		e.Speaker,
		e.Notes,
		e.IsAlert,
	).Scan(&e.ID, &e.CreatedAt)
}
