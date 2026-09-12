import React, { useState } from 'react';
import { ArrowLeft, Building, Play, ShieldAlert, Award, Sparkles, BookOpen } from 'lucide-react';
import PortHotelExplorer from './ports/PortHotelExplorer';
import LiveCourierAnimation from './ports/LiveCourierAnimation';
import FirewallBouncerChallenge from './ports/FirewallBouncerChallenge';
import { sounds } from '../../utils/audio';

export default function PortsHotelStudioSim({ onBack }) {
  const [activeTab, setActiveTab] = useState('hotel'); // 'hotel', 'courier', 'bouncer'
  const [courierPort, setCourierPort] = useState(null);

  const handleTabChange = (tab) => {
    sounds.playPop();
    setActiveTab(tab);
  };

  const handleLaunchCourierFromExplorer = (portItem) => {
    setCourierPort(portItem);
    setActiveTab('courier');
  };

  return (
    <div class="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* Navigation Breadcrumb */}
      <div class="flex items-center justify-between">
        <button
          onClick={onBack}
          class="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 text-amber-900 border-2 border-amber-300 rounded-2xl font-black text-xs sm:text-sm transition-all shadow-sm active:scale-95"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div class="flex items-center gap-2">
          <span class="px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full font-black text-xs">
            CompTIA Security+ SY0-701 • Ports & Protocols Live Studio
          </span>
        </div>
      </div>

      {/* Main Studio Title Card */}
      <div class="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-md space-y-2">
        <div class="flex items-center gap-3">
          <span class="text-4xl">🚪🏨</span>
          <div>
            <h1 class="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              The Port Hotel & Security Courier
            </h1>
            <p class="text-slate-600 font-medium text-xs sm:text-base">
              The ultimate no-jargon simulation of network ports! Master cleartext vs. encrypted twins, watch packets walk the wire, and test your skills as the Firewall Bouncer!
            </p>
          </div>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
        
        {/* Tab 1: Hotel Explorer */}
        <button
          onClick={() => handleTabChange('hotel')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 ${
            activeTab === 'hotel'
              ? 'bg-amber-500 border-amber-600 text-white shadow-lg shadow-amber-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Building class="w-4 h-4" />
          <span>1. The Grand Port Hotel (Explore Doors) 🏨</span>
        </button>

        {/* Tab 2: Live Courier */}
        <button
          onClick={() => handleTabChange('courier')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 ${
            activeTab === 'courier'
              ? 'bg-indigo-600 border-indigo-700 text-white shadow-lg shadow-indigo-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Play class="w-4 h-4 fill-current" />
          <span>2. Live Packet Courier & Wiretap (Live Animation) 🏃‍♂️📦</span>
        </button>

        {/* Tab 3: Bouncer Challenge */}
        <button
          onClick={() => handleTabChange('bouncer')}
          class={`px-5 py-3 rounded-2xl font-black text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 border-3 ${
            activeTab === 'bouncer'
              ? 'bg-emerald-600 border-emerald-700 text-white shadow-lg shadow-emerald-200 scale-105'
              : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
          }`}
        >
          <Award class="w-4 h-4" />
          <span>3. Firewall Bouncer Challenge (Exam Game) 💂‍♂️</span>
        </button>

      </div>

      {/* Main Tab Content Display */}
      <div class="min-h-[500px]">
        {activeTab === 'hotel' && (
          <PortHotelExplorer onLaunchCourier={handleLaunchCourierFromExplorer} />
        )}

        {activeTab === 'courier' && (
          <LiveCourierAnimation preselectedPort={courierPort} />
        )}

        {activeTab === 'bouncer' && (
          <FirewallBouncerChallenge />
        )}
      </div>

    </div>
  );
}
