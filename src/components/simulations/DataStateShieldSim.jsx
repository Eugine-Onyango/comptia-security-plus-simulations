import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, HardDrive, Send, Cpu, CheckCircle2, XCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DataStateShieldSim() {
  const [threatType, setThreatType] = useState('stolen_ssd'); // 'stolen_ssd', 'wifi_sniffer', 'ram_dump'
  const [defenseActive, setDefenseActive] = useState(true);
  const [defenseResult, setDefenseResult] = useState(null);

  const handleSimulateThreat = () => {
    sounds.playPop();
    setDefenseResult(null);

    setTimeout(() => {
      if (!defenseActive) {
        sounds.playBuzzer();
        setDefenseResult('breached');
      } else {
        sounds.playSuccess();
        setDefenseResult('protected');
      }
    }, 800);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-cyan-50 border-2 border-cyan-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-200/80 text-cyan-900 font-extrabold text-xs rounded-full">
            <span>Threat Defense • SSD, ACLs, TLS, IPsec, RAM, CPU, GPS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-cyan-950">
            Data State Security Controls & ACL Inspector! 🛡️💾
          </h3>
          <p class="text-cyan-900/80 font-medium text-sm">
            Each state of data requires tailored defenses: <strong>SSD</strong> encryption + <strong>ACLs</strong> for Data at Rest, <strong>TLS / IPsec</strong> for Data in Transit, and <strong>CPU / RAM</strong> isolation for Data in Use!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-cyan-200 text-cyan-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Bank vault (Rest), Armored truck (Transit), Teller desk shield (Use).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <ShieldAlert class="w-5 h-5 text-cyan-600" />
            <span>Select Threat Scenario</span>
          </h4>

          {/* Defense Toggle */}
          <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <div class="font-extrabold text-xs text-slate-800">State Defenses:</div>
              <div class="text-[11px] text-slate-500 font-medium">{defenseActive ? '🟢 Encryption & ACLs ACTIVE' : '🔴 Defenses Disabled'}</div>
            </div>
            <button
              onClick={() => {
                sounds.playPop();
                setDefenseActive(!defenseActive);
                setDefenseResult(null);
              }}
              class={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-sm transition-all ${
                defenseActive ? 'bg-cyan-600 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {defenseActive ? 'SHIELD ON' : 'SHIELD OFF'}
            </button>
          </div>

          {/* Threat Selection */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Select Cyber Threat:</label>
            <div class="space-y-2">
              <button
                onClick={() => {
                  sounds.playPop();
                  setThreatType('stolen_ssd');
                  setDefenseResult(null);
                }}
                class={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-xs transition-all ${
                  threatType === 'stolen_ssd'
                    ? 'border-cyan-500 bg-cyan-50 text-cyan-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                💾 Stolen Laptop SSD (Data at Rest Threat)
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setThreatType('wifi_sniffer');
                  setDefenseResult(null);
                }}
                class={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-xs transition-all ${
                  threatType === 'wifi_sniffer'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                📡 Public Wi-Fi Sniffer (Data in Transit Threat)
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setThreatType('ram_dump');
                  setDefenseResult(null);
                }}
                class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                  threatType === 'ram_dump'
                    ? 'border-purple-500 bg-purple-50 text-purple-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                ⚡ RAM Dump Injection (Data in Use Threat)
              </button>
            </div>
          </div>

          <button
            onClick={handleSimulateThreat}
            class="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-cyan-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ShieldAlert class="w-4 h-4" />
            <span>Simulate Attack against Data State</span>
          </button>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Data State Defense Engine</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              defenseResult === 'protected' ? 'bg-emerald-500 text-slate-950' : defenseResult === 'breached' ? 'bg-rose-500 text-white animate-bounce' : 'bg-cyan-500 text-slate-950'
            }`}>
              {defenseResult === 'protected' ? 'DEFENSE SUCCESS' : defenseResult === 'breached' ? 'DATA BREACHED' : 'SHIELD READY'}
            </span>
          </div>

          {/* Defense Mechanism Cards */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              threatType === 'stolen_ssd' ? 'bg-cyan-950 border-cyan-400 text-cyan-100 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>1. Data at Rest Defense (SSD Encryption & ACLs)</span>
                <span class="text-[10px] text-cyan-300">SSD / FILE ACLs</span>
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Full Disk Encryption + file system **ACLs** prevent offline drive reading.
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              threatType === 'wifi_sniffer' ? 'bg-indigo-950 border-indigo-400 text-indigo-100 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>2. Data in Transit Defense (TLS & IPsec Tunnels)</span>
                <span class="text-[10px] text-indigo-300">TLS / IPsec / ACLs</span>
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Cryptographic TLS & IPsec tunnels render packet sniffing useless.
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              threatType === 'ram_dump' ? 'bg-purple-950 border-purple-400 text-purple-100 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>3. Data in Use Defense (CPU Enclaves & Memory Isolation)</span>
                <span class="text-[10px] text-purple-300">CPU / RAM / GPS</span>
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Secure CPU registers & RAM memory enclaves protect executing real-time data.
              </p>
            </div>

          </div>

          {/* Result Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            defenseResult === 'protected'
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : defenseResult === 'breached'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
                : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {defenseResult === 'protected' && (
              <span>✅ <strong>ATTACK NEUTRALIZED!</strong> Data state controls (**SSD** AES, **TLS / IPsec** tunnels, **CPU / RAM** enclaves) successfully protected the information!</span>
            )}
            {defenseResult === 'breached' && (
              <span>💥 <strong>DATA STATE BREACHED!</strong> Without active state defenses, the attacker extracted plain data from the unencrypted storage or network stream!</span>
            )}
            {!defenseResult && (
              <span>🛡️ <strong>Shield Engine Ready:</strong> Select a threat scenario and click simulate to test data state security controls.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSD = At Rest</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">TLS / IPsec = In Transit</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CPU / RAM / GPS = In Use</span>
          </div>

        </div>

      </div>

    </div>
  );
}
