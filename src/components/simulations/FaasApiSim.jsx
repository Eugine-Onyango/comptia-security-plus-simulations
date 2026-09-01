import React, { useState } from 'react';
import { Zap, Server, Cpu, ArrowRight, CheckCircle2, RefreshCw, Layers } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function FaasApiSim() {
  const [faasState, setFaasState] = useState('idle'); // 'idle', 'triggering', 'running', 'completed'
  const [executionTime, setExecutionTime] = useState(0);

  const handleTriggerApi = () => {
    sounds.playPop();
    setFaasState('triggering');

    setTimeout(() => {
      sounds.playPop();
      setFaasState('running');
      setExecutionTime(42);
    }, 600);

    setTimeout(() => {
      sounds.playSuccess();
      setFaasState('completed');
    }, 1600);
  };

  const handleReset = () => {
    sounds.playPop();
    setFaasState('idle');
    setExecutionTime(0);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Serverless FaaS & APIs • FaaS, API, OS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            FaaS Serverless Functions & API Gateways! ⚡⚡
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>FaaS (Function as a Service)</strong> microservices remove the <strong>OS (Operating System)</strong> from customer management! Code runs only when triggered by an <strong>API</strong> request.
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A motion sensor light bulb that turns on for 3 seconds when someone walks by, then shuts off.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Zap class="w-5 h-5 text-indigo-600" />
            <span>Trigger API Call to FaaS</span>
          </h4>

          <div class="p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs font-mono text-indigo-950 font-bold">
            POST /api/v1/process-payment
          </div>

          <button
            onClick={handleTriggerApi}
            disabled={faasState !== 'idle'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              faasState === 'completed'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : faasState !== 'idle'
                  ? 'bg-indigo-400 text-white animate-pulse cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {faasState === 'idle' && (
              <>
                <ArrowRight class="w-5 h-5" />
                <span>Call API Endpoint (Trigger FaaS)</span>
              </>
            )}
            {faasState === 'triggering' && <span>API Gateway Intercepting...</span>}
            {faasState === 'running' && <span>Executing FaaS Code (42ms)...</span>}
            {faasState === 'completed' && <span>FaaS Code Finished & Destroyed!</span>}
          </button>

          {faasState !== 'idle' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset FaaS Trigger
            </button>
          )}
        </div>

        {/* Visual Comparison Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Architecture Comparison</span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              faasState === 'completed' ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-500 text-white'
            }`}>
              {faasState === 'completed' ? 'EXECUTION SUCCESS (42ms)' : 'STANDBY'}
            </span>
          </div>

          {/* Execution Cards */}
          <div class="my-4 space-y-3">
            
            {/* Traditional Monolith */}
            <div class="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
              <div class="flex items-center justify-between text-xs font-extrabold text-amber-400">
                <span class="flex items-center gap-1.5"><Server class="w-4 h-4" /> Traditional Monolithic OS Server</span>
                <span class="text-[10px] text-amber-300">100% CPU ALWAYS ON</span>
              </div>
              <p class="text-xs text-slate-400 font-medium">
                Full OS running 24/7 in background. Requires continuous OS patching, security updates, and idle server costs.
              </p>
            </div>

            {/* FaaS Serverless */}
            <div className={`p-3.5 rounded-2xl border-2 transition-all ${
              faasState === 'running' || faasState === 'completed'
                ? 'bg-indigo-950/80 border-indigo-400 text-indigo-100 shadow-lg'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold text-indigo-300 mb-1">
                <span class="flex items-center gap-1.5"><Zap class="w-4 h-4 text-indigo-400" /> Serverless FaaS + API Gateway</span>
                {faasState === 'completed' && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-xs font-medium">
                {faasState === 'idle' && '⏳ Waiting for API call. 0% idle CPU cost, no OS maintenance required!'}
                {faasState === 'triggering' && '⚡ API Gateway routes request to cloud provider FaaS engine...'}
                {faasState === 'running' && '🚀 Ephemeral stateless container spun up! Code executing...'}
                {faasState === 'completed' && '🎉 Code executed in 42ms! Output returned via API and container destroyed.'}
              </p>
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">FaaS = Function as a Service</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">API = Application Programming Interface</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">OS = Operating System</span>
          </div>

        </div>

      </div>

    </div>
  );
}
