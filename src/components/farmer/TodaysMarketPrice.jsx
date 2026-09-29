import React, { useState } from 'react';
import { Store, Calendar, ShieldCheck, MapPin } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function TodaysMarketPrice({ lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [selectedMarket, setSelectedMarket] = useState('lasalgaon');

  const marketRates = {
    lasalgaon: { name: 'Lasalgaon APMC', min: 2200, max: 2750, modal: 2500, updated: '25 Aug 2026' },
    nashik: { name: 'Nashik Main APMC', min: 2180, max: 2720, modal: 2480, updated: '25 Aug 2026' },
    pune: { name: 'Pune Gultekdi APMC', min: 2150, max: 2680, modal: 2450, updated: '25 Aug 2026' },
    sangli: { name: 'Sangli APMC', min: 2100, max: 2620, modal: 2400, updated: '25 Aug 2026' },
    kolhapur: { name: 'Kolhapur Mandi', min: 2080, max: 2600, modal: 2380, updated: '25 Aug 2026' },
    solapur: { name: 'Solapur APMC', min: 2050, max: 2550, modal: 2350, updated: '25 Aug 2026' }
  };

  const rate = marketRates[selectedMarket] || marketRates.lasalgaon;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-5">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Store className="w-4 h-4 text-onion-600" />
            💰 {t.todaysPriceTitle}
          </h3>
          <p className="text-xs text-slate-500 font-medium">Select mandi location to view official rates</p>
        </div>

        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          {t.demoNotice}
        </span>
      </div>

      {/* Location Select */}
      <div className="space-y-1">
        <label className="text-xs font-extrabold text-slate-700 uppercase flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-onion-600" /> Choose Market Location
        </label>
        <select
          value={selectedMarket}
          onChange={(e) => setSelectedMarket(e.target.value)}
          className="w-full px-4 py-3 rounded-2xl border border-slate-300 text-sm font-extrabold text-slate-900 bg-slate-50 focus:outline-none focus:border-onion-600 shadow-sm"
        >
          <option value="lasalgaon">Lasalgaon APMC (Nashik)</option>
          <option value="nashik">Nashik Main APMC Yard</option>
          <option value="pune">Pune Gultekdi APMC</option>
          <option value="sangli">Sangli APMC Market</option>
          <option value="kolhapur">Kolhapur APMC Mandi</option>
          <option value="solapur">Solapur Central APMC</option>
        </select>
      </div>

      {/* 3 Price Cards (Min, Max, Modal) */}
      <div className="grid grid-cols-3 gap-3 text-center">
        
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase block">{t.minPrice}</span>
          <span className="text-2xl font-black text-slate-800 mt-1 block">₹{rate.min.toLocaleString()}</span>
          <span className="text-[9px] text-slate-400 font-semibold block">per quintal</span>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
          <span className="text-[10px] font-extrabold text-emerald-900 uppercase block">{t.maxPrice}</span>
          <span className="text-2xl font-black text-emerald-700 mt-1 block">₹{rate.max.toLocaleString()}</span>
          <span className="text-[9px] text-emerald-600 font-semibold block">Grade A Peak</span>
        </div>

        <div className="p-4 rounded-2xl bg-onion-50 border border-onion-200">
          <span className="text-[10px] font-extrabold text-onion-950 uppercase block">{t.modalPrice}</span>
          <span className="text-2xl font-black text-onion-700 mt-1 block">₹{rate.modal.toLocaleString()}</span>
          <span className="text-[9px] text-onion-800 font-semibold block">Average Rate</span>
        </div>

      </div>

      <div className="text-center text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
        <Calendar className="w-3.5 h-3.5 text-slate-400" />
        📅 {t.updatedToday}: {rate.updated} • AGMARKNET APMC Data Feed
      </div>

    </div>
  );
}
