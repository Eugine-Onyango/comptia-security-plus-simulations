import React, { useState } from 'react';
import { AlertOctagon, Download, Zap, RefreshCw, FileText, CheckCircle2, ShieldAlert, Wifi } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function RevocationSim() {
  const [isLeaked, setIsLeaked] = useState(false);
  const [checkMethod, setCheckMethod] = useState(null); // 'crl' or 'ocsp'
  const [isChecking, setIsChecking] = useState(false);
  const [logMessage, setLogMessage] = useState('');

  const handleTriggerLeak = () => {
    sounds.playBuzzer();
    setIsLeaked(true);
    setCheckMethod(null);
    setLogMessage('🚨 ALERT! CVE-2014-0160 (Heartbleed) detected! Private key compromised. Certificate moved to Revoked list.');
  };

  const handleTestCrl = () => {
    sounds.playPop();
    setIsChecking(true);
    setCheckMethod('crl');
    setLogMessage('📥 Downloading massive CRL (Certificate Revocation List) file from CA... (Slow & heavy download)');
    
    setTimeout(() => {
      setIsChecking(false);
      if (isLeaked) {
        sounds.playBuzzer();
        setLogMessage('❌ CRL Check Complete: Certificate #8942 found in CRL file! Status: REVOKED!');
      } else {
        sounds.playSuccess();
        setLogMessage('✅ CRL Check Complete: Certificate #8942 not in CRL file. Status: VALID.');
      }
    }, 1400); // intentional delay to demonstrate slow CRL
  };

  const handleTestOcsp = () => {
    sounds.playPop();
    setIsChecking(true);
    setCheckMethod('ocsp');
    setLogMessage('⚡ Sending instant OCSP query over HTTP to CA Responder...');

    setTimeout(() => {
      setIsChecking(false);
      if (isLeaked) {
        sounds.playBuzzer();
        setLogMessage('❌ OCSP Live Answer over HTTP (12ms): Status = REVOKED!');
      } else {
        sounds.playSuccess();
        setLogMessage('✅ OCSP Live Answer over HTTP (12ms): Status = GOOD / VALID!');
      }
    }, 300); // fast instant OCSP response!
  };

  const handleReset = () => {
    sounds.playPop();
    setIsLeaked(false);
    setCheckMethod(null);
    setLogMessage('');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-rose-50 border-2 border-rose-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-200/80 text-rose-900 font-extrabold text-xs rounded-full">
            <span>Revocation & Status • CVE, CRL, OCSP, HTTP</span>
          </div>
          <h3 class="text-2xl font-extrabold text-rose-950">
            Checking Revoked Certificates (CRL vs. OCSP) 🩸
          </h3>
          <p class="text-rose-900/80 font-medium text-sm">
            When a key leaks due to a vulnerability (<strong>CVE</strong>), the certificate is cancelled. How does your browser check if it's safe?
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-rose-200 text-rose-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Checking a list of reported stolen credit cards vs. calling the bank instantly.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <AlertOctagon class="w-5 h-5 text-rose-600" />
            <span>Revocation Controls</span>
          </h4>

          {/* Trigger CVE Leak */}
          <div class="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-extrabold text-rose-900 uppercase tracking-wider">Vulnerability Event:</span>
              <span class="text-[10px] font-bold px-2 py-0.5 bg-rose-200 text-rose-900 rounded-full">CVE-2014-0160</span>
            </div>

            <button
              onClick={handleTriggerLeak}
              disabled={isLeaked}
              class={`w-full py-3 rounded-2xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                isLeaked 
                  ? 'bg-rose-200 text-rose-800 cursor-not-allowed border border-rose-300' 
                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-200 active:scale-95'
              }`}
            >
              <ShieldAlert class="w-4 h-4" />
              <span>{isLeaked ? 'CVE Heartbleed Leak Triggered!' : 'Trigger Heartbleed Leak (CVE-2014-0160)'}</span>
            </button>
          </div>

          {/* Verification Methods */}
          <div class="space-y-3 pt-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Test Browser Revocation Check Method:
            </label>

            {/* Method A: CRL */}
            <button
              onClick={handleTestCrl}
              disabled={isChecking}
              class={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                checkMethod === 'crl'
                  ? 'border-amber-500 bg-amber-50 text-amber-950 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div class="flex items-center justify-between mb-1">
                <span class="font-extrabold text-sm flex items-center gap-2">
                  <Download class="w-4 h-4 text-amber-600" /> Method 1: CRL (Certificate Revocation List)
                </span>
                <span class="text-[10px] font-extrabold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-full">Slow List File</span>
              </div>
              <p class="text-xs text-slate-500 font-medium">
                Downloads a massive list file of all revoked certificates. Takes time and bandwidth!
              </p>
            </button>

            {/* Method B: OCSP */}
            <button
              onClick={handleTestOcsp}
              disabled={isChecking}
              class={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                checkMethod === 'ocsp'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div class="flex items-center justify-between mb-1">
                <span class="font-extrabold text-sm flex items-center gap-2">
                  <Zap class="w-4 h-4 text-emerald-600" /> Method 2: OCSP (Online Protocol)
                </span>
                <span class="text-[10px] font-extrabold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-full">Fast HTTP Query</span>
              </div>
              <p class="text-xs text-slate-500 font-medium">
                Sends a tiny query over <strong>HTTP</strong> directly to the CA responder for a 12ms live answer!
              </p>
            </button>
          </div>

          <button
            onClick={handleReset}
            class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
          >
            Reset Simulator
          </button>
        </div>

        {/* Visual Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[360px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Browser Revocation Engine</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              isLeaked ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-500 text-slate-950'
            }`}>
              {isLeaked ? 'CVE Key Leaked!' : 'Key Intact'}
            </span>
          </div>

          {/* Center Graphic */}
          <div class="my-6 space-y-4">
            
            {/* Speed comparison meter */}
            <div class="grid grid-cols-2 gap-3 text-center">
              <div class={`p-3.5 rounded-2xl border-2 transition-all ${
                checkMethod === 'crl' ? 'bg-amber-950/80 border-amber-400 text-amber-300' : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60'
              }`}>
                <Download class="w-6 h-6 mx-auto mb-1" />
                <div class="text-xs font-extrabold">CRL Download</div>
                <div class="text-[10px] mt-0.5">Heavy file (~1-5 MB)</div>
              </div>

              <div class={`p-3.5 rounded-2xl border-2 transition-all ${
                checkMethod === 'ocsp' ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300' : 'bg-slate-800 border-slate-700 text-slate-400 opacity-60'
              }`}>
                <Zap class="w-6 h-6 mx-auto mb-1 text-emerald-400" />
                <div class="text-xs font-extrabold">OCSP HTTP Request</div>
                <div class="text-[10px] mt-0.5">Instant query (~12 ms)</div>
              </div>
            </div>

            {/* Live Log Console */}
            <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-xs space-y-2 min-h-[90px]">
              <div class="flex items-center gap-2 text-slate-500 border-b border-slate-800 pb-1 text-[10px] font-bold uppercase">
                <Wifi class="w-3.5 h-3.5" /> Live Status Console
              </div>
              {isChecking ? (
                <div class="text-yellow-400 animate-pulse font-semibold">
                  ⏳ Querying status... Please wait...
                </div>
              ) : logMessage ? (
                <div class={logMessage.includes('REVOKED') ? 'text-rose-400 font-bold' : 'text-emerald-300 font-bold'}>
                  {logMessage}
                </div>
              ) : (
                <div class="text-slate-500 italic">
                  Select CRL or OCSP on the left to test checking certificate revocation status!
                </div>
              )}
            </div>

          </div>

          {/* Acronym cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">CVE = Vulnerability ID</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CRL = Revocation List File</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">OCSP = Real-time Protocol</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">HTTP = OCSP Transport</span>
          </div>

        </div>

      </div>

    </div>
  );
}
