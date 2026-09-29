import React from 'react';
import { AlertTriangle, BookOpenCheck, CheckCircle2, Info, Sparkles } from 'lucide-react';

const copy = {
  en: {
    title: 'Why was this batch classified this way?',
    subtitle: 'A transparent guide to the grade split and the procurement check.',
    gradeA: 'Grade A',
    gradeB: 'Grade B',
    urs: 'URS',
    gradeADescription: 'Typically sound, firm bulbs with intact skins and marketable size.',
    gradeBDescription: 'Typically saleable bulbs with minor defects or size variation; sorting may be needed.',
    ursDescription: 'Bulbs with serious defects or low marketability, such as rot, sprouting, or very small size.',
    estimatedCount: 'estimated bulbs',
    defectSignals: 'Reported defect categories',
    damaged: 'Damaged',
    rotten: 'Rotten',
    sprouted: 'Sprouted',
    undersized: 'Undersized',
    procurement: 'Procurement check',
    pass: 'Threshold met',
    fail: 'Threshold not met',
    rule: (min, max) => `Grade A must be at least ${min}% and URS must be no more than ${max}%.`,
    score: 'How the score is split',
    scoreLabel: 'Quality score',
    formula: 'Current demo calculation',
    evidence: 'Transparency note',
    notAvailable: 'A detailed scoring explanation is not available for this result.',
    noAttribution: 'These grade shares explain the reported result; they are not a pixel-level explanation of the onion image.',
    presetNote: 'This result uses pre-filled sample statistics. It does not represent image-specific visual evidence.',
    generatedNote: 'This demo derives grade shares from the quality score; it does not yet use image-specific visual evidence.',
    imageEvidence: 'The explanation method for this result is not specified.',
    unit: '%'
  },
  mr: {
    title: 'या कांद्याच्या वर्गीकरणाचे कारण काय?',
    subtitle: 'ग्रेडचे प्रमाण आणि खरेदीची अट सोप्या भाषेत.',
    gradeA: 'ग्रेड A',
    gradeB: 'ग्रेड B',
    urs: 'URS',
    gradeADescription: 'साधारणपणे चांगले, घट्ट, अखंड सालीचे आणि बाजारात विक्रीयोग्य आकाराचे कांदे.',
    gradeBDescription: 'किरकोळ दोष किंवा आकारातील फरक असलेले विक्रीयोग्य कांदे; निवड करावी लागू शकते.',
    ursDescription: 'सड, कोंब, गंभीर दोष किंवा अतिशय लहान आकारामुळे कमी विक्रीयोग्य कांदे.',
    estimatedCount: 'अंदाजे कांदे',
    defectSignals: 'नोंदवलेले दोष प्रकार',
    damaged: 'दुखापत',
    rotten: 'सडलेले',
    sprouted: 'कोंब आलेले',
    undersized: 'लहान आकाराचे',
    procurement: 'खरेदीची अट',
    pass: 'अट पूर्ण',
    fail: 'अट पूर्ण नाही',
    rule: (min, max) => `ग्रेड A किमान ${min}% आणि URS कमाल ${max}% असणे आवश्यक आहे.`,
    score: 'गुणांचे विभाजन',
    scoreLabel: 'गुणवत्ता गुण',
    formula: 'सध्याची डेमो गणना',
    evidence: 'पारदर्शकता सूचना',
    notAvailable: 'या निकालासाठी तपशीलवार गुणांकन माहिती उपलब्ध नाही.',
    noAttribution: 'हे ग्रेड प्रमाण निकाल स्पष्ट करते; कांद्याच्या फोटोतील प्रत्येक पिक्सेलचे स्पष्टीकरण नाही.',
    presetNote: 'हा निकाल आधी भरलेल्या नमुना आकडेवारीवर आधारित आहे; फोटोतील प्रत्यक्ष दृश्य पुराव्यावर नाही.',
    generatedNote: 'या डेमोमध्ये गुणवत्ता गुणांवरून ग्रेड प्रमाण काढले जाते; फोटोतील प्रत्यक्ष दृश्य पुरावा अद्याप वापरलेला नाही.',
    imageEvidence: 'या निकालासाठी स्पष्टीकरणाची पद्धत नमूद केलेली नाही.',
    unit: '%'
  },
  hi: {
    title: 'इस खेप का यह वर्गीकरण क्यों हुआ?',
    subtitle: 'ग्रेड का बँटवारा और खरीद की शर्त स्पष्ट रूप से देखें।',
    gradeA: 'ग्रेड A',
    gradeB: 'ग्रेड B',
    urs: 'URS',
    gradeADescription: 'आमतौर पर स्वस्थ, ठोस, साबुत छिलके और बिक्री योग्य आकार वाले प्याज।',
    gradeBDescription: 'हल्के दोष या आकार में अंतर वाले बिक्री योग्य प्याज; छंटाई की जरूरत हो सकती है।',
    ursDescription: 'सड़न, अंकुरण, गंभीर दोष या बहुत छोटे आकार के कारण कम बिक्री योग्य प्याज।',
    estimatedCount: 'अनुमानित प्याज',
    defectSignals: 'दर्ज किए गए दोष',
    damaged: 'क्षतिग्रस्त',
    rotten: 'सड़े हुए',
    sprouted: 'अंकुरित',
    undersized: 'छोटे आकार के',
    procurement: 'खरीद की शर्त',
    pass: 'शर्त पूरी',
    fail: 'शर्त पूरी नहीं',
    rule: (min, max) => `ग्रेड A कम से कम ${min}% और URS अधिकतम ${max}% होना चाहिए।`,
    score: 'स्कोर का विभाजन',
    scoreLabel: 'गुणवत्ता स्कोर',
    formula: 'वर्तमान डेमो गणना',
    evidence: 'पारदर्शिता सूचना',
    notAvailable: 'इस परिणाम के लिए विस्तृत स्कोरिंग विवरण उपलब्ध नहीं है।',
    noAttribution: 'ये ग्रेड प्रतिशत परिणाम को समझाते हैं; यह प्याज की छवि के हर पिक्सेल का स्पष्टीकरण नहीं है।',
    presetNote: 'यह परिणाम पहले से भरे नमूना आँकड़ों पर आधारित है, छवि के वास्तविक दृश्य साक्ष्य पर नहीं।',
    generatedNote: 'यह डेमो गुणवत्ता स्कोर से ग्रेड प्रतिशत निकालता है; छवि-विशिष्ट दृश्य साक्ष्य अभी उपयोग नहीं होता।',
    imageEvidence: 'इस परिणाम की व्याख्या विधि निर्दिष्ट नहीं है।',
    unit: '%'
  }
};

const gradeColors = {
  gradeA: 'border-emerald-200 bg-emerald-50 text-emerald-900',
  gradeB: 'border-amber-200 bg-amber-50 text-amber-900',
  urs: 'border-rose-200 bg-rose-50 text-rose-900'
};

export default function ClassificationExplanation({ resultData = {}, lang = 'en' }) {
  const t = copy[lang] || copy.en;
  const gradeA = Number(resultData.grade_a ?? 0);
  const gradeB = Number(resultData.grade_b ?? 0);
  const urs = Number(resultData.urs ?? 0);
  const total = Number(resultData.detected_onions_count ?? resultData.total_onions ?? 0);
  const explanation = resultData.classification_explanation || {};
  const procurementRule = explanation.procurement_rule || {};
  const minGradeA = Number(procurementRule.grade_a_min_percent ?? 65);
  const maxUrs = Number(procurementRule.urs_max_percent ?? 15);
  const thresholdPassed = procurementRule.passed ?? (gradeA >= minGradeA && urs <= maxUrs);
  const gradeShares = [
    { key: 'gradeA', label: t.gradeA, share: gradeA, description: t.gradeADescription },
    { key: 'gradeB', label: t.gradeB, share: gradeB, description: t.gradeBDescription },
    { key: 'urs', label: t.urs, share: urs, description: t.ursDescription }
  ];
  const reportedDefects = [
    { key: 'damaged', label: t.damaged, count: resultData.damaged },
    { key: 'rotten', label: t.rotten, count: resultData.rotten },
    { key: 'sprouted', label: t.sprouted, count: resultData.sprouted },
    { key: 'undersized', label: t.undersized, count: resultData.undersized }
  ].filter(({ count }) => count != null);
  const evidenceNote = explanation.evidence_note
    || (explanation.method === 'preset_statistics' ? t.presetNote : t.generatedNote);
  const scoreFormula = Array.isArray(explanation.score_formula)
    ? explanation.score_formula
    : [];

  return (
    <section className="rounded-3xl border border-indigo-200 bg-white p-5 shadow-sm sm:p-6" aria-labelledby="classification-explanation-title">
      <header className="mb-5 flex items-start gap-3 border-b border-slate-100 pb-4">
        <span className="rounded-xl bg-indigo-100 p-2.5 text-indigo-700">
          <BookOpenCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <h3 id="classification-explanation-title" className="text-base font-extrabold text-slate-900">
            {t.title}
          </h3>
          <p className="mt-1 text-xs text-slate-600">{t.subtitle}</p>
        </div>
      </header>

      <div className="grid gap-3 md:grid-cols-3">
        {gradeShares.map(({ key, label, share, description }) => (
          <article key={key} className={`rounded-2xl border p-4 ${gradeColors[key]}`}>
            <div className="flex items-baseline justify-between gap-2">
              <h4 className="text-sm font-extrabold">{label}</h4>
              <span className="text-2xl font-black">{share}{t.unit}</span>
            </div>
            {total > 0 && (
              <p className="mt-1 text-xs font-semibold opacity-80">
                {Math.round((share / 100) * total)} {t.estimatedCount}
              </p>
            )}
            <p className="mt-3 text-xs leading-relaxed opacity-90">{description}</p>
          </article>
        ))}
      </div>

      {reportedDefects.length > 0 && (
        <div className="mt-4 rounded-2xl border border-slate-200 p-4">
          <h4 className="mb-3 text-xs font-extrabold uppercase tracking-wide text-slate-700">
            {t.defectSignals}
          </h4>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {reportedDefects.map(({ key, label, count }) => (
              <div key={key} className="rounded-xl bg-slate-50 px-3 py-2">
                <div className="text-[11px] font-semibold text-slate-500">{label}</div>
                <div className="mt-0.5 text-lg font-extrabold text-slate-900">
                  {count}{total > 0 ? <span className="ml-1 text-xs font-semibold text-slate-500">/ {total}</span> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className={`mt-4 flex items-start gap-3 rounded-2xl border p-4 ${
        thresholdPassed
          ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
          : 'border-amber-200 bg-amber-50 text-amber-950'
      }`}>
        {thresholdPassed
          ? <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />
          : <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0" aria-hidden="true" />}
        <div>
          <div className="text-sm font-extrabold">
            {t.procurement}: {thresholdPassed ? t.pass : t.fail}
          </div>
          <p className="mt-1 text-xs leading-relaxed">{t.rule(minGradeA, maxUrs)}</p>
        </div>
      </div>

      <details className="mt-4 rounded-2xl border border-slate-200 bg-slate-50">
        <summary className="flex cursor-pointer list-none items-center gap-2 px-4 py-3 text-sm font-bold text-slate-800">
          <Sparkles className="h-4 w-4 text-indigo-600" aria-hidden="true" />
          {t.score}
        </summary>
        <div className="space-y-3 border-t border-slate-200 px-4 py-4">
          {resultData.quality_score != null && (
            <p className="text-xs font-semibold text-slate-700">
              {t.scoreLabel}: {resultData.quality_score}/100
            </p>
          )}
          {scoreFormula.length > 0 ? (
            <div>
              <p className="mb-2 text-xs font-bold text-slate-700">{t.formula}</p>
              <ul className="list-inside list-disc space-y-1 text-xs leading-relaxed text-slate-600">
                {scoreFormula.map((formula) => <li key={formula}>{formula}</li>)}
              </ul>
            </div>
          ) : (
            <p className="text-xs leading-relaxed text-slate-600">{t.notAvailable}</p>
          )}
          <p className="flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-relaxed text-amber-950">
            <Info className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
            <span><strong>{t.evidence}:</strong> {evidenceNote} {t.noAttribution}</span>
          </p>
          {!explanation.evidence_note && explanation.method !== 'preset_statistics' && !scoreFormula.length && (
            <p className="text-xs text-slate-500">{t.imageEvidence}</p>
          )}
        </div>
      </details>
    </section>
  );
}
