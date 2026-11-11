// Splunk Module 1 Data: Intro to Splunk (Components & Basic Functions)
// Tailored for ADHD, neurodivergent, anxiety-free learning with dual analogies:
// 1. Estate Gate Guard & Visitor Book
// 2. Kenyan Everyday Life (Matatu Sacco Stage & Supermarket)

export const splunkModule1Data = {
  moduleId: 1,
  title: "Module 1 – Intro to Splunk",
  headline: "Meet the Super Guard and the 3 Helpers",
  description: "Learn how Splunk turns millions of messy computer logs into clear, instant answers without breaking a sweat.",
  subtopics: [
    {
      id: "components",
      title: "1. Splunk Components (The Three Helpers)",
      badge: "Architecture & Helpers",
      colorTheme: "amber",
      layman: {
        title: "What are Splunk Components in Plain English?",
        intro: "In modern computing, thousands of servers, apps, firewalls, and phones produce millions of lines of text notes (called logs) every minute. Trying to inspect them manually is impossible.",
        explanation: "Splunk solves this impossible task by dividing the job between three specialized helpers that work like an efficient team: one gathers the notes from afar, one organizes and locks them in labeled storage, and one talks to you to find answers in seconds.",
        bullets: [
          {
            term: "Forwarder",
            simple: "The nimble agent installed on each computer that captures logs as they happen and forwards them to headquarters without eating up system power."
          },
          {
            term: "Indexer",
            simple: "The central storage engine that receives raw data, stamps precise timestamps, turns messy text into searchable events, and stores them in indexed boxes."
          },
          {
            term: "Search Head",
            simple: "The brain and web interface where you type questions. It asks the Indexers to retrieve relevant data, calculates statistics, and presents the results."
          }
        ]
      },
      originalAnalogy: {
        title: "The Estate Gate Guard & The 3 Helpers",
        summary: "Imagine a vast estate with 1,000 security gates. Each gate has a visitor book. If a supervisor wants to know if a suspicious motorbike entered last night, one guard cannot run to 1,000 gates. So the estate hires three specialized helpers.",
        characters: [
          {
            name: "🏃 The Runner (Forwarder)",
            role: "Stands at each of the 1,000 gates. Every time a visitor signs the book, he quickly photocopies the line and sprints it to central HQ. He is lightweight, never sleeps, and does not store books."
          },
          {
            name: "📦 The Archive Clerk (Indexer)",
            role: "Sits in the central archive warehouse. As runners deliver thousands of slips, he stamps the exact time on each and files them into labeled wooden boxes (Indexes) so they can be retrieved in milliseconds."
          },
          {
            name: "🗣️ The Front Desk Guard (Search Head)",
            role: "Sits at the front desk with the customer window. When the boss asks, 'Did motorbike KMD 123X enter after 10 PM?', this guard looks up the right archive boxes, gathers the pages, and hands over a neat answer."
          }
        ]
      },
      kenyanAnalogy: {
        title: "The Busy Matatu Sacco Headquarters (Super Metro / 2NK)",
        summary: "Think of a major Kenyan Matatu Sacco with 500 vans operating across the country every day.",
        characters: [
          {
            name: "🚌 The Makanga / Conductor (Forwarder)",
            role: "On each matatu, the conductor notes every passenger pickup and fare on his paper receipt manifest. When he arrives at the stage terminus, he transmits that passenger log straight to the Sacco head office."
          },
          {
            name: "📁 The Stage Records Clerk (Indexer)",
            role: "Inside the main stage office, the clerk receives hundreds of manifests every hour. He stamps the date, verifies the route, and locks them into labeled metal filing cabinets ('Thika Route Cabinet', 'Nakuru Route Cabinet')."
          },
          {
            name: "🎙️ The Sacco Dispatch Manager (Search Head)",
            role: "Sits behind the glass counter with a computer and desk microphone. If a passenger lost a laptop at 2 PM, the manager searches the filed manifests, pinpoints the exact driver and matatu, and announces the answer."
          }
        ]
      },
      pocketTakeaway: "Forwarder brings the data in, Indexer files it away in boxes, and Search Head answers whatever you ask!"
    },
    {
      id: "functions",
      title: "2. Basic Splunk Functions (The 4-Beat Song)",
      badge: "Core Workflow",
      colorTheme: "emerald",
      layman: {
        title: "What Splunk Actually Does: The 4-Beat Rhythm",
        intro: "Everything Splunk does—from security investigations to website monitoring—follows one simple 4-step sequence.",
        explanation: "No matter how big or complicated the network is, Splunk only executes these 4 beats in order: Collect the data, Keep it organized, Ask questions, and See the answers clearly.",
        bullets: [
          {
            term: "1. Collect (Data Ingestion)",
            simple: "Grabbing machine data from files, network streams, cloud providers, and operating systems in real time."
          },
          {
            term: "2. Keep (Data Indexing)",
            simple: "Splitting raw streams into discrete events, extracting timestamps, and writing them to compressed disk buckets for rapid searching."
          },
          {
            term: "3. Ask (Search & Processing)",
            simple: "Using Splunk's Search Processing Language (SPL) to filter through millions of events, isolate anomalies, and calculate sums or averages."
          },
          {
            term: "4. See (Reporting & Visualization)",
            simple: "Transforming raw search tallies into bar charts, line graphs, alerts, and live operational dashboards."
          }
        ]
      },
      originalAnalogy: {
        title: "The 4-Beat Security Guard Song",
        summary: "Inside the guard house, the entire operation moves to a simple four-step beat: Collect, Keep, Ask, See.",
        characters: [
          {
            name: "1. 📥 Collect",
            role: "The runners gather every signed slip from all estate gates."
          },
          {
            name: "2. 🗄️ Keep",
            role: "The archive clerk files the slips into labeled boxes stamped with the date."
          },
          {
            name: "3. 🔍 Ask",
            role: "The chief investigator walks in and asks: 'Show me all red motorbikes from yesterday.'"
          },
          {
            name: "4. 📊 See",
            role: "The guard pins a colorful chart on the wall showing motorbike entry peaks by hour."
          }
        ]
      },
      kenyanAnalogy: {
        title: "Supermarket Checkout & Store Auditing (Naivas / Quickmart)",
        summary: "Watch how a modern Kenyan supermarket manages thousands of daily shopping baskets without losing track of a single packet of milk.",
        characters: [
          {
            name: "1. 🛒 Collect (The Barcode Beep)",
            role: "Cashiers at 20 tills scan every item with laser scanners as customers pay."
          },
          {
            name: "2. 💾 Keep (The Central Database)",
            role: "The supermarket server records every sold item, price, and timestamp into daily accounting ledgers."
          },
          {
            name: "3. 🔎 Ask (Manager's Inventory Query)",
            role: "The branch manager checks: 'How many packets of unga were sold between 5 PM and 8 PM?'"
          },
          {
            name: "4. 📈 See (Sales Wall Dashboard)",
            role: "The head office TV screen shows live revenue charts and low-stock alerts in bright green and yellow bars."
          }
        ]
      },
      pocketTakeaway: "Collect the logs, Keep them in boxes, Ask your question, See it on the wall!"
    }
  ],

  // Interactive Match Challenge for Module 1
  quizChallenges: [
    {
      id: "q1",
      scenario: "A web server in Mombasa is producing 500 error logs per second. Which Splunk helper should be installed on that server to send those logs to your head office without slowing down the website?",
      options: [
        { id: "a", text: "The Search Head (Front Desk)", isCorrect: false, feedback: "Not quite. The Search Head is for typing questions and viewing dashboards, not for running on remote servers to send logs." },
        { id: "b", text: "The Forwarder (The Runner)", isCorrect: true, feedback: "Spot on! The Forwarder is the lightweight runner installed on remote machines to ship logs to headquarters quickly!" },
        { id: "c", text: "The Indexer (Archive Clerk)", isCorrect: false, feedback: "Close, but the Indexer stays at headquarters to store and index data; the Forwarder is the one that collects and transmits it." }
      ]
    },
    {
      id: "q2",
      scenario: "Your security supervisor wants to look at a pie chart showing which IP addresses failed passwords the most today. Where does she go to type that query?",
      options: [
        { id: "a", text: "The Search Head (Front Desk)", isCorrect: true, feedback: "Exactly! The Search Head provides Splunk Web and the search bar where you ask questions and view charts!" },
        { id: "b", text: "The Forwarder (The Runner)", isCorrect: false, feedback: "The Forwarder only sends raw logs—it does not have a user search interface." },
        { id: "c", text: "The Indexer's raw storage disk", isCorrect: false, feedback: "You don't manually touch indexer disks; the Search Head talks to the indexers for you!" }
      ]
    },
    {
      id: "q3",
      scenario: "What are the 4 fundamental functions of Splunk in the correct sequence?",
      options: [
        { id: "a", text: "Delete -> Rebuild -> Guess -> Report", isCorrect: false, feedback: "Splunk never deletes or guesses; it faithfully preserves original logs." },
        { id: "b", text: "Collect -> Keep -> Ask -> See", isCorrect: true, feedback: "Boom! Collect (Ingest), Keep (Index), Ask (Search), See (Visualize)!" },
        { id: "c", text: "Search -> Save -> Export -> Forget", isCorrect: false, feedback: "Remember the 4-beat song: Collect, Keep, Ask, See!" }
      ]
    }
  ]
};
