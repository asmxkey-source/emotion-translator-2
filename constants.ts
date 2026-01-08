
import { TranslationResult } from './types';

export const CRISIS_KEYWORDS = [
  "죽고 싶", "자살", "자해", "끝내고 싶", "사라지고 싶", "남을 해치", "살고 싶지 않"
];

export const FALLBACK_RESULT: TranslationResult = {
  trendy_label: "잠시 멈춤이 필요한 순간",
  standard_labels: ["안정", "긴장"],
  one_line_summary: "생각이 너무 많아져 마음이 복잡한 상태입니다.",
  coping_30s: {
    title: "호흡 리셋",
    steps: ["코로 3초 들이마시기", "입으로 6초 길게 내쉬기", "이걸 3번 반복"]
  },
  coping_3m: {
    title: "생각 정리",
    prompt: "지금 내가 느끼는 감정 1개를 이름 붙이고, 그 감정이 원하는 ‘요구’ 1개를 적어보세요.",
    steps: ["사실: 방금 일어난 일 1줄", "해석: 내가 붙인 의미 1줄", "요구: 지금 필요한 것 1줄"]
  },
  coping_10m: {
    title: "10분 착수",
    setup_1m: "작업 환경 1개 정리 (알림 끄기 등)",
    focus_9m: "가장 작은 작업 1개만 진행"
  },
  safety: {
    risk_level: "low",
    needs_crisis_ui: false,
    message: "안정적인 상태로 보입니다."
  }
};

export const EMOTION_OPTIONS = [
  "불안", "긴장", "분노", "짜증", "슬픔", "무기력", "공허", "외로움", 
  "수치", "죄책감", "두려움", "좌절", "안정", "기쁨"
];
