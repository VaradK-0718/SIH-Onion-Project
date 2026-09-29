import React from 'react';
import { ShieldCheck, Cpu, Database, Award } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-onion-600 flex items-center justify-center text-white font-bold text-lg">
                🧅
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                OnionGrade<span className="text-onion-400">AI</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated, objective computer vision grading system designed to eliminate subjective bias at agricultural procurement hubs, APMC mandis, and sorting centers.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              AI Vision Pipeline: Active (YOLOv11 Enabled)
            </div>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Product Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => setActiveTab('assessment')} className="hover:text-onion-300 transition-colors flex items-center gap-1.5">
                  Start Quality Assessment
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('dashboard')} className="hover:text-onion-300 transition-colors flex items-center gap-1.5">
                  Quality Intelligence Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('reports')} className="hover:text-onion-300 transition-colors flex items-center gap-1.5">
                  Digital Procurement Reports
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('about')} className="hover:text-onion-300 transition-colors flex items-center gap-1.5">
                  5-Step Detection System
                </button>
              </li>
            </ul>
          </div>

          {/* Standard Grades */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Grading Standards</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-800">
                <span className="text-emerald-400 font-semibold">Grade A</span>
                <span>Commercial Export (&gt;65mm)</span>
              </li>
              <li className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-800">
                <span className="text-amber-400 font-semibold">Grade B</span>
                <span>Domestic Standard (50-64mm)</span>
              </li>
              <li className="flex items-center justify-between bg-slate-800/50 p-2 rounded border border-slate-800">
                <span className="text-rose-400 font-semibold">URS (Reject)</span>
                <span>Defective / Undersized (&lt;45mm)</span>
              </li>
            </ul>
          </div>

          {/* Tech Spec */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">AgriTech Architecture</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Cpu className="w-4 h-4 text-onion-400" />
                <span>Computer Vision: YOLOv11 & CNN</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Database className="w-4 h-4 text-emerald-400" />
                <span>Dataset: Multi-spectral Onion Images</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>Format: ISO 22000 & AGMARK Standards</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Accuracy Target: 95%+ Target Precision</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 OnionGrade AI. Built for Modern Agricultural Procurement & APMC Mandis.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">AGMARK Standards</span>
            <span className="hover:text-slate-400 cursor-pointer">API Specs</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
