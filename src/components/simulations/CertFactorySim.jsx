import React, { useState } from 'react';
import { Award, ShieldCheck, CheckCircle2, FileText, Globe, Cpu, Key, Layers, Sparkles, Building, ArrowRight } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CertFactorySim() {
  const [domainName, setDomainName] = useState('professormesser.com');
  const [useSan, setUseSan] = useState(false);
  const [step, setStep] = useState(0); // 0: Idle, 1: CSR Created, 2: DNS Verified, 3: CA Signed via HSM
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCreateCsr = () => {
    sounds.playPop();
    setIsProcessing(true);
    setStep(1);
    setTimeout(() => {
      setIsProcessing(false);
    }, 400);
  };

  const handleVerifyDns = () => {
    sounds.playPop();
    setIsProcessing(true);
    setTimeout(() => {
      setStep(2);
      setIsProcessing(false);
    }, 600);
  };

  const handleSignCert = () => {
    sounds.playSuccess();
    setIsProcessing(true);
    setTimeout(() => {
      setStep(3);
      setIsProcessing(false);
    }, 800);
  };

  const handleReset = () => {
    sounds.playPop();
    setStep(0);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Certificate Factory • PKI, CA, CSR, X.509, SAN, HSM, OS, DNS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            Digital Certificates = The Web's Official Passports! 📜
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Just like a government passport proves who you are, a digital certificate proves a website is genuine!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Applying for an official passport at the government office.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <FileText class="w-5 h-5 text-indigo-600" />
            <span>Certificate Application Wizard</span>
          </h4>

          {/* Input Website Domain */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              1. Enter Website Address:
            </label>
            <div class="relative">
              <input
                type="text"
                value={domainName}
                onChange={(e) => {
                  setDomainName(e.target.value);
                  if (step > 0) setStep(0);
                }}
                disabled={step > 0}
                class="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-bold text-sm text-slate-800"
                placeholder="e.g. professormesser.com"
              />
              <Globe class="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
            </div>
          </div>

          {/* SAN Toggle */}
          <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <label class="flex items-center justify-between cursor-pointer">
              <span class="text-xs font-extrabold text-slate-700">Add SAN (Subject Alternative Name)?</span>
              <input
                type="checkbox"
                checked={useSan}
                onChange={(e) => {
                  setUseSan(e.target.checked);
                  sounds.playPop();
                }}
                disabled={step > 0}
                class="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 cursor-pointer"
              />
            </label>
            <p class="text-[11px] text-slate-500 font-medium leading-normal">
              <strong>SAN</strong> lets 1 certificate protect extra sub-domains like <em>store.{domainName.trim() || 'site.com'}</em> & <em>mail.{domainName.trim() || 'site.com'}</em>!
            </p>
          </div>

          {/* Application Steps Buttons */}
          <div class="space-y-2.5 pt-2">
            
            {/* Step 1: CSR */}
            <button
              onClick={handleCreateCsr}
              disabled={step !== 0 || !domainName.trim() || isProcessing}
              class={`w-full p-4 rounded-2xl font-extrabold text-xs sm:text-sm text-left flex items-center justify-between transition-all active:scale-95 ${
                step === 0 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 cursor-pointer scale-[1.02] border-2 border-indigo-500' 
                  : step > 0 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">1</span>
                <span>Generate CSR (Certificate Signing Request)</span>
              </div>
              {step === 0 && <ArrowRight class="w-4 h-4 text-white animate-pulse" />}
              {step > 0 && <CheckCircle2 class="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Step 2: DNS Validation */}
            <button
              onClick={handleVerifyDns}
              disabled={step !== 1 || isProcessing}
              class={`w-full p-4 rounded-2xl font-extrabold text-xs sm:text-sm text-left flex items-center justify-between transition-all active:scale-95 ${
                step === 1 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 cursor-pointer scale-[1.02] border-2 border-indigo-500 animate-pulse' 
                  : step > 1 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">2</span>
                <span>CA Validates Ownership via DNS</span>
              </div>
              {step === 1 && <ArrowRight class="w-4 h-4 text-white animate-pulse" />}
              {step > 1 && <CheckCircle2 class="w-4 h-4 text-emerald-600" />}
            </button>

            {/* Step 3: CA Signs via HSM */}
            <button
              onClick={handleSignCert}
              disabled={step !== 2 || isProcessing}
              class={`w-full p-4 rounded-2xl font-extrabold text-xs sm:text-sm text-left flex items-center justify-between transition-all active:scale-95 ${
                step === 2 
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 cursor-pointer scale-[1.02] border-2 border-indigo-500 animate-pulse' 
                  : step > 2 
                    ? 'bg-emerald-50 text-emerald-900 border border-emerald-300' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-black text-xs">3</span>
                <span>CA Signs Certificate with HSM Hardware</span>
              </div>
              {step === 2 && <ArrowRight class="w-4 h-4 text-white animate-pulse" />}
              {step > 2 && <CheckCircle2 class="w-4 h-4 text-emerald-600" />}
            </button>

          </div>

          {step > 0 && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Start Over / New Application
            </button>
          )}
        </div>

        {/* Visual Certificate Graphic (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[360px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">X.509 Digital Passport Viewer</span>
            <span class="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[10px] font-bold border border-indigo-500/30">
              PKI Ecosystem Active
            </span>
          </div>

          {/* Certificate Output Box */}
          <div class="my-4">
            {step === 0 && (
              <div class="text-center py-10 space-y-3">
                <div class="text-5xl animate-bounce">📄</div>
                <div class="text-sm font-bold text-white">Ready to Generate Request!</div>
                <p class="text-xs text-slate-300 max-w-xs mx-auto font-medium">
                  Click the blue button <strong>"1. Generate CSR (Certificate Signing Request)"</strong> on the left to start the process!
                </p>
              </div>
            )}

            {step === 1 && (
              <div class="bg-slate-800 border-2 border-indigo-500/50 rounded-2xl p-5 space-y-3 animate-fadeIn">
                <div class="flex items-center justify-between text-xs font-extrabold text-indigo-400 uppercase tracking-wider">
                  <span>Certificate Signing Request (CSR) Created</span>
                  <FileText class="w-4 h-4" />
                </div>
                <div class="p-3 bg-slate-950 font-mono text-xs text-indigo-300 rounded-xl space-y-1">
                  <div>-----BEGIN CERTIFICATE REQUEST-----</div>
                  <div>Domain: {domainName.trim() || 'site.com'}</div>
                  <div>Public Key: 04a8f9c1e2... (Generated)</div>
                  <div>-----END CERTIFICATE REQUEST-----</div>
                </div>
                <p class="text-xs text-slate-300 font-medium">
                  📩 Sent to the <strong>CA (Certificate Authority)</strong>. Now click <strong>Step 2: CA Validates Ownership via DNS</strong>!
                </p>
              </div>
            )}

            {step === 2 && (
              <div class="bg-slate-800 border-2 border-amber-500/50 rounded-2xl p-5 space-y-3 animate-fadeIn">
                <div class="flex items-center justify-between text-xs font-extrabold text-amber-400 uppercase tracking-wider">
                  <span>DNS Ownership Check Passed!</span>
                  <Globe class="w-4 h-4" />
                </div>
                <div class="p-3 bg-slate-950 text-xs text-amber-200 rounded-xl space-y-1">
                  <div>✅ Checked DNS records for <strong>{domainName.trim() || 'site.com'}</strong></div>
                  <div>✅ Confirmed applicant owns this domain name!</div>
                </div>
                <p class="text-xs text-slate-300 font-medium">
                  🔒 Identity verified! Now click <strong>Step 3: CA Signs Certificate with HSM Hardware</strong>!
                </p>
              </div>
            )}

            {step === 3 && (
              <div class="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-4 border-emerald-400 rounded-2xl p-5 space-y-4 shadow-xl shadow-emerald-950/50 animate-fadeIn">
                
                {/* Header */}
                <div class="flex items-center justify-between border-b border-emerald-400/30 pb-3">
                  <div class="flex items-center gap-2">
                    <Award class="w-6 h-6 text-emerald-400" />
                    <div>
                      <div class="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">OFFICIAL X.509 DIGITAL CERTIFICATE</div>
                      <div class="text-base font-extrabold text-white">{domainName.trim() || 'site.com'}</div>
                    </div>
                  </div>
                  <span class="px-2.5 py-1 bg-emerald-500 text-slate-950 font-black text-[10px] rounded-full uppercase">
                    VERIFIED & TRUSTED
                  </span>
                </div>

                {/* Body Details */}
                <div class="grid grid-cols-2 gap-2 text-xs">
                  <div class="p-2.5 bg-slate-950/80 rounded-xl">
                    <span class="text-[10px] text-slate-400 font-bold uppercase block">Issuer (CA):</span>
                    <span class="font-bold text-indigo-300">Trusted Global CA</span>
                  </div>
                  <div class="p-2.5 bg-slate-950/80 rounded-xl">
                    <span class="text-[10px] text-slate-400 font-bold uppercase block">Hardware Stamp:</span>
                    <span class="font-bold text-emerald-300">Signed by HSM Vault</span>
                  </div>
                  <div class="p-2.5 bg-slate-950/80 rounded-xl col-span-2">
                    <span class="text-[10px] text-slate-400 font-bold uppercase block">Allowed Domains (SAN Extension):</span>
                    <span class="font-bold text-white">
                      {useSan 
                        ? `${domainName.trim()}, store.${domainName.trim()}, mail.${domainName.trim()}` 
                        : `${domainName.trim()} (Single Domain)`}
                    </span>
                  </div>
                </div>

                {/* OS Trust Footnote */}
                <div class="p-2.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-[11px] text-emerald-200 font-semibold flex items-center gap-2">
                  <Cpu class="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your <strong>OS (Operating System)</strong> trusts this CA, so browsers display the 🔒 Green Padlock!</span>
                </div>

              </div>
            )}
          </div>

          {/* Acronym cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">PKI = Ecosystem</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CA = Certificate Authority</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CSR = Signing Request</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">HSM = Vault Hardware</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">X.509 = Format Standard</span>
          </div>

        </div>

      </div>

    </div>
  );
}
