'use client';

import { COURSES, INSTRUCTORS, TESTIMONIALS, FAQS, Course, Instructor, Testimonial, FAQ } from '@/data/courses';

export interface Application {
  id: string;
  courseId: string;
  courseTitle: string;
  fullName: string;
  email: string;
  phone: string;
  status: 'Mezun Psikolog / PDR' | 'Psikoloji Lisans Öğrencisi' | 'PDR Lisans Öğrencisi' | string;
  university?: string;
  notes?: string;
  appliedAt: string;
  leadStatus: 'Yeni' | 'İletişime Geçildi' | 'Kayıt Yapıldı' | 'İptal';
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface FeaturedShortcut {
  id: string;
  title: string;
  badge: string;
  link: string;
}

export interface AcademicPublication {
  id: string;
  title: string;
  authors: string;
  year: string;
  pdfUrl: string;
  abstract: string;
  isFeatured: boolean;
}

export interface SiteSettings {
  siteTitle: string;
  siteSubtitle: string;
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroDescription: string;
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  instagramUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  statsGraduates: string;
  statsPrograms: string;
  statsSatisfaction: string;

  // CMS Builder Controls
  announcementEnabled: boolean;
  announcementText: string;
  announcementLinkText: string;
  announcementLinkUrl: string;

  logoIcon: string;
  logoText: string;
  navMenuItems: NavItem[];

  heroBackgroundType: 'gradient' | 'image' | 'color';
  heroBackgroundValue: string;
  enableHeroInteractiveAnimation: boolean;
  showHeroStats: boolean;

  showFeaturedShortcuts: boolean;
  featuredShortcutsTitle: string;
  featuredShortcuts: FeaturedShortcut[];

  showPublications: boolean;
  publicationsTitle: string;
  publications: AcademicPublication[];

  showInstructorsSection: boolean;
  showTestimonialsSection: boolean;
  showFaqSection: boolean;

  sectionOrder: string[];
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteTitle: 'GENÇ PSİKOLOGLAR AKADEMİ',
  siteSubtitle: 'GPM Katılım & Başarı Sertifikasyonu',
  heroBadge: 'Genç Psikologlar Akademi Portalı',
  heroTitleLine1: 'Prestijli Eğitim,',
  heroTitleLine2: 'Geleceği Şekillendiren Terapistler',
  heroDescription: 'Meslektaşlarınız burada öğrendi, burada uyguladı. Genç Psikologlar Meclisi onaylı sertifikalı programlar, canlı süpervizyonlar ve uzman eğitmen kadrosuyla kariyerinizde fark yaratın.',
  whatsappNumber: '905550000000',
  phone: '0850 300 00 00',
  email: 'bilgi@gencpsikologlar.org',
  address: 'Bağdat Caddesi No: 124/5 Kadıköy / İstanbul',
  instagramUrl: 'https://instagram.com/gencpsikologlar',
  linkedinUrl: 'https://linkedin.com/company/gencpsikologlar',
  youtubeUrl: 'https://youtube.com/@gencpsikologlar',
  statsGraduates: '5,000+',
  statsPrograms: '40+',
  statsSatisfaction: '%98.4',

  announcementEnabled: true,
  announcementText: '🔥 Erken Kayıt Fırsatı: Tüm Klinik Terapilerde %25 İndirim!',
  announcementLinkText: 'Programları İncele →',
  announcementLinkUrl: '#courses',

  logoIcon: '🎓',
  logoText: 'GPA ADMİN',
  navMenuItems: [
    { id: 'n1', label: 'Eğitimler', href: '#courses' },
    { id: 'n2', label: 'Öne Çıkanlar', href: '#shortcuts' },
    { id: 'n3', label: 'Akademik Yayınlar', href: '#publications' },
    { id: 'n4', label: 'Eğitmenler', href: '#instructors' },
    { id: 'n5', label: 'Görüşler', href: '#testimonials' },
    { id: 'n6', label: 'SSS', href: '#faq' }
  ],

  heroBackgroundType: 'gradient',
  heroBackgroundValue: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0369a1 100%)',
  enableHeroInteractiveAnimation: true,
  showHeroStats: true,

  showFeaturedShortcuts: true,
  featuredShortcutsTitle: '⚡ Öne Çıkan Hızlı Erişimler',
  featuredShortcuts: [
    { id: 'fs1', title: 'BDT Uygulayıcı Eğitimi', badge: 'Popüler', link: '#courses' },
    { id: 'fs2', title: 'Şema Mod Terapisi Semineri', badge: 'Canlı', link: '#courses' },
    { id: 'fs3', title: 'EMDR Teorik Modül', badge: 'Yeni', link: '#courses' }
  ],

  showPublications: true,
  publicationsTitle: '📚 Akademik Yayınlar & PDF Arşivi',
  publications: [
    {
      id: 'pub1',
      title: 'Bilişsel Davranışçı Terapi Vaka Analizleri (2026)',
      authors: 'Klinik Psk. Uğur Can Çelik',
      year: '2026',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      abstract: 'Anksiyete ve panik bozukluk vakalarında BDT tekniklerinin etkinliği.',
      isFeatured: true
    },
    {
      id: 'pub2',
      title: 'Şema Terapide Erken Dönem Uyumsuz Şemalar',
      authors: 'Dr. Psk. Merve Yılmaz',
      year: '2025',
      pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      abstract: 'Şema mod modelleri ve klinik görüşme protokolleri.',
      isFeatured: true
    }
  ],

  showInstructorsSection: true,
  showTestimonialsSection: true,
  showFaqSection: true,

  sectionOrder: [
    'announcement',
    'hero',
    'shortcuts',
    'courses',
    'publications',
    'instructors',
    'testimonials',
    'faq'
  ]
};


const COURSES_STORAGE_KEY = 'gpa_courses_v3';
const INSTRUCTORS_STORAGE_KEY = 'gpa_instructors_v3';
const APPLICATIONS_STORAGE_KEY = 'gpa_applications_v3';
const SETTINGS_STORAGE_KEY = 'gpa_site_settings_v3';
const FAQS_STORAGE_KEY = 'gpa_faqs_v3';
const TESTIMONIALS_STORAGE_KEY = 'gpa_testimonials_v3';
const AUTH_STORAGE_KEY = 'gpa_admin_auth_v3';

// Initial Mock Applications
const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'APP-101',
    courseId: 'bdt-uygulayici-2026',
    courseTitle: 'Bilişsel Davranışçı Terapi (BDT) Teorik ve Uygulamalı Eğitimi',
    fullName: 'Psk. Gamze Şahin',
    email: 'gamze.sahin@gmail.com',
    phone: '0532 111 22 33',
    status: 'Mezun Psikolog / PDR',
    university: 'Hacettepe Üniversitesi Psikoloji',
    notes: 'Kredi kartına taksit seçeneği hakkında bilgi rica ederim.',
    appliedAt: '2026-07-28 14:30',
    leadStatus: 'Yeni'
  },
  {
    id: 'APP-102',
    courseId: 'zihnin-farkli-yuzleri-sema-terapisi',
    courseTitle: 'Zihnin Farklı Yüzleri: Şema Mod Terapisiyle Tanışma',
    fullName: 'Psk. Selin Öztürk',
    email: 'selin.ozturk@outlook.com',
    phone: '0544 222 33 44',
    status: 'Psikoloji Lisans Öğrencisi',
    university: 'Ankara Üniversitesi (4. Sınıf)',
    notes: 'Ücretsiz seminer katılım linki ne zaman gönderilecek?',
    appliedAt: '2026-07-29 09:15',
    leadStatus: 'İletişime Geçildi'
  }
];

// Helper to load courses
export function getStoredCourses(): Course[] {
  if (typeof window === 'undefined') return COURSES;
  try {
    const item = localStorage.getItem(COURSES_STORAGE_KEY);
    return item ? JSON.parse(item) : COURSES;
  } catch (e) {
    return COURSES;
  }
}

export function setStoredCourses(courses: Course[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(COURSES_STORAGE_KEY, JSON.stringify(courses));
}

// Helper to load instructors
export function getStoredInstructors(): Instructor[] {
  if (typeof window === 'undefined') return INSTRUCTORS;
  try {
    const item = localStorage.getItem(INSTRUCTORS_STORAGE_KEY);
    return item ? JSON.parse(item) : INSTRUCTORS;
  } catch (e) {
    return INSTRUCTORS;
  }
}

export function setStoredInstructors(instructors: Instructor[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(INSTRUCTORS_STORAGE_KEY, JSON.stringify(instructors));
}

// Helper to load applications
export function getStoredApplications(): Application[] {
  if (typeof window === 'undefined') return INITIAL_APPLICATIONS;
  try {
    const item = localStorage.getItem(APPLICATIONS_STORAGE_KEY);
    return item ? JSON.parse(item) : INITIAL_APPLICATIONS;
  } catch (e) {
    return INITIAL_APPLICATIONS;
  }
}

export function setStoredApplications(apps: Application[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(apps));
}

// Helper for Site Settings
export function getStoredSiteSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const item = localStorage.getItem(SETTINGS_STORAGE_KEY);
    return item ? JSON.parse(item) : DEFAULT_SETTINGS;
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function setStoredSiteSettings(settings: SiteSettings) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
}

// Helper for FAQs
export function getStoredFaqs(): FAQ[] {
  if (typeof window === 'undefined') return FAQS;
  try {
    const item = localStorage.getItem(FAQS_STORAGE_KEY);
    return item ? JSON.parse(item) : FAQS;
  } catch (e) {
    return FAQS;
  }
}

export function setStoredFaqs(faqs: FAQ[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(FAQS_STORAGE_KEY, JSON.stringify(faqs));
}

// Helper for Testimonials
export function getStoredTestimonials(): Testimonial[] {
  if (typeof window === 'undefined') return TESTIMONIALS;
  try {
    const item = localStorage.getItem(TESTIMONIALS_STORAGE_KEY);
    return item ? JSON.parse(item) : TESTIMONIALS;
  } catch (e) {
    return TESTIMONIALS;
  }
}

export function setStoredTestimonials(testimonials: Testimonial[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TESTIMONIALS_STORAGE_KEY, JSON.stringify(testimonials));
}

// Helper for Auth
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}

export function setAdminAuthenticated(auth: boolean) {
  if (typeof window === 'undefined') return;
  if (auth) {
    localStorage.setItem(AUTH_STORAGE_KEY, 'true');
  } else {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}
