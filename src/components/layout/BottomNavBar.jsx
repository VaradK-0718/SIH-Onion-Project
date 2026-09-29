import React from 'react';
import { Home, Camera, Store, FileText } from 'lucide-react';
import { SMART_I18N } from '../../utils/i18n_smart';

export default function BottomNavBar({ activeTab, setActiveTab, lang }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;

  const tabs = [
    { id: 'home', label: t.tabHome, icon: Home },
    { id: 'check', label: t.tabCheck, icon: Camera },
    { id: 'market', label: t.tabMarket, icon: Store },
    { id: 'reports', label: t.tabReports, icon: FileText }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-2xl py-2 px-4">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all active:scale-95 ${
                isActive
                  ? 'bg-onion-50 text-onion-700 font-extrabold shadow-sm ring-1 ring-onion-200'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${isActive ? 'text-onion-600' : 'text-slate-400'}`} />
              <span className="text-[11px] font-extrabold leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
