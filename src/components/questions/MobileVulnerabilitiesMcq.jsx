import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "An employee modifies an enterprise-issued iPhone to gain full file system access and bypass Apple's operating system sandboxing restrictions, allowing them to install unapproved app stores. What process did the employee perform?",
    options: [
      { 
        text: "Jailbreaking", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      },
      { 
        text: "DLL Injection", 
        isCorrect: false, 
        whyWrong: "DLL injection involves injecting Windows library paths into target process memory." 
      },
      { 
        text: "SQL Injection", 
        isCorrect: false, 
        whyWrong: "SQL injection targets database servers via input forms." 
      }
    ],
    laymanExplanation: "Jailbreaking is the term specifically used for Apple iOS devices when users bypass built-in security limits to gain full access to the iOS file system and install unauthorized software!"
  },
  {
    id: 2,
    question: "An Android user flashes custom firmware onto their smartphone to obtain full superuser privileges over the operating system. What term describes gaining administrative control on Android devices, and what security risk does it create?",
    options: [
      { 
        text: "Rooting; it removes OS application sandboxing and circumvents MDM policy controls", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Sideloading; it enforces WPA3 wireless encryption", 
        isCorrect: false, 
        whyWrong: "Sideloading involves installing apps directly from outside app stores." 
      },
      { 
        text: "Typosquatting; it locks out the device SIM card", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves URL domain typos." 
      },
      { 
        text: "War Driving; it encrypts all SMS messages", 
        isCorrect: false, 
        whyWrong: "War driving involves searching for open Wi-Fi networks in a vehicle." 
      }
    ],
    laymanExplanation: "Rooting refers to gaining superuser (root) privileges on Android devices. While it grants total control, it also destroys OS sandboxing and makes Mobile Device Management (MDM) security software useless!"
  },
  {
    id: 3,
    question: "An employee downloads an Android application directly as an `.apk` file from a random third-party website and installs it manually onto their phone, bypassing the official Google Play Store. What practice is this?",
    options: [
      { 
        text: "Sideloading", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Vishing", 
        isCorrect: false, 
        whyWrong: "Vishing involves phone call voice phishing scams." 
      },
      { 
        text: "Smishing", 
        isCorrect: false, 
        whyWrong: "Smishing involves SMS text message phishing." 
      },
      { 
        text: "Pretexting", 
        isCorrect: false, 
        whyWrong: "Pretexting involves social engineering scenario storytelling." 
      }
    ],
    laymanExplanation: "Sideloading is installing apps directly from third-party websites or files (.apk / .ipa) rather than through official, vetted app stores like Google Play or the Apple App Store!"
  },
  {
    id: 4,
    question: "A company deploys a Mobile Device Management (MDM) solution to enforce device encryption and passcode policies. Why does a rooted or jailbroken mobile device pose a significant threat to MDM security?",
    options: [
      { 
        text: "Rooting and jailbreaking grant elevated privileges that allow users or malware to disable MDM enforcement and monitoring", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "MDM solutions only run on analog landline telephones", 
        isCorrect: false, 
        whyWrong: "MDM software is designed specifically for modern smartphones and tablets." 
      },
      { 
        text: "Jailbreaking automatically erases all cellular network SIM cards", 
        isCorrect: false, 
        whyWrong: "Jailbreaking modifies OS software access, not physical SIM cards." 
      },
      { 
        text: "Rooting forces the phone to use cleartext Telnet", 
        isCorrect: false, 
        whyWrong: "Rooting modifies local OS privileges, not default network protocols." 
      }
    ],
    laymanExplanation: "When a phone is rooted or jailbroken, security protections are unlocked. This allows users (or malware!) to turn off MDM tracking, bypass passcode requirements, and ignore corporate security policies."
  },
  {
    id: 5,
    question: "A user sideloads a free utility app onto their smartphone from an unverified third-party app repository. Shortly after, the app steals SMS two-factor authentication (2FA) codes and contacts. What type of malicious software was delivered?",
    options: [
      { 
        text: "Mobile Trojan Horse malware delivered via Sideloading", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disinformation campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation involves social media fake news campaigns." 
      },
      { 
        text: "Hardware EOL vulnerability", 
        isCorrect: false, 
        whyWrong: "Hardware EOL involves manufacturer product discontinuation." 
      },
      { 
        text: "War dialer", 
        isCorrect: false, 
        whyWrong: "War dialers scan telephone numbers for active modems." 
      }
    ],
    laymanExplanation: "Sideloading apps from unofficial sources is a major vector for Mobile Trojans! The app pretends to be a harmless tool (like a flashlight or calculator) while secretly stealing passwords and SMS 2FA codes."
  },
  {
    id: 6,
    question: "Why do enterprise mobile smartphones present unique security challenges compared to traditional desktop computers in a corporate environment?",
    options: [
      { 
        text: "Mobile devices are small, constantly in motion, packed with sensitive data, and continuously connected to untrusted public networks", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Mobile devices do not contain microprocessors", 
        isCorrect: false, 
        whyWrong: "Smartphones rely on advanced multi-core microprocessors." 
      },
      { 
        text: "Desktop computers cannot run firewalls", 
        isCorrect: false, 
        whyWrong: "Desktops run robust operating system and network firewalls." 
      },
      { 
        text: "Mobile devices are immune to physical theft", 
        isCorrect: false, 
        whyWrong: "Mobile devices are highly vulnerable to physical loss or theft due to their small size." 
      }
    ],
    laymanExplanation: "Smartphones travel everywhere with employees, connecting to public Wi-Fi at coffee shops and airports while storing confidential work emails and personal data, making them prime targets for theft and hacking!"
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

export default function MobileVulnerabilitiesMcq({ onBack }) {
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
            2.3 - Mobile Device Vulnerabilities 📱
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Jailbreaking (iOS), Rooting (Android), Sideloading (.apk/.ipa), Custom Firmware, MDM Evasion, and Mobile Trojans!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          📱
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
              ? '🌟 PERFECT SCORE! You have mastered 2.3 Mobile Device Vulnerabilities for CompTIA Security+!'
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
