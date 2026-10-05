package repository

import (
	"context"
	"katharos-backend/internal/model"
)

type CommunityRepository interface {
	GetTodayDevotional(ctx context.Context) (*model.Devotional, error)
	GetDevotionalsArchive(ctx context.Context, month, year int) ([]model.Devotional, error)
	CreateDevotional(ctx context.Context, d *model.Devotional) error
	GetUpcomingEvents(ctx context.Context, limit int) ([]model.Event, error)
	CreateEvent(ctx context.Context, e *model.Event) error
}
