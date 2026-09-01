import React, { useState } from 'react';
import { ShieldCheck, Lock, Unlock, Zap, Server, CheckCircle2, XCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RadiusVsTacacsSim() {
  const [activeProto, setActiveProto] = useState('radius'); // 'radius' or 'tacacs'

  const handleSelectProto = (proto) => {
    sounds.playPop();
    setActiveProto(proto);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Protocol Showdown • RADIUS vs TACACS+</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            RADIUS vs TACACS+ Side-by-Side Inspector! 🥊
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            <strong>RADIUS</strong> uses UDP and encrypts passwords only (great for Wi-Fi & VPN users), while <strong>TACACS+</strong> uses TCP and encrypts the 100% entire packet body (ideal for router admin control)!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Enclosing only the password in an envelope (RADIUS) vs placing the entire letter inside a lockbox (TACACS+).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Server class="w-5 h-5 text-amber-600" />
            <span>Select Protocol to Inspect</span>
          </h4>

          <div class="space-y-3">
            
            {/* RADIUS Option */}
            <button
              onClick={() => handleSelectProto('radius')}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                activeProto === 'radius'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm">RADIUS (UDP Ports 1812/1813)</div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Encrypts Password ONLY. AuthN + AuthZ combined.
              </div>
            </button>

            {/* TACACS+ Option */}
            <button
              onClick={() => handleSelectProto('tacacs')}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                activeProto === 'tacacs'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm">TACACS+ (TCP Port 49)</div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Encrypts ENTIRE Packet Body. AuthN, AuthZ, Accounting separated.
              </div>
            </button>

          </div>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Protocol Inspection Breakdown</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              activeProto === 'tacacs' ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
            }`}>
              {activeProto === 'tacacs' ? 'TACACS+ (TCP/49)' : 'RADIUS (UDP/1812)'}
            </span>
          </div>

          {/* Features Comparison Card */}
          <div class="my-4 space-y-2.5 text-xs font-mono">
            
            <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <span class="text-slate-400 font-bold">Transport Layer:</span>
              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                activeProto === 'tacacs' ? 'bg-emerald-900 text-emerald-200' : 'bg-amber-900 text-amber-200'
              }`}>
                {activeProto === 'tacacs' ? 'TCP Port 49 (Reliable Connection)' : 'UDP Ports 1812 / 1813'}
              </span>
            </div>

            <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <span class="text-slate-400 font-bold">Packet Encryption Level:</span>
              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                activeProto === 'tacacs' ? 'bg-emerald-900 text-emerald-200' : 'bg-rose-900 text-rose-200'
              }`}>
                {activeProto === 'tacacs' ? '🔒 100% ENTIRE PACKET BODY ENCRYPTED' : '⚠️ Password ONLY Encrypted (User Visible)'}
              </span>
            </div>

            <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <span class="text-slate-400 font-bold">AAA Component Structure:</span>
              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                activeProto === 'tacacs' ? 'bg-emerald-900 text-emerald-200' : 'bg-slate-800 text-slate-300'
              }`}>
                {activeProto === 'tacacs' ? 'AuthN, AuthZ, Accounting SEPARATED' : 'AuthN + AuthZ Combined'}
              </span>
            </div>

          </div>

          {/* Primary Use Case Banner */}
          <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-amber-300 text-center">
            {activeProto === 'tacacs' ? (
              <span>🛠️ <strong>TACACS+ Ideal Use Case:</strong> Administering network devices (Cisco routers, switches, firewalls) where command-level authorization controls are required!</span>
            ) : (
              <span>📶 <strong>RADIUS Ideal Use Case:</strong> Enterprise 802.1X wireless networks, VPN remote access authentication, and 802.1X switch port security!</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">RADIUS = UDP 1812/1813</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">TACACS+ = TCP 49</span>
          </div>

        </div>

      </div>

    </div>
  );
}
