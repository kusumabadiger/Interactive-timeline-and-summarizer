import React, { useState } from 'react';
import { Article } from '../types';
import { summarizeArticle, translateText } from '../services/gemini';

interface Props {
  article: Article;
}

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ja', name: 'Japanese' },
  { code: 'zh', name: 'Chinese' },
  { code: 'it', name: 'Italian' },
];

const ArticleCard: React.FC<Props> = ({ article }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Summary State
  const [summary, setSummary] = useState<string | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Translation State
  const [translation, setTranslation] = useState<string | null>(null);
  const [loadingTranslation, setLoadingTranslation] = useState(false);
  const [showTranslateOptions, setShowTranslateOptions] = useState(false);
  const [targetLang, setTargetLang] = useState('es');

  const handleSummarize = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (summary) return;
    setLoadingSummary(true);
    const result = await summarizeArticle(article.content);
    setSummary(result);
    setLoadingSummary(false);
  };

  const handleTranslate = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!showTranslateOptions) {
        setShowTranslateOptions(true);
        return;
    }
    
    // Perform translation
    setLoadingTranslation(true);
    const result = await translateText(isExpanded ? article.content : article.preview, LANGUAGES.find(l => l.code === targetLang)?.name || 'English');
    setTranslation(result);
    setLoadingTranslation(false);
    setShowTranslateOptions(false);
  };

  return (
    <div 
      className={`
        relative bg-white dark:bg-slate-800/50 backdrop-blur-md border border-slate-200 dark:border-slate-700/50 
        rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-600
        ${isExpanded ? 'row-span-2' : ''}
      `}
    >
        <div className="h-48 overflow-hidden relative group">
            <img 
                src={article.imageUrl} 
                alt={article.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Always dark overlay for white text readability on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-200 bg-blue-900/40 px-2 py-1 rounded-full backdrop-blur-sm border border-blue-500/20">
                    {article.category}
                </span>
                <h3 className="text-xl font-bold text-white mt-2 leading-tight drop-shadow-md">
                    {article.title}
                </h3>
            </div>
        </div>

      <div className="p-5 flex flex-col gap-4">
        <div className={`text-slate-600 dark:text-slate-300 text-sm leading-relaxed ${!isExpanded && 'line-clamp-3'}`}>
          {isExpanded ? article.content : article.preview}
        </div>

        {/* Summary Section */}
        {summary && (
          <div className="bg-indigo-50 border border-indigo-100 dark:bg-indigo-900/30 dark:border-indigo-500/30 rounded-lg p-3 animate-fade-in-down">
            <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase mb-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M13 7H7v6h6V7z"/><path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd"/></svg>
                AI Summary
            </h4>
            <p className="text-indigo-800 dark:text-indigo-100 text-sm italic">{summary}</p>
          </div>
        )}

        {/* Translation Section */}
        {translation && (
           <div className="bg-emerald-50 border border-emerald-100 dark:bg-emerald-900/30 dark:border-emerald-500/30 rounded-lg p-3 animate-fade-in-down">
             <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-300 uppercase mb-1 flex items-center gap-1">
                 <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                 Translation ({LANGUAGES.find(l => l.code === targetLang)?.name})
             </h4>
             <p className="text-emerald-800 dark:text-emerald-100 text-sm">{translation}</p>
           </div>
        )}

        <div className="flex items-center justify-between mt-2 pt-4 border-t border-slate-200 dark:border-slate-700/50 flex-wrap gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white text-sm font-medium transition-colors mr-auto"
          >
            {isExpanded ? 'Show Less' : 'Read Full'}
          </button>

            {/* Translation Controls */}
            {showTranslateOptions && (
                <div className="flex items-center gap-1 animate-fade-in-right">
                    <select 
                        value={targetLang}
                        onChange={(e) => setTargetLang(e.target.value)}
                        className="bg-slate-100 dark:bg-slate-900 text-xs text-slate-800 dark:text-white border border-slate-300 dark:border-slate-700 rounded py-1 px-2 focus:outline-none focus:border-blue-500"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.code} value={lang.code}>{lang.name}</option>
                        ))}
                    </select>
                </div>
            )}

            <button
                onClick={handleTranslate}
                disabled={loadingTranslation}
                className={`
                    flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border
                    ${translation
                        ? 'bg-slate-100 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600'
                    }
                `}
            >
                {loadingTranslation ? (
                    <span className="animate-pulse">Translating...</span>
                ) : (
                    <>
                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                         {showTranslateOptions ? 'Go' : (translation ? 'Re-Translate' : 'Translate')}
                    </>
                )}
            </button>


          <button
            onClick={handleSummarize}
            disabled={loadingSummary || !!summary}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all
              ${summary 
                ? 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-default' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-900/20'
              }
              disabled:opacity-70 disabled:cursor-not-allowed
            `}
          >
            {loadingSummary ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : summary ? (
              'Summarized'
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Summarize
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;