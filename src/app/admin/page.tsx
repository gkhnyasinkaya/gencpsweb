'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Course } from '@/data/courses';
import { getStoredCourses, getStoredApplications, Application } from '@/lib/store';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Sparkles, 
  Plus, 
  ShieldCheck, 
  ChevronRight,
  UserCheck,
  Eye,
  Globe,
  Smartphone,
  Monitor,
  ArrowUpRight,
  BarChart3,
  Clock
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [timeRange, setTimeRange] = useState<'7d' | '30d'>('7d');

  useEffect(() => {
    setCourses(getStoredCourses());
    setApplications(getStoredApplications());
  }, []);

  const totalQuota = courses.reduce((sum, c) => sum + c.quota, 0);
  const remainingQuota = courses.reduce((sum, c) => sum + c.remainingQuota, 0);
  const totalOccupied = totalQuota - remainingQuota;
  const fillRate = totalQuota > 0 ? Math.round((totalOccupied / totalQuota) * 100) : 0;

  const newLeads = applications.filter(a => a.leadStatus === 'Yeni').length;

  // Traffic Data for 7 Days vs 30 Days
  const traffic7d = [
    { label: 'Pzt', visitors: 1240, views: 3100, height: '55%' },
    { label: 'Sal', visitors: 1580, views: 4200, height: '70%' },
    { label: 'Çar', visitors: 1890, views: 5100, height: '82%' },
    { label: 'Per', visitors: 1650, views: 4600, height: '72%' },
    { label: 'Cum', visitors: 2100, views: 5800, height: '90%' },
    { label: 'Cmt', visitors: 2450, views: 6400, height: '100%' },
    { label: 'Paz', visitors: 1980, views: 5200, height: '85%' },
  ];

  const traffic30d = [
    { label: '1. Hafta', visitors: 7420, views: 18500, height: '68%' },
    { label: '2. Hafta', visitors: 8910, views: 22400, height: '85%' },
    { label: '3. Hafta', visitors: 9540, views: 24100, height: '100%' },
    { label: '4. Hafta', visitors: 8550, views: 21600, height: '78%' },
  ];

  const activeTraffic = timeRange === '7d' ? traffic7d : traffic30d;

  const trafficSources = [
    { name: 'Organik Arama (Google SEO)', percentage: 48, count: '12.4K', color: 'bg-sky-500' },
    { name: 'Sosyal Medya (Instagram / Linktree)', percentage: 31, count: '8.1K', color: 'bg-purple-500' },
    { name: 'Doğrudan Ziyaret (Direct)', percentage: 14, count: '3.6K', color: 'bg-emerald-500' },
    { name: 'Referans & Forum Bağlantıları', percentage: 7, count: '1.8K', color: 'bg-amber-500' },
  ];

  return (
    <div className="space-y-8">
      
      {/* Top Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 dark:from-blue-950/80 dark:via-slate-900 dark:to-indigo-950/80 border border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-sm">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-300 text-xs font-bold border border-sky-500/30">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Canlı İstatistikler & Yönetim Kontrolü
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Genç Psikologlar Akademi Trafik & Performans Paneli
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            Sitenizin ziyaretçi istatistiklerini, organik arama grafiklerini ve öğrenci ön kayıt performansını anlık olarak izleyin.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 w-full sm:w-auto">
          <Link
            href="/admin/courses"
            className="px-4 py-3 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md flex items-center justify-center gap-2 grow sm:grow-0"
          >
            <Plus className="w-4 h-4" />
            <span>Yeni Eğitim Ekle</span>
          </Link>
          <Link
            href="/admin/applications"
            className="px-4 py-3 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-2 grow sm:grow-0 shadow-sm"
          >
            <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Başvuruları İncele</span>
          </Link>
        </div>
      </div>

      {/* METRICS & TRAFFIC STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Pageviews */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Sayfa Görüntülenme</span>
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400">
              <Eye className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">34,420</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Son 30 günde kaydedilen toplam görüntülenme
          </p>
        </div>

        {/* Card 2: Unique Visitors */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Tekil Ziyaretçi</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Globe className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-purple-700 dark:text-purple-300">12,890</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
              <ArrowUpRight className="w-3.5 h-3.5" /> +12.1%
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Farklı IP adresi üzerinden yapılan ziyaretler
          </p>
        </div>

        {/* Card 3: Leads */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Ön Kayıt Başvurusu</span>
            <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{applications.length}</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Aday</span>
          </div>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            {newLeads} Yanıt Bekleyen Yeni Aday
          </p>
        </div>

        {/* Card 4: Avg Session & Bounce Rate */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 relative overflow-hidden shadow-sm">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Sitede Kalma Süresi</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-amber-700 dark:text-amber-300">4d 18sn</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">Ort.</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Hemen Çıkma Oranı: <strong className="text-emerald-600 dark:text-emerald-400">%26.2 (İdeal)</strong>
          </p>
        </div>

      </div>

      {/* GRAPH SECTION: TRAFFIC VISITOR CHART & SOURCES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Daily / Weekly Visitor Trend Chart */}
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base sm:text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                Ziyaretçi ve Trafik Trendi ({timeRange === '7d' ? 'Son 7 Gün' : 'Son 30 Gün (Aylık)'})
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {timeRange === '7d' ? 'Günlük tekil ziyaretçi ve sayfa görüntülenmesi' : 'Aylık 4 haftalık dönem trafiği'}
              </p>
            </div>

            {/* TOGGLE BUTTONS FOR 7D AND 30D */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs">
              <button 
                onClick={() => setTimeRange('7d')}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  timeRange === '7d' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                7 Gün
              </button>
              <button 
                onClick={() => setTimeRange('30d')}
                className={`px-3.5 py-1.5 rounded-lg font-bold transition-all ${
                  timeRange === '30d' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                30 Gün
              </button>
            </div>
          </div>

          {/* Dynamic Visual Bar Chart Container */}
          <div className="pt-4 space-y-4">
            <div className="h-52 flex items-end justify-between gap-3 sm:gap-6 px-2 border-b border-slate-200 dark:border-slate-800 pb-3">
              {activeTraffic.map((data, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full group relative">
                  
                  {/* Tooltip on hover */}
                  <div className="absolute -top-11 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap shadow-2xl z-30 transform -translate-y-1">
                    {data.visitors.toLocaleString('tr-TR')} Ziyaretçi ({data.views.toLocaleString('tr-TR')} Gör.)
                  </div>

                  {/* Dynamic Height Bar Container */}
                  <div className="w-full max-w-[50px] h-[140px] bg-slate-100 dark:bg-slate-800/60 rounded-xl overflow-hidden flex items-end p-0.5 border border-slate-200 dark:border-slate-700/40 group-hover:border-sky-500 transition-colors">
                    <div
                      style={{ height: data.height }}
                      className="w-full bg-gradient-to-t from-blue-600 via-sky-500 to-sky-400 rounded-lg shadow-md"
                    />
                  </div>

                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 group-hover:text-sky-600 mt-2">
                    {data.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 gap-2">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-500 inline-block animate-pulse" />
                {timeRange === '7d' ? (
                  <>En Yüksek Trafik Günü: <strong className="text-slate-900 dark:text-white">Cumartesi (2,450 Ziyaretçi)</strong></>
                ) : (
                  <>En Yüksek Trafik Dönemi: <strong className="text-slate-900 dark:text-white">3. Hafta (9,540 Ziyaretçi)</strong></>
                )}
              </span>
              <span>
                {timeRange === '7d' ? (
                  <>Ortalama Günlük: <strong className="text-sky-700 dark:text-sky-400">1,840 Ziyaretçi</strong></>
                ) : (
                  <>Ortalama Haftalık: <strong className="text-sky-700 dark:text-sky-400">8,605 Ziyaretçi</strong></>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Traffic Sources & Device Distribution */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              Trafik Kaynakları (Kanal Dağılımı)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kullanıcıların siteye geliş kanalları
            </p>
          </div>

          <div className="space-y-4">
            {trafficSources.map((source, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{source.name}</span>
                  <span className="text-slate-500 dark:text-slate-400">%{source.percentage} ({source.count})</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    style={{ width: `${source.percentage}%` }}
                    className={`h-full ${source.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Device Breakdown */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Cihaz Kullanım Oranı
            </span>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
                <Smartphone className="w-4 h-4 text-sky-600 dark:text-sky-400 mx-auto mb-1" />
                <span className="font-bold text-slate-900 dark:text-white block">%68</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Mobil</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
                <Monitor className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                <span className="font-bold text-slate-900 dark:text-white block">%28</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Masaüstü</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50">
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-1" />
                <span className="font-bold text-slate-900 dark:text-white block">%4</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Tablet</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Grid Section: Recent Applications & Active Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Recent Applications Feed */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              Son Gelen Öğrenci Başvuruları
            </h3>
            <Link
              href="/admin/applications"
              className="text-xs font-semibold text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              Tümünü Gör <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {applications.slice(0, 4).map((app) => (
              <div
                key={app.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1 truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{app.fullName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-900 text-slate-700 dark:text-slate-300">
                      {app.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 truncate">{app.courseTitle}</p>
                  <p className="text-[10px] text-slate-500">{app.appliedAt} • {app.phone}</p>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold shrink-0 ${
                    app.leadStatus === 'Yeni'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30'
                      : app.leadStatus === 'Kayıt Yapıldı'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30'
                      : 'bg-sky-100 text-sky-800 dark:bg-blue-500/20 dark:text-blue-300 border border-sky-300 dark:border-blue-500/30'
                  }`}
                >
                  {app.leadStatus}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Visited Pages & Active Courses */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              En Çok Ziyaret Edilen Eğitim Sayfaları
            </h3>
            <Link
              href="/admin/courses"
              className="text-xs font-semibold text-sky-700 dark:text-sky-400 hover:underline flex items-center gap-1"
            >
              Yönet <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {courses.slice(0, 4).map((c, idx) => {
              const views = [8420, 5120, 3890, 2450][idx] || 1200;
              return (
                <div
                  key={c.id}
                  className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 flex items-center justify-between gap-4 text-xs"
                >
                  <div className="space-y-1 truncate">
                    <span className="font-bold text-slate-900 dark:text-white text-sm block truncate">{c.title}</span>
                    <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
                      <span>Eğitmen: {c.instructor.name}</span>
                      <span>• {c.format}</span>
                    </div>
                  </div>

                  <div className="text-right shrink-0 space-y-0.5">
                    <span className="font-bold text-sky-700 dark:text-sky-400 text-xs flex items-center justify-end gap-1">
                      <Eye className="w-3.5 h-3.5" /> {views.toLocaleString('tr-TR')} Gör.
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
                      Son {c.remainingQuota} Kontenjan
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
