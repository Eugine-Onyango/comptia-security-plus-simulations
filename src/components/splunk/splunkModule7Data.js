// Splunk Module 7 Data: What are Knowledge Objects? (The 5 Categories of Cheat Sheets)
// Tailored for ADHD, neurodivergent, anxiety-free learning with dual analogies:
// 1. Estate Guard House: The Guard's Notebook, Colored Stickers, Address Book & Master Template
// 2. Kenyan Everyday Life: Truecaller, Mama Mboga Chalkboard, Sacco Vehicle Registry & KRA Forms

export const splunkModule7Data = {
  moduleId: 7,
  title: "Module 7 – What are Knowledge Objects?",
  headline: "The Guard's Cheat Sheets & The 5 Magic Categories",
  description: "Discover how Splunk layers notes, stickers, lookups, and blueprints on top of raw logs without ever modifying or endangering the original evidence.",
  subtopics: [
    {
      id: "five_categories",
      title: "1. The Five Categories of Knowledge Objects",
      badge: "The 5 Categories",
      colorTheme: "amber",
      layman: {
        title: "What are Knowledge Objects in Plain English?",
        intro: "In forensic investigation and IT monitoring, there is one sacred golden rule: NEVER ALTER THE ORIGINAL LOGS. The raw evidence must remain 100% untouched.",
        explanation: "So how does Splunk make messy text easy to read? It uses 'Knowledge Objects'—smart sticky notes, color-coded stickers, and external address books layered on top of the data at search time. Splunk organizes them into 5 distinct categories.",
        bullets: [
          {
            term: "1. Data Interpretation (Field Extractions)",
            simple: "Teaching Splunk how to read unstructured messy text into neat columns (e.g. teaching it that the word after 'src=' is always the IP address)."
          },
          {
            term: "2. Data Classification (Eventtypes & Tags)",
            simple: "Putting colored stickers on events or values. An Eventtype groups common searches (like all 404/500 errors into 'web_error'). A Tag gives a field value a friendly label (tagging 10.0.0.1 as 'database_nairobi')."
          },
          {
            term: "3. Data Enrichment (Lookups)",
            simple: "Gluing extra outside information onto search results. Matches an ID in your log (like emp_id=402) against a spreadsheet to add 'Mary Wambui, Finance Dept'."
          },
          {
            term: "4. Data Normalization (Field Aliases)",
            simple: "Standardizing different names for the same thing. If Cisco calls it 'src_ip' and Palo Alto calls it 'source', an alias maps both to 'src'."
          },
          {
            term: "5. Data Models (The Blueprint)",
            simple: "A structured, hierarchical form that organizes related data. Powers the drag-and-drop Pivot tool so non-technical users can build charts without code."
          }
        ]
      },
      originalAnalogy: {
        title: "The Guard's Notebook & Sticky Notes (Originals Untouched)",
        summary: "The visitor book pages are signed in permanent ink and locked in glass cases. The guard NEVER writes on the original pages. He only adds notes on top.",
        characters: [
          {
            name: "📖 1. Interpretation = Reading Messy Handwriting",
            role: "Gate C's guard scribbles terribly. The head guard writes a note in his desk drawer: 'The 3rd word on Gate C slips is always the plate number' so he reads it into a clean column."
          },
          {
            name: "🔴 2. Classification = Colored Stickers",
            role: "The guard sticks a round red sticker on every night entry. Now, you just say 'Show me red sticker visitors' instead of describing a long complicated rule."
          },
          {
            name: "📒 3. Enrichment = The Address Book (Lookup)",
            role: "A visitor writes plate KMD 123X. The guard flips open his estate directory and glues a note: 'Owner: Mary, Chief Accountant'."
          },
          {
            name: "🤝 4. Normalization = One Common Language (Aliases)",
            role: "Gate A writes 'plate', Gate B writes 'reg no', Gate C writes 'car number'. The guard agrees: 'From now on, all three are called plate'."
          },
          {
            name: "📋 5. Data Models = The Standard Estate Form",
            role: "A standardized official visitor template: Time, Name, ID, Vehicle, Purpose. Once all gates use the template, one report works for the whole country!"
          }
        ]
      },
      kenyanAnalogy: {
        title: "The Sacco Operations Office & Truecaller Registry",
        summary: "Watch how a busy Kenyan organization enriches raw receipts with external information.",
        characters: [
          {
            name: "📝 1. Interpretation = Deciphering Conductor Slips",
            role: "Conductors use quick shorthand. The clerk teaches the computer: 'The number after Ksh is the fare collected'."
          },
          {
            name: "🏷️ 2. Classification = Route Color Stickers",
            role: "Blue stickers for 'Route 237 Thika Road', Yellow stickers for 'Airport Shuttle'. Instant visual grouping."
          },
          {
            name: "📞 3. Enrichment = Truecaller / Sacco Fleet Database",
            role: "You receive an unknown driver phone number '0722...'. Truecaller matches it to 'Kiprono - Driver of Van KDA 123Y'."
          },
          {
            name: "💰 4. Normalization = Standardizing 'Pesa'",
            role: "Conductors call money 'chapaa', 'mkwanja', 'fare', or 'cash'. The head accountant standardizes all of them into 'KES'."
          },
          {
            name: "📑 5. Data Models = Standard NTSA / KRA Form",
            role: "A unified, standardized digital form where vehicle inspections or tax deductions follow the exact same fields nationwide."
          }
        ]
      },
      pocketTakeaway: "Knowledge objects never alter raw logs! 1. Interpretation reads text, 2. Classification tags events, 3. Enrichment adds lookups, 4. Normalization unifies names, 5. Data Models build blueprints!"
    },
    {
      id: "permissions_and_types",
      title: "2. Types of Knowledge Objects & Sharing Permissions",
      badge: "Sharing & Permissions",
      colorTheme: "emerald",
      layman: {
        title: "Who Can See the Notes? Private vs Shared Objects",
        intro: "When you create a cheat sheet, lookup, or field extraction in Splunk, who gets to use it?",
        explanation: "Splunk gives every knowledge object a permission level. It can be kept Private in your personal pocket, Shared with your specific team/app, or made Global across the entire enterprise.",
        bullets: [
          {
            term: "Private (Default)",
            simple: "Only you can see and use this knowledge object. Great for drafting experimental queries without cluttering your teammates' screens."
          },
          {
            term: "App-Level (Shared with App)",
            simple: "Everyone working inside the same App (like Search & Reporting or Enterprise Security) can see and use the knowledge object."
          },
          {
            term: "Global (All Apps)",
            simple: "Available across every single app in the entire Splunk deployment. Perfect for enterprise-wide lookups or company-wide tags."
          },
          {
            term: "Read vs Write Permissions",
            simple: "You can let teammates only read your knowledge object (use it in searches), or give them write permission so they can update the cheat sheet too."
          }
        ]
      },
      originalAnalogy: {
        title: "The Guard's Pocket Notebook vs The Team Noticeboard",
        summary: "Inside the guard house, some notes stay in your uniform pocket, while others get pinned to the wall.",
        characters: [
          {
            name: "🔒 Private = Your Uniform Pocket Notepad",
            role: "Personal notes you jotted down during your shift. Only you can read them. No other guard sees your scratchpad."
          },
          {
            name: "📌 App-Level = Pinned on the Guard House Noticeboard",
            role: "Pinned on the bulletin board inside the main guard room. Every guard on duty in this building can read and use it."
          },
          {
            name: "🌍 Global = Broadcast to Every Security Gate in the City",
            role: "An official security memo distributed to all 1,000 gates across the entire country."
          }
        ]
      },
      kenyanAnalogy: {
        title: "Personal Phone Contacts vs Sacco Stage Noticeboard",
        summary: "Observe how information is shared among drivers and stage staff.",
        characters: [
          {
            name: "🔒 Private = Contacts Saved on Personal SIM Card",
            role: "Your personal phone contacts list. Only you can call those numbers."
          },
          {
            name: "📌 App-Level = Chalkboard at the Matatu Stage Counter",
            role: "Written in white chalk on the main stage board for all stage conductors and inspectors on that route to see."
          },
          {
            name: "🌍 Global = Official National Gazette / Sacco HQ Notice",
            role: "A circular sent to every terminus in Nairobi, Nakuru, and Mombasa for all branches to follow."
          }
        ]
      },
      pocketTakeaway: "Knowledge objects start as Private. When they are tested and proven, promote them to App-Level or Global so the whole team benefits!"
    }
  ],

  // Interactive Quiz for Module 7
  quizChallenges: [
    {
      id: "m7_q1",
      scenario: "When you create a Field Extraction or a Lookup in Splunk, what happens to the original raw log files stored on disk?",
      options: [
        { id: "a", text: "Splunk overwrites the raw log file with the new columns", isCorrect: false, feedback: "Splunk NEVER modifies raw logs! Forensic integrity is sacred." },
        { id: "b", text: "The raw logs remain 100% untouched and unchanged; knowledge objects are applied on top at search time", isCorrect: true, feedback: "Spot on! Golden rule of Splunk: original data is immutable; knowledge objects are non-destructive overlays applied at search time!" },
        { id: "c", text: "Splunk deletes the log file to save disk space", isCorrect: false, feedback: "Never! Original logs are preserved safely." }
      ]
    },
    {
      id: "m7_q2",
      scenario: "You have a log file with 'user_id=8842'. You want Splunk to automatically pull in the person's full name, department, and phone number from an Excel/CSV spreadsheet. What knowledge object category is this?",
      options: [
        { id: "a", text: "Data Enrichment (Lookups)", isCorrect: true, feedback: "Bingo! Data Enrichment using Lookups allows you to merge external reference tables into your search results!" },
        { id: "b", text: "Data Deletion", isCorrect: false, feedback: "That's not enrichment; lookups add rich contextual data." },
        { id: "c", text: "Screen Magnifier", isCorrect: false, feedback: "Lookups match IDs against external spreadsheets." }
      ]
    },
    {
      id: "m7_q3",
      scenario: "Your team uses firewalls from Cisco, Checkpoint, and Fortinet. Cisco calls the client IP 'src_ip', Checkpoint calls it 'source', and Fortinet calls it 'src'. What knowledge object should you create to unify all three under one common name 'src'?",
      options: [
        { id: "a", text: "Field Alias (Data Normalization)", isCorrect: true, feedback: "Exactly! Field Aliases normalize multiple vendor field names into one unified standard without changing original data!" },
        { id: "b", text: "Firewall uninstaller", isCorrect: false, feedback: "You don't uninstall firewalls; you just create a field alias!" },
        { id: "c", text: "Print preview", isCorrect: false, feedback: "Field Aliases are the standard Splunk tool for data normalization." }
      ]
    }
  ]
};
