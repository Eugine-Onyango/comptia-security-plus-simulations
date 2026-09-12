import React, { useState } from 'react';
import { 
  Handshake, 
  Terminal, 
  Play, 
  RotateCcw, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  DoorOpen, 
  DoorClosed, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  Laptop, 
  Server, 
  ArrowRight, 
  ArrowLeft,
  Filter,
  CheckCircle,
  Flame,
  Radio
} from 'lucide-react';
import { sounds } from '../../../utils/audio';
import { SPRINT_3_STAGES } from './wiresharkSprintData';

export default function WiresharkSprint3Handshakes({ onSprintComplete }) {
  const [activeSubSprint, setActiveSubSprint] = useState('3.1'); // '3.1' or '3.2'

  // Sub-Sprint 3.1 State (3-Way Handshake)
  const [currentHandshakeStep, setCurrentHandshakeStep] = useState(0); // 0 (Idle), 1 (SYN), 2 (SYN-ACK), 3 (ACK / Established)
  const [isHandshakePlaying, setIsHandshakePlaying] = useState(false);
  const [selectedFlagIndex, setSelectedFlagIndex] = useState(0);
  const [handshakeVerified, setHandshakeVerified] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);

  // Sub-Sprint 3.2 State (SYN Stealth Scan & Door-Rattling)
  const [activeScanDoor, setActiveScanDoor] = useState(null); // null, 80, 445, 22
  const [isScanningAll, setIsScanningAll] = useState(false);
  const [scannedResults, setScannedResults] = useState({});
  const [scanVerified, setScanVerified] = useState(false);

  // Knowledge check state
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizScore, setQuizScore] = useState(null);

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

  // 3.1 Step through handshake
  const handleRunFullHandshake = () => {
    sounds.playPop();
    setIsHandshakePlaying(true);
    setCurrentHandshakeStep(1);

    setTimeout(() => {
      setCurrentHandshakeStep(2);
      sounds.playPop();
    }, 700);

    setTimeout(() => {
      setCurrentHandshakeStep(3);
      sounds.playSuccess();
      setIsHandshakePlaying(false);
      setHandshakeVerified(true);
    }, 1400);
  };

  const handleManualStep = (step) => {
    sounds.playPop();
    setCurrentHandshakeStep(step);
    if (step === 3) {
      setHandshakeVerified(true);
      sounds.playSuccess();
    }
  };

  const handleResetHandshake = () => {
    sounds.playPop();
    setCurrentHandshakeStep(0);
    setIsHandshakePlaying(false);
  };

  // 3.2 Run Stealth Scan Probes
  const handleProbePort = (portObj) => {
    sounds.playPop();
    setActiveScanDoor(portObj.port);

    setTimeout(() => {
      setScannedResults((prev) => ({ ...prev, [portObj.port]: portObj.state }));
      if (portObj.state.includes('OPEN')) {
        sounds.playAlert();
      } else {
        sounds.playPop();
      }
    }, 500);

    setTimeout(() => {
      setActiveScanDoor(null);
      // If all 3 explored, verify
      if (Object.keys(scannedResults).length >= 2) {
        setScanVerified(true);
      }
    }, 1200);
  };

  const handleScanAllDoors = () => {
    sounds.playPop();
    setIsScanningAll(true);
    setScannedResults({});

    // Door 80 (Open)
    setActiveScanDoor(80);
    setTimeout(() => {
      setScannedResults(prev => ({ ...prev, 80: 'OPEN 🟢' }));
      sounds.playAlert();
      setActiveScanDoor(445);
    }, 600);

    // Door 445 (Closed)
    setTimeout(() => {
      setScannedResults(prev => ({ ...prev, 445: 'CLOSED 🔴' }));
      sounds.playPop();
      setActiveScanDoor(22);
    }, 1200);

    // Door 22 (Filtered)
    setTimeout(() => {
      setScannedResults(prev => ({ ...prev, 22: 'FILTERED 🛡️' }));
      sounds.playSuccess();
      setActiveScanDoor(null);
      setIsScanningAll(false);
      setScanVerified(true);
    }, 1800);
  };

  // Knowledge Quiz
  const handleAnswerQuiz = (qId, optionIdx, isCorrect) => {
    sounds.playPop();
    setQuizAnswers(prev => ({ ...prev, [qId]: { optionIdx, isCorrect } }));
  };

  const isAllSprint3Done = handshakeVerified && scanVerified;

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* SPRINT SUB-NAVIGATION TABS */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-2 rounded-2xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('3.1'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '3.1'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-102'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Handshake className="w-4 h-4" />
            <span>3.1 The 3-Way Handshake (Politeness Protocol)</span>
            {handshakeVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white/20" />}
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('3.2'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '3.2'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-200 scale-102'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <DoorOpen className="w-4 h-4" />
            <span>3.2 Catching the Door-Rattler (SYN Stealth Scan)</span>
            {scanVerified && <CheckCircle2 className="w-3.5 h-3.5 text-white fill-white/20" />}
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold text-slate-600">
          <span>Sprint 3 Goal:</span>
          <span className="text-slate-900 font-extrabold">TCP State Machine & Scan Footprints</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-SPRINT 3.1: THE 3-WAY HANDSHAKE (SYN ➡️ SYN-ACK ➡️ ACK) */}
      {/* ========================================================================= */}
      {activeSubSprint === '3.1' && (
        <div className="space-y-6">
          
          {/* Sub-Sprint Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-indigo-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-950 font-black text-xs rounded-full border border-indigo-300">
                {SPRINT_3_STAGES.handshake.concept}
              </span>
              <span className="text-xs font-bold text-slate-500">
                CompTIA Security+ Domain 4.3 (TCP Connection States)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {SPRINT_3_STAGES.handshake.title}
            </h3>

            {/* ELI5 Visual Metaphor */}
            <div className="bg-indigo-50/80 rounded-2xl p-4 border border-indigo-200 flex items-start gap-3 text-indigo-950">
              <span className="text-2xl sm:text-3xl">🤝📞</span>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-indigo-700 block">
                  ELI5 Metaphor: The Polite Phone Call
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {SPRINT_3_STAGES.handshake.eli5Summary}
                </p>
              </div>
            </div>

            {/* Why CompTIA Cares */}
            <div className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900">CompTIA Exam Focus: </strong>
              {SPRINT_3_STAGES.handshake.whyCompTia}
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_3_STAGES.handshake.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_3_STAGES.handshake.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: SYNCHRONIZED HANDSHAKE PACKET HIGHWAY */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border-3 border-indigo-500 shadow-xl space-y-6 overflow-hidden relative">
            
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
                  Live Handshake Wire Animation: Establishing TCP State
                </span>
                <h4 className="text-lg font-black text-white">
                  Watch the 3-Way Handshake Exchange in Motion
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunFullHandshake}
                  disabled={isHandshakePlaying}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs shadow-lg shadow-indigo-900/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isHandshakePlaying ? 'Handshaking...' : 'Play 3-Way Handshake ⚡'}</span>
                </button>

                <button
                  onClick={handleResetHandshake}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs transition-all active:scale-95 cursor-pointer"
                  title="Reset Handshake"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* TCP Connection Highway Diagram */}
            <div className="relative py-14 px-4 bg-slate-900/90 rounded-2xl border border-slate-800">
              
              {/* Central Cable Line */}
              <div className="absolute top-1/2 left-12 right-12 -translate-y-1/2 h-2 bg-slate-800 rounded-full">
                <div className={`h-full rounded-full transition-all duration-500 ${
                  currentHandshakeStep === 3
                    ? 'bg-emerald-500 shadow-lg shadow-emerald-500/50'
                    : currentHandshakeStep > 0
                    ? 'bg-indigo-500 animate-pulse'
                    : 'bg-slate-800'
                }`} />
              </div>

              <div className="relative flex items-center justify-between z-10">
                
                {/* Client Host */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-sky-950 border-2 border-sky-400 flex items-center justify-center text-white shadow-lg shadow-sky-950">
                    <Laptop className="w-8 h-8 text-sky-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Client Host</span>
                    <span className="text-[10px] font-mono text-sky-400">192.168.1.105:54322</span>
                    <span className={`mt-1 inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      currentHandshakeStep === 0
                        ? 'bg-slate-800 text-slate-400'
                        : currentHandshakeStep === 1
                        ? 'bg-amber-900 text-amber-300'
                        : currentHandshakeStep === 2
                        ? 'bg-indigo-900 text-indigo-300'
                        : 'bg-emerald-900 text-emerald-300'
                    }`}>
                      {currentHandshakeStep === 0 ? 'CLOSED' : currentHandshakeStep === 1 ? 'SYN_SENT' : 'ESTABLISHED'}
                    </span>
                  </div>
                </div>

                {/* Center Handshake Status Badge */}
                <div className="flex flex-col items-center space-y-1 z-10 bg-slate-900/95 px-4 py-2 rounded-2xl border border-slate-700 shadow-lg text-center">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                    Socket State Machine
                  </span>
                  <div className={`text-xs font-black px-3 py-1 rounded-xl ${
                    currentHandshakeStep === 3
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : currentHandshakeStep > 0
                      ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 animate-pulse'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {currentHandshakeStep === 0 && '⚪ IDLE (No Session)'}
                    {currentHandshakeStep === 1 && '🟡 SYN In Flight (Seq=0)'}
                    {currentHandshakeStep === 2 && '🔵 SYN-ACK Replying (Ack=1)'}
                    {currentHandshakeStep === 3 && '🟢 ESTABLISHED (Ready for Data!)'}
                  </div>
                </div>

                {/* Server Host */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-950 border-2 border-indigo-400 flex items-center justify-center text-white shadow-lg shadow-indigo-950">
                    <Server className="w-8 h-8 text-indigo-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-xs font-black text-white block">Web Server</span>
                    <span className="text-[10px] font-mono text-indigo-400">93.184.216.34:80</span>
                    <span className={`mt-1 inline-block text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                      currentHandshakeStep < 2
                        ? 'bg-slate-800 text-slate-400'
                        : currentHandshakeStep === 2
                        ? 'bg-amber-900 text-amber-300'
                        : 'bg-emerald-900 text-emerald-300'
                    }`}>
                      {currentHandshakeStep < 2 ? 'LISTEN' : currentHandshakeStep === 2 ? 'SYN_RCVD' : 'ESTABLISHED'}
                    </span>
                  </div>
                </div>

              </div>

              {/* MOVING FLYING PACKETS FOR EACH STEP */}
              {currentHandshakeStep === 1 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-20 right-20 pointer-events-none z-20">
                  <div className="w-40 p-2 rounded-xl bg-amber-500 text-slate-950 font-mono text-[10px] font-black shadow-2xl animate-packetFly flex items-center justify-between border-2 border-white">
                    <span>1. SYN [0x002]</span>
                    <span>Seq=0 ➡️</span>
                  </div>
                </div>
              )}

              {currentHandshakeStep === 2 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-20 right-20 pointer-events-none z-20">
                  <div className="w-44 p-2 rounded-xl bg-sky-400 text-slate-950 font-mono text-[10px] font-black shadow-2xl animate-packetFly flex items-center justify-between border-2 border-white" style={{ animationDirection: 'reverse' }}>
                    <span>⬅️ 2. SYN-ACK [0x012]</span>
                    <span>Ack=1</span>
                  </div>
                </div>
              )}

              {currentHandshakeStep === 3 && (
                <div className="absolute top-1/2 -translate-y-1/2 left-20 right-20 pointer-events-none z-20">
                  <div className="w-40 p-2 rounded-xl bg-emerald-400 text-slate-950 font-mono text-[10px] font-black shadow-2xl animate-packetFly flex items-center justify-between border-2 border-white">
                    <span>3. ACK [0x010]</span>
                    <span>Ack=1 ➡️</span>
                  </div>
                </div>
              )}

            </div>

            {/* Interactive Step-by-Step Stepper Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {SPRINT_3_STAGES.handshake.steps.map((step) => {
                const isActive = currentHandshakeStep === step.step;
                const isPassed = currentHandshakeStep >= step.step;

                return (
                  <button
                    key={step.step}
                    onClick={() => handleManualStep(step.step)}
                    className={`p-4 rounded-2xl border text-left transition-all space-y-2 cursor-pointer ${
                      isActive
                        ? 'bg-indigo-950/90 border-indigo-400 text-indigo-100 ring-2 ring-indigo-500/50 shadow-lg scale-102'
                        : isPassed
                        ? 'bg-slate-900 border-slate-700 text-slate-300'
                        : 'bg-slate-900/60 border-slate-800 text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full bg-slate-800 text-indigo-300">
                        {step.flags}
                      </span>
                      {isPassed && <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>

                    <div className="text-xs font-black text-white">{step.name}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{step.eli5Meaning}</p>

                    <div className="pt-2 border-t border-slate-800/80 font-mono text-[10px] text-slate-400 space-y-0.5">
                      <div>Filter: <span className="text-indigo-400">{step.filterSyntax}</span></div>
                      <div className="flex items-center justify-between text-slate-500">
                        <span>{step.seq}</span>
                        <span>{step.ack}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 6 TCP FLAGS DISSECTOR BOARD */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black uppercase text-indigo-400 tracking-wider block">
                Wireshark Flag Dissector: The 6 Classic TCP Control Flags
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {SPRINT_3_STAGES.handshake.flagsDissector.map((f, i) => (
                  <button
                    key={f.flag}
                    onClick={() => { sounds.playPop(); setSelectedFlagIndex(i); }}
                    className={`p-3 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                      selectedFlagIndex === i
                        ? 'bg-indigo-600 border-indigo-400 text-white shadow-md'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-[10px] font-mono font-black px-1.5 py-0.5 rounded bg-black/30 block w-fit">
                      {f.bit}
                    </span>
                    <div className="text-xs font-black truncate">{f.flag.split(' ')[0]}</div>
                    <div className="text-[10px] opacity-80 line-clamp-1">{f.purpose}</div>
                  </button>
                ))}
              </div>

              {/* Selected Flag Details Drawer */}
              {selectedFlagIndex !== null && (
                <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-indigo-300 text-sm">
                      {SPRINT_3_STAGES.handshake.flagsDissector[selectedFlagIndex].flag} (Bit {SPRINT_3_STAGES.handshake.flagsDissector[selectedFlagIndex].bit})
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-slate-800 text-slate-300 rounded-lg">
                      RFC 793 Standard
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    <strong>Protocol Function:</strong> {SPRINT_3_STAGES.handshake.flagsDissector[selectedFlagIndex].purpose}
                  </p>
                  <p className="text-amber-300/90 text-xs">
                    <strong>Security+ Analysis:</strong> {SPRINT_3_STAGES.handshake.flagsDissector[selectedFlagIndex].securityMeaning}
                  </p>
                </div>
              )}

            </div>

          </div>

          {/* Copyable VM Commands for Practice */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              <span>Reproduce in Your Linux Sandbox (Hands-On Lab)</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPRINT_3_STAGES.handshake.commands.map((cmd) => (
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
                    onClick={() => copyToClipboard(cmd.cmd, `sub31-${cmd.step}`)}
                    className="mt-3 w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700"
                  >
                    {copiedCmd === `sub31-${cmd.step}` ? (
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

          {/* Sub-Sprint 3.1 Verification Checklist */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                <span>Sub-Sprint 3.1 Verification Checklist</span>
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={handshakeVerified}
                    onChange={() => setHandshakeVerified(true)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span className="font-medium">Observed the 3-Way Handshake (SYN ➡️ SYN-ACK ➡️ ACK) complete successfully</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={handshakeVerified}
                    onChange={() => setHandshakeVerified(true)}
                    className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                  />
                  <span className="font-medium">Identified the 6 TCP control flags (SYN, ACK, RST, FIN, PSH, URG)</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">3.1 Status:</span>
              {handshakeVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-black">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                </span>
              ) : (
                <span className="text-amber-600">Run handshake animation above to verify</span>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SPRINT 3.2: CATCHING THE DOOR-RATTLER (SYN STEALTH SCANS) */}
      {/* ========================================================================= */}
      {activeSubSprint === '3.2' && (
        <div className="space-y-6">
          
          {/* Sub-Sprint Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-950 font-black text-xs rounded-full border border-amber-300">
                {SPRINT_3_STAGES.stealthScan.concept}
              </span>
              <span className="text-xs font-bold text-slate-500">
                CompTIA Security+ Domain 2.2 & 4.2 (Network Scans)
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              {SPRINT_3_STAGES.stealthScan.title}
            </h3>

            {/* ELI5 Visual Metaphor */}
            <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200 flex items-start gap-3 text-amber-950">
              <span className="text-2xl sm:text-3xl">🚪🏃‍♂️</span>
              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-wider text-amber-700 block">
                  ELI5 Metaphor: The Door-Rattling Burglar (Half-Open Scan)
                </span>
                <p className="text-xs sm:text-sm font-medium leading-relaxed">
                  {SPRINT_3_STAGES.stealthScan.eli5Summary}
                </p>
              </div>
            </div>

            {/* Why CompTIA Cares */}
            <div className="text-xs text-slate-600 font-medium bg-slate-50 p-3 rounded-xl border border-slate-200">
              <strong className="text-slate-900">CompTIA Exam Focus: </strong>
              {SPRINT_3_STAGES.stealthScan.whyCompTia}
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_3_STAGES.stealthScan.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_3_STAGES.stealthScan.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: THE 3 DOORS (OPEN VS CLOSED VS FILTERED) */}
          <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border-3 border-amber-500 shadow-xl space-y-6 overflow-hidden relative">
            
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  Live Wire Animation: SYN Stealth Port Probing
                </span>
                <h4 className="text-lg font-black text-white">
                  Rattle the Server Doors & Analyze Wireshark Footprints
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleScanAllDoors}
                  disabled={isScanningAll}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black text-xs shadow-lg shadow-amber-900/40 transition-all active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{isScanningAll ? 'Scanning Ports...' : 'Scan All 3 Doors (nmap -sS) ⚡'}</span>
                </button>

                <button
                  onClick={() => { sounds.playPop(); setScannedResults({}); setActiveScanDoor(null); }}
                  className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-black text-xs transition-all active:scale-95 cursor-pointer"
                  title="Reset Scans"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* The 3 Doors Visual Alleyway */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              {SPRINT_3_STAGES.stealthScan.probedPorts.map((door) => {
                const isBeingProbed = activeScanDoor === door.port;
                const result = scannedResults[door.port];

                return (
                  <div
                    key={door.port}
                    className={`rounded-2xl p-5 border-2 transition-all space-y-4 relative ${
                      isBeingProbed
                        ? 'bg-amber-950/80 border-amber-400 ring-2 ring-amber-400 scale-102 animate-pulse'
                        : result
                        ? 'bg-slate-900 border-slate-700'
                        : 'bg-slate-900/60 border-slate-800'
                    }`}
                  >
                    {/* Door Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">
                          {door.port === 80 ? '🌐' : door.port === 445 ? '📁' : '🔒'}
                        </span>
                        <div>
                          <span className="text-xs font-black text-white block">Port {door.port} ({door.service})</span>
                          <span className="text-[10px] text-slate-400">Target Server Door</span>
                        </div>
                      </div>

                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                        result?.includes('OPEN')
                          ? 'bg-emerald-600 text-white'
                          : result?.includes('CLOSED')
                          ? 'bg-rose-600 text-white'
                          : result?.includes('FILTERED')
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {result || 'UNSCANNED'}
                      </span>
                    </div>

                    {/* Door Animation Visual */}
                    <div className="h-28 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden p-2 text-center">
                      {isBeingProbed ? (
                        <div className="space-y-1 animate-bounce">
                          <span className="text-2xl">🚪💥</span>
                          <span className="text-[10px] font-black text-amber-400 uppercase block">Rattling Port {door.port}...</span>
                        </div>
                      ) : result ? (
                        <div className="space-y-1">
                          <span className="text-2xl">
                            {door.port === 80 ? '🚪🔓' : door.port === 445 ? '🚪🔒' : '🧱🛡️'}
                          </span>
                          <span className="text-[11px] font-black text-white block">{door.state}</span>
                          <span className="text-[9px] text-slate-400 block">{door.response}</span>
                        </div>
                      ) : (
                        <div className="space-y-1 opacity-60">
                          <span className="text-2xl">🚪</span>
                          <span className="text-[10px] text-slate-400">Click probe to test</span>
                        </div>
                      )}
                    </div>

                    {/* Technical Explanation */}
                    <p className="text-[11px] text-slate-400 leading-relaxed min-h-[48px]">
                      {door.explanation}
                    </p>

                    {/* Probe Button */}
                    <button
                      onClick={() => handleProbePort(door)}
                      disabled={isScanningAll || isBeingProbed}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs transition-all active:scale-95 cursor-pointer border border-slate-700 flex items-center justify-center gap-1.5"
                    >
                      <span>Probe Port {door.port} (SYN)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Authentic Wireshark Scan Footprint Triage */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider block">
                Wireshark Packet Footprint: How an IDS / Analyst Spots Stealth Scans
              </span>

              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2">
                <div className="text-[11px] text-slate-400 border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>Display Filter: <strong className="text-amber-400">tcp.flags.reset == 1</strong></span>
                  <span className="text-slate-500">Reveals aborted stealth scans & closed door hits</span>
                </div>

                <div className="space-y-1.5 text-[11px]">
                  <div className="text-rose-400 flex items-center justify-between">
                    <span>192.168.1.105 ➡️ 93.184.216.34 [TCP] 54322 ➡️ 80 [RST] Seq=1</span>
                    <span className="text-slate-500">Half-Open Abort (Ding-Dong Ditch)</span>
                  </div>
                  <div className="text-rose-300 flex items-center justify-between">
                    <span>93.184.216.34 ➡️ 192.168.1.105 [TCP] 445 ➡️ 54323 [RST, ACK] Seq=1</span>
                    <span className="text-slate-500">Port Closed Rejection</span>
                  </div>
                </div>
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
              {SPRINT_3_STAGES.stealthScan.commands.map((cmd) => (
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
                    onClick={() => copyToClipboard(cmd.cmd, `sub32-${cmd.step}`)}
                    className="mt-3 w-full py-1.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border border-slate-700"
                  >
                    {copiedCmd === `sub32-${cmd.step}` ? (
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

          {/* Sub-Sprint 3.2 Verification Checklist */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Sub-Sprint 3.2 Verification Checklist</span>
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scanVerified}
                    onChange={() => setScanVerified(true)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span className="font-medium">Observed difference between Open (SYN-ACK), Closed (RST-ACK), and Filtered (Drop)</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scanVerified}
                    onChange={() => setScanVerified(true)}
                    className="rounded text-amber-600 focus:ring-amber-500 w-4 h-4"
                  />
                  <span className="font-medium">Understood why SYN Stealth scans send RST to avoid application logging</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">3.2 Status:</span>
              {scanVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-black">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                </span>
              ) : (
                <span className="text-amber-600">Scan doors above to verify</span>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SPRINT 3 COMPLETION CELEBRATION CARD */}
      {/* ========================================================================= */}
      {isAllSprint3Done && (
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🏆🤝</span>
              <div>
                <span className="text-xs font-black uppercase text-amber-200 tracking-wider">
                  Sprint 3 Verified • TCP Flags & Handshakes Mastered!
                </span>
                <h3 className="text-2xl font-black">
                  You Have Mastered Handshakes, TCP Flags & Port Scan Triage!
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md font-black text-xs text-white border border-white/30">
              TCP State: ESTABLISHED
            </div>
          </div>

          <p className="text-indigo-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
            You now know how to identify the 3-Way Handshake (`SYN` ➡️ `SYN-ACK` ➡️ `ACK`), navigate the 6 TCP control flags, and detect sneaky half-open port scans (`nmap -sS`) by spotting `RST` spikes in Wireshark!
          </p>

          <div className="pt-2 flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Ready for Next Phase: Sprint 4 (Catching Attackers: ARP Poisoning & DoS Floods)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
