import React, { useState } from 'react';
import { ShieldCheck, Wifi, Lock, Unlock, Eye, EyeOff } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function VpnRemoteWorkerSim() {
  const [vpnActive, setVpnActive] = useState(false);

  const handleToggleVpn = () => {
    sounds.playSuccess();
    setVpnActive(!vpnActive);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Remote Work Security • VPN, IT</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Public Wi-Fi Remote Worker VPN Shield! 🛡️💻
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            When working remotely on public Wi-Fi, user training mandates connecting to a <strong>VPN (Virtual Private Network)</strong> to create an encrypted tunnel that shields passwords and corporate traffic from eavesdroppers!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Sending mail in a steel armored bank truck vs a transparent postcard.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Controls Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Wifi class="w-5 h-5 text-purple-600" />
            <span>Remote Worker Terminal</span>
          </h4>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-2 font-mono text-xs">
            <div class="text-purple-300 font-bold">Network Connection:</div>
            <div class="text-slate-200 font-sans">
              "Public Airport Free Wi-Fi (Unencrypted)"
            </div>
            
            <div class="pt-2 border-t border-white/10 flex justify-between items-center text-[11px]">
              <span>VPN Encrypted Tunnel Status:</span>
              <span className={vpnActive ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {vpnActive ? 'ACTIVE (AES-256) 🔒' : 'OFF (Exposed) 🔓'}
              </span>
            </div>
          </div>

          <button
            onClick={handleToggleVpn}
            class={`w-full py-4 rounded-2xl font-extrabold text-xs transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
              vpnActive
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
            }`}
          >
            {vpnActive ? <Unlock class="w-4 h-4" /> : <Lock class="w-4 h-4" />}
            <span>{vpnActive ? 'Disconnect VPN Tunnel' : 'Connect Corporate VPN Tunnel 🔒'}</span>
          </button>
        </div>

        {/* Eavesdropper Visual Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Wi-Fi Packet Eavesdropper Radar</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              vpnActive ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white animate-pulse'
            }`}>
              {vpnActive ? 'TRAFFIC ENCRYPTED 🟢' : 'CLEAR-TEXT EXPOSED 🔴'}
            </span>
          </div>

          {/* Wi-Fi Traffic Inspection */}
          <div class="my-4 space-y-3 font-mono text-xs">
            <div class="text-slate-400 text-[11px] font-bold">Hacker Packet Sniffer Stream:</div>

            {!vpnActive ? (
              <div class="p-4 bg-rose-950 border border-rose-500 rounded-2xl space-y-1 text-rose-200 animate-fadeIn">
                <div class="flex items-center gap-2 text-rose-400 font-bold">
                  <Eye class="w-4 h-4" /> HACKER SNIFFING CLEAR-TEXT DATA:
                </div>
                <div class="text-xs text-white">
                  User: admin@company.com | Password: <span class="text-rose-400 font-bold">P@ssword2026!</span> | Session: Active
                </div>
              </div>
            ) : (
              <div class="p-4 bg-emerald-950 border border-emerald-500 rounded-2xl space-y-1 text-emerald-200 animate-fadeIn">
                <div class="flex items-center gap-2 text-emerald-400 font-bold">
                  <EyeOff class="w-4 h-4" /> HACKER SEES ONLY GARBLED NOISE:
                </div>
                <div class="text-xs text-slate-300 font-mono break-all">
                  a8f9c2d1b7e4f3a098c7e2b1d4f6a9e8c3b2a1d4f6e9c8b7a6f5e4d3c2b1a098... (AES-256 Encrypted)
                </div>
              </div>
            )}
          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            vpnActive
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-rose-950 border-rose-500 text-rose-200'
          }`}>
            {vpnActive ? (
              <span>🔒 <strong>VPN ENCRYPTED:</strong> All Wi-Fi traffic is securely wrapped in an encrypted tunnel, rendering public Wi-Fi eavesdropping impossible!</span>
            ) : (
              <span>🔴 <strong>EXPOSED TRAFFIC:</strong> Without a VPN, hackers on public Wi-Fi can intercept your unencrypted passwords and session tokens!</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">VPN = Virtual Private Network</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IT Policy = VPN Mandatory on Public Wi-Fi</span>
          </div>

        </div>

      </div>

    </div>
  );
}
