
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: 'home' | 'history' | 'report' | 'settings';
  setActiveTab: (tab: 'home' | 'history' | 'report' | 'settings') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  return (
    <div className="max-w-md mx-auto min-h-screen flex flex-col pb-20 pt-8 px-4">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600 tracking-tight">기분 번역기</h1>
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
          ✨
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-200 px-6 py-3 flex justify-between items-center max-w-md mx-auto z-50">
        <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center space-y-1 ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className="text-xl">🏠</span>
          <span className="text-[10px] font-medium">홈</span>
        </button>
        <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center space-y-1 ${activeTab === 'history' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className="text-xl">📅</span>
          <span className="text-[10px] font-medium">히스토리</span>
        </button>
        <button onClick={() => setActiveTab('report')} className={`flex flex-col items-center space-y-1 ${activeTab === 'report' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className="text-xl">📊</span>
          <span className="text-[10px] font-medium">리포트</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center space-y-1 ${activeTab === 'settings' ? 'text-indigo-600' : 'text-slate-400'}`}>
          <span className="text-xl">⚙️</span>
          <span className="text-[10px] font-medium">설정</span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
