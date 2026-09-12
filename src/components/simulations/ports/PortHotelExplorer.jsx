import React, { useState } from 'react';
import { PORT_DATA, TWIN_PAIRS } from './portData';
import { sounds } from '../../../utils/audio';
import { 
  Building, 
  Lock, 
  Unlock, 
  Info, 
  X, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ShieldAlert, 
  Eye, 
  Search, 
  KeyRound,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';

export default function PortHotelExplorer({ onLaunchCourier }) {
  const [selectedPort, setSelectedPort] = useState(null);
  const [filter, setFilter] = useState('twins'); // 'twins', 'all', 'web', 'remote', 'email', 'infrastructure'
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenPort = (portItem) => {
    sounds.playPop();
    setSelectedPort(portItem);
  };

  const handleCloseModal = () => {
    sounds.playPop();
    setSelectedPort(null);
  };

  const handleFilterChange = (newFilter) => {
    sounds.playPop();
    setFilter(newFilter);
  };

  const filteredPorts = PORT_DATA.filter((item) => {
    const matchesSearch = 
      item.port.toString().includes(searchQuery) ||
      item.protocol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clerk.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (filter === 'all' || filter === 'twins') return true;
    return item.category === filter;
  });

  return (
    <div class="space-y-8">
      {/* Visual Metaphor Banner */}
      <div class="bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden">
        <div class="absolute -right-12 -bottom-12 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        
        <div class="relative z-10 space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black backdrop-blur-md">
            <Building class="w-4 h-4 text-yellow-300" />
            <span>The 65,535-Door Metaphor</span>
          </div>

          <h2 class="text-2xl sm:text-3xl font-black tracking-tight">
            The Port Grand Hotel 🏨
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-sm">
            <div class="bg-white/15 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
              <div class="font-extrabold text-yellow-200 flex items-center gap-2 mb-1">
                <span>📍 Street Address = IP Address</span>
              </div>
              <p class="text-amber-100 text-xs sm:text-sm leading-relaxed">
                Example: <strong>192.168.1.100</strong> or <strong>142.250.190.46</strong>. Gets the mail truck to the right building in the city.
              </p>
            </div>

            <div class="bg-white/15 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
              <div class="font-extrabold text-emerald-200 flex items-center gap-2 mb-1">
                <span>🚪 Room Door Number = Port Number</span>
              </div>
              <p class="text-amber-100 text-xs sm:text-sm leading-relaxed">
                Example: <strong>Door 80</strong>, <strong>Door 443</strong>, <strong>Door 22</strong>. Tells the mailman which specialist clerk inside receives the message!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div class="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm">
        
        {/* Filters */}
        <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <button
            onClick={() => handleFilterChange('twins')}
            class={`px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap flex items-center gap-1.5 border-2 ${
              filter === 'twins'
                ? 'bg-amber-500 border-amber-600 text-white shadow-md shadow-amber-200 scale-105'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>👯 Insecure vs Armored Twins</span>
          </button>

          <button
            onClick={() => handleFilterChange('all')}
            class={`px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap flex items-center gap-1.5 border-2 ${
              filter === 'all'
                ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-105'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🏨 All Hotel Doors ({PORT_DATA.length})</span>
          </button>

          <button
            onClick={() => handleFilterChange('web')}
            class={`px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap border-2 ${
              filter === 'web'
                ? 'bg-sky-600 border-sky-700 text-white shadow-md scale-105'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🌐 Web</span>
          </button>

          <button
            onClick={() => handleFilterChange('remote')}
            class={`px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap border-2 ${
              filter === 'remote'
                ? 'bg-purple-600 border-purple-700 text-white shadow-md scale-105'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>💻 Remote Admin</span>
          </button>

          <button
            onClick={() => handleFilterChange('email')}
            class={`px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap border-2 ${
              filter === 'email'
                ? 'bg-rose-600 border-rose-700 text-white shadow-md scale-105'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>✉️ Email</span>
          </button>

          <button
            onClick={() => handleFilterChange('infrastructure')}
            class={`px-3.5 py-2 rounded-xl font-black text-xs transition-all whitespace-nowrap border-2 ${
              filter === 'infrastructure'
                ? 'bg-emerald-600 border-emerald-700 text-white shadow-md scale-105'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>⚙️ Core Infrastructure</span>
          </button>
        </div>

        {/* Search Input */}
        <div class="relative min-w-[200px]">
          <Search class="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search port, name, clerk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            class="w-full pl-9 pr-3 py-2 bg-slate-50 border-2 border-slate-200 rounded-xl text-xs font-bold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* VIEW MODE: TWIN PAIRS SHOWCASE (The #1 CompTIA Tested Concept) */}
      {filter === 'twins' && searchQuery === '' && (
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-xl font-black text-slate-900 flex items-center gap-2">
                <span>The Insecure vs. Armored Twins</span>
                <Sparkles class="w-5 h-5 text-amber-500 fill-amber-300" />
              </h3>
              <p class="text-slate-500 text-xs sm:text-sm font-medium">
                CompTIA Security+ loves testing whether you can replace an <strong>unencrypted risky port</strong> with its <strong>armored encrypted twin</strong>!
              </p>
            </div>
            <span class="text-xs font-black px-3 py-1 bg-amber-100 text-amber-900 rounded-full border border-amber-300">
              6 Core Exam Pairs
            </span>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {TWIN_PAIRS.map((pair, idx) => {
              const insecureData = PORT_DATA.find(p => p.port === pair.insecure);
              const secureData = PORT_DATA.find(p => p.port === pair.secure);

              return (
                <div 
                  key={idx}
                  class="bg-white rounded-3xl p-5 border-3 border-slate-200 shadow-md hover:shadow-lg transition-all space-y-4"
                >
                  <div class="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div class="flex items-center gap-2">
                      <span class="text-2xl">{pair.icon}</span>
                      <div>
                        <h4 class="font-black text-slate-800 text-base">{pair.title}</h4>
                        <p class="text-xs text-slate-500 font-semibold">{pair.desc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Side-by-Side Cards */}
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Insecure Twin */}
                    <div 
                      onClick={() => handleOpenPort(insecureData)}
                      class="bg-rose-50/70 border-2 border-rose-300 hover:border-rose-500 rounded-2xl p-3.5 cursor-pointer transition-all hover:scale-[1.02] space-y-2 group relative"
                    >
                      <div class="flex items-center justify-between">
                        <span class="px-2 py-0.5 bg-rose-200 text-rose-900 rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                          <Unlock class="w-3 h-3" />
                          <span>Cleartext / Risky</span>
                        </span>
                        <span class="text-base">{insecureData?.emoji}</span>
                      </div>

                      <div>
                        <div class="text-2xl font-black text-rose-900">
                          Port {insecureData?.port}
                        </div>
                        <div class="font-extrabold text-xs text-rose-700">
                          {insecureData?.protocol}
                        </div>
                      </div>

                      <p class="text-[11px] text-rose-800 font-medium line-clamp-2 leading-relaxed">
                        {insecureData?.simpleAnalogy}
                      </p>

                      <div class="pt-1 text-[10px] text-rose-600 font-bold flex items-center gap-1 group-hover:underline">
                        <span>Click to view room details</span>
                        <ArrowRight class="w-3 h-3" />
                      </div>
                    </div>

                    {/* Secure Armored Twin */}
                    <div 
                      onClick={() => handleOpenPort(secureData)}
                      class="bg-emerald-50/70 border-2 border-emerald-300 hover:border-emerald-500 rounded-2xl p-3.5 cursor-pointer transition-all hover:scale-[1.02] space-y-2 group relative"
                    >
                      <div class="flex items-center justify-between">
                        <span class="px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-lg text-[10px] font-black uppercase flex items-center gap-1">
                          <Lock class="w-3 h-3" />
                          <span>Armored / Encrypted</span>
                        </span>
                        <span class="text-base">{secureData?.emoji}</span>
                      </div>

                      <div>
                        <div class="text-2xl font-black text-emerald-900">
                          Port {secureData?.port}
                        </div>
                        <div class="font-extrabold text-xs text-emerald-700">
                          {secureData?.protocol}
                        </div>
                      </div>

                      <p class="text-[11px] text-emerald-800 font-medium line-clamp-2 leading-relaxed">
                        {secureData?.simpleAnalogy}
                      </p>

                      <div class="pt-1 text-[10px] text-emerald-600 font-bold flex items-center gap-1 group-hover:underline">
                        <span>Click to view room details</span>
                        <ArrowRight class="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                  {/* Summary Footer */}
                  <div class="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 font-semibold flex items-center gap-2">
                    <span class="font-black text-amber-600 shrink-0">Sec+ Rule:</span>
                    <span>{pair.summary}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW MODE: ALL HOTEL DOORS GRID */}
      {(filter !== 'twins' || searchQuery !== '') && (
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-black text-slate-900 flex items-center gap-2">
              <span>Hotel Rooms Directory</span>
              <span class="text-xs bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full font-bold">
                {filteredPorts.length} Rooms
              </span>
            </h3>
            <p class="text-xs text-slate-500 hidden sm:block">Click any room door to inspect the room clerk</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPorts.map((item) => (
              <div
                key={item.port}
                onClick={() => handleOpenPort(item)}
                class={`group rounded-3xl p-5 border-3 transition-all cursor-pointer hover:shadow-xl hover:scale-[1.02] flex flex-col justify-between space-y-4 ${
                  item.isSecure
                    ? 'bg-gradient-to-br from-emerald-50 to-teal-50/50 border-emerald-300 hover:border-emerald-500 text-emerald-950'
                    : 'bg-gradient-to-br from-rose-50 to-orange-50/50 border-rose-300 hover:border-rose-500 text-rose-950'
                }`}
              >
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="text-3xl group-hover:scale-125 transition-transform">
                      {item.emoji}
                    </span>
                    <span class={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase flex items-center gap-1 border ${
                      item.isSecure
                        ? 'bg-emerald-200/80 text-emerald-900 border-emerald-300'
                        : 'bg-rose-200/80 text-rose-900 border-rose-300'
                    }`}>
                      {item.isSecure ? <Lock class="w-3 h-3" /> : <Unlock class="w-3 h-3" />}
                      <span>{item.transport}</span>
                    </span>
                  </div>

                  <div>
                    <div class="flex items-baseline gap-1.5">
                      <span class="text-xs font-extrabold uppercase opacity-70">Door</span>
                      <span class="text-3xl font-black tracking-tight">{item.port}</span>
                    </div>
                    <div class="text-base font-black truncate">{item.protocol}</div>
                    <div class="text-[11px] font-bold opacity-75 truncate">{item.clerk}</div>
                  </div>

                  <p class="text-xs opacity-90 line-clamp-2 leading-relaxed">
                    {item.simpleAnalogy}
                  </p>
                </div>

                <div class="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-extrabold">
                  <span class="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Inspect Room</span>
                    <ArrowRight class="w-3.5 h-3.5" />
                  </span>
                  <span class="text-[10px] opacity-70 uppercase font-black">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EXPLAIN LIKE I'M 5 MODAL POPUP */}
      {selectedPort && (
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div 
            class="bg-white rounded-3xl max-w-2xl w-full border-4 border-amber-300 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div class={`p-6 border-b-2 flex items-center justify-between ${
              selectedPort.isSecure 
                ? 'bg-emerald-500 text-white border-emerald-600' 
                : 'bg-rose-500 text-white border-rose-600'
            }`}>
              <div class="flex items-center gap-3">
                <span class="text-4xl p-2 bg-white/20 rounded-2xl backdrop-blur-md">
                  {selectedPort.emoji}
                </span>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 bg-white/20 rounded-full text-xs font-black uppercase">
                      Door {selectedPort.port} • {selectedPort.transport}
                    </span>
                    <span class="text-xs font-bold opacity-90">{selectedPort.securityBadge}</span>
                  </div>
                  <h3 class="text-2xl sm:text-3xl font-black">
                    {selectedPort.protocol} ({selectedPort.fullName})
                  </h3>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                class="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-all active:scale-95"
              >
                <X class="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div class="p-6 overflow-y-auto space-y-6 text-slate-800">
              
              {/* Room & Clerk Profile */}
              <div class="bg-amber-50/80 border-2 border-amber-200 rounded-2xl p-4 flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-amber-200 flex items-center justify-center text-2xl shrink-0 font-bold">
                  🛎️
                </div>
                <div>
                  <span class="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">Assigned Room & Clerk</span>
                  <div class="text-base font-black text-slate-900">{selectedPort.hotelRoom}</div>
                  <div class="text-xs font-bold text-amber-900">Room Clerk: {selectedPort.clerk}</div>
                </div>
              </div>

              {/* 1. The Layman Story / Analogy */}
              <div class="space-y-2">
                <div class="flex items-center gap-2 font-black text-base text-slate-900">
                  <Sparkles class="w-5 h-5 text-amber-500" />
                  <span>Explain Like I'm 5 (The Story)</span>
                </div>
                <div class="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 text-sm leading-relaxed text-slate-700 font-medium">
                  {selectedPort.simpleAnalogy}
                </div>
              </div>

              {/* 2. The Hacker Risk / Why It Matters */}
              <div class="space-y-2">
                <div class="flex items-center gap-2 font-black text-base text-rose-700">
                  <AlertTriangle class="w-5 h-5 text-rose-500" />
                  <span>The Hacker & Security Risk</span>
                </div>
                <div class="bg-rose-50 border-2 border-rose-200 rounded-2xl p-4 text-xs sm:text-sm leading-relaxed text-rose-900 font-medium">
                  {selectedPort.whyHackersLoveIt}
                </div>
              </div>

              {/* 3. CompTIA Sec+ Exam Trap / Cheat Code */}
              <div class="space-y-2">
                <div class="flex items-center gap-2 font-black text-base text-indigo-700">
                  <KeyRound class="w-5 h-5 text-indigo-600" />
                  <span>CompTIA Security+ Exam "Cheat Code"</span>
                </div>
                <div class="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 text-xs sm:text-sm leading-relaxed text-indigo-950 font-medium">
                  {selectedPort.examCheatCode}
                </div>
              </div>

              {/* Live Payload Preview */}
              <div class="space-y-2">
                <div class="flex items-center gap-2 font-black text-xs uppercase tracking-wider text-slate-500">
                  <Eye class="w-4 h-4" />
                  <span>What Travels In The Packet</span>
                </div>
                <div class="bg-slate-900 text-emerald-400 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
                  {selectedPort.packetPayload}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div class="p-4 bg-slate-50 border-t-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleCloseModal}
                class="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-extrabold text-xs rounded-xl transition-all"
              >
                Close Room Card
              </button>

              <button
                onClick={() => {
                  sounds.playSuccess();
                  handleCloseModal();
                  if (onLaunchCourier) onLaunchCourier(selectedPort);
                }}
                class="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-xs rounded-xl shadow-md flex items-center gap-2 transition-all active:scale-95"
              >
                <Play class="w-4 h-4 fill-white" />
                <span>Test Live Packet Courier on Port {selectedPort.port}!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
