import React, { useState, useEffect } from 'react';
import { 
  Glasses, 
  Terminal, 
  Play, 
  Square, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  Filter, 
  Eye, 
  Layers, 
  VolumeX, 
  Volume2, 
  ArrowRight, 
  ArrowLeft,
  Search, 
  Lock, 
  FileText, 
  Server, 
  Laptop, 
  Activity,
  RotateCcw,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { sounds } from '../../../utils/audio';
import { SPRINT_1_STAGES } from './wiresharkSprintData';

export default function WiresharkSprint1Xray({ onSprintComplete }) {
  const [activeSubSprint, setActiveSubSprint] = useState('1.1'); // '1.1', '1.2', '1.3'

  // Sub-Sprint 1.1 State (First Sniff)
  const [isCapturing, setIsCapturing] = useState(false);
  const [isPingInFlight, setIsPingInFlight] = useState(false);
  const [capturedPackets, setCapturedPackets] = useState([]);
  const [selected11Packet, setSelected11Packet] = useState(null);
  const [firstSniffVerified, setFirstSniffVerified] = useState(false);
  const [copiedCmd, setCopiedCmd] = useState(null);

  // Sub-Sprint 1.2 State (Display Filters / Earmuffs)
  const [activeFilterId, setActiveFilterId] = useState('all');
  const [customFilterText, setCustomFilterText] = useState('');
  const [filterVerified, setFilterVerified] = useState(false);

  // Sub-Sprint 1.3 State (Envelope Layers / 3-Pane X-Ray)
  const [activeLayerIndex, setActiveLayerIndex] = useState(1); // 0: Frame, 1: IP, 2: Transport, 3: Payload
  const [expandedTreeItem, setExpandedTreeItem] = useState('ipv4'); // 'frame', 'eth', 'ipv4', 'icmp'
  const [layersVerified, setLayersVerified] = useState(false);

  const copyToClipboard = (text, id) => {
    try {
      sounds.playPop();
      navigator.clipboard.writeText(text);
      setCopiedCmd(id);
      setTimeout(() => setCopiedCmd(null), 2000);
    } catch (e) {
      console.log('Copy error:', e);
    }
  };

  // 1.1 Trigger Capture & Ping
  const handleToggleCapture = () => {
    sounds.playPop();
    if (isCapturing) {
      setIsCapturing(false);
    } else {
      setIsCapturing(true);
      setCapturedPackets([]);
      setSelected11Packet(null);
    }
  };

  const handleSendPing = () => {
    if (!isCapturing) {
      // Auto-start capture if not started
      setIsCapturing(true);
    }

    sounds.playPop();
    setIsPingInFlight(true);

    // Request goes out
    setTimeout(() => {
      setCapturedPackets((prev) => [
        ...prev,
        SPRINT_1_STAGES.firstSniff.samplePackets[0]
      ]);
    }, 400);

    // Reply returns
    setTimeout(() => {
      setCapturedPackets((prev) => [
        ...prev,
        SPRINT_1_STAGES.firstSniff.samplePackets[1]
      ]);
      setIsPingInFlight(false);
      setFirstSniffVerified(true);
      sounds.playSuccess();
    }, 1100);
  };

  // 1.2 Filter Selection
  const handleSelectFilter = (filterId) => {
    sounds.playPop();
    setActiveFilterId(filterId);
    setFilterVerified(true);
  };

  // 1.3 Layer selection
  const handleSelectLayer = (idx) => {
    sounds.playPop();
    setActiveLayerIndex(idx);
    const treeKeys = ['frame', 'ipv4', 'icmp', 'payload'];
    setExpandedTreeItem(treeKeys[idx] || 'ipv4');
    setLayersVerified(true);
  };

  const isAllSprint1Done = firstSniffVerified && filterVerified && layersVerified;

  return (
    <div className="space-y-8">
      
      {/* Sub-Sprint Navigation Pills */}
      <div className="bg-white rounded-3xl p-2.5 sm:p-3 border-3 border-cyan-200 shadow-sm flex flex-col md:flex-row gap-2 items-stretch md:items-center md:justify-between">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1 sm:mx-0 sm:px-0">
          
          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('1.1'); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
              activeSubSprint === '1.1'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-200 scale-102'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>1.1 First Live Sniff</span>
            {firstSniffVerified && <CheckCircle2 className="w-4 h-4 text-cyan-200" />}
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('1.2'); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
              activeSubSprint === '1.2'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-102'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>1.2 Display Filters</span>
            {filterVerified && <CheckCircle2 className="w-4 h-4 text-indigo-200" />}
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveSubSprint('1.3'); }}
            className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap shrink-0 ${
              activeSubSprint === '1.3'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-200 scale-102'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>1.3 Envelope Layers & 3-Pane</span>
            {layersVerified && <CheckCircle2 className="w-4 h-4 text-purple-200" />}
          </button>

        </div>

        {/* Global Progress Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 bg-cyan-50 rounded-xl border border-cyan-200 text-xs font-black text-cyan-800">
          <span>Sprint 1 Progress:</span>
          <span className="px-2 py-0.5 rounded-full bg-cyan-600 text-white text-[11px]">
            {Number(firstSniffVerified) + Number(filterVerified) + Number(layersVerified)} / 3 Verified
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-SPRINT 1.1: THE FIRST LIVE SNIFF (KNOCK & ECHO) */}
      {/* ========================================================================= */}
      {activeSubSprint === '1.1' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Card: ELI5 Explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-cyan-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                🎾
              </div>
              <div>
                <span className="text-xs font-black uppercase text-cyan-600 tracking-wider">
                  Sub-Sprint 1.1 • ICMP Handshake & First Sniff
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  The First Live Sniff: Knocking on Neighbor 8.8.8.8's Door
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {SPRINT_1_STAGES.firstSniff.eli5Summary}
            </p>

            {/* CompTIA Takeaway Alert */}
            <div className="bg-cyan-50 border-2 border-cyan-200 rounded-2xl p-4 text-xs sm:text-sm text-cyan-950 font-medium space-y-1">
              <div className="flex items-center gap-2 font-black text-cyan-900">
                <Sparkles className="w-4 h-4 text-cyan-600" />
                <span>CompTIA Security+ Exam Connection (Domain 4.3 ICMP Troubleshooting):</span>
              </div>
              <p>{SPRINT_1_STAGES.firstSniff.whyCompTia}</p>
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_1_STAGES.firstSniff.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_1_STAGES.firstSniff.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: The Ping Courier Knock & Return */}
          <div className="bg-slate-950 rounded-3xl p-6 border-4 border-cyan-500/50 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🏃‍♂️🎾</span>
                <h4 className="font-black text-sm text-cyan-300">
                  LIVE ANIMATION: The ICMP Echo Knock & Return Journey
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleCapture}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                    isCapturing
                      ? 'bg-rose-600 hover:bg-rose-500 text-white animate-pulse'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  }`}
                >
                  {isCapturing ? <Square className="w-3.5 h-3.5 fill-white" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  <span>{isCapturing ? 'Stop Sniffer ⏹️' : 'Start Sniffer 🔴'}</span>
                </button>

                <button
                  onClick={handleSendPing}
                  disabled={isPingInFlight}
                  className="px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:brightness-110 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
                >
                  <span>{isPingInFlight ? 'Knocking on Door...' : 'Send Ping to 8.8.8.8 🎾'}</span>
                </button>
              </div>
            </div>

            {/* Visual Ping Track */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center py-4 relative min-h-[160px]">
              
              {/* Left: Your VM Host */}
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-center space-y-2">
                <div className="text-3xl">💻</div>
                <div className="text-xs font-black text-cyan-400">Your Local VM</div>
                <div className="text-[11px] font-mono text-slate-300 font-bold">192.168.1.105</div>
                <span className="text-[10px] text-slate-500">Sender of ICMP Type 8</span>
              </div>

              {/* Middle: Motion Highway Track */}
              <div className="flex flex-col items-center justify-center space-y-3 px-2">
                <div className="text-[11px] font-mono text-slate-400 uppercase font-bold flex items-center gap-1">
                  <span>Network Wire (Internet Transit)</span>
                </div>

                <div className="w-full h-8 bg-slate-900 rounded-full border border-slate-800 relative flex items-center px-2 overflow-hidden">
                  {isPingInFlight ? (
                    <div className="animate-packetFly flex items-center gap-1 bg-cyan-500 text-slate-950 px-2 py-0.5 rounded-full text-[10px] font-black absolute">
                      <span>🎾</span>
                      <span>ICMP Type 8</span>
                    </div>
                  ) : capturedPackets.length > 0 ? (
                    <div className="w-full flex items-center justify-between text-[10px] text-emerald-400 font-mono font-bold px-2">
                      <span>✓ Echo Knock Sent</span>
                      <span>✓ Echo Reply Returned (14.2ms)</span>
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-600 font-mono mx-auto">
                      Wire idle. Click "Send Ping to 8.8.8.8" to launch probe!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400">
                  <span className="text-cyan-400">Type 8 = Knock ➡️</span>
                  <span className="text-emerald-400">Type 0 = Echo ⬅️</span>
                </div>
              </div>

              {/* Right: Google DNS Neighbor */}
              <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-center space-y-2">
                <div className="text-3xl">🌐</div>
                <div className="text-xs font-black text-emerald-400">Neighbor (Google DNS)</div>
                <div className="text-[11px] font-mono text-slate-300 font-bold">8.8.8.8</div>
                <span className="text-[10px] text-slate-500">Replier with ICMP Type 0</span>
              </div>

            </div>

            {/* Live Captured Packets Mini-Table */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span>Live Sniffer Feed:</span>
                <span className="font-mono text-cyan-400">{capturedPackets.length} ICMP Packets Captured</span>
              </div>

              <div className="space-y-1.5 font-mono text-xs max-h-[160px] overflow-y-auto">
                {capturedPackets.length > 0 ? (
                  capturedPackets.map((pkt) => (
                    <div
                      key={pkt.num}
                      onClick={() => { sounds.playPop(); setSelected11Packet(pkt); }}
                      className={`p-2.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        selected11Packet?.num === pkt.num
                          ? 'bg-cyan-950/80 border-cyan-400 text-cyan-100 shadow-md'
                          : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-slate-500">#{pkt.num}</span>
                        <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
                          pkt.type === 8 ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        }`}>
                          {pkt.typeLabel}
                        </span>
                        <span className="font-bold text-slate-200">{pkt.src} → {pkt.dst}</span>
                      </div>
                      <span className="text-slate-400 text-[11px] hidden sm:inline">{pkt.info}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-slate-600 italic py-6 text-center font-sans text-xs">
                    {isCapturing 
                      ? 'Listening on interface... Click "Send Ping to 8.8.8.8" to generate ICMP packets.' 
                      : 'Sniffer is stopped. Click "Start Sniffer" above to begin capturing.'}
                  </div>
                )}
              </div>

              {/* Selected Packet Explainer Drawer */}
              {selected11Packet && (
                <div className="p-3 bg-cyan-950/50 border border-cyan-500/40 rounded-xl text-xs space-y-1 animate-fadeIn">
                  <div className="flex items-center justify-between font-bold text-cyan-300">
                    <span>Packet #{selected11Packet.num} Analysis:</span>
                    <span>ICMP Protocol</span>
                  </div>
                  <p className="text-slate-300 font-sans">{selected11Packet.explanation}</p>
                </div>
              )}
            </div>

          </div>

          {/* Hands-On Commands & Verification Box */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Real Commands to run in VM */}
            <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-600" />
                  <span>Commands for Your Real VM Terminal</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Live Sniff</span>
              </div>

              <div className="space-y-3">
                {SPRINT_1_STAGES.firstSniff.commands.map((cmdItem) => (
                  <div key={cmdItem.step} className="bg-slate-900 rounded-2xl p-3 text-xs font-mono text-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-slate-400 text-[10px] font-sans font-bold">
                      <span>Step {cmdItem.step}: {cmdItem.desc}</span>
                      <button
                        onClick={() => copyToClipboard(cmdItem.cmd, `c11_${cmdItem.step}`)}
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        {copiedCmd === `c11_${cmdItem.step}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="text-cyan-400 font-bold overflow-x-auto whitespace-pre">
                      {cmdItem.cmd}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Checklist & Verification */}
            <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Sub-Sprint 1.1 Checklist</span>
                </h4>

                <div className="space-y-2 text-xs text-slate-700">
                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={capturedPackets.length > 0}
                      onChange={() => setFirstSniffVerified(true)}
                      className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                    />
                    <span className="font-medium">Captured live ping traffic (Start sniffer + send ping)</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={firstSniffVerified}
                      onChange={() => setFirstSniffVerified(true)}
                      className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                    />
                    <span className="font-medium">Identified ICMP Type 8 (Request) vs ICMP Type 0 (Reply)</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">1.1 Status:</span>
                {firstSniffVerified ? (
                  <span className="text-emerald-600 flex items-center gap-1 font-black">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                  </span>
                ) : (
                  <span className="text-amber-600">Pending Echo Verification</span>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SPRINT 1.2: DISPLAY FILTERS (NOISE-CANCELING EARMUFFS) */}
      {/* ========================================================================= */}
      {activeSubSprint === '1.2' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Card: ELI5 Explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                🎧
              </div>
              <div>
                <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">
                  Sub-Sprint 1.2 • Noise Reduction & Filtering
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Display Filters: Putting on the Noise-Canceling Earmuffs
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {SPRINT_1_STAGES.displayFilters.eli5Summary}
            </p>

            {/* CompTIA Takeaway Alert */}
            <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm text-indigo-950 font-medium space-y-1">
              <div className="flex items-center gap-2 font-black text-indigo-900">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>CompTIA Security+ Exam Connection (Capture Filters vs. Display Filters):</span>
              </div>
              <p>{SPRINT_1_STAGES.displayFilters.whyCompTia}</p>
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_1_STAGES.displayFilters.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_1_STAGES.displayFilters.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: The Noise Earmuffs Filter Swarm */}
          <div className="bg-slate-950 rounded-3xl p-6 border-4 border-indigo-500/50 shadow-2xl space-y-4 text-white">
            
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🎧✨</span>
                <h4 className="font-black text-sm text-indigo-300">
                  LIVE ANIMATION: Noise-Canceling Earmuffs in Action
                </h4>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Active Earmuffs:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-bold border border-indigo-400/40">
                  {activeFilterId === 'all' ? 'No Filter (Full Wire Noise)' : SPRINT_1_STAGES.displayFilters.filterPresets.find(f => f.id === activeFilterId)?.syntax}
                </span>
              </div>
            </div>

            {/* Filter Buttons Switchboard */}
            <div className="flex flex-wrap gap-2 pt-1">
              {SPRINT_1_STAGES.displayFilters.filterPresets.map((f) => (
                <button
                  key={f.id}
                  onClick={() => handleSelectFilter(f.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                    activeFilterId === f.id
                      ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-500/30 scale-102'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <Filter className="w-3.5 h-3.5" />
                  <span>{f.label}</span>
                  {f.syntax && <code className="text-[10px] bg-black/30 px-1 rounded">{f.syntax}</code>}
                </button>
              ))}
            </div>

            {/* Wire Traffic Swarm Display */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Wire Traffic Stream:</span>
                <span>Dimmed packets are filtered out by your noise earmuffs</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SPRINT_1_STAGES.displayFilters.mixedTrafficPool.map((pkt) => {
                  const isMatch = pkt.matchTags.includes(activeFilterId);

                  return (
                    <div
                      key={pkt.id}
                      className={`p-3 rounded-xl border transition-all flex items-center justify-between font-mono text-xs ${
                        isMatch
                          ? 'bg-indigo-950/70 border-indigo-400 text-indigo-100 shadow-md shadow-indigo-950'
                          : 'bg-slate-900/30 border-slate-800/40 text-slate-600 opacity-30 grayscale'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded font-black text-[10px] ${
                            isMatch ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-500'
                          }`}>
                            {pkt.proto}
                          </span>
                          <span className="font-bold">{pkt.src} → {pkt.dst}</span>
                        </div>
                        <div className="text-[11px] line-clamp-1">{pkt.info}</div>
                      </div>

                      <div className="text-[10px] font-sans font-bold">
                        {isMatch ? (
                          <span className="text-emerald-400 flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> VISIBLE
                          </span>
                        ) : (
                          <span className="text-slate-500 flex items-center gap-1">
                            <VolumeX className="w-3.5 h-3.5" /> MUTED
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Real World Wireshark Syntax & Verification */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Display Filter Cheat Sheet */}
            <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-600" />
                  <span>Essential CompTIA Display Filters</span>
                </h4>
                <span className="text-[11px] font-bold text-slate-400 uppercase">Cheat Sheet</span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="p-2.5 bg-slate-900 rounded-xl text-slate-200 flex items-center justify-between">
                  <span className="text-indigo-400 font-bold">ip.addr == 192.168.1.50</span>
                  <span className="text-[11px] text-slate-400 font-sans">Filter by either Src or Dst IP</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl text-slate-200 flex items-center justify-between">
                  <span className="text-emerald-400 font-bold">tcp.port == 80 || tcp.port == 443</span>
                  <span className="text-[11px] text-slate-400 font-sans">Filter web traffic</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl text-slate-200 flex items-center justify-between">
                  <span className="text-teal-400 font-bold">icmp</span>
                  <span className="text-[11px] text-slate-400 font-sans">Show only ping echoes</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl text-slate-200 flex items-center justify-between">
                  <span className="text-amber-400 font-bold">!arp</span>
                  <span className="text-[11px] text-slate-400 font-sans">Mute local ARP broadcasts</span>
                </div>
              </div>
            </div>

            {/* Verification Checklist */}
            <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Sub-Sprint 1.2 Verification</span>
                </h4>

                <div className="space-y-2 text-xs text-slate-700">
                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={activeFilterId !== 'all'}
                      onChange={() => setFilterVerified(true)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span className="font-medium">Practiced applying display filters (`icmp`, `ip.addr`, `tcp`)</span>
                  </label>

                  <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={filterVerified}
                      onChange={() => setFilterVerified(true)}
                      className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
                    />
                    <span className="font-medium">Understood Capture Filters (BPF on NIC) vs. Display Filters (GUI)</span>
                  </label>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span className="text-slate-500">1.2 Status:</span>
                {filterVerified ? (
                  <span className="text-emerald-600 flex items-center gap-1 font-black">
                    <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                  </span>
                ) : (
                  <span className="text-amber-600">Apply a filter to verify</span>
                )}
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-SPRINT 1.3: ENVELOPE LAYERS (THE 3-PANE X-RAY) */}
      {/* ========================================================================= */}
      {activeSubSprint === '1.3' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Card: ELI5 Explanation */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-purple-300 shadow-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-500 text-white flex items-center justify-center font-black text-xl shadow-md">
                📦
              </div>
              <div>
                <span className="text-xs font-black uppercase text-purple-600 tracking-wider">
                  Sub-Sprint 1.3 • Data Encapsulation & The 3-Pane Window
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Inspecting Envelope Layers: The Russian Nesting Doll of Packets
                </h3>
              </div>
            </div>

            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
              {SPRINT_1_STAGES.envelopeLayers.eli5Summary}
            </p>

            {/* CompTIA Takeaway Alert */}
            <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-4 text-xs sm:text-sm text-purple-950 font-medium space-y-1">
              <div className="flex items-center gap-2 font-black text-purple-900">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span>CompTIA Security+ Exam Connection (OSI Encapsulation):</span>
              </div>
              <p>{SPRINT_1_STAGES.envelopeLayers.whyCompTia}</p>
            </div>

            {/* Kenyan Everyday Metaphor */}
            {SPRINT_1_STAGES.envelopeLayers.kenyanMetaphor && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 text-xs sm:text-sm text-amber-950 font-medium space-y-1">
                <div className="flex items-center gap-2 font-black text-amber-900">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
                </div>
                <p className="italic text-amber-900">{SPRINT_1_STAGES.envelopeLayers.kenyanMetaphor}</p>
              </div>
            )}
          </div>

          {/* LIVE MOVING ANIMATION: The Conveyor Belt Layer Unpeeler */}
          <div className="bg-slate-950 rounded-3xl p-6 border-4 border-purple-500/50 shadow-2xl space-y-4 text-white">
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔬📦</span>
                <h4 className="font-black text-sm text-purple-300">
                  LIVE ANIMATION: Conveyor Belt X-Ray Parcel Unpeeler
                </h4>
              </div>

              <span className="text-xs text-slate-400 font-mono">
                Click layers below to peel open the headers!
              </span>
            </div>

            {/* Layer Selection Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {SPRINT_1_STAGES.envelopeLayers.layers.map((l, idx) => (
                <button
                  key={l.layer}
                  onClick={() => handleSelectLayer(idx)}
                  className={`p-3 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                    activeLayerIndex === idx
                      ? 'bg-purple-600 border-purple-300 text-white shadow-lg shadow-purple-900/50 scale-102'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span>{l.badge}</span>
                    <span>L{l.layer}</span>
                  </div>
                  <div className="text-xs font-black line-clamp-1">{l.name.split(':')[1]}</div>
                </button>
              ))}
            </div>

            {/* The Unpeeled Layer Breakdown Display */}
            {SPRINT_1_STAGES.envelopeLayers.layers[activeLayerIndex] && (
              <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-purple-300">
                    {SPRINT_1_STAGES.envelopeLayers.layers[activeLayerIndex].name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {SPRINT_1_STAGES.envelopeLayers.layers[activeLayerIndex].eli5}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                  {SPRINT_1_STAGES.envelopeLayers.layers[activeLayerIndex].fields.map((f, i) => (
                    <div key={i} className="p-2 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400">{f.key}:</span>
                      <span className="text-purple-300 font-bold">{f.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* REALISTIC 3-PANE WIRESHARK REPLICA */}
            <div className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  <span>Wireshark Authentic 3-Pane Architecture:</span>
                </span>
                <span className="text-[10px] text-slate-500 uppercase">Interactive Replica</span>
              </div>

              {/* Pane 1: Packet List */}
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 font-mono text-xs space-y-1.5">
                <span className="text-[10px] font-black text-slate-500 uppercase block">1. Top Pane: Packet List</span>
                <div className="p-2 bg-cyan-950/60 rounded-xl border border-cyan-500/50 flex items-center justify-between text-cyan-200">
                  <span>No. 1</span>
                  <span>Time: 0.000000</span>
                  <span>Src: 192.168.1.105</span>
                  <span>Dst: 8.8.8.8</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">ICMP</span>
                  <span>Len: 98</span>
                  <span className="text-[10px] hidden sm:inline">Echo (ping) request</span>
                </div>
              </div>

              {/* Pane 2: Packet Details Tree */}
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 font-mono text-xs space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase block">2. Middle Pane: Packet Details Tree</span>

                <div className="space-y-1 text-slate-300">
                  <div 
                    onClick={() => setExpandedTreeItem(expandedTreeItem === 'frame' ? null : 'frame')}
                    className="p-1.5 hover:bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    {expandedTreeItem === 'frame' ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                    <span className="font-bold">▶ Frame 1: 98 bytes on wire (784 bits)</span>
                  </div>

                  <div 
                    onClick={() => setExpandedTreeItem(expandedTreeItem === 'eth' ? null : 'eth')}
                    className="p-1.5 hover:bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    {expandedTreeItem === 'eth' ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                    <span className="font-bold">▶ Ethernet II, Src: 00:0c:29:1a:2b:3c, Dst: 00:50:56:fd:e1:22</span>
                  </div>

                  <div 
                    onClick={() => setExpandedTreeItem(expandedTreeItem === 'ipv4' ? null : 'ipv4')}
                    className="p-1.5 bg-indigo-950/40 rounded flex items-center gap-1.5 cursor-pointer border-l-2 border-indigo-400"
                  >
                    {expandedTreeItem === 'ipv4' ? <ChevronDown className="w-3.5 h-3.5 text-indigo-400" /> : <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
                    <span className="font-bold text-indigo-300">▼ Internet Protocol Version 4, Src: 192.168.1.105, Dst: 8.8.8.8</span>
                  </div>

                  {expandedTreeItem === 'ipv4' && (
                    <div className="pl-6 space-y-0.5 text-[11px] text-indigo-200/90 py-1">
                      <div>0100 .... = Version: 4</div>
                      <div>.... 0101 = Header Length: 20 bytes (5)</div>
                      <div>Time to Live: 64 hops</div>
                      <div>Protocol: ICMP (1)</div>
                      <div>Header Checksum: 0x4a21 [correct]</div>
                      <div>Source Address: 192.168.1.105</div>
                      <div>Destination Address: 8.8.8.8</div>
                    </div>
                  )}

                  <div 
                    onClick={() => setExpandedTreeItem(expandedTreeItem === 'icmp' ? null : 'icmp')}
                    className="p-1.5 hover:bg-slate-800 rounded flex items-center gap-1.5 cursor-pointer"
                  >
                    {expandedTreeItem === 'icmp' ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                    <span className="font-bold text-emerald-300">▶ Internet Control Message Protocol (Type 8 Echo Request)</span>
                  </div>
                </div>
              </div>

              {/* Pane 3: Packet Bytes (Hex Dump) */}
              <div className="bg-slate-900/90 rounded-2xl p-3 border border-slate-800 font-mono text-xs space-y-1">
                <span className="text-[10px] font-black text-slate-500 uppercase block">3. Bottom Pane: Packet Bytes (Hex & ASCII)</span>
                <div className="p-2 bg-slate-950 rounded-xl text-slate-400 text-[11px] overflow-x-auto whitespace-pre leading-relaxed">
                  {`0000  00 50 56 fd e1 22 00 0c 29 1a 2b 3c 08 00 45 00   .PV.."..).+<..E.
0010  00 54 12 34 40 00 40 01 4a 21 c0 a8 01 69 08 08   .T.4@.@.J!...i..
0020  08 08 08 00 2b 3c 12 34 00 01 61 62 63 64 65 66   ....+<.4..abcdef`}
                </div>
              </div>

            </div>

          </div>

          {/* Verification Box */}
          <div className="bg-white rounded-3xl p-6 border-3 border-slate-200 shadow-md flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span>Sub-Sprint 1.3 Verification</span>
              </h4>

              <div className="space-y-2 text-xs text-slate-700">
                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layersVerified}
                    onChange={() => setLayersVerified(true)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  <span className="font-medium">Unpeeled the 4 layers (Frame ➡️ IP ➡️ ICMP ➡️ Payload)</span>
                </label>

                <label className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layersVerified}
                    onChange={() => setLayersVerified(true)}
                    className="rounded text-purple-600 focus:ring-purple-500 w-4 h-4"
                  />
                  <span className="font-medium">Identified Wireshark's 3 panes: Packet List, Packet Details, and Packet Bytes</span>
                </label>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
              <span className="text-slate-500">1.3 Status:</span>
              {layersVerified ? (
                <span className="text-emerald-600 flex items-center gap-1 font-black">
                  <CheckCircle2 className="w-4 h-4" /> VERIFIED COMPLETE
                </span>
              ) : (
                <span className="text-amber-600">Explore layers to verify</span>
              )}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SPRINT 1 COMPLETION CELEBRATION CARD */}
      {/* ========================================================================= */}
      {isAllSprint1Done && (
        <div className="bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-700 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl">🎉👓</span>
              <div>
                <span className="text-xs font-black uppercase text-cyan-200 tracking-wider">
                  Sprint 1 Verified • X-Ray Glasses Initialized!
                </span>
                <h3 className="text-2xl font-black">
                  You Have Mastered Live Packet Sniffing & Display Filters!
                </h3>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md font-black text-xs text-white border border-white/30">
              Echo Types: Request (8) / Reply (0)
            </div>
          </div>

          <p className="text-cyan-100 text-xs sm:text-sm leading-relaxed max-w-3xl">
            You now know how to start/stop listening on the wire, how to wear <strong>Noise-Canceling Earmuffs (Display Filters)</strong> to mute junk traffic, and how to unpeel any packet into its <strong>3-Pane Wireshark Layers</strong> (Frame ➡️ IP ➡️ Transport ➡️ Payload).
          </p>

          <div className="pt-2 flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-600" />
              <span>Ready for Next Phase: Sprint 2 (Plaintext vs. Encrypted Traffic)</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
