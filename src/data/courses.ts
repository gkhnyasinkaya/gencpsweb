export interface Instructor {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  expertise: string;
  coursesCount: number;
}

export interface CurriculumModule {
  moduleNumber: number;
  title: string;
  topics: string[];
}

export interface CourseInstructor {
  name: string;
  title: string;
  avatar: string;
  sessionDetails?: string;
  isGuest?: boolean;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  category: 'BDT' | 'Klinik Testler' | 'Çocuk ve Ergen' | 'Terapi Ekolleri' | 'Süpervizyon';
  format: 'Online Canlı' | 'Yüz Yüze' | 'Hibrit';
  level: 'Uygulayıcı Sertikalı' | 'Temel Düzey' | 'İleri Düzey' | 'Süpervizyon Kapsamlı';
  city: string;
  location?: string;
  image?: string;
  isFree?: boolean;
  startTime?: string;
  instructor: CourseInstructor;
  additionalInstructors?: CourseInstructor[];
  startDate: string;
  formattedDate?: string;
  duration: string;
  totalHours: number;
  quota: number;
  remainingQuota: number;
  originalPrice: number;
  discountPercent: number;
  discountedPrice: number;
  certificateType: 'GPM Katılım & Başarı Sertifikalı' | 'GPM Başarı Sertifikalı' | 'GPM Akademi Sertifikalı' | 'Katılım Belgeli' | string;
  description: string;
  outcomes: string[];
  curriculum: CurriculumModule[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  university: string;
  courseTaken: string;
  comment: string;
  avatar: string;
  rating: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const CITIES = [
  { id: 'all', label: 'Tüm Şehirler' },
  { id: 'Online', label: 'Online / Canlı' },
  { id: 'İstanbul', label: 'İstanbul' },
  { id: 'Ankara', label: 'Ankara' },
  { id: 'İzmir', label: 'İzmir' },
  { id: 'Bursa', label: 'Bursa' },
  { id: 'Antalya', label: 'Antalya' },
  { id: 'Eskişehir', label: 'Eskişehir' },
  { id: 'Gaziantep', label: 'Gaziantep' }
];

export const CATEGORIES = [
  { id: 'all', label: 'Tüm Eğitimler' },
  { id: 'BDT', label: 'BDT' },
  { id: 'Klinik Testler', label: 'Klinik Testler' },
  { id: 'Çocuk ve Ergen', label: 'Çocuk & Ergen' },
  { id: 'Terapi Ekolleri', label: 'Terapi Ekolleri' },
  { id: 'Süpervizyon', label: 'Süpervizyon' },
];

export const INSTRUCTORS: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Prof. Dr. Hakan Türkçapar',
    title: 'Klinik Psikolog & BDT Derneği Başkanı',
    bio: 'Bilişsel Davranışçı Terapi alanında Türkiye\'nin en önde gelen akademisyen ve klinik uygulayıcılarındandır. Onlarca uluslararası makale ve kitabın yazarıdır.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    expertise: 'BDT, Anksiyete ve Depresyon Terapisi',
    coursesCount: 12
  },
  {
    id: 'inst-2',
    name: 'Doç. Dr. Neslihan Zabcı',
    title: 'Çocuk & Ergen Psikiyatri Uzmanı',
    bio: 'Projektif testler ve çocuk ruh sağlığı üzerine 15 yılı aşkın klinik deneyim ve üniversite öğretim üyeliği bulunmaktadır.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    expertise: 'Rorschach, TAT & Oyun Terapisi',
    coursesCount: 8
  },
  {
    id: 'inst-3',
    name: 'Uzm. Psk. Mehmet Akif Ersoy',
    title: 'Şema Terapi Kıdemli Süpervizörü',
    bio: 'Uluslararası Şema Terapi Derneği (ISST) onaylı eğitmen ve süpervizördür. Yetişkin psikopatolojisi üzerine uzmanlaşmıştır.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    expertise: 'Şema Terapi & Kişilik Bozuklukları',
    coursesCount: 6
  },
  {
    id: 'inst-4',
    name: 'Klinik Psikolog Uğur Can Çelik',
    title: 'Şema Terapi & Psikopatoloji Uzmanı',
    bio: 'Genç Psikologlar Meclisi Eğitim Ofisi bünyesinde psikoloji öğrencileri ve mezunlarına yönelik teorik ve uygulamalı seminerler vermektedir.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    expertise: 'Mod Terapisi, Şema Terapi',
    coursesCount: 5
  },
  {
    id: 'inst-5',
    name: 'Uzm. Psk. Melis Aktaş',
    title: 'Çocuk & Aile Terapisti',
    bio: 'Deneyimsel Oyun Terapisi ve Filial Terapi alanında uzmanlaşmış, aile danışmanlığı yürüten tecrübeli uygulayıcıdır.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    expertise: 'Oyun Terapisi, Filial Terapi',
    coursesCount: 4
  },
  {
    id: 'inst-6',
    name: 'Doç. Dr. Burak Yılmaz',
    title: 'EMDR & Travma Terapisti',
    bio: 'Travma ve afete müdahale alanlarında ulusal projeler yürütmüş, EMDR Avrupa onaylı süpervizör ve akademisyendir.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    expertise: 'EMDR Terapisi, Travma',
    coursesCount: 7
  }
];

export const COURSES: Course[] = [
  {
    id: 'zihnin-farkli-yuzleri-sema-terapisi',
    title: 'Zihnin Farklı Yüzleri: Şema Mod Terapisiyle Tanışma',
    slug: 'zihnin-farkli-yuzleri-sema-terapisi',
    category: 'Terapi Ekolleri',
    format: 'Online Canlı',
    level: 'Temel Düzey',
    city: 'Online',
    location: 'Zoom İnteraktif Canlı Seminer',
    image: '/poster-1.jpg',
    isFree: true,
    startTime: '20.00',
    instructor: {
      name: 'Klinik Psikolog Uğur Can Çelik',
      title: 'Şema Terapi & Psikopatoloji Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
      sessionDetails: 'Şema Mod Terapisi Temel Kavramlar'
    },
    startDate: '2026-06-16',
    formattedDate: '16 Haziran Salı',
    duration: '2 Saat',
    totalHours: 2,
    quota: 100,
    remainingQuota: 14,
    originalPrice: 0,
    discountPercent: 0,
    discountedPrice: 0,
    certificateType: 'Katılım Belgeli',
    description: 'Toplumsal farkındalığın artması ve psikolog / psikoloji öğrencilerinin gelişimi için alanında uzman eğitmenlerle organize edilen online seminer programı.',
    outcomes: [
      'Şema mod terapisi temel ilkelerini kavrama',
      'Uyumsuz şema ve ebeveyn modlarını tanıma',
      'Sağlıklı yetişkin modu güçlendirme teknikleri'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Modül 1: Şema Terapiye Giriş', topics: ['Mod Kavramı', 'Mizaç ve Temel İhtiyaçlar'] }
    ]
  },
  {
    id: 'cocuklarda-kaygi-oyun-terapisi-semineri',
    title: 'Çocuklarda Kaygı ve Oyun Terapisi Yaklaşımları Semineri',
    slug: 'cocuklarda-kaygi-oyun-terapisi-semineri',
    category: 'Çocuk ve Ergen',
    format: 'Online Canlı',
    level: 'Temel Düzey',
    city: 'Online',
    location: 'Zoom İnteraktif Seminer',
    image: '/poster-2.jpg',
    isFree: true,
    startTime: '20.30',
    instructor: {
      name: 'Uzm. Psk. Melis Aktaş',
      title: 'Çocuk & Aile Terapisti',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
      sessionDetails: 'Çocuklarda Ayrılık Kaygısı & Oyun Müdahaleleri'
    },
    startDate: '2026-07-02',
    formattedDate: '02 Temmuz Perşembe',
    duration: '2.5 Saat',
    totalHours: 2,
    quota: 150,
    remainingQuota: 28,
    originalPrice: 0,
    discountPercent: 0,
    discountedPrice: 0,
    certificateType: 'Katılım Belgeli',
    description: 'Okul öncesi ve ilkokul çağındaki çocuklarda okul korkusu, ayrılık kaygısı ve sosyal içe kapanıklığa oyun odaklı müdahale yaklaşımları.',
    outcomes: [
      'Kaygılı çocukta semptom okuma ve ebeveyn tutum analizi',
      'Oyun odasında kaygı metaforları ve rahatlatma egzersizleri',
      'Ebeveynlere yönelik rehberlik ve ev içi oyun önerileri'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Modül 1: Kaygı ve Oyun Metaforları', topics: ['Gelişimsel Kaygılar', 'Oyun Müdahaleleri'] }
    ]
  },
  {
    id: 'bdt-uygulayici-2026',
    title: 'Bilişsel Davranışçı Terapi (BDT) Teorik ve Uygulamalı Eğitimi',
    slug: 'bdt-uygulayici-egitimi',
    category: 'BDT',
    format: 'Online Canlı',
    level: 'Uygulayıcı Sertikalı',
    city: 'Online',
    location: 'Zoom İnteraktif Canlı Derslik',
    image: '/poster-3.jpg',
    isFree: false,
    startTime: '19.30',
    instructor: {
      name: 'Prof. Dr. Hakan Türkçapar',
      title: 'Klinik Psikolog & Akademisyen',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      sessionDetails: '1. ve 2. Saat: BDT Kuramsal Temelleri'
    },
    additionalInstructors: [
      {
        name: 'Doç. Dr. Neslihan Zabcı',
        title: 'Klinik Psikolog & Süpervizör',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        sessionDetails: '3. ve 4. Saat: Vaka Analizi'
      }
    ],
    startDate: '2026-09-15',
    formattedDate: '15 Eylül Salı',
    duration: '12 Hafta',
    totalHours: 48,
    quota: 30,
    remainingQuota: 6,
    originalPrice: 7500,
    discountPercent: 30,
    discountedPrice: 5250,
    certificateType: 'e-Devlet & Üniversite Onaylı',
    description: 'Depresyon, Anksiyete, Panik Bozukluk ve OKB vakalarında BDT kavramsallaştırma, müdahale teknikleri ve canlı rol-play seansları.',
    outcomes: [
      'Vaka kavramsallaştırması ve klinik formülasyon yapabilme',
      'Otomatik düşünce, ara inanç ve temel inanç tespiti',
      'Sokratik sorgulama ve bilişsel yeniden yapılandırma teknikleri',
      'Maruz bırakma ve davranışçı deney tasarlama becerisi'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Modül 1: BDT Temel İlkeleri ve İlk Seans', topics: ['Tarihçe & Kuramsal Çerçeve', 'İlk Görüşme & Değerlendirme', 'Psikoeğitim Verme'] },
      { moduleNumber: 2, title: 'Modül 2: Bilişsel Müdahale Teknikleri', topics: ['Otomatik Düşünceleri Yakalama', 'Bilişsel Çarpıtmalar', 'Düşünce Kaydı Formları'] }
    ]
  },
  {
    id: 'klinik-testler-uygulayici',
    title: 'Objektif ve Projektif Klinik Testler Uygulayıcı Sertifika Eğitimi',
    slug: 'klinik-testler-uygulayici-egitimi',
    category: 'Klinik Testler',
    format: 'Yüz Yüze',
    level: 'Uygulayıcı Sertikalı',
    city: 'İstanbul',
    location: 'Kadıköy Kozyatağı Kültür Merkezi',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000',
    isFree: false,
    startTime: '10.00',
    instructor: {
      name: 'Doç. Dr. Neslihan Zabcı',
      title: 'Çocuk & Ergen Psikiyatri Uzmanı',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      sessionDetails: 'Projektif Testler & Raporlama Seansı'
    },
    startDate: '2026-09-22',
    formattedDate: '22 Eylül Salı',
    duration: '8 Hafta',
    totalHours: 32,
    quota: 25,
    remainingQuota: 4,
    originalPrice: 6000,
    discountPercent: 25,
    discountedPrice: 4500,
    certificateType: 'GPM Katılım & Başarı Sertifikalı',
    description: 'MMPI, Beier Cümle Tamamlama, SCL-90, Bender Gestalt ve Çocuk Değerlendirme testlerinin uygulanması, puanlanması ve raporlanması.',
    outcomes: [
      'MMPI testi profil analizi ve alt ölçek puanlaması',
      'Klinik rapor yazma standartları ve etik kurallar',
      'Çocuk ve yetişkinlerde objektif değerlendirme teknikleri'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Modül 1: MMPI Uygulama ve Profil Çizimi', topics: ['Geçerlik Ölçekleri', 'Klinik Alt Ölçekler', 'Profil Yorumlama'] }
    ]
  },
  {
    id: 'emdr-travma-ileri-duzey',
    title: 'Yetişkinlerde EMDR Terapisi ve Travma Müdahaleleri',
    slug: 'emdr-travma-ileri-duzey',
    category: 'Terapi Ekolleri',
    format: 'Hibrit',
    level: 'İleri Düzey',
    city: 'Ankara',
    location: 'CerModern Konferans Salonu & Zoom',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1000',
    isFree: false,
    startTime: '10.00',
    instructor: {
      name: 'Doç. Dr. Burak Yılmaz',
      title: 'EMDR & Travma Terapisti',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
      sessionDetails: '8 Aşamalı EMDR Protokolü & Çift Yönlü Uyarım'
    },
    startDate: '2026-10-10',
    formattedDate: '10 Ekim Cumartesi',
    duration: '6 Hafta',
    totalHours: 36,
    quota: 20,
    remainingQuota: 5,
    originalPrice: 8500,
    discountPercent: 20,
    discountedPrice: 6800,
    certificateType: 'GPM Başarı Sertifikalı',
    description: 'Kompleks travma, TSSB, kayıp ve yas vakalarında 8 aşamalı EMDR protokolünün uygulanması ve bilişsel seans kavramsallaştırması.',
    outcomes: [
      'Kötü anı tespiti, hedef anı seçimi ve negatif inanç analizi',
      'Çift yönlü uyarım (göz hareketleri, dokunsal uyarım) teknikleri',
      'Tetikleyiciler ve gelecek şablonu oluşturma becerisi'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Modül 1: EMDR Teorisi ve Hazırlık', topics: ['Nörobiyolojik Temeller', 'Güvenli Alan Egzersizi'] }
    ]
  },
  {
    id: 'canli-supervizyon-vaka-grubu',
    title: 'Klinik Psikologlar İçin Canlı Süpervizyon ve Vaka Analiz Grubu',
    slug: 'canli-supervizyon-vaka-grubu',
    category: 'Süpervizyon',
    format: 'Online Canlı',
    level: 'Süpervizyon Kapsamlı',
    city: 'Online',
    location: 'Zoom Kapalı Vaka Grubu',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1000',
    isFree: false,
    startTime: '21.00',
    instructor: {
      name: 'Uzm. Psk. Mehmet Akif Ersoy',
      title: 'Şema Terapi Kıdemli Süpervizörü',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
      sessionDetails: 'Öğrenci Vaka Sunumları ve Süpervizör Geri Bildirimi'
    },
    startDate: '2026-10-18',
    formattedDate: '18 Ekim Pazar',
    duration: '4 Hafta',
    totalHours: 16,
    quota: 12,
    remainingQuota: 2,
    originalPrice: 4500,
    discountPercent: 15,
    discountedPrice: 3825,
    certificateType: 'GPM Akademi Sertifikalı',
    description: 'Danışan gören psikolog ve PDR uzmanlarının seans süreçlerindeki kilitlenmeleri açmak için hazırlanan canlı süpervizyon vaka grubu.',
    outcomes: [
      'Kendi seans vakasını yapılandırıp kıdemli hocaya sunma',
      'Terapötik ittifak dirençlerini aşma müdahaleleri',
      'Süpervizyon sertifikasyon saatini tamamlama'
    ],
    curriculum: [
      { moduleNumber: 1, title: 'Modül 1: Vaka Formülasyonu Sunumu', topics: ['Klinik Sunum İlkeleri', 'Geri Bildirimler'] }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Psk. Büşra Yılmaz',
    role: 'Klinik Psikolog',
    university: 'İstanbul Üniversitesi',
    courseTaken: 'BDT Uygulayıcı Eğitimi',
    comment: 'Eğitim sadece teorik kalmadı, Hakan Hoca ile yaptığımız canlı rol-play seansları seans odasına girdiğimdeki özgüvenimi katbekat artırdı.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Psk. Danışman Emre Kaya',
    role: 'PDR Uzmanı',
    university: 'Hacettepe Üniversitesi',
    courseTaken: 'Klinik Testler Eğitimi',
    comment: 'MMPI ve çocuk değerlendirme testlerinde rapor yazmak kabusumdu. Bu eğitim sayesinde GPM Akademi sertifikamı alıp danışan görmeye başladım.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Psk. Zeynep Arslan',
    role: 'Uzman Psikolog',
    university: 'Ege Üniversitesi',
    courseTaken: 'Zihnin Farklı Yüzleri Semineri',
    comment: 'Ücretsiz düzenlenen Şema Terapi webınarına katılmıştım. Uğur Can Hoca\'nın mod anlatımı o kadar netti ki hemen arkasından BDT modülüne yazıldım.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    rating: 5
  },
  {
    id: 'test-4',
    name: 'Psk. Selin Öztürk',
    role: 'Okul Psikolojik Danışmanı',
    university: 'Ankara Üniversitesi',
    courseTaken: 'Çocuklarda Kaygı Semineri',
    comment: 'Ücretsiz seminerlerin GPM Akademi güvencesiyle sunulması harika bir fırsat. Genç Psikologlar Akademi ekibine çok teşekkür ederim.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200',
    rating: 5
  }
];

export const FAQS: FAQ[] = [
  {
    question: 'Eğitim sonunda sertifika veriliyor mu?',
    answer: 'Evet, tüm programlarımızı başarıyla tamamlayan katılımcılara Genç Psikologlar Meclisi (GPM) Akademi Katılım ve Başarı Sertifikası verilmektedir.'
  },
  {
    question: 'Eğitimlere kimler katılım sağlayabilir?',
    answer: 'Eğitimlerimiz Psikoloji ve PDR (Rehberlik ve Psikolojik Danışmanlık) lisans mezunları ile 3. ve 4. sınıf lisans öğrencilerine açıktır.'
  },
  {
    question: 'Canlı dersleri kaçırırsam tekrar izleyebilir miyim?',
    answer: 'Evet, tüm canlı derslerimiz yüksek kalitede kaydedilir. Katılımcı paneliniz üzerinden 1 yıl boyunca dilediğiniz zaman sınırsız izleyebilirsiniz.'
  },
  {
    question: 'Ödeme kolaylıkları veya taksit imkanı var mıdır?',
    answer: 'Tüm kredi kartlarına 12 taksite varan ödeme imkanı ve erken kayıt indirimleri sunulmaktadır.'
  }
];
