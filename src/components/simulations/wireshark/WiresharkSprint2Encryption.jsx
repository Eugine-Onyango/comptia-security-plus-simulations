import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  Terminal, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Eye, 
  EyeOff, 
  Key, 
  FileText, 
  ArrowRight, 
  ArrowLeft,
  RotateCcw,
  Play,
  Square,
  AlertTriangle,
  Radio,
  Server,
  Laptop,
  CheckCircle
} from 'lucide-react';
import { sounds } from '../../../utils/audio';
import { SPRINT_2_STAGES } from './wiresharkSprintData';

export default function WiresharkSprint2Encryption({ onSprintComplete }) {
  const [activeSubSprint, setActiveSubSprint] = useState('2.1'); // '2.1' or '2.2'

  // Sub-Sprint 2.1 State (Leaky Postcard / Plaintext HTTP)
  const [isPostcardInFlight, setIsPostcardInFlight] = useState(false);
  const [eavesdropperIntercepted, setEavesdropperIntercepted] = useState(false);
  const [streamTab, setStreamTab] = useState('all'); // 'all', 'client', 'server'
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [postcardVerified, setPostcardVerified] = useState(false);

  // Sub-Sprint 2.2 State (Locked Armor Box / TLS 1.3)
  const [isArmorBoxInFlight, setIsArmorBoxInFlight] = useState(false);
  const [handshakeStep, setHandshakeStep] = useState(0); // 0 to 4
  const [tlsAttackBlocked, setTlsAttackBlocked] = useState(false);
  const [lockedBoxVerified, setLockedBoxVerified] = useState(false);

  // Interactive Protocol Upgrade Matcher State
  const [userMatches, setUserMatches] = useState({}); // { 'HTTP': 'HTTPS', ... }
  const [selectedInsecure, setSelectedInsecure] = useState(null);
  const [matcherComplete, setMatcherComplete] = useState(false);

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

  // 2.1 Trigger Leaky Postcard
  const handleSendPostcard = () => {
    sounds.playPop();
    setIsPostcardInFlight(true);
    setEavesdropperIntercepted(false);

    // Eavesdropper snatches credential halfway
    setTimeout(() => {
      setEavesdropperIntercepted(true);
      sounds.playAlert();
    }, 700);

    // Delivery completes
    setTimeout(() => {
      setIsPostcardInFlight(false);
      setPostcardVerified(true);
      sounds.playSuccess();
    }, 1500);
  };

  // 2.2 Trigger TLS Armor Box Flight
  const handleSendArmorBox = () => {
    sounds.playPop();
    setIsArmorBoxInFlight(true);
    setTlsAttackBlocked(false);

    // Step through handshake
    setHandshakeStep(1);
    setTimeout(() => setHandshakeStep(2), 400);
    setTimeout(() => setHandshakeStep(3), 800);
    setTimeout(() => {
      setHandshakeStep(4);
      setTlsAttackBlocked(true);
      sounds.playSuccess();
    }, 1200);

    setTimeout(() => {
      setIsArmorBoxInFlight(false);
      setLockedBoxVerified(true);
    }, 1800);
  };

  // Matcher Click
  const handleSelectInsecure = (insecure) => {
    sounds.playPop();
    setSelectedInsecure(insecure);
  };

  const handleSelectSecure = (secure) => {
    if (!selectedInsecure) return;
    sounds.playPop();
    const newMatches = { ...userMatches, [selectedInsecure.insecureName]: secure.secureName };
    setUserMatches(newMatches);
    setSelectedInsecure(null);

    // Check if all matched correctly
    const allCorrect = SPRINT_2_STAGES.protocolUpgrades.every(
      p => newMatches[p.insecureName] === p.secureName
    );
    if (allCorrect && Object.keys(newMatches).length === SPRINT_2_STAGES.protocolUpgrades.length) {
      setMatcherComplete(true);
      sounds.playSuccess();
    }
  };

  const handleResetMatcher = () => {
    sounds.playPop();
    setUserMatches({});
    setSelectedInsecure(null);
    setMatcherComplete(false);
  };

  const isAllSprint2Done = postcardVerified && lockedBoxVerified && matcherComplete;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SPRINT SUB-NAVIGATION TABS */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('2.1'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '2.1'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200 scale-102'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Unlock className="w-4 h-4" />
            <span>2.1 The Leaky Postcard (Plaintext HTTP)</span>
            {postcardVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white/20" />}
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('2.2'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '2.2'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-102'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span>2.2 The Locked Armor Box (TLS 1.3)</span>
            {lockedBoxVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white/20" />}
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600">
          <span>Sprint 2 Goal:</span>
          <span className="text-slate-900 font-extrabold">Confidentiality Pillar & Protocol Upgrades</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-SPRINT 2.1: THE LEAKY POSTCARD (PLAINTEXT HTTP) */}
      {/* ========================================================================= */}
      {activeSubSprint === '2.1' && (
        <div className="space-y-6">
          
          {/* Sub-Sprint Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-rose-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-rose-100 text-rose-950 font-black text-xs rounded-full border border-rose-300">
                {SPRINT_2_STAGES.leakyPostcard.concept}
              </span>
              <span className="text-xs font-bold text-slate-500">
                CompTIA Security+ Domain 1.2 & 2.1
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {SPRINT_2_STAGES.leakyPostcard.title}
            </h3>

            {/* ELI5 Visual Metaphor */}
            <div className="bg-rose-50/80 rounded-2xl p-4 border border-rose-200 flex items-start gap-3 text-rose-950">
              <span className="text-2xl sm:text-3xl">✉️🔓</span>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-rose-700 block">
                  ELI5 Metaphor: The Clear Postcard
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {SPRINT_2_STAGES.leakyPostcard.eli5Summary}
                </p>
              </div>
            </div>

            {/* Why CompTIA Cares */}
            <div className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900">CompTIA Exam Focus: </strong>
              {SPRINT_2_STAGES.leakyPostcard.whyCompTia}
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_2_STAGES.leakyPostcard.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_2_STAGES.leakyPostcard.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: THE LEAKY POSTCARD COURIER & EAVESDROPPER */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border-3 border-rose-500 shadow-xl space-y-6 overflow-hidden relative">
            
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                  Live Wire Animation: Plaintext HTTP Transmission
                </span>
                <h4 className="text-lg font-black text-white">
                  Watch Credentials Fly Exposed Across the Wire
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendPostcard}
                  disabled={isPostcardInFlight}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shadow-lg shadow-rose-900/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isPostcardInFlight ? 'Transmitting...' : 'Transmit HTTP POST'}</span>
                </button>

                <button
                  onClick={() => { sounds.playPop(); setEavesdropperIntercepted(false); setIsPostcardInFlight(false); }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs transition-all active:scale-95 cursor-pointer"
                  title="Reset Animation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Transmission Highway Diagram */}
            <div className="relative py-12 px-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              
              {/* Central Cable Line */}
              <div className="absolute top-1/2 left-12 right-12 -translate-y-1/2 h-1.5 bg-slate-800 rounded-full">
                <div className="w-full h-full bg-gradient-to-r from-rose-500/30 via-rose-500/50 to-rose-500/30 animate-pulse" />
              </div>

              <div className="relative flex items-center justify-between z-10">
                
                {/* Client Host */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-sky-950 border-2 border-sky-400 flex items-center justify-center text-white shadow-lg shadow-sky-950">
                    <Laptop className="w-7 h-7 text-sky-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Client VM</span>
                    <span className="text-[10px] font-mono text-sky-400">192.168.1.105</span>
                  </div>
                </div>

                {/* Eavesdropper Rogue Sniffer on the Cable */}
                <div className="flex flex-col items-center space-y-2 relative">
                  <div className={`w-16 h-16 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center p-1 ${
                    eavesdropperIntercepted 
                      ? 'bg-rose-950/90 border-rose-400 text-rose-200 shadow-xl shadow-rose-900/60 scale-110 animate-pulse'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}>
                    <span className="text-2xl">🦹‍♂️</span>
                    <span className="text-[9px] font-black uppercase tracking-tight">Rogue Sniffer</span>
                  </div>

                  {/* Intercept Speech Bubble */}
                  {eavesdropperIntercepted && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 bg-rose-600 text-white rounded-xl p-2 text-[10px] font-black shadow-lg shadow-rose-950/50 text-center animate-bounce">
                      🚨 STOLEN: user=admin pass=Spring2026!
                    </div>
                  )}

                  <span className="text-[10px] font-bold text-slate-400">Promiscuous Tap</span>
                </div>

                {/* Web Server */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-950 border-2 border-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-950">
                    <Server className="w-7 h-7 text-indigo-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Intranet Bank</span>
                    <span className="text-[10px] font-mono text-indigo-400">Port 80 (HTTP)</span>
                  </div>
                </div>

              </div>

              {/* MOVING POSTCARD PACKET IN FLIGHT */}
              {isPostcardInFlight && (
                <div className="absolute top-1/2 -translate-y-1/2 left-20 right-20 pointer-events-none z-20">
                  <div className="w-36 p-2 rounded-xl bg-white/95 border-2 border-rose-500 shadow-2xl text-slate-900 font-mono text-[10px] animate-packetFly">
                    <div className="flex items-center justify-between border-b border-rose-200 pb-1 mb-1">
                      <span className="font-black text-rose-600">✉️ Clear Postcard</span>
                      <Unlock className="w-3 h-3 text-rose-600" />
                    </div>
                    <div className="text-[9px] leading-tight font-black text-slate-800">
                      <div>user=admin</div>
                      <div className="text-rose-600">pass=Spring2026!</div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Authentic Wireshark "Follow TCP Stream" Window */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-rose-900/60 border border-rose-500 rounded-lg text-rose-200 text-xs font-mono font-black">
                    Wireshark ➡️ Follow ➡️ TCP Stream (Stream 0)
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    (Red = Client Request, Blue = Server Response)
                  </span>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                  {['all', 'client', 'server'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setStreamTab(tab)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                        streamTab === tab ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              {/* Follow Stream Terminal Box */}
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 font-mono text-xs max-h-64 overflow-y-auto space-y-3 shadow-inner">
                
                {/* Client Stream (Red) */}
                {(streamTab === 'all' || streamTab === 'client') && (
                  <div className="space-y-0.5 text-rose-400">
                    <div className="text-[10px] font-bold text-slate-500 pb-1 border-b border-slate-800">
                      --- [Client 192.168.1.105:54320 ➡️ Server 10.0.0.80:80] ---
                    </div>
                    {SPRINT_2_STAGES.leakyPostcard.sampleStream.client.map((line, i) => (
                      <div 
                        key={i} 
                        className={line.includes('password=') ? 'bg-rose-950/80 p-1 rounded border border-rose-500 font-black text-rose-200' : ''}
                      >
                        {line || <span className="opacity-0">blank</span>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Server Stream (Blue) */}
                {(streamTab === 'all' || streamTab === 'server') && (
                  <div className="space-y-0.5 text-sky-400">
                    <div className="text-[10px] font-bold text-slate-500 pb-1 border-b border-slate-800">
                      --- [Server 10.0.0.80:80 ➡️ Client 192.168.1.105:54320] ---
                    </div>
                    {SPRINT_2_STAGES.leakyPostcard.sampleStream.server.map((line, i) => (
                      <div key={i} className={line.includes('Set-Cookie') ? 'bg-sky-950/80 p-1 rounded border border-sky-500 font-black text-sky-200' : ''}>
                        {line || <span className="opacity-0">blank</span>}
                      </div>
                    ))}
                  </div>
                )}

              </div>

              {/* Plaintext Credential Pill Box */}
              <div className="bg-rose-950/40 rounded-2xl p-4 border border-rose-800 flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-rose-400" />
                  <span className="font-sans font-black text-rose-200">Exposed Tokens Harvested from Stream:</span>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-2.5 py-1 bg-rose-900/60 rounded-lg text-rose-300 border border-rose-700">
                    user: <strong>{SPRINT_2_STAGES.leakyPostcard.exposedCredentials.username}</strong>
                  </span>
                  <span className="px-2.5 py-1 bg-rose-900/60 rounded-lg text-rose-300 border border-rose-700">
                    pass: <strong>{SPRINT_2_STAGES.leakyPostcard.exposedCredentials.password}</strong>
                  </span>
                  <span className="px-2.5 py-1 bg-rose-900/60 rounded-lg text-rose-300 border border-rose-700">
                    cookie: <strong>{SPRINT_2_STAGES.leakyPostcard.exposedCredentials.sessionCookie}</strong>
                  </span>
                </div>
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
              {SPRINT_2_STAGES.leakyPostcard.commands.map((cmd) => (
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
                    onClick={() => copyToClipboard(cmd.cmd, `sub21-${cmd.step}`)}
                    className="mt-3 w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700"
                  >
                    {copiedCmd === `sub21-${cmd.step}` ? (
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

          {/* Sub-Sprint 2.1 Verification Checklist */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <span>Sub-Sprint 2.1 Verification Checklist</span>
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postcardVerified}
                    onChange={() => setPostcardVerified(true)}
                    className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                  />
                  <span className="font-medium">Observed unencrypted HTTP POST body leak credentials to the rogue sniffer</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postcardVerified}
                    onChange={() => setPostcardVerified(true)}
                    className="rounded text-rose-600 focus:ring-rose-500 w-4 h-4"
                  />
                  <span className="font-medium">Followed TCP Stream in Wireshark and understood Red (Request) vs Blue (Reply)</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">2.1 Status:</span>
              {postcardVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-black">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                </span>
              ) : (
                <span className="text-amber-600">Transmit HTTP POST above to verify</span>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SPRINT 2.2: THE LOCKED ARMOR BOX (TLS 1.3 ENCRYPTION) */}
      {/* ========================================================================= */}
      {activeSubSprint === '2.2' && (
        <div className="space-y-6">
          
          {/* Sub-Sprint Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-emerald-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-950 font-black text-xs rounded-full border border-emerald-300">
                {SPRINT_2_STAGES.lockedBox.concept}
              </span>
              <span className="text-xs font-bold text-slate-500">
                CompTIA Security+ Domain 1.1 (Confidentiality) & 2.1 (TLS 1.3)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {SPRINT_2_STAGES.lockedBox.title}
            </h3>

            {/* ELI5 Visual Metaphor */}
            <div className="bg-emerald-50/80 rounded-2xl p-4 border border-emerald-200 flex items-start gap-3 text-emerald-950">
              <span className="text-2xl sm:text-3xl">📦🔐</span>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700 block">
                  ELI5 Metaphor: The Titanium Armor Box
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {SPRINT_2_STAGES.lockedBox.eli5Summary}
                </p>
              </div>
            </div>

            {/* Why CompTIA Cares */}
            <div className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900">CompTIA Exam Focus: </strong>
              {SPRINT_2_STAGES.lockedBox.whyCompTia}
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_2_STAGES.lockedBox.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_2_STAGES.lockedBox.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: THE TITANIUM LOCKBOX & BOUNCING X-RAY RAYS */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border-3 border-emerald-500 shadow-xl space-y-6 overflow-hidden relative">
            
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Wire Animation: TLS 1.3 Armored Protection
                </span>
                <h4 className="text-lg font-black text-white">
                  Watch Eavesdropper Rays Bounce Off the Encrypted Lockbox
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleSendArmorBox}
                  disabled={isArmorBoxInFlight}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-900/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isArmorBoxInFlight ? 'Handshaking...' : 'Transmit TLS 1.3 Traffic'}</span>
                </button>

                <button
                  onClick={() => { sounds.playPop(); setTlsAttackBlocked(false); setHandshakeStep(0); setIsArmorBoxInFlight(false); }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs transition-all active:scale-95 cursor-pointer"
                  title="Reset Animation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Transmission Highway Diagram with Shield Effect */}
            <div className="relative py-12 px-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              
              {/* Central Cable Line */}
              <div className="absolute top-1/2 left-12 right-12 -translate-y-1/2 h-1.5 bg-slate-800 rounded-full">
                <div className="w-full h-full bg-gradient-to-r from-emerald-500/30 via-emerald-500/50 to-emerald-500/30 animate-pulse" />
              </div>

              <div className="relative flex items-center justify-between z-10">
                
                {/* Client Host */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-sky-950 border-2 border-sky-400 flex items-center justify-center text-white shadow-lg shadow-sky-950">
                    <Laptop className="w-7 h-7 text-sky-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Client VM</span>
                    <span className="text-[10px] font-mono text-sky-400">192.168.1.105</span>
                  </div>
                </div>

                {/* Frustrated Eavesdropper with Bouncing Rays */}
                <div className="flex flex-col items-center space-y-2 relative">
                  <div className={`w-16 h-16 rounded-2xl border-2 transition-all flex flex-col items-center justify-center text-center p-1 ${
                    tlsAttackBlocked 
                      ? 'bg-slate-900 border-slate-700 text-slate-500 scale-95 opacity-70'
                      : 'bg-slate-900 border-slate-700 text-slate-400'
                  }`}>
                    <span className="text-2xl">{tlsAttackBlocked ? '😵‍💫' : '🦹‍♂️'}</span>
                    <span className="text-[9px] font-black uppercase tracking-tight">Rogue Sniffer</span>
                  </div>

                  {/* Frustrated Speech Bubble */}
                  {tlsAttackBlocked && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-emerald-400 rounded-xl p-2 text-[10px] font-black shadow-lg border border-emerald-500/40 text-center animate-bounce">
                      🛡️ BLOCKED! "All I see is random ciphertext gibberish!"
                    </div>
                  )}

                  <span className="text-[10px] font-bold text-slate-400">Sniffing Fails ❌</span>
                </div>

                {/* HTTPS Server */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950 border-2 border-emerald-400 flex items-center justify-center text-white shadow-lg shadow-emerald-950">
                    <Server className="w-7 h-7 text-emerald-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Secure Bank</span>
                    <span className="text-[10px] font-mono text-emerald-400">Port 443 (TLS 1.3)</span>
                  </div>
                </div>

              </div>

              {/* MOVING ARMORED LOCKBOX IN FLIGHT */}
              {isArmorBoxInFlight && (
                <div className="absolute top-1/2 -translate-y-1/2 left-20 right-20 pointer-events-none z-20">
                  <div className="w-40 p-2.5 rounded-xl bg-slate-900 border-2 border-emerald-400 shadow-2xl text-emerald-300 font-mono text-[10px] animate-packetFly animate-shieldPulse">
                    <div className="flex items-center justify-between border-b border-emerald-800 pb-1 mb-1">
                      <span className="font-black text-emerald-400">🔐 Armored Box</span>
                      <Lock className="w-3.5 h-3.5 text-emerald-400 fill-emerald-900" />
                    </div>
                    <div className="text-[9px] leading-tight font-black text-slate-400">
                      <div>Payload: <span className="text-emerald-400">Encrypted</span></div>
                      <div className="truncate">f8 a1 3e 99 bc 04...</div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* TLS 1.3 Handshake Stepper */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-400 tracking-wider">
                  TLS 1.3 Handshake Sequence (Zero Round-Trip Time Optimization)
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Step {handshakeStep} of 4
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {SPRINT_2_STAGES.lockedBox.handshakeStages.map((stage) => {
                  const isCurrent = handshakeStep === stage.stage;
                  const isPassed = handshakeStep > stage.stage;

                  return (
                    <div
                      key={stage.stage}
                      className={`p-3 rounded-2xl border transition-all space-y-1 ${
                        isCurrent
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-2 ring-emerald-500/50 shadow-md'
                          : isPassed
                          ? 'bg-slate-900 border-slate-700 text-slate-300 opacity-90'
                          : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          Stage {stage.stage}
                        </span>
                        {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                      </div>
                      <div className="text-xs font-bold text-white">{stage.name}</div>
                      <p className="text-[11px] leading-relaxed text-slate-400">{stage.role}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ciphertext Hex Dump Inspection Box */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                Wireshark Packet Bytes: Application Data (What the Sniffer Actually Sees)
              </span>
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 font-mono text-xs text-slate-300 space-y-1 shadow-inner">
                {SPRINT_2_STAGES.lockedBox.sampleCipherBytes.map((chunk, i) => (
                  <div key={i} className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">00{i}0</span>
                    <span className="text-emerald-400 font-black">{chunk}</span>
                    <span className="text-slate-500">...[CIPHERTEXT]...</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-slate-400">
                Notice that credentials, paths, cookies, and tokens are completely absent. Confidentiality is preserved 100%!
              </p>
            </div>

          </div>

          {/* Copyable VM Commands for Practice */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-emerald-600" />
              <span>Reproduce in Your Linux Sandbox (Hands-On Lab)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPRINT_2_STAGES.lockedBox.commands.map((cmd) => (
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
                    onClick={() => copyToClipboard(cmd.cmd, `sub22-${cmd.step}`)}
                    className="mt-3 w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700"
                  >
                    {copiedCmd === `sub22-${cmd.step}` ? (
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

          {/* Sub-Sprint 2.2 Verification Checklist */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sub-Sprint 2.2 Verification Checklist</span>
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lockedBoxVerified}
                    onChange={() => setLockedBoxVerified(true)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="font-medium">Observed TLS 1.3 shield repelling rogue packet sniffers</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={lockedBoxVerified}
                    onChange={() => setLockedBoxVerified(true)}
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span className="font-medium">Understood why raw packet bytes are converted into cipher noise</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">2.2 Status:</span>
              {lockedBoxVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-black">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                </span>
              ) : (
                <span className="text-amber-600">Transmit TLS 1.3 traffic above to verify</span>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* INTERACTIVE COMPTIA PROTOCOL UPGRADE MATCHER */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-indigo-200 shadow-md space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-indigo-600 tracking-wider block">
              CompTIA Security+ Core Skill Drill
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Interactive Protocol Upgrade Matcher
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Pair each legacy cleartext protocol with its cryptographically hardened replacement.
            </p>
          </div>

          <button
            onClick={handleResetMatcher}
            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Drill</span>
          </button>
        </div>

        {/* Matcher Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Column 1: Insecure Protocols */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-rose-600 tracking-wider block flex items-center gap-1.5">
              <Unlock className="w-3.5 h-3.5" />
              <span>1. Insecure / Cleartext Protocols</span>
            </span>

            <div className="space-y-2">
              {SPRINT_2_STAGES.protocolUpgrades.map((item) => {
                const isMatched = !!userMatches[item.insecureName];
                const isSelected = selectedInsecure?.insecureName === item.insecureName;
                const matchedWith = userMatches[item.insecureName];
                const isCorrect = matchedWith === item.secureName;

                return (
                  <button
                    key={item.insecureName}
                    onClick={() => handleSelectInsecure(item)}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-300 scale-101'
                        : isMatched
                        ? isCorrect
                          ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                          : 'bg-rose-50/70 border-rose-300 text-rose-950'
                        : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm">{item.insecureName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {item.insecurePort}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{item.risk}</p>
                    </div>

                    {isMatched && (
                      <span className={`text-xs font-black px-2.5 py-1 rounded-xl flex items-center gap-1 ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {matchedWith} {isCorrect ? '✓' : '✗'}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Column 2: Secure Upgrades */}
          <div className="space-y-3">
            <span className="text-xs font-black uppercase text-emerald-600 tracking-wider block flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" />
              <span>2. Hardened Encrypted Replacements</span>
            </span>

            <div className="space-y-2">
              {SPRINT_2_STAGES.protocolUpgrades.map((item) => {
                const isUsed = Object.values(userMatches).includes(item.secureName);

                return (
                  <button
                    key={item.secureName}
                    onClick={() => handleSelectSecure(item)}
                    disabled={!selectedInsecure}
                    className={`w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedInsecure
                        ? 'bg-emerald-50/40 border-emerald-300 hover:bg-emerald-100 hover:border-emerald-500 scale-100 hover:scale-101'
                        : isUsed
                        ? 'bg-slate-50 border-slate-200 opacity-60'
                        : 'bg-white border-slate-200 opacity-90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-sm">{item.secureName}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {item.securePort}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{item.defense}</p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Drill Completion Status */}
        {matcherComplete && (
          <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex items-center justify-between text-emerald-950 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-xs sm:text-sm font-black">
                Drill Perfect! All 5 cleartext protocols successfully migrated to secure counterparts.
              </span>
            </div>
            <span className="text-xs font-black px-3 py-1 bg-emerald-600 text-white rounded-xl">
              100% Correct
            </span>
          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* SPRINT 2 COMPLETION CELEBRATION CARD */}
      {/* ========================================================================= */}
      {isAllSprint2Done && (
        <div className="bg-gradient-to-r from-rose-600 via-purple-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏆🔐</span>
              <div>
                <span className="text-xs font-black uppercase text-rose-200 tracking-wider">
                  Sprint 2 Verified • Encryption & Confidentiality Mastered!
                </span>
                <h3 className="text-2xl font-black">
                  You Have Mastered Plaintext vs. Encrypted Traffic Analysis!
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md font-black text-xs text-white border border-white/30">
              CIA Triad: Confidentiality
            </div>
          </div>

          <p className="text-purple-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
            You have witnessed how unencrypted traffic leaks plaintext passwords to any eavesdropper on the path, how <strong>TLS 1.3</strong> seals data inside a mathematical titanium vault, and you memorized the top 5 protocol upgrades required on the CompTIA Security+ exam.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Ready for Next Phase: Sprint 3 (Handshakes & Footprints: TCP Flags & Port Scans)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
