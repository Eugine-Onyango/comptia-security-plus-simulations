import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Building, Cloud, RefreshCw, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CoopDisasterSim() {
  const [disasterType, setDisasterType] = useState('flood'); // 'flood', 'ransomware', 'blackout'
  const [coopStatus, setCoopStatus] = useState('idle'); // 'idle', 'executing', 'restored'

  const handleExecuteCoop = () => {
    sounds.playBuzzer();
    setCoopStatus('executing');

    setTimeout(() => {
      sounds.playSuccess();
      setCoopStatus('restored');
    }, 1800);
  };

  const handleReset = () => {
    sounds.playPop();
    setCoopStatus('idle');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Disaster Preparedness • COOP, HA, OS, AWS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            COOP Continuity of Operations Planning Bunker! 🏛️🚨
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>COOP (Continuity of Operations Planning)</strong> is an enterprise disaster strategy ensuring mission-critical functions survive catastrophes by leveraging off-site cloud platforms (**AWS**), **HA** clusters, and backup **OS** images!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: President moving to an underground bunker to command the nation during an emergency.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Building class="w-5 h-5 text-indigo-600" />
            <span>Disaster Emergency Command</span>
          </h4>

          {/* Disaster Scenario Selection */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Select Catastrophic Event:</label>
            <div class="space-y-2">
              <button
                onClick={() => {
                  if (coopStatus === 'idle') {
                    sounds.playPop();
                    setDisasterType('flood');
                  }
                }}
                disabled={coopStatus !== 'idle'}
                class={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-xs transition-all ${
                  disasterType === 'flood'
                    ? 'border-blue-500 bg-blue-50 text-blue-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                🌊 Catastrophic Flood Destroys HQ Data Center
              </button>

              <button
                onClick={() => {
                  if (coopStatus === 'idle') {
                    sounds.playPop();
                    setDisasterType('ransomware');
                  }
                }}
                disabled={coopStatus !== 'idle'}
                class={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-xs transition-all ${
                  disasterType === 'ransomware'
                    ? 'border-rose-500 bg-rose-50 text-rose-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                ☣️ Massive Ransomware Locks On-Premises OS
              </button>

              <button
                onClick={() => {
                  if (coopStatus === 'idle') {
                    sounds.playPop();
                    setDisasterType('blackout');
                  }
                }}
                disabled={coopStatus !== 'idle'}
                class={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-xs transition-all ${
                  disasterType === 'blackout'
                    ? 'border-amber-500 bg-amber-50 text-amber-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                ⚡ Regional Electrical Power Grid Blackout
              </button>
            </div>
          </div>

          <button
            onClick={handleExecuteCoop}
            disabled={coopStatus !== 'idle'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              coopStatus === 'restored'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : coopStatus === 'executing'
                  ? 'bg-indigo-500 text-white animate-pulse cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {coopStatus === 'executing' ? (
              <span>🏛️ Activating COOP Emergency Protocol...</span>
            ) : coopStatus === 'restored' ? (
              <span>✅ Operations Restored via COOP!</span>
            ) : (
              <>
                <ShieldAlert class="w-5 h-5" />
                <span>Execute COOP Disaster Plan</span>
              </>
            )}
          </button>

          {coopStatus !== 'idle' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset COOP Command Center
            </button>
          )}
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Building class="w-4 h-4 text-indigo-400" /> COOP Emergency Response Monitor
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              coopStatus === 'restored' ? 'bg-emerald-500 text-slate-950' : coopStatus === 'executing' ? 'bg-indigo-500 text-white animate-pulse' : 'bg-slate-700 text-slate-300'
            }`}>
              {coopStatus === 'restored' ? 'COOP ACTIVE (AWS RECOVERY)' : coopStatus === 'executing' ? 'COOP EXECUTION IN PROGRESS' : 'COOP STANDBY'}
            </span>
          </div>

          {/* Step-by-Step Restoration */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              coopStatus === 'executing' || coopStatus === 'restored' ? 'bg-indigo-950 border-indigo-400 text-indigo-100 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>1. COOP Off-Site Activation (AWS Cloud)</span>
                {coopStatus !== 'idle' && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Redirects core operations from destroyed HQ to secondary **AWS** cloud environment.
              </p>
            </div>

            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              coopStatus === 'restored' ? 'bg-emerald-950 border-emerald-500 text-emerald-100 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>2. OS Image Restore & HA Redundancy</span>
                {coopStatus === 'restored' && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Boots mirrored **OS** backup images and connects **HA** cluster database.
              </p>
            </div>

          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            coopStatus === 'restored'
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {coopStatus === 'restored' ? (
              <span>🏛️ <strong>MISSION-CRITICAL OPERATIONS RESTORED!</strong> The **COOP** plan successfully transitioned essential services to **AWS** cloud, preserving business continuity despite catastrophic HQ disruption.</span>
            ) : (
              <span>🚨 <strong>COOP Standby:</strong> Select a disaster event and execute COOP to test emergency business continuity.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">COOP = Continuity of Operations Plan</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">HA = High Availability</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">AWS / OS</span>
          </div>

        </div>

      </div>

    </div>
  );
}
