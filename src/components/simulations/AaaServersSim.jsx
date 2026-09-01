import React, { useState } from 'react';
import { ArrowLeft, Award, Key, Server } from 'lucide-react';
import AaaProtocolsSim from './AaaProtocolsSim';
import RadiusVsTacacsSim from './RadiusVsTacacsSim';
import AaaServersQuiz from './AaaServersQuiz';
import { sounds } from '../../utils/audio';

export default function AaaServersSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('flow');

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
          Topic 3.2 • AAA Directory & Port Security (RADIUS, LDAP, TACACS+)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🔑</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3.2 - AAA Directory & Port Security
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore Remote Authentication Dial-In User Service (RADIUS), Lightweight Directory Access Protocol (LDAP), and Terminal Access Controller ACS+ (TACACS+)!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('flow')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'flow'
              ? 'bg-amber-500 border-amber-600 text-amber-950 shadow-md shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Key class="w-4 h-4" />
          <span>802.1X AAA & LDAP Flow (RADIUS, LDAP, TACACS+)</span>
        </button>

        <button
          onClick={() => handleTabChange('vs')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'vs'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Server class="w-4 h-4" />
          <span>RADIUS vs TACACS+ Showdown</span>
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
        {activeTab === 'flow' && <AaaProtocolsSim />}
        {activeTab === 'vs' && <RadiusVsTacacsSim />}
        {activeTab === 'quiz' && <AaaServersQuiz />}
      </div>

    </div>
  );
}
