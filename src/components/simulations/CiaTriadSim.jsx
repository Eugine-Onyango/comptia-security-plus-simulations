import React, { useState } from 'react';
import { ArrowLeft, Lock, Edit3, Activity, ArrowRightLeft, Award } from 'lucide-react';
import ConfidentialitySim from './ConfidentialitySim';
import IntegritySim from './IntegritySim';
import AvailabilitySim from './AvailabilitySim';
import CiaVsAicSim from './CiaVsAicSim';
import TriadQuiz from './TriadQuiz';
import { sounds } from '../../utils/audio';

export default function CiaTriadSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('confidentiality');

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

        <span class="px-3 py-1 bg-amber-200 text-amber-950 rounded-full font-extrabold text-xs">
          Topic 1.2 • CIA & AIC Triad
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🔐</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1.2 - The CIA & AIC Triad
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              The fundamental core principles of information security! Select a toy tab below to play.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('confidentiality')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'confidentiality'
              ? 'bg-sky-500 border-sky-600 text-white shadow-md shadow-sky-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Lock class="w-4 h-4" />
          <span>Confidentiality (C)</span>
        </button>

        <button
          onClick={() => handleTabChange('integrity')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'integrity'
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Edit3 class="w-4 h-4" />
          <span>Integrity (I)</span>
        </button>

        <button
          onClick={() => handleTabChange('availability')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'availability'
              ? 'bg-amber-500 border-amber-600 text-amber-950 shadow-md shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Activity class="w-4 h-4" />
          <span>Availability (A)</span>
        </button>

        <button
          onClick={() => handleTabChange('cia_vs_aic')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'cia_vs_aic'
              ? 'bg-purple-500 border-purple-600 text-white shadow-md shadow-purple-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <ArrowRightLeft class="w-4 h-4" />
          <span>CIA vs. AIC</span>
        </button>

        <button
          onClick={() => handleTabChange('quiz')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'quiz'
              ? 'bg-teal-500 border-teal-600 text-white shadow-md shadow-teal-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Award class="w-4 h-4" />
          <span>Playful Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'confidentiality' && <ConfidentialitySim />}
        {activeTab === 'integrity' && <IntegritySim />}
        {activeTab === 'availability' && <AvailabilitySim />}
        {activeTab === 'cia_vs_aic' && <CiaVsAicSim />}
        {activeTab === 'quiz' && <TriadQuiz />}
      </div>

    </div>
  );
}
