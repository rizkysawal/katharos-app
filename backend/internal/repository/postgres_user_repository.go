package repository

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"katharos-backend/internal/model"
)

type PostgresUserRepository struct {
	db *sql.DB
}

func NewPostgresUserRepository(db *sql.DB) *PostgresUserRepository {
	return &PostgresUserRepository{db: db}
}

func (r *PostgresUserRepository) GetUserByEmail(ctx context.Context, email string) (*model.User, error) {
	query := `
		SELECT 
			id,
			email,
			COALESCE(password_hash, ''),
			google_id,
			full_name,
			COALESCE(avatar_url, ''),
			role,
			auth_provider,
			created_at
		FROM users
		WHERE LOWER(email) = LOWER($1);
	`
	var u model.User
	err := r.db.QueryRowContext(ctx, query, strings.TrimSpace(email)).Scan(
		&u.ID,
		&u.Email,
		&u.PasswordHash,
		&u.GoogleID,
		&u.FullName,
		&u.AvatarURL,
		&u.Role,
		&u.AuthProvider,
		&u.CreatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}
		return nil, fmt.Errorf("failed to query user: %w", err)
	}

	return &u, nil
}

func (r *PostgresUserRepository) GetUserByID(ctx context.Context, id int) (*model.User, error) {
	query := `
		SELECT 
			id,
			email,
			COALESCE(password_hash, ''),
			google_id,
			full_name,
			COALESCE(avatar_url, ''),
			role,
			auth_provider,
			created_at
		FROM users
		WHERE id = $1;
	`
	var u model.User
	err := r.db.QueryRowContext(ctx, query, id).Scan(
		&u.ID,
		&u.Email,
		&u.PasswordHash,
		&u.GoogleID,
		&u.FullName,
		&u.AvatarURL,
		&u.Role,
		&u.AuthProvider,
		&u.CreatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("user not found")
		}
		return nil, fmt.Errorf("failed to query user: %w", err)
	}

	return &u, nil
}

func (r *PostgresUserRepository) UpsertGoogleUser(ctx context.Context, googleID, email, fullName, avatarURL string) (*model.User, error) {
	cleanEmail := strings.ToLower(strings.TrimSpace(email))

	// Check if user already exists by google_id or email
	existing, err := r.GetUserByEmail(ctx, cleanEmail)
	if err == nil && existing != nil {
		// Update user info
		updateQuery := `
			UPDATE users
			SET full_name = $1,
			    avatar_url = $2,
			    google_id = COALESCE(google_id, $3)
			WHERE id = $4
			RETURNING id, email, COALESCE(password_hash, ''), google_id, full_name, COALESCE(avatar_url, ''), role, auth_provider, created_at;
		`
		var u model.User
		errUpdate := r.db.QueryRowContext(ctx, updateQuery, fullName, avatarURL, googleID, existing.ID).Scan(
			&u.ID,
			&u.Email,
			&u.PasswordHash,
			&u.GoogleID,
			&u.FullName,
			&u.AvatarURL,
			&u.Role,
			&u.AuthProvider,
			&u.CreatedAt,
		)
		if errUpdate != nil {
			return nil, fmt.Errorf("failed to update Google user: %w", errUpdate)
		}
		return &u, nil
	}

	// Insert brand new Google member
	insertQuery := `
		INSERT INTO users (email, google_id, full_name, avatar_url, role, auth_provider)
		VALUES ($1, $2, $3, $4, 'member', 'google')
		RETURNING id, email, COALESCE(password_hash, ''), google_id, full_name, COALESCE(avatar_url, ''), role, auth_provider, created_at;
	`
	var u model.User
	errInsert := r.db.QueryRowContext(ctx, insertQuery, cleanEmail, googleID, fullName, avatarURL).Scan(
		&u.ID,
		&u.Email,
		&u.PasswordHash,
		&u.GoogleID,
		&u.FullName,
		&u.AvatarURL,
		&u.Role,
		&u.AuthProvider,
		&u.CreatedAt,
	)
	if errInsert != nil {
		return nil, fmt.Errorf("failed to insert new Google user: %w", errInsert)
	}

	return &u, nil
}

func (r *PostgresUserRepository) CreateUser(ctx context.Context, u *model.User) error {
	query := `
		INSERT INTO users (email, password_hash, full_name, avatar_url, role, auth_provider)
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING id, created_at;
	`
	return r.db.QueryRowContext(
		ctx,
		query,
		strings.ToLower(strings.TrimSpace(u.Email)),
		u.PasswordHash,
		u.FullName,
		u.AvatarURL,
		u.Role,
		u.AuthProvider,
	).Scan(&u.ID, &u.CreatedAt)
}

func (r *PostgresUserRepository) GetAllUsers(ctx context.Context) ([]model.User, error) {
	query := `
		SELECT 
			id,
			email,
			COALESCE(password_hash, ''),
			google_id,
			full_name,
			COALESCE(avatar_url, ''),
			role,
			auth_provider,
			created_at
		FROM users
		ORDER BY created_at DESC;
	`
	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, fmt.Errorf("failed to query all users: %w", err)
	}
	defer rows.Close()

	var users []model.User
	for rows.Next() {
		var u model.User
		if err := rows.Scan(
			&u.ID,
			&u.Email,
			&u.PasswordHash,
			&u.GoogleID,
			&u.FullName,
			&u.AvatarURL,
			&u.Role,
			&u.AuthProvider,
			&u.CreatedAt,
		); err != nil {
			return nil, fmt.Errorf("failed to scan user: %w", err)
		}
		users = append(users, u)
	}
	if users == nil {
		users = []model.User{}
	}

	return users, nil
}
