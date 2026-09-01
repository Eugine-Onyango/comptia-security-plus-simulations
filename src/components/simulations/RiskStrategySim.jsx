import React, { useState } from 'react';
import { ArrowLeft, Award, Compass, Handshake } from 'lucide-react';
import RiskStrategyMatrixSim from './RiskStrategyMatrixSim';
import SlaTransferenceSim from './SlaTransferenceSim';
import RiskStrategyQuiz from './RiskStrategyQuiz';
import { sounds } from '../../utils/audio';

export default function RiskStrategySim({ onBack }) {
  const [activeTab, setActiveTab] = useState('matrix');

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
          Topic 5.2 • Risk Strategies (Acceptance, Avoidance, Transference, Mitigation, Exception, SLA)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-purple-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🧭</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              5.2 - Risk Management Strategies
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore the 5 core risk treatment strategies: Risk Mitigation (controls), Risk Avoidance (elimination), Risk Transference (insurance/SLA), Risk Acceptance (tolerance), and Risk Exception (policy waiver)!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('matrix')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'matrix'
              ? 'bg-purple-600 border-purple-700 text-white shadow-md shadow-purple-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Compass class="w-4 h-4" />
          <span>5 Risk Treatment Matrix (Mitigation, Avoidance, etc.)</span>
        </button>

        <button
          onClick={() => handleTabChange('sla')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'sla'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Handshake class="w-4 h-4" />
          <span>SLA Transference Simulator (SLA, Transference)</span>
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
          <span>Risk Strategies Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'matrix' && <RiskStrategyMatrixSim />}
        {activeTab === 'sla' && <SlaTransferenceSim />}
        {activeTab === 'quiz' && <RiskStrategyQuiz />}
      </div>

    </div>
  );
}
