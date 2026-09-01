import React, { useState } from 'react';
import { ArrowLeft, Award, ClipboardList, Key } from 'lucide-react';
import ChangePipelineSim from './ChangePipelineSim';
import PkiExchangeAnimSim from './PkiExchangeAnimSim';
import ChangePkiQuiz from './ChangePkiQuiz';
import { sounds } from '../../utils/audio';

export default function ChangeManagementSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('pipeline');

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

        <span class="px-3 py-1 bg-blue-100 text-blue-950 rounded-full font-extrabold text-xs">
          Topic 1.3 & 1.4 • Change Management & PKI (CEO, IT, PKI)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-blue-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">📋</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1.3 Change Management & 1.4 PKI Key Exchange
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Learn how IT change pipelines maintain CEO visibility, and how PKI asymmetric keys securely deliver fast symmetric session keys!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('pipeline')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'pipeline'
              ? 'bg-blue-600 border-blue-700 text-white shadow-md shadow-blue-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <ClipboardList class="w-4 h-4" />
          <span>Change Pipeline (CEO & IT)</span>
        </button>

        <button
          onClick={() => handleTabChange('pki_exchange')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'pki_exchange'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Key class="w-4 h-4" />
          <span>PKI Key Exchange Protocol (PKI)</span>
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
          <span>Change & PKI Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'pipeline' && <ChangePipelineSim />}
        {activeTab === 'pki_exchange' && <PkiExchangeAnimSim />}
        {activeTab === 'quiz' && <ChangePkiQuiz />}
      </div>

    </div>
  );
}
