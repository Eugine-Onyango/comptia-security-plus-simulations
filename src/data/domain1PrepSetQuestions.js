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
  }
];


