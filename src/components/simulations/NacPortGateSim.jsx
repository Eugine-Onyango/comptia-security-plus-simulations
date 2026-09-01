import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Lock, Unlock, CheckCircle2, XCircle, Terminal, Laptop, Activity, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function NacPortGateSim() {
  const [deviceHealth, setDeviceHealth] = useState('healthy'); // 'healthy' or 'infected'
  const [gateStage, setGateStage] = useState('idle'); // 'idle', '8021x', 'nac', 'result'
  const [accessResult, setAccessResult] = useState(null); // 'granted' or 'quarantine'

  const handleConnectPort = () => {
    sounds.playPop();
    setGateStage('8021x');
    setAccessResult(null);

    setTimeout(() => {
      sounds.playPop();
      setGateStage('nac');
    }, 1000);

    setTimeout(() => {
      if (deviceHealth === 'healthy') {
        sounds.playSuccess();
        setAccessResult('granted');
      } else {
        sounds.playBuzzer();
        setAccessResult('quarantine');
      }
      setGateStage('result');
    }, 2200);
  };

  const handleReset = () => {
    sounds.playPop();
    setGateStage('idle');
    setAccessResult(null);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Port Security & Posture • 802.1X, NAC, EAP, IEEE, RFC</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            IEEE 802.1X & NAC Port Security Gatekeeper! 🚪🔌
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>IEEE 802.1X</strong> (defined by <strong>IEEE</strong> standards & <strong>RFC</strong> specifications) locks switch ports until <strong>EAP</strong> credentials pass. <strong>NAC (Network Access Control)</strong> performs a health check before allowing port access!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Airport security check checking your passport (802.1X) & luggage for weapons (NAC).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Laptop class="w-5 h-5 text-indigo-600" />
            <span>Select Connecting Laptop Posture</span>
          </h4>

          {/* Device State Selection */}
          <div class="space-y-2">
            <button
              onClick={() => {
                if (gateStage === 'idle') {
                  sounds.playPop();
                  setDeviceHealth('healthy');
                }
              }}
              disabled={gateStage !== 'idle'}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                deviceHealth === 'healthy'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-emerald-900">🟢 Fully Compliant Laptop</div>
                <div class="text-[11px] text-emerald-700 font-medium mt-0.5">AV Updated, OS Patched, Firewall ON</div>
              </div>
            </button>

            <button
              onClick={() => {
                if (gateStage === 'idle') {
                  sounds.playPop();
                  setDeviceHealth('infected');
                }
              }}
              disabled={gateStage !== 'idle'}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                deviceHealth === 'infected'
                  ? 'border-rose-500 bg-rose-50 text-rose-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-rose-900">🔴 Out-of-Date / Infected Laptop</div>
                <div class="text-[11px] text-rose-700 font-medium mt-0.5">Missing Security Patches, Disabled AV</div>
              </div>
            </button>
          </div>

          <button
            onClick={handleConnectPort}
            disabled={gateStage !== 'idle'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              gateStage === 'result'
                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                : gateStage !== 'idle'
                  ? 'bg-indigo-400 text-white animate-pulse cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {gateStage === 'idle' && <span>Plug Ethernet Cable into 802.1X Port</span>}
            {gateStage === '8021x' && <span>Stage 1: 802.1X EAP Authentication...</span>}
            {gateStage === 'nac' && <span>Stage 2: NAC Device Posture Health Check...</span>}
            {gateStage === 'result' && <span>Check Completed!</span>}
          </button>

          {gateStage !== 'idle' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Unplug & Reset Port
            </button>
          )}
        </div>

        {/* Visual Gate Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Switch Port Security Gate</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              accessResult === 'granted' ? 'bg-emerald-500 text-slate-950' : accessResult === 'quarantine' ? 'bg-rose-500 text-white' : 'bg-indigo-500 text-white'
            }`}>
              {accessResult === 'granted' ? 'PORT UNLOCKED (VLAN 10)' : accessResult === 'quarantine' ? 'PORT QUARANTINED (GUEST VLAN)' : 'PORT LOCKED (802.1X)'}
            </span>
          </div>

          {/* Interactive Inspection Pipeline */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            {/* Step 1: 802.1X EAP */}
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              gateStage === '8021x' || gateStage === 'nac' || gateStage === 'result'
                ? 'bg-indigo-950 border-indigo-400 text-indigo-100 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>1. IEEE 802.1X EAP Authentication (RFC Spec)</span>
                {gateStage !== 'idle' && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Supplicant EAP identity validated by authentication server.
              </p>
            </div>

            {/* Step 2: NAC Posture Check */}
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              gateStage === 'nac' || gateStage === 'result'
                ? 'bg-purple-950 border-purple-400 text-purple-100 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>2. NAC Network Access Control Posture Assessment</span>
                {gateStage === 'result' && (
                  deviceHealth === 'healthy' 
                    ? <CheckCircle2 class="w-4 h-4 text-emerald-400" />
                    : <XCircle class="w-4 h-4 text-rose-400" />
                )}
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Checking antivirus signatures, OS patch level, and firewall status.
              </p>
            </div>

          </div>

          {/* Result Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            accessResult === 'granted'
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : accessResult === 'quarantine'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
                : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {accessResult === 'granted' ? (
              <span>✅ <strong>POSTURE PASSED!</strong> Device is healthy and compliant. <strong>802.1X / NAC</strong> unlocked full corporate network access.</span>
            ) : accessResult === 'quarantine' ? (
              <span>🛑 <strong>POSTURE FAILED!</strong> Outdated antivirus detected. <strong>NAC</strong> automatically moved the device to a Quarantine VLAN for remediation!</span>
            ) : (
              <span>🔑 <strong>Port Locked:</strong> Connect a laptop to run 802.1X EAP & NAC posture assessment.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">802.1X = Port Access Control</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">NAC = Posture Check</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">EAP = Authentication Framework</span>
          </div>

        </div>

      </div>

    </div>
  );
}
