import React from 'react';
import { Link } from 'react-router-dom';
import { useBible } from '../context/BibleContext';
import { BookOpen, Search, ChevronDown } from 'lucide-react';
import VersionSelector from './VersionSelector';
import GoogleAuthButton from './GoogleAuthButton';

const iconBtn =
  'inline-flex items-center justify-center w-9 h-9 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 active:scale-95 transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500';

export default function Header() {
  const {
    chapterData,
    setIsPickerOpen,
    setIsSearchOpen,
    setIsSettingsOpen,
  } = useBible();

  const currentBookName = chapterData?.book?.name || 'Kejadian';
  const currentChapterNum = chapterData?.chapter || 1;

  return (
    // NOTE: no overflow-hidden here — it would clip the version / profile dropdowns
    // and the login modal. Overflow is prevented with flex `min-w-0` instead.
    <header className="sticky top-0 z-30 w-full pt-[env(safe-area-inset-top)] backdrop-blur-md bg-[#fafaf9]/90 dark:bg-[#121212]/90 border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-2.5 sm:px-6 h-14 sm:h-16 flex items-center gap-2 sm:gap-4 w-full">

        {/* Left: Logo / Home */}
        <Link
          to="/"
          className="flex items-center gap-2 group p-1 -ml-1 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          title="Kembali ke Beranda"
          aria-label="Kembali ke Beranda Katharos"
        >
          <img
            src="/favicon.svg"
            alt="Logo Katharos"
            className="w-8 h-8 object-contain rounded-lg shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0"
          />
          <span className="hidden md:inline font-serif font-bold text-lg tracking-tight text-stone-900 dark:text-stone-100">
            Katharos
          </span>
        </Link>

        {/* Center: Book & Chapter picker — takes the remaining space and truncates */}
        <div className="flex-1 min-w-0 flex justify-center">
          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="flex items-center gap-1.5 min-w-0 max-w-full h-9 px-3 sm:px-4 rounded-full bg-stone-100 hover:bg-stone-200/80 dark:bg-stone-800 dark:hover:bg-stone-700/80 text-stone-900 dark:text-stone-100 text-sm transition-all duration-150 active:scale-95 shadow-sm border border-stone-200/60 dark:border-stone-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            title="Pilih Kitab dan Pasal"
            aria-label={`Pilih kitab dan pasal. Saat ini ${currentBookName} ${currentChapterNum}`}
          >
            <span className="font-semibold truncate">{currentBookName}</span>
            <span className="shrink-0 font-medium tabular-nums">{currentChapterNum}</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60 shrink-0" />
          </button>
        </div>

        {/* Right: Translation, Search, Display settings, Account */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
          <VersionSelector />

          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className={iconBtn}
            title="Cari Ayat (Ctrl+K)"
            aria-label="Cari Ayat"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setIsSettingsOpen(true)}
            className={`${iconBtn} font-serif font-bold text-sm`}
            title="Pengaturan Tampilan & Font"
            aria-label="Pengaturan Tampilan"
          >
            Aa
          </button>

          {/* Icon-only on small screens to keep the picker readable */}
          <GoogleAuthButton compact />
        </div>
      </div>
    </header>
  );
}
