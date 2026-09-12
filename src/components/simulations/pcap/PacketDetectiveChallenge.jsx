import React, { useState } from 'react';
import { FORENSIC_CASES, MOCK_WIRESHARK_PACKETS } from './pcapData';
import { sounds } from '../../../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Trophy, 
  AlertTriangle, 
  Wrench, 
  KeyRound, 
  Lightbulb 
} from 'lucide-react';

export default function PacketDetectiveChallenge() {
  const [currentCaseIdx, setCurrentCaseIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  const activeCase = FORENSIC_CASES[currentCaseIdx];
  const suspectPacket = MOCK_WIRESHARK_PACKETS.find(p => p.no === activeCase.suspectPacketNo);

  const handleSelectOption = (option, idx) => {
    if (isAnswered) return;

    setSelectedOption(idx);
    setIsAnswered(true);

    if (option.isCorrect) {
      sounds.playSuccess();
      setScore(prev => prev + 1);

      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sounds.playPop();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentCaseIdx < FORENSIC_CASES.length - 1) {
      setCurrentCaseIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowHint(false);
    } else {
      setShowSummary(true);
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentCaseIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowHint(false);
    setScore(0);
    setShowSummary(false);
  };

  return (
    <div class="space-y-8">
      
      {/* Header Bar */}
      <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-indigo-100 border-2 border-indigo-300 flex items-center justify-center text-2xl font-black">
            🕵️‍♂️
          </div>
          <div>
            <h2 class="text-2xl font-black text-slate-900">
              Packet Detective: CompTIA Forensics Challenge
            </h2>
            <p class="text-xs sm:text-sm text-slate-600 font-medium">
              Put on your cyber investigator hat! Inspect real packet captures to spot password leaks, ARP poisoning, and DNS tunneling!
            </p>
          </div>
        </div>

        <div class="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-2xl font-black text-xs text-slate-700">
          <Trophy class="w-4 h-4 text-amber-500" />
          <span>Solved: {score} / {FORENSIC_CASES.length} Cases</span>
        </div>
      </div>

      {/* QUIZ INTERFACE OR FINAL MISSION REPORT */}
      {!showSummary ? (
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-3 border-indigo-200 shadow-xl space-y-6">
          
          {/* Progress Tracker */}
          <div class="flex items-center justify-between text-xs font-extrabold text-slate-500 border-b border-slate-100 pb-3">
            <span>Case File #{currentCaseIdx + 1} of {FORENSIC_CASES.length}</span>
            <div class="flex gap-1.5">
              {FORENSIC_CASES.map((_, i) => (
                <div 
                  key={i} 
                  class={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === currentCaseIdx 
                      ? 'bg-indigo-600 scale-125' 
                      : i < currentCaseIdx 
                        ? 'bg-emerald-500' 
                        : 'bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Incident Brief Card */}
          <div class="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl p-6 border-2 border-indigo-200 space-y-3">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <span class="px-3 py-1 bg-indigo-200 text-indigo-950 font-black text-xs rounded-full">
                {activeCase.badge}
              </span>
              <span class="text-xs font-bold text-slate-500">Difficulty: {activeCase.difficulty}</span>
            </div>

            <h3 class="text-xl font-black text-slate-900">{activeCase.title}</h3>
            <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {activeCase.scenario}
            </p>
          </div>

          {/* Captured Packet Evidence Box */}
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase text-slate-500 tracking-wider">
                Forensic Exhibit: Packet #{suspectPacket?.no} ({suspectPacket?.protocol})
              </span>
              
              <button
                onClick={() => { sounds.playPop(); setShowHint(!showHint); }}
                class="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
              >
                <Lightbulb class="w-3.5 h-3.5" />
                <span>{showHint ? 'Hide Clue' : 'Need a Clue? 💡'}</span>
              </button>
            </div>

            {/* Hint Callout */}
            {showHint && (
              <div class="bg-amber-50 border border-amber-300 rounded-2xl p-3 text-xs font-semibold text-amber-900 animate-scaleUp">
                💡 Detective Clue: {activeCase.hint}
              </div>
            )}

            {/* Packet Table Snippet */}
            <div class="overflow-x-auto border-2 border-slate-200 rounded-2xl">
              <table class="w-full text-left text-xs font-mono">
                <thead class="bg-slate-100 text-slate-700 uppercase font-black text-[10px] border-b border-slate-200">
                  <tr>
                    <th class="p-2.5">No.</th>
                    <th class="p-2.5">Protocol</th>
                    <th class="p-2.5">Source</th>
                    <th class="p-2.5">Destination</th>
                    <th class="p-2.5">Info</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-rose-50 text-rose-950 font-bold">
                    <td class="p-2.5">{suspectPacket?.no}</td>
                    <td class="p-2.5">{suspectPacket?.protocol}</td>
                    <td class="p-2.5">{suspectPacket?.source}</td>
                    <td class="p-2.5">{suspectPacket?.destination}</td>
                    <td class="p-2.5 break-all">{suspectPacket?.info}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Deep Packet Inspection payload snippet */}
            {suspectPacket?.details?.app && (
              <div class="bg-slate-900 text-emerald-300 p-3 rounded-xl font-mono text-xs overflow-x-auto">
                <span class="text-slate-500 block text-[10px] uppercase font-bold mb-1">Payload Content Inspection:</span>
                <pre class="whitespace-pre-wrap">{suspectPacket.details.app}</pre>
              </div>
            )}
          </div>

          {/* Forensic Question & Options */}
          <div class="space-y-3 pt-2">
            <div class="font-black text-slate-900 text-sm sm:text-base flex items-center gap-2">
              <HelpCircle class="w-5 h-5 text-indigo-600" />
              <span>{activeCase.question}</span>
            </div>

            <div class="space-y-3">
              {activeCase.options.map((opt, idx) => {
                const isChosen = selectedOption === idx;
                let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

                if (isAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-black shadow-md';
                  } else if (isChosen) {
                    btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-black';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt, idx)}
                    disabled={isAnswered}
                    class={`w-full p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.99] flex items-start justify-between gap-3 ${btnStyle}`}
                  >
                    <span class="text-xs sm:text-sm font-bold leading-relaxed">{opt.text}</span>
                    {isAnswered && (
                      opt.isCorrect ? (
                        <CheckCircle2 class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      ) : isChosen ? (
                        <XCircle class="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      ) : null
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Post-Answer Feedback & Remediation */}
          {isAnswered && (
            <div class="pt-4 border-t border-slate-200 space-y-4 animate-fadeIn">
              
              <div class="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm text-indigo-950 font-medium flex items-start gap-3">
                <Wrench class="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span class="font-black text-indigo-900 block mb-1">CompTIA Security+ Remediation Action:</span>
                  <span>{activeCase.compTiaFix}</span>
                </div>
              </div>

              <div class="flex justify-end">
                <button
                  onClick={handleNext}
                  class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all active:scale-95"
                >
                  <span>{currentCaseIdx + 1 < FORENSIC_CASES.length ? 'Next Forensic Case ➡️' : 'View Incident Report 🏆'}</span>
                  <ArrowRight class="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      ) : (
        /* MISSION REPORT */
        <div class="bg-white rounded-3xl p-8 border-4 border-indigo-300 shadow-xl text-center space-y-6 max-w-xl mx-auto animate-scaleUp">
          <div class="w-20 h-20 rounded-full bg-indigo-100 border-4 border-indigo-400 mx-auto flex items-center justify-center text-4xl shadow-md">
            {score === FORENSIC_CASES.length ? '🎖️' : '🔍'}
          </div>

          <div class="space-y-2">
            <h3 class="text-3xl font-black text-slate-900">
              {score === FORENSIC_CASES.length ? 'Lead Cyber Forensic Analyst! 🌟' : 'Investigation Complete! 🛡️'}
            </h3>
            <p class="text-slate-600 text-sm font-medium">
              You resolved <strong class="text-indigo-600 font-black">{score}</strong> out of <strong class="text-slate-900 font-black">{FORENSIC_CASES.length}</strong> network security incident cases!
            </p>
          </div>

          <div class="bg-slate-50 rounded-2xl p-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed text-left space-y-2">
            <div class="font-black text-slate-900">Key Takeaways for CompTIA Security+:</div>
            <ul class="list-disc list-inside space-y-1 text-xs">
              <li><strong>Cleartext Sniffing:</strong> HTTP Port 80, Telnet 23, and FTP 21 leak passwords in plain text. Always enforce TLS (HTTPS 443 / SSH 22).</li>
              <li><strong>ARP Poisoning:</strong> Prevent MITM attacks on switches by turning on <strong>Dynamic ARP Inspection (DAI)</strong> with DHCP snooping.</li>
              <li><strong>DNS Tunneling:</strong> Attackers hide stolen data inside DNS queries (Port 53). Detect with Next-Gen Firewall Deep Packet Inspection.</li>
            </ul>
          </div>

          <div class="pt-4 flex justify-center">
            <button
              onClick={handleRestart}
              class="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:brightness-110 text-white font-black text-sm rounded-2xl shadow-md flex items-center gap-2 transition-all active:scale-95"
            >
              <RotateCcw class="w-4 h-4" />
              <span>Retry Forensic Cases</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
