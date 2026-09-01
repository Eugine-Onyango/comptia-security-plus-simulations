import React, { useState } from 'react';
import { Layers, ShieldCheck, Lock, ArrowRight, Eye, RefreshCw, Server } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function IpsecModesSim() {
  const [ipsecMode, setIpsecMode] = useState('tunnel'); // 'transport' or 'tunnel'

  const handleSelectMode = (mode) => {
    sounds.playPop();
    setIpsecMode(mode);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>IPsec Protocol Modes • Transport Mode vs Tunnel Mode</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            IPsec Packet Header Inspector! 📦🔒
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            <strong>IPsec Transport Mode</strong> encrypts payload data only, while <strong>IPsec Tunnel Mode</strong> encrypts the entire original <strong>IP</strong> packet and adds a new outer IP header for gateway-to-gateway <strong>VPNs</strong>!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Locking a letter inside an envelope (Transport) vs putting the entire envelope inside a bigger steel shipping crate (Tunnel).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Layers class="w-5 h-5 text-purple-600" />
            <span>Select IPsec Operational Mode</span>
          </h4>

          <div class="space-y-3">
            
            {/* Transport Mode Button */}
            <button
              onClick={() => handleSelectMode('transport')}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                ipsecMode === 'transport'
                  ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm">Transport Mode (Host-to-Host)</div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Encrypts payload data ONLY. Original IP headers remain visible.
              </div>
            </button>

            {/* Tunnel Mode Button */}
            <button
              onClick={() => handleSelectMode('tunnel')}
              class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
                ipsecMode === 'tunnel'
                  ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-sm scale-[1.02]'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div class="font-extrabold text-sm">Tunnel Mode (Site-to-Site Gateway)</div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                Encrypts entire original IP packet. Adds new outer IP header.
              </div>
            </button>

          </div>
        </div>

        {/* Visual Packet Header Inspector (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">IPsec Encapsulated Packet Breakdown</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500 text-white">
              {ipsecMode === 'tunnel' ? 'TUNNEL MODE PACKET' : 'TRANSPORT MODE PACKET'}
            </span>
          </div>

          {/* Packet Header Diagram */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            {ipsecMode === 'transport' ? (
              /* Transport Mode Layout */
              <div class="space-y-2">
                <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                  <span class="text-slate-400 font-bold">1. Original IP Header:</span>
                  <span class="px-2 py-0.5 bg-slate-800 text-slate-200 rounded text-[10px]">SRC: 192.168.1.10 → DST: 10.0.0.5</span>
                </div>

                <div class="p-3 bg-purple-950/80 border border-purple-500 rounded-xl flex items-center justify-between">
                  <span class="text-purple-300 font-bold">2. IPsec ESP Header:</span>
                  <span class="px-2 py-0.5 bg-purple-900 text-purple-200 rounded text-[10px]">SPI: 0x3f2a (Encryption Key ID)</span>
                </div>

                <div class="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl flex items-center justify-between">
                  <span class="text-emerald-300 font-bold">3. Encrypted Data Payload:</span>
                  <span class="px-2 py-0.5 bg-emerald-900 text-emerald-200 rounded text-[10px]">🔒 [AES ENCRYPTED BODY]</span>
                </div>
              </div>
            ) : (
              /* Tunnel Mode Layout */
              <div class="space-y-2">
                <div class="p-3 bg-sky-950/80 border border-sky-500 rounded-xl flex items-center justify-between">
                  <span class="text-sky-300 font-bold">1. New Outer IP Header:</span>
                  <span class="px-2 py-0.5 bg-sky-900 text-sky-200 rounded text-[10px]">SRC: 203.0.113.1 → DST: 198.51.100.5 (Public VPN Endpoints)</span>
                </div>

                <div class="p-3 bg-purple-950/80 border border-purple-500 rounded-xl flex items-center justify-between">
                  <span class="text-purple-300 font-bold">2. IPsec ESP Header:</span>
                  <span class="px-2 py-0.5 bg-purple-900 text-purple-200 rounded text-[10px]">SPI: 0x9b41</span>
                </div>

                <div class="p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl flex items-center justify-between">
                  <span class="text-emerald-300 font-bold">3. Encrypted Inner Packet:</span>
                  <span class="px-2 py-0.5 bg-emerald-900 text-emerald-200 rounded text-[10px]">🔒 [Original IP Header + Data Payload ENCRYPTED]</span>
                </div>
              </div>
            )}

          </div>

          {/* Explanation Banner */}
          <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-purple-300 text-center">
            {ipsecMode === 'tunnel' ? (
              <span>🛡️ <strong>Tunnel Mode Advantage:</strong> Hides internal corporate private IP addresses (`192.168.1.10`) inside the encrypted tunnel wrapper. Perfect for Site-to-Site VPN firewalls!</span>
            ) : (
              <span>💻 <strong>Transport Mode Advantage:</strong> Lower header overhead because it only encrypts payload data. Ideal for direct workstation-to-workstation connections.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">Transport Mode = Payload Only</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Tunnel Mode = Entire IP Packet</span>
          </div>

        </div>

      </div>

    </div>
  );
}
