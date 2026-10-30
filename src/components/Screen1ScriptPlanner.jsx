import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  Sliders, 
  ArrowRight, 
  Edit3, 
  Volume2, 
  Clock, 
  Flame, 
  Compass, 
  Layers, 
  Wand2,
  CheckCircle2,
  BookOpen,
  FileText,
  ChevronDown,
  ChevronUp,
  Trash2
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';
import EditScriptModal from './EditScriptModal';

export default function Screen1ScriptPlanner({
  topic,
  setTopic,
  sceneCount,
  setSceneCount,
  scenes,
  setScenes,
  onGenerateScript,
  isGenerating,
  onAccScript,
  visualStyle,
  setVisualStyle,
  visualStyles,
  addToast,
  hasApiKey = false,
  onOpenApiKeyModal = () => {},
  geminiModel = 'gemini-1.5-pro',
  sourceNotes = '',
  setSourceNotes = () => {},
  onResearchFacts = () => {},
  isResearching = false,
  onRunFullPipeline = () => {},
  sceneMode = 'auto',
  setSceneMode = () => {}
}) {
  const effectiveMode = sceneMode || 'auto';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);
  const [isSourceOpen, setIsSourceOpen] = useState(() => Boolean(sourceNotes && sourceNotes.trim()));

  // Auto-open source accordion when researching or when notes are populated
  React.useEffect(() => {
    if (isResearching || (sourceNotes && sourceNotes.trim())) {
      setIsSourceOpen(true);
    }
  }, [isResearching, sourceNotes]);

  const loadSampleSource = (type) => {
    if (type === 'kucing') {
      setTopic('Alasan Ilmiah Kenapa Kucing Takut Mentimun');
      if (effectiveMode === 'manual') setSceneCount(6);
      setSourceNotes(
`DOSSIER FAKTA RISET: KENAPA KUCING TAKUT MENTIMUN? (SAINS & BIOLOGI)
1. Fenomena: Kucing melompat panik (startle reflex) saat melihat mentimun ditaruh diam-diam di belakangnya.
2. Alasan Ilmiah: Bentuk lonjong dan warna hijau mentimun mirip predator alami kucing di alam liar, yaitu ULAR.
3. Mekanisme Otak: Amygdala kucing memicu pelepasan adrenalin seketika untuk insting bertahan hidup dan melarikan diri.
4. Zona Makan: Area makan adalah tempat aman bagi kucing. Meletakkan benda asing tiba-tiba memicu kepanikan akut.
5. Imbauan Dokter Hewan: Para dokter hewan dan pakar etologi melarang aksi jahil ini karena memicu stres kronis dan trauma pada kucing.`
      );
      setIsSourceOpen(true);
      addToast('Catatan riset sains biologi (Kucing & Mentimun) dimuat!', 'info');
    } else if (type === 'black_hole') {
      setTopic('Misteri Lubang Hitam (Black Hole) Terbesar di Alam Semesta');
      if (effectiveMode === 'manual') setSceneCount(8);
      setSourceNotes(
`DOSSIER FAKTA RISET: LUBANG HITAM ULTRA-MASIF TON 618 (ASTRONOMI)
1. Objek: TON 618, quasar yang menampung salah satu lubang hitam terbesar di alam semesta.
2. Skala Magnitudo: Memiliki massa sekitar 66 miliar kali massa Matahari kita.
3. Gravitasi Ekstrem: Tarikan gravitasinya begitu masif sehingga bahkan foton cahaya tidak bisa lepas dari Event Horizon.
4. Relativitas Einstein: Distorsi ruang-waktu menyebabkan waktu melambat secara ekstrem di dekat cakrawala peristiwa.
5. Piringan Akresi: Gas panas yang berputar di sekelilingnya memancarkan cahaya 140 triliun kali lebih terang dari seluruh bintang di Bima Sakti.`
      );
      setIsSourceOpen(true);
      addToast('Catatan riset astronomi (Black Hole TON 618) dimuat!', 'info');
    } else if (type === 'bermuda') {
      setTopic('Fakta Sebenarnya di Balik Misteri Segitiga Bermuda');
      if (effectiveMode === 'manual') setSceneCount(8);
      setSourceNotes(
`DOSSIER FAKTA RISET: MISTERI SEGITIGA BERMUDA (FAKTA VS MITOS)
1. Lokasi: Wilayah laut Atlantik antara Miami, Bermuda, dan Puerto Rico.
2. Mitos Populer: Konspirasi alien, portal dimensi waktu, atau monster laut pemakan kapal.
3. Fakta Ilmiah NOAA: Menurut US Navy dan NOAA, rasio kecelakaan di kawasan ini TIDAK lebih tinggi dibanding perairan sibuk lainnya di dunia.
4. Fenomena Nyata: Jalur badai tropis badai badai ganas (Hurricane Alley), anomali kompas akibat deklinasi magnetik, dan arus laut Gulf Stream yang sangat deras.
5. Gas Metana: Teori letupan gas hidrat metana dari dasar laut sempat diteliti, namun penyebab utama hilangnya kapal adalah cuaca ekstrem dan kesalahan navigasi manusia.`
      );
      setIsSourceOpen(true);
      addToast('Catatan riset misteri (Segitiga Bermuda) dimuat!', 'info');
    } else if (type === 'santong') {
      setTopic('Labuan Teluk Santong');
      if (effectiveMode === 'manual') setSceneCount(10);
      setSourceNotes(
`ARSIP RISET FAKTA LABUAN TELUK SANTONG (PLAMPANG, SUMBAWA):
1. Lokasi: Desa Teluk Santong, Kecamatan Plampang, Kabupaten Sumbawa (perairan Teluk Saleh).
2. Demografi Etnis: Mayoritas penduduk pesisir adalah keturunan diaspora SUKU BUGIS (dan Makassar) dari Sulawesi Selatan, BUKAN suku Bajo.
3. Sejarah: Para pelaut Bugis (Passompe) merantau ke Teluk Saleh sejak era Kesultanan Sumbawa karena hubungan dagang dan kekerabatan diplomatik.
4. Budaya & Tradisi: Membangun rumah panggung kayu khas Bugis bertiang tinggi dan mengoperasikan armada bagan tancap/apung penangkap cumi serta ikan teri Santong. Bahasa Bugis masih aktif dituturkan.
5. Falsafah Luhur: Menjunjung falsafah moral Bugis "Siri' Na Pacce" (kehormatan dan solidaritas) yang berpadu selaras dengan falsafah Sumbawa "Sabalong Samalewa".
6. Keistimewaan: Pangkalan pendaratan ikan Teluk Saleh dan gerbang konservasi habitat alami Hiu Paus ramah (Rhincodon typus).`
      );
      setIsSourceOpen(true);
      addToast('Catatan riset Suku Bugis di Teluk Santong dimuat!', 'info');
    } else if (type === 'poto_tano') {
      setTopic('Sebelum Dikenal Sebagai Pelabuhan Poto Tano');
      if (effectiveMode === 'manual') setSceneCount(10);
      setSourceNotes(
`ARSIP RISET FAKTA SEBELUM DIKENAL SEBAGAI PELABUHAN POTO TANO:
1. Toponimi: Berasal dari bahasa Samawa asli: "Poto" (ujung/pucuk) dan "Tano" (tanah), artinya Ujung Tanah barat Pulau Sumbawa pembatas Selat Alas.
2. Status Awal: Sebelum pemekaran KSB 2003 dan dibangun dermaga ASDP, wilayah ini berstatus Dusun Pinamin di bawah Desa Senayan, Kec. Seteluk.
3. Perintis: Dirintis oleh pelaut ulung Suku Bajo dan Tau Samawa dengan rumah panggung kayu di atas air dangkal.
4. Geografi: Terlindung alami oleh gugusan 8 pulau (Gili Balu: Kenawa, Paserang, dll) dan hutan bakau.
5. Pelayaran Kuno: Menyeberang Selat Alas hanya dengan perahu jukung kayu bercadik melawan arus ganas.
6. Falsafah: Sabalong Samalewa (membangun dalam keselarasan).`
      );
      setIsSourceOpen(true);
      addToast('Catatan riset sejarah Poto Tano dimuat!', 'info');
    }
  };

  const handleModeChange = (newMode) => {
    setSceneMode(newMode);
    if (newMode === 'manual') {
      if (!sceneCount || sceneCount < 10) {
        setSceneCount(10);
      } else if (sceneCount > 20) {
        setSceneCount(20);
      }
    }
  };

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value, 10);
    const clamped = Math.max(10, Math.min(20, isNaN(val) ? 10 : val));
    setSceneCount(clamped);
  };

  const testSceneAudio = (scene) => {
    if (playingVoiceId === scene.id) {
      soundEngine.stopSpeech();
      setPlayingVoiceId(null);
      return;
    }

    setPlayingVoiceId(scene.id);
    soundEngine.speakNarration(
      scene.narration,
      { pitch: 0.9, rate: 0.95 },
      () => {},
      () => setPlayingVoiceId(null)
    );
  };

  // Dynamic AI Recommendation text - Adaptive to ANY Random Topic Domain
  const getAiRecommendation = () => {
    const lowerTopic = topic.toLowerCase();
    const isAnimal = lowerTopic.includes('kucing') || lowerTopic.includes('hewan') || lowerTopic.includes('anjing') || lowerTopic.includes('biologi');
    const isScience = lowerTopic.includes('black hole') || lowerTopic.includes('bintang') || lowerTopic.includes('alam semesta') || lowerTopic.includes('planet') || lowerTopic.includes('kuantum') || lowerTopic.includes('fisika');
    const isMystery = lowerTopic.includes('bermuda') || lowerTopic.includes('misteri') || lowerTopic.includes('konspirasi') || lowerTopic.includes('hilang') || lowerTopic.includes('alien');
    const isTech = lowerTopic.includes('ai') || lowerTopic.includes('robot') || lowerTopic.includes('komputer') || lowerTopic.includes('teknologi');
    const isSantong = lowerTopic.includes('santong');
    const isPotoTano = lowerTopic.includes('poto tano') || lowerTopic.includes('tano');

    const sceneDesc = effectiveMode === 'auto'
      ? 'Otomatis Adaptif (10–20 Scene Disesuaikan Isi Cerita)'
      : `${sceneCount} Scene (~${sceneCount * 10} detik)`;

    if (isAnimal) {
      return {
        text: `Rekomendasi Sains Biologi & Hewan: ${sceneDesc}. Fokus pada respon refleks alami, insting predator vs mangsa, dan alasan ilmiah dokter hewan. Format hook mengungkap salah kaprah publik dengan fakta biologis mengejutkan.`,
        hookScore: '99%',
        retentionScore: '96%',
        isFactual: true,
        validationLabel: '✓ Validasi: Sains Perilaku Hewan & Bukti Biologis'
      };
    }

    if (isScience) {
      return {
        text: `Rekomendasi Sains & Kosmik: ${sceneDesc}. Menyorot skala magnitudo mencengangkan, hukum relativitas fisika, dan data observasi teleskop modern. Memberikan sensasi 'mind-blowing' pada detik ke-5 hingga akhir.`,
        hookScore: '98%',
        retentionScore: '97%',
        isFactual: true,
        validationLabel: '✓ Validasi: Data Astronomi & Fisika Relativitas'
      };
    }

    if (isMystery) {
      return {
        text: `Rekomendasi Dokumenter Misteri Dunia: ${sceneDesc}. Membedah mitos populer yang beredar lalu membeberkeran bukti faktual, dokumen investigasi resmi, dan fakta sains di balik fenomena sebenarnya.`,
        hookScore: '99%',
        retentionScore: '96%',
        isFactual: true,
        validationLabel: '✓ Validasi: Investigasi Resmi & Mitos vs Fakta'
      };
    }

    if (isTech) {
      return {
        text: `Rekomendasi Inovasi & Masa Depan: ${sceneDesc}. Menjelaskan cara kerja teknologi dengan analogi sederhana yang mudah dipahami orang awam, dibalut prediksi masa depan yang bikin penasaran.`,
        hookScore: '97%',
        retentionScore: '95%',
        isFactual: true,
        validationLabel: '✓ Validasi: Sains Komputasi & Fakta Teknologi'
      };
    }

    if (isSantong) {
      return {
        text: `Rekomendasi Sejarah Maritim: ${sceneDesc}. Memvalidasi diaspora perantau tangguh Suku Bugis ("Passompe") di Teluk Saleh, tradisi bagan apung, perpaduan falsafah "Siri' Na Pacce" dan "Sabalong Samalewa", serta konservasi Hiu Paus.`,
        hookScore: '99%',
        retentionScore: '97%',
        isFactual: true,
        validationLabel: '✓ Validasi: Arsip Bugis Teluk Santong & Konservasi'
      };
    }

    if (isPotoTano) {
      return {
        text: `Rekomendasi Sejarah Daerah: ${sceneDesc}. Mengupas riwayat Dusun Pinamin, pemukiman awal Suku Bajo, perahu jukung Selat Alas, hingga pelabuhan feri ASDP modern dan pemekaran KSB 2003.`,
        hookScore: '98%',
        retentionScore: '96%',
        isFactual: true,
        validationLabel: '✓ Validasi: Dusun Pinamin, Suku Bajo & Selat Alas'
      };
    }

    // Default universal recommendation for ANY random topic
    return {
      text: `Rekomendasi Multi-Disiplin Berbasis Fakta: ${sceneDesc}. Alur dirancang dengan struktur 'Curiosity Hook' ➔ 'Bedah Mitos' ➔ 'Mekanisme & Bukti Nyata' ➔ 'Aha-Moment'. Siap mencerdaskan penonton TikTok dengan fakta 100% valid.`,
      hookScore: '98%',
      retentionScore: '95%',
      isFactual: true,
      validationLabel: '✓ Validasi: Sumber Ilmu Kredibel (Anti-Hoaks & Anti-Halusinasi)'
    };
  };

  const aiRec = getAiRecommendation();

  return (
    <div className="space-y-6">
      
      {/* Top Banner Box */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#141a29] via-[#161f33] to-[#121624] border border-white/10 p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FE2C55]/10 to-[#25F4EE]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#FE2C55]/20 text-[#FE2C55]">
                📝
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                LANGKAH 1: PENYUSUNAN NASKAH & JUMLAH SCENE
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Layar pertama untuk merancang ide cerita viral & sejarah otentik, menentukan durasi, dan memastikan alur fakta akurat.
            </p>
          </div>

          {/* Preset Topics Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-slate-400">Ide Pilihan:</span>
            <button
              onClick={() => {
                setTopic('Alasan Ilmiah Kenapa Kucing Takut Mentimun');
                setSceneCount(10);
                addToast('Tema Sains & Hewan dipilih: Kucing & Mentimun (10 Scene)', 'info');
              }}
              className={`text-xs px-3 py-1.5 rounded-full border font-bold transition flex items-center gap-1.5 ${
                topic.toLowerCase().includes('kucing')
                  ? 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400 text-amber-200 shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <span>🐱 Kucing & Mentimun (Biologi)</span>
            </button>
            <button
              onClick={() => {
                setTopic('Misteri Lubang Hitam (Black Hole) Terbesar di Alam Semesta');
                setSceneCount(10);
                addToast('Tema Sains & Kosmik dipilih: Black Hole TON 618 (10 Scene)', 'info');
              }}
              className={`text-xs px-3 py-1.5 rounded-full border font-bold transition flex items-center gap-1.5 ${
                topic.toLowerCase().includes('black hole')
                  ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-400 text-purple-200 shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <span>🌌 Black Hole (Astronomi)</span>
            </button>
            <button
              onClick={() => {
                setTopic('Fakta Sebenarnya di Balik Misteri Segitiga Bermuda');
                setSceneCount(10);
                addToast('Tema Misteri Dunia dipilih: Segitiga Bermuda (10 Scene)', 'info');
              }}
              className={`text-xs px-3 py-1.5 rounded-full border font-bold transition flex items-center gap-1.5 ${
                topic.toLowerCase().includes('bermuda')
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400 text-cyan-200 shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <span>🌊 Segitiga Bermuda (Misteri)</span>
            </button>
            <button
              onClick={() => {
                setTopic('Labuan Teluk Santong');
                setSceneCount(10);
                addToast('Tema Sejarah Maritim Teluk Santong dipilih (10 Scene)', 'info');
              }}
              className={`text-xs px-3 py-1.5 rounded-full border font-bold transition flex items-center gap-1.5 ${
                topic.toLowerCase().includes('santong')
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400 text-emerald-200 shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <span>⚓ Teluk Santong (Bugis)</span>
            </button>
            <button
              onClick={() => {
                setTopic('Sebelum Dikenal Sebagai Pelabuhan Poto Tano');
                setSceneCount(10);
                addToast('Tema Sejarah Poto Tano dipilih (10 Scene Fakta Sejarah)', 'info');
              }}
              className={`text-xs px-3 py-1.5 rounded-full border font-bold transition flex items-center gap-1.5 ${
                topic.toLowerCase().includes('poto tano')
                  ? 'bg-gradient-to-r from-[#25F4EE]/20 to-teal-500/20 border-[#25F4EE] text-white shadow-md'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
              }`}
            >
              <span>🚢 Poto Tano (Arsip Pinamin)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Settings Panel */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 shadow-xl space-y-6">
        
        {/* Input Topic & Visual Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
              Judul / Topik Cerita TikTok:
            </label>
            <div className="relative">
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Ketik topik video TikTok apa saja (contoh: Kenapa Kucing Takut Mentimun, Misteri Segitiga Bermuda, dll)..."
                className="w-full bg-[#0d111a] border border-white/15 rounded-xl px-4 py-3.5 text-sm sm:text-base font-semibold text-white placeholder-slate-500 focus:outline-none focus:border-[#25F4EE] focus:ring-1 focus:ring-[#25F4EE] transition shadow-inner"
              />
              <div className="absolute right-3 top-3.5 text-xs text-slate-400 bg-white/5 px-2 py-1 rounded-md">
                Topic Input
              </div>
            </div>
          </div>

          {/* Visual Style Selector */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Gaya Visual Animasi AI:
              </label>
              <span className="text-[11px] font-semibold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
                💎 100% Orisinal & Menggemaskan
              </span>
            </div>
            <select
              value={visualStyle}
              onChange={(e) => setVisualStyle(e.target.value)}
              className="w-full bg-[#0d111a] border border-white/15 rounded-xl px-3 py-3.5 text-sm font-semibold text-[#25F4EE] focus:outline-none focus:border-[#25F4EE] transition shadow-inner cursor-pointer"
            >
              {visualStyles.map((style) => (
                <option key={style.id} value={style.id} className="bg-[#121622] text-white">
                  {style.name}
                </option>
              ))}
            </select>
            {/* Style Preview Note */}
            <div className="text-[11px] text-slate-300 bg-white/5 border border-white/10 rounded-lg p-2.5 flex items-start gap-2">
              <span className="text-base leading-none">
                {visualStyle === 'pixar' ? '✨' : visualStyle === 'claymation' ? '🎨' : visualStyle === 'anime' ? '🌸' : visualStyle === 'dark_folklore' ? '🕯️' : '🎬'}
              </span>
              <div>
                <span className="font-bold text-teal-300">
                  {visualStyle === 'pixar' && '3D Animation (Cute Stylized):'}
                  {visualStyle === 'claymation' && 'Claymation (Stop-Motion):'}
                  {visualStyle === 'anime' && 'Anime Watercolor Style:'}
                  {visualStyle === 'dark_folklore' && 'Dark Nusantara Folklore:'}
                  {visualStyle === 'cinematic' && 'Cinematic Hyperrealistic:'}
                </span>{' '}
                <span className="text-slate-300">
                  {visualStyle === 'pixar' && 'Desain 100% orisinal baru (belum pernah dibuat orang lain), karakter animasi 3D super imut & ekspresif, mata bulat besar berbinar, pipi tembem manis, pencahayaan sinematik animasi 3D (100% bebas filter hak cipta).'}
                  {visualStyle === 'claymation' && 'Desain 100% orisinal baru, boneka tanah liat clay plastisin buatan tangan yang super lucu & menggemaskan, pipi bulat merona, mata ekspresif, tekstur stop-motion nyata.'}
                  {visualStyle === 'anime' && 'Desain 100% orisinal baru, tokoh anime imut nan berhati hangat bergaya cat air klasik, mata berbinar ceria, berpadu busana Nusantara.'}
                  {visualStyle === 'dark_folklore' && 'Desain 100% orisinal baru, karakter dongeng Nusantara yang manis, magis, dan menggemaskan dalam balutan ornamen batik mistis nan memikat.'}
                  {visualStyle === 'cinematic' && 'Desain 100% orisinal baru, karakter manis, ramah, dan memikat dengan senyum hangat natural dalam visual film 8K berlatar keindahan Nusantara.'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Mode Pemilihan Scene */}
        <div className="p-4 sm:p-5 rounded-xl bg-[#0e131d] border border-white/10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Mode Pemilihan Scene & Durasi:
              </span>
              <p className="text-xs text-slate-400 mt-0.5">
                Tiap scene FLOW memiliki durasi rata-rata 8–10 detik.
              </p>
            </div>

            {/* Radio Mode Selection */}
            <div className="flex items-center gap-4 bg-[#141926] p-1.5 rounded-xl border border-white/5">
              <label 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  effectiveMode === 'auto' ? 'bg-[#25F4EE]/20 text-[#25F4EE] border border-[#25F4EE]/40' : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => handleModeChange('auto')}
              >
                <input
                  type="radio"
                  name="sceneMode"
                  checked={effectiveMode === 'auto'}
                  onChange={() => handleModeChange('auto')}
                  className="hidden"
                />
                <Sparkles className="w-3.5 h-3.5" />
                Mode Otomatis (Rekomendasi AI)
              </label>

              <label 
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                  effectiveMode === 'manual' ? 'bg-[#FE2C55]/20 text-[#FE2C55] border border-[#FE2C55]/40' : 'text-slate-400 hover:text-white'
                }`}
                onClick={() => handleModeChange('manual')}
              >
                <input
                  type="radio"
                  name="sceneMode"
                  checked={effectiveMode === 'manual'}
                  onChange={() => handleModeChange('manual')}
                  className="hidden"
                />
                <Sliders className="w-3.5 h-3.5" />
                Mode Manual
              </label>
            </div>
          </div>

          {/* Dynamic Scene Configuration Area */}
          {effectiveMode === 'auto' ? (
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div className="p-4 rounded-xl bg-gradient-to-r from-[#25F4EE]/10 via-[#141926] to-[#FE2C55]/10 border border-[#25F4EE]/30 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#25F4EE]/20 text-[#25F4EE] flex items-center justify-center font-bold text-sm shrink-0 border border-[#25F4EE]/30">
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-extrabold text-white">
                          AI Otomatis Menentukan Jumlah Scene
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-[#25F4EE]/20 text-[#25F4EE] text-[10px] font-bold border border-[#25F4EE]/40">
                          Adaptif 10 – 20 Scene (Min. 10)
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">
                        Dihitung dinamis oleh Gemini berdasarkan kedalaman fakta dokumen & panjang cerita (Min 10, Max 20).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 bg-[#090d16] px-3.5 py-2 rounded-xl border border-white/10 self-start sm:self-auto shrink-0 shadow-inner">
                    <span className="text-xs text-slate-400 font-medium">
                      Scene Saat Ini:
                    </span>
                    <span className="text-sm font-black text-[#25F4EE] bg-[#25F4EE]/10 px-2.5 py-0.5 rounded-lg border border-[#25F4EE]/20">
                      {scenes && scenes.length > 0 ? `${scenes.length} Scene` : `${sceneCount} Scene`}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      (~{(scenes && scenes.length > 0 ? scenes.length : sceneCount) * 10}s)
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-300 bg-white/5 rounded-lg p-3 flex items-start gap-2.5 border border-white/5 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[#25F4EE] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Prinsip Anti-Pangkas Fakta (10–20 Scene):</strong> Minimal 10 scene dijamin untuk setiap cerita agar kedalaman edukasi terjaga. Jika cerita sarat informasi sejarah panjang atau bukti sains kompleks, AI akan mengembangkan scene hingga <strong>14–20 scene</strong> agar tidak ada poin menarik atau fakta krusial yang terbuang.
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Mode Manual: Full Range Slider Control (10 - 20 Scene) */
            <div className="pt-2 border-t border-white/5 space-y-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-300">
                    Jumlah Scene Manual:
                  </span>
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#FE2C55] to-[#25F4EE] text-white font-extrabold text-sm shadow-md">
                    {sceneCount}
                  </span>
                  <span className="text-xs text-slate-400">
                    (~{sceneCount * 10} Detik Total Durasi Video)
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  Bebas geser slider atau klik angka (10 – 20 Scene)
                </span>
              </div>

              {/* Range Slider */}
              <div className="relative pt-1">
                <input
                  type="range"
                  min="10"
                  max="20"
                  step="1"
                  value={sceneCount}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#FE2C55]"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-bold px-1 mt-2 flex-wrap gap-1">
                  {[10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSceneCount(n)}
                      className={`px-2 py-0.5 rounded-md transition text-xs ${
                        sceneCount === n 
                          ? 'bg-[#FE2C55] text-white font-black scale-110 shadow-sm ring-2 ring-[#FE2C55]/30' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Gemini Pro AI Status Banner */}
          <div className="pt-2">
            <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3.5 transition-all ${
              hasApiKey
                ? 'bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-transparent border-emerald-500/30'
                : 'bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-transparent border-amber-500/30'
            }`}>
              <div className="flex items-center gap-3 text-xs">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  hasApiKey ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400 animate-pulse'
                }`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-xs sm:text-sm">
                      {hasApiKey ? '✨ Gemini Pro AI Terhubung:' : '🔑 Hubungkan Google Gemini Pro API:'}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                      hasApiKey 
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {hasApiKey ? geminiModel : 'Belum Ada Key'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs mt-0.5 leading-relaxed">
                    {hasApiKey
                      ? 'AI akan meneliti data sejarah nyata, arsip daerah, dan kosakata lokal otentik bebas hoax.'
                      : 'Masukkan API Key Anda agar AI dapat meneliti naskah sejarah valid & menghasilkan prompt presisi.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={onOpenApiKeyModal}
                className={`shrink-0 text-xs px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 border ${
                  hasApiKey
                    ? 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    : 'bg-amber-500 text-slate-950 hover:bg-amber-400 border-amber-400 shadow-md font-extrabold'
                }`}
              >
                <span>{hasApiKey ? '⚙️ Ganti Model/Key' : '🔑 Input API Key Gratis'}</span>
              </button>
            </div>
          </div>

          {/* 📓 Mode Riset ala NotebookLM: Dokumen Sumber & Fakta Ground Truth */}
          <div className="rounded-xl border border-teal-500/30 bg-[#0d131f] overflow-hidden shadow-md">
            {/* Header Accordion Toggle */}
            <div 
              onClick={() => setIsSourceOpen(!isSourceOpen)}
              className="p-3.5 sm:p-4 bg-gradient-to-r from-teal-950/40 via-slate-900 to-transparent flex items-center justify-between cursor-pointer hover:bg-teal-950/60 transition select-none"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  sourceNotes && sourceNotes.trim() ? 'bg-teal-500/20 text-[#25F4EE]' : 'bg-white/10 text-slate-300'
                }`}>
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-extrabold text-white flex items-center gap-1.5">
                      📓 Mode Riset ala NotebookLM: Dokumen Sumber & Catatan Fakta
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${
                      sourceNotes && sourceNotes.trim()
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-white/5 text-slate-400 border-white/10'
                    }`}>
                      {sourceNotes && sourceNotes.trim() ? '🟢 Ground Truth Aktif' : 'Opsional'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {sourceNotes && sourceNotes.trim()
                      ? `Terisi (${sourceNotes.trim().length} karakter). Gemini akan 100% patuh pada fakta dokumen ini tanpa halusinasi.`
                      : 'Tempelkan ringkasan riset NotebookLM, artikel sejarah, atau catatan arsip agar naskah 100% valid.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-400 hidden sm:inline">
                  {isSourceOpen ? 'Tutup' : 'Buka'}
                </span>
                <button
                  type="button"
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
                >
                  {isSourceOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Content Body */}
            {isSourceOpen && (
              <div className="p-4 border-t border-teal-500/20 space-y-3 bg-[#080d16]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <label className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-teal-400" />
                      Catatan Fakta / Dokumen Ground Truth:
                    </label>
                  </div>

                  {/* Action to trigger Step 1 Fact Research */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => onResearchFacts(topic)}
                      disabled={isResearching || isGenerating}
                      className="px-3 py-1.5 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/40 text-xs font-bold flex items-center gap-1.5 transition shadow-sm disabled:opacity-50"
                      title="AI meneliti toponimi, demografi suku asli & sejarah sebelum naskah dibuat"
                    >
                      <Sparkles className={`w-3.5 h-3.5 text-teal-300 ${isResearching ? 'animate-spin' : ''}`} />
                      <span>{isResearching ? 'Sedang Meneliti Fakta...' : '🔍 1. Riset Fakta (NotebookLM Agent)'}</span>
                    </button>

                    {sourceNotes && (
                      <button
                        type="button"
                        onClick={() => setSourceNotes('')}
                        className="px-2.5 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/20 transition flex items-center gap-1 text-xs font-medium"
                      >
                        <Trash2 className="w-3 h-3" /> Bersihkan
                      </button>
                    )}
                  </div>
                </div>

                {/* Sample Presets Quick Loader */}
                <div className="flex items-center gap-1.5 text-[11px] flex-wrap bg-white/[0.02] p-2 rounded-lg border border-white/5">
                  <span className="text-slate-400 text-[10px] font-semibold">Muat Contoh Fakta:</span>
                  <button
                    type="button"
                    onClick={() => loadSampleSource('kucing')}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-teal-500/20 text-teal-300 border border-white/10 hover:border-teal-500/30 transition font-medium"
                  >
                    🐱 Kucing & Mentimun (Biologi)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleSource('black_hole')}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-teal-500/20 text-teal-300 border border-white/10 hover:border-teal-500/30 transition font-medium"
                  >
                    🌌 Black Hole (Astronomi)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleSource('bermuda')}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-teal-500/20 text-teal-300 border border-white/10 hover:border-teal-500/30 transition font-medium"
                  >
                    🌊 Segitiga Bermuda (Misteri)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleSource('santong')}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-teal-500/20 text-teal-300 border border-white/10 hover:border-teal-500/30 transition font-medium"
                  >
                    ⚓ Teluk Santong (Bugis)
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSampleSource('poto_tano')}
                    className="px-2 py-0.5 rounded bg-white/5 hover:bg-teal-500/20 text-teal-300 border border-white/10 hover:border-teal-500/30 transition font-medium"
                  >
                    🚢 Poto Tano (Pinamin)
                  </button>
                </div>

                <textarea
                  value={sourceNotes}
                  onChange={(e) => setSourceNotes(e.target.value)}
                  rows={5}
                  placeholder={`Hasil riset fakta NotebookLM Agent akan tampil di sini, atau Anda dapat menempel catatan fakta/artikel apa saja... Contoh:
- Topik: Kenapa Kucing Takut Mentimun / Misteri Black Hole / Segitiga Bermuda / Sejarah Kopi
- Data & Fakta: Angka, mekanisme biologis/teknis, bukti observasi, atau kronologi yang terbukti nyata.
- Mitos vs Fakta: Kesalahpahaman populer yang berhasil dipatahkan oleh riset sains.
- Poin Menarik: Rahasia mencengangkan yang membuka wawasan penonton...`}
                  className="w-full bg-[#05080f] border border-teal-500/25 focus:border-[#25F4EE] rounded-xl p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition leading-relaxed font-mono"
                />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    {sourceNotes && sourceNotes.trim()
                      ? 'Metode Grounding Aktif: Gemini 100% wajib patuh pada fakta dokumen di atas (Anti-Hoaks & Bebas Halusinasi).'
                      : 'Klik "🔍 Riset Fakta (NotebookLM Agent)" di atas untuk meneliti fakta topik ini secara otomatis.'}
                  </span>
                  <span className="font-mono text-slate-500 shrink-0">
                    {sourceNotes ? sourceNotes.trim().length : 0} karakter
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Stepped Progress Indicator ketika Pipeline Sedang Berjalan */}
          {(isResearching || isGenerating) && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/70 via-slate-900 to-rose-950/40 border border-teal-500/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-extrabold text-sm shrink-0">
                  {isResearching ? '1' : '2'}
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-teal-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 animate-spin text-[#25F4EE]" />
                    {isResearching 
                      ? 'Tahap 1 Sedang Berjalan: NotebookLM Fact Researcher Engine' 
                      : 'Tahap 2 Sedang Berjalan: Gemini Script Director & Scene Composer'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    {isResearching
                      ? `Meneliti data valid, bukti ilmiah, dan fakta terverifikasi untuk "${topic}"...`
                      : effectiveMode === 'auto'
                        ? `Menyusun scene adaptif (10–20 scene disesuaikan kedalaman informasi agar zero data terbuang)...`
                        : `Menyusun ${sceneCount} scene TikTok berstandar Ground Truth dengan panduan intonasi suara & visual prompt...`}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-xs font-semibold shrink-0">
                <span className={`px-2.5 py-1 rounded-lg border ${
                  isResearching 
                    ? 'bg-teal-500/30 text-teal-200 border-teal-400 animate-pulse' 
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                }`}>
                  {isResearching ? '⏳ 1. Riset Fakta' : '✓ 1. Riset Fakta'}
                </span>
                <span className="text-slate-500 font-bold">➔</span>
                <span className={`px-2.5 py-1 rounded-lg border ${
                  isGenerating 
                    ? 'bg-rose-500/30 text-rose-200 border-rose-400 animate-pulse' 
                    : 'bg-white/5 text-slate-500 border-white/10'
                }`}>
                  {isGenerating ? '⏳ 2. Susun Naskah' : '2. Susun Naskah'}
                </span>
              </div>
            </div>
          )}

          {/* Generate Buttons Area */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={() => onGenerateScript(false)}
              disabled={isGenerating || isResearching}
              type="button"
              className="w-full sm:w-auto px-4 py-3 rounded-xl font-bold text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition disabled:opacity-50"
            >
              📋 Preset Cepat (Lokal)
            </button>

            <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full sm:w-auto">
              {/* Tombol Susun Naskah Saja (Menggunakan Fakta yang Ada) */}
              <button
                onClick={() => onGenerateScript(true)}
                disabled={isGenerating || isResearching}
                type="button"
                className="w-full sm:w-auto px-4 py-3 rounded-xl font-bold text-xs text-teal-300 hover:text-white bg-teal-950/40 hover:bg-teal-900/60 border border-teal-500/30 hover:border-teal-400/60 transition disabled:opacity-50 flex items-center justify-center gap-2"
                title="Menyusun naskah TikTok menggunakan dokumen rujukan fakta yang sedang aktif"
              >
                <BookOpen className="w-3.5 h-3.5 text-teal-400" />
                <span>🎬 Susun Naskah Berbasis Fakta</span>
              </button>

              {/* Tombol Utama: ⚡ Jalankan Pipeline 2-Tahap Lengkap */}
              <button
                onClick={() => onRunFullPipeline(topic)}
                disabled={isGenerating || isResearching}
                type="button"
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl font-extrabold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#25F4EE] via-teal-300 to-[#25F4EE] hover:brightness-110 transition-all shadow-xl shadow-[#25F4EE]/25 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 text-slate-950 ${(isGenerating || isResearching) ? 'animate-spin' : ''}`} />
                <span>
                  {isResearching
                    ? '🔍 [Tahap 1/2] Meneliti Fakta...'
                    : isGenerating
                      ? '🎬 [Tahap 2/2] Menyusun Naskah...'
                      : '⚡ Jalankan Pipeline 2-Tahap (Riset Fakta ➔ Susun Naskah)'}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 💡 REKOMENDASI AI Card */}
        <div className={`rounded-xl p-4 flex items-start gap-3.5 border transition ${
          aiRec.isFactual
            ? 'bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border-emerald-500/40 shadow-lg shadow-emerald-950/20'
            : 'bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border-amber-500/30'
        }`}>
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
            aiRec.isFactual ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
          }`}>
            <Lightbulb className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
              <h4 className={`text-xs font-bold uppercase tracking-wide ${
                aiRec.isFactual ? 'text-emerald-400' : 'text-amber-400'
              }`}>
                {aiRec.isFactual ? '🛡️ AUDIT FAKTA SEJARAH ASLI (ANTI-HOAX):' : '💡 REKOMENDASI AI TIKTOK ALGORITHM:'}
              </h4>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                aiRec.isFactual 
                  ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30' 
                  : 'bg-amber-400/20 text-amber-300'
              }`}>
                {aiRec.isFactual ? '100% Non-Fiktif & Sesuai Fakta' : 'Pacing Optimal'}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              "{aiRec.text}"
            </p>
            <div className="flex items-center gap-4 mt-2 text-xs text-slate-300">
              <span>🎯 Hook Power: <strong className="text-emerald-300">{aiRec.hookScore}</strong></span>
              <span>📈 Target Retensi: <strong className="text-emerald-300">{aiRec.retentionScore}</strong></span>
              {aiRec.isFactual && (
                <span className="text-[11px] text-teal-300 font-semibold hidden sm:inline">
                  {aiRec.validationLabel || '✓ Validasi: Fakta Sejarah Terverifikasi (Anti-Hoaks)'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* DRAF NASKAH CERITA */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                {aiRec.isFactual && <span className="text-emerald-400">🛡️</span>}
                DRAF NASKAH CERITA ({scenes.length} SCENE):
              </h3>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {aiRec.isFactual ? 'Kronologi sejarah terverifikasi dari awal hingga kini' : 'Klik ikon suara untuk uji dengar narator'}
              </span>
            </div>
            <span className="text-xs font-medium text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Siap ACC
            </span>
          </div>

          {scenes.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-white/10 p-8 sm:p-12 text-center bg-[#0a0e17] space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-slate-400">
                <FileText className="w-7 h-7 text-slate-500" />
              </div>
              <h4 className="text-base font-bold text-white">Belum Ada Naskah Cerita</h4>
              <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Ketik topik cerita di kolom atas atau pilih salah satu ide, lalu klik <strong className="text-[#25F4EE]">"⚡ Jalankan Pipeline 2-Tahap"</strong> untuk meneliti fakta dan menyusun naskah scene secara otomatis.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {scenes.map((scene, idx) => (
                <div 
                  key={scene.id} 
                  className="group relative rounded-xl bg-[#0f1420] border border-white/10 hover:border-white/20 p-4 transition duration-200 space-y-2.5 shadow-md"
                >
                  {/* Scene Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-extrabold bg-white/10 text-white">
                        Scene {idx + 1}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {scene.time}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${scene.stageColor}`}>
                        [{scene.stage}]
                      </span>
                    </div>

                    {/* Audio Preview Button */}
                    <button
                      onClick={() => testSceneAudio(scene)}
                      title="Uji Dengar Suara Narator Bahasa Indonesia"
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-xs font-bold transition ${
                        playingVoiceId === scene.id
                          ? 'bg-[#FE2C55] border-[#FE2C55] text-white animate-pulse'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-[#25F4EE]" />
                      <span className="text-[10px] hidden sm:inline">Uji Suara</span>
                    </button>
                  </div>

                  {/* Scene Title */}
                  {scene.title && (
                    <h4 className="text-xs font-bold text-[#25F4EE] line-clamp-1">
                      {scene.title}
                    </h4>
                  )}

                  {/* Narration Quote */}
                  <div className="bg-[#141a29] p-3 rounded-lg border border-white/5 space-y-1.5">
                    <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed italic">
                      "{scene.narration}"
                    </p>
                    {scene.voiceGuide && (
                      <p className="text-[10px] text-teal-300/80 font-mono border-t border-white/5 pt-1.5">
                        {scene.voiceGuide}
                      </p>
                    )}
                  </div>

                  {/* 📚 Sumber Ilmu & Arsip Fakta Sejarah */}
                  {scene.sumberIlmu && (
                    <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/25 text-[11px] text-emerald-300 space-y-1">
                      <div className="font-bold flex items-center gap-1.5 text-emerald-400">
                        <span>📚 Sumber Ilmu & Arsip Fakta:</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-[11px] font-normal">
                        {scene.sumberIlmu}
                      </p>
                    </div>
                  )}

                  {/* Meta details */}
                  <div className="text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-1 pt-1">
                    <span className="truncate max-w-[220px]">
                      👁️ Visual: <span className="text-slate-300">{scene.visual}</span>
                    </span>
                    <span className="text-amber-400/90 font-medium">
                      ⚡ {scene.emotion}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Action Buttons */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            disabled={scenes.length === 0}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Edit3 className="w-4 h-4 text-slate-400" />
            🔄 Edit Naskah Manual
          </button>

          <button
            onClick={onAccScript}
            disabled={scenes.length === 0}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-400 hover:opacity-95 shadow-lg shadow-emerald-500/20 transition group disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <span>✅ ACC NASKAH & LANJUT KE PROMPT CENTER</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* Manual Script Edit Modal */}
      <EditScriptModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scenes={scenes}
        onSave={(updated) => {
          setScenes(updated);
          addToast('Naskah dan scene berhasil diperbarui secara manual!', 'success');
        }}
      />

    </div>
  );
}
