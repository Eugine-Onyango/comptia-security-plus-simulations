import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  ArrowDown,
  ArrowUp,
  ArrowRight,
  Gift,
  Home,
  Truck,
  Building2,
  ShieldCheck,
  Pencil,
  Globe2,
  HelpCircle,
  HeartHandshake
} from 'lucide-react';
import { topic1Subtopics } from './ccnaTopicsData';
import { sounds } from '../../utils/audio';

export default function CcnaIntroInteractiveSim({ activeSubtopicId, onSelectSubtopic }) {
  // Default to first subtopic if none passed
  const currentId = activeSubtopicId || topic1Subtopics[0].id;
  const currentSubtopic = topic1Subtopics.find((s) => s.id === currentId) || topic1Subtopics[0];
  const currentIndex = topic1Subtopics.findIndex((s) => s.id === currentSubtopic.id);

  // Analogy theme toggle inside the interactive playground: 'both' | 'smartcity' | 'kenyan'
  const [worldTheme, setWorldTheme] = useState('both');

  // --- SUBTOPIC 1.1 STATE: What is a Network? ---
  const [roadsBuilt, setRoadsBuilt] = useState({ ab: true, bc: false, ac: false });
  const [selectedGift, setSelectedGift] = useState('mandazi'); // 'letter' | 'mandazi' | 'toy'
  const [activeDelivery, setActiveDelivery] = useState(null); // { from: 'A', to: 'B', progress: 0..100 }
  const [deliveryMessage, setDeliveryMessage] = useState(
    'Tap any road button to connect the homes, then tap "Send to House B" or "Send to House C"!'
  );

  // --- SUBTOPIC 1.2 STATE: Local Area Network (LAN) ---
  const [lanFenceUp, setLanFenceUp] = useState(true);
  const [lanAnimTarget, setLanAnimTarget] = useState(null); // 'local2' | 'local3' | 'distant'
  const [lanFeedback, setLanFeedback] = useState(
    'The Light-Blue LAN Fence (Nyumba Kumi Court Fence) is up! Tap a house to test sending a message.'
  );

  // --- SUBTOPIC 1.3 STATE: OSI & TCP/IP Models ---
  const [selectedTcpFloor, setSelectedTcpFloor] = useState(4); // 4, 3, 2, 1
  const [elevatorStep, setElevatorStep] = useState(null); // null or 0..8

  // --- SUBTOPIC 1.4 STATE: TCP/IP Suite of Protocols ---
  const [activeProtocolFloor, setActiveProtocolFloor] = useState(3);
  const [transportMode, setTransportMode] = useState(null); // 'tcp' | 'udp'
  const [tcpStep, setTcpStep] = useState(0); // 0=idle, 1=Hi, 2=Hi back, 3=Let's go, 4=Driving, 5=Delivered
  const [udpStep, setUdpStep] = useState(0); // 0=idle, 1=Zooming, 2=Dropped

  // --- SUBTOPIC 1.5 STATE: Encapsulation ---
  // wrapLevel: 0 = raw toy/phone, 1 = L4 box, 2 = L3 box, 3 = L2/L1 ribbon box, 4 = arrived at friend's house, 5 = unwrapped
  const [wrapLevel, setWrapLevel] = useState(0);
  const [wrapDirection, setWrapDirection] = useState('down'); // 'down' (wrapping) | 'up' (unwrapping)

  // --- MINI-GAME QUIZ STATE ---
  const [gameAnswers, setGameAnswers] = useState({});

  // Helper for Subtopic 1.1 Delivery Animation
  const triggerNetworkDelivery = (targetHouse) => {
    if (targetHouse === 'B' && !roadsBuilt.ab) {
      sounds.playBuzzer();
      setDeliveryMessage(
        'Oops! There is no road between House A and House B yet! Click "Build Road A ↔ B" first.'
      );
      return;
    }
    if (targetHouse === 'C' && !roadsBuilt.ac && !(roadsBuilt.ab && roadsBuilt.bc)) {
      sounds.playBuzzer();
      setDeliveryMessage(
        'Oops! House C is not connected yet! Build Road A ↔ C (or connect A ↔ B and B ↔ C) first!'
      );
      return;
    }
    sounds.playPop();
    setActiveDelivery({ to: targetHouse, step: 'moving' });
    setDeliveryMessage(
      targetHouse === 'B'
        ? 'Zoom! Your parcel is traveling along the road from Home A to Home B!'
        : 'Hooray! Your parcel is traveling across the network roads to Home C!'
    );
    setTimeout(() => {
      sounds.playSuccess();
      setActiveDelivery({ to: targetHouse, step: 'arrived' });
      setDeliveryMessage(
        `Delivered safely to Home ${targetHouse}! Because the homes are linked by roads, they form a real Network!`
      );
    }, 900);
  };

  // Helper for Subtopic 1.3 Elevator Animation
  useEffect(() => {
    if (elevatorStep === null) return;
    if (elevatorStep > 8) {
      sounds.playSuccess();
      const timer = setTimeout(() => setElevatorStep(null), 1200);
      return () => clearTimeout(timer);
    }
    const floorMap = [4, 3, 2, 1, 1, 1, 2, 3, 4];
    setSelectedTcpFloor(floorMap[elevatorStep] || 4);
    const timer = setTimeout(() => {
      sounds.playPop();
      setElevatorStep((prev) => (prev !== null ? prev + 1 : null));
    }, 650);
    return () => clearTimeout(timer);
  }, [elevatorStep]);

  // Helper for Subtopic 1.4 TCP Handshake Animation
  const runTcpAnimation = () => {
    sounds.playPop();
    setTransportMode('tcp');
    setUdpStep(0);
    setTcpStep(1);
    setTimeout(() => {
      sounds.playPop();
      setTcpStep(2);
    }, 700);
    setTimeout(() => {
      sounds.playPop();
      setTcpStep(3);
    }, 1400);
    setTimeout(() => {
      sounds.playPop();
      setTcpStep(4);
    }, 2100);
    setTimeout(() => {
      sounds.playSuccess();
      setTcpStep(5);
    }, 2900);
  };

  const runUdpAnimation = () => {
    sounds.playPop();
    setTransportMode('udp');
    setTcpStep(0);
    setUdpStep(1);
    setTimeout(() => {
      sounds.playSuccess();
      setUdpStep(2);
    }, 650);
  };

  // Helper for Subtopic 1.5 Encapsulation Step
  const handleNextWrapStep = () => {
    if (wrapDirection === 'down') {
      if (wrapLevel < 3) {
        sounds.playPop();
        setWrapLevel(wrapLevel + 1);
      } else if (wrapLevel === 3) {
        sounds.playSuccess();
        setWrapDirection('up');
      }
    } else {
      if (wrapLevel > 0) {
        sounds.playPop();
        setWrapLevel(wrapLevel - 1);
      } else {
        sounds.playSuccess();
        confetti({ particleCount: 55, spread: 60, origin: { y: 0.7 } });
      }
    }
  };

  const resetWrap = () => {
    sounds.playPop();
    setWrapLevel(0);
    setWrapDirection('down');
  };

  const osiToTcpData = [
    {
      tcpFloor: 4,
      tcpName: 'Floor 4: Application Layer',
      osiFloors: [
        { num: 7, name: '7. Application', role: 'Where you write your letter or open a website' },
        { num: 6, name: '6. Presentation', role: 'Translates & formats the message (like JPEG or encryption)' },
        { num: 5, name: '5. Session', role: 'Opens & keeps the conversation polite between two houses' }
      ],
      smartCitySign: '✉️ "HTTP Mail" & 📦 "FTP Box"',
      kenyanSign: '📱 WhatsApp Message / Gikomba Order Note (Counter 7, 6 & 5 combined)',
      kidMeaning: 'Prepares the actual message or gift inside the house before handing it to a courier.'
    },
    {
      tcpFloor: 3,
      tcpName: 'Floor 3: Transport Layer',
      osiFloors: [
        { num: 4, name: '4. Transport', role: 'Picks the van style (TCP tracked or UDP fast) & adds Port door numbers' }
      ],
      smartCitySign: '🚚 "TCP Express Van" & 🚲 "UDP Quick Bike"',
      kenyanSign: '🚐 Tracked Wells Fargo Van (TCP) vs. 🛵 Fast Boda-Boda Rider (UDP)',
      kidMeaning: 'Decides HOW carefully or quickly the parcel travels and which room door (Port) it goes to.'
    },
    {
      tcpFloor: 2,
      tcpName: 'Floor 2: Internet (Network) Layer',
      osiFloors: [
        { num: 3, name: '3. Network', role: 'Writes the From/To IP street numbers and checks the highway map' }
      ],
      smartCitySign: '🗺️ "IP Highway Map"',
      kenyanSign: '📍 Posta Town Code & Google Maps Estate Plot Pin (IP Address)',
      kidMeaning: 'Stamps the sender and receiver street addresses (IP) so routers know which town to send it to.'
    },
    {
      tcpFloor: 1,
      tcpName: 'Floor 1: Network Access (Link) Layer',
      osiFloors: [
        { num: 2, name: '2. Data-Link', role: 'Puts on the Ethernet envelope & checks local number plates (MAC)' },
        { num: 1, name: '1. Physical', role: 'The real copper cables, fiber glass tunnels, & asphalt roads' }
      ],
      smartCitySign: '🛣️ "Ethernet Road & Asphalt Cables"',
      kenyanSign: '🛞 Matatu Number Plate (MAC) + Actual Tarmac/Murram Road (Physical)',
      kidMeaning: 'Puts the parcel onto the real physical road and drives it to the next stop on the street.'
    }
  ];

  const miniCheckQuestions = [
    {
      id: 'q1',
      prompt:
        'Mama Wanjiku connects her laptop and printer inside her living room with a cable so she can print recipes. What has she just created?',
      options: [
        { id: 'a', label: '🏡 A Local Area Network (LAN) — a small neighborhood network inside one place', correct: true },
        { id: 'b', label: '✈️ A Wide Area Network (WAN) across different countries', correct: false }
      ]
    },
    {
      id: 'q2',
      prompt:
        'You want to send a parcel fast with zero waiting and no signature book—just like a Boda-Boda tossing a newspaper at the gate and zooming off. Which Floor 3 helper is that?',
      options: [
        { id: 'a', label: '🚚 TCP (The careful van that waves 3 times and tracks every box)', correct: false },
        { id: 'b', label: '🛵 UDP (The quick no-frills bike/van that drops the gift and zooms away)', correct: true }
      ]
    },
    {
      id: 'q3',
      prompt:
        'As a teddy bear (Data) goes down the floors from Floor 4 to Floor 1, each floor puts it inside a slightly bigger box with a new label. What is this wrapping process called?',
      options: [
        { id: 'a', label: '🎁 Encapsulation (Wrapping parcel-inside-parcel on the way down)', correct: true },
        { id: 'b', label: '📢 Broadcasting (Shouting to every house with a loudspeaker)', correct: false }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      {/* SUBTOPIC SELECTOR PILLS (1.1 to 1.5) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border-4 border-emerald-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Topic 1 • 5 Bite-Sized Subtopics
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 mt-1">
              Choose a Subtopic to Explore & Play 👇
            </h2>
          </div>

          {/* World Analogy Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start">
            <button
              onClick={() => {
                sounds.playPop();
                setWorldTheme('both');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                worldTheme === 'both'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🌍 Both Analogies
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                setWorldTheme('smartcity');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                worldTheme === 'smartcity'
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🏙️ Smart-City
            </button>
            <button
              onClick={() => {
                sounds.playPop();
                setWorldTheme('kenyan');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                worldTheme === 'kenyan'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              🇰🇪 Kenyan Mtaa
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-1">
          {topic1Subtopics.map((sub) => {
            const isSelected = sub.id === currentSubtopic.id;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  sounds.playPop();
                  onSelectSubtopic(sub.id);
                }}
                className={`p-3.5 rounded-2xl border-3 text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white border-emerald-700 shadow-md scale-[1.02]'
                    : 'bg-emerald-50/50 hover:bg-emerald-100/70 border-emerald-200 text-slate-800'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/25 text-white' : 'bg-emerald-200/80 text-emerald-900'
                    }`}
                  >
                    {sub.number}
                  </span>
                  <span className="text-2xl">{sub.icon}</span>
                </div>
                <div className="font-black text-sm mt-2 leading-snug">{sub.title}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION A: SIMPLE LAYMAN EXPLANATION + DUAL ANALOGIES */}
      <div className={`rounded-3xl p-6 sm:p-8 border-4 ${currentSubtopic.pastelBg} ${currentSubtopic.borderColor} shadow-md space-y-6`}>
        {/* Subtopic Header & Layman Box */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-slate-200/80 shadow-sm space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-black ${currentSubtopic.badgeBg}`}>
              Subtopic {currentSubtopic.number} • Plain English (Zero Tech Jargon)
            </span>
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <HeartHandshake className="w-4 h-4 text-rose-500" />
              <span>Friendly for Kids, Seniors & Beginners</span>
            </span>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shrink-0">
              {currentSubtopic.icon}
            </div>
            <div className="space-y-1.5">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                {currentSubtopic.title}
              </h3>
              <p className="text-base sm:text-lg font-extrabold text-emerald-800">
                💡 In One Simple Sentence: {currentSubtopic.laymanTitle}
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                {currentSubtopic.laymanExplanation}
              </p>
            </div>
          </div>
        </div>

        {/* Dual Analogies Grid: Original Smart-City + Kenyan Mtaa Analogy */}
        <div
          className={`grid grid-cols-1 ${
            worldTheme === 'both' ? 'md:grid-cols-2' : 'md:grid-cols-1'
          } gap-5`}
        >
          {/* Card 1: Original Smart-City Analogy */}
          {(worldTheme === 'both' || worldTheme === 'smartcity') && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border-3 border-sky-300 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-sky-100 text-sky-900 text-xs font-black">
                    🏙️ Original Smart-City Analogy (From Your PDF)
                  </span>
                  <span className="text-2xl">{currentSubtopic.smartCityAnalogy.icon}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-sky-950">
                  {currentSubtopic.smartCityAnalogy.title}
                </h4>
                <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 font-extrabold text-sky-900 text-sm sm:text-base">
                  {currentSubtopic.smartCityAnalogy.summary}
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  {currentSubtopic.smartCityAnalogy.details}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-start gap-2 text-xs font-bold text-slate-600">
                <Pencil className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-800">What to sketch in your notebook:</strong>{' '}
                  {currentSubtopic.notebookStep}
                </span>
              </div>
            </div>
          )}

          {/* Card 2: Kenyan Analogy */}
          {(worldTheme === 'both' || worldTheme === 'kenyan') && (
            <div className="bg-white rounded-2xl p-5 sm:p-6 border-3 border-emerald-400 shadow-sm flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black">
                    🇰🇪 Kenyan Everyday Analogy (Mtaa & Safari Style)
                  </span>
                  <span className="text-2xl">{currentSubtopic.kenyanAnalogy.icon}</span>
                </div>
                <h4 className="text-lg sm:text-xl font-black text-emerald-950">
                  {currentSubtopic.kenyanAnalogy.title}
                </h4>
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 font-extrabold text-emerald-900 text-sm sm:text-base">
                  {currentSubtopic.kenyanAnalogy.summary}
                </div>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                  {currentSubtopic.kenyanAnalogy.details}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Picture this in your own neighborhood or upcountry trip and you will never forget how it works!
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION B: INTERACTIVE ANIMATION & MINI-GAME FOR CURRENT SUBTOPIC */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-amber-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl font-black">
              🎮
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-700">
                Hands-On Toybox • Watch & Play
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Interactive Playground: {currentSubtopic.title}
              </h3>
            </div>
          </div>

          {/* Prev / Next Subtopic Buttons */}
          <div className="flex items-center gap-2">
            <button
              disabled={currentIndex === 0}
              onClick={() => {
                sounds.playPop();
                onSelectSubtopic(topic1Subtopics[currentIndex - 1].id);
              }}
              className="px-3.5 py-2 rounded-xl border-2 border-slate-200 font-black text-xs text-slate-700 disabled:opacity-40 hover:bg-slate-100"
            >
              ← Previous
            </button>
            <button
              disabled={currentIndex === topic1Subtopics.length - 1}
              onClick={() => {
                sounds.playPop();
                onSelectSubtopic(topic1Subtopics[currentIndex + 1].id);
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs disabled:opacity-40 shadow-sm"
            >
              Next Subtopic →
            </button>
          </div>
        </div>

        {/* =====================================================================
            PLAYGROUND 1.1: WHAT IS A NETWORK?
           ===================================================================== */}
        {currentSubtopic.id === 'what-is-a-network' && (
          <div className="space-y-6">
            {/* Step Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-emerald-50/70 rounded-2xl p-4 border-2 border-emerald-200 space-y-3">
                <div className="font-black text-sm text-emerald-950">
                  1️⃣ Step 1: Connect the Homes with Roads (Cables)
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'ab', label: 'Road: Home A ↔ Home B' },
                    { key: 'bc', label: 'Road: Home B ↔ Home C' },
                    { key: 'ac', label: 'Road: Home A ↔ Home C' }
                  ].map((r) => (
                    <button
                      key={r.key}
                      onClick={() => {
                        sounds.playPop();
                        setRoadsBuilt((prev) => ({ ...prev, [r.key]: !prev[r.key] }));
                      }}
                      className={`px-3.5 py-2 rounded-xl font-black text-xs border-2 transition-all ${
                        roadsBuilt[r.key]
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm'
                          : 'bg-white text-slate-700 border-slate-300 hover:border-emerald-400'
                      }`}
                    >
                      {roadsBuilt[r.key] ? `✅ ${r.label} (Connected)` : `➕ Build ${r.label}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50/70 rounded-2xl p-4 border-2 border-amber-200 space-y-3">
                <div className="font-black text-sm text-amber-950">
                  2️⃣ Step 2: Pick a Gift & Send It Across Your Network!
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'mandazi', label: '🧺 Sukuma & Mandazi Basket' },
                    { id: 'letter', label: '💌 Friendly Letter' },
                    { id: 'toy', label: '🎁 Birthday Gift Box' }
                  ].map((g) => (
                    <button
                      key={g.id}
                      onClick={() => {
                        sounds.playPop();
                        setSelectedGift(g.id);
                      }}
                      className={`px-3 py-1.5 rounded-xl font-black text-xs border-2 transition-all ${
                        selectedGift === g.id
                          ? 'bg-amber-500 text-white border-amber-600'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Visual Town Board */}
            <div className="bg-gradient-to-b from-emerald-100/70 via-sky-50 to-amber-50 rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 relative overflow-hidden">
              <div className="text-center mb-6">
                <span className="px-4 py-1.5 rounded-full bg-white/90 border-2 border-emerald-300 text-emerald-900 font-black text-xs sm:text-sm shadow-sm">
                  {deliveryMessage}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center relative z-10">
                {/* HOME A */}
                <div className="bg-white rounded-3xl p-5 border-4 border-emerald-400 shadow-md text-center space-y-2">
                  <div className="text-5xl">🏠💻</div>
                  <div className="font-black text-base text-slate-900">
                    {worldTheme === 'smartcity'
                      ? 'House A (Sender PC)'
                      : 'Home A • Mama Wanjiku’s Boma'}
                  </div>
                  <p className="text-xs font-bold text-slate-500">
                    Has {selectedGift === 'mandazi' ? '🧺 Mandazi Basket' : selectedGift === 'letter' ? '💌 Letter' : '🎁 Gift Box'} ready to share!
                  </p>
                  <div className="pt-2 flex flex-col gap-2">
                    <button
                      onClick={() => triggerNetworkDelivery('B')}
                      className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm active:scale-95 transition-all"
                    >
                      🚀 Send to Home B
                    </button>
                    <button
                      onClick={() => triggerNetworkDelivery('C')}
                      className="w-full py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-sm active:scale-95 transition-all"
                    >
                      🚀 Send to Home C
                    </button>
                  </div>
                </div>

                {/* HOME B */}
                <div
                  className={`bg-white rounded-3xl p-5 border-4 transition-all shadow-md text-center space-y-2 ${
                    activeDelivery?.to === 'B' && activeDelivery?.step === 'arrived'
                      ? 'border-amber-500 ring-4 ring-amber-300 scale-105'
                      : 'border-sky-400'
                  }`}
                >
                  <div className="text-5xl">🏡🖥️</div>
                  <div className="font-black text-base text-slate-900">
                    {worldTheme === 'smartcity'
                      ? 'House B (Neighbor PC)'
                      : 'Home B • Baba Otieno’s Boma'}
                  </div>
                  <div className="text-xs font-extrabold text-emerald-700 bg-emerald-50 py-1.5 px-2 rounded-xl border border-emerald-200">
                    {roadsBuilt.ab ? '🛣️ Road A ↔ B Open!' : '🚧 No Direct Road from A'}
                  </div>
                  {activeDelivery?.to === 'B' && (
                    <div className="p-2 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-xs animate-bounce">
                      {activeDelivery.step === 'moving' ? '🛵💨 Parcel on the road...' : '🎉 Parcel Received!'}
                    </div>
                  )}
                </div>

                {/* HOME C */}
                <div
                  className={`bg-white rounded-3xl p-5 border-4 transition-all shadow-md text-center space-y-2 ${
                    activeDelivery?.to === 'C' && activeDelivery?.step === 'arrived'
                      ? 'border-amber-500 ring-4 ring-amber-300 scale-105'
                      : 'border-purple-400'
                  }`}
                >
                  <div className="text-5xl">🏘️🖨️</div>
                  <div className="font-black text-base text-slate-900">
                    {worldTheme === 'smartcity'
                      ? 'House C (Shared Printer/PC)'
                      : 'Home C • Shangazi Halima’s Boma'}
                  </div>
                  <div className="text-xs font-extrabold text-purple-700 bg-purple-50 py-1.5 px-2 rounded-xl border border-purple-200">
                    {roadsBuilt.ac || (roadsBuilt.ab && roadsBuilt.bc)
                      ? '🛣️ Connected to Network!'
                      : '🚧 Disconnected Island'}
                  </div>
                  {activeDelivery?.to === 'C' && (
                    <div className="p-2 rounded-xl bg-amber-100 border-2 border-amber-400 text-amber-950 font-black text-xs animate-bounce">
                      {activeDelivery.step === 'moving' ? '🛵💨 Parcel on the road...' : '🎉 Parcel Received!'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PLAYGROUND 1.2: LOCAL AREA NETWORK (LAN)
           ===================================================================== */}
        {currentSubtopic.id === 'local-area-network' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-sky-50 p-4 rounded-2xl border-2 border-sky-200">
              <div className="space-y-1">
                <div className="font-black text-sm sm:text-base text-sky-950">
                  🟦 Toggle Your Light-Blue LAN Fence (Gated Compound Wall)
                </div>
                <p className="text-xs font-bold text-slate-600">
                  See how a LAN groups nearby houses into one tidy, private local court!
                </p>
              </div>
              <button
                onClick={() => {
                  sounds.playPop();
                  setLanFenceUp(!lanFenceUp);
                }}
                className={`px-5 py-2.5 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all ${
                  lanFenceUp
                    ? 'bg-sky-600 text-white border-sky-700 shadow-md'
                    : 'bg-white text-sky-900 border-sky-400'
                }`}
              >
                {lanFenceUp ? '🟦 LAN Fence is UP (Click to Remove)' : '➕ Put Up Light-Blue LAN Fence'}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
              {/* INSIDE THE LAN FENCE (2 columns wide) */}
              <div
                className={`lg:col-span-2 rounded-3xl p-6 transition-all relative ${
                  lanFenceUp
                    ? 'bg-sky-100/70 border-4 border-dashed border-sky-500 shadow-md'
                    : 'bg-slate-50 border-2 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3.5 py-1 rounded-full bg-sky-600 text-white font-black text-xs shadow-sm">
                    {lanFenceUp
                      ? '🟦 INSIDE THE LAN FENCE • "One Local Neighborhood / Nyumba Kumi Court"'
                      : '⚠️ No LAN Boundary Drawn Yet'}
                  </span>
                  <span className="text-xs font-black text-sky-900">Fast & Free Local Road!</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-2xl p-4 border-2 border-sky-300 text-center space-y-2">
                    <div className="text-4xl">🏠💻</div>
                    <div className="font-black text-sm text-slate-900">Plot #1 (Your Laptop)</div>
                    <span className="inline-block px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-black">
                      Sender
                    </span>
                  </div>

                  <div
                    onClick={() => {
                      sounds.playSuccess();
                      setLanAnimTarget('local2');
                      setLanFeedback(
                        '✅ Super Fast! Plot #1 and Plot #2 share the same short local road inside the blue LAN fence—no highway router needed!'
                      );
                    }}
                    className={`bg-white rounded-2xl p-4 border-3 cursor-pointer transition-all text-center space-y-2 hover:scale-105 ${
                      lanAnimTarget === 'local2'
                        ? 'border-emerald-500 ring-4 ring-emerald-200'
                        : 'border-sky-300'
                    }`}
                  >
                    <div className="text-4xl">🏠🖥️</div>
                    <div className="font-black text-sm text-slate-900">Plot #2 (Living Room TV)</div>
                    <button className="px-3 py-1 rounded-xl bg-sky-600 text-white text-xs font-black">
                      Tap to Send Local Parcel
                    </button>
                  </div>

                  <div
                    onClick={() => {
                      sounds.playSuccess();
                      setLanAnimTarget('local3');
                      setLanFeedback(
                        '✅ Instant Local Delivery! Plot #3 is right inside our LAN compound, so the letter stays safely inside our blue fence!'
                      );
                    }}
                    className={`bg-white rounded-2xl p-4 border-3 cursor-pointer transition-all text-center space-y-2 hover:scale-105 ${
                      lanAnimTarget === 'local3'
                        ? 'border-emerald-500 ring-4 ring-emerald-200'
                        : 'border-sky-300'
                    }`}
                  >
                    <div className="text-4xl">🏠🖨️</div>
                    <div className="font-black text-sm text-slate-900">Plot #3 (Office Printer)</div>
                    <button className="px-3 py-1 rounded-xl bg-sky-600 text-white text-xs font-black">
                      Tap to Send Local Parcel
                    </button>
                  </div>
                </div>
              </div>

              {/* OUTSIDE THE LAN FENCE */}
              <div
                onClick={() => {
                  sounds.playPop();
                  setLanAnimTarget('distant');
                  setLanFeedback(
                    '💡 Notice that! Mombasa / Distant Town is OUTSIDE our blue LAN fence. A LAN only covers our local neighborhood—later we will add a Router highway gate to reach outside cities!'
                  );
                }}
                className={`rounded-3xl p-6 border-3 cursor-pointer transition-all flex flex-col justify-between text-center ${
                  lanAnimTarget === 'distant'
                    ? 'bg-amber-50 border-amber-500 ring-4 ring-amber-200'
                    : 'bg-slate-100/80 border-slate-300 hover:border-amber-400'
                }`}
              >
                <div className="space-y-2">
                  <span className="px-3 py-1 rounded-full bg-slate-200 text-slate-800 font-black text-xs">
                    🌍 OUTSIDE THE LAN FENCE
                  </span>
                  <div className="text-4xl pt-2">🏙️🌴</div>
                  <div className="font-black text-base text-slate-900">
                    Far-Away City (Mombasa / Another Town)
                  </div>
                  <p className="text-xs font-semibold text-slate-600">
                    Not part of our tiny neighborhood road!
                  </p>
                </div>
                <button className="mt-4 w-full py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs">
                  Tap to Test Far-Away Delivery
                </button>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm text-center">
              {lanFeedback}
            </div>
          </div>
        )}

        {/* =====================================================================
            PLAYGROUND 1.3: OSI (7 FLOORS) & TCP/IP (4 FLOORS) MODELS
           ===================================================================== */}
        {currentSubtopic.id === 'osi-tcpip-models' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
              <div className="text-xs sm:text-sm font-bold text-amber-950">
                🏢 <strong>Click any floor below</strong> to see how the <strong>7-Floor OSI Hall (Huduma Centre)</strong> maps directly to the <strong>4-Floor TCP/IP Hall (Wakala Kiosk)</strong>!
              </div>
              <button
                onClick={() => {
                  sounds.playPop();
                  setElevatorStep(0);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs shadow-sm flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run Parcel Elevator (Top → Road → Top)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* LEFT: 7-FLOOR OSI BUILDING */}
              <div className="lg:col-span-5 bg-slate-50 rounded-3xl p-4 sm:p-5 border-3 border-amber-300 space-y-2.5">
                <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                  <span className="font-black text-sm text-amber-950">
                    🏢 7-Floor OSI City Hall (Huduma 7 Counters)
                  </span>
                  <span className="text-[11px] font-black bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                    Floors 7 → 1
                  </span>
                </div>

                {osiToTcpData.map((group) =>
                  group.osiFloors.map((osi) => {
                    const isHighlighted = selectedTcpFloor === group.tcpFloor;
                    return (
                      <div
                        key={osi.num}
                        onClick={() => {
                          sounds.playPop();
                          setSelectedTcpFloor(group.tcpFloor);
                        }}
                        className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isHighlighted
                            ? 'bg-amber-500 text-white border-amber-600 shadow-sm scale-[1.01]'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-amber-300'
                        }`}
                      >
                        <div>
                          <div className="font-black text-xs sm:text-sm">Floor {osi.name}</div>
                          <div
                            className={`text-[11px] font-semibold ${
                              isHighlighted ? 'text-amber-50' : 'text-slate-500'
                            }`}
                          >
                            {osi.role}
                          </div>
                        </div>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${
                            isHighlighted ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          Maps to TCP/IP #{group.tcpFloor}
                        </span>
                      </div>
                    );
                  })
                )}
              </div>

              {/* MIDDLE: ELEVATOR / COMPARISON DETAILS */}
              <div className="lg:col-span-3 bg-amber-50/70 rounded-3xl p-5 border-3 border-amber-300 flex flex-col justify-between space-y-4 text-center">
                <div className="space-y-2">
                  <div className="text-3xl">🛗📦</div>
                  <div className="font-black text-sm text-amber-950">
                    {elevatorStep === null
                      ? `Currently Inspecting TCP/IP Floor #${selectedTcpFloor}`
                      : elevatorStep < 4
                      ? `⬇️ Wrapping Down: Floor ${selectedTcpFloor}`
                      : elevatorStep === 4
                      ? '🛣️ Riding the Road!'
                      : `⬆️ Unwrapping Up: Floor ${selectedTcpFloor}`}
                  </div>
                </div>

                {(() => {
                  const activeGroup =
                    osiToTcpData.find((g) => g.tcpFloor === selectedTcpFloor) || osiToTcpData[0];
                  return (
                    <div className="bg-white rounded-2xl p-4 border-2 border-amber-200 text-left space-y-2.5">
                      <div className="text-xs font-black text-amber-800 uppercase">
                        {activeGroup.tcpName}
                      </div>
                      <p className="text-xs font-bold text-slate-700 leading-relaxed">
                        {activeGroup.kidMeaning}
                      </p>
                      <div className="p-2.5 rounded-xl bg-sky-50 border border-sky-200 text-xs font-bold text-sky-900">
                        🏙️ {activeGroup.smartCitySign}
                      </div>
                      <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                        🇰🇪 {activeGroup.kenyanSign}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* RIGHT: 4-FLOOR TCP/IP MINI-HALL */}
              <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-4 sm:p-5 border-3 border-sky-300 space-y-3">
                <div className="flex items-center justify-between border-b border-sky-200 pb-2">
                  <span className="font-black text-sm text-sky-950">
                    🏛️ 4-Floor TCP/IP Mini-Hall (Wakala 4 Desks)
                  </span>
                  <span className="text-[11px] font-black bg-sky-200 text-sky-900 px-2 py-0.5 rounded-full">
                    Floors 4 → 1
                  </span>
                </div>

                {osiToTcpData.map((group) => {
                  const isHighlighted = selectedTcpFloor === group.tcpFloor;
                  return (
                    <div
                      key={group.tcpFloor}
                      onClick={() => {
                        sounds.playPop();
                        setSelectedTcpFloor(group.tcpFloor);
                      }}
                      className={`p-4 rounded-2xl border-3 cursor-pointer transition-all space-y-1.5 ${
                        isHighlighted
                          ? 'bg-sky-600 text-white border-sky-700 shadow-md scale-[1.02]'
                          : 'bg-white text-slate-800 border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-black text-sm">{group.tcpName}</span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isHighlighted ? 'bg-white/25 text-white' : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          Combines {group.osiFloors.length} OSI Floor{group.osiFloors.length > 1 ? 's' : ''}
                        </span>
                      </div>
                      <div
                        className={`text-xs font-bold ${
                          isHighlighted ? 'text-sky-100' : 'text-slate-600'
                        }`}
                      >
                        {group.smartCitySign}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PLAYGROUND 1.4: TCP/IP SUITE OF PROTOCOLS (VAN VS. BODA RACE!)
           ===================================================================== */}
        {currentSubtopic.id === 'tcpip-suite-of-protocols' && (
          <div className="space-y-6">
            {/* Floor Protocol Selector */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { floor: 4, title: 'Floor 4: HTTP & FTP', icon: '✉️📦', sub: 'Web Letters & File Boxes' },
                { floor: 3, title: 'Floor 3: TCP vs. UDP', icon: '🚚🛵', sub: 'Careful Van vs. Fast Boda' },
                { floor: 2, title: 'Floor 2: IP Map', icon: '🗺️📍', sub: 'Street & Plot Address' },
                { floor: 1, title: 'Floor 1: Ethernet Road', icon: '🛣️🛞', sub: 'Cables & Number Plates' }
              ].map((item) => (
                <button
                  key={item.floor}
                  onClick={() => {
                    sounds.playPop();
                    setActiveProtocolFloor(item.floor);
                  }}
                  className={`p-3.5 rounded-2xl border-3 text-left transition-all ${
                    activeProtocolFloor === item.floor
                      ? 'bg-purple-600 text-white border-purple-700 shadow-md scale-[1.02]'
                      : 'bg-purple-50/60 text-slate-800 border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <div className="font-black text-xs sm:text-sm mt-1">{item.title}</div>
                  <div
                    className={`text-[11px] font-semibold ${
                      activeProtocolFloor === item.floor ? 'text-purple-100' : 'text-slate-500'
                    }`}
                  >
                    {item.sub}
                  </div>
                </button>
              ))}
            </div>

            {/* Interactive Floor 3 Race: TCP Red Van (G4S/Fargo) vs UDP Blue Bike (Boda-Boda) */}
            <div className="bg-gradient-to-r from-purple-50 via-amber-50 to-sky-50 rounded-3xl p-6 border-3 border-purple-300 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-900 font-black text-xs">
                    ⭐ Favourite Interactive Demo • Floor 3 Transport Helpers
                  </span>
                  <h4 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    Compare the TCP Tracked Van vs. the UDP Fast Boda-Boda!
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={runTcpAnimation}
                    className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-sm active:scale-95 transition-all"
                  >
                    🚚 Test Red TCP Van (3-Step Greeting + Tracked)
                  </button>
                  <button
                    onClick={runUdpAnimation}
                    className="px-4 py-2.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white font-black text-xs shadow-sm active:scale-95 transition-all"
                  >
                    🛵 Test Blue UDP Bike / Boda (Zoom & Drop!)
                  </button>
                </div>
              </div>

              {/* Track 1: TCP Red Van / Wells Fargo Van */}
              <div className="bg-white rounded-2xl p-4 border-2 border-rose-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-black text-sm text-rose-900 flex items-center gap-2">
                    <span className="text-2xl">🚚📋</span>
                    <span>
                      TCP = Red Express Van / Wells Fargo Courier (Careful, 3-Way Handshake, Keeps a List)
                    </span>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-rose-100 text-rose-800">
                    Used for Websites, Emails & Banking
                  </span>
                </div>

                {/* 3-Way Handshake Bubbles */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 text-xs font-black">
                  <div
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      tcpStep >= 1
                        ? 'bg-rose-500 text-white border-rose-600 scale-105'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    1️⃣ Handshake 1: "Hi! / Sasa!" (SYN)
                  </div>
                  <div
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      tcpStep >= 2
                        ? 'bg-rose-500 text-white border-rose-600 scale-105'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    2️⃣ Handshake 2: "Hi back! / Poa!" (SYN-ACK)
                  </div>
                  <div
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      tcpStep >= 3
                        ? 'bg-rose-500 text-white border-rose-600 scale-105'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    3️⃣ Handshake 3: "Let's go! / Twende!" (ACK)
                  </div>
                  <div
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      tcpStep === 5
                        ? 'bg-emerald-600 text-white border-emerald-700 scale-105'
                        : tcpStep === 4
                        ? 'bg-amber-400 text-amber-950 border-amber-500'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    {tcpStep === 5
                      ? '✅ Delivered & Signed on Clipboard!'
                      : tcpStep === 4
                      ? '🚚 Driving Carefully with GPS...'
                      : '4️⃣ Careful Tracked Delivery'}
                  </div>
                </div>
              </div>

              {/* Track 2: UDP Blue Quick Van / Fast Boda-Boda */}
              <div className="bg-white rounded-2xl p-4 border-2 border-sky-300 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="font-black text-sm text-sky-900 flex items-center gap-2">
                    <span className="text-2xl">🚐🛵💨</span>
                    <span>
                      UDP = Blue Quick Van / Fast Boda-Boda (No Handshake, No Clipboard, Instant Drop-Off!)
                    </span>
                  </div>
                  <span className="text-xs font-black px-2.5 py-1 rounded-full bg-sky-100 text-sky-800">
                    Used for Live Video, Voice Calls & Gaming
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-black">
                  <div
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      udpStep >= 1
                        ? 'bg-sky-500 text-white border-sky-600 scale-[1.02]'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    ⚡ Zero Waiting! Boda-Boda zooms straight onto the road with no "Hi" handshake!
                  </div>
                  <div
                    className={`p-2.5 rounded-xl border-2 text-center transition-all ${
                      udpStep === 2
                        ? 'bg-emerald-600 text-white border-emerald-700 scale-[1.02]'
                        : 'bg-slate-50 text-slate-400 border-slate-200'
                    }`}
                  >
                    {udpStep === 2
                      ? '🎁 Tossed over the gate in 0.5 seconds & zoomed away!'
                      : '🎯 Drops gift fast & drives away'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            PLAYGROUND 1.5: ENCAPSULATION (PARCEL-INSIDE-PARCEL STACK)
           ===================================================================== */}
        {currentSubtopic.id === 'encapsulation' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
              <div className="space-y-0.5">
                <div className="font-black text-sm sm:text-base text-rose-950">
                  {wrapDirection === 'down'
                    ? '⬇️ Wrapping on the Way Down (Encapsulation at Sender House)'
                    : '⬆️ Unwrapping on the Way Up (De-encapsulation at Receiver House)'}
                </div>
                <p className="text-xs font-bold text-slate-600">
                  Click the big button to add (or open) one protective box layer at a time!
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleNextWrapStep}
                  className="px-5 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all"
                >
                  {wrapDirection === 'down' && wrapLevel === 0 && '📦 Step 1: Put in Layer 4 Box (Add Port Tag)'}
                  {wrapDirection === 'down' && wrapLevel === 1 && '🗺️ Step 2: Put in Layer 3 Box (Add IP Sticker)'}
                  {wrapDirection === 'down' && wrapLevel === 2 && '🎀 Step 3: Put in Layer 2/1 Box (Add MAC Ribbon)'}
                  {wrapDirection === 'down' && wrapLevel === 3 && '🚚 Step 4: Drive to Neighbor & Start Unwrapping!'}
                  {wrapDirection === 'up' && wrapLevel === 3 && '✂️ Untie Layer 2/1 Ribbon Box (Check MAC)'}
                  {wrapDirection === 'up' && wrapLevel === 2 && '📬 Open Layer 3 Carton (Check IP Address)'}
                  {wrapDirection === 'up' && wrapLevel === 1 && '🚪 Open Layer 4 Small Box (Check Port Door)'}
                  {wrapDirection === 'up' && wrapLevel === 0 && '🎉 Toy Delivered Safely! Click to Celebrate!'}
                </button>
                <button
                  onClick={resetWrap}
                  className="p-2.5 rounded-xl bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-100"
                  title="Start Over"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Nested Gift Box Visual Stack */}
            <div className="flex flex-col items-center justify-center py-4">
              {/* OUTER BOX: LAYER 2 & 1 (ETHERNET FRAME / MATATU GUNIA SACK) */}
              <div
                className={`w-full max-w-2xl rounded-3xl p-5 transition-all duration-300 ${
                  wrapLevel >= 3
                    ? 'bg-amber-100 border-4 border-amber-500 shadow-lg scale-100'
                    : 'bg-slate-50/50 border-2 border-dashed border-slate-300 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-black text-amber-950 mb-3">
                  <span>
                    🎀 Layer 2 & 1 Wrapper: Largest Gift Box with Ribbon / Woven Matatu Sack (Ethernet Frame)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-300 text-amber-950">
                    {wrapLevel >= 3 ? 'WRAPPED ✅' : 'Waiting...'}
                  </span>
                </div>

                {/* MIDDLE BOX: LAYER 3 (IP PACKET / ADDRESS CARTON) */}
                <div
                  className={`rounded-2xl p-5 transition-all duration-300 ${
                    wrapLevel >= 2
                      ? 'bg-sky-100 border-4 border-sky-500 shadow-md'
                      : 'bg-white/60 border-2 border-dashed border-slate-300 opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-black text-sky-950 mb-3">
                    <span>
                      📦 Layer 3 Wrapper: Bigger Box with "From/To IP" / Nairobi→Eldoret Carton (IP Packet)
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-300 text-sky-950">
                      {wrapLevel >= 2 ? 'WRAPPED ✅' : 'Waiting...'}
                    </span>
                  </div>

                  {/* INNER BOX: LAYER 4 (TCP/UDP SEGMENT) */}
                  <div
                    className={`rounded-2xl p-5 transition-all duration-300 ${
                      wrapLevel >= 1
                        ? 'bg-purple-100 border-4 border-purple-500 shadow-sm'
                        : 'bg-white/70 border-2 border-dashed border-slate-300 opacity-80'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-black text-purple-950 mb-3">
                      <span>
                        🎁 Layer 4 Wrapper: Small Square Box with Port Door #443 (TCP/UDP Segment)
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-300 text-purple-950">
                        {wrapLevel >= 1 ? 'WRAPPED ✅' : 'Waiting...'}
                      </span>
                    </div>

                    {/* CORE TOY: RAW DATA */}
                    <div className="bg-white rounded-2xl p-5 border-3 border-rose-400 text-center space-y-1 shadow-sm">
                      <div className="text-4xl">🧸📱</div>
                      <div className="font-black text-base text-slate-900">
                        Core Gift: Little Teddy Bear / Upcountry Phone (Your Raw Data!)
                      </div>
                      <p className="text-xs font-bold text-slate-600">
                        {wrapDirection === 'down'
                          ? `Current State: Wrapped in ${wrapLevel} protective box layer(s)!`
                          : wrapLevel === 0
                          ? '🎉 Unwrapped at the destination house! The toy arrived without a scratch!'
                          : `Unwrapping... ${wrapLevel} box layer(s) left to open!`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* SECTION C: ZERO-STRESS 3-QUESTION PLAYABLE CHECK */}
      <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-md space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-950 font-black text-xs">
              🌟 Zero-Stress Memory Lock-In
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
              Quick 3-Question Town Helper Game!
            </h3>
          </div>
          <span className="text-3xl">🏆</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {miniCheckQuestions.map((q, idx) => {
            const picked = gameAnswers[q.id];
            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl p-5 border-2 border-emerald-200 shadow-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <span className="text-xs font-black text-emerald-700 uppercase">
                    Mini-Scenario #{idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed">
                    {q.prompt}
                  </p>
                </div>

                <div className="space-y-2">
                  {q.options.map((opt) => {
                    const isThisPicked = picked === opt.id;
                    let btnStyle = 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-700';
                    if (isThisPicked && opt.correct) {
                      btnStyle = 'bg-emerald-600 border-emerald-700 text-white shadow-sm';
                    } else if (isThisPicked && !opt.correct) {
                      btnStyle = 'bg-amber-100 border-amber-400 text-amber-950';
                    }
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setGameAnswers((prev) => ({ ...prev, [q.id]: opt.id }));
                          if (opt.correct) {
                            sounds.playSuccess();
                            confetti({ particleCount: 35, spread: 50, origin: { y: 0.8 } });
                          } else {
                            sounds.playPop();
                          }
                        }}
                        className={`w-full p-3 rounded-xl border-2 text-left text-xs font-black transition-all ${btnStyle}`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}

                  {picked && (
                    <div className="text-[11px] font-extrabold pt-1 text-emerald-800">
                      {q.options.find((o) => o.id === picked)?.correct
                        ? '🎉 Spot on! You got it!'
                        : '💡 Gentle hint: Try the other friendly option!'}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
