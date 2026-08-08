'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { isAdminAuthenticated, setAdminAuthenticated } from '@/lib/store';
import ThemeToggle from '@/components/ThemeToggle';
import { 
  GraduationCap, 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Award,
  Edit3,
  LogOut, 
  ChevronRight, 
  ExternalLink,
  Menu,
  X
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    setMounted(true);
    if (!isLoginPage && !isAdminAuthenticated()) {
      router.push('/admin/login');
    }
  }, [pathname, isLoginPage, router]);

  if (!mounted) return null;

  if (isLoginPage) {
    return <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">{children}</div>;
  }

  const navItems = [
    { label: 'Özet Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Eğitim Yönetimi', href: '/admin/courses', icon: BookOpen },
    { label: 'Eğitmen Kadrosu', href: '/admin/instructors', icon: Award },
    { label: 'Gelen Başvurular (Leads)', href: '/admin/applications', icon: Users },
    { label: 'Site İçerikleri & SSS', href: '/admin/content', icon: Edit3 },
  ];

  const handleLogout = () => {
    setAdminAuthenticated(false);
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row font-sans transition-colors duration-300">
      
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between hidden md:flex shrink-0 shadow-sm">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-sky-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-white dark:bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-sm text-slate-900 dark:text-white tracking-tight">GPA ADMİN</span>
                <span className="text-[10px] text-sky-700 dark:text-sky-400 font-semibold">Yönetim Paneli</span>
              </div>
            </Link>

            <ThemeToggle className="!p-1.5" />
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <div className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase px-3 mb-2 tracking-wider">
              Yönetim Menüsü
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <Link
            href="/akademi"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              Sitede İncele
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header Bar */}
      <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-sky-600 dark:text-sky-400" />
          <span className="font-extrabold text-sm text-slate-900 dark:text-white">GPA ADMİN</span>
        </Link>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
          >
            {mobileSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileSidebarOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileSidebarOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                pathname === item.href ? 'bg-sky-600 text-white' : 'text-slate-700 dark:text-slate-300'
              }`}
            >
              {item.label}
            </Link>
          ))}
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2.5 text-sm font-bold text-rose-600 dark:text-rose-400"
          >
            Çıkış Yap
          </button>
        </div>
      )}

      {/* Main Admin Content Area */}
      <main className="grow p-4 sm:p-8 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}
