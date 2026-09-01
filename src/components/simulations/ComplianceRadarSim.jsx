import React, { useState } from 'react';
import { ShieldCheck, CreditCard, Stethoscope, TrendingUp, Landmark, FileText, Globe } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ComplianceRadarSim() {
  const [selectedLaw, setSelectedLaw] = useState('pci_dss');

  const regulations = {
    pci_dss: {
      title: "1. PCI DSS",
      fullName: "Payment Card Industry Data Security Standard",
      icon: "💳",
      target: "Credit Cards & Payment Data",
      fine: "Up to $100,000 / month + Revoked card processing",
      requirements: "Mandatory AES-256 encryption for cardholder data, firewalls, and annual audits.",
      analogy: "A high-security vault specifically built for credit cards."
    },
    sox: {
      title: "2. SOX",
      fullName: "Sarbanes-Oxley Act",
      icon: "📈",
      target: "Public Company Financial Ledgers & Audits",
      fine: "Up to $5,000,000 fine + 20 years prison for CEOs",
      requirements: "Strict internal accounting controls, tamper-proof audit trails, and financial logging.",
      analogy: "A tamper-proof glass lockbox for company accounting books."
    },
    hipaa: {
      title: "3. HIPAA",
      fullName: "Health Insurance Portability and Accountability Act",
      icon: "🏥",
      target: "Protected Health Information (PHI)",
      fine: "Up to $1,500,000 / year",
      requirements: "Encrypt patient medical records, limit access to authorized medical staff only.",
      analogy: "A confidential medical file cabinet accessible only by your doctor."
    },
    glba: {
      title: "4. GLBA",
      fullName: "Gramm-Leach-Bliley Act",
      icon: "🏦",
      target: "Financial Institution Consumer Data",
      fine: "Up to $100,000 per violation for financial institutions",
      requirements: "Safeguards rule for customer non-public financial info, clear privacy notices.",
      analogy: "A bank privacy envelope protecting your mortgage application."
    },
    nda: {
      title: "5. NDA",
      fullName: "Non-Disclosure Agreement",
      icon: "📜",
      target: "Proprietary Trade Secrets & Secret Designs",
      fine: "Civil lawsuits + Million-dollar breach damages",
      requirements: "Legal contract prohibiting disclosure of sensitive company intellectual property.",
      analogy: "A pinky-promise contract keeping secret inventions confidential."
    },
    gdpr: {
      title: "6. GDPR",
      fullName: "General Data Protection Regulation (EU)",
      icon: "🇪🇺",
      target: "European Union Citizens' Personal Privacy Data",
      fine: "Up to €20,000,000 or 4% of Global Annual Revenue",
      requirements: "Right to be forgotten (deletion), explicit cookie consent, 72-hour breach notice.",
      analogy: "A powerful shield giving EU citizens total control over their personal online data."
    }
  };

  const current = regulations[selectedLaw];

  const handleSelect = (key) => {
    sounds.playPop();
    setSelectedLaw(key);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Regulatory Frameworks • PCI DSS, SOX, HIPAA, GLBA, NDA, GDPR</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            The 6 Regulatory Compliance Guardians! 🏛️⚖️
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Organizations must comply with legal standards governing payment cards (<strong>PCI DSS</strong>), corporate finances (<strong>SOX</strong>), health records (<strong>HIPAA</strong>), banking (<strong>GLBA</strong>), secrecy (<strong>NDA</strong>), and EU privacy (<strong>GDPR</strong>)!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Building codes for different industries (Restaurants, Hospitals, Banks, Airlines).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Regulation Buttons (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-indigo-600" />
            <span>Select Regulatory Framework</span>
          </h4>

          <div class="grid grid-cols-2 gap-2">
            {Object.keys(regulations).map(key => {
              const reg = regulations[key];
              const isSelected = key === selectedLaw;

              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  class={`p-3 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm font-extrabold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span class="text-lg">{reg.icon}</span>
                  <span>{reg.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Regulatory Inspection Ledger</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500 text-white uppercase">
              {current.title} MANDATE
            </span>
          </div>

          {/* Detailed Content */}
          <div class="my-4 space-y-3">
            <div class="flex items-center gap-3">
              <span class="text-4xl">{current.icon}</span>
              <div>
                <h3 class="text-2xl font-extrabold text-indigo-300">{current.title}</h3>
                <div class="text-xs font-bold text-slate-400">{current.fullName}</div>
              </div>
            </div>

            <div class="p-3.5 bg-slate-950 border border-slate-800 rounded-2xl space-y-1 font-mono text-xs">
              <div class="text-amber-400 font-bold">Protected Asset:</div>
              <div class="text-slate-200 font-sans">{current.target}</div>
            </div>

            <div class="p-3.5 bg-rose-950/80 border border-rose-500 rounded-2xl space-y-1 font-mono text-xs">
              <div class="text-rose-300 font-bold">Non-Compliance Penalty Fine:</div>
              <div class="text-rose-200 font-extrabold font-sans">{current.fine}</div>
            </div>

            <div class="p-3.5 bg-indigo-950/80 border border-indigo-500 rounded-2xl space-y-1 font-mono text-xs">
              <div class="text-indigo-300 font-bold">Key Security Requirements:</div>
              <div class="text-slate-200 font-sans">{current.requirements}</div>
            </div>
          </div>

          {/* Status Banner */}
          <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-center text-indigo-200">
            <span>💡 <strong>ANALOGY:</strong> {current.analogy}</span>
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">PCI DSS = Credit Cards</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SOX = Financials</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">HIPAA = Health (PHI)</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">GLBA = Banking</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">NDA = Secrecy</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">GDPR = EU Privacy</span>
          </div>

        </div>

      </div>

    </div>
  );
}
