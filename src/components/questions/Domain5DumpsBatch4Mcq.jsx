import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 61,
    question: "Risk assessments required for regulatory compliance are most frequently conducted in which of the following modes?",
    options: [
      { 
        text: "As recurring risk assessments", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "As ad hoc risk assessments", 
        isCorrect: false, 
        whyWrong: "Ad hoc assessments are unscheduled checks conducted in response to sudden events or incidents." 
      },
      { 
        text: "As one-time risk assessments", 
        isCorrect: false, 
        whyWrong: "Compliance frameworks require ongoing periodic verification, not a single one-time check." 
      },
      { 
        text: "As continuous risk assessments", 
        isCorrect: false, 
        whyWrong: "Continuous risk assessment is automated in software delivery pipelines, while regulatory audits are periodic." 
      }
    ],
    laymanExplanation: "Regulatory compliance requires Recurring Risk Assessments! Regulations like PCI DSS and HIPAA require companies to perform security risk reviews on a predictable schedule (such as annually)."
  },
  {
    id: 62,
    question: "Jack's organization has engaged penetration testers for their annual penetration test. As part of the contract, the testers are provided with a list of target systems, operating systems, and software that they will be testing. What type of penetration test is Jack's organization conducting?",
    options: [
      { 
        text: "A partially known environment test (Gray Box)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An unknown environment test (Black Box)", 
        isCorrect: false, 
        whyWrong: "Unknown environment tests provide zero target details to simulate a blind outside hacker." 
      },
      { 
        text: "A known environment test (White Box)", 
        isCorrect: false, 
        whyWrong: "Known environment tests provide complete architecture diagrams, source code, and full system access." 
      },
      { 
        text: "A third-party test", 
        isCorrect: false, 
        whyWrong: "Third-party refers to hiring an outside vendor, not the specific information disclosure model." 
      }
    ],
    laymanExplanation: "A Partially Known Environment Test (Gray Box) provides partial information! Giving testers IP targets and OS versions lets them simulate an insider or attacker with partial knowledge."
  },
  {
    id: 63,
    question: "The company that Jim works for is willing to accept significant risk in order to expand. How should Jim describe the organization's risk appetite?",
    options: [
      { 
        text: "Expansionary risk appetite", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Conservative risk appetite", 
        isCorrect: false, 
        whyWrong: "Conservative risk appetite avoids risky moves and favors strict security controls." 
      },
      { 
        text: "Neutral risk appetite", 
        isCorrect: false, 
        whyWrong: "Neutral risk appetite balances risk taking equally against risk mitigation controls." 
      },
      { 
        text: "Limited risk appetite", 
        isCorrect: false, 
        whyWrong: "Limited is not a standard CompTIA risk appetite model classification." 
      }
    ],
    laymanExplanation: "Expansionary risk appetite takes bold risks for fast growth! Companies pursuing rapid market expansion willingly accept higher risk exposure to innovate quickly."
  },
  {
    id: 64,
    question: "As part of the early stages of a penetration test, Hui has researched her target organization's domain names and IP addresses, and has conducted a port scan. What type of activity is Hui engaging in?",
    options: [
      { 
        text: "Reconnaissance", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An unknown environment test", 
        isCorrect: false, 
        whyWrong: "Unknown environment describes the test information model, not the stage of the attack." 
      },
      { 
        text: "A known environment test", 
        isCorrect: false, 
        whyWrong: "Known environment describes full information disclosure." 
      },
      { 
        text: "OSINT gathering", 
        isCorrect: false, 
        whyWrong: "Port scanning is active probing, whereas OSINT is strictly passive public intelligence gathering." 
      }
    ],
    laymanExplanation: "Reconnaissance is information gathering! Combining domain lookups with initial port scanning maps out the target during the early stages of a penetration test."
  },
  {
    id: 65,
    question: "What role does a person who has exercised the GDPR's right to be forgotten hold?",
    options: [
      { 
        text: "Data subject", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data controller", 
        isCorrect: false, 
        whyWrong: "Data controllers are organizations that decide why and how personal data is collected." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processors process data on behalf of a controller." 
      },
      { 
        text: "Data owner", 
        isCorrect: false, 
        whyWrong: "Data owners are internal corporate managers accountable for specific company data assets." 
      }
    ],
    laymanExplanation: "The Data Subject is the human individual! Anyone exercising their legal right to have their personal data erased under GDPR is the Data Subject."
  },
  {
    id: 66,
    question: "How is exposure factor (EF) expressed for quantitative risk calculations?",
    options: [
      { 
        text: "As a potential percentage of loss", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "As a calculation of the ALE multiplied by the ARO", 
        isCorrect: false, 
        whyWrong: "ALE is Single Loss Expectancy (SLE) multiplied by ARO." 
      },
      { 
        text: "As the likelihood of loss", 
        isCorrect: false, 
        whyWrong: "Likelihood is measured by Annualized Rate of Occurrence (ARO) or probability." 
      },
      { 
        text: "As a calculation of the SLE multiplied by the ARO", 
        isCorrect: false, 
        whyWrong: "SLE × ARO calculates Annualized Loss Expectancy (ALE), not EF." 
      }
    ],
    laymanExplanation: "Exposure Factor (EF) is a percentage! It represents the percentage of an asset's total value that would be destroyed or lost during a risk event (e.g., a flood destroying 50% of a server room = 0.50 EF)."
  },
  {
    id: 67,
    question: "As part of his penetration testing process Nick intends to follow an employee of his target company into a secured area. What type of penetration testing is Nick engaged in?",
    options: [
      { 
        text: "Physical penetration testing", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Defensive penetration testing", 
        isCorrect: false, 
        whyWrong: "Defensive penetration testing (Blue Teaming) focuses on monitoring and defending." 
      },
      { 
        text: "Offensive penetration testing", 
        isCorrect: false, 
        whyWrong: "Offensive pentesting targets software and network boundaries, whereas tailgating tests physical door access." 
      },
      { 
        text: "Integrated penetration testing", 
        isCorrect: false, 
        whyWrong: "Integrated pentesting combines red and blue teams (Purple Teaming)." 
      }
    ],
    laymanExplanation: "Tailgating through a secure door is Physical Penetration Testing! Testing physical badges, door locks, and guards tests physical security controls."
  },
  {
    id: 68,
    question: "Valerie's organization wants to ensure that their access control vestibule, ID card system, and guards are effective in stopping unwanted entrance. What type of penetration test should she use to validate this?",
    options: [
      { 
        text: "Physical penetration test", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Offensive penetration test", 
        isCorrect: false, 
        whyWrong: "Offensive tests focus on exploiting software vulnerabilities and network ports." 
      },
      { 
        text: "Defensive penetration test", 
        isCorrect: false, 
        whyWrong: "Defensive tests focus on blue team alert responses." 
      },
      { 
        text: "Integrated penetration test", 
        isCorrect: false, 
        whyWrong: "Integrated tests combine red and blue team exercises." 
      }
    ],
    laymanExplanation: "Testing mantraps, security guards, and badge scanners requires a Physical Penetration Test to evaluate physical facility security."
  },
  {
    id: 69,
    question: "Jason's organization has engaged a penetration testing firm that specializes in using techniques commonly employed by nation-state actors, including using social engineering techniques, advanced tools, and methods that will provide significant footholds within his infrastructure. What type of penetration test best describes this?",
    options: [
      { 
        text: "Offensive penetration test (Red Teaming)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Physical penetration test", 
        isCorrect: false, 
        whyWrong: "Physical pentesting focuses on building access and physical locks." 
      },
      { 
        text: "Defensive penetration test", 
        isCorrect: false, 
        whyWrong: "Defensive pentesting focuses on analyzing blue team log detection." 
      },
      { 
        text: "Integrated penetration test", 
        isCorrect: false, 
        whyWrong: "Integrated pentesting coordinates red and blue teams together." 
      }
    ],
    laymanExplanation: "Simulating nation-state attacks is an Offensive Penetration Test (Red Teaming)! Pentesters use realistic adversary tactics to breach network defenses."
  },
  {
    id: 70,
    question: "Joshua's organization is required to comply with the EU's GDPR. As part of their annual assessments, they conduct a GDPR compliance review and receive a report from their auditors. What type of assessment is this?",
    options: [
      { 
        text: "Regulatory assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Penetration test", 
        isCorrect: false, 
        whyWrong: "Penetration tests simulate attacks against servers, not legal compliance documentation audits." 
      },
      { 
        text: "Internal audit", 
        isCorrect: false, 
        whyWrong: "Internal audits are conducted by company staff, not formal regulatory auditor reviews." 
      },
      { 
        text: "Attestation-based assessment", 
        isCorrect: false, 
        whyWrong: "Attestation provides a CPA sign-off statement for financial/SOC audits." 
      }
    ],
    laymanExplanation: "Auditing compliance against government laws (like GDPR or HIPAA) is a Regulatory Assessment."
  },
  {
    id: 71,
    question: "Alexandria wants to mitigate the risk of ransomware during its initial infection stages. Which of the following strategies should she employ?",
    options: [
      { 
        text: "Deploy an EDR tool", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Purchase cybersecurity insurance", 
        isCorrect: false, 
        whyWrong: "Insurance transfers financial risk after a breach occurs, but does not stop initial ransomware infection." 
      },
      { 
        text: "Use secure, ransomware-resistant backups", 
        isCorrect: false, 
        whyWrong: "Backups help recover data after an infection occurs, but don't catch ransomware at the initial infection stage." 
      },
      { 
        text: "Continue to operate as usual", 
        isCorrect: false, 
        whyWrong: "Operating as usual accepts risk without deploying protective controls." 
      }
    ],
    laymanExplanation: "Endpoint Detection & Response (EDR) catches ransomware live! EDR monitors endpoint process behavior and stops malicious ransomware execution at the initial infection stage."
  },
  {
    id: 72,
    question: "Shane's organization has determined that they can accept up to $10,000,000 a year in risk-related loss in support of their strategic plans. What term best describes this?",
    options: [
      { 
        text: "Risk appetite", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Risk acceptance", 
        isCorrect: false, 
        whyWrong: "Risk acceptance is the decision to absorb a specific individual risk event." 
      },
      { 
        text: "Ad hoc risk", 
        isCorrect: false, 
        whyWrong: "Ad hoc risk refers to unscheduled temporary risk events." 
      },
      { 
        text: "A conservative risk tolerance", 
        isCorrect: false, 
        whyWrong: "Accepting $10M in risk loss is an aggressive/expansionary risk tolerance, not conservative." 
      }
    ],
    laymanExplanation: "Risk Appetite defines how much total risk an organization is willing to absorb in order to achieve its business strategy."
  },
  {
    id: 73,
    question: "Eric manages his organization's internal security team and wants to leverage a penetration test as part of his team's testing that allows them to respond to simulated attacks. What type of model best describes this?",
    options: [
      { 
        text: "Defensive penetration test (Blue Teaming)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Physical penetration test", 
        isCorrect: false, 
        whyWrong: "Physical pentesting evaluates door locks and badge scanners." 
      },
      { 
        text: "Offensive penetration test", 
        isCorrect: false, 
        whyWrong: "Offensive pentesting focuses solely on attacking defenses." 
      },
      { 
        text: "Integrated penetration test", 
        isCorrect: false, 
        whyWrong: "Integrated pentesting coordinates red and blue teams in a joint exercise." 
      }
    ],
    laymanExplanation: "Defensive Penetration Testing (Blue Teaming) tests your defenders! It evaluates how quickly your internal security team detects, analyzes, and blocks active attacks."
  },
  {
    id: 74,
    question: "Henry's organization leverages penetration testing as part of its ongoing security practices, using attacker techniques as well as blue teaming to improve security constantly. What type of penetration testing methodology is Henry's organization using?",
    options: [
      { 
        text: "Integrated penetration testing (Purple Teaming)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Physical penetration testing", 
        isCorrect: false, 
        whyWrong: "Physical pentesting targets facility doors and locks." 
      },
      { 
        text: "Offensive penetration testing", 
        isCorrect: false, 
        whyWrong: "Offensive testing focuses strictly on red team attack execution." 
      },
      { 
        text: "Defensive penetration testing", 
        isCorrect: false, 
        whyWrong: "Defensive testing focuses strictly on blue team detection." 
      }
    ],
    laymanExplanation: "Integrated Penetration Testing (Purple Teaming) combines attackers and defenders! Red and Blue teams work together in real-time to test attacks and immediately tune security defenses."
  },
  {
    id: 75,
    question: "Jackie is an auditor and has completed an SOC 2, Type 2 audit. Her firm then provides a statement about the organization's audit results and posture. What is this process known as?",
    options: [
      { 
        text: "Attestation", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Penetration testing", 
        isCorrect: false, 
        whyWrong: "Penetration testing simulates cyberattacks against network targets." 
      },
      { 
        text: "Audit sign-off", 
        isCorrect: false, 
        whyWrong: "Audit sign-off is an internal project approval step." 
      },
      { 
        text: "Regulatory defense", 
        isCorrect: false, 
        whyWrong: "Regulatory defense refers to legal representation during government proceedings." 
      }
    ],
    laymanExplanation: "Attestation is a formal auditor certification statement! An independent auditor issues a formal attestation report certifying that a company meets SOC 2 security standards."
  },
  {
    id: 76,
    question: "Joe is an auditor who is on the staff of an organization that employs him to audit their own practices. What type of audit does Joe perform?",
    options: [
      { 
        text: "Internal audit", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Regulatory audit", 
        isCorrect: false, 
        whyWrong: "Regulatory audits are conducted by external government bodies." 
      },
      { 
        text: "External audit", 
        isCorrect: false, 
        whyWrong: "External audits are performed by independent outside CPA accounting firms." 
      },
      { 
        text: "Compliance audit", 
        isCorrect: false, 
        whyWrong: "Compliance audits evaluate adherence to specific standards, which can be internal or external." 
      }
    ],
    laymanExplanation: "An Internal Audit is conducted by company employees! Internal auditors evaluate internal controls and processes to help leadership fix flaws before external audits."
  },
  {
    id: 77,
    question: "Irene's organization needs to follow PCI DSS standards. If she engages a third party to assess this, what type of audit is she having performed?",
    options: [
      { 
        text: "An external compliance audit", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An internal regulatory audit", 
        isCorrect: false, 
        whyWrong: "PCI DSS is an industry compliance standard, not a government regulation, and internal audits are performed by staff." 
      },
      { 
        text: "An external regulatory audit", 
        isCorrect: false, 
        whyWrong: "PCI DSS is created by the payment card industry council, not government statutes." 
      },
      { 
        text: "An internal compliance audit", 
        isCorrect: false, 
        whyWrong: "Hiring an independent third-party auditor makes the audit external." 
      }
    ],
    laymanExplanation: "Hiring an outside firm to audit PCI DSS compliance is an External Compliance Audit! PCI DSS is an industry standard (compliance), and hiring an outside firm makes it external."
  },
  {
    id: 78,
    question: "Anton's organization processes credit cards but is a small organization. As part of their annual requirements related to PCI DSS, Anton fills out a form about their PCI DSS compliance and submits it to their acquiring bank. What type of assessment has his organization conducted?",
    options: [
      { 
        text: "A self-assessment (SAQ)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "An internal regulatory audit", 
        isCorrect: false, 
        whyWrong: "Filling out a PCI form is a self-assessment, not a formal regulatory audit." 
      },
      { 
        text: "An independent, third-party audit", 
        isCorrect: false, 
        whyWrong: "Independent third-party audits require hiring external Qualified Security Assessors (QSAs)." 
      },
      { 
        text: "An external compliance audit", 
        isCorrect: false, 
        whyWrong: "External compliance audits are conducted on-site by third-party auditors." 
      }
    ],
    laymanExplanation: "Anton completed a PCI DSS Self-Assessment Questionnaire (SAQ)! Smaller merchants can self-assess their credit card security by completing an official self-assessment form."
  },
  {
    id: 79,
    question: "What organization typically includes an audit committee for a company?",
    options: [
      { 
        text: "The board of directors", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "The security office", 
        isCorrect: false, 
        whyWrong: "The security office handles day-to-day security operations, not corporate board oversight." 
      },
      { 
        text: "The shareholders", 
        isCorrect: false, 
        whyWrong: "Shareholders elect the board of directors, but do not form internal audit committees." 
      },
      { 
        text: "The third-party assessors", 
        isCorrect: false, 
        whyWrong: "Third-party assessors are external contractors." 
      }
    ],
    laymanExplanation: "The Audit Committee is a subcommittee of the Board of Directors! They provide independent oversight of financial reporting and audit results."
  },
  {
    id: 80,
    question: "What type of risk assessment process is most commonly associated with a CI/CD pipeline model?",
    options: [
      { 
        text: "Continuous risk assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Ad hoc risk assessment", 
        isCorrect: false, 
        whyWrong: "Ad hoc risk assessments are temporary unscheduled manual checks." 
      },
      { 
        text: "One-time risk assessment", 
        isCorrect: false, 
        whyWrong: "One-time risk assessments occur once during initial project setup." 
      },
      { 
        text: "Third-party risk assessment", 
        isCorrect: false, 
        whyWrong: "Third-party risk assessments evaluate external vendors." 
      }
    ],
    laymanExplanation: "Continuous Risk Assessment integrates into CI/CD pipelines! Every time code is pushed, automated tools continuously scan code for vulnerabilities before deployment."
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

export default function Domain5DumpsBatch4Mcq({ onBack }) {
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
            Batch 4: Questions 61 - 80 📜
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering Recurring Risk Assessments, Pentesting Models (Gray/Red/Blue/Purple), Exposure Factor (EF), EDR Ransomware Mitigation, Audit Attestation, PCI DSS SAQs, and CI/CD Continuous Risk!
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
            <h4 className="text-3xl font-black text-slate-900">Batch 4 Completed!</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div className="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Batch 4 (Questions 61 - 80) of the Exam Dumps Vault!'
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
