import React, { useState } from 'react';
import { Award, Globe, Building2, CheckCircle2, ShieldCheck, FileText } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function StandardsCompareSim() {
  const [activeCard, setActiveCard] = useState('nist');

  const handleSelectCard = (card) => {
    sounds.playPop();
    setActiveCard(card);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-200/80 text-blue-900 font-extrabold text-xs rounded-full">
            <span>Framework Comparison • NIST vs ISO/IEC</span>
          </div>
          <h3 class="text-2xl font-extrabold text-blue-950">
            NIST vs. ISO/IEC Framework Standards 📜
          </h3>
          <p class="text-blue-900/80 font-medium text-sm">
            <strong>NIST</strong> provides US Federal & Enterprise security blueprints. <strong>ISO</strong> & <strong>IEC</strong> team up globally to issue international <strong>ISO/IEC 27001</strong> certifications!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-blue-200 text-blue-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: US Building Codes (NIST) vs. Global ISO Quality Seals.
        </div>
      </div>

      {/* Comparison Cards Grid */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* NIST Card */}
        <div 
          onClick={() => handleSelectCard('nist')}
          class={`p-6 rounded-3xl border-4 transition-all cursor-pointer space-y-4 ${
            activeCard === 'nist'
              ? 'border-amber-400 bg-amber-50/60 shadow-xl scale-[1.01]'
              : 'border-slate-200 bg-white hover:border-slate-300 opacity-80'
          }`}
        >
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-2xl shadow-md">
              🇺🇸
            </div>
            <span class="px-3 py-1 bg-amber-200 text-amber-950 rounded-full font-extrabold text-xs">
              US Federal Standard
            </span>
          </div>

          <div class="space-y-1">
            <h4 class="text-2xl font-extrabold text-slate-900">NIST Framework</h4>
            <p class="text-xs font-bold text-amber-800 uppercase tracking-wider">
              National Institute of Standards and Technology
            </p>
          </div>

          <div class="space-y-2 text-xs text-slate-700 font-medium">
            <div class="p-3 bg-white rounded-xl border border-amber-200 flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>NIST SP 800-171:</strong> Required for non-federal computer systems handling Defense & Federal contractor data.</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-amber-200 flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong>NIST Cybersecurity Framework (CSF):</strong> Focuses on Identify, Protect, Detect, Respond, and Recover.</span>
            </div>
          </div>
        </div>

        {/* ISO / IEC Card */}
        <div 
          onClick={() => handleSelectCard('iso_iec')}
          class={`p-6 rounded-3xl border-4 transition-all cursor-pointer space-y-4 ${
            activeCard === 'iso_iec'
              ? 'border-blue-400 bg-blue-50/60 shadow-xl scale-[1.01]'
              : 'border-slate-200 bg-white hover:border-slate-300 opacity-80'
          }`}
        >
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
              🌐
            </div>
            <span class="px-3 py-1 bg-blue-200 text-blue-950 rounded-full font-extrabold text-xs">
              Global International Standard
            </span>
          </div>

          <div class="space-y-1">
            <h4 class="text-2xl font-extrabold text-slate-900">ISO / IEC Standard</h4>
            <p class="text-xs font-bold text-blue-800 uppercase tracking-wider">
              ISO (International Org for Standardization) + IEC (International Electrotechnical Commission)
            </p>
          </div>

          <div class="space-y-2 text-xs text-slate-700 font-medium">
            <div class="p-3 bg-white rounded-xl border border-blue-200 flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>ISO/IEC 27001:</strong> The global gold-standard certification for Information Security Management Systems (ISMS).</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-blue-200 flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Joint Co-Development:</strong> ISO (General Standards) and IEC (Electrotechnical Standards) co-author international IT rules together!</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
