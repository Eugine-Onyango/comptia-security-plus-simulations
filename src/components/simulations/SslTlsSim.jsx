import React, { useState } from 'react';
import { Lock, Unlock, ShieldCheck, RefreshCw, Sparkles, ArrowRight, Server, Laptop } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function SslTlsSim() {
  const [handshakeStep, setHandshakeStep] = useState(0); // 0: Unsecured, 1: Hello, 2: Cert Exchanged, 3: Keys Derived, 4: Encrypted
  const [isHandshaking, setIsHandshaking] = useState(false);

  const handleStartHandshake = () => {
    sounds.playPop();
    setIsHandshaking(true);
    setHandshakeStep(1);

    setTimeout(() => {
      sounds.playPop();
      setHandshakeStep(2);
    }, 800);

    setTimeout(() => {
      sounds.playPop();
      setHandshakeStep(3);
    }, 1600);

    setTimeout(() => {
      sounds.playSuccess();
      setHandshakeStep(4);
      setIsHandshaking(false);
    }, 2400);
  };

  const handleReset = () => {
    sounds.playPop();
    setHandshakeStep(0);
    setIsHandshaking(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-emerald-50 border-2 border-emerald-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-200/80 text-emerald-900 font-extrabold text-xs rounded-full">
            <span>Secure Handshake • SSL & TLS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-emerald-950">
            SSL vs. TLS = The Secret Lock & Key Handshake! 🔒
          </h3>
          <p class="text-emerald-900/80 font-medium text-sm">
            <strong>SSL</strong> is the older legacy protocol. <strong>TLS</strong> is the modern, super-strong security protocol that powers the green padlock on your browser!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-emerald-200 text-emerald-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Locking hands and agreeing on a secret password before talking.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Lock class="w-5 h-5 text-emerald-600" />
            <span>Interactive Handshake Controller</span>
          </h4>

          <p class="text-xs text-slate-600 font-medium leading-relaxed">
            Click below to watch your web browser and web server perform the <strong>TLS Handshake</strong> step-by-step!
          </p>

          <button
            onClick={handleStartHandshake}
            disabled={isHandshaking || handshakeStep === 4}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              handshakeStep === 4 
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-not-allowed'
                : isHandshaking
                  ? 'bg-amber-400 text-amber-950 animate-pulse cursor-wait'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200'
            }`}
          >
            {handshakeStep === 4 ? (
              <>
                <ShieldCheck class="w-5 h-5 text-emerald-700" />
                <span>HTTPS Connection Established!</span>
              </>
            ) : isHandshaking ? (
              <span>Handshake in Progress...</span>
            ) : (
              <>
                <Sparkles class="w-5 h-5" />
                <span>Start TLS Handshake Simulation</span>
              </>
            )}
          </button>

          {/* Handshake Progress Steps */}
          <div class="space-y-2 pt-2">
            <div class={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              handshakeStep >= 1 ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <span>1. Client Hello (Browser sends supported TLS versions)</span>
            </div>

            <div class={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              handshakeStep >= 2 ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <span>2. Server Hello & X.509 Certificate Exchanged</span>
            </div>

            <div class={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              handshakeStep >= 3 ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <span>3. Symmetric Session Keys Derived securely</span>
            </div>

            <div class={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 ${
              handshakeStep === 4 ? 'bg-emerald-500 text-white border-emerald-600 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}>
              <span>4. Green Padlock 🔒 Active (HTTPS Enabled!)</span>
            </div>
          </div>

          {handshakeStep > 0 && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Handshake
            </button>
          )}
        </div>

        {/* Visual Browser Address Bar & Tunnel Graphic (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[360px] shadow-lg relative overflow-hidden">
          
          {/* Simulated Browser Address Bar */}
          <div class="p-3 bg-slate-950 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div class={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-extrabold transition-all ${
              handshakeStep === 4 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' 
                : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}>
              {handshakeStep === 4 ? <Lock class="w-3.5 h-3.5" /> : <Unlock class="w-3.5 h-3.5" />}
              <span>{handshakeStep === 4 ? 'https://' : 'http://'}</span>
            </div>
            
            <div class="font-mono text-xs text-white font-bold tracking-wide">
              professormesser.com
            </div>
          </div>

          {/* Animated Handshake Visual */}
          <div class="my-6 py-6 border border-slate-800 bg-slate-950/60 rounded-2xl p-4 space-y-6">
            
            <div class="flex items-center justify-between">
              {/* Laptop */}
              <div class="text-center">
                <div class="w-14 h-14 rounded-2xl bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-indigo-300 mx-auto">
                  <Laptop class="w-7 h-7" />
                </div>
                <span class="text-[11px] font-bold text-slate-300 mt-1 block">Your Browser</span>
              </div>

              {/* Tunnel Graphic */}
              <div class="flex-1 px-4 text-center">
                {handshakeStep === 4 ? (
                  <div class="p-2 bg-emerald-500/20 border-2 border-emerald-400 rounded-xl text-emerald-300 text-xs font-bold animate-pulse">
                    🔒 TLS Encrypted Tunnel Active
                  </div>
                ) : isHandshaking ? (
                  <div class="p-2 bg-amber-500/20 border border-amber-400/50 rounded-xl text-amber-300 text-xs font-bold animate-pulse">
                    ⚡ Exchanging Keys...
                  </div>
                ) : (
                  <div class="p-2 bg-slate-800 text-slate-500 rounded-xl text-xs font-semibold">
                    Unencrypted (HTTP)
                  </div>
                )}
              </div>

              {/* Web Server */}
              <div class="text-center">
                <div class="w-14 h-14 rounded-2xl bg-indigo-500/20 border-2 border-indigo-400 flex items-center justify-center text-indigo-300 mx-auto">
                  <Server class="w-7 h-7" />
                </div>
                <span class="text-[11px] font-bold text-slate-300 mt-1 block">Web Server</span>
              </div>
            </div>

            <p class="text-xs text-slate-300 font-medium text-center">
              {handshakeStep === 4 
                ? '✅ Modern TLS encryption protects passwords and credit cards from eavesdroppers!' 
                : 'Click "Start TLS Handshake" to see how browsers secure data!'}
            </p>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSL = Legacy Handshake</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">TLS = Modern Secure Standard</span>
          </div>

        </div>

      </div>

    </div>
  );
}
