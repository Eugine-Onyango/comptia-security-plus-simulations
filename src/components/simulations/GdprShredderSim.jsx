import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Trash2, CheckCircle2, RefreshCw, UserCheck, Globe, MapPin } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function GdprShredderSim() {
  const [userData, setUserData] = useState({
    name: "Alex Rivera (EU Citizen)",
    ssn: "266-12-1112",
    ipAddress: "192.168.1.105 (PII under GDPR)",
    gpsTrail: "51.5074° N, 0.1278° W (London, EU)"
  });
  const [isShredding, setIsShredding] = useState(false);
  const [isWiped, setIsWiped] = useState(false);

  const handleExerciseRightToBeForgotten = () => {
    sounds.playBuzzer();
    setIsShredding(true);

    setTimeout(() => {
      sounds.playSuccess();
      setIsShredding(false);
      setIsWiped(true);
    }, 2000);
  };

  const handleReset = () => {
    sounds.playPop();
    setIsWiped(false);
    setIsShredding(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-200/80 text-blue-900 font-extrabold text-xs rounded-full">
            <span>EU Privacy Law • GDPR, EU, GPS, IP, PII, SSN</span>
          </div>
          <h3 class="text-2xl font-extrabold text-blue-950">
            GDPR Right to be Forgotten Data Shredder! 🇪🇺🗑️
          </h3>
          <p class="text-blue-900/80 font-medium text-sm">
            The **GDPR (General Data Protection Regulation)** enforced by the **EU** classifies **IP addresses**, **GPS locations**, **SSNs**, and **PII** as private. Individuals have the legal **Right to Erasure (Right to be Forgotten)**!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-blue-200 text-blue-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Requesting a company destroy your paper file in a cross-cut paper shredder.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <UserCheck class="w-5 h-5 text-blue-600" />
            <span>EU Citizen Privacy Portal</span>
          </h4>

          <div class="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2 text-xs font-semibold text-blue-950">
            <div class="font-extrabold text-sm flex items-center gap-1.5">
              <span>🇪🇺 EU GDPR Article 17 Rights:</span>
            </div>
            <p class="text-[11px] text-blue-900 leading-relaxed font-normal">
              You can demand any organization delete your personal identifiers (**SSN**, **PII**, **IP**, **GPS**) without undue delay.
            </p>
          </div>

          <button
            onClick={handleExerciseRightToBeForgotten}
            disabled={isShredding || isWiped}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              isWiped
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : isShredding
                  ? 'bg-rose-500 text-white animate-pulse cursor-wait'
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
            }`}
          >
            {isShredding ? (
              <span>🇪🇺 GDPR Shredder Wiping Data...</span>
            ) : isWiped ? (
              <span>✅ Data Permanently Erased under GDPR!</span>
            ) : (
              <>
                <Trash2 class="w-5 h-5" />
                <span>Exercise GDPR Right to be Forgotten</span>
              </>
            )}
          </button>

          {isWiped && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Simulate New EU User Registration
            </button>
          )}
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Globe class="w-4 h-4 text-blue-400" /> EU Corporate Data Store
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              isWiped ? 'bg-emerald-500 text-slate-950' : 'bg-blue-500 text-white'
            }`}>
              {isWiped ? 'GDPR WIPED & ERASED' : 'ACTIVE PII RECORDS'}
            </span>
          </div>

          {/* User Record Card / Shredder Animation */}
          <div class="my-4 font-mono text-xs">
            {!isWiped ? (
              <div className={`p-4 rounded-2xl border-2 space-y-2 transition-all ${
                isShredding ? 'bg-rose-950 border-rose-500 animate-pulse' : 'bg-slate-950 border-slate-800'
              }`}>
                <div class="font-bold text-blue-300 border-b border-slate-800 pb-2 flex items-center justify-between">
                  <span>User Record: {userData.name}</span>
                  <span class="text-[10px] bg-blue-900 text-blue-200 px-2 py-0.5 rounded">EU CITIZEN</span>
                </div>
                <div class="space-y-1 text-slate-300">
                  <div>• SSN: <span class="text-amber-300 font-bold">{userData.ssn}</span></div>
                  <div>• IP Address: <span class="text-sky-300 font-bold">{userData.ipAddress}</span></div>
                  <div>• GPS Location Logs: <span class="text-emerald-300 font-bold">{userData.gpsTrail}</span></div>
                </div>
              </div>
            ) : (
              <div class="p-8 bg-slate-950 border border-emerald-500/50 rounded-2xl text-center space-y-2 text-emerald-400 animate-fadeIn">
                <div class="text-4xl">✨🗑️</div>
                <div class="font-extrabold text-sm">RECORDS ERADICATED UNDER GDPR ARTICLE 17</div>
                <p class="text-[11px] font-sans font-medium text-slate-400">
                  All SSN, PII, IP address logs, and GPS tracking entries permanently destroyed. Zero residual data remains.
                </p>
              </div>
            )}
          </div>

          {/* Compliance Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            isWiped
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-blue-950 border-blue-500 text-blue-200'
          }`}>
            {isWiped ? (
              <span>✅ <strong>GDPR COMPLAINT MET!</strong> Right to be Forgotten honored. Organization avoided potential EU non-compliance fines!</span>
            ) : (
              <span>🇪🇺 <strong>GDPR Active:</strong> Organizations processing EU citizen data must provide immediate Right to Erasure mechanism.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">GDPR = General Data Protection Regulation</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">EU = European Union</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">GPS / IP / PII / SSN</span>
          </div>

        </div>

      </div>

    </div>
  );
}
