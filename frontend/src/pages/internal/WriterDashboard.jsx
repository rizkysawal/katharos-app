import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { createDevotionalApi } from '../../services/api';
import { PenTool, BookOpen, LogOut, CheckCircle2 } from 'lucide-react';

export default function WriterDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [toastMsg, setToastMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [devoForm, setDevoForm] = useState({
    publish_date: new Date().toISOString().split('T')[0],
    title: '',
    author: user?.full_name || 'Penulis Renungan PMK',
    passage_ref: '',
    passage_text: '',
    content: '',
    quote: '',
    prayer: '',
    image_url: '',
  });

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateDevotional = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createDevotionalApi(devoForm, token);
      showToast('Naskah renungan berhasil disimpan dan diterbitkan!');
      setDevoForm({
        publish_date: new Date().toISOString().split('T')[0],
        title: '',
        author: user?.full_name || 'Penulis Renungan PMK',
        passage_ref: '',
        passage_text: '',
        content: '',
        quote: '',
        prayer: '',
        image_url: '',
      });
    } catch (err) {
      showToast('Gagal menerbitkan: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col">
      
      {/* Top Header */}
      <header className="border-b border-stone-800 bg-stone-900/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold">
            <PenTool className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-base text-stone-100">
              Katharos Writer Studio
            </h1>
            <p className="text-xs text-stone-400">
              Penulis: <span className="text-blue-400 font-semibold">{user?.full_name}</span>
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-800 hover:bg-red-950/40 hover:text-red-400 text-stone-300 text-xs font-semibold border border-stone-700 transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar</span>
        </button>
      </header>

      {/* Main Form */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <h2 className="font-serif font-bold text-xl text-stone-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-400" />
              Tulis & Publikasikan Renungan Harian
            </h2>
            <p className="text-xs text-stone-400 mt-1">
              Tulisan Anda akan diterbitkan langsung ke landing page komunitas Katharos.
            </p>
          </div>

          <form onSubmit={handleCreateDevotional} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Tanggal Terbit *
                </label>
                <input
                  type="date"
                  required
                  value={devoForm.publish_date}
                  onChange={(e) => setDevoForm({ ...devoForm, publish_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none text-stone-100"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Nama Penulis
                </label>
                <input
                  type="text"
                  value={devoForm.author}
                  onChange={(e) => setDevoForm({ ...devoForm, author: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Judul Renungan *
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Menemukan Terang di Ujung Badai"
                value={devoForm.title}
                onChange={(e) => setDevoForm({ ...devoForm, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Referensi Alkitab (cth: Mazmur 23:1-3)
                </label>
                <input
                  type="text"
                  placeholder="Mazmur 23:1-3"
                  value={devoForm.passage_ref}
                  onChange={(e) => setDevoForm({ ...devoForm, passage_ref: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Kutipan Teks Ayat
                </label>
                <input
                  type="text"
                  placeholder="TUHAN adalah gembalaku..."
                  value={devoForm.passage_text}
                  onChange={(e) => setDevoForm({ ...devoForm, passage_text: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Isi Renungan *
              </label>
              <textarea
                rows="8"
                required
                placeholder="Tuliskan renungan firman secara mendalam dan menyentuh hati di sini..."
                value={devoForm.content}
                onChange={(e) => setDevoForm({ ...devoForm, content: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none font-serif leading-relaxed"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Kata Mutiara / Quote
              </label>
              <input
                type="text"
                placeholder="Ketika hati gelisah, datanglah kepada Tuhan..."
                value={devoForm.quote}
                onChange={(e) => setDevoForm({ ...devoForm, quote: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none font-serif italic"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                URL Gambar Header (Opsional)
              </label>
              <input
                type="text"
                placeholder="/devotionals/2026-10-01.jpg atau https://..."
                value={devoForm.image_url}
                onChange={(e) => setDevoForm({ ...devoForm, image_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                Doa Penutup Hari Ini
              </label>
              <textarea
                rows="3"
                placeholder="Bapa yang baik di surga..."
                value={devoForm.prayer}
                onChange={(e) => setDevoForm({ ...devoForm, prayer: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-blue-500 focus:outline-none font-serif italic"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm shadow-md transition-all disabled:opacity-50"
              >
                {isLoading ? 'Menyimpan...' : 'Simpan & Publikasikan'}
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500 text-white text-xs font-bold shadow-xl border border-blue-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

    </div>
  );
}
