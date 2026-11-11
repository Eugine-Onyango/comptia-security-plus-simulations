// Splunk Module 3 Data: Using Search (Basic Searches, Time Ranges, Search Jobs & Modes)
// Tailored for ADHD, neurodivergent, anxiety-free learning with dual analogies:
// 1. Estate Guard House: The Search Desk, Claim Tickets & Magnifying Glasses
// 2. Kenyan Everyday Life: Sacco Stage Manifest Search & Police Roadblock Inspection

export const splunkModule3Data = {
  moduleId: 3,
  title: "Module 3 – Using Search",
  headline: "Asking the Guard, Picking the Time Window & Managing the Job",
  description: "Learn how to formulate simple searches, why the time picker is your best friend, and how search jobs and modes work behind the scenes.",
  subtopics: [
    {
      id: "search_and_time",
      title: "1. Basic Searches, Events & Time Ranges",
      badge: "Search Fundamentals",
      colorTheme: "amber",
      layman: {
        title: "How to Ask a Search Question & Why Time Comes First",
        intro: "In Splunk, you don't need complex code to find what happened. You simply type words into the search bar, like typing into Google.",
        explanation: "Every single record that Splunk finds is called an 'Event' (one line = one happening). Because modern networks generate billions of events, the most critical rule in all of Splunk is: ALWAYS set your time range first!",
        bullets: [
          {
            term: "One Event",
            simple: "The single atom of Splunk. A single log entry with a timestamp, host computer name, source file, and the raw text message."
          },
          {
            term: "Basic Search Terms",
            simple: "Typing plain keywords like 'error', '404', or 'failed password'. Splunk scans the indexed data and brings back only lines containing those words."
          },
          {
            term: "The Time Picker (Golden Rule)",
            simple: "The dropdown next to the search bar. Searching 'Last 15 minutes' takes 1 second; searching 'All Time' can take 20 minutes and freeze the team's servers!"
          }
        ]
      },
      originalAnalogy: {
        title: "Walking to the Desk & Giving the Time Window",
        summary: "You walk up to the estate front desk guard to investigate a missing bicycle.",
        characters: [
          {
            name: "📄 One Event = One Line in the Book",
            role: "Example: '11:42 PM - Black bicycle - Rider: Otieno - Gate 4'. That single line is one event."
          },
          {
            name: "🔍 Search Query = Your Question",
            role: "You ask the guard: 'Find every entry mentioning Otieno'. He goes to the archive to pull those pages."
          },
          {
            name: "⏰ The Time Range = Which Shelf to Open",
            role: "If you tell him 'Check last night between 10 PM and midnight', he opens just one folder and answers in 5 seconds. If you don't give a time, he has to blow dust off 10 years of archives!"
          }
        ]
      },
      kenyanAnalogy: {
        title: "Checking the Sacco Stage Manifest at the Bus Terminus",
        summary: "Imagine a passenger left a carton of avocados in a matatu traveling from Murang'a to Nairobi.",
        characters: [
          {
            name: "📋 One Event = One Passenger Ticket Line",
            role: "The conductor's paper manifest line: '07:15 AM - Seat 8 - Murang'a to Koja - KDA 456Y'. That is one event."
          },
          {
            name: "🔎 Search Query = The Lost Parcel Description",
            role: "Asking the stage clerk: 'Show me any matatu carrying cargo marked Murang'a'."
          },
          {
            name: "⏱️ Time Range = The Departure Window",
            role: "You tell the clerk: 'Look at today between 7:00 AM and 8:30 AM'. He only opens the morning binder and finds the van immediately."
          }
        ]
      },
      pocketTakeaway: "One line is one event. Always pick your time range first so your answer returns in seconds!"
    },
    {
      id: "jobs_and_modes",
      title: "2. Search Jobs & Search Modes (Fast, Smart, Verbose)",
      badge: "Jobs & Engine Speed",
      colorTheme: "emerald",
      layman: {
        title: "What is a Search Job and How Do Search Modes Work?",
        intro: "When you press Enter on a search, Splunk doesn't just display text; it launches a background process called a 'Search Job'.",
        explanation: "Every search job gets a unique Job ID (claim ticket). You can pause it, stop it, export it to PDF/CSV, or share the link with a teammate. Splunk also lets you choose how hard the engine works using three Search Modes.",
        bullets: [
          {
            term: "Search Job & Controls",
            simple: "Your search errand. You can Pause (freeze mid-way), Stop (finalize early), Share (give a snapshot link to colleagues), or Export (save as CSV/PDF)."
          },
          {
            term: "🐇 Fast Mode",
            simple: "Prioritizes speed! Returns only the raw event text and required fields. Skips background field calculations."
          },
          {
            term: "🦊 Smart Mode (Default)",
            simple: "The balanced sweet spot. Automatically detects what your query needs. Fast when doing calculations, detailed when reading events."
          },
          {
            term: "🐢 Verbose Mode",
            simple: "Prioritizes total completeness over speed. Discovers and extracts every possible field on every single event."
          }
        ]
      },
      originalAnalogy: {
        title: "The Errand Ticket & How Hard the Guard Reads",
        summary: "When you send the guard into the archive room, he hands you a brass claim ticket for your errand.",
        characters: [
          {
            name: "🎫 Search Job Ticket",
            role: "Ticket #402. While he searches, you can tell him 'Hold on' (Pause) or 'Take what you found so far' (Stop). You can hand the ticket to a colleague so they see the exact same pile without re-searching."
          },
          {
            name: "🐇 Fast Mode = The Quick Flashlight Glance",
            role: "The guard runs through the boxes flashing his light only looking for the word 'Otieno'. Super fast, but doesn't take notes on phone numbers or car colors."
          },
          {
            name: "🦊 Smart Mode = The Experienced Detective (Default)",
            role: "He glances when you just want a count, but reads carefully when you want details. The smart balanced way."
          },
          {
            name: "🐢 Verbose Mode = The Forensic Magnifying Glass",
            role: "The guard reads every single letter, checks ink color, and records every possible detail on every page. Slowest, but nothing is missed."
          }
        ]
      },
      kenyanAnalogy: {
        title: "The Sacco Claim Receipt & Inspection Checkpoints",
        summary: "See how Sacco clerks handle parcel searches and how highway traffic officers inspect matatus.",
        characters: [
          {
            name: "🧾 Job Ticket = Sacco Parcel Claim Slip",
            role: "The clerk gives you receipt #89. You can send your brother with that receipt to view the parcel list, or ask for a printed stamp copy (Export)."
          },
          {
            name: "🐇 Fast Mode = Quick Passenger Headcount",
            role: "Conductor taps each head quickly: '1, 2, 3... 14 passengers, full!'. Speed first."
          },
          {
            name: "🦊 Smart Mode = Normal Stage Departure Check (Default)",
            role: "Checks tickets for passengers going to specific drop-offs without inspecting luggage."
          },
          {
            name: "🐢 Verbose Mode = Full NTSA Police Roadblock Inspection",
            role: "Officers check national IDs, inspection stickers, tire treads, fire extinguishers, and speed governors. Takes longer, but completely thorough."
          }
        ]
      },
      pocketTakeaway: "Every search is a job you can pause, share, or export. Fast mode is quick glance, Verbose is forensic inspection, Smart is just right!"
    }
  ],

  // Interactive Quiz for Module 3
  quizChallenges: [
    {
      id: "m3_q1",
      scenario: "You are investigating a web server crash that happened 10 minutes ago. What is the very first and most important thing you should do before hitting Enter on your search?",
      options: [
        { id: "a", text: "Select 'All Time' in the time range picker to see every event in company history", isCorrect: false, feedback: "Careful! 'All Time' will search years of data and slow down the whole system unnecessarily." },
        { id: "b", text: "Set the Time Range picker to 'Last 15 minutes' or 'Last 1 hour'", isCorrect: true, feedback: "Spot on! The Golden Rule of Splunk: always narrow your time range first so the search finishes in seconds!" },
        { id: "c", text: "Unplug the server power cable", isCorrect: false, feedback: "Never unplug the server! Just select the right time window in Splunk." }
      ]
    },
    {
      id: "m3_q2",
      scenario: "You ran a heavy search that took 3 minutes to calculate monthly network statistics. You want your teammate Kevin to see the exact same results without making Splunk re-run the whole search. What should you do?",
      options: [
        { id: "a", text: "Click 'Share Job' and send Kevin the link or Job ID", isCorrect: true, feedback: "Exactly! Sharing the search job allows teammates to view your cached results instantly for up to 7 days without re-executing the query!" },
        { id: "b", text: "Ask Kevin to re-type the search and wait another 3 minutes", isCorrect: false, feedback: "That wastes computing power and time. Splunk lets you share the completed search job directly!" },
        { id: "c", text: "Take a blurry photo of your computer monitor with your phone", isCorrect: false, feedback: "Splunk's built-in Share Job or Export (PDF/CSV) feature is much cleaner and professional!" }
      ]
    },
    {
      id: "m3_q3",
      scenario: "Which search mode gives the fastest possible performance by only returning raw events and skipping non-essential field extractions?",
      options: [
        { id: "a", text: "Verbose Mode", isCorrect: false, feedback: "Verbose is the slowest mode because it extracts every conceivable field on every event." },
        { id: "b", text: "Fast Mode", isCorrect: true, feedback: "Correct! Fast Mode prioritizes raw speed by grabbing the events without spending CPU cycles on extra field discovery." },
        { id: "c", text: "Turtle Mode", isCorrect: false, feedback: "That's not a real mode name (though Verbose behaves a bit like a turtle!). The fast mode is simply called Fast Mode." }
      ]
    }
  ]
};
