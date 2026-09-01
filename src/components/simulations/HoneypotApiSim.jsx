import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Key, Lock, AlertTriangle, ArrowRight, CheckCircle2, UserX, Bug, Eye } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function HoneypotApiSim() {
  const [trapTriggered, setTrapTriggered] = useState(false);
  const [hackerState, setHackerState] = useState('searching'); // 'searching', 'stealing', 'trapped'

  const handleBiteBait = () => {
    sounds.playPop();
    setHackerState('stealing');

    setTimeout(() => {
      sounds.playBuzzer();
      setTrapTriggered(true);
      setHackerState('trapped');
    }, 1200);
  };

  const handleReset = () => {
    sounds.playPop();
    setTrapTriggered(false);
    setHackerState('searching');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Deception & Disruption • Honeypots & API Bait</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            Honeypots & Decoy API Credentials! 🍯🪤
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            Honeypots are decoy systems planted with fake <strong>API (Application Programming Interface)</strong> credentials to trick hackers into biting tripwire alarms!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Leaving a fake wallet with a tracking chip inside on a park bench.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Bug class="w-5 h-5 text-amber-600" />
            <span>Simulate Hacker Intruder Behavior</span>
          </h4>

          <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <span class="text-xs font-extrabold text-amber-900 uppercase tracking-wider block">
              Decoy Bait Planted on Server:
            </span>
            <div class="p-3 bg-white rounded-xl border border-amber-300 font-mono text-xs text-amber-950 font-bold">
              FAKE_AWS_API_KEY = "AKIA_HONEYPOT_BAIT_9988"
            </div>
            <p class="text-[11px] text-amber-800/90 font-medium">
              This fake <strong>API</strong> credential looks like real cloud access, but is wired directly to security tripwires!
            </p>
          </div>

          <button
            onClick={handleBiteBait}
            disabled={hackerState !== 'searching'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              hackerState === 'trapped'
                ? 'bg-rose-500 text-white shadow-rose-200 cursor-not-allowed'
                : hackerState === 'stealing'
                  ? 'bg-amber-400 text-amber-950 animate-pulse cursor-wait'
                  : 'bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-amber-200'
            }`}
          >
            {hackerState === 'searching' && (
              <>
                <UserX class="w-5 h-5" />
                <span>Hacker Steals & Uses Decoy API Key</span>
              </>
            )}
            {hackerState === 'stealing' && <span>Hacker Calling Decoy API Key...</span>}
            {hackerState === 'trapped' && <span>🚨 HACKER TRAPPED IN HONEYPOT!</span>}
          </button>

          {hackerState !== 'searching' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Simulation
            </button>
          )}
        </div>

        {/* Visual Honeypot Trap Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Honeypot Decoy Tripwire Status</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              trapTriggered ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {trapTriggered ? '🚨 TRIPWIRE ALARM FIRED' : 'HONEYPOT BAIT READY'}
            </span>
          </div>

          {/* Trap Graphics */}
          <div class="my-4 space-y-4">
            
            <div class={`p-5 rounded-2xl border-4 text-center transition-all ${
              trapTriggered 
                ? 'bg-rose-950/90 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/50' 
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div class="w-16 h-16 mx-auto rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-4xl mb-3 shadow-md">
                {trapTriggered ? '🪤' : '🍯'}
              </div>

              <div class="space-y-1">
                <div class="text-base font-black text-white">
                  {trapTriggered ? 'ALERT: Hacker Tried Using Fake API Key!' : 'Decoy Honeypot Server Active'}
                </div>
                <div class="text-xs font-mono text-amber-300">
                  {trapTriggered ? 'TRIPWIRE: IP 203.0.113.88 ISOLATED & RECORDED' : 'Waiting for intruders to touch decoy API credentials...'}
                </div>
              </div>
            </div>

            {/* Explanation Banner */}
            <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              trapTriggered 
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' 
                : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
            }`}>
              {trapTriggered ? (
                <span>🚨 <strong>Bait Taken!</strong> The attacker attempted to authenticate with the fake <strong>API</strong> key. The honeypot immediately isolated their IP and alerted the security team! Real production servers remain 100% untouched.</span>
              ) : (
                <span>✅ <strong>Deception Active:</strong> Decoy files and fake API keys fool attackers into wasting time on fake targets.</span>
              )}
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">API = Application Programming Interface</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Honeypot = Decoy Server Trap</span>
          </div>

        </div>

      </div>

    </div>
  );
}
