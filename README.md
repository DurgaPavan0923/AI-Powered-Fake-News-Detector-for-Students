# FactLens AI 🔍 — Educational Fact-Verification Platform

**FactLens AI** is an AI-powered media literacy and fact-checking workspace built specifically for students, educators, and academic researchers. It analyzes digital articles, PDFs, uploaded essays, and links to evaluate content credibility, extract target claims, analyze bias categories, and cross-reference assertions against whitelisted consensus databases.

---

## 🌟 Key Features

1. **Multi-Channel Input Evaluation**: Analyze plain text blocks, web URLs (scraping DOM content), or upload academic documents (PDFs, DOCX, TXT).
2. **AI-Powered Fact Checker**: Leverages Gemini 2.5 Pro to calculate a Credibility Index (0–100), Fake News Probability meter, and consensus labels.
3. **Consensus Claims Isolation**: Automatically extracts core claims, targets entities, identifies category types, and provides explanatory critiques.
4. **Interactive Knowledge Graphing**: Visualizes nodes (Articles, Claims, Entities, Sources) and their dynamic linkages using a draggable SVG-based network canvas.
5. **Bias Spectrum Diagnostics**: Evaluates content metrics for political slants, loaded emotional words, clickbait headlines, and narrative propaganda.
6. **Student Explanatory Synthesis**: Translates complex analysis profiles into easy-to-read, educational summaries explaining the exact reasoning behind scores.
7. **Export Portfolios**: Download CSV spreadsheets summarizing history or generate professional PDF reports with formatted citation logs.
8. **Role-Based Workspaces**: Switch between a **Student View** (run analyses, bookmark reports) and an **Admin View** (supervise users, whitelist domains, toggle live APIs).

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

---

## 📖 Operational Architecture

* **Submission Gate**: Text, links, or uploads are routed to `services/ai/analysis.service.ts`.
* **Scanning pipeline**: Content is parsed and sent to the Gemini wrapper (`gemini.service.ts`) to calculate bias levels and claims.
* **Graph Builder**: Syncs extracted nodes to the local graph store. Drag-and-drop actions are captured in `components/graph/graph-view.tsx`.
* **Export Gate**: Generates a layout structure and triggers PDF compilation in `app/analysis/[analysisId]/page.tsx` using `jsPDF`.
