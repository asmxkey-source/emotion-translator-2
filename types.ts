
export type EmotionTone = 'plain' | 'trendy' | 'warm';

export interface Coping30s {
  title: string;
  steps: string[];
}

export interface Coping3m {
  title: string;
  prompt: string;
  steps: string[];
}

export interface Coping10m {
  title: string;
  setup_1m: string;
  focus_9m: string;
}

export interface SafetyInfo {
  risk_level: 'low' | 'medium' | 'high';
  needs_crisis_ui: boolean;
  message: string;
}

export interface TranslationResult {
  trendy_label: string;
  standard_labels: string[];
  one_line_summary: string;
  coping_30s: Coping30s;
  coping_3m: Coping3m;
  coping_10m: Coping10m;
  safety: SafetyInfo;
}

export interface HistoryEntry extends TranslationResult {
  id: string;
  user_text: string;
  tone: EmotionTone;
  created_at: number;
  helpful?: boolean;
}

export interface WeeklyStats {
  topLabels: { label: string; count: number }[];
  dailyCounts: { day: string; count: number }[];
}
