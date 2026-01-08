
import React, { useState } from 'react';
import { EmotionTone } from '../types';

interface EmotionInputProps {
  onTranslate: (text: string, tone: EmotionTone) => void;
  isLoading: boolean;
}

const EmotionInput: React.FC<EmotionInputProps> = ({ onTranslate, isLoading }) => {
  const [text, setText] = useState('');
  const [tone, setTone] = useState<EmotionTone>('plain');

  const handleSubmit = () => {
    if (text.trim().length < 2) return;
    onTranslate(text, tone);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-indigo-50/50 border border-indigo-50">
        <label className="block text-sm font-semibold text-slate-500 mb-3">
          지금 기분이나 상황을 편하게 적어보세요
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="오늘 정말 기운이 하나도 없어... 할 일은 많은데 손에 안 잡히네."
          className="w-full h-40 resize-none border-0 focus:ring-0 p-0 text-lg text-slate-700 placeholder:text-slate-300"
          maxLength={4000}
        />
        <div className="flex justify-end text-[10px] text-slate-400 mt-2">
          {text.length} / 4000
        </div>
      </div>

      <div className="flex flex-col space-y-3">
        <span className="text-sm font-semibold text-slate-500 px-1">번역 톤</span>
        <div className="flex bg-slate-100 p-1 rounded-2xl">
          {(['plain', 'trendy', 'warm'] as EmotionTone[]).map((t) => (
            <button
              key={t}
              onClick={() => setTone(t)}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                tone === t 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {t === 'plain' ? '담백' : t === 'trendy' ? '트렌디' : '따뜻'}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isLoading || text.trim().length < 2}
        className={`w-full py-5 rounded-2xl text-lg font-bold transition-all shadow-lg ${
          isLoading || text.trim().length < 2
            ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
            : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95 shadow-indigo-200'
        }`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '400ms' }}></div>
          </div>
        ) : (
          '번역하기'
        )}
      </button>

      <p className="text-[10px] text-center text-slate-400 px-4 leading-relaxed">
        기분 번역기는 AI 기술을 사용하여 감정을 분석합니다. 
        진단이나 치료 목적이 아니며, 응급 상황시 전문기관의 도움을 받으세요.
      </p>
    </div>
  );
};

export default EmotionInput;
