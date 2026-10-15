import { Chapter } from "./javaContent";

export const jiraChapters: Chapter[] = [
  {
    id: 1,
    slug: "jira-fundamentals-architecture",
    title: "Jira Fundamentals & Product Architecture",
    description: "Understand Jira's core architecture, Cloud vs Data Center, product editions, and the Atlassian team ecosystem.",
    sections: [
      {
        heading: "What is Jira?",
        content: "Jira is an enterprise-grade issue tracking, project management, and Agile work orchestration platform developed by Atlassian. Originally created as an issue and bug tracker for software developers, Jira has evolved into a central ecosystem for cross-functional collaboration spanning software engineering, IT service operations, marketing, human resources, and business teams.\n\nAt its foundation, Jira organizes work into **Issues** (individual work items) that belong to **Projects**, progress through customizable **Workflows**, and are monitored through visual **Agile Boards** and **Dashboards**.",
        objectives: [
          "Understand the core architecture and purpose of Jira in modern organizations.",
          "Differentiate between Jira Cloud and Jira Data Center hosting models.",
          "Identify the core Jira product families (Software, Service Management, Work Management, Product Discovery).",
          "Recognize global administrative roles versus project-level team roles.",
        ],
        note: "In modern Jira Cloud terminology, Jira often refers to issues generically as 'Work Items', though 'Issues' remains the standard foundational term across APIs, JQL, and administrative menus.",
        takeaways: [
          "Jira provides an end-to-end traceable record from initial concept to code deployment.",
          "Everything in Jira revolves around three building blocks: Projects, Issues, and Workflows.",
        ],
      },
      {
        heading: "The Jira Product Family",
        content: "Atlassian provides specialized flavors of Jira tailored to specific operational disciplines:\n\n1. **Jira Software (JSW):** Designed for Agile software engineering teams. Includes Scrum and Kanban boards, backlog management, sprint planning, code repository integration (GitHub/GitLab/Bitbucket), and release versioning.\n2. **Jira Service Management (JSM):** ITIL-aligned service desk solution for IT and operations teams. Features customer portals, SLAs, incident/problem/change management, and asset tracking.\n3. **Jira Work Management (JWM):** Tailored for business teams (HR, Marketing, Finance, Legal) with list, calendar, timeline, and form views.\n4. **Jira Product Discovery (JPD):** Dedicated tool for product managers to capture ideas, score priorities (e.g., RICE framework), and align roadmaps before committing items to Jira Software backlogs.",
        explanation: "While each product provides tailored user interfaces and terminology, they all run on the same unified Atlassian Jira platform engine, allowing cross-project issue linking and unified search queries.",
        commonMistakes: [
          {
            mistake: "Using Jira Service Management for sprint-based software development.",
            fix: "Use Jira Software for Agile sprints and backlogs; reserve JSM for ticketing, customer support portals, and incident response SLAs.",
          },
        ],
      },
      {
        heading: "Cloud vs. Data Center Deployments",
        content: "Jira is delivered in two primary operational architectures:\n\n| Attribute | Jira Cloud | Jira Data Center |\n|---|---|---|\n| **Hosting** | Atlassian-managed multi-tenant cloud (AWS) | Customer-managed (AWS, Azure, or on-premise) |\n| **Maintenance** | Automatic continuous updates & backups | Admin-managed patching, upgrades & clusters |\n| **Project Types** | Team-managed & Company-managed projects | Company-managed projects only |\n| **Automation** | Native global and multi-project automation | Automation rules bundled in recent versions |\n| **APIs** | Atlassian Cloud REST API v3 (Atlassian ID) | Server/Data Center REST API v2 (PAT / OAuth) |",
        code: `# Inspect Jira Cloud site connectivity and verify current user profile via REST API
curl --request GET \\
  --url 'https://your-domain.atlassian.net/rest/api/3/myself' \\
  --user 'email@example.com:ATLASSIAN_API_TOKEN' \\
  --header 'Accept: application/json'`,
        codeTitle: "jira-cloud-api-check.sh",
        output: `{
  "self": "https://your-domain.atlassian.net/rest/api/3/user?accountId=5b10ac8d82e05b22cc7d4ef5",
  "accountId": "5b10ac8d82e05b22cc7d4ef5",
  "emailAddress": "email@example.com",
  "displayName": "Alex Turner",
  "active": true,
  "timeZone": "Asia/Kolkata",
  "accountType": "atlassian"
}`,
        explanation: "Jira Cloud utilizes email + API tokens with unique account IDs for authentication, whereas Data Center historically supports username/password or Personal Access Tokens (PATs).",
        exercise: {
          task: "Log into your Jira Cloud workspace or create a free Atlassian Cloud tier account. Navigate to 'Settings' > 'System' and locate your organization URL and system time zone settings.",
          hint: "Your personal API tokens can be generated under Atlassian Account Security settings at id.atlassian.com/manage-profile/security/api-tokens.",
        },
      },
    ],
  },
  {
    id: 2,
    slug: "projects-spaces-templates",
    title: "Projects, Spaces & Configuration Models",
    description: "Explore Jira projects, understand the crucial differences between Team-managed and Company-managed architectures, and configure project keys.",
    sections: [
      {
        heading: "Jira Project Architecture & Keys",
        content: "A **Project** in Jira is a container that organizes related issues, permissions, workflows, and boards under a shared purpose. Every project possesses:\n\n• **Project Name:** Human-readable title (e.g., 'E-Commerce Checkout Service').\n• **Project Key:** A unique uppercase alphanumeric prefix (typically 2 to 10 characters, e.g., 'CHK' or 'SHOP'). Every issue created in the project inherits this key followed by a sequential number (e.g., 'CHK-1', 'CHK-2', 'CHK-105').\n• **Project Lead:** The user responsible for the project's overall management.\n• **Default Assignee:** Either 'Project Lead' or 'Unassigned' (if enabled in global configuration).",
        objectives: [
          "Define the structure and properties of a Jira project.",
          "Distinguish clearly between Team-managed and Company-managed project architectures.",
          "Understand project schemes and how they govern configurations at scale.",
          "Integrate Jira projects with Confluence spaces for holistic documentation.",
        ],
        note: "Project keys cannot be reused across active or archived projects on the same Jira site. Choosing a clear, distinct key is critical for concise JQL searches and Git commit references.",
      },
      {
        heading: "Team-Managed vs. Company-Managed Projects",
        content: "One of the most essential decisions in Jira Cloud is selecting between **Team-managed** and **Company-managed** project architectures:\n\n### 1. Team-Managed Projects (Formerly 'Next-Gen')\n• Designed for autonomous, independent teams.\n• Project administrators can create custom fields and edit workflows directly within their own project settings.\n• Changes **never** impact other projects on the Jira instance.\n• Simplified permissions and lighter administrative overhead.\n• Best for isolated teams, non-software business initiatives, or rapid prototyping.\n\n### 2. Company-Managed Projects (Formerly 'Classic')\n• Standardized for enterprise-wide consistency.\n• Governed by centralized **Schemes** (Permission schemes, Notification schemes, Issue Type schemes, Workflow schemes).\n• Changing a workflow or field scheme can affect multiple linked projects simultaneously.\n• Requires Jira Administrator privileges to modify underlying schemes.\n• Best for multi-team engineering organizations, audited compliance processes, and standard release pipelines.",
        explanation: "Company-managed projects enforce standardized definitions across hundreds of engineering squads, whereas Team-managed projects give immediate autonomy to a single group without opening global admin rights.",
        commonMistakes: [
          {
            mistake: "Choosing a Team-managed project when multiple squads must share the exact same standardized workflow and custom reporting schemes.",
            fix: "Use a Company-managed project with shared Schemes so workflows and issue types stay synchronized across all participating repositories and squads.",
          },
        ],
      },
      {
        heading: "Confluence Spaces & Project Links",
        content: "In modern organizations, Jira is paired with **Atlassian Confluence**:\n• **Jira** tracks the *status and progress* of work (issues, epics, pull requests).\n• **Confluence** hosts the *knowledge and specification* of work (product requirement docs (PRDs), architectural decision records (ADRs), meeting notes, retrospectives).\n\nLinking a Confluence Space to a Jira Project automatically surfaces relevant documentation directly on the Jira project sidebar under 'Project Pages'.",
        takeaways: [
          "Every Jira issue created gets a unique, immutable Project Key prefix (e.g., 'PROJ-142').",
          "Team-managed projects offer localized autonomy; Company-managed projects provide cross-enterprise scheme reuse.",
        ],
        exercise: {
          task: "Create a new Scrum project in Jira Cloud. Select 'Company-managed' as the template, choose key 'TECH', and link a Confluence project space.",
          hint: "Navigate to Projects > Create Project > Scrum > Company-managed project.",
        },
      },
    ],
  },
  {
    id: 3,
    slug: "issues-work-items-hierarchy",
    title: "Issues, Work Items & Field Hierarchy",
    description: "Master the standard issue hierarchy, standard fields vs custom fields, components, fix versions, and dependencies.",
    sections: [
      {
        heading: "The Standard Issue Hierarchy",
        content: "Jira organizes work in a structured parent-child hierarchy to break down strategic initiatives into actionable units:\n\n```text\nLevel 2: Initiative / Theme (Portfolio level across multiple teams)\n    └── Level 1: Epic (Large body of work delivering a feature over multiple sprints)\n            └── Level 0: Standard Issues\n                    ├── Story (User perspective: 'As a user, I want...')\n                    ├── Task (Technical or administrative work)\n                    └── Bug (Defect or regression needing resolution)\n                            └── Level -1: Sub-tasks\n                                    └── Granular checklists assigned to individuals\n```\n\n• **Epic:** Represents a high-level capability (e.g., 'Epic: OAuth2 Social Login Integration').\n• **Story:** An end-user requirement with acceptance criteria.\n• **Bug:** An unexpected issue or deviation from expected software behavior.\n• **Sub-task:** Smaller chunks of a Story/Task (e.g., 'Write unit tests for token validator') that cannot exist independently of their parent.",
        objectives: [
          "Understand the standard multi-tier Jira issue hierarchy.",
          "Identify and configure critical issue fields (Priority, Assignee, Reporter, Fix Version).",
          "Differentiate between Components and Fix Versions for categorizing work.",
          "Create issue dependencies and links (blocks, is blocked by, relates to).",
        ],
        note: "Sub-tasks always inherit their parent issue's project, security level, and sprint, but can be assigned to different individuals.",
      },
      {
        heading: "Critical Issue Fields & Metadata",
        content: "Every Jira issue maintains a rich set of system and custom fields:\n\n• **Summary:** The single-line title of the work item (required).\n• **Description:** The rich-text specification, acceptance criteria, and reproduction steps.\n• **Assignee:** The person responsible for completing the work. Only one user can be assigned.\n• **Reporter:** The user who logged or submitted the issue.\n• **Priority:** The business/technical urgency (Highest, High, Medium, Low, Lowest).\n• **Components:** Sub-sections of a project (e.g., 'Frontend', 'Database', 'Auth API') used to categorize issues and automatically assign domain leads.\n• **Fix Versions:** Releases or milestones in which the resolved issue will be shipped (e.g., 'v1.4.0'). Enables release notes generation.\n• **Resolution:** Set automatically when an issue reaches a 'Done' status category (e.g., 'Fixed', 'Won't Fix', 'Duplicate').",
        commonMistakes: [
          {
            mistake: "Manually typing 'Fixed' into an issue comment instead of using a workflow transition that populates the official 'Resolution' field.",
            fix: "Ensure workflow transitions leading to the Done status category prompt for or automatically set the Resolution field. JQL queries check 'resolution is not EMPTY' to identify closed work.",
          },
        ],
      },
      {
        heading: "Creating Issues & Dependencies",
        content: "Issues can be linked to express relationships, constraints, and dependencies without breaking hierarchy:\n\n• `blocks` / `is blocked by` (Critical for identifying delivery bottlenecks).\n• `relates to` (Conceptual association).\n• `duplicates` / `is duplicated by` (Redundant tickets).\n• `causes` / `is caused by` (Incidents and resulting bug tracking).",
        code: `# Sample payload to create a new Story linked to an Epic via Jira Cloud REST API v3
curl --request POST \\
  --url 'https://your-domain.atlassian.net/rest/api/3/issue' \\
  --user 'email@example.com:API_TOKEN' \\
  --header 'Accept: application/json' \\
  --header 'Content-Type: application/json' \\
  --data '{
    "fields": {
      "project": { "key": "TECH" },
      "summary": "Implement JWT token validation middleware",
      "issuetype": { "name": "Story" },
      "priority": { "name": "High" },
      "components": [{ "name": "Auth API" }],
      "description": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [{ "type": "text", "text": "Validate Bearer token on incoming requests and verify RS256 signature." }]
          }
        ]
      }
    }
  }'`,
        codeTitle: "create-jira-issue.sh",
        explanation: "Jira Cloud API v3 uses the Atlassian Document Format (ADF) JSON structure for description fields rather than raw Markdown or HTML.",
        exercise: {
          task: "In your project, create an Epic titled 'User Authentication Overhaul'. Under that Epic, create three Child Stories: 'Email Login', 'Google OAuth2', and 'Password Reset'. Link 'Google OAuth2' as 'blocks' on 'Password Reset'.",
          hint: "Open the Epic in Jira Software and click the '+ Add Child Issue' button.",
        },
      },
    ],
  },
  {
    id: 4,
    slug: "workflows-statuses-transitions",
    title: "Workflows, Statuses & Transition Rules",
    description: "Design robust Jira workflows, understand the 3 status categories, and enforce quality with conditions, validators, and post-functions.",
    sections: [
      {
        heading: "Jira Workflow Fundamentals",
        content: "A **Workflow** defines the lifecycle and sequential steps a work item goes through from creation to completion. A workflow consists of:\n\n1. **Statuses:** The states of work at any point in time (e.g., 'Open', 'In Development', 'Code Review', 'QA Testing', 'Done').\n2. **Transitions:** The directional pathways that connect one status to another (e.g., 'Start Progress', 'Submit for Review', 'Approve & Merge'). Transitions can be constrained to specific statuses or configured as 'all-to-this' global transitions.",
        objectives: [
          "Master the mechanics of Jira statuses and transitions.",
          "Distinguish between status names and the 3 immutable Status Categories.",
          "Configure workflow Conditions, Validators, and Post-functions.",
          "Avoid common workflow anti-patterns that create friction for engineering squads.",
        ],
        note: "Every workflow transition has a Direction. A status can have multiple inbound and outbound transitions.",
      },
      {
        heading: "The Three Immutable Status Categories",
        content: "While organizations can invent hundreds of custom status names, every single status in Jira must map to exactly one of **three core Status Categories**:\n\n1. **To Do (Grey):** Work that has been identified but has not yet commenced (e.g., 'Open', 'Backlog', 'Ready for Dev', 'Selected for Development').\n2. **In Progress (Blue):** Work actively being acted upon (e.g., 'In Development', 'In Code Review', 'Testing in Staging', 'Blocked / Investigating').\n3. **Done (Green):** Work that is finished or finalized (e.g., 'Closed', 'Resolved', 'Deployed to Production', 'Cancelled').\n\nJira's Agile boards, release burndowns, cycle-time calculations, and SLA timers rely exclusively on the **Status Category**, not the custom status text.",
        explanation: "If you name a status 'In QA' but accidentally set its category to 'To Do', Jira will treat issues in QA as unstarted in your burndown charts and board metrics.",
        commonMistakes: [
          {
            mistake: "Creating a custom status called 'Cancelled' or 'Rejected' and categorizing it as 'To Do'.",
            fix: "Always categorize 'Cancelled' and 'Rejected' statuses as 'Done' (Green), and set the Resolution field to 'Cancelled' or 'Won't Fix' so they are excluded from active sprint calculations.",
          },
        ],
      },
      {
        heading: "Workflow Rules: Conditions, Validators & Post-Functions",
        content: "In Company-managed projects and advanced workflows, administrators configure transition logic using three core tools:\n\n• **Conditions:** Decide *WHO* can execute a transition. Evaluated before the user sees the transition button. If false, the button is hidden (e.g., 'Only users in project role QA can transition to Ready for Release').\n• **Validators:** Check *INPUT DATA* when the user clicks the transition button. If the check fails, the transition is blocked and an error message is displayed (e.g., 'Require a Fix Version before transitioning to Done').\n• **Post-Functions:** Automated actions executed *AFTER* the transition successfully completes (e.g., 'Set Resolution to Fixed', 'Assign issue to Lead Developer', 'Trigger Webhook to Jenkins CI/CD').",
        code: `// Jira Cloud Automation rule trigger equivalent to a Post-Function
{
  "trigger": "Issue Transitioned to Done",
  "conditions": [
    { "field": "issuetype", "equals": "Bug" }
  ],
  "actions": [
    { "setField": "resolution", "value": "Fixed" },
    { "sendSlackNotification": "Bug has been verified and closed by QA team." }
  ]
}`,
        codeTitle: "workflow-automation-rule.json",
        takeaways: [
          "Statuses represent where an issue is; Transitions represent how it moves.",
          "Status Categories (To Do, In Progress, Done) govern all metric reporting.",
          "Conditions hide buttons; Validators verify field requirements; Post-functions trigger automated actions.",
        ],
        exercise: {
          task: "Inspect the workflow editor for your project. Create a transition from 'In Progress' to 'Done' named 'Complete & Release'. Attach a post-function that automatically populates the 'Resolution' field with 'Done'.",
          hint: "Go to Project Settings > Workflows > Edit Workflow > Select transition > Post Functions > Add Post Function > Update Issue Field.",
        },
      },
    ],
  },
  {
    id: 5,
    slug: "scrum-and-kanban-boards",
    title: "Agile Boards: Scrum vs. Kanban",
    description: "Build and configure high-visibility Scrum and Kanban boards, establish WIP limits, and customize card layouts and swimlanes.",
    sections: [
      {
        heading: "Agile Board Architecture in Jira",
        content: "A Jira **Board** is a visual representation of work flowing through a workflow. A board is not a separate storage database; it is a **view powered by a saved filter (JQL)** that selects issues from one or more projects.\n\nBoards map Jira workflow statuses into visual columns. Multiple workflow statuses can be mapped to a single board column (e.g., mapping both 'Code Review' and 'Peer Inspection' statuses to a single column titled 'Review').",
        objectives: [
          "Understand how Jira boards map underlying workflow statuses into visual columns.",
          "Compare the operational dynamics of Scrum versus Kanban boards.",
          "Configure Work In Progress (WIP) limits to eliminate delivery bottlenecks.",
          "Customize board swimlanes, quick filters, and card layouts.",
        ],
        note: "An issue will disappear from a board if its current workflow status is not mapped to any column in the board configuration.",
      },
      {
        heading: "Scrum Boards vs. Kanban Boards",
        content: "Jira provides two primary board types matching Agile methodologies:\n\n### 1. Scrum Board\n• Built for **time-boxed iterations (Sprints)**, typically 1 to 4 weeks in length.\n• Separate dedicated views for **Backlog Planning** and **Active Sprints**.\n• Issues are estimated in Story Points or hours.\n• Emphasizes sprint commitments, burndown tracking, and velocity stability.\n• Ideal for product development teams delivering coordinated increments.\n\n### 2. Kanban Board\n• Built for **continuous flow** of incoming work.\n• No fixed sprint time-boxes; work is pulled as capacity becomes available.\n• Relies on **WIP Limits (Work In Progress)** on columns to prevent multitasking and overloading.\n• Focuses on Cycle Time, Lead Time, and throughput.\n• Ideal for DevOps operations, platform infrastructure squads, support desks, and continuous maintenance.",
        commonMistakes: [
          {
            mistake: "Mapping an unstarted status into the rightmost column of a board.",
            fix: "Ensure columns run strictly left to right matching the workflow: Left = To Do category, Middle = In Progress category, Right = Done category.",
          },
        ],
      },
      {
        heading: "Configuring WIP Limits & Swimlanes",
        content: "### Work In Progress (WIP) Limits\nIn Kanban board column configuration, administrators can establish **Minimum** and **Maximum** WIP limits. When the number of issues in a column exceeds the maximum threshold, Jira colors the column header bright red to visually signal that the team must collaborate to clear blockers before pulling new work.\n\n### Swimlanes & Quick Filters\n• **Swimlanes:** Horizontal rows that categorize issues across the board (e.g., by 'Assignee', 'Epic', 'Queries', or 'Expedite / Critical Severity').\n• **Quick Filters:** Clickable toggle buttons at the top of the board based on JQL (e.g., 'Only My Issues', 'Recently Updated', 'Blockers').",
        code: `# Sample JQL used for a Kanban Board Quick Filter: "Expedite / P0 Blockers"
priority in (Highest, Blocker) AND statusCategory != Done

# Sample JQL for "My Open Bugs"
issuetype = Bug AND assignee = currentUser() AND statusCategory != Done`,
        codeTitle: "quick-filters.jql",
        explanation: "Quick filters evaluate dynamically for whoever clicks them, especially when using contextual functions like currentUser().",
        exercise: {
          task: "In your project board settings, create a column named 'In Review'. Set its Maximum WIP Limit to 3. Add a Quick Filter titled 'High Priority' filtering for priority in (Highest, High).",
          hint: "Navigate to Board > Board Settings > Columns, then Board Settings > Quick Filters.",
        },
      },
    ],
  },
  {
    id: 6,
    slug: "sprints-estimation-execution",
    title: "Sprint Lifecycle, Estimation & Agile Metrics",
    description: "Lead sprint planning sessions, apply story point estimation, handle mid-sprint scope changes, and analyze burndown and velocity charts.",
    sections: [
      {
        heading: "The Sprint Lifecycle in Jira Software",
        content: "A **Sprint** is a fixed time-box where a development team commits to delivering a working increment of software. The lifecycle in Jira follows four distinct phases:\n\n1. **Sprint Creation:** A new empty sprint container is created on the Backlog view (e.g., 'Sprint 14: Checkout Optimizations').\n2. **Sprint Planning & Commitment:** High-priority items are refined, estimated, and moved from the Product Backlog into the Sprint Backlog.\n3. **Starting the Sprint:** The Scrum Master or Project Lead clicks 'Start Sprint', defining the start date, end date, and Sprint Goal. The issues instantly populate the 'Active Sprints' board.\n4. **Completing the Sprint:** Once the time-box expires, clicking 'Complete Sprint' closes the iteration. Completed issues move to release history, while incomplete issues are automatically rolled over to the next sprint or returned to the backlog.",
        objectives: [
          "Execute the 4-phase sprint lifecycle in Jira Software.",
          "Apply Story Point estimation using the Fibonacci sequence.",
          "Audit and manage mid-sprint scope changes without destabilizing commitments.",
          "Interpret Burndown Charts, Velocity Charts, and Cumulative Flow Diagrams.",
        ],
        note: "Never delete a sprint that has already been started or closed. Deleting an active sprint disassociates issue history and corrupts team velocity metrics.",
      },
      {
        heading: "Story Points & Estimation Practices",
        content: "Agile teams in Jira estimate effort using relative sizing rather than absolute hours:\n• **Story Points:** Relative measure of complexity, uncertainty, and effort, usually based on the Fibonacci sequence (1, 2, 3, 5, 8, 13, 21).\n• Estimations are assigned to Stories, Bugs, and Tasks in the 'Story point estimate' field.\n• Sub-tasks typically do not carry story points to avoid double-counting.\n\nJira sums the story points of all committed issues to determine the **Planned Sprint Capacity**.",
        commonMistakes: [
          {
            mistake: "Treating 1 Story Point as exactly equal to 8 working hours.",
            fix: "Story points represent relative complexity and risk, not direct calendar time. Velocity calculates how many points a team reliably ships over multiple iterations.",
          },
        ],
      },
      {
        heading: "Analyzing Agile Reports & Charts",
        content: "Jira provides automated real-time charts under the 'Reports' tab:\n\n• **Sprint Burndown Chart:** Tracks remaining story points day by day against an ideal guideline slope. Highlights when scope is added mid-sprint (indicated by an upward step in the guideline) or when progress stalls.\n• **Velocity Chart:** Compares committed story points versus actually completed story points across the last 5 to 7 sprints. Helps teams accurately forecast future sprint capacity.\n• **Cumulative Flow Diagram (CFD):** Visualizes the total distribution of issues in each status over time. Parallel bands indicate healthy flow; expanding bands reveal growing bottlenecks.",
        code: `# Jira API to fetch issues and story points for an active sprint
curl --request GET \\
  --url 'https://your-domain.atlassian.net/rest/agile/1.0/sprint/204/issue?fields=summary,status,customfield_10016' \\
  --user 'email@example.com:API_TOKEN' \\
  --header 'Accept: application/json'`,
        codeTitle: "get-sprint-issues.sh",
        explanation: "In Jira Software Cloud, 'customfield_10016' is commonly the default custom field ID storing the Story Point estimate.",
        exercise: {
          task: "Create a sprint named 'Sprint 1'. Assign 3 stories to it with 3, 5, and 8 story points respectively. Start the sprint for a 2-week duration with a clear sprint goal.",
          hint: "Go to the Backlog view, click 'Create Sprint', drag your estimated issues into the sprint container, and click 'Start Sprint'.",
        },
      },
    ],
  },
  {
    id: 7,
    slug: "jql-filters-automation",
    title: "JQL (Jira Query Language), Filters & Automation",
    description: "Harness the power of JQL to write precise search queries, publish saved filters, set subscriptions, and construct no-code automation rules.",
    sections: [
      {
        heading: "Mastering JQL (Jira Query Language)",
        content: "JQL is Jira's native query syntax for searching, auditing, and reporting across all projects. While Jira offers a basic visual dropdown search, advanced administration, dashboards, and boards require raw JQL.\n\nA JQL query consists of:\n• **Field:** The attribute being evaluated (e.g., `project`, `status`, `assignee`, `created`).\n• **Operator:** Comparison operators (`=`, `!=`, `>`, `>=`, `<`, `<=`, `IN`, `NOT IN`, `~` for text contains, `IS EMPTY`).\n• **Value:** The target string, identifier, or date (e.g., `\"TECH\"`, `\"Closed\"`, `-7d`).\n• **Keywords & Functions:** Logic keywords (`AND`, `OR`, `NOT`, `ORDER BY`) and dynamic functions (`currentUser()`, `now()`, `startOfDay()`, `openSprints()`).",
        objectives: [
          "Construct production-grade JQL queries for audits, triage, and dashboards.",
          "Save, share, and schedule automated filter subscriptions via email.",
          "Build multi-step Jira Automation rules using Triggers, Conditions, and Actions.",
          "Leverage smart values (`{{issue.key}}`, `{{initiator}}`) in automation messages.",
        ],
        note: "Use the '~' operator for text fields (searches stemmed text index) and '=' for exact identity matches.",
      },
      {
        heading: "Essential Production JQL Query Examples",
        content: "Here are standard JQL patterns used by engineering directors, Scrum Masters, and release managers:",
        code: `# 1. Find all high-priority bugs reported in the last 7 days that remain unassigned:
project = "TECH" AND issuetype = Bug AND priority in (Highest, High) AND assignee IS EMPTY AND created >= -7d

# 2. Find all issues in active sprints assigned to the currently logged in user:
sprint in openSprints() AND assignee = currentUser() AND statusCategory != Done ORDER BY priority DESC

# 3. Find issues that changed status to 'Done' within the current calendar month:
project in ("TECH", "CORE") AND status changed to "Done" after startOfMonth()

# 4. Find all blocked work items across all engineering projects:
issueLinkType = "is blocked by" AND statusCategory != Done`,
        codeTitle: "production-queries.jql",
        explanation: "Using dynamic functions like 'currentUser()' and 'openSprints()' ensures filters remain reusable across entire squads without hardcoding specific usernames or sprint IDs.",
      },
      {
        heading: "No-Code Jira Automation Rules",
        content: "Jira features a built-in low-code automation engine based on an intuitive event-driven model:\n\n1. **Trigger:** The event that starts the rule (e.g., *'Issue Created'*, *'Issue Transitioned'*, *'Version Released'*).\n2. **Condition:** Filter criteria that must be satisfied (e.g., *'Issue Type equals Bug'*, *'JQL condition: priority = Highest'*).\n3. **Branch Rule (Optional):** Applies actions to related issues (e.g., *'For all sub-tasks'* or *'For linked issues'*).\n4. **Action:** The operation executed automatically (e.g., *'Assign issue to component lead'*, *'Send Slack message'*, *'Create Sub-task'*, *'Transition parent issue'*).\n\n### Smart Values\nAutomation rules support **Smart Values** to dynamically inject context: `{{issue.key}}`, `{{issue.summary}}`, `{{issue.reporter.displayName}}`, `{{now.format(\"yyyy-MM-dd\")}}`.",
        commonMistakes: [
          {
            mistake: "Creating an automation rule that triggers an infinite loop (e.g., a rule that updates an issue when updated).",
            fix: "Check the 'Check to allow other rule actions to trigger this rule' setting carefully, and add strict conditions to terminate recursion.",
          },
        ],
        exercise: {
          task: "Write a JQL query that finds all issues in project 'TECH' that have been updated in the last 24 hours but have zero comments. Save it as a filter named 'Unreviewed Recent Work'.",
          hint: "Syntax: project = \"TECH\" AND updated >= -24h AND numberOfComments = 0.",
        },
      },
    ],
  },
  {
    id: 8,
    slug: "dashboards-reports-governance",
    title: "Dashboards, Governance & Enterprise Best Practices",
    description: "Construct executive dashboards, configure permission and issue security schemes, and apply governance principles at enterprise scale.",
    sections: [
      {
        heading: "Building Custom Jira Dashboards",
        content: "A **Dashboard** in Jira is a customizable executive command center that visualizes project health, sprint progress, and workload distribution using modular **Gadgets**.\n\nEssential Dashboard Gadgets include:\n• **Filter Results:** Displays a custom list of issues matching any saved JQL filter.\n• **Two-Dimensional Filter Statistics:** Generates a cross-tabulation matrix (e.g., Assignee vs Priority, or Component vs Status).\n• **Created vs. Resolved Chart:** Plots new tickets logged against tickets closed over time to verify team backlog sustainability.\n• **Sprint Health Gadget:** Summarizes active sprint time remaining, work completed, and scope deviations in a single view.\n• **Pie Chart:** Simple percentage breakdown of issues by status, priority, or issue type.",
        objectives: [
          "Create and organize personalized and shared team dashboards.",
          "Select and configure key analytical gadgets for sprint and executive reviews.",
          "Understand Permission Schemes, Project Roles, and Groups.",
          "Implement Issue Security Schemes to protect confidential customer data.",
        ],
        note: "Dashboards can be shared with specific Project Roles, Groups, or the entire organization. Always check filter sharing permissions so team members can view the gadget data.",
      },
      {
        heading: "Permission Schemes & Security Governance",
        content: "In Company-managed projects, security is governed through modular schemes:\n\n1. **Project Roles vs. User Groups:**\n   • **Groups:** Global lists of users managed by directory administrators (e.g., 'jira-software-users', 'tech-contractors').\n   • **Project Roles:** Contextual seats mapped per project (e.g., 'Administrators', 'Developers', 'Viewers'). A user can be a 'Developer' in Project A but only a 'Viewer' in Project B.\n2. **Permission Schemes:** Define who has rights to perform over 30 distinct actions (Create Issues, Edit Issues, Assign Issues, Delete Issues, Transition Issues, Manage Sprints). Best practice is to grant permissions to **Project Roles**, never directly to individual named users.\n3. **Issue Security Schemes:** Allow project admins to restrict individual sensitive issues (e.g., critical security vulnerabilities or confidential customer bugs) to only designated security levels within the same project.",
        commonMistakes: [
          {
            mistake: "Granting permissions in a Permission Scheme directly to individual user accounts.",
            fix: "Always assign permissions to Project Roles. When a team member joins or leaves, simply adjust their Project Role in Project Settings without altering the shared scheme.",
          },
        ],
      },
      {
        heading: "Enterprise Scaling & Governance Best Practices",
        content: "To maintain high performance and avoid 'Jira bloat' across large organizations, adhere to these golden governance rules:\n\n• **Standardize Custom Fields:** Resist the urge to create a unique custom field for every minor request. Reuse existing global fields with clear descriptions.\n• **Keep Workflows Clean:** Workflows with more than 8 statuses often introduce drag and delayed delivery. Keep transitions clear and purposeful.\n• **Archive Inactive Projects:** Periodically archive deprecated or completed projects to maintain rapid search indexing and clean navigation menus.\n• **Audit Automation Execution Limits:** Monitor monthly automation usage quotas to ensure background tasks run smoothly.",
        takeaways: [
          "Dashboards transform raw JQL filters into high-impact operational visibility.",
          "Permission Schemes mapped to Project Roles enable scalable governance without administrative burden.",
          "Issue Security Schemes keep sensitive vulnerabilities confidential within shared projects.",
        ],
        exercise: {
          task: "Create a new Dashboard titled 'Team Delivery Hub'. Add a 'Sprint Health Gadget' and a 'Two-Dimensional Filter Statistics' gadget configured to display Assignee on the X-axis and Priority on the Y-axis.",
          hint: "Navigate to Dashboards > Create Dashboard, configure layout to 2 columns, and click 'Add gadget'.",
        },
      },
    ],
  },
];
