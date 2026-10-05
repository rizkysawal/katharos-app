import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  createEventApi,
  createDevotionalApi,
  fetchAdminUsersApi,
} from '../../services/api';
import {
  ShieldCheck,
  Calendar,
  BookOpen,
  Users,
  LogOut,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('events'); // 'events' | 'devotionals' | 'users'
  const [usersList, setUsersList] = useState([]);
  const [toastMsg, setToastMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // New Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Ibadah Jumat',
    start_time: '',
    end_time: '',
    location: '',
    google_maps_url: '',
    speaker: '',
    notes: '',
    is_alert: false,
  });

  // New Devotional Form State
  const [devoForm, setDevoForm] = useState({
    publish_date: new Date().toISOString().split('T')[0],
    title: '',
    author: user?.full_name || 'Tim Pembina PMK',
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

  // Load registered users when users tab is active
  useEffect(() => {
    if (activeTab === 'users' && token) {
      fetchAdminUsersApi(token)
        .then((data) => setUsersList(data))
        .catch((err) => console.error('Failed to load users:', err));
    }
  }, [activeTab, token]);

  const handleCreateEvent = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const payload = {
        ...eventForm,
        start_time: new Date(eventForm.start_time).toISOString(),
        end_time: eventForm.end_time ? new Date(eventForm.end_time).toISOString() : null,
      };
      await createEventApi(payload, token);
      showToast('Agenda kegiatan berhasil ditambahkan!');
      setEventForm({
        title: '',
        category: 'Ibadah Jumat',
        start_time: '',
        end_time: '',
        location: '',
        google_maps_url: '',
        speaker: '',
        notes: '',
        is_alert: false,
      });
    } catch (err) {
      showToast('Gagal: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateDevotional = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createDevotionalApi(devoForm, token);
      showToast('Renungan berhasil diterbitkan!');
      setDevoForm({
        publish_date: new Date().toISOString().split('T')[0],
        title: '',
        author: user?.full_name || 'Tim Pembina PMK',
        passage_ref: '',
        passage_text: '',
        content: '',
        quote: '',
        prayer: '',
        image_url: '',
      });
    } catch (err) {
      showToast('Gagal: ' + err.message);
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
      
      {/* Top Navbar */}
      <header className="border-b border-stone-800 bg-stone-900/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-base text-stone-100">
              Katharos Admin Workspace
            </h1>
            <p className="text-xs text-stone-400">
              Login sebagai: <span className="text-amber-400 font-semibold">{user?.full_name}</span> ({user?.role})
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

      {/* Main Container */}
      <main className="max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 flex-1">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-3 mb-8">
          {[
            { id: 'events', label: 'Kelola Agenda PMK', icon: Calendar },
            { id: 'devotionals', label: 'Kelola Renungan', icon: BookOpen },
            { id: 'users', label: 'Daftar Pengguna / Akun', icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-amber-600 text-stone-950 shadow-md font-bold'
                    : 'text-stone-400 hover:text-stone-100 hover:bg-stone-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Events Manager */}
        {activeTab === 'events' && (
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <h2 className="font-serif font-bold text-lg text-stone-100 flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-amber-500" />
                Tambah Agenda Kegiatan PMK
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Jadwal ini akan langsung tampil di halaman depan dan dapat dimasukkan ke Google Calendar oleh jemaat.
              </p>
            </div>

            <form onSubmit={handleCreateEvent} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Nama Kegiatan / Ibadah *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ibadah Syukur Awal Semester"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Kategori
                </label>
                <select
                  value={eventForm.category}
                  onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none text-stone-100"
                >
                  <option value="Ibadah Jumat">Ibadah Jumat</option>
                  <option value="Persekutuan Doa">Persekutuan Doa</option>
                  <option value="Kelompok Kecil">Kelompok Kecil</option>
                  <option value="Retreat & Seminar">Retreat & Seminar</option>
                  <option value="Pelayanan Sosial">Pelayanan Sosial</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Pembicara / Pengkhotbah
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pdt. Samuel Hartanto, M.Th"
                  value={eventForm.speaker}
                  onChange={(e) => setEventForm({ ...eventForm, speaker: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Waktu Mulai *
                </label>
                <input
                  type="datetime-local"
                  required
                  value={eventForm.start_time}
                  onChange={(e) => setEventForm({ ...eventForm, start_time: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none text-stone-100"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Waktu Selesai (Opsional)
                </label>
                <input
                  type="datetime-local"
                  value={eventForm.end_time}
                  onChange={(e) => setEventForm({ ...eventForm, end_time: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none text-stone-100"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Lokasi Acara
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Gedung Serbaguna Lt. 3"
                  value={eventForm.location}
                  onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Link Google Maps
                </label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/?q=..."
                  value={eventForm.google_maps_url}
                  onChange={(e) => setEventForm({ ...eventForm, google_maps_url: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Catatan / Keterangan
                </label>
                <textarea
                  rows="3"
                  placeholder="Informasi dresscode, hal yang perlu dibawa, atau kontak PIC..."
                  value={eventForm.notes}
                  onChange={(e) => setEventForm({ ...eventForm, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              {/* is_alert Checkbox */}
              <div className="sm:col-span-2 p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="is_alert"
                  checked={eventForm.is_alert}
                  onChange={(e) => setEventForm({ ...eventForm, is_alert: e.target.checked })}
                  className="w-5 h-5 rounded text-amber-600 focus:ring-amber-500 bg-stone-950 border-stone-700"
                />
                <label htmlFor="is_alert" className="text-xs text-amber-200 cursor-pointer">
                  <span className="font-bold flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    Tandai sebagai Pengumuman Penting (Top Alert Banner)
                  </span>
                  Jika dicentang, pengumuman ini akan otomatis muncul mencolok di bagian paling atas halaman beranda publik.
                </label>
              </div>

              <div className="sm:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? 'Menyimpan...' : 'Simpan & Publikasikan Agenda'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Devotionals Manager */}
        {activeTab === 'devotionals' && (
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <h2 className="font-serif font-bold text-lg text-stone-100 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-500" />
                Terbitkan Renungan Harian
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Renungan akan tampil di landing page sesuai tanggal rilis yang ditentukan.
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
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none text-stone-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Penulis Renungan
                  </label>
                  <input
                    type="text"
                    value={devoForm.author}
                    onChange={(e) => setDevoForm({ ...devoForm, author: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none text-stone-100"
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
                  placeholder="Contoh: Hikmat di Tengah Tekanan Perkuliahan"
                  value={devoForm.title}
                  onChange={(e) => setDevoForm({ ...devoForm, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Referensi Bacaan Alkitab
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Yakobus 1:2-4"
                    value={devoForm.passage_ref}
                    onChange={(e) => setDevoForm({ ...devoForm, passage_ref: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                    Kutipan Teks Firman
                  </label>
                  <input
                    type="text"
                    placeholder="Anggaplah sebagai suatu kebahagiaan..."
                    value={devoForm.passage_text}
                    onChange={(e) => setDevoForm({ ...devoForm, passage_text: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Isi Renungan (Mendukung paragraf panjang) *
                </label>
                <textarea
                  rows="6"
                  required
                  placeholder="Tuliskan renungan firman Tuhan secara mendalam di sini..."
                  value={devoForm.content}
                  onChange={(e) => setDevoForm({ ...devoForm, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none font-serif leading-relaxed"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none font-serif italic"
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
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider block mb-1">
                  Doa Hari Ini
                </label>
                <textarea
                  rows="3"
                  placeholder="Tuhan Yesus, terima kasih atas firman-Mu hari ini..."
                  value={devoForm.prayer}
                  onChange={(e) => setDevoForm({ ...devoForm, prayer: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-stone-950 border border-stone-800 text-sm focus:border-amber-500 focus:outline-none font-serif italic"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-sm shadow-md transition-all active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? 'Menerbitkan...' : 'Terbitkan Renungan'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Users Directory */}
        {activeTab === 'users' && (
          <div className="bg-stone-900 border border-stone-800 rounded-3xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-stone-800 pb-4">
              <h2 className="font-serif font-bold text-lg text-stone-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-500" />
                Daftar Pengguna Terdaftar
              </h2>
              <p className="text-xs text-stone-400 mt-1">
                Data jemaat yang masuk melalui Google OAuth dan akun pengurus lokal.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider text-[11px] border-b border-stone-800">
                  <tr>
                    <th className="py-3 px-4">Nama Lengkap</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Provider</th>
                    <th className="py-3 px-4">Terdaftar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800">
                  {usersList.map((u) => (
                    <tr key={u.id} className="hover:bg-stone-800/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-stone-200">
                        {u.full_name}
                      </td>
                      <td className="py-3 px-4 text-stone-400 font-mono text-xs">
                        {u.email}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            u.role === 'admin'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : u.role === 'writer'
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                              : 'bg-stone-800 text-stone-300'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-xs text-stone-400 uppercase">
                        {u.auth_provider}
                      </td>
                      <td className="py-3 px-4 text-xs text-stone-500">
                        {new Date(u.created_at).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))}
                  {usersList.length === 0 && (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-stone-500">
                        Memuat data pengguna...
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Toast Feedback */}
      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-amber-500 text-stone-950 text-xs font-bold shadow-xl border border-amber-400">
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMsg}</span>
          </div>
        </div>
      )}

    </div>
  );
}
