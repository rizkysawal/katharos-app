package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"katharos-backend/internal/model"
	"katharos-backend/internal/repository"
)

type EventHandler struct {
	repo repository.CommunityRepository
}

func NewEventHandler(repo repository.CommunityRepository) *EventHandler {
	return &EventHandler{repo: repo}
}

// GetUpcomingEvents handles GET /api/v1/events/upcoming
func (h *EventHandler) GetUpcomingEvents(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	limit := 10
	if lStr := r.URL.Query().Get("limit"); lStr != "" {
		if l, err := strconv.Atoi(lStr); err == nil && l > 0 && l <= 50 {
			limit = l
		}
	}

	events, err := h.repo.GetUpcomingEvents(r.Context(), limit)
	if err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}

	JSON(w, http.StatusOK, events)
}

// HandleEvents handles POST /api/v1/events
func (h *EventHandler) HandleEvents(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	var e model.Event
	if err := json.NewDecoder(r.Body).Decode(&e); err != nil {
		Error(w, http.StatusBadRequest, "invalid request payload: "+err.Error())
		return
	}

	if strings.TrimSpace(e.Title) == "" || e.StartTime.IsZero() {
		Error(w, http.StatusBadRequest, "title and start_time are required")
		return
	}

	if err := h.repo.CreateEvent(r.Context(), &e); err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}

	JSON(w, http.StatusCreated, e)
}
