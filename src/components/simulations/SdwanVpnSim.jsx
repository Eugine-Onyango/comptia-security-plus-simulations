import React, { useState } from 'react';
import { Lock, Unlock, ShieldAlert, ShieldCheck, Zap, Server, ArrowRight, Activity } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function SdwanVpnSim() {
  const [archMode, setArchMode] = useState('ztna'); // 'vpn' or 'ztna'
  const [simState, setSimState] = useState('clean'); // 'clean' or 'breached'

  const handleToggleMode = (mode) => {
    sounds.playPop();
    setArchMode(mode);
    setSimState('clean');
  };

  const handleSimulateInfection = () => {
    sounds.playBuzzer();
    setSimState('breached');
  };

  const handleReset = () => {
    sounds.playPop();
    setSimState('clean');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Network Evolution • VPN, IPsec, TLS, TCP, SD-WAN, WAN, ZTNA, DNS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Legacy VPN vs SD-WAN & ZTNA Micro-Segmentation! 🏎️🏰
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Legacy **VPNs** (using **IPsec** or **TLS** over **TCP/IP**) connect remote users to the entire **WAN**, creating lateral movement risks. **SD-WAN** optimizes WAN routing while **ZTNA (Zero Trust Network Access)** grants access ONLY to specific authorized applications!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Full house key (VPN) vs Hotel keycard opening only Room 304 (ZTNA).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Server class="w-5 h-5 text-indigo-600" />
            <span>Select Network Architecture</span>
          </h4>

          {/* Mode Switcher */}
          <div class="space-y-2">
            <button
              onClick={() => handleToggleMode('vpn')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                archMode === 'vpn'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm">Legacy Full-Tunnel VPN (IPsec/TLS)</div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Grants full IP access to entire internal corporate WAN.
              </div>
            </button>

            <button
              onClick={() => handleToggleMode('ztna')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                archMode === 'ztna'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm">SD-WAN + ZTNA Micro-Segmentation</div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Dynamic WAN routing + per-application ZTNA access.
              </div>
            </button>
          </div>

          {/* Action Trigger */}
          <button
            onClick={handleSimulateInfection}
            disabled={simState === 'breached'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              simState === 'breached'
                ? 'bg-rose-500 text-white animate-pulse cursor-wait'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
            }`}
          >
            <ShieldAlert class="w-5 h-5" />
            <span>Simulate Ransomware Infection on Laptop</span>
          </button>

          {simState !== 'clean' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Clean Laptop & Reset Network
            </button>
          )}
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Network Boundary Topology</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              archMode === 'ztna' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
            }`}>
              {archMode === 'ztna' ? 'ZTNA MICRO-SEGMENTED' : 'LEGACY VPN TUNNEL'}
            </span>
          </div>

          {/* Internal Network Map */}
          <div class="my-4 grid grid-cols-3 gap-3 text-center text-xs font-mono">
            
            {/* App 1: HR App */}
            <div className={`p-3 rounded-2xl border-2 transition-all ${
              simState === 'breached' && archMode === 'vpn'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
                : archMode === 'ztna'
                  ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              <div class="text-xl">💼</div>
              <div class="font-bold text-[11px] mt-1">Payroll App</div>
              <div class="text-[9px] text-slate-400">Authorized App</div>
            </div>

            {/* App 2: Database */}
            <div className={`p-3 rounded-2xl border-2 transition-all ${
              simState === 'breached' && archMode === 'vpn'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
                : archMode === 'ztna'
                  ? 'bg-slate-950 border-slate-800 text-slate-600 opacity-60'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              <div class="text-xl">🗄️</div>
              <div class="font-bold text-[11px] mt-1">SQL Vault</div>
              <div class="text-[9px] text-slate-400">{archMode === 'ztna' ? 'ZTNA BLOCKED' : 'VPN EXPOSED'}</div>
            </div>

            {/* App 3: DNS Server */}
            <div className={`p-3 rounded-2xl border-2 transition-all ${
              simState === 'breached' && archMode === 'vpn'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
                : archMode === 'ztna'
                  ? 'bg-slate-950 border-slate-800 text-slate-600 opacity-60'
                  : 'bg-slate-950 border-slate-800 text-slate-300'
            }`}>
              <div class="text-xl">🌐</div>
              <div class="font-bold text-[11px] mt-1">Internal DNS</div>
              <div class="text-[9px] text-slate-400">{archMode === 'ztna' ? 'ZTNA BLOCKED' : 'VPN EXPOSED'}</div>
            </div>

          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            simState === 'breached' && archMode === 'vpn'
              ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
              : simState === 'breached' && archMode === 'ztna'
                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {simState === 'breached' && archMode === 'vpn' && (
              <span>💥 <strong>LATERAL MOVEMENT BREACH!</strong> In <strong>Legacy VPN Mode</strong>, the infected laptop had full network access and compromised the SQL Vault and Internal DNS!</span>
            )}
            {simState === 'breached' && archMode === 'ztna' && (
              <span>🛡️ <strong>RANSOMWARE CONTAINED BY ZTNA!</strong> Because <strong>ZTNA</strong> micro-segmented access ONLY to the Payroll App, ransomware could NOT spread laterally to the SQL Vault!</span>
            )}
            {simState === 'clean' && (
              <span>🏎️ <strong>Network Ready:</strong> Compare Legacy VPN vs SASE SD-WAN + ZTNA micro-segmentation.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SD-WAN = Software-Defined WAN</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">ZTNA = Zero Trust Network Access</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IPsec / TLS / TCP / DNS</span>
          </div>

        </div>

      </div>

    </div>
  );
}
