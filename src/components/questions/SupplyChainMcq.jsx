import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "In 2013, attackers compromised an external HVAC contractor via phishing to steal VPN credentials, allowing them to pivot into Target's corporate network and steal 40 million credit card records. What vulnerability was exploited to gain initial access?",
    options: [
      { 
        text: "Third-Party Service Provider / Supply Chain Risk", 
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
        text: "War Dialing", 
        isCorrect: false, 
        whyWrong: "War dialing involves scanning telephone modem lines." 
      }
    ],
    laymanExplanation: "The 2013 Target breach is a classic example of Supply Chain / Third-Party Vendor risk! Hackers couldn't hack Target directly, so they hacked Target's heating & AC contractor to steal their VPN login and walk right through the front door."
  },
  {
    id: 2,
    question: "In the 2020 SolarWinds Orion breach, attackers compromised the vendor's internal build pipeline to inject backdoor code into legitimate, digitally signed software updates distributed to 18,000 customers. What type of attack is this?",
    options: [
      { 
        text: "Software Supply Chain Attack (Malicious Build Pipeline Update)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Watering Hole Attack", 
        isCorrect: false, 
        whyWrong: "Watering hole attacks involve poisoning public websites visited by specific target groups." 
      },
      { 
        text: "Smishing", 
        isCorrect: false, 
        whyWrong: "Smishing involves SMS text message phishing." 
      },
      { 
        text: "Disinformation Campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation campaigns involve spreading fake news on social media." 
      }
    ],
    laymanExplanation: "In a Software Supply Chain attack like SolarWinds, hackers infect the software company's development pipeline. When customers download official, signed updates, they unknowingly install Trojan backdoors directly onto their networks!"
  },
  {
    id: 3,
    question: "In July 2022, federal authorities arrested a reseller for selling over $1 billion in counterfeit network routers and switches. What cybersecurity risk does counterfeit hardware introduce into an organization?",
    options: [
      { 
        text: "Counterfeit hardware may contain unauthorized backdoors, unverified microcode, and hardware instability", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Counterfeit hardware automatically upgrades all Wi-Fi to WPA3", 
        isCorrect: false, 
        whyWrong: "Fake hardware degrades security and stability; it does not upgrade wireless encryption." 
      },
      { 
        text: "Counterfeit hardware prevents SQL injection on backend web servers", 
        isCorrect: false, 
        whyWrong: "Fake hardware switches do not sanitize web application database inputs." 
      },
      { 
        text: "Counterfeit hardware enforces strict password complexity rules", 
        isCorrect: false, 
        whyWrong: "Fake hardware does not enforce domain password policy settings." 
      }
    ],
    laymanExplanation: "Counterfeit network hardware (fake switches or routers) can contain secret backdoor chips, unverified modified firmware, or components that catch on fire, putting your network infrastructure at severe risk!"
  },
  {
    id: 4,
    question: "An enterprise wants to manage third-party service provider risks for external cloud, accounting, and maintenance vendors. Which requirement should be formally included in all third-party vendor contracts?",
    options: [
      { 
        text: "Mandatory ongoing third-party security audits and compliance reviews", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Granting vendors unrestricted root access to all internal servers", 
        isCorrect: false, 
        whyWrong: "Granting unrestricted root access violates the principle of least privilege." 
      },
      { 
        text: "Disabling firewall logging for vendor VPN connections", 
        isCorrect: false, 
        whyWrong: "Disabling firewall logging destroys audit trails needed for incident response." 
      },
      { 
        text: "Allowing vendors to use shared default passwords", 
        isCorrect: false, 
        whyWrong: "Shared default passwords expose systems to unauthorized access." 
      }
    ],
    laymanExplanation: "To protect your organization against vendor supply chain breaches, vendor contracts must mandate regular third-party security audits and proof of compliance before granting them access to your network!"
  },
  {
    id: 5,
    question: "Which hardware purchasing strategy helps an organization maintain tighter control over hardware supply chain security when sourcing new servers and firewalls?",
    options: [
      { 
        text: "Consolidating to a small, strictly vetted supplier base", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Buying hardware from unverified discount auction websites", 
        isCorrect: false, 
        whyWrong: "Unverified auction sites dramatically increase the risk of purchasing counterfeit or tampered hardware." 
      },
      { 
        text: "Disabling digital signature verification on all imported firmware", 
        isCorrect: false, 
        whyWrong: "Disabling signature checks allows unverified or malicious firmware to execute." 
      },
      { 
        text: "Allowing employees to purchase custom routers with personal credit cards", 
        isCorrect: false, 
        whyWrong: "Unregulated personal purchasing creates Shadow IT and untracked supply chain risks." 
      }
    ],
    laymanExplanation: "Using a small, trusted supplier base allows security teams to rigorously vet distributors, inspect hardware integrity, and ensure products come directly from authorized original equipment manufacturers (OEM)!"
  },
  {
    id: 6,
    question: "Why are Managed Service Providers (MSPs) frequently targeted by cybercriminals in supply chain attacks?",
    options: [
      { 
        text: "MSPs possess elevated administrative access into many client networks, allowing one breach to compromise hundreds of businesses simultaneously", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "MSPs do not use operating systems", 
        isCorrect: false, 
        whyWrong: "MSPs run standard enterprise operating systems and remote management software." 
      },
      { 
        text: "MSPs only operate over analog telephone modems", 
        isCorrect: false, 
        whyWrong: "MSPs use modern internet protocols and cloud monitoring tools." 
      },
      { 
        text: "MSPs are immune to malware", 
        isCorrect: false, 
        whyWrong: "No organization or service provider is immune to malware attacks." 
      }
    ],
    laymanExplanation: "Managed Service Providers (MSPs) manage IT systems for dozens or hundreds of companies. If a hacker breaches an MSP's central management console, they instantly get master access to ALL of the MSP's clients!"
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

export default function SupplyChainMcq({ onBack }) {
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
            2.3 - Supply Chain Vulnerabilities 🚚
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Target HVAC Vendor Breach (2013), SolarWinds Orion Breach (2020), Counterfeit Cisco Hardware, Contract Security Audits, Vetted Suppliers, and MSP Pivots!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🚚
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
              ? '🌟 PERFECT SCORE! You have mastered 2.3 Supply Chain Vulnerabilities for CompTIA Security+!'
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
