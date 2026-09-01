import React from 'react';
import { ArrowLeft, Shield, PlayCircle, Key, Lock, Layers, Sparkles, CheckCircle2, FileText, Cpu, HardDrive, Building2, UserCheck, Ruler, Camera, Bug, ClipboardList, Fingerprint } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Domain1Page({ onBack, onSelectTopic }) {
  const handleSelectCia = () => {
    sounds.playSuccess();
    onSelectTopic('cia');
  };

  const handleSelectHashing = () => {
    sounds.playSuccess();
    onSelectTopic('hashing_signatures');
  };

  const handleSelectObfuscation = () => {
    sounds.playSuccess();
    onSelectTopic('obfuscation');
  };

  const handleSelectChangePki = () => {
    sounds.playSuccess();
    onSelectTopic('change_management');
  };

  const handleSelectDeception = () => {
    sounds.playSuccess();
    onSelectTopic('deception_disruption');
  };

  const handleSelectPhysicalSec = () => {
    sounds.playSuccess();
    onSelectTopic('physical_security');
  };

  const handleSelectAaa = () => {
    sounds.playSuccess();
    onSelectTopic('aaa_framework');
  };

  const handleSelectZeroTrust = () => {
    sounds.playSuccess();
    onSelectTopic('zero_trust');
  };

  const handleSelectGapAnalysis = () => {
    sounds.playSuccess();
    onSelectTopic('gap_analysis');
  };

  const handleSelectCertificates = () => {
    sounds.playSuccess();
    onSelectTopic('certificates');
  };

  const handleSelectEncryptionTech = () => {
    sounds.playSuccess();
    onSelectTopic('encryption_tech');
  };

  const handleSelectEncryptingData = () => {
    sounds.playSuccess();
    onSelectTopic('encrypting_data');
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div class="flex items-center gap-3">
        <button
          onClick={onBack}
          class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to All Domains</span>
        </button>
      </div>

      {/* Header Banner */}
      <div class="bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-lg shadow-amber-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 text-amber-950 font-extrabold text-xs">
            <Shield class="w-4 h-4 text-amber-800" />
            <span>CompTIA Security+ • Domain 1.0</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            1.0 - General Security Concepts
          </h1>
          <p class="text-amber-900/90 font-medium text-sm sm:text-base leading-relaxed">
            Welcome to the foundations! Here we turn abstract security rules into simple, interactive physical toys you can click and test.
          </p>
        </div>

        <div class="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-amber-200/60 shadow-sm shrink-0 flex items-center gap-3">
          <div class="text-3xl">🧩</div>
          <div>
            <div class="text-xs font-bold text-amber-800 uppercase">Available Simulations</div>
            <div class="text-lg font-extrabold text-amber-950">12 Active Simulation Modules!</div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div class="space-y-4">
        <h2 class="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <span>Select a Topic Simulation</span>
          <Sparkles class="w-5 h-5 text-amber-500" />
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* ACTIVE SIMULATION: 1.2 - The CIA & AIC Triad */}
          <div 
            onClick={handleSelectCia}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔐
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  The CIA & AIC Triad
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Learn the 3 golden pillars of security: Keeping Secrets (<strong>Confidentiality</strong>), Stopping Sneaky Edits (<strong>Integrity</strong>), and Keeping Systems Ready (<strong>Availability</strong>). Plus, learn why Emergency Rooms use <strong>AIC</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="space-y-2 pt-1">
                <div class="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-200/80">
                  <span class="font-extrabold text-amber-900 text-sm w-12">CIA:</span>
                  <span class="text-xs font-bold text-slate-700">Confidentiality, Integrity, Availability</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-xl bg-amber-50 border border-amber-200/80">
                  <span class="font-extrabold text-amber-900 text-sm w-12">AIC:</span>
                  <span class="text-xs font-bold text-slate-700">Availability, Integrity, Confidentiality</span>
                </div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch Triad Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">5 Mini-Toys</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.4 - Hashing & Digital Signatures */}
          <div 
            onClick={handleSelectHashing}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-extrabold text-xs shadow-sm">
                🌟 New Simulation!
              </span>
            </div>

            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🧬
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Hashing & Digital Signatures
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Learn one-way digital fingerprints and test why <strong>MD5 (Message Digest 5)</strong> is deprecated due to collision vulnerabilities!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">MD5</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Collisions</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch Hash Blender & MD5 Lab</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">1 Acronym</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.4 - Obfuscation */}
          <div 
            onClick={handleSelectObfuscation}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🎨
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Obfuscation & Data Masking
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Mask sensitive <strong>PII</strong> & <strong>SSN</strong> data for customer support, and embed hidden messages inside <strong>TCP</strong> steganography packets!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">PII</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">SSN</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">TCP</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch Obfuscation Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">3 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.3 & 1.4 - Change Management & PKI */}
          <div 
            onClick={handleSelectChangePki}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📋
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 1.3 & 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Change Management & PKI Key Exchange
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Learn IT change pipelines with CEO visibility, and how PKI asymmetric key exchange delivers fast symmetric session keys!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">CEO</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">IT</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">PKI</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Launch Change & PKI Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">3 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.2 - Deception and Disruption */}
          <div 
            onClick={handleSelectDeception}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🍯
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Deception and Disruption
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Trap intruders with fake Honeypot servers, honeyfiles, and decoy <strong>API (Application Programming Interface)</strong> credentials!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">API</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Honeypots</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch Honeypot & API Trap Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">Decoy Toys</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.2 - Physical Security */}
          <div 
            onClick={handleSelectPhysicalSec}
            class="group bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📹
              </div>

              <div>
                <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Physical Security & Surveillance
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Protect physical perimeters day and night! Covers Closed-Circuit Television (<strong>CCTV</strong>) & Infrared Night Vision (<strong>IR</strong>).
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">CCTV</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">IR</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-purple-700 font-extrabold text-base group-hover:text-purple-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>Launch CCTV & IR Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-purple-100 rounded-full font-bold">2 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.2 - Gap Analysis */}
          <div 
            onClick={handleSelectGapAnalysis}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📏
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Gap Analysis & Frameworks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Find missing security controls! Compare your posture against NIST SP 800-171 and ISO/IEC 27001 standards to remediate security gaps.
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">NIST</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">ISO</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">IEC</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Launch Gap Audit Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">3 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.2 - AAA Framework */}
          <div 
            onClick={handleSelectAaa}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🪪
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  AAA Framework & Access Control
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                The 3 A's of identity management: Authentication (ID Check), Authorization (Permissions), & Accounting (Audit Trail). Plus CA & VPN!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">AAA</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CA</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">VPN</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch AAA Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">3 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.2 - Zero Trust Architecture */}
          <div 
            onClick={handleSelectZeroTrust}
            class="group bg-white rounded-3xl p-6 border-4 border-yellow-400 shadow-md hover:shadow-xl hover:border-yellow-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-yellow-100 text-amber-800 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🏰
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Zero Trust Architecture
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                "Never Trust, Always Verify!" Explore PEP Bouncers, PDP Brains (PE Engine & PA Administrator), IP, NAT, VPN, & IT attributes.
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-amber-950 rounded text-xs font-bold">PEP</span>
                <span class="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-amber-950 rounded text-xs font-bold">PDP</span>
                <span class="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-amber-950 rounded text-xs font-bold">PE</span>
                <span class="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-amber-950 rounded text-xs font-bold">PA</span>
                <span class="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-amber-950 rounded text-xs font-bold">IP</span>
                <span class="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-amber-950 rounded text-xs font-bold">NAT</span>
                <span class="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-amber-950 rounded text-xs font-bold">VPN</span>
                <span class="px-2 py-0.5 bg-yellow-50 border border-yellow-200 text-amber-950 rounded text-xs font-bold">IT</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-yellow-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch Zero Trust Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-yellow-100 rounded-full font-bold">8 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.4 - Encrypting Data */}
          <div 
            onClick={handleSelectEncryptingData}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔒
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  Encrypting Data (Rest & Transit)
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Protect data sleeping in storage vs data moving on networks! Covers 8 acronyms: SSD, USB, EFS, HTTPS, VPN, SSL, TLS, & IPsec.
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">SSD</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">USB</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">EFS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">HTTPS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">VPN</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">SSL</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">TLS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">IPsec</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Launch Rest vs. Transit Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">8 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.4 - Certificates & PKI */}
          <div 
            onClick={handleSelectCertificates}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📜
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Digital Certificates & PKI
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore the Web's Digital Passport Factory! Covers 14 key acronyms: PKI, CA, CSR, X.509, SAN, HSM, OS, DNS, CVE, CRL, OCSP, HTTP, SSL, & TLS.
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">PKI</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CA</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CSR</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">X.509</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SAN</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CRL</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">OCSP</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">+ 6 More</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch Certificate Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">14 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.4 - Encryption Technologies */}
          <div 
            onClick={handleSelectEncryptionTech}
            class="group bg-white rounded-3xl p-6 border-4 border-emerald-400 shadow-md hover:shadow-xl hover:border-emerald-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                  Encryption Technologies
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Discover Hardware Security Vaults & CPU Offloading! Covers 8 acronyms: TPM, HSM, CPU, AES, SSL, TLS, SSH, & ROM.
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs font-bold">TPM</span>
                <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs font-bold">HSM</span>
                <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs font-bold">CPU</span>
                <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs font-bold">AES</span>
                <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs font-bold">SSL</span>
                <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs font-bold">TLS</span>
                <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs font-bold">SSH</span>
                <span class="px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded text-xs font-bold">ROM</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-emerald-100 flex items-center justify-between text-emerald-700 font-extrabold text-base group-hover:text-emerald-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                <span>Launch Hardware Security Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-emerald-100 rounded-full font-bold">8 Acronyms</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
