// Splunk Module 5 Data: Search Processing Language (Wildcards, Booleans, Case Sensitivity, Quotes)
// Tailored for ADHD, neurodivergent, anxiety-free learning with dual analogies:
// 1. Estate Guard House: Fill-in-the-blank stars, Bold Stamp Rules, and Hotel Breakfast orders
// 2. Kenyan Everyday Life: Kenyan Names, Kenyan Breakfast (Chai & Mandazi), and M-Pesa Keywords

export const splunkModule5Data = {
  moduleId: 5,
  title: "Module 5 – Search Processing Language (SPL)",
  headline: "Wildcards, The Case Secret & The Big Three Words (AND, OR, NOT)",
  description: "Learn how the guard understands fill-in-the-blank stars, when UPPERCASE is mandatory, and how to combine search criteria without confusion.",
  subtopics: [
    {
      id: "wildcards_and_quotes",
      title: "1. Wildcards (*), Quotes (\" \") & Special Characters",
      badge: "Pattern Matching",
      colorTheme: "amber",
      layman: {
        title: "Wildcards and Exact Quotes in Plain English",
        intro: "Computers use lots of variations of the same word ('fail', 'failed', 'failure', 'failing'). Instead of searching four times, Splunk gives you a magic symbol: the asterisk wildcard (*).",
        explanation: "The asterisk * means 'fill in the blank with any letters'. Searching for 'fail*' matches every word starting with fail. When you want an exact phrase with spaces, wrap it in double quotes (like \"database server\") so Splunk doesn't search for the two words separately.",
        bullets: [
          {
            term: "Wildcard (*)",
            simple: "Matches zero or more characters. 'fail*' finds fail, failed, failing, failure. 'status=40*' finds 400, 401, 403, 404."
          },
          {
            term: "Double Quotes (\" \")",
            simple: "Locks words together as an exact phrase. \"access denied\" finds that exact phrase, not random events with 'access' on line 1 and 'denied' on line 10."
          },
          {
            term: "Escaping Special Characters (\\)",
            simple: "If a filename has punctuation or strange symbols (like C:\\Users), a backslash \\ tells Splunk: 'Treat this next symbol as plain text, not a code instruction!'"
          }
        ]
      },
      originalAnalogy: {
        title: "Fill-in-the-Blanks & Exact Names in the Visitor Book",
        summary: "Watch how you ask the front desk guard when you only know part of a name or need an exact phrase.",
        characters: [
          {
            name: "⭐ Wildcard (*) = 'Anyone starting with Kam...'",
            role: "You ask the guard: 'Find anyone named Kam*'. He brings back pages for Kamau, Kamanda, and Kambua. The star fills in the rest of the letters!"
          },
          {
            name: "💬 Quotes (\" \") = Full Exact Name",
            role: "Asking for \"John Kamau\" brings only people with that exact two-word name. Without quotes, he would bring every person named John PLUS every person named Kamau."
          },
          {
            name: "🛡️ Backslash (\\) = The Safe Stamp",
            role: "If a visitor wrote a slash 'C/O Head Office', you tell the guard: 'The slash is part of his company note, don't get confused.'"
          }
        ]
      },
      kenyanAnalogy: {
        title: "Looking for Matatu Routes & Exact Stage Names",
        summary: "Think of finding destinations at a crowded bus stage or ordering at a counter.",
        characters: [
          {
            name: "⭐ Wildcard (*) = Finding Any Route in Murang'a",
            role: "Asking for 'Murang*' matches Murang'a Town, Murang'a Shuttle, and Muranga Road all in one shot."
          },
          {
            name: "💬 Quotes (\" \") = Exact Bus Stop",
            role: "Saying \"Kencom House\" finds that specific central bus stop. Without quotes, you'd get any story mentioning 'Kencom' and any story mentioning a 'house'."
          },
          {
            name: "🏷️ Escape (\\) = Special Plate Characters",
            role: "Handling registration plates like 'KBZ 100A/X' where the slash is part of the license plate."
          }
        ]
      },
      pocketTakeaway: "Use * to fill in the blank ('fail*'). Put quotes around exact phrases (\"access denied\"). Use backslash \\ to escape weird symbols!"
    },
    {
      id: "case_and_booleans",
      title: "2. Case Sensitivity & Booleans (AND, OR, NOT)",
      badge: "Logic & Case Rules",
      colorTheme: "emerald",
      layman: {
        title: "The Golden Rule of Case & The Big Three Words",
        intro: "In Splunk, uppercase and lowercase matter in very specific places. Once you know the one golden rule, you will never get confused.",
        explanation: "THE GOLDEN RULE: The words you search and values are RELAXED (case-insensitive), but Field Names and Booleans are STRICT! Searching 'kamau' finds 'KAMAU'. But the field 'host' is not 'Host', and booleans (AND, OR, NOT) MUST be capitalized!",
        bullets: [
          {
            term: "Search Terms = Relaxed",
            simple: "Searching 'error', 'Error', or 'ERROR' returns the exact same results. Values like status=\"failed\" are also case-insensitive."
          },
          {
            term: "Field Names = Strict",
            simple: "Field names are case-sensitive. 'status=500' is NOT the same as 'Status=500' or 'STATUS=500'. Always check the exact field casing."
          },
          {
            term: "Booleans MUST be UPPERCASE (AND, OR, NOT)",
            simple: "You MUST write 'AND', 'OR', 'NOT' in capital letters. If you type lowercase 'and', Splunk searches for the literal English word 'and'!"
          },
          {
            term: "Evaluation Order (NOT > OR > AND)",
            simple: "Splunk evaluates NOT first, then OR, then AND. You can use parentheses ( ) to group your conditions cleanly."
          }
        ]
      },
      originalAnalogy: {
        title: "The Stamp Book Rules & The Guard's Logic",
        summary: "Inside the guard house, handwriting case is relaxed, but official command stamps are strictly inspected.",
        characters: [
          {
            name: "🔤 Relaxed Names vs Bold Headers",
            role: "Whether a visitor writes 'Mary' or 'MARY', the guard recognizes her. But the printed column header 'Gate' must match the official register."
          },
          {
            name: "🔗 The Big Three Stamps (AND, OR, NOT)",
            role: "The guard has 3 giant brass stamps: AND (both must match), OR (either one matches), NOT (throw it out of the pile)."
          },
          {
            name: "⚠️ Why Caps Matter",
            role: "If you shout 'AND', the guard knows it is a logical command. If you whisper lowercase 'and', he thinks you're looking for someone whose nickname is 'and'!"
          }
        ]
      },
      kenyanAnalogy: {
        title: "Ordering at a Kenyan Hotel & M-Pesa Keywords",
        summary: "Think of ordering breakfast at a local restaurant or sending official M-Pesa SMS keywords.",
        characters: [
          {
            name: "☕ Chai AND Mandazi",
            role: "AND means BOTH: 'Niletee Chai AND Mandazi' (You want both items on your table). In Splunk, space already implies AND!"
          },
          {
            name: "🍵 Chai OR Kahawa",
            role: "OR means EITHER: 'Nipe Chai OR Kahawa' (Whichever is hot and ready, bring it to me)."
          },
          {
            name: "🚫 Chai NOT Sugar",
            role: "NOT means EXCLUDE: 'Chai NOT Sukari' (Bring the tea, but leave the sugar completely out)."
          },
          {
            name: "📱 M-Pesa Capital Letters Rule",
            role: "Just like Safaricom's official SMS commands: you send 'BAL' or 'PAYBILL' in capital letters for the system to execute the command."
          }
        ]
      },
      pocketTakeaway: "Search terms are relaxed; Field names are strict. Booleans (AND, OR, NOT) MUST be capitalized, or Splunk treats them as plain words!"
    }
  ],

  // Interactive Quiz for Module 5
  quizChallenges: [
    {
      id: "m5_q1",
      scenario: "You want to find all events where a login was either 'failed' or 'denied'. How should you write the boolean operator in your search?",
      options: [
        { id: "a", text: "failed or denied (lowercase)", isCorrect: false, feedback: "If you type lowercase 'or', Splunk will literally search for the word 'or' in the text instead of acting as a logical operator!" },
        { id: "b", text: "failed OR denied (UPPERCASE)", isCorrect: true, feedback: "Spot on! Booleans in Splunk (AND, OR, NOT) MUST ALWAYS be in capital letters!" },
        { id: "c", text: "failed // denied (slashes)", isCorrect: false, feedback: "Slashes do not represent logical OR in Splunk; use capital 'OR'." }
      ]
    },
    {
      id: "m5_q2",
      scenario: "You want to find events with words like 'network', 'networking', 'networks', and 'networked'. What is the fastest search keyword?",
      options: [
        { id: "a", text: "network*", isCorrect: true, feedback: "Exactly! The asterisk * wildcard fills in any remaining letters, matching network, networks, networking, and networked in one search!" },
        { id: "b", text: "network?", isCorrect: false, feedback: "Splunk uses the asterisk * as its multi-character wildcard, not the question mark." },
        { id: "c", text: "Type all four words separated by 50 commas", isCorrect: false, feedback: "Using the wildcard 'network*' is vastly simpler and faster!" }
      ]
    },
    {
      id: "m5_q3",
      scenario: "A junior analyst types 'Status=404' into Splunk and gets 0 results, even though thousands of web 404 errors occurred. What went wrong?",
      options: [
        { id: "a", text: "Splunk is out of paper", isCorrect: false, feedback: "Splunk doesn't use paper!" },
        { id: "b", text: "Field names are case-sensitive; the field in the database is 'status', not 'Status'", isCorrect: true, feedback: "Bingo! While search values are relaxed, field names are strictly case-sensitive. 'status' is completely different from 'Status'!" },
        { id: "c", text: "You can only search for 404 errors on Sundays", isCorrect: false, feedback: "Searches work anytime; it was the capital 'S' in 'Status' that caused the mismatch!" }
      ]
    }
  ]
};
