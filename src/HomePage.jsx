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
