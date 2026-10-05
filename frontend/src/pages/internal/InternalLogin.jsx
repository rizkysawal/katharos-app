import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, Lock, Mail, Eye, EyeOff, AlertCircle, ArrowLeft } from 'lucide-react';

export default function InternalLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { loginInternal, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // If already logged in as staff, redirect immediately
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin') {
        navigate('/internal/admin', { replace: true });
      } else if (user.role === 'writer') {
        navigate('/internal/writer', { replace: true });
      } else {
        // Members cannot access internal login
        navigate('/', { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    const res = await loginInternal(email, password);
    setIsLoading(false);

    if (res.success) {
      if (res.user.role === 'admin') {
        navigate('/internal/admin', { replace: true });
      } else if (res.user.role === 'writer') {
        navigate('/internal/writer', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } else {
      setErrorMsg(res.error || 'Autentikasi gagal. Periksa kembali email dan kata sandi Anda.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-stone-950 text-stone-100 selection:bg-amber-500/30">
      
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-stone-950 to-stone-950 pointer-events-none" />

      <div className="relative w-full max-w-md bg-stone-900 border border-stone-800 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
        
        {/* Header Badge */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif font-bold text-2xl text-stone-100">
            Internal Staff Portal
          </h1>
          <p className="text-xs text-stone-400">
            Akses terbatas khusus Pengurus & Tim Penulis Katharos
          </p>
        </div>

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-800/60 text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
              Email / Akun Pengurus
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type="text"
                required
                placeholder="admin@katharos.or.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block mb-1.5">
              Kata Sandi
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-sm rounded-xl bg-stone-950 border border-stone-800 focus:border-amber-500 text-stone-100 placeholder:text-stone-600 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-300 transition-colors"
                title={showPassword ? 'Sembunyikan' : 'Tampilkan'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-amber-600 hover:bg-amber-500 active:scale-95 text-stone-950 font-bold text-sm shadow-md transition-all mt-6 disabled:opacity-50"
          >
            {isLoading ? 'Memverifikasi Kredensial...' : 'Masuk ke Dashboard'}
          </button>
        </form>

        {/* Default credentials reference for testing */}
        <div className="pt-4 border-t border-stone-800/80 text-[11px] text-stone-500 space-y-1 bg-stone-950/40 p-3.5 rounded-xl">
          <div className="font-semibold text-stone-400 mb-1">Kredensial Default Seed:</div>
          <div className="flex justify-between font-mono">
            <span>Admin:</span>
            <span className="text-amber-400/90">admin@katharos.or.id / AdminKatharos2026!</span>
          </div>
          <div className="flex justify-between font-mono">
            <span>Writer:</span>
            <span className="text-amber-400/90">writer@katharos.or.id / WriterKatharos2026!</span>
          </div>
        </div>

        {/* Back to public link */}
        <div className="text-center pt-2">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Beranda Publik</span>
          </button>
        </div>

      </div>
    </div>
  );
}
