
import React from 'react';

interface CrisisUIProps {
  onBack: () => void;
}

const CrisisUI: React.FC<CrisisUIProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col px-8 py-12 animate-in fade-in duration-300">
      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-8">
        <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center text-5xl">
          ❤️
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-slate-900 leading-tight">지금 혼자가 아닙니다.</h2>
          <p className="text-lg text-slate-500 font-medium">
            당신의 마음이 무척 힘든 상태인 것 같아요.<br/>전문가와 대화하며 도움을 받을 수 있습니다.
          </p>
        </div>

        <div className="w-full space-y-4 pt-8">
          <button 
            className="w-full py-5 bg-red-600 text-white rounded-[2rem] text-xl font-bold shadow-xl shadow-red-200"
            onClick={() => window.location.href = 'tel:1393'}
          >
            긴급 도움 전화 (1393)
          </button>
          
          <button 
            className="w-full py-5 bg-slate-900 text-white rounded-[2rem] text-xl font-bold"
            onClick={() => window.location.href = 'tel:109'}
          >
            청소년 상담 (109)
          </button>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed px-4">
          응급 상황일 경우 즉시 119나 가까운 응급실을 방문해주세요. <br/>
          당신은 소중한 사람입니다.
        </p>
      </div>

      <button 
        onClick={onBack}
        className="mt-8 text-sm font-bold text-slate-400 py-4"
      >
        홈으로 돌아가기
      </button>
    </div>
  );
};

export default CrisisUI;
