// Google Gemini AI Service for Scene Planning, Factual Storytelling & Educational Knowledge
import { getSumbawaGlossaryPromptText } from '../data/sumbawaDictionary';
import { getSasakGlossaryPromptText } from '../data/sasakDictionary';
import { getBugisGlossaryPromptText } from '../data/bugisDictionary';

export const DEFAULT_API_KEY = import.meta?.env?.VITE_GEMINI_API_KEY || '';
export const DEFAULT_MODEL = import.meta?.env?.VITE_GEMINI_MODEL || 'gemini-3.5-flash';

export const GEMINI_MODELS = [
  { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash (Rekomendasi - Cepat & Paling Akurat)', tier: 'Pro' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash-Lite (Super Ringan & Hemat Kuota)', tier: 'Lite' },
  { id: 'gemini-flash-lite-latest', name: 'Gemini Flash-Lite Latest (Cadangan Stabil)', tier: 'Lite' },
  { id: 'gemini-3.7-flash', name: 'Gemini 3.7 Flash (Reasoning Mendalam)', tier: 'Flash' }
];

export function getStoredApiKey() {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('gemini_api_key');
    // If localKey exists and is not the old dead key, return it
    if (localKey && localKey.trim() && !localKey.includes('Jhe5B3fo')) return localKey.trim();
    // Auto-save active user API key from env if available
    if (DEFAULT_API_KEY) {
      localStorage.setItem('gemini_api_key', DEFAULT_API_KEY);
      return DEFAULT_API_KEY;
    }
    return '';
  }
  return import.meta?.env?.VITE_GEMINI_API_KEY || DEFAULT_API_KEY || '';
}

export function setStoredApiKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('gemini_api_key', key.trim());
    } else {
      if (DEFAULT_API_KEY) {
        localStorage.setItem('gemini_api_key', DEFAULT_API_KEY);
      } else {
        localStorage.removeItem('gemini_api_key');
      }
    }
  }
}

export function getStoredModel() {
  if (typeof window !== 'undefined') {
    const m = localStorage.getItem('gemini_model');
    if (m && m !== 'gemini-2.5-pro' && m !== 'gemini-2.5-flash') return m;
    return import.meta?.env?.VITE_GEMINI_MODEL || DEFAULT_MODEL;
  }
  return DEFAULT_MODEL;
}

export function setStoredModel(model) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('gemini_model', model);
  }
}

// Knowledge Priming: Domain Knowledge & Ensiklopedia Multi-Topik Universal
export function getTopicDomainKnowledge(topic) {
  const lower = (topic || '').toLowerCase();

  // 1. KAJIAN KHUSUS LABUAN TELUK SANTONG & SUKU BUGIS PESISIR SUMBAWA
  if (lower.includes('santong') || lower.includes('teluk santong')) {
    return `
ARSIP SEJARAH & DEMOGRAFI FAKTUAL LABUAN TELUK SANTONG (PLAMPANG, SUMBAWA):
- Lokasi: Pesisir perairan Teluk Saleh (Kecamatan Plampang, Kabupaten Sumbawa).
- Identitas Etnis Riil: Mayoritas dihuni oleh diaspora perantau tangguh SUKU BUGIS ("Passompe") dari Sulawesi Selatan yang telah berakar berabad-abad (BUKAN suku Bajo).
- Falsafah Luhur: Memadukan marwah Bugis "Siri' na Pacce" (kehormatan dan solidaritas kemanusiaan mendalam), "Taro Ada Taro Gau" (kesatuan kata dan perbuatan) dengan kearifan Samawa "Sabalong Samalewa".
- Kosakata & Ungkapan Terkenal Bugis: Salam santun "Tabe'", sebutan pelaut "Passompe", istilah berlayar "Sompe'", sapaan karib "Eja", gelar "Daeng" / "Puang", semangat "Kurru Sumange".
- Budaya & Tradisi: Rumah panggung kayu khas Bugis bertiang tinggi, armada bagan tancap/apung penangkap cumi dan teri Santong, perahu Pinisi, serta kawasan perairan tenang habitat konservasi Hiu Paus Teluk Saleh.

${getBugisGlossaryPromptText()}
`;
  }

  // 2. KAJIAN KHUSUS POTO TANO & SELAT ALAS
  if (lower.includes('poto tano') || lower.includes('tano')) {
    return `
ARSIP KAJIAN SEJARAH FAKTUAL POTO TANO (SUMBAWA BARAT):
- Toponimi: Berasal dari bahasa Samawa asli: "Poto" (ujung/pucuk) dan "Tano" (tanah tumpah darah).
- Asal Usul: Berawal dari perkampungan nelayan sunyi "Dusun Pinamin" (Desa Senayan, Kec. Seteluk).
- Perintis: Pelaut Suku Bajo (rumah panggung di atas air dangkal) & Tau Samawa, terlindung benteng alami 8 pulau (Gili Balu: Kenawa, Paserang, dll).
- Pelayaran & Falsafah: Dahulu perahu jukung kayu bercadik menyeberang Selat Alas ganas menuju Lombok (tanah Sasak), peristiwa Bangka Belah di Tanjung Tua Nanga, hingga era pelabuhan feri ASDP modern dan pemekaran KSB 2003. Falsafah luhur: "Sabalong Samalewa".
- Kosakata Khas Samawa: "Kalingka mo" (mari/ayo), "Sabalong Samalewa", "Mana tau manin tau" (semua manusia bersaudara), partikel penegas "mo/na", "Pina siq", "Bale" (rumah).
`;
  }

  // 3. KAJIAN KHUSUS SUKU BUGIS DI SUMBAWA & NUSANTARA
  if (lower.includes('bugis') || lower.includes('passompe') || lower.includes('siri na pacce') || lower.includes('makassar')) {
    return `
ARSIP KAJIAN HISTORIS & BUDAYA SUKU BUGIS (PASUKAN MARITIM & DIASPORA PESISIR SUMBAWA):
- Identitas: Suku Bugis (Tau Ugi) dikenal sebagai pelaut perantau tangguh ("Passompe") yang mendiami banyak pesisir Pulau Sumbawa (Labuan Teluk Santong, Alas, Poto Tano, Bima, Labuhan Sumbawa).
- Falsafah Luhur Utama: 
  * "Siri' na Pacce": Menjaga harga diri/kehormatan (Siri') dan rasa solidaritas/empati kepedulian kemanusiaan yang mendalam (Pacce).
  * "Taro Ada Taro Gau": Keselarasan mutlak antara perkataan dan perbuatan.
  * Prinsip Gotong Royong: "Mali Siparappe, Rebba Sipatokkong, Malilu Sipakainge" (Hanyut saling mengait, rebah saling menegakkan, khilaf saling mengingatkan).
- Kosakata & Ungkapan Terkenal yang Wajib Disisipkan Sesekali:
  * "Tabe'": Salam santun dan permisi penuh rasa hormat.
  * "Passompe": Kaum perantau samudra yang pantang menyerah.
  * "Sompe'": Layar perahu / mengarungi lautan.
  * "Eja": Sapaan akrab untuk sahabat atau saudara seperjuangan.
  * "Puang" / "Daeng": Sapaan gelar penghormatan kepada tetua atau tokoh.
  * "Kurru Sumange": Seruan peneguh jiwa dan berkah semangat.

${getBugisGlossaryPromptText()}
`;
  }

  // 4. KAJIAN KHUSUS DANA MBOJO (BIMA & DOMPU - SUMBAWA BAGIAN TIMUR)
  if (lower.includes('bima') || lower.includes('mbojo') || lower.includes('dompu') || lower.includes('tambora') || lower.includes('maryam')) {
    return `
ARSIP KAJIAN SEJARAH & BUDAYA DANA MBOJO (BIMA & DOMPU - PULAU SUMBAWA TIMUR):
- Wilayah & Identitas: Masyarakat Dou Mbojo yang mendiami wilayah bersejarah Kesultanan Bima dan Dompu di bagian timur Pulau Sumbawa.
- Falsafah Luhur Utama:
  * "Nggahi Rawi Pahu": Keselarasan antara ucapan dengan perbuatan (integritas tinggi, pantang mengingkari janji).
  * "Maja Labo Dahu": Moralitas luhur rasa malu kepada manusia dan rasa takut kepada Tuhan jika berbuat dosa/cela.
- Kosakata & Ungkapan Terkenal yang Wajib Disisipkan Sesekali:
  * "Mada": Hamba / saya (panggilan diri yang santun dan merendah).
  * "Ita": Anda / kamu (panggilan kepada pihak kedua yang dihormati).
  * "Wati": Tidak / bukan.
  * "Londo": Datang / keturunan / silsilah luhur.
  * "Kone": Seruan kekaguman / aduhai / wah.
  * Busana & Tenun: "Rimpu Cili" (tradisi berbusana hijab kain tenun khas Bima), "Tembe Nggoli" (sarung tenun ikat kebanggaan Bima-Dompu).
  * Arsitektur Tradisional: "Uma Lengge" (lumbung pangan dan rumah panggung tradisional bertatap mengerucut).
`;
  }

  // 5. KAJIAN KHUSUS SUKU SASAK (LOMBOK & HUBUNGANNYA DENGAN SUMBAWA)
  if (lower.includes('sasak') || lower.includes('lombok')) {
    return `
ARSIP KAJIAN HISTORIS & BUDAYA SUKU SASAK:
- Identitas: Masyarakat Suku Sasak yang terhubung erat dengan Pulau Sumbawa melalui perlintasan Selat Alas dan diaspora pesisir barat Sumbawa.
- Falsafah Luhur Utama:
  * "Tindih": Integritas, keteguhan hati, dan komitmen moral untuk menjaga kebenaran dan harga diri.
  * "Patuh Karya": Semangat musyawarah dan gotong royong membangun kehidupan bersama.
- Kosakata & Ungkapan Terkenal yang Wajib Disisipkan:
  * "Pelungguh / Pelinggih": Anda / saudara yang dimuliakan dan dihormati.
  * "Batur": Kawan, sahabat, atau teman seperjalanan.
  * "Solah": Indah, elok, bagus, penuh kebaikan dan kemuliaan.
  * "Matur Tampiasih": Terima kasih banyak yang santun dan tulus.
  * "Ape arak": Sapaan ramah menanyakan keadaan.
  * "Tiang": Saya / hamba (sapaan santun).

${getSasakGlossaryPromptText()}
`;
  }

  // 6. KAJIAN KHUSUS TAU SAMAWA / PULAU SUMBAWA SECARA UMUM
  if (
    lower.includes('sumbawa') || 
    lower.includes('samawa') || 
    lower.includes('taliwang') || 
    lower.includes('seteluk') || 
    lower.includes('alas') || 
    lower.includes('moyo') || 
    lower.includes('lunyuk') || 
    lower.includes('plampang') || 
    lower.includes('ksb') ||
    lower.includes('lala buntar')
  ) {
    return `
ARSIP HISTORIS & KEBUDAYAAN TANO SAMAWA (PULAU SUMBAWA):
- Identitas & Wilayah: Tau Samawa (orang Sumbawa) di Tano Samawa (Kabupaten Sumbawa dan Sumbawa Barat / KSB). Pulau Sumbawa adalah bumi pertemuan harmonis antara Tau Samawa, Dou Mbojo, diaspora maritim Bugis, serta suku Sasak dan Bajo.
- Falsafah Luhur Utama:
  * "Sabalong Samalewa": Falsafah hidup membangun tatanan lahir dan batin secara serasi, seimbang, damai, dan berkelanjutan.
  * "Mana tau manin tau": Pandangan kemanusiaan universal bahwa siapa pun manusianya, semua adalah saudara yang setara martabatnya.
- Kosakata & Ungkapan Terkenal Samawa yang Wajib Disisipkan Sesekali:
  * "Kalingka" / "Kalingka mo": Mari / ayo bersama-sama.
  * Partikel penegas khas: "mo" dan "na" (contoh: "Kalingka mo!", "Iya mo...", "Nan siq mo").
  * "Pina siq": Jadikanlah demikian / begitulah hendaknya.
  * "Lamen": Jika / jikalau / apabila.
  * "Bale": Rumah panggung adat kayu.
  * "Tano": Tanah tumpah darah.
  * "Poto": Ujung / puncak daratan.
  * "Lala": Panggilan kehormatan gadis/putri manis berparas rupawan (seperti legenda Lala Buntar).
  * "Sangkep": Musyawarah adat / rembuk mufakat para tetua.
  * "Kre Alang": Kain songket tenun motif sulaman benang emas khas Sumbawa.

${getSumbawaGlossaryPromptText()}
`;
  }

  // DEFAULT UNIVERSAL KNOWLEDGE PRIMING (UNTUK TOPIK RANDOM APAPUN):
  return `
PEDOMAN RISET FAKTA MULTI-DISIPLIN (SUMBER ILMU VALID & EDUKATIF):
- Lakukan riset fakta objektif dan ilmiah sesuai bidang topik (Sains, Misteri, Hewan/Biologi, Luar Angkasa, Psikologi, Teknologi, Sejarah Populer, Trivia Unik, Pop Culture, dll).
- Gali data konkret, bukti nyata, mekanisme kerja (bagaimana/kenapa terjadi), angka, nama peneliti/tokoh terkait, atau kronologi yang sesungguhnya.
- Tegaskan perbedaan antara MITOS/ASUMSI SALAH yang beredar di masyarakat dengan FAKTA SEBENARNYA yang terverifikasi (mind-blowing insights).
- JANGAN memaksakan konteks kedaerahan (seperti suku, toponimi lokal Nusantara) KECUALI jika topik memang secara spesifik menanyakan daerah tersebut.
- Setiap scene harus menyajikan fakta berbobot yang membuka wawasan penonton sebagai "Sumber Ilmu".
`;
}

// Alias for backward compatibility
export const getHistoricalKnowledgeContext = getTopicDomainKnowledge;

// Helper to send Gemini request with automatic fallback (Local Proxy -> Direct Google API)
export async function sendGeminiRequest(modelId, apiKey, payload) {
  const localProxyUrl = `/api/gemini?model=${modelId}&key=${apiKey}`;
  const directGoogleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

  let response;
  try {
    response = await fetch(localProxyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok && response.status === 404) {
      response = await fetch(directGoogleUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    }
  } catch (_) {
    response = await fetch(directGoogleUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  return response;
}

// Test API Key Connection
export async function testGeminiApiKey(apiKey, modelId = DEFAULT_MODEL) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('API Key tidak boleh kosong.');
  }

  const payload = {
    contents: [
      {
        parts: [{ text: 'Halo! Uji koneksi API Gemini untuk TikTok Co-Pilot.' }]
      }
    ],
    generationConfig: {
      maxOutputTokens: 20
    }
  };

  const response = await sendGeminiRequest(modelId, apiKey.trim(), payload);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'OK';
  return { success: true, message: 'Koneksi ke Google Gemini API Berhasil!', text };
}

// ============================================================================
// TAHAP 1: AGEN RISET FAKTA SEJARAH (NOTEBOOKLM FACT RESEARCHER ENGINE)
// Meneliti data arsip primer, toponimi asli, demografi suku riil & anti-hoaks
// ============================================================================
export async function researchFactsWithNotebookLMAgent({
  topic,
  apiKey = null,
  modelId = null
}) {
  const activeKey = apiKey || getStoredApiKey();
  if (!activeKey) {
    throw new Error('API Key Gemini belum disetel.');
  }

  let activeModel = modelId || getStoredModel();
  const domainContext = getTopicDomainKnowledge(topic);

  const systemInstruction = `Kamu adalah Agen Peneliti Fakta Universal & Fact-Checker Kredibel (NotebookLM Deep Research Engine) yang berstandar riset tinggi.
Tugas utamamu adalah melakukan riset mendalam, mengumpulkan data valid, membongkar mitos/hoaks, dan menyusun DOSSIER FAKTA GROUND TRUTH yang 100% VALID dan TERPERCAYA untuk topik: "${topic}".

PANDUAN RISET UNIVERSAL (ADAPTIF UNTUK TOPIK APAPUN):
Topik pengguna bisa sangat beragam dan acak (random). Identifikasi domain topik secara cerdas dan gali fakta yang relevan:
- SAINS, ASTRONOMI & FISIKA: Jelaskan hukum alam, fenomena kuantum/kosmik, data observasi nyata (NASA/ESA/CERN), angka/skala riil.
- HEWAN, BIOLOGI & ALAM: Jelaskan fakta biologis, sistem saraf/refleks, insting alami, penjelasan ilmiah dokter hewan/biolog, dan tingkah laku unik.
- MISTERI DUNIA, TEORI KONSPIRASI & KRIMINAL: Ulas kronologi peristiwa, bukti forensik/dokumen nyata, fakta ilmiah vs mitos/hoaks populer yang keliru.
- TEKNOLOGI & MASA DEPAN: Jelaskan cara kerja mekanis/algoritma, inovasi kunci, siapa perintisnya, dan dampaknya.
- PSIKOLOGI & OTAK MANUSIA: Jelaskan mekanisme kognitif, hormon/neurotransmitter, efek psikologis nyata (seperti Mandela Effect, Deja Vu, mimpi).
- SEJARAH / BUDAYA SPESIFIK: HANYA jika topik menyebut daerah atau sejarah tertentu, cantumkan fakta sejarah dan demografi yang benar (misal: Suku Bugis di Teluk Santong, Suku Bajo di Poto Tano). Untuk topik umum lainnya, jangan paksakan unsur daerah!
- FAKTA UNIK & MIND-BLOWING TRIVIA: Sajikan fakta mencengangkan yang jarang diketahui publik, sudut pandang baru yang membuka wawasan.

${domainContext}

FORMAT OUTPUT WAJIB BERUPA DOSSIER FAKTA BERSIH (MARKDOWN):
# 📚 DOSSIER FAKTA RISET (NOTEBOOKLM GROUND TRUTH): "${topic}"
## 1. Inti Fenomena / Pengantar Fakta Utama
## 2. Bukti Faktual, Data Ilmiah & Fakta Keras (Anti-Hoaks)
## 3. Mekanisme Kerja, Alasan Ilmiah, atau Garis Waktu Kronologis
## 4. Mitos Populer vs Kenyataan Sebenarnya (Mind-Blowing Truths)
## 5. Ringkasan Poin Kunci Edukasi untuk Naskah Video TikTok (Alur Bertahap)`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Lakukan riset fakta mendalam dan susun Dossier Fakta Ground Truth yang valid, ilmiah, dan mencerdaskan untuk topik: "${topic}". Pastikan data akurat, objektif, dan bebas hoax.`
          }
        ]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.3
    }
  };

  let response = await sendGeminiRequest(activeModel, activeKey, payload);

  if (!response.ok && (response.status === 503 || response.status === 404)) {
    const fallbackList = ['gemini-3.5-flash', 'gemini-3.5-flash-lite'];
    for (const fbModel of fallbackList) {
      if (fbModel !== activeModel) {
        response = await sendGeminiRequest(fbModel, activeKey, payload);
        if (response.ok) {
          activeModel = fbModel;
          break;
        }
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  const resultData = await response.json();
  const rawText = resultData.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Agen Peneliti tidak mengembalikan hasil riset.');
  }

  return rawText.trim();
}

// ============================================================================
// HELPER: ROBUST JSON REPAIR & PARSER FOR LLM OUTPUTS
// Mengatasi unescaped quotes, literal newlines di string, trailing comma,
// dan pemotongan token dengan 4 lapisan pengamanan bertingkat
// ============================================================================
function repairStringLiterals(jsonStr) {
  let inString = false;
  let isEscaped = false;
  let result = '';

  for (let i = 0; i < jsonStr.length; i++) {
    const ch = jsonStr[i];

    if (inString) {
      if (isEscaped) {
        result += ch;
        isEscaped = false;
      } else if (ch === '\\') {
        result += ch;
        isEscaped = true;
      } else if (ch === '"') {
        // Cek apakah kutip ini penutup string atau kutip bicara di dalam teks
        const nextSlice = jsonStr.slice(i + 1, i + 35);
        const matchValidFollower = /^\s*([,}\]:])/.test(nextSlice);
        
        if (matchValidFollower) {
          inString = false;
          result += '"';
        } else {
          // Kutip tak-terescape di dalam teks -> ubah jadi escaped quote
          result += "\\\"";
        }
      } else if (ch === '\n') {
        result += '\\n';
      } else if (ch === '\r') {
        // abaikan carriage return
      } else if (ch === '\t') {
        result += '\\t';
      } else {
        result += ch;
      }
    } else {
      if (ch === '"') {
        inString = true;
        result += '"';
      } else {
        result += ch;
      }
    }
  }

  return result;
}

function autoCloseJson(str) {
  let trimmed = str.trim().replace(/,\s*$/, '');
  let inString = false;
  let isEscaped = false;
  const stack = [];

  for (let i = 0; i < trimmed.length; i++) {
    const ch = trimmed[i];
    if (inString) {
      if (isEscaped) {
        isEscaped = false;
      } else if (ch === '\\') {
        isEscaped = true;
      } else if (ch === '"') {
        inString = false;
      }
    } else {
      if (ch === '"') {
        inString = true;
      } else if (ch === '{') {
        stack.push('}');
      } else if (ch === '[') {
        stack.push(']');
      } else if (ch === '}' || ch === ']') {
        if (stack.length > 0 && stack[stack.length - 1] === ch) {
          stack.pop();
        }
      }
    }
  }

  if (inString) {
    trimmed += '"';
  }

  // Buang properti atau entri yang terputus di ujung string
  trimmed = trimmed.replace(/,\s*"[^"]*"\s*:\s*"?$/, '');
  trimmed = trimmed.replace(/,\s*$/, '');

  while (stack.length > 0) {
    trimmed += stack.pop();
  }

  return trimmed;
}

function extractScenesWithRegex(text) {
  const scenes = [];
  const idRegex = /"id"\s*:\s*(\d+)/g;
  let match;
  const indices = [];
  while ((match = idRegex.exec(text)) !== null) {
    indices.push({ id: parseInt(match[1], 10), index: match.index });
  }

  for (let i = 0; i < indices.length; i++) {
    const start = indices[i].index;
    const end = i < indices.length - 1 ? indices[i + 1].index : text.length;
    const chunk = text.slice(start, end);

    const getField = (fieldName, defaultValue = '') => {
      const reg = new RegExp(`"${fieldName}"\\s*:\\s*"([^"\\\\]*(?:\\\\.[^"\\\\]*)*)"`, 'i');
      const m = chunk.match(reg);
      if (m && m[1]) {
        return m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
      }
      const relaxed = new RegExp(`"${fieldName}"\\s*:\\s*"([\\s\\S]*?)(?="\\s*,\\s*"|\\n\\s*"|}$)`, 'i');
      const rm = chunk.match(relaxed);
      return rm && rm[1] ? rm[1].trim() : defaultValue;
    };

    const sceneId = indices[i].id;
    scenes.push({
      id: sceneId,
      stage: getField('stage', `Scene ${sceneId}`),
      stageColor: getField('stageColor', 'border-rose-500 text-rose-400 bg-rose-500/10'),
      title: getField('title', `Scene ${sceneId}`),
      narration: getField('narration', ''),
      sumberIlmu: getField('sumberIlmu', ''),
      voiceGuide: getField('voiceGuide', '🎙️ Intonasi narator bahasa Indonesia'),
      visual: getField('visual', ''),
      imagePrompt: getField('imagePrompt', ''),
      motionPrompt: getField('motionPrompt', ''),
      emotion: getField('emotion', 'Menarik'),
      captionText: getField('captionText', ''),
      duration: 10
    });
  }

  return scenes;
}

export function safeParseGeminiJson(rawText) {
  if (!rawText || typeof rawText !== 'string') {
    throw new Error('Output Gemini kosong.');
  }

  let cleaned = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  const firstBrace = cleaned.indexOf('{');
  const firstBracket = cleaned.indexOf('[');
  let startIdx = 0;
  if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
    startIdx = firstBrace;
  } else if (firstBracket !== -1) {
    startIdx = firstBracket;
  }
  if (startIdx > 0) {
    cleaned = cleaned.slice(startIdx);
  }

  // Lapisan 1: Direct JSON.parse
  try {
    return JSON.parse(cleaned);
  } catch (e) {}

  // Lapisan 2: Perbaiki literal strings (newlines, tabs & unescaped quotes)
  let repaired = repairStringLiterals(cleaned);
  repaired = repaired.replace(/,\s*([}\]])/g, '$1');

  try {
    return JSON.parse(repaired);
  } catch (e) {}

  // Lapisan 3: Auto-close jika JSON terputus di ujung token
  const autoClosed = autoCloseJson(repaired);
  try {
    return JSON.parse(autoClosed);
  } catch (e) {}

  // Lapisan 4: Ekstraksi regex per-scene objek jika struktur rusak
  const extracted = extractScenesWithRegex(rawText);
  if (extracted.length > 0) {
    return { scenes: extracted };
  }

  throw new Error('Format output Gemini bukan JSON yang valid. Silakan coba generate ulang.');
}

// ============================================================================
// TAHAP 2: AGEN PENYUSUN NASKAH CERITA (GEMINI SCENE DIRECTOR)
// Mengambil dokumen riset fakta sebagai Ground Truth mutlak untuk TOPIK APAPUN
// ============================================================================
export async function generateStoryWithGemini({
  topic,
  sceneCount = 10,
  isAutoCount = false,
  visualStyle = 'claymation',
  visualStyleObj = null,
  sourceNotes = '',
  apiKey = null,
  modelId = null
}) {
  const activeKey = apiKey || getStoredApiKey();
  if (!activeKey) {
    throw new Error('API Key Gemini belum disetel. Silakan masukkan Gemini API Key Anda.');
  }

  let activeModel = modelId || getStoredModel();
  const styleTag = visualStyleObj ? visualStyleObj.tag : 'Tactile handcrafted claymation, cinematic stop motion';
  const styleName = visualStyleObj ? visualStyleObj.name : 'Claymation';

  const domainContext = getTopicDomainKnowledge(topic);
  const hasSourceDoc = !!(sourceNotes && sourceNotes.trim());

  const effectiveIsAuto = isAutoCount || sceneCount === 'auto';
  const targetCountNum = typeof sceneCount === 'number' ? sceneCount : 10;

  const countInstruction = effectiveIsAuto
    ? `
ATURAN JUMLAH SCENE FLEKSIBEL (MODE OTOMATIS CERDAS: MINIMAL 10 SCENE, MAKSIMAL 20 SCENE):
1. Tentukan sendiri jumlah scene yang PALING TEPAT (antara 10 sampai 20 scene) berdasarkan KEPADATAN INFORMASI, KELENGKAPAN FAKTA, dan PANJANGNYA CERITA:
   - MINIMAL 10 SCENE (WAJIB): DILARANG membuat kurang dari 10 scene! Setiap video edukasi harus memiliki pendalaman materi dan alur yang matang minimal 10 scene.
   - JIKA CERITA / DOKUMEN FAKTA PANJANG, memiliki banyak fase peristiwa bersejarah, kronologi penting, atau data ilmiah mendalam:
     -> BUATLAH BANYAK SCENE (antara 12 sampai 20 scene)! JANGAN MEMANGKAS CERITA! Pastikan SEMUA INFORMASI PENTING DAN HAL MENARIK TERCAKUP LENGKAP tanpa ada yang terbuang.
   - JIKA TOPIKNYA RINGKAS atau fokus pada satu fenomena/trivia singkat:
     -> Gunakan batas minimal yaitu 10 scene (atau 10–12 scene) agar tetap padat, lengkap, dan tidak bertele-tele.
2. JANGAN membuat kurang dari 10 scene dan JANGAN melebihi 20 scene. Rentang yang diizinkan pengguna adalah TEPAT antara 10 hingga 20 scene. Biarkan kedalaman informasi yang menentukan berapa jumlah pastinya di dalam rentang 10–20 ini!
3. Susun array "scenes" dengan jumlah scene sesuai keputusan terbaikmu tersebut (minimal 10 scene, maksimal 20 scene).`
    : `
JUMLAH SCENE MANUAL DARI PENGGUNA (RENTANG 10 - 20 SCENE):
1. Buatlah TEPAT ${targetCountNum} scene sesuai permintaan manual pengguna (antara 10 sampai 20 scene).
2. Susun array "scenes" dengan tepat ${targetCountNum} elemen.`;

  const systemInstruction = `Kamu adalah Sutradara Konten Edukasi & Storyteller TikTok Profesional Kelas Dunia (Bekerja dengan metodologi Grounding NotebookLM + Gemini AI).
Tugas utamamu adalah merancang naskah video edukasi TikTok berdasarkan topik: "${topic}".

${countInstruction}

KONTEN INI ADALAH SUMBER ILMU PENGETAHUAN PUBLIK:
Naskah ini akan menjadi tontonan edukatif yang mencerahkan ribuan pemirsa di TikTok. Sajikan fakta yang 100% valid, cerdas, bebas hoaks, namun dikemas sangat seru, memikat, dan memiliki retensi tinggi khas video pendek FYP.

${domainContext}

${hasSourceDoc ? `
===================================================================
📚 DOKUMEN SUMBER UTAMA (NOTEBOOKLM GROUND TRUTH):
"""
${sourceNotes.trim()}
"""
===================================================================

INSTRUKSI KHUSUS GROUNDING DOKUMEN:
1. DOKUMEN DI ATAS ADALAH GROUND TRUTH (SUMBER KEBENARAN MUTLAK).
2. Naskah scene yang kamu susun WAJIB BERLANDASKAN LANGSUNG pada fakta, data, mekanisme, atau alur yang ada di dalam Dokumen Sumber di atas.
3. DILARANG KERAS BERHALUSINASI atau mengarang cerita fiktif di luar dokumen sumber ini.
4. Pada properti "sumberIlmu" di setiap scene, cantumkan rujukan spesifik / kutipan fakta dari Dokumen Sumber tersebut.
` : `
INSTRUKSI AUTO-GROUNDING (RISET FAKTA OTOMATIS):
1. Karena tidak ada dokumen sumber eksternal, gunakan basis data pengetahuan faktual terbaikmu secara objektif.
2. Pastikan fakta ilmiah, kronologi, dan penjelasan teknis akurat bebas hoaks sesuai domain topik.
3. Setiap scene wajib mencantumkan bukti faktual di properti "sumberIlmu".
`}

PEDOMAN PENYUSUNAN NASKAH TIKTOK EDUKATIF:
1. STRUKTUR ALUR STORYTELLING ADIKTIF:
   - Scene 1 (Hook Pemantik): Buka dengan pertanyaan pemantik rasa ingin tahu yang kuat (Curiosity Gap) atau fakta mencengangkan yang meruntuhkan asumsi umum.
   - Scene 2 sampai Scene Terakhir - 1 (Eksplorasi Bertahap): Kupas fakta kunci, data mengejutkan, analogi visual yang mudah dimengerti, dan mekanisme di balik fenomena (progresif tanpa pengulangan ide).
   - Scene Terakhir (Climax & Key Takeaway): Berikan kesimpulan berbobot atau pesan edukasi mendalam yang membuat penonton merasa lebih berpengetahuan.
2. GAYA BAHASA, INTONASI & ATURAN RASIO BAHASA DAERAH (60% INDONESIA : 40% BAHASA DAERAH):
   - ATURAN RASIO BAHASA (60% BAHASA INDONESIA : 40% BAHASA DAERAH/LOKAL):
     Pada video bertopik Pulau Sumbawa atau mengenai suku-suku terkait (Samawa, Mbojo/Bima, Bugis, Sasak):
     * ~60% Bahasa Indonesia: Menjadi kerangka narasi utama, penyampai fakta ilmiah/sejarah, dan penghubung alur agar cerita tetap jelas dipahami oleh pemirsa nasional di TikTok/Reels.
     * ~40% Bahasa Daerah/Lokal: Porsi bahasa daerah kini lebih kental, mendalam, dan mendominasi kalimat secara harmonis (kosakata benda, kata kerja, kata ganti, sapaan, seruan, dan falsafah) di seluruh adegan.
   
   - ATURAN WAJIB STRUKTUR 3 TITIK (PEMBUKA, TENGAH, DAN PENUTUP):
     Setiap video WAJIB memiliki bahasa daerah di 3 fase krusial ini:
     
     1. TITIK PEMBUKA (Scene 1 & Scene 2 / Hook Awal):
        - WAJIB menyisipkan sapaan, ajakan, atau seruan pembuka khas bahasa daerah untuk memikat penonton sejak detik pertama.
        - Contoh Samawa: "Melok rungan sarea! Kalingka mo, lamen kita buka lembaran kuno Tano Samawa, ada rahasia besar yang tersembunyi..."
        - Contoh Bugis: "Tabe' puang eja! Dengarlah debur ombak pesisir maritim ini, tempat para pelaut Passompe mengukir sejarah..."
        - Contoh Mbojo: "Mada londo ba Dana Mbojo! Tahukah kamu bahwa tanah Bima dan Dompu menyimpan fakta mencengangkan..."
        - Contoh Sasak: "Ape arak batur sami! Silaq pelungguh simak baik-baik rahasia besar di Selat Alas ini..."

     2. TITIK TENGAH-TENGAH (Scene 3 sampai Scene N-1 / Eksplorasi, Dialog, Peristiwa & Nilai Budaya):
        - WAJIB menyisipkan istilah budaya, petuah tetua, seruan dialog, atau falsafah hidup di scene-scene tengah secara berkala (~40% porsi kata dalam kalimat).
        - Contoh Samawa: "Nan siq mo! Tetua loka di atas bale panggung mengingatkan: 'Mana tau manin tau'—sarea tawu adalah saudara setara...", "Pina siq, lamen ada ujian menghadang, jaga tatanan tana deta agar tetap selaras!"
        - Contoh Bugis: "Pegang teguh 'Siri' na Pacce' dan 'Taro Ada Taro Gau'—pantang sekali surut langkah saat membentang layar sompe'!", "Kurru sumange! Tegakkan kehormatan di tanah perantauan..."
        - Contoh Mbojo: "Bagi Dou Mbojo, 'Nggahi Rawi Pahu' dan 'Maja Labo Dahu' adalah pedoman hidup mutlak saat berdiri di samping Uma Lengge...", "Wati boleh kita mengingkari janji luhur para tetua!"
        - Contoh Sasak: "Semua batur saling bahu-membahu dengan teguh memegang prinsip 'Tindih' demi merawat hidup yang 'Solah'..."

     3. TITIK PENUTUP (Scene Terakhir / Climax, Kesimpulan & Call To Action / CTA):
        - WAJIB menutup narasi dengan falsafah puncak daerah, ucapan terima kasih/doa berkah lokal, dan ajakan interaksi penonton (CTA) yang ramah.
        - Contoh Samawa: "Inilah keagungan Sabalong Samalewa yang abadi. Kalingka mo sarea lestarikan bersama! Tulis pendapatmu di kolom komentar dan bagikan kisah ini ya!"
        - Contoh Bugis: "Kurru sumange! Jagalah marwah persaudaraan ini. Tabe', mari follow dan share kisah kebanggaan Nusantara ini!"
        - Contoh Mbojo: "Pegang erat petuah luhur leluhur Dana Mbojo: Nggahi Rawi Pahu! Mada pamit, tabee kone! Jangan lupa komen dan follow untuk sejarah berikutnya!"
        - Contoh Sasak: "Matur tampiasih pelungguh batur sami! Rawat terus budaya solah ini bersama-sama. Silaq tap follow sekarang!"

   - BANK KOSAKATA & FALSAFAH SUKU (GUNAKAN SECARA CERDAS & NATURAL):
     a. SUKU SAMAWA (Tau Samawa / Sumbawa Barat & Sumbawa Besar / Tano Samawa):
        * Falsafah: "Sabalong Samalewa" (membangun seimbang & harmonis lahir-batin), "Mana tau manin tau" (semua manusia bersaudara setara).
        * Seruan & Partikel: "Kalingka" / "Kalingka mo" (mari / ayo), partikel penegas khas "mo" dan "na" (contoh: "Kalingka mo!", "Iya mo...", "Nan siq mo").
        * Kosakata Kunci Kamus Sumbawa Terverifikasi (Gunakan kosakata ini untuk menyusun ~40% narasi):
          - Sapaan & Tanya: "melok rungan" (apa kabar? — hook pembuka), "pida" (berapa?), "pidan" (kapan?), "me pang" (di mana?), "sai" (siapa?).
          - Tokoh & Kekerabatan (Pronouns): "aku / kaji" (saya), "sia" (kamu / anda santun), "kelam" (engkau), "nene" (anda terhormat), "sarea" (kita/semua), "tawu / tau" (orang/manusia), "tode" (anak), "sawai" (wanita), "salaki" (pria), "ina" (ibu), "bapak" (ayah), "loka" (tetua/orang tua).
          - Alam & Fauna: "olat" (gunung/bukit — misal Olat Maras), "jaran" (kuda — ikon budaya & pacuan jaran Sumbawa), "asu" (anjing), "tana" (bumi/tanah), "let" (laut), "tiu" (danau), "ai' / ai jerning" (air), "geresek" (pasir), "bale" (rumah panggung), "pongo" (atap), "ola" (jalan/jalur), "bintang", "bulan".
          - Posisi & Arah: "pang" (di), "pang atas" (di atas), "pang bawa" (di bawah), "pang dalam" (di dalam), "parak" (dekat), "doo" (jauh).
          - Tindakan: "alo" (pergi), "kakan / mangan / bekake" (makan), "tokal" (duduk), "tunu / tunong" (tidur), "belangan" (berjalan), "beling" (berkata/bicara), "ingo" (melihat), "menong" (mendengar), "sandro" (tahu/mengetahui), "manang" (berdiri), "telas" (hidup), "mate" (mati).
          - Sifat & Evaluasi: "balong" / "gera" (baik/elok), "lenge" / "kerapu" (buruk/jahat), "rea" (luas), "rango" (besar), "ode" (kecil), "bakela" (hangat), "dingin", "tutu-tutu" (benar-benar), "tingka" (jika), "teres" (dan), "deta" (ini).
          - Bilangan: "sakodeng/sopo" (1), "dua" (2), "telu" (3), "empat" (4), "lima" (5), "pitu" (7), "balu" (8), "sepuluh" (10), "serates" (100), "seribu" (1000).

     b. SUKU MBOJO (Dou Mbojo / Bima & Dompu / Dana Mbojo di Sumbawa bagian timur):
        * Falsafah: "Nggahi Rawi Pahu" (satunya perkataan dengan perbuatan / jujur memegang amanah), "Maja Labo Dahu" (rasa malu dan takut berbuat cela/aib/dosa).
        * Kosakata & Sapaan: "Mada" (saya / hamba santun), "Ita" (kamu / Anda yang dihormati), "Wati" (bukan / tidak), "Londo" (datang / silsilah), seruan "Kone" (aduhai / wah), tradisi berbusana "Rimpu Cili", kain tenun "Tembe Nggoli", lumbung tradisional "Uma Lengge".

     c. SUKU BUGIS (Diaspora maritim pelaut tangguh di pesisir Pulau Sumbawa seperti Labuan Teluk Santong, Poto Tano, Alas, Labuhan Sumbawa, Bima):
        * Salam & Kehormatan: "Tabe'" (permisi / maaf santun penuh hormat), "Kurru Sumange" (peneguh jiwa dan berkah semangat).
        * Falsafah: "Siri' na Pacce" (menjaga harga diri dan rasa empati kepedulian kemanusiaan mendalam), "Taro Ada Taro Gau" (keselarasan kata dan perbuatan), "Mali Siparappe, Rebba Sipatokkong, Malilu Sipakainge" (hanyut saling mengait, rebah saling menegakkan, khilaf saling mengingatkan).
        * Sebutan & Sapaan: "Passompe" (pelaut penjelajah samudra / perantau tangguh), "Sompe'" (berlayar / membentang layar), sapaan akrab "Eja" (sahabat karib), "Daeng" / "Puang" (gelar kehormatan tetua/tokoh).
        * Kosakata Kunci Bugis Sumbawa Terverifikasi (Gunakan kosakata ini untuk menyusun ~40% narasi):
          - Sapaan & Kata Ganti (Pronouns): "iya'" (saya), "iko" (kamu/engkau), "alena" (dia), "tauero" (mereka), "yamaneng" (semua), "tau" (orang), "ambe'" (ayah), "indo'" (ibu), "ana'" (anak), "anadara" (gadis remaja), "annaburane" (pemuda), "datu" (pemimpin/raja), "sandro" (tetua/tabib).
          - Keterangan Waktu & Kata Tugas: "kukkedi" (sekarang), "dibajae" (lusa), "wenni" (malam), "ele'" (pagi), "esso'" (siang/hari), "nasaba / apa'" (karena/sebab), "dena / dena'" (tidak), "degaga" (tidak ada), "engka" (ada), "aja" (jangan), "elo" (mau), "lao" (pergi), "deppa" (belum), "mupi" (masih), "pura" (sudah/sesudah).
          - Bahari & Alam (Nouns): "bombang" (ombak laut), "tasi'" (laut), "salo'" (sungai), "tappareng" (danau), "bulu'" (gunung), "ale'" (hutan), "lopi" (perahu kayu nelayan), "sampang" (sampan), "sompe'" (layar perahu), "bise" (dayung), "jala" (jala ikan), "uwae" (air), "kessi'" (pasir), "mataesso" (matahari), "wuleng" (bulan), "bittara" (bintang), "bola" (rumah panggung), "alliri" (tiang panggung), "lipa" (sarung tenun).
          - Tindakan Kunci (Verbs): "mabbise" (mendayung mengarungi ombak), "mandre" (makan), "inung" (minum), "tindro" (tidur), "tudang" (duduk), "ita'" (melihat), "pole" (datang/tiba), "tuo" (hidup), "mate" (mati), "inggerrang" (mengingat), "takkalupa" (lupa), "tetteri" (menangis), "mattenung" (menenun), "maddare" (berladang).
          - Sifat & Karakter (Adjectives): "malessi" (kuat, tangguh), "mabarani / barani" (pemberani), "makesing" (bagus, indah), "malempu'" (lurus, jujur, setia), "masiri" (menjaga martabat/harga diri), "maloang" (luas), "mabela" (jauh), "maega" (banyak), "maiccu" (kecil), "teneng" (benar), "sala" (salah).
          - Pola Frasa Contoh: "Tabe' puang eja! Kukkedi debur bombang di tasi' Teluk Saleh menjadi saksi...", "Di atas lopi kayu, para passompe mabbise dengan jiwa malessi!", "Kurru sumange! Tegakkan kehormatan Siri' na Pacce yamaneng!"

     d. SUKU SASAK (Komunitas Sasak di Sumbawa / diaspora Lombok & perlintasan Selat Alas):
        * Sapaan Kekerabatan & Gelar: "pelungguh / pelinggih" (Anda / saudara yang dimuliakan), "batur" (kawan / sahabat), "tiang" (saya santun), "side" (kamu), "ite" (kita), "dengan" (orang/sesama), "amaq" (ayah), "inaq" (ibu), "papuq / ninik" (kakek/nenek), "lalu" (bangsawan pria), "baiq" (bangsawan wanita), "dende" (putri).
        * Waktu & Penghubung Narasi: "nani" (sekarang), "laeq" (dulu / masa lampau), "baruq" (tadi), "barèh / laun" (nanti), "laguq" (tetapi / hanya saja), "sengaq / lantaran" (sebab, karena), "amun / lamun" (jika, kalau), "araq" (ada), "ndeq" (tidak).
        * Alam & Tempat: "tanaq" (tanah), "montong" (bukit), "kokoh" (sungai), "gawah" (hutan), "aiq" (air), "bale / gedeng" (rumah), "lawang" (pintu).
        * Aktivitas Kunci: "nyari / boyaq" (mencari), "nulung" (menolong/membantu), "mecunduk / bedait" (bertemu), "lampaq" (berjalan), "tokol / melungguh" (duduk), "mangan / dahar / medahar" (makan), "tame / ngeranjing" (masuk), "taèk / munggah" (naik), "olèk / mantuk" (pulang), "dateng / rauh" (datang), "nyedi / lumbar" (pergi), "dengah" (mendengar), "muni / puniq" (bicara), "nangis / besermin" (menangis), "anteh / antos" (menunggu).
        * Sifat & Falsafah: "solah" (elok, indah, penuh kebaikan), "tindih" (integritas luhur, keteguhan moral & harga diri), "padu" (kuat, kokoh), "becat" (cepat), "cemoh" (senang), "aseq / duke" (sedih), "gati" (sangat), "loeq" (banyak), "sekediq" (sedikit).
        * Ungkapan Populer: "Ape arak batur sami!" (hook sapaan pembuka), "Solah idap ate angen tiang bedait dait pelungguh" (senang bertemu dengan Anda), "Anteh ke semendaq" (tunggu sebentar), "Ndaq abot" (jangan malas), "Ndeq kembe-kembe" (tidak apa-apa), "Onyaq-onyaq" (hati-hati), "Matur tampiasih" (terima kasih banyak).
3. PROPERTI "sumberIlmu" DI SETIAP SCENE:
   - Tulis 1-2 kalimat ringkasan data ilmiah, jurnal, fakta empiris, atau sumber terpercaya yang mendasari scene tersebut.

4. ATURAN WAJIB KARAKTER LUCU, IMUT & MENGGEMASKAN SESUAI GAYA VISUAL (${styleName}) + LATAR OTENTIK INDONESIA:
   A. TEMPAT, LOKASI & LATAR (WAJIB 100% OTENTIK INDONESIA):
      - Seluruh tempat, lanskap alam, geografi, arsitektur bangunan, dan atmosfer cerita WAJIB BERDASARKAN DAN BERAKAR KUAT DI INDONESIA (Nusantara).
      - Setting visual harus menampilkan keindahan nyata Indonesia: pesisir pantai tropis Nusantara, perahu jukung tradisional / kapal pinisi kayu, rumah panggung kayu adat (Bale Samawa, Rumah Gadang, Joglo, Tongkonan, Rumah Bolon), laut Selat Alas / Teluk Saleh, Danau Toba, sawah terasering berundak, padang savana Sumbawa, hutan tropis Nusantara, atau pemandangan gunung berapi Indonesia yang megah.
      - Pakaian & Aksesori: Karakter mengenakan busana/kain tradisional khas Indonesia (tenun ikat, songket Kre Alang berbenang emas, batik Nusantara, rimpu, kebaya tradisional, atau pakaian kasual tropis Indonesia yang modis dan rapi).
      - DILARANG memindahkan latar cerita ke luar negeri. Tempat, lokasi, dan alam HARUS 100% ASLI INDONESIA!

   B. DESAIN KARAKTER: WAJIB SANGAT LUCU, IMUT, DAN MENGGEMASKAN (CUTE & ADORABLE) SESUAI GAYA VISUAL "${styleName}":
      - Figur karakter manusianya WAJIB didesain sangat lucu, imut, menggemaskan, manis, dan ekspresif (lovable, super cute, adorable, highly expressive) sesuai dengan DNA gaya visual "${styleName}" (${styleTag}):
      * JIKA GAYA "3D Animation":
        Karakter berwujud animasi 3D bergaya film animasi layar lebar yang super imut dan menggemaskan (adorable stylized 3D feature animation character design, big luminous sparkling expressive eyes full of wonder, cute rounded rosy cheeks, sweet heartwarming smile, soft subsurface scattering skin, delightful stylized proportions, vibrant cinematic animated film lighting).
      * JIKA GAYA "Claymation (Stop-Motion)":
        Karakter berwujud boneka lempung plastisin buatan tangan yang sangat lucu dan menggemaskan (adorable handcrafted clay figurine, chubby rounded cheeks, expressive cute sculpted eyes, tiny button nose, cheerful innocent smile, tactile plasticine clay marks, charming stop-motion movie proportions).
      * JIKA GAYA "Anime Watercolor Style":
        Karakter berwujud anime cat air tradisional yang sangat imut, manis, dan berhati hangat (adorable Japanese watercolor anime character design, large emotional sparkling eyes, sweet gentle rosy blush, wholesome heartwarming smile, innocent lovable charm).
      * JIKA GAYA "Cinematic Hyperrealistic":
        Karakter berparas ramah, manis, hangat, dan menggemaskan (charming, sweet, and lovable character with bright expressive eyes, natural warm engaging smile, approachable delightful personality).
      * JIKA GAYA "Dark Nusantara Folklore":
        Karakter dongeng Nusantara yang manis, magis, dan menggemaskan (cute and endearing stylized mythical folklore character, expressive luminous eyes, lovable courageous expression, ornate batik elements).

   C. ATURAN ANTI-BLOCK FILTER HAK CIPTA PIHAK KETIGA (100% LOLOS MODERASI):
      - DILARANG menggunakan nama studio/merek berhak cipta (DILARANG menulis kata "Pixar", "Disney", "Studio Ghibli", "Ghibli", "DreamWorks", "Marvel") di dalam imagePrompt maupun motionPrompt!
      - Filter hak cipta AI pihak ketiga (Kling, Luma, Runway, Sora, Google Flow) memblokir prompt yang mengandung nama merek studio dengan pesan "adanya kepentingan dari penyedia konten pihak ketiga".
      - SELALU gunakan istilah generik berkualitas tinggi seperti: "adorable stylized 3D feature animation", "high-end 3D CGI movie render", "handcrafted stop-motion claymation", atau "Japanese watercolor anime".

   D. ATURAN WAJIB KARAKTER 100% ORISINAL & UNIK (NEVER-BEFORE-SEEN BESPOKE IP):
      - Karakter WAJIB merupakan desain karakter orisinal murni yang BENAR-BENAR BARU dan BELUM PERNAH ADA YANG MEMBUAT SEBELUMNYA.
      - DILARANG KERAS meniru, mengadaptasi, atau mengambil kemiripan wajah/proporsi dari karakter kartun, animasi, film, komik, atau tokoh milik orang lain/studio mana pun.
      - Setiap karakter harus memiliki identitas visual yang khas, unik, dan proprietary (bukan tiruan, bukan jiplakan).
      - Di prompt gambar (imagePrompt), WAJIB menyertakan: "100% original bespoke character design, completely unique never-before-seen original concept, one-of-a-kind distinctive facial features, proprietary original character IP, not based on any existing character or real person".

      * PRIA DEWASA / PEMUDA / LAKI-LAKI:
        Wajib berparas manis, tampan ramah, orisinal murni, dan menggemaskan (100% original bespoke character design, charming boyish appeal, warm engaging smile, bright sparkling eyes).
        Kata kunci wajib di prompt: "in an authentic Indonesian setting, [karakter] with 100% original bespoke character design, completely unique never-before-seen concept, super cute, charming, and endearing boyish appeal, warm engaging smile, bright expressive sparkling eyes, wearing authentic Indonesian attire [tenun ikat / batik / casual], in ${styleName} aesthetic (${styleTag})".
      * WANITA DEWASA / GADIS / PEREMPUAN:
        Wajib berparas manis, cantik jelita, orisinal murni, imut, dan menggemaskan (100% original bespoke character design, sweet, adorable, lovely charm, big expressive sparkling eyes, gentle rosy cheeks).
        Kata kunci wajib di prompt: "in an authentic Indonesian setting, [karakter] with 100% original bespoke character design, completely unique never-before-seen concept, super cute, sweet, and adorable lovely charm, large expressive luminous eyes, gentle rosy cheeks, delightful heartwarming smile, wearing authentic Indonesian woven silk / batik / kebaya, in ${styleName} aesthetic (${styleTag})".
      * ANAK-ANAK (ANAK LAKI-LAKI & ANAK PEREMPUAN):
        Wajib berparas SUPER IMUT, GEMOY, LUCU, DAN ORISINAL MURNI:
        - Anak Laki-laki: "100% original bespoke character design, completely unique never-before-seen concept, adorable and super cute young boy, chubby rosy cheeks, bright innocent sparkling eyes full of wonder, sweet cheerful smile, wearing traditional Indonesian attire, in ${styleName} aesthetic (${styleTag})".
        - Anak Perempuan: "100% original bespoke character design, completely unique never-before-seen concept, adorable and exceptionally sweet pretty young girl, cute rounded rosy cheeks, large luminous expressive eyes, sweet lovable smile, wearing traditional Indonesian attire, in ${styleName} aesthetic (${styleTag})".
      * KAKEK & NENEK / LANSIA / TETUA SEJARAH (ELDERLY):
        Tetap berpenampilan manis, hangat, bersahaja, berwibawa lembut, orisinal murni dan menggemaskan (Lovable & Heartwarming Grandfather/Grandmother):
        - Kakek / Pria Lansia: "100% original bespoke character appearance, unique never-before-seen facial design, lovable and heartwarming elderly grandfather figure, gentle smiling kindly eyes, warm grandfatherly warmth, well-groomed silver-gray hair, noble yet approachable presence, wearing traditional Indonesian attire, in an authentic Indonesian setting, in ${styleName} aesthetic (${styleTag})".
        - Nenek / Wanita Lansia: "100% original bespoke character appearance, unique never-before-seen facial design, lovable, sweet, and heartwarming elderly grandmother figure, gentle radiant smile, kind twinkling eyes, elegant silver hair, wearing traditional Indonesian tenun / batik, in an authentic Indonesian setting, in ${styleName} aesthetic (${styleTag})".

5. FORMAT WAJIB & ULTRA-DETAIL PROMPT GAMBAR (imagePrompt) - WAJIB RASIO 9:16 VERTICAL:
   - Wajib ditulis dalam Bahasa Inggris penuh, ultra-detail, dan memukau (format vertical portrait 9:16 untuk layar penuh smartphone / TikTok).
   - Wajib selalu diakhiri dengan klausul: "vertical 9:16 portrait format, smartphone mobile orientation --ar 9:16, 4K".
   - Pola standar sesuai gaya visual ${styleName}:
     * [Karakter 100% Orisinal & Lucu Menggemaskan]: Deskripsikan karakter orisinal murni yang belum pernah dibuat oleh siapa pun sebelumnya ("100% original bespoke character design, completely unique never-before-seen original concept, one-of-a-kind distinctive facial features, proprietary original character IP, not based on any existing character or real person") mengenakan busana tradisional/khas Indonesia (tenun ikat, batik, kebaya)!
     * [Latar & Lokasi Otentik Indonesia]: "Authentic Indonesian setting [spesifik: misal traditional Indonesian coastal stilt village / Sumbawa savannah / Lake Toba shoreline / ancient wooden palace veranda], vertical 9:16." (disesuaikan dengan gaya ${styleName}: ${styleTag}).
     * [Pencahayaan & Tekstur Gaya]: Sesuai ${styleName} (misal: "warm magical 3D cinematic animated film lighting, rich subsurface scattering" ATAU "warm tropical Indonesian cinematic studio lighting, realistic handmade plasticine texture, visible sculpting marks, macro photography, tilt-shift lens, shallow depth of field").
     * [Kualitas & Kebersihan]: "premium commercial animation quality, highly detailed, 4K, ultra-sharp focus, vertical 9:16 --ar 9:16".

6. FORMAT WAJIB PROMPT VIDEO (motionPrompt) - WAJIB RASIO 9:16, ADA NARASI & PENGISI SUARA KONSISTEN:
   - Di dalam motionPrompt, WAJIB mempertahankan format vertikal 9:16, narasi scene, dan profil pengisi suara yang konsisten (Same consistent Indonesian narrator voice across all scenes).
   - Format WAJIB bracket presisi studio (mempertahankan 9:16):
     "[Camera: Slow steady cinematic push-in at 0.3x speed, locked horizon] [Framing: Strict vertical 9:16 portrait ratio, smartphone screen orientation] [Subject: Original cute stylized character with unique distinct facial features blinks softly, smiles warmly with gentle natural hand gestures] [Environment: Gentle tropical breeze rustling traditional Indonesian woven fabric and leaves, soft natural lighting] [Voiceover: Same consistent Indonesian narrator voice ([intonasi singkat voiceGuide]): '[isi naskah narasi scene]'] [Motion: Smooth organic animation, zero morphing, high stability, vertical 9:16, 60fps]"
   - PENTING ANTI-ERROR JSON: Gunakan tanda petik tunggal (') untuk mengutip teks narasi di dalam nilai JSON agar tidak bentrok dengan tanda petik dua.
   - DILARANG memasukkan nama studio komersial ("Pixar", "Disney", "Ghibli") atau kata "no watermark, no text".

ATURAN STRUKTUR JSON SANGAT KETAT (ANTI-SYNTAX ERROR):
1. DILARANG menggunakan tanda petik dua ganda (") di dalam nilai teks (narration, visual, imagePrompt, motionPrompt). Jika ada dialog/istilah berpetik, SELALU gunakan tanda petik tunggal (').
2. Pada imagePrompt dan motionPrompt, WAJIB SELALU PERTAHANKAN RASIO VERTIKAL 9:16 (--ar 9:16).
3. Pada motionPrompt, selalu sertakan elemen [Voiceover: Same consistent Indonesian narrator voice: '...'] dengan teks narasi scene yang konsisten.
4. Dilarang ada trailing comma (koma di akhir array/objek).

OUTPUT WAJIB DALAM FORMAT JSON VALID:
{
  "scenes": [
    {
      "id": 1,
      "stage": "Hook Fakta",
      "stageColor": "border-rose-500 text-rose-400 bg-rose-500/10",
      "title": "Judul Singkat Scene",
      "narration": "Melok rungan sarea! Kalingka mo, di pesisir Tano Samawa yang tenang, tetua loka memegang teguh kearifan Sabalong Samalewa, merajut harmoni lahir dan batin...",
      "sumberIlmu": "Fakta Ilmiah/Dokumen Sumber: Rujukan data faktual...",
      "voiceGuide": "🎙️ Intonasi narator bahasa Indonesia, hangat berwibawa...",
      "visual": "Di desa pesisir tradisional Indonesia dengan rumah panggung kayu di tepi laut biru yang jernih, seorang pemuda berdesain orisinal manis berbusana tenun ikat Nusantara dan kakek berwajah orisinal ramah hangat sedang meneliti peta kuno...",
      "imagePrompt": "Adorable ${styleName} scene, vertical 9:16 portrait format. Authentic Indonesian coastal village setting with traditional weathered wooden stilt houses over calm turquoise tropical sea. A 100% original bespoke character design, completely unique never-before-seen original concept, one-of-a-kind distinct facial features, proprietary character IP, super cute and adorable young character with charming boyish appeal, bright expressive eyes and cheerful warm smile wearing traditional Indonesian handwoven ikat, accompanied by an original lovable kindly grandfather figure with gentle smiling eyes and silver-gray hair. Warm tropical Indonesian morning lighting, ${styleTag}, highly detailed, vertical 9:16 smartphone format --ar 9:16, 4K.",
      "motionPrompt": "[Camera: Slow steady cinematic push-in at 0.3x speed, locked horizon] [Framing: Strict vertical 9:16 portrait ratio, smartphone screen orientation] [Subject: Original cute stylized young character with unique distinct facial features in traditional Indonesian woven attire blinks gently, smiles warmly, and makes subtle natural hand gestures] [Environment: Gentle tropical breeze rustling wooden stilt house and palm leaves, warm morning lighting] [Voiceover: Same consistent Indonesian narrator voice (warm, authoritative, engaging): 'Pernahkah kamu membayangkan rahasia mencengangkan di balik perairan nusantara ini?'] [Motion: Smooth organic movement, zero morphing, high stability, vertical 9:16, 60fps]",
      "emotion": "Emosi target (misal: Penasaran & Kagum)",
      "captionText": "Teks kinetik singkat untuk layar TikTok...",
      "duration": 10
    }
  ]
}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: hasSourceDoc
              ? (effectiveIsAuto
                ? `Bertindaklah sebagai komposer naskah berbasis NotebookLM Ground Truth. Berdasarkan Dokumen Sumber di atas, tentukan jumlah scene yang paling ideal sesuai panjang & kepadatan cerita (minimal 10 scene, maksimal 20 scene) agar tidak ada informasi penting atau hal menarik yang terbuang. Susun naskah cerita edukasi TikTok untuk topik: "${topic}".`
                : `Bertindaklah sebagai komposer naskah berbasis NotebookLM Ground Truth. Berdasarkan Dokumen Sumber di atas, susunlah tepat ${targetCountNum} scene naskah cerita edukasi TikTok untuk topik: "${topic}". Pastikan 100% fakta terikat pada dokumen sumber dan bernilai ilmu pengetahuan tinggi.`)
              : (effectiveIsAuto
                ? `Rancang naskah cerita edukasi TikTok untuk topik: "${topic}". Tentukan jumlah scene yang paling ideal (minimal 10 scene, maksimal 20 scene) sesuai panjang cerita dan kekayaan informasi agar fakta menarik tidak terbuang.`
                : `Rancang tepat ${targetCountNum} scene naskah cerita edukasi sejarah/sains TikTok yang 100% akurat, faktual, dan mendalam untuk topik: "${topic}". Jadikan setiap scene sebagai sumber ilmu yang sahih.`)
          }
        ]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.6,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json'
    }
  };

  let response = await sendGeminiRequest(activeModel, activeKey, payload);

  // If model is busy (503) or unsupported, fallback to other available flash models
  if (!response.ok && (response.status === 503 || response.status === 404)) {
    const fallbackList = ['gemini-3.5-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
    for (const fbModel of fallbackList) {
      if (fbModel !== activeModel) {
        response = await sendGeminiRequest(fbModel, activeKey, payload);
        if (response.ok) {
          activeModel = fbModel;
          setStoredModel(fbModel);
          break;
        }
      }
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(message);
  }

  const resultData = await response.json();
  const rawText = resultData.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error('Gemini tidak mengembalikan output teks.');
  }

  // Parse JSON with bulletproof multi-layer repair
  let parsed;
  try {
    parsed = safeParseGeminiJson(rawText);
  } catch (err) {
    console.error('Failed to parse Gemini JSON output:', rawText, err);
    throw new Error('Format output Gemini bukan JSON yang valid. Silakan coba generate ulang.');
  }

  const rawScenes = Array.isArray(parsed.scenes) ? parsed.scenes : (Array.isArray(parsed) ? parsed : []);
  if (rawScenes.length === 0) {
    throw new Error('Gemini tidak menghasilkan daftar scene yang valid.');
  }

  // Normalize scenes with duration, time formatting, and default colors
  const stageColors = [
    'border-rose-500 text-rose-400 bg-rose-500/10',
    'border-amber-500 text-amber-400 bg-amber-500/10',
    'border-blue-500 text-blue-400 bg-blue-500/10',
    'border-orange-500 text-orange-400 bg-orange-500/10',
    'border-purple-500 text-purple-400 bg-purple-500/10',
    'border-teal-500 text-teal-400 bg-teal-500/10',
    'border-red-600 text-red-400 bg-red-600/10',
    'border-cyan-500 text-cyan-400 bg-cyan-500/10',
    'border-emerald-600 text-emerald-300 bg-emerald-600/10',
    'border-pink-500 text-pink-400 bg-pink-500/10',
    'border-violet-500 text-violet-400 bg-violet-500/10',
    'border-indigo-500 text-indigo-400 bg-indigo-500/10',
    'border-lime-500 text-lime-400 bg-lime-500/10',
    'border-yellow-500 text-yellow-400 bg-yellow-500/10',
    'border-sky-500 text-sky-400 bg-sky-500/10',
    'border-fuchsia-500 text-fuchsia-400 bg-fuchsia-500/10',
    'border-rose-600 text-rose-300 bg-rose-600/10',
    'border-teal-600 text-teal-300 bg-teal-600/10',
    'border-amber-600 text-amber-300 bg-amber-600/10',
    'border-emerald-500 text-emerald-400 bg-emerald-500/10'
  ];

  return rawScenes.map((s, idx) => {
    const startSec = idx * 10;
    const endSec = (idx + 1) * 10;
    const timeFormatted = `${String(Math.floor(startSec / 60)).padStart(2, '0')}:${String(startSec % 60).padStart(2, '0')} - ${String(Math.floor(endSec / 60)).padStart(2, '0')}:${String(endSec % 60).padStart(2, '0')}`;

    return {
      id: idx + 1,
      time: s.time || timeFormatted,
      stage: s.stage || `Scene ${idx + 1}`,
      stageColor: s.stageColor || stageColors[idx % stageColors.length],
      title: s.title || `Scene ${idx + 1}`,
      narration: s.narration || '',
      sumberIlmu: s.sumberIlmu || `Fakta Sejarah: Arsip catatan toponimi & kebudayaan daerah untuk "${topic}".`,
      voiceGuide: s.voiceGuide || '🎙️ Intonasi: Wibawa dokumenter sejarah, artikulasi jelas bahasa Indonesia.',
      visual: s.visual || '',
      captionText: s.captionText || s.title || '',
      imagePrompt: s.imagePrompt || `${styleName} style, scene ${idx + 1} for "${topic}", 9:16 vertical --ar 9:16`,
      motionPrompt: s.motionPrompt || '[Camera: Slow cinematic pan 0.35x, locked horizon] [Stability: Zero morphing, 60fps]',
      emotion: s.emotion || 'Kagum & Menghargai Sejarah',
      duration: 10,
      status: {
        image: false,
        flow: false,
        inspected: false
      }
    };
  });
}

// AI Feature: Refine a single scene with Gemini
export async function refineSceneWithGemini({
  scene,
  topic,
  userInstruction,
  apiKey = null,
  modelId = null
}) {
  const activeKey = apiKey || getStoredApiKey();
  if (!activeKey) throw new Error('API Key belum diisi.');

  const activeModel = modelId || getStoredModel();
  const prompt = `Perbaiki Scene ${scene.id} dari topik "${topic}" berikut berdasarkan instruksi: "${userInstruction}".
Scene saat ini:
- Judul: ${scene.title}
- Narasi: ${scene.narration}
- Sumber Ilmu: ${scene.sumberIlmu}
- Visual: ${scene.visual}
- Image Prompt: ${scene.imagePrompt}
- Motion Prompt: ${scene.motionPrompt}

ATURAN WAJIB KARAKTER LUCU & MENGGEMASKAN + LATAR OTENTIK INDONESIA:
1. Tempat & Lokasi: WAJIB 100% SESUAI DENGAN YANG ADA DI INDONESIA (lanskap tropis Nusantara, desa tradisional, rumah adat kayu, laut/pantai Indonesia, busana tenun ikat/batik/kebaya Indonesia).
2. Desain Karakter: WAJIB didesain sangat lucu, imut, manis, dan menggemaskan (super cute, adorable, and highly expressive) sesuai gaya visual yang aktif (misal 3D Animation: karakter animasi 3D bermata bulat besar berbinar; Claymation: boneka clay lempung buatan tangan berpipi chubby merona dan ekspresif).
3. BEBAS FILTER HAK CIPTA PIHAK KETIGA: DILARANG menggunakan nama studio/merek pihak ketiga seperti "Pixar", "Disney", "Studio Ghibli" di dalam prompt. Gunakan istilah generik seperti "stylized 3D feature animation", "handcrafted stop-motion claymation".
4. WAJIB 100% ORISINAL & UNIK (NEVER-BEFORE-SEEN BESPOKE IP):
   - Karakter WAJIB merupakan desain orisinal murni yang BENAR-BENAR BARU dan BELUM PERNAH ADA YANG MEMBUAT SEBELUMNYA (bukan jiplakan, bukan milik orang lain, proprietary original IP).
   - Di imagePrompt WAJIB menyertakan: "100% original bespoke character design, completely unique never-before-seen original concept, one-of-a-kind distinctive facial features, proprietary original character IP, not based on any existing character or real person, vertical 9:16 portrait format, smartphone mobile orientation --ar 9:16".
5. FORMAT MOTION PROMPT VIDEO (WAJIB PERTAHANKAN 9:16, ADA NARASI & PENGISI SUARA KONSISTEN):
   - Wajib mempertahankan rasio vertikal 9:16 serta menyertakan narasi dan pengisi suara yang konsisten (Same consistent Indonesian narrator voice).
   - Wajib format bracket presisi: [Camera: ...] [Framing: Strict vertical 9:16 portrait ratio, smartphone screen orientation] [Subject: Original cute stylized character with unique distinct facial features ...] [Environment: ...] [Voiceover: Same consistent Indonesian narrator voice: 'teks narasi scene'] [Motion: ..., vertical 9:16, 60fps].
   - Gunakan tanda petik tunggal (') untuk narasi voiceover agar tidak bentrok dengan sintaks JSON. Dilarang kata "no watermark, no text".
6. ATURAN RASIO BAHASA DAERAH PULAU SUMBAWA (60% INDONESIA : 40% BAHASA DAERAH):
   - Jika topik/scene membahas Pulau Sumbawa atau suku terkait (Samawa, Mbojo, Bugis, Sasak), terapkan proporsi ~60% Bahasa Indonesia dan ~40% Bahasa Daerah:
     * Jika Scene 1-2 (Pembuka): Wajib ada sapaan/ajakan pembuka daerah (misal Samawa: "Kalingka mo! Lamen...", Bugis: "Tabe' puang eja...", Mbojo: "Mada londo ba Dana Mbojo...", Sasak: "Ape arak batur sami...").
     * Jika Scene Tengah: Wajib sisipkan istilah tradisi/falsafah/dialog daerah (misal kosakata kamus Samawa: "tana", "let", "olat", "tiu", "bale", "tode", "kaji", "kelam", "sarea", "balong", "sandro", "tutu-tutu", "Mana tau manin tau", "Pina siq"; Bugis: "bombang", "lopi", "mabbise", "kukkedi", "malessi", "malempu'", "Siri' na Pacce", "Taro Ada Taro Gau"; Mbojo: "Nggahi Rawi Pahu", "Mada"; Sasak: "Tindih", "Solah").
     * Jika Scene Terakhir (Penutup): Wajib akhiri dengan falsafah puncak & penutup daerah (misal "Sabalong Samalewa", "Kurru sumange! Tabe'...", "Mada pamit, tabee kone!", "Matur tampiasih pelungguh batur!").
- Pria: "in an authentic Indonesian setting, with 100% original bespoke character design, completely unique never-before-seen concept, super cute and charming character, warm engaging smile, bright expressive sparkling eyes, wearing authentic Indonesian attire".
- Wanita: "in an authentic Indonesian setting, with 100% original bespoke character design, completely unique never-before-seen concept, super cute, sweet and adorable character, large luminous expressive eyes, gentle rosy cheeks, delightful smile, wearing authentic Indonesian woven attire".
- Anak-anak: "with 100% original bespoke character design, completely unique never-before-seen concept, super cute cherubic child, chubby rosy cheeks, wide wonder-filled sparkling eyes, adorable innocent smile, in an authentic Indonesian setting".
- Kakek & Nenek (Lansia): "with 100% original bespoke character appearance, unique never-before-seen facial design, lovable and heartwarming elderly grandfather/grandmother figure, gentle smiling eyes, warm kindly presence, silver hair, in an authentic Indonesian setting".

Kembalikan HANYA JSON baru:
{
  "title": "...",
  "narration": "...",
  "sumberIlmu": "...",
  "voiceGuide": "...",
  "visual": "...",
  "imagePrompt": "...",
  "motionPrompt": "...",
  "captionText": "..."
}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json' }
  };

  const response = await sendGeminiRequest(activeModel, activeKey, payload);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Gagal menyempurnakan scene.');
  }

  const resultData = await response.json();
  const rawText = resultData.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, ''));
}

// AI Feature: Generate TikTok Hashtags & Viral Caption
export async function generateTikTokCaptionWithGemini({
  topic,
  scenes,
  apiKey = null,
  modelId = null
}) {
  const activeKey = apiKey || getStoredApiKey();
  if (!activeKey) throw new Error('API Key belum diisi.');

  const activeModel = modelId || getStoredModel();
  const prompt = `Buat caption TikTok FYP viral dan daftar hashtag yang sangat relevan untuk topik edukasi sejarah "${topic}".
Ringkasan alur cerita:
${scenes.map(s => `- ${s.title}: ${s.narration} (Sumber: ${s.sumberIlmu || ''})`).join('\n')}

Format JSON:
{
  "hookHeadline": "Judul headline menarik berkarakter kuat...",
  "caption": "Deskripsi caption TikTok edukatif yang memancing diskusi cerdas...",
  "hashtags": ["#sejarah", "#faktaunik", "#edukasi", "#fyp", "#..."],
  "callToAction": "Pertanyaan pemantik interaksi penonton..."
}`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: 'application/json' }
  };

  const response = await sendGeminiRequest(activeModel, activeKey, payload);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || 'Gagal membuat caption.');
  }

  const resultData = await response.json();
  const rawText = resultData.candidates?.[0]?.content?.parts?.[0]?.text;
  return JSON.parse(rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, ''));
}
