# FactLens AI 🔍 — Educational Fact-Verification Platform

**FactLens AI** is an AI-powered media literacy and fact-checking workspace built specifically for students, educators, and academic researchers. It analyzes digital articles, PDFs, uploaded essays, and links to evaluate content credibility, extract target claims, analyze bias categories, and cross-reference assertions against whitelisted consensus databases.

---

## 🌟 Key Features

1. **Multi-Channel Input Evaluation**: Analyze plain text blocks, web URLs (scraping DOM content), or upload academic documents (PDFs, DOCX, TXT).
2. **Reviewer Demo Mode Sandbox**: Tap preloaded sandboxes to instantly verify space, climate, or suspicious health claims without typing, allowing recruiters and judges to test features instantly.
3. **Interactive Explainable AI**: Access confidence levels, consensus indexes, and whitelisted supportive checks. Replaces basic circular scores with a Speedometer-style SVG gauge.
4. **Ask FactLens AI Chatbot**: Sidebar chatbot next to report indexes where students can query summaries, contradictory findings, or request explanations.
5. **Global AI Copilot Bubble**: A floating bot widget present in the bottom-right corner of all workspace pages, providing instant guidance on spot-checking bias and Whitelist guidelines.
6. **Multi-Agent Execution Terminal**: Access terminal logs detailing execution steps of the Claim Agent, Evidence Agent, Bias Agent, and Consensus Agent.
7. **Article Comparison Tool**: Run side-by-side diagnostics on multiple text drafts to inspect comparative credibility indexes and overlaps.
8. **Student Study Mode Deck**: Interactive revision helper featuring flip-flashcards, multiple-choice quizzes, and bulleted study notes.
9. **Interactive Knowledge Graphing**: Visualizes nodes (Articles, Claims, Entities, Sources) and their dynamic linkages using a draggable SVG-based network canvas.
10. **Developer API Playground**: Playground documentation page at `/dashboard/settings/api` providing curl endpoints (`POST /api/analyze`) and mock JSON schemas.
11. **Admin Cost Telemetry**: Displays token spending indexes, Gemini budgets, and rate quotas.

---

## 🛠️ Technology Stack

* **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS (v4), Framer Motion, Recharts, Zustand, Lucide React
* **AI & NLP**: Gemini 2.5 Pro (`@google/generative-ai`)
* **Vector DB**: Pinecone (Fallback to local simulated embeddings index)
* **Graph DB**: Neo4j AuraDB (Fallback to local localStorage-persisted node-link stores)
* **Exporting**: jsPDF

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js v24.x** and **npm v11.x** (or newer) installed.

### 2. Installation
Install the project dependencies in the project root directory:
```bash
npm install
```

### 3. Running Locally
Launch the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to inspect the application.

---

## 🔒 Configuration & API Keys

FactLens AI is built with an **API Connectivity Toggle Engine**. If external cloud credentials are not supplied, the platform falls back to a **high-fidelity local simulation mode**, meaning it remains fully navigable and interactive out-of-the-box.

To connect live cloud databases, navigate to **System Settings** in the dashboard and provide:
* **Gemini API Key**: For real-time text analysis prompting.
* **Neo4j URI**: For cloud Graph database syncing.
* **Pinecone Key**: For live vector embeddings storage.
