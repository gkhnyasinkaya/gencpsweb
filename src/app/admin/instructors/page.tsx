'use client';

import React, { useState, useEffect } from 'react';
import { getStoredInstructors, setStoredInstructors } from '@/lib/store';
import { Instructor } from '@/data/courses';
import { 
  Award, 
  Plus, 
  Trash2, 
  Edit3, 
  Search, 
  X, 
  BookOpen, 
  User, 
  Sparkles,
  Check
} from 'lucide-react';

export default function AdminInstructorsPage() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);

  // Instructor Form State
  const [form, setForm] = useState({
    name: '',
    title: '',
    expertise: '',
    bio: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    coursesCount: 5
  });

  useEffect(() => {
    setInstructors(getStoredInstructors());
  }, []);

  const handleSaveInstructor = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingInstructor) {
      // Edit
      const updated = instructors.map((inst) => {
        if (inst.id === editingInstructor.id) {
          return {
            ...inst,
            name: form.name,
            title: form.title,
            expertise: form.expertise,
            bio: form.bio,
            avatar: form.avatar,
            coursesCount: Number(form.coursesCount)
          };
        }
        return inst;
      });

      setInstructors(updated);
      setStoredInstructors(updated);
      setEditingInstructor(null);
    } else {
      // Add
      const newInst: Instructor = {
        id: `inst-${Date.now()}`,
        name: form.name,
        title: form.title,
        expertise: form.expertise,
        bio: form.bio,
        avatar: form.avatar,
        coursesCount: Number(form.coursesCount)
      };

      const updated = [newInst, ...instructors];
      setInstructors(updated);
      setStoredInstructors(updated);
      setIsAddModalOpen(false);
    }

    // Reset Form
    setForm({
      name: '',
      title: '',
      expertise: '',
      bio: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
      coursesCount: 5
    });
  };

  const handleDeleteInstructor = (id: string) => {
    if (confirm('Bu eğitmeni kadrodan çıkarmak istediğinizden emin misiniz?')) {
      const updated = instructors.filter(i => i.id !== id);
      setInstructors(updated);
      setStoredInstructors(updated);
    }
  };

  const handleOpenEdit = (inst: Instructor) => {
    setEditingInstructor(inst);
    setForm({
      name: inst.name,
      title: inst.title,
      expertise: inst.expertise,
      bio: inst.bio,
      avatar: inst.avatar,
      coursesCount: inst.coursesCount
    });
  };

  const filteredInstructors = instructors.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.expertise.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-sky-600 dark:text-sky-400" />
            Eğitmen Kadrosu Yönetimi
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Akademide ders veren uzman akademisyen ve klinik psikologları ekleyin, güncelleyin veya kadrodan çıkarın.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingInstructor(null);
            setIsAddModalOpen(true);
          }}
          className="px-4 py-3 rounded-xl font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md flex items-center justify-center gap-2 text-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Yeni Eğitmen Ekle</span>
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Eğitmen adı veya uzmanlık alanı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-xs placeholder-slate-400 focus:outline-none focus:border-sky-500"
          />
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium hidden sm:inline">
          Kadroda <strong className="text-slate-900 dark:text-white">{filteredInstructors.length}</strong> eğitmen bulunuyor
        </span>
      </div>

      {/* Instructors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInstructors.map((inst) => (
          <div
            key={inst.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-sky-500/40 transition-all shadow-sm"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <img
                  src={inst.avatar}
                  alt={inst.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-sky-500 shadow-md shrink-0"
                />
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(inst)}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 text-sky-600 dark:text-sky-400 transition-colors"
                    title="Düzenle"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteInstructor(inst.id)}
                    className="p-2 rounded-xl bg-rose-50 dark:bg-slate-800 hover:bg-rose-100 dark:hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 transition-colors"
                    title="Kadrodan Çıkar / Sil"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{inst.name}</h3>
                <p className="text-xs text-sky-700 dark:text-sky-400 font-semibold">{inst.title}</p>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                {inst.bio}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium truncate max-w-[180px]">
                {inst.expertise}
              </span>
              <span className="text-[11px] text-sky-700 dark:text-sky-400 font-bold">
                {inst.coursesCount} Program
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || editingInstructor) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl text-slate-900 dark:text-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setIsAddModalOpen(false);
                setEditingInstructor(null);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white mb-4">
              {editingInstructor ? 'Eğitmen Bilgilerini Düzenle' : 'Yeni Eğitmen Ekle'}
            </h3>

            <form onSubmit={handleSaveInstructor} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Eğitmen Adı Soyadı *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Prof. Dr. Ahmet Yılmaz"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Unvan & Akademik Sıfat *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Klinik Psikolog & BDT Derneği Başkanı"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Uzmanlık Alanları *</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: BDT, Depresyon, Anksiyete Bozuklukları"
                  value={form.expertise}
                  onChange={(e) => setForm({ ...form, expertise: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Profil Fotoğrafı URL'si</label>
                <input
                  type="url"
                  value={form.avatar}
                  onChange={(e) => setForm({ ...form, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Biyografi & Özgeçmiş *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Eğitmenin klinik geçmişi ve akademik kariyeri..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingInstructor(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-sky-600 hover:bg-sky-700 text-white shadow-md"
                >
                  {editingInstructor ? 'Güncelle' : 'Eğitmeni Kadroya Ekle'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
