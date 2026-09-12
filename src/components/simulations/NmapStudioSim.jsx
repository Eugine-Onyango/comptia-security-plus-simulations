import React, { useState } from 'react';
import { 
  Radar, 
  Terminal, 
  Award, 
  BookOpen, 
  ArrowLeft, 
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { sounds } from '../../utils/audio';
import NmapRadarAnimation from './nmap/NmapRadarAnimation';
import NmapTerminalSandbox from './nmap/NmapTerminalSandbox';
import NmapPbqChallenge from './nmap/NmapPbqChallenge';
import { NMAP_FLAGS } from './nmap/nmapData';

export default function NmapStudioSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('radar'); // 'radar', 'sandbox', 'pbq'
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const handleTabChange = (tab) => {
    sounds.playPop();
    setActiveTab(tab);
  };

  const toggleCheatSheet = () => {
    sounds.playPop();
    setShowCheatSheet(!showCheatSheet);
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div class="flex items-center justify-between">
        <button
          onClick={onBack}
          class="flex items-center gap-2 px-4 py-2 bg-white hover:bg-emerald-50 text-emerald-950 border-2 border-emerald-300 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-emerald-100 text-emerald-950 border border-emerald-300 rounded-full font-black text-xs">
            CompTIA Security+ SY0-701 • Domain 4.3 Nmap Reconnaissance Studio
          </span>
        </div>
      </div>

      {/* Main Studio Title Card */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-emerald-400 shadow-md space-y-4">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <span class="text-4xl">📡💻</span>
            <div>
              <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                The Nmap Radar & Network Recon Lab
              </h1>
              <p class="text-slate-600 font-medium text-xs sm:text-base">
                Master port scanning without the confusion! Learn <strong>`-sS` (SYN Stealth "Ding-Dong Ditch")</strong> vs <strong>`-sT` (Full Connect)</strong>, port states (<code>open</code>, <code>closed</code>, <code>filtered</code>), and dissect scan logs line-by-line!
              </p>
            </div>
          </div>

          <button
            onClick={toggleCheatSheet}
            class="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 border-2 border-emerald-300 rounded-2xl font-extrabold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <BookOpen class="w-4 h-4 text-emerald-700" />
            <span>Nmap Flags Cheat Sheet ({NMAP_FLAGS.length})</span>
            {showCheatSheet ? <ChevronUp class="w-4 h-4" /> : <ChevronDown class="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Cheat Sheet */}
        {showCheatSheet && (
          <div class="pt-4 border-t-2 border-emerald-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fadeIn">
            {NMAP_FLAGS.map((f) => (
              <div key={f.flag} class="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-3.5 space-y-1.5 shadow-sm">
                <div class="flex items-center justify-between">
                  <span class="font-mono font-black text-emerald-800 text-sm">{f.flag}</span>
                  <span class="text-[10px] font-bold text-slate-500 uppercase">{f.name}</span>
                </div>
                <p class="text-xs text-slate-700 leading-relaxed font-medium">{f.plainMeaning}</p>
                <div class="pt-1 text-[11px] text-emerald-900 font-semibold bg-white/80 p-2 rounded-xl border border-emerald-200/60">
                  🎯 <strong>CompTIA Key Rule:</strong> {f.compTiaExamRule}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mode Navigation Tabs */}
      <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        
        {/* Tab 1: Radar Scan */}
        <button
          onClick={() => handleTabChange('radar')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 cursor-pointer ${
            activeTab === 'radar'
              ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg shadow-emerald-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Radar class="w-4 h-4" />
          <span>1. The Radar Court: Ding-Dong Ditch (-sS vs -sT) 🏃‍♂️🔔</span>
        </button>

        {/* Tab 2: Terminal Sandbox */}
        <button
          onClick={() => handleTabChange('sandbox')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 cursor-pointer ${
            activeTab === 'sandbox'
              ? 'bg-teal-600 border-teal-700 text-white shadow-lg shadow-teal-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Terminal class="w-4 h-4" />
          <span>2. Live Terminal Sandbox & Flag Dissector 💻⚡</span>
        </button>

        {/* Tab 3: PBQ Challenge */}
        <button
          onClick={() => handleTabChange('pbq')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 cursor-pointer ${
            activeTab === 'pbq'
              ? 'bg-purple-600 border-purple-700 text-white shadow-lg shadow-purple-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Award class="w-4 h-4" />
          <span>3. CompTIA PBQ Recon Master Challenge 🏆🎯</span>
        </button>

      </div>

      {/* Main Tab Content Display */}
      <div class="min-h-[500px]">
        {activeTab === 'radar' && (
          <NmapRadarAnimation />
        )}

        {activeTab === 'sandbox' && (
          <NmapTerminalSandbox />
        )}

        {activeTab === 'pbq' && (
          <NmapPbqChallenge />
        )}
      </div>

    </div>
  );
}
