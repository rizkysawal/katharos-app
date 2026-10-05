/**
 * Bible Reference Parser & Book Mapping Utility
 * Translates Indonesian & English Bible references into book codes, chapters, and verses.
 * E.g., "Yohanes 14:1–6" -> { bookCode: "JHN", chapter: 14, verse: 1, url: "/read?book=JHN&chapter=14&verse=1" }
 */

export const BIBLE_BOOKS = [
  // Old Testament
  { code: 'GEN', name: 'Kejadian', aliases: ['kejadian', 'kej', 'genesis', 'gen'] },
  { code: 'EXO', name: 'Keluaran', aliases: ['keluaran', 'kel', 'exodus', 'exo', 'ex'] },
  { code: 'LEV', name: 'Imamat', aliases: ['imamat', 'im', 'leviticus', 'lev'] },
  { code: 'NUM', name: 'Bilangan', aliases: ['bilangan', 'bil', 'numbers', 'num'] },
  { code: 'DEU', name: 'Ulangan', aliases: ['ulangan', 'ul', 'deuteronomy', 'deut', 'deu'] },
  { code: 'JOS', name: 'Yosua', aliases: ['yosua', 'yos', 'joshua', 'josh', 'jos'] },
  { code: 'JDG', name: 'Hakim-hakim', aliases: ['hakim-hakim', 'hakim - hakim', 'hakim', 'hak', 'judges', 'jdg'] },
  { code: 'RUT', name: 'Rut', aliases: ['rut', 'ruth', 'rt'] },
  { code: '1SA', name: '1 Samuel', aliases: ['1 samuel', '1samuel', '1sam', '1 sam', '1sa'] },
  { code: '2SA', name: '2 Samuel', aliases: ['2 samuel', '2samuel', '2sam', '2 sam', '2sa'] },
  { code: '1KI', name: '1 Raja-raja', aliases: ['1 raja-raja', '1 raja - raja', '1 raja', '1raj', '1 raj', '1 kings', '1ki'] },
  { code: '2KI', name: '2 Raja-raja', aliases: ['2 raja-raja', '2 raja - raja', '2 raja', '2raj', '2 raj', '2 kings', '2ki'] },
  { code: '1CH', name: '1 Tawarikh', aliases: ['1 tawarikh', '1tawarikh', '1taw', '1 taw', '1 chronicles', '1ch'] },
  { code: '2CH', name: '2 Tawarikh', aliases: ['2 tawarikh', '2tawarikh', '2taw', '2 taw', '2 chronicles', '2ch'] },
  { code: 'EZR', name: 'Ezra', aliases: ['ezra', 'ezr'] },
  { code: 'NEH', name: 'Nehemia', aliases: ['nehemia', 'neh', 'nehemiah'] },
  { code: 'EST', name: 'Ester', aliases: ['ester', 'est', 'esther'] },
  { code: 'JOB', name: 'Ayub', aliases: ['ayub', 'ayb', 'job'] },
  { code: 'PSA', name: 'Mazmur', aliases: ['mazmur', 'mzm', 'psalms', 'psalm', 'psa', 'ps'] },
  { code: 'PRO', name: 'Amsal', aliases: ['amsal', 'ams', 'proverbs', 'prov', 'pro'] },
  { code: 'ECC', name: 'Pengkhotbah', aliases: ['pengkhotbah', 'pkh', 'ecclesiastes', 'eccl', 'ecc'] },
  { code: 'SNG', name: 'Kidung Agung', aliases: ['kidung agung', 'kidung', 'kid', 'song of solomon', 'song of songs', 'sng'] },
  { code: 'ISA', name: 'Yesaya', aliases: ['yesaya', 'yes', 'isaiah', 'isa'] },
  { code: 'JER', name: 'Yeremia', aliases: ['yeremia', 'yer', 'jeremiah', 'jer'] },
  { code: 'LAM', name: 'Ratapan', aliases: ['ratapan', 'rat', 'lamentations', 'lam'] },
  { code: 'EZK', name: 'Yehezkiel', aliases: ['yehezkiel', 'yeh', 'ezekiel', 'ezk'] },
  { code: 'DAN', name: 'Daniel', aliases: ['daniel', 'dan'] },
  { code: 'HOS', name: 'Hosea', aliases: ['hosea', 'hos'] },
  { code: 'JOL', name: 'Yoel', aliases: ['yoel', 'yl', 'joel', 'jol'] },
  { code: 'AMO', name: 'Amos', aliases: ['amos', 'am', 'amo'] },
  { code: 'OBA', name: 'Obaja', aliases: ['obaja', 'ob', 'obadiah', 'oba'] },
  { code: 'JON', name: 'Yunus', aliases: ['yunus', 'yun', 'jonah', 'jon'] },
  { code: 'MIC', name: 'Mikha', aliases: ['mikha', 'mik', 'micah', 'mic'] },
  { code: 'NAM', name: 'Nahum', aliases: ['nahum', 'nah', 'nam'] },
  { code: 'HAB', name: 'Habakuk', aliases: ['habakuk', 'hab', 'habakkuk'] },
  { code: 'ZEP', name: 'Zefanya', aliases: ['zefanya', 'zef', 'zephaniah', 'zep'] },
  { code: 'HAG', name: 'Hagai', aliases: ['hagai', 'hag', 'haggai'] },
  { code: 'ZEC', name: 'Zakharia', aliases: ['zakharia', 'za', 'zakh', 'zechariah', 'zec'] },
  { code: 'MAL', name: 'Maleakhi', aliases: ['maleakhi', 'mal', 'malachi'] },

  // New Testament
  { code: 'MAT', name: 'Matius', aliases: ['matius', 'mat', 'matthew', 'mt'] },
  { code: 'MRK', name: 'Markus', aliases: ['markus', 'mrk', 'mark', 'mk'] },
  { code: 'LUK', name: 'Lukas', aliases: ['lukas', 'luk', 'luke', 'lk'] },
  { code: 'JHN', name: 'Yohanes', aliases: ['yohanes', 'yoh', 'john', 'jhn', 'jn'] },
  { code: 'ACT', name: 'Kisah Para Rasul', aliases: ['kisah para rasul', 'kisah rasul', 'kisah', 'kis', 'kpr', 'acts', 'act'] },
  { code: 'ROM', name: 'Roma', aliases: ['roma', 'rm', 'romans', 'rom'] },
  { code: '1CO', name: '1 Korintus', aliases: ['1 korintus', '1korintus', '1kor', '1 kor', '1 corinthians', '1co'] },
  { code: '2CO', name: '2 Korintus', aliases: ['2 korintus', '2korintus', '2kor', '2 kor', '2 corinthians', '2co'] },
  { code: 'GAL', name: 'Galatia', aliases: ['galatia', 'gal', 'galatians'] },
  { code: 'EPH', name: 'Efesus', aliases: ['efesus', 'ef', 'ephesians', 'eph'] },
  { code: 'PHP', name: 'Filipi', aliases: ['filipi', 'flp', 'philippians', 'php'] },
  { code: 'COL', name: 'Kolose', aliases: ['kolose', 'kol', 'colossians', 'col'] },
  { code: '1TH', name: '1 Tesalonika', aliases: ['1 tesalonika', '1tesalonika', '1tes', '1 tes', '1 thessalonians', '1th'] },
  { code: '2TH', name: '2 Tesalonika', aliases: ['2 tesalonika', '2tesalonika', '2tes', '2 tes', '2 thessalonians', '2th'] },
  { code: '1TI', name: '1 Timotius', aliases: ['1 timotius', '1timotius', '1tim', '1 tim', '1 timothy', '1ti'] },
  { code: '2TI', name: '2 Timotius', aliases: ['2 timotius', '2timotius', '2tim', '2 tim', '2 timothy', '2ti'] },
  { code: 'TIT', name: 'Titus', aliases: ['titus', 'tit'] },
  { code: 'PHM', name: 'Filemon', aliases: ['filemon', 'flm', 'philemon', 'phm'] },
  { code: 'HEB', name: 'Ibrani', aliases: ['ibrani', 'ibr', 'hebrews', 'heb'] },
  { code: 'JAS', name: 'Yakobus', aliases: ['yakobus', 'yak', 'james', 'jas'] },
  { code: '1PE', name: '1 Petrus', aliases: ['1 petrus', '1petrus', '1ptr', '1 ptr', '1pet', '1 peter', '1pe'] },
  { code: '2PE', name: '2 Petrus', aliases: ['2 petrus', '2petrus', '2ptr', '2 ptr', '2pet', '2 peter', '2pe'] },
  { code: '1JN', name: '1 Yohanes', aliases: ['1 yohanes', '1yohanes', '1yoh', '1 yoh', '1 john', '1jn'] },
  { code: '2JN', name: '2 Yohanes', aliases: ['2 yohanes', '2yohanes', '2yoh', '2 yoh', '2 john', '2jn'] },
  { code: '3JN', name: '3 Yohanes', aliases: ['3 yohanes', '3yohanes', '3yoh', '3 yoh', '3 john', '3jn'] },
  { code: 'JUD', name: 'Yudas', aliases: ['yudas', 'yud', 'jude', 'jud'] },
  { code: 'REV', name: 'Wahyu', aliases: ['wahyu', 'why', 'revelation', 'rev'] },
];

// Quick lookup map: alias -> book info
const ALIAS_MAP = new Map();
BIBLE_BOOKS.forEach((book) => {
  ALIAS_MAP.set(book.code.toLowerCase(), book);
  ALIAS_MAP.set(book.name.toLowerCase(), book);
  book.aliases.forEach((alias) => {
    ALIAS_MAP.set(alias.toLowerCase(), book);
  });
});

/**
 * Finds book info by raw name/code string
 */
export function findBookInfo(rawName) {
  if (!rawName) return null;
  const clean = rawName.trim().toLowerCase().replace(/\s+/g, ' ');
  return ALIAS_MAP.get(clean) || null;
}

/**
 * Parses passage reference strings into { bookCode, bookName, chapter, verse, url }
 * Handles formats like:
 * - "Yohanes 14:1–6"
 * - "Mazmur 90:1-2"
 * - "Galatia 6 : 2"
 * - "1 Korintus 13: 4-7"
 * - "Roma 12:10 TB"
 * - "Matius 11:28-30"
 * - "Amsal 3:5-6"
 * - "Kisah Para Rasul 2:42-47"
 */
export function parsePassageRef(refStr) {
  if (!refStr || typeof refStr !== 'string') {
    return {
      isValid: false,
      bookCode: 'GEN',
      bookName: 'Kejadian',
      chapter: 1,
      verse: 1,
      url: '/read',
    };
  }

  // 1. Strip trailing translation codes e.g. " TB", " BIMK", " KJV", " NIV"
  let cleaned = refStr.replace(/\s+(TB|BIMK|KJV|NIV|ESV)\s*$/i, '').trim();

  // 2. Normalize dashes (en-dash, em-dash to regular hyphen)
  cleaned = cleaned.replace(/[\u2013\u2014]/g, '-');

  // 3. Regex match: [Book Part] [Chapter] : [Verse or Verse range]
  // Allows optional numbers before name (e.g. "1 Korintus", "2 Raja-raja")
  const regex = /^([1-3]?\s?[A-Za-z\s\-]+?)\s+(\d+)(?:\s*[:.]\s*(\d+))?/;
  const match = cleaned.match(regex);

  if (!match) {
    // Fallback: try to see if just book name was given
    const bookInfo = findBookInfo(cleaned);
    if (bookInfo) {
      return {
        isValid: true,
        bookCode: bookInfo.code,
        bookName: bookInfo.name,
        chapter: 1,
        verse: 1,
        url: `/read?book=${bookInfo.code}&chapter=1&verse=1`,
      };
    }
    return {
      isValid: false,
      bookCode: 'GEN',
      bookName: 'Kejadian',
      chapter: 1,
      verse: 1,
      url: '/read',
    };
  }

  const rawBook = match[1].trim();
  const chapter = parseInt(match[2], 10) || 1;
  const verse = match[3] ? parseInt(match[3], 10) : 1;

  const bookInfo = findBookInfo(rawBook);
  const bookCode = bookInfo ? bookInfo.code : 'GEN';
  const bookName = bookInfo ? bookInfo.name : rawBook;

  return {
    isValid: !!bookInfo,
    bookCode,
    bookName,
    chapter,
    verse,
    url: `/read?book=${bookCode}&chapter=${chapter}&verse=${verse}`,
  };
}
