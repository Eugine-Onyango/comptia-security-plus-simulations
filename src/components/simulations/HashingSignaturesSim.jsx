import React, { useState } from 'react';
import { ArrowLeft, Award, Fingerprint, AlertTriangle } from 'lucide-react';
import HashBlenderSim from './HashBlenderSim';
import Md5CollisionSim from './Md5CollisionSim';
import HashingQuiz from './HashingQuiz';
import { sounds } from '../../utils/audio';

export default function HashingSignaturesSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('blender');

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
          Topic 1.4 • Hashing & Digital Signatures (MD5)
        </span>
      </div>

      {/* Title Header */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-3xl">🧬</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              1.4 - Hashing and Digital Signatures
            </h1>
            <p class="text-slate-600 font-medium text-sm sm:text-base">
              Learn how one-way cryptographic hash functions generate digital fingerprints, and why MD5 (Message Digest 5) is deprecated due to collision attacks!
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        
        <button
          onClick={() => handleTabChange('blender')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'blender'
              ? 'bg-amber-500 border-amber-600 text-amber-950 shadow-md shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Fingerprint class="w-4 h-4" />
          <span>Hash Blender & MD5 (MD5)</span>
        </button>

        <button
          onClick={() => handleTabChange('collision')}
          class={`px-4 py-3 rounded-2xl font-extrabold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-2 ${
            activeTab === 'collision'
              ? 'bg-rose-600 border-rose-700 text-white shadow-md shadow-rose-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <AlertTriangle class="w-4 h-4" />
          <span>MD5 Collision Attack Lab</span>
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
          <span>Hashing Quiz 🎮</span>
        </button>

      </div>

      {/* Tab Content Display */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm">
        {activeTab === 'blender' && <HashBlenderSim />}
        {activeTab === 'collision' && <Md5CollisionSim />}
        {activeTab === 'quiz' && <HashingQuiz />}
      </div>

    </div>
  );
}
