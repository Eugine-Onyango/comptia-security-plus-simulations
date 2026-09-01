import React, { useState } from 'react';
import { Lock, Unlock, FileCheck, Users, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function MouNdaSim() {
  // MOU/MOA State
  const [mouActive, setMouActive] = useState(false);

  // NDA State
  const [ndaSigned, setNdaSigned] = useState(false);
  const [viewSecret, setViewSecret] = useState(false);

  const handleToggleMou = () => {
    sounds.playPop();
    setMouActive(!mouActive);
  };

  const handleSignNda = () => {
    sounds.playSuccess();
    setNdaSigned(true);
    setViewSecret(true);
  };

  const handleAttemptSecretAccess = () => {
    if (!ndaSigned) {
      sounds.playBuzzer();
      setViewSecret(false);
    } else {
      sounds.playPop();
      setViewSecret(!viewSecret);
    }
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Inter-Agency & Secrecy Policies • MOU, MOA, NDA</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            MOU / MOA Partner Bridge & NDA Legal Vault! 🤝🔒
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            An <strong>MOU (Memorandum of Understanding)</strong> or <strong>MOA (Memorandum of Agreement)</strong> establishes formal cooperation goals between organizations, while an <strong>NDA (Non-Disclosure Agreement)</strong> legally binds parties to keep proprietary trade secrets confidential!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Partnership handshake agreement (MOU/MOA) vs Signing a secrecy contract before seeing secret recipes (NDA).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* MOU/MOA Bridge Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Users class="w-5 h-5 text-indigo-600" />
            <span>1. MOU / MOA Inter-Agency Partnership</span>
          </h4>

          <div className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
            mouActive ? 'bg-indigo-950 border-indigo-500 text-indigo-100' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <div class="flex items-center justify-between font-bold text-xs">
              <span>Agency Partnership Status:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] ${mouActive ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}>
                {mouActive ? 'MOU / MOA ESTABLISHED 🤝' : 'NO FORMAL AGREEMENT'}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-center text-[11px] font-mono">
              <div class="p-2 bg-slate-900 rounded-xl border border-slate-800">
                <div class="font-bold text-indigo-300">Organization A</div>
                <div class="text-[10px] text-slate-400">Hospital System</div>
              </div>
              <div class="p-2 bg-slate-900 rounded-xl border border-slate-800">
                <div class="font-bold text-indigo-300">Organization B</div>
                <div class="text-[10px] text-slate-400">Research University</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleToggleMou}
            class={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 ${
              mouActive ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            <FileCheck class="w-4 h-4" />
            <span>{mouActive ? 'Dissolve MOU / MOA Agreement' : 'Sign MOU / MOA Inter-Agency Agreement'}</span>
          </button>
        </div>

        {/* NDA Vault Panel (Right) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Lock class="w-5 h-5 text-indigo-600" />
            <span>2. NDA Confidential Trade Secret Vault</span>
          </h4>

          <div className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
            ndaSigned ? 'bg-emerald-950 border-emerald-500 text-emerald-100' : 'bg-rose-950 border-rose-500 text-rose-100'
          }`}>
            <div class="flex items-center justify-between font-bold text-xs">
              <span>Legal NDA Status:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${ndaSigned ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'}`}>
                {ndaSigned ? 'NDA SIGNED & ENFORCED 🔒' : 'NDA NOT SIGNED 🛑'}
              </span>
            </div>

            <div class="p-3 bg-slate-900 rounded-xl font-mono text-xs space-y-1 text-center">
              <div class="text-slate-400 text-[10px]">Vault Contents:</div>
              <div class="font-bold text-amber-300 text-sm">
                {ndaSigned && viewSecret ? '🚀 Next-Gen Fusion Rocket Motor Blueprint' : '🔒 [CONFIDENTIAL PROPRIETARY TRADE SECRET]'}
              </div>
            </div>
          </div>

          <div class="flex items-center gap-2">
            {!ndaSigned ? (
              <button
                onClick={handleSignNda}
                class="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <FileCheck class="w-4 h-4" /> Sign Non-Disclosure Agreement (NDA)
              </button>
            ) : (
              <button
                onClick={handleAttemptSecretAccess}
                class="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                {viewSecret ? <Lock class="w-4 h-4" /> : <Unlock class="w-4 h-4" />}
                <span>{viewSecret ? 'Hide Confidential Blueprint' : 'Unlock & View Proprietary Data'}</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
