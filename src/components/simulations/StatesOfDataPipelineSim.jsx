import React, { useState } from 'react';
import { HardDrive, Send, Cpu, Lock, Navigation, CheckCircle2, Zap } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function StatesOfDataPipelineSim() {
  const [activeState, setActiveState] = useState('rest'); // 'rest', 'transit', 'use'

  const handleSelectState = (state) => {
    sounds.playPop();
    setActiveState(state);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-cyan-50 border-2 border-cyan-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-200/80 text-cyan-900 font-extrabold text-xs rounded-full">
            <span>Data Lifecycle • SSD, ACLs, TLS, IPsec, RAM, CPU, GPS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-cyan-950">
            The 3 Fundamental States of Data! 🧊🌊⚡
          </h3>
          <p class="text-cyan-900/80 font-medium text-sm">
            Data exists in 3 states: <strong>Data at Rest</strong> (stored on <strong>SSD</strong>), <strong>Data in Transit</strong> (moving over <strong>TLS / IPsec</strong> networks), and <strong>Data in Use</strong> (executing in <strong>RAM & CPU</strong> for real-time apps like <strong>GPS</strong>)!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-cyan-200 text-cyan-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Book on a shelf (Rest), Letter in the mail (Transit), Book being read (Use).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Zap class="w-5 h-5 text-cyan-600" />
            <span>Select State of Data to Inspect</span>
          </h4>

          <div class="space-y-2">
            
            {/* Data at Rest */}
            <button
              onClick={() => handleSelectState('rest')}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                activeState === 'rest'
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm flex items-center gap-1.5">
                <HardDrive class="w-4 h-4 text-cyan-600" /> 1. Data at Rest (SSD Storage)
              </div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Saved on SSD flash drives, secured by ACLs & AES.
              </div>
            </button>

            {/* Data in Transit */}
            <button
              onClick={() => handleSelectState('transit')}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                activeState === 'transit'
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm flex items-center gap-1.5">
                <Send class="w-4 h-4 text-cyan-600" /> 2. Data in Transit (Network Wire)
              </div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Flying across network cables via TLS & IPsec VPNs.
              </div>
            </button>

            {/* Data in Use */}
            <button
              onClick={() => handleSelectState('use')}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                activeState === 'use'
                  ? 'border-cyan-500 bg-cyan-50 text-cyan-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm flex items-center gap-1.5">
                <Cpu class="w-4 h-4 text-cyan-600" /> 3. Data in Use (RAM & CPU)
              </div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Active in RAM & CPU registers (e.g. GPS navigation).
              </div>
            </button>

          </div>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">State-Specific Security Controls</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-cyan-500 text-slate-950 uppercase">
              {activeState === 'rest' ? 'DATA AT REST' : activeState === 'transit' ? 'DATA IN TRANSIT' : 'DATA IN USE'}
            </span>
          </div>

          {/* Dynamic Content Display */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            {activeState === 'rest' && (
              <div class="p-4 bg-cyan-950/80 border border-cyan-500 rounded-2xl space-y-2 text-cyan-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span class="flex items-center gap-1.5"><HardDrive class="w-5 h-5 text-cyan-400" /> SSD Flash Storage & ACLs</span>
                  <span class="text-[10px] bg-cyan-900 px-2 py-0.5 rounded text-cyan-200">NON-VOLATILE</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Data is sitting still in non-volatile <strong>SSD</strong> flash memory. Security relies on Full Disk Encryption (BitLocker/FileVault) and File System <strong>ACLs (Access Control Lists)</strong>.
                </p>
              </div>
            )}

            {activeState === 'transit' && (
              <div class="p-4 bg-indigo-950/80 border border-indigo-500 rounded-2xl space-y-2 text-indigo-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span class="flex items-center gap-1.5"><Send class="w-5 h-5 text-indigo-400" /> TLS & IPsec Encrypted Tunnels</span>
                  <span class="text-[10px] bg-indigo-900 px-2 py-0.5 rounded text-indigo-200">NETWORK WIRE</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Data is travelling between client and server across the internet. Security relies on <strong>TLS</strong> web encryption and <strong>IPsec VPN</strong> tunnels guarded by network firewall <strong>ACLs</strong>.
                </p>
              </div>
            )}

            {activeState === 'use' && (
              <div class="p-4 bg-purple-950/80 border border-purple-500 rounded-2xl space-y-2 text-purple-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span class="flex items-center gap-1.5"><Cpu class="w-5 h-5 text-purple-400" /> CPU Registers, RAM & GPS Streams</span>
                  <span class="text-[10px] bg-purple-900 px-2 py-0.5 rounded text-purple-200">VOLATILE MEMORY</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Data is unencrypted in volatile <strong>RAM</strong> and <strong>CPU</strong> registers while being calculated in real-time (e.g. streaming <strong>GPS</strong> location coordinates). Protected by CPU enclaves & process isolation.
                </p>
              </div>
            )}

          </div>

          {/* State Summary Banner */}
          <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-center text-cyan-200">
            {activeState === 'rest' && <span>💾 <strong>Data at Rest:</strong> Protected by SSD Full Disk Encryption + ACL permission rules.</span>}
            {activeState === 'transit' && <span>🚀 <strong>Data in Transit:</strong> Protected by TLS HTTPS & IPsec VPN cryptographic tunnels.</span>}
            {activeState === 'use' && <span>⚡ <strong>Data in Use:</strong> Processed in RAM & CPU (e.g. real-time GPS positioning).</span>}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSD = Solid-State Drive</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">ACLs = Access Control Lists</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">TLS / IPsec / RAM / CPU / GPS</span>
          </div>

        </div>

      </div>

    </div>
  );
}
