import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "A popular web application becomes completely unresponsive after being flooded with millions of HTTP requests sent simultaneously from thousands of compromised smart home devices distributed globally. What attack type is this, and what controls the infected machines?",
    options: [
      { 
        text: "Distributed Denial of Service (DDoS) launched via a Botnet", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Typosquatting via an unauthorized domain", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      },
      { 
        text: "DLL Injection inside Windows memory", 
        isCorrect: false, 
        whyWrong: "DLL injection involves injecting Windows library paths into local RAM." 
      },
      { 
        text: "War Driving over open Wi-Fi networks", 
        isCorrect: false, 
        whyWrong: "War driving involves mapping wireless networks from a moving vehicle." 
      }
    ],
    laymanExplanation: "A Distributed Denial of Service (DDoS) uses a 'Botnet'—an army of thousands or millions of compromised computers/IoT devices—to overwhelm a target server with so much traffic that real users cannot connect!"
  },
  {
    id: 2,
    question: "An attacker sends small 64-byte requests to open public DNS servers, spoofing the victim company's public IP address as the sender. The DNS servers respond with 4,000-byte record replies directed at the victim's firewalls, saturating their internet pipe. What attack technique is this?",
    options: [
      { 
        text: "DDoS Reflection and Amplification", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Vishing", 
        isCorrect: false, 
        whyWrong: "Vishing involves phone call voice phishing scams." 
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
    laymanExplanation: "DDoS Reflection and Amplification turns small requests into huge floods! By spoofing the victim's IP address when querying public servers (like DNS or NTP), the attacker tricks those servers into reflecting giant data responses straight at the victim."
  },
  {
    id: 3,
    question: "A junior technician connects a patch cable between two network switches in a wiring closet without Spanning Tree Protocol (STP) enabled. Within seconds, broadcast frames loop infinitely, knocking all office computers offline. What incident occurred?",
    options: [
      { 
        text: "Unintentional 'Friendly' Denial of Service caused by a Layer 2 Loop", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Zero-day vulnerability exploit", 
        isCorrect: false, 
        whyWrong: "Zero-day vulnerabilities involve unpatched software flaws exploited by hackers." 
      },
      { 
        text: "Rootkit installation", 
        isCorrect: false, 
        whyWrong: "Rootkits modify operating system kernels." 
      },
      { 
        text: "Disinformation campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation involves social media fake news campaigns." 
      }
    ],
    laymanExplanation: "A 'Friendly' or Unintentional DoS happens without any hacker! Creating a physical switching loop without Spanning Tree Protocol (STP) causes broadcast traffic to multiply infinitely, freezing the network instantly."
  },
  {
    id: 4,
    question: "During a major cybersecurity incident, a SOC team focuses all attention on a massive DDoS attack flooding the public web portal. Later, analysts discover that threat actors used the outage to exfiltrate credit card databases unnoticed. What role did the DDoS attack play?",
    options: [
      { 
        text: "A Smokescreen distraction for data exfiltration", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "WPA3 wireless encryption", 
        isCorrect: false, 
        whyWrong: "WPA3 is Wi-Fi security, not an attack distraction." 
      },
      { 
        text: "UPS battery failure", 
        isCorrect: false, 
        whyWrong: "UPS battery failures involve electrical power backups." 
      },
      { 
        text: "HVAC cooling leak", 
        isCorrect: false, 
        whyWrong: "HVAC leaks involve physical room temperature equipment." 
      }
    ],
    laymanExplanation: "Hackers frequently use DoS attacks as a Smokescreen! While your security team is panicking and fighting to bring the main website back online, the hackers sneak in the back door to steal secret data."
  },
  {
    id: 5,
    question: "Why is a Distributed Denial of Service (DDoS) attack categorized as an 'asymmetric threat' in cybersecurity?",
    options: [
      { 
        text: "An attacker commands vast botnet resources with minimal cost, forcing the victim to spend massive resources to defend", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "DDoS attacks only affect analog landline telephones", 
        isCorrect: false, 
        whyWrong: "DDoS attacks target digital networks and web servers." 
      },
      { 
        text: "Botnets require asymmetric RSA key pairs to transmit HTTP traffic", 
        isCorrect: false, 
        whyWrong: "Asymmetric threat refers to resource imbalance between attacker and defender, not RSA cryptography." 
      },
      { 
        text: "DDoS attacks cannot be logged by firewalls", 
        isCorrect: false, 
        whyWrong: "Firewalls and SIEM systems log all incoming DDoS traffic spikes." 
      }
    ],
    laymanExplanation: "It is an 'Asymmetric Threat' because it is unfair! A single hacker renting a cheap botnet can launch overwhelming traffic that requires the victim enterprise to spend millions on bandwidth and DDoS protection."
  },
  {
    id: 6,
    question: "Several employees begin downloading 10 GB Linux ISO files simultaneously over a company's limited T1 WAN connection, causing corporate VoIP phone calls to drop and web browsing to stall. What network control prevents this non-malicious bandwidth exhaustion?",
    options: [
      { 
        text: "Quality of Service (QoS) and Bandwidth Rate Limiting", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disabling WPA3 wireless passphrases", 
        isCorrect: false, 
        whyWrong: "Disabling Wi-Fi security exposes wireless traffic." 
      },
      { 
        text: "Cleartext Telnet logging", 
        isCorrect: false, 
        whyWrong: "Telnet transmits unencrypted text over networks." 
      },
      { 
        text: "Mirai default password scanner", 
        isCorrect: false, 
        whyWrong: "Mirai default scanners scan IoT default credentials." 
      }
    ],
    laymanExplanation: "Quality of Service (QoS) and Bandwidth Throttling prioritize critical work traffic (like VoIP calls and email) over heavy background downloads, preventing accidental 'friendly' bandwidth exhaustion!"
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

export default function DosMcq({ onBack }) {
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
            2.4 - Denial of Service Practice 🚫
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering DDoS & Botnets, Reflection & Amplification (DNS/NTP), Unintentional "Friendly" DoS (STP Switching Loops), Smokescreen Distractions, Asymmetric Threats, and QoS Throttling!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🚫
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
              ? '🌟 PERFECT SCORE! You have mastered 2.4 Denial of Service for CompTIA Security+!'
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
