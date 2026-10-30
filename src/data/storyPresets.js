export const VISUAL_STYLES = [
  { 
    id: 'claymation', 
    name: 'Claymation (Stop-Motion)', 
    tag: '100% original bespoke clay animation, completely unique never-before-seen handcrafted clay figurine character, one-of-a-kind distinct facial features, proprietary original character design, extremely cute and endearing, chubby rosy cheeks, expressive cute button eyes, tiny sculpted nose, tactile plasticine texture with soft subtle finger-sculpting marks, warm miniature studio lighting, shallow depth of field, charming stop-motion movie aesthetic' 
  },
  { 
    id: 'pixar', 
    name: '3D Animation (Cute Stylized)', 
    tag: '100% original bespoke 3D feature animation character, completely unique never-before-seen character concept, one-of-a-kind distinct facial design, proprietary original character IP, extremely cute and lovable expressions, big luminous sparkling eyes, soft rounded cheeks, cheerful heartwarming smile, warm subsurface scattering skin, delightful stylized proportions, vibrant cinematic animated film lighting, high-end 3D CGI movie studio quality' 
  },
  { 
    id: 'cinematic', 
    name: 'Cinematic Hyperrealistic', 
    tag: 'Photorealistic 8k cinematic masterpiece, 100% original bespoke character appearance, completely unique never-before-seen facial features, proprietary original character design, heartwarming and lovable presence with sweet charming smiles, bright expressive captivating eyes, natural soft lighting, 35mm anamorphic lens, authentic cultural charm' 
  },
  { 
    id: 'dark_folklore', 
    name: 'Dark Nusantara Folklore', 
    tag: 'Enchanting mystical Indonesian folklore, 100% original bespoke mythical folklore character, completely unique never-before-seen character concept, proprietary design, cute and endearing stylized mythical features, glowing expressive eyes, authentic batik patterns, moody candlelit glow, whimsical ancient folklore wonder' 
  },
  { 
    id: 'anime', 
    name: 'Anime Watercolor Style', 
    tag: '100% original bespoke anime character design, completely unique never-before-seen concept, one-of-a-kind distinct facial aesthetics, proprietary original character, adorable Japanese watercolor anime style, endearing cute character, big emotional sparkling eyes, soft rosy blush, wholesome heartwarming expressions, hand-drawn traditional watercolor aesthetic, lush vibrant nature, nostalgic skies' 
  }
];

export const VOICE_OPTIONS = [
  { id: 'pria_bima', name: 'Pria Bima / Deep Dramatic Voice', pitch: 0.85, rate: 0.95, gender: 'male', desc: 'Suara berat berwibawa, penuh intonasi emosional misteri.' },
  { id: 'wanita_melodrama', name: 'Wanita Melodramatis NTB', pitch: 1.1, rate: 0.92, gender: 'female', desc: 'Suara lembut, menyentuh hati, cocok untuk narasi haru.' },
  { id: 'narator_misteri', name: 'Narator Dokumenter Misteri', pitch: 0.75, rate: 0.88, gender: 'male', desc: 'Suara berbisik tegang, menciptakan ketegangan FYP tinggi.' },
  { id: 'anak_muda_viral', name: 'Anak Muda Storyteller Viral', pitch: 1.05, rate: 1.08, gender: 'male', desc: 'Pacing cepat, antusias, cocok untuk retention hook agresif.' }
];

export const MUSIC_OPTIONS = [
  { id: 'misteri_bima', name: 'Misteri Tradisional NTB (Vol: 12%)', tempo: 'Slow', vibe: 'Mistis, seruling bambu & rebana lembut', defaultVol: 12 },
  { id: 'gamelan_suspense', name: 'Gamelan Suspense Thriller', tempo: 'Medium', vibe: 'Dentang gong misterius & drone tegang', defaultVol: 15 },
  { id: 'epic_strings', name: 'Epic Nusantara Strings', tempo: 'Building', vibe: 'Orkestra megah dengan sentuhan etnik nusantara', defaultVol: 14 },
  { id: 'lofi_mystery', name: 'Lo-fi Mystery TikTok Beat', tempo: 'Steady', vibe: 'Beat santai namun berhawa mistis & catchy', defaultVol: 18 }
];

export const SFX_OPTIONS = [
  { id: 'whoosh_fast', name: 'Whoosh Cinematic Fast (Aktif)', pitch: 'High', desc: 'Transisi cepat mempertahankan retensi bola mata' },
  { id: 'cinematic_boom', name: 'Cinematic Sub Bass Boom', pitch: 'Low', desc: 'Efek getaran dramatis saat perpindahan adegan klimaks' },
  { id: 'glitch_swish', name: 'Glitch Wind Swish', pitch: 'Mid', desc: 'Sentuhan modern kekinian untuk video TikTok' }
];

export function detectDialectInfo(topic) {
  const lower = (topic || '').toLowerCase();
  if (lower.includes('santong') || lower.includes('teluk santong') || lower.includes('bugis') || lower.includes('passompe')) {
    return {
      regionName: 'Komunitas Pesisir Bugis (Pulau Sumbawa & Nusantara)',
      dialectTerm: 'basa Ugi, salam santun "Tabe\'", dan falsafah "Siri\' na Pacce" serta "Taro Ada Taro Gau"',
      introHook: 'Tabe\'... di pesisir maritim Pulau Sumbawa, debur ombak mengiringi jejak para pelaut tangguh Passompe Bugis yang menjunjung tinggi kehormatan Siri\' na Pacce...',
      regionalQuotes: ['Tabe\'', 'Passompe', 'Siri\' na Pacce', 'Taro Ada Taro Gau', 'Sompe\'', 'Eja', 'Kurru Sumange', 'bombang', 'lopi', 'mabbise']
    };
  }
  if (
    lower.includes('poto tano') || 
    lower.includes('tano') || 
    lower.includes('sumbawa') || 
    lower.includes('samawa') || 
    lower.includes('lala buntar') || 
    lower.includes('lala bunte') || 
    lower.includes('seteluk') || 
    lower.includes('taliwang') ||
    lower.includes('alas') ||
    lower.includes('plampang') ||
    lower.includes('ksb')
  ) {
    return {
      regionName: 'Tano Samawa (Sumbawa Barat & Sumbawa Besar)',
      dialectTerm: 'basa Samawa, falsafah "Sabalong Samalewa", dan prinsip persaudaraan "Mana tau manin tau"',
      introHook: 'Melok rungan sarea! Di tumpah darah Tano Samawa, para tetua selalu berpesan menjaga keharmonisan Sabalong Samalewa...',
      regionalQuotes: ['Melok rungan', 'Kalingka mo', 'Sabalong Samalewa', 'Mana tau manin tau', 'Pina siq', 'Tano Samawa', 'Tau Samawa', 'Kre Alang']
    };
  }
  if (lower.includes('bima') || lower.includes('mbojo') || lower.includes('dompu') || lower.includes('tambora') || lower.includes('maryam')) {
    return {
      regionName: 'Dana Mbojo (Bima & Dompu - Pulau Sumbawa Timur)',
      dialectTerm: 'nggahi Mbojo, falsafah "Nggahi Rawi Pahu", dan moral luhur "Maja Labo Dahu"',
      introHook: 'Masyarakat Dou Mbojo di tanah Bima dan Dompu memegang teguh warisan luhur Nggahi Rawi Pahu...',
      regionalQuotes: ['Dou Mbojo', 'Nggahi Rawi Pahu', 'Maja Labo Dahu', 'Mada', 'Rimpu Cili', 'Tembe Nggoli', 'Uma Lengge']
    };
  }
  if (lower.includes('lombok') || lower.includes('sasak') || lower.includes('mandalika') || lower.includes('rinjani')) {
    return {
      regionName: 'Suku Sasak (Lombok & Diaspora Sumbawa)',
      dialectTerm: 'basa Sasak, sapaan "Pelungguh & Batur", dan kearifan moral "Tindih" serta "Solah"',
      introHook: 'Ape arak batur sami! Bagi para batur yang melintasi Selat Alas, hidup solah dan saling tindih adalah amanat suci leluhur...',
      regionalQuotes: ['Ape arak', 'Batur', 'Pelungguh', 'Tindih', 'Solah', 'Matur Tampiasih', 'Patuh Karya']
    };
  }
  if (lower.includes('toba') || lower.includes('batak') || lower.includes('samosir')) {
    return {
      regionName: 'Tanah Batak (Bona Pasogit)',
      dialectTerm: 'hata Batak dan falsafah "Dalihan Na Tolu"',
      introHook: 'Di tepian Danau Toba yang hening, tetua Bona Pasogit menyimpan amanat...',
      regionalQuotes: ['Bona Pasogit', 'Dalihan Na Tolu', 'Horas', 'Umpasa']
    };
  }
  if (lower.includes('jawa') || lower.includes('mataram') || lower.includes('jogja') || lower.includes('majapahit') || lower.includes('solo')) {
    return {
      regionName: 'Tanah Jawa',
      dialectTerm: 'basa Jawa dan falsafah "Urip Iku Urup"',
      introHook: 'Kala semono di bumi Jawa, serat kuno mencatat sebuah peristiwa...',
      regionalQuotes: ['Kala Semono', 'Urip Iku Urup', 'Nguri-uri Kabudayan']
    };
  }
  if (lower.includes('sunda') || lower.includes('padjadjaran') || lower.includes('bandung') || lower.includes('priangan')) {
    return {
      regionName: 'Tatar Pasundan',
      dialectTerm: 'basa Sunda dan ajaran "Silih Asah Silih Asih Silih Asuh"',
      introHook: 'Urang Sunda di tatar Pasundan ngawariskeun carita luluhur...',
      regionalQuotes: ['Tatar Sunda', 'Urang Sunda', 'Silih Asah Silih Asih']
    };
  }
  if (lower.includes('minang') || lower.includes('padang') || lower.includes('sumbar')) {
    return {
      regionName: 'Ranah Minang',
      dialectTerm: 'bahasa Minang dan pepatah "Adat Basandi Syarak"',
      introHook: 'Urang awak di Ranah Minang mambaco tambo pusaka...',
      regionalQuotes: ['Ranah Minang', 'Urang Awak', 'Adat Basandi Syarak']
    };
  }
  if (lower.includes('bugis') || lower.includes('makassar') || lower.includes('sulsel')) {
    return {
      regionName: 'Tana Ogi (Sulawesi Selatan)',
      dialectTerm: 'basa Ugi dan prinsip "Siri Na Pacce"',
      introHook: 'Para pelaut ulung Bugis-Makassar menjunjung marwah kehormatan...',
      regionalQuotes: ['Tana Ogi', 'Siri Na Pacce', 'Ewako']
    };
  }
  return {
    regionName: 'Nusantara',
    dialectTerm: 'kearifan luhur adat nusantara',
    introHook: 'Jejak sejarah nusantara tempo dulu menyimpan sebuah rahasia...',
    regionalQuotes: ['Kearifan Nusantara', 'Petuah Tetua', 'Bumi Pertiwi']
  };
}

export const STORY_TEMPLATES = [
  // 1. POTO TANO - 12 UNIQUE CHRONOLOGICAL FACTUAL SCENES (BAHASA SAMAWA)
  {
    id: 'poto_tano',
    title: 'Sebelum Dikenal Sebagai Pelabuhan Poto Tano',
    scenes: [
      {
        id: 1,
        time: '00:00 - 00:10',
        stage: 'Hook Fakta',
        stageColor: 'border-rose-500 text-rose-400 bg-rose-500/10',
        title: 'Makna Sejati Nama Poto Tano',
        narration: 'Jauh sebelum kapal feri raksasa bersandar setiap jam... Tahukah kamu arti asli Poto Tano? Dalam bahasa Samawa, "Poto" berarti ujung atau pucuk, dan "Tano" adalah tanah... Inilah "Ujung Tanah" barat Pulau Sumbawa!',
        sumberIlmu: 'Toponimi Samawa Asli: Berasal dari kata "Poto" (pucuk/ujung tanjung daratan) dan "Tano" (tanah), membuktikan kawasan ini adalah tanjung barat Pulau Sumbawa perbatasan Selat Alas.',
        voiceGuide: '🎙️ Intonasi: Nada membuka misteri sejarah (hook), tempo sedang-lambat (~115 kpm), jeda 1 detik di tanda koma, vokal berat berwibawa.',
        visual: 'Panorama udara tanjung daratan Poto Tano menjorok ke Selat Alas saat fajar berselimut kabut lembut berlatar siluet megah Gunung Rinjani.',
        motionPrompt: '[Camera: Slow cinematic drone push-in forward at 0.35x speed, locked horizon line, perfectly smooth gimbal stabilization] [Environment: Gentle rhythmic ocean swells on Alas Strait, soft atmospheric morning sea mist slowly drifting, golden sun glinting softly across turquoise water surface] [Physics: Completely stable terrain geometry, zero structural warping, no glitch, smooth 60fps temporal coherence]',
        imagePrompt: 'Cinematic documentary photography, aerial establishing wide shot of Poto Tano cape in West Sumbawa Indonesia, pristine untouched ancient coastline jutting into the turquoise waters of Alas Strait, dramatic morning sunrise with soft golden light rays breaking through light mist, distant silhouette of Mount Rinjani on the Lombok horizon, lush green savannah hills meeting clear crystal-clear sea with coral reef patterns visible beneath the surface, clean landscape geometry, centered composition, hyperrealistic 8k, shot on 35mm lens, f/8, natural color grading, no modern buildings, no pollution, 9:16 vertical smartphone portrait format --ar 9:16',
        emotion: 'Rasa Ingin Tahu & Keagungan',
        captionText: 'Poto Tano: "Ujung Tanah" gerbang barat Pulau Sumbawa...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 2,
        time: '00:10 - 00:20',
        stage: 'Sejarah Awal',
        stageColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
        title: 'Dusun Pinamin yang Sunyi',
        narration: 'Catatan sejarah Leman Tano Samawa membuktikan... Sebelum menjadi pelabuhan dan kecamatan mandiri, kawasan ini dulunya hanyalah sebuah dusun nelayan sunyi bernama Dusun Pinamin... Berada di bawah naungan Desa Senayan, Kecamatan Seteluk.',
        sumberIlmu: 'Arsip Administrasi Wilayah: Catatan Leman Tano Samawa mencatat wilayah pesisir ini berstatus Dusun Pinamin di bawah Desa Senayan, Kec. Seteluk (sebelum pemekaran Kabupaten Sumbawa Barat tahun 2003).',
        voiceGuide: '🎙️ Intonasi: Khidmat dan bercerita sejarah otentik, penekanan tegas berbobot pada kata "Leman Tano Samawa", "Dusun Pinamin", dan "Desa Senayan".',
        visual: 'Papan kayu tua bertuliskan Dusun Pinamin di tepi jalan setapak tanah merah di antara pohon bidara dan padang savana sunyi Sumbawa tempo dulu.',
        motionPrompt: '[Camera: Smooth slow vertical tilt down from morning tree branches onto the wooden sign "DUSUN PINAMIN", gentle steady tracking at 0.3x speed] [Environment: Dry grass and small leaves rustling softly in tropical breeze, gentle dust motes dancing in warm sunbeam] [Stability: High temporal coherence, zero letter distortion on wooden sign, static stable signpost, smooth 60fps]',
        imagePrompt: 'Historical cinematic photography, a rustic vintage weathered wooden signpost hand-carved with the text "DUSUN PINAMIN" positioned along a quiet red-earth dirt pathway in rural Sumbawa, surrounded by dry golden savannah tall grass, sparse thorny jujube (bidara) trees, and distant quiet coastal hills under a soft warm tropical morning sky, authentic 19th-century Indonesian heritage atmosphere, detailed wood grain texture, tactile realism, sharp depth of field, 9:16 vertical smartphone portrait format --ar 9:16',
        emotion: 'Fakta Sejarah Nyata',
        captionText: 'Dahulu hanyalah Dusun Pinamin di bawah Desa Senayan...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 3,
        time: '00:20 - 00:30',
        stage: 'Masyarakat Asli',
        stageColor: 'border-blue-500 text-blue-400 bg-blue-500/10',
        title: 'Jejak Pelaut Ulung Suku Bajo',
        narration: 'Tau Samawa bersama pelaut ulung Suku Bajo hidup rukun di teluk ini... Mereka membangun rumah panggung kayu bertiang kokoh di atas air dangkal, hidup berdampingan dengan pasang surut dan karang Selat Alas.',
        sumberIlmu: 'Sejarah Pemukim Perintis: Teluk tenang ini dirintis oleh masyarakat pelaut Suku Bajo (Bajau) dan Tau Samawa yang mendirikan rumah panggung kayu di atas air surut dangkal.',
        voiceGuide: '🎙️ Intonasi: Hangat, penuh kekaguman budaya bahari, artikulasi tegas pada "Tau Samawa" dan "Suku Bajo".',
        visual: 'Deretan rumah panggung kayu suku Bajo berdiri di atas laut dangkal yang jernih, sampan kayu bertambat di tiang, jala ikan terbentang dijemur.',
        motionPrompt: '[Camera: Slow steady horizontal dolly shot moving right at 0.3x speed across the stilt houses, smooth cinematic stabilization] [Subject & Water: Wooden canoe gently bobbing up and down with calm water ripples, fishing net tassels swaying in soft ocean breeze, crystal clear water reflections undulating naturally] [Stability: Timber poles perfectly stable, no morphing of wooden structures, photorealistic fluid dynamics, 60fps pacing]',
        imagePrompt: 'Cinematic documentary portrait of a traditional Suku Bajo stilt village built over calm turquoise shallow sea in Sumbawa, authentic weathered timber stilt houses with thatched rumbia roofs elevated above clear water, a handcrafted wooden canoe (sampan) tied to a timber pole, handcrafted fishing nets drying on bamboo racks, reflections of stilt houses on calm transparent water revealing underwater coral rocks, warm ambient morning sunlight, high textural fidelity, clean architectural perspective, zero anatomical clutter, 9:16 vertical portrait format --ar 9:16',
        emotion: 'Kagum & Menghargai Budaya',
        captionText: 'Dirintis oleh nelayan Bajo & Tau Samawa, rumah panggung di atas air...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 4,
        time: '00:30 - 00:40',
        stage: 'Geografis & Alam',
        stageColor: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
        title: 'Benteng Alami Gili Balu & Savana',
        narration: 'Secara geografis, daratan Poto Tano sangat istimewa... Kawasan ini dilindungi benteng alami: gugusan delapan pulau kecil yang disebut Gili Balu, seperti Pulau Kenawa dan Paserang... Serta rimbunnya hutan mangrove penahan badai.',
        sumberIlmu: 'Geografi Fisik Alami: Kawasan teluk terlindung secara alami dari ombak ganas Selat Alas oleh gugusan 8 pulau kecil (Gili Balu: Kenawa, Paserang, Namo, Belang, Kambing, Batu, Kalong, Mandiki) dan hutan bakau alami.',
        voiceGuide: '🎙️ Intonasi: Mengagumi keagungan alam, tempo tenang dan menyejukkan, intonasi naik lembut pada "Gili Balu" dan "Pulau Kenawa".',
        visual: 'Lanskap savana hijau keemasan Pulau Kenawa dengan bukit tunggal ikonik di tengah laut tenang, diapit rimbunnya hutan bakau pesisir Poto Tano.',
        motionPrompt: '[Camera: Majestic slow ascending camera crane shot rising upwards at 0.35x speed, revealing the panoramic curve of Kenawa island] [Environment: Wind creating soft rhythmic ripples across the golden savannah grassland, gentle sea waves rolling onto white sandy shoreline, steady clouds drifting slowly in distance] [Stability: Mountain silhouette and island coastline 100% stable, zero terrain morphing, crisp 60fps]',
        imagePrompt: 'Breathtaking cinematic wide landscape of Pulau Kenawa in West Sumbawa, featuring its iconic solitary conical grassy hill surrounded by a vast flat golden-green savannah meadow and fringed by a pristine white sand beach, vibrant turquoise to deep navy blue gradient ocean of Alas Strait, framing in the foreground with lush green mangrove branches, soft volumetric clouds in a clear cyan sky, shot on Hasselblad medium format, ultra-crisp detail, vibrant natural saturation, 9:16 vertical smartphone aspect ratio --ar 9:16',
        emotion: 'Takjub & Damai',
        captionText: 'Dikelilingi Gili Balu dan savana Kenawa yang asri...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 5,
        time: '00:40 - 00:50',
        stage: 'Pelayaran Kuno',
        stageColor: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
        title: 'Tantangan Perahu Jukung Selat Alas',
        narration: 'Sebelum ada kapal feri besi... Warga yang hendak menyeberang ke Pulau Lombok harus bertaruh nyawa... Mereka hanya mengandalkan perahu jukung kayu bercadik, mengadu nasib melawan keganasan arus Selat Alas demi menyambung hidup.',
        sumberIlmu: 'Sejarah Transportasi Tradisional: Sebelum adanya kapal feri baja modern, mobilitas antar-pulau hanya menggunakan perahu jukung kayu tradisional bercadik melawan arus deras Selat Alas.',
        voiceGuide: '🎙️ Intonasi: Tegang, dramatis, nada bergetar menjiwai perjuangan bertaruh nyawa di laut lepas, tempo agak cepat.',
        visual: 'Nelayan tradisional mendayung perahu jukung bercadik kayu mengarungi arus ombak Selat Alas, menatap cakrawala lautan luas dengan tekad kuat.',
        motionPrompt: '[Camera: Medium tracking shot pacing alongside the wooden canoe, steady horizon with natural sea swell motion at 0.45x speed] [Subject: Canoe slicing through rolling ocean waves, small sail fabric billowing firmly in wind, subtle organic steering motion of sailor] [Stability: Sailor facial and body anatomy locked and consistent, outrigger wooden arms rigid and coherent, realistic ocean wave physics, zero glitching, 60fps]',
        imagePrompt: 'Dramatic historical cinematic photography, a single authentic Indonesian wooden outrigger canoe (jukung) with traditional fabric sail navigating through the rolling blue waves of Alas Strait, a brave weathered Sumbawa sailor holding a wooden steering paddle at the stern, dynamic sea spray catching the side sunlight, vast oceanic horizon between Lombok and Sumbawa, overcast dramatic sky with sun rays piercing through storm clouds, centered and balanced composition, high shutter speed capturing water droplets, 9:16 vertical smartphone portrait format --ar 9:16',
        emotion: 'Tegang & Menghormati Perjuangan',
        captionText: 'Dahulu menyeberang Selat Alas hanya dengan perahu jukung kayu...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 6,
        time: '00:50 - 01:00',
        stage: 'Sejarah Lisan',
        stageColor: 'border-purple-500 text-purple-400 bg-purple-500/10',
        title: 'Peristiwa Bangka Belah di Tua Nanga',
        narration: 'Masyarakat lokal juga mewarisi catatan sejarah lisan... Tentang peristiwa "Bangka Belah" di pesisir Tua Nanga... Kisah perahu dagang tempo dulu yang karam dan pecah di karang terjal setelah diserang bajak laut Selat Alas.',
        sumberIlmu: 'Sejarah Lisan Pesisir: Catatan tutur tetua lokal mengenai peristiwa "Bangka Belah" di pesisir Tanjung Tua Nanga tentang bangkai perahu kayu dagang yang karam di karang terjal.',
        voiceGuide: '🎙️ Intonasi: Misterius, berbisik tegang, tempo lambat, memberi jeda hening sejenak setelah kata "Bangka Belah".',
        visual: 'Reruntuhan kayu lambung perahu kuno terdampar di antara batu karang pesisir pantai Tua Nanga yang sunyi diterpa buih ombak laut senja.',
        motionPrompt: '[Camera: Slow moody ground-level pan across the weathered shipwreck timbers at 0.3x speed, smooth cinematic track] [Atmosphere: White ocean foam creeping slowly up the rocky beach, subtle misty sea spray drifting horizontally in evening wind] [Stability: Rocks and ship skeleton completely locked and solid, realistic water washing over shore, zero flicker, 60fps]',
        imagePrompt: 'Moody atmospheric historical documentary shot, remnants of an ancient weathered wooden merchant ship hull (bangka belah) resting among rugged black volcanic coastal rocks on Tua Nanga beach in Poto Tano, sea foam and gentle waves splashing against ancient dark timbers, moody twilight sky with purple and deep amber dusk hues, ethereal coastal fog rolling over the shoreline, solemn historical artifact mood, tactile weathered wood textures and wet stone reflections, 9:16 vertical smartphone portrait format --ar 9:16',
        emotion: 'Reflektif & Menegangkan',
        captionText: 'Jejak peristiwa "Bangka Belah" di pesisir Tua Nanga...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 7,
        time: '01:00 - 01:10',
        stage: 'Kondisi Nyata',
        stageColor: 'border-amber-600 text-amber-300 bg-amber-600/10',
        title: 'Isolasi Ekonomi & Kareng Tano',
        narration: 'Selama puluhan tahun, hasil bumi petani dan nelayan Sumbawa Barat sulit dipasarkan keluar pulau... Warga kerap tertahan berhari-hari di pesisir, "Kareng Tano" menanti angin teduh dengan penuh harap...',
        sumberIlmu: 'Kajian Sosial-Ekonomi: Istilah "Kareng Tano" menggambarkan kondisi masa lalu ketika komoditas ternak dan hasil bumi warga tertahan berhari-hari di pesisir akibat terbatasnya akses perahu.',
        voiceGuide: '🎙️ Intonasi: Emosional, penuh empati dan rasa haru mendalam, penekanan lembut pada istilah Samawa "Kareng Tano".',
        visual: 'Warga lokal Sumbawa tempo dulu, seorang kakek yang ramah dan berwibawa dengan wajah hangat bersahaja dan penuaan anggun berpakaian tenun tradisional, duduk di pesisir bersama keranjang hasil panen kelapa, menatap laut dengan penuh harap.',
        motionPrompt: '[Camera: Slow cinematic push-in on the kindly elderly grandfather sitting by the shore at 0.3x speed, locked focal point on subject] [Subject: Natural slow breathing, warm gentle eyes gazing steadily towards the horizon, woven fabric fluttering softly in the breeze] [Stability: Human face, hands, and basket completely locked with zero morphing or distortion, smooth natural motion, 60fps]',
        imagePrompt: 'Heartwarming historical portrait, a lovable kindly grandfather figure with warm gentle eyes, sweet grandfatherly smile, and dignified silver-gray hair, wearing traditional Sumbawa woven ikat sarung and headcloth, sitting by the quiet shoreline beside woven bamboo baskets filled with coconuts and harvested crops, gazing patiently out at the vast sea horizon towards Lombok, soft late afternoon golden sunlight illuminating his hopeful thoughtful expression, gentle coconut palm silhouettes in the background, crisp focal detail, blurred ocean background, 9:16 vertical format --ar 9:16',
        emotion: 'Haru & Menggugah Empati',
        captionText: 'Warga tertahan berhari-hari, "Kareng Tano" menanti angin teduh...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 8,
        time: '01:10 - 01:20',
        stage: 'Titik Balik',
        stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
        title: 'Sangkep Adat & Kajian Strategis',
        narration: 'Titik balik pun tiba... Lewat "Sangkep" atau musyawarah pemuka daerah bersama pemerintah... Poto Tano terpilih karena posisinya paling lurus dan dekat menuju Pelabuhan Kayangan di Lombok Timur, dengan teluk alami yang terlindung dari gelombang.',
        sumberIlmu: 'Kajian Navigasi ASDP: Poto Tano ditetapkan sebagai pelabuhan feri karena memiliki jarak lintasan terpendek (~12 mil laut / ~22 km) ke Kayangan Lombok Timur serta teluk tenang alami.',
        voiceGuide: '🎙️ Intonasi: Optimis, nada tegas, resmi dan berwibawa, menandai babak baru pembangunan.',
        visual: 'Peta navigasi Selat Alas di atas meja kayu beralas kompas kuningan, tangan surveyor menunjuk garis lurus antara Pelabuhan Kayangan dan Poto Tano.',
        motionPrompt: '[Camera: Slow macro glide across the map following the dotted sea route from Kayangan to Poto Tano at 0.3x speed] [Lighting: Soft warm lamplight shimmering across brass compass and textured paper grain] [Stability: Map text and geographic lines 100% sharp and stable, brass tools completely solid, no texture warping, 60fps]',
        imagePrompt: 'Cinematic macro shot of an authentic vintage nautical route map of West Nusa Tenggara laid out on a dark teak wood planning table, a weathered brass marine compass, drafting caliper, and magnifying glass resting beside the map, a hand holding a vintage fountain pen pointing directly at the straight nautical route connecting Kayangan in East Lombok across Alas Strait to Poto Tano in West Sumbawa, warm amber brass desk lamplight creating rich shadows, cinematic shallow depth of field, 9:16 vertical format --ar 9:16',
        emotion: 'Harapan Besar & Perubahan',
        captionText: 'Musyawarah Sangkep menyepakati rute tercepat ke Lombok...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 9,
        time: '01:20 - 01:30',
        stage: 'Modernisasi',
        stageColor: 'border-teal-500 text-teal-400 bg-teal-500/10',
        title: 'Pembangunan Dermaga & Feri Pertama',
        narration: 'Tiang pancang beton mulai ditancapkan... Jalan raya aspal dibuka menembus bukit savana... Dan saat kapal feri baja pertama bersandar di dermaga, era keterisolasian Dusun Pinamin resmi berakhir!',
        sumberIlmu: 'Infrastruktur Maritim: Proyek dermaga beton permanen dan jalur jalan darat memutus keterisolasian Dusun Pinamin serta menyatukan konektivitas transportasi Pulau Lombok dan Sumbawa.',
        voiceGuide: '🎙️ Intonasi: Bersemangat tinggi, antusias, vokal bertenaga dan membanggakan, penekanan kuat pada kalimat penutup!',
        visual: 'Dermaga kapal feri modern pertama diresmikan, kapal feri besar Ro-Ro menurunkan jembatan rampa ke daratan diiringi rasa syukur masyarakat lokal.',
        motionPrompt: '[Camera: Slow upward pedestal tilt showing the towering bow of the ferry docking at the concrete pier at 0.35x speed] [Action: Ferry gently settling into the berth with soft water displacement ripples, subtle white exhaust puff dissipating in sky, people waving joyfully in background] [Stability: Concrete pier and steel ship hull perfectly rigid and glitch-free, 60fps]',
        imagePrompt: 'Grand cinematic historical scene, the historic first modern steel Ro-Ro ferry ship docking at the newly constructed concrete jetty of Poto Tano harbor, the ferry ramp slowly lowering towards the terminal apron, excited local Sumbawa residents and dock workers in safety helmets watching with joy from the paved roadway, clear vibrant blue sky, background savannah hills of Poto Tano, authentic industrial and maritime engineering milestone, crisp dynamic composition, 9:16 vertical smartphone format --ar 9:16',
        emotion: 'Kemenangan & Kebanggaan',
        captionText: 'Dermaga feri pertama bersandar, era isolasi resmi berakhir!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 10,
        time: '01:30 - 01:40',
        stage: 'Fakta Hari Ini',
        stageColor: 'border-emerald-600 text-emerald-300 bg-emerald-600/10',
        title: 'Gerbang Sabalong Samalewa',
        narration: 'Kini, Dusun Pinamin telah mekar menjadi Kecamatan Poto Tano di Kabupaten Sumbawa Barat... Berakar dari semangat "Sabalong Samalewa" atau membangun dalam keselarasan, kini menjadi urat nadi logistik vital NTB dan pintu surga wisata Pulau Kenawa!',
        sumberIlmu: 'Falsafah Budaya Samawa: Pembangunan Poto Tano berlandaskan falsafah luhur "Sabalong Samalewa" (membangun dalam keselarasan, keharmonisan alam, dan kemakmuran sosial masyarakat).',
        voiceGuide: '🎙️ Intonasi: Megah, bangga, artikulasi jelas pada semboyan luhur "Sabalong Samalewa", tempo stabil berwibawa.',
        visual: 'Pemandangan spektakuler kawasan Pelabuhan Poto Tano hari ini yang megah dan ramai, feri hilir mudik melewati pulau Kenawa saat senja keemasan.',
        motionPrompt: '[Camera: High-altitude epic drone pull-back and elevation at 0.35x speed, revealing the grand scale of Poto Tano port and surrounding Gili Balu islands] [Environment: Ferries moving smoothly across the water with delicate white wakes, golden sunset reflections glinting on the sea surface] [Stability: Landscape and harbor infrastructure totally stable, zero geometric distortion, flawless 60fps]',
        imagePrompt: 'Breathtaking modern aerial drone photography of Poto Tano ferry port in West Sumbawa today, bustling modern ferry ships cruising peacefully through the turquoise Alas Strait past green Kenawa and Paserang islands, well-organized harbor terminal bathed in glorious golden sunset light, dramatic sky with vibrant orange, pink, and gold clouds, pristine modern highway winding through scenic rolling green hills, professional commercial travel photography, ultra-sharp 8k, 9:16 vertical format --ar 9:16',
        emotion: 'Bangga & Viral Edukatif',
        captionText: 'Dari dusun sepi kini jadi gerbang emas logistik & pariwisata NTB!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 11,
        time: '01:40 - 01:50',
        stage: 'Pemekaran Daerah',
        stageColor: 'border-violet-500 text-violet-400 bg-violet-500/10',
        title: 'Lahirnya Kabupaten Sumbawa Barat (KSB)',
        narration: 'Kian pesatnya mobilitas di Poto Tano turut mendorong lahirnya Kabupaten Sumbawa Barat pada tahun 2003... Mempercepat pembangunan infrastruktur dan memajukan martabat Tau Samawa di pesisir.',
        sumberIlmu: 'Arsip Otonomi Daerah: Pertumbuhan pesat aktivitas penyeberangan Poto Tano menjadi salah satu katalisator utama pembentukan Kabupaten Sumbawa Barat (KSB) berdasarkan UU No. 30 Tahun 2003.',
        voiceGuide: '🎙️ Intonasi: Berwibawa, penuh rasa hormat pada sejarah pemekaran otonomi daerah Sumbawa Barat.',
        visual: 'Tugu selamat datang Kabupaten Sumbawa Barat yang berdiri megah di dekat gerbang keluar pelabuhan dengan latar perbukitan hijau asri.',
        motionPrompt: '[Camera: Smooth cinematic tracking shot past welcome monument of West Sumbawa Regency at 0.35x speed, bright tropical sunlight, clean modern road with trees] [Stability: Monument letters and architecture rock solid, zero distortion, 60fps]',
        imagePrompt: 'Cinematic architectural documentary photo, iconic welcome landmark monument of West Sumbawa Regency near Poto Tano harbor exit, scenic lush green hills in background, clear sunny tropical day, clean modern asphalt highway, vibrant blue sky, professional photography, 9:16 vertical format --ar 9:16',
        emotion: 'Semangat Kemajuan',
        captionText: 'Pemekaran KSB 2003 semakin memajukan kawasan Poto Tano...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 12,
        time: '01:50 - 02:00',
        stage: 'Penutup & CTA',
        stageColor: 'border-rose-500 text-rose-300 bg-rose-500/10',
        title: 'Pesan Sejarah & Interaksi Penonton',
        narration: 'Setiap kali kamu menyeberang di Poto Tano... Ingatlah tetesan keringat para perintis Dusun Pinamin dan nelayan Bajo yang merintis tempat ini... Pernahkah kamu menyeberang ke sini? Ceritakan pengalamanmu di komentar ya!',
        sumberIlmu: 'Edukasi Publik Berkelanjutan: Mengabadikan memori sejarah perjuangan warga pesisir Dusun Pinamin agar generasi muda TikTok memahami asal-usul tanah airnya secara benar dan faktual.',
        voiceGuide: '🎙️ Intonasi: Bersahabat, menyentuh dan mengajak interaksi (Call To Action), nada ramah penutup video FYP.',
        visual: 'Seorang pemuda manis dan ceria berbusana kasual berdiri di anjungan atas kapal feri memandang ke arah daratan Poto Tano yang perlahan menjauh saat senja temaram, teks ajakan diskusi FYP muncul rapi.',
        motionPrompt: '[Camera: Gentle camera tracking from a cheerful cute young traveler looking out from ferry deck railing towards receding coastline at 0.3x speed, golden dusk sky, heartwarming atmosphere] [Subject: Gentle hair and clothes motion in sea wind, perfectly stable expressive facial features, 60fps]',
        imagePrompt: 'Cinematic travel documentary photography, a cheerful and cute young traveler with lovable boyish charm, bright expressive eyes and friendly warm smile, leaning on ferry railing looking back at Poto Tano harbor at dusk, gentle sea breeze, warm sunset glow reflecting on calm Alas Strait water, aesthetic TikTok framing, ultra-sharp detail, 9:16 vertical format --ar 9:16',
        emotion: 'Reflektif & Interaktif',
        captionText: 'Pernahkah kamu menyeberang di Poto Tano? Ceritakan di kolom komentar!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      }
    ]
  },

  // 2. LABUAN TELUK SANTONG - 10 SCENE KRONOLOGIS FAKTUAL (DIASPORA SUKU BUGIS DI TELUK SALEH)
  {
    id: 'labuan_teluk_santong',
    title: 'Labuan Teluk Santong - Jejak Pelaut Tangguh Suku Bugis di Teluk Saleh',
    scenes: [
      {
        id: 1,
        time: '00:00 - 00:10',
        stage: 'Hook Fakta',
        stageColor: 'border-rose-500 text-rose-400 bg-rose-500/10',
        title: 'Misteri Pesisir Teluk Saleh',
        narration: 'Tahukah kamu, di balik tenangnya perairan Teluk Saleh di Kecamatan Plampang, Sumbawa... Berdiri sebuah perkampungan maritim legendaris bernama Labuan Teluk Santong yang dirintis oleh para pelaut tangguh Suku Bugis!',
        sumberIlmu: 'Arsip Geografi & Demografi: Terletak di Desa Teluk Santong, Kec. Plampang, Kab. Sumbawa. Pesisirnya secara historis mayoritas dihuni oleh masyarakat diaspora Suku Bugis perantau dari Sulawesi Selatan.',
        voiceGuide: '🎙️ Intonasi: Hook misterius dan berwibawa, tempo sedang (~115 kpm), penekanan tegas pada "Labuan Teluk Santong" dan "Suku Bugis".',
        visual: 'Pemandangan panorama udara teluk berair tenang di Teluk Santong saat fajar, perahu-perahu kayu nelayan bertambat di dermaga kayu panjang berlatar perbukitan hijau.',
        motionPrompt: '[Camera: Slow cinematic drone glide over Teluk Santong bay at 0.35x speed, locked horizon] [Environment: Calm turquoise sea surface with soft ripple reflections, morning mist slowly lifting] [Stability: Shoreline and boats completely locked and solid, 60fps]',
        imagePrompt: 'Cinematic documentary establishing wide aerial shot of Labuan Teluk Santong in Plampang Sumbawa, calm protected bay with wooden fishing boats docked along a rustic wooden jetty, tranquil turquoise water of Saleh Bay, morning golden hour light, lush coastal hills in the background, authentic Indonesian maritime heritage realism, 9:16 vertical smartphone format --ar 9:16',
        emotion: 'Penasaran & Kagum',
        captionText: 'Labuan Teluk Santong: Pesisir bahari pelaut tangguh Suku Bugis di Teluk Saleh...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 2,
        time: '00:10 - 00:20',
        stage: 'Jejak Sejarah',
        stageColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
        title: 'Pelayaran Para Passompe Bugis',
        narration: 'Bukan suku Bajo... Pesisir Labuan Teluk Santong mayoritas dihuni oleh para "Passompe" atau perantau bahari Suku Bugis dari Sulawesi Selatan, yang mengarungi Laut Flores membawa nyali dan keterampilan maritim tinggi.',
        sumberIlmu: 'Catatan Sejarah Maritim: Istilah "Passompe" merujuk pada tradisi merantau pelaut Bugis. Mereka membangun pemukiman di Teluk Saleh karena teluknya sangat tenang dan melimpah dengan komoditas laut.',
        voiceGuide: '🎙️ Intonasi: Khidmat dan edukatif, meluruskan fakta sejarah dengan penekanan pada kata "Bukan suku Bajo" dan "Passompe Bugis".',
        visual: 'Ilustrasi perahu layar kayu tradisional Bugis membelah ombak samudra biru, dikemudikan oleh pelaut muda yang ramah dan pemberani dengan tatapan mata cerah bersemangat.',
        motionPrompt: '[Camera: Slow medium tracking shot alongside traditional wooden sailboat slicing through turquoise water at 0.3x speed] [Subject: Cute and spirited young sailor holding wooden rudder with warm focused gaze] [Stability: Wooden hull perfectly rigid, water splash natural and fluid, 60fps]',
        imagePrompt: 'Historical documentary shot, traditional handcrafted wooden sailing boat of Bugis voyagers (passompe) navigating calm coastal waters of Saleh Bay, a skilled cute and spirited young Bugis sailor with bright adventurous eyes, warm friendly smile, sun-kissed glowing skin, and captivating gaze at the rudder looking toward the sheltered shoreline of Teluk Santong, morning sunshine, authentic vintage maritime atmosphere, 9:16 vertical format --ar 9:16',
        emotion: 'Kagum & Menghargai Sejarah',
        captionText: 'Dirintis oleh para "Passompe" atau perantau pelaut ulung Suku Bugis...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 3,
        time: '00:20 - 00:30',
        stage: 'Hubungan Diplomatik',
        stageColor: 'border-blue-500 text-blue-400 bg-blue-500/10',
        title: 'Ikatan Kesultanan Sumbawa & Bugis',
        narration: 'Kedatangan masyarakat Bugis ke tanah Samawa berakar dari persahabatan erat antara Kesultanan Sumbawa dengan kerajaan di Sulawesi Selatan tempo dulu... Mereka disambut hangat dan diberi izin mengelola pesisir Teluk Saleh.',
        sumberIlmu: 'Arsip Hubungan Kerajaan: Sejarah mencatat traktat persaudaraan dan aliansi dagang maritim yang harmonis antara Kesultanan Sumbawa dengan Kesultanan Gowa-Tallo dan Kerajaan Bone sejak abad ke-17.',
        voiceGuide: '🎙️ Intonasi: Berwibawa tinggi, tempo stabil, mengalirkan kisah diplomasi persaudaraan antarpulau.',
        visual: 'Manuskrip kuno dan peta jalur maritim Nusantara di meja kayu jati istana dengan ornamen khas Kesultanan Sumbawa.',
        motionPrompt: '[Camera: Slow macro pan across ancient maritime navigation map at 0.3x speed, soft warm candlelit ambiance, rock-solid details, 60fps]',
        imagePrompt: 'Cinematic archival macro shot, historic manuscript and maritime trade map showing trade routes between South Sulawesi and Sumbawa Island on an antique wooden table, brass compass and wax seal, warm ambient lighting, 9:16 vertical portrait --ar 9:16',
        emotion: 'Respek & Nilai Sejarah',
        captionText: 'Persahabatan diplomatik Kesultanan Sumbawa dan kerajaan di Sulawesi Selatan...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 4,
        time: '00:30 - 00:40',
        stage: 'Arsitektur Khas',
        stageColor: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
        title: 'Rumah Panggung Kayu Pesisir',
        narration: 'Di sepanjang pantai Teluk Santong, berdirilah rumah-rumah panggung kayu khas Bugis bertiang tinggi... Struktur arsitektur ini kokoh menghadapi pasang surut air laut dan angin kencang Teluk Saleh.',
        sumberIlmu: 'Antropologi Budaya: Ciri khas fisik perkampungan Labuan Teluk Santong ditandai oleh deretan rumah panggung kayu ulin/teak dengan konstruksi pasak tradisional khas arsitektur Bugis.',
        voiceGuide: '🎙️ Intonasi: Hangat, deskriptif, mengajak pemirsa mengagumi arsitektur tradisional pesisir.',
        visual: 'Deretan rumah panggung kayu Bugis di tepian pantai berpasir dengan tiang-tiang kayu tertanam kokoh, tangga kayu menghadap pantai tenang.',
        motionPrompt: '[Camera: Smooth horizontal dolly pan past wooden stilt houses along the quiet sandy shore at 0.3x speed] [Stability: House structures perfectly locked, calm sea wash, 60fps]',
        imagePrompt: 'Cinematic realism photo of traditional Bugis wooden stilt houses along the tranquil coastline of Labuan Teluk Santong in Sumbawa, elevated wooden pillars on sandy shore, wooden verandas overlooking calm water, coconut palms swaying gently, warm tropical morning light, 9:16 vertical format --ar 9:16',
        emotion: 'Takjub & Damai',
        captionText: 'Arsitektur rumah panggung kayu khas Bugis kokoh berdiri di tepi teluk...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 5,
        time: '00:40 - 00:50',
        stage: 'Tradisi Bahari',
        stageColor: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
        title: 'Inovasi Bagan Apung & Ikan Teri',
        narration: 'Pelaut Bugis di Teluk Santong terkenal dengan kepiawaian mengoperasikan bagan apung di tengah laut... Menjadikan kawasan ini produsen cumi dan ikan teri kering berkualitas tinggi yang tersohor hingga luar daerah!',
        sumberIlmu: 'Sektor Ekonomi Pesisir: Bagan tancap dan bagan apung tradisional Bugis menjadi teknologi tangkap andalan di Teluk Santong, menghasilkan komoditas ikan teri dan cumi bernilai ekonomis tinggi.',
        voiceGuide: '🎙️ Intonasi: Dinamis, antusias, vokal bertenaga mengangkat reputasi ekonomi hasil laut.',
        visual: 'Struktur bagan apung dari bambu dan kayu di tengah laut tenang Teluk Santong dengan lampu petromaks menyala terang di kala petang.',
        motionPrompt: '[Camera: Cinematic slow circular orbit around floating bamboo fishing platform (bagan) at 0.3x speed, twilight sky, calm glowing water, 60fps]',
        imagePrompt: 'Cinematic dusk photography of traditional bamboo floating fishing platforms (bagan apung) in the calm waters of Teluk Saleh near Labuan Teluk Santong, warm lantern glow reflecting on serene turquoise water, fishermen preparing nets, dramatic purple and orange sunset sky, 9:16 vertical --ar 9:16',
        emotion: 'Kagum & Terpukau',
        captionText: 'Kepiawaian mengoperasikan bagan apung penghasil cumi & ikan teri berkualitas...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 6,
        time: '00:50 - 01:00',
        stage: 'Bahasa & Tutur',
        stageColor: 'border-purple-500 text-purple-400 bg-purple-500/10',
        title: 'Bahasa Bugis yang Tetap Lestari',
        narration: 'Hingga kini, percakapan sehari-hari dalam Bahasa Bugis masih fasih terdengar di dermaga dan pasar ikan Teluk Santong... Hidup berdampingan secara harmonis dengan Bahasa Samawa masyarakat lokal.',
        sumberIlmu: 'Sosiolinguistik: Komunitas Labuan Teluk Santong melestarikan dwibahasa (bilingual), mampu menuturkan bahasa Bugis sebagai identitas leluhur dan bahasa Samawa dalam pergaulan antarkampung.',
        voiceGuide: '🎙️ Intonasi: Ramah dan penuh keakraban sosial, artikulasi lembut menandakan kerukunan hidup.',
        visual: 'Aktivitas pagi yang hangat di dermaga ikan Teluk Santong, para nelayan dan pedagang tersenyum ramah bertukar sapa di atas perahu kayu.',
        motionPrompt: '[Camera: Slow medium tracking shot through bustling coastal jetty at 0.3x speed, fishermen organizing catch, smiling faces, 60fps]',
        imagePrompt: 'Authentic documentary photography, warm morning interaction at Labuan Teluk Santong fish landing jetty, friendly Bugis fishermen and local Sumbawa merchants in sarong talking beside wooden boats loaded with fresh catch, golden sunlight, 9:16 vertical --ar 9:16',
        emotion: 'Hangat & Rukun',
        captionText: 'Bahasa Bugis tetap lestari dan hidup rukun bersama Bahasa Samawa...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 7,
        time: '01:00 - 01:10',
        stage: 'Falsafah Luhur',
        stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
        title: 'Siri\' Na Pacce & Sabalong Samalewa',
        narration: 'Masyarakat Bugis di Teluk Santong memegang teguh prinsip "Siri\' Na Pacce"... Yaitu menjaga harga diri dan rasa peduli sesama, berpadu selaras dengan falsafah Sumbawa: "Sabalong Samalewa" demi menjaga kedamaian bersama.',
        sumberIlmu: 'Falsafah Budaya: Perpaduan nilai luhur Bugis "Siri\' Na Pacce" (kehormatan dan solidaritas rasa senasib) dengan kearifan Samawa "Sabalong Samalewa" (membangun dalam keselarasan sosial).',
        voiceGuide: '🎙️ Intonasi: Penuh penghormatan moral dan kearifan bijak, tempo lambat, artikulasi jelas pada kedua falsafah luhur.',
        visual: 'Siluet dua tokoh tetua adat bersalaman erat di beranda rumah panggung berlatar matahari terbenam keemasan di atas Teluk Saleh.',
        motionPrompt: '[Camera: Slow cinematic push-in on two community elders sitting on veranda at sunset at 0.3x speed, golden dusk light, peaceful harmony, 60fps]',
        imagePrompt: 'Heartwarming cinematic shot, Bugis and Sumbawa elders wearing traditional songkok sitting together on a wooden veranda overlooking the sunset over Saleh Bay, warm golden twilight, peaceful expression of unity and mutual respect, 9:16 vertical --ar 9:16',
        emotion: 'Terharu & Bijak',
        captionText: 'Prinsip "Siri\' Na Pacce" Bugis berpadu selaras dengan "Sabalong Samalewa" Sumbawa...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 8,
        time: '01:10 - 01:20',
        stage: 'Peran Ekonomi',
        stageColor: 'border-teal-500 text-teal-400 bg-teal-500/10',
        title: 'Sentra Ekonomi Maritim Plampang',
        narration: 'Kini, Labuan Teluk Santong telah tumbuh menjadi salah satu urat nadi ekonomi maritim terpenting di Kecamatan Plampang... Menyumbang pasokan komoditas laut segar bagi pasar-pasar di seantero Kabupaten Sumbawa.',
        sumberIlmu: 'Data Ekonomi Daerah: Labuan Teluk Santong merupakan salah satu pangkalan pendaratan ikan (PPI) aktif di pesisir selatan Teluk Saleh yang menopang ketahanan pangan dan logistik hasil laut NTB.',
        voiceGuide: '🎙️ Intonasi: Bangga, tegas, mengapresiasi kerja keras para nelayan dan pedagang pesisir.',
        visual: 'Pemandangan dermaga Labuan Teluk Santong yang teratur dengan perahu-perahu motor modern dan peti-peti es ikan siap didistribusikan ke kota.',
        motionPrompt: '[Camera: Slow high-angle pedestal movement revealing the organized bustling harbor at 0.35x speed, clear morning sunlight, 60fps]',
        imagePrompt: 'Modern coastal documentary photography of bustling Labuan Teluk Santong harbor in Plampang Sumbawa, colorful motorized wooden fishing boats lined up at the modern concrete pier, baskets of fresh fish and squid, crisp clear blue sky, 9:16 vertical --ar 9:16',
        emotion: 'Bangga & Maju',
        captionText: 'Urat nadi ekonomi maritim penting yang menopang pasokan hasil laut Sumbawa...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 9,
        time: '01:20 - 01:30',
        stage: 'Keajaiban Alam',
        stageColor: 'border-emerald-600 text-emerald-300 bg-emerald-600/10',
        title: 'Gerbang Teluk Saleh & Hiu Paus',
        narration: 'Kekayaan perairan Teluk Santong kian memukau dunia... Karena kawasan perairannya menjadi habitat lintasan Hiu Paus raksasa yang ramah, menjadikan para nelayan Bugis setempat sebagai garda terdepan pelestari ekosistem laut.',
        sumberIlmu: 'Konservasi Laut: Teluk Saleh dikenal sebagai akuarium raksasa dunia dan rumah bagi agregasi Hiu Paus (Rhincodon typus). Nelayan bagan Teluk Santong hidup berdampingan secara damai dengan satwa dilindungi ini.',
        voiceGuide: '🎙️ Intonasi: Penuh takjub, nada suara kagum pada keindahan biota laut dan komitmen konservasi.',
        visual: 'Seekor Hiu Paus besar berenang tenang di dekat permukaan air laut jernih di samping bagan apung nelayan Teluk Santong saat fajar.',
        motionPrompt: '[Camera: Breathtaking split-level underwater / surface slow tracking shot of gentle whale shark swimming gracefully at 0.3x speed, crystal clear turquoise water, 60fps]',
        imagePrompt: 'Stunning National Geographic style photography, a majestic gentle whale shark (Rhincodon typus) swimming gracefully near the water surface beside a traditional bamboo fishing bagan in Teluk Saleh near Teluk Santong, crystal clear turquoise water with golden morning sunbeams cutting through the sea, awe-inspiring nature conservation, 9:16 vertical --ar 9:16',
        emotion: 'Takjub & Terpesona',
        captionText: 'Habitat hiu paus ramah di Teluk Saleh, nelayan jadi garda pelestari alam...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 10,
        time: '01:30 - 01:40',
        stage: 'Penutup & CTA',
        stageColor: 'border-pink-500 text-pink-400 bg-pink-500/10',
        title: 'Warisan Abadi Pelaut Bugis Samawa',
        narration: 'Inilah bukti keindahan keberagaman Nusantara... Jejak pelaut tangguh Suku Bugis yang berakar kuat dan bersinar di Labuan Teluk Santong, Sumbawa! Pernahkah kamu berkunjung ke Teluk Saleh? Tulis ceritamu di kolom komentar ya!',
        sumberIlmu: 'Edukasi Kebangsaan: Menjadi sumber ilmu sejarah bahwa persaudaraan maritim antara Suku Bugis dan Tau Samawa adalah aset peradaban bahari Nusantara yang membanggakan.',
        voiceGuide: '🎙️ Intonasi: Hangat, bangga, menginspirasi rasa persatuan Nusantara, dan ramah mengajak diskusi di komentar TikTok.',
        visual: 'Pemandangan senja keemasan yang menawan di atas Labuan Teluk Santong dengan tipografi estetik penutup video TikTok FYP.',
        motionPrompt: '[Camera: Slow ascending drone pull-back over the tranquil waters of Teluk Santong at sunset at 0.3x speed, glowing twilight clouds, 60fps]',
        imagePrompt: 'Breathtaking cinematic sunset landscape over Labuan Teluk Santong in Sumbawa, glowing amber and violet twilight sky reflected on glass-like calm waters of Saleh Bay, silhouettes of wooden boats and stilt houses, aesthetic travel TikTok ending composition, 9:16 vertical --ar 9:16',
        emotion: 'Bangga & Interaktif',
        captionText: 'Jejak pelaut tangguh Bugis di Teluk Santong Sumbawa... Komen ceritamu!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      }
    ]
  },

  // 3. LEGENDA LALA BUNTE (LALA BUNTAR) - 10 UNIQUE SCENES (BAHASA SAMAWA)
  {
    id: 'lala_bunte',
    title: 'Legenda Lala Bunte (Lala Buntar) - Putri Berparas Purnama Sumbawa',
    scenes: [
      {
        id: 1,
        time: '00:00 - 00:10',
        stage: 'Hook Pembuka',
        stageColor: 'border-rose-500 text-rose-400 bg-rose-500/10',
        title: 'Paras Purnama di Tano Samawa',
        narration: 'Di tanah Samawa tempo dulu, lahirlah seorang putri jelita bernama Lala Buntar... Dalam bahasa Samawa, "Buntar" berarti rembulan purnama bulat sempurna, melambangkan parasnya yang bersinar meneduhkan setiap mata yang memandang!',
        voiceGuide: '🎙️ Intonasi: Nada membuka legenda mistis nusantara (hook), tempo sedang (~115 kpm), jeda khidmat di tanda koma, vokal jernih dan berwibawa.',
        visual: 'Putri bangsawan Sumbawa berparas manis, imut, dan sangat cantik jelita berdiri di balkon istana kayu kerajaan kuno Silang, mengenakan busana tenun khas Sumbawa saat malam bulan purnama.',
        motionPrompt: '[Camera: Slow cinematic push-in forward at 0.35x speed, locked horizon] [Subject: Super cute and breathtakingly beautiful princess with delicate round rosy cheeks, sweet expressive sparkling eyes, soft wind fluttering her traditional silk headscarf, glowing moonbeams reflecting on serene face] [Stability: 100% facial and physical coherence, zero morphing, smooth 60fps]',
        imagePrompt: 'Claymation style, young super cute and adorable Indonesian princess Lala Buntar with sweet round cheeks, large sparkling expressive eyes, heartwarming gentle smile, standing on a carved teakwood palace balcony, glowing full moon in the dark tropical night sky casting ethereal silver light on her serene face, wearing authentic traditional Sumbawa handwoven silk sarung, tactile clay sculpture textures, high detail, 9:16 vertical smartphone format --ar 9:16',
        emotion: 'Merinding & Kagum',
        captionText: 'Lala Buntar: Putri berparas rembulan purnama dari Tano Samawa...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 2,
        time: '00:10 - 00:20',
        stage: 'Kearifan Lokal',
        stageColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
        title: 'Boto Menenun Kre Alang Emas',
        narration: 'Bukan hanya parasnya yang elok... Lala Buntar dikenal sangat "Boto" atau terampil menenun "Kre Alang", kain songket tenun khas Sumbawa berhias benang emas... Kelembutan pekertinya memikat hati seluruh rakyat Kerajaan Silang.',
        voiceGuide: '🎙️ Intonasi: Hangat dan penuh sanjungan budaya, penekanan jelas pada istilah Samawa "Boto" dan "Kre Alang".',
        visual: 'Putri Lala Buntar duduk bersila di bale-bale istana kayu menenun kain songket Kre Alang dengan alat tenun gedogan kayu tradisional.',
        motionPrompt: '[Camera: Slow steady horizontal tracking shot at 0.3x speed] [Action: Gentle rhythmic motion of wooden shuttle passing through colorful golden threads, soft natural breathing] [Stability: Perfect hands and loom stability, no frame glitch, 60fps]',
        imagePrompt: 'Claymation style, princess Lala Buntar sitting gracefully on a traditional wooden veranda weaving ornate golden Sumbawa songket (Kre Alang) on a traditional wooden loom, warm morning sunlight streaming through wooden lattice windows, detailed threads and handcrafted wood grain, authentic cultural heritage, 9:16 vertical --ar 9:16',
        emotion: 'Takjub & Bangga Budaya',
        captionText: 'Sangat "Boto" menenun Kre Alang berbenang emas...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 3,
        time: '00:20 - 00:30',
        stage: 'Kabar Mancanegara',
        stageColor: 'border-blue-500 text-blue-400 bg-blue-500/10',
        title: 'Kabar Burung ke Mancanegara',
        narration: 'Kabar tentang keelokan dan budi luhur sang putri berhembus melintasi samudra... Saudagar dan utusan raja dari berbagai kerajaan Nusantara mulai berlayar menuju pesisir Sumbawa dengan membawa persembahan peti emas.',
        voiceGuide: '🎙️ Intonasi: Megah dan dinamis, tempo sedang (~120 kpm), membangkitkan suasana zaman maritim kuno.',
        visual: 'Perahu-perahu pinisi megah dari berbagai kerajaan berlabuh di pelabuhan tua Sumbawa membawa peti-peti persembahan emas dan kain sutra.',
        motionPrompt: '[Camera: Cinematic wide establishing pan at 0.3x speed across harbor] [Atmosphere: Gentle ocean waves, calm sea breeze fluttering flags, stable clay models] [Stability: High temporal coherence, zero geometric warping, 60fps]',
        imagePrompt: 'Claymation style, grand traditional Indonesian sailing ships (pinisi) docking at an ancient Sumbawa harbor at sunrise, royal envoys carrying treasure chests filled with gold and gifts, bustling historic harbor, 9:16 vertical --ar 9:16',
        emotion: 'Megah & Penasaran',
        captionText: 'Kabar keelokan sang putri tersebar hingga ke seberang samudra...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 4,
        time: '00:30 - 00:40',
        stage: 'Konflik Pinangan',
        stageColor: 'border-orange-500 text-orange-400 bg-orange-500/10',
        title: 'Dilema Puluhan Pangeran Melamar',
        narration: 'Namun pinangan tak hanya datang dari satu kerajaan... Puluhan pangeran perkasa datang bersamaan, masing-masing menuntut untuk mempersunting Lala Buntar dengan ancaman perang jika pinangannya ditolak!',
        voiceGuide: '🎙️ Intonasi: Tegang, nada suara meninggi pada kata "ancaman perang", tempo agak cepat menuntut perhatian.',
        visual: 'Para pangeran bangsawan berbusana kerajaan megah berkumpul di balairung istana dengan raut wajah tegang dan saling menatap tajam, menanti keputusan sang Datu (Raja).',
        motionPrompt: '[Camera: Slow dramatic push-in between rival princes towards the throne at 0.35x speed] [Lighting: Flickering torch flames on expressive stylized facial features, heavy cinematic tension] [Stability: Completely solid character anatomies, no distortion, 60fps]',
        imagePrompt: 'Claymation style, tense royal court hall inside Sumbawa wooden palace, several young princes featuring stylized expressive character design, big emotional eyes, commanding gaze, wearing ornate traditional armor and royal regalia confronting each other with tense dramatic expressions, warm torchlight casting long dramatic shadows, 9:16 vertical --ar 9:16',
        emotion: 'Tegang & Was-was',
        captionText: 'Puluhan pangeran meminang, ancaman perang melanda istana...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 5,
        time: '00:40 - 00:50',
        stage: 'Musyawarah Adat',
        stageColor: 'border-purple-500 text-purple-400 bg-purple-500/10',
        title: 'Sangkep Adat Datu Silang',
        narration: 'Melihat ancaman pertumpahan darah, Datu Silang menggelar "Sangkep", musyawarah tetua adat istana... Sang Raja berada di persimpangan jalan: memilih salah satu pelamar berarti memicu amarah dan perang dari pangeran lainnya!',
        voiceGuide: '🎙️ Intonasi: Serius, penuh kegelisahan mendalam, artikulasi jelas pada kata "Sangkep" dan "Datu Silang".',
        visual: 'Datu Silang duduk di singgasana kayu berukir motif khas Samawa, berbincang cemas dengan para tetua adat istana yang memegang keris pusaka.',
        motionPrompt: '[Camera: Slow low-angle pedestal move at 0.3x speed focusing on the concerned King] [Environment: Soft candle smoke drifting upwards, solemn expression] [Stability: Flawless structural and anatomical coherence, 60fps]',
        imagePrompt: 'Claymation style, King Datu Silang sitting anxiously on an intricately carved wooden throne adorned with Sumbawa cultural motifs, surrounded by wise elder advisors in traditional headwraps (sapupu), serious deliberation, moody ambient candlelight, 9:16 vertical --ar 9:16',
        emotion: 'Bingung & Tertekan',
        captionText: 'Musyawarah "Sangkep" adat digelar demi mencegah pertumpahan darah...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 6,
        time: '00:50 - 01:00',
        stage: 'Niat Suci',
        stageColor: 'border-pink-500 text-pink-400 bg-pink-500/10',
        title: 'Keikhlasan Hati Sang Putri',
        narration: 'Mendengar tumpah darah tanah kelahirannya terancam kehancuran, hati Lala Buntar remuk redam... Baginya, keselamatan seluruh Tau Samawa jauh lebih utama daripada keselamatan dirinya sendiri.',
        voiceGuide: '🎙️ Intonasi: Lembut menyentuh sanubari, tempo melambat, vokal bergetar haru mengekspresikan ketulusan suci sang putri.',
        visual: 'Lala Buntar yang berparas manis menggemaskan bersujud di hadapan sang ayah, baginda Datu (Raja) yang berwibawa hangat dengan janggut perak rapi di kamar istana temaram, memohon doa restu.',
        motionPrompt: '[Camera: Intimate slow push-in at 0.25x speed capturing the solemn emotion] [Subject: Sweet princess and kindly loving elderly King, micro-breathing, gentle tears catching lamplight, serene determination] [Stability: Locked facial geometry, realistic cloth drape, 60fps]',
        imagePrompt: 'Claymation style, emotional scene inside the royal bedchamber, cute and sweet princess Lala Buntar (adorable expressive eyes, rosy cheeks) kneeling respectfully before her loving father the King (warm kindly grandfather figure with gentle dignified aging and elegant silver-gray beard), soft warm lantern light, 9:16 vertical --ar 9:16',
        emotion: 'Haru & Menyentuh',
        captionText: 'Demi kedamaian rakyat Samawa, sang putri mengambil keputusan besar...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 7,
        time: '01:00 - 01:10',
        stage: 'Langkah Takdir',
        stageColor: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
        title: 'Menuju Puncak Bukit Sunyi',
        narration: 'Tepat pada malam bulan purnama raya... Ketika langit terang benderang oleh rembulan bulat, Lala Buntar melangkah seorang diri mendaki bukit savana sunyi diiringi doa suci keselamatan negeri.',
        voiceGuide: '🎙️ Intonasi: Khusyuk, berbisik magis, memberi jeda hening di akhir kalimat.',
        visual: 'Siluet Lala Buntar mengenakan selendang putih panjang menaiki bukit savana berbatu di bawah siraman cahaya bulan purnama raksasa di langit Sumbawa.',
        motionPrompt: '[Camera: Slow majestic camera crane tracking upward at 0.35x speed] [Environment: Tall grass swaying rhythmically in night mountain wind, moonlight reflecting softly on the hill crest] [Stability: Smooth path geometry, zero visual jitter, 60fps]',
        imagePrompt: 'Claymation style, poetic silhouette of princess Lala Buntar walking up a rocky savannah hill ridge under a gigantic glowing silver full moon, her long traditional white scarf trailing gently behind her, mystical night sky with twinkling stars, 9:16 vertical --ar 9:16',
        emotion: 'Magis & Syahdu',
        captionText: 'Malam purnama raya, melangkah ke puncak bukit sunyi...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 8,
        time: '01:10 - 01:20',
        stage: 'Klimaks Moksa',
        stageColor: 'border-red-600 text-red-400 bg-red-600/10',
        title: 'Bersatu dengan Cahaya Rembulan',
        narration: 'Di puncak tertinggi, ia menengadahkan tangan memohon agar kedamaian abadi menaungi Tano Samawa... Seketika cahaya rembulan keperakan menyelimuti raganya, dan sang putri moksa menghilang menjadi pendar cahaya suci!',
        voiceGuide: '🎙️ Intonasi: Klimaks dramatis dan merinding, resonansi vokal memuncak penuh keajaiban saat kata "moksa".',
        visual: 'Kilauan cahaya magis keperakan menyelimuti sang putri di puncak bukit, selendang tenunnya perlahan melayang di udara saat raganya bertransformasi menjadi pendar cahaya rembulan.',
        motionPrompt: '[Camera: Dynamic slow camera orbit at 0.3x speed around the glowing figure] [FX: Shimmering ethereal light rays expanding smoothly, gentle mystical particles floating, wind dynamics] [Stability: Flawless lighting blend, zero artifacting, 60fps]',
        imagePrompt: 'Claymation style, climactic mythical ascension scene, princess Lala Buntar enveloped in divine ethereal silver-blue moonlight beams atop the mountain peak, her ornate woven sash floating upward into starry heavens, glowing particles, awe-inspiring folklore moment, 9:16 vertical --ar 9:16',
        emotion: 'Tercengang & Merinding',
        captionText: 'Seketika cahaya purnama menyelimuti, sang putri moksa demi kedamaian!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 9,
        time: '01:20 - 01:30',
        stage: 'Kedamaian Abadi',
        stageColor: 'border-teal-500 text-teal-400 bg-teal-500/10',
        title: 'Pedang Ditundukkan & Perang Terhindar',
        narration: 'Para pangeran yang bergegas menyusul hanya menemukan aroma semerbak melati dan sehelai kain tenun emas... Tersadar oleh pengorbanan luhur sang putri, seluruh pangeran menundukkan senjata dan mengurungkan niat berperang.',
        voiceGuide: '🎙️ Intonasi: Damai, penuh rasa hormat mendalam, nada lega dan syahdu.',
        visual: 'Para pangeran menundukkan senjata mereka dengan rasa hormat di atas bukit berselimut kabut pagi, memandang sehelai kain tenun emas sang putri yang tertinggal di atas batu karang suci.',
        motionPrompt: '[Camera: Slow low tracking shot panning past bowed warriors towards the golden scarf at 0.3x speed] [Environment: Morning sunlight breaking through clouds, mist drifting gently] [Stability: Solid rocks and weapons, 60fps]',
        imagePrompt: 'Claymation style, humbled princes and warriors lowering their spears and swords around a sacred mossy rock where a golden woven scarf rests, morning dawn mist rolling over savannah hills, peaceful respectful atmosphere, 9:16 vertical --ar 9:16',
        emotion: 'Lega & Takzim',
        captionText: 'Tersadar oleh pengorbanannya, perang terhindar dan senjata ditundukkan...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 10,
        time: '01:30 - 01:40',
        stage: 'Warisan & CTA',
        stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
        title: 'Pesan Sabalong Samalewa',
        narration: 'Hingga kini, kisah Lala Buntar hidup abadi dalam sanubari Tau Samawa... Mengajarkan nilai luhur "Sabalong Samalewa", mengutamakan kedamaian bersama di atas kepentingan nafsu... Bagikan kisah ini dan follow untuk legenda nusantara lainnya!',
        voiceGuide: '🎙️ Intonasi: Ramah, inspiratif, tempo stabil mengajak interaksi aktif penonton di kolom komentar.',
        visual: 'Pemandangan indah perbukitan savana Sumbawa bermandikan sinar matahari fajar keemasan dengan siluet gadis penenun desa masa kini yang tersenyum damai.',
        motionPrompt: '[Camera: Smooth slow drone pull-back revealing the serene Sumbawa countryside at 0.35x speed] [Subject: Warm smile, peaceful morning ambiance, birds flying in distance] [Stability: Absolute terrain and character stability, crisp 60fps]',
        imagePrompt: 'Claymation style, breathtaking sunrise over the golden savannah hills of Sumbawa, a smiling young modern Sumbawa girl wearing traditional headcloth standing proudly by her home, warm cinematic sunrise rays, peaceful cultural legacy, 9:16 vertical --ar 9:16',
        emotion: 'Inspiratif & Ingin Berbagi',
        captionText: 'Falsafah "Sabalong Samalewa" abadi di tanah Sumbawa. Komen & Follow!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      }
    ]
  },

  // 3. SITI MARYAM DARI BIMA - 6 SCENES (BAHASA MBOJO)
  {
    id: 'siti_maryam',
    title: 'Kisah Tragis Siti Maryam dari Bima',
    scenes: [
      {
        id: 1,
        time: '00:00 - 00:10',
        stage: 'Hook Pembuka',
        stageColor: 'border-rose-500 text-rose-400 bg-rose-500/10',
        title: 'Rahasia Teluk Dana Mbojo',
        narration: 'Di balik indahnya teluk Dana Mbojo, tersembunyi jeritan gadis berbusana Rimpu yang tak pernah kembali ke daratan.',
        voiceGuide: '🎙️ Intonasi: Nada membuka misteri kelam, artikulasi tegas pada bahasa Bima "Dana Mbojo" dan "Rimpu".',
        visual: 'Gadis Dou Mbojo berbusana adat rimpu berdiri di tebing karang menatap laut berombak kelam saat senja temaram.',
        motionPrompt: 'Slow zoom in, wind blowing traditional sarung woven fabric, dramatic crashing sea foam, subtle blinking eye, cinematic claymation motion blur 60fps',
        imagePrompt: 'Claymation style, traditional Bima teenage girl standing near dramatic coastal cliff, stormy golden hour sky, handcrafted clay texture with tactile fingerprints, 9:16 vertical portrait aspect ratio',
        emotion: 'Merinding & Penasaran',
        captionText: 'Di balik indahnya teluk Bima, ada rahasia kelam...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 2,
        time: '00:10 - 00:20',
        stage: 'Konflik Awal',
        stageColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
        title: 'Janji Palsu Saudagar Ntoi',
        narration: 'Kala zaman "Ntoi" atau masa lampau, Siti Maryam dijanjikan kehidupan mulia di seberang pulau, namun kapal pinisi itu membawanya ke jurang tipu daya.',
        voiceGuide: '🎙️ Intonasi: Melodramatis, pilu dan bergetar sedih, penekanan pada kata "Ntoi".',
        visual: 'Kapal pinisi kayu tua berlayar menembus kabut malam, Siti Maryam menatap jendela kapal dengan mata berkaca-kaca.',
        motionPrompt: 'Camera tracking shot following old wooden ship entering thick mist, lanterns swaying slowly, emotional gaze towards the camera, stop-motion fluid frame rate',
        imagePrompt: 'Claymation style, weathered traditional wooden ship sailing through eerie ocean fog, glowing oil lantern, girl looking out small wooden portal window, melancholic expression, 9:16 vertical ratio',
        emotion: 'Khawatir & Pilu',
        captionText: 'Janji manis itu seketika berubah jadi mimpi buruk...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 3,
        time: '00:20 - 00:30',
        stage: 'Eskalasi',
        stageColor: 'border-orange-500 text-orange-400 bg-orange-500/10',
        title: 'Terjebak di Samudra Lepas',
        narration: 'Saat menyadari dirinya diperjualbelikan, tak ada jalan pulang bagi anak dara Bima ini selain amukan gelombang samudra lepas yang buas.',
        voiceGuide: '🎙️ Intonasi: Tegang, tempo cepat, menjiwai kepungan bahaya di tengah laut.',
        visual: 'Ombak besar menghantam lambung kapal kayu, bayangan para awak kapal kejam mengepung Maryam di geladak.',
        motionPrompt: 'Dynamic camera shake, violent stormy sea splashing water droplets across screen, intense dramatic rim lighting on clay characters',
        imagePrompt: 'Claymation style, stormy violent ocean waves hitting deck, terrified girl backed against ship mast, ominous shadows of captors, high contrast lightning flash, 9:16 portrait',
        emotion: 'Tegang & Tertekan',
        captionText: 'Tak ada pertolongan, hanya ombak buas menanti...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 4,
        time: '00:30 - 00:40',
        stage: 'Klimaks',
        stageColor: 'border-red-600 text-red-400 bg-red-600/10',
        title: 'Menjaga Marwah Dou Mbojo',
        narration: 'Menjunjung prinsip luhur perempuan Bima, lebih baik menjaga marwah kehormatan di dasar samudra daripada hidup terbelenggu dalam noda kezaliman!',
        voiceGuide: '🎙️ Intonasi: Puncak heroisme yang memilukan, nada tegas dan bergetar kuat.',
        visual: 'Siti Maryam melompat dari buritan kapal ke dalam deburan laut malam yang bergolak diterangi kilatan petir.',
        motionPrompt: 'Slow motion freefall jump into dark ocean, fabric floating upwards in wind, lightning flashes illuminating water surface, heart-stopping cinematic pacing',
        imagePrompt: 'Claymation style, heroic and heartbreaking moment, girl jumping off ship railing into dark abyss of sea, swirling waves, rim light silhouette, 9:16 vertical',
        emotion: 'Terpukul & Kagum',
        captionText: 'Daripada hina, ia memilih tidur abadi di samudra...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 5,
        time: '00:40 - 00:50',
        stage: 'Mitos Karang',
        stageColor: 'border-purple-500 text-purple-400 bg-purple-500/10',
        title: 'Suara Ratapan dari Karang Bisu',
        narration: 'Hingga kini, para nelayan Bima yang melintas malam hari kerap mendengar dendang sendu "Lara Mawa" atau nyanyian duka dari karang yang membisu.',
        voiceGuide: '🎙️ Intonasi: Berbisik merinding, misterius dan menyayat hati, tempo lambat.',
        visual: 'Karang laut berbentuk siluet wanita bercahaya fosfor hijau kebiruan di bawah cahaya bulan purnama.',
        motionPrompt: 'Slow ethereal pan across glowing coral reefs, bioluminescent particles floating around rock formation, calm ripples, mystical atmosphere',
        imagePrompt: 'Claymation style, mystical bioluminescent coral rock shaped like a silhouette of a woman in traditional headscarf, moonlight shimmering on calm sea, 9:16 format',
        emotion: 'Merinding & Mistis',
        captionText: 'Hingga kini suara tangisnya konon masih terdengar...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 6,
        time: '00:50 - 01:00',
        stage: 'Pesan & CTA',
        stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
        title: 'Pesan Moral & Penutup FYP',
        narration: 'Pernahkah kamu mendengar legenda ini dari tetua Bima? Tulis pendapatmu di bawah dan follow untuk kisah legenda nusantara lainnya!',
        voiceGuide: '🎙️ Intonasi: Bersahabat, hangat dan komunikatif mengajak interaksi TikTok.',
        visual: 'Teks call to action sinematik dengan latar belakang matahari terbit menyinari bukit savana Bima yang damai.',
        motionPrompt: 'Smooth drone push-out over sun-drenched savannah landscape of Bima NTB, gentle morning light rays piercing mountain mist, peaceful conclusion',
        imagePrompt: 'Claymation style, beautiful golden sunrise over hills of Bima NTB, gentle peaceful atmosphere, warm morning rays, artistic hand-sculpted landscape, 9:16 vertical',
        emotion: 'Reflektif & Ingin Diskusi',
        captionText: 'Pernahkah kamu dengar kisah ini? Komen di bawah!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      }
    ]
  },

  // 4. DANAU TOBA - 5 SCENES (BAHASA BATAK)
  {
    id: 'danau_toba',
    title: 'Misteri Sumpah Ikan Mas Danau Toba',
    scenes: [
      {
        id: 1,
        time: '00:00 - 00:10',
        stage: 'Hook Pembuka',
        stageColor: 'border-rose-500 text-rose-400 bg-rose-500/10',
        title: 'Ikan Bersisik Emas Bona Pasogit',
        narration: 'Jangan pernah melanggar sumpah suci di tanah Bona Pasogit, atau lembah desamu akan ditenggelamkan air bah abadi!',
        voiceGuide: '🎙️ Intonasi: Nada hook tajam dan berwibawa, artikulasi jelas pada istilah "Bona Pasogit".',
        visual: 'Seorang pemuda manis dan bersahaja tertegun memegang ikan bersisik emas berkilau magis di tepi sungai purba berselimut kabut.',
        motionPrompt: 'Slow zoom in to shimmering golden fish in cute young fisherman hands, glowing water ripples, big expressive eyes, clay stop motion texture',
        imagePrompt: 'Claymation style, young cute and charming fisherman with big expressive eyes, rounded friendly cheeks, clear skin, holding glowing golden carp fish by mist-covered river, 9:16 vertical',
        emotion: 'Penuh Tanda Tanya',
        captionText: 'Jangan pernah ambil ikan emas ini jika tak mau celaka...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 2,
        time: '00:10 - 00:20',
        stage: 'Konflik Utama',
        stageColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
        title: 'Janji Terlarang yang Terucap',
        narration: 'Sumpah untuk menjaga rahasia asal-usul runtuh hanya karena amarah sesaat... Kata terlarang terucap, dan petir seketika menyambar!',
        voiceGuide: '🎙️ Intonasi: Penuh amarah yang berbuah penyesalan mendalam, tempo cepat.',
        visual: 'Pria dengan ekspresi wajah dramatis berteriak dengan wajah murka di depan rumah bolon tradisional, langit tiba-tiba menggelap pekat.',
        motionPrompt: 'Dynamic camera push-in on furious father shouting, clouds rolling rapidly across sky, expressive stop-motion animation',
        imagePrompt: 'Claymation style, emotional father figure with expressive stop-motion facial features, big dramatic eyes and emotional expression, pointing hand in front of Batak traditional wooden house, dark thunder clouds rolling in, 9:16',
        emotion: 'Panik & Menyesal',
        captionText: 'Satu kalimat terlarang terucap, langit langsung murka...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 3,
        time: '00:20 - 00:30',
        stage: 'Klimaks Banjir',
        stageColor: 'border-red-600 text-red-400 bg-red-600/10',
        title: 'Air Bah Menenggelamkan Lembah',
        narration: 'Mata air memancar dahsyat dari perut bumi tanpa henti... Menenggelamkan seluruh daratan menjadi danau vulkanik terluas di Asia Tenggara!',
        voiceGuide: '🎙️ Intonasi: Puncak kepanikan dan kedahsyatan alam yang maha dahsyat.',
        visual: 'Air bah raksasa mengalir deras dari celah bukit, menelan seluruh lembah menjadi danau megah.',
        motionPrompt: 'Epic wide shot of floodwaters rushing into green valley, lightning cracks, dramatic clay water simulation',
        imagePrompt: 'Claymation style, epic floodwaters engulfing green ancient valley, dramatic lighting, rain pouring down, 9:16',
        emotion: 'Tercengang & Mencekam',
        captionText: 'Dalam semalam, lembah hijau itu menjadi danau abadi!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 4,
        time: '00:30 - 00:40',
        stage: 'Terciptanya Samosir',
        stageColor: 'border-purple-500 text-purple-400 bg-purple-500/10',
        title: 'Munculnya Pulau di Tengah Danau',
        narration: 'Sang anak yang berlari ke bukit tertinggi diselamatkan oleh doa sang ibu, menjelma menjadi Pulau Samosir di tengah hamparan danau.',
        voiceGuide: '🎙️ Intonasi: Syahdu dan megah, tempo sedang.',
        visual: 'Pulau Samosir yang hijau berdiri megah di tengah birunya perairan Danau Toba saat kabut pagi perlahan tersibak.',
        motionPrompt: 'Slow panoramic aerial pan showing Samosir island emerging from morning mist on Lake Toba, 60fps smooth',
        imagePrompt: 'Claymation style, majestic aerial view of Samosir island in the middle of azure blue Lake Toba, green rolling hills, peaceful morning rays, 9:16',
        emotion: 'Takjub & Damai',
        captionText: 'Bukit penyelamat sang anak menjelma menjadi Pulau Samosir...',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      },
      {
        id: 5,
        time: '00:40 - 00:50',
        stage: 'Pesan & Horas',
        stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
        title: 'Pesan Sumpah & Horas FYP',
        narration: 'Kisah ini mengajarkan kita pentingnya menjaga amanah dan sumpah janji... Horas! Komen pendapatmu dan follow untuk legenda nusantara berikutnya!',
        voiceGuide: '🎙️ Intonasi: Hangat, penuh wibawa, ucapkan kata "Horas" dengan lantang dan ramah.',
        visual: 'Lanskap indah Danau Toba hari ini dengan perahu nelayan tradisional dan tipografi penutup inspiratif.',
        motionPrompt: 'Gentle drone ascending shot over Lake Toba waters, soft wind, sparkling sunshine, stable cinematic 60fps',
        imagePrompt: 'Claymation style, serene and stunning Lake Toba today, traditional Batak canoe on calm water, majestic pine trees on cliff, golden sunshine, 9:16',
        emotion: 'Inspiratif & Bangga',
        captionText: 'Jaga selalu sumpah dan janjimu! Horas! Komen di bawah!',
        duration: 10,
        status: { image: false, flow: false, inspected: false }
      }
    ]
  }
];

// HELPER SANITASI KHUSUS FLOW AI (100% ANTI-PELANGGARAN HAK CIPTA PIHAK KETIGA DENGAN NARASI & PENGISI SUARA KONSISTEN)
export function cleanMotionPromptForFlow(rawPrompt, styleId = 'pixar', narration = '', voiceGuide = '') {
  if (!rawPrompt && !narration) return '';
  let clean = rawPrompt || '';

  // 1. Hapus nama studio berhak cipta jika ada
  clean = clean.replace(/\b(Pixar|Disney|Studio Ghibli|Ghibli|DreamWorks|Marvel)\b/gi, 'feature animation');

  // 2. Hapus referensi aktor Korea / asing jika masih ada
  clean = clean.replace(/\b(South Korean|Korean male lead|K-drama)\b/gi, 'original bespoke');

  // 3. Hapus tag negatif yang memicu moderasi seperti "no watermark", "no text"
  clean = clean.replace(/,\s*no text[^\n.]*/gi, '');
  clean = clean.replace(/,\s*no watermark[^\n.]*/gi, '');
  clean = clean.replace(/no modern objects[^\n.]*/gi, '');

  // 4. Pastikan Framing 9:16 selalu dipertahankan di dalam prompt motion
  if (!/9:16|vertical/i.test(clean)) {
    clean = clean.trim() + ' [Framing: Vertical 9:16 smartphone portrait ratio]';
  }

  // 5. Pastikan Voiceover konsisten dan Narasi ada di dalam prompt video
  const hasVoiceover = /\[Voiceover:|\bVoiceover:|\bSame consistent narrator/i.test(clean);
  if (!hasVoiceover && narration && narration.trim()) {
    const cleanNarration = narration.replace(/"/g, "'").trim();
    const tone = (voiceGuide || '')
      .replace(/^🎙️\s*/, '')
      .replace(/^Intonasi(?:\s*narator)?:\s*/i, '')
      .replace(/^Intonasi\s+narator\s+/i, '')
      .replace(/^Intonasi\s+/i, '')
      .trim() || 'warm, engaging, articulate Indonesian narrator';
    clean = clean.trim() + ` [Voiceover: Same consistent Indonesian narrator voice (${tone}): "${cleanNarration}"]`;
  }

  // Jika terlalu pendek atau kosong, berikan format bracket standar yang lengkap (9:16)
  if (clean.length < 30) {
    const cleanNarration = (narration || '').replace(/"/g, "'").trim() || 'Kisah edukasi Nusantara yang membuka wawasan kita semua.';
    const tone = (voiceGuide || '')
      .replace(/^🎙️\s*/, '')
      .replace(/^Intonasi(?:\s*narator)?:\s*/i, '')
      .replace(/^Intonasi\s+narator\s+/i, '')
      .replace(/^Intonasi\s+/i, '')
      .trim() || 'warm, engaging, articulate Indonesian narrator';
    clean = `[Camera: Slow cinematic push-in at 0.3x speed, steady framing] [Framing: Strict vertical 9:16 portrait ratio, smartphone orientation] [Subject: Original cute stylized character with unique distinct facial features blinks gently, smiles warmly, and gestures naturally] [Environment: Soft tropical breeze rustling traditional Indonesian woven fabric, warm natural lighting] [Voiceover: Same consistent Indonesian narrator voice (${tone}): "${cleanNarration}"] [Motion: Smooth organic animation, zero morphing, high stability, vertical 9:16, 60fps]`;
  }

  return clean.trim();
}

// HELPER: GENERATE PROMPTS DENGAN KARAKTER LUCU & MENGGEMASKAN SESUAI GAYA VISUAL DENGAN NARASI & PENGISI SUARA KONSISTEN (FORMAT 9:16)
export function generateStylePrompts(styleId, topic, visualText, narrationText = '', voiceGuide = '') {
  const cleanVisual = (visualText || '').replace(/\.$/, '');
  const cleanTopic = topic || 'Nusantara Heritage';
  const cleanNarration = (narrationText || '').replace(/"/g, "'").trim() || `Kisah edukasi seputar ${cleanTopic} yang memikat dan membuka wawasan.`;
  const tone = (voiceGuide || '')
    .replace(/^🎙️\s*/, '')
    .replace(/^Intonasi(?:\s*narator)?:\s*/i, '')
    .replace(/^Intonasi\s+narator\s+/i, '')
    .replace(/^Intonasi\s+/i, '')
    .trim() || 'warm, engaging, articulate Indonesian narrator voice';

  switch (styleId) {
    case 'pixar':
      return {
        imagePrompt: `Adorable stylized 3D animation style, vertical 9:16 portrait format. Authentic Indonesian setting for ${cleanTopic}. ${cleanVisual}. Featuring a 100% original bespoke character design, completely unique and never-before-seen original concept, one-of-a-kind distinctive facial features, proprietary original character IP, not based on any existing character or real person, super cute and adorable stylized 3D aesthetics, big luminous sparkling eyes full of wonder, cute rounded rosy cheeks, sweet heartwarming smile, soft subsurface scattering skin, wearing vibrant authentic Indonesian traditional attire [tenun ikat / batik / kebaya], rich textures, magical warm cinematic 3D animated film lighting, whimsical depth of field, high-end 3D CGI movie studio quality render, 9:16 vertical smartphone format --ar 9:16, 4K.`,
        motionPrompt: `[Camera: Slow cinematic push-in at 0.3x speed, steady framing] [Framing: Strict vertical 9:16 portrait ratio, smartphone screen orientation] [Subject: Original cute stylized 3D character with unique distinctive facial features and big sparkling eyes blinks gently, smiles with cheerful warmth, and turns head naturally] [Environment: Gentle breeze fluttering traditional woven attire and lush foliage, soft warm cinematic 3D lighting] [Voiceover: Same consistent Indonesian narrator voice (${tone}): "${cleanNarration}"] [Motion: Fluid stylized animation, high temporal coherence, zero morphing, stable geometry, vertical 9:16, 60fps]`
      };

    case 'anime':
      return {
        imagePrompt: `Adorable Japanese watercolor anime style, vertical 9:16 portrait format. Authentic Indonesian setting for ${cleanTopic}. ${cleanVisual}. Featuring a 100% original bespoke anime character design, completely unique and never-before-seen concept, one-of-a-kind distinct facial aesthetics, proprietary original character, not resembling any existing anime figure, exceptionally cute and endearing, big emotional sparkling eyes full of curiosity, gentle rosy blush on cheeks, wholesome heartwarming smile, innocent and lovable personality, wearing authentic traditional Indonesian attire [tenun ikat / batik / kebaya], hand-drawn traditional watercolor aesthetic, lush vibrant tropical nature, nostalgic sky with fluffy clouds, hand-painted anime masterpiece, 9:16 vertical smartphone format --ar 9:16, 4K.`,
        motionPrompt: `[Camera: Gentle cinematic pan and slow zoom at 0.3x speed] [Framing: Strict vertical 9:16 portrait ratio, smartphone screen orientation] [Subject: Original cute watercolor anime character with unique distinct facial features and large emotional eyes blinks softly, smiles warmly with gentle head tilt] [Environment: Soft wind fluttering traditional attire and hair, watercolor scenery, warm natural lighting] [Voiceover: Same consistent Indonesian narrator voice (${tone}): "${cleanNarration}"] [Motion: Delicate hand-drawn anime animation feeling, high temporal consistency, zero morphing, vertical 9:16, 60fps]`
      };

    case 'cinematic':
      return {
        imagePrompt: `Photorealistic 8k cinematic film masterpiece, vertical 9:16 portrait format. Authentic Indonesian setting for ${cleanTopic}. ${cleanVisual}. Featuring a 100% original bespoke character, completely unique and never-before-seen facial appearance, proprietary original design, not based on any celebrity or known person, heartwarming, sweet, and lovable presence with warm friendly smiles, bright expressive captivating eyes full of warmth, natural soft facial features, wearing authentic Indonesian woven attire [tenun ikat / batik / kebaya], natural morning golden hour lighting, 35mm anamorphic lens, shallow depth of field, rich cinematic film grain, ultra-sharp focus, 9:16 vertical smartphone format --ar 9:16, 4K.`,
        motionPrompt: `[Camera: Slow steady cinematic push-in at 0.3x speed, 35mm film aesthetic] [Framing: Strict vertical 9:16 portrait ratio, smartphone screen orientation] [Subject: Original unique character with distinct facial features smiles gently with natural expressive eyes and subtle head movement] [Environment: Golden hour sunlight, soft breeze rustling woven fabric and trees] [Voiceover: Same consistent Indonesian narrator voice (${tone}): "${cleanNarration}"] [Motion: Realistic organic human movement, stable facial features, natural breathing, zero distortion, vertical 9:16, 60fps]`
      };

    case 'dark_folklore':
      return {
        imagePrompt: `Enchanting mystical Indonesian folklore style, vertical 9:16 portrait format. Authentic Indonesian setting for ${cleanTopic}. ${cleanVisual}. Featuring a 100% original bespoke mythical folklore character, completely unique never-before-seen character concept, proprietary design, cute and endearing stylized mythical features, glowing expressive eyes, lovable courageous expression, wearing ornate traditional Indonesian batik and golden brass accessories, moody atmospheric candlelit glow, ethereal mist, ancient stone carvings, whimsical folklore wonder, 9:16 vertical smartphone format --ar 9:16, 4K.`,
        motionPrompt: `[Camera: Slow atmospheric camera glide at 0.3x speed, steady framing] [Framing: Strict vertical 9:16 portrait ratio, smartphone screen orientation] [Subject: Original unique stylized folklore character in traditional batik glances with expressive glowing eyes and endearing brave demeanor] [Environment: Soft mystical mist drifting slowly, gentle flickering candlelight casting warm shadows] [Voiceover: Same consistent Indonesian narrator voice (${tone}): "${cleanNarration}"] [Motion: Smooth subtle stylized motion, stable character structure, zero glitch, vertical 9:16, 60fps]`
      };

    case 'claymation':
    default:
      return {
        imagePrompt: `Adorable handcrafted stop-motion clay scene, vertical 9:16 portrait format. Authentic Indonesian setting for ${cleanTopic}. ${cleanVisual}. Featuring a 100% original bespoke clay character design, completely unique and never-before-seen handcrafted clay figurine concept, proprietary original character, super cute and endearing clay figurine, chubby rosy cheeks, expressive cute button eyes, tiny sculpted button nose, cheerful innocent smile, tactile plasticine clay texture with soft subtle finger-sculpting marks, wearing authentic miniature Indonesian woven attire [tenun ikat / batik / kebaya], warm tropical Indonesian cinematic studio lighting, macro photography, tilt-shift lens, shallow depth of field, premium commercial claymation, 9:16 vertical smartphone format --ar 9:16, 4K.`,
        motionPrompt: `[Camera: Steady slow cinematic push-in at 0.3x speed, shallow depth of field] [Framing: Strict vertical 9:16 portrait ratio, smartphone screen orientation] [Subject: Original cute handcrafted clay figurine with unique sculpted facial features, rosy cheeks, and expressive eyes blinks softly, nods with endearing smile] [Environment: Subtle ambient motion, gentle breeze swaying miniature clay foliage, warm studio lighting] [Voiceover: Same consistent Indonesian narrator voice (${tone}): "${cleanNarration}"] [Motion: Charming physical stop-motion animation, locked clay geometry, zero distortion, high stability, vertical 9:16, 60fps]`
      };
  }
}

// HELPER: PERBARUI SEMUA SCENE KE GAYA VISUAL TERTENTU DENGAN KARAKTER LUCU & FLOW-SAFE
export function updateScenesToStyle(scenes = [], targetStyleId = 'claymation', topic = '') {
  return scenes.map((scene) => {
    const prompts = generateStylePrompts(targetStyleId, topic, scene.visual, scene.narration, scene.voiceGuide);
    return {
      ...scene,
      imagePrompt: prompts.imagePrompt,
      motionPrompt: prompts.motionPrompt
    };
  });
}

// MASTER GENERATOR: ZERO DUPLICATE SCENES - FULL DEDICATED BEATS
export function generateScriptForTopic(topic, sceneCount, styleId = 'claymation') {
  const selectedStyle = VISUAL_STYLES.find(s => s.id === styleId) || VISUAL_STYLES[0];
  const lowerTopic = (topic || '').toLowerCase();

  // 1. Check Labuan Teluk Santong Preset
  if (lowerTopic.includes('santong') || lowerTopic.includes('teluk santong')) {
    const template = STORY_TEMPLATES.find(t => t.id === 'labuan_teluk_santong');
    const baseScenes = template.scenes;
    const result = [];
    for (let i = 0; i < sceneCount; i++) {
      let sceneData;
      if (i < baseScenes.length) {
        sceneData = { ...baseScenes[i] };
      } else {
        const extraNum = i + 1;
        sceneData = {
          id: extraNum,
          time: `${String(Math.floor((i * 10) / 60)).padStart(2, '0')}:${String((i * 10) % 60).padStart(2, '0')} - ${String(Math.floor(((i + 1) * 10) / 60)).padStart(2, '0')}:${String(((i + 1) * 10) % 60).padStart(2, '0')}`,
          stage: `Fakta Ekstra ${extraNum}`,
          stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
          title: `Scene ${extraNum}: Warisan Luhur Bugis Samawa`,
          narration: `Kehidupan maritim di Teluk Santong membuktikan bahwa persaudaraan suku Bugis dan Tau Samawa selalu melahirkan keharmonisan peradaban pesisir.`,
          sumberIlmu: `Arsip & Riset Bahari: Dokumentasi kerukunan diaspora Suku Bugis dan masyarakat lokal Sumbawa di perairan Teluk Saleh.`,
          voiceGuide: '🎙️ Intonasi: Wibawa dokumenter sejarah, artikulasi jelas dalam bahasa Indonesia.',
          visual: `Pemandangan perahu nelayan kayu di Teluk Santong saat mentari pagi memancarkan sinar keemasan.`,
          motionPrompt: '[Camera: Slow cinematic pan at 0.35x speed, locked horizon] [Stability: Zero morphing, 60fps]',
          imagePrompt: `${selectedStyle.name} style, Teluk Santong harbor at dawn, dramatic sky, 9:16 vertical --ar 9:16`,
          emotion: 'Bangga & Reflektif',
          captionText: `Jejak pelaut Bugis di Teluk Santong terus menginspirasi...`,
          duration: 10,
          status: { image: false, flow: false, inspected: false }
        };
      }
      sceneData.id = i + 1;
      const startSec = i * 10;
      const endSec = (i + 1) * 10;
      sceneData.time = `${String(Math.floor(startSec / 60)).padStart(2, '0')}:${String(startSec % 60).padStart(2, '0')} - ${String(Math.floor(endSec / 60)).padStart(2, '0')}:${String(endSec % 60).padStart(2, '0')}`;
      sceneData.motionPrompt = cleanMotionPromptForFlow(sceneData.motionPrompt, selectedStyle.id, sceneData.narration, sceneData.voiceGuide);
      result.push(sceneData);
    }
    return result;
  }

  // 2. Check Poto Tano Preset
  if (lowerTopic.includes('poto tano') || lowerTopic.includes('tano')) {
    const template = STORY_TEMPLATES.find(t => t.id === 'poto_tano');
    const baseScenes = template.scenes;
    const result = [];
    for (let i = 0; i < sceneCount; i++) {
      let sceneData;
      if (i < baseScenes.length) {
        sceneData = { ...baseScenes[i] };
      } else {
        // Unique extension scene beyond 12
        const extraNum = i + 1;
        sceneData = {
          id: extraNum,
          time: `${String(Math.floor((i * 10) / 60)).padStart(2, '0')}:${String((i * 10) % 60).padStart(2, '0')} - ${String(Math.floor(((i + 1) * 10) / 60)).padStart(2, '0')}:${String(((i + 1) * 10) % 60).padStart(2, '0')}`,
          stage: `Fakta Ekstra ${extraNum}`,
          stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
          title: `Scene ${extraNum}: Jejak Kejayaan Maritim Poto Tano`,
          narration: `Kisah Poto Tano di tanah Samawa membuktikan bahwa peradaban maritim nusantara selalu tumbuh dari semangat gotong royong warga pesisir.`,
          sumberIlmu: `Arsip & Riset Bahari: Sejarah maritim Selat Alas mencatat perkembangan peradaban pesisir Samawa Barat yang bertumpu pada solidaritas nelayan dan pelaut perintis.`,
          voiceGuide: '🎙️ Intonasi: Wibawa dokumenter sejarah, artikulasi jelas dalam bahasa Indonesia.',
          visual: `Pemandangan pelabuhan Poto Tano dengan deretan lampu kapal menyala temaram di senja hari.`,
          motionPrompt: '[Camera: Slow cinematic pan at 0.35x speed, locked horizon] [Stability: Zero morphing, 60fps]',
          imagePrompt: `${selectedStyle.name} style, Poto Tano harbor at twilight, dramatic sunset sky, 9:16 vertical --ar 9:16`,
          emotion: 'Bangga & Reflektif',
          captionText: `Jejak kejayaan maritim Poto Tano terus menginspirasi...`,
          duration: 10,
          status: { image: false, flow: false, inspected: false }
        };
      }
      sceneData.id = i + 1;
      const startSec = i * 10;
      const endSec = (i + 1) * 10;
      sceneData.time = `${String(Math.floor(startSec / 60)).padStart(2, '0')}:${String(startSec % 60).padStart(2, '0')} - ${String(Math.floor(endSec / 60)).padStart(2, '0')}:${String(endSec % 60).padStart(2, '0')}`;
      sceneData.motionPrompt = cleanMotionPromptForFlow(sceneData.motionPrompt, selectedStyle.id, sceneData.narration, sceneData.voiceGuide);
      result.push(sceneData);
    }
    return result;
  }

  // 2. Check Lala Bunte / Lala Buntar Preset
  if (lowerTopic.includes('lala bunte') || lowerTopic.includes('lala buntar') || lowerTopic.includes('lala bunti') || lowerTopic.includes('buntar')) {
    const template = STORY_TEMPLATES.find(t => t.id === 'lala_bunte');
    const baseScenes = template.scenes;
    const result = [];
    for (let i = 0; i < sceneCount; i++) {
      let sceneData;
      if (i < baseScenes.length) {
        sceneData = { ...baseScenes[i] };
      } else {
        const extraNum = i + 1;
        sceneData = {
          id: extraNum,
          time: '',
          stage: `Warisan Ekstra ${extraNum}`,
          stageColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
          title: `Scene ${extraNum}: Jejak Tenun Kre Alang di Museum Sumbawa`,
          narration: `Hingga kini, keahlian menenun Kre Alang yang diwariskan Lala Buntar tetap dijaga oleh para penenun tradisional di bumi Tano Samawa.`,
          voiceGuide: '🎙️ Intonasi: Khidmat dan bangga akan warisan budaya tenun Samawa.',
          visual: `Koleksi kain tenun songket Kre Alang berbenang emas dipajang dengan pencahayaan museum yang elegan.`,
          motionPrompt: '[Camera: Slow macro pan across intricate golden weave at 0.3x speed] [Stability: Flawless textures, 60fps]',
          imagePrompt: `${selectedStyle.name} style, magnificent handwoven golden Sumbawa songket cloth (Kre Alang), rich museum display, 9:16 vertical --ar 9:16`,
          emotion: 'Takjub & Bangga',
          captionText: `Warisan tenun Kre Alang tetap lestari hingga kini...`,
          duration: 10,
          status: { image: false, flow: false, inspected: false }
        };
      }
      sceneData.id = i + 1;
      const startSec = i * 10;
      const endSec = (i + 1) * 10;
      sceneData.time = `${String(Math.floor(startSec / 60)).padStart(2, '0')}:${String(startSec % 60).padStart(2, '0')} - ${String(Math.floor(endSec / 60)).padStart(2, '0')}:${String(endSec % 60).padStart(2, '0')}`;
      sceneData.motionPrompt = cleanMotionPromptForFlow(sceneData.motionPrompt, selectedStyle.id, sceneData.narration, sceneData.voiceGuide);
      result.push(sceneData);
    }
    return result;
  }

  // 3. Check Siti Maryam Bima Preset
  if (lowerTopic.includes('siti maryam') || lowerTopic.includes('bima') || lowerTopic.includes('mbojo')) {
    const template = STORY_TEMPLATES.find(t => t.id === 'siti_maryam');
    const baseScenes = template.scenes;
    const result = [];
    for (let i = 0; i < sceneCount; i++) {
      let sceneData;
      if (i < baseScenes.length) {
        sceneData = { ...baseScenes[i] };
      } else {
        const extraNum = i + 1;
        sceneData = {
          id: extraNum,
          time: '',
          stage: `Refleksi Adat ${extraNum}`,
          stageColor: 'border-rose-500 text-rose-400 bg-rose-500/10',
          title: `Scene ${extraNum}: Keteguhan Nilai Maja Labo Dahu`,
          narration: `Kisah Siti Maryam menjadi simbol keteguhan Dou Mbojo dalam menjunjung falsafah luhur "Maja Labo Dahu", memiliki rasa malu dan takut pada keburukan.`,
          voiceGuide: '🎙️ Intonasi: Khidmat dan bermartabat tinggi, bahasa Indonesia fasih dan jernih.',
          visual: `Gadis Bima berbusana adat rimpu berdiri tegap di bukit savana memandang laut luas saat fajar merekah.`,
          motionPrompt: '[Camera: Slow cinematic pull-back at 0.35x speed, locked horizon] [Stability: Zero glitch, 60fps]',
          imagePrompt: `${selectedStyle.name} style, noble Bima girl in traditional rimpu attire on coastal hill, sunrise, 9:16 vertical --ar 9:16`,
          emotion: 'Kagum & Bermartabat',
          captionText: `Falsafah "Maja Labo Dahu" abadi di tanah Bima...`,
          duration: 10,
          status: { image: false, flow: false, inspected: false }
        };
      }
      sceneData.id = i + 1;
      const startSec = i * 10;
      const endSec = (i + 1) * 10;
      sceneData.time = `${String(Math.floor(startSec / 60)).padStart(2, '0')}:${String(startSec % 60).padStart(2, '0')} - ${String(Math.floor(endSec / 60)).padStart(2, '0')}:${String(endSec % 60).padStart(2, '0')}`;
      sceneData.motionPrompt = cleanMotionPromptForFlow(sceneData.motionPrompt, selectedStyle.id, sceneData.narration, sceneData.voiceGuide);
      result.push(sceneData);
    }
    return result;
  }

  // 4. DYNAMIC PROGRESSIVE GENERATOR FOR ANY OTHER TOPIC
  // Dedicated 12-beat storytelling arc: GUARANTEED ZERO DUPLICATES
  const dialect = detectDialectInfo(topic);
  const isRegional = 
    lowerTopic.includes('sumbawa') || lowerTopic.includes('tano') || lowerTopic.includes('santong') ||
    lowerTopic.includes('bima') || lowerTopic.includes('sasak') || lowerTopic.includes('lombok') ||
    lowerTopic.includes('batak') || lowerTopic.includes('toba') || lowerTopic.includes('jawa') ||
    lowerTopic.includes('sunda') || lowerTopic.includes('minang') || lowerTopic.includes('bugis') ||
    lowerTopic.includes('nusantara') || lowerTopic.includes('kerajaan');

  const PROGRESSIVE_BEATS = isRegional ? [
    {
      stage: 'Hook Rahasia',
      stageColor: 'border-rose-500 text-rose-400 bg-rose-500/10',
      titleName: 'Misteri Tersembunyi yang Mengguncang',
      emotion: 'Penasaran & Tegang',
      voiceIntonation: '🎙️ Intonasi: Hook tajam misterius, tempo sedang-lambat (~115 kpm), jeda dramatis 1 detik di koma.',
      getNarration: (t) => `${dialect.introHook} Tahukah kamu rahasia mencengangkan di balik "${t}"? Ada misteri masa lampau yang tak banyak diketahui orang!`,
      getVisual: (t) => `Karakter utama berdiri di depan situs bersejarah terkait ${t} saat kabut misterius perlahan tersibak oleh cahaya temaram.`,
      getCaption: (t) => `Fakta mencengangkan di balik ${t} akhirnya terkuak...`
    },
    {
      stage: 'Asal-Usul & Latar',
      stageColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
      titleName: 'Catatan Awal Masa Lampau',
      emotion: 'Khidmat & Faktual',
      voiceIntonation: '🎙️ Intonasi: Dokumenter sejarah khidmat, artikulasi jernih, penekanan tegas pada fakta asal-usul.',
      getNarration: (t) => `Semua bermula ratusan tahun silam di ${dialect.regionName}... Menurut catatan para tetua, kawasan ini kental dengan tradisi ${dialect.dialectTerm}.`,
      getVisual: (t) => `Suasana pemukiman tradisional tempo dulu dengan bangunan kayu bertiang kokoh dan pepohonan asri di bawah cahaya mentari pagi.`,
      getCaption: (t) => `Awal mula sejarah ${t} di masa lampau...`
    },
    {
      stage: 'Kearifan Tradisi',
      stageColor: 'border-blue-500 text-blue-400 bg-blue-500/10',
      titleName: 'Masyarakat Adat & Petuah Leluhur',
      emotion: 'Kagum & Menghargai Budaya',
      voiceIntonation: '🎙️ Intonasi: Hangat dan penuh penghormatan budaya lokal nusantara, tempo stabil.',
      getNarration: (t) => `Masyarakat adat hidup selaras memegang teguh amanat "${dialect.regionalQuotes[1] || 'Sabalong Samalewa'}"... Nilai luhur ini menjadi pedoman menjaga tatanan hidup damai dan bermartabat.`,
      getVisual: (t) => `Tetua adat mengenakan busana tenun tradisional memimpin musyawarah di balai pertemuan beralas kayu jati.`,
      getCaption: (t) => `Menjaga sumpah adat leluhur secara turun-temurun...`
    },
    {
      stage: 'Munculnya Ancaman',
      stageColor: 'border-yellow-500 text-yellow-400 bg-yellow-500/10',
      titleName: 'Pertanda Buruk & Ujian Pertama',
      emotion: 'Khawatir & Was-was',
      voiceIntonation: '🎙️ Intonasi: Tegang berbisik, tempo berangsur cepat, nada khawatir mengalir kuat.',
      getNarration: (t) => `Namun kedamaian itu mendadak terguncang... Muncul pertanda alam yang tak biasa dan ancaman luar yang membuat seluruh warga dicekam kegelisahan.`,
      getVisual: (t) => `Langit senja berubah pekat dengan awan hitam bergulung, para warga berkumpul cemas menatap pertanda di cakrawala.`,
      getCaption: (t) => `Pertanda buruk mulai tampak di langit senja...`
    },
    {
      stage: 'Konflik Memuncak',
      stageColor: 'border-orange-500 text-orange-400 bg-orange-500/10',
      titleName: 'Perseteruan & Pertaruhan Marwah',
      emotion: 'Tegang & Emosional',
      voiceIntonation: '🎙️ Intonasi: Dramatis, vokal berbobot tegas pada pertaruhan marwah dan harga diri.',
      getNarration: (t) => `Perselisihan pun tak terelakkan! Di bawah ancaman kehancuran, para tokoh dihadapkan pada dilema besar: tunduk pada kezaliman atau melawan demi harga diri!`,
      getVisual: (t) => `Dua pihak saling berhadapan di alun-alun terbuka dengan ekspresi tegang berlatar obor menyala di malam badai.`,
      getCaption: (t) => `Tak ada jalan mundur, pertaruhan marwah dimulai!`
    },
    {
      stage: 'Titik Nadir',
      stageColor: 'border-red-500 text-red-400 bg-red-500/10',
      titleName: 'Krisis Genting & Keputusan Berani',
      emotion: 'Tertekan & Menegangkan',
      voiceIntonation: '🎙️ Intonasi: Melodramatis mendalam, emosi pilu namun menyimpan tekad membaja.',
      getNarration: (t) => `Keadaan semakin genting tanpa jalan keluar yang mudah... Dalam titik nadir ini, sebuah keputusan berani diambil demi menyelamatkan seluruh kaum dari bencana.`,
      getVisual: (t) => `Tokoh utama menatap langit malam dengan air mata bercampur tekad baja di tengah reruntuhan yang diterpa angin kencang.`,
      getCaption: (t) => `Di ambang kehancuran, keputusan besar diambil!`
    },
    {
      stage: 'Klimaks Peristiwa',
      stageColor: 'border-red-600 text-red-300 bg-red-600/10',
      titleName: 'Detik-Detik Puncak yang Mengguncang',
      emotion: 'Tercengang & Merinding',
      voiceIntonation: '🎙️ Intonasi: Puncak klimaks tertinggi, intonasi bertenaga penuh getaran heran dan kagum.',
      getNarration: (t) => `Di sinilah detik paling menentukan terjadi! Sebuah momen pengorbanan suci mengguncang seluruh tanah ${dialect.regionName}, membalikkan keadaan dalam sekejap mata!`,
      getVisual: (t) => `Sorotan cahaya magis sinematik menerangi puncak bukit karang di tengah deburan ombak dan kilatan petir spektakuler.`,
      getCaption: (t) => `Momen ajaib yang mengubah takdir selamanya!`
    },
    {
      stage: 'Twist & Rahasia',
      stageColor: 'border-purple-500 text-purple-400 bg-purple-500/10',
      titleName: 'Fakta Mengejutkan yang Terkuak',
      emotion: 'Kaget & Terpukau',
      voiceIntonation: '🎙️ Intonasi: Bisikan misterius membongkar tabir twist, tempo diperlambat.',
      getNarration: (t) => `Dan di balik peristiwa tersebut, terungkap kenyataan yang mengejutkan... Bahwa apa yang terjadi bukanlah kekalahan, melainkan rahasia besar yang tergenapi!`,
      getVisual: (t) => `Peninggalan suci bercahaya lembut di dalam ceruk batu tua yang tersembunyi di balik reruntuhan kuno.`,
      getCaption: (t) => `Ternyata inilah rahasia yang tersembunyi selama berabad-abad!`
    },
    {
      stage: 'Resolusi Sejarah',
      stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
      titleName: 'Fajar Baru & Kedamaian yang Kembali',
      emotion: 'Lega & Takjub',
      voiceIntonation: '🎙️ Intonasi: Teduh dan menenangkan jiwa, nada lega setelah badai besar berlalu.',
      getNarration: (t) => `Setelah badai reda, terbitlah era baru... Pertikaian berhenti dan seluruh pihak tersadar akan pentingnya persatuan hidup rukun sesuai falsafah ${dialect.dialectTerm}.`,
      getVisual: (t) => `Matahari pagi menyinari perkampungan yang damai, kabut perlahan menghilang menampakkan pemandangan hijau asri.`,
      getCaption: (t) => `Kedamaian kembali menaungi tanah pertiwi...`
    },
    {
      stage: 'Bukti Nyata Hari Ini',
      stageColor: 'border-teal-500 text-teal-400 bg-teal-500/10',
      titleName: 'Situs & Saksi Bisu yang Masih Berdiri',
      emotion: 'Edukasi & Kagum',
      voiceIntonation: '🎙️ Intonasi: Berwibawa edukatif, tempo stabil, menekankan bukti nyata yang bisa dikunjungi.',
      getNarration: (t) => `Hingga hari ini, jejak peninggalan dan saksi bisu peristiwa terkait "${t}" masih kokoh berdiri... Menjadi bukti nyata sejarah yang tak terbantahkan!`,
      getVisual: (t) => `Dokumentasi lanskap modern yang megah dengan situs bersejarah yang masih terawat asri dikelilingi panorama alam indah.`,
      getCaption: (t) => `Saksi bisu peristiwa ini masih kokoh berdiri sampai hari ini!`
    },
    {
      stage: 'Falsafah Luhur',
      stageColor: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
      titleName: 'Amanat Abadi Para Leluhur',
      emotion: 'Reflektif & Menginspirasi',
      voiceIntonation: '🎙️ Intonasi: Penuh petuah bijak menyentuh hati sanubari, resonansi dalam.',
      getNarration: (t) => `Kisah ini meninggalkan pesan abadi: bahwa kejayaan sejati berpijak pada nilai luhur "${dialect.regionalQuotes[1] || 'Sabalong Samalewa'}"—menjaga martabat, persaudaraan, dan kedamaian hidup bersama.`,
      getVisual: (t) => `Siluet pemuda dan tetua berdiri berdampingan memandang cakrawala fajar keemasan yang membentang luas.`,
      getCaption: (t) => `Pelajaran berharga yang tak lekang oleh waktu...`
    },
    {
      stage: 'Penutup & Diskusi FYP',
      stageColor: 'border-pink-500 text-pink-400 bg-pink-500/10',
      titleName: 'Call to Action & Interaksi Penonton',
      emotion: 'Antusias & Ingin Komen',
      voiceIntonation: '🎙️ Intonasi: Ramah, bersahabat dan antusias mengajak pemirsa TikTok berdiskusi di kolom komentar.',
      getNarration: (t) => `${dialect.regionalQuotes[0] || 'Kalingka mo'} lestarikan warisan berharga ini! Tulis pendapatmu di kolom komentar dan bagikan kisah "${t}" ini agar sejarah nusantara tetap abadi!`,
      getVisual: (t) => `Tampilan penutup sinematik dengan tipografi ajakan diskusi TikTok yang memikat dan estetik.`,
      getCaption: (t) => `Pernah dengar kisah ini? Komen & follow untuk sejarah berikutnya!`
    }
  ] : [
    // UNIVERSAL BEATS UNTUK TOPIK RANDOM (SAINS, MISTERI, HEWAN, TRIVIA, TEKNOLOGI, DLL)
    {
      stage: 'Hook Fakta',
      stageColor: 'border-rose-500 text-rose-400 bg-rose-500/10',
      titleName: 'Pertanyaan Pemantik & Curiosity Gap',
      emotion: 'Penasaran & Terkejut',
      voiceIntonation: '🎙️ Intonasi: Hook tajam berenergi, jeda dramatis 1 detik, nada penasaran memikat FYP.',
      getNarration: (t) => `Pernahkah kamu membayangkan rahasia mencengangkan di balik "${t}"? Banyak orang mengira ini hal biasa, padahal ada fakta sains dan kebenaran mengejutkan di baliknya!`,
      getVisual: (t) => `Visualisasi pembuka dramatis gaya ${selectedStyle.name} yang memperlihatkan elemen utama dari "${t}" dengan pencahayaan kontras memukau.`,
      getCaption: (t) => `Fakta sebenarnya di balik ${t} yang jarang diketahui...`
    },
    {
      stage: 'Pengantar Fenomena',
      stageColor: 'border-amber-500 text-amber-400 bg-amber-500/10',
      titleName: 'Realitas di Balik Fenomena',
      emotion: 'Fokus & Edukatif',
      voiceIntonation: '🎙️ Intonasi: Nada bertutur cerdas, artikulasi jernih, mengalir santai namun ilmiah.',
      getNarration: (t) => `Secara empiris, "${t}" bukan sekadar kebetulan. Para peneliti dan pengamat menemukan bahwa fenomena ini memiliki penjelasan logis yang sangat masuk akal.`,
      getVisual: (t) => `Adegan sinematik yang mengupas detail dan sudut pandang mikro/makro fenomena "${t}" dengan latar bertekstur kaya.`,
      getCaption: (t) => `Inilah realitas di balik fenomena ${t}...`
    },
    {
      stage: 'Mekanisme Inti',
      stageColor: 'border-blue-500 text-blue-400 bg-blue-500/10',
      titleName: 'Bagaimana Proses Ini Bekerja',
      emotion: 'Kagum & Tercengang',
      voiceIntonation: '🎙️ Intonasi: Bersemangat mengungkap proses cara kerja rahasia, tempo teratur.',
      getNarration: (t) => `Lalu, bagaimana hal ini bisa terjadi? Di balik layar, terjadi reaksi berantai yang memicu respons alami, membuktikan betapa menakjubkannya mekanisme ini bekerja!`,
      getVisual: (t) => `Visualisasi mekanisme dan interaksi dinamis subjek "${t}" dengan efek partikel cahaya halus dan fokus tajam.`,
      getCaption: (t) => `Proses dan mekanisme yang terjadi di balik layar...`
    },
    {
      stage: 'Bukti & Data Riil',
      stageColor: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
      titleName: 'Fakta Empiris & Temuan Ahli',
      emotion: 'Percaya Diri & Valid',
      voiceIntonation: '🎙️ Intonasi: Tegas dan meyakinkan, memberikan penekanan pada angka dan bukti otentik.',
      getNarration: (t) => `Berbagai studi dan observasi lapangan telah mengonfirmasi hal ini. Bukti-bukti nyata menunjukkan bahwa fakta ini telah teruji berkali-kali tanpa terbantahkan.`,
      getVisual: (t) => `Penggambaran data atau eksperimen observasi terkait "${t}" yang dikemas artistik dalam gaya ${selectedStyle.name}.`,
      getCaption: (t) => `Bukti nyata dan data empiris yang terkonfirmasi!`
    },
    {
      stage: 'Mitos vs Fakta',
      stageColor: 'border-orange-500 text-orange-400 bg-orange-500/10',
      titleName: 'Membongkar Mitos yang Salah Kaprah',
      emotion: 'Kaget & Terbuka',
      voiceIntonation: '🎙️ Intonasi: Nada mematahkan argumen salah, tempo tegas, membongkar kesalahpahaman.',
      getNarration: (t) => `Banyak anggapan keliru yang selama ini dipercaya masyarakat luas tentang "${t}". Namun faktanya, bukti ilmiah justru memutarbalikkan mitos tersebut 180 derajat!`,
      getVisual: (t) => `Perbandingan visual kontras antara asumsi ilusi vs realitas fakta sebenarnya tentang "${t}".`,
      getCaption: (t) => `Mitos populer yang ternyata keliru tentang ${t}!`
    },
    {
      stage: 'Fakta Paling Ekstrem',
      stageColor: 'border-red-500 text-red-400 bg-red-500/10',
      titleName: 'Mind-Blowing Climax',
      emotion: 'Merinding & Takjub',
      voiceIntonation: '🎙️ Intonasi: Puncak kejutan tertinggi (Aha-moment), tempo melambat dramatis di kata kunci.',
      getNarration: (t) => `Dan inilah fakta yang paling mencengangkan! Bagian yang sering membuat siapa pun terperangah saat pertama kali mengetahuinya secara mendalam.`,
      getVisual: (t) => `Sudut pandang sinematik dramatis dengan pencahayaan spektakuler yang menyorot klimaks fenomena "${t}".`,
      getCaption: (t) => `Fakta paling mencengangkan yang bikin merinding!`
    },
    {
      stage: 'Dampak Nyata',
      stageColor: 'border-red-600 text-red-300 bg-red-600/10',
      titleName: 'Pengaruh Terhadap Kehidupan',
      emotion: 'Reflektif & Serius',
      voiceIntonation: '🎙️ Intonasi: Menghubungkan fakta dengan kehidupan nyata penonton, resonan dan berbobot.',
      getNarration: (t) => `Dampak dari fenomena ini ternyata jauh melampaui apa yang kita bayangkan, membuka pemahaman baru tentang bagaimana alam dan kehidupan ini saling terhubung.`,
      getVisual: (t) => `Komposisi visual megah yang memperlihatkan skala dampak dari "${t}" secara luas dan sinematik.`,
      getCaption: (t) => `Pengaruh besar fenomena ini bagi dunia nyata...`
    },
    {
      stage: 'Sudut Pandang Unik',
      stageColor: 'border-purple-500 text-purple-400 bg-purple-500/10',
      titleName: 'Sudut Pandang yang Jarang Disorot',
      emotion: 'Pintar & Terinspirasi',
      voiceIntonation: '🎙️ Intonasi: Bisikan cerdas membuka perspektif baru, mengajak berpikir mendalam.',
      getNarration: (t) => `Jika kita melihatnya lebih dalam, rahasia ini mengajarkan bahwa hal-hal yang tampak sederhana sering kali menyimpan keajaiban sains yang luar biasa.`,
      getVisual: (t) => `Detail visual artistik dengan kedalaman ruang lembut (bokeh), menonjolkan esensi filosofi sains "${t}".`,
      getCaption: (t) => `Sudut pandang cerdas yang jarang dibahas orang...`
    },
    {
      stage: 'Konsensus Pakar',
      stageColor: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
      titleName: 'Kesimpulan Ilmu Pengetahuan',
      emotion: 'Tercerahkan & Jelas',
      voiceIntonation: '🎙️ Intonasi: Tenang, berwibawa, menyimpulkan kebenaran ilmiah secara gamblang.',
      getNarration: (t) => `Para pakar dan ahli di bidangnya sepakat: pemahaman ini bukan cuma menjawab rasa penasaran, tapi juga menjadi sumber ilmu berharga bagi kita semua.`,
      getVisual: (t) => `Visualisasi modern bernuansa edukasi cerah yang melambangkan pengetahuan yang telah tersingkap tuntas.`,
      getCaption: (t) => `Kesimpulan ilmiah yang membuka mata kita semua...`
    },
    {
      stage: 'Hikmah Edukasi',
      stageColor: 'border-teal-500 text-teal-400 bg-teal-500/10',
      titleName: 'Takeaway Berharga untuk Penonton',
      emotion: 'Puas & Berpengetahuan',
      voiceIntonation: '🎙️ Intonasi: Hangat dan bersahabat, memberikan kepuasan intelektual pada detik terakhir.',
      getNarration: (t) => `Kini kamu sudah tahu fakta sebenarnya tentang "${t}". Satu lagi ilmu pengetahuan baru yang bisa kamu ceritakan ke orang-orang terdekatmu hari ini!`,
      getVisual: (t) => `Adegan penutup bernuansa hangat dan elegan dengan simbol pengetahuan atau ikon subjek "${t}".`,
      getCaption: (t) => `Satu lagi ilmu pengetahuan baru yang berhasil kamu ketahui!`
    },
    {
      stage: 'Kesimpulan Utama',
      stageColor: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
      titleName: 'Rangkuman Inti Fenomena',
      emotion: 'Kompak & Jelas',
      voiceIntonation: '🎙️ Intonasi: Merangkum poin utama secara ringkas, padat, dan mudah diingat.',
      getNarration: (t) => `Intinya, setiap misteri selalu punya penjelasan ilmiah jika kita mau menggali faktanya lebih dalam tanpa terjebak asumsi semata.`,
      getVisual: (t) => `Grafis visual sinematik bergaya ${selectedStyle.name} dengan pencahayaan estetik yang harmonis.`,
      getCaption: (t) => `Fakta selalu lebih menarik daripada mitos belaka!`
    },
    {
      stage: 'Call to Action FYP',
      stageColor: 'border-pink-500 text-pink-400 bg-pink-500/10',
      titleName: 'Diskusi & Interaksi Penonton',
      emotion: 'Antusias & Engagement',
      voiceIntonation: '🎙️ Intonasi: Ceria dan interaktif mengundang komentar penonton di TikTok.',
      getNarration: (t) => `Menurutmu, fakta mana tentang "${t}" yang paling bikin kamu kaget? Tulis di kolom komentar dan follow untuk eksplorasi fakta menarik berikutnya!`,
      getVisual: (t) => `Frame penutup estetik dengan animasi tombol interaksi TikTok yang ramah dan mengajak diskusi.`,
      getCaption: (t) => `Komen di bawah fakta mana yang paling bikin kamu kaget!`
    }
  ];

  // Map requested sceneCount to unique indices:
  let beatIndices = [];
  if (sceneCount <= 3) {
    beatIndices = [0, 6, 11];
  } else if (sceneCount === 5) {
    beatIndices = [0, 1, 4, 6, 11];
  } else if (sceneCount === 6) {
    beatIndices = [0, 1, 4, 6, 8, 11];
  } else if (sceneCount === 8) {
    beatIndices = [0, 1, 2, 4, 6, 7, 9, 11];
  } else if (sceneCount === 10) {
    beatIndices = [0, 1, 2, 3, 4, 5, 6, 7, 9, 11];
  } else if (sceneCount === 12) {
    beatIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  } else {
    // Proportional distinct selection
    for (let i = 0; i < sceneCount; i++) {
      const idx = Math.min(Math.floor((i / sceneCount) * PROGRESSIVE_BEATS.length), PROGRESSIVE_BEATS.length - 1);
      // Guarantee uniqueness
      if (!beatIndices.includes(idx)) {
        beatIndices.push(idx);
      } else {
        // Find next unused index
        let nextUnused = 0;
        while (beatIndices.includes(nextUnused) && nextUnused < PROGRESSIVE_BEATS.length) {
          nextUnused++;
        }
        beatIndices.push(nextUnused % PROGRESSIVE_BEATS.length);
      }
    }
  }

  const scenes = [];
  for (let i = 0; i < sceneCount; i++) {
    const beatIdx = beatIndices[i % beatIndices.length];
    const beat = PROGRESSIVE_BEATS[beatIdx];
    const startSec = i * 10;
    const endSec = (i + 1) * 10;
    const timeFormatted = `${String(Math.floor(startSec / 60)).padStart(2, '0')}:${String(startSec % 60).padStart(2, '0')} - ${String(Math.floor(endSec / 60)).padStart(2, '0')}:${String(endSec % 60).padStart(2, '0')}`;

    const visualText = beat.getVisual(topic);
    const narrationText = beat.getNarration(topic);
    const captionText = beat.getCaption(topic);

    const cleanVisual = visualText.replace(/\.$/, '');
    const cleanTopic = topic || 'Nusantara Heritage';

    const prompts = generateStylePrompts(selectedStyle.id, cleanTopic, cleanVisual, narrationText, beat.voiceIntonation);
    const detailedImagePrompt = prompts.imagePrompt;
    const detailedMotionPrompt = prompts.motionPrompt;

    scenes.push({
      id: i + 1,
      time: timeFormatted,
      stage: beat.stage,
      stageColor: beat.stageColor,
      title: `Scene ${i + 1}: ${beat.titleName}`,
      narration: narrationText,
      sumberIlmu: `Riset Sejarah & Kebudayaan: Fakta terverifikasi mengenai "${topic}" dari arsip toponimi daerah, peninggalan peradaban, dan kearifan lokal Nusantara.`,
      voiceGuide: beat.voiceIntonation,
      visual: visualText,
      captionText: captionText,
      imagePrompt: detailedImagePrompt,
      motionPrompt: detailedMotionPrompt,
      emotion: beat.emotion,
      duration: 10,
      status: {
        image: false,
        flow: false,
        inspected: false
      }
    });
  }

  return scenes;
}
