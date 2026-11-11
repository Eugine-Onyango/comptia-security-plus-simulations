// Splunk Module 4 Data: Exploring Events (Refining Searches, Timestamps, and the Events Tab)
// Tailored for ADHD, neurodivergent, anxiety-free learning with dual analogies:
// 1. Estate Guard House: Timestamps, Sifting the Pile, and Pointing at the Page
// 2. Kenyan Everyday Life: M-Pesa SMS Timestamps & Pointing at the Market Counter

export const splunkModule4Data = {
  moduleId: 4,
  title: "Module 4 – Exploring Events",
  headline: "Reading the Pages, Timestamps & The Pointing Trick",
  description: "Learn how Splunk organizes timestamps, how to narrow down large piles of logs, and the magic of clicking fields instead of retyping.",
  subtopics: [
    {
      id: "timestamps_and_refining",
      title: "1. Timestamps & Refining Searches",
      badge: "Time & Filtering",
      colorTheme: "amber",
      layman: {
        title: "The Heartbeat of Logs: Timestamps & Refining",
        intro: "Every event that enters Splunk has one golden piece of information that never lies: the exact moment it happened.",
        explanation: "Splunk extracts the date and time from the log text and saves it into a special default field called '_time'. Because an initial search might return 50,000 events, you 'refine' your search by adding more descriptive keywords to filter the pile down to the few events that actually matter.",
        bullets: [
          {
            term: "The Timestamp (_time)",
            simple: "The official time anchor of the event. Splunk normalizes different time formats so all events are sorted chronologically with the newest events first."
          },
          {
            term: "Refining a Search",
            simple: "Adding specific terms (like 'error' -> 'error status=500' -> 'error status=500 user=john') to drill down from thousands of lines to the exact culprit."
          },
          {
            term: "Chronological Order",
            simple: "By default, Splunk lists events in reverse chronological order: the newest event is at the top, and older events follow below."
          }
        ]
      },
      originalAnalogy: {
        title: "The Stamped Blue Clock & Narrowing the Guard Pile",
        summary: "In the estate guard house, every visitor entry is governed by the official clock above the desk.",
        characters: [
          {
            name: "🕰️ The Timestamp = The Blue Desk Clock Stamp",
            role: "No matter how messy a visitor's signature is, the guard stamps the blue ink time: '12:03:14 AM'. The clerk shelves every page strictly by this stamp."
          },
          {
            name: "🔍 Refining = Narrowing the Question",
            role: "Asking for 'visitors' brings 500 pages. Asking for 'motorbikes' brings 40 pages. Asking for 'motorbikes at Gate B after midnight' brings 2 pages. Small pile = instant answer!"
          },
          {
            name: "📑 Reverse Chronological = Top of the In-Tray",
            role: "The most recent visitor slip sits right on top of the desk tray, so you always see what happened two minutes ago first."
          }
        ]
      },
      kenyanAnalogy: {
        title: "The M-Pesa SMS Confirmation & The Matatu Queue",
        summary: "Think of an M-Pesa transaction confirmation and finding a friend at a crowded Nairobi stage.",
        characters: [
          {
            name: "📲 Timestamp = M-Pesa Transaction Time",
            role: "'Confirmed. On 11/11/26 at 4:20 PM...'. Even if your phone clock is wrong, Safaricom's timestamp is the undisputed official truth of when money moved."
          },
          {
            name: "🎯 Refining = Finding Your Matatu",
            role: "Searching in Koja stage: 'All Matatus' (too crowded!) -> 'Super Metro' (one lane) -> 'Super Metro to Juja' (one queue) -> 'Super Metro with green rims' (exact van found!)."
          },
          {
            name: "💬 Reverse Chronological = Recent Messages",
            role: "Just like WhatsApp or SMS: the latest message is always at the top of your screen."
          }
        ]
      },
      pocketTakeaway: "Timestamps are the golden anchor of every event. Refine your search to turn a giant mountain of logs into a small cup of answers!"
    },
    {
      id: "events_tab_and_fields",
      title: "2. The Events Tab & The Pointing Trick",
      badge: "Events Tab & Fast Filtering",
      colorTheme: "emerald",
      layman: {
        title: "The Events Tab: Never Retype a Keyword Again!",
        intro: "Typing long IP addresses or error codes manually is frustrating and leads to typos. Splunk has a brilliant built-in shortcut called the Events Tab trick.",
        explanation: "When search results appear, each event is broken down into clickable fields (like 'host', 'source', 'user', 'status'). Instead of retyping, you simply click on any value with your mouse to instantly add or remove it from your search!",
        bullets: [
          {
            term: "👉 Add to Search ('More like this')",
            simple: "Click a value (like user='alice') and select 'Add to search'. Splunk instantly updates your search bar to only show alice's events."
          },
          {
            term: "🚫 Exclude from Search ('Not this')",
            simple: "Click a noisy value (like status='200' OK) and select 'Exclude from search'. Splunk automatically adds NOT status=200 to remove the clutter."
          },
          {
            term: "Fields Sidebar",
            simple: "The left panel showing 'Selected Fields' (always shown: host, source, sourcetype) and 'Interesting Fields' (fields appearing in at least 20% of events)."
          }
        ]
      },
      originalAnalogy: {
        title: "Pointing at the Visitor Book with Your Finger",
        summary: "You stand at the counter looking at a page in the guard's visitor book. You don't need to write a new request letter.",
        characters: [
          {
            name: "👉 'More Like This' = Pointing at a Company Name",
            role: "You tap the page with your finger: 'See this delivery company? Bring me all other visitors from this same company.' The guard fetches only them."
          },
          {
            name: "🚫 'Not This' = Shaking Your Head at a Row",
            role: "You point at a line: 'Ignore this regular mail van; filter out any entries from this vehicle.' The noise disappears instantly."
          },
          {
            name: "📑 Fields Sidebar = The Column Index Tabs",
            role: "The colored sticky tabs on the side of the ledger showing the most common columns: Gate, Driver, Plate, Reason."
          }
        ]
      },
      kenyanAnalogy: {
        title: "Pointing at the Butchery / Mama Mboga Counter",
        summary: "Watch how shopping happens at a busy Kenyan local market or butchery.",
        characters: [
          {
            name: "👉 'Add to Search' = 'Nipe Hii'",
            role: "At the butchery counter, you point directly at a fresh piece of meat: 'Nipe kipande kama hii' (Give me more like this cut). No long explanation needed; you just point!"
          },
          {
            name: "🚫 'Exclude from Search' = 'Hapana Hii'",
            role: "You point at an unwanted bone: 'Hapana hiyo, ondoa hiyo' (Leave that part out). Splunk removes the noise just as easily."
          },
          {
            name: "🏷️ Fields Sidebar = The Price & Produce Tags",
            role: "The chalkboards showing Sukuma, Spinach, Tomatoes, and Onions with their quantities at a single glance."
          }
        ]
      },
      pocketTakeaway: "Don't type what you can point at! Click 'Add to search' for more like this, or 'Exclude from search' to banish the noise!"
    }
  ],

  // Interactive Quiz for Module 4
  quizChallenges: [
    {
      id: "m4_q1",
      scenario: "You run a search for 'failed login' and see 1,000 events. In the results, you spot an attacker IP address '198.51.100.42'. What is the fastest and easiest way to see ONLY events from this attacker?",
      options: [
        { id: "a", text: "Memorize the IP address, erase your search, and retype it manually into Notepad", isCorrect: false, feedback: "Manual typing wastes time and invites typos!" },
        { id: "b", text: "Click on '198.51.100.42' directly in the event and select 'Add to search'", isCorrect: true, feedback: "Spot on! The Events Tab trick lets you click any field value and add it directly to your query without typing!" },
        { id: "c", text: "Print all 1,000 pages on paper and highlight the IP address with a yellow marker", isCorrect: false, feedback: "No paper needed; Splunk does it with one mouse click!" }
      ]
    },
    {
      id: "m4_q2",
      scenario: "Your search results are cluttered with thousands of routine 'status=200 OK' web events that you don't care about. How do you quickly get rid of them?",
      options: [
        { id: "a", text: "Click on 'status=200' in an event and choose 'Exclude from search'", isCorrect: true, feedback: "Exactly! Splunk will automatically add NOT status=200 to your query, wiping away all the routine clutter instantly!" },
        { id: "b", text: "Shut down your computer and restart it", isCorrect: false, feedback: "Restarting won't change your search; clicking 'Exclude from search' takes 1 second!" },
        { id: "c", text: "Close your eyes so you don't see the lines", isCorrect: false, feedback: "Splunk's 'Exclude from search' handles the filtering for you!" }
      ]
    },
    {
      id: "m4_q3",
      scenario: "In what default order does Splunk display events in the Events Tab?",
      options: [
        { id: "a", text: "Alphabetical order by the computer's name", isCorrect: false, feedback: "Events are ordered by time, not by alphabet." },
        { id: "b", text: "Reverse chronological order (newest events at the very top, oldest at the bottom)", isCorrect: true, feedback: "Bingo! Just like an email inbox or WhatsApp chat, the newest events are right at the top where you can see them first!" },
        { id: "c", text: "Completely random order every time you refresh", isCorrect: false, feedback: "Splunk is strictly organized by timestamps (_time) in reverse chronological order." }
      ]
    }
  ]
};
