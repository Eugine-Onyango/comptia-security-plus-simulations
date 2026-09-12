import React, { useState } from 'react';
import { MOCK_WIRESHARK_PACKETS, NETFLOW_VS_PCAP, TAP_VS_SPAN } from './pcapData';
import { sounds } from '../../../utils/audio';
import { 
  Search, 
  Filter, 
  Terminal, 
  RotateCcw, 
  FileText, 
  Activity, 
  Eye, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  Sparkles,
  X,
  Server,
  Network
} from 'lucide-react';

export default function WiresharkMiniLab() {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedPacket, setSelectedPacket] = useState(MOCK_WIRESHARK_PACKETS[4]); // default to packet 5 (HTTP POST)
  const [showTcpStream, setShowTcpStream] = useState(false);
  const [labMode, setLabMode] = useState('pcap'); // 'pcap', 'netflow', 'tap_span'

  const handleSelectPacket = (packet) => {
    sounds.playPop();
    setSelectedPacket(packet);
  };

  const handleOpenStream = () => {
    sounds.playSuccess();
    setShowTcpStream(true);
  };

  const filteredPackets = MOCK_WIRESHARK_PACKETS.filter((p) => {
    if (!filterQuery) return true;
    const q = filterQuery.toLowerCase().trim();
    if (q === 'http') return p.protocol.toLowerCase() === 'http';
    if (q === 'dns') return p.protocol.toLowerCase() === 'dns';
    if (q === 'arp') return p.protocol.toLowerCase() === 'arp';
    if (q === 'tcp') return p.protocol.toLowerCase() === 'tcp' || p.protocol.toLowerCase() === 'http';
    if (q === 'alert' || q === 'suspicious') return p.isSuspicious;
    return (
      p.protocol.toLowerCase().includes(q) ||
      p.source.includes(q) ||
      p.destination.includes(q) ||
      p.info.toLowerCase().includes(q)
    );
  });

  return (
    <div class="space-y-8">
      
      {/* Top Banner */}
      <div class="bg-gradient-to-r from-slate-800 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

        <div class="relative z-10 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md">
            <Activity class="w-4 h-4 text-emerald-400" />
            <span>Wireshark & tcpdump Simulator</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
            The Interactive Wireshark Mini-Lab 🦈
          </h2>

          <p class="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Wireshark is the security analyst's microscope! Filter packets, inspect protocol trees, reassemble full TCP streams, and compare <strong>Full PCAP captures</strong> against lightweight <strong>NetFlow metadata</strong>.
          </p>

          {/* Mode Switcher */}
          <div class="flex flex-wrap items-center gap-2 pt-2">
            <button
              onClick={() => { sounds.playPop(); setLabMode('pcap'); }}
              class={`px-4 py-2 rounded-2xl font-black text-xs transition-all border-2 ${
                labMode === 'pcap'
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-md scale-105'
                  : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
              }`}
            >
              <span>🦈 Live PCAP Capture Viewer</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setLabMode('netflow'); }}
              class={`px-4 py-2 rounded-2xl font-black text-xs transition-all border-2 ${
                labMode === 'netflow'
                  ? 'bg-amber-500 border-amber-400 text-white shadow-md scale-105'
                  : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
              }`}
            >
              <span>📱 NetFlow vs. PCAP (Phone Bill Matrix)</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setLabMode('tap_span'); }}
              class={`px-4 py-2 rounded-2xl font-black text-xs transition-all border-2 ${
                labMode === 'tap_span'
                  ? 'bg-emerald-600 border-emerald-400 text-white shadow-md scale-105'
                  : 'bg-white/10 border-white/20 text-slate-300 hover:bg-white/20'
              }`}
            >
              <span>🔌 Network TAP vs. Port Mirror (SPAN)</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: LIVE WIRESHARK PCAP SIMULATOR */}
      {labMode === 'pcap' && (
        <div class="bg-white rounded-3xl p-6 border-3 border-slate-300 shadow-xl space-y-6">
          
          {/* Wireshark Filter Bar */}
          <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-slate-100 p-3 rounded-2xl border-2 border-slate-200">
            <div class="flex-1 flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-300">
              <Filter class="w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Apply a display filter (e.g. http, dns, arp, tcp)..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                class="w-full text-xs font-mono font-bold text-slate-800 placeholder-slate-400 focus:outline-none"
              />
              {filterQuery && (
                <button onClick={() => setFilterQuery('')} class="text-slate-400 hover:text-slate-600">
                  <X class="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Preset Chips */}
            <div class="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              <span class="text-[10px] font-black uppercase text-slate-400 px-1">Presets:</span>
              {['All', 'http', 'dns', 'arp', 'tcp', 'alert'].map((f) => (
                <button
                  key={f}
                  onClick={() => { sounds.playPop(); setFilterQuery(f === 'All' ? '' : f); }}
                  class={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition-all border ${
                    (f === 'All' && filterQuery === '') || filterQuery.toLowerCase() === f.toLowerCase()
                      ? 'bg-indigo-600 text-white border-indigo-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Wireshark Packet List Table */}
          <div class="space-y-2">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black uppercase text-slate-500 tracking-wider">
                Packet List ({filteredPackets.length} captured frames)
              </span>
              <span class="text-[11px] text-slate-400 font-semibold">Click any row to inspect protocol details</span>
            </div>

            <div class="overflow-x-auto border-2 border-slate-200 rounded-2xl max-h-[300px] overflow-y-auto">
              <table class="w-full text-left text-xs font-mono">
                <thead class="bg-slate-200/80 text-slate-700 uppercase font-black text-[10px] sticky top-0 z-10 border-b border-slate-300">
                  <tr>
                    <th class="p-2.5">No.</th>
                    <th class="p-2.5">Time</th>
                    <th class="p-2.5">Source</th>
                    <th class="p-2.5">Destination</th>
                    <th class="p-2.5">Protocol</th>
                    <th class="p-2.5">Len</th>
                    <th class="p-2.5">Info</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  {filteredPackets.map((pkt) => {
                    const isSelected = selectedPacket?.no === pkt.no;
                    return (
                      <tr
                        key={pkt.no}
                        onClick={() => handleSelectPacket(pkt)}
                        class={`cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-indigo-600 text-white font-black shadow-inner'
                            : `${pkt.color} hover:brightness-95`
                        }`}
                      >
                        <td class="p-2.5">{pkt.no}</td>
                        <td class="p-2.5 opacity-80">{pkt.time}</td>
                        <td class="p-2.5">{pkt.source}</td>
                        <td class="p-2.5">{pkt.destination}</td>
                        <td class="p-2.5 font-bold">{pkt.protocol}</td>
                        <td class="p-2.5 opacity-80">{pkt.length}</td>
                        <td class="p-2.5 truncate max-w-xs">{pkt.info}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Wireshark Packet Details Pane */}
          {selectedPacket && (
            <div class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-5 space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <div class="flex items-center gap-2">
                  <Eye class="w-4 h-4 text-indigo-600" />
                  <h4 class="font-black text-slate-900 text-sm">
                    Packet #{selectedPacket.no} Details Tree ({selectedPacket.protocol})
                  </h4>
                </div>

                {/* Follow TCP Stream Action */}
                {selectedPacket.hasStream && (
                  <button
                    onClick={handleOpenStream}
                    class="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5 animate-pulse"
                  >
                    <FileText class="w-3.5 h-3.5" />
                    <span>Follow TCP Stream (View Reconstructed Text) 🔍</span>
                  </button>
                )}
              </div>

              {/* Protocol Dissection Tree */}
              <div class="space-y-1.5 font-mono text-xs text-slate-800">
                {Object.entries(selectedPacket.details).map(([key, value]) => (
                  <div key={key} class="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span class="font-black text-indigo-700 uppercase text-[10px] block mb-0.5">
                      ▶ {key.toUpperCase()}
                    </span>
                    <pre class="whitespace-pre-wrap text-[11px] leading-relaxed">{value}</pre>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* MODE 2: NETFLOW VS PCAP COMPARISON */}
      {labMode === 'netflow' && (
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-xl space-y-6 animate-scaleUp">
          <div class="flex items-center gap-2">
            <Sparkles class="w-5 h-5 text-amber-500" />
            <h3 class="text-2xl font-black text-slate-900">
              NetFlow (The Phone Bill) vs. PCAP (The Wiretap)
            </h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NetFlow */}
            <div class="bg-amber-50 border-2 border-amber-300 rounded-3xl p-6 space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-3xl">📱</span>
                <h4 class="font-black text-lg text-slate-900">{NETFLOW_VS_PCAP.netflow.title}</h4>
              </div>

              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {NETFLOW_VS_PCAP.netflow.desc}
              </p>

              <div class="space-y-2">
                <span class="text-xs font-black uppercase text-amber-900">Key Superpowers:</span>
                <ul class="list-disc list-inside text-xs text-slate-700 space-y-1 font-medium">
                  {NETFLOW_VS_PCAP.netflow.advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div class="bg-white p-3.5 rounded-2xl border border-amber-200 text-xs font-bold text-amber-950">
                <span class="text-amber-700 font-black block mb-1">CompTIA Exam Rule:</span>
                {NETFLOW_VS_PCAP.netflow.examTip}
              </div>
            </div>

            {/* PCAP */}
            <div class="bg-indigo-50 border-2 border-indigo-300 rounded-3xl p-6 space-y-4">
              <div class="flex items-center gap-2">
                <span class="text-3xl">🎙️</span>
                <h4 class="font-black text-lg text-slate-900">{NETFLOW_VS_PCAP.pcap.title}</h4>
              </div>

              <p class="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {NETFLOW_VS_PCAP.pcap.desc}
              </p>

              <div class="space-y-2">
                <span class="text-xs font-black uppercase text-indigo-900">Key Superpowers:</span>
                <ul class="list-disc list-inside text-xs text-slate-700 space-y-1 font-medium">
                  {NETFLOW_VS_PCAP.pcap.advantages.map((adv, i) => (
                    <li key={i}>{adv}</li>
                  ))}
                </ul>
              </div>

              <div class="bg-white p-3.5 rounded-2xl border border-indigo-200 text-xs font-bold text-indigo-950">
                <span class="text-indigo-700 font-black block mb-1">CompTIA Exam Rule:</span>
                {NETFLOW_VS_PCAP.pcap.examTip}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3: NETWORK TAP VS PORT MIRROR (SPAN) */}
      {labMode === 'tap_span' && (
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-3 border-emerald-300 shadow-xl space-y-6 animate-scaleUp">
          <div class="flex items-center gap-2">
            <Network class="w-5 h-5 text-emerald-600" />
            <h3 class="text-2xl font-black text-slate-900">
              Packet Collection: Network TAP vs. Port Mirror (SPAN)
            </h3>
          </div>

          <p class="text-xs sm:text-sm text-slate-600 font-medium">
            How do security teams actually grab packets out of the physical cables? CompTIA tests whether you know when to use a physical <strong>TAP</strong> vs a software <strong>SPAN</strong> port!
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* TAP */}
            <div class="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-6 space-y-3">
              <span class="px-2.5 py-0.5 bg-emerald-200 text-emerald-950 rounded-full font-black text-xs">
                Hardware Splitter
              </span>
              <h4 class="font-black text-lg text-emerald-950">{TAP_VS_SPAN.tap.name}</h4>
              <p class="text-xs font-bold text-emerald-800 italic">{TAP_VS_SPAN.tap.analogy}</p>
              <p class="text-xs text-slate-700 leading-relaxed font-medium">{TAP_VS_SPAN.tap.howItWorks}</p>

              <div class="bg-white p-3 rounded-2xl border border-emerald-200 text-xs font-bold text-emerald-950">
                <span class="text-emerald-700 font-black block mb-0.5">Superpower:</span>
                {TAP_VS_SPAN.tap.pros}
              </div>
              <div class="text-[11px] text-slate-500 font-semibold">{TAP_VS_SPAN.tap.compTiaTakeaway}</div>
            </div>

            {/* SPAN */}
            <div class="bg-sky-50 border-2 border-sky-300 rounded-3xl p-6 space-y-3">
              <span class="px-2.5 py-0.5 bg-sky-200 text-sky-950 rounded-full font-black text-xs">
                Software Switch Mirroring
              </span>
              <h4 class="font-black text-lg text-sky-950">{TAP_VS_SPAN.span.name}</h4>
              <p class="text-xs font-bold text-sky-800 italic">{TAP_VS_SPAN.span.analogy}</p>
              <p class="text-xs text-slate-700 leading-relaxed font-medium">{TAP_VS_SPAN.span.howItWorks}</p>

              <div class="bg-white p-3 rounded-2xl border border-sky-200 text-xs font-bold text-rose-900">
                <span class="text-rose-700 font-black block mb-0.5">CompTIA Vulnerability:</span>
                {TAP_VS_SPAN.span.cons}
              </div>
              <div class="text-[11px] text-slate-500 font-semibold">{TAP_VS_SPAN.span.compTiaTakeaway}</div>
            </div>
          </div>
        </div>
      )}

      {/* FOLLOW TCP STREAM MODAL (POPUP) */}
      {showTcpStream && selectedPacket?.streamText && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div class="bg-white rounded-3xl max-w-2xl w-full border-4 border-rose-400 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-scaleUp">
            
            {/* Modal Header */}
            <div class="bg-slate-900 text-white p-5 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <Terminal class="w-5 h-5 text-rose-400" />
                <div>
                  <h4 class="font-black text-base">Wireshark: Follow TCP Stream</h4>
                  <p class="text-xs text-slate-400">Reconstructed Plaintext Conversation (Stream 0)</p>
                </div>
              </div>

              <button
                onClick={() => setShowTcpStream(false)}
                class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            {/* Stream Dialogue Pane */}
            <div class="p-6 overflow-y-auto font-mono text-xs space-y-4">
              <div class="bg-rose-50 border border-rose-300 rounded-2xl p-4 space-y-1">
                <span class="text-[10px] font-black uppercase text-rose-700 block">
                  🔴 Client Request (192.168.1.45:51240 ➡️ 192.168.1.50:80):
                </span>
                <pre class="text-rose-950 whitespace-pre-wrap leading-relaxed font-bold">
                  {selectedPacket.streamText.client}
                </pre>
              </div>

              <div class="bg-blue-50 border border-blue-300 rounded-2xl p-4 space-y-1">
                <span class="text-[10px] font-black uppercase text-blue-700 block">
                  🔵 Server Response (192.168.1.50:80 ➡️ 192.168.1.45:51240):
                </span>
                <pre class="text-blue-950 whitespace-pre-wrap leading-relaxed font-bold">
                  {selectedPacket.streamText.server}
                </pre>
              </div>
            </div>

            {/* Modal Footer */}
            <div class="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <span class="text-xs font-bold text-rose-700">
                ⚠️ Danger: Password exposed naked on wire!
              </span>
              <button
                onClick={() => setShowTcpStream(false)}
                class="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white font-black text-xs rounded-xl transition-all"
              >
                Close Stream
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
