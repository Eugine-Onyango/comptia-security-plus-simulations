import React, { useState } from 'react';
import { 
  Terminal, Search, Play, ArrowLeft, Sparkles, BookOpen, Shield, 
  RotateCcw, CheckCircle2, ChevronRight, Copy, Check, Filter, 
  Layers, Lock, AlertTriangle, Radio
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const COMMAND_DRILLS = [
  // 1. WIRESHARK & TCPDUMP
  {
    id: 'tcpdump_count',
    category: 'wireshark',
    categoryLabel: 'Wireshark & tcpdump',
    icon: '🦈',
    command: 'tcpdump -i eth0 -nn -c 10',
    title: 'Quick Packet Sniff Without DNS Lag',
    examRelevance: 'Domain 4.3 • Network Troubleshooting & Packet Sniffing',
    tags: ['-nn (No DNS)', '-c (Count)', '-i (Interface)'],
    explanation: 'Captures exactly 10 packets on interface eth0. The -nn flag prevents slow DNS and port resolution so your terminal does not freeze during high traffic.',
    kenyanMetaphor: 'Standing at Kencom bus stop counting exactly 10 matatus. You read only their physical number plates (-nn) instead of wasting time reading SACCO graffiti or route nicknames.',
    simulatedOutput: `tcpdump: verbose output suppressed, use -v[v]... for full protocol decode
listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes
13:14:02.104212 IP 192.168.1.50.54321 > 8.8.8.8.53: 12345+ A? google.com. (28)
13:14:02.118943 IP 8.8.8.8.53 > 192.168.1.50.54321: 12345 1/0/0 A 142.250.180.14 (44)
13:14:02.201452 IP 192.168.1.50.49152 > 142.250.180.14.443: Flags [S], seq 3829104
13:14:02.215891 IP 142.250.180.14.443 > 192.168.1.50.49152: Flags [S.], seq 9182301
13:14:02.216012 IP 192.168.1.50.49152 > 142.250.180.14.443: Flags [.], ack 1
10 packets captured
10 packets received by filter
0 packets dropped by kernel`,
    examTrap: 'CompTIA questions love to ask: "Which flag prevents host name resolution to speed up capture?" Remember: -n (no IP lookup) and -nn (no IP or port lookup).'
  },
  {
    id: 'tcpdump_save_pcap',
    category: 'wireshark',
    categoryLabel: 'Wireshark & tcpdump',
    icon: '💾',
    command: "tcpdump -i eth0 'port 80' -w web_traffic.pcap",
    title: 'Writing Traffic to PCAP for Wireshark',
    examRelevance: 'Domain 4.4 • Digital Forensics & Evidence Preservation',
    tags: ['-w (Write PCAP)', 'port 80 (Filter)', 'BPF syntax'],
    explanation: 'Saves raw uncorrupted packets matching HTTP port 80 to a .pcap file on disk so a security analyst can open it in Wireshark GUI later.',
    kenyanMetaphor: 'The gate watchman writing all red salon cars entering the estate into the permanent black hardcover register book (-w) so the police detective can inspect it tomorrow.',
    simulatedOutput: `tcpdump: listening on eth0, link-type EN10MB (Ethernet), snapshot length 262144 bytes
^C
184 packets captured
184 packets received by filter
0 packets dropped by kernel
[+] Successfully wrote binary capture to /var/log/web_traffic.pcap`,
    examTrap: '-w writes/saves to a file; -r reads from an existing file. Do not confuse them on drag-and-drop terminal PBQs!'
  },
  {
    id: 'tshark_post',
    category: 'wireshark',
    categoryLabel: 'Wireshark & tcpdump',
    icon: '📮',
    command: 'tshark -r capture.pcap -Y "http.request.method == \\"POST\\""',
    title: 'Extracting Form Logins & Passwords',
    examRelevance: 'Domain 2.4 • Insecure Protocols & Credential Harvesting',
    tags: ['-r (Read)', '-Y (Display Filter)', 'POST'],
    explanation: 'Searches an existing packet capture specifically for HTTP POST requests (where users transmit usernames, passwords, and form submissions in cleartext).',
    kenyanMetaphor: 'Opening the post office sorting box and pulling out only the envelopes marked "Cash Inside" or "Confidential Letter" while ignoring public advertising flyers.',
    simulatedOutput: `    14   2.140291  192.168.1.105 → 10.0.0.15     HTTP 342 POST /api/login HTTP/1.1 (application/x-www-form-urlencoded)
   189  14.891024  192.168.1.105 → 10.0.0.15     HTTP 289 POST /checkout/credit-card HTTP/1.1
[!] Plaintext credentials detected: user=admin&pass=CompTIA2026! in Frame #14`,
    examTrap: 'GET requests fetch web pages. POST requests submit credentials/forms. If unencrypted HTTP is used, POST bodies expose passwords in cleartext!'
  },

  // 2. FIREWALLS
  {
    id: 'iptables_allow_ssh',
    category: 'firewalls',
    categoryLabel: 'Linux Firewalls',
    icon: '🛡️',
    command: 'iptables -A INPUT -p tcp --dport 22 -s 192.168.1.10 -j ACCEPT',
    title: 'Restrict SSH Access to Admin Workstation Only',
    examRelevance: 'Domain 3.2 • Network Infrastructure & Access Control Lists',
    tags: ['-A (Append)', '-p tcp', '--dport 22', '-s (Source)', 'ACCEPT'],
    explanation: 'Appends a rule allowing TCP connections to port 22 (SSH) strictly if the request originates from the trusted management IP 192.168.1.10.',
    kenyanMetaphor: 'The security guard at the estate barrier is ordered: "Only allow the white Land Cruiser with plate KDA 123A (192.168.1.10) to enter Gate 22. All other strangers stay outside."',
    simulatedOutput: `Chain INPUT (policy DROP 0 packets, 0 bytes)
 pkts bytes target     prot opt in     out     source               destination         
    0     0 ACCEPT     tcp  --  *      *       192.168.1.10         0.0.0.0/0            tcp dpt:22
[+] Rule appended successfully. Port 22 protected.`,
    examTrap: 'First Match Wins! If this ACCEPT rule is placed below a generic "DROP ALL" rule, it will never execute. High-priority specific rules must always be placed at the top.'
  },
  {
    id: 'iptables_implicit_deny',
    category: 'firewalls',
    categoryLabel: 'Linux Firewalls',
    icon: '🚫',
    command: 'iptables -P INPUT DROP',
    title: 'Enforce Zero Trust Implicit Deny',
    examRelevance: 'Domain 1.3 • Zero Trust Architecture & Least Privilege',
    tags: ['-P (Policy)', 'INPUT', 'DROP (Silent Reject)'],
    explanation: 'Sets the default policy of incoming traffic to DROP. Any packet not explicitly matched by an earlier ALLOW rule is silently dropped.',
    kenyanMetaphor: 'Strict bouncer at a private wedding: "If your name is not typed on this VIP sheet, you are not stepping one foot past this tent. No arguments, no exceptions."',
    simulatedOutput: `Setting default policy for chain INPUT to DROP...
[OK] Implicit Deny is now active. Any unlisted incoming packet will be discarded without response.`,
    examTrap: 'DROP vs REJECT: DROP silently discards the packet (stealthy, leaves port looking filtered). REJECT sends back an ICMP Port Unreachable or TCP RST (informs attacker the port exists).'
  },
  {
    id: 'ufw_allow_https',
    category: 'firewalls',
    categoryLabel: 'Linux Firewalls',
    icon: '🔒',
    command: 'ufw allow from 10.0.0.0/24 to any port 443 proto tcp',
    title: 'Open Secure HTTPS for Internal Subnet',
    examRelevance: 'Domain 3.4 • Host-Based Firewalls & Subnet Segmentation',
    tags: ['ufw', 'subnet /24', 'port 443 (HTTPS)'],
    explanation: 'Configures Ubuntu Uncomplicated Firewall to allow HTTPS traffic exclusively from the local corporate subnet 10.0.0.0/24.',
    kenyanMetaphor: 'Allowing all residents of block 10 (the /24 clan) into the estate swimming pool, but blocking members of the public passing by on the main road.',
    simulatedOutput: `Rule added
Rule added (v6)
Status: active
To                         Action      From
--                         ------      ----
443/tcp                    ALLOW       10.0.0.0/24`,
    examTrap: 'ufw uses simplified command syntax. For the exam, remember that "from [CIDR] to any port [NUM]" enforces both IP whitelisting and port restriction.'
  },
  {
    id: 'firewalld_reload',
    category: 'firewalls',
    categoryLabel: 'Linux Firewalls',
    icon: '🏰',
    command: 'firewall-cmd --zone=public --add-port=443/tcp --permanent && firewall-cmd --reload',
    title: 'Persist Zone Rule Across Reboots',
    examRelevance: 'Domain 3.4 • Enterprise Linux Security Architecture',
    tags: ['--permanent', '--reload', 'firewalld'],
    explanation: 'Adds TCP port 443 to the public zone permanently, and immediately reloads firewalld netfilter memory so you do not have to reboot.',
    kenyanMetaphor: 'Getting the chief\'s official permanent rubber stamp on your trade license, and immediately showing it to the watchman so he opens the gate right now.',
    simulatedOutput: `success
success
[+] Active zones reloaded: public (port 443/tcp enabled and persistent across reboots)`,
    examTrap: 'If you run firewall-cmd without --permanent, the rule will disappear as soon as the server restarts!'
  },

  // 3. NMAP RECON
  {
    id: 'nmap_stealth_syn',
    category: 'nmap',
    categoryLabel: 'Nmap Recon Radar',
    icon: '🥷',
    command: 'nmap -sS -p 21,22,80,443 192.168.1.100',
    title: 'Stealth SYN Scan (Half-Open)',
    examRelevance: 'Domain 4.1 • Threat Assessment & Port Reconnaissance',
    tags: ['-sS (SYN scan)', '-p (Port list)', 'Half-Open'],
    explanation: 'Sends a SYN knock. If server returns SYN-ACK, Nmap immediately sends RST to tear down connection before an application session is logged.',
    kenyanMetaphor: 'Ding-dong ditch! Ringing the doorbell and sprinting away behind the hedge before anyone opens the door. You proved someone was inside without meeting them face-to-face.',
    simulatedOutput: `Starting Nmap 7.94 ( https://nmap.org )
Nmap scan report for target (192.168.1.100)
Host is up (0.0012s latency).

PORT    STATE  SERVICE
21/tcp  closed ftp
22/tcp  open   ssh
80/tcp  open   http
443/tcp open   https

Nmap done: 1 IP address (1 host up) scanned in 0.28 seconds`,
    examTrap: '-sS requires administrative/root privileges on Linux/macOS because it manually crafts raw TCP SYN packets.'
  },
  {
    id: 'nmap_version_scripts',
    category: 'nmap',
    categoryLabel: 'Nmap Recon Radar',
    icon: '🔍',
    command: 'nmap -sV -sC -p 80,443 192.168.1.100',
    title: 'Banner Grabbing & Vulnerability Scripting',
    examRelevance: 'Domain 4.2 • Vulnerability Scanning & Banner Identification',
    tags: ['-sV (Version)', '-sC (Default Scripts)', 'Banner Grabbing'],
    explanation: 'Probes open web ports to grab exact software banners (e.g. Apache 2.4.49) and executes default Lua vulnerability scripts (NSE).',
    kenyanMetaphor: 'Not just looking at a car parked outside, but opening the hood, writing down the engine number, and checking if the brake pads are worn out.',
    simulatedOutput: `PORT    STATE SERVICE  VERSION
80/tcp  open  http     Apache httpd 2.4.49 ((Unix))
|_http-server-header: Apache/2.4.49 (Unix)
|_http-title: Corporate Intranet Portal
| http-cve-2021-41773: VULNERABLE
|_Path traversal and Remote Code Execution vulnerability detected!
443/tcp open  ssl/http Apache httpd 2.4.49
|_ssl-cert: Subject: commonName=intranet.corp.local`,
    examTrap: 'CompTIA often asks: "Which option provides software version details for vulnerability analysis?" The answer is -sV.'
  },
  {
    id: 'nmap_os_fingerprint',
    category: 'nmap',
    categoryLabel: 'Nmap Recon Radar',
    icon: '💻',
    command: 'nmap -O 192.168.1.100',
    title: 'Operating System Fingerprinting',
    examRelevance: 'Domain 4.1 • Host Identification & OS Detection',
    tags: ['-O (OS Detect)', 'TCP/IP Stack Fingerprint'],
    explanation: 'Analyzes subtle differences in how target TCP/IP stacks respond to unusual packets (TTL, TCP options, initial window sizes) to identify the OS.',
    kenyanMetaphor: 'Listening to someone speaking English on the radio. By their accent, slang, and breathing pattern, you immediately know whether they are from Nairobi or Mombasa.',
    simulatedOutput: `Device type: general purpose
Running: Linux 5.X
OS CPE: cpe:/o:linux:linux_kernel:5.4
OS details: Linux 5.4 - 5.15 (Ubuntu 20.04 LTS / Debian 11)
Network Distance: 1 hop`,
    examTrap: 'OS detection (-O) is NOT 100% foolproof; modern firewalls and NAT devices can normalize TCP packets to mislead scanners.'
  },

  // 4. PACKET & HOST INSPECTION
  {
    id: 'netstat_listening',
    category: 'inspection',
    categoryLabel: 'Host & Network Inspection',
    icon: '🚪',
    command: 'netstat -ano',
    title: 'Active Ports & Rogue Process Mapping',
    examRelevance: 'Domain 4.3 • Malware Analysis & Host Forensics',
    tags: ['-a (All)', '-n (Numbers)', '-o (Owner PID)'],
    explanation: 'Lists all open TCP/UDP listening ports and active external connections, together with the Process ID (PID) owning each socket.',
    kenyanMetaphor: 'Conducting an unannounced tenant roll call in an apartment block. You check which doors are unlocked and write down the ID number of each person inside.',
    simulatedOutput: `Active Connections

  Proto  Local Address          Foreign Address        State           PID
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       840
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4
  TCP    192.168.1.50:52104     45.33.32.156:4444      ESTABLISHED     3912  <-- [SUSPICIOUS BACKDOOR]
  TCP    192.168.1.50:52109     142.250.180.14:443     ESTABLISHED     1844`,
    examTrap: 'CompTIA PBQs will show netstat output and ask you to spot the attacker backdoor. Look for odd foreign ports (e.g. 4444, 1337) connected to random public IPs!'
  },
  {
    id: 'arp_cache',
    category: 'inspection',
    categoryLabel: 'Host & Network Inspection',
    icon: '🎯',
    command: 'arp -a',
    title: 'Detecting ARP Poisoning & MITM Attacks',
    examRelevance: 'Domain 2.2 • On-Path / Man-in-the-Middle Attacks',
    tags: ['arp -a', 'MAC Cache', 'Duplicate MAC Detection'],
    explanation: 'Displays the local IP-to-MAC resolution table. If two different IP addresses have identical MAC addresses, an on-path ARP spoofing attack is occurring.',
    kenyanMetaphor: 'Looking at the building parking register and noticing that two completely different tenants claim to own the exact same car number plate.',
    simulatedOutput: `Interface: 192.168.1.50 --- 0xb
  Internet Address      Physical Address      Type
  192.168.1.1           00-0c-29-fa-81-22     dynamic  <-- (Default Gateway)
  192.168.1.88          00-0c-29-fa-81-22     dynamic  <-- [ALERT: DUPLICATE MAC! ARP SPOOFING!]
  192.168.1.254         ff-ff-ff-ff-ff-ff     static`,
    examTrap: 'In exam scenarios with intermittent connection drops or SSL certificate warnings, always inspect arp -a for duplicate physical MAC addresses!'
  },
  {
    id: 'dig_trace',
    category: 'inspection',
    categoryLabel: 'Host & Network Inspection',
    icon: '🧭',
    command: 'dig +trace example.com',
    title: 'Hierarchical DNS Root Resolution Trace',
    examRelevance: 'Domain 3.1 • Secure DNS Architecture & Poisoning Detection',
    tags: ['dig', '+trace', 'DNS Hierarchy'],
    explanation: 'Queries DNS from root servers (.) down to top-level domains (.com) to authoritative servers, tracking each delegation step to detect DNS redirection.',
    kenyanMetaphor: 'Asking a boda-boda rider for directions: he asks the roundabout traffic cop, who asks the stage coordinator, who takes you to the specific shop owner.',
    simulatedOutput: `.                       518400  IN  NS  a.root-servers.net.
;; Received 525 bytes from 192.168.1.1#53 in 12 ms

com.                    172800  IN  NS  a.gtld-servers.net.
;; Received 840 bytes from 198.41.0.4#53 in 28 ms

example.com.            172800  IN  NS  a.iana-servers.net.
;; Received 412 bytes from 192.5.6.30#53 in 45 ms

example.com.            86400   IN  A   93.184.216.34
;; Received 56 bytes from 199.43.135.53#53 in 32 ms`,
    examTrap: 'dig is the modern replacement for nslookup on Linux. +trace reveals if a local rogue DNS resolver is intercepting queries.'
  },
  {
    id: 'curl_headers',
    category: 'inspection',
    categoryLabel: 'Host & Network Inspection',
    icon: '🌐',
    command: 'curl -I -k https://target-server.com',
    title: 'Fast HTTP Banner Inspection via CLI',
    examRelevance: 'Domain 4.2 • Passive Reconnaissance & HTTP Response Headers',
    tags: ['-I (Head only)', '-k (Ignore SSL)', 'curl'],
    explanation: 'Fetches only HTTP response headers (-I) without downloading the entire webpage, ignoring untrusted or self-signed certificate warnings (-k).',
    kenyanMetaphor: 'Just peeking your head past the main office reception desk to read the company registration certificate on the wall without entering the boardroom.',
    simulatedOutput: `HTTP/2 200 
server: nginx/1.18.0 (Ubuntu)
date: Sun, 13 Sep 2026 10:24:00 GMT
content-type: text/html; charset=UTF-8
strict-transport-security: max-age=31536000; includeSubDomains
x-frame-options: DENY
x-content-type-options: nosniff
x-xss-protection: 1; mode=block`,
    examTrap: '-k (or --insecure) allows testing servers with self-signed certificates, which is common in private enterprise testing environments.'
  }
];

export default function CommandMasterStudioSim({ onBack }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDrill, setSelectedDrill] = useState(COMMAND_DRILLS[0]);
  const [terminalInput, setTerminalInput] = useState(COMMAND_DRILLS[0].command);
  const [terminalOutput, setTerminalOutput] = useState(COMMAND_DRILLS[0].simulatedOutput);
  const [copiedId, setCopiedId] = useState(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const filteredDrills = COMMAND_DRILLS.filter((drill) => {
    const matchesCategory = activeCategory === 'all' || drill.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      drill.command.toLowerCase().includes(query) ||
      drill.title.toLowerCase().includes(query) ||
      drill.explanation.toLowerCase().includes(query) ||
      drill.tags.some(t => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  const handleSelectDrill = (drill) => {
    sounds.playPop();
    setSelectedDrill(drill);
    setTerminalInput(drill.command);
    setTerminalOutput(drill.simulatedOutput);
  };

  const handleRunCommand = () => {
    sounds.playPop();
    setIsExecuting(true);
    setTerminalOutput('Executing command in sandbox environment...\n');

    setTimeout(() => {
      sounds.playSuccess();
      setIsExecuting(false);
      if (terminalInput.trim() === selectedDrill.command.trim()) {
        setTerminalOutput(selectedDrill.simulatedOutput);
      } else {
        const found = COMMAND_DRILLS.find(d => d.command.trim() === terminalInput.trim());
        if (found) {
          setTerminalOutput(found.simulatedOutput);
        } else {
          setTerminalOutput(`bash: ${terminalInput}: command recognized in playground shell, but exact flags differ.\n\nExpected CompTIA exam command:\n  ${selectedDrill.command}\n\nOutput preview:\n${selectedDrill.simulatedOutput}`);
        }
      }
    }, 450);
  };

  const handleCopyCommand = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    sounds.playPop();
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-8 animate-fadeIn">
      
      {/* Top Header Breadcrumb */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-950 rounded-2xl border-2 border-slate-200 transition-all font-bold text-xs sm:text-sm shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full font-black text-xs">
            CompTIA Security+ SY0-701 • Command Master Drill & Kenyan Metaphors
          </span>
        </div>
      </div>

      {/* Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-400 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl sm:text-5xl">⚡💻</span>
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              CompTIA Command Line Master Drill
            </h1>
            <p className="text-slate-600 font-medium text-xs sm:text-base">
              Master essential flags for <strong>Wireshark / tcpdump</strong>, <strong>Firewalls</strong>, <strong>Nmap</strong>, and <strong>Host Forensics</strong> with everyday Kenyan street analogies!
            </p>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search flags (e.g. -sS, -nn, iptables, DROP, arp, netstat)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-amber-500 focus:outline-none text-xs sm:text-sm font-medium transition-all"
            />
          </div>

          {/* Category Pills (horizontally swipeable on mobile) */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-2 px-2 sm:mx-0 sm:px-0">
            {[
              { id: 'all', label: 'All Commands' },
              { id: 'wireshark', label: '🦈 Wireshark / tcpdump' },
              { id: 'firewalls', label: '🛡️ Firewalls' },
              { id: 'nmap', label: '📡 Nmap Recon' },
              { id: 'inspection', label: '🔍 Host Forensics' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => { sounds.playPop(); setActiveCategory(cat.id); }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs whitespace-nowrap transition-all border shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-amber-500 border-amber-600 text-white shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* TWO-COLUMN WORKSPACE: Left = Command Explorer, Right = Interactive Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT: Command Cards Accordion List (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-black text-slate-500 px-2 uppercase tracking-wider">
            <span>Commands in Playground ({filteredDrills.length})</span>
            <span>Click to load into terminal</span>
          </div>

          <div className="space-y-2.5 max-h-[750px] overflow-y-auto pr-1">
            {filteredDrills.map((drill) => {
              const isSelected = selectedDrill.id === drill.id;

              return (
                <div
                  key={drill.id}
                  onClick={() => handleSelectDrill(drill)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer text-left space-y-2.5 ${
                    isSelected
                      ? 'bg-amber-50/80 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{drill.icon}</span>
                      <span className="font-black text-xs sm:text-sm text-slate-900 line-clamp-1">
                        {drill.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                      {drill.category}
                    </span>
                  </div>

                  {/* Monospace Code Tag */}
                  <div className="p-2 bg-slate-900 rounded-xl font-mono text-[11px] text-amber-300 overflow-x-auto whitespace-nowrap no-scrollbar flex items-center justify-between">
                    <span>$ {drill.command}</span>
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1">
                    {drill.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[10px] font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}

            {filteredDrills.length === 0 && (
              <div className="text-center py-12 bg-white rounded-3xl border-2 border-dashed border-slate-200 p-6 space-y-2">
                <span className="text-3xl">🔍</span>
                <p className="font-bold text-slate-600 text-sm">No commands matched your query</p>
                <p className="text-xs text-slate-400">Try searching for "-sS", "iptables", "netstat", or "pcap"</p>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Active Command Breakdown & Live Terminal (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Breakdown & Kenyan Analogy Box */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-md space-y-4">
            
            <div className="flex items-center justify-between flex-wrap gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-600">
                  {selectedDrill.examRelevance}
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {selectedDrill.title}
                </h3>
              </div>

              <button
                onClick={() => handleCopyCommand(selectedDrill.command, selectedDrill.id)}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
              >
                {copiedId === selectedDrill.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === selectedDrill.id ? 'Copied!' : 'Copy Command'}</span>
              </button>
            </div>

            {/* Plain English Meaning */}
            <div className="space-y-1">
              <span className="text-xs font-black uppercase text-slate-500">Plain English Breakdown:</span>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {selectedDrill.explanation}
              </p>
            </div>

            {/* Kenyan Metaphor Callout */}
            <div className="bg-amber-50/90 border-2 border-amber-300 rounded-2xl p-4 space-y-1">
              <div className="flex items-center gap-2 font-black text-amber-950 text-xs sm:text-sm">
                <span className="text-base">🇰🇪</span>
                <span>Kenyan Everyday Analogy (Nairobi Reality):</span>
              </div>
              <p className="text-xs sm:text-sm italic text-amber-900 font-medium">
                "{selectedDrill.kenyanMetaphor}"
              </p>
            </div>

            {/* CompTIA Exam Tip / Trap */}
            <div className="bg-rose-50 border-2 border-rose-200 rounded-2xl p-3.5 space-y-1 text-xs sm:text-sm text-rose-950 font-medium">
              <div className="flex items-center gap-2 font-black text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>CompTIA Exam Trap / PBQ Watchout:</span>
              </div>
              <p>{selectedDrill.examTrap}</p>
            </div>

          </div>

          {/* SIMULATED INTERACTIVE TERMINAL */}
          <div className="bg-slate-950 rounded-3xl p-4 sm:p-5 border-4 border-slate-800 shadow-2xl space-y-3 font-mono text-white">
            
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-400 pl-2">bash ~ secplus-analyst@workstation</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span>Interactive Sandbox Shell</span>
              </div>
            </div>

            {/* Terminal Input Row */}
            <div className="flex items-center gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
              <span className="text-emerald-400 font-black text-sm">$</span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRunCommand();
                }}
                className="flex-1 bg-transparent text-amber-300 font-mono text-xs sm:text-sm focus:outline-none"
                placeholder="Type or edit command..."
              />
              <button
                onClick={handleRunCommand}
                disabled={isExecuting}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg flex items-center gap-1 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Run</span>
              </button>
            </div>

            {/* Terminal Output Screen */}
            <div className="p-3 bg-black/60 rounded-xl border border-slate-900 text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre leading-relaxed min-h-[180px] max-h-[280px]">
              {terminalOutput}
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-sans">
              <span>💡 Tip: Press Run or hit Enter to execute in the sandbox.</span>
              <button 
                onClick={() => {
                  sounds.playPop();
                  setTerminalInput(selectedDrill.command);
                  setTerminalOutput(selectedDrill.simulatedOutput);
                }}
                className="hover:text-slate-300 flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Terminal</span>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
