import React, { useState } from 'react';
import { Award, BookOpen, CheckCircle2, Shield, Globe, Layers } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function IsoNistSim() {
  // ISO/IEC State
  const [ismsCertified, setIsmsCertified] = useState(false);
  const [isAuditing, setIsAuditing] = useState(false);

  // NIST SP State
  const [selectedSp, setSelectedSp] = useState('sp800_53'); // 'sp800_53', 'sp800_61', 'sp800_37'

  const handleAuditIsms = () => {
    sounds.playBuzzer();
    setIsAuditing(true);

    setTimeout(() => {
      sounds.playSuccess();
      setIsAuditing(false);
      setIsmsCertified(true);
    }, 1500);
  };

  const handleSelectSp = (sp) => {
    sounds.playPop();
    setSelectedSp(sp);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-purple-50 border-2 border-purple-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-200/80 text-purple-900 font-extrabold text-xs rounded-full">
            <span>Global Security Frameworks • ISO, IEC, NIST SP</span>
          </div>
          <h3 class="text-2xl font-extrabold text-purple-950">
            ISO / IEC 27001 ISMS Auditor & NIST SP Matrix! 🥇📜
          </h3>
          <p class="text-purple-900/80 font-medium text-sm">
            <strong>ISO/IEC 27001</strong> is the international gold standard published jointly by <strong>ISO</strong> and <strong>IEC</strong> for enterprise security management systems, while <strong>NIST SP (Special Publications)</strong> provide federal security control blueprints!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-purple-200 text-purple-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: ISO 9001 quality seal (ISO/IEC 27001) vs Building code safety book (NIST SP).
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* ISO/IEC 27001 Auditor Panel (Left) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Globe class="w-5 h-5 text-purple-600" />
            <span>1. ISO / IEC 27001 ISMS Audit Engine</span>
          </h4>

          <div className={`p-5 rounded-2xl border-2 transition-all space-y-3 ${
            ismsCertified ? 'bg-purple-950 border-purple-500 text-purple-100' : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            <div class="flex items-center justify-between font-bold text-xs">
              <span>ISO/IEC Certification Status:</span>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${ismsCertified ? 'bg-emerald-500 text-slate-950' : 'bg-purple-900 text-purple-200'}`}>
                {ismsCertified ? 'ISO/IEC 27001 CERTIFIED 🥇' : 'ISMS AUDIT PENDING'}
              </span>
            </div>

            <div class="grid grid-cols-2 gap-2 text-center text-[10px] font-mono">
              <div class="p-2 bg-slate-900 rounded-xl border border-slate-800">1. Plan (Scope)</div>
              <div class="p-2 bg-slate-900 rounded-xl border border-slate-800">2. Do (Implement)</div>
              <div class="p-2 bg-slate-900 rounded-xl border border-slate-800">3. Check (Audit)</div>
              <div class="p-2 bg-slate-900 rounded-xl border border-slate-800">4. Act (Improve)</div>
            </div>
          </div>

          <button
            onClick={handleAuditIsms}
            disabled={isAuditing || ismsCertified}
            class={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all shadow-sm flex items-center justify-center gap-2 ${
              ismsCertified
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : isAuditing
                  ? 'bg-purple-500 text-white animate-pulse'
                  : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
            }`}
          >
            <Award class="w-4 h-4" />
            <span>{ismsCertified ? '✅ ISO/IEC 27001 Audit Completed' : isAuditing ? 'Auditing ISMS Controls...' : 'Conduct ISO / IEC 27001 Certification Audit'}</span>
          </button>
        </div>

        {/* NIST SP Catalog Panel (Right) */}
        <div class="md:col-span-6 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <BookOpen class="w-5 h-5 text-purple-600" />
            <span>2. NIST Special Publication Catalog</span>
          </h4>

          <div class="space-y-2">
            <button
              onClick={() => handleSelectSp('sp800_53')}
              class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                selectedSp === 'sp800_53'
                  ? 'border-purple-500 bg-purple-50 text-purple-950'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              📘 NIST SP 800-53 (Security & Privacy Controls)
            </button>

            <button
              onClick={() => handleSelectSp('sp800_61')}
              class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                selectedSp === 'sp800_61'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-950'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              📙 NIST SP 800-61 (Computer Incident Handling Guide)
            </button>

            <button
              onClick={() => handleSelectSp('sp800_37')}
              class={`w-full p-3 rounded-xl border-2 text-left font-bold text-xs transition-all ${
                selectedSp === 'sp800_37'
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950'
                  : 'border-slate-200 text-slate-700'
              }`}
            >
              📗 NIST SP 800-37 (Risk Management Framework RMF)
            </button>
          </div>

          <div class="p-4 bg-slate-900 rounded-2xl text-white space-y-1 font-mono text-xs">
            <div class="text-purple-300 font-bold text-xs">
              {selectedSp === 'sp800_53' && 'NIST SP 800-53:'}
              {selectedSp === 'sp800_61' && 'NIST SP 800-61:'}
              {selectedSp === 'sp800_37' && 'NIST SP 800-37:'}
            </div>
            <p class="text-slate-300 text-[11px] font-sans font-medium">
              {selectedSp === 'sp800_53' && 'Catalog of security and privacy controls for federal systems and organizations (AC, IA, IR, SC, etc.).'}
              {selectedSp === 'sp800_61' && 'Step-by-step guide for establishing an Incident Response (IR) capability and handling cyber attacks.'}
              {selectedSp === 'sp800_37' && 'RMF lifecycle process for managing risk across federal and commercial IT systems.'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
