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