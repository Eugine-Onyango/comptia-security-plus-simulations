import React, { useState } from 'react';
import { RotateCw, CheckCircle2, Shield, ArrowRight, Award } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RmfLifecycleSim() {
  const [rmfStep, setRmfStep] = useState(1);

  const steps = [
    { id: 1, title: "1. Prepare", desc: "Identify organizational risk tolerance, key roles (CISO/DAO), and risk management strategy." },
    { id: 2, title: "2. Categorize", desc: "Categorize system & data sensitivity based on impact analysis (High/Med/Low Confidentiality, Integrity, Availability)." },
    { id: 3, title: "3. Select", desc: "Select baseline security controls from NIST SP 800-53 catalog to protect the system." },
    { id: 4, title: "4. Implement", desc: "Deploy security controls across hardware, software, and operational workflows." },
    { id: 5, title: "5. Assess", desc: "Audit and assess whether selected security controls are operating correctly as intended." },
    { id: 6, title: "6. Authorize", desc: "Senior official issues formal Authority to Operate (ATO) decision to launch system." },
    { id: 7, title: "7. Monitor", desc: "Continuously monitor security controls, threat intelligence, and system changes in real-time." }
  ];

  const handleNextStep = () => {
    sounds.playPop();
    if (rmfStep < 7) {
      setRmfStep(prev => prev + 1);
    } else {
      sounds.playSuccess();
      setRmfStep(1);
    }
  };

  const currentInfo = steps.find(s => s.id === rmfStep) || steps[0];

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Risk Framework • NIST RMF</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            NIST RMF 7-Step Lifecycle Engine! 🔄🛡️
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            The <strong>NIST RMF (Risk Management Framework - SP 800-37)</strong> provides a structured 7-step process to manage security and privacy risks across the system development lifecycle!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Building a skyscraper: blueprint, foundation, inspections, permit, and routine maintenance.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* 7-Step Lifecycle Wheel Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <RotateCw class="w-5 h-5 text-indigo-600" />
            <span>RMF Lifecycle Steps</span>
          </h4>

          <div class="space-y-2 font-mono text-xs">
            {steps.map(s => {
              const isActive = s.id === rmfStep;
              const isPast = s.id < rmfStep;

              return (
                <div
                  key={s.id}
                  onClick={() => {
                    sounds.playPop();
                    setRmfStep(s.id);
                  }}
                  class={`p-3 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-700 text-white font-extrabold shadow-md scale-102'
                      : isPast
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                  }`}
                >
                  <span>{s.title}</span>
                  {isActive && <ArrowRight class="w-4 h-4 text-white animate-pulse" />}
                  {isPast && <CheckCircle2 class="w-4 h-4 text-emerald-600" />}
                </div>
              );
            })}
          </div>

          <button
            onClick={handleNextStep}
            class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <RotateCw class="w-4 h-4" />
            <span>{rmfStep < 7 ? `Advance to Step ${rmfStep + 1} →` : 'Reset RMF Lifecycle Loop 🔄'}</span>
          </button>
        </div>

        {/* Step Inspector Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Active RMF Stage</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
              rmfStep === 6 ? 'bg-amber-400 text-slate-950' : rmfStep === 7 ? 'bg-emerald-400 text-slate-950' : 'bg-indigo-400 text-slate-950'
            }`}>
              STEP {rmfStep} OF 7
            </span>
          </div>

          {/* Detailed Description */}
          <div class="my-4 space-y-4">
            <h3 class="text-2xl font-extrabold text-indigo-300">
              {currentInfo.title}
            </h3>
            <p class="text-slate-200 text-sm leading-relaxed font-sans font-medium">
              {currentInfo.desc}
            </p>
          </div>

          {/* System Authorization Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            rmfStep >= 6 ? 'bg-emerald-950 border-emerald-500 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {rmfStep >= 6 ? (
              <span>🟢 <strong>AUTHORITY TO OPERATE (ATO) GRANTED!</strong> System has passed assessment and is authorized for production deployment.</span>
            ) : (
              <span>⏳ <strong>ATO PENDING:</strong> Complete Steps 1-5 to obtain formal executive authorization to operate.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">RMF = NIST SP 800-37</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">7-Step Lifecycle</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">ATO = Authority to Operate</span>
          </div>

        </div>

      </div>

    </div>
  );
}
