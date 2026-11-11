// Splunk Module 2 Data: Using Splunk (Apps, User Roles, and Web Interface)
// Tailored for ADHD, neurodivergent, anxiety-free learning with dual analogies:
// 1. Estate Guard House & Badge Levels
// 2. Kenyan Everyday Life (Huduma Centre & Matatu Sacco Leadership)

export const splunkModule2Data = {
  moduleId: 2,
  title: "Module 2 – Using Splunk",
  headline: "The Guard House, The Rooms, and The 3 Badges",
  description: "Discover how Splunk Web works, how Apps organize your work into specialized rooms, and who holds the keys.",
  subtopics: [
    {
      id: "web_and_apps",
      title: "1. Splunk Web & Splunk Apps",
      badge: "Interface & Workspaces",
      colorTheme: "amber",
      layman: {
        title: "What are Splunk Web and Splunk Apps?",
        intro: "You don't need to be a programmer or look at a black hacker terminal to use Splunk. Splunk runs right inside your regular web browser.",
        explanation: "Splunk Web is the visual website interface where you click, search, and see charts. Inside Splunk Web, work is organized into 'Apps'—pre-built workspaces tailored for different jobs so your screen is never messy.",
        bullets: [
          {
            term: "Splunk Web",
            simple: "The graphical website running on port 8000 by default in your browser, where you log in and do all your searching and dashboard viewing."
          },
          {
            term: "Splunk Apps",
            simple: "Specialized rooms or toolboxes designed for specific tasks (like monitoring cloud servers, detecting hackers, or tracking sales)."
          },
          {
            term: "Search & Reporting App",
            simple: "The primary, default room where every Splunk user starts. It has the main search bar, time picker, and dashboard builder."
          }
        ]
      },
      originalAnalogy: {
        title: "The Security Headquarters & The Specialized Rooms",
        summary: "Imagine walking into the main Estate Security Headquarters. It is not just one chaotic open tent; it is a well-designed building.",
        characters: [
          {
            name: "🖥️ Splunk Web = The Reception Lobby",
            role: "The bright glass entrance with signposts where you type your username and password. Clean, inviting, and well lit."
          },
          {
            name: "🚪 Splunk Apps = Dedicated Rooms",
            role: "Room 1 is the 'Search & Reporting Room' where guards look up visitor history. Room 2 is the 'Alarm & Camera Room' for night emergencies. Room 3 is the 'VIP Parking Office'. Each room has only the tools needed for that task."
          },
          {
            name: "🔍 Search & Reporting = The Main Enquiry Desk",
            role: "The biggest, busiest desk in the guard house where 90% of questions are asked and answered."
          }
        ]
      },
      kenyanAnalogy: {
        title: "The Huduma Centre / Commercial Bank Branch",
        summary: "Think of visiting a large Huduma Centre (like GPO Nairobi) or a major Equity Bank branch.",
        characters: [
          {
            name: "🏢 Splunk Web = The Main Banking Hall",
            role: "The comfortable air-conditioned hall you enter through the security scanner. You are greeted with a digital queue number and clear desks."
          },
          {
            name: "🏷️ Splunk Apps = Specific Service Counters",
            role: "Counter A is for ID Card replacement, Counter B is for Driver's Licenses, and Counter C is for Business Registration. You don't mix ID applications with driving tests; each counter is set up specifically for one service."
          },
          {
            name: "📋 Search & Reporting App = The General Enquiry Desk",
            role: "Desk #1 right at the entrance where officers look up records in the national database to answer any citizen's question."
          }
        ]
      },
      pocketTakeaway: "Splunk Web is the building; Apps are the specialized rooms; Search & Reporting is your main office!"
    },
    {
      id: "user_roles",
      title: "2. Splunk User Roles (The Three Badges)",
      badge: "Permissions & Badges",
      colorTheme: "sky",
      layman: {
        title: "Who Can Do What? Splunk User Roles",
        intro: "In any big company, you don't give the master safe key to the newly hired intern. Splunk uses 'User Roles' to keep data safe and organized.",
        explanation: "A role is like a security badge that decides what data you can see, which searches you can run, and whether you can change system settings. Splunk comes with three classic roles built right in.",
        bullets: [
          {
            term: "User Role (Trainee / Analyst)",
            simple: "Can search data they have permission to see, create private searches, and view shared team dashboards. Cannot change system settings."
          },
          {
            term: "Power User Role (Senior Analyst / Team Lead)",
            simple: "Can do everything a User does, PLUS share reports and dashboards with the entire team, create knowledge objects, and run real-time searches."
          },
          {
            term: "Admin Role (The Boss / Administrator)",
            simple: "Holds all master keys. Can install apps, add or delete user accounts, create new data indexes, and configure servers."
          }
        ]
      },
      originalAnalogy: {
        title: "The Three Security Badges at the Estate",
        summary: "In our 1,000-gate estate, guards wear color-coded badges so everyone knows what they are authorized to touch.",
        characters: [
          {
            name: "🟢 Green Badge = The Guard (User)",
            role: "Can open the visitor logbook, check who entered yesterday, and keep a personal notepad. Cannot throw away books or change gate rules."
          },
          {
            name: "🔵 Blue Badge = Head Sergeant (Power User)",
            role: "Senior guard who pins official announcements on the team noticeboard for all guards to see and creates standard visitor report templates."
          },
          {
            name: "🔴 Red Badge = Chief Security Commander (Admin)",
            role: "Holds the master padlock keys, hires new guards, sets gate curfews, installs new alarm systems, and decides who gets which badge."
          }
        ]
      },
      kenyanAnalogy: {
        title: "The Hierarchy of a Matatu Sacco",
        summary: "Observe how order is maintained inside a 500-matatu Sacco organization.",
        characters: [
          {
            name: "🎫 Junior Conductor (User)",
            role: "Issues passenger tickets and checks the manifest for his specific vehicle. Cannot change route prices or reassign other conductors."
          },
          {
            name: "📋 Stage Route Inspector (Power User)",
            role: "Manages the queue of 30 vans, posts departure timetables on the stage board, and creates daily route performance summaries."
          },
          {
            name: "👑 Sacco Chairman / Director (Admin)",
            role: "Signs fleet insurance policies, buys new matatus, hires stage inspectors, and negotiates route licenses with NTSA."
          }
        ]
      },
      pocketTakeaway: "User searches, Power User shares, Admin controls the entire system!"
    }
  ],

  // Interactive Quiz for Module 2
  quizChallenges: [
    {
      id: "m2_q1",
      scenario: "Sarah is a cybersecurity analyst who just built a fantastic dashboard showing brute-force login attempts. She wants the entire security team to be able to see and use her dashboard. What minimum role does she need?",
      options: [
        { id: "a", text: "User Role", isCorrect: false, feedback: "A standard User can only save private dashboards for themselves. They cannot share them team-wide." },
        { id: "b", text: "Power User Role", isCorrect: true, feedback: "Spot on! Power Users have the permission to share dashboards, reports, and knowledge objects with other team members!" },
        { id: "c", text: "Database Technician", isCorrect: false, feedback: "That is not a standard Splunk role; in Splunk, Power User is the role that allows team-wide sharing." }
      ]
    },
    {
      id: "m2_q2",
      scenario: "Which app inside Splunk Web is the primary, default workspace where most searches, queries, and reports are created?",
      options: [
        { id: "a", text: "The Search & Reporting App", isCorrect: true, feedback: "Exactly! The Search & Reporting App is the foundational heart of Splunk where users spend 90% of their time!" },
        { id: "b", text: "The Game Controller App", isCorrect: false, feedback: "Not quite! The default primary app is Search & Reporting." },
        { id: "c", text: "The Cloud Billing App", isCorrect: false, feedback: "Cloud billing is an administrative add-on, not the primary search workspace." }
      ]
    },
    {
      id: "m2_q3",
      scenario: "A junior analyst accidentally tries to install a brand new Splunk App from Splunkbase and change user passwords. Why does Splunk block him?",
      options: [
        { id: "a", text: "Because his computer screen is too small", isCorrect: false, feedback: "Screen size doesn't matter; it is about role permissions!" },
        { id: "b", text: "Installing apps and managing user credentials requires the Admin role", isCorrect: true, feedback: "Bingo! Only Admins hold the master keys to install apps and change system-level credentials." },
        { id: "c", text: "Because Splunk Web only works on Saturdays", isCorrect: false, feedback: "Splunk Web works 24/7/365!" }
      ]
    }
  ]
};
