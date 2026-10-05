package model

import "time"

const (
	RoleMember = "member"
	RoleWriter = "writer"
	RoleAdmin  = "admin"

	AuthProviderGoogle = "google"
	AuthProviderLocal  = "local"
)

type User struct {
	ID           int       `json:"id"`
	Email        string    `json:"email"`
	PasswordHash string    `json:"-"`
	GoogleID     *string   `json:"google_id,omitempty"`
	FullName     string    `json:"full_name"`
	AvatarURL    string    `json:"avatar_url"`
	Role         string    `json:"role"` // 'member', 'writer', 'admin'
	AuthProvider string    `json:"auth_provider"` // 'google', 'local'
	CreatedAt    time.Time `json:"created_at"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type GoogleAuthRequest struct {
	IDToken   string `json:"id_token"`
	Email     string `json:"email,omitempty"`
	FullName  string `json:"full_name,omitempty"`
	AvatarURL string `json:"avatar_url,omitempty"`
	GoogleID  string `json:"google_id,omitempty"`
}

type InternalLoginRequest struct {
	Email    string `json:"email"` // can be email or username
	Password string `json:"password"`
}
