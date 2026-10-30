import React, { useState, useRef, useEffect } from 'react';
import { 
  Video, 
  Disc, 
  Play, 
  Pause, 
  Square, 
  Download, 
  RotateCcw, 
  X, 
  Sparkles, 
  CheckCircle2, 
  Film, 
  AlertCircle,
  Volume2,
  VolumeX,
  Layers,
  Zap
} from 'lucide-react';
import CapCutTextOverlay from './CapCutTextOverlay';
import { renderSingleScene } from '../utils/videoStitcher';

/**
 * ScreenRecorderModal
 * Allows the user to record the exact approved (ACC) live preview player in HD,
 * guaranteeing that whatever they see on screen is 100% what gets downloaded.
 */
export default function ScreenRecorderModal({
  isOpen,
  onClose,
  scene,
  addToast
}) {
  // Video playback states - ALL HOOKS CALLED AT TOP LEVEL UNCONDITIONALLY
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(scene?.duration || 10);
  const [isMuted, setIsMuted] = useState(false);

  // Screen recording states
  const [isRecording, setIsRecording] = useState(false);
  const [countdown, setCountdown] = useState(null); // null | 3 | 2 | 1
  const [recordedVideoUrl, setRecordedVideoUrl] = useState(null);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [recordedMime, setRecordedMime] = useState('video/mp4');
  const [isFastRendering, setIsFastRendering] = useState(false);

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const chunksRef = useRef([]);

  // Clean up recorded URL on unmount or close
  useEffect(() => {
    return () => {
      if (recordedVideoUrl) URL.revokeObjectURL(recordedVideoUrl);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [recordedVideoUrl]);

  // Sync duration when scene changes
  useEffect(() => {
    if (isOpen && scene) {
      setCurrentTime(0);
      setIsPlaying(false);
      setIsRecording(false);
      setCountdown(null);
      if (scene.duration) setDuration(scene.duration);
    }
  }, [isOpen, scene?.id]);

  const currentSceneData = scene || {};
  const tc = currentSceneData.textConfig || {};
  const hookTitle = tc.hookTitle || (currentSceneData.title || '').toUpperCase().slice(0, 24);
  const showHookTitle = tc.showHookTitle !== false;
  const emojis = tc.emojis || '👐 📹';
  const showEmojis = tc.showEmojis !== false;
  const captionText = tc.captionText || currentSceneData.captionText || currentSceneData.narration || '';
  const timedWords = tc.timedWords || [];
  const highlightWords = tc.highlightWords || [];
  const highlightColor = tc.highlightColor || '#00FF66';
  const position = tc.position || 'center';
  const fontSize = tc.fontSize || 'lg';
  const stylePreset = tc.stylePreset || 'capcut_green';
  const syncOffset = tc.syncOffset || 0;

  const enhCfg = currentSceneData.enhanceConfig || {};
  const filterStr = `brightness(${enhCfg.lighting ?? 1.1}) contrast(${enhCfg.contrast ?? 1.05}) saturate(${enhCfg.saturation ?? 1.05})`;

  // Video time tracking
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current && !isNaN(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  };

  // Toggle preview play/pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // ─── 🔴 METHOD 1: REAL HD SCREEN RECORDING (getDisplayMedia) ────────────────
  const startScreenRecording = async () => {
    if (!navigator.mediaDevices?.getDisplayMedia) {
      addToast('Browser Anda tidak mendukung perekaman layar otomatis. Gunakan tombol Unduh MP4 Full HD.', 'error');
      return;
    }

    try {
      // 1. Request display stream with audio (compatible across Firefox, Chrome, Edge)
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 60 }
        },
        audio: true
      });

      mediaStreamRef.current = displayStream;

      // Handle user clicking "Stop sharing" in browser native bar
      displayStream.getVideoTracks()[0].onended = () => {
        stopScreenRecording();
      };

      // 2. Countdown 3.. 2.. 1..
      setCountdown(3);
      await new Promise(r => setTimeout(r, 1000));
      setCountdown(2);
      await new Promise(r => setTimeout(r, 1000));
      setCountdown(1);
      await new Promise(r => setTimeout(r, 1000));
      setCountdown(null);

      // 3. Setup MediaRecorder with tested supported MIME
      const mimeCandidates = [
        'video/mp4;codecs=avc1,mp4a.40.2',
        'video/mp4',
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm'
      ];
      let chosenMime = 'video/webm';
      for (const m of mimeCandidates) {
        if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) {
          try {
            const testC = document.createElement('canvas');
            testC.width = 16; testC.height = 16;
            const testS = testC.captureStream(1);
            const testR = new MediaRecorder(testS, { mimeType: m });
            testR.start(10);
            testR.stop();
            chosenMime = m;
            break;
          } catch (_) {}
        }
      }
      setRecordedMime(chosenMime);

      chunksRef.current = [];
      let recorder = null;
      try {
        recorder = new MediaRecorder(displayStream, {
          mimeType: chosenMime,
          videoBitsPerSecond: 16_000_000 // 16 Mbps crystal clear HD
        });
      } catch (_) {
        recorder = new MediaRecorder(displayStream);
        chosenMime = recorder.mimeType || 'video/webm';
        setRecordedMime(chosenMime);
      }

      recorder.ondataavailable = e => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: chosenMime });
        const url = URL.createObjectURL(blob);
        setRecordedBlob(blob);
        setRecordedVideoUrl(url);
        setIsRecording(false);
        addToast('🎉 Rekaman layar selesai! Anda dapat memutar atau langsung mengunduhnya.', 'success');

        // Auto download
        triggerDownload(url, chosenMime);
      };

      mediaRecorderRef.current = recorder;
      recorder.start(100);
      setIsRecording(true);

      // 4. Play video from beginning with unmuted audio
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.muted = isMuted;
        try {
          await videoRef.current.play();
          setIsPlaying(true);
        } catch (_) {}
      }

      addToast('🔴 Sedang merekam layar Scene ' + scene.id + '... Video akan berhenti otomatis saat selesai.', 'info');

    } catch (err) {
      if (err.name !== 'NotAllowedError') {
        console.error('getDisplayMedia error:', err);
        addToast('Gagal memulai perekaman layar: ' + err.message, 'error');
      }
      setCountdown(null);
      setIsRecording(false);
    }
  };

  const stopScreenRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      try { mediaRecorderRef.current.stop(); } catch (_) {}
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => {
        try { t.stop(); } catch (_) {}
      });
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
      try { videoRef.current.pause(); } catch (_) {}
      setIsPlaying(false);
    }
    setIsRecording(false);
  };

  // Video ended -> auto stop recording
  const handleVideoEnded = () => {
    setIsPlaying(false);
    if (isRecording) {
      stopScreenRecording();
    }
  };

  // ─── ⚡ METHOD 2: DIRECT NATIVE 1080×1920 MP4 RENDER (Zero Prompts) ──────────
  const handleFastRender1080p = async () => {
    setIsFastRendering(true);
    addToast('🎬 Memulai rendering Full HD 1080×1920 native...', 'info');
    try {
      const filename = `Scene_${scene.id}_ACC_FullHD_1080p.mp4`;
      const result = await renderSingleScene(scene, {
        filename,
        autoDownload: true
      });
      setRecordedVideoUrl(result.url);
      setRecordedBlob(result.blob);
      setRecordedMime(result.mimeType || 'video/mp4');
      addToast('🎉 File video Full HD (1080×1920) berhasil dirender & diunduh!', 'success');
    } catch (err) {
      if (!err.message?.includes('dibatalkan')) {
        console.error(err);
        addToast('Gagal merender video: ' + (err.message || err), 'error');
      }
    } finally {
      setIsFastRendering(false);
    }
  };

  // Download helper
  const triggerDownload = (url, mime) => {
    const ext = (mime || '').includes('mp4') ? 'mp4' : 'webm';
    const a = document.createElement('a');
    a.href = url || recordedVideoUrl;
    a.download = `Scene_${scene.id}_Hasil_ACC_HD.${ext}`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => document.body.removeChild(a), 250);
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#0b0f19] border border-white/15 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 my-auto max-h-[96vh] flex flex-col justify-between overflow-y-auto">
        
        {/* TOP HEADER */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-red-500/20 text-red-400 font-black text-sm">
                🔴
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                STUDIO REKAM LAYAR HASIL ACC — SCENE {scene.id}
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              Rekam langsung pratinjau yang telah Anda ACC dalam kualitas HD (1080p). Hasil unduhan <strong>100% persis</strong> dengan apa yang Anda tonton di layar!
            </p>
          </div>

          <button
            onClick={() => {
              if (isRecording) stopScreenRecording();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition shrink-0"
            title="Tutup Studio Rekam Layar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MAIN BODY: STAGE + CONTROLS */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* LEFT: 9:16 LIVE RECORDING STAGE (STRICTLY MOBILE ASPECT RATIO) */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-[280px] sm:max-w-[300px] aspect-[9/16] rounded-2xl overflow-hidden bg-black border-2 border-[#00FF66]/60 shadow-2xl flex flex-col justify-between ring-2 ring-[#00FF66]/20">
              
              {/* Recording Indicator Overlay */}
              {isRecording && (
                <div className="absolute top-3 left-3 right-3 z-50 flex items-center justify-between px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-red-500/40 text-[11px] font-bold text-red-400 animate-pulse">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    RECORDING LIVE
                  </span>
                  <span className="font-mono text-white">
                    {Math.floor(currentTime)}s / {Math.floor(duration)}s
                  </span>
                </div>
              )}

              {/* Countdown 3.. 2.. 1.. overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 z-50 bg-black/85 flex flex-col items-center justify-center text-center p-4">
                  <span className="text-6xl sm:text-7xl font-black text-[#00FF66] animate-ping">
                    {countdown}
                  </span>
                  <span className="text-xs font-bold text-slate-300 mt-4 tracking-wider uppercase">
                    Menyiapkan Rekaman Layar...
                  </span>
                </div>
              )}

              {/* Video Element (Live Playback) */}
              <div className="relative flex-1 w-full h-full bg-black flex items-center justify-center overflow-hidden">
                {scene.customVideoUrl ? (
                  <video
                    ref={videoRef}
                    src={scene.customVideoUrl}
                    playsInline
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={handleVideoEnded}
                    style={{ filter: filterStr }}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500">
                    <Film className="w-10 h-10 text-slate-600 mb-2" />
                    <span className="text-xs font-bold text-slate-400">Tidak ada file video</span>
                  </div>
                )}

                {/* ✨ SIGNATURE CAPCUT TIKTOK TEXT OVERLAY TERIKAT DI DALAM STAGE 9:16 */}
                <CapCutTextOverlay
                  hookTitle={hookTitle}
                  showHookTitle={showHookTitle}
                  emojis={emojis}
                  showEmojis={showEmojis}
                  captionText={captionText}
                  timedWords={timedWords}
                  currentTime={Math.max(0, currentTime + syncOffset)}
                  highlightWords={highlightWords}
                  highlightColor={highlightColor}
                  position={position}
                  fontSize={fontSize}
                  stylePreset={stylePreset}
                  isAnimated={isPlaying || isRecording}
                />

                {/* Quick Audio Toggle button */}
                <button
                  type="button"
                  onClick={() => {
                    const next = !isMuted;
                    setIsMuted(next);
                    if (videoRef.current) videoRef.current.muted = next;
                  }}
                  className="absolute bottom-3 right-3 p-1.5 rounded-lg bg-black/70 text-white hover:bg-black/90 transition z-40"
                  title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-[#25F4EE]" />}
                </button>
              </div>

              {/* Bottom Progress Bar */}
              <div className="w-full bg-[#0c1018] px-3 py-1.5 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400 shrink-0">
                <span>00:{String(Math.floor(currentTime)).padStart(2, '0')} / 00:{String(Math.floor(duration)).padStart(2, '0')}</span>
                <span className="text-[#00FF66] font-bold">9:16 (1080×1920 HD)</span>
              </div>
            </div>

            {/* Sub-stage playback controls */}
            <div className="flex items-center gap-2 mt-3">
              <button
                type="button"
                onClick={togglePlay}
                disabled={isRecording}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-200 bg-white/10 hover:bg-white/20 transition disabled:opacity-30"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'Pause' : 'Play Pratinjau'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.currentTime = 0;
                    setCurrentTime(0);
                  }
                }}
                disabled={isRecording}
                className="p-1.5 rounded-lg text-xs text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 transition disabled:opacity-30"
                title="Putar dari awal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* RIGHT: RECORDING OPTIONS & DOWNLOAD PANEL */}
          <div className="md:col-span-7 space-y-4">
            
            {/* JIKA REKAMAN SUDAH SELESAI -> LANGSUNG MUNCUL LAYAR UNDUH UTAMA BESAR DAN MENCILOK! */}
            {recordedVideoUrl ? (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1f15] via-[#0f1924] to-[#0a121d] border-2 border-[#00FF66] shadow-2xl space-y-5 animate-fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-xl bg-[#00FF66]/20 text-[#00FF66] flex items-center justify-center font-black">
                      ✓
                    </span>
                    <div>
                      <h3 className="text-base font-black text-white">REKAMAN SELESAI & SIAP DIUNDUH!</h3>
                      <p className="text-xs text-emerald-400">Hasil rekaman layar persis 100% dengan pratinjau ACC</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#00FF66]/20 text-[#00FF66] text-xs font-mono font-bold">
                    {recordedBlob ? `${(recordedBlob.size / (1024 * 1024)).toFixed(1)} MB` : 'HD'}
                  </span>
                </div>

                {/* Video Player Pratinjau Hasil Rekaman */}
                <div className="rounded-xl overflow-hidden bg-black border border-white/10 aspect-video max-h-48 flex items-center justify-center relative">
                  <video 
                    src={recordedVideoUrl} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* TOMBOL UNDUH UTAMA BESAR DAN MENYALA */}
                <button
                  type="button"
                  onClick={() => triggerDownload(recordedVideoUrl, recordedMime)}
                  className="w-full py-4 px-6 rounded-xl font-black text-base text-slate-950 bg-gradient-to-r from-[#00FF66] via-emerald-300 to-[#25F4EE] hover:opacity-95 shadow-2xl shadow-[#00FF66]/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  <span>📥 UNDUH VIDEO HASIL REKAMAN SEKARANG</span>
                </button>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] text-slate-400">
                    Format: {recordedMime.includes('mp4') ? 'MP4 Full HD' : 'WebM HD'}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (recordedVideoUrl) URL.revokeObjectURL(recordedVideoUrl);
                      setRecordedVideoUrl(null);
                      setRecordedBlob(null);
                    }}
                    className="text-xs font-bold text-slate-400 hover:text-white underline transition"
                  >
                    Rekam Ulang Scene Ini
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* OPTION 1: TRUE LIVE SCREEN RECORDER */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-950/30 via-[#131722] to-[#0e121a] border border-red-500/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-red-500/20 text-red-400 text-xs font-bold">
                      1
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                      🔴 OPSI 1: Rekam Layar Langsung (Pasti 100% Sesuai ACC)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Browser akan merekam pemutaran video dan efek teks kinetik di layar ini dari detik awal hingga selesai secara otomatis.
                  </p>

                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-[11px] text-amber-200/90 leading-relaxed flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>Tips penting:</strong> Saat jendela browser meminta izin layar, pilih <strong>"Tab ini"</strong> dan pastikan centang opsi <strong>"Bagikan audio tab"</strong> agar suara rekaman pembicara ikut terekam.
                    </span>
                  </div>

                  <div className="pt-1">
                    {!isRecording ? (
                      <button
                        type="button"
                        onClick={startScreenRecording}
                        disabled={isFastRendering}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-red-600 via-rose-500 to-red-600 hover:opacity-95 shadow-xl shadow-red-900/30 transition transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40"
                      >
                        <Disc className="w-4 h-4 animate-spin text-white" />
                        <span>MULAI REKAM LAYAR SCENE {scene.id} ➔</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopScreenRecording}
                        className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-black text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-xl shadow-amber-950/40 transition"
                      >
                        <Square className="w-4 h-4 fill-black" />
                        <span>HENTIKAN REKAMAN & SIMPAN HASIL SEKARANG</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* OPTION 2: HIGH-SPEED CANVAS FULL HD 1080×1920 RENDER */}
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-[#131722] to-[#0e121a] border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-emerald-500/20 text-[#00FF66] text-xs font-bold">
                      2
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                      ⚡ OPSI 2: Unduh Render MP4 Full HD (1080×1920) Otomatis
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Render otomatis frame-per-frame ke resolusi murni 1080×1920 Full HD tanpa perlu popup izin layar browser.
                  </p>

                  <button
                    type="button"
                    onClick={handleFastRender1080p}
                    disabled={isRecording || isFastRendering}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#00FF66] via-emerald-400 to-[#25F4EE] hover:opacity-95 shadow-xl shadow-[#00FF66]/20 transition disabled:opacity-40"
                  >
                    <Zap className="w-4 h-4 fill-black" />
                    <span>{isFastRendering ? 'Sedang Merender Full HD...' : `UNDUH MP4 FULL HD 1080×1920 OTOMATIS`}</span>
                  </button>
                </div>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
