import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, MapPin, Globe, CheckCircle2, XCircle } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DataMinimizationSim() {
  const [minimizationMode, setMinimizationMode] = useState(true);

  const handleToggleMode = () => {
    sounds.playPop();
    setMinimizationMode(!minimizationMode);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-200/80 text-blue-900 font-extrabold text-xs rounded-full">
            <span>Data Minimization • GDPR, EU, GPS, IP, PII, SSN</span>
          </div>
          <h3 class="text-2xl font-extrabold text-blue-950">
            GDPR Data Minimization & Consent Filter! ⚖️🛡️
          </h3>
          <p class="text-blue-900/80 font-medium text-sm">
            Under <strong>GDPR (General Data Protection Regulation)</strong> in the <strong>EU</strong>, organizations must practice <strong>Data Minimization</strong>—collecting only essential data and avoiding unnecessary <strong>GPS</strong>, <strong>IP</strong>, or <strong>SSN</strong> tracking!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-blue-200 text-blue-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A store asking only for cash vs demanding your SSN and home address to buy candy.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Globe class="w-5 h-5 text-blue-600" />
            <span>Select App Data Collection Policy</span>
          </h4>

          {/* Policy Switcher */}
          <button
            onClick={handleToggleMode}
            class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs transition-all ${
              minimizationMode
                ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                : 'border-rose-500 bg-rose-50 text-rose-950 shadow-sm'
            }`}
          >
            <div class="font-extrabold text-sm flex items-center justify-between">
              <span>{minimizationMode ? '🟢 Data Minimization (GDPR)' : '🔴 Excessive Data Harvesting'}</span>
              <span class="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white border">TOGGLE</span>
            </div>
            <div class="text-[11px] font-medium mt-1 text-slate-600">
              {minimizationMode
                ? 'Collects minimum required data only (email).'
                : 'Harvests SSN, 24/7 GPS coordinates, & IP logs.'}
            </div>
          </button>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">GDPR Compliance Audit Meter</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              minimizationMode ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white animate-bounce'
            }`}>
              {minimizationMode ? 'GDPR COMPLIANT 🟢' : 'EU AUDIT FAILURE (€20M FINE) 🚨'}
            </span>
          </div>

          {/* Collected Data Items */}
          <div class="my-4 space-y-2.5 font-mono text-xs">
            
            <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
              <span class="text-slate-300">User Email Address (PII):</span>
              <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-900 text-emerald-200">ESSENTIAL DATA</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              minimizationMode ? 'bg-slate-950 border-slate-800 text-slate-600 opacity-40' : 'bg-rose-950 border-rose-500 text-rose-200'
            }`}>
              <span>GPS Location History (GPS):</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${minimizationMode ? 'bg-slate-800 text-slate-500' : 'bg-rose-500 text-white'}`}>
                {minimizationMode ? 'DROPPED (MINIMIZED)' : 'EXCESSIVE HARVEST'}
              </span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
              minimizationMode ? 'bg-slate-950 border-slate-800 text-slate-600 opacity-40' : 'bg-rose-950 border-rose-500 text-rose-200'
            }`}>
              <span>Social Security Number (SSN):</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${minimizationMode ? 'bg-slate-800 text-slate-500' : 'bg-rose-500 text-white'}`}>
                {minimizationMode ? 'DROPPED (MINIMIZED)' : 'EXCESSIVE HARVEST'}
              </span>
            </div>

          </div>

          {/* Status Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            minimizationMode
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-rose-950 border-rose-500 text-rose-200 animate-pulse'
          }`}>
            {minimizationMode ? (
              <span>✅ <strong>DATA MINIMIZATION ENFORCED!</strong> Only essential email PII is stored. Unnecessary <strong>GPS</strong> and <strong>SSN</strong> data dropped to comply with <strong>GDPR</strong>.</span>
            ) : (
              <span>💥 <strong>EU GDPR VIOLATION DETECTED!</strong> Harvesting unnecessary <strong>SSN</strong>, <strong>IP</strong>, and <strong>GPS</strong> data violates the <strong>GDPR Data Minimization Principle</strong>! Risk of €20M fine!</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">GDPR = Privacy Regulation</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">EU = European Union</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">GPS / IP / PII / SSN</span>
          </div>

        </div>

      </div>

    </div>
  );
}
