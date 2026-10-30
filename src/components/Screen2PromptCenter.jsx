import React, { useState } from 'react';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Video, 
  Image as ImageIcon, 
  ArrowRight, 
  ArrowLeft,
  Download,
  ExternalLink, 
  CheckCircle2, 
  Layers, 
  HelpCircle,
  Share2,
  FileCheck,
  Volume2,
  RefreshCw,
  ShieldCheck
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';
import { updateScenesToStyle, cleanMotionPromptForFlow } from '../data/storyPresets';

export default function Screen2PromptCenter({
  topic = '',
  scenes,
  setScenes,
  onBackToPlanner,
  visualStyle,
  setVisualStyle,
  visualStyles,
  addToast
}) {
  const [copiedKey, setCopiedKey] = useState(null);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);

  const activeStyle = visualStyles.find(s => s.id === visualStyle) || visualStyles[0];
  const activeStyleName = activeStyle?.name || 'Claymation';

  const handleSyncPromptsToStyle = (targetStyleId = visualStyle) => {
    if (!scenes || scenes.length === 0) {
      addToast('Belum ada scene untuk disinkronkan.', 'info');
      return;
    }
    const targetName = visualStyles.find(s => s.id === targetStyleId)?.name || 'Gaya Terpilih';
    const updated = updateScenesToStyle(scenes, targetStyleId, topic);
    setScenes(updated);
    addToast(`✨ Prompt semua scene berhasil disinkronkan ke karakter lucu & menggemaskan bergaya ${targetName}!`, 'success');
  };

  const handleCleanForFlow = () => {
    if (!scenes || scenes.length === 0) {
      addToast('Belum ada scene untuk dibersihkan.', 'info');
      return;
    }
    const updated = scenes.map(s => ({
      ...s,
      motionPrompt: cleanMotionPromptForFlow(s.motionPrompt, visualStyle, s.narration, s.voiceGuide)
    }));
    setScenes(updated);
    addToast('🎙️ Berhasil memformat semua prompt motion lengkap dengan narasi & pengisi suara konsisten!', 'success');
  };

  const handleStyleChange = (e) => {
    const newStyleId = e.target.value;
    setVisualStyle(newStyleId);
    handleSyncPromptsToStyle(newStyleId);
  };

  const handleTestVoice = (scene) => {
    if (playingVoiceId === scene.id) {
      soundEngine.stopSpeech();
      setPlayingVoiceId(null);
      addToast('Suara dihentikan.', 'info');
      return;
    }

    setPlayingVoiceId(scene.id);
    addToast(`Memutar narasi Scene ${scene.id} (Bahasa Indonesia)...`, 'info');
    soundEngine.speakNarration(
      scene.narration,
      { pitch: 0.9, rate: 0.95 },
      () => {},
      () => setPlayingVoiceId(null)
    );
  };

  const copyToClipboard = (text, keyName, label) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedKey(keyName);
      addToast(`${label} berhasil disalin ke clipboard!`, 'success');
      setTimeout(() => setCopiedKey(null), 2000);
    }).catch(() => {
      addToast('Gagal menyalin prompt.', 'error');
    });
  };

  const toggleStatus = (sceneId, statusKey) => {
    const updated = scenes.map(s => {
      if (s.id === sceneId) {
        return {
          ...s,
          status: {
            ...s.status,
            [statusKey]: !s.status[statusKey]
          }
        };
      }
      return s;
    });
    setScenes(updated);
  };

  const copyAllPrompts = () => {
    const allText = scenes.map((s, idx) => `
========================================
SCENE ${idx + 1}: ${s.title || s.stage} (${s.time})
========================================
🎙️ NASKAH VOICEOVER:
"${s.narration}"
${s.voiceGuide ? `${s.voiceGuide}\n` : ''}
🖼️ PROMPT GAMBAR CHATGPT / DALL-E (9:16):
${s.imagePrompt}

🎬 PROMPT MOTION FLOW AI (IMG2VIDEO - BESERTA NARASI & SUARA KONSISTEN):
${cleanMotionPromptForFlow(s.motionPrompt, visualStyle, s.narration, s.voiceGuide)}
`).join('\n');

    copyToClipboard(allText, 'all', 'Semua prompt & naskah cerita');
  };

  const exportAllTxt = () => {
    if (!scenes || scenes.length === 0) {
      addToast('Belum ada scene untuk diunduh.', 'info');
      return;
    }

    const lines = [
      `=============================================================`,
      `  TIKTOK & SHORTS AI PROMPT DOSSIER`,
      `  Topik: ${topic || 'Tanpa Judul'}`,
      `  Gaya Karakter: ${activeStyleName}`,
      `  Total Scene: ${scenes.length} Scene (Format 9:16 Vertikal)`,
      `=============================================================\n`
    ];

    scenes.forEach((s, idx) => {
      lines.push(`=============================================================`);
      lines.push(`SCENE ${idx + 1}: ${(s.title || s.stage || `Scene ${idx + 1}`).toUpperCase()} [${s.time || ''}]`);
      lines.push(`=============================================================`);
      lines.push(`🎙️ NASKAH VOICEOVER (60% Indo : 40% Daerah):`);
      lines.push(`"${s.narration}"\n`);
      if (s.voiceGuide) {
        lines.push(`🗣️ PANDUAN SUARA / INTONASI:`);
        lines.push(`${s.voiceGuide}\n`);
      }
      if (s.sumberIlmu) {
        lines.push(`📖 SUMBER FAKTA & ILMU:`);
        lines.push(`${s.sumberIlmu}\n`);
      }
      lines.push(`🖼️ IMAGE PROMPT (DALL-E 3 / Midjourney):`);
      lines.push(`${s.imagePrompt}\n`);
      lines.push(`🎬 MOTION PROMPT (FLOW / Kling / Luma / Sora / Runway):`);
      lines.push(`${cleanMotionPromptForFlow(s.motionPrompt, visualStyle, s.narration, s.voiceGuide)}\n`);
      if (s.captionText) {
        lines.push(`💬 CAPTION / TEKS SUBTITLE:`);
        lines.push(`${s.captionText}\n`);
      }
    });

    lines.push(`=============================================================`);
    lines.push(`Generated by Dashboard Co-Pilot TikTok Lokal v2.0 PRO`);
    lines.push(`=============================================================`);

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Prompt_TikTok_${(topic || 'Naskah').replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    addToast('📄 Berhasil mendownload seluruh naskah & prompt ke file TXT!', 'success');
  };

  // Completion calculation
  const totalItems = (scenes?.length || 0) * 2;
  const completedItems = (scenes || []).reduce((acc, s) => {
    return acc + (s.status?.image ? 1 : 0) + (s.status?.flow ? 1 : 0);
  }, 0);
  const completionPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  if (!scenes || scenes.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center border border-white/10 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-white/5 mx-auto flex items-center justify-center text-slate-400">
          <Sparkles className="w-8 h-8 text-slate-500" />
        </div>
        <h3 className="text-lg font-bold text-white">Belum Ada Prompt Scene</h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto">
          Silakan susun naskah di Langkah 1 terlebih dahulu sebelum menyalin prompt gambar & video.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Top Banner Box */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#141a29] via-[#161f33] to-[#121624] border border-white/10 p-6 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[#25F4EE]/20 text-[#25F4EE]">
                🎨
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight">
                LANGKAH 2: PROMPT CENTER (SIAP COPY-PASTE)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Daftar perintah gambar & motion presisi tinggi untuk akun ChatGPT gratis dan tool FLOW Img2Video.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyAllPrompts}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition"
            >
              <Copy className="w-3.5 h-3.5 text-[#25F4EE]" />
              Salin Semua ({scenes.length} Scene)
            </button>
          </div>
        </div>
      </div>

      {/* Workflow Instruction Box (Petunjuk Sesuai Dokumen) */}
      <div className="glass-card rounded-2xl p-5 border border-white/10 shadow-lg space-y-3">
        <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0f1523] border border-cyan-500/30">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-[#25F4EE] flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-[#25F4EE] uppercase tracking-wider mb-1 flex items-center gap-2">
              💡 Petunjuk Workflow Cepat:
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              1. <strong>Salin Prompt Gambar</strong> ke ChatGPT (DALL-E) secara gratis untuk mendapatkan gambar vertikal 9:16.<br />
              2. <strong>Salin Prompt Motion</strong> ke aplikasi FLOW bersama file gambar yang baru saja di-download dari ChatGPT.<br />
              3. Centang checklist setelah selesai, lalu masuk ke Langkah 3 Inspector untuk menguji klip videonya!
            </p>
          </div>
        </div>

        {/* 🎙️ PANDUAN PENGISI SUARA KONSISTEN & MOTION VIDEO */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/10 via-cyan-500/5 to-transparent border border-teal-500/30 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🎙️ 🎬</span>
              <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                PENGISI SUARA KONSISTEN & PANDUAN MOTION (FLOW / KLING / LUMA):
              </h4>
            </div>
            <span className="text-[11px] text-teal-300 font-semibold bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
              🎙️ Narasi & Pengisi Suara Konsisten Tersemat di Tiap Scene
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs text-slate-300">
            <div className="p-2.5 rounded-lg bg-[#0e1420] border border-white/5">
              <strong className="text-[#25F4EE] block mb-0.5">1. Pengisi Suara Konsisten</strong>
              <span>Setiap prompt video menyertakan <em>Same consistent Indonesian narrator voice</em> dan teks naskah narasi lengkap.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0e1420] border border-white/5">
              <strong className="text-[#25F4EE] block mb-0.5">2. Rasio 9:16 Vertikal</strong>
              <span>Format 9:16 portrait dipertahankan penuh untuk ChatGPT (--ar 9:16) dan video FLOW tanpa crop hitam.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0e1420] border border-white/5">
              <strong className="text-[#25F4EE] block mb-0.5">3. Motion Strength: 3 - 4</strong>
              <span>Gunakan level motion 3–4 di FLOW / Kling. Hindari di atas 5 agar subjek karakter tetap utuh & stabil.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0e1420] border border-white/5">
              <strong className="text-[#25F4EE] block mb-0.5">4. Stabilisasi Kamera</strong>
              <span>Gerakan lambat (Slow Pan / Push-In 0.3x) menjaga kestabilan latar Nusantara dan anatomi karakter.</span>
            </div>
          </div>
        </div>

        {/* ✨ ESTETIKA KARAKTER: 100% ORISINAL MURNI, LUCU & MENGGEMASKAN SESUAI GAYA VISUAL + LATAR NUSANTARA */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-cyan-500/10 border border-purple-500/30 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">✨ 🇮🇩 🧸</span>
              <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                ESTETIKA KARAKTER: 100% ORISINAL MURNI & MENGGEMASKAN ({activeStyleName.toUpperCase()})
              </h4>
            </div>
            <span className="text-[11px] text-pink-300 font-medium bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
              💎 100% Karakter Orisinal (Bukan Milik Orang Lain / Belum Pernah Ada Sebelumnya)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-slate-300">
            <div className="p-2.5 rounded-lg bg-[#0e1420] border border-white/5">
              <strong className="text-pink-400 block mb-0.5">👨 Pria / Pemuda (Orisinal)</strong>
              <span className="text-[11px] text-slate-400">Desain 100% orisinal baru (bukan jiplakan), manis, ramah, dan menggemaskan (charming boyish charm), senyum hangat bersahabat, mata berbinar ceria, berbusana tenun/batik khas Indonesia.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0e1420] border border-white/5">
              <strong className="text-pink-400 block mb-0.5">👩 Wanita / Gadis (Orisinal)</strong>
              <span className="text-[11px] text-slate-400">Desain 100% orisinal baru, super imut, manis, dan cantik menggemaskan, mata berbinar ekspresif, pipi merona lembut, senyum memikat dalam balutan kebaya/tenun Nusantara.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0e1420] border border-white/5">
              <strong className="text-purple-400 block mb-0.5">🧒 Anak-anak (Orisinal)</strong>
              <span className="text-[11px] text-slate-400">Desain 100% orisinal baru, super imut & gemoy, pipi bulat tembem menggemaskan, mata berbinar polos ceria penuh keajaiban di lanskap Nusantara.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#0e1420] border border-white/5">
              <strong className="text-purple-400 block mb-0.5">👴👵 Kakek & Nenek (Orisinal)</strong>
              <span className="text-[11px] text-slate-400">Desain 100% orisinal baru, bersahaja, hangat, dan menggemaskan (heartwarming), tatapan teduh ramah, senyum lembut menyejukkan berbalut kain adat tradisional.</span>
            </div>
          </div>
        </div>

        {/* Style switcher, Quick Sync & Progress status bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-2">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Gaya Visual Aktif:</span>
              <select
                value={visualStyle}
                onChange={handleStyleChange}
                className="bg-[#0e1420] border border-white/15 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#25F4EE] focus:outline-none focus:border-[#25F4EE] transition cursor-pointer"
              >
                {visualStyles.map((style) => (
                  <option key={style.id} value={style.id} className="bg-[#121622] text-white">
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={() => handleSyncPromptsToStyle(visualStyle)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#FE2C55]/15 hover:bg-[#FE2C55]/25 border border-[#FE2C55]/30 text-[#FE2C55] transition shadow-sm cursor-pointer"
              title="Perbarui prompt seluruh scene agar karakternya menjadi lucu & menggemaskan sesuai gaya visual ini"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>✨ Perbarui Semua Prompt ({activeStyleName})</span>
            </button>

            <button
              onClick={handleCleanForFlow}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 text-cyan-400 transition shadow-sm cursor-pointer"
              title="Bersihkan prompt motion dari naskah dialog dan tanda petik agar 100% lolos sensor pelanggaran pihak ketiga FLOW"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>🛡️ Format Ulang FLOW (Anti-Pelanggaran)</span>
            </button>
          </div>

          {/* Progress tracker */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-xs text-slate-300 font-bold">
                Progress Aset: {completedItems}/{totalItems} ({completionPercent}%)
              </span>
            </div>
            <div className="w-28 sm:w-36 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] transition-all duration-300"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Per-Scene Prompt Cards */}
      <div className="space-y-5">
        {scenes.map((scene, idx) => {
          const imgCopied = copiedKey === `img-${scene.id}`;
          const flowCopied = copiedKey === `flow-${scene.id}`;
          const pkgCopied = copiedKey === `pkg-${scene.id}`;

          return (
            <div 
              key={scene.id}
              className="glass-card rounded-2xl p-5 border border-white/10 hover:border-white/20 transition shadow-lg space-y-4"
            >
              {/* Scene Title Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                  <span className="text-lg">📌</span>
                  <h3 className="text-sm sm:text-base font-extrabold text-white">
                    SCENE {idx + 1}: {scene.title || `[${scene.stage}]`}
                  </h3>
                  <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                    • {scene.time} ({scene.duration}s)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Target Emosi:</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                    {scene.emotion}
                  </span>
                </div>
              </div>

              {/* 🎙️ Naskah & Panduan Intonasi Narator */}
              <div className="space-y-2 rounded-xl bg-[#0d121c] p-4 border border-teal-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-300 flex items-center gap-2">
                    <FileCheck className="w-4 h-4 text-teal-400" />
                    🎙️ Naskah Voiceover & Panduan Intonasi:
                  </span>
                  <button
                    onClick={() => handleTestVoice(scene)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold transition border ${
                      playingVoiceId === scene.id
                        ? 'bg-[#FE2C55] text-white border-[#FE2C55] animate-pulse'
                        : 'bg-teal-500/20 text-teal-300 hover:bg-teal-500/30 border-teal-500/30'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    {playingVoiceId === scene.id ? 'Sedang Bicara... (Stop)' : '🔊 Dengar Intonasi AI'}
                  </button>
                </div>

                <div className="p-3 bg-[#080c14] rounded-lg border border-white/5 text-xs sm:text-sm text-slate-100 font-medium leading-relaxed italic">
                  "{scene.narration}"
                </div>

                {scene.voiceGuide && (
                  <div className="p-2.5 bg-[#121927] rounded-lg border border-white/5 text-[11px] text-teal-200/90 font-mono">
                    {scene.voiceGuide}
                  </div>
                )}

                {/* 📚 Sumber Ilmu & Arsip Fakta Terverifikasi */}
                {scene.sumberIlmu && (
                  <div className="p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/20 text-xs space-y-1">
                    <div className="flex items-center gap-2 font-bold text-emerald-400">
                      <span>📚 Sumber Ilmu & Arsip Fakta Terverifikasi:</span>
                      <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded text-emerald-300 font-mono font-normal">
                        Anti-Hoax / Fakta Asli
                      </span>
                    </div>
                    <p className="text-slate-200 leading-relaxed font-normal">
                      {scene.sumberIlmu}
                    </p>
                  </div>
                )}
              </div>

              {/* 🖼️ Prompt Gambar ChatGPT (DALL-E) - Ultra Detail 9:16 */}
              <div className="space-y-2 rounded-xl bg-[#0f1422] p-4 border border-rose-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#FE2C55] flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" />
                    🖼️ Prompt Gambar ChatGPT / Midjourney (9:16 Vertikal - Ultra Detail):
                  </span>
                  <span className="text-[10px] text-rose-300 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded font-mono font-bold">
                    {activeStyleName} • 9:16 Vertikal (1080x1920)
                  </span>
                </div>

                <div className="p-3.5 bg-[#090d14] rounded-lg border border-white/5 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed select-all break-words whitespace-pre-line">
                  {scene.imagePrompt}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => copyToClipboard(scene.imagePrompt, `img-${scene.id}`, `Prompt Gambar Scene ${scene.id} (9:16 Vertikal)`)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                      imgCopied
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                        : 'bg-[#FE2C55]/20 hover:bg-[#FE2C55]/30 text-white border border-[#FE2C55]/40'
                    }`}
                  >
                    {imgCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {imgCopied ? 'Tersalin!' : '📋 Copy Prompt Gambar (9:16)'}
                  </button>
                </div>
              </div>

              {/* 🎬 Prompt Video Img2Video - Format Bersih & Aman dari Sensor Pelanggaran FLOW */}
              <div className="space-y-2 rounded-xl bg-[#0f1422] p-4 border border-cyan-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#25F4EE] flex items-center gap-2">
                    <Video className="w-4 h-4" />
                    🎬 Prompt Video Img2Video (9:16 Vertikal • Ada Narasi & Pengisi Suara):
                  </span>
                  <span className="text-[10px] text-cyan-300 bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 rounded font-mono font-bold">
                    {activeStyleName} • 9:16 Vertikal • Suara Konsisten
                  </span>
                </div>

                <div className="p-3.5 bg-[#090d14] rounded-lg border border-white/5 text-xs sm:text-sm text-slate-200 font-mono leading-relaxed select-all break-words whitespace-pre-line">
                  {cleanMotionPromptForFlow(scene.motionPrompt, visualStyle, scene.narration, scene.voiceGuide)}
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    onClick={() => {
                      const safePrompt = cleanMotionPromptForFlow(scene.motionPrompt, visualStyle, scene.narration, scene.voiceGuide);
                      copyToClipboard(safePrompt, `flow-${scene.id}`, `Prompt Motion Scene ${scene.id} (+ Narasi & Suara Konsisten)`);
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition shadow-md ${
                      flowCopied
                        ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                        : 'bg-[#25F4EE]/20 hover:bg-[#25F4EE]/30 text-[#25F4EE] border border-[#25F4EE]/40'
                    }`}
                  >
                    {flowCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {flowCopied ? 'Tersalin!' : '📋 Copy Prompt Motion (+ Narasi & Suara)'}
                  </button>
                </div>
              </div>

              {/* Checklist Status */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-semibold text-slate-400">Status Pekerjaan:</span>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={scene.status.image}
                      onChange={() => toggleStatus(scene.id, 'image')}
                      className="w-4 h-4 rounded text-[#FE2C55] bg-slate-900 border-white/20 focus:ring-0 cursor-pointer accent-[#FE2C55]"
                    />
                    <span className={scene.status.image ? 'text-emerald-400 font-bold' : 'text-slate-300'}>
                      [ ] Gambar Selesai
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={scene.status.flow}
                      onChange={() => toggleStatus(scene.id, 'flow')}
                      className="w-4 h-4 rounded text-[#25F4EE] bg-slate-900 border-white/20 focus:ring-0 cursor-pointer accent-[#25F4EE]"
                    />
                    <span className={scene.status.flow ? 'text-cyan-400 font-bold' : 'text-slate-300'}>
                      [ ] Video FLOW Selesai
                    </span>
                  </label>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Footer Navigation & Actions */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onBackToPlanner}
          className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>← Kembali ke Pembuat Naskah</span>
        </button>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={copyAllPrompts}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white bg-slate-800 hover:bg-slate-700 border border-white/10 transition"
          >
            <Copy className="w-4 h-4 text-[#25F4EE]" />
            <span>Salin Semua Prompt</span>
          </button>

          <button
            onClick={exportAllTxt}
            className="flex items-center justify-center gap-2.5 w-full sm:w-auto px-7 py-3 rounded-xl font-extrabold text-sm text-white bg-gradient-to-r from-[#FE2C55] to-purple-600 hover:opacity-95 shadow-xl shadow-[#FE2C55]/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Semua Prompt (.TXT)</span>
          </button>
        </div>
      </div>

    </div>
  );
}
