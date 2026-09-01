import React, { useState } from 'react';
import { ArrowLeft, Award, Ruler, Globe } from 'lucide-react';
import GapAuditSim from './GapAuditSim';
import StandardsCompareSim from './StandardsCompareSim';
import GapQuiz from './GapQuiz';
import { sounds } from '../../utils/audio';

export default function GapAnalysisSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('audit');

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

        <span class="px-3 py-1 bg-amber-100 text-amber-950 rounded-full font-extrabold text-xs">
          Topic 1.2 • Gap Analysis (NIST, ISO, IEC)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">📏</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1.2 - Gap Analysis & Standards
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Learn how to compare your security posture against standards like NIST SP 800-171 and ISO/IEC 27001 to find and fix security gaps!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('audit')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'audit'
              ? 'bg-amber-500 border-amber-600 text-amber-950 shadow-md shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Ruler class="w-4 h-4" />
          <span>Gap Audit Inspector (NIST & ISO/IEC)</span>
        </button>

        <button
          onClick={() => handleTabChange('standards')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'standards'
              ? 'bg-blue-600 border-blue-700 text-white shadow-md shadow-blue-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Globe class="w-4 h-4" />
          <span>Standards Comparison (NIST vs ISO/IEC)</span>
        </button>

        <button
          onClick={() => handleTabChange('quiz')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'quiz'
              ? 'bg-purple-500 border-purple-600 text-white shadow-md shadow-purple-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Award class="w-4 h-4" />
          <span>Gap Analysis Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'audit' && <GapAuditSim />}
        {activeTab === 'standards' && <StandardsCompareSim />}
        {activeTab === 'quiz' && <GapQuiz />}
      </div>

    </div>
  );
}
