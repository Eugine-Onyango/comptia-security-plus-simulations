import React, { useState } from 'react';
import { ArrowLeft, Shield, Play, ListOrdered, Wrench, Sparkles, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import TcpHandshakeAnimation from './firewall/TcpHandshakeAnimation';
import AclRuleTableSimulator from './firewall/AclRuleTableSimulator';
import FirewallPbqChallenge from './firewall/FirewallPbqChallenge';
import LinuxFirewallSandbox from './firewall/LinuxFirewallSandbox';
import WafVsNgfwComparison from './firewall/WafVsNgfwComparison';
import { FIREWALL_VOCAB } from './firewall/firewallData';
import { sounds } from '../../utils/audio';

export default function FirewallStudioSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('handshake'); // 'handshake', 'acl_table', 'pbq'
  const [showVocab, setShowVocab] = useState(false);

  const handleTabChange = (tab) => {
    sounds.playPop();
    setActiveTab(tab);
  };

  const toggleVocab = () => {
    sounds.playPop();
    setShowVocab(!showVocab);
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div class="flex items-center justify-between">
        <button
          onClick={onBack}
          class="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full font-black text-xs">
            CompTIA Security+ SY0-701 • Firewall & ACL Live Studio
          </span>
        </div>
      </div>

      {/* Main Studio Title Card */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-2">
        <div class="flex items-center justify-between flex-wrap gap-4">
          <div class="flex items-center gap-3">
            <span class="text-4xl">🛡️🚧</span>
            <div>
              <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                The Firewall Security Gate & ACL Studio
              </h1>
              <p class="text-slate-600 font-medium text-xs sm:text-base">
                Master TCP handshakes (<code>SYN</code>, <code>SYN-ACK</code>, <code>ACK</code>), stateful inspection tables, rule ordering (<strong>First Match Wins</strong>), and <strong>Implicit Deny</strong>!
              </p>
            </div>
          </div>

          <button
            onClick={toggleVocab}
            class="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-950 border-2 border-amber-300 rounded-2xl font-extrabold text-xs transition-all active:scale-95 flex items-center gap-2"
          >
            <BookOpen class="w-4 h-4 text-amber-700" />
            <span>{showVocab ? 'Hide Firewall Cheat Sheet' : 'Quick Firewall Cheat Sheet 📖'}</span>
            {showVocab ? <ChevronUp class="w-4 h-4" /> : <ChevronDown class="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Expandable Cheat Sheet Drawer */}
      {showVocab && (
        <div class="bg-white rounded-3xl p-6 border-3 border-amber-200 shadow-lg space-y-4 animate-scaleUp">
          <div class="flex items-center gap-2 font-black text-base text-slate-900">
            <Sparkles class="w-5 h-5 text-amber-500" />
            <span>Firewall Core Vocabulary (Zero Jargon)</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FIREWALL_VOCAB.map((v, i) => (
              <div key={i} class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3.5 space-y-1.5 text-xs">
                <div class="flex items-center gap-1.5 font-black text-slate-900 text-sm">
                  <span>{v.icon}</span>
                  <span>{v.term}</span>
                </div>
                <p class="text-slate-700 font-bold">{v.plainMeaning}</p>
                <p class="text-slate-500 italic">Analogy: {v.analogy}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mode Navigation Tabs */}
      <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        
        {/* Tab 1: TCP Handshake */}
        <button
          onClick={() => handleTabChange('handshake')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 ${
            activeTab === 'handshake'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Play class="w-4 h-4 fill-current" />
          <span>1. The TCP Handshake Ping-Pong Court 🏓</span>
        </button>

        {/* Tab 2: ACL Rule Table */}
        <button
          onClick={() => handleTabChange('acl_table')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 ${
            activeTab === 'acl_table'
              ? 'bg-amber-500 border-amber-600 text-white shadow-lg shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <ListOrdered class="w-4 h-4" />
          <span>2. Interactive ACL Rule Table (Top-to-Bottom) 📋</span>
        </button>

        {/* Tab 3: PBQ Troubleshooter */}
        <button
          onClick={() => handleTabChange('pbq')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 cursor-pointer ${
            activeTab === 'pbq'
              ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg shadow-emerald-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Wrench className="w-4 h-4" />
          <span>3. Fix the Broken Firewall (CompTIA PBQ Challenge) 🔧</span>
        </button>

        {/* Tab 4: Linux Firewall Sandbox (iptables, ufw, firewalld) */}
        <button
          onClick={() => handleTabChange('linux_firewalls')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 cursor-pointer ${
            activeTab === 'linux_firewalls'
              ? 'bg-amber-500 border-amber-600 text-slate-950 shadow-lg shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <span>🐧 4. Linux Firewall Sandbox (iptables • ufw • firewalld) ⚡</span>
        </button>

        {/* Tab 5: Packet Filter vs. NGFW vs. WAF */}
        <button
          onClick={() => handleTabChange('waf_ngfw')}
          className={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 cursor-pointer ${
            activeTab === 'waf_ngfw'
              ? 'bg-purple-600 border-purple-700 text-white shadow-lg shadow-purple-200 scale-105'
              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
          }`}
        >
          <span>🔬 5. Packet Filter vs. NGFW vs. WAF (Who Catches What?) 🛡️</span>
        </button>

      </div>

      {/* Main Tab Content */}
      <div className="min-h-[500px]">
        {activeTab === 'handshake' && <TcpHandshakeAnimation />}
        {activeTab === 'acl_table' && <AclRuleTableSimulator />}
        {activeTab === 'pbq' && <FirewallPbqChallenge />}
        {activeTab === 'linux_firewalls' && <LinuxFirewallSandbox />}
        {activeTab === 'waf_ngfw' && <WafVsNgfwComparison />}
      </div>

    </div>
  );
}
