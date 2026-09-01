import React, { useState } from 'react';
import { AlertTriangle, ShieldAlert, ShieldCheck, CheckCircle2, XCircle, FileText, ArrowRight, Zap } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function Md5CollisionSim() {
  const [algo, setAlgo] = useState('md5'); // 'md5' or 'sha256'
  const [testResult, setTestResult] = useState(null); // null, 'passed_vulnerable', 'failed_secure'

  const docA = { title: 'Legitimate Contract', content: 'Pay Alice $100 for Consulting Services', md5: 'd41d8cd98f00b204e9800998ecf8427e', sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' };
  const docB = { title: 'Forged Hacker Contract', content: 'Pay Hacker $1,000,000 for Consulting Services', md5: 'd41d8cd98f00b204e9800998ecf8427e', sha256: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4' };

  const handleTestVerification = () => {
    sounds.playPop();
    if (algo === 'md5') {
      sounds.playBuzzer();
      setTestResult('passed_vulnerable');
    } else {
      sounds.playSuccess();
      setTestResult('failed_secure');
    }
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-rose-50 border-2 border-rose-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-200/80 text-rose-900 font-extrabold text-xs rounded-full">
            <span>MD5 Collision Attack • Deprecated Tech</span>
          </div>
          <h3 class="text-2xl font-extrabold text-rose-950">
            MD5 Collision Attack Vulnerability! 🚨
          </h3>
          <p class="text-rose-900/80 font-medium text-sm">
            In an <strong>MD5</strong> collision attack, two completely different documents produce the exact same 128-bit hash! This allows hackers to forge signed contracts.
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-rose-200 text-rose-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Two completely different people having identical fingerprints.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <AlertTriangle class="w-5 h-5 text-rose-600" />
            <span>Select Signature Verification Algorithm</span>
          </h4>

          <div class="space-y-2">
            <button
              onClick={() => {
                setAlgo('md5');
                setTestResult(null);
                sounds.playPop();
              }}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                algo === 'md5'
                  ? 'border-rose-500 bg-rose-50 text-rose-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-rose-700">MD5 Algorithm (DEPRECATED)</div>
                <div class="text-[11px] text-slate-500 font-medium mt-0.5">Vulnerable to collision attacks!</div>
              </div>
            </button>

            <button
              onClick={() => {
                setAlgo('sha256');
                setTestResult(null);
                sounds.playPop();
              }}
              class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                algo === 'sha256'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                  : 'border-slate-200 hover:border-slate-300 text-slate-700'
              }`}
            >
              <div>
                <div class="font-extrabold text-sm text-emerald-800">SHA-256 Algorithm (RECOMMENDED)</div>
                <div class="text-[11px] text-slate-500 font-medium mt-0.5">Collision-resistant modern standard</div>
              </div>
            </button>
          </div>

          <button
            onClick={handleTestVerification}
            class="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Zap class="w-5 h-5 text-amber-400" />
            <span>Verify Forged Contract Signature</span>
          </button>
        </div>

        {/* Visual Documents Comparison (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Digital Contract Hash Inspection</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              algo === 'md5' ? 'bg-rose-500 text-white' : 'bg-emerald-500 text-slate-950'
            }`}>
              {algo.toUpperCase()} ALGORITHM
            </span>
          </div>

          {/* Documents Display */}
          <div class="my-4 space-y-3">
            
            {/* Doc A */}
            <div class="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <div class="text-xs font-extrabold text-emerald-400">📄 {docA.title}</div>
              <div class="text-xs text-slate-300 font-medium">"{docA.content}"</div>
              <div class="text-[10px] font-mono text-slate-400">
                {algo === 'md5' ? `MD5: ${docA.md5}` : `SHA-256: ${docA.sha256}`}
              </div>
            </div>

            {/* Doc B */}
            <div class="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <div class="text-xs font-extrabold text-rose-400">📄 {docB.title}</div>
              <div class="text-xs text-slate-300 font-medium">"{docB.content}"</div>
              <div class="text-[10px] font-mono text-slate-400">
                {algo === 'md5' ? `MD5: ${docB.md5}` : `SHA-256: ${docB.sha256}`}
              </div>
            </div>

          </div>

          {/* Test Result Banner */}
          {testResult && (
            <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              testResult === 'passed_vulnerable'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
                : 'bg-emerald-950 border-emerald-500 text-emerald-200'
            }`}>
              {testResult === 'passed_vulnerable' ? (
                <span>🚨 <strong>MD5 COLLISION VULNERABILITY DETECTED!</strong> Both contracts produced the exact same <strong>MD5</strong> hash (`d41d8c...`). The bank verified the forged $1,000,000 contract as valid! This is why MD5 is DEPRECATED!</span>
              ) : (
                <span>✅ <strong>SHA-256 COLLISION RESISTANT!</strong> SHA-256 computed unique hashes for both files. The forged contract was detected and rejected instantly!</span>
              )}
            </div>
          )}

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">MD5 = Message Digest 5</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Collision = 2 Files, Same Hash</span>
          </div>

        </div>

      </div>

    </div>
  );
}
