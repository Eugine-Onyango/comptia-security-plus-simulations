import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "A system administrator aligns corporate server patching schedules with Microsoft's standard monthly security update release cycle. On which specific day of the month does Microsoft routinely release these security patches ('Patch Tuesday')?",
    options: [
      { 
        text: "The second Tuesday of each month", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The first Friday of each month", 
        isCorrect: false, 
        whyWrong: "First Friday is typically associated with economic employment reports, not Microsoft Patch Tuesday." 
      },
      { 
        text: "The last Sunday of each month", 
        isCorrect: false, 
        whyWrong: "Patch Tuesday is scheduled mid-month on Tuesdays to allow IT teams time to test and deploy during weekdays." 
      },
      { 
        text: "Every 15 days on a rolling calendar", 
        isCorrect: false, 
        whyWrong: "Microsoft follows a fixed monthly schedule on the second Tuesday of each month." 
      }
    ],
    laymanExplanation: "Microsoft releases its routine security updates on 'Patch Tuesday', which occurs on the 2nd Tuesday of every month. Sysadmins around the world use this schedule to plan monthly system maintenance!"
  },
  {
    id: 2,
    question: "Before deploying an emergency OS patch to production database servers, an IT security team installs the patch on an isolated test server cluster. Why is testing OS patches in a staging environment essential?",
    options: [
      { 
        text: "To verify that the patch does not break existing line-of-business applications or system services", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "To automatically generate new user passwords", 
        isCorrect: false, 
        whyWrong: "Patch testing verifies software stability, not user credential generation." 
      },
      { 
        text: "To double the server's CPU clock frequency", 
        isCorrect: false, 
        whyWrong: "Patch testing does not alter physical hardware clock speeds." 
      },
      { 
        text: "To bypass physical door access badge locks", 
        isCorrect: false, 
        whyWrong: "Patch testing verifies software compatibility, not physical facility security." 
      }
    ],
    laymanExplanation: "Always test patches in a staging (test) environment first! Sometimes a security patch can conflict with custom software or database settings, causing system crashes if deployed blindly to live production servers."
  },
  {
    id: 3,
    question: "A vendor security bulletin alerts administrators to a flaw in an OS network service that allows an unauthenticated attacker to run arbitrary malicious code over the network. Which type of vulnerability is described?",
    options: [
      { 
        text: "Remote Code Execution (RCE)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      },
      { 
        text: "Smishing", 
        isCorrect: false, 
        whyWrong: "Smishing involves SMS text message phishing." 
      },
      { 
        text: "War Dialing", 
        isCorrect: false, 
        whyWrong: "War dialing involves scanning telephone numbers for modems." 
      }
    ],
    laymanExplanation: "Remote Code Execution (RCE) is one of the most dangerous OS vulnerabilities. It allows an attacker across the internet or local network to run malicious commands on your computer without needing physical access or login credentials!"
  },
  {
    id: 4,
    question: "A standard user with basic permissions runs a custom script that exploits a bug in a Windows system driver to grant themselves full Administrator privileges. Which vulnerability type was exploited?",
    options: [
      { 
        text: "Elevation of Privilege (EoP)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disinformation Campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation campaigns involve fake news amplification on social media." 
      },
      { 
        text: "Watering Hole Attack", 
        isCorrect: false, 
        whyWrong: "Watering hole attacks involve poisoning public third-party websites." 
      },
      { 
        text: "Vishing", 
        isCorrect: false, 
        whyWrong: "Vishing is voice phone phishing." 
      }
    ],
    laymanExplanation: "Elevation of Privilege (EoP) occurs when a low-level user (or restricted program) tricks the operating system into giving them superuser/administrator rights that they shouldn't have!"
  },
  {
    id: 5,
    question: "An operating system patch applied to an enterprise web server causes the OS to fail with a Blue Screen of Death (BSOD) on boot. What best practice enables the administrator to recover system operations quickly?",
    options: [
      { 
        text: "Executing a fallback plan using verified system backups or virtual machine snapshots", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disabling WPA3 Wi-Fi encryption", 
        isCorrect: false, 
        whyWrong: "Disabling wireless encryption weakens Wi-Fi security and cannot fix OS boot failures." 
      },
      { 
        text: "Allowing all incoming TCP/UDP open ports", 
        isCorrect: false, 
        whyWrong: "Opening firewall ports does not resolve kernel crash loops." 
      },
      { 
        text: "Deleting all active user accounts", 
        isCorrect: false, 
        whyWrong: "Deleting accounts destroys user data without fixing system boot flaws." 
      }
    ],
    laymanExplanation: "A fallback plan (like restoring from a VM snapshot or verified backup) ensures that if an OS patch causes boot crashes or system failure, you can roll back to a known-good working state in minutes!"
  },
  {
    id: 6,
    question: "Why do modern operating systems represent such a massive attack surface for cyber attackers?",
    options: [
      { 
        text: "They contain millions of lines of complex code with numerous background services and features", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "They operate exclusively over unencrypted HTTP", 
        isCorrect: false, 
        whyWrong: "Modern operating systems use robust TLS, IPSec, and HTTPS encryption protocols." 
      },
      { 
        text: "They require physical keycards to turn on", 
        isCorrect: false, 
        whyWrong: "Operating systems run on software code, not physical door keycards." 
      },
      { 
        text: "They do not support software updates", 
        isCorrect: false, 
        whyWrong: "Operating systems support regular vendor software patches." 
      }
    ],
    laymanExplanation: "Operating systems contain millions of lines of code. Because the software is so massive and complex, undiscovered bugs and security vulnerabilities naturally exist inside the code waiting to be patched!"
  }
];

// Helper to shuffle array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function OsVulnerabilitiesMcq({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  // Initialize and randomize options & question order on mount / restart
  const initQuiz = () => {
    const prepared = rawQuestions.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(shuffleArray(prepared));
    setCurrentIdx(0);
    setScore(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setQuizFinished(false);
  };

  useEffect(() => {
    initQuiz();
  }, []);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    sounds.playPop();
    setSelectedOptionIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null) return;
    setIsSubmitted(true);

    const isRight = currentQ.options[selectedOptionIdx].isCorrect;
    if (isRight) {
      sounds.playSuccess();
      setScore(prev => prev + 1);
    } else {
      sounds.playBuzzer();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 140,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleReshuffleAndRestart = () => {
    sounds.playPop();
    initQuiz();
  };

  return (
    <div class="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Navigation Breadcrumb */}
      <div class="flex items-center justify-between">
        <button
          onClick={onBack}
          class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-sky-100 text-sky-900 border-2 border-sky-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to Domain 2.0</span>
        </button>

        <button
          onClick={handleReshuffleAndRestart}
          class="flex items-center gap-1.5 px-3.5 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl font-extrabold text-xs transition-all shadow-sm active:scale-95"
        >
          <Shuffle class="w-4 h-4 text-amber-700" />
          <span>Randomize & Reshuffle Questions 🎲</span>
        </button>
      </div>

      {/* Header Banner */}
      <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-amber-200/50 flex items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md mb-2">
            <span>CompTIA Security+ SY0-701 • Section 2.3</span>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight">
            2.3 - OS Vulnerabilities Exam Practice 💻
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Microsoft Patch Tuesday, Staging Patch Testing, Remote Code Execution (RCE), Elevation of Privilege (EoP), and Fallback Rollback Plans!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          💻
        </div>
      </div>

      {!quizFinished ? (
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
          
          {/* Progress Indicator */}
          <div class="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-4">
            <span class="flex items-center gap-2">
              <span class="px-2.5 py-1 bg-amber-100 text-amber-900 rounded-full font-black">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span class="text-slate-400 font-mono text-[11px]">(Options Shuffled 🎲)</span>
            </span>
            <span>Current Score: <strong class="text-amber-600 font-black">{score}</strong> / {questions.length}</span>
          </div>

          {/* Question Scenario Text */}
          <div class="space-y-2">
            <span class="text-xs font-extrabold uppercase tracking-wider text-amber-600">CompTIA Scenario Question</span>
            <h3 class="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Shuffled Options (A, B, C, D) */}
          <div class="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx); // A, B, C, D
              
              let btnStyle = "border-slate-200 bg-white hover:border-slate-300 text-slate-800";
              if (selectedOptionIdx === idx) {
                btnStyle = "border-amber-500 bg-amber-50 text-amber-950 font-extrabold shadow-md";
              }
              if (isSubmitted) {
                if (opt.isCorrect) {
                  btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-extrabold shadow-md";
                } else if (selectedOptionIdx === idx && !opt.isCorrect) {
                  btnStyle = "border-rose-500 bg-rose-50 text-rose-950 font-extrabold";
                } else {
                  btnStyle = "border-slate-100 bg-slate-50 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  class={`w-full p-4 rounded-2xl border-4 text-left transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <div class="flex items-start gap-3">
                    <span class="w-7 h-7 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {letter}
                    </span>
                    <span class="text-sm font-bold leading-normal">{opt.text}</span>
                  </div>

                  {isSubmitted && opt.isCorrect && <CheckCircle2 class="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />}
                  {isSubmitted && selectedOptionIdx === idx && !opt.isCorrect && <XCircle class="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Explanation & Distractor Breakdown (Rendered post-submission) */}
          {isSubmitted && (
            <div class="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
              
              {/* Correct Answer Status */}
              <div className={`p-4 rounded-2xl border-2 text-sm font-medium ${
                currentQ.options[selectedOptionIdx].isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div class="font-extrabold text-base flex items-center gap-2 mb-1">
                  {currentQ.options[selectedOptionIdx].isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect Choice!'}
                </div>
                <p class="font-bold text-xs">
                  Correct Answer: <span class="text-emerald-700 font-extrabold">{currentQ.options.find(o => o.isCorrect)?.text}</span>
                </p>
              </div>

              {/* Layman's Terms Explanation */}
              <div class="p-5 bg-amber-50/80 border-2 border-amber-200 rounded-2xl space-y-1.5">
                <div class="font-black text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle class="w-4 h-4 text-amber-600" />
                  <span>Layman's Terms Explanation 💡</span>
                </div>
                <p class="text-slate-800 text-sm font-medium leading-relaxed">
                  {currentQ.laymanExplanation}
                </p>
              </div>

              {/* Why Other Options Don't Fit (Distractors Breakdown) */}
              <div class="p-5 bg-slate-900 text-white rounded-2xl space-y-3 font-sans">
                <div class="font-extrabold text-amber-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle class="w-4 h-4 text-amber-400" />
                  <span>Why the Other Answers Don't Fit 🧐</span>
                </div>

                <div class="space-y-2 text-xs">
                  {currentQ.options.filter(o => !o.isCorrect).map((distractor, idx) => (
                    <div key={idx} class="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div class="font-extrabold text-rose-400">
                        ❌ {distractor.text}:
                      </div>
                      <div class="text-slate-300 font-medium leading-normal">
                        {distractor.whyWrong}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Action Button */}
          <div class="pt-4 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIdx === null}
                class={`px-8 py-3.5 rounded-2xl font-extrabold text-base shadow-md transition-all active:scale-95 ${
                  selectedOptionIdx !== null
                    ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                class="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question →' : 'See Exam Results 🏆'}</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results Screen */
        <div class="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm text-center space-y-6 animate-fadeIn">
          <div class="w-24 h-24 mx-auto rounded-full bg-amber-100 border-4 border-amber-400 flex items-center justify-center text-5xl shadow-lg">
            🏆
          </div>

          <div class="space-y-2">
            <h4 class="text-3xl font-black text-slate-900">Exam Practice Completed!</h4>
            <p class="text-slate-600 font-medium text-base">
              You scored <strong class="text-amber-600 font-black text-xl">{score}</strong> out of <strong class="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div class="p-4 bg-amber-50 border border-amber-200 rounded-2xl max-w-md mx-auto text-amber-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered 2.3 Operating System Vulnerabilities for CompTIA Security+!'
              : '👍 Great effort! Click below to reshuffle the questions and options and try again for 100%!'}
          </div>

          <button
            onClick={handleReshuffleAndRestart}
            class="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-amber-200 transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <Shuffle class="w-5 h-5" /> Reshuffle Options & Retake Test 🎲
          </button>
        </div>
      )}

    </div>
  );
}
