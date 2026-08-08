'use client';

import React, { useState, useEffect } from 'react';
import { getStoredCourses, setStoredCourses, getStoredInstructors } from '@/lib/store';
import { Course, Instructor, CourseInstructor, CITIES } from '@/data/courses';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  Award,
  MapPin,
  Calendar,
  Percent,
  UserPlus,
  Image as ImageIcon,
  Clock,
  Sparkles
} from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Primary Instructor Mode: 'registered' vs 'guest'
  const [primaryInstructorMode, setPrimaryInstructorMode] = useState<'registered' | 'guest'>('registered');
  const [selectedInstructorId, setSelectedInstructorId] = useState<string>('');
  
  // Guest Primary Instructor Form
  const [guestPrimary, setGuestPrimary] = useState({
    name: '',
    title: 'Davetli Konuşmacı',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  });

  // Secondary Instructor State
  const [hasSecondaryInstructor, setHasSecondaryInstructor] = useState(false);
  const [secondaryInstructorMode, setSecondaryInstructorMode] = useState<'registered' | 'guest'>('registered');
  const [secondaryInstructorId, setSecondaryInstructorId] = useState<string>('');
  const [secondarySessionDetails, setSecondarySessionDetails] = useState('');
  const [guestSecondary, setGuestSecondary] = useState({
    name: '',
    title: 'Misafir Uzman',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200'
  });

  // Form State for Adding/Editing Course
  const [courseForm, setCourseForm] = useState({
    title: '',
    category: 'BDT',
    format: 'Online Canlı',
    level: 'Uygulayıcı Sertikalı',
    city: 'Online',
    location: 'Zoom İnteraktif Canlı Derslik',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
    isFree: false,
    startTime: '20.00',
    instructorName: '',
    instructorTitle: '',
    instructorAvatar: '',
    primarySessionDetails: '',
    startDate: '2026-09-15',
    duration: '8 Hafta',
    totalHours: 32,
    quota: 30,
    remainingQuota: 10,
    originalPrice: 6000,
    discountPercent: 25,
    certificateType: 'e-Devlet & Üniversite Onaylı',
    description: 'Bilişsel Davranışçı Terapi klinik müdahaleleri teorik ve pratik vaka çalışmaları.'
  });

  useEffect(() => {
    const loadedCourses = getStoredCourses();
    const loadedInstructors = getStoredInstructors();
    setCourses(loadedCourses);
    setInstructors(loadedInstructors);

    if (loadedInstructors.length > 0) {
      const first = loadedInstructors[0];
      setSelectedInstructorId(first.id);
      setCourseForm(prev => ({
        ...prev,
        instructorName: first.name,
        instructorTitle: first.title,
        instructorAvatar: first.avatar
      }));
    }
  }, []);

  // Auto-calculated Discounted Price
  const computedDiscountedPrice = courseForm.isFree 
    ? 0 
    : Math.round(courseForm.originalPrice * (1 - (courseForm.discountPercent || 0) / 100));

  const formatTurkishDate = (dateStr: string) => {
    try {
      if (!dateStr) return '15 Eylül 2026';
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const dateObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        return dateObj.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
      }
      return dateStr;
    } catch (e) {
      return dateStr;
    }
  };

  const handlePrimarySelectChange = (val: string) => {
    if (val === 'guest') {
      setPrimaryInstructorMode('guest');
      setSelectedInstructorId('guest');
      setCourseForm(prev => ({
        ...prev,
        instructorName: guestPrimary.name || 'Misafir Eğitmen',
        instructorTitle: guestPrimary.title,
        instructorAvatar: guestPrimary.avatar
      }));
    } else {
      setPrimaryInstructorMode('registered');
      setSelectedInstructorId(val);
      const inst = instructors.find(i => i.id === val);
      if (inst) {
        setCourseForm(prev => ({
          ...prev,
          instructorName: inst.name,
          instructorTitle: inst.title,
          instructorAvatar: inst.avatar
        }));
      }
    }
  };

  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedDate = formatTurkishDate(courseForm.startDate);

    // Primary Instructor Object
    const primaryInstructorObj: CourseInstructor = primaryInstructorMode === 'registered' 
      ? {
          name: courseForm.instructorName,
          title: courseForm.instructorTitle,
          avatar: courseForm.instructorAvatar,
          sessionDetails: courseForm.primarySessionDetails
        }
      : {
          name: guestPrimary.name || 'Misafir Eğitmen',
          title: guestPrimary.title || 'Davetli Uzman',
          avatar: guestPrimary.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
          sessionDetails: courseForm.primarySessionDetails,
          isGuest: true
        };

    // Prepare Additional Instructors
    const additionalInstructors: CourseInstructor[] = [];
    if (hasSecondaryInstructor) {
      if (secondaryInstructorMode === 'registered' && secondaryInstructorId) {
        const secondInst = instructors.find(i => i.id === secondaryInstructorId);
        if (secondInst) {
          additionalInstructors.push({
            name: secondInst.name,
            title: secondInst.title,
            avatar: secondInst.avatar,
            sessionDetails: secondarySessionDetails || '2. Oturum Eğitmeni'
          });
        }
      } else if (secondaryInstructorMode === 'guest' && guestSecondary.name) {
        additionalInstructors.push({
          name: guestSecondary.name,
          title: guestSecondary.title || 'Misafir Uzman',
          avatar: guestSecondary.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
          sessionDetails: secondarySessionDetails || 'Misafir Oturum',
          isGuest: true
        });
      }
    }
    
    if (editingCourse) {
      // Update
      const updated = courses.map((c) => {
        if (c.id === editingCourse.id) {
          return {
            ...c,
            title: courseForm.title,
            category: courseForm.category as any,
            format: courseForm.format as any,
            level: courseForm.level as any,
            city: courseForm.city,
            location: courseForm.location,
            image: courseForm.image,
            isFree: courseForm.isFree,
            startTime: courseForm.startTime,
            instructor: primaryInstructorObj,
            additionalInstructors: additionalInstructors,
            startDate: courseForm.startDate,
            formattedDate: formattedDate,
            duration: courseForm.duration,
            totalHours: Number(courseForm.totalHours),
            quota: Number(courseForm.quota),
            remainingQuota: Number(courseForm.remainingQuota),
            originalPrice: courseForm.isFree ? 0 : Number(courseForm.originalPrice),
            discountPercent: courseForm.isFree ? 0 : Number(courseForm.discountPercent),
            discountedPrice: computedDiscountedPrice,
            certificateType: (courseForm.isFree ? 'Katılım Belgeli' : courseForm.certificateType) as any,
            description: courseForm.description
          };
        }
        return c;
      });

      setCourses(updated);
      setStoredCourses(updated);
      setEditingCourse(null);
    } else {
      // Add New
      const newCourse: Course = {
        id: `course-${Date.now()}`,
        title: courseForm.title,
        slug: courseForm.title.toLowerCase().replace(/ /g, '-'),
        category: courseForm.category as any,
        format: courseForm.format as any,
        level: courseForm.level as any,
        city: courseForm.city,
        location: courseForm.location,
        image: courseForm.image,
        isFree: courseForm.isFree,
        startTime: courseForm.startTime,
        instructor: primaryInstructorObj,
        additionalInstructors: additionalInstructors,
        startDate: courseForm.startDate,
        formattedDate: formattedDate,
        duration: courseForm.duration,
        totalHours: Number(courseForm.totalHours),
        quota: Number(courseForm.quota),
        remainingQuota: Number(courseForm.remainingQuota),
        originalPrice: courseForm.isFree ? 0 : Number(courseForm.originalPrice),
        discountPercent: courseForm.isFree ? 0 : Number(courseForm.discountPercent),
        discountedPrice: computedDiscountedPrice,
        certificateType: (courseForm.isFree ? 'Katılım Belgeli' : courseForm.certificateType) as any,
        description: courseForm.description,
        outcomes: ['Vaka kavramsallaştırma becerisi', 'Klinik formülasyon teknikleri', 'Süpervizyon desteği'],
        curriculum: [
          { moduleNumber: 1, title: 'Modül 1: Temel Teorik Giriş', topics: ['Tarihçe & Kavramlar', 'İlk Seans Yönetimi'] },
          { moduleNumber: 2, title: 'Modül 2: Uygulamalı Rol-play', topics: ['Sokratik Sorgulama', 'Formülasyon Yazımı'] }
        ]
      };

      const updated = [newCourse, ...courses];
      setCourses(updated);
      setStoredCourses(updated);
      setIsAddModalOpen(false);
    }

    // Reset Form
    if (instructors.length > 0) {
      const first = instructors[0];
      setSelectedInstructorId(first.id);
      setPrimaryInstructorMode('registered');
      setHasSecondaryInstructor(false);
      setSecondaryInstructorId('');
      setSecondarySessionDetails('');
      setCourseForm({
        title: '',
        category: 'BDT',
        format: 'Online Canlı',
        level: 'Uygulayıcı Sertikalı',
        city: 'Online',
        location: 'Zoom İnteraktif Canlı Derslik',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
        isFree: false,
        startTime: '20.00',
        instructorName: first.name,
        instructorTitle: first.title,
        instructorAvatar: first.avatar,
        primarySessionDetails: '',
        startDate: '2026-09-15',
        duration: '8 Hafta',
        totalHours: 32,
        quota: 30,
        remainingQuota: 10,
        originalPrice: 6000,
        discountPercent: 25,
        certificateType: 'e-Devlet & Üniversite Onaylı',
        description: ''
      });
    }
  };

  const handleDeleteCourse = (id: string) => {
    if (confirm('Bu eğitimi silmek istediğinizden emin misiniz? Siteden anında kaldırılacaktır.')) {
      const updated = courses.filter(c => c.id !== id);
      setCourses(updated);
      setStoredCourses(updated);
    }
  };

  const handleOpenEdit = (course: Course) => {
    setEditingCourse(course);
    
    // Check primary instructor mode
    if (course.instructor.isGuest) {
      setPrimaryInstructorMode('guest');
      setSelectedInstructorId('guest');
      setGuestPrimary({
        name: course.instructor.name,
        title: course.instructor.title,
        avatar: course.instructor.avatar
      });
    } else {
      setPrimaryInstructorMode('registered');
      const matched = instructors.find(i => i.name === course.instructor.name);
      if (matched) {
        setSelectedInstructorId(matched.id);
      }
    }

    // Check secondary instructor
    if (course.additionalInstructors && course.additionalInstructors.length > 0) {
      setHasSecondaryInstructor(true);
      const sec = course.additionalInstructors[0];
      if (sec.isGuest) {
        setSecondaryInstructorMode('guest');
        setGuestSecondary({
          name: sec.name,
          title: sec.title,
          avatar: sec.avatar
        });
      } else {
        setSecondaryInstructorMode('registered');
        const matchedSec = instructors.find(i => i.name === sec.name);
        if (matchedSec) {
          setSecondaryInstructorId(matchedSec.id);
        }
      }
      setSecondarySessionDetails(sec.sessionDetails || '');
    } else {
      setHasSecondaryInstructor(false);
    }

    setCourseForm({
      title: course.title,
      category: course.category,
      format: course.format,
      level: course.level,
      city: course.city || 'Online',
      location: course.location || '',
      image: course.image || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
      isFree: course.isFree || false,
      startTime: course.startTime || '20.00',
      instructorName: course.instructor.name,
      instructorTitle: course.instructor.title,
      instructorAvatar: course.instructor.avatar,
      primarySessionDetails: course.instructor.sessionDetails || '',
      startDate: course.startDate || '2026-09-15',
      duration: course.duration,
      totalHours: course.totalHours,
      quota: course.quota,
      remainingQuota: course.remainingQuota,
      originalPrice: course.originalPrice,
      discountPercent: course.discountPercent || 25,
      certificateType: course.certificateType,
      description: course.description
    });
  };

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400" />
            Eğitim Programları Yönetimi
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Web sitesinde yayında olan eğitimleri güncelleyin, yeni sertifika programları ve ücretsiz seminerler ekleyin.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingCourse(null);
            if (instructors.length > 0) {
              const first = instructors[0];
              setSelectedInstructorId(first.id);
              setPrimaryInstructorMode('registered');
              setHasSecondaryInstructor(false);
              setCourseForm(prev => ({
                ...prev,
                title: '',
                description: '',
                instructorName: first.name,
                instructorTitle: first.title,
                instructorAvatar: first.avatar
              }));
            }
            setIsAddModalOpen(true);
          }}
          className="px-4 py-3 rounded-xl font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md flex items-center justify-center gap-2 text-xs w-full sm:w-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Eğitim Ekle</span>
        </button>
      </div>

      {/* Search & Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Eğitim başlığı, şehir veya eğitmen ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Toplam <strong className="text-slate-900 dark:text-white">{filteredCourses.length}</strong> eğitim yayınlanıyor
        </span>
      </div>

      {/* Courses Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto scrollbar-none">
          <table className="w-full text-left text-xs text-slate-700 dark:text-slate-300 min-w-[750px]">
            <thead className="bg-slate-50 dark:bg-slate-950/80 text-slate-500 dark:text-slate-400 font-bold uppercase border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Afiş & Başlık</th>
                <th className="p-4">Şehir & Konum</th>
                <th className="p-4">Eğitmen(ler)</th>
                <th className="p-4">Tarih & Saat</th>
                <th className="p-4">Kontenjan</th>
                <th className="p-4">Ücret Türü</th>
                <th className="p-4 text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredCourses.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition-colors">
                  <td className="p-4 max-w-xs">
                    <div className="flex items-center gap-3">
                      {c.image ? (
                        <img src={c.image} alt="" className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 shrink-0" />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                          <ImageIcon className="w-5 h-5 text-slate-400" />
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white line-clamp-2">{c.title}</span>
                        <span className="text-[10px] text-sky-600 dark:text-sky-400 font-semibold">{c.category}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">
                      <span className="px-2.5 py-0.5 rounded bg-sky-50 dark:bg-sky-500/15 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-500/25 text-[10px] font-bold block w-fit">
                        {c.city} • {c.format}
                      </span>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                        <span className="truncate max-w-[130px]">{c.location || 'Online'}</span>
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <img src={c.instructor.avatar} alt="" className="w-6 h-6 rounded-full object-cover shrink-0" />
                        <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[120px]">
                          {c.instructor.name} {c.instructor.isGuest && '(Misafir)'}
                        </span>
                      </div>
                      {c.additionalInstructors && c.additionalInstructors.map((sec, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[10px] text-purple-700 dark:text-purple-300">
                          <img src={sec.avatar} alt="" className="w-4 h-4 rounded-full object-cover shrink-0" />
                          <span className="truncate max-w-[110px]">{sec.name} {sec.isGuest && '(Misafir)'}</span>
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <p className="font-medium text-slate-800 dark:text-slate-200">{c.formattedDate || c.startDate}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Saat: {c.startTime || '20.00'} ({c.totalHours} Saat)</p>
                  </td>

                  <td className="p-4">
                    <span className="font-bold text-sky-600 dark:text-sky-400">Son {c.remainingQuota}</span>
                    <span className="text-[10px] text-slate-400 block">/ {c.quota} Toplam</span>
                  </td>

                  <td className="p-4">
                    {c.isFree ? (
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-emerald-50 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/40 inline-block">
                        ÜCRETSİZ
                      </span>
                    ) : (
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white text-sm block">
                          {c.discountedPrice.toLocaleString('tr-TR')} ₺
                        </span>
                        <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                          %{c.discountPercent || 0} İndirimli ({c.originalPrice.toLocaleString('tr-TR')} ₺)
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-sky-600 dark:text-sky-400 transition-colors"
                        title="Eğitimi Düzenle"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteCourse(c.id)}
                        className="p-2 rounded-lg bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors"
                        title="Eğitimi Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Course Modal */}
      {(isAddModalOpen || editingCourse) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-2xl text-slate-900 dark:text-slate-100 max-h-[88vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingCourse(null);
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mb-4">
              {editingCourse ? 'Eğitim Programını / Semineri Düzenle' : 'Yeni Eğitim / Seminer Tanımla'}
            </h3>

            <form onSubmit={handleSaveCourse} className="space-y-4 text-xs">
              
              {/* FREE SEMINAR TOGGLE */}
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <span className="font-extrabold text-emerald-800 dark:text-emerald-300 text-xs block">Bu Eğitim / Seminer ÜCRETSİZDİR</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 block">İşaretlendiğinde ücret 0 ₺ olur ve ana sayfada ÜCRETSİZ etiketi basılır.</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={courseForm.isFree}
                  onChange={(e) => setCourseForm({ ...courseForm, isFree: e.target.checked })}
                  className="w-5 h-5 rounded text-emerald-600 cursor-pointer"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Eğitim / Seminer Başlığı *</label>
                <input
                  type="text"
                  required
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  placeholder="Örn: Zihnin Farklı Yüzleri: Şema Mod Terapisiyle Tanışma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                />
              </div>

              {/* POSTER IMAGE URL */}
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                  Eğitim Afiş / Tanıtım Görseli URL'si
                </label>
                <input
                  type="text"
                  value={courseForm.image}
                  onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Kategori</label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="BDT">BDT</option>
                    <option value="Klinik Testler">Klinik Testler</option>
                    <option value="Çocuk ve Ergen">Çocuk ve Ergen</option>
                    <option value="Terapi Ekolleri">Terapi Ekolleri</option>
                    <option value="Süpervizyon">Süpervizyon</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Format</label>
                  <select
                    value={courseForm.format}
                    onChange={(e) => setCourseForm({ ...courseForm, format: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  >
                    <option value="Online Canlı">Online Canlı</option>
                    <option value="Yüz Yüze">Yüz Yüze</option>
                    <option value="Hibrit">Hibrit</option>
                  </select>
                </div>
              </div>

              {/* CITY & DETAILED LOCATION */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-sky-700 dark:text-sky-400 mb-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      Eğitim Şehri *
                    </label>
                    <select
                      value={courseForm.city}
                      onChange={(e) => setCourseForm({ ...courseForm, city: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold"
                    >
                      {CITIES.filter(c => c.id !== 'all').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Detaylı Konum / Adres Metni *
                    </label>
                    <input
                      type="text"
                      required
                      value={courseForm.location}
                      onChange={(e) => setCourseForm({ ...courseForm, location: e.target.value })}
                      placeholder="Örn: Zoom Canlı veya Kadıköy Kozyatağı KM"
                      className="w-full px-3 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* PRIMARY INSTRUCTOR */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div>
                  <label className="block font-bold text-sky-700 dark:text-sky-400 mb-1 flex items-center gap-1.5">
                    <Award className="w-4 h-4" />
                    Ana Eğitmen Seçimi *
                  </label>
                  <select
                    value={selectedInstructorId}
                    onChange={(e) => handlePrimarySelectChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-semibold text-xs focus:outline-none focus:border-sky-500"
                  >
                    <optgroup label="Sitede Kayıtlı Eğitmen Kadrosu">
                      {instructors.map((inst) => (
                        <option key={inst.id} value={inst.id}>
                          {inst.name} — ({inst.title})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Dışarıdan / Misafir Eğitmen">
                      <option value="guest">+ Misafir / Dışarıdan Eğitmen Gir</option>
                    </optgroup>
                  </select>
                </div>

                {primaryInstructorMode === 'guest' && (
                  <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-sky-200 dark:border-sky-500/30 space-y-2">
                    <span className="text-[11px] font-bold text-sky-700 dark:text-sky-300 flex items-center gap-1">
                      <UserPlus className="w-3.5 h-3.5" />
                      Misafir Eğitmen Bilgileri (Kadroya Eklenmez)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Eğitmen Adı Soyadı *"
                        required
                        value={guestPrimary.name}
                        onChange={(e) => setGuestPrimary({ ...guestPrimary, name: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                      <input
                        type="text"
                        placeholder="Unvan / Uzmanlık *"
                        value={guestPrimary.title}
                        onChange={(e) => setGuestPrimary({ ...guestPrimary, title: e.target.value })}
                        className="px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Ana Eğitmen Ders Detayı (Opsiyonel)</label>
                  <input
                    type="text"
                    value={courseForm.primarySessionDetails}
                    onChange={(e) => setCourseForm({ ...courseForm, primarySessionDetails: e.target.value })}
                    placeholder="Örn: Şema Mod Terapisi Giriş"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* DATE PICKER, START TIME & DURATION */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-sky-600" />
                    Başlangıç Tarihi *
                  </label>
                  <input
                    type="date"
                    required
                    value={courseForm.startDate}
                    onChange={(e) => setCourseForm({ ...courseForm, startDate: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium"
                  />
                  <span className="text-[10px] text-sky-700 dark:text-sky-400 block mt-0.5">
                    Görünüm: {formatTurkishDate(courseForm.startDate)}
                  </span>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    Etkinlik Saati *
                  </label>
                  <input
                    type="text"
                    required
                    value={courseForm.startTime}
                    onChange={(e) => setCourseForm({ ...courseForm, startTime: e.target.value })}
                    placeholder="20.00"
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Toplam Süre (Saat)</label>
                  <input
                    type="number"
                    value={courseForm.totalHours}
                    onChange={(e) => setCourseForm({ ...courseForm, totalHours: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              {/* PRICE & DISCOUNT PERCENT (DISABLED IF FREE) */}
              {!courseForm.isFree && (
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Liste Fiyatı (₺) *</label>
                      <input
                        type="number"
                        required
                        value={courseForm.originalPrice}
                        onChange={(e) => setCourseForm({ ...courseForm, originalPrice: Number(e.target.value) })}
                        placeholder="6000"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300 flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5 text-emerald-600" />
                        İndirim Yüzdesi (%) *
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        required
                        value={courseForm.discountPercent}
                        onChange={(e) => setCourseForm({ ...courseForm, discountPercent: Number(e.target.value) })}
                        placeholder="25"
                        className="w-full px-3 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-emerald-700 dark:text-emerald-400 font-bold"
                      />
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 dark:text-slate-300 flex items-center justify-between pt-1">
                    <span>Hesaplanan Satış Fiyatı:</span>
                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                      {computedDiscountedPrice.toLocaleString('tr-TR')} ₺ <span className="text-slate-400">(%{courseForm.discountPercent} İndirimli)</span>
                    </span>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Açıklama</label>
                <textarea
                  rows={3}
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingCourse(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md"
                >
                  {editingCourse ? 'Güncellemeleri Kaydet' : 'Eğitimi Yayınla'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
