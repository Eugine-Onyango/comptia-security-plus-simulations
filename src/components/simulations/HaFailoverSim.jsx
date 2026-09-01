import React, { useState } from 'react';
import { Zap, ShieldCheck, AlertTriangle, Activity, CheckCircle2, RefreshCw, Server } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function HaFailoverSim() {
  const [nodeAState, setNodeAState] = useState('active'); // 'active', 'failed'
  const [nodeBState, setNodeBState] = useState('standby'); // 'standby', 'active'
  const [failoverTriggered, setFailoverTriggered] = useState(false);

  const handleCrashNodeA = () => {
    sounds.playBuzzer();
    setNodeAState('failed');
    
    setTimeout(() => {
      sounds.playSuccess();
      setNodeBState('active');
      setFailoverTriggered(true);
    }, 400);
  };

  const handleReset = () => {
    sounds.playPop();
    setNodeAState('active');
    setNodeBState('standby');
    setFailoverTriggered(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-200/80 text-emerald-900 font-extrabold text-xs rounded-full">
            <span>High Availability • HA Cluster</span>
          </div>
          <h3 class="text-2xl font-extrabold text-emerald-950">
            High Availability (HA) Failover Simulator! ⚡⚡
          </h3>
          <p class="text-emerald-900/80 font-medium text-sm">
            <strong>HA (High Availability)</strong> uses redundant clustered servers and power sources so if one node crashes, the secondary node takes over in 0ms with zero downtime!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-emerald-200 text-emerald-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A airplane with two jet engines. If one fails, the airplane keeps flying safely.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Zap class="w-5 h-5 text-emerald-600" />
            <span>Simulate Hardware Node Failure</span>
          </h4>

          <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium space-y-1">
            <div class="font-extrabold">HA Redundancy Status:</div>
            <div>Cluster Mode: Active / Standby Failover Pair (Target: 99.999% Uptime)</div>
          </div>

          <button
            onClick={handleCrashNodeA}
            disabled={nodeAState === 'failed'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              nodeAState === 'failed'
                ? 'bg-rose-500 text-white shadow-rose-200 cursor-not-allowed'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
            }`}
          >
            {nodeAState === 'failed' ? (
              <span>💥 Node A Crashed (HA Failover Active)</span>
            ) : (
              <>
                <AlertTriangle class="w-5 h-5" />
                <span>Trigger Severe Hardware Fault on Node A</span>
              </>
            )}
          </button>

          {failoverTriggered && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Repair & Reset HA Cluster
            </button>
          )}
        </div>

        {/* Visual HA Cluster Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">HA Cluster Live Monitor</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              failoverTriggered ? 'bg-amber-400 text-slate-950 animate-pulse' : 'bg-emerald-500 text-slate-950'
            }`}>
              {failoverTriggered ? 'HA FAILOVER COMPLETED (0ms DOWNTIME)' : 'PRIMARY NODE A ACTIVE'}
            </span>
          </div>

          {/* Nodes Display */}
          <div class="my-4 grid grid-cols-2 gap-4">
            
            {/* Node A */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              nodeAState === 'failed'
                ? 'bg-rose-950/90 border-rose-500 text-rose-200 animate-headshake'
                : 'bg-slate-950 border-emerald-500/80 text-emerald-200'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase mb-1">
                <span>NODE A (PRIMARY)</span>
                {nodeAState === 'active' ? (
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                ) : (
                  <span class="text-rose-400 font-black text-sm">💥 FAULT</span>
                )}
              </div>
              <div class="text-xs font-mono mt-2">
                {nodeAState === 'active' ? '🟢 STATUS: ACTIVE (100% LOAD)' : '🔴 STATUS: CRASHED & ISOLATED'}
              </div>
            </div>

            {/* Node B */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              nodeBState === 'active'
                ? 'bg-emerald-950 border-emerald-400 text-emerald-100 shadow-md shadow-emerald-950'
                : 'bg-slate-950 border-amber-500/50 text-amber-200'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase mb-1">
                <span>NODE B (SECONDARY)</span>
                {nodeBState === 'active' ? (
                  <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                ) : (
                  <span class="text-amber-400 font-bold text-xs">STANDBY</span>
                )}
              </div>
              <div class="text-xs font-mono mt-2">
                {nodeBState === 'active' ? '🟢 STATUS: ACTIVE (TAKEN 100% LOAD)' : '🟡 STATUS: STANDBY READY'}
              </div>
            </div>

          </div>

          {/* Status Explanation Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            failoverTriggered 
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200' 
              : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}>
            {failoverTriggered ? (
              <span>🎉 <strong>HA Failover Successful!</strong> When Node A crashed, the <strong>HA (High Availability)</strong> cluster manager automatically shifted 100% power to Node B in 0ms! Factory lights & systems never flickered!</span>
            ) : (
              <span>⚡ <strong>HA Active:</strong> Node B is constantly heartbeat-synced to Node A, ready to takeover instantly during any hardware failure.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">HA = High Availability</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Zero Downtime</span>
          </div>

        </div>

      </div>

    </div>
  );
}
