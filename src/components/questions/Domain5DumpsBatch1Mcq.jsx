import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 1,
    question: "The company that Scott works for has experienced a data breach, and the personal information of thousands of customers has been exposed. Which of the following impact categories is NOT a concern as described in this scenario?",
    options: [
      { 
        text: "Availability loss", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Reputation", 
        isCorrect: false, 
        whyWrong: "Reputational loss is a major concern because customer trust plummets after personal information is leaked." 
      },
      { 
        text: "Financial", 
        isCorrect: false, 
        whyWrong: "Financial impact is a direct concern due to potential regulatory fines, lawsuits, and credit monitoring costs." 
      },
      { 
        text: "Data loss", 
        isCorrect: false, 
        whyWrong: "Data loss / exposure is the central issue of a data breach where customer record confidentiality is breached." 
      }
    ],
    laymanExplanation: "The breach exposed customer data (a confidentiality issue), which hurts reputation and finances. However, the scenario does NOT state that servers were taken offline or destroyed, so Availability Loss was not an impact."
  },
  {
    id: 2,
    question: "Sameer wants to assess whether the key risk indicators (KRIs) his team have suggested are appropriate for his organization. Which of the following is NOT a common characteristic of a useful KRI?",
    options: [
      { 
        text: "Inexpensive", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Actionable", 
        isCorrect: false, 
        whyWrong: "A useful KRI must be actionable so leadership knows what specific steps to take when a threshold is breached." 
      },
      { 
        text: "Measurable", 
        isCorrect: false, 
        whyWrong: "A KRI must be measurable with concrete metrics so risk levels can be tracked over time." 
      },
      { 
        text: "Relevant", 
        isCorrect: false, 
        whyWrong: "A KRI must be relevant to the organization's strategic goals and risk appetite." 
      }
    ],
    laymanExplanation: "Key Risk Indicators (KRIs) need to be measurable, actionable, and relevant to protect the business. Cost is not a defining metric of a good KRI — some critical risk indicators require sophisticated monitoring tools that cost money."
  },
  {
    id: 3,
    question: "Jill's organization wants to ensure that services and systems are back online and functioning normally within 4 hours of an event or incident. What term best describes this goal?",
    options: [
      { 
        text: "An RTO (Recovery Time Objective)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An MTTR (Mean Time to Repair)", 
        isCorrect: false, 
        whyWrong: "MTTR is a measurement of how long it historically takes to repair a failed device, not a targeted business goal." 
      },
      { 
        text: "An RPO (Recovery Point Objective)", 
        isCorrect: false, 
        whyWrong: "RPO defines the maximum acceptable amount of data loss measured in time (e.g. losing 1 hour of backup data)." 
      },
      { 
        text: "An MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF measures the average expected lifespan of a system between failures." 
      }
    ],
    laymanExplanation: "Recovery Time Objective (RTO) is your downtime deadline! It specifies the maximum time an organization sets to bring systems back online after a disaster (here, 4 hours)."
  },
  {
    id: 4,
    question: "Eric's organization has created a policy document that describes how users can and cannot use the organization's network, systems, and services. What type of policy has he created?",
    options: [
      { 
        text: "An acceptable use policy (AUP)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Business continuity policy", 
        isCorrect: false, 
        whyWrong: "Business continuity policies outline how an organization keeps critical operations running during outages." 
      },
      { 
        text: "An incident response policy", 
        isCorrect: false, 
        whyWrong: "Incident response policies govern how security incidents are identified, contained, and investigated." 
      },
      { 
        text: "This is a standard, not a policy", 
        isCorrect: false, 
        whyWrong: "An AUP is indeed a formal security policy establishing acceptable user behaviors." 
      }
    ],
    laymanExplanation: "An Acceptable Use Policy (AUP) is the employee rulebook for computer usage! It defines what employees are allowed and forbidden to do on corporate computers, Wi-Fi, and email."
  },
  {
    id: 5,
    question: "Angie is performing a penetration test and has gathered information using the Shodan search engine about her target. What type of reconnaissance has she performed?",
    options: [
      { 
        text: "Passive Reconnaissance", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Active Reconnaissance", 
        isCorrect: false, 
        whyWrong: "Active reconnaissance involves sending packets directly to the target system (e.g., port scanning with Nmap)." 
      },
      { 
        text: "Commercial Reconnaissance", 
        isCorrect: false, 
        whyWrong: "Commercial is not a recognized CompTIA penetration testing reconnaissance classification." 
      },
      { 
        text: "Scanner-based Reconnaissance", 
        isCorrect: false, 
        whyWrong: "Directly scanning the target with tools like Nessus or Nmap is active scanning, not passive search engine queries." 
      }
    ],
    laymanExplanation: "Passive Reconnaissance gathers intel without touching the target directly! Looking up information on search engines like Shodan or Google doesn't send any suspicious network traffic to the target's servers."
  },
  {
    id: 6,
    question: "What role do data processors have in an organization under data privacy regulations?",
    options: [
      { 
        text: "They process data on behalf of a controller", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "They determine how data is processed", 
        isCorrect: false, 
        whyWrong: "Determining the purpose and means of processing data is the responsibility of the Data Controller." 
      },
      { 
        text: "They own the data", 
        isCorrect: false, 
        whyWrong: "Data owners are internal business executives responsible for data classification, not external processors." 
      },
      { 
        text: "They contract with third parties to use the data", 
        isCorrect: false, 
        whyWrong: "Processors act under strictly delegated duties from the controller and cannot freely subcontract data without permission." 
      }
    ],
    laymanExplanation: "A Data Processor is a vendor hired to handle data! For example, if your company uses AWS or Payroll Corp to process employee checks, Payroll Corp is the Data Processor following your company's (Data Controller's) orders."
  },
  {
    id: 7,
    question: "Ginger's personal data is used by an organization, including identifiable information like her name, address, and Social Security number. What term best describes Ginger?",
    options: [
      { 
        text: "Data subject", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data owner", 
        isCorrect: false, 
        whyWrong: "Data owners are corporate managers accountable for specific organizational data assets." 
      },
      { 
        text: "Data controller", 
        isCorrect: false, 
        whyWrong: "Data controllers are organizations that decide why and how personal data is collected and processed." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processors are entities that process data on behalf of a controller." 
      }
    ],
    laymanExplanation: "The Data Subject is the human individual whose personal data is being collected! Since Ginger's personal details are stored, Ginger is the Data Subject."
  },
  {
    id: 8,
    question: "Hong's company conducts regular risk assessments. As part of their assessment process, they gather a team of experts who assess risks on a scale from low to high based on their knowledge and experience. What type of risk assessment is Hong's company conducting?",
    options: [
      { 
        text: "Qualitative Risk Assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Quantitative Risk Assessment", 
        isCorrect: false, 
        whyWrong: "Quantitative assessments use exact financial formulas (SLE, ARO, ALE) to calculate dollar values." 
      },
      { 
        text: "Ad hoc Risk Assessment", 
        isCorrect: false, 
        whyWrong: "Ad hoc assessments are unscheduled, temporary assessments performed in response to a sudden event." 
      },
      { 
        text: "Continuous Risk Assessment", 
        isCorrect: false, 
        whyWrong: "Continuous assessment is an automated real-time monitoring process integrated into CI/CD or DevSecOps." 
      }
    ],
    laymanExplanation: "Qualitative Risk Assessment relies on expert opinion and subjective scales (Low, Medium, High) rather than calculating exact financial numbers."
  },
  {
    id: 9,
    question: "How is likelihood measured in qualitative risk assessments?",
    options: [
      { 
        text: "A descriptive scale like high, medium, low", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A numeric scale from 0 to 1", 
        isCorrect: false, 
        whyWrong: "Probability decimal values (0 to 1) are used in mathematical quantitative calculations." 
      },
      { 
        text: "By calculating loss events per year (ARO)", 
        isCorrect: false, 
        whyWrong: "Annual Rate of Occurrence (ARO) is a quantitative risk calculation metric." 
      },
      { 
        text: "A numeric scale from 1 to 100", 
        isCorrect: false, 
        whyWrong: "Descriptive categories (Low, Medium, High) are the defining characteristic of qualitative scales." 
      }
    ],
    laymanExplanation: "Qualitative risk uses simple words! Instead of calculating decimals or financial formulas, it rates likelihood using descriptive categories like Low, Medium, and High."
  },
  {
    id: 10,
    question: "Grace wants to establish a governance structure that will leverage third-party experts who are paid by her organization. What governance structure should she select?",
    options: [
      { 
        text: "Market-based governance", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Board-based governance", 
        isCorrect: false, 
        whyWrong: "Board-based governance uses an internal Board of Directors to set high-level strategy." 
      },
      { 
        text: "Committee-based governance", 
        isCorrect: false, 
        whyWrong: "Committee-based governance uses internal cross-functional employee groups." 
      },
      { 
        text: "Government-based governance", 
        isCorrect: false, 
        whyWrong: "Government-based governance is driven by public regulatory agencies and statutes." 
      }
    ],
    laymanExplanation: "Market-based governance hires external third-party experts! By contracting external audit and advisory firms in the marketplace, the company leverages specialized external oversight."
  },
  {
    id: 11,
    question: "Carmen's organization wants to purchase cybersecurity insurance to offset the cost of potential breaches. What risk management strategy has her organization adopted?",
    options: [
      { 
        text: "Transfer", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Accept", 
        isCorrect: false, 
        whyWrong: "Risk acceptance means choosing to absorb the financial loss without buying insurance or controls." 
      },
      { 
        text: "Avoid", 
        isCorrect: false, 
        whyWrong: "Risk avoidance means completely stopping the risky activity (e.g. shutting down a service)." 
      },
      { 
        text: "Mitigate", 
        isCorrect: false, 
        whyWrong: "Risk mitigation implements technical controls (like firewalls) to reduce likelihood or impact." 
      }
    ],
    laymanExplanation: "Buying insurance is Risk Transfer! You shift the financial burden of a security breach onto the insurance company."
  },
  {
    id: 12,
    question: "Marissa has been recruited to a group that provides oversight for an organization but that doesn't engage in the day-to-day operations of the organization. The group focuses on strategy and direction for the organization and meets a few times a year. What type of governance group is Marissa part of?",
    options: [
      { 
        text: "A board (Board of Directors)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An activist investor's group", 
        isCorrect: false, 
        whyWrong: "Activist investors buy shares to force corporate change, but do not form the official governance board." 
      },
      { 
        text: "A committee", 
        isCorrect: false, 
        whyWrong: "Committees are working groups of internal staff handling operational tasks." 
      },
      { 
        text: "A regulator", 
        isCorrect: false, 
        whyWrong: "Regulators are external government or industry bodies enforcing legal compliance." 
      }
    ],
    laymanExplanation: "A Board of Directors provides high-level vision and governance! They don't manage daily tasks — they meet periodically to guide overall strategy and hold executive leadership accountable."
  },
  {
    id: 13,
    question: "Governance at Selah's organization is delegated to individual business units. This allows the units to determine how to balance their operational needs against their governance processes. What type of governance is this?",
    options: [
      { 
        text: "Decentralized governance", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Centralized governance", 
        isCorrect: false, 
        whyWrong: "Centralized governance forces all business units to follow one single central authority." 
      },
      { 
        text: "Board-based governance", 
        isCorrect: false, 
        whyWrong: "Board-based governance refers to oversight by a Board of Directors." 
      },
      { 
        text: "Committee-based governance", 
        isCorrect: false, 
        whyWrong: "Committee-based governance relies on dedicated internal committees." 
      }
    ],
    laymanExplanation: "Decentralized governance gives power to individual departments! Each department or branch manages its own security and compliance decisions according to its operational needs."
  },
  {
    id: 14,
    question: "Sharon's organization wants to understand the risks that it will experience due to acquiring a new subsidiary, but it needs to conduct the assessment quickly while leveraging their industry expertise. Which of the following risk assessment options should Sharon recommend?",
    options: [
      { 
        text: "Conduct a third-party risk assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Conduct an ad hoc risk assessment", 
        isCorrect: false, 
        whyWrong: "An ad hoc assessment is an internal unscheduled check, lacking specialized third-party acquisition expertise." 
      },
      { 
        text: "Conduct a one-time risk assessment", 
        isCorrect: false, 
        whyWrong: "A one-time assessment doesn't specify leveraging external expert assessment teams." 
      },
      { 
        text: "Build a continuous risk assessment process", 
        isCorrect: false, 
        whyWrong: "Continuous risk assessment takes a long time to build and is used for ongoing automated software delivery." 
      }
    ],
    laymanExplanation: "Hire external experts! A Third-Party Risk Assessment brings in specialized external auditors to evaluate the security of a newly acquired company quickly and objectively."
  },
  {
    id: 15,
    question: "What term describes a third party that takes actions on behalf of a data controller?",
    options: [
      { 
        text: "Data processor", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data subject", 
        isCorrect: false, 
        whyWrong: "The data subject is the individual human whose personal data is collected." 
      },
      { 
        text: "Data owner", 
        isCorrect: false, 
        whyWrong: "The data owner is an internal manager responsible for data classification." 
      },
      { 
        text: "Data administrator", 
        isCorrect: false, 
        whyWrong: "Data administrator is an IT technical role managing database software." 
      }
    ],
    laymanExplanation: "A Data Processor acts on behalf of the controller! Any external vendor or cloud provider processing personal data under the instructions of a data controller is a Data Processor."
  },
  {
    id: 16,
    question: "Which of the following will provide a customer the opportunity to engage a third party to deliver an SOC 2, Type 1 report created by third-party assessors?",
    options: [
      { 
        text: "A right-to-audit clause", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A penetration testing agreement", 
        isCorrect: false, 
        whyWrong: "Penetration testing agreements authorize simulated cyberattacks, not formal SOC 2 audit report sharing." 
      },
      { 
        text: "A risk assessment agreement", 
        isCorrect: false, 
        whyWrong: "Risk assessment agreements govern internal risk evaluation tasks." 
      },
      { 
        text: "A vulnerability scan clause", 
        isCorrect: false, 
        whyWrong: "Vulnerability scan clauses cover automated port and software scanning." 
      }
    ],
    laymanExplanation: "A Right-to-Audit Clause gives you the legal right to inspect vendor security! It allows customers to demand independent SOC 2 audit reports or hire third-party auditors to verify vendor compliance."
  },
  {
    id: 17,
    question: "Isaac has been asked to be his organization's data owner for customer data. Which of the following is NOT a typical part of that role?",
    options: [
      { 
        text: "Processing the data", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Classifying data", 
        isCorrect: false, 
        whyWrong: "Classifying data (e.g., Confidential vs Public) is a primary responsibility of the Data Owner." 
      },
      { 
        text: "Protecting data", 
        isCorrect: false, 
        whyWrong: "Defining protection requirements and access controls is a core responsibility of the Data Owner." 
      },
      { 
        text: "Ensuring the quality of the data", 
        isCorrect: false, 
        whyWrong: "Data owners are responsible for business data accuracy and quality." 
      }
    ],
    laymanExplanation: "Data Owners govern data, they don't process it! Data Owners set classification and permissions. The technical work of running batch jobs or processing data is handled by Data Custodians and Processors."
  },
  {
    id: 18,
    question: "Pedro's organization uses industrial machinery running an unsupported RTOS with a known vulnerability. Policies require unpatchable systems to be decommissioned, but the machinery is core to operations. What risk process should Pedro follow to retain the devices despite the risk?",
    options: [
      { 
        text: "Seek an exception (Security Policy Exception)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Transfer the risk", 
        isCorrect: false, 
        whyWrong: "Transferring risk buys insurance, but doesn't grant authorization to bypass company patch policies." 
      },
      { 
        text: "Document the risk", 
        isCorrect: false, 
        whyWrong: "Documenting alone does not provide official policy authorization to keep non-compliant machinery active." 
      },
      { 
        text: "Mitigate the risk", 
        isCorrect: false, 
        whyWrong: "While Pedro should add compensating controls, formal permission to bypass policy requires an exception." 
      }
    ],
    laymanExplanation: "Apply for an Exception! When operational business needs require running legacy unpatchable machinery, you submit a formal Policy Exception request approved by security leadership."
  },
  {
    id: 19,
    question: "Jake's team has begun handling new customer PII data. Jake takes on a new role responsible for classifying each data element gathered about customers. What is Jake's role?",
    options: [
      { 
        text: "Owner (Data Owner)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Controller", 
        isCorrect: false, 
        whyWrong: "Data Controller is the legal organization determining data collection purposes." 
      },
      { 
        text: "Custodian", 
        isCorrect: false, 
        whyWrong: "Data Custodians handle technical storage, backups, and IT maintenance." 
      },
      { 
        text: "Processor", 
        isCorrect: false, 
        whyWrong: "Data Processors are external vendors processing data under controller instructions." 
      }
    ],
    laymanExplanation: "Data Owners classify data! The executive or manager responsible for assigning labels like 'Confidential' or 'Restricted' is the Data Owner."
  },
  {
    id: 20,
    question: "Which of the following measures is NOT commonly used as part of a business impact analysis (BIA)?",
    options: [
      { 
        text: "ARO (Annualized Rate of Occurrence)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO is a primary BIA metric defining how fast systems must be restored after a disaster." 
      },
      { 
        text: "MTTR (Mean Time to Repair)", 
        isCorrect: false, 
        whyWrong: "MTTR is a key BIA recovery metric tracking repair time for failed systems." 
      },
      { 
        text: "MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF is a standard BIA reliability metric estimating average device lifespan." 
      }
    ],
    laymanExplanation: "ARO belongs to Risk Calculations, not BIA! Annualized Rate of Occurrence (ARO) is used in quantitative risk formulas (ALE = SLE × ARO). Business Impact Analysis focuses on recovery metrics like RTO, RPO, and MTTR."
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

export default function Domain5DumpsBatch1Mcq({ onBack }) {
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
          <span>Back to Domain 5.0</span>
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
            Domain 5.0 Practice Bank (Questions 1 - 20) 📋
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Official scenario questions covering KRIs, RTO/RPO, Acceptable Use Policies, Passive Reconnaissance, Data Controllers/Processors/Subjects, Risk Assessment (Qualitative vs Quantitative), Governance Boards, Third-Party Audits, and BIA Metrics!
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
            <h4 className="text-3xl font-black text-slate-900">Exam Practice Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 1 (Questions 1 - 20) of Domain 5.0!'
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
