'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { 
  GraduationCap, 
  Menu, 
  X, 
  ChevronRight, 
  BookOpen, 
  Award, 
  Users,
  HelpCircle,
  Newspaper
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', href);
      } else {
        window.location.href = `/akademi${href}`;
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white dark:bg-slate-950 shadow-md border-b border-slate-200 dark:border-slate-800 py-2.5'
          : 'bg-white/95 dark:bg-slate-950/95 py-3.5 border-b border-slate-200 dark:border-slate-800'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <Link href="/akademi" className="flex items-center gap-2.5 sm:gap-3 group shrink-0 min-w-0">
            <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 p-0.5 shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[14px] flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-sky-700 dark:text-sky-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-sm sm:text-lg text-slate-900 dark:text-white tracking-tight leading-none truncate group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                  GENÇ PSİKOLOGLAR
                </span>
                <span className="bg-sky-50 dark:bg-sky-500/20 border border-sky-200 dark:border-sky-500/30 text-sky-700 dark:text-sky-400 text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded uppercase shrink-0">
                  AKADEMİ
                </span>
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide truncate hidden sm:block">
                GPM Katılım & Başarı Sertifikasyonu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links including Academic Publications */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-xs font-extrabold text-slate-800 dark:text-slate-200">
            <Link 
              href="#courses" 
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#courses')}
              className="text-slate-800 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <BookOpen className="w-4 h-4 text-sky-600" />
              <span>Eğitim Programları</span>
            </Link>
            <Link 
              href="#publications" 
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#publications')}
              className="text-slate-800 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Newspaper className="w-4 h-4 text-sky-600" />
              <span>Akademik Yayınlar</span>
            </Link>
            <Link 
              href="#instructors" 
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#instructors')}
              className="text-slate-800 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-sky-600" />
              <span>Eğitmen Kadromuz</span>
            </Link>
            <Link 
              href="#testimonials" 
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#testimonials')}
              className="text-slate-800 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-sky-600" />
              <span>Mezun Görüşleri</span>
            </Link>
            <Link 
              href="#faq" 
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, '#faq')}
              className="text-slate-800 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-sky-600" />
              <span>SSS</span>
            </Link>
          </nav>

          {/* Right Corner Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <LanguageSwitcher />
            <ThemeToggle compact />

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:text-sky-700 transition-colors"
                aria-label="Menü"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-sky-600" /> : <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[57px] z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-2xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2 font-bold text-slate-800 dark:text-slate-200 text-xs">
            <Link
              href="#courses"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                setMobileMenuOpen(false);
                handleNavClick(e, '#courses');
              }}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-sky-500/40"
            >
              <span className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-sky-600" />
                Eğitim Programları
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="#publications"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                setMobileMenuOpen(false);
                handleNavClick(e, '#publications');
              }}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-sky-500/40"
            >
              <span className="flex items-center gap-2.5">
                <Newspaper className="w-4 h-4 text-sky-600" />
                Akademik Yayınlar & E-Dergi
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="#instructors"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                setMobileMenuOpen(false);
                handleNavClick(e, '#instructors');
              }}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-sky-500/40"
            >
              <span className="flex items-center gap-2.5">
                <Award className="w-4 h-4 text-sky-600" />
                Eğitmen Kadromuz
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="#testimonials"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                setMobileMenuOpen(false);
                handleNavClick(e, '#testimonials');
              }}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-sky-500/40"
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-sky-600" />
                Mezun Görüşleri
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>

            <Link
              href="#faq"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                setMobileMenuOpen(false);
                handleNavClick(e, '#faq');
              }}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-sky-500/40"
            >
              <span className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-sky-600" />
                Sıkça Sorulan Sorular
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
