import React, { useState } from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  ShieldAlert, 
  Layers, 
  Play, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  RotateCcw, 
  Radio, 
  Save, 
  RefreshCw,
  FolderLock,
  ArrowRight,
  Server,
  Lock,
  Flame
} from 'lucide-react';
import { sounds } from '../../../utils/audio';
import { 
  IPTABLES_CHAINS, 
  IPTABLES_TARGETS, 
  DEFAULT_IPTABLES_RULES, 
  UFW_DEFAULT_CONFIG, 
  FIREWALLD_ZONES, 
  LINUX_FIREWALL_PBQ 
} from './linuxFirewallData';

export default function LinuxFirewallSandbox() {
  const [activeLinuxTab, setActiveLinuxTab] = useState('iptables'); // 'iptables', 'ufw', 'firewalld', 'pbq'

  // IPTABLES State
  const [iptablesRules, setIptablesRules] = useState(DEFAULT_IPTABLES_RULES);
  const [newChain, setNewChain] = useState('INPUT');
  const [newProto, setNewProto] = useState('tcp');
  const [newSrc, setNewSrc] = useState('0.0.0.0/0');
  const [newDport, setNewDport] = useState('80');
  const [newTarget, setNewTarget] = useState('ACCEPT');
  const [selectedIptablesRule, setSelectedIptablesRule] = useState(null);

  // UFW State
  const [ufwStatus, setUfwStatus] = useState(UFW_DEFAULT_CONFIG.status);
  const [ufwIncoming, setUfwIncoming] = useState(UFW_DEFAULT_CONFIG.incoming);
  const [ufwOutgoing, setUfwOutgoing] = useState(UFW_DEFAULT_CONFIG.outgoing);
  const [ufwRules, setUfwRules] = useState(UFW_DEFAULT_CONFIG.rules);
  const [ufwPortInput, setUfwPortInput] = useState('80/tcp');
  const [ufwFromInput, setUfwFromInput] = useState('Anywhere');
  const [ufwActionInput, setUfwActionInput] = useState('ALLOW');

  // FIREWALLD State
  const [activeZone, setActiveZone] = useState('public');
  const [zoneServices, setZoneServices] = useState({
    public: ['ssh', 'dhcpv6-client'],
    dmz: ['ssh', 'https', 'http'],
    internal: ['ssh', 'mdns', 'samba-client'],
    trusted: ['ALL']
  });
  const [isPermanentSaved, setIsPermanentSaved] = useState(false);
  const [isReloaded, setIsReloaded] = useState(false);
  const [serviceToAdd, setServiceToAdd] = useState('https');

  // PBQ State
  const [pbqAnswers, setPbqAnswers] = useState({});
  const [pbqSubmitted, setPbqSubmitted] = useState(false);
  const [pbqScore, setPbqScore] = useState(0);

  const [copiedCmd, setCopiedCmd] = useState(null);

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

  // Add iptables rule
  const handleAddIptablesRule = () => {
    sounds.playPop();
    const newRule = {
      id: `ip-${Date.now()}`,
      chain: newChain,
      proto: newProto,
      src: newSrc || '0.0.0.0/0',
      dport: newDport || '80',
      target: newTarget,
      cmd: `iptables -A ${newChain} -p ${newProto} -s ${newSrc || '0.0.0.0/0'} --dport ${newDport || '80'} -j ${newTarget}`,
      explanation: `Custom rule appended to ${newChain} chain targeting ${newTarget}.`
    };
    setIptablesRules([...iptablesRules, newRule]);
  };

  const handleDeleteIptablesRule = (id) => {
    sounds.playPop();
    setIptablesRules(iptablesRules.filter(r => r.id !== id));
  };

  // Add UFW rule
  const handleAddUfwRule = () => {
    sounds.playPop();
    const newRule = {
      num: ufwRules.length + 1,
      action: ufwActionInput,
      direction: 'IN',
      from: ufwFromInput,
      portProto: ufwPortInput,
      cmd: ufwFromInput === 'Anywhere'
        ? `sudo ufw ${ufwActionInput.toLowerCase()} ${ufwPortInput}`
        : `sudo ufw ${ufwActionInput.toLowerCase()} from ${ufwFromInput} to any port ${ufwPortInput.split('/')[0]} proto ${ufwPortInput.split('/')[1] || 'tcp'}`,
      explanation: `Custom rule allowing ${ufwPortInput} from ${ufwFromInput}.`
    };
    setUfwRules([...ufwRules, newRule]);
  };

  const handleDeleteUfwRule = (num) => {
    sounds.playPop();
    const filtered = ufwRules.filter(r => r.num !== num).map((r, i) => ({ ...r, num: i + 1 }));
    setUfwRules(filtered);
  };

  // Firewalld Add Service
  const handleAddFirewalldService = (service) => {
    sounds.playPop();
    const current = zoneServices[activeZone] || [];
    if (!current.includes(service)) {
      setZoneServices({
        ...zoneServices,
        [activeZone]: [...current, service]
      });
      setIsPermanentSaved(true);
      setIsReloaded(false);
    }
  };

  const handleReloadFirewalld = () => {
    sounds.playSuccess();
    setIsReloaded(true);
  };

  // PBQ Actions
  const handleSelectPbq = (qId, optionId) => {
    sounds.playPop();
    setPbqAnswers(prev => ({ ...prev, [qId]: optionId }));
  };

  const handleSubmitPbq = () => {
    let scoreCount = 0;
    LINUX_FIREWALL_PBQ.questions.forEach(q => {
      const selected = q.options.find(opt => opt.id === pbqAnswers[q.id]);
      if (selected && selected.isCorrect) {
        scoreCount++;
      }
    });

    setPbqScore(scoreCount);
    setPbqSubmitted(true);
    if (scoreCount === LINUX_FIREWALL_PBQ.questions.length) {
      sounds.playSuccess();
    } else {
      sounds.playAlert();
    }
  };

  const handleResetPbq = () => {
    sounds.playPop();
    setPbqAnswers({});
    setPbqSubmitted(false);
    setScore(0);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Sub-Tabs for Linux Firewalls */}
      <div className="bg-slate-900 rounded-3xl p-3 border-2 border-slate-800 flex items-center justify-between flex-wrap gap-3 shadow-md">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => { sounds.playPop(); setActiveLinuxTab('iptables'); }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeLinuxTab === 'iptables'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🐧 1. iptables Netfilter Sieve</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveLinuxTab('ufw'); }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeLinuxTab === 'ufw'
                ? 'bg-orange-600 text-white shadow-md shadow-orange-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🛡️ 2. ufw (Ubuntu / Debian)</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveLinuxTab('firewalld'); }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeLinuxTab === 'firewalld'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>🏰 3. firewalld (RHEL / CentOS Zones)</span>
          </button>

          <button
            onClick={() => { sounds.playPop(); setActiveLinuxTab('pbq'); }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
              activeLinuxTab === 'pbq'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <span>📝 4. CompTIA Linux PBQ Drill</span>
          </button>
        </div>

        <span className="text-[11px] font-mono text-slate-400 px-3 py-1 bg-slate-950 rounded-xl border border-slate-800">
          CompTIA SY0-701 Domain 4.3 Host Hardening
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 1. IPTABLES INTERACTIVE SIEVE */}
      {/* ========================================================================= */}
      {activeLinuxTab === 'iptables' && (
        <div className="space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-amber-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-amber-100 text-amber-950 font-black text-xs rounded-full border border-amber-300">
                Netfilter Packet Filtering Architecture
              </span>
              <span className="text-xs font-bold text-slate-500">
                Chains • Default Policies • Target Verbs
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              iptables: The 3 Default Chains & The DROP vs. REJECT Dilemma
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <code>iptables</code> passes incoming packets through sequential rules in the <strong>INPUT</strong> chain. If a rule specifies <strong>DROP</strong>, the packet vanishes silently (making ports appear <em>Filtered</em> in Nmap). If it specifies <strong>REJECT</strong>, an explicit TCP RST is returned (making ports appear <em>Closed</em>).
            </p>
          </div>

          {/* The 3 Chains Visual Board */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {IPTABLES_CHAINS.map((c) => (
              <div key={c.chain} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 text-slate-200 space-y-2 shadow-sm flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30">
                      Chain: {c.chain}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">Default: DROP</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{c.purpose}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-[11px] text-amber-200/90 font-sans">
                    <strong>Security+ Takeaway:</strong> {c.secPlusNote}
                  </div>
                  {c.kenyanMetaphor && (
                    <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200">
                      <strong className="block text-[10px] uppercase text-amber-400">🇰🇪 Nairobi Analogy:</strong>
                      <span className="italic">{c.kenyanMetaphor}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Targets Comparison Card (ACCEPT vs DROP vs REJECT) */}
          <div className="bg-slate-900 rounded-3xl p-5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-black uppercase text-amber-400 tracking-wider">
                Target Verbs: What Happens When a Packet Matches? (-j TARGET)
              </span>
              <span className="text-[11px] text-slate-400 font-mono">CompTIA Port Scanning Behavior</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {IPTABLES_TARGETS.map((t) => (
                <div key={t.target} className="bg-slate-950 rounded-2xl p-4 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-sm text-white">{t.target}</span>
                      <span className="text-[10px] font-black uppercase">{t.badge}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{t.description}</p>
                    <div className="text-[10px] font-mono text-indigo-300 bg-indigo-950/40 p-1.5 rounded-lg border border-indigo-800/40">
                      {t.portScanEffect}
                    </div>
                  </div>

                  {t.kenyanMetaphor && (
                    <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[11px] text-amber-200 mt-2">
                      <strong className="block text-[10px] uppercase text-amber-400">🇰🇪 Kenyan Analogy:</strong>
                      <span className="italic">{t.kenyanMetaphor}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Rule Builder */}
          <div className="bg-slate-950 rounded-3xl p-6 border-3 border-amber-500 shadow-xl space-y-4">
            <span className="text-xs font-black uppercase text-amber-400 tracking-wider block flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              <span>Interactive iptables Command Generator</span>
            </span>

            {/* Form Controls */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Chain (-A)</label>
                <select
                  value={newChain}
                  onChange={(e) => setNewChain(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                >
                  <option value="INPUT">INPUT</option>
                  <option value="OUTPUT">OUTPUT</option>
                  <option value="FORWARD">FORWARD</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Protocol (-p)</label>
                <select
                  value={newProto}
                  onChange={(e) => setNewProto(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                >
                  <option value="tcp">tcp</option>
                  <option value="udp">udp</option>
                  <option value="icmp">icmp</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Source (-s)</label>
                <input
                  type="text"
                  value={newSrc}
                  onChange={(e) => setNewSrc(e.target.value)}
                  placeholder="0.0.0.0/0 or IP"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Port (--dport)</label>
                <input
                  type="text"
                  value={newDport}
                  onChange={(e) => setNewDport(e.target.value)}
                  placeholder="e.g. 22, 80, 443"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Target (-j)</label>
                <select
                  value={newTarget}
                  onChange={(e) => setNewTarget(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                >
                  <option value="ACCEPT">ACCEPT</option>
                  <option value="DROP">DROP (Stealth)</option>
                  <option value="REJECT">REJECT (RST/ICMP)</option>
                </select>
              </div>
            </div>

            {/* Generated Command Preview & Add Button */}
            <div className="pt-2 flex items-center justify-between flex-wrap gap-3 border-t border-slate-800">
              <div className="font-mono text-xs text-amber-300 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
                sudo iptables -A {newChain} -p {newProto} -s {newSrc || '0.0.0.0/0'} --dport {newDport || '80'} -j {newTarget}
              </div>

              <button
                onClick={handleAddIptablesRule}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span>Append to Active Ruleset</span>
              </button>
            </div>

            {/* Current iptables Rules Table */}
            <div className="space-y-2 pt-4">
              <span className="text-xs font-black uppercase text-slate-400 tracking-wider block">
                Active Kernel Table: `sudo iptables -L -v -n --line-numbers`
              </span>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-slate-300">
                  <thead className="bg-slate-950 text-[10px] text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">Num</th>
                      <th className="p-2.5">Chain</th>
                      <th className="p-2.5">Target</th>
                      <th className="p-2.5">Proto</th>
                      <th className="p-2.5">Source</th>
                      <th className="p-2.5">Destination Port</th>
                      <th className="p-2.5">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {iptablesRules.map((rule, idx) => (
                      <tr key={rule.id} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-2.5 text-slate-500">{idx + 1}</td>
                        <td className="p-2.5 text-amber-300 font-bold">{rule.chain}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            rule.target === 'ACCEPT' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600' :
                            rule.target === 'DROP' ? 'bg-slate-800 text-slate-400 border border-slate-600' :
                            'bg-rose-900/60 text-rose-300 border border-rose-600'
                          }`}>
                            {rule.target}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-400">{rule.proto}</td>
                        <td className="p-2.5 text-slate-300">{rule.src}</td>
                        <td className="p-2.5 text-slate-300">Port {rule.dport}</td>
                        <td className="p-2.5">
                          <button
                            onClick={() => handleDeleteIptablesRule(rule.id)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title="Delete rule"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Target Breakdown: DROP vs REJECT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {IPTABLES_TARGETS.map((t) => (
                <div key={t.target} className="bg-slate-900 rounded-xl p-3 border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between font-black">
                    <span className="text-white">{t.target}</span>
                    <span className="text-[10px] text-slate-400">{t.badge}</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{t.description}</p>
                  <div className="text-[10px] text-amber-300/80 font-mono pt-1">
                    {t.portScanEffect}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. UFW (UNCOMPLICATED FIREWALL) */}
      {/* ========================================================================= */}
      {activeLinuxTab === 'ufw' && (
        <div className="space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-orange-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-orange-100 text-orange-950 font-black text-xs rounded-full border border-orange-300">
                Ubuntu & Debian Standard Host Firewall
              </span>
              <span className="text-xs font-bold text-slate-500">
                Default Deny Incoming • Numbered Ordering
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              ufw: Intuitive Rule Syntax & Default Policy Hardening
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <code>ufw</code> was built to simplify <code>iptables</code> without writing raw packet-matching chains. CompTIA Security+ questions test establishing the default policy (<code>sudo ufw default deny incoming</code>) and querying numbered status (<code>sudo ufw status numbered</code>).
            </p>
          </div>

          {/* Interactive UFW Control Console */}
          <div className="bg-slate-950 rounded-3xl p-6 border-3 border-orange-500 shadow-xl space-y-6">
            
            {/* Global Status Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${ufwStatus === 'active' ? 'bg-emerald-500 animate-ping' : 'bg-slate-500'}`} />
                <div>
                  <span className="text-xs font-black uppercase text-slate-400 block">Status:</span>
                  <span className="text-sm font-black text-white font-mono uppercase">{ufwStatus} (active on boot)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block text-[10px]">Default Incoming:</span>
                  <span className="text-rose-400 font-bold uppercase">{ufwIncoming} (DROP)</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Default Outgoing:</span>
                  <span className="text-emerald-400 font-bold uppercase">{ufwOutgoing} (PERMIT)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    sounds.playPop();
                    setUfwIncoming(ufwIncoming === 'deny' ? 'allow' : 'deny');
                  }}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all active:scale-95 cursor-pointer border border-slate-700"
                >
                  Toggle Default Inbound Policy
                </button>
              </div>
            </div>

            {/* Quick Rule Form */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Action</label>
                <select
                  value={ufwActionInput}
                  onChange={(e) => setUfwActionInput(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                >
                  <option value="ALLOW">ALLOW</option>
                  <option value="DENY">DENY</option>
                  <option value="REJECT">REJECT</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">Port / Proto</label>
                <input
                  type="text"
                  value={ufwPortInput}
                  onChange={(e) => setUfwPortInput(e.target.value)}
                  placeholder="e.g. 22/tcp or 443"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold">From (Source)</label>
                <input
                  type="text"
                  value={ufwFromInput}
                  onChange={(e) => setUfwFromInput(e.target.value)}
                  placeholder="Anywhere or Subnet"
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-mono"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleAddUfwRule}
                  className="w-full py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add UFW Rule</span>
                </button>
              </div>
            </div>

            {/* Numbered Status Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-black uppercase tracking-wider">
                  `sudo ufw status numbered`
                </span>
                <span>Evaluate top to bottom</span>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-x-auto">
                <table className="w-full text-left font-mono text-xs text-slate-300">
                  <thead className="bg-slate-950 text-[10px] text-slate-400 uppercase border-b border-slate-800">
                    <tr>
                      <th className="p-2.5">Rule #</th>
                      <th className="p-2.5">To (Port/Service)</th>
                      <th className="p-2.5">Action</th>
                      <th className="p-2.5">From</th>
                      <th className="p-2.5">Generated Linux Command</th>
                      <th className="p-2.5">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {ufwRules.map((rule) => (
                      <tr key={rule.num} className="hover:bg-slate-800/50 transition-colors">
                        <td className="p-2.5 text-orange-400 font-black">[{rule.num}]</td>
                        <td className="p-2.5 text-white font-bold">{rule.portProto}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            rule.action === 'ALLOW' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-600' :
                            'bg-rose-900/60 text-rose-300 border border-rose-600'
                          }`}>
                            {rule.action} IN
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-300">{rule.from}</td>
                        <td className="p-2.5 text-slate-400 text-[11px] truncate max-w-xs">{rule.cmd}</td>
                        <td className="p-2.5">
                          <button
                            onClick={() => handleDeleteUfwRule(rule.num)}
                            className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                            title="sudo ufw delete [num]"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. FIREWALLD (ZONES & PERSISTENCE) */}
      {/* ========================================================================= */}
      {activeLinuxTab === 'firewalld' && (
        <div className="space-y-6">
          
          {/* Header Card */}
          <div className="bg-white rounded-3xl p-6 border-3 border-rose-300 shadow-md space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-rose-100 text-rose-950 font-black text-xs rounded-full border border-rose-300">
                RHEL, CentOS, Rocky Linux & Fedora Standard
              </span>
              <span className="text-xs font-bold text-slate-500">
                Network Zones • The --permanent Reload Trap
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              firewalld: Zone Architecture & The #1 CompTIA Exam Trap
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              <code>firewalld</code> groups interfaces into <strong>Zones</strong> based on trust level (e.g. <em>public</em>, <em>dmz</em>, <em>internal</em>, <em>trusted</em>). 
              <strong className="text-rose-600 block mt-1">⚠️ CompTIA Exam Trap:</strong> If you add a rule without <code>--permanent</code>, it is runtime only and vanishes after reboot! If you add with <code>--permanent</code>, you MUST execute <code>firewall-cmd --reload</code> before it becomes active in memory!
            </p>

            {/* Kenyan Everyday Metaphor */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-3.5 text-xs sm:text-sm text-amber-950 font-medium flex items-start gap-2.5">
              <span className="text-xl shrink-0">🇰🇪</span>
              <div>
                <strong className="text-amber-900 block mb-0.5">Kenyan Everyday Analogy (The Estate Secretary & The Watchman):</strong>
                <p className="italic text-amber-900 leading-relaxed">
                  Adding a rule with <code>--permanent</code> is like writing a new estate visitor rule in the Chairman's official ledger book in the office. But the Maasai watchman at the main barrier is still reading his old paper clipboard! Until you execute <code>firewall-cmd --reload</code> (handing the watchman the updated clipboard), the gate continues enforcing yesterday's rules.
                </p>
              </div>
            </div>
          </div>

          {/* Zone Switchboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FIREWALLD_ZONES.map((zone) => {
              const isSelected = activeZone === zone.name;

              return (
                <button
                  key={zone.name}
                  onClick={() => { sounds.playPop(); setActiveZone(zone.name); }}
                  className={`p-4 rounded-2xl border-2 text-left transition-all space-y-2 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-rose-950/80 border-rose-500 text-white ring-2 ring-rose-500/40 shadow-lg scale-102'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-black uppercase text-rose-400">
                        Zone: {zone.name}
                      </span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-rose-400" />}
                    </div>

                    <div className="text-xs font-bold text-white">{zone.trustLevel}</div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{zone.desc}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="text-[10px] font-mono text-slate-400">
                      Active Services: <span className="text-rose-300">{zoneServices[zone.name]?.join(', ') || 'none'}</span>
                    </div>
                    {zone.kenyanMetaphor && (
                      <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-[10px] text-amber-200">
                        <strong className="block text-[9px] uppercase text-amber-400">🇰🇪 Street Analogy:</strong>
                        <span className="italic">{zone.kenyanMetaphor}</span>
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Persistence & Reload Simulation */}
          <div className="bg-slate-950 rounded-3xl p-6 border-3 border-rose-500 shadow-xl space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-black uppercase text-rose-400 tracking-wider flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                <span>Zone Management & Reload Verification</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                Target Zone: <strong>{activeZone}</strong>
              </span>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 flex-wrap">
              <button
                onClick={() => handleAddFirewalldService('https')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                + Add Service HTTPS (`--add-service=https --permanent`)
              </button>

              <button
                onClick={() => handleAddFirewalldService('mysql')}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs border border-slate-700 transition-all active:scale-95 cursor-pointer"
              >
                + Add Service MySQL (`--add-service=mysql --permanent`)
              </button>

              <button
                onClick={handleReloadFirewalld}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-900/50 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 ml-auto"
              >
                <RefreshCw className="w-4 h-4" />
                <span>firewall-cmd --reload ⚡</span>
              </button>
            </div>

            {/* Persistence State Readout */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] block">Disk XML Configuration (`/etc/firewalld/zones/`):</span>
                <div className="text-emerald-400 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Saved with `--permanent` (Survives Reboot)</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-[10px] block">Live Kernel State (Active in Memory):</span>
                <div className={`font-bold flex items-center gap-1.5 ${
                  isReloaded ? 'text-emerald-400' : 'text-amber-400 animate-pulse'
                }`}>
                  {isReloaded ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Synchronized via `firewall-cmd --reload`! Active Now.</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-4 h-4" />
                      <span>Pending reload! Rules on disk not active until reloaded!</span>
                    </>
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. COMPTIA LINUX FIREWALL PBQ DRILL */}
      {/* ========================================================================= */}
      {activeLinuxTab === 'pbq' && (
        <div className="space-y-6">
          
          {/* PBQ Scenario Card */}
          <div className="bg-gradient-to-r from-emerald-700 to-teal-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/20 text-emerald-200 font-black text-xs rounded-full backdrop-blur-md">
                CompTIA Security+ Performance-Based Question (PBQ)
              </span>
              <span className="text-xs font-mono text-emerald-300">
                Target: {LINUX_FIREWALL_PBQ.scenario.host}
              </span>
            </div>

            <h3 className="text-2xl font-black">{LINUX_FIREWALL_PBQ.scenario.title}</h3>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed max-w-4xl">
              {LINUX_FIREWALL_PBQ.scenario.vulnerabilityAlert}
            </p>
            <div className="p-3 bg-black/30 rounded-2xl border border-white/20 text-xs font-bold text-yellow-300">
              Objective: {LINUX_FIREWALL_PBQ.scenario.objective}
            </div>
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {LINUX_FIREWALL_PBQ.questions.map((q) => {
              const selectedOptId = pbqAnswers[q.id];
              const isAnswered = !!selectedOptId;
              const selectedOpt = q.options.find(o => o.id === selectedOptId);
              const isCorrect = selectedOpt?.isCorrect;

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border-2 space-y-3 transition-all ${
                    pbqSubmitted
                      ? isCorrect
                        ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950'
                        : 'bg-rose-50/70 border-rose-400 text-rose-950'
                      : isAnswered
                      ? 'bg-slate-50 border-emerald-500 shadow-sm'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-black text-xs sm:text-sm text-slate-900 leading-snug">
                      {q.title}
                    </span>
                    {pbqSubmitted && (
                      <span className={`text-xs font-black px-2 py-0.5 rounded-full ${
                        isCorrect ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
                      }`}>
                        {isCorrect ? 'PASS ✓' : 'FAIL ✗'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium">{q.prompt}</p>

                  {/* Options */}
                  <div className="space-y-1.5 pt-1">
                    {q.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectPbq(q.id, opt.id)}
                        disabled={pbqSubmitted}
                        className={`w-full p-2.5 rounded-xl text-xs text-left font-mono font-bold transition-all flex items-center justify-between cursor-pointer ${
                          selectedOptId === opt.id
                            ? pbqSubmitted
                              ? isCorrect
                                ? 'bg-emerald-600 text-white'
                                : 'bg-rose-600 text-white'
                              : 'bg-emerald-600 text-white shadow-md'
                            : 'bg-white border border-slate-200 hover:border-slate-300 text-slate-700'
                        }`}
                      >
                        <span className="truncate pr-2">{opt.cmd}</span>
                        {selectedOptId === opt.id && <Check className="w-3.5 h-3.5 shrink-0" />}
                      </button>
                    ))}
                  </div>

                  {/* Feedback on submit */}
                  {pbqSubmitted && selectedOpt && (
                    <p className="text-[11px] text-slate-600 border-t border-slate-200 pt-2 leading-relaxed font-sans">
                      <strong>Analysis:</strong> {selectedOpt.feedback}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Submit Action Bar */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 flex items-center justify-between flex-wrap gap-4 shadow-sm">
            <div className="text-xs text-slate-500 font-medium">
              Completed {Object.keys(pbqAnswers).length} of {LINUX_FIREWALL_PBQ.questions.length} PBQ steps
            </div>

            <div className="flex items-center gap-3">
              {pbqSubmitted && (
                <button
                  onClick={handleResetPbq}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retry Drill</span>
                </button>
              )}

              <button
                onClick={handleSubmitPbq}
                disabled={Object.keys(pbqAnswers).length < LINUX_FIREWALL_PBQ.questions.length}
                className="px-6 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all active:scale-95 cursor-pointer disabled:opacity-50 flex items-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify Hardening Configuration ⚡</span>
              </button>
            </div>
          </div>

          {/* PBQ Success Banner */}
          {pbqSubmitted && pbqScore === LINUX_FIREWALL_PBQ.questions.length && (
            <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-500 flex items-center justify-between flex-wrap gap-4 text-emerald-950 animate-fadeIn shadow-md">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🏆🛡️</span>
                <div>
                  <h4 className="font-black text-base">Perfect PBQ Score: Linux Host Hardened!</h4>
                  <p className="text-xs text-emerald-800">
                    You properly implemented Implicit Deny, Least-Privilege SSH access, secure HTTPS, and avoided the firewalld `--permanent` trap.
                  </p>
                </div>
              </div>

              <span className="px-4 py-1.5 rounded-xl bg-emerald-600 text-white font-black text-xs">
                Score: 4/4 (100%)
              </span>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
