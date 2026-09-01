import React, { useState } from 'react';
import { Camera, Sun, Moon, Eye, EyeOff, ShieldCheck, ShieldAlert, Zap, AlertTriangle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CctvIrNightSim() {
  const [isNight, setIsNight] = useState(false);
  const [irEnabled, setIrEnabled] = useState(false);
  const [intruderPresent, setIntruderPresent] = useState(true);

  const handleToggleNight = () => {
    sounds.playPop();
    setIsNight(prev => !prev);
  };

  const handleToggleIr = () => {
    const next = !irEnabled;
    setIrEnabled(next);
    if (next) sounds.playSuccess();
    else sounds.playBuzzer();
  };

  const canSeeIntruder = !isNight || irEnabled;

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Physical Security • CCTV & IR</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            CCTV Video Surveillance & IR Night Vision! 📹🌙
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>CCTV (Closed-Circuit Television)</strong> streams private security video. In total darkness, <strong>IR (Infrared)</strong> LEDs illuminate the scene so night-vision cameras spot intruders!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Security guards using thermal night-vision goggles in a pitch-black warehouse.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Camera class="w-5 h-5 text-indigo-600" />
            <span>Camera Environment Controls</span>
          </h4>

          {/* 1. Time of Day Toggle */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              1. Ambient Lighting Environment:
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={handleToggleNight}
                class={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  !isNight
                    ? 'border-amber-400 bg-amber-50 text-amber-950 shadow-sm'
                    : 'border-slate-800 bg-slate-900 text-slate-300'
                }`}
              >
                <Sun class={`w-4 h-4 ${!isNight ? 'text-amber-500' : 'text-slate-500'}`} />
                <span>Daylight ☀️</span>
              </button>

              <button
                onClick={handleToggleNight}
                class={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  isNight
                    ? 'border-indigo-500 bg-indigo-950 text-indigo-200 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Moon class={`w-4 h-4 ${isNight ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>Pitch Black Night 🌙</span>
              </button>
            </div>
          </div>

          {/* 2. IR Night Vision Toggle */}
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
              Camera IR (Infrared Night Vision):
            </span>

            <button
              onClick={handleToggleIr}
              class={`w-full p-3.5 rounded-2xl border-4 text-left transition-all flex items-center justify-between active:scale-95 ${
                irEnabled
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-extrabold shadow-md'
                  : 'border-slate-300 bg-slate-100 text-slate-700 font-extrabold'
              }`}
            >
              <div>
                <div class="text-sm font-extrabold">
                  {irEnabled ? '👁️ IR Night Vision ON' : '📷 Standard Non-IR Lens'}
                </div>
                <div class="text-[11px] font-medium text-slate-600 mt-0.5">
                  {irEnabled ? 'Infrared LEDs illuminate invisible thermal spectrum' : 'Standard optical lens (requires visible light)'}
                </div>
              </div>

              <div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                irEnabled ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-600'
              }`}>
                {irEnabled ? 'IR' : 'OFF'}
              </div>
            </button>
          </div>

        </div>

        {/* Visual CCTV Monitor View (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span class="text-xs font-bold text-slate-300 uppercase tracking-widest">CCTV MONITOR 01 • SERVER ROOM BACK DOOR</span>
            </div>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              canSeeIntruder ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
            }`}>
              {canSeeIntruder ? 'INTRUDER VISIBLE' : 'CAMERA BLIND (0 LUX)'}
            </span>
          </div>

          {/* Camera View Area */}
          <div class={`my-4 p-6 rounded-2xl border-4 transition-all min-h-[200px] flex flex-col items-center justify-center text-center relative overflow-hidden ${
            !isNight 
              ? 'bg-gradient-to-br from-amber-100 to-amber-200 border-amber-400 text-slate-900' 
              : irEnabled 
                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-950/50 font-mono'
                : 'bg-black border-slate-800 text-slate-600'
          }`}>
            
            {/* Timestamp Overlay */}
            <div class="absolute top-3 left-3 text-[10px] font-mono opacity-70">
              REC ● 2026-09-01 {isNight ? '02:14:09 AM' : '02:14:09 PM'}
            </div>

            {!canSeeIntruder ? (
              <div class="space-y-2">
                <EyeOff class="w-12 h-12 mx-auto text-slate-700 animate-pulse" />
                <div class="text-sm font-extrabold text-slate-500">PITCH BLACK NIGHT (0 LUX)</div>
                <div class="text-xs text-slate-600">Standard non-IR camera cannot see in darkness! Turn ON IR Night Vision!</div>
              </div>
            ) : (
              <div class="space-y-3">
                <div class={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-4xl shadow-lg ${
                  irEnabled && isNight ? 'bg-emerald-500/20 border-2 border-emerald-400 animate-bounce' : 'bg-amber-400 text-amber-950'
                }`}>
                  🥷
                </div>

                <div class="space-y-1">
                  <div class="text-base font-black">
                    {irEnabled && isNight ? '⚠️ IR INTRUDER DETECTED!' : '⚠️ INTRUDER DETECTED IN DAYLIGHT!'}
                  </div>
                  <div class="text-xs font-bold">
                    {irEnabled && isNight ? 'Infrared spectrum illuminated stealth intruder in 0 lux pitch blackness!' : 'Intruder spotted in clear daylight video!'}
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Explanation Banner */}
          <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            canSeeIntruder 
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
              : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
          }`}>
            {canSeeIntruder ? (
              isNight ? (
                <span>✅ <strong>IR (Infrared) Active:</strong> Night-vision camera floods the area with invisible IR light, rendering intruders crystal clear at night!</span>
              ) : (
                <span>☀️ <strong>Daylight View:</strong> CCTV feed captures high-definition color video.</span>
              )
            ) : (
              <span>🚫 <strong>Security Vulnerability:</strong> Non-IR camera is blind at night! Intruders can break in undetected in pitch black darkness.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">CCTV = Closed-Circuit Television</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IR = Infrared Spectrum Night Vision</span>
          </div>

        </div>

      </div>

    </div>
  );
}
