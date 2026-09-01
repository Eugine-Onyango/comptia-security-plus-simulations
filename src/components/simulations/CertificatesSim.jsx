import React, { useState } from 'react';
import { ArrowLeft, Award, FileText, AlertOctagon, Lock, Sparkles } from 'lucide-react';
import CertFactorySim from './CertFactorySim';
import RevocationSim from './RevocationSim';
import SslTlsSim from './SslTlsSim';
import CertQuiz from './CertQuiz';
import { sounds } from '../../utils/audio';

export default function CertificatesSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('factory');

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

        <span class="px-3 py-1 bg-indigo-100 text-indigo-950 rounded-full font-extrabold text-xs">
          Topic 1.4 • Digital Certificates (14 Acronyms)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">📜</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1.4 - Digital Certificates & PKI
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Learn how websites get official digital passports (PKI, CA, CSR, X.509, SAN, HSM) and how browsers verify them (CRL, OCSP, CVE, SSL, TLS)!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('factory')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'factory'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <FileText class="w-4 h-4" />
          <span>Certificate Factory (CSR, CA, X.509, SAN)</span>
        </button>

        <button
          onClick={() => handleTabChange('revocation')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'revocation'
              ? 'bg-rose-500 border-rose-600 text-white shadow-md shadow-rose-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <AlertOctagon class="w-4 h-4" />
          <span>Revocation (CVE, CRL, OCSP)</span>
        </button>

        <button
          onClick={() => handleTabChange('ssltls')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'ssltls'
              ? 'bg-emerald-500 border-emerald-600 text-white shadow-md shadow-emerald-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Lock class="w-4 h-4" />
          <span>SSL vs. TLS Handshake</span>
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
          <span>Certificate Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'factory' && <CertFactorySim />}
        {activeTab === 'revocation' && <RevocationSim />}
        {activeTab === 'ssltls' && <SslTlsSim />}
        {activeTab === 'quiz' && <CertQuiz />}
      </div>

    </div>
  );
}
