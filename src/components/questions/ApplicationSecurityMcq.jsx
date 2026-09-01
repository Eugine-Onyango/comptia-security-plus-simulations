import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "A QA security engineer uses an automated testing tool to inject millions of random, malformed, and oversized data strings into a web application's search box to identify memory leaks, unhandled exceptions, and application crashes. What testing method is being executed?",
    options: [
      { 
        text: "Input Fuzzing (Fuzz Testing)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SQL Injection", 
        isCorrect: false, 
        whyWrong: "SQL injection is a web database attack." 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      },
      { 
        text: "RF Jamming", 
        isCorrect: false, 
        whyWrong: "RF Jamming floods radio frequencies with noise." 
      }
    ],
    laymanExplanation: "Fuzzers throw garbage data at your app to see if it breaks! Fuzz testing inputs invalid, random, or oversized payloads into form fields to uncover hidden bugs and crashes before real hackers find them."
  },
  {
    id: 2,
    question: "A web developer configures session authentication cookies for a financial web portal. To guarantee that user web browsers will only transmit the session cookie over encrypted HTTPS connections and never over cleartext HTTP, which header attribute must be set?",
    options: [
      { 
        text: "The `Secure` Attribute", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Cleartext Telnet protocol", 
        isCorrect: false, 
        whyWrong: "Telnet transmits unencrypted text over network wires." 
      },
      { 
        text: "Disabling WPA3 wireless encryption", 
        isCorrect: false, 
        whyWrong: "Disabling WPA3 removes wireless network protection." 
      },
      { 
        text: "Layer 2 Switching Loop", 
        isCorrect: false, 
        whyWrong: "Switching loops occur on ethernet switches without Spanning Tree Protocol." 
      }
    ],
    laymanExplanation: "The `Secure` cookie flag locks cookie transmission to HTTPS! If a user accidentally types `http://` in their browser, the `Secure` flag tells the browser to withhold the cookie so eavesdroppers on the wire can't steal the session."
  },
  {
    id: 3,
    question: "A software development team connects an automated security scanner to their Git repository that analyzes uncompiled C++ source code to detect buffer overflows, race conditions, and unvalidated parameters prior to compilation. What tool is in use?",
    options: [
      { 
        text: "Static Application Security Testing (SAST / Static Code Analyzer)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Vishing phone call attack", 
        isCorrect: false, 
        whyWrong: "Vishing involves phone call voice phishing." 
      },
      { 
        text: "HVAC thermal shutdown", 
        isCorrect: false, 
        whyWrong: "HVAC thermal shutdown turns off data center air conditioning." 
      },
      { 
        text: "Deauthentication flood attack", 
        isCorrect: false, 
        whyWrong: "Deauth floods disconnect Wi-Fi clients from access points." 
      }
    ],
    laymanExplanation: "SAST reads raw source code without executing it! Static Application Security Testing acts like a spell-checker for security bugs, analyzing code files before they are compiled into binaries."
  },
  {
    id: 4,
    question: "When a software vendor releases an application executable, the developer signs the binary using their private key and a digital certificate issued by a trusted Certificate Authority (CA). How does this protect end-user systems?",
    options: [
      { 
        text: "It verifies code origin and guarantees the executable has not been tampered with or modified", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Horizontal Privilege Escalation", 
        isCorrect: false, 
        whyWrong: "Horizontal privilege escalation involves accessing another user's account at the SAME permission level." 
      },
      { 
        text: "DNS Cache Poisoning", 
        isCorrect: false, 
        whyWrong: "DNS cache poisoning injects fake IP address records into DNS resolvers." 
      },
      { 
        text: "Typosquatting URL hijacking", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      }
    ],
    laymanExplanation: "Code signing is a tamper-proof digital wax seal! Asymmetric private key signing proves the software really came from the official developer and hasn't been infected with malware along the download path."
  },
  {
    id: 5,
    question: "A mobile operating system isolates every third-party app in a restricted, virtualized container so a newly installed game cannot read private photos, contacts, or storage files of other installed apps. What security architecture is enforced?",
    options: [
      { 
        text: "Application Sandboxing", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Increasing gigabit switch latency", 
        isCorrect: false, 
        whyWrong: "Switch latency does not isolate mobile OS app memory spaces." 
      },
      { 
        text: "Disabling WPA3 enterprise encryption", 
        isCorrect: false, 
        whyWrong: "Disabling WPA3 affects Wi-Fi security, not mobile OS sandboxing." 
      },
      { 
        text: "Forcing CPU thermal throttling", 
        isCorrect: false, 
        whyWrong: "Thermal throttling is a hardware heat response, not OS app isolation." 
      }
    ],
    laymanExplanation: "Sandboxing keeps apps in their own playpens! If an app is sandboxed, it cannot reach outside its assigned memory space to steal data from other applications or OS system files."
  },
  {
    id: 6,
    question: "A developer writes a web form handler that strips HTML tags, removes illegal quote characters, and converts user-entered zip codes into standard 5-digit format before sending data to the database. What secure coding process is occurring?",
    options: [
      { 
        text: "Input Validation and Data Normalization", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Telnet cleartext session", 
        isCorrect: false, 
        whyWrong: "Telnet transmits unencrypted cleartext data over port 23." 
      },
      { 
        text: "Disinformation campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation campaigns spread false propaganda on social media." 
      },
      { 
        text: "RF Jamming", 
        isCorrect: false, 
        whyWrong: "RF Jamming floods radio spectrum frequencies with noise." 
      }
    ],
    laymanExplanation: "Clean your inputs before trusting them! Input validation checks if data matches expected formats, and normalization cleans up messy inputs (like stripping `<script>` tags) to prevent injection attacks."
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

export default function ApplicationSecurityMcq({ onBack }) {
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
          <span>Back to Domain 4.0</span>
        </button>

        <button
          onClick={handleReshuffleAndRestart}
          class="flex items-center gap-1.5 px-3.5 py-2 bg-blue-100 hover:bg-blue-200 text-blue-900 rounded-2xl font-extrabold text-xs transition-all shadow-sm active:scale-95"
        >
          <Shuffle class="w-4 h-4 text-blue-700" />
          <span>Randomize & Reshuffle Questions 🎲</span>
        </button>
      </div>

      {/* Header Banner */}
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-200/50 flex items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md mb-2">
            <span>CompTIA Security+ SY0-701 • Section 4.1</span>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight">
            4.1 - Application Security Practice 💻
          </h1>
          <p class="text-blue-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Fuzz Testing, Input Normalization, Secure Cookie Attributes, SAST Code Analyzers, Digital Code Signing, and Sandboxing!
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
              <span class="px-2.5 py-1 bg-blue-100 text-blue-900 rounded-full font-black">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span class="text-slate-400 font-mono text-[11px]">(Options Shuffled 🎲)</span>
            </span>
            <span>Current Score: <strong class="text-blue-600 font-black">{score}</strong> / {questions.length}</span>
          </div>

          {/* Question Scenario Text */}
          <div class="space-y-2">
            <span class="text-xs font-extrabold uppercase tracking-wider text-blue-600">CompTIA Scenario Question</span>
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
                btnStyle = "border-blue-500 bg-blue-50 text-blue-950 font-extrabold shadow-md";
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
              <div class="p-5 bg-blue-50/80 border-2 border-blue-200 rounded-2xl space-y-1.5">
                <div class="font-black text-blue-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle class="w-4 h-4 text-blue-600" />
                  <span>Layman's Terms Explanation 💡</span>
                </div>
                <p class="text-slate-800 text-sm font-medium leading-relaxed">
                  {currentQ.laymanExplanation}
                </p>
              </div>

              {/* Why Other Options Don't Fit (Distractors Breakdown) */}
              <div class="p-5 bg-slate-900 text-white rounded-2xl space-y-3 font-sans">
                <div class="font-extrabold text-blue-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle class="w-4 h-4 text-blue-400" />
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
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                class="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question →' : 'See Exam Results 🏆'}</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results Screen */
        <div class="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm text-center space-y-6 animate-fadeIn">
          <div class="w-24 h-24 mx-auto rounded-full bg-blue-100 border-4 border-blue-400 flex items-center justify-center text-5xl shadow-lg">
            🏆
          </div>

          <div class="space-y-2">
            <h4 class="text-3xl font-black text-slate-900">Exam Practice Completed!</h4>
            <p class="text-slate-600 font-medium text-base">
              You scored <strong class="text-blue-600 font-black text-xl">{score}</strong> out of <strong class="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl max-w-md mx-auto text-blue-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered 4.1 Application Security for CompTIA Security+!'
              : '👍 Great effort! Click below to reshuffle the questions and options and try again for 100%!'}
          </div>

          <button
            onClick={handleReshuffleAndRestart}
            class="px-8 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <Shuffle class="w-5 h-5" /> Reshuffle Options & Retake Test 🎲
          </button>
        </div>
      )}

    </div>
  );
}
