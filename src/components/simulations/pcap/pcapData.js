// CompTIA Security+ SY0-701 Packet Capture & Network Forensics Data

export const PACKET_LAYERS = [
  {
    layerNum: 2,
    layerName: 'Data Link Layer (Ethernet Frame)',
    boxName: 'The Outer Shipping Crate 📦',
    icon: '🚚',
    headerItems: [
      { key: 'Source MAC', value: 'b4:2e:99:a1:44:02 (Laptop NIC)', desc: 'Physical hardware address on the local network card' },
      { key: 'Destination MAC', value: '00:1a:2b:3c:4d:5e (Default Gateway Router)', desc: 'Next-hop hardware address on local switch' },
      { key: 'EtherType', value: '0x0800 (IPv4)', desc: 'Tells the network card that an IPv4 packet is packed inside' }
    ],
    plainStory: 'Like the license plate on the delivery van. The local switch only reads this outer shipping crate to move frames between physical ports on the local network.',
    compTiaKey: 'Switches operate at Layer 2 using MAC addresses. If an attacker spoofs this, it is called an ARP Poisoning / Spoofing attack!'
  },
  {
    layerNum: 3,
    layerName: 'Network Layer (IP Packet)',
    boxName: 'The Cardboard Mail Envelope ✉️',
    icon: '🌐',
    headerItems: [
      { key: 'Source IP', value: '192.168.1.45 (Your Office Laptop)', desc: 'Logical origin IP address' },
      { key: 'Destination IP', value: '142.250.190.46 (Web Server / Google)', desc: 'Logical destination IP address' },
      { key: 'Time to Live (TTL)', value: '64 hops', desc: 'Prevents packets from looping forever across the internet' },
      { key: 'Protocol Number', value: '6 (TCP)', desc: 'Tells the OS that a TCP segment is packed inside' }
    ],
    plainStory: 'Like the postal street address written on the envelope. Routers read this to guide the packet across different cities and internet service providers.',
    compTiaKey: 'Routers operate at Layer 3 using IP addresses. Firewalls inspect Source/Dest IP to apply network perimeter rules.'
  },
  {
    layerNum: 4,
    layerName: 'Transport Layer (TCP / UDP Segment)',
    boxName: 'The Padded Room Envelope 📁',
    icon: '🚪',
    headerItems: [
      { key: 'Source Port', value: '51240 (Dynamic / Ephemeral)', desc: 'Random client port opened by your web browser' },
      { key: 'Destination Port', value: '80 (HTTP) or 443 (HTTPS)', desc: 'Target service door on the server' },
      { key: 'Sequence Number', value: '289104812', desc: 'Tracks packet ordering so data can be reassembled' },
      { key: 'Flags', value: '[SYN, ACK]', desc: 'Controls connection state (SYN, ACK, FIN, RST)' }
    ],
    plainStory: 'Like the room door number inside the office building. Tells the computer whether to hand this data to the Web Server (80/443), SSH Server (22), or Mail Server (993).',
    compTiaKey: 'Stateful firewalls track TCP flags (SYN, SYN-ACK, ACK) and port numbers at Layer 4.'
  },
  {
    layerNum: 7,
    layerName: 'Application Layer (Payload Data)',
    boxName: 'The Confidential Letter Inside 📄',
    icon: '📝',
    headerItems: [
      { key: 'Application Protocol', value: 'HTTP / TLS / DNS / SSH', desc: 'The actual software protocol talking' },
      { key: 'Payload Type', value: 'User Credentials / HTML / JSON', desc: 'The content traveling over the wire' }
    ],
    cleartextPayload: 'POST /login.php HTTP/1.1\r\nHost: company.com\r\nContent-Type: application/x-www-form-urlencoded\r\n\r\nuser=eugene_admin&password=SuperSecretPassword2026!',
    encryptedPayload: 'TLS 1.3 Record Layer: Application Data Protocol: [Encrypted Handshake + AES-256-GCM Ciphertext: 8f c2 11 a9 4b 00 de 77 ...]',
    plainStory: 'The actual letter being read. If unencrypted (HTTP Port 80), it is a naked postcard that anyone with Wireshark can read. If encrypted (HTTPS Port 443), it is sealed in an armored lockbox.',
    compTiaKey: 'WAFs (Web Application Firewalls) and NGFWs (Next-Gen Firewalls) inspect Layer 7 payloads to block SQL injection and malware.'
  }
];

export const NETFLOW_VS_PCAP = {
  netflow: {
    title: 'NetFlow / IPFIX (The Phone Bill) 📱',
    desc: 'Itemized metadata summary of who called whom, what time, and how much data transferred. Does NOT capture actual message contents!',
    advantages: [
      'Extremely lightweight on hard drive storage (stores months of company traffic in gigabytes)',
      'Fast for detecting volume spikes, bandwidth hogs, and unusual off-hours transfers',
      'Supported natively by almost all corporate switches and routers'
    ],
    disadvantages: [
      'Cannot see what passwords were typed',
      'Cannot see file contents or malware payloads'
    ],
    examTip: 'CompTIA tests NetFlow for "trend analysis", "identifying top talkers", and "high-level anomaly detection" without filling disks.'
  },
  pcap: {
    title: 'PCAP / Full Packet Capture (The FBI Wiretap) 🎙️',
    desc: 'Bit-for-bit, byte-for-byte exact recording of every single frame, header, and payload traveling through the wire.',
    advantages: [
      'Complete forensic truth: can reconstruct entire web sessions, VoIP calls, and stolen files',
      'Allows security analysts to inspect malicious shellcode and exploit signatures'
    ],
    disadvantages: [
      'Massive storage eater! On a busy 10Gbps corporate network, hard drives fill up in minutes to hours',
      'Requires specialized capture hardware (TAPs or dedicated sensor appliances)'
    ],
    examTip: 'CompTIA tests PCAP (Wireshark/tcpdump) for "deep forensic analysis", "reconstructing incident streams", and "confirming exploit payloads".'
  }
};

export const TAP_VS_SPAN = {
  tap: {
    name: 'Network TAP (Test Access Point) 🔌',
    analogy: 'A physical hardware Y-splitter inserted directly into the cable.',
    howItWorks: 'Physically splits the optical light beam or electrical signal into two identical copies: one to destination, one to monitor.',
    pros: 'Zero dropped packets (100% full capture), zero load on network switches, completely invisible to hackers, failsafe bypass.',
    cons: 'Requires physically cutting/splicing the cable and buying dedicated hardware.',
    compTiaTakeaway: 'Always choose a physical TAP when 100% forensic packet fidelity without drops is required.'
  },
  span: {
    name: 'Port Mirror / SPAN (Switched Port Analyzer) 🪞',
    analogy: 'Software instructions telling a switch to duplicate traffic from Port 1 to Port 24.',
    howItWorks: 'The switch processor copies packets in software and sends them out a designated monitoring port.',
    pros: 'Cost-free! Can be turned on remotely via switch CLI/GUI without unplugging cables.',
    cons: 'If the switch CPU is overloaded, it DROPS mirror packets to prioritize regular traffic!',
    compTiaTakeaway: 'CompTIA trap: SPAN ports can drop packets under high utilization. TAPs do not.'
  }
};

export const MOCK_WIRESHARK_PACKETS = [
  {
    no: 1,
    time: '0.000000',
    source: '192.168.1.45',
    destination: '192.168.1.1',
    protocol: 'DNS',
    length: 74,
    info: 'Standard query 0x1a2b A intranet.company.local',
    category: 'dns',
    color: 'bg-blue-50 text-blue-900 border-blue-200',
    details: {
      frame: 'Frame 1: 74 bytes on wire (592 bits)',
      ethernet: 'Ethernet II, Src: b4:2e:99:a1:44:02, Dst: 00:1a:2b:3c:4d:5e',
      ip: 'Internet Protocol Version 4, Src: 192.168.1.45, Dst: 192.168.1.1',
      udp: 'User Datagram Protocol, Src Port: 53120, Dst Port: 53',
      app: 'Domain Name System (query): intranet.company.local: type A, class IN'
    }
  },
  {
    no: 2,
    time: '0.001420',
    source: '192.168.1.1',
    destination: '192.168.1.45',
    protocol: 'DNS',
    length: 90,
    info: 'Standard query response 0x1a2b A intranet.company.local A 192.168.1.50',
    category: 'dns',
    color: 'bg-blue-50 text-blue-900 border-blue-200',
    details: {
      frame: 'Frame 2: 90 bytes on wire',
      ethernet: 'Ethernet II, Src: 00:1a:2b:3c:4d:5e, Dst: b4:2e:99:a1:44:02',
      ip: 'Internet Protocol Version 4, Src: 192.168.1.1, Dst: 192.168.1.45',
      udp: 'User Datagram Protocol, Src Port: 53, Dst Port: 53120',
      app: 'Domain Name System (response): intranet.company.local -> 192.168.1.50'
    }
  },
  {
    no: 3,
    time: '0.012500',
    source: '192.168.1.45',
    destination: '192.168.1.50',
    protocol: 'TCP',
    length: 66,
    info: '51240 → 80 [SYN] Seq=0 Win=64240 Len=0 MSS=1460',
    category: 'tcp',
    color: 'bg-purple-50 text-purple-900 border-purple-200',
    details: {
      frame: 'Frame 3: 66 bytes on wire',
      ethernet: 'Ethernet II, Src: b4:2e:99:a1:44:02, Dst: 00:1a:2b:3c:4d:5e',
      ip: 'Internet Protocol Version 4, Src: 192.168.1.45, Dst: 192.168.1.50',
      tcp: 'Transmission Control Protocol, Src Port: 51240, Dst Port: 80, Flags: [SYN]'
    }
  },
  {
    no: 4,
    time: '0.013100',
    source: '192.168.1.50',
    destination: '192.168.1.45',
    protocol: 'TCP',
    length: 66,
    info: '80 → 51240 [SYN, ACK] Seq=0 Ack=1 Win=65160 Len=0',
    category: 'tcp',
    color: 'bg-purple-50 text-purple-900 border-purple-200',
    details: {
      frame: 'Frame 4: 66 bytes on wire',
      ethernet: 'Ethernet II, Src: 00:1a:2b:3c:4d:5e, Dst: b4:2e:99:a1:44:02',
      ip: 'Internet Protocol Version 4, Src: 192.168.1.50, Dst: 192.168.1.45',
      tcp: 'Transmission Control Protocol, Src Port: 80, Dst Port: 51240, Flags: [SYN, ACK]'
    }
  },
  {
    no: 5,
    time: '0.014000',
    source: '192.168.1.45',
    destination: '192.168.1.50',
    protocol: 'HTTP',
    length: 248,
    info: 'POST /auth/login.php HTTP/1.1 (application/x-www-form-urlencoded)',
    category: 'http',
    color: 'bg-emerald-50 text-emerald-950 border-emerald-300 font-bold',
    details: {
      frame: 'Frame 5: 248 bytes on wire',
      ethernet: 'Ethernet II, Src: b4:2e:99:a1:44:02, Dst: 00:1a:2b:3c:4d:5e',
      ip: 'Internet Protocol Version 4, Src: 192.168.1.45, Dst: 192.168.1.50',
      tcp: 'Transmission Control Protocol, Src Port: 51240, Dst Port: 80',
      app: 'Hypertext Transfer Protocol\r\nPOST /auth/login.php HTTP/1.1\r\n\r\n[CLEARTEXT PAYLOAD]: username=admin&password=SuperSecretPassword2026!'
    },
    hasStream: true,
    streamText: {
      client: 'POST /auth/login.php HTTP/1.1\r\nHost: intranet.company.local\r\nUser-Agent: Mozilla/5.0\r\nContent-Type: application/x-www-form-urlencoded\r\nContent-Length: 48\r\n\r\nusername=admin&password=SuperSecretPassword2026!',
      server: 'HTTP/1.1 200 OK\r\nDate: Sun, 07 Sep 2026 21:00:00 GMT\r\nSet-Cookie: sessionid=99281a8b12; Path=/\r\n\r\n{"status":"success","role":"superadmin"}'
    }
  },
  {
    no: 6,
    time: '0.045000',
    source: '00:aa:bb:cc:dd:ee',
    destination: 'ff:ff:ff:ff:ff:ff',
    protocol: 'ARP',
    length: 60,
    info: 'Who has 192.168.1.1? Tell 192.168.1.45',
    category: 'arp',
    color: 'bg-amber-50 text-amber-950 border-amber-200',
    details: {
      frame: 'Frame 6: 60 bytes on wire',
      ethernet: 'Ethernet II, Src: 00:aa:bb:cc:dd:ee, Dst: ff:ff:ff:ff:ff:ff (Broadcast)',
      arp: 'Address Resolution Protocol (request): Who has 192.168.1.1? Tell 192.168.1.45'
    }
  },
  {
    no: 7,
    time: '0.046000',
    source: 'ee:ee:ee:ee:ee:ee',
    destination: 'ff:ff:ff:ff:ff:ff',
    protocol: 'ARP',
    length: 60,
    info: '⚠️ Rogue Gratuitous ARP: 192.168.1.1 is at ee:ee:ee:ee:ee:ee',
    category: 'alert',
    color: 'bg-rose-100 text-rose-950 border-rose-400 font-black',
    isSuspicious: true,
    details: {
      frame: 'Frame 7: 60 bytes on wire',
      ethernet: 'Ethernet II, Src: ee:ee:ee:ee:ee:ee (Attacker NIC), Dst: ff:ff:ff:ff:ff:ff',
      arp: 'Address Resolution Protocol (reply): 192.168.1.1 is at ee:ee:ee:ee:ee:ee (SPOOFED DEFAULT GATEWAY!)'
    }
  },
  {
    no: 8,
    time: '0.089000',
    source: '192.168.1.45',
    destination: '8.8.8.8',
    protocol: 'DNS',
    length: 120,
    info: 'Standard query 0x77aa TXT ZXhoaWJfY29tcGFueV9zYWxhcmllcw.attacker.cc',
    category: 'alert',
    color: 'bg-rose-100 text-rose-950 border-rose-400 font-black',
    isSuspicious: true,
    details: {
      frame: 'Frame 8: 120 bytes on wire',
      ethernet: 'Ethernet II, Src: b4:2e:99:a1:44:02, Dst: 00:1a:2b:3c:4d:5e',
      ip: 'Internet Protocol Version 4, Src: 192.168.1.45, Dst: 8.8.8.8',
      udp: 'User Datagram Protocol, Dst Port: 53',
      app: 'DNS Query: TXT query with Base64 encoded payload: ZXhoaWJfY29tcGFueV9zYWxhcmllcw [Base64 decodes to: "exfil_company_salaries"]'
    }
  }
];

export const FORENSIC_CASES = [
  {
    id: 'case_cleartext',
    title: 'Case 1: The Naked Credential Theft',
    badge: 'Confidentiality Breach',
    difficulty: 'Warm-up',
    scenario: 'An attacker connected a packet sniffer to the breakroom Wi-Fi network. An employee logged into the company intranet portal. Inspect the packet capture and find what was stolen!',
    suspectPacketNo: 5,
    hint: 'Filter for unencrypted web protocol (HTTP). Look for an HTTP POST request carrying authentication data!',
    question: 'What password did the attacker steal from the unencrypted HTTP capture?',
    options: [
      { text: 'SuperSecretPassword2026!', isCorrect: true, feedback: 'CORRECT! Because the web session used unencrypted HTTP (Port 80) instead of HTTPS (Port 443), the credentials were transmitted in clear plain text!' },
      { text: '$2a$12$e91b8a9c00df12 (Hashed)', isCorrect: false, feedback: 'Incorrect! The password was NOT hashed over the wire. It was completely plain text.' },
      { text: 'sessionid=99281a8b12', isCorrect: false, feedback: 'That is the session cookie returned by the server, not the submitted password.' },
      { text: 'company.local', isCorrect: false, feedback: 'That is the domain hostname, not the password.' }
    ],
    compTiaFix: 'Enforce HTTPS (Port 443) with TLS encryption. Decommission HTTP Port 80 or enforce HSTS (HTTP Strict Transport Security) to redirect all traffic to TLS.'
  },
  {
    id: 'case_arp',
    title: 'Case 2: The Rogue Gateway (ARP Poisoning)',
    badge: 'On-Path / MITM Attack',
    difficulty: 'Intermediate',
    scenario: 'Employees report sudden slow browsing speeds and certificate warnings. The security team runs Wireshark and captures an anomalous ARP frame on the LAN.',
    suspectPacketNo: 7,
    hint: 'Look for an unsolicited gratuitous ARP broadcast claiming the Default Gateway router IP (192.168.1.1) belongs to a new MAC address!',
    question: 'What attack is occurring in Packet #7?',
    options: [
      { text: 'ARP Poisoning / Spoofing: An attacker at MAC ee:ee:ee:ee:ee:ee is tricking devices into routing all traffic through their machine!', isCorrect: true, feedback: 'CORRECT! The attacker is sending fake ARP replies poisoning the ARP cache of other computers so they can eavesdrop as an On-Path (Man-in-the-Middle) attacker.' },
      { text: 'SYN Flood DoS attack against the router.', isCorrect: false, feedback: 'Incorrect! This is an ARP frame (Layer 2), not a TCP SYN flood.' },
      { text: 'Standard DHCP address assignment.', isCorrect: false, feedback: 'Incorrect! DHCP uses UDP ports 67/68, not unsolicited ARP replies.' },
      { text: 'DNS Cache Poisoning.', isCorrect: false, feedback: 'Incorrect! This is happening at Layer 2 (ARP), not Layer 7 (DNS).' }
    ],
    compTiaFix: 'Enable Dynamic ARP Inspection (DAI) on corporate network switches paired with DHCP Snooping to validate ARP packets against trusted bindings!'
  },
  {
    id: 'case_dns_exfil',
    title: 'Case 3: The Covert DNS Smuggler (DNS Tunneling)',
    badge: 'Data Exfiltration',
    difficulty: 'Advanced',
    scenario: 'The perimeter firewall blocks all outbound FTP, SSH, and file sharing ports. Yet internal confidential payroll documents are leaking onto the dark web! Inspect Packet #8.',
    suspectPacketNo: 8,
    hint: 'Look at the strange DNS query in Packet #8. Notice the unusually long string of random characters before the domain name.',
    question: 'How is the malware bypassing firewall rules to steal data?',
    options: [
      { text: 'DNS Tunneling: Encoding confidential documents in base64 subdomains of DNS TXT queries over Port 53 to slip past firewalls!', isCorrect: true, feedback: 'CORRECT! Because firewalls almost always leave UDP Port 53 open for domain lookups, malware smuggles stolen files out hidden inside DNS query names!' },
      { text: 'Sending emails via SMTP Port 25.', isCorrect: false, feedback: 'Incorrect! Packet 8 is using DNS (Port 53), not SMTP.' },
      { text: 'Using an encrypted VPN on Port 1194.', isCorrect: false, feedback: 'Incorrect! The packet is a standard DNS query.' },
      { text: 'Brute-forcing RDP on Port 3389.', isCorrect: false, feedback: 'Incorrect! There is no RDP traffic.' }
    ],
    compTiaFix: 'Deploy DNS Sinkholing, inspect DNS query length/entropy, and implement Next-Gen Firewalls with Deep Packet Inspection (DPI) to detect DNS Tunneling.'
  }
];
