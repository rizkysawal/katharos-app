const API_BASE = '/api';

/**
 * Handle API responses with proper error extraction
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMsg = `HTTP Error ${response.status}`;
    try {
      const errData = await response.json();
      if (errData && errData.error) {
        errorMsg = errData.error;
      }
    } catch {
      // ignore json parse error
    }
    throw new Error(errorMsg);
  }
  const result = await response.json();
  return result.data !== undefined ? result.data : result;
}

export async function fetchTranslations() {
  try {
    const res = await fetch(`${API_BASE}/v1/translations`);
    return await handleResponse(res);
  } catch (err) {
    console.warn('[Katharos API] Using fallback translations:', err.message);
    return [
      { id: 1, code: 'TB', name: 'Terjemahan Baru (LAI)', language: 'id' },
      { id: 2, code: 'BIMK', name: 'Bahasa Indonesia Masa Kini', language: 'id' },
      { id: 3, code: 'KJV', name: 'King James Version', language: 'en' },
    ];
  }
}

export async function fetchBooks(translation = 'TB') {
  try {
    const res = await fetch(`${API_BASE}/v1/books?translation=${encodeURIComponent(translation)}`);
    return await handleResponse(res);
  } catch (err) {
    console.warn('[Katharos API] Using fallback books list:', err.message);
    return [
      { id: 1, code: 'GEN', name: 'Kejadian', abbreviation: 'Kej', testament: 'OT', total_chapters: 50, order_num: 1 },
      { id: 2, code: 'EXO', name: 'Keluaran', abbreviation: 'Kel', testament: 'OT', total_chapters: 40, order_num: 2 },
      { id: 40, code: 'MAT', name: 'Matius', abbreviation: 'Mat', testament: 'NT', total_chapters: 28, order_num: 40 },
      { id: 43, code: 'JHN', name: 'Yohanes', abbreviation: 'Yoh', testament: 'NT', total_chapters: 21, order_num: 43 },
      { id: 66, code: 'REV', name: 'Wahyu', abbreviation: 'Why', testament: 'NT', total_chapters: 22, order_num: 66 },
    ];
  }
}

export async function fetchChapter(book = 'GEN', chapter = 1, translation = 'TB') {
  try {
    const res = await fetch(
      `${API_BASE}/v1/read?book=${encodeURIComponent(book)}&chapter=${encodeURIComponent(chapter)}&translation=${encodeURIComponent(translation)}`
    );
    return await handleResponse(res);
  } catch (err) {
    console.warn('[Katharos API] Using fallback chapter data:', err.message);
    return {
      translation: { id: 1, code: translation, name: 'Terjemahan Baru (LAI)', language: 'id' },
      book: { id: 1, code: book, name: book === 'GEN' ? 'Kejadian' : 'Yohanes', abbreviation: book === 'GEN' ? 'Kej' : 'Yoh', testament: 'OT', total_chapters: 50, order_num: 1 },
      chapter: Number(chapter),
      verses: [
        { id: 1, verse_number: 1, text: 'Pada mulanya Allah menciptakan langit dan bumi.' },
        { id: 2, verse_number: 2, text: 'Bumi belum berbentuk dan kosong; gelap gulita menutupi samudera raya, dan Roh Allah melayang-layang di atas permukaan air.' },
        { id: 3, verse_number: 3, text: 'Berfirmanlah Allah: "Jadilah terang." Lalu terang itu jadi.' },
        { id: 4, verse_number: 4, text: 'Allah melihat bahwa terang itu baik, lalu dipisahkan-Nyalah terang itu dari gelap.' },
        { id: 5, verse_number: 5, text: 'Dan Allah menamai terang itu siang, dan gelap itu malam. Jadilah petang dan jadilah pagi, itulah hari pertama.' }
      ],
      navigation: {
        prev: null,
        next: { book_code: book, book_name: 'Kejadian', chapter_number: 2 }
      }
    };
  }
}

export async function searchVerses(query, translation = 'TB', page = 1, limit = 20) {
  try {
    const res = await fetch(
      `${API_BASE}/v1/search?q=${encodeURIComponent(query)}&translation=${encodeURIComponent(translation)}&page=${page}&limit=${limit}`
    );
    return await handleResponse(res);
  } catch (err) {
    console.warn('[Katharos API] Search failed:', err.message);
    return { query, translation, total: 0, page, limit, total_pages: 0, items: [] };
  }
}

export async function checkHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await handleResponse(res);
  } catch (err) {
    return { status: 'disconnected', database: 'unreachable', error: err.message };
  }
}

export async function fetchTodayDevotional() {
  try {
    const res = await fetch(`${API_BASE}/v1/devotionals/today`);
    return await handleResponse(res);
  } catch (err) {
    console.warn('[Katharos API] Using fallback today devotional:', err.message);
    return {
      id: 1,
      publish_date: new Date().toISOString().split('T')[0],
      title: 'Tinggal di dalam Pokok Anggur yang Benar',
      author: 'Tim Pembina PMK Katharos',
      passage_ref: 'Yohanes 15:4-5',
      passage_text: 'Tinggallah di dalam Aku dan Aku di dalam kamu. Sama seperti ranting tidak dapat berbuah dari dirinya sendiri, jikalau ia tidak tinggal pada pokok anggur, demikian juga kamu tidak berbuah, jikalau kamu tidak tinggal di dalam Aku.',
      content: `Dalam dinamika kehidupan kampus dan kesibukan sehari-hari, seringkali kita terjebak dalam ilusi bahwa keberhasilan dan damai sejahtera dapat kita raih semata-mata dengan kekuatan kita sendiri. Kita bekerja keras menyelesaikan tugas, aktif berorganisasi, dan mengejar target akademis, hingga terkadang waktu bersekutu dengan Tuhan terpinggirkan.

Namun Yesus mengingatkan kita dengan analogi yang sangat jelas: ranting yang terlepas dari pokoknya tidak akan mampu menghasilkan buah apa pun. Segala keindahan daunnya akan layu, dan kekuatannya akan sirna. Tinggal di dalam Kristus bukan sekadar menghadiri ibadah mingguan, melainkan membangun hubungan yang intim dan hidup setiap hari melalui doa, membaca firman, dan menundukkan kehendak kita pada kehendak-Nya.

Ketika kita melekat pada pokok anggur yang sejati, aliran kasih, hikmat, dan damai Kristus akan mengalir dalam setiap pikiran dan tindakan kita. Di tengah ujian dan tekanan apa pun, kita akan dimampukan berbuah lebat—buah kasih, sukacita, dan ketabahan yang memberkati orang-orang di sekitar kita.`,
      prayer: 'Tuhan Yesus yang baik, terima kasih karena Engkau telah memilih dan memanggil kami untuk menjadi bagian dari ranting-ranting-Mu. Ampuni kami jika seringkali kami merasa mampu berjalan sendiri dan menjauh dari hadirat-Mu. Ajar kami untuk senantiasa tinggal di dalam-Mu setiap hari, mempercayakan setiap pergumulan studi, masa depan, dan keluarga ke dalam tangan-Mu. Amin.'
    };
  }
}

export async function fetchDevotionalsArchive(month, year) {
  try {
    const q = new URLSearchParams();
    if (month) q.set('month', month);
    if (year) q.set('year', year);
    const res = await fetch(`${API_BASE}/v1/devotionals?${q.toString()}`);
    return await handleResponse(res);
  } catch (err) {
    console.warn('[Katharos API] Archive fetch error:', err.message);
    return [];
  }
}

export async function fetchUpcomingEvents() {
  try {
    const res = await fetch(`${API_BASE}/v1/events/upcoming`);
    return await handleResponse(res);
  } catch (err) {
    console.warn('[Katharos API] Using fallback events:', err.message);
    const now = new Date();
    const event1Date = new Date(now.getTime() + 4 * 86400000);
    event1Date.setHours(17, 0, 0, 0);
    const event2Date = new Date(now.getTime() + 7 * 86400000);
    event2Date.setHours(18, 0, 0, 0);
    const event3Date = new Date(now.getTime() + 11 * 86400000);
    event3Date.setHours(15, 30, 0, 0);

    return [
      {
        id: 1,
        title: 'Ibadah Raya PMK: Faith in the Storm',
        category: 'Ibadah Jumat',
        start_time: event1Date.toISOString(),
        end_time: new Date(event1Date.getTime() + 2.5 * 3600000).toISOString(),
        location: 'Gedung Serbaguna Lt. 3 (Ruang Utama)',
        google_maps_url: 'https://maps.google.com/?q=Gedung+Serbaguna',
        speaker: 'Pdt. Samuel Hartanto, M.Th',
        notes: 'PEMBERITAHUAN: Lokasi dipindahkan ke Gedung Serbaguna Lt. 3 karena ruang Audiovisual sedang dalam pemeliharaan AC. Harap hadir 15 menit lebih awal untuk registrasi dan doa bersama.',
        is_alert: true
      },
      {
        id: 2,
        title: 'Persekutuan Doa & Puasa Bersama',
        category: 'Persekutuan Doa',
        start_time: event2Date.toISOString(),
        end_time: new Date(event2Date.getTime() + 1.5 * 3600000).toISOString(),
        location: 'Ruang Doa Kampus & Hybrid Zoom',
        google_maps_url: 'https://maps.google.com/?q=Ruang+Doa+Kampus',
        speaker: 'Divisi Doa & Konseling PMK',
        notes: 'Membawa pokok doa pergumulan mahasiswa, persiapan regenerasi pengurus, serta keluarga dan bangsa.',
        is_alert: false
      },
      {
        id: 3,
        title: 'Bible Study & Fellowship Kelompok Kecil',
        category: 'Kelompok Kecil',
        start_time: event3Date.toISOString(),
        end_time: new Date(event3Date.getTime() + 2 * 3600000).toISOString(),
        location: 'Gazebo Taman Barat & Kantin Mahasiswa',
        google_maps_url: 'https://maps.google.com/?q=Gazebo+Taman+Kampus',
        speaker: 'Fasilitator KK Katharos',
        notes: 'Tema: "Iman Tanpa Perbuatan Adalah Mati" (Studi Kitab Yakobus 2). Jangan lupa membawa Alkitab fisik atau aplikasi Katharos!',
        is_alert: false
      }
    ];
  }
}
