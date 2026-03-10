import React, { useState } from 'react';
import { articles } from '../data/articles';
import ArticleCard from './ArticleCard';
import ChatBot from './ChatBot';
import WebSearch from './WebSearch';
import ThemeToggle from './ThemeToggle';
import { Decade, Category } from '../types';

interface Props {
    initialDecade: Decade;
    onBack: () => void;
}

const Dashboard: React.FC<Props> = ({ initialDecade, onBack }) => {
  const decades: Decade[] = [1960, 1980, 2000, 2020];
  const [selectedDecade, setSelectedDecade] = useState<Decade>(initialDecade);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  
  // Filter articles
  const filteredArticles = articles.filter(
    (art) => art.decade === selectedDecade && (selectedCategory === 'All' || art.category === selectedCategory)
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] text-slate-900 dark:text-slate-200 selection:bg-blue-500/30 animate-fade-in transition-colors duration-300">
      {/* Navbar / Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
                <button 
                    onClick={onBack}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    title="Back to Timeline"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                </button>
               <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/20">
                     I
                   </div>
                   <h1 className="hidden md:block text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-slate-400">
                     Interactive Timeline and Summarizer
                   </h1>
               </div>
            </div>
            
            <div className="flex items-center gap-6">
                <nav className="hidden md:flex space-x-8">
                    {decades.map(decade => (
                        <button
                            key={decade}
                            onClick={() => setSelectedDecade(decade)}
                            className={`
                                relative px-3 py-2 text-sm font-medium transition-colors
                                ${selectedDecade === decade ? 'text-blue-600 dark:text-blue-400' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
                            `}
                        >
                            {decade}s
                            {selectedDecade === decade && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            )}
                        </button>
                    ))}
                </nav>
                <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 hidden md:block"></div>
                <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Decade Selector */}
      <div className="md:hidden sticky top-16 z-30 bg-white dark:bg-[#0f172a] border-b border-slate-200 dark:border-slate-800 overflow-x-auto transition-colors duration-300">
          <div className="flex p-2 space-x-2 min-w-max px-4">
            {decades.map(decade => (
                <button
                    key={decade}
                    onClick={() => setSelectedDecade(decade)}
                    className={`
                        px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                        ${selectedDecade === decade 
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' 
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700'}
                    `}
                >
                    {decade}s
                </button>
            ))}
          </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Intro Section */}
        <section className="text-center py-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 transition-colors">
                Explore the <span className="text-blue-600 dark:text-blue-500">{selectedDecade}s</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Dive into the pivotal moments of Technology, Science, and Politics that shaped this era.
            </p>
        </section>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button
                onClick={() => setSelectedCategory('All')}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === 'All' ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
            >
                All
            </button>
            {Object.values(Category).map(cat => (
                <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
            {filteredArticles.map(article => (
                <ArticleCard key={article.id} article={article} />
            ))}
        </div>

        {filteredArticles.length === 0 && (
            <div className="text-center py-20 text-slate-500">
                No articles found for this category.
            </div>
        )}

        {/* WebSearch */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors">
             <WebSearch />
        </div>

      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0f172a] mt-12 py-8 transition-colors">
          <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Interactive Timeline and Summarizer. Powered by Gemini API.
          </div>
      </footer>

      <ChatBot />

    </div>
  );
};

export default Dashboard;