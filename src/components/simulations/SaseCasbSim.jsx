import React, { useState } from 'react';
import { Cloud, ShieldCheck, ShieldAlert, Lock, ArrowRight, FileText, CheckCircle2, XCircle, Database } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function SaseCasbSim() {
  const [fileType, setFileType] = useState('safe'); // 'safe' or 'sensitive'
  const [uploadState, setUploadState] = useState('idle'); // 'idle', 'casb', 'dlp', 'result'
  const [uploadResult, setUploadResult] = useState(null); // 'allowed' or 'blocked'

  const handleUploadFile = () => {
    sounds.playPop();
    setUploadState('casb');
    setUploadResult(null);

    setTimeout(() => {
      sounds.playPop();
      setUploadState('dlp');
    }, 1000);

    setTimeout(() => {
      if (fileType === 'sensitive') {
        sounds.playBuzzer();
        setUploadResult('blocked');
      } else {
        sounds.playSuccess();
        setUploadResult('allowed');
      }
      setUploadState('result');
    }, 2200);
  };

  const handleReset = () => {
    sounds.playPop();
    setUploadState('idle');
    setUploadResult(null);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-sky-50 border-2 border-sky-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-200/80 text-sky-900 font-extrabold text-xs rounded-full">
            <span>Cloud Edge & Data Loss Prevention • SASE, CASB, ZTNA, SaaS, DLP, DNS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-sky-950">
            SASE Cloud Security Mesh & CASB DLP Inspector! ☁️🛡️
          </h3>
          <p class="text-sky-900/80 font-medium text-sm">
            <strong>SASE (Secure Access Service Edge)</strong> combines cloud security services like <strong>CASB (Cloud Access Security Broker)</strong>, <strong>ZTNA (Zero Trust Network Access)</strong>, and <strong>DLP (Data Loss Prevention)</strong> to inspect uploads to <strong>SaaS</strong> apps and stop sensitive data leaks!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-sky-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Airport luggage scanner scanning bags for contraband before loading onto SaaS plane.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Cloud class="w-5 h-5 text-sky-600" />
            <span>Select File to Upload to SaaS Cloud</span>
          </h4>

          {/* File Selection */}
          <div class="space-y-2">
            <button
              onClick={() => {
                if (uploadState === 'idle') {
                  sounds.playPop();
                  setFileType('safe');
                }
              }}
              disabled={uploadState !== 'idle'}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                fileType === 'safe'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-emerald-900">📄 Normal Public Document</div>
                <div class="text-[11px] text-emerald-700 font-medium mt-0.5">Project_Presentation.pdf (No PII)</div>
              </div>
            </button>

            <button
              onClick={() => {
                if (uploadState === 'idle') {
                  sounds.playPop();
                  setFileType('sensitive');
                }
              }}
              disabled={uploadState !== 'idle'}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                fileType === 'sensitive'
                  ? 'border-rose-500 bg-rose-50 text-rose-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-rose-900">💳 Confidential Financial File</div>
                <div class="text-[11px] text-rose-700 font-medium mt-0.5">Customer_CreditCards.xlsx (Sensitive PII)</div>
              </div>
            </button>
          </div>

          <button
            onClick={handleUploadFile}
            disabled={uploadState !== 'idle'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              uploadState === 'result'
                ? 'bg-slate-100 text-slate-700 border border-slate-300'
                : uploadState !== 'idle'
                  ? 'bg-sky-400 text-white animate-pulse cursor-wait'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-200'
            }`}
          >
            {uploadState === 'idle' && <span>Upload File via SASE Cloud Gateway</span>}
            {uploadState === 'casb' && <span>Stage 1: CASB Identity & ZTNA Policy Check...</span>}
            {uploadState === 'dlp' && <span>Stage 2: DLP Deep Payload Scanner...</span>}
            {uploadState === 'result' && <span>Upload Complete!</span>}
          </button>

          {uploadState !== 'idle' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Upload
            </button>
          )}
        </div>

        {/* Visual SASE Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Cloud class="w-4 h-4 text-sky-400" /> SASE (Secure Access Service Edge) Cloud Mesh
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              uploadResult === 'allowed' ? 'bg-emerald-500 text-slate-950' : uploadResult === 'blocked' ? 'bg-rose-500 text-white animate-bounce' : 'bg-sky-500 text-white'
            }`}>
              {uploadResult === 'allowed' ? 'SAAS UPLOAD APPROVED' : uploadResult === 'blocked' ? 'DLP BLOCK TRIGGERED' : 'SASE ACTIVE'}
            </span>
          </div>

          {/* Inspection Steps */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            {/* CASB ZTNA Box */}
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              uploadState === 'casb' || uploadState === 'dlp' || uploadState === 'result'
                ? 'bg-sky-950 border-sky-400 text-sky-100 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>1. CASB & ZTNA Access Control Check</span>
                {uploadState !== 'idle' && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Verifies user identity, device health, and application permissions for **SaaS** cloud.
              </p>
            </div>

            {/* DLP Scanner Box */}
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              uploadState === 'dlp' || uploadState === 'result'
                ? 'bg-purple-950 border-purple-400 text-purple-100 shadow-md'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs">
                <span>2. DLP (Data Loss Prevention) Content Inspection</span>
                {uploadState === 'result' && (
                  fileType === 'safe'
                    ? <CheckCircle2 class="w-4 h-4 text-emerald-400" />
                    : <XCircle class="w-4 h-4 text-rose-400" />
                )}
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300 mt-1">
                Scans document content for sensitive credit card, SSN, and PII signatures.
              </p>
            </div>

          </div>

          {/* Result Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            uploadResult === 'allowed'
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : uploadResult === 'blocked'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
                : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {uploadResult === 'allowed' && (
              <span>✅ <strong>UPLOAD APPROVED!</strong> Document contains no sensitive PII. <strong>CASB & DLP</strong> safely delivered the file to the <strong>SaaS</strong> cloud.</span>
            )}
            {uploadResult === 'blocked' && (
              <span>🛑 <strong>SENSITIVE DATA LEAK BLOCKED BY DLP!</strong> The <strong>DLP</strong> engine detected unencrypted credit card numbers and blocked the transfer to <strong>SaaS</strong> cloud!</span>
            )}
            {!uploadResult && (
              <span>☁️ <strong>SASE Mesh Ready:</strong> Select a document and click upload to test CASB & DLP cloud inspection.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SASE = Secure Access Service Edge</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">CASB = Cloud Access Security Broker</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">DLP = Data Loss Prevention</span>
          </div>

        </div>

      </div>

    </div>
  );
}
