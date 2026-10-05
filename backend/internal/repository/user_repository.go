package repository

import (
	"context"
	"katharos-backend/internal/model"
)

type UserRepository interface {
	GetUserByEmail(ctx context.Context, email string) (*model.User, error)
	GetUserByID(ctx context.Context, id int) (*model.User, error)
	UpsertGoogleUser(ctx context.Context, googleID, email, fullName, avatarURL string) (*model.User, error)
	CreateUser(ctx context.Context, u *model.User) error
	GetAllUsers(ctx context.Context) ([]model.User, error)
}
