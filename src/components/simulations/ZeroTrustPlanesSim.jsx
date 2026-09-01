import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Cpu, ArrowRight, CheckCircle2, UserCheck, Lock, Activity, UserX, Eye } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ZeroTrustPlanesSim() {
  const [requestState, setRequestState] = useState('idle'); // 'idle', 'evaluating', 'granted', 'denied'
  const [trustScenario, setTrustScenario] = useState('valid_employee'); // 'valid_employee' or 'suspicious_hacker'

  const handleRunRequest = () => {
    sounds.playPop();
    setRequestState('evaluating');

    setTimeout(() => {
      if (trustScenario === 'valid_employee') {
        sounds.playSuccess();
        setRequestState('granted');
      } else {
        sounds.playBuzzer();
        setRequestState('denied');
      }
    }, 1200);
  };

  const handleReset = () => {
    sounds.playPop();
    setRequestState('idle');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Zero Trust Planes • PEP, PDP, PE, PA</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            Never Trust, Always Verify! 🏰
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            Zero Trust divides responsibilities into the <strong>Data Plane (PEP Bouncer)</strong> and <strong>Control Plane (PDP Brain: PE Engine & PA Administrator)</strong>.
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A nightclub bouncer (PEP) checking with management (PDP) before letting anyone in.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <UserCheck class="w-5 h-5 text-amber-600" />
            <span>Simulate User Access Request</span>
          </h4>

          {/* Scenario Selector */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              1. Choose User Request Scenario:
            </label>
            <div class="space-y-2">
              <button
                onClick={() => {
                  setTrustScenario('valid_employee');
                  setRequestState('idle');
                  sounds.playPop();
                }}
                class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  trustScenario === 'valid_employee'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div class="flex items-center gap-2">
                  <UserCheck class="w-4 h-4 text-emerald-600" />
                  <span>Valid Employee (Clean Laptop & Known IP)</span>
                </div>
                {trustScenario === 'valid_employee' && <span class="text-[10px] bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full font-bold">Selected</span>}
              </button>

              <button
                onClick={() => {
                  setTrustScenario('suspicious_hacker');
                  setRequestState('idle');
                  sounds.playPop();
                }}
                class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  trustScenario === 'suspicious_hacker'
                    ? 'border-rose-500 bg-rose-50 text-rose-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div class="flex items-center gap-2">
                  <UserX class="w-4 h-4 text-rose-600" />
                  <span>Suspicious User (Unrecognized IP & Outdated OS)</span>
                </div>
                {trustScenario === 'suspicious_hacker' && <span class="text-[10px] bg-rose-200 text-rose-900 px-2 py-0.5 rounded-full font-bold">Selected</span>}
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleRunRequest}
            disabled={requestState === 'evaluating'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              requestState === 'evaluating'
                ? 'bg-amber-400 text-amber-950 animate-pulse cursor-wait'
                : 'bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-amber-200'
            }`}
          >
            {requestState === 'evaluating' ? (
              <span>PDP Brain Evaluating Policy Rules...</span>
            ) : (
              <>
                <Eye class="w-5 h-5" />
                <span>Submit Request to PEP Gatekeeper</span>
              </>
            )}
          </button>

          {requestState !== 'idle' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Request
            </button>
          )}
        </div>

        {/* Visual Zero Trust Architecture Diagram (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[360px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Zero Trust Control vs Data Plane</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              requestState === 'granted' ? 'bg-emerald-500 text-slate-950' : requestState === 'denied' ? 'bg-rose-500 text-white' : 'bg-amber-400 text-amber-950'
            }`}>
              {requestState === 'granted' ? 'ACCESS GRANTED' : requestState === 'denied' ? 'ACCESS DENIED' : 'WAITING FOR REQUEST'}
            </span>
          </div>

          {/* Interactive Architecture Flow */}
          <div class="my-4 space-y-4">
            
            {/* Control Plane Box (PDP) */}
            <div class={`p-4 rounded-2xl border-2 transition-all ${
              requestState === 'evaluating' ? 'bg-amber-950/80 border-amber-400 text-amber-200 animate-pulse' : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold text-amber-400 uppercase tracking-wider mb-2">
                <span>CONTROL PLANE: PDP (Policy Decision Point)</span>
                <Cpu class="w-4 h-4" />
              </div>
              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span class="font-extrabold text-white block">PE (Policy Engine)</span>
                  <span class="text-[10px] text-slate-400">Evaluates rules & risk score</span>
                </div>
                <div class="p-2.5 bg-slate-900 rounded-xl border border-slate-800">
                  <span class="font-extrabold text-white block">PA (Policy Administrator)</span>
                  <span class="text-[10px] text-slate-400">Issues command to PEP</span>
                </div>
              </div>
            </div>

            {/* Downward Arrow */}
            <div class="text-center text-slate-500 text-xs font-bold">
              ⬇️ Control Commands Sent to Data Plane ⬇️
            </div>

            {/* Data Plane Box (PEP) */}
            <div class={`p-4 rounded-2xl border-2 transition-all ${
              requestState === 'granted'
                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-lg shadow-emerald-950/50'
                : requestState === 'denied'
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/50'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class={requestState === 'granted' ? 'text-emerald-400' : requestState === 'denied' ? 'text-rose-400' : 'text-slate-400'}>
                  DATA PLANE: PEP (Policy Enforcement Point)
                </span>
                <Lock class="w-4 h-4" />
              </div>

              <p class="text-xs font-medium">
                {requestState === 'idle' && '🔒 PEP Bouncer is holding the door locked. Submit a request to evaluate!'}
                {requestState === 'evaluating' && '⏳ PEP is holding traffic while PDP evaluates rules...'}
                {requestState === 'granted' && '✅ PEP received PA command: DOOR UNLOCKED for 30 minutes!'}
                {requestState === 'denied' && '🚫 PEP received PA command: ACCESS BLOCKED! Intruder denied!'}
              </p>
            </div>

          </div>

          {/* Acronym cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">PEP = Enforcement Bouncer</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PDP = Decision Brain</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PE = Policy Evaluator</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PA = Policy Administrator</span>
          </div>

        </div>

      </div>

    </div>
  );
}
