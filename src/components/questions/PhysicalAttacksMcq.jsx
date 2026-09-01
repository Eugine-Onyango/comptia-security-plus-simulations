import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "An intruder gains physical access to an unlocked server room rack. Although the operating system requires a 20-character password, the intruder inserts a USB boot drive, reboots the server, and copies the active database files. What core cybersecurity rule was demonstrated?",
    options: [
      { 
        text: "Physical access to hardware grants an attacker total system control", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Operating systems are immune to USB boot drives", 
        isCorrect: false, 
        whyWrong: "Operating systems cannot prevent boot sequence redirection if physical access is unrestricted." 
      },
      { 
        text: "WPA3 wireless encryption prevents USB file extraction", 
        isCorrect: false, 
        whyWrong: "WPA3 encrypts Wi-Fi radio signals, not local USB hardware buses." 
      },
      { 
        text: "Typosquatting grants direct root console access", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves URL domain typos." 
      }
    ],
    laymanExplanation: "The fundamental rule of physical security is: 'If an attacker has physical access to your hardware, they own your machine!' Software passwords cannot stop someone from booting off a USB drive or pulling out the hard drive."
  },
  {
    id: 2,
    question: "An attacker stands next to an employee in an elevator and uses a hidden handheld device to copy the RFID signal from the employee's building access badge. What attack occurred, and how can the company prevent unauthorized access?",
    options: [
      { 
        text: "RFID Badge Cloning; enforce Multi-Factor Authentication (MFA) requiring a PIN along with the badge", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Vishing; disable cleartext Telnet", 
        isCorrect: false, 
        whyWrong: "Vishing involves phone calls, not RFID proximity cards." 
      },
      { 
        text: "Pretexting; install UPS battery backups", 
        isCorrect: false, 
        whyWrong: "Pretexting involves telephone stories; UPS backups protect electrical power." 
      },
      { 
        text: "DLL Injection; enable macro virus scanners", 
        isCorrect: false, 
        whyWrong: "DLL injection involves Windows RAM memory." 
      }
    ],
    laymanExplanation: "RFID Badge Cloning uses cheap handheld tools to duplicate contactless key cards in seconds. Requiring a PIN or biometric scan alongside the card (Multi-Factor Authentication - MFA) stops cloned badges from working alone!"
  },
  {
    id: 3,
    question: "A malicious threat actor tampers with the external temperature control sensors of an enterprise data center, causing room temperatures to surge past 110°F (43°C) and triggering automatic thermal shutdowns on critical servers. What attack type is this?",
    options: [
      { 
        text: "Environmental Attack on HVAC Systems", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disinformation campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation involves social media fake news campaigns." 
      },
      { 
        text: "Smishing attack", 
        isCorrect: false, 
        whyWrong: "Smishing involves SMS text message phishing." 
      },
      { 
        text: "Fileless RAM Virus", 
        isCorrect: false, 
        whyWrong: "Fileless viruses operate in volatile system memory." 
      }
    ],
    laymanExplanation: "An Environmental Attack targets the physical surroundings that support IT equipment—like HVAC (Heating, Ventilation, and Air Conditioning)! Disabling cooling causes high-performance servers to overheat and crash."
  },
  {
    id: 4,
    question: "During a physical penetration test, a tester uses heavy tools to force open a locked ground-floor window frame to bypass electronic keypad doors. What category of physical attack was performed?",
    options: [
      { 
        text: "Physical Brute Force", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SQL Injection", 
        isCorrect: false, 
        whyWrong: "SQL injection targets web application databases." 
      },
      { 
        text: "War Driving", 
        isCorrect: false, 
        whyWrong: "War driving involves mapping Wi-Fi networks from a car." 
      },
      { 
        text: "Cross-site Scripting (XSS)", 
        isCorrect: false, 
        whyWrong: "XSS executes JavaScript in web browsers." 
      }
    ],
    laymanExplanation: "Physical Brute Force uses raw physical strength or heavy tools to push through barriers (breaking windows, forcing doors) when digital keypads or locks block the way."
  },
  {
    id: 5,
    question: "An attacker sabotages an organization's primary electrical supply panel and trips the emergency shutoff valve on backup generators, forcing an immediate hardware power outage. What supporting infrastructure was targeted?",
    options: [
      { 
        text: "Power Monitoring and Electrical Utilities", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "WPA3 wireless passphrases", 
        isCorrect: false, 
        whyWrong: "WPA3 passphrases secure Wi-Fi access." 
      },
      { 
        text: "HTML entity encoding", 
        isCorrect: false, 
        whyWrong: "HTML entity encoding prevents XSS web vulnerabilities." 
      },
      { 
        text: "Subaru token storage", 
        isCorrect: false, 
        whyWrong: "Subaru token storage refers to web authentication session tokens." 
      }
    ],
    laymanExplanation: "Attacking electrical power infrastructure cuts off the lifeblood of a data center! Disabling both main power lines and backup generators causes instant server outages."
  },
  {
    id: 6,
    question: "Which fire suppression technology is specifically designed for high-density server environments to extinguish electrical fires safely without causing water damage to sensitive microprocessors?",
    options: [
      { 
        text: "Gaseous Clean Agent Systems (e.g., FM-200 or Novec 1230)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Wet-pipe water sprinklers", 
        isCorrect: false, 
        whyWrong: "Wet-pipe water sprinklers ruin electrical server components with water." 
      },
      { 
        text: "Telnet cleartext pipes", 
        isCorrect: false, 
        whyWrong: "Telnet is an unencrypted network protocol." 
      },
      { 
        text: "Mirai default login scripts", 
        isCorrect: false, 
        whyWrong: "Mirai default scripts are botnet credential scanners." 
      }
    ],
    laymanExplanation: "Data centers use Gaseous Clean Agent Fire Suppression (like FM-200 or Novec 1230)! These systems flood the room with special gas that smothers fires instantly without using water that would destroy expensive electronics."
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

export default function PhysicalAttacksMcq({ onBack }) {
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
            2.4 - Physical Attacks Practice 🔑
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Physical Access Control, RFID Badge Cloning & MFA, Environmental Attacks (HVAC), Physical Brute Force, Power Sabotage, and Gaseous Fire Suppression!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🔑
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
              ? '🌟 PERFECT SCORE! You have mastered 2.4 Physical Attacks for CompTIA Security+!'
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
