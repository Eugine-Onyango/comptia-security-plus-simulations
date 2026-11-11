import React, { useState, useEffect } from 'react';
import {
  Shield,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  RotateCcw,
  Boxes,
  Zap,
  Layers,
  Search,
  PieChart,
  HardDrive,
  Share2,
  ChevronRight,
  Compass,
  Smile,
  Truck,
  Award,
  KeyRound,
  LayoutGrid,
  Lock,
  UserCheck,
  DoorOpen,
  Clock,
  Gauge,
  Download,
  Share,
  Pause,
  Play,
  Square,
  FileSpreadsheet,
  Activity,
  Filter,
  PlusCircle,
  MinusCircle,
  MousePointerClick,
  Calendar,
  Asterisk,
  CaseSensitive,
  Check,
  X,
  Coffee,
  AlertCircle,
  Cpu,
  ArrowRightCircle,
  FastForward,
  BookmarkCheck,
  Tag,
  Table,
  FileText,
  Network,
  Globe,
  SlidersHorizontal,
  BarChart3,
  LineChart,
  MonitorCheck,
  Tv,
  Edit3,
  Maximize2,
  Trophy,
  Flame,
  ArrowLeft
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { splunkModule1Data } from './splunkModule1Data';
import { splunkModule2Data } from './splunkModule2Data';
import { splunkModule3Data } from './splunkModule3Data';
import { splunkModule4Data } from './splunkModule4Data';
import { splunkModule5Data } from './splunkModule5Data';
import { splunkModule6Data } from './splunkModule6Data';
import { splunkModule7Data } from './splunkModule7Data';
import { splunkModule8Data } from './splunkModule8Data';

// Sound effects wrapper using Web Audio API
class HubAudio {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }
  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }
  playPop() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {}
  }
  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + idx * 0.07 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.2);
      });
    } catch (e) {}
  }
}

const sounds = new HubAudio();

export default function SplunkGuardHub({ onSwitchView }) {
  // Navigation: Active Module (1 to 8)
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeSubtopicId, setActiveSubtopicId] = useState('components');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Module 1 Interactive States
  const [activeHelperTab, setActiveHelperTab] = useState('forwarder');
  const [activeBeatStep, setActiveBeatStep] = useState(0);

  // Module 2 Interactive States
  const [activeAppRoom, setActiveAppRoom] = useState('search_reporting');
  const [activeRoleBadge, setActiveRoleBadge] = useState('power_user');

  // Module 3 Interactive States
  const [selectedSearchQuery, setSelectedSearchQuery] = useState('status=500 error');
  const [selectedTimeRange, setSelectedTimeRange] = useState('15m');
  const [activeSearchMode, setActiveSearchMode] = useState('smart');
  const [jobState, setJobState] = useState('done');

  // Module 4 Interactive States
  const [m4SearchQuery, setM4SearchQuery] = useState('index=main error');
  const [activeFieldPopup, setActiveFieldPopup] = useState(null);

  // Module 5 Interactive States
  const [selectedWildcardPattern, setSelectedWildcardPattern] = useState('fail*');
  const [selectedBooleanDemo, setSelectedBooleanDemo] = useState('AND');

  // Module 6 Interactive States
  const [selectedAnatomyPart, setSelectedAnatomyPart] = useState('pipe');
  const [benchmarkMode, setBenchmarkMode] = useState('early');

  // Module 7 Interactive States
  const [activeKoCategory, setActiveKoCategory] = useState('enrichment');
  const [isLookupApplied, setIsLookupApplied] = useState(false);
  const [selectedPermissionLevel, setSelectedPermissionLevel] = useState('app');

  // Module 8 Interactive States
  const [selectedVizType, setSelectedVizType] = useState('bar');
  const [isDashboardEditMode, setIsDashboardEditMode] = useState(false);

  // Read-Aloud State
  const [speakingBoxId, setSpeakingBoxId] = useState(null);
  const [speechRate, setSpeechRate] = useState(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('splunk_speech_rate') : null;
      return saved ? parseFloat(saved) : 0.95;
    } catch (e) {
      return 0.95;
    }
  });

  // Quiz state
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState({});

  let currentModuleData = splunkModule1Data;
  if (activeModuleId === 2) currentModuleData = splunkModule2Data;
  if (activeModuleId === 3) currentModuleData = splunkModule3Data;
  if (activeModuleId === 4) currentModuleData = splunkModule4Data;
  if (activeModuleId === 5) currentModuleData = splunkModule5Data;
  if (activeModuleId === 6) currentModuleData = splunkModule6Data;
  if (activeModuleId === 7) currentModuleData = splunkModule7Data;
  if (activeModuleId === 8) currentModuleData = splunkModule8Data;

  const subtopics = currentModuleData.subtopics;
  const currentSubtopic = subtopics.find((s) => s.id === activeSubtopicId) || subtopics[0];

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
    setSpeakingBoxId(null);
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  const handleSwitchModule = (modId) => {
    sounds.playPop();
    stopSpeech();
    setActiveModuleId(modId);
    if (modId === 1) setActiveSubtopicId('components');
    else if (modId === 2) setActiveSubtopicId('web_and_apps');
    else if (modId === 3) setActiveSubtopicId('search_and_time');
    else if (modId === 4) setActiveSubtopicId('timestamps_and_refining');
    else if (modId === 5) setActiveSubtopicId('wildcards_and_quotes');
    else if (modId === 6) setActiveSubtopicId('anatomy_of_spl');
    else if (modId === 7) setActiveSubtopicId('five_categories');
    else setActiveSubtopicId('reports_and_transforming');
    setSelectedAnswers({});
    setShowFeedback({});
  };

  const handleSetSpeechRate = (rate) => {
    setSpeechRate(rate);
    try {
      localStorage.setItem('splunk_speech_rate', String(rate));
    } catch (e) {}
    sounds.playPop();
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.enabled = next;
    if (next) sounds.playPop();
  };

  const speakBoxText = (boxId, textToRead) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingBoxId === boxId) {
      stopSpeech();
      return;
    }

    stopSpeech();

    const clean = textToRead
      .replace(/[#*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    try {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        const preferred = voices.find(
          (v) =>
            v.lang.startsWith('en') &&
            (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Online'))
        );
        if (preferred) utterance.voice = preferred;
      }
    } catch (e) {}

    utterance.onend = () => {
      setSpeakingBoxId(null);
    };
    utterance.onerror = () => {
      setSpeakingBoxId(null);
    };

    setSpeakingBoxId(boxId);
    window.speechSynthesis.speak(utterance);
  };

  const handleAnswerSelect = (qId, option) => {
    sounds.playPop();
    setSelectedAnswers((prev) => ({ ...prev, [qId]: option.id }));
    setShowFeedback((prev) => ({ ...prev, [qId]: true }));

    if (option.isCorrect) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.8 }
        });
      } catch (e) {}
    }
  };

  const resetQuiz = () => {
    sounds.playPop();
    setSelectedAnswers({});
    setShowFeedback({});
    stopSpeech();
  };

  const getWildcardMatches = (pattern) => {
    switch (pattern) {
      case 'fail*':
        return ['fail', 'failed', 'failing', 'failure', 'failover'];
      case 'Kam*':
        return ['Kamau', 'Kambua', 'Kamanda', 'Kamene'];
      case 'status=40*':
        return ['status=400 (Bad Req)', 'status=401 (Unauthorized)', 'status=403 (Forbidden)', 'status=404 (Not Found)'];
      default:
        return ['error', 'errors', 'error_log', 'error_code'];
    }
  };

  return (
    <div className="linux-night-hub min-h-screen text-slate-100 font-sans pb-24 selection:bg-amber-400 selection:text-slate-950">
      {/* Top Header with Cozy Glass Bar */}
      <header className="sticky top-0 z-40 bg-[#0d1322]/95 backdrop-blur-md border-b border-slate-800 shadow-lg px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-orange-500 to-amber-600 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/25 border border-amber-300 shrink-0">
              <Shield className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-black tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40">
                  Splunk Cozy Station
                </span>
                <span className="text-xs text-slate-400 font-bold hidden sm:inline">
                  Non-Scary ADHD Interactive Hub
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-black text-white tracking-tight mt-0.5">
                {currentModuleData.title}
              </h1>
            </div>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            {/* Speed Pacing Controls */}
            <div className="flex items-center gap-1.5 bg-[#0d121f] px-2.5 py-1.5 rounded-2xl border border-slate-700/60 shadow-inner">
              <span className="text-[11px] font-extrabold text-slate-400 shrink-0 flex items-center gap-1">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                Pace:
              </span>
              <div className="inline-flex rounded-xl p-0.5 bg-slate-900/90 border border-slate-800">
                {[
                  { rate: 0.75, label: '0.75x', title: 'Slow & Gentle' },
                  { rate: 0.95, label: '0.95x', title: 'Cozy & Clear (Default)' },
                  { rate: 1.15, label: '1.15x', title: 'Normal' },
                  { rate: 1.35, label: '1.35x', title: 'Brisk' }
                ].map((sp) => (
                  <button
                    key={sp.rate}
                    onClick={() => handleSetSpeechRate(sp.rate)}
                    title={sp.title}
                    className={`px-2 py-0.5 rounded-lg text-xs font-black transition-all ${
                      Math.abs(speechRate - sp.rate) < 0.05
                        ? 'bg-amber-400 text-slate-950 shadow-sm scale-105'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    {sp.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stop Speech Button */}
            {speakingBoxId && (
              <button
                onClick={stopSpeech}
                className="px-3 py-1.5 rounded-2xl bg-rose-500 text-white font-black text-xs flex items-center gap-1.5 shadow-md shadow-rose-500/30 hover:bg-rose-600 transition-all animate-pulse"
              >
                <VolumeX className="w-4 h-4" />
                <span>Stop</span>
              </button>
            )}

            {/* Sound Mute Toggle */}
            <button
              onClick={toggleSound}
              title={soundEnabled ? 'Mute Sound Effects' : 'Enable Sound Effects'}
              className={`p-2 rounded-2xl font-bold text-xs border transition-all ${
                soundEnabled
                  ? 'bg-[#131b2e] border-amber-500/40 text-amber-300 shadow-sm'
                  : 'bg-[#131b2e] border-slate-700/60 text-slate-500'
              }`}
            >
              {soundEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-500" />
              )}
            </button>

            {/* Switch to Linux Button */}
            {onSwitchView && (
              <button
                onClick={() => {
                  stopSpeech();
                  onSwitchView('linux_hub');
                }}
                className="px-3 py-1.5 rounded-2xl border border-slate-700 bg-[#141c30] hover:bg-[#1d2742] text-slate-200 text-xs font-bold transition-all shadow-sm"
              >
                Switch to Linux
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 flex-1 w-full relative z-10">
        {/* WARM COZY HERO BANNER (STARLIT AMBER & INDIGO) */}
        <div className="bg-gradient-to-br from-[#12192c] via-[#0f1424] to-[#090d16] rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-56 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 relative z-10">
            <div className="space-y-2.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 font-extrabold text-xs shadow-inner flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Module {currentModuleData.moduleId} of 8</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-900/90 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs shadow-inner">
                  ✨ Simple English • Dual Analogies • Non-Scary ADHD Friendly
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {currentModuleData.headline}
              </h2>
              <p className="text-slate-300 font-medium text-sm sm:text-base leading-relaxed">
                {currentModuleData.description}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  sounds.playSuccess();
                  confetti({ particleCount: 40, spread: 60 });
                }}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 flex items-center gap-2 transition-all scale-105"
              >
                <span>Cheer Up Progress! 🎉</span>
              </button>
            </div>
          </div>
        </div>

        {/* MODULE NAVIGATION RIBBON (8 CHUNKY BUTTONS) */}
        <div className="space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 px-1">
            Splunk 8-Module Journey:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
            {[
              { id: 1, label: '1. Intro', icon: '🏃' },
              { id: 2, label: '2. Apps', icon: '🚪' },
              { id: 3, label: '3. Search', icon: '🔍' },
              { id: 4, label: '4. Events', icon: '📄' },
              { id: 5, label: '5. SPL', icon: '⭐' },
              { id: 6, label: '6. Commands', icon: '🔨' },
              { id: 7, label: '7. Knowledge', icon: '🏷️' },
              { id: 8, label: '8. Dashboards', icon: '📺' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => handleSwitchModule(m.id)}
                className={`p-2.5 rounded-2xl font-black text-xs border transition-all flex flex-col items-center justify-center gap-1 ${
                  activeModuleId === m.id
                    ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.35)] scale-105'
                    : 'bg-[#141c30]/90 text-slate-300 border-slate-700/70 hover:bg-[#1d2742] hover:text-white'
                }`}
              >
                <span className="text-lg">{m.icon}</span>
                <span className="truncate">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* SUBTOPIC SWITCHER TABS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          {subtopics.map((st) => {
            const isActive = st.id === activeSubtopicId;
            return (
              <button
                key={st.id}
                onClick={() => {
                  sounds.playPop();
                  stopSpeech();
                  setActiveSubtopicId(st.id);
                }}
                className={`p-4 rounded-3xl border-2 transition-all flex items-start gap-4 text-left shadow-sm ${
                  isActive
                    ? 'bg-[#162038] border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.25)] ring-2 ring-amber-400/20 scale-[1.01]'
                    : 'bg-[#0c1322]/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm shadow-sm ${
                    isActive ? 'bg-amber-400 text-slate-950 font-black' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  <BookmarkCheck className="w-5 h-5" />
                </div>
                <div>
                  <span
                    className={`text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {st.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-white mt-1">{st.title}</h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* BOX 1: IN SIMPLE LAYMAN'S ENGLISH */}
        <div
          className={`bg-[#0c1322]/90 rounded-3xl p-5 sm:p-7 border-2 transition-all shadow-xl space-y-4 ${
            speakingBoxId === 'box-layman'
              ? 'speak-box-active border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)]'
              : 'border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-black">
                💡
              </div>
              <h4 className="text-lg sm:text-xl font-black text-white">
                {currentSubtopic.layman.title}
              </h4>
            </div>

            <button
              onClick={() =>
                speakBoxText(
                  'box-layman',
                  `${currentSubtopic.layman.title}. ${currentSubtopic.layman.intro} ${
                    currentSubtopic.layman.explanation
                  }. Details: ${currentSubtopic.layman.bullets
                    .map((b) => `${b.term}: ${b.simple}`)
                    .join('. ')}`
                )
              }
              className={`px-3 py-1.5 rounded-2xl text-xs font-black border transition-all flex items-center gap-1.5 shadow-sm ${
                speakingBoxId === 'box-layman'
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800'
              }`}
            >
              {speakingBoxId === 'box-layman' ? (
                <>
                  <VolumeX className="w-4 h-4" /> Stop
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-amber-400" /> Read this box
                </>
              )}
            </button>
          </div>

          <p className="text-slate-300 leading-relaxed font-medium text-sm sm:text-base">
            {currentSubtopic.layman.intro}
          </p>
          <p className="text-slate-300 leading-relaxed font-medium text-sm sm:text-base">
            {currentSubtopic.layman.explanation}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
            {currentSubtopic.layman.bullets.map((b, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#101728] border border-slate-800 space-y-1.5"
              >
                <span className="text-xs font-black uppercase tracking-wider text-amber-300 px-2 py-0.5 rounded-md bg-amber-950/60 border border-amber-500/30 inline-block">
                  {b.term}
                </span>
                <p className="text-xs text-slate-300 font-medium leading-relaxed">{b.simple}</p>
              </div>
            ))}
          </div>
        </div>

        {/* DUAL ANALOGIES ROW (COZY MIDNIGHT + WARM AMBER & EMERALD) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Box 2: Original Estate Guard Analogy */}
          <div
            className={`bg-[#0c1322]/90 rounded-3xl p-5 sm:p-6 border-2 transition-all shadow-xl space-y-4 ${
              speakingBoxId === 'box-orig-analogy'
                ? 'speak-box-active border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)]'
                : 'border-amber-500/40'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 text-amber-300 border border-amber-500/40 text-xs font-black">
                <span>🏰</span>
                <span>The Estate Guard & Visitor Book</span>
              </div>

              <button
                onClick={() =>
                  speakBoxText(
                    'box-orig-analogy',
                    `Original Analogy: ${currentSubtopic.originalAnalogy.title}. ${
                      currentSubtopic.originalAnalogy.summary
                    }. Characters: ${currentSubtopic.originalAnalogy.characters
                      .map((c) => `${c.name}: ${c.role}`)
                      .join('. ')}`
                  )
                }
                className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                  speakingBoxId === 'box-orig-analogy'
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                    : 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800'
                }`}
              >
                {speakingBoxId === 'box-orig-analogy' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" /> Stop
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" /> Read
                  </>
                )}
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-black text-amber-300">
              {currentSubtopic.originalAnalogy.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {currentSubtopic.originalAnalogy.summary}
            </p>

            <div className="space-y-2.5 pt-1">
              {currentSubtopic.originalAnalogy.characters.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#101728] border border-slate-800 space-y-1"
                >
                  <div className="text-xs font-black text-white">{ch.name}</div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{ch.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Box 3: Kenyan Everyday Analogy */}
          <div
            className={`bg-[#0c1322]/90 rounded-3xl p-5 sm:p-6 border-2 transition-all shadow-xl space-y-4 ${
              speakingBoxId === 'box-kenyan-analogy'
                ? 'speak-box-active-emerald border-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.35)]'
                : 'border-emerald-500/40'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 text-xs font-black">
                <span>🇰🇪</span>
                <span>Kenyan Everyday Life Analogy</span>
              </div>

              <button
                onClick={() =>
                  speakBoxText(
                    'box-kenyan-analogy',
                    `Kenyan Everyday Analogy: ${currentSubtopic.kenyanAnalogy.title}. ${
                      currentSubtopic.kenyanAnalogy.summary
                    }. Characters: ${currentSubtopic.kenyanAnalogy.characters
                      .map((c) => `${c.name}: ${c.role}`)
                      .join('. ')}`
                  )
                }
                className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                  speakingBoxId === 'box-kenyan-analogy'
                    ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                    : 'bg-slate-900 text-emerald-300 border-emerald-500/40 hover:bg-slate-800'
                }`}
              >
                {speakingBoxId === 'box-kenyan-analogy' ? (
                  <>
                    <VolumeX className="w-3.5 h-3.5" /> Stop
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" /> Read
                  </>
                )}
              </button>
            </div>

            <h3 className="text-base sm:text-lg font-black text-emerald-300">
              {currentSubtopic.kenyanAnalogy.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {currentSubtopic.kenyanAnalogy.summary}
            </p>

            <div className="space-y-2.5 pt-1">
              {currentSubtopic.kenyanAnalogy.characters.map((ch, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-[#101728] border border-slate-800 space-y-1"
                >
                  <div className="text-xs font-black text-white">{ch.name}</div>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">{ch.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* POCKET TAKEAWAY BOX */}
        <div
          className={`bg-gradient-to-r from-amber-950/70 via-orange-950/60 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl transition-all ${
            speakingBoxId === 'box-takeaway'
              ? 'speak-box-active border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)]'
              : ''
          }`}
        >
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-lg shrink-0">
              📌
            </div>
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-amber-300">
                Pocket Memory Card:
              </div>
              <div className="text-sm sm:text-base font-extrabold text-white">
                "{currentSubtopic.pocketTakeaway}"
              </div>
            </div>
          </div>
          <button
            onClick={() =>
              speakBoxText('box-takeaway', `Pocket Memory Card: ${currentSubtopic.pocketTakeaway}`)
            }
            className={`px-3 py-1.5 rounded-xl text-xs font-black border transition-all flex items-center gap-1.5 shrink-0 ${
              speakingBoxId === 'box-takeaway'
                ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                : 'bg-slate-900 text-amber-300 border-amber-500/40 hover:bg-slate-800'
            }`}
          >
            {speakingBoxId === 'box-takeaway' ? (
              <>
                <VolumeX className="w-3.5 h-3.5" /> Stop
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" /> Read Takeaway
              </>
            )}
          </button>
        </div>

        {/* INTERACTIVE PRACTICE QUIZ (ANXIETY-FREE, INSTANT REWARD) */}
        <div className="bg-[#0c1322]/90 rounded-3xl p-5 sm:p-7 border-2 border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/40 flex items-center justify-center font-black">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                  Friendly Quick-Check
                </span>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  {currentModuleData.title} Quiz Challenge
                </h4>
              </div>
            </div>

            <button
              onClick={resetQuiz}
              className="px-3 py-1.5 rounded-xl border border-slate-700 hover:bg-slate-800 text-slate-300 font-bold text-xs flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset Answers
            </button>
          </div>

          <div className="space-y-5">
            {currentModuleData.quizChallenges.map((q, qIndex) => {
              const selected = selectedAnswers[q.id];
              const isAnswered = showFeedback[q.id];
              const selectedOption = q.options.find((o) => o.id === selected);

              return (
                <div
                  key={q.id}
                  className={`p-4 sm:p-5 rounded-2xl bg-[#101728] border space-y-3.5 transition-all ${
                    speakingBoxId === `quiz-${q.id}`
                      ? 'speak-box-active border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.25)]'
                      : 'border-slate-800'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                        {qIndex + 1}
                      </span>
                      <p className="text-sm font-bold text-white leading-relaxed">{q.scenario}</p>
                    </div>

                    <button
                      onClick={() =>
                        speakBoxText(
                          `quiz-${q.id}`,
                          `Question ${qIndex + 1}: ${q.scenario}. Choices: ${q.options
                            .map((o) => o.text)
                            .join('. ')}`
                        )
                      }
                      className={`px-2.5 py-1 rounded-xl text-xs font-black border transition-all flex items-center gap-1 shrink-0 ${
                        speakingBoxId === `quiz-${q.id}`
                          ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                          : 'bg-slate-900 text-slate-300 border-slate-700 hover:text-white'
                      }`}
                    >
                      {speakingBoxId === `quiz-${q.id}` ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5" /> Stop
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3.5 h-3.5 text-slate-400" /> Read
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {q.options.map((opt) => {
                      const isChosen = selected === opt.id;
                      let btnStyle = 'bg-[#141d33] border-slate-700/80 hover:border-amber-400 text-slate-200';

                      if (isAnswered && isChosen) {
                        btnStyle = opt.isCorrect
                          ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 font-black ring-2 ring-emerald-400/30'
                          : 'bg-amber-950/80 border-amber-400 text-amber-200 font-semibold';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleAnswerSelect(q.id, opt)}
                          className={`p-3.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between gap-3 shadow-sm ${btnStyle}`}
                        >
                          <span>{opt.text}</span>
                          {isAnswered && isChosen && (
                            <span className="text-base shrink-0">{opt.isCorrect ? '🎉' : '💭'}</span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && selectedOption && (
                    <div
                      className={`p-3.5 rounded-xl text-xs font-medium border leading-relaxed ${
                        selectedOption.isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                          : 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                      }`}
                    >
                      {selectedOption.feedback}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
