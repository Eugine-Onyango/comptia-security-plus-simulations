import React, { useState } from 'react';
import { Clock, ShieldAlert, CheckCircle2, RotateCcw, AlertTriangle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RtoRpoTimelineSim() {
  const [rpoHours, setRpoHours] = useState(2); // 1 to 24 hrs
  const [rtoHours, setRtoHours] = useState(4); // 1 to 48 hrs
  const [disasterTriggered, setDisasterTriggered] = useState(false);

  const handleTriggerDisaster = () => {
    sounds.playBuzzer();
    setDisasterTriggered(true);
  };

  const handleReset = () => {
    sounds.playSuccess();
    setDisasterTriggered(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Disaster Metrics • RTO, RPO, BIA</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            RTO & RPO Disaster Time Machine! ⏱️💾
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>RPO (Recovery Point Objective)</strong> defines maximum acceptable data loss measured in time, while <strong>RTO (Recovery Time Objective)</strong> defines maximum acceptable service downtime!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Saving a game document every 2 hrs (RPO) vs time needed to fix a broken laptop screen (RTO).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Slider Controls Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Clock class="w-5 h-5 text-indigo-600" />
            <span>Target BIA Objectives</span>
          </h4>

          {/* RPO Slider */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>RPO (Max Data Loss Limit):</span>
              <span class="text-indigo-600 font-black">{rpoHours} Hours Data Loss</span>
            </div>
            <input
              type="range"
              min="1"
              max="24"
              value={rpoHours}
              onChange={(e) => {
                sounds.playPop();
                setRpoHours(Number(e.target.value));
              }}
              class="w-full accent-indigo-600 cursor-pointer"
            />
          </div>

          {/* RTO Slider */}
          <div class="space-y-1.5">
            <div class="flex justify-between text-xs font-bold text-slate-700">
              <span>RTO (Max Service Downtime Limit):</span>
              <span class="text-purple-600 font-black">{rtoHours} Hours Downtime</span>
            </div>
            <input
              type="range"
              min="1"
              max="48"
              value={rtoHours}
              onChange={(e) => {
                sounds.playPop();
                setRtoHours(Number(e.target.value));
              }}
              class="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          {!disasterTriggered ? (
            <button
              onClick={handleTriggerDisaster}
              class="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <ShieldAlert class="w-4 h-4" />
              <span>Trigger Server Disaster Outage</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw class="w-4 h-4" />
              <span>Restore Backup & Reset Timeline</span>
            </button>
          )}
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Disaster Recovery Timeline</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              disasterTriggered ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {disasterTriggered ? 'DISASTER RECOVERY IN PROGRESS 🚨' : 'NORMAL OPERATIONS 🟢'}
            </span>
          </div>

          {/* Dynamic Content Display */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
              <div class="text-indigo-300 font-bold text-xs flex justify-between">
                <span>RPO (Recovery Point Objective):</span>
                <span>{rpoHours} Hours</span>
              </div>
              <p class="text-[11px] text-slate-300 font-sans">
                {disasterTriggered
                  ? `Rewinding database state back to last backup taken ${rpoHours} hours ago. Lost ${rpoHours} hours of transactions.`
                  : `Configured to lose at most ${rpoHours} hours of data if a disaster strikes.`}
              </p>
            </div>

            <div class="p-4 bg-purple-950/80 border border-purple-500 rounded-2xl space-y-1">
              <div class="text-purple-300 font-bold text-xs flex justify-between">
                <span>RTO (Recovery Time Objective):</span>
                <span>{rtoHours} Hours</span>
              </div>
              <p class="text-[11px] text-slate-300 font-sans">
                {disasterTriggered
                  ? `IT engineering team has ${rtoHours} hours to repair hardware and bring servers online before BIA outage costs escalate.`
                  : `Business Impact Analysis requires services restored within ${rtoHours} hours.`}
              </p>
            </div>

          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            disasterTriggered
              ? 'bg-rose-950 border-rose-500 text-rose-200'
              : 'bg-emerald-950 border-emerald-500 text-emerald-200'
          }`}>
            {disasterTriggered ? (
              <span>🚨 <strong>DISASTER RECOVERY TRIGGERED:</strong> Data loss capped at {rpoHours} hours (RPO). System recovery deadline set to {rtoHours} hours (RTO)!</span>
            ) : (
              <span>🟢 <strong>BIA READY:</strong> Systems configured to meet RPO ({rpoHours}h) and RTO ({rtoHours}h) disaster recovery thresholds.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">RPO = Data Loss (Time)</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">RTO = Downtime (Time)</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">BIA = Impact Analysis</span>
          </div>

        </div>

      </div>

    </div>
  );
}
