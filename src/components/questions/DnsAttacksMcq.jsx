import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "An employee enters 'http://intranet.company.com' into their browser, but is immediately redirected to a malicious phishing site. A security audit shows the corporate DNS server is functioning normally, but local malware edited the workstation's local 'hosts' file. Why did the browser connect to the malicious site?",
    options: [
      { 
        text: "Operating systems check the local 'hosts' file before querying network DNS servers", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The local 'hosts' file disables WPA3 Wi-Fi encryption", 
        isCorrect: false, 
        whyWrong: "The hosts file maps domain names to IP addresses, it has nothing to do with Wi-Fi WPA3." 
      },
      { 
        text: "The 'hosts' file executes macro VBA scripts in RAM", 
        isCorrect: false, 
        whyWrong: "Macro scripts run in Microsoft Office documents." 
      },
      { 
        text: "War driving modified the switch port MAC address", 
        isCorrect: false, 
        whyWrong: "War driving scans wireless access points." 
      }
    ],
    laymanExplanation: "The operating system ALWAYS checks its local `hosts` file first before asking a DNS server! If malware secretly inserts a fake IP mapping into your `hosts` file, your computer immediately goes to the hacker's site without ever contacting DNS."
  },
  {
    id: 2,
    question: "In October 2016, attackers compromised the administrative domain registrar account of a major Brazilian bank. Without modifying any of the bank's actual web servers, the hackers updated all 36 domain registrations to point to malicious servers for 6 hours. What attack took place?",
    options: [
      { 
        text: "Domain Hijacking", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Adware popup flooding", 
        isCorrect: false, 
        whyWrong: "Adware displays advertising popups in web browsers." 
      },
      { 
        text: "Vishing", 
        isCorrect: false, 
        whyWrong: "Vishing involves phone call voice phishing." 
      },
      { 
        text: "Buffer Overflow", 
        isCorrect: false, 
        whyWrong: "Buffer overflows involve memory allocation bounds checking." 
      }
    ],
    laymanExplanation: "Domain Hijacking happens when a hacker gets into your domain registrar account (like GoDaddy or Namecheap) and changes where your domain name points! They don't even need to hack your web server—they just steal your domain registration."
  },
  {
    id: 3,
    question: "An attacker intercepts DNS lookup requests sent over an unencrypted connection and injects forged DNS response records into a recursive resolver's memory cache. All subsequent network users querying that domain are sent to the attacker's server. What attack occurred?",
    options: [
      { 
        text: "DNS Cache Poisoning / Spoofing", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Smishing", 
        isCorrect: false, 
        whyWrong: "Smishing involves SMS text message phishing." 
      },
      { 
        text: "UPS battery discharge", 
        isCorrect: false, 
        whyWrong: "UPS battery discharge involves electrical power backups." 
      },
      { 
        text: "Disinformation campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation involves social media fake news campaigns." 
      }
    ],
    laymanExplanation: "DNS Cache Poisoning trick DNS servers into saving fake IP maps! The attacker injects a lie into the DNS server's cache, so whenever anyone asks 'Where is mybank.com?', the DNS server hands out the hacker's IP address."
  },
  {
    id: 4,
    question: "A threat actor registers domains such as 'professormessor.com' (misspelling), 'professormeser.com' (typing error), and 'professormesser.org' (different TLD) to lure users who mistype web addresses into downloading drive-by malware. What attack category is this?",
    options: [
      { 
        text: "Typosquatting / URL Hijacking", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SQL Injection", 
        isCorrect: false, 
        whyWrong: "SQL injection targets web application databases." 
      },
      { 
        text: "Fileless RAM Virus", 
        isCorrect: false, 
        whyWrong: "Fileless viruses run exclusively in volatile memory." 
      },
      { 
        text: "HVAC sensor sabotage", 
        isCorrect: false, 
        whyWrong: "HVAC sensor sabotage targets room temperature controls." 
      }
    ],
    laymanExplanation: "Typosquatting (URL Hijacking) profits from your typos! Hackers buy domain names that look almost identical to popular websites (e.g. `goggle.com`) so when you make a typo, you end up on their fake site."
  },
  {
    id: 5,
    question: "Which cryptographic extension secures DNS lookups by attaching digital signatures to DNS records, allowing client resolvers to verify that DNS responses come from legitimate authoritative servers and have not been poisoned?",
    options: [
      { 
        text: "DNSSEC (Domain Name System Security Extensions)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Telnet cleartext protocol", 
        isCorrect: false, 
        whyWrong: "Telnet is an unencrypted network management protocol." 
      },
      { 
        text: "WPA3 passphrase disablement", 
        isCorrect: false, 
        whyWrong: "Disabling WPA3 weakens wireless security." 
      },
      { 
        text: "HTML entity encoding", 
        isCorrect: false, 
        whyWrong: "HTML entity encoding prevents XSS web vulnerabilities." 
      }
    ],
    laymanExplanation: "DNSSEC adds cryptographic digital signatures to DNS lookups! When your computer receives a DNS response, DNSSEC checks the signature to make sure the answer is real and wasn't tampered with by a hacker."
  },
  {
    id: 6,
    question: "An enterprise wants to prevent domain hijacking attacks against its primary web domains. Which administrative security controls provide the strongest defense for domain registrar accounts?",
    options: [
      { 
        text: "Enforce Multi-Factor Authentication (MFA), Registrar Locks, and dedicated administrative email security", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Disable Spanning Tree Protocol (STP)", 
        isCorrect: false, 
        whyWrong: "Disabling STP creates Layer 2 network switching loops." 
      },
      { 
        text: "Use default admin credentials on all switches", 
        isCorrect: false, 
        whyWrong: "Default admin credentials expose network hardware to automated botnet logins." 
      },
      { 
        text: "Allow cleartext Telnet access for domain admins", 
        isCorrect: false, 
        whyWrong: "Cleartext Telnet exposes login credentials on network wires." 
      }
    ],
    laymanExplanation: "To protect domain registrar accounts from domain hijacking: enable Multi-Factor Authentication (MFA), lock your domain registration (Registrar Lock), and tightly secure the email address managing the registrar account!"
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

export default function DnsAttacksMcq({ onBack }) {
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
            2.4 - DNS Attacks Practice 🌐
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Local 'hosts' File Poisoning, Domain Hijacking (Brazilian Bank 2016 Case Study), DNS Cache Poisoning, Typosquatting / URL Hijacking, DNSSEC, and Registrar Protection!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🌐
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
              ? '🌟 PERFECT SCORE! You have mastered 2.4 DNS Attacks for CompTIA Security+!'
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
