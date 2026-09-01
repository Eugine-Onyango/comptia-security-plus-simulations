import React, { useState } from 'react';
import { Layers, Terminal, Code, Cpu, ArrowDown, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function SdnPlanesSim() {
  const [activePlane, setActivePlane] = useState('management'); // 'management', 'control', 'data'
  const [flowState, setFlowState] = useState('idle'); // 'idle', 'management', 'control', 'data', 'done'

  const handleDeployRule = () => {
    sounds.playPop();
    setFlowState('management');
    setActivePlane('management');

    setTimeout(() => {
      sounds.playPop();
      setFlowState('control');
      setActivePlane('control');
    }, 1000);

    setTimeout(() => {
      sounds.playPop();
      setFlowState('data');
      setActivePlane('data');
    }, 2000);

    setTimeout(() => {
      sounds.playSuccess();
      setFlowState('done');
    }, 3000);
  };

  const handleReset = () => {
    sounds.playPop();
    setFlowState('idle');
    setActivePlane('management');
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-blue-50 border-2 border-blue-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-200/80 text-blue-900 font-extrabold text-xs rounded-full">
            <span>Software Defined Networking • SDN, SSH, API</span>
          </div>
          <h3 class="text-2xl font-extrabold text-blue-950">
            SDN Planes & Admin Control (SSH / API)! 🗼✈️
          </h3>
          <p class="text-blue-900/80 font-medium text-sm">
            <strong>SDN (Software Defined Networking)</strong> splits network devices into 3 distinct planes: Management (configured via <strong>SSH</strong> or <strong>API</strong>), Control (routing calculations), and Data (packet forwarding & <strong>NAT</strong>)!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-blue-200 text-blue-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Airport Tower (Control Plane) guiding planes on the runway (Data Plane).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Layers class="w-5 h-5 text-blue-600" />
            <span>Deploy Network Rule via SDN</span>
          </h4>

          <div class="space-y-3">
            <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
              <span class="text-xs font-extrabold text-blue-900 uppercase tracking-wider block">Admin Management Tools:</span>
              <div class="flex gap-2">
                <span class="px-2.5 py-1 bg-blue-100 text-blue-900 rounded font-mono text-xs font-bold flex items-center gap-1">
                  <Terminal class="w-3.5 h-3.5" /> SSH Terminal
                </span>
                <span class="px-2.5 py-1 bg-indigo-100 text-indigo-900 rounded font-mono text-xs font-bold flex items-center gap-1">
                  <Code class="w-3.5 h-3.5" /> REST API Call
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleDeployRule}
            disabled={flowState !== 'idle' && flowState !== 'done'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              flowState === 'done'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : flowState !== 'idle'
                  ? 'bg-blue-400 text-white animate-pulse cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
            }`}
          >
            {flowState === 'idle' && <span>Push Configuration via API / SSH</span>}
            {flowState === 'management' && <span>Stage 1: Management Plane receiving API...</span>}
            {flowState === 'control' && <span>Stage 2: Control Plane calculating routes...</span>}
            {flowState === 'data' && <span>Stage 3: Data Plane forwarding packets...</span>}
            {flowState === 'done' && <span>Rule Deployed Across All 3 SDN Planes!</span>}
          </button>

          {flowState !== 'idle' && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Simulation
            </button>
          )}
        </div>

        {/* Visual 3-Plane Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">SDN Architectural Planes</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500 text-white">
              SDN CONTROLLER
            </span>
          </div>

          {/* Planes Stack */}
          <div class="my-4 space-y-3">
            
            {/* Plane 1: Application / Management */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              activePlane === 'management'
                ? 'bg-blue-950 border-blue-400 text-blue-100 shadow-md scale-[1.02]'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <Terminal class="w-4 h-4 text-blue-400" /> 1. Application Layer / Management Plane
                </span>
                <span class="px-2 py-0.5 bg-blue-900 text-blue-200 rounded text-[10px]">SSH & API</span>
              </div>
              <p class="text-xs font-medium">
                Admins use <strong>SSH</strong> terminals or <strong>API</strong> calls to configure and manage network policies centrally.
              </p>
            </div>

            {/* Down Arrow */}
            <div class="text-center">
              <ArrowDown class="w-4 h-4 mx-auto text-slate-600" />
            </div>

            {/* Plane 2: Control Layer */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              activePlane === 'control'
                ? 'bg-purple-950 border-purple-400 text-purple-100 shadow-md scale-[1.02]'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <Cpu class="w-4 h-4 text-purple-400" /> 2. Control Layer / Control Plane
                </span>
                <span class="px-2 py-0.5 bg-purple-900 text-purple-200 rounded text-[10px]">ROUTING & TABLES</span>
              </div>
              <p class="text-xs font-medium">
                The central brain. Manages routing tables, session tables, and dynamic protocol updates.
              </p>
            </div>

            {/* Down Arrow */}
            <div class="text-center">
              <ArrowDown class="w-4 h-4 mx-auto text-slate-600" />
            </div>

            {/* Plane 3: Infrastructure / Data */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              activePlane === 'data'
                ? 'bg-emerald-950 border-emerald-400 text-emerald-100 shadow-md scale-[1.02]'
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <Zap class="w-4 h-4 text-emerald-400" /> 3. Infrastructure Layer / Data Plane
                </span>
                <span class="px-2 py-0.5 bg-emerald-900 text-emerald-200 rounded text-[10px]">PACKET FORWARDING & NAT</span>
              </div>
              <p class="text-xs font-medium">
                High-speed hardware forwarding frames and packets, performing trunking, encryption, and <strong>NAT</strong> translation!
              </p>
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SDN = Software Defined Networking</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSH = Secure Shell</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">API = Application Programming Interface</span>
          </div>

        </div>

      </div>

    </div>
  );
}
