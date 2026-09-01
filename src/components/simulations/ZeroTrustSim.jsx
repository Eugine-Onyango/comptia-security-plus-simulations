import React, { useState } from 'react';
import { ArrowLeft, Award, Lock, Sliders, ShieldCheck } from 'lucide-react';
import ZeroTrustPlanesSim from './ZeroTrustPlanesSim';
import ZeroTrustAttributesSim from './ZeroTrustAttributesSim';
import ZeroTrustQuiz from './ZeroTrustQuiz';
import { sounds } from '../../utils/audio';

export default function ZeroTrustSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('planes');

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
          Topic 1.2 • Zero Trust Architecture (8 Acronyms)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🏰</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1.2 - Zero Trust Architecture
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Learn how Zero Trust enforces "Never Trust, Always Verify" using Data Plane (PEP Bouncer) & Control Plane (PDP Brain: PE Engine & PA Administrator)!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('planes')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'planes'
              ? 'bg-amber-500 border-amber-600 text-amber-950 shadow-md shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <ShieldCheck class="w-4 h-4" />
          <span>Control vs Data Planes (PEP, PDP, PE, PA)</span>
        </button>

        <button
          onClick={() => handleTabChange('attributes')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'attributes'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Sliders class="w-4 h-4" />
          <span>Context Attributes (IP, NAT, VPN, IT)</span>
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
          <span>Zero Trust Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'planes' && <ZeroTrustPlanesSim />}
        {activeTab === 'attributes' && <ZeroTrustAttributesSim />}
        {activeTab === 'quiz' && <ZeroTrustQuiz />}
      </div>

    </div>
  );
}
