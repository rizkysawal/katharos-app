import React from 'react';
import { useBible } from '../context/BibleContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavigationFooter() {
  const { chapterData, navigateTo } = useBible();

  const prev = chapterData?.navigation?.prev;
  const next = chapterData?.navigation?.next;

  if (!prev && !next) return null;

  return (
    <nav className="mt-16 sm:mt-24 pt-8 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4">
      {/* Previous Chapter */}
      {prev ? (
        <button
          onClick={() => navigateTo(prev.book_code, prev.chapter_number)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all text-left group"
        >
          <ChevronLeft className="w-5 h-5 text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
          <div>
            <div className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">
              Sebelumnya
            </div>
            <div className="text-sm font-semibold text-stone-800 dark:text-stone-200">
              {prev.book_name} {prev.chapter_number}
            </div>
          </div>
        </button>
      ) : (
        <div />
      )}

      {/* Next Chapter */}
      {next ? (
        <button
          onClick={() => navigateTo(next.book_code, next.chapter_number)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all text-right group ml-auto"
        >
          <div>
            <div className="text-[11px] font-medium text-stone-400 uppercase tracking-wider">
              Berikutnya
            </div>
            <div className="text-sm font-semibold text-stone-800 dark:text-stone-200">
              {next.book_name} {next.chapter_number}
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors" />
        </button>
      ) : (
        <div />
      )}
    </nav>
  );
}
