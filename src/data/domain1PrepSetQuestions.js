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
  },

  // ==========================================
  // PORTION 2 (Q6 - Q10)
  // ==========================================
  {
    id: 6,
    portion: 2,
    subdomain: "1.4 Hashing, Passwords & Salting",
    scenario: "A database administrator discovers that two distinct employee accounts in the user database have identical 64-character hexadecimal password hash strings, despite both employees swearing they use completely different passwords. A security engineer investigates and notes that the application computes SHA-256(password) directly before storing it. The engineer recommends modifying the authentication module to prepend a cryptographically secure random 128-bit value to each password prior to hashing.",
    question: "Which of the following vulnerabilities does this modification PRIMARILY mitigate?",
    options: [
      {
        text: "Pre-computed Rainbow Table and credential-matching attacks",
        isCorrect: true,
        whyCorrect: "Without a salt, two identical passwords produce the exact same hash output, allowing attackers to match hashes and crack passwords instantly using pre-computed Rainbow Tables. Prepending a random salt ensures every hash is unique even if the plaintext password is identical, rendering pre-computed tables useless.",
        whyWrong: ""
      },
      {
        text: "Quantum-computing Grover's algorithm attacks",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Grover's algorithm provides a quadratic mathematical speedup for searching unsorted databases (halving effective symmetric key and hash pre-image lengths). Salting does not defend against quantum computing speedups; larger hash output lengths (e.g. SHA-384/512) do."
      },
      {
        text: "Asymmetric Private Key exfiltration",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Password hashing is a symmetric one-way authentication mechanism. Salting passwords has nothing to do with asymmetric public/private key pairs (such as RSA or ECC)."
      },
      {
        text: "Hash Collision attacks where H(m1) = H(m2)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A hash collision is a cryptographic mathematical failure where two different plaintexts produce the identical hash digest. The scenario is not a mathematical collision; both users had the same password hashed identically because no salt was applied."
      }
    ],
    technicalRationale: "Salting (RFC 2898 / NIST SP 800-63B) defeats precomputed dictionary and rainbow table attacks by ensuring that identical passwords result in distinct hash digests across users.",
    kenyanMetaphor: "An apartment block in South B where every tenant buys the identical padlock from a local hardware shop. A burglar immediately notices that Door 4 and Door 12 share the same key pattern, or buys a master skeleton key from the hardware (Rainbow Table). Salting is like welding a unique random steel pin onto each lock cylinder so no pre-made key can open both doors!"
  },

  {
    id: 7,
    portion: 2,
    subdomain: "1.2 CIA Triad & Non-Repudiation",
    scenario: "A company CEO sends a digitally signed email authorizing an immediate wire transfer of $500,000 to an international vendor. Two days later, during an internal fraud investigation, the CEO claims she never sent the email and argues that an insider forged her signature. A digital forensics investigator proves that the message was signed using the CEO's unique private key, the computed hash matched the message digest, and the digital certificate was valid at the timestamp of transmission.",
    question: "Which fundamental security principle does this cryptographic evidence demonstrate?",
    options: [
      {
        text: "Non-repudiation",
        isCorrect: true,
        whyCorrect: "Non-repudiation provides indisputable proof of the origin and integrity of data, ensuring that the sender cannot falsely deny sending the message. Because only the CEO holds her private key, a valid digital signature proves the message originated from her and was not modified in transit.",
        whyWrong: ""
      },
      {
        text: "Confidentiality",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Confidentiality protects data from unauthorized disclosure (usually via symmetric encryption like AES). A digital signature alone does not encrypt the email text; an eavesdropper could still read the email contents in transit."
      },
      {
        text: "Obfuscation",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Obfuscation masks code or data to make it difficult for humans to inspect or decompile (e.g., variable renaming). It provides zero cryptographic proof of authenticity."
      },
      {
        text: "High Availability",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Availability ensures authorized users have timely, uninterrupted access to systems (via clustering, backups, and redundancy), which is unrelated to digital signature proof."
      }
    ],
    technicalRationale: "Non-repudiation is achieved when a message hash is encrypted with the sender's private key. In CompTIA SY0-701, digital signatures uniquely satisfy both Integrity (via the hash) and Non-repudiation (via the asymmetric private key).",
    kenyanMetaphor: "A wealthy landowner signing a land sale agreement in Nairobi before a licensed advocate with their personal biometric thumbprint, national ID number, and sworn affidavit. If the landowner later tries to claim 'Hiyo sio saini yangu, sikuuza shamba' (That wasn't my signature), the advocate and forensic fingerprint experts prove in court that only their physical thumb could have made that impression."
  },

  {
    id: 8,
    portion: 2,
    subdomain: "1.4 Authentication vs. Authorization (OIDC & OAuth)",
    scenario: "A mobile application developer wants to allow users to sign into a fitness tracker using their existing Google accounts rather than registering new passwords. Once authenticated, the mobile app also requests user consent to read their Google Calendar appointments to schedule workouts automatically. The security architect reviews the integration to ensure modern, industry-standard protocols are implemented.",
    question: "Which combination of protocols correctly handles user authentication AND delegated access authorization in this architecture?",
    options: [
      {
        text: "OpenID Connect (OIDC) for authentication; OAuth 2.0 for authorization",
        isCorrect: true,
        whyCorrect: "OAuth 2.0 is strictly an authorization framework (issuing access tokens to access resources like Google Calendar). OpenID Connect (OIDC) is an identity layer built directly on top of OAuth 2.0 that issues an ID Token (JWT) to authenticate who the user is.",
        whyWrong: ""
      },
      {
        text: "RADIUS for authentication; TACACS+ for authorization",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RADIUS and TACACS+ are legacy AAA protocols used for networking equipment (routers, switches, VPNs), not modern RESTful web and mobile cloud application federations."
      },
      {
        text: "Kerberos for authentication; LDAP for authorization",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Kerberos and LDAP are on-premises directory protocols operating inside local Windows Active Directory corporate networks, not public mobile cloud app APIs."
      },
      {
        text: "SAML 2.0 for authentication; NTLM for authorization",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SAML is a heavyweight XML-based enterprise web browser protocol, not ideal for native mobile REST APIs. NTLM is a legacy, vulnerable Microsoft challenge-response protocol."
      }
    ],
    technicalRationale: "CompTIA SY0-701 distinguishes: OAuth 2.0 = Authorization (Access Tokens for API resources); OpenID Connect (OIDC) = Authentication (ID Tokens containing user profile claims).",
    kenyanMetaphor: "Visiting a government building in Nairobi. OpenID Connect is showing your National ID card to prove who you are at reception. OAuth 2.0 is giving a written gate pass to your driver allowing him to collect a specific box from the basement storeroom on your behalf."
  },

  {
    id: 9,
    portion: 2,
    subdomain: "1.4 PKI Certificate Formats & Encoding",
    scenario: "A Linux administrator configuring an Apache web server receives a certificate package from a Windows administrator with the file extension .pfx. The Apache configuration requires separate, plain-text ASCII Base64 files: one containing the private key, and the other containing the public certificate chain, both beginning with visible '-----BEGIN' headers.",
    question: "Which of the following file format conversions must the administrator execute?",
    options: [
      {
        text: "Convert binary PKCS#12 (.pfx / .p12) to Base64-encoded PEM (.crt / .key)",
        isCorrect: true,
        whyCorrect: "PKCS#12 (.pfx/.p12) is a password-protected binary format that bundles the private key and certificate chain together (common on Windows). PEM is the ASCII Base64 format with '-----BEGIN' headers used by Linux/Apache. The admin must extract the PEM .crt and .key using OpenSSL.",
        whyWrong: ""
      },
      {
        text: "Convert DER binary (.der) to raw binary CER (.cer)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Both DER and CER are binary encodings without ASCII headers, and neither extracts the separate private key required by the Apache configuration."
      },
      {
        text: "Convert Certificate Revocation Lists (CRL) to OCSP format",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CRLs and OCSP are revocation validation mechanisms, not web server X.509 certificate file storage formats."
      },
      {
        text: "Convert OpenSSH public keys to PGP keyring format",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SSH keys and PGP keyrings are completely different cryptographic tools, unrelated to X.509 SSL/TLS web server certificates."
      }
    ],
    technicalRationale: "CompTIA tests X.509 certificate encodings: PEM (ASCII Base64, -----BEGIN...), DER (Binary), and PKCS#12 / PFX (Binary archive containing both certificate and private key).",
    kenyanMetaphor: "A locked leather briefcase containing your passport, driving license, and house keys all zipped together inside (PKCS#12 / .pfx). The airport security desk requires you to hold your passport open in one hand and your boarding pass in the other as separate loose sheets of paper (PEM .crt & .key). You must open the briefcase and separate them!"
  },

  {
    id: 10,
    portion: 2,
    subdomain: "1.4 Access Control Schemes (ABAC vs RBAC vs MAC)",
    scenario: "A multinational aerospace firm requires an access control scheme where access to sensitive drone schematics is evaluated dynamically based on four criteria: (1) Employee security clearance level; (2) Time of access (strictly Monday to Friday, 0800 to 1700); (3) Device encryption status (must have BitLocker active); and (4) Geolocation (must originate from within authorized corporate facility IP subnets). Even if an authorized Senior Engineer attempts access, if they log in from home at midnight on an unencrypted laptop, access is immediately blocked.",
    question: "Which of the following access control models is being implemented?",
    options: [
      {
        text: "Attribute-Based Access Control (ABAC)",
        isCorrect: true,
        whyCorrect: "Attribute-Based Access Control (ABAC, NIST SP 800-162) evaluates multiple dynamic attributes (subject, resource, action, and contextual environment like time, location, and device health) to make real-time access decisions.",
        whyWrong: ""
      },
      {
        text: "Role-Based Access Control (RBAC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Traditional RBAC assigns permissions strictly based on static job titles or group memberships (e.g., 'Senior Engineer'). It cannot natively evaluate dynamic contextual variables like time, device encryption, or geolocation."
      },
      {
        text: "Discretionary Access Control (DAC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "In DAC, the owner/creator of the data has complete discretion to grant or revoke access to others (e.g. NTFS file permissions). It does not enforce mandatory corporate contextual rules."
      },
      {
        text: "Mandatory Access Control (MAC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "MAC relies on static classification labels (Top Secret, Secret, Confidential) compared against user clearance levels. While common in military systems, it does not dynamically evaluate environmental attributes like device health, location, or time."
      }
    ],
    technicalRationale: "ABAC provides fine-grained, conditional access control based on policies that combine subject, object, action, and environmental attributes. It is the core access engine behind modern Zero Trust architectures.",
    kenyanMetaphor: "RBAC is an M-Pesa agent badge that lets anyone in an M-Pesa uniform open the store safe at any time. ABAC is a smart biometric safe that checks: Is the person staff? (Subject) + Is it between 9:00 AM and 5:00 PM? (Time) + Is the shop's panic alarm disarmed? (Device) + Is the safe connected to the branch Wi-Fi? (Location). If the manager arrives at midnight, the safe stays locked!"
  },

  // ==========================================
  // PORTION 3 (Q11 - Q15)
  // ==========================================
  {
    id: 11,
    portion: 3,
    subdomain: "1.4 Encryption Technologies / Hardware Root of Trust",
    scenario: "A financial firm deploying high-security laptops for forensic auditors needs to guarantee that the operating system kernel and bootloader have not been modified or tampered with by an offline rootkit while powered off. The device must execute a measured boot sequence where cryptographic hashes of the UEFI firmware, boot configuration, and kernel are stored into tamper-resistant hardware registers before releasing the full-disk decryption key.",
    question: "Which of the following architectural components provides this hardware root of trust and measured boot capability?",
    options: [
      {
        text: "Trusted Platform Module (TPM 2.0) utilizing Platform Configuration Registers (PCRs)",
        isCorrect: true,
        whyCorrect: "TPM 2.0 is a dedicated, tamper-resistant cryptographic microchip that establishes the hardware Root of Trust. During measured boot, it records cryptographic hashes of each startup component into Platform Configuration Registers (PCRs). If any component is modified, PCR values do not match, and the TPM seals the volume decryption key.",
        whyWrong: ""
      },
      {
        text: "Hardware Security Module (HSM)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An HSM is a dedicated high-throughput network appliance used in data centers for centralized key generation, CA signing, and payment processing, not for endpoint laptop measured boot."
      },
      {
        text: "Centralized Key Management Service (KMS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A KMS is a cloud or software service for managing, rotating, and controlling application encryption keys, not a local endpoint physical crypto chip."
      },
      {
        text: "Self-Encrypting Drive (SED) with OPAL standard",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An SED performs hardware encryption at the disk controller level, but it does not measure or cryptographically attest to the integrity of motherboard UEFI firmware or OS bootloader files."
      }
    ],
    technicalRationale: "A Hardware Root of Trust (TPM 2.0) guarantees system integrity from power-on. Measured boot records hashes of firmware, bootloader, and kernel drivers into PCRs. If hashes match the baseline, keys are unsealed to unlock the drive.",
    kenyanMetaphor: "The locked dispatch truck carrying cash for Central Bank of Kenya. An SED is just a heavy steel door on the container. The TPM 2.0 is the tamper-evident biometric seal: before the ignition starts, it inspects every single lock, engine component, and cargo seal. If even one screw was loosened overnight, the truck immobilizer locks down completely."
  },

  {
    id: 12,
    portion: 3,
    subdomain: "1.4 Encrypting Data / Data States",
    scenario: "A healthcare provider must process sensitive patient genomic sequencing data in an external multi-tenant public cloud. While data at rest is encrypted with AES-256 and data in transit is protected via TLS 1.3, hospital compliance officers fear that an untrusted cloud hypervisor administrator or an attacker with physical RAM access could dump plaintext data directly from memory while the CPU is actively crunching analytics.",
    question: "Which of the following security technologies directly mitigates this threat to data in use?",
    options: [
      {
        text: "Confidential Computing via Hardware Secure Enclaves (e.g., AMD SEV / Intel SGX)",
        isCorrect: true,
        whyCorrect: "Confidential Computing protects data in use by isolating data and computation inside hardware-encrypted CPU enclaves. Even with root or hypervisor-level access, memory pages are encrypted in RAM and decrypted only inside the CPU cache.",
        whyWrong: ""
      },
      {
        text: "Transparent Data Encryption (TDE)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "TDE protects data at rest by encrypting database storage files, transaction logs, and backups on disk. However, records are decrypted into system RAM during active queries."
      },
      {
        text: "Perfect Forward Secrecy (PFS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "PFS protects data in transit against historical decryption if the server's long-term private key is later compromised; it does not protect data residing in active CPU memory."
      },
      {
        text: "Format-Preserving Encryption (FPE) for database columns",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "FPE preserves the format and length of sensitive text (e.g., credit card numbers) in storage and transit, but does not provide hardware memory isolation in volatile RAM."
      }
    ],
    technicalRationale: "Data in Use represents information actively resident in volatile memory (RAM, CPU cache, registers). Confidential Computing uses hardware-based Trusted Execution Environments (TEEs) to protect memory from hypervisor, host OS, and physical memory dump attacks.",
    kenyanMetaphor: "Sending your maize to a commercial posho mill in Kisumu. AES-256 is the locked gunny bag on the lorry (Data at Rest). TLS 1.3 is the armed escort escorting the lorry along the highway (Data in Transit). Confidential Computing is having your personal private robotic milling booth inside the factory where not even the posho mill owner can look inside or take a handful while the grain is being ground into unga (Data in Use)."
  },

  {
    id: 13,
    portion: 3,
    subdomain: "1.2 Deception & Disruption Concepts",
    scenario: "An enterprise security operations team wants an early warning detection mechanism for credential harvesting and lateral movement inside their Active Directory domain. The team provisions a fake user account named 'svc-domainadmin' with an enticing description and leaves its plaintext password inside a dummy configuration file on a shared network drive. The account has no legitimate business permissions, is never used by real employees, and any authentication request using this account triggers an immediate Tier-1 critical SIEM alarm.",
    question: "Which of the following deception technologies has the team deployed?",
    options: [
      {
        text: "Honeytoken",
        isCorrect: true,
        whyCorrect: "A honeytoken is a decoy piece of data (such as a fake user account, dummy API credential, simulated database row, or faux sensitive document) planted deliberately to bait intruders. Since legitimate users never interact with it, any access is a high-fidelity indicator of compromise (IoC).",
        whyWrong: ""
      },
      {
        text: "Honeypot",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A honeypot is an entire decoy system, server, or virtual machine designed to mimic a legitimate network target, not an individual fake credential or decoy account."
      },
      {
        text: "Honeynet",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A honeynet is a complete network segment composed of multiple interconnected honeypots mimicking a corporate subnet, not an isolated credential or file."
      },
      {
        text: "DNS Sinkhole",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A DNS sinkhole intercepts malicious domain lookups and returns an innocuous IP address to disrupt malware botnet C2 communications, not a decoy credential."
      }
    ],
    technicalRationale: "CompTIA classifies deception tools by scope: Honeypot (system), Honeynet (network), Honeyfile (file), and Honeytoken (credential, API key, or data element). Honeytokens produce near-zero false-positive alerts.",
    kenyanMetaphor: "Leaving a marked Ksh 1,000 note laced with invisible ink on the office reception counter. No honest employee has any reason to take it. The moment anyone touches that specific note, their fingers turn fluorescent purple under UV light and the security alarm sounds!"
  },

  {
    id: 14,
    portion: 3,
    subdomain: "1.2 Physical Security Controls",
    scenario: "A core telecom data center housing national routing infrastructure must prevent unauthorized individuals from slipping in behind authorized staff through exterior access points. The facility installs an entryway featuring an enclosed, interlocking two-door portal where the second interior door remains securely locked until the first exterior door is completely closed and the person inside successfully authenticates via biometrics and a floor weight scale sensor.",
    question: "Which of the following physical security controls has been installed?",
    options: [
      {
        text: "Access Control Vestibule (Mantrap)",
        isCorrect: true,
        whyCorrect: "An access control vestibule (formerly termed a mantrap) consists of an enclosed double-door portal where one door must fully close and lock before the second door can open. When combined with biometrics and floor weight sensors, it guarantees single-occupant passage and eliminates tailgating and piggybacking.",
        whyWrong: ""
      },
      {
        text: "Anti-passback Turnstile",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Anti-passback is a logical credential rule preventing an RFID badge from being swiped twice in succession without an intervening exit swipe, but it lacks physical two-door airlock containment."
      },
      {
        text: "Reinforced Crash Bollards",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Bollards are heavy vertical concrete or steel posts installed along building perimeters to stop vehicular ram-raids, not interior personnel entry controls."
      },
      {
        text: "Faraday Cage Enclosure",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A Faraday cage blocks electromagnetic radiation and radio frequency signals to prevent eavesdropping or EMI leakage, not a physical access entry booth."
      }
    ],
    technicalRationale: "Access control vestibules enforce strict physical separation between untrusted exterior and trusted interior zones. They physically neutralize tailgating (following without consent) and piggybacking (following with consent).",
    kenyanMetaphor: "The high-security bulletproof airlock booths at the entrance of major commercial banks in downtown Nairobi (e.g. KCB or Equity Bank). The outer glass door must lock shut behind you before you can press your thumbprint or wait for the guard to release the inner door into the banking hall."
  },

  {
    id: 15,
    portion: 3,
    subdomain: "1.2 Security Frameworks & Baselines",
    scenario: "A technology company prepares to expand international operations and must achieve ISO/IEC 27001 certification. Prior to scheduling an accredited external auditor, the internal governance, risk, and compliance (GRC) team conducts a formal assessment to compare the organization's existing security policies, operational procedures, and technical configurations against the ISO 27001 Annex A control standards to identify missing, unmonitored, or incomplete controls.",
    question: "Which of the following activities is the GRC team performing?",
    options: [
      {
        text: "Gap Analysis",
        isCorrect: true,
        whyCorrect: "A gap analysis compares an organization's current security posture and operational controls against a defined target framework, regulatory standard (like ISO 27001, NIST CSF), or baseline to identify deficiencies and map out remediation actions.",
        whyWrong: ""
      },
      {
        text: "Vulnerability Assessment",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A vulnerability assessment uses automated scanning software to discover known software flaws, missing patches, and weak configurations across IP endpoints, not organizational compliance with a governance standard."
      },
      {
        text: "Penetration Testing",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Penetration testing is an active, authorized simulation of an adversarial attack to exploit vulnerabilities and test incident response capabilities."
      },
      {
        text: "Business Impact Analysis (BIA)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A BIA identifies mission-critical business functions and quantifies the financial and operational impact of outages to establish Recovery Time Objectives (RTO) and Recovery Point Objectives (RPO)."
      }
    ],
    technicalRationale: "Gap analysis identifies discrepancies between 'where we are' (current state) and 'where we need to be' (target standard/baseline). It is the foundational first step in any security framework adoption or compliance audit preparation.",
    kenyanMetaphor: "Before inviting Kenya Revenue Authority (KRA) or KEBS inspectors to certify your factory, you hire an internal auditor with the official KEBS standard checklist to inspect your machinery and hygiene logs against each requirement, noting down every area that falls short so you can fix it before the official audit."
  },

  // ==========================================
  // PORTION 4 (Q16 - Q20)
  // ==========================================
  {
    id: 16,
    portion: 4,
    subdomain: "1.4 Cryptographic Primitives / Integrity & Authenticity",
    scenario: "An automated financial transaction system sends high-frequency payment instruction messages across an internal network. The security architect needs a cryptographic control that guarantees: (1) The transaction data has not been modified or tampered with in transit; (2) The receiving gateway can mathematically prove the message was generated exclusively by an authorized transaction server possessing a specific shared symmetric secret; and (3) The mechanism does not incur the computational latency overhead of full asymmetric digital signatures.",
    question: "Which of the following cryptographic algorithms BEST fulfills all three requirements?",
    options: [
      {
        text: "Hash-based Message Authentication Code (HMAC-SHA256)",
        isCorrect: true,
        whyCorrect: "HMAC combines a cryptographic hash function (e.g. SHA-256) with a shared secret key (RFC 2104). It verifies both data integrity AND message authentication/origin in a single symmetric operation with very high computational performance.",
        whyWrong: ""
      },
      {
        text: "Standard SHA-256 Hash",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A standard SHA-256 hash verifies integrity only. Anyone who intercepts a message can modify the payload, recompute a new SHA-256 checksum, and forward it; without a secret key, SHA-256 provides zero origin authentication."
      },
      {
        text: "Diffie-Hellman Ephemeral (DHE)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Diffie-Hellman is a key exchange protocol used to compute a shared secret over an insecure channel, not a message integrity or authentication check."
      },
      {
        text: "Rivest-Shamir-Adleman (RSA-2048) Digital Signature",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RSA digital signatures provide integrity and non-repudiation, but rely on asymmetric key pairs which require substantial computational overhead, violating the low-latency requirement."
      }
    ],
    technicalRationale: "HMAC provides cryptographic proof of message integrity and authenticity using a symmetric shared secret. Because symmetric operations are 100 to 1,000 times faster than asymmetric digital signatures, HMAC is ideal for high-throughput APIs and payment switches.",
    kenyanMetaphor: "Sending an M-Pesa transaction confirmation SMS. If the message only has a basic word count (SHA-256), a scammer can forge a new message and count the words. But HMAC is like Safaricom stamping the transaction with a cryptographic secret code that only the Safaricom core switch and your SIM card know: it proves the Ksh 5,000 wasn't altered AND proves it genuinely originated from Safaricom!"
  },

  {
    id: 17,
    portion: 4,
    subdomain: "1.4 PKI / Certificate Validation & Interception Defense",
    scenario: "A mobile banking application connects to corporate backend APIs over TLS 1.3. During a threat modeling session, the engineering team identifies a risk: an adversary on a compromised Wi-Fi hotspot could install a rogue Root Certificate Authority (CA) on an unsuspecting customer's rooted phone to perform an SSL/TLS Man-in-the-Middle (MitM) inspection attack.",
    question: "Which of the following client-side security controls prevents the mobile application from trusting rogue or fraudulent CA certificates?",
    options: [
      {
        text: "Certificate Pinning (or Public Key Pinning)",
        isCorrect: true,
        whyCorrect: "Certificate Pinning hardcodes the expected public key or certificate hash of the backend server directly inside the mobile application binary. When the app establishes a TLS handshake, it ignores the device's local trust store and strictly verifies that the presented certificate matches the pinned key, instantly defeating rogue or malicious Root CAs.",
        whyWrong: ""
      },
      {
        text: "Online Certificate Status Protocol (OCSP) Stapling",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "OCSP Stapling allows the server to query the CA and attach a timestamped revocation status to the handshake, but if a rogue CA issued a fraudulent cert, the rogue CA would simply report it as valid."
      },
      {
        text: "HTTP Strict Transport Security (HSTS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "HSTS forces web browsers to communicate exclusively over HTTPS rather than HTTP, but still trusts any CA installed in the device's root certificate store."
      },
      {
        text: "Extended Validation (EV) SSL Certificates",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "EV certificates require extensive organizational vetting prior to issuance, but do not prevent client devices from trusting unauthorized local CAs."
      }
    ],
    technicalRationale: "Certificate Pinning restricts acceptable certificates to a predefined list or public key fingerprint hardcoded into the client app. This renders Man-in-the-Middle proxy attacks (such as Burp Suite or Charles Proxy with custom root certs) completely ineffective.",
    kenyanMetaphor: "You hire a personal bodyguard in Nairobi. Standard PKI trust is telling your guard: 'Trust anyone carrying an official government badge.' If a corrupt clerk issues a fake badge to an impostor, your guard lets them in. Certificate Pinning is handing your guard a framed photograph of your specific driver: 'Only open the gate if the man's face matches this exact photo, regardless of what badge he shows!'"
  },

  {
    id: 18,
    portion: 4,
    subdomain: "1.4 Key Stretching & Password Hashing Algorithms",
    scenario: "A web application stores user passwords as single-iteration SHA-256 hashes in a SQL database. A security auditor flags this practice as high risk because an attacker who steals the database dump could leverage multi-GPU rigs and precomputed rainbow tables to crack millions of password hashes per second.",
    question: "Which of the following cryptographic techniques should the organization implement to mathematically slow down offline brute-force cracking attempts?",
    options: [
      {
        text: "Key Stretching using Argon2, bcrypt, or PBKDF2",
        isCorrect: true,
        whyCorrect: "Key stretching algorithms (such as Argon2, bcrypt, and PBKDF2) feed the password and a unique cryptographic salt through thousands or millions of iterations and require significant memory. This intentionally introduces a computational cost (work factor) of hundreds of milliseconds per guess, making high-speed GPU cracking computationally intractable.",
        whyWrong: ""
      },
      {
        text: "Asymmetric Encryption with Elliptic Curve Cryptography (ECC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "ECC is an asymmetric encryption and digital signature mechanism. Passwords should never be encrypted (reversible); they must be one-way hashed."
      },
      {
        text: "Replacing SHA-256 with SHA-512 (SHA-2 Family)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SHA-512 is designed to run as fast as possible on modern hardware. High-end GPUs can calculate billions of raw SHA-512 hashes per second, offering negligible protection against brute force."
      },
      {
        text: "Adding a static organizational pepper to each password",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A pepper is a secret static value added to passwords, but if implemented with a fast hash algorithm like SHA-256 without iteration/memory stretching, brute-force cracking on captured dumps remains fast once the pepper is discovered."
      }
    ],
    technicalRationale: "Standard cryptographic hashes (MD5, SHA-1, SHA-256) are optimized for data integrity speed. Password hashes require intentionally slow, memory-hard key derivation functions (Argon2, bcrypt, scrypt, PBKDF2) that thwart parallel GPU/ASIC attacks.",
    kenyanMetaphor: "A fast hash like SHA-256 is like a flimsy padlock that takes 0.001 seconds to snap open. Key stretching (bcrypt/Argon2) is like a bank vault time-lock mechanism that forces you to wait 3 full seconds after typing every single trial combination. Guessing 1 billion passwords would take centuries instead of hours!"
  },

  {
    id: 19,
    portion: 4,
    subdomain: "1.1 Identity & Access Management / Modern Authorization Flows",
    scenario: "A mobile application running on Android and iOS devices needs to access user files stored on a cloud storage service. Because client-side mobile apps can be decompiled and inspected, the developers cannot securely embed or protect a client secret key.",
    question: "Which of the following OAuth 2.0 extensions should be implemented to securely obtain authorization tokens without exposing a client secret?",
    options: [
      {
        text: "Authorization Code Flow with Proof Key for Code Exchange (PKCE)",
        isCorrect: true,
        whyCorrect: "RFC 7636 specifies Proof Key for Code Exchange (PKCE, pronounced 'pixy'). It dynamically generates a cryptographically random secret (code_verifier) and sends its hash (code_challenge) during the initial authorization request. When exchanging the authorization code for an access token, the app proves ownership by sending the original verifier, preventing interception attacks on public clients without needing a pre-shared client secret.",
        whyWrong: ""
      },
      {
        text: "Implicit Grant Flow",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "The Implicit Grant flow returns access tokens directly in the URL fragment. It is deprecated by OAuth 2.0 Security Best Current Practice due to token leakage in browser history and redirection interception."
      },
      {
        text: "Resource Owner Password Credentials (ROPC) Grant",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "ROPC requires the user to type their username and password directly into the third-party client app, completely violating the separation principle of OAuth 2.0."
      },
      {
        text: "Security Assertion Markup Language (SAML 2.0) Artifact Binding",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SAML 2.0 is an XML-based enterprise web SSO standard, not an OAuth 2.0 authorization extension for mobile native applications."
      }
    ],
    technicalRationale: "Public clients (mobile apps, Single Page Applications) cannot protect client secrets. PKCE replaces the client secret requirement with a dynamic, one-time cryptographic challenge-verifier handshake.",
    kenyanMetaphor: "Sending your courier to collect a parcel at the Modern Coast bus terminal in Nairobi. If you just send an SMS collection number (standard code), an eavesdropper could run there first and grab the parcel. With PKCE, you generate a secret riddle answer in your head, send the encrypted riddle to the counter first, and tell the courier: 'Only reveal the answer when you are standing face-to-face with the clerk.' The imposter cannot claim the parcel because they don't have the secret verifier!"
  },

  {
    id: 20,
    portion: 4,
    subdomain: "1.2 Security Controls & Data Destruction / Media Sanitization",
    scenario: "An enterprise data center is decommissioning 500 high-capacity Solid State Drives (SSDs) equipped with hardware-level Self-Encrypting Drive (SED) technology. The drives contain confidential customer data. The storage administrator must sanitize all 500 drives within a 2-hour maintenance window so they can be securely redeployed or returned to the hardware leasing vendor per NIST SP 800-88 Rev. 1 sanitization guidelines.",
    question: "Which of the following media sanitization methods BEST satisfies the deadline while guaranteeing data unrecoverability?",
    options: [
      {
        text: "Cryptographic Erase (Crypto-shredding) of the Media Encryption Key (MEK)",
        isCorrect: true,
        whyCorrect: "Cryptographic Erase (CE / Crypto-shredding) sanitizes an encrypted drive by securely erasing and overwriting the internal Media Encryption Key (MEK). Because the entire drive was encrypted at rest, destroying the key renders all underlying ciphertext mathematically unrecoverable in milliseconds, satisfying NIST SP 800-88 Rev. 1 requirements without wear-leveling issues on SSDs.",
        whyWrong: ""
      },
      {
        text: "Magnetic Degaussing of the SSD drive bays",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Degaussing uses a powerful magnetic field to sanitize magnetic platters (HDDs and tape). SSDs use flash memory (NAND transistors) that do not store data magnetically; degaussing is completely ineffective on SSDs."
      },
      {
        text: "Overwriting all sectors with 3-pass DoD 5220.22-M zero/one patterns",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Multi-pass overwriting on 500 high-capacity drives would take days (violating the 2-hour window) and cannot reliably overwrite hidden over-provisioned blocks managed by the SSD wear-leveling controller."
      },
      {
        text: "Physical Shredding using an industrial cross-cut shredder",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Physical shredding permanently destroys the hardware, preventing reuse or returning the leased drives to the vendor."
      }
    ],
    kenyanMetaphor: "You have 500 steel shipping containers in Mombasa port, each locked with a unique master key and filled with encrypted confidential cargo. If you want to sanitize them in 10 minutes so the landlord can reuse the containers: Overwriting is hiring workers to sweep and wash every square inch for a week. Degaussing is waving a magnet over non-magnetic plastic (does nothing). Cryptographic erase is throwing the only copy of the key into an active steel smelting furnace: no one on earth can ever open the locks again, and the containers can be immediately reformatted with brand new locks!"
  },

  // ==========================================
  // PORTION 5 (Q21 - Q25)
  // ==========================================
  {
    id: 21,
    portion: 5,
    subdomain: "1.4 Public Key Infrastructure / Certificate Types",
    scenario: "A cloud provider hosts multiple public web services on a single reverse proxy load balancer: api.portal.com, billing.payment.net, customer-support.org, and shop.portal.com. The infrastructure team wants to consolidate certificate management onto a single digital certificate that covers all these distinct domain names and top-level domains (TLDs) without purchasing separate certificates for each site.",
    question: "Which of the following certificate types must the team deploy?",
    options: [
      {
        text: "Multi-Domain Subject Alternative Name (SAN) Certificate",
        isCorrect: true,
        whyCorrect: "A Multi-Domain SAN certificate utilizes the subjectAltName X.509 extension to secure multiple completely different domain names, top-level domains (.com, .net, .org), and subdomains under a single digital certificate and private key.",
        whyWrong: ""
      },
      {
        text: "Wildcard Certificate (*.portal.com)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A Wildcard certificate (*.portal.com) secures only subdomains under a single base domain. It cannot protect distinct apex/root domains like payment.net or customer-support.org."
      },
      {
        text: "Self-Signed Root CA Certificate",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A self-signed certificate generates severe browser trust warning errors for public users and defeats public PKI trust."
      },
      {
        text: "Code Signing Certificate",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Code signing certificates are cryptographically restricted via Extended Key Usage (EKU) to verify software executables and scripts, not for TLS web server handshakes."
      }
    ],
    technicalRationale: "Subject Alternative Name (SAN) is an X.509 extension allowing multiple hostnames (FQDNs), IP addresses, or URIs across diverse domain names to be bound to a single certificate. Wildcards (*.domain.com) are limited to subdomains on the same single parent domain level.",
    kenyanMetaphor: "A Wildcard certificate is an entry pass that says: 'Valid for any child with the surname Kenyatta (*.kenyatta.com).' But if you want a single family pass that admits John Kenyatta, Mary Otieno, and Hassan Mohamed all on one ticket, you need a Multi-Domain SAN pass that explicitly lists each individual's distinct name!"
  },

  {
    id: 22,
    portion: 5,
    subdomain: "1.4 Access Control Schemes / Technical Controls",
    scenario: "A network security engineer configures an enterprise Next-Generation Firewall (NGFW) protecting an industrial SCADA control subnet. The firewall policy specifies: (1) Remote maintenance SSH connections from an approved vendor IP address range are allowed strictly between 22:00 and 04:00 UTC; (2) Any traffic attempting connection outside this window or from other IP addresses is dropped by an unwritten catch-all rule at the end of the access control list (ACL); (3) Access is evaluated purely on network variables, protocols, and time intervals, regardless of user identity.",
    question: "Which access control paradigm and default security posture are being enforced?",
    options: [
      {
        text: "Rule-Based Access Control (RuBAC) with an Implicit Deny",
        isCorrect: true,
        whyCorrect: "Rule-Based Access Control (RuBAC) makes deterministic access decisions based on predefined system rules, environmental filters (IP address, port, protocol, time-of-day), and logic rather than user roles or job titles. The catch-all rule dropping unmentioned traffic is the foundational Implicit Deny principle.",
        whyWrong: ""
      },
      {
        text: "Role-Based Access Control (RBAC) with Explicit Allow",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RBAC assigns permissions based on user job roles or active directory group memberships (e.g., Accountant, Administrator), not stateless network parameters."
      },
      {
        text: "Discretionary Access Control (DAC) with Least Privilege",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DAC allows the creator/owner of a file or object to decide who gets access based on ACLs, not network rule parameters."
      },
      {
        text: "Mandatory Access Control (MAC) with Multi-Level Security",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "MAC assigns strict security clearance labels (Top Secret, Confidential) to subjects and objects in military systems."
      }
    ],
    technicalRationale: "Rule-Based Access Control applies conditions based on contextual or environmental rules (e.g. firewall ACLs, routing tables, time-of-day filters). Implicit Deny dictates that any access not explicitly permitted is forbidden by default.",
    kenyanMetaphor: "A strict security boom-gate on the Thika Superhighway weighbridge. The electronic gate only opens if: (Vehicle weight < 15 tonnes) AND (Time is between 10:00 PM and 4:00 AM). If either condition fails, the boom-gate stays down (Implicit Deny). It doesn't care whether the driver is an executive or a casual employee—the rule alone governs access!"
  },

  {
    id: 23,
    portion: 5,
    subdomain: "1.1 Authentication & Authorization / Phishing Resistance",
    scenario: "An organization suffers multiple successful Adversary-in-the-Middle (AiTM) reverse-proxy phishing attacks where threat actors steal both user credentials and time-based one-time password (TOTP) codes in real time to hijack active sessions. The CISO mandates the deployment of a modern MFA solution that is cryptographically bound to the browser's origin domain, rendering AiTM phishing and session hijacking technically impossible.",
    question: "Which of the following authentication technologies BEST satisfies this mandate?",
    options: [
      {
        text: "FIDO2 / WebAuthn (Passkeys / Hardware Security Keys)",
        isCorrect: true,
        whyCorrect: "FIDO2 / WebAuthn uses asymmetric public-key cryptography where the private key is held securely in hardware (or device passkey). During the challenge-response handshake, the browser cryptographically signs the challenge with the specific website origin (domain URL). If a user is tricked onto a phishing site like evil-portal.com, the signature mismatches the legitimate site and authentication fails, providing complete phishing resistance.",
        whyWrong: ""
      },
      {
        text: "SMS-based One-Time Passcodes (OTP)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SMS OTP is vulnerable to SIM swapping, SS7 cellular interception, and is trivial for an AiTM proxy to capture and relay to the real site."
      },
      {
        text: "Push notifications with standard Mobile Authenticator prompts",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Standard push notifications are vulnerable to MFA prompt bombing / fatigue attacks, and AiTM reverse proxies can intercept session cookies immediately after the user taps 'Approve'."
      },
      {
        text: "RADIUS authentication over PAP (Password Authentication Protocol)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "PAP sends plaintext credentials over the wire and provides zero MFA, let alone phishing resistance."
      }
    ],
    technicalRationale: "CISA and NIST define Phishing-Resistant MFA as authentication mechanisms based on FIDO2/WebAuthn or PKI smart cards. Because credentials are cryptographically bound to the specific domain origin, proxies cannot replay them to the authentic server.",
    kenyanMetaphor: "An SMS OTP is like someone asking for your M-Pesa PIN over a phone call; if they trick you, you give it away. FIDO2 is like using a physical Safaricom cryptographic SIM card in a dedicated card reader: even if a fraudster creates a fake M-Pesa website, your physical SIM card detects the fake address and refuses to send the cryptographic response!"
  },

  {
    id: 24,
    portion: 5,
    subdomain: "1.4 Data Protection & Obfuscation / Scope Reduction",
    scenario: "An online retail merchant needs to drastically reduce its compliance audit scope under the Payment Card Industry Data Security Standard (PCI DSS). Rather than encrypting and storing 16-digit Primary Account Numbers (PANs) in its internal databases, the company deploys an architecture where card numbers are sent directly from the customer's browser to an external certified vault. The vault returns a random, non-mathematical surrogate alphanumeric identifier that the retailer stores in its order management system.",
    question: "Which data security technique has the merchant implemented?",
    options: [
      {
        text: "Tokenization",
        isCorrect: true,
        whyCorrect: "Tokenization replaces sensitive data (such as credit card PANs) with a non-sensitive, randomly generated surrogate value (a 'token') that has no cryptographic connection to the original data. The actual card data is stored off-site in a secure token vault, taking internal systems out of PCI DSS scope.",
        whyWrong: ""
      },
      {
        text: "Dynamic Data Masking (DDM)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Data masking modifies data for display purposes (e.g. **** **** **** 4123) so call center workers cannot read the full card, but does not provide a transaction surrogate for payment processing."
      },
      {
        text: "One-Way Cryptographic Hashing",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Hashing is irreversible. An e-commerce platform cannot process recurring subscription charges using a hash because the original PAN cannot be retrieved from a hash digest."
      },
      {
        text: "Key Escrow Archiving",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Key escrow is the practice of storing decryption keys with an authorized third party for emergency recovery, not replacing sensitive card numbers with surrogates."
      }
    ],
    technicalRationale: "PCI DSS explicitly recognizes tokenization as an effective scope-reduction technique. Because tokens cannot be reversed into plaintext through algorithmic decryption (they are stored in an external isolated lookup index), compromising a tokenized database yields no cardholder data.",
    kenyanMetaphor: "When you go to a high-end casino or arcade in Westlands, Nairobi, you don't carry Ksh 500,000 cash onto the gaming floor. You surrender your cash at the bulletproof cashier cage in exchange for plastic chips (tokens). If someone steals your plastic chips outside the casino, they have zero value to anyone because only the cashier cage holds the real cash!"
  },

  {
    id: 25,
    portion: 5,
    subdomain: "1.2 Security Baselines & Configuration Management",
    scenario: "During a quarterly security audit, an administrator discovers that several production Linux servers have open unencrypted Telnet ports and modified firewall rules that deviate significantly from the hardened CIS Benchmark template. Investigation reveals that system administrators made manual, ad-hoc changes during emergency weekend outages without updating the central configuration repository or submitting change requests.",
    question: "Which operational security phenomenon does this scenario describe, and which automated control BEST prevents it?",
    options: [
      {
        text: "Configuration Drift; remediated via automated Infrastructure as Code (IaC) and configuration management playbooks (e.g., Ansible, Puppet)",
        isCorrect: true,
        whyCorrect: "Configuration drift occurs when systems gradually deviate from their hardened security baselines due to manual, undocumented changes and hotfixes over time. Automated configuration management (IaC, Ansible, Terraform) continuously checks running systems against baseline code and automatically reverts unapproved changes back to compliance.",
        whyWrong: ""
      },
      {
        text: "Zero-Day Vulnerability; remediated via Next-Generation Antivirus (NGAV)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A zero-day is an undisclosed software flaw without an existing vendor patch, not manual administrator setting changes."
      },
      {
        text: "Data Exfiltration; remediated via Data Loss Prevention (DLP) agent policies",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Data exfiltration is the unauthorized transfer of data out of an organization, not local server configuration divergence."
      },
      {
        text: "Side-Channel Attack; remediated via CPU microcode firmware patching",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Side-channel attacks exploit physical implementation artifacts (like CPU timing or cache lines, e.g. Spectre/Meltdown), unrelated to ad-hoc port changes."
      }
    ],
    technicalRationale: "Configuration drift introduces unforeseen vulnerabilities and breaks compliance. Automated Configuration Management tools enforce declarative state, detecting deviations and enforcing immutable baselines without manual intervention.",
    kenyanMetaphor: "Constructing a building in Upper Hill according to the approved architectural blueprint. Over several months, different subcontractors knock down fire walls, add unapproved wiring, and leave emergency doors propped open without telling the chief architect. This is 'drift.' IaC configuration management is an automated robotic inspector that comes every midnight, checks the building against the blueprint, and immediately rebuilds any unauthorized modifications back to the exact standard!"
  },

  // ==========================================
  // PORTION 6 (Q26 - Q30)
  // ==========================================
  {
    id: 26,
    portion: 6,
    subdomain: "1.4 Cryptographic Primitives / Symmetric vs Asymmetric Performance",
    scenario: "A software architect is designing an encrypted file transfer utility that transfers multi-gigabyte video files between branch offices. If the system encrypts the entire bulk video payload using pure asymmetric RSA-4096, CPU utilization spikes to 100% and transfer speeds drop dramatically.",
    question: "Which cryptographic design pattern solves this performance bottleneck while preserving public-key security?",
    options: [
      {
        text: "Hybrid Encryption: Generate an ephemeral symmetric key (e.g., AES-256-GCM) to encrypt the bulk payload, then encrypt that symmetric key with the recipient's asymmetric public key",
        isCorrect: true,
        whyCorrect: "Asymmetric algorithms (RSA, ECC) are computationally expensive and not designed for bulk data. Hybrid encryption combines the best of both worlds: high-speed symmetric ciphers (AES) encrypt the massive data payload, while asymmetric cryptography securely encrypts and transmits the small symmetric session key. This is how TLS, PGP, and S/MIME operate.",
        whyWrong: ""
      },
      {
        text: "Double Hashing: Hash the payload twice using SHA-512 before sending it over cleartext",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Hashing provides integrity verification only; it provides zero confidentiality, leaving cleartext visible."
      },
      {
        text: "Homomorphic Encryption: Compute mathematical operations on the ciphertext without decrypting it",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Homomorphic encryption allows processing on ciphertext in the cloud; it is computationally heavier than standard encryption and not a bulk transfer optimization."
      },
      {
        text: "Steganography: Hide the multi-gigabyte video file inside an uncompressed audio WAV track",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Steganography conceals the existence of data, but does not encrypt or solve cryptographic throughput bottlenecks."
      }
    ],
    technicalRationale: "Hybrid cryptosystems exploit the complementary properties of asymmetric key agreement/encapsulation and high-speed symmetric stream/block ciphers. This provides scalable public-key key exchange alongside gigabit-per-second symmetric bulk throughput.",
    kenyanMetaphor: "Sending 50 bags of maize from Eldoret to Nairobi. Asymmetric encryption is like hiring an armored bullion van to carry all 50 bags—too slow and ridiculously expensive! Hybrid encryption is loading the 50 bags onto an ordinary fast Scania lorry (AES bulk), locking the container with a heavy padlock, and placing the single small key inside a small armored bullion van (Asymmetric key exchange)."
  },

  {
    id: 27,
    portion: 6,
    subdomain: "1.1 Identity & Access Management / Modern Federation Protocols",
    scenario: "A fintech enterprise is building a modern microservices architecture with lightweight Single Page Applications (SPAs) and mobile clients. The lead cloud architect rejects SAML 2.0 because its heavyweight XML structures cause unacceptable parsing overhead and poor compatibility with mobile REST APIs.",
    question: "Which modern identity federation standard should the architect choose to deliver authentication identity tokens via JSON Web Tokens (JWT)?",
    options: [
      {
        text: "OpenID Connect (OIDC)",
        isCorrect: true,
        whyCorrect: "OpenID Connect (OIDC) is an identity authentication layer built directly on top of OAuth 2.0. It delivers user identity claims using lightweight, REST/JSON-friendly JSON Web Tokens (JWTs / ID tokens), making it the standard for modern web, cloud, and mobile SSO.",
        whyWrong: ""
      },
      {
        text: "Extensible Authentication Protocol (EAP-TLS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "EAP-TLS is a Layer 2/network authentication protocol used in 802.1X wireless/wired enterprise networks with client certificates, not a web SSO standard."
      },
      {
        text: "Kerberos Key Distribution Center (KDC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Kerberos is a ticket-based authentication protocol designed for internal local LAN Active Directory domains, relying on symmetric tickets rather than internet-scale web REST tokens."
      },
      {
        text: "Simple Network Management Protocol (SNMPv3)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SNMPv3 is a network device monitoring and management protocol, not an identity federation standard."
      }
    ],
    technicalRationale: "OIDC extends OAuth 2.0 to provide identity authentication alongside authorization. OIDC issues standardized ID tokens (JWT format) signed by the Identity Provider, allowing client apps to verify the identity of the end user over lightweight JSON/REST channels.",
    kenyanMetaphor: "SAML 2.0 is like carrying a physical 20-page notarized legal document from the High Court in Milimani (heavyweight XML). OpenID Connect (OIDC) is like showing a quick QR code on your smartphone that the security guard scans in 0.5 seconds (lightweight JSON/JWT)!"
  },

  {
    id: 28,
    portion: 6,
    subdomain: "1.2 Physical Security Controls / Perimeter Defense",
    scenario: "A critical electrical utility substation located in an isolated rural area suffers frequent perimeter breaches where intruders cut through or climb over chain-link fences during dark, foggy nights when visual security cameras cannot provide clear automated alerts. The facility manager needs a physical sensor control mounted directly along the perimeter fence fabric that triggers alarms based on mechanical vibrations caused by cutting, climbing, or fence lifting.",
    question: "Which of the following perimeter security controls satisfies this operational need?",
    options: [
      {
        text: "Fence Vibration / Fiber-Optic Intrusion Detection Sensors",
        isCorrect: true,
        whyCorrect: "Fence-mounted vibration or microphonic / fiber-optic cable sensors detect mechanical stress, flexing, and vibrations characteristic of climbing, cutting with wire cutters, or breaching the physical fence fabric, providing immediate alerts regardless of fog or darkness.",
        whyWrong: ""
      },
      {
        text: "Faraday Shielding Mesh",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Faraday shielding blocks electromagnetic radiation and radio frequencies, not physical fence climbers."
      },
      {
        text: "Proximity Badge RFID Readers",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RFID badge readers authenticate authorized staff at turnstiles/doors; they cannot detect intruders cutting fences in the woods."
      },
      {
        text: "Thermal Dissipation Ducts",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Thermal dissipation ducts are HVAC components used for cooling server rooms, unrelated to perimeter defense."
      }
    ],
    technicalRationale: "Perimeter Intrusion Detection Systems (PIDS) include fence disturbance sensors (fiber-optic, piezoelectric, or coaxial microphonic cables) that detect structural deflection, mechanical cutting, or lifting in all weather conditions.",
    kenyanMetaphor: "A wildlife sanctuary fence in Laikipia. Regular CCTV is blind in dense rain or heavy fog. Installing a tension-sensor wire along the entire fence wire detects the exact vibration the moment an elephant or poacher tries to cut or shake the fence posts!"
  },

  {
    id: 29,
    portion: 6,
    subdomain: "1.2 Security Controls / Control Classifications",
    scenario: "Following a major compliance review, an organization implements three new security initiatives: (1) An annual mandatory security awareness and anti-phishing training program for all employees; (2) A formal written Enterprise Information Security Policy approved by executive leadership; (3) A cluster of Web Application Firewalls (WAF) to block SQL injection and cross-site scripting attacks.",
    question: "How are controls (1), (2), and (3) classified according to CompTIA control categories?",
    options: [
      {
        text: "(1) Operational, (2) Managerial (Administrative), (3) Technical",
        isCorrect: true,
        whyCorrect: "Operational controls are executed by people through daily procedures (e.g. employee awareness training, guard patrols). Managerial controls focus on administrative governance, policies, and executive frameworks. Technical controls are implemented directly in software, firmware, or hardware (e.g. firewalls).",
        whyWrong: ""
      },
      {
        text: "(1) Technical, (2) Operational, (3) Managerial",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Misclassifies the controls: training is operational, written policy is managerial, and firewalls are technical."
      },
      {
        text: "(1) Managerial, (2) Technical, (3) Operational",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Misclassifies the controls: firewalls are technical, not operational; policies are managerial, not technical."
      },
      {
        text: "(1) Preventive, (2) Detective, (3) Corrective",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Preventive, Detective, and Corrective are functional control types, not the implementation categories (Technical, Managerial, Operational) queried."
      }
    ],
    technicalRationale: "CompTIA categorizes controls along two axes: Implementation Mechanism (Technical, Managerial/Administrative, Operational) and Function (Preventive, Detective, Corrective, Deterrent, Compensating, Physical).",
    kenyanMetaphor: "A matatu SACCO in Nairobi: The written traffic policy signed by the board of directors is Managerial. The mandatory defensive driving refresher workshop for all drivers is Operational. The electronic speed governor installed inside the engine is Technical!"
  },

  {
    id: 30,
    portion: 6,
    subdomain: "1.4 Encryption Technologies / Quantum Computing Threat",
    scenario: "A government defense research institute is evaluating the long-term security of classified archives. Intelligence reports warn of adversaries executing 'Harvest Now, Decrypt Later' campaigns—intercepting and storing encrypted network traffic today with the expectation of decrypting it years later when Cryptographically Relevant Quantum Computers (CRQCs) become operational.",
    question: "Which mathematical family of current cryptographic algorithms is vulnerable to being broken in polynomial time by Shor's algorithm on a quantum computer, and what is the standardized mitigation?",
    options: [
      {
        text: "Asymmetric algorithms based on discrete logarithms and integer factorization (RSA, Diffie-Hellman, ECC); mitigated by NIST Post-Quantum Cryptography (PQC) lattice-based algorithms (e.g., ML-KEM / ML-DSA)",
        isCorrect: true,
        whyCorrect: "Shor's algorithm running on a quantum computer solves prime integer factorization and discrete logarithms in polynomial time, completely breaking RSA, Diffie-Hellman, and ECC. NIST standardized Post-Quantum Cryptography (PQC) standards (such as ML-KEM / CRYSTALS-Kyber for key encapsulation and ML-DSA / CRYSTALS-Dilithium for digital signatures) based on hard mathematical lattice problems that resist quantum attacks.",
        whyWrong: ""
      },
      {
        text: "Symmetric algorithms (AES-256); mitigated by replacing symmetric keys with MD5 hashes",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Grover's algorithm only provides a quadratic speedup against symmetric ciphers; AES-256 remains quantum-resistant because brute-forcing it would still require 2^128 operations. MD5 is already broken classically."
      },
      {
        text: "Cryptographic hashing functions (SHA-256); mitigated by switching exclusively to base64 encoding",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Base64 is an encoding scheme, not encryption, and SHA-256 resists Shor's algorithm."
      },
      {
        text: "One-Time Pads (OTP); mitigated by increasing RSA key sizes to 8192 bits",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A true One-Time Pad is mathematically unbreakable even by quantum computers (information-theoretic security). Increasing RSA key length cannot stop Shor's polynomial-time attack."
      }
    ],
    kenyanMetaphor: "An adversary recording your encrypted radio communications today and storing the cassette tapes in a warehouse. They cannot open them today because the padlock is RSA-2048. But in 10 years, when quantum computers arrive like a laser torch that melts standard padlocks in seconds, they will open every tape! PQC is replacing those standard metal padlocks today with quantum-proof lattice vaults that even the laser torch cannot touch."
  },

  // ==========================================
  // PORTION 7 (Q31 - Q35)
  // ==========================================
  {
    id: 31,
    portion: 7,
    subdomain: "1.2 Security Governance, Policies & Legal Responsibilities",
    scenario: "A healthcare corporation's legal team requires IT management to establish a defensible legal posture against negligence lawsuits in the event of a patient data breach. IT management performs two distinct actions: (1) Conducting thorough quarterly risk assessments and third-party penetration tests to identify potential security exposures; (2) Immediately deploying critical operating system security patches within 48 hours of release and enforcing automated daily encrypted backups.",
    question: "How are action (1) and action (2) legally classified within cybersecurity governance?",
    options: [
      {
        text: "(1) Due Diligence; (2) Due Care",
        isCorrect: true,
        whyCorrect: "Due Diligence is the investigative, analytical effort to identify risks and maintain situational awareness (e.g. risk assessments, threat intelligence, audits). Due Care is the practical, prudent action taken to remediate those risks and protect assets (e.g. installing patches, configuring backups). Failure to practice due care constitutes legal negligence.",
        whyWrong: ""
      },
      {
        text: "(1) Due Care; (2) Due Diligence",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Reverses the statutory definitions: assessment is diligence; operational protection is care."
      },
      {
        text: "(1) Compensating Control; (2) Deterrent Control",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Compensating and deterrent are functional security control types, not legal standards of care."
      },
      {
        text: "(1) Non-Repudiation; (2) Dual Custody",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Non-repudiation prevents denial of an action, and dual custody splits critical tasks between two operators."
      }
    ],
    technicalRationale: "Due diligence demonstrates that management is aware of threats and regulatory expectations. Due care proves that the organization took responsible, proactive technical steps to prevent harm based on that diligence.",
    kenyanMetaphor: "Owning a commercial passenger bus (matatu) on the Nairobi-Mombasa highway. Due Diligence is sending the bus to the mechanic every month to inspect the brake pads, tires, and steering (checking the risks). Due Care is actually paying to replace the worn-out brake pads before the bus leaves the terminus with passengers (taking reasonable action to protect life)!"
  },

  {
    id: 32,
    portion: 7,
    subdomain: "1.2 Privacy, Data Protection & Organizational Roles",
    scenario: "A commercial bank contracts an external cloud-based software-as-a-service (SaaS) provider to manage customer relationship records. The bank decides which customer personal data elements are collected, specifies the financial business purpose for processing, and defines data retention schedules. The SaaS vendor stores and processes this data strictly according to the bank's written instructions. Inside the bank's IT department, a systems administrator is assigned the responsibility of performing database backups and managing user account access privileges.",
    question: "Which of the following correctly identifies the data privacy roles for the Bank, the SaaS Vendor, and the Systems Administrator?",
    options: [
      {
        text: "Bank: Data Controller; SaaS Vendor: Data Processor; Systems Administrator: Data Custodian",
        isCorrect: true,
        whyCorrect: "Under privacy laws (GDPR, Kenya Data Protection Act, NIST Privacy Framework), the Data Controller determines the purposes and means of processing. The Data Processor processes data on behalf of and strictly per the instructions of the controller. The Data Custodian handles day-to-day operational maintenance, backups, and security enforcement.",
        whyWrong: ""
      },
      {
        text: "Bank: Data Processor; SaaS Vendor: Data Controller; Systems Administrator: Data Owner",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Scrambles the roles: the bank controls the purpose, while the cloud vendor processes on contract."
      },
      {
        text: "Bank: Data Subject; SaaS Vendor: Data Custodian; Systems Administrator: Data Controller",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Customers whose information is processed are the Data Subjects, not the financial institution."
      },
      {
        text: "Bank: Data Custodian; SaaS Vendor: Data Subject; Systems Administrator: Data Processor",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Completely inverts legal definitions established in international and regional data protection regulations."
      }
    ],
    technicalRationale: "Role separation in data privacy governs legal liability and technical responsibility. Controllers bear primary regulatory liability for compliance, processors must adhere to contractual mandates, and custodians implement technical controls.",
    kenyanMetaphor: "You hire a courier company (Fargo Courier) to deliver your locked briefcase of land title deeds to a lawyer. You are the Data Controller (you own the objective and decide where it goes). Fargo Courier is the Data Processor (they carry out the transport strictly under your contract). The warehouse storekeeper who stacks the briefcase onto the shelf and checks the padlock each night is the Data Custodian!"
  },

  {
    id: 33,
    portion: 7,
    subdomain: "1.4 Public Key Infrastructure / CA Hierarchy",
    scenario: "An enterprise security architect is designing a multi-tier Public Key Infrastructure (PKI) for an organization of 50,000 employees. To ensure maximum resilience against catastrophic compromise, the architect configures the private key of the Root Certificate Authority (CA), takes the Root CA server completely offline, and locks it inside a biometric data center vault. Day-to-day issuance of TLS, VPN, and code-signing certificates is delegated exclusively to online Subordinate (Intermediate) CAs.",
    question: "What is the primary security advantage of maintaining the Root CA offline?",
    options: [
      {
        text: "If an online Intermediate CA is compromised by an attacker, only that intermediate certificate needs to be revoked, while the offline Root CA private key remains uncompromised and the entire enterprise trust anchor does not need to be rebuilt",
        isCorrect: true,
        whyCorrect: "Maintaining an offline Root CA isolates the fundamental trust anchor from network-based exploits. If an online intermediate CA is compromised, it is revoked by bringing the Root CA briefly online to issue a CRL update, preserving trust across all other domains and avoiding re-imaging thousands of client trust stores.",
        whyWrong: ""
      },
      {
        text: "An offline Root CA increases the speed of daily Online Certificate Status Protocol (OCSP) client verification queries",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Offline Root CAs do not handle daily OCSP requests; real-time validation is performed by online intermediate CAs or dedicated OCSP responders."
      },
      {
        text: "An offline Root CA eliminates the requirement for Certificate Revocation Lists (CRLs)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CRLs are still mandatory to record revoked intermediate certificates issued by the Root CA."
      },
      {
        text: "An offline Root CA allows the enterprise to issue digital certificates without generating public-private key pairs",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Public-private asymmetric key pairs are mathematically essential to all X.509 digital certificates."
      }
    ],
    technicalRationale: "In PKI trust hierarchies, compromise of a Root CA invalidates the entire trust ecosystem. Hierarchical multi-tier architectures maintain the root offline in a secure, air-gapped vault, while subordinate CAs issue end-entity certificates.",
    kenyanMetaphor: "The national currency minting plates at Central Bank of Kenya. The master steel printing plate (Root CA) is locked in a deep underground vault and never taken outside. Instead, the Central Bank issues certified printing stamps to regional branches (Intermediate CAs). If a rogue employee steals a regional branch stamp, the Governor cancels that branch's permit, but the master steel plate in the vault remains safe and the whole national currency doesn't collapse!"
  },

  {
    id: 34,
    portion: 7,
    subdomain: "1.4 Cryptographic Primitives / Block Cipher Modes & AEAD",
    scenario: "A security researcher inspects an encrypted bitmap (.bmp) image transmitted by a proprietary banking client. Even though the payload is encrypted using the Advanced Encryption Standard (AES-128), the researcher can still clearly discern the silhouette and edges of the bank's corporate logo in the resulting ciphertext. Furthermore, the protocol does not detect if an attacker alters individual ciphertext bytes in transit.",
    question: "Which vulnerable block cipher mode was used, and which modern mode should replace it to provide both indistinguishable ciphertext and cryptographic integrity (AEAD)?",
    options: [
      {
        text: "Electronic Codebook (ECB); replace with Galois/Counter Mode (GCM)",
        isCorrect: true,
        whyCorrect: "Electronic Codebook (ECB) encrypts each 128-bit block independently without an Initialization Vector (IV), causing identical plaintext blocks to yield identical ciphertext blocks and leaking visual patterns (the ECB penguin flaw). Galois/Counter Mode (GCM) is an AEAD mode that provides randomized ciphertext via counter mode and cryptographic integrity via GMAC authentication tags.",
        whyWrong: ""
      },
      {
        text: "Galois/Counter Mode (GCM); replace with Electronic Codebook (ECB)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Reverses the solutions: ECB is the flawed mode, not the replacement."
      },
      {
        text: "Cipher Block Chaining (CBC); replace with Rivest Cipher 4 (RC4)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RC4 is an obsolete stream cipher with severe statistical biases, prohibited in TLS."
      },
      {
        text: "Counter (CTR) Mode; replace with Triple-DES (3DES)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "3DES is deprecated by NIST due to 64-bit block size Sweet32 collision attacks, and CTR alone lacks integrity verification."
      }
    ],
    technicalRationale: "ECB mode lacks semantic security because identical input blocks yield identical output blocks. Modern protocols mandate AEAD modes like AES-GCM or ChaCha20-Poly1305, ensuring confidentiality and tampering detection simultaneously.",
    kenyanMetaphor: "ECB is like a codebook where the word 'M-Pesa' is always replaced by the symbol '###'. If an eavesdropper reads a letter where '###' appears 20 times in a row, they know exactly what you are talking about even without the key! GCM scrambles every single word dynamically and stamps the envelope with an unforgeable wax seal."
  },

  {
    id: 35,
    portion: 7,
    subdomain: "1.2 Third-Party Risk & Vendor Assessment / Compliance Reports",
    scenario: "An enterprise Chief Risk Officer (CRO) is vetting a third-party cloud hosting provider to host critical customer payment databases for a multi-year contract. The cloud vendor presents a SOC 2 Type I audit report dated last month. The CRO rejects this report as insufficient and demands a SOC 2 Type II report before signing the agreement.",
    question: "Why is a SOC 2 Type II report necessary to satisfy the CRO's vendor due diligence requirements?",
    options: [
      {
        text: "A SOC 2 Type I report only evaluates whether controls are suitably designed at a single specific point in time, whereas a SOC 2 Type II report evaluates whether those security controls operated effectively over a continuous testing period (typically 6 to 12 months)",
        isCorrect: true,
        whyCorrect: "AICPA standards distinguish: SOC 2 Type I reports on the suitability of control design as of a specific date (a point-in-time snapshot). SOC 2 Type II reports on both the design and the operational effectiveness of controls tested over a prolonged historical window (typically 6 to 12 months), proving sustained security execution.",
        whyWrong: ""
      },
      {
        text: "A SOC 2 Type I report is only for internal management use, whereas a SOC 2 Type II report is a public document published on the vendor's website",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Both Type I and Type II are confidential reports requiring an NDA. (SOC 3 is the public summary report)."
      },
      {
        text: "A SOC 2 Type II report guarantees 100% immunity from external cyber attacks and data loss",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "No compliance audit can guarantee absolute immunity from cyber threats."
      },
      {
        text: "A SOC 2 Type I report evaluates physical security only, whereas a SOC 2 Type II report evaluates network firewalls only",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Both evaluate the Trust Services Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy), differing in observation duration rather than control scope."
      }
    ],
    kenyanMetaphor: "Hiring a long-distance night driver for a bus fleet. A SOC 2 Type I report is checking that the driver has a valid driving license and clean clothes on Monday morning at 9:00 AM (a snapshot). A SOC 2 Type II report is reviewing the driver's GPS speed logs, sobriety breathalyzer tests, and accident-free record continuously over the past 12 months!"
  },

  // ==========================================
  // PORTION 8 (Q36 - Q40)
  // ==========================================
  {
    id: 36,
    portion: 8,
    subdomain: "1.1 Identity & Access Management / Provisioning & Deprovisioning",
    scenario: "An enterprise with 10,000 employees adopts 25 different Software-as-a-Service (SaaS) cloud applications (e.g., Salesforce, Slack, Workday, Zoom). While Single Sign-On (SSO) is configured via SAML 2.0, IT technicians are overwhelmed by the manual burden of creating, updating, and deactivating user accounts across all 25 SaaS portals whenever employees join, change departments, or resign. When an employee is terminated, their SSO login is disabled, but their orphaned accounts and stored corporate data remain active inside the individual SaaS applications for weeks.",
    question: "Which open-standard REST/JSON protocol should the organization implement to automate real-time user provisioning, attribute synchronization, and immediate deprovisioning across all cloud applications?",
    options: [
      {
        text: "System for Cross-domain Identity Management (SCIM 2.0)",
        isCorrect: true,
        whyCorrect: "SCIM (RFC 7643 & RFC 7644) is an open HTTP/REST and JSON-based protocol designed specifically for automating user identity provisioning and deprovisioning across disparate cloud domains. When an HR status changes in the Identity Provider (e.g., Microsoft Entra ID or Okta), SCIM immediately creates, updates, or deletes corresponding accounts across all target SaaS apps automatically.",
        whyWrong: ""
      },
      {
        text: "Security Assertion Markup Language (SAML 2.0) Metadata Exchange",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SAML 2.0 handles browser authentication assertions at login time, but does not provide an automated backchannel mechanism to create accounts in advance, sync department changes, or deprovision orphaned SaaS data when a worker leaves."
      },
      {
        text: "Lightweight Directory Access Protocol over SSL (LDAPS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "LDAPS is an on-premises directory query protocol used over local LANs, not an internet-scale RESTful SaaS user synchronization standard."
      },
      {
        text: "Simple Network Management Protocol version 3 (SNMPv3)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SNMPv3 monitors network router and switch hardware metrics, unrelated to identity provisioning."
      }
    ],
    technicalRationale: "SCIM standardizes REST endpoints (/Users, /Groups) using JSON payloads. It resolves the 'orphan account' lifecycle vulnerability by ensuring account deprovisioning propagates synchronously across all federated SaaS applications upon employee departure.",
    kenyanMetaphor: "SAML is like a master VIP pass: when a worker arrives at the gate, it lets them through the turnstile. But SCIM is the HR clerk who calls every single branch office, hotel, and cafeteria in the country the moment an employee is hired or fired to instantly issue or revoke their company credit cards, keys, and desk assignments!"
  },

  {
    id: 37,
    portion: 8,
    subdomain: "1.4 Cryptographic Primitives & Attacks / Collision Vulnerabilities",
    scenario: "A digital forensics investigator discovers that a cybercriminal successfully forged a fraudulent land ownership deed. The fraudster generated two completely distinct documents—one legitimate contract (Document A) and one fraudulent property transfer deed (Document B)—such that both documents produced the exact same 128-bit cryptographic hash digest: H(Doc A) = H(Doc B). The victim signed Document A with their private key, and the attacker subsequently attached the valid digital signature to Document B.",
    question: "Which cryptographic attack did the threat actor execute, and what mathematical principle enables this vulnerability in weak hash algorithms like MD5?",
    options: [
      {
        text: "Collision Attack enabled by the Birthday Paradox",
        isCorrect: true,
        whyCorrect: "A collision attack occurs when an attacker finds any two different inputs that produce the exact same hash output. Due to the Birthday Paradox, finding a collision requires only O(2^(n/2)) operations instead of O(2^n). For a 128-bit hash like MD5, a collision can be found in approximately 2^64 steps (trivial on modern GPUs). This is why MD5 and SHA-1 are cryptographically broken and prohibited by CompTIA standards.",
        whyWrong: ""
      },
      {
        text: "Pre-Image Attack enabled by the Discrete Logarithm problem",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A pre-image attack requires finding a specific input that matches a predetermined target hash, which requires O(2^n) work and is vastly harder than a collision attack."
      },
      {
        text: "Replay Attack enabled by Nonce Reuse",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A replay attack captures valid network packets and re-transmits them later; it is not a hash generation vulnerability."
      },
      {
        text: "Side-Channel Attack enabled by Differential Power Analysis",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Side-channel power analysis measures physical electrical fluctuations in hardware chips, not algorithmic hash collisions."
      }
    ],
    technicalRationale: "Collision resistance is a fundamental security requirement for digital signature hash algorithms. The birthday attack demonstrates that collisions can be generated in the square root of the keyspace, requiring 256-bit or greater hash functions (SHA-256/SHA-3) to maintain 128-bit security.",
    kenyanMetaphor: "The Birthday Paradox: In a room of just 23 people, there is a greater than 50% chance that two people share the exact same birthday! Finding someone with YOUR specific birthday is hard (pre-image), but finding ANY two people in the room with the same birthday is easy (collision attack). If your hash algorithm only has 128 bits, finding two matching documents is shockingly easy!"
  },

  {
    id: 38,
    portion: 8,
    subdomain: "1.2 Security Policies, Standards & Personnel Governance",
    scenario: "A company's IT department investigates network sluggishness and discovers that several staff members are using company-issued laptops to download copyrighted video torrents and stream high-bandwidth video games during business hours. When confronted, the employees claim they were unaware this activity was prohibited on company-owned equipment.",
    question: "Which foundational administrative policy must human resources and management have employees sign during onboarding to clearly define permissible activities and establish legal grounds for disciplinary action?",
    options: [
      {
        text: "Acceptable Use Policy (AUP)",
        isCorrect: true,
        whyCorrect: "An Acceptable Use Policy (AUP) explicitly defines permissible and prohibited activities on corporate hardware, network infrastructure, email, and internet connections. Signing an AUP during onboarding ensures employees understand their responsibilities and gives the organization unambiguous legal authority to monitor, restrict, or discipline unauthorized behavior.",
        whyWrong: ""
      },
      {
        text: "Non-Disclosure Agreement (NDA)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An NDA protects confidential corporate trade secrets and intellectual property from unauthorized external disclosure."
      },
      {
        text: "Business Impact Analysis (BIA)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A BIA evaluates operational disruption impacts and disaster recovery metrics (RTO/RPO)."
      },
      {
        text: "Memorandum of Understanding (MOU)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "An MOU is a non-binding formal agreement between two separate organizations outlining common mutual goals, not an internal employee conduct policy."
      }
    ],
    technicalRationale: "An Acceptable Use Policy (AUP) establishes acceptable behavior, privacy expectations (stating employees have no expectation of privacy on corporate assets), and consequences for policy violations.",
    kenyanMetaphor: "When an employer gives you a company pickup truck to deliver goods in Nairobi, you sign an agreement stating: 'This vehicle is for company deliveries only; do not carry unauthorized passengers for fare (matatu business) and do not take it to late-night entertainment joints.' That agreement is the AUP!"
  },

  {
    id: 39,
    portion: 8,
    subdomain: "1.1 Identity & Access Management / Privileged Credentials",
    scenario: "A major enterprise wants to eliminate the security risks of standing administrator privileges—where system engineers possess permanent 24/7 root or domain admin rights on their regular user accounts. Threat modeling shows that if an engineer's workstation is compromised via phishing, the attacker instantly inherits permanent administrative rights across the active directory domain.",
    question: "Which security architecture should the enterprise deploy to enforce credential vaulting, video session recording, and Just-In-Time (JIT) ephemeral privilege elevation?",
    options: [
      {
        text: "Privileged Access Management (PAM)",
        isCorrect: true,
        whyCorrect: "Privileged Access Management (PAM) secures high-value administrative accounts (root, domain admin, service accounts). It stores master credentials in an encrypted, automated password vault, provides Just-In-Time (JIT) temporary access tied to approved tickets, checks credentials out and automatically rotates them upon check-in, and isolates sessions with keystroke logging and video audit playback.",
        whyWrong: ""
      },
      {
        text: "Mandatory Access Control (MAC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "MAC assigns security clearance labels to users and objects, but does not provide session recording, password vaulting, or JIT elevation."
      },
      {
        text: "Discretionary Access Control (DAC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DAC allows file owners to modify permissions at their own discretion, offering zero protection against credential theft."
      },
      {
        text: "Simple Certificate Enrollment Protocol (SCEP)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SCEP automates digital certificate issuance for mobile devices and network appliances, unrelated to privileged credential governance."
      }
    ],
    technicalRationale: "PAM implements Zero Standing Privileges (ZSP) by decoupling users from direct administrative credentials. It vaults credentials, injects ephemeral tokens dynamically, and provides complete accountability through recorded jump-host sessions.",
    kenyanMetaphor: "In a commercial bank branch, the teller does not keep the key to the main money vault in their pocket all day. When they need to deposit cash, they must request temporary access at the supervisor's desk (JIT), sign a register under CCTV surveillance (session recording), use the supervisor's master key which is immediately returned to the safe (vaulting), and the combination is changed automatically!"
  },

  {
    id: 40,
    portion: 8,
    subdomain: "1.2 Physical & Environmental Security / Server Room Safety",
    scenario: "An organization is designing a high-density primary data center housing millions of dollars of enterprise servers and storage arrays. The facilities engineer must install a fire suppression system that: (1) Extinguishes Class C electrical fires rapidly by chemically interrupting the combustion chain reaction; (2) Does not leave any corrosive chemical residue, foam, or water damage on delicate server circuitry; (3) Is safe for human occupants who may be working in the room during discharge.",
    question: "Which fire suppression system BEST meets these design criteria?",
    options: [
      {
        text: "Clean Agent Gaseous Suppression System (e.g., FM-200 / 3M Novec 1230)",
        isCorrect: true,
        whyCorrect: "Clean agent systems (such as FM-200 / HFC-227ea and Novec 1230 / fluoroketone) are synthetic, non-conductive gases that extinguish fires by absorbing heat and interrupting the chemical reaction. They leave zero particulate residue, do not damage electrical components, and are engineered to be safe for human breathing at design concentrations.",
        whyWrong: ""
      },
      {
        text: "Wet-Pipe Water Sprinkler System",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Wet-pipe sprinklers discharge high-pressure water directly onto energized electronics, causing catastrophic electrical short-circuits and permanent equipment destruction."
      },
      {
        text: "Dry Chemical ABC Powder Extinguisher System",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Dry chemical ABC powders leave a highly corrosive, abrasive chemical dust that coats and permanently destroys server circuit boards and cooling fans."
      },
      {
        text: "Carbon Dioxide (CO2) Total Flooding System",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "CO2 systems extinguish fires by completely displacing oxygen; they are lethal to human occupants trapped inside the room."
      }
    ],
    kenyanMetaphor: "If a fire breaks out in a server room full of high-end equipment in Nairobi: Using water sprinklers is like throwing a bucket of dirty water into an operating television—everything is ruined instantly. Using dry chemical powder is like dumping a bag of cement into the server fans. A Clean Agent system is like spraying an invisible fire-snuffing gas that puts out the fire in 10 seconds, leaves the servers completely dry and running, and allows the engineers to walk out safely!"
  },

  // ==========================================
  // PORTION 9 (Q41 - Q45)
  // ==========================================
  {
    id: 41,
    portion: 9,
    subdomain: "1.4 Cryptographic Primitives / Cipher Operation Types",
    scenario: "An embedded systems developer is building a real-time tactical voice communications headset with extremely constrained CPU and memory. The protocol cannot tolerate buffering delays or the padding overhead associated with processing fixed 128-bit chunks of audio data. The cipher must generate a continuous pseudorandom keystream that is combined bit-by-bit using an exclusive-OR (XOR) operation with the digitized audio stream as it arrives.",
    question: "Which cryptographic cipher category and algorithm BEST satisfies these low-latency streaming requirements?",
    options: [
      {
        text: "Stream Cipher (e.g., ChaCha20)",
        isCorrect: true,
        whyCorrect: "Stream ciphers (such as ChaCha20) encrypt plaintext by generating a continuous pseudorandom keystream and XORing it with the plaintext bit-by-bit or byte-by-byte. Because there is no fixed block size requirement, padding is unnecessary, making stream ciphers ideal for continuous real-time audio/video streams with minimal memory buffer overhead.",
        whyWrong: ""
      },
      {
        text: "Block Cipher in Electronic Codebook mode (AES-ECB)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Block ciphers (AES-ECB) divide data into fixed-size 128-bit chunks, requiring padding (PKCS#7) and memory buffers that introduce latency for streaming audio."
      },
      {
        text: "Asymmetric Key Encapsulation Mechanism (RSA-OAEP)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "RSA-OAEP is an asymmetric encryption algorithm for small key exchange blocks, computationally far too heavy for real-time voice encryption."
      },
      {
        text: "One-Way Cryptographic Hash (SHA-384)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "SHA-384 is a one-way hashing algorithm for integrity verification, not an encryption cipher."
      }
    ],
    technicalRationale: "Stream ciphers process continuous data streams of arbitrary length with zero padding and minimal buffering latency. Combined with Poly1305 (ChaCha20-Poly1305), it provides high-speed Authenticated Encryption on mobile and IoT devices lacking dedicated AES hardware acceleration.",
    kenyanMetaphor: "A Block Cipher is like an oil tanker truck: it refuses to leave the depot in Mombasa until you have pumped exactly 10,000 liters to fill the tank (fixed block size + padding). A Stream Cipher is like an open pipeline: every single drop of water that enters the pipe at one end flows out the other end immediately with zero waiting!"
  },

  {
    id: 42,
    portion: 9,
    subdomain: "1.2 Security Controls / Access Control Principles",
    scenario: "A forensic financial audit reveals that a rogue payroll accountant embezzled $250,000 over eighteen months by creating fictitious vendor profiles in the ERP system, submitting fabricated invoices for consulting work, and personally authorizing the direct bank transfers to an offshore bank account.",
    question: "Which organizational access control policy directly prevents this single point of failure by requiring multiple distinct individuals to complete different stages of a sensitive business workflow?",
    options: [
      {
        text: "Separation of Duties (SoD)",
        isCorrect: true,
        whyCorrect: "Separation of Duties (SoD) divides critical, high-risk tasks among multiple people so that no single employee has end-to-end control. In payroll/procurement, the person who creates new vendor accounts cannot be the same person who approves invoices or authorizes banking wire transfers. To commit fraud under SoD, two or more individuals must actively collude.",
        whyWrong: ""
      },
      {
        text: "Least Privilege",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Least Privilege limits an employee's access to only the minimum permissions required for their job role, but if the accountant's job role legitimately included both creating vendors and approving wires, least privilege alone would not prevent the fraud."
      },
      {
        text: "Mandatory Vacations",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Mandatory vacations are a detective control designed to expose ongoing fraud while an employee is away, not a preventive workflow barrier."
      },
      {
        text: "Job Rotation",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Job rotation moves employees periodically between different roles to detect fraud and cross-train staff, but does not split the workflow steps in real time."
      }
    ],
    technicalRationale: "Separation of Duties (SoD) is an administrative control designed to prevent internal fraud and abuse by distributing operational authorities across two or more separate job roles.",
    kenyanMetaphor: "In an M-Pesa sub-agency or bank branch: One clerk counts the cash and enters the deposit details into the computer terminal (initiator), but the transaction cannot execute until the branch supervisor swipes their manager smartcard to authorize the payout (approver). Neither one can steal alone without colluding!"
  },

  {
    id: 43,
    portion: 9,
    subdomain: "1.4 PKI / Certificate Lifecycle & Generation",
    scenario: "A systems administrator is tasked with securing an enterprise e-commerce web portal with a commercial TLS certificate. The administrator logs into the web server console, generates an asymmetric cryptographic key pair, and exports a file named portal.csr to send to a commercial Certificate Authority (CA) such as DigiCert.",
    question: "Which cryptographic element is included inside the Certificate Signing Request (CSR), and where does the server's private key remain?",
    options: [
      {
        text: "The CSR contains the server's public key and Distinguished Name (DN) identity details; the private key remains strictly on the local web server and is NEVER transmitted",
        isCorrect: true,
        whyCorrect: "When creating a CSR, the server generates the private key locally and stores it securely. The CSR contains the corresponding public key, the Distinguished Name (DN) (Common Name / FQDN, Organization, Country), and is digitally signed by the server's private key to prove possession. The private key must never leave the originating host under any circumstances.",
        whyWrong: ""
      },
      {
        text: "The CSR contains the server's private key so the CA can inspect and encrypt it",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Sending the private key to a third party completely invalidates asymmetric cryptography and creates a severe security compromise."
      },
      {
        text: "The CSR contains both the public and private keys bundled together in PKCS#12 (.pfx) format",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A CSR never includes the private key; PKCS#12 is an archive format used to store keys and certificates after issuance, not for signing requests."
      },
      {
        text: "The CSR contains the CA's root private key to sign the local certificate",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "The CA's root private key is guarded offline in an HSM vault and is never distributed to applicants."
      }
    ],
    technicalRationale: "RFC 2986 defines the PKCS#10 Certificate Signing Request. The applicant generates a key pair locally, packages the public key and subject attributes into the CSR, and signs it with the private key to prove possession.",
    kenyanMetaphor: "Applying for a Kenyan National ID card at Huduma Centre. You provide your biometric thumbprint, photograph, and birth certificate (the public CSR). You do NOT give the government clerk your brain or your private memories (the private key)! The government stamps a certified plastic card (the X.509 cert) confirming your identity."
  },

  {
    id: 44,
    portion: 9,
    subdomain: "1.2 Risk Management / Quantitative Risk Analysis",
    scenario: "An e-commerce company evaluates the risk of distributed denial-of-service (DDoS) attacks against its primary web storefront: The storefront generates $100,000 in revenue per day. A major DDoS attack causes an estimated financial impact (Single Loss Expectancy, SLE) of $50,000 per incident. Historical threat intelligence estimates that the storefront will experience three major DDoS attacks per year (Annualized Rate of Occurrence, ARO = 3). A cloud anti-DDoS scrubbing service costs $120,000 per year to deploy.",
    question: "What is the Annualized Loss Expectancy (ALE), and is the proposed cloud scrubbing control financially justified?",
    options: [
      {
        text: "ALE = $150,000; Yes, the control is justified because the $120,000 annual cost is less than the expected $150,000 annual loss",
        isCorrect: true,
        whyCorrect: "In quantitative risk analysis, ALE = SLE x ARO. Here, ALE = $50,000 x 3 = $150,000/year. Because the proposed security safeguard costs $120,000/year, the net annual benefit is positive ($150,000 - $120,000 = $30,000 net savings), making the security investment financially justified.",
        whyWrong: ""
      },
      {
        text: "ALE = $50,000; No, the control costs more than the loss",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "$50,000 is the Single Loss Expectancy (SLE), failing to multiply by the Annualized Rate of Occurrence (ARO = 3)."
      },
      {
        text: "ALE = $300,000; No, risk must be accepted",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "$300,000 incorrectly calculates the risk from total daily revenue rather than SLE."
      },
      {
        text: "ALE = $16,666; Yes, the control eliminates all risk",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "$16,666 is the result of dividing SLE by ARO instead of multiplying."
      }
    ],
    technicalRationale: "Quantitative risk management provides objective financial metrics: Asset Value (AV) x Exposure Factor (EF) = SLE. SLE x ARO = ALE. If the annual cost of a control is less than the ALE, the control is economically justified.",
    kenyanMetaphor: "If baboons break into your maize farm in Naivasha 3 times every year, and each raid destroys Ksh 50,000 worth of maize: your expected annual loss is Ksh 150,000 (ALE). If hiring an electric fence maintenance crew costs Ksh 120,000 per year, it makes total financial sense because you save Ksh 30,000 every harvest!"
  },

  {
    id: 45,
    portion: 9,
    subdomain: "1.1 Zero Trust Architecture / Dynamic Verification",
    scenario: "An employee connects to corporate cloud resources in the morning from their corporate-managed laptop in Nairobi using valid MFA credentials. Four hours into the workday, the employee's laptop downloads malware that disables BitLocker disk encryption and attempts an abnormal high-volume export of customer financial records to an unauthorized foreign IP address.",
    question: "In a mature Zero Trust Architecture (ZTA), how should the Policy Decision Point (PDP) respond to this mid-session behavioral anomaly?",
    options: [
      {
        text: "Immediately revoke the active session token and force step-up authentication or quarantine the endpoint, enforcing Continuous Verification rather than static perimeter trust",
        isCorrect: true,
        whyCorrect: "The core tenet of NIST SP 800-207 Zero Trust Architecture is Continuous Verification (or Continuous Adaptive Risk and Trust Assessment - CARTA). Authentication and authorization are not one-time events at initial login; the PDP continuously evaluates context (device health, endpoint posture, user behavior, network anomaly) throughout the entire session. If the endpoint posture degrades or anomalous behavior occurs, access is revoked in real time.",
        whyWrong: ""
      },
      {
        text: "Allow the session to continue uninterrupted until the 8-hour Kerberos ticket expires at the end of the day",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Allowing the session to run until ticket expiration is the classic flaw of legacy perimeter 'castle-and-moat' architectures, enabling ransomware and data exfiltration to thrive."
      },
      {
        text: "Demote the user's Active Directory account to Guest status permanently",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Modifying directory group memberships permanently is a manual administrative action, not an automated dynamic session response."
      },
      {
        text: "Send an unencrypted email notification to the employee asking if they initiated the transfer",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Sending an email alert does not protect data in transit and allows exfiltration to complete."
      }
    ],
    kenyanMetaphor: "In an old-fashioned building in Nairobi, once the guard at the front gate checks your ID badge, you can walk into any office, steal laptops, and nobody checks you for 8 hours (Perimeter trust). In a Zero Trust building, every corridor, lift, and office door has a smart biometric scanner that checks your badge and posture every 5 minutes: the moment you are spotted carrying a crowbar into the server room, every electronic door locks shut around you!"
  },

  // ==========================================
  // PORTION 10 (Q46 - Q50) - THE GRAND FINALE
  // ==========================================
  {
    id: 46,
    portion: 10,
    subdomain: "1.4 PKI / Certificate Validation & Trust Chains",
    scenario: "A Linux administrator deploys a new commercial TLS certificate on an NGINX reverse proxy. When tested from the administrator's desktop browser, the site loads securely with a green padlock. However, when hundreds of mobile users on Android and iOS devices attempt to connect, their apps immediately fail with the error: SEC_ERROR_UNKNOWN_ISSUER: The certificate issuer's certificate is not trusted. SSL lab inspection reveals that the administrator only configured the server with the leaf (end-entity) certificate and omitted the intermediate CA certificates.",
    question: "What is the technical root cause of this failure, and how must it be remediated?",
    options: [
      {
        text: "Broken Certificate Chain; remediated by appending the Intermediate Subordinate CA certificates to the server's certificate file to provide an unbroken path to the client's pre-installed Root CA trust anchor",
        isCorrect: true,
        whyCorrect: "In PKI, client devices only store Root CA certificates in their local trust stores. Servers are required to provide the complete Certificate Chain (the server's end-entity cert + any intermediate/subordinate CA certificates). If the server bundle omits the intermediate CA, mobile devices cannot link the leaf certificate back to a trusted root anchor in their trust store, causing SEC_ERROR_UNKNOWN_ISSUER.",
        whyWrong: ""
      },
      {
        text: "Expired Root CA; remediated by purchasing a new domain name",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Root CAs are valid for 10–25 years and purchasing a new domain does not fix a missing intermediate certificate bundle."
      },
      {
        text: "Weak Symmetric Cipher; remediated by disabling AES-GCM on the web server",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "AES-GCM is the gold-standard modern symmetric cipher and has no connection to X.509 certificate chain validation errors."
      },
      {
        text: "DNS Cache Poisoning; remediated by flushing the local client DNS resolver cache",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS cache poisoning redirects IP queries, whereas this error occurs during the cryptographic TLS handshake on a successfully resolved IP."
      }
    ],
    technicalRationale: "RFC 5246/8446 mandates that TLS servers supply a complete certificate chain up to, but not necessarily including, the trust anchor. Without intermediate certificates, clients cannot validate the cryptographic signatures linking the leaf certificate to a trusted root.",
    kenyanMetaphor: "You send your cousin to collect a parcel at a government ministry in Nairobi. He presents his national ID card signed by the Assistant Chief of his rural village. The security guard at the gate doesn't know this local assistant chief! Your cousin must also show the official letter from the County Commissioner endorsing the Chief, who is recognized by the Ministry of Interior. Without the intermediate letter linking him to the President, the guard blocks entry!"
  },

  {
    id: 47,
    portion: 10,
    subdomain: "1.4 Cryptographic Key Management / Escrow & Disaster Recovery",
    scenario: "An international payment processing firm maintains an offline master recovery private key capable of decrypting all historical transaction archives in a catastrophic disaster. To prevent any single rogue executive or rogue administrator from unilaterally reconstructing or abusing this master key, the company implements Shamir's Secret Sharing scheme: The master key is mathematically split into 5 distinct recovery shards. Any 3 out of the 5 designated C-suite executives must physically insert their encrypted hardware tokens simultaneously into the vault console to reconstruct the key.",
    question: "Which cryptographic and administrative security principle does this control enforce?",
    options: [
      {
        text: "M-of-N Split Knowledge / Dual Control",
        isCorrect: true,
        whyCorrect: "M-of-N Split Knowledge (or Multiparty Threshold Cryptography / Shamir's Secret Sharing) divides a cryptographic secret into N unique pieces such that any M pieces (the threshold, where M <= N) are required to reconstruct the original secret. No single individual possesses enough information to reconstruct the key alone, enforcing strict Dual Control and eliminating insider threats.",
        whyWrong: ""
      },
      {
        text: "Mandatory Access Control (MAC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "MAC assigns security classification labels (Top Secret) to users and resources, but does not provide threshold secret-sharing algorithms."
      },
      {
        text: "Homomorphic Encryption",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Homomorphic encryption allows mathematical computations directly on ciphertext without decrypting it."
      },
      {
        text: "Non-Repudiation with Digital Timestamping",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Timestamped non-repudiation proves when a document was signed, but cannot split a master decryption key across multiple custodians."
      }
    ],
    technicalRationale: "M-of-N threshold schemes enforce split knowledge and dual control for high-value root keys and recovery keys. This mathematically prevents unilateral compromise while providing fault tolerance against key custodian loss.",
    kenyanMetaphor: "The main vault of the Central Bank in Nairobi. It does not have one key held by the Governor. It has 5 separate heavy combination keys held by 5 different senior directors. To open the vault door, at least 3 of those 5 directors must stand at the door together and turn their keys at the exact same second. No single director or corrupt duo can ever steal the money!"
  },

  {
    id: 48,
    portion: 10,
    subdomain: "1.4 Access Control Schemes / Formal Security Models",
    scenario: "A military intelligence command enforces a strict multilevel security (MLS) operating system where data objects and users are tagged with hierarchical classification labels: Unclassified, Confidential, Secret, and Top Secret. To guarantee absolute confidentiality and prevent data leaks: (1) An analyst with Secret clearance is forbidden from reading documents labeled Top Secret (Simple Security Property: No Read Up); (2) An analyst with Secret clearance is forbidden from writing or copying information down into an Unclassified document (*-Property / Star Property: No Write Down).",
    question: "Which foundational formal access control security model is being implemented?",
    options: [
      {
        text: "Bell-LaPadula Model",
        isCorrect: true,
        whyCorrect: "The Bell-LaPadula Model is an information flow model designed specifically to enforce Confidentiality in multilevel security systems. It is defined by two mathematical axioms: Simple Security Property (No Read Up - a subject cannot read data at a higher security level) and *-Property (No Write Down - a subject cannot write data to a lower security level, preventing higher-level secrets from being leaked or downgraded).",
        whyWrong: ""
      },
      {
        text: "Biba Integrity Model",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "The Biba Model focuses strictly on Integrity (not confidentiality) and enforces the exact inverse rules: No Read Down and No Write Up."
      },
      {
        text: "Clark-Wilson Model",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Clark-Wilson is a commercial integrity model that uses Well-Formed Transactions and Separation of Duties to prevent unauthorized modification."
      },
      {
        text: "Discretionary Access Control (DAC)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DAC gives file owners complete discretion to share files, offering no mathematical guarantees against data leaks."
      }
    ],
    technicalRationale: "Bell-LaPadula enforces confidentiality via 'No Read Up' (prevents unauthorized access) and 'No Write Down' (prevents classified leakage). Biba enforces integrity via 'No Read Down' and 'No Write Up'.",
    kenyanMetaphor: "A Kenya Defence Forces (KDF) military intelligence bunker: A captain with 'Secret' clearance cannot read the General's 'Top Secret' battle plans (No Read Up). And when the captain writes a memo to a junior civilian clerk, he is blocked from typing any of his 'Secret' knowledge into that public memo (No Write Down), ensuring classified military secrets never leak downward!"
  },

  {
    id: 49,
    portion: 10,
    subdomain: "1.2 Security Controls & Data Protection / DLP Architecture",
    scenario: "A corporate healthcare research institution wants to stop proprietary drug research formulas from being stolen by disgruntled departing scientists. The organization needs a technical control installed on all scientist workstations that: (1) Monitors memory and active user actions to block copying formulas to personal USB thumb drives or external hard drives; (2) Blocks sensitive research text from being pasted into personal webmail or unauthorized messaging apps; (3) Quarantines unencrypted research files if placed into local cloud sync folders (e.g., personal Dropbox or Google Drive).",
    question: "Which security solution directly provides these workstation-level safeguards?",
    options: [
      {
        text: "Endpoint Data Loss Prevention (Endpoint DLP)",
        isCorrect: true,
        whyCorrect: "Endpoint DLP runs as a specialized software agent installed directly on client workstations. It monitors data in use (clipboard cut/copy/paste, print screen) and data in motion at the endpoint (USB mass storage devices, optical burners, personal cloud sync folders, web browsers), enforcing real-time blocking and quarantine policies even when the device is disconnected from the corporate VPN.",
        whyWrong: ""
      },
      {
        text: "Network Intrusion Prevention System (NIPS)",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "A NIPS sits on the network perimeter or switch spans to inspect packet payloads for exploit signatures; it cannot inspect clipboard operations or USB ports on local laptops."
      },
      {
        text: "DNS Sinkholing",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "DNS Sinkholing redirects malicious malware domain lookups to a benign IP, completely unrelated to USB drive blocking."
      },
      {
        text: "Port Security with 802.1X Network Access Control",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "802.1X controls whether a device is allowed to link to an Ethernet switch port or Wi-Fi SSID, not what files a scientist writes to a USB flash drive."
      }
    ],
    technicalRationale: "Endpoint DLP monitors data in use (RAM, clipboard, peripherals) and data in motion directly at the operating system driver and API level, enforcing contextual policies independent of network connectivity.",
    kenyanMetaphor: "Having a security guard inspecting cars at the main gate is Network DLP. But Endpoint DLP is having an invisible supervisor standing right behind each scientist's desk: the moment the scientist plugs in a personal flash drive or tries to copy proprietary research formulas into their personal WhatsApp Web, the computer slaps their hand away and pops up: 'ACCESS DENIED: COMPANY POLICY VIOLATION!'"
  },

  {
    id: 50,
    portion: 10,
    subdomain: "1.2 Security Frameworks & Baselines / NIST CSF Structure",
    scenario: "An organization is updating its enterprise cybersecurity program to align with the newly released NIST Cybersecurity Framework (CSF) 2.0. During an executive board presentation, the Chief Information Security Officer (CISO) emphasizes that CSF 2.0 has introduced a brand new core Pillar/Function that explicitly addresses organizational context, executive cybersecurity strategy, supply chain risk governance, and enterprise-wide cybersecurity policy oversight.",
    question: "Which of the following is the new core Function introduced in NIST CSF 2.0 alongside Identify, Protect, Detect, Respond, and Recover?",
    options: [
      {
        text: "GOVERN",
        isCorrect: true,
        whyCorrect: "In February 2024, NIST officially published NIST CSF 2.0, which expanded the original five core functions (Identify, Protect, Detect, Respond, Recover) to six functions by introducing GOVERN (GV). The GOVERN function sits at the center of the framework, establishing how an organization establishes, communicates, and monitors its cybersecurity risk management strategy, expectations, roles, and policy across leadership and supply chains.",
        whyWrong: ""
      },
      {
        text: "AUTHENTICATE",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Authenticate is a technical capability under Protect (PR.AA), not a top-level CSF 2.0 Function."
      },
      {
        text: "ISOLATE",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Isolate is a containment action under Respond, not a primary CSF 2.0 Function."
      },
      {
        text: "COMPLY",
        isCorrect: false,
        whyCorrect: "",
        whyWrong: "Comply is a regulatory objective, not one of the six standardized NIST CSF 2.0 Functions."
      }
    ],
    technicalRationale: "NIST CSF 2.0 added the GOVERN function to ensure cybersecurity risk is treated alongside financial and reputational risk at the senior executive and board of directors levels. The six functions are: Govern, Identify, Protect, Detect, Respond, Recover.",
    kenyanMetaphor: "Running a nationwide banking institution. The original 5 functions are the field operations: Spotting risks (Identify), building walls (Protect), sounding alarms (Detect), arresting robbers (Respond), and repairing broken branches (Recover). The new GOVERN function is the Board of Directors sitting in the boardroom on the 30th floor in Nairobi, setting the risk policies, allocating budgets, and demanding accountability so all 5 field operations work in harmony!"
  }
];









