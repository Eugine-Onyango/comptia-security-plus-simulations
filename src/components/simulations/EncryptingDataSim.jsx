import React, { useState } from 'react';
import { ArrowLeft, Award, HardDrive, Truck } from 'lucide-react';
import DataAtRestSim from './DataAtRestSim';
import DataInTransitSim from './DataInTransitSim';
import EncryptingDataQuiz from './EncryptingDataQuiz';
import { sounds } from '../../utils/audio';

export default function EncryptingDataSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('at_rest');

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

        <span class="px-3 py-1 bg-sky-100 text-sky-950 rounded-full font-extrabold text-xs">
          Topic 1.4 • Encrypting Data (8 Acronyms)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-sky-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🔒</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1.4 - Encrypting Data (Rest vs. Transit)
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Learn how to protect data sleeping in storage (SSD, USB, EFS) and data moving across networks (HTTPS, VPN, SSL, TLS, IPsec)!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('at_rest')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'at_rest'
              ? 'bg-sky-500 border-sky-600 text-white shadow-md shadow-sky-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <HardDrive class="w-4 h-4" />
          <span>Data at Rest (SSD, USB, EFS)</span>
        </button>

        <button
          onClick={() => handleTabChange('in_transit')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'in_transit'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Truck class="w-4 h-4" />
          <span>Data in Transit (HTTPS, VPN, IPsec)</span>
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
          <span>Encrypting Data Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'at_rest' && <DataAtRestSim />}
        {activeTab === 'in_transit' && <DataInTransitSim />}
        {activeTab === 'quiz' && <EncryptingDataQuiz />}
      </div>

    </div>
  );
}
