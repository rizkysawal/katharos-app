package handler

import (
	"net/http"
	"strconv"
	"strings"

	"katharos-backend/internal/repository"
)

type BibleHandler struct {
	repo repository.BibleRepository
}

func NewBibleHandler(repo repository.BibleRepository) *BibleHandler {
	return &BibleHandler{repo: repo}
}

// GetTranslations handles GET /api/v1/translations
func (h *BibleHandler) GetTranslations(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	translations, err := h.repo.GetTranslations(r.Context())
	if err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}

	JSON(w, http.StatusOK, translations)
}

// GetBooks handles GET /api/v1/books?translation=TB
func (h *BibleHandler) GetBooks(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	translation := r.URL.Query().Get("translation")
	if translation == "" {
		translation = "TB"
	}

	books, err := h.repo.GetBooks(r.Context(), translation)
	if err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}

	JSON(w, http.StatusOK, books)
}

// ReadChapter handles GET /api/v1/read?book=GEN&chapter=1&translation=TB
func (h *BibleHandler) ReadChapter(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	q := r.URL.Query()
	book := q.Get("book")
	if book == "" {
		book = "GEN"
	}

	chapterStr := q.Get("chapter")
	chapter := 1
	if chapterStr != "" {
		if c, err := strconv.Atoi(chapterStr); err == nil && c > 0 {
			chapter = c
		}
	}

	translation := q.Get("translation")
	if translation == "" {
		translation = "TB"
	}

	resp, err := h.repo.GetChapterVerses(r.Context(), translation, book, chapter)
	if err != nil {
		if strings.Contains(err.Error(), "not found") {
			Error(w, http.StatusNotFound, err.Error())
			return
		}
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}

	JSON(w, http.StatusOK, resp)
}

// Search handles GET /api/v1/search?q=terang&translation=TB&page=1&limit=20
func (h *BibleHandler) Search(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		Error(w, http.StatusMethodNotAllowed, "method not allowed")
		return
	}

	q := r.URL.Query()
	keyword := q.Get("q")
	translation := q.Get("translation")
	if translation == "" {
		translation = "TB"
	}

	page := 1
	if pStr := q.Get("page"); pStr != "" {
		if p, err := strconv.Atoi(pStr); err == nil && p > 0 {
			page = p
		}
	}

	limit := 20
	if lStr := q.Get("limit"); lStr != "" {
		if l, err := strconv.Atoi(lStr); err == nil && l > 0 && l <= 100 {
			limit = l
		}
	}

	results, err := h.repo.SearchVerses(r.Context(), translation, keyword, page, limit)
	if err != nil {
		Error(w, http.StatusInternalServerError, err.Error())
		return
	}

	JSON(w, http.StatusOK, results)
}
