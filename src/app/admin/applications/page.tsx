'use client';

import React, { useState, useEffect } from 'react';
import { getStoredApplications, setStoredApplications, Application } from '@/lib/store';
import { 
  Users, 
  Search, 
  Download, 
  Trash2, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Clock, 
  FileSpreadsheet
} from 'lucide-react';

export default function AdminApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    setApplications(getStoredApplications());
  }, []);

  const handleStatusChange = (id: string, newStatus: Application['leadStatus']) => {
    const updated = applications.map((app) => {
      if (app.id === id) {
        return { ...app, leadStatus: newStatus };
      }
      return app;
    });

    setApplications(updated);
    setStoredApplications(updated);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bu başvuruyu kayıtlardan silmek istediğinizden emin misiniz?')) {
      const updated = applications.filter(a => a.id !== id);
      setApplications(updated);
      setStoredApplications(updated);
    }
  };

  const handleExportCSV = () => {
    if (applications.length === 0) return;
    
    const headers = ['ID', 'Ad Soyad', 'E-Posta', 'Telefon', 'Eğitim', 'Durum', 'Üniversite', 'Başvuru Tarihi', 'İletişim Durumu'];
    const rows = applications.map(a => [
      a.id,
      `"${a.fullName}"`,
      a.email,
      a.phone,
      `"${a.courseTitle}"`,
      `"${a.status}"`,
      `"${a.university || ''}"`,
      a.appliedAt,
      a.leadStatus
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `genc_psikologlar_basvurular_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApplications = applications.filter((app) => {
    const matchStatus = statusFilter === 'all' || app.leadStatus === statusFilter;
    const matchQuery = 
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.includes(searchQuery) ||
      app.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());

    return matchStatus && matchQuery;
  });

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400" />
            Ön Kayıt ve Öğrenci Başvuruları
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Web sitesindeki ön kayıt formlarını dolduran aday psikolog ve öğrencilerin takip listesi.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-3 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md flex items-center justify-center gap-2 text-xs w-full sm:w-auto"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Excel / CSV Olarak İndir</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Aday adı, telefon veya eğitim ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
          {[
            { id: 'all', label: 'Tüm Başvurular' },
            { id: 'Yeni', label: 'Yeni (Aranmadı)' },
            { id: 'İletişime Geçildi', label: 'Görüşüldü' },
            { id: 'Kayıt Yapıldı', label: 'Kayıt Yapıldı' },
            { id: 'İptal', label: 'İptal' },
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStatusFilter(st.id)}
              className={`px-3 py-1.5 rounded-lg font-bold whitespace-nowrap transition-colors ${
                statusFilter === st.id
                  ? 'bg-sky-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

      </div>

      {/* Applications Table Container */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 min-w-[800px]">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Aday Bilgisi</th>
                <th className="p-4">Başvurulan Eğitim</th>
                <th className="p-4">Meslek / Üniversite</th>
                <th className="p-4">İletişim Detayları</th>
                <th className="p-4">Başvuru Tarihi</th>
                <th className="p-4">İletişim Durumu</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Kayıtlı başvuru bulunamadı.
                  </td>
                </tr>
              ) : (
                filteredApplications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                    
                    <td className="p-4 font-bold text-slate-900 dark:text-white">
                      <span className="text-sm block">{app.fullName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{app.id}</span>
                    </td>

                    <td className="p-4 max-w-xs">
                      <span className="font-semibold text-sky-700 dark:text-sky-300 line-clamp-2">{app.courseTitle}</span>
                    </td>

                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-[10px] font-medium block w-fit mb-1">
                        {app.status}
                      </span>
                      {app.university && (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate max-w-[150px]">
                          {app.university}
                        </span>
                      )}
                    </td>

                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-200">
                        <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                        <a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[140px]">{app.email}</span>
                      </div>
                    </td>

                    <td className="p-4 text-slate-500 dark:text-slate-400 text-[11px]">
                      {app.appliedAt}
                    </td>

                    <td className="p-4">
                      <select
                        value={app.leadStatus}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as any)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs border focus:outline-none ${
                          app.leadStatus === 'Yeni'
                            ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                            : app.leadStatus === 'Kayıt Yapıldı'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30'
                            : app.leadStatus === 'İletişime Geçildi'
                            ? 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30'
                            : 'bg-rose-50 text-rose-800 border-rose-300 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                        }`}
                      >
                        <option value="Yeni" className="bg-white dark:bg-slate-900 text-amber-600">Yeni (Aranmadı)</option>
                        <option value="İletişime Geçildi" className="bg-white dark:bg-slate-900 text-blue-600">İletişime Geçildi</option>
                        <option value="Kayıt Yapıldı" className="bg-white dark:bg-slate-900 text-emerald-600">Kayıt Yapıldı</option>
                        <option value="İptal" className="bg-white dark:bg-slate-900 text-rose-600">İptal</option>
                      </select>
                    </td>

                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(app.id)}
                        className="p-2 rounded-lg bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors"
                        title="Başvuruyu Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
