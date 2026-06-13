# 🔍 FactLens AI — Educational Fact-Verification & Media Literacy Platform

> A premium, recruiter-grade media literacy and fact-checking workspace built specifically for students, educators, and academic researchers.  
> Evaluate digital articles, PDFs, uploaded essays, and links to evaluate content credibility, extract target claims, analyze bias categories, and cross-reference assertions against whitelisted consensus databases.

**Live Deployment URL:** [https://ai-powered-fake-news-detector-for-s.vercel.app/](https://ai-powered-fake-news-detector-for-s.vercel.app/)

---

## 🎨 Latest UI/UX, Adaptive Navigation, & Authentication Upgrades

We have upgraded the platform to enterprise-grade SaaS standards, resolving visual polish, navigation layout quality, role-based authentication, and mobile responsiveness:

* **Dual-Role Authentication Gateway** (`/login`): A styled selection portal separating the **Student Portal** (🎓 Analyze & Learn) and the **Admin Portal** (🛡 Manage Platform). Includes path guarding in `middleware.ts` for role-locked paths (`/dashboard` for students, `/admin` for admins).
* **Zustand & Cookie Session Synchronization**: Client session store automatically syncs active user credentials to `factlens_user_session` edge-readable cookies, resolving unauthorized redirect loops.
* **Perplexity-Style Evidence Explorer**: An interactive source tracking table displaying name, publication date, reliability percentage indicator, and semantic match strength.
* **Research Citation Exporter**: Academic exporter tab containing a synthesized report abstract alongside copyable citations formatted in APA, MLA, Chicago, and BibTeX styles.
* **Mobile Screen Auto-Adaptability**:
  - *Responsive Sidebar Drawer*: Responsive sidebar collapses into a slide-over mobile drawer with translucent backdrops, close tags, and auto-dismissals on route change.
  - *Mobile Header optimization*: Hides top Compare shortcuts and role toggle badges on small mobile widths to fit the "FactLens AI" logo on a single line.
  - *Grid Layout adjustments*: Repositioned fixed overlays (e.g. notifications alert card) to stretch responsive parameters on mobile screens without horizontal scroll overflows.

---

## ✨ Workspace & Fact-Checking Features

| Feature | Description |
|---|---|
| 🤖 **Global AI Copilot** | Floating assistant bubble in the layout shell, letting students query whitelists, spot bias, and get citation format rules from anywhere. |
| 🛡️ **Interactive Speedometer** | Speedometer-style SVG gauge replacing raw percentages to deliver clear, intuitive visual trust, risk, and confidence ratings. |
| 📄 **Explainable AI Panel** | Detailed RAG consensus breakdown explaining exactly *why* a credibility rating was assigned, detailing corroborated reference checks and factual contradictions. |
| 🗺️ **Knowledge Graph Explorer** | Beautiful SVG-based interactive dependency network canvas visualizing relationships between Articles, Claims, Entities, and Sources. |
| 🆚 **Split Screen Compare** | Run side-by-side diagnostics on multiple text drafts to inspect comparative credibility indexes and content overlaps. |
| ⏳ **Multi-Agent Console** | Loading interface and terminal console detailing execution steps of the `ClaimAgent`, `EvidenceAgent`, `BiasAgent`, and `ConsensusAgent`. |
| 📚 **Student Study Mode** | Interactive revision helper featuring flip-flashcards, multiple-choice quizzes, and bulleted study notes. |
| 📊 **AI Cost Telemetry** | Displays token spending indexes, Gemini budgets, and active rate quotas in the Admin Analytics panels. |
| 🛡️ **WAF BotID Guard** | Developer API references detailing `/api/analyze` and `/api/verify` along with Vercel BotID rate-limiting guidelines. |

---

## 🗂️ Project Structure

```
AI-Powered-Fake-News-Detector/
│
├── app/
│   ├── (marketing)/        # Landing page, pricing, features, privacy, contact
│   ├── admin/              # Admin tools (users, sources, telemetry, feature-flags)
│   ├── analysis/           # Input evaluation portals (text, upload, url, compare, detail [id])
│   ├── auth/               # Split authentication routes (student, admin login gates)
│   ├── dashboard/          # Student workspace pages (history logs, bookmarks, api settings)
│   ├── login/              # Portal selection gateway page
│   ├── globals.css         # Tailwind v4 globals stylesheet
│   └── layout.tsx          # Root workspace layout shell
│
├── components/
│   ├── analysis/           # Analysis modules (Speedometer, Evidence Explorer, Research Mode, Study deck)
│   ├── dashboard/          # Dashboard components (Analytics charts, Cost telemetry, API playground)
│   ├── graph/              # Draggable SVG Knowledge network elements
│   ├── shared/             # Shell shared layouts (Sidebar drawer, responsive Navbar, AI Copilot bubble)
│   └── ui/                 # Reusable primitive visual components
│
├── store/
│   ├── analysis.store.ts   # Zustand evaluation record history store
│   ├── auth.store.ts       # Zustand auth credentials store synced to cookies
│   └── ui.store.ts         # Zustand UI state store managing responsive sidebars
│
├── middleware.ts           # Next.js Edge route guard protecting roles
├── next.config.ts          # Compilation configurations skipping lint errors
└── tsconfig.json           # Strict TypeScript configuration
```

---

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/DurgaPavan0923/AI-Powered-Fake-News-Detector.git
cd AI-Powered-Fake-News-Detector
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

### 4. Build and Verify Production Bundle

```bash
npm run build
```

---

## ⚙️ Configuration & simulated databases fallback

FactLens AI includes an **API connectivity toggle mechanism**. If external API credentials are not provided, the platform automatically falls back to **simulated local databases** (persisted in client-side storage), meaning the application is fully interactive out-of-the-box.

To connect production cloud environments, navigate to **System Settings** in the dashboard and configure:
* **Gemini API Key**: For real-time analysis generation.
* **Neo4j URI**: For cloud Graph database syncing.
* **Pinecone Key**: For live vector embeddings storage.

---

## 🔌 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/analyze` | Evaluate digital documents or article text blocks and return credibility scores, claims, and bias matrices. |
| `POST` | `/api/verify` | Cross-examine a single fact assertion statement against whitelisted consensus databases, returning contradictions. |

---

## 🛠️ Tech Stack

* **Core** — Next.js 15 (App Router), React 19, TypeScript, Zustand.
* **Styling & Animations** — Tailwind CSS v4, Framer Motion, Lucide React.
* **AI NLP** — Google Gemini API (`@google/generative-ai`).
* **Visual Data** — Recharts, jsPDF.

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
