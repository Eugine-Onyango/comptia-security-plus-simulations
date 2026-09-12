import React, { useState } from 'react';
import { BOUNCER_CHALLENGES } from './portData';
import { sounds } from '../../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Shield, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Trophy, 
  Flame, 
  HelpCircle,
  AlertTriangle,
  KeyRound
} from 'lucide-react';

export default function FirewallBouncerChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const currentChallenge = BOUNCER_CHALLENGES[currentIndex];

  const handleSelectOption = (option, idx) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    if (option.isCorrect) {
      sounds.playSuccess();
      setScore((prev) => prev + 1);
      setStreak((prev) => prev + 1);
      
      // Mini confetti on correct answer
      try {
        confetti({
          particleCount: 25,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sounds.playPop();
      setStreak(0);
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIndex + 1 < BOUNCER_CHALLENGES.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowSummary(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStreak(0);
    setShowSummary(false);
  };

  return (
    <div class="space-y-8">
      
      {/* Header Bar */}
      <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl font-black">
            💂‍♂️
          </div>
          <div>
            <h2 class="text-2xl font-black text-slate-900">
              The Firewall Bouncer Challenge
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 font-medium">
              You are the Hotel Bouncer! Direct incoming guests to the safe doors & block cyber attacks!
            </p>
          </div>
        </div>

        {/* Stats */}
        <div class="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
          <div class="flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl shadow-xs font-black text-xs text-slate-700">
            <Trophy class="w-4 h-4 text-amber-500" />
            <span>Score: {score} / {BOUNCER_CHALLENGES.length}</span>
          </div>

          {streak > 1 && (
            <div class="flex items-center gap-1.5 px-3 py-1 bg-orange-100 text-orange-800 rounded-xl font-black text-xs animate-bounce">
              <Flame class="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{streak} Streak!</span>
            </div>
          )}
        </div>
      </div>

      {/* QUIZ INTERFACE OR FINAL SUMMARY */}
      {!showSummary ? (
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-200 shadow-lg space-y-6">
          
          {/* Progress Tracker */}
          <div class="flex items-center justify-between text-xs font-extrabold text-slate-500 border-b border-slate-100 pb-4">
            <span>Guest Arrival #{currentIndex + 1} of {BOUNCER_CHALLENGES.length}</span>
            <div class="flex gap-1.5">
              {BOUNCER_CHALLENGES.map((_, i) => (
                <div 
                  key={i} 
                  class={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentIndex 
                      ? 'bg-amber-500 scale-125' 
                      : i < currentIndex 
                        ? 'bg-emerald-500' 
                        : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Guest Dialogue Bubble */}
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-300 space-y-3">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-amber-200/80 text-amber-950 font-black text-xs rounded-full">
                Hotel Lobby Visitor
              </span>
              <span class="text-sm font-extrabold text-slate-700">{currentChallenge.guest}</span>
            </div>

            <div class="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed italic">
              {currentChallenge.request}
            </div>

            <div class="pt-2 font-black text-base text-amber-900 flex items-center gap-2">
              <HelpCircle class="w-5 h-5 text-amber-600" />
              <span>Bouncer Question: {currentChallenge.question}</span>
            </div>
          </div>

          {/* Options Grid */}
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentChallenge.options.map((option, idx) => {
              const isChosen = selectedOption === idx;
              let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800 hover:border-slate-300';

              if (isAnswered) {
                if (option.isCorrect) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md';
                } else if (isChosen) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-black';
                } else {
                  btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(option, idx)}
                  disabled={isAnswered}
                  class={`p-5 rounded-2xl border-3 text-left transition-all active:scale-[0.98] flex flex-col justify-between space-y-3 ${btnStyle}`}
                >
                  <div class="flex items-center justify-between">
                    <span class="text-base font-black">{option.name}</span>
                    {isAnswered && (
                      option.isCorrect ? (
                        <CheckCircle2 class="w-6 h-6 text-emerald-600 shrink-0" />
                      ) : isChosen ? (
                        <XCircle class="w-6 h-6 text-rose-600 shrink-0" />
                      ) : null
                    )}
                  </div>

                  {isAnswered && (isChosen || option.isCorrect) && (
                    <div class={`text-xs font-semibold leading-relaxed pt-2 border-t ${
                      option.isCorrect ? 'border-emerald-300 text-emerald-800' : 'border-rose-300 text-rose-800'
                    }`}>
                      {option.explanation}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Post-Answer CompTIA Exam Takeaway & Next Button */}
          {isAnswered && (
            <div class="pt-4 border-t border-slate-200 space-y-4 animate-fadeIn">
              
              <div class="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm text-indigo-950 font-medium flex items-start gap-3">
                <KeyRound class="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span class="font-black text-indigo-900 block mb-1">CompTIA Security+ Exam Tip:</span>
                  <span>{currentChallenge.compTiaTip}</span>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  onClick={handleNext}
                  class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{currentIndex + 1 < BOUNCER_CHALLENGES.length ? 'Next Guest ➡️' : 'View Mission Report 🏆'}</span>
                  <ArrowRight class="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* MISSION REPORT / SUMMARY */
        <div class="bg-white rounded-3xl p-8 border-4 border-amber-300 shadow-xl text-center space-y-6 max-w-xl mx-auto animate-scaleUp">
          <div class="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-400 mx-auto flex items-center justify-center text-4xl shadow-md">
            {score >= 6 ? '🎖️' : '📚'}
          </div>

          <div class="space-y-2">
            <h3 class="text-3xl font-black text-slate-900">
              {score === BOUNCER_CHALLENGES.length
                ? 'Master Firewall Bouncer! 🌟'
                : score >= 6
                ? 'Great Job, Security Guard! 🛡️'
                : 'Keep Practicing, Rookie! 💪'}
            </h3>
            <p class="text-slate-600 text-sm font-medium">
              You scored <strong class="text-amber-600 font-black">{score}</strong> out of <strong class="text-slate-900 font-black">{BOUNCER_CHALLENGES.length}</strong> guest scenarios!
            </p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
            {score >= 6
              ? 'You have mastered the core CompTIA Security+ ports! You know which ones are cleartext traps and which ones provide armored encryption.'
              : 'Don’t worry! Remember: Port 80 (HTTP) ➡️ 443 (HTTPS), Port 23 (Telnet) ➡️ 22 (SSH), Port 21 (FTP) ➡️ 22 (SFTP). Review the hotel doors and try again!'}
          </div>

          <div class="pt-4 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw class="w-4 h-4" />
              <span>Play Bouncer Challenge Again</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
