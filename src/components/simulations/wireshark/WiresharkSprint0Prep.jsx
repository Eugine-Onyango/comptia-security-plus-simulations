import React, { useState, useEffect } from 'react';
import { 
  FolderPlus, 
  Terminal, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  Play, 
  RotateCcw, 
  Sparkles, 
  Network, 
  ArrowRight, 
  Lock, 
  Unlock, 
  Radio, 
  Info,
  Server,
  Laptop,
  Flame,
  Globe,
  Zap,
  Bomb,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { sounds } from '../../../utils/audio';
import { SPRINT_0_STAGES } from './wiresharkSprintData';

export default function WiresharkSprint0Prep({ onSprintComplete }) {
  const [activeSubSprint, setActiveSubSprint] = useState('0.1'); // '0.1', '0.2', '0.3'

  // Sub-Sprint 0.1 State
  const [sandboxCreated, setSandboxCreated] = useState(false);
  const [sandboxOutput, setSandboxOutput] = useState([]);
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [droppedPacketsCount, setDroppedPacketsCount] = useState(0);
  const [isDroppingPacket, setIsDroppingPacket] = useState(false);

  // Sub-Sprint 0.2 State (Exploit / Privilege Arena)
  const [attackMode, setAttackMode] = useState('hardened'); // 'root' or 'hardened'
  const [isExploitRunning, setIsExploitRunning] = useState(false);
  const [exploitResult, setExploitResult] = useState(null);
  const [privilegeTestRunning, setPrivilegeTestRunning] = useState(false);
  const [privilegeVerified, setPrivilegeVerified] = useState(false);
  const [privilegeLogs, setPrivilegeLogs] = useState([]);

  // Sub-Sprint 0.3 State (Doors & Highway)
  const [selectedInterface, setSelectedInterface] = useState(null);
  const [interfaceDetected, setInterfaceDetected] = useState(false);
  const [isRadarScanning, setIsRadarScanning] = useState(false);
  const [livePacketsCount, setLivePacketsCount] = useState(128);

  // Continuous background packet counter for interface 0.3
  useEffect(() => {
    const timer = setInterval(() => {
      setLivePacketsCount((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

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

  // 0.1 Simulation Handler
  const handleRunSandboxSim = () => {
    sounds.playPop();
    setSandboxCreated(false);
    setSandboxOutput(['$ mkdir -p ~/secplus_wireshark && cd ~/secplus_wireshark', '$ pwd']);

    setTimeout(() => {
      setSandboxOutput((prev) => [
        ...prev,
        '/home/learner/secplus_wireshark',
        '$ ls -la',
        'drwxr-xr-x 2 learner learner 4096 Sep 12 13:45 .',
        'drwxr-xr-x 18 learner learner 4096 Sep 12 13:44 ..',
        '✨ [SUCCESS] Sandbox folder verified! 100% isolated from your system files.'
      ]);
      setSandboxCreated(true);
      sounds.playSuccess();
    }, 600);
  };

  // 0.1 Animated Packet Drop
  const handleDropPacketInSandbox = () => {
    sounds.playPop();
    setIsDroppingPacket(true);
    setTimeout(() => {
      setIsDroppingPacket(false);
      setDroppedPacketsCount((prev) => prev + 1);
      sounds.playSuccess();
    }, 600);
  };

  // 0.2 Interactive Exploit Simulation
  const handleLaunchExploit = () => {
    sounds.playBuzzer();
    setIsExploitRunning(true);
    setExploitResult(null);

    setTimeout(() => {
      setIsExploitRunning(false);
      if (attackMode === 'root') {
        setExploitResult('hacked');
        sounds.playAlert();
      } else {
        setExploitResult('defended');
        setPrivilegeVerified(true);
        sounds.playSuccess();
      }
    }, 1200);
  };

  // 0.2 Privilege Check Simulation
  const handleRunPrivilegeTest = () => {
    sounds.playPop();
    setPrivilegeTestRunning(true);
    setPrivilegeLogs(['$ which tshark', '/usr/bin/tshark']);

    setTimeout(() => {
      setPrivilegeLogs((prev) => [
        ...prev,
        '$ tshark -c 1 -i any',
        'Capturing on \'any\' (Non-root user: learner)',
        '  1 0.000000 192.168.1.105 → 1.1.1.1 DNS Standard query 0x1a2b A cloudflare.com',
        '1 packet captured',
        '🛡️ [PASS] Packet capture privileges confirmed without running as root!'
      ]);
      setPrivilegeTestRunning(false);
      setPrivilegeVerified(true);
      sounds.playSuccess();
    }, 1000);
  };

  // 0.3 Interface Detection Simulation
  const handleDetectInterface = () => {
    sounds.playPop();
    setIsRadarScanning(true);

    setTimeout(() => {
      setIsRadarScanning(false);
      setSelectedInterface('enp0s3 / eth0');
      setInterfaceDetected(true);
      sounds.playSuccess();
    }, 1200);
  };

  const isAllSprint0Done = sandboxCreated && privilegeVerified && interfaceDetected;

  return (
    <div className="space-y-8">
      
      {/* Sub-Sprint Navigation Pills */}
      <div className="bg-white rounded-3xl p-3 border-3 border-emerald-200 shadow-sm flex flex-wrap gap-2 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          
          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('0.1'); }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '0.1'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200 scale-102'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <FolderPlus className="w-4 h-4" />
            <span>0.1 The Safe Corner</span>
            {sandboxCreated && <CheckCircle2 className="w-4 h-4 text-emerald-300" />}
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('0.2'); }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '0.2'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-200 scale-102'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>0.2 X-Ray Inspector Setup</span>
            {privilegeVerified && <CheckCircle2 className="w-4 h-4 text-teal-300" />}
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('0.3'); }}
            className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeSubSprint === '0.3'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-102'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>0.3 The Hallway Door</span>
            {interfaceDetected && <CheckCircle2 className="w-4 h-4 text-indigo-300" />}
          </button>

        </div>

        {/* Global Progress Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-xl border border-emerald-200 text-xs font-black text-emerald-800">
          <span>Sprint 0 Progress:</span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[11px]">
            {Number(sandboxCreated) + Number(privilegeVerified) + Number(interfaceDetected)} / 3 Verified
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-SPRINT 0.1: THE SAFE CORNER */}
      {/* ========================================================================= */}
      {activeSubSprint === '0.1' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Card: ELI5 Explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                📁
              </div>
              <div>
                <span className="text-xs font-black uppercase text-emerald-600 tracking-wider">
                  Sub-Sprint 0.1 • Workspace Isolation
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  The Safe Corner: Creating Your Dedicated Sandbox
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {SPRINT_0_STAGES.safeCorner.eli5Summary}
            </p>

            {/* CompTIA Takeaway Alert */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 font-medium space-y-1">
              <div className="flex items-center gap-2 font-black text-emerald-900">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>CompTIA Security+ Exam Connection (Domain 4: Operations & Isolation):</span>
              </div>
              <p>{SPRINT_0_STAGES.safeCorner.whyCompTia}</p>
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_0_STAGES.safeCorner.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_0_STAGES.safeCorner.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: The Quarantine Cleanroom */}
          <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 border-4 border-emerald-500/50 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧪</span>
                <h4 className="font-black text-sm text-emerald-400">
                  LIVE ANIMATION: The System Cleanroom & Quarantine Sandbox
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDropPacketInSandbox}
                  disabled={isDroppingPacket}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <FolderPlus className="w-3.5 h-3.5" />
                  <span>{isDroppingPacket ? 'Dropping Packet Capture...' : 'Drop 100MB PCAP Dump into Sandbox 📦'}</span>
                </button>
              </div>
            </div>

            {/* Visual Arena */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
              
              {/* Left: Protected Host OS */}
              <div className="bg-slate-900/80 rounded-2xl p-4 border-2 border-slate-700 flex flex-col justify-between space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <Server className="w-4 h-4 text-rose-400" />
                    <span>Host Root System (/)</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 text-[10px] font-bold">
                    DO NOT CLUTTER
                  </span>
                </div>

                <div className="space-y-2 font-mono text-[11px] text-slate-400">
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span>/etc/systemd/ (Critical OS)</span>
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span>/var/log/ (OS Event Logs)</span>
                    <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                </div>

                <div className="text-[11px] text-slate-400 font-sans italic">
                  Protected from accidental partition fill-ups or corrupted capture dumps.
                </div>
              </div>

              {/* Right: The Safe Corner Sandbox */}
              <div className="bg-emerald-950/30 rounded-2xl p-4 border-3 border-emerald-400 animate-shieldPulse flex flex-col justify-between space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                    <FolderPlus className="w-4 h-4 text-emerald-400" />
                    <span>~/secplus_wireshark/</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-200 text-[10px] font-bold">
                    ISOLATED QUARANTINE
                  </span>
                </div>

                {/* Animated Drop Chamber */}
                <div className="h-28 bg-slate-950/80 rounded-xl border border-emerald-500/40 p-3 flex flex-col items-center justify-center relative overflow-hidden">
                  {isDroppingPacket ? (
                    <div className="flex flex-col items-center gap-1 animate-bounce text-emerald-300">
                      <span className="text-2xl">📦</span>
                      <span className="text-[11px] font-mono font-bold">capturing_raw_traffic.pcap</span>
                      <span className="text-[10px] text-emerald-400">Dropping safely into sandbox...</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-1 text-center">
                      <div className="text-xl">🛡️📦</div>
                      <span className="text-xs font-bold text-emerald-300">
                        {droppedPacketsCount > 0 
                          ? `${droppedPacketsCount} Capture Dumps Safely Trapped in Sandbox` 
                          : 'Quarantine Chamber Ready'}
                      </span>
                      <span className="text-[10px] text-slate-400">Zero chance of overflowing root / partition</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-[11px] text-emerald-300 font-bold">
                  <span>Partition Status: 100% Safe</span>
                  <span>Isolation: Sealed</span>
                </div>
              </div>

            </div>
          </div>

          {/* Hands-On Commands & Interactive Sandbox */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Real Commands to run in VM */}
            <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-600" />
                  <span>Commands for Your Real VM Terminal</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Step-by-Step</span>
              </div>

              <div className="space-y-3">
                {SPRINT_0_STAGES.safeCorner.commands.map((cmdItem) => (
                  <div key={cmdItem.step} className="bg-slate-900 rounded-2xl p-3.5 text-xs font-mono text-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-sans font-bold">
                      <span>Step {cmdItem.step}: {cmdItem.desc}</span>
                      <button
                        onClick={() => copyToClipboard(cmdItem.cmd, `c01_${cmdItem.step}`)}
                        className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
                      >
                        {copiedCmd === `c01_${cmdItem.step}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-emerald-400 font-bold overflow-x-auto whitespace-pre">
                      {cmdItem.cmd}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Browser Simulator */}
            <div className="bg-slate-950 rounded-3xl p-6 border-4 border-slate-800 shadow-xl flex flex-col justify-between space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 text-[11px] ml-2 font-sans font-bold">Safe Corner Live Check</span>
                </div>
                <button
                  onClick={handleRunSandboxSim}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl font-sans text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-slate-950" />
                  <span>Test Sandbox Check</span>
                </button>
              </div>

              {/* Terminal Body */}
              <div className="space-y-1.5 flex-1 min-h-[160px] text-slate-300">
                {sandboxOutput.length > 0 ? (
                  sandboxOutput.map((line, idx) => (
                    <div 
                      key={idx} 
                      className={line.includes('✨') ? 'text-emerald-400 font-black font-sans py-1' : line.startsWith('$') ? 'text-slate-100 font-bold' : 'text-slate-400'}
                    >
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-600 italic py-10 text-center font-sans">
                    Click "Test Sandbox Check" above to simulate creating and verifying the isolated directory.
                  </div>
                )}
              </div>

              {/* Verification Status Banner */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-sans">
                <span className="text-slate-400">Sandbox Status:</span>
                {sandboxCreated ? (
                  <span className="text-emerald-400 font-black flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED ISOLATED
                  </span>
                ) : (
                  <span className="text-amber-400 font-bold">Awaiting Verification Check</span>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SPRINT 0.2: THE X-RAY INSPECTOR SETUP (LEAST PRIVILEGE) */}
      {/* ========================================================================= */}
      {activeSubSprint === '0.2' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Card: ELI5 Explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-teal-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                🛡️
              </div>
              <div>
                <span className="text-xs font-black uppercase text-teal-600 tracking-wider">
                  Sub-Sprint 0.2 • Security Hardening & Least Privilege
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  The X-Ray Inspector: Safe Non-Root Packet Capture
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {SPRINT_0_STAGES.inspectorSetup.eli5Summary}
            </p>

            {/* CompTIA Takeaway Alert */}
            <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-4 text-xs sm:text-sm text-teal-950 font-medium space-y-1">
              <div className="flex items-center gap-2 font-black text-teal-900">
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>CompTIA Security+ Exam Connection (Domain 1: Principle of Least Privilege):</span>
              </div>
              <p>{SPRINT_0_STAGES.inspectorSetup.whyCompTia}</p>
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_0_STAGES.inspectorSetup.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_0_STAGES.inspectorSetup.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: The Least Privilege Blast Shield Arena */}
          <div className={`bg-slate-950 rounded-3xl p-6 border-4 shadow-2xl space-y-4 text-white transition-all ${
            isExploitRunning && attackMode === 'root' ? 'animate-exploitShake border-rose-500' : 'border-teal-500/50'
          }`}>
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">💥🛡️</span>
                <h4 className="font-black text-sm text-teal-300">
                  LIVE ANIMATION: Root Capture Risk vs. Hardened Blast Shield
                </h4>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-2xl border border-slate-700">
                <button
                  onClick={() => { sounds.playPop(); setAttackMode('root'); setExploitResult(null); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    attackMode === 'root'
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Dangerous Mode: sudo tshark
                </button>
                <button
                  onClick={() => { sounds.playPop(); setAttackMode('hardened'); setExploitResult(null); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    attackMode === 'hardened'
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Hardened Mode: wireshark group
                </button>
              </div>
            </div>

            {/* Arena Stage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-4 relative min-h-[160px]">
              
              {/* Attacker with Malformed Packet */}
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-center space-y-2">
                <div className="text-2xl">🦹‍♂️</div>
                <div className="text-xs font-black text-rose-400">Remote Attacker</div>
                <div className="text-[10px] text-slate-400">Crafting Malformed TCP Packet with Exploit Payload</div>
                <button
                  onClick={handleLaunchExploit}
                  disabled={isExploitRunning}
                  className="w-full px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-black rounded-xl text-xs transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1"
                >
                  <Bomb className="w-3.5 h-3.5" />
                  <span>{isExploitRunning ? 'Transmitting...' : 'Send Exploit Packet 💣'}</span>
                </button>
              </div>

              {/* Packet in Transit Animation */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase font-bold">Network Wire</span>
                <div className="w-full h-3 bg-slate-800 rounded-full relative overflow-hidden">
                  {isExploitRunning && (
                    <div className="w-6 h-3 bg-gradient-to-r from-rose-500 to-amber-400 rounded-full animate-packetFly absolute top-0" />
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">TCP Dissector Parsing...</span>
              </div>

              {/* Target Sniffer & Host OS */}
              <div className={`rounded-2xl p-4 border-2 transition-all space-y-2 ${
                exploitResult === 'hacked'
                  ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                  : exploitResult === 'defended'
                  ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold">Target VM Host</span>
                  {attackMode === 'root' ? (
                    <span className="text-[10px] font-black text-rose-400 bg-rose-950 px-2 py-0.5 rounded-full border border-rose-600">
                      UID 0 (ROOT)
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-teal-400 bg-teal-950 px-2 py-0.5 rounded-full border border-teal-600">
                      UID 1000 (UNPRIVILEGED)
                    </span>
                  )}
                </div>

                {exploitResult === 'hacked' && (
                  <div className="space-y-1 animate-fadeIn">
                    <div className="text-xs font-black text-rose-300 flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4 text-rose-400" />
                      <span>CRITICAL COMPROMISE!</span>
                    </div>
                    <p className="text-[10px] text-rose-200 leading-tight">
                      Because Wireshark ran as <strong>root</strong>, the dissector buffer overflow gave the attacker root shell access to the entire operating system!
                    </p>
                  </div>
                )}

                {exploitResult === 'defended' && (
                  <div className="space-y-1 animate-fadeIn">
                    <div className="text-xs font-black text-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>BLAST CONTAINED!</span>
                    </div>
                    <p className="text-[10px] text-emerald-200 leading-tight">
                      Wireshark ran via the <strong>wireshark group</strong> with least privilege. The crash is quarantined; the OS kernel and root files remained completely safe!
                    </p>
                  </div>
                )}

                {!exploitResult && (
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {attackMode === 'root' 
                      ? '⚠️ Warning: Running as root means any packet dissecting flaw grants full root access.' 
                      : '🛡️ Hardened: Only tiny dumpcap captures packets; UI has zero root power.'}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* Commands & Privilege Simulator */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Real Commands to run in VM */}
            <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-teal-600" />
                  <span>Hardening Setup in Your Real VM</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Non-Root Setup</span>
              </div>

              <div className="space-y-3">
                {SPRINT_0_STAGES.inspectorSetup.setupCommands.map((cmdItem) => (
                  <div key={cmdItem.step} className="bg-slate-900 rounded-2xl p-3 text-xs font-mono text-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-sans font-bold">
                      <span>Step {cmdItem.step}: {cmdItem.desc}</span>
                      <button
                        onClick={() => copyToClipboard(cmdItem.cmd, `c02_${cmdItem.step}`)}
                        className="flex items-center gap-1 text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                      >
                        {copiedCmd === `c02_${cmdItem.step}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-teal-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-teal-400 font-bold overflow-x-auto whitespace-pre">
                      {cmdItem.cmd}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Privilege Test Simulator */}
            <div className="bg-slate-950 rounded-3xl p-6 border-4 border-slate-800 shadow-xl flex flex-col justify-between space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 text-[11px] ml-2 font-sans font-bold">1-Second Capture Privilege Test</span>
                </div>
                <button
                  onClick={handleRunPrivilegeTest}
                  disabled={privilegeTestRunning}
                  className="px-3 py-1.5 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 text-slate-950 font-black rounded-xl font-sans text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-slate-950" />
                  <span>{privilegeTestRunning ? 'Sniffing 1s...' : 'Test Non-Root Capture'}</span>
                </button>
              </div>

              {/* Terminal Body */}
              <div className="space-y-1.5 flex-1 min-h-[160px] text-slate-300">
                {privilegeLogs.length > 0 ? (
                  privilegeLogs.map((line, idx) => (
                    <div 
                      key={idx} 
                      className={line.includes('PASS') ? 'text-teal-400 font-black font-sans py-1' : line.startsWith('$') ? 'text-slate-100 font-bold' : 'text-slate-400'}
                    >
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="text-slate-600 italic py-10 text-center font-sans">
                    Click "Test Non-Root Capture" above to verify packet sniff privileges without sudo.
                  </div>
                )}
              </div>

              {/* Privilege Status */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-sans">
                <span className="text-slate-400">Privilege Status:</span>
                {privilegeVerified ? (
                  <span className="text-teal-400 font-black flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> LEAST PRIVILEGE CONFIRMED
                  </span>
                ) : (
                  <span className="text-amber-400 font-bold">Awaiting Privilege Test</span>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SPRINT 0.3: IDENTIFYING THE HALLWAY DOOR (INTERFACES & HIGHWAY) */}
      {/* ========================================================================= */}
      {activeSubSprint === '0.3' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Card: ELI5 Explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                🚪
              </div>
              <div>
                <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">
                  Sub-Sprint 0.3 • Network Architecture
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Identifying the Hallway Door: Which Interface Carries Live Traffic?
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {SPRINT_0_STAGES.hallwayDoor.eli5Summary}
            </p>

            {/* CompTIA Takeaway Alert */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm text-indigo-950 font-medium space-y-1">
              <div className="flex items-center gap-2 font-black text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>CompTIA Security+ Exam Connection (Domain 4: Network Diagnostics):</span>
              </div>
              <p>{SPRINT_0_STAGES.hallwayDoor.whyCompTia}</p>
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_0_STAGES.hallwayDoor.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_0_STAGES.hallwayDoor.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: The 3 Doors & The Packet Highway */}
          <div className="bg-slate-950 rounded-3xl p-6 border-4 border-indigo-500/50 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🚪🏎️</span>
                <h4 className="font-black text-sm text-indigo-300">
                  LIVE ANIMATION: The 3 Doors & Live Packet Motion
                </h4>
              </div>

              <button
                onClick={handleDetectInterface}
                disabled={isRadarScanning}
                className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 text-white font-black rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>{isRadarScanning ? 'Radar Sweeping Doors...' : 'Scan & Spotlight Active Hallway Door 📡'}</span>
              </button>
            </div>

            {/* Live 3-Door Visual Chamber */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2 relative">
              
              {/* Radar Laser Sweep Overlay */}
              {isRadarScanning && (
                <div className="absolute inset-0 bg-indigo-500/10 pointer-events-none z-20 overflow-hidden rounded-2xl border border-indigo-400/50">
                  <div className="w-16 h-full bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent animate-laserSweep absolute top-0" />
                </div>
              )}

              {/* Door 1: lo Loopback */}
              <div className="bg-slate-900 rounded-2xl p-4 border-2 border-slate-800 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-slate-300">Door 1: lo (Loopback)</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">127.0.0.1</span>
                </div>

                {/* Animated Loopback Courier */}
                <div className="h-28 bg-slate-950 rounded-xl border border-slate-800 p-2 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="w-10 h-10 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center animate-spin">
                    <span className="text-base">🏃‍♂️</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono mt-2">Running in a closed circle</span>
                  <span className="text-[9px] text-rose-400 font-bold">0 Internet Packets Here!</span>
                </div>

                <div className="text-[11px] text-slate-400 font-sans">
                  "Mirror Door": When you ping 127.0.0.1, you are only chatting with yourself.
                </div>
              </div>

              {/* Door 2: enp0s3 Active Highway */}
              <div className={`rounded-2xl p-4 border-3 flex flex-col justify-between space-y-3 relative overflow-hidden transition-all ${
                interfaceDetected 
                  ? 'bg-emerald-950/40 border-emerald-400 shadow-lg shadow-emerald-900/50 scale-102 ring-2 ring-emerald-400/40'
                  : 'bg-slate-900 border-slate-700'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-emerald-300 flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>Door 2: enp0s3 / eth0</span>
                  </span>
                  <span className="text-[10px] font-black text-emerald-950 bg-emerald-400 px-2 py-0.5 rounded-full animate-pulse">
                    LIVE HIGHWAY
                  </span>
                </div>

                {/* Animated Multi-Packet Highway */}
                <div className="h-28 bg-slate-950 rounded-xl border border-emerald-500/40 p-2 flex flex-col justify-between relative overflow-hidden">
                  
                  {/* Highway Lane 1 */}
                  <div className="w-full h-5 border-b border-dashed border-slate-800 relative flex items-center">
                    <div className="animate-packetFly flex items-center gap-1 text-[10px] font-mono text-cyan-300 absolute">
                      <span>✉️</span>
                      <span>DNS :53</span>
                    </div>
                  </div>

                  {/* Highway Lane 2 */}
                  <div className="w-full h-5 border-b border-dashed border-slate-800 relative flex items-center">
                    <div className="animate-packetFly flex items-center gap-1 text-[10px] font-mono text-emerald-300 absolute" style={{ animationDelay: '0.9s' }}>
                      <span>🔒</span>
                      <span>TLS :443</span>
                    </div>
                  </div>

                  {/* Highway Lane 3 */}
                  <div className="w-full h-5 relative flex items-center">
                    <div className="animate-packetFly flex items-center gap-1 text-[10px] font-mono text-yellow-300 absolute" style={{ animationDelay: '1.6s' }}>
                      <span>🌐</span>
                      <span>HTTP :80</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-emerald-400 font-mono flex items-center justify-between pt-1 border-t border-slate-900">
                    <span>Gateway: 192.168.1.1</span>
                    <span>Live Packets: {livePacketsCount}</span>
                  </div>
                </div>

                <div className="text-[11px] text-emerald-200 font-sans font-bold">
                  {interfaceDetected 
                    ? '🎯 SPOTLIGHT LOCKED: This is your active outside hallway door!' 
                    : 'Carries all live packets between your VM and the Internet router.'}
                </div>
              </div>

              {/* Door 3: docker0 Virtual Bridge */}
              <div className="bg-slate-900 rounded-2xl p-4 border-2 border-slate-800 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-black text-slate-300">Door 3: docker0</span>
                  <span className="text-[10px] font-bold text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">172.17.0.1</span>
                </div>

                {/* Animated Docker Crate */}
                <div className="h-28 bg-slate-950 rounded-xl border border-slate-800 p-2 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="text-2xl">🐳📦</div>
                  <span className="text-[10px] text-slate-400 font-mono mt-1">Virtual Container Bridge</span>
                  <span className="text-[9px] text-slate-500 font-bold">Quiet (No internet host traffic)</span>
                </div>

                <div className="text-[11px] text-slate-400 font-sans">
                  "Container Door": Silent unless you are actively running containerized applications.
                </div>
              </div>

            </div>
          </div>

          {/* Commands & Automatic Route Detector */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Real Commands to run in VM */}
            <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-600" />
                  <span>How to Detect the Active Door in Your VM</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Route Check</span>
              </div>

              <div className="space-y-3">
                {SPRINT_0_STAGES.hallwayDoor.detectCommands.map((cmdItem) => (
                  <div key={cmdItem.step} className="bg-slate-900 rounded-2xl p-3 text-xs font-mono text-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-sans font-bold">
                      <span>Step {cmdItem.step}: {cmdItem.desc}</span>
                      <button
                        onClick={() => copyToClipboard(cmdItem.cmd, `c03_${cmdItem.step}`)}
                        className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                      >
                        {copiedCmd === `c03_${cmdItem.step}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-indigo-400 font-bold overflow-x-auto whitespace-pre">
                      {cmdItem.cmd}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Door Detector */}
            <div className="bg-slate-950 rounded-3xl p-6 border-4 border-slate-800 shadow-xl flex flex-col justify-between space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 text-[11px] ml-2 font-sans font-bold">Route & Interface Detector</span>
                </div>
                <button
                  onClick={handleDetectInterface}
                  disabled={isRadarScanning}
                  className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl font-sans text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>{isRadarScanning ? 'Detecting Route...' : 'Run Default Route Check'}</span>
                </button>
              </div>

              {/* Terminal Body */}
              <div className="space-y-1.5 flex-1 min-h-[160px] text-slate-300">
                {interfaceDetected ? (
                  <>
                    <div className="text-slate-100 font-bold">$ ip route show default</div>
                    <div className="text-indigo-300">default via 192.168.1.1 dev enp0s3 proto dhcp src 192.168.1.105 metric 100</div>
                    <div className="text-slate-100 font-bold">$ tshark -D</div>
                    <div className="text-slate-400">1. enp0s3 (Active Ethernet - Gateway reachable)</div>
                    <div className="text-slate-400">2. any (Pseudo-device that captures on all interfaces)</div>
                    <div className="text-slate-400">3. lo (Loopback)</div>
                    <div className="text-slate-400">4. docker0</div>
                    <div className="text-emerald-400 font-black font-sans pt-2">
                      🚪 [LOCKED] Hallway door identified: `enp0s3` is your active capture target!
                    </div>
                  </>
                ) : (
                  <div className="text-slate-600 italic py-10 text-center font-sans">
                    Click "Run Default Route Check" or "Scan & Spotlight" above to locate your live internet interface.
                  </div>
                )}
              </div>

              {/* Active Door Status */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-sans">
                <span className="text-slate-400">Active Door Status:</span>
                {interfaceDetected ? (
                  <span className="text-emerald-400 font-black flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> DOOR 2 (`enp0s3`) ACTIVE
                  </span>
                ) : (
                  <span className="text-amber-400 font-bold">Unidentified</span>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SPRINT 0 COMPLETION CELEBRATION CARD */}
      {/* ========================================================================= */}
      {isAllSprint0Done && (
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎉🛡️</span>
              <div>
                <span className="text-xs font-black uppercase text-emerald-200 tracking-wider">
                  Sprint 0 Verified • Pre-Flight Checks Complete!
                </span>
                <h3 className="text-2xl font-black">
                  Your VM is Hardened & Ready for Live Packet Sniffing!
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md font-black text-xs text-white border border-white/30">
              Safe Sandbox Ready: `~/secplus_wireshark`
            </div>
          </div>

          <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
            You have satisfied all 3 essential pre-flight requirements: created an isolated workspace, hardened packet capturing to follow the <strong>Principle of Least Privilege</strong> (non-root execution), and identified your active internet hallway door (<code>enp0s3 / eth0</code>).
          </p>

          <div className="pt-2 flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Ready for Next Phase: Sprint 1 (The X-Ray Glasses & Display Filters)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
