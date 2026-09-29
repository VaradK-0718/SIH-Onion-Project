import React from 'react';
import { Camera, Store, TrendingUp, Sparkles, CheckCircle2, MapPin } from 'lucide-react';
import { SMART_I18N } from '../utils/i18n_smart';
import WeatherAlertWidget from '../components/farmer/WeatherAlertWidget';
import QualityTips from '../components/farmer/QualityTips';
import TodaysMarketPrice from '../components/farmer/TodaysMarketPrice';

export default function SmartHomePage({ setActiveTab, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 pb-20">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-onion-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-4">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-amber-300 font-bold text-xs">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Agricultural Decision Support</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
          “{t.slogan}”
        </h1>

        <p className="text-xs sm:text-sm text-emerald-100 font-medium max-w-lg mx-auto">
          {t.subtitle}
        </p>

        {/* 3 Large Action Buttons (Requirement #1) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          
          {/* Check My Onion */}
          <button
            onClick={() => {
              setActiveTab('check');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-white text-emerald-950 font-black text-sm shadow-lg hover:bg-slate-50 transition-all active:scale-95"
          >
            <span>{t.checkOnionBtn}</span>
          </button>

          {/* Today's Market Price */}
          <button
            onClick={() => {
              setActiveTab('market');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-amber-400 text-slate-950 font-black text-sm shadow-lg hover:bg-amber-300 transition-all active:scale-95"
          >
            <span>{t.todaysPriceBtn}</span>
          </button>

          {/* Market Trends */}
          <button
            onClick={() => {
              setActiveTab('market');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-lg hover:bg-slate-800 transition-all active:scale-95"
          >
            <span>{t.marketTrendsBtn}</span>
          </button>

        </div>

      </div>

      {/* Weather Alert Widget */}
      <WeatherAlertWidget lang={lang} />

      {/* Today's Market Price Quick Preview */}
      <TodaysMarketPrice lang={lang} />

      {/* Quality Improvement Tips */}
      <QualityTips lang={lang} />

    </div>
  );
}
