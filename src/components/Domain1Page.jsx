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

  const handleSelectSecurityControls = () => {
    sounds.playSuccess();
    onSelectTopic('security_controls_mcq');
  };

  const handleSelectCiaTriadMcq = () => {
    sounds.playSuccess();
    onSelectTopic('cia_triad_mcq');
  };

  const handleSelectNonRepudiationMcq = () => {
    sounds.playSuccess();
    onSelectTopic('non_repudiation_mcq');
  };

  const handleSelectAaaFrameworkMcq = () => {
    sounds.playSuccess();
    onSelectTopic('aaa_framework_mcq');
  };

  const handleSelectGapAnalysisMcq = () => {
    sounds.playSuccess();
    onSelectTopic('gap_analysis_mcq');
  };

  const handleSelectZeroTrustMcq = () => {
    sounds.playSuccess();
    onSelectTopic('zero_trust_mcq');
  };

  const handleSelectPhysicalSecurityMcq = () => {
    sounds.playSuccess();
    onSelectTopic('physical_security_mcq');
  };

  const handleSelectDeceptionDisruptionMcq = () => {
    sounds.playSuccess();
    onSelectTopic('deception_disruption_mcq');
  };

  const handleSelectChangeManagementMcq = () => {
    sounds.playSuccess();
    onSelectTopic('change_management_mcq');
  };

  const handleSelectTechnicalChangeManagementMcq = () => {
    sounds.playSuccess();
    onSelectTopic('technical_change_management_mcq');
  };

  const handleSelectPkiMcq = () => {
    sounds.playSuccess();
    onSelectTopic('pki_mcq');
  };

  const handleSelectEncryptingDataMcq = () => {
    sounds.playSuccess();
    onSelectTopic('encrypting_data_mcq');
  };

  const handleSelectKeyExchangeMcq = () => {
    sounds.playSuccess();
    onSelectTopic('key_exchange_mcq');
  };

  const handleSelectEncryptionTechnologiesMcq = () => {
    sounds.playSuccess();
    onSelectTopic('encryption_technologies_mcq');
  };

  const handleSelectObfuscationMcq = () => {
    sounds.playSuccess();
    onSelectTopic('obfuscation_mcq');
  };

  const handleSelectHashingSignaturesMcq = () => {
    sounds.playSuccess();
    onSelectTopic('hashing_signatures_mcq');
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

          {/* ACTIVE EXAM MODULE: 1.1 - Security Controls */}
          <div 
            onClick={handleSelectSecurityControls}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.1 - Security Controls
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Control Categories</strong> (Technical, Operational, Managerial, Physical) and <strong>Control Types</strong> (Preventive, Deterrent, Detective, Corrective, Compensating, Directive)!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Technical / Operational</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Managerial / Physical</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Preventive & Deterrent</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Detective & Corrective</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Compensating & Directive</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Security Controls Test 🛡️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 1.2 - The CIA & AIC Triad Simulation */}
          <div 
            onClick={handleSelectCia}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🧩
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2 • Simulation</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  CIA & AIC Triad Interactive Toy
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Interactive visual playground for Confidentiality, Integrity, Availability, and the ER-focused AIC Triad.
              </p>

              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Interactive Simulation</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch Interactive Toy 🧩</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">Interactive</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.2 - The CIA Triad MCQs */}
          <div 
            onClick={handleSelectCiaTriadMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔐
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.2 - The CIA Triad
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Confidentiality</strong> (Encryption & MFA), <strong>Integrity</strong> (Hashing & Digital Signatures), <strong>Availability</strong> (Redundancy & Fault Tolerance), <strong>Non-repudiation</strong>, and the <strong>AIC Triad</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Confidentiality & Encryption</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Integrity & Hashing</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Availability & Redundancy</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Non-repudiation & Signatures</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">AIC Triad Prioritization</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start CIA Triad Test 🔐</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.2 - Non-repudiation */}
          <div 
            onClick={handleSelectNonRepudiationMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ✍️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.2 - Non-repudiation
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Proof of Origin</strong>, <strong>Proof of Integrity</strong>, <strong>Digital Signature Creation</strong> (Private Key) & <strong>Verification</strong> (Public Key), and <strong>Avalanche Effect</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Proof of Origin & Integrity</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Sign with Private Key</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Verify with Public Key</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Avalanche Effect Hashing</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Triple Security Guarantee</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Non-repudiation Test ✍️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.2 - AAA Framework */}
          <div 
            onClick={handleSelectAaaFrameworkMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🗝️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.2 - AAA Framework
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Identification</strong>, <strong>Authentication</strong>, <strong>Authorization</strong>, <strong>Accounting</strong>, <strong>Certificate Authentication for Headless Systems</strong>, and <strong>Authorization Models</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Identification (Username)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Authentication (Password/MFA)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Authorization Models & Roles</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Accounting & Audit Logs</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Headless Device CA Certs</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start AAA Framework Test 🗝️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.2 - Gap Analysis */}
          <div 
            onClick={handleSelectGapAnalysisMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📊
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.2 - Gap Analysis
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Baseline Frameworks</strong> (NIST SP 800-171, ISO 27001), <strong>Evaluating People & Processes</strong>, <strong>Compliance Heatmaps</strong>, and <strong>Gap Analysis Reports</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">NIST SP 800-171 / ISO 27001</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Evaluate People & Processes</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Compare Current vs Goal</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Compliance Heatmaps & Matrix</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Gap Analysis Report Roadmap</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Gap Analysis Test 📊</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.2 - Zero Trust */}
          <div 
            onClick={handleSelectZeroTrustMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.2 - Zero Trust
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>'Never Trust, Always Verify'</strong>, <strong>Data Plane vs Control Plane</strong>, <strong>PDP (Policy Engine & Administrator)</strong>, <strong>PEP (Policy Enforcement Point)</strong>, and <strong>Adaptive Identity</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Never Trust, Always Verify</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Data Plane vs Control Plane</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Policy Decision Point (PDP)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Policy Enforcement Point (PEP)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Adaptive Identity & Risk Signals</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Zero Trust Test 🛡️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.2 - Physical Security */}
          <div 
            onClick={handleSelectPhysicalSecurityMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🏢
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.2 - Physical Security
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Bollards & Barricades</strong>, <strong>Access Control Vestibules (Mantraps)</strong>, <strong>Two-Person Integrity</strong>, <strong>CCTV Analytics</strong>, <strong>Perimeter Lighting</strong>, and <strong>Sensors (Infrared/Pressure/Microwave/Ultrasonic)</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Bollards & Vehicle Barriers</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Access Control Vestibules (Mantraps)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Two-Person Integrity</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">CCTV Video Analytics</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Infrared / Pressure / Ultrasonic Sensors</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Physical Security Test 🏢</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.2 - Deception and Disruption */}
          <div 
            onClick={handleSelectDeceptionDisruptionMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🍯
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.2 - Deception and Disruption
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Honeypots</strong>, <strong>Honeynets</strong>, <strong>Honeyfiles</strong>, <strong>Honeytokens</strong> (API credentials, fake emails, database records), and <strong>TTP Reconnaissance</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Honeypots & Decoy Servers</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Honeynets & Decoy Networks</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Honeyfiles (Virtual Bear Traps)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Honeytoken API Keys & Emails</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">TTP Reconnaissance Intelligence</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Deception & Disruption Test 🍯</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.3 - Change Management */}
          <div 
            onClick={handleSelectChangeManagementMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔄
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.3 - Change Management
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Change Approval Process (CAB)</strong>, <strong>Backout Plans</strong>, <strong>Sandbox Testing</strong>, <strong>Maintenance Windows & Freezes</strong>, and <strong>Impact Analysis</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Change Advisory Board (CAB)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Backout Plan & Rollback</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Sandbox Testing Environment</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Maintenance Windows & Freezes</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Impact & Risk Analysis</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Change Management Test 🔄</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.3 - Technical Change Management */}
          <div 
            onClick={handleSelectTechnicalChangeManagementMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⚙️
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.3 - Technical Change Management
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Allow Lists vs Deny Lists</strong>, <strong>HA Downtime Failover</strong>, <strong>Scope Control</strong>, <strong>System Dependencies</strong>, <strong>Configuration Version Control</strong>, and <strong>Diagram Documentation</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Allow List vs Deny List</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">HA Failover & Zero Downtime</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Scope Control</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Library & Cross-System Dependencies</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Config Version Control & Diagrams</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Technical Change Test ⚙️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.4 - Public Key Infrastructure */}
          <div 
            onClick={handleSelectPkiMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔑
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.4 - Public Key Infrastructure
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Asymmetric vs Symmetric Encryption</strong>, <strong>Public & Private Keys</strong>, <strong>Certificate Authorities (CA)</strong>, <strong>Key Escrow</strong>, and <strong>Hybrid Encryption</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Asymmetric Key Pairs</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Encrypt (Public) / Decrypt (Private)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Certificate Authority (CA) & PKI</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Key Escrow & Recovery</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Hybrid Symmetric/Asymmetric Protocols</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start PKI Practice Test 🔑</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.4 - Encrypting Data */}
          <div 
            onClick={handleSelectEncryptingDataMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔐
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.4 - Encrypting Data
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Data at Rest (BitLocker/FileVault)</strong>, <strong>Database Column Encryption</strong>, <strong>IPsec VPNs</strong>, <strong>Key Lengths</strong>, <strong>Key Stretching (PBKDF2)</strong>, and <strong>Kerckhoffs's Principle</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Data at Rest (Full-Disk Encryption)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Column & Database Encryption</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Data in Transit (IPsec / HTTPS)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Symmetric vs Asymmetric Key Lengths</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Key Stretching & Kerckhoffs's Principle</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Encrypting Data Test 🔐</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.4 - Key Exchange */}
          <div 
            onClick={handleSelectKeyExchangeMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔄
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.4 - Key Exchange
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Out-of-Band vs In-Band Key Exchange</strong>, <strong>Diffie-Hellman (DH) Key Agreement</strong>, <strong>Ephemeral Keys</strong>, and <strong>Perfect Forward Secrecy (PFS)</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Out-of-Band vs In-Band Exchange</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Diffie-Hellman Key Agreement</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Bob (Priv) + Alice (Pub) = Shared Key</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Ephemeral Session Keys</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Perfect Forward Secrecy (PFS)</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Key Exchange Test 🔄</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.4 - Encryption Technologies */}
          <div 
            onClick={handleSelectEncryptionTechnologiesMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                💻
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.4 - Encryption Technologies
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Trusted Platform Module (TPM)</strong>, <strong>Hardware Security Module (HSM)</strong>, <strong>Key Management Systems (KMS)</strong>, and <strong>Secure Enclaves</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Trusted Platform Module (TPM)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Hardware Security Module (HSM)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Key Management System (KMS)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Secure Enclave (ARM / Apple)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Key Separation from Stored Data</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Encryption Technologies Test 💻</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.4 - Obfuscation */}
          <div 
            onClick={handleSelectObfuscationMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🙈
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.4 - Obfuscation
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Steganography (Image LSB, Audio, Printer Watermarks)</strong>, <strong>Tokenization (NFC Mobile Payments)</strong>, <strong>Data Masking</strong>, and <strong>Code Obfuscation</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Steganography & Covertext</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Tokenization vs Encryption</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Token Service Vault</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Data Masking (PII Protection)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Printer Watermark & Code Obfuscation</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Obfuscation Test 🙈</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 1.4 - Hashing and Digital Signatures */}
          <div 
            onClick={handleSelectHashingSignaturesMcq}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔏
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 1.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  1.4 - Hashing and Digital Signatures
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Practice CompTIA Security+ scenario questions on <strong>Hashes (SHA-256)</strong>, <strong>Hash Collisions (MD5)</strong>, <strong>Salting Hashes (defeating Rainbow Tables)</strong>, and <strong>Digital Signatures (Sign with Private, Verify with Public)</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">One-Way Message Digest (Integrity)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Hash Collisions (MD5 Weakness)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Salting Hashes (Anti-Rainbow Table)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Digital Signatures (Sign: Priv / Verify: Pub)</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Integrity, Authentication & Non-repudiation</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Hashing & Signatures Test 🔏</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
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
