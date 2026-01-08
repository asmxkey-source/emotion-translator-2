
import React, { useState } from 'react';
import { TranslationResult } from '../types';
import Timer from './Timer';

interface ResultCardProps {
  result: TranslationResult;
  onFeedback: (helpful: boolean) => void;
  onSave: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ result, onFeedback, onSave }) => {
  const [activeCoping, setActiveCoping] = useState<'30s' | '3m' | '10m'>('30s');
  const [feedbackGiven, setFeedbackGiven] = useState(false);

  const handleFeedback = (val: boolean) => {
    onFeedback(val);
    setFeedbackGiven(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Trendy Card */}
      <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 border-b-8 border-indigo-800">
        <div className="mb-6">
          <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest">오늘의 기분 자막</span>
          <h2 className="text-4xl font-black mt-2 leading-tight">"{result.trendy_label}"</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {result.standard_labels.map((label, idx) => (
            <span key={idx} className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-medium">
              #{label}
            </span>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10">
          <p className="text-sm leading-relaxed text-indigo-50 italic">
            "{result.one_line_summary}"
          </p>
        </div>
      </div>

      {/* Coping Strategies Section */}
      <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
        <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider flex items-center">
          <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
          지금 당장 할 수 있는 대처
        </h3>

        <div className="flex bg-slate-50 p-1 rounded-2xl mb-8">
          {(['30s', '3m', '10m'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setActiveCoping(type)}
              className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${
                activeCoping === type 
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-100' 
                  : 'text-slate-400'
              }`}
            >
              {type === '30s' ? '30초' : type === '3m' ? '3분' : '10분'}
            </button>
          ))}
        </div>

        {activeCoping === '30s' && (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-700">{result.coping_30s.title}</h4>
            <ul className="space-y-3">
              {result.coping_30s.steps.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-600">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold">
                    {idx + 1}
                  </span>
                  <p className="text-sm leading-snug">{step}</p>
                </li>
              ))}
            </ul>
            <Timer durationSeconds={30} label="즉시 리셋 타이머" />
          </div>
        )}

        {activeCoping === '3m' && (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-700">{result.coping_3m.title}</h4>
            <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
              <p className="text-sm text-indigo-700 font-medium leading-relaxed">
                ✍️ {result.coping_3m.prompt}
              </p>
            </div>
            <ul className="space-y-3">
              {result.coping_3m.steps.map((step, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-slate-600">
                  <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-2" />
                  <p className="text-sm">{step}</p>
                </li>
              ))}
            </ul>
            <Timer durationSeconds={180} label="저널링 타이머" />
          </div>
        )}

        {activeCoping === '10m' && (
          <div className="space-y-6">
            <h4 className="text-lg font-bold text-slate-700">{result.coping_10m.title}</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">1분 준비</p>
                  <p className="text-sm text-slate-600">{result.coping_10m.setup_1m}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-2xl">🚀</span>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase">9분 집중</p>
                  <p className="text-sm text-slate-600">{result.coping_10m.focus_9m}</p>
                </div>
              </div>
            </div>
            <Timer durationSeconds={600} label="집중 타이머" />
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between px-2">
        {!feedbackGiven ? (
          <div className="flex items-center space-x-4">
            <span className="text-xs font-medium text-slate-400">번역이 도움이 되었나요?</span>
            <div className="flex space-x-2">
              <button onClick={() => handleFeedback(true)} className="p-2 hover:bg-green-50 rounded-full transition-colors text-xl">👍</button>
              <button onClick={() => handleFeedback(false)} className="p-2 hover:bg-red-50 rounded-full transition-colors text-xl">👎</button>
            </div>
          </div>
        ) : (
          <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">피드백 감사합니다! ✨</span>
        )}
        
        <button 
          onClick={onSave}
          className="bg-slate-800 text-white px-6 py-3 rounded-2xl text-xs font-bold shadow-lg active:scale-95 transition-all"
        >
          기록 저장하기
        </button>
      </div>
    </div>
  );
};

export default ResultCard;
