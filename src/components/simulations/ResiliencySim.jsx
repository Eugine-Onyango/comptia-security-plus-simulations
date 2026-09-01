import React, { useState } from 'react';
import { ArrowLeft, Award, Cloud, Building } from 'lucide-react';
import AwsHaFailoverSim from './AwsHaFailoverSim';
import CoopDisasterSim from './CoopDisasterSim';
import ResiliencyQuiz from './ResiliencyQuiz';
import { sounds } from '../../utils/audio';

export default function ResiliencySim({ onBack }) {
  const [activeTab, setActiveTab] = useState('ha');

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

        <span class="px-3 py-1 bg-amber-100 text-amber-950 rounded-full font-extrabold text-xs">
          Topic 3.4 • Resiliency (HA, OS, AWS, COOP)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">⚡</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3.4 - Resiliency & Business Continuity
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore High Availability (HA) failover clusters across Amazon Web Services (AWS) Availability Zones, operating system (OS) replication, and Continuity of Operations Planning (COOP)!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('ha')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'ha'
              ? 'bg-amber-500 border-amber-600 text-amber-950 shadow-md shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Cloud class="w-4 h-4" />
          <span>AWS Multi-AZ High Availability (HA, OS, AWS)</span>
        </button>

        <button
          onClick={() => handleTabChange('coop')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'coop'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Building class="w-4 h-4" />
          <span>COOP Disaster Command Center (COOP, HA, AWS)</span>
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
          <span>Resiliency Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'ha' && <AwsHaFailoverSim />}
        {activeTab === 'coop' && <CoopDisasterSim />}
        {activeTab === 'quiz' && <ResiliencyQuiz />}
      </div>

    </div>
  );
}
