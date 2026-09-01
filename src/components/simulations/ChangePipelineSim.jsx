import React, { useState } from 'react';
import { ClipboardList, CheckCircle2, UserCheck, ShieldCheck, ArrowRight, Building, AlertTriangle, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ChangePipelineSim() {
  const [changeType, setChangeType] = useState('routine'); // 'routine' or 'critical'
  const [step, setStep] = useState(0); // 0: Submitting, 1: IT Review, 2: CEO Visibility, 3: Deployed
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRunChange = () => {
    sounds.playPop();
    setIsProcessing(true);
    setStep(1);

    // Step 1: IT Department Risk Review
    setTimeout(() => {
      sounds.playPop();
      setStep(2);
    }, 1000);

    // Step 2: CEO / Leadership Awareness
    setTimeout(() => {
      sounds.playPop();
      setStep(3);
    }, 2000);

    // Step 3: Deployed
    setTimeout(() => {
      sounds.playSuccess();
      setIsProcessing(false);
    }, 3000);
  };

  const handleReset = () => {
    sounds.playPop();
    setStep(0);
    setIsProcessing(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-200/80 text-blue-900 font-extrabold text-xs rounded-full">
            <span>Change Management • CEO & IT</span>
          </div>
          <h3 class="text-2xl font-extrabold text-blue-950">
            Technical Change Management & CEO Visibility! 📋🏢
          </h3>
          <p class="text-blue-900/80 font-medium text-sm">
            Before deploying major software updates, the <strong>IT</strong> department assesses risk, tests rollbacks, and ensures executive <strong>CEO</strong> visibility for critical infrastructure changes.
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-blue-200 text-blue-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Architect blueprints approved by building inspectors before renovating a skyscraper.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <ClipboardList class="w-5 h-5 text-blue-600" />
            <span>Submit Technical Change Request</span>
          </h4>

          {/* Change Type Selection */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              1. Proposed IT Infrastructure Change:
            </label>
            <div class="space-y-2">
              <button
                onClick={() => {
                  setChangeType('routine');
                  setStep(0);
                  sounds.playPop();
                }}
                disabled={step > 0}
                class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  changeType === 'routine'
                    ? 'border-blue-500 bg-blue-50 text-blue-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div>
                  <div class="font-extrabold text-sm">Routine Maintenance</div>
                  <div class="text-[11px] text-slate-500 font-medium mt-0.5">Standard OS patch during maintenance window</div>
                </div>
              </button>

              <button
                onClick={() => {
                  setChangeType('critical');
                  setStep(0);
                  sounds.playPop();
                }}
                disabled={step > 0}
                class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  changeType === 'critical'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <div>
                  <div class="font-extrabold text-sm text-amber-900">Critical Core System Upgrade</div>
                  <div class="text-[11px] text-amber-800/80 font-medium mt-0.5">Major cloud migration requiring CEO awareness</div>
                </div>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleRunChange}
            disabled={isProcessing || step === 3}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              step === 3
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : isProcessing
                  ? 'bg-blue-400 text-white animate-pulse cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
            }`}
          >
            {step === 3 ? (
              <span>Change Deployed Successfully!</span>
            ) : isProcessing ? (
              <span>Processing Change Pipeline...</span>
            ) : (
              <>
                <ArrowRight class="w-5 h-5" />
                <span>Submit Change Request to IT</span>
              </>
            )}
          </button>

          {step > 0 && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Change Request
            </button>
          )}
        </div>

        {/* Visual Stepper (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">IT Change Board Approval Pipeline</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              step === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-blue-500 text-white'
            }`}>
              {step === 3 ? 'CHANGE DEPLOYED' : `Stage ${step}/3`}
            </span>
          </div>

          {/* Stepper Display */}
          <div class="my-4 space-y-3">
            
            {/* Step 1: IT Review */}
            <div class={`p-4 rounded-2xl border-2 transition-all ${
              step >= 1 ? 'bg-blue-950/80 border-blue-400 text-blue-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <Building class="w-4 h-4 text-blue-400" /> Stage 1: IT Organization Review
                </span>
                {step >= 1 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-xs font-medium">
                {step >= 1 ? '✅ IT Department reviewed technical risk score & approved rollback plan.' : '⏳ Awaiting IT Organization review...'}
              </p>
            </div>

            {/* Step 2: CEO Visibility */}
            <div class={`p-4 rounded-2xl border-2 transition-all ${
              step >= 2 ? 'bg-amber-950/80 border-amber-400 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <UserCheck class="w-4 h-4 text-amber-400" /> Stage 2: CEO Executive Leadership Awareness
                </span>
                {step >= 2 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-xs font-medium">
                {step >= 2 
                  ? changeType === 'critical'
                    ? '✅ CEO Executive Leadership notified! High-impact change approved with executive sign-off.'
                    : '✅ CEO Visibility Board updated automatically for routine maintenance.'
                  : '⏳ Awaiting CEO Executive Board sign-off...'}
              </p>
            </div>

            {/* Step 3: Deployment */}
            <div class={`p-4 rounded-2xl border-2 transition-all ${
              step >= 3 ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <ShieldCheck class="w-4 h-4 text-emerald-400" /> Stage 3: Smooth Production Deployment
                </span>
                {step >= 3 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-xs font-medium">
                {step >= 3 ? '🎉 Change deployed into production with zero downtime!' : '⏳ Waiting for final deployment...'}
              </p>
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">IT = Information Technology</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CEO = Chief Executive Officer</span>
          </div>

        </div>

      </div>

    </div>
  );
}
