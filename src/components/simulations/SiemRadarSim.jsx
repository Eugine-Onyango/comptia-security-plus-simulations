import React, { useState, useEffect } from 'react';
import { Activity, ShieldAlert, Radio, Terminal, Globe, ArrowRight, RefreshCw, Zap } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function SiemRadarSim() {
  const [logs, setLogs] = useState([
    { id: 1, type: 'SSH', text: 'Admin login successful (user: root)', status: 'normal' },
    { id: 2, type: 'QoS', text: 'Prioritized VoIP video stream over FTP download', status: 'normal' },
    { id: 3, type: 'SSL', text: 'Offloaded HTTPS web session decryption', status: 'normal' }
  ]);
  const [isAttackActive, setIsAttackActive] = useState(false);
  const [qosEnabled, setQosEnabled] = useState(true);

  // Live log generator tick
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAttackActive) {
        const types = ['URL', 'FTP', 'SSH', 'SSL'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const newLog = {
          id: Date.now(),
          type: randomType,
          text: `Routine ${randomType} session inspected from 192.168.1.${Math.floor(Math.random()*50+10)}`,
          status: 'normal'
        };
        setLogs(prev => [newLog, ...prev.slice(0, 4)]);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isAttackActive]);

  const handleSimulateAttack = () => {
    sounds.playBuzzer();
    setIsAttackActive(true);

    const attackLogs = [
      { id: Date.now()+1, type: 'RDP', text: '🚨 CRITICAL: 50 Failed RDP login attempts from 203.0.113.99!', status: 'alert' },
      { id: Date.now()+2, type: 'URL', text: '🚨 PROXY BLOCK: User requested http://malware.evil-site.com', status: 'alert' },
      { id: Date.now()+3, type: 'SIEM', text: '⚡ CORRELATION ENGINE: Brute Force RDP + Malicious URL match!', status: 'alert' }
    ];

    setLogs(prev => [...attackLogs, ...prev.slice(0, 2)]);

    setTimeout(() => {
      sounds.playSuccess();
      setIsAttackActive(false);
    }, 4000);
  };

  const handleToggleQos = () => {
    sounds.playPop();
    setQosEnabled(!qosEnabled);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-amber-50 border-2 border-amber-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-200/80 text-amber-900 font-extrabold text-xs rounded-full">
            <span>Log Correlation & Traffic Control • SIEM, SSH, RDP, URL, FTP, SSL, QoS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-amber-950">
            SIEM Log Correlation Radar & QoS Traffic Shaper! 📊⚡
          </h3>
          <p class="text-amber-900/80 font-medium text-sm">
            A <strong>SIEM</strong> aggregates logs from <strong>SSH</strong>, <strong>RDP</strong>, <strong>URL</strong> proxies, <strong>FTP</strong>, and <strong>SSL</strong> offloaders, correlating security events while <strong>QoS (Quality of Service)</strong> prioritizes critical bandwidth!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-amber-200 text-amber-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Airport radar tower (SIEM) & VIP highway lanes (QoS).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Controls (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Radio class="w-5 h-5 text-amber-600" />
            <span>Network Appliance Controls</span>
          </h4>

          {/* Attack Trigger */}
          <button
            onClick={handleSimulateAttack}
            disabled={isAttackActive}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              isAttackActive
                ? 'bg-rose-500 text-white animate-pulse cursor-wait shadow-rose-200'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
            }`}
          >
            {isAttackActive ? (
              <span>🚨 SIEM Correlating Cyber Attack...</span>
            ) : (
              <>
                <ShieldAlert class="w-5 h-5" />
                <span>Simulate RDP Brute Force & Malicious URL</span>
              </>
            )}
          </button>

          {/* QoS Toggle */}
          <button
            onClick={handleToggleQos}
            class={`w-full p-4 rounded-2xl border-2 text-left font-bold text-xs flex items-center justify-between transition-all ${
              qosEnabled
                ? 'border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm'
                : 'border-slate-200 hover:border-slate-300 text-slate-600'
            }`}
          >
            <div>
              <div class="font-extrabold text-sm flex items-center gap-1">
                <Zap class="w-4 h-4 text-emerald-600" /> QoS Bandwidth Shaper
              </div>
              <div class="text-[11px] text-slate-500 font-medium mt-0.5">
                {qosEnabled ? '🟢 QoS ACTIVE: Prioritizing Voice over Bulk FTP' : '⚪ QoS Disabled (Equal Bandwidth)'}
              </div>
            </div>
          </button>
        </div>

        {/* Visual SIEM Radar Stream (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[420px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Radio class="w-4 h-4 text-amber-400 animate-ping" /> SIEM Log Aggregator Console
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              isAttackActive ? 'bg-rose-500 text-white animate-bounce' : 'bg-emerald-500 text-slate-950'
            }`}>
              {isAttackActive ? 'SECURITY CORRELATION ALERT' : 'SIEM AGGREGATOR NORMAL'}
            </span>
          </div>

          {/* Log Console Stream */}
          <div class="my-4 space-y-2 font-mono text-xs max-h-56 overflow-y-auto pr-1">
            {logs.map(log => (
              <div
                key={log.id}
                class={`p-3 rounded-xl border transition-all flex items-start gap-2 ${
                  log.status === 'alert'
                    ? 'bg-rose-950/80 border-rose-500 text-rose-200 animate-fadeIn'
                    : 'bg-slate-950 border-slate-800 text-slate-300'
                }`}
              >
                <span class={`px-2 py-0.5 rounded text-[10px] font-extrabold shrink-0 ${
                  log.status === 'alert' ? 'bg-rose-500 text-white' : 'bg-slate-800 text-amber-300'
                }`}>
                  {log.type}
                </span>
                <span class="text-[11px] font-medium leading-relaxed">{log.text}</span>
              </div>
            ))}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SIEM = Security Info & Event Mgmt</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">QoS = Quality of Service</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSH / RDP / URL / FTP / SSL</span>
          </div>

        </div>

      </div>

    </div>
  );
}
