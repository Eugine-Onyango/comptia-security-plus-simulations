// Data and structure for Wireshark Packet Odyssey (Sprint 0 through Sprint 5)

export const WIRESHARK_SPRINTS = [
  {
    id: 0,
    title: 'Sprint 0: The Prep & Safety Zone',
    subtitle: 'Workspace Setup & Pre-Flight Checks',
    badge: 'ACTIVE SPRINT',
    status: 'active',
    icon: 'ShieldCheck',
    description: 'Prepare an isolated sandbox folder and verify non-root packet capture privileges before touching live traffic.',
    subSprints: [
      {
        id: '0.1',
        title: 'Sub-Sprint 0.1: The Safe Corner',
        eli5: 'Setting up a private sandbox room so our packet experiments never touch or mess up your other files.',
        command: 'mkdir -p ~/secplus_wireshark && cd ~/secplus_wireshark && pwd',
        verification: 'Check that pwd outputs your new folder and ls confirms it is empty and isolated.'
      },
      {
        id: '0.2',
        title: 'Sub-Sprint 0.2: The X-Ray Inspector Setup',
        eli5: 'Checking if Wireshark / TShark is installed and ensuring you have packet-capturing powers without risking system crashes as root.',
        command: 'which tshark && tshark -v | head -n 1',
        verification: 'Verify TShark version and run a 1-second packet sniff check (tshark -c 1) without sudo.'
      },
      {
        id: '0.3',
        title: 'Sub-Sprint 0.3: Identifying the Hallway Door',
        eli5: 'Finding which network card (door) your VM uses to chat with the outside world (enp0s3, eth0, or Wi-Fi).',
        command: 'ip route show default || tshark -D',
        verification: 'Locate the interface connected to the default gateway (0.0.0.0/0).'
      }
    ]
  },
  {
    id: 1,
    title: 'Sprint 1: The X-Ray Glasses',
    subtitle: 'Packet Sniffing Basics & Filters',
    badge: 'ACTIVE SPRINT',
    status: 'active',
    icon: 'Glasses',
    description: 'Capture your first ping echo, master noise-canceling display filters (ip.addr, icmp, tcp), and inspect the 3-pane envelope layers.',
    subSprints: [
      {
        id: '1.1',
        title: 'Sub-Sprint 1.1: The First Live Sniff',
        eli5: 'Knocking on a neighbor\'s door (ping 8.8.8.8) and watching the echo come back with your X-ray glasses.',
        command: 'tshark -i any -c 4 icmp',
        verification: 'Locate your specific ICMP Echo Request (Type 8) and Echo Reply (Type 0).'
      },
      {
        id: '1.2',
        title: 'Sub-Sprint 1.2: Display Filters (Noise Earmuffs)',
        eli5: 'Telling your eyes to ONLY spotlight blue envelopes and ignore background network chatter.',
        command: 'tshark -r capture.pcap -Y "ip.addr == 8.8.8.8"',
        verification: 'Apply display filters to isolate matching protocol rows.'
      },
      {
        id: '1.3',
        title: 'Sub-Sprint 1.3: Inspecting Envelope Layers (3-Pane X-Ray)',
        eli5: 'Unpeeling the Russian nesting doll layer by layer: Frame paper, IP address, and delivery payload.',
        command: 'tshark -r capture.pcap -V -c 1',
        verification: 'Pinpoint Source IP, Destination IP, and MAC addresses in the details tree.'
      }
    ]
  },
  {
    id: 2,
    title: 'Sprint 2: Plaintext vs. Encrypted Traffic',
    subtitle: 'Clear Letters vs. Locked Armor Boxes',
    badge: 'ACTIVE SPRINT',
    status: 'active',
    icon: 'Lock',
    description: 'Use "Follow TCP Stream" to catch unencrypted passwords in HTTP/FTP/Telnet, and compare with scrambled HTTPS/TLS payloads.',
    subSprints: [
      {
        id: '2.1',
        title: 'Sub-Sprint 2.1: The Leaky Postcard (Plaintext Exposure)',
        eli5: 'Catching an unencrypted password sent on an open postcard using Wireshark\'s "Follow TCP Stream".',
        command: 'curl -d "user=admin&pass=Spring2026!" http://httpbin.org/post',
        verification: 'Extract the cleartext username and password from the TCP stream in plain English.'
      },
      {
        id: '2.2',
        title: 'Sub-Sprint 2.2: The Locked Armor Box (HTTPS / TLS)',
        eli5: 'Watching the same X-ray glasses bounce off an armored titanium lockbox, seeing only cipher noise.',
        command: 'curl https://cloudflare.com && tshark -i any -c 4 tls',
        verification: 'Confirm TLS Application Data payload appears completely scrambled and unreadable.'
      }
    ]
  },
  {
    id: 3,
    title: 'Sprint 3: Handshakes & Footprints',
    subtitle: 'TCP Flags & Port Scans',
    badge: 'ACTIVE SPRINT',
    status: 'active',
    icon: 'Handshake',
    description: 'Isolate the 3-way handshake (SYN, SYN-ACK, ACK) and catch stealth port scanners rattling all your doors with reset flags.',
    subSprints: [
      {
        id: '3.1',
        title: 'Sub-Sprint 3.1: The 3-Way Handshake (Politeness Protocol)',
        eli5: 'Saying hello, getting acknowledged, and confirming connection before sending any data.',
        command: 'tshark -i any -c 3 "tcp.flags.syn==1 or (tcp.flags.syn==1 and tcp.flags.ack==1)"',
        verification: 'Isolate the SYN, SYN-ACK, and ACK packets establishing a session.'
      },
      {
        id: '3.2',
        title: 'Sub-Sprint 3.2: Catching the Door-Rattler (SYN Stealth Scan)',
        eli5: 'Spotting an attacker knocking on every door (ports 21, 22, 80, 445) and running away before answering.',
        command: 'tshark -i any -Y "tcp.flags.reset == 1"',
        verification: 'Detect port scan signatures by filtering for RST-ACK and half-open resets.'
      }
    ]
  },
  {
    id: 4,
    title: 'Sprint 4: Catching Attackers',
    subtitle: 'Security+ Attack Pattern Analysis',
    badge: 'ACTIVE SPRINT',
    status: 'active',
    icon: 'ShieldAlert',
    description: 'Spot classic CompTIA attacks: ARP Poisoning (duplicate MACs), DoS Floods (traffic spikes in I/O graph), and DNS Poisoning.',
    subSprints: [
      {
        id: '4.1',
        title: 'Sub-Sprint 4.1: The Identity Thief (ARP Poisoning / MITM)',
        eli5: 'Catching an attacker pretending to be the router by yelling fake MAC address updates.',
        command: 'tshark -i any -Y "arp.duplicate-address-detected or arp.opcode == 2"',
        verification: 'Spot duplicate IP-to-MAC mappings and unauthorized gratuitous ARP replies.'
      },
      {
        id: '4.2',
        title: 'Sub-Sprint 4.2: The Tsunami on the Wire (DoS / SYN Flood)',
        eli5: 'Visualizing an avalanche of 10,000 half-open knocks crashing a server using Wireshark\'s I/O Graph.',
        command: 'tshark -i any -q -z io,stat,1,"COUNT(tcp.flags.syn==1 and tcp.flags.ack==0)"',
        verification: 'Detect traffic volume spikes and socket table exhaustion.'
      },
      {
        id: '4.3',
        title: 'Sub-Sprint 4.3: The Fake GPS (DNS Poisoning / Spoofing)',
        eli5: 'Catching forged DNS answers redirecting users to a phishing clone before the real nameserver can reply.',
        command: 'tshark -i any -Y "dns.flags.response == 1 and dns.flags.rcode == 0"',
        verification: 'Identify mismatched transaction IDs and malicious A record IP redirects.'
      }
    ]
  },
  {
    id: 5,
    title: 'Sprint 5: Capstone Challenge',
    subtitle: 'Mystery Incident PCAP Triage',
    badge: 'ACTIVE SPRINT',
    status: 'active',
    icon: 'Trophy',
    description: 'Investigate a multi-stage attack PCAP, extract attacker IP & malicious payload, and submit your incident triage report.',
    subSprints: [
      {
        id: '5.1',
        title: 'Sub-Sprint 5.1: Incident PCAP Deep Triage',
        eli5: 'Acting as a network detective to unmask who attacked, which door they rattled, and what data they stole.',
        command: 'tshark -r incident_alpha.pcap -q -z io,stat,1',
        verification: 'Complete the 4-part Incident Response forensic triage report.'
      }
    ]
  }
];

// Sprint 0 detailed interactive simulator data
export const SPRINT_0_STAGES = {
  safeCorner: {
    id: '0.1',
    title: 'Sub-Sprint 0.1: The Safe Corner (Isolated Sandbox)',
    concept: 'Isolated Workspace Principle',
    eli5Summary: 'Imagine running an experiment in your house. You do not mix chemicals on the family dining table where tea is served; you work on a dedicated plastic tray in the backyard. In your Linux house, `~/secplus_wireshark` is that tray! No matter what packets we dissect, your main system remains clean.',
    kenyanMetaphor: 'Setting up a separate kibanda workbench outside your living room so that testing messy wiring never trips the main KPLC power switch for the whole family.',
    whyCompTia: 'CompTIA Security+ emphasizes operational isolation and change control. Packet captures can grow to gigabytes; keeping them in an isolated folder protects system partitions from running out of disk space.',
    commands: [
      {
        step: 1,
        desc: 'Create and enter the dedicated sandbox folder',
        cmd: 'mkdir -p ~/secplus_wireshark && cd ~/secplus_wireshark'
      },
      {
        step: 2,
        desc: 'Verify current location and directory isolation',
        cmd: 'pwd && ls -la'
      }
    ],
    simulatedFiles: [
      { name: '. (current folder)', type: 'dir', size: '4096 B', desc: 'Your new clean sandbox' },
      { name: '.. (parent folder)', type: 'dir', size: '4096 B', desc: 'Your safe home directory (~)' }
    ]
  },
  inspectorSetup: {
    id: '0.2',
    title: 'Sub-Sprint 0.2: The X-Ray Inspector Setup (Privilege Hardening)',
    concept: 'Principle of Least Privilege (PoLP)',
    eli5Summary: 'Running packet captures as the "root" superuser is like giving your master bedroom keys, title deed, and M-Pesa PIN to the estate gate watchman just so he can open the barrier for visitors! If a bug exists in Wireshark, a single malicious packet takes over your whole machine. Instead, we only give your user non-root capture permissions (`dumpcap`).',
    kenyanMetaphor: 'Giving the watchman at the estate gate only the padlock key for the barrier, NEVER the keys to your house and safe.',
    whyCompTia: 'CompTIA Security+ Domain 1 & 4 heavily tests Least Privilege. Dissecting network packets requires raw socket access, but Wireshark contains over 2 million lines of dissector code. Running it as root violates defense-in-depth.',
    rootVsNonRoot: [
      {
        mode: 'Running as root (sudo wireshark)',
        risk: 'HIGH RISK ⚠️',
        verdict: 'Dangerous! If an attacker sends a malformed packet exploiting a Wireshark buffer overflow, they gain root system execution.',
        isRecommended: false
      },
      {
        mode: 'Non-root capture group (wireshark group + dumpcap capabilities)',
        risk: 'SECURE & HARDENED 🛡️',
        verdict: 'Safe! Only the tiny helper `dumpcap` has Linux capabilities (`cap_net_raw,cap_net_admin`), while the Wireshark UI runs as a standard unprivileged user.',
        isRecommended: true
      }
    ],
    setupCommands: [
      {
        step: 1,
        desc: 'Install Wireshark & TShark non-interactively',
        cmd: 'sudo apt update && sudo apt install -y tshark wireshark'
      },
      {
        step: 2,
        desc: 'Enable non-superuser packet capturing',
        cmd: 'sudo dpkg-reconfigure wireshark-common\n# Select <YES> when prompted to allow non-superusers'
      },
      {
        step: 3,
        desc: 'Add your current user to the wireshark group',
        cmd: 'sudo usermod -aG wireshark $USER && newgrp wireshark'
      },
      {
        step: 4,
        desc: 'Pre-flight check: capture 1 test packet without sudo',
        cmd: 'tshark -c 1'
      }
    ]
  },
  hallwayDoor: {
    id: '0.3',
    title: 'Sub-Sprint 0.3: Identifying the Hallway Door (Active Interface)',
    concept: 'Network Interface Architecture & Default Route',
    eli5Summary: 'Your computer has multiple "doors": the Mirror Door (`lo` loopback talking only to yourself in the bedroom), Internal Virtual Doors (`docker0`), and the Hallway Door (`eth0` or `enp0s3`) leading out to the main highway. You must aim your sniffing glasses at the highway door!',
    kenyanMetaphor: '`lo` (Loopback) is talking to yourself in your bedroom mirror. `eth0` is the main estate barrier leading out to Mombasa Road / Thika Superhighway. If you sniff `lo`, you will never see traffic on the highway!',
    whyCompTia: 'CompTIA questions frequently test interface selection in packet analysis. Sniffing the loopback interface (`lo`) will miss all external network traffic, while sniffing the wrong virtual adapter yields dead silence.',
    interfaces: [
      {
        name: 'lo (Loopback)',
        ip: '127.0.0.1',
        type: 'Internal Self-Talk (Bedroom Mirror)',
        status: 'Quiet (Internal only)',
        isInternetFacing: false,
        explanation: 'Local loopback. Traffic here never leaves your computer.'
      },
      {
        name: 'enp0s3 / eth0',
        ip: '192.168.1.105',
        type: 'Active Ethernet / NAT (Main Estate Gate)',
        status: 'Active Live Traffic 🟢',
        isInternetFacing: true,
        gateway: '192.168.1.1',
        explanation: 'The main hallway door! Connected to your default gateway router and carries all internet packets.'
      },
      {
        name: 'docker0',
        ip: '172.17.0.1',
        type: 'Virtual Bridge (Internal Compound)',
        status: 'Container Only',
        isInternetFacing: false,
        explanation: 'Virtual bridge for Docker containers. Silent unless running container workloads.'
      }
    ],
    detectCommands: [
      {
        step: 1,
        desc: 'Find the default route interface to the internet',
        cmd: 'ip route show default'
      },
      {
        step: 2,
        desc: 'List all interfaces recognized by TShark / Wireshark',
        cmd: 'tshark -D'
      }
    ]
  }
};

// Sprint 1 detailed interactive simulator data
export const SPRINT_1_STAGES = {
  firstSniff: {
    id: '1.1',
    title: 'Sub-Sprint 1.1: The First Live Sniff (Knock & Echo)',
    concept: 'ICMP Echo Handshake (Type 8 Request & Type 0 Reply)',
    eli5Summary: 'Imagine throwing a bouncy tennis ball at your neighbor\'s garage door (`8.8.8.8`). If the neighbor is home, the ball bounces straight back into your hands. In networking, that ball is an ICMP Ping! You send an Echo Request (Type 8), and they catch it and throw back an Echo Reply (Type 0).',
    kenyanMetaphor: 'Calling your buddy over the estate fence: *"Hae Omondi, uko ndani?"* (Type 8 Request). Omondi yells right back: *"Niko ndani, sema!"* (Type 0 Reply). If the gate has no power or Omondi turns his phone on silent (firewall drops ICMP), you get 100% packet loss timeout.',
    whyCompTia: 'CompTIA Security+ Domain 4.3 specifically tests network troubleshooting with `ping` and identifying ICMP types. Firewalls frequently drop ICMP Type 8 to make servers appear "invisible" or protect against ICMP Floods.',
    commands: [
      {
        step: 1,
        desc: 'Start capturing ICMP packets in your sandbox folder',
        cmd: 'cd ~/secplus_wireshark && tshark -i any -c 4 icmp'
      },
      {
        step: 2,
        desc: 'In a second terminal window, send 2 ping probes',
        cmd: 'ping -c 2 8.8.8.8'
      }
    ],
    samplePackets: [
      {
        num: 1,
        time: '0.000000',
        src: '192.168.1.105',
        dst: '8.8.8.8',
        proto: 'ICMP',
        len: 98,
        info: 'Echo (ping) request  id=0x1234, seq=1/256, ttl=64',
        type: 8,
        typeLabel: 'Type 8: Echo Request 🚪➡️',
        explanation: 'Your VM knocked on Google\'s DNS door asking: "Are you alive?"'
      },
      {
        num: 2,
        time: '0.014250',
        src: '8.8.8.8',
        dst: '192.168.1.105',
        proto: 'ICMP',
        len: 98,
        info: 'Echo (ping) reply    id=0x1234, seq=1/256, ttl=118',
        type: 0,
        typeLabel: 'Type 0: Echo Reply ⬅️🚪',
        explanation: 'Google\'s server answered back: "Yes, I hear you! Here is your ball."'
      },
      {
        num: 3,
        time: '1.001120',
        src: '192.168.1.105',
        dst: '8.8.8.8',
        proto: 'ICMP',
        len: 98,
        info: 'Echo (ping) request  id=0x1234, seq=2/512, ttl=64',
        type: 8,
        typeLabel: 'Type 8: Echo Request 🚪➡️',
        explanation: 'Second ping probe sent to calculate average network latency.'
      },
      {
        num: 4,
        time: '1.015380',
        src: '8.8.8.8',
        dst: '192.168.1.105',
        proto: 'ICMP',
        len: 98,
        info: 'Echo (ping) reply    id=0x1234, seq=2/512, ttl=118',
        type: 0,
        typeLabel: 'Type 0: Echo Reply ⬅️🚪',
        explanation: 'Second ping reply arrived back safely in 14.2ms.'
      }
    ]
  },
  displayFilters: {
    id: '1.2',
    title: 'Sub-Sprint 1.2: Display Filters (The Noise-Canceling Earmuffs)',
    concept: 'Display Filters vs. Capture Filters (BPF)',
    eli5Summary: 'A busy network wire is like a noisy downtown street at rush hour—hundreds of strangers talking at once. Display filters act as noise-canceling earmuffs: they mute the junk so you only hear the conversation you care about!',
    kenyanMetaphor: 'Walking through Gikomba market or a loud Matatu terminus like Odeon: Makangas shouting *"Tao! Tao! 50 bob!"*, street preachers, and loud boda-boda horns. A display filter is putting on AirPods with Noise Cancellation tuned strictly to your friend\'s voice (`ip.addr == 8.8.8.8`), so all the market noise fades away.',
    whyCompTia: 'CompTIA Security+ requires you to know the difference: CAPTURE FILTERS (BPF syntax like `host 8.8.8.8`) drop packets at the NIC driver level to save disk space. DISPLAY FILTERS (Wireshark syntax like `ip.addr == 8.8.8.8`) are applied AFTER capture in the UI.',
    filterPresets: [
      { id: 'all', label: 'Show All (No Filter)', syntax: '', color: 'slate', desc: 'Raw unfiltered wire chatter' },
      { id: 'icmp', label: 'Only ICMP (Pings)', syntax: 'icmp', color: 'emerald', desc: 'Filters out everything except ping echo requests & replies' },
      { id: 'ip_google', label: 'Google Traffic', syntax: 'ip.addr == 8.8.8.8', color: 'indigo', desc: 'Isolates packets going to or coming from 8.8.8.8' },
      { id: 'tcp', label: 'Only TCP', syntax: 'tcp', color: 'teal', desc: 'Shows reliable stream-oriented connection traffic' },
      { id: 'no_arp', label: 'Mute ARP Noise', syntax: '!arp', color: 'amber', desc: 'Hides local broadcast "Who has IP?" address resolution spam' }
    ],
    mixedTrafficPool: [
      { id: 1, time: '0.001', src: '192.168.1.1', dst: 'Broadcast', proto: 'ARP', info: 'Who has 192.168.1.105? Tell 192.168.1.1', matchTags: ['all'] },
      { id: 2, time: '0.004', src: '192.168.1.105', dst: '8.8.8.8', proto: 'ICMP', info: 'Echo (ping) request id=0x1234 seq=1', matchTags: ['all', 'icmp', 'ip_google', 'no_arp'] },
      { id: 3, time: '0.018', src: '8.8.8.8', dst: '192.168.1.105', proto: 'ICMP', info: 'Echo (ping) reply id=0x1234 seq=1', matchTags: ['all', 'icmp', 'ip_google', 'no_arp'] },
      { id: 4, time: '0.025', src: '192.168.1.105', dst: '1.1.1.1', proto: 'DNS', info: 'Standard query A comptia.org', matchTags: ['all', 'no_arp'] },
      { id: 5, time: '0.031', src: '192.168.1.105', dst: '142.250.180.206', proto: 'TCP', info: '52341 → 443 [SYN] Seq=0 Win=64240', matchTags: ['all', 'tcp', 'no_arp'] },
      { id: 6, time: '0.038', src: '192.168.1.50', dst: '239.255.255.250', proto: 'SSDP', info: 'M-SEARCH * HTTP/1.1 (Smart TV Beacon)', matchTags: ['all', 'no_arp'] },
      { id: 7, time: '0.042', src: '142.250.180.206', dst: '192.168.1.105', proto: 'TCP', info: '443 → 52341 [SYN, ACK] Seq=0 Ack=1', matchTags: ['all', 'tcp', 'no_arp'] },
      { id: 8, time: '1.002', src: '192.168.1.105', dst: '8.8.8.8', proto: 'ICMP', info: 'Echo (ping) request id=0x1234 seq=2', matchTags: ['all', 'icmp', 'ip_google', 'no_arp'] }
    ]
  },
  envelopeLayers: {
    id: '1.3',
    title: 'Sub-Sprint 1.3: Inspecting Envelope Layers (The 3-Pane X-Ray)',
    concept: 'Data Encapsulation & The 3-Pane Wireshark Window',
    eli5Summary: 'A packet is a set of nesting boxes. The outside box is the Ethernet Frame (the delivery van). Inside that is the IP Envelope with the sender and recipient home address. Inside that is the Transport label. Inside that is the letter itself (Payload)!',
    kenyanMetaphor: 'Sending a parcel via Easy Coach or G4S courier from Nairobi to Kisumu: The big green bus is the Ethernet Frame (L2). The addressed parcel box is the IP Packet (L3). The receipt ticket is the TCP Transport header (L4). The actual shoes or letters inside the box is the Data Payload (L7).',
    whyCompTia: 'CompTIA tests data encapsulation: Application (Data) ➡️ Transport (Segment) ➡️ Network (Packet) ➡️ Data Link (Frame) ➡️ Physical (Bits). Wireshark displays these exact OSI layers in its 3-pane architecture.',
    threePanes: [
      {
        pane: 1,
        title: 'Top Pane: Packet List',
        desc: 'High-level chronological summary table. Shows packet number, time offset, source IP, destination IP, protocol, length, and summary info.'
      },
      {
        pane: 2,
        title: 'Middle Pane: Packet Details',
        desc: 'Collapsible protocol tree. Unfolds each header slice (Frame ➡️ Ethernet II ➡️ IPv4 ➡️ Protocol Header).'
      },
      {
        pane: 3,
        title: 'Bottom Pane: Packet Bytes',
        desc: 'Raw hexadecimal and ASCII dump. The actual physical bytes traveling on the wire.'
      }
    ],
    layers: [
      {
        layer: 2,
        name: 'Layer 2: Ethernet II (The Delivery Van)',
        badge: 'Physical Frame',
        color: 'sky',
        fields: [
          { key: 'Destination MAC', val: '00:50:56:fd:e1:22 (Default Gateway Router)' },
          { key: 'Source MAC', val: '00:0c:29:1a:2b:3c (Your VM Network Card)' },
          { key: 'Type', val: 'IPv4 (0x0800)' }
        ],
        eli5: 'Hardware addresses that change hop-by-hop as the packet jumps from switch to router.'
      },
      {
        layer: 3,
        name: 'Layer 3: IPv4 (The Mailing Envelope)',
        badge: 'Network Packet',
        color: 'indigo',
        fields: [
          { key: 'Source IP', val: '192.168.1.105 (Your Local Address)' },
          { key: 'Destination IP', val: '8.8.8.8 (Google Public DNS)' },
          { key: 'Time to Live (TTL)', val: '64 hops (Prevents packets looping forever)' },
          { key: 'Protocol', val: 'ICMP (1)' }
        ],
        eli5: 'Logical addresses that stay the same all the way from origin to destination across the global Internet.'
      },
      {
        layer: 4,
        name: 'Layer 4: ICMP / Transport (The Delivery Style)',
        badge: 'Transport / Control',
        color: 'emerald',
        fields: [
          { key: 'Type', val: '8 (Echo Ping Request)' },
          { key: 'Code', val: '0' },
          { key: 'Identifier (BE)', val: '0x1234' },
          { key: 'Sequence Number (BE)', val: '1' }
        ],
        eli5: 'Tells the recipient host what to do with the envelope upon arrival.'
      },
      {
        layer: 7,
        name: 'Payload: Data (The Letter Inside)',
        badge: 'Application Data',
        color: 'purple',
        fields: [
          { key: 'Data Length', val: '56 bytes' },
          { key: 'ASCII String', val: 'abcdefghijklmnopqrstuvwabcdefghi...' },
          { key: 'Hex Dump Preview', val: '61 62 63 64 65 66 67 68 69 6a 6b 6c 6d 6e 6f 70' }
        ],
        eli5: 'The actual message content carried inside the envelope.'
      }
    ]
  }
};

// Sprint 2 detailed interactive simulator data
export const SPRINT_2_STAGES = {
  leakyPostcard: {
    id: '2.1',
    title: 'Sub-Sprint 2.1: The Leaky Postcard (Plaintext Exposure)',
    concept: 'Cleartext Protocol Vulnerabilities & "Follow TCP Stream"',
    eli5Summary: 'Using HTTP, Telnet, or FTP is like mailing your banking PIN on an open transparent postcard. Any mail sorter, ISP, barista at the coffee shop, or rogue sniffer along the road can look at the card and read your password in plain English!',
    kenyanMetaphor: 'Writing your secret M-Pesa PIN and ID number with a marker pen on a clear see-through polythene envelope, and handing it to a random Boda-Boda rider to deliver across town. Anyone at the stage, petrol station, or traffic jam can read your PIN without opening anything!',
    whyCompTia: 'CompTIA Security+ Domain 1 & 2 heavily emphasize replacing unencrypted legacy protocols. Questions frequently present a snippet of a Wireshark capture showing `username=` and `password=` and ask which security principle was violated (Confidentiality) and which secure protocol should be implemented.',
    sampleStream: {
      client: [
        'POST /login.php HTTP/1.1',
        'Host: intranet.corporate-bank.local',
        'User-Agent: Mozilla/5.0 (X11; Linux x86_64)',
        'Content-Type: application/x-www-form-urlencoded',
        'Content-Length: 47',
        'Connection: keep-alive',
        '',
        'username=admin&password=Spring2026!&auth_token=9941'
      ],
      server: [
        'HTTP/1.1 200 OK',
        'Date: Sat, 12 Sep 2026 14:10:00 GMT',
        'Server: Apache/2.4.41 (Ubuntu)',
        'Set-Cookie: session_id=abc987654321; path=/; HttpOnly',
        'Content-Type: application/json',
        'Content-Length: 53',
        '',
        '{"status":"success","message":"Welcome back, Administrator!"}'
      ]
    },
    exposedCredentials: {
      username: 'admin',
      password: 'Spring2026!',
      sessionCookie: 'session_id=abc987654321'
    },
    commands: [
      {
        step: 1,
        desc: 'Send an unencrypted POST request with credentials to test',
        cmd: 'curl -X POST -d "user=admin&pass=Spring2026!" http://httpbin.org/post'
      },
      {
        step: 2,
        desc: 'Extract cleartext POST bodies using TShark fields',
        cmd: 'tshark -r capture.pcap -Y "http.request.method == POST" -T fields -e text-lines'
      }
    ]
  },
  lockedBox: {
    id: '2.2',
    title: 'Sub-Sprint 2.2: The Locked Armor Box (HTTPS & TLS 1.3)',
    concept: 'End-to-End Encryption & Ciphertext Confidentiality',
    eli5Summary: 'With HTTPS and TLS 1.3, that clear postcard is locked inside a titanium armor box with a 256-bit cryptographic lock. Anyone looking at the wire with X-ray glasses can see the box moving, the source IP, and the destination IP, but opening it requires a mathematical key they do NOT have. All they see is scrambled gibberish!',
    kenyanMetaphor: 'Locking your cash in a heavy G4S armored van on Mombasa Road with two armed security escorts and digital biometric keys (TLS 1.3). Even if someone points high-power binoculars at the van, all they see is impenetrable steel armor—not a single shilling or note is visible!',
    whyCompTia: 'CompTIA tests TLS 1.3 features: Mandatory Perfect Forward Secrecy (PFS), elimination of weak ciphers (RC4, DES, 3DES), and faster handshakes. It upholds the CONFIDENTIALITY pillar of the CIA Triad.',
    handshakeStages: [
      { stage: 1, name: 'Client Hello', role: 'Client asks server: "Let\'s speak TLS 1.3, here are my supported cipher suites."' },
      { stage: 2, name: 'Server Hello & Certificate', role: 'Server presents its verified digital certificate and public key.' },
      { stage: 3, name: 'Key Exchange & Derivation', role: 'Both sides compute a shared session key using Diffie-Hellman (PFS).' },
      { stage: 4, name: 'Encrypted Application Data', role: 'From this point forward, every single byte (passwords, URLs, cookies) is encrypted cipher noise.' }
    ],
    sampleCipherBytes: [
      'f8 a1 3e 99 bc 04 88 12 e4 a0 b3 8c 9f 11 20 5e',
      '7d 44 9a b1 03 ff c2 87 61 30 19 ed 55 2b 88 fa',
      'c9 10 e7 22 51 b9 34 d0 aa 42 18 fe 99 07 63 12'
    ],
    commands: [
      {
        step: 1,
        desc: 'Perform an encrypted HTTPS exchange',
        cmd: 'curl https://cloudflare.com -o /dev/null'
      },
      {
        step: 2,
        desc: 'Inspect TLS handshake packets without root',
        cmd: 'tshark -i any -c 6 tls'
      }
    ]
  },
  protocolUpgrades: [
    {
      insecureName: 'HTTP',
      insecurePort: 'TCP 80',
      risk: 'Passes passwords, session cookies, and HTML in plaintext.',
      secureName: 'HTTPS',
      securePort: 'TCP 443',
      defense: 'Encrypts session via TLS 1.3 with public key certificates.'
    },
    {
      insecureName: 'Telnet',
      insecurePort: 'TCP 23',
      risk: 'Terminal CLI commands and passwords sent unencrypted on wire.',
      secureName: 'SSH',
      securePort: 'TCP 22',
      defense: 'Asymmetric host authentication & encrypted shell tunnel.'
    },
    {
      insecureName: 'FTP',
      insecurePort: 'TCP 20/21',
      risk: 'USER and PASS commands transmitted in clear text.',
      secureName: 'SFTP (or FTPS)',
      securePort: 'TCP 22 (or 989/990)',
      defense: 'Transfers files inside an encrypted SSH tunnel.'
    },
    {
      insecureName: 'SNMPv1 / SNMPv2c',
      insecurePort: 'UDP 161',
      risk: 'Community strings ("public"/"private") sent in plaintext.',
      secureName: 'SNMPv3',
      securePort: 'UDP 161',
      defense: 'Adds User-based Security Model (USM) with AES encryption & SHA hashing.'
    },
    {
      insecureName: 'LDAP',
      insecurePort: 'TCP 389',
      risk: 'Directory queries and domain user binds sent unencrypted.',
      secureName: 'LDAPS',
      securePort: 'TCP 636',
      defense: 'Enforces TLS encapsulation for Active Directory lookups.'
    }
  ]
};

// Sprint 3 detailed interactive simulator data
export const SPRINT_3_STAGES = {
  handshake: {
    id: '3.1',
    title: 'Sub-Sprint 3.1: The 3-Way Handshake (Politeness Protocol)',
    concept: 'TCP State Machine & Control Flags (SYN ➡️ SYN-ACK ➡️ ACK)',
    eli5Summary: 'Imagine making a phone call: 1. You dial and say "Hello? Can you hear me?" (SYN). 2. The other person says "Yes, I hear you! Can you hear me?" (SYN-ACK). 3. You say "Great, I hear you too, let\'s talk!" (ACK). Until that 3rd step finishes, neither side sends actual conversation data!',
    kenyanMetaphor: 'The Matatu Boarding Protocol: 1. You flag down the Nganya at the stage: "Bado kuna kiti?" (SYN). 2. The Makanga bangs the roof and leans out: "Panda, kiti mbili ziko!" (SYN-ACK). 3. You step onto the footboard and say "Sawa!" (ACK). Once both agree, the journey begins!',
    whyCompTia: 'CompTIA Security+ Domain 4.3 heavily tests TCP connection states (SYN_SENT, ESTABLISHED, TIME_WAIT). Recognizing the 3-way handshake in a packet capture proves a connection was actually established vs. scanned or rejected.',
    steps: [
      {
        step: 1,
        name: 'Step 1: SYN (Synchronize Sequence Numbers)',
        sender: 'Client (192.168.1.105)',
        receiver: 'Server (93.184.216.34)',
        port: '54322 ➡️ 80',
        flags: 'SYN [0x002]',
        seq: 'Seq=0 (Relative ISN)',
        ack: 'Ack=0',
        eli5Meaning: '"Hey web server! I want to open a connection. Let\'s sync up at Sequence 0!"',
        filterSyntax: 'tcp.flags.syn == 1 && tcp.flags.ack == 0'
      },
      {
        step: 2,
        name: 'Step 2: SYN-ACK (Synchronize + Acknowledge)',
        sender: 'Server (93.184.216.34)',
        receiver: 'Client (192.168.1.105)',
        port: '80 ➡️ 54322',
        flags: 'SYN, ACK [0x012]',
        seq: 'Seq=0 (Server ISN)',
        ack: 'Ack=1 (Client Seq + 1)',
        eli5Meaning: '"Got your knock (Ack=1)! I agree to talk. Sync with my Sequence 0 too!"',
        filterSyntax: 'tcp.flags.syn == 1 && tcp.flags.ack == 1'
      },
      {
        step: 3,
        name: 'Step 3: ACK (Acknowledge Established)',
        sender: 'Client (192.168.1.105)',
        receiver: 'Server (93.184.216.34)',
        port: '54322 ➡️ 80',
        flags: 'ACK [0x010]',
        seq: 'Seq=1',
        ack: 'Ack=1',
        eli5Meaning: '"Confirmed! Connection is now ESTABLISHED. Ready for HTTP request data!"',
        filterSyntax: 'tcp.flags.syn == 0 && tcp.flags.ack == 1'
      }
    ],
    flagsDissector: [
      {
        flag: 'SYN (Synchronize)',
        bit: '0x002',
        purpose: 'Initiates a new connection and synchronizes initial sequence numbers (ISN).',
        securityMeaning: 'Excessive SYN packets without ACKs indicates a SYN Flood DoS attack.'
      },
      {
        flag: 'ACK (Acknowledge)',
        bit: '0x010',
        purpose: 'Confirms receipt of previous data or handshake steps. Validates acknowledgment field.',
        securityMeaning: 'Present on almost all established packets after the initial SYN knock.'
      },
      {
        flag: 'RST (Reset)',
        bit: '0x004',
        purpose: 'Immediately tears down an invalid connection or rejects an unauthorized port knock.',
        securityMeaning: 'High RST frequency indicates a port scanner hitting closed ports or an IDS killing sessions.'
      },
      {
        flag: 'FIN (Finish)',
        bit: '0x001',
        purpose: 'Gracefully terminates a connection when sender has no more data to transmit.',
        securityMeaning: 'Normal connection closing (unlike an abrupt RST abort).'
      },
      {
        flag: 'PSH (Push)',
        bit: '0x008',
        purpose: 'Instructs the recipient socket buffer to push data immediately to the application.',
        securityMeaning: 'Used in interactive protocols (like SSH or HTTP request submission).'
      },
      {
        flag: 'URG (Urgent)',
        bit: '0x020',
        purpose: 'Indicates the urgent pointer field is valid, prioritizing urgent out-of-band data.',
        securityMeaning: 'Rarely used legitimately; often tweaked in Xmas Tree scans (FIN+PSH+URG).'
      }
    ],
    commands: [
      {
        step: 1,
        desc: 'Start capturing TCP handshake flags on any interface',
        cmd: 'tshark -i any -c 3 "tcp.flags.syn==1 or (tcp.flags.syn==1 and tcp.flags.ack==1)"'
      },
      {
        step: 2,
        desc: 'Trigger a clean HTTP 3-way handshake in another terminal',
        cmd: 'curl -I http://example.com'
      }
    ]
  },
  stealthScan: {
    id: '3.2',
    title: 'Sub-Sprint 3.2: Catching the Door-Rattler (SYN Stealth Port Scan)',
    concept: 'Port Footprinting & Half-Open SYN Scans (`nmap -sS`)',
    eli5Summary: 'Imagine a burglar walking down a hotel hallway rattling doorknobs. If a door is locked (closed port), it rattles with a hard clack (RST-ACK). If a door is unlocked (open port), someone answers "Hello?" (SYN-ACK)—but the burglar immediately sprints away without entering (sending RST). That is the Half-Open SYN Scan!',
    kenyanMetaphor: 'A mischievous tout running down a row of parked matatus at Machakos Country Bus, banging on every single window: "Kuna kiti?". As soon as the driver opens the door (SYN-ACK), the tout sprints away laughing without boarding or paying (RST)! He was only scouting out which vehicles had seats.',
    whyCompTia: 'CompTIA Security+ Domain 2.2 and 4.2 tests distinguishing Full Connect scans (`-sT`) from SYN Stealth scans (`-sS`). Stealth scans send RST after receiving SYN-ACK, preventing the target application from logging a completed connection.',
    probedPorts: [
      {
        port: 80,
        service: 'HTTP',
        state: 'OPEN 🟢',
        request: 'Attacker ➡️ SYN (knock)',
        response: 'Server ➡️ SYN-ACK (door opens)',
        finalFlag: 'Attacker ➡️ RST (aborts connection)',
        explanation: 'Port is listening! Attacker aborts with RST before completing handshake so Apache/Nginx never logs an HTTP session.'
      },
      {
        port: 445,
        service: 'SMB',
        state: 'CLOSED 🔴',
        request: 'Attacker ➡️ SYN (knock)',
        response: 'Server ➡️ RST-ACK (slams door)',
        finalFlag: 'None',
        explanation: 'No service listening! The OS kernel immediately responds with RST-ACK ("Nobody home! Go away").'
      },
      {
        port: 22,
        service: 'SSH',
        state: 'FILTERED 🛡️',
        request: 'Attacker ➡️ SYN (knock)',
        response: 'Firewall ➡️ [SILENCE / DROP]',
        finalFlag: 'Attacker ➡️ Retransmit Timeout',
        explanation: 'Host firewall (iptables/UFW) drops packet silently. Attacker receives zero reply and marks port as Filtered.'
      }
    ],
    commands: [
      {
        step: 1,
        desc: 'Filter Wireshark for reset flags to spot scanned closed doors',
        cmd: 'tshark -r capture.pcap -Y "tcp.flags.reset == 1"'
      },
      {
        step: 2,
        desc: 'Filter for SYN-only packets to spot rapid port enumeration',
        cmd: 'tshark -r capture.pcap -Y "tcp.flags.syn == 1 && tcp.flags.ack == 0"'
      }
    ]
  }
};

// Sprint 4 detailed interactive simulator data
export const SPRINT_4_STAGES = {
  arpPoisoning: {
    id: '4.1',
    title: 'Sub-Sprint 4.1: The Identity Thief (ARP Poisoning / MITM)',
    concept: 'Gratuitous ARP Injection & Layer 2 Redirection',
    eli5Summary: 'Imagine living in an apartment complex where everyone looks at a bulletin board to find the mailman. A burglar puts up a fake flyer saying "The mailman is now in Apartment 200 (Attacker)!" When anyone sends an outgoing letter, they hand it straight to the burglar!',
    kenyanMetaphor: 'A cunning conman in an apartment block pretending to be the caretaker. He sticks a flyer at the gate: "All KPLC electricity tokens and rent must now be handed to House 200 (him) instead of the main landlord!" Every neighbor hands over their hard-earned cash directly to the thief.',
    whyCompTia: 'CompTIA Security+ Domain 2.1 heavily tests on-path attacks. ARP has ZERO built-in authentication—any device on the local broadcast domain can send unsolicited (Gratuitous) ARP replies claiming ownership of the default gateway IP.',
    entities: {
      victim: { ip: '192.168.1.50', mac: '00:0c:29:aa:aa:aa', name: 'Victim Host' },
      realGateway: { ip: '192.168.1.1', mac: '00:50:56:11:11:11', name: 'Real Default Gateway' },
      attacker: { ip: '192.168.1.200', mac: '00:0c:29:66:66:66', name: 'Attacker (Kali VM)' }
    },
    samplePackets: [
      {
        no: 1,
        time: '0.000',
        source: '00:0c:29:66:66:66',
        dest: 'Broadcast (ff:ff:ff:ff:ff:ff)',
        proto: 'ARP',
        length: 42,
        info: 'Gratuitous ARP: 192.168.1.1 is at 00:0c:29:66:66:66 (spoofed!)',
        flag: 'MALICIOUS 🚨'
      },
      {
        no: 2,
        time: '0.015',
        source: '192.168.1.50',
        dest: '192.168.1.1',
        proto: 'HTTP',
        length: 128,
        info: 'GET /account_statement HTTP/1.1 (Routed through attacker MAC!)',
        flag: 'INTERCEPTED ⚠️'
      }
    ],
    defense: {
      name: 'Dynamic ARP Inspection (DAI)',
      howItWorks: 'Enterprise switches inspect all ARP packets against a trusted DHCP Snooping binding table. If an ARP reply claims an IP that doesn\'t match the DHCP switchport binding, the switch immediately drops the packet and disables the port.'
    },
    commands: [
      {
        step: 1,
        desc: 'Filter for duplicate ARP announcements in Wireshark',
        cmd: 'tshark -i any -Y "arp.duplicate-address-detected or arp.opcode == 2"'
      },
      {
        step: 2,
        desc: 'Inspect local OS ARP cache table to spot duplicate MACs',
        cmd: 'arp -a'
      }
    ]
  },
  dosSynFlood: {
    id: '4.2',
    title: 'Sub-Sprint 4.2: The Tsunami on the Wire (DoS / SYN Flood)',
    concept: 'Half-Open Socket Exhaustion & Wireshark I/O Graph Triage',
    eli5Summary: 'Imagine a bakery with 100 ordering seats. A malicious prankster calls and reserves every single seat under fake names, but never actually shows up to order. When real hungry customers arrive, the bakery is full and turns them away at the door!',
    kenyanMetaphor: 'A competitor sending 100 fake callers to reserve every single booth and table at a busy Nairobi Java House or local butchery during the 1:00 PM lunch rush, then nobody shows up. Real hungry customers arriving find "Reserved" placards everywhere and are turned away starved!',
    whyCompTia: 'CompTIA Security+ Domain 2.1 & 4.3 tests Denial of Service (DoS) mitigations. SYN Floods exploit the TCP 3-way handshake by sending SYN requests without ever returning the final ACK, overflowing the target kernel\'s SYN backlog queue.',
    normalVsAttackRate: {
      normalRate: '5 packets / sec',
      floodRate: '4,850 packets / sec',
      targetPort: 'TCP Port 80 / 443'
    },
    defense: {
      name: 'SYN Cookies & Rate Limiting',
      howItWorks: 'Instead of allocating memory when a SYN arrives, the server encodes the connection state inside the initial sequence number (SYN-ACK). It allocates zero memory until a legitimate client returns the final ACK with the decoded cookie!'
    },
    commands: [
      {
        step: 1,
        desc: 'Measure TCP SYN packet rate per second in real-time',
        cmd: 'tshark -i any -q -z io,stat,1,"COUNT(tcp.flags.syn==1 and tcp.flags.ack==0)"'
      },
      {
        step: 2,
        desc: 'Enable Linux kernel SYN Cookie protection against floods',
        cmd: 'sudo sysctl -w net.ipv4.tcp_syncookies=1'
      }
    ]
  },
  dnsPoisoning: {
    id: '4.3',
    title: 'Sub-Sprint 4.3: The Fake GPS (DNS Cache Poisoning / Spoofing)',
    concept: 'Unsolicited Forged DNS Replies & Phishing Redirection',
    eli5Summary: 'Imagine asking a friendly librarian where the bank is located. Before the librarian can speak, a stranger steps in and whispers: "The bank moved to 55 Evil Alley!" You walk into the counterfeit building and hand your deposit to a thief.',
    kenyanMetaphor: 'Someone maliciously rotating the road signpost at Nyayo Stadium roundabout. The sign pointing to "Kenyatta National Hospital" is secretly turned to point down a dark alley with waiting muggers. When your Boda or Uber follows the sign, you end up ambushed at a counterfeit building!',
    whyCompTia: 'CompTIA Security+ Domain 2.1 & 3.2 heavily tests DNS security. Attackers race against authoritative DNS servers to supply forged `A` records with matching Transaction IDs (`0x1a2b`), redirecting users to credential-harvesting phishing clones.',
    queryTransaction: {
      domain: 'mybank.corporate.com',
      queryId: '0x4f2a',
      legitIp: '198.51.100.25 (Real Bank)',
      spoofedIp: '203.0.113.66 (Attacker Phishing Clone)'
    },
    defense: {
      name: 'DNSSEC (Domain Name System Security Extensions)',
      howItWorks: 'DNSSEC uses cryptographic public-key signatures (RRSIG records) anchored in a chain of trust back to the root zone (`.`). If an attacker tries to inject a forged IP address without a valid cryptographic signature, the resolver rejects it immediately!'
    },
    commands: [
      {
        step: 1,
        desc: 'Filter for DNS queries and responses in Wireshark',
        cmd: 'tshark -i any -Y "dns.flags.response == 1"'
      },
      {
        step: 2,
        desc: 'Verify DNSSEC validation status on a domain query',
        cmd: 'dig +dnssec mybank.corporate.com @8.8.8.8'
      }
    ]
  }
};

// Sprint 5 Capstone Challenge PCAP Triage Data
export const SPRINT_5_CAPSTONE = {
  scenario: {
    title: 'Operation Dark Shadow: Multi-Stage Breach Triage',
    company: 'Apex Global Financial Systems',
    alertSeverity: 'CRITICAL 🚨',
    targetHost: '192.168.1.10 (Core Financial DB & FTP)',
    workstation: '192.168.1.75 (Accounting Dept PC)',
    description: 'At 03:14 AM, the automated SIEM alerted on high-volume outbound POST requests following suspicious port knocks against internal servers. You have been given the raw packet capture `incident_alpha.pcap` to investigate, extract forensic evidence, and file your incident remediation report.',
    kenyanMetaphor: 'The DCI Cyber Crime detectives arriving at Apex Financial headquarters in Upper Hill at 3:30 AM after a perimeter sensor alarm tripped. You must review the digital CCTV tape (PCAP) to discover: Which rogue car shook the security gates? Who leaked the unencrypted vault password? And which getaway vehicle carried away the company secret ledger file?'
  },
  packets: [
    {
      id: 1,
      time: '0.000',
      src: '198.51.100.15',
      dst: '192.168.1.10',
      proto: 'TCP',
      length: 60,
      info: '52341 ➡️ 21 [SYN] Seq=0 Win=1024 Len=0',
      phase: 'Phase 1: Recon',
      phaseColor: 'amber',
      details: {
        summary: 'External IP 198.51.100.15 knocking on TCP Port 21 (FTP Service).',
        hexSnippet: '00 0c 29 11 22 33 00 50 56 c0 00 08 08 00 45 00 ... [SYN]',
        flags: 'SYN [0x002]'
      }
    },
    {
      id: 2,
      time: '0.002',
      src: '192.168.1.10',
      dst: '198.51.100.15',
      proto: 'TCP',
      length: 60,
      info: '21 ➡️ 52341 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0',
      phase: 'Phase 1: Recon',
      phaseColor: 'amber',
      details: {
        summary: 'Target server confirms Port 21 is OPEN and listening for FTP connections.',
        hexSnippet: '00 50 56 c0 00 08 00 0c 29 11 22 33 08 00 45 00 ... [SYN, ACK]',
        flags: 'SYN, ACK [0x012]'
      }
    },
    {
      id: 3,
      time: '0.004',
      src: '198.51.100.15',
      dst: '192.168.1.10',
      proto: 'TCP',
      length: 54,
      info: '52341 ➡️ 21 [RST] Seq=1 Win=0 Len=0',
      phase: 'Phase 1: Recon',
      phaseColor: 'amber',
      details: {
        summary: 'Attacker immediately aborts connection with RST flag (Half-Open SYN Stealth Scan footprint!).',
        hexSnippet: '00 0c 29 11 22 33 00 50 56 c0 00 08 08 00 45 00 ... [RST]',
        flags: 'RST [0x004]'
      }
    },
    {
      id: 4,
      time: '1.420',
      src: '192.168.1.75',
      dst: '192.168.1.10',
      proto: 'FTP',
      length: 74,
      info: 'Request: USER accounting',
      phase: 'Phase 2: Plaintext Auth',
      phaseColor: 'rose',
      details: {
        summary: 'Internal user 192.168.1.75 transmits unencrypted FTP username.',
        hexSnippet: '55 53 45 52 20 61 63 63 6f 75 6e 74 69 6e 67 0d 0a  USER accounting..',
        flags: 'PSH, ACK [0x018]'
      }
    },
    {
      id: 5,
      time: '1.580',
      src: '192.168.1.75',
      dst: '192.168.1.10',
      proto: 'FTP',
      length: 82,
      info: 'Request: PASS SecretFin2026!',
      phase: 'Phase 2: Plaintext Auth',
      phaseColor: 'rose',
      details: {
        summary: 'CLEAR TEXT CREDENTIAL EXPOSED: Password "SecretFin2026!" sent unencrypted over the wire!',
        hexSnippet: '50 41 53 53 20 53 65 63 72 65 74 46 69 6e 32 30 32 36 21 0d 0a  PASS SecretFin2026!..',
        flags: 'PSH, ACK [0x018]'
      }
    },
    {
      id: 6,
      time: '1.610',
      src: '192.168.1.10',
      dst: '192.168.1.75',
      proto: 'FTP',
      length: 78,
      info: 'Response: 230 User logged in, proceed',
      phase: 'Phase 2: Plaintext Auth',
      phaseColor: 'rose',
      details: {
        summary: 'FTP server accepts compromised credentials and grants administrative file access.',
        hexSnippet: '32 33 30 20 55 73 65 72 20 6c 6f 67 67 65 64 20 69 6e 0d 0a  230 User logged in..',
        flags: 'PSH, ACK [0x018]'
      }
    },
    {
      id: 7,
      time: '3.100',
      src: '192.168.1.75',
      dst: '203.0.113.88',
      proto: 'HTTP',
      length: 1420,
      info: 'POST /upload?file=financial_records.zip HTTP/1.1',
      phase: 'Phase 3: Data Exfiltration',
      phaseColor: 'purple',
      details: {
        summary: 'Suspicious outbound HTTP POST uploading sensitive archive to external Command & Control server 203.0.113.88:8080.',
        hexSnippet: '50 4f 53 54 20 2f 75 70 6c 6f 61 64 3f 66 69 6c 65 3d 66 69 6e 61 6e 63 69 61 6c ...  POST /upload..',
        flags: 'PSH, ACK [0x018]'
      }
    },
    {
      id: 8,
      time: '3.150',
      src: '203.0.113.88',
      dst: '192.168.1.75',
      proto: 'HTTP',
      length: 215,
      info: 'HTTP/1.1 200 OK (C2 Exfiltration Acknowledged)',
      phase: 'Phase 3: Data Exfiltration',
      phaseColor: 'purple',
      details: {
        summary: 'External C2 confirms full reception of exfiltrated financial data archive.',
        hexSnippet: '48 54 54 50 2f 31 2e 31 20 32 30 30 20 4f 4b ... {"status":"exfiltrated"}',
        flags: 'PSH, ACK [0x018]'
      }
    }
  ],
  triageQuestions: [
    {
      id: 'q1_attacker_ip',
      label: '1. What was the external IP of the attacker conducting the reconnaissance port scan?',
      options: ['192.168.1.75', '198.51.100.15', '10.0.0.1', '203.0.113.88'],
      correctAnswer: '198.51.100.15',
      explanation: 'Packets #1-#3 show 198.51.100.15 probing TCP Port 21 with a SYN flag and aborting with a RST flag.'
    },
    {
      id: 'q2_cleartext_pass',
      label: '2. What plaintext password was exposed on the wire in Packet #5?',
      options: ['Spring2026!', 'SecretFin2026!', 'admin123', 'Password99!'],
      correctAnswer: 'SecretFin2026!',
      explanation: 'Packet #5 contains the unencrypted FTP string `PASS SecretFin2026!`. FTP passes authentication in cleartext.'
    },
    {
      id: 'q3_insecure_proto',
      label: '3. Which legacy cleartext protocol caused the authentication credential compromise?',
      options: ['SFTP (SSH)', 'FTP (Port 21)', 'HTTPS (Port 443)', 'SNMPv3'],
      correctAnswer: 'FTP (Port 21)',
      explanation: 'CompTIA Security+ requires replacing legacy FTP with encrypted SFTP (SSH Port 22) or FTPS.'
    },
    {
      id: 'q4_exfiltrated_file',
      label: '4. What sensitive asset was exfiltrated to the external C2 server in Packet #7?',
      options: ['financial_records.zip', 'passwords.txt', 'customer_database.sql', 'backup.tar.gz'],
      correctAnswer: 'financial_records.zip',
      explanation: 'Packet #7 HTTP POST URI path explicitly shows `POST /upload?file=financial_records.zip`.'
    }
  ],
  certificate: {
    title: 'CompTIA Security+ Wireshark & Packet Analysis Master',
    subtitle: 'Demonstrated Operational Proficiency in Real-Time Packet Sniffing, Filter Triage, TCP State Analysis & Incident Forensics',
    skillsVerified: [
      'Least-Privilege Non-Root Capture Configuration',
      'BPF Capture Filters vs. Wireshark Display Filters',
      'TCP 3-Way Handshake & Control Flags Dissection',
      'Plaintext Protocol Vulnerability Assessment & Upgrades',
      'Half-Open SYN Stealth Scan Footprint Identification',
      'ARP Poisoning, DoS Volumetric Spikes & DNS Spoofing Triage'
    ]
  }
};





