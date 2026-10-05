#!/usr/bin/env python3
"""
seed_october.py - Script parser untuk membaca naskah renungan dari file "BR OKTOBER 2026.xlsx",
mengekstrak gambar, ayat, judul, isi, quote, serta meng-generate doa penutup untuk disimpan ke PostgreSQL.
"""

import os
import sys
import json
import zipfile
import xml.etree.ElementTree as ET

EXCEL_FILE = os.path.join(os.path.dirname(__file__), "..", "..", "data", "BR OKTOBER 2026.xlsx")
SQL_OUTPUT = os.path.join(os.path.dirname(__file__), "..", "migrations", "05_october_2026_devotionals.sql")
IMAGE_OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "public", "devotionals")

PRAYERS = {
    1: "Tuhan Yesus, di tengah hiruk-pikuk kehidupan dan kegelisahan masa depan yang seringkali meresahkan hati kami, ajar kami untuk senantiasa percaya dan berlabuh kepada-Mu. Terima kasih karena Engkau telah menyediakan tempat perteduhan dan rumah sejati bagi jiwa kami. Pegang tangan kami saat kami ragu, dan penuhilah hati kami dengan damai sejahtera-Mu yang melampaui segala akal. Amin.",
    2: "Bapa di Surga, Engkaulah tempat perteduhan kami turun-temurun, sebelum gunung-gunung dilahirkan dan bumi diciptakan. Di tengah dunia yang fana dan serba berubah ini, kami bersyukur karena kasih setia dan perlindungan-Mu kekal adanya. Biarlah hidup kami selalu berakar dan tinggal diam di dalam naungan hadirat-Mu setiap hari. Amin.",
    3: "Tuhan Yesus yang baik, jadikanlah firman-Mu fondasi batu karang tempat kami membangun seluruh cita-cita, studi, dan langkah kehidupan kami. Ampuni kami bila seringkali tergoda membangun di atas pasir ilusi duniawi. Kuatkan kami untuk bukan hanya menjadi pendengar yang kagum, melainkan pelaku firman yang setia di setiap musim kehidupan. Amin.",
    4: "Tuhan, biarlah akar rohani kami menancap semakin dalam ke dalam kasih dan kebenaran-Mu. Di tengah derasnya arus dunia dan pengajaran yang membingungkan, jagalah agar iman kami tidak mudah goyah. Penuhilah hati kami dengan rasa syukur yang melimpah atas karya keselamatan-Mu dalam hidup kami. Amin.",
    5: "Bapa yang penuh kasih, terima kasih karena di dalam Kristus kami tidak lagi menjadi orang asing, melainkan kawan sewarga dan bagian dari keluarga Allah. Karuniakanlah kepada kami hati yang rela membuka diri, merangkul sesama saudara seiman, dan bersama-sama dibangun menjadi tempat kediaman Roh Kudus yang kudus dan rukun. Amin.",
    6: "Tuhan Yesus, terima kasih karena Engkau telah menerima kami apa adanya dengan segala kelemahan dan keterbatasan kami, demi kemuliaan Allah. Mampukanlah kami untuk merendahkan hati dan saling menerima saudara-saudari kami tanpa prasangka maupun penghakiman, sehingga kasih-Mu terpancar nyata di tengah komunitas kami. Amin.",
    7: "Ya Roh Kudus, kuduskanlah setiap kata yang keluar dari mulut dan ketikan jari kami. Jadikanlah tutur kata kami alat yang meneduhkan, membangun, dan menyalurkan pengharapan bagi mereka yang sedang lesu dan berbeban berat. Biarlah melalui kehadiran kami, sesama kami merasakan dorongan kasih Kristus. Amin.",
    8: "Tuhan Yesus, Pokok Anggur yang Benar, kami sadar bahwa terlepas dari-Mu kami tidak dapat berbuat apa-apa. Lindungi kami dari kesombongan yang merasa sanggup berjalan sendiri. Pautkanlah hati kami senantiasa kepada-Mu, agar aliran hidup-Mu memampukan kami menghasilkan buah kasih, damai, dan kesetiaan yang memberkati banyak jiwa. Amin.",
    9: "Allah Bapa yang Mahakuasa, Engkaulah kota benteng dan tempat perlindungan kami yang teguh di waktu kesesakan. Ketika ketakutan dan gelombang masalah menerpa hidup kami, tolonglah iman kami untuk tetap tenang dan memandang kepada kuasa-Mu. Kami percaya bahwa tidak ada badai yang sanggup menggoyahkan kami saat kami berada dalam lindungan-Mu. Amin.",
    10: "Tuhan, ajar kami untuk mempercayai-Mu dengan segenap hati dan tidak bersandar pada pengertian kami sendiri yang begitu terbatas. Dalam setiap keputusan, rencana, dan pergumulan kami, kami mau mengakui kedaulatan-Mu. Luruskanlah jalan kami dan pimpinlah langkah kami seturut dengan kehendak-Mu yang sempurna. Amin.",
    11: "Bapa yang Maha Pengasih, kobarkanlah kasih yang sungguh-sungguh di antara kami, sebab kasih menutupi banyak sekali dosa. Ajar kami untuk mempergunakan setiap talenta dan karunia yang telah Engkau percayakan demi saling melayani sebagai pengurus kasih karunia Allah yang setia dan tidak mementingkan diri sendiri. Amin.",
    12: "Tuhan Yesus, lembutkanlah hati kami agar memiliki kepekaan terhadap pergumulan saudara-saudari di sekitar kami. Berikan kami kerelaan untuk mengulurkan tangan, mendengarkan, dan saling menanggung beban dalam doa dan tindakan nyata, sehingga hukum kasih Kristus sungguh kami genapi dalam hidup bersama. Amin.",
    13: "Tuhan, terima kasih untuk sahabat-sahabat dan komunitas iman yang Engkau tempatkan di sisi kami. Jauhkanlah kami dari rasa egois dan keinginan untuk menyendiri. Ajar kami untuk menghargai kebersamaan, saling menopang saat salah satu dari kami terjatuh, dan menjadi tali bersimpul tiga yang tidak mudah diputuskan. Amin.",
    14: "Ya Bapa, karuniakanlah kepada kami roh kerendahan hati, kelemahlembutan, dan kesabaran untuk saling menunjukkan kasih di tengah segala perbedaan kepribadian kami. Peliharalah kesatuan Roh di antara kami oleh ikatan damai sejahtera, agar persekutuan kami senantiasa memuliakan nama-Mu. Amin.",
    15: "Tuhan Yesus, teladan kasih dan kerendahan hati yang sejati, bersihkanlah hati kami dari ambisi pribadi dan kesombongan yang sia-sia. Ajar kami untuk menganggap orang lain lebih utama dari diri kami sendiri, dan memberi perhatian tulus bagi kebutuhan serta kesejahteraan sesama kami dengan sukacita. Amin.",
    16: "Bapa, kami bersyukur karena Engkau telah lebih dahulu mengasihi kami melalui pengorbanan Yesus di kayu salib. Jangan biarkan kasih kami kepada-Mu hanya berhenti di bibir saja, melainkan nyatakanlah melalui tindakan nyata dalam mengasihi, mengampuni, dan memberkati saudara-saudara kami setiap hari. Amin.",
    17: "Tuhan, terima kasih atas anugerah persekutuan yang Engkau sediakan bagi kami. Berikan kami kesetiaan untuk tidak menjauhkan diri dari pertemuan-pertemuan ibadah, melainkan saling menasihati, menguatkan, dan memicu satu sama lain dalam kasih serta perbuatan-perbuatan baik menjelang hari kedatangan-Mu. Amin.",
    18: "Bapa yang mendengar setiap seruan hati kami, karuniakanlah kami keberanian untuk saling membuka diri dan saling mendoakan dengan tulus. Kami percaya doa orang yang benar bila dengan yakin didoakan sangat besar kuasanya. Jamahlah setiap sahabat kami yang sedang terluka, sakit, atau bergumul berat, dan nyatakanlah pemulihan-Mu. Amin.",
    19: "Tuhan adalah Gembalaku, takkan kekurangan aku. Terima kasih Tuhan karena Engkau menuntun kami ke padang yang berumput hijau dan membimbing kami ke air yang tenang. Sekalipun kami harus berjalan dalam lembah kekelaman, kami tidak takut bahaya, sebab gada dan tongkat-Mu itulah yang menghibur dan melindungi kami senantiasa. Amin.",
    20: "Tuhan Yesus, kami datang kepada-Mu dengan segala keletihan jasmani, beban pikiran, dan pergumulan hati kami. Kami menyambut undangan kasih-Mu untuk bertelut di kaki-Mu dan menerima kelegaan jiwa yang sejati. Ajar kami belajar dari-Mu yang lemah lembut dan rendah hati, sehingga kami menemukan ketenteraman abadi. Amin.",
    21: "Tuhan Pencipta yang Agung, Engkau menempatkan kami dengan berbagai rupa karunia, latar belakang, dan talenta yang unik. Mampukan kami untuk saling melengkapi dan tidak membanding-bandingkan diri, melainkan bersatu hati melayani sebagai satu tubuh Kristus yang saling membutuhkan dan saling membangun. Amin.",
    22: "Bapa, terima kasih karena Engkau telah menetapkan masing-masing kami berharga di mata-Mu. Lindungi komunitas kami dari perpecahan dan rasa tidak berharga. Ajar kami untuk saling menghormati anggota yang lemah dan bersukacita bersama mereka yang bersukacita, serta berdukacita bersama mereka yang berdukacita. Amin.",
    23: "Tuhan yang Maha Pengasih, kami mengucap syukur kepada Allah kami setiap kali kami mengingat saudara-saudari seiman kami. Terima kasih atas persekutuan dalam berita Injil yang telah terjalin. Peliharalah ikatan kasih dan persahabatan ini agar senantiasa menjadi sarana memancarkan terang kemuliaan-Mu di mana pun kami berada. Amin.",
    24: "Tuhan Yesus, Engkaulah Sahabat sejati yang menaruh kasih di setiap waktu dan hadir laksana saudara dalam kesukaran. Jadikanlah kami sahabat yang setia bagi sesama kami, bukan hanya di saat senang, tetapi terlebih lagi ketika mereka melewati masa-masa sukar dan gelap. Biarlah kasih-Mu hadir nyata melalui ketulusan kami. Amin.",
    25: "Tuhan, curahkanlah kasih agape-Mu ke dalam hati kami. Kasih yang sabar, murah hati, tidak cemburu, tidak memegahkan diri, dan tidak menyimpan kesalahan orang lain. Mampukan kami untuk senantiasa menutupi segala sesuatu, percaya segala sesuatu, dan sabar menanggung segala sesuatu demi kemuliaan nama-Mu. Amin.",
    26: "Bapa surgawi, sebagai orang-orang pilihan-Mu yang dikuduskan dan dikasihi, ajar kami setiap hari mengenakan belas kasihan, kemurahan, kerendahan hati, kelemahlembutan, dan kesabaran. Ampuni kami bila kami terluka, dan tolong kami untuk saling mengampuni sama seperti Kristus telah mengampuni kami. Ikatlah kami semua dengan kasih yang sempurna. Amin.",
    27: "Tuhan Yesus, dunia seringkali menawarkan tipu daya dosa yang dapat mengeraskan hati kami. Tolong kami agar tidak lengah, melainkan tekun saling menasihati dan menguatkan satu sama lain setiap hari selama masih dapat dikatakan 'hari ini'. Jagalah agar iman kami tetap murni dan berkobar-kobar sampai garis akhir. Amin.",
    28: "Tuhan Yesus Kristus, Engkau telah memberikan kami perintah baru yaitu agar kami saling mengasihi sama seperti Engkau telah mengasihi kami. Jadikanlah kasih di antara kami menjadi kesaksian hidup yang memikat, sehingga dunia mengenal bahwa kami adalah murid-murid-Mu yang sejati dan rindu mengenal kasih-Mu. Amin.",
    29: "Tuhan Yesus, Kepala Tubuh Gereja, kami menundukkan seluruh kepemimpinan dan arah hidup kami di bawah kedaulatan-Mu. Satukanlah sendi-sendi persekutuan kami dengan erat, agar setiap bagian menjalankan fungsinya dan tubuh-Mu bertumbuh subur dalam kasih dan kebenaran. Amin.",
    30: "Bapa yang baik, ajar kami untuk sungguh-sungguh saling mengasihi sebagai saudara dan berlomba-lomba dalam saling mendahului memberi hormat. Buanglah rasa iri hati dan egoisme dari tengah-tengah kami, gantikan dengan sukacita melihat sesama kami diberkati dan dipakai luar biasa oleh-Mu. Amin.",
    31: "Tuhan Allah kami yang setia, terima kasih atas seluruh pimpinan-Mu sepanjang bulan Oktober ini. Mampukan kami untuk terus membangun diri di atas dasar iman kami yang paling suci, berdoa dalam pimpinan Roh Kudus, dan memelihara diri kami dalam naungan kasih Allah sambil menantikan rahmat Tuhan kita Yesus Kristus menuju hidup yang kekal. Amin."
}

def escape_sql(val):
    if val is None or val == "":
        return "NULL"
    escaped = str(val).replace("'", "''")
    return f"'{escaped}'"

def main():
    print(f"Reading Excel: {EXCEL_FILE}")
    if not os.path.exists(EXCEL_FILE):
        print(f"File not found: {EXCEL_FILE}")
        sys.exit(1)

    os.makedirs(IMAGE_OUTPUT_DIR, exist_ok=True)

    with zipfile.ZipFile(EXCEL_FILE, 'r') as z:
        # Read shared strings
        sst_xml = ET.fromstring(z.read("xl/sharedStrings.xml"))
        shared_strings = []
        for si in sst_xml.findall('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}si'):
            text = "".join(si.itertext())
            shared_strings.append(text)

        # Read workbook rels
        wb_rels_xml = ET.fromstring(z.read("xl/_rels/workbook.xml.rels"))
        rel_map = {r.attrib['Id']: r.attrib['Target'] for r in wb_rels_xml}

        # Read workbook sheets
        wb_xml = ET.fromstring(z.read("xl/workbook.xml"))
        sheets_elem = wb_xml.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheets')
        sheet_targets = {}
        for s in sheets_elem:
            name = s.attrib['name']
            r_id = s.attrib['{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id']
            sheet_targets[name] = rel_map[r_id]

        # Extract authors from sheet 'Intisari'
        authors = {}
        if 'Intisari' in sheet_targets:
            int_xml = ET.fromstring(z.read(f"xl/{sheet_targets['Intisari']}"))
            sheet_data = int_xml.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheetData')
            for row in sheet_data:
                r_num = int(row.attrib['r'])
                if 18 <= r_num <= 48:
                    day = r_num - 17
                    penulis = ""
                    ket = ""
                    for c in row:
                        cell_ref = c.attrib['r']
                        val = ""
                        v_elem = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                        if v_elem is not None and v_elem.text:
                            if c.attrib.get('t') == 's':
                                val = shared_strings[int(v_elem.text)]
                            else:
                                val = v_elem.text
                        if cell_ref.startswith('D'):
                            penulis = val
                        elif cell_ref.startswith('E'):
                            ket = val
                    if "di ganti" in ket.lower() or "diganti" in ket.lower():
                        parts = ket.split("anti", 1)
                        if len(parts) > 1:
                            penulis = parts[1].replace("oleh", "").replace("Oleh", "").strip()
                    authors[day] = penulis or "Tim Renungan PMK Katharos"

        # Generate SQL migration
        sql_lines = [
            "-- 05_october_2026_devotionals.sql",
            "-- Generated automatically from 'BR OKTOBER 2026.xlsx'",
            "",
            "ALTER TABLE devotionals ADD COLUMN IF NOT EXISTS quote TEXT;",
            "ALTER TABLE devotionals ADD COLUMN IF NOT EXISTS image_url TEXT;",
            "ALTER TABLE devotionals ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'published';",
            ""
        ]

        for day in range(1, 32):
            day_str = f"{day:02d}"
            sheet_name = str(day)
            if sheet_name not in sheet_targets:
                continue

            target_xml_path = f"xl/{sheet_targets[sheet_name]}"
            s_xml = ET.fromstring(z.read(target_xml_path))

            # Image resolution
            img_filename = f"2026-10-{day_str}.jpg"
            img_rel_path = f"xl/worksheets/_rels/{os.path.basename(target_xml_path)}.rels"
            if img_rel_path in z.namelist():
                rels_xml = ET.fromstring(z.read(img_rel_path))
                drawing_target = None
                for r in rels_xml:
                    if r.attrib.get('Type', '').endswith('drawing'):
                        drawing_target = r.attrib['Target']
                if drawing_target:
                    d_base = os.path.basename(drawing_target)
                    d_rel_path = f"xl/drawings/_rels/{d_base}.rels"
                    if d_rel_path in z.namelist():
                        d_rels_xml = ET.fromstring(z.read(d_rel_path))
                        for dr in d_rels_xml:
                            target_img = dr.attrib.get('Target', '')
                            if 'image1.png' not in target_img and ('image' in target_img):
                                ext = os.path.splitext(target_img)[1]
                                img_filename = f"2026-10-{day_str}{ext}"
                                media_zip_entry = f"xl/media/{os.path.basename(target_img)}"
                                if media_zip_entry in z.namelist():
                                    with open(os.path.join(IMAGE_OUTPUT_DIR, img_filename), "wb") as f_out:
                                        f_out.write(z.read(media_zip_entry))
                                break

            # Read cells
            cells = {}
            for row in s_xml.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}sheetData'):
                for c in row:
                    c_ref = c.attrib['r']
                    v_elem = c.find('{http://schemas.openxmlformats.org/spreadsheetml/2006/main}v')
                    if v_elem is not None and v_elem.text:
                        if c.attrib.get('t') == 's':
                            cells[c_ref] = shared_strings[int(v_elem.text)]
                        else:
                            cells[c_ref] = v_elem.text

            pub_date = f"2026-10-{day_str}"
            author = authors.get(day, "Tim Renungan PMK Katharos")
            passage_ref = cells.get('A3', '').strip()
            passage_text = cells.get('A4', '').strip()
            title = cells.get('A8', '').strip()
            content = cells.get('A10', '').strip()
            quote = cells.get('A44', '').strip()
            prayer = PRAYERS.get(day, "")
            image_url = f"/devotionals/{img_filename}"

            sql = f"""INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '{pub_date}',
    {escape_sql(title)},
    {escape_sql(author)},
    {escape_sql(passage_ref)},
    {escape_sql(passage_text)},
    {escape_sql(content)},
    {escape_sql(quote)},
    {escape_sql(prayer)},
    {escape_sql(image_url)},
    'published',
    CURRENT_TIMESTAMP
)
ON CONFLICT (publish_date) DO UPDATE
SET title = EXCLUDED.title,
    author = EXCLUDED.author,
    passage_ref = EXCLUDED.passage_ref,
    passage_text = EXCLUDED.passage_text,
    content = EXCLUDED.content,
    quote = EXCLUDED.quote,
    prayer = EXCLUDED.prayer,
    image_url = EXCLUDED.image_url,
    status = EXCLUDED.status,
    updated_at = CURRENT_TIMESTAMP;
"""
            sql_lines.append(sql)

        with open(SQL_OUTPUT, "w", encoding="utf-8") as f_sql:
            f_sql.write("\n".join(sql_lines))

        print(f"Successfully generated {SQL_OUTPUT}")
        print(f"Extracted images to {IMAGE_OUTPUT_DIR}")

if __name__ == '__main__':
    main()
