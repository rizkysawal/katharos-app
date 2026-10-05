package model

import "time"

type Translation struct {
	ID        int       `json:"id"`
	Code      string    `json:"code"`
	Name      string    `json:"name"`
	Language  string    `json:"language"`
	CreatedAt time.Time `json:"created_at"`
}

type Book struct {
	ID            int    `json:"id"`
	TranslationID int    `json:"translation_id"`
	OrderNum      int    `json:"order_num"`
	Code          string `json:"code"`
	Name          string `json:"name"`
	Abbreviation  string `json:"abbreviation"`
	Testament     string `json:"testament"`
	TotalChapters int    `json:"total_chapters"`
}

type Chapter struct {
	ID            int `json:"id"`
	BookID        int `json:"book_id"`
	ChapterNumber int `json:"chapter_number"`
}

type Verse struct {
	ID          int64  `json:"id"`
	VerseNumber int    `json:"verse_number"`
	Text        string `json:"text"`
}

type ChapterRef struct {
	BookCode      string `json:"book_code"`
	BookName      string `json:"book_name"`
	ChapterNumber int    `json:"chapter_number"`
}

type ChapterNavigation struct {
	Prev *ChapterRef `json:"prev"`
	Next *ChapterRef `json:"next"`
}

type ReadChapterResponse struct {
	Translation Translation        `json:"translation"`
	Book        Book               `json:"book"`
	Chapter     int                `json:"chapter"`
	Verses      []Verse            `json:"verses"`
	Navigation  ChapterNavigation  `json:"navigation"`
}

type SearchVerseItem struct {
	VerseID       int64  `json:"verse_id"`
	Translation   string `json:"translation"`
	BookCode      string `json:"book_code"`
	BookName      string `json:"book_name"`
	ChapterNumber int    `json:"chapter_number"`
	VerseNumber   int    `json:"verse_number"`
	Text          string `json:"text"`
}

type SearchResult struct {
	Query       string            `json:"query"`
	Translation string            `json:"translation"`
	Total       int               `json:"total"`
	Page        int               `json:"page"`
	Limit       int               `json:"limit"`
	TotalPages  int               `json:"total_pages"`
	Items       []SearchVerseItem `json:"items"`
}

type HealthResponse struct {
	Status    string    `json:"status"`
	Database  string    `json:"database"`
	Timestamp time.Time `json:"timestamp"`
}
