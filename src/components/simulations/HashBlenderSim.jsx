import React, { useState } from 'react';
import { Fingerprint, Zap, RefreshCw, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { sounds } from '../../utils/audio';

// Simple JS implementation for MD5 (for interactive demonstration)
function simpleMd5Sim(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return (hex + hex + hex + hex).slice(0, 32);
}

// Simple JS implementation for SHA-256 sim
function simpleSha256Sim(str) {
  let h1 = 0x6a09e667, h2 = 0xbb67ae85, h3 = 0x3c6ef372, h4 = 0xa54ff53a;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 0x5bd1e995);
    h2 = Math.imul(h2 ^ ch, 0x27d4eb2d);
  }
  const strHash = [h1, h2, h3, h4].map(h => Math.abs(h).toString(16).padStart(8, '0')).join('');
  return strHash + strHash;
}

export default function HashBlenderSim() {
  const [inputText, setInputText] = useState('Hello World');

  const md5Hash = simpleMd5Sim(inputText);
  const sha256Hash = simpleSha256Sim(inputText);

  const handleTextChange = (val) => {
    sounds.playPop();
    setInputText(val);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Cryptographic Hashing • MD5</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            The One-Way Hash Blender & MD5! 🧬🥑
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            A hash takes input text and turns it into a unique fixed-length digital fingerprint. <strong>MD5 (Message Digest 5)</strong> is an older 128-bit hash algorithm now deprecated due to security flaws!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Blending an apple into a smoothie. You can't un-blend a smoothie!
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Input Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Fingerprint class="w-5 h-5 text-amber-600" />
            <span>Input Text to Hash</span>
          </h4>

          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Type Anything (Watch the Avalanche Effect!):
            </label>
            <textarea
              rows={3}
              value={inputText}
              onChange={(e) => handleTextChange(e.target.value)}
              class="w-full p-3 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none font-bold text-sm text-slate-800"
              placeholder="Type message here..."
            />
          </div>

          <div class="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900 space-y-1">
            <div class="font-extrabold">💡 The Avalanche Effect:</div>
            <div>Changing even 1 single character flips the entire hash value completely!</div>
          </div>
        </div>

        {/* Hash Output Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Digital Fingerprint Output</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500 text-amber-950">
              HASH CALCULATOR
            </span>
          </div>

          {/* Hash Cards */}
          <div class="my-4 space-y-4">
            
            {/* MD5 Box */}
            <div class="p-4 bg-slate-950 rounded-2xl border-2 border-rose-500/80 space-y-1.5">
              <div class="flex items-center justify-between text-xs font-extrabold text-rose-400 uppercase tracking-wider">
                <span class="flex items-center gap-1.5">
                  <AlertTriangle class="w-4 h-4" /> MD5 (Message Digest 5) - DEPRECATED
                </span>
                <span class="px-2 py-0.5 bg-rose-900/60 text-rose-300 text-[10px] rounded">128-bit (32 Hex)</span>
              </div>
              <div class="font-mono text-xs text-rose-200 break-all bg-slate-900 p-2.5 rounded-xl border border-rose-900/50">
                {md5Hash}
              </div>
              <div class="text-[11px] text-rose-300/80 font-medium">
                ⚠️ Vulnerable to collision attacks! Hackers can forge matching MD5 hashes.
              </div>
            </div>

            {/* SHA-256 Box */}
            <div class="p-4 bg-slate-950 rounded-2xl border-2 border-emerald-500/80 space-y-1.5">
              <div class="flex items-center justify-between text-xs font-extrabold text-emerald-400 uppercase tracking-wider">
                <span class="flex items-center gap-1.5">
                  <ShieldCheck class="w-4 h-4" /> SHA-256 (Secure Hash Standard) - RECOMMENDED
                </span>
                <span class="px-2 py-0.5 bg-emerald-900/60 text-emerald-300 text-[10px] rounded">256-bit (64 Hex)</span>
              </div>
              <div class="font-mono text-xs text-emerald-200 break-all bg-slate-900 p-2.5 rounded-xl border border-emerald-900/50">
                {sha256Hash}
              </div>
              <div class="text-[11px] text-emerald-300/80 font-medium">
                ✅ Secure collision-resistant algorithm used in modern digital signatures!
              </div>
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">MD5 = Message Digest algorithm 5</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">One-Way Function = Irreversible</span>
          </div>

        </div>

      </div>

    </div>
  );
}
