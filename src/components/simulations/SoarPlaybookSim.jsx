import React, { useState } from 'react';
import { Bot, ShieldAlert, CheckCircle2, Zap, RefreshCw, Cpu } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function SoarPlaybookSim() {
  const [soarState, setSoarState] = useState('idle'); // 'idle', 'executing', 'mitigated'

  const handleExecutePlaybook = () => {
    sounds.playBuzzer();
    setSoarState('executing');

    setTimeout(() => {
      sounds.playSuccess();
      setSoarState('mitigated');
    }, 1800);
  };

  const handleReset = () => {
    sounds.playPop();
    setSoarState('idle');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Automated Incident Response • SOAR</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            SOAR Automated Playbook Engine! 🤖⚡
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>SOAR (Security Orchestration, Automation, and Response)</strong> connects security systems together to execute automated incident response playbooks in milliseconds, neutralizing cyber threats faster than humanly possible!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Automatic sprinkler system extinguishing a fire before human firefighters arrive.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Bot class="w-5 h-5 text-indigo-600" />
            <span>SOAR Automation Controller</span>
          </h4>

          <div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl space-y-2 text-xs font-semibold text-rose-950">
            <div class="font-extrabold text-sm flex items-center gap-1.5 text-rose-900">
              <ShieldAlert class="w-4 h-4 text-rose-600" />
              <span>Incoming Alert: Malware Attack</span>
            </div>
            <p class="text-[11px] text-rose-900 leading-relaxed font-normal">
              Suspicious Ransomware activity detected on Workstation HR-Laptop-04.
            </p>
          </div>

          <button
            onClick={handleExecutePlaybook}
            disabled={soarState !== 'idle'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              soarState === 'mitigated'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : soarState === 'executing'
                  ? 'bg-indigo-500 text-white animate-pulse cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {soarState === 'executing' ? (
              <span>🤖 SOAR Playbook Executing Actions...</span>
            ) : soarState === 'mitigated' ? (
              <span>✅ Threat Mitigated in 0.18 Seconds!</span>
            ) : (
              <>
                <Zap class="w-5 h-5" />
                <span>Execute SOAR Response Playbook</span>
              </>
            )}
          </button>

          {soarState !== 'idle' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw class="w-4 h-4" /> Reset Threat Simulation
            </button>
          )}
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Bot class="w-4 h-4 text-indigo-400" /> SOAR Orchestration Execution Log
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              soarState === 'mitigated' ? 'bg-emerald-500 text-slate-950' : soarState === 'executing' ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300'
            }`}>
              {soarState === 'mitigated' ? 'AUTOMATED PLAYBOOK COMPLETE' : soarState === 'executing' ? 'PLAYBOOK RUNNING' : 'SOAR AGENT READY'}
            </span>
          </div>

          {/* Automated Playbook Actions */}
          <div class="my-4 space-y-2.5 font-mono text-xs">
            
            <div className={`p-3 rounded-xl border transition-all ${
              soarState === 'executing' || soarState === 'mitigated' ? 'bg-indigo-950 border-indigo-400 text-indigo-100' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>1. Network Switch API: Isolate Host HR-Laptop-04</span>
                {soarState !== 'idle' && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              soarState === 'mitigated' ? 'bg-indigo-950 border-indigo-400 text-indigo-100' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>2. Firewall API: Block Malicious C2 IP Address</span>
                {soarState === 'mitigated' && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
            </div>

            <div className={`p-3 rounded-xl border transition-all ${
              soarState === 'mitigated' ? 'bg-indigo-950 border-indigo-400 text-indigo-100' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>3. Active Directory API: Revoke User Token</span>
                {soarState === 'mitigated' && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
            </div>

          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            soarState === 'mitigated'
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {soarState === 'mitigated' ? (
              <span>🤖 <strong>SOAR THREAT NEUTRALIZATION COMPLETE!</strong> Automated playbook contained the ransomware attack across network, firewall, and identity systems in under 200 milliseconds!</span>
            ) : (
              <span>⚡ <strong>SOAR Ready:</strong> Click execute to trigger automated incident response playbooks.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SOAR = Security Orchestration, Automation, and Response</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Playbook Automation</span>
          </div>

        </div>

      </div>

    </div>
  );
}
