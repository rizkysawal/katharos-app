import React, { useState, useMemo, useEffect } from 'react';
import { useBible } from '../context/BibleContext';
import { X, Search, ChevronLeft } from 'lucide-react';

export default function BookChapterPicker() {
  const {
    isPickerOpen,
    setIsPickerOpen,
    books,
    currentBook,
    currentChapter,
    navigateTo,
  } = useBible();

  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'OT' | 'NT'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBookForChapters, setSelectedBookForChapters] = useState(null);

  // Reset search and selected book when opening
  useEffect(() => {
    if (isPickerOpen) {
      setSearchQuery('');
      // Pre-select current book to view its chapters immediately, or null
      const current = books.find((b) => b.code === currentBook);
      setSelectedBookForChapters(current || null);
    }
  }, [isPickerOpen, currentBook, books]);

  // Handle escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isPickerOpen) {
        setIsPickerOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPickerOpen, setIsPickerOpen]);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((b) => {
      const matchTab =
        activeTab === 'ALL' ||
        (activeTab === 'OT' && b.testament === 'OT') ||
        (activeTab === 'NT' && b.testament === 'NT');

      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.abbreviation.toLowerCase().includes(q) ||
        b.code.toLowerCase().includes(q);

      return matchTab && matchQuery;
    });
  }, [books, activeTab, searchQuery]);

  if (!isPickerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 flex flex-col max-h-[88vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200 dark:border-stone-800">
          {selectedBookForChapters ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedBookForChapters(null)}
                className="p-1 -ml-1 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Kembali ke Daftar Kitab"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
                {selectedBookForChapters.name}
              </h2>
              <span className="text-xs text-stone-400 dark:text-stone-500">
                ({selectedBookForChapters.total_chapters} Pasal)
              </span>
            </div>
          ) : (
            <h2 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Pilih Kitab & Pasal
            </h2>
          )}

          <button
            onClick={() => setIsPickerOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Views: 1. Book List or 2. Chapter Grid */}
        {selectedBookForChapters ? (
          /* Chapter Selection Grid */
          <div className="flex-1 overflow-y-auto p-5">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-4">
              Pilih Angka Pasal
            </div>
            <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2.5">
              {Array.from({ length: selectedBookForChapters.total_chapters || 1 }, (_, i) => i + 1).map((chNum) => {
                const isCurrent =
                  selectedBookForChapters.code === currentBook && chNum === currentChapter;
                return (
                  <button
                    key={chNum}
                    onClick={() => navigateTo(selectedBookForChapters.code, chNum)}
                    className={`aspect-square flex items-center justify-center rounded-xl text-base font-semibold transition-all duration-150 active:scale-95 ${
                      isCurrent
                        ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                        : 'bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    {chNum}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Book Selection List */
          <div className="flex flex-col flex-1 overflow-hidden">
            {/* Search and Tabs */}
            <div className="p-4 border-b border-stone-200/80 dark:border-stone-800/80 space-y-3 bg-stone-50/50 dark:bg-stone-900/50">
              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Ketik nama kitab (cth: Kejadian, Mat, Yoh)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500 text-stone-900 dark:text-stone-100 placeholder:text-stone-400"
                  autoFocus
                />
              </div>

              {/* Testament Filter Tabs */}
              <div className="flex gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none pb-0.5">
                {[
                  { id: 'ALL', fullLabel: 'Semua (66)', shortLabel: 'Semua' },
                  { id: 'OT', fullLabel: 'Perjanjian Lama (39)', shortLabel: 'PL (39)' },
                  { id: 'NT', fullLabel: 'Perjanjian Baru (27)', shortLabel: 'PB (27)' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors shrink-0 active:scale-95 ${
                      activeTab === tab.id
                        ? 'bg-amber-600 text-white shadow-sm'
                        : 'bg-stone-200/70 hover:bg-stone-300 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300'
                    }`}
                  >
                    <span className="hidden xs:inline">{tab.fullLabel}</span>
                    <span className="xs:hidden">{tab.shortLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable Books Grid */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredBooks.map((book) => {
                const isCurrent = book.code === currentBook;
                return (
                  <button
                    key={book.code}
                    onClick={() => setSelectedBookForChapters(book)}
                    className={`text-left p-3 rounded-xl border transition-all duration-150 flex items-center justify-between group active:scale-[0.98] ${
                      isCurrent
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 text-amber-900 dark:text-amber-200 font-semibold'
                        : 'border-stone-200 dark:border-stone-800 hover:border-amber-400 dark:hover:border-amber-600 hover:bg-stone-50 dark:hover:bg-stone-800/60 text-stone-800 dark:text-stone-200'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-medium leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        {book.name}
                      </div>
                      <div className="text-[11px] text-stone-400 dark:text-stone-500 mt-0.5">
                        {book.abbreviation} • {book.total_chapters} pasal
                      </div>
                    </div>
                    <span className="text-xs font-mono text-stone-400 opacity-60">
                      {book.order_num}
                    </span>
                  </button>
                );
              })}

              {filteredBooks.length === 0 && (
                <div className="col-span-full py-12 text-center text-sm text-stone-400">
                  Tidak ada kitab yang sesuai dengan "{searchQuery}"
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
