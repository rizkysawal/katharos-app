import React, { useState, useRef, useEffect } from 'react';
import { useBible } from '../context/BibleContext';
import { ChevronDown, Check } from 'lucide-react';

export default function VersionSelector() {
  const { currentTranslation, translations, switchTranslation } = useBible();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentTr = translations.find((t) => t.code === currentTranslation) || {
    code: currentTranslation,
    name: 'Terjemahan Baru',
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-700 transition-colors"
      >
        <span>{currentTr.code}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-wider">
            Versi Terjemahan
          </div>
          {translations.map((tr) => {
            const isSelected = tr.code === currentTranslation;
            return (
              <button
                key={tr.code}
                onClick={() => {
                  switchTranslation(tr.code);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3 py-2 flex items-center justify-between gap-2 text-sm transition-colors ${
                  isSelected
                    ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 font-medium'
                    : 'text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                <div>
                  <div className="font-semibold flex items-center gap-2">
                    {tr.code}
                    <span className="text-[10px] uppercase px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-500">
                      {tr.language}
                    </span>
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 truncate max-w-[180px]">
                    {tr.name}
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
