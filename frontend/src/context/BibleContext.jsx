import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchTranslations, fetchBooks, fetchChapter } from '../services/api';

const BibleContext = createContext(null);

const STORAGE_KEY_SETTINGS = 'katharos_settings';
const STORAGE_KEY_HIGHLIGHTS = 'katharos_highlights';

const DEFAULT_SETTINGS = {
  fontFamily: 'serif', // 'serif' | 'sans'
  fontSize: 'lg',     // 'base' | 'lg' | 'xl' | '2xl'
  theme: 'light',      // 'light' | 'sepia' | 'dark'
};

export function BibleProvider({ children }) {
  const location = useLocation();

  // Navigation & Data State
  const [currentTranslation, setCurrentTranslation] = useState('TB');
  const [currentBook, setCurrentBook] = useState('GEN');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [targetVerse, setTargetVerse] = useState(null);

  const [translations, setTranslations] = useState([]);
  const [books, setBooks] = useState([]);
  const [chapterData, setChapterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verse Interaction State
  const [selectedVerses, setSelectedVerses] = useState([]); // array of verse numbers
  const [highlights, setHighlights] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HIGHLIGHTS);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Reader Preferences
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // UI Modals
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Persist highlights
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HIGHLIGHTS, JSON.stringify(highlights));
    } catch (err) {
      console.error('Failed to save highlights:', err);
    }
  }, [highlights]);

  // Persist reader settings and apply theme to document
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (err) {
      console.error('Failed to save settings:', err);
    }

    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia');
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'sepia') {
      root.classList.add('theme-sepia');
    }
  }, [settings]);

  // Load Translations
  useEffect(() => {
    async function loadTranslations() {
      try {
        const data = await fetchTranslations();
        setTranslations(data);
      } catch (err) {
        console.error('Error loading translations:', err);
      }
    }
    loadTranslations();
  }, []);

  // Load Books when translation changes
  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await fetchBooks(currentTranslation);
        setBooks(data);
      } catch (err) {
        console.error('Error loading books:', err);
      }
    }
    loadBooks();
  }, [currentTranslation]);

  // Load Chapter Verses
  const loadChapter = useCallback(async (book, chapter, translation) => {
    setIsLoading(true);
    setError(null);
    setSelectedVerses([]); // reset selection when navigating chapters
    try {
      const data = await fetchChapter(book, chapter, translation);
      setChapterData(data);
      if (data.book && data.book.code) {
        setCurrentBook(data.book.code);
      }
      if (data.chapter) {
        setCurrentChapter(data.chapter);
      }
    } catch (err) {
      setError(err.message || 'Gagal memuat ayat');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadChapter(currentBook, currentChapter, currentTranslation);
  }, [currentBook, currentChapter, currentTranslation, loadChapter]);

  // Handle URL query parameters (?book=...&chapter=...&verse=...)
  useEffect(() => {
    if (location.pathname === '/read' && location.search) {
      const params = new URLSearchParams(location.search);
      const paramBook = params.get('book');
      const paramChapter = params.get('chapter');
      const paramVerse = params.get('verse');

      if (paramBook && paramBook.toUpperCase() !== currentBook) {
        setCurrentBook(paramBook.toUpperCase());
      }
      if (paramChapter && Number(paramChapter) !== currentChapter) {
        setCurrentChapter(Number(paramChapter));
      }
      if (paramVerse) {
        setTargetVerse(Number(paramVerse));
      }
    }
  }, [location.pathname, location.search, currentBook, currentChapter]);

  // Navigate to specific book and chapter
  const navigateTo = (bookCode, chapterNum, verseNum = null) => {
    setCurrentBook(bookCode);
    setCurrentChapter(Number(chapterNum));
    setTargetVerse(verseNum ? Number(verseNum) : null);
    setIsPickerOpen(false);
    if (!verseNum) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Switch translation
  const switchTranslation = (translationCode) => {
    setCurrentTranslation(translationCode);
  };

  // Verse Selection
  const toggleVerseSelection = (verseNumber) => {
    setSelectedVerses((prev) => {
      if (prev.includes(verseNumber)) {
        return prev.filter((v) => v !== verseNumber);
      } else {
        return [...prev, verseNumber].sort((a, b) => a - b);
      }
    });
  };

  const clearSelection = () => {
    setSelectedVerses([]);
  };

  // Highlighting
  const setVerseHighlight = (color) => {
    if (selectedVerses.length === 0) return;
    setHighlights((prev) => {
      const updated = { ...prev };
      selectedVerses.forEach((verseNum) => {
        const key = `${currentBook}_${currentChapter}_${verseNum}`;
        if (color) {
          updated[key] = color;
        } else {
          delete updated[key];
        }
      });
      return updated;
    });
    showToast(color ? 'Sorotan ayat disimpan' : 'Sorotan ayat dihapus');
    clearSelection();
  };

  // Toast notification
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 3000);
  };

  // Update Settings
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <BibleContext.Provider
      value={{
        currentTranslation,
        currentBook,
        currentChapter,
        translations,
        books,
        chapterData,
        isLoading,
        error,
        selectedVerses,
        highlights,
        settings,
        isPickerOpen,
        isSearchOpen,
        isSettingsOpen,
        toastMessage,
        setIsPickerOpen,
        setIsSearchOpen,
        setIsSettingsOpen,
        navigateTo,
        switchTranslation,
        toggleVerseSelection,
        clearSelection,
        setVerseHighlight,
        showToast,
        updateSettings,
        targetVerse,
        setTargetVerse,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
}

export function useBible() {
  const context = useContext(BibleContext);
  if (!context) {
    throw new Error('useBible must be used within a BibleProvider');
  }
  return context;
}
