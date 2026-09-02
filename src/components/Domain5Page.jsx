import React, { useState } from 'react';
import { ArrowLeft, Shield, PlayCircle, Sparkles, FileText, Sliders, ClipboardCheck, Scale, UserCheck, RotateCw, Calculator, Compass, Clock, Landmark, HardDrive } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Domain5Page({ onBack, onSelectTopic }) {
  const handleSelectPolicies = () => {
    sounds.playSuccess();
    onSelectTopic('security_policies');
  };

  const handleSelectStandards = () => {
    sounds.playSuccess();
    onSelectTopic('security_standards');
  };

  const handleSelectProcedures = () => {
    sounds.playSuccess();
    onSelectTopic('security_procedures');
  };

  const handleSelectConsiderations = () => {
    sounds.playSuccess();
    onSelectTopic('security_considerations');
  };

  const handleSelectRoles = () => {
    sounds.playSuccess();
    onSelectTopic('data_roles');
  };

  const handleSelectRiskManagement = () => {
    sounds.playSuccess();
    onSelectTopic('risk_management');
  };

  const handleSelectRiskAnalysis = () => {
    sounds.playSuccess();
    onSelectTopic('risk_analysis');
  };

  const handleSelectRiskStrategies = () => {
    sounds.playSuccess();
    onSelectTopic('risk_strategies');
  };

  const handleSelectBia = () => {
    sounds.playSuccess();
    onSelectTopic('bia');
  };

  const handleSelectCompliance = () => {
    sounds.playSuccess();
    onSelectTopic('compliance');
  };

  const handleSelectPrivacy = () => {
    sounds.playSuccess();
    onSelectTopic('privacy');
  };

  const handleSelectUserTraining = () => {
    sounds.playSuccess();
    onSelectTopic('user_training');
  };

  const handleSelectDomain5DumpsBatch1 = () => {
    sounds.playSuccess();
    onSelectTopic('domain5_dumps_batch1');
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
      <div class="bg-gradient-to-r from-purple-500 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-purple-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md">
            <Shield class="w-4 h-4 text-purple-200" />
            <span>CompTIA Security+ • Domain 5.0</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            5.0 - Governance, Risk, and Compliance
          </h1>
          <p class="text-purple-100 font-medium text-sm sm:text-base leading-relaxed">
            Explore corporate security policies, ISO/IEC 27001 ISMS frameworks, CIS server hardening, OWASP Top 10 web armor, CCB change control, SOAR playbooks, NIST RMF risk frameworks, KRI radars, quantitative SLE/ALE math, risk treatment strategies, BIA, Compliance, Data Privacy, and Security Awareness User Training!
          </p>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-sm shrink-0 flex items-center gap-3">
          <div class="text-3xl">🔌</div>
          <div>
            <div class="text-xs font-bold text-purple-200 uppercase">Available Simulations</div>
            <div class="text-lg font-extrabold text-white">12 Active Simulation Modules!</div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div class="space-y-4">
        <h2 class="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <span>Select a Topic Simulation</span>
          <Sparkles class="w-5 h-5 text-purple-500" />
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* FEATURED DUMP BANK: Domain 5.0 Practice Bank (Questions 1 - 20) */}
          <div 
            onClick={handleSelectDomain5DumpsBatch1}
            class="group bg-gradient-to-br from-white via-purple-50 to-indigo-50/50 rounded-3xl p-6 border-4 border-amber-400 shadow-lg hover:shadow-2xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between md:col-span-2 lg:col-span-3"
          >
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-extrabold text-xs shadow-sm flex items-center gap-1">
                🌟 Official Exam Dump Vault (227 Questions Total)
              </span>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                  📜
                </div>
                <div>
                  <span class="text-xs font-extrabold text-amber-700 uppercase tracking-wider">Domain 5.0 Exam Vault • Batch 1</span>
                  <h3 class="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                    Domain 5.0 Security Program Management Practice (Q1 - Q20)
                  </h3>
                </div>
              </div>

              <p class="text-slate-700 text-sm leading-relaxed font-medium">
                Verified CompTIA Security+ SY0-701 exam questions covering <strong>KRIs</strong>, <strong>RTO vs RPO</strong>, <strong>Acceptable Use Policies (AUP)</strong>, <strong>Passive Reconnaissance</strong>, <strong>Data Subject / Controller / Processor Roles</strong>, <strong>Qualitative vs Quantitative Risk</strong>, <strong>Governance Boards</strong>, and <strong>SOC 2 Audit Rights</strong>!
              </p>

              {/* Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2.5 py-1 bg-amber-100 text-amber-950 rounded-lg text-xs font-bold border border-amber-300">Q1 - Q20 Verified</span>
                <span class="px-2.5 py-1 bg-purple-100 text-purple-950 rounded-lg text-xs font-bold border border-purple-300">Shuffled Options (A, B, C, D)</span>
                <span class="px-2.5 py-1 bg-emerald-100 text-emerald-950 rounded-lg text-xs font-bold border border-emerald-300">Layman Explanations & Distractor Analysis</span>
                <span class="px-2.5 py-1 bg-blue-100 text-blue-950 rounded-lg text-xs font-bold border border-blue-300">Instant Audio Feedback</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-200 flex items-center justify-between text-amber-900 font-extrabold text-base group-hover:text-amber-950">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-6 h-6 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Batch 1 Test (Questions 1 - 20) 🎲</span>
              </div>
              <span class="text-xs px-3 py-1 bg-amber-500 text-amber-950 rounded-full font-black">20 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.1 - Security Policies */}
          <div 
            onClick={handleSelectPolicies}
            class="group bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📜
              </div>

              <div>
                <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Section 5.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Security Policies
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>NIST</strong> frameworks, <strong>SLA</strong> uptime contracts & outage fines, employee <strong>AUP</strong> rules, <strong>MOU / MOA</strong> partner bridges, and <strong>NDA</strong> secrecy vaults!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">NIST</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">SLA</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">AUP</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">MOU</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">MOA</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">NDA</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-purple-700 font-extrabold text-base group-hover:text-purple-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>Launch Policies Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-purple-100 rounded-full font-bold">5 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.1 - Security Standards */}
          <div 
            onClick={handleSelectStandards}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⚙️
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 5.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Security Standards
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>ISO</strong> / <strong>IEC</strong> 27001 ISMS certification, <strong>NIST SP</strong> 800-53 control catalogs, <strong>CIS</strong> server hardening benchmarks, and <strong>OWASP</strong> Top 10 web armor!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">ISO</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">IEC</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">NIST SP</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CIS</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">OWASP</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch Standards Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">5 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.1 - Security Procedures */}
          <div 
            onClick={handleSelectProcedures}
            class="group bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📋
              </div>

              <div>
                <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Section 5.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Security Procedures
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore Standard Operating Procedures (<strong>SOP</strong>), Change Control Board (<strong>CCB</strong>) ticket voting, and <strong>SOAR</strong> automated playbook execution!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">SOP</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">CCB</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">SOAR</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-purple-700 font-extrabold text-base group-hover:text-purple-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>Launch Procedures Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-purple-100 rounded-full font-bold">3 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.1 - Security Considerations */}
          <div 
            onClick={handleSelectConsiderations}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🏛️
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 5.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Security Considerations
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>SOX</strong> financial ledgers, <strong>HIPAA</strong> health privacy, <strong>PCI DSS</strong> credit card encryption vaults, and <strong>GDPR</strong> EU privacy deletion rights!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SOX</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">HIPAA</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">PCI DSS</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">GDPR</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch Considerations Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">4 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.1 - Data Roles and Responsibilities */}
          <div 
            onClick={handleSelectRoles}
            class="group bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                👔
              </div>

              <div>
                <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Section 5.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Data Roles & Responsibilities
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>CISO</strong> cyber defense, <strong>DPO</strong> privacy compliance, <strong>DAO</strong> dataset custodianship, <strong>VP</strong> governance, <strong>PII</strong>, and <strong>PHI</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">DAO</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">DPO</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">CISO</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">PII</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">PHI</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">VP</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-purple-700 font-extrabold text-base group-hover:text-purple-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>Launch Roles Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-purple-100 rounded-full font-bold">6 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.2 - Risk Management */}
          <div 
            onClick={handleSelectRiskManagement}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔄
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 5.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Risk Management
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore the NIST Risk Management Framework (<strong>RMF</strong> 7-step lifecycle) and Key Risk Indicators (<strong>KRI</strong> early warning gauges)!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">RMF</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">KRI</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch Risk Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">2 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.2 - Risk Analysis */}
          <div 
            onClick={handleSelectRiskAnalysis}
            class="group bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🧮
              </div>

              <div>
                <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Section 5.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Risk Analysis
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>SLE</strong> (Single Loss Expectancy), <strong>ARO</strong> (Annual Rate of Occurrence), <strong>ALE</strong> (Annual Loss Expectancy), <strong>AV</strong> (Asset Value), and <strong>EF</strong> (Exposure Factor)!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">SLE</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">ARO</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">ALE</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">AV</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">EF</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-purple-700 font-extrabold text-base group-hover:text-purple-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>Launch Math Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-purple-100 rounded-full font-bold">5 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.2 - Risk Management Strategies */}
          <div 
            onClick={handleSelectRiskStrategies}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🧭
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 5.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Risk Management Strategies
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore Risk <strong>Mitigation</strong>, Risk <strong>Avoidance</strong>, Risk <strong>Transference</strong> (Cyber Insurance & <strong>SLA</strong>), Risk <strong>Acceptance</strong>, and Risk <strong>Exception</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Acceptance</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Avoidance</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Transference</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Mitigation</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SLA</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch Strategies Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Concepts</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.2 - Business Impact Analysis */}
          <div 
            onClick={handleSelectBia}
            class="group bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⏱️
              </div>

              <div>
                <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Section 5.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Business Impact Analysis
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore Business Impact Analysis (<strong>BIA</strong>), Recovery Time Objective (<strong>RTO</strong>), Recovery Point Objective (<strong>RPO</strong>), <strong>MTTR</strong>, and <strong>MTBF</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">BIA</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">RTO</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">RPO</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">MTTR</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">MTBF</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-purple-700 font-extrabold text-base group-hover:text-purple-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>Launch BIA Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-purple-100 rounded-full font-bold">5 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.4 - Compliance */}
          <div 
            onClick={handleSelectCompliance}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🏛️
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 5.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Compliance
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>PCI DSS</strong> (credit cards), <strong>SOX</strong> (financial auditing), <strong>HIPAA</strong> (health PHI), <strong>GLBA</strong> (banking), <strong>NDA</strong>, and <strong>GDPR</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">PCI DSS</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SOX</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">HIPAA</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">GLBA</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">NDA</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">GDPR</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch Compliance Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.4 - Privacy */}
          <div 
            onClick={handleSelectPrivacy}
            class="group bg-white rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-purple-600 uppercase tracking-wider">Section 5.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-purple-600 transition-colors">
                  Privacy
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>GDPR</strong> (EU privacy), <strong>IP</strong> (PII classification), <strong>DPO</strong> (Data Protection Officer), <strong>PIA</strong>, <strong>DPIA</strong>, <strong>PHI</strong>, and <strong>PII</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">GDPR</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">EU</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">IP</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">DPO</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">PIA</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">DPIA</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">PII</span>
                <span class="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">PHI</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-purple-700 font-extrabold text-base group-hover:text-purple-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                <span>Launch Privacy Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-purple-100 rounded-full font-bold">8 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 5.6 - User Training */}
          <div 
            onClick={handleSelectUserTraining}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-xs shadow-sm">
                🌟 New Live Animation!
              </span>
            </div>

            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔌
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 5.6</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  User Training
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>USB</strong> (dropped flash drives), <strong>VPN</strong> (public Wi-Fi encryption), <strong>URL</strong> (phishing link inspection), and <strong>IT</strong> incident reporting!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">USB</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">VPN</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">URL</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">IT</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch Training Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">4 Acronyms</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
