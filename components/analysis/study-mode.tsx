'use client';

import React, { useState } from 'react';
import { BookOpen, HelpCircle, ClipboardList, CheckCircle } from 'lucide-react';

interface StudyModeProps {
  articleTitle: string;
}

export default function StudyMode({ articleTitle }: StudyModeProps) {
  const [activeSubTab, setActiveSubTab] = useState<'flashcards' | 'quiz' | 'notes'>('flashcards');
  const [cardFlipped, setCardFlipped] = useState(false);
  const [activeCardIdx, setActiveCardIdx] = useState(0);

  // Quiz states
  const [selectedAns, setSelectedAns] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Fallback study data
  const flashcards = [
    { q: 'What is Kepler-452b?', a: 'A rocky exoplanet orbiting within the habitable zone of a G-type star similar to our Sun, confirmed by NASA in 2015.' },
    { q: 'What defines a Habitable Zone?', a: 'The orbital region around a star where atmospheric pressures can support liquid water on a planetary surface.' },
    { q: 'How does CO2 peak level affect temperature?', a: 'Carbon dioxide absorbs and emits thermal infrared radiation, acting as a primary greenhouse gas in atmospheric warming.' }
  ];

  const quiz = {
    question: 'According to scientific databases, what is the current pre-industrial temperature warming offset?',
    options: ['0.5 Degrees C', '1.1 Degrees C', '2.5 Degrees C', '4.0 Degrees C'],
    correctIndex: 1,
    explanation: 'IPCC reports confirm global temperatures have risen by approximately 1.1 degrees Celsius since the pre-industrial baseline.'
  };

  const notes = [
    'Academic Consensus: 1.1°C global temperature offset from pre-industrial baseline is validated by climatological research (IPCC / NOAA).',
    'Scientific Exoplanet Criteria: Exoplanet habitability indexes require G-type star alignments, rocky cores, and liquid water temperature limits.',
    'Greenhouse Variables: Atmospheric peaks of CO2 (measured at Mauna Loa observatory) reached record peaks of 424 ppm in 2024.'
  ];

  const nextCard = () => {
    setCardFlipped(false);
    setActiveCardIdx(prev => (prev + 1) % flashcards.length);
  };

  return (
    <div className="p-6 rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md space-y-6 select-none">
      
      {/* Header and sub-tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-400" />
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Student Study Deck</h3>
        </div>
        <div className="flex gap-1.5">
          <button 
            onClick={() => setActiveSubTab('flashcards')}
            className={`px-3 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
              activeSubTab === 'flashcards' ? 'border-cyan-500/20 bg-cyan-950/20 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Flashcards
          </button>
          <button 
            onClick={() => setActiveSubTab('quiz')}
            className={`px-3 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
              activeSubTab === 'quiz' ? 'border-cyan-500/20 bg-cyan-950/20 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Concept Quiz
          </button>
          <button 
            onClick={() => setActiveSubTab('notes')}
            className={`px-3 py-1 rounded text-[10px] font-bold border transition-colors cursor-pointer ${
              activeSubTab === 'notes' ? 'border-cyan-500/20 bg-cyan-950/20 text-cyan-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Revision Notes
          </button>
        </div>
      </div>

      <div className="mt-4">
        
        {/* Flashcards Panel */}
        {activeSubTab === 'flashcards' && (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div 
              onClick={() => setCardFlipped(!cardFlipped)}
              className={`w-full max-w-md h-40 border rounded-xl flex items-center justify-center p-6 text-center cursor-pointer transition-all hover:shadow-xl ${
                cardFlipped ? 'bg-cyan-950/20 border-cyan-500/30' : 'bg-slate-950 border-white/5'
              }`}
            >
              <div className="space-y-2">
                <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider">
                  {cardFlipped ? 'Answer Detail (Click to flip)' : 'Question Target (Click to flip)'}
                </span>
                <p className="text-xs font-bold leading-relaxed text-slate-200">
                  {cardFlipped ? flashcards[activeCardIdx].a : flashcards[activeCardIdx].q}
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <span className="text-[10px] text-slate-500 font-bold">Card {activeCardIdx + 1} of {flashcards.length}</span>
              <button 
                onClick={nextCard}
                className="px-4 py-1.5 bg-white/5 border border-white/10 hover:bg-white/10 text-[10px] font-bold text-slate-200 rounded transition-colors cursor-pointer"
              >
                Next Concept
              </button>
            </div>
          </div>
        )}

        {/* Quiz Panel */}
        {activeSubTab === 'quiz' && (
          <div className="space-y-4 max-w-xl mx-auto">
            <div className="space-y-1.5">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <HelpCircle className="h-3.5 w-3.5" /> Concept Challenge
              </span>
              <p className="text-xs font-bold text-slate-200 leading-normal">{quiz.question}</p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {quiz.options.map((opt, i) => {
                const isSelected = selectedAns === i;
                const isCorrect = i === quiz.correctIndex;
                let btnStyle = 'border-white/5 bg-slate-950 text-slate-400 hover:text-slate-200';
                
                if (isSelected) btnStyle = 'border-cyan-500/40 bg-cyan-950/20 text-cyan-300';
                if (quizSubmitted) {
                  if (isCorrect) btnStyle = 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300';
                  else if (isSelected) btnStyle = 'border-rose-500/40 bg-rose-950/20 text-rose-300';
                }

                return (
                  <button
                    key={i}
                    disabled={quizSubmitted}
                    onClick={() => setSelectedAns(i)}
                    className={`p-3.5 rounded-lg border text-left text-xs font-bold transition-all flex items-center justify-between cursor-pointer disabled:cursor-not-allowed ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {quizSubmitted && isCorrect && <span className="text-emerald-400 font-bold">Correct ✓</span>}
                  </button>
                );
              })}
            </div>

            {!quizSubmitted ? (
              <button 
                onClick={() => setQuizSubmitted(true)}
                disabled={selectedAns === null}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                Submit Answer
              </button>
            ) : (
              <div className="p-3.5 rounded-lg bg-white/2 border border-white/5 text-[11px] text-slate-400 leading-normal">
                <strong className="text-slate-200 block mb-1">🤖 Explanatory Feedback:</strong>
                {quiz.explanation}
              </div>
            )}
          </div>
        )}

        {/* Revision Notes Panel */}
        {activeSubTab === 'notes' && (
          <div className="space-y-4 max-w-xl mx-auto">
            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
              <ClipboardList className="h-3.5 w-3.5" /> Revision Outline
            </span>
            <div className="space-y-2.5">
              {notes.map((note, i) => (
                <div key={i} className="flex gap-2.5 items-start p-3 rounded-lg bg-white/2 border border-white/5">
                  <CheckCircle className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300 leading-relaxed font-semibold">{note}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}