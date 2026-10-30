import React, { useState } from 'react';
import { X, Check, FileEdit, Plus, Trash2 } from 'lucide-react';

export default function EditScriptModal({ isOpen, onClose, scenes, onSave }) {
  const [editableScenes, setEditableScenes] = useState(() => (scenes ? JSON.parse(JSON.stringify(scenes)) : []));

  React.useEffect(() => {
    if (isOpen && scenes) {
      setEditableScenes(JSON.parse(JSON.stringify(scenes)));
    }
  }, [isOpen, scenes]);

  if (!isOpen) return null;

  const handleFieldChange = (index, field, value) => {
    const updated = [...editableScenes];
    updated[index][field] = value;
    setEditableScenes(updated);
  };

  const handleSave = () => {
    onSave(editableScenes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col bg-[#121622] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#161c2b]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FE2C55]/20 flex items-center justify-center text-[#FE2C55]">
              <FileEdit className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Edit Naskah & Narasi Manual</h2>
              <p className="text-xs text-slate-400">Kustomisasi teks voiceover, visual, dan caption untuk setiap scene.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {editableScenes.map((scene, idx) => (
            <div key={scene.id} className="p-4 rounded-xl bg-[#192030] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-white/10 text-white">
                  Scene {idx + 1}: {scene.stage} ({scene.time})
                </span>
                <span className="text-xs text-slate-400">Target Emosi: {scene.emotion}</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Naskah Narator (Voiceover):
                </label>
                <textarea
                  value={scene.narration}
                  onChange={(e) => handleFieldChange(idx, 'narration', e.target.value)}
                  rows={2}
                  className="w-full bg-[#0e121a] border border-white/10 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#25F4EE]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-emerald-300 mb-1 flex items-center gap-1.5">
                  <span>📚 Sumber Ilmu & Arsip Fakta Sejarah:</span>
                </label>
                <input
                  type="text"
                  value={scene.sumberIlmu || ''}
                  onChange={(e) => handleFieldChange(idx, 'sumberIlmu', e.target.value)}
                  placeholder="Arsip sejarah, catatan toponimi, atau sumber literatur rujukan..."
                  className="w-full bg-[#0e121a] border border-emerald-500/25 rounded-lg p-2.5 text-xs text-emerald-200 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Deskripsi Visual Scene:
                  </label>
                  <input
                    type="text"
                    value={scene.visual}
                    onChange={(e) => handleFieldChange(idx, 'visual', e.target.value)}
                    className="w-full bg-[#0e121a] border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-[#25F4EE]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Auto-Caption Highlight:
                  </label>
                  <input
                    type="text"
                    value={scene.captionText}
                    onChange={(e) => handleFieldChange(idx, 'captionText', e.target.value)}
                    className="w-full bg-[#0e121a] border border-white/10 rounded-lg p-2.5 text-xs text-amber-300 focus:outline-none focus:border-[#25F4EE]"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-[#161c2b]">
          <span className="text-xs text-slate-400">Total {editableScenes.length} Scene</span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition"
            >
              Batal
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] hover:opacity-95 shadow-lg shadow-[#FE2C55]/20 transition"
            >
              <Check className="w-4 h-4" />
              Simpan Perubahan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
