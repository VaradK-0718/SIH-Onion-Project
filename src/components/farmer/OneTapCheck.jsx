import React, { useRef } from 'react';
import { Camera, Upload, Sparkles, CheckCircle2, Image as ImageIcon, ShieldAlert } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function OneTapCheck({ onImageSelected, onPresetTestSelected, lang = 'mr' }) {
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      onImageSelected(evt.target.result, file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-md text-center space-y-6">
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        className="hidden"
        onChange={handleFileChange}
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileChange}
      />

      <div className="w-16 h-16 rounded-3xl bg-onion-100 text-onion-600 mx-auto flex items-center justify-center shadow-inner">
        <Camera className="w-8 h-8" />
      </div>

      <div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.uploadTitle}</h2>
        <p className="text-xs text-slate-500 font-semibold mt-1">Select a photo for instant computer vision grading</p>
      </div>

      {/* 2 Big Touch Buttons (Requirement #2) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => cameraInputRef.current?.click()}
          className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-base shadow-lg hover:from-emerald-700 transition-all active:scale-95"
        >
          <Camera className="w-6 h-6 text-amber-300" />
          <span>{t.takePhoto}</span>
        </button>

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-slate-900 text-white font-extrabold text-base shadow-lg hover:bg-slate-800 transition-all active:scale-95"
        >
          <ImageIcon className="w-6 h-6 text-emerald-400" />
          <span>{t.uploadPhoto}</span>
        </button>
      </div>

      {/* Simple Instructions */}
      <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-bold text-slate-600">
        <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.tip1}</span>
        <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.tip2}</span>
        <span className="flex items-center justify-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> {t.tip3}</span>
      </div>

      {/* Acceptance Test Presets Trigger (Requirement #26) */}
      <div className="pt-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between text-xs font-extrabold text-slate-700">
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-4 h-4 text-amber-500" /> Test Two-Stage Verification & Rejection:
          </span>
          <span className="text-[10px] text-slate-400 font-semibold">Click to test Stage 1 Gate</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <button
            onClick={() => onPresetTestSelected('clear_batch', 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 hover:bg-emerald-200"
          >
            ✅ Clear Onion Batch
          </button>

          <button
            onClick={() => onPresetTestSelected('single_onion', 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-amber-100 text-amber-900 font-bold border border-amber-300 hover:bg-amber-200"
          >
            ⚠️ Single Onion
          </button>

          <button
            onClick={() => onPresetTestSelected('tomato', 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 font-bold border border-rose-300 hover:bg-rose-200"
          >
            ❌ Tomato Image
          </button>

          <button
            onClick={() => onPresetTestSelected('potato', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 font-bold border border-rose-300 hover:bg-rose-200"
          >
            ❌ Potato Image
          </button>

          <button
            onClick={() => onPresetTestSelected('person', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 font-bold border border-rose-300 hover:bg-rose-200"
          >
            ❌ Person Image
          </button>

          <button
            onClick={() => onPresetTestSelected('car', 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80')}
            className="px-3 py-1.5 rounded-xl bg-rose-100 text-rose-900 font-bold border border-rose-300 hover:bg-rose-200"
          >
            ❌ Car Image
          </button>
        </div>
      </div>

    </div>
  );
}
