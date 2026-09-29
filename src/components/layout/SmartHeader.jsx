import React from 'react';
import { Globe, Cpu, Wifi, WifiOff } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function SmartHeader({ lang, setLang, mode, setMode, isOnline = true }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setMode('farmer')}>
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-onion-700 via-onion-600 to-amber-500 flex items-center justify-center text-white text-2xl shadow-md shadow-onion-600/30">
            🧅
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-black text-xl text-slate-900 tracking-tight leading-none">
                Smart Onion <span className="text-onion-600">AI</span>
              </h1>
              {isOnline ? (
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Online Sync Active"></span>
              ) : (
                <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300">
                  <WifiOff className="w-3 h-3" /> Offline
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-500 font-bold mt-0.5">{t.slogan}</p>
          </div>
        </div>

        {/* Language selector + Admin mode toggle */}
        <div className="flex items-center gap-2">
          {/* Language selector buttons (Requirement #1 & #20: Marathi first) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setLang('mr')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'mr' ? 'bg-emerald-600 text-white shadow-sm font-extrabold' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLang('hi')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'hi' ? 'bg-amber-500 text-white shadow-sm font-extrabold' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              हिन्दी
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                lang === 'en' ? 'bg-onion-700 text-white shadow-sm font-extrabold' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              EN
            </button>
          </div>

          {/* Admin mode button (Requirement #28) */}
          <button
            onClick={() => setMode(mode === 'admin' ? 'farmer' : 'admin')}
            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
              mode === 'admin'
                ? 'bg-slate-900 text-white border-slate-900 shadow'
                : 'bg-white text-slate-600 hover:bg-slate-100 border-slate-200'
            }`}
            title="Toggle Admin Mode"
          >
            <Cpu className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
}
