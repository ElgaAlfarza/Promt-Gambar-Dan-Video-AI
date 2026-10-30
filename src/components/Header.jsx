import React from 'react';
import { 
  FileText, 
  Sparkles, 
  Eye, 
  Film, 
  ChevronRight, 
  CheckCircle2, 
  RotateCcw,
  Layers,
  Flame
} from 'lucide-react';

export default function Header({ 
  currentStep, 
  setCurrentStep, 
  completedSteps, 
  topic, 
  sceneCount,
  onResetProject,
  hasApiKey = false,
  onOpenApiKeyModal = () => {}
}) {
  const steps = [
    { id: 1, name: '1. Pembuat Scene', subtext: 'AI Script & Scene Planner', icon: FileText },
    { id: 2, name: '2. Prompt Center', subtext: 'DALL-E & FLOW Ready', icon: Sparkles }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0c1017]/90 backdrop-blur-md border-b border-white/10 px-4 lg:px-8 py-3.5 shadow-xl">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand & Project Info */}
        <div className="flex items-center gap-3 self-start md:self-center">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-[#FE2C55] to-[#25F4EE] shadow-lg shadow-[#FE2C55]/20 shrink-0">
            <span className="text-xl font-black text-white tracking-tighter">TT</span>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25F4EE] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25F4EE]"></span>
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold tracking-wide text-white uppercase flex items-center gap-2">
                DASHBOARD CO-PILOT TIKTOK LOKAL
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#25F4EE]/10 border border-[#25F4EE]/30 text-[#25F4EE]">
                  v2.0 PRO
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span className="flex items-center gap-1 text-slate-300 font-medium truncate max-w-[200px] sm:max-w-xs">
                <Flame className="w-3.5 h-3.5 text-[#FE2C55]" />
                {topic || 'Belum Ada Topik'}
              </span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-slate-400">
                <Layers className="w-3.5 h-3.5 text-[#25F4EE]" />
                {sceneCount} Scene
              </span>
            </div>
          </div>
        </div>

        {/* Global Progress Bar Baris Navigasi */}
        <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <div className="flex items-center bg-[#141924] p-1.5 rounded-2xl border border-white/10 shadow-inner">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isDone = completedSteps.includes(step.id);

              return (
                <React.Fragment key={step.id}>
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`group relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FE2C55]/20 to-[#25F4EE]/20 border border-white/20 text-white shadow-md'
                        : isDone
                        ? 'text-emerald-400 hover:text-white hover:bg-white/5'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold ${
                      isActive
                        ? 'bg-[#FE2C55] text-white shadow-sm shadow-[#FE2C55]/50'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {isDone ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : step.id}
                    </div>

                    <div className="text-left">
                      <div className="leading-tight flex items-center gap-1.5">
                        <span>{step.name}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#25F4EE] animate-pulse"></span>
                        )}
                      </div>
                    </div>
                  </button>

                  {idx < steps.length - 1 && (
                    <div className="text-slate-600 px-1">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Action button & Gemini API Status */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenApiKeyModal}
            title="Pengaturan Google Gemini Pro API"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border shadow-sm ${
              hasApiKey
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 shadow-emerald-950/20'
                : 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/50 text-amber-200 hover:brightness-110 shadow-amber-950/20 animate-pulse'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#25F4EE]" />
            <span>{hasApiKey ? '🟢 Gemini Pro (Aktif)' : '🔑 Masukkan API Key'}</span>
          </button>

          <button
            onClick={onResetProject}
            title="Reset ke Cerita Awal"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>

      </div>
    </header>
  );
}
