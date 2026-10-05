package middleware

import (
	"net/http"
	"strings"
)

func CORS(allowedOrigins string) func(http.Handler) http.Handler {
	return func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			origin := r.Header.Get("Origin")

			// Check allowed origins
			if allowedOrigins == "*" {
				w.Header().Set("Access-Control-Allow-Origin", "*")
			} else if origin != "" {
				origins := strings.Split(allowedOrigins, ",")
				for _, o := range origins {
					if strings.TrimSpace(o) == origin {
						w.Header().Set("Access-Control-Allow-Origin", origin)
						break
					}
				}
			}

			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With")
			w.Header().Set("Access-Control-Max-Age", "86400")

			// Preflight request
			if r.Method == http.MethodOptions {
				w.WriteHeader(http.StatusNoContent)
				return
			}

			next.ServeHTTP(w, r)
		})
	}
}
