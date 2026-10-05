package main

import (
	"context"
	"errors"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"katharos-backend/internal/config"
	"katharos-backend/internal/database"
	"katharos-backend/internal/handler"
	"katharos-backend/internal/middleware"
	"katharos-backend/internal/repository"
)

func main() {
	cfg := config.Load()
	log.Printf("[Katharos] Starting backend on port %s...", cfg.Port)

	// Initialize Database
	db, err := database.NewPostgresDB(cfg.DSN())
	if err != nil {
		log.Printf("[Katharos WARN] PostgreSQL not yet ready or error connecting: %v", err)
		log.Printf("[Katharos WARN] Application will continue to run and attempt to reconnect...")
	} else {
		log.Println("[Katharos] Connected to PostgreSQL successfully.")
		defer db.Close()
	}

	// Initialize Repository and Handlers
	bibleRepo := repository.NewPostgresBibleRepository(db)
	bibleHandler := handler.NewBibleHandler(bibleRepo)
	healthHandler := handler.NewHealthHandler(bibleRepo)

	// Routes
	mux := http.NewServeMux()

	// Health Check
	mux.HandleFunc("/api/health", healthHandler.HealthCheck)

	// Bible Endpoints (v1)
	mux.HandleFunc("/api/v1/translations", bibleHandler.GetTranslations)
	mux.HandleFunc("/api/v1/books", bibleHandler.GetBooks)
	mux.HandleFunc("/api/v1/read", bibleHandler.ReadChapter)
	mux.HandleFunc("/api/v1/search", bibleHandler.Search)

	// Root welcome / info
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path != "/" {
			http.NotFound(w, r)
			return
		}
		handler.JSON(w, http.StatusOK, map[string]string{
			"app":     "Katharos Bible API",
			"version": "1.0.0",
			"docs":    "/api/health, /api/v1/translations, /api/v1/books, /api/v1/read, /api/v1/search",
		})
	})

	// Wrap with Middleware
	corsMiddleware := middleware.CORS(cfg.CORSAllowedOrigins)
	handlerWithMiddleware := corsMiddleware(mux)

	server := &http.Server{
		Addr:         ":" + cfg.Port,
		Handler:      handlerWithMiddleware,
		ReadTimeout:  15 * time.Second,
		WriteTimeout: 15 * time.Second,
		IdleTimeout:  60 * time.Second,
	}

	// Graceful Shutdown Channel
	serverErrors := make(chan error, 1)
	go func() {
		log.Printf("[Katharos] Server listening on http://0.0.0.0:%s", cfg.Port)
		if err := server.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
			serverErrors <- err
		}
	}()

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, os.Interrupt, syscall.SIGTERM)

	select {
	case err := <-serverErrors:
		log.Fatalf("[Katharos FATAL] Server error: %v", err)
	case sig := <-shutdown:
		log.Printf("[Katharos] Signal %v received. Shutting down gracefully...", sig)
		ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()

		if err := server.Shutdown(ctx); err != nil {
			log.Fatalf("[Katharos FATAL] Graceful shutdown failed: %v", err)
		}
		log.Println("[Katharos] Server stopped.")
	}
}
