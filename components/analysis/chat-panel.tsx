'use client';

import React, { useState } from 'react';
import { MessageSquare, Send, Bot, User as UserIcon, Loader } from 'lucide-react';

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
}

interface ChatPanelProps {
  articleTitle: string;
  claims: Array<{ claim: string; status: string }>;
}

export default function ChatPanel({ articleTitle, claims }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: `Hi! I am FactLens AI. I have indexed the report: "${articleTitle}". Ask me any questions regarding credibility or contradictory evidence.` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userQuery = input;
    setMessages(prev => [...prev, { sender: 'user', text: userQuery }]);
    setInput('');
    setLoading(true);

    // AI thinking state
    await new Promise(r => setTimeout(r, 1200));

    let botResponse = "I have analyzed this document. The statements cited can be cross-referenced in whitelisted databases. Ask me about specific details like space habitable variables, temperature stats, or diabetes clinical trials.";

    const queryLower = userQuery.toLowerCase();
    if (queryLower.includes('suspicious') || queryLower.includes('fake') || queryLower.includes('why')) {
      const suspicious = claims.filter(c => c.status === 'False' || c.status === 'Partially Verified');
      if (suspicious.length > 0) {
        botResponse = `The credibility index is reduced because: "${suspicious[0].claim}" is flagged as ${suspicious[0].status}. This statement contradicts peer-reviewed database records.`;
      } else {
        botResponse = "No severe disinformation claims were detected. The claims verified align with academic and government registry consensus.";
      }
    } else if (queryLower.includes('summarize') || queryLower.includes('summary')) {
      botResponse = `Summary of "${articleTitle}": The text addresses factual claims involving ${claims.map(c => c.status).join(', ')} attributes. Verification checks show the scientific data points match whitelisted databases.`;
    } else if (queryLower.includes('evidence') || queryLower.includes('source')) {
      botResponse = "You can review whitelisted consensus links inside the 'Suggested Repositories' tab. Sources like NASA Exoplanets and IPCC reports provide corroborating evidence.";
    }

    setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    setLoading(false);
  };

  return (
    <div className="border border-white/10 rounded-2xl bg-slate-900/60 backdrop-blur-md flex flex-col h-[400px] overflow-hidden select-none">
      
      {/* Header */}
      <div className="bg-slate-950 px-4 py-3 border-b border-white/5 flex items-center gap-2">
        <MessageSquare className="h-4.5 w-4.5 text-cyan-400" />
        <span className="text-xs font-bold text-slate-300">Ask FactLens AI</span>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 pr-2">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
            {msg.sender === 'bot' && (
              <div className="h-6 w-6 rounded-md bg-cyan-950 border border-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Bot className="h-3.5 w-3.5" />
              </div>
            )}
            
            <div className={`p-3 rounded-xl text-xs max-w-[80%] leading-relaxed font-semibold ${
              msg.sender === 'user' 
                ? 'bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-tr-none' 
                : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'
            }`}>
              {msg.text}
            </div>

            {msg.sender === 'user' && (
              <div className="h-6 w-6 rounded-md bg-indigo-950 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
                <UserIcon className="h-3.5 w-3.5" />
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-bold pl-8">
            <Loader className="h-3 w-3 animate-spin text-cyan-400" /> Thinking...
          </div>
        )}
      </div>

      {/* Footer query input */}
      <form onSubmit={handleSend} className="p-3 bg-slate-950/60 border-t border-white/5 flex gap-2">
        <input 
          type="text" 
          placeholder="Ask a question about this article..." 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
        />
        <button type="submit" className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer">
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>

    </div>
  );
}