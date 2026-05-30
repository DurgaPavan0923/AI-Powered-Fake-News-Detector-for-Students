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