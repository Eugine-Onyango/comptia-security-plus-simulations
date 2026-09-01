import React, { useState } from 'react';
import { UserCheck, Shield, Award, Briefcase, FileText, CheckCircle2, Lock } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DataRolesOrgSim() {
  const [activeRole, setActiveRole] = useState('ciso'); // 'ciso', 'dpo', 'dao', 'vp'

  const handleSelectRole = (role) => {
    sounds.playPop();
    setActiveRole(role);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Governance Roles • DAO, DPO, CISO, VP, PII, PHI</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Data Governance Org Chart & Role Inspector! 👔🛡️
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Data protection requires clear executive roles: the <strong>CISO</strong> leads technical cybersecurity, the <strong>DPO</strong> oversees privacy compliance, the <strong>DAO</strong> owns dataset access, and the <strong>VP</strong> provides executive sponsorship!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Police Chief (CISO), Privacy Ombudsman (DPO), Bank Vault Owner (DAO), and Mayor (VP).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Role Selector Grid (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <UserCheck class="w-5 h-5 text-indigo-600" />
            <span>Select Governance Executive</span>
          </h4>

          <div class="space-y-2">
            <button
              onClick={() => handleSelectRole('ciso')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                activeRole === 'ciso'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <Shield class="w-5 h-5 text-indigo-600 shrink-0" />
              <div>
                <div class="font-extrabold text-sm">CISO (Chief Information Security Officer)</div>
                <div class="text-[11px] text-slate-500 font-medium">Head of Cyber Strategy & SOC Defense.</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectRole('dpo')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                activeRole === 'dpo'
                  ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-sm'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <Award class="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <div class="font-extrabold text-sm">DPO (Data Protection Officer)</div>
                <div class="text-[11px] text-slate-500 font-medium">Privacy Compliance & Regulation Guardian.</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectRole('dao')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                activeRole === 'dao'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <FileText class="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div class="font-extrabold text-sm">DAO (Data Asset Owner)</div>
                <div class="text-[11px] text-slate-500 font-medium">Owns Datasets (PII/PHI) & Access Rights.</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectRole('vp')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                activeRole === 'vp'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <Briefcase class="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <div class="font-extrabold text-sm">VP (Vice President)</div>
                <div class="text-[11px] text-slate-500 font-medium">Executive Sponsor & Resource Approver.</div>
              </div>
            </button>
          </div>
        </div>

        {/* Executive Duty Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Executive Responsibility Profile</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
              activeRole === 'ciso' ? 'bg-indigo-400 text-slate-950' : activeRole === 'dpo' ? 'bg-purple-400 text-slate-950' : activeRole === 'dao' ? 'bg-emerald-400 text-slate-950' : 'bg-amber-400 text-slate-950'
            }`}>
              {activeRole.toUpperCase()} EXECUTIVE ROLE
            </span>
          </div>

          {/* Dynamic Content Display */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            {activeRole === 'ciso' && (
              <div class="p-4 bg-indigo-950/80 border border-indigo-500 rounded-2xl space-y-2 text-indigo-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span>CISO Duties & Scope</span>
                  <span class="text-[10px] bg-indigo-900 px-2 py-0.5 rounded text-indigo-200">CYBER DEFENSE</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Defines enterprise security policies, oversees SOC security operations, manages incident response teams, and reports risks to the Board of Directors.
                </p>
              </div>
            )}

            {activeRole === 'dpo' && (
              <div class="p-4 bg-purple-950/80 border border-purple-500 rounded-2xl space-y-2 text-purple-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span>DPO Duties & Scope</span>
                  <span class="text-[10px] bg-purple-900 px-2 py-0.5 rounded text-purple-200">PRIVACY AUDITOR</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Mandated by GDPR & HIPAA to monitor privacy compliance, conduct Privacy Impact Assessments (PIA), and act as liaison to regulatory authorities.
                </p>
              </div>
            )}

            {activeRole === 'dao' && (
              <div class="p-4 bg-emerald-950/80 border border-emerald-500 rounded-2xl space-y-2 text-emerald-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span>DAO Duties & Scope</span>
                  <span class="text-[10px] bg-emerald-900 px-2 py-0.5 rounded text-emerald-200">DATASET CUSTODIAN</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Classifies specific data assets (PII, PHI, Confidential), determines authorization access policies, and defines data retention/disposal rules.
                </p>
              </div>
            )}

            {activeRole === 'vp' && (
              <div class="p-4 bg-amber-950/80 border border-amber-500 rounded-2xl space-y-2 text-amber-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span>VP Duties & Scope</span>
                  <span class="text-[10px] bg-amber-900 px-2 py-0.5 rounded text-amber-200">EXECUTIVE SPONSOR</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Provides high-level business governance, aligns security goals with organizational strategy, and approves budgets for security tools & headcount.
                </p>
              </div>
            )}

          </div>

          {/* Status Banner */}
          <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-center text-indigo-200">
            {activeRole === 'ciso' && <span>🛡️ <strong>CISO:</strong> Chief Information Security Officer — Leads cybersecurity strategy & technical defense.</span>}
            {activeRole === 'dpo' && <span>⚖️ <strong>DPO:</strong> Data Protection Officer — Ensures GDPR & HIPAA privacy compliance.</span>}
            {activeRole === 'dao' && <span>📂 <strong>DAO:</strong> Data Asset Owner — Decides who gets access to PII & PHI datasets.</span>}
            {activeRole === 'vp' && <span>👔 <strong>VP:</strong> Vice President — Executive leader approving budgets and corporate governance.</span>}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">CISO = Cyber Boss</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">DPO = Privacy Boss</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">DAO = Data Owner</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PII = Personal Data</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PHI = Health Data</span>
          </div>

        </div>

      </div>

    </div>
  );
}
