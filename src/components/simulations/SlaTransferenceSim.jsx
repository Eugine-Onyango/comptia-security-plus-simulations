import React, { useState } from 'react';
import { DollarSign, ShieldAlert, CheckCircle2, Clock, RefreshCw, Handshake } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function SlaTransferenceSim() {
  const [isOutage, setIsOutage] = useState(false);
  const [refundAccrued, setRefundAccrued] = useState(0);

  const handleSimulateOutage = () => {
    sounds.playBuzzer();
    setIsOutage(true);
    setRefundAccrued(25000);
  };

  const handleReset = () => {
    sounds.playSuccess();
    setIsOutage(false);
    setRefundAccrued(0);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Risk Transference • SLA Contracts</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            SLA Contract Risk Transference Simulator! 🤝💰
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            Signing a <strong>Service Level Agreement (SLA)</strong> transfers operational and financial uptime risk to a third-party vendor. When outages occur, the SLA enforces financial refund penalties against the vendor!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Flight delay insurance: airline pays you $500 if your flight is delayed over 3 hours.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Controls Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Handshake class="w-5 h-5 text-purple-600" />
            <span>SLA Vendor Contract</span>
          </h4>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-2 font-mono text-xs">
            <div class="text-purple-300 font-bold">Cloud Vendor Uptime Contract:</div>
            <div class="text-slate-200 font-sans font-medium">
              "Guaranteed 99.99% Uptime SLA. Penalty: $5,000 credit per hour of unscheduled outage."
            </div>
          </div>

          {!isOutage ? (
            <button
              onClick={handleSimulateOutage}
              class="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <ShieldAlert class="w-4 h-4" />
              <span>Simulate 5-Hour Cloud Outage</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              class="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw class="w-4 h-4" />
              <span>Restore Cloud Service & Claim Refund</span>
            </button>
          )}
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">SLA Transference Financial Ledger</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              isOutage ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {isOutage ? 'OUTAGE IN PROGRESS 🚨' : 'SYSTEM ONLINE 🟢'}
            </span>
          </div>

          {/* Ledger Numbers */}
          <div class="my-4 space-y-3 font-mono text-xs">
            <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>Contracted SLA Uptime:</span>
              <span class="text-purple-300 font-extrabold">99.99% (Four Nines)</span>
            </div>

            <div className={`p-3.5 rounded-xl border flex justify-between items-center transition-all ${
              isOutage ? 'bg-rose-950 border-rose-500 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <span>Cloud Vendor Outage Duration:</span>
              <span className={isOutage ? 'text-rose-400 font-extrabold text-sm' : 'text-slate-500'}>
                {isOutage ? '5 Hours (SLA Breach)' : '0 Hours'}
              </span>
            </div>

            <div className={`p-3.5 rounded-xl border flex justify-between items-center transition-all ${
              isOutage ? 'bg-emerald-950 border-emerald-500 text-emerald-100' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <span>Vendor SLA Penalty Payout:</span>
              <span className={isOutage ? 'text-emerald-300 font-black text-base' : 'text-slate-500'}>
                {isOutage ? `+$${refundAccrued.toLocaleString()} REFUND CREDIT` : '$0'}
              </span>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            isOutage
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-purple-950 border-purple-500 text-purple-200'
          }`}>
            {isOutage ? (
              <span>🤝 <strong>RISK TRANSFERENCE ACTIVE:</strong> Because an SLA contract was signed, the vendor pays a $25,000 penalty refund credit for the 5-hour outage!</span>
            ) : (
              <span>📜 <strong>SLA Active:</strong> Operational risk is transferred to the cloud provider under formal uptime contract.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SLA = Service Level Agreement</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Risk Transference</span>
          </div>

        </div>

      </div>

    </div>
  );
}
