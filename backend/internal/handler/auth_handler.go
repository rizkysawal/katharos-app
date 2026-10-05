package handler

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"
	"katharos-backend/internal/middleware"
	"katharos-backend/internal/model"
	"katharos-backend/internal/repository"
	"katharos-backend/internal/service"
)

type AuthHandler struct {
	userRepo   repository.UserRepository
	jwtService *service.JWTService
}

func NewAuthHandler(userRepo repository.UserRepository, jwtService *service.JWTService) *AuthHandler {
	return &AuthHandler{
		userRepo:   userRepo,
		jwtService: jwtService,
	}
}

// GoogleTokenInfo represents payload returned by Google tokeninfo endpoint
type GoogleTokenInfo struct {
	Sub           string `json:"sub"`
	Email         string `json:"email"`
	EmailVerified string `json:"email_verified"`
	Name          string `json:"name"`
	Picture       string `json:"picture"`
	Error         string `json:"error_description"`
}

// GoogleLogin handles POST /api/v1/auth/google
func (h *AuthHandler) GoogleLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	var req model.GoogleAuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "invalid request payload: "+err.Error())
		return
	}

	var googleID, email, fullName, avatarURL string

	// 1. If real ID Token provided, verify with Google TokenInfo
	if req.IDToken != "" && !strings.HasPrefix(req.IDToken, "mock_") {
		client := &http.Client{Timeout: 8 * time.Second}
		resp, err := client.Get("https://oauth2.googleapis.com/tokeninfo?id_token=" + req.IDToken)
		if err != nil {
			Error(w, http.StatusBadGateway, "Gagal menghubungi server verifikasi Google: "+err.Error())
			return
		}
		defer resp.Body.Close()

		body, _ := io.ReadAll(resp.Body)
		var tokenInfo GoogleTokenInfo
		if err := json.Unmarshal(body, &tokenInfo); err != nil || tokenInfo.Sub == "" || tokenInfo.Email == "" {
			Error(w, http.StatusUnauthorized, "Token Google tidak valid atau kedaluwarsa.")
			return
		}

		googleID = tokenInfo.Sub
		email = tokenInfo.Email
		fullName = tokenInfo.Name
		avatarURL = tokenInfo.Picture
	} else if req.Email != "" {
		// 2. Fallback / Dev mode for testing without active Google Cloud Console Client ID
		email = req.Email
		googleID = req.GoogleID
		if googleID == "" {
			googleID = "g_" + strings.ReplaceAll(req.Email, "@", "_")
		}
		fullName = req.FullName
		if fullName == "" {
			fullName = strings.Split(email, "@")[0]
		}
		avatarURL = req.AvatarURL
	} else {
		Error(w, http.StatusBadRequest, "id_token atau email diperlukan untuk login Google.")
		return
	}

	// 3. Upsert user in Database (automatically assigned role 'member')
	user, err := h.userRepo.UpsertGoogleUser(r.Context(), googleID, email, fullName, avatarURL)
	if err != nil {
		Error(w, http.StatusInternalServerError, "Gagal memproses data akun: "+err.Error())
		return
	}

	// 4. Issue JWT
	token, err := h.jwtService.GenerateToken(user)
	if err != nil {
		Error(w, http.StatusInternalServerError, "Gagal menerbitkan token: "+err.Error())
		return
	}

	JSON(w, http.StatusOK, model.AuthResponse{
		Token: token,
		User:  *user,
	})
}

// InternalLogin handles POST /api/v1/auth/internal/login
func (h *AuthHandler) InternalLogin(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	var req model.InternalLoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		Error(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	email := strings.TrimSpace(req.Email)
	password := strings.TrimSpace(req.Password)
	if email == "" || password == "" {
		Error(w, http.StatusBadRequest, "Email/username dan password wajib diisi.")
		return
	}

	// 1. Fetch user by email
	user, err := h.userRepo.GetUserByEmail(r.Context(), email)
	if err != nil {
		if strings.Contains(err.Error(), "user not found") {
			log.Printf("[Auth WARN] Internal login failed for %s: user not found", email)
			Error(w, http.StatusUnauthorized, "Email atau kata sandi tidak sesuai.")
			return
		}
		log.Printf("[Auth ERROR] Database error on GetUserByEmail for %s: %v", email, err)
		Error(w, http.StatusInternalServerError, "Gagal mengakses database pengguna: "+err.Error())
		return
	}

	// 2. Strict Check: Only 'admin' and 'writer' can use the internal login gateway!
	if user.Role != model.RoleAdmin && user.Role != model.RoleWriter {
		log.Printf("[Auth WARN] Forbidden login attempt by user %s with role '%s'", email, user.Role)
		Error(w, http.StatusForbidden, "Akses ditolak. Halaman ini hanya untuk pengurus (Admin & Penulis).")
		return
	}

	// 3. Verify bcrypt password hash
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(password)); err != nil {
		log.Printf("[Auth WARN] Password mismatch for user %s", email)
		Error(w, http.StatusUnauthorized, "Email atau kata sandi tidak sesuai.")
		return
	}

	// 4. Issue JWT with role payload
	token, err := h.jwtService.GenerateToken(user)
	if err != nil {
		Error(w, http.StatusInternalServerError, "Gagal menerbitkan token: "+err.Error())
		return
	}

	JSON(w, http.StatusOK, model.AuthResponse{
		Token: token,
		User:  *user,
	})
}

// GetMe handles GET /api/v1/auth/me
func (h *AuthHandler) GetMe(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	claims := middleware.GetClaims(r.Context())
	if claims == nil {
		Error(w, http.StatusUnauthorized, "unauthenticated")
		return
	}

	user, err := h.userRepo.GetUserByID(r.Context(), claims.UserID)
	if err != nil {
		Error(w, http.StatusNotFound, "user not found")
		return
	}

	JSON(w, http.StatusOK, user)
}

// MemberProfile handles GET /api/v1/member/profile (Accessible by all logged-in roles)
func (h *AuthHandler) MemberProfile(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	JSON(w, http.StatusOK, map[string]interface{}{
		"message": "Selamat datang di area jemaat/member",
		"claims":  claims,
	})
}

// WriterDrafts handles GET /api/v1/writer/drafts (Accessible by writer & admin)
func (h *AuthHandler) WriterDrafts(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r.Context())
	JSON(w, http.StatusOK, map[string]interface{}{
		"message": fmt.Sprintf("Akses modul penulisan diberikan untuk %s (%s)", claims.FullName, claims.Role),
		"drafts":  []string{},
	})
}

// AdminUsers handles GET /api/v1/admin/users (Accessible by admin only)
func (h *AuthHandler) AdminUsers(w http.ResponseWriter, r *http.Request) {
	users, err := h.userRepo.GetAllUsers(r.Context())
	if err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}
	JSON(w, http.StatusOK, users)
}
