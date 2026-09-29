import React, { useState } from 'react';
import { Bell, CheckCircle2, Sparkles } from 'lucide-react';
import { savePriceAlert } from '../../utils/storage';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function PriceAlertModal({ isOpen, onClose, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [targetPrice, setTargetPrice] = useState(3000);
  const [showAlertToast, setShowAlertToast] = useState(false);

  if (!isOpen) return null;

  const handleSetAlert = () => {
    savePriceAlert(targetPrice);
    setShowAlertToast(true);
    setTimeout(() => {
      setShowAlertToast(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white rounded-3xl p-6 w-full max-w-md space-y-5 shadow-2xl border border-slate-200">
        
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-500" />
            🔔 {t.setAlertTitle}
          </h3>
          <button onClick={onClose} className="text-slate-400 font-bold hover:text-slate-700">✕</button>
        </div>

        {showAlertToast ? (
          <div className="p-5 rounded-2xl bg-emerald-500 text-white text-center space-y-2 animate-in zoom-in-95">
            <div className="w-12 h-12 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center font-bold text-2xl">
              ✓
            </div>
            <h4 className="text-lg font-black">{t.alertMsg}</h4>
            <p className="text-xs font-semibold text-emerald-100">
              Alert configured for ₹{Number(targetPrice).toLocaleString()}/quintal target in Lasalgaon APMC.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 font-medium">
              “Tell me when onion price reaches your target amount.”
            </p>

            {/* Quick Presets */}
            <div className="grid grid-cols-3 gap-2">
              {[2500, 3000, 3500].map((pr) => (
                <button
                  key={pr}
                  onClick={() => setTargetPrice(pr)}
                  className={`py-2 rounded-xl text-xs font-black border transition-all ${
                    targetPrice === pr
                      ? 'bg-onion-600 text-white border-onion-600 shadow'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100 border-slate-200'
                  }`}
                >
                  ₹{pr.toLocaleString()}
                </button>
              ))}
            </div>

            {/* Custom Price Input */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700">Custom Target Price (₹ / Quintal)</label>
              <input
                type="number"
                min="1000"
                max="10000"
                step="100"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-black text-slate-900 text-lg focus:outline-none focus:border-onion-600 bg-slate-50"
              />
            </div>

            <button
              onClick={handleSetAlert}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-onion-700 to-onion-600 text-white font-black text-sm shadow-lg hover:from-onion-800 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Bell className="w-4 h-4 text-amber-300" />
              <span>{t.setAlertBtn}</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
