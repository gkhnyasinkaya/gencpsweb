'use client';

import React, { useState, useEffect } from 'react';
import { 
  getStoredSiteSettings, 
  setStoredSiteSettings, 
  getStoredFaqs, 
  setStoredFaqs,
  getStoredTestimonials,
  setStoredTestimonials,
  SiteSettings,
  AcademicPublication,
  FeaturedShortcut,
  NavItem
} from '@/lib/store';
import { FAQ, Testimonial } from '@/data/courses';
import { 
  Edit3, 
  Save, 
  Globe, 
  HelpCircle, 
  Star, 
  Plus, 
  Trash2, 
  Check, 
  Sparkles, 
  FileText,
  ChevronUp,
  ChevronDown,
  LayoutDashboard,
  Award,
  GripVertical
} from 'lucide-react';

export default function AdminContentPage() {
  const [activeTab, setActiveTab] = useState<'announcement_hud' | 'hero' | 'shortcuts' | 'publications' | 'sections' | 'general' | 'faq' | 'testimonials'>('announcement_hud');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  // Settings State
  const [settings, setSettings] = useState<SiteSettings>({
    siteTitle: '',
    siteSubtitle: '',
    heroBadge: '',
    heroTitleLine1: '',
    heroTitleLine2: '',
    heroDescription: '',
    whatsappNumber: '',
    phone: '',
    email: '',
    address: '',
    instagramUrl: '',
    linkedinUrl: '',
    youtubeUrl: '',
    statsGraduates: '',
    statsPrograms: '',
    statsSatisfaction: '',

    announcementEnabled: true,
    announcementText: '',
    announcementLinkText: '',
    announcementLinkUrl: '',

    logoIcon: '🎓',
    logoText: 'GPA ADMİN',
    navMenuItems: [],

    heroBackgroundType: 'gradient',
    heroBackgroundValue: '',
    enableHeroInteractiveAnimation: true,
    showHeroStats: true,

    showFeaturedShortcuts: true,
    featuredShortcutsTitle: '',
    featuredShortcuts: [],

    showPublications: true,
    publicationsTitle: '',
    publications: [],

    showInstructorsSection: true,
    showTestimonialsSection: true,
    showFaqSection: true,

    sectionOrder: ['announcement', 'hero', 'shortcuts', 'courses', 'publications', 'instructors', 'testimonials', 'faq']
  });

  // FAQs State
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    setSettings(getStoredSiteSettings());
    setFaqs(getStoredFaqs());
    setTestimonials(getStoredTestimonials());
  }, []);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setStoredSiteSettings(settings);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Move section up/down in drag & drop order list
  const moveSection = (idx: number, direction: number) => {
    const newOrder = [...settings.sectionOrder];
    const targetIdx = idx + direction;
    if (targetIdx >= 0 && targetIdx < newOrder.length) {
      const temp = newOrder[idx];
      newOrder[idx] = newOrder[targetIdx];
      newOrder[targetIdx] = temp;
      setSettings({ ...settings, sectionOrder: newOrder });
    }
  };

  // HTML5 Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIdx(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === index) return;
    const newOrder = [...settings.sectionOrder];
    const [removed] = newOrder.splice(draggedIdx, 1);
    newOrder.splice(index, 0, removed);
    setSettings({ ...settings, sectionOrder: newOrder });
    setDraggedIdx(null);
  };

  const sectionNameLabels: Record<string, string> = {
    announcement: '📣 Bildirim Geçen Yazı Bandı',
    hero: '🚀 Hero & Prestijli Eğitim Alanı',
    shortcuts: '⚡ Öne Çıkanlar (Hızlı Erişim)',
    courses: '🎓 Eğitimler ve Seminerler',
    publications: '📚 Akademik PDF Yayınlar',
    instructors: '👨‍🏫 Eğitmen Kadrosu',
    testimonials: '💬 Meslektaş & Mezun Görüşleri',
    faq: '❓ Sıkça Sorulan Sorular (SSS)'
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Edit3 className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            Genç Psikologlar Akademi CMS & Site Yapıcı Paneli
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Üst bar HUD menülerinden bildirim yazılarına, akademik PDF yayınlarından sürükle-bırak bölüm sıralamasına kadar tüm siteyi anında yönetin.
          </p>
        </div>

        {saveSuccess && (
          <div className="px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-xs font-bold flex items-center gap-2 animate-bounce">
            <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Değişiklikler Canlı Sitede Yayınlandı!</span>
          </div>
        )}
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'announcement_hud', label: '📣 Bildirim & Üst Bar (HUD)', icon: Sparkles },
          { id: 'hero', label: '🚀 Hero & Arka Plan', icon: Sparkles },
          { id: 'shortcuts', label: '⚡ Öne Çıkanlar', icon: Globe },
          { id: 'publications', label: '📚 Akademik Yayınlar (PDF)', icon: FileText },
          { id: 'sections', label: '🔀 Sürükle-Bırak Sıralama', icon: LayoutDashboard },
          { id: 'general', label: '🌐 Sosyal & İletişim', icon: Globe },
          { id: 'faq', label: '❓ SSS', icon: HelpCircle },
          { id: 'testimonials', label: '💬 Görüşler', icon: Star },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings}>
        
        {/* Tab 1: Announcement & HUD Navbar */}
        {activeTab === 'announcement_hud' && (
          <div className="space-y-6">
            
            {/* Top Announcement Bar */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  Barın Üstünde Geçen Bildirim Yazısı (Announcement Bar)
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.announcementEnabled}
                    onChange={(e) => setSettings({ ...settings, announcementEnabled: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {settings.announcementEnabled ? 'Canlı Sitede Gösteriliyor' : 'Gizli/Kaldırıldı'}
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Bildirim Yazısı Metni:</label>
                  <input
                    type="text"
                    value={settings.announcementText || ''}
                    onChange={(e) => setSettings({ ...settings, announcementText: e.target.value })}
                    placeholder="Örn: %25 İndirim Fırsatı! Erken Kayıt Avantajını Kaçırmayın."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Buton Link Metni:</label>
                  <input
                    type="text"
                    value={settings.announcementLinkText || ''}
                    onChange={(e) => setSettings({ ...settings, announcementLinkText: e.target.value })}
                    placeholder="Örn: İncele →"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* HUD Navbar & Logo */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-sky-500" />
                Üst Bar HUD (Logo & Menü Yönetimi)
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Logo Simgesi (Emoji / Icon):</label>
                  <input
                    type="text"
                    value={settings.logoIcon || '🎓'}
                    onChange={(e) => setSettings({ ...settings, logoIcon: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Site Logosu / Marka İsmi:</label>
                  <input
                    type="text"
                    value={settings.logoText || 'GPA ADMİN'}
                    onChange={(e) => setSettings({ ...settings, logoText: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* HUD Menu Items */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">HUD Navigasyon Menü Öğeleri:</label>
                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [...(settings.navMenuItems || []), { id: `nav-${Date.now()}`, label: 'Yeni Menü', href: '#' }];
                      setSettings({ ...settings, navMenuItems: newItems });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-500/20 text-xs font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Yeni Menü Ekle
                  </button>
                </div>

                <div className="space-y-2">
                  {(settings.navMenuItems || []).map((item, idx) => (
                    <div key={item.id || idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                      <input
                        type="text"
                        value={item.label}
                        onChange={(e) => {
                          const updated = [...settings.navMenuItems];
                          updated[idx].label = e.target.value;
                          setSettings({ ...settings, navMenuItems: updated });
                        }}
                        placeholder="Menü Başlığı"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={item.href}
                        onChange={(e) => {
                          const updated = [...settings.navMenuItems];
                          updated[idx].href = e.target.value;
                          setSettings({ ...settings, navMenuItems: updated });
                        }}
                        placeholder="Link (#courses)"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = settings.navMenuItems.filter((_, i) => i !== idx);
                          setSettings({ ...settings, navMenuItems: updated });
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Hero & Prestijli Eğitim */}
        {activeTab === 'hero' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-500" />
              "Prestijli Eğitim..." Hero & İstatistikler Editörü
            </h3>

            {/* INTERACTIVE MOUSE ANIMATION TOGGLE */}
            <div className="p-3.5 rounded-2xl bg-sky-50 dark:bg-sky-500/10 border border-sky-200 dark:border-sky-500/20 flex items-center justify-between">
              <div>
                <span className="font-extrabold text-sky-800 dark:text-sky-300 text-xs block">🖱️ Fareye Duyarlı İnteraktif Arka Plan Animasyonu</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Ziyaretçi fareyi hero üzerinde hareket ettirdiğinde yumuşak ışık baloncukları ve parçacıklar imleci takip eder.</span>
              </div>
              <input
                type="checkbox"
                checked={settings.enableHeroInteractiveAnimation !== false}
                onChange={(e) => setSettings({ ...settings, enableHeroInteractiveAnimation: e.target.checked })}
                className="w-5 h-5 rounded text-sky-600 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Üst Badge Rozet Metni:</label>
                <input
                  type="text"
                  value={settings.heroBadge || ''}
                  onChange={(e) => setSettings({ ...settings, heroBadge: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Arka Plan Tipi (Gradient/Görsel/Renk):</label>
                <select
                  value={settings.heroBackgroundType || 'gradient'}
                  onChange={(e) => setSettings({ ...settings, heroBackgroundType: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                >
                  <option value="gradient">Moda Gradient Geçişi</option>
                  <option value="image">Görsel URL</option>
                  <option value="color">Düz Renk</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Ana Başlık Satır 1:</label>
                <input
                  type="text"
                  value={settings.heroTitleLine1 || ''}
                  onChange={(e) => setSettings({ ...settings, heroTitleLine1: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Ana Başlık Satır 2 (Renkli Vurgu):</label>
                <input
                  type="text"
                  value={settings.heroTitleLine2 || ''}
                  onChange={(e) => setSettings({ ...settings, heroTitleLine2: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Açıklama Paragrafı:</label>
              <textarea
                rows={3}
                value={settings.heroDescription || ''}
                onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>

            {/* Stats Editor */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Sayısal İstatistikler (Mezun, Program, Memnuniyet)</h4>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.showHeroStats !== false}
                    onChange={(e) => setSettings({ ...settings, showHeroStats: e.target.checked })}
                    className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                  />
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {settings.showHeroStats !== false ? 'Sayılar Gösteriliyor' : 'Sayıları Gizle/Kaldır'}
                  </span>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Mezun Sayısı:</label>
                  <input
                    type="text"
                    value={settings.statsGraduates || ''}
                    onChange={(e) => setSettings({ ...settings, statsGraduates: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Program Sayısı:</label>
                  <input
                    type="text"
                    value={settings.statsPrograms || ''}
                    onChange={(e) => setSettings({ ...settings, statsPrograms: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-slate-500">Memnuniyet Oranı:</label>
                  <input
                    type="text"
                    value={settings.statsSatisfaction || ''}
                    onChange={(e) => setSettings({ ...settings, statsSatisfaction: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Tab 3: Featured Shortcuts */}
        {activeTab === 'shortcuts' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-500" />
                Öne Çıkanlar (Hızlı Erişim Kısayolları)
              </h3>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showFeaturedShortcuts !== false}
                  onChange={(e) => setSettings({ ...settings, showFeaturedShortcuts: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {settings.showFeaturedShortcuts !== false ? 'Öne Çıkanları Göster' : 'Bölümü Gizle'}
                </span>
              </label>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Öne Çıkan Kısayollar Listesi:</label>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(settings.featuredShortcuts || []), { id: `fs-${Date.now()}`, title: 'Yeni Kısayol', badge: 'Yeni', link: '#courses' }];
                    setSettings({ ...settings, featuredShortcuts: updated });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Yeni Öne Çıkan Ekle
                </button>
              </div>

              <div className="space-y-2">
                {(settings.featuredShortcuts || []).map((fs, idx) => (
                  <div key={fs.id || idx} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
                    <input
                      type="text"
                      value={fs.title}
                      onChange={(e) => {
                        const updated = [...settings.featuredShortcuts];
                        updated[idx].title = e.target.value;
                        setSettings({ ...settings, featuredShortcuts: updated });
                      }}
                      placeholder="Başlık"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                    <input
                      type="text"
                      value={fs.badge}
                      onChange={(e) => {
                        const updated = [...settings.featuredShortcuts];
                        updated[idx].badge = e.target.value;
                        setSettings({ ...settings, featuredShortcuts: updated });
                      }}
                      placeholder="Rozet (Popüler/Seminer)"
                      className="w-32 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = settings.featuredShortcuts.filter((_, i) => i !== idx);
                        setSettings({ ...settings, featuredShortcuts: updated });
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Academic Publications (PDF) */}
        {activeTab === 'publications' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-sky-500" />
                Akademik PDF Yayınlar ve Makaleler
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showPublications !== false}
                  onChange={(e) => setSettings({ ...settings, showPublications: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {settings.showPublications !== false ? 'Yayınlar Bölümü Gösteriliyor' : 'Bölüm Gizlendi'}
                </span>
              </label>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">PDF Yayın Listesi:</label>
                <button
                  type="button"
                  onClick={() => {
                    const updated = [...(settings.publications || []), {
                      id: `pub-${Date.now()}`,
                      title: 'Yeni Akademik Makale (2026)',
                      authors: 'Klinik Araştırmacı',
                      year: '2026',
                      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                      abstract: 'Makale özet metni...',
                      isFeatured: true
                    }];
                    setSettings({ ...settings, publications: updated });
                  }}
                  className="px-3 py-1.5 rounded-lg bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 text-xs font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Yeni PDF Yayın Ekle
                </button>
              </div>

              <div className="space-y-3">
                {(settings.publications || []).map((pub, idx) => (
                  <div key={pub.id || idx} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <input
                        type="text"
                        value={pub.title}
                        onChange={(e) => {
                          const updated = [...settings.publications];
                          updated[idx].title = e.target.value;
                          setSettings({ ...settings, publications: updated });
                        }}
                        placeholder="Makale Başlığı"
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold text-slate-900 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = settings.publications.filter((_, i) => i !== idx);
                          setSettings({ ...settings, publications: updated });
                        }}
                        className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={pub.authors}
                        onChange={(e) => {
                          const updated = [...settings.publications];
                          updated[idx].authors = e.target.value;
                          setSettings({ ...settings, publications: updated });
                        }}
                        placeholder="Yazar(lar)"
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={pub.year}
                        onChange={(e) => {
                          const updated = [...settings.publications];
                          updated[idx].year = e.target.value;
                          setSettings({ ...settings, publications: updated });
                        }}
                        placeholder="Yıl (2026)"
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        value={pub.pdfUrl}
                        onChange={(e) => {
                          const updated = [...settings.publications];
                          updated[idx].pdfUrl = e.target.value;
                          setSettings({ ...settings, publications: updated });
                        }}
                        placeholder="PDF İndirme URL"
                        className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Section Order Drag & Drop */}
        {activeTab === 'sections' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-sky-500" />
              Sürükle-Bırak Bölüm Sıralayıcısı (Section Reorder)
            </h3>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Sürükleyip bırakarak veya sağ taraftaki yukarı/aşağı butonları ile ana sayfa bölümlerinin canlı sitedeki sıralamasını anında değiştirebilirsiniz:
            </p>

            <div className="space-y-2.5 pt-2">
              {settings.sectionOrder.map((secId, idx) => (
                <div
                  key={secId}
                  draggable
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-950 border rounded-xl transition-all cursor-grab active:cursor-grabbing ${
                    draggedIdx === idx
                      ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-lg scale-[1.01]'
                      : 'border-slate-200 dark:border-slate-800 hover:border-sky-400/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-slate-400 hover:text-sky-500 shrink-0" />
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {idx + 1}. {sectionNameLabels[secId] || secId}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => moveSection(idx, -1)}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-sky-600 disabled:opacity-30 flex items-center gap-1 transition-colors"
                    >
                      <ChevronUp className="w-3.5 h-3.5" /> Yukarı
                    </button>
                    <button
                      type="button"
                      disabled={idx === settings.sectionOrder.length - 1}
                      onClick={() => moveSection(idx, 1)}
                      className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-sky-600 disabled:opacity-30 flex items-center gap-1 transition-colors"
                    >
                      <ChevronDown className="w-3.5 h-3.5" /> Aşağı
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: General Contact */}
        {activeTab === 'general' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-sky-500" />
              İletişim & Sosyal Medya Ayarları
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">WhatsApp Numarası:</label>
                <input
                  type="text"
                  value={settings.whatsappNumber || ''}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">E-posta Adresi:</label>
                <input
                  type="text"
                  value={settings.email || ''}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-medium text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: FAQs */}
        {activeTab === 'faq' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-500" />
                Sıkça Sorulan Sorular (SSS)
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showFaqSection !== false}
                  onChange={(e) => setSettings({ ...settings, showFaqSection: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {settings.showFaqSection !== false ? 'SSS Bölümü Gösteriliyor' : 'Gizli'}
                </span>
              </label>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-sky-600 dark:text-sky-400">Soru #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = faqs.filter((_, i) => i !== idx);
                        setFaqs(updated);
                        setStoredFaqs(updated);
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg flex items-center gap-1 text-xs font-medium"
                      title="Soruyu Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Sil</span>
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Soru Metni</label>
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => {
                          const updated = [...faqs];
                          updated[idx] = { ...updated[idx], question: e.target.value };
                          setFaqs(updated);
                          setStoredFaqs(updated);
                        }}
                        className="w-full text-xs font-semibold px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                        placeholder="Örn: Eğitim sertifikaları geçerli mi?"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Cevap Metni</label>
                      <textarea
                        rows={2}
                        value={faq.answer}
                        onChange={(e) => {
                          const updated = [...faqs];
                          updated[idx] = { ...updated[idx], answer: e.target.value };
                          setFaqs(updated);
                          setStoredFaqs(updated);
                        }}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                        placeholder="Cevap detaylarını yazınız..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const updated = [...faqs, { question: 'Yeni Soru?', answer: 'Cevap buraya gelecek.' }];
                  setFaqs(updated);
                  setStoredFaqs(updated);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Yeni Soru Ekle
              </button>
            </div>
          </div>
        )}

        {/* Tab 8: Testimonials */}
        {activeTab === 'testimonials' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Mezun & Meslektaş Görüşleri
              </h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.showTestimonialsSection !== false}
                  onChange={(e) => setSettings({ ...settings, showTestimonialsSection: e.target.checked })}
                  className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500"
                />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {settings.showTestimonialsSection !== false ? 'Görüşler Bölümü Gösteriliyor' : 'Gizli'}
                </span>
              </label>
            </div>
            <div className="space-y-4">
              {testimonials.map((testim, idx) => (
                <div key={idx} className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Görüş #{idx + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = testimonials.filter((_, i) => i !== idx);
                        setTestimonials(updated);
                        setStoredTestimonials(updated);
                      }}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg flex items-center gap-1 text-xs font-medium"
                      title="Görüşü Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Sil</span>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Ad Soyad</label>
                      <input
                        type="text"
                        value={testim.name}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx] = { ...updated[idx], name: e.target.value };
                          setTestimonials(updated);
                          setStoredTestimonials(updated);
                        }}
                        className="w-full text-xs font-semibold px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Unvan / Rol</label>
                      <input
                        type="text"
                        value={testim.role}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx] = { ...updated[idx], role: e.target.value };
                          setTestimonials(updated);
                          setStoredTestimonials(updated);
                        }}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Üniversite / Kurum</label>
                      <input
                        type="text"
                        value={testim.university || ''}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx] = { ...updated[idx], university: e.target.value };
                          setTestimonials(updated);
                          setStoredTestimonials(updated);
                        }}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">Katıldığı Eğitim</label>
                      <input
                        type="text"
                        value={testim.courseTaken || ''}
                        onChange={(e) => {
                          const updated = [...testimonials];
                          updated[idx] = { ...updated[idx], courseTaken: e.target.value };
                          setTestimonials(updated);
                          setStoredTestimonials(updated);
                        }}
                        className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">Yorum / Görüş Metni</label>
                    <textarea
                      rows={2}
                      value={testim.comment}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx] = { ...updated[idx], comment: e.target.value };
                        setTestimonials(updated);
                        setStoredTestimonials(updated);
                      }}
                      className="w-full text-xs px-3 py-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-sky-500 outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => {
                  const updated = [...testimonials, { 
                    id: `new-${Date.now()}`,
                    name: 'Yeni Mezun', 
                    role: 'Psikolog', 
                    university: 'İstanbul Üniversitesi',
                    courseTaken: 'Bilişsel Davranışçı Terapi',
                    comment: 'Eğitim çok verimli geçti.', 
                    avatar: 'https://i.pravatar.cc/150?u=new',
                    rating: 5
                  }];
                  setTestimonials(updated);
                  setStoredTestimonials(updated);
                }}
                className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                Yeni Görüş Ekle
              </button>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-bold text-xs shadow-lg flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Tüm Değişiklikleri Canlı Sitede Yayınla</span>
          </button>
        </div>

      </form>
    </div>
  );
}
