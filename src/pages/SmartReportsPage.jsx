import React, { useState } from 'react';
import FarmerHistoryRecords from '../components/farmer/FarmerHistoryRecords';
import StorageLossEstimator from '../components/farmer/StorageLossEstimator';
import SimpleProfitCalculator from '../components/farmer/ProfitCalculator';
import DigitalReportModal from '../components/assessment/DigitalReportModal';
import { SMART_I18N } from '../utils/i18n_smart';
import { FileText } from 'lucide-react';

export default function SmartReportsPage({ lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [activeReportRecord, setActiveReportRecord] = useState(null);

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 pb-20">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-onion-900 to-teal-950 text-white rounded-3xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">{t.tabReports}</h2>
          <p className="text-xs text-slate-300 font-medium">Saved Onion History & Profit Calculators</p>
        </div>
      </div>

      {/* History Records */}
      <FarmerHistoryRecords
        onViewRecord={(rec) => setActiveReportRecord(rec)}
        lang={lang}
      />

      {/* Storage Quantity Loss Estimator */}
      <StorageLossEstimator lang={lang} />

      {/* Profit Calculator */}
      <SimpleProfitCalculator expectedPricePerQuintal={2600} lang={lang} />

      {/* Report Modal */}
      {activeReportRecord && (
        <DigitalReportModal
          isOpen={!!activeReportRecord}
          onClose={() => setActiveReportRecord(null)}
          reportData={{
            sampleId: activeReportRecord.id,
            batchId: 'BATCH-2026-088',
            dateTime: activeReportRecord.date,
            center: activeReportRecord.market || 'Lasalgaon APMC',
            totalOnions: 200,
            gradeA: activeReportRecord.gradeA || 72,
            gradeB: 18,
            urs: 10,
            score: activeReportRecord.score || 87,
            confidence: 94,
            avgDiameter: 68,
            avgWeight: 82,
            defects: { damaged: 12, rotten: 5, sprouted: 3, undersized: 8 }
          }}
        />
      )}

    </div>
  );
}
