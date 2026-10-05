import React from 'react';
import { useBible } from '../context/BibleContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function NavigationFooter() {
  const { chapterData, navigateTo } = useBible();

  const prev = chapterData?.navigation?.prev;
  const next = chapterData?.navigation?.next;

  if (!prev && !next) return null;

  return (
    <nav className="mt-10 sm:mt-24 pt-6 sm:pt-8 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between gap-2 sm:gap-4">
      {/* Previous Chapter */}
      {prev ? (
        <button
          onClick={() => navigateTo(prev.book_code, prev.chapter_number)}
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all text-left group max-w-[48%] active:scale-95"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors shrink-0" />
          <div className="truncate">
            <div className="text-[10px] sm:text-[11px] font-medium text-stone-400 uppercase tracking-wider">
              Sebelumnya
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">
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
          className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:border-amber-500 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all text-right group ml-auto max-w-[48%] active:scale-95"
        >
          <div className="truncate">
            <div className="text-[10px] sm:text-[11px] font-medium text-stone-400 uppercase tracking-wider">
              Berikutnya
            </div>
            <div className="text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 truncate">
              {next.book_name} {next.chapter_number}
            </div>
          </div>
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors shrink-0" />
        </button>
      ) : (
        <div />
      )}
    </nav>
  );
}
