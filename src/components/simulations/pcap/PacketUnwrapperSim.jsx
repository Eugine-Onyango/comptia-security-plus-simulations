import React, { useState } from 'react';
import { PACKET_LAYERS } from './pcapData';
import { sounds } from '../../../utils/audio';
import { 
  Package, 
  Layers, 
  RotateCcw, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Eye, 
  HelpCircle,
  Truck,
  Globe,
  DoorOpen,
  FileText
} from 'lucide-react';

export default function PacketUnwrapperSim() {
  const [currentLayerIdx, setCurrentLayerIdx] = useState(0); // 0: L2, 1: L3, 2: L4, 3: L7
  const [payloadEncryption, setPayloadEncryption] = useState('cleartext'); // 'cleartext' or 'encrypted'

  const activeLayer = PACKET_LAYERS[currentLayerIdx];

  const handleNext = () => {
    sounds.playPop();
    if (currentLayerIdx < PACKET_LAYERS.length - 1) {
      setCurrentLayerIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    sounds.playPop();
    if (currentLayerIdx > 0) {
      setCurrentLayerIdx(prev => prev - 1);
    }
  };

  const handleReset = () => {
    sounds.playPop();
    setCurrentLayerIdx(0);
  };

  const toggleEncryption = (mode) => {
    sounds.playPop();
    setPayloadEncryption(mode);
  };

  return (
    <div class="space-y-8">
      
      {/* Top Banner */}
      <div class="bg-gradient-to-r from-sky-600 via-indigo-600 to-purple-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div class="relative z-10 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md">
            <Package class="w-4 h-4 text-sky-300" />
            <span>The Russian Nesting Doll Metaphor</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
            The X-Ray Packet Unwrapper 📦🔍
          </h2>

          <p class="text-sky-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Every single message sent across the internet is packed inside <strong>boxes within boxes</strong>! 
            Peel open the layers from the outer delivery van (Ethernet MAC) all the way down to the confidential letter inside (Payload).
          </p>
        </div>
      </div>

      {/* Layer Navigation Stepper */}
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PACKET_LAYERS.map((layer, idx) => (
          <button
            key={layer.layerNum}
            onClick={() => { sounds.playPop(); setCurrentLayerIdx(idx); }}
            class={`p-4 rounded-2xl border-3 text-left transition-all flex flex-col justify-between space-y-2 ${
              currentLayerIdx === idx
                ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg scale-105'
                : idx < currentLayerIdx
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
            }`}
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase opacity-75">Layer {layer.layerNum}</span>
              <span class="text-xl">{layer.icon}</span>
            </div>
            <div class="font-black text-xs sm:text-sm truncate">
              {layer.layerNum === 2 ? 'Ethernet (MAC)' : layer.layerNum === 3 ? 'IP (Address)' : layer.layerNum === 4 ? 'TCP (Port)' : 'Payload (Data)'}
            </div>
          </button>
        ))}
      </div>

      {/* ACTIVE UNWRAPPING STAGE */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-3 border-indigo-200 shadow-xl space-y-6">
        
        {/* Stage Header */}
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div class="flex items-center gap-3">
            <div class="w-14 h-14 rounded-2xl bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-3xl font-black">
              {activeLayer.icon}
            </div>
            <div>
              <span class="px-2.5 py-0.5 bg-indigo-100 text-indigo-900 rounded-full font-black text-xs">
                Layer {activeLayer.layerNum}
              </span>
              <h3 class="text-2xl font-black text-slate-900 mt-1">
                {activeLayer.boxName}
              </h3>
              <p class="text-xs text-slate-500 font-semibold">{activeLayer.layerName}</p>
            </div>
          </div>

          {/* Stepper Buttons */}
          <div class="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentLayerIdx === 0}
              class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold disabled:opacity-40 transition-all flex items-center gap-1 text-xs"
            >
              <ArrowLeft class="w-4 h-4" />
              <span class="hidden sm:inline">Pack Layer Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentLayerIdx === PACKET_LAYERS.length - 1}
              class="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black disabled:opacity-40 shadow-md transition-all flex items-center gap-1.5 text-xs"
            >
              <span>Peel Open Next Box</span>
              <ArrowRight class="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              class="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-all"
              title="Reset to Outer Box"
            >
              <RotateCcw class="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* What Is Written on This Layer Box */}
        <div class="space-y-3">
          <span class="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
            <Eye class="w-4 h-4 text-indigo-600" />
            <span>Inspection Label: What is stamped on this box?</span>
          </span>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activeLayer.headerItems.map((item, i) => (
              <div key={i} class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3.5 space-y-1">
                <div class="flex items-center justify-between">
                  <span class="font-extrabold text-xs text-slate-500 uppercase tracking-wider">{item.key}</span>
                  <span class="text-[10px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200">Stamped Header</span>
                </div>
                <div class="font-mono font-black text-sm text-indigo-950 break-all">{item.value}</div>
                <div class="text-[11px] text-slate-500 font-medium">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 7 Special: Cleartext vs Encrypted Switcher */}
        {activeLayer.layerNum === 7 && (
          <div class="bg-amber-50/80 border-2 border-amber-300 rounded-3xl p-5 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <Sparkles class="w-5 h-5 text-amber-600" />
                <h4 class="font-black text-slate-900 text-sm sm:text-base">
                  Interactive Payload: Read the Letter Inside!
                </h4>
              </div>

              {/* Toggle Buttons */}
              <div class="flex items-center gap-2">
                <button
                  onClick={() => toggleEncryption('cleartext')}
                  class={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 border-2 ${
                    payloadEncryption === 'cleartext'
                      ? 'bg-rose-500 border-rose-600 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Unlock class="w-3.5 h-3.5" />
                  <span>Unencrypted HTTP (Naked Postcard)</span>
                </button>

                <button
                  onClick={() => toggleEncryption('encrypted')}
                  class={`px-3 py-1.5 rounded-xl font-black text-xs transition-all flex items-center gap-1.5 border-2 ${
                    payloadEncryption === 'encrypted'
                      ? 'bg-emerald-600 border-emerald-700 text-white shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Lock class="w-3.5 h-3.5" />
                  <span>Encrypted HTTPS (Armored Lockbox)</span>
                </button>
              </div>
            </div>

            {/* Readout */}
            <div class={`p-4 rounded-2xl border-2 font-mono text-xs overflow-x-auto ${
              payloadEncryption === 'cleartext'
                ? 'bg-rose-950 text-rose-200 border-rose-400'
                : 'bg-emerald-950 text-emerald-200 border-emerald-400'
            }`}>
              {payloadEncryption === 'cleartext' ? (
                <div class="space-y-1">
                  <div class="text-[11px] text-rose-400 font-bold">// Eavesdropper with Wireshark sees your plaintext credentials:</div>
                  <pre class="whitespace-pre-wrap">{activeLayer.cleartextPayload}</pre>
                </div>
              ) : (
                <div class="space-y-1">
                  <div class="text-[11px] text-emerald-400 font-bold">// Eavesdropper with Wireshark only sees scrambled TLS ciphertext:</div>
                  <pre class="whitespace-pre-wrap">{activeLayer.encryptedPayload}</pre>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Plain English Story & CompTIA Exam Takeaway */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs leading-relaxed">
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
            <span class="font-black text-slate-900 block mb-1">📖 The Everyday Story:</span>
            <p class="text-slate-700 font-medium">{activeLayer.plainStory}</p>
          </div>

          <div class="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 space-y-1 text-indigo-950">
            <span class="font-black text-indigo-900 block mb-1">🎯 CompTIA Security+ Exam Cheat Code:</span>
            <p class="font-medium">{activeLayer.compTiaKey}</p>
          </div>
        </div>

      </div>

    </div>
  );
}
