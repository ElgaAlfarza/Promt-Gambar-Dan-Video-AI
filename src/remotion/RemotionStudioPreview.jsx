import React, { useRef, useState, useMemo } from 'react';
import { Player } from '@remotion/player';
import { TikTokStoryComposition } from './TikTokSceneComposition';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sliders, 
  Download, 
  Sparkles, 
  Film, 
  Layers, 
  CheckCircle2, 
  Maximize2,
  Volume2,
  VolumeX,
  Palette,
  Type,
  Upload,
  Edit3,
  Clock,
  Copy,
  Video as VideoIcon,
  Check,
  Zap,
  ArrowLeft,
  ExternalLink,
  MonitorPlay,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { stitchAndRenderAllScenes } from '../utils/videoStitcher';
import defaultStoryData from '../../public/storyData.json';

export default function RemotionStudioPreview({
  scenes = [],
  setScenes = () => {},
  topic = '',
  onBackToPlanner = () => {},
  addToast = () => {},
}) {
  const playerRef = useRef(null);
  const fileInputRef = useRef(null);
  const batchFileInputRef = useRef(null);

  // Fallback scenes if empty: check props first, then storyData.json with 10 scenes
  const activeScenes = useMemo(() => {
    const defaultList = defaultStoryData?.scenes || [];
    if (scenes && scenes.length > 1) {
      // Merge with defaultStoryData so any uploaded video file paths (/uploads/...) are retained
      return scenes.map((s, idx) => {
        const def = defaultList[idx] || {};
        return {
          ...def,
          ...s,
          customVideoUrl: s.customVideoUrl || def.customVideoUrl,
          videoUrl: s.videoUrl || def.videoUrl || s.customVideoUrl || def.customVideoUrl,
          videoFileName: s.videoFileName || def.videoFileName,
          duration: s.duration || def.duration || 10,
        };
      });
    }
    if (defaultList.length > 0) {
      return defaultList;
    }
    if (scenes && scenes.length > 0) return scenes;
    return [
      {
        id: 1,
        title: 'Misteri Dimulai',
        narration: 'Ternyata ada rahasia besar yang belum pernah kamu dengar!',
        captionText: 'TERNYATA ADA RAHASIA BESAR YANG BELUM KAMU DENGAR!',
        duration: 10,
        textConfig: { highlightColor: '#25F4EE', position: 'center' }
      }
    ];
  }, [scenes]);

  // Ensure parent scenes state is synced with all 10 scenes
  React.useEffect(() => {
    if ((!scenes || scenes.length <= 1) && defaultStoryData?.scenes?.length > 1) {
      setScenes(defaultStoryData.scenes);
    }
  }, [scenes, setScenes]);

  const fps = 30;
  const totalDurationSeconds = useMemo(() => {
    return activeScenes.reduce((acc, s) => acc + (s.duration || 6), 0);
  }, [activeScenes]);

  const totalFrames = Math.max(30, Math.round(totalDurationSeconds * fps));

  // Player controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [zoomLevel, setZoomLevel] = useState('fit'); // 'fit', '75%', '100%'
  const [highlightColor, setHighlightColor] = useState('#25F4EE');
  const [captionPosition, setCaptionPosition] = useState('center');
  const [selectedStylePreset, setSelectedStylePreset] = useState('capcut_bold');
  const [selectedFontSize, setSelectedFontSize] = useState('md');
  const [showHookTitle, setShowHookTitle] = useState(true);
  const [selectedVideoFilter, setSelectedVideoFilter] = useState('none');
  const [activeEditingSceneId, setActiveEditingSceneId] = useState(1);
  const [uploadTargetSceneId, setUploadTargetSceneId] = useState(null);

  // Studio Mode: 'official' (Full Remotion Studio GUI) vs 'quick' (Quick Split Panel)
  const [studioTab, setStudioTab] = useState('quick');
  const [isRemotionRunning, setIsRemotionRunning] = useState(true);
  const [isSyncingRemotion, setIsSyncingRemotion] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  // Render export state
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStageText, setExportStageText] = useState('');
  const [exportedVideoUrl, setExportedVideoUrl] = useState(null);

  // Check Remotion Studio server status on port 3100
  React.useEffect(() => {
    fetch('/api/remotion/status')
      .then(r => r.json())
      .then(d => setIsRemotionRunning(Boolean(d.running)))
      .catch(() => setIsRemotionRunning(false));
  }, []);

  // Sync to Remotion JSON file
  const syncToRemotionStudio = async (showNotification = false) => {
    setIsSyncingRemotion(true);
    try {
      await fetch('/api/remotion/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenes: compositionScenes, topic })
      });
      setIsSyncingRemotion(false);
      setIframeKey(k => k + 1);
      if (showNotification) {
        addToast('Data naskah & klip berhasil disinkronkan ke Remotion Studio!', 'success');
      }
    } catch (_) {
      setIsSyncingRemotion(false);
    }
  };

  // Modified scenes with real-time UI overrides
  const compositionScenes = useMemo(() => {
    return activeScenes.map(s => ({
      ...s,
      videoFilter: s.videoFilter || selectedVideoFilter,
      textConfig: {
        ...(s.textConfig || {}),
        highlightColor: highlightColor || s.textConfig?.highlightColor || '#25F4EE',
        position: captionPosition || s.textConfig?.position || 'center',
        stylePreset: selectedStylePreset || s.textConfig?.stylePreset || 'capcut_bold',
        fontSize: selectedFontSize || s.textConfig?.fontSize || 'md',
        showHookTitle: showHookTitle,
      }
    }));
  }, [activeScenes, highlightColor, captionPosition, selectedStylePreset, selectedFontSize, showHookTitle, selectedVideoFilter]);

  const formatTimecode = (frame) => {
    const totalSec = Math.floor(frame / fps);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    const f = frame % fps;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}:${String(f).padStart(2, '0')}`;
  };

  // Seek to specific scene start in Remotion Player
  const jumpToScene = (sceneIndex) => {
    const prevDuration = compositionScenes.slice(0, sceneIndex).reduce((a, b) => a + (b.duration || 6), 0);
    const targetFrame = Math.round(prevDuration * fps);
    playerRef.current?.seekTo(targetFrame);
    setCurrentFrame(targetFrame);
    setActiveEditingSceneId(compositionScenes[sceneIndex]?.id || 1);
  };

  // Calculate which scene is currently active during playback
  const currentPlayingScene = useMemo(() => {
    let accumulated = 0;
    const currentSec = currentFrame / fps;
    for (let i = 0; i < compositionScenes.length; i++) {
      const s = compositionScenes[i];
      const dur = s.duration || 6;
      if (currentSec >= accumulated && currentSec < accumulated + dur) {
        return { index: i, scene: s };
      }
      accumulated += dur;
    }
    return { index: 0, scene: compositionScenes[0] };
  }, [currentFrame, fps, compositionScenes]);

  const handlePlayFromStart = () => {
    playerRef.current?.seekTo(0);
    setCurrentFrame(0);
    playerRef.current?.play();
    setIsPlaying(true);
    setActiveEditingSceneId(compositionScenes[0]?.id || 1);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      playerRef.current?.pause();
      setIsPlaying(false);
    } else {
      playerRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handlePrevScene = () => {
    const prevIdx = Math.max(0, currentPlayingScene.index - 1);
    jumpToScene(prevIdx);
  };

  const handleNextScene = () => {
    const nextIdx = Math.min(compositionScenes.length - 1, currentPlayingScene.index + 1);
    jumpToScene(nextIdx);
  };

  // Sync active editing scene with playback so inspector updates as scenes transition
  React.useEffect(() => {
    if (isPlaying && currentPlayingScene?.scene?.id) {
      setActiveEditingSceneId(currentPlayingScene.scene.id);
    }
  }, [isPlaying, currentPlayingScene?.scene?.id]);

  // Upload file to server in background for persistent storage & Remotion Studio compatibility
  const uploadVideoToServer = async (file, sceneId) => {
    try {
      const resp = await fetch(`/api/remotion/upload?filename=${encodeURIComponent(file.name)}`, {
        method: 'POST',
        body: file,
      });
      const data = await resp.json();
      if (data.success && data.url) {
        let updatedList = [];
        setScenes(prev => {
          const base = (prev && prev.length > 0) ? prev : activeScenes;
          updatedList = base.map(s => {
            if (s.id === sceneId) {
              return {
                ...s,
                customVideoUrl: data.url,
                videoUrl: data.url,
                isAcc: true,
              };
            }
            return s;
          });
          return updatedList;
        });

        // Auto-sync to storyData.json so Remotion Studio and render CLI immediately see the new clip
        fetch('/api/remotion/sync', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scenes: updatedList, topic })
        }).catch(() => {});
      }
    } catch (err) {
      console.warn('Background server upload note:', err);
    }
  };

  // Handle uploading video clip for a specific scene
  const handleUploadVideoForScene = (e) => {
    const file = e.target.files?.[0];
    const targetId = uploadTargetSceneId || activeEditingSceneId || 1;
    if (!file) return;

    // 1. Instant preview via local blob
    const url = URL.createObjectURL(file);
    setScenes(prev => {
      const base = (prev && prev.length > 0) ? prev : activeScenes;
      return base.map(s => {
        if (s.id === targetId) {
          return {
            ...s,
            customVideoUrl: url,
            videoUrl: url,
            videoFileName: file.name,
            isAcc: true,
            status: { ...(s.status || {}), flow: true, inspected: true }
          };
        }
        return s;
      });
    });

    // 2. Jump player directly to this scene so user immediately sees it
    const sceneIdx = compositionScenes.findIndex(s => s.id === targetId);
    if (sceneIdx >= 0) {
      setTimeout(() => jumpToScene(sceneIdx), 100);
    }

    // 3. Persist to server in background
    uploadVideoToServer(file, targetId);

    addToast(`Video klip Scene ${targetId} (${file.name}) berhasil dipasang!`, 'success');
    e.target.value = '';
  };

  // Handle uploading multiple video files from FLOW at once
  const handleBatchUploadVideos = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Natural sort files by filename (e.g. scene1, scene2, scene10)
    files.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' }));

    setScenes(prev => {
      const base = (prev && prev.length > 0) ? prev : activeScenes;
      return base.map((s, idx) => {
        if (files[idx]) {
          const file = files[idx];
          const url = URL.createObjectURL(file);
          // Upload to server in background
          uploadVideoToServer(file, s.id);
          return {
            ...s,
            customVideoUrl: url,
            videoUrl: url,
            videoFileName: file.name,
            isAcc: true,
            status: { ...(s.status || {}), flow: true, inspected: true }
          };
        }
        return s;
      });
    });

    // Jump to Scene 1
    setTimeout(() => jumpToScene(0), 100);

    addToast(`Berhasil memasang ${files.length} file video dari FLOW ke timeline!`, 'success');
    e.target.value = '';
  };

  // Handle updating scene text / narration
  const handleUpdateSceneText = (sceneId, newText) => {
    setScenes(prev => {
      const base = (prev && prev.length > 0) ? prev : activeScenes;
      return base.map(s => {
        if (s.id === sceneId) {
          return {
            ...s,
            captionText: newText.toUpperCase(),
            narration: newText
          };
        }
        return s;
      });
    });
  };

  // Handle updating scene duration
  const handleUpdateSceneDuration = (sceneId, newDuration) => {
    const dur = Math.max(2, Math.min(30, Number(newDuration) || 6));
    setScenes(prev => {
      const base = (prev && prev.length > 0) ? prev : activeScenes;
      return base.map(s => {
        if (s.id === sceneId) {
          return { ...s, duration: dur };
        }
        return s;
      });
    });
  };

  // Render & Export MP4
  const handleStartExport = async () => {
    setIsExporting(true);
    setExportProgress(5);
    setExportStageText('Menyiapkan kompilasi Remotion scene...');
    setExportedVideoUrl(null);

    const cancelSignal = { cancelled: false };

    try {
      const result = await stitchAndRenderAllScenes(compositionScenes, {
        topic,
        filename: `${(topic || 'TikTok_Story').replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '_')}_Final.mp4`,
        bgmActive: false,
        selectedMusic: 'misteri_bima',
        musicVol: 10,
        sfxActive: false,
        onProgress: (p, stageOrCurrent, totalScenes, currentSec, totalSec) => {
          setExportProgress(p);
          if (typeof stageOrCurrent === 'string') {
            setExportStageText(stageOrCurrent);
          } else if (stageOrCurrent && totalScenes) {
            setExportStageText(`Menyambung Scene ${stageOrCurrent}/${totalScenes} (${Math.round(currentSec || 0)}s / ${Math.round(totalSec || 0)}s)...`);
          } else {
            setExportStageText(`Memproses render (${p}%)...`);
          }
        },
        cancelSignal
      });

      const videoUrl = result?.url || (result?.blob ? URL.createObjectURL(result.blob) : (result instanceof Blob ? URL.createObjectURL(result) : null));
      if (videoUrl) {
        setExportedVideoUrl(videoUrl);
      }
      setExportProgress(100);
      setExportStageText('✅ Selesai! File video berhasil di-render dan diunduh.');
      setIsExporting(false);
      addToast('Video MP4 berhasil di-render dan siap diunduh!', 'success');
    } catch (err) {
      if (err.message && (err.message.includes('dibatalkan') || err.message.includes('cancel'))) {
        setIsExporting(false);
        setExportProgress(0);
        setExportStageText('Render dibatalkan oleh pengguna.');
        addToast('Proses render video telah dibatalkan.', 'info');
        return;
      }
      console.error('Export error:', err);
      setIsExporting(false);
      addToast(`Gagal render: ${err.message}`, 'error');
    }
  };

  // Official Remotion CLI Rendering Engine (Headless Chromium, Exact Remotion Output)
  const handleRenderWithOfficialRemotion = async () => {
    setIsExporting(true);
    setExportProgress(15);
    setExportStageText('Menyiapkan engine render resmi Remotion...');
    setExportedVideoUrl(null);

    try {
      // 1. Sync data to storyData.json
      await fetch('/api/remotion/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ scenes: compositionScenes, topic })
      });

      setExportProgress(40);
      setExportStageText('Remotion CLI sedang merender video MP4 Full HD 1080x1920 (Headless Chromium)...');

      const resp = await fetch('/api/remotion/render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, scenes: compositionScenes })
      });

      const data = await resp.json();
      if (!resp.ok || !data.success) {
        throw new Error(data.error || 'Gagal render dengan Remotion CLI');
      }

      setExportProgress(100);
      setExportStageText('✅ Selesai! File video berhasil dirender dengan engine Remotion resmi.');
      setExportedVideoUrl(data.downloadUrl);
      setIsExporting(false);
      addToast('Video MP4 berhasil dirender dengan engine Remotion resmi!', 'success');

      // Auto download
      const a = document.createElement('a');
      a.href = data.downloadUrl;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => document.body.removeChild(a), 300);
    } catch (err) {
      console.error('Remotion render error:', err);
      setIsExporting(false);
      addToast(`Gagal render Remotion: ${err.message}`, 'error');
    }
  };

  // Copy TikTok caption & hashtags
  const handleCopyTikTokCaption = () => {
    const tags = '#TikTokEdu #FaktaUnik #ViralIndonesia #SainsPopuler #BelajarOnline #Remotion';
    const text = `${topic || 'Fakta Menarik Hari Ini'}\n\nKomen pendapat kamu di bawah!\n\n${tags}`;
    navigator.clipboard.writeText(text);
    addToast('Caption & Hashtag TikTok berhasil disalin!', 'success');
  };

  const activeSceneItem = compositionScenes.find(s => s.id === activeEditingSceneId) || compositionScenes[0];

  return (
    <div className="w-full bg-[#0a0d14] text-white rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
      
      {/* Hidden file input for uploading scene video */}
      <input
        type="file"
        ref={fileInputRef}
        accept="video/mp4,video/webm,video/quicktime,video/mov"
        className="hidden"
        onChange={handleUploadVideoForScene}
      />

      {/* Hidden file input for batch uploading multiple scene videos */}
      <input
        type="file"
        ref={batchFileInputRef}
        multiple
        accept="video/mp4,video/webm,video/quicktime,video/mov"
        className="hidden"
        onChange={handleBatchUploadVideos}
      />

      {/* Studio Topbar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#0f141f] border-b border-white/10 gap-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-500/20 to-[#25F4EE]/20 border border-indigo-500/40 text-[#25F4EE] text-xs font-black tracking-wider uppercase shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25F4EE] animate-pulse"></span>
            Remotion Studio v4.0
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white truncate max-w-sm">
              {topic || 'TikTok Vertical 9:16 Video'}
            </h2>
            <p className="text-[11px] text-slate-400">
              Ditenagai Engine Resmi Remotion (remotion-dev/remotion) • Port 3100
            </p>
          </div>
        </div>

        {/* Tab Switcher & Quick Links */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center bg-black/60 rounded-xl p-1 border border-white/10 text-xs">
            <button
              onClick={() => setStudioTab('quick')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                studioTab === 'quick'
                  ? 'bg-gradient-to-r from-indigo-600 to-[#25F4EE]/80 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#25F4EE]" />
              <span>Panel Klip & Teks Kreatif</span>
              <span className="px-1.5 py-0.2 bg-[#25F4EE]/20 text-[#25F4EE] text-[9px] rounded font-mono font-bold">Edit Di Sini</span>
            </button>
            <button
              onClick={() => setStudioTab('official')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                studioTab === 'official'
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MonitorPlay className="w-3.5 h-3.5 text-indigo-400" />
              <span>Studio Resmi Remotion</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          </div>

          {/* External Link to Port 3100 */}
          <a
            href="http://localhost:3100/TikTokStory"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition"
            title="Buka Remotion Studio di Tab Baru"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#25F4EE]" />
            <span className="hidden sm:inline">Buka Tab Penuh</span>
          </a>

          <div className="text-xs text-slate-300 bg-black/40 px-3.5 py-1.5 rounded-xl border border-white/10 font-mono flex items-center gap-2">
            <span className="text-emerald-400 font-bold">{fps} FPS</span>
            <span className="text-slate-600">•</span>
            <span>1080×1920 (9:16)</span>
          </div>
        </div>
      </div>

      {/* 💡 Banner Panduan Lengkap Memasukkan Video FLOW & Editing Teks */}
      <div className="m-4 sm:m-6 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-indigo-950/40 to-slate-900 border border-cyan-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#25F4EE]/15 border border-[#25F4EE]/30 text-[#25F4EE] flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              Panduan Memasukkan Video FLOW & Menambahkan Teks Kreatif
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-[#25F4EE] font-bold text-[10px] flex items-center justify-center shrink-0">1</span>
                <span>Klik tab <strong className="text-[#25F4EE]">Panel Klip & Teks Kreatif</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0">2</span>
                <span>Upload video FLOW per scene atau gunakan <strong>Batch Upload</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 font-bold text-[10px] flex items-center justify-center shrink-0">3</span>
                <span>Pilih gaya teks CapCut/Neon, posisi, warna, lalu Render MP4!</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto">
          <button
            onClick={() => batchFileInputRef.current?.click()}
            className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:opacity-95 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition"
            title="Pilih beberapa file video hasil FLOW sekaligus"
          >
            <Upload className="w-3.5 h-3.5 text-[#25F4EE]" />
            Upload Video Sekaligus (Batch)
          </button>
        </div>
      </div>

      {/* 🎬 MODE 1: OFFICIAL REMOTION STUDIO VIEW (remotion-dev/remotion) */}
      {studioTab === 'official' && (
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0d131f] p-4 rounded-2xl border border-indigo-500/30">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></span>
              <div>
                <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
                  Official Remotion Studio Interface
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono border border-emerald-500/30">
                    Live Engine (Port 3100)
                  </span>
                </h4>
                <p className="text-xs text-slate-400">
                  Gunakan timeline multi-track visual resmi Remotion, keyframes, audio scrub, Sequence editor, serta render video langsung dari Chromium engine.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => syncToRemotionStudio(true)}
                disabled={isSyncingRemotion}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#25F4EE] ${isSyncingRemotion ? 'animate-spin' : ''}`} />
                {isSyncingRemotion ? 'Menyinkronkan...' : 'Sinkronkan Naskah AI'}
              </button>

              <button
                onClick={handleRenderWithOfficialRemotion}
                disabled={isExporting}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-[#FE2C55] hover:opacity-95 text-xs font-black text-white flex items-center gap-1.5 shadow-lg shadow-indigo-500/20 transition"
              >
                <Zap className="w-3.5 h-3.5 text-[#25F4EE]" />
                {isExporting ? 'Sedang Render...' : '⚡ Render MP4 Resmi Remotion'}
              </button>
            </div>
          </div>

          {/* Export Progress Bar if rendering */}
          {isExporting && (
            <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/40 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-indigo-200">{exportStageText}</span>
                <span className="font-mono text-indigo-300 font-bold">{exportProgress}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-[#25F4EE] transition-all duration-300"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Download button if finished */}
          {exportedVideoUrl && (
            <a
              href={exportedVideoUrl}
              download={`${(topic || 'tiktok-video').replace(/\s+/g, '_')}_remotion.mp4`}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition animate-bounce"
            >
              <Download className="w-4 h-4" />
              💾 Download Video Remotion Final (.MP4)
            </a>
          )}

          {/* Embedded Remotion Studio Viewport */}
          <div className="w-full h-[780px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#07090e]">
            <iframe
              key={iframeKey}
              src="http://localhost:3100/TikTokStory"
              title="Official Remotion Studio"
              className="w-full h-full border-0"
              allow="autoplay; camera; microphone"
            />
          </div>
        </div>
      )}

      {/* 📱 MODE 2: QUICK PANEL (Clip Upload & Quick Text Editor) */}
      {studioTab === 'quick' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left / Center: Remotion Player Viewport (Col 7) */}
        <div className="lg:col-span-7 bg-[#070a0f] p-6 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-white/10">
          
          {/* 9:16 Canvas Viewport */}
          <div 
            className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/15 bg-black flex items-center justify-center transition-all duration-300"
            style={{
              width: zoomLevel === 'fit' ? '320px' : zoomLevel === '75%' ? '360px' : '400px',
              maxWidth: '100%',
              aspectRatio: '9/16',
            }}
          >
            <Player
              ref={playerRef}
              component={TikTokStoryComposition}
              inputProps={{
                scenes: compositionScenes,
              }}
              durationInFrames={totalFrames}
              fps={fps}
              compositionWidth={1080}
              compositionHeight={1920}
              style={{
                width: '100%',
                height: '100%',
              }}
              controls
              autoPlay={false}
              loop
              acknowledgeRemotionLicense
              onError={(err) => {
                console.warn('Remotion Player media error handled gracefully:', err);
              }}
              onAutoPlayError={(err) => {
                console.warn('Remotion AutoPlay prevented:', err);
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onFrameUpdate={(f) => setCurrentFrame(f)}
            />
          </div>

          {/* Quick Playback & Navigation Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 bg-black/60 px-3 py-2 rounded-2xl border border-white/10 shadow-lg">
            <button
              onClick={handlePlayFromStart}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-[#25F4EE] hover:opacity-95 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition active:scale-95"
              title="Putar semua 10 scene sekaligus dari awal sampai akhir"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Putar Semua dari Awal</span>
            </button>

            <button
              onClick={handleTogglePlay}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center gap-1.5 transition active:scale-95"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <div className="h-4 w-px bg-white/15 mx-1 hidden sm:block"></div>

            <button
              onClick={handlePrevScene}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition active:scale-95"
              title="Scene Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-[11px] font-mono text-slate-300 px-2 font-bold">
              Scene <span className="text-[#25F4EE] font-black">{currentPlayingScene.index + 1}</span> / {compositionScenes.length}
            </div>

            <button
              onClick={handleNextScene}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition active:scale-95"
              title="Scene Selanjutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Timeline & Scene Track Scrubber */}
          <div className="w-full max-w-2xl mt-5 px-2">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-1.5 font-mono">
              <span className="text-indigo-400 font-bold">{formatTimecode(currentFrame)} ({currentFrame}f)</span>
              <span className="text-slate-400">Total Durasi: {formatTimecode(totalFrames)} ({totalFrames}f)</span>
            </div>
            
            {/* Multi-Scene Timeline Blocks */}
            <div className="flex gap-1.5 h-4 w-full bg-slate-900/90 rounded-xl p-1 border border-white/15 overflow-hidden">
              {compositionScenes.map((s, idx) => {
                const sDuration = s.duration || 6;
                const pct = (sDuration / totalDurationSeconds) * 100;
                const isSelected = s.id === activeEditingSceneId;
                const hasVideo = Boolean(s.customVideoUrl || s.videoUrl);

                return (
                  <div
                    key={s.id || idx}
                    style={{ width: `${pct}%` }}
                    className={`h-full rounded-md transition-all cursor-pointer relative group flex items-center justify-center ${
                      isSelected
                        ? 'ring-2 ring-white bg-gradient-to-r from-indigo-500 to-[#25F4EE]'
                        : hasVideo
                        ? 'bg-gradient-to-r from-emerald-600 to-teal-500 opacity-80 hover:opacity-100'
                        : 'bg-gradient-to-r from-slate-700 to-slate-600 opacity-60 hover:opacity-100'
                    }`}
                    title={`Scene ${s.id}: ${s.title || ''} (${sDuration}s)`}
                    onClick={() => jumpToScene(idx)}
                  >
                    <span className="text-[9px] font-black text-white/90 truncate px-1">
                      {s.id}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span> Video Terpasang
                <span className="w-2 h-2 rounded-full bg-slate-500 ml-2"></span> Background AI
              </span>
              <span>{compositionScenes.length} Scene Terangkai</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Remotion Scene Inspector & Editor (Col 5) */}
        <div className="lg:col-span-5 bg-[#0c1017] p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            
            {/* Header Bagian Edit */}
            <div className="border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-[#25F4EE]" />
                  Edit Scene Terpilih: #{activeSceneItem.id}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-slate-300">
                  {activeSceneItem.duration || 6} Detik
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Ganti video atau edit teks naskah untuk scene ini secara instan di Remotion.
              </p>
            </div>

            {/* Video Attachment Box per Scene */}
            <div className="p-4 rounded-2xl bg-[#141926] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <VideoIcon className="w-4 h-4 text-emerald-400" />
                  Klip Video Scene {activeSceneItem.id}:
                </span>
                {activeSceneItem.customVideoUrl ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    ✓ Video Aktif
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Animasi Default
                  </span>
                )}
              </div>

              <div className="text-xs text-slate-400 space-y-2">
                {activeSceneItem.videoFileName ? (
                  <p className="font-mono text-slate-200 truncate bg-black/30 p-2 rounded-lg border border-white/5">
                    📁 {activeSceneItem.videoFileName}
                  </p>
                ) : (
                  <p className="italic text-slate-500">Belum ada file video FLOW/klip yang di-upload untuk scene ini.</p>
                )}

                {activeSceneItem.customVideoUrl && (
                  <div className="relative w-full h-36 rounded-xl overflow-hidden border border-emerald-500/30 bg-black shadow-inner">
                    <video
                      key={activeSceneItem.customVideoUrl}
                      src={activeSceneItem.customVideoUrl}
                      className="w-full h-full object-cover"
                      controls
                      muted
                      playsInline
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 text-emerald-400 font-mono text-[9px] font-bold border border-emerald-500/30 pointer-events-none">
                      Preview Klip #{activeSceneItem.id}
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setUploadTargetSceneId(activeSceneItem.id);
                    fileInputRef.current?.click();
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-bold text-white flex items-center justify-center gap-1.5 transition"
                >
                  <Upload className="w-3.5 h-3.5 text-[#25F4EE]" />
                  {activeSceneItem.customVideoUrl ? 'Ganti Video Scene' : 'Upload Video (.mp4)'}
                </button>

                <button
                  onClick={() => batchFileInputRef.current?.click()}
                  className="py-2.5 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 border border-indigo-500/40 text-xs font-bold text-indigo-300 flex items-center justify-center gap-1.5 transition"
                  title="Upload beberapa video hasil FLOW sekaligus"
                >
                  <Layers className="w-3.5 h-3.5 text-indigo-400" />
                  Upload Batch (Semua)
                </button>
              </div>
            </div>

            {/* Edit Subtitle & Narasi Scene Ini */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-200 block flex items-center justify-between">
                <span>Teks Subtitle & Narasi:</span>
                <span className="text-[10px] text-slate-400 font-normal">Tampil dinamis di layar 9:16</span>
              </label>
              <textarea
                rows={3}
                value={activeSceneItem.narration || activeSceneItem.captionText || ''}
                onChange={(e) => handleUpdateSceneText(activeSceneItem.id, e.target.value)}
                className="w-full p-3 rounded-xl bg-[#141926] border border-white/10 text-xs text-slate-100 focus:outline-none focus:border-[#25F4EE] transition font-medium"
                placeholder="Ketik narasi atau kata-kata subtitle..."
              />
            </div>

            {/* Durasi Scene */}
            <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-[#141926] border border-white/10">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-200">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>Durasi Scene Ini:</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="2"
                  max="30"
                  value={activeSceneItem.duration || 6}
                  onChange={(e) => handleUpdateSceneDuration(activeSceneItem.id, e.target.value)}
                  className="w-16 px-2.5 py-1 rounded-lg bg-black/40 border border-white/15 text-xs text-center font-bold text-white focus:outline-none focus:border-[#25F4EE]"
                />
                <span className="text-xs text-slate-400">detik</span>
              </div>
            </div>

            {/* 🌟 1. Gaya Preset Teks Kreatif */}
            <div className="space-y-2.5 pt-2 border-t border-white/10">
              <label className="text-xs font-bold text-slate-200 block flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5 text-[#25F4EE]" />
                  Gaya Teks Kreatif (CapCut / Remotion):
                </span>
                <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">{selectedStylePreset.replace('_', ' ')}</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'capcut_bold', name: 'CapCut Bold Pop', desc: 'Huruf tebal outline hitam' },
                  { id: 'neon_glow', name: 'Neon Cyber Glow', desc: 'Cahaya berpendar futuristik' },
                  { id: 'retro_yellow', name: 'Retro Yellow Box', desc: 'Kotak kuning klasik viral' },
                  { id: 'clean_modern', name: 'Clean Minimalist', desc: 'Putih elegan bayangan halus' }
                ].map(preset => (
                  <button
                    key={preset.id}
                    onClick={() => setSelectedStylePreset(preset.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedStylePreset === preset.id
                        ? 'border-[#25F4EE] bg-[#25F4EE]/15 shadow-md shadow-cyan-500/10'
                        : 'border-white/10 bg-[#141926] hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-black text-white block">{preset.name}</span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">{preset.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 🌟 2. Posisi Teks & Ukuran Huruf */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 block">Posisi Subtitle:</label>
                <div className="flex bg-[#141926] p-1 rounded-xl border border-white/10">
                  {[
                    { id: 'top', label: 'Atas' },
                    { id: 'center', label: 'Tengah' },
                    { id: 'bottom', label: 'Bawah' }
                  ].map(pos => (
                    <button
                      key={pos.id}
                      onClick={() => setCaptionPosition(pos.id)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                        captionPosition === pos.id
                          ? 'bg-[#25F4EE] text-slate-950 shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-300 block">Ukuran Font:</label>
                <div className="flex bg-[#141926] p-1 rounded-xl border border-white/10">
                  {[
                    { id: 'sm', label: 'Sedang' },
                    { id: 'md', label: 'Besar' },
                    { id: 'lg', label: 'Jumbo' }
                  ].map(sz => (
                    <button
                      key={sz.id}
                      onClick={() => setSelectedFontSize(sz.id)}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition ${
                        selectedFontSize === sz.id
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {sz.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 🌟 3. Warna Highlight Kata TikTok & Toggle Badge */}
            <div className="space-y-3 pt-2 border-t border-white/10">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#FE2C55]" />
                  Warna Highlight Kata:
                </label>
                <button
                  onClick={() => setShowHookTitle(!showHookTitle)}
                  className={`text-[10px] px-2.5 py-1 rounded-lg border font-bold transition flex items-center gap-1 ${
                    showHookTitle
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : 'bg-white/5 border-white/10 text-slate-500'
                  }`}
                >
                  <span>Badge Judul:</span>
                  <span>{showHookTitle ? 'Aktif' : 'Nonaktif'}</span>
                </button>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {[
                  { name: 'Cyan', color: '#25F4EE' },
                  { name: 'Kuning', color: '#FFE600' },
                  { name: 'Hijau', color: '#00FF66' },
                  { name: 'Merah', color: '#FE2C55' },
                  { name: 'Ungu', color: '#A855F7' },
                  { name: 'Oranye', color: '#FB923C' }
                ].map(c => (
                  <button
                    key={c.color}
                    onClick={() => setHighlightColor(c.color)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-xs font-bold transition-all ${
                      highlightColor === c.color
                        ? 'border-white bg-white/15 shadow-md'
                        : 'border-white/10 bg-black/30 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full shadow" style={{ backgroundColor: c.color }}></span>
                    <span className="text-[9px]">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 🌟 4. Filter Nuansa Visual Video */}
            <div className="space-y-2 pt-2 border-t border-white/10">
              <label className="text-xs font-bold text-slate-200 block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Filter Nuansa Video:
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {[
                  { id: 'none', label: 'Asli' },
                  { id: 'cinematic', label: 'Sinematik' },
                  { id: 'warm', label: 'Sunset' },
                  { id: 'vibrant', label: 'Vibrant' },
                  { id: 'moody', label: 'Moody' }
                ].map(flt => (
                  <button
                    key={flt.id}
                    onClick={() => setSelectedVideoFilter(flt.id)}
                    className={`py-1.5 rounded-lg border text-[11px] font-bold transition ${
                      selectedVideoFilter === flt.id
                        ? 'border-[#25F4EE] bg-[#25F4EE]/15 text-[#25F4EE]'
                        : 'border-white/10 bg-black/30 hover:border-white/20 text-slate-400'
                    }`}
                  >
                    {flt.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Action Footer: Render Final & Copy Caption */}
          <div className="pt-4 border-t border-white/10 space-y-3">
            
            {/* Progress Bar Render */}
            {isExporting && (
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-indigo-300">{exportStageText}</span>
                  <span className="font-mono text-indigo-200 font-bold">{exportProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-[#25F4EE] transition-all duration-300"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Tombol Unduh Jika Render Selesai */}
            {exportedVideoUrl && (
              <a
                href={exportedVideoUrl}
                download={`${(topic || 'tiktok-video').replace(/\s+/g, '_')}_remotion.mp4`}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition animate-bounce"
              >
                <Download className="w-4 h-4" />
                💾 Download Video Final (.MP4)
              </a>
            )}

            {/* Tombol Render Final Utama */}
            <button
              onClick={handleStartExport}
              disabled={isExporting}
              className={`w-full py-3.5 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition ${
                isExporting
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-[#FE2C55] hover:opacity-95 text-white shadow-indigo-500/25'
              }`}
            >
              <Zap className="w-4 h-4 text-[#25F4EE]" />
              {isExporting ? 'Sedang Render Video...' : '⚡ Render MP4 Resmi Remotion (Rekomendasi)'}
            </button>

            <div className="flex gap-2">
              <button
                onClick={handleCopyTikTokCaption}
                className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 flex items-center justify-center gap-1.5 transition"
              >
                <Copy className="w-3.5 h-3.5 text-cyan-400" />
                Salin Caption & Tags
              </button>

              <button
                onClick={onBackToPlanner}
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-slate-400 flex items-center justify-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Kembali
              </button>
            </div>
          </div>

        </div>

      </div>
      )}

    </div>
  );
}
