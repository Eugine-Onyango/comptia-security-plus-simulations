import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 81,
    question: "Cristobal wants to ensure that a vendor his company is considering hiring has conducted an SOC 2, Type 2 audit that is reliable and that will reveal any critical issues. What should he ensure was done?",
    options: [
      { 
        text: "An independent, third-party audit", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An internal audit with attestation by the CEO", 
        isCorrect: false, 
        whyWrong: "Internal audits signed by company CEOs lack independent objective credibility for external partners." 
      },
      { 
        text: "A self-assessment", 
        isCorrect: false, 
        whyWrong: "Self-assessments are filled out internally by the vendor without independent auditor verification." 
      },
      { 
        text: "A third-party penetration test with attestation", 
        isCorrect: false, 
        whyWrong: "Penetration tests probe network ports, whereas SOC 2 audits evaluate overall security management controls." 
      }
    ],
    laymanExplanation: "SOC 2 reports require Independent Third-Party Audits! Only a report conducted by an independent certified CPA accounting firm provides reliable, unbiased verification of vendor security."
  },
  {
    id: 82,
    question: "Kim's organization has assessed the risk of floods that may impact their datacenter and has determined that the likely rate of occurrence and its cost if it does occur are not acceptable. Given this, the organization has opted to move their datacenter in the next year. What has occurred?",
    options: [
      { 
        text: "The risk passed their risk threshold", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The risk dropped below their risk threshold", 
        isCorrect: false, 
        whyWrong: "If risk dropped below the threshold, the risk would be acceptable and moving the data center wouldn't be necessary." 
      },
      { 
        text: "The risk assessment failed", 
        isCorrect: false, 
        whyWrong: "The risk assessment succeeded in identifying that the risk exceeded acceptable business limits." 
      },
      { 
        text: "A control failure occurred", 
        isCorrect: false, 
        whyWrong: "Moving the data center is a proactive risk response, not a failure of existing controls." 
      }
    ],
    laymanExplanation: "The flood risk exceeded their Risk Threshold! When a risk passes the maximum level of acceptable damage a business can tolerate, leadership takes action (like relocating)."
  },
  {
    id: 83,
    question: "Vanessa's organization is a US-based health-care organization that is required to be compliant with HIPAA. What type of external assessment should they conduct?",
    options: [
      { 
        text: "Regulatory assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Offensive assessment", 
        isCorrect: false, 
        whyWrong: "Offensive assessments (Red Teaming) simulate cyberattacks rather than checking statutory HIPAA rules." 
      },
      { 
        text: "Known environment assessment", 
        isCorrect: false, 
        whyWrong: "Known environment refers to white-box pentesting information models." 
      },
      { 
        text: "Physical assessment", 
        isCorrect: false, 
        whyWrong: "Physical assessments focus solely on doors and facility guards." 
      }
    ],
    laymanExplanation: "HIPAA compliance requires a Regulatory Assessment! Auditing compliance against federal healthcare laws (HIPAA) evaluates legal regulatory requirements."
  },
  {
    id: 84,
    question: "Jaime wants to establish her organization's change management policy. What should the policy include?",
    options: [
      { 
        text: "High-level descriptions of how the organization will review, approve, and implement proposed changes", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A detailed process for review and approval of changes", 
        isCorrect: false, 
        whyWrong: "Detailed step-by-step review workflows belong in change management procedures, not top-level policies." 
      },
      { 
        text: "Descriptions of how a change request should be created, formatted, reviewed, and approved", 
        isCorrect: false, 
        whyWrong: "Form formatting and specific ticket fields belong in technical standards." 
      },
      { 
        text: "An outline of the regulatory requirements for changes", 
        isCorrect: false, 
        whyWrong: "Regulatory outlines provide compliance context, but policies define management intent." 
      }
    ],
    laymanExplanation: "Policies state high-level management intent ('What we require')! A change policy outlines overall expectations for reviewing and approving changes, leaving detailed step-by-step forms to procedures."
  },
  {
    id: 85,
    question: "Marek's organization has a system that needs to receive a deviation from a defined security process. What best practice should he follow to ensure that this is done correctly?",
    options: [
      { 
        text: "All of the above", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "He should conduct a risk assessment and document the results", 
        isCorrect: false, 
        whyWrong: "Conducting a risk assessment is necessary, but must also be paired with network protection and formal change approval." 
      },
      { 
        text: "He should remove the system from the network segment to protect it", 
        isCorrect: false, 
        whyWrong: "Isolating the system adds compensating controls, but also requires risk assessment and formal approval." 
      },
      { 
        text: "He should ensure the deviation is approved through change management processes", 
        isCorrect: false, 
        whyWrong: "Formal approval is required, but must be accompanied by risk documentation and technical isolation." 
      }
    ],
    laymanExplanation: "Follow all security deviation practices! When granting a policy exception: 1) Assess and document the risk, 2) Isolate the system with compensating controls, and 3) Get formal approval through change control."
  },
  {
    id: 86,
    question: "What is the key difference between a business continuity plan (BCP) and a business continuity policy?",
    options: [
      { 
        text: "The plan describes how an organization will respond, whereas the policy outlines the high-level intent of the organization's business continuity efforts", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The plan includes detailed steps for each part of the response, including how to restore systems and investigate issues, whereas the policy outlines the high-level intent", 
        isCorrect: false, 
        whyWrong: "System restoration details belong in Disaster Recovery (DR) plans and Incident Response playbooks." 
      },
      { 
        text: "The plan describes the high-level intent of the organization's business continuity efforts, whereas the incident response policy describes how the organization will respond", 
        isCorrect: false, 
        whyWrong: "This reverses the roles; plans describe response actions while policies describe high-level intent." 
      },
      { 
        text: "They are the same; the terms are interchangeable", 
        isCorrect: false, 
        whyWrong: "Policies establish governance intent; plans detail execution strategies." 
      }
    ],
    laymanExplanation: "Policies establish intent ('What'); Plans outline response strategy ('How')! The policy sets business continuity goals, while the plan details how teams respond during an outage."
  },
  {
    id: 87,
    question: "Christina has prepared a document that includes high-level statements about how her organization will handle major incidents and what its overall stance on incidents is. What has she created?",
    options: [
      { 
        text: "An incident response policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An incident response process", 
        isCorrect: false, 
        whyWrong: "Incident response processes outline flowcharts for handling incident stages." 
      },
      { 
        text: "A runbook", 
        isCorrect: false, 
        whyWrong: "Runbooks provide step-by-step IT administration checklists for routine tasks." 
      },
      { 
        text: "An incident response standard", 
        isCorrect: false, 
        whyWrong: "Standards mandate specific tools and mandatory technical rules." 
      }
    ],
    laymanExplanation: "High-level stance statements form an Incident Response Policy! It establishes executive authority, response principles, and management goals for cyber incidents."
  },
  {
    id: 88,
    question: "Terry wants to have all of his account data removed from organizations he has interacted with. What GDPR right can he leverage if he is an EU citizen?",
    options: [
      { 
        text: "The right to be forgotten (Right to Erasure)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data stewardship", 
        isCorrect: false, 
        whyWrong: "Data stewardship is an internal data governance role overseeing data quality." 
      },
      { 
        text: "Personal data ownership", 
        isCorrect: false, 
        whyWrong: "Personal data ownership refers to legal data rights, but is not the specific GDPR deletion article." 
      },
      { 
        text: "His HIPAA rights", 
        isCorrect: false, 
        whyWrong: "HIPAA is a US healthcare law protecting medical records, not EU GDPR account deletion." 
      }
    ],
    laymanExplanation: "Terry can use the 'Right to be Forgotten'! Under GDPR Article 17, individuals can request that companies completely delete all their personal data."
  },
  {
    id: 89,
    question: "Probability and impact are used to rate what key security item?",
    options: [
      { 
        text: "Risk", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Cost", 
        isCorrect: false, 
        whyWrong: "Cost is a single financial figure, not a matrix calculation of likelihood and damage." 
      },
      { 
        text: "Vulnerability", 
        isCorrect: false, 
        whyWrong: "Vulnerabilities are software or physical weaknesses that exist regardless of probability." 
      },
      { 
        text: "Audit findings", 
        isCorrect: false, 
        whyWrong: "Audit findings document compliance non-conformities." 
      }
    ],
    laymanExplanation: "Probability and Impact determine Risk! Risk = Likelihood × Severity."
  },
  {
    id: 90,
    question: "Gary wants to determine the probability of a risk occurring. What should he base his assessment on if he is performing a qualitative risk assessment?",
    options: [
      { 
        text: "A rating from an experienced team of staff", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A calculated rate of occurrence using industry statistical data", 
        isCorrect: false, 
        whyWrong: "Statistical formulas calculate quantitative ARO figures." 
      },
      { 
        text: "The number of times it has happened to their competitors in a year", 
        isCorrect: false, 
        whyWrong: "Competitor event frequency forms historical quantitative input data." 
      },
      { 
        text: "Actuarial tables provided by his insurance broker", 
        isCorrect: false, 
        whyWrong: "Actuarial tables provide exact mathematical probability numbers for insurance pricing." 
      }
    ],
    laymanExplanation: "Qualitative risk relies on expert staff ratings! It uses judgment and experience to assign qualitative ratings (Low, Medium, High)."
  },
  {
    id: 91,
    question: "Which of the following is NOT a common element for a penetration test's rules of engagement?",
    options: [
      { 
        text: "A list of passwords", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Handling of sensitive and pentest-related data", 
        isCorrect: false, 
        whyWrong: "Data handling protocols specify how discovered sensitive files must be encrypted and destroyed." 
      },
      { 
        text: "A list of in-scope IPs or domains", 
        isCorrect: false, 
        whyWrong: "Target IP ranges and domain boundaries are mandatory elements of Rules of Engagement." 
      },
      { 
        text: "A list of emergency contacts", 
        isCorrect: false, 
        whyWrong: "Emergency phone contacts are required so testing can be halted immediately if systems fail." 
      }
    ],
    laymanExplanation: "Rules of Engagement (RoE) specify boundaries, schedules, and emergency contacts — NOT a cheat sheet of production passwords!"
  },
  {
    id: 92,
    question: "Maeve is preparing to sign a penetration testing contract with a third-party security service provider. The security service provider provides a questionnaire that asks the scope of systems that can and cannot be tested, the schedule and times that penetration testing can and cannot occur, and what to do if a preexisting compromise is discovered. What document is the third-party service provider assembling?",
    options: [
      { 
        text: "Rules of engagement (RoE)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A right-to-audit clause", 
        isCorrect: false, 
        whyWrong: "Right-to-audit clauses entitle customers to review vendor SOC audit reports." 
      },
      { 
        text: "A service-level agreement", 
        isCorrect: false, 
        whyWrong: "SLAs govern system uptime and availability targets." 
      },
      { 
        text: "A memorandum of understanding", 
        isCorrect: false, 
        whyWrong: "MOUs establish informal agreements between organizational entities." 
      }
    ],
    laymanExplanation: "Rules of Engagement (RoE) define pentest ground rules! It documents target scopes, permitted test hours, allowed attack methods, and emergency escalation contacts."
  },
  {
    id: 93,
    question: "Alaina wants to describe the level of impact and probability where her organization will either accept or attempt to mitigate or otherwise handle a risk at. What term describes this?",
    options: [
      { 
        text: "Risk threshold", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Ad hoc risk level", 
        isCorrect: false, 
        whyWrong: "Ad hoc refers to unscheduled temporary risk events." 
      },
      { 
        text: "Third-party risk level", 
        isCorrect: false, 
        whyWrong: "Third-party risk levels evaluate external vendor risk exposure." 
      },
      { 
        text: "Risk appetite", 
        isCorrect: false, 
        whyWrong: "Risk appetite is the broad overall willingness to accept risk across the whole enterprise." 
      }
    ],
    laymanExplanation: "Risk Threshold is the dividing line! On a risk matrix, any risk crossing above the risk threshold requires action (mitigation/transfer), while risks below it are accepted."
  },
  {
    id: 94,
    question: "Alaina has been asked to create an AUP for her organization. Which of the following should she include?",
    options: [
      { 
        text: "A description of acceptable use by organizational users", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An access and usage policy that lists times and roles allowed to access specific resources", 
        isCorrect: false, 
        whyWrong: "Role and time restrictions belong in Access Control policies." 
      },
      { 
        text: "A document that describes how the organization intends to approach change and related functions", 
        isCorrect: false, 
        whyWrong: "Change management policies govern system modifications." 
      },
      { 
        text: "An antivirus (AV) update policy that describes when and how AV updates are deployed", 
        isCorrect: false, 
        whyWrong: "Antivirus deployment policies govern endpoint technical updates." 
      }
    ],
    laymanExplanation: "An Acceptable Use Policy (AUP) specifies user rules! It defines what employees can and cannot do on company computers, networks, and internet connections."
  },
  {
    id: 95,
    question: "Kyle's organization is a very well-known, multinational organization. A recent data breach has exposed data for millions of customers, including all of their account information. As part of the breach, Kyle's company was discovered to have not followed common security practices, and in fact was operating in intentionally careless ways. Which of the following consequences should he highlight as most critical to the organization's ongoing operations when he considers their customer base?",
    options: [
      { 
        text: "Reputational damage", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Fines", 
        isCorrect: false, 
        whyWrong: "Fines cost money, but severe reputational damage can destroy customer trust and crash the business entirely." 
      },
      { 
        text: "Due diligence", 
        isCorrect: false, 
        whyWrong: "Due diligence is a standard of care practice, not a negative consequence." 
      },
      { 
        text: "Contractual impacts", 
        isCorrect: false, 
        whyWrong: "Contractual impacts affect partner contracts, whereas customer loss stems directly from reputational damage." 
      }
    ],
    laymanExplanation: "Reputational Damage destroys customer trust! Operating carelessly and leaking customer details ruins public brand reputation, leading customers to take their business to competitors."
  },
  {
    id: 96,
    question: "What type of agreement do organizations create after signing an MSA that describes the specific tasks or deliverables that will be created or performed?",
    options: [
      { 
        text: "A SOW (Statement of Work)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An MOU (Memorandum of Understanding)", 
        isCorrect: false, 
        whyWrong: "MOUs establish broad non-binding mutual goals between organizations." 
      },
      { 
        text: "A punch list", 
        isCorrect: false, 
        whyWrong: "Punch lists are construction site defect checklists." 
      },
      { 
        text: "A BPA (Business Partners Agreement)", 
        isCorrect: false, 
        whyWrong: "BPAs govern joint business partnership ventures and profit sharing." 
      }
    ],
    laymanExplanation: "A Statement of Work (SOW) details project specifics! After signing a Master Services Agreement (MSA), every specific job or deliverable gets its own detailed SOW contract."
  },
  {
    id: 97,
    question: "Jack's organization recently received a shipment of SSDs and has begun to deploy them. What information would best help Jack assess the useful life of the devices?",
    options: [
      { 
        text: "An MTBF (Mean Time Between Failures)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO measures downtime recovery targets." 
      },
      { 
        text: "An MTTR (Mean Time to Repair)", 
        isCorrect: false, 
        whyWrong: "MTTR measures repair time duration." 
      },
      { 
        text: "An RPO (Recovery Point Objective)", 
        isCorrect: false, 
        whyWrong: "RPO measures acceptable data loss time windows." 
      }
    ],
    laymanExplanation: "Mean Time Between Failures (MTBF) measures hardware lifespan! Manufacturers state MTBF metrics to estimate how long a device operates before failing."
  },
  {
    id: 98,
    question: "The hard drives that Jason's organization recently purchased have an MTBF of 300,000 hours. When can Jason expect the first drive to fail?",
    options: [
      { 
        text: "None of the above", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "At 150,000 hours", 
        isCorrect: false, 
        whyWrong: "MTBF is a statistical average across thousands of units, not an individual countdown timer." 
      },
      { 
        text: "At 300,000 hours", 
        isCorrect: false, 
        whyWrong: "A drive could fail on day 1 or last past 500,000 hours; MTBF does not predict exact failure timing." 
      },
      { 
        text: "At 450,000 hours", 
        isCorrect: false, 
        whyWrong: "Individual drive failure times vary randomly around the statistical mean." 
      }
    ],
    laymanExplanation: "MTBF is an average across thousands of drives! It cannot tell you when one specific drive will fail — a hard drive could fail in week 1 or last 10 years."
  },
  {
    id: 99,
    question: "Melissa's organization wants to establish a metric that defines how much data could be lost if an issue occurs. What should they set?",
    options: [
      { 
        text: "An RPO (Recovery Point Objective)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO measures how long systems can be down (downtime duration)." 
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
    laymanExplanation: "Recovery Point Objective (RPO) is your data loss limit! It defines how much data loss (measured in time, e.g., 2 hours of transactions) your organization can tolerate after a failure."
  },
  {
    id: 100,
    question: "What common terms are used to categorize anomalous behavior in user behavior analytics?",
    options: [
      { 
        text: "Risky, unexpected, and unintentional", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Recurring, occasional, and unique", 
        isCorrect: false, 
        whyWrong: "These describe event occurrence frequencies, not anomalous behavior classifications." 
      },
      { 
        text: "Unintentional, insider, and accidental", 
        isCorrect: false, 
        whyWrong: "Insider threat is a threat actor category, not an anomaly classification." 
      },
      { 
        text: "Active, passive, and integrated", 
        isCorrect: false, 
        whyWrong: "These describe penetration testing methodologies." 
      }
    ],
    laymanExplanation: "Anomalous behavior is categorized into Risky, Unexpected, and Unintentional! Security systems flag actions that pose risk, deviate from baseline patterns, or stem from human mistakes."
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

export default function Domain5DumpsBatch5Mcq({ onBack }) {
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
            Batch 5: Questions 81 - 100 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering SOC 2 Audits, Risk Thresholds, HIPAA Audits, Change Policies, BCP vs BCP Policy, Rules of Engagement, SOWs, MTBF Math, RPO, and Anomalous Behavior!
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
            <h4 className="text-3xl font-black text-slate-900">Batch 5 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 5 (Questions 81 - 100) of the Exam Dumps Vault!'
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
