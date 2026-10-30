import React, { useState, useEffect } from 'react';
import { 
  Key, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Sparkles, 
  ShieldCheck, 
  Trash2, 
  Eye, 
  EyeOff, 
  Cpu
} from 'lucide-react';
import { 
  DEFAULT_API_KEY,
  GEMINI_MODELS, 
  getStoredApiKey, 
  setStoredApiKey, 
  getStoredModel, 
  setStoredModel, 
  testGeminiApiKey 
} from '../utils/geminiService';

export default function GeminiApiKeyModal({ 
  isOpen, 
  onClose, 
  onApiKeyUpdated, 
  addToast 
}) {
  const [apiKey, setApiKey] = useState(() => getStoredApiKey() || DEFAULT_API_KEY);
  const [selectedModel, setSelectedModel] = useState(() => getStoredModel() || 'gemini-3.5-flash');
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, message: string }

  useEffect(() => {
    if (!isOpen) return;
    setApiKey(getStoredApiKey() || DEFAULT_API_KEY);
    setSelectedModel(getStoredModel() || 'gemini-3.5-flash');
    setTestResult(null);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!apiKey.trim()) {
      setTestResult({ success: false, message: 'Masukkan API Key terlebih dahulu.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    try {
      const res = await testGeminiApiKey(apiKey.trim(), selectedModel);
      setTestResult({ success: true, message: res.message });
      addToast('Koneksi Gemini Pro API Berhasil!', 'success');
    } catch (err) {
      setTestResult({ success: false, message: err.message || 'Gagal terhubung ke Gemini API.' });
      addToast(`Uji API Gagal: ${err.message}`, 'error');
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    setStoredApiKey(apiKey.trim());
    setStoredModel(selectedModel);
    if (onApiKeyUpdated) {
      onApiKeyUpdated(apiKey.trim(), selectedModel);
    }
    addToast('Pengaturan Gemini Pro API berhasil disimpan!', 'success');
    onClose();
  };

  const handleClear = () => {
    setApiKey('');
    setStoredApiKey('');
    setTestResult(null);
    if (onApiKeyUpdated) {
      onApiKeyUpdated('', selectedModel);
    }
    addToast('API Key telah dihapus dari browser.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#111624] border border-white/15 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-[#172036] to-[#121625]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#25F4EE]/20 to-[#FE2C55]/20 border border-[#25F4EE]/30 flex items-center justify-center text-[#25F4EE]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                Integrasi Gemini Pro AI
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#25F4EE]/10 text-[#25F4EE] border border-[#25F4EE]/30 font-mono">
                  Official API
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Hubungkan API Key untuk naskah sejarah valid & fitur AI canggih.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 flex-1 overflow-y-auto">
          
          {/* Info Card */}
          <div className="p-3.5 rounded-xl bg-[#141b2e] border border-white/10 text-xs text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-teal-300 font-bold">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              Keamanan Data & Privasi Lokal:
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              API Key Anda disimpan secara aman hanya di <code className="text-teal-200">localStorage</code> browser lokal Anda. Kunci ini digunakan langsung oleh komputer Anda untuk memanggil Gemini Pro tanpa server pihak ketiga.
            </p>
          </div>

          {/* Model Selector */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Cpu className="w-4 h-4 text-[#25F4EE]" />
              Pilih Model Gemini:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-[#0a0e17] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-white focus:outline-none focus:border-[#25F4EE] transition cursor-pointer"
            >
              {GEMINI_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#121625] text-white">
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* API Key Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Key className="w-4 h-4 text-amber-400" />
                Google Gemini API Key:
              </label>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-[#25F4EE] hover:underline flex items-center gap-1"
              >
                Dapatkan API Key Gratis <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value);
                  setTestResult(null);
                }}
                placeholder="Paste API Key Anda (AIzaSy...)"
                className="w-full bg-[#0a0e17] border border-white/15 rounded-xl px-4 py-3 pr-20 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#25F4EE] focus:ring-1 focus:ring-[#25F4EE] transition"
              />
              <div className="absolute right-2 top-2.5 flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
                  title={showKey ? 'Sembunyikan' : 'Lihat'}
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Test Status Feedback */}
          {testResult && (
            <div
              className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs ${
                testResult.success
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
              }`}
            >
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
              <div className="leading-relaxed">
                <span className="font-bold">
                  {testResult.success ? 'Koneksi Sukses: ' : 'Koneksi Gagal: '}
                </span>
                {testResult.message}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#0d121c] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={handleTestConnection}
              disabled={isTesting || !apiKey.trim()}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white/5 border border-white/10 text-slate-200 hover:bg-white/10 transition disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#25F4EE]" />
              {isTesting ? 'Menguji Koneksi...' : '⚡ Uji Koneksi API'}
            </button>
            {apiKey && (
              <button
                onClick={handleClear}
                title="Hapus API Key tersimpan"
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#25F4EE] to-teal-400 text-slate-950 hover:brightness-110 transition shadow-lg shadow-[#25F4EE]/20 flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Simpan Pengaturan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
