import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "An employee receives an email claiming to be an urgent cryptocurrency invoice. Clicking the link downloads an executable payload. Which common threat vector is being utilized?",
    options: [
      { 
        text: "Message-based vector (Email Phishing / Social Engineering)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Voice call vector (Vishing)", 
        isCorrect: false, 
        whyWrong: "Voice call vectors involve phone conversations or automated voice calls, not email messages with links." 
      },
      { 
        text: "Removable device vector", 
        isCorrect: false, 
        whyWrong: "Removable device vectors involve physical media like USB drives plugged into hardware ports." 
      },
      { 
        text: "Supply chain vector", 
        isCorrect: false, 
        whyWrong: "Supply chain vectors target third-party vendors, suppliers, or manufacturing processes." 
      }
    ],
    laymanExplanation: "Message-based vectors use emails, text messages, or instant messaging to trick people into clicking malicious links or opening dangerous attachments. Attackers rely on social engineering tricks like fake invoice scams or crypto offers!"
  },
  {
    id: 2,
    question: "A web application developer uploads an SVG image (.svg) to a company portal. When users view the image, embedded XML containing JavaScript executes in their browser and steals session tokens. Which threat vector is responsible?",
    options: [
      { 
        text: "Image-based vector (SVG / XML script injection)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "File-based vector (Word Macro)", 
        isCorrect: false, 
        whyWrong: "Word Document Macros run inside Microsoft Word applications, whereas SVG is an XML graphic format parsed directly by web browsers." 
      },
      { 
        text: "Unsupported systems vector", 
        isCorrect: false, 
        whyWrong: "Unsupported systems vectors deal with outdated operating systems past End-of-Life, not web browser graphic parsing." 
      },
      { 
        text: "Default credentials vector", 
        isCorrect: false, 
        whyWrong: "Default credentials involve factory passwords on devices, not XML image file scripts." 
      }
    ],
    laymanExplanation: "SVG files aren't regular picture pixels; they are written in XML code text. Attackers can hide malicious JavaScript code inside SVG image files so that when a user's web browser displays the logo, it secretly executes the attacker's script!"
  },
  {
    id: 3,
    question: "An attacker sends a compressed ZIP archive containing a PDF file and a macro-enabled Excel document. When the victim extracts and opens the file, background macros execute ransomware. Which threat vector was exploited?",
    options: [
      { 
        text: "File-based vector (ZIP / PDF / Office Macros)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Unsecure network vector", 
        isCorrect: false, 
        whyWrong: "Unsecure network vectors involve weak Wi-Fi or unauthenticated Ethernet ports, not email file attachments." 
      },
      { 
        text: "Open service ports vector", 
        isCorrect: false, 
        whyWrong: "Open ports involve listening network services on TCP/UDP, not compressed document files." 
      },
      { 
        text: "Voice call vector", 
        isCorrect: false, 
        whyWrong: "Voice call vectors involve phone conversations, not file attachments." 
      }
    ],
    laymanExplanation: "File-based vectors hide malicious code inside everyday files like PDFs, ZIP archives, or Microsoft Office documents with macros. When the user opens the file and enables content, the hidden macro script downloads and runs ransomware."
  },
  {
    id: 4,
    question: "A cybercriminal uses automated war dialing and Voice over IP (VoIP) spam to call thousands of bank customers, impersonating fraud prevention officers to elicit PIN codes over the phone. Which threat vector is being used?",
    options: [
      { 
        text: "Voice call vector (Vishing / Spam over IP)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Message-based vector (Smishing)", 
        isCorrect: false, 
        whyWrong: "Smishing uses SMS text messages, whereas vishing uses live or automated phone calls." 
      },
      { 
        text: "Image-based vector", 
        isCorrect: false, 
        whyWrong: "Image-based vectors involve graphic file formats like SVG, not phone calls." 
      },
      { 
        text: "Supply chain vector", 
        isCorrect: false, 
        whyWrong: "Supply chain vectors target third-party vendors or equipment manufacturers." 
      }
    ],
    laymanExplanation: "Voice call vectors (vishing) use phone calls, VoIP spam, and war dialing to impersonate trusted authorities over the phone. The attacker uses human conversation to trick victims into revealing sensitive PINs or passwords!"
  },
  {
    id: 5,
    question: "A high-security facility uses an air-gapped network with zero internet connectivity. A malicious insider plugs a specialized USB drive into a workstation. The drive emulates a keyboard ('hacker on a chip') to exfiltrate gigabytes of classified files without generating network traffic. Which threat vector is demonstrated?",
    options: [
      { 
        text: "Removable device vector (USB Rubber Ducky / Air-gap breach)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Unsecure network vector", 
        isCorrect: false, 
        whyWrong: "Air-gapped networks have no network connections, so network-based vectors cannot be used." 
      },
      { 
        text: "Vulnerable software vector", 
        isCorrect: false, 
        whyWrong: "Vulnerable software vectors rely on application bugs or unpatched client software, not physical hardware insertion." 
      },
      { 
        text: "Default credentials vector", 
        isCorrect: false, 
        whyWrong: "Default credentials involve factory passwords like admin/admin, not physical USB keystroke injection." 
      }
    ],
    laymanExplanation: "Removable device vectors get around network firewalls completely because the malware travels physically inside a USB flash drive! Specialized USB devices can emulate keyboards to type automated commands ('hacker on a chip') and exfiltrate data directly to physical media with zero network bandwidth used!"
  },
  {
    id: 6,
    question: "An organization uses an web-based accounting platform where no executable is installed on employee laptops; instead, clients connect to a central web server. An attacker compromises the central server software, immediately affecting all connected users. Which threat vector is illustrated?",
    options: [
      { 
        text: "Vulnerable software vector (Agentless server-side compromise)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Removable device vector", 
        isCorrect: false, 
        whyWrong: "Removable device vectors involve physical hardware like USB flash drives." 
      },
      { 
        text: "Voice call vector", 
        isCorrect: false, 
        whyWrong: "Voice call vectors involve phone calls (vishing)." 
      },
      { 
        text: "Image-based vector", 
        isCorrect: false, 
        whyWrong: "Image-based vectors involve SVG/XML graphic files." 
      }
    ],
    laymanExplanation: "Agentless software vectors mean no software is installed locally on the user's client machine. If an attacker compromises the central server application, every user who connects instantly gets affected!"
  },
  {
    id: 7,
    question: "A legacy Windows machine running Windows XP controls a critical medical imaging scanner. Because the vendor no longer provides security patches (End-of-Service Life), an attacker uses an unpatched kernel exploit to breach the system. Which threat vector was exploited?",
    options: [
      { 
        text: "Unsupported systems vector (Outdated EOL operating system)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Supply chain vector", 
        isCorrect: false, 
        whyWrong: "Supply chain vectors involve third-party vendors or counterfeit hardware, not unpatched legacy operating systems." 
      },
      { 
        text: "Default credentials vector", 
        isCorrect: false, 
        whyWrong: "Default credentials deal with unchanged factory passwords, not unpatched system vulnerabilities." 
      },
      { 
        text: "Voice call vector", 
        isCorrect: false, 
        whyWrong: "Voice call vectors deal with phone phishing (vishing)." 
      }
    ],
    laymanExplanation: "Unsupported systems vectors occur when operating systems reach End-of-Life (EOL) or End-of-Service Life (EOSL). Once the manufacturer stops releasing security patches, any newly discovered vulnerabilities remain open forever, creating an easy entry point for hackers!"
  },
  {
    id: 8,
    question: "A intruder walks into an office building and plugs their laptop into an empty wall Ethernet port in the conference room. Because the network switch lacks 802.1X port authentication, the intruder immediately gains access to the internal network. Which threat vector was exploited?",
    options: [
      { 
        text: "Unsecure network vector (Wired port without 802.1X authentication)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Open service ports vector", 
        isCorrect: false, 
        whyWrong: "Open service ports deal with listening TCP/UDP software applications, not physical Ethernet switch port authentication." 
      },
      { 
        text: "Removable device vector", 
        isCorrect: false, 
        whyWrong: "Removable device vectors deal with USB flash drives, not network Ethernet cables." 
      },
      { 
        text: "Message-based vector", 
        isCorrect: false, 
        whyWrong: "Message-based vectors involve emails or instant messaging." 
      }
    ],
    laymanExplanation: "Unsecure network vectors happen when network physical connections or wireless access points lack authentication or modern encryption. If wired Ethernet ports don't enforce 802.1X port security, anyone can plug in a cable and join your private network!"
  },
  {
    id: 9,
    question: "A company deploys a new server and leaves port 3389 (Remote Desktop Protocol) and port 23 (Telnet) open to the public internet. An attacker scans the IP address, discovers the listening ports, and launches a brute-force attack. Which threat vector expanded the attack surface?",
    options: [
      { 
        text: "Open service ports vector", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Image-based vector", 
        isCorrect: false, 
        whyWrong: "Image-based vectors involve SVG/XML graphic files." 
      },
      { 
        text: "Voice call vector", 
        isCorrect: false, 
        whyWrong: "Voice call vectors involve phone phishing (vishing)." 
      },
      { 
        text: "Supply chain vector", 
        isCorrect: false, 
        whyWrong: "Supply chain vectors deal with third-party vendors or manufactured hardware." 
      }
    ],
    laymanExplanation: "Every open service port (TCP/UDP) on a server is like an open door or window facing the street. The more open ports you have listening on the internet, the larger your attack surface becomes for hackers to probe!"
  },
  {
    id: 10,
    question: "A small business installs a new wireless router but forgets to change the factory password. An attacker connects to the router's management page, types 'admin/admin', and gains full administrator control. Which threat vector was exploited?",
    options: [
      { 
        text: "Default credentials vector", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Unsupported systems vector", 
        isCorrect: false, 
        whyWrong: "Unsupported systems vectors deal with outdated software past End-of-Life, not factory default passwords." 
      },
      { 
        text: "Image-based vector", 
        isCorrect: false, 
        whyWrong: "Image-based vectors deal with SVG XML images." 
      },
      { 
        text: "Vulnerable software vector", 
        isCorrect: false, 
        whyWrong: "Vulnerable software vectors deal with software code bugs, not unconfigured passwords." 
      }
    ],
    laymanExplanation: "Most network equipment arrives from the factory with standard passwords (like 'admin' / 'admin' or '1234'). If you don't change default credentials immediately, hackers can look up the default password online in seconds and take full administrative control!"
  },
  {
    id: 11,
    question: "In the famous 2013 Target data breach, attackers breached Target's corporate network by stealing network login credentials from a third-party Heating, Ventilation, and Air Conditioning (HVAC) vendor. Which threat vector was exploited?",
    options: [
      { 
        text: "Supply chain vector (Managed Service Providers / Third-Party Vendor)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Removable device vector", 
        isCorrect: false, 
        whyWrong: "Removable device vectors involve physical USB drives inserted into local workstations." 
      },
      { 
        text: "Voice call vector", 
        isCorrect: false, 
        whyWrong: "Voice call vectors involve phone phishing (vishing)." 
      },
      { 
        text: "Image-based vector", 
        isCorrect: false, 
        whyWrong: "Image-based vectors involve SVG XML images." 
      }
    ],
    laymanExplanation: "Supply chain vectors exploit trust between an enterprise and its third-party suppliers or vendors (such as HVAC contractors or Managed Service Providers). Hackers breach the smaller vendor first, then use the vendor's trusted access pipe to break into the main enterprise target!"
  },
  {
    id: 12,
    question: "An enterprise purchases network switches from an unauthorized online supplier. The switches turn out to be counterfeit hardware loaded with malicious backdoors built into the firmware during manufacturing. Which threat vector is described?",
    options: [
      { 
        text: "Supply chain vector (Counterfeit hardware / Tampered manufacturing)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Default credentials vector", 
        isCorrect: false, 
        whyWrong: "Default credentials involve factory passwords, whereas counterfeit hardware involves altered physical chips or backdoored firmware." 
      },
      { 
        text: "Message-based vector", 
        isCorrect: false, 
        whyWrong: "Message-based vectors involve email phishing, not physical hardware procurement." 
      },
      { 
        text: "Unsecure network vector", 
        isCorrect: false, 
        whyWrong: "Unsecure network vectors deal with unauthenticated network ports or weak wireless protocols." 
      }
    ],
    laymanExplanation: "Supply chain vectors also include physical hardware tampering during the manufacturing or distribution process! If an organization buys counterfeit networking equipment (like fake Cisco switches), attackers may have pre-installed secret hardware backdoors to spy on all network traffic!"
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

export default function ThreatVectorsMcq({ onBack }) {
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
            2.2 - Common Threat Vectors Exam Practice 🎯
          </h1>
          <p class="text-amber-100 font-medium text-sm mt-1">
            12 CompTIA Security+ scenario questions covering Message, Image SVG, File Macros, Vishing, USB Air-gaps, Agentless Software, Unsupported Systems, Unsecure Networks, Open Ports, Default Passwords, and Supply Chain MSPs!
          </p>
        </div>

        <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🎯
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
              ? '🌟 PERFECT SCORE! You have mastered 2.2 Common Threat Vectors for CompTIA Security+!'
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
