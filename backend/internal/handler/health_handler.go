package handler

import (
	"net/http"
	"time"

	"katharos-backend/internal/model"
	"katharos-backend/internal/repository"
)

type HealthHandler struct {
	repo repository.BibleRepository
}

func NewHealthHandler(repo repository.BibleRepository) *HealthHandler {
	return &HealthHandler{repo: repo}
}

func (h *HealthHandler) HealthCheck(w http.ResponseWriter, r *http.Request) {
	dbStatus := "connected"
	if err := h.repo.Ping(r.Context()); err != nil {
		dbStatus = "disconnected: " + err.Error()
	}

	status := "ok"
	statusCode := http.StatusOK
	if dbStatus != "connected" {
		status = "degraded"
		statusCode = http.StatusServiceUnavailable
	}

	JSON(w, statusCode, model.HealthResponse{
		Status:    status,
		Database:  dbStatus,
		Timestamp: time.Now().UTC(),
	})
}
