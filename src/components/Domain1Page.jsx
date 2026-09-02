import React, { useState } from 'react';
import { ArrowLeft, Shield, PlayCircle, Key, Lock, Layers, Sparkles, CheckCircle2, FileText, Cpu, HardDrive, Building2, UserCheck, Ruler, Camera, Bug, ClipboardList, Fingerprint, Search, Gamepad2, BookOpen, Tag } from 'lucide-react';
import { sounds } from '../utils/audio';

const domain1Acronyms = [
  { term: 'CIA / AIC', name: 'Confidentiality, Integrity, Availability', section: '1.2', desc: 'The foundational security triad balancing secrecy, data accuracy, and system uptime.' },
  { term: 'AAA', name: 'Authentication, Authorization, Accounting', section: '1.2', desc: 'Access control framework verifying identity (AuthN), permissions (AuthZ), and audit logging.' },
  { term: 'PKI', name: 'Public Key Infrastructure', section: '1.4', desc: 'Framework of policies, hardware, software, and CAs used to create and manage digital certificates.' },
  { term: 'CA', name: 'Certificate Authority', section: '1.4', desc: 'Trusted third-party organization that validates identities and signs digital X.509 certificates.' },
  { term: 'CSR', name: 'Certificate Signing Request', section: '1.4', desc: 'Applicant application sent to a CA containing public key and company identity info to be signed.' },
  { term: 'CRL', name: 'Certificate Revocation List', section: '1.4', desc: 'Blacklist file maintained by a CA listing invalidated certificates prior to expiration.' },
  { term: 'OCSP', name: 'Online Certificate Status Protocol', section: '1.4', desc: 'Real-time HTTP query protocol used by browsers to check certificate revocation status.' },
  { term: 'SAN', name: 'Subject Alternative Name', section: '1.4', desc: 'X.509 certificate extension allowing one certificate to secure multiple subdomains (*.domain.com).' },
  { term: 'TPM', name: 'Trusted Platform Module', section: '1.4', desc: 'Hardware crypto chip soldered onto motherboards storing BitLocker keys and boot measurements.' },
  { term: 'HSM', name: 'Hardware Security Module', section: '1.4', desc: 'Rack-mount enterprise appliance storing thousands of master root keys and offloading SSL processing.' },
  { term: 'KMS', name: 'Key Management System', section: '1.4', desc: 'Centralized console managing key creation, rotation, and enforcing key separation from stored data.' },
  { term: 'FDE', name: 'Full-Disk Encryption', section: '1.4', desc: 'Protects data at rest by encrypting the entire storage drive (BitLocker, FileVault).' },
  { term: 'EFS', name: 'Encrypting File System', section: '1.4', desc: 'Windows built-in feature providing file-level and folder-level encryption.' },
  { term: 'AES', name: 'Advanced Encryption Standard', section: '1.4', desc: 'Fast, secure symmetric block cipher algorithm using 128-bit or 256-bit secret keys.' },
  { term: 'RSA', name: 'Rivest-Shamir-Adleman', section: '1.4', desc: 'Asymmetric algorithm relying on large prime number factorization for keys (3072+ bits).' },
  { term: 'DH', name: 'Diffie-Hellman', section: '1.4', desc: 'Key exchange agreement deriving a shared symmetric key from asymmetric key pairs over the wire.' },
  { term: 'PFS', name: 'Perfect Forward Secrecy', section: '1.4', desc: 'Uses ephemeral session keys so compromising long-term private keys cannot decrypt past sessions.' },
  { term: 'PBKDF2', name: 'Password-Based Key Derivation Function 2', section: '1.4', desc: 'Key stretching algorithm running thousands of hash iterations to slow down password cracking.' },
  { term: 'TDE', name: 'Transparent Data Encryption', section: '1.4', desc: 'Database engine feature encrypting entire database files automatically.' },
  { term: 'LSB', name: 'Least Significant Bit', section: '1.4', desc: 'Steganography technique embedding secret data into invisible bits of image/audio covertext.' },
  { term: 'NFC', name: 'Near Field Communication', section: '1.4', desc: 'Short-range wireless protocol used in mobile tokenization payments (Apple Pay, Google Pay).' },
  { term: 'CAB', name: 'Change Advisory Board', section: '1.3', desc: 'Cross-functional committee reviewing, assessing, and approving technical change requests.' },
  { term: 'NIST', name: 'National Institute of Standards and Technology', section: '1.2', desc: 'US agency establishing cybersecurity frameworks (e.g. NIST SP 800-171, NIST CSF).' },
  { term: 'ISO', name: 'International Organization for Standardization', section: '1.2', desc: 'Global standards body defining ISO/IEC 27001 cybersecurity management standards.' }
];

export default function Domain1Page({ onBack, onSelectTopic }) {
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'simulations' | 'mcqs' | 'acronyms'
  const [searchQuery, setSearchQuery] = useState('');

  // Handlers for Interactive PBQ Simulations
  const handleSelectCia = () => { sounds.playSuccess(); onSelectTopic('cia'); };
  const handleSelectHashing = () => { sounds.playSuccess(); onSelectTopic('hashing_signatures'); };
  const handleSelectObfuscation = () => { sounds.playSuccess(); onSelectTopic('obfuscation'); };
  const handleSelectChangePki = () => { sounds.playSuccess(); onSelectTopic('change_management'); };
  const handleSelectDeception = () => { sounds.playSuccess(); onSelectTopic('deception_disruption'); };
  const handleSelectPhysicalSec = () => { sounds.playSuccess(); onSelectTopic('physical_security'); };
  const handleSelectAaa = () => { sounds.playSuccess(); onSelectTopic('aaa_framework'); };
  const handleSelectZeroTrust = () => { sounds.playSuccess(); onSelectTopic('zero_trust'); };
  const handleSelectGapAnalysis = () => { sounds.playSuccess(); onSelectTopic('gap_analysis'); };
  const handleSelectEncryptingData = () => { sounds.playSuccess(); onSelectTopic('encrypting_data'); };
  const handleSelectCertificates = () => { sounds.playSuccess(); onSelectTopic('certificates'); };
  const handleSelectEncryptionTech = () => { sounds.playSuccess(); onSelectTopic('encryption_technologies'); };

  // Handlers for MCQ Practice Tests
  const handleSelectSecurityControls = () => { sounds.playSuccess(); onSelectTopic('security_controls'); };
  const handleSelectCiaTriadMcq = () => { sounds.playSuccess(); onSelectTopic('cia_triad_mcq'); };
  const handleSelectNonRepudiationMcq = () => { sounds.playSuccess(); onSelectTopic('non_repudiation_mcq'); };
  const handleSelectAaaFrameworkMcq = () => { sounds.playSuccess(); onSelectTopic('aaa_framework_mcq'); };
  const handleSelectGapAnalysisMcq = () => { sounds.playSuccess(); onSelectTopic('gap_analysis_mcq'); };
  const handleSelectZeroTrustMcq = () => { sounds.playSuccess(); onSelectTopic('zero_trust_mcq'); };
  const handleSelectPhysicalSecurityMcq = () => { sounds.playSuccess(); onSelectTopic('physical_security_mcq'); };
  const handleSelectDeceptionDisruptionMcq = () => { sounds.playSuccess(); onSelectTopic('deception_disruption_mcq'); };
  const handleSelectChangeManagementMcq = () => { sounds.playSuccess(); onSelectTopic('change_management_mcq'); };
  const handleSelectTechnicalChangeManagementMcq = () => { sounds.playSuccess(); onSelectTopic('technical_change_management_mcq'); };
  const handleSelectPkiMcq = () => { sounds.playSuccess(); onSelectTopic('pki_mcq'); };
  const handleSelectEncryptingDataMcq = () => { sounds.playSuccess(); onSelectTopic('encrypting_data_mcq'); };
  const handleSelectKeyExchangeMcq = () => { sounds.playSuccess(); onSelectTopic('key_exchange_mcq'); };
  const handleSelectEncryptionTechnologiesMcq = () => { sounds.playSuccess(); onSelectTopic('encryption_technologies_mcq'); };
  const handleSelectObfuscationMcq = () => { sounds.playSuccess(); onSelectTopic('obfuscation_mcq'); };
  const handleSelectHashingSignaturesMcq = () => { sounds.playSuccess(); onSelectTopic('hashing_signatures_mcq'); };
  const handleSelectBlockchainTechnologyMcq = () => { sounds.playSuccess(); onSelectTopic('blockchain_technology_mcq'); };
  const handleSelectCertificatesMcq = () => { sounds.playSuccess(); onSelectTopic('certificates_mcq'); };

  // Data definitions for clean rendering & filtering
  const simulations = [
    { title: '1.2 - The CIA & AIC Triad Lab', section: 'Section 1.2', desc: 'Interactive simulation testing Confidentiality, Integrity, and Availability controls.', icon: '🧩', action: handleSelectCia, badges: ['Confidentiality', 'Integrity', 'Availability'] },
    { title: '1.2 - AAA Framework Lab', section: 'Section 1.2', desc: 'Interactive tool demonstrating Authentication, Authorization, and Accounting flows.', icon: '🔑', action: handleSelectAaa, badges: ['Authentication', 'Authorization', 'Accounting'] },
    { title: '1.2 - Gap Analysis Heatmap Tool', section: 'Section 1.2', desc: 'Visual gap analysis matrix evaluating current baseline controls against target frameworks.', icon: '📊', action: handleSelectGapAnalysis, badges: ['NIST SP 800-171', 'ISO 27001', 'Baseline Heatmap'] },
    { title: '1.2 - Zero Trust Architecture Lab', section: 'Section 1.2', desc: 'Interactive policy engine (PDP) and enforcement point (PEP) network simulator.', icon: '🛡️', action: handleSelectZeroTrust, badges: ['PDP Policy Engine', 'PEP Enforcement', 'Microsegmentation'] },
    { title: '1.2 - Physical Security Vestibule Lab', section: 'Section 1.2', desc: 'Interactive Access Control Vestibule (Mantrap) and physical barrier simulator.', icon: '🚪', action: handleSelectPhysicalSec, badges: ['Access Control Vestibule', 'Bollards', 'Sensors'] },
    { title: '1.2 - Deception & Honeypot Lab', section: 'Section 1.2', desc: 'Interactive Honeypot, Honeynet, and Honeytoken attacker disruption tool.', icon: '🍯', action: handleSelectDeception, badges: ['Honeypot', 'Honeyfile', 'Honeytoken API'] },
    { title: '1.3 - Technical Change Management Lab', section: 'Section 1.3', desc: 'Interactive CAB approval workflow, allow/deny list tester, and HA backout plan lab.', icon: '⚙️', action: handleSelectChangePki, badges: ['CAB Approval', 'Backout Plan', 'Allow/Deny List'] },
    { title: '1.4 - Encrypting Data & Key Stretching Lab', section: 'Section 1.4', desc: 'Interactive tool calculating PBKDF2/bcrypt key stretching rounds and BitLocker FDE.', icon: '🔐', action: handleSelectEncryptingData, badges: ['BitLocker FDE', 'PBKDF2 Stretching', 'Column Encryption'] },
    { title: '1.4 - Encryption Technologies & HSM Lab', section: 'Section 1.4', desc: 'Interactive lab comparing motherboard TPM chips with enterprise rackmount HSM appliances.', icon: '💻', action: handleSelectEncryptionTech, badges: ['TPM Motherboard', 'HSM Appliance', 'Secure Enclave'] },
    { title: '1.4 - Obfuscation & Steganography Lab', section: 'Section 1.4', desc: 'Interactive least-significant-bit (LSB) image steganography and tokenization tool.', icon: '🙈', action: handleSelectObfuscation, badges: ['Image LSB', 'Token Vault', 'Data Masking'] },
    { title: '1.4 - Hashing & Digital Signatures Lab', section: 'Section 1.4', desc: 'Interactive hash generator (SHA-256 vs MD5) and digital signature creation lab.', icon: '🔏', action: handleSelectHashing, badges: ['SHA-256 Hash', 'Salt', 'Private Key Signing'] },
    { title: '1.4 - Digital Certificates & OCSP Lab', section: 'Section 1.4', desc: 'Interactive CSR generator, Wildcard certificate manager, and OCSP Stapling tool.', icon: '📜', action: handleSelectCertificates, badges: ['CSR Generator', 'OCSP Stapling', 'Wildcard Certs'] }
  ];

  const mcqs = [
    { title: '1.1 - Security Controls Practice', section: 'Section 1.1', desc: 'Scenario questions on Technical, Operational, Managerial, and Physical control types.', icon: '🛡️', action: handleSelectSecurityControls, badges: ['Preventive', 'Detective', 'Corrective', 'Compensating'] },
    { title: '1.2 - The CIA Triad Practice', section: 'Section 1.2', desc: 'Scenario questions on Confidentiality, Integrity, Availability, and non-repudiation.', icon: '📐', action: handleSelectCiaTriadMcq, badges: ['CIA Triad', 'Non-repudiation', 'AIC Balance'] },
    { title: '1.2 - Non-repudiation Practice', section: 'Section 1.2', desc: 'Scenario questions on digital proof of origin, Avalanche effect, and tamper evidence.', icon: '🖋️', action: handleSelectNonRepudiationMcq, badges: ['Proof of Origin', 'Digital Signatures', 'Hash Integrity'] },
    { title: '1.2 - AAA Framework Practice', section: 'Section 1.2', desc: 'Scenario questions on Identification, Authentication, Authorization, and Audit Logs.', icon: '🔐', action: handleSelectAaaFrameworkMcq, badges: ['AuthN', 'AuthZ', 'Accounting', 'Headless CA'] },
    { title: '1.2 - Gap Analysis Practice', section: 'Section 1.2', desc: 'Scenario questions on NIST SP 800-171, ISO 27001 baselines, and evaluation heatmaps.', icon: '📊', action: handleSelectGapAnalysisMcq, badges: ['NIST 800-171', 'ISO 27001', 'People & Processes'] },
    { title: '1.2 - Zero Trust Practice', section: 'Section 1.2', desc: 'Scenario questions on Never Trust Always Verify, PDP, PEP, and Adaptive Identity.', icon: '🛑', action: handleSelectZeroTrustMcq, badges: ['Policy Engine', 'Enforcement Point', 'Microsegmentation'] },
    { title: '1.2 - Physical Security Practice', section: 'Section 1.2', desc: 'Scenario questions on Bollards, Mantraps, Two-Person Integrity, and CCTV Analytics.', icon: '🏢', action: handleSelectPhysicalSecurityMcq, badges: ['Mantraps', 'Bollards', 'CCTV Analytics'] },
    { title: '1.2 - Deception and Disruption Practice', section: 'Section 1.2', desc: 'Scenario questions on Honeypots, Honeynets, Honeyfiles, and Honeytokens.', icon: '🍯', action: handleSelectDeceptionDisruptionMcq, badges: ['Honeypot', 'Honeyfile', 'Honeytoken API'] },
    { title: '1.3 - Change Management Practice', section: 'Section 1.3', desc: 'Scenario questions on CAB approval, backout plans, sandbox testing, and freezes.', icon: '📋', action: handleSelectChangeManagementMcq, badges: ['CAB Process', 'Backout Plan', 'Maintenance Freeze'] },
    { title: '1.3 - Technical Change Management Practice', section: 'Section 1.3', desc: 'Scenario questions on Allow/Deny lists, HA failover, dependencies, and version control.', icon: '⚙️', action: handleSelectTechnicalChangeManagementMcq, badges: ['Allow vs Deny', 'HA Failover', 'Version Control'] },
    { title: '1.4 - Public Key Infrastructure Practice', section: 'Section 1.4', desc: 'Scenario questions on Asymmetric vs Symmetric encryption, CA, and Key Escrow.', icon: '🔑', action: handleSelectPkiMcq, badges: ['Asymmetric Keys', 'CA & PKI', 'Key Escrow'] },
    { title: '1.4 - Encrypting Data Practice', section: 'Section 1.4', desc: 'Scenario questions on Data at Rest (BitLocker), Column Encryption, and Key Stretching.', icon: '🔐', action: handleSelectEncryptingDataMcq, badges: ['Full-Disk Encryption', 'PBKDF2', 'Kerckhoffs'] },
    { title: '1.4 - Key Exchange Practice', section: 'Section 1.4', desc: 'Scenario questions on Out-of-Band exchange, Diffie-Hellman (DH), and Ephemeral Keys.', icon: '🔄', action: handleSelectKeyExchangeMcq, badges: ['Diffie-Hellman', 'Ephemeral Keys', 'PFS'] },
    { title: '1.4 - Encryption Technologies Practice', section: 'Section 1.4', desc: 'Scenario questions on TPM motherboard chips, enterprise HSM, and KMS key separation.', icon: '💻', action: handleSelectEncryptionTechnologiesMcq, badges: ['TPM Chip', 'HSM Appliance', 'KMS Separation'] },
    { title: '1.4 - Obfuscation Practice', section: 'Section 1.4', desc: 'Scenario questions on Steganography LSB, Tokenization (NFC), and Data Masking.', icon: '🙈', action: handleSelectObfuscationMcq, badges: ['Steganography', 'Token Vault', 'Data Masking'] },
    { title: '1.4 - Hashing and Digital Signatures Practice', section: 'Section 1.4', desc: 'Scenario questions on SHA-256, MD5 Collisions, Salting Hashes, and Digital Signatures.', icon: '🔏', action: handleSelectHashingSignaturesMcq, badges: ['SHA-256', 'Salting Hashes', 'Digital Signatures'] },
    { title: '1.4 - Blockchain Technology Practice', section: 'Section 1.4', desc: 'Scenario questions on Distributed Ledgers, Cryptographic Chaining, and Consensus.', icon: '⛓️', action: handleSelectBlockchainTechnologyMcq, badges: ['Distributed Ledger', 'Block Chaining', 'Consensus'] },
    { title: '1.4 - Certificates Practice', section: 'Section 1.4', desc: 'Scenario questions on CSR, Wildcard certs, CRL, OCSP, and OCSP Stapling.', icon: '📜', action: handleSelectCertificatesMcq, badges: ['CSR Request', 'OCSP Stapling', 'Wildcard Certs'] }
  ];

  // Filtering helpers based on search
  const filteredSimulations = simulations.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.badges.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredMcqs = mcqs.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    m.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.badges.some(b => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredAcronyms = domain1Acronyms.filter(a => 
    a.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-200 rounded-2xl font-bold text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Domains</span>
        </button>
      </div>

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-lg shadow-amber-200/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/40 text-amber-950 font-extrabold text-xs">
            <Shield className="w-4 h-4 text-amber-900" />
            <span>CompTIA Security+ SY0-701 • Domain 1.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-amber-950">
            1.0 - General Security Concepts
          </h1>
          <p className="text-amber-900/90 font-semibold text-sm sm:text-base leading-relaxed">
            Master general security concepts through <strong>Interactive PBQ Lab Simulations</strong>, <strong>CompTIA Scenario Practice Tests</strong>, and an <strong>Acronym Flashcard Dictionary</strong>!
          </p>
        </div>

        {/* Quick Stats Pill */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border-2 border-amber-200/60 shadow-sm shrink-0 flex items-center gap-4">
          <div className="text-center border-r pr-3 border-amber-200">
            <div className="text-xs font-black text-purple-700 uppercase">Simulations</div>
            <div className="text-xl font-black text-purple-950">{simulations.length} Labs</div>
          </div>
          <div className="text-center border-r pr-3 border-amber-200">
            <div className="text-xs font-black text-emerald-700 uppercase">Practice Tests</div>
            <div className="text-xl font-black text-emerald-950">{mcqs.length} MCQs</div>
          </div>
          <div className="text-center">
            <div className="text-xs font-black text-blue-700 uppercase">Acronyms</div>
            <div className="text-xl font-black text-blue-950">{domain1Acronyms.length} Terms</div>
          </div>
        </div>
      </div>

      {/* Category Navigation Bar & Search */}
      <div className="bg-white rounded-3xl p-4 border-2 border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { sounds.playPop(); setActiveTab('all'); }}
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95 ${
                activeTab === 'all'
                  ? 'bg-amber-500 text-amber-950 shadow-md shadow-amber-200'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>All Modules ({simulations.length + mcqs.length})</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setActiveTab('simulations'); }}
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95 ${
                activeTab === 'simulations'
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-200'
                  : 'bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200'
              }`}
            >
              <Gamepad2 className="w-4 h-4 text-purple-600" />
              <span>🎮 PBQ Simulations ({simulations.length})</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setActiveTab('mcqs'); }}
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95 ${
                activeTab === 'mcqs'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>📝 Practice Exam Tests ({mcqs.length})</span>
            </button>

            <button
              onClick={() => { sounds.playPop(); setActiveTab('acronyms'); }}
              className={`px-4 py-2.5 rounded-2xl font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 active:scale-95 ${
                activeTab === 'acronyms'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200'
              }`}
            >
              <Tag className="w-4 h-4 text-blue-600" />
              <span>🏷️ Acronym Dictionary ({domain1Acronyms.length})</span>
            </button>
          </div>

          {/* Quick Search Bar */}
          <div className="relative shrink-0 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or acronym..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-2 border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* VIEW SECTION 1: INTERACTIVE PBQ SIMULATIONS */}
      {(activeTab === 'all' || activeTab === 'simulations') && filteredSimulations.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b-2 border-purple-100 pb-3">
            <h2 className="text-2xl font-black text-purple-950 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-700">🎮</span>
              <span>Interactive PBQ Lab Simulations</span>
              <span className="text-xs px-2.5 py-1 bg-purple-100 text-purple-800 rounded-full font-extrabold">Hands-On Practice</span>
            </h2>
            <span className="text-xs font-extrabold text-purple-700">{filteredSimulations.length} Active Labs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSimulations.map((sim, idx) => (
              <div 
                key={idx}
                onClick={sim.action}
                className="group bg-gradient-to-br from-white via-purple-50/20 to-purple-100/30 rounded-3xl p-6 border-4 border-purple-400 shadow-md hover:shadow-xl hover:border-purple-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-purple-600 text-white font-extrabold text-[11px] shadow-sm flex items-center gap-1">
                    🎮 Interactive PBQ
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                    {sim.icon}
                  </div>

                  <div>
                    <span className="text-xs font-extrabold text-purple-600 uppercase tracking-wider">{sim.section}</span>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">
                      {sim.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {sim.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {sim.badges.map((b, bIdx) => (
                      <span key={bIdx} className="px-2 py-0.5 bg-purple-50 border border-purple-200 text-purple-900 rounded text-xs font-bold">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-purple-100 flex items-center justify-between text-purple-700 font-extrabold text-sm group-hover:text-purple-950">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-purple-600 group-hover:scale-110 transition-transform" />
                    <span>Launch Hands-On PBQ 🚀</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-purple-100 rounded-full font-bold">Interactive Lab</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW SECTION 2: COMPTIA PRACTICE TESTS (MCQS) */}
      {(activeTab === 'all' || activeTab === 'mcqs') && filteredMcqs.length > 0 && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b-2 border-emerald-100 pb-3">
            <h2 className="text-2xl font-black text-emerald-950 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-700">📝</span>
              <span>CompTIA Scenario Practice Tests (MCQs)</span>
              <span className="text-xs px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-extrabold">Exam Questions & Layman Explanations</span>
            </h2>
            <span className="text-xs font-extrabold text-emerald-700">{filteredMcqs.length} Practice Tests</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMcqs.map((mcq, idx) => (
              <div 
                key={idx}
                onClick={mcq.action}
                className="group bg-gradient-to-br from-white via-emerald-50/20 to-amber-50/30 rounded-3xl p-6 border-4 border-amber-400 shadow-md hover:shadow-xl hover:border-amber-500 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-amber-950 font-extrabold text-[11px] shadow-sm">
                    📝 Practice Exam Test
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-extrabold text-2xl group-hover:scale-110 transition-transform">
                    {mcq.icon}
                  </div>

                  <div>
                    <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">{mcq.section}</span>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-amber-600 transition-colors">
                      {mcq.title}
                    </h3>
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                    {mcq.desc}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {mcq.badges.map((b, bIdx) => (
                      <span key={bIdx} className="px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-900 rounded text-xs font-bold">
                        {b}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-amber-100 flex items-center justify-between text-amber-700 font-extrabold text-sm group-hover:text-amber-900">
                  <div className="flex items-center gap-2">
                    <PlayCircle className="w-5 h-5 text-amber-600 group-hover:scale-110 transition-transform" />
                    <span>Start Practice Test 🎲</span>
                  </div>
                  <span className="text-xs px-2.5 py-1 bg-amber-100 rounded-full font-bold">6 Scenarios</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW SECTION 3: ACRONYM FLASHCARD DICTIONARY */}
      {(activeTab === 'all' || activeTab === 'acronyms') && (
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between border-b-2 border-blue-100 pb-3">
            <h2 className="text-2xl font-black text-blue-950 flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-100 text-blue-700">🏷️</span>
              <span>Domain 1.0 Acronym Flashcard Dictionary</span>
              <span className="text-xs px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-extrabold">Instant Memory Review</span>
            </h2>
            <span className="text-xs font-extrabold text-blue-700">{filteredAcronyms.length} Terms</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAcronyms.map((acronym, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-4 border-2 border-blue-200 shadow-sm hover:border-blue-400 transition-all space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="px-2.5 py-1 bg-blue-600 text-white rounded-xl font-black text-sm">{acronym.term}</span>
                  <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200">Sec {acronym.section}</span>
                </div>
                <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">{acronym.name}</h4>
                <p className="text-slate-600 text-xs leading-normal font-medium">{acronym.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
