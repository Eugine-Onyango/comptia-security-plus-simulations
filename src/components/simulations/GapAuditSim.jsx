import React, { useState } from 'react';
import { Ruler, ShieldCheck, ShieldAlert, Award, CheckCircle2, XCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function GapAuditSim() {
  const [selectedStandard, setSelectedStandard] = useState('nist'); // 'nist' or 'iso_iec'
  const [controls, setControls] = useState({
    mfa: true,
    encryption: true,
    backups: false,
    training: false
  });

  const handleToggleControl = (key) => {
    sounds.playPop();
    setControls(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleRemediateAll = () => {
    sounds.playSuccess();
    setControls({
      mfa: true,
      encryption: true,
      backups: true,
      training: true
    });
  };

  const passedCount = (controls.mfa ? 1 : 0) + (controls.encryption ? 1 : 0) + (controls.backups ? 1 : 0) + (controls.training ? 1 : 0);
  const compliancePct = Math.round((passedCount / 4) * 100);
  const gapPct = 100 - compliancePct;

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Gap Analysis • NIST, ISO, IEC</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            Gap Analysis = Finding What Security Controls are Missing! 📏
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            Gap analysis compares your current security state against official frameworks like <strong>NIST SP 800-171</strong> or <strong>ISO/IEC 27001</strong> to fix security gaps.
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Comparing your home locks against a fire & safety inspector checklist.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Ruler class="w-5 h-5 text-amber-600" />
            <span>Gap Audit Inspector</span>
          </h4>

          {/* Framework Selection */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              1. Choose Security Standard Framework:
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setSelectedStandard('nist');
                  sounds.playPop();
                }}
                class={`p-3 rounded-2xl border-2 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                  selectedStandard === 'nist'
                    ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span class="text-base">🇺🇸</span>
                <span>NIST SP 800-171</span>
              </button>

              <button
                onClick={() => {
                  setSelectedStandard('iso_iec');
                  sounds.playPop();
                }}
                class={`p-3 rounded-2xl border-2 font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                  selectedStandard === 'iso_iec'
                    ? 'border-blue-500 bg-blue-50 text-blue-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <span class="text-base">🌐</span>
                <span>ISO/IEC 27001</span>
              </button>
            </div>
          </div>

          {/* Security Controls Toggle List */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              2. Toggle Company Security Controls:
            </label>

            <div class="space-y-2">
              <button
                onClick={() => handleToggleControl('mfa')}
                class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  controls.mfa ? 'border-emerald-400 bg-emerald-50 text-emerald-950' : 'border-rose-300 bg-rose-50 text-rose-950'
                }`}
              >
                <span>Multi-Factor Authentication (MFA)</span>
                {controls.mfa ? <CheckCircle2 class="w-4 h-4 text-emerald-600" /> : <XCircle class="w-4 h-4 text-rose-500" />}
              </button>

              <button
                onClick={() => handleToggleControl('encryption')}
                class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  controls.encryption ? 'border-emerald-400 bg-emerald-50 text-emerald-950' : 'border-rose-300 bg-rose-50 text-rose-950'
                }`}
              >
                <span>Data Encryption at Rest & Transit</span>
                {controls.encryption ? <CheckCircle2 class="w-4 h-4 text-emerald-600" /> : <XCircle class="w-4 h-4 text-rose-500" />}
              </button>

              <button
                onClick={() => handleToggleControl('backups')}
                class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  controls.backups ? 'border-emerald-400 bg-emerald-50 text-emerald-950' : 'border-rose-300 bg-rose-50 text-rose-950'
                }`}
              >
                <span>Automated Off-site Data Backups</span>
                {controls.backups ? <CheckCircle2 class="w-4 h-4 text-emerald-600" /> : <XCircle class="w-4 h-4 text-rose-500" />}
              </button>

              <button
                onClick={() => handleToggleControl('training')}
                class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  controls.training ? 'border-emerald-400 bg-emerald-50 text-emerald-950' : 'border-rose-300 bg-rose-50 text-rose-950'
                }`}
              >
                <span>Employee Phishing Awareness Training</span>
                {controls.training ? <CheckCircle2 class="w-4 h-4 text-emerald-600" /> : <XCircle class="w-4 h-4 text-rose-500" />}
              </button>
            </div>
          </div>

          {gapPct > 0 && (
            <button
              onClick={handleRemediateAll}
              class="w-full py-3 bg-amber-500 hover:bg-amber-600 text-amber-950 font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <RefreshCw class="w-4 h-4" />
              <span>Remediate All Missing Gaps!</span>
            </button>
          )}

        </div>

        {/* Visual Gap Score Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {selectedStandard === 'nist' ? 'NIST SP 800-171 Compliance Meter' : 'ISO/IEC 27001 Compliance Meter'}
            </span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              compliancePct === 100 ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white animate-pulse'
            }`}>
              {compliancePct === 100 ? '100% FULLY CERTIFIED' : `SECURITY GAP: ${gapPct}%`}
            </span>
          </div>

          {/* Compliance & Gap Progress Meters */}
          <div class="my-6 space-y-6">
            
            <div class="grid grid-cols-2 gap-4 text-center">
              
              <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div class="text-xs font-bold text-slate-400 uppercase">Current Compliance</div>
                <div class="text-4xl font-black text-emerald-400">{compliancePct}%</div>
                <div class="text-[10px] text-slate-500">{passedCount} of 4 Controls Passed</div>
              </div>

              <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                <div class="text-xs font-bold text-slate-400 uppercase">Identified Security Gap</div>
                <div class={`text-4xl font-black ${gapPct > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{gapPct}%</div>
                <div class="text-[10px] text-slate-500">{4 - passedCount} Controls Missing</div>
              </div>

            </div>

            {/* Visual Bar */}
            <div class="space-y-1.5">
              <div class="flex justify-between text-xs font-bold">
                <span>Compliance Bar:</span>
                <span class="text-emerald-400 font-extrabold">{compliancePct}% Compliant</span>
              </div>
              <div class="w-full h-4 bg-slate-800 rounded-full overflow-hidden flex">
                <div 
                  class="h-full bg-emerald-500 transition-all duration-500" 
                  style={{ width: `${compliancePct}%` }}
                />
                <div 
                  class="h-full bg-rose-500 transition-all duration-500" 
                  style={{ width: `${gapPct}%` }}
                />
              </div>
            </div>

            {/* Explanation Banner */}
            <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              compliancePct === 100 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}>
              {compliancePct === 100 ? (
                <span>🏆 <strong>Zero Gaps Remaining!</strong> Your company is 100% compliant with <strong>{selectedStandard === 'nist' ? 'NIST SP 800-171' : 'ISO/IEC 27001'}</strong>!</span>
              ) : (
                <span>⚠️ <strong>Security Gap Found!</strong> You have {4 - passedCount} missing control(s). Remediate the gaps to meet {selectedStandard === 'nist' ? 'NIST' : 'ISO/IEC'} standard compliance!</span>
              )}
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">NIST = National Institute of Standards & Technology</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">ISO = Org for Standardization</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IEC = Electrotechnical Commission</span>
          </div>

        </div>

      </div>

    </div>
  );
}
