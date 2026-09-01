import React, { useState, useEffect } from 'react';
import { Activity, Gauge, Cpu, Zap, AlertTriangle, ShieldCheck, RefreshCw, Radio } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ScadaIcsSim() {
  const [pressure, setPressure] = useState(45); // 0 to 100 PSI
  const [temp, setTemp] = useState(72); // 50 to 120 F
  const [valveOpen, setValveOpen] = useState(false);
  const [rtosLatency, setRtosLatency] = useState(0.8); // milliseconds
  const [isSurgeActive, setIsSurgeActive] = useState(false);

  // Live animated pulsing tick
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSurgeActive) {
        setPressure(prev => 42 + Math.floor(Math.sin(Date.now() / 500) * 4));
        setTemp(prev => 70 + Math.floor(Math.cos(Date.now() / 700) * 3));
      }
    }, 500);
    return () => clearInterval(interval);
  }, [isSurgeActive]);

  const handleSimulateSurge = () => {
    sounds.playBuzzer();
    setIsSurgeActive(true);
    setPressure(95);
    setTemp(115);

    // RTOS deterministic auto-response in 1.2ms
    setTimeout(() => {
      sounds.playSuccess();
      setValveOpen(true);
      setRtosLatency(1.1);
    }, 600);

    setTimeout(() => {
      setPressure(50);
      setTemp(75);
      setIsSurgeActive(false);
    }, 2200);
  };

  const handleReset = () => {
    sounds.playPop();
    setPressure(45);
    setTemp(72);
    setValveOpen(false);
    setIsSurgeActive(false);
    setRtosLatency(0.8);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Industrial Control & RTOS • SCADA, ICS, RTOS, IoT</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            SCADA & ICS Industrial Command Center! 🏭⚙️
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            <strong>ICS (Industrial Control Systems)</strong> and <strong>SCADA</strong> monitor factory sensors (<strong>IoT</strong>) in real-time. An <strong>RTOS (Real-Time Operating System)</strong> guarantees zero-delay microsecond responses!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Power plant control room & anti-lock car brakes (ABS).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Gauge class="w-5 h-5 text-amber-600" />
            <span>Simulate Factory Emergency Event</span>
          </h4>

          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5 text-xs text-amber-950 font-medium">
            <div class="font-extrabold flex items-center gap-1">
              <Cpu class="w-4 h-4 text-amber-700" /> RTOS Deterministic Engine:
            </div>
            <div>
              Deterministic schedule: Processing latency guaranteed under <strong class="text-amber-900">2.0 ms</strong>. No OS spinning wheels or delays!
            </div>
          </div>

          <button
            onClick={handleSimulateSurge}
            disabled={isSurgeActive}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              isSurgeActive
                ? 'bg-rose-500 text-white animate-pulse cursor-wait shadow-rose-200'
                : 'bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-amber-200'
            }`}
          >
            {isSurgeActive ? (
              <span>🚨 Emergency Pressure Surge In Progress...</span>
            ) : (
              <>
                <AlertTriangle class="w-5 h-5" />
                <span>Simulate High Pressure Pipe Surge</span>
              </>
            )}
          </button>

          {valveOpen && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Factory Valves
            </button>
          )}
        </div>

        {/* Visual Animated SCADA Dashboard (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[420px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Radio class="w-4 h-4 text-emerald-400 animate-ping" /> SCADA Telemetry Dashboard
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              isSurgeActive ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {isSurgeActive ? 'CRITICAL HIGH PRESSURE' : 'SCADA MONITOR NORMAL'}
            </span>
          </div>

          {/* Gauges Grid */}
          <div class="my-4 grid grid-cols-2 gap-4">
            
            {/* Pressure Gauge */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              pressure > 80 ? 'bg-rose-950/80 border-rose-500 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-200'
            }`}>
              <div class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>Pipe Pressure</span>
                <Gauge class="w-4 h-4" />
              </div>
              <div class="text-3xl font-black font-mono">
                {pressure} <span class="text-xs font-bold">PSI</span>
              </div>
              {/* Progress bar */}
              <div class="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  class={`h-full transition-all duration-300 ${pressure > 80 ? 'bg-rose-500' : 'bg-emerald-400'}`}
                  style={{ width: `${pressure}%` }}
                ></div>
              </div>
            </div>

            {/* Temperature Gauge */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              temp > 100 ? 'bg-amber-950/80 border-amber-500 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-200'
            }`}>
              <div class="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1 flex items-center justify-between">
                <span>IoT Sensor Temp</span>
                <Radio class="w-4 h-4 text-sky-400" />
              </div>
              <div class="text-3xl font-black font-mono">
                {temp} <span class="text-xs font-bold">°F</span>
              </div>
              {/* Progress bar */}
              <div class="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div 
                  class={`h-full transition-all duration-300 ${temp > 100 ? 'bg-amber-500' : 'bg-sky-400'}`}
                  style={{ width: `${(temp / 130) * 100}%` }}
                ></div>
              </div>
            </div>

          </div>

          {/* RTOS Valve Status Card */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            valveOpen 
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200' 
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {valveOpen ? (
              <span>⚡ <strong>RTOS Emergency Auto-Relief Triggered!</strong> In <strong>{rtosLatency}ms</strong>, the <strong>RTOS</strong> opened the relief valve without OS delay, relieving pipe pressure safely!</span>
            ) : (
              <span>⚙️ <strong>ICS Machine Ready:</strong> RTOS deterministic kernel monitoring telemetry every 1.0 millisecond.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SCADA = Supervisory Control and Data Acquisition</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">ICS = Industrial Control Systems</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">RTOS = Real-Time Operating System</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IoT = Internet of Things</span>
          </div>

        </div>

      </div>

    </div>
  );
}
