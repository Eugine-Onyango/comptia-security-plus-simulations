import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 41,
    question: "Beth is a data owner in her company. Which of the following is NOT a typical part of the role of data owner?",
    options: [
      { 
        text: "They are responsible for processing data", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "They categorize data", 
        isCorrect: false, 
        whyWrong: "Data owners determine data classification labels (e.g. Public, Confidential, Restricted)." 
      },
      { 
        text: "They are responsible for protecting data", 
        isCorrect: false, 
        whyWrong: "Data owners set security requirements and access permissions to protect data assets." 
      },
      { 
        text: "They are responsible for data quality", 
        isCorrect: false, 
        whyWrong: "Data owners ensure business data accuracy and overall data quality." 
      }
    ],
    laymanExplanation: "Data Owners govern, they don't process! Data Owners define data classification and access rules. The actual technical work of processing data is carried out by Data Processors and Custodians."
  },
  {
    id: 42,
    question: "NIST SP 800-63B, Digital Identity Guidelines, provides advice on passwords and password standards. Why does the guide recommend that knowledge-based authentication like 'What was your mother's maiden name?' NOT be used for processes like password reset and recovery?",
    options: [
      { 
        text: "Knowledge-based authentication information is often easily discovered through searches and social media", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Users may not remember the answer", 
        isCorrect: false, 
        whyWrong: "While users occasionally forget answers, public OSINT exposure is the primary security vulnerability." 
      },
      { 
        text: "Knowledge-based authentication information is not a valid factor for MFA", 
        isCorrect: false, 
        whyWrong: "KBA counts as 'something you know', but NIST discourages it due to easy social engineering profiling." 
      },
      { 
        text: "Attackers can easily recover knowledge-based information from compromised authentication stores", 
        isCorrect: false, 
        whyWrong: "Hashed data stores protect static text; public social media scraping is why KBA security fails." 
      }
    ],
    laymanExplanation: "Secret questions are easy to guess using Google and social media! Answers like high school names or mother's maiden names can easily be found online by attackers."
  },
  {
    id: 43,
    question: "The company that Leon works for has experienced a significant malware infection and has segmented their network to prevent further spread. What risk mitigation strategy have they chosen?",
    options: [
      { 
        text: "Mitigate", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Avoid", 
        isCorrect: false, 
        whyWrong: "Avoidance would mean shutting down the entire business network or service permanently." 
      },
      { 
        text: "Transfer", 
        isCorrect: false, 
        whyWrong: "Transferring risk buys insurance or shifts liability to a third party." 
      },
      { 
        text: "Accept", 
        isCorrect: false, 
        whyWrong: "Acceptance means allowing the malware to spread without taking defensive isolation steps." 
      }
    ],
    laymanExplanation: "Network segmentation is Risk Mitigation! By isolating infected subnets behind firewalls or VLANs, you reduce the impact and prevent malware from spreading."
  },
  {
    id: 44,
    question: "Not using hints, preventing password expiration, storing passwords only in a hashed and salted form, and using minimum password length settings are all examples of what?",
    options: [
      { 
        text: "Password standards", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Multifactor authentication", 
        isCorrect: false, 
        whyWrong: "MFA requires two or more distinct authentication factors (something you know, have, or are)." 
      },
      { 
        text: "Establishing knowledge-based passwords", 
        isCorrect: false, 
        whyWrong: "Knowledge-based passwords refer to personal secret questions, which NIST discourages." 
      },
      { 
        text: "Biometrics", 
        isCorrect: false, 
        whyWrong: "Biometrics use physical characteristics like fingerprint or facial recognition scans." 
      }
    ],
    laymanExplanation: "These are modern Password Standards! Technical guidelines (like NIST SP 800-63B) mandate salted-hashing, minimum lengths, prohibiting password hints, and ending forced periodic password expirations."
  },
  {
    id: 45,
    question: "Anastasia works for a government entity that requires very strong risk controls and that has significant regulatory requirements it must meet. What risk appetite model should she expect her organization to adopt?",
    options: [
      { 
        text: "Conservative risk appetite", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Expansionary risk appetite", 
        isCorrect: false, 
        whyWrong: "Expansionary risk appetite willingly accepts high risks to pursue aggressive commercial growth." 
      },
      { 
        text: "Authoritarian risk appetite", 
        isCorrect: false, 
        whyWrong: "Authoritarian is a management style, not a recognized risk appetite model." 
      },
      { 
        text: "Legislated risk appetite", 
        isCorrect: false, 
        whyWrong: "Legislated refers to statutory laws, not an organizational risk appetite model." 
      }
    ],
    laymanExplanation: "Government entities adopt a Conservative risk appetite! Because of strict legal compliance and national security risks, government organizations minimize risk-taking and mandate strong security controls."
  },
  {
    id: 46,
    question: "Jack recently joined his organization's security team. A system was identified as likely being impacted by ransomware, and Jack was given a document that described the organization's ransomware handling practices. What common security document has he been given?",
    options: [
      { 
        text: "A ransomware playbook", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The IR policy", 
        isCorrect: false, 
        whyWrong: "Incident Response policies state high-level incident handling goals, not specific ransomware steps." 
      },
      { 
        text: "A ransomware cookbook", 
        isCorrect: false, 
        whyWrong: "Cookbook is an informal term and not a standard CompTIA security document." 
      },
      { 
        text: "A disaster recovery handbook", 
        isCorrect: false, 
        whyWrong: "Disaster recovery handbooks guide physical facility and server infrastructure restoration." 
      }
    ],
    laymanExplanation: "An Incident Response Playbook is a step-by-step game plan! Playbooks outline exact response steps for specific cyber threats like ransomware, phishing, or DDoS."
  },
  {
    id: 47,
    question: "Connie wants to explain the consequences of noncompliance with data regulations to her organization's management. Which of the following is the most common statutory consequence of noncompliance with regulations?",
    options: [
      { 
        text: "Fines", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data breaches", 
        isCorrect: false, 
        whyWrong: "Data breaches are security incidents, not a statutory penalty enforced by legal authorities." 
      },
      { 
        text: "Reputational damage", 
        isCorrect: false, 
        whyWrong: "Reputational damage is a public relations impact, not a statutory legal consequence." 
      },
      { 
        text: "Contractual impacts", 
        isCorrect: false, 
        whyWrong: "Contractual impacts arise from private business agreements, not government statutory regulations." 
      }
    ],
    laymanExplanation: "Fines are legal financial punishments! Government regulatory bodies (like GDPR or HIPAA authorities) issue heavy fines when companies fail to comply with data privacy laws."
  },
  {
    id: 48,
    question: "Hank wants to create a playbook for his incident response process. What will he create?",
    options: [
      { 
        text: "A detailed process for incident response", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A legal document describing incident response", 
        isCorrect: false, 
        whyWrong: "Playbooks are internal technical operational guides, not formal legal contracts." 
      },
      { 
        text: "A high-level statement of purpose for incident response", 
        isCorrect: false, 
        whyWrong: "High-level statements of purpose belong to top-level security policies." 
      },
      { 
        text: "A document describing the general incident response (IR) process", 
        isCorrect: false, 
        whyWrong: "General IR flowcharts are covered in IR plans; playbooks cover specific detailed step-by-step procedures." 
      }
    ],
    laymanExplanation: "A Playbook provides specific, step-by-step instructions! It tells security analysts exactly what commands to run and what systems to isolate when a specific attack happens."
  },
  {
    id: 49,
    question: "What type of agreement is used by organizations that want to protect their proprietary data while working with third parties or individuals who will have access to the data?",
    options: [
      { 
        text: "NDAs (Non-Disclosure Agreements)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "SLAs (Service Level Agreements)", 
        isCorrect: false, 
        whyWrong: "SLAs define system performance, uptime, and latency targets." 
      },
      { 
        text: "MSAs (Master Services Agreements)", 
        isCorrect: false, 
        whyWrong: "MSAs define master legal relationship terms for long-term contract work." 
      },
      { 
        text: "BPAs (Business Partners Agreements)", 
        isCorrect: false, 
        whyWrong: "BPAs establish business partnership profit-sharing and joint venture terms." 
      }
    ],
    laymanExplanation: "A Non-Disclosure Agreement (NDA) is a secrecy contract! It legally binds contractors, vendors, and partners not to share your confidential company data."
  },
  {
    id: 50,
    question: "Oliver has joined an organization and has completed employee orientation, has received his username and password, and has reviewed the new employee security training. What process has he participated in?",
    options: [
      { 
        text: "Onboarding", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Identity proofing", 
        isCorrect: false, 
        whyWrong: "Identity proofing is the initial step verifying government ID documents before issuing credentials." 
      },
      { 
        text: "Mandatory access control", 
        isCorrect: false, 
        whyWrong: "Mandatory Access Control (MAC) is an OS security model using clearance levels." 
      },
      { 
        text: "Biometric enrollment", 
        isCorrect: false, 
        whyWrong: "Biometric enrollment records fingerprint or facial data into authentication hardware." 
      }
    ],
    laymanExplanation: "Onboarding is the new hire setup process! It includes HR orientation, setting up user accounts, issuing equipment, and completing initial security awareness training."
  },
  {
    id: 51,
    question: "What GDPR provision allows individuals to ask organizations to delete their personal data?",
    options: [
      { 
        text: "The right to be forgotten", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The right to deletion", 
        isCorrect: false, 
        whyWrong: "'Right to deletion' is an informal term; the official GDPR legal terminology is 'Right to be Forgotten'." 
      },
      { 
        text: "The right to privacy", 
        isCorrect: false, 
        whyWrong: "Right to privacy is a broad constitutional human right, not the specific GDPR data erasure article." 
      },
      { 
        text: "The right to ownership", 
        isCorrect: false, 
        whyWrong: "Right to ownership refers to intellectual property rights." 
      }
    ],
    laymanExplanation: "GDPR Article 17 grants the 'Right to be Forgotten'! EU citizens can legally demand that companies completely erase their personal information from database servers."
  },
  {
    id: 52,
    question: "Damian provided a risk register recommending to ban personal cell phones inside the office to prevent screen photography. Management overruled the recommendation and will allow phones. What risk management strategy has leadership chosen?",
    options: [
      { 
        text: "Accept", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Transfer", 
        isCorrect: false, 
        whyWrong: "Transferring risk buys insurance or shifts liability to a third party." 
      },
      { 
        text: "Avoid", 
        isCorrect: false, 
        whyWrong: "Avoidance would mean banning phones completely or closing the facility." 
      },
      { 
        text: "Mitigate", 
        isCorrect: false, 
        whyWrong: "Mitigation would implement camera lens covers or phone lockers." 
      }
    ],
    laymanExplanation: "Management chose Risk Acceptance! By overruling the recommendation and allowing cell phones, leadership knowingly accepted the risk of screen photography."
  },
  {
    id: 53,
    question: "Which of the following is NOT a typical part of an offboarding process?",
    options: [
      { 
        text: "Copying files to a USB drive for the departing employee", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Returning company equipment", 
        isCorrect: false, 
        whyWrong: "Retrieving laptops, badges, and mobile devices is a mandatory offboarding step." 
      },
      { 
        text: "Disabling or removing accounts", 
        isCorrect: false, 
        whyWrong: "Revoking domain user account access is a critical IT offboarding step." 
      },
      { 
        text: "Changing passwords on shared accounts", 
        isCorrect: false, 
        whyWrong: "Rotating shared passwords ensures departed employees cannot log back in remotely." 
      }
    ],
    laymanExplanation: "Never copy company files to a USB drive for departing employees! Offboarding revokes access and retrieves company data; letting employees copy data is a data exfiltration violation."
  },
  {
    id: 54,
    question: "Daryl wants to ensure that his organization balances risks and its goals. What risk appetite model should he suggest the organization adopts?",
    options: [
      { 
        text: "Neutral risk appetite", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Conservative risk appetite", 
        isCorrect: false, 
        whyWrong: "Conservative risk appetite minimizes risk taking and favors heavy security restrictions over growth." 
      },
      { 
        text: "Expansionary risk appetite", 
        isCorrect: false, 
        whyWrong: "Expansionary risk appetite takes aggressive risks to maximize market expansion." 
      },
      { 
        text: "Reactionary risk appetite", 
        isCorrect: false, 
        whyWrong: "Reactionary is an unplanned response model, not a balanced risk appetite model." 
      }
    ],
    laymanExplanation: "Neutral risk appetite strikes a balance! It carefully weighs business innovation goals against risk controls without being overly fearful or recklessly aggressive."
  },
  {
    id: 55,
    question: "Charlene is preparing to conduct a penetration test and has been provided with access to all of her organization's information about the systems, services, and configurations involved. What type of penetration test is she conducting?",
    options: [
      { 
        text: "A known environment test (White Box)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A partially known environment test (Gray Box)", 
        isCorrect: false, 
        whyWrong: "Partially known environment tests provide limited credentials or partial architecture information." 
      },
      { 
        text: "An unknown environment test (Black Box)", 
        isCorrect: false, 
        whyWrong: "Unknown environment tests provide zero prior internal information to simulate a blind external attacker." 
      },
      { 
        text: "A third-party test", 
        isCorrect: false, 
        whyWrong: "Third-party test refers to hiring external service providers, not the level of target system documentation provided." 
      }
    ],
    laymanExplanation: "A Known Environment Test (White Box) gives full access! The pentester receives full network diagrams, source code, and configuration specs to find hidden vulnerabilities quickly."
  },
  {
    id: 56,
    question: "The company that Omar works for wants to co-develop a mobile application with a third-party company. What type of agreement should they both sign as part of this joint business partnership?",
    options: [
      { 
        text: "A BPA (Business Partners Agreement)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An SLA (Service Level Agreement)", 
        isCorrect: false, 
        whyWrong: "SLAs govern uptime and performance metrics between a service provider and a customer." 
      },
      { 
        text: "An NDA (Non-Disclosure Agreement)", 
        isCorrect: false, 
        whyWrong: "NDAs protect trade secrets, but don't specify revenue sharing or co-development partner duties." 
      },
      { 
        text: "An MSA (Master Services Agreement)", 
        isCorrect: false, 
        whyWrong: "MSAs establish general contracting terms for vendor services." 
      }
    ],
    laymanExplanation: "A Business Partners Agreement (BPA) governs joint business ventures! It specifies how two companies co-developing a product will share profits, losses, responsibilities, and intellectual property."
  },
  {
    id: 57,
    question: "Alex wants to hire a penetration tester who will simulate an attacker's potential attacks against his environment without any prior internal knowledge. What type of test best fits this model?",
    options: [
      { 
        text: "An unknown environment test (Black Box)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "A partially known environment test (Gray Box)", 
        isCorrect: false, 
        whyWrong: "Partially known environment tests provide some internal information (like standard user login credentials)." 
      },
      { 
        text: "A known environment test (White Box)", 
        isCorrect: false, 
        whyWrong: "Known environment tests provide full documentation and source code." 
      },
      { 
        text: "A third-party test", 
        isCorrect: false, 
        whyWrong: "Third-party pentesting describes hiring an outside firm, regardless of the disclosure model." 
      }
    ],
    laymanExplanation: "An Unknown Environment Test (Black Box) simulates a blind outside hacker! The pentester starts with zero internal knowledge or system documentation."
  },
  {
    id: 58,
    question: "What term describes the possibility or probability of a risk occurring?",
    options: [
      { 
        text: "Likelihood", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Impact", 
        isCorrect: false, 
        whyWrong: "Impact measures the severity of damage or financial loss if the event occurs." 
      },
      { 
        text: "Potential", 
        isCorrect: false, 
        whyWrong: "Potential is a general English term, not a technical risk management calculation term." 
      },
      { 
        text: "Rate of occurrence", 
        isCorrect: false, 
        whyWrong: "Rate of occurrence (ARO) specifically counts how many times per year an event is expected to happen." 
      }
    ],
    laymanExplanation: "Likelihood measures probability! It estimates how likely a threat is to exploit a vulnerability."
  },
  {
    id: 59,
    question: "Killian's organization wants to perform a penetration test that will provide the maximum amount of information about his organization and that will optimize penetration testers' time. What type of test should he have conducted?",
    options: [
      { 
        text: "A known environment test (White Box)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An unknown environment test (Black Box)", 
        isCorrect: false, 
        whyWrong: "Unknown environment tests waste significant time on initial mapping and discovery." 
      },
      { 
        text: "A partially known environment test (Gray Box)", 
        isCorrect: false, 
        whyWrong: "Partially known tests provide partial access, but are less comprehensive than full White Box testing." 
      },
      { 
        text: "A third-party test", 
        isCorrect: false, 
        whyWrong: "Third-party pentesting describes hiring an external vendor, not the information model." 
      }
    ],
    laymanExplanation: "A Known Environment Test (White Box) maximizes efficiency! Giving testers full diagrams and code access lets them focus 100% of their time on auditing deep code and structural flaws."
  },
  {
    id: 60,
    question: "Justin's organization has recently undergone a third-party audit that determined that their data-handling processes don't comply with the GDPR. Changes to become compliant will take almost a year. What risk management strategy is Justin's organization choosing if they continue to operate knowing they are noncompliant?",
    options: [
      { 
        text: "Exception (Risk Exception / Acceptance)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Transfer", 
        isCorrect: false, 
        whyWrong: "Transferring risk buys insurance or shifts liability to a third party." 
      },
      { 
        text: "Avoidance", 
        isCorrect: false, 
        whyWrong: "Avoidance would require shutting down EU operations immediately." 
      },
      { 
        text: "Mitigate", 
        isCorrect: false, 
        whyWrong: "Mitigation actively installs controls to become compliant immediately." 
      }
    ],
    laymanExplanation: "They are granting a formal Risk Exception! Documenting non-compliance and operating under a temporary exception while working on remediation formally acknowledges and accepts the risk during the transition period."
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

export default function Domain5DumpsBatch3Mcq({ onBack }) {
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
            Batch 3: Questions 41 - 60 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering NIST Password Standards, Ransomware Playbooks, Statutory Fines, GDPR Right to be Forgotten, Pentest Environments (Black/White Box), and BPAs!
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
            <h4 className="text-3xl font-black text-slate-900">Batch 3 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 3 (Questions 41 - 60) of the Exam Dumps Vault!'
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
