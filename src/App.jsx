import React, { useState } from 'react';
import { Film, Sparkles } from 'lucide-react';
import Header from './components/Header';
import Screen1ScriptPlanner from './components/Screen1ScriptPlanner';
import Screen2PromptCenter from './components/Screen2PromptCenter';
import GeminiApiKeyModal from './components/GeminiApiKeyModal';
import Toast from './components/Toast';
import { 
  generateScriptForTopic, 
  VISUAL_STYLES, 
  STORY_TEMPLATES 
} from './data/storyPresets';
import { 
  DEFAULT_API_KEY,
  getStoredApiKey, 
  getStoredModel, 
  generateStoryWithGemini,
  researchFactsWithNotebookLMAgent
} from './utils/geminiService';

export default function App() {
  const [topic, setTopic] = useState(() => {
    try {
      const saved = localStorage.getItem('tiktok_copilot_topic');
      if (saved !== null) return saved;
    } catch (e) {}
    return ''; // Default: TIDAK ADA TOPIK OTOMATIS (KOSONG)
  });

  const [scenes, setScenes] = useState(() => {
    try {
      const saved = localStorage.getItem('tiktok_copilot_scenes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Clean expired blob URLs on reload so Remotion player won't try to open dead channels
          return parsed.map(s => ({
            ...s,
            customVideoUrl: s.customVideoUrl?.startsWith('blob:') ? null : s.customVideoUrl,
            videoUrl: s.videoUrl?.startsWith('blob:') ? null : s.videoUrl,
            audioUrl: s.audioUrl?.startsWith('blob:') ? null : s.audioUrl,
          }));
        }
      }
    } catch (e) {}
    return []; // Default: KOSONG
  });

  const [currentStep, setCurrentStep] = useState(() => {
    try {
      const saved = localStorage.getItem('tiktok_copilot_step');
      const num = Number(saved);
      if (num === 1 || num === 2) return num;
    } catch (e) {}
    return 1;
  });

  const [completedSteps, setCompletedSteps] = useState(() => {
    try {
      const saved = localStorage.getItem('tiktok_copilot_completed_steps');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [1];
  });

  const [sceneCount, setSceneCount] = useState(() => {
    try {
      const saved = localStorage.getItem('tiktok_copilot_scene_count');
      if (saved) return Number(saved) || 10;
    } catch (e) {}
    return 10;
  });

  const [visualStyle, setVisualStyle] = useState(() => {
    try {
      return localStorage.getItem('tiktok_copilot_visual_style') || 'claymation';
    } catch (e) {
      return 'claymation';
    }
  });

  const [selectedSceneId, setSelectedSceneId] = useState(() => {
    try {
      const saved = localStorage.getItem('tiktok_copilot_selected_scene_id');
      if (saved) return Number(saved) || 1;
    } catch (e) {}
    return 1;
  });

  const [sceneMode, setSceneMode] = useState(() => {
    try {
      return localStorage.getItem('tiktok_copilot_scene_mode') || 'auto';
    } catch (e) {
      return 'auto';
    }
  });

  const [sourceNotes, setSourceNotes] = useState(() => {
    try {
      return localStorage.getItem('tiktok_copilot_source_notes') || '';
    } catch (e) {
      return '';
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isResearching, setIsResearching] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Auto-persist user work to localStorage so refreshing will NOT erase work!
  React.useEffect(() => {
    try {
      localStorage.setItem('tiktok_copilot_topic', topic);
      localStorage.setItem('tiktok_copilot_scenes', JSON.stringify(scenes));
      localStorage.setItem('tiktok_copilot_step', String(currentStep));
      localStorage.setItem('tiktok_copilot_completed_steps', JSON.stringify(completedSteps));
      localStorage.setItem('tiktok_copilot_source_notes', sourceNotes);
      localStorage.setItem('tiktok_copilot_scene_count', String(sceneCount));
      localStorage.setItem('tiktok_copilot_visual_style', visualStyle);
      localStorage.setItem('tiktok_copilot_selected_scene_id', String(selectedSceneId));
      localStorage.setItem('tiktok_copilot_scene_mode', sceneMode);
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [topic, scenes, currentStep, completedSteps, sourceNotes, sceneCount, visualStyle, selectedSceneId, sceneMode]);

  // Gemini API Key State (Auto-active with user's verified key)
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState(() => getStoredApiKey() || DEFAULT_API_KEY);
  const [geminiModel, setGeminiModel] = useState(() => getStoredModel() || 'gemini-3.5-flash');

  // Ensure key is written to storage upon mount
  React.useEffect(() => {
    const key = getStoredApiKey() || DEFAULT_API_KEY;
    setApiKey(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gemini_api_key', key);
    }
  }, []);

  // Add toast helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // TAHAP 1: Riset Fakta Sejarah Mendalam (NotebookLM Agent)
  const handleResearchFacts = async (targetTopic = topic) => {
    if (!targetTopic || !targetTopic.trim()) {
      addToast('Silakan masukkan topik cerita terlebih dahulu di kolom naskah!', 'error');
      return null;
    }

    const currentKey = apiKey || getStoredApiKey();
    if (!currentKey) {
      setIsApiKeyModalOpen(true);
      addToast('Silakan masukkan Google Gemini API Key Anda untuk mulai riset fakta!', 'info');
      return null;
    }

    setIsResearching(true);
    addToast(`🔍 [Tahap 1] NotebookLM Agent sedang meneliti data fakta & arsip primer "${targetTopic}"...`, 'info');

    try {
      const dossier = await researchFactsWithNotebookLMAgent({
        topic: targetTopic,
        apiKey: currentKey,
        modelId: geminiModel
      });

      setSourceNotes(dossier);
      addToast(`✅ Riset Fakta Selesai! Dossier Ground Truth untuk "${targetTopic}" berhasil dimuat ke dokumen rujukan.`, 'success');
      return dossier;
    } catch (err) {
      console.error('NotebookLM Fact Research Error:', err);
      addToast(`Gagal riset fakta: ${err.message}`, 'error');
      if (err.message.includes('API_KEY') || err.message.includes('403') || err.message.includes('400')) {
        setIsApiKeyModalOpen(true);
      }
      return null;
    } finally {
      setIsResearching(false);
    }
  };

  // TAHAP 2: Generate Script Handler (Gemini Pro AI or Local Preset)
  const handleGenerateScript = async (useGemini = true, overrideSourceNotes = null, overrideAuto = null) => {
    if (!topic || !topic.trim()) {
      addToast('Silakan masukkan topik cerita terlebih dahulu di kolom naskah!', 'error');
      return;
    }
    const currentKey = apiKey || getStoredApiKey();
    const effectiveNotes = overrideSourceNotes !== null ? overrideSourceNotes : sourceNotes;
    const isAuto = overrideAuto !== null ? overrideAuto : (sceneMode === 'auto');

    if (useGemini) {
      if (!currentKey) {
        setIsApiKeyModalOpen(true);
        addToast('Silakan masukkan Google Gemini API Key Anda untuk mulai riset sejarah & generate naskah dengan AI!', 'info');
        return;
      }

      setIsGenerating(true);
      const isNotebookLmMode = Boolean(effectiveNotes && effectiveNotes.trim());
      addToast(
        isAuto
          ? `🎬 [Tahap 2] Gemini Pro sedang menganalisis kepadatan cerita untuk menentukan panjang scene optimal "${topic}"...`
          : `🎬 [Tahap 2] Gemini Pro sedang merangkai ${sceneCount} scene untuk "${topic}"...`,
        'info'
      );

      try {
        const visualStyleObj = VISUAL_STYLES.find(s => s.id === visualStyle);
        const geminiScenes = await generateStoryWithGemini({
          topic,
          sceneCount: isAuto ? 'auto' : sceneCount,
          isAutoCount: isAuto,
          visualStyle,
          visualStyleObj,
          sourceNotes: effectiveNotes,
          apiKey: currentKey,
          modelId: geminiModel
        });

        setScenes(geminiScenes);
        setSceneCount(geminiScenes.length); // Sinkronisasi dinamis jumlah scene!
        setSelectedSceneId(1);
        addToast(
          isAuto
            ? `✅ Naskah "${topic}" berhasil disusun! AI otomatis menentukan ${geminiScenes.length} Scene sesuai kepadatan cerita agar tidak ada hal penting yang terbuang.`
            : `✅ Naskah "${topic}" berhasil disusun (${geminiScenes.length} Scene sesuai setelan Anda)!`,
          'success'
        );
      } catch (err) {
        console.error('Gemini Generation Error:', err);
        addToast(`Gagal generate dengan Gemini: ${err.message}`, 'error');
        if (err.message.includes('API_KEY') || err.message.includes('403') || err.message.includes('400')) {
          setIsApiKeyModalOpen(true);
        }
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Local fallback / preset generator
      setIsGenerating(true);
      setTimeout(() => {
        const countToUse = isAuto ? 10 : Math.max(10, Math.min(20, sceneCount));
        const newScenes = generateScriptForTopic(topic, countToUse, visualStyle);
        setScenes(newScenes);
        setSceneCount(newScenes.length);
        setSelectedSceneId(1);
        setIsGenerating(false);
        addToast(`Naskah "${topic}" dibuat dari preset lokal (${newScenes.length} Scene)!`, 'success');
      }, 500);
    }
  };

  // ⚡ PIPELINE LENGKAP 2-TAHAP (Riset Fakta NotebookLM ➔ Susun Naskah Gemini)
  const handleRunFullPipeline = async (targetTopic = topic, overrideAuto = null) => {
    if (!targetTopic || !targetTopic.trim()) {
      addToast('Silakan masukkan topik cerita terlebih dahulu di kolom naskah!', 'error');
      return;
    }

    const currentKey = apiKey || getStoredApiKey();
    const isAuto = overrideAuto !== null ? overrideAuto : (sceneMode === 'auto');

    if (!currentKey) {
      setIsApiKeyModalOpen(true);
      addToast('Silakan masukkan Google Gemini API Key Anda untuk menjalankan pipeline 2-tahap!', 'info');
      return;
    }

    setIsResearching(true);
    addToast(`⚡ [Tahap 1/2: NotebookLM Agent] Meneliti data valid, bukti ilmiah & fakta kunci "${targetTopic}"...`, 'info');

    let factDossier = '';
    try {
      factDossier = await researchFactsWithNotebookLMAgent({
        topic: targetTopic,
        apiKey: currentKey,
        modelId: geminiModel
      });
      setSourceNotes(factDossier);
      addToast(`✅ [Tahap 1/2 Selesai] Fakta terverifikasi! Berlanjut ke Tahap 2: Penyusunan Naskah...`, 'success');
    } catch (err) {
      console.error('Pipeline Step 1 Error:', err);
      addToast(`Gagal di Tahap 1 (Riset): ${err.message}`, 'error');
      setIsResearching(false);
      return;
    } finally {
      setIsResearching(false);
    }

    // Melanjutkan langsung ke Tahap 2
    setIsGenerating(true);
    addToast(
      isAuto
        ? `🎬 [Tahap 2/2] Gemini Pro sedang menyesuaikan panjang scene dengan kepadatan cerita (zero info terbuang)...`
        : `🎬 [Tahap 2/2] Gemini Pro sedang merangkai ${sceneCount} scene TikTok berstandar Ground Truth...`,
      'info'
    );

    try {
      const visualStyleObj = VISUAL_STYLES.find(s => s.id === visualStyle);
      const geminiScenes = await generateStoryWithGemini({
        topic: targetTopic,
        sceneCount: isAuto ? 'auto' : sceneCount,
        isAutoCount: isAuto,
        visualStyle,
        visualStyleObj,
        sourceNotes: factDossier,
        apiKey: currentKey,
        modelId: geminiModel
      });

      setScenes(geminiScenes);
      setSceneCount(geminiScenes.length); // Sinkronisasi dinamis jumlah scene!
      setSelectedSceneId(1);
      addToast(
        isAuto
          ? `🎉 [Pipeline Sukses] AI membedah fakta dan merangkai ${geminiScenes.length} Scene yang pas dengan panjang cerita (zero data terbuang)!`
          : `🎉 [Pipeline Sukses] Naskah "${targetTopic}" (${geminiScenes.length} Scene) terverifikasi 100% fakta siap pakai!`,
        'success'
      );
    } catch (err) {
      console.error('Pipeline Step 2 Error:', err);
      addToast(`Gagal di Tahap 2 (Susun Naskah): ${err.message}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // ACC Script & Advance to Prompt Center (Step 2)
  const handleAccScript = () => {
    if (!completedSteps.includes(1)) {
      setCompletedSteps(prev => [...prev, 1]);
    }
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addToast('Naskah di-ACC! Masuk ke Langkah 2: Prompt Center.', 'success');
  };

  // Reset Project (Bersihkan proyek & kosongkan topik)
  const handleResetProject = () => {
    setTopic('');
    setSceneCount(10);
    setVisualStyle('claymation');
    setScenes([]);
    setSourceNotes('');
    setCurrentStep(1);
    setCompletedSteps([1]);
    setSelectedSceneId(1);
    try {
      localStorage.removeItem('tiktok_copilot_topic');
      localStorage.removeItem('tiktok_copilot_scenes');
      localStorage.removeItem('tiktok_copilot_step');
      localStorage.removeItem('tiktok_copilot_completed_steps');
      localStorage.removeItem('tiktok_copilot_source_notes');
      localStorage.removeItem('tiktok_copilot_scene_count');
      localStorage.removeItem('tiktok_copilot_visual_style');
      localStorage.removeItem('tiktok_copilot_selected_scene_id');
      localStorage.removeItem('tiktok_copilot_scene_mode');
    } catch (e) {}
    addToast('Proyek berhasil di-reset bersih (Topik kosong untuk memulai baru).', 'info');
  };

  return (
    <div className="min-h-screen bg-[#090c13] text-slate-100 flex flex-col font-sans selection:bg-[#FE2C55]/30 selection:text-white">
      
      {/* 🖥️ Header Utama & Progress Bar Baris Teratas */}
      <Header
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        completedSteps={completedSteps}
        topic={topic}
        sceneCount={sceneCount}
        onResetProject={handleResetProject}
        hasApiKey={Boolean(apiKey)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        
        {/* LAYAR 1: Script & Scene Planner */}
        {currentStep === 1 && (
          <Screen1ScriptPlanner
            topic={topic}
            setTopic={setTopic}
            sceneCount={sceneCount}
            setSceneCount={setSceneCount}
            scenes={scenes}
            setScenes={setScenes}
            onGenerateScript={handleGenerateScript}
            isGenerating={isGenerating}
            onAccScript={handleAccScript}
            visualStyle={visualStyle}
            setVisualStyle={setVisualStyle}
            visualStyles={VISUAL_STYLES}
            addToast={addToast}
            hasApiKey={Boolean(apiKey)}
            onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
            geminiModel={geminiModel}
            sourceNotes={sourceNotes}
            setSourceNotes={setSourceNotes}
            onResearchFacts={handleResearchFacts}
            isResearching={isResearching}
            onRunFullPipeline={handleRunFullPipeline}
            sceneMode={sceneMode}
            setSceneMode={setSceneMode}
          />
        )}

        {/* LAYAR 2: Prompt Center */}
        {currentStep === 2 && (
          <Screen2PromptCenter
            topic={topic}
            scenes={scenes}
            setScenes={setScenes}
            onBackToPlanner={() => setCurrentStep(1)}
            visualStyle={visualStyle}
            setVisualStyle={setVisualStyle}
            visualStyles={VISUAL_STYLES}
            addToast={addToast}
          />
        )}

      </main>

      {/* Footer minimal info */}
      <footer className="border-t border-white/5 py-4 px-6 text-center text-xs text-slate-500 bg-[#07090f]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>TikTok Co-Pilot Studio Lokal • Ditenagai Google Gemini Pro AI & FLOW Img2Video</span>
          <span className="text-slate-400 font-medium">Aspek Rasio: 9:16 (1080x1920) Full HD Vertikal</span>
        </div>
      </footer>

      {/* Gemini Pro API Key Settings Modal */}
      <GeminiApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        onApiKeyUpdated={(newKey, newModel) => {
          setApiKey(newKey);
          setGeminiModel(newModel);
        }}
        addToast={addToast}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
