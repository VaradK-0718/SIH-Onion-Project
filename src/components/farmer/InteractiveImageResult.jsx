import React, { useState } from 'react';
import { Eye, Sparkles, CheckCircle2, AlertTriangle, Biohazard, Sprout, Minimize2 } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function InteractiveImageResult({ sampleImage, lang = 'mr' }) {
  const [viewMode, setViewMode] = useState('ai'); // 'original' or 'ai'
  const [selectedOnion, setSelectedOnion] = useState(null);
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const onions = [
    { id: 1, label: t.good, status: 'good', x: 14, y: 18, w: 22, h: 25, color: 'border-emerald-500 bg-emerald-500/20 text-emerald-300', badge: 'bg-emerald-600 text-white', size: '72mm', note: 'Export Quality Bulb' },
    { id: 2, label: t.good, status: 'good', x: 40, y: 16, w: 24, h: 26, color: 'border-emerald-500 bg-emerald-500/20 text-emerald-300', badge: 'bg-emerald-600 text-white', size: '74mm', note: 'Export Quality Bulb' },
    { id: 3, label: t.damaged, status: 'damaged', x: 68, y: 22, w: 21, h: 24, color: 'border-amber-500 bg-amber-500/20 text-amber-300', badge: 'bg-amber-600 text-white', size: '68mm', note: 'Skin split / Cut' },
    { id: 4, label: t.rotten, status: 'rotten', x: 16, y: 54, w: 23, h: 25, color: 'border-rose-500 bg-rose-500/25 text-rose-300', badge: 'bg-rose-600 text-white', size: '64mm', note: 'Neck rot spot' },
    { id: 5, label: t.sprouted, status: 'sprouted', x: 44, y: 55, w: 22, h: 28, color: 'border-orange-500 bg-orange-500/20 text-orange-300', badge: 'bg-orange-600 text-white', size: '66mm', note: 'Green shoot 15mm' },
    { id: 6, label: t.small, status: 'small', x: 73, y: 56, w: 14, h: 16, color: 'border-blue-500 bg-blue-500/20 text-blue-300', badge: 'bg-blue-600 text-white', size: '42mm', note: 'Below 45mm diameter' }
  ];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-onion-600" />
            {t.aiCheckedImage}
          </h3>
          <p className="text-xs text-slate-500 font-medium">{t.tapOnionInstruction}</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200 text-xs font-extrabold">
          <button
            onClick={() => setViewMode('original')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              viewMode === 'original' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'
            }`}
          >
            {t.originalImage}
          </button>
          <button
            onClick={() => setViewMode('ai')}
            className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 ${
              viewMode === 'ai' ? 'bg-onion-600 text-white shadow-sm' : 'text-slate-600'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {t.aiCheckedImage}
          </button>
        </div>
      </div>

      {/* Main Image Frame */}
      <div className="relative rounded-2xl overflow-hidden border-2 border-slate-900 bg-slate-950 aspect-[4/3] max-h-96 flex items-center justify-center shadow-xl">
        {sampleImage ? (
          <img src={sampleImage} alt="Onion analysis frame" className="w-full h-full object-contain opacity-90" />
        ) : (
          <div className="text-slate-500 text-xs font-bold">Photo Preview</div>
        )}

        {/* Overlay Bounding Boxes */}
        {viewMode === 'ai' && onions.map((o) => (
          <div
            key={o.id}
            onClick={() => setSelectedOnion(selectedOnion?.id === o.id ? null : o)}
            style={{ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%` }}
            className={`absolute border-2 rounded-xl transition-all duration-200 cursor-pointer ${o.color} ${
              selectedOnion?.id === o.id ? 'scale-105 ring-4 ring-white z-30' : 'z-10'
            }`}
          >
            <div className={`absolute -top-5 left-0 px-2 py-0.5 rounded text-[10px] font-black shadow ${o.badge}`}>
              {o.label}
            </div>
          </div>
        ))}
      </div>

      {/* Selected Onion Tap Card Popup */}
      {selectedOnion && (
        <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-1 animate-in fade-in flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-extrabold ${selectedOnion.badge}`}>
                {selectedOnion.label}
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400">Bulb Diameter: {selectedOnion.size}</span>
            </div>
            <p className="text-xs text-slate-300 font-medium mt-1">{selectedOnion.note}</p>
          </div>
          <button onClick={() => setSelectedOnion(null)} className="text-xs text-slate-400 underline">Close</button>
        </div>
      )}

      {/* Simple Color Legend */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-slate-700">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> 🟢 {t.good}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-500"></span> 🟡 {t.damaged}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500"></span> 🔴 {t.rotten}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-orange-500"></span> 🟠 {t.sprouted}</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500"></span> 🔵 {t.small}</span>
      </div>

    </div>
  );
}
