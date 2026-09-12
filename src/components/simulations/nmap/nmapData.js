// CompTIA Security+ SY0-701 Nmap Network Reconnaissance Data

export const NMAP_FLAGS = [
  {
    flag: '-sS',
    name: 'SYN Stealth Scan (Half-Open)',
    icon: '🏃‍♂️',
    category: 'scan_type',
    plainMeaning: 'The "Ding-Dong Ditch" scan. Sends SYN, receives SYN-ACK, then immediately sends RST to abort before completing the handshake.',
    whyStealthy: 'Because the 3-way handshake never completes, legacy application servers and web access logs do not record a completed connection.',
    compTiaExamRule: 'The default and most popular Nmap scan! Requires raw socket / root privileges. Use when stealth and speed are required.'
  },
  {
    flag: '-sT',
    name: 'TCP Full Connect Scan',
    icon: '📢',
    category: 'scan_type',
    plainMeaning: 'The loud visitor scan. Completes the full 3-way handshake (SYN ➡️ SYN-ACK ➡️ ACK) like a regular web browser.',
    whyStealthy: 'NOT stealthy! Target application logs will record the connection.',
    compTiaExamRule: 'Used when the scanning user does NOT have root/administrator privileges on their own scanning machine.'
  },
  {
    flag: '-sU',
    name: 'UDP Scan',
    icon: '📦',
    category: 'scan_type',
    plainMeaning: 'Scans connectionless UDP ports (DNS 53, SNMP 161, NTP 123, DHCP 67).',
    whyStealthy: 'Much slower than TCP scans because open UDP ports rarely send acknowledgments, while closed ports reply with ICMP Port Unreachable.',
    compTiaExamRule: 'CompTIA tests UDP scanning specifically for auditing DNS (53), SNMP (161), and DHCP (67).'
  },
  {
    flag: '-sV',
    name: 'Service Version Detection',
    icon: '🏷️',
    category: 'detection',
    plainMeaning: 'Interrogates open ports to determine the exact software banner and version number (e.g. Apache 2.4.49, OpenSSH 8.2p1).',
    whyStealthy: 'Sends application-specific probe strings to trigger service banner responses.',
    compTiaExamRule: 'Crucial for vulnerability assessment! Allows an analyst to cross-reference software versions against the National Vulnerability Database (NVD / CVEs).'
  },
  {
    flag: '-O',
    name: 'Operating System Fingerprinting',
    icon: '💻',
    category: 'detection',
    plainMeaning: 'Inspects TCP/IP stack quirks (TTL, window sizes, packet ordering) to guess the target OS (e.g. Linux 5.4, Windows Server 2019).',
    whyStealthy: 'Sends a series of TCP/UDP probes with subtle variations to observe how the target operating system uniquely reacts.',
    compTiaExamRule: 'Used in the reconnaissance phase to identify target operating systems before selecting targeted exploits.'
  },
  {
    flag: '-Pn',
    name: 'Disable Host Discovery (Treat as Online)',
    icon: '🛡️',
    category: 'evasion',
    plainMeaning: 'Tells Nmap: "Do not ping first! Assume the target host is online and scan ports directly!"',
    whyStealthy: 'Many corporate firewalls drop ICMP echo requests (pings). Without -Pn, Nmap thinks the host is dead and skips it.',
    compTiaExamRule: 'The #1 CompTIA Nmap troubleshooting trick! If a firewall blocks ping probes, always append -Pn to force the port scan.'
  },
  {
    flag: '-A',
    name: 'Aggressive Scan Mode',
    icon: '🚀',
    category: 'all_in_one',
    plainMeaning: 'All-in-one turbo flag: runs OS detection (-O), Version scanning (-sV), Script scanning (-sC), and Traceroute.',
    whyStealthy: 'Very noisy! Easily detected by modern Intrusion Detection Systems (IDS).',
    compTiaExamRule: 'Great for rapid internal auditing when stealth is not a concern.'
  },
  {
    flag: '-T0 to -T5',
    name: 'Timing Templates',
    icon: '⏱️',
    category: 'timing',
    plainMeaning: '-T0 (Paranoid) and -T1 (Sneaky) slow down scans to evade IDS detection. -T4 (Aggressive) is fast for reliable internal networks.',
    whyStealthy: 'Spreading packets across minutes or hours avoids tripping threshold-based IDS/IPS rate alarms.',
    compTiaExamRule: 'Select -T0 or -T1 to minimize the probability of triggering an Intrusion Detection System alarm.'
  }
];

export const PORT_STATES = [
  {
    state: 'OPEN',
    color: 'bg-emerald-500 text-white',
    badge: '🟢 OPEN',
    story: 'Receptionist opens the door and smiles: "Welcome!"',
    technical: 'Target returned SYN-ACK packet. An application is actively accepting connections.',
    compTiaAction: 'Audit the service. Ensure it is necessary, patched, and secured with encryption.'
  },
  {
    state: 'CLOSED',
    color: 'bg-rose-500 text-white',
    badge: '🔴 CLOSED',
    story: 'Nobody in the room yells: "Nobody works here, go away!"',
    technical: 'Target host is alive and responded with a RST (Reset) packet. No application is listening.',
    compTiaAction: 'Safe. Host is reachable, but port is not accepting connections.'
  },
  {
    state: 'FILTERED',
    color: 'bg-amber-500 text-white',
    badge: '🟡 FILTERED',
    story: 'A firewall bouncer blocks the hallway. Your knock echoes into the void with zero reply.',
    technical: 'A firewall or packet filter dropped the probe, or returned ICMP unreachable. Nmap cannot tell if the port is open or closed.',
    compTiaAction: 'Firewall is actively blocking access. Expected for external perimeters.'
  }
];

export const MOCK_TERMINAL_SCANS = {
  stealth: {
    command: 'nmap -sS -p 22,80,443 -Pn 192.168.1.50',
    description: 'SYN Stealth scan targeting core web & SSH ports with ping disabled',
    output: [
      'Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-09 13:30 UTC',
      'Nmap scan report for 192.168.1.50 (web-gateway.company.local)',
      'Host is up (0.0024s latency).',
      'Not shown: 997 closed tcp ports (reset)',
      'PORT    STATE SERVICE',
      '22/tcp  open  ssh',
      '80/tcp  open  http',
      '443/tcp open  https',
      '',
      'Nmap done: 1 IP address (1 host up) scanned in 0.42 seconds'
    ]
  },
  version: {
    command: 'nmap -sS -sV -O -p 21,22,80,3389 192.168.1.50',
    description: 'SYN scan with Service Version Detection and OS Fingerprinting',
    output: [
      'Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-09 13:31 UTC',
      'Nmap scan report for 192.168.1.50 (prod-server.corp.local)',
      'Host is up (0.0031s latency).',
      'PORT     STATE    SERVICE       VERSION',
      '21/tcp   open     ftp           vsftpd 2.3.4 (Vulnerable Backdoor!)',
      '22/tcp   open     ssh           OpenSSH 8.2p1 Ubuntu 4ubuntu0.5',
      '80/tcp   open     http          Apache httpd 2.4.49 (CVE-2021-41773)',
      '3389/tcp filtered ms-wbt-server (Firewall dropped probe)',
      'MAC Address: 00:0C:29:8A:4F:1B (VMware Virtual NIC)',
      'Device type: general purpose',
      'Running: Linux 5.X',
      'OS CPE: cpe:/o:linux:linux_kernel:5.4',
      'OS details: Linux 5.4 - 5.8 (Ubuntu 20.04 LTS)',
      '',
      'Nmap done: 1 IP address (1 host up) scanned in 6.84 seconds'
    ]
  }
};

export const OUTPUT_DISSECTIONS = {
  '21/tcp': {
    prefix: '21/tcp',
    title: 'Port 21: vsftpd 2.3.4 Backdoor',
    explanation: 'Nmap -sV detected vsftpd version 2.3.4. This famous version contains a malicious backdoor where typing a smiley face ":)" in the username opens a root shell on port 6200!',
    compTiaLesson: 'Service Version detection (-sV) is critical because finding open ports alone is not enough — you must identify whether the installed version has known CVEs.'
  },
  '22/tcp': {
    prefix: '22/tcp',
    title: 'Port 22: OpenSSH 8.2p1 (Secure Shell)',
    explanation: 'Port 22 is open running OpenSSH. SSH encrypts all remote administrative sessions, replacing legacy unencrypted Telnet (Port 23) to prevent credential eavesdropping.',
    compTiaLesson: 'CompTIA mandates SSH (TCP 22) for secure management and deprecating unencrypted protocols like Telnet.'
  },
  '80/tcp': {
    prefix: '80/tcp',
    title: 'Port 80: Outdated Apache 2.4.49',
    explanation: 'Apache 2.4.49 suffers from CVE-2021-41773 (Path Traversal & Remote Code Execution). An attacker can map system files outside the web root (e.g. /etc/passwd).',
    compTiaLesson: 'CompTIA vulnerability assessments use Nmap version banners to prioritize software patching.'
  },
  '3389/tcp': {
    prefix: '3389/tcp',
    title: 'Port 3389: FILTERED State',
    explanation: 'Nmap sent a probe to RDP (Port 3389), but a firewall or access control list (ACL) dropped the packet with zero response.',
    compTiaLesson: '"Filtered" means a firewall is protecting the port. Do NOT confuse with "Closed" (where the host actively replies with RST).'
  },
  'OS details:': {
    prefix: 'OS details:',
    title: 'OS Fingerprinting (-O)',
    explanation: 'By analyzing TCP initial window size, TTL values, and DF (Don\'t Fragment) flags, Nmap determined the operating system is Ubuntu Linux 20.04.',
    compTiaLesson: 'OS detection helps penetration testers choose payloads specifically compiled for the target kernel architecture.'
  }
};

// Safe helper to find dissection for any terminal line
export const getDissectionForLine = (line) => {
  if (!line || typeof line !== 'string') return null;
  const trimmed = line.trim();
  if (!trimmed) return null;
  for (const [key, item] of Object.entries(OUTPUT_DISSECTIONS)) {
    if (trimmed.startsWith(key) || trimmed.startsWith(item.prefix)) {
      return item;
    }
  }
  return null;
};

// Dynamic terminal output generator based on switches selected
export const buildTerminalScanOutput = ({ includeStealth = true, includeVersion = true, includeOs = true, includeNoPing = true, ports = '21,22,80,3389' }) => {
  const lines = [
    'Starting Nmap 7.94 ( https://nmap.org ) at 2026-09-09 13:35 UTC',
    'Nmap scan report for 192.168.1.50 (prod-server.corp.local)',
    includeNoPing 
      ? 'Host is up (0.0031s latency). [Host discovery skipped via -Pn]'
      : 'Host is up, received arp-response (0.0022s latency).',
    includeVersion 
      ? 'PORT     STATE    SERVICE       VERSION'
      : 'PORT     STATE    SERVICE',
    includeVersion
      ? '21/tcp   open     ftp           vsftpd 2.3.4 (Vulnerable Backdoor!)'
      : '21/tcp   open     ftp',
    includeVersion
      ? '22/tcp   open     ssh           OpenSSH 8.2p1 Ubuntu 4ubuntu0.5'
      : '22/tcp   open     ssh',
    includeVersion
      ? '80/tcp   open     http          Apache httpd 2.4.49 (CVE-2021-41773)'
      : '80/tcp   open     http',
    '3389/tcp filtered ms-wbt-server (Firewall dropped probe)'
  ];

  if (includeOs) {
    lines.push(
      'MAC Address: 00:0C:29:8A:4F:1B (VMware Virtual NIC)',
      'Device type: general purpose',
      'Running: Linux 5.X',
      'OS CPE: cpe:/o:linux:linux_kernel:5.4',
      'OS details: Linux 5.4 - 5.8 (Ubuntu 20.04 LTS)'
    );
  }

  lines.push(
    '',
    `Nmap done: 1 IP address (1 host up) scanned in ${includeVersion ? '6.84' : '1.12'} seconds`
  );

  return lines;
};

export const RECON_PBQ_CHALLENGES = [
  {
    id: 1,
    title: 'Challenge 1: The Ghost Host (Firewall Dropping Ping)',
    scenario: 'A security auditor knows the target server (192.168.1.100) is powered on and running. However, running standard `nmap 192.168.1.100` returns: "Note: Host seems down. If it is really up, but blocking our ping probes, try..."',
    question: 'Which Nmap switch must the auditor append to bypass ICMP host discovery and scan the ports anyway?',
    options: [
      { text: '-Pn (Disable ping host discovery)', isCorrect: true, feedback: 'CORRECT! -Pn tells Nmap to treat all target hosts as online and skip the initial ping probe, directly scanning ports.' },
      { text: '-sT (Full connect scan)', isCorrect: false, feedback: 'Incorrect! -sT changes the port scan technique, but Nmap will still try to ping the host first unless -Pn is specified.' },
      { text: '-O (OS detection)', isCorrect: false, feedback: 'Incorrect! -O identifies the operating system, but host discovery still runs first.' },
      { text: '-F (Fast scan 100 ports)', isCorrect: false, feedback: 'Incorrect! -F scans fewer ports, but still skips dead-appearing hosts.' }
    ],
    compTiaTakeaway: 'In corporate networks where firewalls block ICMP echo requests, always use `-Pn` to prevent Nmap from mistakenly skipping online hosts.'
  },
  {
    id: 2,
    title: 'Challenge 2: The Silent Reconnaissance',
    scenario: 'A penetration tester is hired to evaluate a financial firm. The rules of engagement specify that the tester must avoid completing full TCP connections to minimize the chances of being logged by target application server logs.',
    question: 'Which scan type should the penetration tester execute?',
    options: [
      { text: '-sS (SYN Stealth / Half-Open Scan)', isCorrect: true, feedback: 'CORRECT! -sS sends a SYN, waits for SYN-ACK to verify the port is open, and immediately transmits a RST packet before completing the handshake, preventing application-level connection logging.' },
      { text: '-sT (TCP Full Connect Scan)', isCorrect: false, feedback: 'Incorrect! -sT completes the full 3-way handshake and is recorded directly in server access logs.' },
      { text: '-sU (UDP Scan)', isCorrect: false, feedback: 'Incorrect! -sU scans UDP services, not TCP ports.' },
      { text: '-A (Aggressive Scan)', isCorrect: false, feedback: 'Incorrect! -A is extremely noisy and easily detected by monitoring systems.' }
    ],
    compTiaTakeaway: '`-sS` is the stealthy half-open scan because it resets the TCP handshake before establishing a connection.'
  },
  {
    id: 3,
    title: 'Challenge 3: Spotting the Outdated Service',
    scenario: 'An IT security team runs `nmap -sV 10.0.0.15` and reviews the output. Port 21 reports: `vsftpd 2.3.4`, and Port 80 reports: `Apache 2.4.49`.',
    question: 'Why did the analyst include the `-sV` flag instead of a basic port scan?',
    options: [
      { text: 'To interrogate open ports for application banners and exact software version numbers to find known CVE vulnerabilities.', isCorrect: true, feedback: 'CORRECT! -sV probes open ports to reveal the exact software name and version number, enabling vulnerability assessments.' },
      { text: 'To scan faster across high-speed 10Gbps fiber networks.', isCorrect: false, feedback: 'Incorrect! -sV actually takes longer because it exchanges application data.' },
      { text: 'To disguise the scan as a legitimate Googlebot crawler.', isCorrect: false, feedback: 'Incorrect! -sV does not randomize user-agents by default.' },
      { text: 'To crack administrative passwords on the FTP server.', isCorrect: false, feedback: 'Incorrect! Nmap is a port scanner, not a brute-force password cracker.' }
    ],
    compTiaTakeaway: '`-sV` performs service version interrogation. In CompTIA Sec+, `-sV` is the primary flag for uncovering unpatched software versions.'
  },
  {
    id: 4,
    title: 'Challenge 4: Decoding the "Filtered" Port State',
    scenario: 'An auditor scans an external perimeter router and observes that Port 22 is `open`, Port 25 is `closed`, and Port 3389 is `filtered`.',
    question: 'What does the `filtered` state indicate about Port 3389?',
    options: [
      { text: 'A firewall or packet filter is dropping the probe packets, preventing Nmap from determining whether the port is open or closed.', isCorrect: true, feedback: 'CORRECT! Filtered means a network firewall or ACL dropped the probe with no response, so Nmap cannot determine the true state of the port.' },
      { text: 'The target machine is powered off.', isCorrect: false, feedback: 'Incorrect! Port 22 and Port 25 responded, proving the machine is online.' },
      { text: 'An application is listening and ready to accept connections.', isCorrect: false, feedback: 'Incorrect! That would be the "open" state.' },
      { text: 'The host responded with a RST packet.', isCorrect: false, feedback: 'Incorrect! Responding with RST results in the "closed" state.' }
    ],
    compTiaTakeaway: 'Know the 3 Nmap port states: `open` (SYN-ACK), `closed` (RST from host), and `filtered` (packet dropped by firewall/filter).'
  }
];
