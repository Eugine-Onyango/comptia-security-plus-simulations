import React, { useState } from 'react';
import { Activity, ShieldAlert, CheckCircle2, RefreshCw, Sliders } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function KriRadarSim() {
  const [unpatchedCves, setUnpatchedCves] = useState(3); // 0 - 30
  const [phishingRate, setPhishingRate] = useState(4); // 0 - 25%
  const [downtimeMins, setDowntimeMins] = useState(5); // 0 - 90 mins

  const isCritical = unpatchedCves > 15 || phishingRate > 15 || downtimeMins > 60;
  const isWarning = !isCritical && (unpatchedCves > 5 || phishingRate > 5 || downtimeMins > 10);

  const handleSimulateSpike = () => {
    sounds.playBuzzer();
    setUnpatchedCves(24);
    setPhishingRate(19);
    setDowntimeMins(75);
  };

  const handleMitigate = () => {
    sounds.playSuccess();
    setUnpatchedCves(2);
    setPhishingRate(3);
    setDowntimeMins(4);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Risk Indicators • KRI</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            KRI Early Warning Radar & Risk Gauge! 📊🚨
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            <strong>KRI (Key Risk Indicators)</strong> are quantitative metrics that provide early warning signals before a cyber incident or breach occurs!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Low tire pressure & engine temperature warning lights on a car dashboard.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* KRI Sliders Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Sliders class="w-5 h-5 text-purple-600" />
            <span>KRI Enterprise Metric Controls</span>
          </h4>

          {/* Metric 1: Unpatched CVEs */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>Unpatched Critical CVEs:</span>
              <span className={unpatchedCves > 15 ? 'text-rose-600 font-black' : unpatchedCves > 5 ? 'text-amber-600 font-black' : 'text-emerald-600 font-black'}>
                {unpatchedCves} Vulnerabilities
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="30"
              value={unpatchedCves}
              onChange={(e) => {
                sounds.playPop();
                setUnpatchedCves(Number(e.target.value));
              }}
              class="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Metric 2: Phishing Rate */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>Phishing Test Failure Rate:</span>
              <span className={phishingRate > 15 ? 'text-rose-600 font-black' : phishingRate > 5 ? 'text-amber-600 font-black' : 'text-emerald-600 font-black'}>
                {phishingRate}% Employees
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={phishingRate}
              onChange={(e) => {
                sounds.playPop();
                setPhishingRate(Number(e.target.value));
              }}
              class="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {/* Metric 3: Downtime Mins */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>SLA Downtime Minutes (Month):</span>
              <span className={downtimeMins > 60 ? 'text-rose-600 font-black' : downtimeMins > 10 ? 'text-amber-600 font-black' : 'text-emerald-600 font-black'}>
                {downtimeMins} Minutes
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="90"
              value={downtimeMins}
              onChange={(e) => {
                sounds.playPop();
                setDowntimeMins(Number(e.target.value));
              }}
              class="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div class="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleSimulateSpike}
              class="py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <ShieldAlert class="w-4 h-4" /> Simulate Risk Spike
            </button>

            <button
              onClick={handleMitigate}
              class="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 class="w-4 h-4" /> Mitigate KRIs
            </button>
          </div>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-6 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">KRI Executive Radar</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              isCritical ? 'bg-rose-500 text-white animate-bounce' : isWarning ? 'bg-amber-400 text-slate-950' : 'bg-emerald-500 text-slate-950'
            }`}>
              {isCritical ? 'CRITICAL RISK EXPOSURE 🚨' : isWarning ? 'WARNING THRESHOLD ⚠️' : 'SAFE EXPOSURE 🟢'}
            </span>
          </div>

          {/* KRI Gauge Display */}
          <div class="my-4 space-y-3 font-mono text-xs">
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>1. Unpatched CVE Risk:</span>
              <span className={unpatchedCves > 15 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                {unpatchedCves > 15 ? 'CRITICAL (HIGH BREACH RISK)' : 'NORMAL'}
              </span>
            </div>

            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>2. Human Phishing Risk:</span>
              <span className={phishingRate > 15 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                {phishingRate > 15 ? 'HIGH (NEED RETRAINING)' : 'NORMAL'}
              </span>
            </div>

            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>3. Availability Risk:</span>
              <span className={downtimeMins > 60 ? 'text-rose-400 font-bold' : 'text-slate-300'}>
                {downtimeMins > 60 ? 'SLA PENALTY TRIGGERED' : 'NORMAL'}
              </span>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            isCritical
              ? 'bg-rose-950 border-rose-500 text-rose-200'
              : isWarning
                ? 'bg-amber-950 border-amber-500 text-amber-200'
                : 'bg-emerald-950 border-emerald-500 text-emerald-200'
          }`}>
            {isCritical ? (
              <span>🚨 <strong>CRITICAL KRI ALERT:</strong> Early warning indicators show severe risk exposure! Immediate CISO intervention required.</span>
            ) : isWarning ? (
              <span>⚠️ <strong>KRI WARNING:</strong> Risk indicators are trending upwards. Schedule remediation patching.</span>
            ) : (
              <span>🟢 <strong>KRI SAFE:</strong> Key Risk Indicators are within healthy operational thresholds.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">KRI = Key Risk Indicator</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Early Warning Metric</span>
          </div>

        </div>

      </div>

    </div>
  );
}
