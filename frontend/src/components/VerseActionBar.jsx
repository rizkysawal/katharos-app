import React from 'react';
import { useBible } from '../context/BibleContext';
import { Copy, X, Trash2 } from 'lucide-react';

export default function VerseActionBar() {
  const {
    selectedVerses,
    clearSelection,
    setVerseHighlight,
    chapterData,
    currentTranslation,
    showToast,
  } = useBible();

  if (selectedVerses.length === 0) return null;

  const bookName = chapterData?.book?.name || '';
  const chapterNum = chapterData?.chapter || 1;
  const verses = chapterData?.verses || [];

  // Copy selected verses to clipboard
  const handleCopy = async () => {
    const sortedVerseNums = [...selectedVerses].sort((a, b) => a - b);
    const selectedTexts = sortedVerseNums
      .map((num) => {
        const v = verses.find((item) => item.verse_number === num);
        return v ? `${v.verse_number} ${v.text}` : '';
      })
      .filter(Boolean)
      .join(' ');

    const reference = `${bookName} ${chapterNum}:${
      sortedVerseNums.length === 1
        ? sortedVerseNums[0]
        : `${sortedVerseNums[0]}-${sortedVerseNums[sortedVerseNums.length - 1]}`
    } (${currentTranslation})`;

    const formattedCopy = `"${selectedTexts}" - ${reference}`;

    try {
      await navigator.clipboard.writeText(formattedCopy);
      showToast('Ayat berhasil disalin ke clipboard');
      clearSelection();
    } catch (err) {
      console.error('Failed to copy text:', err);
      showToast('Gagal menyalin teks');
    }
  };

  const colors = [
    { id: 'yellow', bg: 'bg-yellow-400 dark:bg-yellow-500' },
    { id: 'green', bg: 'bg-green-400 dark:bg-green-500' },
    { id: 'blue', bg: 'bg-blue-400 dark:bg-blue-500' },
    { id: 'pink', bg: 'bg-pink-400 dark:bg-pink-500' },
  ];

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 flex justify-center px-4 animate-in slide-in-from-bottom-6 duration-200">
      <div className="bg-stone-900 text-stone-100 dark:bg-stone-800 dark:text-stone-100 rounded-2xl shadow-2xl border border-stone-700/60 py-2.5 px-4 flex items-center gap-3 sm:gap-4 max-w-lg w-full justify-between">
        
        {/* Selection summary */}
        <div className="text-xs sm:text-sm font-semibold truncate text-stone-300">
          <span>{selectedVerses.length}</span> ayat terpilih
        </div>

        {/* Color Palette */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {colors.map((c) => (
            <button
              key={c.id}
              onClick={() => setVerseHighlight(c.id)}
              className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full ${c.bg} transition-transform hover:scale-110 active:scale-95 shadow-sm`}
              title={`Highlight warna ${c.id}`}
            />
          ))}

          {/* Remove highlight */}
          <button
            onClick={() => setVerseHighlight(null)}
            className="p-1 text-stone-400 hover:text-red-400 transition-colors rounded-full"
            title="Hapus Sorotan"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Copy & Clear Actions */}
        <div className="flex items-center gap-1 sm:gap-2 border-l border-stone-700 pl-2 sm:pl-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs sm:text-sm font-medium hover:text-amber-400 px-2 py-1 rounded-lg hover:bg-stone-800/80 dark:hover:bg-stone-700/80 transition-colors"
            title="Salin Teks Ayat"
          >
            <Copy className="w-4 h-4" />
            <span className="hidden sm:inline">Salin</span>
          </button>

          <button
            onClick={clearSelection}
            className="p-1 text-stone-400 hover:text-stone-100 rounded-lg hover:bg-stone-800 dark:hover:bg-stone-700 transition-colors"
            title="Tutup Pilihan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
