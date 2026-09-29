import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Clock, AlertCircle, Sparkles } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function WhenToSellCard({ lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [timeRange, setTimeRange] = useState('1year');

  const data1M = [
    { label: 'W1', price: 2350 },
    { label: 'W2', price: 2420 },
    { label: 'W3', price: 2500 },
    { label: 'W4', price: 2550 }
  ];

  const data1Y = [
    { label: 'Jan', price: 2200 },
    { label: 'Mar', price: 2500 },
    { label: 'May', price: 2800 },
    { label: 'Jul', price: 2850 },
    { label: 'Aug', price: 2700 }
  ];

  const data5Y = [
    { label: '2022', price: 2100 },
    { label: '2023', price: 2350 },
    { label: '2024', labelFull: '2024', price: 2600 },
    { label: '2025', price: 2900 },
    { label: '2026', price: 2700 }
  ];

  const chartData = timeRange === '1month' ? data1M : timeRange === '5year' ? data5Y : data1Y;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-onion-600" />
            📈 {t.whenToSellTitle}
          </h3>
          <p className="text-xs text-slate-500 font-medium">Predictive price trend & selling score</p>
        </div>

        {/* Smart Selling Score Badge (Requirement #26) */}
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 p-2 rounded-2xl">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
            82
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase text-emerald-900 block">{t.sellingScore}</span>
            <span className="text-xs font-black text-emerald-700">🟢 Good Opportunity</span>
          </div>
        </div>
      </div>

      {/* Main Recommendation Badge */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center space-y-1 shadow-md">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-100 block">AI Selling Verdict</span>
        <div className="text-3xl sm:text-4xl font-black">🟢 {t.goodTimeToSell}</div>
        <p className="text-xs font-semibold text-emerald-100">
          Current market prices are high and seasonal festive demand is rising in Nashik and Lasalgaon mandis.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-[10px] font-extrabold text-slate-500 uppercase block">Current Price</span>
          <span className="text-xl font-black text-slate-900">₹2,550</span>
        </div>

        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
          <span className="text-[10px] font-extrabold text-emerald-900 uppercase block">Expected Target</span>
          <span className="text-xl font-black text-emerald-700">₹2,600 – ₹2,800</span>
        </div>

        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
          <span className="text-[10px] font-extrabold text-amber-900 uppercase block">Price Trend</span>
          <span className="text-xl font-black text-amber-700 flex items-center justify-center gap-1">
            <TrendingUp className="w-4 h-4" /> ↗ Rising
          </span>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-extrabold text-slate-700 uppercase">Historical Price Graph:</span>
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => setTimeRange('1month')}
            className={`px-2.5 py-1 rounded-lg transition-all ${timeRange === '1month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            1 Month
          </button>
          <button
            onClick={() => setTimeRange('1year')}
            className={`px-2.5 py-1 rounded-lg transition-all ${timeRange === '1year' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            1 Year
          </button>
          <button
            onClick={() => setTimeRange('5year')}
            className={`px-2.5 py-1 rounded-lg transition-all ${timeRange === '5year' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
          >
            5 Years
          </button>
        </div>
      </div>

      {/* Graph */}
      <div className="h-44 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="sellGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="label" tick={{ fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[1800, 3200]} />
            <Tooltip formatter={(val) => [`₹${val}/quintal`]} />
            <Area type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#sellGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Disclaimer (Requirement #10) */}
      <div className="p-3 rounded-xl bg-slate-100 text-[11px] text-slate-500 flex items-start gap-2">
        <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <p>
          <strong>Notice:</strong> Future prices are uncertain and may change because of supply, demand, weather and government policies.
        </p>
      </div>

    </div>
  );
}
