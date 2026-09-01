import React, { useState } from 'react';
import { ArrowLeft, Award, Lock, Radio } from 'lucide-react';
import NacPortGateSim from './NacPortGateSim';
import SiemRadarSim from './SiemRadarSim';
import NetworkAppliancesQuiz from './NetworkAppliancesQuiz';
import { sounds } from '../../utils/audio';

export default function NetworkAppliancesSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('nac');

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
          Topic 3.2 • Network Appliances & Port Security (SSH, RDP, SIEM, URL, FTP, EAP, RFC, IEEE, 802.1X, NAC, SSL, QoS)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🚪</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3.2 - Network Appliances & Port Security
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore 802.1X port security, NAC posture health checks, SIEM log correlation radar, web proxies, and QoS bandwidth shapers!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('nac')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'nac'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Lock class="w-4 h-4" />
          <span>802.1X & NAC Port Security Gate (802.1X, NAC, EAP, IEEE, RFC)</span>
        </button>

        <button
          onClick={() => handleTabChange('siem')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'siem'
              ? 'bg-amber-500 border-amber-600 text-amber-950 shadow-md shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Radio class="w-4 h-4" />
          <span>SIEM Radar & Traffic Shaper (SIEM, SSH, RDP, URL, FTP, SSL, QoS)</span>
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
          <span>Appliances Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'nac' && <NacPortGateSim />}
        {activeTab === 'siem' && <SiemRadarSim />}
        {activeTab === 'quiz' && <NetworkAppliancesQuiz />}
      </div>

    </div>
  );
}
