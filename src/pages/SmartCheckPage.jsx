import React, { useState } from 'react';
import OneTapCheck from '../components/farmer/OneTapCheck';
import ProcessingState from '../components/assessment/ProcessingState';
import ImageRejectionCard from '../components/farmer/ImageRejectionCard';
import BlurDarknessAlertCard from '../components/farmer/BlurDarknessAlertCard';
import LowConfidenceCard from '../components/farmer/LowConfidenceCard';
import SingleOnionNotice from '../components/farmer/SingleOnionNotice';
import TopResultCard from '../components/farmer/TopResultCard';
import ClassificationExplanation from '../components/assessment/ClassificationExplanation';
import InteractiveImageResult from '../components/farmer/InteractiveImageResult';
import StorageAdviceCard from '../components/farmer/StorageAdviceCard';
import SimpleProfitCalculator from '../components/farmer/ProfitCalculator';
import { SMART_I18N } from '../utils/i18n_smart';
import { saveFarmerRecord } from '../utils/storage';
import { API_BASE_URL } from '../services/api';
import { Sparkles, RefreshCw } from 'lucide-react';

export default function SmartCheckPage({ lang = 'mr' }) {
  const t = SMART_I18N[lang] || SMART_I18N.mr;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  const handleImageSelected = async (imageSrc, presetType = null, imageFile = null) => {
    setSelectedImage(imageSrc);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisError('');

    try {
      const formData = new FormData();
      if (imageFile) formData.append('file', imageFile);
      if (presetType) formData.append('preset_type', presetType);

      const res = await fetch(`${API_BASE_URL}/api/analyze`, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'The image analysis request failed.');

      setIsAnalyzing(false);
      setAnalysisResult(data);

      setTimeout(() => {
        const el = document.getElementById('smart-result-view');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      setIsAnalyzing(false);
      setAnalysisError(error instanceof Error ? error.message : 'Analysis failed. Please try again.');
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResult(null);
    setAnalysisError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4 pb-20">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-onion-900 to-slate-900 text-white rounded-3xl p-5 shadow-lg flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black">{t.tabCheck}</h2>
          <p className="text-xs text-slate-300 font-medium">Two-Stage Computer Vision Assessment</p>
        </div>

        {analysisResult && (
          <button
            onClick={handleReset}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 flex items-center gap-1"
          >
            <RefreshCw className="w-4 h-4" />
            Check New Photo
          </button>
        )}
      </div>

      {/* Upload Zone */}
      {!analysisResult && !isAnalyzing && (
        <OneTapCheck
          onImageSelected={(img, file) => handleImageSelected(img, null, file)}
          onPresetTestSelected={(preset, img) => handleImageSelected(img, preset)}
          lang={lang}
        />
      )}

      {/* Scanning Animation */}
      {isAnalyzing && (
        <ProcessingState sampleImage={selectedImage} />
      )}

      {analysisError && !isAnalyzing && (
        <div role="alert" className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-900">
          <p className="font-bold">Could not analyze this image.</p>
          <p className="mt-1">{analysisError}</p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-3 rounded-xl bg-rose-700 px-4 py-2 text-xs font-bold text-white hover:bg-rose-800"
          >
            Try again
          </button>
        </div>
      )}

      {/* Analysis Results View */}
      {analysisResult && !isAnalyzing && (
        <div id="smart-result-view" className="space-y-6 animate-in fade-in">
          
          {/* STAGE 1 REJECTION: NON-ONION IMAGE (Requirement #2 & #18: NO VERIFIED ONION = NO ONION RESULT) */}
          {analysisResult.status === 'rejected' && analysisResult.rejection_reason === 'not_an_onion' && (
            <ImageRejectionCard
              confidence={analysisResult.onion_confidence}
              onRetryCamera={handleReset}
              onRetryUpload={handleReset}
              lang={lang}
            />
          )}

          {/* STAGE 1 REJECTION: BLURRY / DARK / OVEREXPOSED PHOTO (Requirement #4) */}
          {analysisResult.status === 'rejected' && ['extremely_blurry', 'too_dark', 'overexposed'].includes(analysisResult.rejection_reason) && (
            <BlurDarknessAlertCard
              reason={analysisResult.rejection_reason}
              onRetry={handleReset}
              lang={lang}
            />
          )}

          {/* LOW CONFIDENCE UNCERTAIN RESULT (Requirement #13) */}
          {analysisResult.status === 'success' && analysisResult.is_uncertain && (
            <LowConfidenceCard onRetry={handleReset} />
          )}

          {/* SINGLE ONION BATCH WARNING NOTICE (Requirement #15) */}
          {analysisResult.status === 'success' && !analysisResult.is_uncertain && analysisResult.is_single_onion && (
            <SingleOnionNotice />
          )}

          {/* STAGE 2 PASSED: FULL QUALITY RESULTS */}
          {analysisResult.status === 'success' && !analysisResult.is_uncertain && (
            <>
              {/* Top Result Card */}
              <TopResultCard
                resultData={{
                  quality_score: analysisResult.quality_score,
                  grade_a: analysisResult.grade_a,
                  grade_b: analysisResult.grade_b,
                  urs: analysisResult.urs,
                  healthy: analysisResult.healthy,
                  damaged: analysisResult.damaged,
                  rotten: analysisResult.rotten,
                  sprouted: analysisResult.sprouted,
                  undersized: analysisResult.undersized,
                  expected_price: analysisResult.expected_price_formatted || '₹2,600 / quintal',
                  best_market: analysisResult.best_market || 'Lasalgaon APMC',
                  selling_advice: analysisResult.selling_advice || 'Prices are currently rising'
                }}
                lang={lang}
              />

              <ClassificationExplanation resultData={analysisResult} lang={lang} />

              {/* Interactive Bounding Box Viewer */}
              <InteractiveImageResult sampleImage={selectedImage} lang={lang} />

              {/* Storage Advice */}
              <StorageAdviceCard qualityScore={analysisResult.quality_score} lang={lang} />

              {/* Profit Math */}
              <SimpleProfitCalculator expectedPricePerQuintal={2600} lang={lang} />
            </>
          )}

        </div>
      )}

    </div>
  );
}
