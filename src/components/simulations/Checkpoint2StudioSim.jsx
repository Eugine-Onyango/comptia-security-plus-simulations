import React, { useState } from 'react';
import { 
  Terminal, Play, ArrowLeft, Sparkles, BookOpen, Shield, 
  RotateCcw, CheckCircle2, ChevronRight, Copy, Check, 
  Monitor, Cpu, Globe, Network, ArrowRight, RefreshCw,
  HelpCircle, AlertCircle, Eye, Wifi, ExternalLink, Flame,
  CheckCircle, XCircle, Trash2, PlusCircle, AlertTriangle
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const CHECKPOINT2_STEPS = [
  {
    id: 'step1',
    stepNumber: 'Step 1',
    title: 'Check if iptables is Installed & Inspect Active Rulebase',
    shortTitle: '1. Check iptables -L',
    icon: '📋',
    commandKali: 'sudo iptables -L -n -v',
    commandWindows: null,
    objective: 'List all existing firewall chains (INPUT, FORWARD, OUTPUT) and confirm default policy is ACCEPT and no existing rules are blocking traffic.',
    explanation: 'sudo iptables -L lists all firewall rules. Adding -n prevents DNS resolution (shows raw IPs like 192.168.1.1 instead of hostnames), and -v shows packet counters.',
    kenyanMetaphor: 'The chief security guard opening his official blue logbook at the entrance gate to verify if any specific visitors are currently blacklisted on paper before morning operations begin.',
    whatHappens: 'Kali outputs the 3 standard chains: INPUT (incoming to Kali), FORWARD (passing through Kali), and OUTPUT (sent from Kali). By default, all chains show (policy ACCEPT 0 packets, 0 bytes) with an empty table.',
    screenshotHint: 'Terminal showing "Chain INPUT (policy ACCEPT)", "Chain FORWARD (policy ACCEPT)", and "Chain OUTPUT (policy ACCEPT)" with empty rule tables.',
    simulatedOutput: `┌──(kali㉿kali)-[~]
└─$ sudo iptables -L -n -v
Chain INPUT (policy ACCEPT 142 packets, 11420 bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain FORWARD (policy ACCEPT 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         

Chain OUTPUT (policy ACCEPT 110 packets, 12480 bytes)
 pkts bytes target     prot opt in     out     source               destination         
[OK] iptables is active with zero blocking rules.`
  },

  {
    id: 'step2',
    stepNumber: 'Step 2',
    title: 'Test Basic Baseline Connectivity from Windows Host',
    shortTitle: '2. Baseline Ping',
    icon: '🏓',
    commandKali: null,
    commandWindows: 'ping <Kali_IP>  # e.g. ping 192.168.100.75',
    objective: 'Verify that Windows can reach Kali BEFORE adding any firewall block rules so we have a clean benchmark baseline.',
    explanation: 'Sending 4 ICMP Echo Requests from Windows Command Prompt to Kali Linux. Because Kali default INPUT policy is ACCEPT, Kali responds immediately with 0% packet loss.',
    kenyanMetaphor: 'Giving a quick test greeting "Niaje" across the compound fence to your neighbor to confirm he is awake and listening before you start testing the gate locks.',
    whatHappens: 'Windows receives 4 replies in <1ms: "Reply from 192.168.100.75: bytes=32 time<1ms TTL=64". This proves physical & logical routing between Host and VM works 100%.',
    screenshotHint: 'Windows Command Prompt showing 4 successful replies from Kali IP with 0% packet loss.',
    simulatedOutput: `C:\\Users\\Student> ping 192.168.100.75

Pinging 192.168.100.75 with 32 bytes of data:
Reply from 192.168.100.75: bytes=32 time=0.74ms TTL=64
Reply from 192.168.100.75: bytes=32 time=0.81ms TTL=64
Reply from 192.168.100.75: bytes=32 time=0.69ms TTL=64
Reply from 192.168.100.75: bytes=32 time=0.72ms TTL=64

Ping statistics for 192.168.100.75:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss),
Approximate round trip times in milli-seconds:
    Minimum = 0ms, Maximum = 0ms, Average = 0ms`
  },

  {
    id: 'step3',
    stepNumber: 'Step 3',
    title: 'Block ICMP Traffic (Ping) Using iptables',
    shortTitle: '3. Block ICMP (Ping)',
    icon: '🚫',
    commandKali: 'sudo iptables -A INPUT -p icmp --icmp-type echo-request -j DROP',
    commandWindows: 'ping <Kali_IP>  # e.g. ping 192.168.100.75',
    objective: 'Append a rule (-A) to the INPUT chain matching protocol ICMP (--icmp-type echo-request) and jump (-j) to DROP.',
    explanation: 'When Windows sends an ICMP Echo Request (Type 8), Kali\'s Linux kernel silently drops the packet on the floor. It does not send any rejection message back to Windows.',
    kenyanMetaphor: 'Putting a sign on your front door: "DO NOT KNOCK". When the visitor comes and knocks on the gate, you sit silently in your living room and refuse to say "Nani huyo?". The visitor outside stands in the cold waiting forever until he gives up.',
    whatHappens: 'When you run "ping <Kali_IP>" from Windows, every single attempt prints: "Request timed out." After 4 attempts, Windows reports 100% loss (4 packets sent, 0 received)! Notice: Only ping is blocked; other web services like HTTP or SSH would still work!',
    screenshotHint: 'Split or sequential screenshot: Kali terminal showing iptables -A command executed without error, and Windows cmd showing "Request timed out" 4 times.',
    simulatedOutput: `[KALI TERMINAL]
┌──(kali㉿kali)-[~]
└─$ sudo iptables -A INPUT -p icmp --icmp-type echo-request -j DROP
┌──(kali㉿kali)-[~]
└─$ sudo iptables -L -n
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
DROP       icmp --  0.0.0.0/0            0.0.0.0/0            icmptype 8

[WINDOWS CMD - TEST RESULT]
C:\\Users\\Student> ping 192.168.100.75
Pinging 192.168.100.75 with 32 bytes of data:
Request timed out.
Request timed out.
Request timed out.
Request timed out.
Packets: Sent = 4, Received = 0, Lost = 4 (100% loss)`
  },

  {
    id: 'step4',
    stepNumber: 'Step 4',
    title: 'Remove the ICMP Block Rule & Restore Ping',
    shortTitle: '4. Remove ICMP Rule',
    icon: '♻️',
    commandKali: 'sudo iptables -D INPUT -p icmp --icmp-type echo-request -j DROP',
    commandWindows: 'ping <Kali_IP>  # e.g. ping 192.168.100.75',
    objective: 'Use -D (Delete) to remove the exact ICMP drop rule from the INPUT chain and verify pings return to normal.',
    explanation: '-D deletes the specified rule from the chain. Alternatively, "sudo iptables -F" (flush) can wipe all rules, but -D removes only this specific targeted rule.',
    kenyanMetaphor: 'Tearing down the "DO NOT KNOCK" notice from your front gate. Now when the neighbor knocks again, you immediately answer "Karibu ndani!"',
    whatHappens: 'Pinging from Windows immediately succeeds again with 0% loss and <1ms latency! The firewall no longer intercepts the ICMP packets.',
    screenshotHint: 'Kali terminal showing the -D command and Windows cmd showing successful replies resuming.',
    simulatedOutput: `[KALI TERMINAL]
┌──(kali㉿kali)-[~]
└─$ sudo iptables -D INPUT -p icmp --icmp-type echo-request -j DROP
┌──(kali㉿kali)-[~]
└─$ sudo iptables -L -n
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
# Table is clean!

[WINDOWS CMD - TEST RESULT]
C:\\Users\\Student> ping 192.168.100.75
Reply from 192.168.100.75: bytes=32 time=0.72ms TTL=64
Reply from 192.168.100.75: bytes=32 time=0.68ms TTL=64
Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
[SUCCESS] ICMP traffic fully restored!`
  },

  {
    id: 'step5',
    stepNumber: 'Step 5',
    title: 'Block the Entire Windows Host IP Address (Nuclear Option)',
    shortTitle: '5. Block Entire Host IP',
    icon: '🛑',
    commandKali: 'sudo iptables -A INPUT -s <Windows_IP> -j DROP  # e.g. -s 192.168.100.25',
    commandWindows: 'ping <Kali_IP> && curl http://<Kali_IP>',
    objective: 'Block ALL traffic (Ping, Web HTTP, SSH, FTP, etc.) originating specifically from the Windows Host IP address (-s).',
    explanation: '-s specifies the Source IP address. Any packet coming from this IP—regardless of protocol (TCP, UDP, ICMP) or port number—is immediately discarded.',
    kenyanMetaphor: 'Putting the photo of a rogue tenant or banned individual directly in the guardhouse: "ANY vehicle or person carrying this specific National ID is banned from entering the estate completely, whether they come on foot, on a boda-boda, or by car."',
    whatHappens: 'What is blocked? EVERYTHING! Ping gives "Request timed out". If you try opening a web page hosted on Kali in your Windows Chrome browser (http://<Kali_IP>), it spins forever and says "This site can\'t be reached / ERR_CONNECTION_TIMED_OUT". SSH from Windows also times out!',
    screenshotHint: 'Kali terminal showing "DROP all -- 192.168.100.25" and Windows cmd showing timed out ping and failed curl/browser connection.',
    simulatedOutput: `[KALI TERMINAL]
┌──(kali㉿kali)-[~]
└─$ sudo iptables -A INPUT -s 192.168.100.25 -j DROP
┌──(kali㉿kali)-[~]
└─$ sudo iptables -L -n -v
Chain INPUT (policy ACCEPT)
 pkts bytes target     prot opt in     out     source               destination         
    8   672 DROP       all  --  *      *       192.168.100.25       0.0.0.0/0           

[WINDOWS CMD - TEST RESULT]
C:\\Users\\Student> ping 192.168.100.75
Request timed out.
Request timed out.

C:\\Users\\Student> curl http://192.168.100.75
curl: (28) Failed to connect to 192.168.100.75 port 80: Timed out
[RESULT] ALL protocols and ports from Windows Host are completely blacklisted!`
  },

  {
    id: 'step6',
    stepNumber: 'Step 6',
    title: 'Remove the Entire Host Block & Restore Total Access',
    shortTitle: '6. Remove Host Block',
    icon: '🔓',
    commandKali: 'sudo iptables -D INPUT -s <Windows_IP> -j DROP  # e.g. -s 192.168.100.25',
    commandWindows: 'ping <Kali_IP>',
    objective: 'Remove the IP-specific block rule from the INPUT chain using -D and confirm that all communications are restored.',
    explanation: 'Deletes the source-based blacklist rule. Kali\'s INPUT chain returns to its default permissive state.',
    kenyanMetaphor: 'Removing the individual\'s photo from the security blacklist register after a dispute is settled. The person is once again allowed to enter the estate freely.',
    whatHappens: 'Windows can immediately ping Kali again, browse web pages on Kali, and connect via SSH or netcat without delay.',
    screenshotHint: 'Kali terminal showing clean iptables -L table and Windows cmd showing 4 successful replies.',
    simulatedOutput: `[KALI TERMINAL]
┌──(kali㉿kali)-[~]
└─$ sudo iptables -D INPUT -s 192.168.100.25 -j DROP
┌──(kali㉿kali)-[~]
└─$ sudo iptables -L -n
Chain INPUT (policy ACCEPT)
target     prot opt source               destination         
# No active blocking rules!

[WINDOWS CMD - TEST RESULT]
C:\\Users\\Student> ping 192.168.100.75
Reply from 192.168.100.75: bytes=32 time=0.76ms TTL=64
Reply from 192.168.100.75: bytes=32 time=0.71ms TTL=64
Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
[STATUS] Full network connectivity verified!`
  }
];

export default function Checkpoint2StudioSim({ onBack }) {
  const [activeStepId, setActiveStepId] = useState('step1');
  const [activeFilterStage, setActiveFilterStage] = useState('clean'); // 'clean', 'block_icmp', 'block_ip'
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [animRunning, setAnimRunning] = useState(false);
  const [animPacketType, setAnimPacketType] = useState('icmp'); // 'icmp' or 'http'
  const [animStatusText, setAnimStatusText] = useState('Ready to test packet');

  const activeStep = CHECKPOINT2_STEPS.find(s => s.id === activeStepId) || CHECKPOINT2_STEPS[0];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    sounds.playPop();
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleFirewallSimulation = (stage, pType = 'icmp') => {
    sounds.playPop();
    setActiveFilterStage(stage);
    setAnimPacketType(pType);
    setAnimRunning(true);
    setAnimStatusText(`Windows sending ${pType.toUpperCase()} packet to Kali... 🚀`);

    setTimeout(() => {
      if (stage === 'clean') {
        setAnimStatusText(`Kali Netfilter: No block rule matched! 🟢 Packet ACCEPTED!`);
        sounds.playSuccess();
      } else if (stage === 'block_icmp') {
        if (pType === 'icmp') {
          setAnimStatusText(`Kali Netfilter Rule: -p icmp -j DROP matched! 🛑 Packet SILENTLY DROPPED! Windows times out.`);
          sounds.playPop();
        } else {
          setAnimStatusText(`Kali Netfilter: Only ICMP is blocked, but ${pType.toUpperCase()} is allowed! 🟢 Packet ACCEPTED!`);
          sounds.playSuccess();
        }
      } else if (stage === 'block_ip') {
        setAnimStatusText(`Kali Netfilter Rule: -s 192.168.100.25 -j DROP matched! 🛑 ALL ${pType.toUpperCase()} traffic from Host DROPPED!`);
        sounds.playPop();
      }
      setAnimRunning(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-950 rounded-2xl border-2 border-slate-200 transition-all font-bold text-xs sm:text-sm shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-100 text-rose-950 border border-rose-300 rounded-full font-black text-xs">
            CompTIA Security+ Lab • Checkpoint 2: Linux iptables Practical
          </span>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-rose-400 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl sm:text-5xl">🛡️🐧</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-rose-600 text-white rounded-full font-black text-xs uppercase">
                Checkpoint 2 Solution
              </span>
              <span className="text-xs text-slate-500 font-bold">Practical Task 5: iptables on Kali Linux</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Checkpoint 2: Testing iptables Firewall Controls
            </h1>
            <p className="text-slate-600 font-medium text-xs sm:text-base">
              Step-by-step commands, explanations of what happens, what is blocked vs allowed, Nairobi gatekeeper analogies, and moving packet drop animations!
            </p>
          </div>
        </div>

        {/* Horizontal Step Selector Ribbon */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-2 px-2 sm:mx-0 sm:px-0">
          {CHECKPOINT2_STEPS.map((step) => {
            const isActive = activeStepId === step.id;
            return (
              <button
                key={step.id}
                onClick={() => { sounds.playPop(); setActiveStepId(step.id); }}
                className={`px-3.5 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 border-2 ${
                  isActive
                    ? 'bg-rose-600 border-rose-700 text-white shadow-md shadow-rose-200 scale-102'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{step.icon}</span>
                <span>{step.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* LIVE INTERACTIVE MOVING PACKET GATE ANIMATION */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 rounded-3xl p-5 sm:p-7 border-4 border-rose-500/50 shadow-2xl space-y-5 text-white">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏃‍♂️🛡️</span>
              <h3 className="font-black text-lg text-rose-300">
                LIVE MOVING ANIMATION: The iptables Netfilter Gate in Action
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Click the firewall states below to watch whether incoming packets pass through or get dropped!
            </p>
          </div>

          {/* Action trigger buttons */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() => handleFirewallSimulation('clean', 'icmp')}
              disabled={animRunning}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeFilterStage === 'clean'
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>🟢 State 1: Clean (Allow All)</span>
            </button>

            <button
              onClick={() => handleFirewallSimulation('block_icmp', 'icmp')}
              disabled={animRunning}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeFilterStage === 'block_icmp' && animPacketType === 'icmp'
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>🟡 State 2: Drop Ping (ICMP)</span>
            </button>

            <button
              onClick={() => handleFirewallSimulation('block_icmp', 'http')}
              disabled={animRunning}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeFilterStage === 'block_icmp' && animPacketType === 'http'
                  ? 'bg-sky-500 border-sky-400 text-slate-950 shadow-lg shadow-sky-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>🌐 Send Web (HTTP) during ICMP Drop</span>
            </button>

            <button
              onClick={() => handleFirewallSimulation('block_ip', 'all')}
              disabled={animRunning}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeFilterStage === 'block_ip'
                  ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>🔴 State 3: Drop Whole Host IP</span>
            </button>
          </div>
        </div>

        {/* Moving Stage Canvas */}
        <div className="relative bg-slate-900/90 rounded-2xl p-5 border border-slate-800 min-h-[220px] flex flex-col justify-between overflow-hidden">
          
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400">
              Active Rule:{' '}
              <strong className={
                activeFilterStage === 'clean' ? 'text-emerald-400' :
                activeFilterStage === 'block_icmp' ? 'text-amber-400' : 'text-rose-400'
              }>
                {activeFilterStage === 'clean' && 'No Rules (policy ACCEPT)'}
                {activeFilterStage === 'block_icmp' && 'iptables -A INPUT -p icmp -j DROP'}
                {activeFilterStage === 'block_ip' && 'iptables -A INPUT -s <Windows_IP> -j DROP'}
              </strong>
            </span>

            <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
              animRunning ? 'bg-amber-400 text-slate-950 animate-pulse' : 'bg-slate-800 text-slate-300'
            }`}>
              {animStatusText}
            </span>
          </div>

          {/* Graphical Nodes */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 items-center my-4 relative">
            
            {/* Windows Host Node */}
            <div className="p-4 rounded-2xl border border-slate-700 bg-slate-950 text-center space-y-1.5">
              <div className="text-3xl">💻</div>
              <div className="font-black text-xs text-white">Windows Host</div>
              <div className="text-[11px] font-mono text-cyan-300">IP: 192.168.100.25</div>
              <span className="text-[10px] text-slate-400 block">Sender of requests</span>
            </div>

            {/* The iptables Firewall Gate */}
            <div className={`p-4 rounded-2xl border text-center space-y-1.5 relative transition-all ${
              activeFilterStage === 'clean' ? 'bg-emerald-950/40 border-emerald-500/50' :
              activeFilterStage === 'block_icmp' ? 'bg-amber-950/40 border-amber-500/50' :
              'bg-rose-950/60 border-rose-500/60 ring-2 ring-rose-500/40'
            }`}>
              <div className="text-3xl">
                {activeFilterStage === 'clean' ? '🚪' : activeFilterStage === 'block_icmp' ? '🚧' : '🛑'}
              </div>
              <div className="font-black text-xs text-white">Kali iptables Netfilter</div>
              <div className="text-[11px] font-mono text-slate-300">Chain: INPUT</div>

              {/* Status Badge */}
              <div className="mt-1">
                <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                  activeFilterStage === 'clean' ? 'bg-emerald-500/20 text-emerald-300' :
                  activeFilterStage === 'block_icmp' ? 'bg-amber-500/20 text-amber-300' :
                  'bg-rose-500/20 text-rose-300'
                }`}>
                  {activeFilterStage === 'clean' && 'Passing all packets'}
                  {activeFilterStage === 'block_icmp' && 'Dropping ICMP echo'}
                  {activeFilterStage === 'block_ip' && 'All Host packets DROPPED'}
                </span>
              </div>
            </div>

            {/* Kali Linux System / Applications */}
            <div className="p-4 rounded-2xl border border-slate-700 bg-slate-950 text-center space-y-1.5">
              <div className="text-3xl">🐧</div>
              <div className="font-black text-xs text-white">Kali OS & Web Server</div>
              <div className="text-[11px] font-mono text-emerald-400">IP: 192.168.100.75</div>
              <span className="text-[10px] text-slate-400 block">Target destination</span>
            </div>

          </div>

          {/* Bottom Metaphor Strip */}
          <div className="p-3 bg-slate-950/90 rounded-xl border border-slate-800 text-xs font-medium text-amber-200">
            <span className="font-black mr-1 text-white">🇰🇪 Nairobi Analogy:</span>
            {activeFilterStage === 'clean' && 'Gate is wide open with an empty visitor book. Delivery boys and visitors walk straight through without questions.'}
            {activeFilterStage === 'block_icmp' && animPacketType === 'icmp' && 'The gate watchman is told: "If someone just knocks to say hello (ping), ignore him!" But if someone brings a parcel (HTTP/Web), let him through.'}
            {activeFilterStage === 'block_icmp' && animPacketType === 'http' && 'Demonstrates Granular Filtering: Ping is blocked, but Web (Port 80/HTTP) still works! Firewalls inspect protocol type before deciding.'}
            {activeFilterStage === 'block_ip' && 'Full IP Blacklist: The gatekeeper has Windows\' photo on the blacklist wall. Even if Windows comes on foot (ping) or in a taxi (HTTP/SSH), the gate stays permanently shut!'}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* DETAILED STEP BREAKDOWN WORKSPACE */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: Step Details & Questions Answered (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="bg-white rounded-3xl p-6 border-3 border-rose-200 shadow-md space-y-5">
            
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600 font-black text-xs uppercase tracking-wider">
                <span>Checkpoint 2 • {activeStep.stepNumber}</span>
                <span>•</span>
                <span>iptables Guide</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {activeStep.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                {activeStep.objective}
              </p>
            </div>

            {/* Commands Box */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                Exact Commands to Execute for {activeStep.stepNumber}:
              </span>

              {/* Kali Command */}
              {activeStep.commandKali && (
                <div className="bg-slate-950 rounded-2xl p-3.5 space-y-1 text-white font-mono">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-sans font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">🐧</span>
                      <span>Run on Kali Linux Terminal:</span>
                    </span>
                    <button
                      onClick={() => handleCopy(activeStep.commandKali.split('#')[0].trim())}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer font-sans"
                    >
                      {copiedCmd === activeStep.commandKali.split('#')[0].trim() ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-amber-300 font-bold overflow-x-auto no-scrollbar py-1">
                    $ {activeStep.commandKali}
                  </div>
                </div>
              )}

              {/* Windows Command */}
              {activeStep.commandWindows && (
                <div className="bg-slate-900 rounded-2xl p-3.5 space-y-1 text-white font-mono border border-slate-800">
                  <div className="flex items-center justify-between text-xs text-slate-400 font-sans font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="text-base">💻</span>
                      <span>Run on Windows Host (Command Prompt):</span>
                    </span>
                    <button
                      onClick={() => handleCopy(activeStep.commandWindows.split('#')[0].trim())}
                      className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1 transition-all active:scale-95 cursor-pointer font-sans"
                    >
                      {copiedCmd === activeStep.commandWindows.split('#')[0].trim() ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy</span>
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-cyan-300 font-bold overflow-x-auto no-scrollbar py-1">
                    C:\&gt; {activeStep.commandWindows}
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Explanation & Kenyan Analogy */}
            <div className="p-4 rounded-2xl bg-rose-50/70 border-2 border-rose-200 space-y-3 text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="font-black text-rose-950 uppercase text-xs block">Technical Meaning in Plain English:</span>
                <p className="text-slate-700 font-medium leading-relaxed">{activeStep.explanation}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-rose-200 text-rose-950 space-y-1">
                <div className="flex items-center gap-1.5 font-black">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Reality:</span>
                </div>
                <p className="italic text-slate-700">{activeStep.kenyanMetaphor}</p>
              </div>

              <div className="space-y-1 pt-1">
                <span className="font-black text-slate-900 uppercase text-xs block">What Happens (Observation for Lab Writeup):</span>
                <p className="text-slate-700 font-medium leading-relaxed whitespace-pre-line">{activeStep.whatHappens}</p>
              </div>
            </div>

            {/* Screenshot Hint Alert */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 font-medium space-y-1">
              <div className="flex items-center gap-2 font-black text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Proof Screenshot to take for {activeStep.stepNumber}:</span>
              </div>
              <p>{activeStep.screenshotHint}</p>
            </div>

          </div>

        </div>

        {/* RIGHT: Live Simulated Terminal Screen (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-950 rounded-3xl p-4 sm:p-5 border-4 border-slate-800 shadow-xl space-y-3 font-mono text-white">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-400 pl-2">Terminal Verification Screen</span>
              </div>

              <span className="text-[10px] text-slate-500">Live Sample</span>
            </div>

            <div className="text-xs text-slate-400 font-sans">
              Exact expected terminal log output for {activeStep.stepNumber}:
            </div>

            {/* Code Output Screen */}
            <div className="p-3 bg-black/70 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre leading-relaxed max-h-[460px] no-scrollbar">
              {activeStep.simulatedOutput}
            </div>

            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400 font-sans">
              <span>Ready for copy & paste</span>
              <button
                onClick={() => handleCopy(activeStep.simulatedOutput)}
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedCmd === activeStep.simulatedOutput ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd === activeStep.simulatedOutput ? 'Copied Output' : 'Copy Output'}</span>
              </button>
            </div>

          </div>

          {/* CompTIA Core Concept Takeaway */}
          <div className="bg-white rounded-3xl p-5 border-3 border-slate-200 shadow-sm space-y-2.5 text-xs">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span>CompTIA Exam Mastery Notes:</span>
            </h4>

            <div className="space-y-2 text-slate-700 leading-relaxed font-medium">
              <div>
                <strong className="text-slate-900">-A vs -D:</strong> <code>-A</code> appends a rule to the end of a chain. <code>-D</code> deletes that exact rule.
              </div>
              <div>
                <strong className="text-slate-900">DROP vs REJECT:</strong> <code>DROP</code> discards silently (causing ping to time out). <code>REJECT</code> sends back an ICMP Destination Unreachable message.
              </div>
              <div>
                <strong className="text-slate-900">Protocol vs IP Filter:</strong> Blocking <code>-p icmp</code> only stops pings; web browsing still works. Blocking <code>-s &lt;IP&gt;</code> stops everything from that device.
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
