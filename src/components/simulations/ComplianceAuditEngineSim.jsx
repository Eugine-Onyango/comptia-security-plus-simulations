import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2, XCircle, Shield, Lock, FileText } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ComplianceAuditEngineSim() {
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const [auditRunning, setAuditRunning] = useState(false);

  const handleToggleControls = () => {
    sounds.playPop();
    setControlsEnabled(!controlsEnabled);
  };

  const handleRunAudit = () => {
    setAuditRunning(true);
    if (controlsEnabled) {
      sounds.playSuccess();
    } else {
      sounds.playBuzzer();
    }
    setTimeout(() => {
      setAuditRunning(false);
    }, 600);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Enterprise Compliance Engine • Multi-Framework Audit</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Multi-Regulatory Enterprise Compliance Audit Engine! 📋🏛️
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            Auditors verify that technical safeguards meet all regulatory requirements simultaneously. Turn on encryption, audit trails, and access controls to pass your compliance audit!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A fire inspector checking alarms, extinguishers, emergency exits, and sprinkler systems all at once.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Controls Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Lock class="w-5 h-5 text-purple-600" />
            <span>Compliance Safeguards Panel</span>
          </h4>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-3 font-mono text-xs">
            <div class="flex justify-between items-center">
              <span>AES-256 Storage Encryption:</span>
              <span className={controlsEnabled ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {controlsEnabled ? 'ENABLED 🟢' : 'DISABLED 🔴'}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span>SOX Immutable Audit Logs:</span>
              <span className={controlsEnabled ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {controlsEnabled ? 'ENABLED 🟢' : 'DISABLED 🔴'}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span>HIPAA / GLBA Access Control:</span>
              <span className={controlsEnabled ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {controlsEnabled ? 'ENABLED 🟢' : 'DISABLED 🔴'}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <span>GDPR Right-to-be-Forgotten:</span>
              <span className={controlsEnabled ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {controlsEnabled ? 'ENABLED 🟢' : 'DISABLED 🔴'}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleControls}
            class={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm active:scale-95 ${
              controlsEnabled
                ? 'bg-rose-100 text-rose-800 hover:bg-rose-200 border-2 border-rose-300'
                : 'bg-emerald-100 text-emerald-900 hover:bg-emerald-200 border-2 border-emerald-300'
            }`}
          >
            {controlsEnabled ? 'Disable Safeguards (Simulate Non-Compliance 🔴)' : 'Enable All Security Safeguards (🟢)'}
          </button>

          <button
            onClick={handleRunAudit}
            disabled={auditRunning}
            class="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ClipboardCheck class="w-5 h-5" />
            <span>{auditRunning ? 'Scanning Frameworks...' : 'Execute Multi-Regulatory Compliance Audit'}</span>
          </button>
        </div>

        {/* Audit Results Ledger (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Multi-Regulatory Audit Ledger</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              controlsEnabled ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
            }`}>
              {controlsEnabled ? '100% COMPLIANT 🟢' : 'AUDIT FAILURE 🔴'}
            </span>
          </div>

          {/* Audit Framework Badges */}
          <div class="my-4 grid grid-cols-2 gap-2 font-mono text-xs">
            
            <div className={`p-3 rounded-xl border flex justify-between items-center ${
              controlsEnabled ? 'bg-slate-950 border-emerald-500/50 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
            }`}>
              <span>PCI DSS (Credit Cards):</span>
              <span>{controlsEnabled ? 'PASS 🟢' : 'FAIL 🔴'}</span>
            </div>

            <div className={`p-3 rounded-xl border flex justify-between items-center ${
              controlsEnabled ? 'bg-slate-950 border-emerald-500/50 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
            }`}>
              <span>SOX (Financials):</span>
              <span>{controlsEnabled ? 'PASS 🟢' : 'FAIL 🔴'}</span>
            </div>

            <div className={`p-3 rounded-xl border flex justify-between items-center ${
              controlsEnabled ? 'bg-slate-950 border-emerald-500/50 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
            }`}>
              <span>HIPAA (Health PHI):</span>
              <span>{controlsEnabled ? 'PASS 🟢' : 'FAIL 🔴'}</span>
            </div>

            <div className={`p-3 rounded-xl border flex justify-between items-center ${
              controlsEnabled ? 'bg-slate-950 border-emerald-500/50 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
            }`}>
              <span>GLBA (Banking):</span>
              <span>{controlsEnabled ? 'PASS 🟢' : 'FAIL 🔴'}</span>
            </div>

            <div className={`p-3 rounded-xl border flex justify-between items-center ${
              controlsEnabled ? 'bg-slate-950 border-emerald-500/50 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
            }`}>
              <span>NDA (Secrecy):</span>
              <span>{controlsEnabled ? 'PASS 🟢' : 'FAIL 🔴'}</span>
            </div>

            <div className={`p-3 rounded-xl border flex justify-between items-center ${
              controlsEnabled ? 'bg-slate-950 border-emerald-500/50 text-emerald-300' : 'bg-rose-950 border-rose-500 text-rose-300'
            }`}>
              <span>GDPR (EU Privacy):</span>
              <span>{controlsEnabled ? 'PASS 🟢' : 'FAIL 🔴'}</span>
            </div>

          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            controlsEnabled
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-rose-950 border-rose-500 text-rose-200'
          }`}>
            {controlsEnabled ? (
              <span>🟢 <strong>AUDIT PASSED:</strong> All 6 compliance mandates (PCI DSS, SOX, HIPAA, GLBA, NDA, GDPR) fully satisfied with zero fines!</span>
            ) : (
              <span>🔴 <strong>AUDIT FAILURE:</strong> Critical compliance violations detected! Non-compliance fines issued across multiple regulatory frameworks.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">Multi-Framework Compliance Engine</span>
          </div>

        </div>

      </div>

    </div>
  );
}
