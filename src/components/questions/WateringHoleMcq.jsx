import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "An attacker wants to breach a defense contractor whose internal network is heavily fortified and whose employees ignore phishing emails. The attacker discovers that employees frequently visit a local sandwich shop website and infects that site with malware. What attack strategy is being executed?",
    options: [
      { 
        text: "Watering Hole Attack", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web domains (like professormessor.com), not compromising legitimate third-party sites." 
      },
      { 
        text: "Smishing", 
        isCorrect: false, 
        whyWrong: "Smishing involves SMS text message phishing, not website compromise." 
      },
      { 
        text: "War Dialing", 
        isCorrect: false, 
        whyWrong: "War dialing involves automated telephone port scanning to locate modems." 
      }
    ],
    laymanExplanation: "A watering hole attack is inspired by predators in nature who wait near a water source where animals come to drink. Instead of attacking a secure building directly, the hacker infects a popular third-party website (like a local cafe site or industry blog) that target employees visit every day!"
  },
  {
    id: 2,
    question: "During a watering hole attack against a popular industry news website, the malicious code inspects every visitor's IP address and only delivers the exploit payload if the IP matches a specific financial institution. Why does the attacker use IP filtering?",
    options: [
      { 
        text: "To selectively target specific organization victims while hiding the attack from general visitors and security researchers", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "To speed up the website's database queries", 
        isCorrect: false, 
        whyWrong: "IP filtering is a stealth evasion technique, not a database performance optimization." 
      },
      { 
        text: "To encrypt the target's hard drive automatically", 
        isCorrect: false, 
        whyWrong: "IP filtering determines which target gets the payload; it is not an encryption algorithm." 
      },
      { 
        text: "To bypass physical USB port security", 
        isCorrect: false, 
        whyWrong: "Watering hole attacks execute over web browsers, not physical USB hardware interfaces." 
      }
    ],
    laymanExplanation: "Attackers use IP address filtering in watering hole attacks so that ordinary website visitors don't get infected, preventing security researchers from quickly noticing the trap!"
  },
  {
    id: 3,
    question: "In January 2017, attackers compromised the website of the Polish Financial Supervision Authority. Visitors from specific banks were secretly served malicious JavaScript files. Which attack vector was demonstrated?",
    options: [
      { 
        text: "Watering Hole Attack", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Business Email Compromise (BEC)", 
        isCorrect: false, 
        whyWrong: "BEC relies on executive email wire fraud, whereas this attack poisoned a public web portal." 
      },
      { 
        text: "Vishing", 
        isCorrect: false, 
        whyWrong: "Vishing is voice phishing conducted over phone calls." 
      },
      { 
        text: "Default credentials attack", 
        isCorrect: false, 
        whyWrong: "Default credentials rely on factory passwords on routers or access points." 
      }
    ],
    laymanExplanation: "The 2017 Polish financial attack was a classic watering hole attack! The hackers poisoned a trusted government financial portal knowing that banking workers across the nation would visit the site."
  },
  {
    id: 4,
    question: "How does a watering hole attack differ from a traditional email phishing attack?",
    options: [
      { 
        text: "A watering hole attack does not send emails to victims; instead, it waits for victims to visit an infected third-party website", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A watering hole attack only targets smartphones over SMS text messages", 
        isCorrect: false, 
        whyWrong: "SMS text phishing is called Smishing, not watering hole attacks." 
      },
      { 
        text: "A watering hole attack requires plugging a USB flash drive into a server", 
        isCorrect: false, 
        whyWrong: "USB hardware insertion is a removable media vector." 
      },
      { 
        text: "A watering hole attack only uses phone calls to elicit passwords", 
        isCorrect: false, 
        whyWrong: "Phone phishing is called Vishing." 
      }
    ],
    laymanExplanation: "Phishing sends active messages (emails/texts) directly to victims trying to lure them in. A watering hole attack is passive—it poisons a place the victim already visits on their own!"
  },
  {
    id: 5,
    question: "An organization wants to protect its employees from watering hole attacks on third-party websites. Which combination of layered defenses (Defense-in-Depth) provides effective protection?",
    options: [
      { 
        text: "Firewalls, Intrusion Prevention Systems (IPS), and updated Anti-virus/Anti-malware signature rules", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disabling WPA3 wireless encryption", 
        isCorrect: false, 
        whyWrong: "Disabling wireless encryption weakens network security and does not block malicious website scripts." 
      },
      { 
        text: "Using default admin credentials on routers", 
        isCorrect: false, 
        whyWrong: "Using default credentials leaves network devices completely exposed to attackers." 
      },
      { 
        text: "Allowing all incoming TCP/UDP open service ports", 
        isCorrect: false, 
        whyWrong: "Allowing open service ports expands the attack surface." 
      }
    ],
    laymanExplanation: "Defending against watering hole attacks requires Defense-in-Depth (layered defense)! Firewalls and IPS block suspicious network traffic, while updated antivirus software recognizes known malicious script signatures when a user visits an infected page."
  },
  {
    id: 6,
    question: "An attacker targets a team of specialized aerospace engineers. Which website is the attacker MOST likely to select as a watering hole?",
    options: [
      { 
        text: "A niche aerospace engineering news blog frequently read by the target engineers", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A random fashion shopping site in another country", 
        isCorrect: false, 
        whyWrong: "Target engineers are unlikely to visit an unrelated fashion site, rendering the watering hole ineffective." 
      },
      { 
        text: "The attacker's own personal blog", 
        isCorrect: false, 
        whyWrong: "Target victims would have no reason to visit a stranger's blog." 
      },
      { 
        text: "An internal corporate intranet page with zero external access", 
        isCorrect: false, 
        whyWrong: "Intranet pages are hosted inside the company and cannot be poisoned from the public internet without prior access." 
      }
    ],
    laymanExplanation: "Watering hole attacks require research! Attackers research which specific websites their target victims visit regularly (like an industry-specific trade journal or local cafe menu site) so the trap actually catches the intended targets."
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

export default function WateringHoleMcq({ onBack }) {
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
            <span>CompTIA Security+ SY0-701 • Section 2.2</span>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight">
            2.2 - Watering Hole Attacks Practice 🌊
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Third-Party Site Poisoning, IP Address Filtering Evasion, 2017 Polish Financial Attack Case Study, and Defense-in-Depth (IPS/Antivirus)!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🌊
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
              ? '🌟 PERFECT SCORE! You have mastered 2.2 Watering Hole Attacks for CompTIA Security+!'
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
