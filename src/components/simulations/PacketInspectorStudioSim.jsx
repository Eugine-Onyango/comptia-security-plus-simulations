import React, { useState } from 'react';
import { ArrowLeft, Package, Activity, Search, Shield, Sparkles } from 'lucide-react';
import PacketUnwrapperSim from './pcap/PacketUnwrapperSim';
import WiresharkMiniLab from './pcap/WiresharkMiniLab';
import PacketDetectiveChallenge from './pcap/PacketDetectiveChallenge';
import { sounds } from '../../utils/audio';

export default function PacketInspectorStudioSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('unwrapper'); // 'unwrapper', 'wireshark', 'detective'

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
          class="flex items-center gap-2 px-4 py-2 bg-white hover:bg-sky-100 text-sky-900 border-2 border-sky-300 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-sky-100 text-sky-950 border border-sky-300 rounded-full font-black text-xs">
            CompTIA Security+ SY0-701 • Packet Analysis & Forensics Studio
          </span>
        </div>
      </div>

      {/* Main Studio Title Card */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-sky-400 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-4xl">📦🔬</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The Packet Inspector & Wireshark Forensic Lab
            </h1>
            <p class="text-slate-600 font-medium text-xs sm:text-base">
              The ultimate non-foggy guide to packet capture! Peel open the Russian nesting doll of packet headers, filter live PCAPs like Wireshark pros, and solve incident investigation tickets!
            </p>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        
        {/* Tab 1: Packet Unwrapper */}
        <button
          onClick={() => handleTabChange('unwrapper')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 ${
            activeTab === 'unwrapper'
              ? 'bg-sky-600 border-sky-700 text-white shadow-lg shadow-sky-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Package class="w-4 h-4" />
          <span>1. The X-Ray Packet Unwrapper (Nesting Dolls) 📦</span>
        </button>

        {/* Tab 2: Wireshark Mini-Lab */}
        <button
          onClick={() => handleTabChange('wireshark')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 ${
            activeTab === 'wireshark'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Activity class="w-4 h-4" />
          <span>2. Wireshark Mini-Lab & NetFlow Matrix 🦈📱</span>
        </button>

        {/* Tab 3: Packet Detective */}
        <button
          onClick={() => handleTabChange('detective')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 ${
            activeTab === 'detective'
              ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg shadow-emerald-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Search class="w-4 h-4" />
          <span>3. Packet Detective: CompTIA Forensics 🕵️‍♂️</span>
        </button>

      </div>

      {/* Main Tab Content */}
      <div class="min-h-[500px]">
        {activeTab === 'unwrapper' && <PacketUnwrapperSim />}
        {activeTab === 'wireshark' && <WiresharkMiniLab />}
        {activeTab === 'detective' && <PacketDetectiveChallenge />}
      </div>

    </div>
  );
}
