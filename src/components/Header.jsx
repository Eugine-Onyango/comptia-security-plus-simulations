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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 sm:border-b-4 border-amber-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2.5 sm:gap-4">
        
        {/* Top bar on mobile: Logo + Sound toggle */}
        <div className="flex items-center justify-between gap-2">
          <button 
            onClick={goHome} 
            className="flex items-center gap-2.5 sm:gap-3 group text-left focus:outline-none"
          >
            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-400 via-orange-400 to-yellow-500 flex items-center justify-center text-white shadow-md shadow-amber-200 group-hover:scale-105 transition-transform shrink-0">
              <Shield className="w-5 h-5 sm:w-7 sm:h-7 fill-white/20 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 font-black text-base sm:text-xl text-slate-800 tracking-tight sm:tracking-wide">
                <span>Security+ Playground</span>
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400 animate-bounce" />
              </div>
              <p className="text-[10px] sm:text-xs font-semibold text-slate-500 line-clamp-1">Super Easy • No Tech Jargon • Hands-on!</p>
            </div>
          </button>

          {/* Sound toggle right next to title on mobile */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 md:hidden shrink-0 ${
              soundEnabled 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700' 
                : 'bg-slate-100 border-slate-300 text-slate-500'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-emerald-600" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
            <span className="text-[11px]">{soundEnabled ? "Audio" : "Mute"}</span>
          </button>
        </div>

        {/* Navigation Ribbon: Horizontally swipeable on mobile, wraps nicely on tablet/desktop */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-3 px-3 sm:mx-0 sm:px-0">
          <button
            onClick={() => { sounds.playPop(); setCurrentView('ports_sim'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'ports_sim'
                ? 'bg-amber-500 border-amber-600 text-white shadow-amber-200'
                : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950'
            }`}
          >
            <span>🚪 Ports Hotel</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('firewall_sim'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'firewall_sim'
                ? 'bg-indigo-600 border-indigo-700 text-white shadow-indigo-200'
                : 'bg-indigo-100 hover:bg-indigo-200 border-indigo-300 text-indigo-950'
            }`}
          >
            <span>🛡️ Firewall & ACLs</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('pcap_sim'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'pcap_sim'
                ? 'bg-sky-600 border-sky-700 text-white shadow-sky-200'
                : 'bg-sky-100 hover:bg-sky-200 border-sky-300 text-sky-950'
            }`}
          >
            <span>🔍 Packet Inspector</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('nmap_sim'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'nmap_sim'
                ? 'bg-emerald-600 border-emerald-700 text-white shadow-emerald-200'
                : 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-950'
            }`}
          >
            <span>📡 Nmap Recon</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('wireshark_odyssey'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'wireshark_odyssey'
                ? 'bg-cyan-600 border-cyan-700 text-white shadow-cyan-200'
                : 'bg-cyan-100 hover:bg-cyan-200 border-cyan-300 text-cyan-950'
            }`}
          >
            <span>🦈 Wireshark</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('checkpoint1'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'checkpoint1'
                ? 'bg-rose-600 border-rose-700 text-white shadow-rose-200'
                : 'bg-rose-100 hover:bg-rose-200 border-rose-300 text-rose-950'
            }`}
          >
            <span>🎯 Checkpoint 1</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('checkpoint2'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'checkpoint2'
                ? 'bg-orange-600 border-orange-700 text-white shadow-orange-200'
                : 'bg-orange-100 hover:bg-orange-200 border-orange-300 text-orange-950'
            }`}
          >
            <span>🛡️ Checkpoint 2</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('prepset_domain1'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'prepset_domain1'
                ? 'bg-amber-600 border-amber-700 text-white shadow-amber-200'
                : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950'
            }`}
          >
            <span>🏛️ PrepSet D1</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('prepset_domain2'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'prepset_domain2'
                ? 'bg-rose-600 border-rose-700 text-white shadow-rose-200'
                : 'bg-rose-100 hover:bg-rose-200 border-rose-300 text-rose-950'
            }`}
          >
            <span>🔥 PrepSet D2</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('prepset_domain3'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'prepset_domain3'
                ? 'bg-indigo-600 border-indigo-700 text-white shadow-indigo-200'
                : 'bg-indigo-100 hover:bg-indigo-200 border-indigo-300 text-indigo-950'
            }`}
          >
            <span>🏰 PrepSet D3</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('prepset_domain4'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'prepset_domain4'
                ? 'bg-red-600 border-red-700 text-white shadow-red-200'
                : 'bg-red-100 hover:bg-red-200 border-red-300 text-red-950'
            }`}
          >
            <span>🚨 PrepSet D4</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('prepset_domain5'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'prepset_domain5'
                ? 'bg-emerald-600 border-emerald-700 text-white shadow-emerald-200'
                : 'bg-emerald-100 hover:bg-emerald-200 border-emerald-300 text-emerald-950'
            }`}
          >
            <span>⚖️ PrepSet D5</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('full_mock_exams'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'full_mock_exams'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-700 text-white shadow-purple-200 shadow-md scale-105'
                : 'bg-gradient-to-r from-purple-100 to-indigo-100 hover:from-purple-200 hover:to-indigo-200 border-purple-400 text-purple-950 font-black'
            }`}
          >
            <span>🎓 90-Q Mocks</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('command_drills'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'command_drills'
                ? 'bg-amber-500 border-amber-600 text-white shadow-amber-200'
                : 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-950'
            }`}
          >
            <span>⚡ CLI Drills</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setCurrentView('exam_bank'); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full font-extrabold text-xs sm:text-sm transition-all shadow-sm active:scale-95 border-2 whitespace-nowrap shrink-0 ${
              currentView === 'exam_bank'
                ? 'bg-purple-600 border-purple-700 text-white shadow-purple-200'
                : 'bg-purple-100 hover:bg-purple-200 border-purple-300 text-purple-950'
            }`}
          >
            <span>📜 Exam Bank</span>
          </button>

          {currentView !== 'home' && (
            <button
              onClick={goHome}
              className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-full font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95 whitespace-nowrap shrink-0 border-2 border-amber-300"
            >
              <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>All Topics</span>
            </button>
          )}

          {/* Desktop sound toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Mute Sound Effects" : "Enable Sound Effects"}
            className={`hidden md:flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-sm transition-all shadow-sm active:scale-95 border-2 shrink-0 ${
              soundEnabled 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100' 
                : 'bg-slate-100 border-slate-300 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
            <span>{soundEnabled ? "Sounds On" : "Muted"}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
