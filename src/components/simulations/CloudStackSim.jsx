import React, { useState } from 'react';
import { Cloud, Layers, Server, ShieldCheck, CheckCircle2, User, Cpu, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CloudStackSim() {
  const [activeModel, setActiveModel] = useState('iaas'); // 'onprem', 'iaas', 'paas', 'saas', 'faas'

  const models = {
    onprem: {
      name: 'On-Premises',
      tagline: 'You Manage Everything (100% User Control)',
      analogy: 'Baking pizza from scratch at home with your own oven.',
      userManaged: ['Data & Apps', 'Runtime & OS', 'Virtualization', 'Hardware & Facilities'],
      providerManaged: []
    },
    iaas: {
      name: 'IaaS (Infrastructure as a Service)',
      tagline: 'Rent Raw Servers & Storage (You Manage OS & Apps)',
      analogy: 'Renting a commercial kitchen & oven, but bringing your own ingredients and OS.',
      userManaged: ['Data & Apps', 'Runtime & OS'],
      providerManaged: ['Virtualization', 'Hardware & Facilities']
    },
    paas: {
      name: 'PaaS (Platform as a Service)',
      tagline: 'Pre-configured OS & Runtime (You Bring App Code)',
      analogy: 'Using a pizza station where the oven and dough are prepped; you just add toppings.',
      userManaged: ['Data & Apps'],
      providerManaged: ['Runtime & OS', 'Virtualization', 'Hardware & Facilities']
    },
    saas: {
      name: 'SaaS (Software as a Service)',
      tagline: 'Fully Managed Web App (Vendor Manages Everything)',
      analogy: 'Ordering hot pizza delivered to your door. Just eat and enjoy!',
      userManaged: [],
      providerManaged: ['Data & Apps', 'Runtime & OS', 'Virtualization', 'Hardware & Facilities']
    },
    faas: {
      name: 'FaaS (Function as a Service / Serverless)',
      tagline: 'Event-Driven Code Execution (No OS or Server Management)',
      analogy: 'An automated robot arm that bakes 1 slice ONLY when an API doorbell rings!',
      userManaged: ['Function Code Only'],
      providerManaged: ['Stateless Runtime', 'OS Management', 'Auto-scaling Hardware']
    }
  };

  const current = models[activeModel];

  const handleSelectModel = (key) => {
    sounds.playPop();
    setActiveModel(key);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-sky-50 border-2 border-sky-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-200/80 text-sky-900 font-extrabold text-xs rounded-full">
            <span>Cloud Infrastructures • IaaS, PaaS, SaaS, FaaS, OS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-sky-950">
            The Shared Responsibility Matrix! 🍕☁️
          </h3>
          <p class="text-sky-900/80 font-medium text-sm">
            Learn who is responsible for security across <strong>IaaS</strong>, <strong>PaaS</strong>, <strong>SaaS</strong>, and <strong>FaaS (Serverless)</strong> models, and where the <strong>OS (Operating System)</strong> lives!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-sky-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Pizza at Home (On-Prem) vs Rent Kitchen (IaaS) vs Pizza Delivery (SaaS).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Model Selection Tabs (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Cloud class="w-5 h-5 text-sky-600" />
            <span>Select Cloud Service Model</span>
          </h4>

          <div class="space-y-2">
            {Object.keys(models).map((key) => {
              const m = models[key];
              const isSelected = activeModel === key;
              return (
                <button
                  key={key}
                  onClick={() => handleSelectModel(key)}
                  class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-sky-500 bg-sky-50 text-sky-950 shadow-sm scale-[1.02]'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div>
                    <div class="font-extrabold text-sm">{m.name}</div>
                    <div class="text-[11px] text-slate-500 font-medium mt-0.5">{m.tagline}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Visual Stack & Responsibility Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[420px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Shared Responsibility Stack</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-sky-500 text-slate-950">
              {current.name.split(' ')[0]} MATRIX
            </span>
          </div>

          {/* Analogy Box */}
          <div class="my-3 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-sky-300 font-medium">
            💡 <strong>Analogy:</strong> {current.analogy}
          </div>

          {/* Stack Inspector */}
          <div class="space-y-2.5">
            
            {/* Layer 4: Data & Apps */}
            <div class={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-between transition-all ${
              current.userManaged.includes('Data & Apps') || current.userManaged.includes('Function Code Only')
                ? 'bg-blue-900/80 border-blue-400 text-blue-100'
                : 'bg-emerald-950/80 border-emerald-400 text-emerald-100'
            }`}>
              <div class="flex items-center gap-2">
                <Layers class="w-4 h-4" />
                <span>Applications & Customer Data</span>
              </div>
              <span class={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                current.userManaged.includes('Data & Apps') || current.userManaged.includes('Function Code Only')
                  ? 'bg-blue-400 text-slate-950'
                  : 'bg-emerald-400 text-slate-950'
              }`}>
                {current.userManaged.includes('Data & Apps') || current.userManaged.includes('Function Code Only') ? '👤 YOU MANAGE' : '☁️ PROVIDER MANAGES'}
              </span>
            </div>

            {/* Layer 3: Runtime & OS */}
            <div class={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-between transition-all ${
              current.userManaged.includes('Runtime & OS')
                ? 'bg-blue-900/80 border-blue-400 text-blue-100'
                : 'bg-emerald-950/80 border-emerald-400 text-emerald-100'
            }`}>
              <div class="flex items-center gap-2">
                <Cpu class="w-4 h-4" />
                <span>Operating System (OS) & Runtimes</span>
              </div>
              <span class={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                current.userManaged.includes('Runtime & OS')
                  ? 'bg-blue-400 text-slate-950'
                  : 'bg-emerald-400 text-slate-950'
              }`}>
                {current.userManaged.includes('Runtime & OS') ? '👤 YOU MANAGE (Patching)' : '☁️ PROVIDER MANAGES'}
              </span>
            </div>

            {/* Layer 2: Virtualization */}
            <div class={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-between transition-all ${
              current.userManaged.includes('Virtualization')
                ? 'bg-blue-900/80 border-blue-400 text-blue-100'
                : 'bg-emerald-950/80 border-emerald-400 text-emerald-100'
            }`}>
              <div class="flex items-center gap-2">
                <Server class="w-4 h-4" />
                <span>Virtualization & Hypervisors</span>
              </div>
              <span class={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                current.userManaged.includes('Virtualization')
                  ? 'bg-blue-400 text-slate-950'
                  : 'bg-emerald-400 text-slate-950'
              }`}>
                {current.userManaged.includes('Virtualization') ? '👤 YOU MANAGE' : '☁️ PROVIDER MANAGES'}
              </span>
            </div>

            {/* Layer 1: Hardware & Datacenter */}
            <div class={`p-3.5 rounded-2xl border-2 font-bold text-xs flex items-center justify-between transition-all ${
              current.userManaged.includes('Hardware & Facilities')
                ? 'bg-blue-900/80 border-blue-400 text-blue-100'
                : 'bg-emerald-950/80 border-emerald-400 text-emerald-100'
            }`}>
              <div class="flex items-center gap-2">
                <Cloud class="w-4 h-4" />
                <span>Physical Hardware & Data Center</span>
              </div>
              <span class={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                current.userManaged.includes('Hardware & Facilities')
                  ? 'bg-blue-400 text-slate-950'
                  : 'bg-emerald-400 text-slate-950'
              }`}>
                {current.userManaged.includes('Hardware & Facilities') ? '👤 YOU MANAGE' : '☁️ PROVIDER MANAGES'}
              </span>
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">IaaS = Infrastructure as a Service</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PaaS = Platform as a Service</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SaaS = Software as a Service</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">FaaS = Function as a Service</span>
          </div>

        </div>

      </div>

    </div>
  );
}
