import React, { useState, useEffect } from 'react';
import { sounds } from '../../../utils/audio';
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Laptop, 
  Server, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  HelpCircle,
  Activity,
  Flame,
  Zap,
  Info
} from 'lucide-react';

export default function TcpHandshakeAnimation() {
  const [firewallType, setFirewallType] = useState('stateful'); // 'stateful' or 'stateless'
  const [step, setStep] = useState(0); // 0: idle, 1: SYN, 2: SYN-ACK, 3: ACK, 4: Connected
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isSynFlood, setIsSynFlood] = useState(false);
  const [synFloodCount, setSynFloodCount] = useState(0);

  // State table entries for stateful mode
  const [stateTable, setStateTable] = useState([]);

  const resetHandshake = () => {
    sounds.playPop();
    setStep(0);
    setIsAutoPlaying(false);
    setIsSynFlood(false);
    setSynFloodCount(0);
    setStateTable([]);
  };

  const handleNextStep = () => {
    sounds.playPop();
    if (step < 4) {
      advanceStep(step + 1);
    }
  };

  const advanceStep = (nextStep) => {
    setStep(nextStep);

    if (nextStep === 1) {
      // Client sends SYN
      if (firewallType === 'stateful') {
        setStateTable([
          {
            id: 1,
            src: '192.168.1.15:51240',
            dst: '142.250.190.46:443',
            state: 'SYN_SENT',
            status: 'Tracking Outbound Request'
          }
        ]);
      }
    } else if (nextStep === 2) {
      // Server replies with SYN-ACK
      if (firewallType === 'stateless') {
        // Stateless drops it!
        sounds.playPop();
      } else {
        // Stateful updates state
        setStateTable([
          {
            id: 1,
            src: '192.168.1.15:51240',
            dst: '142.250.190.46:443',
            state: 'SYN_RECEIVED',
            status: 'Matched State Table (Allowed Inbound Reply!)'
          }
        ]);
      }
    } else if (nextStep === 3) {
      // Client sends ACK
      if (firewallType === 'stateful') {
        setStateTable([
          {
            id: 1,
            src: '192.168.1.15:51240',
            dst: '142.250.190.46:443',
            state: 'ESTABLISHED',
            status: 'Active Two-Way Session'
          }
        ]);
      }
    } else if (nextStep === 4) {
      sounds.playSuccess();
    }
  };

  // Auto play effect
  useEffect(() => {
    if (!isAutoPlaying) return;

    if (step < 4) {
      const timer = setTimeout(() => {
        if (step === 1 && firewallType === 'stateless') {
          // Stateless gets blocked at step 2
          advanceStep(2);
          setIsAutoPlaying(false);
        } else {
          advanceStep(step + 1);
        }
      }, 1400);
      return () => clearTimeout(timer);
    } else {
      setIsAutoPlaying(false);
    }
  }, [isAutoPlaying, step, firewallType]);

  // SYN Flood Demo Effect
  useEffect(() => {
    if (!isSynFlood) return;

    const interval = setInterval(() => {
      setSynFloodCount((prev) => {
        if (prev >= 20) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isSynFlood]);

  const toggleFirewallType = (type) => {
    sounds.playPop();
    setFirewallType(type);
    resetHandshake();
  };

  const triggerSynFlood = () => {
    sounds.playPop();
    resetHandshake();
    setIsSynFlood(true);
    setSynFloodCount(1);
  };

  return (
    <div class="space-y-8">
      
      {/* Top Banner: Educational Framing */}
      <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div class="relative z-10 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md">
            <Activity class="w-4 h-4 text-emerald-300" />
            <span>TCP 3-Way Handshake & Statefulness</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
            The Handshake Ping-Pong Court 🏓
          </h2>

          <p class="text-indigo-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Before any secure web data can flow over TCP, your laptop and the server must do a <strong>3-step handshake</strong> (<code>SYN</code> ➡️ <code>SYN-ACK</code> ➡️ <code>ACK</code>).
            See how a <strong>Stateful Firewall (Smart Guard)</strong> tracks the connection, while a <strong>Stateless Firewall (Amnesia Guard)</strong> forgets who you are!
          </p>

          {/* Toggle Buttons */}
          <div class="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => toggleFirewallType('stateful')}
              class={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
                firewallType === 'stateful'
                  ? 'bg-emerald-500 border-emerald-400 text-white shadow-md scale-105'
                  : 'bg-white/15 border-white/20 text-white hover:bg-white/25'
              }`}
            >
              <ShieldCheck class="w-4 h-4" />
              <span>Stateful Firewall (Smart Guard with Notebook) 🧠</span>
            </button>

            <button
              onClick={() => toggleFirewallType('stateless')}
              class={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 border-2 ${
                firewallType === 'stateless'
                  ? 'bg-rose-500 border-rose-400 text-white shadow-md scale-105'
                  : 'bg-white/15 border-white/20 text-white hover:bg-white/25'
              }`}
            >
              <ShieldAlert class="w-4 h-4" />
              <span>Stateless Firewall (Amnesia Guard) 😵‍💫</span>
            </button>
          </div>
        </div>
      </div>

      {/* Handshake Stage Arena */}
      <div class="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-slate-700 relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        
        {/* Arena Header Status */}
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span class="text-xs font-black text-amber-300">
              {firewallType === 'stateful' ? 'Mode: Stateful Inspection (Memory Table ON)' : 'Mode: Stateless Packet Filtering (No Memory)'}
            </span>
          </div>

          <div class="text-xs font-bold text-slate-300">
            {step === 0 && 'Click "Start Handshake" to send initial SYN packet'}
            {step === 1 && 'Packet 1: Client waves SYN ("Can we talk on Port 443?") ➡️'}
            {step === 2 && (firewallType === 'stateless' 
              ? '🚨 BLOCKED! Stateless guard dropped the return SYN-ACK (No memory of outbound SYN!)'
              : 'Packet 2: Server replies with SYN-ACK ("Yes, I hear you!") ⬅️')}
            {step === 3 && 'Packet 3: Client confirms with ACK ("Acknowledged! Connection Established!") ➡️'}
            {step === 4 && '🎉 TCP Connection ESTABLISHED! Secure encrypted web data is flowing!'}
          </div>

          <div class="text-xs font-mono bg-white/10 px-3 py-1 rounded-full text-slate-300">
            Step {step} of 3
          </div>
        </div>

        {/* The Animated Court */}
        <div class="relative py-12">
          
          {/* Connecting Wire */}
          <div class="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-2 bg-slate-800 rounded-full" />

          {/* Court Participants */}
          <div class="relative flex items-center justify-between z-10">
            
            {/* 1. Client Browser */}
            <div class="flex flex-col items-center text-center space-y-2">
              <div class={`w-18 h-18 sm:w-22 sm:h-22 rounded-3xl flex items-center justify-center transition-all border-3 ${
                step === 1 || step === 3 || step === 4
                  ? 'bg-indigo-600 border-indigo-400 scale-110 shadow-lg shadow-indigo-500/30'
                  : 'bg-slate-800 border-slate-600'
              }`}>
                <Laptop class="w-10 h-10 text-white" />
              </div>
              <div>
                <div class="font-black text-xs sm:text-sm text-white">Your Laptop</div>
                <div class="text-[11px] text-indigo-300 font-mono">192.168.1.15:51240</div>
              </div>
            </div>

            {/* 2. The Firewall Gate in the Middle */}
            <div class="flex flex-col items-center text-center space-y-2 relative">
              
              {/* Alert Speech Bubble */}
              {step === 2 && firewallType === 'stateless' && (
                <div class="absolute -top-20 px-3 py-1.5 bg-rose-600 text-white rounded-2xl text-xs font-black shadow-xl border-2 border-white animate-bounce whitespace-nowrap z-20">
                  🛑 BLOCKED! Who are you?! I don't remember you!
                </div>
              )}

              {step === 2 && firewallType === 'stateful' && (
                <div class="absolute -top-20 px-3 py-1.5 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-xl border-2 border-emerald-300 animate-bounce whitespace-nowrap z-20">
                  ✨ ALLOWED! Checked notebook: Laptop asked for this!
                </div>
              )}

              <div class={`w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center transition-all border-3 relative ${
                firewallType === 'stateful'
                  ? 'bg-gradient-to-br from-emerald-900 to-teal-900 border-emerald-400 shadow-xl shadow-emerald-500/20'
                  : 'bg-gradient-to-br from-rose-950 to-slate-900 border-rose-500 shadow-xl shadow-rose-500/20'
              }`}>
                <div class="text-center">
                  <span class="text-3xl sm:text-4xl">
                    {firewallType === 'stateful' ? '🛡️🧠' : '🚧😵‍💫'}
                  </span>
                </div>
              </div>

              <div>
                <div class="font-black text-xs sm:text-sm text-white">
                  {firewallType === 'stateful' ? 'Stateful Firewall' : 'Stateless Packet Filter'}
                </div>
                <div class="text-[10px] text-amber-300 font-bold">
                  {firewallType === 'stateful' ? 'Has State Table' : 'Amnesia (No Memory)'}
                </div>
              </div>
            </div>

            {/* 3. Destination Web Server */}
            <div class="flex flex-col items-center text-center space-y-2">
              <div class={`w-18 h-18 sm:w-22 sm:h-22 rounded-3xl flex items-center justify-center transition-all border-3 ${
                step === 2 || step === 4
                  ? 'bg-emerald-600 border-emerald-300 scale-110 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-800 border-slate-600'
              }`}>
                <Server class="w-10 h-10 text-white" />
              </div>
              <div>
                <div class="font-black text-xs sm:text-sm text-white">Google Web Server</div>
                <div class="text-[11px] text-emerald-300 font-mono">142.250.190.46:443</div>
              </div>
            </div>

          </div>

          {/* FLYING PACKET ANIMATION */}
          {step === 1 && (
            <div class="absolute top-1/2 left-[30%] -translate-y-1/2 -translate-x-1/2 bg-emerald-500 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce z-20">
              <span>👋 1. SYN (Hello!)</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </div>
          )}

          {step === 2 && firewallType === 'stateful' && (
            <div class="absolute top-1/2 left-[70%] -translate-y-1/2 -translate-x-1/2 bg-yellow-400 text-slate-900 px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce z-20">
              <ArrowRight class="w-3.5 h-3.5 rotate-180" />
              <span>🤝 2. SYN-ACK (Hello Back!)</span>
            </div>
          )}

          {step === 2 && firewallType === 'stateless' && (
            <div class="absolute top-1/2 left-[55%] -translate-y-1/2 -translate-x-1/2 bg-rose-600 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-ping z-20">
              <span>💥 2. SYN-ACK DROPPED AT GATE!</span>
            </div>
          )}

          {step === 3 && (
            <div class="absolute top-1/2 left-[50%] -translate-y-1/2 -translate-x-1/2 bg-blue-500 text-white px-3.5 py-1.5 rounded-2xl font-black text-xs shadow-xl border-2 border-white flex items-center gap-1.5 animate-bounce z-20">
              <span>👍 3. ACK (Connection Established!)</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </div>
          )}

        </div>

        {/* Handshake Step Indicator Bar */}
        <div class="grid grid-cols-3 gap-2 pt-4 border-t border-white/10 text-center text-xs">
          <div class={`p-2.5 rounded-xl border transition-all ${
            step >= 1 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-white/5 border-white/10 text-slate-500'
          }`}>
            <span class="font-black block">1. SYN (Synchronize)</span>
            <span class="text-[10px] opacity-80">Client initiates conversation</span>
          </div>

          <div class={`p-2.5 rounded-xl border transition-all ${
            step >= 2 && firewallType === 'stateful'
              ? 'bg-yellow-950/60 border-yellow-500 text-yellow-300'
              : step >= 2 && firewallType === 'stateless'
              ? 'bg-rose-950/60 border-rose-500 text-rose-300'
              : 'bg-white/5 border-white/10 text-slate-500'
          }`}>
            <span class="font-black block">2. SYN-ACK</span>
            <span class="text-[10px] opacity-80">
              {firewallType === 'stateless' && step >= 2 ? 'Dropped by Stateless Filter!' : 'Server acknowledges & requests sync'}
            </span>
          </div>

          <div class={`p-2.5 rounded-xl border transition-all ${
            step >= 3 ? 'bg-blue-950/60 border-blue-500 text-blue-300' : 'bg-white/5 border-white/10 text-slate-500'
          }`}>
            <span class="font-black block">3. ACK (Acknowledge)</span>
            <span class="text-[10px] opacity-80">Session marked as ESTABLISHED</span>
          </div>
        </div>

      </div>

      {/* Control Buttons */}
      <div class="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-2">
          <button
            onClick={handleNextStep}
            disabled={step >= 4 || (step === 2 && firewallType === 'stateless')}
            class="px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2"
          >
            <Play class="w-4 h-4 fill-white" />
            <span>{step === 0 ? 'Start Step 1: SYN 👋' : step === 1 ? 'Step 2: Server SYN-ACK 🤝' : step === 2 ? 'Step 3: Client ACK 👍' : 'Handshake Finished!'}</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setIsAutoPlaying(true); setStep(0); advanceStep(1); }}
            disabled={isAutoPlaying || step >= 4}
            class="px-4 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold text-xs sm:text-sm rounded-2xl border-2 border-indigo-200 transition-all active:scale-95 disabled:opacity-50"
          >
            <span>Auto Play ⚡</span>
          </button>

          <button
            onClick={resetHandshake}
            class="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all active:scale-95"
            title="Reset Handshake"
          >
            <RotateCcw class="w-5 h-5" />
          </button>
        </div>

        {/* Bonus Attack Simulator */}
        <button
          onClick={triggerSynFlood}
          class="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border-2 border-rose-300 rounded-2xl font-extrabold text-xs transition-all active:scale-95 flex items-center gap-2"
        >
          <Flame class="w-4 h-4 text-rose-600" />
          <span>Simulate SYN Flood DoS Attack 🥷</span>
        </button>
      </div>

      {/* SYN FLOOD ATTACK DEMO MODAL/BANNER */}
      {isSynFlood && (
        <div class="bg-rose-50 border-3 border-rose-400 rounded-3xl p-6 shadow-md space-y-4 animate-scaleUp">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3 text-rose-900">
              <Flame class="w-7 h-7 text-rose-600 animate-pulse" />
              <div>
                <h3 class="font-black text-lg">CompTIA Attack Demo: TCP SYN Flood Attack!</h3>
                <p class="text-xs text-rose-700 font-medium">
                  Attackers send thousands of initial <code>SYN</code> packets with fake spoofed IP addresses and never send the final <code>ACK</code>!
                </p>
              </div>
            </div>

            <span class="px-3 py-1 bg-rose-600 text-white font-black text-xs rounded-full">
              Half-Open SYNs: {synFloodCount * 500}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-rose-950">
            <div class="bg-white p-3.5 rounded-2xl border border-rose-200 space-y-1">
              <div class="font-black text-rose-800">Why It Crashes Servers:</div>
              <p>The server allocates memory in its connection backlog table waiting for the 3rd packet (ACK). When memory fills up, legitimate users get denied!</p>
            </div>

            <div class="bg-white p-3.5 rounded-2xl border border-rose-200 space-y-1">
              <div class="font-black text-emerald-800">CompTIA Sec+ Defense:</div>
              <p>Deploy <strong>SYN Cookies</strong> (encodes state in sequence numbers without memory allocation) and configure <strong>Firewall SYN Flood Rate Limiting</strong>!</p>
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC STATE TABLE VIEW */}
      {firewallType === 'stateful' && (
        <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <Activity class="w-5 h-5 text-emerald-600" />
              <h3 class="font-black text-slate-900 text-base">
                Live Stateful Inspection Table (The Smart Guard's Notebook)
              </h3>
            </div>
            <span class="text-xs font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">
              {stateTable.length} Active Sessions
            </span>
          </div>

          <p class="text-xs text-slate-500 font-medium">
            This internal memory table allows return packets through automatically without opening risky inbound firewall ports!
          </p>

          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-slate-50 text-slate-600 uppercase font-black text-[10px] border-b border-slate-200">
                <tr>
                  <th class="p-3">Source Socket</th>
                  <th class="p-3">Destination Socket</th>
                  <th class="p-3">TCP State</th>
                  <th class="p-3">Firewall Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 font-mono">
                {stateTable.length > 0 ? (
                  stateTable.map((row) => (
                    <tr key={row.id} class="bg-emerald-50/40 text-emerald-950 font-bold">
                      <td class="p-3">{row.src}</td>
                      <td class="p-3">{row.dst}</td>
                      <td class="p-3">
                        <span class="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-md text-[10px] font-black">
                          {row.state}
                        </span>
                      </td>
                      <td class="p-3 font-sans text-xs text-emerald-800 font-extrabold">{row.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" class="p-4 text-center text-slate-400 font-sans italic">
                      No active sessions in State Table. Start the handshake above to watch entries appear!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CompTIA Exam Cheat Sheet Callout */}
      <div class="bg-indigo-50 border-3 border-indigo-200 rounded-3xl p-6 shadow-sm space-y-2 text-indigo-950">
        <div class="flex items-center gap-2 font-black text-base text-indigo-900">
          <Sparkles class="w-5 h-5 text-indigo-600" />
          <span>CompTIA Security+ Exam Rule: Stateful vs Stateless</span>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium leading-relaxed pt-1">
          <div class="bg-white p-3.5 rounded-2xl border border-indigo-100">
            <strong class="text-rose-700 block mb-1">Stateless (Packet Filtering):</strong>
            Inspects each packet in isolation (Source IP, Dest IP, Port). It has NO memory. To allow web browsing, you must manually create an OUTBOUND permit rule AND an INBOUND reply permit rule.
          </div>
          <div class="bg-white p-3.5 rounded-2xl border border-indigo-100">
            <strong class="text-emerald-700 block mb-1">Stateful Inspection:</strong>
            Understands connection context. It records outgoing requests in a State Table. When the server replies with <code>SYN-ACK</code> / <code>ACK</code> (Established), the firewall automatically permits it!
          </div>
        </div>
      </div>

    </div>
  );
}
