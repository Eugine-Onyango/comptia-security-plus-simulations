import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ComplianceAuditSim() {
  const [controlsApplied, setControlsApplied] = useState(false);

  const handleApplyControls = () => {
    sounds.playSuccess();
    setControlsApplied(!controlsApplied);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Audit & Fines • SOX, HIPAA, PCI DSS, GDPR</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Multi-Regulatory Compliance Audit Simulator! ⚖️🛡️
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            Failing regulatory audits triggers devastating financial and legal penalties: loss of card processing privileges (<strong>PCI DSS</strong>), $50k/record fines (<strong>HIPAA</strong>), 4% global turnover fines (<strong>GDPR</strong>), and criminal liability (<strong>SOX</strong>)!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Passing annual health, fire, financial, and building safety inspections simultaneously.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-purple-600" />
            <span>Audit Engine Controller</span>
          </h4>

          <button
            onClick={handleApplyControls}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              controlsApplied
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
            }`}
          >
            <ShieldCheck class="w-5 h-5" />
            <span>{controlsApplied ? 'Disable Security Controls (Simulate Audit Fail)' : 'Apply All Regulatory Security Controls'}</span>
          </button>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Enterprise Compliance Dashboard</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              controlsApplied ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white animate-bounce'
            }`}>
              {controlsApplied ? 'ALL REGULATIONS PASSED 🟢' : 'REGULATORY AUDIT FAILURE 🚨'}
            </span>
          </div>

          {/* Compliance Checklist */}
          <div class="my-4 space-y-2.5 font-mono text-xs">
            
            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              controlsApplied ? 'bg-emerald-950 border-emerald-500 text-emerald-100' : 'bg-rose-950 border-rose-500 text-rose-200'
            }`}>
              <span>SOX Audit: Immutable Financial Logging</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${controlsApplied ? 'bg-emerald-800 text-emerald-100' : 'bg-rose-800 text-rose-100'}`}>
                {controlsApplied ? 'PASSED 🟢' : 'LOGS TAMPERABLE 🔴'}
              </span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              controlsApplied ? 'bg-emerald-950 border-emerald-500 text-emerald-100' : 'bg-rose-950 border-rose-500 text-rose-200'
            }`}>
              <span>HIPAA Audit: ePHI Health Data Masking</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${controlsApplied ? 'bg-emerald-800 text-emerald-100' : 'bg-rose-800 text-rose-100'}`}>
                {controlsApplied ? 'PASSED 🟢' : 'UNENCRYPTED PHI 🔴'}
              </span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              controlsApplied ? 'bg-emerald-950 border-emerald-500 text-emerald-100' : 'bg-rose-950 border-rose-500 text-rose-200'
            }`}>
              <span>PCI DSS Audit: Credit Card PAN Encryption</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${controlsApplied ? 'bg-emerald-800 text-emerald-100' : 'bg-rose-800 text-rose-100'}`}>
                {controlsApplied ? 'PASSED 🟢' : 'NO CARD SEGMENTATION 🔴'}
              </span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              controlsApplied ? 'bg-emerald-950 border-emerald-500 text-emerald-100' : 'bg-rose-950 border-rose-500 text-rose-200'
            }`}>
              <span>GDPR Audit: Right to Erasure Engine</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${controlsApplied ? 'bg-emerald-800 text-emerald-100' : 'bg-rose-800 text-rose-100'}`}>
                {controlsApplied ? 'PASSED 🟢' : 'NO DELETION PORTAL 🔴'}
              </span>
            </div>

          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            controlsApplied
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
          }`}>
            {controlsApplied ? (
              <span>✅ <strong>FULL COMPLIANCE ACHIEVED!</strong> All technical and operational safeguards for SOX, HIPAA, PCI DSS, and GDPR are verified and active!</span>
            ) : (
              <span>🚨 <strong>AUDIT FAILURES DETECTED!</strong> Organization faces catastrophic legal fines and loss of credit card processing privileges until security controls are applied!</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SOX = Accounting</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">HIPAA = Medical</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PCI DSS = Credit Cards</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">GDPR = Privacy</span>
          </div>

        </div>

      </div>

    </div>
  );
}
