import React, { useState } from 'react';
import { Sliders, ShieldCheck, ShieldAlert, Globe, Server, Laptop, Activity, CheckCircle2, XCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ZeroTrustAttributesSim() {
  const [ipState, setIpState] = useState('valid'); // 'valid' or 'untrusted'
  const [natState, setNatState] = useState('valid'); // 'valid' or 'mismatched'
  const [vpnState, setVpnState] = useState('active'); // 'active' or 'none'
  const [itHealth, setItHealth] = useState('compliant'); // 'compliant' or 'unhealthy'

  const isIpOk = ipState === 'valid';
  const isNatOk = natState === 'valid';
  const isVpnOk = vpnState === 'active';
  const isItOk = itHealth === 'compliant';

  const overallAllowed = isIpOk && isNatOk && isVpnOk && isItOk;

  const handleToggle = (setter, currVal, newVal) => {
    sounds.playPop();
    setter(newVal);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Context Attributes • IP, NAT, VPN, IT</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Attribute-Based Access Control (ABAC) 📊
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Zero Trust checks context attributes: <strong>IP Address</strong>, <strong>NAT Tables</strong>, <strong>VPN Tunnel</strong>, and <strong>IT Device Health</strong> before letting anyone through!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: An airport gate agent checking your passport, boarding pass, and baggage weight.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Sliders class="w-5 h-5 text-indigo-600" />
            <span>Configure Context Attributes</span>
          </h4>

          {/* 1. IP Attribute */}
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">1. IP Address:</span>
            <div class="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => handleToggle(setIpState, ipState, 'valid')}
                class={`p-2 rounded-xl border text-center transition-all ${
                  ipState === 'valid' ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                Known Corporate IP
              </button>
              <button
                onClick={() => handleToggle(setIpState, ipState, 'untrusted')}
                class={`p-2 rounded-xl border text-center transition-all ${
                  ipState === 'untrusted' ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                Untrusted External IP
              </button>
            </div>
          </div>

          {/* 2. NAT Table Attribute */}
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">2. NAT Table State:</span>
            <div class="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => handleToggle(setNatState, natState, 'valid')}
                class={`p-2 rounded-xl border text-center transition-all ${
                  natState === 'valid' ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                Valid NAT Session
              </button>
              <button
                onClick={() => handleToggle(setNatState, natState, 'mismatched')}
                class={`p-2 rounded-xl border text-center transition-all ${
                  natState === 'mismatched' ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                Spoofed / Bad NAT
              </button>
            </div>
          </div>

          {/* 3. VPN Tunnel Attribute */}
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">3. Encrypted VPN Tunnel:</span>
            <div class="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => handleToggle(setVpnState, vpnState, 'active')}
                class={`p-3 rounded-xl border text-center transition-all ${
                  vpnState === 'active' ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                VPN 1 Active
              </button>
              <button
                onClick={() => handleToggle(setVpnState, vpnState, 'none')}
                class={`p-3 rounded-xl border text-center transition-all ${
                  vpnState === 'none' ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                No VPN (Unencrypted)
              </button>
            </div>
          </div>

          {/* 4. IT Device Health */}
          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1.5">
            <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">4. IT Device Compliance:</span>
            <div class="grid grid-cols-2 gap-2 text-xs font-bold">
              <button
                onClick={() => handleToggle(setItHealth, itHealth, 'compliant')}
                class={`p-2 rounded-xl border text-center transition-all ${
                  itHealth === 'compliant' ? 'bg-emerald-50 border-emerald-400 text-emerald-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                Patched & Clean PC
              </button>
              <button
                onClick={() => handleToggle(setItHealth, itHealth, 'unhealthy')}
                class={`p-2 rounded-xl border text-center transition-all ${
                  itHealth === 'unhealthy' ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-sm' : 'bg-white border-slate-200 text-slate-600'
                }`}
              >
                Outdated / Infected
              </button>
            </div>
          </div>

        </div>

        {/* Visual Real-time Evaluator (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[360px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Policy Engine Attribute Evaluator</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              overallAllowed ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white animate-pulse'
            }`}>
              {overallAllowed ? 'PEP ACCESS GRANTED' : 'PEP ACCESS DENIED'}
            </span>
          </div>

          {/* Attribute Checklist */}
          <div class="my-4 space-y-2">
            
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span class="font-extrabold text-slate-300">1. IP Address Check:</span>
              <span class={isIpOk ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-rose-400 font-bold flex items-center gap-1'}>
                {isIpOk ? <CheckCircle2 class="w-3.5 h-3.5" /> : <XCircle class="w-3.5 h-3.5" />}
                {isIpOk ? 'Known Corporate IP (192.168.1.50)' : 'Untrusted IP (203.0.113.99)'}
              </span>
            </div>

            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span class="font-extrabold text-slate-300">2. NAT Table Session:</span>
              <span class={isNatOk ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-rose-400 font-bold flex items-center gap-1'}>
                {isNatOk ? <CheckCircle2 class="w-3.5 h-3.5" /> : <XCircle class="w-3.5 h-3.5" />}
                {isNatOk ? 'Valid NAT Session State' : 'Spoofed / Mismatched NAT'}
              </span>
            </div>

            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span class="font-extrabold text-slate-300">3. Encrypted VPN Tunnel:</span>
              <span class={isVpnOk ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-rose-400 font-bold flex items-center gap-1'}>
                {isVpnOk ? <CheckCircle2 class="w-3.5 h-3.5" /> : <XCircle class="w-3.5 h-3.5" />}
                {isVpnOk ? 'VPN 1 Tunnel Active' : 'No Encrypted VPN Tunnel'}
              </span>
            </div>

            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
              <span class="font-extrabold text-slate-300">4. IT Device Compliance:</span>
              <span class={isItOk ? 'text-emerald-400 font-bold flex items-center gap-1' : 'text-rose-400 font-bold flex items-center gap-1'}>
                {isItOk ? <CheckCircle2 class="w-3.5 h-3.5" /> : <XCircle class="w-3.5 h-3.5" />}
                {isItOk ? 'Patched & Antivirus Active' : 'Outdated OS / Unpatched'}
              </span>
            </div>

          </div>

          {/* Overall Result Banner */}
          <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            overallAllowed ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
          }`}>
            {overallAllowed ? (
              <span>✅ <strong>All 4 Attributes Passed!</strong> Policy Engine (PE) approves access. PEP unlocks the resource!</span>
            ) : (
              <span>🚫 <strong>Policy Violation Detected!</strong> One or more attributes failed. Zero Trust denies access immediately!</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">IP = Internet Protocol Address</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">NAT = Network Address Translation</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">VPN = Encrypted Tunnel</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IT = Tech Infrastructure</span>
          </div>

        </div>

      </div>

    </div>
  );
}
