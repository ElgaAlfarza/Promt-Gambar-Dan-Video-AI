import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey || apiKey === "your_gemini_api_key_here") {
  console.error("=================================================");
  console.error(" [ERROR] GEMINI_API_KEY belum dikonfigurasi!");
  console.error(" 1. Buka atau buat file '.env' di folder ini.");
  console.error(" 2. Masukkan API Key Anda:");
  console.error("    GEMINI_API_KEY=AIzaSy...");
  console.error(" Dapatkan API key di: https://aistudio.google.com");
  console.error("=================================================");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

/**
 * Fungsi untuk meminta Gemini Pro membuat script video TikTok / Shorts
 */
export async function generateVideoScript(topic) {
  console.log(`\nSedang meminta Gemini Pro membuat script untuk: "${topic}"...`);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: `Buatkan naskah video pendek TikTok/Shorts berdurasi sekitar 30-60 detik tentang: "${topic}".
Format output:
1. Hook (3 detik pertama yang memikat)
2. Isi Naskah (singkat, padat, menarik)
3. Call to Action (CTA penutup)`,
    });

    return response.text;
  } catch (error) {
    console.error("Gagal memanggil Gemini:", error.message);
    throw error;
  }
}

// Jika file ini dijalankan langsung via node: `node gemini.mjs`
if (process.argv[1]?.endsWith("gemini.mjs")) {
  const topic = process.argv.slice(2).join(" ") || "Tips produktivitas untuk pemula";
  const script = await generateVideoScript(topic);
  console.log("\n--- HASIL DARI GEMINI PRO ---");
  console.log(script);
  console.log("-----------------------------\n");
}
