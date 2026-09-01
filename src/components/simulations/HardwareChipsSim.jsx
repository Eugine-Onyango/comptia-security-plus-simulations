import React, { useState } from 'react';
import { Cpu, HardDrive, ShieldCheck, Lock, Sparkles, CheckCircle2, Server, Key, Zap } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function HardwareChipsSim() {
  const [selectedDevice, setSelectedDevice] = useState('tpm'); // 'tpm' or 'hsm'

  const handleSelectDevice = (dev) => {
    sounds.playPop();
    setSelectedDevice(dev);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Hardware Security • TPM, HSM, ROM, AES</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            TPM vs. HSM = Hardware Security Vaults! 🛡️
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            Instead of storing secret keys in software where malware can touch them, hardware chips (<strong>TPM & HSM</strong>) lock keys inside physical silicon!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Storing money in a physical wall safe vs. leaving it under a mattress.
        </div>
      </div>

      {/* Interactive Selection Buttons */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* TPM Button */}
        <button
          onClick={() => handleSelectDevice('tpm')}
          class={`p-6 rounded-3xl border-4 text-left transition-all flex flex-col justify-between gap-4 active:scale-95 ${
            selectedDevice === 'tpm'
              ? 'border-amber-400 bg-gradient-to-br from-amber-50 to-yellow-50 shadow-xl scale-[1.02]'
              : 'border-slate-200 bg-white hover:border-slate-300 opacity-75'
          }`}
        >
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-extrabold text-2xl shadow-md">
              💻
            </div>
            {selectedDevice === 'tpm' && (
              <span class="px-3 py-1 bg-amber-400 text-amber-950 font-extrabold text-xs rounded-full shadow-sm">
                Active View
              </span>
            )}
          </div>

          <div class="space-y-1">
            <span class="text-xs font-extrabold text-amber-700 uppercase tracking-wider">On Your Motherboard</span>
            <h4 class="text-2xl font-extrabold text-slate-900">TPM (Trusted Platform Module)</h4>
            <p class="text-slate-600 text-xs font-medium">
              Built-in security chip for laptops & PCs. Has its own boot <strong>ROM</strong> and hardware <strong>AES</strong>.
            </p>
          </div>
        </button>

        {/* HSM Button */}
        <button
          onClick={() => handleSelectDevice('hsm')}
          class={`p-6 rounded-3xl border-4 text-left transition-all flex flex-col justify-between gap-4 active:scale-95 ${
            selectedDevice === 'hsm'
              ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-indigo-50 shadow-xl scale-[1.02]'
              : 'border-slate-200 bg-white hover:border-slate-300 opacity-75'
          }`}
        >
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
              🏢
            </div>
            {selectedDevice === 'hsm' && (
              <span class="px-3 py-1 bg-purple-500 text-white font-extrabold text-xs rounded-full shadow-sm">
                Active View
              </span>
            )}
          </div>

          <div class="space-y-1">
            <span class="text-xs font-extrabold text-purple-700 uppercase tracking-wider">Enterprise Server Rack</span>
            <h4 class="text-2xl font-extrabold text-slate-900">HSM (Hardware Security Module)</h4>
            <p class="text-slate-600 text-xs font-medium">
              High-end standalone vault appliance. Manages millions of keys and offloads <strong>CPU</strong> workload.
            </p>
          </div>
        </button>

      </div>

      {/* Visual Display for Selected Device */}
      <div class="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6 shadow-lg relative overflow-hidden">
        
        <div class="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h4 class="text-xl font-extrabold text-white flex items-center gap-2">
              <span>{selectedDevice === 'tpm' ? 'TPM Motherboard Microchip Blueprint' : 'HSM Enterprise Server Appliance Blueprint'}</span>
            </h4>
            <p class="text-xs text-slate-400 font-medium">
              {selectedDevice === 'tpm' ? 'Integrated on single-user devices' : 'Plugged into high-performance server networks'}
            </p>
          </div>

          <span class={`px-3 py-1 rounded-full font-extrabold text-xs ${
            selectedDevice === 'tpm' ? 'bg-amber-400 text-amber-950' : 'bg-purple-500 text-white'
          }`}>
            {selectedDevice === 'tpm' ? 'TPM Chip' : 'HSM Appliance'}
          </span>
        </div>

        {/* Interactive Diagram */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          
          {/* Left Feature Card */}
          <div class="space-y-4">
            {selectedDevice === 'tpm' ? (
              <>
                <div class="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400/60 space-y-2">
                  <div class="flex items-center gap-2 font-extrabold text-amber-300 text-base">
                    <ShieldCheck class="w-5 h-5 text-amber-400" />
                    <span>BitLocker & Secure Boot Protection</span>
                  </div>
                  <p class="text-xs text-slate-300">
                    TPM binds your hard drive encryption key directly to your motherboard's physical chip. If someone steals your hard drive, they can't read it!
                  </p>
                </div>

                <div class="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
                  <div class="flex items-center gap-2 font-extrabold text-white text-sm">
                    <Cpu class="w-4 h-4 text-emerald-400" />
                    <span>Embedded Boot ROM</span>
                  </div>
                  <p class="text-xs text-slate-400">
                    Contains immutable <strong>ROM (Read-Only Memory)</strong> code that checks your PC's health before launching Windows!
                  </p>
                </div>
              </>
            ) : (
              <>
                <div class="p-4 rounded-2xl bg-purple-500/10 border-2 border-purple-400/60 space-y-2">
                  <div class="flex items-center gap-2 font-extrabold text-purple-300 text-base">
                    <Server class="w-5 h-5 text-purple-400" />
                    <span>Enterprise Key Management</span>
                  </div>
                  <p class="text-xs text-slate-300">
                    Stores and signs thousands of digital certificates, Master Encryption Keys, and SSL/TLS session secrets for banks & cloud providers.
                  </p>
                </div>

                <div class="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-2">
                  <div class="flex items-center gap-2 font-extrabold text-white text-sm">
                    <Zap class="w-4 h-4 text-yellow-400" />
                    <span>Offloads CPU Workload</span>
                  </div>
                  <p class="text-xs text-slate-400">
                    Performs hardware-accelerated <strong>AES</strong> encryption so the main server <strong>CPU</strong> stays cool and fast!
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Right Blueprint Graphic */}
          <div class="p-6 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-4">
            <div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-amber-400/80 flex items-center justify-center text-4xl shadow-lg shadow-amber-950/50">
              {selectedDevice === 'tpm' ? '🎛️' : '🖥️'}
            </div>

            <div class="space-y-1">
              <div class="font-extrabold text-sm text-white">
                {selectedDevice === 'tpm' ? 'Motherboard TPM 2.0 Chip' : 'Rackmount HSM Vault Module'}
              </div>
              <div class="text-xs text-slate-400">
                {selectedDevice === 'tpm' ? 'Tamper-Resistant Hardware Cryptoprocessor' : 'Dedicated Crypto Acceleration Appliance'}
              </div>
            </div>

            <div class="pt-3 border-t border-slate-800 flex justify-center gap-2 text-[10px] font-bold text-slate-400">
              <span class="px-2 py-1 bg-slate-900 rounded border border-slate-800">AES Hardware Engine</span>
              <span class="px-2 py-1 bg-slate-900 rounded border border-slate-800">Boot ROM</span>
              <span class="px-2 py-1 bg-slate-900 rounded border border-slate-800">Key Storage Vault</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
