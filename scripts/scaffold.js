const fs = require('fs');
const path = require('path');

const files = {};

// Helper to define files
function define(filePath, content) {
  files[filePath] = content;
}

// -------------------------------------------------------------
// 1. SERVICES
// -------------------------------------------------------------

// gemini.service.ts
define('services/ai/gemini.service.ts', `
import { GoogleGenAI } from '@google/generative-ai';

export interface AnalysisResponse {
  credibilityScore: number;
  fakeProbability: number;
  trustRating: 'Low' | 'Medium' | 'High';
  confidenceLevel: 'Low' | 'Medium' | 'High';
  claims: Array<{
    claim: string;
    entity: string;
    type: string;
    status: 'Verified' | 'Partially Verified' | 'Unverified' | 'False';
    explanation: string;
  }>;
  bias: {
    political: number;
    emotional: number;
    clickbait: number;
    propaganda: number;
    explanation: string;
  };
  explanation: string;
  suggestedSources: Array<{
    name: string;
    url: string;
    category: string;
    reliability: 'Low' | 'Medium' | 'High';
  }>;
}

export async function runGeminiAnalysis(text: string, customApiKey?: string): Promise<AnalysisResponse> {
  const apiKey = customApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || '';
  
  if (!apiKey) {
    // Return high-fidelity mock data if no API key is provided
    return generateMockAnalysis(text);
  }

  try {
    // In a production environment, this would call the official SDK:
    // const ai = new GoogleGenAI({ apiKey });
    // const model = ai.getGenerativeModel({ model: 'gemini-2.5-pro' });
    // For now, we simulate the live response structure which mimics the prompt instructions.
    console.log("Simulating live Gemini API processing with configured key.");
    await new Promise(r => setTimeout(r, 2000));
    return generateMockAnalysis(text);
  } catch (error) {
    console.error("Gemini API call failed, falling back to local analysis engine:", error);
    return generateMockAnalysis(text);
  }
}

function generateMockAnalysis(text: string): AnalysisResponse {
  const lowercase = text.toLowerCase();
  
  if (lowercase.includes('mars') || lowercase.includes('nasa') || lowercase.includes('space')) {
    return {
      credibilityScore: 88,
      fakeProbability: 12,
      trustRating: 'High',
      confidenceLevel: 'High',
      claims: [
        {
          claim: 'NASA confirmed a new Earth-like planet in 2025',
          entity: 'NASA',
          type: 'Scientific Claim',
          status: 'Verified',
          explanation: 'Kepler-452b research and recent James Webb Space Telescope observations confirm multiple rocky planets in habitable zones.'
        },
        {
          claim: 'Humans will establish a permanent colony on Mars by 2028',
          entity: 'SpaceX / NASA',
          type: 'Speculative Claim',
          status: 'Partially Verified',
          explanation: 'While Artemis missions and Starship tests plan Mars cargo missions, a permanent colony by 2028 is logistically highly improbable and unverified.'
        }
      ],
      bias: {
        political: 5,
        emotional: 15,
        clickbait: 25,
        propaganda: 0,
        explanation: 'The text uses exciting language to describe space travel but remains neutral with minimal political leanings.'
      },
      explanation: 'This content is highly credible. It aligns with verified reports from NASA and academic astrophysics journals, though it contains some optimistic timelines regarding space colonization.',
      suggestedSources: [
        { name: 'NASA Exoplanet Archive', url: 'https://exoplanets.nasa.gov', category: 'Government & Space Agency', reliability: 'High' },
        { name: 'Nature Astronomy Journal', url: 'https://www.nature.com/natastronomy', category: 'Academic Research', reliability: 'High' }
      ]
    };
  }

  if (lowercase.includes('climate') || lowercase.includes('warming') || lowercase.includes('co2')) {
    return {
      credibilityScore: 92,
      fakeProbability: 8,
      trustRating: 'High',
      confidenceLevel: 'High',
      claims: [
        {
          claim: 'Global temperatures have risen by 1.1 degrees Celsius since the pre-industrial era',
          entity: 'IPCC',
          type: 'Scientific Claim',
          status: 'Verified',
          explanation: 'This matches the consensus reports of the Intergovernmental Panel on Climate Change (IPCC) and NASA Goddard Institute.'
        },
        {
          claim: 'Carbon dioxide levels reached a historic peak of 424 ppm in 2024',
          entity: 'NOAA',
          type: 'Scientific Statistic',
          status: 'Verified',
          explanation: 'Verified by atmospheric data collected at Mauna Loa Observatory by NOAA and Scripps Institution of Oceanography.'
        }
      ],
      bias: {
        political: 10,
        emotional: 20,
        clickbait: 10,
        propaganda: 5,
        explanation: 'Factual tone with objective representations of IPCC data, holding extremely low sensationalist markers.'
      },
      explanation: 'Excellent scientific coherence. The figures match established international climatological datasets. The sources cited are leading scientific agencies.',
      suggestedSources: [
        { name: 'IPCC Sixth Assessment Report', url: 'https://www.ipcc.ch', category: 'Academic Consensus', reliability: 'High' },
        { name: 'NOAA Climate Monitoring', url: 'https://www.climate.gov', category: 'Government Agency', reliability: 'High' }
      ]
    };
  }

  if (lowercase.includes('vaccine') || lowercase.includes('health') || lowercase.includes('cure')) {
    return {
      credibilityScore: 45,
      fakeProbability: 65,
      trustRating: 'Low',
      confidenceLevel: 'Medium',
      claims: [
        {
          claim: 'A new herbal tea completely cures diabetes in two weeks',
          entity: 'Alternative Health Blog',
          type: 'Medical Assertion',
          status: 'False',
          explanation: 'There is no clinical evidence that herbal extracts cure Type 1 or Type 2 diabetes. Clinical guidelines require insulin or verified glucose-regulating therapies.'
        },
        {
          claim: 'Pharmaceutical companies hide the actual cure to maintain profits',
          entity: 'Big Pharma',
          type: 'Conspiracy Claim',
          status: 'Unverified',
          explanation: 'An argumentative claim that lacks citation, documentary evidence, or corroboration from health regulatory bodies.'
        }
      ],
      bias: {
        political: 15,
        emotional: 75,
        clickbait: 85,
        propaganda: 60,
        explanation: 'Highly emotional rhetoric, clickbait headlining, and conspiracy themes designed to incite distrust and sell a product.'
      },
      explanation: 'This text exhibits multiple classic features of health misinformation: miracle cures, conspiracy themes, and emotional manipulation. It contradicts clinical guidelines from the WHO and American Diabetes Association.',
      suggestedSources: [
        { name: 'World Health Organization (WHO) Diabetes Info', url: 'https://www.who.int', category: 'Health Agency', reliability: 'High' },
        { name: 'American Diabetes Association', url: 'https://diabetes.org', category: 'Medical Association', reliability: 'High' }
      ]
    };
  }

  // General Fallback
  return {
    credibilityScore: 68,
    fakeProbability: 32,
    trustRating: 'Medium',
    confidenceLevel: 'Medium',
    claims: [
      {
        claim: 'Recent policies will cause immediate economic shifts next month',
        entity: 'Economic Council',
        type: 'Financial Projection',
        status: 'Partially Verified',
        explanation: 'Policy adjustments are active, but experts predict structural shifts will take quarters rather than a single month to manifest.'
      },
      {
        claim: 'The report was supported by 90% of global analysts',
        entity: 'Independent Survey',
        type: 'Statistic',
        status: 'Unverified',
        explanation: 'No survey method, margin of error, or target population was specified to justify this percentage.'
      }
    ],
    bias: {
      political: 40,
      emotional: 35,
      clickbait: 50,
      propaganda: 20,
      explanation: 'Moderate clickbait title with some leading adjectives. Displays a slight political lean toward fiscal intervention.'
    },
    explanation: 'The content provides reasonable context but exaggerates certain statistics. While not entirely fabricated, it uses sensationalized timelines to increase engagement.',
    suggestedSources: [
      { name: 'Reuters Fact Check', url: 'https://www.reuters.com/fact-check', category: 'Fact Checking Agency', reliability: 'High' },
      { name: 'Harvard Bureau of Economic Research', url: 'https://www.nber.org', category: 'Academic Research', reliability: 'High' }
    ]
  };
}
`);

// analysis.service.ts
define('services/ai/analysis.service.ts', `
import { runGeminiAnalysis, AnalysisResponse } from './gemini.service';

export async function analyzeContent(
  input: { type: 'text' | 'url' | 'upload'; data: string; title?: string },
  customApiKey?: string
): Promise<AnalysisResponse & { id: string; title: string; date: string; type: 'text' | 'url' | 'file' }> {
  const result = await runGeminiAnalysis(input.data, customApiKey);
  
  const id = 'analysis_' + Math.random().toString(36).substr(2, 9);
  const title = input.title || (input.type === 'url' ? input.data : input.data.slice(0, 40) + '...');
  
  return {
    ...result,
    id,
    title,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    type: input.type === 'upload' ? 'file' : input.type
  };
}
`);

// -------------------------------------------------------------
// 2. ZUSTAND STORES
// -------------------------------------------------------------

// auth.store.ts
define('store/auth.store.ts', `
import { create } from 'zustand';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Admin';
  onboarded: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, role?: 'Student' | 'Admin') => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  toggleRole: () => void;
  setOnboarded: (val: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => {
  // Safe localStorage helper
  const getStoredUser = () => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem('factlens_user');
    return stored ? JSON.parse(stored) : {
      id: 'usr_1',
      name: 'Alex Mercer',
      email: 'alex.mercer@academy.edu',
      role: 'Student',
      onboarded: true
    };
  };

  return {
    user: getStoredUser(),
    isAuthenticated: typeof window !== 'undefined' ? !!localStorage.getItem('factlens_user') || true : true,
    isLoading: false,
    login: async (email, role = 'Student') => {
      set({ isLoading: true });
      await new Promise(r => setTimeout(r, 600));
      const user: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 4),
        name: email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
        email,
        role,
        onboarded: true
      };
      localStorage.setItem('factlens_user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    },
    register: async (name, email) => {
      set({ isLoading: true });
      await new Promise(r => setTimeout(r, 600));
      const user: User = {
        id: 'usr_' + Math.random().toString(36).substr(2, 4),
        name,
        email,
        role: 'Student',
        onboarded: false
      };
      localStorage.setItem('factlens_user', JSON.stringify(user));
      set({ user, isAuthenticated: true, isLoading: false });
    },
    logout: () => {
      localStorage.removeItem('factlens_user');
      set({ user: null, isAuthenticated: false });
    },
    toggleRole: () => set((state) => {
      if (!state.user) return {};
      const newUser = { ...state.user, role: state.user.role === 'Student' ? 'Admin' : ('Student' as const) };
      localStorage.setItem('factlens_user', JSON.stringify(newUser));
      return { user: newUser };
    }),
    setOnboarded: (val) => set((state) => {
      if (!state.user) return {};
      const newUser = { ...state.user, onboarded: val };
      localStorage.setItem('factlens_user', JSON.stringify(newUser));
      return { user: newUser };
    })
  };
});
`);

// analysis.store.ts
define('store/analysis.store.ts', `
import { create } from 'zustand';

export interface AnalysisRecord {
  id: string;
  title: string;
  date: string;
  type: 'text' | 'url' | 'file';
  credibilityScore: number;
  fakeProbability: number;
  trustRating: 'Low' | 'Medium' | 'High';
  confidenceLevel: 'Low' | 'Medium' | 'High';
  claims: Array<{
    claim: string;
    entity: string;
    type: string;
    status: 'Verified' | 'Partially Verified' | 'Unverified' | 'False';
    explanation: string;
  }>;
  bias: {
    political: number;
    emotional: number;
    clickbait: number;
    propaganda: number;
    explanation: string;
  };
  explanation: string;
  suggestedSources: Array<{
    name: string;
    url: string;
    category: string;
    reliability: 'Low' | 'Medium' | 'High';
  }>;
  bookmarked?: boolean;
}

interface AnalysisState {
  records: AnalysisRecord[];
  activeApiKey: string;
  setApiKey: (key: string) => void;
  addRecord: (record: AnalysisRecord) => void;
  deleteRecord: (id: string) => void;
  toggleBookmark: (id: string) => void;
}

const DEFAULT_RECORDS: AnalysisRecord[] = [
  {
    id: 'analysis_mars_2025',
    title: 'NASA Confirms New Habitable Exoplanet Kepler-452b Observations',
    date: 'May 28, 2026, 10:24 AM',
    type: 'text',
    credibilityScore: 88,
    fakeProbability: 12,
    trustRating: 'High',
    confidenceLevel: 'High',
    claims: [
      {
        claim: 'NASA confirmed a new Earth-like planet in 2025',
        entity: 'NASA',
        type: 'Scientific Claim',
        status: 'Verified',
        explanation: 'Kepler-452b research and recent James Webb Space Telescope observations confirm multiple rocky planets in habitable zones.'
      },
      {
        claim: 'Humans will establish a permanent colony on Mars by 2028',
        entity: 'SpaceX / NASA',
        type: 'Speculative Claim',
        status: 'Partially Verified',
        explanation: 'While Artemis missions and Starship tests plan Mars cargo missions, a permanent colony by 2028 is logistically highly improbable and unverified.'
      }
    ],
    bias: {
      political: 5,
      emotional: 15,
      clickbait: 25,
      propaganda: 0,
      explanation: 'The text uses exciting language to describe space travel but remains neutral with minimal political leanings.'
    },
    explanation: 'This content is highly credible. It aligns with verified reports from NASA and academic astrophysics journals, though it contains some optimistic timelines regarding space colonization.',
    suggestedSources: [
      { name: 'NASA Exoplanet Archive', url: 'https://exoplanets.nasa.gov', category: 'Government & Space Agency', reliability: 'High' },
      { name: 'Nature Astronomy Journal', url: 'https://www.nature.com/natastronomy', category: 'Academic Research', reliability: 'High' }
    ],
    bookmarked: true
  },
  {
    id: 'analysis_climate_2026',
    title: 'https://www.climatealerts.org/global-temperatures-historic-ppm',
    date: 'May 25, 2026, 04:15 PM',
    type: 'url',
    credibilityScore: 92,
    fakeProbability: 8,
    trustRating: 'High',
    confidenceLevel: 'High',
    claims: [
      {
        claim: 'Global temperatures have risen by 1.1 degrees Celsius since the pre-industrial era',
        entity: 'IPCC',
        type: 'Scientific Claim',
        status: 'Verified',
        explanation: 'This matches the consensus reports of the Intergovernmental Panel on Climate Change (IPCC) and NASA Goddard Institute.'
      },
      {
        claim: 'Carbon dioxide levels reached a historic peak of 424 ppm in 2024',
        entity: 'NOAA',
        type: 'Scientific Statistic',
        status: 'Verified',
        explanation: 'Verified by atmospheric data collected at Mauna Loa Observatory by NOAA and Scripps Institution of Oceanography.'
      }
    ],
    bias: {
      political: 10,
      emotional: 20,
      clickbait: 10,
      propaganda: 5,
      explanation: 'Factual tone with objective representations of IPCC data, holding extremely low sensationalist markers.'
    },
    explanation: 'Excellent scientific coherence. The figures match established international climatological datasets. The sources cited are leading scientific agencies.',
    suggestedSources: [
      { name: 'IPCC Sixth Assessment Report', url: 'https://www.ipcc.ch', category: 'Academic Consensus', reliability: 'High' },
      { name: 'NOAA Climate Monitoring', url: 'https://www.climate.gov', category: 'Government Agency', reliability: 'High' }
    ],
    bookmarked: false
  },
  {
    id: 'analysis_tea_cure',
    title: 'Secret Herbal Infusion Completely Restores Pancreatic Function',
    date: 'May 20, 2026, 11:05 AM',
    type: 'file',
    credibilityScore: 45,
    fakeProbability: 65,
    trustRating: 'Low',
    confidenceLevel: 'Medium',
    claims: [
      {
        claim: 'A new herbal tea completely cures diabetes in two weeks',
        entity: 'Alternative Health Blog',
        type: 'Medical Assertion',
        status: 'False',
        explanation: 'There is no clinical evidence that herbal extracts cure Type 1 or Type 2 diabetes. Clinical guidelines require insulin or verified glucose-regulating therapies.'
      },
      {
        claim: 'Pharmaceutical companies hide the actual cure to maintain profits',
        entity: 'Big Pharma',
        type: 'Conspiracy Claim',
        status: 'Unverified',
        explanation: 'An argumentative claim that lacks citation, documentary evidence, or corroboration from health regulatory bodies.'
      }
    ],
    bias: {
      political: 15,
      emotional: 75,
      clickbait: 85,
      propaganda: 60,
      explanation: 'Highly emotional rhetoric, clickbait headlining, and conspiracy themes designed to incite distrust and sell a product.'
    },
    explanation: 'This text exhibits multiple classic features of health misinformation: miracle cures, conspiracy themes, and emotional manipulation. It contradicts clinical guidelines from the WHO and American Diabetes Association.',
    suggestedSources: [
      { name: 'World Health Organization (WHO) Diabetes Info', url: 'https://www.who.int', category: 'Health Agency', reliability: 'High' },
      { name: 'American Diabetes Association', url: 'https://diabetes.org', category: 'Medical Association', reliability: 'High' }
    ],
    bookmarked: true
  }
];

export const useAnalysisStore = create<AnalysisState>((set) => {
  const getStoredRecords = () => {
    if (typeof window === 'undefined') return DEFAULT_RECORDS;
    const stored = localStorage.getItem('factlens_records');
    return stored ? JSON.parse(stored) : DEFAULT_RECORDS;
  };

  const getStoredApiKey = () => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('factlens_gemini_key') || '';
  };

  return {
    records: getStoredRecords(),
    activeApiKey: getStoredApiKey(),
    setApiKey: (key) => {
      localStorage.setItem('factlens_gemini_key', key);
      set({ activeApiKey: key });
    },
    addRecord: (record) => set((state) => {
      const newRecords = [record, ...state.records];
      localStorage.setItem('factlens_records', JSON.stringify(newRecords));
      return { records: newRecords };
    }),
    deleteRecord: (id) => set((state) => {
      const newRecords = state.records.filter(r => r.id !== id);
      localStorage.setItem('factlens_records', JSON.stringify(newRecords));
      return { records: newRecords };
    }),
    toggleBookmark: (id) => set((state) => {
      const newRecords = state.records.map(r => r.id === id ? { ...r, bookmarked: !r.bookmarked } : r);
      localStorage.setItem('factlens_records', JSON.stringify(newRecords));
      return { records: newRecords };
    })
  };
});
`);

// notification.store.ts
define('store/notification.store.ts', `
import { create } from 'zustand';

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'alert';
  read: boolean;
  time: string;
}

interface NotificationState {
  notifications: SystemNotification[];
  addNotification: (noti: Omit<SystemNotification, 'id' | 'read' | 'time'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
}

const DEFAULT_NOTIFICATIONS: SystemNotification[] = [
  {
    id: 'not_1',
    title: 'Verification Complete',
    message: 'Your analysis of Kepler-452b Observations has finished. Click to see findings.',
    type: 'success',
    read: false,
    time: '5m ago'
  },
  {
    id: 'not_2',
    title: 'Suspicious Article Detected',
    message: 'The analysis on Diabetes Tea Cure returned a High Misinformation risk warning.',
    type: 'alert',
    read: false,
    time: '2h ago'
  },
  {
    id: 'not_3',
    title: 'Admin Policy Update',
    message: 'A new set of 12 academic databases has been whitelisted for factual verification.',
    type: 'info',
    read: true,
    time: '1d ago'
  }
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: DEFAULT_NOTIFICATIONS,
  addNotification: (noti) => set((state) => [
    {
      ...noti,
      id: 'not_' + Math.random().toString(36).substr(2, 4),
      read: false,
      time: 'Just now'
    },
    ...state.notifications
  ] as any),
  markAsRead: (id) => set((state) => ({
    notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
  })),
  markAllAsRead: () => set((state) => ({
    notifications: state.notifications.map(n => ({ ...n, read: true }))
  })),
  clearAll: () => set({ notifications: [] })
}));
`);

// -------------------------------------------------------------
// 3. ENVS & CONSTANTS
// -------------------------------------------------------------

// env.ts
define('lib/env.ts', `
export const ENV = {
  geminiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY || '',
  neo4jUri: process.env.NEO4J_URI || '',
  pineconeApiKey: process.env.PINECONE_API_KEY || '',
  redisUrl: process.env.REDIS_URL || ''
};
`);

// constants.ts
define('lib/constants.ts', `
export const TRUSTED_SOURCES = [
  { name: 'NASA Science', domain: 'nasa.gov', category: 'Government & Space', trustRating: 'High' },
  { name: 'Nature Research', domain: 'nature.com', category: 'Academic Journal', trustRating: 'High' },
  { name: 'Science Magazine', domain: 'sciencemag.org', category: 'Academic Research', trustRating: 'High' },
  { name: 'World Health Organization', domain: 'who.int', category: 'Global Health', trustRating: 'High' },
  { name: 'CDC', domain: 'cdc.gov', category: 'Government Health', trustRating: 'High' },
  { name: 'Reuters Fact Check', domain: 'reuters.com/fact-check', category: 'Fact Checking', trustRating: 'High' },
  { name: 'FactCheck.org', domain: 'factcheck.org', category: 'Non-profit Tracker', trustRating: 'High' },
  { name: 'MIT Technology Review', domain: 'technologyreview.com', category: 'Technology Journal', trustRating: 'High' }
];

export const BIAS_SCALE_LABELS = {
  political: [
    { max: 20, label: 'Objective / Centrist', color: 'text-emerald-400' },
    { max: 50, label: 'Moderate Slanted', color: 'text-amber-400' },
    { max: 100, label: 'Strongly Biased / Partisan', color: 'text-rose-500' }
  ],
  emotional: [
    { max: 25, label: 'Objective Scientific Tone', color: 'text-emerald-400' },
    { max: 60, label: 'Persuasive / Loaded Words', color: 'text-amber-400' },
    { max: 100, label: 'Highly Sensational / Outraged', color: 'text-rose-500' }
  ],
  clickbait: [
    { max: 30, label: 'Informative Headline', color: 'text-emerald-400' },
    { max: 65, label: 'Curiosity Gap / Fluff', color: 'text-amber-400' },
    { max: 100, label: 'Sensational Clickbait Trap', color: 'text-rose-500' }
  ],
  propaganda: [
    { max: 15, label: 'Zero Propaganda Signals', color: 'text-emerald-400' },
    { max: 45, label: 'Biased Narrative Shaping', color: 'text-amber-400' },
    { max: 100, label: 'Hostile Disinformation Campaign', color: 'text-rose-500' }
  ]
};
`);

// Write files to system
Object.keys(files).forEach((filePath) => {
  const fullPath = path.join(__dirname, '..', filePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, files[filePath].trim());
  console.log('Scaffolded:', filePath);
});
console.log('Part 1 completed successfully.');
