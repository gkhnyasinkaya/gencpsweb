'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ApplyModal from '@/components/ApplyModal';
import CourseDetailModal from '@/components/CourseDetailModal';
import HeroParticleBackground from '@/components/HeroParticleBackground';
import { CATEGORIES, CITIES, COURSES, INSTRUCTORS, FAQS, TESTIMONIALS, Course, Instructor, Testimonial, FAQ } from '@/data/courses';
import { PUBLICATIONS, Publication } from '@/data/publications';
import { 
  getStoredCourses, 
  getStoredInstructors, 
  getStoredSiteSettings,
  getStoredFaqs,
  getStoredTestimonials,
  DEFAULT_SETTINGS,
  SiteSettings
} from '@/lib/store';
import { 
  GraduationCap, 
  Search, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  Star, 
  HelpCircle, 
  Filter, 
  BookOpen, 
  ArrowRight,
  Minus,
  Plus,
  MapPin,
  ChevronDown,
  ChevronUp,
  Newspaper,
  FileText,
  Bookmark,
  Mail,
  Send,
  Sparkles,
  Globe,
  X
} from 'lucide-react';

export default function AkademiPage() {
  const [courses, setCourses] = useState<Course[]>(COURSES);
  const [instructors, setInstructors] = useState<Instructor[]>(INSTRUCTORS);
  const [faqs, setFaqs] = useState<FAQ[]>(FAQS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedFeeType, setSelectedFeeType] = useState<'all' | 'free' | 'paid'>('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedCity !== 'all') count++;
    if (selectedFeeType !== 'all') count++;
    if (selectedFormat !== 'all') count++;
    if (searchQuery.trim() !== '') count++;
    return count;
  }, [selectedCategory, selectedCity, selectedFeeType, selectedFormat, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedCity('all');
    setSelectedFeeType('all');
    setSelectedFormat('all');
    setSearchQuery('');
  };

  // Hero Mouse Tracking Animation State
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setMousePos({ x, y });
  };

  // Initial visible items limit for pagination desktop
  const INITIAL_VISIBLE_COUNT = 6;
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  // Modals state
  const [selectedCourseForDetail, setSelectedCourseForDetail] = useState<Course | null>(null);
  const [selectedCourseForApply, setSelectedCourseForApply] = useState<Course | null>(null);

  // Accordion state for FAQs
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    setCourses(getStoredCourses());
    setInstructors(getStoredInstructors());
    setSettings(getStoredSiteSettings());
    setFaqs(getStoredFaqs());
    setTestimonials(getStoredTestimonials());
  }, []);

  // Reset pagination limit when filters change
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [selectedCategory, selectedCity, selectedFeeType, selectedFormat, searchQuery]);

  // Dynamic Cities derived strictly from current courses database (excludes 'Online')
  const availableCities = useMemo(() => {
    const set = new Set<string>();
    courses.forEach((c) => {
      if (c.city && c.city !== 'Online' && c.city !== 'Online Canlı' && c.city !== 'Tüm Şehirler') {
        set.add(c.city);
      }
    });
    return Array.from(set).sort();
  }, [courses]);

  // Filter logic
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchCity = selectedCity === 'all' || course.city === selectedCity;
      const matchFeeType = 
        selectedFeeType === 'all' || 
        (selectedFeeType === 'free' && course.isFree) || 
        (selectedFeeType === 'paid' && !course.isFree);
      
      const matchFormat = selectedFormat === 'all' || course.format === selectedFormat;
      const matchSearch = 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.location && course.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchCategory && matchCity && matchFeeType && matchFormat && matchSearch;
    });
  }, [courses, selectedCategory, selectedCity, selectedFeeType, selectedFormat, searchQuery]);

  // Slice displayed courses based on limit
  const displayedCourses = useMemo(() => {
    return filteredCourses.slice(0, visibleCount);
  }, [filteredCourses, visibleCount]);

  const hasMore = filteredCourses.length > visibleCount;

  // Render individual section by ID for DYNAMIC CMS REORDERING
  const renderSectionById = (secId: string) => {
    switch (secId) {
      case 'announcement':
        return settings.announcementEnabled ? (
          <div key="sec-announcement" className="announcement-bar-container bg-gradient-to-r from-sky-800 via-blue-900 to-indigo-900 text-white text-xs font-bold py-2.5 px-4 text-center relative flex items-center justify-center gap-2 shadow-md z-40 border-b border-sky-600/30">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{settings.announcementText || 'Erken Kayıt Fırsatı: Tüm Klinik Terapilerde %25 İndirim!'}</span>
            {settings.announcementLinkText && (
              <a href={settings.announcementLinkUrl || '#courses'} className="px-2.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors underline underline-offset-2 ml-1 text-[11px]">
                {settings.announcementLinkText}
              </a>
            )}
          </div>
        ) : null;

      case 'hero':
        return (
          <section 
            key="sec-hero" 
            onMouseMove={handleHeroMouseMove}
            className="relative pt-10 pb-14 sm:pt-16 sm:pb-24 overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-colors duration-300"
          >
            {/* 3D Particle Billboard Background (Three.js) */}
            {settings.enableHeroInteractiveAnimation !== false && (
              <HeroParticleBackground />
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-3xl mx-auto space-y-4 sm:space-y-6">
                
                {/* Clean Professional Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 font-extrabold text-xs tracking-wider uppercase backdrop-blur-sm">
                  <span>{settings.heroBadge || 'Genç Psikologlar Akademi Portalı'}</span>
                </div>

                {/* Main Headline */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.18]">
                  {settings.heroTitleLine1 || 'Prestijli Eğitim,'} <br />
                  <span className="text-sky-700 dark:text-sky-400">
                    {settings.heroTitleLine2 || 'Geleceği Şekillendiren Terapistler'}
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto px-2">
                  {settings.heroDescription || 'Meslektaşlarınız burada öğrendi, burada uyguladı. e-Devlet ve Üniversite onaylı sertifikalı programlar, canlı süpervizyonlar ve uzman eğitmen kadrosuyla kariyerinizde fark yaratın.'}
                </p>

                {/* Stats Bar */}
                {settings.showHeroStats !== false && (
                  <div className="pt-4 sm:pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-3xl mx-auto">
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center backdrop-blur-sm">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white block">{settings.statsGraduates || '5,000+'}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Mezun Psikolog</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center backdrop-blur-sm">
                      <span className="text-2xl sm:text-3xl font-black text-sky-700 dark:text-sky-400 block">{settings.statsPrograms || '40+'}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Sertifikalı Program</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center backdrop-blur-sm">
                      <span className="text-2xl sm:text-3xl font-black text-emerald-700 dark:text-emerald-400 block">{settings.statsSatisfaction || '%98.4'}</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Memnuniyet Oranı</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 text-center backdrop-blur-sm">
                      <span className="text-2xl sm:text-3xl font-black text-indigo-700 dark:text-indigo-400 block">GPM</span>
                      <span className="text-xs text-slate-600 dark:text-slate-400 font-semibold">Akademi Sertifikası</span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </section>
        );

      case 'shortcuts':
        return (settings.showFeaturedShortcuts !== false && settings.featuredShortcuts && settings.featuredShortcuts.length > 0) ? (
          <section key="sec-shortcuts" id="shortcuts" className="py-8 bg-sky-50/60 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-600" />
                  {settings.featuredShortcutsTitle || 'Öne Çıkan Hızlı Erişimler'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {settings.featuredShortcuts.map((sc) => (
                  <a
                    key={sc.id}
                    href={sc.link || '#courses'}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 transition-all shadow-sm group"
                  >
                    <span>{sc.title}</span>
                    <span className="px-2 py-0.5 rounded bg-sky-100 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 text-[10px] group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      {sc.badge}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'courses':
        return (
          <section key="sec-courses" id="courses" className="py-10 sm:py-16 bg-slate-50 dark:bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* TOP HEADER & ACTION BAR */}
              <div id="search-section" className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-[11px] font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-widest block mb-1">
                    EĞİTİM VE SEMİNER PROGRAMLARI
                  </span>
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    Kariyerinizi Güçlendirecek Akademi Etkinlikleri
                  </h2>
                </div>

                {/* SEARCH INPUT & FILTER TOGGLE BUTTON GROUP */}
                <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0">
                  {/* Search Input */}
                  <div className="relative flex-1 lg:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Eğitim, seminer veya şehir ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 text-xs focus:outline-none focus:border-sky-500 transition-colors shadow-xs"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white p-0.5"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Toggle Filters Button */}
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className={`px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 shrink-0 shadow-xs cursor-pointer ${
                      showFilters || activeFilterCount > 0
                        ? 'bg-sky-50 dark:bg-sky-950/60 border-sky-300 dark:border-sky-700 text-sky-700 dark:text-sky-300'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <Filter className="w-3.5 h-3.5 text-sky-600" />
                    <span>Filtreler</span>
                    {activeFilterCount > 0 && (
                      <span className="w-4 h-4 rounded-full bg-sky-600 text-white text-[10px] font-black flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                    {showFilters ? (
                      <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* STITCH GEMINI COLLAPSIBLE FILTER PANEL */}
              {showFilters && (
                <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm mb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* Row 1: Primary Category Pills (Stitch Style Rounded-Full) */}
                  <div className="flex flex-wrap items-center gap-2">
                    {CATEGORIES.map((cat) => {
                      const isActive = selectedCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                            isActive
                              ? 'bg-sky-600 text-white shadow-xs'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750'
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Horizontal Divider */}
                  <div className="border-t border-slate-100 dark:border-slate-800/80 pt-3 flex flex-wrap items-center justify-between gap-3">
                    
                    {/* Row 2 Left: Sub-filter Dropdowns */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      
                      {/* Format Dropdown */}
                      <div className="relative">
                        <select
                          value={selectedFormat}
                          onChange={(e) => setSelectedFormat(e.target.value)}
                          className="appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold focus:outline-none focus:border-sky-500 cursor-pointer shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                        >
                          <option value="all">Eğitim Formatı (Tümü)</option>
                          <option value="Online Canlı">Online Canlı</option>
                          <option value="Yüz Yüze">Yüz Yüze</option>
                          <option value="Hibrit">Hibrit</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Dynamic City Dropdown */}
                      <div className="relative">
                        <select
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold focus:outline-none focus:border-sky-500 cursor-pointer shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                        >
                          <option value="all">Şehir (Tümü)</option>
                          {availableCities.map((cityName) => (
                            <option key={cityName} value={cityName}>
                              {cityName}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                      {/* Fee Type Dropdown */}
                      <div className="relative">
                        <select
                          value={selectedFeeType}
                          onChange={(e) => setSelectedFeeType(e.target.value as any)}
                          className="appearance-none pl-3.5 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 text-xs font-bold focus:outline-none focus:border-emerald-500 cursor-pointer shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                        >
                          <option value="all">Fiyat / Ücret (Tümü)</option>
                          <option value="free">Ücretsiz Seminerler</option>
                          <option value="paid">Sertifikalı Programlar</option>
                        </select>
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>

                    </div>

                    {/* Row 2 Right: Reset Button */}
                    {activeFilterCount > 0 && (
                      <button
                        onClick={handleResetFilters}
                        className="px-3 py-1.5 rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 font-bold text-xs transition-colors cursor-pointer"
                      >
                        Filtreleri Sıfırla
                      </button>
                    )}

                  </div>

                </div>
              )}

              {/* ACTIVE FILTERS SUMMARY CHIPS (When Filters panel is hidden but filters are active) */}
              {!showFilters && activeFilterCount > 0 && (
                <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 text-xs">
                  <span className="text-slate-400 font-semibold text-[11px] shrink-0">Aktif Filtreler:</span>
                  
                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-[11px] font-semibold">
                      Kategori: {CATEGORIES.find(c => c.id === selectedCategory)?.label}
                      <button onClick={() => setSelectedCategory('all')} className="hover:text-rose-500 cursor-pointer"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {selectedFormat !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-[11px] font-semibold">
                      Format: {selectedFormat}
                      <button onClick={() => setSelectedFormat('all')} className="hover:text-rose-500 cursor-pointer"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {selectedCity !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 text-[11px] font-semibold">
                      Şehir: {CITIES.find(c => c.id === selectedCity)?.label}
                      <button onClick={() => setSelectedCity('all')} className="hover:text-rose-500 cursor-pointer"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {selectedFeeType !== 'all' && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold">
                      Ücret: {selectedFeeType === 'free' ? 'Ücretsiz Seminerler' : 'Sertifikalı Programlar'}
                      <button onClick={() => setSelectedFeeType('all')} className="hover:text-rose-500 cursor-pointer"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  {searchQuery && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-[11px] font-semibold">
                      Arama: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="hover:text-rose-500 cursor-pointer"><X className="w-3 h-3" /></button>
                    </span>
                  )}

                  <button
                    onClick={handleResetFilters}
                    className="text-slate-400 hover:text-rose-600 text-[11px] underline font-semibold ml-1 shrink-0 cursor-pointer"
                  >
                    Tümünü Temizle
                  </button>
                </div>
              )}

              {/* Mobile swipe hint */}
              <div className="md:hidden flex items-center justify-between text-xs mb-3 text-slate-500 font-bold px-1">
                <span>Etkinlik Listesi ({filteredCourses.length})</span>
                <span className="text-sky-700 dark:text-sky-400 flex items-center gap-1">
                  Kaydırmak için yatay çekin &rarr;
                </span>
              </div>

              {/* CLICKABLE COURSE CARDS GRID & MOBILE HORIZONTAL CAROUSEL SWIPE */}
              {filteredCourses.length === 0 ? (
                <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                  <BookOpen className="w-10 h-10 text-slate-400 dark:text-slate-600 mx-auto mb-2" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Eğitim Bulunamadı</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-3">
                    Arama kriterlerinize veya seçilen filtreye uygun etkinlik bulunamadı. Lütfen filtreleri sıfırlayın.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedCity('all');
                      setSelectedFeeType('all');
                      setSelectedFormat('all');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 rounded-xl bg-sky-500/10 text-sky-700 dark:text-sky-300 font-semibold border border-sky-500/30 text-xs"
                  >
                    Filtreleri Sıfırla
                  </button>
                </div>
              ) : (
                <div className="space-y-8">
                  
                  {/* Horizontal Carousel on Mobile (flex overflow-x-auto), Grid on Desktop (md:grid) */}
                  {/* Clean Grid on Web & Mobile (Standardized Compact Heights) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {displayedCourses.map((course) => {
                      return (
                        <div
                          key={course.id}
                          onClick={() => setSelectedCourseForDetail(course)}
                          className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group cursor-pointer"
                        >
                          <div>
                            {/* Promotional Poster Image Area */}
                            {course.image && (
                              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 border-b border-slate-100 dark:border-slate-800">
                                <img
                                  src={course.image}
                                  alt={course.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                
                                {/* Category Overlay Tag */}
                                <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-lg bg-sky-600/90 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-sm backdrop-blur-xs">
                                  {course.category}
                                </span>

                                {/* Format / Free Overlay Tag */}
                                <span className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-lg font-extrabold text-[10px] uppercase tracking-wider shadow-sm backdrop-blur-xs ${
                                  course.isFree 
                                    ? 'bg-emerald-600/90 text-white' 
                                    : 'bg-slate-900/85 text-slate-100 border border-slate-700'
                                }`}>
                                  {course.isFree ? 'Ücretsiz' : course.format}
                                </span>
                              </div>
                            )}

                            {/* Card Main Body */}
                            <div className="p-4 space-y-2">
                              {/* Title */}
                              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-snug line-clamp-2">
                                {course.title}
                              </h3>

                              {/* Description */}
                              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                                {course.description}
                              </p>

                              {/* Meta Info Row */}
                              <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                                <div className="flex items-center gap-1 font-medium">
                                  <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                                  <span>{course.duration || `${course.totalHours} Saat`}</span>
                                </div>

                                <div className="flex items-center gap-1 font-medium truncate">
                                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                                  <span className="truncate">{course.city === 'Online' ? 'Canlı Online' : course.city}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Footer Price & Action */}
                          <div className="px-4 py-3 bg-slate-50/70 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            {/* Price Display */}
                            {course.isFree ? (
                              <span className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                                Ücretsiz
                              </span>
                            ) : (
                              <div className="flex items-baseline gap-1.5">
                                <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                                  ₺{course.discountedPrice.toLocaleString('tr-TR')}
                                </span>
                                {course.originalPrice > course.discountedPrice && (
                                  <span className="text-xs text-slate-400 line-through">
                                    ₺{course.originalPrice.toLocaleString('tr-TR')}
                                  </span>
                                )}
                              </div>
                            )}

                            {/* Compact Action Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedCourseForDetail(course);
                              }}
                              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-extrabold transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                            >
                              <span>İncele</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* EXPANDABLE "TÜMÜNÜ GÖR" LOAD MORE BUTTON (Desktop) */}
                  <div className="text-center pt-4">
                    {hasMore ? (
                      <button
                        onClick={() => setVisibleCount(filteredCourses.length)}
                        className="px-8 py-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:border-sky-500 text-slate-800 dark:text-white font-extrabold text-xs sm:text-sm shadow-sm hover:text-sky-700 transition-all inline-flex items-center gap-2 group"
                      >
                        <span>Tüm Eğitim Programlarını Göster ({filteredCourses.length - visibleCount} Etkinlik Daha)</span>
                        <ChevronDown className="w-4 h-4 text-sky-600 group-hover:translate-y-0.5 transition-transform" />
                      </button>
                    ) : filteredCourses.length > INITIAL_VISIBLE_COUNT ? (
                      <button
                        onClick={() => setVisibleCount(INITIAL_VISIBLE_COUNT)}
                        className="px-6 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-xs inline-flex items-center gap-1.5 hover:text-slate-900"
                      >
                        <span>Daha Az Göster</span>
                        <ChevronUp className="w-4 h-4" />
                      </button>
                    ) : null}
                  </div>

                </div>
              )}

            </div>
          </section>
        );

      case 'publications':
        return (settings.showPublications !== false) ? (
          <section key="sec-publications" id="publications" className="py-12 sm:py-20 bg-slate-100/70 dark:bg-slate-900/60 border-t border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-widest block mb-1">
                    BİLİMSEL İÇERİK VE LİTERATÜR
                  </span>
                  <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    {settings.publicationsTitle || 'Seçkin Akademik Yayınlarımız'}
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
                  Psikoloji ve ruh sağlığı literatürüne katkı sağlayan e-dergilerimiz, klinik makalelerimiz ve vaka incelemelerimiz.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                {/* Featured Main Journal Issue */}
                {PUBLICATIONS.filter(p => p.featured).map((pub) => (
                  <div 
                    key={pub.id}
                    className="lg:col-span-2 relative rounded-3xl overflow-hidden bg-slate-900 text-white border border-slate-800 group shadow-xl flex flex-col justify-end min-h-[340px] sm:min-h-[420px] p-6 sm:p-8"
                  >
                    <img
                      src={pub.coverImage}
                      alt={pub.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

                    <div className="relative z-10 space-y-3">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-3 py-1 rounded-full bg-sky-600 text-white font-extrabold">
                          {pub.issue}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                          {pub.readTime}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-3xl font-black text-white leading-snug">
                        {pub.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed max-w-2xl">
                        {pub.summary}
                      </p>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-xs text-sky-400 font-semibold">
                          Yazarlar: {pub.authors.join(', ')}
                        </span>
                        <button 
                          onClick={() => alert(`"${pub.title}" dergi sayımız açılıyor.`)}
                          className="px-5 py-2.5 rounded-xl bg-white text-slate-900 hover:bg-sky-400 hover:text-slate-950 font-bold text-xs transition-all shadow-lg flex items-center gap-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Dergiyi Oku</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Secondary Research Articles List */}
                <div className="space-y-4 flex flex-col justify-between">
                  {PUBLICATIONS.filter(p => !p.featured).map((pub) => (
                    <div
                      key={pub.id}
                      className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 hover:border-sky-500/40 transition-all shadow-sm flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-sky-700 dark:text-sky-400">{pub.category}</span>
                          <span className="text-slate-400">{pub.date}</span>
                        </div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug line-clamp-2">
                          {pub.title}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                          {pub.summary}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-500 font-medium truncate">{pub.authors[0]}</span>
                        <button 
                          onClick={() => alert(`"${pub.title}" yayını indiriliyor.`)}
                          className="font-bold text-sky-700 dark:text-sky-400 hover:underline inline-flex items-center gap-1 shrink-0"
                        >
                          <span>İncele</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        ) : null;

      case 'instructors':
        return (settings.showInstructorsSection !== false) ? (
          <section key="sec-instructors" id="instructors" className="py-12 sm:py-20 bg-white dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 space-y-2.5">
                <span className="text-xs font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-widest">
                  AKADEMİK VE KLİNİK KADRO
                </span>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Alanında Öncü Uzman Eğitmenlerimiz
                </h2>
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 px-2">
                  Eğitimlerimiz, uluslararası literatüre hakim, yıllardır sahada binlerce danışan görmüş kıdemli akademisyenler tarafından verilmektedir.
                </p>
              </div>

              {/* Mobile swipe hint */}
              <div className="md:hidden flex items-center justify-between text-xs mb-3 text-slate-500 font-bold px-1">
                <span>Eğitmen Kadromuz ({instructors.length})</span>
                <span className="text-sky-700 dark:text-sky-400 flex items-center gap-1">
                  Kaydırmak için yatay çekin &rarr;
                </span>
              </div>

              {/* Horizontal Carousel on Mobile (flex overflow-x-auto), Grid on Desktop (md:grid) */}
              <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-none md:grid md:grid-cols-3 md:overflow-visible">
                {instructors.map((inst) => (
                  <div
                    key={inst.id}
                    className="w-[75vw] max-w-[280px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink bg-slate-50 dark:bg-slate-900 p-6 rounded-3xl text-center space-y-4 border border-slate-200 dark:border-slate-800 hover:border-sky-500/40 transition-all shadow-sm flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <img
                        src={inst.avatar}
                        alt={inst.name}
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover mx-auto border-2 border-sky-600 shadow-xl"
                      />
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">{inst.name}</h3>
                        <p className="text-xs text-sky-700 dark:text-sky-400 font-semibold">{inst.title}</p>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {inst.bio}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-semibold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {inst.expertise}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'testimonials':
        return (settings.showTestimonialsSection !== false) ? (
          <section key="sec-testimonials" id="testimonials" className="py-12 sm:py-20 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2.5">
                <span className="text-xs font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-widest">
                  MEZUN VE KATILIMCI GÖRÜŞLERİ
                </span>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Meslektaşlarımız Ne Diyor?
                </h2>
                <p className="text-xs sm:text-base text-slate-600 dark:text-slate-400 px-2">
                  Akademimizden mezun olan psikolog ve PDR uzmanlarının gerçek deneyimleri.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {testimonials.map((test) => (
                  <div
                    key={test.id}
                    className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 flex flex-col justify-between shadow-sm"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-1 text-amber-500">
                        {[...Array(test.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed">
                        "{test.comment}"
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                      <img
                        src={test.avatar}
                        alt={test.name}
                        className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{test.name}</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{test.role} • {test.university}</p>
                        <span className="text-[10px] text-sky-700 dark:text-sky-400 font-semibold truncate block">{test.courseTaken}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null;

      case 'faq':
        return settings.showFaqSection !== false ? (
          <section key="sec-faq" id="faq" className="py-12 sm:py-20 bg-white dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-2.5 mb-10">
                <span className="text-xs font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-widest">
                  SORMAK İSTEDİKLERİNİZ
                </span>
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Sıkça Sorulan Sorular
                </h2>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden transition-all shadow-sm"
                    >
                      <button
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-xs sm:text-base hover:text-sky-700 transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 shrink-0" />
                          {faq.question}
                        </span>
                        {isOpen ? (
                          <Minus className="w-4 h-4 text-sky-600 shrink-0" />
                        ) : (
                          <Plus className="w-4 h-4 text-slate-400 shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-850">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : null;

      default:
        return null;
    }
  };

  const activeSectionOrder = settings.sectionOrder && settings.sectionOrder.length > 0 
    ? settings.sectionOrder 
    : ['announcement', 'hero', 'courses', 'publications', 'instructors', 'testimonials', 'faq'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-sky-500 selection:text-white transition-colors duration-300">
      
      {/* Header */}
      <Header onOpenSearch={() => {
        const el = document.getElementById('search-section');
        el?.scrollIntoView({ behavior: 'smooth' });
      }} />

      {/* Main Content (DYNAMIC SECTION ORDERING BASED ON CMS) */}
      <main className="grow">
        {activeSectionOrder.map((secId) => (
          <React.Fragment key={secId}>
            {renderSectionById(secId)}
          </React.Fragment>
        ))}
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <CourseDetailModal
        course={selectedCourseForDetail}
        onClose={() => setSelectedCourseForDetail(null)}
        onApply={(course) => setSelectedCourseForApply(course)}
      />

      <ApplyModal
        course={selectedCourseForApply}
        onClose={() => setSelectedCourseForApply(null)}
      />

    </div>
  );
}
