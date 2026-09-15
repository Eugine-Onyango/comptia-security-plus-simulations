export const DOMAIN1_PREPSET_QUESTIONS = [
  // ==========================================
  // PORTION 1 (Q1 - Q5)
  // ==========================================
  {
    id: 1,
    portion: 1,
    subdomain: "1.1 Zero Trust Architecture (ZTA)",
    scenario: "An enterprise organization is migrating its internal payroll application to a multi-cloud environment. The Chief Information Security Officer (CISO) mandates the implementation of a Zero Trust Architecture (ZTA) per NIST SP 800-207 guidelines. During an architectural review, the security team designs a component that inspects the requesting device's health posture, user credentials, time of day, and geolocation risk to decide whether to grant a temporary, cryptographically signed token for payroll access.",
    question: "Which of the following architectural components is responsible for making this access determination?",
    options: [
      {
        text: "Policy Decision Point (PDP)",
        isCorrect: true,
        whyCorrect: "In NIST SP 800-207 Zero Trust Architecture, the Policy Decision Point (PDP) is the logical brain responsible for evaluating access requests against enterprise policies, contextual telemetry (device health, MFA, behavioral risk), and determining whether access is approved or denied.",
        whyWrong: ""
      },
      {
        text: "Policy Enforcement Point (PEP)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "The Policy Enforcement Point (PEP) does NOT make access decisions. The PEP is merely the gatekeeper (e.g. reverse proxy, API gateway, or endpoint agent) that intercepts user traffic and strictly executes the decision handed down by the PDP."
      },
      {
        text: "Data Plane",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "The Data Plane is the operational transmission pathway where user application traffic flows once authorized. Access policy decisions occur exclusively on the Control Plane, not the Data Plane."
      },
      {
        text: "Certificate Revocation List (CRL)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A CRL is a static list of revoked X.509 certificates published by a CA. While a PDP might query certificate validity during evaluation, a CRL itself cannot evaluate context, measure device health, or issue session tokens."
      }
    ],
    technicalRationale: "NIST SP 800-207 defines the core ZTA logical components: The PDP (comprising the Policy Engine and Policy Administrator) evaluates identity and context to make decisions, while the PEP sits in the data path to enable, monitor, and terminate connections.",
    kenyanMetaphor: "Visiting a high-security embassy in Gigiri, Nairobi. The PDP is the consular visa officer sitting in the back office reviewing your bank statements, travel history, and national ID to approve your visa. The PEP is the G4S security guard at the gate who checks your stamped visa before opening the turnstile."
  },

  {
    id: 2,
    portion: 1,
    subdomain: "1.2 Cryptographic Primitives & Key Exchange",
    scenario: "A software engineering team is building a confidential messaging protocol. The design specification states that two communicating endpoints must dynamically establish a shared symmetric session key over an untrusted public Wi-Fi channel without transmitting the key itself across the wire. Furthermore, the protocol must provide Perfect Forward Secrecy (PFS) so that a compromise of the server's long-term private key in the future cannot decrypt previously intercepted and stored chat sessions.",
    question: "Which of the following cryptographic mechanisms BEST satisfies these requirements?",
    options: [
      {
        text: "Diffie-Hellman Ephemeral (DHE or ECDHE)",
        isCorrect: true,
        whyCorrect: "Diffie-Hellman Ephemeral (DHE/ECDHE) computes a shared secret over an insecure channel without transmitting the secret. Because it uses temporary (ephemeral) keys for each session that are immediately discarded, past sessions remain secure even if long-term server keys are stolen later (Perfect Forward Secrecy).",
        whyWrong: ""
      },
      {
        text: "RSA with 4096-bit Keys",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Traditional RSA key exchange encrypts the symmetric session key with the server's static public key. If an adversary captures encrypted sessions and steals the server's single private key years later, all historical traffic can be decrypted. RSA lacks Perfect Forward Secrecy and is removed from TLS 1.3."
      },
      {
        text: "Advanced Encryption Standard in Galois/Counter Mode (AES-GCM)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "AES-GCM is a symmetric encryption algorithm that provides confidentiality and integrity for bulk data once a key exists. It cannot establish or negotiate shared keys over an insecure public channel on its own."
      },
      {
        text: "SHA-3 (Secure Hash Algorithm 3)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SHA-3 is a one-way cryptographic hashing function designed for data integrity verification and digital signatures. It does not perform key exchange or encryption."
      }
    ],
    technicalRationale: "Perfect Forward Secrecy (PFS) ensures that session keys are not derived from long-term master keys. CompTIA SY0-701 emphasizes that ephemeral key exchange algorithms (DHE, ECDHE) are mandatory for PFS.",
    kenyanMetaphor: "Two business partners in Nairobi and Mombasa mixing paint over a public phone call. Both start with common yellow paint. Each adds a secret color, mixes it, and swaps test measurements. After adding their secret color again, both get the exact same shade without ever revealing their raw base colors. Because they throw away the test cans after every conversation (Ephemeral), nobody can recreate past secret colors."
  },

  {
    id: 3,
    portion: 1,
    subdomain: "1.3 PKI & Certificate Revocation",
    scenario: "An online airline booking portal experiences extreme latency during holiday flash sales. An investigation reveals that web servers are slowing down handshakes because every client connection forces an external query to the Certificate Authority (CA) to verify the merchant's X.509 certificate revocation status. Additionally, security analysts raise privacy concerns because client IP addresses are being exposed directly to the external CA.",
    question: "Which of the following implementations will solve the latency bottleneck while preserving client privacy?",
    options: [
      {
        text: "OCSP Stapling (Certificate Status Request)",
        isCorrect: true,
        whyCorrect: "With OCSP Stapling, the web server queries the CA periodically, caches the signed proof of validity, and 'staples' it directly to the TLS handshake sent to clients. This eliminates real-time CA queries by clients, removes the latency bottleneck, and prevents client IPs from leaking to the CA.",
        whyWrong: ""
      },
      {
        text: "Offline Root Certificate Authority (CA)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An Offline Root CA is an architectural best practice to protect master keys from network attacks by keeping the root CA unpowered, but it does not address real-time web server TLS handshake certificate validation latency."
      },
      {
        text: "Mandating Client-Side Certificate Revocation Lists (CRLs)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CRLs are large, static lists of revoked serial numbers. Downloading entire CRL files over client connections would dramatically increase bandwidth overhead and worsen the checkout latency."
      },
      {
        text: "Upgrading the Server Certificate Modulus from RSA 2048 to 4096 bits",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Increasing the key length increases mathematical computation overhead, which would make TLS handshakes slower, doing nothing to solve certificate revocation verification delays."
      }
    ],
    technicalRationale: "OCSP Stapling (RFC 6066) shifts the revocation checking burden from the client to the server, improving handshake speed and solving the major privacy issue where the CA can track client browsing patterns.",
    kenyanMetaphor: "Visiting an office tower in Upper Hill, Nairobi. Standard OCSP is like requiring every single visitor at reception to make a live phone call to DCI Kiambu to verify their Certificate of Good Conduct. OCSP Stapling is the building getting an official stamped, time-limited clearance seal in the morning and attaching it to the badge at reception so everyone breezes right in."
  },

  {
    id: 4,
    portion: 1,
    subdomain: "1.4 Identity Federation & SSO",
    scenario: "An enterprise is deploying a Single Sign-On (SSO) solution across its hybrid workforce. When an employee attempts to access a cloud-hosted Human Resources platform (Workday) from a corporate laptop, the HR platform redirects the browser to the internal Active Directory Federation Services (AD FS) portal. After user authentication via smart card, AD FS signs an XML-based security token asserting user identity and roles, which the browser passes back to the HR platform to establish the session.",
    question: "Which protocol is being utilized, and what architectural role is the cloud-hosted HR platform serving in this flow?",
    options: [
      {
        text: "SAML; Service Provider (SP)",
        isCorrect: true,
        whyCorrect: "Security Assertion Markup Language (SAML) is an XML-based federation standard for web SSO. In this flow, AD FS is the Identity Provider (IdP) that authenticates the user, and the cloud HR platform is the Service Provider (SP) that consumes the assertion to provide access.",
        whyWrong: ""
      },
      {
        text: "OAuth 2.0; Authorization Server",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "OAuth 2.0 uses JSON-based REST tokens (JWTs) and is an authorization framework, not an XML authentication protocol. Furthermore, the HR app is consuming access, not acting as an Authorization Server."
      },
      {
        text: "RADIUS; Authenticator",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RADIUS is a UDP-based network protocol (ports 1812/1813) used for network access (802.1X Wi-Fi, VPNs, switches). It does not use browser-based XML assertions for cloud application SSO."
      },
      {
        text: "Kerberos; Key Distribution Center (KDC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Kerberos operates via ticket-granting tickets (TGT/TGS) inside closed local Windows Active Directory networks over port 88. It cannot natively federate web sessions across external third-party internet cloud apps."
      }
    ],
    technicalRationale: "SAML 2.0 relies on three core entities: Principal (User), Identity Provider (IdP - asserts identity via XML), and Service Provider (SP - hosts the target resource). CompTIA tests recognition of XML tokens and IdP/SP roles.",
    kenyanMetaphor: "Entering an exclusive golf club in Karen (Service Provider). The club gate doesn't know you, so they tell you: 'Go to the Kenya National Registration Bureau (Identity Provider) and bring us an official stamped national ID card (XML Assertion)'. Once you present the stamped ID at the gate, the club lets you in without keeping your password on file."
  },

  {
    id: 5,
    portion: 1,
    subdomain: "1.5 Security Control Categories & Types",
    scenario: "A critical healthcare datacenter undergoes an independent security audit. The auditors examine three specific countermeasures: (1) An illuminated perimeter warning fence and mandatory annual cybersecurity awareness training; (2) A biometric mantrap door requiring dual-credential validation before server room entry; and (3) An automated Security Information and Event Management (SIEM) behavioral rule that triggers an urgent page to the SOC within 15 seconds of abnormal database exfiltration.",
    question: "Which of the following correctly pairs each numbered countermeasure with its functional security control classification?",
    options: [
      {
        text: "(1) Deterrent; (2) Preventive; (3) Detective",
        isCorrect: true,
        whyCorrect: "Warning signs and training functionally discourage potential violations before they happen (Deterrent). Biometric mantraps physically stop unauthorized entry from occurring (Preventive). SIEM correlation rules identify and alert on active or completed attacks (Detective).",
        whyWrong: ""
      },
      {
        text: "(1) Managerial; (2) Technical; (3) Corrective",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "This mixes functional types with administrative categories. Furthermore, SIEM alerting is Detective, not Corrective. Corrective controls actively restore systems after an incident (e.g., restoring backups, rebooting isolated systems)."
      },
      {
        text: "(1) Detective; (2) Compensating; (3) Deterrent",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Training and warning fences do not detect intrusions (they are Deterrent/Administrative), and mantraps are primary Preventive controls, not temporary Compensating controls."
      },
      {
        text: "(1) Preventive; (2) Physical; (3) Corrective",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Warning signs cannot physically prevent an attack, and a SIEM alert is not Corrective because alerting does not remediate or fix the damage by itself."
      }
    ],
    technicalRationale: "CompTIA SY0-701 categorizes controls in two dimensions: Category (Technical, Managerial, Operational, Physical) and Functional Type (Preventive, Detective, Corrective, Deterrent, Compensating). SIEM = Detective; Biometrics/Mantrap = Preventive; Warning signs/Training = Deterrent.",
    kenyanMetaphor: "(1) Deterrent: A billboard at an M-Pesa kiosk stating 'Premises under CCTV surveillance; fraud attempts reported to DCI' (discourages bad actors). (2) Preventive: Double steel security grilles with biometric fingerprints (physically stops unauthorized entry). (3) Detective: Motion-sensor sirens ringing when a thief climbs through the ceiling (spots the intrusion)."
  }
];
