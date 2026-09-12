import React, { useState } from 'react';
import { DEFAULT_ACL_RULES, TEST_PACKETS } from './firewallData';
import { sounds } from '../../../utils/audio';
import { 
  ArrowUp, 
  ArrowDown, 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Info, 
  Sparkles, 
  ArrowRight,
  ListOrdered,
  Eye,
  Sliders,
  Send
} from 'lucide-react';

export default function AclRuleTableSimulator() {
  const [rules, setRules] = useState(DEFAULT_ACL_RULES);
  const [activePacket, setActivePacket] = useState(null);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [evaluatingRow, setEvaluatingRow] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Move a rule Up
  const moveRuleUp = (index) => {
    if (index === 0) return;
    sounds.playPop();
    const next = [...rules];
    const temp = next[index];
    next[index] = next[index - 1];
    next[index - 1] = temp;
    setRules(next);
    resetSimulation();
  };

  // Move a rule Down
  const moveRuleDown = (index) => {
    if (index === rules.length - 1) return;
    sounds.playPop();
    const next = [...rules];
    const temp = next[index];
    next[index] = next[index + 1];
    next[index + 1] = temp;
    setRules(next);
    resetSimulation();
  };

  const resetRules = () => {
    sounds.playPop();
    setRules(DEFAULT_ACL_RULES);
    resetSimulation();
  };

  const resetSimulation = () => {
    setActivePacket(null);
    setEvaluationResult(null);
    setEvaluatingRow(null);
    setIsSimulating(false);
  };

  // Send test packet through the firewall
  const handleSendPacket = (packet) => {
    sounds.playPop();
    setActivePacket(packet);
    setIsSimulating(true);
    setEvaluationResult(null);
    setEvaluatingRow(0);

    // Evaluate rules step-by-step to demonstrate Top-to-Bottom processing
    let matchedRule = null;
    let matchedIdx = -1;

    for (let i = 0; i < rules.length; i++) {
      const r = rules[i];

      // Direction check
      const dirMatch = r.direction === packet.direction;

      // Protocol check
      const protoMatch = r.protocol === 'ANY' || r.protocol === packet.protocol;

      // Port check
      const portMatch = r.port === 'ANY' || r.port.includes(packet.port.split(' ')[0]);

      // Source check
      const srcMatch = r.sourceIp === 'ANY' || packet.sourceIp.includes(r.sourceIp.split(' ')[0]);

      // Dest check
      const dstMatch = r.destIp === 'ANY' || packet.destIp.includes(r.destIp.split(' ')[0]);

      if (dirMatch && protoMatch && portMatch && srcMatch && dstMatch) {
        matchedRule = r;
        matchedIdx = i;
        break;
      }
    }

    // Step through each row visually
    let currentRow = 0;
    const interval = setInterval(() => {
      if (currentRow < rules.length) {
        setEvaluatingRow(currentRow);

        if (currentRow === matchedIdx) {
          // Found match!
          clearInterval(interval);
          setIsSimulating(false);
          setEvaluationResult({
            matchedRule: matchedRule,
            action: matchedRule.action,
            isImplicitDeny: false,
            reason: `FIRST MATCH WINS at Line ${currentRow + 1} (Rule ${matchedRule.ruleNumber})! Action: ${matchedRule.action}. Firewalls stop evaluating remaining rules!`
          });

          if (matchedRule.action === 'ALLOW') {
            sounds.playSuccess();
          } else {
            sounds.playPop();
          }
          return;
        }

        currentRow++;
      } else {
        // Fall through to Implicit Deny
        clearInterval(interval);
        setEvaluatingRow('implicit_deny');
        setIsSimulating(false);
        setEvaluationResult({
          matchedRule: null,
          action: 'DENY',
          isImplicitDeny: true,
          reason: 'No rule matched this packet! It fell through the entire checklist and was caught by Rule 99: IMPLICIT DENY (DROP ALL).'
        });
        sounds.playPop();
      }
    }, 450);
  };

  return (
    <div class="space-y-8">
      
      {/* Top Banner */}
      <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div class="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div class="relative z-10 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md">
            <ListOrdered class="w-4 h-4 text-yellow-300" />
            <span>CompTIA PBQ Core Concept</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
            The Interactive ACL Rule Table 📋
          </h2>

          <p className="text-amber-100 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Every firewall processes rules from <strong>Top to Bottom (First Match Wins)</strong>. 
            If a packet matches Line 1, it never even reads Line 2! And at the very bottom sits the invisible <strong>Implicit Deny (Rule 99)</strong>.
          </p>

          {/* Kenyan Everyday Metaphor */}
          <div className="bg-amber-900/40 border border-amber-300/40 rounded-2xl p-3.5 text-xs sm:text-sm text-amber-100 flex items-start gap-2.5 backdrop-blur-md">
            <span className="text-xl shrink-0">🇰🇪</span>
            <div>
              <strong className="text-amber-300 block mb-0.5">Kenyan Everyday Analogy (Maasai Watchman with Clipboard):</strong>
              <p className="italic leading-relaxed">
                The estate gate watchman checks arriving cars against his clipboard top-to-bottom. As soon as line 1 matches, he opens or blocks immediately without reading line 2 (<strong>First Match Wins</strong>). If your car number plate isn't listed on any line, the barrier stays locked down (<strong>Implicit Deny</strong>)!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Packet Dispatcher Bar */}
      <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <Send class="w-5 h-5 text-amber-600" />
            <h3 class="font-black text-slate-900 text-base">
              Step 1: Send a Test Packet through the Firewall
            </h3>
          </div>
          <span class="text-xs text-slate-500 font-semibold hidden sm:inline">
            Click any packet to watch the firewall evaluate rules line-by-line
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {TEST_PACKETS.map((packet) => (
            <button
              key={packet.id}
              onClick={() => handleSendPacket(packet)}
              disabled={isSimulating}
              class={`p-3.5 rounded-2xl border-2 text-left transition-all active:scale-95 flex flex-col justify-between space-y-2 ${
                activePacket?.id === packet.id
                  ? 'bg-amber-500 border-amber-600 text-white shadow-md'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div class="font-black text-xs sm:text-sm flex items-center justify-between">
                <span>{packet.label}</span>
              </div>
              <div class="text-[11px] font-mono opacity-85">
                {packet.direction} • {packet.port} • {packet.protocol}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* FIREWALL ACL TABLE */}
      <div class="bg-white rounded-3xl p-6 border-3 border-slate-300 shadow-lg space-y-4">
        <div class="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div class="flex items-center gap-2">
            <Sliders class="w-5 h-5 text-indigo-600" />
            <h3 class="font-black text-slate-900 text-lg">
              Active Firewall Rule Base (ACL)
            </h3>
          </div>

          <div class="flex items-center gap-2">
            <button
              onClick={resetRules}
              class="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
            >
              <RotateCcw class="w-3.5 h-3.5" />
              <span>Reset Default Order</span>
            </button>
          </div>
        </div>

        {/* Table Container */}
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-100 text-slate-700 uppercase font-black text-[10px] border-b-2 border-slate-300">
              <tr>
                <th class="p-3">Order</th>
                <th class="p-3">Action</th>
                <th class="p-3">Direction</th>
                <th class="p-3">Source IP</th>
                <th class="p-3">Dest IP</th>
                <th class="p-3">Port</th>
                <th class="p-3">Proto</th>
                <th class="p-3">Reorder</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-200 font-mono">
              {rules.map((rule, idx) => {
                const isCurrentlyEvaluating = evaluatingRow === idx;
                const isFinalMatch = evaluationResult?.matchedRule?.id === rule.id;

                let rowBg = 'bg-white hover:bg-slate-50';
                if (isCurrentlyEvaluating) {
                  rowBg = 'bg-amber-100/90 font-black border-2 border-amber-400 animate-pulse';
                } else if (isFinalMatch) {
                  rowBg = rule.action === 'ALLOW' 
                    ? 'bg-emerald-100 font-black text-emerald-950 border-2 border-emerald-500 shadow-sm'
                    : 'bg-rose-100 font-black text-rose-950 border-2 border-rose-500 shadow-sm';
                }

                return (
                  <tr key={rule.id} class={`transition-colors ${rowBg}`}>
                    {/* Order / Line # */}
                    <td class="p-3 font-bold font-sans">
                      <div class="flex items-center gap-1.5">
                        <span class="w-6 h-6 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-black text-[11px]">
                          {idx + 1}
                        </span>
                        <span class="text-slate-400 text-[10px]">Rule {rule.ruleNumber}</span>
                      </div>
                    </td>

                    {/* Action */}
                    <td class="p-3 font-sans">
                      <span class={`px-2.5 py-1 rounded-lg text-xs font-black uppercase inline-flex items-center gap-1 ${
                        rule.action === 'ALLOW' 
                          ? 'bg-emerald-200 text-emerald-900' 
                          : 'bg-rose-200 text-rose-900'
                      }`}>
                        {rule.action === 'ALLOW' ? <ShieldCheck class="w-3.5 h-3.5" /> : <ShieldAlert class="w-3.5 h-3.5" />}
                        <span>{rule.action}</span>
                      </span>
                    </td>

                    {/* Direction */}
                    <td class="p-3 font-sans font-extrabold text-slate-700">
                      {rule.direction}
                    </td>

                    {/* Source IP */}
                    <td class="p-3 text-slate-800">{rule.sourceIp}</td>

                    {/* Dest IP */}
                    <td class="p-3 text-slate-800">{rule.destIp}</td>

                    {/* Port */}
                    <td class="p-3 font-black text-indigo-700">{rule.port}</td>

                    {/* Protocol */}
                    <td class="p-3 font-bold text-slate-600">{rule.protocol}</td>

                    {/* Move Up/Down Controls */}
                    <td class="p-3">
                      <div class="flex items-center gap-1">
                        <button
                          onClick={() => moveRuleUp(idx)}
                          disabled={idx === 0 || isSimulating}
                          class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 active:scale-95 transition-all"
                          title="Move Rule Up (Higher Priority)"
                        >
                          <ArrowUp class="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveRuleDown(idx)}
                          disabled={idx === rules.length - 1 || isSimulating}
                          class="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 disabled:opacity-30 active:scale-95 transition-all"
                          title="Move Rule Down (Lower Priority)"
                        >
                          <ArrowDown class="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* PERMANENT INVISIBLE IMPLICIT DENY ROW */}
              <tr class={`transition-colors ${
                evaluatingRow === 'implicit_deny'
                  ? 'bg-rose-600 text-white font-black animate-pulse'
                  : 'bg-rose-50/70 text-rose-900'
              }`}>
                <td class="p-3 font-bold font-sans">
                  <div class="flex items-center gap-1.5">
                    <span class="w-6 h-6 rounded-full bg-rose-200 text-rose-900 flex items-center justify-center font-black text-[11px]">
                      99
                    </span>
                    <span class="text-[10px] font-black uppercase text-rose-700">Implicit Deny</span>
                  </div>
                </td>
                <td class="p-3 font-sans">
                  <span class="px-2.5 py-1 rounded-lg text-xs font-black uppercase bg-rose-200 text-rose-900 inline-flex items-center gap-1">
                    <XCircle class="w-3.5 h-3.5" />
                    <span>DENY</span>
                  </span>
                </td>
                <td class="p-3 font-sans font-bold">ANY</td>
                <td class="p-3">ANY</td>
                <td class="p-3">ANY</td>
                <td class="p-3">ANY</td>
                <td class="p-3">ANY</td>
                <td class="p-3 text-[10px] italic opacity-80 font-sans">
                  (Always at bottom)
                </td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Live Evaluation Result Banner */}
        {evaluationResult && (
          <div class={`rounded-2xl p-5 border-2 shadow-md space-y-2 animate-scaleUp ${
            evaluationResult.action === 'ALLOW'
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-rose-50 border-rose-400 text-rose-950'
          }`}>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2 font-black text-base">
                {evaluationResult.action === 'ALLOW' ? (
                  <CheckCircle2 class="w-6 h-6 text-emerald-600" />
                ) : (
                  <XCircle class="w-6 h-6 text-rose-600" />
                )}
                <span>Verdict: PACKET {evaluationResult.action}ED!</span>
              </div>

              <span class="text-xs font-bold px-3 py-1 rounded-full bg-white/70 shadow-xs">
                {evaluationResult.isImplicitDeny ? 'Hit Invisible Rule 99' : 'First Match Executed'}
              </span>
            </div>

            <p class="text-xs sm:text-sm font-semibold leading-relaxed">
              {evaluationResult.reason}
            </p>
          </div>
        )}

      </div>

      {/* CompTIA Exam Tip Box */}
      <div class="bg-indigo-50 border-3 border-indigo-200 rounded-3xl p-6 shadow-sm space-y-2 text-indigo-950">
        <div class="flex items-center gap-2 font-black text-base text-indigo-900">
          <Sparkles class="w-5 h-5 text-indigo-600" />
          <span>CompTIA Security+ Exam Trap: Rule Ordering</span>
        </div>
        <p class="text-xs sm:text-sm font-medium leading-relaxed">
          Try moving Rule 3 (DENY Telnet 23) to the very top using the ⬆️ arrow. Notice how Telnet is blocked immediately.
          Now imagine someone placed a generic <code>DENY INBOUND ANY ANY</code> at Line 1 — it would kill ALL customer web traffic and admin access instantly!
          <strong>CompTIA takeaway:</strong> Place specific permit rules at the top, and let broad drop rules or Implicit Deny clean up the bottom!
        </p>
      </div>

    </div>
  );
}
