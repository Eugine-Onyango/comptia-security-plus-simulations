import React, { useState } from 'react';
import { ArrowLeft, BookOpen, PlayCircle, ShieldCheck, Sparkles, CheckCircle2, Lock, Search, FileText, Award } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function ExamBankPage({ onBack, onSelectBatch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const batches = [
    {
      id: 'domain5_dumps_batch1',
      title: 'Batch 1: Questions 1 - 20',
      subtitle: 'KRIs, RTO/RPO, AUP, Passive Recon, Data Roles, Risk Types, Governance Boards, SOC 2 Audits, BIA Metrics',
      status: 'active',
      count: 20,
      verified: true,
      tags: ['Q1-Q20 Verified', 'Option Shuffling', 'Layman Explanations', 'Distractor Breakdown']
    },
    {
      id: 'domain5_dumps_batch2',
      title: 'Batch 2: Questions 21 - 40',
      subtitle: 'Data Controller Roles, SLA Guarantees, Risk Appetite, Data Stewards, WAF Mitigations, Right-to-Audit',
      status: 'active',
      count: 20,
      verified: true,
      tags: ['Q21-Q40 Verified', 'Option Shuffling', 'Layman Explanations', 'Distractor Breakdown']
    },
    {
      id: 'domain5_dumps_batch3',
      title: 'Batch 3: Questions 41 - 60',
      subtitle: 'Password Standards, Ransomware Playbooks, Legal Penalties, NDAs, Onboarding, GDPR Right to Deletion',
      status: 'active',
      count: 20,
      verified: true,
      tags: ['Q41-Q60 Verified', 'Option Shuffling', 'Layman Explanations', 'Distractor Breakdown']
    },
    {
      id: 'domain5_dumps_batch4',
      title: 'Batch 4: Questions 61 - 80',
      subtitle: 'Penetration Testing Environments, Risk Thresholds, Physical Pentests, Regulatory Attestation, Audit Types',
      status: 'active',
      count: 20,
      verified: true,
      tags: ['Q61-Q80 Verified', 'Option Shuffling', 'Layman Explanations', 'Distractor Breakdown']
    },
    {
      id: 'domain5_dumps_batch5',
      title: 'Batch 5: Questions 81 - 100',
      subtitle: 'Continuous Risk Assessment, Single Loss Expectancy (SLE), MTBF Hard Drive Metrics, Anomalous Behavior',
      status: 'active',
      count: 20,
      verified: true,
      tags: ['Q81-Q100 Verified', 'Option Shuffling', 'Layman Explanations', 'Distractor Breakdown']
    },
    {
      id: 'domain5_dumps_batch6',
      title: 'Batch 6: Questions 101 - 120',
      subtitle: 'Quantitative Calculations (SLE, ARO, ALE), Due Diligence, Incident Reconnaissance, Baseline Analysis',
      status: 'pending',
      count: 20,
      verified: false,
      tags: ['Upcoming Batch']
    },
    {
      id: 'domain5_dumps_batch7',
      title: 'Batch 7: Questions 121 - 140',
      subtitle: 'Rules of Engagement, Business Continuity vs Disaster Recovery, ISO 27001, Acceptable Use Policies',
      status: 'pending',
      count: 20,
      verified: false,
      tags: ['Upcoming Batch']
    },
    {
      id: 'domain5_dumps_batch8',
      title: 'Batch 8: Questions 141 - 160',
      subtitle: 'Data Retention Policies, Residual Risk, Service Accounts, Supply Chain Risks, PCI DSS Fines',
      status: 'pending',
      count: 20,
      verified: false,
      tags: ['Upcoming Batch']
    },
    {
      id: 'domain5_dumps_batch9',
      title: 'Batch 9: Questions 161 - 180',
      subtitle: 'Disaster Recovery Phases, DPO Requirements, Asset Replacement Costs, Incident Playbooks, Risk Reporting',
      status: 'pending',
      count: 20,
      verified: false,
      tags: ['Upcoming Batch']
    },
    {
      id: 'domain5_dumps_batch10',
      title: 'Batch 10: Questions 181 - 200',
      subtitle: 'IaaS Pentest Limits, Operational Security, Conflicts of Interest, Internal Security Committees, Password Hygiene',
      status: 'pending',
      count: 20,
      verified: false,
      tags: ['Upcoming Batch']
    },
    {
      id: 'domain5_dumps_batch11',
      title: 'Batch 11: Questions 201 - 227',
      subtitle: 'Hybrid Work Security, ISO 27002 Guidelines, Insider Threats, Social Engineering, Security Awareness Metrics',
      status: 'pending',
      count: 27,
      verified: false,
      tags: ['Final Batch']
    }
  ];

  const filteredBatches = batches.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    b.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (batch) => {
    if (batch.status !== 'active') return;
    sounds.playSuccess();
    onSelectBatch(batch.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => { sounds.playPop(); onBack(); }}
          className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Dashboard</span>
        </button>
      </div>

      {/* Hero Header Banner */}
      <div className="bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-purple-300/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-purple-200" />
            <span>Dedicated PDF Exam Dumps Vault • DUMPS_BASE.pdf</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            Official Exam Question Bank 📚⚡
          </h1>
          <p className="text-purple-100 font-medium text-sm sm:text-base leading-relaxed">
            A dedicated, isolated section for verified exam questions directly from your <strong>DUMPS_BASE.pdf</strong> document! Every question features verified answers, layman's terms explanations, option shuffling (A, B, C, D), and distractor analysis.
          </p>
        </div>

        {/* Progress Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-sm shrink-0 space-y-2 min-w-[240px]">
          <div className="flex items-center justify-between text-xs font-bold text-purple-200">
            <span>Overall Bank Progress</span>
            <span className="text-amber-300 font-black">100 / 227 Questions</span>
          </div>
          <div className="w-full bg-black/30 h-3 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div className="bg-gradient-to-r from-amber-400 to-yellow-300 h-full rounded-full w-[44%]" />
          </div>
          <div className="text-[11px] text-purple-200 font-medium text-center pt-1">
            Batches 1 - 5 Active • 127 Questions Pending
          </div>
        </div>
      </div>

      {/* Filter and Info Bar */}
      <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
          <BookOpen className="w-5 h-5 text-purple-600" />
          <span>Select an Exam Question Batch:</span>
        </div>

        <div className="relative shrink-0 sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search batch topics or questions..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>
      </div>

      {/* Batches Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBatches.map((batch) => {
          const isActive = batch.status === 'active';

          return (
            <div
              key={batch.id}
              onClick={() => handleSelect(batch)}
              className={`rounded-3xl p-6 border-4 transition-all flex flex-col justify-between relative overflow-hidden ${
                isActive
                  ? 'bg-gradient-to-br from-white via-purple-50/40 to-indigo-50/50 border-purple-500 shadow-md hover:shadow-xl cursor-pointer'
                  : 'bg-slate-50/70 border-slate-200 opacity-70 cursor-not-allowed'
              }`}
            >
              {/* Badge */}
              <div className="absolute top-4 right-4">
                {isActive ? (
                  <span className="px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-[11px] shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Ready to Play
                  </span>
                ) : (
                  <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-600 font-extrabold text-[11px] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" /> Pending Batch
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl ${
                    isActive ? 'bg-purple-100 text-purple-700' : 'bg-slate-200 text-slate-400'
                  }`}>
                    {isActive ? '📜' : '🔒'}
                  </div>
                  <div>
                    <h3 className={`text-xl font-extrabold ${isActive ? 'text-slate-900' : 'text-slate-500'}`}>
                      {batch.title}
                    </h3>
                    <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">
                      {batch.count} Scenario Questions
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
                  {batch.subtitle}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {batch.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className={`px-2.5 py-0.5 rounded-lg text-xs font-bold ${
                        isActive
                          ? 'bg-purple-100 text-purple-900 border border-purple-200'
                          : 'bg-slate-200 text-slate-500'
                      }`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer action */}
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-xs font-extrabold">
                {isActive ? (
                  <>
                    <div className="flex items-center gap-2 text-purple-700 font-extrabold text-sm">
                      <PlayCircle className="w-5 h-5 text-purple-600" />
                      <span>Start Practice Batch (Q1 - Q20) 🎲</span>
                    </div>
                    <span className="px-2.5 py-1 bg-purple-600 text-white rounded-full font-black text-[11px]">
                      20 Scenarios
                    </span>
                  </>
                ) : (
                  <div className="text-slate-400 font-bold text-xs flex items-center gap-1.5">
                    <Lock className="w-4 h-4" />
                    <span>Locked • Will be set in next batch</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
