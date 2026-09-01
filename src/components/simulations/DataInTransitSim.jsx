import React, { useState } from 'react';
import { Lock, Unlock, ShieldCheck, ShieldAlert, Wifi, Globe, Truck, Building2, Server, Laptop } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DataInTransitSim() {
  const [tunnelMode, setTunnelMode] = useState('http'); // 'http', 'https', 'vpn', 'ipsec'

  const handleSelectMode = (mode) => {
    sounds.playPop();
    setTunnelMode(mode);
  };

  const isEncrypted = tunnelMode !== 'http';

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Data in Transit • HTTPS, VPN, SSL, TLS, IPsec</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Data in Transit = Armored Transport Tunnels! 🚚
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            When data travels across the Internet, <strong>HTTPS (SSL/TLS)</strong>, <strong>VPNs</strong>, and <strong>IPsec</strong> wrap your packets inside encrypted armor so Wi-Fi eavesdroppers can't steal them!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Shipping cash in an armored bank truck instead of an open cart.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Truck class="w-5 h-5 text-indigo-600" />
            <span>Select Transport Tunnel Mode</span>
          </h4>

          <div class="space-y-2.5">
            {/* Mode 1: HTTP */}
            <button
              onClick={() => handleSelectMode('http')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between active:scale-95 ${
                tunnelMode === 'http'
                  ? 'border-rose-500 bg-rose-50 text-rose-950 font-extrabold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="text-sm font-extrabold text-rose-700 flex items-center gap-1.5">
                  <Unlock class="w-4 h-4" /> Mode 1: Plain Unencrypted HTTP
                </div>
                <div class="text-[11px] font-medium text-slate-600 mt-0.5">
                  No encryption armor. Anyone on public Wi-Fi can see passwords!
                </div>
              </div>
            </button>

            {/* Mode 2: HTTPS (SSL/TLS) */}
            <button
              onClick={() => handleSelectMode('https')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between active:scale-95 ${
                tunnelMode === 'https'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-extrabold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="text-sm font-extrabold text-emerald-700 flex items-center gap-1.5">
                  <Globe class="w-4 h-4" /> Mode 2: HTTPS Web Traffic (SSL/TLS)
                </div>
                <div class="text-[11px] font-medium text-slate-600 mt-0.5">
                  Encrypts web browser connection to websites like <em>https://bank.com</em>
                </div>
              </div>
            </button>

            {/* Mode 3: Remote Access VPN */}
            <button
              onClick={() => handleSelectMode('vpn')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between active:scale-95 ${
                tunnelMode === 'vpn'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-950 font-extrabold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="text-sm font-extrabold text-indigo-700 flex items-center gap-1.5">
                  <Laptop class="w-4 h-4" /> Mode 3: Remote Access VPN
                </div>
                <div class="text-[11px] font-medium text-slate-600 mt-0.5">
                  Encapsulates ALL laptop traffic in a secure tunnel back to HQ
                </div>
              </div>
            </button>

            {/* Mode 4: Site-to-Site IPsec VPN */}
            <button
              onClick={() => handleSelectMode('ipsec')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between active:scale-95 ${
                tunnelMode === 'ipsec'
                  ? 'border-purple-500 bg-purple-50 text-purple-950 font-extrabold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="text-sm font-extrabold text-purple-700 flex items-center gap-1.5">
                  <Building2 class="w-4 h-4" /> Mode 4: Site-to-Site IPsec VPN
                </div>
                <div class="text-[11px] font-medium text-slate-600 mt-0.5">
                  Network-layer (IPsec) pipeline connecting 2 full office buildings!
                </div>
              </div>
            </button>
          </div>

        </div>

        {/* Visual Network Tunnel Graphic (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[360px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Public Wi-Fi Packet Sniffer View</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              isEncrypted ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white animate-pulse'
            }`}>
              {isEncrypted ? 'Encrypted Tunnel Active' : 'Unencrypted Plaintext!'}
            </span>
          </div>

          {/* Network Packet Sniffer Box */}
          <div class="my-6 space-y-4">
            
            <div class="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-3">
              <div class="flex items-center justify-between text-xs font-bold text-slate-400">
                <span class="flex items-center gap-1.5">
                  <Wifi class="w-4 h-4 text-indigo-400" /> What Snoopy Eavesdropper Sees on Wi-Fi:
                </span>
                <span class={isEncrypted ? "text-emerald-400" : "text-rose-400 font-extrabold"}>
                  {tunnelMode.toUpperCase()} Mode
                </span>
              </div>

              <div class={`p-3.5 rounded-xl font-mono text-xs ${
                isEncrypted ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' : 'bg-rose-950/80 border border-rose-500/50 text-rose-300'
              }`}>
                {tunnelMode === 'http' && (
                  <div>
                    <div>[PACKET #4810] UNENCRYPTED HTTP:</div>
                    <div class="text-white font-extrabold mt-1">"POST /login HTTP/1.1 Password=SuperSecret123"</div>
                  </div>
                )}
                {tunnelMode === 'https' && (
                  <div>
                    <div>[PACKET #4810] HTTPS (TLS Encrypted Payload):</div>
                    <div class="text-emerald-300 mt-1">"🔒 04a8f9c1e27b84a9f... (Scrambled Ciphertext)"</div>
                  </div>
                )}
                {tunnelMode === 'vpn' && (
                  <div>
                    <div>[PACKET #4810] Remote Access VPN Tunnel:</div>
                    <div class="text-indigo-300 mt-1">"🔒 All Device Packets Wrapped in SSL/TLS or IPsec Tunnel"</div>
                  </div>
                )}
                {tunnelMode === 'ipsec' && (
                  <div>
                    <div>[PACKET #4810] Site-to-Site IPsec Network Pipeline:</div>
                    <div class="text-purple-300 mt-1">"🔒 Office A to Office B IP-Layer Encryption (AH & ESP)"</div>
                  </div>
                )}
              </div>
            </div>

            {/* Explanation Banner */}
            <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              isEncrypted 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200 animate-pulse'
            }`}>
              {isEncrypted ? (
                <span>✅ <strong>{tunnelMode.toUpperCase()} Encryption Active:</strong> Data in transit is protected! Eavesdroppers only see unreadable gibberish.</span>
              ) : (
                <span>🚫 <strong>Danger! Plaintext HTTP:</strong> Anyone connected to the same Wi-Fi router can intercept your un-encrypted passwords and cookies!</span>
              )}
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">HTTPS = Web Encryption</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">VPN = Encrypted Tunnel</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSL/TLS = Handshake Protocols</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IPsec = Network-Layer VPN Suite</span>
          </div>

        </div>

      </div>

    </div>
  );
}
