import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "A networking equipment vendor announces that a enterprise firewall model has reached End-of-Service Life (EOSL). What does EOSL imply regarding the security of these devices?",
    options: [
      { 
        text: "The vendor no longer provides technical support, security patches, or firmware updates for the product", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The product will automatically shut down and erase all configuration files", 
        isCorrect: false, 
        whyWrong: "EOSL indicates end of vendor support and patching, not remote self-destruction." 
      },
      { 
        text: "The vendor will replace the device with a new model free of charge", 
        isCorrect: false, 
        whyWrong: "EOSL means support ends; hardware replacement requires purchasing new equipment." 
      },
      { 
        text: "The hardware automatically converts all data streams to unencrypted HTTP", 
        isCorrect: false, 
        whyWrong: "EOSL affects vendor support and software patching, not protocol encryption." 
      }
    ],
    laymanExplanation: "End-of-Service Life (EOSL) means the manufacturer has completely stopped supporting the product. No new security patches or bug fixes will ever be released, leaving the device exposed to new vulnerabilities!"
  },
  {
    id: 2,
    question: "In 2014, security researchers notified Trane of three vulnerabilities in their Comfortlink II smart thermostats, but the vendor took nearly two years to issue full firmware patches. What unique risk does embedded hardware firmware present?",
    options: [
      { 
        text: "Hardware vendors are the sole source for firmware updates, and patch development can be slow or non-existent", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Firmware updates can be downloaded from any random third-party website", 
        isCorrect: false, 
        whyWrong: "Firmware is proprietary software that must come directly from the official hardware manufacturer." 
      },
      { 
        text: "Firmware runs exclusively in web browser JavaScript", 
        isCorrect: false, 
        whyWrong: "Firmware is embedded microcode inside hardware chips, not browser scripts." 
      },
      { 
        text: "Firmware automatically fixes operating system buffer overflows", 
        isCorrect: false, 
        whyWrong: "Firmware controls hardware chips and cannot fix separate host OS application bugs." 
      }
    ],
    laymanExplanation: "Firmware is the internal software embedded inside hardware devices (like smart thermostats or routers). If a vulnerability is found, you have to wait for the original manufacturer to write and release a fix!"
  },
  {
    id: 3,
    question: "An industrial facility uses specialized manufacturing equipment running legacy Windows XP that reached EOSL years ago and cannot be upgraded. What is the BEST compensating security control to protect this system?",
    options: [
      { 
        text: "Isolate the legacy machine on a segmented network with strict firewall rules and IPS monitoring", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Connect the machine directly to the public internet for automatic updates", 
        isCorrect: false, 
        whyWrong: "Connecting an unpatched EOSL operating system directly to the internet guarantees malware infection." 
      },
      { 
        text: "Disable all firewall rules on the legacy machine", 
        isCorrect: false, 
        whyWrong: "Disabling firewalls removes necessary network isolation." 
      },
      { 
        text: "Use default admin credentials on all local accounts", 
        isCorrect: false, 
        whyWrong: "Default credentials expose the machine to unauthorized access." 
      }
    ],
    laymanExplanation: "When legacy hardware or EOSL software cannot be upgraded, use network segmentation (isolation)! Placing legacy devices behind strict firewall rules and IPS monitors prevents attackers from reaching them."
  },
  {
    id: 4,
    question: "An organization deploys dozens of IoT devices, including smart refrigerators, connected garage doors, and environmental sensors. What security challenge do these devices introduce?",
    options: [
      { 
        text: "They expand the attack surface with embedded hardware that often lacks accessible management or security update options", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "They eliminate the need for enterprise firewalls", 
        isCorrect: false, 
        whyWrong: "IoT devices increase security risks and demand stronger firewalls." 
      },
      { 
        text: "They automatically encrypt all local network traffic with WPA3", 
        isCorrect: false, 
        whyWrong: "IoT devices do not manage network-wide Wi-Fi encryption." 
      },
      { 
        text: "They prevent SQL injection attacks on backend databases", 
        isCorrect: false, 
        whyWrong: "IoT hardware does not protect web databases against SQLi." 
      }
    ],
    laymanExplanation: "IoT (Internet of Things) devices (like smart bulbs, cameras, and thermostats) connect to your network but often lack traditional antivirus or automated security update options, creating easy entry points for hackers!"
  },
  {
    id: 5,
    question: "An attacker occupying a guest virtual machine (VM) exploits a flaw in the hypervisor to escape the virtualized container and gain access to the host operating system. What virtualization vulnerability is this?",
    options: [
      { 
        text: "VM Escape (Hypervisor Escape)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "VM Sprawl", 
        isCorrect: false, 
        whyWrong: "VM sprawl refers to the proliferation of unmanaged or forgotten virtual machines." 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves misspelled web domain names." 
      },
      { 
        text: "Pretexting", 
        isCorrect: false, 
        whyWrong: "Pretexting involves social engineering roleplay stories." 
      }
    ],
    laymanExplanation: "VM Escape occurs when an attacker breaks out of their isolated virtual machine ('the guest') and gains access to the underlying host computer running all the other virtual machines!"
  },
  {
    id: 6,
    question: "An IT department discovers hundreds of unmanaged, unpatched virtual machines that were created for temporary testing projects but never decommissioned. What virtualization risk does this illustrate?",
    options: [
      { 
        text: "VM Sprawl", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "VM Escape", 
        isCorrect: false, 
        whyWrong: "VM escape involves breaking hypervisor isolation to reach the host OS." 
      },
      { 
        text: "DLL Injection", 
        isCorrect: false, 
        whyWrong: "DLL injection involves injecting Windows library paths into target processes." 
      },
      { 
        text: "Buffer Overflow", 
        isCorrect: false, 
        whyWrong: "Buffer overflow involves memory buffer boundary bounds violations." 
      }
    ],
    laymanExplanation: "VM Sprawl occurs when users create virtual machines for temporary projects and then forget about them. These abandoned VMs sit unpatched on the network, creating hidden entry points for attackers!"
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

export default function HardwareVirtualizationMcq({ onBack }) {
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
            2.3 - Hardware & Virtualization Vulnerabilities 🛠️
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering End-of-Life (EOL), End-of-Service Life (EOSL), Firmware Delays, Legacy Platform Isolation, IoT Attack Surface, VM Escape, and VM Sprawl!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🛠️
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
              ? '🌟 PERFECT SCORE! You have mastered Hardware, Virtualization, EOL, & EOSL for CompTIA Security+!'
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
