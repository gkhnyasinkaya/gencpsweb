'use client';

import React, { useState } from 'react';
import { Course } from '@/data/courses';
import { getStoredApplications, setStoredApplications, Application } from '@/lib/store';
import { X, CheckCircle2, User, Mail, Phone, BookOpen, Send } from 'lucide-react';

interface ApplyModalProps {
  course: Course | null;
  onClose: () => void;
}

export default function ApplyModal({ course, onClose }: ApplyModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    status: 'Mezun Psikolog / PDR',
    university: '',
    notes: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (course) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [course]);

  if (!course) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      // Save application to store
      const newApp: Application = {
        id: `APP-${Math.floor(Math.random() * 8999) + 1000}`,
        courseId: course.id,
        courseTitle: course.title,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        university: formData.university || 'Belirtilmedi',
        notes: formData.notes || '-',
        appliedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        leadStatus: 'Yeni'
      };

      const existingApps = getStoredApplications();
      setStoredApplications([newApp, ...existingApps]);

      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer overflow-x-hidden"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-auto max-w-lg bg-white dark:bg-slate-900 border-0 sm:border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-3xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 max-h-full sm:max-h-[90vh] flex flex-col cursor-default overflow-x-hidden"
      >
        
        {/* Header */}
        <div className="relative p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-all shadow-sm"
            aria-label="Kapat"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="text-xs font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-1.5">
            Ön Kayıt & Başvuru Formu
          </div>

          <h3 className="text-lg md:text-xl font-extrabold text-slate-900 dark:text-white leading-tight pr-8">
            {course.title}
          </h3>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="px-2.5 py-1 rounded-md bg-sky-50 dark:bg-sky-500/20 text-sky-700 dark:text-sky-300 font-semibold border border-sky-200 dark:border-sky-500/30">
              {course.format}
            </span>
            <span className="px-2.5 py-1 rounded-md bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-500/30">
              {course.isFree ? 'Ücretsiz Etkinlik' : `${course.discountedPrice.toLocaleString('tr-TR')} ₺`}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Başlangıç: {course.formattedDate || course.startDate}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Başvurunuz Başarıyla Alındı!
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
                Sayın <strong className="text-sky-700 dark:text-sky-400">{formData.fullName}</strong>, eğitim akademisi koordinatörümüz 24 saat içerisinde WhatsApp ve telefon üzerinden sizinle iletişime geçecektir.
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300 text-left space-y-1.5">
                <p><strong>Eğitim:</strong> {course.title}</p>
                <p><strong>Sertifika Türü:</strong> {course.certificateType}</p>
                <p><strong>Durum:</strong> Başvuru Kaydedildi (Admin Panelinde İncelemede)</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl font-bold bg-sky-700 text-white hover:bg-sky-800 transition-all shadow-lg"
              >
                Tamam ve Kapat
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  Ad Soyad *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Psk. Ahmet Yılmaz"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-600" />
                    E-Posta Adresi *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ornek@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    Telefon / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0530 000 00 00"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                  Meslek & Akademik Durum *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm focus:outline-none focus:border-sky-500 transition-colors"
                >
                  <option value="Mezun Psikolog / PDR">Mezun Psikolog / PDR</option>
                  <option value="Psikoloji Lisans Öğrencisi">Psikoloji Lisans Öğrencisi</option>
                  <option value="PDR Lisans Öğrencisi">PDR Lisans Öğrencisi</option>
                  <option value="Yüksek Lisans Öğrencisi">Yüksek Lisans Öğrencisi</option>
                  <option value="Psikiyatrist / Dr.">Psikiyatrist / Dr.</option>
                  <option value="Diğer İlgili Alanlar">Diğer İlgili Alanlar</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Üniversite / Kurum Bilgisi
                </label>
                <input
                  type="text"
                  placeholder="Örn: Boğaziçi Üniversitesi Psikoloji"
                  value={formData.university}
                  onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Eklemek İstediğiniz Notlar
                </label>
                <textarea
                  rows={2}
                  placeholder="Bize iletmek istediğiniz soru veya talepleriniz..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none focus:border-sky-500 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-xl font-bold bg-sky-700 hover:bg-sky-800 text-white transition-all shadow-lg flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  {loading ? (
                    <span>Gönderiliyor...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Ön Kayıt Başvurusunu Tamamla</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center">
                Başvurunuz tamamen ücretsizdir ve herhangi bir bağlayıcılığı yoktur.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
