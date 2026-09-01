import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "Employees in a conference room report being repeatedly disconnected from the corporate Wi-Fi network every few minutes. Packet capture analysis shows forged 802.11 disassociation frames containing the Access Point's MAC address sent in cleartext. What attack is taking place?",
    options: [
      { 
        text: "Wireless Deauthentication Attack", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SQL Injection", 
        isCorrect: false, 
        whyWrong: "SQL injection targets web application databases." 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      },
      { 
        text: "Rootkit installation", 
        isCorrect: false, 
        whyWrong: "Rootkits modify operating system kernels." 
      }
    ],
    laymanExplanation: "A Wireless Deauthentication Attack spoofs 802.11 management frames! Because legacy Wi-Fi sent management frames in plain text without authentication, hackers can fake 'goodbye' messages from the router to kick your phone off the Wi-Fi repeatedly."
  },
  {
    id: 2,
    question: "Which IEEE wireless standard addresses deauthentication attacks by encrypting 802.11 management frames (Protected Management Frames - PMF) to validate disassociation requests?",
    options: [
      { 
        text: "IEEE 802.11w", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Spanning Tree Protocol (STP)", 
        isCorrect: false, 
        whyWrong: "STP prevents Layer 2 ethernet switching loops." 
      },
      { 
        text: "Cleartext Telnet protocol", 
        isCorrect: false, 
        whyWrong: "Telnet transmits unencrypted text over network wires." 
      },
      { 
        text: "WPA3 passphrase disablement", 
        isCorrect: false, 
        whyWrong: "Disabling WPA3 weakens wireless security." 
      }
    ],
    laymanExplanation: "IEEE 802.11w introduces Protected Management Frames (PMF)! It encrypts deauthentication and disassociation frames, so hackers can no longer spoof fake disconnection messages."
  },
  {
    id: 3,
    question: "An attacker activates a device that transmits raw radio noise across the 2.4 GHz frequency band, drastically decreasing the Signal-to-Noise Ratio (SNR) and preventing nearby laptops from communicating with wireless access points. What attack is this?",
    options: [
      { 
        text: "Radio Frequency (RF) Jamming", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Vishing", 
        isCorrect: false, 
        whyWrong: "Vishing involves phone call voice phishing." 
      },
      { 
        text: "Pretexting", 
        isCorrect: false, 
        whyWrong: "Pretexting involves social engineering telephone stories." 
      },
      { 
        text: "Macro Virus", 
        isCorrect: false, 
        whyWrong: "Macro viruses run inside Microsoft Office document macros." 
      }
    ],
    laymanExplanation: "RF Jamming floods the airwaves with noise! It's like trying to have a conversation while someone screams into a megaphones next to you—the receiving laptop cannot hear the legitimate Wi-Fi signal through all the radio noise."
  },
  {
    id: 4,
    question: "A warehouse wireless network experiences intense packet dropouts whenever staff operate older unshielded microwave ovens in the breakroom next to the Wi-Fi access points. What phenomenon is causing this outage?",
    options: [
      { 
        text: "Unintentional Radio Frequency (RF) Interference", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Intentional Malicious Jamming", 
        isCorrect: false, 
        whyWrong: "Microwave ovens generate accidental RF leakage, not intentional malicious jamming." 
      },
      { 
        text: "DNS Cache Poisoning", 
        isCorrect: false, 
        whyWrong: "DNS cache poisoning injects fake IP address records into DNS resolvers." 
      },
      { 
        text: "Buffer Overflow", 
        isCorrect: false, 
        whyWrong: "Buffer overflows involve memory allocation bounds checking." 
      }
    ],
    laymanExplanation: "Unintentional Interference comes from everyday electronics! Microwave ovens, fluorescent lights, and cordless phones operate on the 2.4 GHz frequency, accidentally leaking radio signals that interfere with Wi-Fi."
  },
  {
    id: 5,
    question: "A security engineer is assigned to conduct 'fox hunting' to physically locate an illegal RF jammer operating inside a multi-story headquarters building. What equipment combination is essential for this search?",
    options: [
      { 
        text: "Directional Antenna and Attenuator", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "UPS battery backup and shop vacuum", 
        isCorrect: false, 
        whyWrong: "UPS backups and shop vacuums handle power outages and water spills." 
      },
      { 
        text: "HTML entity encoder and WAF", 
        isCorrect: false, 
        whyWrong: "HTML encoders and WAFs protect web applications from XSS." 
      },
      { 
        text: "Mirai default password scanner", 
        isCorrect: false, 
        whyWrong: "Mirai scanners check default credentials on IoT devices." 
      }
    ],
    laymanExplanation: "'Fox Hunting' tracks down rogue radio transmitters in the physical world! Security engineers use a Directional Antenna (to point where the signal is strongest) and an Attenuator (to shrink the signal as they get closer) to pinpoint the jammer."
  },
  {
    id: 6,
    question: "Which sophisticated wireless jamming technique sits quietly on a Wi-Fi channel without broadcasting noise, transmitting interfering radio signals ONLY when it detects another device attempting to transmit data frames?",
    options: [
      { 
        text: "Reactive Jamming", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Constant Random Bit Jamming", 
        isCorrect: false, 
        whyWrong: "Constant jamming transmits continuous noise non-stop." 
      },
      { 
        text: "Layer 2 Switching Loop", 
        isCorrect: false, 
        whyWrong: "Switching loops occur on wired ethernet switches without STP." 
      },
      { 
        text: "Disinformation Campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation involves social media fake news campaigns." 
      }
    ],
    laymanExplanation: "Reactive Jamming is sneaky! It sits silently waiting like a predator, and only blasts interfering radio noise the exact split-second it detects a laptop trying to send data, making it hard to detect when idle."
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

export default function WirelessAttacksMcq({ onBack }) {
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
            <span>CompTIA Security+ SY0-701 • Section 2.4</span>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight">
            2.4 - Wireless Attacks Practice 📶
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Wireless Deauthentication Attacks, IEEE 802.11w PMF, RF Jamming & SNR, Microwave Interference, Fox Hunting, and Reactive Jamming!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          📶
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
              ? '🌟 PERFECT SCORE! You have mastered 2.4 Wireless Attacks for CompTIA Security+!'
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
