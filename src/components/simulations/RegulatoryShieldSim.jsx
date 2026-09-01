import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CreditCard, Activity, DollarSign, Globe, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RegulatoryShieldSim() {
  const [activeReg, setActiveReg] = useState('sox'); // 'sox', 'hipaa', 'pci_dss', 'gdpr'

  const handleSelectReg = (reg) => {
    sounds.playPop();
    setActiveReg(reg);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Regulatory Mandates • SOX, HIPAA, PCI DSS, GDPR</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            The 4 Regulatory Compliance Guardians! 🏛️💳
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Security architectures must comply with legal mandates: <strong>SOX</strong> for financial accounting, <strong>HIPAA</strong> for healthcare privacy, <strong>PCI DSS</strong> for credit card security, and <strong>GDPR</strong> for EU data privacy!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Building inspector enforcing health code, fire safety, financial audits, and privacy laws.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-indigo-600" />
            <span>Select Regulatory Mandate</span>
          </h4>

          <div class="space-y-2">
            <button
              onClick={() => handleSelectReg('sox')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                activeReg === 'sox'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <DollarSign class="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <div class="font-extrabold text-sm">SOX (Sarbanes-Oxley)</div>
                <div class="text-[11px] text-slate-500 font-medium">Financial audit trail & corporate governance.</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectReg('hipaa')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                activeReg === 'hipaa'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <Activity class="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <div class="font-extrabold text-sm">HIPAA (Healthcare)</div>
                <div class="text-[11px] text-slate-500 font-medium">Protected Health Information (PHI) privacy.</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectReg('pci_dss')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                activeReg === 'pci_dss'
                  ? 'border-sky-500 bg-sky-50 text-sky-950 shadow-sm'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <CreditCard class="w-5 h-5 text-sky-600 shrink-0" />
              <div>
                <div class="font-extrabold text-sm">PCI DSS (Credit Cards)</div>
                <div class="text-[11px] text-slate-500 font-medium">Payment card data encryption & network segmentation.</div>
              </div>
            </button>

            <button
              onClick={() => handleSelectReg('gdpr')}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                activeReg === 'gdpr'
                  ? 'border-blue-500 bg-blue-50 text-blue-950 shadow-sm'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              <Globe class="w-5 h-5 text-blue-600 shrink-0" />
              <div>
                <div class="font-extrabold text-sm">GDPR (EU Data Privacy)</div>
                <div class="text-[11px] text-slate-500 font-medium">European Union privacy & Right to be Forgotten.</div>
              </div>
            </button>
          </div>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Regulatory Security Controls</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
              activeReg === 'sox' ? 'bg-amber-400 text-slate-950' : activeReg === 'hipaa' ? 'bg-emerald-400 text-slate-950' : activeReg === 'pci_dss' ? 'bg-sky-400 text-slate-950' : 'bg-blue-400 text-white'
            }`}>
              {activeReg.toUpperCase()} MANDATE
            </span>
          </div>

          {/* Dynamic Content Display */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            {activeReg === 'sox' && (
              <div class="p-4 bg-amber-950/80 border border-amber-500 rounded-2xl space-y-2 text-amber-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span>SOX Financial Ledger Control</span>
                  <span class="text-[10px] bg-amber-900 px-2 py-0.5 rounded text-amber-200">IMMUTABLE LOGS</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Enforces strict internal controls, immutable financial auditing logs, and tamper-proof accounting records to prevent corporate fraud.
                </p>
              </div>
            )}

            {activeReg === 'hipaa' && (
              <div class="p-4 bg-emerald-950/80 border border-emerald-500 rounded-2xl space-y-2 text-emerald-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span>HIPAA ePHI Medical Record Shield</span>
                  <span class="text-[10px] bg-emerald-900 px-2 py-0.5 rounded text-emerald-200">HEALTH PRIVACY</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Mandates AES encryption for electronic Protected Health Information (ePHI) at rest and in transit across hospitals and healthcare providers.
                </p>
              </div>
            )}

            {activeReg === 'pci_dss' && (
              <div class="p-4 bg-sky-950/80 border border-sky-500 rounded-2xl space-y-2 text-sky-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span>PCI DSS Credit Card Vault</span>
                  <span class="text-[10px] bg-sky-900 px-2 py-0.5 rounded text-sky-200">CARD SECURITY</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Requires network segmentation of payment servers, credit card number (PAN) encryption, Layer 7 WAF firewalls, and annual audits.
                </p>
              </div>
            )}

            {activeReg === 'gdpr' && (
              <div class="p-4 bg-blue-950/80 border border-blue-500 rounded-2xl space-y-2 text-blue-100">
                <div class="flex items-center justify-between font-bold text-sm">
                  <span>GDPR European Privacy Rights</span>
                  <span class="text-[10px] bg-blue-900 px-2 py-0.5 rounded text-blue-200">EU PRIVACY</span>
                </div>
                <p class="text-[11px] font-sans font-medium text-slate-300">
                  Grants EU citizens data sovereignty, Right to be Forgotten data deletion rights, and mandates strict PII data minimization.
                </p>
              </div>
            )}

          </div>

          {/* Status Banner */}
          <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-semibold text-center text-indigo-200">
            {activeReg === 'sox' && <span>📊 <strong>SOX:</strong> Protects financial ledgers and requires internal control auditing.</span>}
            {activeReg === 'hipaa' && <span>⚕️ <strong>HIPAA:</strong> Protects patient medical data (PHI) with physical & technical safeguards.</span>}
            {activeReg === 'pci_dss' && <span>💳 <strong>PCI DSS:</strong> Protects credit card transactions and cardholder environments.</span>}
            {activeReg === 'gdpr' && <span>🇪🇺 <strong>GDPR:</strong> Protects personal data privacy for EU citizens with data deletion rights.</span>}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SOX = Financial</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">HIPAA = Healthcare</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PCI DSS = Credit Cards</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">GDPR = EU Privacy</span>
          </div>

        </div>

      </div>

    </div>
  );
}
