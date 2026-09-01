import React, { useState } from 'react';
import { Key, Lock, Unlock, ArrowRight, ShieldCheck, CheckCircle2, Zap, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function PkiExchangeAnimSim() {
  const [exchangeStep, setExchangeStep] = useState(0); // 0: Idle, 1: Gen Session Key, 2: Encrypt with Public Key, 3: Decrypt with Private Key, 4: Session Active
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRunExchange = () => {
    sounds.playPop();
    setIsAnimating(true);
    setExchangeStep(1);

    // Step 1: Gen Session Key
    setTimeout(() => {
      sounds.playPop();
      setExchangeStep(2);
    }, 1000);

    // Step 2: Encrypt with Public Key
    setTimeout(() => {
      sounds.playPop();
      setExchangeStep(3);
    }, 2000);

    // Step 3: Decrypt with Private Key
    setTimeout(() => {
      sounds.playSuccess();
      setExchangeStep(4);
      setIsAnimating(false);
    }, 3000);
  };

  const handleReset = () => {
    sounds.playPop();
    setExchangeStep(0);
    setIsAnimating(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>PKI & Key Exchange • PKI</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Public Key Infrastructure (PKI) Key Exchange! 🗝️🔐
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>PKI (Public Key Infrastructure)</strong> uses slow asymmetric keys (Public/Private) to securely deliver a fast <strong>Symmetric Session Key</strong> so data transfers at lightspeed!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Using a heavy padlock box once to send a fast door code.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Key class="w-5 h-5 text-indigo-600" />
            <span>PKI Key Exchange Simulator</span>
          </h4>

          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs text-slate-700 font-medium">
            <div class="font-bold text-indigo-900">Why combine Asymmetric & Symmetric?</div>
            <p>
              • <strong>Asymmetric (PKI) Keys:</strong> Super secure for exchanging keys, but too slow for big files.<br/>
              • <strong>Symmetric Keys:</strong> Super fast, but requires a secure key exchange first!
            </p>
          </div>

          <button
            onClick={handleRunExchange}
            disabled={isAnimating || exchangeStep === 4}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              exchangeStep === 4
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : isAnimating
                  ? 'bg-indigo-400 text-white animate-pulse cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {exchangeStep === 4 ? (
              <span>Symmetric Session Active!</span>
            ) : isAnimating ? (
              <span>Exchanging PKI Keys...</span>
            ) : (
              <>
                <Zap class="w-5 h-5" />
                <span>Start PKI Key Exchange</span>
              </>
            )}
          </button>

          {exchangeStep > 0 && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Key Exchange
            </button>
          )}
        </div>

        {/* Visual Stepper (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">PKI Key Exchange Protocol View</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              exchangeStep === 4 ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-500 text-white'
            }`}>
              {exchangeStep === 4 ? 'FAST SYMMETRIC ACTIVE' : `Step ${exchangeStep}/4`}
            </span>
          </div>

          {/* Stepper Cards */}
          <div class="my-4 space-y-3">
            
            {/* Step 1 */}
            <div class={`p-3.5 rounded-2xl border-2 transition-all ${
              exchangeStep >= 1 ? 'bg-indigo-950/80 border-indigo-400 text-indigo-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span>1. Generate Fast Symmetric Session Key</span>
                {exchangeStep >= 1 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <div class="text-xs font-mono">
                {exchangeStep >= 1 ? '🔑 Created 256-bit Symmetric Key (AES-256)' : '⏳ Waiting...'}
              </div>
            </div>

            {/* Step 2 */}
            <div class={`p-3.5 rounded-2xl border-2 transition-all ${
              exchangeStep >= 2 ? 'bg-purple-950/80 border-purple-400 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span>2. Encrypt Key with Alice's PKI Public Key</span>
                {exchangeStep >= 2 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <div class="text-xs font-mono">
                {exchangeStep >= 2 ? '📜 Encrypted Session Key sent across public Internet!' : '⏳ Waiting...'}
              </div>
            </div>

            {/* Step 3 */}
            <div class={`p-3.5 rounded-2xl border-2 transition-all ${
              exchangeStep >= 3 ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span>3. Decrypt Key with Alice's PKI Private Key</span>
                {exchangeStep >= 3 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <div class="text-xs font-mono">
                {exchangeStep >= 3 ? '🔑 Alice unlocked Session Key using secret Private Key!' : '⏳ Waiting...'}
              </div>
            </div>

          </div>

          {/* Explanation Banner */}
          <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            exchangeStep === 4 ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {exchangeStep === 4 ? (
              <span>⚡ <strong>PKI Key Exchange Complete!</strong> Both parties now share the fast <strong>Symmetric Session Key</strong> safely. High-speed encrypted communication active!</span>
            ) : (
              <span>Click "Start PKI Key Exchange" to see how asymmetric keys securely deliver symmetric session keys!</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">PKI = Public Key Infrastructure</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Asymmetric = Key Exchange</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Symmetric = High-Speed Session</span>
          </div>

        </div>

      </div>

    </div>
  );
}
