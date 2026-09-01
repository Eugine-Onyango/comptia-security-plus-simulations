import React, { useState } from 'react';
import { FileText, Code, Database, EyeOff, Eye, CheckCircle2, RefreshCw } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DataConverterSim() {
  const [dataFormat, setDataFormat] = useState('json'); // 'csv', 'xml', 'json'
  const [isRedacted, setIsRedacted] = useState(false);

  const sampleData = {
    name: "Jane Smith",
    ssn: "266-12-1112",
    medicalDiagnosis: "Type 2 Diabetes (HIPAA Protected)",
    department: "Engineering"
  };

  const handleToggleRedact = () => {
    sounds.playPop();
    setIsRedacted(!isRedacted);
  };

  const handleSelectFormat = (fmt) => {
    sounds.playPop();
    setDataFormat(fmt);
  };

  // Format rendering logic
  const renderFormattedData = () => {
    const ssnVal = isRedacted ? "***-**-1112 (REDACTED PII)" : sampleData.ssn;
    const phiVal = isRedacted ? "[REDACTED PHI MEDICAL RECORD]" : sampleData.medicalDiagnosis;

    if (dataFormat === 'csv') {
      return `Name, SSN (PII), Medical Diagnosis (PHI), Department\n"${sampleData.name}", "${ssnVal}", "${phiVal}", "${sampleData.department}"`;
    }

    if (dataFormat === 'xml') {
      return `<patient_record>\n  <name>${sampleData.name}</name>\n  <ssn_pii>${ssnVal}</ssn_pii>\n  <health_phi>${phiVal}</health_phi>\n  <dept>${sampleData.department}</dept>\n</patient_record>`;
    }

    // JSON
    return JSON.stringify({
      name: sampleData.name,
      ssn_pii: ssnVal,
      health_phi: phiVal,
      department: sampleData.department
    }, null, 2);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-teal-50 border-2 border-teal-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-200/80 text-teal-900 font-extrabold text-xs rounded-full">
            <span>Data Structures & Privacy • CSV, XML, JSON, PII, PHI</span>
          </div>
          <h3 class="text-2xl font-extrabold text-teal-950">
            Structured Data Formats & PII/PHI Redactor! 📄🕵️
          </h3>
          <p class="text-teal-900/80 font-medium text-sm">
            Data is formatted as <strong>CSV</strong>, <strong>XML</strong>, or <strong>JSON</strong>. Sensitive data includes <strong>PII (Personally Identifiable Info)</strong> and <strong>PHI (Protected Health Info)</strong> which must be redacted or encrypted!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-teal-200 text-teal-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Redacting sensitive medical details on a hospital discharge form.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <FileText class="w-5 h-5 text-teal-600" />
            <span>Format & Privacy Controls</span>
          </h4>

          {/* Format Selector */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">Select Data Structure Format:</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleSelectFormat('json')}
                class={`p-3 rounded-2xl border-2 font-extrabold text-xs transition-all ${
                  dataFormat === 'json'
                    ? 'border-teal-500 bg-teal-50 text-teal-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                JSON
              </button>
              <button
                onClick={() => handleSelectFormat('xml')}
                class={`p-3 rounded-2xl border-2 font-extrabold text-xs transition-all ${
                  dataFormat === 'xml'
                    ? 'border-teal-500 bg-teal-50 text-teal-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                XML
              </button>
              <button
                onClick={() => handleSelectFormat('csv')}
                class={`p-3 rounded-2xl border-2 font-extrabold text-xs transition-all ${
                  dataFormat === 'csv'
                    ? 'border-teal-500 bg-teal-50 text-teal-950 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                CSV
              </button>
            </div>
          </div>

          {/* Redact Action Button */}
          <button
            onClick={handleToggleRedact}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              isRedacted
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-teal-600 hover:bg-teal-700 text-white shadow-teal-200'
            }`}
          >
            {isRedacted ? <Eye class="w-4 h-4" /> : <EyeOff class="w-4 h-4" />}
            <span>{isRedacted ? 'Unmask Sensitive Data' : 'Redact PII & PHI Sensitive Data'}</span>
          </button>

        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Code class="w-4 h-4 text-teal-400" /> Data Record Viewer ({dataFormat.toUpperCase()})
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              isRedacted ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-slate-950'
            }`}>
              {isRedacted ? 'PII / PHI REDACTED' : 'UNMASKED SENSITIVE DATA'}
            </span>
          </div>

          {/* Code Viewer Container */}
          <div class="my-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl font-mono text-xs text-teal-300 leading-relaxed overflow-x-auto min-h-[180px]">
            <pre>{renderFormattedData()}</pre>
          </div>

          {/* Privacy Legend */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            isRedacted
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : 'bg-amber-950 border-amber-500 text-amber-200'
          }`}>
            {isRedacted ? (
              <span>✅ <strong>PII & PHI PROTECTED!</strong> Social Security Numbers (PII) and Medical Diagnoses (PHI) masked to comply with privacy laws like HIPAA.</span>
            ) : (
              <span>⚠️ <strong>RAW SENSITIVE DATA EXPOSED!</strong> Contains unmasked <strong>PII</strong> (SSN) and <strong>PHI</strong> (Medical Diagnosis). Must be protected before sharing!</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">CSV / XML / JSON = Formats</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PII = Personal Info</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PHI = Protected Health Info</span>
          </div>

        </div>

      </div>

    </div>
  );
}
