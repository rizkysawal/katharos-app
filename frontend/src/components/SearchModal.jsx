import React, { useState, useEffect } from 'react';
import { useBible } from '../context/BibleContext';
import { searchVerses } from '../services/api';
import { Search, X, Loader2, ArrowRight } from 'lucide-react';

export default function SearchModal() {
  const {
    isSearchOpen,
    setIsSearchOpen,
    currentTranslation,
    navigateTo,
  } = useBible();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const data = await searchVerses(query, currentTranslation, 1, 20);
        setResults(data);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setIsSearching(false);
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [query, currentTranslation]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-24 px-3 sm:px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[85vh] sm:max-h-[80vh] overflow-hidden">
        
        {/* Search Input Box */}
        <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            placeholder="Cari kata atau ayat (cth: terang, kasih, firman)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none text-base text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-none"
            autoFocus
          />
          {isSearching && <Loader2 className="w-4 h-4 text-amber-500 animate-spin shrink-0" />}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {results && results.items && results.items.length > 0 ? (
            <>
              <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-1">
                Ditemukan {results.total} ayat dalam {results.translation}
              </div>
              {results.items.map((item) => (
                <div
                  key={item.verse_id}
                  onClick={() => {
                    navigateTo(item.book_code, item.chapter_number);
                    setIsSearchOpen(false);
                  }}
                  className="p-3.5 rounded-xl border border-stone-100 dark:border-stone-800/80 hover:border-amber-400 dark:hover:border-amber-600 bg-stone-50/50 hover:bg-amber-50/40 dark:bg-stone-800/40 dark:hover:bg-stone-800 transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 mb-1">
                    <span>
                      {item.book_name} {item.chapter_number}:{item.verse_number}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-serif text-stone-700 dark:text-stone-300 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </>
          ) : query.trim() && !isSearching ? (
            <div className="text-center py-12 text-stone-400 text-sm">
              Tidak ada ayat yang cocok dengan kata pencarian "{query}".
            </div>
          ) : (
            <div className="text-center py-10 text-stone-400 text-xs">
              Ketik kata kunci untuk memulai pencarian cepat di seluruh Alkitab.
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-stone-50 dark:bg-stone-900 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-400 flex justify-between">
          <span>Versi: {currentTranslation}</span>
          <span>Tekan ESC untuk menutup</span>
        </div>

      </div>
    </div>
  );
}
