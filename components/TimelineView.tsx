import React, { useRef, useEffect } from 'react';
import { Decade } from '../types';
import ThemeToggle from './ThemeToggle';

interface Props {
  onSelectDecade: (decade: Decade) => void;
  onBackToHome: () => void;
}

const TimelineView: React.FC<Props> = ({ onSelectDecade, onBackToHome }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const decades: Decade[] = [1960, 1980, 2000, 2020];
  
  // Create a repeated array to simulate infinite scroll
  const infiniteDecades = Array(20).fill(decades).flat();

  useEffect(() => {
    // Center the scroll initially
    if (scrollRef.current) {
        const scrollWidth = scrollRef.current.scrollWidth;
        const clientWidth = scrollRef.current.clientWidth;
        scrollRef.current.scrollLeft = (scrollWidth - clientWidth) / 2;
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0f172a] flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300">
        
        {/* Home Button (Top Left) */}
        <div className="absolute top-6 left-6 z-50">
            <button
                onClick={onBackToHome}
                className="p-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 group"
                title="Back to Home"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            </button>
        </div>

        {/* Theme Toggle (Top Right) */}
        <div className="absolute top-6 right-6 z-50">
            <ThemeToggle />
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 dark:opacity-20 pointer-events-none transition-all duration-300" />

        <div className="relative z-10 text-center mb-12 animate-fade-in">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Select an Era</h2>
            <p className="text-slate-500 dark:text-slate-400">Scroll horizontally and click to explore</p>
        </div>

        {/* Infinite Scroll Container */}
        <div 
            ref={scrollRef}
            className="w-full overflow-x-auto no-scrollbar py-20 cursor-grab active:cursor-grabbing relative"
            style={{ scrollBehavior: 'smooth' }}
        >
            {/* The Horizontal Line */}
            <div className="absolute top-1/2 left-0 w-[500%] h-1 bg-gradient-to-r from-transparent via-blue-200 dark:via-blue-500/50 to-transparent transform -translate-y-1/2 pointer-events-none" />

            <div className="flex items-center gap-32 px-[50vw]">
                {infiniteDecades.map((decade, index) => (
                    <div key={`${decade}-${index}`} className="relative group shrink-0">
                        {/* Year Node */}
                        <button
                            onClick={() => onSelectDecade(decade)}
                            className="w-24 h-24 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-200 dark:border-slate-700 group-hover:border-blue-500 dark:group-hover:border-blue-500 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center relative z-10"
                        >
                            <span className="text-xl font-bold text-slate-400 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                {decade}s
                            </span>
                        </button>
                        
                        {/* Decorative Vertical Line */}
                        <div className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-500 transition-colors transform -translate-x-1/2 -translate-y-1/2 -z-10 group-hover:h-32" />
                        
                        {/* Label on Hover */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <span className="text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-widest uppercase">Explore Era</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        <style>{`
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
        `}</style>
    </div>
  );
};

export default TimelineView;