import React from 'react';
import { Shield, Cpu, Lock, FileText, CheckCircle2, ChevronRight, Sparkles, Trophy, Compass, Landmark, ShieldAlert, Sliders } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function HomePage({ onSelectDomain }) {
  const handleSelect = (domainId) => {
    sounds.playSuccess();
    onSelectDomain(domainId);
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-10">
      
      {/* Hero Section */}
      <div class="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-10 text-white shadow-xl shadow-amber-200/60 overflow-hidden">
        
        {/* Background Decorative Circles */}
        <div class="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div class="absolute right-40 -top-10 w-48 h-48 bg-yellow-300/20 rounded-full blur-xl pointer-events-none" />

        <div class="relative z-10 space-y-4 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-extrabold backdrop-blur-md">
            <Sparkles class="w-4 h-4 text-yellow-300" />
            <span>CompTIA Security+ SY0-701 Practice Platform</span>
          </div>

          <h1 class="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Security+ Interactive Simulations & Exam Practice! 🛡️⚡
          </h1>

          <p class="text-amber-100 font-medium text-sm sm:text-base leading-relaxed">
            Welcome to the ultimate Sec+ visual playground! Learn acronyms with interactive live animations or practice CompTIA Security+ scenario-based MCQs with randomized option shuffling and layman's explanations!
          </p>

          {/* Quick Stats Bar */}
          <div class="pt-2 flex flex-wrap gap-4 text-xs font-bold">
            <div class="bg-white/15 px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-emerald-300" />
              <span>Domain 1.0 (12 Active Modules)</span>
            </div>
            <div class="bg-white/15 px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-yellow-300" />
              <span>Domain 2.0 (32 MCQ Modules)</span>
            </div>
            <div class="bg-white/15 px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-emerald-300" />
              <span>Domain 3.0 (13 Active Modules)</span>
            </div>
            <div class="bg-white/15 px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-blue-300" />
              <span>Domain 4.0 (Secure Baselines MCQs)</span>
            </div>
            <div class="bg-white/15 px-3.5 py-2 rounded-xl backdrop-blur-sm flex items-center gap-2">
              <CheckCircle2 class="w-4 h-4 text-purple-300" />
              <span>Domain 5.0 (12 Active Modules)</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Domains Section */}
      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Exam Domains
            </h2>
            <p class="text-slate-500 font-medium text-sm">
              Select an exam domain to explore simulations or practice exam questions.
            </p>
          </div>

          <div class="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-700 bg-amber-100/80 px-3 py-1.5 rounded-full">
            <Trophy class="w-4 h-4 text-amber-600" />
            <span>Interactive & Shuffled Mode</span>
          </div>
        </div>

        {/* Domain Cards Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* FEATURED: Official Exam Question Bank Vault */}
          <div 
            onClick={() => handleSelect('exam_bank')}
            class="group bg-gradient-to-br from-purple-700 via-indigo-700 to-purple-900 text-white rounded-3xl p-6 border-4 border-amber-400 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-yellow-300 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4" />
                  <span>DUMPS_BASE.pdf • 227 Questions Bank</span>
                </div>
                <span class="px-3 py-1 bg-amber-400 text-amber-950 font-black text-xs rounded-full shadow-sm">
                  NEW DEDICATED VAULT
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  📜
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-yellow-300 transition-colors">
                    Official CompTIA Security+ Exam Question Bank
                  </h3>
                  <p class="text-purple-100 text-sm font-medium mt-1">
                    Practice all 227 official exam dump questions from <strong>DUMPS_BASE.pdf</strong> in a clean, dedicated hub with verified answers, layman explanations, and option shuffling!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/10 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Batch 1 (Q1-Q20 Active)</span>
                <span class="px-3 py-1 bg-white/10 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Option Shuffling (A, B, C, D)</span>
                <span class="px-3 py-1 bg-white/10 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Layman's Terms & Distractor Breakdown</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-purple-500/50 flex items-center justify-between text-yellow-300 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                <span>Open Dedicated Exam Question Bank Vault →</span>
              </span>
              <span class="px-3 py-1 bg-amber-400 text-amber-950 rounded-full font-black text-xs">
                Enter Vault 📜
              </span>
            </div>
          </div>

          {/* FEATURED: The Port Grand Hotel & Live Courier Simulation */}
          <div 
            onClick={() => handleSelect('ports_sim')}
            class="group bg-gradient-to-br from-amber-500 via-orange-500 to-amber-600 text-white rounded-3xl p-6 border-4 border-yellow-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-yellow-100 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-yellow-300" />
                  <span>CompTIA Security+ SY0-701 Core Ports Master</span>
                </div>
                <span class="px-3 py-1 bg-white text-orange-950 font-black text-xs rounded-full shadow-sm">
                  LIVE INTERACTIVE STUDIO
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🚪
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-yellow-200 transition-colors">
                    The Port Hotel & Security Courier Simulation 🏨🏃‍♂️
                  </h3>
                  <p class="text-amber-100 text-sm font-medium mt-1">
                    Understand ports with the 65,535-room hotel metaphor! Watch the live courier walk the wire with your packets, contrast <strong>Cleartext vs. Encrypted Twins</strong> (HTTP :80 vs HTTPS :443, Telnet :23 vs SSH :22, FTP :21 vs SFTP :22), and play the <strong>Firewall Bouncer Exam Challenge</strong>!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">The Hotel Explorer (16 Key Sec+ Doors)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Live Wiretap Courier Animation</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Firewall Bouncer Mini-Game</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-400/50 flex items-center justify-between text-yellow-100 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-yellow-300 group-hover:translate-x-1 transition-transform" />
                <span>Launch Ports Hotel Live Simulation Studio →</span>
              </span>
              <span class="px-3 py-1 bg-white text-amber-950 rounded-full font-black text-xs">
                Launch Live Studio 🚪
              </span>
            </div>
          </div>

          {/* FEATURED: The Firewall Security Gate & ACL Studio */}
          <div 
            onClick={() => handleSelect('firewall_sim')}
            class="group bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-900 text-white rounded-3xl p-6 border-4 border-emerald-400 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-300 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-emerald-300" />
                  <span>CompTIA Security+ SY0-701 Network Security Master</span>
                </div>
                <span class="px-3 py-1 bg-emerald-400 text-emerald-950 font-black text-xs rounded-full shadow-sm">
                  NEW LIVE INTERACTIVE MODULE
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🛡️
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-300 transition-colors">
                    The Firewall Security Gate & ACL Studio 🚧🏓
                  </h3>
                  <p class="text-indigo-100 text-sm font-medium mt-1">
                    Master the TCP 3-Way Handshake (<strong>SYN ➡️ SYN-ACK ➡️ ACK</strong>), test <strong>Stateful vs Stateless State Tables</strong>, experiment in the <strong>Linux Firewall Sandbox (iptables, ufw, firewalld)</strong>, contrast <strong>Packet Filters vs. NGFW vs. WAF</strong>, and solve <strong>6 CompTIA PBQ troubleshooting tickets</strong>!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Handshake & State Table</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Linux iptables • ufw • firewalld</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Packet Filter vs NGFW vs WAF</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">6 CompTIA PBQ Scenarios (DMZ, NAT, Egress)</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-400/40 flex items-center justify-between text-emerald-300 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                <span>Launch Firewall & ACL Live Studio →</span>
              </span>
              <span class="px-3 py-1 bg-emerald-400 text-emerald-950 rounded-full font-black text-xs">
                Launch Live Studio 🛡️
              </span>
            </div>
          </div>

          {/* FEATURED: The Packet Inspector & Wireshark Forensic Lab */}
          <div 
            onClick={() => handleSelect('pcap_sim')}
            class="group bg-gradient-to-br from-sky-600 via-indigo-700 to-slate-900 text-white rounded-3xl p-6 border-4 border-sky-400 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-sky-200 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-sky-300" />
                  <span>CompTIA Security+ SY0-701 Packet Analysis & Forensics</span>
                </div>
                <span class="px-3 py-1 bg-sky-300 text-sky-950 font-black text-xs rounded-full shadow-sm">
                  LIVE INTERACTIVE MODULE
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  📦
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-sky-300 transition-colors">
                    The Packet Inspector & Wireshark Forensic Lab 🔬🦈
                  </h3>
                  <p class="text-sky-100 text-sm font-medium mt-1">
                    Unwrap the 4-layer Russian nesting doll of network headers (<strong>Ethernet MAC ➡️ IP ➡️ TCP/UDP ➡️ Payload</strong>), inspect packets in our live <strong>Wireshark Mini-Lab</strong>, compare <strong>NetFlow vs. Full PCAP</strong>, and solve <strong>Forensic Incident Cases</strong> (Cleartext passwords, ARP Poisoning, and DNS Tunneling)!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">The X-Ray Packet Unwrapper</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Wireshark Mini-Lab & Follow TCP Stream</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">NetFlow Phone Bill vs PCAP Wiretap</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Packet Detective PBQ Challenges</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-400/40 flex items-center justify-between text-sky-200 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-sky-300 group-hover:translate-x-1 transition-transform" />
                <span>Launch Packet Inspector & Wireshark Studio →</span>
              </span>
              <span class="px-3 py-1 bg-sky-300 text-sky-950 rounded-full font-black text-xs">
                Launch Live Lab 🔬
              </span>
            </div>
          </div>

          {/* FEATURED: The Nmap Radar & Network Recon Lab */}
          <div 
            onClick={() => handleSelect('nmap_sim')}
            class="group bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white rounded-3xl p-6 border-4 border-emerald-400 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-emerald-200 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-emerald-300" />
                  <span>CompTIA Security+ SY0-701 Domain 4.3 Network Reconnaissance</span>
                </div>
                <span class="px-3 py-1 bg-emerald-400 text-emerald-950 font-black text-xs rounded-full shadow-sm">
                  NEW LIVE RECON MODULE
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  📡
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-emerald-300 transition-colors">
                    The Nmap Radar & Network Recon Lab 📡💻
                  </h3>
                  <p class="text-emerald-100 text-sm font-medium mt-1">
                    Demystify port scanning without the confusion! Watch the <strong>"Ding-Dong Ditch" Stealth SYN scan (-sS)</strong> vs <strong>Full Connect scan (-sT)</strong> in action, understand port states (<strong>open, closed, filtered</strong>), dissect terminal scan outputs line-by-line, and master <strong>CompTIA PBQ reconnaissance scenarios</strong>!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Ding-Dong Ditch (-sS) vs Full Connect (-sT) Animation</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Port States: Open vs Closed vs Filtered (Firewall)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Interactive Terminal Sandbox & Flag Dissector</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">CompTIA PBQ Recon Master Challenge</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-emerald-400/40 flex items-center justify-between text-emerald-200 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform" />
                <span>Launch Nmap Radar & Recon Live Studio →</span>
              </span>
              <span class="px-3 py-1 bg-emerald-400 text-emerald-950 rounded-full font-black text-xs">
                Launch Recon Lab 📡
              </span>
            </div>
          </div>

          {/* FEATURED: Wireshark Packet Odyssey (Sprint-by-Sprint Field Lab) */}
          <div 
            onClick={() => handleSelect('wireshark_odyssey')}
            class="group bg-gradient-to-br from-cyan-700 via-sky-800 to-indigo-900 text-white rounded-3xl p-6 border-4 border-cyan-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-cyan-200 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-cyan-300" />
                  <span>Hands-On Field Lab • 6 Sprints Roadmap</span>
                </div>
                <span class="px-3 py-1 bg-cyan-400 text-slate-950 font-black text-xs rounded-full shadow-sm">
                  SPRINT 0 READY: PREP & SAFETY ZONE
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🦈
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-cyan-300 transition-colors">
                    Wireshark Packet Odyssey: Sprint-by-Sprint Field Lab 🦈🔍
                  </h3>
                  <p class="text-cyan-100 text-sm font-medium mt-1">
                    Master network analysis without the confusion! Follow a proven 6-stage roadmap starting from <strong>Sprint 0: The Prep & Safety Zone</strong> (Safe Corner Sandbox, Non-Root Hardened Capture, and Hallway Door Detection), moving sequentially through X-Ray packet sniffing, cleartext vs. encryption, handshakes, and catching attackers!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Sprint 0: Sandbox & Privilege Hardening</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Sprint 1: X-Ray Packet Filters</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Sprint 2: Plaintext vs. Locked Box</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Sprint 3: TCP Handshakes & Scans</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Sprint 4: Attacker Analysis (ARP, DoS, DNS)</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-cyan-400/40 flex items-center justify-between text-cyan-200 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-cyan-300 group-hover:translate-x-1 transition-transform" />
                <span>Enter Wireshark Packet Odyssey (Sprint 0) →</span>
              </span>
              <span class="px-3 py-1 bg-cyan-300 text-slate-950 rounded-full font-black text-xs">
                Enter Sprint 0 🦈
              </span>
            </div>
          </div>

          {/* FEATURED: CompTIA CLI & Commands Master Drill */}
          <div 
            onClick={() => handleSelect('command_drills')}
            class="group bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 text-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-amber-100 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-amber-200 animate-bounce" />
                  <span>Exam Survival Weapon • Zero Tech Jargon</span>
                </div>
                <span class="px-3 py-1 bg-white text-amber-950 font-black text-xs rounded-full shadow-sm">
                  KENYAN ANALOGIES & SHELL SANDBOX ⚡
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  💻
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-200 transition-colors">
                    CompTIA Command Line Master Drill ⚡💻
                  </h3>
                  <p class="text-amber-100 text-sm font-medium mt-1">
                    Master the high-yield terminal commands tested on Security+! Explore <strong>tcpdump & tshark</strong>, <strong>iptables, ufw & firewalld</strong>, <strong>Nmap recon scans (-sS, -sV, -sC, -O)</strong>, and <strong>forensic tools (netstat, arp -a, dig, curl)</strong> with everyday Kenyan street analogies and live terminal output simulation!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Wireshark & tcpdump (-nn, -w, -c, POST filters)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Linux Firewalls (iptables INPUT DROP, ufw, firewalld)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Nmap Recon Radar (Stealth SYN -sS vs Full Connect -sT)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Host Forensics (netstat -ano, arp -a MITM, dig, curl -I)</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-300/40 flex items-center justify-between text-amber-100 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-amber-200 group-hover:translate-x-1 transition-transform" />
                <span>Launch Interactive Command Drill & Sandbox →</span>
              </span>
              <span class="px-3 py-1 bg-white text-amber-950 rounded-full font-black text-xs">
                Launch CLI Drills ⚡
              </span>
            </div>
          </div>

          {/* FEATURED: Checkpoint 1 (Virtualization & Networking Discovery) */}
          <div 
            onClick={() => handleSelect('checkpoint1')}
            class="group bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-950 text-white rounded-3xl p-6 border-4 border-indigo-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-indigo-200 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-indigo-300 animate-bounce" />
                  <span>Hands-on Lab Solution • Zero Hallucination</span>
                </div>
                <span class="px-3 py-1 bg-rose-500 text-white font-black text-xs rounded-full shadow-sm">
                  CHECKPOINT 1 MASTER GUIDE 🎯
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🐧🔌
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-indigo-300 transition-colors">
                    Checkpoint 1: Virtualization, Networking & Web Service Discovery 🎯
                  </h3>
                  <p class="text-indigo-100 text-sm font-medium mt-1">
                    Solve all 4 lab exercises step-by-step without confusion! Master <strong>Kali Linux installation & verification</strong>, <strong>ping 8.8.8.8</strong>, <strong>traceroute hop mapping</strong>, <strong>IP discovery (ip a vs ipconfig)</strong>, and <strong>VirtualBox NAT vs Bridged Adapter modes</strong> with live moving packet animations and Nairobi analogies!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Task 1: VirtualBox Kali Setup & ip a</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Task 2: ping 8.8.8.8 & Google DNS Objectives</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Task 2.1: traceroute 8.8.8.8 & Hop-by-Hop Breakdown</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Task 3: Host vs VM Ping (One-Way NAT Isolation)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Task 4: NAT vs Bridged Adapter Live Simulation</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-400/40 flex items-center justify-between text-indigo-200 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-indigo-300 group-hover:translate-x-1 transition-transform" />
                <span>Open Checkpoint 1 Lab Guide & Simulator →</span>
              </span>
              <span class="px-3 py-1 bg-indigo-400 text-indigo-950 rounded-full font-black text-xs">
                Open Checkpoint 1 🎯
              </span>
            </div>
          </div>

          {/* FEATURED: Checkpoint 2 (iptables Firewall Lab) */}
          <div 
            onClick={() => handleSelect('checkpoint2')}
            class="group bg-gradient-to-br from-rose-700 via-orange-800 to-slate-950 text-white rounded-3xl p-6 border-4 border-rose-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-rose-200 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-rose-300 animate-bounce" />
                  <span>Lab Task 5 Solution • Zero Hallucination</span>
                </div>
                <span class="px-3 py-1 bg-white text-rose-950 font-black text-xs rounded-full shadow-sm">
                  CHECKPOINT 2: IPTABLES MASTER GUIDE 🛡️
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🛡️🐧
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-rose-200 transition-colors">
                    Checkpoint 2: Practical iptables Firewall Controls on Kali 🛡️
                  </h3>
                  <p class="text-rose-100 text-sm font-medium mt-1">
                    Master Linux packet filtering step-by-step! Learn how to inspect the rulebase (<strong>iptables -L -n -v</strong>), establish a clean ping baseline, block ICMP pings (<strong>-p icmp -j DROP</strong>), remove rules (<strong>-D</strong>), and blackhole an entire host IP address (<strong>-s &lt;IP&gt; -j DROP</strong>) with live interactive packet gate simulations!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Step 1: Check iptables -L & Active Chains</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Step 2: Baseline Host-to-VM Ping</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Step 3: Block ICMP (-p icmp -j DROP) & Observe</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Step 4: Delete Rule (-D INPUT) & Restore</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Step 5: Blacklist Entire Host IP (-s &lt;IP&gt;)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Step 6: Remove Host Block & Verify</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-rose-400/40 flex items-center justify-between text-rose-200 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-rose-300 group-hover:translate-x-1 transition-transform" />
                <span>Open Checkpoint 2 iptables Guide & Simulator →</span>
              </span>
              <span class="px-3 py-1 bg-rose-400 text-slate-950 rounded-full font-black text-xs">
                Open Checkpoint 2 🛡️
              </span>
            </div>
          </div>

          {/* FEATURED: PrepSet Exam Simulator (Hard-Mode Scenario Practice) */}
          <div 
            onClick={() => handleSelect('prepset_domain1')}
            class="group bg-gradient-to-br from-amber-600 via-amber-700 to-orange-900 text-white rounded-3xl p-6 border-4 border-amber-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-amber-100 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-amber-200 animate-bounce" />
                  <span>Exam-Grade Scenario Simulator • Zero Predictable Answers</span>
                </div>
                <span class="px-3 py-1 bg-white text-amber-950 font-black text-xs rounded-full shadow-sm">
                  PREPSET EXAM BANK: DOMAIN 1.0 BATCH 1 🏛️
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🏛️🎯
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-amber-200 transition-colors">
                    PrepSet Advanced Exam Bank: Domain 1.0 (General Security Concepts) 🏛️
                  </h3>
                  <p class="text-amber-100 text-sm font-medium mt-1">
                    Step up to realistic CompTIA certification exam difficulty! Practice tough, scenario-driven questions on <strong>Zero Trust Architecture (PDP vs PEP)</strong>, <strong>Perfect Forward Secrecy & Ephemeral Diffie-Hellman</strong>, <strong>OCSP Stapling</strong>, <strong>SAML 2.0 Web SSO</strong>, and <strong>Control Classifications</strong> with full distractor autopsies and Kenyan analogies!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q1: NIST Zero Trust Architecture (PDP vs PEP vs Data Plane)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q2: Key Exchange & Perfect Forward Secrecy (DHE / ECDHE)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q3: High-Volume Certificate Validation (OCSP Stapling)</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q4: Cloud Federation & SAML Service Provider Flows</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q5: Functional Control Types (Deterrent, Preventive, Detective)</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-400/40 flex items-center justify-between text-amber-100 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-amber-200 group-hover:translate-x-1 transition-transform" />
                <span>Launch PrepSet Domain 1.0 Exam Simulator (50 Scenarios) →</span>
              </span>
              <span class="px-3 py-1 bg-white text-amber-950 rounded-full font-black text-xs">
                Start Domain 1.0 🏛️
              </span>
            </div>
          </div>

          {/* FEATURED: PrepSet Domain 2.0 Exam Simulator (Threats, Vulnerabilities & Mitigations) */}
          <div 
            onClick={() => handleSelect('prepset_domain2')}
            class="group bg-gradient-to-br from-rose-600 via-rose-700 to-red-950 text-white rounded-3xl p-6 border-4 border-rose-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-rose-100 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-rose-200 animate-bounce" />
                  <span>Exam-Grade Scenario Simulator • Real-World Breach Forensics</span>
                </div>
                <span class="px-3 py-1 bg-white text-rose-950 font-black text-xs rounded-full shadow-sm">
                  PREPSET EXAM BANK: DOMAIN 2.0 🔥
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🛡️⚔️
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-rose-200 transition-colors">
                    PrepSet Advanced Exam Bank: Domain 2.0 (Threats, Vulnerabilities & Mitigations) 🔥
                  </h3>
                  <p class="text-rose-100 text-sm font-medium mt-1">
                    Master tough CompTIA SY0-701 scenarios on <strong>Nation-State APTs & Cyber Espionage</strong>, <strong>Business Email Compromise (BEC & Account Takeover)</strong>, <strong>IDN Homograph & Typosquatting</strong>, <strong>Selective Watering Hole Attacks</strong>, and <strong>Voice Phishing (Vishing) with Deepfake Audio Pretexting</strong>!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q1: Nation-State APTs & LotL Cyber Espionage</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q2: BEC Account Takeover & Out-of-Band Callbacks</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q3: Typosquatting & Punycode Homograph Deception</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q4: Targeted Watering Hole Exploits & IP Profiling</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Q5: Deepfake Audio Vishing & Authority Pretexting</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-rose-400/40 flex items-center justify-between text-rose-100 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-rose-200 group-hover:translate-x-1 transition-transform" />
                <span>Launch PrepSet Domain 2.0 Exam Simulator →</span>
              </span>
              <span class="px-3 py-1 bg-white text-rose-950 rounded-full font-black text-xs">
                Start Domain 2.0 🔥
              </span>
            </div>
          </div>

          {/* FEATURED: PrepSet Domain 3.0 Exam Simulator (Security Architecture) */}
          <div 
            onClick={() => handleSelect('prepset_domain3')}
            class="group bg-gradient-to-br from-indigo-700 via-indigo-800 to-slate-950 text-white rounded-3xl p-6 border-4 border-indigo-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-indigo-100 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-indigo-200 animate-bounce" />
                  <span>Exam-Grade Scenario Simulator • Cloud & Network Architecture</span>
                </div>
                <span class="px-3 py-1 bg-white text-indigo-950 font-black text-xs rounded-full shadow-sm">
                  PREPSET EXAM BANK: DOMAIN 3.0 🏰
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🏰⚡
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-indigo-200 transition-colors">
                    PrepSet Advanced Exam Bank: Domain 3.0 (Security Architecture) 🏰
                  </h3>
                  <p class="text-indigo-100 text-sm font-medium mt-1">
                    Master tough CompTIA SY0-701 scenarios across <strong>Cloud Infrastructures (IaaS/PaaS/SaaS/FaaS)</strong>, <strong>Software-Defined Networking (SDN)</strong>, <strong>OT/SCADA & Industrial Systems</strong>, <strong>IPsec Tunnel vs Transport Mode</strong>, <strong>SASE & ZTNA Cloud Mesh</strong>, and <strong>High Availability & Resiliency</strong>!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Section 3.1: Cloud & Network Infrastructure</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Section 3.2: Secure Infrastructures & Appliances</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Section 3.3: Data Protection & Classifications</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Section 3.4: Resiliency, Backups & COOP</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-400/40 flex items-center justify-between text-indigo-100 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-indigo-200 group-hover:translate-x-1 transition-transform" />
                <span>Launch PrepSet Domain 3.0 Exam Simulator →</span>
              </span>
              <span class="px-3 py-1 bg-white text-indigo-950 rounded-full font-black text-xs">
                Start Domain 3.0 🏰
              </span>
            </div>
          </div>

          {/* FEATURED: PrepSet Domain 4.0 Exam Simulator (Operations and Incident Response) */}
          <div 
            onClick={() => handleSelect('prepset_domain4')}
            class="group bg-gradient-to-br from-red-700 via-rose-800 to-slate-950 text-white rounded-3xl p-6 border-4 border-rose-300 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-rose-100 text-xs font-black backdrop-blur-md">
                  <Sparkles class="w-4 h-4 text-rose-200 animate-bounce" />
                  <span>Exam-Grade Scenario Simulator • Real-Time SOC & Incident Response</span>
                </div>
                <span class="px-3 py-1 bg-white text-rose-950 font-black text-xs rounded-full shadow-sm">
                  PREPSET EXAM BANK: DOMAIN 4.0 🚨
                </span>
              </div>

              <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-black text-3xl shrink-0 group-hover:scale-110 transition-transform">
                  🚨🛡️
                </div>
                <div>
                  <h3 class="text-2xl sm:text-3xl font-black text-white group-hover:text-rose-200 transition-colors">
                    PrepSet Advanced Exam Bank: Domain 4.0 (Operations & Incident Response) 🚨
                  </h3>
                  <p class="text-rose-100 text-sm font-medium mt-1">
                    Master critical CompTIA SY0-701 scenarios across <strong>Secure Baselines & Hardening</strong>, <strong>Asset Management & Media Sanitization</strong>, <strong>Vulnerability Management & Pen Testing</strong>, <strong>SIEM/SOAR Monitoring & Alert Tuning</strong>, <strong>Firewalls & Web Filtering</strong>, <strong>IAM & MFA Protocols</strong>, and <strong>NIST SP 800-61 Incident Response & Forensics</strong>!
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-2 pt-2">
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Section 4.1: Secure Baselines & Application Security</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Section 4.2 & 4.3: Asset Management & Threat Intelligence</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Section 4.4 & 4.5: Security Monitoring, Tools & Firewalls</span>
                <span class="px-3 py-1 bg-white/15 rounded-xl text-xs font-bold backdrop-blur-sm border border-white/20">Section 4.6 - 4.8: IAM, Automation, Forensics & Logs</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-rose-400/40 flex items-center justify-between text-rose-100 font-black text-base">
              <span class="flex items-center gap-2">
                <ChevronRight class="w-5 h-5 text-rose-200 group-hover:translate-x-1 transition-transform" />
                <span>Launch PrepSet Domain 4.0 Exam Simulator →</span>
              </span>
              <span class="px-3 py-1 bg-white text-rose-950 rounded-full font-black text-xs">
                Start Domain 4.0 🚨
              </span>
            </div>
          </div>

          {/* Domain 1.0 Card */}
          <div
            onClick={() => handleSelect('domain1')}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔒
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Domain 1.0</span>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Active</span>
                </div>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5">
                  General Security Concepts
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore foundational security concepts: <strong>CIA Triad</strong>, <strong>Digital Certificates & PKI</strong>, <strong>Encryption Tech</strong>, <strong>Zero Trust</strong>, <strong>AAA</strong>, <strong>Gap Analysis</strong>, <strong>Physical Security</strong>, <strong>Deception</strong>, <strong>Change Management</strong>, <strong>Obfuscation</strong>, and <strong>Hashing</strong>!
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-amber-700 font-extrabold text-sm group-hover:text-amber-800">
              <span>Enter Domain 1.0 (12 Modules)</span>
              <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Domain 2.0 Card */}
          <div
            onClick={() => handleSelect('domain2')}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🎯
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Domain 2.0</span>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Active</span>
                </div>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors mt-0.5">
                  Threats, Vulnerabilities, and Mitigations
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario-based MCQs on <strong>Threat Vectors</strong>, <strong>Phishing</strong>, <strong>Malware</strong>, <strong>Attacks</strong>, <strong>Password Spraying</strong>, <strong>Indicators of Compromise</strong>, <strong>Segmentation</strong>, <strong>Mitigation</strong>, and <strong>Hardening</strong>!
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-amber-700 font-extrabold text-sm group-hover:text-amber-800">
              <span>Enter Domain 2.0 (32 MCQ Modules)</span>
              <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Domain 3.0 Card */}
          <div
            onClick={() => handleSelect('domain3')}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🏗️
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Domain 3.0</span>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Active</span>
                </div>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors mt-0.5">
                  Security Architecture
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore enterprise architecture: <strong>Cloud (IaaS/PaaS/SaaS/FaaS)</strong>, <strong>SDN</strong>, <strong>SCADA/ICS</strong>, <strong>HVAC/UPS</strong>, <strong>IPsec VPN</strong>, <strong>AAA Servers</strong>, <strong>SIEM/NAC</strong>, <strong>WAF/NGFW</strong>, <strong>SASE/CASB</strong>, <strong>Data States</strong>, <strong>GDPR Data Protection</strong>, and <strong>Resiliency (AWS HA / COOP)</strong>!
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-sky-700 font-extrabold text-sm group-hover:text-sky-800">
              <span>Enter Domain 3.0 (13 Modules)</span>
              <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Domain 4.0 Card */}
          <div
            onClick={() => handleSelect('domain4')}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full bg-blue-600 text-white font-extrabold text-xs shadow-sm">
                🌟 New Domain!
              </span>
            </div>

            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⚡
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Domain 4.0</span>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Active</span>
                </div>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors mt-0.5">
                  Operations and Incident Response
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario-based MCQs on <strong>Secure Baselines</strong>, <strong>Integrity Measurements</strong>, <strong>GPO & MDM Automated Deployment</strong>, and <strong>Baseline Lifecycle Maintenance</strong>!
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-blue-700 font-extrabold text-sm group-hover:text-blue-800">
              <span>Enter Domain 4.0 (Secure Baselines MCQs)</span>
              <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Domain 5.0 Card */}
          <div
            onClick={() => handleSelect('domain5')}
            class="group bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📜
              </div>

              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Domain 5.0</span>
                  <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">Active</span>
                </div>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors mt-0.5">
                  Governance, Risk, and Compliance
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore governance & risk: <strong>Security Policies</strong>, <strong>ISO/NIST Standards</strong>, <strong>CCB/SOP/SOAR</strong>, <strong>Regulatory Laws</strong>, <strong>Data Roles</strong>, <strong>NIST RMF & KRIs</strong>, <strong>Quantitative SLE/ALE Math</strong>, <strong>Risk Strategies</strong>, <strong>BIA</strong>, <strong>Compliance</strong>, <strong>Privacy (GDPR/DPO/DPIA)</strong>, and <strong>User Training</strong>!
              </p>
            </div>

            <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-purple-700 font-extrabold text-sm group-hover:text-purple-800">
              <span>Enter Domain 5.0 (12 Modules)</span>
              <ChevronRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
