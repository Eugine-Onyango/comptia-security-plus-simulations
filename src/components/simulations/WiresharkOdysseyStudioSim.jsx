import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldCheck, 
  Glasses, 
  Lock, 
  Handshake, 
  ShieldAlert, 
  Trophy, 
  BookOpen, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';
import { sounds } from '../../utils/audio';
import { WIRESHARK_SPRINTS } from './wireshark/wiresharkSprintData';
import WiresharkSprint0Prep from './wireshark/WiresharkSprint0Prep';
import WiresharkSprint1Xray from './wireshark/WiresharkSprint1Xray';
import WiresharkSprint2Encryption from './wireshark/WiresharkSprint2Encryption';
import WiresharkSprint3Handshakes from './wireshark/WiresharkSprint3Handshakes';
import WiresharkSprint4Attacks from './wireshark/WiresharkSprint4Attacks';
import WiresharkSprint5Capstone from './wireshark/WiresharkSprint5Capstone';

export default function WiresharkOdysseyStudioSim({ onBack }) {
  const [activeSprintId, setActiveSprintId] = useState(5); // Default to Sprint 5 now that it is active!
  const [showRoadmapGuide, setShowRoadmapGuide] = useState(false);

  const getSprintIcon = (iconName) => {
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Glasses': return <Glasses className="w-5 h-5" />;
      case 'Lock': return <Lock className="w-5 h-5" />;
      case 'Handshake': return <Handshake className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      default: return <ShieldCheck className="w-5 h-5" />;
    }
  };

  const handleSelectSprint = (sprint) => {
    if (sprint.id <= 5) {
      sounds.playPop();
      setActiveSprintId(sprint.id);
    } else {
      sounds.playBuzzer();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-sky-100 text-sky-950 border border-sky-300 rounded-full font-black text-xs">
            CompTIA Security+ SY0-701 • Hands-On Wireshark & Packet Odyssey
          </span>
        </div>
      </div>

      {/* Main Studio Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-sky-400 shadow-md space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">🦈🔍</span>
            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Wireshark Packet Odyssey
              </h1>
              <p className="text-slate-600 font-medium text-xs sm:text-base">
                Master packet sniffing step-by-step from zero without overwhelm! Built one focused sprint at a time.
              </p>
            </div>
          </div>

          <button
            onClick={() => { sounds.playPop(); setShowRoadmapGuide(!showRoadmapGuide); }}
            className="px-4 py-2.5 bg-sky-50 hover:bg-sky-100 text-sky-950 border-2 border-sky-300 rounded-2xl font-extrabold text-xs transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <BookOpen className="w-4 h-4 text-sky-700" />
            <span>Sprint Architecture Guide</span>
            {showRoadmapGuide ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Expandable Architecture Guide */}
        {showRoadmapGuide && (
          <div className="pt-4 border-t-2 border-sky-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fadeIn">
            {WIRESHARK_SPRINTS.map((sprint) => (
              <div 
                key={sprint.id}
                className={`rounded-2xl p-3.5 space-y-1.5 border-2 ${
                  sprint.id === 0 
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950' 
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider">{sprint.title}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                    sprint.id === 0 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {sprint.badge}
                  </span>
                </div>
                <div className="text-xs font-bold">{sprint.subtitle}</div>
                <p className="text-[11px] leading-relaxed opacity-90">{sprint.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SPRINT ROADMAP PROGRESS STEPPER */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-black text-slate-500 px-2 uppercase tracking-wider">
          <span>Sprint Roadmap (Sprint-by-Sprint Execution)</span>
          <span>Sprint 0 Active</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {WIRESHARK_SPRINTS.map((sprint) => {
            const isActive = sprint.id === activeSprintId;
            const isLocked = sprint.status === 'locked';

            return (
              <button
                key={sprint.id}
                onClick={() => handleSelectSprint(sprint)}
                className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-2 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg shadow-emerald-200 scale-102 ring-2 ring-emerald-400/40'
                    : isLocked
                    ? 'bg-white border-slate-200 hover:border-slate-300 text-slate-500 opacity-80'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-1.5 rounded-xl ${isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    {getSprintIcon(sprint.icon)}
                  </div>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-emerald-950 font-black' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isActive ? 'CURRENT' : sprint.badge}
                  </span>
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs font-black line-clamp-1">{sprint.title.split(':')[0]}</div>
                  <div className={`text-[11px] font-semibold line-clamp-1 ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {sprint.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SPRINT CONTENT CONTAINER */}
      <div className="min-h-[500px]">
        {activeSprintId === 0 && (
          <WiresharkSprint0Prep />
        )}

        {activeSprintId === 1 && (
          <WiresharkSprint1Xray />
        )}

        {activeSprintId === 2 && (
          <WiresharkSprint2Encryption />
        )}

        {activeSprintId === 3 && (
          <WiresharkSprint3Handshakes />
        )}

        {activeSprintId === 4 && (
          <WiresharkSprint4Attacks />
        )}

        {activeSprintId === 5 && (
          <WiresharkSprint5Capstone />
        )}
      </div>

    </div>
  );
}
