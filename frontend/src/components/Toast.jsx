import React from 'react';
import { useBible } from '../context/BibleContext';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useBible();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 text-stone-100 dark:bg-stone-100/95 dark:text-stone-900 text-xs font-semibold shadow-lg backdrop-blur-sm border border-stone-800/20">
        <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
