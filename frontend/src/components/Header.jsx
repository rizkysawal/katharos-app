import React from 'react';
import { Link } from 'react-router-dom';
import { useBible } from '../context/BibleContext';
import { BookOpen, Search, ChevronDown, Home } from 'lucide-react';
import VersionSelector from './VersionSelector';
import GoogleAuthButton from './GoogleAuthButton';

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
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#fafaf9]/90 dark:bg-[#121212]/90 border-b border-stone-200 dark:border-stone-800 transition-colors duration-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Logo / Brand & Home Link */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 group p-1 -ml-1 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Kembali ke Beranda Komunitas"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-600 dark:bg-amber-500 flex items-center justify-center text-white shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="hidden xs:block sm:block">
              <span className="font-serif font-bold text-lg tracking-tight text-stone-900 dark:text-stone-100">
                Katharos
              </span>
            </div>
          </Link>

          <Link
            to="/"
            className="hidden md:flex items-center gap-1 text-xs text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-stone-200 px-2 py-1 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-colors ml-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Beranda</span>
          </Link>
        </div>

        {/* Center: Book & Chapter Picker Pill Button */}
        <button
          onClick={() => setIsPickerOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-stone-100 hover:bg-stone-200/80 dark:bg-stone-800 dark:hover:bg-stone-700/80 text-stone-900 dark:text-stone-100 font-medium text-sm transition-all duration-150 active:scale-95 shadow-sm border border-stone-200/60 dark:border-stone-700/60"
          title="Pilih Kitab dan Pasal"
        >
          <span className="font-semibold">{currentBookName}</span>
          <span>{currentChapterNum}</span>
          <ChevronDown className="w-3.5 h-3.5 opacity-60 ml-0.5" />
        </button>

        {/* Right Actions: Translation Dropdown, Search, Settings */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Version Selector */}
          <VersionSelector />

          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Cari Ayat (Ctrl+K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Typography & Display Settings */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors font-serif font-bold text-sm"
            title="Pengaturan Tampilan & Font"
          >
            Aa
          </button>

          {/* Member Google Login / Profile */}
          <GoogleAuthButton />
        </div>
      </div>
    </header>
  );
}
