import React, { useState } from 'react';
import { Send, CheckCircle2, UserCheck, Shield, Award, Briefcase, FileText } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DataRolesDispatcherSim() {
  const [ticketId, setTicketId] = useState(1);
  const [dispatchedRole, setDispatchedRole] = useState(null);

  const tickets = [
    {
      id: 1,
      title: "Ticket #101: Access Request for Patient Medical Records (PHI)",
      desc: "A clinical researcher needs access to hospital diagnostic records containing PHI.",
      correctRole: 'dao',
      roleName: 'DAO (Data Asset Owner)',
      explanation: "The DAO (Data Asset Owner) owns the dataset and must approve or reject access requests based on data sensitivity and compliance!"
    },
    {
      id: 2,
      title: "Ticket #102: EU Customer GDPR Deletion Request (PII)",
      desc: "An EU citizen requests full deletion of their online account data under Article 17.",
      correctRole: 'dpo',
      roleName: 'DPO (Data Protection Officer)',
      explanation: "The DPO (Data Protection Officer) handles data privacy compliance and regulatory requests under GDPR!"
    },
    {
      id: 3,
      title: "Ticket #103: Ransomware Attack Outbreak Detected",
      desc: "SOC team detects active ransomware spreading across corporate endpoints.",
      correctRole: 'ciso',
      roleName: 'CISO (Chief Information Security Officer)',
      explanation: "The CISO leads cybersecurity operations, incident containment, and executive threat response!"
    },
    {
      id: 4,
      title: "Ticket #104: Annual Cyber Insurance & Security Budget Approval",
      desc: "Requesting $500,000 for SOC upgrades and multi-cloud security tooling.",
      correctRole: 'vp',
      roleName: 'VP (Vice President)',
      explanation: "The VP (Vice President) provides executive governance and approves corporate security budgets!"
    }
  ];

  const currentTicket = tickets.find(t => t.id === ticketId) || tickets[0];

  const handleDispatch = (role) => {
    if (role === currentTicket.correctRole) {
      sounds.playSuccess();
    } else {
      sounds.playBuzzer();
    }
    setDispatchedRole(role);
  };

  const handleNextTicket = () => {
    sounds.playPop();
    setDispatchedRole(null);
    if (ticketId < tickets.length) {
      setTicketId(prev => prev + 1);
    } else {
      setTicketId(1);
    }
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Governance Operations • DAO, DPO, CISO, VP</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Governance Ticket Dispatcher! 🎟️⚡
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            Read each security ticket and dispatch it to the correct executive role: <strong>DAO</strong> for dataset access, <strong>DPO</strong> for privacy rights, <strong>CISO</strong> for cyber threats, or <strong>VP</strong> for budget approval!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: 911 dispatch operator routing calls to Fire, Police, or Medical specialists.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Ticket Display Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <span class="text-xs font-bold text-purple-600 uppercase tracking-wider">Active Ticket {ticketId} of {tickets.length}</span>
            <span class="px-2.5 py-0.5 bg-purple-100 text-purple-900 font-extrabold rounded-full text-[10px]">INCOMING REQUEST</span>
          </div>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-2 font-mono text-xs">
            <div class="text-purple-300 font-bold text-sm">{currentTicket.title}</div>
            <p class="text-slate-300 font-sans font-medium text-xs leading-relaxed">
              {currentTicket.desc}
            </p>
          </div>

          <h5 class="font-extrabold text-slate-800 text-xs uppercase tracking-wider pt-2">Select Dispatch Target:</h5>

          <div class="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => handleDispatch('ciso')}
              class="p-3 bg-indigo-50 hover:bg-indigo-100 border-2 border-indigo-200 text-indigo-950 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Shield class="w-4 h-4 text-indigo-600 shrink-0" /> CISO (Cyber)
            </button>

            <button
              onClick={() => handleDispatch('dpo')}
              class="p-3 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 text-purple-950 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Award class="w-4 h-4 text-purple-600 shrink-0" /> DPO (Privacy)
            </button>

            <button
              onClick={() => handleDispatch('dao')}
              class="p-3 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 text-emerald-950 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <FileText class="w-4 h-4 text-emerald-600 shrink-0" /> DAO (Data Owner)
            </button>

            <button
              onClick={() => handleDispatch('vp')}
              class="p-3 bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 text-amber-950 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2"
            >
              <Briefcase class="w-4 h-4 text-amber-600 shrink-0" /> VP (Executive)
            </button>
          </div>
        </div>

        {/* Dispatch Result Display (Right) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
              <Send class="w-5 h-5 text-purple-600" />
              <span>Dispatch Result Status</span>
            </h4>

            {dispatchedRole ? (
              <div className={`mt-4 p-5 rounded-2xl border-2 space-y-2 transition-all ${
                dispatchedRole === currentTicket.correctRole
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50 border-rose-300 text-rose-950'
              }`}>
                <div class="font-extrabold text-sm flex items-center gap-2">
                  {dispatchedRole === currentTicket.correctRole ? '🎉 CORRECT DISPATCH!' : '🚨 INCORRECT DISPATCH!'}
                </div>
                <p class="text-xs font-medium leading-relaxed">
                  {currentTicket.explanation}
                </p>
              </div>
            ) : (
              <div class="mt-4 p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center text-slate-400 text-xs font-bold">
                Select an executive role to dispatch Ticket #{ticketId}.
              </div>
            )}
          </div>

          <button
            onClick={handleNextTicket}
            class="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <span>{ticketId < tickets.length ? 'Next Ticket Request →' : 'Reset Ticket Dispatcher 🔄'}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
