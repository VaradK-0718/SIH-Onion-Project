import React from 'react';
import { AlertOctagon, Camera, Upload, RefreshCw, XCircle } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function ImageRejectionCard({ onRetryCamera, onRetryUpload, confidence = 0.12, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const titleText = lang === 'mr'
    ? '🧅 कांदा ओळखता आला नाही'
    : lang === 'hi'
    ? '🧅 प्याज़ की पहचान नहीं हुई'
    : '⚠️ Onion Not Detected';

  const messageText = lang === 'mr'
    ? 'या फोटोमध्ये कांदा स्पष्ट आढळला नाही. (उदा. कार, माणूस, इतर वस्तू किंवा अस्पष्ट फोटो).'
    : lang === 'hi'
    ? 'इस तस्वीर में प्याज़ स्पष्ट नहीं पाया गया। (जैसे कार, व्यक्ति, अन्य वस्तु या धुंधली तस्वीर)।'
    : 'This does not appear to be an onion image. (e.g. car, person, dog, tomato, potato, or unrelated photo).';

  return (
    <div className="bg-white rounded-3xl border-2 border-rose-300 p-6 sm:p-8 text-center space-y-6 shadow-xl animate-in zoom-in-95">
      
      {/* Rejection Icon */}
      <div className="w-20 h-20 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center shadow-inner border-2 border-rose-200">
        <AlertOctagon className="w-10 h-10 animate-bounce" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
          STAGE 1 VERIFICATION FAILED (Confidence: {Math.round(confidence * 100)}%)
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">{titleText}</h2>
        <p className="text-xs sm:text-sm font-semibold text-slate-600 max-w-md mx-auto leading-relaxed">
          {messageText}
        </p>
      </div>

      {/* Simple Checklist Guidelines */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-950 text-left max-w-md mx-auto space-y-1.5">
        <div className="font-extrabold text-rose-900 uppercase text-[11px] mb-1">Please ensure:</div>
        <p>1. Place onions clearly in front of the camera.</p>
        <p>2. Make sure there is enough light (avoid shadows).</p>
        <p>3. Keep the camera steady and take a close-up photo.</p>
      </div>

      {/* 2 Big Action Buttons (Requirement #2 & #19) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
        <button
          onClick={onRetryCamera}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 text-white font-black text-sm shadow-lg transition-all active:scale-95"
        >
          <Camera className="w-5 h-5 text-amber-300" />
          <span>📷 {t.takePhoto}</span>
        </button>

        <button
          onClick={onRetryUpload}
          className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-sm shadow-lg transition-all active:scale-95"
        >
          <Upload className="w-5 h-5 text-emerald-400" />
          <span>🖼️ {t.uploadPhoto}</span>
        </button>
      </div>

      <div className="text-[11px] text-slate-400 font-bold">
        🚫 No quality grade or price is generated for non-onion images.
      </div>

    </div>
  );
}
