// CompTIA Security+ SY0-701 Firewall & ACL Concepts Data

export const FIREWALL_VOCAB = [
  {
    term: 'INBOUND',
    icon: '📥',
    plainMeaning: 'Traffic coming from outside into your network/server.',
    analogy: 'A visitor knocking on your front door from the street.',
    kenyanAnalogy: 'A visitor or boda delivery arriving at your estate barrier gate from the main highway.',
    secPlusImportance: 'High risk! If left open without authentication, hackers can reach internal services.'
  },
  {
    term: 'OUTBOUND',
    icon: '📤',
    plainMeaning: 'Traffic originating from inside your network going out to the internet.',
    analogy: 'You leaving your house to visit a store in town.',
    kenyanAnalogy: 'You driving out of your estate gate heading to Westlands or Mombasa Road.',
    secPlusImportance: 'Usually permitted more freely, but must be monitored to stop malware talking to C2 (Command and Control) servers.'
  },
  {
    term: 'ANY',
    icon: '🌐',
    plainMeaning: 'Wildcard: applies to all IP addresses or all ports without exception.',
    analogy: 'A bouncer sign saying "Anyone from Any Country with Any Shirt".',
    kenyanAnalogy: 'An open gate notice at Uhuru Park admitting anyone from any county without inspection.',
    secPlusImportance: 'Useful for public web servers (ANY can browse port 443), but dangerous if applied to administrative ports like 22 or 3389!'
  },
  {
    term: 'SYN (Synchronize)',
    icon: '👋',
    plainMeaning: 'The 1st packet of the TCP 3-Way Handshake. A client saying "Hello, let us talk!"',
    analogy: 'Waving your hand across a noisy room to get someone’s attention.',
    kenyanAnalogy: 'Flagging down the matatu tout and asking: "Bado kuna kiti?"',
    secPlusImportance: 'Stateful firewalls notice this initial SYN to create a connection tracking entry.'
  },
  {
    term: 'SYN-ACK',
    icon: '🤝',
    plainMeaning: 'The 2nd packet of the handshake. The server saying "I see you! Can you hear me too?"',
    analogy: 'The other person waving back and nodding.',
    kenyanAnalogy: 'The Makanga banging the matatu roof: "Panda, kiti mbili ziko!"',
    secPlusImportance: 'In stateless firewalls with no state table, this inbound return packet gets blocked unless a manual rule exists!'
  },
  {
    term: 'ACK (Acknowledge)',
    icon: '👍',
    plainMeaning: 'The 3rd packet of the handshake. Client says "Received! Connection Established!"',
    analogy: 'A firm high-five or thumbs-up confirming both sides are ready to talk.',
    kenyanAnalogy: 'Stepping onto the footboard with your fare ready and saying "Sawa twende!"',
    secPlusImportance: 'Marks the TCP connection state as ESTABLISHED.'
  },
  {
    term: 'Implicit Deny',
    icon: '🚫',
    plainMeaning: 'The invisible last rule at the bottom of every firewall: Drop anything not explicitly allowed.',
    analogy: 'A nightclub VIP list: if your name is not on the clipboard, you are not getting in.',
    kenyanAnalogy: 'The estate gate rule: If your car registration or name is not in the watchman\'s visitor book, the gate barrier stays firmly locked down.',
    secPlusImportance: 'Core CompTIA principle: Firewalls default to blocking all traffic unless an explicit ALLOW rule permits it.'
  },
  {
    term: 'First Match Wins',
    icon: '🥇',
    plainMeaning: 'Firewalls read rules top-to-bottom. The moment a packet matches a rule, that rule executes and reading stops.',
    analogy: 'An airport customs officer checking your passport against a checklist: the moment they find a match, you are stamped and move on.',
    kenyanAnalogy: 'The Maasai watchman reading his clipboard top-to-bottom: the instant he finds a matching line saying "Pass" or "Block", he acts immediately and never reads the rules below it.',
    secPlusImportance: 'Never put a generic DENY ANY ANY rule above your specific ALLOW rules, or all traffic will be killed!'
  }
];

export const DEFAULT_ACL_RULES = [
  {
    id: 1,
    ruleNumber: 10,
    action: 'ALLOW',
    direction: 'INBOUND',
    sourceIp: 'ANY',
    destIp: '192.168.1.50 (Web Server)',
    port: '443 (HTTPS)',
    protocol: 'TCP',
    description: 'Allow public customers to securely browse the e-commerce website'
  },
  {
    id: 2,
    ruleNumber: 20,
    action: 'ALLOW',
    direction: 'INBOUND',
    sourceIp: '10.10.10.5 (Admin Workstation)',
    destIp: '192.168.1.50 (Web Server)',
    port: '22 (SSH)',
    protocol: 'TCP',
    description: 'Allow authorized Linux administrator to SSH manage the web server'
  },
  {
    id: 3,
    ruleNumber: 30,
    action: 'DENY',
    direction: 'INBOUND',
    sourceIp: 'ANY',
    destIp: 'ANY',
    port: '23 (Telnet)',
    protocol: 'TCP',
    description: 'Block unencrypted Telnet attempts from any outside origin'
  },
  {
    id: 4,
    ruleNumber: 40,
    action: 'ALLOW',
    direction: 'OUTBOUND',
    sourceIp: '192.168.1.0/24 (Internal LAN)',
    destIp: 'ANY',
    port: '53 (DNS)',
    protocol: 'UDP',
    description: 'Allow internal corporate devices to make DNS domain queries'
  }
];

export const TEST_PACKETS = [
  {
    id: 'web_visitor',
    label: '🛒 Public Customer to Web Store',
    direction: 'INBOUND',
    sourceIp: '203.0.113.19 (Public Customer)',
    destIp: '192.168.1.50 (Web Server)',
    port: '443 (HTTPS)',
    protocol: 'TCP',
    expectedOutcome: 'ALLOW',
    matchedRuleNum: 10,
    explanation: 'Matches Rule 10 (ALLOW INBOUND ANY -> 192.168.1.50:443 TCP).'
  },
  {
    id: 'admin_ssh',
    label: '👨‍💻 Internal IT Admin to SSH Server',
    direction: 'INBOUND',
    sourceIp: '10.10.10.5 (Admin Workstation)',
    destIp: '192.168.1.50 (Web Server)',
    port: '22 (SSH)',
    protocol: 'TCP',
    expectedOutcome: 'ALLOW',
    matchedRuleNum: 20,
    explanation: 'Matches Rule 20 (ALLOW INBOUND 10.10.10.5 -> 192.168.1.50:22 TCP).'
  },
  {
    id: 'hacker_telnet',
    label: '🥷 Malicious Hacker probing Telnet',
    direction: 'INBOUND',
    sourceIp: '198.51.100.88 (External Attacker)',
    destIp: '192.168.1.50 (Web Server)',
    port: '23 (Telnet)',
    protocol: 'TCP',
    expectedOutcome: 'DENY',
    matchedRuleNum: 30,
    explanation: 'Matches Rule 30 (DENY INBOUND ANY -> ANY:23 TCP). Blocked explicitly!'
  },
  {
    id: 'hacker_rdp',
    label: '🥷 Ransomware Scanner probing Port 3389 (RDP)',
    direction: 'INBOUND',
    sourceIp: '185.220.101.5 (External Botnet)',
    destIp: '192.168.1.50 (Web Server)',
    port: '3389 (RDP)',
    protocol: 'TCP',
    expectedOutcome: 'DENY',
    matchedRuleNum: 99, // Implicit Deny
    explanation: 'No explicit rule allows Port 3389! Triggers the invisible Rule 99: Implicit Deny (DROP).'
  },
  {
    id: 'unauthorized_ssh',
    label: '👥 Unauthorized Guest trying SSH Port 22',
    direction: 'INBOUND',
    sourceIp: '192.168.1.199 (Rogue Guest Device)',
    destIp: '192.168.1.50 (Web Server)',
    port: '22 (SSH)',
    protocol: 'TCP',
    expectedOutcome: 'DENY',
    matchedRuleNum: 99,
    explanation: 'Rule 20 only permits Admin IP 10.10.10.5. Rogue IP 192.168.1.199 does NOT match, falling through to Implicit Deny!'
  }
];

export const PBQ_CHALLENGES = [
  {
    id: 1,
    title: 'Troubleshoot: The Locked Web Server',
    scenario: 'Customers complain that the public web server (192.168.1.50) is completely unreachable on HTTPS Port 443, even though Rule 20 explicitly says ALLOW INBOUND ANY 192.168.1.50:443!',
    brokenRules: [
      {
        id: 1,
        ruleNum: 10,
        action: 'DENY',
        direction: 'INBOUND',
        sourceIp: 'ANY',
        destIp: 'ANY',
        port: 'ANY',
        protocol: 'ANY',
        comment: 'Generic block rule'
      },
      {
        id: 2,
        ruleNum: 20,
        action: 'ALLOW',
        direction: 'INBOUND',
        sourceIp: 'ANY',
        destIp: '192.168.1.50',
        port: '443',
        protocol: 'TCP',
        comment: 'E-commerce web store'
      }
    ],
    question: 'Why can’t web visitors reach Port 443?',
    options: [
      {
        id: 'opt1',
        text: 'Because Rule 10 (DENY ANY ANY) is evaluated first! In firewalls, "First Match Wins", so all traffic is killed before reaching Rule 20.',
        isCorrect: true,
        fixAction: 'Move Rule 20 ABOVE Rule 10, or delete Rule 10 so Implicit Deny handles unmatched traffic.'
      },
      {
        id: 'opt2',
        text: 'Because HTTPS requires UDP instead of TCP protocol.',
        isCorrect: false,
        feedback: 'Incorrect! HTTPS operates over TCP Port 443.'
      },
      {
        id: 'opt3',
        text: 'Because Port 443 is unencrypted and firewalls reject cleartext by default.',
        isCorrect: false,
        feedback: 'Incorrect! Port 443 is encrypted HTTPS.'
      }
    ],
    compTiaTakeaway: 'Rule ordering is crucial! Specific permit rules must always be placed BEFORE broad deny rules. The invisible Implicit Deny at the very end will naturally drop anything left over.',
    kenyanMetaphor: 'The Estate Guard with a Backwards Clipboard: Line 1 says "Block everybody from entering compound", while Line 2 says "Allow the Governor to enter". When the Governor arrives, the guard stops reading at Line 1 and turns him away because First Match Wins!'
  },
  {
    id: 2,
    title: 'Troubleshoot: The Direction Disaster',
    scenario: 'An IT technician configured a firewall rule to allow remote administrators on the internet to SSH into the corporate management gateway (10.0.0.1). But admins report they still cannot connect from outside!',
    brokenRules: [
      {
        id: 1,
        ruleNum: 10,
        action: 'ALLOW',
        direction: 'OUTBOUND',
        sourceIp: 'ANY',
        destIp: '10.0.0.1',
        port: '22',
        protocol: 'TCP',
        comment: 'Intended to let external admins in'
      }
    ],
    question: 'What is the fatal flaw in Rule 10?',
    options: [
      {
        id: 'opt1',
        text: 'The direction is set to OUTBOUND instead of INBOUND! Traffic coming from external admins into the gateway is INBOUND.',
        isCorrect: true,
        fixAction: 'Change Direction from OUTBOUND to INBOUND.'
      },
      {
        id: 'opt2',
        text: 'SSH uses Port 23 instead of Port 22.',
        isCorrect: false,
        feedback: 'No! SSH is Port 22. Telnet is 23.'
      },
      {
        id: 'opt3',
        text: 'Source IP should be set to 127.0.0.1.',
        isCorrect: false,
        feedback: '127.0.0.1 is localhost loopback, not external admins.'
      }
    ],
    compTiaTakeaway: 'Directionality (INBOUND vs OUTBOUND) is a favorite CompTIA exam trap. Inbound governs external packets entering your interface; Outbound governs internal packets leaving your interface.',
    kenyanMetaphor: 'The Confused Gate Guard: The guard was instructed to check cars "driving OUT of the estate" (OUTBOUND), while the visitors are actually trying to drive IN from the highway (INBOUND). Because the direction was reversed, the visitors get stuck outside!'
  },
  {
    id: 3,
    title: 'Troubleshoot: Database Port Exposed to the World',
    scenario: 'A security auditor discovers that the internal customer database server (192.168.1.100) on Port 3306 (MySQL) can be directly queried by anyone on the public internet! Inspect the rule below.',
    brokenRules: [
      {
        id: 1,
        ruleNum: 10,
        action: 'ALLOW',
        direction: 'INBOUND',
        sourceIp: 'ANY',
        destIp: '192.168.1.100',
        port: '3306',
        protocol: 'TCP',
        comment: 'Intended for the internal web app backend only'
      }
    ],
    question: 'How should this rule be remediated to follow the principle of Least Privilege?',
    options: [
      {
        id: 'opt1',
        text: 'Change Source IP from ANY to the specific Web Server IP (e.g. 192.168.1.50) so only the authorized backend web application can communicate with the database.',
        isCorrect: true,
        fixAction: 'Restrict Source IP from ANY to 192.168.1.50/32.'
      },
      {
        id: 'opt2',
        text: 'Change Port 3306 to Port 80.',
        isCorrect: false,
        feedback: 'Incorrect! Port 80 is unencrypted HTTP, not MySQL database.'
      },
      {
        id: 'opt3',
        text: 'Change the Protocol from TCP to UDP.',
        isCorrect: false,
        feedback: 'MySQL uses reliable TCP connections.'
      }
    ],
    compTiaTakeaway: 'Never use ANY for sensitive backend database ports! Database ports should only accept connections from verified application tiers within an internal screened subnet (DMZ).',
    kenyanMetaphor: 'Leaving the M-Pesa Till on the Pavement: Setting Source ANY on MySQL 3306 is like moving your shop\'s cash drawer onto the Mombasa Road walkway for any passerby to touch. Only the verified shop cashier (Web Server) should have access to the cash till!'
  },
  {
    id: 4,
    title: 'Troubleshoot: Multi-Homed Screened Subnet (DMZ) Routing Breach',
    scenario: 'A company deployed a screened subnet (DMZ) with a public web server (172.16.10.5) and an internal finance server (10.0.1.50). An attacker breached the web server and successfully pivoted laterally into the internal finance database! Inspect the firewall rule.',
    brokenRules: [
      {
        id: 1,
        ruleNum: 10,
        action: 'ALLOW',
        direction: 'INBOUND',
        sourceIp: '172.16.10.0/24 (DMZ)',
        destIp: '10.0.1.0/24 (Internal LAN)',
        port: 'ANY',
        protocol: 'ANY',
        comment: 'Intended to let web server fetch database updates'
      }
    ],
    question: 'What fundamental network segmentation principle was violated by Rule 10?',
    options: [
      {
        id: 'opt1',
        text: 'The rule allows ANY traffic initiated from the DMZ directly into the Private Internal LAN! DMZ servers should NEVER initiate unconstrained sessions into the internal network.',
        isCorrect: true,
        fixAction: 'Change rule to DROP inbound from DMZ to Internal LAN, and only permit specific database port (e.g. 3306) initiated by internal hosts or restricted to the specific DB server IP with conntrack established inspection.'
      },
      {
        id: 'opt2',
        text: 'The DMZ network must use public routable IP addresses instead of 172.16.10.0/24.',
        isCorrect: false,
        feedback: 'DMZs frequently use private RFC 1918 addresses behind NAT.'
      },
      {
        id: 'opt3',
        text: 'Firewalls cannot filter traffic between subnets.',
        isCorrect: false,
        feedback: 'Firewalls route and filter inter-subnet traffic constantly.'
      }
    ],
    compTiaTakeaway: 'The "Golden DMZ Rule": Traffic may flow from Internal LAN ➡️ DMZ, and from Internet ➡️ DMZ, but traffic initiated from the DMZ ➡️ Internal LAN must be strictly denied or tightly controlled to prevent compromised public servers from pivoting laterally!',
    kenyanMetaphor: 'The Guest Waiting Bench Breach: The DMZ is like the visitor waiting bench outside your house. Rule 10 allowed anyone sitting on the bench to freely open the locked master bedroom door where the family safe is kept! Guests on the bench should never enter the private rooms.'
  },
  {
    id: 5,
    title: 'Troubleshoot: Destination NAT / Port Forwarding Web Server Offline',
    scenario: 'An enterprise has a single public IP (203.0.113.10) and hosts an internal web server at private IP 192.168.1.80. External customers complain that connecting to https://203.0.113.10 gives a timeout error. Inspect the NAT and Filter rules.',
    brokenRules: [
      {
        id: 1,
        ruleNum: 10,
        action: 'DNAT (Port Forward)',
        direction: 'INBOUND',
        sourceIp: 'ANY',
        destIp: '203.0.113.10:443',
        port: 'Forward to 192.168.1.80:443',
        protocol: 'TCP',
        comment: 'DNAT translates public IP to internal private IP'
      },
      {
        id: 2,
        ruleNum: 20,
        action: 'ALLOW',
        direction: 'INBOUND',
        sourceIp: 'ANY',
        destIp: '203.0.113.10',
        port: '443',
        protocol: 'TCP',
        comment: 'Filter rule written against public IP instead of translated private IP'
      }
    ],
    question: 'Why does the firewall drop the web traffic even though Rule 20 appears to allow Port 443?',
    options: [
      {
        id: 'opt1',
        text: 'In firewalls where DNAT happens before packet filtering (PREROUTING), the firewall evaluates rules against the translated PRIVATE destination IP (192.168.1.80), so the packet fails to match Rule 20 and hits Implicit Deny!',
        isCorrect: true,
        fixAction: 'Update Rule 20 destination IP from 203.0.113.10 to 192.168.1.80.'
      },
      {
        id: 'opt2',
        text: 'HTTPS cannot work across NAT routers.',
        isCorrect: false,
        feedback: 'HTTPS works perfectly across Destination NAT (Port Forwarding).'
      },
      {
        id: 'opt3',
        text: 'NAT requires UDP instead of TCP.',
        isCorrect: false,
        feedback: 'NAT handles both TCP and UDP translation.'
      }
    ],
    compTiaTakeaway: 'In Destination NAT (DNAT/Port Forwarding), the firewall modifies the destination header before applying security filter rules. Filter rules must match the destination IP that the packet actually carries when entering the filter chain.',
    kenyanMetaphor: 'The Post Office Parcel Re-Tag Trap: A parcel arrives addressed to "Nairobi GPO Box 10" (Public IP) and the postal clerk re-labels it for "Internal Desk 80" (Private IP). But the desk security guard checks his checklist for "GPO Box 10". Since the parcel now says "Desk 80", he refuses to accept it and drops it!'
  },
  {
    id: 6,
    title: 'Troubleshoot: Ransomware C2 Egress Data Exfiltration',
    scenario: 'A workstation infected with ransomware reached out to a Command & Control (C2) server on the internet and exfiltrated 500 MB of proprietary PDFs over Port 4444 (TCP). Security audit shows the firewall ruleset below.',
    brokenRules: [
      {
        id: 1,
        ruleNum: 10,
        action: 'ALLOW',
        direction: 'OUTBOUND',
        sourceIp: '192.168.1.0/24 (Internal LAN)',
        destIp: 'ANY',
        port: 'ANY',
        protocol: 'ANY',
        comment: 'Default Outbound Any/Any permit'
      }
    ],
    question: 'How should the outbound egress firewall policy be redesigned to stop unauthorized reverse shells and data exfiltration?',
    options: [
      {
        id: 'opt1',
        text: 'Enforce Egress Filtering: Replace OUTBOUND ANY ANY with explicit permit rules only for required business ports (e.g. 53 DNS, 443 HTTPS via Proxy), and set Default Outbound to DENY.',
        isCorrect: true,
        fixAction: 'Change Outbound Policy to Default Deny and enforce an Application-Aware Egress Proxy.'
      },
      {
        id: 'opt2',
        text: 'Block Inbound Port 4444 instead.',
        isCorrect: false,
        feedback: 'The malware initiated an OUTBOUND reverse connection from inside; inbound blocking has zero effect!'
      },
      {
        id: 'opt3',
        text: 'Change internal subnet to 10.0.0.0/8.',
        isCorrect: false,
        feedback: 'Changing subnet IPs does not restrict outbound ports.'
      }
    ],
    compTiaTakeaway: 'CompTIA Security+ emphasizes Egress Filtering! Unrestricted outbound rules (Outbound ANY ANY) allow malware to establish reverse shells (e.g. Meterpreter/Netcat) and exfiltrate data over non-standard high ports like 4444.',
    kenyanMetaphor: 'The Unguarded Estate Exit Gate: The guards check every car entering the estate, but let any truck drive OUT with full sacks of company copper wires without looking in the trunk (Outbound ANY ANY). Egress filtering means inspecting trunks before letting anyone drive out!'
  }
];
