import React, { useState } from 'react';
import { ArrowLeft, Award, ShieldCheck, Layers } from 'lucide-react';
import IpsecVpnSim from './IpsecVpnSim';
import IpsecModesSim from './IpsecModesSim';
import SecureInfraQuiz from './SecureInfraQuiz';
import { sounds } from '../../utils/audio';

export default function SecureInfraSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('vpn');

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

        <span class="px-3 py-1 bg-indigo-100 text-indigo-950 rounded-full font-extrabold text-xs">
          Topic 3.2 • Secure Infrastructures (IP, IPsec, VPN)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🛡️</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3.2 - Secure Infrastructures
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore network layer encryption using Internet Protocol Security (IPsec), encrypted Virtual Private Network (VPN) tunnels, and Transport vs Tunnel modes!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('vpn')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'vpn'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <ShieldCheck class="w-4 h-4" />
          <span>IPsec VPN Encrypted Tunnel (IP, IPsec, VPN)</span>
        </button>

        <button
          onClick={() => handleTabChange('modes')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'modes'
              ? 'bg-purple-600 border-purple-700 text-white shadow-md shadow-purple-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Layers class="w-4 h-4" />
          <span>IPsec Modes (Transport vs Tunnel)</span>
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
          <span>Secure Infra Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'vpn' && <IpsecVpnSim />}
        {activeTab === 'modes' && <IpsecModesSim />}
        {activeTab === 'quiz' && <SecureInfraQuiz />}
      </div>

    </div>
  );
}
