'use client';

import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

export default function ThemeToggle({ className = '', compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={theme === 'dark' ? 'Aydınlık Moda Geç' : 'Karanlık Moda Geç'}
      aria-label="Tema Değiştir"
      className={`p-2 rounded-xl transition-all flex items-center justify-center ${
        theme === 'dark'
          ? 'bg-slate-900 text-amber-300 hover:bg-slate-800 border border-slate-800'
          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 shadow-sm'
      } ${className}`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 text-indigo-600" />
      )}
      {!compact && (
        <span className="hidden sm:inline ml-1.5 text-xs font-semibold">
          {theme === 'dark' ? 'Aydınlık' : 'Karanlık'}
        </span>
      )}
    </button>
  );
}
