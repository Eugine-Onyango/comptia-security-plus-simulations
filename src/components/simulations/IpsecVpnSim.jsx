import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Lock, Unlock, ArrowRight, Eye, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function IpsecVpnSim() {
  const [vpnMode, setVpnMode] = useState(false); // false = Plain IP, true = IPsec VPN
  const [animState, setAnimState] = useState('idle'); // 'idle', 'sending', 'received'
  const [capturedData, setCapturedData] = useState(null);

  const handleSendPacket = () => {
    sounds.playPop();
    setAnimState('sending');
    setCapturedData(null);

    setTimeout(() => {
      if (vpnMode) {
        sounds.playSuccess();
        setCapturedData('🔒 IPsec Encrypted: [ESP Header] 9a8f3b21c4e7... (Payload Unreadable)');
      } else {
        sounds.playBuzzer();
        setCapturedData('🚨 Plain IP Postcard: USER=admin & PASS=Secret123 (PLAINTEXT!)');
      }
      setAnimState('received');
    }, 1200);
  };

  const handleToggleVpn = () => {
    sounds.playPop();
    setVpnMode(!vpnMode);
    setAnimState('idle');
    setCapturedData(null);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Network Layer Security • IP, IPsec, VPN</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            IPsec Encrypted VPN Tunnels! 🛡️🔒
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Standard <strong>IP (Internet Protocol)</strong> sends traffic unencrypted. <strong>IPsec (IP Security)</strong> wraps IP packets in cryptographic encryption to form a secure <strong>VPN (Virtual Private Network)</strong> tunnel!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Postcard in public mail vs lockable armored steel briefcase.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Lock class="w-5 h-5 text-indigo-600" />
            <span>VPN Tunnel Controls</span>
          </h4>

          {/* VPN Toggle Switch */}
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold text-slate-700">IPsec VPN Tunnel Status:</span>
              <span className={`px-2.5 py-1 rounded-full font-extrabold text-xs ${
                vpnMode ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
              }`}>
                {vpnMode ? '🔒 IPsec VPN CONNECTED' : '🔓 Plain IP (Unencrypted)'}
              </span>
            </div>

            <button
              onClick={handleToggleVpn}
              class={`w-full py-3 rounded-xl font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 ${
                vpnMode
                  ? 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              }`}
            >
              {vpnMode ? <Unlock class="w-4 h-4" /> : <Lock class="w-4 h-4" />}
              <span>{vpnMode ? 'Disconnect VPN (Switch to Plain IP)' : 'Establish IPsec VPN Tunnel'}</span>
            </button>
          </div>

          {/* Send Packet Button */}
          <button
            onClick={handleSendPacket}
            disabled={animState === 'sending'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              animState === 'sending'
                ? 'bg-indigo-400 text-white animate-pulse cursor-wait'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            <Send class="w-5 h-5" />
            <span>Send Data Packet across Internet</span>
          </button>
        </div>

        {/* Visual Animated Network Pipeline (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Live Network Packet Stream</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              vpnMode ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
            }`}>
              {vpnMode ? 'IPsec ENCRYPTED TUNNEL' : 'UNSECURED PUBLIC IP ROUTE'}
            </span>
          </div>

          {/* Tunnel Pipeline Visual */}
          <div className={`my-6 p-6 rounded-3xl border-4 transition-all relative ${
            vpnMode 
              ? 'bg-indigo-950/80 border-indigo-400 shadow-lg shadow-indigo-950' 
              : 'bg-slate-950 border-rose-500/40'
          }`}>
            <div class="flex items-center justify-between relative z-10 text-xs font-bold">
              
              {/* Client PC */}
              <div class="text-center space-y-1">
                <div class="w-10 h-10 mx-auto rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                  💻
                </div>
                <div class="text-[10px] text-slate-400">Client PC</div>
              </div>

              {/* Animated Pipe Stream */}
              <div class="flex-1 px-4 relative">
                <div class="w-full bg-slate-800 h-3 rounded-full overflow-hidden relative">
                  {animState === 'sending' && (
                    <div className={`h-full w-8 rounded-full animate-progress ${
                      vpnMode ? 'bg-emerald-400 shadow-lg shadow-emerald-400' : 'bg-rose-500 shadow-lg shadow-rose-500'
                    }`}></div>
                  )}
                </div>
                <div class="text-[10px] font-mono text-center text-slate-400 mt-1">
                  {vpnMode ? '🔒 IPsec Tunnel (AES-256)' : '🌐 Public Internet'}
                </div>
              </div>

              {/* Server Gateway */}
              <div class="text-center space-y-1">
                <div class="w-10 h-10 mx-auto rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-lg">
                  🏢
                </div>
                <div class="text-[10px] text-slate-400">Corporate Gateway</div>
              </div>

            </div>
          </div>

          {/* Eavesdropper Inspection Box */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-mono font-semibold transition-all ${
            capturedData && !vpnMode
              ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
              : capturedData && vpnMode
                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <div class="flex items-center gap-1.5 font-bold uppercase text-[10px] text-slate-400 mb-1">
              <Eye class="w-3.5 h-3.5" /> Hacker Sniffer Intercept View:
            </div>
            {capturedData ? (
              <div>{capturedData}</div>
            ) : (
              <div>⏳ Waiting to inspect network packet...</div>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">IP = Internet Protocol</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IPsec = Internet Protocol Security</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">VPN = Virtual Private Network</span>
          </div>

        </div>

      </div>

    </div>
  );
}
