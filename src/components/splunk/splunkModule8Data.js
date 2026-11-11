// Splunk Module 8 Data: Creating Reports and Dashboards (The Control Room Wall)
// Tailored for ADHD, neurodivergent, anxiety-free learning with dual analogies:
// 1. Estate Guard House: Saved Question Cards, Tally Sheets, and The Master Control Room Wall
// 2. Kenyan Everyday Life: Sacco Daily Audit Sheets & Super Metro Operations TV Wall

export const splunkModule8Data = {
  moduleId: 8,
  title: "Module 8 – Creating Reports & Dashboards",
  headline: "The Master Control Room Wall & Transforming Commands",
  description: "Learn how to turn raw searches into permanent reusable reports, transform chaotic logs into charts, and build the live control room wall.",
  subtopics: [
    {
      id: "reports_and_transforming",
      title: "1. Reports & Transforming Commands",
      badge: "Reports & Visualizations",
      colorTheme: "amber",
      layman: {
        title: "Saved Reports and Why We Must 'Transform' Data",
        intro: "You don't want to retype the exact same query every morning. In Splunk, you write a search once, click 'Save As -> Report', and it becomes a permanent question card you can run with one click.",
        explanation: "Here is the golden rule of charts: YOU CANNOT DRAW A CHART OF RAW TEXT! A pie chart or bar chart needs numbers. 'Transforming Commands' (like stats, chart, and timechart) turn the messy pile of events into a clean numerical tally table that Splunk can instantly draw as a visual chart.",
        bullets: [
          {
            term: "Saved Report",
            simple: "A saved search that can be viewed anytime, scheduled to run automatically (like every Monday morning), and emailed to managers."
          },
          {
            term: "Transforming Commands (stats, timechart, chart)",
            simple: "Commands that turn thousands of raw log rows into a statistical summary table with rows and columns of numbers."
          },
          {
            term: "The Visualizer (Pie, Bar, Line, Area)",
            simple: "Once a transforming command produces a table of numbers, clicking the 'Visualization' tab renders beautiful colorful charts instantly."
          }
        ]
      },
      originalAnalogy: {
        title: "The Question Card & The Tally Sheet",
        summary: "In the guard house, you don't make the guard reinvent the wheel every morning.",
        characters: [
          {
            name: "📋 Saved Report = The Pre-Printed Question Card",
            role: "A laminated card kept at the desk: 'Count night visitors by gate'. Whenever the boss walks in, the guard pulls out the card, runs the task, and hands over the answer."
          },
          {
            name: "🔢 Transforming Command = Turning Paper Slips into a Tally",
            role: "You cannot draw a painting of 1,000 messy paper slips. The clerk must first count them into a tally sheet: 'Gate A: 12, Gate B: 4, Gate C: 28'."
          },
          {
            name: "📊 Visualization = Drawing the Chalk Chart",
            role: "Once the numbers are on the tally sheet, the guard sketches neat colored chalk bars on the wooden board."
          }
        ]
      },
      kenyanAnalogy: {
        title: "The Sacco Daily Audit Sheet & Stage Revenue Chart",
        summary: "Watch how a Matatu Sacco terminus turns hundreds of paper tickets into management summaries.",
        characters: [
          {
            name: "📑 Saved Report = Daily Route Reconciliation Template",
            role: "The standard printed form the Sacco manager uses every day at 6 PM to calculate daily earnings without rewriting the formulas."
          },
          {
            name: "🧮 Transforming Command = Summing Cash in the Sacco Register",
            role: "The accountant doesn't show the bank a bag of 10,000 coins; he counts them into a summary slip: 'Thika Route: KES 85,000, Juja Route: KES 62,000'."
          },
          {
            name: "📈 Visualization = The Office Target Graph",
            role: "Drawing green and blue bars on the office board comparing passenger volume across morning and evening peak hours."
          }
        ]
      },
      pocketTakeaway: "Save your favorite questions as Reports. Use transforming commands (stats, timechart) to turn messy raw logs into clean numbers for charts!"
    },
    {
      id: "dashboards_and_control_room",
      title: "2. Dashboards: Building The Control Room Wall",
      badge: "Dashboards & Master Wall",
      colorTheme: "emerald",
      layman: {
        title: "The Ultimate Goal: The Live Control Room Wall",
        intro: "In cybersecurity and IT operations, bosses don't have time to run searches. They look at a giant wall of live screens called a Dashboard.",
        explanation: "A Dashboard is a collection of saved reports, charts, single-value gauges, and tables pinned together on one single screen. You can add new panels, drag and drop charts to rearrange them, change themes (light or dark mode), and share the URL with your entire organization.",
        bullets: [
          {
            term: "What is a Dashboard?",
            simple: "A single master web page with multiple live panels (charts, counters, maps) showing real-time system health at a glance."
          },
          {
            term: "Add Report to Dashboard",
            simple: "Pinning any saved search or chart into an existing or brand new dashboard with a single click."
          },
          {
            term: "Edit Dashboard",
            simple: "Switching to edit mode to drag panels around, change chart types (e.g. switch bar chart to pie chart), or add interactive time filters."
          },
          {
            term: "SOC Analyst's Dream",
            simple: "This is what real Security Operations Centers look like: giant TV screens on the wall with live alerts flashing green and amber."
          }
        ]
      },
      originalAnalogy: {
        title: "The Master Wall in the Chief Guard's Office",
        summary: "Step inside the Chief Security Officer's command bunker.",
        characters: [
          {
            name: "📺 The Dashboard = The Wall of Boards",
            role: "The entire wall of the chief's room has live whiteboards and monitors pinned side by side: Gate Status, Visitor Trends, Alarms, and Parking Capacity."
          },
          {
            name: "📌 Add to Dashboard = Pinning a Card on the Wall",
            role: "Whenever a guard creates a great new chart, he pins it into a dedicated frame on the main wall."
          },
          {
            name: "🛠️ Edit Dashboard = Rearranging the Frames",
            role: "Moving the night alarm chart to the very top center so it catches the supervisor's eye first."
          }
        ]
      },
      kenyanAnalogy: {
        title: "The Super Metro / 2NK Operations Control Centre",
        summary: "Step into the main operations control room of a major transportation company or airport terminal.",
        characters: [
          {
            name: "🖥️ The Dashboard = The Master Terminus TV Display",
            role: "The big flat-screen TVs hanging in the dispatch office showing vans en route, fuel levels, total passengers today, and stage congestion in real time."
          },
          {
            name: "📌 Pinning Panels = Adding a Route Display",
            role: "Adding a new screen dedicated specifically to the newly opened expressway route."
          },
          {
            name: "⚡ 3-Second Rule",
            role: "The Managing Director walks into the room, glances at the wall for 3 seconds, and immediately knows if operations are running smoothly without saying a single word!"
          }
        ]
      },
      pocketTakeaway: "A dashboard is the master wall of charts. Pin your reports side by side so anyone can understand the health of the system in 3 seconds!"
    }
  ],

  // Interactive Quiz for Module 8
  quizChallenges: [
    {
      id: "m8_q1",
      scenario: "Why can't you immediately create a pie chart or bar chart directly from a raw search like 'index=web status=500' without using a command like 'stats'?",
      options: [
        { id: "a", text: "Because Splunk is angry with you", isCorrect: false, feedback: "Splunk is always friendly; it's about data structure!" },
        { id: "b", text: "Visual charts require numerical tables; transforming commands (like stats or timechart) must first turn raw text into numbers", isCorrect: true, feedback: "Spot on! Charts need numerical tallies; transforming commands transform raw logs into statistical tables that can be rendered as charts!" },
        { id: "c", text: "Because pie charts only work on birthdays", isCorrect: false, feedback: "Haha, pie charts work every day once data is transformed into numbers!" }
      ]
    },
    {
      id: "m8_q2",
      scenario: "Your supervisor wants to see a live visual screen every morning that displays failed login spikes, web errors, and firewall drops all on one single page. What should you build?",
      options: [
        { id: "a", text: "A Dashboard", isCorrect: true, feedback: "Exactly! A Dashboard combines multiple panels, reports, and charts onto a single cohesive screen for instant monitoring!" },
        { id: "b", text: "A paper sticky note on his coffee mug", isCorrect: false, feedback: "A live Splunk Dashboard updates in real time and is vastly superior!" },
        { id: "c", text: "A blank Word document", isCorrect: false, feedback: "Word documents aren't live; Splunk Dashboards provide live interactive operational visibility!" }
      ]
    },
    {
      id: "m8_q3",
      scenario: "What is the primary difference between a 'Search' and a 'Saved Report'?",
      options: [
        { id: "a", text: "A Search is a one-time ad-hoc query; a Report is a saved, reusable question that can be scheduled and shared", isCorrect: true, feedback: "Bingo! A Search is ad-hoc; a Report is saved, can be scheduled on a timer, emailed automatically, and pinned to dashboards!" },
        { id: "b", text: "Searches cost money, but Reports are free", isCorrect: false, feedback: "Both are part of your Splunk license!" },
        { id: "c", text: "Reports can only be read at midnight", isCorrect: false, feedback: "Reports can be viewed anytime with a single click!" }
      ]
    }
  ]
};
