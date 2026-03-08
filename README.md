```bash
$ echo "HELIOZ"
 _____ _ _ _                      
|  _  | | | |                     
| | | | | | | ___  ___ ___  _ __  
| | | | | | |/ _ \/ __/ _ \| '_ \ 
\ \_/ / | | |  __/ (_| (_) | | | |
 \___/|_|_|_|\___|\___\___/|_| |_|

$ echo "Helioz Dashboard — private AI agent control plane for BSC"
Helioz Dashboard — private AI agent control plane for BSC
```

```bash
$ cat /dev/null <<'EOF'
System overview
- This repo is the control plane and web console for Helioz (dashboard + API).
- Users define agents in the dashboard and deploy them to their own infrastructure (VPS / Docker / local).
- Runtime execution happens on the user's infrastructure; Helioz only coordinates and stores config.
- User prompts, API keys, agent data never touch the Helioz server during execution (zero-knowledge).
- Helioz CLI (npm package `helioz` v1.3.1) provides a matching terminal UX.
- Live at https://helioz.one
EOF
```

```bash
$ echo "Tech stack"
Tech stack
- Frontend: React 18, Vite, TypeScript, Tailwind CSS, shadcn/ui, Wouter, TanStack React Query v5
- Backend: Express.js, TypeScript, express-session
- Database: PostgreSQL, Drizzle ORM, @neondatabase/serverless
- Auth: Privy SDK (email OTP login)
- Visual: CRT terminal aesthetic (orange/amber on near-black, scanline overlay)
```

```bash
$ tree -A -L 3
helioz-dashboard/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── drizzle.config.ts
├── index.html
├── .env.example
├── client/
│   └── src/
│       ├── App.tsx
│       ├── index.css
│       ├── main.tsx
│       ├── pages/
│       │   ├── landing.tsx
│       │   ├── login.tsx
│       │   ├── install.tsx
│       │   ├── docs.tsx
│       │   ├── dashboard.tsx
│       │   ├── agents.tsx
│       │   ├── agent-detail.tsx
│       │   ├── skills.tsx
│       │   ├── privacy.tsx
│       │   ├── deployments.tsx
│       │   ├── playground.tsx
│       │   └── not-found.tsx
│       ├── components/
│       │   ├── ui/
│       │   ├── app-sidebar.tsx
│       │   └── dashboard-layout.tsx
│       ├── hooks/
│       │   └── use-toast.ts
│       └── lib/
│           ├── auth.tsx
│           ├── theme.tsx
│           └── queryClient.ts
├── server/
│   ├── index.ts
│   ├── routes.ts
│   ├── storage.ts
│   └── vite.ts
├── shared/
│   └── schema.ts
└── public/
    └── fonts/
        └── GeistPixelSquare.woff2
```

```bash
$ cat <<'EOF'
API routes (HTTP method + path)
Public
- GET  /api/public/live-agents        (community agent network, live run counts)
- GET  /api/v1/dashboard             (dashboard summary, requires X-Helioz-Key)
- GET  /install.sh                   (shell installer script)
- GET  /cli/helioz.js                (CLI source)
- GET  /cli/package.json             (CLI package manifest)

Auth
- POST /api/auth/privy               (Privy token verification + session create)
- POST /api/auth/logout              (session logout)

Agents
- GET  /api/agents                   (list user agents)
- GET  /api/agents/:id               (agent detail)
- POST /api/agents                  (create agent)
- PATCH /api/agents/:id             (update agent)
- POST /api/agents/:id/deploy       (deploy agent: inactive→deploying→active)

Runtime
- GET  /api/skills                   (available skills list)
- GET  /api/deployments              (deployment history)
- GET  /api/privacy                  (privacy settings)
- PUT  /api/privacy                  (update privacy settings)
- GET  /api/api-key                  (get API key, hlz_live_ prefix)
- POST /api/api-key/regenerate       (regenerate API key)
- POST /api/playground              (playground chat endpoint)
EOF
```

```bash
$ cat .env.example
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
SESSION_SECRET="64+ character secret"
VITE_PRIVY_APP_ID="privy_app_id"
PRIVY_APP_SECRET="privy_app_secret"
HELIOZ_PUBLIC_URL="https://helioz.one"
NODE_ENV="development"
```

```bash
$ echo "Setup / installation"
Setup / installation
1) git clone https://github.com/heliozdevone/helioz-dashboard.git
2) cd helioz-dashboard
3) npm install
4) cp .env.example .env
   # fill in DATABASE_URL, SESSION_SECRET, VITE_PRIVY_APP_ID, PRIVY_APP_SECRET
5) npm run db:push
6) npm run dev
   # or for production:
   npm run build && npm start
```

```bash
$ cat <<'EOF'
Key features
- Agent Builder (3-step spawn)
  1) Identity: name, model, prompt
  2) Runtime: skills, temperature, max tokens
  3) Review: confirm config and create agent

- 30+ AI models across 8 providers
  OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, Cohere, xAI

- 15+ modular skills
  Chain Reader, Web Search, Code Interpreter, API Connector,
  Docs Reader, Scheduler, ... (toggle on/off per agent)

- Privacy Engine
  Real-time privacy score (0–100), prompt redaction, local execution toggle,
  model allowlist, zero-knowledge logging (agent data never stored)

- Deployment system
  One-click deploy, lifecycle management, multiple targets (VPS/Docker/local/cloud)

- Live community network
  12+ public BSC agents with real-time run counters

- CLI integration
  `helioz dashboard` renders full terminal dashboard using API data

- Playground
  Sandboxed agent testing with chat UI, config preview, metadata (model/latency/tools)

- Full REST API
  Authenticated via X-Helioz-Key for programmatic access
EOF
```

```bash
$ cat <<'EOF'
Agent lifecycle
- inactive
  Agent exists in the registry but is not deployed.
- deploying
  Deployment request in progress, runtime is provisioning.
- active
  Agent is running and accepts requests (dashboard shows live status).
- stopped
  Deployment terminated, runtime can be resumed or redeployed.
EOF
```

```bash
$ cat <<'EOF'
Privacy architecture
- Control plane stores config, not secrets.
- User prompts, API keys, and agent data are kept off Helioz servers during execution.
- Execution happens on user infrastructure; Helioz only coordinates.
- Privacy engine computes a live score based on:
  - prompt content redaction
  - model allowlist (per provider)
  - local execution toggle
  - zero-knowledge telemetry (no payload inspection)
EOF
```

```bash
$ cat <<'EOF'
Links
- https://helioz.one
- https://www.npmjs.com/package/helioz (CLI v1.3.1)
- https://helioz.one/install
- https://helioz.one/docs
EOF
```

```bash
$ cat <<'EOF'
License
MIT License
Copyright (c) 2026 Helioz
EOF
```
