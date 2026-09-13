import React, { useState } from 'react';
import { 
  Terminal, Play, ArrowLeft, Sparkles, BookOpen, Shield, 
  RotateCcw, CheckCircle2, ChevronRight, Copy, Check, 
  Monitor, Cpu, Globe, Network, ArrowRight, RefreshCw,
  HelpCircle, AlertCircle, Eye, Wifi, ExternalLink
} from 'lucide-react';
import { sounds } from '../../utils/audio';

export const CHECKPOINT1_TASKS = [
  {
    id: 'task1',
    taskNumber: 'Task 1',
    title: 'Kali Linux on VirtualBox Installation & Verification',
    shortTitle: '1. VirtualBox Setup',
    icon: '📦',
    objective: 'Complete the installation of Kali Linux VM, update packages, and verify that the virtual network adapter is alive.',
    commands: [
      {
        cmd: 'sudo apt update && sudo apt upgrade -y',
        desc: 'Updates the list of available software and installs the latest security patches.',
        kenyan: 'Like checking your phone apps in the Play Store and tapping "Update All" while connected to home WiFi so your phone has no security bugs.'
      },
      {
        cmd: 'ip a',
        desc: 'Shows all network cards (interfaces) attached to Kali Linux and their assigned IP addresses.',
        kenyan: 'Checking your national identity card and passport to verify your official legal names and home address.'
      }
    ],
    qas: [
      {
        q: 'Why do we use VirtualBox instead of installing Kali directly on our main physical laptop hard drive?',
        a: 'Safety & Isolation (The Sandbox). Kali Linux has offensive penetration testing tools. Running it inside VirtualBox means if a tool breaks or gets infected with malware during a lab, your main Windows machine and personal photos remain completely safe. You can simply delete the VM and recreate it in 2 minutes!',
        kenyan: 'Like renting a separate small kiosk in Gikomba market to test making welding fireworks, instead of lighting fires inside your mother’s living room carpet.'
      },
      {
        q: 'How do you verify Kali is connected to the internet after installation?',
        a: 'Check the top-right tray in Kali for the wired ethernet icon (two computer screens or ethernet symbol). Then open the terminal and type "ping -c 3 8.8.8.8". If packets return with 0% packet loss, connectivity is 100% verified.',
        kenyan: 'Looking at your phone screen to see if the "4G" or "WiFi" icon has appeared and sending a test "Niaje" WhatsApp message to verify data bundles are active.'
      }
    ],
    screenshotHint: 'Terminal showing "sudo apt update" finishing with "All packages are up to date" and "ip a" displaying the eth0 interface with an IP address.',
    terminalSim: `┌──(kali㉿kali)-[~]
└─$ sudo apt update
Hit:1 http://kali.download/kali kali-rolling InRelease
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
All packages are up to date!

┌──(kali㉿kali)-[~]
└─$ ip a
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN
    inet 127.0.0.1/8 scope host lo
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic eth0
    valid_lft 86312sec preferred_lft 86312sec`
  },

  {
    id: 'task2',
    taskNumber: 'Task 2',
    title: 'The Ping & Google DNS (8.8.8.8) Test',
    shortTitle: '2. Ping 8.8.8.8',
    icon: '🏓',
    objective: 'Run "ping 8.8.8.8" to test ICMP reachability and explain what ping does and why 8.8.8.8 is used.',
    commands: [
      {
        cmd: 'ping 8.8.8.8',
        desc: 'Sends ICMP Echo Requests (Type 8) to 8.8.8.8 and waits for ICMP Echo Replies (Type 0). In Linux, it runs indefinitely until you press Ctrl + C.',
        kenyan: 'Shouting "Hodi hodi!" at the neighbor\'s gate and waiting for someone to shout back "Karibu ndani!" to confirm someone is home.'
      },
      {
        cmd: 'ping -c 4 8.8.8.8',
        desc: 'Sends exactly 4 pings and automatically stops without having to press Ctrl + C.',
        kenyan: 'Knocking on the door exactly 4 times and walking away if nobody answers.'
      }
    ],
    qas: [
      {
        q: 'What does the ping command do?',
        a: 'The ping command tests whether a remote computer or server is alive, reachable across the network, and how long it takes for a message to travel there and back (round-trip time in milliseconds). It uses the ICMP protocol (Echo Request and Echo Reply).',
        kenyan: 'Like giving a missed call (flash call) to your friend’s phone to confirm his Safaricom line is on and has network before you send him money on M-Pesa.'
      },
      {
        q: 'What is the IP address 8.8.8.8, and why is it commonly used?',
        a: '8.8.8.8 is Google’s free Public DNS (Domain Name System) server. It is famous worldwide, easy to remember, has 99.99% uptime, and is open to the entire public without authentication.',
        kenyan: 'Like the Kencom Clock tower or National Archives in Nairobi city centre. Everyone in Kenya knows where it is, it never moves, and it is the universal landmark people use to check if they are in town.'
      },
      {
        q: 'What is the objective of running this command?',
        a: 'The objective is to isolate networking vs DNS resolution. If "ping 8.8.8.8" succeeds, your router, IP stack, and internet cable work 100%! If "ping google.com" then fails, you know immediately that your internet is fine and only your DNS server is misconfigured.',
        kenyan: 'Testing if water comes out of the main tap in the compound before blaming the shower head inside your bathroom for having no water.'
      }
    ],
    screenshotHint: 'Terminal showing "64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=21.4 ms" with 0% packet loss after pressing Ctrl + C.',
    terminalSim: `┌──(kali㉿kali)-[~]
└─$ ping -c 4 8.8.8.8
PING 8.8.8.8 (8.8.8.8) 56(84) bytes of data.
64 bytes from 8.8.8.8: icmp_seq=1 ttl=116 time=18.4 ms
64 bytes from 8.8.8.8: icmp_seq=2 ttl=116 time=19.1 ms
64 bytes from 8.8.8.8: icmp_seq=3 ttl=116 time=17.8 ms
64 bytes from 8.8.8.8: icmp_seq=4 ttl=116 time=18.6 ms

--- 8.8.8.8 ping statistics ---
4 packets transmitted, 4 received, 0% packet loss, time 3004ms
rtt min/avg/max/mdev = 17.842/18.475/19.102/0.461 ms`
  },

  {
    id: 'task2_1',
    taskNumber: 'Task 2.1',
    title: 'Traceroute to 8.8.8.8 (Tracking the Hops)',
    shortTitle: '2.1. Traceroute',
    icon: '🗺️',
    objective: 'Run "traceroute 8.8.8.8" from Kali to inspect every router (hop) between your virtual machine and Google.',
    commands: [
      {
        cmd: 'traceroute 8.8.8.8',
        desc: 'Sends packets with increasing Time-To-Live (TTL = 1, 2, 3...) to discover every intermediary router on the path.',
        kenyan: 'Taking a bus trip from Nairobi to Mombasa and writing down every single town you stop at (Machakos junction, Mtito Andei, Voi, Mariakani) before reaching Mombasa.'
      }
    ],
    qas: [
      {
        q: 'What does traceroute show?',
        a: 'It maps the exact journey of your data packets across the internet from your Kali VM to Google. It lists the IP address or hostname of every router along the path and measures the transit delay (latency in milliseconds).',
        kenyan: 'Like a delivery tracking receipt showing: "Left Nairobi warehouse ➡️ Arrived Athi River sorting facility ➡️ Reached Mombasa port".'
      },
      {
        q: 'How many hops does it take to reach Google\'s DNS?',
        a: 'Typically between 8 to 15 hops depending on your Internet Service Provider (Safaricom, Zuku, Airtel, Faiba). Each hop is one physical or virtual router passing the packet along.',
        kenyan: 'How many matatu stages or checkpoints you have to go through between your house in Roysambu and your office in Upperhill.'
      },
      {
        q: 'What does each line represent?',
        a: 'Each line represents ONE HOP (one router). It shows: (1) The Hop Number (1, 2, 3...), (2) The Router Domain Name or IP address, and (3) Three round-trip timing samples (e.g., 2.1ms, 2.3ms, 2.0ms). If a line shows "***", it means that router has a firewall blocking ICMP/UDP traceroute probes.',
        kenyan: 'Each line is one toll station on the Nairobi Expressway. If a toll station shows "***", the security guard there refuses to wave back or speak to strangers, but he still lets your car pass through.'
      }
    ],
    screenshotHint: 'Terminal showing 10-14 numbered lines starting from 10.0.2.2 (VirtualBox gateway) all the way to 8.8.8.8 (dns.google).',
    terminalSim: `┌──(kali㉿kali)-[~]
└─$ traceroute 8.8.8.8
traceroute to 8.8.8.8 (8.8.8.8), 30 hops max, 60 byte packets
 1  _gateway (10.0.2.2)  0.241 ms  0.198 ms  0.185 ms
 2  192.168.100.1 (192.168.100.1)  1.421 ms  1.385 ms  1.360 ms
 3  10.12.0.1 (10.12.0.1)  6.112 ms  5.980 ms  6.024 ms
 4  196.201.214.25 (safaricom-gw.ke)  12.341 ms  12.110 ms  12.204 ms
 5  72.14.212.18 (google-peering.nbi)  15.820 ms  15.910 ms  15.742 ms
 6  142.250.224.110 (142.250.224.110)  18.112 ms  18.045 ms  18.150 ms
 7  dns.google (8.8.8.8)  18.421 ms  18.310 ms  18.390 ms`
  },

  {
    id: 'task3',
    taskNumber: 'Task 3',
    title: 'Finding IP Addresses & Testing Host-to-VM Ping',
    shortTitle: '3. Host vs VM IP',
    icon: '🔍',
    objective: 'Discover the IP addresses of both machines (ip a on Kali, ipconfig on Windows), try pinging one from the other, and explain the result.',
    commands: [
      {
        cmd: 'ip a  # (Run inside Kali Linux terminal)',
        desc: 'Inspects network interfaces on Kali. Look under eth0 for inet (e.g. 10.0.2.15).',
        kenyan: 'Checking your national identity card inside your bag.'
      },
      {
        cmd: 'ipconfig  # (Run inside Windows Command Prompt / PowerShell)',
        desc: 'Inspects network interfaces on Windows. Look for "IPv4 Address" under Wi-Fi or Ethernet (e.g. 192.168.100.15).',
        kenyan: 'Checking your house title deed or electricity bill on the living room table.'
      }
    ],
    qas: [
      {
        q: 'Can they communicate? Explain the result.',
        a: 'Under default VirtualBox NAT mode:\n• Kali can ping the Windows host (at 10.0.2.2 or host Wi-Fi IP if Windows firewall allows it).\n• BUT Windows CANNOT ping Kali (10.0.2.15)! The ping from Windows will say "Request timed out".\n\nWhy? Because under NAT, VirtualBox puts Kali inside a private one-way hidden network. VirtualBox translates Kali\'s outgoing packets, but does not allow inbound connections from the host to reach inside the VM.',
        kenyan: 'Like you sitting inside a cinema hall looking through a one-way tinted window. You can see people outside and talk to the outside world on your phone, but people on the street outside cannot see you or knock on your door because the door is locked from the outside.'
      },
      {
        q: 'Why does Windows often block pings even if you are on the same network?',
        a: 'Windows Defender Firewall blocks incoming ICMP Echo Requests by default on public and private networks for security stealth. To allow it, Windows needs an inbound rule allowing File and Printer Sharing (Echo Request - ICMPv4-In).',
        kenyan: 'Like having an electric gate that has a silent buzzer: the visitor rings the bell outside, but the security guard inside keeps his radio muted so he doesn\'t hear the knock.'
      }
    ],
    screenshotHint: 'Side-by-side or split screenshot: Windows cmd running "ipconfig" and Kali terminal running "ip a", followed by ping attempts.',
    terminalSim: `=== [WINDOWS COMMAND PROMPT] ===
C:\\Users\\Student> ipconfig
Wireless LAN adapter Wi-Fi:
   IPv4 Address. . . . . . . . . . . : 192.168.100.25
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.100.1

C:\\Users\\Student> ping 10.0.2.15
Pinging 10.0.2.15 with 32 bytes of data:
Request timed out.
Request timed out.
Packets: Sent = 2, Received = 0, Lost = 2 (100% loss)

=== [KALI LINUX TERMINAL] ===
┌──(kali㉿kali)-[~]
└─$ ip a | grep inet
    inet 127.0.0.1/8 scope host lo
    inet 10.0.2.15/24 brd 10.0.2.255 scope global dynamic eth0`
  },

  {
    id: 'task4',
    taskNumber: 'Task 4',
    title: 'VirtualBox Network Modes: NAT vs. Bridged Adapter',
    shortTitle: '4. NAT vs Bridged',
    icon: '🔌',
    objective: 'Test NAT vs. Bridged Adapter modes in VirtualBox, restart network interface (sudo systemctl restart NetworkManager), and explain the differences.',
    commands: [
      {
        cmd: 'sudo systemctl restart NetworkManager',
        desc: 'Restarts the network manager service in Kali to request a fresh DHCP IP address after changing VirtualBox adapter modes.',
        kenyan: 'Switching your phone to Airplane Mode for 5 seconds and turning it back on so it catches a fresh Safaricom tower frequency.'
      },
      {
        cmd: 'sudo dhclient -v eth0',
        desc: 'Manually requests an IP address from the DHCP server on the current virtual network.',
        kenyan: 'Walking up to the estate chairman and asking for your new official house parking number.'
      }
    ],
    qas: [
      {
        q: 'What is the difference between NAT and Bridged Adapter modes?',
        a: '• NAT (Network Address Translation): VirtualBox creates an invisible private mini-router (10.0.2.x). Kali shares the host\'s IP address to reach the internet. Kali is hidden from other devices on your home WiFi.\n\n• Bridged Adapter: VirtualBox hooks Kali directly onto your physical WiFi/Ethernet router. Kali gets its OWN real IP address (e.g., 192.168.100.42) directly from your home router, sitting side-by-side with your Windows PC, phone, and smart TV.',
        kenyan: '• NAT = You are a small child living in your father\'s bedroom. Any letter you send goes through your father\'s mailbox, and visitors on the street cannot see your bedroom.\n• Bridged = You move out of your father\'s bedroom and rent your own independent bedsitter next door on the same plot. You get your own door key and electric meter, and anyone can knock directly on your door!'
      },
      {
        q: 'In which mode is the VM able to ping the host machine and vice versa?',
        a: 'In BRIDGED ADAPTER mode! Because both Windows and Kali are now full peers on the exact same local home subnet (e.g. 192.168.100.x), Windows can ping Kali, and Kali can ping Windows (as long as Windows firewall allows ICMP). Under NAT mode, only the VM could reach out to the host, but the host could not reach inside the VM without manual Port Forwarding.',
        kenyan: 'In Bridged mode, both you and your brother are standing in the same estate compound playing football together. You can throw the ball to him, and he can kick it right back to you!'
      },
      {
        q: 'Why does Kali keep the old IP until you restart the interface?',
        a: 'Because Linux caches the DHCP lease. When you switch settings in the VirtualBox GUI while Kali is running, Kali does not automatically know you pulled the virtual cable. Restarting NetworkManager or running "sudo dhclient -v eth0" forces Kali to ask for a new IP address matching the new mode.',
        kenyan: 'If you move from Kisumu to Mombasa, your old Kisumu address remains on your driver\'s license until you visit the Huduma Centre to renew your details.'
      }
    ],
    screenshotHint: 'VirtualBox Network Settings dialog showing "Attached to: Bridged Adapter", followed by Kali terminal showing its new 192.168.x.x IP address and successful mutual ping.',
    terminalSim: `=== [SWITCHED TO BRIDGED ADAPTER IN VIRTUALBOX] ===
┌──(kali㉿kali)-[~]
└─$ sudo systemctl restart NetworkManager

┌──(kali㉿kali)-[~]
└─$ ip a show eth0
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP
    inet 192.168.100.75/24 brd 192.168.100.255 scope global dynamic eth0

┌──(kali8kali)-[~]
└─$ ping -c 2 192.168.100.25  # (Pinging Windows Host)
64 bytes from 192.168.100.25: icmp_seq=1 ttl=128 time=0.824 ms
64 bytes from 192.168.100.25: icmp_seq=2 ttl=128 time=0.791 ms

=== [FROM WINDOWS HOST CMD] ===
C:\\Users\\Student> ping 192.168.100.75  # (Pinging Kali VM)
Reply from 192.168.100.75: bytes=32 time<1ms TTL=64
Reply from 192.168.100.75: bytes=32 time<1ms TTL=64
[SUCCESS] Two-way communication established!`
  }
];

export default function Checkpoint1StudioSim({ onBack }) {
  const [activeTaskId, setActiveTaskId] = useState('task1');
  const [activeAnimMode, setActiveAnimMode] = useState('nat'); // 'nat' vs 'bridged'
  const [copiedCmd, setCopiedCmd] = useState(null);
  const [animRunning, setAnimRunning] = useState(false);
  const [animStep, setAnimStep] = useState(0);

  const activeTask = CHECKPOINT1_TASKS.find(t => t.id === activeTaskId) || CHECKPOINT1_TASKS[0];

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(text);
    sounds.playPop();
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleRunAnimation = (mode) => {
    sounds.playPop();
    setActiveAnimMode(mode);
    setAnimRunning(true);
    setAnimStep(1);

    setTimeout(() => {
      setAnimStep(2);
    }, 1200);

    setTimeout(() => {
      setAnimStep(3);
    }, 2400);

    setTimeout(() => {
      setAnimRunning(false);
      sounds.playSuccess();
    }, 3600);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 space-y-8 animate-fadeIn">
      
      {/* Top Breadcrumbs */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-950 rounded-2xl border-2 border-slate-200 transition-all font-bold text-xs sm:text-sm shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-950 border border-indigo-300 rounded-full font-black text-xs">
            CompTIA Security+ Lab • Checkpoint 1: Virtualization & Network Discovery
          </span>
        </div>
      </div>

      {/* Main Hero Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-400 shadow-md space-y-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl sm:text-5xl">🐧🔌</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-indigo-600 text-white rounded-full font-black text-xs uppercase">
                Official Lab Solution
              </span>
              <span className="text-xs text-slate-500 font-bold">Step-by-Step Practical & Kenyan Realities</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Checkpoint 1: Virtualization, Networking & Web Discovery
            </h1>
            <p className="text-slate-600 font-medium text-xs sm:text-base">
              Solve all 4 lab questions with exact Kali Linux and Windows terminal commands, simple non-jargon explanations, Kenyan everyday analogies, and live interactive packet route animations!
            </p>
          </div>
        </div>

        {/* Task Selection Pills (Horizontal swipe on phone) */}
        <div className="pt-3 border-t border-slate-100 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-2 px-2 sm:mx-0 sm:px-0">
          {CHECKPOINT1_TASKS.map((task) => {
            const isActive = activeTaskId === task.id;
            return (
              <button
                key={task.id}
                onClick={() => { sounds.playPop(); setActiveTaskId(task.id); }}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0 border-2 ${
                  isActive
                    ? 'bg-indigo-600 border-indigo-700 text-white shadow-md shadow-indigo-200 scale-102'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{task.icon}</span>
                <span>{task.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MOVING ANIMATION: NAT VS BRIDGED ADAPTER PACKET ROLLERCOASTER */}
      {/* ========================================================================= */}
      <div className="bg-slate-950 rounded-3xl p-5 sm:p-7 border-4 border-indigo-500/50 shadow-2xl space-y-5 text-white">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🏃‍♂️⚡</span>
              <h3 className="font-black text-lg text-indigo-300">
                LIVE MOVING ANIMATION: How Packets Flow (NAT vs. Bridged)
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Click the mode below to watch whether packets can reach between Kali VM and your Windows Host!
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleRunAnimation('nat')}
              disabled={animRunning}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeAnimMode === 'nat'
                  ? 'bg-amber-500 border-amber-400 text-slate-950 shadow-lg shadow-amber-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>🚪 Test 1: NAT Mode</span>
            </button>

            <button
              onClick={() => handleRunAnimation('bridged')}
              disabled={animRunning}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                activeAnimMode === 'bridged'
                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/30'
                  : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800'
              }`}
            >
              <span>🌉 Test 2: Bridged Mode</span>
            </button>
          </div>
        </div>

        {/* The Animated Network Stage */}
        <div className="relative bg-slate-900/90 rounded-2xl p-5 border border-slate-800 min-h-[220px] flex flex-col justify-between overflow-hidden">
          
          {/* Top Label & Mode Status */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-slate-400">
              Active VirtualBox Mode:{' '}
              <strong className={activeAnimMode === 'nat' ? 'text-amber-400' : 'text-emerald-400'}>
                {activeAnimMode === 'nat' ? 'NAT (Hidden Mini-Router 10.0.2.x)' : 'BRIDGED (Direct Home WiFi Peer 192.168.100.x)'}
              </strong>
            </span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {animRunning ? 'Packet Traveling... 🚀' : 'Click a mode above to launch packet'}
            </span>
          </div>

          {/* Graphical Nodes Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-center my-4 relative">
            
            {/* Node 1: Kali Linux VM */}
            <div className={`p-4 rounded-2xl border text-center space-y-1.5 transition-all ${
              activeAnimMode === 'nat' ? 'bg-amber-950/40 border-amber-500/40' : 'bg-emerald-950/40 border-emerald-500/40'
            }`}>
              <div className="text-3xl">🐧</div>
              <div className="font-black text-xs text-white">Kali Linux VM</div>
              <div className="text-[11px] font-mono text-cyan-300 font-bold">
                {activeAnimMode === 'nat' ? 'IP: 10.0.2.15' : 'IP: 192.168.100.75'}
              </div>
              <span className="text-[10px] text-slate-400 block">
                {activeAnimMode === 'nat' ? 'Hidden behind NAT' : 'Real peer on WiFi'}
              </span>
            </div>

            {/* Middle: VirtualBox Switch / Gateway */}
            <div className="p-4 rounded-2xl border border-slate-700 bg-slate-950 text-center space-y-1.5 relative">
              <div className="text-3xl">{activeAnimMode === 'nat' ? '🛡️' : '🌉'}</div>
              <div className="font-black text-xs text-slate-200">
                {activeAnimMode === 'nat' ? 'VirtualBox NAT Router' : 'Home WiFi Router Switch'}
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {activeAnimMode === 'nat' ? 'Gateway: 10.0.2.2' : 'Subnet: 192.168.100.0/24'}
              </div>

              {/* Animated Packet indicator */}
              {animRunning && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full text-[10px] font-black animate-bounce shadow-md ${
                  activeAnimMode === 'nat' ? 'bg-amber-400 text-slate-950' : 'bg-emerald-400 text-slate-950'
                }`}>
                  {animStep === 1 && 'Packet: Ping 8.8.8.8 ➡️'}
                  {animStep === 2 && (activeAnimMode === 'nat' ? 'NAT translating IP...' : 'Switch forwarding frame...')}
                  {animStep === 3 && 'Reply: Echo Reply OK! ✅'}
                </div>
              )}
            </div>

            {/* Node 3: Windows Host / Internet */}
            <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900 text-center space-y-1.5">
              <div className="text-3xl">💻🌐</div>
              <div className="font-black text-xs text-white">Windows Host & Internet</div>
              <div className="text-[11px] font-mono text-emerald-400 font-bold">
                Host: 192.168.100.25
              </div>
              <span className="text-[10px] text-slate-400 block">
                {activeAnimMode === 'nat' ? 'Host cannot reach inside VM ❌' : 'Host can ping VM directly! ✅'}
              </span>
            </div>

          </div>

          {/* Bottom Metaphor Strip */}
          <div className={`p-3 rounded-xl border text-xs font-medium ${
            activeAnimMode === 'nat'
              ? 'bg-amber-950/60 border-amber-500/30 text-amber-200'
              : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-200'
          }`}>
            <span className="font-black mr-1">🇰🇪 Kenyan Reality:</span>
            {activeAnimMode === 'nat'
              ? 'NAT is like living in your parent\'s locked back bedroom. You can peek out the window and shout greetings to the street, but strangers on the road cannot open your bedroom door.'
              : 'Bridged is moving out and renting your own bedsitter in the same plot. You get your own doorbell and house number; your brother in the next room can walk straight over to borrow salt!'}
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* DETAILED TASK SOLUTION WORKSPACE */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Questions, Explanations & Kenyan Metaphors (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          
          <div className="bg-white rounded-3xl p-6 border-3 border-indigo-200 shadow-md space-y-5">
            
            <div className="border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-indigo-600 font-black text-xs uppercase tracking-wider">
                <span>{activeTask.taskNumber} Official Guide</span>
                <span>•</span>
                <span>Step-by-Step Breakdown</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {activeTask.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
                {activeTask.objective}
              </p>
            </div>

            {/* Commands to run */}
            <div className="space-y-3">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                Required Commands to Execute:
              </span>

              {activeTask.commands.map((cmdItem, i) => (
                <div key={i} className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <code className="bg-slate-950 text-amber-300 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-bold flex-1 overflow-x-auto no-scrollbar">
                      $ {cmdItem.cmd}
                    </code>
                    <button
                      onClick={() => handleCopy(cmdItem.cmd.split('#')[0].trim())}
                      className="p-2 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-slate-600 transition-all active:scale-95 shrink-0 cursor-pointer"
                      title="Copy Command"
                    >
                      {copiedCmd === cmdItem.cmd.split('#')[0].trim() ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <p className="text-xs text-slate-700 font-medium">{cmdItem.desc}</p>
                  <div className="text-[11px] bg-amber-50 border border-amber-200 rounded-lg p-2 text-amber-950 font-medium">
                    <span className="font-black">🇰🇪 Plain Analogy: </span>
                    <span>{cmdItem.kenyan}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Questions Answered Directly */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-black uppercase text-indigo-700 tracking-wider block">
                Questions Answered Clearly (For Your Lab Report):
              </span>

              {activeTask.qas.map((qa, i) => (
                <div key={i} className="p-4 rounded-2xl bg-indigo-50/70 border-2 border-indigo-200 space-y-2 text-xs sm:text-sm">
                  <div className="flex items-start gap-2 font-black text-indigo-950">
                    <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{qa.q}</span>
                  </div>
                  <div className="pl-6 text-slate-700 font-medium leading-relaxed whitespace-pre-line">
                    {qa.a}
                  </div>
                  {qa.kenyan && (
                    <div className="ml-6 p-2.5 bg-white rounded-xl border border-indigo-200 text-indigo-900 italic text-xs">
                      <span className="font-bold not-italic">🇰🇪 Nairobi Analogy: </span>
                      {qa.kenyan}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Screenshot Submission Requirement Alert */}
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 font-medium space-y-1">
              <div className="flex items-center gap-2 font-black text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>What to Capture in Your Screenshot for {activeTask.taskNumber}:</span>
              </div>
              <p>{activeTask.screenshotHint}</p>
            </div>

          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Simulated Terminal Output (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-950 rounded-3xl p-4 sm:p-5 border-4 border-slate-800 shadow-xl space-y-3 font-mono text-white">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs font-bold text-slate-400 pl-2">Kali Terminal Simulator</span>
              </div>

              <span className="text-[10px] text-slate-500">Live Sample Output</span>
            </div>

            <div className="text-xs text-slate-400 font-sans">
              Below is the exact output your terminal will display when running this step correctly:
            </div>

            {/* Preformatted Shell Output */}
            <div className="p-3 bg-black/70 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 overflow-x-auto whitespace-pre leading-relaxed max-h-[460px] no-scrollbar">
              {activeTask.terminalSim}
            </div>

            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[11px] text-slate-400 font-sans">
              <span>Ready for your report submission</span>
              <button
                onClick={() => handleCopy(activeTask.terminalSim)}
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                {copiedCmd === activeTask.terminalSim ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd === activeTask.terminalSim ? 'Copied Text' : 'Copy Output'}</span>
              </button>
            </div>

          </div>

          {/* Quick Checklist for Student */}
          <div className="bg-white rounded-3xl p-5 border-3 border-slate-200 shadow-sm space-y-3 text-xs">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Checkpoint 1 Submission Checklist</span>
            </h4>

            <div className="space-y-2 text-slate-700">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">1</span>
                <span>Kali VirtualBox installed & updated ("sudo apt update")</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">2</span>
                <span>Ping 8.8.8.8 screenshot & 3 questions answered</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">3</span>
                <span>Traceroute 8.8.8.8 output & hop analysis completed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">4</span>
                <span>IP discovery ("ip a" vs "ipconfig") & host ping test explained</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">5</span>
                <span>NAT vs Bridged Adapter tested and difference articulated</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
