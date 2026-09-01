import React from 'react';
import { ArrowLeft, Shield, PlayCircle, Cloud, Sparkles, Server, Lock, Layers, Gauge, Wind, ShieldCheck, Key, Radio, FileText, Zap, Building } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Domain3Page({ onBack, onSelectTopic }) {
  const handleSelectCloud = () => {
    sounds.playSuccess();
    onSelectTopic('cloud_infrastructures');
  };

  const handleSelectNetworkConcepts = () => {
    sounds.playSuccess();
    onSelectTopic('network_concepts');
  };

  const handleSelectOtherInfra = () => {
    sounds.playSuccess();
    onSelectTopic('other_infra');
  };

  const handleSelectInfraConsiderations = () => {
    sounds.playSuccess();
    onSelectTopic('infra_considerations');
  };

  const handleSelectSecureInfra = () => {
    sounds.playSuccess();
    onSelectTopic('secure_infra');
  };

  const handleSelectAaaServers = () => {
    sounds.playSuccess();
    onSelectTopic('aaa_servers');
  };

  const handleSelectNetworkAppliances = () => {
    sounds.playSuccess();
    onSelectTopic('network_appliances');
  };

  const handleSelectFirewallTypes = () => {
    sounds.playSuccess();
    onSelectTopic('firewall_types');
  };

  const handleSelectSecureComm = () => {
    sounds.playSuccess();
    onSelectTopic('secure_comm');
  };

  const handleSelectDataTypes = () => {
    sounds.playSuccess();
    onSelectTopic('data_types');
  };

  const handleSelectStatesOfData = () => {
    sounds.playSuccess();
    onSelectTopic('states_of_data');
  };

  const handleSelectProtectingData = () => {
    sounds.playSuccess();
    onSelectTopic('protecting_data');
  };

  const handleSelectResiliency = () => {
    sounds.playSuccess();
    onSelectTopic('resiliency');
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div class="flex items-center gap-3">
        <button
          onClick={onBack}
          class="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-sky-100 text-sky-900 border-2 border-sky-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to All Domains</span>
        </button>
      </div>

      {/* Header Banner */}
      <div class="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-sky-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md">
            <Shield class="w-4 h-4 text-sky-200" />
            <span>CompTIA Security+ • Domain 3.0</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            3.0 - Security Architecture
          </h1>
          <p class="text-sky-100 font-medium text-sm sm:text-base leading-relaxed">
            Explore cloud models, network architecture, SCADA control systems, IPsec VPN tunnels, SIEM log radar, 802.1X NAC, WAF firewalls, SASE cloud mesh, GDPR privacy protection, and AWS HA cloud resiliency!
          </p>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-sm shrink-0 flex items-center gap-3">
          <div class="text-3xl">🏛️</div>
          <div>
            <div class="text-xs font-bold text-sky-200 uppercase">Available Simulations</div>
            <div class="text-lg font-extrabold text-white">13 Active Simulation Modules!</div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div class="space-y-4">
        <h2 class="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <span>Select a Topic Simulation</span>
          <Sparkles class="w-5 h-5 text-sky-500" />
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ACTIVE SIMULATION: 3.1 - Cloud Infrastructures */}
          <div 
            onClick={handleSelectCloud}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ☁️
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 3.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  Cloud Infrastructures
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore the Shared Responsibility Matrix across <strong>IaaS</strong>, <strong>PaaS</strong>, <strong>SaaS</strong>, and <strong>FaaS (Serverless)</strong>, and see where the <strong>OS</strong> lives!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">IaaS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">PaaS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">SaaS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">FaaS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">OS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">API</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Launch Cloud Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">6 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.1 - Network Infrastructure Concepts */}
          <div 
            onClick={handleSelectNetworkConcepts}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🏢
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 3.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Network Concepts
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>VLAN</strong> isolation, <strong>SDN</strong> Data/Control/Management planes configured via <strong>SSH</strong> & <strong>APIs</strong>, and <strong>NAT</strong> translation!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">VLAN</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">SDN</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-xs font-bold">NAT</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-xs font-bold">SSH</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-xs font-bold">API</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Launch Network Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">5 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.1 - Other Infrastructure Concepts */}
          <div 
            onClick={handleSelectOtherInfra}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🏭
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 3.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Other Infrastructure
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore animated <strong>SCADA</strong> telemetry, <strong>ICS</strong> industrial machinery, <strong>RTOS</strong> real-time operating systems, <strong>IoT</strong> sensors, and <strong>HA</strong> failover!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">IoT</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">SCADA</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">ICS</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">RTOS</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">HA</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch Industrial Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">5 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.1 - Infrastructure Considerations */}
          <div 
            onClick={handleSelectInfraConsiderations}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ❄️
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 3.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  Infrastructure Considerations
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore animated data center <strong>HVAC</strong> cooling, <strong>UPS</strong> emergency battery discharge, server <strong>CPU</strong> workloads, and <strong>MTTR</strong> repair stopwatches!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">MTTR</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">HVAC</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">UPS</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">CPU</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Launch Climate Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">4 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.2 - Secure Infrastructures */}
          <div 
            onClick={handleSelectSecureInfra}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 3.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Secure Infrastructures
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore network layer <strong>IP</strong> addressing, <strong>IPsec</strong> cryptographic encryption, <strong>VPN</strong> tunnels, and Transport vs Tunnel mode packet headers!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">IP</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">IPsec</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">VPN</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch IPsec VPN Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">3 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.2 - AAA Directory & Port Security */}
          <div 
            onClick={handleSelectAaaServers}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔑
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 3.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  AAA Directory & Security
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore centralized <strong>RADIUS</strong> authentication, <strong>LDAP</strong> active directory lookups, <strong>TACACS+</strong> router admin controls, and 802.1X port security!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">RADIUS</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">LDAP</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">TACACS+</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch AAA Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">3 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.2 - Network Appliances & Port Security */}
          <div 
            onClick={handleSelectNetworkAppliances}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🚪
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 3.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Network Appliances
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>802.1X</strong> port gates, <strong>NAC</strong> posture checks, <strong>SIEM</strong> log correlation radar, <strong>SSH</strong>/<strong>RDP</strong>, <strong>QoS</strong> shapers, and <strong>SSL</strong> offloaders!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SIEM</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">802.1X</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">NAC</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">QoS</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">+8 More</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Launch Appliances Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">12 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.2 - Firewall Types */}
          <div 
            onClick={handleSelectFirewallTypes}
            class="group bg-white rounded-3xl p-6 border-4 border-rose-400 shadow-md hover:shadow-xl hover:border-rose-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-rose-600 uppercase tracking-wider">Section 3.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                  Firewall Types
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore Layer 7 <strong>WAF</strong> firewalls blocking <strong>SQL</strong> injection under <strong>PCI DSS</strong>, <strong>NGFW</strong> deep packet inspection, <strong>UTM</strong> all-in-one boxes, and <strong>CSU/DSU</strong> WAN links!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">WAF</span>
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">NGFW</span>
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">UTM</span>
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">PCI DSS</span>
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">+5 More</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-rose-700 font-extrabold text-base group-hover:text-rose-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform" />
                <span>Launch Firewalls Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-rose-100 rounded-full font-bold">9 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.2 - Secure Communication */}
          <div 
            onClick={handleSelectSecureComm}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ☁️
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 3.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  Secure Communication
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>SASE</strong> cloud security mesh, <strong>CASB</strong> SaaS policy brokers, <strong>DLP</strong> sensitive card scanners, <strong>ZTNA</strong> micro-segmentation, and <strong>SD-WAN</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">SASE</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">CASB</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">ZTNA</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">DLP</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">+9 More</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Launch Secure Comm Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">13 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.3 - Data Types and Classifications */}
          <div 
            onClick={handleSelectDataTypes}
            class="group bg-white rounded-3xl p-6 border-4 border-teal-400 shadow-md hover:shadow-xl hover:border-teal-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📂
              </div>

              <div>
                <span class="text-xs font-extrabold text-teal-600 uppercase tracking-wider">Section 3.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                  Data Classifications
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore structured data formats (<strong>CSV</strong>, <strong>XML</strong>, <strong>JSON</strong>), privacy redaction of <strong>PII</strong> and <strong>PHI</strong> health data, and legal <strong>NDA</strong> vaults!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-900 rounded text-xs font-bold">CSV</span>
                <span class="px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-900 rounded text-xs font-bold">XML</span>
                <span class="px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-900 rounded text-xs font-bold">JSON</span>
                <span class="px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-900 rounded text-xs font-bold">PII</span>
                <span class="px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-900 rounded text-xs font-bold">PHI</span>
                <span class="px-2 py-0.5 bg-teal-50 border border-teal-200 text-teal-900 rounded text-xs font-bold">NDA</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-teal-100 flex items-center justify-between text-teal-700 font-extrabold text-base group-hover:text-teal-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-teal-600 group-hover:scale-110 transition-transform" />
                <span>Launch Data Types Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-teal-100 rounded-full font-bold">6 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.3 - States of Data */}
          <div 
            onClick={handleSelectStatesOfData}
            class="group bg-white rounded-3xl p-6 border-4 border-cyan-400 shadow-md hover:shadow-xl hover:border-cyan-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-cyan-100 text-cyan-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔄
              </div>

              <div>
                <span class="text-xs font-extrabold text-cyan-600 uppercase tracking-wider">Section 3.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-cyan-600 transition-colors">
                  States of Data
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore Data at Rest (<strong>SSD</strong> & <strong>ACLs</strong>), Data in Transit (<strong>TLS</strong> & <strong>IPsec</strong> tunnels), and Data in Use (<strong>RAM</strong>, <strong>CPU</strong>, real-time <strong>GPS</strong>)!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-900 rounded text-xs font-bold">SSD</span>
                <span class="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-900 rounded text-xs font-bold">ACLs</span>
                <span class="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-900 rounded text-xs font-bold">TLS</span>
                <span class="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-900 rounded text-xs font-bold">IPsec</span>
                <span class="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-900 rounded text-xs font-bold">RAM</span>
                <span class="px-2 py-0.5 bg-cyan-50 border border-cyan-200 text-cyan-900 rounded text-xs font-bold">+2 More</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-cyan-100 flex items-center justify-between text-cyan-700 font-extrabold text-base group-hover:text-cyan-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-cyan-600 group-hover:scale-110 transition-transform" />
                <span>Launch States Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-cyan-100 rounded-full font-bold">7 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.3 - Protecting Data */}
          <div 
            onClick={handleSelectProtectingData}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 3.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  Protecting Data
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore the <strong>EU</strong> <strong>GDPR</strong> Right to be Forgotten shredder, Data Minimization principles, and privacy protections for <strong>PII</strong>, <strong>SSN</strong>, <strong>IP</strong>, and <strong>GPS</strong>!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">GDPR</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">EU</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">GPS</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">IP</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">PII</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">SSN</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Launch Protecting Data Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Acronyms</span>
            </div>
          </div>

          {/* ACTIVE SIMULATION: 3.4 - Resiliency */}
          <div 
            onClick={handleSelectResiliency}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full bg-amber-600 text-white font-extrabold text-xs shadow-sm">
                🌟 New Live Animation!
              </span>
            </div>

            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⚡
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 3.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  Resiliency & COOP
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Explore <strong>AWS</strong> Multi-AZ High Availability (<strong>HA</strong>) cluster auto-failover, <strong>OS</strong> replication, and <strong>COOP</strong> disaster recovery planning!
              </p>

              {/* Acronym Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">HA</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">OS</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">AWS</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">COOP</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Launch Resiliency Playground</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">4 Acronyms</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
