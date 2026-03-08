```
██╗  ██╗███████╗██╗     ██╗ ██████╗ ███████╗
██║  ██║██╔════╝██║     ██║██╔═══██╗╚══███╔╝
███████║█████╗  ██║     ██║██║   ██║  ███╔╝
██╔══██║██╔══╝  ██║     ██║██║   ██║ ███╔╝
██║  ██║███████╗███████╗██║╚██████╔╝███████╗
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚══════╝
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
helioz-dashboard — Control Plane & Web Console
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
$ cat /helioz/description
  Full-stack control plane for managing private AI agents on BSC.
  Dashboard web console + runtime API + agent management system.
  Built with React, Express, PostgreSQL, and Drizzle ORM.
  CRT terminal aesthetic — orange monochrome, zero border-radius, pixel font.
  Live at https://helioz.one
$ helioz --status
  SYSTEM          [ONLINE]
  NETWORK         BSC Mainnet
  AGENTS          12 live on public network
  MODELS          30+ across 8 providers
  CLI             v1.3.1 — npm install -g helioz
  PRIVACY         strict — your data never leaves your server
  ARCHITECTURE    control plane + self-hosted runtime
  LICENSE         MIT
$ cat /helioz/stack
  FRONTEND        React 18 + Vite + TypeScript
  STYLING         Tailwind CSS + shadcn/ui + CRT theme
  FONT            GeistPixelSquare (custom pixel font)
  ROUTING         Wouter
  STATE           TanStack React Query v5
  AUTH            Privy SDK (email OTP)
  BACKEND         Express.js + TypeScript
  DATABASE        PostgreSQL + Drizzle ORM + @neondatabase/serverless
  SESSION         express-session + connect-pg-simple
  RUNTIME         Node.js 20+
$ tree helioz-dashboard/
helioz-dashboard/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
├── index.html
├── .env.example
│
├── client/
│   └── src/
│       ├── App.tsx                    # Router + Privy provider setup
│       ├── index.css                  # CRT theme, scanlines, glow effects
│       ├── main.tsx                   # Entry point
│       │
│       ├── pages/
│       │   ├── landing.tsx            # Public landing — hero, agent ticker, features, CTA
│       │   ├── login.tsx              # Privy email OTP login
│       │   ├── install.tsx            # 6-step install tutorial
│       │   ├── docs.tsx               # Full documentation — CLI, API, SDK, deployment
│       │   ├── dashboard.tsx          # Overview — stats grid, agents, runs, deployments
│       │   ├── agents.tsx             # Agent registry + 3-step spawn flow
│       │   ├── agent-detail.tsx       # Agent config + deploy/stop controls
│       │   ├── skills.tsx             # 15+ skills by category with toggles
│       │   ├── privacy.tsx            # Privacy engine — score, model allowlist
│       │   ├── deployments.tsx        # Deploy history + target distribution
│       │   ├── playground.tsx         # Agent sandbox — chat, config, metadata
│       │   └── not-found.tsx          # 404
│       │
│       ├── components/
│       │   ├── ui/                    # shadcn components
│       │   ├── app-sidebar.tsx        # Terminal-style sidebar navigation
│       │   └── dashboard-layout.tsx   # Layout wrapper with scanlines + status bar
│       │
│       ├── hooks/
│       │   └── use-toast.ts
│       │
│       └── lib/
│           ├── auth.tsx               # Privy auth context + session sync
│           ├── theme.tsx              # Dark mode / CRT theme provider
│           └── queryClient.ts         # TanStack Query config + API helpers
│
├── server/
│   ├── index.ts                       # Express entry point
│   ├── routes.ts                      # All API routes + CLI file serving
│   ├── storage.ts                     # Storage interface + in-memory implementation
│   └── vite.ts                        # Vite dev server integration
│
├── shared/
│   └── schema.ts                      # Drizzle schema + Zod types
│
├── helioz-cli/
│   ├── bin/
│   │   └── helioz.js                  # CLI source — published to npm as 'helioz'
│   └── package.json                   # CLI package manifest
│
└── public/
    ├── favicon.jpg
    └── fonts/
        └── GeistPixelSquare.woff2     # Custom pixel font
$ cat /helioz/architecture
  ┌─────────────────────────────────────────────────────────────┐
  │                     CONTROL PLANE                           │
  │                   (this repository)                         │
  │                                                             │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
  │  │ Dashboard │  │ Agent    │  │ Privacy  │  │ Deploy    │  │
  │  │ Console   │  │ Builder  │  │ Engine   │  │ Manager   │  │
  │  └──────────┘  └──────────┘  └──────────┘  └───────────┘  │
  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌───────────┐  │
  │  │ Skill    │  │ Model    │  │ API Key  │  │ Playground│  │
  │  │ Registry │  │ Router   │  │ Manager  │  │ Sandbox   │  │
  │  └──────────┘  └──────────┘  └──────────┘  └───────────┘  │
  │                                                             │
  │  REST API ──── X-Helioz-Key auth ──── PostgreSQL            │
  └───────────────────────┬─────────────────────────────────────┘
                          │
                    config + monitoring
                          │
  ┌───────────────────────┴─────────────────────────────────────┐
  │                    YOUR INFRASTRUCTURE                      │
  │                                                             │
  │  ┌──────────────────────────────────────────────────────┐   │
  │  │  Agent Runtime                                       │   │
  │  │  ├── Executes prompts locally                        │   │
  │  │  ├── Calls AI models directly                        │   │
  │  │  ├── Runs skills (chain reader, web search, etc.)    │   │
  │  │  └── Your API keys, your data, your server           │   │
  │  └──────────────────────────────────────────────────────┘   │
  │                                                             │
  │  VPS  │  Docker  │  Local Machine  │  Helioz Cloud          │
  └─────────────────────────────────────────────────────────────┘
$ cat /helioz/api-routes
  PUBLIC
  ├── GET  /api/public/live-agents         Community agent network (12+ BSC agents)
  ├── GET  /api/v1/dashboard               Dashboard data (X-Helioz-Key auth)
  ├── GET  /install.sh                     Shell installer script
  ├── GET  /cli/helioz.js                  CLI source file
  └── GET  /cli/package.json               CLI package manifest
  AUTH
  ├── POST /api/auth/privy                 Privy token verification + session
  └── POST /api/auth/logout                Session logout
  AGENTS
  ├── GET  /api/agents                     List user agents
  ├── GET  /api/agents/:id                 Get agent detail
  ├── POST /api/agents                     Create agent
  ├── PATCH /api/agents/:id                Update agent config
  └── POST /api/agents/:id/deploy          Deploy agent
  RUNTIME
  ├── GET  /api/skills                     Available skills list
  ├── GET  /api/deployments                Deployment history
  ├── GET  /api/privacy                    Privacy settings
  ├── PUT  /api/privacy                    Update privacy settings
  ├── GET  /api/api-key                    Get user API key (hlz_live_ format)
  ├── POST /api/api-key/regenerate         Regenerate API key
  └── POST /api/playground                 Playground chat endpoint
$ cat /helioz/features
  AGENT MANAGEMENT
  ├── 3-step spawn flow — identity, runtime config, review
  ├── Multi-model support — 30+ models across 8 providers
  │   ├── OpenAI       gpt-4o, gpt-4-turbo, gpt-3.5-turbo
  │   ├── Anthropic    claude-3.5-sonnet, claude-3-sonnet, claude-3-haiku
  │   ├── Google       gemini-2.0-flash, gemini-1.5-pro
  │   ├── Meta         llama-3.3-70b, llama-3.1-8b
  │   ├── Mistral      mistral-large, mistral-medium, mixtral-8x7b
  │   ├── DeepSeek     deepseek-r1, deepseek-v3
  │   ├── Cohere       command-r-plus, command-r
  │   └── xAI          grok-2, grok-2-mini
  ├── Custom system prompts and temperature control
  └── Agent lifecycle: inactive → deploying → active → stopped
  SKILL SYSTEM
  ├── Chain Reader      Read on-chain data from BSC and EVM chains
  ├── Web Search        Search the internet for real-time information
  ├── Code Interpreter  Execute and analyze code snippets
  ├── API Connector     Connect to external REST APIs
  ├── Docs Reader       Parse and analyze documentation
  ├── Scheduler         Time-based task execution
  ├── Data Analyzer     Process and visualize datasets
  ├── Memory Store      Persistent agent memory across runs
  ├── Notification      Alert via webhook, email, or Telegram
  ├── File Manager      Read and write files in agent workspace
  ├── Image Analyzer    Process and analyze images
  ├── Wallet Connector  Interact with BSC wallets
  ├── DEX Aggregator    Query decentralized exchange data
  ├── Price Oracle      Real-time token price feeds
  └── Gas Optimizer     Optimize transaction gas on BSC
  PRIVACY ENGINE
  ├── Real-time privacy score (0–100)
  ├── Prompt redaction toggle
  ├── Local execution enforcement
  ├── Model allowlist by provider
  └── Zero-knowledge logging mode
  DEPLOYMENT
  ├── One-click deploy from dashboard
  ├── VPS, Docker, local, Helioz Cloud targets
  ├── systemd service generation via CLI
  └── Health monitoring and auto-restart
  MONITORING
  ├── Live agent status tracking
  ├── Run history with full audit trail
  ├── Token usage and cost metrics
  └── Real-time error reporting
  COMMUNITY NETWORK
  └── Public live-agents board with 12+ BSC-focused agents
      ├── DeFi Yield Scanner          ├── Token Launch Monitor
      ├── NFT Sniper Bot              ├── Portfolio Rebalancer
      ├── Governance Tracker          ├── Liquidation Guardian
      ├── Whale Alert Agent           ├── MEV Detector
      ├── Smart Contract Auditor      ├── Airdrop Hunter
      ├── Alpha Signal Bot            └── Bridge Monitor
$ cat /helioz/agent-lifecycle
  ┌──────────┐    deploy    ┌───────────┐   3s    ┌────────┐
  │ INACTIVE │ ──────────►  │ DEPLOYING │ ─────►  │ ACTIVE │
  └──────────┘              └───────────┘         └────────┘
       ▲                                               │
       │                    stop                       │
       └───────────────────────────────────────────────┘
  inactive     Agent created, not yet deployed
  deploying    Build in progress (3-second provisioning)
  active       Running, visible on public live-agents board
  stopped      Manually stopped, can be re-deployed
$ cat /helioz/privacy-architecture
  ZERO-KNOWLEDGE DESIGN
  The control plane (this repo) handles:
  ├── Agent configuration and metadata
  ├── Skill registry and model routing
  ├── Deployment orchestration
  ├── Monitoring and status tracking
  └── API key management
  The control plane NEVER touches:
  ├── Your prompts or system instructions
  ├── Your AI model API keys
  ├── Your agent execution data
  ├── Your wallet private keys
  └── Your runtime logs or outputs
  All agent execution happens on YOUR infrastructure.
  The control plane only sends config. The runtime only sends status.
  This is not a policy. This is the architecture.
$ cat /helioz/env.example
  DATABASE_URL=postgresql://user:pass@host:5432/helioz
  SESSION_SECRET=random-64-char-string
  VITE_PRIVY_APP_ID=your-privy-app-id
  PRIVY_APP_SECRET=your-privy-secret
  HELIOZ_PUBLIC_URL=https://helioz.one
  NODE_ENV=production
$ cat /helioz/setup
  # Clone
  git clone https://github.com/heliozdevone/helioz-dashboard.git
  cd helioz-dashboard
  # Install dependencies
  npm install
  # Configure environment
  cp .env.example .env
  # Edit .env with your database URL, Privy keys, session secret
  # Push database schema
  npm run db:push
  # Development (starts Express + Vite on port 5000)
  npm run dev
  # Production
  npm run build
  npm start
$ cat /helioz/cli-quickstart
  # Install CLI globally
  npm install -g helioz
  # Authenticate with your API key
  helioz auth set-key hlz_live_<your-key>
  # Initialize workspace
  mkdir ~/helioz-agents && cd ~/helioz-agents
  helioz init
  # Pull agent config from control plane
  helioz agent pull <agent-id>
  # Start agent runtime
  helioz agent start <agent-id>
  # View terminal dashboard
  helioz dashboard
  # Check agent status
  helioz agent status <agent-id>
  # Stop agent
  helioz agent stop <agent-id>
$ curl -s https://helioz.one/api/v1/dashboard \
    -H "X-Helioz-Key: hlz_live_your_key" | jq .
  {
    "status": "ok",
    "summary": {
      "totalAgents": 3,
      "activeAgents": 2,
      "totalRuns": 847,
      "skills": 8,
      "deployments": 5
    },
    "agents": [
      {
        "id": "agent-1",
        "name": "DeFi Scanner",
        "model": "gpt-4o",
        "status": "active",
        "runsCount": 312,
        "skills": ["Chain Reader", "API Connector"],
        "deployedAt": "2026-03-01T00:00:00.000Z"
      }
    ],
    "endpoint": "https://helioz.one",
    "version": "1.3.1",
    "timestamp": "2026-03-08T12:00:00.000Z"
  }
$ cat /helioz/design-system
  AESTHETIC        CRT terminal — retro monitor look
  PRIMARY COLOR    #f97316 (orange/amber)
  BACKGROUND       near-black (#0a0a0a)
  FONT             GeistPixelSquare (pixel monospace)
  BORDER RADIUS    0px (zero rounded corners everywhere)
  EFFECTS          CRT scanlines overlay, text glow, logo pulse
  INDICATORS       [ONLINE] [OFFLINE] [DEPLOY] bracket-style labels
  SWITCHES         [ON] / [OFF] toggle labels
$ cat /helioz/links
  Dashboard        https://helioz.one
  Install Guide    https://helioz.one/install
  Documentation    https://helioz.one/docs
  npm Package      https://www.npmjs.com/package/helioz
  GitHub           https://github.com/heliozdevone
  X / Twitter      https://x.com/Helioz_one
  CLI Install      npm install -g helioz
$ cat /helioz/license
  MIT License
  Copyright (c) 2026 Helioz
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files, to deal
  in the Software without restriction, including without limitation the
  rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, subject to the following conditions:
  The above copyright notice and this permission notice shall be included
  in all copies or substantial portions of the Software.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Built for builders. Owned by operators.
  Your agents. Your data. Your infrastructure.
  https://helioz.one  ·  npm install -g helioz  ·  @Helioz_one
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
