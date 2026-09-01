import React, { useState } from 'react';
import { Cloud, Server, Zap, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function AwsHaFailoverSim() {
  const [primaryStatus, setPrimaryStatus] = useState('healthy'); // 'healthy' or 'failed'
  const [secondaryStatus, setSecondaryStatus] = useState('standby'); // 'standby' or 'active'
  const [isFailingOver, setIsFailingOver] = useState(false);

  const handleSimulateDisaster = () => {
    sounds.playBuzzer();
    setIsFailingOver(true);
    setPrimaryStatus('failed');

    setTimeout(() => {
      sounds.playSuccess();
      setSecondaryStatus('active');
      setIsFailingOver(false);
    }, 1200);
  };

  const handleRestorePrimary = () => {
    sounds.playPop();
    setPrimaryStatus('healthy');
    setSecondaryStatus('standby');
    setIsFailingOver(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>High Availability Cloud • HA, OS, AWS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            AWS Cloud Multi-AZ High Availability (HA) Failover! ☁️⚡
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            <strong>HA (High Availability)</strong> in <strong>AWS (Amazon Web Services)</strong> replicates operating system (<strong>OS</strong>) workloads across separate Availability Zones so if Data Center A fails, Data Center B takes over instantly!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Dual jet engine airplane—if Engine 1 cuts out, Engine 2 maintains flight speed seamlessly.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Cloud class="w-5 h-5 text-amber-600" />
            <span>AWS Infrastructure Controls</span>
          </h4>

          {/* Trigger Failover */}
          <button
            onClick={handleSimulateDisaster}
            disabled={primaryStatus === 'failed' || isFailingOver}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              primaryStatus === 'failed'
                ? 'bg-slate-100 text-slate-400 border border-slate-300 cursor-not-allowed'
                : isFailingOver
                  ? 'bg-amber-400 text-amber-950 animate-pulse cursor-wait'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
            }`}
          >
            {isFailingOver ? (
              <span>⚡ AWS HA Auto-Failover in Progress...</span>
            ) : primaryStatus === 'failed' ? (
              <span>Primary AZ-a Disabled</span>
            ) : (
              <>
                <Zap class="w-5 h-5" />
                <span>Simulate Lightning Strike on AWS AZ-a</span>
              </>
            )}
          </button>

          {primaryStatus === 'failed' && (
            <button
              onClick={handleRestorePrimary}
              class="w-full py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold rounded-2xl text-xs transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <RefreshCw class="w-4 h-4" /> Restore AWS AZ-a Data Center
            </button>
          )}
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Cloud class="w-4 h-4 text-amber-400" /> AWS US-East-1 Multi-AZ Cluster
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              secondaryStatus === 'active' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-500 text-slate-950'
            }`}>
              {secondaryStatus === 'active' ? 'HA FAILOVER ACTIVE (AZ-B)' : 'HA CLUSTER HEALTHY (AZ-A)'}
            </span>
          </div>

          {/* Dual AZ Cluster Display */}
          <div class="my-4 grid grid-cols-2 gap-4 font-mono text-xs">
            
            {/* Primary AZ-a */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              primaryStatus === 'healthy' 
                ? 'bg-emerald-950 border-emerald-500 text-emerald-100 shadow-md' 
                : 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs mb-1">
                <span>AWS AZ-1a (Primary)</span>
                {primaryStatus === 'healthy' ? <CheckCircle2 class="w-4 h-4 text-emerald-400" /> : <AlertTriangle class="w-4 h-4 text-rose-400" />}
              </div>
              <div class="text-[10px] text-slate-300">OS: Linux Enterprise</div>
              <div class="text-[10px] mt-2 font-bold uppercase">
                Status: {primaryStatus === 'healthy' ? '🟢 ONLINE (100% TRAFFIC)' : '🔴 OFFLINE (POWER FAIL)'}
              </div>
            </div>

            {/* Standby AZ-b */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              secondaryStatus === 'active' 
                ? 'bg-amber-950 border-amber-500 text-amber-100 shadow-md scale-105' 
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs mb-1">
                <span>AWS AZ-1b (Standby)</span>
                {secondaryStatus === 'active' && <CheckCircle2 class="w-4 h-4 text-amber-400" />}
              </div>
              <div class="text-[10px] text-slate-300">OS: Linux Enterprise Mirror</div>
              <div class="text-[10px] mt-2 font-bold uppercase">
                Status: {secondaryStatus === 'active' ? '⚡ ACTIVE (FAILOVER SUCCESS)' : '🟡 STANDBY REPLICA'}
              </div>
            </div>

          </div>

          {/* Result Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            secondaryStatus === 'active'
              ? 'bg-amber-950 border-amber-500 text-amber-200'
              : 'bg-emerald-950 border-emerald-500 text-emerald-200'
          }`}>
            {secondaryStatus === 'active' ? (
              <span>⚡ <strong>HA FAILOVER COMPLETE!</strong> When AZ-a suffered a power outage, **AWS HA** load balancer automatically diverted traffic to AZ-b. Zero user downtime!</span>
            ) : (
              <span>🟢 <strong>HA Active:</strong> Primary AWS Availability Zone serving web traffic while Secondary AZ stands ready.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">HA = High Availability</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">OS = Operating System</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">AWS = Amazon Web Services</span>
          </div>

        </div>

      </div>

    </div>
  );
}
