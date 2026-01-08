
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import EmotionInput from './components/EmotionInput';
import ResultCard from './components/ResultCard';
import HistoryView from './components/HistoryView';
import ReportView from './components/ReportView';
import CrisisUI from './components/CrisisUI';
import { translateEmotion } from './geminiService';
import { TranslationResult, EmotionTone, HistoryEntry } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'report' | 'settings'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<TranslationResult | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [lastInput, setLastInput] = useState<{text: string, tone: EmotionTone} | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('emotion_history');
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse history");
      }
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem('emotion_history', JSON.stringify(history));
  }, [history]);

  const handleTranslate = async (text: string, tone: EmotionTone) => {
    setIsLoading(true);
    setLastInput({ text, tone });
    
    const result = await translateEmotion(text, tone);
    setCurrentResult(result);
    setIsLoading(false);
  };

  const handleSaveResult = () => {
    if (!currentResult || !lastInput) return;

    const entry: HistoryEntry = {
      ...currentResult,
      id: crypto.randomUUID(),
      user_text: lastInput.text,
      tone: lastInput.tone,
      created_at: Date.now(),
    };

    setHistory([entry, ...history]);
    setCurrentResult(null);
    setLastInput(null);
    setActiveTab('history');
  };

  const handleDeleteEntry = (id: string) => {
    setHistory(history.filter(h => h.id !== id));
  };

  const renderContent = () => {
    if (currentResult?.safety.needs_crisis_ui) {
      return <CrisisUI onBack={() => {
        setCurrentResult(null);
        setLastInput(null);
        setActiveTab('home');
      }} />;
    }

    if (currentResult) {
      return (
        <ResultCard 
          result={currentResult} 
          onSave={handleSaveResult}
          onFeedback={() => {}} 
        />
      );
    }

    switch (activeTab) {
      case 'home':
        return <EmotionInput onTranslate={handleTranslate} isLoading={isLoading} />;
      case 'history':
        return <HistoryView history={history} onDeleteEntry={handleDeleteEntry} />;
      case 'report':
        return <ReportView history={history} />;
      case 'settings':
        return (
          <div className="bg-white rounded-3xl p-8 space-y-6 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold text-slate-800">설정</h2>
            <div className="space-y-4">
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">데이터 관리</h3>
                <button 
                  onClick={() => {
                    if (confirm('모든 기록을 삭제할까요?')) {
                      setHistory([]);
                      localStorage.removeItem('emotion_history');
                    }
                  }}
                  className="w-full text-left py-3 px-4 bg-slate-50 rounded-2xl text-red-500 font-medium text-sm"
                >
                  전체 기록 삭제하기
                </button>
              </section>
              <section>
                <h3 className="text-xs font-bold text-slate-400 uppercase mb-3">앱 정보</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p className="flex justify-between"><span>버전</span> <span>1.0.0 (v1-flash)</span></p>
                  {/* Updated: engine name corrected to match geminiService implementation */}
                  <p className="flex justify-between"><span>엔진</span> <span>Gemini 3 Flash</span></p>
                </div>
              </section>
              <div className="pt-6 border-t border-slate-100">
                <p className="text-[10px] text-slate-400 leading-relaxed">
                  이 서비스는 의학적 진단을 대체할 수 없으며, 수집된 텍스트는 로컬 저장소에만 저장됩니다. 
                  안전 안내가 필요할 경우 즉시 안내 화면이 제공됩니다.
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={(tab) => {
      setCurrentResult(null);
      setActiveTab(tab);
    }}>
      {renderContent()}
    </Layout>
  );
};

export default App;
