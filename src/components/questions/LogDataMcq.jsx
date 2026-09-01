import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "A security analyst reviews detailed records showing blocked and allowed traffic flows, exploit attempts, blocked URL categories, and DNS sinkhole traffic redirections. These records provide a complete summary of every network attack attempt and correlate with other monitoring sources. What type of log data is being examined?",
    options: [
      { 
        text: "Security Log Files", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SQL Injection", 
        isCorrect: false, 
        whyWrong: "SQL injection is a web database attack technique, not a type of log data." 
      },
      { 
        text: "Typosquatting", 
        isCorrect: false, 
        whyWrong: "Typosquatting involves registering misspelled web URLs to trick visitors." 
      },
      { 
        text: "RF Jamming", 
        isCorrect: false, 
        whyWrong: "RF Jamming floods radio frequencies with noise to disrupt wireless communications." 
      }
    ],
    laymanExplanation: "Security Log Files are like a detailed security camera journal! They record every allowed and blocked connection, every exploit attempt, every suspicious URL visited, and every DNS sinkhole redirect — giving you a complete picture of attack activity."
  },
  {
    id: 2,
    question: "A Next-Generation Firewall (NGFW) records source/destination IP addresses, port numbers, the specific application being used (e.g., Zoom vs Skype), URL filtering categories, and anomalous traffic patterns. Meanwhile, the integrated IPS/IDS module logs timestamps, attack type classifications, and known OS vulnerability signatures. What log sources provide this data?",
    options: [
      { 
        text: "Firewall Logs and IPS/IDS Logs", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Cleartext Telnet protocol", 
        isCorrect: false, 
        whyWrong: "Telnet transmits unencrypted text over network wires on port 23." 
      },
      { 
        text: "Disabling WPA3 wireless encryption", 
        isCorrect: false, 
        whyWrong: "Disabling WPA3 removes wireless network protection from access points." 
      },
      { 
        text: "Layer 2 Switching Loop", 
        isCorrect: false, 
        whyWrong: "Switching loops occur on ethernet switches without Spanning Tree Protocol." 
      }
    ],
    laymanExplanation: "Firewall Logs record who's knocking on your network door (source/destination IPs, ports, apps). IPS/IDS Logs are the alarm system records — they log timestamps, attack types, and known vulnerability signatures for every suspicious event detected."
  },
  {
    id: 3,
    question: "An organization's SIEM collects data from Windows Event Viewer Application Logs on workstations and /var/log entries from Linux servers. The endpoint logs contain logon events, policy changes, system events, process executions, account management changes, and directory service activities. What log categories feed into the SIEM?",
    options: [
      { 
        text: "Application Logs and Endpoint Logs", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Vishing phone call attack", 
        isCorrect: false, 
        whyWrong: "Vishing involves phone call voice phishing to steal personal information." 
      },
      { 
        text: "HVAC thermal shutdown", 
        isCorrect: false, 
        whyWrong: "HVAC thermal shutdown turns off data center air conditioning systems." 
      },
      { 
        text: "Deauthentication flood attack", 
        isCorrect: false, 
        whyWrong: "Deauth floods disconnect Wi-Fi clients from wireless access points." 
      }
    ],
    laymanExplanation: "Application Logs are diary entries from each program (Windows uses Event Viewer, Linux uses /var/log). Endpoint Logs capture EVERYTHING happening on each device — logins, policy changes, new processes, account changes — and everything rolls up to the SIEM for correlation!"
  },
  {
    id: 4,
    question: "A security team monitors OS-specific security logs detecting brute force login attempts, unauthorized file changes, authentication failures, and disabled services. Simultaneously, network logs from switches, routers, access points, and VPN concentrators show routing updates, authentication issues, and network security anomalies. What two log categories are being monitored?",
    options: [
      { 
        text: "OS-specific Security Logs and Network Infrastructure Logs", 
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
        whyWrong: "Typosquatting involves registering misspelled web URLs to impersonate legitimate sites." 
      }
    ],
    laymanExplanation: "OS Security Logs catch problems ON the computer itself — failed logins, changed files, disabled antivirus. Network Logs catch problems on the ROAD between computers — switches, routers, VPNs, and access points reporting routing changes and authentication issues."
  },
  {
    id: 5,
    question: "During a forensic investigation, an analyst examines email header details (sending servers, destination addresses), mobile device metadata (phone type, GPS coordinates), web session metadata (browser type, OS, IP address), and file metadata (embedded names, addresses, phone numbers). What type of data is being analyzed?",
    options: [
      { 
        text: "Metadata (data that describes other data sources)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Increasing gigabit switch latency", 
        isCorrect: false, 
        whyWrong: "Gigabit switch latency is a network timing metric unrelated to forensic metadata analysis." 
      },
      { 
        text: "Disabling WPA3 enterprise encryption", 
        isCorrect: false, 
        whyWrong: "Disabling WPA3 affects Wi-Fi security, not metadata analysis." 
      },
      { 
        text: "Forcing CPU thermal throttling", 
        isCorrect: false, 
        whyWrong: "Thermal throttling is a hardware heat response, not a type of forensic data." 
      }
    ],
    laymanExplanation: "Metadata is 'data about data' — like the envelope information on a letter! Email metadata shows who sent it and which servers it passed through. Phone metadata shows GPS location. Web metadata shows your browser and IP. File metadata can contain hidden names and phone numbers."
  },
  {
    id: 6,
    question: "A SOC team uses their SIEM's built-in report generator to create automated weekly security summaries. For real-time situational awareness, they configure customizable dashboards showing the most important data at a glance. When investigating a complex application issue, an analyst captures raw network packets to identify unknown traffic and verify packet filtering rules. What three monitoring tools are described?",
    options: [
      { 
        text: "Automated Reports, Dashboards, and Packet Captures", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Telnet cleartext session", 
        isCorrect: false, 
        whyWrong: "Telnet transmits unencrypted cleartext data over port 23." 
      },
      { 
        text: "Disinformation campaign", 
        isCorrect: false, 
        whyWrong: "Disinformation campaigns spread false propaganda on social media." 
      },
      { 
        text: "RF Jamming", 
        isCorrect: false, 
        whyWrong: "RF Jamming floods radio spectrum frequencies with noise to disrupt communications." 
      }
    ],
    laymanExplanation: "Three monitoring power tools! Automated Reports = scheduled summary documents (needs human review). Dashboards = real-time status screens showing the most important data at a glance (not for deep dives). Packet Captures = recording actual network traffic to solve complex problems and identify mystery connections."
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

export default function LogDataMcq({ onBack }) {
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
      <div class="bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-amber-200/50 flex items-center justify-between gap-4">
        <div>
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md mb-2">
            <span>CompTIA Security+ SY0-701 • Section 4.8</span>
          </div>
          <h1 class="text-3xl font-extrabold tracking-tight">
            4.8 - Log Data Practice 📝
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            CompTIA Security+ scenario questions covering Security Logs, Firewall/IPS Logs, Endpoint Logs, OS Security Logs, Metadata, Automated Reports, Dashboards, and Packet Captures!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          📝
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
              ? '🌟 PERFECT SCORE! You have mastered 4.8 Log Data for CompTIA Security+!'
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
