import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "An attacker calls an administrative assistant claiming to be from the corporate IT helpdesk. The attacker throws around complex technical jargon regarding 'differential magnetometer failure' and requests the admin's login credentials to fix a system crash. Which attack technique is being demonstrated?",
    options: [
      { 
        text: "Impersonation using technical jargon & pretexting", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Watering Hole Attack", 
        isCorrect: false, 
        whyWrong: "Watering hole attacks involve compromising popular third-party websites visited by target users, not phone impersonation." 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web domain names, not phone calls." 
      },
      { 
        text: "Buffer Overflow", 
        isCorrect: false, 
        whyWrong: "Buffer overflow is a software programming exploit, not a human social engineering call." 
      }
    ],
    laymanExplanation: "Impersonation occurs when an attacker pretends to be someone trustworthy (like an IT helpdesk technician). They often use confusing technical terms or pretext stories to intimidate or fool victims into handing over passwords!"
  },
  {
    id: 2,
    question: "A receptionist receives a call from someone claiming to be the 'Office of the Executive Vice President'. The caller aggressively demands immediate access to sensitive payroll files, threatening the receptionist's job if they hesitate. Which psychological principle of impersonation is being exploited?",
    options: [
      { 
        text: "Authority & High-rank impersonation", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Consensus / Social Proof", 
        isCorrect: false, 
        whyWrong: "Consensus relies on showing that 'everyone else is doing it', whereas this attack exploits fear of high executive authority." 
      },
      { 
        text: "Scarcity", 
        isCorrect: false, 
        whyWrong: "Scarcity relies on limited-time offers or low quantity, not executive rank commands." 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting is URL domain misspelling." 
      }
    ],
    laymanExplanation: "Attackers often impersonate high-ranking executives (like Vice Presidents or CEOs) because employees are conditioned to respect authority and are reluctant to challenge a superior!"
  },
  {
    id: 3,
    question: "During a phone conversation, an attacker acts overly friendly ('be a buddy'), asking an employee about their favorite sports teams, hometown, and pet names. The employee casually reveals details without realizing they are answering security recovery questions. Which technique was used?",
    options: [
      { 
        text: "Eliciting information (Hacking the human)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SQL Injection", 
        isCorrect: false, 
        whyWrong: "SQL injection is a web database code exploit, not a psychological conversation tactic." 
      },
      { 
        text: "War Dialing", 
        isCorrect: false, 
        whyWrong: "War dialing is automated telephone port scanning to locate modems." 
      },
      { 
        text: "Cross-Site Scripting (XSS)", 
        isCorrect: false, 
        whyWrong: "XSS is a browser code execution vulnerability." 
      }
    ],
    laymanExplanation: "Eliciting information means subtly drawing secret information out of someone through normal, friendly conversation ('hacking the human') without ever asking for passwords directly!"
  },
  {
    id: 4,
    question: "An individual receives an urgent voicemail stating: 'This is an enforcement action executed by the US Treasury. Pay outstanding fines immediately via wire transfer to avoid arrest.' Which element of impersonation is being used?",
    options: [
      { 
        text: "Government agency pretexting & intimidation", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Supply chain attack", 
        isCorrect: false, 
        whyWrong: "Supply chain attacks target third-party vendors or manufacturing equipment." 
      },
      { 
        text: "Removable device vector", 
        isCorrect: false, 
        whyWrong: "Removable device vectors deal with physical USB flash drives." 
      },
      { 
        text: "Open service port scan", 
        isCorrect: false, 
        whyWrong: "Open service ports deal with network TCP/UDP listening services." 
      }
    ],
    laymanExplanation: "Pretexting with government impersonation (like pretending to be the IRS or Treasury) creates extreme panic and urgency, leading victims to make hasty financial decisions before verifying!"
  },
  {
    id: 5,
    question: "An attacker steals an individual's Social Security Number and full name from a data breach, then uses these details to fraudulently apply for government unemployment benefits and bank loans in the victim's name. Which threat is demonstrated?",
    options: [
      { 
        text: "Identity Fraud (Loan & Government benefits fraud)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Watering Hole Attack", 
        isCorrect: false, 
        whyWrong: "Watering hole attacks infect shared websites to target visitors." 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves misspelled website domains." 
      },
      { 
        text: "Agentless software vulnerability", 
        isCorrect: false, 
        whyWrong: "Agentless software vulnerabilities involve server-side application bugs." 
      }
    ],
    laymanExplanation: "Identity fraud occurs when someone steals your personal information (PII) to open credit cards, take out loans, or claim government benefits pretending to be you!"
  },
  {
    id: 6,
    question: "An employee receives a suspicious phone call from an unknown caller claiming to be an internal network administrator requesting their password. What is the BEST defense procedure to protect against impersonation?",
    options: [
      { 
        text: "Never disclose passwords and independently verify by calling back via an official company directory number", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Provide the password if the caller sounds friendly and knowledgeable", 
        isCorrect: false, 
        whyWrong: "Attackers often act friendly ('be a buddy') or knowledgeable to build fake trust." 
      },
      { 
        text: "Transfer the caller to another coworker without verifying", 
        isCorrect: false, 
        whyWrong: "Passing unverified callers to coworkers spreads the risk across the company." 
      },
      { 
        text: "Text the password to the caller's mobile number", 
        isCorrect: false, 
        whyWrong: "Corporate passwords should never be shared over unencrypted channels or to unverified third parties." 
      }
    ],
    laymanExplanation: "To protect against impersonation, never volunteer sensitive info! Always hang up and verify the caller's identity independently by calling back using an official, trusted phone directory number."
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

export default function ImpersonationMcq({ onBack }) {
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
            2.2 - Impersonation Exam Practice 🎭
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Pretexting, Authority Rank, Eliciting Information, Identity Fraud, and Defense Verification!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🎭
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
              ? '🌟 PERFECT SCORE! You have mastered 2.2 Impersonation for CompTIA Security+!'
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
