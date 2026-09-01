import React, { useState } from 'react';
import { ShieldCheck, Search, FileText, CheckCircle2, AlertTriangle, UserCheck } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DpiaScannerSim() {
  const [dpiaStep, setDpiaStep] = useState(1);
  const [anonymized, setAnonymized] = useState(false);

  const handleRunDpia = () => {
    sounds.playBuzzer();
    setDpiaStep(2);
  };

  const handleMitigate = () => {
    sounds.playSuccess();
    setAnonymized(true);
    setDpiaStep(3);
  };

  const handleReset = () => {
    sounds.playPop();
    setDpiaStep(1);
    setAnonymized(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Privacy Impact • PIA, DPIA, GDPR, EU, IP</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            DPIA High-Risk Data Assessment Engine! 🛡️🇪🇺
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Under <strong>GDPR (EU)</strong>, a <strong>Data Protection Impact Assessment (DPIA)</strong> is mandatory for high-risk processing (such as tracking <strong>IP</strong> addresses or biometrics). A <strong>PIA (Privacy Impact Assessment)</strong> evaluates general PII collection!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Environmental Impact Study before building a new factory.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Project Inspector (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Search class="w-5 h-5 text-indigo-600" />
            <span>Proposed High-Risk Data Project</span>
          </h4>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-2 font-mono text-xs">
            <div class="text-indigo-300 font-bold">Project Scope:</div>
            <div class="text-slate-200 font-sans font-medium">
              "Global Mobile App Analytics collecting EU User IP Addresses, GPS Coordinates, & Device Identifiers."
            </div>
            
            <div class="pt-2 border-t border-white/10 text-[11px] text-amber-400 font-bold">
              GDPR Jurisdiction: EU Citizens (IP classified as PII)
            </div>
          </div>

          {dpiaStep === 1 && (
            <button
              onClick={handleRunDpia}
              class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <AlertTriangle class="w-4 h-4" />
              <span>Run Mandatory DPIA Assessment</span>
            </button>
          )}

          {dpiaStep === 2 && (
            <button
              onClick={handleMitigate}
              class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 class="w-4 h-4" />
              <span>Apply DPO Recommendations (Anonymize IP)</span>
            </button>
          )}

          {dpiaStep === 3 && (
            <button
              onClick={handleReset}
              class="w-full py-4 bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <span>Test Another Project</span>
            </button>
          )}
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">DPIA Audit Status</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              dpiaStep === 3 ? 'bg-emerald-500 text-slate-950' : dpiaStep === 2 ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-500 text-slate-950'
            }`}>
              {dpiaStep === 3 ? 'DPIA APPROVED 🟢' : dpiaStep === 2 ? 'HIGH PRIVACY RISK 🔴' : 'AWAITING ASSESSMENT 🟡'}
            </span>
          </div>

          {/* Stepper Status */}
          <div class="my-4 space-y-3 font-mono text-xs">
            <div className={`p-3.5 rounded-xl border flex justify-between items-center ${
              dpiaStep >= 1 ? 'bg-slate-950 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-600'
            }`}>
              <span>Step 1: PIA Data Collection Mapping</span>
              <span>{dpiaStep >= 1 ? 'COMPLETED 🟢' : 'PENDING'}</span>
            </div>

            <div className={`p-3.5 rounded-xl border flex justify-between items-center ${
              dpiaStep >= 2 ? 'bg-slate-950 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-600'
            }`}>
              <span>Step 2: DPIA Risk Harm Assessment</span>
              <span>{dpiaStep >= 2 ? 'HIGH RISK IDENTIFIED 🔴' : 'PENDING'}</span>
            </div>

            <div className={`p-3.5 rounded-xl border flex justify-between items-center ${
              dpiaStep >= 3 ? 'bg-slate-950 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-600'
            }`}>
              <span>Step 3: DPO IP Anonymization & Approval</span>
              <span>{dpiaStep >= 3 ? 'DPO SIGN-OFF 🟢' : 'PENDING'}</span>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            dpiaStep === 3
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : dpiaStep === 2
              ? 'bg-rose-950 border-rose-500 text-rose-200'
              : 'bg-indigo-950 border-indigo-500 text-indigo-200'
          }`}>
            {dpiaStep === 3 ? (
              <span>🇪🇺 <strong>GDPR COMPLIANT:</strong> DPO approved DPIA after anonymizing IP addresses, reducing privacy harm risk to acceptable levels!</span>
            ) : dpiaStep === 2 ? (
              <span>🔴 <strong>DPIA HIGH RISK:</strong> Raw EU IP address collection violates GDPR Article 35! DPO mitigation required.</span>
            ) : (
              <span>🛡️ <strong>PIA & DPIA:</strong> Run DPIA to evaluate privacy risks before launching new software.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">PIA = General Assessment</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">DPIA = Mandatory High-Risk GDPR</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IP = Classified as PII under GDPR</span>
          </div>

        </div>

      </div>

    </div>
  );
}
