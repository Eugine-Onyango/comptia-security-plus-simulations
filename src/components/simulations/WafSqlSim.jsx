import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Database, Code, CheckCircle2, XCircle, Terminal, ArrowRight, Lock } from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function WafSqlSim() {
  const [wafActive, setWafActive] = useState(true);
  const [queryInput, setQueryInput] = useState("SELECT * FROM products WHERE name = 'Shoes'");
  const [isAttacking, setIsAttacking] = useState(false);
  const [resultStatus, setResultStatus] = useState(null); // 'safe', 'blocked', 'breached'

  const handleSendQuery = () => {
    sounds.playPop();
    setResultStatus(null);

    const isSqlInjection = queryInput.includes('OR 1=1') || queryInput.includes('DROP TABLE') || queryInput.includes("'");

    setTimeout(() => {
      if (isSqlInjection && !wafActive) {
        sounds.playBuzzer();
        setResultStatus('breached');
      } else if (isSqlInjection && wafActive) {
        sounds.playSuccess();
        setResultStatus('blocked');
      } else {
        sounds.playSuccess();
        setResultStatus('safe');
      }
    }, 800);
  };

  const handleSelectPreset = (preset) => {
    sounds.playPop();
    if (preset === 'normal') {
      setQueryInput("SELECT * FROM products WHERE id = 101");
    } else {
      setQueryInput("' OR '1'='1'; DROP TABLE credit_cards; --");
    }
    setResultStatus(null);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-rose-50 border-2 border-rose-200 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div class="space-y-1">
          <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-200/80 text-rose-900 font-extrabold text-xs rounded-full">
            <span>Web Application Security • WAF, SQL, PCI DSS, OSI</span>
          </div>
          <h3 class="text-2xl font-extrabold text-rose-950">
            WAF Web Application Firewall & SQL Injection! 🛡️💉
          </h3>
          <p class="text-rose-900/80 font-medium text-sm">
            A <strong>WAF (Web Application Firewall)</strong> operates at <strong>OSI Layer 7</strong> to inspect HTTP conversations and block <strong>SQL Injection</strong> attacks targeting database cardholder data—a mandatory control under <strong>PCI DSS</strong>!
          </p>
        </div>

        <div class="bg-white px-4 py-2 rounded-2xl border border-rose-200 text-rose-900 font-bold text-xs shadow-sm shrink-0">
          Real Life Analogy: Bank teller bodyguard checking ID before allowing withdrawal requests.
        </div>
      </div>

      {/* Main Grid */}
      <div class="grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Control Panel (Left) */}
        <div class="md:col-span-5 bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-5">
          <h4 class="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <ShieldCheck class="w-5 h-5 text-rose-600" />
            <span>WAF & SQL Injection Controls</span>
          </h4>

          {/* WAF Switch */}
          <div class="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
            <div>
              <div class="font-extrabold text-xs text-slate-800">WAF Security Guard:</div>
              <div class="text-[11px] text-slate-500 font-medium">{wafActive ? '🟢 WAF Layer 7 Inspection ACTIVE' : '🔴 WAF Disabled'}</div>
            </div>
            <button
              onClick={() => {
                sounds.playPop();
                setWafActive(!wafActive);
                setResultStatus(null);
              }}
              class={`px-3 py-1.5 rounded-xl font-extrabold text-xs shadow-sm transition-all ${
                wafActive ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {wafActive ? 'WAF ON' : 'WAF OFF'}
            </button>
          </div>

          {/* Preset Buttons */}
          <div class="space-y-2">
            <label class="block text-xs font-bold text-slate-600 uppercase tracking-wider">
              Select Query Payload:
            </label>
            
            <div class="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleSelectPreset('normal')}
                class="p-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-extrabold text-xs text-slate-700 transition-all text-center"
              >
                Normal Search Query
              </button>
              <button
                onClick={() => handleSelectPreset('attack')}
                class="p-2.5 bg-rose-100 hover:bg-rose-200 rounded-xl font-extrabold text-xs text-rose-900 transition-all text-center"
              >
                SQL Injection Attack 💉
              </button>
            </div>
          </div>

          {/* Query Input Box */}
          <div class="space-y-1">
            <label class="block text-xs font-mono text-slate-500 font-bold">HTTP Request Payload:</label>
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              class="w-full p-3 rounded-xl border-2 border-slate-200 font-mono text-xs text-slate-900 focus:border-rose-500 outline-none"
            />
          </div>

          <button
            onClick={handleSendQuery}
            class="w-full py-3.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-sm rounded-2xl shadow-md shadow-rose-200 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowRight class="w-4 h-4" />
            <span>Send HTTP Query to Database</span>
          </button>
        </div>

        {/* Visual Inspection Display (Right) */}
        <div class="md:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col justify-between min-h-[400px] shadow-lg relative overflow-hidden">
          
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Code class="w-4 h-4 text-rose-400" /> WAF Layer 7 Inspection Pipeline
            </span>
            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
              wafActive ? 'bg-emerald-500 text-slate-950' : 'bg-rose-500 text-white'
            }`}>
              {wafActive ? 'PCI DSS COMPLIANT' : 'NON-COMPLIANT'}
            </span>
          </div>

          {/* Pipeline Cards */}
          <div class="my-4 space-y-3 font-mono text-xs">
            
            {/* WAF Shield Box */}
            <div className={`p-4 rounded-2xl border-2 transition-all ${
              wafActive 
                ? 'bg-rose-950/80 border-rose-500 text-rose-100 shadow-md' 
                : 'bg-slate-950 border-slate-800 text-slate-500'
            }`}>
              <div class="flex items-center justify-between font-bold text-xs mb-1">
                <span>🛡️ WAF (Web Application Firewall) Layer 7</span>
                <span class="text-[10px] text-rose-300">PCI DSS MANDATED</span>
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-300">
                Inspects HTTP/HTTPS POST & GET conversations for malicious SQL syntax.
              </p>
            </div>

            {/* SQL Database Box */}
            <div class="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-1">
              <div class="flex items-center justify-between font-bold text-xs text-sky-400">
                <span class="flex items-center gap-1.5"><Database class="w-4 h-4" /> SQL Database Server</span>
                <span class="text-[10px] text-slate-400">Cardholder Vault</span>
              </div>
              <p class="text-[11px] font-sans font-medium text-slate-400">
                Executes valid SQL database queries (`SELECT * FROM products`).
              </p>
            </div>

          </div>

          {/* Result Banner */}
          <div className={`p-4 rounded-2xl border-2 text-xs font-semibold text-center transition-all ${
            resultStatus === 'blocked'
              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
              : resultStatus === 'breached'
                ? 'bg-rose-950 border-rose-500 text-rose-200 animate-bounce'
                : resultStatus === 'safe'
                  ? 'bg-sky-950 border-sky-500 text-sky-200'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
          }`}>
            {resultStatus === 'blocked' && (
              <span>✅ <strong>SQL INJECTION BLOCKED BY WAF!</strong> The Layer 7 <strong>WAF</strong> intercepted the malicious `' OR 1=1` query before it could touch the database. <strong>PCI DSS</strong> cardholder data protected!</span>
            )}
            {resultStatus === 'breached' && (
              <span>💥 <strong>DATABASE BREACHED!</strong> Without a <strong>WAF</strong>, the malicious SQL injection query dumped all credit card records! Mandatory <strong>PCI DSS</strong> violation!</span>
            )}
            {resultStatus === 'safe' && (
              <span>✅ <strong>NORMAL QUERY EXECUTED!</strong> Clean HTTP request processed safely by the SQL database.</span>
            )}
            {!resultStatus && (
              <span>🛡️ <strong>WAF Ready:</strong> Send a query to test WAF SQL injection filtering.</span>
            )}
          </div>

          {/* Cheat-sheet bar */}
          <div class="pt-3 border-t border-white/10 flex flex-wrap gap-2 text-[10px] font-bold text-slate-400">
            <span class="px-2 py-0.5 bg-slate-800 rounded">WAF = Web Application Firewall</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">SQL = Structured Query Language</span>
            <span class="px-2 py-0.5 bg-slate-800 rounded">PCI DSS = Card Industry Standard</span>
          </div>

        </div>

      </div>

    </div>
  );
}
