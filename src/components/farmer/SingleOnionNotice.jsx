import React from 'react';
import { Info, Layers } from 'lucide-react';

export default function SingleOnionNotice() {
  return (
    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1 text-xs font-semibold shadow-sm flex items-start gap-3">
      <div className="p-2 rounded-xl bg-amber-200 text-amber-900 font-bold flex-shrink-0">
        1 Bulb
      </div>
      <div>
        <h4 className="font-extrabold text-amber-900 text-sm">1 Onion Detected in Photo</h4>
        <p className="text-amber-900/90 text-xs">
          “Single-onion analysis cannot represent the quality of your entire batch.”
        </p>
        <span className="font-extrabold text-amber-950 block mt-1">
          💡 Tip: For better batch estimation, photograph multiple onions together.
        </span>
      </div>
    </div>
  );
}
