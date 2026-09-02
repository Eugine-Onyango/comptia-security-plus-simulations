import React from 'react';
import { Shield, Home, Volume2, VolumeX, Sparkles, Heart } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Header({ currentView, setCurrentView, soundEnabled, setSoundEnabled }) {
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playPop();
  };

  const goHome = () => {
    sounds.playPop();
    setCurrentView('home');
  };

  return (
    <header class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b-4 border-amber-200 shadow-sm">
      <div class="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Logo / Brand */}
        <button 
          onClick={goHome} 
          class="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-amber-200 group-hover:scale-105 transition-transform">
            <Shield class="w-7 h-7 fill-white/20 stroke-[2.5]" />
          </div>
          <div>
            <div class="flex items-center gap-1.5 font-bold text-xl text-slate-800 tracking-wide">
              <span>Security+ Acronym Playground</span>
              <Sparkles class="w-5 h-5 text-amber-500 fill-amber-400 animate-bounce" />
            </div>
            <p class="text-xs font-semibold text-slate-500">Super Easy • No Tech Jargon • Fun for Everyone!</p>
          </div>
        </button>

        {/* Navigation & Controls */}
        <div class="flex items-center gap-3">
          <button
            onClick={() => { sounds.playPop(); setCurrentView('exam_bank'); }}
            class={`flex items-center gap-2 px-4 py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 ${
              currentView === 'exam_bank'
                ? 'bg-purple-600 border-purple-700 text-white shadow-purple-200'
                : 'bg-purple-100 hover:bg-purple-200 border-purple-300 text-purple-950'
            }`}
          >
            <span>📜 Exam Question Bank</span>
          </button>

          {currentView !== 'home' && (
            <button
              onClick={goHome}
              class="flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full font-bold text-sm transition-all shadow-sm active:scale-95"
            >
              <Home class="w-4 h-4" />
              <span>All Topics</span>
            </button>
          )}

          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            class={`flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-sm transition-all shadow-sm active:scale-95 border-2 ${
              soundEnabled 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100' 
                : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 class="w-4 h-4 text-emerald-600" /> : <VolumeX class="w-4 h-4 text-slate-400" />}
            <span class="hidden sm:inline">{soundEnabled ? "Sounds On" : "Muted"}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
