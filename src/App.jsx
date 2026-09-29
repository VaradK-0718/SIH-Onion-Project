import React, { useState } from 'react';
import SmartHeader from './components/layout/SmartHeader';
import BottomNavBar from './components/layout/BottomNavBar';
import SmartHomePage from './pages/SmartHomePage';
import SmartCheckPage from './pages/SmartCheckPage';
import SmartMarketPage from './pages/SmartMarketPage';
import SmartReportsPage from './pages/SmartReportsPage';
import ModelPerformancePage from './pages/ModelPerformancePage';
import Footer from './components/layout/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home', 'check', 'market', 'reports'
  const [lang, setLang] = useState('mr'); // Default: Marathi-first!
  const [mode, setMode] = useState('farmer'); // 'farmer' or 'admin'

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-onion-500 selection:text-white font-sans">
      
      {/* Top Header */}
      <SmartHeader
        lang={lang}
        setLang={setLang}
        mode={mode}
        setMode={setMode}
        isOnline={navigator.onLine !== false}
      />

      {/* Main Viewport */}
      <main className="flex-grow pt-4">
        {mode === 'admin' ? (
          <ModelPerformancePage />
        ) : (
          <>
            {activeTab === 'home' && (
              <SmartHomePage setActiveTab={setActiveTab} lang={lang} />
            )}

            {activeTab === 'check' && (
              <SmartCheckPage lang={lang} />
            )}

            {activeTab === 'market' && (
              <SmartMarketPage lang={lang} />
            )}

            {activeTab === 'reports' && (
              <SmartReportsPage lang={lang} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Bottom Navigation Bar (Requirement #22: Home | Check | Market | Reports) */}
      {mode === 'farmer' && (
        <BottomNavBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          lang={lang}
        />
      )}

    </div>
  );
}
