import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User as UserIcon, X, Check } from 'lucide-react';

/**
 * @param {{ compact?: boolean }} props
 *   compact: show icon/avatar only below `md` (used in the dense Reader header).
 */
export default function GoogleAuthButton({ compact = false }) {
  const { user, isAuthenticated, loginWithGoogle, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    }
    function handleKey(e) {
      if (e.key === 'Escape') {
        setIsDropdownOpen(false);
        setIsModalOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Lock page scroll while the login dialog is open
  useEffect(() => {
    if (!isModalOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isModalOpen]);

  const labelClass = compact ? 'hidden md:inline' : 'hidden sm:inline';

  const handleQuickDemoGoogleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = customEmail.trim() || 'jemaat.pmk@gmail.com';
    const fullName = customName.trim() || 'Jemaat PMK Katharos';
    const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fullName)}`;

    const res = await loginWithGoogle({
      id_token: 'mock_google_id_token_' + Date.now(),
      email,
      full_name: fullName,
      avatar_url: avatarUrl,
      google_id: 'google_sub_' + Math.random().toString(36).substring(7),
    });

    setIsLoading(false);
    if (res.success) {
      setIsModalOpen(false);
    }
  };

  // If already authenticated (via Google or local)
  if (isAuthenticated && user) {
    return (
      <div className="relative shrink-0" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className={`flex items-center gap-2 h-9 rounded-full bg-stone-100 hover:bg-stone-200/80 dark:bg-stone-800 dark:hover:bg-stone-700 border border-stone-200 dark:border-stone-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
            compact ? 'p-1 md:pl-1.5 md:pr-2.5' : 'p-1 sm:pl-1.5 sm:pr-2.5'
          }`}
          title="Profil Pengguna"
          aria-haspopup="menu"
          aria-expanded={isDropdownOpen}
          aria-label={`Akun: ${user.full_name || 'Pengguna'}`}
        >
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt=""
              className="w-7 h-7 rounded-full object-cover border border-amber-500/40 shrink-0"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
              {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <span
            className={`text-xs font-semibold text-stone-800 dark:text-stone-200 max-w-[90px] truncate ${
              compact ? 'hidden md:inline' : 'hidden sm:inline'
            }`}
          >
            {user.full_name ? user.full_name.split(' ')[0] : 'Akun'}
          </span>
        </button>

        {isDropdownOpen && (
          <div
            role="menu"
            className="absolute right-0 top-full mt-2 w-56 max-w-[calc(100vw-1.5rem)] rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-2xl py-2 z-50"
          >
            <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-800">
              <div className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                {user.full_name}
              </div>
              <div className="text-[11px] text-stone-400 truncate mt-0.5">
                {user.email}
              </div>
              <div className="mt-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                  {user.role === 'admin' ? 'Super Admin' : user.role === 'writer' ? 'Penulis' : 'Jemaat (Member)'}
                </span>
              </div>
            </div>

            <button
              type="button"
              role="menuitem"
              onClick={() => {
                logout();
                setIsDropdownOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-2 transition-colors mt-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // If NOT logged in: Show "Masuk dengan Google" button
  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={`flex items-center justify-center gap-1.5 sm:gap-2 h-9 min-w-9 rounded-full bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 text-xs sm:text-sm font-semibold shadow-sm transition-all active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
          compact ? 'px-2 md:px-3.5' : 'px-2 sm:px-3.5'
        }`}
        title="Masuk Akun Jemaat dengan Google"
        aria-label="Masuk dengan Google"
      >
        {/* Google G SVG */}
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        <span className={`${labelClass} whitespace-nowrap`}>
          Masuk{!compact && <span className="hidden lg:inline"> Google</span>}
        </span>
      </button>

      {/* Google Login Dialog — portaled to <body> so it is not trapped inside the
          navbar (its backdrop-filter makes `position: fixed` relative to the header). */}
      {isModalOpen && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="google-login-title"
            className="relative w-full max-w-sm max-h-[calc(100dvh-2rem)] overflow-y-auto bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 p-6 space-y-5"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                  <UserIcon className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <h3 id="google-login-title" className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
                    Masuk Akun Jemaat
                  </h3>
                  <p className="text-[11px] text-stone-400">Khusus Jemaat & Member PMK</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                aria-label="Tutup"
                className="p-1 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              Login dengan akun Google Anda untuk menyimpan bookmark renungan, membuat catatan pribadi, dan berpartisipasi dalam komunitas.
            </p>

            {/* Quick One-Click Google Action */}
            <form onSubmit={handleQuickDemoGoogleLogin} className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  placeholder="Contoh: David Kristanto"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                  Email Akun Google
                </label>
                <input
                  type="email"
                  placeholder="contoh@gmail.com"
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-xs sm:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-semibold text-sm shadow-md transition-all mt-4"
              >
                {isLoading ? (
                  <span>Menghubungkan...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Lanjutkan Masuk dengan Google</span>
                  </>
                )}
              </button>
            </form>

            <div className="pt-2 text-[11px] text-center text-stone-400">
              Sistem akan otomatis mendaftarkan profil Anda sebagai <span className="font-semibold text-stone-600 dark:text-stone-300">Member</span>.
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
