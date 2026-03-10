import React, { useState } from 'react';
import { searchWeb } from '../services/gemini';

const WebSearch: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{text: string, links: {title: string, url: string}[]} | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResults(null);
    try {
        const data = await searchWeb(query);
        setResults(data);
    } catch (e) {
        setResults({ text: "Error searching the web.", links: [] });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-slate-800/40 backdrop-blur-md rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden mb-8 shadow-sm transition-colors duration-300">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-100 dark:bg-amber-500/20 rounded-lg text-amber-600 dark:text-amber-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Fact Check / Web Search</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Google Search & Gemini Flash</p>
            </div>
        </div>
        <svg className={`w-5 h-5 text-slate-400 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </div>

      {isOpen && (
        <div className="p-4 border-t border-slate-200 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-900/30">
            <div className="flex gap-2 mb-4">
                <input 
                    type="text" 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search for recent facts (e.g., 'Who won the 2024 election?')"
                    className="flex-1 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg px-4 py-2 text-slate-900 dark:text-white focus:border-amber-500 focus:outline-none transition-colors"
                />
                <button 
                    onClick={handleSearch}
                    disabled={loading}
                    className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

            {results && (
                <div className="space-y-4 animate-fade-in">
                    <div className="bg-white dark:bg-slate-800/50 p-4 rounded-lg text-sm text-slate-700 dark:text-slate-200 leading-relaxed border border-slate-200 dark:border-slate-700">
                        {results.text}
                    </div>
                    {results.links.length > 0 && (
                        <div>
                            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Sources</h4>
                            <div className="flex flex-wrap gap-2">
                                {results.links.map((link, i) => (
                                    <a 
                                        key={i} 
                                        href={link.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-xs bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition-colors truncate max-w-xs block"
                                    >
                                        {link.title} ↗
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default WebSearch;