-- 05_october_2026_devotionals.sql
-- Schema extension and full 31-day seeding for Oktober 2026 Devotionals

-- 1. Add quote, image_url, and status columns if not exist
ALTER TABLE devotionals ADD COLUMN IF NOT EXISTS quote TEXT;
ALTER TABLE devotionals ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE devotionals ADD COLUMN IF NOT EXISTS status VARCHAR(20) NOT NULL DEFAULT 'published';

-- 2. Seed All 31 Days of October 2026
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-01',
    'JANGAN GELISAH, KRISTUS ADALAH RUMAH SEJATI',
    'Kak Stefani',
    'Yohanes 14:1–6',
    'Janganlah gelisah hatimu; percayalah kepada Allah, percayalah juga kepada-Ku.',
    'Gelisah adalah keadaan ketika hati tidak tenang karena menghadapi sesuatu yang tidak pasti, sesuatu yang tidak kita mengerti, atau sesuatu yang berada di luar kendali kita. Gelisah sering muncul ketika kita tidak tahu apa yang akan terjadi selanjutnya. Dalam keadaan seperti itu, pikiran dipenuhi berbagai pertanyaan: Apa yang akan terjadi? Apakah aku akan baik-baik saja? 
Yesus berkata kepada murid-murid-Nya, “Janganlah gelisah hatimu; percayalah kepada Allah, percayalah juga kepada-Ku.” Perkataan ini disampaikan dalam situasi yang tidak mudah. Pada pasal sebelumnya, Yesus membasuh kaki murid-murid-Nya dan memberitahukan bahwa Yudas Iskariot akan mengkhianati-Nya dan Petrus akan menyangkal-Nya. Para murid tentu mengalami kebingungan dan kegelisahan karena mereka belum mengetahui apa yang akan terjadi selanjutnya. Namun, di tengah kegelisahan itu, Yesus mengarahkan mereka kepada satu hal yang penting, yaitu percaya. Yesus memberikan kepastian bahwa di tengah keadaan yang tidak mereka mengerti, mereka tetap dapat menaruh kepercayaan kepada-Nya. Kemudian Yesus berbicara tentang Rumah Bapa. Ia berkata bahwa di rumah Bapa-Nya ada banyak tempat tinggal dan Ia pergi untuk menyediakan tempat bagi mereka. Yesus juga memberikan pengharapan bahwa Ia akan datang kembali dan membawa mereka bersama-Nya. Di sini kita melihat bahwa Yesus memberikan kepastian, pengharapan, dan jaminan kepada orang yang percaya kepada-Nya. Ketika Tomas bertanya, “Tuhan, kami tidak tahu ke mana Engkau pergi; jadi bagaimana kami tahu jalan ke situ?”, Yesus menjawab, “Akulah jalan dan kebenaran dan hidup. Tidak ada seorang pun yang datang kepada Bapa, kalau tidak melalui Aku.” Yesus adalah jalan menuju Bapa. Karena itu, Kristus menjadi jalan, kebenaran yang kita pegang, dan sumber kehidupan kita. Jika dikaitkan dengan tema “Rumah”, rumah bukan hanya berbicara tentang sebuah tempat untuk tinggal. Rumah adalah tempat di mana kita merasa aman, diterima, dan memiliki tujuan untuk kembali. Demikian juga Kristus adalah rumah sejati bagi hati yang gelisah. Ketika keadaan hidup berubah, ketika kita menghadapi masalah, kehilangan, ketidakpastian, atau tidak mengetahui apa yang akan terjadi ke depan, kita tetap memiliki tempat untuk datang, yaitu kepada Kristus. Di dalam Dia ada pengharapan, ketenangan, dan kepastian.
Apa yang selama ini membuat hati kita gelisah? Apakah kita lebih sering mencari rasa aman dari keadaan, manusia, pekerjaan, atau hal-hal yang kita miliki? Yohanes 14:1–6 mengingatkan kita untuk kembali kepada Kristus. Ketika hati gelisah, luangkan waktu untuk berdoa, membaca firman Tuhan, dan menyerahkan kekhawatiran kepada-Nya.',
    '“Ketika hati gelisah, datanglah kepada Tuhan, karena Dialah sumber pengharapan, ketenangan, dan kepastian.”',
    'Tuhan Yesus, di tengah hiruk-pikuk kehidupan dan kegelisahan masa depan yang seringkali meresahkan hati kami, ajar kami untuk senantiasa percaya dan berlabuh kepada-Mu. Terima kasih karena Engkau telah menyediakan tempat perteduhan dan rumah sejati bagi jiwa kami. Pegang tangan kami saat kami ragu, dan penuhilah hati kami dengan damai sejahtera-Mu yang melampaui segala akal. Amin.',
    '/devotionals/2026-10-01.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-02',
    'The Dwelling Place',
    'Kak Pretty',
    'Mazmur 90:1–2',
    '...Tuhan, Engkaulah tempat perteduhan kami turun-temurun. Sebelum gunung-gunung dilahirkan, dan bumi dan dunia diperanakkan, bahkan dari selama-lamanya Engkaulah Allah.',
    'Bayangkan seseorang yang sedang melakukan perjalanan jauh. Ia dapat menemukan banyak tempat untuk berhenti, tetapi tidak semua tempat membuatnya merasa aman dan diterima. Ada tempat untuk sekadar beristirahat, tetapi ada satu tempat yang disebut rumah—tempat ia dapat melepaskan lelah, menjadi dirinya sendiri, dan tahu bahwa ia diterima. Dalam kehidupan ini, kita juga sedang menjalani sebuah perjalanan. Kita mencari rasa aman melalui keluarga, teman, pencapaian, pelayanan, atau berbagai hal yang kita miliki. Namun, semuanya dapat berubah dan tidak selalu mampu menjadi tempat kita bersandar. Mazmur 90 mengingatkan kita bahwa ada satu tempat kediaman yang tidak pernah berubah: Allah sendiri. Allah bukan sekadar tempat kita datang ketika membutuhkan pertolongan, tetapi tempat di mana hati kita menetap dan kehidupan kita berakar.

“Tuhan, Engkaulah tempat perteduhan kami turun-temurun… dari selama-lamanya sampai selama-lamanya Engkaulah Allah.” Di tengah fana dan terbatasnya dunia, Musa mendapati satu kepastian—bahwa kasih dan perlindungan Tuhan tidak pernah tergerus oleh waktu. Dialah rumah abadi yang selalu siap mendekap kita dari generasi ke generasi. Di balik singkatnya rentang usia manusia dan dinamisnya perubahan dunia, ada Allah yang melintasi zaman. Dialah tempat pulang, tempat jiwa kita menemukan naungan yang sejati. Menjadikan Tuhan sebagai fondasi hidup berarti memiliki ketenangan di tengah ketidakpastian. Hal ini mengingatkan kita pada perumpamaan Yesus di Matius 7:24–25 tentang rumah yang dibangun di atas batu karang. Badai boleh datang menyapa, namun rumah itu tak kan runtuh karena berdiri di atas dasar yang tangguh. Kristus-lah dasar abadi itu. Saat Dia menjadi pusat dan tempat kita bernaung, kekuatan baru dihembuskan ke dalam jiwa kita. Lebih dari itu, hati kita dimampukan untuk meluapkan kasih yang sama kepada orang lain. Dunia akan terus berubah tetapi Allah adalah tempat kita bernaung, sebagaimana yang tertulis di dalam Alkitab bahwa “Yesus Kristus tetap sama, baik kemarin maupun hari ini dan sampai selama-lamanya” (Ibrani 13:8). 

Oleh sebab itu, mari kita menjadikan Kristus sebagai tempat kediaman hati dan dasar kehidupan kita setiap hari. Ketika dunia berubah dan keadaan tidak selalu sesuai harapan, tetaplah berakar di dalam-Nya. Datanglah kepada Tuhan dalam doa, firman, dan iman. Biarlah kasih yang kita terima dari-Nya mengalir melalui hidup kita dengan belajar menerima, mengasihi, mengampuni, dan menguatkan sesama. Tinggallah di dalam Kristus, sebab di dalam Dia kita menemukan tempat pulang, perlindungan, dan kekuatan yang tidak pernah berubah [PM].',
    '“The world may change, seasons may pass, and life may shift, but in Christ, we always have a place to return, a place to rest, and a place to belong.”',
    'Bapa di Surga, Engkaulah tempat perteduhan kami turun-temurun, sebelum gunung-gunung dilahirkan dan bumi diciptakan. Di tengah dunia yang fana dan serba berubah ini, kami bersyukur karena kasih setia dan perlindungan-Mu kekal adanya. Biarlah hidup kami selalu berakar dan tinggal diam di dalam naungan hadirat-Mu setiap hari. Amin.',
    '/devotionals/2026-10-02.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-03',
    'Where Are You Building Your Life?',
    'Kak Nita',
    'Matius 7:24-27',
    'Setiap orang yang mendengar perkataan-Ku ini dan melakukannya, ia sama dengan orang yang bijaksana, yang mendirikan rumahnya di atas batu...',
    'Apa yang ada dibenak anda saat ditanya, apakah yang sedang anda bangun? saya yakin tidak jarang diantara kita yang akan menjawab "saya sedang tidak membangun apa-apa" padahal sejatinya tidak satupun diantara kita yang sedang dalam posisi tidak membangun. Sebaliknya saat ini kita semua sedang dalam posisi membangun. Pertanyaannya adalah, membangun apa? Membangun itu bukan hanya sekedar membangun bagunan fisik, seperti rumah ataupun gedung. Membangun itu bisa saja membangun kehidupan seperti keluarga, karir, hubungan lawan jenis, bahkan juga membangun iman.

Firman Tuhan dalam Matius 7 ayat 24-27 ini mengingatkan kita akan satu realitas; yaitu hujan akan turun, banjir akan datang dan angin akan melanda melalui firman-Nyayang berbunyi "Kemudian turunlah hujan dan datanglah banjir, lalu angin melanda rumah itu, sehingga rubuhlah rumah itu dan hebatlah kerusakannya". Maka dari itu kita diajar bahwa keindahan fisik atau megahnya struktur suatu bangunan tidak akan ada artinya jika pondasinya rapuh. Didalam kehidupan kita, hal yang paling penting bukanlah seberapa cepat kita membangun keluarga kita, karir kita, hubungan persahabatan kita, atau tim pelayanan kita. Namun yang paling penting adalah atas dasar apa kita membangun semuanya itu. Dasar kita membangun keluarga, karir, persahabatan, atau tim pelayanan harus tepat, dan tidak ada dasar lain yang lebih tepat dan tangguh selaian dasar kebenaran Firman Tuhan. Kita bisa saja dengan cepat membangun keluarga kita dengan cepat dan tampak begitu megah karena memiliki kesamaan hobi. atau kita bisa saja tampak begitu cepat membangun karir kita atas dasar nepotisme. bahkan kita bisa saja membangun tim pelayanan dengan program-program yang keren karena kesamaan tujuan untuk mendapat pujian. Namun ingat!!! Ujian, pergumulan, dan penderitaan adalah hal yang tidak terelakkan dalam perjalanan hidup setiap orang. Dan ketika badai itu datang, hanya keluarga yang dilandasi takut akan Tuhan yang akan bertahan saat badai ekonomi keluarga datang. Hanya orang yang membangun karir dengan konsistensi, ketekunan dan kejujuran yang akan bertahan dalam persaingan, dan hanya tim pelayanan yang dibangun atas dasar kasih mula-mula yang akan terus membara ditengah badai kebosanan, kejenuhan dan perselisihan pendapat.

Teruna Kristus yang luar biasa, satu-satunya dasar yang kokoh atas segala yang kita bangun hanyalah batu karang yang sejati yaitu Yesus Kristus. Menjadikan Kristus sebagai dasar berarti tidak hanya mendengar ajaran-Nya, tetapi menjadikan firman-Nya sebagai penuntun hari lepas hari. Jika saat ini engkau lelah dan hampir menyerah dengan keluargamu, periksa kembali atas dasar keluargamu kau bangun? Jika hari-hari ini engkau stress menghadapi tekanan pekerjaanmu, periksa kembali atas dasar apa engkau memulai karirmu? dan jika engkau saat ini jenuh, lelah dalam melayani, periksa kembali atas dasar engkau melayani. Di atas apakah Anda sedang membangun rumah kehidupan Anda saat ini? Apakah di atas pasir emosi, kekayaan, dan kekuatan sendiri, atau di atas Batu Karang yang teguh? Tuhan Yesus memberkati. (JNK)',
    'Kali bengawan tempat burung tekukur mandi, Jarang dikunjungi meskipun indah sekali.
 Kalu kejenuhan pelayanan terus menghantui, Jangan sampai dasar pelayananmu yang harus diperiksa kembali.',
    'Tuhan Yesus yang baik, jadikanlah firman-Mu fondasi batu karang tempat kami membangun seluruh cita-cita, studi, dan langkah kehidupan kami. Ampuni kami bila seringkali tergoda membangun di atas pasir ilusi duniawi. Kuatkan kami untuk bukan hanya menjadi pendengar yang kagum, melainkan pelaku firman yang setia di setiap musim kehidupan. Amin.',
    '/devotionals/2026-10-03.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-04',
    '"Strong Roots, Steady Faith"',
    'mutiara',
    'Kolose 2:6-7',
    '(6)Kamu telah menerima Kristus Yesus, Tuhan kita,... (7)... Dan hendaklah hatimu melimpah dengan syukur.',
    'Dalam kehidupan, setiap orang tentu mengalami berbagai proses yang membentuk dirinya, baik melalui pengalaman menyenangkan maupun keadaan yang penuh tantangan. Demikian juga dalam perjalanan iman, kita tidak selalu berada dalam keadaan yang baik. Ada kalanya kita merasa begitu dekat dengan Tuhan, tetapi ada pula saat-saat ketika kita mulai kehilangan semangat dalam berdoa, membaca firman Tuhan, bahkan menjalani pelayanan. Kesibukan, permasalahan pribadi, kekecewaan, dan berbagai tuntutan kehidupan terkadang membuat kita mengabaikan hubungan dengan Tuhan. Sama seperti sebuah pohon yang membutuhkan akar yang kuat agar dapat bertahan menghadapi angin dan perubahan cuaca, kehidupan orang percaya juga membutuhkan dasar iman yang kokoh. 

Melalui jemaat Kolose, Rasul Paulus mengingatkan untuk tetap hidup di dalam Kristus sebagaimana mereka telah menerima-Nya. Paulus menggambarkan kehidupan orang percaya seperti pohon yang berakar kuat dan terus bertumbuh. Akar yang kuat memungkinkan sebuah pohon memperoleh nutrisi dan tetap berdiri sekalipun menghadapi berbagai keadaan. Berakar di dalam Kristus berarti menjadikan firman Tuhan sebagai pedoman hidup, membangun hubungan yang dekat dengan-Nya melalui doa, serta senantiasa mengandalkan-Nya dalam setiap keadaan. Selain itu, iman yang bertumbuh juga harus disertai dengan rasa syukur atas segala sesuatu yang Tuhan izinkan terjadi dalam kehidupan kita. Kita tidak boleh hanya mencari Tuhan ketika sedang menghadapi kesulitan, tetapi juga perlu tetap setia ketika keadaan berjalan dengan baik. Pertumbuhan iman bukan hanya terlihat dari seberapa sering kita mengikuti ibadah atau terlibat dalam pelayanan, melainkan juga dari bagaimana kita menerapkan firman Tuhan dalam kehidupan sehari-hari. Ketika menghadapi kekecewaan, kita belajar mengampuni; ketika mengalami kesulitan, kita tetap berpengharapan; dan ketika menerima berkat, kita tidak lupa untuk bersyukur. Semua itu merupakan bagian dari proses pertumbuhan iman yang berakar di dalam Kristus.

Dalam kehidupan persekutuan bukan sekadar tempat untuk berkumpul dan beribadah bersama, melainkan juga tempat untuk saling menerima, mengasihi, mendoakan, dan menguatkan satu sama lain. Setiap anggota memiliki pergumulan dan proses pertumbuhan iman yang berbeda. Oleh karena itu, kita perlu belajar untuk tidak menghakimi kelemahan sesama, tetapi hadir untuk memberikan dukungan dan penguatan. Ketika ada saudara seiman yang mulai kehilangan semangat, kita dapat mengingatkannya kembali akan kasih dan penyertaan Tuhan. Sesuai dengan tema Home in Christ, Kristus adalah dasar dan tempat kita bernaung. Di dalam-Nya, kita tidak hanya menemukan kekuatan untuk menghadapi kehidupan, tetapi juga menemukan keluarga yang dapat berjalan bersama dalam iman.[MAS]',
    '"Jangan hanya berusaha untuk bertumbuh tinggi, tetapi pastikan imanmu memiliki akar yang kuat di dalam Kristus."',
    'Tuhan, biarlah akar rohani kami menancap semakin dalam ke dalam kasih dan kebenaran-Mu. Di tengah derasnya arus dunia dan pengajaran yang membingungkan, jagalah agar iman kami tidak mudah goyah. Penuhilah hati kami dengan rasa syukur yang melimpah atas karya keselamatan-Mu dalam hidup kami. Amin.',
    '/devotionals/2026-10-04.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-05',
    'Menjadi Satu Keluarga di Dalam Kristus',
    'Kak Reynanda',
    'Efesus 2:19–22',
    '(19)Demikianlah kamu bukan lagi orang asing dan pendatang, melainkan kawan sewarga dari orang-orang kudus dan anggota-anggota keluarga Allah,...',
    'Dalam kehidupan sehari-hari, kita bertemu dengan banyak orang yang memiliki latar belakang, karakter, kebiasaan, dan cara berpikir yang berbeda. Perbedaan terkadang membuat kita sulit menerima atau memahami satu sama lain. Bahkan di dalam lingkungan pelayanan, perkuliahan, maupun persekutuan, kita bisa merasa lebih dekat dengan orang-orang tertentu dan tanpa sadar menjauh dari yang berbeda dengan kita. Namun, sebagai orang percaya, Tuhan mengajarkan bahwa kita tidak dipanggil untuk hidup sendiri. Di dalam Kristus, kita memiliki keluarga yang lebih besar, yaitu keluarga Allah. Karena itu, kita perlu belajar membuka hati, menerima, menghargai, dan membangun hubungan yang baik dengan sesama.

Efesus 2:19–22 mengingatkan bahwa melalui Kristus, kita bukan lagi orang asing atau pendatang, melainkan kawan sewarga dari orang-orang kudus dan anggota keluarga Allah. Dasar kehidupan kita adalah Kristus, yang digambarkan sebagai batu penjuru. Artinya, persatuan orang percaya bukan dibangun berdasarkan kesamaan suku, karakter, status, atau latar belakang, tetapi berdasarkan Kristus. Ayat ini juga menggambarkan orang percaya sebagai sebuah bangunan yang sedang dibangun menjadi tempat kediaman Allah di dalam Roh. Setiap orang memiliki tempat dan peran dalam keluarga Allah. Karena itu, tidak seharusnya ada sikap merasa lebih baik, lebih penting, atau lebih layak daripada orang lain. Tuhan menghendaki umat-Nya hidup dalam kasih, saling menerima, dan bertumbuh bersama sebagai satu tubuh di dalam Kristus.

Lalu, bagaimana kita menerapkannya? Kita dapat memulainya dari hal-hal sederhana: menyapa orang yang sering kita abaikan, mendengarkan teman yang sedang mengalami kesulitan, tidak membeda-bedakan seseorang karena latar belakangnya, serta belajar mengampuni ketika terjadi kesalahpahaman. Dalam pelayanan maupun persekutuan, kita juga perlu bekerja sama dan menghargai setiap orang karena masing-masing memiliki peran yang Tuhan berikan. Ketika kita mau menerima sesama, sebenarnya kita sedang menunjukkan kasih Kristus melalui kehidupan kita. Mari berhenti membangun tembok karena perbedaan dan mulai membangun jembatan melalui kasih. Kiranya melalui hidup kita, orang lain dapat merasakan bahwa di dalam Kristus ada keluarga yang menerima, menguatkan, dan berjalan bersama.[RAT]',
    '“Di dalam Kristus, kita bukan lagi orang asing, tetapi satu keluarga yang saling menerima.”',
    'Bapa yang penuh kasih, terima kasih karena di dalam Kristus kami tidak lagi menjadi orang asing, melainkan kawan sewarga dan bagian dari keluarga Allah. Karuniakanlah kepada kami hati yang rela membuka diri, merangkul sesama saudara seiman, dan bersama-sama dibangun menjadi tempat kediaman Roh Kudus yang kudus dan rukun. Amin.',
    '/devotionals/2026-10-05.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-06',
    'Penerimaan',
    'Kak Alfreds',
    'Roma 15:7',
    'Sebab itu terimalah satu akan yang lain, sama seperti Kristus juga telah menerima kita, untuk kemuliaan Allah.',
    'Pada awal karir saya sebagai seorang pemandu acara atau sering dikenal dengan sebutan Master Of Ceremony (MC), banyak sekali pertanyaan kepada saya tentang bagaimana dan dimana saya mempelajari cara berbicara didepan umum? bagaimana saya bisa memiliki rasa percaya diri yang bagus? bagaimana saya bisa memiliki wawasan menyeimbangkan tamu dan narasumber? bagaimana saya bisa memiliki kemampuan crowd control yang baik? dan berbagaimacam pertanyaan yang bersifat pribadi kepada saya. Semua pertanyaan ini saat dilontarkan seringkali saya menjawab dengan spontan ya semua karena kemurahan Tuhan. Namun semakin beranjak dewasa sudah lebih dari sepuluh tahun menjalankan pekerjaan sebagai MC dan seorang yang selalu tampil didepan untuk berbicara dan mengarahkan orang lain, saat kembali diberikan sebuah pertanyaan ini membawa saya kembali pada sebuah kenangan kecil yang mengubah cara saya memandang terhadap diri saya. 
Pertanyaan itu adalah "bagaimana saya bisa memiliki rasa percaya diri yang bagus?" Teringat sewaktu kelas dua SMA saya pertama kali belajar untuk menerima diri saya, suara saya, warna kulit saya, keadaan saya dimana saya dilahirkan. seketika itu rasa percaya diri saya meningkat dan menjadikan saya tampil percaya diri menjadi diri saya sendiri tanpa harus malu mengatakan kebenaran siapa saya didepan semua orang. Krisis kepercayaan diri sebagai orang percaya sempat terjadi kepada jemaat di Roma pada waktu itu, lalu Paulus menuliskan surat kepada mereka untuk meneguhkan hati mereka supaya iman mereka tetap kuat. Pengenalan akan diri sendiri mempengaruhi bagaimana orang bersikap terhadap lingkungannya. Perpecahan pun terjadi di antara sesama orang percaya yang beriman kepada Yesus Kristus karena terdapat perbedaan suku, ras, bahasa, kebiasaan, serta latar belakang masing-masing jemaat pada saat itu. Sehingga di ayatnya sebelumnya Paulus berdoa dan meminta supaya Allah yang adalah sumber Damai mengaruniakan kerukunan diantara mereka. "Sebab itu terimalah satu akan yang lain,,," Kata "sebab" pada sebuah penulisan ayat mengacu kepada kesimpulan yang ditarik dari sebuah penjelasan suatu peristiwa, dalam konteks ini kita dapat melihat dari ayat pertama bahwa ada sebuah permasalahan yang terjadi di tengah jemaat Roma, yaitu saling melihat perbedaan latar belakang dan membanding-bandingkan siapa yang memiliki iman lebih kuat dari yang lain. Sehingga Paulus mengajarkan kepada mereka melalui suratnya supaya saling menguatkan satu dengan yang lainnya dalam iman, bukan malah membanding-bandingkan iman. Supaya dapat mencapai tujuan dari saling menguatkan iman dan hidup rukun dalam satu iman kepada Kristus Yesus, semua harus bermula dari saling menerima satu dengan yang lain. Sebagai anak Rantau jauh dari Papua ke pulau Jawa dan bergabung dengan komunitas Katharos di kampus Universitas Setia Budi Surakarta, saya pernah berpikir "bagaimana nih kalau mereka tidak mengerti saya? bagaimana nih kalau mereka tidak mau berteman dengan saya?" keraguan itu muncul dan membuat saya merasa tidak percaya diri, Namun Tuhan ingatkan saya kembali bahwa bukan soal orang diluar sana tetapi apakah diri saya sudah menerima diri saya sendiri apa adanya? Jika sudah selesai dengan hal itu maka percayalah, kamu akan lebih mundah menerima orang lain begitupun orang lain kepada kamu.  
Ada lagu sekolah minggu liriknya seperti ini "ku tak pandang dari Gereja mana, asal kau berdiri atas Firman-Nya, kalau hatimu seperti hatiku, kaulah saudara dan saudariku" Selama kita menyembah Yesus Kristus yang sama berarti kita adalah saudara. Bukan soal suku, ras, bahasa bahkan latarbelakang yang menentukan siapa kita sebagai orang percaya dalam Yesus melainkan kasih Kristus yang mengikat kita menjadi satu keluarga dalam Yesus Tuhan kita. Menerima orang lain datang dari penerimaan diri sendiri, menerima diri sendiri menjadikan kita percaya diri untuk hidup rukun satu dengan yang lain dalam kasih Kristus. [AL]',
    'Penerimaan adalah awal untuk mengenal diri, memahami tempat berpijak, dan menentukan arah langkah.',
    'Tuhan Yesus, terima kasih karena Engkau telah menerima kami apa adanya dengan segala kelemahan dan keterbatasan kami, demi kemuliaan Allah. Mampukanlah kami untuk merendahkan hati dan saling menerima saudara-saudari kami tanpa prasangka maupun penghakiman, sehingga kasih-Mu terpancar nyata di tengah komunitas kami. Amin.',
    '/devotionals/2026-10-06.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-07',
    'Words That Build',
    'Mutiara',
    '1 Tesalonika 5:11',
    'Karena itu nasihatilah seorang akan yang lain dan saling membangunlah kamu seperti yang memang kamu lakukan.',
    'Dalam menjalani kehidupan, setiap orang tentu pernah berada dalam keadaan yang membuatnya merasa lelah, kehilangan semangat, atau bahkan merasa tidak mampu menghadapi berbagai persoalan. Ada kalanya seseorang terlihat baik-baik saja di hadapan orang lain, tetapi sebenarnya sedang menyimpan banyak pergumulan dalam dirinya. Dalam situasi seperti ini, kehadiran orang lain yang mau mendengarkan, memberikan perhatian, dan menyampaikan perkataan yang menguatkan dapat menjadi hal yang sangat berarti. Namun, terkadang kita justru kurang menyadari bahwa perkataan sederhana yang kita ucapkan dapat memengaruhi perasaan dan semangat orang lain. Kita mungkin lebih mudah mengkritik kesalahan daripada memberikan apresiasi, atau lebih sering menghakimi daripada berusaha memahami keadaan seseorang. Padahal, sebagai orang percaya, kita dipanggil untuk menghadirkan kasih Kristus melalui perkataan dan tindakan kita. 

1 Tesalonika 5:11, Rasul Paulus mengingatkan jemaat untuk saling menasihati dan membangun satu sama lain. Nasihat yang dimaksud bukan sekadar memberikan teguran atau menunjukkan kesalahan orang lain, melainkan juga menyampaikan perkataan yang dapat mengarahkan, menghibur, dan menguatkan sesama dalam menjalani kehidupan. Setiap perkataan yang kita sampaikan hendaknya dilandasi oleh kasih, bukan keinginan untuk merendahkan atau menyakiti hati orang lain. Terkadang, kita tidak menyadari bahwa perkataan yang dianggap sederhana dapat meninggalkan kesan mendalam bagi seseorang. Oleh karena itu, kita perlu belajar menggunakan perkataan dengan bijaksana, terutama ketika berhadapan dengan orang yang sedang mengalami kesulitan. Memberikan semangat kepada seseorang yang sedang kehilangan harapan, mengapresiasi usaha orang lain, serta mengingatkan sesama akan kasih dan penyertaan Tuhan merupakan bentuk nyata dari tindakan saling membangun. Kita juga perlu memahami bahwa setiap orang memiliki proses dan pergumulan yang berbeda. Tidak semua orang membutuhkan nasihat yang panjang; terkadang, mereka hanya membutuhkan seseorang yang bersedia mendengarkan dan memberikan penghiburan. 

Dalam kehidupan bersama, marilah kita belajar untuk tidak hanya berfokus pada kekurangan orang lain, tetapi juga menghargai setiap usaha dan proses pertumbuhan mereka. Ketika ada saudara seiman yang sedang kehilangan semangat, jadilah pribadi yang mampu memberikan dorongan dan mengingatkannya bahwa Tuhan senantiasa menyertai kehidupannya. Ketika ada yang melakukan kesalahan, tegurlah dengan kasih dan kerendahan hati, bukan dengan perkataan yang menjatuhkan. Dengan demikian, kita tidak hanya bertumbuh dalam iman secara pribadi, tetapi juga membangun keluarga iman yang saling mengasihi, menerima, dan menguatkan di dalam Kristus. [MAS]',
    '"Satu perkataan penuh kasih mungkin sederhana bagimu, tetapi dapat menjadi kekuatan besar bagi seseorang."',
    'Ya Roh Kudus, kuduskanlah setiap kata yang keluar dari mulut dan ketikan jari kami. Jadikanlah tutur kata kami alat yang meneduhkan, membangun, dan menyalurkan pengharapan bagi mereka yang sedang lesu dan berbeban berat. Biarlah melalui kehadiran kami, sesama kami merasakan dorongan kasih Kristus. Amin.',
    '/devotionals/2026-10-07.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-08',
    'Jangan Terlepas',
    'Kak Rani',
    'Yohanes 15:4-5',
    '(4) Tinggallah di dalam Aku dan Aku di dalam kamu. Sama seperti ranting tidak dapat berbuah dari dirinya sendiri,.... (5)... Barangsiapa tinggal di dalam Aku dan Aku di dalam dia, ia berbuah banyak, sebab di luar Aku kamu tidak dapat berbuat apa-apa.',
    'Dalam kehidupan sehari-hari, kita sering merasa mampu melakukan banyak hal sendiri. Kita belajar, bekerja, melayani, dan menyelesaikan tanggung jawab. Namun, ada saatnya kita merasa lelah, kehilangan semangat, atau tidak tahu harus melangkah ke mana. Keadaan itu mengingatkan kita bahwa manusia memiliki keterbatasan dan membutuhkan sumber kekuatan yang lebih besar. Seperti ranting yang tidak dapat hidup tanpa pokoknya, demikian juga kita membutuhkan Kristus dalam menjalani kehidupan.

Dalam Yohanes 15:4-5, Yesus berkata, “Tinggallah di dalam Aku dan Aku di dalam kamu.” Yesus menggambarkan diri-Nya sebagai pokok anggur dan kita sebagai ranting. Ranting dapat hidup dan menghasilkan buah hanya jika tetap melekat pada pokok anggur. Demikian juga, kita tidak dapat menghasilkan kehidupan yang berkenan kepada Tuhan hanya dengan mengandalkan kemampuan sendiri. Tinggal di dalam Kristus berarti terus membangun hubungan yang dekat dengan-Nya melalui doa, firman Tuhan, ketaatan, dan kepercayaan kepada-Nya. Intisari renungan ini adalah, “Tinggal di dalam Kristus menjadi sumber kekuatan untuk hidup dan melayani.” Ketika kita tetap dekat dengan Kristus, kita memperoleh kekuatan untuk menghadapi kesulitan, menjalankan tanggung jawab, dan melayani dengan setia. Hal ini sejalan dengan Filipi 4:13, “Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku.” Ayat ini menunjukkan bahwa kemampuan kita untuk menghadapi berbagai keadaan tidak hanya berasal dari kekuatan diri sendiri, tetapi dari Kristus yang memberikan kekuatan. Mazmur 73:26 juga mengingatkan bahwa sekalipun tubuh dan hati kita menjadi lemah, Tuhan tetap menjadi kekuatan hati dan bagian kita untuk selama-lamanya. Karena itu, saat kita merasa tidak sanggup, kita tidak perlu menjauh atau menyerah. Justru saat itulah kita perlu semakin dekat kepada Kristus. Pelayanan juga membutuhkan hubungan yang dekat dengan Tuhan, sebab tanpa-Nya aktivitas pelayanan dapat menjadi sekadar rutinitas. Namun, ketika kita melayani karena kasih kepada Kristus, kita dapat tetap setia meskipun tidak selalu mendapatkan penghargaan atau hasil yang langsung terlihat.

Tinggal di dalam Kristus dapat dilakukan melalui hal-hal sederhana. Luangkan waktu untuk berdoa, membaca firman Tuhan, dan menyerahkan setiap kekhawatiran kepada-Nya. Ketika menghadapi tugas yang berat, jangan hanya mengandalkan kemampuan sendiri, tetapi mintalah pertolongan Tuhan. Dalam pelayanan, lakukan tanggung jawab dengan tulus dan tetaplah setia. Ingatlah bahwa kita tidak dipanggil untuk berjalan dengan kekuatan sendiri. Kristus adalah sumber kekuatan yang menolong kita untuk terus bertahan, bertumbuh, dan menghasilkan buah. Kiranya hidup dan pelayanan kita menunjukkan bahwa kita tinggal di dalam Kristus. Kepada-Nya, kita belajar bersandar, bukan kepada kekuatan dan kemampuan kita sendiri. Dengan demikian, hidup kita dapat menjadi kesaksian bahwa Kristus selalu menyertai kita. [RL]',
    '“Saat kekuatan kita habis, tetaplah melekat pada Kristus. Sebab di dalam-Nya, kita menemukan kekuatan untuk terus melangkah.”',
    'Tuhan Yesus, Pokok Anggur yang Benar, kami sadar bahwa terlepas dari-Mu kami tidak dapat berbuat apa-apa. Lindungi kami dari kesombongan yang merasa sanggup berjalan sendiri. Pautkanlah hati kami senantiasa kepada-Mu, agar aliran hidup-Mu memampukan kami menghasilkan buah kasih, damai, dan kesetiaan yang memberkati banyak jiwa. Amin.',
    '/devotionals/2026-10-08.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-09',
    'WHEN FEAR MEETS FAITH',
    'Kak Tania',
    'Mazmur 46:2-4',
    '(2) Sebab itu kita tidak akan takut,...(3) sekalipun ribut dan berbuih airnya,...(4) Kota Allah, kediaman Yang Mahatinggi, disukakan oleh aliran-aliran sebuah sungai.',
    'Dua tahun yang lalu, Thalia memulai suatu pekerjaan di tempat yang baru. Pada malam setelah menerima pemberitahuan mengenai penempatannya, Thalia mengalami kekhawatiran yang berlebihan. Ia merasa bahwa tempat itu tidak cocok untuk dirinya, apalagi ia baru pertama kali terjun ke lingkungan rumah sakit. Malam itu, ia tidak bisa tidur dan hanya menangis karena merasa tidak siap untuk masuk bekerja. Ternyata setelah menjalaninya, Thalia merasa bahwa tempat itu tidak semenakutkan yang dibayangkan sebelumnya.  
Setiap orang pasti pernah mengalami masa-masa tersulit dalam hidupnya. Kisah diatas mengingatkan kita, terkadang apa yang kita pikirkan dan kita bayangkan nyatanya tidak sama setelah kita menjalaninya. Ketika hendak memulai sesuatu, kita selalu bertanya kepada diri sendiri “apakah aku akan mampu bertahan dan melewatinya?”. Mazmur 46:2 memberikan jaminan luar biasa, ya benar kita punya Allah yang selalu menjadi tempat perlindungan dan kekuatan bagi kita. Tempat perlindungan yang berarti ketika kita merasa tidak aman, sedang dalam bahaya, atau merasa seolah-olah dunia menyerang kita, Tuhan mengundang kita untuk datang kepada-Nya. Ketika sudah datang kepada Tuhan, apakah 100% orang percaya akan terhindar dari ancaman/masalah?. Ayat 3-4 menunjukkan keadaan yang sangat menakutkan dan tidak dapat dikendalikan oleh kekuatan manusia seperti bumi berubah, gunung-gunung bergoncang, laut bergelora. Ditengah semuanya itu, pemazmur menginginkan kita untuk tetap percaya kepada Allah. Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala yang tidak kita lihat. Memiliki iman yang besar bukan berarti kita tidak akan mengalami ketakutan ditengah badai kehidupan, tetapi iman membuat kita tahu kepada siapa kita berlari ketika masalah itu datang. Kita boleh merasa lemah, khawatir, bahkan menangis, namun perlu diketahui kita tidak akan menghadapi semuanya sendirian. 
Sebagai manusia, sering kali ingin mengendalikan semua hal dalam hidup, berusaha mencari jalan keluar dengan mengandalkan kekuatan, kemampuan, dan kepintaran kita, padahal hal itu justru membuat kita menjadi semakin lelah. Pemazmur mau  kita berhenti sejenak untuk mengingat bahwa ada Tuhan yang jauh lebih besar. Mungkin saat ini kita sedang berada dalam badai kehidupan itu, ada sesuatu yang kita tidak mampu melewatinya, pastikan kita datang kepada Tuhan , sebab dia adalah penolong dalam kesesakan sangat terbukti. Kita mungkin tidak tahu apa yang menanti di depan, tapi kita tahu siapa yang berjalan bersama kita. [TTR]',
    '“Kita mungkin tidak tahu apa yang menanti di depan, tetapi kita tahu siapa yang berjalan bersama kita.”',
    'Allah Bapa yang Mahakuasa, Engkaulah kota benteng dan tempat perlindungan kami yang teguh di waktu kesesakan. Ketika ketakutan dan gelombang masalah menerpa hidup kami, tolonglah iman kami untuk tetap tenang dan memandang kepada kuasa-Mu. Kami percaya bahwa tidak ada badai yang sanggup menggoyahkan kami saat kami berada dalam lindungan-Mu. Amin.',
    '/devotionals/2026-10-09.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-10',
    'Beyond My Understanding',
    'Kak Mutiara',
    'Amsal 3:5-6',
    '(5) Percayalah kepada Tuhan dengan segenap hatimu,... (6) akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.',
    'Pada suatu ketika Seorang komika Indonesia yaitu bang Abdur diundang ke salah satu podcast terkenal. Dalam podcast tersebut beliau mengeluarkan kalimat yang membuat kita sebagai para penonton menjadi tercengang. "Kita naik kapal, kita tidak kenal nahkodanya, tapi kita percaya kita akan sampai di tujuan. Kita naik pesawat kita tidak kenal pilotnya tapi kita yakin kita sampai pada tujuan. Nah, dikehidupan ini Kita kenal Tuhan, Kita tau Dia, tapi kenapa kita masih ragu sampai pada tujuan kita?". kalimat ini menjadi refleksi besar bagi kita umat Manusia, seringkali memikirkan hal yang membuat kita semakin ragu dan tidak percaya akan kuasa Tuhan. 

Kehidupan sering kali membawa kita pada berbagai pilihan dan situasi yang tidak selalu mudah dipahami. kita mungkin memiliki banyak rencana, harapan, dan keinginan untuk masa depan. Namun, tidak semua hal berjalan sesuai dengan apa yang kita harapkan. Ada kalanya kita merasa khawatir, ragu, bahkan kehilangan arah ketika menghadapi ketidakpastian. Melalui Amsal 3:5–6, kita diajak untuk percaya kepada Tuhan dengan segenap hati dan tidak mengandalkan pengertian kita sendiri. Ayat ini mengajarkan bahwa kepercayaan kepada Tuhan bukan sekadar mengakui keberadaan-Nya, melainkan juga menyerahkan seluruh kehidupan, termasuk rencana, keputusan, kekhawatiran, dan masa depan kita ke dalam tangan-Nya. Sering kali, kita menganggap bahwa apa yang telah kita rencanakan merupakan jalan terbaik bagi kehidupan kita. Kita ingin segala sesuatu terjadi sesuai dengan waktu dan keinginan kita. Namun, sebagai manusia, kita memiliki keterbatasan dalam memahami apa yang akan terjadi di masa depan. Sebaliknya, Tuhan memiliki pengetahuan yang sempurna dan mengenal setiap kebutuhan kita. Apa yang menurut kita merupakan keterlambatan belum tentu merupakan sesuatu yang buruk dalam rancangan-Nya. Begitu pula, sesuatu yang kita anggap sebagai kegagalan tidak selalu berarti bahwa Tuhan telah meninggalkan kita. Terkadang, melalui berbagai pengalaman tersebut, Tuhan mengajar kita untuk bersabar, membentuk karakter, memperkuat iman, dan belajar bergantung sepenuhnya kepada-Nya. Oleh sebab itu, ketika kenyataan tidak sesuai dengan apa yang kita pikirkan, kita perlu belajar untuk tetap percaya kepada kuasa dan rencana Tuhan. Yeremia 29:11 juga mengingatkan bahwa Tuhan memiliki rancangan bagi umat-Nya, yaitu rancangan damai sejahtera dan bukan kecelakaan, untuk memberikan hari depan yang penuh harapan. Ayat ini mengajak kita untuk tetap memiliki pengharapan kepada Tuhan, sekalipun perjalanan yang sedang kita lalui terasa sulit dan berbeda dari apa yang telah kita bayangkan.

Sebagai keluarga iman PMK Katharos, kita diajak untuk membangun kehidupan yang berlandaskan kepercayaan kepada Tuhan. Ketika menghadapi kesulitan, kita tidak perlu berjalan sendirian karena Tuhan senantiasa menyertai kita. Kita juga dapat menjadi berkat bagi sesama dengan saling mendoakan, menguatkan, dan mengingatkan untuk tetap mengandalkan Tuhan. Tak pernah gagal rencana Tuhan dalam hidup kita, Pengharapan kita tidak akan hilang sebab masa depan kita disediakan oleh Tuhan yang sempurna.[MAS]',
    '"Tidak semua yang kita inginkan adalah yang kita butuhkan. Percayalah, Tuhan mengetahui apa yang terbaik bagi kehidupan kita."',
    'Tuhan, ajar kami untuk mempercayai-Mu dengan segenap hati dan tidak bersandar pada pengertian kami sendiri yang begitu terbatas. Dalam setiap keputusan, rencana, dan pergumulan kami, kami mau mengakui kedaulatan-Mu. Luruskanlah jalan kami dan pimpinlah langkah kami seturut dengan kehendak-Mu yang sempurna. Amin.',
    '/devotionals/2026-10-10.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-11',
    'Kasih yang Menerima dan Melayani',
    'Kak Avell',
    '1 Petrus 4:8-10',
    'Tetapi yang terutama: kasihilah sungguh-sungguh seorang akan yang lain, sebab kasih menutupi banyak sekali dosa…',
    'Dalam sebuah keluarga, tidak semua orang memiliki karakter dan cara berpikir yang sama. Ada yang mudah memahami kita, tetapi ada juga yang justru sering membuat kita kesal. Begitu pula dalam persekutuan. Kita bisa berbeda latar belakang, kepribadian, pendapat, bahkan cara melayani. Perbedaan itu kadang membuat kita ingin menjauh. Namun, Tuhan memanggil kita bukan untuk mencari Persekutuan yang selalu sesuai dengan keinginan kita, melainkan untuk belajar mengasihi orang-orang yang Dia tempatkan bersama kita.
Ayat renungan kita hari ini, Petrus menempatkan kasih sebagai dasar kehidupan keluarga iman. Ayat 8 berkata, “Tetapi yang terutama: kasihilah sungguh-sungguh seorang akan yang lain.” Kata “sungguh-sungguh” menunjukkan kasih yang tidak setengah hati dan tidak hanya diberikan ketika orang lain menyenangkan kita. Kasih dengan kesungguhan hati diperlukan karena Petrus tahu bahwa dalam kehidupan bersama akan ada kesalahan, konflik, dan kekecewaan. Karena itu, ia berkata bahwa kasih “menutupi banyak sekali dosa.” Ini bukan berarti kasih membenarkan kesalahan, tetapi kasih memilih untuk tidak terus mengungkit kesalahan dan membiarkan pengampunan memulihkan hubungan. Ayat 9 kemudian memperlihatkan bahwa kasih harus memiliki wujud nyata, yaitu melalui kesediaan menerima dan memberi ruang bagi sesama. Petrus secara khusus mengatakan, “Berilah tumpangan seorang akan yang lain dengan tidak bersungut-sungut.” Pada saat itu, memberi tumpangan bukan sekadar mempersilakan seseorang masuk ke tempat kita, tetapi merupakan bentuk kerelaan untuk membuka kehidupan dan berbagi apa yang dimiliki dengan orang lain. Ini menunjukkan bahwa kasih membutuhkan pengorbanan dan keterbukaan. Selanjutnya, ayat 10 menunjukkan wujud nyata kasih yang lain, yaitu kesediaan untuk melayani satu sama lain. Setiap orang telah menerima karunia, dan karunia itu harus dipakai untuk melayani. Artinya, Tuhan tidak memberikan karunia hanya supaya kita memiliki sesuatu yang dapat dibanggakan, tetapi supaya melalui karunia tersebut orang lain dapat mengalami kasih dan pertolongan. Kita tidak harus memiliki karunia yang sama, sebab justru perbedaan karunia membuat kita saling membutuhkan. Ketika kita menggunakan waktu, tenaga, perhatian, dan kemampuan yang Tuhan percayakan untuk membangun sesama, kita sedang menjadikan kasih itu nyata.
Sebagai Anak Tuhan, mari mulai membangun persekutuan melalui tindakan sederhana. Saat berbeda pendapat, belajar mendengar. Saat disakiti, belajar mengampuni. Saat melihat kebutuhan orang lain, jangan hanya menunggu orang lain bertindak,dan juga saling bahu membahu dalam pelayanan. Gunakan karunia yang Tuhan berikan untuk melayani, sekecil apa pun itu karena itulah wujud paling nyata dari kasih. [AVL]',
    '”Kasih yang nyata selalu menemukan cara untuk saling menerima perbedaan dan saling melayani.”',
    'Bapa yang Maha Pengasih, kobarkanlah kasih yang sungguh-sungguh di antara kami, sebab kasih menutupi banyak sekali dosa. Ajar kami untuk mempergunakan setiap talenta dan karunia yang telah Engkau percayakan demi saling melayani sebagai pengurus kasih karunia Allah yang setia dan tidak mementingkan diri sendiri. Amin.',
    '/devotionals/2026-10-11.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-12',
    'Kuat Karena Bersama',
    'Kak Yano',
    'Galatia 6 : 2',
    'Bertolong-tolonglah menanggung bebanmu! Demikianlah kamu memenuhi hukum Kristus.',
    'Hidup Bersama orang lain tidak selalu mudah. Setiap orang membawa cerita, pergumulan, tekanan, beban yang kadang tidak terlihat dari luar. Mahasiswa mungkin sedang berjuang menghadapi tugas, perkuliahan, masa depan, atau persoalan relasi. Keluarga muda dapat merasa Lelah mengurus rumah, anak, pekerjaan dan kebutuhan keluarga. Para pekerja pun menghadapi tuntutan pekerjaan, target, dan berbagai persoalan yang menguras pikiran. Galatia 6:2 mengingatkan, “Bertolong-tolonglah menanggung bebanmu! Demikianlah kamu memenuhi hukum Kristus.” Ayat ini menunjukkan bahwa kehidupan di dalam Kristus bukanlah kehidupan yang dijalani sendirian. Tuhan menempatkan kita dalam komunitas supaya dapat saling menguatkan, memperhatikan, dan hadir bagi satu sama lain.
Menanggung beban bukan berarti mengambil alih seluruh masalah orang lain atau memiliki jawaban atas setiap persoalan. Terkadang, bentuk kasih yang paling sederhana adalah mau mendengarkan tanpa menghakimi, menyediakan waktu ketika seseorang membutuhkan teman, menawarkan bantuan ketika melihat orang lain kewalahan, atau sekedar berkata, “Aku ada di sini untukmu.” Kepedulian juga berarti belajar peka terhadap keadaan orang di sekitar kita. Jangan sampai kita begitu sibuk dengan urusan sendiri sehingga tidak menyadari ada teman yang sedang terluka, pasangan yang membutuhkan perhatian, rekan kerja yang kelelahan, atau anggota keluarga yang sedang kehilangan semangat. Home In Christ berarti menjadikan Kristus sebagai pusat kehidupan bersama, sehingga rumah, kampus, tempat kerja, dan komunitas menjadi ruang di mana kasih Kristus dapat dirasakan melalui tindakan nyata.
Hari inim mari kita bertanya kepada diri sendiri: “Siapa di sekitar saya yang sedang membutuhkan kepedulian?” Mungkin jawabannya adalah teman kuliah yang mulai menjauh, pasangan yang membutuhkan perhatian, rekan kerja yang sedang menghadapi tekanan, atau seseorang yang selama ini kita anggap baik-baik saja. Jangan menunggu mereka meminta pertolongan. Ambilah langkah kecil untuk hadir, mendengar, mendoakan, dan membantu sesuai kemampuan kita. Sebaliknya, ketika kita sendiri sedang memikul beban, jangan merasa harus kuat sendirian dan tidak mau menerima bantuan saudara atau teman di sekitar. Izinkan saudara seiman hadir dan menopang kita. Ketika Kristus menjadi rumah bagi hati kita,  kasih-Nya mengalir melalui kehidupan kita kepada orang lain. Karena itu, mari menjadi pribadi yang bukan hanya mencari tempat pulang, tetapi juga menjadi tempat orang lain menemukan penghiburan, penerimaan, dan kekuatan di dalam Kristus. Kiranya setiap perjumpaan kita menjadi kesempatan untuk menghadirkan kasih, sehingga tidak ada seorang pun merasa berjalan sendirian, sebab di dalam Kristus kita dipanggil untuk hidup sebagai keluarga yang saling menopang dalam suka maupun duka bersama. [RYN]',
    'Akan lebih mudah melewati masalah secara bersama-sama dari pada harus memikulnya sendirian',
    'Tuhan Yesus, lembutkanlah hati kami agar memiliki kepekaan terhadap pergumulan saudara-saudari di sekitar kami. Berikan kami kerelaan untuk mengulurkan tangan, mendengarkan, dan saling menanggung beban dalam doa dan tindakan nyata, sehingga hukum kasih Kristus sungguh kami genapi dalam hidup bersama. Amin.',
    '/devotionals/2026-10-12.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-13',
    'MEMBANGUN RELASI',
    'Kak Vicky',
    'Pengkhotbah 4:9-10',
    'Berdua lebih baik dari pada seorang diri, karena mereka menerima upah yang baik dalam jerih payah mereka. Karena kalau mereka jatuh, yang seorang mengangkat temannya, tetapi wai orang yang jatuh, yang tidak mempunyai orang lain untuk mengangkatnya!',
    'Manusia adalah makhluk sosial, dimana manusia tidak dapat hidup sendiri. Manusia membutuhkan manusia lain untuk dapat saling berkomunikasi, saling berinteraksi, saling bekerja sama dalam menyelesaikan suatu pekerjaan.
Pengkhotbah 4:9-10, “Berdua lebih baik dari pada seorang diri, karena mereka menerima upah yang baik dalam jerih payah mereka. Karena kalau mereka jatuh, yang seorang mengangkat temannya, tetapi wai orang yang jatuh, yang tidak mempunyai orang lain untuk mengangkatnya!” Ayat ini menegaskan dan mengajarkan bahwa hidup berdampingan, bekerja sama dan membangun relasi jauh lebih produktif daripada hidup menyendiri. Tugas atau pekerjaan yang dikerjakan bersama-sama akan terasa lebih ringan, lebih mudah dikerjakan bersama-sama, dapat lebih efisien waktu dan tenaga. Butuh kerendahan hati untuk membangun relasi dan menerima keberadaan orang lain yang berbeda karakter/ kebiasaan, untuk mencapai tujuan yang sama. Dengan adanya relasi dengan orang lain, kita dapat saling menolong dan menopang saat ada yang membutuhkan pertolongan. Begitupun dalam persekutuan. Pelayanan yang dikerjakan bersama-sama akan terasa lebih mudah dan menyenangkan. Terkadang kita merasa bahwa kita mampu mengerjakan pelayanan sendiri (egois), tanpa melibatkan rekan-rekan sepelayanan. Tanpa kita sadari bahwa kita sebagai anggota tubuh Kristus, memiliki tugas dan fungsinya masing-masing yang saling melengkapi. Kristus adalah kepala dan kita adalah anggota-anggota tubuh Kristus, sehingga Kristus menjadi pusat pelayanan kita. Dengan menyadari dan memahami bahwa kita masing-masing merupakan bagian yang tidak dapat dipisahkan satu dengan yang lain dalam pelayanan, maka sudah seharusnya kita hidup saling menolong, menopang satu sama lain. Kerendahan hati dan menganggap orang lain lebih utama dari diri kita, dapat membuat relasi kita dengan rekan sepelayanan semakin kuat. Jika relasi/ hubungan antar pelayan semakin kuat, maka akan lebih mudah untuk dapat melayani saudara-saudara kita yang lain yang butuh pertolongan dan pelayanan kita. Dalam persekutuan, jika ada yang terjatuh, kita dapat saling membantu, menolong dan menopang untuk terus bertumbuh bersama di dalam Kristus.
Dalam pelayanan, membangun relasi/ hubungan antar pelayan dan anggota persekutuan, dapat menolong kita untuk bertumbuh bersama didalam Kristus sebagai anggota keluarga Allah. Dengan membangun relasi dalam persekutuan, kita dapat  saling menolong, menopang, mengingatkan satu dengan yang lain untuk terus bertumbuh di dalam iman kepada Kristus. Kasih, kerendahan hati dan sikap menerima perbedaan karakter/ kebiasaan orang lain merupakan kunci membangun hubungan/ relasi antar pelayan dan anggota persekutuan. Teruslah membangun relasi/ hubungan yang saling menerima, mengasihi dan menguatkan sebagai satu keluarga Allah yang bertumbuh bersama dalam Iman. [VS]',
    'Membangun relasi yang baik, kita dapat saling membantu, menolong dan menopang untuk terus bertumbuh didalam Kristus',
    'Tuhan, terima kasih untuk sahabat-sahabat dan komunitas iman yang Engkau tempatkan di sisi kami. Jauhkanlah kami dari rasa egois dan keinginan untuk menyendiri. Ajar kami untuk menghargai kebersamaan, saling menopang saat salah satu dari kami terjatuh, dan menjadi tali bersimpul tiga yang tidak mudah diputuskan. Amin.',
    '/devotionals/2026-10-13.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-14',
    'One in Christ, One in Love',
    'Mutiara',
    'Efesus 4:2-3',
    '(2) Hendaklah kamu selalu rendah hati, lemah lembut, dan sabar,... (3)... Dan berusahalah memelihara kesatuan Roh oleh ikatan damai sejahtera.',
    'Setiap orang memiliki cara berpikir, karakter, dan cara pandang yang berbeda dalam menjalani kehidupan. Ketika berkumpul sebagai satu keluarga iman, kita tidak hanya bertemu dengan orang-orang yang memiliki kesamaan dalam iman kepada Kristus, tetapi juga dengan mereka yang memiliki kepribadian dan latar belakang yang beragam. Dalam kebersamaan tersebut, tidak jarang muncul perbedaan pendapat, kesalahpahaman, bahkan konflik yang dapat memengaruhi hubungan antarsesama. Terkadang, kita lebih mudah mempertahankan pendapat sendiri daripada mencoba memahami orang lain.

Melalui Efesus 4:2–3, Rasul Paulus mengingatkan bahwa kehidupan sebagai pengikut Kristus harus ditandai dengan kerendahan hati, kelemahlembutan, kesabaran, dan kasih dalam menghadapi satu sama lain. Sikap-sikap tersebut merupakan dasar penting dalam membangun hubungan yang harmonis dan menjaga kesatuan jemaat. Kerendahan hati mengajarkan kita untuk tidak selalu menganggap diri sendiri paling benar, melainkan bersedia mendengarkan dan menghargai pendapat orang lain. Kelemahlembutan mengingatkan kita agar tidak mudah membalas perkataan atau tindakan yang menyakiti hati dengan kemarahan. Sementara itu, kesabaran mengajarkan kita untuk memberikan ruang bagi orang lain untuk bertumbuh dan berubah tanpa terburu-buru menghakimi kekurangannya. Semua sikap tersebut harus dilandasi oleh kasih, sebagaimana Kristus telah terlebih dahulu mengasihi dan menerima kita. Kesatuan bukanlah sesuatu yang dapat dipertahankan hanya dengan kata-kata, melainkan harus diwujudkan melalui tindakan nyata dalam kehidupan sehari-hari. Kita perlu menyadari bahwa setiap orang memiliki kelemahan dan tidak ada seorang pun yang sempurna. Oleh karena itu, daripada terus mempermasalahkan kekurangan orang lain, kita seharusnya belajar untuk saling memahami, mengampuni, dan memberikan kesempatan kepada sesama untuk bertumbuh. Dengan demikian, kasih Kristus menjadi dasar yang mempersatukan kita, sekalipun terdapat berbagai perbedaan di antara kita. 

Melalui tema Home in Christ, kita diingatkan bahwa Kristus adalah dasar dan pusat kehidupan keluarga iman kita. Di dalam Kristus, kita belajar bahwa kasih bukan hanya tentang menerima orang-orang yang sesuai dengan keinginan kita, tetapi juga tentang mengasihi mereka yang memiliki perbedaan dengan kita. Oleh karena itu, marilah kita terus memelihara kesatuan dalam kasih, membangun hubungan yang penuh kerendahan hati, dan menjadi keluarga iman yang saling menguatkan. Dengan demikian, kita dapat menjadi persekutuan yang menghadirkan kasih Kristus dan menjadi tempat bagi setiap anggotanya untuk bertumbuh bersama dalam iman.[MAS]',
    '"Kesatuan bukan berarti kita harus selalu sama, melainkan bersedia saling menerima, mengasihi, dan berjalan bersama di dalam Kristus."',
    'Ya Bapa, karuniakanlah kepada kami roh kerendahan hati, kelemahlembutan, dan kesabaran untuk saling menunjukkan kasih di tengah segala perbedaan kepribadian kami. Peliharalah kesatuan Roh di antara kami oleh ikatan damai sejahtera, agar persekutuan kami senantiasa memuliakan nama-Mu. Amin.',
    '/devotionals/2026-10-14.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-15',
    'KELUARGA IMAN BERBAHAN DASAR KASIH',
    'Kak Jeje',
    'Filipi 2:1–4',
    'Jadi karena dalam Kristus ada nasihat, ada penghiburan kasih, ada persekutuan Roh, ada kasih mesra dan belas kasihan,... dan janganlah tiap-tiap orang hanya memperhatikan kepentingannya sendiri, tetapi kepentingan orang lain',
    'Secara naluriah, kita sering kali tanpa sadar menjadikan diri sendiri sebagai pusat dunia. Kebutuhan, perasaan, dan keuntungan pribadi hampir selalu jadi prioritas utama—terlebih di tengah zaman yang menuntut kita untuk serba mandiri dan mengutamakan diri sendiri. Namun, pernahkah Anda merasa ada yang hampa ketika hidup hanya berputar pada kata "aku"? Sebagai pengikut Kristus, kita sebenarnya dipanggil ke dalam pola hidup yang sangat bertolak belakang dengan arus dunia ini. Kita tidak dirancang untuk berjuang sendirian atau saling bersaing, melainkan dipanggil untuk mengalami kehangatan sebuah komunitas yang saling menopang. Pertanyaannya, bagaimana caranya melepaskan fokus dari diri sendiri dan mulai melihat sesama tanpa merasa dirugikan?

Rasul Paulus dalam Filipi 2:1–4. Ia mengingatkan bahwa keberadaan kita dalam Kristus—seperti hiburan kasih, persekutuan Roh, dan belas kasihan—seharusnya mendorong kita untuk hidup dalam satu jiwa dan satu tujuan. Paulus secara tegas menasihatkan agar kita melupakan ambisi pribadi atau puji-pujian yang sia-sia, dan dengan rendah hati menganggap orang lain lebih penting daripada diri sendiri. Di sinilah intisari iman diuji: belajar memperhatikan kepentingan sesama sebagai bagian dari keluarga iman. Keangkuhan dan sikap egois adalah musuh utama dalam persekutuan. Kristus sendiri telah memberi teladan sempurna ketika Ia melepaskan hak-hak-Nya demi melayani dan menyelamatkan manusia. Sebagaimana tertulis dalam Galatia 6:2, bertolong-tolongan menanggung beban adalah cara kita memenuhi hukum Kristus. Jadi, memperhatikan kepentingan orang lain bukanlah kerugian atau formalitas belaka, melainkan bukti nyata dari kerendahan hati yang telah diubahkan oleh kasih Kristus.

Memperhatikan kepentingan orang lain dalam komunitas rohani tidak terjadi secara otomatis, melainkan butuh kesadaran dan komitmen harian. Hal ini dapat dimulai dari tindakan sederhana di lingkungan kampus, seperti peka mendengarkan pergumulan kuliah saudara seiman, saling membantu saat kesulitan akademis, hingga mendoakan pergumulan pribadi tanpa penghakiman. Ketika setiap anggota dan pengurus  rela menurunkan ego serta keluar dari zona nyaman, kita sedang membangun persekutuan yang tidak hanya hangat secara organisasi, tetapi juga berdampak secara rohani. Kesimpulannya, marilah kita memohon pimpinan Roh Kudus agar memampukan kita mengikis sikap acuh tak acuh. Kiranya keberadaan komunitas rohani menjadi wadah di mana kasih Kristus nyata tercermin—di mana setiap mahasiswa saling menopang, menguatkan, dan menjadi berkat nyata bagi sesama di kampus. [JPA]',
    '"Bukan tentang ''aku'' lagi, tapi tentang keberadaan ''kita'' dalam keluarga Kristus."',
    'Tuhan Yesus, teladan kasih dan kerendahan hati yang sejati, bersihkanlah hati kami dari ambisi pribadi dan kesombongan yang sia-sia. Ajar kami untuk menganggap orang lain lebih utama dari diri kami sendiri, dan memberi perhatian tulus bagi kebutuhan serta kesejahteraan sesama kami dengan sukacita. Amin.',
    '/devotionals/2026-10-15.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-16',
    'Mengasihi Karena Telah Dikasihi',
    'Kak Sarah',
    '1 Yohanes 4:19-21',
    'Kita mengasihi, karena Allah lebih dahulu mengasihi kita. 
Jikalau seorang berkata: "Aku mengasihi Allah," dan ia membenci saudaranya, maka ia adalah pendusta,...',
    '1 Yohanes 4:19-21 mengingatkan kita bahwa kasih kepada sesama bukanlah sesuatu yang bisa kita mulai sendiri. Dasarnya adalah kasih Allah yang terlebih dahulu diberikan kepada kita. “Kita mengasihi, karena Allah lebih dahulu mengasihi kita.” Sebelum kita mampu mengasihi orang lain, terlebih dahulu kita telah menerima kasih Allah yang begitu besar melalui Yesus Kristus. Kasih-Nya tidak bergantung pada kesempurnaan kita. Justru ketika kita masih memiliki banyak kekurangan, Allah tetap memilih untuk mengasihi kita.
Karena itu, kasih yang kita terima dari Allah seharusnya tidak berhenti hanya pada diri kita. Kasih tersebut perlu diwujudkan dalam kehidupan sehari-hari melalui cara kita memperlakukan orang lain. Mengasihi sesama bukan hanya tentang mengatakan bahwa kita mengasihi, tetapi juga tentang belajar memahami, mengampuni, menolong, menghargai, dan hadir bagi orang lain ketika mereka membutuhkan.
Dari ayat 20 memberikan teguran yang sangat jelas. Tidak mungkin kita berkata bahwa kita mengasihi Allah yang tidak kelihatan, tetapi pada saat yang sama membenci saudara yang ada di hadapan kita. Hal ini menunjukkan bahwa kasih kepada Allah seharusnya terlihat melalui kasih kita kepada sesama. Hubungan kita dengan Tuhan tidak dapat dipisahkan dari cara kita memperlakukan orang-orang di sekitar kita.
Dalam kehidupan sehari-hari, mungkin ada orang yang sulit kita kasihi. Ada yang pernah mengecewakan, menyakiti, berbeda pendapat, atau tidak memperlakukan kita sebagaimana yang kita harapkan. Namun, firman Tuhan mengajak kita untuk kembali mengingat: kita pun dikasihi Allah bukan karena kita selalu benar atau sempurna. Jika Allah telah terlebih dahulu mengasihi kita, maka kita juga dipanggil untuk belajar memberikan kasih itu kepada orang lain. Kiranya kasih Allah yang kita terima tidak hanya menjadi sesuatu yang kita rasakan, tetapi juga sesuatu yang dapat dirasakan oleh orang-orang di sekitar kita.(SAR)',
    '“Karena Allah lebih dahulu mengasihi kita, marilah kita mengasihi sesama dengan tulus melalui perkataan, sikap, dan tindakan kita.”',
    'Bapa, kami bersyukur karena Engkau telah lebih dahulu mengasihi kami melalui pengorbanan Yesus di kayu salib. Jangan biarkan kasih kami kepada-Mu hanya berhenti di bibir saja, melainkan nyatakanlah melalui tindakan nyata dalam mengasihi, mengampuni, dan memberkati saudara-saudara kami setiap hari. Amin.',
    '/devotionals/2026-10-16.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-17',
    'Bertumbuh Bersama di Dalam Kristus',
    'Mutiara',
    'Ibrani 10:24-25',
    '(24)Dan marilah kita saling memperhatikan supaya kita saling mendorong dalam kasih dan dalam pekerjaan baik. (25),... tetapi marilah kita saling menasihati, dan semakin giat melakukannya menjelang hari Tuhan yang mendekat.',
    'Dalam kehidupan, kita tidak selalu mampu menghadapi setiap pergumulan seorang diri. Ada kalanya kita merasa lelah, kehilangan semangat, atau membutuhkan dukungan dari orang lain. Di tengah kesibukan, kita terkadang melupakan pentingnya persekutuan dan kebersamaan. Padahal, Tuhan memanggil kita untuk saling mengasihi, memperhatikan, dan menguatkan dalam perjalanan iman. Persekutuan bukan sekadar tempat untuk berkumpul, melainkan tempat bagi kita untuk bertumbuh bersama di dalam Kristus.

Melalui renungan ini,  kita diingatkan untuk saling memperhatikan dan mendorong satu sama lain dalam kasih serta perbuatan baik. Firman Tuhan mengajarkan bahwa kehidupan iman tidak hanya berfokus pada hubungan pribadi kita dengan Tuhan, tetapi juga pada bagaimana kita memperhatikan dan membangun kehidupan rohani sesama. Saling memperhatikan berarti memiliki kepedulian terhadap keadaan orang lain, bukan hanya ketika mereka mengalami kesulitan, tetapi juga dalam proses pertumbuhan iman mereka. Kita dipanggil untuk memberikan semangat kepada mereka yang mulai kehilangan pengharapan, mengingatkan mereka yang mulai menjauh dari Tuhan, serta mendukung setiap usaha yang dilakukan untuk hidup sesuai dengan kehendak-Nya. Selain itu, ayat ini juga mengingatkan pentingnya tidak menjauhkan diri dari pertemuan ibadah. Berkumpul bersama sebagai orang percaya memberikan kesempatan bagi kita untuk bersekutu, berdoa, mendengarkan firman Tuhan, dan saling menguatkan. Kehadiran kita dalam persekutuan bukan hanya bermanfaat bagi diri sendiri, tetapi juga dapat menjadi berkat bagi orang lain. Terkadang, kehadiran dan perhatian sederhana dari seseorang dapat memberikan semangat baru bagi mereka yang sedang menghadapi pergumulan. Oleh karena itu, kita perlu menyadari bahwa setiap anggota memiliki peran penting dalam membangun kehidupan persekutuan. Melalui kasih, kepedulian, dan kebersamaan, kita dapat saling membantu untuk tetap setia kepada Tuhan dan terus bertumbuh dalam iman.

Sebagai keluarga iman, kita dipanggil untuk saling menerima, mengasihi, dan menguatkan sebagai satu keluarga di dalam Kristus. Sesuai dengan tema Home in Christ, Kristus adalah tempat kita bernaung dan dasar yang mempersatukan kita. Jangan biarkan kesibukan atau perbedaan membuat kita menjauh satu sama lain. Marilah kita terus menjaga kebersamaan, saling mendoakan, dan mendukung pertumbuhan iman setiap anggota. Dengan demikian, kita dapat menjadi keluarga iman yang menghadirkan kasih Kristus dan bertumbuh bersama dalam iman. [MAS]',
    '"Iman tidak hanya bertumbuh ketika kita berjalan bersama Tuhan, tetapi juga ketika kita saling menggenggam dan menguatkan dalam perjalanan bersama"',
    'Tuhan, terima kasih atas anugerah persekutuan yang Engkau sediakan bagi kami. Berikan kami kesetiaan untuk tidak menjauhkan diri dari pertemuan-pertemuan ibadah, melainkan saling menasihati, menguatkan, dan memicu satu sama lain dalam kasih serta perbuatan-perbuatan baik menjelang hari kedatangan-Mu. Amin.',
    '/devotionals/2026-10-17.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-18',
    'Satu Keluarga, Saling Mendoakan',
    'Mutiara',
    'Yakobus 5:16',
    'Karena itu hendaklah kamu saling mengaku dosamu dan saling mendoakan, supaya kamu sembuh. Doa orang yang benar, bila dengan yakin didoakan, sangat besar kuasanya.',
    'Dalam sebuah keluarga, setiap orang tidak selalu berada dalam keadaan yang sama. Ada saatnya seseorang merasa kuat, tetapi ada juga waktu ketika ia lelah, kecewa, atau sedang menghadapi pergumulan yang tidak mudah diceritakan kepada orang lain. Demikian juga dalam keluarga iman. Kita dipanggil bukan hanya untuk hadir bersama ketika semuanya baik-baik saja, tetapi juga untuk menjadi tempat yang aman bagi saudara seiman ketika mereka sedang membutuhkan dukungan. Yakobus mengingatkan bahwa kehidupan iman tidak dijalani seorang diri. Ada kejujuran untuk mengakui kelemahan dan ada kasih untuk mendoakan satu sama lain.

Doa juga merupakan bentuk kasih yang nyata kepada saudara seiman. Kita mungkin tidak selalu mampu memberikan solusi atas masalah yang sedang dihadapi seseorang, tetapi kita dapat membawa pergumulannya kepada Tuhan. Ketika kita saling mendoakan, kita menunjukkan bahwa kita peduli dan tidak membiarkan saudara kita berjalan sendirian. “Doa orang yang benar, bila dengan yakin didoakan, sangat besar kuasanya” mengajarkan bahwa doa bukan sekadar kata-kata, tetapi ungkapan kepercayaan kepada Tuhan yang bekerja dalam kehidupan setiap orang. Karena itu, dalam keluarga iman ada saat ketika kita menguatkan dan ada saat ketika kita membutuhkan penguatan. Ada waktu untuk mendoakan dan ada waktu untuk didoakan. Semua itu menjadi bagian dari perjalanan bersama untuk semakin bertumbuh dalam iman kepada Kristus. Ketika kita mau terbuka kepada Tuhan dan kepada saudara seiman yang dapat dipercaya, kita memberi ruang bagi pemulihan dan pertumbuhan. Doa pun menjadi bentuk kasih yang nyata. Mungkin kita tidak selalu mampu menyelesaikan masalah orang lain, tetapi kita dapat membawa pergumulan mereka kepada Tuhan. Dalam keluarga iman, doa bukan sekadar kata-kata, melainkan tanda bahwa kita peduli dan tidak membiarkan saudara kita berjalan sendirian. Karena itu, hendaknya PMK Katharos menjadi keluarga iman yang saling menerima, menjaga kepercayaan, mendoakan, dan menguatkan.

Hari ini, mari kita belajar untuk tidak hanya berdoa bagi diri sendiri. Perhatikan saudara di sekitar kita, mungkin ada yang sedang membutuhkan dukungan tetapi belum mampu mengatakannya. Jadilah pribadi yang mau mendengar tanpa menghakimi dan mendoakan tanpa pamrih. Ketika kejujuran dan doa hadir dalam kehidupan bersama, keluarga iman dapat menjadi tempat di mana setiap orang mengalami kasih Kristus dan semakin bertumbuh dalam iman. [MAS]',
    '“Keluarga iman bukan tentang siapa yang paling kuat, tetapi tentang bagaimana kita saling menopang ketika salah satu mulai lemah.”',
    'Bapa yang mendengar setiap seruan hati kami, karuniakanlah kami keberanian untuk saling membuka diri dan saling mendoakan dengan tulus. Kami percaya doa orang yang benar bila dengan yakin didoakan sangat besar kuasanya. Jamahlah setiap sahabat kami yang sedang terluka, sakit, atau bergumul berat, dan nyatakanlah pemulihan-Mu. Amin.',
    '/devotionals/2026-10-18.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-19',
    '“Bernaung dalam Sang Gembala”',
    'Kak Adnan',
    'Mazmur 23:1-6',
    'Mazmur Daud. TUHAN adalah gembalaku, takkan kekurangan aku. Ia membaringkan aku di padang yang berumput hijau, Ia membimbing aku ke air yang tenang; Ia menyegarkan jiwaku. Ia menuntun aku di jalan yang benar oleh karena nama-Nya....',
    'Bayangkan sebuah rumah di tengah hujan deras. Angin boleh bertiup dan hujan boleh turun, tetapi orang-orang di dalamnya tetap memiliki tempat untuk berlindung. Rumah menjadi tempat untuk kembali, beristirahat, dan saling menguatkan. Demikian pula kehidupan kita. Di tengah pergumulan, tekanan, dan ketidakpastian, kita membutuhkan tempat hati menemukan keamanan. Mazmur 23 menunjukkan bahwa Tuhan adalah tempat bernaung kita.
Daud membuka Mazmur 23 dengan pengakuan, “TUHAN adalah gembalaku, takkan kekurangan aku.” Seorang gembala bukan hanya menyediakan kebutuhan domba, tetapi juga menuntun, menjaga, dan membawa domba ke tempat yang aman. Gambaran ini menunjukkan bahwa kehidupan orang percaya tidak berjalan tanpa arah, sebab Tuhan hadir sebagai Gembala yang memimpin setiap langkah. Ia membaringkan kita di padang yang berumput hijau, membimbing ke air yang tenang, menyegarkan jiwa, dan menuntun di jalan yang benar. Bahkan ketika melewati lembah kekelaman, Daud tidak mengatakan bahwa lembah itu tidak ada. Ia justru percaya bahwa Tuhan menyertainya. Kita pun harus seperti Daud, Kristus bukan sekadar tempat kita datang ketika membutuhkan pertolongan, tetapi rumah sejati dan dasar kehidupan yang menjadi tempat kita tinggal serta bertumbuh setiap hari. Karena itu, kita anggota keluarga PMK Katharos dipanggil menghadirkan suasana rumah di dalam persekutuan. Rumah yang sehat bukanlah rumah tanpa masalah, melainkan tempat setiap orang diterima, didengarkan, dikasihi, dan dikuatkan ketika lemah. Dalam kehidupan sehari-hari, kita dapat mewujudkannya dengan belajar mendengar sebelum menghakimi, menerima perbedaan, menolong anggota yang mengalami kesulitan, menguatkan yang kehilangan semangat, serta mendoakan satu sama lain. Ketika Kristus menjadi pusat, relasi tidak dibangun berdasarkan kesamaan atau kenyamanan, tetapi berdasarkan kasih yang rela menerima dan melayani. Mazmur ini juga mengingatkan bahwa kebajikan dan kemurahan Tuhan mengikuti kita seumur hidup. Karena itu, kita tidak perlu berjalan sendirian. Sebagai satu keluarga Allah, kita dipanggil untuk saling mengingatkan bahwa di tengah dunia yang terus berubah, ada rumah yang tidak terguncangkan, yaitu Kristus sendiri. Di dalam Dia, kita belajar bertumbuh bersama, melewati lembah bersama, saling menopang, dan menikmati penyertaan Tuhan bersama.
Pada akhirnya, kita di undang untuk menjadikan Kristus sebagai rumah hati dan dasar kehidupan. Kiranya PMK Katharos menjadi keluarga iman yang menghadirkan kasih Kristus: tempat setiap orang diterima, dikuatkan, dan bertumbuh. Ketika Kristus menjadi Gembala dan pusat kehidupan, kita bukan hanya menemukan tempat bernaung, tetapi juga dipanggil menjadi tempat bernaung bagi sesama.[AJP]',
    '“Ketika Kristus menjadi rumah, badai tak lagi menakutkan; di dalam-Nya kita bernaung, bertumbuh, dan dikuatkan.”',
    'Tuhan adalah Gembalaku, takkan kekurangan aku. Terima kasih Tuhan karena Engkau menuntun kami ke padang yang berumput hijau dan membimbing kami ke air yang tenang. Sekalipun kami harus berjalan dalam lembah kekelaman, kami tidak takut bahaya, sebab gada dan tongkat-Mu itulah yang menghibur dan melindungi kami senantiasa. Amin.',
    '/devotionals/2026-10-19.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-20',
    'Kelegaan Sejati dalam Kristus',
    'Kak Vemy',
    'Matius 11:28–30',
    'Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi kelegaan kepadamu. Pikullah kuk yang kupasang dan belajarlah pada-Ku, karena Aku lemah lembut dan rendah hati dan jiwamu akan mendapat ketenangan...',
    'Dalam kehidupan sehari-hari, kita sering dihadapkan pada berbagai tuntutan yang membuat tubuh dan pikiran terasa lelah. Tugas kuliah, pekerjaan, dan tanggung jawab keluarga bisa menjadi beban yang berat. Tidak jarang kita merasa kehilangan arah dan kekuatan untuk melanjutkan perjalanan. Namun, di tengah keletihan itu, Yesus memberikan undangan yang penuh kasih: datanglah kepada-Nya. Ia menjanjikan kelegaan yang tidak dapat diberikan oleh dunia.

Matius 11:28–30 menegaskan bahwa Yesus adalah sumber kelegaan bagi jiwa yang penat. Kata “datanglah” menuntut tindakan aktif dari orang percaya untuk mendekat kepada Kristus, bukan sekadar menunggu. Beban yang dimaksud bukan hanya kesulitan hidup, tetapi juga tekanan hukum Taurat yang berat bagi orang Yahudi pada masa itu. Yesus menawarkan kuk yang berbeda: kuk yang lembut dan ringan karena Ia sendiri turut memikulnya bersama kita. Analisis ini menunjukkan bahwa kelegaan sejati tidak ditemukan dalam usaha manusia semata, melainkan dalam hubungan pribadi dengan Kristus yang penuh kasih. Ia mengajar dengan rendah hati, sehingga setiap orang yang mau belajar dari-Nya akan menemukan damai yang melampaui pengertian.

Sebagai mahasiswa, kita sering merasa terbebani oleh tugas, ujian, dan tekanan masa depan. Sebagai anggota keluarga, tanggung jawab untuk mendukung dan mengasihi sesama juga bisa terasa berat. Namun, firman ini mengingatkan bahwa kita tidak harus menanggung semuanya sendiri. Dengan doa dan iman, kita dapat menyerahkan beban kepada Kristus dan belajar berjalan bersama-Nya. Praktisnya, luangkan waktu untuk berdoa sebelum memulai aktivitas, belajar mengatur prioritas, dan tetap mengandalkan Tuhan dalam setiap keputusan. Ingatlah, kelegaan sejati bukan berarti bebas dari masalah, tetapi memiliki kekuatan untuk menghadapinya bersama Kristus. [VMY]',
    '"Ketika beban terasa berat, datanglah kepada Kristus, sebab di dalam Dia kuk menjadi ringan dan jiwa menemukan damai."',
    'Tuhan Yesus, kami datang kepada-Mu dengan segala keletihan jasmani, beban pikiran, dan pergumulan hati kami. Kami menyambut undangan kasih-Mu untuk bertelut di kaki-Mu dan menerima kelegaan jiwa yang sejati. Ajar kami belajar dari-Mu yang lemah lembut dan rendah hati, sehingga kami menemukan ketenteraman abadi. Amin.',
    '/devotionals/2026-10-20.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-21',
    'We Are One',
    'Kak Isna',
    'Roma 12:4-5',
    '(4)Sebab sama seperti pada satu tubuh kita mempunyai banyak anggota,... (5)demikian juga kita, walaupun banyak, adalah satu tubuh di dalam Kristus; tetapi kita masing-masing adalah anggota yang seorang terhadap yang lain.',
    'Dalam kehidupan sehari-hari, kita sering menemukan bahwa setiap orang memiliki kemampuan, karakter, dan tanggung jawab yang berbeda. Ada yang pandai berbicara, ada yang lebih nyaman bekerja di balik layar, ada yang mampu memimpin, sementara yang lain setia mendukung dan menguatkan. Perbedaan seperti ini terkadang membuat kita membandingkan diri dengan orang lain. Kita dapat merasa kurang berarti ketika melihat kemampuan seseorang yang menonjol. Namun, Roma 12:4–5 mengingatkan bahwa dalam Kristus, perbedaan bukan alasan untuk merasa rendah diri atau meninggikan diri. Seperti satu tubuh yang memiliki banyak anggota dengan tugas yang berbeda, demikian pula setiap orang percaya ditempatkan dalam peran yang berbeda untuk tujuan yang sama. Karena itu, kita dipanggil untuk melihat diri bukan sebagai pribadi yang berdiri sendiri, melainkan sebagai bagian dari tubuh Kristus yang saling membutuhkan.
Roma 12:4–5 menunjukkan bahwa satu tubuh tidak mungkin berfungsi dengan baik jika semua anggotanya ingin melakukan tugas yang sama. Mata memiliki fungsi yang berbeda dari tangan, demikian pula tangan berbeda dari kaki, tetapi semuanya bekerja bersama untuk mendukung tubuh. Gambaran ini menolong kita memahami kehidupan dalam keluarga, kampus, pelayanan, maupun komunitas iman. Tidak semua orang harus menjadi pemimpin, pembicara, atau orang yang terlihat di depan. Ada yang bertugas mengatur, melayani, mendengarkan, mendoakan, menghibur, mengajar, atau memberi dukungan. Setiap peran memiliki nilai ketika dilakukan dengan kasih. Efesus 4:16 juga menggambarkan bahwa tubuh Kristus bertumbuh ketika setiap bagian menjalankan fungsinya. Karena itu, kita tidak perlu iri terhadap peran orang lain dan tidak boleh meremehkan peran sendiri. Perbedaan justru menjadi kekuatan ketika kita bersedia bekerja sama dan menghargai kontribusi setiap anggota.
Lalu, bagaimana kita menerapkannya? Mulailah dengan menerima bahwa Tuhan memberi setiap orang kemampuan dan kesempatan yang berbeda. Kenali apa yang dapat kita lakukan, lalu gunakanlah itu untuk membangun sesama, bukan untuk mencari pengakuan. Di sisi lain, belajarlah menghargai orang yang berbeda. Ketika ada teman yang lebih mampu memimpin, dukunglah; ketika ada yang sedang lemah, kuatkanlah; ketika kita mendapat kesempatan melayani, lakukan dengan setia dan rendah hati. Jangan bertanya, “Mengapa aku tidak seperti dia?” tetapi tanyakan, “Bagaimana aku dapat memakai bagianku untuk menjadi berkat?” Kesatuan bukan berarti semua orang harus sama. Kesatuan berarti perbedaan dapat berjalan bersama dalam kasih karena memiliki satu tujuan di dalam Kristus. Ketika setiap anggota menjalankan fungsinya dan saling melengkapi, tubuh Kristus dapat menjadi kesaksian tentang kasih dan kesatuan. Mari kita belajar berkata, “Aku tidak harus menjadi seperti orang lain untuk menjadi berarti; aku hanya perlu setia menjadi bagian yang Tuhan percayakan dengan hati yang bersyukur.” [HD]',
    '“Kita tidak harus memiliki peran yang sama untuk menjadi berarti; dalam tubuh Kristus, setiap perbedaan memiliki tujuan untuk saling melengkapi.”',
    'Tuhan Pencipta yang Agung, Engkau menempatkan kami dengan berbagai rupa karunia, latar belakang, dan talenta yang unik. Mampukan kami untuk saling melengkapi dan tidak membanding-bandingkan diri, melainkan bersatu hati melayani sebagai satu tubuh Kristus yang saling membutuhkan dan saling membangun. Amin.',
    '/devotionals/2026-10-21.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-22',
    'KITA ADALAH KELUARGA',
    'Yayu',
    '1 Korintus 12:12–27',
    'Tidak ada yang berjalan sendirian dalam tubuh Kristus...',
    'Pernahkah kita pulang ke suatu tempat dan merasa, “Di sini aku diterima apa adanya”? Rumah bukan hanya tentang bangunan, tetapi tentang orang-orang yang membuat kita merasa aman, didengar, dan tidak sendirian. Dalam sebuah keluarga, setiap orang memiliki karakter dan kebiasaan yang berbeda, tetapi perbedaan itu tidak membuat mereka berhenti menjadi keluarga. Begitu juga dalam keluarga iman, kita mungkin berasal dari latar belakang, kepribadian, dan kemampuan yang berbeda, tetapi Tuhan mempertemukan kita untuk berjalan bersama.

Dalam 1 Korintus 12:12–27, Paulus menggambarkan orang percaya sebagai satu tubuh dengan banyak anggota. Gambaran ini menunjukkan bahwa kehidupan bersama dalam Kristus bukan sekadar berkumpul, tetapi saling terhubung dan membutuhkan. Tangan tidak dapat berkata kepada kaki, “Aku tidak membutuhkanmu,” sebab setiap bagian memiliki fungsi yang berbeda. Demikian pula dalam keluarga iman, tidak ada seseorang yang terlalu kecil untuk diperhatikan atau terlalu berbeda untuk diterima. Ketika satu anggota mengalami kesulitan, anggota yang lain dipanggil untuk hadir dan menguatkan. Ketika satu anggota bersukacita, yang lain turut bersyukur. Kristus menjadi dasar yang menyatukan kita, sehingga perbedaan tidak menjadi alasan untuk menjauh, melainkan kesempatan untuk belajar mengasihi, menerima, dan bertumbuh bersama.

Sebagai mahasiswa Kristen dan keluarga Kristen, kita sering bertemu dengan orang yang tidak sama dengan kita. Ada yang pendiam, ada yang aktif, ada yang mudah bergaul, ada yang membutuhkan waktu untuk terbuka. Jangan sampai perbedaan membuat kita hanya dekat dengan orang-orang yang cocok dengan kita. Belajarlah menjadi keluarga bagi mereka yang mungkin sedang merasa sendirian. Sapa mereka, dengarkan ceritanya, doakan pergumulannya, dan hadir ketika mereka membutuhkan dukungan. Dalam PMK Katharos, mari membangun suasana di mana setiap orang dapat berkata, “Aku diterima di sini, aku tidak sendirian, dan aku punya tempat dalam keluarga ini.” Sebab keluarga Kristen bukanlah kumpulan orang yang sempurna, melainkan orang-orang yang terus belajar mengasihi karena terlebih dahulu dikasihi Kristus.[YP]',
    '“Keluarga iman bukan tentang menjadi sama, tetapi tentang tetap berjalan bersama karena kita memiliki Kristus yang sama.”',
    'Bapa, terima kasih karena Engkau telah menetapkan masing-masing kami berharga di mata-Mu. Lindungi komunitas kami dari perpecahan dan rasa tidak berharga. Ajar kami untuk saling menghormati anggota yang lemah dan bersukacita bersama mereka yang bersukacita, serta berdukacita bersama mereka yang berdukacita. Amin.',
    '/devotionals/2026-10-22.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-23',
    'BUKAN SEKADAR BERTEMU',
    'Reynanda',
    'Filipi 1:3-5',
    '(3)Aku mengucap syukur kepada Allahku setiap kali aku mengingat kamu.(4)...,aku selalu berdoa dengan sukacita.(5)...dari hari pertama sampai sekarang ini.',
    'Ada orang-orang yang awalnya hanya kita kenal sebagai teman, tetapi perlahan menjadi bagian penting dalam perjalanan hidup kita. Kita belajar bersama, tertawa bersama, melewati masa sulit bersama, bahkan saling menguatkan ketika salah satu mulai kehilangan semangat. Tanpa kita sadari, Tuhan menggunakan pertemuan-pertemuan sederhana itu untuk menghadirkan kasih-Nya dalam hidup kita. Mungkin kita tidak selalu menyadari betapa berharganya kebersamaan yang sedang kita jalani hari ini. Namun, suatu saat nanti kita akan melihat bahwa kita bukan sekadar dipertemukan, tetapi dipertemukan untuk bertumbuh bersama.

Ketika Paulus menulis Filipi 1:3–5, ia mengingat jemaat Filipi dengan penuh syukur dan sukacita. Paulus tidak hanya mengingat mereka sebagai orang-orang yang pernah ditemuinya, tetapi sebagai saudara seiman yang bersama-sama mengambil bagian dalam pemberitaan Injil. Persekutuan mereka memiliki dasar yang lebih dalam daripada sekadar kedekatan atau hubungan pertemanan, yaitu Kristus dan Injil-Nya. Karena itu, setiap kali Paulus mengingat mereka, hatinya dipenuhi ucapan syukur kepada Allah. Dari sini kita belajar bahwa kehadiran seseorang dalam hidup kita dapat menjadi bagian dari karya Tuhan. Ada orang yang Tuhan hadirkan untuk menguatkan kita, ada yang mengingatkan ketika kita mulai jauh, dan ada yang berjalan bersama ketika perjalanan iman terasa berat. Kebersamaan dalam Kristus adalah anugerah yang patut disyukuri.

Sebagai mahasiswa Kristen, kita sering terlalu sibuk mengejar tugas, nilai, organisasi, pelayanan, dan berbagai target pribadi sampai lupa menghargai orang-orang yang berjalan bersama kita. Karena itu, mari mulai belajar mengucap syukur atas keluarga, sahabat, teman pelayanan, dan setiap pribadi yang Tuhan tempatkan di sekitar kita. Jangan hanya hadir ketika membutuhkan sesuatu, tetapi jadilah pribadi yang juga mau mendengar, membantu, mendoakan, dan menguatkan. Sebagai keluarga Kristen, kita dipanggil untuk menjadi tempat di mana setiap orang merasa diterima dan tidak harus menghadapi perjalanan imannya seorang diri. Mungkin kita tidak tahu seberapa besar arti kehadiran kita bagi seseorang, tetapi melalui kasih yang sederhana, Tuhan dapat memakai kita untuk membuat seseorang kembali kuat dan terus berjalan bersama-Nya.[YP]',
    '“Jangan anggap kebersamaan sebagai sesuatu yang biasa; bisa jadi, melalui orang-orang yang Tuhan hadirkan, Dia sedang menunjukkan bahwa kamu tidak pernah berjalan sendirian.”',
    'Tuhan yang Maha Pengasih, kami mengucap syukur kepada Allah kami setiap kali kami mengingat saudara-saudari seiman kami. Terima kasih atas persekutuan dalam berita Injil yang telah terjalin. Peliharalah ikatan kasih dan persahabatan ini agar senantiasa menjadi sarana memancarkan terang kemuliaan-Mu di mana pun kami berada. Amin.',
    '/devotionals/2026-10-23.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-24',
    'KASIH YANG TIDAK PERGI',
    'Yayu',
    'Amsal 17:17',
    'Seorang sahabat menaruh kasih setiap waktu, dan menjadi seorang saudara dalam kesukaran.',
    'Ada orang-orang yang mudah ditemukan ketika kita sedang tertawa, tetapi sulit ditemukan ketika kita sedang menangis. Ketika keadaan baik, banyak orang ingin berjalan bersama kita, tetapi ketika masalah datang, tidak semua orang memilih untuk tetap tinggal. Padahal, terkadang seseorang tidak membutuhkan nasihat yang panjang atau solusi yang sempurna, melainkan hanya seseorang yang mau duduk di sampingnya dan berkata, “Aku ada di sini.” Kehadiran yang sederhana itu dapat menjadi pengingat bahwa di tengah masa sulit, kita tidak harus menghadapi semuanya sendirian.

Amsal 17:17 memperlihatkan bahwa kasih sejati tidak ditentukan oleh keadaan. Seorang sahabat menaruh kasih “setiap waktu”, artinya kasih tersebut tetap ada baik dalam sukacita maupun kesulitan. Bahkan ketika kesukaran datang, seorang sahabat digambarkan seperti saudara yang memilih untuk hadir dan memberikan dukungan. Ini menunjukkan bahwa kasih bukan hanya perasaan atau kata-kata, tetapi kesetiaan yang diwujudkan melalui kehadiran dan kepedulian. Dalam keluarga iman, kita dipanggil untuk menghadirkan kasih seperti ini. Kita tidak hanya datang ketika suasana menyenangkan, tetapi juga mendekat ketika ada yang sedang lemah. Kristus telah menjadi tempat kita bernaung dalam setiap keadaan; karena itu, kita pun dipanggil menjadi tempat yang aman bagi sesama untuk diterima, didengar, dan dikuatkan.

Sebagai mahasiswa dan keluarga Kristen, mungkin kita tidak selalu tahu pergumulan yang sedang dialami teman kita. Ada yang terlihat ceria tetapi sedang menghadapi masalah keluarga, ada yang tetap aktif tetapi sebenarnya sedang kelelahan, dan ada yang memilih diam karena tidak tahu kepada siapa harus bercerita. Karena itu, mari belajar lebih peka. Tanyakan kabar dengan tulus, dengarkan tanpa menghakimi, doakan ketika ada yang sedang kesulitan, dan jangan menjauh hanya karena seseorang sedang berada dalam masa yang sulit. Dalam PMK Katharos, mari membangun keluarga iman yang bukan hanya hadir ketika semuanya baik, tetapi tetap menggenggam satu sama lain ketika kehidupan terasa berat. Sebab keluarga yang dibangun di dalam Kristus bukanlah keluarga yang meninggalkan ketika keadaan berubah, melainkan keluarga yang belajar tetap mengasihi dalam segala keadaan.[YP]',
    '“Kasih sejati tidak selalu mampu mengubah keadaan, tetapi kasih yang tetap tinggal dapat membuat seseorang kuat melewati keadaan.”',
    'Tuhan Yesus, Engkaulah Sahabat sejati yang menaruh kasih di setiap waktu dan hadir laksana saudara dalam kesukaran. Jadikanlah kami sahabat yang setia bagi sesama kami, bukan hanya di saat senang, tetapi terlebih lagi ketika mereka melewati masa-masa sukar dan gelap. Biarlah kasih-Mu hadir nyata melalui ketulusan kami. Amin.',
    '/devotionals/2026-10-24.jpg',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-25',
    'KASIH YANG TETAP MEMILIH MENGASIHI',
    'Yayu',
    '1 Korintus 13: 4-7',
    'Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong...',
    'Pernahkah kita berada dalam situasi ketika seseorang membuat kita kecewa, tetapi kita tetap memilih untuk tidak meninggalkannya? Mungkin seorang teman pernah salah memahami perkataan kita, rekan pelayanan tidak melakukan sesuatu seperti yang kita harapkan, atau bahkan orang terdekat justru membuat kita terluka. Pada saat seperti itu, mengasihi menjadi jauh lebih sulit daripada sekadar mengucapkan “aku mengasihimu”. Kita mulai menyadari bahwa kasih yang sesungguhnya bukan hanya tentang perasaan ketika semuanya berjalan baik, melainkan tentang keputusan untuk tetap melakukan yang baik ketika hubungan sedang diuji.

Paulus dalam 1 Korintus 13:4–7 menggambarkan kasih melalui sikap yang nyata: sabar, murah hati, tidak iri, tidak sombong, tidak mencari kepentingan sendiri, dan tidak mudah marah. Gambaran ini penting karena jemaat Korintus sedang menghadapi persoalan dalam kehidupan bersama, termasuk perbedaan dan persaingan dalam penggunaan karunia rohani. Paulus menunjukkan bahwa sehebat apa pun pelayanan seseorang, tanpa kasih semuanya kehilangan makna. Kasih bukan sekadar emosi, tetapi karakter yang terlihat dalam cara kita memperlakukan sesama. Kasih yang berakar dalam Kristus membuat kita belajar menahan diri, mengampuni, menerima kekurangan, dan tetap mengusahakan kebaikan. Dengan demikian, kasih menjadi dasar yang menjaga persekutuan tetap hidup di tengah perbedaan.

Sebagai mahasiswa dan keluarga Kristen, kita bertemu dengan banyak orang yang memiliki karakter dan cara berpikir berbeda. Tidak semua teman akan memahami kita, tidak semua rekan pelayanan akan bekerja sesuai harapan, dan tidak setiap hubungan akan selalu berjalan tanpa konflik. Namun, justru dalam situasi seperti itulah kita dapat menunjukkan kasih Kristus. Belajar mendengarkan sebelum menghakimi, bersabar ketika menghadapi perbedaan, menolong tanpa mengharapkan balasan, meminta maaf ketika salah, dan memberikan kesempatan kepada orang lain untuk bertumbuh adalah bentuk kasih yang nyata.  mari membangun lingkungan yang tidak hanya berkumpul bersama, tetapi juga saling menerima, menguatkan, dan menjaga satu sama lain. Kasih Kristus tidak berhenti pada apa yang kita rasakan; kasih itu harus terlihat melalui cara kita hadir bagi orang lain. [YP]',
    '“Kasih Kristus menjadi nyata bukan ketika kita banyak berbicara tentang kasih, tetapi ketika orang lain dapat merasakan kasih itu melalui hidup kita.”',
    'Tuhan, curahkanlah kasih agape-Mu ke dalam hati kami. Kasih yang sabar, murah hati, tidak cemburu, tidak memegahkan diri, dan tidak menyimpan kesalahan orang lain. Mampukan kami untuk senantiasa menutupi segala sesuatu, percaya segala sesuatu, dan sabar menanggung segala sesuatu demi kemuliaan nama-Mu. Amin.',
    '/devotionals/2026-10-25.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-26',
    'Kenakanlah Kasih dalam Relasi',
    'Reynanda',
    'Kolose 3:12–14',
    '(12)Karena itu, sebagai orang-orang pilihan Allah yang dikuduskan dan dikasihi-Nya,...(13)...,kamu perbuat jugalah demikian.(14)...,dan menyempurnakan.',
    'Dalam kehidupan sehari-hari, relasi dengan orang lain tidak selalu berjalan sesuai dengan yang kita harapkan. Ada saatnya kita merasa dihargai, dimengerti, dan diterima, tetapi ada juga saat ketika perkataan atau tindakan seseorang membuat kita kecewa, terluka, atau bahkan marah. Dalam keadaan seperti itu, kita sering lebih mudah membalas dengan emosi daripada memilih untuk memahami. Padahal, sebagai orang percaya, Tuhan memanggil kita untuk menunjukkan karakter Kristus dalam setiap hubungan. Relasi yang sehat bukan berarti tidak pernah mengalami masalah, tetapi bagaimana kita merespons masalah dengan hati yang dipimpin oleh Tuhan. Melalui Kolose 3:12–14, kita diingatkan bahwa kehidupan sebagai anak-anak Tuhan harus terlihat melalui cara kita memperlakukan sesama.

Kolose 3:12–14 mengajarkan bahwa sebagai orang-orang pilihan Allah yang dikuduskan dan dikasihi, kita harus mengenakan belas kasihan, kemurahan, kerendahan hati, kelemahlembutan, dan kesabaran. Kita juga dipanggil untuk saling menanggung dan mengampuni apabila ada yang melakukan kesalahan. Dasar dari semua sikap tersebut adalah kasih. Kasih bukan hanya perasaan, tetapi keputusan untuk tetap melakukan yang baik meskipun keadaan tidak selalu mudah. Tuhan terlebih dahulu mengasihi dan mengampuni kita, sehingga kita pun dipanggil untuk menunjukkan kasih dan pengampunan kepada orang lain. Ketika kasih menjadi dasar dalam relasi, kita tidak mudah membalas kesalahan dengan kesalahan, tidak cepat menghakimi, dan tidak mempertahankan ego. Kasih menjadi pengikat yang menyatukan dan menyempurnakan kehidupan bersama.

Dalam kehidupan sehari-hari, mari belajar mengenakan karakter Kristus dalam setiap relasi, baik dengan keluarga, teman, rekan pelayanan, maupun orang-orang di lingkungan kita. Ketika ada yang membuat kita kecewa, belajar untuk tidak langsung bereaksi dengan kemarahan. Berikan waktu untuk memahami keadaan, berbicara dengan lembut, dan memilih mengampuni. Ketika seseorang membutuhkan pertolongan, tunjukkan belas kasihan melalui tindakan sederhana. Ketika terjadi perbedaan pendapat, belajar merendahkan hati dan tidak selalu memaksakan kehendak. Kesabaran juga perlu dilatih karena setiap orang memiliki proses dan kelemahannya masing-masing. Hari ini, mari bertanya kepada diri sendiri: apakah orang lain dapat melihat kasih Kristus melalui cara saya berbicara dan memperlakukan mereka? Kiranya setiap relasi yang kita jalani menjadi kesempatan untuk mempraktikkan kasih, sehingga melalui kehidupan kita, orang lain dapat merasakan kebaikan dan kasih Tuhan.[RAT]',
    '“Kenakan kasih, karena kasih membuat relasi menjadi tempat hadirnya Kristus.”',
    'Bapa surgawi, sebagai orang-orang pilihan-Mu yang dikuduskan dan dikasihi, ajar kami setiap hari mengenakan belas kasihan, kemurahan, kerendahan hati, kelemahlembutan, dan kesabaran. Ampuni kami bila kami terluka, dan tolong kami untuk saling mengampuni sama seperti Kristus telah mengampuni kami. Ikatlah kami semua dengan kasih yang sempurna. Amin.',
    '/devotionals/2026-10-26.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-27',
    'Saling Menguatkan Setiap Hari',
    'Kak Ifan',
    'Ibrani 3:13',
    'Tetapi nasihatilah seorang akan yang lain setiap hari, selama masih dapat dikatakan hari ini, supaya jangan ada di antara kamu yang menjadi tegar hatinya karena tipu daya dosa.',
    'Dalam perjalanan iman, kita tidak selalu berada dalam keadaan kuat. Ada saatnya kita mengalami kelelahan, kekecewaan, pergumulan, atau kehilangan semangat untuk tetap berjalan bersama Tuhan. Pada saat seperti itu, kehadiran orang lain sangat berarti. Satu perkataan yang menguatkan, perhatian yang tulus, atau doa dari saudara seiman dapat menolong seseorang untuk kembali melihat bahwa ia tidak berjalan sendirian. Karena itu, kehidupan sebagai orang percaya bukan hanya tentang bagaimana kita menjaga iman kita sendiri, tetapi juga bagaimana kita peduli dan menolong sesama untuk tetap bertumbuh dalam iman.
Surat Ibrani ditujukan kepada orang-orang percaya yang sedang menghadapi tekanan dan pergumulan dalam mempertahankan iman kepada Kristus. Penulis mengingatkan mereka agar tidak memiliki hati yang tidak percaya dan tidak berbalik dari Allah yang hidup (Ibrani 3:12). Dalam konteks itulah muncul nasihat, “Tetapi nasihatilah seorang akan yang lain setiap hari, selama masih dapat dikatakan ‘hari ini’...” (Ibrani 3:13). Kata “setiap hari” menunjukkan bahwa kepedulian terhadap iman sesama bukan tindakan yang dilakukan hanya ketika seseorang sedang mengalami masalah. Mereka perlu terus saling memperhatikan dan menasihati karena ada bahaya “tipu daya dosa” yang dapat membuat hati menjadi tegar. Tuhan memakai kehidupan komunitas orang percaya untuk saling menjaga, menguatkan, dan menolong satu sama lain agar tetap setia kepada Kristus. Saling menguatkan bukan sekadar memberikan semangat, melainkan bentuk kepedulian terhadap perjalanan iman sesama.
Saudaraku, firman Tuhan ini sekaligus menjadi teguran bagi kita. Apakah kita sungguh memperhatikan pergumulan iman orang-orang di sekitar kita, atau kita terlalu sibuk dengan kehidupan sendiri? Jangan sampai kita baru peduli ketika seseorang sudah jatuh atau menjauh dari Tuhan. Mari membangun budaya saling menguatkan setiap hari. Belajarlah bertanya dengan tulus, mendengarkan tanpa menghakimi, mendoakan dengan setia, dan memberikan nasihat berdasarkan firman Tuhan. Bagaimana jika kita tidak mengetahui secara langsung masalah yang sedang dihadapi seseorang, tetapi kita mendengar dari orang lain bahwa ia sedang mengalami pergumulan? Kita tidak perlu mencari tahu semua persoalannya atau menyebarkannya kepada orang lain. Tetaplah mendoakannya dan, bila ada kesempatan, tunjukkan kepedulian dengan kasih dan ketulusan. Mungkin ada seseorang di sekitar kita yang sedang lelah dalam iman dan membutuhkan perhatian sederhana dari kita. Jangan menunggu sampai ia terjatuh. Hadirlah hari ini dan jadilah pribadi yang Tuhan pakai untuk menguatkan sesama.',
    '“Jangan menunggu saudara kita jatuh untuk menguatkannya; hadir dan kuatkanlah dia setiap hari.”',
    'Tuhan Yesus, dunia seringkali menawarkan tipu daya dosa yang dapat mengeraskan hati kami. Tolong kami agar tidak lengah, melainkan tekun saling menasihati dan menguatkan satu sama lain setiap hari selama masih dapat dikatakan ''hari ini''. Jagalah agar iman kami tetap murni dan berkobar-kobar sampai garis akhir. Amin.',
    '/devotionals/2026-10-27.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-28',
    'Be an Example of Love',
    'Kak Grace',
    'Yohanes 13:34–35',
    'Aku memberikan perintah baru kepada kamu, yaitu supaya kamu saling mengasihi; sama seperti Aku telah mengasihi kamu demikian pula kamu harus saling mengasihi...',
    'Kalau hari ini orang-orang di sekitar kita diminta menyebutkan satu hal yang paling menggambarkan diri kita, kira-kira apa yang akan mereka katakan? Apakah mereka akan mengingat kebaikan kita, kesabaran kita, kepedulian kita, atau justru cara kita memperlakukan mereka ketika keadaan tidak sesuai dengan keinginan kita? Sering kali kita ingin dikenal sebagai orang yang pintar, sukses, aktif, atau berprestasi, tetapi Yesus memberikan ukuran yang berbeda bagi kehidupan seorang murid: Kasih. Di kampus, di tempat kerja, maupun di dalam keluarga, kasih tidak hanya terlihat ketika semuanya berjalan dengan baik, tetapi justru terlihat ketika kita menghadapi perbedaan, kesalahpahaman, kekecewaan, dan orang-orang yang sulit kita mengerti. Melalui Yohanes 13:34–35, Yesus mengajarkan bahwa kasih bukan sekadar perkataan, melainkan tanda yang membuat orang lain mengenali kita sebagai murid-murid-Nya.

Kasih yang Yesus ajarkan bukan sekadar perasaan, tetapi tindakan nyata, seperti tertulis dalam 1 Korintus 13:4–7 bahwa kasih itu sabar, murah hati, dan tidak mementingkan diri sendiri. Kita dapat belajar dari Yusuf, yang meskipun disakiti dan dijual oleh saudara-saudaranya, memilih mengampuni dan bahkan menolong mereka ketika memiliki kesempatan untuk membalasnya (Kejadian 50:20–21). Dalam kehidupan sehari-hari, kasih dapat terlihat ketika seorang mahasiswa membantu temannya yang kesulitan memahami pelajaran, ketika kita memilih mendengarkan daripada menghakimi, atau ketika seorang anggota keluarga mau meminta maaf dan memaafkan. Efesus 4:32 juga mengingatkan kita untuk saling mengasihi, penuh kasih mesra, dan saling mengampuni sebagaimana Allah telah mengampuni kita di dalam Kristus. Dengan demikian, kasih bukan hanya sesuatu yang kita katakan dengan mulut, tetapi sesuatu yang harus terlihat melalui sikap, perkataan, keputusan, dan cara kita memperlakukan sesama.

Pada akhirnya, menjadi murid Kristus berarti menjadi teladan kasih di mana pun kita berada. Kasih tidak harus selalu dilakukan melalui hal-hal besar; sering kali kasih justru hadir melalui tindakan sederhana yang tulus. Ketika kita memilih mengampuni daripada membenci, menolong daripada mengabaikan, dan memahami daripada menghakimi, kita sedang menunjukkan karakter Kristus kepada dunia. Biarlah orang lain bukan hanya mendengar bahwa kita adalah pengikut Kristus, tetapi dapat merasakan kasih Kristus melalui kehidupan kita. Karena itu, marilah kita menjadi “Be an Example of Love” menjadi contoh kasih yang membuat orang lain dapat melihat dan mengenal Kristus melalui diri kita. (GYS)',
    '“Kasih bukan tentang seberapa banyak yang kita katakan, tetapi seberapa nyata kita memperlakukan sesama.”',
    'Tuhan Yesus Kristus, Engkau telah memberikan kami perintah baru yaitu agar kami saling mengasihi sama seperti Engkau telah mengasihi kami. Jadikanlah kasih di antara kami menjadi kesaksian hidup yang memikat, sehingga dunia mengenal bahwa kami adalah murid-murid-Mu yang sejati dan rindu mengenal kasih-Mu. Amin.',
    '/devotionals/2026-10-28.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-29',
    'KRISTUS ADALAH KEPALA',
    'Kak Arsiaty',
    'Efesus 4:15-16',
    'tetapi dengan teguh berpegang kepada kebenaran di dalam kasih kita bertumbuh di dalam segala hal ke arah Dia, Kristus, yang adalah Kepala. Dari pada-Nyalah seluruh tubuh, – yang rapi tersusun dan diikat menjadi satu oleh pelayanan semua bagiannya, sesuai dengan kadar pekerjaan tiap-tiap anggota – menerima pertumbuhannya dan membangun dirinya dalam kasih.',
    'Rumah bukan sekadar tempat untuk tinggal, melainkan tempat setiap orang menemukan penerimaan, kasih, dan kekuatan untuk menjalani kehidupan. Demikian pula keluarga iman, yang bukan hanya dipersatukan oleh kebersamaan dalam ibadah atau pelayanan, tetapi juga oleh Kristus yang menjadi pusat kehidupan. Namun, hidup sebagai satu keluarga tidak selalu mudah. Setiap anggota memiliki karakter, pemikiran, latar belakang, dan pergumulan yang berbeda. Perbedaan terkadang menimbulkan kesalahpahaman, jarak, bahkan keengganan untuk saling memahami. Di tengah keberagaman tersebut, kita membutuhkan dasar yang teguh agar kebersamaan tidak mudah goyah. Kristuslah yang mempersatukan kita dan menjadikan keluarga iman sebagai tempat untuk bertumbuh bersama dalam kasih.

Dalam Efesus 4:15–16, Paulus menggambarkan jemaat sebagai satu tubuh yang memiliki Kristus sebagai Kepala. Setiap anggota mempunyai peran dan fungsi yang berbeda, tetapi semuanya saling terhubung dan membutuhkan satu sama lain. Pertumbuhan tubuh tidak terjadi hanya karena satu bagian bekerja, melainkan karena seluruh anggota menjalankan fungsinya sesuai dengan karunia dan tanggung jawab masing-masing. Demikian juga keluarga iman tidak dibangun oleh beberapa orang saja, tetapi melalui keterlibatan setiap anggota. Paulus mengingatkan bahwa pertumbuhan harus berlangsung dalam kebenaran dan kasih. Kebenaran menolong kita untuk tetap berjalan sesuai kehendak Tuhan, sedangkan kasih mengajarkan kita untuk menyampaikan kebenaran dengan kelembutan, menerima kekurangan, dan membangun sesama tanpa menghakimi. Ketika Kristus menjadi Kepala, perbedaan bukan alasan untuk saling menjauh, melainkan kesempatan untuk saling melengkapi. Kita tidak dituntut menjadi sama, tetapi dipanggil untuk berjalan menuju tujuan yang sama, yaitu semakin serupa dengan Kristus.

Menjadi keluarga iman berarti bersedia mengambil bagian dalam pertumbuhan bersama. Kita dapat memulainya melalui tindakan sederhana, seperti menyapa anggota yang jarang hadir, mendengarkan teman yang sedang bergumul, menghargai perbedaan pendapat, mendoakan satu sama lain, dan mengambil bagian dalam pelayanan dengan setia. Jangan menunggu orang lain terlebih dahulu menunjukkan kasih, sebab setiap kita dipanggil untuk menjadi bagian dari kasih Kristus yang menguatkan tubuh-Nya. Ketika ada yang lemah, kita hadir untuk menopang; ketika ada yang bersukacita, kita turut bersyukur; dan ketika ada yang jatuh, kita menolongnya untuk bangkit. Di dalam Kristus, kita menemukan rumah sekaligus alasan untuk terus bertumbuh bersama. Sebab keluarga iman yang berakar pada Kristus bukanlah keluarga yang tanpa perbedaan, melainkan keluarga yang terus belajar menerima, mengasihi, dan menguatkan hingga semakin dewasa dalam iman. [AS]',
    'Kita tidak harus menjadi sama untuk bertumbuh bersama, sebab di dalam Kristus, perbedaan dipersatukan, kasih menguatkan, dan setiap anggota menjadi bagian dari keluarga Allah.',
    'Tuhan Yesus, Kepala Tubuh Gereja, kami menundukkan seluruh kepemimpinan dan arah hidup kami di bawah kedaulatan-Mu. Satukanlah sendi-sendi persekutuan kami dengan erat, agar setiap bagian menjalankan fungsinya dan tubuh-Mu bertumbuh subur dalam kasih dan kebenaran. Amin.',
    '/devotionals/2026-10-29.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-30',
    'Kasih yang Menghargai, Hati yang Menguatkan',
    'Reynanda',
    'Roma 12:10 TB',
    'Hendaklah kamu saling mengasihi sebagai saudara dan saling mendahului dalam memberi hormat.',
    'Dalam kehidupan bersama, kita tidak selalu bertemu dengan orang yang memiliki karakter, pemikiran, kebiasaan, dan cara pandang yang sama. Ada kalanya kita merasa dekat dengan seseorang, tetapi ada juga saat kita mengalami perbedaan, salah paham, atau merasa kurang dihargai. Dalam keadaan seperti itu, kita mudah berfokus pada kekurangan orang lain dan melupakan bahwa setiap orang memiliki prosesnya masing-masing. Sebagai keluarga dalam Kristus, Tuhan mengajarkan kita untuk tidak hanya hidup berdampingan, tetapi membangun relasi yang dipenuhi kasih dan penghargaan. Kasih bukan hanya ditunjukkan ketika semuanya berjalan baik, melainkan juga ketika kita menghadapi perbedaan dan keadaan yang tidak sesuai dengan keinginan kita. Karena itu, kehidupan dalam komunitas menjadi kesempatan bagi kita untuk belajar mengasihi dengan tulus dan menghargai setiap pribadi yang Tuhan tempatkan di sekitar kita.

Roma 12:10 berkata, “Hendaklah kamu saling mengasihi sebagai saudara dan saling mendahului dalam memberi hormat.” Firman Tuhan mengajarkan bahwa hubungan di antara orang percaya seharusnya dibangun seperti hubungan dalam sebuah keluarga. Kita dipanggil untuk memiliki kasih persaudaraan yang tulus, bukan kasih yang hanya muncul ketika kita mendapatkan keuntungan dari orang lain. Saling mendahului dalam memberi hormat berarti belajar menghargai keberadaan, usaha, dan peran orang lain tanpa menunggu mereka terlebih dahulu menghargai kita. Firman Tuhan juga mengajarkan bahwa setiap orang memiliki nilai di hadapan-Nya. Karena itu, kita tidak seharusnya merendahkan, mengabaikan, atau merasa diri lebih penting daripada orang lain. Kasih yang berasal dari Kristus mendorong kita untuk melihat sesama sebagai saudara yang perlu dihargai, diterima, dan dibangun.

Dalam praktiknya, mari mulai menunjukkan kasih melalui hal-hal sederhana. Belajar menyapa orang lain dengan ramah, mendengarkan ketika seseorang berbicara, menghargai pendapat yang berbeda, mengucapkan terima kasih atas pelayanan atau bantuan orang lain, serta memberikan apresiasi tanpa merasa kehilangan sesuatu. Ketika ada teman yang melakukan kesalahan, jangan terburu-buru menghakimi, tetapi berikan kesempatan untuk belajar dan bertumbuh. Ketika ada seseorang yang sedang mengalami kesulitan, jangan hanya berkata bahwa kita peduli, tetapi hadir dan memberikan pertolongan sesuai kemampuan. Mendahulukan orang lain juga berarti tidak selalu mencari pengakuan atau menjadi yang paling diperhatikan. Mari bertanya kepada diri sendiri: “Apakah orang-orang di sekitar saya merasa dihargai ketika bersama saya?” Kiranya melalui perkataan, sikap, dan tindakan kita, kasih Kristus semakin nyata sehingga komunitas kita menjadi tempat di mana setiap orang merasa diterima, dihargai, dan dikuatkan.[RAT]',
    '“Saat kita belajar menghargai, kasih Kristus menjadi nyata. Saat kita mendahulukan sesama, kita sedang membangun satu keluarga dalam Kristus.”',
    'Bapa yang baik, ajar kami untuk sungguh-sungguh saling mengasihi sebagai saudara dan berlomba-lomba dalam saling mendahului memberi hormat. Buanglah rasa iri hati dan egoisme dari tengah-tengah kami, gantikan dengan sukacita melihat sesama kami diberkati dan dipakai luar biasa oleh-Mu. Amin.',
    '/devotionals/2026-10-30.png',
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
INSERT INTO devotionals (publish_date, title, author, passage_ref, passage_text, content, quote, prayer, image_url, status, updated_at)
VALUES (
    '2026-10-31',
    'Faith, Prayer and Life in Christ',
    'Kak Je',
    'Yudas 1:20–21',
    'Akan tetapi kamu, saudara-saudaraku yang kekasih, bangunlah dirimu sendiri di atas dasar imanmu yang paling suci dan berdoalah dalam Roh Kudus. Peliharalah dirimu demikian dalam kasih Allah sambil menantikan rahmat Tuhan kita, Yesus Kristus, untuk hidup yang kekal.',
    'Hari ini, banyak orang Kristen tampak sibuk melayani, aktif di media sosial, dan mengikuti ibadah daring. Namun tidak sedikit yang diam-diam merasa lelah dan kering secara rohani. Iman sering dianggap urusan hari Minggu saja, sementara hari-hari lainnya diisi kesibukan dan kekhawatiran. Di tengah dunia yang serba cepat ini, Firman Tuhan mengajak kita kembali ke dasar. Apa yang menopang iman kita, dan bagaimana kita menjaganya tetap hidup?

Yudas menulis kepada jemaat yang sedang diserang dari dalam. Guru-guru palsu menyusup dan memutarbalikkan anugerah menjadi izin untuk hidup sembarangan. Banyak orang goyah dan bingung. Karena itu Yudas tidak hanya menyuruh mereka melawan, tetapi juga membangun diri. Kata "bangunlah" dalam bahasa aslinya berarti membangun di atas sesuatu yang sudah ada. Fondasinya sudah diletakkan Kristus, tugas kita terus membangun di atasnya, dan itu berlangsung seumur hidup, bukan sekali jadi. Fondasi itu adalah iman yang paling suci, yaitu Injil yang sudah disampaikan sekali untuk selamanya. Iman kita bersandar pada kebenaran yang tetap, bukan pada perasaan yang berubah-ubah. Lalu Yudas menyuruh kita berdoa dalam Roh Kudus. Para penyesat di ayat 19 digambarkan tidak memiliki Roh, sedangkan doa yang sejati lahir dari pertolongan Roh, bukan dari teknik atau semangat kita sendiri. Yudas juga menyuruh kita memelihara diri dalam kasih Allah. Menariknya, di ayat 1 ia mengatakan bahwa kita sedang dipelihara oleh Yesus Kristus. Jadi kita berjuang, tetapi berjuang dalam pegangan tangan Allah. Kita tidak berusaha mendapatkan kasih-Nya, kita tinggal di dalamnya. Semua ini kita jalani sambil menantikan rahmat Tuhan Yesus Kristus. Hidup kekal adalah pemberian belas kasihan-Nya, bukan hasil prestasi rohani kita. Sayangnya, kini banyak orang percaya mencari iman yang praktis dan menghibur saja. Ajaran yang menjanjikan berkat tanpa salib terasa lebih laku. Doa sering menjadi daftar permintaan yang dibacakan terburu-buru, bukan persekutuan dengan Allah. Kita juga mudah merasa cukup dengan ibadah daring dan lupa membangun akar yang dalam. Akibatnya iman kita dangkal dan mudah goyah ketika badai datang. Karena itu, hidup dalam Kristus berarti tiga hal yang tidak bisa dipisahkan: berakar pada Firman, bergaul dengan Allah dalam doa, dan berharap penuh pada rahmat-Nya. Firman menuntun doa, doa menguatkan iman, dan iman membuahkan hidup yang berpusat pada Kristus.

Saudara, mulailah setiap hari dengan kembali kepada Kristus melalui Firman dan doa, bukan hanya ketika menghadapi masalah. Bangun iman dengan membaca Alkitab secara teratur dan belajar memahami kebenarannya, bukan sekadar mencari ayat yang sesuai dengan keinginan kita. Berdoalah dalam Roh Kudus, yaitu membuka hati kepada Allah dan membiarkan hidup kita diarahkan oleh kehendak-Nya. Peliharalah diri dalam kasih Allah dengan tetap hidup dalam ketaatan, persekutuan, dan kasih kepada sesama. Jangan biarkan kesibukan, teknologi, atau berbagai suara dunia menggantikan suara Kristus. Mari berkomitmen: saya akan terus bertumbuh dalam iman, tekun dalam doa, hidup dalam kasih Allah, dan setia menantikan Kristus. Sebab hidup yang dibangun di atas Kristus tidak akan sia-sia [JN].',
    'Mari berkomitmen: saya akan terus bertumbuh dalam iman, tekun dalam doa, hidup dalam kasih Allah, dan setia menantikan Kristus. Sebab hidup yang dibangun di atas Kristus tidak akan sia-sia',
    'Tuhan Allah kami yang setia, terima kasih atas seluruh pimpinan-Mu sepanjang bulan Oktober ini. Mampukan kami untuk terus membangun diri di atas dasar iman kami yang paling suci, berdoa dalam pimpinan Roh Kudus, dan memelihara diri kami dalam naungan kasih Allah sambil menantikan rahmat Tuhan kita Yesus Kristus menuju hidup yang kekal. Amin.',
    '/devotionals/2026-10-31.png',
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
