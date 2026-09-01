import React, { useState, useEffect } from 'react';
import { Clock, Wrench, CheckCircle2, AlertCircle, RefreshCw, Cpu, Zap, Wind } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function MttrRepairSim() {
  const [selectedIssue, setSelectedIssue] = useState('fan'); // 'fan', 'power', 'cpu'
  const [repairState, setRepairState] = useState('broken'); // 'broken', 'repairing', 'repaired'
  const [mttrSeconds, setMttrSeconds] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    let timer;
    if (repairState === 'repairing') {
      timer = setInterval(() => {
        setMttrSeconds(prev => prev + 1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [repairState]);

  const handleStartRepair = () => {
    sounds.playPop();
    setMttrSeconds(0);
    setRepairState('repairing');

    // Simulate repair work completion in 1.8 seconds (representing 12 minutes MTTR)
    setTimeout(() => {
      sounds.playSuccess();
      setRepairState('repaired');
      const finalMttr = (Math.random() * 5 + 10).toFixed(1); // 10-15 mins
      setHistory(prev => [
        { issue: selectedIssue, mttr: finalMttr, id: Date.now() },
        ...prev
      ]);
    }, 1800);
  };

  const handleResetIssue = () => {
    sounds.playPop();
    setRepairState('broken');
    setMttrSeconds(0);
  };

  const issueDetails = {
    fan: { name: 'Blown HVAC Server Exhaust Fan', icon: Wind, fixTime: '~12 min' },
    power: { name: 'Faulty UPS Battery Terminal Cable', icon: Zap, fixTime: '~8 min' },
    cpu: { name: 'Overheated CPU Heat-Sink Thermal Paste', icon: Cpu, fixTime: '~15 min' }
  };

  const currentIssue = issueDetails[selectedIssue];
  const IssueIcon = currentIssue.icon;

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>Maintenance Metrics • MTTR Stopwatch</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            MTTR (Mean Time to Repair) Stopwatch! ⏱️🔧
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>MTTR (Mean Time to Repair)</strong> measures how quickly your technical team can diagnose, repair, and restore a failed server component back to normal operation!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Formula 1 pit-stop tire change crew replacing a flat tire in seconds.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Wrench class="w-5 h-5 text-indigo-600" />
            <span>Select Broken Server Component</span>
          </h4>

          <div class="space-y-2">
            {Object.keys(issueDetails).map((key) => {
              const item = issueDetails[key];
              const ItemIcon = item.icon;
              const isSelected = selectedIssue === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    if (repairState !== 'repairing') {
                      sounds.playPop();
                      setSelectedIssue(key);
                      setRepairState('broken');
                    }
                  }}
                  disabled={repairState === 'repairing'}
                  class={`w-full p-3.5 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm'
                      : 'border-slate-200 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div class="flex items-center gap-2">
                    <ItemIcon class="w-4 h-4 text-indigo-600" />
                    <span>{item.name}</span>
                  </div>
                  <span class="text-[10px] text-slate-400">{item.fixTime}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleStartRepair}
            disabled={repairState !== 'broken'}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              repairState === 'repaired'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : repairState === 'repairing'
                  ? 'bg-indigo-400 text-white animate-pulse cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {repairState === 'broken' && (
              <>
                <Wrench class="w-5 h-5" />
                <span>Dispatch Tech Crew (Start MTTR Clock)</span>
              </>
            )}
            {repairState === 'repairing' && <span>🔧 Technician Repair In Progress...</span>}
            {repairState === 'repaired' && <span>✅ Component Repaired & Online!</span>}
          </button>

          {repairState === 'repaired' && (
            <button
              onClick={handleResetIssue}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Break Another Component
            </button>
          )}
        </div>

        {/* Visual MTTR Clock Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock class="w-4 h-4 text-indigo-400" /> MTTR Active Repair Clock
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              repairState === 'repaired' ? 'bg-emerald-500 text-slate-950' : repairState === 'repairing' ? 'bg-indigo-500 text-white animate-pulse' : 'bg-rose-500 text-white'
            }`}>
              {repairState === 'repaired' ? 'SYSTEM ONLINE' : repairState === 'repairing' ? 'REPAIR IN PROGRESS' : 'HARDWARE FAULT DETECTED'}
            </span>
          </div>

          {/* Clock Box */}
          <div class="my-4 text-center space-y-2">
            <div class="text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              {currentIssue.name}
            </div>
            
            <div class="text-5xl sm:text-6xl font-black font-mono text-indigo-300 tracking-wider">
              00:{mttrSeconds < 10 ? `0${mttrSeconds}` : mttrSeconds}
            </div>

            <div class="text-xs text-slate-400 font-medium">
              {repairState === 'broken' && '⏳ Waiting for technician dispatch to start timer.'}
              {repairState === 'repairing' && '⚡ Hot-swapping replacement module...'}
              {repairState === 'repaired' && '🎉 Component swapped! MTTR timer stopped.'}
            </div>
          </div>

          {/* MTTR History List */}
          {history.length > 0 && (
            <div class="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-1.5 text-xs">
              <div class="font-bold text-indigo-300 text-[11px] uppercase tracking-wider">Recent Repair Logs:</div>
              <div class="flex flex-wrap gap-2">
                {history.slice(0, 3).map(h => (
                  <span key={h.id} class="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg font-mono text-[10px] text-slate-300">
                    MTTR: <strong class="text-emerald-400">{h.mttr} min</strong> ({h.issue.toUpperCase()})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">MTTR = Mean Time to Repair</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Lower MTTR = Better Uptime</span>
          </div>

        </div>

      </div>

    </div>
  );
}
