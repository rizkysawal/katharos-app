import React, { useEffect, useRef } from 'react';
import { useBible } from '../context/BibleContext';
import { X, Sun, Moon, Coffee } from 'lucide-react';

export default function DisplaySettingsModal() {
  const { isSettingsOpen, setIsSettingsOpen, settings, updateSettings } = useBible();
  const modalRef = useRef(null);

  // Close when clicking outside or Esc
  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setIsSettingsOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    }
    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSettingsOpen, setIsSettingsOpen]);

  if (!isSettingsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 pt-16 bg-black/40 backdrop-blur-xs animate-in fade-in duration-100">
      <div
        ref={modalRef}
        className="w-full max-w-xs bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 p-5 space-y-6"
      >
        <div className="flex items-center justify-between pb-2 border-b border-stone-100 dark:border-stone-800">
          <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
            Tampilan Baca
          </h3>
          <button
            onClick={() => setIsSettingsOpen(false)}
            className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 1. Theme Selection */}
        <div>
          <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
            Tema Warna
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'light', label: 'Terang', icon: Sun, bg: 'bg-[#fcfcfc] border-stone-300 text-stone-800' },
              { id: 'sepia', label: 'Sepia', icon: Coffee, bg: 'bg-[#fbf7ee] border-amber-200 text-amber-900' },
              { id: 'dark', label: 'Gelap', icon: Moon, bg: 'bg-[#121212] border-stone-700 text-stone-200' },
            ].map((t) => {
              const Icon = t.icon;
              const isSelected = settings.theme === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => updateSettings({ theme: t.id })}
                  className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                    t.bg
                  } ${
                    isSelected
                      ? 'ring-2 ring-amber-500 shadow-sm font-semibold'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Icon className="w-4 h-4 mb-1" />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Font Size Stepper */}
        <div>
          <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
            Ukuran Font
          </label>
          <div className="flex items-center gap-2">
            {[
              { id: 'sm', label: 'A-', title: 'Kecil' },
              { id: 'base', label: 'A', title: 'Normal' },
              { id: 'lg', label: 'A+', title: 'Besar' },
              { id: 'xl', label: 'A++', title: 'Sangat Besar' },
            ].map((size) => (
              <button
                key={size.id}
                onClick={() => updateSettings({ fontSize: size.id })}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${
                  settings.fontSize === size.id
                    ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                    : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
                }`}
                title={size.title}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Font Family Toggle */}
        <div>
          <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-2">
            Gaya Font
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => updateSettings({ fontFamily: 'serif' })}
              className={`p-2.5 rounded-xl border text-center transition-all font-serif ${
                settings.fontFamily === 'serif'
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-900 dark:text-amber-300 font-bold shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <div className="text-sm font-semibold">Serif</div>
              <div className="text-[10px] opacity-70">Lora</div>
            </button>

            <button
              onClick={() => updateSettings({ fontFamily: 'sans' })}
              className={`p-2.5 rounded-xl border text-center transition-all font-sans ${
                settings.fontFamily === 'sans'
                  ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-500 text-amber-900 dark:text-amber-300 font-bold shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              <div className="text-sm font-semibold">Sans-Serif</div>
              <div className="text-[10px] opacity-70">Jakarta Sans</div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
