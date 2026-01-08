
import React from 'react';
import { HistoryEntry } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface ReportViewProps {
  history: HistoryEntry[];
}

const ReportView: React.FC<ReportViewProps> = ({ history }) => {
  const getTopLabels = () => {
    const counts: Record<string, number> = {};
    history.forEach(entry => {
      entry.standard_labels.forEach(label => {
        counts[label] = (counts[label] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const topLabels = getTopLabels();
  const COLORS = ['#6366f1', '#818cf8', '#a5b4fc', '#c7d2fe', '#e0e7ff'];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-indigo-50">
        <h3 className="text-lg font-black text-indigo-900 mb-6 flex items-center">
          <span className="mr-2">🔥</span> 가장 자주 느낀 감정
        </h3>
        
        {topLabels.length > 0 ? (
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topLabels} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="label" 
                  type="category" 
                  width={60} 
                  tick={{ fontSize: 12, fontWeight: 600, fill: '#64748b' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={24}>
                  {topLabels.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="py-10 text-center text-slate-400">
            데이터가 부족하여 차트를 그릴 수 없습니다.
          </div>
        )}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl">
        <h3 className="text-lg font-bold mb-4">감정 주간 인사이트</h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          {history.length > 0 
            ? `최근 한 주 동안 총 ${history.length}번의 감정을 기록하셨네요. 이번 주 당신을 가장 많이 흔든 감정은 '${topLabels[0]?.label}'(이)었습니다. 마음을 기록하는 것만으로도 변화는 이미 시작되었습니다.`
            : "아직 기록된 감정이 없습니다. 당신의 마음을 적어주시면 특별한 리포트를 완성해드릴게요."}
        </p>
      </div>
    </div>
  );
};

export default ReportView;
