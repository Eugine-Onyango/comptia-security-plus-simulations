import React, { useState } from 'react';
import { ArrowLeft, Award, ShieldCheck, Layers } from 'lucide-react';
import WafSqlSim from './WafSqlSim';
import NgfwUtmSim from './NgfwUtmSim';
import FirewallTypesQuiz from './FirewallTypesQuiz';
import { sounds } from '../../utils/audio';

export default function FirewallTypesSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('waf');

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

        <span class="px-3 py-1 bg-rose-100 text-rose-950 rounded-full font-extrabold text-xs">
          Topic 3.2 • Firewall Types (OSI, NGFW, NAT, UTM, CSU, DSU, WAF, SQL, PCI DSS)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-rose-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🛡️</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              3.2 - Firewall Types
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Explore Layer 7 Web Application Firewalls (WAF) blocking SQL injection under PCI DSS, Next-Generation Firewalls (NGFW), Unified Threat Management (UTM), and CSU/DSU interfaces!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('waf')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'waf'
              ? 'bg-rose-600 border-rose-700 text-white shadow-md shadow-rose-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <ShieldCheck class="w-4 h-4" />
          <span>WAF & SQL Injection (WAF, SQL, PCI DSS)</span>
        </button>

        <button
          onClick={() => handleTabChange('ngfw')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'ngfw'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Layers class="w-4 h-4" />
          <span>NGFW & UTM Appliances (NGFW, UTM, CSU/DSU)</span>
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
          <span>Firewalls Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'waf' && <WafSqlSim />}
        {activeTab === 'ngfw' && <NgfwUtmSim />}
        {activeTab === 'quiz' && <FirewallTypesQuiz />}
      </div>

    </div>
  );
}
