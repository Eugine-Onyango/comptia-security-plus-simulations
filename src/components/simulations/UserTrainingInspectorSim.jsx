import React, { useState } from 'react';
import { ShieldCheck, HardDrive, Link, AlertTriangle, CheckCircle2, XCircle, Send } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function UserTrainingInspectorSim() {
  const [activeScenario, setActiveScenario] = useState('usb'); // 'usb' or 'url'
  const [outcome, setOutcome] = useState(null); // 'safe' or 'infected'

  const handleUsbAction = (choice) => {
    if (choice === 'plug') {
      sounds.playBuzzer();
      setOutcome('infected_usb');
    } else {
      sounds.playSuccess();
      setOutcome('safe_usb');
    }
  };

  const handleUrlAction = (choice) => {
    if (choice === 'click') {
      sounds.playBuzzer();
      setOutcome('infected_url');
    } else {
      sounds.playSuccess();
      setOutcome('safe_url');
    }
  };

  const handleReset = () => {
    sounds.playPop();
    setOutcome(null);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Security Awareness • USB, URL, IT</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Employee Threat & Phishing Inspector! 🔌🔍
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            User training teaches employees never to plug in unknown <strong>USB</strong> flash drives, carefully inspect email <strong>URL</strong> links for spoofing, and immediately report suspicious activity to <strong>IT</strong>!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Checking a package for suspicious wires before opening it.
        </div>
      </div>

      {/* Scenario Switcher Buttons */}
      <div class="flex items-center gap-3">
        <button
          onClick={() => {
            sounds.playPop();
            setActiveScenario('usb');
            setOutcome(null);
          }}
          class={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 border-2 ${
            activeScenario === 'usb'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <HardDrive class="w-4 h-4" />
          <span>Scenario 1: Dropped USB Drive 🔌</span>
        </button>

        <button
          onClick={() => {
            sounds.playPop();
            setActiveScenario('url');
            setOutcome(null);
          }}
          class={`px-4 py-2.5 rounded-2xl font-extrabold text-xs transition-all flex items-center gap-2 border-2 ${
            activeScenario === 'url'
              ? 'bg-purple-600 border-purple-700 text-white shadow-sm'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <Link class="w-4 h-4" />
          <span>Scenario 2: Phishing Email URL 🔍</span>
        </button>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Scenario Controls (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          
          {activeScenario === 'usb' ? (
            <div class="space-y-4">
              <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                <HardDrive class="w-5 h-5 text-indigo-600" />
                <span>Found a USB Drive in Parking Lot</span>
              </h4>

              <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-2 font-mono text-xs">
                <div class="text-amber-400 font-bold">Unattended Flash Drive Label:</div>
                <div class="text-slate-200 font-sans">
                  "Confidential Q4 Salary Bonuses 2026.xlsx"
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleUsbAction('plug')}
                  class="py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all active:scale-95 flex flex-col items-center gap-1"
                >
                  <AlertTriangle class="w-5 h-5" />
                  <span>Plug into Computer</span>
                </button>

                <button
                  onClick={() => handleUsbAction('report')}
                  class="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all active:scale-95 flex flex-col items-center gap-1"
                >
                  <Send class="w-5 h-5" />
                  <span>Hand over to IT Helpdesk</span>
                </button>
              </div>
            </div>
          ) : (
            <div class="space-y-4">
              <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                <Link class="w-5 h-5 text-purple-600" />
                <span>Suspicious Email URL Link</span>
              </h4>

              <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-2 font-mono text-xs">
                <div class="text-amber-400 font-bold">Email Subject: "URGENT: Password Expired"</div>
                <div class="text-slate-200 font-mono text-[11px]">
                  Link URL: <span class="text-rose-400 underline font-bold">http://paypaI-login.security-verify.net</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => handleUrlAction('click')}
                  class="py-4 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all active:scale-95 flex flex-col items-center gap-1"
                >
                  <AlertTriangle class="w-5 h-5" />
                  <span>Click Link & Login</span>
                </button>

                <button
                  onClick={() => handleUrlAction('report')}
                  class="py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-2xl shadow-sm transition-all active:scale-95 flex flex-col items-center gap-1"
                >
                  <Send class="w-5 h-5" />
                  <span>Report Phishing to IT</span>
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Outcome Display (Right) */}
        <div class="md:col-span-6 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Security Outcome</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              outcome?.startsWith('safe') ? 'bg-emerald-500 text-slate-950' : outcome?.startsWith('infected') ? 'bg-rose-500 text-white animate-bounce' : 'bg-indigo-500 text-white'
            }`}>
              {outcome?.startsWith('safe') ? 'THREAT NEUTRALIZED 🟢' : outcome?.startsWith('infected') ? 'SECURITY BREACH 🔴' : 'MAKE A CHOICE'}
            </span>
          </div>

          {/* Detailed Outcome Text */}
          <div class="my-4 space-y-3 font-mono text-xs">
            {outcome === 'infected_usb' && (
              <div class="p-4 bg-rose-950 border border-rose-500 rounded-2xl space-y-2 text-rose-200">
                <div class="font-extrabold text-sm flex items-center gap-2 text-rose-400">
                  <XCircle class="w-5 h-5" /> MALWARE INFECTION!
                </div>
                <p class="font-sans text-xs">
                  The dropped USB contained a malicious keystroke injector ("Rubber Ducky"). The computer was instantly compromised and passwords were stolen!
                </p>
              </div>
            )}

            {outcome === 'safe_usb' && (
              <div class="p-4 bg-emerald-950 border border-emerald-500 rounded-2xl space-y-2 text-emerald-200">
                <div class="font-extrabold text-sm flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 class="w-5 h-5" /> GREAT SECURITY AWARENESS!
                </div>
                <p class="font-sans text-xs">
                  You handed the USB to IT! The IT security team isolated the drive in a sandbox and detected malicious ransomware payload, protecting the enterprise!
                </p>
              </div>
            )}

            {outcome === 'infected_url' && (
              <div class="p-4 bg-rose-950 border border-rose-500 rounded-2xl space-y-2 text-rose-200">
                <div class="font-extrabold text-sm flex items-center gap-2 text-rose-400">
                  <XCircle class="w-5 h-5" /> CREDENTIAL HARVESTED!
                </div>
                <p class="font-sans text-xs">
                  The URL used a capital 'I' instead of 'l' (paypaI). You entered your corporate credentials on a spoofed hacker site!
                </p>
              </div>
            )}

            {outcome === 'safe_url' && (
              <div class="p-4 bg-emerald-950 border border-emerald-500 rounded-2xl space-y-2 text-emerald-200">
                <div class="font-extrabold text-sm flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 class="w-5 h-5" /> PHISHING NEUTRALIZED!
                </div>
                <p class="font-sans text-xs">
                  You inspected the URL domain and reported the email to IT! IT blocked the malicious domain across the enterprise firewall.
                </p>
              </div>
            )}

            {!outcome && (
              <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-400 font-sans text-xs">
                Select how you would react to the security scenario on the left!
              </div>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">USB = Flash Drive Threat</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">URL = Link Inspection</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">IT = Helpdesk / Security Team</span>
          </div>

        </div>

      </div>

    </div>
  );
}
