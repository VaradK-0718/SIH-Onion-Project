import React, { useState } from 'react';
import { Package, Scale, Clock, AlertTriangle } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function StorageLossEstimator({ lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [quantity, setQuantity] = useState(100);
  const [months, setMonths] = useState(3);

  // Storage loss estimation formula (~2% weight loss per month due to respiration & shrinkage)
  const lossPct = Math.min(15, months * 2);
  const lossQuintals = Math.round((lossPct / 100) * quantity * 10) / 10;
  const remainingQuintals = Math.max(0, quantity - lossQuintals);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-5">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Package className="w-4 h-4 text-onion-600" />
          📦 {t.storageLossTitle}
        </h3>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          Weight Reduction Estimator
        </span>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Scale className="w-3.5 h-3.5 text-onion-600" /> Starting Quantity (Quintals)
          </label>
          <input
            type="number"
            min="10"
            max="5000"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-extrabold text-sm text-slate-900 bg-slate-50 focus:outline-none focus:border-onion-600"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Storage Duration (Months)
          </label>
          <select
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-extrabold text-sm text-slate-900 bg-slate-50 focus:outline-none focus:border-onion-600"
          >
            <option value={1}>1 Month (~2% Loss)</option>
            <option value={2}>2 Months (~4% Loss)</option>
            <option value={3}>3 Months (~6% Loss)</option>
            <option value={4}>4 Months (~8% Loss)</option>
            <option value={5}>5 Months (~10% Loss)</option>
            <option value={6}>6 Months (~12% Loss)</option>
          </select>
        </div>
      </div>

      {/* Output Stats */}
      <div className="p-4 rounded-2xl bg-slate-900 text-white grid grid-cols-3 gap-3 text-center shadow-inner">
        <div>
          <span className="text-[10px] font-bold uppercase text-slate-400 block">Starting Quantity</span>
          <span className="text-xl font-black text-white mt-1 block">{quantity} qtnl</span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase text-emerald-400 block">Estimated Remaining</span>
          <span className="text-xl font-black text-emerald-400 mt-1 block">{remainingQuintals} qtnl</span>
        </div>

        <div>
          <span className="text-[10px] font-bold uppercase text-rose-400 block">Potential Loss</span>
          <span className="text-xl font-black text-rose-400 mt-1 block">{lossQuintals} qtnl ({lossPct}%)</span>
        </div>
      </div>

    </div>
  );
}
