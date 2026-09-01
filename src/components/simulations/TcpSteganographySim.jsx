import React, { useState } from 'react';
import { Wifi, Lock, Unlock, Eye, ArrowRight, CheckCircle2, Globe } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function TcpSteganographySim() {
  const [secretText, setSecretText] = useState('ATTACK AT 5');
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [packets, setPackets] = useState([]);

  const handleSendPackets = () => {
    sounds.playPop();
    setIsTransmitting(true);
    setPackets([]);

    const chars = secretText.split('');
    chars.forEach((ch, idx) => {
      setTimeout(() => {
        sounds.playPop();
        setPackets(prev => [...prev, { id: idx + 1, char: ch, seqNum: 1000 + idx * 4, flag: idx % 2 === 0 ? 'SYN' : 'ACK' }]);
        if (idx === chars.length - 1) {
          sounds.playSuccess();
          setIsTransmitting(false);
        }
      }, (idx + 1) * 400);
    });
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Network Steganography • TCP</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            TCP Packet Network Steganography! 🕵️‍♂️📦
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            Network steganography hides secret messages inside normal <strong>TCP (Transmission Control Protocol)</strong> packet headers so network routers see only ordinary web traffic!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Writing a secret message in invisible ink inside a routine postcard.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Wifi class="w-5 h-5 text-indigo-600" />
            <span>Embed Secret in TCP Packets</span>
          </h4>

          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Secret Message to Obfuscate:
            </label>
            <input
              type="text"
              value={secretText}
              onChange={(e) => setSecretText(e.target.value.toUpperCase())}
              disabled={isTransmitting}
              maxLength={12}
              class="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-extrabold text-sm text-slate-800 tracking-wider uppercase"
              placeholder="SECRET MSG"
            />
            <span class="text-[10px] text-slate-400 font-bold">Max 12 characters</span>
          </div>

          <button
            onClick={handleSendPackets}
            disabled={isTransmitting || !secretText.trim()}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              isTransmitting
                ? 'bg-indigo-400 text-white animate-pulse cursor-wait'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {isTransmitting ? (
              <span>Streaming Steganographic TCP Packets...</span>
            ) : (
              <>
                <ArrowRight class="w-5 h-5" />
                <span>Embed Secret Message in TCP Headers</span>
              </>
            )}
          </button>
        </div>

        {/* Visual TCP Packet Inspector (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Wi-Fi Router TCP Packet Stream</span>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-500 text-white">
              TCP PROTOCOL STREAM
            </span>
          </div>

          {/* Packets Display */}
          <div class="my-4 space-y-2 max-h-[220px] overflow-y-auto pr-1 scrollbar-none">
            {packets.length === 0 ? (
              <div class="p-8 text-center text-slate-500 text-xs font-bold">
                Click "Embed Secret Message" to stream TCP steganography packets!
              </div>
            ) : (
              packets.map(p => (
                <div key={p.id} class="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono animate-fadeIn">
                  <div class="flex items-center gap-2">
                    <span class="px-2 py-0.5 bg-indigo-900 text-indigo-200 rounded text-[10px] font-extrabold">
                      TCP [{p.flag}] SEQ:{p.seqNum}
                    </span>
                    <span class="text-slate-400">Router sees standard TCP packet</span>
                  </div>
                  <span class="text-emerald-400 font-extrabold">
                    Hidden Data: '{p.char}'
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Decoded Secret Result */}
          {packets.length > 0 && (
            <div class="p-3 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-center text-xs font-bold text-emerald-200">
              🕵️‍♂️ Steganography Receiver Decoded: "<span class="font-extrabold text-white font-mono">{packets.map(p => p.char).join('')}</span>"
            </div>
          )}

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">TCP = Transmission Control Protocol</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Steganography = Hiding Data in Plain Sight</span>
          </div>

        </div>

      </div>

    </div>
  );
}
