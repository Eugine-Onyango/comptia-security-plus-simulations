import React, { useState, useEffect } from 'react';
import { Cpu, BatteryCharging, Wind, Thermometer, AlertTriangle, CheckCircle2, Zap, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function HvacUpsCpuSim() {
  const [hvacState, setHvacState] = useState('on'); // 'on', 'failed'
  const [powerGrid, setPowerGrid] = useState('on'); // 'on', 'blackout'
  const [upsBattery, setUpsBattery] = useState(100); // 0 to 100%
  const [roomTemp, setRoomTemp] = useState(68); // °F
  const [cpuUsage, setCpuUsage] = useState(65); // %

  // Live simulation tick
  useEffect(() => {
    const interval = setInterval(() => {
      // Room temp adjustments
      if (hvacState === 'failed') {
        setRoomTemp(prev => Math.min(prev + 2, 115));
      } else {
        setRoomTemp(prev => Math.max(prev - 1, 68));
      }

      // UPS battery discharge during blackout
      if (powerGrid === 'blackout') {
        setUpsBattery(prev => Math.max(prev - 5, 0));
      } else {
        setUpsBattery(prev => Math.min(prev + 5, 100));
      }

      // CPU usage slight fluctuations
      setCpuUsage(prev => 60 + Math.floor(Math.sin(Date.now() / 600) * 15));
    }, 800);

    return () => clearInterval(interval);
  }, [hvacState, powerGrid]);

  const handleTogglePower = () => {
    if (powerGrid === 'on') {
      sounds.playBuzzer();
      setPowerGrid('blackout');
    } else {
      sounds.playSuccess();
      setPowerGrid('on');
    }
  };

  const handleToggleHvac = () => {
    if (hvacState === 'on') {
      sounds.playBuzzer();
      setHvacState('failed');
    } else {
      sounds.playSuccess();
      setHvacState('on');
    }
  };

  const handleReset = () => {
    sounds.playPop();
    setHvacState('on');
    setPowerGrid('on');
    setUpsBattery(100);
    setRoomTemp(68);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-sky-50 border-2 border-sky-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-200/80 text-sky-900 font-extrabold text-xs rounded-full">
            <span>Data Center Climate & Power • HVAC, UPS, CPU</span>
          </div>
          <h3 class="text-2xl font-extrabold text-sky-950">
            HVAC Cooling, UPS Battery & CPU Compute! ❄️🔋
          </h3>
          <p class="text-sky-900/80 font-medium text-sm">
            Data centers rely on <strong>HVAC (Heating, Ventilation, and Air Conditioning)</strong> to cool high-power server <strong>CPUs</strong>, and a <strong>UPS (Uninterruptible Power Supply)</strong> battery bank to survive power blackouts!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-sky-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Refrigerator room (HVAC) & emergency battery generator (UPS).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Controls (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Zap class="w-5 h-5 text-sky-600" />
            <span>Environmental Controls</span>
          </h4>

          <div class="space-y-3">
            
            {/* Power Grid Toggle */}
            <button
              onClick={handleTogglePower}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                powerGrid === 'blackout'
                  ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-950'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm flex items-center gap-1.5">
                  <Zap class="w-4 h-4" /> Main Utility Power Grid
                </div>
                <div class="text-[11px] opacity-80 mt-0.5">
                  {powerGrid === 'on' ? '🟢 City Power Grid ACTIVE' : '🔴 BLACKOUT! UPS Battery Power Active!'}
                </div>
              </div>
              <span class="px-2.5 py-1 bg-white rounded-lg border font-bold text-[10px]">
                {powerGrid === 'on' ? 'Cut Power' : 'Restore Power'}
              </span>
            </button>

            {/* HVAC Cooling Toggle */}
            <button
              onClick={handleToggleHvac}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                hvacState === 'failed'
                  ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm'
                  : 'bg-sky-50 border-sky-300 text-sky-950'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm flex items-center gap-1.5">
                  <Wind class="w-4 h-4" /> Data Center HVAC Cooling
                </div>
                <div class="text-[11px] opacity-80 mt-0.5">
                  {hvacState === 'on' ? '🌀 HVAC Air Conditioning Active (68°F)' : '⚠️ HVAC Cooling System FAILURE!'}
                </div>
              </div>
              <span class="px-2.5 py-1 bg-white rounded-lg border font-bold text-[10px]">
                {hvacState === 'on' ? 'Stop HVAC' : 'Fix HVAC'}
              </span>
            </button>

          </div>

          {(powerGrid === 'blackout' || hvacState === 'failed') && (
            <button
              onClick={handleReset}
              class="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw class="w-4 h-4" /> Restore Normal Operations
            </button>
          )}
        </div>

        {/* Display Panel (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[420px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Data Center Environmental Telemetry</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              powerGrid === 'blackout' || roomTemp > 90 ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {powerGrid === 'blackout' ? 'UPS BATTERY DISCHARGING' : roomTemp > 90 ? 'OVERHEATING WARNING' : 'ROOM ENVIRONMENT OPTIMAL'}
            </span>
          </div>

          {/* Telemetry Cards Grid */}
          <div class="my-4 grid grid-cols-3 gap-3">
            
            {/* CPU Compute Meter */}
            <div class="p-3 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
              <div class="text-[10px] font-extrabold text-slate-400 uppercase flex items-center justify-between">
                <span>CPU Workload</span>
                <Cpu class="w-3.5 h-3.5 text-sky-400" />
              </div>
              <div class="text-2xl font-black font-mono text-sky-300">{cpuUsage}%</div>
              <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div class="bg-sky-400 h-full transition-all duration-300" style={{ width: `${cpuUsage}%` }}></div>
              </div>
            </div>

            {/* Room Temperature (HVAC) */}
            <div className={`p-3 rounded-2xl border transition-all ${
              roomTemp > 90 ? 'bg-rose-950/80 border-rose-500 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-200'
            }`}>
              <div class="text-[10px] font-extrabold text-slate-400 uppercase flex items-center justify-between">
                <span>HVAC Temp</span>
                <Thermometer class="w-3.5 h-3.5" />
              </div>
              <div class="text-2xl font-black font-mono">{roomTemp}°F</div>
              <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  class={`h-full transition-all duration-300 ${roomTemp > 90 ? 'bg-rose-500' : 'bg-emerald-400'}`} 
                  style={{ width: `${(roomTemp / 120) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* UPS Battery Capacity */}
            <div className={`p-3 rounded-2xl border transition-all ${
              powerGrid === 'blackout' ? 'bg-amber-950/80 border-amber-500 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-200'
            }`}>
              <div class="text-[10px] font-extrabold text-slate-400 uppercase flex items-center justify-between">
                <span>UPS Battery</span>
                <BatteryCharging class="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <div class="text-2xl font-black font-mono">{upsBattery}%</div>
              <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div 
                  class={`h-full transition-all duration-300 ${upsBattery < 30 ? 'bg-rose-500' : 'bg-emerald-400'}`} 
                  style={{ width: `${upsBattery}%` }}
                ></div>
              </div>
            </div>

          </div>

          {/* Explanation Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            powerGrid === 'blackout' 
              ? 'bg-amber-950 border-amber-500 text-amber-200' 
              : roomTemp > 90 
                ? 'bg-rose-950 border-rose-500 text-rose-200' 
                : 'bg-emerald-950 border-emerald-500 text-emerald-200'
          }`}>
            {powerGrid === 'blackout' ? (
              <span>⚡ <strong>UPS Active:</strong> Main power lost! The <strong>UPS (Uninterruptible Power Supply)</strong> battery bank is preventing immediate server crashes while diesel generators warm up.</span>
            ) : roomTemp > 90 ? (
              <span>🔥 <strong>HVAC Warning:</strong> Data center temperature rising! High <strong>CPU</strong> temperatures can cause automatic thermal throttling or permanent silicon damage.</span>
            ) : (
              <span>✅ <strong>Environment Optimal:</strong> <strong>HVAC</strong> cooling maintaining 68°F; <strong>UPS</strong> fully charged at 100%.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">HVAC = Heating, Ventilation, & Air Conditioning</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">UPS = Uninterruptible Power Supply</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CPU = Central Processing Unit</span>
          </div>

        </div>

      </div>

    </div>
  );
}
