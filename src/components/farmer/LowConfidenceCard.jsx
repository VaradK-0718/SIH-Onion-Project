import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function LowConfidenceCard({ onRetry }) {
  return (
    <div className="bg-amber-50 rounded-3xl border border-amber-300 p-6 text-center space-y-4 shadow-md">
      <div className="w-12 h-12 rounded-full bg-amber-200 text-amber-900 mx-auto flex items-center justify-center font-bold text-xl">
        ⚠️
      </div>

      <div className="space-y-1">
        <h3 className="text-xl font-extrabold text-amber-950">⚠️ Result Uncertain</h3>
        <p className="text-xs text-amber-900 font-semibold max-w-sm mx-auto">
          “Please upload a clearer image or take a photo with more onions visible.”
        </p>
      </div>

      <p className="text-[11px] text-amber-800 font-medium">
        Confidence score is below recommendation threshold. Quality grade and price recommendations are held back to prevent incorrect decisions.
      </p>

      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-xs shadow transition-all inline-flex items-center gap-1.5"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Retake Photo</span>
      </button>
    </div>
  );
}
