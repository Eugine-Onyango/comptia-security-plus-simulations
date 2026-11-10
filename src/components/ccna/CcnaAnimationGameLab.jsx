import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Play,
  RotateCcw,
  ArrowLeft,
  Gamepad2,
  MapPin,
  Package,
  Truck,
  CheckCircle2,
  Layers,
  FlaskConical,
  Volume2,
  Compass,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export default function CcnaAnimationGameLab({ onBackToHub }) {
  // 3 distinct interactive animation + mini-game engines to test:
  // 'living_map' | 'conveyor_elevator' | 'dispatcher_game'
  const [activePrototype, setActivePrototype] = useState('living_map');
  const [analogyMode, setAnalogyMode] = useState('kenyan'); // 'kenyan' | 'smartcity'

  // ============================================================================
  // PROTOTYPE 1 STATE: THE LIVING 2D VILLAGE / SMART-CITY MAP (TOP-DOWN WORLD)
  // ============================================================================
  const [pavedRoads, setPavedRoads] = useState({ ab: true, bc: true, gate: false });
  const [lanFenceActive, setLanFenceActive] = useState(true);
  const [vehicleType, setVehicleType] = useState('tcp'); // 'tcp' (Van) | 'udp' (Boda)
  // Journey states: 'idle' | 'handshake_1' | 'handshake_2' | 'handshake_3' | 'driving' | 'arrived'
  const [journeyState, setJourneyState] = useState('idle');
  const [targetNode, setTargetNode] = useState('B'); // 'B' | 'C' | 'MOMBASA'
  const [houseCounts, setHouseCounts] = useState({ B: 1, C: 0, MOMBASA: 0 });
  const [mapBanner, setMapBanner] = useState(
    'Tap any Dirt Path on the map to pave it into a road, choose TCP Van or UDP Boda-Boda, and click a house to watch the live delivery!'
  );

  const launchMapJourney = (dest) => {
    if (journeyState !== 'idle' && journeyState !== 'arrived') return;

    // Check if road is paved
    if (dest === 'B' && !pavedRoads.ab) {
      sounds.playBuzzer();
      setMapBanner('🚧 Path A ↔ B is still grass! Tap the "Pave Road A ↔ B" button on the map first!');
      return;
    }
    if (dest === 'C' && (!pavedRoads.ab || !pavedRoads.bc)) {
      sounds.playBuzzer();
      setMapBanner('🚧 To reach House C, make sure both Road A ↔ B and Road B ↔ C are paved!');
      return;
    }
    if (dest === 'MOMBASA' && !pavedRoads.gate) {
      sounds.playBuzzer();
      setMapBanner(
        '🟦 Notice how House A, B & C are inside your Local Area Network (LAN)! To reach outside towns, tap "Open Highway Gate Road" on the right!'
      );
      return;
    }

    setTargetNode(dest);

    if (vehicleType === 'tcp') {
      // TCP does 3-way handshake before driving!
      sounds.playPop();
      setJourneyState('handshake_1');
      setMapBanner(
        analogyMode === 'kenyan'
          ? '1️⃣ TCP Handshake Step 1 (SYN): Fargo Van calls ahead — "Sasa! Uko nyumbani?"'
          : '1️⃣ TCP Handshake Step 1 (SYN): Red Van waves — "Hi! Are you ready to receive?"'
      );

      setTimeout(() => {
        sounds.playPop();
        setJourneyState('handshake_2');
        setMapBanner(
          analogyMode === 'kenyan'
            ? '2️⃣ TCP Handshake Step 2 (SYN-ACK): Neighbor replies — "Poa! Niko tayari, leta tu!"'
            : '2️⃣ TCP Handshake Step 2 (SYN-ACK): House waves back — "Hi back! Yes, my door is open!"'
        );
      }, 950);

      setTimeout(() => {
        sounds.playPop();
        setJourneyState('handshake_3');
        setMapBanner(
          analogyMode === 'kenyan'
            ? '3️⃣ TCP Handshake Step 3 (ACK): Van confirms — "Twende sasa!" and starts driving!'
            : '3️⃣ TCP Handshake Step 3 (ACK): Van agrees — "Let’s go!" and starts driving!'
        );
      }, 1900);

      setTimeout(() => {
        sounds.playPop();
        setJourneyState('driving');
        setMapBanner('🚚 Driving carefully along the network road with GPS tracking & clipboard...');
      }, 2700);

      setTimeout(() => {
        sounds.playSuccess();
        setJourneyState('arrived');
        setHouseCounts((prev) => ({ ...prev, [dest]: prev[dest] + 1 }));
        setMapBanner(
          `✅ Delivered to ${
            dest === 'MOMBASA' ? 'Distant Town (Outside LAN)' : `Home ${dest} (Inside LAN)`
          }! Recipient signed the TCP clipboard!`
        );
      }, 4300);
    } else {
      // UDP zooms immediately with zero handshake!
      sounds.playPop();
      setJourneyState('driving');
      setMapBanner(
        analogyMode === 'kenyan'
          ? '🛵💨 UDP Boda-Boda doesn’t call or wait! Zooming at top speed along the road!'
          : '🚐💨 Blue UDP Quick-Van skips the handshake and zooms straight down the street!'
      );

      setTimeout(() => {
        sounds.playSuccess();
        setJourneyState('arrived');
        setHouseCounts((prev) => ({ ...prev, [dest]: prev[dest] + 1 }));
        setMapBanner(
          `🎯 Instant UDP Drop-Off at ${
            dest === 'MOMBASA' ? 'Distant Town' : `Home ${dest}`
          }! Tossed over the gate in 1 second with no signature book!`
        );
      }, 1100);
    }
  };

  // Coordinates for the vehicle on the 800x380 SVG Map
  const getVehicleCoords = () => {
    if (journeyState !== 'driving' && journeyState !== 'arrived') {
      return { x: 130, y: 210 }; // Parked at Home A
    }
    if (targetNode === 'B') return { x: 350, y: 125 };
    if (targetNode === 'C') return { x: 520, y: 245 };
    return { x: 705, y: 175 }; // MOMBASA / Outside Gate
  };

  // ============================================================================
  // PROTOTYPE 2 STATE: THE TACTILE ELEVATOR & PARCEL PACKING FACTORY
  // (OSI 7-Floors / TCP-IP 4-Floors + Encapsulation Box-Inside-Box Assembly)
  // ============================================================================
  // Stages:
  // 0: Floor 4 (Write Message / Pick Gift)
  // 1: Floor 3 (Wrap in Purple Segment Box + Pick Port/Courier)
  // 2: Floor 2 (Wrap in Blue IP Carton Box + Stamp From/To Address)
  // 3: Floor 1 (Wrap in Amber Ethernet Sack/Ribbon + Put on Road)
  // 4: Driving across the road between Sender Building & Receiver Building
  // 5: Receiver Floor 1 -> 2 -> 3 -> 4 Unwrapping (De-encapsulation)!
  const [factoryStage, setFactoryStage] = useState(0);
  const [chosenPayload, setChosenPayload] = useState('🧸 Teddy Bear / 📱 New Phone');
  const [chosenProtocol, setChosenProtocol] = useState('HTTP (Port 80)');

  const factoryStepsInfo = [
    {
      stage: 0,
      floor: 4,
      tcpTitle: 'Floor 4: Application Layer',
      osiMatch: 'OSI Floors 7, 6 & 5 (Application, Presentation, Session)',
      actionButton: '⬇️ Pull Lever: Send to Floor 3 & Wrap in Transport Box!',
      kenyanStory:
        'Counter 4 (Top Floor): Mama Wanjiku brings the raw gift (or writes a WhatsApp/HTTP note). You cannot throw a bare phone onto a matatu roof—let’s send it down the lift to wrap it!',
      smartCityStory:
        'Floor 4 (Top Floor): You have a raw gift (Data) and an HTTP envelope. Click the lever to ride the elevator down to Floor 3 so we can put it in its first protective box!'
    },
    {
      stage: 1,
      floor: 3,
      tcpTitle: 'Floor 3: Transport Layer (TCP / UDP)',
      osiMatch: 'OSI Floor 4 (Transport)',
      actionButton: '⬇️ Stamp Port # & Drop into Floor 2 IP Carton!',
      kenyanStory:
        'Counter 3: Clack! The machine wraps the gift inside a Purple Padded Pouch (Segment) and stamps "Room Door / Port 80" + assigns a tracked Wells Fargo Van (TCP)!',
      smartCityStory:
        'Floor 3: The helper places your toy inside a Small Square Box (Layer 4 Segment) and writes the Port Door number (#80) so the receiver house knows which room gets it!'
    },
    {
      stage: 2,
      floor: 2,
      tcpTitle: 'Floor 2: Internet Layer (IP Map)',
      osiMatch: 'OSI Floor 3 (Network)',
      actionButton: '⬇️ Seal IP Carton & Send to Ground Floor 1!',
      kenyanStory:
        'Counter 2: Whoosh! That purple pouch is placed inside a bigger Blue Address Carton (IP Packet) stamped "From: Nairobi Plot 10 (192.168.1.5) → To: Eldoret Plot 5 (192.168.1.20)"!',
      smartCityStory:
        'Floor 2: The helper puts the small box inside a Bigger Blue Box (Layer 3 IP Packet) and sticks the "From IP / To IP" street address label on the outside!'
    },
    {
      stage: 3,
      floor: 1,
      tcpTitle: 'Floor 1: Network Access / Link & Physical',
      osiMatch: 'OSI Floors 2 & 1 (Data-Link & Physical)',
      actionButton: '🚀 LAUNCH ONTO THE ROAD TO NEIGHBOR BUILDING!',
      kenyanStory:
        'Ground Floor 1: Finally, the loader ties the carton inside a strong Amber Woven Gunia Sack (Ethernet Frame) with Matatu Plate KDA-123A (MAC Address) and loads it onto the tarmac road!',
      smartCityStory:
        'Floor 1: All boxes go inside the Largest Box tied with a Red Ribbon & Licence Plate (Layer 2 Ethernet Frame), ready to roll onto the Physical asphalt road!'
    },
    {
      stage: 4,
      floor: 1,
      tcpTitle: '🛣️ On the Road! (Physical Layer Bits)',
      osiMatch: 'OSI Floor 1 (Cables / Tarmac)',
      actionButton: '⬆️ Arrive & Ride Receiver Elevator Up (Unwrap All Boxes!)',
      kenyanStory:
        'Vrooom! The fully wrapped parcel (Gunia → Carton → Pouch → Gift) zooms safely down the tarmac road to Baba Otieno’s building!',
      smartCityStory:
        'Zoom! The nested gift-box stack rolls smoothly across the Ethernet cable road to the destination building!'
    },
    {
      stage: 5,
      floor: 4,
      tcpTitle: '🎉 Arrived at Top Floor! (De-encapsulated!)',
      osiMatch: 'All Wrappers Removed Bottom-to-Top (Floors 1 → 4)',
      actionButton: '🔄 Pack Another Parcel from Scratch!',
      kenyanStory:
        'Hooray! On the way UP the receiver’s lift: Floor 1 untied the Gunia sack (MAC), Floor 2 opened the Town Carton (IP), Floor 3 opened the Padded Pouch (Port), and Floor 4 received the sparkling gift!',
      smartCityStory:
        'Success! Each floor on the receiving side unwrapped its matching box from bottom to top (De-encapsulation), handing the safe toy to your friend on Floor 4!'
    }
  ];

  const handleAdvanceFactory = () => {
    if (factoryStage < 5) {
      const next = factoryStage + 1;
      if (next === 4 || next === 5) {
        sounds.playSuccess();
        if (next === 5) {
          confetti({ particleCount: 70, spread: 65, origin: { y: 0.65 } });
        }
      } else {
        sounds.playPop();
      }
      setFactoryStage(next);
    } else {
      sounds.playPop();
      setFactoryStage(0);
    }
  };

  // ============================================================================
  // PROTOTYPE 3 STATE: INTERACTIVE MISSION DISPATCHER MINI-GAME
  // ============================================================================
  const [missionIdx, setMissionIdx] = useState(0);
  const [missionState, setMissionState] = useState('playing'); // 'playing' | 'won_round' | 'wrong_try'
  const [missionFeedback, setMissionFeedback] = useState('');
  const [score, setScore] = useState(0);

  const missions = [
    {
      num: 1,
      subtopicTag: '1.1 What is a Network? & 1.2 LAN',
      character: '👩🏾‍🍳 Mama Wanjiku (Plot #1)',
      avatar: '👩🏾‍🍳',
      request:
        '“Jambo! I just baked fresh mandazi and typed the recipe on my laptop. I want to send it to Baba Otieno right next door in Plot #2 inside our gated compound!”',
      question: 'Which path and setup should we use for this delivery?',
      choices: [
        {
          id: 'lan',
          icon: '🟦🏡',
          title: 'Use the Short Local Path Inside Our Blue LAN Fence',
          subtitle: 'Connect Plot #1 & Plot #2 with a local cable/path inside our compound',
          correct: true,
          feedback:
            'Spot on! Because Plot #1 and Plot #2 are neighbors in the same small compound, they form a Local Area Network (LAN). The recipe travels super fast inside our blue fence!'
        },
        {
          id: 'island',
          icon: '🏝️🚫',
          title: 'Keep Plot #1 Disconnected with No Road',
          subtitle: 'Computers can magically share files with zero wires or airwaves',
          correct: false,
          feedback:
            'Oops! Without a road (cable or wireless wave) connecting the houses, each house is a lonely island and cannot send anything!'
        }
      ]
    },
    {
      num: 2,
      subtopicTag: '1.4 TCP vs. UDP (Transport Layer)',
      character: '🏦 Uncle Kamau (The Accountant)',
      avatar: '👨🏾‍💼',
      request:
        '“I am sending a critical KSh 50,000 M-Pesa/Bank payroll file to the office. Not a single number can go missing, and I need confirmation that they are ready before I send it!”',
      question: 'Which Floor 3 vehicle should you dispatch from the garage?',
      choices: [
        {
          id: 'tcp',
          icon: '🚚📋',
          title: 'Red TCP Express Van (Wells Fargo / G4S Tracked Van)',
          subtitle: 'Does the 3-step greeting ("Hi → Hi back → Let’s go") and tracks every box on a clipboard',
          correct: true,
          feedback:
            'Bulls-eye! TCP greets first (3-Way Handshake) and checks off every single parcel on its clipboard so zero bank digits are ever lost!'
        },
        {
          id: 'udp',
          icon: '🛵💨',
          title: 'Blue UDP Quick Boda-Boda',
          subtitle: 'No greeting, no clipboard—just tosses the boxes over the gate at high speed',
          correct: false,
          feedback:
            'Careful! The UDP Boda-Boda is awesome for live football audio, but if a box falls off on a bump, UDP never goes back to check! Pick the tracked TCP Van for bank files.'
        }
      ]
    },
    {
      num: 3,
      subtopicTag: '1.4 UDP (Fast Transport)',
      character: '🎙️ DJ Brayo (Live Football Radio)',
      avatar: '🎧',
      request:
        '“GOOOAL! Harambee Stars just scored! I am streaming live voice commentary every millisecond—I cannot pause to ask for signatures or wait for old delayed words!”',
      question: 'Which Floor 3 helper keeps the live stream zooming with zero delay?',
      choices: [
        {
          id: 'udp',
          icon: '🛵⚡',
          title: 'Blue UDP Quick Bike / Boda-Boda',
          subtitle: 'Zooms non-stop and drops each sound parcel immediately with no handshake delay',
          correct: true,
          feedback:
            'Awesome job! Live voice and video love UDP because speed matters most—nobody wants a 3-step polite handshake delaying a live "GOOOAL!" shout!'
        },
        {
          id: 'tcp',
          icon: '🚚🛑',
          title: 'Slow Down & Sign a Clipboard for Every Syllable (TCP)',
          subtitle: 'Stop the live broadcast anytime one tiny audio pop happens',
          correct: false,
          feedback:
            'If we stopped the live stream to sign a receipt for every millisecond of audio, the match would freeze! Try the fast UDP Boda-Boda instead.'
        }
      ]
    },
    {
      num: 4,
      subtopicTag: '1.3 Models & 1.5 Encapsulation',
      character: '📦 Clerk Amina (EasyCoach / City Post Office)',
      avatar: '👩🏾‍✈️',
      request:
        '“A customer handed me a bare teddy bear on Floor 4. In what order do our floors wrap it before the tyres hit the tarmac road on Floor 1?”',
      question: 'Pick the true Encapsulation wrapping order (Top Floor → Ground Road):',
      choices: [
        {
          id: 'right_order',
          icon: '🧸➡️📦➡️🎀',
          title: 'Toy (Data) → Small Port Box (L4) → IP Address Carton (L3) → MAC Ribbon Sack (L2/L1)',
          subtitle: 'Each floor wraps the previous box inside a slightly larger labeled box on the way down',
          correct: true,
          feedback:
            'Champion! That is Encapsulation in action: Toy → Layer 4 Segment box → Layer 3 IP Packet box → Layer 2 Ethernet Frame ribbon sack → Layer 1 Road!'
        },
        {
          id: 'wrong_order',
          icon: '🌪️📦',
          title: 'Throw the bare toy straight onto the asphalt road with no address or box',
          subtitle: 'Skip all floors so nobody knows where it came from or where it is going',
          correct: false,
          feedback:
            'Haha! A bare teddy bear on the highway with no IP street sticker or MAC plate would get lost immediately! Wrap it floor-by-floor on the way down.'
        }
      ]
    }
  ];

  const currentMission = missions[missionIdx];

  // ============================================================================
  // PROTOTYPE 4 STATE: STEP-BY-STEP INTERACTIVE BOARD GAME & FLOOR PUZZLE
  // ============================================================================
  const [questStop, setQuestStop] = useState(1); // 1..5
  const [handshakeTaps, setHandshakeTaps] = useState(0); // 0..3 for Stop 2
  const [floorPuzzleSlots, setFloorPuzzleSlots] = useState({ 4: null, 3: null, 2: null, 1: null });
  const [selectedSignChip, setSelectedSignChip] = useState('HTTP & FTP');

  const signChips = [
    { label: 'HTTP & FTP', correctFloor: 4, icon: '✉️📦', hint: 'Top Floor 4 (Application)' },
    { label: 'TCP Van & UDP Boda', correctFloor: 3, icon: '🚚🛵', hint: 'Floor 3 (Transport)' },
    { label: 'IP Address Map', correctFloor: 2, icon: '🗺️📍', hint: 'Floor 2 (Internet)' },
    { label: 'Ethernet Road', correctFloor: 1, icon: '🛣️🛞', hint: 'Ground Floor 1 (Network Access)' }
  ];

  const handlePlaceSignOnFloor = (floorNum) => {
    const chipObj = signChips.find((c) => c.label === selectedSignChip);
    if (!chipObj) return;
    if (chipObj.correctFloor === floorNum) {
      sounds.playSuccess();
      const updated = { ...floorPuzzleSlots, [floorNum]: chipObj };
      setFloorPuzzleSlots(updated);
      // Auto-select next unplaced chip
      const remaining = signChips.find(
        (c) => c.correctFloor !== floorNum && !updated[c.correctFloor]
      );
      if (remaining) setSelectedSignChip(remaining.label);
      if (Object.values(updated).filter(Boolean).length === 4) {
        confetti({ particleCount: 65, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      sounds.playBuzzer();
    }
  };

  const handlePickMissionChoice = (choice) => {
    if (choice.correct) {
      sounds.playSuccess();
      setMissionState('won_round');
      setMissionFeedback(choice.feedback);
      setScore((s) => s + 1);
      confetti({ particleCount: 55, spread: 60, origin: { y: 0.7 } });
    } else {
      sounds.playBuzzer();
      setMissionState('wrong_try');
      setMissionFeedback(choice.feedback);
    }
  };

  const vehCoords = getVehicleCoords();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Testing Lab Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-teal-600 to-emerald-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-4 border-amber-300 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-300 text-slate-900 text-xs font-black">
              <FlaskConical className="w-4 h-4" />
              <span>INTERACTIVE ANIMATION & MINI-GAME SANDBOX (TESTING PAGE)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Test 4 New Living Animation & Game Styles! 🎮✨
            </h1>
            <p className="text-emerald-50 text-xs sm:text-sm font-semibold leading-relaxed">
              Your original page is completely safe and untouched! Here in the <strong>Testing Page</strong>, try out <strong>4 hands-on animation & mini-game prototypes</strong> for <em>Topic 1 (Intro to Networking)</em> to see which style feels best to your eyes, hands, and mind!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            {onBackToHub && (
              <button
                onClick={() => {
                  sounds.playPop();
                  onBackToHub();
                }}
                className="px-4 py-2.5 rounded-2xl bg-white text-slate-900 hover:bg-amber-100 font-black text-xs sm:text-sm shadow-md flex items-center gap-2 border-2 border-amber-300"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Original Topic 1 Page</span>
              </button>
            )}

            {/* Toggle Analogy World */}
            <div className="flex items-center bg-black/25 p-1 rounded-2xl border border-white/20">
              <button
                onClick={() => {
                  sounds.playPop();
                  setAnalogyMode('kenyan');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  analogyMode === 'kenyan'
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                🇰🇪 Kenyan Mtaa Mode
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setAnalogyMode('smartcity');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                  analogyMode === 'smartcity'
                    ? 'bg-sky-400 text-slate-950 shadow-sm'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                🏙️ Smart-City Mode
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4 PROTOTYPE SELECTOR TABS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          {
            id: 'living_map',
            badge: 'Style #1 • 2D World Map',
            title: '🗺️ Living Village & Road Map',
            desc: 'Pave roads on an illustrated 2D map, toggle the LAN fence, and watch TCP Vans & UDP Boda-Bodas physically drive door-to-door!'
          },
          {
            id: 'conveyor_elevator',
            badge: 'Style #2 • Factory Machine',
            title: '🛗 Glass Elevator & Box Wrapper',
            desc: 'Operate the 4-floor elevator! Watch protective boxes fold around your gift (Encapsulation) and travel across the road!'
          },
          {
            id: 'board_quest',
            badge: 'Style #3 • Hands-On Board Game',
            title: '🎲 5-Stop Parcel Quest & Floor Puzzle',
            desc: 'Tap 3 times to high-five the TCP handshake, snap protocol signs onto the 4 building floors, and walk a parcel home!'
          },
          {
            id: 'dispatcher_game',
            badge: 'Style #4 • Story Roleplay',
            title: '🎯 Mtaa Delivery Dispatcher',
            desc: 'Mama Wanjiku, Uncle Kamau & DJ Brayo ask for help—pick the right network tool for each real-life Kenyan & City scenario!'
          }
        ].map((tab) => {
          const active = activePrototype === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                sounds.playPop();
                setActivePrototype(tab.id);
              }}
              className={`p-4 sm:p-5 rounded-3xl border-4 text-left transition-all flex flex-col justify-between ${
                active
                  ? 'bg-white border-emerald-500 shadow-xl ring-4 ring-emerald-200/70 scale-[1.01]'
                  : 'bg-white/70 border-slate-200 hover:border-emerald-300 text-slate-700'
              }`}
            >
              <div className="space-y-1.5">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-black ${
                    active ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {tab.badge}
                </span>
                <h3 className="text-base sm:text-lg font-black text-slate-900">{tab.title}</h3>
                <p className="text-xs font-semibold text-slate-600 leading-relaxed">{tab.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================================
          PROTOTYPE 1: THE LIVING 2D VILLAGE / SMART-CITY MAP
         ======================================================================== */}
      {activePrototype === 'living_map' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-emerald-300 shadow-lg space-y-5">
          {/* Top Controls Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-black text-emerald-950 uppercase mr-1">
                1. Pick Your Courier:
              </span>
              <button
                onClick={() => {
                  sounds.playPop();
                  setVehicleType('tcp');
                  setJourneyState('idle');
                }}
                className={`px-3.5 py-2 rounded-xl font-black text-xs border-2 transition-all flex items-center gap-1.5 ${
                  vehicleType === 'tcp'
                    ? 'bg-rose-600 text-white border-rose-700 shadow-sm scale-105'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                <span>🚚</span>
                <span>
                  {analogyMode === 'kenyan'
                    ? 'TCP = Wells Fargo Van (Calls 3 Times + Clipboard)'
                    : 'TCP = Red Express Van (3-Step Handshake + Tracked)'}
                </span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setVehicleType('udp');
                  setJourneyState('idle');
                }}
                className={`px-3.5 py-2 rounded-xl font-black text-xs border-2 transition-all flex items-center gap-1.5 ${
                  vehicleType === 'udp'
                    ? 'bg-sky-600 text-white border-sky-700 shadow-sm scale-105'
                    : 'bg-white text-slate-700 border-slate-300'
                }`}
              >
                <span>🛵</span>
                <span>
                  {analogyMode === 'kenyan'
                    ? 'UDP = Fast Boda-Boda (Zooms & Drops Instantly!)'
                    : 'UDP = Blue Quick Bike (No Handshake, Fast Drop!)'}
                </span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sounds.playPop();
                  setLanFenceActive(!lanFenceActive);
                }}
                className={`px-3.5 py-2 rounded-xl font-black text-xs border-2 transition-all ${
                  lanFenceActive
                    ? 'bg-sky-600 text-white border-sky-700'
                    : 'bg-white text-sky-900 border-sky-300'
                }`}
              >
                {lanFenceActive ? '🟦 LAN Fence: ON' : '🟦 LAN Fence: OFF'}
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  setPavedRoads((p) => ({ ...p, gate: !p.gate }));
                }}
                className={`px-3.5 py-2 rounded-xl font-black text-xs border-2 transition-all ${
                  pavedRoads.gate
                    ? 'bg-amber-500 text-slate-950 border-amber-600'
                    : 'bg-white text-amber-900 border-amber-300'
                }`}
              >
                {pavedRoads.gate ? '🛣️ Highway Gate: OPEN' : '🚧 Open Highway Gate Road'}
              </button>
            </div>
          </div>

          {/* Live Status Banner */}
          <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 font-black text-xs sm:text-sm text-center shadow-sm">
            {mapBanner}
          </div>

          {/* 2D ILLUSTRATED INTERACTIVE MAP CANVAS (SVG + FRAMER MOTION) */}
          <div className="relative w-full rounded-3xl overflow-hidden border-4 border-emerald-400 bg-gradient-to-b from-sky-100 via-emerald-100 to-lime-100 shadow-inner">
            <svg
              viewBox="0 0 820 390"
              className="w-full h-auto block select-none"
              style={{ minHeight: '320px' }}
            >
              {/* Soft Sun & Clouds */}
              <circle cx="70" cy="55" r="28" fill="#fde047" opacity="0.85" />
              <g fill="#ffffff" opacity="0.85">
                <ellipse cx="210" cy="45" rx="35" ry="15" />
                <ellipse cx="230" cy="40" rx="25" ry="14" />
                <ellipse cx="520" cy="42" rx="40" ry="14" />
              </g>

              {/* Decorative Trees */}
              <g>
                <circle cx="60" cy="330" r="18" fill="#16a34a" />
                <circle cx="80" cy="340" r="14" fill="#15803d" />
                <circle cx="430" cy="335" r="16" fill="#16a34a" />
                <circle cx="620" cy="80" r="15" fill="#15803d" />
              </g>

              {/* LIGHT-BLUE LAN FENCE (Subtopic 1.2: Local Area Network) */}
              {lanFenceActive && (
                <g>
                  <rect
                    x="45"
                    y="65"
                    width="565"
                    height="275"
                    rx="36"
                    fill="#e0f2fe"
                    fillOpacity="0.45"
                    stroke="#0284c7"
                    strokeWidth="5"
                    strokeDasharray="14 8"
                  />
                  <rect x="65" y="50" width="320" height="28" rx="14" fill="#0284c7" />
                  <text
                    x="225"
                    y="68"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="900"
                  >
                    {analogyMode === 'kenyan'
                      ? '🟦 LAN FENCE: Nyumba Kumi Gated Court (Local Network)'
                      : '🟦 LAN FENCE: One Tiny Neighborhood (Local Area Network)'}
                  </text>
                </g>
              )}

              {/* ROAD 1: HOME A (130,220) <--> HOME B (350,135) */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  sounds.playPop();
                  setPavedRoads((p) => ({ ...p, ab: !p.ab }));
                }}
              >
                <path
                  d="M 130 225 Q 230 140 350 135"
                  fill="none"
                  stroke={pavedRoads.ab ? '#334155' : '#ca8a04'}
                  strokeWidth={pavedRoads.ab ? '22' : '12'}
                  strokeLinecap="round"
                  strokeDasharray={pavedRoads.ab ? 'none' : '8 8'}
                />
                {pavedRoads.ab && (
                  <path
                    d="M 130 225 Q 230 140 350 135"
                    fill="none"
                    stroke="#f8fafc"
                    strokeWidth="2.5"
                    strokeDasharray="10 10"
                  />
                )}
                <rect
                  x="190"
                  y="148"
                  width="96"
                  height="22"
                  rx="11"
                  fill={pavedRoads.ab ? '#10b981' : '#f59e0b'}
                />
                <text
                  x="238"
                  y="163"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="900"
                >
                  {pavedRoads.ab ? '✅ Road A↔B' : '➕ Pave A↔B'}
                </text>
              </g>

              {/* ROAD 2: HOME B (350,135) <--> HOME C (520,255) */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  sounds.playPop();
                  setPavedRoads((p) => ({ ...p, bc: !p.bc }));
                }}
              >
                <path
                  d="M 350 135 Q 450 185 520 255"
                  fill="none"
                  stroke={pavedRoads.bc ? '#334155' : '#ca8a04'}
                  strokeWidth={pavedRoads.bc ? '22' : '12'}
                  strokeLinecap="round"
                  strokeDasharray={pavedRoads.bc ? 'none' : '8 8'}
                />
                {pavedRoads.bc && (
                  <path
                    d="M 350 135 Q 450 185 520 255"
                    fill="none"
                    stroke="#f8fafc"
                    strokeWidth="2.5"
                    strokeDasharray="10 10"
                  />
                )}
                <rect
                  x="400"
                  y="175"
                  width="96"
                  height="22"
                  rx="11"
                  fill={pavedRoads.bc ? '#10b981' : '#f59e0b'}
                />
                <text
                  x="448"
                  y="190"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="900"
                >
                  {pavedRoads.bc ? '✅ Road B↔C' : '➕ Pave B↔C'}
                </text>
              </g>

              {/* ROAD 3: OUTSIDE LAN HIGHWAY TO MOMBASA (350,135 -> 720,185) */}
              <g
                className="cursor-pointer"
                onClick={() => {
                  sounds.playPop();
                  setPavedRoads((p) => ({ ...p, gate: !p.gate }));
                }}
              >
                <path
                  d="M 350 135 Q 560 115 720 185"
                  fill="none"
                  stroke={pavedRoads.gate ? '#475569' : '#94a3b8'}
                  strokeWidth={pavedRoads.gate ? '20' : '8'}
                  strokeDasharray={pavedRoads.gate ? 'none' : '6 8'}
                />
                {pavedRoads.gate && (
                  <path
                    d="M 350 135 Q 560 115 720 185"
                    fill="none"
                    stroke="#fde047"
                    strokeWidth="2.5"
                    strokeDasharray="10 8"
                  />
                )}
                <rect
                  x="555"
                  y="118"
                  width="115"
                  height="22"
                  rx="11"
                  fill={pavedRoads.gate ? '#0ea5e9' : '#64748b'}
                />
                <text
                  x="612"
                  y="133"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="900"
                >
                  {pavedRoads.gate ? '🛣️ Highway Open' : '🔒 Gate Closed'}
                </text>
              </g>

              {/* ===============================================================
                  HOUSE A (SENDER BOMA / HOUSE)
                 =============================================================== */}
              <g transform="translate(75, 185)">
                <rect
                  x="0"
                  y="0"
                  width="115"
                  height="88"
                  rx="18"
                  fill="#ffffff"
                  stroke="#10b981"
                  strokeWidth="4"
                />
                <text x="57" y="34" textAnchor="middle" fontSize="28">
                  🏠💻
                </text>
                <text
                  x="57"
                  y="54"
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="11"
                  fontWeight="900"
                >
                  {analogyMode === 'kenyan' ? 'Mama Wanjiku (A)' : 'House A (Sender)'}
                </text>
                <text
                  x="57"
                  y="72"
                  textAnchor="middle"
                  fill="#059669"
                  fontSize="10"
                  fontWeight="800"
                >
                  📦 Starts Here!
                </text>
              </g>

              {/* ===============================================================
                  HOUSE B (NEIGHBOR BOMA / HOUSE - CLICK TO DELIVER!)
                 =============================================================== */}
              <g
                transform="translate(292, 85)"
                className="cursor-pointer"
                onClick={() => launchMapJourney('B')}
              >
                <rect
                  x="0"
                  y="0"
                  width="125"
                  height="94"
                  rx="18"
                  fill="#ffffff"
                  stroke="#0284c7"
                  strokeWidth="4"
                />
                <text x="62" y="34" textAnchor="middle" fontSize="28">
                  🏡🖥️
                </text>
                <text
                  x="62"
                  y="53"
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="11"
                  fontWeight="900"
                >
                  {analogyMode === 'kenyan' ? 'Baba Otieno (B)' : 'House B (Neighbor)'}
                </text>
                <rect x="12" y="62" width="101" height="22" rx="10" fill="#0284c7" />
                <text
                  x="62"
                  y="77"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="900"
                >
                  🚀 Deliver Here ({houseCounts.B})
                </text>
              </g>

              {/* ===============================================================
                  HOUSE C (THIRD LAN HOUSE - CLICK TO DELIVER!)
                 =============================================================== */}
              <g
                transform="translate(460, 215)"
                className="cursor-pointer"
                onClick={() => launchMapJourney('C')}
              >
                <rect
                  x="0"
                  y="0"
                  width="125"
                  height="94"
                  rx="18"
                  fill="#ffffff"
                  stroke="#8b5cf6"
                  strokeWidth="4"
                />
                <text x="62" y="34" textAnchor="middle" fontSize="28">
                  🏘️🖨️
                </text>
                <text
                  x="62"
                  y="53"
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="11"
                  fontWeight="900"
                >
                  {analogyMode === 'kenyan' ? 'Shangazi Halima (C)' : 'House C (Printer)'}
                </text>
                <rect x="12" y="62" width="101" height="22" rx="10" fill="#7c3aed" />
                <text
                  x="62"
                  y="77"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="900"
                >
                  🚀 Deliver Here ({houseCounts.C})
                </text>
              </g>

              {/* ===============================================================
                  OUTSIDE LAN NODE (MOMBASA / DISTANT CITY)
                 =============================================================== */}
              <g
                transform="translate(650, 150)"
                className="cursor-pointer"
                onClick={() => launchMapJourney('MOMBASA')}
              >
                <rect
                  x="0"
                  y="0"
                  width="145"
                  height="100"
                  rx="18"
                  fill="#fffbeb"
                  stroke="#f59e0b"
                  strokeWidth="4"
                />
                <text x="72" y="34" textAnchor="middle" fontSize="26">
                  🏙️🌴
                </text>
                <text
                  x="72"
                  y="53"
                  textAnchor="middle"
                  fill="#78350f"
                  fontSize="11"
                  fontWeight="900"
                >
                  {analogyMode === 'kenyan' ? 'Mombasa (Outside LAN)' : 'Far City (Outside LAN)'}
                </text>
                <rect x="14" y="64" width="117" height="22" rx="10" fill="#d97706" />
                <text
                  x="72"
                  y="79"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="900"
                >
                  🌍 Deliver Far ({houseCounts.MOMBASA})
                </text>
              </g>

              {/* ===============================================================
                  TCP 3-WAY HANDSHAKE FLOATING BUBBLES ON THE MAP
                 =============================================================== */}
              {journeyState === 'handshake_1' && (
                <g transform="translate(150, 115)">
                  <rect
                    x="0"
                    y="0"
                    width="175"
                    height="34"
                    rx="14"
                    fill="#e11d48"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="87" y="21" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">
                    👋 1. "Hi / Sasa! Ready?" (SYN)
                  </text>
                </g>
              )}
              {journeyState === 'handshake_2' && (
                <g transform="translate(260, 40)">
                  <rect
                    x="0"
                    y="0"
                    width="195"
                    height="34"
                    rx="14"
                    fill="#0284c7"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="97" y="21" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">
                    ✋ 2. "Poa / Hi Back! Ready!" (SYN-ACK)
                  </text>
                </g>
              )}
              {journeyState === 'handshake_3' && (
                <g transform="translate(160, 115)">
                  <rect
                    x="0"
                    y="0"
                    width="185"
                    height="34"
                    rx="14"
                    fill="#16a34a"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text x="92" y="21" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="900">
                    🤝 3. "Twende / Let’s Go!" (ACK)
                  </text>
                </g>
              )}

              {/* ===============================================================
                  MOVING VEHICLE (ANIMATED WITH FRAMER MOTION!)
                 =============================================================== */}
              <motion.g
                initial={false}
                animate={{ x: vehCoords.x, y: vehCoords.y }}
                transition={{
                  duration:
                    journeyState === 'driving' ? (vehicleType === 'tcp' ? 1.5 : 0.65) : 0.35,
                  ease: 'easeInOut'
                }}
              >
                <circle
                  cx="0"
                  cy="0"
                  r="26"
                  fill={vehicleType === 'tcp' ? '#e11d48' : '#0284c7'}
                  stroke="#ffffff"
                  strokeWidth="3"
                />
                <text x="0" y="8" textAnchor="middle" fontSize="24">
                  {vehicleType === 'tcp' ? '🚚' : '🛵'}
                </text>
                <rect
                  x="-36"
                  y="-42"
                  width="72"
                  height="18"
                  rx="9"
                  fill="#0f172a"
                />
                <text x="0" y="-30" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="900">
                  {vehicleType === 'tcp' ? 'TCP Tracked' : 'UDP Fast!'}
                </text>
              </motion.g>
            </svg>
          </div>
        </div>
      )}

      {/* ========================================================================
          PROTOTYPE 2: THE 4-FLOOR ELEVATOR & BOX-WRAPPING MACHINE
         ======================================================================== */}
      {activePrototype === 'conveyor_elevator' && (
        <div className="bg-white rounded-3xl p-5 sm:p-7 border-4 border-amber-300 shadow-lg space-y-6">
          {/* Top Action Control Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-amber-50 p-4 sm:p-5 rounded-2xl border-2 border-amber-200">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-amber-800">
                Stage {factoryStage + 1} of 6 • {factoryStepsInfo[factoryStage].tcpTitle}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                {analogyMode === 'kenyan'
                  ? factoryStepsInfo[factoryStage].kenyanStory
                  : factoryStepsInfo[factoryStage].smartCityStory}
              </h3>
              <p className="text-xs font-bold text-slate-500">
                Matches: <strong>{factoryStepsInfo[factoryStage].osiMatch}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleAdvanceFactory}
                className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all"
              >
                {factoryStepsInfo[factoryStage].actionButton}
              </button>
              <button
                onClick={() => {
                  sounds.playPop();
                  setFactoryStage(0);
                }}
                className="p-3 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-100"
                title="Reset Elevator"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Interactive 2-Building + Nested Box Machine Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* LEFT: 4-FLOOR SENDER ELEVATOR SHAFT */}
            <div className="lg:col-span-4 bg-slate-50 rounded-3xl p-4 border-3 border-slate-300 flex flex-col justify-between space-y-2">
              <div className="text-xs font-black uppercase text-center text-slate-700 pb-1 border-b border-slate-200">
                🏢 Sender Building (4 TCP/IP Floors)
              </div>

              {[
                { floor: 4, name: 'Floor 4: Application', tag: 'HTTP / FTP (Raw Gift)', stageMatch: 0 },
                { floor: 3, name: 'Floor 3: Transport', tag: '+ Purple Segment Box (Port 80)', stageMatch: 1 },
                { floor: 2, name: 'Floor 2: Internet (IP)', tag: '+ Blue IP Carton (192.168.1.x)', stageMatch: 2 },
                { floor: 1, name: 'Floor 1: Network Access', tag: '+ Amber MAC Ribbon Sack', stageMatch: 3 }
              ].map((fl) => {
                const isHere =
                  (factoryStage === fl.stageMatch && factoryStage <= 3) ||
                  (factoryStage === 5 && fl.floor === 4);
                return (
                  <div
                    key={fl.floor}
                    onClick={() => {
                      sounds.playPop();
                      setFactoryStage(fl.stageMatch);
                    }}
                    className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      isHere
                        ? 'bg-amber-400 text-slate-950 border-amber-600 shadow-md scale-[1.02]'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div>
                      <div className="font-black text-xs sm:text-sm">{fl.name}</div>
                      <div className="text-[11px] font-bold opacity-80">{fl.tag}</div>
                    </div>
                    <span className="text-xl">{isHere ? '🛗📦' : '🏢'}</span>
                  </div>
                );
              })}
            </div>

            {/* CENTER: LIVE ANIMATED RUSSIAN-DOLL PARCEL STACK */}
            <div className="lg:col-span-8 bg-gradient-to-b from-sky-50 via-amber-50/40 to-emerald-50 rounded-3xl p-6 border-3 border-emerald-300 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-900 mb-3 bg-white/90 px-3 py-1 rounded-full border border-emerald-200">
                {factoryStage <= 3
                  ? `⬇️ ENCAPSULATION: ${factoryStage} of 3 Protective Wrappers Added`
                  : factoryStage === 4
                  ? '🛣️ TRAVELING ACROSS THE ETHERNET / TARMAC ROAD!'
                  : '⬆️ DE-ENCAPSULATED AT DESTINATION: All Boxes Opened Safely!'}
              </div>

              {/* Animated Nested Boxes */}
              <motion.div
                animate={{
                  x: factoryStage === 4 ? [0, 45, -45, 0] : 0,
                  scale: factoryStage === 5 ? 1.04 : 1
                }}
                transition={{ duration: 0.9 }}
                className="w-full max-w-xl"
              >
                {/* OUTER WRAPPER: LAYER 2 & 1 (STAGE 3 & 4) */}
                <div
                  className={`rounded-3xl p-4 sm:p-5 transition-all duration-500 ${
                    factoryStage === 3 || factoryStage === 4
                      ? 'bg-amber-200/90 border-4 border-amber-600 shadow-xl'
                      : 'bg-white/40 border-2 border-dashed border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-black text-amber-950 mb-2">
                    <span>
                      🎀 Layer 2/1 Wrapper: {analogyMode === 'kenyan' ? 'Woven Matatu Gunia Sack (Plate KDA-123A)' : 'Largest Box + Ribbon (Ethernet Frame MAC)'}
                    </span>
                    <span>
                      {factoryStage === 3 || factoryStage === 4 ? '🔒 TIED SHUT' : 'Open'}
                    </span>
                  </div>

                  {/* MIDDLE WRAPPER: LAYER 3 IP CARTON (STAGE 2, 3, 4) */}
                  <div
                    className={`rounded-2xl p-4 transition-all duration-500 ${
                      factoryStage >= 2 && factoryStage <= 4
                        ? 'bg-sky-200/90 border-4 border-sky-600 shadow-md'
                        : 'bg-white/50 border-2 border-dashed border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-black text-sky-950 mb-2">
                      <span>
                        📦 Layer 3 Wrapper: {analogyMode === 'kenyan' ? 'Nairobi → Eldoret Carton (IP Packet)' : 'Street Address Box (From/To IP Sticker)'}
                      </span>
                      <span>
                        {factoryStage >= 2 && factoryStage <= 4 ? '🔒 SEALED' : 'Open'}
                      </span>
                    </div>

                    {/* INNER WRAPPER: LAYER 4 SEGMENT BOX (STAGE 1, 2, 3, 4) */}
                    <div
                      className={`rounded-2xl p-4 transition-all duration-500 ${
                        factoryStage >= 1 && factoryStage <= 4
                          ? 'bg-purple-200/90 border-4 border-purple-600 shadow-sm'
                          : 'bg-white/60 border-2 border-dashed border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-black text-purple-950 mb-2">
                        <span>
                          🎁 Layer 4 Wrapper: {analogyMode === 'kenyan' ? 'Padded Pouch + Room Extension #80 (Segment)' : 'Small Port Box (TCP Door #80)'}
                        </span>
                        <span>
                          {factoryStage >= 1 && factoryStage <= 4 ? '🔒 BOXED' : 'Open'}
                        </span>
                      </div>

                      {/* CORE PAYLOAD (ALWAYS INSIDE!) */}
                      <div className="bg-white rounded-2xl p-4 border-3 border-rose-400 text-center space-y-1 shadow-sm">
                        <div className="text-4xl">
                          {factoryStage === 5 ? '🥳🧸📱✨' : '🧸📱'}
                        </div>
                        <div className="font-black text-sm sm:text-base text-slate-900">
                          Core Gift (Floor 4 Data): Teddy Bear & Upcountry Phone
                        </div>
                        <div className="text-xs font-bold text-emerald-700">
                          {factoryStage === 5
                            ? '🎉 Safely unwrapped at your friend’s house!'
                            : 'Protected inside the layer boxes!'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================
          PROTOTYPE 3: THE MTAA / SMART-CITY DISPATCHER MISSION GAME
         ======================================================================== */}
      {activePrototype === 'dispatcher_game' && (
        <div className="bg-white rounded-3xl p-5 sm:p-8 border-4 border-purple-300 shadow-lg space-y-6">
          {/* Mission Progress Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-purple-50 p-4 rounded-2xl border-2 border-purple-200">
            <div className="flex items-center gap-2">
              {missions.map((m, idx) => (
                <button
                  key={m.num}
                  onClick={() => {
                    sounds.playPop();
                    setMissionIdx(idx);
                    setMissionState('playing');
                    setMissionFeedback('');
                  }}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all ${
                    missionIdx === idx
                      ? 'bg-purple-600 text-white shadow-sm scale-105'
                      : 'bg-white text-purple-900 border border-purple-200'
                  }`}
                >
                  Mission #{m.num}
                </button>
              ))}
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs">
              ⭐ Happy Neighbors Helped: {score}
            </div>
          </div>

          {/* Character Request Bubble */}
          <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-sky-50 rounded-3xl p-6 border-3 border-emerald-300 flex flex-col sm:flex-row items-center gap-5">
            <div className="w-20 h-20 rounded-3xl bg-white border-4 border-emerald-400 shadow-md flex items-center justify-center text-5xl shrink-0">
              {currentMission.avatar}
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="font-black text-base text-slate-900">
                  {currentMission.character}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-black text-xs">
                  Tests: {currentMission.subtopicTag}
                </span>
              </div>
              <p className="text-sm sm:text-base font-extrabold text-slate-800 italic bg-white/90 p-3.5 rounded-2xl border border-emerald-200 shadow-sm">
                {currentMission.request}
              </p>
            </div>
          </div>

          {/* Choice Cards */}
          <div className="space-y-3">
            <h4 className="font-black text-base sm:text-lg text-slate-900">
              👉 {currentMission.question}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentMission.choices.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => handlePickMissionChoice(ch)}
                  className="p-5 rounded-3xl border-4 border-slate-200 hover:border-purple-500 bg-white hover:bg-purple-50/40 text-left transition-all shadow-sm hover:shadow-md flex items-start gap-4 group active:scale-98"
                >
                  <div className="w-14 h-14 rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                    {ch.icon}
                  </div>
                  <div className="space-y-1">
                    <div className="font-black text-base text-slate-900 group-hover:text-purple-900">
                      {ch.title}
                    </div>
                    <p className="text-xs font-semibold text-slate-600 leading-relaxed">
                      {ch.subtitle}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback & Next Mission Button */}
          {missionFeedback && (
            <div
              className={`p-5 rounded-2xl border-3 flex flex-col sm:flex-row items-center justify-between gap-4 ${
                missionState === 'won_round'
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-amber-50 border-amber-400 text-amber-950'
              }`}
            >
              <div className="font-black text-xs sm:text-sm leading-relaxed">
                {missionState === 'won_round' ? '🎉 ' : '💡 '}
                {missionFeedback}
              </div>
              {missionState === 'won_round' && (
                <button
                  onClick={() => {
                    sounds.playPop();
                    setMissionIdx((prev) => (prev + 1) % missions.length);
                    setMissionState('playing');
                    setMissionFeedback('');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shrink-0 shadow-sm"
                >
                  Next Neighbor Mission →
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================
          PROTOTYPE 3 (board_quest): 5-STOP BOARD GAME & FLOOR SIGN SNAP PUZZLE
         ======================================================================== */}
      {activePrototype === 'board_quest' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT GAME: SNAP THE PROTOCOL SIGNS ONTO THE 4 FLOORS */}
          <div className="bg-white rounded-3xl p-6 border-4 border-sky-300 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-900 font-black text-xs">
                  🧩 Mini-Game A • Snap Signs to Floors
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  Build the 4-Floor TCP/IP Hall!
                </h3>
              </div>
              <button
                onClick={() => {
                  sounds.playPop();
                  setFloorPuzzleSlots({ 4: null, 3: null, 2: null, 1: null });
                  setSelectedSignChip('HTTP & FTP');
                }}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            <p className="text-xs font-bold text-slate-600">
              1️⃣ Tap a sign chip below, then 2️⃣ tap the correct building floor (4, 3, 2, or 1) where that helper works!
            </p>

            {/* Sign Chips Tray */}
            <div className="flex flex-wrap gap-2 bg-sky-50 p-3 rounded-2xl border-2 border-sky-200">
              {signChips.map((chip) => {
                const alreadyPlaced = Boolean(floorPuzzleSlots[chip.correctFloor]);
                const isSelected = selectedSignChip === chip.label;
                return (
                  <button
                    key={chip.label}
                    disabled={alreadyPlaced}
                    onClick={() => {
                      sounds.playPop();
                      setSelectedSignChip(chip.label);
                    }}
                    className={`px-3 py-2 rounded-xl font-black text-xs border-2 transition-all flex items-center gap-1.5 ${
                      alreadyPlaced
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 opacity-60'
                        : isSelected
                        ? 'bg-sky-600 text-white border-sky-700 scale-105 shadow-sm'
                        : 'bg-white text-slate-800 border-slate-300'
                    }`}
                  >
                    <span>{chip.icon}</span>
                    <span>{chip.label}</span>
                    {alreadyPlaced && <span>✅</span>}
                  </button>
                );
              })}
            </div>

            {/* 4 Building Floors */}
            <div className="space-y-2.5">
              {[
                { num: 4, title: 'Floor 4 (Top): Application Layer', role: 'Where web letters & file boxes start' },
                { num: 3, title: 'Floor 3: Transport Layer', role: 'Where tracked vans & fast bodas are chosen' },
                { num: 2, title: 'Floor 2: Internet Layer', role: 'Where street & town maps live' },
                { num: 1, title: 'Floor 1 (Ground): Network Access', role: 'Where cables, tarmac & number plates live' }
              ].map((fl) => {
                const placed = floorPuzzleSlots[fl.num];
                return (
                  <div
                    key={fl.num}
                    onClick={() => handlePlaceSignOnFloor(fl.num)}
                    className={`p-3.5 rounded-2xl border-3 cursor-pointer transition-all flex items-center justify-between ${
                      placed
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                        : 'bg-slate-50 hover:bg-sky-50 border-dashed border-sky-300 text-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-black text-xs sm:text-sm">{fl.title}</div>
                      <div className="text-[11px] font-semibold text-slate-500">{fl.role}</div>
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-xl font-black text-xs ${
                        placed
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-white border border-sky-300 text-sky-800'
                      }`}
                    >
                      {placed ? `${placed.icon} ${placed.label} ✅` : '➕ Tap to Snap Sign Here'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT GAME: 5-STOP INTERACTIVE BOARD-GAME TRACK */}
          <div className="bg-white rounded-3xl p-6 border-4 border-amber-300 shadow-lg space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black text-xs">
                    🎲 Mini-Game B • 5-Stop Board Game Quest
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                    Walk Your Parcel Across All 5 Stops!
                  </h3>
                </div>
                <button
                  onClick={() => {
                    sounds.playPop();
                    setQuestStop(1);
                    setHandshakeTaps(0);
                  }}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-black flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
              </div>

              {/* 5 Board Tiles */}
              <div className="grid grid-cols-5 gap-2 pt-1">
                {[
                  { stop: 1, icon: '🏠💌', label: '1. Write' },
                  { stop: 2, icon: '🤝🚚', label: '2. Handshake' },
                  { stop: 3, icon: '📦🗺️', label: '3. Box & IP' },
                  { stop: 4, icon: '🟦🛣️', label: '4. LAN Road' },
                  { stop: 5, icon: '🏡🎉', label: '5. Unwrap!' }
                ].map((tile) => {
                  const active = questStop === tile.stop;
                  const done = questStop > tile.stop;
                  return (
                    <div
                      key={tile.stop}
                      className={`p-2.5 rounded-2xl border-2 text-center transition-all ${
                        active
                          ? 'bg-amber-400 border-amber-600 text-slate-950 scale-105 shadow-md'
                          : done
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div className="text-xl sm:text-2xl">{tile.icon}</div>
                      <div className="font-black text-[10px] sm:text-xs mt-1">{tile.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Interactive Action Card for Current Board Tile */}
              <div className="bg-amber-50/80 rounded-2xl p-5 border-2 border-amber-300 space-y-4 text-center">
                {questStop === 1 && (
                  <>
                    <div className="text-4xl">👩🏾‍🍳💻</div>
                    <h4 className="font-black text-base text-slate-900">
                      Stop 1: Mama Wanjiku Writes a Message (Floor 4 Application)
                    </h4>
                    <p className="text-xs font-bold text-slate-600">
                      She puts her recipe note into an HTTP envelope. Tap below to hand it to Floor 3!
                    </p>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setQuestStop(2);
                        setHandshakeTaps(0);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-sm"
                    >
                      ✉️ Seal HTTP Note & Move to Stop 2 →
                    </button>
                  </>
                )}

                {questStop === 2 && (
                  <>
                    <div className="text-4xl">🚚👋</div>
                    <h4 className="font-black text-base text-slate-900">
                      Stop 2: Tap 3 Times for the TCP 3-Way Handshake! ({handshakeTaps} / 3)
                    </h4>
                    <p className="text-xs font-bold text-slate-600">
                      Before the Red TCP Van / Wells Fargo Van drives, tap to complete all 3 polite greetings!
                    </p>
                    <button
                      onClick={() => {
                        const nextTap = handshakeTaps + 1;
                        sounds.playPop();
                        setHandshakeTaps(nextTap);
                        if (nextTap >= 3) {
                          setTimeout(() => {
                            sounds.playSuccess();
                            setQuestStop(3);
                          }, 500);
                        }
                      }}
                      className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs sm:text-sm shadow-md active:scale-95 transition-all"
                    >
                      {handshakeTaps === 0 && '👋 Tap #1: Say "Hi / Sasa!" (SYN)'}
                      {handshakeTaps === 1 && '✋ Tap #2: Reply "Hi Back / Poa!" (SYN-ACK)'}
                      {handshakeTaps === 2 && '🤝 Tap #3: Agree "Let’s Go / Twende!" (ACK)'}
                      {handshakeTaps >= 3 && '✅ Handshake Complete!'}
                    </button>
                  </>
                )}

                {questStop === 3 && (
                  <>
                    <div className="text-4xl">🧸➡️📦➡️🎀</div>
                    <h4 className="font-black text-base text-slate-900">
                      Stop 3: Encapsulate! Wrap Box-Inside-Box (Floors 3, 2 & 1)
                    </h4>
                    <p className="text-xs font-bold text-slate-600">
                      Put the note inside the Port Box (L4), the IP Address Carton (L3), and the Ethernet MAC Sack (L2)!
                    </p>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setQuestStop(4);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-sky-600 text-white font-black text-xs shadow-sm"
                    >
                      🎀 Wrap All 3 Layers & Roll Onto the Road →
                    </button>
                  </>
                )}

                {questStop === 4 && (
                  <>
                    <div className="text-4xl">🟦🛵🛣️</div>
                    <h4 className="font-black text-base text-slate-900">
                      Stop 4: Drive Along the Local LAN Road!
                    </h4>
                    <p className="text-xs font-bold text-slate-600">
                      Our parcel stays safely inside the Light-Blue LAN Fence (Nyumba Kumi Court) and reaches Plot #2!
                    </p>
                    <button
                      onClick={() => {
                        sounds.playSuccess();
                        confetti({ particleCount: 65, spread: 60, origin: { y: 0.7 } });
                        setQuestStop(5);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-black text-xs shadow-sm"
                    >
                      🏡 Knock on Baba Otieno’s Door (Stop 5) →
                    </button>
                  </>
                )}

                {questStop === 5 && (
                  <>
                    <div className="text-4xl">🥳🎉🧺</div>
                    <h4 className="font-black text-base text-emerald-900">
                      Stop 5: De-encapsulated & Delivered! You Completed the Quest!
                    </h4>
                    <p className="text-xs font-bold text-slate-600">
                      Baba Otieno untied the Layer 2 ribbon, opened the Layer 3 IP box, opened the Layer 4 port box, and read the recipe!
                    </p>
                    <button
                      onClick={() => {
                        sounds.playPop();
                        setQuestStop(1);
                        setHandshakeTaps(0);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-xs shadow-sm"
                    >
                      🔄 Play the 5-Stop Quest Again!
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

