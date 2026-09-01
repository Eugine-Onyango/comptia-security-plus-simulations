import React, { useState } from 'react';
import { ArrowRightLeft, ShieldCheck, HeartPulse, Building2, Sparkles, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CiaVsAicSim() {
  const [activeModel, setActiveModel] = useState('cia'); // 'cia' or 'aic'

  const handleSelectModel = (model) => {
    sounds.playPop();
    setActiveModel(model);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>CIA vs. AIC Comparison</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Why Do the Letters Swap Places? (CIA vs. AIC) ⚖️
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            Standard computers put <strong>Confidentiality</strong> first (CIA). But critical safety systems (hospitals, power grids, 911) put <strong>Availability</strong> first (AIC)!
          </p>
        </div>
      </div>

      {/* Interactive Scenario Selector */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* CIA Option: Bank Vault */}
        <button
          onClick={() => handleSelectModel('cia')}
          class={`p-6 rounded-3xl border-4 text-left transition-all flex flex-col justify-between gap-4 ${
            activeModel === 'cia'
              ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-orange-50 shadow-xl scale-[1.02]'
              : 'border-slate-200 bg-white hover:border-slate-300 opacity-70'
          }`}
        >
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-2xl shadow-md">
              🏦
            </div>
            {activeModel === 'cia' && (
              <span class="px-3 py-1 bg-amber-400 text-amber-950 font-extrabold text-xs rounded-full shadow-sm">
                Active View
              </span>
            )}
          </div>

          <div class="space-y-1">
            <span class="text-xs font-extrabold text-amber-700 uppercase tracking-wider">Standard IT / Banking</span>
            <h4 class="text-2xl font-extrabold text-slate-900">CIA Triad (Secrecy First!)</h4>
            <p class="text-slate-600 text-xs font-medium">
              Confidentiality → Integrity → Availability
            </p>
          </div>

          <div class="text-xs text-slate-700 font-semibold bg-white/80 p-3 rounded-xl border border-amber-200">
            "We'd rather lock down the bank vault completely than let a stranger peek at your money!"
          </div>
        </button>

        {/* AIC Option: Hospital 911 */}
        <button
          onClick={() => handleSelectModel('aic')}
          class={`p-6 rounded-3xl border-4 text-left transition-all flex flex-col justify-between gap-4 ${
            activeModel === 'aic'
              ? 'border-rose-400 bg-gradient-to-br from-rose-50 to-pink-50 shadow-xl scale-[1.02]'
              : 'border-slate-200 bg-white hover:border-slate-300 opacity-70'
          }`}
        >
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-rose-400 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
              🚑
            </div>
            {activeModel === 'aic' && (
              <span class="px-3 py-1 bg-rose-500 text-white font-extrabold text-xs rounded-full shadow-sm">
                Active View
              </span>
            )}
          </div>

          <div class="space-y-1">
            <span class="text-xs font-extrabold text-rose-700 uppercase tracking-wider">Industrial / Life Safety</span>
            <h4 class="text-2xl font-extrabold text-slate-900">AIC Triad (Uptime First!)</h4>
            <p class="text-slate-600 text-xs font-medium">
              Availability → Integrity → Confidentiality
            </p>
          </div>

          <div class="text-xs text-slate-700 font-semibold bg-white/80 p-3 rounded-xl border border-rose-200">
            "The 911 phone MUST answer immediately! Life safety comes before keeping things quiet."
          </div>
        </button>

      </div>

      {/* Priority Breakdown Diagram */}
      <div class="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-lg">
        
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h4 class="text-xl font-extrabold text-white flex items-center gap-2">
              <span>Priority Ladder for {activeModel.toUpperCase()}</span>
            </h4>
            <p class="text-xs text-slate-400 font-medium">Which principle gets the top spot?</p>
          </div>

          <span class={`px-3 py-1 rounded-full font-extrabold text-xs ${
            activeModel === 'cia' ? 'bg-amber-400 text-amber-950' : 'bg-rose-500 text-white'
          }`}>
            {activeModel === 'cia' ? 'Bank Vault Strategy' : 'Emergency Room Strategy'}
          </span>
        </div>

        <div class="space-y-4 max-w-2xl mx-auto">
          {activeModel === 'cia' ? (
            <>
              {/* Rank 1: C */}
              <div class="p-4 rounded-2xl bg-amber-500/20 border-2 border-amber-400 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <div class="font-extrabold text-amber-300 text-base">C = Confidentiality (Top Priority!)</div>
                  <div class="text-xs text-slate-300">Prevent secrets from leaking out to unauthorized thieves or rivals.</div>
                </div>
              </div>

              {/* Rank 2: I */}
              <div class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-700 text-slate-300 font-black text-xl flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <div class="font-extrabold text-white text-base">I = Integrity</div>
                  <div class="text-xs text-slate-400">Keep balances accurate and un-tampered.</div>
                </div>
              </div>

              {/* Rank 3: A */}
              <div class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-700 text-slate-300 font-black text-xl flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <div class="font-extrabold text-white text-base">A = Availability</div>
                  <div class="text-xs text-slate-400">Keep website open (if suspicious activity happens, we lock down!).</div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Rank 1: A */}
              <div class="p-4 rounded-2xl bg-rose-500/20 border-2 border-rose-400 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-rose-500 text-white font-black text-xl flex items-center justify-center shrink-0">
                  1
                </div>
                <div>
                  <div class="font-extrabold text-rose-300 text-base">A = Availability (Top Priority!)</div>
                  <div class="text-xs text-slate-300">The system MUST NOT CRASH! Life support & emergency dispatch must run 24/7.</div>
                </div>
              </div>

              {/* Rank 2: I */}
              <div class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-700 text-slate-300 font-black text-xl flex items-center justify-center shrink-0">
                  2
                </div>
                <div>
                  <div class="font-extrabold text-white text-base">I = Integrity</div>
                  <div class="text-xs text-slate-400">Dosages & medical records must be accurate.</div>
                </div>
              </div>

              {/* Rank 3: C */}
              <div class="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center gap-4">
                <div class="w-10 h-10 rounded-xl bg-slate-700 text-slate-300 font-black text-xl flex items-center justify-center shrink-0">
                  3
                </div>
                <div>
                  <div class="font-extrabold text-white text-base">C = Confidentiality</div>
                  <div class="text-xs text-slate-400">Privacy is important, but saving a life comes before paperwork privacy.</div>
                </div>
              </div>
            </>
          )}
        </div>

      </div>

      {/* Plain English Takeaway */}
      <div class="bg-purple-100/70 border-2 border-purple-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <div class="text-2xl">🧠</div>
        <div class="space-y-1">
          <h5 class="font-extrabold text-purple-950 text-sm sm:text-base">Quick Exam Hack:</h5>
          <p class="text-purple-900 text-sm font-medium">
            Both <strong>CIA</strong> and <strong>AIC</strong> mean the exact same three words (Confidentiality, Integrity, Availability). When a question asks about <strong>critical infrastructure, hospitals, or manufacturing</strong>, choose <strong>AIC</strong> because Uptime (Availability) comes first!
          </p>
        </div>
      </div>

    </div>
  );
}
