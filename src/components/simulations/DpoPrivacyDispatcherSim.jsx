import React, { useState } from 'react';
import { UserCheck, Trash2, ShieldCheck, Ban, CheckCircle2, FileText } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DpoPrivacyDispatcherSim() {
  const [activeTicket, setActiveTicket] = useState('ticket_a');

  const tickets = {
    ticket_a: {
      title: "Ticket #1: Right-to-be-Forgotten (EU Citizen)",
      type: "PII Request (IP Address & Email)",
      desc: "An EU citizen requests complete deletion of their web browsing IP addresses and account email under GDPR Article 17.",
      actionText: "Execute Data Deletion Shredder 🗑️",
      dpoDecision: "APPROVED & SHREDDED: All PII permanently purged from production databases within 30 days.",
      statusIcon: "🗑️"
    },
    ticket_b: {
      title: "Ticket #2: Electronic Health Records Audit",
      type: "PHI Request (Patient Medical History)",
      desc: "Hospital compliance auditor requests access log verifying only authorized doctors viewed patient PHI.",
      actionText: "Verify PHI Audit Logs 🔒",
      dpoDecision: "VERIFIED: Patient PHI access restricted to treating physician only with encrypted audit trails.",
      statusIcon: "🏥"
    },
    ticket_c: {
      title: "Ticket #3: Marketing Third-Party Data Sale",
      type: "PII Commercial Request",
      desc: "Marketing department requests sharing user email lists and IP logs with an ad broker.",
      actionText: "REJECT REQUEST 🛑",
      dpoDecision: "REJECTED: Unlawful under GDPR & Privacy Policies without explicit opt-in consent!",
      statusIcon: "🛑"
    }
  };

  const current = tickets[activeTicket];

  const handleSelectTicket = (key) => {
    sounds.playPop();
    setActiveTicket(key);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Privacy Leadership • DPO, PII, PHI</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Data Protection Officer (DPO) Privacy Dispatcher! 👔⚖️
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            The <strong>Data Protection Officer (DPO)</strong> is an independent privacy executive mandated by GDPR to oversee data privacy, handle <strong>PII/PHI</strong> rights requests, and liaise with regulatory authorities!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A corporate ombudsman protecting citizen rights inside the company.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Ticket List (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <UserCheck class="w-5 h-5 text-purple-600" />
            <span>DPO Privacy Ticket Queue</span>
          </h4>

          <div class="space-y-2">
            {Object.keys(tickets).map(key => {
              const t = tickets[key];
              const isSelected = key === activeTicket;

              return (
                <button
                  key={key}
                  onClick={() => handleSelectTicket(key)}
                  class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-sm font-extrabold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span class="text-xl">{t.statusIcon}</span>
                  <span>{t.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">DPO Ruling Ledger</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-purple-500 text-white uppercase">
              {current.type}
            </span>
          </div>

          {/* Detailed Ticket Content */}
          <div class="my-4 space-y-3">
            <h3 class="text-2xl font-extrabold text-purple-300">{current.title}</h3>
            
            <p class="text-slate-200 text-sm leading-relaxed font-sans">
              {current.desc}
            </p>

            <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1 font-mono text-xs">
              <div class="text-purple-300 font-bold">DPO Action:</div>
              <div class="text-emerald-400 font-bold">{current.actionText}</div>
            </div>
          </div>

          {/* DPO Ruling Status Banner */}
          <div class="p-4 bg-purple-950/80 border border-purple-500 rounded-2xl text-xs font-semibold text-center text-purple-200">
            <span>👔 <strong>DPO RULING:</strong> {current.dpoDecision}</span>
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">DPO = Data Protection Officer</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PII = Personally Identifiable Info</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PHI = Protected Health Info</span>
          </div>

        </div>

      </div>

    </div>
  );
}
