// Splunk Module 6 Data: What are Commands? (The Anatomy of SPL & The Conveyor Belt Pipe |)
// Tailored for ADHD, neurodivergent, anxiety-free learning with dual analogies:
// 1. Estate Guard House: The Conveyor Belt Pipe, Tally Clerk & "Narrow First" Rule
// 2. Kenyan Everyday Life: KTDA Tea Factory Sorting Conveyor & Posho Mill Processing

export const splunkModule6Data = {
  moduleId: 6,
  title: "Module 6 – What are Commands?",
  headline: "The Conveyor Belt Pipe (|) & The Anatomy of SPL",
  description: "Learn how the pipe symbol passes data between specialized workers, how SPL sentences are built, and the #1 golden rule of fast searching.",
  subtopics: [
    {
      id: "anatomy_of_spl",
      title: "1. The Anatomy of SPL & The Pipe (|)",
      badge: "Language Anatomy",
      colorTheme: "amber",
      layman: {
        title: "How to Read an SPL Sentence Like Plain English",
        intro: "In Splunk, complex searches are just sentences chained together with the vertical pipe symbol (|). The pipe literally means: 'AND THEN...'",
        explanation: "Think of a factory assembly line. A search query has five distinct parts: the search terms that grab the raw logs, the pipe that carries them forward, the command verb telling a worker what to do, the function specifying how to do it, and clauses that control grouping.",
        bullets: [
          {
            term: "Search Terms",
            simple: "The initial order telling Indexers what pages to fetch from disk (e.g., status=500 or gate=B motorbike)."
          },
          {
            term: "The Pipe (|)",
            simple: "The conveyor belt. It takes the results from the left and passes them to the command on the right. Read it out loud as '...and then...'"
          },
          {
            term: "Command",
            simple: "The action verb telling Splunk what worker to call (e.g., 'stats' to calculate numbers, 'table' to make columns, 'sort' to order)."
          },
          {
            term: "Function & Arguments",
            simple: "The mathematical action and what field to calculate (e.g., in 'count(status)', 'count' is the function, and 'status' is the argument)."
          },
          {
            term: "Clauses",
            simple: "Modifying phrases like 'by host' (groups results per computer) or 'as total_errors' (renames the column for cleaner reading)."
          }
        ]
      },
      originalAnalogy: {
        title: "The Conveyor Belt in the Guard Room",
        summary: "Watch how a search query moves through the estate guard house: 'gate=B motorbike | stats count by plate'.",
        characters: [
          {
            name: "📄 Search Terms = 'Fetch Gate B motorbike slips'",
            role: "The runner sprints to the Gate B shelf and brings back only slips marked 'motorbike'."
          },
          {
            name: "➡️ The Pipe (|) = '...AND THEN pass to counter'",
            role: "The pile slides down the smooth brass counter to the next specialized guard."
          },
          {
            name: "🔢 Command (stats) = The Tally Clerk",
            role: "The clerk waiting at the end of the belt with a pencil and ledger."
          },
          {
            name: "✏️ Function (count) = How to Count",
            role: "He makes tick marks for each matching slip: 1, 2, 3..."
          },
          {
            name: "🏷️ Clause (by plate) = Group by License Plate",
            role: "He sorts the tick marks under each vehicle's plate number so you see which bike visited most often."
          }
        ]
      },
      kenyanAnalogy: {
        title: "The KTDA Tea Cooperative Sorting Conveyor",
        summary: "Observe how green tea leaves move through a Kenyan Tea Development Agency (KTDA) processing factory.",
        characters: [
          {
            name: "🌿 Search Terms = Unloading Kiambu Farm Truck",
            role: "The factory workers only unload the truck from Kiambu (filtering out other produce at the gate)."
          },
          {
            name: "🏭 The Pipe (|) = The Factory Rubber Conveyor Belt",
            role: "The leaves travel on a moving belt from the weighing bay into the processing machines ('...and then...')."
          },
          {
            name: "⚖️ Command & Function = Automatic Digital Scale (stats sum)",
            role: "The machine weighs the bags and sums up the total kilograms."
          },
          {
            name: "📋 Clause (by farmer_id) = Grouping by Cooperative Number",
            role: "The system prints the total kilograms earned by each farmer for their monthly payout."
          }
        ]
      },
      pocketTakeaway: "A pipe (|) means 'AND THEN...'. Search terms fetch the pile, commands do the work, functions do the math, and 'by' groups the results!"
    },
    {
      id: "best_practices",
      title: "2. Best Practices for Writing Searches",
      badge: "Performance & Speed",
      colorTheme: "emerald",
      layman: {
        title: "The #1 Golden Rule: Narrow First, Decorate Later!",
        intro: "A poorly written search can take 5 minutes and slow down the entire office. A well-written search finishes in 0.2 seconds.",
        explanation: "The Golden Rule of Splunk searching is: NARROW FIRST, DECORATE LATER! Filter out everything you don't need before the first pipe. Specify your index, sourcetype, and time window first so Indexers only read a tiny slice of disk.",
        bullets: [
          {
            term: "1. Specify Index and Sourcetype First",
            simple: "Never start with just '*'. Always write 'index=security sourcetype=cisco_firewall' so Splunk skips 99% of unrelated storage."
          },
          {
            term: "2. Filter Before the Pipe",
            simple: "Write 'status=500 | stats count' instead of '* | where status=500 | stats count'. Filtering early means way less data travels across the network."
          },
          {
            term: "3. Narrow the Time Window",
            simple: "Always use the smallest time range possible ('Last 1 hour' or 'Last 24 hours')."
          },
          {
            term: "4. Use 'fields' to Drop Unneeded Columns",
            simple: "If you only need IP address and user, remove the other 40 columns early to save memory."
          }
        ]
      },
      originalAnalogy: {
        title: "Carrying One Folder vs The Entire Archive",
        summary: "Watch what happens when you give instructions to the estate guard runner.",
        characters: [
          {
            name: "🐢 Bad Practice: 'Bring everything, I will check here'",
            role: "The poor runner carries 50 heavy boxes of all 10,000 visitors to your desk, and you spend an hour flipping pages just to find 2 red motorbikes."
          },
          {
            name: "⚡ Best Practice: 'Bring only Gate B motorbikes from last night'",
            role: "The runner leaves 49 boxes on the shelf. He carries one slim folder of 3 pages straight to your desk in 4 seconds flat!"
          }
        ]
      },
      kenyanAnalogy: {
        title: "Going to the Market for Sukuma Wiki",
        summary: "Think of shopping at a local open-air market in town.",
        characters: [
          {
            name: "🐢 Bad Practice = Buying the Whole Truck",
            role: "Buying the entire lorry of vegetables, bringing it to your kitchen, and sorting through rotten cabbages just to get one bunch of spinach."
          },
          {
            name: "⚡ Best Practice = Walking Straight to Mama Mboga",
            role: "Walking directly to Mama Mboga's green groceries stall, picking the exact fresh bunch of Sukuma Wiki, and walking home in 3 minutes!"
          }
        ]
      },
      pocketTakeaway: "Narrow first, decorate later! Specify index, sourcetype, and filters before the first pipe (|) for lightning-fast answers!"
    }
  ],

  // Interactive Quiz for Module 6
  quizChallenges: [
    {
      id: "m6_q1",
      scenario: "In the SPL query: 'index=web status=500 | stats count by host', what does the vertical pipe (|) symbol represent?",
      options: [
        { id: "a", text: "It is an electrical fence to keep hackers out", isCorrect: false, feedback: "The pipe is a syntax conveyor, not a physical fence!" },
        { id: "b", text: "A conveyor belt that passes the matching events to the next command ('...and then...')", isCorrect: true, feedback: "Spot on! The pipe (|) passes the output of the search terms to the 'stats' command to be processed!" },
        { id: "c", text: "It deletes all the web logs from disk", isCorrect: false, feedback: "Splunk never deletes logs with a pipe; it only passes data forward." }
      ]
    },
    {
      id: "m6_q2",
      scenario: "What is the #1 best practice for writing fast, efficient Splunk searches?",
      options: [
        { id: "a", text: "Always start with '*' and search across all indexes since the year 2000", isCorrect: false, feedback: "That is the slowest possible query and can freeze indexers!" },
        { id: "b", text: "Narrow first, decorate later: specify index, sourcetype, and filters before the first pipe (|)", isCorrect: true, feedback: "Bingo! Filtering early minimizes disk I/O and network transfer, making your search blazing fast!" },
        { id: "c", text: "Type your query with your keyboard upside down", isCorrect: false, feedback: "Haha, keyboard tricks won't speed up search execution; filtering early does!" }
      ]
    },
    {
      id: "m6_q3",
      scenario: "In 'stats count(status) as total by host', which part is the 'clause' that renames the resulting column for readability?",
      options: [
        { id: "a", text: "as total", isCorrect: true, feedback: "Exactly! 'as total' is the renaming clause that changes the default column name to 'total'!" },
        { id: "b", text: "stats", isCorrect: false, feedback: "'stats' is the transforming command, not the renaming clause." },
        { id: "c", text: "count(status)", isCorrect: false, feedback: "'count' is the statistical function and 'status' is the argument." }
      ]
    }
  ]
};
