import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Laptop, 
  Server, 
  AlertTriangle, 
  Globe, 
  Radio, 
  Activity, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  Flame,
  Search,
  CheckCircle,
  Eye
} from 'lucide-react';
import { sounds } from '../../../utils/audio';
import { SPRINT_4_STAGES } from './wiresharkSprintData';

export default function WiresharkSprint4Attacks({ onSprintComplete }) {
  const [activeSubSprint, setActiveSubSprint] = useState('4.1'); // '4.1', '4.2', '4.3'

  // Sub-Sprint 4.1 State (ARP Poisoning / MITM)
  const [isArpPoisonActive, setIsArpPoisonActive] = useState(false);
  const [arpTrafficInFlight, setArpTrafficInFlight] = useState(false);
  const [arpVerified, setArpVerified] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);

  // Sub-Sprint 4.2 State (DoS / SYN Flood)
  const [isSynFloodActive, setIsSynFloodActive] = useState(false);
  const [floodPackets, setFloodPackets] = useState(5);
  const [synFloodVerified, setSynFloodVerified] = useState(false);

  // Sub-Sprint 4.3 State (DNS Spoofing / Cache Poisoning)
  const [isDnsQuerySent, setIsDnsQuerySent] = useState(false);
  const [attackerWonRace, setAttackerWonRace] = useState(false);
  const [dnsVerified, setDnsVerified] = useState(false);

  const copyToClipboard = (text, id) => {
    try {
      sounds.playPop();
      navigator.clipboard.writeText(text);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch (e) {
      console.log('Copy error:', e);
    }
  };

  // 4.1 Trigger Gratuitous ARP Poisoning
  const handleLaunchArpPoison = () => {
    sounds.playAlert();
    setIsArpPoisonActive(true);
    setArpTrafficInFlight(false);

    // Victim transmits packet towards "Gateway"
    setTimeout(() => {
      setArpTrafficInFlight(true);
      sounds.playPop();
    }, 800);

    setTimeout(() => {
      setArpVerified(true);
      sounds.playSuccess();
    }, 1800);
  };

  const handleResetArp = () => {
    sounds.playPop();
    setIsArpPoisonActive(false);
    setArpTrafficInFlight(false);
  };

  // 4.2 Trigger SYN Flood Tsunami
  const handleToggleSynFlood = () => {
    if (isSynFloodActive) {
      sounds.playPop();
      setIsSynFloodActive(false);
      setFloodPackets(5);
    } else {
      sounds.playAlert();
      setIsSynFloodActive(true);
      setSynFloodVerified(true);
    }
  };

  // Animate packet counter when flood is active
  useEffect(() => {
    let interval;
    if (isSynFloodActive) {
      interval = setInterval(() => {
        setFloodPackets(prev => Math.min(5000, prev + Math.floor(Math.random() * 350 + 150)));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isSynFloodActive]);

  // 4.3 Trigger DNS Race
  const handleSendDnsQuery = () => {
    sounds.playPop();
    setIsDnsQuerySent(true);
    setAttackerWonRace(false);

    // Attacker injects forged response faster than real server
    setTimeout(() => {
      setAttackerWonRace(true);
      sounds.playAlert();
    }, 600);

    setTimeout(() => {
      setDnsVerified(true);
      sounds.playSuccess();
    }, 1600);
  };

  const handleResetDns = () => {
    sounds.playPop();
    setIsDnsQuerySent(false);
    setAttackerWonRace(false);
  };

  const isAllSprint4Done = arpVerified && synFloodVerified && dnsVerified;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SPRINT SUB-NAVIGATION TABS */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('4.1'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '4.1'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200 scale-102'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <ShieldAlert className="w-4 h-4" />
            <span>4.1 ARP Poisoning (MITM)</span>
            {arpVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white/20" />}
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('4.2'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '4.2'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-102'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>4.2 DoS SYN Flood (I/O Graph)</span>
            {synFloodVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white/20" />}
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('4.3'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '4.3'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-200 scale-102'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>4.3 DNS Spoofing (Cache Poisoning)</span>
            {dnsVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white/20" />}
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600">
          <span>Sprint 4 Goal:</span>
          <span className="text-slate-900 font-extrabold">CompTIA Security+ Attack Pattern Triage</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-SPRINT 4.1: THE IDENTITY THIEF (ARP POISONING / MITM) */}
      {/* ========================================================================= */}
      {activeSubSprint === '4.1' && (
        <div className="space-y-6">
          
          {/* Sub-Sprint Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-rose-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-rose-100 text-rose-950 font-black text-xs rounded-full border border-rose-300">
                {SPRINT_4_STAGES.arpPoisoning.concept}
              </span>
              <span className="text-xs font-bold text-slate-500">
                CompTIA Security+ Domain 2.1 (On-Path Attacks)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {SPRINT_4_STAGES.arpPoisoning.title}
            </h3>

            {/* ELI5 Visual Metaphor */}
            <div className="bg-rose-50/80 rounded-2xl p-4 border border-rose-200 flex items-start gap-3 text-rose-950">
              <span className="text-2xl sm:text-3xl">🎭📬</span>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-rose-700 block">
                  ELI5 Metaphor: The Fake Mailman
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {SPRINT_4_STAGES.arpPoisoning.eli5Summary}
                </p>
              </div>
            </div>

            {/* Why CompTIA Cares */}
            <div className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900">CompTIA Exam Focus: </strong>
              {SPRINT_4_STAGES.arpPoisoning.whyCompTia}
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_4_STAGES.arpPoisoning.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_4_STAGES.arpPoisoning.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: ARP POISONING & LAYER 2 REDIRECTION */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border-3 border-rose-500 shadow-xl space-y-6 overflow-hidden relative">
            
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Live Wire Animation: Gratuitous ARP Redirection
                </span>
                <h4 className="text-lg font-black text-white">
                  Watch the Attacker Hijack the Default Gateway MAC
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLaunchArpPoison}
                  disabled={isArpPoisonActive}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-900/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isArpPoisonActive ? 'Poison Injected!' : 'Inject Gratuitous ARP 💉'}</span>
                </button>

                <button
                  onClick={handleResetArp}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs transition-all active:scale-95 cursor-pointer"
                  title="Reset Network"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Network Topology Arena */}
            <div className="relative py-14 px-4 bg-slate-900/90 rounded-2xl border border-slate-800 min-h-[300px] flex flex-col justify-between">
              
              {/* Top Row: Victim Host & Real Gateway */}
              <div className="flex items-center justify-between relative z-10">
                
                {/* Victim Host */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-sky-950 border-2 border-sky-400 flex items-center justify-center text-white shadow-lg">
                    <Laptop className="w-8 h-8 text-sky-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Victim Host</span>
                    <span className="text-[10px] font-mono text-sky-400">192.168.1.50</span>
                    <div className="mt-1 p-1 rounded-lg bg-slate-800 border border-slate-700 text-[9px] font-mono text-slate-300">
                      <div>Gateway MAC Table:</div>
                      <div className={isArpPoisonActive ? 'text-rose-400 font-black animate-pulse' : 'text-emerald-400'}>
                        {isArpPoisonActive ? '00:0c:29:66:66:66 (Poisoned!)' : '00:50:56:11:11:11 (Real)'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Real Gateway Router */}
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center text-white shadow-lg transition-all ${
                    isArpPoisonActive ? 'bg-slate-900 border-slate-700 opacity-50' : 'bg-emerald-950 border-emerald-400'
                  }`}>
                    <Server className="w-8 h-8 text-emerald-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Real Gateway</span>
                    <span className="text-[10px] font-mono text-emerald-400">192.168.1.1</span>
                    <span className="text-[9px] font-mono text-slate-500 block">MAC: 00:50:56:11:11:11</span>
                  </div>
                </div>

              </div>

              {/* Bottom Row: The Attacker Kali VM */}
              <div className="flex justify-center relative z-10 pt-6">
                <div className="flex flex-col items-center space-y-2">
                  <div className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center shadow-lg transition-all ${
                    isArpPoisonActive ? 'bg-rose-950 border-rose-500 ring-4 ring-rose-500/40 scale-110' : 'bg-slate-900 border-slate-700'
                  }`}>
                    <span className="text-3xl">🦹‍♂️</span>
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-rose-300 block">Attacker (Kali MITM)</span>
                    <span className="text-[10px] font-mono text-rose-400">192.168.1.200</span>
                    <span className="text-[9px] font-mono text-slate-400 block">MAC: 00:0c:29:66:66:66</span>
                  </div>
                </div>
              </div>

              {/* TRAFFIC REDIRECTION IN FLIGHT */}
              {arpTrafficInFlight && (
                <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                  <div className="p-2.5 rounded-xl bg-rose-600 text-white font-mono text-[10px] font-black shadow-2xl animate-bounce border-2 border-white flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-300" />
                    <span>Packet Hijacked ➡️ Routed straight through Attacker!</span>
                  </div>
                </div>
              )}

            </div>

            {/* Authentic Wireshark Expert Info Warning */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black uppercase text-rose-400 tracking-wider block">
                Wireshark Expert Info Triage: Detecting Duplicate MAC Mappings
              </span>

              <div className="bg-slate-900 rounded-2xl p-4 border border-rose-500/40 font-mono text-xs space-y-2">
                <div className="text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="font-sans font-black">Warning [Sequence/Address conflict]: Duplicate IP address detected!</span>
                </div>

                <div className="text-slate-300 text-[11px] leading-relaxed">
                  Wireshark detected that <strong className="text-rose-400">192.168.1.1</strong> is claimed by two physical MAC addresses:
                  <div className="mt-1 space-y-0.5 text-slate-400 pl-4 border-l-2 border-rose-500">
                    <div>Legitimate Gateway: <code>00:50:56:11:11:11</code></div>
                    <div className="text-rose-300 font-bold">Rogue Claim: <code>00:0c:29:66:66:66</code> (Gratuitous ARP Reply)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* CompTIA Defense Card: Dynamic ARP Inspection (DAI) */}
            <div className="bg-emerald-950/40 rounded-2xl p-4 border border-emerald-600/50 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider block">
                  CompTIA Security+ Defense: {SPRINT_4_STAGES.arpPoisoning.defense.name}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {SPRINT_4_STAGES.arpPoisoning.defense.howItWorks}
                </p>
              </div>
            </div>

          </div>

          {/* Copyable VM Commands for Practice */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-rose-600" />
              <span>Reproduce in Your Linux Sandbox (Hands-On Lab)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPRINT_4_STAGES.arpPoisoning.commands.map((cmd) => (
                <div key={cmd.step} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 font-medium">
                      <span>Step {cmd.step}: {cmd.desc}</span>
                    </div>
                    <code className="text-xs font-mono text-emerald-400 block pt-2 break-all">
                      {cmd.cmd}
                    </code>
                  </div>

                  <button
                    onClick={() => copyToClipboard(cmd.cmd, `sub41-${cmd.step}`)}
                    className="mt-3 w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700"
                  >
                    {copiedCmd === `sub41-${cmd.step}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Linux Command</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Sprint 4.1 Verification Checklist */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <span>Sub-Sprint 4.1 Verification Checklist</span>
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={arpVerified}
                    onChange={() => setArpVerified(true)}
                    className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                  />
                  <span className="font-medium">Identified how Gratuitous ARP poisons the victim's Layer 2 MAC table</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={arpVerified}
                    onChange={() => setArpVerified(true)}
                    className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                  />
                  <span className="font-medium">Mastered Dynamic ARP Inspection (DAI) and DHCP Snooping mitigation</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">4.1 Status:</span>
              {arpVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-black">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                </span>
              ) : (
                <span className="text-amber-600">Inject Gratuitous ARP above to verify</span>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SPRINT 4.2: THE TSUNAMI ON THE WIRE (DOS SYN FLOOD & I/O GRAPH) */}
      {/* ========================================================================= */}
      {activeSubSprint === '4.2' && (
        <div className="space-y-6">
          
          {/* Sub-Sprint Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-purple-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-purple-100 text-purple-950 font-black text-xs rounded-full border border-purple-300">
                {SPRINT_4_STAGES.dosSynFlood.concept}
              </span>
              <span className="text-xs font-bold text-slate-500">
                CompTIA Security+ Domain 2.1 (Denial of Service)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {SPRINT_4_STAGES.dosSynFlood.title}
            </h3>

            {/* ELI5 Visual Metaphor */}
            <div className="bg-purple-50/80 rounded-2xl p-4 border border-purple-200 flex items-start gap-3 text-purple-950">
              <span className="text-2xl sm:text-3xl">🌊🍕</span>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-purple-700 block">
                  ELI5 Metaphor: The Fake Pizza Orders (Half-Open Exhaustion)
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {SPRINT_4_STAGES.dosSynFlood.eli5Summary}
                </p>
              </div>
            </div>

            {/* Why CompTIA Cares */}
            <div className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900">CompTIA Exam Focus: </strong>
              {SPRINT_4_STAGES.dosSynFlood.whyCompTia}
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_4_STAGES.dosSynFlood.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_4_STAGES.dosSynFlood.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: WIRETAP TSUNAMI & REAL-TIME I/O GRAPH */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border-3 border-purple-500 shadow-xl space-y-6 overflow-hidden relative">
            
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-black uppercase text-purple-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
                  Live Wire Animation: SYN Flood Socket Exhaustion
                </span>
                <h4 className="text-lg font-black text-white">
                  Watch Packet Volume Explode on Wireshark's I/O Graph
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleSynFlood}
                  className={`px-4 py-2 rounded-xl text-white font-black text-xs shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer ${
                    isSynFloodActive ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/50' : 'bg-purple-600 hover:bg-purple-500 shadow-purple-900/50'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>{isSynFloodActive ? 'Halt Attack ⏹️' : 'Unleash SYN Flood Tsunami 🌊'}</span>
                </button>
              </div>
            </div>

            {/* Real-time I/O Graph Monitor */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="font-bold text-white">Wireshark ➡️ Statistics ➡️ I/O Graph</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-slate-400">Current Rate:</span>
                  <span className={`px-2.5 py-0.5 rounded-full font-black ${
                    isSynFloodActive ? 'bg-rose-900/80 text-rose-300 border border-rose-500 text-sm animate-pulse' : 'bg-slate-800 text-emerald-400'
                  }`}>
                    {floodPackets.toLocaleString()} pkts / sec
                  </span>
                </div>
              </div>

              {/* Dynamic Bar Chart Visualization */}
              <div className="h-40 bg-slate-950 rounded-xl p-4 flex items-end justify-between gap-1.5 border border-slate-800/80 overflow-hidden relative">
                
                {/* Attack Warning Watermark */}
                {isSynFloodActive && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-3xl sm:text-5xl font-black text-rose-500/10 uppercase tracking-widest animate-pulse">
                      DoS Attack in Progress
                    </span>
                  </div>
                )}

                {/* 16 Bars representing time intervals */}
                {[...Array(16)].map((_, i) => {
                  const isRecent = i >= 10;
                  const heightPercent = isSynFloodActive && isRecent ? Math.min(100, Math.floor(Math.random() * 30 + 70)) : 10;

                  return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                      <div 
                        className={`w-full rounded-t-md transition-all duration-300 ${
                          heightPercent > 50
                            ? 'bg-gradient-to-t from-purple-600 via-rose-500 to-amber-400 shadow-lg shadow-rose-500/50'
                            : 'bg-slate-800'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                      <span className="text-[9px] font-mono text-slate-600">{i}s</span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span>Filter: <code>tcp.flags.syn == 1 and tcp.flags.ack == 0</code></span>
                <span>Normal: 5 pkts/s | Flood: &gt;4,000 pkts/s</span>
              </div>
            </div>

            {/* CompTIA Defense Card: SYN Cookies */}
            <div className="bg-emerald-950/40 rounded-2xl p-4 border border-emerald-600/50 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider block">
                  CompTIA Security+ Defense: {SPRINT_4_STAGES.dosSynFlood.defense.name}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {SPRINT_4_STAGES.dosSynFlood.defense.howItWorks}
                </p>
              </div>
            </div>

          </div>

          {/* Copyable VM Commands for Practice */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-purple-600" />
              <span>Reproduce in Your Linux Sandbox (Hands-On Lab)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPRINT_4_STAGES.dosSynFlood.commands.map((cmd) => (
                <div key={cmd.step} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 font-medium">
                      <span>Step {cmd.step}: {cmd.desc}</span>
                    </div>
                    <code className="text-xs font-mono text-emerald-400 block pt-2 break-all">
                      {cmd.cmd}
                    </code>
                  </div>

                  <button
                    onClick={() => copyToClipboard(cmd.cmd, `sub42-${cmd.step}`)}
                    className="mt-3 w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700"
                  >
                    {copiedCmd === `sub42-${cmd.step}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Linux Command</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Sprint 4.2 Verification Checklist */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Sub-Sprint 4.2 Verification Checklist</span>
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={synFloodVerified}
                    onChange={() => setSynFloodVerified(true)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  <span className="font-medium">Observed SYN flood traffic spike in Wireshark I/O Graph</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={synFloodVerified}
                    onChange={() => setSynFloodVerified(true)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  <span className="font-medium">Understood how SYN Cookies prevent socket queue exhaustion</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">4.2 Status:</span>
              {synFloodVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-black">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                </span>
              ) : (
                <span className="text-amber-600">Trigger SYN flood above to verify</span>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SPRINT 4.3: THE FAKE GPS (DNS CACHE POISONING / SPOOFING) */}
      {/* ========================================================================= */}
      {activeSubSprint === '4.3' && (
        <div className="space-y-6">
          
          {/* Sub-Sprint Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-950 font-black text-xs rounded-full border border-amber-300">
                {SPRINT_4_STAGES.dnsPoisoning.concept}
              </span>
              <span className="text-xs font-bold text-slate-500">
                CompTIA Security+ Domain 2.1 & 3.2 (DNS Security)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {SPRINT_4_STAGES.dnsPoisoning.title}
            </h3>

            {/* ELI5 Visual Metaphor */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-amber-950">
              <span className="text-2xl sm:text-3xl">🧭🦹</span>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 block">
                  ELI5 Metaphor: The Fake Street Sign
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {SPRINT_4_STAGES.dnsPoisoning.eli5Summary}
                </p>
              </div>
            </div>

            {/* Why CompTIA Cares */}
            <div className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900">CompTIA Exam Focus: </strong>
              {SPRINT_4_STAGES.dnsPoisoning.whyCompTia}
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_4_STAGES.dnsPoisoning.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_4_STAGES.dnsPoisoning.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: DNS RESPONSE RACE */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border-3 border-amber-500 shadow-xl space-y-6 overflow-hidden relative">
            
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Live Wire Animation: DNS Race Condition & Forged Answer
                </span>
                <h4 className="text-lg font-black text-white">
                  Watch the Rogue Resolver Beat the Authoritative Nameserver
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendDnsQuery}
                  disabled={isDnsQuerySent}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs shadow-lg shadow-amber-900/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isDnsQuerySent ? 'Resolving...' : 'Send DNS Query (mybank.com) 🔎'}</span>
                </button>

                <button
                  onClick={handleResetDns}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs transition-all active:scale-95 cursor-pointer"
                  title="Reset DNS"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Race Arena */}
            <div className="relative py-14 px-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-8">
              
              <div className="flex items-center justify-between relative z-10">
                
                {/* User PC */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-sky-950 border-2 border-sky-400 flex items-center justify-center text-white shadow-lg">
                    <Laptop className="w-8 h-8 text-sky-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Client Host</span>
                    <span className="text-[10px] font-mono text-sky-400">Query ID: 0x4f2a</span>
                  </div>
                </div>

                {/* Center Wire Track */}
                <div className="flex-1 mx-6 flex flex-col items-center justify-center space-y-2">
                  {isDnsQuerySent && !attackerWonRace && (
                    <div className="p-2 rounded-xl bg-amber-500 text-slate-950 font-mono text-[10px] font-black animate-pulse">
                      🔎 "Where is mybank.com?" (ID: 0x4f2a) ➡️
                    </div>
                  )}

                  {attackerWonRace && (
                    <div className="p-2.5 rounded-xl bg-rose-600 text-white font-mono text-[10px] font-black animate-bounce shadow-xl flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-300" />
                      <span>Forged Answer Won! ➡️ 203.0.113.66 (Phishing Clone)</span>
                    </div>
                  )}
                </div>

                {/* Authoritative Server vs Attacker */}
                <div className="flex flex-col gap-4">
                  {/* Real Server */}
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-900 border border-slate-800">
                    <Server className="w-6 h-6 text-emerald-400" />
                    <div className="text-left text-[10px]">
                      <span className="font-bold text-white block">Real Auth DNS</span>
                      <span className="text-slate-400">198.51.100.25 (Too late! 🐢)</span>
                    </div>
                  </div>

                  {/* Rogue Forger */}
                  <div className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                    attackerWonRace ? 'bg-rose-950 border-rose-500 ring-2 ring-rose-400 scale-105' : 'bg-slate-900 border-slate-800'
                  }`}>
                    <span className="text-xl">🦹‍♂️</span>
                    <div className="text-left text-[10px]">
                      <span className="font-bold text-rose-300 block">Rogue DNS Forger</span>
                      <span className="text-rose-400">Spoofed 203.0.113.66 (Fast! ⚡)</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* CompTIA Defense Card: DNSSEC */}
            <div className="bg-emerald-950/40 rounded-2xl p-4 border border-emerald-600/50 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="text-xs font-black text-emerald-300 uppercase tracking-wider block">
                  CompTIA Security+ Defense: {SPRINT_4_STAGES.dnsPoisoning.defense.name}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {SPRINT_4_STAGES.dnsPoisoning.defense.howItWorks}
                </p>
              </div>
            </div>

          </div>

          {/* Copyable VM Commands for Practice */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-600" />
              <span>Reproduce in Your Linux Sandbox (Hands-On Lab)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPRINT_4_STAGES.dnsPoisoning.commands.map((cmd) => (
                <div key={cmd.step} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800 font-medium">
                      <span>Step {cmd.step}: {cmd.desc}</span>
                    </div>
                    <code className="text-xs font-mono text-emerald-400 block pt-2 break-all">
                      {cmd.cmd}
                    </code>
                  </div>

                  <button
                    onClick={() => copyToClipboard(cmd.cmd, `sub43-${cmd.step}`)}
                    className="mt-3 w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700"
                  >
                    {copiedCmd === `sub43-${cmd.step}` ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Linux Command</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Sprint 4.3 Verification Checklist */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Sub-Sprint 4.3 Verification Checklist</span>
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dnsVerified}
                    onChange={() => setDnsVerified(true)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span className="font-medium">Observed forged DNS reply beating the legitimate nameserver response</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dnsVerified}
                    onChange={() => setDnsVerified(true)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span className="font-medium">Understood how DNSSEC cryptographic signatures invalidate forged A records</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">4.3 Status:</span>
              {dnsVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-black">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                </span>
              ) : (
                <span className="text-amber-600">Send DNS query above to verify</span>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SPRINT 4 COMPLETION CELEBRATION CARD */}
      {/* ========================================================================= */}
      {isAllSprint4Done && (
        <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏆🛡️</span>
              <div>
                <span className="text-xs font-black uppercase text-rose-200 tracking-wider">
                  Sprint 4 Verified • Attack Triage Mastered!
                </span>
                <h3 className="text-2xl font-black">
                  You Have Mastered ARP Poisoning, SYN Floods & DNS Spoofing Triage!
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md font-black text-xs text-white border border-white/30">
              Attack Triage: ELITE ANALYST
            </div>
          </div>

          <p className="text-purple-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
            You now possess the hands-on forensic ability to spot <strong>duplicate MAC addresses in Gratuitous ARPs</strong>, diagnose <strong>SYN flood volumetric tsunamis with I/O graphs</strong>, and intercept <strong>forged DNS responses</strong> while applying industry-standard mitigations (DAI, SYN Cookies, DNSSEC).
          </p>

          <div className="pt-2 flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Ready for Final Milestone: Sprint 5 (Capstone Challenge: Mystery Incident PCAP Triage)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
