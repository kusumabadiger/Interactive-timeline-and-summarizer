import React from 'react';
import ThemeToggle from './ThemeToggle';

interface Props {
  onStart: () => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center text-center px-4 transition-colors duration-300 bg-slate-50 dark:bg-[#0f172a]">
      <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
      </div>

      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300/30 dark:bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-300/30 dark:bg-purple-600/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-slate-800 to-blue-600 dark:from-blue-200 dark:via-white dark:to-blue-200 tracking-tight leading-tight">
          Interactive Timeline <br /> and Summarizer
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
          Journey through the decades. Explore history, technology, and politics through the lens of AI.
        </p>

        <div className="pt-8">
          <button
            onClick={onStart}
            className="group relative px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 group-hover:text-blue-400 dark:group-hover:text-blue-600 transition-colors">Start the Journey</span>
            <div className="absolute inset-0 bg-slate-800 dark:bg-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-8 text-slate-400 dark:text-slate-500 text-sm">
        Powered by Gemini API
      </div>
    </div>
  );
};

export default LandingPage;