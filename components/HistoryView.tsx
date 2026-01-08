
import React from 'react';
import { HistoryEntry } from '../types';

interface HistoryViewProps {
  history: HistoryEntry[];
  onDeleteEntry: (id: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ history, onDeleteEntry }) => {
  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-6">
        <span className="text-5xl mb-4 opacity-20">📭</span>
        <h3 className="text-lg font-bold text-slate-700">아직 기록이 없어요</h3>
        <p className="text-sm text-slate-400 mt-2 leading-relaxed">
          오늘의 기분을 번역하고 기록으로 남겨보세요.<br/>감정의 흐름을 한눈에 볼 수 있습니다.
        </p>
      </div>
    );
  }

  const formatDate = (ts: number) => {
    return new Intl.DateTimeFormat('ko-KR', { 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(new Date(ts));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold text-slate-800 px-1 mb-2">기록된 감정들</h2>
      {history.sort((a, b) => b.created_at - a.created_at).map((entry) => (
        <div key={entry.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col group">
          <div className="flex justify-between items-start mb-3">
            <span className="text-[10px] font-bold text-slate-300 uppercase">{formatDate(entry.created_at)}</span>
            <button 
              onClick={() => onDeleteEntry(entry.id)}
              className="opacity-0 group-hover:opacity-100 text-slate-300 hover:text-red-400 transition-all text-xs font-bold"
            >
              삭제
            </button>
          </div>
          <h4 className="text-lg font-bold text-indigo-600 mb-2 truncate">"{entry.trendy_label}"</h4>
          <p className="text-xs text-slate-500 mb-4 line-clamp-2 italic leading-relaxed">
            {entry.user_text}
          </p>
          <div className="flex flex-wrap gap-1">
            {entry.standard_labels.map((l, i) => (
              <span key={i} className="px-2 py-0.5 bg-slate-100 rounded-md text-[10px] font-semibold text-slate-500">
                {l}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryView;
