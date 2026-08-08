'use client';

import React from 'react';
import { Course } from '@/data/courses';
import { 
  X, 
  Calendar, 
  Clock, 
  Users, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  MapPin
} from 'lucide-react';

interface CourseDetailModalProps {
  course: Course | null;
  onClose: () => void;
  onApply: (course: Course) => void;
}

export default function CourseDetailModal({ course, onClose, onApply }: CourseDetailModalProps) {
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

  const allInstructors = [
    course.instructor,
    ...(course.additionalInstructors || [])
  ];

  return (
    <div 
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer overflow-x-hidden"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-full sm:h-auto max-w-3xl bg-white dark:bg-slate-900 border-0 sm:border border-slate-200 dark:border-slate-800 rounded-none sm:rounded-3xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 max-h-full sm:max-h-[90vh] flex flex-col cursor-default overflow-x-hidden"
      >
        
        {/* Prominent High-Contrast Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/95 dark:bg-slate-800/95 text-slate-800 dark:text-white shadow-xl hover:scale-105 border border-slate-200 dark:border-slate-700 transition-all"
          aria-label="Kapat"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Modal Body Container to prevent scrollbar overflowing rounded-3xl corners */}
        <div className="overflow-y-auto grow scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
          
          {/* Poster Image Banner */}
          {course.image && (
            <div className="relative h-64 sm:h-80 w-full bg-slate-950 overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              {course.isFree && (
                <div className="absolute bottom-4 left-6 px-3.5 py-1 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-lg uppercase tracking-wider">
                  ÜCRETSİZ ETKİNLİK
                </div>
              )}
            </div>
          )}

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header Badges */}
            <div className="flex flex-wrap items-center gap-2 pr-10">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/30">
                {course.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                {course.format}
              </span>
              {course.isFree && !course.image && (
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-600 text-white shadow-md">
                  ÜCRETSİZ ETKİNLİK
                </span>
              )}
            </div>

            {/* Course Title */}
            <h2 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
              {course.title}
            </h2>

            {/* Location & City Info Badge */}
            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Şehir / Konum: <strong className="text-slate-900 dark:text-white">{course.city}</strong> — {course.location || 'Online Derslik'}</span>
            </div>

            {/* INSTRUCTORS SECTION - SIDE BY SIDE */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <span className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider block">
                Eğitmen Kadrosu ({allInstructors.length} Eğitmen)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allInstructors.map((inst, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <img
                      src={inst.avatar}
                      alt={inst.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-sky-500 shrink-0 shadow-md"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-1">
                        <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{inst.name}</p>
                        {inst.isGuest && (
                          <span className="text-[9px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-500/20 px-1 rounded">Misafir</span>
                        )}
                      </div>
                      <p className="text-[11px] text-sky-700 dark:text-sky-400 font-medium truncate">{inst.title}</p>
                      {inst.sessionDetails && (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 block italic mt-1 leading-tight">
                          {inst.sessionDetails}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                <Calendar className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Tarih</span>
                  <strong className="text-slate-900 dark:text-white block">{course.formattedDate || course.startDate}</strong>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Saat & Süre</span>
                  <strong className="text-slate-900 dark:text-white block">{course.startTime || '20.00'} ({course.duration})</strong>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                <Users className="w-4 h-4 text-sky-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Kalan Kontenjan</span>
                  <strong className="text-sky-700 dark:text-sky-400 block">{course.remainingQuota} Kişi</strong>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-purple-600 shrink-0" />
                <div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Sertifika Türü</span>
                  <strong className="text-slate-900 dark:text-white block truncate">{course.certificateType}</strong>
                </div>
              </div>
            </div>

            {/* Description & Outcomes */}
            <div className="space-y-6 text-xs sm:text-sm">
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  Eğitim / Seminer Hakkında
                </h4>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {course.outcomes && course.outcomes.length > 0 && (
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm mb-3">Bu Etkinlikte Neler Kazanacaksınız?</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {course.outcomes.map((out, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-200 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Pricing & Apply Button */}
            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                {course.isFree ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-black text-emerald-700 dark:text-emerald-400">ÜCRETSİZ ETKİNLİK</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div>
                      <span className="text-xs text-slate-400 line-through block">
                        {course.originalPrice.toLocaleString('tr-TR')} ₺
                      </span>
                      <span className="text-xl font-black text-slate-900 dark:text-white block">
                        {course.discountedPrice.toLocaleString('tr-TR')} ₺
                      </span>
                    </div>
                    {course.discountPercent > 0 && (
                      <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/15 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
                        %{course.discountPercent} İndirimli
                      </span>
                    )}
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  onClose();
                  onApply(course);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-extrabold text-white bg-sky-700 hover:bg-sky-800 transition-all shadow-lg flex items-center justify-center gap-2 text-sm"
              >
                <span>{course.isFree ? 'Ücretsiz Kaydol' : 'Hemen Ön Kayıt Yap'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
