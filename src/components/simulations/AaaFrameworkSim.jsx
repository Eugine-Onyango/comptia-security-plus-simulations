import React, { useState } from 'react';
import { ArrowLeft, Award, UserCheck, Building } from 'lucide-react';
import AaaStepsSim from './AaaStepsSim';
import FederationVpnSim from './FederationVpnSim';
import AaaQuiz from './AaaQuiz';
import { sounds } from '../../utils/audio';

export default function AaaFrameworkSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('steps');

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
          class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to Domain 1.0</span>
        </button>

        <span class="px-3 py-1 bg-indigo-100 text-indigo-950 rounded-full font-extrabold text-xs">
          Topic 1.2 • AAA Framework (AAA, CA, VPN)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🪪</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1.2 - Authentication, Authorization, and Accounting
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Learn the 3 A's of Access Control (Authentication, Authorization, Accounting), Central Authority (CA) federation, and VPN encryption!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('steps')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'steps'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <UserCheck class="w-4 h-4" />
          <span>The 3 A's Inspector (Authentication, Authorization, Accounting)</span>
        </button>

        <button
          onClick={() => handleTabChange('federation')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'federation'
              ? 'bg-purple-600 border-purple-700 text-white shadow-md shadow-purple-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Building class="w-4 h-4" />
          <span>Federation & Tunnels (CA & VPN)</span>
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
          <span>AAA Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'steps' && <AaaStepsSim />}
        {activeTab === 'federation' && <FederationVpnSim />}
        {activeTab === 'quiz' && <AaaQuiz />}
      </div>

    </div>
  );
}
