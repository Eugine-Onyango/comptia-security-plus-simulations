import React, { useState } from 'react';
import { HardDrive, Usb, Lock, Unlock, ShieldCheck, ShieldAlert, FileText, CheckCircle2, UserCheck, UserX } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function DataAtRestSim() {
  const [driveType, setDriveType] = useState('ssd'); // 'ssd' or 'usb'
  const [efsEnabled, setEfsEnabled] = useState(false);
  const [userRole, setUserRole] = useState('owner'); // 'owner' or 'thief'

  const handleToggleEfs = () => {
    const next = !efsEnabled;
    setEfsEnabled(next);
    if (next) sounds.playSuccess();
    else sounds.playPop();
  };

  const handleSelectDrive = (dt) => {
    sounds.playPop();
    setDriveType(dt);
  };

  const handleSelectRole = (role) => {
    sounds.playPop();
    setUserRole(role);
  };

  const canAccess = userRole === 'owner' || (!efsEnabled && userRole === 'thief');

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-sky-50 border-2 border-sky-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-sky-200/80 text-sky-900 font-extrabold text-xs rounded-full">
            <span>Data at Rest • SSD, USB, EFS</span>
          </div>
          <h3 class="text-2xl font-extrabold text-sky-950">
            Data at Rest = Protecting Sleeping Files! 🛌
          </h3>
          <p class="text-sky-900/80 font-medium text-sm">
            Data sitting inside an <strong>SSD</strong> or <strong>USB</strong> flash drive is called "Data at Rest". Features like <strong>EFS (Encrypting File System)</strong> lock files so thieves can't read them!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-sky-200 text-sky-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Locking your diary inside a bedroom drawer.
        </div>
      </div>

      {/* Control Panel & Interactive Playground */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <HardDrive class="w-5 h-5 text-sky-600" />
            <span>Storage & Encryption Controls</span>
          </h4>

          {/* 1. Drive Selection */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              1. Select Storage Media:
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectDrive('ssd')}
                class={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  driveType === 'ssd'
                    ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <HardDrive class="w-4 h-4 text-sky-600" />
                <span>Internal SSD Drive</span>
              </button>

              <button
                onClick={() => handleSelectDrive('usb')}
                class={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  driveType === 'usb'
                    ? 'border-sky-500 bg-sky-50 text-sky-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Usb class="w-4 h-4 text-sky-600" />
                <span>Portable USB Drive</span>
              </button>
            </div>
          </div>

          {/* 2. EFS Toggle */}
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span class="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
              Windows File Encryption (EFS):
            </span>

            <button
              onClick={handleToggleEfs}
              class={`w-full p-3.5 rounded-2xl border-4 text-left transition-all flex items-center justify-between active:scale-95 ${
                efsEnabled
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-extrabold shadow-md'
                  : 'border-amber-400 bg-amber-50 text-amber-950 font-extrabold'
              }`}
            >
              <div>
                <div class="text-sm font-extrabold">
                  {efsEnabled ? '🔒 EFS Encryption ON' : '🔓 EFS Encryption OFF'}
                </div>
                <div class="text-[11px] font-medium text-slate-600 mt-0.5">
                  {efsEnabled ? 'Files encrypted with user account key' : 'Plaintext files unprotected on disk'}
                </div>
              </div>

              <div class={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                efsEnabled ? 'bg-emerald-500 text-white' : 'bg-amber-400 text-amber-950'
              }`}>
                {efsEnabled ? '🔒' : '🔓'}
              </div>
            </button>
          </div>

          {/* 3. Who is Accessing? */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              2. Test Person Accessing File:
            </label>
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectRole('owner')}
                class={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  userRole === 'owner'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <UserCheck class="w-4 h-4 text-emerald-600" />
                <span>Authorized Owner</span>
              </button>

              <button
                onClick={() => handleSelectRole('thief')}
                class={`p-3 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition-all ${
                  userRole === 'thief'
                    ? 'border-rose-500 bg-rose-50 text-rose-900 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <UserX class="w-4 h-4 text-rose-600" />
                <span>Drive Thief / Stranger</span>
              </button>
            </div>
          </div>

        </div>

        {/* Visual Drive Viewer (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[360px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {driveType === 'ssd' ? 'Internal SSD Drive Viewer' : 'Portable USB Drive Viewer'}
            </span>
            <span class={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              efsEnabled ? 'bg-emerald-500 text-slate-950' : 'bg-amber-400 text-amber-950'
            }`}>
              {efsEnabled ? 'EFS Encrypted' : 'Unencrypted File'}
            </span>
          </div>

          {/* File Graphics Display */}
          <div class="my-6 space-y-4">
            
            <div class="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center gap-4">
              <div class={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl font-bold shrink-0 ${
                canAccess ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
              }`}>
                {canAccess ? '📄' : '🚫'}
              </div>

              <div class="space-y-1 overflow-hidden">
                <div class="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Target File:</div>
                <div class="text-base font-extrabold text-white truncate">
                  Tax_Returns_&_Passwords.docx
                </div>
                <div class="text-xs font-mono">
                  {canAccess ? (
                    <span class="text-emerald-400 font-bold">"Social Security #123-45-6789 • Password: Secret123"</span>
                  ) : (
                    <span class="text-rose-400 font-bold">•••• •••• •••• •••• (ACCESS DENIED - EFS ENCRYPTED)</span>
                  )}
                </div>
              </div>
            </div>

            {/* Explanation Banner */}
            <div class={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
              canAccess 
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200' 
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200 animate-pulse'
            }`}>
              {canAccess ? (
                userRole === 'owner' ? (
                  <span>✅ <strong>Owner Logged In:</strong> Windows automatically decrypts the EFS file for you!</span>
                ) : (
                  <span>⚠️ <strong>EFS is OFF!</strong> The thief plugged the {driveType.toUpperCase()} drive into another computer and stole your private files!</span>
                )
              ) : (
                <span>🚫 <strong>EFS Blocked the Thief!</strong> Even though the thief has the physical {driveType.toUpperCase()} drive, they do not have your Windows EFS account key!</span>
              )}
            </div>

          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">SSD = Solid-State Drive</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">USB = Flash Storage Drive</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">EFS = Encrypting File System</span>
          </div>

        </div>

      </div>

    </div>
  );
}
