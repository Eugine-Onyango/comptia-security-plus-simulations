// Complete CCNA 31-Topic Roadmap + Detailed Topic 1 Subtopics with Layman Explanations & Dual Analogies (Smart-City + Kenyan Mtaa)

export const topic1Subtopics = [
  {
    id: 'what-is-a-network',
    number: '1.1',
    title: 'What is a Network?',
    icon: '🏘️',
    pastelBg: 'bg-emerald-50',
    borderColor: 'border-emerald-300',
    accentText: 'text-emerald-900',
    badgeBg: 'bg-emerald-100 text-emerald-800',
    laymanTitle: 'Two or more devices connected together so they can share things.',
    laymanExplanation:
      'Whenever two or more computers, phones, or printers are linked together (by a cable or through the air) so they can talk and share photos, messages, or files—that is a computer network! A single computer all alone on a table is just an island; once you connect a road to another computer, you have built a network.',
    smartCityAnalogy: {
      title: 'Smart-City Picture: Houses & Roads',
      icon: '🏠🛣️',
      summary: '“A network is houses linked by roads so they can send letters and gifts.”',
      details:
        'Imagine sketching 3 little houses on a sheet of paper and drawing simple roads touching their front doors. Because the roads connect them, House A can send a birthday card or parcel to House B and House C anytime!'
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Shamba / Estate Bomas & Footpaths',
      icon: '🇰🇪🛵',
      summary: '“Neighboring bomas connected by footpaths so you can send a bowl of sukuma wiki or a boda parcel across.”',
      details:
        'Think of three neighboring homesteads (Mama Wanjiku, Baba Otieno, and Shangazi Halima) in a village or estate connected by clear footpaths. Because those paths link their gates, they can easily send a thermos of chai, a message, or a boda-boda package to each other!'
    },
    notebookStep: 'Draw 3 small squares (houses 🏠) inside a city border and connect them with single lines (roads 🛣️). Label it "Network".'
  },
  {
    id: 'local-area-network',
    number: '1.2',
    title: 'Local Area Network (LAN)',
    icon: '🏡',
    pastelBg: 'bg-sky-50',
    borderColor: 'border-sky-300',
    accentText: 'text-sky-900',
    badgeBg: 'bg-sky-100 text-sky-800',
    laymanTitle: 'A small network inside one small place (like one home, one school, or one office floor).',
    laymanExplanation:
      'A LAN (Local Area Network) is simply a network that stays inside one small, close-together area. All the phones, laptops, and TVs inside your living room—or all the computers inside one cybercafé or school lab—form one LAN. Traffic inside a LAN travels on your own private local wires without needing to go out to the wider world.',
    smartCityAnalogy: {
      title: 'Smart-City Picture: The Light-Blue Neighborhood Fence',
      icon: '🟦🏡',
      summary: '“A LAN is one tiny neighborhood that shares a short local road.”',
      details:
        'Draw a friendly light-blue fence around one small group of houses that sit right next to each other. Inside this fence, neighbors chat and pass parcels directly on their quiet shared street without ever stepping onto the busy city highway.'
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: A Gated Estate Court / "Nyumba Kumi" Compound',
      icon: '🇰🇪🏘️',
      summary: '“One gated court in South B or a single family compound where everyone shares the same compound path.”',
      details:
        'Picture one gated court (or a "Plot 10" compound) surrounded by a green kei-apple hedge or perimeter wall. When you walk from House #1 to House #4 inside the same compound, you never leave the main gate or pay matatu fare on Thika Road—everything happens locally inside your compound!'
    },
    notebookStep: 'With a light-blue pen, draw a round fence around your close group of houses and write: "LAN = one neighborhood".'
  },
  {
    id: 'osi-tcpip-models',
    number: '1.3',
    title: 'OSI & TCP/IP Models',
    icon: '🏢',
    pastelBg: 'bg-amber-50',
    borderColor: 'border-amber-300',
    accentText: 'text-amber-900',
    badgeBg: 'bg-amber-100 text-amber-800',
    laymanTitle: 'Step-by-step checklists (layers) that break a complicated delivery job into simple floors.',
    laymanExplanation:
      'Sending a message from one computer to another involves many tiny jobs: writing the message, chopping it into small pieces, writing the address, and pushing electricity through a wire. To keep from getting confused, engineers divided these jobs into stacked "floors" called Layers. The OSI Model uses 7 detailed floors (great for teaching and troubleshooting), while the TCP/IP Model groups those exact same jobs into 4 practical floors (used by the real Internet).',
    smartCityAnalogy: {
      title: 'Smart-City Picture: The 7-Floor City Hall & 4-Floor Mini-Hall',
      icon: '🏢🏛️',
      summary: '“The halls show the layers that help a letter travel. The 7-floor hall is OSI; the 4-floor hall is TCP/IP.”',
      details:
        'Beside the houses, we draw a tall 7-floor office building (OSI Layers 1 to 7 from bottom to top) and right next to it a shorter 4-floor building (TCP/IP Layers 1 to 4). Every letter goes from the top floor down to the ground floor to hit the road, and then rides up from Floor 1 to the top floor when it arrives!'
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Huduma Centre (7 Counters) vs. Local Wakala Shop (4 Counters)',
      icon: '🇰🇪🏢',
      summary: '“Huduma Centre splits the paperwork into 7 specialized desks; the local courier office combines them into 4 quick desks!”',
      details:
        'Imagine sending an official parcel. At a big Huduma Centre (OSI Model), you visit 7 separate counters: Counter 7 writes the letter, Counter 6 translates the language, Counter 5 opens the session, Counter 4 checks the tracking receipt, Counter 3 stamps the town address, Counter 2 puts it in the matatu sack, and Counter 1 loads it onto the tarmac road. Next door, the practical Fargo/Matatu Sacco office (TCP/IP Model) does the exact same work in just 4 combined counters!'
    },
    notebookStep: 'On the right margin, draw a tall 7-floor building ("OSI Layers" 1-7 bottom-to-top) and a shorter 4-floor building ("TCP/IP Layers" 1-4).'
  },
  {
    id: 'tcpip-suite-of-protocols',
    number: '1.4',
    title: 'TCP/IP Suite of Protocols',
    icon: '🚚',
    pastelBg: 'bg-purple-50',
    borderColor: 'border-purple-300',
    accentText: 'text-purple-900',
    badgeBg: 'bg-purple-100 text-purple-800',
    laymanTitle: 'The team of specialized helpers and rules working on each floor of the TCP/IP building.',
    laymanExplanation:
      'A "protocol" is simply an agreed-upon rule that computers follow so they understand each other (just like agreeing to speak Swahili or English, or driving on the left side of the road). Because different floors have different jobs, they use a whole family ("suite") of protocols: Floor 4 uses HTTP (for websites) and FTP (for files); Floor 3 uses TCP (careful tracked delivery) or UDP (fast no-frills delivery); Floor 2 uses IP (street addresses & maps); and Floor 1 uses Ethernet (the physical cable road rules).',
    smartCityAnalogy: {
      title: 'Smart-City Picture: Signs & Helpers on Each of the 4 Floors',
      icon: '✉️🚚🗺️🛣️',
      summary: '“Each sign is a rule (protocol) that helpers follow on its floor.”',
      details:
        'Inside the 4-floor TCP/IP hall: Floor 4 (Top) has a tiny envelope "HTTP" and file box "FTP". Floor 3 has a red "TCP Fast-Van" (with a clipboard that waves 3 times before driving) and a blue "UDP Bike" (zooms fast with no tracking). Floor 2 has an "IP Highway Map" sign. Floor 1 (Bottom) has an "Ethernet Road" cable coil.'
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: WhatsApp Note, G4S Van vs. Boda-Boda, Posta Town Map, & Tarmac Road',
      icon: '🇰🇪🏍️🚐',
      summary: '“Floor 4 writes the message; Floor 3 picks either a tracked G4S van (TCP) or a fast Boda-Boda (UDP); Floor 2 checks the town pin (IP); Floor 1 rides the tarmac (Ethernet).”',
      details:
        'On Floor 4, you write a web message (HTTP) or pack a file bale (FTP). On Floor 3, you choose your rider: TCP is like a formal Wells Fargo / G4S van that calls first ("Sasa? Unanipata? Twende!") and makes you sign a book for every box, while UDP is a quick Boda-Boda rider who shouts your name, tosses the parcel over the gate, and speeds off without stopping! On Floor 2, IP is the county/plot address map. On Floor 1, Ethernet is the actual tarmac/murram lane and number plate.'
    },
    notebookStep: 'Inside the 4-floor building, draw signs on each floor: Floor 4 (HTTP envelope, FTP box), Floor 3 (TCP van & UDP bike), Floor 2 (IP Map), Floor 1 (Ethernet cable).'
  },
  {
    id: 'encapsulation',
    number: '1.5',
    title: 'Encapsulation',
    icon: '🎁',
    pastelBg: 'bg-rose-50',
    borderColor: 'border-rose-300',
    accentText: 'text-rose-900',
    badgeBg: 'bg-rose-100 text-rose-800',
    laymanTitle: 'Wrapping your message inside protective boxes and labels at each floor before sending it.',
    laymanExplanation:
      'You cannot just throw a raw photo or text message onto a wire by itself—nobody would know which app it came from, which computer it is going to, or if it broke along the way! So as your message travels DOWN the floors (from Floor 4 to Floor 1), each floor wraps it inside a new protective box with its own label. Putting box-inside-box on the way down is called Encapsulation. Opening the boxes one by one when the parcel arrives is called De-encapsulation.',
    smartCityAnalogy: {
      title: 'Smart-City Picture: The Parcel-Inside-Parcel Gift Stack',
      icon: '🧸📦🎀',
      summary: '“Each layer adds its own wrapper, so the toy is safe all the way.”',
      details:
        'Start with a tiny teddy bear (your raw Data). Floor 4/3 puts a small square box around it with Port numbers (Segment). Floor 2 puts that box inside a bigger box with From/To IP street numbers (Packet). Floor 1 puts everything inside the largest box tied with a MAC ribbon (Ethernet Frame) and rolls it onto the road!'
    },
    kenyanAnalogy: {
      title: 'Kenyan Analogy: Packing an Upcountry Matatu Sacco Parcel (2NK / EasyCoach)',
      icon: '🇰🇪📦🚌',
      summary: '“Gift inside a small envelope → inside a labeled carton box → tied inside a woven gunia sack for the matatu roof!”',
      details:
        'Imagine sending a new phone upcountry to Eldoret via EasyCoach or 2NK Sacco. First, you have the phone itself (Data). You slip it into a padded pouch with the recipient’s room/phone extension (Layer 4 Segment). Next, the clerk puts that pouch into a sturdy brown carton box and writes "From: Nairobi -> To: Eldoret Plot 5" in marker (Layer 3 IP Packet). Finally, the loader places that carton into a big woven courier sack (gunia) tagged for the specific shuttle bus plate KDA 123A (Layer 2 Frame) before the tyres hit the highway (Layer 1)!'
    },
    notebookStep: 'Draw a tiny toy 🧸 -> inside a small box (Layer 4) -> inside a bigger box (Layer 3) -> inside the largest box with ribbon (Layer 2 & 1). Arrow down = Wrapping; Arrow up = Unwrapping.'
  }
];

export const all31CcnaTopics = [
  {
    id: 1,
    title: 'Computer Networking - Introduction',
    shortTitle: 'Intro to Networking',
    status: 'active',
    icon: '🏙️',
    smartCityPicture: 'Whole city outline, houses, blue LAN fence, 7-floor & 4-floor halls, gift-box stack',
    smartCityMeaning: '“Computers = houses that share letters & parcels.”',
    kenyanAnalogy: 'Bomas & footpaths, Nyumba Kumi gated court, Huduma Centre vs Wakala kiosk, Boda vs Fargo van, & Matatu parcel wrapping.',
    subtopics: [
      'What is a Network?',
      'Local Area Network (LAN)',
      'OSI & TCP/IP Models',
      'TCP/IP Suite of Protocols',
      'Encapsulation'
    ]
  },
  {
    id: 2,
    title: 'Networking Components',
    shortTitle: 'Networking Components',
    status: 'preview',
    icon: '🏤',
    smartCityPicture: 'NIC mail slots, Cable roads, Switch post-office, Hub loudspeaker, Router interchange',
    smartCityMeaning: '“Cables, switches, routers = the city’s delivery tools.”',
    kenyanAnalogy: 'Compound gate mailbox (NIC), murram/tarmac road (Cable), Mtaa Posta sorting pigeon-holes (Switch), loud village baraza megaphone (Hub), & Highway Roundabout (Router).',
    subtopics: ['NIC (Network Interface Card)', 'Cables', 'Switch', 'Hub', 'Router']
  },
  {
    id: 3,
    title: 'Transport Layer',
    shortTitle: 'Transport Layer',
    status: 'preview',
    icon: '🚚',
    smartCityPicture: 'Port garage doors (80, 53, 443), Red TCP express van (3-way handshake) vs. Blue UDP quick van',
    smartCityMeaning: '“TCP = tracked express; UDP = no-frills drop-off.”',
    kenyanAnalogy: 'Shop counter numbers (Ports), G4S/Wells Fargo signed delivery van with 3-step greeting (TCP) vs. fast Boda-Boda rider who drops & zooms off (UDP).',
    subtopics: ['Transport Layer Big Idea', 'Ports', 'TCP', 'TCP 3-Way Handshake', 'UDP']
  },
  {
    id: 4,
    title: 'Network Layer',
    shortTitle: 'Network Layer',
    status: 'preview',
    icon: '🛣️',
    smartCityPicture: 'Highway interchanges, IP header sticker, Unicast, Multicast, Broadcast, Private vs Public IPs',
    smartCityMeaning: '“Routers pick the best road to any house.”',
    kenyanAnalogy: 'Major highway interchanges (Museum Hill / Changamwe), parcel "From/To" sticker, 1-to-1 delivery (Unicast), Chama WhatsApp group invite (Multicast), whole-estate announcement (Broadcast).',
    subtopics: ['Network Layer Big Idea', 'IP Header', 'Unicast Address', 'Multicast Address', 'Broadcast Address', 'Private vs. Public IP Addresses']
  },
  {
    id: 5,
    title: 'IPv4 Addressing',
    shortTitle: 'IPv4 Addressing',
    status: 'preview',
    icon: '🏠',
    smartCityPicture: 'Street + house numbers (192.168.1.10), 8 binary light boxes, Blue/Yellow subnet mask, Classes A/B/C',
    smartCityMeaning: '“Each house needs a unique address so vans find it.”',
    kenyanAnalogy: 'County.Subcounty.Estate.Plot number, 8 token-meter switches (Binary), Blue Estate Name vs Yellow House Door (Subnet Mask), & Highway/Avenue/Court sizes (Classes A, B, C).',
    subtopics: ['IPv4 Address Format', 'Decimal to Binary (8 Light Boxes)', 'Subnet Mask (Street vs House)', 'IP Classes (A, B, C & 127 Loopback)']
  },
  {
    id: 6,
    title: 'Subnetting',
    shortTitle: 'Subnetting',
    status: 'preview',
    icon: '🚧',
    smartCityPicture: 'Coloured fences (/26, /27), CIDR tape-measure, VLSM custom fence sizes, Private green IPs',
    smartCityMeaning: '“Big city split into smaller districts for order.”',
    kenyanAnalogy: 'Subdividing a big ancestral shamba into neat fenced courts (Phase 1, Phase 2, VIP Court) using a surveyor’s tape measure (CIDR / VLSM) so visitors never get lost.',
    subtopics: ['Subnetting Big Idea', 'CIDR ("Slash" /26, /27)', 'Creating Subnets', 'VLSM (Custom Fence Sizes)', 'Private IP Address Ranges']
  },
  {
    id: 7,
    title: 'Data-Link Layer',
    shortTitle: 'Data-Link Layer',
    status: 'preview',
    icon: '🚦',
    smartCityPicture: 'Street signs & Ethernet rule book, Ethernet frame envelope, MAC licence plates, MAC vs IP board',
    smartCityMeaning: '“Ensures vans behave while inside one district.”',
    kenyanAnalogy: 'NTSA estate road rules, vehicle logbook/number plate (MAC Address KDA 123X that never changes) vs journey destination town (IP Address).',
    subtopics: ['Data-Link Layer Big Idea', 'Ethernet Rule Book', 'Ethernet Frame Envelope', 'MAC Address (Licence Plate)', 'MAC vs. IP Comparison']
  },
  {
    id: 8,
    title: 'Physical Layer',
    shortTitle: 'Physical Layer',
    status: 'preview',
    icon: '🛤️',
    smartCityPicture: 'Brown copper asphalt, Blue fiber glass tunnel, Grey coax track, IEEE speed signs, PoE lamp-posts',
    smartCityMeaning: '“The solid stuff parcels travel on.”',
    kenyanAnalogy: 'Murram road (Coax), paved town tarmac (Copper UTP), SGR express rail / Nairobi Expressway (Fiber-Optic), speed limit signs (IEEE 802.3), & solar/power street lines (Cisco PoE).',
    subtopics: ['Physical Layer Big Idea', 'Types of Ethernet Cabling (Copper, Fiber, Coax)', 'IEEE Ethernet Standards (Speed Signs)', 'Cisco PoE (Power over Ethernet)']
  },
  {
    id: 9,
    title: 'Cisco Devices & Road Rules',
    shortTitle: 'Cisco Devices',
    status: 'preview',
    icon: '🏢',
    smartCityPicture: 'Hub, Switch, Router, Layer-3 Switch (with router hat), CSMA/CD traffic light, Collision & Broadcast domains',
    smartCityMeaning: '“Special booths managing local roads or highways.”',
    kenyanAnalogy: 'Single-lane narrow bridge where cars must listen before crossing (CSMA/CD & Collision Domain) vs multi-lane modern interchange and estate loudspeaker reach (Broadcast Domain).',
    subtopics: ['Network Hub vs Switch', 'Layer-2 Switching', 'CSMA/CD', 'Collision Domain', 'Broadcast Domain', 'Network Router & Layer-3 Switch']
  },
  {
    id: 10,
    title: 'Basic Troubleshooting',
    shortTitle: 'Basic Troubleshooting',
    status: 'preview',
    icon: '🔧',
    smartCityPicture: 'Mechanic with checklist, ICMP tester-note, Ping/Pong bubbles, Traceroute hop stamps, Lead Process torch',
    smartCityMeaning: '“Check road, sign, vehicle when a parcel is late.”',
    kenyanAnalogy: 'Fundi/Mechanic checking tyres & road first, calling "Uko hapo?" -> "Niko!" (Ping/Pong), and checking every matatu stage stamp from Nairobi -> Nakuru -> Eldoret (Traceroute).',
    subtopics: ['Troubleshooting Steps Checklist', 'ICMP Tester-Note', 'Ping ("Ping?" -> "Pong!")', 'Traceroute (Stage Stamps)', 'Lead Process Step-by-Step Watch']
  },
  {
    id: 11,
    title: 'IPv4 Routing',
    shortTitle: 'IPv4 Routing',
    status: 'preview',
    icon: '🪧',
    smartCityPicture: 'Router notebook (routing table) & colourful direction boards (Connected, Static, Dynamic, Floating, Default)',
    smartCityMeaning: '“Tells vans which junction to take next.”',
    kenyanAnalogy: 'KENHA highway signboards at major junctions: permanent bolted sign (Static), live traffic marshal sign (Dynamic), backup detour road (Floating Static), & "All Other Towns -> A104 Highway" (Default Route).',
    subtopics: ['IP Routing & Routing Table', 'Connected Route', 'Static Route', 'Dynamic Route', 'Floating Static Route', 'Default Static Route (0.0.0.0/0)', 'Static Host & Summary Routes']
  },
  {
    id: 12,
    title: 'Dynamic Routing (GPS Chat)',
    shortTitle: 'Dynamic Routing',
    status: 'preview',
    icon: '📡',
    smartCityPicture: 'GPS chat towers, RIP snail / OSPF rabbit / EIGRP owl, AD score cards, Metrics, ECMP, Loopback, Passive zipper',
    smartCityMeaning: '“Routers chat to keep maps fresh.”',
    kenyanAnalogy: 'Matatu drivers warning each other on WhatsApp/radio about traffic jams, trusting a closer Sacco marshal more (AD), comparing kilometre distance (Metric), & splitting traffic across two equal roads (ECMP).',
    subtopics: ['Dynamic Routing Big Idea', 'Routing Protocols (RIP, OSPF, EIGRP)', 'Compare IGPs', 'Administrative Distance (AD)', 'Metric', 'ECMP Load Sharing', 'Loopback & Passive Interfaces']
  },
  {
    id: 13,
    title: 'IGPs (City-Only GPS Club)',
    shortTitle: 'IGPs (RIP & EIGRP)',
    status: 'preview',
    icon: '🦉',
    smartCityPicture: 'RIP turtle walkie-talkie (15 hops max) vs. EIGRP owl smart tablet (DUAL balance scale, RTP, Wildcard stencil)',
    smartCityMeaning: '“Routes inside one city (RIP, EIGRP, OSPF).”',
    kenyanAnalogy: 'Old pocket radio that only reaches 15 stages (RIP) vs. smart tablet that keeps the best road plus an instant backup road ready (EIGRP DUAL) and uses a stencil cut-out (Wildcard Mask).',
    subtopics: ['RIP Overview & Default Route', 'Configuring RIPv2', 'EIGRP Overview', 'DUAL Algorithm & RTP', 'Wildcard Mask Stencil', 'Auto & Manual Summarization']
  },
  {
    id: 14,
    title: 'OSPF (Bike Messengers)',
    shortTitle: 'OSPF',
    status: 'preview',
    icon: '🚴',
    smartCityPicture: 'Bike messengers sharing live maps (LSAs), Cost tags, DR star bike & BDR shield bike at busy plaza',
    smartCityMeaning: '“Fast, organized traffic reports for every junction.”',
    kenyanAnalogy: 'Organized Boda-Boda Sacco where every rider shares a full town map, calculates road cost by how wide the highway is (Bandwidth), and elects one Chairman (DR) & Vice-Chairman (BDR) at the stage so everyone doesn’t shout at once.',
    subtopics: ['OSPF Overview & vs EIGRP', 'Bandwidth vs Clock Rate & OSPF Cost', 'OSPF Configuration', 'DR / BDR Election', 'Passive Interface & Default-Information Originate', 'Load Balancing, Summarization & Network Types']
  },
  {
    id: 15,
    title: 'VLANs (Colored Fences)',
    shortTitle: 'VLANs',
    status: 'preview',
    icon: '🎨',
    smartCityPicture: '3-layer hall, Spine-Leaf tree, Colored VLAN fences (10, 20, 30), Frame tags (802.1Q/ISL), Access vs Trunk, DTP, VTP',
    smartCityMeaning: '“Separate neighborhoods on the same street.”',
    kenyanAnalogy: 'One school compound where Primary, Junior Secondary, and Staff wear Red, Blue, and Yellow uniform badges (VLAN tags)—sharing the main corridor (Trunk) while classrooms stay separate (Access Ports).',
    subtopics: ['Cisco 3-Layer, Collapsed-Core & Spine-Leaf', 'What is a VLAN & Frame Tagging', 'Access vs. Trunk Ports (802.1Q & ISL)', 'Voice VLAN & Allowed VLANs', 'DTP & VTP Modes (Server, Client, Transparent)']
  },
  {
    id: 16,
    title: 'Inter-VLAN Routing',
    shortTitle: 'Inter-VLAN Routing',
    status: 'preview',
    icon: '🚌',
    smartCityPicture: 'Shuttle bus between colored fences, Router-on-a-Stick striped pole (sub-interfaces), Layer-3 Switch SVI',
    smartCityMeaning: '“Special bus lets residents visit other colors.”',
    kenyanAnalogy: 'Official estate shuttle bus that checks your badge color and lets Red Court residents visit Blue Court via a multi-lane gate pole (Router-on-a-Stick) or internal express lift (Layer-3 Switch SVI).',
    subtopics: ['Inter-VLAN Routing Big Idea', 'Router-on-a-Stick (ROAS) & Sub-interfaces', 'Layer-3 Switch & SVIs (Switched Virtual Interfaces)']
  },
  {
    id: 17,
    title: 'DHCP (The Welcome Desk)',
    shortTitle: 'DHCP',
    status: 'preview',
    icon: '🪪',
    smartCityPicture: 'Welcome desk handing out IP badges, DORA 4 speech bubbles, DNS phone-book, Relay mail chute, APIPA sticky',
    smartCityMeaning: '“Gives visitors a temporary address automatically.”',
    kenyanAnalogy: 'Reception desk at a Nairobi office building handing out temporary visitor badges (DORA: "Badge please?" -> "Take #105" -> "I’ll take #105!" -> "Signed!"), plus the M-Pesa/Phonebook directory (DNS).',
    subtopics: ['DHCP Server & DORA Steps', 'DHCP & DNS Phone-Book', 'Router as DHCP Server & Client', 'DHCP Relay Agent (ip helper-address)', 'APIPA (169.254.x.x Do-It-Yourself Badge)']
  },
  {
    id: 18,
    title: 'HSRP (Twin Traffic Cops)',
    shortTitle: 'HSRP',
    status: 'preview',
    icon: '👮',
    smartCityPicture: 'Twin exit roads, Active Cop (red vest) & Standby Cop (white vest), Shared VIP phone number, Preempt alarm',
    smartCityMeaning: '“If one cop naps, the other keeps cars moving.”',
    kenyanAnalogy: 'Two traffic marshals at a busy roundabout sharing one emergency hotline number (VIP): Marshal A directs cars while Marshal B waits on standby ready to jump in within 1 second if Marshal A takes a break.',
    subtopics: ['Network Redundancy & FHRP Club (HSRP, VRRP, GLBP)', 'HSRP Active vs. Standby & Virtual IP (VIP)', 'HSRP Configuration & Preempt Alarm']
  },
  {
    id: 19,
    title: 'STP (One-Way Bridges)',
    shortTitle: 'STP',
    status: 'preview',
    icon: '🌉',
    smartCityPicture: 'Triangle loop with raised drawbridge, Crowned Root Switch, Root & Designated ports, RSTP lightning, PortFast & Guards',
    smartCityMeaning: '“Stops cars driving in circles forever.”',
    kenyanAnalogy: 'Three bridges forming a circle where vehicles would spin in endless traffic jams—so the Chief Marshal (Root Bridge) closes one barrier gate as a standby backup until another bridge breaks!',
    subtopics: ['What is STP & Why Loops Happen', 'Root Switch Election (Primary/Secondary)', 'Root Port & Designated Port', 'STP Modes (PVST+, RPVST+, MSTP) & RSTP', 'PortFast, BPDU Guard & Root Guard']
  },
  {
    id: 20,
    title: 'EtherChannel (Multi-Lane Boulevard)',
    shortTitle: 'EtherChannel',
    status: 'preview',
    icon: '🛣️',
    smartCityPicture: '4 lanes glued into 1 wide boulevard, PAgP (Cisco) vs LACP (Open) handshakes, MEC twin castles, Layer-3 EtherChannel',
    smartCityMeaning: '“Bundle lanes so more vans travel together.”',
    kenyanAnalogy: 'Upgrading a single-lane road into the 4-lane Thika Superhighway so four matatus drive side-by-side as one big highway without STP blocking any lane!',
    subtopics: ['Why EtherChannel?', 'PAgP (Desirable/Auto) vs. LACP (Active/Passive)', 'Multi-Chassis EtherChannel (MEC: vPC, StackWise, VSS)', 'Layer-3 EtherChannel']
  },
  {
    id: 21,
    title: 'Switch Security (Guard Dogs)',
    shortTitle: 'Switch Security',
    status: 'preview',
    icon: '🐶',
    smartCityPicture: 'DHCP Snooping dog, DAI magnifying glass, 802.1X turnstile keycard, Port Security guest list & Violation lights',
    smartCityMeaning: '“Only allowed vans enter this street.”',
    kenyanAnalogy: 'Askari & sniffer dog at the estate gate checking that visitor badges came from the real reception desk (DHCP Snooping), matching ID to number plate (DAI), and locking out uninvited cars (Port Security: Protect, Restrict, Shutdown).',
    subtopics: ['DHCP Snooping', 'Dynamic ARP Inspection (DAI)', '802.1X Authentication Turnstile', 'Port Security & Violation Modes (Protect, Restrict, Shutdown)']
  },
  {
    id: 22,
    title: 'ACLs (The Doorman With a Guest List)',
    shortTitle: 'ACLs',
    status: 'preview',
    icon: '🚪',
    smartCityPicture: 'Uniformed doorman at boom gate, Standard ACL short sheet (Who), Extended ACL thick book (Who/Where/Port), Named ACL',
    smartCityMeaning: '“Checks if a van’s badge is on the guest list.”',
    kenyanAnalogy: 'Security guard at a wedding or office gate with a printed clipboard: Standard List only checks which estate you came from; Extended List checks who you are, which office room you are visiting, and what package you carry!',
    subtopics: ['What are ACLs?', 'Standard ACL (Source IP Only)', 'Extended ACL (Source, Destination, Protocol, Port)', 'Named ACLs']
  },
  {
    id: 23,
    title: 'NAT (One Big Address, Many Mailboxes)',
    shortTitle: 'NAT',
    status: 'preview',
    icon: '🏢',
    smartCityPicture: 'Tall apartment building with green private mailboxes inside & one blue public street sign outside + PAT ticket machine',
    smartCityMeaning: '“Many flats share one big street address outside.”',
    kenyanAnalogy: 'A big Nairobi apartment block or P.O. Box where 50 families have private house numbers inside (Flat A1, A2), but all share one public Posta Box / main gate address outside, using extension slips (PAT ports) to sort replies.',
    subtopics: ['What is NAT?', 'Static NAT (1-to-1 Permanent)', 'Dynamic NAT (Pool of Public IPs)', 'PAT / NAT Overload (Port Ticket Dispenser)']
  },
  {
    id: 24,
    title: 'IPv6 & Routing (Futuristic District)',
    shortTitle: 'IPv6 & Routing',
    status: 'preview',
    icon: '🛸',
    smartCityPicture: 'Futuristic shiny towers, 8-hextet street signs, Global/ULA/Link-Local stickers, SLAAC robot, NDP waving towers',
    smartCityMeaning: '“Bigger house numbers, same road ideas.”',
    kenyanAnalogy: 'Upgrading from old 4-digit plot numbers that filled up to modern digital 8-block parcel codes—where smart towers automatically hand out addresses to new phones (SLAAC) and greet neighbors directly (NDP).',
    subtopics: ['What is IPv6 & 8-Box Format', 'Types of IPv6 Addresses (Global, Unique-Local, Link-Local, Multicast)', 'Prefixes (/64) & SLAAC Robot', 'IPv6 Static, Default (::/0) & Dynamic Routing (OSPFv3)', 'NDP (Neighbour Discovery Protocol)']
  },
  {
    id: 25,
    title: 'WAN (Airports & Trains to Other Cities)',
    shortTitle: 'WAN',
    status: 'preview',
    icon: '✈️',
    smartCityPicture: 'Airport & train station outside city wall, VPN secret locked tunnel, Satellite/5G/DSL/Fiber, Leased line, MPLS, PPPoE',
    smartCityMeaning: '“Long-distance links beyond city limits.”',
    kenyanAnalogy: 'Linking Nairobi to Mombasa, Kisumu, and Eldoret via JKIA flights, SGR trains, private express rails (Leased Line), fast color-coded cargo sorting (MPLS), and armored underground tunnels (VPN).',
    subtopics: ['Wide Area Network (WAN) & Topologies (Star, Ring, Mesh)', 'VPN Secret Locked Tunnel', 'WAN Connection Types (Fiber, DSL, 4G/5G, Satellite)', 'Leased Lines, MPLS & PPPoE']
  },
  {
    id: 26,
    title: 'Security Concepts (Police Stations & CCTV)',
    shortTitle: 'Security Concepts',
    status: 'preview',
    icon: '👮‍♀️',
    smartCityPicture: 'Police station, Cyber-threat icons, Brick firewall & Next-Gen magnifier, IDS camera bell vs IPS gate arm, Keys (Symmetric/Asymmetric)',
    smartCityMeaning: '“Protect houses, roads, and parcels from thieves.”',
    kenyanAnalogy: 'Estate police post, perimeter wall guard (Firewall), parcel scanner (NGFW), CCTV alarm bell (IDS) vs automatic spike barrier (IPS), and shared padlock key (Symmetric) vs M-Pesa public till & secret PIN (Asymmetric).',
    subtopics: ['Cyber-Threats & Attacks', 'Firewalls & Next-Gen Firewalls', 'IDS (Alarm Camera) vs. IPS (Automatic Gate Arm)', 'Symmetric vs. Asymmetric Encryption & HTTPS', 'Mitigation & Prevention Habits']
  },
  {
    id: 27,
    title: 'Device Security (Padlocks on Control Rooms)',
    shortTitle: 'Device Security',
    status: 'preview',
    icon: '🔒',
    smartCityPicture: 'Telnet mesh door vs SSH steel door, Console backdoor lock, exec-timeout clock, Privilege shelves (1/7/15), AAA cabinet, NTP dish',
    smartCityMeaning: '“Keep pranksters off the traffic-light controls.”',
    kenyanAnalogy: 'Locking the main power/water control room with a steel door (SSH instead of open-window Telnet), auto-locking idle doors (exec-timeout), 3 staff clearance shelves, Biometric check-in book (AAA), and KBC time sync (NTP).',
    subtopics: ['Telnet (Mesh Door) vs. SSH (Steel Door)', 'Console Security, exec-timeout & Encrypted Passwords', 'Privilege Levels (1, 7, 15) & Banners (MOTD)', 'AAA (Authentication, Authorization, Accounting) & RADIUS/TACACS+', 'Clock Sync & NTP']
  },
  {
    id: 28,
    title: 'Device Management (City-Hall Dashboard)',
    shortTitle: 'Device Management',
    status: 'preview',
    icon: '📡',
    smartCityPicture: 'Syslog radio tower & 3 inbox trays (Console, Buffered, Remote), logging synchronous pause, debug flashlight, SNMP dish & SNMPv3 lock',
    smartCityMeaning: '“Monitor roads, fix lights, plan upgrades.”',
    kenyanAnalogy: 'County Traffic Control Centre collecting incident occurrence-book notes (Syslog levels 0–7), pausing noisy radio chatter while typing (logging synchronous), and polling road sensors securely (SNMPv3).',
    subtopics: ['Syslog & Message Format', 'Logging Locations (Console, Buffered, Remote)', 'logging synchronous, debug & terminal monitor', 'SNMP & SNMPv3 Security']
  },
  {
    id: 29,
    title: 'Wireless (Courier Drones in the Air)',
    shortTitle: 'Wireless',
    status: 'preview',
    icon: '🚁',
    smartCityPicture: 'Rooftop helipads (APs), Autonomous vs Lightweight APs, City Hall WLC flight desk, 2.4 GHz turtle vs 5 GHz rabbit lanes, WPA2/WPA3 shields',
    smartCityMeaning: '“Deliver parcels without touching the road.”',
    kenyanAnalogy: 'Delivery drones flying from rooftop helipads (APs)—either self-managed at a small kiosk (Autonomous AP) or coordinated by one central JKIA control tower (WLC)—flying on long-range 2.4 GHz or fast 5 GHz air lanes with WPA3 shields.',
    subtopics: ['Wireless Network Types & AP Operation', 'Autonomous AP vs. Lightweight AP & WLC', 'WLC Deployment Models (Internal, Appliance, Cloud)', '2.4 GHz (Turtle) vs. 5 GHz (Rabbit) Air Lanes', 'Wi-Fi Security (WEP, WPA, WPA2, WPA3)']
  },
  {
    id: 30,
    title: 'Life of a Packet (DNS + ARP Scrapbook)',
    shortTitle: 'Life of a Packet',
    status: 'preview',
    icon: '📖',
    smartCityPicture: 'Traveller’s 7-step scrapbook: Ask DNS booth -> get IP card -> ARP megaphone -> get MAC plate -> ride switch, router & WAN',
    smartCityMeaning: '“Step-by-step: find the name (DNS), find the plate (ARP), ride the roads.”',
    kenyanAnalogy: 'Looking up a shop’s plot number in the directory (DNS), calling out at the gate to find which specific boda plate delivers there (ARP), jotting it in a pocket notebook (ARP Cache), and riding across town!',
    subtopics: ['Step 1-2: Ask DNS & Cache TTL', 'Step 3: no ip domain-lookup (Typo Helper)', 'Step 4-5: ARP Megaphone & ARP Table Notepad', 'Step 6-7: Ride Switch, Router & WAN']
  },
  {
    id: 31,
    title: 'Router & Switch Basics (IOS Blueprint)',
    shortTitle: 'Router & Switch Basics',
    status: 'preview',
    icon: '🛠️',
    smartCityPicture: 'Power lever ON, Engineer with IOS blueprint, Switch SVI IP, interface range paintbrush, Half vs Full duplex bridges, LLDP & CDP megaphones, Status lights',
    smartCityMeaning: '“Turn the power on, label doors, set speed—make all booths ready to work.”',
    kenyanAnalogy: 'Chief Engineer flipping the main switch, painting 12 gates at once (interface range), upgrading a one-way footbridge (Half-Duplex) to a two-way highway bridge (Full-Duplex), and booths introducing themselves via megaphone (CDP/LLDP).',
    subtopics: ['Power-on & IOS Basic Commands (enable, config t, show)', 'Configure IP on a Switch (SVI) & Interface Range Paintbrush', 'Half-Duplex vs. Full-Duplex & Speed Settings', 'LLDP (Universal) vs. CDP (Cisco) Megaphones', 'Interface Status Traffic-Lights (up/up, admin-down, err-disabled)']
  }
];
