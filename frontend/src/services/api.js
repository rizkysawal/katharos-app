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
