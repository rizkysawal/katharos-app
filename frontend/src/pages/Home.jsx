import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchTodayDevotional,
  fetchUpcomingEvents,
  fetchDevotionalsArchive,
} from '../services/api';
import {
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  User,
  Share2,
  Bookmark,
  BookmarkCheck,
  AlertTriangle,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
  CalendarPlus,
  ArrowRight,
  CheckCircle2,
  Quote,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import GoogleAuthButton from '../components/GoogleAuthButton';
import { parsePassageRef } from '../utils/bibleReference';
import { FALLBACK_OCTOBER_DEVOTIONALS } from '../data/fallbackDevotionals';

const STORAGE_BOOKMARKS = 'katharos_bookmarked_devotionals';

export default function Home() {
  const [devotional, setDevotional] = useState(null);
  const [events, setEvents] = useState([]);
  const [monthDevotionals, setMonthDevotionals] = useState([]);
  const [todayPublishDate, setTodayPublishDate] = useState('2026-10-05');
  const [isLoading, setIsLoading] = useState(true);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(1); // 0: base, 1: lg, 2: xl, 3: 2xl
  const [bookmarked, setBookmarked] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const carouselRef = useRef(null);
  const todayCardRef = useRef(null);

  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('katharos_theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'sepia') {
      root.classList.add('theme-sepia');
    }
    localStorage.setItem('katharos_theme', theme);
  }, [theme]);

  // Load Devotional, Events & Month Devotionals Archive
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        const [devoData, eventsData, archiveData] = await Promise.all([
          fetchTodayDevotional(),
          fetchUpcomingEvents(),
          fetchDevotionalsArchive(10, 2026),
        ]);
        setDevotional(devoData);
        setEvents(eventsData);

        const actualToday = devoData?.publish_date || '2026-10-05';
        setTodayPublishDate(actualToday);

        const rawArchive = Array.isArray(archiveData) && archiveData.length > 0
          ? archiveData
          : FALLBACK_OCTOBER_DEVOTIONALS;

        // Sort chronologically: day 1 to day 31
        const sorted = [...rawArchive].sort(
          (a, b) => new Date(a.publish_date).getTime() - new Date(b.publish_date).getTime()
        );
        setMonthDevotionals(sorted);

        // Check if bookmarked
        if (devoData && devoData.id) {
          const saved = JSON.parse(localStorage.getItem(STORAGE_BOOKMARKS) || '[]');
          setBookmarked(saved.includes(devoData.id));
        }
      } catch (err) {
        console.error('Failed to load community data:', err);
        setMonthDevotionals(FALLBACK_OCTOBER_DEVOTIONALS);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((cur) => (cur === msg ? null : cur));
    }, 3000);
  };

  // Toggle Bookmark
  const handleToggleBookmark = () => {
    if (!devotional?.id) return;
    const saved = JSON.parse(localStorage.getItem(STORAGE_BOOKMARKS) || '[]');
    let updated;
    if (bookmarked) {
      updated = saved.filter((id) => id !== devotional.id);
      setBookmarked(false);
      showToast('Renungan dihapus dari bookmark');
    } else {
      updated = [...saved, devotional.id];
      setBookmarked(true);
      showToast('Renungan berhasil disimpan ke bookmark');
    }
    localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(updated));
  };

  // Share WhatsApp
  const handleShareWhatsApp = () => {
    if (!devotional) return;
    const url = window.location.origin;
    const quotePart = devotional.quote ? `\n\n_Kata Mutiara:_\n"${devotional.quote}"` : '';
    const text = `*${devotional.title}*\nRenungan Harian Katharos (${formatIndonesianDate(devotional.publish_date)})\n\n"${devotional.passage_text || ''}" - ${devotional.passage_ref}${quotePart}\n\nBaca renungan selengkapnya di:\n${url}`;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  // Helpers
  const formatIndonesianDate = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const formatShortCardDate = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
      });
    } catch {
      return dateString;
    }
  };

  const formatCardDayName = (dateString) => {
    if (!dateString) return '';
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('id-ID', {
        weekday: 'short',
      });
    } catch {
      return '';
    }
  };

  // Carousel actions
  const handleScrollCarousel = (direction) => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === 'left' ? -320 : 320;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleSelectDevotional = (item) => {
    setDevotional(item);
    if (item && item.id) {
      const saved = JSON.parse(localStorage.getItem(STORAGE_BOOKMARKS) || '[]');
      setBookmarked(saved.includes(item.id));
    }
    const renunganSection = document.getElementById('renungan');
    if (renunganSection) {
      renunganSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetToToday = () => {
    const todayItem = monthDevotionals.find((d) => d.publish_date === todayPublishDate);
    if (todayItem) {
      setDevotional(todayItem);
      if (todayItem.id) {
        const saved = JSON.parse(localStorage.getItem(STORAGE_BOOKMARKS) || '[]');
        setBookmarked(saved.includes(todayItem.id));
      }
    }
    if (todayCardRef.current && carouselRef.current) {
      const card = todayCardRef.current;
      const container = carouselRef.current;
      container.scrollTo({
        left: card.offsetLeft - (container.offsetWidth / 2) + (card.offsetWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  const formatEventTime = (startTime, endTime) => {
    try {
      const start = new Date(startTime);
      const dateStr = start.toLocaleDateString('id-ID', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      });
      const timeStart = start.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
      });
      let timeEnd = '';
      if (endTime) {
        const end = new Date(endTime);
        timeEnd = ` - ${end.toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
        })}`;
      }
      return `${dateStr} • ${timeStart}${timeEnd} WIB`;
    } catch {
      return startTime;
    }
  };

  // Generate Google Calendar Link
  const getGoogleCalendarURL = (event) => {
    try {
      const formatGCalTime = (isoString) => {
        const d = new Date(isoString);
        return d.toISOString().replace(/-|:|\.\d\d\d/g, '');
      };

      const start = formatGCalTime(event.start_time);
      const end = event.end_time
        ? formatGCalTime(event.end_time)
        : formatGCalTime(new Date(new Date(event.start_time).getTime() + 2 * 3600000));

      const title = encodeURIComponent(event.title);
      const details = encodeURIComponent(
        `${event.notes || ''}\nPembicara: ${event.speaker || '-'}\nKategori: ${event.category || '-'}`
      );
      const location = encodeURIComponent(event.location || '');

      return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
    } catch {
      return '#';
    }
  };

  // Font sizing styles for devotional
  const fontSizes = ['text-base leading-relaxed', 'text-lg leading-relaxed', 'text-xl leading-loose', 'text-2xl leading-loose'];

  // Check alert event
  const alertEvent = events.find((e) => e.is_alert);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf9] dark:bg-[#121212] text-stone-900 dark:text-stone-100 transition-colors duration-200 w-full overflow-x-hidden">

      {/* 1. TOP ALERT BANNER (If any upcoming event has is_alert = true) */}
      {alertEvent && !alertDismissed && (
        <aside
          role="alert"
          aria-label="Pengumuman Penting"
          className="bg-amber-500 text-stone-950 font-medium px-3 sm:px-4 py-2 sm:py-2.5 shadow-md flex items-center justify-between gap-2.5 text-xs sm:text-sm animate-in slide-in-from-top duration-300 w-full overflow-hidden"
        >
          <div className="max-w-5xl mx-auto flex items-center gap-2 flex-1 min-w-0">
            <AlertTriangle className="w-4 h-4 shrink-0 text-stone-950 animate-bounce" />
            <div className="truncate min-w-0">
              <span className="font-bold underline uppercase mr-1">Info:</span>
              <span className="font-semibold">{alertEvent.title}:</span>{' '}
              <span className="opacity-95">{alertEvent.notes || alertEvent.location}</span>
            </div>
          </div>
          <button
            onClick={() => setAlertDismissed(true)}
            className="p-1 hover:bg-black/10 rounded-md transition-colors shrink-0"
            title="Tutup Pengumuman"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* 2. COMMUNITY NAVBAR */}
      <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-[#fafaf9]/90 dark:bg-[#121212]/90 border-b border-stone-200 dark:border-stone-800 transition-colors duration-200 overflow-hidden">
        <div className="max-w-5xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-1.5 sm:gap-4 w-full">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 sm:gap-2 group shrink-0">
            <img
              src="/favicon.svg"
              alt="Logo Katharos"
              className="w-8 h-8 sm:w-9 sm:h-9 object-contain rounded-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform shrink-0"
            />
            <div>
              <span className="font-serif font-bold text-base sm:text-xl tracking-tight text-stone-900 dark:text-stone-100">
                Katharos
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-sans font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300">
                Komunitas & Firman
              </span>
            </div>
          </Link>

          {/* Nav Links & CTA */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a
              href="#renungan"
              className="hidden md:inline-block text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-1.5 transition-colors"
            >
              Renungan
            </a>
            <a
              href="#agenda"
              className="hidden md:inline-block text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 px-3 py-1.5 transition-colors"
            >
              Agenda PMK
            </a>

            {/* Direct Link to Bible Reader /read */}
            <Link
              to="/read"
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white font-medium text-xs sm:text-sm shadow-sm transition-all duration-150 active:scale-95"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Alkitab</span>
            </Link>

            {/* Google Authentication Button for Members (Jemaat) */}
            <GoogleAuthButton />

            {/* Quick Theme Toggle */}
            <div className="flex items-center bg-stone-100 dark:bg-stone-800 rounded-full p-0.5 border border-stone-200 dark:border-stone-700 shrink-0">
              <button
                onClick={() => setTheme('light')}
                className={`p-1 sm:p-1.5 rounded-full text-xs transition-colors ${theme === 'light' ? 'bg-white text-amber-600 shadow-xs' : 'text-stone-400 hover:text-stone-700'
                  }`}
                title="Mode Terang"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('sepia')}
                className={`hidden sm:inline-flex p-1.5 rounded-full text-xs transition-colors ${theme === 'sepia' ? 'bg-[#f4ecd8] text-amber-900 shadow-xs' : 'text-stone-400 hover:text-stone-700'
                  }`}
                title="Mode Sepia"
              >
                <Coffee className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`p-1 sm:p-1.5 rounded-full text-xs transition-colors ${theme === 'dark' ? 'bg-stone-700 text-amber-400 shadow-xs' : 'text-stone-400 hover:text-stone-300'
                  }`}
                title="Mode Gelap"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden pt-7 pb-6 sm:pt-14 sm:pb-12 border-b border-stone-200/80 dark:border-stone-800/80 bg-gradient-to-b from-amber-50/50 via-transparent to-transparent dark:from-amber-950/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-[11px] sm:text-xs font-semibold mb-3 sm:mb-4">
            <span>✨ PMK Katharos</span>
          </div>
          <h1 className="font-serif text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-100 mb-3 sm:mb-4 leading-snug sm:leading-tight">
            Bertumbuh Bersama dalam <span className="text-amber-600 dark:text-amber-500">Kasih & Firman</span>
          </h1>
          <p className="text-xs sm:text-base text-stone-600 dark:text-stone-400 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Wadah renungan harian firman Tuhan, jadwal persekutuan doa dan ibadah raya, serta pembaca Alkitab digital yang bersih dan modern.
          </p>

          <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-2.5 sm:gap-3 max-w-xs xs:max-w-none mx-auto">
            <a
              href="#renungan"
              className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:hover:bg-white dark:text-stone-900 font-semibold text-xs sm:text-sm transition-all shadow-sm active:scale-95 text-center"
            >
              Renungan Hari Ini ↓
            </a>
            <Link
              to="/read"
              className="px-5 py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 dark:bg-stone-800 dark:hover:bg-stone-700/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-stone-700 font-semibold text-xs sm:text-sm transition-all active:scale-95 flex items-center justify-center gap-2 text-center"
            >
              <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Buka Alkitab Online</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. MAIN CONTENT: RENUNGAN & AGENDA */}
      <main className="max-w-4xl mx-auto px-3.5 sm:px-6 py-8 sm:py-14 space-y-10 sm:space-y-16 w-full overflow-x-hidden">

        {/* SECTION: RENUNGAN HARI INI */}
        <section id="renungan" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">
                Santapan Rohani
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Renungan Hari Ini
              </h2>
            </div>

            {/* Quick Font Size Toggle */}
            <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl border border-stone-200 dark:border-stone-700 text-xs">
              <button
                onClick={() => setFontSizeIndex((prev) => Math.max(0, prev - 1))}
                className="px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-stone-700 font-semibold"
                title="Kecilkan Font"
              >
                A-
              </button>
              <button
                onClick={() => setFontSizeIndex((prev) => Math.min(fontSizes.length - 1, prev + 1))}
                className="px-2 py-1 rounded-lg hover:bg-white dark:hover:bg-stone-700 font-bold"
                title="Besarkan Font"
              >
                A+
              </button>
            </div>
          </div>

          {isLoading && !devotional ? (
            <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 animate-pulse space-y-4">
              <div className="h-6 bg-stone-200 dark:bg-stone-800 rounded w-1/3"></div>
              <div className="h-4 bg-stone-200 dark:bg-stone-800 rounded w-1/4"></div>
              <div className="h-20 bg-stone-200 dark:bg-stone-800 rounded"></div>
              <div className="h-40 bg-stone-200 dark:bg-stone-800 rounded"></div>
            </div>
          ) : devotional ? (
            <article className="overflow-hidden rounded-3xl bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800/80 shadow-sm transition-all duration-200">

              {/* 1. GAMBAR (Header Image) */}
              {devotional.image_url && (
                <div className="relative w-full h-48 xs:h-56 sm:h-72 md:h-84 overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={devotional.image_url}
                    alt={devotional.title}
                    className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              )}

              <div className="p-4 sm:p-7 md:p-9">
                {/* 2. TANGGAL (Publish Date) & PENULIS */}
                <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 sm:gap-2 text-xs text-stone-500 dark:text-stone-400 mb-4 pb-3 border-b border-stone-100 dark:border-stone-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-amber-700 dark:text-amber-400">
                      {formatIndonesianDate(devotional.publish_date)}
                    </span>
                    <span className="text-stone-300 dark:text-stone-700">•</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-medium">
                      Santapan Rohani
                    </span>
                  </div>
                  <span>Oleh: <strong className="text-stone-700 dark:text-stone-300">{devotional.author || 'Tim Katharos'}</strong></span>
                </div>

                {/* 3. AYAT (Passage Reference & Text) */}
                {devotional.passage_ref && (() => {
                  const target = parsePassageRef(devotional.passage_ref);
                  return (
                    <div className="rounded-2xl p-3.5 sm:p-5 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 mb-5 sm:mb-6">
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wide flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Bacaan Alkitab</span>
                        </span>
                        <Link
                          to={target.url}
                          className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-1 group/ref"
                          title={`Buka Alkitab ${devotional.passage_ref}`}
                        >
                          <span>{devotional.passage_ref}</span>
                          <ChevronRight className="w-3.5 h-3.5 group-hover/ref:translate-x-0.5 transition-transform" />
                        </Link>
                      </div>
                      {devotional.passage_text && (
                        <p className="font-serif text-sm sm:text-base italic text-stone-700 dark:text-stone-300 leading-relaxed">
                          "{devotional.passage_text}"
                        </p>
                      )}
                    </div>
                  );
                })()}

                {/* 4. JUDUL RENUNGAN (Title) */}
                <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-snug mb-4 sm:mb-6">
                  {devotional.title}
                </h3>

                {/* 5. ISI RENUNGAN (Body Content) */}
                <div
                  className={`font-serif ${fontSizes[fontSizeIndex]} text-stone-800 dark:text-stone-200 whitespace-pre-line space-y-3.5 sm:space-y-4`}
                >
                  {devotional.content}
                </div>

                {/* 6. QUOTE / KATA MUTIARA (Quotes) - tepat di atas Doa Hari Ini */}
                {devotional.quote && (
                  <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-2xl bg-amber-500/10 dark:bg-amber-950/30 border-l-4 border-amber-500 dark:border-amber-400 text-stone-800 dark:text-stone-200 shadow-sm">
                    <div className="flex items-start gap-3 sm:gap-3.5">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400 mt-0.5">
                        <Quote className="w-4 h-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
                          Kata Mutiara
                        </div>
                        <p className="font-serif italic font-medium text-sm sm:text-lg text-stone-800 dark:text-stone-100 leading-relaxed">
                          "{devotional.quote.replace(/^["“”']|["“”']$/g, '')}"
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 7. DOA HARI INI (Prayer) */}
                {devotional.prayer && (
                  <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800">
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 dark:text-stone-100 mb-2 flex items-center gap-1.5">
                      <span>🙏</span> Doa Hari Ini
                    </h4>
                    <p className="font-serif italic text-xs sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                      "{devotional.prayer.replace(/^["“”']|["“”']$/g, '')}"
                    </p>
                  </div>
                )}

                {/* Action Toolbar */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-stone-100 dark:border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    {/* Share WhatsApp */}
                    <button
                      onClick={handleShareWhatsApp}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/30 dark:hover:bg-emerald-900/40 dark:text-emerald-300 font-semibold text-xs sm:text-sm border border-emerald-200 dark:border-emerald-800 transition-colors active:scale-95"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>

                    {/* Bookmark Button */}
                    <button
                      onClick={handleToggleBookmark}
                      className={`flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-colors active:scale-95 ${bookmarked
                          ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-700'
                          : 'bg-stone-50 hover:bg-stone-100 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                        }`}
                    >
                      {bookmarked ? (
                        <>
                          <BookmarkCheck className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                          <span>Tersimpan</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-4 h-4" />
                          <span>Simpan</span>
                        </>
                      )}
                    </button>
                  </div>

                  {(() => {
                    const target = parsePassageRef(devotional?.passage_ref);
                    return (
                      <Link
                        to={target.url}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 dark:bg-amber-950/40 dark:hover:bg-amber-900/40 border border-amber-300/60 dark:border-amber-800/60 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-300 transition-all active:scale-95 group/goto text-center"
                        title={devotional?.passage_ref ? `Lanjut baca ${devotional.passage_ref} di Alkitab Reader` : 'Buka Alkitab Reader'}
                      >
                        <BookOpen className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        <span>Lanjut baca di Alkitab</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/goto:translate-x-0.5 transition-transform" />
                      </Link>
                    );
                  })()}
                </div>

              </div>
            </article>
          ) : (
            <div className="p-8 text-center text-stone-400">
              Belum ada renungan untuk hari ini.
            </div>
          )}
        </section>

        {/* SECTION: KALENDER & SCROLL HORIZONTAL RENUNGAN SEBULAN */}
        <section id="kalender-renungan" className="scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500 mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Katalog Santapan Rohani Sebulan</span>
              </div>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Renungan Sepanjang Bulan Ini
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-1">
                Pusat bacaan adalah renungan hari ini. Geser ke samping untuk melihat tanggal lainnya.
              </p>
              {/* Mobile swipe indicator */}
              <div className="flex items-center gap-1.5 text-[11px] text-amber-700 dark:text-amber-400 font-medium sm:hidden mt-2">
                <span>👉</span> Geser kartu ke samping untuk hari lain
              </div>
            </div>

            {/* Controls: Reset to Today & Carousel Scroll Arrows */}
            <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto shrink-0 pt-1">
              {devotional?.publish_date !== todayPublishDate && (
                <button
                  onClick={handleResetToToday}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/60 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 text-xs font-semibold transition-all active:scale-95 shadow-xs"
                  title="Kembali ke Renungan Hari Ini"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Kembali ke Hari Ini</span>
                </button>
              )}

              <div className="flex items-center gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-full border border-stone-200 dark:border-stone-700 ml-auto sm:ml-0">
                <button
                  onClick={() => handleScrollCarousel('left')}
                  className="p-1.5 rounded-full hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                  title="Geser Renungan Sebelumnya"
                  aria-label="Geser ke kiri"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScrollCarousel('right')}
                  className="p-1.5 rounded-full hover:bg-white dark:hover:bg-stone-700 text-stone-600 dark:text-stone-300 transition-colors"
                  title="Geser Renungan Selanjutnya"
                  aria-label="Geser ke kanan"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Carousel Viewport with Fade Edges */}
          <div className="relative w-full overflow-hidden">
            {/* Left Edge Gradient Fade */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-4 sm:w-10 bg-gradient-to-r from-[#fafaf9] dark:from-[#121212] to-transparent z-10 hidden sm:block" />

            {/* Right Edge Gradient Fade */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-4 sm:w-10 bg-gradient-to-l from-[#fafaf9] dark:from-[#121212] to-transparent z-10 hidden sm:block" />

            <div
              ref={carouselRef}
              className="flex gap-3 sm:gap-4 overflow-x-auto scroll-smooth py-3 px-1 snap-x snap-mandatory scrollbar-none sm:scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-stone-700"
            >
              {monthDevotionals.map((item) => {
                const isToday = item.publish_date === todayPublishDate;
                const isActive = devotional && devotional.publish_date === item.publish_date;

                return (
                  <div
                    key={item.id || item.publish_date}
                    ref={isToday ? todayCardRef : null}
                    onClick={() => handleSelectDevotional(item)}
                    className={`w-[78vw] xs:w-68 sm:w-72 shrink-0 snap-center rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between select-none group active:scale-[0.99] ${isActive
                        ? 'ring-2 ring-amber-500 border-amber-400 bg-amber-50/50 dark:bg-amber-950/40 shadow-lg scale-[1.01]'
                        : isToday
                          ? 'border-amber-400/80 bg-white dark:bg-stone-900 shadow-md hover:border-amber-500 hover:shadow-lg'
                          : 'border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-md hover:-translate-y-0.5'
                      }`}
                  >
                    <div>
                      {/* Image Thumbnail */}
                      <div className="relative h-28 xs:h-32 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-stone-400">
                            <BookOpen className="w-8 h-8 opacity-40" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                        {/* Floating Date Badge (Top Left) */}
                        <div className="absolute top-2 left-2 xs:top-2.5 xs:left-2.5 px-2 py-0.5 xs:px-2.5 xs:py-1 rounded-lg backdrop-blur-md bg-stone-950/70 text-white font-bold text-[11px] xs:text-xs shadow-sm flex items-center gap-1.5">
                          <span className="text-[10px] text-amber-400 uppercase font-semibold">
                            {formatCardDayName(item.publish_date)}
                          </span>
                          <span>{formatShortCardDate(item.publish_date)}</span>
                        </div>

                        {/* Status Badge (Top Right) */}
                        <div className="absolute top-2 right-2 xs:top-2.5 xs:right-2.5">
                          {isToday ? (
                            <span className="px-2 py-0.5 xs:px-2.5 rounded-full bg-amber-500 text-stone-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md animate-pulse">
                              ✨ Hari Ini
                            </span>
                          ) : isActive ? (
                            <span className="px-2 py-0.5 rounded-full bg-white/90 text-stone-900 font-bold text-[10px] shadow-sm">
                              Aktif
                            </span>
                          ) : null}
                        </div>

                        {/* Passage Ref overlay at bottom of image */}
                        {item.passage_ref && (
                          <div className="absolute bottom-2 left-2.5 right-2.5 text-white/95 text-[11px] font-medium truncate flex items-center gap-1">
                            <BookOpen className="w-3 h-3 text-amber-300 shrink-0" />
                            <span className="truncate">{item.passage_ref}</span>
                          </div>
                        )}
                      </div>

                      {/* Card Body */}
                      <div className="p-3.5 sm:p-4">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 line-clamp-2 leading-snug mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {item.title}
                        </h4>
                        <div className="text-[11px] text-stone-500 dark:text-stone-400">
                          Oleh: <span className="font-medium text-stone-700 dark:text-stone-300">{item.author || 'Tim Katharos'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Footer CTA */}
                    <div
                      className={`px-3.5 sm:px-4 py-2 text-xs font-semibold flex items-center justify-between border-t transition-colors ${isActive
                          ? 'bg-amber-100/60 dark:bg-amber-950/60 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-300 font-bold'
                          : 'bg-stone-50 dark:bg-stone-800/40 border-stone-100 dark:border-stone-800 text-stone-600 dark:text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                        }`}
                    >
                      <span>{isActive ? 'Sedang Dibaca' : 'Baca Renungan Ini'}</span>
                      {isActive ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SECTION: AGENDA KEGIATAN TERDEKAT */}
        <section id="agenda" className="scroll-mt-24">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-500">
                Jadwal & Komunitas
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                Agenda Kegiatan PMK
              </h2>
            </div>
            <span className="text-[11px] sm:text-xs text-stone-500 dark:text-stone-400 font-medium">
              {events.length} Kegiatan Terdekat
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${event.is_alert
                    ? 'border-amber-400 bg-amber-50/40 dark:bg-amber-950/20 dark:border-amber-700/60 shadow-sm'
                    : 'border-stone-200/80 dark:border-stone-800 bg-white dark:bg-stone-900 hover:border-stone-300 dark:hover:border-stone-700'
                  }`}
              >
                <div>
                  {/* Category & Alert Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {event.category || 'Ibadah'}
                    </span>
                    {event.is_alert && (
                      <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-400 flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Penting
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 mb-2.5 sm:mb-3 leading-snug">
                    {event.title}
                  </h3>

                  {/* Meta details */}
                  <div className="space-y-2 text-xs text-stone-600 dark:text-stone-400">
                    {/* Time */}
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                      <span className="font-medium text-stone-700 dark:text-stone-300">
                        {formatEventTime(event.start_time, event.end_time)}
                      </span>
                    </div>

                    {/* Speaker */}
                    {event.speaker && (
                      <div className="flex items-center gap-2">
                        <User className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                        <span>{event.speaker}</span>
                      </div>
                    )}

                    {/* Location */}
                    {event.location && (
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <span>{event.location}</span>
                          {event.google_maps_url && (
                            <a
                              href={event.google_maps_url}
                              target="_blank"
                              rel="noreferrer"
                              className="ml-1.5 text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-0.5"
                            >
                              <span>Peta</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Notes */}
                    {event.notes && (
                      <div className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed mt-2">
                        {event.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Calendar Action Button */}
                <div className="mt-4 sm:mt-5 pt-3 border-t border-stone-100 dark:border-stone-800">
                  <a
                    href={getGoogleCalendarURL(event)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full min-h-[44px] flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700/80 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors active:scale-98"
                  >
                    <CalendarPlus className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Add to Google Calendar</span>
                  </a>
                </div>

              </div>
            ))}

            {events.length === 0 && !isLoading && (
              <div className="col-span-full py-12 text-center text-stone-400 text-sm">
                Belum ada jadwal kegiatan terdekat saat ini.
              </div>
            )}
          </div>
        </section>

        {/* SECTION: BANNER AJAKAN MEMBACA ALKITAB */}
        <section className="rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-amber-600 to-amber-700 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-xl relative z-10 space-y-3 sm:space-y-4">
            <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm">
              Alkitab Digital Terintegrasi
            </span>
            <h2 className="font-serif text-2xl xs:text-3xl sm:text-4xl font-bold leading-tight">
              Selami Firman Tuhan dengan Nyaman & Tenang
            </h2>
            <p className="text-xs sm:text-base text-amber-100 leading-relaxed">
              Tersedia 66 kitab lengkap, multi-terjemahan (TB, BIMK, KJV), fitur sorotan ayat berwarna, dan pencarian cepat tanpa gangguan iklan.
            </p>
            <div className="pt-2">
              <Link
                to="/read"
                className="w-full xs:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-3 rounded-xl bg-white hover:bg-amber-50 text-amber-900 font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 text-center"
              >
                <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Mulai Membaca Alkitab Sekarang</span>
              </Link>
            </div>
          </div>
          {/* Subtle background graphic */}
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <BookOpen className="w-60 sm:w-72 h-60 sm:h-72 text-white" />
          </div>
        </section>

      </main>

      {/* 5. FOOTER */}
      <footer className="mt-auto border-t border-stone-200 dark:border-stone-800 py-6 sm:py-8 px-4 sm:px-6 bg-white dark:bg-stone-900 transition-colors">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 dark:text-stone-400 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <img
              src="/favicon.svg"
              alt="Logo Katharos"
              className="w-5 h-5 object-contain shrink-0"
            />
            <span className="font-serif font-bold text-stone-800 dark:text-stone-200">Katharos</span>
            <span>— Persekutuan Mahasiswa Kristen</span>
          </div>
          <div className="flex items-center flex-wrap justify-center gap-4 py-1">
            <Link to="/read" className="hover:text-amber-600 transition-colors py-1">
              Alkitab Online
            </Link>
            <a href="#renungan" className="hover:text-amber-600 transition-colors py-1">
              Renungan Harian
            </a>
            <a href="#agenda" className="hover:text-amber-600 transition-colors py-1">
              Jadwal Kegiatan
            </a>
          </div>
          <div>© {new Date().getFullYear()} Katharos. Soli Deo Gloria.</div>
        </div>
      </footer>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-stone-900/90 text-stone-100 dark:bg-stone-100/95 dark:text-stone-900 text-xs font-semibold shadow-lg backdrop-blur-sm border border-stone-800/20">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

    </div>
  );
}
