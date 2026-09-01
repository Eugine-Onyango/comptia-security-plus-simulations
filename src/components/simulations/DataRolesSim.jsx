import React, { useState } from 'react';
import { ArrowLeft, Award, UserCheck, Send } from 'lucide-react';
import DataRolesOrgSim from './DataRolesOrgSim';
import DataRolesDispatcherSim from './DataRolesDispatcherSim';
import DataRolesQuiz from './DataRolesQuiz';
import { sounds } from '../../utils/audio';

export default function DataRolesSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('org');

  const handleTabChange = (tab) => {
    sounds.playPop();
    setActiveTab(tab);
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div class="flex items-center justify-between">
        <button
          onClick={onBack}
          class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-sky-100 text-sky-900 border-2 border-sky-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to Domain 5.0</span>
        </button>

        <span class="px-3 py-1 bg-purple-100 text-purple-950 rounded-full font-extrabold text-xs">
          Topic 5.1 • Data Roles (DAO, DPO, CISO, PII, PHI, VP)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-purple-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">👔</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              5.1 - Data Roles and Responsibilities
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore Executive Cybersecurity Leadership (CISO), Privacy Audit Compliance (DPO), Dataset Custodianship (DAO), Executive Governance (VP), Personally Identifiable Information (PII), and Protected Health Information (PHI)!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('org')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'org'
              ? 'bg-purple-600 border-purple-700 text-white shadow-md shadow-purple-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <UserCheck class="w-4 h-4" />
          <span>Org Chart Inspector (DAO, DPO, CISO, VP)</span>
        </button>

        <button
          onClick={() => handleTabChange('dispatcher')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'dispatcher'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Send class="w-4 h-4" />
          <span>Governance Ticket Dispatcher (PII, PHI)</span>
        </button>

        <button
          onClick={() => handleTabChange('quiz')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'quiz'
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Award class="w-4 h-4" />
          <span>Data Roles Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'org' && <DataRolesOrgSim />}
        {activeTab === 'dispatcher' && <DataRolesDispatcherSim />}
        {activeTab === 'quiz' && <DataRolesQuiz />}
      </div>

    </div>
  );
}
