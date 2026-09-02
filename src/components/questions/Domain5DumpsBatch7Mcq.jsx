import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 121,
    question: "Frank's company's risk management policy states that all systems must be assessed for risk annually. What type of risk assessment is Frank's company conducting?",
    options: [
      { 
        text: "Recurring risk assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Ad hoc risk assessment", 
        isCorrect: false, 
        whyWrong: "Ad hoc risk assessments are unscheduled checks triggered by sudden incidents or discoveries." 
      },
      { 
        text: "One-time risk assessment", 
        isCorrect: false, 
        whyWrong: "One-time risk assessments occur once during initial system deployment." 
      },
      { 
        text: "Continuous risk assessment", 
        isCorrect: false, 
        whyWrong: "Continuous risk assessments run real-time automated code pipeline scans." 
      }
    ],
    laymanExplanation: "Annual risk reviews are Recurring Risk Assessments! Mandating risk audits on a regular predictable calendar schedule (like every 12 months) makes it recurring."
  },
  {
    id: 122,
    question: "What key difference separates a business partner agreement (BPA) from a memorandum of understanding (MOU)?",
    options: [
      { 
        text: "A BPA is legally binding, whereas an MOU is usually not", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A BPA is financial, whereas an MOU is technical", 
        isCorrect: false, 
        whyWrong: "Both documents can cover financial and technical details." 
      },
      { 
        text: "A BPA is technical, whereas an MOU is operational", 
        isCorrect: false, 
        whyWrong: "Technical vs operational focus does not define legal contract enforceability." 
      },
      { 
        text: "A BPA is created for long-term relationships, whereas an MOU is created for short-term relationships", 
        isCorrect: false, 
        whyWrong: "Duration of relationship does not dictate legal enforceability." 
      }
    ],
    laymanExplanation: "A BPA is a legally binding contract! A Business Partners Agreement (BPA) enforces legal obligations and financial sharing, while an MOU is an informal, non-binding statement of intent."
  },
  {
    id: 123,
    question: "Selah's organization wants to ensure that contractors working on sensitive projects do not share information about the projects with external entities. What agreement should she ensure that contractors sign?",
    options: [
      { 
        text: "NDA (Non-Disclosure Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SLA (Service Level Agreement)", 
        isCorrect: false, 
        whyWrong: "SLAs govern technical uptime and performance targets." 
      },
      { 
        text: "MSA (Master Services Agreement)", 
        isCorrect: false, 
        whyWrong: "MSAs set master legal relationship terms for contracting work." 
      },
      { 
        text: "BPA (Business Partners Agreement)", 
        isCorrect: false, 
        whyWrong: "BPAs govern joint business partner equity and profit-sharing ventures." 
      }
    ],
    laymanExplanation: "A Non-Disclosure Agreement (NDA) protects confidential information! Requiring contractors to sign an NDA legally prevents them from leaking sensitive project secrets."
  },
  {
    id: 124,
    question: "Kevin wants to conduct a penetration test against a core application server. He wants to ensure that he can conduct the test without harming the server or taking it out of service. What type of penetration test should he conduct?",
    options: [
      { 
        text: "Non-intrusive penetration test", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Unknown environment test", 
        isCorrect: false, 
        whyWrong: "Unknown environment (Black Box) describes tester target disclosure, not test execution safety." 
      },
      { 
        text: "Known environment test", 
        isCorrect: false, 
        whyWrong: "Known environment (White Box) describes full information access, but can still run intrusive exploits." 
      },
      { 
        text: "Passive test", 
        isCorrect: false, 
        whyWrong: "Passive tests inspect traffic header data without active network probing." 
      }
    ],
    laymanExplanation: "Non-intrusive pentesting verifies vulnerabilities safely! It identifies security flaws without firing active exploit payloads that could crash live production servers."
  },
  {
    id: 125,
    question: "Mark has conducted a penetration test and wants to leverage a compromised system to gain access to other systems on the target network. What penetration testing technique is Mark using?",
    options: [
      { 
        text: "Pivoting", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Persistence", 
        isCorrect: false, 
        whyWrong: "Persistence installs backdoors to maintain access after system reboots." 
      },
      { 
        text: "Lateral movement", 
        isCorrect: false, 
        whyWrong: "Lateral movement is moving sideways using credentials; using a host as a network bridge/gateway is Pivoting." 
      },
      { 
        text: "Privilege escalation", 
        isCorrect: false, 
        whyWrong: "Privilege escalation elevates user rights from standard user to root/administrator." 
      }
    ],
    laymanExplanation: "Pivoting uses a compromised system as a bridgehead! Pentesters use an initial compromised host to bypass firewalls and tunnel attacks into isolated internal networks."
  },
  {
    id: 126,
    question: "What process is used to ensure that a security baseline is maintained across a set of systems?",
    options: [
      { 
        text: "Configuration management", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Baseline analysis", 
        isCorrect: false, 
        whyWrong: "Baseline analysis evaluates current performance against historical norms." 
      },
      { 
        text: "Risk assessment", 
        isCorrect: false, 
        whyWrong: "Risk assessments identify and rate system threats." 
      },
      { 
        text: "Vulnerability scanning", 
        isCorrect: false, 
        whyWrong: "Vulnerability scanning detects missing patches, but does not enforce system baselines." 
      }
    ],
    laymanExplanation: "Configuration Management enforces security baselines! It tracks, audits, and maintains standard hardened settings across all servers and endpoints."
  },
  {
    id: 127,
    question: "What penetration testing concept involves moving from one system to another inside a target network after gaining an initial foothold?",
    options: [
      { 
        text: "Lateral movement", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Persistence", 
        isCorrect: false, 
        whyWrong: "Persistence installs backdoors to survive system reboots." 
      },
      { 
        text: "Privilege escalation", 
        isCorrect: false, 
        whyWrong: "Privilege escalation increases administrative permission levels." 
      },
      { 
        text: "Pivoting", 
        isCorrect: false, 
        whyWrong: "Pivoting routes network traffic through a compromised relay host." 
      }
    ],
    laymanExplanation: "Moving sideways across internal servers is Lateral Movement! Once inside, attackers jump from workstation to domain controller using stolen credentials."
  },
  {
    id: 128,
    question: "Amanda wants to ensure that a penetration tester cannot maintain access to a compromised system after the penetration test is complete. What penetration testing control or practice will prevent this?",
    options: [
      { 
        text: "Cleanup", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Lateral movement", 
        isCorrect: false, 
        whyWrong: "Lateral movement spreads attack footholds sideways across systems." 
      },
      { 
        text: "Privilege escalation", 
        isCorrect: false, 
        whyWrong: "Privilege escalation gains admin access." 
      },
      { 
        text: "Persistence", 
        isCorrect: false, 
        whyWrong: "Persistence leaves backdoors active behind." 
      }
    ],
    laymanExplanation: "Cleanup removes pentest traces! Pentesters must clean up all installed tools, test accounts, scripts, and backdoors before concluding the assessment."
  },
  {
    id: 129,
    question: "Which of the following is an example of active reconnaissance?",
    options: [
      { 
        text: "Running a vulnerability scanner against a target", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Reviewing social media posts", 
        isCorrect: false, 
        whyWrong: "Reviewing social media is passive OSINT intelligence gathering." 
      },
      { 
        text: "Searching WHOIS databases", 
        isCorrect: false, 
        whyWrong: "WHOIS lookups query public domain registrars passively without sending packets to target IP addresses." 
      },
      { 
        text: "Examining public financial filings", 
        isCorrect: false, 
        whyWrong: "Public financial filings are passive open-source intelligence." 
      }
    ],
    laymanExplanation: "Running a vulnerability scanner is Active Reconnaissance! Sending network probes directly to a target's IP ports actively interacts with their systems."
  },
  {
    id: 130,
    question: "What document defines the acceptable level of service that a service provider must maintain for a customer?",
    options: [
      { 
        text: "SLA (Service Level Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "NDA (Non-Disclosure Agreement)", 
        isCorrect: false, 
        whyWrong: "NDAs protect proprietary data secrecy." 
      },
      { 
        text: "MSA (Master Services Agreement)", 
        isCorrect: false, 
        whyWrong: "MSAs define overarching legal contract terms." 
      },
      { 
        text: "BPA (Business Partners Agreement)", 
        isCorrect: false, 
        whyWrong: "BPAs govern business partner profit-sharing." 
      }
    ],
    laymanExplanation: "Service Level Agreements (SLAs) define uptime metrics! They state expected performance targets (e.g. 99.9% uptime) and penalty credits if targets are missed."
  },
  {
    id: 131,
    question: "Which of the following roles is responsible for establishing data classifications and assigning security controls?",
    options: [
      { 
        text: "Data owner", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data custodian", 
        isCorrect: false, 
        whyWrong: "Data custodians perform technical implementation (backups, access lists) assigned by owners." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processors process data under contract." 
      },
      { 
        text: "Data subject", 
        isCorrect: false, 
        whyWrong: "Data subjects are individual end users." 
      }
    ],
    laymanExplanation: "Data Owners classify data! Business data owners determine classification levels (Public, Confidential) and specify necessary security controls."
  },
  {
    id: 132,
    question: "What metric measures the average time it takes to repair a failed system or component?",
    options: [
      { 
        text: "MTTR (Mean Time to Repair)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF measures device operational lifespan before failure." 
      },
      { 
        text: "RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO is the target downtime recovery limit set by policy." 
      },
      { 
        text: "RPO (Recovery Point Objective)", 
        isCorrect: false, 
        whyWrong: "RPO measures maximum acceptable data loss time." 
      }
    ],
    laymanExplanation: "Mean Time to Repair (MTTR) tracks repair speed! It measures how long technicians average to fix a failed hardware component."
  },
  {
    id: 133,
    question: "What type of risk response strategy is being used when an organization purchases cybersecurity insurance?",
    options: [
      { 
        text: "Risk transfer", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Risk avoidance", 
        isCorrect: false, 
        whyWrong: "Risk avoidance stops high-risk activities entirely." 
      },
      { 
        text: "Risk acceptance", 
        isCorrect: false, 
        whyWrong: "Risk acceptance absorbs financial losses internally." 
      },
      { 
        text: "Risk mitigation", 
        isCorrect: false, 
        whyWrong: "Risk mitigation deploys technical controls to reduce attack likelihood." 
      }
    ],
    laymanExplanation: "Purchasing insurance is Risk Transfer! It shifts the financial impact of a data breach from your organization to an insurance company."
  },
  {
    id: 134,
    question: "What security document provides high-level statements outlining an organization's goals and mandatory requirements for security?",
    options: [
      { 
        text: "Policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Standard", 
        isCorrect: false, 
        whyWrong: "Standards define mandatory technical rules and specific configuration baselines." 
      },
      { 
        text: "Guideline", 
        isCorrect: false, 
        whyWrong: "Guidelines offer recommended best practices (optional advice)." 
      },
      { 
        text: "Procedure", 
        isCorrect: false, 
        whyWrong: "Procedures outline step-by-step instructions." 
      }
    ],
    laymanExplanation: "A Policy states executive goals! Policies set high-level mandatory requirements defining executive management security intent."
  },
  {
    id: 135,
    question: "What phase of incident response involves isolating affected systems from the network to prevent the spread of an attack?",
    options: [
      { 
        text: "Containment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Preparation", 
        isCorrect: false, 
        whyWrong: "Preparation builds tools, playbooks, and trains incident response teams." 
      },
      { 
        text: "Identification", 
        isCorrect: false, 
        whyWrong: "Identification detects and verifies active security breaches." 
      },
      { 
        text: "Eradication", 
        isCorrect: false, 
        whyWrong: "Eradication removes malware payloads and rootkit artifacts from systems." 
      }
    ],
    laymanExplanation: "Network isolation happens during Containment! Disconnecting infected servers prevents malware from spreading across the rest of the network."
  },
  {
    id: 136,
    question: "What type of pentesting environment provides the tester with full access to architecture diagrams, source code, and configuration settings?",
    options: [
      { 
        text: "Known environment (White Box)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Unknown environment (Black Box)", 
        isCorrect: false, 
        whyWrong: "Unknown environment tests provide zero internal details." 
      },
      { 
        text: "Partially known environment (Gray Box)", 
        isCorrect: false, 
        whyWrong: "Partially known environment tests provide limited target details." 
      },
      { 
        text: "Hybrid environment", 
        isCorrect: false, 
        whyWrong: "Hybrid environment is not a standard CompTIA pentest disclosure term." 
      }
    ],
    laymanExplanation: "A Known Environment (White Box) pentest grants total visibility! Testers inspect source code and architecture diagrams directly."
  },
  {
    id: 137,
    question: "What metric represents the maximum acceptable amount of data loss measured in time following a disruption?",
    options: [
      { 
        text: "RPO (Recovery Point Objective)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO measures maximum allowed downtime duration." 
      },
      { 
        text: "MTTR (Mean Time to Repair)", 
        isCorrect: false, 
        whyWrong: "MTTR tracks hardware repair duration." 
      },
      { 
        text: "MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF measures device operational lifespan." 
      }
    ],
    laymanExplanation: "Recovery Point Objective (RPO) is data loss measured in time! It defines how many hours of data transactions a business can afford to lose."
  },
  {
    id: 138,
    question: "Which GDPR role is responsible for determining the purposes and means of processing personal data?",
    options: [
      { 
        text: "Data controller", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data subject", 
        isCorrect: false, 
        whyWrong: "Data subjects are individual users whose personal data is collected." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processors process data on behalf of a controller." 
      },
      { 
        text: "Data protection officer", 
        isCorrect: false, 
        whyWrong: "DPOs supervise internal organizational compliance with GDPR." 
      }
    ],
    laymanExplanation: "The Data Controller decides 'Why and How' personal data is processed!"
  },
  {
    id: 139,
    question: "What type of attack simulation combines both offensive (red team) and defensive (blue team) methodologies to maximize security improvement?",
    options: [
      { 
        text: "Purple team exercise", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Black box testing", 
        isCorrect: false, 
        whyWrong: "Black box testing provides zero prior target information." 
      },
      { 
        text: "White box testing", 
        isCorrect: false, 
        whyWrong: "White box testing provides full source code access." 
      },
      { 
        text: "Gray box testing", 
        isCorrect: false, 
        whyWrong: "Gray box testing provides partial target information." 
      }
    ],
    laymanExplanation: "A Purple Team Exercise brings attackers and defenders together! Red and Blue teams collaborate in real-time to test attacks and immediately tune detection rules."
  },
  {
    id: 140,
    question: "What process involves restoring systems to operational status and confirming that the threat has been completely removed following an incident?",
    options: [
      { 
        text: "Recovery", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Containment", 
        isCorrect: false, 
        whyWrong: "Containment isolates systems to prevent attack spread." 
      },
      { 
        text: "Eradication", 
        isCorrect: false, 
        whyWrong: "Eradication cleans malware payloads from infected disks." 
      },
      { 
        text: "Lessons learned", 
        isCorrect: false, 
        whyWrong: "Lessons learned is the post-incident meeting analyzing response performance." 
      }
    ],
    laymanExplanation: "Recovery restores systems to full production operation! After eradicating malware, systems are tested, verified clean, and brought back online."
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

export default function Domain5DumpsBatch7Mcq({ onBack }) {
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
            Batch 7: Questions 121 - 140 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering Recurring Risk Assessments, BPA vs MOU, Non-Intrusive Pentesting, Pivoting vs Lateral Movement, Active Recon, Containment & Recovery Phases, and Purple Teaming!
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
            <h4 className="text-3xl font-black text-slate-900">Batch 7 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 7 (Questions 121 - 140) of the Exam Dumps Vault!'
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
