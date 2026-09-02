import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 161,
    question: "During a business impact analysis (BIA), an organization determines that a key e-commerce application can suffer a maximum downtime of 4 hours before experiencing crippling financial loss. What disaster recovery metric has been established?",
    options: [
      { 
        text: "RTO (Recovery Time Objective)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "RPO (Recovery Point Objective)", 
        isCorrect: false, 
        whyWrong: "RPO measures maximum acceptable data loss time." 
      },
      { 
        text: "MTTR (Mean Time to Repair)", 
        isCorrect: false, 
        whyWrong: "MTTR tracks hardware repair duration." 
      },
      { 
        text: "MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF measures device operational lifespan before failure." 
      }
    ],
    laymanExplanation: "Recovery Time Objective (RTO) is your maximum downtime limit! Establishing a 4-hour limit means systems must be fully restored within 4 hours."
  },
  {
    id: 162,
    question: "Under GDPR regulations, what mandatory role must be appointed by organizations that systematically monitor data subjects on a large scale?",
    options: [
      { 
        text: "DPO (Data Protection Officer)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data Controller", 
        isCorrect: false, 
        whyWrong: "Data Controller is the organization entity establishing data processing purpose." 
      },
      { 
        text: "Data Custodian", 
        isCorrect: false, 
        whyWrong: "Data Custodians are internal IT administrators managing database backups." 
      },
      { 
        text: "Chief Risk Officer (CRO)", 
        isCorrect: false, 
        whyWrong: "CRO is an executive corporate role, not a GDPR statutory appointment." 
      }
    ],
    laymanExplanation: "GDPR mandates appointing a Data Protection Officer (DPO)! Organizations conducting large-scale monitoring must designate an independent DPO to oversee GDPR compliance."
  },
  {
    id: 163,
    question: "An organization purchases a replacement server for $20,000. If a severe power surge has an exposure factor of 40%, what is the Single Loss Expectancy (SLE)?",
    options: [
      { 
        text: "$8,000", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "$4,000", 
        isCorrect: false, 
        whyWrong: "Calculates a 20% exposure factor instead of 40%." 
      },
      { 
        text: "$12,000", 
        isCorrect: false, 
        whyWrong: "Calculates residual asset value (60%), not single loss." 
      },
      { 
        text: "$16,000", 
        isCorrect: false, 
        whyWrong: "Calculates 80% exposure factor." 
      }
    ],
    laymanExplanation: "SLE = Asset Value × Exposure Factor! $20,000 × 0.40 (40%) = $8,000 loss per power surge."
  },
  {
    id: 164,
    question: "Which document serves as an operational guide for IT administrators describing routine, day-to-day maintenance tasks and system administration steps?",
    options: [
      { 
        text: "Standard Operating Procedure (SOP)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Playbook", 
        isCorrect: false, 
        whyWrong: "Playbooks guide incident response for specific cyberattacks." 
      },
      { 
        text: "Acceptable Use Policy (AUP)", 
        isCorrect: false, 
        whyWrong: "AUPs define end-user workstation rules." 
      },
      { 
        text: "Service Level Agreement (SLA)", 
        isCorrect: false, 
        whyWrong: "SLAs govern vendor uptime metrics." 
      }
    ],
    laymanExplanation: "Standard Operating Procedures (SOPs) guide day-to-day IT work! SOPs give step-by-step instructions for routine tasks like server patching or user account creation."
  },
  {
    id: 165,
    question: "What report format summarizes high-level risk metrics, open vulnerabilities, and compliance status specifically for executive board members?",
    options: [
      { 
        text: "Executive risk dashboard", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Technical vulnerability scan output", 
        isCorrect: false, 
        whyWrong: "Raw scanner outputs contain thousands of technical CVE lines overwhelming executives." 
      },
      { 
        text: "Packet capture analysis", 
        isCorrect: false, 
        whyWrong: "Packet captures contain deep network hex data." 
      },
      { 
        text: "System log export", 
        isCorrect: false, 
        whyWrong: "System log exports contain unformatted syslog text." 
      }
    ],
    laymanExplanation: "An Executive Risk Dashboard displays visual summaries! It translates complex technical security data into easy-to-read charts for board members."
  },
  {
    id: 166,
    question: "What type of pentest scanning technique evaluates perimeter firewalls without attempting to bypass login prompts or execute system code?",
    options: [
      { 
        text: "Non-intrusive scan", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Intrusive scan", 
        isCorrect: false, 
        whyWrong: "Intrusive scans actively fire exploit payloads." 
      },
      { 
        text: "Credentialed scan", 
        isCorrect: false, 
        whyWrong: "Credentialed scans log in using administrative user accounts." 
      },
      { 
        text: "Privileged scan", 
        isCorrect: false, 
        whyWrong: "Privileged scan is another term for credentialed administrative scanning." 
      }
    ],
    laymanExplanation: "Non-intrusive scanning checks open ports safely! It identifies potential vulnerabilities without firing exploits that could disrupt production services."
  },
  {
    id: 167,
    question: "An incident handler notices suspicious administrative actions performed at 2:00 AM by a user account that normally works 9:00 AM to 5:00 PM. What concept flagged this behavior?",
    options: [
      { 
        text: "Behavioral baseline analysis (Anomaly detection)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Zero-day vulnerability scan", 
        isCorrect: false, 
        whyWrong: "Zero-day scans look for unpatched code vulnerabilities." 
      },
      { 
        text: "Automated patch deployment", 
        isCorrect: false, 
        whyWrong: "Patch deployment updates system software." 
      },
      { 
        text: "Data sovereignty audit", 
        isCorrect: false, 
        whyWrong: "Data sovereignty audits check international geographic data storage laws." 
      }
    ],
    laymanExplanation: "Behavioral Baseline Analysis flags anomalies! By learning a user's normal routine (9-5 work hours), the system automatically flags 2:00 AM logins as suspicious."
  },
  {
    id: 168,
    question: "What agreement is signed between two government agencies to specify technical interconnection requirements between their IT networks?",
    options: [
      { 
        text: "ISA (Interconnection Security Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SLA (Service Level Agreement)", 
        isCorrect: false, 
        whyWrong: "SLAs govern service provider performance metrics." 
      },
      { 
        text: "MSA (Master Services Agreement)", 
        isCorrect: false, 
        whyWrong: "MSAs establish general contractor relationship terms." 
      },
      { 
        text: "NDA (Non-Disclosure Agreement)", 
        isCorrect: false, 
        whyWrong: "NDAs protect proprietary data secrecy." 
      }
    ],
    laymanExplanation: "An Interconnection Security Agreement (ISA) governs network connections! It specifies security and encryption rules when linking two separate organizational networks."
  },
  {
    id: 169,
    question: "What type of vulnerability scan identifies open network ports and missing software patches from an outside attacker's perspective without insider access?",
    options: [
      { 
        text: "Non-credentialed external scan", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Credentialed internal scan", 
        isCorrect: false, 
        whyWrong: "Credentialed internal scans log into systems inside the network perimeter." 
      },
      { 
        text: "Live packet capture", 
        isCorrect: false, 
        whyWrong: "Packet captures record network traffic." 
      },
      { 
        text: "Memory dump analysis", 
        isCorrect: false, 
        whyWrong: "Memory dump analysis inspects RAM contents." 
      }
    ],
    laymanExplanation: "A Non-credentialed External Scan simulates an unauthenticated outside hacker probing your internet perimeter."
  },
  {
    id: 170,
    question: "What security control is used to verify that an organization's third-party vendor continues to maintain agreed-upon security controls over time?",
    options: [
      { 
        text: "Right-to-audit clause", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Non-disclosure agreement", 
        isCorrect: false, 
        whyWrong: "NDAs prevent data leaks, but don't grant inspection rights." 
      },
      { 
        text: "Password complexity standard", 
        isCorrect: false, 
        whyWrong: "Password complexity standards govern password creation rules." 
      },
      { 
        text: "Biometric enrollment", 
        isCorrect: false, 
        whyWrong: "Biometrics record fingerprint/facial data." 
      }
    ],
    laymanExplanation: "A Right-to-Audit Clause allows you to inspect vendors! It contractually grants your organization the right to review third-party security controls and audit reports."
  },
  {
    id: 171,
    question: "What type of risk matrix rates risk likelihood and impact using categories like Low, Medium, and High?",
    options: [
      { 
        text: "Qualitative risk matrix", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Quantitative risk matrix", 
        isCorrect: false, 
        whyWrong: "Quantitative matrices use exact dollar amounts and mathematical percentages." 
      },
      { 
        text: "Actuarial table", 
        isCorrect: false, 
        whyWrong: "Actuarial tables calculate statistical probability numbers." 
      },
      { 
        text: "Financial balance sheet", 
        isCorrect: false, 
        whyWrong: "Balance sheets track corporate accounting assets and liabilities." 
      }
    ],
    laymanExplanation: "A Qualitative Risk Matrix uses descriptive labels! It categorizes risks into intuitive ratings like Low, Medium, and High based on expert judgment."
  },
  {
    id: 172,
    question: "Which incident response team role is designated as the central point of contact for external communications with news media and the public during a breach?",
    options: [
      { 
        text: "PR / Communications officer", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Technical lead", 
        isCorrect: false, 
        whyWrong: "Technical leads direct technical containment and forensic analysis." 
      },
      { 
        text: "Legal counsel", 
        isCorrect: false, 
        whyWrong: "Legal counsel advises on statutory liability and law enforcement notifications." 
      },
      { 
        text: "Incident commander", 
        isCorrect: false, 
        whyWrong: "Incident commanders lead overall response operations internally." 
      }
    ],
    laymanExplanation: "The Public Relations (PR) Officer handles external media! They ensure clear, accurate public statements while protecting the brand."
  },
  {
    id: 173,
    question: "What metric describes the total cost of acquiring, operating, maintaining, and decommissioning an IT asset over its full lifecycle?",
    options: [
      { 
        text: "Total Cost of Ownership (TCO)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Single Loss Expectancy (SLE)", 
        isCorrect: false, 
        whyWrong: "SLE measures financial loss from a single risk event." 
      },
      { 
        text: "Annualized Loss Expectancy (ALE)", 
        isCorrect: false, 
        whyWrong: "ALE calculates expected annual risk loss." 
      },
      { 
        text: "Exposure Factor (EF)", 
        isCorrect: false, 
        whyWrong: "EF measures loss percentage during a threat event." 
      }
    ],
    laymanExplanation: "Total Cost of Ownership (TCO) calculates complete lifecycle costs! It includes purchase price, maintenance fees, electricity, and disposal expenses."
  },
  {
    id: 174,
    question: "Which term describes a security vulnerability that is actively exploited in the wild before the software vendor releases a patch?",
    options: [
      { 
        text: "Zero-day vulnerability", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Legacy vulnerability", 
        isCorrect: false, 
        whyWrong: "Legacy vulnerabilities exist on old unsupported systems." 
      },
      { 
        text: "End-of-life exploit", 
        isCorrect: false, 
        whyWrong: "End-of-life refers to software no longer receiving vendor support." 
      },
      { 
        text: "Misconfiguration vulnerability", 
        isCorrect: false, 
        whyWrong: "Misconfigurations stem from wrong administrative settings." 
      }
    ],
    laymanExplanation: "A Zero-Day vulnerability is an unpatched flaw! Attackers exploit it before developers have zero days to issue a fix."
  },
  {
    id: 175,
    question: "What document establishes formal cooperation between two organizations to share threat intelligence and security telemetry?",
    options: [
      { 
        text: "MOU (Memorandum of Understanding)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "NDA (Non-Disclosure Agreement)", 
        isCorrect: false, 
        whyWrong: "NDAs protect secret data, but don't establish active threat intelligence sharing goals." 
      },
      { 
        text: "SLA (Service Level Agreement)", 
        isCorrect: false, 
        whyWrong: "SLAs govern vendor technical uptime performance." 
      },
      { 
        text: "SOW (Statement of Work)", 
        isCorrect: false, 
        whyWrong: "SOWs detail specific contractor work deliverables." 
      }
    ],
    laymanExplanation: "A Memorandum of Understanding (MOU) formalizes mutual cooperation and intelligence sharing between entities."
  },
  {
    id: 176,
    question: "An organization deploys redundant power supplies and RAID disk arrays to eliminate single points of failure. What risk mitigation objective is achieved?",
    options: [
      { 
        text: "Availability", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Confidentiality", 
        isCorrect: false, 
        whyWrong: "Confidentiality prevents unauthorized data exposure through encryption and access controls." 
      },
      { 
        text: "Integrity", 
        isCorrect: false, 
        whyWrong: "Integrity prevents unauthorized data alteration through hashing." 
      },
      { 
        text: "Non-repudiation", 
        isCorrect: false, 
        whyWrong: "Non-repudiation proves user actions via digital signatures." 
      }
    ],
    laymanExplanation: "Redundant hardware protects Availability! Dual power supplies and RAID disks keep systems running continuously without downtime."
  },
  {
    id: 177,
    question: "What security practice ensures that code changes submitted to a software repository are automatically tested and scanned for vulnerabilities before merging?",
    options: [
      { 
        text: "CI/CD automated security testing", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Annual manual penetration testing", 
        isCorrect: false, 
        whyWrong: "Annual pentesting happens once a year manually, missing real-time code changes." 
      },
      { 
        text: "Physical security walkthrough", 
        isCorrect: false, 
        whyWrong: "Physical walkthroughs inspect building door locks." 
      },
      { 
        text: "Offsite tape backup", 
        isCorrect: false, 
        whyWrong: "Offsite backups store data copies." 
      }
    ],
    laymanExplanation: "CI/CD security testing scans code automatically! Every time developers push code, automated tools test for bugs before deployment."
  },
  {
    id: 178,
    question: "What disaster recovery strategy maintains a fully operational duplicate facility running in real-time sync with production systems?",
    options: [
      { 
        text: "Hot site", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Cold site", 
        isCorrect: false, 
        whyWrong: "Cold sites provide space, power, and cooling, but no pre-installed hardware or data." 
      },
      { 
        text: "Warm site", 
        isCorrect: false, 
        whyWrong: "Warm sites have hardware installed, but require loading recent data backups." 
      },
      { 
        text: "Mobile site", 
        isCorrect: false, 
        whyWrong: "Mobile sites are portable trailers equipped with technology." 
      }
    ],
    laymanExplanation: "A Hot Site is a real-time mirror backup facility! It has duplicate servers running in sync, allowing immediate failover with zero downtime."
  },
  {
    id: 179,
    question: "What regulatory law governs the protection and handling of personal financial records of US consumers held by financial institutions?",
    options: [
      { 
        text: "GLBA (Gramm-Leach-Bliley Act)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "HIPAA", 
        isCorrect: false, 
        whyWrong: "HIPAA protects healthcare medical records." 
      },
      { 
        text: "GDPR", 
        isCorrect: false, 
        whyWrong: "GDPR is the European Union general data privacy regulation." 
      },
      { 
        text: "FERPA", 
        isCorrect: false, 
        whyWrong: "FERPA protects student educational records." 
      }
    ],
    laymanExplanation: "The Gramm-Leach-Bliley Act (GLBA) protects consumer financial data! US banks and financial institutions must comply with GLBA privacy rules."
  },
  {
    id: 180,
    question: "What penetration testing team operates as an objective third party to observe and grade both the Red and Blue teams during an exercise?",
    options: [
      { 
        text: "White team", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Purple team", 
        isCorrect: false, 
        whyWrong: "Purple team is the collaborative group of attackers and defenders working together." 
      },
      { 
        text: "Yellow team", 
        isCorrect: false, 
        whyWrong: "Yellow team refers to software developers." 
      },
      { 
        text: "Orange team", 
        isCorrect: false, 
        whyWrong: "Orange team refers to security educators." 
      }
    ],
    laymanExplanation: "The White Team acts as referees! They enforce rules of engagement, manage test scoring, and oversee both Red and Blue teams."
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

export default function Domain5DumpsBatch9Mcq({ onBack }) {
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
            Batch 9: Questions 161 - 180 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering RTO BIA Metrics, GDPR DPO Requirements, SOPs, Executive Dashboards, Anomaly Detection, ISAs, Zero-Day Vulnerabilities, GLBA Financial Laws, and White Team Referees!
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
            <h4 className="text-3xl font-black text-slate-900">Batch 9 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 9 (Questions 161 - 180) of the Exam Dumps Vault!'
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
