import React, { useState } from 'react';
import { Compass, ShieldCheck, Ban, RefreshCw, FileText, CheckCircle2, DollarSign } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RiskStrategyMatrixSim() {
  const [selectedStrategy, setSelectedStrategy] = useState('mitigation');

  const strategies = {
    mitigation: {
      title: "1. Risk Mitigation (Reduce)",
      icon: "🛡️",
      desc: "Implement technical or operational security controls (e.g. firewalls, encryption, MFA, patching) to decrease the likelihood or impact of the risk.",
      actionText: "Applied MFA & Firewall Controls 🟢",
      outcome: "System Risk Posture reduced from HIGH to LOW!"
    },
    avoidance: {
      title: "2. Risk Avoidance (Eliminate)",
      icon: "🛑",
      desc: "Completely halt or eliminate the risky business activity or application to remove the threat entirely.",
      actionText: "Decommissioned Legacy Server 🛑",
      outcome: "Threat completely eliminated! Asset no longer exposed to network."
    },
    transference: {
      title: "3. Risk Transference (Shift)",
      icon: "🤝",
      desc: "Shift the financial loss burden to a third party by purchasing cybersecurity insurance or signing a vendor Service Level Agreement (SLA).",
      actionText: "Purchased Cyber Insurance & Cloud SLA 🤝",
      outcome: "Financial impact transferred to insurance provider & cloud vendor!"
    },
    acceptance: {
      title: "4. Risk Acceptance (Tolerate)",
      icon: "🤷",
      desc: "Acknowledge and tolerate the risk without taking action when the cost of countermeasure exceeds the potential loss.",
      actionText: "Recorded Risk in Enterprise Risk Register 🤷",
      outcome: "Risk accepted by executive leadership. Monitored for changes."
    },
    exception: {
      title: "5. Risk Exception (Exempt)",
      icon: "📄",
      desc: "Formally document a temporary exemption for a non-compliant system when a security standard cannot be met immediately.",
      actionText: "Filed 60-Day Executive Policy Exemption 📄",
      outcome: "Temporary exemption granted until scheduled Q3 upgrade."
    }
  };

  const current = strategies[selectedStrategy];

  const handleSelect = (stratKey) => {
    sounds.playPop();
    setSelectedStrategy(stratKey);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Risk Strategies • Acceptance, Avoidance, Transference, Mitigation, Exception, SLA</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            The 5 Risk Treatment Decision Matrix! 🧭🛡️
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Organizations manage risk using 5 strategies: <strong>Mitigation</strong> (controls), <strong>Avoidance</strong> (stop activity), <strong>Transference</strong> (insurance/SLA), <strong>Acceptance</strong> (tolerate), and <strong>Exception</strong> (temporary waiver)!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Helmet (Mitigation), Staying home (Avoidance), Car Insurance (Transference), Minor bump (Acceptance).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Strategy Selector (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Compass class="w-5 h-5 text-indigo-600" />
            <span>Select Risk Strategy</span>
          </h4>

          <div class="space-y-2">
            {Object.keys(strategies).map(key => {
              const strat = strategies[key];
              const isSelected = key === selectedStrategy;

              return (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs transition-all flex items-center gap-3 ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm font-extrabold'
                      : 'border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <span class="text-xl">{strat.icon}</span>
                  <span>{strat.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Risk Strategy Outcome</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500 text-white uppercase">
              {selectedStrategy.toUpperCase()} STRATEGY
            </span>
          </div>

          {/* Detailed Content */}
          <div class="my-4 space-y-4">
            <div class="flex items-center gap-3">
              <span class="text-4xl">{current.icon}</span>
              <h3 class="text-2xl font-extrabold text-indigo-300">
                {current.title}
              </h3>
            </div>

            <p class="text-slate-200 text-sm leading-relaxed font-sans font-medium">
              {current.desc}
            </p>

            <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1 font-mono text-xs">
              <div class="text-indigo-300 font-bold">Execution Action:</div>
              <div class="text-emerald-400 font-bold">{current.actionText}</div>
            </div>
          </div>

          {/* Outcome Status Banner */}
          <div class="p-4 bg-indigo-950/80 border border-indigo-500 rounded-2xl text-xs font-semibold text-center text-indigo-200">
            <span>✨ <strong>OUTCOME:</strong> {current.outcome}</span>
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">Mitigation = Controls</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Avoidance = Halt</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Transference = Insurance/SLA</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Acceptance = Register</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Exception = Temporary Waiver</span>
          </div>

        </div>

      </div>

    </div>
  );
}
