import React from 'react';
import { CheckCircle2, AlertTriangle, Biohazard, Sprout, Minimize2, Sliders } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function DetailedBreakdownModal({ data, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  return (
    <div className="pt-4 border-t border-slate-200 space-y-6 animate-in fade-in">
      
      {/* 5 Onion Defect Counts */}
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-onion-600" />
          Individual Onion Counts (200 Analyzed)
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] font-bold text-emerald-900 block">{t.healthyCount}</span>
            <span className="text-2xl font-black text-emerald-700 mt-1 block">{data.healthy}</span>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-[11px] font-bold text-amber-900 block">{t.damagedCount}</span>
            <span className="text-2xl font-black text-amber-700 mt-1 block">{data.damaged}</span>
          </div>

          <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-[11px] font-bold text-rose-900 block">{t.rottenCount}</span>
            <span className="text-2xl font-black text-rose-700 mt-1 block">{data.rotten}</span>
          </div>

          <div className="p-3 rounded-2xl bg-orange-50 border border-orange-200">
            <span className="text-[11px] font-bold text-orange-900 block">{t.sproutedCount}</span>
            <span className="text-2xl font-black text-orange-700 mt-1 block">{data.sprouted}</span>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-bold text-blue-900 block">{t.undersizedCount}</span>
            <span className="text-2xl font-black text-blue-700 mt-1 block">{data.undersized}</span>
          </div>
        </div>
      </div>

      {/* Grade Tier Percentage Bars (Green, Yellow, Red) */}
      <div className="space-y-3">
        <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">
          Grade Tier Breakdown (%)
        </h4>

        {/* Grade A - Green */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-emerald-800 flex items-center gap-1">🟢 {t.gradeA}</span>
            <span className="text-emerald-700 font-extrabold">{data.grade_a}%</span>
          </div>
          <div className="w-full bg-emerald-100 h-3 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000" style={{ width: `${data.grade_a}%` }}></div>
          </div>
        </div>

        {/* Grade B - Yellow */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-amber-800 flex items-center gap-1">🟡 {t.gradeB}</span>
            <span className="text-amber-700 font-extrabold">{data.grade_b}%</span>
          </div>
          <div className="w-full bg-amber-100 h-3 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full rounded-full transition-all duration-1000" style={{ width: `${data.grade_b}%` }}></div>
          </div>
        </div>

        {/* URS - Red */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-rose-800 flex items-center gap-1">🔴 {t.urs}</span>
            <span className="text-rose-700 font-extrabold">{data.urs}%</span>
          </div>
          <div className="w-full bg-rose-100 h-3 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full transition-all duration-1000" style={{ width: `${data.urs}%` }}></div>
          </div>
        </div>
      </div>

    </div>
  );
}
