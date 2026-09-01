import React, { useState } from 'react';
import { Lock, ShieldAlert, ShieldCheck, ArrowRight, Server, Globe, RefreshCw, Mail } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function VlanNatSim() {
  const [activeTab, setActiveTab] = useState('vlan'); // 'vlan' or 'nat'
  const [vlanTestResult, setVlanTestResult] = useState(null); // null, 'blocked', 'routed'
  const [natState, setNatState] = useState('idle'); // 'idle', 'sending', 'translated', 'received'

  const handleTestVlan = (targetVlan) => {
    sounds.playPop();
    if (targetVlan === 'vlan10') {
      sounds.playBuzzer();
      setVlanTestResult('blocked');
    } else {
      sounds.playSuccess();
      setVlanTestResult('routed');
    }
  };

  const handleRunNat = () => {
    sounds.playPop();
    setNatState('sending');

    setTimeout(() => {
      sounds.playPop();
      setNatState('translated');
    }, 1000);

    setTimeout(() => {
      sounds.playSuccess();
      setNatState('received');
    }, 2000);
  };

  const handleResetNat = () => {
    sounds.playPop();
    setNatState('idle');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Segmentation & Address Translation • VLAN & NAT</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            VLAN Logical Isolation & NAT Mailroom! 🏢📬
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            <strong>VLANs (Virtual Local Area Networks)</strong> separate broadcast domains logically, while <strong>NAT (Network Address Translation)</strong> translates internal private IPs into a single public internet IP!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Soundproof offices (VLAN) & Apartment Mailroom Clerk (NAT).
        </div>
      </div>

      {/* Tabs Switcher */}
      <div class="flex gap-2">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveTab('vlan');
          }}
          class={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all ${
            activeTab === 'vlan'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          1. VLAN Logical Segmentation
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            setActiveTab('nat');
          }}
          class={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all ${
            activeTab === 'nat'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          2. NAT Address Translation
        </button>
      </div>

      {/* Content for Tab 1: VLAN */}
      {activeTab === 'vlan' && (
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Control Panel (Left) */}
          <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
            <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
              <Lock class="w-5 h-5 text-purple-600" />
              <span>Test VLAN Traffic Isolation</span>
            </h4>

            <div class="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs font-semibold text-purple-950 space-y-1">
              <div class="font-extrabold">Source Device:</div>
              <div>Guest Wi-Fi Laptop (Assigned to <strong>VLAN 20</strong>)</div>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
                Select Destination Target:
              </label>

              <button
                onClick={() => handleTestVlan('vlan10')}
                class="w-full p-3.5 rounded-2xl border-2 border-rose-200 bg-rose-50/50 hover:bg-rose-50 text-left font-bold text-xs text-rose-950 transition-all"
              >
                <div class="font-extrabold text-sm">Attempt Direct Connect to HR Server (VLAN 10)</div>
                <div class="text-[11px] text-rose-700 font-medium mt-0.5">Cross-VLAN communication without router</div>
              </button>

              <button
                onClick={() => handleTestVlan('vlan20')}
                class="w-full p-3.5 rounded-2xl border-2 border-purple-200 bg-purple-50/50 hover:bg-purple-50 text-left font-bold text-xs text-purple-950 transition-all"
              >
                <div class="font-extrabold text-sm">Connect to Guest Printer (VLAN 20)</div>
                <div class="text-[11px] text-purple-700 font-medium mt-0.5">Same VLAN local communication</div>
              </button>
            </div>
          </div>

          {/* Display Panel (Right) */}
          <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[320px] shadow-lg relative overflow-hidden">
            
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Switch Port VLAN Map</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500 text-white">
                LAYER 2 SWITCH
              </span>
            </div>

            {/* VLAN Map */}
            <div class="my-4 grid grid-cols-2 gap-3 text-xs font-mono">
              <div class="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl space-y-1">
                <div class="font-extrabold text-rose-300">🔒 VLAN 10 (HR & Finance)</div>
                <div class="text-[11px] text-slate-300">Protected Subnet: 10.0.10.0/24</div>
              </div>

              <div class="p-3 bg-purple-950/60 border border-purple-500/50 rounded-xl space-y-1">
                <div class="font-extrabold text-purple-300">📶 VLAN 20 (Guest Wi-Fi)</div>
                <div class="text-[11px] text-slate-300">Isolated Subnet: 192.168.20.0/24</div>
              </div>
            </div>

            {/* Result Banner */}
            {vlanTestResult && (
              <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
                vlanTestResult === 'blocked'
                  ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
                  : 'bg-emerald-950 border-emerald-500 text-emerald-200'
              }`}>
                {vlanTestResult === 'blocked' ? (
                  <span>🚫 <strong>BLOCKED BY VLAN SEGMENTATION!</strong> Guest devices on <strong>VLAN 20</strong> cannot broadcast or talk directly to HR servers on <strong>VLAN 10</strong> without passing through a Layer 3 firewall router.</span>
                ) : (
                  <span>✅ <strong>SAME VLAN COMMUNICATION PERMITTED!</strong> Devices on VLAN 20 can communicate freely with other VLAN 20 devices.</span>
                )}
              </div>
            )}

            {/* Cheat-sheet bar */}
            <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
              <span class="px-2 py-0.5 bg-slate-800 rounded">VLAN = Virtual Local Area Network</span>
              <span class="px-2 py-0.5 bg-slate-800 rounded">Layer 2 Isolation</span>
            </div>

          </div>

        </div>
      )}

      {/* Content for Tab 2: NAT */}
      {activeTab === 'nat' && (
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

          {/* Control Panel (Left) */}
          <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
            <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
              <Globe class="w-5 h-5 text-purple-600" />
              <span>Simulate NAT Translation</span>
            </h4>

            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs font-mono text-slate-800">
              <div class="font-bold text-purple-900">Private Client IP:</div>
              <div>192.168.1.15 (RFC 1918 Private Subnet)</div>
            </div>

            <button
              onClick={handleRunNat}
              disabled={natState !== 'idle'}
              class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
                natState === 'received'
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                  : natState !== 'idle'
                    ? 'bg-purple-400 text-white animate-pulse cursor-wait'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
              }`}
            >
              {natState === 'idle' && (
                <>
                  <ArrowRight class="w-5 h-5" />
                  <span>Send Web Request through NAT Router</span>
                </>
              )}
              {natState === 'sending' && <span>Sending Packet to NAT Router...</span>}
              {natState === 'translated' && <span>NAT Rewriting Header to Public IP...</span>}
              {natState === 'received' && <span>Response Received & Translated Back!</span>}
            </button>

            {natState !== 'idle' && (
              <button
                onClick={handleResetNat}
                class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
              >
                Reset NAT
              </button>
            )}
          </div>

          {/* Display Panel (Right) */}
          <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[340px] shadow-lg relative overflow-hidden">
            
            <div class="flex items-center justify-between border-b border-white/10 pb-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">NAT Router Lookup Table</span>
              <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500 text-white">
                NAT ROUTER (203.0.113.88)
              </span>
            </div>

            {/* NAT Table */}
            <div class="my-4 p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs font-mono">
              <div class="flex justify-between font-bold text-purple-300 pb-1 border-b border-slate-800">
                <span>INSIDE PRIVATE IP</span>
                <span>OUTSIDE PUBLIC IP</span>
              </div>

              <div class="flex justify-between items-center text-slate-200">
                <span class="text-emerald-400 font-bold">192.168.1.15 : 5401</span>
                <span class="text-sky-400 font-bold">203.0.113.88 : 10042</span>
              </div>
            </div>

            {/* Explanation Banner */}
            <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              natState === 'received' 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
                : 'bg-purple-950/80 border-purple-500/50 text-purple-200'
            }`}>
              {natState === 'received' ? (
                <span>🎉 <strong>NAT Translation Complete!</strong> The <strong>NAT</strong> router hid the internal private IP (`192.168.1.15`) behind public IP `203.0.113.88`. Web traffic returned safely!</span>
              ) : (
                <span>📬 <strong>NAT Protection:</strong> Prevents internet hosts from initiating direct unauthorized connections to internal private IPs.</span>
              )}
            </div>

            {/* Cheat-sheet bar */}
            <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
              <span class="px-2 py-0.5 bg-slate-800 rounded">NAT = Network Address Translation</span>
              <span class="px-2 py-0.5 bg-slate-800 rounded">Private IP → Public IP</span>
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
