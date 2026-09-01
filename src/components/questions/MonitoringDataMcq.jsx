import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "A Linux system administrator configures Tripwire to monitor cryptographic hash values of /etc/passwd and system binary directories, while Windows admins rely on System File Checker (sfc /scannow). What security capability is being implemented?",
    options: [
      { 
        text: "File Integrity Monitoring (FIM)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SQL Injection attack", 
        isCorrect: false, 
        whyWrong: "SQL injection targets web database input forms." 
      },
      { 
        text: "Typosquatting domain registration", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      },
      { 
        text: "RF Jamming signal flood", 
        isCorrect: false, 
        whyWrong: "RF Jamming floods radio frequencies with noise." 
      }
    ],
    laymanExplanation: "File Integrity Monitoring (FIM) calculates digital fingerprints of system files that should NEVER change! Tools like Tripwire or System File Checker alert you immediately if malware secretively alters critical OS files."
  },
  {
    id: 2,
    question: "An organization deploys Data Loss Prevention (DLP) controls across three tiers: Endpoint DLP on employee laptops to protect data in RAM, Network DLP at internet egress to inspect packets, and Storage DLP scanning server hard drives. What three data states correspond to these controls?",
    options: [
      { 
        text: "Data in Use, Data in Motion, and Data at Rest", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Cleartext Telnet, SSH, and HTTP", 
        isCorrect: false, 
        whyWrong: "These are network communication protocols, not data states." 
      },
      { 
        text: "Public, Private, and Confidential labels", 
        isCorrect: false, 
        whyWrong: "These are data classification sensitivity levels." 
      },
      { 
        text: "Layer 1 Physical, Layer 2 Data Link, Layer 3 Network", 
        isCorrect: false, 
        whyWrong: "These are OSI network model layers." 
      }
    ],
    laymanExplanation: "Data exists in three states: 'Data in Use' (active in workstation memory/RAM), 'Data in Motion' (flying across network wires/Wi-Fi), and 'Data at Rest' (saved on hard drives or server storage)."
  },
  {
    id: 3,
    question: "Following the historic 'agent.btz' worm outbreak that replicated across military networks via removable media, a government enterprise installs an Endpoint DLP agent to block unauthorized USB flash drives. What primary risk is being mitigated?",
    options: [
      { 
        text: "Unauthorized USB storage device data exfiltration and malware propagation", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Vishing phone call phishing", 
        isCorrect: false, 
        whyWrong: "Vishing involves telephone voice phishing." 
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
    laymanExplanation: "Endpoint DLP can disable USB mass storage drivers! Blocking flash drives prevents malware from autorunning off infected USB keys and stops employees from copying sensitive files onto personal thumb drives."
  },
  {
    id: 4,
    question: "An organization inspects all outbound HTTP/HTTPS web traffic via a Cloud-based DLP proxy between internal users and the internet without deploying on-premises hardware. What capability allows the Cloud DLP to block unauthorized proprietary code uploads?",
    options: [
      { 
        text: "Inline inspect every byte of web traffic against custom defined data strings", 
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
    laymanExplanation: "Cloud DLP sits between your users and the internet! It acts like a digital inspector, checking outgoing web uploads for confidential project strings or Social Security Numbers before they leave the company."
  },
  {
    id: 5,
    question: "An employee emails an Excel spreadsheet template to an external party. Unknown to the employee, the file contains hidden columns listing 36,000 Social Security numbers. What security solution would have inspected and blocked this outbound email before delivery?",
    options: [
      { 
        text: "Email Gateway DLP Inspection", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Increasing gigabit switch latency", 
        isCorrect: false, 
        whyWrong: "Gigabit switch latency is a network timing metric, not email inspection." 
      },
      { 
        text: "Disabling WPA3 enterprise encryption", 
        isCorrect: false, 
        whyWrong: "Disabling WPA3 affects Wi-Fi security, not email DLP." 
      },
      { 
        text: "Forcing CPU thermal throttling", 
        isCorrect: false, 
        whyWrong: "Thermal throttling is a hardware heat response, not an email security control." 
      }
    ],
    laymanExplanation: "Email DLP inspects email attachments! Even if sensitive data like SSNs or medical records are buried inside hidden spreadsheet columns or PDF footnotes, email DLP catches and quarantines the message."
  },
  {
    id: 6,
    question: "Security administrators want to block employees from emailing fake wire transfers, W-2 tax forms, and customer credit card lists. Should email DLP rules be configured for Inbound, Outbound, or both traffic flows?",
    options: [
      { 
        text: "Both Inbound (for impostor phishing) and Outbound (for data loss prevention)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Inbound only, because outbound emails cannot contain malware", 
        isCorrect: false, 
        whyWrong: "Outbound emails frequently leak sensitive corporate data if not inspected." 
      },
      { 
        text: "Neither, DLP is only used on USB drives", 
        isCorrect: false, 
        whyWrong: "DLP is widely deployed across email, web, and cloud storage." 
      },
      { 
        text: "Outbound only, because inbound emails are never malicious", 
        isCorrect: false, 
        whyWrong: "Inbound emails carry phishing attachments, malware, and wire transfer scams." 
      }
    ],
    laymanExplanation: "Inspect BOTH directions! Inbound email DLP blocks incoming scam emails and malware, while Outbound email DLP prevents sensitive employee W-2s and credit card numbers from leaking out."
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

export default function MonitoringDataMcq({ onBack }) {
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
            <span>CompTIA Security+ SY0-701 • Section 4.5</span>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight">
            4.5 - Monitoring Data Practice 📊
          </h1>
          <p class="text-blue-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering File Integrity Monitoring (FIM / Tripwire / SFC), DLP (In Use, Motion, At Rest), USB Blocking, Cloud DLP, and Email DLP!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          📊
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
              ? '🌟 PERFECT SCORE! You have mastered 4.5 Monitoring Data for CompTIA Security+!'
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
