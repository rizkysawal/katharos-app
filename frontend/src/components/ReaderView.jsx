import React from 'react';
import { useBible } from '../context/BibleContext';
import NavigationFooter from './NavigationFooter';
import VerseActionBar from './VerseActionBar';

export default function ReaderView() {
  const {
    chapterData,
    isLoading,
    error,
    currentBook,
    currentChapter,
    selectedVerses,
    highlights,
    settings,
    toggleVerseSelection,
    targetVerse,
  } = useBible();

  // Scroll to target verse when chapterData loads
  React.useEffect(() => {
    if (targetVerse && chapterData && !isLoading) {
      const timer = setTimeout(() => {
        const verseEl = document.getElementById(`verse-${targetVerse}`);
        if (verseEl) {
          verseEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [targetVerse, chapterData, isLoading]);

  // Font size mapping
  const fontSizeClasses = {
    sm: 'text-base leading-relaxed',
    base: 'text-lg leading-relaxed',
    lg: 'text-xl leading-loose',
    xl: 'text-2xl leading-loose',
    '2xl': 'text-3xl leading-loose',
  }[settings.fontSize] || 'text-xl leading-loose';

  // Font family mapping
  const fontFamilyClass = settings.fontFamily === 'sans' ? 'font-sans' : 'font-serif';

  if (isLoading && !chapterData) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 animate-pulse space-y-6">
        <div className="h-8 bg-stone-200 dark:bg-stone-800 rounded w-1/3 mx-auto"></div>
        <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/4 mx-auto mb-10"></div>
        <div className="space-y-4">
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-11/12"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-4/5"></div>
          <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-full"></div>
        </div>
      </div>
    );
  }

  if (error && !chapterData) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="text-red-500 font-medium mb-2">Terjadi Kesalahan</div>
        <p className="text-sm text-stone-500 dark:text-stone-400 mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg text-sm font-semibold"
        >
          Muat Ulang
        </button>
      </div>
    );
  }

  const bookName = chapterData?.book?.name || 'Kejadian';
  const chapterNumber = chapterData?.chapter || 1;
  const translationName = chapterData?.translation?.name || 'Terjemahan Baru';
  const verses = chapterData?.verses || [];

  return (
    <main className="min-h-screen pb-32 pt-6 sm:pt-12 px-3.5 sm:px-6">
      <article className="max-w-3xl mx-auto">
        
        {/* Chapter Header Title */}
        <header className="text-center mb-6 sm:mb-14">
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-1.5 sm:mb-2">
            {bookName} {chapterNumber}
          </h1>
          <p className="text-xs sm:text-sm font-sans tracking-wide text-stone-500 dark:text-stone-400 uppercase font-medium">
            {translationName}
          </p>
        </header>

        {/* Verses Container */}
        <section
          className={`${fontFamilyClass} ${fontSizeClasses} text-stone-800 dark:text-stone-200 transition-all duration-200`}
        >
          {verses.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {verses.map((verse) => {
                const isSelected = selectedVerses.includes(verse.verse_number);
                const isTarget = targetVerse && Number(targetVerse) === Number(verse.verse_number);
                const highlightKey = `${currentBook}_${currentChapter}_${verse.verse_number}`;
                const highlightColor = highlights[highlightKey];

                let highlightClass = '';
                if (highlightColor) {
                  highlightClass = `highlight-${highlightColor} rounded-md px-1 py-0.5`;
                }

                return (
                  <span
                    key={verse.id || verse.verse_number}
                    id={`verse-${verse.verse_number}`}
                    onClick={() => toggleVerseSelection(verse.verse_number)}
                    className={`inline-block mr-2 cursor-pointer transition-all duration-200 rounded-lg p-1 -m-1 hover:bg-stone-100/70 dark:hover:bg-stone-800/40 ${
                      isTarget
                        ? 'ring-2 ring-amber-500 bg-amber-100/90 dark:bg-amber-950/70 shadow-sm font-medium'
                        : isSelected
                        ? 'ring-2 ring-amber-500 bg-amber-50 dark:bg-amber-950/30'
                        : ''
                    }`}
                  >
                    {/* Superscript Verse Number */}
                    <sup className={`select-none text-[11px] font-sans font-bold mr-1.5 align-super ${
                      isTarget
                        ? 'text-amber-700 dark:text-amber-400 underline'
                        : 'text-amber-700/70 dark:text-amber-500/70'
                    }`}>
                      {verse.verse_number}
                    </sup>
                    
                    {/* Verse Text with Highlight styling */}
                    <span className={`${highlightClass}`}>
                      {verse.text}
                    </span>
                  </span>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-stone-400 italic">
              Tidak ada ayat ditemukan pada pasal ini.
            </div>
          )}
        </section>

        {/* Bottom Chapter Navigation (Prev & Next) */}
        <NavigationFooter />

      </article>

      {/* Floating Action Bar when verses are selected */}
      <VerseActionBar />
    </main>
  );
}
