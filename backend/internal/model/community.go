package model

import "time"

type Devotional struct {
	ID          int       `json:"id"`
	PublishDate string    `json:"publish_date"` // YYYY-MM-DD
	Title       string    `json:"title"`
	Author      string    `json:"author"`
	PassageRef  string    `json:"passage_ref"`
	PassageText string    `json:"passage_text"`
	Content     string    `json:"content"`
	Prayer      string    `json:"prayer"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Event struct {
	ID            int        `json:"id"`
	Title         string     `json:"title"`
	Category      string     `json:"category"`
	StartTime     time.Time  `json:"start_time"`
	EndTime       *time.Time `json:"end_time"`
	Location      string     `json:"location"`
	GoogleMapsURL string     `json:"google_maps_url"`
	Speaker       string     `json:"speaker"`
	Notes         string     `json:"notes"`
	IsAlert       bool       `json:"is_alert"`
	CreatedAt     time.Time  `json:"created_at"`
}
