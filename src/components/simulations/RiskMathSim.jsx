import React, { useState } from 'react';
import { Calculator, DollarSign, Percent, TrendingDown, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RiskMathSim() {
  const [assetValue, setAssetValue] = useState(100000); // $10,000 - $1,000,000
  const [exposureFactor, setExposureFactor] = useState(0.4); // 0.1 - 1.0 (10% - 100%)
  const [aro, setAro] = useState(0.5); // 0.1 - 5.0

  // Calculations
  const sle = assetValue * exposureFactor;
  const ale = sle * aro;

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Quantitative Risk Math • SLE, ARO, ALE, AV, EF</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Quantitative Risk Formula Calculator! 🧮💰
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Quantitative risk analysis assigns dollar values to risk: <strong>Single Loss Expectancy (SLE = AV × EF)</strong> calculates loss per incident, and <strong>Annualized Loss Expectancy (ALE = SLE × ARO)</strong> calculates annual expected financial loss!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Car insurance math: Car value (AV) × Crash damage (EF) × Accident rate (ARO).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Math Controls Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Calculator class="w-5 h-5 text-indigo-600" />
            <span>Risk Variables Controls</span>
          </h4>

          {/* Variable 1: Asset Value (AV) */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>Asset Value (AV):</span>
              <span class="text-indigo-600 font-black">${assetValue.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="1000000"
              step="10000"
              value={assetValue}
              onChange={(e) => {
                sounds.playPop();
                setAssetValue(Number(e.target.value));
              }}
              class="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* Variable 2: Exposure Factor (EF) */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>Exposure Factor (EF):</span>
              <span class="text-amber-600 font-black">{(exposureFactor * 100).toFixed(0)}% Damage</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.05"
              value={exposureFactor}
              onChange={(e) => {
                sounds.playPop();
                setExposureFactor(Number(e.target.value));
              }}
              class="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Variable 3: Annualized Rate of Occurrence (ARO) */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>Annualized Rate of Occurrence (ARO):</span>
              <span class="text-purple-600 font-black">{aro} Times / Year</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="5.0"
              step="0.1"
              value={aro}
              onChange={(e) => {
                sounds.playPop();
                setAro(Number(e.target.value));
              }}
              class="w-full accent-purple-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Live Calculation Display (Right) */}
        <div class="md:col-span-6 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Calculated Risk Loss Exposure</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500 text-white">
              REAL-TIME FORMULA ENGINE
            </span>
          </div>

          {/* Formula Cards */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
              <div class="text-slate-400 text-[11px] font-bold">1. Single Loss Expectancy (SLE = AV × EF)</div>
              <div class="text-xl font-extrabold text-amber-400">
                ${assetValue.toLocaleString()} × {exposureFactor} = <span class="text-white">${sle.toLocaleString()}</span>
              </div>
              <div class="text-[10px] text-slate-400 font-sans">Loss incurred during a single incident.</div>
            </div>

            <div class="p-4 bg-indigo-950/80 border border-indigo-500 rounded-2xl space-y-1">
              <div class="text-indigo-300 text-[11px] font-bold">2. Annualized Loss Expectancy (ALE = SLE × ARO)</div>
              <div class="text-2xl font-black text-emerald-400">
                ${sle.toLocaleString()} × {aro} = <span class="text-emerald-300">${ale.toLocaleString()} / Year</span>
              </div>
              <div class="text-[10px] text-slate-300 font-sans">Expected annual financial loss exposure.</div>
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">AV = Asset Value</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">EF = Exposure Factor %</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SLE = Single Loss</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">ARO = Occurrences / Yr</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">ALE = Annual Loss</span>
          </div>

        </div>

      </div>

    </div>
  );
}
