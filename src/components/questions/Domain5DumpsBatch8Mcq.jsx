import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 141,
    question: "What document specifies how long an organization will retain data and how it will be securely disposed of when no longer needed?",
    options: [
      { 
        text: "Data retention policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data classification policy", 
        isCorrect: false, 
        whyWrong: "Data classification policies categorize data sensitivity levels (Public, Confidential)." 
      },
      { 
        text: "Acceptable use policy", 
        isCorrect: false, 
        whyWrong: "Acceptable use policies govern employee workstation and internet behavior." 
      },
      { 
        text: "Privacy policy", 
        isCorrect: false, 
        whyWrong: "Privacy policies inform external customers how their personal data is collected." 
      }
    ],
    laymanExplanation: "A Data Retention Policy governs storage schedules! It specifies legal holding times for files and mandates secure disposal/shredding procedures when files expire."
  },
  {
    id: 142,
    question: "What term describes the amount of risk that remains after security controls and risk mitigation strategies have been implemented?",
    options: [
      { 
        text: "Residual risk", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Inherent risk", 
        isCorrect: false, 
        whyWrong: "Inherent risk is raw risk exposure before installing any safeguards or firewalls." 
      },
      { 
        text: "Accepted risk", 
        isCorrect: false, 
        whyWrong: "Accepted risk is the specific portion of risk management explicitly approves absorbing." 
      },
      { 
        text: "Transferred risk", 
        isCorrect: false, 
        whyWrong: "Transferred risk is shifted to third parties via insurance contracts." 
      }
    ],
    laymanExplanation: "Residual Risk is the leftover risk! After applying firewalls, antivirus, and MFA controls, the remaining unmitigated risk is Residual Risk."
  },
  {
    id: 143,
    question: "Which type of account is typically used by applications or services to run automated background processes?",
    options: [
      { 
        text: "Service account", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Guest account", 
        isCorrect: false, 
        whyWrong: "Guest accounts provide temporary, restricted access to visitors." 
      },
      { 
        text: "User account", 
        isCorrect: false, 
        whyWrong: "User accounts belong to human employees logging in interactively." 
      },
      { 
        text: "Shared account", 
        isCorrect: false, 
        whyWrong: "Shared accounts are credentials used by multiple human users, violating non-repudiation." 
      }
    ],
    laymanExplanation: "Service Accounts run automated tasks! They are non-human accounts assigned to software daemons, databases, and background scripts."
  },
  {
    id: 144,
    question: "What type of risk involves vulnerabilities introduced by third-party vendors, hardware manufacturers, or software suppliers?",
    options: [
      { 
        text: "Supply chain risk", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Operational risk", 
        isCorrect: false, 
        whyWrong: "Operational risk stems from internal process failures or human mistakes." 
      },
      { 
        text: "Strategic risk", 
        isCorrect: false, 
        whyWrong: "Strategic risk involves poor business planning decisions." 
      },
      { 
        text: "Compliance risk", 
        isCorrect: false, 
        whyWrong: "Compliance risk involves statutory regulatory non-compliance." 
      }
    ],
    laymanExplanation: "Supply Chain Risk comes from third-party partners! It covers security vulnerabilities in external vendors, hardware microchips, or open-source software libraries."
  },
  {
    id: 145,
    question: "Which consequence is most likely if an organization fails a PCI DSS compliance audit?",
    options: [
      { 
        text: "Fines and loss of credit card processing privileges", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Incarceration of executives", 
        isCorrect: false, 
        whyWrong: "PCI DSS is an industry standard enforced by credit card brands, not criminal law." 
      },
      { 
        text: "Revocation of corporate charter", 
        isCorrect: false, 
        whyWrong: "Corporate charters are state government filings, unrelated to credit card council rules." 
      },
      { 
        text: "Mandatory public apologies", 
        isCorrect: false, 
        whyWrong: "Public apologies are PR statements, not official PCI DSS compliance penalties." 
      }
    ],
    laymanExplanation: "Failing PCI DSS results in massive monthly bank fines and revoking your ability to process credit card payments!"
  },
  {
    id: 146,
    question: "What incident response document outlines step-by-step procedures for specific security scenarios such as phishing or ransomware?",
    options: [
      { 
        text: "Playbook", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Incident response policy", 
        isCorrect: false, 
        whyWrong: "Policies state high-level executive authority and goals." 
      },
      { 
        text: "Incident response plan", 
        isCorrect: false, 
        whyWrong: "Plans outline general incident phases, but lack specific threat step-by-step commands." 
      },
      { 
        text: "Business continuity plan", 
        isCorrect: false, 
        whyWrong: "BCP guides business operations during facility outages." 
      }
    ],
    laymanExplanation: "An Incident Response Playbook is a detailed technical game plan! It provides specific step-by-step instructions for responding to individual threat types."
  },
  {
    id: 147,
    question: "What security concept refers to the total potential risk before any security controls or mitigations are implemented?",
    options: [
      { 
        text: "Inherent risk", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Residual risk", 
        isCorrect: false, 
        whyWrong: "Residual risk is the leftover risk remaining AFTER installing controls." 
      },
      { 
        text: "Total risk", 
        isCorrect: false, 
        whyWrong: "Total risk is an informal term; the technical CompTIA designation is Inherent Risk." 
      },
      { 
        text: "Control risk", 
        isCorrect: false, 
        whyWrong: "Control risk measures the likelihood that a control will fail to prevent a breach." 
      }
    ],
    laymanExplanation: "Inherent Risk is raw risk! It represents the total natural risk exposure before adding any firewalls, passwords, or security safeguards."
  },
  {
    id: 148,
    question: "Which agreement type establishes a formal business relationship between two organizations working on a joint commercial product?",
    options: [
      { 
        text: "BPA (Business Partners Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SLA (Service Level Agreement)", 
        isCorrect: false, 
        whyWrong: "SLAs govern technical service uptime." 
      },
      { 
        text: "NDA (Non-Disclosure Agreement)", 
        isCorrect: false, 
        whyWrong: "NDAs protect confidential data secrecy." 
      },
      { 
        text: "MSA (Master Services Agreement)", 
        isCorrect: false, 
        whyWrong: "MSAs set master legal relationship terms for contractor services." 
      }
    ],
    laymanExplanation: "A Business Partners Agreement (BPA) governs joint ventures! It legally binds two companies co-developing a product."
  },
  {
    id: 149,
    question: "What type of vulnerability assessment involves actively logging into systems with valid user or administrative credentials?",
    options: [
      { 
        text: "Credentialed scan", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Non-credentialed scan", 
        isCorrect: false, 
        whyWrong: "Non-credentialed scans probe endpoints externally without system login access." 
      },
      { 
        text: "Passive scan", 
        isCorrect: false, 
        whyWrong: "Passive scans monitor network traffic packets." 
      },
      { 
        text: "External scan", 
        isCorrect: false, 
        whyWrong: "External scans target public internet perimeter firewalls." 
      }
    ],
    laymanExplanation: "Credentialed Scans use valid login accounts! By logging in with admin rights, the scanner audits internal registry settings, patches, and local configurations."
  },
  {
    id: 150,
    question: "What phase of incident response focuses on determining why an incident occurred and identifying root causes to prevent future occurrences?",
    options: [
      { 
        text: "Lessons learned (Post-incident activity)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Eradication", 
        isCorrect: false, 
        whyWrong: "Eradication deletes malware files from disks." 
      },
      { 
        text: "Recovery", 
        isCorrect: false, 
        whyWrong: "Recovery brings clean systems back online." 
      },
      { 
        text: "Containment", 
        isCorrect: false, 
        whyWrong: "Containment isolates infected systems." 
      }
    ],
    laymanExplanation: "Lessons Learned evaluates root causes! In this post-incident phase, teams review what happened, update playbooks, and patch vulnerabilities to prevent repeat attacks."
  },
  {
    id: 151,
    question: "What penetration testing concept refers to maintaining access to a compromised system across system reboots or network resets?",
    options: [
      { 
        text: "Persistence", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Pivoting", 
        isCorrect: false, 
        whyWrong: "Pivoting uses a host as a network gateway to reach internal subnets." 
      },
      { 
        text: "Lateral movement", 
        isCorrect: false, 
        whyWrong: "Lateral movement moves sideways across internal machines." 
      },
      { 
        text: "Privilege escalation", 
        isCorrect: false, 
        whyWrong: "Privilege escalation elevates permissions to root/admin." 
      }
    ],
    laymanExplanation: "Persistence keeps access open! Testers install backdoors or registry startup keys so their connection remains active even after system reboots."
  },
  {
    id: 152,
    question: "What formula calculates Annualized Loss Expectancy (ALE)?",
    options: [
      { 
        text: "ALE = SLE × ARO", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "ALE = AV × EF", 
        isCorrect: false, 
        whyWrong: "AV × EF calculates Single Loss Expectancy (SLE)." 
      },
      { 
        text: "ALE = SLE / ARO", 
        isCorrect: false, 
        whyWrong: "ALE requires multiplication, not division." 
      },
      { 
        text: "ALE = AV / ARO", 
        isCorrect: false, 
        whyWrong: "Incorrect formula." 
      }
    ],
    laymanExplanation: "ALE = SLE × ARO! Multiply single event loss (SLE) by annual frequency (ARO) to get Annualized Loss Expectancy."
  },
  {
    id: 153,
    question: "Which role in data governance is responsible for maintaining the technical infrastructure that stores and backs up data?",
    options: [
      { 
        text: "Data custodian", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data owner", 
        isCorrect: false, 
        whyWrong: "Data owners determine data classification and governance rules." 
      },
      { 
        text: "Data controller", 
        isCorrect: false, 
        whyWrong: "Data controllers determine processing purpose under GDPR." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processors execute processing tasks under contract." 
      }
    ],
    laymanExplanation: "The Data Custodian handles technical upkeep! IT sysadmins manage storage servers, run daily backups, and enforce access control lists."
  },
  {
    id: 154,
    question: "What document establishes a binding commitment between a cloud provider and a customer regarding system availability and latency?",
    options: [
      { 
        text: "SLA (Service Level Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "NDA (Non-Disclosure Agreement)", 
        isCorrect: false, 
        whyWrong: "NDAs protect confidential data secrecy." 
      },
      { 
        text: "MOU (Memorandum of Understanding)", 
        isCorrect: false, 
        whyWrong: "MOUs are informal non-binding intent statements." 
      },
      { 
        text: "BPA (Business Partners Agreement)", 
        isCorrect: false, 
        whyWrong: "BPAs govern business partner equity and profit-sharing." 
      }
    ],
    laymanExplanation: "Service Level Agreements (SLAs) contractually guarantee cloud uptime and system performance."
  },
  {
    id: 155,
    question: "What term refers to gathering information about a target network using public sources like social media, search engines, and WHOIS lookups?",
    options: [
      { 
        text: "OSINT (Open Source Intelligence)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Active reconnaissance", 
        isCorrect: false, 
        whyWrong: "Active reconnaissance sends active network packets to target ports." 
      },
      { 
        text: "Intrusive scanning", 
        isCorrect: false, 
        whyWrong: "Intrusive scanning executes exploit checks." 
      },
      { 
        text: "Pivoting", 
        isCorrect: false, 
        whyWrong: "Pivoting routes network traffic through a compromised host." 
      }
    ],
    laymanExplanation: "OSINT is Open Source Intelligence! It gathers target intelligence using freely accessible public internet sources."
  },
  {
    id: 156,
    question: "What type of pentesting exercise involves simulated attacks where the target organization's defenders are unaware that a test is taking place?",
    options: [
      { 
        text: "Blind test (Unannounced test)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Known environment test", 
        isCorrect: false, 
        whyWrong: "Known environment describes white box documentation access." 
      },
      { 
        text: "Purple team exercise", 
        isCorrect: false, 
        whyWrong: "Purple teaming involves open, announced real-time collaboration between red and blue teams." 
      },
      { 
        text: "White box test", 
        isCorrect: false, 
        whyWrong: "White box test provides full architecture documentation." 
      }
    ],
    laymanExplanation: "A Blind / Unannounced Pentest keeps defenders in the dark! It tests how blue team security analysts react to real unexpected cyberattacks."
  },
  {
    id: 157,
    question: "What GDPR principle requires organizations to process only the minimum amount of personal data necessary for a specific purpose?",
    options: [
      { 
        text: "Data minimization", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Right to erasure", 
        isCorrect: false, 
        whyWrong: "Right to erasure (Right to be Forgotten) empowers users to request data deletion." 
      },
      { 
        text: "Data portability", 
        isCorrect: false, 
        whyWrong: "Data portability allows users to transfer personal data between services." 
      },
      { 
        text: "Data sovereignty", 
        isCorrect: false, 
        whyWrong: "Data sovereignty subject data to laws of the nation where it is collected." 
      }
    ],
    laymanExplanation: "Data Minimization collects only what you need! Organizations must collect and store the absolute minimum personal data necessary."
  },
  {
    id: 158,
    question: "Which incident response document outlines top-level authority, roles, and responsibilities for managing security incidents?",
    options: [
      { 
        text: "Incident response policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Incident response playbook", 
        isCorrect: false, 
        whyWrong: "Playbooks provide step-by-step technical threat commands." 
      },
      { 
        text: "Standard operating procedure", 
        isCorrect: false, 
        whyWrong: "SOPs describe routine administrative task execution." 
      },
      { 
        text: "Disaster recovery plan", 
        isCorrect: false, 
        whyWrong: "Disaster recovery plans focus on restoring hardware and datacenter facilities." 
      }
    ],
    laymanExplanation: "An Incident Response Policy grants top-level authority and defines organizational team roles."
  },
  {
    id: 159,
    question: "What metric represents the expected average operating lifespan of a component before it experiences a failure?",
    options: [
      { 
        text: "MTBF (Mean Time Between Failures)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO measures allowable downtime duration." 
      },
      { 
        text: "MTTR (Mean Time to Repair)", 
        isCorrect: false, 
        whyWrong: "MTTR tracks hardware repair duration." 
      },
      { 
        text: "RPO (Recovery Point Objective)", 
        isCorrect: false, 
        whyWrong: "RPO measures acceptable data loss time." 
      }
    ],
    laymanExplanation: "Mean Time Between Failures (MTBF) estimates hardware reliability and expected operating lifespan."
  },
  {
    id: 160,
    question: "What type of risk management decision is made when an organization chooses to discontinue a high-risk product line completely?",
    options: [
      { 
        text: "Risk avoidance", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Risk mitigation", 
        isCorrect: false, 
        whyWrong: "Risk mitigation deploys technical controls to reduce risk exposure while keeping the product line active." 
      },
      { 
        text: "Risk acceptance", 
        isCorrect: false, 
        whyWrong: "Risk acceptance continues operating the high-risk product line without changes." 
      },
      { 
        text: "Risk transfer", 
        isCorrect: false, 
        whyWrong: "Risk transfer buys insurance to cover potential losses." 
      }
    ],
    laymanExplanation: "Discontinuing a risky project is Risk Avoidance! Completely stopping an activity eliminates all risk exposure."
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

export default function Domain5DumpsBatch8Mcq({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

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
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-purple-100 text-purple-900 border-2 border-purple-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Exam Dumps Vault</span>
        </button>

        <button
          onClick={handleReshuffleAndRestart}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-2xl font-extrabold text-xs transition-all shadow-sm active:scale-95"
        >
          <Shuffle className="w-4 h-4 text-purple-700" />
          <span>Randomize & Reshuffle Questions 🎲</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-purple-200/50 flex items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md mb-2">
            <ShieldCheck className="w-4 h-4 text-purple-200" />
            <span>CompTIA Security+ SY0-701 • Domain 5.0 Exam Vault</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Batch 8: Questions 141 - 160 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering Data Retention, Residual vs Inherent Risk, Service Accounts, Supply Chain Risks, PCI DSS Fines, Credentialed Scans, Lessons Learned, Persistence, OSINT, and Data Minimization!
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          📜
        </div>
      </div>

      {!quizFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-4">
            <span className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-purple-100 text-purple-900 rounded-full font-black">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-slate-400 font-mono text-[11px]">(Options Shuffled 🎲)</span>
            </span>
            <span>Current Score: <strong className="text-purple-600 font-black">{score}</strong> / {questions.length}</span>
          </div>

          {/* Question Scenario Text */}
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600">CompTIA Exam Scenario</span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>
          </div>

          {/* Shuffled Options (A, B, C, D) */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const letter = String.fromCharCode(65 + idx);
              
              let btnStyle = "border-slate-200 bg-white hover:border-slate-300 text-slate-800";
              if (selectedOptionIdx === idx) {
                btnStyle = "border-purple-500 bg-purple-50 text-purple-950 font-extrabold shadow-md";
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
                  className={`w-full p-4 rounded-2xl border-4 text-left transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {letter}
                    </span>
                    <span className="text-sm font-bold leading-normal">{opt.text}</span>
                  </div>

                  {isSubmitted && opt.isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />}
                  {isSubmitted && selectedOptionIdx === idx && !opt.isCorrect && <XCircle className="w-6 h-6 text-rose-500 shrink-0 mt-0.5" />}
                </button>
              );
            })}
          </div>

          {/* Explanation & Distractor Breakdown */}
          {isSubmitted && (
            <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
              
              {/* Correct Answer Status */}
              <div className={`p-4 rounded-2xl border-2 text-sm font-medium ${
                currentQ.options[selectedOptionIdx].isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div className="font-extrabold text-base flex items-center gap-2 mb-1">
                  {currentQ.options[selectedOptionIdx].isCorrect ? '🎉 Correct Answer!' : '❌ Incorrect Choice!'}
                </div>
                <p className="font-bold text-xs">
                  Correct Answer: <span className="text-emerald-700 font-extrabold">{currentQ.options.find(o => o.isCorrect)?.text}</span>
                </p>
              </div>

              {/* Layman's Terms Explanation */}
              <div className="p-5 bg-purple-50/80 border-2 border-purple-200 rounded-2xl space-y-1.5">
                <div className="font-black text-purple-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-purple-600" />
                  <span>Layman's Terms Explanation 💡</span>
                </div>
                <p className="text-slate-800 text-sm font-medium leading-relaxed">
                  {currentQ.laymanExplanation}
                </p>
              </div>

              {/* Why Other Options Don't Fit */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl space-y-3 font-sans">
                <div className="font-extrabold text-purple-400 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-purple-400" />
                  <span>Why the Other Answers Don't Fit 🧐</span>
                </div>

                <div className="space-y-2 text-xs">
                  {currentQ.options.filter(o => !o.isCorrect).map((distractor, idx) => (
                    <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
                      <div className="font-extrabold text-rose-400">
                        ❌ {distractor.text}:
                      </div>
                      <div className="text-slate-300 font-medium leading-normal">
                        {distractor.whyWrong}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIdx === null}
                className={`px-8 py-3.5 rounded-2xl font-extrabold text-base shadow-md transition-all active:scale-95 ${
                  selectedOptionIdx !== null
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question →' : 'See Exam Results 🏆'}</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm text-center space-y-6 animate-fadeIn">
          <div className="w-24 h-24 mx-auto rounded-full bg-purple-100 border-4 border-purple-400 flex items-center justify-center text-5xl shadow-lg">
            🏆
          </div>

          <div className="space-y-2">
            <h4 className="text-3xl font-black text-slate-900">Batch 8 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 8 (Questions 141 - 160) of the Exam Dumps Vault!'
              : '👍 Great effort! Click below to reshuffle the questions and options and try again for 100%!'}
          </div>

          <button
            onClick={handleReshuffleAndRestart}
            className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-purple-200 transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <Shuffle className="w-5 h-5" /> Reshuffle Options & Retake Test 🎲
          </button>
        </div>
      )}

    </div>
  );
}
