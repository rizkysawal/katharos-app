import React from 'react';
import { Sun, Moon, Coffee } from 'lucide-react';

const THEMES = [
  { id: 'light', label: 'Terang', Icon: Sun, active: 'bg-white text-amber-600 shadow-sm' },
  { id: 'sepia', label: 'Sepia', Icon: Coffee, active: 'bg-[#f4ecd8] text-amber-900 shadow-sm' },
  { id: 'dark', label: 'Gelap', Icon: Moon, active: 'bg-stone-700 text-amber-400 shadow-sm' },
];

/**
 * Theme switcher.
 * - Mobile (< sm): a single compact button that cycles Terang → Sepia → Gelap,
 *   so all three themes stay reachable without crowding the navbar.
 * - sm and up: a segmented control showing all three options.
 */
export default function ThemeToggle({ theme, onChange }) {
  const currentIndex = Math.max(0, THEMES.findIndex((t) => t.id === theme));
  const current = THEMES[currentIndex];
  const next = THEMES[(currentIndex + 1) % THEMES.length];
  const CurrentIcon = current.Icon;

  return (
    <>
      {/* Mobile: single cycling button */}
      <button
        type="button"
        onClick={() => onChange(next.id)}
        className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-amber-600 dark:text-amber-400 active:scale-95 transition-all shrink-0"
        aria-label={`Tema: ${current.label}. Ketuk untuk ganti ke ${next.label}`}
        title={`Tema ${current.label} (ganti ke ${next.label})`}
      >
        <CurrentIcon className="w-4 h-4" />
      </button>

      {/* sm+: segmented control */}
      <div
        role="radiogroup"
        aria-label="Pilih tema tampilan"
        className="hidden sm:flex items-center bg-stone-100 dark:bg-stone-800 rounded-full p-0.5 border border-stone-200 dark:border-stone-700 shrink-0"
      >
        {THEMES.map(({ id, label, Icon, active }) => {
          const isActive = theme === id;
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={isActive}
              aria-label={`Mode ${label}`}
              title={`Mode ${label}`}
              onClick={() => onChange(id)}
              className={`p-1.5 rounded-full transition-colors ${
                isActive
                  ? active
                  : 'text-stone-400 hover:text-stone-700 dark:hover:text-stone-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
            </button>
          );
        })}
      </div>
    </>
  );
}
