import React, { useState } from 'react';
import { Lock, Unlock, ShieldCheck, Globe, Building, ArrowRight, CheckCircle2, UserCheck, Wifi } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function FederationVpnSim() {
  const [vpnActive, setVpnActive] = useState(false);
  const [isFederatedLoggedIn, setIsFederatedLoggedIn] = useState(false);

  const handleToggleVpn = () => {
    const next = !vpnActive;
    setVpnActive(next);
    if (next) sounds.playSuccess();
    else sounds.playPop();
  };

  const handleLoginCa = () => {
    sounds.playSuccess();
    setIsFederatedLoggedIn(true);
  };

  const handleReset = () => {
    sounds.playPop();
    setIsFederatedLoggedIn(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Federation & Connectivity • CA & VPN</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Central Authority (CA) & VPN Tunnels! 🎟️🔒
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            In federated single sign-on, a <strong>Central Authority (CA)</strong> verifies who you are once so all apps trust you! Connecting via <strong>VPN</strong> keeps that login tunnel encrypted.
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Logging in with 1 Google account to access 50 different websites.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Building class="w-5 h-5 text-purple-600" />
            <span>Federation & Tunnel Controls</span>
          </h4>

          {/* VPN Toggle */}
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
              Network Connection Security:
            </span>

            <button
              onClick={handleToggleVpn}
              class={`w-full p-3.5 rounded-2xl border-4 text-left transition-all flex items-center justify-between active:scale-95 ${
                vpnActive
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-extrabold shadow-md'
                  : 'border-rose-400 bg-rose-50 text-rose-950 font-extrabold'
              }`}
            >
              <div>
                <div class="text-sm font-extrabold">
                  {vpnActive ? '🔒 VPN Tunnel Active' : '🔓 Public Wi-Fi (No VPN)'}
                </div>
                <div class="text-[11px] font-medium text-slate-600 mt-0.5">
                  {vpnActive ? 'All traffic encrypted to Central Authority' : 'Unencrypted connection exposed to eavesdroppers'}
                </div>
              </div>

              <div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                vpnActive ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white animate-pulse'
              }`}>
                {vpnActive ? '🔒' : '⚠️'}
              </div>
            </button>
          </div>

          {/* Central Authority Login */}
          <div class="space-y-3 pt-2">
            <span class="text-xs font-bold text-slate-600 uppercase tracking-wider block">
              Central Authority (CA) Single Sign-On:
            </span>

            <button
              onClick={handleLoginCa}
              disabled={isFederatedLoggedIn}
              class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                isFederatedLoggedIn
                  ? 'bg-purple-100 text-purple-900 border border-purple-300 cursor-not-allowed'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
              }`}
            >
              {isFederatedLoggedIn ? (
                <span>Logged in via Central Authority!</span>
              ) : (
                <>
                  <UserCheck class="w-5 h-5" />
                  <span>Login Once via CA (Central Authority)</span>
                </>
              )}
            </button>
          </div>

          {isFederatedLoggedIn && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Log Out of Central Authority
            </button>
          )}
        </div>

        {/* Visual Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Federated Single Sign-On Ecosystem</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              vpnActive ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
            }`}>
              {vpnActive ? 'VPN Encrypted Tunnel' : 'Unencrypted Wi-Fi'}
            </span>
          </div>

          {/* Central Authority Diagram */}
          <div class="my-4 space-y-4">
            
            {/* CA Hub Card */}
            <div class="p-4 bg-purple-950/80 border-2 border-purple-400 rounded-2xl text-center space-y-2">
              <div class="w-12 h-12 rounded-xl bg-purple-500 text-white flex items-center justify-center text-2xl font-bold mx-auto">
                🏛️
              </div>
              <div class="font-extrabold text-sm text-purple-200">CA (Central Authority) Login Hub</div>
              <p class="text-xs text-slate-300">
                {isFederatedLoggedIn 
                  ? '✅ CA verified identity once! Issued 1 trusted signed ticket.' 
                  : 'Click "Login Once via CA" to get your Single Sign-On ticket!'}
              </p>
            </div>

            {/* Downward Member Apps */}
            <div class="grid grid-cols-2 gap-3 text-center">
              <div class={`p-3.5 rounded-2xl border-2 transition-all ${
                isFederatedLoggedIn ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}>
                <Globe class="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                <div class="text-xs font-extrabold">App 1 (Payroll)</div>
                <div class="text-[10px] mt-0.5">{isFederatedLoggedIn ? '✅ Auto-Logged In!' : 'Locked'}</div>
              </div>

              <div class={`p-3.5 rounded-2xl border-2 transition-all ${
                isFederatedLoggedIn ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200' : 'bg-slate-800 border-slate-700 text-slate-400'
              }`}>
                <Building class="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                <div class="text-xs font-extrabold">App 2 (HR Portal)</div>
                <div class="text-[10px] mt-0.5">{isFederatedLoggedIn ? '✅ Auto-Logged In!' : 'Locked'}</div>
              </div>
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">AAA = Access Control Framework</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CA = Central Authority</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">VPN = Encrypted Tunnel</span>
          </div>

        </div>

      </div>

    </div>
  );
}
