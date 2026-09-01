import React, { useState } from 'react';
import { Power, Zap, AlertTriangle, CheckCircle2, RefreshCw, Server, WifiOff, Activity } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function AvailabilitySim() {
  const [isOnline, setIsOnline] = useState(true);
  const [hasBackup, setHasBackup] = useState(false);

  const handleTriggerAttack = () => {
    sounds.playBuzzer();
    setIsOnline(false);
  };

  const handleRestoreBackup = () => {
    sounds.playSuccess();
    setHasBackup(true);
    setIsOnline(true);
  };

  const handleReset = () => {
    sounds.playPop();
    setIsOnline(true);
    setHasBackup(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>The "A" in CIA</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            Availability = Always Ready When Needed! ⚡
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            Availability means your website, app, 911 dispatch, or power grid is up, running, and accessible whenever users need it.
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Electricity in a hospital or an ice cream shop on a hot day.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-6">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Activity class="w-5 h-5 text-amber-600" />
            <span>Server Power & Load Controls</span>
          </h4>

          <div class="space-y-3">
            <button
              onClick={handleTriggerAttack}
              disabled={!isOnline}
              class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                !isOnline
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200'
              }`}
            >
              <Zap class="w-5 h-5" />
              <span>Simulate Overload Attack (DDoS / Power Outage)</span>
            </button>

            <button
              onClick={handleRestoreBackup}
              disabled={isOnline}
              class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md ${
                isOnline
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200 animate-pulse'
              }`}
            >
              <Power class="w-5 h-5" />
              <span>Switch On Backup Generators & Servers!</span>
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div class="flex items-center justify-between text-xs font-bold text-slate-600">
              <span>System Status:</span>
              <span class={isOnline ? "text-emerald-600" : "text-rose-600"}>
                {isOnline ? "OPERATIONAL (100%)" : "OFFLINE / DOWN (0%)"}
              </span>
            </div>
            <div class="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div 
                class={`h-full transition-all duration-500 ${isOnline ? 'w-full bg-emerald-500' : 'w-0 bg-rose-500'}`}
              ></div>
            </div>
          </div>

          <button
            onClick={handleReset}
            class="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-2xl text-xs flex items-center justify-center gap-2 transition-all"
          >
            <RefreshCw class="w-3.5 h-3.5" /> Reset System
          </button>
        </div>

        {/* Visual Server Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[320px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Ice Cream Website Server Room</span>
            {isOnline ? (
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 rounded-full font-extrabold text-xs">
                <CheckCircle2 class="w-4 h-4 text-emerald-400" /> ONLINE & READY
              </span>
            ) : (
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/50 rounded-full font-extrabold text-xs animate-bounce">
                <WifiOff class="w-4 h-4 text-rose-400" /> SERVER DOWN!
              </span>
            )}
          </div>

          {/* Server Graphic */}
          <div class="my-6 text-center space-y-4">
            <div class="flex items-center justify-center gap-4">
              <div class={`p-5 rounded-2xl border-4 transition-all ${
                isOnline ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-900/40' : 'bg-rose-950/80 border-rose-500 text-rose-400 opacity-60'
              }`}>
                <Server class="w-12 h-12 mx-auto" />
                <span class="text-xs font-bold mt-1 block">Main Server</span>
              </div>

              {hasBackup && (
                <div class="p-5 rounded-2xl border-4 bg-amber-950/80 border-amber-400 text-amber-300 shadow-lg shadow-amber-900/40 animate-fadeIn">
                  <Zap class="w-12 h-12 mx-auto text-yellow-300" />
                  <span class="text-xs font-bold mt-1 block">Backup Generator</span>
                </div>
              )}
            </div>

            {isOnline ? (
              <div class="p-4 bg-emerald-950/60 border border-emerald-500/30 rounded-2xl text-emerald-200 text-sm font-semibold">
                🍦 Website is open! Customers can order ice cream instantly without waiting.
              </div>
            ) : (
              <div class="p-4 bg-rose-950/80 border border-rose-500/50 rounded-2xl text-rose-200 text-sm font-semibold">
                ⚠️ 503 ERROR: SERVER UNAVAILABLE! The website crashed. Availability is broken!
              </div>
            )}
          </div>

          <p class="text-xs text-slate-300 font-medium text-center">
            {isOnline ? '✅ High availability keeps systems ready 24/7!' : '❌ Click "Switch On Backup Generators" to restore Availability!'}
          </p>

        </div>

      </div>

      {/* Plain English Takeaway */}
      <div class="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <div class="text-2xl">💡</div>
        <div class="space-y-1">
          <h5 class="font-extrabold text-amber-950 text-sm sm:text-base">Remember it in 1 sentence:</h5>
          <p class="text-amber-900 text-sm font-medium">
            <strong>Availability = Always Ready!</strong> It makes sure services (like 911 lines, banking apps, or power grids) don't crash when people need them most.
          </p>
        </div>
      </div>

    </div>
  );
}
