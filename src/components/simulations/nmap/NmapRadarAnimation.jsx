import React, { useState, useEffect } from 'react';
import { sounds } from '../../../utils/audio';
import { 
  Radar, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Laptop, 
  Server, 
  ArrowRight, 
  Zap, 
  Sparkles, 
  Eye, 
  AlertTriangle,
  Lock,
  DoorOpen,
  BellRing,
  Footprints
} from 'lucide-react';

export default function NmapRadarAnimation() {
  const [scanType, setScanType] = useState('stealth'); // 'stealth' (-sS), 'connect' (-sT), 'version' (-sV)
  const [targetPort, setTargetPort] = useState(80); // 80 (open), 23 (closed), 3389 (filtered)
  const [step, setStep] = useState(0); // 0: ready, 1: SYN sent, 2: Target response, 3: Scanner action / Finished
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const resetScan = () => {
    sounds.playPop();
    setStep(0);
    setIsAutoPlaying(false);
  };

  const handleNextStep = () => {
    sounds.playPop();
    if (step < 3) {
      advanceStep(step + 1);
    }
  };

  const advanceStep = (nextStep) => {
    setStep(nextStep);

    if (nextStep === 1) {
      // SYN sent
      sounds.playPop();
    } else if (nextStep === 2) {
      // Server response
      if (targetPort === 3389) {
        // Filtered: dropped by firewall
        sounds.playPop();
      } else {
        sounds.playPop();
      }
    } else if (nextStep === 3) {
      // Final outcome
      sounds.playSuccess();
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    if (step < 3) {
      const timer = setTimeout(() => {
        advanceStep(step + 1);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setIsAutoPlaying(false);
    }
  }, [isAutoPlaying, step]);

  const handleSelectScanType = (type) => {
    sounds.playPop();
    setScanType(type);
    resetScan();
  };

  const handleSelectPort = (p) => {
    sounds.playPop();
    setTargetPort(p);
    resetScan();
  };

  return (
    <div class="space-y-8">
      
      {/* Top Banner */}
      <div class="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div class="relative z-10 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md">
            <Radar class="w-4 h-4 text-emerald-300" />
            <span>Port Scanning Mechanics</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
            The Port Scanner Radar & "Ding-Dong Ditch" 🏃‍♂️🔔
          </h2>

          <p class="text-emerald-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            See the difference between <strong>`-sS` (SYN Stealth "Ding-Dong Ditch")</strong> where Nmap resets before finishing the handshake, and <strong>`-sT` (Full Connect)</strong> which leaves an obvious log on the server!
          </p>

          {/* Mode Selector Chips */}
          <div class="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => handleSelectScanType('stealth')}
              class={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 border-2 ${
                scanType === 'stealth'
                  ? 'bg-emerald-400 text-emerald-950 border-white shadow-md scale-105'
                  : 'bg-white/15 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <span>🏃‍♂️ -sS (SYN Stealth / Ding-Dong Ditch)</span>
            </button>

            <button
              onClick={() => handleSelectScanType('connect')}
              class={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 border-2 ${
                scanType === 'connect'
                  ? 'bg-amber-400 text-amber-950 border-white shadow-md scale-105'
                  : 'bg-white/15 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <span>📢 -sT (TCP Full Connect Scan)</span>
            </button>

            <button
              onClick={() => handleSelectScanType('version')}
              class={`px-4 py-2 rounded-2xl font-black text-xs transition-all flex items-center gap-1.5 border-2 ${
                scanType === 'version'
                  ? 'bg-indigo-400 text-indigo-950 border-white shadow-md scale-105'
                  : 'bg-white/15 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <span>🏷️ -sV (Service Version Probe)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Target Port Selector */}
      <div class="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="text-xs font-black uppercase text-slate-400 tracking-wider block">
            Step 1: Choose Target Door & Test Its State
          </span>
          <div class="font-extrabold text-slate-800 text-sm">
            Target Server: <code>192.168.1.50</code>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            onClick={() => handleSelectPort(80)}
            class={`px-4 py-2 rounded-xl font-black text-xs transition-all border-2 ${
              targetPort === 80
                ? 'bg-emerald-500 border-emerald-600 text-white shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Door 80 (Web • OPEN 🟢)</span>
          </button>

          <button
            onClick={() => handleSelectPort(23)}
            class={`px-4 py-2 rounded-xl font-black text-xs transition-all border-2 ${
              targetPort === 23
                ? 'bg-rose-500 border-rose-600 text-white shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Door 23 (Telnet • CLOSED 🔴)</span>
          </button>

          <button
            onClick={() => handleSelectPort(3389)}
            class={`px-4 py-2 rounded-xl font-black text-xs transition-all border-2 ${
              targetPort === 3389
                ? 'bg-amber-500 border-amber-600 text-white shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Door 3389 (RDP • FILTERED 🟡)</span>
          </button>
        </div>
      </div>

      {/* ANIMATED ARENA */}
      <div class="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-slate-700 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        
        {/* Arena Top Status Bar */}
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span class="text-xs font-black text-emerald-300">
              Nmap Command: <code>nmap {scanType === 'stealth' ? '-sS' : scanType === 'connect' ? '-sT' : '-sV'} -p {targetPort} 192.168.1.50</code>
            </span>
          </div>

          <div class="text-xs font-bold text-slate-300">
            {step === 0 && 'Ready! Click "Start Scan Probe" below'}
            {step === 1 && `Step 1: Nmap sends initial probe to Door ${targetPort}...`}
            {step === 2 && (
              targetPort === 80 
                ? 'Target replied SYN-ACK (Port is OPEN!)' 
                : targetPort === 23 
                ? 'Target host replied RST (Port is CLOSED - nobody home)' 
                : 'Firewall dropped probe! (Port is FILTERED - no reply)'
            )}
            {step === 3 && (
              scanType === 'stealth'
                ? '🏃‍♂️ Nmap fired RST lightning bolt! Handshake aborted! Zero app logs created!'
                : scanType === 'connect'
                ? '📢 Handshake completed! Apache logged connection in access.log!'
                : '🏷️ Banner Grab successful: Apache 2.4.49 (Vulnerable to CVE-2021-41773!)'
            )}
          </div>

          <div class="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-slate-300">
            Step {step} of 3
          </div>
        </div>

        {/* The Animated Court */}
        <div class="relative py-12">
          
          {/* Wire */}
          <div class="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-2 bg-slate-800 rounded-full" />

          {/* Court Participants */}
          <div class="relative flex items-center justify-between z-10">
            
            {/* 1. Nmap Scanner */}
            <div class="flex flex-col items-center text-center space-y-2">
              <div class={`w-18 h-18 sm:w-22 sm:h-22 rounded-3xl flex items-center justify-center transition-all border-3 ${
                step === 1 || step === 3
                  ? 'bg-emerald-600 border-emerald-400 scale-110 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800 border-slate-600'
              }`}>
                <Laptop class="w-10 h-10 text-white" />
              </div>
              <div>
                <div class="font-black text-xs sm:text-sm text-white">Nmap Scanner</div>
                <div class="text-[11px] text-emerald-300 font-mono">192.168.1.15</div>
              </div>
            </div>

            {/* 2. Middle Event / Firewall */}
            <div class="flex flex-col items-center text-center space-y-2 relative">
              {targetPort === 3389 && step >= 2 && (
                <div class="absolute -top-20 px-3 py-1.5 bg-amber-600 text-white rounded-2xl text-xs font-black shadow-xl border-2 border-white animate-bounce whitespace-nowrap z-20">
                  🚧 Firewall Dropped Probe! (FILTERED)
                </div>
              )}

              {targetPort === 80 && step === 3 && scanType === 'stealth' && (
                <div class="absolute -top-20 px-3 py-1.5 bg-rose-600 text-white rounded-2xl text-xs font-black shadow-xl border-2 border-white animate-bounce whitespace-nowrap z-20 flex items-center gap-1.5">
                  <Zap class="w-4 h-4 text-yellow-300" />
                  <span>RST Abort! Ding-Dong Ditch! 🏃‍♂️💨</span>
                </div>
              )}

              <div class={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center transition-all border-2 ${
                targetPort === 3389 && step >= 2
                  ? 'bg-amber-900 border-amber-400 scale-110 shadow-lg'
                  : 'bg-slate-800/80 border-slate-600'
              }`}>
                <span class="text-3xl">
                  {targetPort === 3389 && step >= 2 ? '🚧' : '🌐'}
                </span>
              </div>

              <div>
                <div class="font-black text-xs text-slate-300">
                  {targetPort === 3389 ? 'Perimeter Firewall' : 'Local Network Switch'}
                </div>
              </div>
            </div>

            {/* 3. Target Server */}
            <div class="flex flex-col items-center text-center space-y-2">
              <div class={`w-18 h-18 sm:w-22 sm:h-22 rounded-3xl flex items-center justify-center transition-all border-3 ${
                step >= 2 && targetPort === 80
                  ? 'bg-emerald-600 border-emerald-300 scale-110 shadow-lg shadow-emerald-500/30'
                  : step >= 2 && targetPort === 23
                  ? 'bg-rose-600 border-rose-400 scale-110 shadow-lg shadow-rose-500/30'
                  : 'bg-slate-800 border-slate-600'
              }`}>
                <Server class="w-10 h-10 text-white" />
              </div>
              <div>
                <div class="font-black text-xs sm:text-sm text-white">Target Server</div>
                <div class="text-[11px] text-indigo-300 font-mono">Door {targetPort}</div>
              </div>
            </div>

          </div>

          {/* FLYING PACKETS */}
          {step === 1 && (
            <div class="absolute top-1/2 left-[30%] -translate-y-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce z-20">
              <BellRing class="w-3.5 h-3.5" />
              <span>SYN Probe to Port {targetPort}</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </div>
          )}

          {step === 2 && targetPort === 80 && (
            <div class="absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 bg-emerald-400 text-slate-950 px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce z-20">
              <ArrowRight class="w-3.5 h-3.5 rotate-180" />
              <span>SYN-ACK (Door is OPEN 🟢)</span>
            </div>
          )}

          {step === 2 && targetPort === 23 && (
            <div class="absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 bg-rose-600 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce z-20">
              <ArrowRight class="w-3.5 h-3.5 rotate-180" />
              <span>RST (Nobody Home • CLOSED 🔴)</span>
            </div>
          )}

          {step === 2 && targetPort === 3389 && (
            <div class="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2 bg-amber-600 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-ping z-20">
              <span>Dropped by Firewall 🟡</span>
            </div>
          )}

          {step === 3 && targetPort === 80 && scanType === 'stealth' && (
            <div class="absolute top-1/2 left-[30%] -translate-y-1/2 -translate-x-1/2 bg-rose-600 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce z-20">
              <Zap class="w-3.5 h-3.5 text-yellow-300" />
              <span>RST (Abort Handshake!)</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </div>
          )}

          {step === 3 && targetPort === 80 && scanType === 'connect' && (
            <div class="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2 bg-blue-500 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce z-20">
              <span>ACK (Full Connection Established & Logged!)</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </div>
          )}

        </div>

        {/* Bottom Stepper Readout */}
        <div class="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-xs">
          <div class={`p-2.5 rounded-xl border transition-all ${
            step >= 1 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-500'
          }`}>
            <span class="font-black block">1. Probe Sent</span>
            <span class="text-[10px] opacity-80">Nmap knocks on Door {targetPort}</span>
          </div>

          <div class={`p-2.5 rounded-xl border transition-all ${
            step >= 2 ? 'bg-indigo-950/60 border-indigo-500 text-indigo-300' : 'bg-white/5 border-white/10 text-slate-500'
          }`}>
            <span class="font-black block">2. Target Reaction</span>
            <span class="text-[10px] opacity-80">
              {targetPort === 80 ? 'SYN-ACK (Open)' : targetPort === 23 ? 'RST (Closed)' : 'Timeout (Filtered)'}
            </span>
          </div>

          <div class={`p-2.5 rounded-xl border transition-all ${
            step >= 3 ? 'bg-purple-950/60 border-purple-500 text-purple-300' : 'bg-white/5 border-white/10 text-slate-500'
          }`}>
            <span class="font-black block">3. Scanner Verdict</span>
            <span class="text-[10px] opacity-80">
              {scanType === 'stealth' ? 'RST & Run (Stealthy)' : scanType === 'connect' ? 'ACK Handshake (Logged)' : 'Banner Grabbed'}
            </span>
          </div>
        </div>

      </div>

      {/* Controls & Server Log Status */}
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Buttons */}
        <div class="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex items-center justify-between gap-4">
          <div class="flex items-center gap-2">
            <button
              onClick={handleNextStep}
              disabled={step >= 3}
              class="px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
            >
              <Play class="w-4 h-4 fill-white" />
              <span>{step === 0 ? 'Start Probe 🔔' : step === 1 ? 'Inspect Response 🔍' : step === 2 ? 'Final Action ⚡' : 'Scan Finished!'}</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setIsAutoPlaying(true); setStep(0); advanceStep(1); }}
              disabled={isAutoPlaying || step >= 3}
              class="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs sm:text-sm rounded-2xl border-2 border-indigo-200 transition-all active:scale-95 disabled:opacity-50"
            >
              <span>Auto Play ⚡</span>
            </button>

            <button
              onClick={resetScan}
              class="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all active:scale-95"
              title="Reset"
            >
              <RotateCcw class="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Server Application Log View */}
        <div class="bg-slate-900 rounded-3xl p-5 border-2 border-slate-700 text-xs font-mono space-y-2">
          <div class="flex items-center justify-between text-slate-400">
            <span class="font-bold text-[10px] uppercase">Target Server Logger: /var/log/apache2/access.log</span>
            <span class={`px-2 py-0.5 rounded text-[10px] font-black ${
              step === 3 && scanType === 'connect' && targetPort === 80
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-emerald-900 text-emerald-300'
            }`}>
              {step === 3 && scanType === 'connect' && targetPort === 80 ? 'CONNECTION LOGGED!' : 'CLEAN / NO LOGS'}
            </span>
          </div>

          <div class="p-3 bg-black/40 rounded-xl text-slate-300 leading-relaxed text-[11px]">
            {step === 3 && scanType === 'connect' && targetPort === 80 ? (
              <span class="text-rose-400 font-bold">
                192.168.1.15 - - [09/Sep/2026:13:35:01] "TCP 3-Way Handshake ESTABLISHED" 200 - (Full connect scan detected!)
              </span>
            ) : (
              <span class="text-slate-500 italic">
                // No completed TCP sessions logged. -sS aborted the handshake before an application session could be recorded!
              </span>
            )}
          </div>
        </div>

      </div>

      {/* CompTIA Exam Tip Box */}
      <div class="bg-indigo-50 border-3 border-indigo-200 rounded-3xl p-6 shadow-sm space-y-2 text-indigo-950">
        <div class="flex items-center gap-2 font-black text-base text-indigo-900">
          <Sparkles class="w-5 h-5 text-indigo-600" />
          <span>CompTIA Security+ Exam Cheat Code: -sS vs -sT</span>
        </div>
        <p class="text-xs sm:text-sm font-medium leading-relaxed">
          Remember the <strong>Ding-Dong Ditch</strong>! <strong>`-sS`</strong> rings the doorbell (`SYN`), confirms the door unlocks (`SYN-ACK`), and runs away (`RST`) without stepping inside. 
          That is why <strong>`-sS`</strong> is the stealthy default scan in CompTIA! Use <strong>`-sT`</strong> only when you lack administrator/root privileges to craft raw packets.
        </p>
      </div>

    </div>
  );
}
