import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "A nation-state threat actor exploits a software flaw in a popular web browser that the software vendor is unaware of and has not yet created a patch for. What type of security issue is this?",
    options: [
      { 
        text: "Zero-day Vulnerability", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "End-of-Service Life (EOSL)", 
        isCorrect: false, 
        whyWrong: "EOSL involves manufacturer support discontinuation." 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      },
      { 
        text: "Disinformation Campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation involves social media fake news campaigns." 
      }
    ],
    laymanExplanation: "A Zero-day Vulnerability is a bug that the vendor has known about for '0 days'. Because the developer doesn't even know the bug exists, no official security patch is available yet!"
  },
  {
    id: 2,
    question: "Why are traditional signature-based antivirus scanners usually ineffective at detecting and blocking zero-day malware attacks?",
    options: [
      { 
        text: "Zero-day attacks exploit unknown flaws for which no antivirus signatures or definitions currently exist", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Zero-day attacks only infect analog landline telephones", 
        isCorrect: false, 
        whyWrong: "Zero-day vulnerabilities affect modern digital software and operating systems." 
      },
      { 
        text: "Signature-based scanners only run on Linux systems", 
        isCorrect: false, 
        whyWrong: "Signature scanners run across all operating systems including Windows, macOS, and Linux." 
      },
      { 
        text: "Zero-day attacks automatically encrypt all network traffic with WPA3", 
        isCorrect: false, 
        whyWrong: "WPA3 is Wi-Fi encryption and is unrelated to malware signature detection." 
      }
    ],
    laymanExplanation: "Signature-based antivirus relies on a database of 'known bad' fingerprint signatures. Because a zero-day exploit is brand new and unknown, the antivirus scanner has no signature to match it against!"
  },
  {
    id: 3,
    question: "In May 2023, Microsoft released a zero-day patch to fix a flaw in Secure Boot. What danger did this bootloader zero-day present?",
    options: [
      { 
        text: "It allowed attackers to execute unverified UEFI-level self-signed code during system startup", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "It erased all physical hard drive partitions permanently", 
        isCorrect: false, 
        whyWrong: "Secure Boot zero-days bypass boot integrity signature checks, not instant disk erasing." 
      },
      { 
        text: "It converted HTTP web traffic to cleartext Telnet", 
        isCorrect: false, 
        whyWrong: "Secure Boot affects hardware bootloader integrity, not web browser protocols." 
      },
      { 
        text: "It forced all users to use default admin passwords", 
        isCorrect: false, 
        whyWrong: "Secure Boot zero-days bypass digital boot signatures, not local account password policies." 
      }
    ],
    laymanExplanation: "The May 2023 Secure Boot zero-day allowed hackers to bypass hardware boot security and run custom UEFI boot code before the operating system even loaded, making malware invisible to standard OS security tools!"
  },
  {
    id: 4,
    question: "A security analyst tracks newly reported vulnerabilities using standardized catalog identifiers managed by MITRE, such as `CVE-2023-21716`. What does the acronym CVE stand for?",
    options: [
      { 
        text: "Common Vulnerabilities and Exposures", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Centralized Virus Encryption", 
        isCorrect: false, 
        whyWrong: "CVE refers to the public dictionary of standardized vulnerability identifiers." 
      },
      { 
        text: "Certified Virtual Environment", 
        isCorrect: false, 
        whyWrong: "CVE is a vulnerability database system, not a virtual machine certificate." 
      },
      { 
        text: "Control Vector Execution", 
        isCorrect: false, 
        whyWrong: "CVE stands specifically for Common Vulnerabilities and Exposures." 
      }
    ],
    laymanExplanation: "CVE stands for Common Vulnerabilities and Exposures. It is an open dictionary managed by MITRE that gives every discovered software vulnerability a unique standard ID number (like CVE-2023-XXXX)."
  },
  {
    id: 5,
    question: "Because official vendor security patches do not exist for zero-day vulnerabilities, which defense strategy BEST detects and mitigates zero-day exploits in real-time?",
    options: [
      { 
        text: "Behavioral-based Endpoint Detection and Response (EDR) anomaly monitoring and defense-in-depth", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disabling all network firewalls", 
        isCorrect: false, 
        whyWrong: "Disabling firewalls removes essential network isolation." 
      },
      { 
        text: "Using default administrator passwords", 
        isCorrect: false, 
        whyWrong: "Default admin credentials expose systems to automated botnet logins." 
      },
      { 
        text: "Relying strictly on monthly Patch Tuesday updates", 
        isCorrect: false, 
        whyWrong: "Zero-days occur before patches exist, so waiting for monthly patches leaves systems exposed." 
      }
    ],
    laymanExplanation: "Since there is no patch yet for a zero-day, you must rely on Behavioral Analysis (like EDR software)! Behavioral EDR watches for suspicious actions—like a web browser trying to launch system commands—even if the signature is unknown."
  },
  {
    id: 6,
    question: "In April and May 2023, zero-day vulnerabilities in Google Chrome and Apple iOS allowed attackers to break out of isolated application containers. What security boundary was bypassed?",
    options: [
      { 
        text: "Browser Sandbox Escape", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "WPA3 wireless passphrase", 
        isCorrect: false, 
        whyWrong: "Sandbox escape involves breaking out of application process isolation, not Wi-Fi passphrases." 
      },
      { 
        text: "UPS battery backup", 
        isCorrect: false, 
        whyWrong: "UPS battery backups supply power during electrical outages." 
      },
      { 
        text: "HVAC cooling duct", 
        isCorrect: false, 
        whyWrong: "HVAC cooling ducts control environmental room temperature." 
      }
    ],
    laymanExplanation: "A Sandbox Escape occurs when a hacker exploits a zero-day to break out of a restricted application box (like a web browser window) and gain access to the main underlying operating system!"
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

export default function ZeroDayMcq({ onBack }) {
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
            2.3 - Zero-day Vulnerabilities Practice 🛡️
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Unknown Flaws, Signature AV Limitations, Microsoft Secure Boot 2023 Zero-Day, CVE Identifiers, Behavioral EDR, and Sandbox Escape!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🛡️
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
              ? '🌟 PERFECT SCORE! You have mastered 2.3 Zero-day Vulnerabilities for CompTIA Security+!'
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
