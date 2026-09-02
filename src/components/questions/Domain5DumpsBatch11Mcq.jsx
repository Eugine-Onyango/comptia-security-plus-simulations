import React, { useState, useEffect } from 'react';
import { ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, Shuffle, HelpCircle, AlertCircle, ShieldCheck, FileCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const rawQuestions = [
  {
    id: 201,
    question: "What security risk occurs when employees bring personal smartphones into corporate facilities and connect them to guest Wi-Fi networks without mobile device management (MDM) enrollment?",
    options: [
      { 
        text: "Shadow IT / BYOD risk", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Supply chain vulnerability", 
        isCorrect: false, 
        whyWrong: "Supply chain vulnerabilities involve third-party software vendors and chip manufacturers." 
      },
      { 
        text: "Zero-day exploit", 
        isCorrect: false, 
        whyWrong: "Zero-day exploits target unpatched software vulnerabilities." 
      },
      { 
        text: "Hardware tampered firmware", 
        isCorrect: false, 
        whyWrong: "Firmware tampering modifies physical chip code before delivery." 
      }
    ],
    laymanExplanation: "Connecting unmanaged personal smartphones creates Shadow IT / BYOD Risk! Devices operating without central IT control (MDM) can introduce malware into corporate networks."
  },
  {
    id: 202,
    question: "An organization wants to comply with international security frameworks. Which ISO standard specifies code of practice guidelines for information security controls selection and implementation?",
    options: [
      { 
        text: "ISO 27002", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "ISO 27001", 
        isCorrect: false, 
        whyWrong: "ISO 27001 specifies high-level requirements for establishing an Information Security Management System (ISMS)." 
      },
      { 
        text: "ISO 31000", 
        isCorrect: false, 
        whyWrong: "ISO 31000 provides general enterprise risk management principles." 
      },
      { 
        text: "ISO 22301", 
        isCorrect: false, 
        whyWrong: "ISO 22301 governs business continuity management systems." 
      }
    ],
    laymanExplanation: "ISO 27002 provides specific security control guidelines! While ISO 27001 sets management requirements, ISO 27002 acts as a detailed guidebook for selecting and implementing technical controls."
  },
  {
    id: 203,
    question: "What type of insider threat actor possesses high technical access and insider knowledge, but acts maliciously due to disgruntlement or financial coercion?",
    options: [
      { 
        text: "Malicious insider", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Unintentional insider", 
        isCorrect: false, 
        whyWrong: "Unintentional insiders cause security breaches accidentally by falling for phishing." 
      },
      { 
        text: "Third-party vendor", 
        isCorrect: false, 
        whyWrong: "Third-party vendors are external contractors, not disgruntled internal employees." 
      },
      { 
        text: "Hacktivist", 
        isCorrect: false, 
        whyWrong: "Hacktivists are external political activist hackers." 
      }
    ],
    laymanExplanation: "A Malicious Insider intentionally misuses authorized access! Disgruntled employees with internal login rights use their access to sabotage systems or steal data."
  },
  {
    id: 204,
    question: "An attacker calls an employee pretending to be an IT help desk technician needing to reset their password. What social engineering attack vector was used?",
    options: [
      { 
        text: "Vishing (Voice Phishing)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Phishing", 
        isCorrect: false, 
        whyWrong: "Phishing uses malicious email messages." 
      },
      { 
        text: "Smishing", 
        isCorrect: false, 
        whyWrong: "Smishing uses malicious SMS text messages." 
      },
      { 
        text: "Whaling", 
        isCorrect: false, 
        whyWrong: "Whaling targets high-level corporate executives via specialized email." 
      }
    ],
    laymanExplanation: "Vishing is Voice Phishing! Social engineering conducted over phone calls to trick employees into giving up credentials is Vishing."
  },
  {
    id: 205,
    question: "What metric evaluates the effectiveness of an organization's security awareness training program over time?",
    options: [
      { 
        text: "Phishing simulation click-through rates", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Firewall log volume", 
        isCorrect: false, 
        whyWrong: "Firewall log volume tracks network traffic, not user awareness training success." 
      },
      { 
        text: "Antivirus update frequency", 
        isCorrect: false, 
        whyWrong: "Antivirus updates measure technical endpoint patching." 
      },
      { 
        text: "Server CPU utilization", 
        isCorrect: false, 
        whyWrong: "CPU utilization measures hardware system performance." 
      }
    ],
    laymanExplanation: "Phishing simulation click-through rates measure human training success! Tracking how many employees fall for simulated fake phishing emails shows if security awareness training is working."
  },
  {
    id: 206,
    question: "What type of risk calculation relies on matrix categories like High, Medium, and Low rather than exact dollar amounts?",
    options: [
      { 
        text: "Qualitative risk assessment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Quantitative risk assessment", 
        isCorrect: false, 
        whyWrong: "Quantitative risk assessments calculate exact monetary figures." 
      },
      { 
        text: "Actuarial calculation", 
        isCorrect: false, 
        whyWrong: "Actuarial calculations generate mathematical statistical probabilities for insurance." 
      },
      { 
        text: "Financial audit", 
        isCorrect: false, 
        whyWrong: "Financial audits review accounting balance sheets." 
      }
    ],
    laymanExplanation: "Qualitative risk assessment uses descriptive categories (High, Medium, Low) based on team judgment."
  },
  {
    id: 207,
    question: "Which type of backup site provides an empty physical room with power, heating, and air conditioning, but no pre-installed computer hardware or data?",
    options: [
      { 
        text: "Cold site", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Warm site", 
        isCorrect: false, 
        whyWrong: "Warm sites have hardware installed, but require loading data backups." 
      },
      { 
        text: "Hot site", 
        isCorrect: false, 
        whyWrong: "Hot sites have real-time synchronized hardware running live." 
      },
      { 
        text: "Mirrored site", 
        isCorrect: false, 
        whyWrong: "Mirrored sites run active-active real-time traffic." 
      }
    ],
    laymanExplanation: "A Cold Site provides empty shell space! It offers building space with power, HVAC, and internet hookups, but zero pre-installed servers or data."
  },
  {
    id: 208,
    question: "What agreement type establishes mutual intent between two entities working together on non-commercial projects without legally binding financial commitments?",
    options: [
      { 
        text: "MOU (Memorandum of Understanding)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "BPA (Business Partners Agreement)", 
        isCorrect: false, 
        whyWrong: "BPAs are legally binding commercial partner contracts." 
      },
      { 
        text: "MSA (Master Services Agreement)", 
        isCorrect: false, 
        whyWrong: "MSAs set master legal relationship terms for contractor services." 
      },
      { 
        text: "SLA (Service Level Agreement)", 
        isCorrect: false, 
        whyWrong: "SLAs govern service provider performance metrics." 
      }
    ],
    laymanExplanation: "A Memorandum of Understanding (MOU) establishes informal mutual intent without binding financial terms."
  },
  {
    id: 209,
    question: "What quantitative risk metric calculates the financial loss incurred every time a specific risk event occurs?",
    options: [
      { 
        text: "Single Loss Expectancy (SLE)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Annualized Rate of Occurrence (ARO)", 
        isCorrect: false, 
        whyWrong: "ARO measures event frequency per year." 
      },
      { 
        text: "Annualized Loss Expectancy (ALE)", 
        isCorrect: false, 
        whyWrong: "ALE calculates total expected annual loss across all occurrences." 
      },
      { 
        text: "Exposure Factor (EF)", 
        isCorrect: false, 
        whyWrong: "EF measures loss percentage during a threat event." 
      }
    ],
    laymanExplanation: "Single Loss Expectancy (SLE) calculates the dollar loss resulting from a single risk event."
  },
  {
    id: 210,
    question: "An administrator configures a server firewall to block all incoming traffic by default unless an explicit permit rule exists. What security concept is implemented?",
    options: [
      { 
        text: "Implicit deny", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Explicit allow", 
        isCorrect: false, 
        whyWrong: "Explicit allow describes specific permitted rules, but default blocking is Implicit Deny." 
      },
      { 
        text: "Separation of duties", 
        isCorrect: false, 
        whyWrong: "Separation of duties splits critical tasks between multiple people." 
      },
      { 
        text: "Least privilege", 
        isCorrect: false, 
        whyWrong: "Least privilege restricts user permissions to job duties." 
      }
    ],
    laymanExplanation: "Implicit Deny blocks everything by default! If a traffic packet does not match an allowed rule, it is automatically dropped."
  },
  {
    id: 211,
    question: "What process involves identifying, cataloging, and classifying all hardware and software assets connected to an organization's network?",
    options: [
      { 
        text: "Asset management / inventory", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Vulnerability scanning", 
        isCorrect: false, 
        whyWrong: "Vulnerability scanning probes for software patches and bugs." 
      },
      { 
        text: "Penetration testing", 
        isCorrect: false, 
        whyWrong: "Penetration testing simulates cyberattacks." 
      },
      { 
        text: "Incident containment", 
        isCorrect: false, 
        whyWrong: "Incident containment isolates infected endpoints." 
      }
    ],
    laymanExplanation: "Asset Management tracks all company hardware and software! You cannot protect what you don't know exists."
  },
  {
    id: 212,
    question: "What incident response document outlines high-level organizational goals, executive authority, and team roles for security incidents?",
    options: [
      { 
        text: "Incident response policy", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Incident response playbook", 
        isCorrect: false, 
        whyWrong: "Playbooks detail specific step-by-step technical threat commands." 
      },
      { 
        text: "Standard operating procedure", 
        isCorrect: false, 
        whyWrong: "SOPs guide routine day-to-day IT maintenance tasks." 
      },
      { 
        text: "Business continuity plan", 
        isCorrect: false, 
        whyWrong: "BCP guides facility operations during outages." 
      }
    ],
    laymanExplanation: "An Incident Response Policy sets executive authority and defines organizational team roles."
  },
  {
    id: 213,
    question: "What risk response option involves taking out an insurance policy to cover financial losses caused by data breaches?",
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
        text: "Risk mitigation", 
        isCorrect: false, 
        whyWrong: "Risk mitigation deploys technical security controls." 
      },
      { 
        text: "Risk acceptance", 
        isCorrect: false, 
        whyWrong: "Risk acceptance absorbs financial losses internally." 
      }
    ],
    laymanExplanation: "Purchasing insurance is Risk Transfer! It shifts breach financial losses to an insurance company."
  },
  {
    id: 214,
    question: "What metric measures the expected average duration required to repair a failed system component and return it to service?",
    options: [
      { 
        text: "MTTR (Mean Time to Repair)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "MTBF (Mean Time Between Failures)", 
        isCorrect: false, 
        whyWrong: "MTBF tracks hardware operational lifespan." 
      },
      { 
        text: "RTO (Recovery Time Objective)", 
        isCorrect: false, 
        whyWrong: "RTO measures target downtime limits." 
      },
      { 
        text: "RPO (Recovery Point Objective)", 
        isCorrect: false, 
        whyWrong: "RPO measures acceptable data loss time." 
      }
    ],
    laymanExplanation: "Mean Time to Repair (MTTR) tracks repair speed for broken hardware."
  },
  {
    id: 215,
    question: "What GDPR role is designated as the individual human user whose personal data is collected and processed?",
    options: [
      { 
        text: "Data subject", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data controller", 
        isCorrect: false, 
        whyWrong: "Data controller is the organization entity determining data processing purpose." 
      },
      { 
        text: "Data processor", 
        isCorrect: false, 
        whyWrong: "Data processor processes data under contract." 
      },
      { 
        text: "Data protection officer", 
        isCorrect: false, 
        whyWrong: "DPOs supervise internal organizational compliance with GDPR." 
      }
    ],
    laymanExplanation: "The Data Subject is the human individual whose personal data is collected under GDPR."
  },
  {
    id: 216,
    question: "What penetration testing concept refers to moving sideways across an internal network host-by-host using harvested credentials?",
    options: [
      { 
        text: "Lateral movement", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Pivoting", 
        isCorrect: false, 
        whyWrong: "Pivoting routes network traffic through a compromised relay host." 
      },
      { 
        text: "Persistence", 
        isCorrect: false, 
        whyWrong: "Persistence installs backdoors to survive system reboots." 
      },
      { 
        text: "Escalation", 
        isCorrect: false, 
        whyWrong: "Privilege escalation increases administrative user permissions." 
      }
    ],
    laymanExplanation: "Moving host-to-host across internal networks using stolen passwords is Lateral Movement."
  },
  {
    id: 217,
    question: "An organization sets an RPO of 2 hours. What does this target mean?",
    options: [
      { 
        text: "Maximum acceptable data loss is limited to 2 hours of transactions", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Systems must be brought back online within 2 hours of a failure", 
        isCorrect: false, 
        whyWrong: "Bringing systems online in 2 hours defines Recovery Time Objective (RTO)." 
      },
      { 
        text: "Hardware repair must take less than 2 hours", 
        isCorrect: false, 
        whyWrong: "Hardware repair duration is Mean Time to Repair (MTTR)." 
      },
      { 
        text: "System backups must take 2 hours to execute", 
        isCorrect: false, 
        whyWrong: "Backup window duration tracks backup execution time." 
      }
    ],
    laymanExplanation: "An RPO of 2 hours limits data loss! It means the business can tolerate losing a maximum of 2 hours of data transactions during an outage."
  },
  {
    id: 218,
    question: "What type of pentesting exercise provides the tester with full internal access to source code, network diagrams, and system configurations?",
    options: [
      { 
        text: "Known environment (White box)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Unknown environment (Black box)", 
        isCorrect: false, 
        whyWrong: "Unknown environment tests provide zero internal details." 
      },
      { 
        text: "Partially known environment (Gray box)", 
        isCorrect: false, 
        whyWrong: "Partially known environment tests provide limited target details." 
      },
      { 
        text: "Blind test", 
        isCorrect: false, 
        whyWrong: "Blind tests keep target defenders unannounced." 
      }
    ],
    laymanExplanation: "A Known Environment (White Box) pentest provides full architecture diagrams and source code."
  },
  {
    id: 219,
    question: "What type of agreement defines specific project deliverables, timelines, and payment milestones under an existing Master Services Agreement (MSA)?",
    options: [
      { 
        text: "Statement of Work (SOW)", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Non-Disclosure Agreement (NDA)", 
        isCorrect: false, 
        whyWrong: "NDAs protect confidential data secrecy." 
      },
      { 
        text: "Business Partners Agreement (BPA)", 
        isCorrect: false, 
        whyWrong: "BPAs govern business partner profit-sharing." 
      },
      { 
        text: "Service Level Agreement (SLA)", 
        isCorrect: false, 
        whyWrong: "SLAs govern vendor technical uptime metrics." 
      }
    ],
    laymanExplanation: "A Statement of Work (SOW) details project scope, milestones, and deliverables under a Master Services Agreement (MSA)."
  },
  {
    id: 220,
    question: "What phase of incident response involves isolating infected endpoints from the network to stop active attack propagation?",
    options: [
      { 
        text: "Containment", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Preparation", 
        isCorrect: false, 
        whyWrong: "Preparation builds toolkits before incidents happen." 
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
    laymanExplanation: "Isolating infected endpoints happens during Containment to stop malware from spreading."
  },
  {
    id: 221,
    question: "What quantitative formula calculates Annualized Loss Expectancy (ALE)?",
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
        text: "ALE = AV / EF", 
        isCorrect: false, 
        whyWrong: "Incorrect formula." 
      }
    ],
    laymanExplanation: "ALE = SLE × ARO! Multiply single event loss (SLE) by annual frequency (ARO) to calculate Annualized Loss Expectancy."
  },
  {
    id: 222,
    question: "What type of vulnerability scan requires valid login credentials to audit internal OS files, patches, and registry settings?",
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
    laymanExplanation: "Credentialed Scans use valid login accounts to audit internal OS settings and patches."
  },
  {
    id: 223,
    question: "Which role in data governance is accountable for establishing data classification labels and defining security rules?",
    options: [
      { 
        text: "Data owner", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Data custodian", 
        isCorrect: false, 
        whyWrong: "Data custodians manage technical storage and backups." 
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
    laymanExplanation: "Data Owners classify data and define security rules!"
  },
  {
    id: 224,
    question: "What penetration testing technique installs backdoors, startup registry keys, or scheduled tasks to maintain access across system reboots?",
    options: [
      { 
        text: "Persistence", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Pivoting", 
        isCorrect: false, 
        whyWrong: "Pivoting routes network traffic through a compromised relay host." 
      },
      { 
        text: "Lateral movement", 
        isCorrect: false, 
        whyWrong: "Lateral movement moves sideways host-to-host." 
      },
      { 
        text: "Privilege escalation", 
        isCorrect: false, 
        whyWrong: "Privilege escalation increases administrative user permissions." 
      }
    ],
    laymanExplanation: "Installing backdoors to survive system reboots is Persistence."
  },
  {
    id: 225,
    question: "What regulatory law governs patient health record privacy and security in the United States?",
    options: [
      { 
        text: "HIPAA", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "GLBA", 
        isCorrect: false, 
        whyWrong: "GLBA protects consumer financial records." 
      },
      { 
        text: "GDPR", 
        isCorrect: false, 
        whyWrong: "GDPR is European Union general privacy regulation." 
      },
      { 
        text: "PCI DSS", 
        isCorrect: false, 
        whyWrong: "PCI DSS is credit card payment industry standard." 
      }
    ],
    laymanExplanation: "The Health Insurance Portability and Accountability Act (HIPAA) protects medical health records in the US."
  },
  {
    id: 226,
    question: "What risk management response is chosen when an organization decides to discontinue an unpatchable legacy application completely?",
    options: [
      { 
        text: "Risk avoidance", 
        isCorrect: true, 
        whyWrong: "" 
      },
      { 
        text: "Risk mitigation", 
        isCorrect: false, 
        whyWrong: "Risk mitigation deploys technical controls while keeping the application online." 
      },
      { 
        text: "Risk transfer", 
        isCorrect: false, 
        whyWrong: "Risk transfer buys insurance to cover breach losses." 
      },
      { 
        text: "Risk acceptance", 
        isCorrect: false, 
        whyWrong: "Risk acceptance keeps the unpatchable application running without changes." 
      }
    ],
    laymanExplanation: "Decommissioning an unpatchable application completely is Risk Avoidance."
  },
  {
    id: 227,
    question: "What post-incident activity brings together incident handlers and stakeholders to document root causes, review team performance, and update playbooks?",
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
        text: "Recovery", 
        isCorrect: false, 
        whyWrong: "Recovery brings clean systems back online." 
      }
    ],
    laymanExplanation: "Lessons Learned evaluates root causes and updates playbooks after an incident to improve future response!"
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

export default function Domain5DumpsBatch11Mcq({ onBack }) {
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
            Batch 11: Questions 201 - 227 🎓 (Final Batch!)
          </h1>
          <p className="text-purple-100 font-medium text-sm mt-1">
            Verified scenario questions covering Shadow IT/BYOD, ISO 27002, Malicious Insiders, Vishing, Phishing Metrics, Cold Sites, Implicit Deny, Asset Management, HIPAA, and Lessons Learned!
          </p>
        </div>

        <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl font-bold shrink-0">
          🎓
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
                <span>{currentIdx + 1 < questions.length ? 'Next Question →' : 'See Complete Bank Results 🎓'}</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Final Completion Screen */
        <div className="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm text-center space-y-6 animate-fadeIn">
          <div className="w-24 h-24 mx-auto rounded-full bg-emerald-100 border-4 border-emerald-400 flex items-center justify-center text-5xl shadow-lg">
            🎓
          </div>

          <div className="space-y-2">
            <h4 className="text-3xl font-black text-slate-900">Entire Exam Bank Completed! 🎉</h4>
            <p className="text-slate-600 font-medium text-base">
              You scored <strong className="text-purple-600 font-black text-xl">{score}</strong> out of <strong className="font-black text-xl">{questions.length}</strong> on Batch 11!
            </p>
          </div>

          <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 rounded-2xl max-w-lg mx-auto text-emerald-950 text-sm font-semibold space-y-2">
            <div className="text-base font-black text-emerald-800">🏆 CONGRATULATIONS!</div>
            <p>
              You have officially completed all <strong>227 verified questions</strong> from the official CompTIA Security+ SY0-701 exam bank!
            </p>
          </div>

          <button
            onClick={handleReshuffleAndRestart}
            className="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-purple-200 transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <Shuffle className="w-5 h-5" /> Reshuffle Options & Retake Batch 11 🎲
          </button>
        </div>
      )}

    </div>
  );
}
