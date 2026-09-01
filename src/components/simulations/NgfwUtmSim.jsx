import React, { useState } from 'react';
import { Layers, ShieldCheck, Cpu, ArrowRight, CheckCircle2, XCircle, Zap, Server } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function NgfwUtmSim() {
  const [firewallType, setFirewallType] = useState('ngfw'); // 'l4' or 'ngfw'
  const [testTraffic, setTestTraffic] = useState('torrent'); // 'http' or 'torrent'
  const [testResult, setTestResult] = useState(null);

  const handleTestPacket = () => {
    sounds.playPop();
    setTestResult(null);

    setTimeout(() => {
      if (testTraffic === 'torrent' && firewallType === 'l4') {
        sounds.playBuzzer();
        setTestResult('allowed_fool'); // Fooled!
      } else if (testTraffic === 'torrent' && firewallType === 'ngfw') {
        sounds.playSuccess();
        setTestResult('blocked_ngfw'); // Blocked by DPI
      } else {
        sounds.playSuccess();
        setTestResult('allowed_clean');
      }
    }, 800);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Next-Gen Inspection & UTM • OSI, NGFW, NAT, UTM, CSU/DSU</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Layer 4 vs Layer 7 NGFW & UTM Appliances! 🛡️🇨🇭
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Traditional Layer 4 firewalls inspect IP/ports & <strong>NAT</strong> rules. <strong>NGFW (Next-Generation Firewalls)</strong> inspect <strong>OSI Layer 7</strong> application payloads. A <strong>UTM (Unified Threat Management)</strong> appliance combines firewall, IPS, URL filter, and <strong>CSU/DSU</strong> WAN modems into one box!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Envelope inspector (Layer 4) vs Deep letter reader (Layer 7 NGFW).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Layers class="w-5 h-5 text-indigo-600" />
            <span>Select Firewall & Traffic Type</span>
          </h4>

          {/* Firewall Type */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Firewall Inspection Level:</label>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  sounds.playPop();
                  setFirewallType('l4');
                  setTestResult(null);
                }}
                class={`p-3 rounded-2xl border-2 font-extrabold text-xs transition-all ${
                  firewallType === 'l4'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                Layer 4 Firewall (+ NAT)
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setFirewallType('ngfw');
                  setTestResult(null);
                }}
                class={`p-3 rounded-2xl border-2 font-extrabold text-xs transition-all ${
                  firewallType === 'ngfw'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                Layer 7 NGFW (+ UTM)
              </button>
            </div>
          </div>

          {/* Test Traffic */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Select Incoming Traffic:</label>
            <div class="space-y-2">
              <button
                onClick={() => {
                  sounds.playPop();
                  setTestTraffic('http');
                  setTestResult(null);
                }}
                class={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-xs transition-all ${
                  testTraffic === 'http'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                Normal Web Traffic (Port 80 HTTP)
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setTestTraffic('torrent');
                  setTestResult(null);
                }}
                class={`w-full p-3 rounded-xl border-2 text-left font-extrabold text-xs transition-all ${
                  testTraffic === 'torrent'
                    ? 'border-amber-500 bg-amber-50 text-amber-950'
                    : 'border-slate-200 text-slate-700'
                }`}
              >
                BitTorrent Disguised over Port 80 🕵️
              </button>
            </div>
          </div>

          <button
            onClick={handleTestPacket}
            class="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowRight class="w-4 h-4" />
            <span>Pass Packet through Firewall</span>
          </button>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">OSI Packet Inspection Engine</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              firewallType === 'ngfw' ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-300'
            }`}>
              {firewallType === 'ngfw' ? 'NGFW LAYER 7 DPI' : 'LAYER 4 PORT FILTER'}
            </span>
          </div>

          {/* Inspection Cards */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            {/* Layer 4 Box */}
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              firewallType === 'l4' ? 'bg-indigo-950 border-indigo-400 text-indigo-100 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>1. OSI Layer 4 Inspection (IP, Port & NAT)</span>
                <span class="text-[10px] text-slate-400">PORT 80 CHECK</span>
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Reads IP headers & port numbers only. Cannot see application contents!
              </p>
            </div>

            {/* Layer 7 NGFW Box */}
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              firewallType === 'ngfw' ? 'bg-purple-950 border-purple-400 text-purple-100 shadow-md' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>2. OSI Layer 7 NGFW Deep Packet Inspection (DPI)</span>
                <span class="text-[10px] text-purple-300">APP AWARENESS & UTM</span>
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Decodes application signatures, URL filters, anti-spam, and **CSU/DSU** WAN streams.
              </p>
            </div>

          </div>

          {/* Result Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            testResult === 'blocked_ngfw'
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : testResult === 'allowed_fool'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
                : testResult === 'allowed_clean'
                  ? 'bg-indigo-950 border-indigo-500 text-indigo-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {testResult === 'blocked_ngfw' && (
              <span>✅ <strong>BITTORRENT BLOCKED BY NGFW!</strong> The <strong>NGFW Layer 7 DPI</strong> engine decoded the packet payload, caught the BitTorrent signature disguised over Port 80, and blocked it!</span>
            )}
            {testResult === 'allowed_fool' && (
              <span>🚨 <strong>LAYER 4 FIREWALL FOOLED!</strong> Because Layer 4 firewalls only look at port numbers, the BitTorrent traffic disguised over Port 80 passed right through!</span>
            )}
            {testResult === 'allowed_clean' && (
              <span>✅ <strong>NORMAL HTTP TRAFFIC PERMITTED!</strong> Clean web browsing request passed through the firewall.</span>
            )}
            {!testResult && (
              <span>🛡️ <strong>Firewall Engine Ready:</strong> Pass a packet to test Layer 4 vs Layer 7 NGFW application inspection.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">NGFW = Next-Gen Firewall</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">UTM = Unified Threat Management</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CSU/DSU = Digital WAN Interface</span>
          </div>

        </div>

      </div>

    </div>
  );
}
