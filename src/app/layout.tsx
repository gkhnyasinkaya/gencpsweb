import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeContext';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Genç Psikologlar Akademi | Sertifikalı Psikoloji Eğitimleri',
  description: 'Türkiye\'nin lider psikoloji akademi platformu. GPM onaylı BDT, Klinik Testler, Çocuk Terapisi eğitimleri.',
  keywords: ['psikoloji eğitimi', 'bdt eğitimi', 'oyun terapisi', 'klinik testler', 'süpervizyon', 'gpm sertifika'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.variable} suppressHydrationWarning>
      <head>
        <Script
          id="settings-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('gpa_settings_v3');
                  if (saved) {
                    var settings = JSON.parse(saved);
                    if (settings.announcementEnabled === false) {
                      document.documentElement.classList.add('hide-announcement');
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
