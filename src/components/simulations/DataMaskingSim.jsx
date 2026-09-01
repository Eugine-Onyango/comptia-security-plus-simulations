import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, ShieldAlert, FileText, CheckCircle2, UserCheck, Lock, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DataMaskingSim() {
  const [maskingLevel, setMaskingLevel] = useState('partial'); // 'none', 'partial', 'full'

  const rawPii = {
    name: 'Alice Johnson',
    ssn: '266-12-1112',
    email: 'alice.johnson@example.com',
    creditCard: '4532-8901-2345-6789'
  };

  const handleSelectLevel = (lvl) => {
    sounds.playPop();
    setMaskingLevel(lvl);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Data Masking • PII & SSN</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            Obfuscation & PII / SSN Masking! 🎨
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            <strong>PII (Personally Identifiable Information)</strong> like <strong>SSN (Social Security Numbers)</strong> are obfuscated and masked so support agents can verify users without seeing full private data!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Drawing a black marker over confidential text on a government document.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-amber-600" />
            <span>Select Obfuscation Level</span>
          </h4>

          <div class="space-y-2.5">
            {/* Level 0: None */}
            <button
              onClick={() => handleSelectLevel('none')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                maskingLevel === 'none'
                  ? 'border-rose-500 bg-rose-50 text-rose-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-rose-700 flex items-center gap-1">
                  <Eye class="w-4 h-4" /> Unmasked Plaintext (DANGEROUS)
                </div>
                <div class="text-[11px] text-slate-600 font-medium mt-0.5">Exposes raw SSN and credit card data to everyone</div>
              </div>
            </button>

            {/* Level 1: Partial Masking */}
            <button
              onClick={() => handleSelectLevel('partial')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                maskingLevel === 'partial'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-amber-900 flex items-center gap-1">
                  <EyeOff class="w-4 h-4 text-amber-600" /> Partial Masking (Support View)
                </div>
                <div class="text-[11px] text-slate-600 font-medium mt-0.5">Masks SSN as ***-**-1112 for safe verification</div>
              </div>
            </button>

            {/* Level 2: Full Tokenization */}
            <button
              onClick={() => handleSelectLevel('full')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                maskingLevel === 'full'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-emerald-800 flex items-center gap-1">
                  <Lock class="w-4 h-4 text-emerald-600" /> Full Tokenization / Anonymization
                </div>
                <div class="text-[11px] text-slate-600 font-medium mt-0.5">Scrambles all PII into random hash tokens</div>
              </div>
            </button>
          </div>

        </div>

        {/* Visual Customer Profile (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Customer Support Database View</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              maskingLevel === 'none' ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {maskingLevel === 'none' ? 'UNMASKED PII EXPOSED' : 'OBFUSCATION ACTIVE'}
            </span>
          </div>

          {/* Profile Card */}
          <div class="my-4 space-y-3">
            
            <div class="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2.5 text-xs font-mono">
              <div class="flex justify-between items-center pb-2 border-b border-slate-800">
                <span class="text-slate-400 font-bold">FULL NAME (PII):</span>
                <span class="text-white font-extrabold">
                  {maskingLevel === 'full' ? 'HASH_USER_8892A' : rawPii.name}
                </span>
              </div>

              <div class="flex justify-between items-center pb-2 border-b border-slate-800">
                <span class="text-slate-400 font-bold">SOCIAL SECURITY # (SSN):</span>
                <span class={maskingLevel === 'none' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {maskingLevel === 'none' && rawPii.ssn}
                  {maskingLevel === 'partial' && '***-**-1112'}
                  {maskingLevel === 'full' && '***-**-****'}
                </span>
              </div>

              <div class="flex justify-between items-center pb-2 border-b border-slate-800">
                <span class="text-slate-400 font-bold">EMAIL ADDRESS (PII):</span>
                <span class="text-white font-extrabold">
                  {maskingLevel === 'none' && rawPii.email}
                  {maskingLevel === 'partial' && 'a***e.j***n@example.com'}
                  {maskingLevel === 'full' && 'ANON_USER_5541@TOKEN.NET'}
                </span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-slate-400 font-bold">CREDIT CARD NUMBER:</span>
                <span class={maskingLevel === 'none' ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                  {maskingLevel === 'none' && rawPii.creditCard}
                  {maskingLevel === 'partial' && '****-****-****-6789'}
                  {maskingLevel === 'full' && 'TOK_CARD_9921_X'}
                </span>
              </div>
            </div>

            {/* Explanation Banner */}
            <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              maskingLevel === 'none' 
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' 
                : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
            }`}>
              {maskingLevel === 'none' ? (
                <span>🚫 <strong>Security Compliance Risk!</strong> Exposing raw SSN and PII to customer service reps allows identity theft.</span>
              ) : (
                <span>✅ <strong>PII & SSN Obfuscated!</strong> Support reps can confirm identity via `***-**-1112` without exposing private data.</span>
              )}
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">PII = Personally Identifiable Information</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSN = Social Security Number</span>
          </div>

        </div>

      </div>

    </div>
  );
}
