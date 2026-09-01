import React, { useState } from 'react';
import { Server, UserCheck, ShieldCheck, Database, Key, ArrowRight, Lock, CheckCircle2, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function AaaProtocolsSim() {
  const [selectedProtocol, setSelectedProtocol] = useState('radius'); // 'radius' or 'tacacs'
  const [flowStage, setFlowStage] = useState('idle'); // 'idle', 'supplicant', 'authenticator', 'aaa', 'ldap', 'approved'

  const handleRunAuthentication = () => {
    sounds.playPop();
    setFlowStage('supplicant');

    setTimeout(() => {
      sounds.playPop();
      setFlowStage('authenticator');
    }, 700);

    setTimeout(() => {
      sounds.playPop();
      setFlowStage('aaa');
    }, 1400);

    setTimeout(() => {
      sounds.playPop();
      setFlowStage('ldap');
    }, 2100);

    setTimeout(() => {
      sounds.playSuccess();
      setFlowStage('approved');
    }, 2800);
  };

  const handleReset = () => {
    sounds.playPop();
    setFlowStage('idle');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Centralized AAA & Directory • RADIUS, LDAP, TACACS+</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            AAA Authentication & Directory Flow! 🏢🔑
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            <strong>RADIUS</strong> and <strong>TACACS+</strong> act as centralized AAA bouncers that query <strong>LDAP (Lightweight Directory Access Protocol)</strong> active directories to verify user credentials and grant network port access!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Bouncer checking your ID card against the VIP guest list database.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Key class="w-5 h-5 text-amber-600" />
            <span>Select AAA Authentication Engine</span>
          </h4>

          {/* Protocol Switcher */}
          <div class="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                if (flowStage === 'idle') {
                  sounds.playPop();
                  setSelectedProtocol('radius');
                }
              }}
              class={`p-3 rounded-2xl border-2 font-extrabold text-xs transition-all ${
                selectedProtocol === 'radius'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              RADIUS (802.1X Wi-Fi / VPN)
            </button>

            <button
              onClick={() => {
                if (flowStage === 'idle') {
                  sounds.playPop();
                  setSelectedProtocol('tacacs');
                }
              }}
              class={`p-3 rounded-2xl border-2 font-extrabold text-xs transition-all ${
                selectedProtocol === 'tacacs'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              TACACS+ (Router Admin)
            </button>
          </div>

          <button
            onClick={handleRunAuthentication}
            disabled={flowStage !== 'idle'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              flowStage === 'approved'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : flowStage !== 'idle'
                  ? 'bg-amber-400 text-amber-950 animate-pulse cursor-wait'
                  : 'bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-amber-200'
            }`}
          >
            {flowStage === 'idle' && <span>Authenticate User via 802.1X</span>}
            {flowStage === 'supplicant' && <span>Stage 1: Supplicant sending EAP...</span>}
            {flowStage === 'authenticator' && <span>Stage 2: Switch forwarding request...</span>}
            {flowStage === 'aaa' && <span>Stage 3: {selectedProtocol.toUpperCase()} evaluating...</span>}
            {flowStage === 'ldap' && <span>Stage 4: Querying LDAP Directory...</span>}
            {flowStage === 'approved' && <span>✅ Port Access Granted & Logged!</span>}
          </button>

          {flowStage !== 'idle' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Authentication Flow
            </button>
          )}
        </div>

        {/* Visual Pipeline Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[420px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Live 802.1X AAA Architecture Stream</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-400 text-slate-950 uppercase">
              {selectedProtocol} PROTOCOL
            </span>
          </div>

          {/* Flow Pipeline Steps */}
          <div class="my-4 grid grid-cols-4 gap-2 text-center text-xs font-mono">
            
            {/* Step 1: Supplicant */}
            <div className={`p-2.5 rounded-xl border transition-all ${
              flowStage === 'supplicant' ? 'bg-amber-950 border-amber-400 scale-105 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="text-lg">💻</div>
              <div class="font-bold text-[10px] text-slate-300 mt-1">1. Supplicant</div>
              <div class="text-[9px] text-slate-400">User Client</div>
            </div>

            {/* Step 2: Authenticator */}
            <div className={`p-2.5 rounded-xl border transition-all ${
              flowStage === 'authenticator' ? 'bg-amber-950 border-amber-400 scale-105 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="text-lg">🔌</div>
              <div class="font-bold text-[10px] text-slate-300 mt-1">2. Switch</div>
              <div class="text-[9px] text-slate-400">802.1X Port</div>
            </div>

            {/* Step 3: AAA Server */}
            <div className={`p-2.5 rounded-xl border transition-all ${
              flowStage === 'aaa' ? 'bg-amber-950 border-amber-400 scale-105 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="text-lg">🏢</div>
              <div class="font-bold text-[10px] text-slate-300 mt-1">3. {selectedProtocol.toUpperCase()}</div>
              <div class="text-[9px] text-slate-400">AAA Server</div>
            </div>

            {/* Step 4: LDAP Directory */}
            <div className={`p-2.5 rounded-xl border transition-all ${
              flowStage === 'ldap' ? 'bg-emerald-950 border-emerald-400 scale-105 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="text-lg">🌳</div>
              <div class="font-bold text-[10px] text-slate-300 mt-1">4. LDAP</div>
              <div class="text-[9px] text-slate-400">Directory DB</div>
            </div>

          </div>

          {/* Live Status Card */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            flowStage === 'approved' 
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200' 
              : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}>
            {flowStage === 'approved' ? (
              <span>🎉 <strong>Access Granted!</strong> The <strong>{selectedProtocol.toUpperCase()}</strong> server verified credentials against the <strong>LDAP</strong> directory (`cn=John, ou=Users`) and signaled the switch to open the 802.1X port!</span>
            ) : flowStage === 'ldap' ? (
              <span>🔍 <strong>LDAP Directory Lookup:</strong> AAA server querying LDAP directory tree over TCP port 389/636 to verify user group permissions...</span>
            ) : (
              <span>🔑 <strong>AAA Engine Ready:</strong> Select a protocol and click Authenticate to test 802.1X access control.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">RADIUS = Remote Authentication Dial-In User Service</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">LDAP = Lightweight Directory Access Protocol</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">TACACS+ = Terminal Access Controller ACS+</span>
          </div>

        </div>

      </div>

    </div>
  );
}
