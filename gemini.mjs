import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

// Menangani verifikasi sertifikat SSL lokal pada Windows jika ada antivirus/proxy
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your_gemini_api_key_here") {
  console.error("=================================================");
  console.error(" [ERROR] GEMINI_API_KEY belum dikonfigurasi!");
  console.error(" 1. Buka file '.env' di folder ini.");
  console.error(" 2. Masukkan API Key Anda:");
  console.error("    GEMINI_API_KEY=AQ.Ab8RN...");
  console.error("=================================================");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Fungsi untuk meminta Gemini AI membuat script video TikTok / Shorts
 */
export async function generateVideoScript(topic) {
  console.log(`\nSedang meminta Gemini AI membuat script untuk topik: "${topic}"...`);

  // Daftar model yang didukung akun Anda
  const modelsToTry = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-flash-lite-latest",
  ];

  let lastError = null;
  for (const modelName of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: modelName,
        contents: `Buatkan naskah video pendek TikTok/Shorts berbahasa Indonesia berdurasi sekitar 30-60 detik tentang: "${topic}".
Format output:
1. Hook (3 detik pertama yang memikat & bikin penasaran)
2. Isi Naskah (singkat, padat, menarik, cocok untuk dibaca/disuarakan)
3. Call to Action (CTA penutup yang memicu komentar/follow)

ATURAN RASIO BAHASA DAERAH (60% INDONESIA : 40% BAHASA DAERAH) & DISTRIBUSI 3 TITIK:
Jika topik membahas daerah Pulau Sumbawa atau suku-suku terkait (Samawa, Mbojo/Bima, Bugis, Sasak):
- Komposisi: ~60% Bahasa Indonesia dan ~40% Bahasa Daerah lokal.
- 1. Pembuka (Hook Scene 1-2): Wajib ada sapaan/ajakan pembuka bahasa daerah (misal Samawa: "Kalingka mo! Lamen...", Bugis: "Tabe' puang eja...", Mbojo: "Mada londo ba Dana Mbojo...", Sasak: "Ape arak batur sami...").
- 2. Tengah-Tengah: Wajib ada istilah adat, dialog, falsafah atau kosakata kamus daerah (misal Samawa: "tana", "let", "tiu", "olat", "bale", "tode", "kaji", "kelam", "sarea", "balong", "sandro", "tutu-tutu", "Mana tau manin tau", "Pina siq"; Bugis: "bombang", "lopi", "mabbise", "kukkedi", "malessi", "malempu'", "Siri' na Pacce", "Taro Ada Taro Gau"; Mbojo: "Nggahi Rawi Pahu", "Mada"; Sasak: "Tindih", "Solah").
- 3. Penutup (CTA & Ending): Wajib akhiri dengan falsafah puncak daerah dan salam/doa berkah penutup (misal "Sabalong Samalewa", "Kurru sumange! Tabe'...", "Mada pamit, tabee kone!", "Matur tampiasih pelungguh batur!").`,
      });

      return response.text;
    } catch (err) {
      lastError = err;
      // Coba model berikutnya jika model sedang sibuk
    }
  }

  throw lastError;
}

// Jika file ini dijalankan langsung via terminal: `npm run gemini "topik anda"`
if (process.argv[1]?.endsWith("gemini.mjs")) {
  const topic = process.argv.slice(2).join(" ") || "Tips coding produktif untuk pemula";
  try {
    const script = await generateVideoScript(topic);
    console.log("\n================ HASIL DARI GEMINI AI ================");
    console.log(script);
    console.log("======================================================\n");
  } catch (error) {
    console.error("\nGagal memanggil Gemini:", error.message || error);
  }
}
