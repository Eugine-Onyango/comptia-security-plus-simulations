import React, { useState } from 'react';
import { Cpu, Zap, Activity, Flame, ShieldCheck, RefreshCw, Sliders, Server, Lock } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CpuOffloadSim() {
  const [trafficLoad, setTrafficLoad] = useState(25000); // req/sec
  const [hwAcceleration, setHwAcceleration] = useState(false); // false = CPU only, true = HSM/TPM offloaded
  const [protocols, setProtocols] = useState({
    sslTls: true,
    ssh: true,
    aesStorage: true
  });

  const handleToggleHw = () => {
    const next = !hwAcceleration;
    setHwAcceleration(next);
    if (next) {
      sounds.playSuccess();
    } else {
      sounds.playBuzzer();
    }
  };

  const handleSliderChange = (val) => {
    setTrafficLoad(val);
  };

  // Calculate CPU percentage based on load and HW acceleration
  const rawLoadRatio = trafficLoad / 50000;
  const activeProtoCount = (protocols.sslTls ? 1 : 0) + (protocols.ssh ? 1 : 0) + (protocols.aesStorage ? 1 : 0);
  
  let cpuUsage = 0;
  let cpuTemp = 35;
  if (!hwAcceleration) {
    cpuUsage = Math.min(100, Math.round(15 + rawLoadRatio * 85 * (activeProtoCount / 3)));
    cpuTemp = Math.round(40 + cpuUsage * 0.55);
  } else {
    cpuUsage = Math.min(15, Math.round(4 + rawLoadRatio * 8));
    cpuTemp = Math.round(38 + cpuUsage * 0.2);
  }

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>CPU Offloading • CPU, HSM, TPM, AES, SSL, TLS, SSH</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Offloading CPU Workload to Hardware! ⚡
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Encrypting millions of <strong>SSL/TLS</strong>, <strong>SSH</strong>, and <strong>AES</strong> requests in software exhausts the main <strong>CPU</strong>. Hardware modules (<strong>HSM/TPM</strong>) handle the math so the CPU stays cool!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Using a dishwasher instead of washing 500 dishes by hand.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-6">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Sliders class="w-5 h-5 text-indigo-600" />
            <span>Server Traffic & Accelerator Controls</span>
          </h4>

          {/* Traffic Load Slider */}
          <div class="space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-slate-700">
              <span class="uppercase tracking-wider">Encrypted Traffic Load:</span>
              <span class="text-indigo-600 font-extrabold text-sm">{trafficLoad.toLocaleString()} req/sec</span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={trafficLoad}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              class="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div class="flex justify-between text-[10px] font-bold text-slate-400">
              <span>Light (1,000)</span>
              <span>Heavy (50,000 req/sec)</span>
            </div>
          </div>

          {/* Hardware Acceleration Toggle */}
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
              Crypto Hardware Accelerator (HSM / TPM):
            </span>

            <button
              onClick={handleToggleHw}
              class={`w-full p-4 rounded-2xl border-4 text-left transition-all flex items-center justify-between active:scale-95 ${
                hwAcceleration
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-extrabold shadow-md'
                  : 'border-rose-400 bg-rose-50 text-rose-950 font-extrabold shadow-md'
              }`}
            >
              <div>
                <div class="text-base font-extrabold">
                  {hwAcceleration ? '⚡ Hardware Acceleration ON (HSM/TPM)' : '🐢 Software Only (CPU Alone)'}
                </div>
                <div class="text-xs font-medium text-slate-600 mt-0.5">
                  {hwAcceleration ? 'Cryptographic math offloaded to hardware' : 'Main CPU calculates all AES, SSL/TLS, & SSH math'}
                </div>
              </div>

              <div class={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                hwAcceleration ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white animate-pulse'
              }`}>
                {hwAcceleration ? '✅' : '🔥'}
              </div>
            </button>
          </div>

          {/* Protocols List */}
          <div class="space-y-2">
            <span class="text-xs font-bold text-slate-600 uppercase tracking-wider block">Active Encrypted Protocols:</span>
            <div class="grid grid-cols-3 gap-2 text-center text-xs font-extrabold">
              <div class="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900">
                SSL / TLS
              </div>
              <div class="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900">
                SSH Admin
              </div>
              <div class="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900">
                AES Storage
              </div>
            </div>
          </div>

        </div>

        {/* Visual CPU Gauge (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[360px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Main Server CPU Performance Monitor</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              cpuUsage > 80 ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {cpuUsage > 80 ? '🔥 CPU OVERHEAT / OVERLOAD' : '✅ CPU RUNNING COOL'}
            </span>
          </div>

          {/* Center Gauge & Heat Graphic */}
          <div class="my-6 space-y-6">
            
            {/* Meter Displays */}
            <div class="grid grid-cols-2 gap-4 text-center">
              
              {/* CPU Usage Meter */}
              <div class={`p-5 rounded-2xl border-4 transition-all ${
                cpuUsage > 80 
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg shadow-rose-900/40' 
                  : 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-900/40'
              }`}>
                <Cpu class="w-10 h-10 mx-auto mb-2" />
                <div class="text-xs font-extrabold uppercase tracking-widest text-slate-300">CPU Workload</div>
                <div class="text-4xl font-black mt-1">{cpuUsage}%</div>
              </div>

              {/* CPU Temperature Meter */}
              <div class={`p-5 rounded-2xl border-4 transition-all ${
                cpuTemp > 75 
                  ? 'bg-rose-950/80 border-rose-500 text-rose-300 shadow-lg shadow-rose-900/40' 
                  : 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-900/40'
              }`}>
                <Flame class={`w-10 h-10 mx-auto mb-2 ${cpuTemp > 75 ? 'text-rose-400 animate-bounce' : 'text-emerald-400'}`} />
                <div class="text-xs font-extrabold uppercase tracking-widest text-slate-300">CPU Temperature</div>
                <div class="text-4xl font-black mt-1">{cpuTemp}°C</div>
              </div>

            </div>

            {/* Explanatory Banner */}
            <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              hwAcceleration 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}>
              {hwAcceleration ? (
                <span>✅ <strong>HSM & TPM Active!</strong> Hardware AES engines handle the SSL/TLS, SSH, and storage math. The main CPU stays at a super cool <strong>{cpuUsage}%</strong>!</span>
              ) : (
                <span>⚠️ <strong>Software Only!</strong> The main CPU is calculating millions of SSL/TLS & AES formulas alone. CPU is spiked at <strong>{cpuUsage}%</strong>! Turn ON Hardware Acceleration to fix this!</span>
              )}
            </div>

          </div>

          {/* Acronym cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">CPU = Main Brain</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">HSM = High-end Offload Vault</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">TPM = Motherboard Chip</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">AES = Hardware Encryption Algorithm</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSL/TLS & SSH = Offloaded Protocols</span>
          </div>

        </div>

      </div>

    </div>
  );
}
