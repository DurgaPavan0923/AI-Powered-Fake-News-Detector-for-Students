'use client';

import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FactLensCopilot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am your FactLens Copilot. How can I help you analyze misinformation patterns or understand Whitelist criteria today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      let botResponse = "I can analyze articles, search citations, and verify claims. If you paste a text inside the Analysis dashboard, our multi-agent pipeline will score it.";
      
      const textLower = userText.toLowerCase();
      if (textLower.includes('clickbait') || textLower.includes('bias')) {
        botResponse = "Bias analysis checks content style: clickbait headlining, emotional triggering (loaded adjectives), and political partisanship. Scores above 50 indicate elevated risk.";
      } else if (textLower.includes('citation') || textLower.includes('sources')) {
        botResponse = "Whitelisted citation domains (like NASA, nature.com, and WHO) are designated as trustworthy. The consensus check cross-references claims against these repositories.";
      }

      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    }, 1000);
  };

  const handleQuickQuestion = (q: string) => {
    setMessages(prev => [...prev, { sender: 'user', text: q }]);
    setTimeout(() => {
      let ans = "Consensus represents the agreement level across whitelisted journals. Multi-agent verify processes check claims against several database sources simultaneously.";
      if (q.includes('bias')) {
        ans = "Clickbait uses curiosity gaps (e.g. 'You won't believe what happened...') to drive traffic, while emotional manipulation utilizes fear or anger keywords to reduce objectivity.";
      }
      setMessages(prev => [...prev, { sender: 'bot', text: ans }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none font-sans">
      
      {/* Expand button */}
      {!open && (
        <button 
          onClick={() => setOpen(true)}
          className="h-12 w-12 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all relative border border-cyan-400/20 cursor-pointer"
        >
          <Bot className="h-6 w-6 animate-pulse" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span></span>
        </button>
      )}

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="w-80 h-96 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden flex flex-col justify-between"
          >
            {/* Header */}
            <div className="bg-slate-950 px-4 py-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-bold text-slate-200">FactLens Copilot</span>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-500 hover:text-slate-300 cursor-pointer"><X className="h-4 w-4" /></button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 pr-2">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  <div className={`p-2.5 rounded-xl text-[11px] leading-relaxed font-semibold ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white rounded-tr-none' 
                      : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/5'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto whitespace-nowrap">
                <button onClick={() => handleQuickQuestion('How to spot bias?')} className="px-2.5 py-1 bg-white/5 border border-white/5 hover:bg-white/10 rounded text-[9px] font-bold text-slate-300 cursor-pointer">Spot Bias</button>
                <button onClick={() => handleQuickQuestion('What is consensus?')} className="px-2.5 py-1 bg-white/5 border border-white/5 hover:bg-white/10 rounded text-[9px] font-bold text-slate-300 cursor-pointer">What is Consensus</button>
              </div>
            )}

            {/* Query bar */}
            <form onSubmit={handleSend} className="p-2.5 bg-slate-950/60 border-t border-white/5 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask guidelines..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-slate-950 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-slate-200 outline-none focus:border-cyan-500 font-semibold"
              />
              <button type="submit" className="p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 cursor-pointer">
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}