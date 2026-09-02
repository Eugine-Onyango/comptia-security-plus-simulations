import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 21,
    question: "As part of her organization's marketing efforts, Julie's team gathers information about customers and others who visit their website. Julie has engaged an analytics company that uses the data gathered to identify trends and potential new market opportunities. What data role does this third-party company play?",
    options: [
      { 
        text: "Data processor", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data owner", 
        isCorrect: false, 
        whyWrong: "The data owner is an internal executive accountable for defining classification and usage policies for company datasets." 
      },
      { 
        text: "Data controller", 
        isCorrect: false, 
        whyWrong: "Julie's organization is the data controller because they collected the customer data and determined its marketing purpose." 
      },
      { 
        text: "Data custodian", 
        isCorrect: false, 
        whyWrong: "Data custodians are internal IT technicians responsible for technical backups and server storage maintenance." 
      }
    ],
    laymanExplanation: "The analytics vendor is a Data Processor! Because Julie's company (the Controller) hired them to process and analyze customer data according to corporate instructions, the third-party company acts as the Data Processor."
  },
  {
    id: 22,
    question: "Neil's organization has signed a contract that includes guarantees of 99.9 percent uptime. What type of agreement has Neil's organization created?",
    options: [
      { 
        text: "An SLA (Service Level Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An MSA (Master Services Agreement)", 
        isCorrect: false, 
        whyWrong: "An MSA is an overarching contract governing general legal terms for future work orders, but doesn't specify specific uptime metrics." 
      },
      { 
        text: "An NDA (Non-Disclosure Agreement)", 
        isCorrect: false, 
        whyWrong: "An NDA protects proprietary trade secrets and confidential information from being shared with outsiders." 
      },
      { 
        text: "A MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF is a hardware reliability metric estimating lifespan between hardware faults, not a contract agreement." 
      }
    ],
    laymanExplanation: "A Service Level Agreement (SLA) is a performance promise! It legally guarantees service levels (like 99.9% uptime) and sets penalty refunds if the vendor fails to meet the target."
  },
  {
    id: 23,
    question: "Which of the following best describes a data controller?",
    options: [
      { 
        text: "Determines the purpose and methods of processing data", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Manages the flow of data between custodians", 
        isCorrect: false, 
        whyWrong: "Managing data flow between technical staff is a operational task performed by data stewards and custodians." 
      },
      { 
        text: "Creates and formats data when it is collected or created", 
        isCorrect: false, 
        whyWrong: "Creating and formatting data is performed by data entry staff or automated software tools." 
      },
      { 
        text: "Any system that handles data", 
        isCorrect: false, 
        whyWrong: "Any system handling data describes IT infrastructure, not the legal Data Controller entity." 
      }
    ],
    laymanExplanation: "The Data Controller is the decision maker! Under privacy laws (like GDPR), the controller decides WHY personal data is collected and HOW it will be processed."
  },
  {
    id: 24,
    question: "As part of his role, Augie is responsible for implementation of business rules related to data, as well as for storage, and use of data and datasets. What data-related role does Augie hold?",
    options: [
      { 
        text: "Data custodian", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data owner", 
        isCorrect: false, 
        whyWrong: "Data owners set high-level classification policies and permissions, but don't perform day-to-day technical storage tasks." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processors are external third-party vendors processing data under contract." 
      },
      { 
        text: "Data subject", 
        isCorrect: false, 
        whyWrong: "Data subjects are individual humans whose personal details are stored." 
      }
    ],
    laymanExplanation: "A Data Custodian is the hands-on keeper of data! They handle the practical IT technical work — configuring database storage, running backups, enforcing access controls, and maintaining datasets."
  },
  {
    id: 25,
    question: "Which of the following penalties is most typically imposed on a country rather than on a company?",
    options: [
      { 
        text: "Sanctions", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Fines", 
        isCorrect: false, 
        whyWrong: "Fines are monetary penalties assessed against companies by regulatory authorities for compliance violations." 
      },
      { 
        text: "Loss of license", 
        isCorrect: false, 
        whyWrong: "Loss of license revokes a company's legal authorization to operate in a jurisdiction or industry." 
      },
      { 
        text: "Mandatory reporting", 
        isCorrect: false, 
        whyWrong: "Mandatory reporting requires companies to report data breaches to government regulators within a set timeframe." 
      }
    ],
    laymanExplanation: "Sanctions are nation-level economic penalties! Governments and global bodies (like the UN) place sanctions on countries to restrict international trade and financial transactions."
  },
  {
    id: 26,
    question: "Which of the following is NOT a commonly used term to describe risk appetite?",
    options: [
      { 
        text: "Intentional", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Neutral", 
        isCorrect: false, 
        whyWrong: "Neutral risk appetite balances risk taking with risk mitigation." 
      },
      { 
        text: "Expansionary", 
        isCorrect: false, 
        whyWrong: "Expansionary risk appetite willingly accepts higher risks to pursue aggressive business growth." 
      },
      { 
        text: "Conservative", 
        isCorrect: false, 
        whyWrong: "Conservative risk appetite avoids risky ventures to prioritize stability and compliance." 
      }
    ],
    laymanExplanation: "Risk appetite describes how much risk a business is willing to take (Conservative, Neutral, or Expansionary). 'Intentional' is not a recognized risk appetite model term."
  },
  {
    id: 27,
    question: "What does a data steward do in an organization?",
    options: [
      { 
        text: "Oversee data throughout its life cycle", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Create data", 
        isCorrect: false, 
        whyWrong: "Creating data is done by end users, systems, or data collection tools." 
      },
      { 
        text: "Carry out data use and security policies", 
        isCorrect: false, 
        whyWrong: "Carrying out technical security policies and backups is the responsibility of data custodians." 
      },
      { 
        text: "Explain compliance requirements for data", 
        isCorrect: false, 
        whyWrong: "Explaining legal compliance requirements is handled by legal counsel or Data Protection Officers (DPOs)." 
      }
    ],
    laymanExplanation: "A Data Steward oversees data governance and quality! They make sure data definitions are accurate, clean, and properly maintained from collection to retirement."
  },
  {
    id: 28,
    question: "Marcus determines what organizationally owned data is used for a given purpose and how it is processed. What data role does he have in his organization?",
    options: [
      { 
        text: "Data controller", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Supervisory authority", 
        isCorrect: false, 
        whyWrong: "Supervisory authorities are independent public government agencies enforcing data privacy laws." 
      },
      { 
        text: "Data protection officer (DPO)", 
        isCorrect: false, 
        whyWrong: "DPOs advise organizations on privacy compliance and act as a liaison with regulators." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processors process data strictly under instructions from the controller." 
      }
    ],
    laymanExplanation: "Marcus is acting as the Data Controller! Anyone who decides the purpose and methods of processing data holds the Data Controller role."
  },
  {
    id: 29,
    question: "Colleen's organization has deployed web application firewalls (WAFs) to protect their web services from being impacted by a known SQL injection attack. What risk management strategy has the organization adopted?",
    options: [
      { 
        text: "Mitigate", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Transfer", 
        isCorrect: false, 
        whyWrong: "Transferring risk buys insurance or outsources liability to a third party." 
      },
      { 
        text: "Accept", 
        isCorrect: false, 
        whyWrong: "Accepting risk means choosing to do nothing and absorbing potential breach costs." 
      },
      { 
        text: "Avoid", 
        isCorrect: false, 
        whyWrong: "Avoiding risk means completely shutting down or eliminating the web application." 
      }
    ],
    laymanExplanation: "Deploying security tools is Risk Mitigation! Installing a Web Application Firewall (WAF) puts up a defensive barrier to reduce the likelihood and impact of SQL injection attacks."
  },
  {
    id: 30,
    question: "Requiring all web traffic to be sent via HTTPS is an example of what type of standard?",
    options: [
      { 
        text: "Encryption standard", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Access control standard", 
        isCorrect: false, 
        whyWrong: "Access control standards dictate permissions, login hours, and authentication rules." 
      },
      { 
        text: "Password standard", 
        isCorrect: false, 
        whyWrong: "Password standards define minimum password lengths, complexity, and rotation rules." 
      },
      { 
        text: "Physical security standard", 
        isCorrect: false, 
        whyWrong: "Physical security standards specify physical barrier controls like locks, fences, and mantraps." 
      }
    ],
    laymanExplanation: "HTTPS mandates SSL/TLS Transport Encryption! Requiring HTTPS ensures all web traffic between browser and web server is encrypted in transit."
  },
  {
    id: 31,
    question: "Why are cloud IaaS (Infrastructure as a Service) vendors unlikely to agree to including a right-to-audit clause in their contracts?",
    options: [
      { 
        text: "The risk to their other customers is too great", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The cost of the assessment is too high", 
        isCorrect: false, 
        whyWrong: "Cost is paid by the auditor, not the primary reason cloud providers refuse physical audits." 
      },
      { 
        text: "They may not pass the audit", 
        isCorrect: false, 
        whyWrong: "Major cloud providers pass rigorous SOC 2 and ISO audits routinely." 
      },
      { 
        text: "They have competing regulatory requirements", 
        isCorrect: false, 
        whyWrong: "Regulatory rules encourage auditing; multi-tenant customer privacy protection is the main barrier." 
      }
    ],
    laymanExplanation: "Shared cloud servers host thousands of companies! Allowing one customer's auditors physical access to scan cloud data centers would risk exposing other customers' confidential data."
  },
  {
    id: 32,
    question: "Chuck's organization requires that user accounts only be able to log in during the staff member's working hours. What type of standard would drive a setting like this?",
    options: [
      { 
        text: "Access control standard", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Encryption standard", 
        isCorrect: false, 
        whyWrong: "Encryption standards govern cryptographic key lengths and ciphers." 
      },
      { 
        text: "Password standard", 
        isCorrect: false, 
        whyWrong: "Password standards specify password lengths, history, and complexity rules." 
      },
      { 
        text: "Physical security standard", 
        isCorrect: false, 
        whyWrong: "Physical security standards govern door locks, badges, and server room access." 
      }
    ],
    laymanExplanation: "Time-of-day restrictions are Access Control rules! Setting user account login windows to match working hours prevents unauthorized after-hours access."
  },
  {
    id: 33,
    question: "Frankie wants to establish her organization's encryption standard. Which of the following should she recommend for a default encryption algorithm for general use if cryptographic strength is a critical feature?",
    options: [
      { 
        text: "AES-256", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "AES-128", 
        isCorrect: false, 
        whyWrong: "AES-128 is secure, but AES-256 provides maximum cryptographic strength." 
      },
      { 
        text: "SHA-1", 
        isCorrect: false, 
        whyWrong: "SHA-1 is a deprecated hashing function, not an encryption algorithm." 
      },
      { 
        text: "SHA-2", 
        isCorrect: false, 
        whyWrong: "SHA-2 (SHA-256) is a hashing algorithm used for integrity, not data encryption." 
      }
    ],
    laymanExplanation: "AES-256 is the gold standard of symmetric encryption! It uses 256-bit secret keys to provide ultra-strong military-grade data protection."
  },
  {
    id: 34,
    question: "Jill's organization has selected Agile with a CI/CD process for their organization. What type of policy would document this selection?",
    options: [
      { 
        text: "Software development life cycle (SDLC) policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Business continuity policy", 
        isCorrect: false, 
        whyWrong: "Business continuity policies outline how core business functions survive disasters." 
      },
      { 
        text: "Disaster recovery policy", 
        isCorrect: false, 
        whyWrong: "Disaster recovery policies govern restoring IT systems after physical or cyber disasters." 
      },
      { 
        text: "Incident response policy", 
        isCorrect: false, 
        whyWrong: "Incident response policies define how security breaches are handled." 
      }
    ],
    laymanExplanation: "SDLC policies rule software creation! Software Development Life Cycle (SDLC) policies document development methodologies like Agile, coding security standards, and CI/CD deployment pipelines."
  },
  {
    id: 35,
    question: "Megan's organization wants to create a change management policy. Which of the following is NOT a typical change type found in a change policy?",
    options: [
      { 
        text: "Legislated changes", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Preauthorized changes", 
        isCorrect: false, 
        whyWrong: "Preauthorized changes are low-risk routine changes pre-approved by policy." 
      },
      { 
        text: "Emergency changes", 
        isCorrect: false, 
        whyWrong: "Emergency changes handle urgent security fixes during an active outage or incident." 
      },
      { 
        text: "Standard changes", 
        isCorrect: false, 
        whyWrong: "Standard changes follow routine, well-documented change procedures." 
      }
    ],
    laymanExplanation: "Change management policies classify changes by risk level (Standard, Preauthorized, and Emergency). 'Legislated changes' is not a change control classification."
  },
  {
    id: 36,
    question: "Liz wants to assess the critical functions of her business and ensure that the systems that are part of those functions are assessed to determine how often they are likely to fail, how long it would take to restore them, and what recovery objectives will be. What process should she engage in?",
    options: [
      { 
        text: "Business Impact Analysis (BIA)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Quantitative risk assessment", 
        isCorrect: false, 
        whyWrong: "Quantitative risk assessments calculate financial loss formulas (SLE, ARO, ALE) rather than operational recovery objectives." 
      },
      { 
        text: "Qualitative risk assessment", 
        isCorrect: false, 
        whyWrong: "Qualitative risk rates risks on Low/Medium/High scales without setting system recovery targets." 
      },
      { 
        text: "Penetration test", 
        isCorrect: false, 
        whyWrong: "Penetration testing simulates cyberattacks to exploit security weaknesses." 
      }
    ],
    laymanExplanation: "Business Impact Analysis (BIA) calculates disaster targets! It identifies critical business operations and sets Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO)."
  },
  {
    id: 37,
    question: "What describes the key difference between policies and standards?",
    options: [
      { 
        text: "Policies are a statement of intent; standards define how rules help enforce policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Policies are defined by third parties; standards are defined by organizations", 
        isCorrect: false, 
        whyWrong: "Both policies and standards are defined internally by an organization." 
      },
      { 
        text: "Policies are defined by organizations; standards are defined by third parties", 
        isCorrect: false, 
        whyWrong: "Organizations define their own internal standards to support internal policies." 
      },
      { 
        text: "Policies are legally enforceable; standards are optional", 
        isCorrect: false, 
        whyWrong: "Both policies and standards are mandatory within an organization." 
      }
    ],
    laymanExplanation: "Policies set goals ('What we want'); Standards set specific rules ('How we enforce it')! For example, a policy states 'Data must be encrypted', while a standard specifies 'Use AES-256'."
  },
  {
    id: 38,
    question: "Sophie wants to ensure that her vendor meets their SLA. What does Sophie need to do?",
    options: [
      { 
        text: "Ensure performance targets are defined in the contract with appropriate penalties", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Establish key performance indicators (KPIs) for her team and assess them regularly", 
        isCorrect: false, 
        whyWrong: "Internal team KPIs do not enforce legal obligations on external service providers." 
      },
      { 
        text: "Ensure that security levels are not reduced when performing maintenance", 
        isCorrect: false, 
        whyWrong: "Maintenance controls are good practices, but don't provide legal enforcement mechanisms for vendor SLAs." 
      },
      { 
        text: "Determine if supply chain levels are met in order to meet demand", 
        isCorrect: false, 
        whyWrong: "Supply chain monitoring doesn't create contractually binding SLA guarantees." 
      }
    ],
    laymanExplanation: "Put clear targets and penalties in the contract! An SLA only works if it contains specific measurable targets (e.g. 99.9% uptime) and financial penalties if the vendor fails."
  },
  {
    id: 39,
    question: "Tuan is assessing risk and knows that he needs to be able to explain risk to his management. What two factors are combined to describe risk?",
    options: [
      { 
        text: "Probability and Impact", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Impact and acceptance", 
        isCorrect: false, 
        whyWrong: "Acceptance is a risk response strategy, not a risk calculation factor." 
      },
      { 
        text: "Likelihood and ALE", 
        isCorrect: false, 
        whyWrong: "ALE (Annualized Loss Expectancy) is the calculated financial result, not an input factor." 
      },
      { 
        text: "Probability and SLE", 
        isCorrect: false, 
        whyWrong: "SLE (Single Loss Expectancy) measures dollar loss per event, which is combined with ARO to calculate ALE." 
      }
    ],
    laymanExplanation: "Risk = Probability × Impact! How likely is something bad going to happen, and how severe will the damage be if it does?"
  },
  {
    id: 40,
    question: "Marco wants to conduct active reconnaissance of a target for a penetration test. Which of the following is an appropriate action based on this desire?",
    options: [
      { 
        text: "Conducting an Nmap scan", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Looking up information in Shodan", 
        isCorrect: false, 
        whyWrong: "Shodan queries passive search engine data without sending direct network packets to the target." 
      },
      { 
        text: "Querying local DNS for the organization", 
        isCorrect: false, 
        whyWrong: "Querying public DNS servers is passive information gathering." 
      },
      { 
        text: "Using public records to gather information", 
        isCorrect: false, 
        whyWrong: "Searching public SEC or domain registrar records is passive OSINT." 
      }
    ],
    laymanExplanation: "Nmap scanning sends packets directly to target servers! Because Nmap probes active IP ports, it directly touches the target system and counts as Active Reconnaissance."
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

export default function Domain5DumpsBatch2Mcq({ onBack }) {
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
            Batch 2: Questions 21 - 40 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering SLAs, Data Custodians/Controllers, Sanctions, AES-256 Encryption Standards, SDLC Agile Policies, BIA Objectives, and Active Reconnaissance!
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
            <h4 className="text-3xl font-black text-slate-900">Batch 2 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 2 (Questions 21 - 40) of the Exam Dumps Vault!'
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
