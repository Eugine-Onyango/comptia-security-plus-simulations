import React, { useState } from 'react';
import { ClipboardCheck, Users, CheckCircle2, XCircle, FileText, AlertTriangle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CcbSopSim() {
  // CCB State
  const [ccbDecision, setCcbDecision] = useState(null); // 'approved' or 'rejected'

  // SOP State
  const [sopStep, setSopStep] = useState(1);

  const handleCcbVote = (decision) => {
    if (decision === 'approved') {
      sounds.playSuccess();
    } else {
      sounds.playBuzzer();
    }
    setCcbDecision(decision);
  };

  const handleNextSopStep = () => {
    sounds.playPop();
    if (sopStep < 4) {
      setSopStep(prev => prev + 1);
    } else {
      sounds.playSuccess();
      setSopStep(1);
    }
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Change & Operations • SOP, CCB</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            CCB Change Approval Board & SOP Checklist! 📋✍️
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            A <strong>CCB (Change Control Board)</strong> is a formal committee that votes to approve or reject system changes to prevent unexpected outages, while an <strong>SOP (Standard Operating Procedure)</strong> provides step-by-step instructions for routine operations!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Building permit board approval (CCB) vs Following a published recipe step-by-step (SOP).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* CCB Review Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Users class="w-5 h-5 text-purple-600" />
            <span>1. Change Control Board (CCB) Committee</span>
          </h4>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-2.5 font-mono text-xs">
            <div class="text-purple-300 font-bold">Proposed Change Ticket #4920:</div>
            <div class="text-slate-200 font-sans font-medium">
              "Upgrade Core Router Firmware & Modify Firewall Port Rules during off-peak hours."
            </div>
            
            <div class="pt-2 border-t border-white/10 text-[11px] text-slate-400">
              Required Artifacts: Fallback Plan ✅ | Business Impact Risk ✅ | Rollback Plan ✅
            </div>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleCcbVote('approved')}
              class="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 class="w-4 h-4" /> CCB Approve Change
            </button>

            <button
              onClick={() => handleCcbVote('rejected')}
              class="py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <XCircle class="w-4 h-4" /> CCB Reject Change
            </button>
          </div>

          {ccbDecision && (
            <div className={`p-3.5 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              ccbDecision === 'approved' ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              {ccbDecision === 'approved' 
                ? '🟢 CCB VOTED APPROVED: Change scheduled for maintenance window with fallback plan.' 
                : '🔴 CCB VOTED REJECTED: Change ticket sent back for risk assessment revisions.'}
            </div>
          )}
        </div>

        {/* SOP Checklist Panel (Right) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <ClipboardCheck class="w-5 h-5 text-purple-600" />
            <span>2. Standard Operating Procedure (SOP) Checklist</span>
          </h4>

          <div class="space-y-2 font-mono text-xs">
            <div className={`p-3 rounded-xl border flex items-center justify-between ${sopStep >= 1 ? 'bg-purple-950 border-purple-500 text-purple-100' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <span>Step 1: Identify & Verify Security Alert</span>
              {sopStep >= 1 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${sopStep >= 2 ? 'bg-purple-950 border-purple-500 text-purple-100' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <span>Step 2: Isolate Affected Host from Network</span>
              {sopStep >= 2 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${sopStep >= 3 ? 'bg-purple-950 border-purple-500 text-purple-100' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <span>Step 3: Collect RAM Memory & Disk Artifacts</span>
              {sopStep >= 3 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${sopStep >= 4 ? 'bg-purple-950 border-purple-500 text-purple-100' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
              <span>Step 4: Notify Incident Commander & CISO</span>
              {sopStep >= 4 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
            </div>
          </div>

          <button
            onClick={handleNextSopStep}
            class="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <FileText class="w-4 h-4" />
            <span>{sopStep < 4 ? `Execute SOP Step ${sopStep + 1} →` : 'Reset SOP Checklist 🔄'}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
