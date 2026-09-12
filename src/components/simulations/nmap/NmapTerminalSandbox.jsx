import React, { useState, useEffect, useRef } from 'react';
import { OUTPUT_DISSECTIONS, getDissectionForLine, buildTerminalScanOutput } from './nmapData';
import { sounds } from '../../../utils/audio';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Sparkles, 
  X, 
  Sliders
} from 'lucide-react';

export default function NmapTerminalSandbox() {
  const [includeStealth, setIncludeStealth] = useState(true); // -sS
  const [includeVersion, setIncludeVersion] = useState(true); // -sV
  const [includeOs, setIncludeOs] = useState(true); // -O
  const [includeNoPing, setIncludeNoPing] = useState(true); // -Pn
  const [timing, setTiming] = useState('-T4'); // -T1, -T4
  const [ports, setPorts] = useState('21,22,80,3389');
  
  const [isRunning, setIsRunning] = useState(false);
  const [displayedOutput, setDisplayedOutput] = useState([]);
  const [selectedDissection, setSelectedDissection] = useState(null);

  const intervalRef = useRef(null);

  // Clean up interval timer on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  // Reconstruct active command string
  const buildCommand = () => {
    let cmd = 'nmap';
    if (includeStealth) cmd += ' -sS';
    if (includeVersion) cmd += ' -sV';
    if (includeOs) cmd += ' -O';
    if (includeNoPing) cmd += ' -Pn';
    if (ports) cmd += ` -p ${ports}`;
    if (timing) cmd += ` ${timing}`;
    cmd += ' 192.168.1.50';
    return cmd;
  };

  const handleRunScan = () => {
    if (isRunning) return;

    try {
      sounds.playPop();
    } catch (e) {
      console.log('Audio error:', e);
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    setIsRunning(true);
    setDisplayedOutput([]);
    setSelectedDissection(null);

    // Generate output reflecting the current user-selected switches
    const fullOutput = buildTerminalScanOutput({
      includeStealth,
      includeVersion,
      includeOs,
      includeNoPing,
      ports
    });

    let currentIdx = 0;

    intervalRef.current = setInterval(() => {
      if (currentIdx < fullOutput.length) {
        const lineToAdd = fullOutput[currentIdx];
        setDisplayedOutput((prev) => [...prev, lineToAdd]);
        currentIdx++;
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
        setIsRunning(false);
        try {
          sounds.playSuccess();
        } catch (e) {
          console.log('Audio error:', e);
        }
      }
    }, 110);
  };

  const handleClear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    try {
      sounds.playPop();
    } catch (e) {
      console.log('Audio error:', e);
    }
    setDisplayedOutput([]);
    setSelectedDissection(null);
  };

  const handleLineClick = (dissection) => {
    if (dissection) {
      try {
        sounds.playPop();
      } catch (e) {
        console.log('Audio error:', e);
      }
      setSelectedDissection(dissection);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>Command Builder & Output Dissector</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            The Nmap Terminal Sandbox 💻⚡
          </h2>

          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Construct real Nmap scanning commands with interactive switches, execute the scan, and click on any highlighted output line to reveal an <strong>"Explain Like I'm 5"</strong> breakdown of the results!
          </p>
        </div>
      </div>

      {/* Switchboard: Command Builder */}
      <div className="bg-white rounded-3xl p-6 border-3 border-slate-300 shadow-lg space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-600" />
            <h3 className="font-black text-slate-900 text-base">
              Step 1: Choose Your Nmap Scan Switches
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-semibold hidden sm:inline">
            Toggle flags on/off to see how the command and output update
          </span>
        </div>

        {/* Switches Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* -sS */}
          <button
            onClick={() => { sounds.playPop(); setIncludeStealth(!includeStealth); }}
            className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-1.5 cursor-pointer ${
              includeStealth 
                ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-black shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-sm font-black">-sS</span>
              <span className="text-[10px] uppercase font-bold">{includeStealth ? 'ON' : 'OFF'}</span>
            </div>
            <div className="text-[11px] font-medium leading-tight">SYN Stealth Scan</div>
          </button>

          {/* -sV */}
          <button
            onClick={() => { sounds.playPop(); setIncludeVersion(!includeVersion); }}
            className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-1.5 cursor-pointer ${
              includeVersion 
                ? 'bg-indigo-50 border-indigo-400 text-indigo-950 font-black shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-sm font-black">-sV</span>
              <span className="text-[10px] uppercase font-bold">{includeVersion ? 'ON' : 'OFF'}</span>
            </div>
            <div className="text-[11px] font-medium leading-tight">Version Detection</div>
          </button>

          {/* -O */}
          <button
            onClick={() => { sounds.playPop(); setIncludeOs(!includeOs); }}
            className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-1.5 cursor-pointer ${
              includeOs 
                ? 'bg-purple-50 border-purple-400 text-purple-950 font-black shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-sm font-black">-O</span>
              <span className="text-[10px] uppercase font-bold">{includeOs ? 'ON' : 'OFF'}</span>
            </div>
            <div className="text-[11px] font-medium leading-tight">OS Fingerprinting</div>
          </button>

          {/* -Pn */}
          <button
            onClick={() => { sounds.playPop(); setIncludeNoPing(!includeNoPing); }}
            className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between space-y-1.5 cursor-pointer ${
              includeNoPing 
                ? 'bg-amber-50 border-amber-400 text-amber-950 font-black shadow-sm' 
                : 'bg-slate-50 border-slate-200 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-sm font-black">-Pn</span>
              <span className="text-[10px] uppercase font-bold">{includeNoPing ? 'ON' : 'OFF'}</span>
            </div>
            <div className="text-[11px] font-medium leading-tight">Disable Ping (Bypass FW)</div>
          </button>

        </div>

        {/* Live Command Line Display & Run Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
          <div className="flex-1 bg-slate-900 text-emerald-400 font-mono text-xs sm:text-sm p-3.5 rounded-2xl border-2 border-slate-700 flex items-center gap-2 overflow-x-auto">
            <span className="text-indigo-400 font-black select-none">$</span>
            <span className="font-bold">{buildCommand()}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunScan}
              disabled={isRunning}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:brightness-110 text-white font-black text-xs sm:text-sm rounded-2xl shadow-md transition-all active:scale-95 disabled:opacity-50 flex items-center gap-2 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isRunning ? 'Scanning Target...' : 'Execute Scan ⚡'}</span>
            </button>

            <button
              onClick={handleClear}
              className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all active:scale-95 cursor-pointer"
              title="Clear Terminal"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* TERMINAL SCREEN */}
      <div className="bg-slate-950 rounded-3xl p-6 border-4 border-slate-800 shadow-2xl space-y-3 font-mono text-xs text-slate-200 min-h-[320px] flex flex-col justify-between">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-slate-400 text-[11px] ml-2 font-sans font-bold">bash - kali@security-plus:~</span>
          </div>
          <span className="text-[10px] text-slate-500 uppercase font-bold">Click any highlighted line to dissect</span>
        </div>

        {/* Terminal Text Body */}
        <div className="space-y-1 flex-1 py-2 overflow-x-auto">
          {displayedOutput && displayedOutput.length > 0 ? (
            displayedOutput.map((line, idx) => {
              const dissection = getDissectionForLine(line);
              const hasDissection = Boolean(dissection);

              return (
                <div
                  key={idx}
                  onClick={() => hasDissection && handleLineClick(dissection)}
                  className={`p-1 rounded transition-colors ${
                    hasDissection
                      ? 'cursor-pointer hover:bg-indigo-900/60 text-emerald-300 font-bold underline decoration-dotted decoration-indigo-400'
                      : 'text-slate-300'
                  }`}
                >
                  {line ? line : <br />}
                </div>
              );
            })
          ) : (
            <div className="text-slate-600 italic py-12 text-center font-sans">
              Terminal ready. Click "Execute Scan ⚡" above to initiate Nmap reconnaissance!
            </div>
          )}
        </div>

        {/* Terminal Footer */}
        <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 flex items-center justify-between">
          <span>Target: 192.168.1.50</span>
          <span>Ports: {ports}</span>
        </div>

      </div>

      {/* ELI5 LINE DISSECTION CARD (POPUP / DRAWER) */}
      {selectedDissection && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-400 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              <h3 className="font-black text-xl text-slate-900">{selectedDissection.title}</h3>
            </div>
            <button
              onClick={() => setSelectedDissection(null)}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">
              Explain Like I'm 5 (What this means):
            </span>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {selectedDissection.explanation}
            </p>
          </div>

          <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm text-indigo-950 font-medium space-y-1">
            <span className="font-black text-indigo-900 block">CompTIA Security+ Exam Cheat Code:</span>
            <p>{selectedDissection.compTiaLesson}</p>
          </div>
        </div>
      )}

    </div>
  );
}
