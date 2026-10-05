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
	"katharos-backend/internal/service"
	"katharos-backend/migrations"
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

		// Run automated database migrations (01 through 04)
		migCtx, migCancel := context.WithTimeout(context.Background(), 30*time.Second)
		if err := migrations.Run(migCtx, db); err != nil {
			log.Printf("[Katharos ERROR] Failed running database migrations: %v", err)
		} else {
			log.Println("[Katharos] All database migrations verified and applied successfully.")
		}
		migCancel()
	}

	// Initialize Repositories and Services
	bibleRepo := repository.NewPostgresBibleRepository(db)
	bibleHandler := handler.NewBibleHandler(bibleRepo)

	communityRepo := repository.NewPostgresCommunityRepository(db)
	devotionalHandler := handler.NewDevotionalHandler(communityRepo)
	eventHandler := handler.NewEventHandler(communityRepo)

	userRepo := repository.NewPostgresUserRepository(db)
	jwtService := service.NewJWTService(cfg.JWTSecret)
	authHandler := handler.NewAuthHandler(userRepo, jwtService)

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

	// Community Endpoints (v1)
	mux.HandleFunc("/api/v1/devotionals/today", devotionalHandler.GetTodayDevotional)
	mux.HandleFunc("/api/v1/devotionals", devotionalHandler.HandleDevotionals)
	mux.HandleFunc("/api/v1/events/upcoming", eventHandler.GetUpcomingEvents)
	mux.HandleFunc("/api/v1/events", eventHandler.HandleEvents)

	// Authentication Endpoints (v1)
	mux.HandleFunc("/api/v1/auth/google", authHandler.GoogleLogin)
	mux.HandleFunc("/api/v1/auth/internal/login", authHandler.InternalLogin)
	mux.HandleFunc("/api/v1/auth/me", middleware.RequireAuth(jwtService, authHandler.GetMe))

	// Protected Role-based Endpoints (v1)
	mux.HandleFunc("/api/v1/member/profile", middleware.RequireAuth(jwtService, authHandler.MemberProfile))
	mux.HandleFunc("/api/v1/writer/drafts", middleware.RequireRole(jwtService, []string{"writer", "admin"}, authHandler.WriterDrafts))
	mux.HandleFunc("/api/v1/admin/users", middleware.RequireRole(jwtService, []string{"admin"}, authHandler.AdminUsers))

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
