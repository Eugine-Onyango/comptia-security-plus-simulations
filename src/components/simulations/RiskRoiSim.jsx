import React, { useState } from 'react';
import { Scale, CheckCircle2, TrendingUp, ShieldCheck, DollarSign } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RiskRoiSim() {
  const [safeguardDeployed, setSafeguardDeployed] = useState(false);

  const baselineAle = 50000; // $50,000 / yr
  const safeguardCost = 12000; // $12,000 / yr
  const newAle = 5000; // $5,000 / yr

  const netSavings = baselineAle - newAle - safeguardCost; // $33,000 / yr

  const handleToggleSafeguard = () => {
    sounds.playSuccess();
    setSafeguardDeployed(!safeguardDeployed);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Risk Cost-Benefit Analysis • Safeguard ROI</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Security Control Cost-Benefit & ROI Analyzer! ⚖️💰
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            A security control is financially justified when the annual cost of the control is less than the reduction in expected annual risk loss (<strong>ALE Baseline - ALE New &gt; Control Cost</strong>)!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Buying a $100 bike lock to protect a $1,000 bicycle makes financial sense.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Scale class="w-5 h-5 text-purple-600" />
            <span>Safeguard Deployment Station</span>
          </h4>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-2 font-mono text-xs">
            <div class="text-purple-300 font-bold">Proposed Safeguard Control:</div>
            <div class="text-slate-200 font-sans font-medium">
              "Offsite Cloud Disaster Replication & Backup Vault"
            </div>
            
            <div class="pt-2 border-t border-white/10 text-[11px] text-slate-400">
              Annual Subscription Cost: <span class="text-amber-400 font-bold">$12,000 / Year</span>
            </div>
          </div>

          <button
            onClick={handleToggleSafeguard}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              safeguardDeployed
                ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
            }`}
          >
            <ShieldCheck class="w-5 h-5" />
            <span>{safeguardDeployed ? 'Remove Safeguard Control' : 'Deploy $12,000 Safeguard Control'}</span>
          </button>
        </div>

        {/* Visual ROI Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Risk Cost-Benefit Ledger</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              safeguardDeployed ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
            }`}>
              {safeguardDeployed ? 'POSITIVE SECURITY ROI 🟢' : 'HIGH UNMITIGATED RISK 🔴'}
            </span>
          </div>

          {/* Ledger Numbers */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex justify-between items-center">
              <span>Baseline ALE (No Safeguard):</span>
              <span class="text-rose-400 font-extrabold text-sm">${baselineAle.toLocaleString()} / Year</span>
            </div>

            <div className={`p-3.5 rounded-xl border flex justify-between items-center transition-all ${
              safeguardDeployed ? 'bg-indigo-950 border-indigo-500 text-indigo-100' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <span>New ALE (With Safeguard):</span>
              <span className={safeguardDeployed ? 'text-emerald-400 font-extrabold text-sm' : 'text-slate-500'}>
                {safeguardDeployed ? `$${newAle.toLocaleString()} / Year` : 'N/A'}
              </span>
            </div>

            <div className={`p-3.5 rounded-xl border flex justify-between items-center transition-all ${
              safeguardDeployed ? 'bg-emerald-950 border-emerald-500 text-emerald-100' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <span>Net Annual Cost Benefit (ROI):</span>
              <span className={safeguardDeployed ? 'text-emerald-300 font-black text-base' : 'text-slate-500'}>
                {safeguardDeployed ? `+$${netSavings.toLocaleString()} / Year SAVED!` : '$0'}
              </span>
            </div>

          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            safeguardDeployed
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-rose-950 border-rose-500 text-rose-200'
          }`}>
            {safeguardDeployed ? (
              <span>🟢 <strong>JUSTIFIED SAFEGUARD:</strong> Spending $12,000/yr reduces ALE risk by $45,000/yr, delivering a net profit savings of +$33,000 per year!</span>
            ) : (
              <span>🔴 <strong>UNMITIGATED EXPOSURE:</strong> High $50,000 annual loss expectancy. Deploy safeguard to protect enterprise capital.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">ALE Baseline - ALE New &gt; Safeguard Cost</span>
          </div>

        </div>

      </div>

    </div>
  );
}
