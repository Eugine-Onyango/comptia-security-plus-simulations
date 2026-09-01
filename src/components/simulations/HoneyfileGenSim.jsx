import React, { useState } from 'react';
import { FileText, Key, AlertCircle, CheckCircle2, ShieldCheck } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function HoneyfileGenSim() {
  const [selectedFile, setSelectedFile] = useState('passwords');
  const [alertFired, setAlertFired] = useState(false);

  const files = [
    { id: 'passwords', name: 'Executive_Passwords.txt', apiKey: 'API_KEY_EXEC_FAKESECRET_101', type: 'Honeyfile Text' },
    { id: 'cards', name: 'Customer_Credit_Cards.csv', apiKey: 'API_TOKEN_PAYMENT_DUMMY_202', type: 'Honeyfile CSV' },
    { id: 'config', name: 'Database_Credentials.env', apiKey: 'API_SECRET_DB_HONEY_303', type: 'Honeyfile Config' }
  ];

  const currentFile = files.find(f => f.id === selectedFile);

  const handleTestAccess = () => {
    sounds.playBuzzer();
    setAlertFired(true);
  };

  const handleSelectFile = (id) => {
    sounds.playPop();
    setSelectedFile(id);
    setAlertFired(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Decoy Artifacts • Honeyfiles & API Tokens</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            Honeyfile & Decoy API Generator 📄🗝️
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            Honeyfiles are enticing fake files embedded with tracking code or decoy <strong>API</strong> credentials. The moment an attacker opens or copies them, an instant alert is sent!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Leaving an envelope labeled "Secret Cash" filled with blue dye powder.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* File Selection (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <FileText class="w-5 h-5 text-purple-600" />
            <span>Select Decoy Honeyfile</span>
          </h4>

          <div class="space-y-2">
            {files.map(f => (
              <button
                key={f.id}
                onClick={() => handleSelectFile(f.id)}
                class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                  selectedFile === f.id
                    ? 'border-purple-500 bg-purple-50 text-purple-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div>
                  <div class="font-extrabold text-sm">{f.name}</div>
                  <div class="text-[10px] text-slate-500 font-mono mt-0.5">{f.apiKey}</div>
                </div>
                <span class="px-2 py-1 bg-purple-100 text-purple-900 rounded text-[10px] font-extrabold">
                  {f.type}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={handleTestAccess}
            class="w-full py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Key class="w-4 h-4" />
            <span>Simulate Attacker Opening {currentFile.name}</span>
          </button>
        </div>

        {/* Live Tripwire Monitor (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">Decoy Honeyfile Monitor</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              alertFired ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {alertFired ? 'HONEYFILE ACCESSED' : 'HONEYFILE ARMED'}
            </span>
          </div>

          {/* Display Box */}
          <div class="my-4 space-y-4">
            
            <div class={`p-5 rounded-2xl border-4 text-center transition-all ${
              alertFired 
                ? 'bg-rose-950/90 border-rose-500 text-rose-200 shadow-lg shadow-rose-950/50' 
                : 'bg-slate-950 border-slate-800 text-slate-400'
            }`}>
              <div class="w-16 h-16 mx-auto rounded-2xl bg-purple-500 text-white flex items-center justify-center text-3xl mb-3 shadow-md">
                📄
              </div>

              <div class="space-y-1">
                <div class="text-base font-black text-white">{currentFile.name}</div>
                <div class="text-xs font-mono text-purple-300">Decoy API Token: {currentFile.apiKey}</div>
              </div>
            </div>

            {/* Explanation Banner */}
            <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              alertFired 
                ? 'bg-rose-950/80 border-rose-500/50 text-rose-200' 
                : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
            }`}>
              {alertFired ? (
                <span>🚨 <strong>Tripwire Alert Triggered!</strong> Attacker opened <strong>{currentFile.name}</strong> and attempted to call the fake <strong>API</strong> key. Security Operations Center (SOC) alerted!</span>
              ) : (
                <span>✅ <strong>Honeyfile Armed:</strong> Ready to detect any unauthorized access or file copying.</span>
              )}
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">API = Application Programming Interface</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Honeyfile = Trap File</span>
          </div>

        </div>

      </div>

    </div>
  );
}
