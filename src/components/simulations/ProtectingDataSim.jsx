import React, { useState } from 'react';
import { ArrowLeft, Award, Trash2, Globe } from 'lucide-react';
import GdprShredderSim from './GdprShredderSim';
import DataMinimizationSim from './DataMinimizationSim';
import ProtectingDataQuiz from './ProtectingDataQuiz';
import { sounds } from '../../utils/audio';

export default function ProtectingDataSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('shredder');

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
          <span>Back to Domain 3.0</span>
        </button>

        <span class="px-3 py-1 bg-blue-100 text-blue-950 rounded-full font-extrabold text-xs">
          Topic 3.3 • Protecting Data (GDPR, EU, GPS, IP, PII, SSN)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-blue-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🛡️</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3.3 - Protecting Data
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore the European Union General Data Protection Regulation (GDPR), the Right to be Forgotten, data minimization principles, and privacy controls for PII, SSN, IP, and GPS data!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('shredder')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'shredder'
              ? 'bg-blue-600 border-blue-700 text-white shadow-md shadow-blue-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Trash2 class="w-4 h-4" />
          <span>GDPR Right to be Forgotten Shredder (GDPR, EU, PII, SSN)</span>
        </button>

        <button
          onClick={() => handleTabChange('minimization')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'minimization'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Globe class="w-4 h-4" />
          <span>Data Minimization & Consent (GDPR, EU, GPS, IP)</span>
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
          <span>Protecting Data Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'shredder' && <GdprShredderSim />}
        {activeTab === 'minimization' && <DataMinimizationSim />}
        {activeTab === 'quiz' && <ProtectingDataQuiz />}
      </div>

    </div>
  );
}
