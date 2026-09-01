import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "In June 2017, a security researcher discovered 14 million Verizon customer records exposed on the internet because a third-party vendor left an Amazon S3 cloud storage repository publicly readable without authentication. What vulnerability caused this incident?",
    options: [
      { 
        text: "Open Permissions / Cloud Storage Misconfiguration", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs." 
      },
      { 
        text: "Buffer Overflow", 
        isCorrect: false, 
        whyWrong: "Buffer overflow involves memory buffer boundary bounds violations." 
      },
      { 
        text: "DLL Injection", 
        isCorrect: false, 
        whyWrong: "DLL injection involves injecting Windows library paths into target process memory." 
      }
    ],
    laymanExplanation: "The 2017 Verizon leak happened due to Open Permissions! Someone created a cloud database (AWS S3 bucket) and forgot to set the access permissions to private, allowing anyone on the internet to view 14 million records."
  },
  {
    id: 2,
    question: "To harden a Linux server against brute-force administrative attacks, a system administrator decides to disable direct SSH login for the `root` superuser account. How should legitimate sysadmins perform administrative commands?",
    options: [
      { 
        text: "Log in with a standard user account and use `sudo` for privilege escalation", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Use the factory default root password `admin`", 
        isCorrect: false, 
        whyWrong: "Default root passwords create severe security vulnerabilities." 
      },
      { 
        text: "Disable all firewall rules on the server", 
        isCorrect: false, 
        whyWrong: "Disabling firewalls exposes all open ports on the server." 
      },
      { 
        text: "Convert the SSH protocol to cleartext Telnet", 
        isCorrect: false, 
        whyWrong: "Telnet sends credentials in plain text over the network." 
      }
    ],
    laymanExplanation: "Direct root login is dangerous because hackers constantly target the username 'root'. Best practice is to disable direct root logins and make admins sign in as a regular user first, then run commands using `sudo`!"
  },
  {
    id: 3,
    question: "A security analyst runs a packet capture tool (like Wireshark) and views username and password strings being transmitted across the local network in plain cleartext. Which misconfiguration is causing this exposure?",
    options: [
      { 
        text: "Using insecure, unencrypted protocols (such as Telnet or FTP) instead of SSH or SFTP", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Enforcing WPA3 wireless encryption", 
        isCorrect: false, 
        whyWrong: "WPA3 encrypts wireless radio traffic and does not send plain text passwords." 
      },
      { 
        text: "Configuring multifactor authentication (MFA)", 
        isCorrect: false, 
        whyWrong: "MFA enhances authentication security." 
      },
      { 
        text: "Using parameterized SQL queries", 
        isCorrect: false, 
        whyWrong: "Parameterized queries prevent SQL injection, not cleartext network protocol traffic." 
      }
    ],
    laymanExplanation: "Insecure protocols like Telnet, FTP, HTTP, and IMAP send passwords over the wire in plain text! Anyone sniffing network traffic can read them. Always replace them with secure encrypted equivalents like SSH, SFTP, HTTPS, and IMAPS."
  },
  {
    id: 4,
    question: "The famous Mirai botnet compromised hundreds of thousands of IoT devices (IP cameras, home routers, smart doorbells) by automatically scanning the internet for which security flaw?",
    options: [
      { 
        text: "Factory default usernames and passwords (such as `admin/admin`) that were never changed", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Complex password expiration policies", 
        isCorrect: false, 
        whyWrong: "Password expiration policies encourage periodic password updates." 
      },
      { 
        text: "Disabling WPA3 wireless security", 
        isCorrect: false, 
        whyWrong: "Mirai targeted default credentials on listening management ports." 
      },
      { 
        text: "Using digital code signatures", 
        isCorrect: false, 
        whyWrong: "Digital signatures verify software integrity and prevent malware updates." 
      }
    ],
    laymanExplanation: "The Mirai botnet took over 60+ models of smart cameras and home routers because owners plugged them in and left the factory default logins (`admin/admin` or `root/xc3511`). Change default logins immediately!"
  },
  {
    id: 5,
    question: "During a network vulnerability scan, an auditor discovers unneeded management services listening on open ports across several public servers. What action should the sysadmin take to fix this misconfiguration?",
    options: [
      { 
        text: "Close unneeded open ports, disable unused services, and audit firewall rulesets", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Open all TCP ports from 1 to 65535 to improve network speed", 
        isCorrect: false, 
        whyWrong: "Opening all network ports maximizes the attack surface for hackers." 
      },
      { 
        text: "Disable operating system digital signature checks", 
        isCorrect: false, 
        whyWrong: "Disabling signature checks exposes systems to malware updates." 
      },
      { 
        text: "Revert all admin passwords to factory defaults", 
        isCorrect: false, 
        whyWrong: "Default passwords expose accounts to automated botnet logins." 
      }
    ],
    laymanExplanation: "If a server is running services you don't need, close those ports and disable the background services! Keeping unneeded ports open increases your attack surface for no benefit."
  },
  {
    id: 6,
    question: "An internal security audit discovers several domain administrator accounts configured with simple, easily guessable passwords like `123456`, `ninja`, or `football`. What category of vulnerability does this represent?",
    options: [
      { 
        text: "Unsecured Admin Accounts Misconfiguration", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Physical Tailgating", 
        isCorrect: false, 
        whyWrong: "Tailgating involves physically following an authorized employee into a building." 
      },
      { 
        text: "War Driving", 
        isCorrect: false, 
        whyWrong: "War driving involves searching for Wi-Fi networks in a vehicle." 
      },
      { 
        text: "Hardware EOL", 
        isCorrect: false, 
        whyWrong: "Hardware EOL involves manufacturer product discontinuation." 
      }
    ],
    laymanExplanation: "Unsecured Admin Accounts occur when superuser or administrator accounts are given weak, easy-to-guess passwords. Because admin accounts have full system rights, they must be protected with strong passwords and MFA!"
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

export default function MisconfigurationsMcq({ onBack }) {
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
            2.3 - Misconfiguration Vulnerabilities ⚙️
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Open S3 Permissions (Verizon 2017), Unsecured Admin Accounts (`sudo`), Insecure Cleartext Protocols (Telnet/FTP), Mirai Botnet Default Credentials, and Open Ports!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          ⚙️
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
              ? '🌟 PERFECT SCORE! You have mastered 2.3 Misconfiguration Vulnerabilities for CompTIA Security+!'
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
