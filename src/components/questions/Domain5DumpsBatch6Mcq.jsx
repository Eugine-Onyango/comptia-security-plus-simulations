import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 101,
    question: "Greg is reviewing a server and notices that it is both running outdated software and that the organization heavily relies on the services that it provides. He pulls together a team to determine what the risk of operating the server is and what issues would occur if it were removed from service that day. What type of assessment has he conducted?",
    options: [
      { 
        text: "An ad hoc risk assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A one-time risk assessment", 
        isCorrect: false, 
        whyWrong: "One-time risk assessments are conducted during initial project onboarding." 
      },
      { 
        text: "A third-party risk assessment", 
        isCorrect: false, 
        whyWrong: "Third-party risk assessments evaluate external vendors and supply chain partners." 
      },
      { 
        text: "A continuous risk assessment", 
        isCorrect: false, 
        whyWrong: "Continuous risk assessments are automated real-time scans built into software delivery pipelines." 
      }
    ],
    laymanExplanation: "Greg conducted an Ad Hoc Risk Assessment! Ad hoc assessments are unscheduled, event-driven risk reviews performed on short notice when a specific risk or vulnerable system is discovered."
  },
  {
    id: 102,
    question: "Olivia's organization operates servers in a datacenter that support customers across the country. As Olivia is determining her service level agreements, what information is most important in determining how quickly a server can be restored to operation if its motherboard fails?",
    options: [
      { 
        text: "An MTTR (Mean Time to Repair)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO is the business downtime target limit set by policy, whereas MTTR is the actual hardware repair time." 
      },
      { 
        text: "An RPO (Recovery Point Objective)", 
        isCorrect: false, 
        whyWrong: "RPO measures maximum acceptable data loss time." 
      },
      { 
        text: "An MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF measures average expected operational lifespan before failure occurs." 
      }
    ],
    laymanExplanation: "Mean Time to Repair (MTTR) tracks hardware fix speed! It estimates how long technicians take to physically repair or swap out broken hardware like a failed motherboard."
  },
  {
    id: 103,
    question: "Irina's organization wants to work with one of their vendors and wishes to establish an ongoing relationship with them. What type of agreement should they create between the organizations so that they can create SOWs as they determine what services they need from their service provider's organization?",
    options: [
      { 
        text: "An MSA (Master Services Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An MOU (Memorandum of Understanding)", 
        isCorrect: false, 
        whyWrong: "MOUs are broad non-binding intent agreements." 
      },
      { 
        text: "An SLA (Service Level Agreement)", 
        isCorrect: false, 
        whyWrong: "SLAs define technical uptime and latency metrics." 
      },
      { 
        text: "A BPA (Business Partners Agreement)", 
        isCorrect: false, 
        whyWrong: "BPAs govern joint business partnerships and profit-sharing models." 
      }
    ],
    laymanExplanation: "A Master Services Agreement (MSA) sets legal contract foundations! Once signed, companies can issue individual Statements of Work (SOWs) for specific projects under that master contract."
  },
  {
    id: 104,
    question: "Dani's organization relies on journaling to help protect transactions that occur through its database. Which of the following does journaling impact the most?",
    options: [
      { 
        text: "An RPO (Recovery Point Objective)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO measures system reboot/recovery downtime duration." 
      },
      { 
        text: "An MTTR (Mean Time to Repair)", 
        isCorrect: false, 
        whyWrong: "MTTR tracks hardware repair duration." 
      },
      { 
        text: "An MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF measures device operational lifespan." 
      }
    ],
    laymanExplanation: "Database journaling minimizes data loss (RPO)! By logging every transaction in real-time, journaling ensures that if a database crashes, you lose near-zero data transactions."
  },
  {
    id: 105,
    question: "Henry's organization has set their RTO to 12 hours. What does this mean?",
    options: [
      { 
        text: "Recovery from outages should take less than 12 hours", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Outages must be less than 6 hours long", 
        isCorrect: false, 
        whyWrong: "Setting RTO to 12 hours defines a 12-hour limit, not 6." 
      },
      { 
        text: "Outages longer than 12 hours will require fail over to a warm site", 
        isCorrect: false, 
        whyWrong: "Failover actions are specified in disaster recovery plans, while RTO is the maximum allowed downtime limit." 
      },
      { 
        text: "SLAs for third-party services should specify a 12 hour MTBF", 
        isCorrect: false, 
        whyWrong: "RTO and MTBF are completely different metrics." 
      }
    ],
    laymanExplanation: "An RTO of 12 hours means downtime must not exceed 12 hours! Systems must be fully restored and back online within 12 hours after a crash."
  },
  {
    id: 106,
    question: "Valerie knows that her organization's datacenter power infrastructure has an MTTR of 24 hours. What should she do if there is a critical component failure in her power infrastructure, and the organization has a warm site with an activation of 12 hours and needs to be back online as soon as possible?",
    options: [
      { 
        text: "Immediately begin a move to the warm site", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Wait to see if the recovery can be done in less than 24 hours", 
        isCorrect: false, 
        whyWrong: "Waiting wastes time while power hardware takes 24 hours to repair." 
      },
      { 
        text: "Wait to see if the recovery can be done in less than 12 hours", 
        isCorrect: false, 
        whyWrong: "Waiting 12 hours delays warm site activation, causing a 24-hour total outage." 
      },
      { 
        text: "Wait for 12 hours, then begin the move to the warm site", 
        isCorrect: false, 
        whyWrong: "Waiting 12 hours before starting the 12-hour warm site move results in 24 hours of downtime." 
      }
    ],
    laymanExplanation: "Move to the warm site immediately! Repairing local power hardware takes 24 hours (MTTR), but spinning up the warm site takes only 12 hours. Moving right away gets systems back online fastest."
  },
  {
    id: 107,
    question: "Peter's risk assessment process includes calculations of single loss expectancy, the annualized rate of occurrence of risks, and the annualized loss expectancy. What type of risk assessment is Peter conducting?",
    options: [
      { 
        text: "Quantitative risk assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Calculated risk assessment", 
        isCorrect: false, 
        whyWrong: "Calculated is an informal descriptor, not a recognized CompTIA risk assessment term." 
      },
      { 
        text: "Qualitative risk assessment", 
        isCorrect: false, 
        whyWrong: "Qualitative risk relies on subjective Low/Medium/High scales without dollar math." 
      },
      { 
        text: "Registered risk assessment", 
        isCorrect: false, 
        whyWrong: "Risk register is the tracking document, not the assessment calculation model." 
      }
    ],
    laymanExplanation: "Quantitative Risk Assessment uses hard financial formulas! Calculating Single Loss Expectancy (SLE), Annualized Rate of Occurrence (ARO), and Annualized Loss Expectancy (ALE) determines exact dollar risk figures."
  },
  {
    id: 108,
    question: "What organizational document is used to enumerate and rate an organization's risks?",
    options: [
      { 
        text: "A risk register", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A risk appetite plan", 
        isCorrect: false, 
        whyWrong: "Risk appetite plans document executive risk tolerance thresholds." 
      },
      { 
        text: "A quantitative register", 
        isCorrect: false, 
        whyWrong: "Quantitative register is not a standard term." 
      },
      { 
        text: "A qualitative assessment report", 
        isCorrect: false, 
        whyWrong: "Qualitative assessment reports summarize assessment findings, but the live master tracking tool is the risk register." 
      }
    ],
    laymanExplanation: "A Risk Register is the central risk tracking spreadsheet! It lists every identified risk, its likelihood, impact severity, assigned risk owner, and mitigation status."
  },
  {
    id: 109,
    question: "Amanda's organization wants to conduct a risk assessment and needs to prioritize a timely completion of the process over rigorous detail. What type of assessment should she advise her organization to select?",
    options: [
      { 
        text: "Qualitative risk assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Internal risk assessment", 
        isCorrect: false, 
        whyWrong: "Internal refers to who conducts the audit, not the speed or methodology." 
      },
      { 
        text: "External risk assessment", 
        isCorrect: false, 
        whyWrong: "External refers to third-party auditors." 
      },
      { 
        text: "Quantitative risk assessment", 
        isCorrect: false, 
        whyWrong: "Quantitative risk assessments require extensive time to gather complex historical financial figures." 
      }
    ],
    laymanExplanation: "Qualitative Risk Assessment is much faster! Using expert team ratings (Low, Medium, High) saves time compared to gathering months of historical asset cost data for quantitative math."
  },
  {
    id: 110,
    question: "Chuck wants to conduct a quantitative risk assessment. Which of the following will he need to be able to determine the single loss expectancy (SLE) for a server?",
    options: [
      { 
        text: "The cost of the server (Asset Value)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Its purchase date", 
        isCorrect: false, 
        whyWrong: "Purchase date tracks accounting depreciation, but SLE relies on Asset Value." 
      },
      { 
        text: "Which department manages the server", 
        isCorrect: false, 
        whyWrong: "Department ownership assigns risk owners, but doesn't calculate dollar loss." 
      },
      { 
        text: "The operating system the server uses", 
        isCorrect: false, 
        whyWrong: "OS type identifies software vulnerabilities, not financial asset value." 
      }
    ],
    laymanExplanation: "SLE = Asset Value × Exposure Factor! To calculate Single Loss Expectancy (SLE), you must know the financial cost/value of the server."
  },
  {
    id: 111,
    question: "Shawna's organization has undertaken reasonable steps to meet their compliance requirements for data handling. What is this process or effort called?",
    options: [
      { 
        text: "Due diligence", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data stewardship", 
        isCorrect: false, 
        whyWrong: "Data stewardship is data quality and data lifecycle management." 
      },
      { 
        text: "Attestation", 
        isCorrect: false, 
        whyWrong: "Attestation is a formal written CPA audit sign-off declaration." 
      },
      { 
        text: "Data sanctioning", 
        isCorrect: false, 
        whyWrong: "Data sanctioning is not a standard security term." 
      }
    ],
    laymanExplanation: "Due Diligence means taking reasonable steps! It refers to researching, investigating, and implementing necessary security controls to meet legal compliance standards."
  },
  {
    id: 112,
    question: "Jeremy knows that his customer data is worth $500,000, and that the value of the data would be reduced by 25 percent if it was exposed. What is the Single Loss Expectancy (SLE) for this data?",
    options: [
      { 
        text: "$125,000", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "$25,000", 
        isCorrect: false, 
        whyWrong: "Incorrect math calculation." 
      },
      { 
        text: "$250,000", 
        isCorrect: false, 
        whyWrong: "Calculates 50% exposure instead of 25%." 
      },
      { 
        text: "$375,000", 
        isCorrect: false, 
        whyWrong: "Calculates remaining asset value (75%), not the financial loss (25%)." 
      }
    ],
    laymanExplanation: "SLE = Asset Value × Exposure Factor! $500,000 × 0.25 (25%) = $125,000 single loss per event."
  },
  {
    id: 113,
    question: "Ian wants to calculate the annualized loss expectancy (ALE) for an asset. What two values does he need to know?",
    options: [
      { 
        text: "SLE and ARO", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "ARO and MTBF", 
        isCorrect: false, 
        whyWrong: "MTBF measures device lifespan." 
      },
      { 
        text: "SLE and RPO", 
        isCorrect: false, 
        whyWrong: "RPO measures acceptable data loss windows." 
      },
      { 
        text: "MTBF and RTO", 
        isCorrect: false, 
        whyWrong: "MTBF and RTO are operational reliability and recovery metrics." 
      }
    ],
    laymanExplanation: "ALE = SLE × ARO! Annualized Loss Expectancy (ALE) equals Single Loss Expectancy (SLE) multiplied by Annualized Rate of Occurrence (ARO)."
  },
  {
    id: 114,
    question: "Waylon is charged with ensuring that risks related to customer data used as part of his organization's primary application are managed appropriately. What is his role?",
    options: [
      { 
        text: "Risk owner", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Board member", 
        isCorrect: false, 
        whyWrong: "Board members provide high-level corporate governance oversight." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processors process data under contract." 
      },
      { 
        text: "Auditor", 
        isCorrect: false, 
        whyWrong: "Auditors independently review compliance." 
      }
    ],
    laymanExplanation: "A Risk Owner is assigned accountability! They are responsible for monitoring, managing, and mitigating a specific risk within their department."
  },
  {
    id: 115,
    question: "Nathaniel's organization is reviewing potential issues that may result from noncompliance with regulations that apply to his company. Which of the following would create the most significant operational harm?",
    options: [
      { 
        text: "Loss of license", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Reputational damage", 
        isCorrect: false, 
        whyWrong: "Reputational damage hurts public brand image, but losing a license immediately halts all business operations." 
      },
      { 
        text: "Fines", 
        isCorrect: false, 
        whyWrong: "Fines represent financial penalties, but businesses can continue operating while paying fines." 
      },
      { 
        text: "Contractual impacts", 
        isCorrect: false, 
        whyWrong: "Contractual impacts affect partner contracts." 
      }
    ],
    laymanExplanation: "Loss of License completely shuts down business operations! Revoking a company's legal operating license forces the business to stop immediately."
  },
  {
    id: 116,
    question: "Susan wants to calculate the annualized loss expectancy for an asset that has a value of $50,000, an exposure factor of 50 percent, and an annual rate of occurrence of 2. What is the annualized loss expectancy (ALE) for the asset?",
    options: [
      { 
        text: "$50,000", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "$5,000", 
        isCorrect: false, 
        whyWrong: "Incorrect math calculation." 
      },
      { 
        text: "$25,000", 
        isCorrect: false, 
        whyWrong: "$25,000 is Single Loss Expectancy (SLE = $50k × 0.50), not ALE." 
      },
      { 
        text: "$100,000", 
        isCorrect: false, 
        whyWrong: "Calculates total asset value × ARO without applying exposure factor." 
      }
    ],
    laymanExplanation: "Step 1: SLE = $50,000 × 0.50 = $25,000. Step 2: ALE = SLE ($25,000) × ARO (2) = $50,000 per year."
  },
  {
    id: 117,
    question: "Tim's organization knows that a major breach occurs once every four years, resulting in a loss of $250,000 for his organization. What is the annual rate of occurrence (ARO) that Tim should use in his risk calculations?",
    options: [
      { 
        text: "0.25", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "$75,000", 
        isCorrect: false, 
        whyWrong: "ARO is a numerical rate/frequency per year, not a dollar figure." 
      },
      { 
        text: "0.75", 
        isCorrect: false, 
        whyWrong: "0.75 equals 3 breaches every 4 years." 
      },
      { 
        text: "$50,000", 
        isCorrect: false, 
        whyWrong: "Dollar figures represent SLE or ALE calculations." 
      }
    ],
    laymanExplanation: "ARO = 1 / 4 years = 0.25 events per year! If an event happens once every 4 years, its annual frequency is 0.25."
  },
  {
    id: 118,
    question: "Charlene wants to calculate the annualized loss expectancy for a risk event. What two factors does she need to know to calculate the ALE for a risk?",
    options: [
      { 
        text: "ARO and SLE", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "ARO and TCO", 
        isCorrect: false, 
        whyWrong: "TCO measures Total Cost of Ownership." 
      },
      { 
        text: "SLE and RPO", 
        isCorrect: false, 
        whyWrong: "RPO measures acceptable data loss time." 
      },
      { 
        text: "TCO and RPO", 
        isCorrect: false, 
        whyWrong: "TCO and RPO are financial accounting and recovery metrics." 
      }
    ],
    laymanExplanation: "ALE = ARO × SLE! Annualized Loss Expectancy requires Annualized Rate of Occurrence (ARO) and Single Loss Expectancy (SLE)."
  },
  {
    id: 119,
    question: "John is conducting a penetration test of a client's network. He is currently gathering information from sources such as archive.org, netcraft.com, social media, and information websites. What best describes this stage?",
    options: [
      { 
        text: "Passive reconnaissance", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Active reconnaissance", 
        isCorrect: false, 
        whyWrong: "Active reconnaissance probes target IP ports directly using Nmap." 
      },
      { 
        text: "Initial exploitation", 
        isCorrect: false, 
        whyWrong: "Initial exfiltration/exploitation fires attack payloads against target vulnerabilities." 
      },
      { 
        text: "Pivot", 
        isCorrect: false, 
        whyWrong: "Pivoting uses a compromised system to attack other internal systems." 
      }
    ],
    laymanExplanation: "Passive Reconnaissance uses third-party websites (like archive.org or Netcraft) to gather target information without touching the target's servers directly."
  },
  {
    id: 120,
    question: "Juan is responsible for incident response at a large financial institution. He discovers that the company Wi-Fi has been breached. The attacker used the same login credentials that ship with the wireless access point (WAP). The attacker was able to use those credentials to access the WAP administrative console and make changes. Which of the following best describes the lack of standards or procedures that caused this vulnerability to exist?",
    options: [
      { 
        text: "Using default settings", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Improperly configured accounts", 
        isCorrect: false, 
        whyWrong: "Improper configuration refers to wrong access permissions, whereas leaving default admin/admin passwords is using default settings." 
      },
      { 
        text: "Untrained users", 
        isCorrect: false, 
        whyWrong: "User awareness training affects employee phishing responses, not IT technician device hardening." 
      },
      { 
        text: "Failure to patch systems", 
        isCorrect: false, 
        whyWrong: "Patching updates software bugs, while changing factory default passwords is device hardening." 
      }
    ],
    laymanExplanation: "Using Default Settings is a dangerous hardening oversight! Leaving factory default passwords (like admin/admin) on access points allows attackers to easily hijack administrative control."
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

export default function Domain5DumpsBatch6Mcq({ onBack }) {
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
            Batch 6: Questions 101 - 120 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering Ad Hoc Risk Assessments, MTTR, MSAs, Database Journaling RPO, Warm Site Activation, Quantitative Risk Math (SLE, ARO, ALE), Due Diligence, and Default Password Hardening!
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
            <h4 className="text-3xl font-black text-slate-900">Batch 6 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 6 (Questions 101 - 120) of the Exam Dumps Vault!'
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
