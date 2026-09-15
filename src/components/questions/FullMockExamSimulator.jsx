import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, 
  HelpCircle, AlertCircle, Sparkles, BookOpen, Shield, 
  Check, ArrowRight, Layers, Flame, Flag, Clock, Filter,
  Grid, ChevronLeft, ChevronRight, Eye, RefreshCw, BarChart3,
  Bookmark, BookmarkCheck, Trophy
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';
import { 
  ALL_PREPSET_QUESTIONS,
  MOCK_EXAM_1_QUESTIONS,
  MOCK_EXAM_2_QUESTIONS,
  MOCK_EXAM_3_QUESTIONS,
  getRandom90Questions
} from '../../data/combinedPrepSetQuestions';

// Fisher-Yates shuffle helper
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function FullMockExamSimulator({ onBack }) {
  // Mode selection state
  const [selectedSet, setSelectedSet] = useState(null); // 'mock1', 'mock2', 'mock3', 'random90'
  const [examStarted, setExamStarted] = useState(false);
  
  // Exam settings
  const [enableTimer, setEnableTimer] = useState(true);
  const [immediateFeedback, setImmediateFeedback] = useState(true);
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds

  // Quiz state
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [answers, setAnswers] = useState({}); // { [questionIndex]: { selectedIdx, isCorrect, flagged } }
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set());
  const [showResult, setShowResult] = useState(false);
  const [showGridModal, setShowGridModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all', 'incorrect', 'flagged'

  const timerRef = useRef(null);

  // Initialize selected set with randomized options and question order
  const startExam = (setKey) => {
    sounds.playPop();
    let rawSet = [];
    if (setKey === 'mock1') rawSet = MOCK_EXAM_1_QUESTIONS;
    else if (setKey === 'mock2') rawSet = MOCK_EXAM_2_QUESTIONS;
    else if (setKey === 'mock3') rawSet = MOCK_EXAM_3_QUESTIONS;
    else rawSet = getRandom90Questions();

    // Randomize options for each question AND shuffle question order
    const prepared = rawSet.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));

    const shuffled = shuffleArray(prepared);
    setQuestions(shuffled);
    setSelectedSet(setKey);
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setAnswers({});
    setFlaggedQuestions(new Set());
    setShowResult(false);
    setTimeLeft(setKey === 'mock3' ? 70 * 60 : 90 * 60); // 90 min or 70 min
    setExamStarted(true);
  };

  // Timer effect
  useEffect(() => {
    if (examStarted && enableTimer && !showResult && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [examStarted, enableTimer, showResult]);

  // Sync state when moving to a different question
  useEffect(() => {
    if (!examStarted || questions.length === 0) return;
    const existing = answers[currentIdx];
    if (existing) {
      setSelectedOptionIdx(existing.selectedIdx);
      setIsSubmitted(true);
    } else {
      setSelectedOptionIdx(null);
      setIsSubmitted(false);
    }
  }, [currentIdx, examStarted]);

  if (!examStarted) {
    // Selection Welcome Dashboard
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-5">
            <button
              onClick={onBack}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Dashboard
            </button>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" /> 250 Total Exam Questions Available
            </div>
          </div>

          {/* Hero Banner */}
          <div className="bg-gradient-to-br from-indigo-950/80 via-slate-900 to-slate-950 border border-indigo-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Trophy className="w-3.5 h-3.5" /> Official CompTIA SY0-701 Simulation
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Full-Length 90-Question Mock Exam Hub
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Experience realistic CompTIA Security+ SY0-701 exam conditions. All 250 scenario questions across Domains 1.0 through 5.0 are aggregated here into standardized 90-question exam sessions with <strong>100% dynamic randomization</strong> of answer options and questions.
              </p>

              {/* Toggles */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-sm border-t border-slate-800/80">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={enableTimer}
                    onChange={(e) => setEnableTimer(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                  />
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Clock className="w-4 h-4 text-amber-400" /> 90-Minute Exam Countdown Timer
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={immediateFeedback}
                    onChange={(e) => setImmediateFeedback(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 bg-slate-900 border-slate-700"
                  />
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Eye className="w-4 h-4 text-teal-400" /> Immediate Autopsy Feedback Mode
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Exam Set Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mock Exam 1 */}
            <div 
              onClick={() => startExam('mock1')}
              className="group p-6 rounded-2xl bg-slate-900/90 border-2 border-indigo-900/60 hover:border-indigo-500 transition-all cursor-pointer shadow-xl hover:scale-[1.01] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    Full Simulation Set 1
                  </span>
                  <span className="text-xs font-mono text-slate-400">90 Questions • 90 Mins</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  CompTIA Mock Exam 1 (90 Qs)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Balanced 18 questions per domain (Domains 1.0 through 5.0). Perfect for your first full-length diagnostic assessment.
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                  <span>D1: 18 Qs</span> • <span>D2: 18 Qs</span> • <span>D3: 18 Qs</span> • <span>D4: 18 Qs</span> • <span>D5: 18 Qs</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-indigo-400 font-semibold text-sm">
                <span>Launch Mock Exam 1</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Mock Exam 2 */}
            <div 
              onClick={() => startExam('mock2')}
              className="group p-6 rounded-2xl bg-slate-900/90 border-2 border-emerald-900/60 hover:border-emerald-500 transition-all cursor-pointer shadow-xl hover:scale-[1.01] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Full Simulation Set 2
                  </span>
                  <span className="text-xs font-mono text-slate-400">90 Questions • 90 Mins</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                  CompTIA Mock Exam 2 (90 Qs)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  18 fresh non-overlapping questions per domain. Tests advanced edge cases, zero trust architectures, and regulatory frameworks.
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                  <span>D1: 18 Qs</span> • <span>D2: 18 Qs</span> • <span>D3: 18 Qs</span> • <span>D4: 18 Qs</span> • <span>D5: 18 Qs</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-emerald-400 font-semibold text-sm">
                <span>Launch Mock Exam 2</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Mock Exam 3 */}
            <div 
              onClick={() => startExam('mock3')}
              className="group p-6 rounded-2xl bg-slate-900/90 border-2 border-amber-900/60 hover:border-amber-500 transition-all cursor-pointer shadow-xl hover:scale-[1.01] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Final Stretch Set 3
                  </span>
                  <span className="text-xs font-mono text-slate-400">70 Questions • 70 Mins</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                  CompTIA Mock Exam 3 (70 Qs)
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  The remaining 14 questions per domain completing the 250 question master pool. High-intensity final review.
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                  <span>D1: 14 Qs</span> • <span>D2: 14 Qs</span> • <span>D3: 14 Qs</span> • <span>D4: 14 Qs</span> • <span>D5: 14 Qs</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-amber-400 font-semibold text-sm">
                <span>Launch Mock Exam 3</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Dynamic Random 90 */}
            <div 
              onClick={() => startExam('random90')}
              className="group p-6 rounded-2xl bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 border-2 border-purple-800/60 hover:border-purple-400 transition-all cursor-pointer shadow-xl hover:scale-[1.01] flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                    <RefreshCw className="w-3 h-3 animate-spin" /> Infinite Randomizer
                  </span>
                  <span className="text-xs font-mono text-purple-300 font-semibold">Fresh 90 Qs Every Time</span>
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Dynamic Random 90-Q Mock
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Pulls a brand-new random 90-question subset from all 250 questions with randomized options and question order. Unlimited unique practice sessions!
                </p>
                <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
                  <span>Randomized pool of 250 master questions</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-purple-400 font-semibold text-sm">
                <span>Generate Random 90 Exam</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Active Exam In-Progress State
  const currentQ = questions[currentIdx];
  const isFlagged = flaggedQuestions.has(currentIdx);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSelectOption = (idx) => {
    if (isSubmitted && immediateFeedback) return;
    sounds.playPop();
    setSelectedOptionIdx(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOptionIdx === null) return;
    const isCorrect = currentQ.options[selectedOptionIdx].isCorrect;
    if (isCorrect) sounds.playSuccess();
    else sounds.playPop();

    setIsSubmitted(true);
    setAnswers(prev => ({
      ...prev,
      [currentIdx]: {
        selectedIdx: selectedOptionIdx,
        isCorrect: isCorrect,
        question: currentQ
      }
    }));
  };

  const handleToggleFlag = () => {
    sounds.playPop();
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(currentIdx)) next.delete(currentIdx);
      else next.add(currentIdx);
      return next;
    });
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    sounds.playPop();
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  const finishExam = () => {
    sounds.playComplete();
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 }
    });
    setShowResult(true);
  };

  const totalAnswered = Object.keys(answers).length;
  const totalCorrect = Object.values(answers).filter(a => a.isCorrect).length;
  const scorePercentage = Math.round((totalCorrect / questions.length) * 100);
  const scaledScore = Math.round(100 + (scorePercentage / 100) * 800); // Scaled 100-900 (Pass is 750)
  const isPassed = scaledScore >= 750;

  // Domain score breakdown
  const domainStats = [1, 2, 3, 4, 5].map(domainNum => {
    const domainQuestions = questions.filter(q => q.domainNumber === domainNum);
    const domainTotal = domainQuestions.length;
    const domainCorrect = questions.filter((q, idx) => {
      return q.domainNumber === domainNum && answers[idx]?.isCorrect;
    }).length;
    const pct = domainTotal > 0 ? Math.round((domainCorrect / domainTotal) * 100) : 0;
    return { domainNum, total: domainTotal, correct: domainCorrect, pct };
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-3 sm:px-6 lg:px-8 font-sans">
      {/* Top Sticky Test Bar */}
      <div className="max-w-5xl mx-auto mb-6 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 backdrop-blur-md shadow-xl flex flex-wrap items-center justify-between gap-4 sticky top-4 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setExamStarted(false)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all text-xs font-semibold flex items-center gap-1.5"
            title="Exit to Mock Selector"
          >
            <ArrowLeft className="w-4 h-4" /> Exit
          </button>
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              {selectedSet === 'mock1' ? 'Mock Exam 1' : selectedSet === 'mock2' ? 'Mock Exam 2' : selectedSet === 'mock3' ? 'Mock Exam 3' : 'Dynamic Random 90'}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Question {currentIdx + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Center: Timer & Navigator */}
        <div className="flex items-center gap-3">
          {enableTimer && (
            <div className={`px-3 py-1.5 rounded-xl border flex items-center gap-2 font-mono text-sm font-bold ${
              timeLeft < 300 
                ? 'bg-rose-950/60 border-rose-600 text-rose-300 animate-pulse' 
                : 'bg-slate-950 border-slate-800 text-amber-300'
            }`}>
              <Clock className="w-4 h-4 text-amber-400" />
              {formatTime(timeLeft)}
            </div>
          )}

          <button
            onClick={() => setShowGridModal(!showGridModal)}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-all"
          >
            <Grid className="w-4 h-4 text-indigo-400" />
            <span>Grid ({totalAnswered}/{questions.length})</span>
          </button>

          <button
            onClick={handleToggleFlag}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
              isFlagged 
                ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isFlagged ? 'fill-amber-400 text-amber-400' : ''}`} />
            <span>{isFlagged ? 'Flagged' : 'Flag'}</span>
          </button>
        </div>

        {/* Right: Submit Button */}
        <div>
          <button
            onClick={finishExam}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-xs text-white shadow-md transition-all flex items-center gap-1.5"
          >
            <Award className="w-4 h-4" /> Finish Exam
          </button>
        </div>
      </div>

      {/* Question Grid Modal */}
      {showGridModal && (
        <div className="max-w-5xl mx-auto mb-6 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl animate-fadeIn">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Grid className="w-4 h-4 text-indigo-400" /> Question Navigator Grid (1 to {questions.length})
            </h3>
            <button
              onClick={() => setShowGridModal(false)}
              className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
            >
              Close
            </button>
          </div>

          <div className="grid grid-cols-10 sm:grid-cols-15 md:grid-cols-18 gap-1.5 max-h-60 overflow-y-auto p-1">
            {questions.map((q, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurr = currentIdx === idx;
              const flagged = flaggedQuestions.has(idx);

              let bg = "bg-slate-950 text-slate-400 border-slate-800";
              if (isAnswered) bg = "bg-emerald-950/60 border-emerald-600/50 text-emerald-300";
              if (isCurr) bg = "border-indigo-400 ring-2 ring-indigo-500 bg-indigo-950 text-white font-bold";

              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentIdx(idx);
                    setShowGridModal(false);
                  }}
                  className={`h-8 rounded-lg text-xs font-mono border flex items-center justify-center relative transition-all ${bg}`}
                >
                  {idx + 1}
                  {flagged && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-emerald-950 border border-emerald-600 inline-block" /> Answered</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-950 border border-slate-800 inline-block" /> Unanswered</span>
            <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" /> Flagged for Review</span>
          </div>
        </div>
      )}

      {!showResult ? (
        /* Main Question View */
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="w-full bg-slate-900 rounded-full h-1.5 mb-6 border border-slate-800 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-teal-400 to-amber-400 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative">
            {/* Domain & Subdomain Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-300">
                <Shield className="w-3.5 h-3.5" /> Domain {currentQ.domainNumber}.0 • {currentQ.subdomain}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Item {currentIdx + 1} of {questions.length}
              </span>
            </div>

            {/* Scenario Box */}
            <div className="mb-6 p-5 rounded-xl bg-slate-950/70 border border-slate-800 text-slate-300 text-sm leading-relaxed relative">
              <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-slate-900 border border-slate-700 text-slate-300">
                CompTIA Examination Scenario
              </div>
              <p className="mt-1">{currentQ.scenario}</p>
            </div>

            {/* Question Prompt */}
            <h2 className="text-base sm:text-lg font-semibold text-slate-100 mb-6 leading-snug">
              {currentQ.question}
            </h2>

            {/* Shuffled Options */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, idx) => {
                let borderStyle = "border-slate-800 hover:border-slate-700 bg-slate-950/50";
                let textStyle = "text-slate-200";
                let iconBadge = (
                  <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </div>
                );

                if (selectedOptionIdx === idx) {
                  borderStyle = "border-indigo-500 bg-indigo-950/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]";
                  iconBadge = (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 text-slate-950 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </div>
                  );
                }

                if (isSubmitted && immediateFeedback) {
                  if (option.isCorrect) {
                    borderStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                    iconBadge = (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    );
                  } else if (selectedOptionIdx === idx && !option.isCorrect) {
                    borderStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                    iconBadge = (
                      <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center">
                        <XCircle className="w-4 h-4" />
                      </div>
                    );
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted && immediateFeedback}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${borderStyle}`}
                  >
                    <div className="flex-shrink-0 mt-0.5">{iconBadge}</div>
                    <div className="flex-1 text-sm sm:text-base leading-relaxed">
                      <p className={textStyle}>{option.text}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-xs text-slate-300 transition-all flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <div className="flex items-center gap-3">
                {!isSubmitted ? (
                  <button
                    onClick={handleConfirmAnswer}
                    disabled={selectedOptionIdx === null}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm text-white shadow-lg shadow-indigo-950 transition-all flex items-center gap-2"
                  >
                    Confirm Answer <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={currentIdx === questions.length - 1}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-amber-600 hover:from-indigo-500 hover:to-amber-500 disabled:opacity-30 disabled:cursor-not-allowed font-semibold text-sm text-white shadow-lg transition-all flex items-center gap-2"
                  >
                    Next Question <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Immediate Dual-Layer Autopsy (When Enabled) */}
            {isSubmitted && immediateFeedback && (
              <div className="mt-8 pt-6 border-t border-slate-800 space-y-6 animate-fadeIn">
                <div className={`p-4 rounded-xl border ${
                  currentQ.options[selectedOptionIdx].isCorrect 
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {currentQ.options[selectedOptionIdx].isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className="font-bold text-sm">
                      {currentQ.options[selectedOptionIdx].isCorrect ? 'Accurate Response!' : 'CompTIA Distractor Selected!'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {currentQ.options[selectedOptionIdx].explanation}
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Technical Rationale */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5" /> Technical Standard & Framework Rationale
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300 mb-2 leading-relaxed">
                      {currentQ.whyCorrect}
                    </p>
                    <p className="text-xs font-mono text-indigo-300/90 bg-indigo-950/40 p-2 rounded border border-indigo-900/40">
                      Standard: {currentQ.technicalRationale}
                    </p>
                  </div>

                  {/* Distractor Breakdown */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" /> Distractor Analysis: Why Other Choices Fail
                    </p>
                    <div className="space-y-2">
                      {Object.entries(currentQ.whyWrong).map(([opt, reason], i) => (
                        <div key={i} className="text-xs p-2.5 rounded bg-slate-900/70 border border-slate-800/80">
                          <p className="font-semibold text-rose-300">❌ {opt}</p>
                          <p className="text-slate-400 mt-0.5">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kenyan Everyday Metaphor */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/30 to-slate-950 border border-amber-500/30">
                    <p className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                      🇰🇪 Everyday Kenyan Metaphor
                    </p>
                    <p className="text-xs sm:text-sm text-amber-100/90 italic leading-relaxed">
                      "{currentQ.kenyanMetaphor}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results View */
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-8 backdrop-blur-md shadow-2xl text-center">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl mb-4 border-2 ${
              isPassed 
                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                : 'bg-rose-500/20 border-rose-500 text-rose-400'
            }`}>
              {isPassed ? '🏆' : '📋'}
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">
              {isPassed ? 'Congratulations! Examination Passed' : 'Examination Completed • Needs Review'}
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              CompTIA Security+ SY0-701 Simulation Results
            </p>

            {/* Score Display */}
            <div className="flex items-center justify-center gap-8 mb-8">
              <div>
                <p className="text-4xl font-extrabold font-mono text-indigo-400">{scaledScore}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Scaled Score (Passing: 750 / 900)</p>
              </div>
              <div className="h-12 w-px bg-slate-800" />
              <div>
                <p className="text-4xl font-extrabold font-mono text-teal-300">{scorePercentage}%</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Accuracy ({totalCorrect}/{questions.length})</p>
              </div>
            </div>

            {/* Domain-by-Domain Breakdown */}
            <div className="max-w-lg mx-auto mb-8 p-4 rounded-xl bg-slate-950 border border-slate-800 text-left">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <BarChart3 className="w-3.5 h-3.5 text-indigo-400" /> Domain Competency Breakdown
              </p>
              <div className="space-y-2.5">
                {domainStats.map(stat => (
                  <div key={stat.domainNum} className="text-xs">
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300">Domain {stat.domainNum}.0</span>
                      <span className="font-mono text-slate-400">{stat.correct}/{stat.total} ({stat.pct}%)</span>
                    </div>
                    <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-1.5 rounded-full ${stat.pct >= 75 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                        style={{ width: `${stat.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => startExam(selectedSet)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-semibold text-sm text-white transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retake This Mock Exam
              </button>
              <button
                onClick={() => setExamStarted(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-sm text-slate-200 border border-slate-700 transition-all flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Select Different Mock Exam
              </button>
            </div>
          </div>

          {/* Full Audit Review Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" /> Full Examination Audit Review
              </h3>
              
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    reviewFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All ({questions.length})
                </button>
                <button
                  onClick={() => setReviewFilter('incorrect')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    reviewFilter === 'incorrect' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Missed ({questions.length - totalCorrect})
                </button>
                <button
                  onClick={() => setReviewFilter('flagged')}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                    reviewFilter === 'flagged' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Flagged ({flaggedQuestions.size})
                </button>
              </div>
            </div>

            {/* Filtered Questions List */}
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const answer = answers[idx];
                const isCorrect = answer?.isCorrect;
                const isFlag = flaggedQuestions.has(idx);

                if (reviewFilter === 'incorrect' && isCorrect) return null;
                if (reviewFilter === 'flagged' && !isFlag) return null;

                const correctOpt = q.options.find(o => o.isCorrect);
                const chosenOpt = answer ? q.options[answer.selectedIdx] : null;

                return (
                  <div 
                    key={idx}
                    className={`p-6 rounded-2xl border ${
                      isCorrect 
                        ? 'bg-slate-900/80 border-slate-800' 
                        : 'bg-slate-900/80 border-rose-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-mono text-indigo-400">
                        Question {idx + 1} • Domain {q.domainNumber}.0: {q.subdomain}
                      </span>
                      <div className="flex items-center gap-2">
                        {isFlag && (
                          <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
                            FLAGGED
                          </span>
                        )}
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                        }`}>
                          {isCorrect ? 'CORRECT' : 'MISSED'}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-slate-100 mb-2">{q.question}</p>
                    <p className="text-xs text-slate-400 mb-4 italic">Scenario: {q.scenario}</p>

                    <div className="grid grid-cols-1 gap-2 text-xs mb-4">
                      <div className={`p-3 rounded-lg border ${
                        isCorrect 
                          ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' 
                          : 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                      }`}>
                        <strong>Your Selection:</strong> {chosenOpt ? chosenOpt.text : 'Unanswered'}
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
                          <strong>Correct Answer:</strong> {correctOpt?.text}
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                      <p className="font-bold text-amber-300 uppercase tracking-wider mb-1">Standard & Autopsy Rationale</p>
                      <p className="mb-2 leading-relaxed">{q.technicalRationale}</p>
                      <p className="text-amber-100/90 italic">🇰🇪 {q.kenyanMetaphor}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
