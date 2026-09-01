import React from 'react';
import { ArrowLeft, ShieldAlert, PlayCircle, Sparkles, Target, Shuffle, Fish, UserCheck, Waves, Cpu, Zap, PackageCheck, Monitor, Database, Code, Wrench, Truck, Settings, Smartphone, Shield, Bug, UserX, Key, Ban, Globe, Wifi, GitFork, RotateCcw, FileCode, Layers, Lock, KeyRound, AlertTriangle, Network } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Domain2Page({ onBack, onSelectTopic }) {
  const handleSelectThreatVectors = () => {
    sounds.playSuccess();
    onSelectTopic('threat_vectors_mcq');
  };

  const handleSelectPhishing = () => {
    sounds.playSuccess();
    onSelectTopic('phishing_mcq');
  };

  const handleSelectImpersonation = () => {
    sounds.playSuccess();
    onSelectTopic('impersonation_mcq');
  };

  const handleSelectWateringHole = () => {
    sounds.playSuccess();
    onSelectTopic('watering_hole_mcq');
  };

  const handleSelectSocialMemBuffer = () => {
    sounds.playSuccess();
    onSelectTopic('social_mem_buffer_mcq');
  };

  const handleSelectRaceConditions = () => {
    sounds.playSuccess();
    onSelectTopic('race_conditions_mcq');
  };

  const handleSelectMaliciousUpdates = () => {
    sounds.playSuccess();
    onSelectTopic('malicious_updates_mcq');
  };

  const handleSelectOsVulnerabilities = () => {
    sounds.playSuccess();
    onSelectTopic('os_vulnerabilities_mcq');
  };

  const handleSelectSqlInjection = () => {
    sounds.playSuccess();
    onSelectTopic('sql_injection_mcq');
  };

  const handleSelectXss = () => {
    sounds.playSuccess();
    onSelectTopic('xss_mcq');
  };

  const handleSelectHardwareVirtualization = () => {
    sounds.playSuccess();
    onSelectTopic('hardware_virtualization_mcq');
  };

  const handleSelectSupplyChain = () => {
    sounds.playSuccess();
    onSelectTopic('supply_chain_mcq');
  };

  const handleSelectMisconfigurations = () => {
    sounds.playSuccess();
    onSelectTopic('misconfigurations_mcq');
  };

  const handleSelectMobileVulnerabilities = () => {
    sounds.playSuccess();
    onSelectTopic('mobile_vulnerabilities_mcq');
  };

  const handleSelectZeroDay = () => {
    sounds.playSuccess();
    onSelectTopic('zero_day_mcq');
  };

  const handleSelectOverviewMalware = () => {
    sounds.playSuccess();
    onSelectTopic('overview_malware_mcq');
  };

  const handleSelectVirusesWorms = () => {
    sounds.playSuccess();
    onSelectTopic('viruses_worms_mcq');
  };

  const handleSelectOtherMalwareTypes = () => {
    sounds.playSuccess();
    onSelectTopic('other_malware_types_mcq');
  };

  const handleSelectPhysicalAttacks = () => {
    sounds.playSuccess();
    onSelectTopic('physical_attacks_mcq');
  };

  const handleSelectDos = () => {
    sounds.playSuccess();
    onSelectTopic('dos_mcq');
  };

  const handleSelectDnsAttacks = () => {
    sounds.playSuccess();
    onSelectTopic('dns_attacks_mcq');
  };

  const handleSelectWirelessAttacks = () => {
    sounds.playSuccess();
    onSelectTopic('wireless_attacks_mcq');
  };

  const handleSelectOnPathAttacks = () => {
    sounds.playSuccess();
    onSelectTopic('on_path_attacks_mcq');
  };

  const handleSelectReplayAttacks = () => {
    sounds.playSuccess();
    onSelectTopic('replay_attacks_mcq');
  };

  const handleSelectMaliciousCode = () => {
    sounds.playSuccess();
    onSelectTopic('malicious_code_mcq');
  };

  const handleSelectApplicationAttacks = () => {
    sounds.playSuccess();
    onSelectTopic('application_attacks_mcq');
  };

  const handleSelectCryptographicAttacks = () => {
    sounds.playSuccess();
    onSelectTopic('cryptographic_attacks_mcq');
  };

  const handleSelectPasswordAttacks = () => {
    sounds.playSuccess();
    onSelectTopic('password_attacks_mcq');
  };

  const handleSelectIndicatorsOfCompromise = () => {
    sounds.playSuccess();
    onSelectTopic('indicators_of_compromise_mcq');
  };

  const handleSelectSegmentationAccessControl = () => {
    sounds.playSuccess();
    onSelectTopic('segmentation_access_control_mcq');
  };

  const handleSelectMitigationTechniques = () => {
    sounds.playSuccess();
    onSelectTopic('mitigation_techniques_mcq');
  };

  const handleSelectHardeningTechniques = () => {
    sounds.playSuccess();
    onSelectTopic('hardening_techniques_mcq');
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div class="flex items-center gap-3">
        <button
          onClick={onBack}
          class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-sky-100 text-sky-900 border-2 border-sky-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to All Domains</span>
        </button>
      </div>

      {/* Header Banner */}
      <div class="bg-gradient-to-r from-amber-500 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-amber-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md">
            <ShieldAlert class="w-4 h-4 text-amber-200" />
            <span>CompTIA Security+ • Domain 2.0</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            2.0 - Threats, Vulnerabilities, and Mitigations
          </h1>
          <p class="text-amber-100 font-medium text-sm sm:text-base leading-relaxed">
            Practice CompTIA Security+ scenario questions on Threat Vectors, Phishing, Impersonation, Watering Hole Attacks, Memory Injections, Buffer Overflows, Race Conditions, Malicious Updates, OS Vulnerabilities, SQL Injection, XSS, Virtualization, Supply Chain, Misconfigurations, Mobile Vulnerabilities, Zero-day Vulnerabilities, Overview of Malware, Viruses & Worms, Keyloggers/Logic Bombs, Physical Attacks, Denial of Service (DDoS), DNS Attacks, Wireless Attacks, On-path Attacks, Replay Attacks, Malicious Code, Application Attacks, Cryptographic Attacks, Password Attacks, Indicators of Compromise, Network Segmentation & Access Control, Mitigation Techniques, and Hardening Techniques with randomized option shuffling!
          </p>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-sm shrink-0 flex items-center gap-3">
          <div class="text-3xl">⚙️</div>
          <div>
            <div class="text-xs font-bold text-amber-200 uppercase">Exam Practice Mode</div>
            <div class="text-lg font-extrabold text-white">32 Active MCQ Modules!</div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div class="space-y-4">
        <h2 class="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <span>Select an Exam Question Topic</span>
          <Sparkles class="w-5 h-5 text-amber-500" />
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ACTIVE EXAM MODULE: 2.2 - Common Threat Vectors */}
          <div 
            onClick={handleSelectThreatVectors}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🎯
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1. Common Threat Vectors
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Message-based</strong>, <strong>Image SVG/XML</strong>, <strong>File Macros</strong>, <strong>Voice Vishing</strong>, <strong>USB Air-gaps</strong>, <strong>Agentless Code</strong>, <strong>Unsupported Systems</strong>, <strong>Unsecure Networks</strong>, <strong>Open Ports</strong>, and <strong>Supply Chain MSPs</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Image SVG/XML</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">USB Air-gap</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Supply Chain MSP</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">ZIP/Macros</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Open Ports</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Threat Vectors Practice Test 🎯</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">12 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.2 - Phishing */}
          <div 
            onClick={handleSelectPhishing}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🎣
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  2. Phishing
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Business Email Compromise (BEC)</strong>, <strong>Typosquatting (URL Hijacking)</strong>, <strong>Pretexting</strong>, <strong>Vishing (Voice)</strong>, <strong>Smishing (SMS)</strong>, and <strong>Boss/CEO Gift Card Scams</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">BEC Fraud</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Typosquatting</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Pretexting</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Vishing / Smishing</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">CEO Scam</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Phishing Practice Test 🎣</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.2 - Impersonation */}
          <div 
            onClick={handleSelectImpersonation}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🎭
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  3. Impersonation
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Pretexting Stories</strong>, <strong>Executive Rank Authority</strong>, <strong>Technical Jargon Traps</strong>, <strong>Eliciting Information ('Hacking the Human')</strong>, <strong>Identity Fraud</strong>, and <strong>Callback Verification</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Pretexting</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Executive Rank</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Jargon Traps</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Eliciting Info</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Identity Fraud</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Impersonation Practice Test 🎭</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.2 - Watering Hole Attacks */}
          <div 
            onClick={handleSelectWateringHole}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🌊
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  4. Watering Hole Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Third-Party Site Poisoning</strong>, <strong>IP Address Filtering Evasion</strong>, <strong>2017 Polish Financial Attack Case Study</strong>, and <strong>Defense-in-Depth (IPS/Antivirus)</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Site Poisoning</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">IP Filtering</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">2017 Polish Bank Breach</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Defense-in-Depth</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">IPS/AV Rules</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Watering Hole Practice Test 🌊</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.2 & 2.3 - Other Social Eng, Memory Injection & Buffer Overflows */}
          <div 
            onClick={handleSelectSocialMemBuffer}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🧬
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Sections 2.2 & 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  5. Social Eng & Memory Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Disinformation Campaigns</strong>, <strong>Brand Impersonation Ads</strong>, <strong>Memory Injection</strong>, <strong>DLL Injection</strong>, <strong>Buffer Overflows</strong>, and <strong>Developer Bounds Checking</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Disinformation</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Brand Impersonation</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">DLL Injection</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Buffer Overflow</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Bounds Checking</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Memory & Buffer Practice Test 🧬</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Race Conditions */}
          <div 
            onClick={handleSelectRaceConditions}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🏎️
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  6. Race Conditions
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Time-of-Check to Time-of-Use (TOCTOU)</strong>, <strong>Banking Concurrency Flaws</strong>, <strong>2023 Tesla Pwn2Own Exploit</strong>, <strong>Mars Rover Spirit Case Study</strong>, and <strong>Thread Locking Mutexes</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">TOCTOU Flaws</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Banking Concurrency</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Tesla Pwn2Own</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Mars Rover Loop</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Thread Mutexes</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Race Conditions Practice Test 🏎️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Malicious Updates */}
          <div 
            onClick={handleSelectMaliciousUpdates}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📦
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  7. Malicious Updates
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>SolarWinds Orion Breach</strong>, <strong>Fake Browser Update Pop-ups</strong>, <strong>Digital Code Signatures</strong>, <strong>Known-Good Backups</strong>, and <strong>Automatic Update Pipeline Risks</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">SolarWinds Breach</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Fake Update Ads</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Digital Signatures</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Known-Good Backup</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Auto Update Risks</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Malicious Updates Practice Test 📦</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Operating System Vulnerabilities */}
          <div 
            onClick={handleSelectOsVulnerabilities}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                💻
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  8. OS Vulnerabilities
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Microsoft Patch Tuesday (2nd Tuesday)</strong>, <strong>Staging Patch Testing</strong>, <strong>Remote Code Execution (RCE)</strong>, <strong>Elevation of Privilege (EoP)</strong>, and <strong>Fallback Rollback Plans</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Patch Tuesday</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Staging Testing</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">RCE Exploits</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">EoP Privilege</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Rollback Plans</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start OS Vulnerabilities Practice Test 💻</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - SQL Injection */}
          <div 
            onClick={handleSelectSqlInjection}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🗄️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  9. SQL Injection
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>SQLi Authentication Bypass ('1'='1')</strong>, <strong>Unsanitized Query Strings</strong>, <strong>Parameterized Prepared Statements</strong>, <strong>Web Application Firewalls (WAF)</strong>, and <strong>Code Injection</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">'1'='1' Bypass</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Query Concatenation</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Prepared Statements</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">WAF Perimeter Rules</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Code Injection</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start SQL Injection Practice Test 🗄️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Cross-site Scripting (XSS) */}
          <div 
            onClick={handleSelectXss}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🌐
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  10. Cross-site Scripting
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Reflected XSS</strong>, <strong>Stored Persistent XSS</strong>, <strong>Subaru 2017 Token Theft Case Study</strong>, <strong>HTML Entity Encoding</strong>, and <strong>Client Browser Script Execution</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Reflected XSS</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Stored Persistent XSS</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Subaru Token Theft</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">HTML Encoding</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Client Browser Exec</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Cross-site Scripting Practice Test 🌐</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Hardware & Virtualization Vulnerabilities */}
          <div 
            onClick={handleSelectHardwareVirtualization}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛠️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  11. Hardware & Virtualization
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>End-of-Service Life (EOSL)</strong>, <strong>Firmware Update Delays</strong>, <strong>Legacy Isolation</strong>, <strong>IoT Attack Surface</strong>, <strong>VM Escape</strong>, and <strong>VM Sprawl</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">EOSL Support End</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Firmware Delay</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Legacy Isolation</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">IoT Attack Surface</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">VM Escape & Sprawl</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Hardware & Virtualization Practice Test 🛠️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Supply Chain Vulnerabilities */}
          <div 
            onClick={handleSelectSupplyChain}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🚚
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  12. Supply Chain Risks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Target HVAC Vendor Pivot (2013)</strong>, <strong>SolarWinds Orion Breach (2020)</strong>, <strong>Counterfeit Cisco Hardware</strong>, <strong>Vendor Audits</strong>, and <strong>MSP Pivots</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Target HVAC Pivot</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">SolarWinds Pipeline</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Counterfeit Cisco</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Contract Security Audits</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">MSP Access Risks</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Supply Chain Practice Test 🚚</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Misconfiguration Vulnerabilities */}
          <div 
            onClick={handleSelectMisconfigurations}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⚙️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  13. Misconfigurations
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Open S3 Permissions (Verizon 2017)</strong>, <strong>Unsecured Root Accounts (`sudo`)</strong>, <strong>Insecure Protocols (Telnet/FTP)</strong>, <strong>Mirai Default Logins</strong>, and <strong>Open Ports</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Open S3 Permissions</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Disable Root SSH</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Telnet Cleartext</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Mirai Default Logins</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Open Ports & Audits</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Misconfigurations Practice Test ⚙️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Mobile Device Vulnerabilities */}
          <div 
            onClick={handleSelectMobileVulnerabilities}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📱
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  14. Mobile Vulnerabilities
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Jailbreaking (iOS)</strong>, <strong>Rooting (Android)</strong>, <strong>Sideloading (.apk/.ipa)</strong>, <strong>Custom Firmware</strong>, <strong>MDM Evasion</strong>, and <strong>Mobile Trojans</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">iOS Jailbreaking</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Android Rooting</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">App Sideloading</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Custom Firmware</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">MDM Policy Evasion</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Mobile Vulnerabilities Practice Test 📱</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.3 - Zero-day Vulnerabilities */}
          <div 
            onClick={handleSelectZeroDay}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  15. Zero-day Vulnerabilities
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Unknown Flaws</strong>, <strong>Signature AV Limitations</strong>, <strong>Microsoft Secure Boot 2023 Zero-Day</strong>, <strong>CVE Identifiers</strong>, <strong>Behavioral EDR</strong>, and <strong>Sandbox Escape</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Unknown Flaws</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Signature AV Limitation</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Secure Boot 2023 Flaw</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">CVE Identifiers</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Behavioral EDR</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Zero-day Practice Test 🛡️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - An Overview of Malware */}
          <div 
            onClick={handleSelectOverviewMalware}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🦠
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  16. Overview of Malware
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Ransomware Cryptography</strong>, <strong>Offline Air-gapped Backups</strong>, <strong>Drive-by Downloads</strong>, <strong>Spyware & Keyloggers</strong>, <strong>Self-Replicating Worms</strong>, and <strong>PII Theft</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Ransomware Crypto</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Air-gapped Backups</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Drive-by Downloads</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Spyware & Keyloggers</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Network Worms</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Overview of Malware Practice Test 🦠</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Viruses and Worms */}
          <div 
            onClick={handleSelectVirusesWorms}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🐛
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  17. Viruses & Worms
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Program Viruses</strong>, <strong>Boot Sector MBR Viruses</strong>, <strong>Macro Office Viruses</strong>, <strong>Fileless RAM Attacks</strong>, <strong>Self-Propagating Worms</strong>, and <strong>IPS Boundaries</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Program Viruses</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Boot Sector MBR</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Macro Office</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Fileless RAM Virus</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Self-Propagating Worms</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Viruses & Worms Practice Test 🐛</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Other Malware Types */}
          <div 
            onClick={handleSelectOtherMalwareTypes}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🕵️‍♂️
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  18. Other Malware Types
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Keyloggers (HTTPS Bypass)</strong>, <strong>Logic Bombs (Insider Threats & South Korea Case Study)</strong>, <strong>Rootkits (Kernel Stealth)</strong>, <strong>UEFI Secure Boot</strong>, and <strong>File Integrity Monitoring (Tripwire)</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Keyloggers</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Logic Bombs</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Rootkits</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">UEFI Secure Boot</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">File Integrity FIM</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Other Malware Practice Test 🕵️‍♂️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Physical Attacks */}
          <div 
            onClick={handleSelectPhysicalAttacks}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔑
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  19. Physical Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Physical Access Control</strong>, <strong>RFID Badge Cloning & MFA</strong>, <strong>Environmental Attacks (HVAC)</strong>, <strong>Physical Brute Force</strong>, <strong>Power Sabotage</strong>, and <strong>Gaseous Fire Suppression</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Physical Access</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">RFID Cloning & MFA</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">HVAC Overheating</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Physical Brute Force</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Clean Agent FM-200</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Physical Attacks Practice Test 🔑</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Denial of Service */}
          <div 
            onClick={handleSelectDos}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🚫
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  20. Denial of Service
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>DDoS & Botnets</strong>, <strong>Reflection & Amplification (DNS/NTP)</strong>, <strong>Unintentional "Friendly" DoS (STP Loops)</strong>, <strong>Smokescreen Distractions</strong>, <strong>Asymmetric Threats</strong>, and <strong>QoS Throttling</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">DDoS Botnets</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">DNS/NTP Amplification</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Layer 2 STP Loops</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Smokescreen Distractions</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">QoS Rate Limiting</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Denial of Service Practice Test 🚫</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - DNS Attacks */}
          <div 
            onClick={handleSelectDnsAttacks}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🌐
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  21. DNS Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Local 'hosts' File Poisoning</strong>, <strong>Domain Hijacking (Brazilian Bank 2016 Case Study)</strong>, <strong>DNS Cache Poisoning</strong>, <strong>Typosquatting / URL Hijacking</strong>, <strong>DNSSEC</strong>, and <strong>Registrar Locks & MFA</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Hosts File Poisoning</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Domain Hijacking</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">DNS Cache Poisoning</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Typosquatting / URL</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">DNSSEC Signatures</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start DNS Attacks Practice Test 🌐</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Wireless Attacks */}
          <div 
            onClick={handleSelectWirelessAttacks}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📶
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  22. Wireless Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Wireless Deauthentication Attacks</strong>, <strong>IEEE 802.11w PMF</strong>, <strong>RF Jamming & SNR</strong>, <strong>Microwave Interference</strong>, <strong>Fox Hunting</strong>, and <strong>Reactive Jamming</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Deauth Attacks</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">IEEE 802.11w PMF</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">RF Jamming & SNR</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Fox Hunting</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Reactive Jamming</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Wireless Attacks Practice Test 📶</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - On-path Attacks */}
          <div 
            onClick={handleSelectOnPathAttacks}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔀
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  23. On-path Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>On-path Network Attacks (ARP Poisoning)</strong>, <strong>On-path Browser Attacks (MitB)</strong>, <strong>ARP Protocol Flaws</strong>, <strong>Dynamic ARP Inspection (DAI)</strong>, <strong>HTTPS Decryption Interception</strong>, and <strong>Certificate Pinning</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">ARP Poisoning</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Browser Trojans (MitB)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">ARP Protocol Flaws</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Dynamic ARP DAI</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Certificate Pinning</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start On-path Attacks Practice Test 🔀</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Replay Attacks */}
          <div 
            onClick={handleSelectReplayAttacks}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔄
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  24. Replay Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Replay Attacks</strong>, <strong>Pass the Hash (PtH)</strong>, <strong>Session Hijacking / Sidejacking</strong>, <strong>Nonces & Timestamps</strong>, <strong>Header/Cookie Manipulation</strong>, and <strong>HTTPS Protections</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Pass the Hash (PtH)</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Sidejacking</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Nonces & Timestamps</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Not On-path Requirement</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Header Manipulation</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Replay Attacks Practice Test 🔄</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Malicious Code */}
          <div 
            onClick={handleSelectMaliciousCode}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                💻
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  25. Malicious Code
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Malicious Code</strong>, <strong>WannaCry Ransomware (SMBv1)</strong>, <strong>British Airways XSS (Magecart)</strong>, <strong>Estonian Health Database SQLi</strong>, <strong>Arbitrary Code Execution (ACE)</strong>, and <strong>Defense-in-Depth</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">WannaCry Ransomware</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Magecart XSS Script</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Estonian Health SQLi</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Arbitrary Code ACE</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Defense-in-Depth</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Malicious Code Practice Test 💻</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Application Attacks */}
          <div 
            onClick={handleSelectApplicationAttacks}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⚡
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  26. Application Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Injection Attacks</strong>, <strong>Buffer Overflows & ASLR/DEP</strong>, <strong>Vertical/Horizontal Privilege Escalation</strong>, <strong>Cross-Site Request Forgery (CSRF/XSRF)</strong>, <strong>Anti-CSRF Tokens</strong>, and <strong>Directory Traversal</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">CSRF / XSRF Forgery</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Anti-CSRF Tokens</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Directory Traversal</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Privilege Escalation</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Buffer & ASLR</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Application Attacks Practice Test ⚡</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Cryptographic Attacks */}
          <div 
            onClick={handleSelectCryptographicAttacks}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔐
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  27. Cryptographic Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Birthday Attacks</strong>, <strong>Hash Collisions & MD5 Weaknesses</strong>, <strong>Downgrade Attacks (POODLE)</strong>, <strong>SSL Stripping</strong>, <strong>HSTS Enforcement</strong>, and <strong>Hash Output Bit Sizes</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Birthday Attack</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">MD5 Collisions</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">POODLE Downgrade</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">SSL Stripping</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">HSTS Enforcement</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Cryptographic Attacks Practice Test 🔐</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Password Attacks */}
          <div 
            onClick={handleSelectPasswordAttacks}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔑
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  28. Password Attacks
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Password Spraying</strong>, <strong>Online vs Offline Brute Force</strong>, <strong>Plaintext Storage Risks</strong>, <strong>One-Way Hashing</strong>, and <strong>Account Lockouts</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Password Spraying</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Offline GPU Brute Force</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Plaintext Risks</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">One-Way SHA-256</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Account Lockouts</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Password Attacks Practice Test 🔑</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.4 - Indicators of Compromise */}
          <div 
            onClick={handleSelectIndicatorsOfCompromise}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🚨
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  29. Indicators of Compromise
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Impossible Travel</strong>, <strong>Missing/Cleared Event Logs</strong>, <strong>Blocked Security Updates</strong>, <strong>Resource Consumption Spikes</strong>, <strong>Out-of-Cycle Logging</strong>, and <strong>Account Lockout Exploitation</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Impossible Travel</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Event Log Wiping</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Blocked AV Sites</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Data Exfiltration Spikes</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Out-of-Cycle Logging</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Indicators of Compromise Practice Test 🚨</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.5 - Segmentation and Access Control */}
          <div 
            onClick={handleSelectSegmentationAccessControl}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  30. Segmentation & Access Control
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Network Segmentation (PCI DSS)</strong>, <strong>Tiered Architecture</strong>, <strong>Network ACLs & Lockouts</strong>, <strong>Application Hash Allow Lists</strong>, <strong>Certificate Publisher Rules</strong>, and <strong>OS Control Lists</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">PCI DSS Isolation</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Tiered Web/Database</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">ACL Self-Lockout</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Application Hashing</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Publisher Certificates</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Segmentation & Access Control Practice Test 🛡️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.5 - Mitigation Techniques */}
          <div 
            onClick={handleSelectMitigationTechniques}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛠️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 2.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  31. Mitigation Techniques
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Full Disk Encryption (FDE)</strong>, <strong>Least Privilege</strong>, <strong>Posture Assessments</strong>, <strong>Emergency Out-of-Band Patching</strong>, <strong>SIEM Collectors</strong>, and <strong>Media Decommissioning</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">BitLocker / FDE</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Least Privilege</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">NAC Posture Check</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Out-of-Band Patch</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Media Shredding</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Mitigation Techniques Practice Test 🛠️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 2.5 - Hardening Techniques */}
          <div 
            onClick={handleSelectHardeningTechniques}
            class="group bg-white rounded-3xl p-6 border-4 border-orange-400 shadow-md hover:shadow-xl hover:border-orange-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full bg-orange-600 text-white font-extrabold text-xs shadow-sm flex items-center gap-1">
                🌟 New Quiz Module!
              </span>
            </div>

            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⚙️
              </div>

              <div>
                <span class="text-xs font-extrabold text-orange-600 uppercase tracking-wider">Section 2.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-orange-600 transition-colors">
                  32. Hardening Techniques
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Endpoint Detection & Response (EDR)</strong>, <strong>HIPS</strong>, <strong>Closing Unused Ports/Services</strong>, <strong>Changing Default Passwords</strong>, <strong>Removing Software</strong>, and <strong>Host Firewalls</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Automated EDR Isolation</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">HIPS RAM Inspection</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Closing Unused Ports</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Default Credentials</span>
                <span class="px-2 py-0.5 bg-orange-50 border border-orange-200 text-orange-900 rounded text-xs font-bold">Software Removal</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between text-orange-700 font-extrabold text-base group-hover:text-orange-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-orange-600 group-hover:scale-110 transition-transform" />
                <span>Start Hardening Techniques Practice Test ⚙️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-orange-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
