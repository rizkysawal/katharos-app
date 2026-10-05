package middleware

import (
	"context"
	"encoding/json"
	"net/http"
	"strings"

	"katharos-backend/internal/service"
)

func sendAuthError(w http.ResponseWriter, status int, message string) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]interface{}{
		"success": false,
		"error":   message,
	})
}

type contextKey string

const ClaimsContextKey contextKey = "userClaims"

func GetClaims(ctx context.Context) *service.JWTClaims {
	if val := ctx.Value(ClaimsContextKey); val != nil {
		if claims, ok := val.(*service.JWTClaims); ok {
			return claims
		}
	}
	return nil
}

// Authenticate extracts and validates Bearer token if present
func Authenticate(jwtService *service.JWTService) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			authHeader := r.Header.Get("Authorization")
			if authHeader != "" && strings.HasPrefix(authHeader, "Bearer ") {
				tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
				claims, err := jwtService.ValidateToken(tokenStr)
				if err == nil && claims != nil {
					ctx := context.WithValue(r.Context(), ClaimsContextKey, claims)
					r = r.WithContext(ctx)
				}
			}
			next.ServeHTTP(w, r)
		})
	}
}

// RequireAuth ensures the request has a valid authenticated user
func RequireAuth(jwtService *service.JWTService, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		if authHeader == "" || !strings.HasPrefix(authHeader, "Bearer ") {
			sendAuthError(w, http.StatusUnauthorized, "Autentikasi diperlukan. Silakan login terlebih dahulu.")
			return
		}

		tokenStr := strings.TrimPrefix(authHeader, "Bearer ")
		claims, err := jwtService.ValidateToken(tokenStr)
		if err != nil || claims == nil {
			sendAuthError(w, http.StatusUnauthorized, "Sesi login tidak valid atau telah kedaluwarsa.")
			return
		}

		ctx := context.WithValue(r.Context(), ClaimsContextKey, claims)
		next(w, r.WithContext(ctx))
	}
}

// RequireRole ensures the authenticated user has one of the allowed roles
func RequireRole(jwtService *service.JWTService, allowedRoles []string, next http.HandlerFunc) http.HandlerFunc {
	return RequireAuth(jwtService, func(w http.ResponseWriter, r *http.Request) {
		claims := GetClaims(r.Context())
		if claims == nil {
			sendAuthError(w, http.StatusUnauthorized, "Sesi login tidak ditemukan.")
			return
		}

		hasRole := false
		for _, role := range allowedRoles {
			if claims.Role == role {
				hasRole = true
				break
			}
		}

		if !hasRole {
			sendAuthError(w, http.StatusForbidden, "Akses ditolak. Anda tidak memiliki izin untuk halaman ini.")
			return
		}

		next(w, r)
	})
}
