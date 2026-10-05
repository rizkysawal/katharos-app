package repository

import (
	"context"
	"katharos-backend/internal/model"
)

type BibleRepository interface {
	GetTranslations(ctx context.Context) ([]model.Translation, error)
	GetBooks(ctx context.Context, translationCode string) ([]model.Book, error)
	GetChapterVerses(ctx context.Context, translationCode, bookIdentifier string, chapterNumber int) (*model.ReadChapterResponse, error)
	SearchVerses(ctx context.Context, translationCode, query string, page, limit int) (*model.SearchResult, error)
	Ping(ctx context.Context) error
}
