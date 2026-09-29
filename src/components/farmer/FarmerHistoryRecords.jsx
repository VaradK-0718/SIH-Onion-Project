import React, { useEffect, useState } from 'react';
import { FileText, Calendar, Eye, Download, CheckCircle2 } from 'lucide-react';
import { getSavedRecords } from '../../utils/storage';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function FarmerHistoryRecords({ onViewRecord, lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(getSavedRecords());
  }, []);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md space-y-4">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-onion-600" />
          {t.tabReports} ({records.length})
        </h3>
        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          History Log
        </span>
      </div>

      <div className="space-y-3">
        {records.length > 0 ? (
          records.map((rec) => (
            <div
              key={rec.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-onion-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-slate-900 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    {rec.date}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                    🟢 {rec.quality}
                  </span>
                </div>
                <div className="text-sm font-black text-slate-800">
                  Grade A: <span className="text-emerald-700">{rec.gradeA}%</span> • Estimated Price: <span className="text-onion-700">{rec.price} / qtnl</span>
                </div>
                <p className="text-[11px] text-slate-500 font-semibold">{rec.market || 'Lasalgaon APMC'}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onViewRecord && onViewRecord(rec)}
                  className="px-4 py-2 rounded-xl bg-onion-600 hover:bg-onion-700 text-white font-extrabold text-xs shadow transition-all flex items-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Report
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-slate-400 font-semibold text-xs">
            No saved onion records yet.
          </div>
        )}
      </div>

    </div>
  );
}
