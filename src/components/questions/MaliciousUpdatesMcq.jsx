import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "In December 2020, threat actors breached the software build server of IT management vendor SolarWinds and inserted backdoor code into legitimate, digitally signed Orion software updates. Hundreds of government agencies and Fortune 500 companies automatically downloaded the update. What attack type occurred?",
    options: [
      { 
        text: "Supply Chain Malicious Update Attack (SolarWinds Orion Breach)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs, not compromising vendor software updates." 
      },
      { 
        text: "Vishing", 
        isCorrect: false, 
        whyWrong: "Vishing is voice phishing conducted over telephone calls." 
      },
      { 
        text: "Buffer Overflow", 
        isCorrect: false, 
        whyWrong: "Buffer overflow involves overflowing memory buffers in software." 
      }
    ],
    laymanExplanation: "The SolarWinds Orion breach was a massive supply chain malicious update attack! Attackers hacked the developer's build system and added hidden malware into official updates that customers trusted and installed automatically."
  },
  {
    id: 2,
    question: "While an employee is browsing an industry news website, a pop-up window appears stating: 'Critical Warning: Your web browser is outdated! Click here to download Update_Setup.exe.' What is the BEST course of action?",
    options: [
      { 
        text: "Do not click the pop-up link; navigate directly to the vendor's official website to verify and update", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Click the pop-up link immediately to prevent browser vulnerabilities", 
        isCorrect: false, 
        whyWrong: "Pop-up update prompts on random websites are frequently malicious downloads." 
      },
      { 
        text: "Disable OS digital signature enforcement and run the file", 
        isCorrect: false, 
        whyWrong: "Disabling digital signature checks removes critical malware protection." 
      },
      { 
        text: "Forward the downloaded exe file to all coworkers", 
        isCorrect: false, 
        whyWrong: "Forwarding unverified executable files spreads potential malware across the organization." 
      }
    ],
    laymanExplanation: "Never trust random web pop-ups claiming your browser or software needs an update! Always close the pop-up and visit the official developer website directly to download legitimate updates."
  },
  {
    id: 3,
    question: "An operating system blocks an application update installation, displaying the warning: 'Publisher Untrusted: Invalid Digital Signature.' Why is digital code signing critical for software updates?",
    options: [
      { 
        text: "It verifies that the update originated from the legitimate developer and has not been tampered with", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "It compresses the software file size for faster downloading", 
        isCorrect: false, 
        whyWrong: "Digital signatures provide authentication and integrity verification, not file compression." 
      },
      { 
        text: "It automatically backs up the user's hard drive", 
        isCorrect: false, 
        whyWrong: "Digital signatures do not perform system backups." 
      },
      { 
        text: "It speeds up Wi-Fi network routing", 
        isCorrect: false, 
        whyWrong: "Digital signatures deal with file integrity, not network hardware speed." 
      }
    ],
    laymanExplanation: "Digital code signatures act like a cryptographic seal of authenticity! They prove that the software update really came from the official developer and was not modified or corrupted by a hacker."
  },
  {
    id: 4,
    question: "A system administrator is preparing to deploy an urgent operating system patch across all corporate database servers. Which essential best practice should be completed prior to installing the patch?",
    options: [
      { 
        text: "Create and verify a known-good system backup", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disable firewall rule sets", 
        isCorrect: false, 
        whyWrong: "Disabling firewall rules exposes servers to external network threats." 
      },
      { 
        text: "Delete all system log files", 
        isCorrect: false, 
        whyWrong: "Deleting log files destroys audit trails needed for forensic analysis." 
      },
      { 
        text: "Turn off antivirus signature updates", 
        isCorrect: false, 
        whyWrong: "Turning off antivirus updates removes endpoint protection." 
      }
    ],
    laymanExplanation: "Always create a known-good backup before installing software or operating system patches! If the new update breaks the system or turns out to be faulty, you can quickly restore everything back to working condition."
  },
  {
    id: 5,
    question: "Why do automatic update mechanisms present a unique security challenge for enterprise organizations?",
    options: [
      { 
        text: "If a developer's software build environment is compromised, malicious code will automatically deploy to all downstream clients under trusted credentials", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Automatic updates permanently erase all saved user passwords", 
        isCorrect: false, 
        whyWrong: "Automatic updates are designed to patch bugs, not clear user password stores." 
      },
      { 
        text: "Automatic updates only work over unencrypted HTTP connections", 
        isCorrect: false, 
        whyWrong: "Modern update channels use encrypted HTTPS and TLS connections." 
      },
      { 
        text: "Automatic updates require manual phone call verification for every file", 
        isCorrect: false, 
        whyWrong: "Automatic updates run programmatically in the background without manual phone calls." 
      }
    ],
    laymanExplanation: "Automatic updates are convenient because they keep software fresh automatically. However, if hackers compromise the software company's build pipeline, every single customer will automatically download the infected update without realizing it!"
  },
  {
    id: 6,
    question: "An employee bypasses an operating system security warning by disabling 'Enforce Signed Applications' to install a downloaded tool from an unknown website. What security risk was introduced?",
    options: [
      { 
        text: "Execution of unverified or malicious code without integrity checks", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Immediate hardware CPU overheating", 
        isCorrect: false, 
        whyWrong: "Disabling signature checks bypasses software integrity verification, not hardware thermal limits." 
      },
      { 
        text: "Disabling of physical door access badges", 
        isCorrect: false, 
        whyWrong: "Operating system signature checks control local software execution, not physical building door locks." 
      },
      { 
        text: "Automatic conversion of data to plaintext", 
        isCorrect: false, 
        whyWrong: "Signature enforcement checks app publisher identity, not file encryption algorithms." 
      }
    ],
    laymanExplanation: "Never disable your operating system's digital signature checks! Bypassing signature enforcement allows untrusted, unverified software—including malware, trojans, and ransomware—to execute freely on your system."
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

export default function MaliciousUpdatesMcq({ onBack }) {
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
            2.3 - Malicious Updates Practice 📦
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering SolarWinds Orion Supply Chain Breach, Fake Browser Pop-ups, Digital Signature Verification, Known-Good Backups, and Automatic Update Risks!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          📦
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
              ? '🌟 PERFECT SCORE! You have mastered 2.3 Malicious Updates for CompTIA Security+!'
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
