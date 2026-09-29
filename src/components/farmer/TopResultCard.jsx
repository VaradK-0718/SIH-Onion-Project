import React, { useState } from 'react';
import { Award, CheckCircle2, ChevronDown, ChevronUp, Sparkles, MapPin, TrendingUp } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';
import DetailedBreakdownModal from './DetailedBreakdownModal';
import VoiceButton from './VoiceButton';

export default function TopResultCard({ resultData, lang = 'mr' }) {
  const [showDetails, setShowDetails] = useState(false);
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const data = resultData || {
    quality_score: 87,
    grade_a: 72,
    grade_b: 18,
    urs: 10,
    healthy: 144,
    damaged: 24,
    rotten: 10,
    sprouted: 6,
    undersized: 16,
    expected_price: '₹2,600 / quintal',
    best_market: 'Lasalgaon APMC',
    selling_advice: 'Prices are currently rising'
  };

  const textToVoice = lang === 'mr'
    ? `तुमचा तपासणी निकाल चांगला आहे. ग्रेड ए बहत्तर टक्के आहे. अंदाजे बाजारभाव २६०० रुपये प्रति क्विंटल आहे. सर्वोत्तम बाजार समिती लासलगाव आहे. भाव सध्या वाढत आहेत.`
    : lang === 'hi'
    ? `आपका जांच परिणाम अच्छा है। ग्रेड ए बहत्तर प्रतिशत है। अनुमानित मंडी भाव दो हजार छह सौ रुपये प्रति क्विंटल है। सर्वोत्तम मंडी लासलगांव है।`
    : `Your result is Good Quality. Grade A is 72 percent. Expected price is 2,600 rupees per quintal. Best market is Lasalgaon. Prices are currently rising.`;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-lg space-y-6">
      
      {/* Top Banner Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
            {t.yourResultTitle}
          </span>
          <h2 className="text-3xl font-black text-slate-900 mt-2 flex items-center gap-2">
            <span>🟢 {t.goodQuality}</span>
          </h2>
        </div>

        {/* Large Voice Button (Requirement #19) */}
        <VoiceButton textToSpeak={textToVoice} lang={lang} />
      </div>

      {/* 4 Main Summary Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Grade A */}
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
          <span className="text-[11px] font-bold text-emerald-800 uppercase block">{t.gradeA}</span>
          <div className="text-4xl font-black text-emerald-700 mt-1">{data.grade_a}%</div>
          <span className="text-xs font-semibold text-emerald-800 block mt-1">Quality Score: {data.quality_score}/100</span>
        </div>

        {/* Expected Price */}
        <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center">
          <span className="text-[11px] font-bold text-purple-900 uppercase block">{t.expectedPrice}</span>
          <div className="text-2xl font-black text-purple-800 mt-2">{data.expected_price}</div>
          <span className="text-[11px] text-purple-700 font-semibold block mt-1">Based on current lot</span>
        </div>

        {/* Best Market */}
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center">
          <span className="text-[11px] font-bold text-amber-900 uppercase block">{t.bestMarket}</span>
          <div className="text-xl font-black text-amber-800 mt-2 flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4 text-amber-600" />
            {data.best_market}
          </div>
          <span className="text-[11px] text-amber-700 font-semibold block mt-1">Highest net return</span>
        </div>

        {/* Selling Advice */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center">
          <span className="text-[11px] font-bold text-blue-900 uppercase block">Selling Advice</span>
          <div className="text-sm font-black text-blue-800 mt-2 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            {data.selling_advice}
          </div>
          <span className="text-[11px] text-blue-700 font-semibold block mt-1">🟢 GOOD TIME TO SELL</span>
        </div>

      </div>

      {/* "See More Details" Collapsible Toggle */}
      <div className="pt-2 text-center">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition-all shadow-sm"
        >
          <span>{showDetails ? t.hideDetails : t.seeMoreDetails}</span>
        </button>
      </div>

      {/* Collapsible Detailed Breakdown Modal / Section */}
      {showDetails && (
        <DetailedBreakdownModal data={data} lang={lang} />
      )}

    </div>
  );
}
