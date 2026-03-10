import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import TimelineView from './components/TimelineView';
import Dashboard from './components/Dashboard';
import { Decade } from './types';
import { ThemeContext, Theme } from './context/ThemeContext';

type ViewState = 'landing' | 'timeline' | 'dashboard';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedDecade, setSelectedDecade] = useState<Decade>(1960);
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleStart = () => {
    setView('timeline');
  };

  const handleBackToHome = () => {
    setView('landing');
  };

  const handleSelectDecade = (decade: Decade) => {
    setSelectedDecade(decade);
    setView('dashboard');
  };

  const handleBackToTimeline = () => {
    setView('timeline');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0f172a] dark:text-slate-200 transition-colors duration-300">
        {view === 'landing' && (
          <LandingPage onStart={handleStart} />
        )}
        
        {view === 'timeline' && (
          <TimelineView 
            onSelectDecade={handleSelectDecade} 
            onBackToHome={handleBackToHome}
          />
        )}
        
        {view === 'dashboard' && (
          <Dashboard 
            initialDecade={selectedDecade} 
            onBack={handleBackToTimeline} 
          />
        )}
      </div>
    </ThemeContext.Provider>
  );
};

export default App;