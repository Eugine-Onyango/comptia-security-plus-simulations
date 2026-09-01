import React, { useState } from 'react';
import { Lock, Unlock, FileCheck, ShieldAlert, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function NdaClassifierSim() {
  const [hasNda, setHasNda] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState('internal'); // 'public', 'internal', 'phi'
  const [accessResult, setAccessResult] = useState(null);

  const handleToggleNda = () => {
    sounds.playPop();
    setHasNda(!hasNda);
    setAccessResult(null);
  };

  const handleAttemptAccess = () => {
    sounds.playPop();
    setAccessResult(null);

    setTimeout(() => {
      if (selectedDoc === 'public') {
        sounds.playSuccess();
        setAccessResult('public_granted');
      } else if (selectedDoc === 'internal' && hasNda) {
        sounds.playSuccess();
        setAccessResult('nda_granted');
      } else if (selectedDoc === 'internal' && !hasNda) {
        sounds.playBuzzer();
        setAccessResult('nda_blocked');
      } else if (selectedDoc === 'phi') {
        sounds.playBuzzer();
        setAccessResult('phi_restricted');
      }
    }, 800);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Legal Confidentiality & Classification • NDA, PII, PHI</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            NDA Non-Disclosure Vault & Classification! 📜🔒
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            An <strong>NDA (Non-Disclosure Agreement)</strong> is a legal contract prohibiting unauthorized disclosure of confidential data. Data is classified as Public, Internal (NDA required), or Restricted (**PII / PHI**)!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Signing a secrecy agreement before visiting a top-secret rocket lab.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Lock class="w-5 h-5 text-indigo-600" />
            <span>Contractor Legal Status</span>
          </h4>

          {/* NDA Status Switcher */}
          <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <div class="font-extrabold text-xs text-slate-800">Signed NDA Status:</div>
              <div class="text-[11px] text-slate-500 font-medium">
                {hasNda ? '🟢 Signed NDA on File' : '🔴 NO Signed NDA'}
              </div>
            </div>
            <button
              onClick={handleToggleNda}
              class={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-sm transition-all ${
                hasNda ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {hasNda ? 'NDA SIGNED' : 'NO NDA'}
            </button>
          </div>

          {/* Document Selection */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Select Classified Document:</label>
            <div class="space-y-2">
              <button
                onClick={() => {
                  sounds.playPop();
                  setSelectedDoc('public');
                  setAccessResult(null);
                }}
                class={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-xs transition-all ${
                  selectedDoc === 'public'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                📢 Public Product Flyer (Public Class)
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setSelectedDoc('internal');
                  setAccessResult(null);
                }}
                class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                  selectedDoc === 'internal'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                🔐 Proprietary Source Code (NDA Required)
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setSelectedDoc('phi');
                  setAccessResult(null);
                }}
                class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                  selectedDoc === 'phi'
                    ? 'border-rose-500 bg-rose-50 text-rose-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                🩺 Patient Medical Records (PHI / PII Restricted)
              </button>
            </div>
          </div>

          <button
            onClick={handleAttemptAccess}
            class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <FileCheck class="w-4 h-4" />
            <span>Request Document Access</span>
          </button>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Legal Vault Classification Engine</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              hasNda ? 'bg-indigo-500 text-white' : 'bg-amber-400 text-slate-950'
            }`}>
              {hasNda ? 'NDA EXECUTED' : 'UNBOUND CONTRACTOR'}
            </span>
          </div>

          {/* Document Classification Vaults */}
          <div class="my-4 grid grid-cols-3 gap-3 text-center text-xs font-mono">
            
            {/* Vault 1: Public */}
            <div className={`p-3 rounded-2xl border-2 transition-all ${
              selectedDoc === 'public' ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="text-xl">📢</div>
              <div class="font-bold text-[11px] mt-1">Public</div>
              <div class="text-[9px] text-slate-400">No NDA Needed</div>
            </div>

            {/* Vault 2: Internal */}
            <div className={`p-3 rounded-2xl border-2 transition-all ${
              selectedDoc === 'internal' ? 'bg-indigo-950 border-indigo-400 text-indigo-200 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="text-xl">📜</div>
              <div class="font-bold text-[11px] mt-1">Confidential</div>
              <div class="text-[9px] text-indigo-300">NDA MANDATORY</div>
            </div>

            {/* Vault 3: Restricted */}
            <div className={`p-3 rounded-2xl border-2 transition-all ${
              selectedDoc === 'phi' ? 'bg-rose-950 border-rose-500 text-rose-200 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="text-xl">🩺</div>
              <div class="font-bold text-[11px] mt-1">PII / PHI</div>
              <div class="text-[9px] text-rose-300">HIPAA RESTRICTED</div>
            </div>

          </div>

          {/* Result Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            accessResult === 'public_granted' || accessResult === 'nda_granted'
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : accessResult === 'nda_blocked' || accessResult === 'phi_restricted'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
                : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {accessResult === 'public_granted' && (
              <span>✅ <strong>PUBLIC ACCESS GRANTED!</strong> Public flyers do not require an NDA.</span>
            )}
            {accessResult === 'nda_granted' && (
              <span>✅ <strong>PROPRIETARY ACCESS GRANTED UNDER NDA!</strong> Signed <strong>NDA (Non-Disclosure Agreement)</strong> verified. Confidential trade secret released.</span>
            )}
            {accessResult === 'nda_blocked' && (
              <span>🛑 <strong>ACCESS BLOCKED BY LEGAL VAULT!</strong> Contractor has NOT signed an <strong>NDA</strong>. Confidential source code cannot be shared!</span>
            )}
            {accessResult === 'phi_restricted' && (
              <span>🛑 <strong>RESTRICTED PII / PHI DATA BLOCKED!</strong> Medical records (PHI) and SSNs (PII) require special HIPAA authorization, not just a standard NDA!</span>
            )}
            {!accessResult && (
              <span>📜 <strong>Classification Vault Ready:</strong> Request document access to test NDA and PII/PHI classification rules.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">NDA = Non-Disclosure Agreement</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PII = Personal Identifiers</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PHI = Protected Health Data</span>
          </div>

        </div>

      </div>

    </div>
  );
}
