import React, { useState } from 'react';
import { Wrench, ShieldCheck, RefreshCw, Cpu, Activity } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function MtbfMttrGaugeSim() {
  const [mtbfHours, setMtbfHours] = useState(50000); // 5,000 - 100,000 hrs
  const [mttrHours, setMttrHours] = useState(2); // 1 - 24 hrs

  // 1 Year = 8,760 hours
  const yearHours = 8760 * 5; // 5 year calculation window
  const totalFailures = (yearHours / mtbfHours).toFixed(1);
  const totalDowntime = (totalFailures * mttrHours).toFixed(1);
  const availability = (((yearHours - totalDowntime) / yearHours) * 100).toFixed(3);

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Hardware Metrics • MTBF, MTTR</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            MTBF vs MTTR Hardware Reliability Gauge! ⚙️🔧
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            <strong>MTBF (Mean Time Between Failures)</strong> measures hardware lifespan & reliability, while <strong>MTTR (Mean Time to Repair)</strong> measures how quickly IT technicians can repair a failed component!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Car engine breakdown frequency (MTBF) vs mechanic repair time (MTTR).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Sliders Control Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Wrench class="w-5 h-5 text-purple-600" />
            <span>Hardware Reliability Metrics</span>
          </h4>

          {/* MTBF Slider */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>MTBF (Mean Time Between Failures):</span>
              <span class="text-purple-600 font-black">{mtbfHours.toLocaleString()} Hours</span>
            </div>
            <input
              type="range"
              min="5000"
              max="100000"
              step="5000"
              value={mtbfHours}
              onChange={(e) => {
                sounds.playPop();
                setMtbfHours(Number(e.target.value));
              }}
              class="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* MTTR Slider */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>MTTR (Mean Time to Repair):</span>
              <span class="text-indigo-600 font-black">{mttrHours} Hours Repair Time</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              step="1"
              value={mttrHours}
              onChange={(e) => {
                sounds.playPop();
                setMttrHours(Number(e.target.value));
              }}
              class="w-full accent-indigo-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-6 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">5-Year Reliability Forecast</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500 text-white">
              AVAILABILITY: {availability}%
            </span>
          </div>

          {/* Calculated Metrics */}
          <div class="my-4 space-y-3 font-mono text-xs">
            <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>Expected Server Crashes (5 Yrs):</span>
              <span class="text-amber-400 font-extrabold text-sm">{totalFailures} Failures</span>
            </div>

            <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>Total Repair Downtime:</span>
              <span class="text-rose-400 font-extrabold text-sm">{totalDowntime} Hours</span>
            </div>

            <div class="p-3.5 bg-purple-950 border border-purple-500 rounded-xl flex justify-between items-center">
              <span>System Uptime Percentage:</span>
              <span class="text-emerald-400 font-black text-base">{availability}%</span>
            </div>
          </div>

          {/* Status Banner */}
          <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-center text-purple-200">
            <span>⚙️ <strong>HIGH MTBF + LOW MTTR:</strong> Enterprise hardware with high MTBF and fast MTTR delivers 99.9%+ high availability!</span>
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">MTBF = Lifespan / Reliability</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">MTTR = Repair Speed</span>
          </div>

        </div>

      </div>

    </div>
  );
}
