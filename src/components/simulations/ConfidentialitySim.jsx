import React, { useState } from 'react';
import { Lock, Unlock, Key, Eye, EyeOff, ShieldAlert, ShieldCheck, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function ConfidentialitySim() {
  const [person, setPerson] = useState('alice'); // 'alice' (authorized) or 'snoopy' (intruder)
  const [isOpen, setIsOpen] = useState(false);
  const [secretMessage, setSecretMessage] = useState('My secret surprise party for Mom is on Saturday! 🎈🎂');

  const handleTogglePerson = (newPerson) => {
    sounds.playPop();
    setPerson(newPerson);
    setIsOpen(false); // reset lock on switch
  };

  const handleTryOpen = () => {
    if (person === 'alice') {
      sounds.playSuccess();
      setIsOpen(true);
    } else {
      sounds.playBuzzer();
      setIsOpen(false);
    }
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-sky-50 border-2 border-sky-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-200/80 text-sky-900 font-extrabold text-xs rounded-full">
            <span>The "C" in CIA</span>
          </div>
          <h3 class="text-2xl font-extrabold text-sky-950">
            Confidentiality = Keeping Secrets Secret! 🔒
          </h3>
          <p class="text-sky-900/80 font-medium text-sm">
            Only people with the right key (authorized users) get to see the private info. Everyone else gets blocked!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-sky-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: A locked personal diary or bank safe box.
        </div>
      </div>

      {/* Interactive Toy Area */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-6">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <span>Step 1: Choose Who Is Trying to Read</span>
          </h4>

          {/* User selector */}
          <div class="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleTogglePerson('alice')}
              class={`p-4 rounded-2xl border-4 text-left transition-all flex flex-col items-center gap-2 ${
                person === 'alice'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-md scale-105'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 opacity-70'
              }`}
            >
              <div class="text-3xl">🔑</div>
              <div class="font-extrabold text-sm text-center">Alice</div>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-200 text-emerald-900">
                Has Key (Allowed)
              </span>
            </button>

            <button
              onClick={() => handleTogglePerson('snoopy')}
              class={`p-4 rounded-2xl border-4 text-left transition-all flex flex-col items-center gap-2 ${
                person === 'snoopy'
                  ? 'border-rose-500 bg-rose-50 text-rose-950 shadow-md scale-105'
                  : 'border-slate-200 hover:border-slate-300 text-slate-600 opacity-70'
              }`}
            >
              <div class="text-3xl">🕵️‍♂️</div>
              <div class="font-extrabold text-sm text-center">Snoopy Intruder</div>
              <span class="text-[10px] px-2 py-0.5 rounded-full font-bold bg-rose-200 text-rose-900">
                No Key (Stranger)
              </span>
            </button>
          </div>

          {/* Edit Secret Message */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Secret Message inside Vault:
            </label>
            <input
              type="text"
              value={secretMessage}
              onChange={(e) => setSecretMessage(e.target.value)}
              class="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-sky-500 focus:outline-none font-medium text-sm text-slate-800"
              placeholder="Type a secret message..."
            />
          </div>

          {/* Action Button */}
          <button
            onClick={handleTryOpen}
            class={`w-full py-4 rounded-2xl font-extrabold text-base shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 ${
              person === 'alice'
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-200'
            }`}
          >
            {person === 'alice' ? <Unlock class="w-5 h-5" /> : <Lock class="w-5 h-5" />}
            <span>Try Opening Secret Box as {person === 'alice' ? 'Alice' : 'Snoopy'}</span>
          </button>
        </div>

        {/* Visual Box Simulation (Right) */}
        <div class="md:col-span-7 bg-gradient-to-b from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white flex flex-col items-center justify-center min-h-[320px] shadow-lg relative overflow-hidden">
          
          {/* Status Badge */}
          <div class="absolute top-4 left-4">
            {isOpen ? (
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full font-bold text-xs">
                <ShieldCheck class="w-4 h-4 text-emerald-400" /> Authorized Access Granted!
              </span>
            ) : person === 'snoopy' ? (
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/20 text-rose-300 border border-rose-500/40 rounded-full font-bold text-xs animate-bounce">
                <ShieldAlert class="w-4 h-4 text-rose-400" /> ACCESS DENIED! Confidentiality Active!
              </span>
            ) : (
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-full font-bold text-xs">
                <Lock class="w-4 h-4 text-amber-400" /> Vault Locked
              </span>
            )}
          </div>

          {/* Interactive Vault Display */}
          <div class="my-8 text-center space-y-4 max-w-md w-full">
            {isOpen ? (
              <div class="space-y-4 animate-fadeIn">
                <div class="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-4 border-emerald-400 flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30">
                  🔓
                </div>
                <div class="bg-emerald-950/80 border-2 border-emerald-400/50 rounded-2xl p-5 space-y-2">
                  <span class="text-xs font-extrabold text-emerald-400 uppercase tracking-widest">Decrypted Secret Text</span>
                  <p class="text-lg font-bold text-white leading-relaxed">
                    "{secretMessage}"
                  </p>
                </div>
                <p class="text-xs text-emerald-300 font-semibold">
                  ✅ Alice presented a valid digital key. Confidentiality is preserved!
                </p>
              </div>
            ) : (
              <div class="space-y-4">
                <div class={`w-20 h-20 mx-auto rounded-full flex items-center justify-center text-4xl shadow-lg ${
                  person === 'snoopy' ? 'bg-rose-500/20 border-4 border-rose-500 animate-pulse' : 'bg-slate-700 border-4 border-slate-600'
                }`}>
                  🔒
                </div>
                <div class="bg-slate-800/90 border-2 border-slate-700 rounded-2xl p-5 space-y-2">
                  <span class="text-xs font-extrabold text-slate-400 uppercase tracking-widest">Encrypted / Protected Data</span>
                  <p class="text-lg font-mono text-slate-400 tracking-widest select-none">
                    •••• •••• •••• ••••
                  </p>
                </div>
                {person === 'snoopy' && (
                  <div class="p-3 bg-rose-950/60 border border-rose-500/30 rounded-xl text-rose-200 text-xs font-semibold">
                    🚫 Snoopy has no key! Snoopy only sees unreadable gibberish. That is Confidentiality in action!
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Plain English Key Takeaway */}
      <div class="bg-amber-100/70 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <div class="text-2xl">💡</div>
        <div class="space-y-1">
          <h5 class="font-extrabold text-amber-950 text-sm sm:text-base">Remember it in 1 sentence:</h5>
          <p class="text-amber-900 text-sm font-medium">
            <strong>Confidentiality = Secrecy!</strong> It prevents unauthorized people (passersby, hackers, nosey neighbors) from reading private information like your passwords, bank account numbers, or medical records.
          </p>
        </div>
      </div>

    </div>
  );
}
