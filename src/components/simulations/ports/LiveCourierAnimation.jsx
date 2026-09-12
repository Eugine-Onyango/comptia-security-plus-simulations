import React, { useState, useEffect, useRef } from 'react';
import { PORT_DATA } from './portData';
import { sounds } from '../../../utils/audio';
import { 
  Play, 
  RotateCcw, 
  ShieldCheck, 
  ShieldAlert, 
  Laptop, 
  Server, 
  Eye, 
  Lock, 
  Unlock, 
  Sparkles, 
  Zap, 
  CheckCircle2, 
  AlertTriangle,
  Flame,
  Binary
} from 'lucide-react';

export default function LiveCourierAnimation({ preselectedPort }) {
  const [selectedPortId, setSelectedPortId] = useState(preselectedPort ? preselectedPort.port : 80);
  const [payloadType, setPayloadType] = useState('password'); // 'password', 'credit_card', 'command', 'email'
  const [customText, setCustomText] = useState('');
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [courierState, setCourierState] = useState('idle'); // 'idle', 'dispatching', 'intercepted', 'delivered'
  const [speed, setSpeed] = useState(1); // 0.5, 1, 2

  const animationFrameRef = useRef(null);

  // Update selected port if preselectedPort changes
  useEffect(() => {
    if (preselectedPort) {
      setSelectedPortId(preselectedPort.port);
      resetCourier();
    }
  }, [preselectedPort]);

  const activePort = PORT_DATA.find(p => p.port === selectedPortId) || PORT_DATA[0];

  const getPayloadString = () => {
    if (customText) return customText;
    switch (payloadType) {
      case 'password':
        return 'user: eugene | pass: MySecretPassword!2026';
      case 'credit_card':
        return 'Card: 4532-8819-2039-4411 | CVV: 789';
      case 'command':
        return 'sudo reboot --force';
      case 'email':
        return 'Subject: Confidential Payroll & Bonuses';
      default:
        return 'Confidential Business Data';
    }
  };

  const currentPayload = getPayloadString();

  const handleStartCourier = () => {
    sounds.playPop();
    setIsSimulating(true);
    setCourierState('dispatching');
    setProgress(0);
  };

  const resetCourier = () => {
    sounds.playPop();
    setIsSimulating(false);
    setProgress(0);
    setCourierState('idle');
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  };

  // Animation Loop
  useEffect(() => {
    if (!isSimulating) return;

    let currentProgress = 0;
    const stepDuration = 0.5 * speed;

    const interval = setInterval(() => {
      currentProgress += stepDuration;

      if (currentProgress >= 40 && currentProgress <= 60 && courierState !== 'intercepted') {
        setCourierState('intercepted');
      } else if (currentProgress > 60 && courierState === 'intercepted') {
        setCourierState('delivered');
      }

      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        setIsSimulating(false);
        setCourierState('delivered');
        sounds.playSuccess();
        clearInterval(interval);
      } else {
        setProgress(currentProgress);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [isSimulating, speed, courierState]);

  return (
    <div class="space-y-8">
      {/* Header Info */}
      <div class="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">🏃‍♂️📦</span>
            <h2 class="text-2xl font-black text-slate-900">
              Live Packet Courier & Wiretap Snooper
            </h2>
          </div>
          <p class="text-xs sm:text-sm text-slate-600 font-medium mt-1">
            Watch an animated packet runner walk the wire. See why hackers easily steal cleartext vs get frustrated by encrypted locks!
          </p>
        </div>

        {/* Speed Controls */}
        <div class="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-black">
          <span class="text-slate-400 px-2">Speed:</span>
          {[0.5, 1, 2].map((s) => (
            <button
              key={s}
              onClick={() => { sounds.playPop(); setSpeed(s); }}
              class={`px-3 py-1 rounded-xl transition-all ${
                speed === s 
                  ? 'bg-amber-500 text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s === 0.5 ? '0.5x 🐢' : s === 1 ? '1x 🏃' : '2x 🚀'}
            </button>
          ))}
        </div>
      </div>

      {/* Control Panel: Select Port & Payload */}
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* 1. Choose Port Door */}
        <div class="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-black uppercase text-slate-500 tracking-wider">
              Step 1: Choose Target Door
            </span>
            <span class={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
              activePort.isSecure ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {activePort.isSecure ? 'Encrypted Safe' : 'Cleartext Postcard'}
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {[
              { port: 80, label: '80 (HTTP 📢)' },
              { port: 443, label: '443 (HTTPS 🛡️)' },
              { port: 23, label: '23 (Telnet 📞)' },
              { port: 22, label: '22 (SSH 🕵️‍♂️)' },
              { port: 21, label: '21 (FTP 📂)' },
              { port: 990, label: '990 (FTPS 🗄️)' },
              { port: 53, label: '53 (DNS 📖)' },
              { port: 3389, label: '3389 (RDP 🖥️)' },
              { port: 389, label: '389 (LDAP 📇)' },
              { port: 636, label: '636 (LDAPS 🔐)' },
              { port: 143, label: '143 (IMAP ✉️)' },
              { port: 993, label: '993 (IMAPS 🛡️✉️)' }
            ].map((item) => (
              <button
                key={item.port}
                onClick={() => {
                  sounds.playPop();
                  setSelectedPortId(item.port);
                  resetCourier();
                }}
                class={`p-2.5 rounded-xl font-black text-xs transition-all border-2 text-left flex items-center justify-between ${
                  selectedPortId === item.port
                    ? 'bg-amber-500 border-amber-600 text-white shadow-md'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Choose Secret Payload */}
        <div class="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm space-y-3">
          <span class="text-xs font-black uppercase text-slate-500 tracking-wider">
            Step 2: Choose Secret Message
          </span>

          <div class="grid grid-cols-2 gap-2">
            {[
              { id: 'password', label: '🔑 Password', text: 'user: admin | pass: Secret123!' },
              { id: 'credit_card', label: '💳 Credit Card', text: 'Visa: 4532-8819-2039-4411' },
              { id: 'command', label: '💻 Terminal Cmd', text: 'sudo rm -rf /var/logs' },
              { id: 'email', label: '✉️ Private Email', text: 'Confidential Executive Salaries' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => {
                  sounds.playPop();
                  setPayloadType(p.id);
                  setCustomText('');
                  resetCourier();
                }}
                class={`p-2 rounded-xl font-extrabold text-xs transition-all border-2 text-left ${
                  payloadType === p.id && !customText
                    ? 'bg-indigo-600 border-indigo-700 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div class="pt-1">
            <input
              type="text"
              placeholder="Or type your own custom secret text..."
              value={customText}
              onChange={(e) => {
                setCustomText(e.target.value);
                resetCourier();
              }}
              class="w-full px-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* 3. Launch Controls */}
        <div class="bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <span class="text-xs font-black uppercase text-slate-500 tracking-wider">
              Step 3: Dispatch & Observe
            </span>
            <div class="mt-2 bg-slate-50 rounded-2xl p-3 border border-slate-200 text-xs space-y-1">
              <div class="text-slate-500 font-bold">Courier Carrying:</div>
              <div class="font-mono font-bold text-slate-800 text-[11px] truncate bg-white p-2 rounded-lg border border-slate-200">
                {currentPayload}
              </div>
            </div>
          </div>

          <div class="flex gap-2">
            <button
              onClick={handleStartCourier}
              disabled={isSimulating}
              class={`flex-1 py-3 px-4 rounded-2xl font-black text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                isSimulating 
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:brightness-110 shadow-amber-200'
              }`}
            >
              <Play class="w-4 h-4 fill-white" />
              <span>{isSimulating ? 'Courier Running...' : 'Dispatch Courier!'}</span>
            </button>

            <button
              onClick={resetCourier}
              class="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold transition-all active:scale-95"
              title="Reset"
            >
              <RotateCcw class="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>

      {/* ANIMATION ARENA (THE LIVE WIRE) */}
      <div class="bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border-4 border-slate-700 relative overflow-hidden min-h-[360px] flex flex-col justify-between">
        
        {/* Arena Top Status Bar */}
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div class="flex items-center gap-2 text-xs font-black">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span class="text-amber-300">Target: Port {activePort.port} ({activePort.protocol})</span>
          </div>

          <div class="text-xs font-bold text-slate-300">
            {progress === 0 && 'Ready to send packet'}
            {progress > 0 && progress < 40 && 'Courier traveling across the local network...'}
            {progress >= 40 && progress <= 60 && '⚠️ Passing through Public Wi-Fi / ISP Wiretap!'}
            {progress > 60 && progress < 100 && 'Arriving at Destination Hotel Server...'}
            {progress === 100 && '🎉 Packet successfully arrived at Door ' + activePort.port}
          </div>

          <div class="text-xs font-mono bg-white/10 px-2.5 py-1 rounded-full">
            Wire Progress: {Math.round(progress)}%
          </div>
        </div>

        {/* The Physical Track */}
        <div class="relative py-12">
          
          {/* Wire Line */}
          <div class="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-2.5 bg-slate-700 rounded-full overflow-hidden">
            <div 
              class={`h-full transition-all duration-75 ${
                activePort.isSecure ? 'bg-emerald-400' : 'bg-rose-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Glowing pulses along wire */}
          <div class="absolute left-16 right-16 top-1/2 -translate-y-1/2 h-2.5 flex justify-between pointer-events-none opacity-30">
            <div class="w-2 h-2 bg-yellow-300 rounded-full animate-ping" />
            <div class="w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-100" />
            <div class="w-2 h-2 bg-yellow-300 rounded-full animate-ping delay-200" />
          </div>

          <div class="relative flex items-center justify-between z-10">
            
            {/* 1. SENDER STATION (Client Laptop) */}
            <div class="flex flex-col items-center text-center space-y-2">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-indigo-600/80 border-2 border-indigo-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Laptop class="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <div>
                <div class="font-black text-xs sm:text-sm text-white">Your Laptop</div>
                <div class="text-[10px] text-indigo-300 font-mono">192.168.1.45</div>
              </div>
            </div>

            {/* 2. THE SNOOPER / HACKER IN THE MIDDLE */}
            <div class="flex flex-col items-center text-center space-y-2 relative">
              
              {/* Snooper Speech Bubble when courier is near */}
              {progress >= 35 && progress <= 70 && (
                <div class={`absolute -top-24 sm:-top-28 px-3.5 py-2 rounded-2xl text-xs font-black shadow-xl border-2 whitespace-nowrap animate-bounce z-20 ${
                  activePort.isSecure
                    ? 'bg-slate-800 text-yellow-300 border-yellow-400/60'
                    : 'bg-rose-600 text-white border-white'
                }`}>
                  {activePort.isSecure ? (
                    <div class="flex items-center gap-1.5">
                      <span>😵‍💫 ARGH! Steel Box! Can't read:</span>
                      <span class="font-mono text-slate-300">#@!$&%*?</span>
                    </div>
                  ) : (
                    <div class="flex items-center gap-1.5">
                      <span>😈 HAHA! Naked Postcard! Stole:</span>
                      <span class="font-mono bg-white text-rose-700 px-1.5 py-0.5 rounded">
                        {currentPayload.slice(0, 18)}...
                      </span>
                    </div>
                  )}
                </div>
              )}

              <div class={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center transition-all border-2 ${
                progress >= 35 && progress <= 70
                  ? activePort.isSecure 
                    ? 'bg-slate-800 border-amber-400 scale-110 shadow-lg shadow-amber-500/20'
                    : 'bg-rose-900/90 border-rose-400 scale-125 shadow-xl shadow-rose-500/50'
                  : 'bg-slate-800/80 border-slate-600'
              }`}>
                <span class="text-3xl sm:text-4xl">
                  {progress >= 35 && progress <= 70
                    ? activePort.isSecure ? '😵‍💫' : '🥷'
                    : '🕵️'}
                </span>
              </div>

              <div>
                <div class="font-black text-xs sm:text-sm text-slate-300">Wiretap Snooper</div>
                <div class="text-[10px] text-slate-400 font-mono">Public Wi-Fi / Router</div>
              </div>
            </div>

            {/* 3. DESTINATION HOTEL SERVER */}
            <div class="flex flex-col items-center text-center space-y-2">
              <div class={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center transition-all border-2 ${
                progress === 100 
                  ? 'bg-emerald-600 border-emerald-300 scale-110 shadow-xl shadow-emerald-500/40' 
                  : 'bg-slate-800 border-slate-600'
              }`}>
                <div class="text-center">
                  <span class="text-2xl sm:text-3xl">{activePort.emoji}</span>
                </div>
              </div>

              <div>
                <div class="font-black text-xs sm:text-sm text-white">
                  Door {activePort.port} ({activePort.protocol})
                </div>
                <div class="text-[10px] text-emerald-300 font-mono">142.250.190.46</div>
              </div>
            </div>

          </div>

          {/* THE MOVING PACKET COURIER */}
          <div 
            class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all pointer-events-none z-20"
            style={{ 
              left: `calc(4rem + (100% - 8rem) * ${progress / 100})`,
              display: progress === 0 ? 'none' : 'block'
            }}
          >
            <div class={`p-3 rounded-2xl border-3 shadow-2xl flex items-center gap-2 backdrop-blur-md ${
              activePort.isSecure
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100 shadow-emerald-500/40'
                : 'bg-rose-950/90 border-rose-400 text-rose-100 shadow-rose-500/40'
            }`}>
              <span class="text-2xl animate-bounce">🏃‍♂️</span>
              <div class="text-left">
                <div class="flex items-center gap-1 text-[10px] font-black uppercase">
                  {activePort.isSecure ? (
                    <>
                      <Lock class="w-3 h-3 text-emerald-400" />
                      <span>Armored Steel Safe</span>
                    </>
                  ) : (
                    <>
                      <Unlock class="w-3 h-3 text-rose-400" />
                      <span>Naked Postcard</span>
                    </>
                  )}
                </div>
                <div class="text-xs font-mono font-bold truncate max-w-[120px] sm:max-w-[180px]">
                  {activePort.isSecure ? '🔒 [AES-GCM TLS 1.3]' : currentPayload}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Live Packet Inspection Readout */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
          
          {/* What Sender Sent */}
          <div class="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-1">
            <div class="font-extrabold text-slate-300 flex items-center gap-1.5">
              <span>📤 What Your Laptop Sent:</span>
            </div>
            <div class="font-mono text-[11px] text-amber-300 break-all bg-black/30 p-2 rounded-lg">
              {currentPayload}
            </div>
          </div>

          {/* What Snooper Captured */}
          <div class={`rounded-2xl p-3.5 border space-y-1 ${
            activePort.isSecure 
              ? 'bg-emerald-950/30 border-emerald-500/30' 
              : 'bg-rose-950/30 border-rose-500/30'
          }`}>
            <div class="font-extrabold flex items-center justify-between">
              <span class={activePort.isSecure ? 'text-emerald-300' : 'text-rose-300'}>
                {activePort.isSecure ? '🛡️ Wiretap Snooper Captured (Encrypted):' : '🚨 Wiretap Snooper Captured (STOLEN!):'}
              </span>
              <span class="text-[10px] font-mono opacity-70">
                {activePort.isSecure ? 'Safe from theft' : 'Severe Breach!'}
              </span>
            </div>
            <div class={`font-mono text-[11px] break-all p-2 rounded-lg ${
              activePort.isSecure 
                ? 'bg-emerald-900/30 text-emerald-400' 
                : 'bg-rose-900/30 text-rose-300 font-black'
            }`}>
              {activePort.isSecure 
                ? '8b e4 f1 a9 3c d0 19 aa ... (Cannot be deciphered!)' 
                : currentPayload}
            </div>
          </div>

        </div>

      </div>

      {/* CompTIA Sec+ Key Takeaway Box */}
      <div class={`rounded-3xl p-6 border-3 shadow-md space-y-2 ${
        activePort.isSecure
          ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
          : 'bg-rose-50 border-rose-300 text-rose-950'
      }`}>
        <div class="flex items-center gap-2 font-black text-base">
          {activePort.isSecure ? <ShieldCheck class="w-5 h-5 text-emerald-600" /> : <ShieldAlert class="w-5 h-5 text-rose-600" />}
          <span>CompTIA Security+ Lesson for Port {activePort.port} ({activePort.protocol})</span>
        </div>

        <p class="text-xs sm:text-sm font-medium leading-relaxed">
          {activePort.isSecure
            ? `Port ${activePort.port} enforces cryptographic protection. Even when adversaries compromise network switches or sniff wireless frames, data confidentiality is mathematically preserved.`
            : `Port ${activePort.port} is inherently vulnerable to On-Path (Man-in-the-Middle) sniffing attacks. In CompTIA Sec+, you must ALWAYS decommission or replace Port ${activePort.port} with its secure counterpart (Port ${activePort.twinPort || 'secure alternative'}).`}
        </p>
      </div>

    </div>
  );
}
