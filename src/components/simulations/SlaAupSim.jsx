import React, { useState } from 'react';
import { Clock, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, FileText, Zap } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function SlaAupSim() {
  // SLA State
  const [uptimePercent, setUptimePercent] = useState(99.99);
  const [isOutage, setIsOutage] = useState(false);
  const [slaFine, setSlaFine] = useState(0);

  // AUP State
  const [aupAction, setAupAction] = useState('work_email'); // 'work_email', 'social_media', 'torrent_download'

  const handleTriggerOutage = () => {
    sounds.playBuzzer();
    setIsOutage(true);
    setUptimePercent(98.50);
    setSlaFine(15000);
  };

  const handleFixOutage = () => {
    sounds.playPop();
    setIsOutage(false);
    setUptimePercent(99.99);
    setSlaFine(0);
  };

  const handleSelectAupAction = (action) => {
    sounds.playPop();
    setAupAction(action);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Security Governance • NIST, SLA, AUP</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            SLA Uptime Stopwatch & AUP Traffic Inspector! ⏱️📜
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            <strong>NIST (National Institute of Standards and Technology)</strong> outlines key policy types: <strong>SLAs (Service Level Agreements)</strong> define contract uptime guarantees, while <strong>AUPs (Acceptable Use Policies)</strong> dictate how employees use corporate IT assets!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Power company contract (SLA guarantee) vs House rules for using the family computer (AUP).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* SLA Simulator Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Clock class="w-5 h-5 text-purple-600" />
            <span>1. Service Level Agreement (SLA) Monitor</span>
          </h4>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-3 font-mono text-xs">
            <div class="flex items-center justify-between">
              <span class="text-slate-400">Target SLA Contract:</span>
              <span class="text-emerald-400 font-bold">99.99% UPTIME (4 NINES)</span>
            </div>
            
            <div class="flex items-center justify-between text-base font-extrabold">
              <span>Current Cloud Uptime:</span>
              <span className={`text-xl ${uptimePercent >= 99.9 ? 'text-emerald-400' : 'text-rose-400 animate-pulse'}`}>
                {uptimePercent}%
              </span>
            </div>

            <div class="flex items-center justify-between border-t border-white/10 pt-2 text-slate-300">
              <span>SLA Penalty Fine Accrued:</span>
              <span className={`font-bold ${slaFine > 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                ${slaFine.toLocaleString()}
              </span>
            </div>
          </div>

          {!isOutage ? (
            <button
              onClick={handleTriggerOutage}
              class="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Zap class="w-4 h-4" /> Simulate Cloud Data Center Outage
            </button>
          ) : (
            <button
              onClick={handleFixOutage}
              class="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <CheckCircle2 class="w-4 h-4" /> Restore Server & Reset SLA Metrics
            </button>
          )}

          <p class="text-[11px] text-slate-500 font-medium leading-relaxed">
            *If a cloud provider breaches the <strong>SLA</strong> uptime guarantee, contractual financial penalties kick in!
          </p>
        </div>

        {/* AUP Traffic Inspector Panel (Right) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <FileText class="w-5 h-5 text-purple-600" />
            <span>2. Acceptable Use Policy (AUP) Filter</span>
          </h4>

          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Test Employee Workstation Activity:</label>
            
            <button
              onClick={() => handleSelectAupAction('work_email')}
              class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                aupAction === 'work_email'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              📧 Reading Corporate Work Email
            </button>

            <button
              onClick={() => handleSelectAupAction('social_media')}
              class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                aupAction === 'social_media'
                  ? 'border-amber-500 bg-amber-50 text-amber-950'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              📱 Browsing Personal Social Media during Work
            </button>

            <button
              onClick={() => handleSelectAupAction('torrent_download')}
              class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                aupAction === 'torrent_download'
                  ? 'border-rose-500 bg-rose-50 text-rose-950'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              🏴‍☠️ Downloading Illegal Torrents on Work Laptop
            </button>
          </div>

          {/* Policy Decision Box */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            aupAction === 'work_email'
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : aupAction === 'social_media'
                ? 'bg-amber-50 border-amber-300 text-amber-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}>
            {aupAction === 'work_email' && (
              <span>🟢 <strong>AUP COMPLIANT:</strong> Work email is directly authorized under corporate Acceptable Use Policy guidelines.</span>
            )}
            {aupAction === 'social_media' && (
              <span>⚠️ <strong>AUP WARNING:</strong> Limited personal browsing may be permitted during breaks depending on company AUP policy.</span>
            )}
            {aupAction === 'torrent_download' && (
              <span>🔴 <strong>AUP VIOLATION:</strong> Peer-to-peer file sharing violates company AUP! Account suspended by security operations.</span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
