-- 02_seed_data.sql
-- Seed Translations, Books, Chapters, and sample Verses (Kejadian 1-2 & Yohanes 1)

-- 1. Translations
INSERT INTO translations (code, name, language) VALUES
    ('TB', 'Terjemahan Baru (LAI)', 'id'),
    ('BIMK', 'Bahasa Indonesia Masa Kini', 'id'),
    ('KJV', 'King James Version', 'en')
ON CONFLICT (code) DO UPDATE 
SET name = EXCLUDED.name, language = EXCLUDED.language;

-- Helper to seed canonical books for TB
DO $$
DECLARE
    tb_id INT;
    bimk_id INT;
    kjv_id INT;
BEGIN
    SELECT id INTO tb_id FROM translations WHERE code = 'TB';
    SELECT id INTO bimk_id FROM translations WHERE code = 'BIMK';
    SELECT id INTO kjv_id FROM translations WHERE code = 'KJV';

    -- Insert all 66 books for TB
    INSERT INTO books (translation_id, order_num, code, name, abbreviation, testament, total_chapters) VALUES
    (tb_id, 1, 'GEN', 'Kejadian', 'Kej', 'OT', 50),
    (tb_id, 2, 'EXO', 'Keluaran', 'Kel', 'OT', 40),
    (tb_id, 3, 'LEV', 'Imamat', 'Im', 'OT', 27),
    (tb_id, 4, 'NUM', 'Bilangan', 'Bil', 'OT', 36),
    (tb_id, 5, 'DEU', 'Ulangan', 'Ul', 'OT', 34),
    (tb_id, 6, 'JOS', 'Yosua', 'Yos', 'OT', 24),
    (tb_id, 7, 'JDG', 'Hakim-hakim', 'Hak', 'OT', 21),
    (tb_id, 8, 'RUT', 'Rut', 'Rut', 'OT', 4),
    (tb_id, 9, '1SA', '1 Samuel', '1Sam', 'OT', 31),
    (tb_id, 10, '2SA', '2 Samuel', '2Sam', 'OT', 24),
    (tb_id, 11, '1KI', '1 Raja-raja', '1Raj', 'OT', 22),
    (tb_id, 12, '2KI', '2 Raja-raja', '2Raj', 'OT', 25),
    (tb_id, 13, '1CH', '1 Tawarikh', '1Taw', 'OT', 29),
    (tb_id, 14, '2CH', '2 Tawarikh', '2Taw', 'OT', 36),
    (tb_id, 15, 'EZR', 'Ezra', 'Ezr', 'OT', 10),
    (tb_id, 16, 'NEH', 'Nehemia', 'Neh', 'OT', 13),
    (tb_id, 17, 'EST', 'Ester', 'Est', 'OT', 10),
    (tb_id, 18, 'JOB', 'Ayub', 'Ayb', 'OT', 42),
    (tb_id, 19, 'PSA', 'Mazmur', 'Mzm', 'OT', 150),
    (tb_id, 20, 'PRO', 'Amsal', 'Ams', 'OT', 31),
    (tb_id, 21, 'ECC', 'Pengkhotbah', 'Pkh', 'OT', 12),
    (tb_id, 22, 'SNG', 'Kidung Agung', 'Kid', 'OT', 8),
    (tb_id, 23, 'ISA', 'Yesaya', 'Yes', 'OT', 66),
    (tb_id, 24, 'JER', 'Yeremia', 'Yer', 'OT', 52),
    (tb_id, 25, 'LAM', 'Ratapan', 'Rat', 'OT', 5),
    (tb_id, 26, 'EZK', 'Yehezkiel', 'Yeh', 'OT', 48),
    (tb_id, 27, 'DAN', 'Daniel', 'Dan', 'OT', 12),
    (tb_id, 28, 'HOS', 'Hosea', 'Hos', 'OT', 14),
    (tb_id, 29, 'JOL', 'Yoel', 'Yl', 'OT', 3),
    (tb_id, 30, 'AMO', 'Amos', 'Am', 'OT', 9),
    (tb_id, 31, 'OBA', 'Obaja', 'Ob', 'OT', 1),
    (tb_id, 32, 'JON', 'Yunus', 'Yun', 'OT', 4),
    (tb_id, 33, 'MIC', 'Mikha', 'Mik', 'OT', 7),
    (tb_id, 34, 'NAM', 'Nahum', 'Nah', 'OT', 3),
    (tb_id, 35, 'HAB', 'Habakuk', 'Hab', 'OT', 3),
    (tb_id, 36, 'ZEP', 'Zefanya', 'Zef', 'OT', 3),
    (tb_id, 37, 'HAG', 'Hagai', 'Hag', 'OT', 2),
    (tb_id, 38, 'ZEC', 'Zakharia', 'Za', 'OT', 14),
    (tb_id, 39, 'MAL', 'Maleakhi', 'Mal', 'OT', 4),
    (tb_id, 40, 'MAT', 'Matius', 'Mat', 'NT', 28),
    (tb_id, 41, 'MRK', 'Markus', 'Mrk', 'NT', 16),
    (tb_id, 42, 'LUK', 'Lukas', 'Luk', 'NT', 24),
    (tb_id, 43, 'JHN', 'Yohanes', 'Yoh', 'NT', 21),
    (tb_id, 44, 'ACT', 'Kisah Para Rasul', 'Kis', 'NT', 28),
    (tb_id, 45, 'ROM', 'Roma', 'Rm', 'NT', 16),
    (tb_id, 46, '1CO', '1 Korintus', '1Kor', 'NT', 16),
    (tb_id, 47, '2CO', '2 Korintus', '2Kor', 'NT', 13),
    (tb_id, 48, 'GAL', 'Galatia', 'Gal', 'NT', 6),
    (tb_id, 49, 'EPH', 'Efesus', 'Ef', 'NT', 6),
    (tb_id, 50, 'PHP', 'Filipi', 'Flp', 'NT', 4),
    (tb_id, 51, 'COL', 'Kolose', 'Kol', 'NT', 4),
    (tb_id, 52, '1TH', '1 Tesalonika', '1Tes', 'NT', 5),
    (tb_id, 53, '2TH', '2 Tesalonika', '2Tes', 'NT', 3),
    (tb_id, 54, '1TI', '1 Timotius', '1Tim', 'NT', 6),
    (tb_id, 55, '2TI', '2 Timotius', '2Tim', 'NT', 4),
    (tb_id, 56, 'TIT', 'Titus', 'Tit', 'NT', 3),
    (tb_id, 57, 'PHM', 'Filemon', 'Flm', 'NT', 1),
    (tb_id, 58, 'HEB', 'Ibrani', 'Ibr', 'NT', 13),
    (tb_id, 59, 'JAS', 'Yakobus', 'Yak', 'NT', 5),
    (tb_id, 60, '1PE', '1 Petrus', '1Ptr', 'NT', 5),
    (tb_id, 61, '2PE', '2 Petrus', '2Ptr', 'NT', 3),
    (tb_id, 62, '1JN', '1 Yohanes', '1Yoh', 'NT', 5),
    (tb_id, 63, '2JN', '2 Yohanes', '2Yoh', 'NT', 1),
    (tb_id, 64, '3JN', '3 Yohanes', '3Yoh', 'NT', 1),
    (tb_id, 65, 'JUD', 'Yudas', 'Yud', 'NT', 1),
    (tb_id, 66, 'REV', 'Wahyu', 'Why', 'NT', 22)
    ON CONFLICT (translation_id, code) DO NOTHING;

    -- Also clone books for BIMK
    INSERT INTO books (translation_id, order_num, code, name, abbreviation, testament, total_chapters)
    SELECT bimk_id, order_num, code, name, abbreviation, testament, total_chapters
    FROM books WHERE translation_id = tb_id
    ON CONFLICT (translation_id, code) DO NOTHING;

    -- Also clone books for KJV with English names
    INSERT INTO books (translation_id, order_num, code, name, abbreviation, testament, total_chapters) VALUES
    (kjv_id, 1, 'GEN', 'Genesis', 'Gen', 'OT', 50),
    (kjv_id, 43, 'JHN', 'John', 'Jn', 'NT', 21)
    ON CONFLICT (translation_id, code) DO NOTHING;

END $$;

-- 2. Chapters (Kejadian 1 & 2, Yohanes 1)
DO $$
DECLARE
    tb_id INT;
    kjv_id INT;
    gen_tb INT;
    jhn_tb INT;
    gen_kjv INT;
    jhn_kjv INT;
    ch_gen1_tb INT;
    ch_gen2_tb INT;
    ch_jhn1_tb INT;
    ch_gen1_kjv INT;
    ch_jhn1_kjv INT;
BEGIN
    SELECT id INTO tb_id FROM translations WHERE code = 'TB';
    SELECT id INTO kjv_id FROM translations WHERE code = 'KJV';

    SELECT id INTO gen_tb FROM books WHERE translation_id = tb_id AND code = 'GEN';
    SELECT id INTO jhn_tb FROM books WHERE translation_id = tb_id AND code = 'JHN';
    SELECT id INTO gen_kjv FROM books WHERE translation_id = kjv_id AND code = 'GEN';
    SELECT id INTO jhn_kjv FROM books WHERE translation_id = kjv_id AND code = 'JHN';

    -- Chapters for TB
    INSERT INTO chapters (book_id, chapter_number) VALUES
        (gen_tb, 1),
        (gen_tb, 2),
        (jhn_tb, 1)
    ON CONFLICT (book_id, chapter_number) DO NOTHING;

    -- Chapters for KJV
    INSERT INTO chapters (book_id, chapter_number) VALUES
        (gen_kjv, 1),
        (jhn_kjv, 1)
    ON CONFLICT (book_id, chapter_number) DO NOTHING;

    SELECT id INTO ch_gen1_tb FROM chapters WHERE book_id = gen_tb AND chapter_number = 1;
    SELECT id INTO ch_gen2_tb FROM chapters WHERE book_id = gen_tb AND chapter_number = 2;
    SELECT id INTO ch_jhn1_tb FROM chapters WHERE book_id = jhn_tb AND chapter_number = 1;

    SELECT id INTO ch_gen1_kjv FROM chapters WHERE book_id = gen_kjv AND chapter_number = 1;
    SELECT id INTO ch_jhn1_kjv FROM chapters WHERE book_id = jhn_kjv AND chapter_number = 1;

    -- 3. Verses for Kejadian 1 (TB)
    INSERT INTO verses (chapter_id, verse_number, text) VALUES
    (ch_gen1_tb, 1, 'Pada mulanya Allah menciptakan langit dan bumi.'),
    (ch_gen1_tb, 2, 'Bumi belum berbentuk dan kosong; gelap gulita menutupi samudera raya, dan Roh Allah melayang-layang di atas permukaan air.'),
    (ch_gen1_tb, 3, 'Berfirmanlah Allah: "Jadilah terang." Lalu terang itu jadi.'),
    (ch_gen1_tb, 4, 'Allah melihat bahwa terang itu baik, lalu dipisahkan-Nyalah terang itu dari gelap.'),
    (ch_gen1_tb, 5, 'Dan Allah menamai terang itu siang, dan gelap itu malam. Jadilah petang dan jadilah pagi, itulah hari pertama.'),
    (ch_gen1_tb, 6, 'Berfirmanlah Allah: "Jadilah cakrawala di tengah segala air untuk memisahkan air dari air."'),
    (ch_gen1_tb, 7, 'Maka Allah menjadikan cakrawala dan Ia memisahkan air yang ada di bawah cakrawala itu dari air yang ada di atasnya. Dan jadilah demikian.'),
    (ch_gen1_tb, 8, 'Lalu Allah menamai cakrawala itu langit. Jadilah petang dan jadilah pagi, itulah hari kedua.'),
    (ch_gen1_tb, 9, 'Berfirmanlah Allah: "Hendaklah segala air yang di bawah langit berkumpul pada satu tempat, sehingga kelihatan yang kering." Dan jadilah demikian.'),
    (ch_gen1_tb, 10, 'Lalu Allah menamai yang kering itu darat, dan kumpulan air itu dinamai-Nya laut. Allah melihat bahwa semuanya itu baik.'),
    (ch_gen1_tb, 11, 'Berfirmanlah Allah: "Hendaklah tanah menumbuhkan tunas-tunas muda, tumbuh-tumbuhan yang berbiji, segala jenis pohon buah-buahan yang menghasilkan buah yang berbiji, supaya ada di bumi." Dan jadilah demikian.'),
    (ch_gen1_tb, 12, 'Tanah itu mengeluarkan tunas-tunas muda, segala jenis tumbuh-tumbuhan yang berbiji dan segala jenis pohon-pohonan yang menghasilkan buah yang berbiji. Allah melihat bahwa semuanya itu baik.'),
    (ch_gen1_tb, 13, 'Jadilah petang dan jadilah pagi, itulah hari ketiga.'),
    (ch_gen1_tb, 14, 'Berfirmanlah Allah: "Jadilah benda-benda penerang pada cakrawala untuk memisahkan siang dari malam. Biarlah benda-benda penerang itu menjadi tanda yang menunjukkan masa-masa yang tetap dan hari-hari dan tahun-tahun,'),
    (ch_gen1_tb, 15, 'dan sebagai penerang pada cakrawala untuk menerangi bumi." Dan jadilah demikian.'),
    (ch_gen1_tb, 16, 'Maka Allah menjadikan kedua benda penerang yang besar itu, yakni yang lebih besar untuk menguasai siang dan yang lebih kecil untuk menguasai malam, dan menjadikan juga bintang-bintang.'),
    (ch_gen1_tb, 17, 'Allah menaruh semuanya itu di cakrawala untuk menerangi bumi,'),
    (ch_gen1_tb, 18, 'dan untuk menguasai siang dan malam, dan untuk memisahkan terang dari gelap. Allah melihat bahwa semuanya itu baik.'),
    (ch_gen1_tb, 19, 'Jadilah petang dan jadilah pagi, itulah hari keempat.'),
    (ch_gen1_tb, 20, 'Berfirmanlah Allah: "Hendaklah dalam air berkeriapan makhluk yang bernyawa, dan hendaklah burung beterbangan di atas bumi melintasi cakrawala."'),
    (ch_gen1_tb, 21, 'Maka Allah menciptakan binatang-binatang laut yang besar dan segala jenis makhluk hidup yang bergerak, yang berkeriapan dalam air, dan segala jenis burung yang bersayap. Allah melihat bahwa semuanya itu baik.'),
    (ch_gen1_tb, 22, 'Lalu Allah memberkati semuanya itu, firman-Nya: "Berkembangbiaklah dan bertambah banyaklah serta penuhilah air dalam laut, dan hendaklah burung bertambah banyak di bumi."'),
    (ch_gen1_tb, 23, 'Jadilah petang dan jadilah pagi, itulah hari kelima.'),
    (ch_gen1_tb, 24, 'Berfirmanlah Allah: "Hendaklah bumi mengeluarkan segala jenis makhluk yang hidup, ternak dan binatang melata dan segala jenis binatang liar." Dan jadilah demikian.'),
    (ch_gen1_tb, 25, 'Allah menjadikan segala jenis binatang liar dan segala jenis ternak dan segala jenis binatang melata di muka bumi. Allah melihat bahwa semuanya itu baik.'),
    (ch_gen1_tb, 26, 'Berfirmanlah Allah: "Baiklah Kita menjadikan manusia menurut gambar dan rupa Kita, supaya mereka berkuasa atas ikan-ikan di laut dan burung-burung di udara dan atas ternak dan atas seluruh bumi dan atas segala binatang melata yang merayap di bumi."'),
    (ch_gen1_tb, 27, 'Maka Allah menciptakan manusia itu menurut gambar-Nya, menurut gambar Allah diciptakan-Nya dia; laki-laki dan perempuan diciptakan-Nya mereka.'),
    (ch_gen1_tb, 28, 'Allah memberkati mereka, lalu Allah berfirman kepada mereka: "Beranakcuculah dan bertambah banyak; penuhilah bumi dan taklukkanlah itu, berkuasalah atas ikan-ikan di laut dan burung-burung di udara dan atas segala binatang yang merayap di bumi."'),
    (ch_gen1_tb, 29, 'Berfirmanlah Allah: "Lihatlah, Aku memberikan kepadamu segala tumbuh-tumbuhan yang berbiji di seluruh bumi dan segala pohon-pohonan yang buahnya berbiji; itulah akan menjadi makananmu.'),
    (ch_gen1_tb, 30, 'Tetapi kepada segala binatang di bumi dan segala burung di udara dan segala yang merayap di bumi, yang bernyawa, Kuberikan segala tumbuh-tumbuhan hijau menjadi makanannya." Dan jadilah demikian.'),
    (ch_gen1_tb, 31, 'Maka Allah melihat segala yang dijadikan-Nya itu, sungguh amat baik. Jadilah petang dan jadilah pagi, itulah hari keenam.')
    ON CONFLICT (chapter_id, verse_number) DO UPDATE SET text = EXCLUDED.text;

    -- Verses for Kejadian 2 (TB)
    INSERT INTO verses (chapter_id, verse_number, text) VALUES
    (ch_gen2_tb, 1, 'Demikianlah diselesaikan langit dan bumi dan segala isinya.'),
    (ch_gen2_tb, 2, 'Ketika Allah pada hari ketujuh telah menyelesaikan pekerjaan yang dibuat-Nya itu, berhentilah Ia pada hari ketujuh dari segala pekerjaan yang telah dibuat-Nya itu.'),
    (ch_gen2_tb, 3, 'Lalu Allah memberkati hari ketujuh itu dan menguduskannya, karena pada hari itulah Ia berhenti dari segala pekerjaan penciptaan yang telah dibuat-Nya itu.'),
    (ch_gen2_tb, 4, 'Demikianlah riwayat langit dan bumi pada waktu diciptakan.')
    ON CONFLICT (chapter_id, verse_number) DO UPDATE SET text = EXCLUDED.text;

    -- Verses for Yohanes 1 (TB)
    INSERT INTO verses (chapter_id, verse_number, text) VALUES
    (ch_jhn1_tb, 1, 'Pada mulanya adalah Firman; Firman itu bersama-sama dengan Allah dan Firman itu adalah Allah.'),
    (ch_jhn1_tb, 2, 'Ia pada mulanya bersama-sama dengan Allah.'),
    (ch_jhn1_tb, 3, 'Segala sesuatu dijadikan oleh Dia dan tanpa Dia tidak ada suatupun yang telah jadi dari segala yang telah dijadikan.'),
    (ch_jhn1_tb, 4, 'Dalam Dia ada hidup dan hidup itu adalah terang manusia.'),
    (ch_jhn1_tb, 5, 'Terang itu bercahaya di dalam kegelapan dan kegelapan itu tidak menguasainya.'),
    (ch_jhn1_tb, 6, 'Datanglah seorang yang diutus Allah, namanya Yohanes;'),
    (ch_jhn1_tb, 7, 'ia datang sebagai saksi untuk memberi kesaksian tentang terang itu, supaya oleh dia semua orang menjadi percaya.'),
    (ch_jhn1_tb, 8, 'Ia bukan terang itu, tetapi ia harus memberi kesaksian tentang terang itu.'),
    (ch_jhn1_tb, 9, 'Terang yang sesungguhnya, yang menerangi setiap orang, sedang datang ke dalam dunia.'),
    (ch_jhn1_tb, 10, 'Ia telah ada di dalam dunia dan dunia dijadikan oleh-Nya, tetapi dunia tidak mengenal-Nya.'),
    (ch_jhn1_tb, 11, 'Ia datang kepada milik kepunyaan-Nya, tetapi orang-orang kepunyaan-Nya itu tidak menerima-Nya.'),
    (ch_jhn1_tb, 12, 'Tetapi semua orang yang menerima-Nya diberi-Nya kuasa supaya menjadi anak-anak Allah, yaitu mereka yang percaya dalam nama-Nya;'),
    (ch_jhn1_tb, 13, 'orang-orang yang diperanakkan bukan dari darah atau dari keinginan jasmani, bukan pula oleh keinginan seorang laki-laki, melainkan dari Allah.'),
    (ch_jhn1_tb, 14, 'Firman itu telah menjadi manusia, dan diam di antara kita, dan kita telah melihat kemuliaan-Nya, yaitu kemuliaan yang diberikan kepada-Nya sebagai Anak Tunggal Bapa, penuh kasih karunia dan kebenaran.'),
    (ch_jhn1_tb, 15, 'Yohanes memberi kesaksian tentang Dia dan berseru, katanya: "Inilah Dia, yang kumaksudkan ketika aku berkata: Kemudian dari padaku akan datang Dia yang telah mendahului aku, sebab Dia telah ada sebelum aku."'),
    (ch_jhn1_tb, 16, 'Karena dari kelimpahan-Nya kita semua telah menerima kasih karunia demi kasih karunia;'),
    (ch_jhn1_tb, 17, 'sebab hukum Taurat diberikan oleh Musa, tetapi kasih karunia dan kebenaran datang oleh Yesus Kristus.'),
    (ch_jhn1_tb, 18, 'Tidak seorangpun yang pernah melihat Allah; tetapi Anak Tunggal Allah, yang ada di pangkuan Bapa, Dialah yang menyatakan-Nya.')
    ON CONFLICT (chapter_id, verse_number) DO UPDATE SET text = EXCLUDED.text;

    -- Verses for Genesis 1 (KJV)
    INSERT INTO verses (chapter_id, verse_number, text) VALUES
    (ch_gen1_kjv, 1, 'In the beginning God created the heaven and the earth.'),
    (ch_gen1_kjv, 2, 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.'),
    (ch_gen1_kjv, 3, 'And God said, Let there be light: and there was light.'),
    (ch_gen1_kjv, 4, 'And God saw the light, that it was good: and God divided the light from the darkness.'),
    (ch_gen1_kjv, 5, 'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.')
    ON CONFLICT (chapter_id, verse_number) DO UPDATE SET text = EXCLUDED.text;

    -- Verses for John 1 (KJV)
    INSERT INTO verses (chapter_id, verse_number, text) VALUES
    (ch_jhn1_kjv, 1, 'In the beginning was the Word, and the Word was with God, and the Word was God.'),
    (ch_jhn1_kjv, 2, 'The same was in the beginning with God.'),
    (ch_jhn1_kjv, 3, 'All things were made by him; and without him was not any thing made that was made.'),
    (ch_jhn1_kjv, 4, 'In him was life; and the life was the light of men.'),
    (ch_jhn1_kjv, 5, 'And the light shineth in darkness; and the darkness comprehended it not.')
    ON CONFLICT (chapter_id, verse_number) DO UPDATE SET text = EXCLUDED.text;

END $$;
