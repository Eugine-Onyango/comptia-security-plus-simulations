import React, { useState } from 'react';
import { 
  Trophy, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  RotateCcw, 
  Sparkles, 
  Award,
  Terminal,
  ShieldCheck,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../../utils/audio';
import { RECON_PBQ_CHALLENGES } from './nmapData';

export default function NmapPbqChallenge() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const total = RECON_PBQ_CHALLENGES.length;
  const isFinished = currentIdx >= total;
  const currentChallenge = !isFinished ? RECON_PBQ_CHALLENGES[currentIdx] : null;

  const handleSelectOption = (idx) => {
    if (isAnswered) return;
    sounds.playPop();
    setSelectedIdx(idx);
  };

  const handleSubmit = () => {
    if (selectedIdx === null || isAnswered || !currentChallenge) return;

    const chosenOption = currentChallenge.options[selectedIdx];
    const isCorrect = chosenOption.isCorrect;
    setIsAnswered(true);
    setShowExplanation(true);

    if (isCorrect) {
      sounds.playSuccess();
      setScore(prev => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } else {
      sounds.playAlert();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    setSelectedIdx(null);
    setIsAnswered(false);
    setShowExplanation(false);
    setCurrentIdx(prev => prev + 1);
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentIdx(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setShowExplanation(false);
  };

  if (isFinished || !currentChallenge) {
    const percentage = Math.round((score / total) * 100);
    const passed = percentage >= 75;

    return (
      <div className="max-w-4xl mx-auto p-6 animate-fadeIn">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500 to-cyan-400 p-1 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-6">
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center">
              {passed ? <Trophy className="w-12 h-12 text-emerald-400 animate-bounce" /> : <Award className="w-12 h-12 text-amber-400" />}
            </div>
          </div>

          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/60">
            Recon Master Simulation Complete
          </span>

          <h2 className="text-3xl sm:text-4xl font-black text-white mt-4 mb-2">
            {passed ? 'Outstanding Work, Cyber Recon Specialist!' : 'Good Effort! Review & Try Again'}
          </h2>
          <p className="text-slate-400 max-w-md mx-auto text-sm sm:text-base mb-6">
            {passed 
              ? 'You correctly diagnosed target port states, stealth scan flags, firewall blockers, and service banners just like the real Security+ PBQ examination!'
              : 'Nmap outputs can be tricky with filtered states and stealth handshakes. Give it another shot to lock in 100% mastery!'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8 text-left">
            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-medium">Final Score</span>
              <p className="text-2xl font-black text-white mt-1">{score} / {total}</p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-medium">Accuracy</span>
              <p className={`text-2xl font-black mt-1 ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>{percentage}%</p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-medium">CompTIA Rating</span>
              <p className="text-2xl font-black text-cyan-400 mt-1">{passed ? 'PASS' : 'REVIEW'}</p>
            </div>
            <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-2xl">
              <span className="text-xs text-slate-400 font-medium">Exam Standard</span>
              <p className="text-2xl font-black text-purple-400 mt-1">SY0-701</p>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black px-8 py-3.5 rounded-2xl transition-all transform hover:scale-[1.02] shadow-lg shadow-emerald-500/25 cursor-pointer"
          >
            <RotateCcw className="w-5 h-5" />
            Restart Challenge
          </button>
        </div>
      </div>
    );
  }

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      {/* PBQ Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">CompTIA Performance-Based Question (PBQ)</span>
              <h2 className="text-xl font-black text-white">Scenario {currentIdx + 1} of {total}: {currentChallenge.title}</h2>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Score:</span>
              <span className="font-bold text-emerald-400">{score}</span>
              <span className="text-slate-600">/</span>
              <span className="text-slate-400">{total}</span>
            </div>
            <div className="w-24 sm:w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-300"
                style={{ width: `${((currentIdx) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Scenario Prompt */}
        <div className="mt-5 space-y-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 p-1 rounded-lg bg-cyan-500/20 text-cyan-400 shrink-0">
                <Terminal className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Mission Brief</span>
                <p className="text-sm sm:text-base text-slate-200 mt-1 font-medium leading-relaxed">
                  {currentChallenge.scenario}
                </p>
              </div>
            </div>
          </div>

          {/* Clue Accordion/Callout */}
          {currentChallenge.compTiaTakeaway && (
            <div className="p-3 bg-amber-950/20 border border-amber-800/40 rounded-xl flex items-center gap-2.5 text-xs text-amber-300">
              <Zap className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>CompTIA Concept:</strong> {currentChallenge.compTiaTakeaway}</span>
            </div>
          )}
        </div>
      </div>

      {/* Question & Options */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
          {currentChallenge.question}
        </h3>

        <div className="space-y-3 pt-2">
          {currentChallenge.options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            const isCorrect = opt.isCorrect;

            let cardStyle = 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-950 text-slate-200';
            let badgeStyle = 'bg-slate-800 text-slate-300';

            if (isAnswered) {
              if (isCorrect) {
                cardStyle = 'bg-emerald-950/40 border-emerald-500/80 text-emerald-100 shadow-lg shadow-emerald-950/50';
                badgeStyle = 'bg-emerald-500 text-slate-950 font-bold';
              } else if (isSelected && !isCorrect) {
                cardStyle = 'bg-rose-950/40 border-rose-500/80 text-rose-200 shadow-lg shadow-rose-950/50';
                badgeStyle = 'bg-rose-500 text-white font-bold';
              } else {
                cardStyle = 'bg-slate-950/30 border-slate-800/40 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              cardStyle = 'bg-cyan-950/40 border-cyan-500 text-cyan-100 ring-1 ring-cyan-500';
              badgeStyle = 'bg-cyan-500 text-slate-950 font-bold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={isAnswered}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-4 cursor-pointer ${cardStyle}`}
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-sm font-black transition-all ${badgeStyle}`}>
                  {optionLetters[idx]}
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-semibold">{opt.text}</p>
                  {isAnswered && isCorrect && (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-bold mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {opt.feedback}
                    </span>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <span className="inline-flex items-center gap-1 text-xs text-rose-400 font-bold mt-1">
                      <XCircle className="w-3.5 h-3.5" /> {opt.feedback}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          {!isAnswered ? (
            <button
              onClick={handleSubmit}
              disabled={selectedIdx === null}
              className="ml-auto inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black px-6 py-3 rounded-2xl transition-all shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              Lock In Answer
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="ml-auto inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-black px-6 py-3 rounded-2xl transition-all shadow-md shadow-cyan-500/20 cursor-pointer animate-pulse"
            >
              {currentIdx + 1 < total ? 'Next PBQ Scenario' : 'View Results'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Explanation Card */}
        {showExplanation && (
          <div className="mt-4 p-5 rounded-2xl bg-slate-950 border border-slate-800 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="p-1 rounded-lg bg-purple-500/20 text-purple-400 mt-0.5 shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">CompTIA Key Takeaway</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {currentChallenge.compTiaTakeaway}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
