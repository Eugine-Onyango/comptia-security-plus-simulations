import React, { useState } from 'react';
import { ArrowLeft, Award, Cloud, Server } from 'lucide-react';
import SaseCasbSim from './SaseCasbSim';
import SdwanVpnSim from './SdwanVpnSim';
import SecureCommQuiz from './SecureCommQuiz';
import { sounds } from '../../utils/audio';

export default function SecureCommSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('sase');

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
          Topic 3.2 • Secure Communication (VPN, SSL, TLS, TCP, IPsec, SD-WAN, WAN, SASE, ZTNA, CASB, SaaS, DLP, DNS)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-sky-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">☁️</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3.2 - Secure Communication
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore SASE cloud security mesh, Cloud Access Security Brokers (CASB), Data Loss Prevention (DLP), ZTNA micro-segmentation, SD-WAN, and IPsec/TLS VPNs!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('sase')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'sase'
              ? 'bg-sky-600 border-sky-700 text-white shadow-md shadow-sky-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Cloud class="w-4 h-4" />
          <span>SASE Cloud & CASB DLP (SASE, CASB, ZTNA, SaaS, DLP)</span>
        </button>

        <button
          onClick={() => handleTabChange('sdwan')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'sdwan'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Server class="w-4 h-4" />
          <span>VPN vs SD-WAN & ZTNA (VPN, SD-WAN, ZTNA, IPsec, TLS)</span>
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
          <span>Communication Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'sase' && <SaseCasbSim />}
        {activeTab === 'sdwan' && <SdwanVpnSim />}
        {activeTab === 'quiz' && <SecureCommQuiz />}
      </div>

    </div>
  );
}
