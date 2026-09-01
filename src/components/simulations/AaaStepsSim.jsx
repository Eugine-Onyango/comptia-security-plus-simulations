import React, { useState } from 'react';
import { UserCheck, Key, Ticket, FileText, CheckCircle2, XCircle, ArrowRight, ShieldCheck, UserX, Lock, Shield } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function AaaStepsSim() {
  const [userName, setUserName] = useState('Alice');
  const [userRole, setUserRole] = useState('employee'); // 'employee' or 'admin'
  const [passInput, setPassInput] = useState('Secret123');
  const [step, setStep] = useState(0); // 0: Idle, 1: Authenticated, 2: Authorized, 3: Accounted
  const [isProcessing, setIsProcessing] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);

  const handleRunAaa = () => {
    sounds.playPop();
    setIsProcessing(true);
    setStep(1);

    // Step 1: Authentication
    setTimeout(() => {
      sounds.playPop();
      setStep(2);
    }, 800);

    // Step 2: Authorization
    setTimeout(() => {
      sounds.playPop();
      setStep(3);
    }, 1600);

    // Step 3: Accounting Logged
    setTimeout(() => {
      sounds.playSuccess();
      setIsProcessing(false);
      const timestamp = new Date().toLocaleTimeString();
      const newEntry = `[${timestamp}] USER: ${userName} | ROLE: ${userRole.toUpperCase()} | AUTH: SUCCESS | ACCESS: ${userRole === 'admin' ? 'FULL ADMIN' : 'STAFF ONLY'}`;
      setAuditLogs(prev => [newEntry, ...prev.slice(0, 4)]);
    }, 2400);
  };

  const handleReset = () => {
    sounds.playPop();
    setStep(0);
    setIsProcessing(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-indigo-50 border-2 border-indigo-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-200/80 text-indigo-900 font-extrabold text-xs rounded-full">
            <span>The 3 A's • AAA Framework</span>
          </div>
          <h3 class="text-2xl font-extrabold text-indigo-950">
            AAA = The 3-Step Access Security Guard! 🪪🎟️🧾
          </h3>
          <p class="text-indigo-900/80 font-medium text-sm">
            <strong>Authentication</strong> checks WHO you are. <strong>Authorization</strong> checks WHAT you can do. <strong>Accounting</strong> LOGS everything you did!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-indigo-200 text-indigo-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Showing ID at a hotel, getting a room key, and receiving a checkout receipt.
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <UserCheck class="w-5 h-5 text-indigo-600" />
            <span>Configure Test User</span>
          </h4>

          {/* User Input */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              1. Username & Password:
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              disabled={step > 0}
              class="w-full px-3.5 py-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none font-bold text-sm text-slate-800"
              placeholder="Username"
            />
          </div>

          {/* Role Selection */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              2. User Role:
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setUserRole('employee');
                  sounds.playPop();
                }}
                disabled={step > 0}
                class={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  userRole === 'employee'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <UserCheck class="w-4 h-4 text-indigo-600" />
                <span>Staff Employee</span>
              </button>

              <button
                onClick={() => {
                  setUserRole('admin');
                  sounds.playPop();
                }}
                disabled={step > 0}
                class={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  userRole === 'admin'
                    ? 'border-purple-500 bg-purple-50 text-purple-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <ShieldCheck class="w-4 h-4 text-purple-600" />
                <span>System Admin</span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleRunAaa}
            disabled={isProcessing || step === 3}
            class={`w-full py-4 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${
              step === 3
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-not-allowed'
                : isProcessing
                  ? 'bg-amber-400 text-amber-950 animate-pulse cursor-wait'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
            }`}
          >
            {step === 3 ? (
              <span>AAA Inspection Complete!</span>
            ) : isProcessing ? (
              <span>Running AAA Inspection...</span>
            ) : (
              <>
                <ArrowRight class="w-5 h-5" />
                <span>Run 3-Step AAA Inspection</span>
              </>
            )}
          </button>

          {step > 0 && (
            <button
              onClick={handleReset}
              class="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl text-xs transition-all"
            >
              Reset Test User
            </button>
          )}
        </div>

        {/* Visual 3-Stage Stepper (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[380px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">AAA Pipeline Visual Inspector</span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              step === 3 ? 'bg-emerald-500 text-slate-950' : 'bg-indigo-500 text-white'
            }`}>
              {step === 3 ? 'AAA Complete' : `Stage ${step}/3 Active`}
            </span>
          </div>

          {/* 3 A's Progress Cards */}
          <div class="my-4 space-y-3">
            
            {/* 1st A: Authentication */}
            <div class={`p-4 rounded-2xl border-2 transition-all ${
              step >= 1 ? 'bg-indigo-950/80 border-indigo-400 text-indigo-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <Key class="w-4 h-4 text-indigo-400" /> 1st A: Authentication (Who Are You?)
                </span>
                {step >= 1 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-xs font-medium">
                {step >= 1 ? `✅ Credentials Verified! Identity confirmed as ${userName}.` : '⏳ Waiting to verify password & identity...'}
              </p>
            </div>

            {/* 2nd A: Authorization */}
            <div class={`p-4 rounded-2xl border-2 transition-all ${
              step >= 2 ? 'bg-purple-950/80 border-purple-400 text-purple-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <Ticket class="w-4 h-4 text-purple-400" /> 2nd A: Authorization (What Can You Do?)
                </span>
                {step >= 2 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-xs font-medium">
                {step >= 2 
                  ? userRole === 'admin' 
                    ? '✅ Admin Ticket Granted! Access allowed to ALL server rooms & settings.' 
                    : '✅ Staff Ticket Granted! Access allowed to Staff Files (Admin Vault Locked 🔒).'
                  : '⏳ Waiting to check role permissions...'}
              </p>
            </div>

            {/* 3rd A: Accounting */}
            <div class={`p-4 rounded-2xl border-2 transition-all ${
              step >= 3 ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between text-xs font-extrabold uppercase tracking-wider mb-1">
                <span class="flex items-center gap-1.5">
                  <FileText class="w-4 h-4 text-emerald-400" /> 3rd A: Accounting (Audit Log Record)
                </span>
                {step >= 3 && <CheckCircle2 class="w-4 h-4 text-emerald-400" />}
              </div>
              <p class="text-xs font-medium">
                {step >= 3 ? `✅ Audit Log Entry Saved! Recorded login timestamp, user ID, and actions.` : '⏳ Waiting to log audit trail...'}
              </p>
            </div>

          </div>

          {/* Audit Trail Log Preview */}
          {auditLogs.length > 0 && (
            <div class="p-3 bg-slate-950 border border-slate-800 rounded-xl font-mono text-[10px] text-emerald-300 truncate">
              {auditLogs[0]}
            </div>
          )}

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">Authentication = Identity Check</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Authorization = Permission Ticket</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">Accounting = Audit Log Trail</span>
          </div>

        </div>

      </div>

    </div>
  );
}
