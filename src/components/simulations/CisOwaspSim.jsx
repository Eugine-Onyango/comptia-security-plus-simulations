import React, { useState } from 'react';
import { Sliders, ShieldCheck, ShieldAlert, Bug, CheckCircle2, RefreshCw, Lock } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CisOwaspSim() {
  // CIS State
  const [isHardened, setIsHardened] = useState(false);

  // OWASP State
  const [owaspSecured, setOwaspSecured] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  const handleApplyCisHardening = () => {
    sounds.playSuccess();
    setIsHardened(!isHardened);
  };

  const handleRunOwaspScan = () => {
    sounds.playBuzzer();
    setIsScanning(true);

    setTimeout(() => {
      sounds.playSuccess();
      setIsScanning(false);
      setOwaspSecured(true);
    }, 1500);
  };

  const handleResetOwasp = () => {
    sounds.playPop();
    setOwaspSecured(false);
    setIsScanning(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>System & Web Hardening • CIS, OWASP</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            CIS System Hardener & OWASP Web Armor Radar! ⚙️🛡️
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>CIS (Center for Internet Security) Benchmarks</strong> provide step-by-step checklists to harden operating systems and hardware, while <strong>OWASP (Open Web Application Security Project)</strong> protects web applications from top vulnerabilities like SQL injection!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Locking all windows in a house (CIS Hardening) vs installing bulletproof glass on the front door (OWASP).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* CIS System Hardener Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Sliders class="w-5 h-5 text-indigo-600" />
            <span>1. CIS Server Hardening Station</span>
          </h4>

          <div className={`p-4 rounded-2xl border-2 transition-all space-y-2.5 font-mono text-xs ${
            isHardened ? 'bg-indigo-950 border-indigo-500 text-indigo-100' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <span>Server Hardening Posture:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${isHardened ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'}`}>
                {isHardened ? '98% CIS HARDENED 🟢' : '35% UNSECURED DEFAULT 🔴'}
              </span>
            </div>

            <div class="space-y-1 text-[11px]">
              <div>• Unnecessary Ports (FTP/Telnet): <span className={isHardened ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{isHardened ? 'DISABLED' : 'OPEN (RISKY)'}</span></div>
              <div>• Password Policy: <span className={isHardened ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{isHardened ? 'COMPLEX + MFA ENFORCED' : 'DEFAULT ADMIN PASS'}</span></div>
              <div>• OS Automatic Updates: <span className={isHardened ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{isHardened ? 'ENABLED' : 'DISABLED'}</span></div>
            </div>
          </div>

          <button
            onClick={handleApplyCisHardening}
            class={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 ${
              isHardened ? 'bg-slate-200 text-slate-700 hover:bg-slate-300' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            <Sliders class="w-4 h-4" />
            <span>{isHardened ? 'Revert to Default Configuration' : 'Apply CIS Benchmark Hardening Rules'}</span>
          </button>
        </div>

        {/* OWASP Web App Scanner Panel (Right) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Bug class="w-5 h-5 text-indigo-600" />
            <span>2. OWASP Top 10 Web Security Radar</span>
          </h4>

          <div className={`p-4 rounded-2xl border-2 transition-all space-y-2.5 font-mono text-xs ${
            owaspSecured ? 'bg-emerald-950 border-emerald-500 text-emerald-100' : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}>
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <span>Web Application Armor:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${owaspSecured ? 'bg-emerald-500 text-slate-950' : 'bg-amber-500 text-slate-950'}`}>
                {owaspSecured ? 'OWASP PROTECTED 🟢' : 'OWASP TOP 10 SCAN REQUIRED'}
              </span>
            </div>

            <div class="space-y-1 text-[11px]">
              <div>• SQL Injection Protection: <span className={owaspSecured ? 'text-emerald-400 font-bold' : 'text-slate-400'}>{owaspSecured ? 'PARAMETERIZED QUERIES ACTIVE' : 'UNCHECKED'}</span></div>
              <div>• Cross-Site Scripting (XSS): <span className={owaspSecured ? 'text-emerald-400 font-bold' : 'text-slate-400'}>{owaspSecured ? 'INPUT SANITIZED' : 'UNCHECKED'}</span></div>
            </div>
          </div>

          {!owaspSecured ? (
            <button
              onClick={handleRunOwaspScan}
              disabled={isScanning}
              class={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 ${
                isScanning ? 'bg-indigo-400 text-white animate-pulse' : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
              }`}
            >
              <Bug class="w-4 h-4" />
              <span>{isScanning ? 'Scanning OWASP Top 10 Vulnerabilities...' : 'Run OWASP Top 10 Security Audit'}</span>
            </button>
          ) : (
            <button
              onClick={handleResetOwasp}
              class="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw class="w-4 h-4" /> Reset OWASP Audit Radar
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
