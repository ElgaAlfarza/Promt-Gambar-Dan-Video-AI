// Utility to extract audio from video and transcribe speech into synchronized kinetic words
import { getStoredApiKey, getStoredModel, sendGeminiRequest } from './geminiService';

/**
 * Convert AudioBuffer to 16kHz Mono WAV Blob & Base64
 */
function audioBufferToWav(buffer, optSampleRate = 16000) {
  const numChannels = 1; // mono
  const sampleRate = optSampleRate;
  const format = 1; // PCM
  const bitDepth = 16;

  // Resample buffer to mono & desired sample rate
  const offlineCtx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(
    1,
    Math.ceil(buffer.duration * sampleRate),
    sampleRate
  );
  const source = offlineCtx.createBufferSource();
  source.buffer = buffer;
  source.connect(offlineCtx.destination);
  source.start(0);

  return offlineCtx.startRendering().then((renderedBuffer) => {
    const channelData = renderedBuffer.getChannelData(0);
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const byteRate = sampleRate * blockAlign;
    const dataSize = channelData.length * bytesPerSample;
    const bufferSize = 44 + dataSize;

    const arrayBuffer = new ArrayBuffer(bufferSize);
    const view = new DataView(arrayBuffer);

    // RIFF identifier
    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, byteRate, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(view, 36, 'data');
    view.setUint32(40, dataSize, true);

    // Write PCM audio samples (16-bit signed int)
    let offset = 44;
    for (let i = 0; i < channelData.length; i++, offset += 2) {
      let s = Math.max(-1, Math.min(1, channelData[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }

    const blob = new Blob([view], { type: 'audio/wav' });
    return blob;
  });
}

function writeString(view, offset, string) {
  for (let i = 0; i < string.length; i++) {
    view.setUint8(offset + i, string.charCodeAt(i));
  }
}

function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

/**
 * Extract audio track from an uploaded Video file / Blob
 */
export async function extractAudioFromVideo(videoFile) {
  const arrayBuffer = await videoFile.arrayBuffer();
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
  const wavBlob = await audioBufferToWav(audioBuffer, 16000);
  const base64 = await blobToBase64(wavBlob);
  return {
    wavBlob,
    base64,
    duration: audioBuffer.duration
  };
}

/**
 * Transcribe Audio with Gemini AI Speech Recognition
 * Returns { fullText, words: [{ word, start, end }] }
 */
export async function transcribeAudioWithGemini(audioBase64, totalDuration, apiKey = null, modelId = null) {
  const activeKey = apiKey || getStoredApiKey();
  if (!activeKey) {
    throw new Error('API Key Gemini belum disetel. Silakan masukkan API Key.');
  }

  const activeModel = modelId || getStoredModel() || 'gemini-3.5-flash';

  const systemInstruction = `Kamu adalah AI Speech-to-Text & Subtitle Synchronizer Indonesia yang sangat teliti dan presisi.
Tugasmu adalah mendengarkan rekaman audio ucapan pembicara/narator secara kata demi kata.
Durasi total audio adalah sekitar ${totalDuration.toFixed(1)} detik.

Hasilkan transkrip lengkap dan bagikan SETIAP KATA dengan estimasi timestamp detik mulai (start) dan selesai (end) yang akurat.
PENTING:
1. Urutan kata harus 100% persis sesuai dengan audio.
2. Setiap kata harus memiliki start dan end (dalam detik) mengikuti ritme ucapan asli pembicara. Jangan menumpuk semua kata di awal.
3. Pertahankan tanda baca alami (seperti ?, !, koma) menempel di akhir kata (contoh: "SUMBAWA?", "PLAMPANG!") untuk pemenggalan kalimat subtitle yang dramatis dan tepat.
4. Format huruf kapital (UPPERCASE) untuk setiap kata.

OUTPUT WAJIB BERUPA JSON VALID (tanpa markdown backtick):
{
  "fullText": "Saya adalah orang Nusa Tenggara Barat yang tinggal di Plampang",
  "words": [
    { "word": "SAYA", "start": 0.0, "end": 0.35 },
    { "word": "ADALAH", "start": 0.35, "end": 0.70 },
    { "word": "ORANG", "start": 0.70, "end": 1.05 },
    { "word": "NUSA", "start": 1.05, "end": 1.50 },
    { "word": "TENGGARA", "start": 1.50, "end": 2.05 },
    { "word": "BARAT", "start": 2.05, "end": 2.50 },
    { "word": "YANG", "start": 2.50, "end": 2.80 },
    { "word": "TINGGAL", "start": 2.80, "end": 3.35 },
    { "word": "DI", "start": 3.35, "end": 3.60 },
    { "word": "PLAMPANG!", "start": 3.60, "end": 4.40 }
  ]
}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `Dengarkan rekaman audio ini dan buatkan transkripsi kata demi kata bahasa Indonesia dengan timestamp start dan end yang presisi mengikuti ucapan pembicara.`
          },
          {
            inlineData: {
              mimeType: 'audio/wav',
              data: audioBase64
            }
          }
        ]
      }
    ],
    systemInstruction: {
      parts: [{ text: systemInstruction }]
    },
    generationConfig: {
      temperature: 0.1,
      responseMimeType: 'application/json'
    }
  };

  let response = await sendGeminiRequest(activeModel, activeKey.trim(), payload);

  // Fallback to gemini-3.1-flash-lite if activeModel returned error
  if (!response.ok && activeModel !== 'gemini-3.1-flash-lite') {
    response = await sendGeminiRequest('gemini-3.1-flash-lite', activeKey.trim(), payload);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error?.message || `HTTP ${response.status}`);
  }

  const data = await response.json();
  const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawJson) {
    throw new Error('Output audio transkrip kosong.');
  }

  try {
    const parsed = JSON.parse(rawJson);
    return parsed;
  } catch (e) {
    // Fallback extraction
    const match = rawJson.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error('Gagal menguraikan JSON transkripsi suara.');
  }
}

/**
 * Generate timed words distributed across duration with syllable/length weighting
 * Preserves punctuation (?, !, ,, .) for accurate sentence chunking.
 */
export function createTimedWordsFromText(text, totalDuration = 6.0) {
  // Preserve punctuation at the end of words
  const rawWords = (text || '')
    .toUpperCase()
    .split(/\s+/)
    .map(w => w.trim())
    .filter(Boolean);

  if (rawWords.length === 0) {
    return [];
  }

  // Weight duration by clean word length for natural cadence:
  // Short words (di, ke, dan) take less time, longer words (plampang, tenggara) take more
  const weights = rawWords.map(w => {
    const cleanLen = w.replace(/[^\w]/g, '').length || 3;
    return Math.max(0.2, 0.12 + cleanLen * 0.05);
  });
  const totalWeight = weights.reduce((acc, v) => acc + v, 0);
  const scale = (totalDuration > 0 ? totalDuration : 6.0) / totalWeight;

  let currentStart = 0;
  return rawWords.map((word, idx) => {
    const wordDur = Math.max(0.18, weights[idx] * scale);
    const start = Number(currentStart.toFixed(2));
    const end = Number((currentStart + wordDur).toFixed(2));
    currentStart += wordDur;
    return {
      word,
      start,
      end
    };
  });
}

/**
 * Reconcile edited caption text with existing timed words.
 * Crucial for editing without breaking speech sync:
 * - If user edits a word (e.g. SAMAWA -> SAMAWAI), its exact audio timestamp is 100% preserved!
 * - If user inserts or deletes words, existing aligned words keep their audio timestamps.
 * - Unmatched inserted words get clean interpolated time slots without shifting the entire video.
 */
export function reconcileTimedWords(newText, existingWords = [], totalDuration = 6.0) {
  const newWords = (newText || '')
    .toUpperCase()
    .split(/\s+/)
    .map(w => w.trim())
    .filter(Boolean);

  if (newWords.length === 0) {
    return [];
  }

  // If no previous timestamps exist, fall back to weighted distribution
  if (!existingWords || existingWords.length === 0) {
    return createTimedWordsFromText(newText, totalDuration);
  }

  // Helper similarity between words
  const getSimilarity = (s1, s2) => {
    const a = (s1 || '').toLowerCase().replace(/[^\w]/g, '');
    const b = (s2 || '').toLowerCase().replace(/[^\w]/g, '');
    if (a === b) return 1.0;
    if (!a || !b) return 0.0;
    if (a.includes(b) || b.includes(a)) return 0.8;
    let matches = 0;
    for (let i = 0; i < Math.min(a.length, b.length); i++) {
      if (a[i] === b[i]) matches++;
    }
    return matches / Math.max(a.length, b.length);
  };

  // Case 1: Same number of words - exact 1-to-1 preservation!
  // This is the most frequent user action (correcting typos, editing words like SAMAWA -> SAMAWAI)
  if (newWords.length === existingWords.length) {
    return newWords.map((word, idx) => ({
      word,
      start: existingWords[idx].start,
      end: existingWords[idx].end
    }));
  }

  // Case 2: Different number of words - forward-matching alignment
  const result = [];
  let lastUsedIdx = -1;

  for (let i = 0; i < newWords.length; i++) {
    const nw = newWords[i];
    let matchedIdx = -1;
    let bestScore = 0.45;

    // Search forward from lastUsedIdx in existing words
    for (let j = lastUsedIdx + 1; j < existingWords.length; j++) {
      const score = getSimilarity(nw, existingWords[j].word);
      if (score > bestScore) {
        bestScore = score;
        matchedIdx = j;
        if (score === 1.0) break;
      }
    }

    if (matchedIdx !== -1) {
      result.push({
        word: nw,
        start: existingWords[matchedIdx].start,
        end: existingWords[matchedIdx].end
      });
      lastUsedIdx = matchedIdx;
    } else {
      // Interpolate for new/unmatched word
      const prevWord = result[result.length - 1];
      const prevEnd = prevWord ? prevWord.end : 0;

      // Look ahead for next matched word's start time
      let nextStart = totalDuration;
      for (let k = i + 1; k < newWords.length; k++) {
        for (let j = lastUsedIdx + 1; j < existingWords.length; j++) {
          if (getSimilarity(newWords[k], existingWords[j].word) >= 0.6) {
            nextStart = existingWords[j].start;
            break;
          }
        }
        if (nextStart < totalDuration) break;
      }

      const availableGap = Math.max(0.2, nextStart - prevEnd);
      const estStart = Number(prevEnd.toFixed(2));
      const estEnd = Number(Math.min(nextStart, prevEnd + Math.min(0.4, availableGap * 0.5)).toFixed(2));

      result.push({
        word: nw,
        start: estStart,
        end: estEnd
      });
    }
  }

  // Ensure chronological order and non-zero duration
  for (let i = 1; i < result.length; i++) {
    if (result[i].start < result[i - 1].end) {
      result[i].start = Number(result[i - 1].end.toFixed(2));
      if (result[i].end <= result[i].start) {
        result[i].end = Number((result[i].start + 0.25).toFixed(2));
      }
    }
  }

  return result;
}
