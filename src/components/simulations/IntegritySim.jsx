import React, { useState } from 'react';
import { ShieldCheck, AlertOctagon, RefreshCw, Sparkles, FileCheck, FileX, Sliders } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function IntegritySim() {
  const [checkAmount, setCheckAmount] = useState(10);
  const originalAmount = 10;
  const isTampered = checkAmount !== originalAmount;

  const handleAmountChange = (newVal) => {
    setCheckAmount(newVal);
    if (newVal !== originalAmount) {
      sounds.playBuzzer();
    } else {
      sounds.playSuccess();
    }
  };

  const resetCheck = () => {
    sounds.playPop();
    setCheckAmount(originalAmount);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-200/80 text-emerald-900 font-extrabold text-xs rounded-full">
            <span>The "I" in CIA</span>
          </div>
          <h3 class="text-2xl font-extrabold text-emerald-950">
            Integrity = No Sneaky Edits! ✍️
          </h3>
          <p class="text-emerald-900/80 font-medium text-sm">
            Integrity guarantees that your information hasn't been changed, tampered with, or corrupted along the way.
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-emerald-200 text-emerald-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A wax seal on a royal letter or an un-altered bank check.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-6">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Sliders class="w-5 h-5 text-emerald-600" />
            <span>Interactive Tamper Controls</span>
          </h4>

          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <span class="text-xs font-extrabold text-amber-800 uppercase tracking-wider">Original Bank Check Issued:</span>
            <div class="text-xl font-extrabold text-amber-950">
              "Pay Grandma $10 for Ice Cream" 🍦
            </div>
          </div>

          <div class="space-y-3">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Simulate an Attack / Edit in Transit:
            </label>

            <div class="grid grid-cols-1 gap-2">
              <button
                onClick={() => handleAmountChange(10)}
                class={`p-3.5 rounded-2xl border-2 font-bold text-sm text-left flex items-center justify-between transition-all ${
                  checkAmount === 10
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span>Leave Amount as $10 (Original)</span>
                {checkAmount === 10 && <span class="text-xs bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-extrabold">Untouched</span>}
              </button>

              <button
                onClick={() => handleAmountChange(10000)}
                class={`p-3.5 rounded-2xl border-2 font-bold text-sm text-left flex items-center justify-between transition-all ${
                  checkAmount === 10000
                    ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span>Sneaky Hack: Change to $10,000! 😈</span>
                {checkAmount === 10000 && <span class="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-extrabold">Tampered!</span>}
              </button>

              <button
                onClick={() => handleAmountChange(999)}
                class={`p-3.5 rounded-2xl border-2 font-bold text-sm text-left flex items-center justify-between transition-all ${
                  checkAmount === 999
                    ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span>Slight Edit: Change to $999</span>
                {checkAmount === 999 && <span class="text-xs bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-extrabold">Tampered!</span>}
              </button>
            </div>
          </div>

          {isTampered && (
            <button
              onClick={resetCheck}
              class="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl text-sm flex items-center justify-center gap-2 transition-all active:scale-95"
            >
              <RefreshCw class="w-4 h-4" /> Restore Original Check ($10)
            </button>
          )}
        </div>

        {/* Visual Check & Wax Seal (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[320px] shadow-lg relative overflow-hidden">
          
          {/* Status Bar */}
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Bank Verification Detector</span>
            {isTampered ? (
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/50 rounded-full font-extrabold text-xs animate-pulse">
                <AlertOctagon class="w-4 h-4 text-rose-400" /> INTEGRITY BROKEN!
              </span>
            ) : (
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded-full font-extrabold text-xs">
                <ShieldCheck class="w-4 h-4 text-emerald-400" /> INTEGRITY VERIFIED
              </span>
            )}
          </div>

          {/* Visual Bank Check Graphic */}
          <div class={`my-6 p-6 rounded-2xl border-4 transition-all ${
            isTampered 
              ? 'bg-rose-950/70 border-rose-500/80 shadow-lg shadow-rose-900/30' 
              : 'bg-emerald-950/70 border-emerald-400/80 shadow-lg shadow-emerald-900/30'
          }`}>
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <span class="font-extrabold text-sm text-slate-300">FRIENDLY BANK OF ICE CREAM</span>
              <span class="font-mono text-xs text-slate-400">CHECK #1001</span>
            </div>

            <div class="py-6 space-y-2">
              <div class="text-xs text-slate-400 uppercase font-semibold">Pay To The Order Of:</div>
              <div class="text-xl font-bold text-white">Grandma Smith</div>
              
              <div class="pt-4 flex items-center justify-between">
                <span class="text-xs text-slate-400 font-semibold uppercase">Amount:</span>
                <span class={`text-3xl font-extrabold ${isTampered ? 'text-rose-400 line-through' : 'text-emerald-300'}`}>
                  ${checkAmount}.00
                </span>
              </div>
            </div>

            {/* Seal Graphic */}
            <div class="pt-4 border-t border-white/10 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class={`w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold ${
                  isTampered ? 'bg-rose-600 text-white animate-bounce' : 'bg-emerald-500 text-white'
                }`}>
                  {isTampered ? '💔' : '🏵️'}
                </div>
                <div>
                  <div class="text-xs font-extrabold text-white">
                    {isTampered ? 'Digital Wax Seal BROKEN!' : 'Digital Wax Seal INTACT'}
                  </div>
                  <div class="text-[10px] text-slate-400">
                    {isTampered ? 'Hash signature does not match original!' : 'Hash checksum verified 100% identical.'}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Result explanation */}
          <p class="text-xs text-slate-300 font-medium text-center">
            {isTampered 
              ? '❌ Someone changed the amount! The integrity check failed immediately and rejected the fake check.' 
              : '✅ The message arrived exactly as written. That is Integrity!'}
          </p>

        </div>

      </div>

      {/* Plain English Takeaway */}
      <div class="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <div class="text-2xl">💡</div>
        <div class="space-y-1">
          <h5 class="font-extrabold text-amber-950 text-sm sm:text-base">Remember it in 1 sentence:</h5>
          <p class="text-amber-900 text-sm font-medium">
            <strong>Integrity = Trustworthy & Unchanged!</strong> It ensures that data (like bank balances, software downloads, or blood test results) has not been tampered with or corrupted.
          </p>
        </div>
      </div>

    </div>
  );
}
