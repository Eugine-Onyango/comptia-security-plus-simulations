// CompTIA Security+ SY0-701 Core Ports Data
// Designed for beginners, dropouts, elderly, and visual learners with crystal-clear metaphors.

export const PORT_DATA = [
  // --- The Web Twins ---
  {
    port: 80,
    protocol: 'HTTP',
    fullName: 'HyperText Transfer Protocol',
    category: 'web',
    clerk: 'The Public Megaphone Butler',
    emoji: '📢',
    twinPort: 443,
    isSecure: false,
    securityBadge: 'INSECURE (Cleartext Postcard)',
    transport: 'TCP',
    hotelRoom: 'Room 80: The Glass Balcony',
    simpleAnalogy: 'Like yelling your credit card number through a paper cone from a balcony. Anyone standing in the street below can hear every single word!',
    whyHackersLoveIt: 'Eavesdroppers running Wireshark on public Wi-Fi can see your passwords and session cookies in plain English without cracking anything.',
    examCheatCode: 'If a scenario mentions unencrypted web traffic or port 80, the CompTIA Sec+ solution is ALWAYS to upgrade to HTTPS on Port 443 with TLS certificates.',
    packetPayload: 'GET /login?user=eugene&pass=SuperSecret999 HTTP/1.1',
    scrambledPayload: 'N/A (Readable by anyone!)'
  },
  {
    port: 443,
    protocol: 'HTTPS',
    fullName: 'HyperText Transfer Protocol Secure (TLS)',
    category: 'web',
    clerk: 'The Armored Vault Guard',
    emoji: '🛡️',
    twinPort: 80,
    isSecure: true,
    securityBadge: 'SECURE (Encrypted Safe)',
    transport: 'TCP',
    hotelRoom: 'Room 443: The Titanium Vault',
    simpleAnalogy: 'Like placing your letter inside a reinforced titanium lockbox with a heavy combination lock before sliding it through the mail chute.',
    whyHackersLoveIt: 'Hackers HATE this! Even if they tap the wire, they only see garbled mathematical salad. They cannot read your passwords or cookies.',
    examCheatCode: 'Always uses TLS (Transport Layer Security) encryption. Required for e-commerce, banking, logins, and compliance (PCI-DSS / HIPAA).',
    packetPayload: 'Encrypted TLS 1.3 Record: [Application Data]',
    scrambledPayload: '3a f9 b8 01 7e 8a c9 f2 0b 44 ... (Garbled noise!)'
  },

  // --- The Remote Terminal Twins ---
  {
    port: 23,
    protocol: 'Telnet',
    fullName: 'Teletype Network',
    category: 'remote',
    clerk: 'The Glass Phone Booth Clerk',
    emoji: '📞',
    twinPort: 22,
    isSecure: false,
    securityBadge: 'INSECURE (Naked Postcard)',
    transport: 'TCP',
    hotelRoom: 'Room 23: The Transparent Glass Booth',
    simpleAnalogy: 'Like making a confidential phone call inside a see-through glass booth with loudspeakers pointing outside into the hotel lobby.',
    whyHackersLoveIt: 'Telnet was invented in 1969 before the internet had bad guys. It sends usernames and passwords as raw plain text over the wire.',
    examCheatCode: 'NEVER use Telnet! Whenever you see Telnet in a CompTIA question, replace it with SSH (Port 22) immediately to remediate the vulnerability.',
    packetPayload: 'login: admin | password: routerpassword2024!',
    scrambledPayload: 'N/A (Naked credentials exposed!)'
  },
  {
    port: 22,
    protocol: 'SSH / SFTP',
    fullName: 'Secure Shell / Secure File Transfer Protocol',
    category: 'remote',
    clerk: 'The Secret Agent Tunnel Master',
    emoji: '🕵️‍♂️',
    twinPort: 23,
    isSecure: true,
    securityBadge: 'SECURE (Cryptographic Tunnel)',
    transport: 'TCP',
    hotelRoom: 'Room 22: The Soundproof Steel Bunker',
    simpleAnalogy: 'A soundproof private underground subway between your laptop and the server. Even if someone digs into the ground, all they find is solid rock.',
    whyHackersLoveIt: 'Provides strong asymmetric key authentication and symmetric encryption. Also used by SFTP to move files securely across the wire.',
    examCheatCode: 'SSH (Port 22) is the secure replacement for Telnet (23) for CLI management, and SFTP (also Port 22) is the secure replacement for FTP (21)!',
    packetPayload: 'SSH-2.0-OpenSSH_8.9p1 [Diffie-Hellman Key Exchange + AES-GCM]',
    scrambledPayload: '8d e2 11 ff 99 a3 00 4c be 72 ... (Impenetrable cipher)'
  },

  // --- The File Transfer Twins ---
  {
    port: 21,
    protocol: 'FTP',
    fullName: 'File Transfer Protocol (Control: 21, Data: 20)',
    category: 'files',
    clerk: 'The Open Window Mail Clerk',
    emoji: '📂',
    twinPort: 22,
    isSecure: false,
    securityBadge: 'INSECURE (Cleartext Files)',
    transport: 'TCP',
    hotelRoom: 'Room 21: The Open Hallway Mail Slot',
    simpleAnalogy: 'Dropping payroll files and employee records onto an open table in the hallway for anyone walking past to look at.',
    whyHackersLoveIt: 'FTP commands and file contents fly across the network with zero encryption. Attackers capture employee lists and proprietary documents instantly.',
    examCheatCode: 'CompTIA tests FTP vs SFTP (Port 22) and FTPS (Port 989/990). SFTP piggybacks on SSH; FTPS wraps legacy FTP inside SSL/TLS.',
    packetPayload: 'USER payroll_admin | PASS secretbonus2024 | RETR salaries.csv',
    scrambledPayload: 'N/A (Completely plain text!)'
  },
  {
    port: 990,
    protocol: 'FTPS',
    fullName: 'FTP over SSL / TLS (Ports 989/990)',
    category: 'files',
    clerk: 'The Armored Mail Courier',
    emoji: '🗄️',
    twinPort: 21,
    isSecure: true,
    securityBadge: 'SECURE (TLS Wrapped)',
    transport: 'TCP',
    hotelRoom: 'Room 990: The Padlocked Mail Depot',
    simpleAnalogy: 'Standard FTP, but placed inside an armored diplomatic pouch sealed with a digital wax seal (TLS certificate).',
    whyHackersLoveIt: 'Protects the files with TLS encryption. Do not confuse with SFTP (Port 22) — FTPS uses SSL/TLS certificates and ports 989/990.',
    examCheatCode: 'CompTIA trap: SFTP = Port 22 (SSH based). FTPS = Ports 989/990 (SSL/TLS based). Both protect files, but operate on different ports!',
    packetPayload: 'TLS Handshake: Handshake Protocol [Certificate + Encrypted Data]',
    scrambledPayload: '77 c1 bb 44 aa 09 82 ... (Ciphertext)'
  },

  // --- The Directory Login Twins ---
  {
    port: 389,
    protocol: 'LDAP',
    fullName: 'Lightweight Directory Access Protocol',
    category: 'directory',
    clerk: 'The Open Rolodex Librarian',
    emoji: '📇',
    twinPort: 636,
    isSecure: false,
    securityBadge: 'INSECURE (Plain Phonebook)',
    transport: 'TCP/UDP',
    hotelRoom: 'Room 389: The Unlocked Filing Cabinet',
    simpleAnalogy: 'A guest directory binder sitting on the front desk. Anyone who flips through can see every employee’s job title, email, and department.',
    whyHackersLoveIt: 'When users authenticate to an LDAP directory (like Active Directory) without TLS, authentication hashes or passwords can be intercepted.',
    examCheatCode: 'Whenever Active Directory or LDAP authentication is traversing an untrusted network, upgrade to LDAPS (Port 636) with certificates.',
    packetPayload: 'LDAP Message: bindRequest(3) simple bind "cn=admin" pass="companyPass"',
    scrambledPayload: 'N/A (Cleartext bind request!)'
  },
  {
    port: 636,
    protocol: 'LDAPS',
    fullName: 'Lightweight Directory Access Protocol Secure (TLS)',
    category: 'directory',
    clerk: 'The Biometric Directory Guardian',
    emoji: '🔐',
    twinPort: 389,
    isSecure: true,
    securityBadge: 'SECURE (TLS Encrypted)',
    transport: 'TCP',
    hotelRoom: 'Room 636: The Vault Directory Room',
    simpleAnalogy: 'The company directory locked inside a retinal-scan vault. Only verified users can look up colleagues, and queries are encrypted.',
    whyHackersLoveIt: 'Stops directory enumeration and credential theft on corporate networks. Enforces server identity through X.509 certificates.',
    examCheatCode: 'Port 636 is LDAPS. If an exam question asks how to secure Active Directory queries against network eavesdropping, choose LDAPS 636.',
    packetPayload: 'LDAPS Encrypted Payload [TLS 1.3 - Record Layer]',
    scrambledPayload: 'fe a1 04 99 21 b3 cc 78 ... (Fully protected)'
  },

  // --- The Email Trio ---
  {
    port: 25,
    protocol: 'SMTP',
    fullName: 'Simple Mail Transfer Protocol',
    category: 'email',
    clerk: 'The Outbound Postman',
    emoji: '📤',
    twinPort: 587,
    isSecure: false,
    securityBadge: 'INSECURE (Raw Outbound)',
    transport: 'TCP',
    hotelRoom: 'Room 25: The Outgoing Mail Box',
    simpleAnalogy: 'Dropping postcards into a public mailbox. Postmen and bystanders can flip it over and read every sentence.',
    whyHackersLoveIt: 'Legacy SMTP has no built-in encryption or authentication by default. Hackers love spoofing spam and sniffing sensitive emails.',
    examCheatCode: 'Port 25 is used for server-to-server mail relays. For secure client mail submission, CompTIA looks for Port 587 (or Port 465 with SMTPS).',
    packetPayload: 'MAIL FROM:<ceo@company.com> RCPT TO:<cfo@company.com> DATA: Wire $50k',
    scrambledPayload: 'N/A (Unsigned, unencrypted postcard)'
  },
  {
    port: 110,
    protocol: 'POP3',
    fullName: 'Post Office Protocol version 3',
    category: 'email',
    clerk: 'The One-Way Mail Collector',
    emoji: '📬',
    twinPort: 995,
    isSecure: false,
    securityBadge: 'INSECURE (Cleartext Download)',
    transport: 'TCP',
    hotelRoom: 'Room 110: The Single-Use Mail Slot',
    simpleAnalogy: 'Emptying your post office box into a paper bag, taking it home, and deleting it from the post office box so nobody else can read it.',
    whyHackersLoveIt: 'Downloads email to one device and deletes it from the server. Login passwords are transmitted in clear text across port 110.',
    examCheatCode: 'Insecure email retrieval is Port 110 (POP3). The secure encrypted twin is Port 995 (POP3S). Remember: POP downloads and empties the mailbox.',
    packetPayload: 'USER alice | PASS alicesecret123 | RETR 1',
    scrambledPayload: 'N/A (Readable credentials!)'
  },
  {
    port: 995,
    protocol: 'POP3S',
    fullName: 'Post Office Protocol version 3 Secure (TLS)',
    category: 'email',
    clerk: 'The Armored Mail Collector',
    emoji: '📭',
    twinPort: 110,
    isSecure: true,
    securityBadge: 'SECURE (TLS Mail Download)',
    transport: 'TCP',
    hotelRoom: 'Room 995: The Armored Mail Box',
    simpleAnalogy: 'A secure courier hand-delivers your mail directly into your briefcase inside an armored truck.',
    whyHackersLoveIt: 'Enforces TLS encryption for password authentication and email message download.',
    examCheatCode: 'Port 995 = POP3S. Used when an organization requires encrypted POP3 mail retrieval.',
    packetPayload: 'POP3S [TLS Handshake + Encrypted Mailbox Retrieval]',
    scrambledPayload: '9c 4b 12 ef 00 a1 de 54 ... (Encrypted)'
  },
  {
    port: 143,
    protocol: 'IMAP',
    fullName: 'Internet Message Access Protocol',
    category: 'email',
    clerk: 'The Multi-Device Mail Synchronizer',
    emoji: '✉️',
    twinPort: 993,
    isSecure: false,
    securityBadge: 'INSECURE (Cleartext Sync)',
    transport: 'TCP',
    hotelRoom: 'Room 143: The Shared Mail Mirror',
    simpleAnalogy: 'A bulletin board where your mail stays posted so you can read it on your phone, laptop, and tablet at the same time, but in plain text.',
    whyHackersLoveIt: 'Allows syncing across devices, but without TLS, your email passwords and messages travel in plain sight on port 143.',
    examCheatCode: 'Port 143 = IMAP (Cleartext). The secure encrypted twin is Port 993 (IMAPS). IMAP keeps mail on the server; POP downloads it.',
    packetPayload: 'a001 LOGIN bob bobpassword123',
    scrambledPayload: 'N/A (Cleartext credentials!)'
  },
  {
    port: 993,
    protocol: 'IMAPS',
    fullName: 'Internet Message Access Protocol Secure (TLS)',
    category: 'email',
    clerk: 'The Armored Multi-Device Synchronizer',
    emoji: '🛡️✉️',
    twinPort: 143,
    isSecure: true,
    securityBadge: 'SECURE (TLS Mail Sync)',
    transport: 'TCP',
    hotelRoom: 'Room 993: The High-Tech Sync Chamber',
    simpleAnalogy: 'A futuristic digital mirror that lets all your phones and laptops view your inbox securely through encrypted glass.',
    whyHackersLoveIt: 'All device syncing and credentials are encrypted with TLS, blocking Wireshark packet sniffers completely.',
    examCheatCode: 'Port 993 = IMAPS. Modern email apps (Outlook, Apple Mail, Gmail) default to 993 for secure IMAP sync.',
    packetPayload: 'IMAPS TLS Session [Synchronizing Inbox Folders Encrypted]',
    scrambledPayload: '55 12 8e ca df 30 11 99 ... (Secure)'
  },

  // --- Critical Infrastructure Services ---
  {
    port: 53,
    protocol: 'DNS',
    fullName: 'Domain Name System',
    category: 'infrastructure',
    clerk: 'The Hotel Phonebook Librarian',
    emoji: '📖',
    twinPort: null,
    isSecure: false,
    securityBadge: 'CRITICAL (The Internet Phonebook)',
    transport: 'UDP / TCP (Zone transfers)',
    hotelRoom: 'Room 53: The Grand Phonebook Desk',
    simpleAnalogy: 'The front desk directory that translates human names like "google.com" into the actual room number "142.250.190.46".',
    whyHackersLoveIt: 'DNS Poisoning / Spoofing: If a hacker changes the phonebook entry, they can trick you into going to a fake bank website!',
    examCheatCode: 'Standard DNS uses UDP Port 53. Zone transfers between servers use TCP Port 53. CompTIA loves testing DNSSEC (digital signatures on records to stop spoofing).',
    packetPayload: 'DNS Query: Standard query 0x1a2b A google.com',
    scrambledPayload: 'Replies: 142.250.190.46 (Plain text query/response)'
  },
  {
    port: 88,
    protocol: 'Kerberos',
    fullName: 'Kerberos Authentication Protocol',
    category: 'infrastructure',
    clerk: 'The Carnival Ticket Booth Master',
    emoji: '🎟️',
    twinPort: null,
    isSecure: true,
    securityBadge: 'SECURE (Ticket Granting Service)',
    transport: 'TCP / UDP',
    hotelRoom: 'Room 88: The VIP Ticket Booth',
    simpleAnalogy: 'At an amusement park, you show your ID once at the front gate, get a wristband (Ticket Granting Ticket), and ride rollercoasters all day without showing ID again.',
    whyHackersLoveIt: 'Hackers target Kerberos tickets with "Golden Ticket" or "Silver Ticket" attacks, or "Kerberoasting" to steal administrative privileges.',
    examCheatCode: 'Port 88 = Kerberos. Used by Windows Active Directory for Single Sign-On (SSO). Highly reliant on accurate time (NTP Port 123) to prevent replay attacks!',
    packetPayload: 'KRB_AS_REQ (Authentication Service Request) [TGT Ticket]',
    scrambledPayload: 'Ticket encrypted with KDC secret key!'
  },
  {
    port: 123,
    protocol: 'NTP',
    fullName: 'Network Time Protocol',
    category: 'infrastructure',
    clerk: 'The Grand Wall Clock Keeper',
    emoji: '⏰',
    twinPort: null,
    isSecure: false,
    securityBadge: 'CRITICAL (Network Heartbeat Clock)',
    transport: 'UDP',
    hotelRoom: 'Room 123: The Master Atomic Clock',
    simpleAnalogy: 'The big grandfather clock in the main hotel lobby that every guest and computer synchronizes their watches with.',
    whyHackersLoveIt: 'If clocks desynchronize by more than 5 minutes, Kerberos authentication FAILS, digital certificates fail to validate, and forensic log correlation is destroyed!',
    examCheatCode: 'Port 123 = NTP (Network Time Protocol). Essential for forensic analysis, audit logs, and Kerberos time-skew tolerance (default max 5 minutes).',
    packetPayload: 'NTP Client packet: Transmit Timestamp 2026-09-04 03:00:00 UTC',
    scrambledPayload: 'Stratum 1 atomic sync signal'
  },
  {
    port: 3389,
    protocol: 'RDP',
    fullName: 'Remote Desktop Protocol',
    category: 'remote',
    clerk: 'The Remote Puppet Master',
    emoji: '🖥️',
    twinPort: null,
    isSecure: true,
    securityBadge: 'DANGEROUS IF EXPOSED (GUI Remote Control)',
    transport: 'TCP / UDP',
    hotelRoom: 'Room 3389: The Master Control Chair',
    simpleAnalogy: 'Sitting in a control room where you can see the remote computer screen and move its mouse as if you were physically sitting in its office chair.',
    whyHackersLoveIt: 'The #1 entry point for ransomware attacks worldwide! Hackers scan the internet for open Port 3389, brute-force passwords, and take over companies.',
    examCheatCode: 'Port 3389 = RDP. NEVER expose Port 3389 directly to the public internet! Always place RDP behind a secure VPN or Remote Desktop Gateway.',
    packetPayload: 'T.125 / RDP Connection Request PDU [Negotiate TLS / CredSSP]',
    scrambledPayload: 'Encrypted screen display bitmaps & keyboard input'
  },
  {
    port: 161,
    protocol: 'SNMP',
    fullName: 'Simple Network Management Protocol (161/162)',
    category: 'infrastructure',
    clerk: 'The Building Maintenance Inspector',
    emoji: '📻',
    twinPort: null,
    isSecure: false,
    securityBadge: 'INSECURE v1/v2 vs SECURE v3',
    transport: 'UDP (161 Queries, 162 Traps)',
    hotelRoom: 'Room 161: The Maintenance Walkie-Talkie Desk',
    simpleAnalogy: 'The hotel facilities manager checking boiler temperatures and elevator power using a walkie-talkie.',
    whyHackersLoveIt: 'SNMP v1 and v2 use unencrypted "Community Strings" (passwords like "public" or "private"). Hackers snoop these to map your entire network topology!',
    examCheatCode: 'CompTIA heavily tests SNMP versions: SNMPv1 and SNMPv2c are plaintext and dangerous. ALWAYS upgrade to SNMPv3 because it adds Authentication and Encryption (AuthPriv)!',
    packetPayload: 'SNMPv2c GetRequest: community="public" OID=1.3.6.1.2.1.1.1.0',
    scrambledPayload: 'SNMPv3 encrypted with SHA / AES authPriv'
  },
  {
    port: 67,
    protocol: 'DHCP',
    fullName: 'Dynamic Host Configuration Protocol (Server 67, Client 68)',
    category: 'infrastructure',
    clerk: 'The Room Key Card Receptionist',
    emoji: '🏷️',
    twinPort: null,
    isSecure: false,
    securityBadge: 'CRITICAL (Automatic Address Dispenser)',
    transport: 'UDP (67 Server / 68 Client)',
    hotelRoom: 'Room 67/68: The Front Desk Keycard Station',
    simpleAnalogy: 'When a new guest arrives with no room number, the front desk hands them a magnetic keycard with a temporary room address and checkout time.',
    whyHackersLoveIt: 'Rogue DHCP Attacks: A malicious laptop pretends to be the front desk, hands out fake IP addresses and fake DNS servers to hijack all user traffic!',
    examCheatCode: 'DHCP uses UDP Port 67 (Server listening) and Port 68 (Client). CompTIA defense against rogue DHCP servers: "DHCP Snooping" on network switches.',
    packetPayload: 'DHCP Discover / Offer / Request / ACK (DORA) lease=86400s',
    scrambledPayload: 'Broadcast frames across local subnet'
  }
];

export const TWIN_PAIRS = [
  {
    title: 'The Web Browsing Twins',
    icon: '🌐',
    desc: 'Reading a public postcard vs opening an armored lockbox',
    insecure: 80,
    secure: 443,
    summary: 'HTTP (80) transmits naked text; HTTPS (443) encrypts everything with TLS.'
  },
  {
    title: 'The Remote Terminal Twins',
    icon: '💻',
    desc: 'Shouting passwords in a glass booth vs soundproof secret bunker',
    insecure: 23,
    secure: 22,
    summary: 'Telnet (23) leaks credentials; SSH (22) encrypts command lines and logins.'
  },
  {
    title: 'The File Transfer Twins',
    icon: '📁',
    desc: 'Leaving files on a public table vs shipping in a secret vault',
    insecure: 21,
    secure: 22,
    alternateSecure: 990,
    summary: 'FTP (21) is cleartext; SFTP (22) runs over SSH, and FTPS (990) runs over TLS.'
  },
  {
    title: 'The Active Directory / Login Twins',
    icon: '📇',
    desc: 'Flipping through an open binder vs locked biometric lookup',
    insecure: 389,
    secure: 636,
    summary: 'LDAP (389) transmits directory lookups in plain text; LDAPS (636) encrypts with TLS.'
  },
  {
    title: 'The Mail Fetching Twins (POP3)',
    icon: '📬',
    desc: 'Collecting mail in a see-through bag vs armored briefcase',
    insecure: 110,
    secure: 995,
    summary: 'POP3 (110) downloads mail unencrypted; POP3S (995) wraps the download in TLS.'
  },
  {
    title: 'The Mail Synchronization Twins (IMAP)',
    icon: '✉️',
    desc: 'Public message board vs encrypted digital mirror across devices',
    insecure: 143,
    secure: 993,
    summary: 'IMAP (143) syncs mail across devices in cleartext; IMAPS (993) protects sync with TLS.'
  }
];

export const BOUNCER_CHALLENGES = [
  {
    id: 1,
    guest: 'Alice from Accounting 💼',
    request: '“I need to submit my corporate credit card payment on the supplier’s website without eavesdroppers on the coffee shop Wi-Fi stealing the digits!”',
    question: 'Which hotel door must Alice knock on?',
    options: [
      { port: 80, name: 'Door 80 (HTTP)', explanation: 'Wrong! Door 80 sends her credit card in clear plain text for any hacker with Wireshark to steal!' },
      { port: 443, name: 'Door 443 (HTTPS)', explanation: 'CORRECT! Door 443 wraps the web session in TLS encryption, keeping credit card numbers completely private.', isCorrect: true },
      { port: 23, name: 'Door 23 (Telnet)', explanation: 'No! Telnet is an ancient unencrypted remote terminal, not a web protocol.' },
      { port: 53, name: 'Door 53 (DNS)', explanation: 'No! DNS looks up domain names, it does not encrypt web checkout sessions.' }
    ],
    compTiaTip: 'CompTIA always expects web traffic containing credentials or personal data to traverse HTTPS on Port 443.'
  },
  {
    id: 2,
    guest: 'DevOps Dave 🐧',
    request: '“I need to log into our Linux web server remotely from home and type root commands. My security officer said unencrypted cleartext passwords are forbidden!”',
    question: 'Which door should Dave enter?',
    options: [
      { port: 23, name: 'Door 23 (Telnet)', explanation: 'Busted! Telnet transmits the root password in naked cleartext across the internet!' },
      { port: 21, name: 'Door 21 (FTP)', explanation: 'Incorrect! FTP is for moving files, not managing a terminal, and it is also unencrypted.' },
      { port: 22, name: 'Door 22 (SSH)', explanation: 'CORRECT! SSH on Port 22 creates an encrypted cryptographic tunnel for secure remote server administration.', isCorrect: true },
      { port: 389, name: 'Door 389 (LDAP)', explanation: 'No! LDAP is a directory lookup service, not a remote shell.' }
    ],
    compTiaTip: 'SSH on Port 22 is the standard secure replacement for Telnet (Port 23).'
  },
  {
    id: 3,
    guest: 'The Mysterious Internet Stranger 🥷',
    request: '“Hey bouncer, I want direct, open, unauthenticated access into the building so I can see the Windows desktop screen and move the mouse!”',
    question: 'The stranger is targeting Port 3389 (RDP). What should the Firewall Bouncer do?',
    options: [
      { port: 3389, name: 'BLOCK: Never expose RDP (3389) directly to the public internet!', explanation: 'CORRECT! Bouncer blocks the attack! Exposed RDP is the #1 target for ransomware hackers. It must always be placed behind a secure VPN.', isCorrect: true },
      { port: 3389, name: 'ALLOW: Let him in on Port 3389 because remote work is convenient', explanation: 'DISASTER! An open RDP port on the public internet will be brute-forced within minutes, leading to total ransomware takeover!' },
      { port: 23, name: 'Reroute him to Telnet Door 23', explanation: 'Terrible idea! Telnet has no encryption either!' }
    ],
    compTiaTip: 'CompTIA emphasizes defense-in-depth: Never leave RDP Port 3389 directly open to the WAN; require VPN or zero-trust access.'
  },
  {
    id: 4,
    guest: 'Lost Laptop User 🧭',
    request: '“My computer only knows the name `payroll.company.com`, but it needs to find the actual IP address so it can send packets!”',
    question: 'Which clerk holds the internet phonebook?',
    options: [
      { port: 123, name: 'Door 123 (NTP)', explanation: 'No, NTP is the clock, not the phonebook!' },
      { port: 53, name: 'Door 53 (DNS)', explanation: 'CORRECT! The Domain Name System (DNS) on Port 53 translates domain names into numerical IP addresses.', isCorrect: true },
      { port: 67, name: 'Door 67 (DHCP)', explanation: 'No, DHCP assigns IP addresses to devices, but doesn’t resolve web domain names.' },
      { port: 88, name: 'Door 88 (Kerberos)', explanation: 'No, Kerberos issues single sign-on tickets.' }
    ],
    compTiaTip: 'DNS operates on Port 53 (UDP for queries, TCP for zone transfers). To prevent DNS spoofing, use DNSSEC.'
  },
  {
    id: 5,
    guest: 'HR Executive Helen 📁',
    request: '“I have a sensitive spreadsheet containing all employee social security numbers and bonuses. I must transfer it to our remote backup server securely over an SSH tunnel.”',
    question: 'Which secure file protocol and port should Helen use?',
    options: [
      { port: 21, name: 'Door 21 (FTP)', explanation: 'Danger! FTP transmits files and passwords in cleartext.' },
      { port: 22, name: 'Door 22 (SFTP - SSH File Transfer Protocol)', explanation: 'CORRECT! SFTP piggybacks on SSH over Port 22 to encrypt file transfers and logins.', isCorrect: true },
      { port: 80, name: 'Door 80 (HTTP)', explanation: 'HTTP is for unencrypted web pages, not secure file transfer.' },
      { port: 161, name: 'Door 161 (SNMP)', explanation: 'SNMP is for network device management.' }
    ],
    compTiaTip: 'SFTP uses SSH on Port 22. FTPS uses SSL/TLS on Ports 989/990. FTP on Port 21 is insecure.'
  },
  {
    id: 6,
    guest: 'IT Auditor Arthur 🕵️',
    request: '“During our security audit, we noticed Active Directory queries were being sent in cleartext across our network, leaking employee attributes.”',
    question: 'Which secure port should Arthur mandate to encrypt Active Directory queries?',
    options: [
      { port: 389, name: 'Door 389 (LDAP)', explanation: 'Port 389 is the plain, unencrypted LDAP port that caused the audit finding!' },
      { port: 636, name: 'Door 636 (LDAPS)', explanation: 'CORRECT! LDAPS on Port 636 encrypts directory lookups using TLS certificates.', isCorrect: true },
      { port: 143, name: 'Door 143 (IMAP)', explanation: 'IMAP is for email, not directory queries.' },
      { port: 443, name: 'Door 443 (HTTPS)', explanation: 'HTTPS is for web traffic, not LDAP queries.' }
    ],
    compTiaTip: 'LDAP = Port 389 (Cleartext). LDAPS = Port 636 (Encrypted with TLS).'
  },
  {
    id: 7,
    guest: 'Mobile Worker Max 📱',
    request: '“I want to sync my email folders across my iPhone, iPad, and work laptop so read emails match everywhere. The connection MUST be encrypted!”',
    question: 'Which secure email synchronization door should Max connect to?',
    options: [
      { port: 110, name: 'Door 110 (POP3)', explanation: 'POP3 does not sync across multiple devices (it downloads and deletes), and 110 is unencrypted.' },
      { port: 143, name: 'Door 143 (IMAP)', explanation: 'Port 143 syncs, but it is cleartext and vulnerable to sniffing.' },
      { port: 993, name: 'Door 993 (IMAPS)', explanation: 'CORRECT! IMAPS on Port 993 provides multi-device mailbox synchronization protected by TLS encryption.', isCorrect: true },
      { port: 25, name: 'Door 25 (SMTP)', explanation: 'SMTP is for SENDING mail, not syncing inboxes.' }
    ],
    compTiaTip: 'IMAP syncs mail on the server. Secure IMAP is IMAPS on Port 993.'
  },
  {
    id: 8,
    guest: 'System Administrator Sarah ⏰',
    request: '“Our users are getting Kerberos authentication errors saying their security tickets are expired or invalid. What critical service might be desynchronized?”',
    question: 'Which door synchronizes system clocks across the domain?',
    options: [
      { port: 123, name: 'Door 123 (NTP - Network Time Protocol)', explanation: 'CORRECT! Kerberos authentication strictly fails if clocks differ by more than 5 minutes. NTP on Port 123 keeps all clocks perfectly synchronized.', isCorrect: true },
      { port: 88, name: 'Door 88 (Kerberos)', explanation: 'Door 88 is the Kerberos ticket service itself, but it needs NTP (123) to keep accurate time!' },
      { port: 53, name: 'Door 53 (DNS)', explanation: 'DNS is the phonebook, not the clock.' },
      { port: 67, name: 'Door 67 (DHCP)', explanation: 'DHCP hands out IP addresses, not clock time.' }
    ],
    compTiaTip: 'NTP on Port 123 is required for Kerberos single sign-on ticket validation and accurate audit log timestamps.'
  }
];
