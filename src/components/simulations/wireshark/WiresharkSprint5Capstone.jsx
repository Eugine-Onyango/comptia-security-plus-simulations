import React, { useState } from 'react';
import { 
  Trophy, 
  Terminal, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle, 
  FileText, 
  Search, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle,
  Eye,
  Key,
  Flame,
  Download
} from 'lucide-react';
import { sounds } from '../../../utils/audio';
import { SPRINT_5_CAPSTONE } from './wiresharkSprintData';

export default function WiresharkSprint5Capstone({ onSprintComplete }) {
  // Triage state
  const [selectedPacket, setSelectedPacket] = useState(SPRINT_5_CAPSTONE.packets[0]);
  const [activeFilter, setActiveFilter] = useState('');
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [copiedCmd, setCopiedCmd] = useState(null);

  // Filter presets
  const presets = [
    { label: 'All Traffic', filter: '' },
    { label: 'Recon Only (tcp.port == 21)', filter: 'tcp.port == 21' },
    { label: 'Stealth Resets (tcp.flags.reset == 1)', filter: 'tcp.flags.reset == 1' },
    { label: 'Cleartext Auth (ftp)', filter: 'ftp' },
    { label: 'Exfiltration (http.request.method == "POST")', filter: 'http.request.method == "POST"' },
    { label: 'Attacker IP (ip.addr == 198.51.100.15)', filter: 'ip.addr == 198.51.100.15' }
  ];

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

  // Filter logic
  const filteredPackets = SPRINT_5_CAPSTONE.packets.filter(p => {
    if (!activeFilter) return true;
    const f = activeFilter.toLowerCase();
    if (f.includes('21')) return p.info.includes('21') || p.proto === 'FTP';
    if (f.includes('reset')) return p.info.includes('[RST]');
    if (f.includes('ftp')) return p.proto === 'FTP';
    if (f.includes('post')) return p.info.includes('POST');
    if (f.includes('198.51.100.15')) return p.src === '198.51.100.15' || p.dst === '198.51.100.15';
    return true;
  });

  const handleSelectAnswer = (qId, option) => {
    sounds.playPop();
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmitTriageReport = () => {
    let correctCount = 0;
    SPRINT_5_CAPSTONE.triageQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setSubmitted(true);

    if (correctCount === SPRINT_5_CAPSTONE.triageQuestions.length) {
      sounds.playSuccess();
      if (onSprintComplete) onSprintComplete();
    } else {
      sounds.playAlert();
    }
  };

  const handleResetTriage = () => {
    sounds.playPop();
    setAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* CAPSTONE HERO BANNER */}
      <div className="bg-gradient-to-r from-amber-600 via-purple-700 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl sm:text-5xl">🕵️‍♂️🏆</span>
            <div>
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider">
                Sprint 5 Final Capstone • Live Incident Response
              </span>
              <h2 className="text-2xl sm:text-3xl font-black">
                {SPRINT_5_CAPSTONE.scenario.title}
              </h2>
            </div>
          </div>

          <div className="px-4 py-2 rounded-2xl bg-white/20 backdrop-blur-md font-black text-xs text-white border border-white/30 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-300" />
            <span>Target: {SPRINT_5_CAPSTONE.scenario.targetHost}</span>
          </div>
        </div>

        <p className="text-amber-100 text-xs sm:text-sm leading-relaxed max-w-4xl">
          {SPRINT_5_CAPSTONE.scenario.description}
        </p>

        {/* Kenyan Everyday Analogy */}
        {SPRINT_5_CAPSTONE.scenario.kenyanMetaphor && (
          <div className="bg-amber-950/40 border border-amber-400/40 rounded-2xl p-4 text-xs sm:text-sm text-amber-200 font-medium space-y-1 backdrop-blur-sm">
            <div className="flex items-center gap-2 font-black text-amber-300">
              <span className="text-base">🇰🇪</span>
              <span>Kenyan Everyday Analogy (DCI Cyber Crime Operation):</span>
            </div>
            <p className="italic text-amber-100">{SPRINT_5_CAPSTONE.scenario.kenyanMetaphor}</p>
          </div>
        )}

        <div className="pt-2 flex items-center gap-3 flex-wrap text-xs">
          <span className="px-3 py-1 bg-black/30 rounded-xl border border-white/20">
            Organization: <strong>{SPRINT_5_CAPSTONE.scenario.company}</strong>
          </span>
          <span className="px-3 py-1 bg-rose-900/60 rounded-xl border border-rose-400 text-rose-200">
            Severity: <strong>{SPRINT_5_CAPSTONE.scenario.alertSeverity}</strong>
          </span>
          <span className="px-3 py-1 bg-black/30 rounded-xl border border-white/20">
            Investigator: <strong>Tier-1 SOC Analyst (You)</strong>
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* AUTHENTIC 3-PANE PCAP FORENSIC WORKSPACE */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 rounded-3xl p-6 border-3 border-indigo-500 shadow-xl space-y-5">
        
        {/* Top Control Bar: Display Filters */}
        <div className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-400" />
              <span className="text-xs font-black uppercase text-indigo-300 tracking-wider">
                Wireshark Display Filter Engine
              </span>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Showing {filteredPackets.length} of {SPRINT_5_CAPSTONE.packets.length} packets
            </span>
          </div>

          {/* Preset Buttons */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {presets.map((p, i) => (
              <button
                key={i}
                onClick={() => { sounds.playPop(); setActiveFilter(p.filter); }}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                  activeFilter === p.filter
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-900/50'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1. TOP PANE: PACKET LIST */}
        <div className="space-y-1.5">
          <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
            1. Top Pane: Packet List Summary
          </span>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto shadow-inner">
            <table className="w-full text-left font-mono text-xs text-slate-300">
              <thead className="bg-slate-950 text-[10px] text-slate-400 uppercase border-b border-slate-800 font-black">
                <tr>
                  <th className="p-2.5">No.</th>
                  <th className="p-2.5">Time</th>
                  <th className="p-2.5">Source IP</th>
                  <th className="p-2.5">Destination IP</th>
                  <th className="p-2.5">Proto</th>
                  <th className="p-2.5">Phase Tag</th>
                  <th className="p-2.5">Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredPackets.map((pkt) => {
                  const isSelected = selectedPacket.id === pkt.id;

                  return (
                    <tr
                      key={pkt.id}
                      onClick={() => { sounds.playPop(); setSelectedPacket(pkt); }}
                      className={`cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-indigo-600/30 text-white font-black border-l-4 border-indigo-500'
                          : 'hover:bg-slate-800/60'
                      }`}
                    >
                      <td className="p-2.5">{pkt.id}</td>
                      <td className="p-2.5 text-slate-400">{pkt.time}</td>
                      <td className={`p-2.5 ${pkt.src.includes('198.51') ? 'text-amber-400 font-bold' : ''}`}>
                        {pkt.src}
                      </td>
                      <td className="p-2.5">{pkt.dst}</td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                          pkt.proto === 'FTP' ? 'bg-rose-900/60 text-rose-300 border border-rose-600' :
                          pkt.proto === 'HTTP' ? 'bg-purple-900/60 text-purple-300 border border-purple-600' :
                          'bg-indigo-900/60 text-indigo-300 border border-indigo-600'
                        }`}>
                          {pkt.proto}
                        </span>
                      </td>
                      <td className="p-2.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          pkt.phaseColor === 'amber' ? 'bg-amber-950 text-amber-300 border border-amber-700' :
                          pkt.phaseColor === 'rose' ? 'bg-rose-950 text-rose-300 border border-rose-700' :
                          'bg-purple-950 text-purple-300 border border-purple-700'
                        }`}>
                          {pkt.phase}
                        </span>
                      </td>
                      <td className="p-2.5 text-xs truncate max-w-xs">{pkt.info}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* 2. MIDDLE & BOTTOM PANES: PACKET DETAILS & HEX BYTES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Middle Pane: Packet Details Tree */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2">
            <span className="text-[10px] font-black uppercase text-indigo-400 tracking-wider block border-b border-slate-800 pb-1">
              2. Middle Pane: Dissected Packet #{selectedPacket.id} Details
            </span>

            <div className="space-y-1.5 text-slate-300 text-[11px]">
              <div>▶ Frame #{selectedPacket.id} ({selectedPacket.length} bytes on wire)</div>
              <div>▶ Ethernet II, Src: 00:0c:29:11:22:33, Dst: 00:50:56:c0:00:08</div>
              <div>▶ Internet Protocol Version 4, Src: {selectedPacket.src}, Dst: {selectedPacket.dst}</div>
              <div className="text-indigo-300 font-bold">▶ Transport Layer Flags: {selectedPacket.details.flags}</div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 mt-2">
                <strong className="text-indigo-400 block mb-1">Forensic Analysis:</strong>
                {selectedPacket.details.summary}
              </div>
            </div>
          </div>

          {/* Bottom Pane: Hex Dump & ASCII */}
          <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 font-mono text-xs space-y-2">
            <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block border-b border-slate-800 pb-1">
              3. Bottom Pane: Raw Packet Bytes (Hex & ASCII Dump)
            </span>

            <div className="p-3 bg-slate-950 rounded-xl text-slate-300 text-[11px] overflow-x-auto whitespace-pre leading-relaxed border border-slate-800/80">
              {selectedPacket.details.hexSnippet}
            </div>

            <div className="text-[10px] text-slate-400">
              Highlighted bytes show plaintext payload characters extracted directly from the wire.
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* INCIDENT RESPONSE FORENSIC TRIAGE REPORT FORM */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-amber-300 shadow-xl space-y-6">
        
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-amber-600 tracking-wider flex items-center gap-1.5">
              <FileText className="w-4 h-4" />
              <span>Official Security+ Incident Report</span>
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Incident Response Triage & Evidence Extraction
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm">
              Use your findings from the Wireshark PCAP workspace above to answer the 4 critical triage questions.
            </p>
          </div>

          {submitted && (
            <button
              onClick={handleResetTriage}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Report</span>
            </button>
          )}
        </div>

        {/* 4 Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SPRINT_5_CAPSTONE.triageQuestions.map((q) => {
            const userAnswer = answers[q.id];
            const isAnswered = !!userAnswer;
            const isCorrect = userAnswer === q.correctAnswer;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-2xl border-2 space-y-3 transition-all ${
                  submitted
                    ? isCorrect
                      ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950'
                      : 'bg-rose-50/70 border-rose-400 text-rose-950'
                    : isAnswered
                    ? 'bg-slate-50 border-indigo-400 shadow-sm'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-black text-xs sm:text-sm text-slate-900 leading-snug">
                    {q.label}
                  </span>
                  {submitted && (
                    <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                      isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                    }`}>
                      {isCorrect ? 'PASS ✓' : 'FAIL ✗'}
                    </span>
                  )}
                </div>

                {/* Option Radios */}
                <div className="space-y-1.5 pt-1">
                  {q.options.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectAnswer(q.id, opt)}
                      disabled={submitted}
                      className={`w-full p-2.5 rounded-xl text-xs text-left font-mono font-bold transition-all flex items-center justify-between cursor-pointer ${
                        userAnswer === opt
                          ? submitted
                            ? isCorrect
                              ? 'bg-emerald-600 text-white'
                              : 'bg-rose-600 text-white'
                            : 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white border border-slate-200 hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <span>{opt}</span>
                      {userAnswer === opt && <Check className="w-3.5 h-3.5" />}
                    </button>
                  ))}
                </div>

                {/* Post-submission explanation */}
                {submitted && (
                  <p className="text-[11px] text-slate-600 border-t border-slate-200/80 pt-2 leading-relaxed font-sans">
                    <strong>Evidence:</strong> {q.explanation}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit Action Bar */}
        <div className="pt-2 flex items-center justify-between flex-wrap gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 font-medium">
            Answered {Object.keys(answers).length} of {SPRINT_5_CAPSTONE.triageQuestions.length} findings
          </div>

          <button
            onClick={handleSubmitTriageReport}
            disabled={Object.keys(answers).length < SPRINT_5_CAPSTONE.triageQuestions.length}
            className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/30 transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            <span>Submit Forensic Triage Report 🚀</span>
          </button>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FINAL CAPSTONE CELEBRATION & MASTER CERTIFICATE */}
      {/* ========================================================================= */}
      {submitted && score === SPRINT_5_CAPSTONE.triageQuestions.length && (
        <div className="bg-gradient-to-br from-amber-500 via-amber-600 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl space-y-6 animate-fadeIn border-4 border-amber-300 relative overflow-hidden">
          
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-amber-300/40 pb-6">
            <div className="flex items-center gap-3">
              <span className="text-5xl">🏆🎓</span>
              <div>
                <span className="text-xs font-black uppercase text-amber-200 tracking-widest block">
                  Official Verification of Completion
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
                  {SPRINT_5_CAPSTONE.certificate.title}
                </h2>
              </div>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-white text-slate-950 font-black text-xs shadow-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              <span>Verified Score: 100% (4/4 Findings)</span>
            </div>
          </div>

          <p className="text-amber-100 text-sm leading-relaxed max-w-4xl font-medium">
            {SPRINT_5_CAPSTONE.certificate.subtitle}
          </p>

          {/* Mastered Skills Badges */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-black uppercase tracking-wider text-amber-200 block">
              CompTIA Security+ Competencies Mastered Across All 6 Sprints:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
              {SPRINT_5_CAPSTONE.certificate.skillsVerified.map((skill, i) => (
                <div key={i} className="p-3 rounded-xl bg-black/30 border border-amber-300/30 flex items-center gap-2 text-xs font-bold text-amber-100">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-amber-200/80 border-t border-amber-300/30">
            <span>Certificate ID: SECPLUS-WIRESHARK-ODYSSEY-2026</span>
            <span>All 6 Sprints Verified • Ready to Conquer CompTIA Security+ PBQs!</span>
          </div>

        </div>
      )}

    </div>
  );
}
