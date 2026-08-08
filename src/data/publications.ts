export interface Publication {
  id: string;
  title: string;
  issue: string;
  date: string;
  category: string;
  summary: string;
  coverImage: string;
  readTime: string;
  downloadUrl?: string;
  featured?: boolean;
  authors: string[];
}

export const PUBLICATIONS: Publication[] = [
  {
    id: 'pub-1',
    title: 'Geleceğin Psikolojisi: Yapay Zeka ve Klinik Uygulamalar',
    issue: 'Psikolojiye Bakış • Sayı 14',
    date: 'Temmuz 2026',
    category: 'E-Dergi ve Araştırma',
    summary: 'Bu sayıda direkt etkisi klinik terapi odalarına erişen ve veri temelli çalışılan insandan insana terapi yaklaşımlarında yapay zekanın yeri ele alınıyor.',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    readTime: '12 Dk Okuma',
    featured: true,
    authors: ['Prof. Dr. Hakan Türkçapar', 'Klinik Psk. Uğur Can Çelik']
  },
  {
    id: 'pub-2',
    title: 'Ergenlerde Sosyal Medya Kullanımı ve Anksiyete İlişkisi',
    issue: 'Akademik Araştırma Raporu • Sayı 13',
    date: 'Mayıs 2026',
    category: 'Klinik Makale',
    summary: '15-18 yaş arası 1.200 ergenle yapılan boylamsal çalışmanın klinik analiz sonuçları ve terapötik tavsiyeler.',
    coverImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    readTime: '8 Dk Okuma',
    featured: false,
    authors: ['Doç. Dr. Neslihan Zabcı', 'Uzm. Psk. Melis Aktaş']
  },
  {
    id: 'pub-3',
    title: 'Travma Sonrası Büyüme ve EMDR Müdahaleleri',
    issue: 'Klinik Bülten • Sayı 12',
    date: 'Mart 2026',
    category: 'Vaka İncelemesi',
    summary: 'Afet sonrası akut stres bozukluğu vakalarında uygulanan erken EMDR protokollerinin etkinliği.',
    coverImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
    readTime: '10 Dk Okuma',
    featured: false,
    authors: ['Doç. Dr. Burak Yılmaz']
  }
];
