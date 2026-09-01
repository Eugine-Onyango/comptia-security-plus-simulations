import React, { useState } from 'react';
import { Camera, Eye, Moon, Sun, ShieldCheck, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CctvCommandSim() {
  const [activeCam, setActiveCam] = useState(1);
  const [irGlobal, setIrGlobal] = useState(true);

  const cameras = [
    { id: 1, name: 'Cam 1: Front Gate', icon: '🚪', status: 'ALL CLEAR' },
    { id: 2, name: 'Cam 2: Server Room', icon: '💻', status: 'INTRUDER DETECTED' },
    { id: 3, name: 'Cam 3: Loading Dock', icon: '🚚', status: 'ALL CLEAR' },
    { id: 4, name: 'Cam 4: Rooftop Deck', icon: '🏢', status: 'ALL CLEAR' }
  ];

  const currentCam = cameras.find(c => c.id === activeCam);

  const handleSelectCam = (id) => {
    sounds.playPop();
    setActiveCam(id);
  };

  const handleToggleIrGlobal = () => {
    const next = !irGlobal;
    setIrGlobal(next);
    if (next) sounds.playSuccess();
    else sounds.playBuzzer();
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Perimeter Control • Multi-Channel CCTV</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            CCTV Security Command Center 🖥️
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            Monitor multiple <strong>CCTV</strong> camera channels across the building. Use <strong>IR (Infrared)</strong> night vision to keep every corner visible after hours!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A security guard station monitoring 4 split TV screens.
        </div>
      </div>

      {/* Grid Display */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Camera Selector (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Camera class="w-5 h-5 text-purple-600" />
            <span>Select CCTV Camera Channel</span>
          </h4>

          <div class="space-y-2">
            {cameras.map(cam => (
              <button
                key={cam.id}
                onClick={() => handleSelectCam(cam.id)}
                class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  activeCam === cam.id
                    ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div class="flex items-center gap-2">
                  <span class="text-lg">{cam.icon}</span>
                  <span>{cam.name}</span>
                </div>
                {cam.status === 'INTRUDER DETECTED' ? (
                  <span class="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-extrabold rounded-full animate-pulse">
                    ALERT!
                  </span>
                ) : (
                  <span class="text-[10px] text-slate-400 font-bold">Clear</span>
                )}
              </button>
            ))}
          </div>

          <div class="pt-2">
            <button
              onClick={handleToggleIrGlobal}
              class={`w-full py-3 rounded-xl border-2 font-extrabold text-xs flex items-center justify-center gap-2 transition-all ${
                irGlobal ? 'bg-emerald-500 text-white border-emerald-600 shadow-md' : 'bg-slate-200 text-slate-600 border-slate-300'
              }`}
            >
              <Eye class="w-4 h-4" />
              <span>{irGlobal ? 'Global IR Night Vision: ON' : 'Global IR Night Vision: OFF'}</span>
            </button>
          </div>
        </div>

        {/* Video Screen Feed (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">{currentCam.name}</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              currentCam.status === 'INTRUDER DETECTED' ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {currentCam.status}
            </span>
          </div>

          {/* Active Camera View */}
          <div class={`my-4 p-6 rounded-2xl border-4 transition-all min-h-[200px] flex flex-col items-center justify-center text-center relative overflow-hidden ${
            irGlobal 
              ? 'bg-emerald-950/90 border-emerald-500 text-emerald-300 font-mono'
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <div class="text-5xl mb-2">{currentCam.icon}</div>
            <div class="text-base font-extrabold text-white">{currentCam.name} Live Feed</div>
            <div class="text-xs font-bold mt-1">
              {currentCam.status === 'INTRUDER DETECTED' 
                ? '⚠️ Motion Sensor Alert! IR Camera capturing unauthorized activity.' 
                : '✅ Perimeter Secure. No movement detected.'}
            </div>
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">CCTV = Closed-Circuit Television</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IR = Infrared Night Vision</span>
          </div>

        </div>

      </div>

    </div>
  );
}
