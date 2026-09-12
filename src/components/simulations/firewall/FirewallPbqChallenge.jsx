import React, { useState } from 'react';
import { PBQ_CHALLENGES } from './firewallData';
import { sounds } from '../../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  ShieldAlert, 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  AlertTriangle,
  KeyRound,
  HelpCircle
} from 'lucide-react';

export default function FirewallPbqChallenge() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const challenge = PBQ_CHALLENGES[currentIndex];

  const handleSelectOption = (option, idx) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    if (option.isCorrect) {
      sounds.playSuccess();
      setScore((prev) => prev + 1);

      try {
        confetti({
          particleCount: 30,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sounds.playPop();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIndex + 1 < PBQ_CHALLENGES.length) {
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
    setShowSummary(false);
  };

  return (
    <div class="space-y-8">
      
      {/* Header Bar */}
      <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-2xl font-black">
            🔧
          </div>
          <div>
            <h2 class="text-2xl font-black text-slate-900">
              Fix the Broken Firewall (CompTIA PBQ Simulator)
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 font-medium">
              Real-world troubleshooting scenarios. Inspect broken rule tables, identify misconfigurations, and restore connectivity!
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl font-black text-xs text-slate-700">
          <Trophy class="w-4 h-4 text-amber-500" />
          <span>Score: {score} / {PBQ_CHALLENGES.length}</span>
        </div>
      </div>

      {/* QUIZ INTERFACE OR MISSION REPORT */}
      {!showSummary ? (
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-200 shadow-lg space-y-6">
          
          {/* Progress Tracker */}
          <div class="flex items-center justify-between text-xs font-extrabold text-slate-500 border-b border-slate-100 pb-3">
            <span>Troubleshooting Ticket #{currentIndex + 1} of {PBQ_CHALLENGES.length}</span>
            <div class="flex gap-1.5">
              {PBQ_CHALLENGES.map((_, i) => (
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

          {/* Scenario Description */}
          <div class="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-6 border-2 border-amber-300 space-y-2">
            <div class="flex items-center gap-2">
              <AlertTriangle class="w-5 h-5 text-amber-600" />
              <h3 class="font-black text-base text-slate-900">{challenge.title}</h3>
            </div>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {challenge.scenario}
            </p>
          </div>

          {/* The Broken Firewall Table Display */}
          <div class="space-y-2">
            <span class="text-xs font-black uppercase text-slate-500 tracking-wider">
              Inspect Currently Loaded Firewall Rules:
            </span>
            <div class="overflow-x-auto border-2 border-slate-200 rounded-2xl">
              <table class="w-full text-left text-xs font-mono">
                <thead class="bg-slate-100 text-slate-600 uppercase font-black text-[10px] border-b border-slate-200">
                  <tr>
                    <th class="p-3">Rule #</th>
                    <th class="p-3">Action</th>
                    <th class="p-3">Direction</th>
                    <th class="p-3">Source</th>
                    <th class="p-3">Dest</th>
                    <th class="p-3">Port</th>
                    <th class="p-3">Proto</th>
                    <th class="p-3 font-sans">Comment</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  {challenge.brokenRules.map((r) => (
                    <tr key={r.id} class="bg-white hover:bg-slate-50">
                      <td class="p-3 font-bold text-slate-900">{r.ruleNum}</td>
                      <td class="p-3 font-sans">
                        <span class={`px-2 py-0.5 rounded text-[11px] font-black uppercase ${
                          r.action === 'ALLOW' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {r.action}
                        </span>
                      </td>
                      <td class="p-3 font-sans font-bold text-slate-700">{r.direction}</td>
                      <td class="p-3 text-slate-800">{r.sourceIp}</td>
                      <td class="p-3 text-slate-800">{r.destIp}</td>
                      <td class="p-3 font-black text-indigo-700">{r.port}</td>
                      <td class="p-3 font-bold text-slate-600">{r.protocol}</td>
                      <td class="p-3 font-sans text-slate-500 text-xs">{r.comment}</td>
                    </tr>
                  ))}
                  <tr class="bg-rose-50/50 text-rose-900">
                    <td class="p-3 font-bold">99</td>
                    <td class="p-3 font-sans"><span class="px-2 py-0.5 rounded text-[11px] font-black uppercase bg-rose-200 text-rose-900">DENY</span></td>
                    <td class="p-3 font-sans font-bold">ANY</td>
                    <td class="p-3">ANY</td>
                    <td class="p-3">ANY</td>
                    <td class="p-3">ANY</td>
                    <td class="p-3">ANY</td>
                    <td class="p-3 font-sans text-slate-500 text-xs italic">Implicit Deny (Default)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Diagnostic Question & Options */}
          <div class="space-y-3 pt-2">
            <div class="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <HelpCircle class="w-5 h-5 text-indigo-600" />
              <span>{challenge.question}</span>
            </div>

            <div class="space-y-3">
              {challenge.options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md';
                  } else if (isChosen) {
                    btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-black';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt, idx)}
                    disabled={isAnswered}
                    class={`w-full p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.99] flex items-start justify-between gap-3 ${btnStyle}`}
                  >
                    <span class="text-xs sm:text-sm font-bold leading-relaxed">{opt.text}</span>
                    {isAnswered && (
                      opt.isCorrect ? (
                        <CheckCircle2 class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : isChosen ? (
                        <XCircle class="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      ) : null
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Post-Answer CompTIA Takeaway & Remediation */}
          {isAnswered && (
            <div class="pt-4 border-t border-slate-200 space-y-4 animate-fadeIn">
              
              <div class="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 font-medium flex items-start gap-3">
                <Wrench class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span class="font-black text-emerald-900 block mb-1">Recommended Remediation Action:</span>
                  <span>{challenge.options.find(o => o.isCorrect)?.fixAction}</span>
                </div>
              </div>

              <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm text-indigo-950 font-medium flex items-start gap-3">
                <KeyRound className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-black text-indigo-900 block mb-1">CompTIA Security+ Exam Concept:</span>
                  <span>{challenge.compTiaTakeaway}</span>
                </div>
              </div>

              {challenge.kenyanMetaphor && (
                <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium flex items-start gap-3">
                  <span className="text-xl shrink-0 mt-0.5">🇰🇪</span>
                  <div>
                    <span className="font-black text-amber-900 block mb-1">Kenyan Everyday Analogy (Street Reality):</span>
                    <span className="italic text-amber-900">{challenge.kenyanMetaphor}</span>
                  </div>
                </div>
              )}

              <div class="flex justify-end">
                <button
                  onClick={handleNext}
                  class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{currentIndex + 1 < PBQ_CHALLENGES.length ? 'Next Troubleshooting Ticket ➡️' : 'View Performance Report 🏆'}</span>
                  <ArrowRight class="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* MISSION REPORT */
        <div class="bg-white rounded-3xl p-8 border-4 border-amber-300 shadow-xl text-center space-y-6 max-w-xl mx-auto animate-scaleUp">
          <div class="w-20 h-20 rounded-full bg-amber-100 border-4 border-amber-400 mx-auto flex items-center justify-center text-4xl shadow-md">
            {score === PBQ_CHALLENGES.length ? '🏆' : '🛡️'}
          </div>

          <div class="space-y-2">
            <h3 class="text-3xl font-black text-slate-900">
              {score === PBQ_CHALLENGES.length ? 'Master Network Security Engineer! 🌟' : 'Firewall Diagnostic Complete! 💪'}
            </h3>
            <p class="text-slate-600 text-sm font-medium">
              You resolved <strong class="text-amber-600 font-black">{score}</strong> out of <strong class="text-slate-900 font-black">{PBQ_CHALLENGES.length}</strong> firewall troubleshooting tickets!
            </p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed text-left space-y-2">
            <div class="font-black text-slate-900">Key Takeaways for CompTIA Security+:</div>
            <ul class="list-disc list-inside space-y-1 text-xs">
              <li><strong>First Match Wins:</strong> Never place broad DENY rules above specific ALLOW rules.</li>
              <li><strong>Directionality:</strong> Ensure INBOUND rules govern external traffic entering internal interfaces.</li>
              <li><strong>Least Privilege:</strong> Restrict database ports from ANY to specific web application subnets.</li>
              <li><strong>Implicit Deny:</strong> Any traffic not explicitly allowed is automatically dropped at the end.</li>
            </ul>
          </div>

          <div class="pt-4 flex justify-center">
            <button
              onClick={handleRestart}
              class="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw class="w-4 h-4" />
              <span>Retry PBQ Challenge</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
