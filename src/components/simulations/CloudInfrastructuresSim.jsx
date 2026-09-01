import React, { useState } from 'react';
import { ArrowLeft, Award, Cloud, Zap } from 'lucide-react';
import CloudStackSim from './CloudStackSim';
import FaasApiSim from './FaasApiSim';
import CloudQuiz from './CloudQuiz';
import { sounds } from '../../utils/audio';

export default function CloudInfrastructuresSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('stack');

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

        <span class="px-3 py-1 bg-sky-100 text-sky-950 rounded-full font-extrabold text-xs">
          Topic 3.1 • Cloud Infrastructures (IaaS, PaaS, SaaS, FaaS, OS, API)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-sky-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">☁️</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3.1 - Cloud Infrastructures
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore the shared responsibility matrix across IaaS, PaaS, SaaS, and FaaS, and see how APIs trigger serverless microservices without OS overhead!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('stack')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'stack'
              ? 'bg-sky-600 border-sky-700 text-white shadow-md shadow-sky-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Cloud class="w-4 h-4" />
          <span>Shared Responsibility Stack (IaaS, PaaS, SaaS, FaaS, OS)</span>
        </button>

        <button
          onClick={() => handleTabChange('faas_api')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'faas_api'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Zap class="w-4 h-4" />
          <span>Serverless FaaS & API Gateway (FaaS, API, OS)</span>
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
          <span>Cloud Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'stack' && <CloudStackSim />}
        {activeTab === 'faas_api' && <FaasApiSim />}
        {activeTab === 'quiz' && <CloudQuiz />}
      </div>

    </div>
  );
}
