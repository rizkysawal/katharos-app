package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
	"strings"

	"katharos-backend/internal/model"
	"katharos-backend/internal/repository"
)

type DevotionalHandler struct {
	repo repository.CommunityRepository
}

func NewDevotionalHandler(repo repository.CommunityRepository) *DevotionalHandler {
	return &DevotionalHandler{repo: repo}
}

// GetTodayDevotional handles GET /api/v1/devotionals/today
func (h *DevotionalHandler) GetTodayDevotional(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	devotional, err := h.repo.GetTodayDevotional(r.Context())
	if err != nil {
		Error(w, http.StatusNotFound, "renungan hari ini belum tersedia")
		return
	}

	JSON(w, http.StatusOK, devotional)
}

// HandleDevotionals handles GET /api/v1/devotionals (archive) and POST /api/v1/devotionals
func (h *DevotionalHandler) HandleDevotionals(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case http.MethodGet:
		q := r.URL.Query()
		month, _ := strconv.Atoi(q.Get("month"))
		year, _ := strconv.Atoi(q.Get("year"))

		items, err := h.repo.GetDevotionalsArchive(r.Context(), month, year)
		if err != nil {
			Error(w, http.StatusInternalServerError, err.Error())
			return
		}
		JSON(w, http.StatusOK, items)

	case http.MethodPost:
		var d model.Devotional
		if err := json.NewDecoder(r.Body).Decode(&d); err != nil {
			Error(w, http.StatusBadRequest, "invalid request payload: "+err.Error())
			return
		}

		if strings.TrimSpace(d.Title) == "" || strings.TrimSpace(d.PublishDate) == "" || strings.TrimSpace(d.Content) == "" {
			Error(w, http.StatusBadRequest, "title, publish_date, and content are required")
			return
		}

		if err := h.repo.CreateDevotional(r.Context(), &d); err != nil {
			Error(w, http.StatusInternalServerError, err.Error())
			return
		}

		JSON(w, http.StatusCreated, d)

	default:
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
	}
}
