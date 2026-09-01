import React from 'react';
import { ArrowLeft, PlayCircle, Sparkles, Sliders, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/audio';

export default function Domain4Page({ onBack, onSelectTopic }) {
  const handleSelectSecureBaselines = () => {
    sounds.playSuccess();
    onSelectTopic('secure_baselines_mcq');
  };

  const handleSelectHardeningTargets = () => {
    sounds.playSuccess();
    onSelectTopic('hardening_targets_mcq');
  };

  const handleSelectSecuringWirelessMobile = () => {
    sounds.playSuccess();
    onSelectTopic('securing_wireless_mobile_mcq');
  };

  const handleSelectWirelessSecuritySettings = () => {
    sounds.playSuccess();
    onSelectTopic('wireless_security_settings_mcq');
  };

  const handleSelectApplicationSecurity = () => {
    sounds.playSuccess();
    onSelectTopic('application_security_mcq');
  };

  const handleSelectAssetManagement = () => {
    sounds.playSuccess();
    onSelectTopic('asset_management_mcq');
  };

  const handleSelectVulnerabilityScanning = () => {
    sounds.playSuccess();
    onSelectTopic('vulnerability_scanning_mcq');
  };

  const handleSelectThreatIntelligence = () => {
    sounds.playSuccess();
    onSelectTopic('threat_intelligence_mcq');
  };

  const handleSelectPenetrationTesting = () => {
    sounds.playSuccess();
    onSelectTopic('penetration_testing_mcq');
  };

  const handleSelectPentestProcessDisclosure = () => {
    sounds.playSuccess();
    onSelectTopic('pentest_process_disclosure_mcq');
  };

  const handleSelectAnalyzingVulnerabilities = () => {
    sounds.playSuccess();
    onSelectTopic('analyzing_vulnerabilities_mcq');
  };

  const handleSelectVulnerabilityRemediation = () => {
    sounds.playSuccess();
    onSelectTopic('vulnerability_remediation_mcq');
  };

  const handleSelectSecurityMonitoring = () => {
    sounds.playSuccess();
    onSelectTopic('security_monitoring_mcq');
  };

  const handleSelectSecurityTools = () => {
    sounds.playSuccess();
    onSelectTopic('security_tools_mcq');
  };

  const handleSelectFirewalls = () => {
    sounds.playSuccess();
    onSelectTopic('firewalls_mcq');
  };

  const handleSelectWebFiltering = () => {
    sounds.playSuccess();
    onSelectTopic('web_filtering_mcq');
  };

  const handleSelectOsSecurity = () => {
    sounds.playSuccess();
    onSelectTopic('os_security_mcq');
  };

  const handleSelectSecureProtocols = () => {
    sounds.playSuccess();
    onSelectTopic('secure_protocols_mcq');
  };

  const handleSelectEmailSecurity = () => {
    sounds.playSuccess();
    onSelectTopic('email_security_mcq');
  };

  const handleSelectEndpointSecurity = () => {
    sounds.playSuccess();
    onSelectTopic('endpoint_security_mcq');
  };

  const handleSelectMonitoringData = () => {
    sounds.playSuccess();
    onSelectTopic('monitoring_data_mcq');
  };

  const handleSelectIam = () => {
    sounds.playSuccess();
    onSelectTopic('iam_mcq');
  };

  const handleSelectFederatedIam = () => {
    sounds.playSuccess();
    onSelectTopic('federated_iam_mcq');
  };

  const handleSelectAccessControls = () => {
    sounds.playSuccess();
    onSelectTopic('access_controls_mcq');
  };

  const handleSelectMfa = () => {
    sounds.playSuccess();
    onSelectTopic('mfa_mcq');
  };

  const handleSelectPasswordSecurity = () => {
    sounds.playSuccess();
    onSelectTopic('password_security_mcq');
  };

  const handleSelectScriptingAutomation = () => {
    sounds.playSuccess();
    onSelectTopic('scripting_automation_mcq');
  };

  const handleSelectIncidentResponse = () => {
    sounds.playSuccess();
    onSelectTopic('incident_response_mcq');
  };

  const handleSelectIncidentPlanning = () => {
    sounds.playSuccess();
    onSelectTopic('incident_planning_mcq');
  };

  const handleSelectDigitalForensics = () => {
    sounds.playSuccess();
    onSelectTopic('digital_forensics_mcq');
  };

  const handleSelectLogData = () => {
    sounds.playSuccess();
    onSelectTopic('log_data_mcq');
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
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-3xl p-6 sm:p-8 text-white shadow-lg shadow-blue-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div class="space-y-2 max-w-2xl">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white font-extrabold text-xs backdrop-blur-md">
            <Sliders class="w-4 h-4 text-blue-200" />
            <span>CompTIA Security+ • Domain 4.0</span>
          </div>
          <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight">
            4.0 - Operations and Incident Response
          </h1>
          <p class="text-blue-100 font-medium text-sm sm:text-base leading-relaxed">
            Practice CompTIA Security+ scenario questions on Secure Baselines, Hardening Targets, Securing Wireless & Mobile, Wireless Security Settings, Application Security, Asset Management, Vulnerability Scanning, Threat Intelligence, Penetration Testing, Pentest Process & Disclosure, Analyzing Vulnerabilities, Vulnerability Remediation, Security Monitoring, Security Tools, Firewalls, Web Filtering, Operating System Security, Secure Protocols, Email Security, Endpoint Security, Monitoring Data (FIM, DLP, USB Blocking), IAM, Federated IAM, Access Controls, MFA, Password Security, Scripting & Automation, Incident Response, Incident Planning, Digital Forensics, and Log Data with randomized option shuffling!
          </p>
        </div>

        <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-sm shrink-0 flex items-center gap-3">
          <div class="text-3xl">📊</div>
          <div>
            <div class="text-xs font-bold text-blue-200 uppercase">Exam Practice Mode</div>
            <div class="text-lg font-extrabold text-white">31 Active MCQ Modules!</div>
          </div>
        </div>
      </div>

      {/* Topics Grid */}
      <div class="space-y-4">
        <h2 class="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
          <span>Select an Exam Question Topic</span>
          <Sparkles class="w-5 h-5 text-blue-500" />
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* ACTIVE EXAM MODULE: 4.1 - Secure Baselines */}
          <div 
            onClick={handleSelectSecureBaselines}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📏
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  1. Secure Baselines
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Integrity Measurements</strong>, <strong>Baseline Drift Detection</strong>, <strong>Manufacturer Baseline Templates</strong>, <strong>GPO & MDM Automated Deployment</strong>, and <strong>Ongoing Baseline Maintenance</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Integrity Measurements</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">CIS / Vendor Standards</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">GPO & MDM Deployment</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Baseline Drift Alerts</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Pre-deployment Testing</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start Secure Baselines Practice Test 📏</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.1 - Hardening Targets */}
          <div 
            onClick={handleSelectHardeningTargets}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🎯
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  2. Hardening Targets
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Mobile Devices (MDM/Containerization)</strong>, <strong>Workstations</strong>, <strong>Network Infrastructure</strong>, <strong>Cloud Consoles</strong>, <strong>SCADA/ICS Air-gaps</strong>, <strong>RTOS Hardening</strong>, and <strong>IoT VLANs</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SCADA / ICS Air-gap</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">RTOS Deterministic</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">IoT VLAN Isolation</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Cloud Admin Laptop</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">MDM Containerization</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start Hardening Targets Practice Test 🎯</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.1 - Securing Wireless and Mobile */}
          <div 
            onClick={handleSelectSecuringWirelessMobile}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📶
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 4.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  3. Securing Wireless & Mobile
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Site Surveys & Heat Maps</strong>, <strong>BYOD vs COPE vs CYOD</strong>, <strong>MDM Selective Wipes</strong>, <strong>Bluetooth PAN Hardening</strong>, and <strong>Public Wi-Fi VPN Tunnels</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Wireless Heat Maps</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">BYOD / COPE / CYOD</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">MDM Selective Wipe</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Bluetooth PAN Privacy</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Public Wi-Fi VPN</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Start Securing Wireless & Mobile Practice Test 📶</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.1 - Wireless Security Settings */}
          <div 
            onClick={handleSelectWirelessSecuritySettings}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔐
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  4. Wireless Security Settings
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>WPA3 & GCMP/GMAC</strong>, <strong>SAE Dragonfly Handshake</strong>, <strong>WPA3-Enterprise 802.1X</strong>, <strong>RADIUS Servers</strong>, <strong>EAP Roles</strong>, and <strong>AAA Accounting Logs</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">SAE Dragonfly</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">GCMP & GMAC MIC</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">WPA3-Enterprise</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">802.1X Roles</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">AAA Accounting</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start Wireless Security Settings Practice Test 🔐</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.1 - Application Security */}
          <div 
            onClick={handleSelectApplicationSecurity}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                💻
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.1</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  5. Application Security
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Input Fuzzing</strong>, <strong>Input Normalization</strong>, <strong>Secure Cookie Attributes</strong>, <strong>SAST Code Analyzers</strong>, <strong>Digital Code Signing</strong>, and <strong>Application Sandboxing</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Input Fuzzing</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Secure Cookie Flag</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SAST Code Scanner</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Digital Code Signing</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">OS Sandboxing</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start Application Security Practice Test 💻</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.2 - Asset Management */}
          <div 
            onClick={handleSelectAssetManagement}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📦
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 4.2</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  6. Asset Management
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Procurement</strong>, <strong>Asset Tags & RFID</strong>, <strong>Degaussing Magnets</strong>, <strong>Physical Shredding</strong>, <strong>Certificates of Destruction</strong>, and <strong>Data Retention Compliance</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Asset Barcode / RFID</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Degaussing Magnet</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">SSD Shredding</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Destruction Certificate</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Data Retention</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Asset Management Practice Test 📦</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.3 - Vulnerability Scanning */}
          <div 
            onClick={handleSelectVulnerabilityScanning}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔍
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  7. Vulnerability Scanning
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Minimally Invasive Scans</strong>, <strong>Dynamic Fuzzing</strong>, <strong>Package Monitoring</strong>, <strong>Internal vs External Scans</strong>, <strong>False Positives</strong>, and <strong>Credentialed Scans</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Non-invasive Scanning</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Dynamic Fuzzing</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Package Integrity</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Internal Threat Scan</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Credentialed Depth</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start Vulnerability Scanning Practice Test 🔍</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.3 - Threat Intelligence */}
          <div 
            onClick={handleSelectThreatIntelligence}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🕵️‍♂️
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  8. Threat Intelligence
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>OSINT</strong>, <strong>Dark Web Intelligence</strong>, <strong>CTA / ISAC Information Sharing</strong>, <strong>Proprietary Feeds</strong>, <strong>Threat Actor TTPs</strong>, and <strong>Automated SIEM Blocking</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">OSINT Public Data</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Dark Web Tor Monitoring</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CTA / ISAC Sharing</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Proprietary Feeds</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Automated Prevention</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start Threat Intelligence Practice Test 🕵️‍♂️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.3 - Penetration Testing */}
          <div 
            onClick={handleSelectPenetrationTesting}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                ⚔️
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 4.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  9. Penetration Testing
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Active Exploitation</strong>, <strong>Rules of Engagement (RoE)</strong>, <strong>NIST SP 800-115</strong>, <strong>System Instability Risks</strong>, <strong>Privilege Escalation</strong>, and <strong>Scope Limits</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Active Exploitation</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Rules of Engagement</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">NIST SP 800-115</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Privilege Escalation</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Scope Restrictions</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Start Penetration Testing Practice Test ⚔️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.3 - Pentest Process & Responsible Disclosure */}
          <div 
            onClick={handleSelectPentestProcessDisclosure}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔄
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  10. Pentest Process & Disclosure
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Initial Exploitation</strong>, <strong>Lateral Movement</strong>, <strong>Persistence Backdoors</strong>, <strong>Pivoting</strong>, <strong>Bug Bounties</strong>, and <strong>Responsible Disclosure</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Initial Exploitation</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Lateral Movement</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Persistence Backdoor</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Pivoting Relay</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Responsible Disclosure</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start Pentest Process & Disclosure Test 🔄</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.3 - Analyzing Vulnerabilities */}
          <div 
            onClick={handleSelectAnalyzingVulnerabilities}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📊
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  11. Analyzing Vulnerabilities
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>False Positives/Negatives</strong>, <strong>CVSS Scores</strong>, <strong>CVE IDs</strong>, <strong>Exposure Factor (EF)</strong>, <strong>Environmental Prioritization</strong>, and <strong>Risk Tolerance</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">False Positive Verification</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CVSS 0.0 - 10.0 Rating</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CVE MITRE Index</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Exposure Factor %</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Environment Context</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start Analyzing Vulnerabilities Test 📊</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.3 - Vulnerability Remediation */}
          <div 
            onClick={handleSelectVulnerabilityRemediation}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛠️
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 4.3</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  12. Vulnerability Remediation
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Compensating Controls</strong>, <strong>Cybersecurity Insurance</strong>, <strong>Rescanning Validation</strong>, <strong>Formal Exemptions</strong>, <strong>Network Segmentation</strong>, and <strong>Out-of-Band Patching</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Compensating WAF Control</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Cyber Liability Insurance</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Rescanning Verification</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Formal Exceptions</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Logical VLAN Air-gap</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Start Vulnerability Remediation Test 🛠️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.4 - Security Monitoring */}
          <div 
            onClick={handleSelectSecurityMonitoring}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🖥️
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  13. Security Monitoring
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>SIEM Log Aggregation</strong>, <strong>Alert Tuning</strong>, <strong>Host Quarantining</strong>, <strong>Long-term Log Archiving</strong>, <strong>Data Transfer Anomalies</strong>, and <strong>24/7/365 SOC Monitoring</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">SIEM Log Correlation</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Alert Threshold Tuning</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Host Quarantine Containment</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Long-term Log Retention</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Data Transfer Anomaly</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start Security Monitoring Test 🖥️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.4 - Security Tools */}
          <div 
            onClick={handleSelectSecurityTools}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🧰
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.4</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  14. Security Tools
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>SCAP Standards</strong>, <strong>CIS Benchmarks</strong>, <strong>DLP Leak Prevention</strong>, <strong>SNMP Traps (UDP/162)</strong>, <strong>Agentless Checks</strong>, and <strong>NetFlow Flow Summaries</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SCAP Framework</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">CIS Benchmarks</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">DLP Leak Prevention</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SNMP Trap UDP/162</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">NetFlow Traffic Metadata</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start Security Tools Test 🧰</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.5 - Firewalls */}
          <div 
            onClick={handleSelectFirewalls}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔥
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 4.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  15. Firewalls
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Implicit Deny</strong>, <strong>Next-Gen Firewalls (NGFW Layer 7 DPI)</strong>, <strong>Screened Subnet (DMZ)</strong>, <strong>Anomaly-based IPS</strong>, <strong>ACL Rule Order</strong>, and <strong>Ports (RDP TCP/3389)</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Implicit Deny Bouncer</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">NGFW Layer 7 DPI</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Screened Subnet DMZ</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Anomaly-based IPS</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">RDP TCP Port 3389</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Firewalls Test 🔥</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.5 - Web Filtering */}
          <div 
            onClick={handleSelectWebFiltering}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🌐
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 4.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  16. Web Filtering
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>DNS Filtering</strong>, <strong>Forward Proxies</strong>, <strong>Agent-Based Endpoint Filtering</strong>, <strong>Reputation Scoring</strong>, <strong>Category Dispositions</strong>, and <strong>Transparent Proxies</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">DNS Resolution Blocking</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Forward Proxy Gateway</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Agent-Based Remote Agent</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Dynamic Reputation Score</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Transparent Proxy Intercept</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Start Web Filtering Test 🌐</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.5 - Operating System Security */}
          <div 
            onClick={handleSelectOsSecurity}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                💻
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  17. Operating System Security
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Active Directory (AD)</strong>, <strong>Group Policy Objects (GPOs)</strong>, <strong>SELinux Mandatory Access Control (MAC)</strong>, and <strong>Blast Radius Confinement</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Active Directory Database</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Group Policy Objects (GPOs)</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">SELinux Kernel MAC</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Blast Radius Confinement</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Mandatory vs Discretionary</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start OS Security Test 💻</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.5 - Secure Protocols */}
          <div 
            onClick={handleSelectSecureProtocols}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔒
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  18. Secure Protocols
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>SSH (Port 22)</strong>, <strong>HTTPS (Port 443)</strong>, <strong>SFTP (Port 22)</strong>, <strong>IMAPS (Port 993)</strong>, <strong>VPN Encrypted Tunnels</strong>, and <strong>Wireshark Captures</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SSH Port 22 Remote</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">HTTPS Port 443 TLS</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">SFTP Secure File</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">IMAPS Port 993 Mail</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">VPN Tunnel & Wireshark</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start Secure Protocols Test 🔒</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.5 - Email Security */}
          <div 
            onClick={handleSelectEmailSecurity}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📧
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 4.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  19. Email Security
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>SPF (Sender Policy Framework)</strong>, <strong>DKIM Digital Signatures</strong>, <strong>DMARC Dispositions & Reports</strong>, and <strong>Mail Gateways</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">SPF Authorized Senders</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">DKIM Digital Signature</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">DMARC Policy Reject</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">DMARC XML Reports</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Mail Gateway Inspection</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Start Email Security Test 📧</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.5 - Endpoint Security */}
          <div 
            onClick={handleSelectEndpointSecurity}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📱
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  20. Endpoint Security
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Persistent vs Dissolvable Agents</strong>, <strong>Quarantine Networks</strong>, <strong>EDR</strong>, <strong>XDR</strong>, and <strong>User Behavior Analytics (UBA)</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Dissolvable Guest Agent</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Persistent NAC Agent</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Quarantine Remediation</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">EDR Process Isolation</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">XDR Cross-Platform</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start Endpoint Security Test 📱</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.5 - Monitoring Data */}
          <div 
            onClick={handleSelectMonitoringData}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="absolute top-4 right-4">
              <span class="px-3 py-1 rounded-full bg-indigo-600 text-white font-extrabold text-xs shadow-sm flex items-center gap-1">
                🌟 New Section 4.5!
              </span>
            </div>

            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📊
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.5</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  21. Monitoring Data
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>File Integrity Monitoring (FIM / Tripwire / SFC)</strong>, <strong>DLP (In Use, Motion, At Rest)</strong>, <strong>USB Blocking</strong>, and <strong>Cloud / Email DLP</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">FIM Tripwire & SFC</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Data in Use / Motion / Rest</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Endpoint USB Blocking</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Cloud DLP Web Traffic</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Email Attachment DLP</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start Monitoring Data Test 📊</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.6 - Identity and Access Management */}
          <div 
            onClick={handleSelectIam}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔑
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.6</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  22. Identity & Access Management
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Provisioning / De-provisioning</strong>, <strong>Identity Proofing Verification</strong>, <strong>Single Sign-On (SSO)</strong>, <strong>Group Permissions</strong>, and <strong>Identity Governance</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">De-provisioning Revocation</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Identity Verification Passport</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Single Sign-On (SSO)</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Group Role Assignment</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Identity Governance Audit</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start IAM Practice Test 🔑</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.6 - Federated IAM & Protocols */}
          <div 
            onClick={handleSelectFederatedIam}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🌐
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 4.6</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  23. Federated IAM & Protocols
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>LDAP (Directory Queries)</strong>, <strong>SAML Web Assertions</strong>, <strong>OAuth 2.0 Token Authorization</strong>, <strong>OpenID Connect (OIDC)</strong>, and <strong>Federation</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">LDAP Directory Search</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">SAML Web Assertions</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">OAuth 2.0 Authorization</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">OpenID Connect Authentication</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">B2B Identity Federation</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Start Federated IAM Practice Test 🌐</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.6 - Access Controls */}
          <div 
            onClick={handleSelectAccessControls}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🛡️
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.6</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  24. Access Controls
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Mandatory Access Control (MAC)</strong>, <strong>Discretionary Access Control (DAC)</strong>, <strong>RBAC</strong>, <strong>Rule-Based</strong>, <strong>ABAC</strong>, and <strong>Time-of-Day Restrictions</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">MAC Clearance Labels</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">DAC File Owner Authority</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">RBAC Role Groups</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">ABAC Context Evaluation</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Time-of-Day Night Lock</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start Access Controls Practice Test 🛡️</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.6 - Multifactor Authentication */}
          <div 
            onClick={handleSelectMfa}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📲
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.6</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  25. Multifactor Authentication
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Something You Know</strong>, <strong>Something You Have</strong>, <strong>Something You Are</strong>, <strong>Somewhere You Are</strong>, and <strong>True MFA Category Rules</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Password & PIN Knowledge</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">USB YubiKey Hardware</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Biometric Fingerprint Representation</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">GPS Somewhere Geolocation</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">True Category Combination</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start MFA Practice Test 📲</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.6 - Password Security */}
          <div 
            onClick={handleSelectPasswordSecurity}
            class="group bg-white rounded-3xl p-6 border-4 border-sky-400 shadow-md hover:shadow-xl hover:border-sky-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔑
              </div>

              <div>
                <span class="text-xs font-extrabold text-sky-600 uppercase tracking-wider">Section 4.6</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-sky-600 transition-colors">
                  26. Password Security
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Password Entropy</strong>, <strong>Password History</strong>, <strong>Enterprise Password Managers</strong>, <strong>Passwordless Auth</strong>, <strong>JIT Permissions</strong>, and <strong>Ephemeral Vault Credentials</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Password Entropy</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Password History Policy</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Enterprise Password Manager</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">Passwordless Authentication</span>
                <span class="px-2 py-0.5 bg-sky-50 border border-sky-200 text-sky-900 rounded text-xs font-bold">JIT Ephemeral Vault Access</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-sky-100 flex items-center justify-between text-sky-700 font-extrabold text-base group-hover:text-sky-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-sky-600 group-hover:scale-110 transition-transform" />
                <span>Start Password Security Practice Test 🔑</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-sky-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.7 - Scripting and Automation */}
          <div 
            onClick={handleSelectScriptingAutomation}
            class="group bg-white rounded-3xl p-6 border-4 border-blue-400 shadow-md hover:shadow-xl hover:border-blue-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🤖
              </div>

              <div>
                <span class="text-xs font-extrabold text-blue-600 uppercase tracking-wider">Section 4.7</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                  27. Scripting & Automation
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Automated Guard Rails</strong>, <strong>Reaction Speed & Multipliers</strong>, <strong>Single Point of Failure Risks</strong>, <strong>Technical Debt</strong>, <strong>API Orchestration</strong>, and <strong>Supportability</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Automated Guard Rails</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Sub-second Reaction Speed</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Single Point of Failure</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Technical Debt Band-aid</span>
                <span class="px-2 py-0.5 bg-blue-50 border border-blue-200 text-blue-900 rounded text-xs font-bold">Orchestration APIs</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-blue-100 flex items-center justify-between text-blue-700 font-extrabold text-base group-hover:text-blue-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                <span>Start Scripting & Automation Test 🤖</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-blue-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.8 - Incident Response */}
          <div 
            onClick={handleSelectIncidentResponse}
            class="group bg-white rounded-3xl p-6 border-4 border-indigo-400 shadow-md hover:shadow-xl hover:border-indigo-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🚨
              </div>

              <div>
                <span class="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">Section 4.8</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors">
                  28. Incident Response
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>NIST SP 800-61 Lifecycle</strong>, <strong>Preparation & Out-of-band Calls</strong>, <strong>Isolation & Containment</strong>, <strong>Sandboxing</strong>, and <strong>Post-Incident Lessons Learned</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">NIST SP 800-61 Lifecycle</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Preparation & Write-Blockers</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Network Containment</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Sandbox Malware Execution</span>
                <span class="px-2 py-0.5 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded text-xs font-bold">Post-Incident Lessons Learned</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-indigo-100 flex items-center justify-between text-indigo-700 font-extrabold text-base group-hover:text-indigo-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-indigo-600 group-hover:scale-110 transition-transform" />
                <span>Start Incident Response Test 🚨</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-indigo-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.8 - Incident Planning */}
          <div 
            onClick={handleSelectIncidentPlanning}
            class="group bg-white rounded-3xl p-6 border-4 border-violet-400 shadow-md hover:shadow-xl hover:border-violet-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-violet-100 text-violet-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📋
              </div>

              <div>
                <span class="text-xs font-extrabold text-violet-600 uppercase tracking-wider">Section 4.8</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-violet-600 transition-colors">
                  29. Incident Planning
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Tabletop Exercises</strong>, <strong>Phishing Simulations</strong>, <strong>Root Cause Analysis</strong>, <strong>Threat Hunting</strong>, <strong>Rules of Engagement</strong>, and <strong>Tabletop vs Simulation</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-violet-50 border border-violet-200 text-violet-900 rounded text-xs font-bold">Tabletop Exercises</span>
                <span class="px-2 py-0.5 bg-violet-50 border border-violet-200 text-violet-900 rounded text-xs font-bold">Phishing Simulation</span>
                <span class="px-2 py-0.5 bg-violet-50 border border-violet-200 text-violet-900 rounded text-xs font-bold">Root Cause Analysis</span>
                <span class="px-2 py-0.5 bg-violet-50 border border-violet-200 text-violet-900 rounded text-xs font-bold">Threat Hunting</span>
                <span class="px-2 py-0.5 bg-violet-50 border border-violet-200 text-violet-900 rounded text-xs font-bold">Rules of Engagement</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-violet-100 flex items-center justify-between text-violet-700 font-extrabold text-base group-hover:text-violet-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-violet-600 group-hover:scale-110 transition-transform" />
                <span>Start Incident Planning Test 📋</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-violet-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.8 - Digital Forensics */}
          <div 
            onClick={handleSelectDigitalForensics}
            class="group bg-white rounded-3xl p-6 border-4 border-rose-400 shadow-md hover:shadow-xl hover:border-rose-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                🔬
              </div>

              <div>
                <span class="text-xs font-extrabold text-rose-600 uppercase tracking-wider">Section 4.8</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-rose-600 transition-colors">
                  30. Digital Forensics
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>RFC 3227</strong>, <strong>Legal Hold</strong>, <strong>Chain of Custody</strong>, <strong>Evidence Acquisition</strong>, <strong>Preservation & E-Discovery</strong>, and <strong>Forensic Reporting</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">RFC 3227 Guidelines</span>
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">Legal Hold & ESI</span>
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">Chain of Custody</span>
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">Acquisition & Artifacts</span>
                <span class="px-2 py-0.5 bg-rose-50 border border-rose-200 text-rose-900 rounded text-xs font-bold">E-Discovery</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-rose-100 flex items-center justify-between text-rose-700 font-extrabold text-base group-hover:text-rose-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform" />
                <span>Start Digital Forensics Test 🔬</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-rose-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

          {/* ACTIVE EXAM MODULE: 4.8 - Log Data */}
          <div 
            onClick={handleSelectLogData}
            class="group bg-white rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
          >
            <div class="space-y-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                📝
              </div>

              <div>
                <span class="text-xs font-extrabold text-amber-600 uppercase tracking-wider">Section 4.8</span>
                <h3 class="text-2xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                  31. Log Data
                </h3>
              </div>

              <p class="text-slate-600 text-sm leading-relaxed">
                Test your knowledge on <strong>Security Log Files</strong>, <strong>Firewall & IPS/IDS Logs</strong>, <strong>Application & Endpoint Logs</strong>, <strong>OS & Network Logs</strong>, <strong>Metadata</strong>, and <strong>Reports, Dashboards & Packet Captures</strong>!
              </p>

              {/* Topic Badges */}
              <div class="flex flex-wrap gap-1.5 pt-1">
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Security Log Files</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Firewall & IPS Logs</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Endpoint Logs & SIEM</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Metadata Analysis</span>
                <span class="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">Packet Captures</span>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-base group-hover:text-amber-900">
              <div class="flex items-center gap-2">
                <PlayCircle class="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                <span>Start Log Data Test 📝</span>
              </div>
              <span class="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
