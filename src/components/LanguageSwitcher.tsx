'use client';

import React, { useState } from 'react';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState<'TR' | 'EN'>('TR');
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-2 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-900 border border-slate-800 dark:border-slate-800 text-[11px] font-bold text-slate-200 dark:text-slate-200 hover:text-white flex items-center gap-1 transition-all shadow-sm shrink-0"
        aria-label="Dil Seçimi"
      >
        <Globe className="w-3.5 h-3.5 text-sky-400" />
        <span>{lang}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-28 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 text-xs font-semibold text-slate-200 space-y-1">
          <button
            onClick={() => {
              setLang('TR');
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors flex items-center justify-between ${
              lang === 'TR' ? 'bg-sky-500 text-white font-bold' : 'hover:bg-slate-800'
            }`}
          >
            <span>Türkçe</span>
            <span className="text-[10px] opacity-80">TR</span>
          </button>
          <button
            onClick={() => {
              setLang('EN');
              setOpen(false);
            }}
            className={`w-full text-left px-3 py-1.5 rounded-xl transition-colors flex items-center justify-between ${
              lang === 'EN' ? 'bg-sky-500 text-white font-bold' : 'hover:bg-slate-800'
            }`}
          >
            <span>English</span>
            <span className="text-[10px] opacity-80">EN</span>
          </button>
        </div>
      )}
    </div>
  );
}
