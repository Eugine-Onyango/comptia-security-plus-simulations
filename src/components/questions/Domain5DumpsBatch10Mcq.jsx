import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 181,
    question: "Under cloud computing security models, what penetration testing limitation is typically imposed by cloud service providers on Infrastructure as a Service (IaaS) environments?",
    options: [
      { 
        text: "Pentesters must not target or disrupt the underlying cloud hypervisor and multi-tenant cloud infrastructure", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Pentesters cannot test customer-deployed virtual machine OS configurations", 
        isCorrect: false, 
        whyWrong: "Customers own and can pentest their own VM guest operating systems in IaaS models." 
      },
      { 
        text: "Pentesters are prohibited from performing web application vulnerability scans", 
        isCorrect: false, 
        whyWrong: "Web application vulnerability scanning is permitted on customer-hosted cloud web apps." 
      },
      { 
        text: "Pentesters cannot perform non-intrusive port scans against public IP addresses", 
        isCorrect: false, 
        whyWrong: "Non-intrusive scanning of customer public IPs is permitted under cloud pentest policies." 
      }
    ],
    laymanExplanation: "Cloud providers protect multi-tenant infrastructure! You can test your own virtual machines, but you are strictly forbidden from attacking the underlying cloud hypervisor or hardware shared with other customers."
  },
  {
    id: 182,
    question: "What security policy practice enforces job rotation and mandatory vacations to detect fraudulent activity or unauthorized changes committed by privileged employees?",
    options: [
      { 
        text: "Separation of duties / Mandatory vacation policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Dual-control password policy", 
        isCorrect: false, 
        whyWrong: "Dual-control password policies require two people to enter password halves." 
      },
      { 
        text: "Least privilege access policy", 
        isCorrect: false, 
        whyWrong: "Least privilege restricts user permissions to only required business tasks." 
      },
      { 
        text: "Clean desk policy", 
        isCorrect: false, 
        whyWrong: "Clean desk policies require locking physical papers away at night." 
      }
    ],
    laymanExplanation: "Mandatory Vacations expose insider fraud! Forcing employees to take time off lets another coworker perform their duties, quickly revealing hidden embezzlement or illegal system changes."
  },
  {
    id: 183,
    question: "An independent third-party auditor discovers that an IT administrator who manages domain controller backups also approves all change requests for system patches. What security principle is being violated?",
    options: [
      { 
        text: "Separation of duties", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Least privilege", 
        isCorrect: false, 
        whyWrong: "Least privilege limits user rights, while assigning conflicting approval duties violates separation of duties." 
      },
      { 
        text: "Implicit deny", 
        isCorrect: false, 
        whyWrong: "Implicit deny blocks unapproved network traffic by default." 
      },
      { 
        text: "Need to know", 
        isCorrect: false, 
        whyWrong: "Need to know restricts data access based on job necessity." 
      }
    ],
    laymanExplanation: "Separation of Duties (SoD) prevents conflict of interest! The same person should never have the power to both make a change AND approve that change."
  },
  {
    id: 184,
    question: "What internal organizational body brings together business leaders, IT managers, and security officers to review enterprise risk, review policy exceptions, and prioritize security investments?",
    options: [
      { 
        text: "Security steering committee", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Incident response team", 
        isCorrect: false, 
        whyWrong: "Incident response teams handle technical breach containment during active cyberattacks." 
      },
      { 
        text: "Emergency response council", 
        isCorrect: false, 
        whyWrong: "Emergency response councils coordinate physical disaster evacuations." 
      },
      { 
        text: "Software review board", 
        isCorrect: false, 
        whyWrong: "Software review boards evaluate source code quality." 
      }
    ],
    laymanExplanation: "A Security Steering Committee aligns security with business goals! Executives meet regularly to review security risks, approve policies, and allocate security budgets."
  },
  {
    id: 185,
    question: "An organization wants to prevent employees from reusing their previous 10 passwords when updating credentials. What active directory security setting should be configured?",
    options: [
      { 
        text: "Password history enforcement", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Password age limit", 
        isCorrect: false, 
        whyWrong: "Password age limits dictate how long a password remains valid before expiring." 
      },
      { 
        text: "Password complexity requirement", 
        isCorrect: false, 
        whyWrong: "Password complexity enforces special characters, numbers, and uppercase letters." 
      },
      { 
        text: "Account lockout threshold", 
        isCorrect: false, 
        whyWrong: "Account lockout thresholds block accounts after multiple failed login attempts." 
      }
    ],
    laymanExplanation: "Enforcing Password History stops password cycling! Remembering previous passwords prevents users from immediately reusing old passwords when changing credentials."
  },
  {
    id: 186,
    question: "Which type of risk assessment calculates exact monetary loss metrics like Single Loss Expectancy (SLE) and Annualized Loss Expectancy (ALE)?",
    options: [
      { 
        text: "Quantitative risk assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Qualitative risk assessment", 
        isCorrect: false, 
        whyWrong: "Qualitative risk assessments use subjective Low/Medium/High ratings." 
      },
      { 
        text: "Ad hoc risk assessment", 
        isCorrect: false, 
        whyWrong: "Ad hoc risk assessments are unscheduled reviews." 
      },
      { 
        text: "Continuous risk assessment", 
        isCorrect: false, 
        whyWrong: "Continuous risk assessments run real-time automated code pipeline scans." 
      }
    ],
    laymanExplanation: "Quantitative Risk Assessment uses hard financial calculations (SLE and ALE) to measure risk in exact dollar figures."
  },
  {
    id: 187,
    question: "What type of disaster recovery site has power, cooling, and network connectivity, but requires hardware installation and loading data backups before becoming operational?",
    options: [
      { 
        text: "Warm site", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Hot site", 
        isCorrect: false, 
        whyWrong: "Hot sites maintain real-time synchronized duplicate hardware ready for instant failover." 
      },
      { 
        text: "Cold site", 
        isCorrect: false, 
        whyWrong: "Cold sites provide empty physical space with power/cooling, but no pre-installed hardware or servers." 
      },
      { 
        text: "Mirrored site", 
        isCorrect: false, 
        whyWrong: "Mirrored sites are live hot sites running active-active traffic." 
      }
    ],
    laymanExplanation: "A Warm Site is pre-equipped with servers and networks, but requires loading recent data backups before coming online."
  },
  {
    id: 188,
    question: "What document establishes formal non-disclosure obligations to protect sensitive trade secrets during merger or acquisition negotiations?",
    options: [
      { 
        text: "NDA (Non-Disclosure Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SLA (Service Level Agreement)", 
        isCorrect: false, 
        whyWrong: "SLAs govern vendor technical uptime performance." 
      },
      { 
        text: "MSA (Master Services Agreement)", 
        isCorrect: false, 
        whyWrong: "MSAs set master legal relationship terms for contractor services." 
      },
      { 
        text: "BPA (Business Partners Agreement)", 
        isCorrect: false, 
        whyWrong: "BPAs govern joint business partner equity and profit-sharing." 
      }
    ],
    laymanExplanation: "Non-Disclosure Agreements (NDAs) protect trade secrets! They legally bind both parties to keep merger negotiations and proprietary data secret."
  },
  {
    id: 189,
    question: "Which metric represents the average operational time elapsed between hardware system failures?",
    options: [
      { 
        text: "MTBF (Mean Time Between Failures)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "MTTR (Mean Time to Repair)", 
        isCorrect: false, 
        whyWrong: "MTTR tracks repair speed duration." 
      },
      { 
        text: "RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO measures allowable downtime duration." 
      },
      { 
        text: "RPO (Recovery Point Objective)", 
        isCorrect: false, 
        whyWrong: "RPO measures acceptable data loss time." 
      }
    ],
    laymanExplanation: "Mean Time Between Failures (MTBF) measures hardware reliability! It estimates how long a device operates before failing."
  },
  {
    id: 190,
    question: "An organization installs an automated Web Application Firewall (WAF) to intercept SQL injection attacks. What risk response strategy is being demonstrated?",
    options: [
      { 
        text: "Risk mitigation", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Risk avoidance", 
        isCorrect: false, 
        whyWrong: "Risk avoidance stops or shuts down the web application completely." 
      },
      { 
        text: "Risk transfer", 
        isCorrect: false, 
        whyWrong: "Risk transfer purchases insurance to cover financial breach losses." 
      },
      { 
        text: "Risk acceptance", 
        isCorrect: false, 
        whyWrong: "Risk acceptance absorbs SQL injection risks without deploying firewalls." 
      }
    ],
    laymanExplanation: "Installing a Web Application Firewall (WAF) is Risk Mitigation! Deploying protective security controls reduces attack likelihood and impact."
  },
  {
    id: 191,
    question: "What incident response phase focuses on disabling compromised user accounts and isolating affected subnets?",
    options: [
      { 
        text: "Containment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Preparation", 
        isCorrect: false, 
        whyWrong: "Preparation trains teams and builds incident toolkits." 
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
      }
    ],
    laymanExplanation: "Disabling accounts and isolating subnets happens during Containment! It stops active attackers from spreading across the rest of the network."
  },
  {
    id: 192,
    question: "Which GDPR right allows data subjects to obtain a copy of their personal data in a structured, commonly used machine-readable format?",
    options: [
      { 
        text: "Right to data portability", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Right to be forgotten", 
        isCorrect: false, 
        whyWrong: "Right to be forgotten (Right to Erasure) demands complete deletion of personal data." 
      },
      { 
        text: "Right to restriction of processing", 
        isCorrect: false, 
        whyWrong: "Right to restriction pauses processing without deleting data." 
      },
      { 
        text: "Right to object", 
        isCorrect: false, 
        whyWrong: "Right to object allows users to stop direct marketing data processing." 
      }
    ],
    laymanExplanation: "The Right to Data Portability allows users to download their personal data! Individuals can request an export of their data to move to a competing service."
  },
  {
    id: 193,
    question: "What type of vulnerability scan uses valid administrative credentials to query OS registry entries, system files, and local patch levels?",
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
        text: "External perimeter scan", 
        isCorrect: false, 
        whyWrong: "External scans target public internet perimeter firewalls." 
      }
    ],
    laymanExplanation: "Credentialed Scans use valid login accounts to audit internal operating system settings and missing patches."
  },
  {
    id: 194,
    question: "What penetration testing concept describes moving horizontally from host to host across an internal network using harvested credentials?",
    options: [
      { 
        text: "Lateral movement", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Pivoting", 
        isCorrect: false, 
        whyWrong: "Pivoting uses a compromised host as a network bridge/relay to reach isolated subnets." 
      },
      { 
        text: "Persistence", 
        isCorrect: false, 
        whyWrong: "Persistence installs backdoors to survive system reboots." 
      },
      { 
        text: "Privilege escalation", 
        isCorrect: false, 
        whyWrong: "Privilege escalation elevates user rights to root/admin." 
      }
    ],
    laymanExplanation: "Moving host-to-host inside a network is Lateral Movement! Attackers jump sideways across servers using stolen passwords."
  },
  {
    id: 195,
    question: "Which document establishes a high-level statement of executive management intent and mandatory rules across an organization?",
    options: [
      { 
        text: "Policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Procedure", 
        isCorrect: false, 
        whyWrong: "Procedures outline step-by-step technical instructions." 
      },
      { 
        text: "Guideline", 
        isCorrect: false, 
        whyWrong: "Guidelines offer recommended advice." 
      },
      { 
        text: "Playbook", 
        isCorrect: false, 
        whyWrong: "Playbooks guide incident response for specific cyberattacks." 
      }
    ],
    laymanExplanation: "Policies state executive intent! High-level mandatory rules set executive management security direction across the enterprise."
  },
  {
    id: 196,
    question: "What risk metric is calculated by multiplying Single Loss Expectancy (SLE) by Annualized Rate of Occurrence (ARO)?",
    options: [
      { 
        text: "Annualized Loss Expectancy (ALE)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Exposure Factor (EF)", 
        isCorrect: false, 
        whyWrong: "EF measures loss percentage during a threat event." 
      },
      { 
        text: "Total Cost of Ownership (TCO)", 
        isCorrect: false, 
        whyWrong: "TCO measures complete asset lifecycle acquisition and operating costs." 
      },
      { 
        text: "Mean Time to Repair (MTTR)", 
        isCorrect: false, 
        whyWrong: "MTTR tracks hardware repair duration." 
      }
    ],
    laymanExplanation: "ALE = SLE × ARO! Multiply single event loss (SLE) by annual frequency (ARO) to calculate Annualized Loss Expectancy."
  },
  {
    id: 197,
    question: "What document establishes technical rules of engagement, target IP scopes, and emergency contact procedures before commencing a penetration test?",
    options: [
      { 
        text: "Rules of Engagement (RoE)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Service Level Agreement (SLA)", 
        isCorrect: false, 
        whyWrong: "SLAs govern vendor technical uptime performance." 
      },
      { 
        text: "Master Services Agreement (MSA)", 
        isCorrect: false, 
        whyWrong: "MSAs set master legal relationship terms for contractor services." 
      },
      { 
        text: "Business Partners Agreement (BPA)", 
        isCorrect: false, 
        whyWrong: "BPAs govern business partner profit-sharing." 
      }
    ],
    laymanExplanation: "Rules of Engagement (RoE) specify pentest boundaries, target IP ranges, permitted test hours, and emergency contacts."
  },
  {
    id: 198,
    question: "What type of pentesting exercise involves Red and Blue teams collaborating in real time to share attack telemetry and immediately tune defensive detection rules?",
    options: [
      { 
        text: "Purple team exercise", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Black box test", 
        isCorrect: false, 
        whyWrong: "Black box testing provides zero prior target information." 
      },
      { 
        text: "White box test", 
        isCorrect: false, 
        whyWrong: "White box testing provides full source code access." 
      },
      { 
        text: "Blind test", 
        isCorrect: false, 
        whyWrong: "Blind tests keep defenders unaware of the test." 
      }
    ],
    laymanExplanation: "A Purple Team Exercise combines Red and Blue teams in real-time collaboration to test attacks and tune detection rules."
  },
  {
    id: 199,
    question: "An organization chooses to shut down an unpatchable legacy server that contains severe unfixable security flaws. What risk response strategy was executed?",
    options: [
      { 
        text: "Risk avoidance", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Risk mitigation", 
        isCorrect: false, 
        whyWrong: "Risk mitigation deploys technical controls while keeping the server online." 
      },
      { 
        text: "Risk acceptance", 
        isCorrect: false, 
        whyWrong: "Risk acceptance keeps the unpatchable server running without changes." 
      },
      { 
        text: "Risk transfer", 
        isCorrect: false, 
        whyWrong: "Risk transfer buys insurance to cover breach losses." 
      }
    ],
    laymanExplanation: "Decommissioning an unpatchable server is Risk Avoidance! Shutting down the risky system completely eliminates all risk exposure."
  },
  {
    id: 200,
    question: "What phase of the incident response lifecycle involves conducting a post-incident review meeting to document lessons learned and update playbooks?",
    options: [
      { 
        text: "Lessons learned (Post-incident activity)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Containment", 
        isCorrect: false, 
        whyWrong: "Containment isolates infected systems during active attacks." 
      },
      { 
        text: "Eradication", 
        isCorrect: false, 
        whyWrong: "Eradication deletes malware files from disks." 
      },
      { 
        text: "Preparation", 
        isCorrect: false, 
        whyWrong: "Preparation builds toolkits before incidents happen." 
      }
    ],
    laymanExplanation: "Lessons Learned evaluates root causes after an incident to update playbooks and improve future response!"
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

export default function Domain5DumpsBatch10Mcq({ onBack }) {
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
            Batch 10: Questions 181 - 200 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering IaaS Pentest Limits, Separation of Duties (SoD), Security Steering Committees, Password History, Warm Sites, GDPR Portability, Lateral Movement, and Risk Avoidance!
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
            <h4 className="text-3xl font-black text-slate-900">Batch 10 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 10 (Questions 181 - 200) of the Exam Dumps Vault!'
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
