
import { GoogleGenAI, Type } from "@google/genai";
import { TranslationResult, EmotionTone } from "./types";
import { CRISIS_KEYWORDS, FALLBACK_RESULT } from "./constants";

const SYSTEM_INSTRUCTION = `
너는 “기분 번역 앱”의 응답 생성기다. 사용자의 자유서술 텍스트를 다음 6요소로 번역해 JSON으로만 출력한다:
1) trendy_label: 트렌디한 라벨 1개(과장 금지, 조롱 금지, 2~24자)
2) standard_labels: 표준 감정 라벨 2~3개(한국어, 단정 금지, 임상 진단 라벨 금지)
3) one_line_summary: 관찰 기반 한 줄 요약(8~80자, 원인-반응 형태)
4) coping_30s: 즉시 실행 가능한 30초 대처(1~4 단계)
5) coping_3m: 3분 저널 프롬프트 + 실행 단계(1~3)
6) coping_10m: 10분 행동 처방(1분 준비 1개 + 9분 집중 행동 1개)

안전 규칙:
- 질병 진단/치료/약물 조언/단정 금지.
- 자해/자살/폭력 관련 위기 신호가 있으면 risk_level=high, needs_crisis_ui=true로 설정.
- 위기 시 safety.message에 “즉시 도움을 요청하라”는 안내만 담고 구체적 전화번호는 포함하지 마라.

톤 규칙:
- tone="plain": 담백하고 간결한 문장.
- tone="trendy": 캐주얼하지만 무례함 금지.
- tone="warm": 공감적이되 과도한 확신 금지.
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  required: ["trendy_label", "standard_labels", "one_line_summary", "coping_30s", "coping_3m", "coping_10m", "safety"],
  properties: {
    trendy_label: { type: Type.STRING },
    standard_labels: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    one_line_summary: { type: Type.STRING },
    coping_30s: {
      type: Type.OBJECT,
      required: ["title", "steps"],
      properties: {
        title: { type: Type.STRING },
        steps: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    coping_3m: {
      type: Type.OBJECT,
      required: ["title", "prompt", "steps"],
      properties: {
        title: { type: Type.STRING },
        prompt: { type: Type.STRING },
        steps: { type: Type.ARRAY, items: { type: Type.STRING } }
      }
    },
    coping_10m: {
      type: Type.OBJECT,
      required: ["title", "setup_1m", "focus_9m"],
      properties: {
        title: { type: Type.STRING },
        setup_1m: { type: Type.STRING },
        focus_9m: { type: Type.STRING }
      }
    },
    safety: {
      type: Type.OBJECT,
      required: ["risk_level", "needs_crisis_ui", "message"],
      properties: {
        risk_level: { type: Type.STRING },
        needs_crisis_ui: { type: Type.BOOLEAN },
        message: { type: Type.STRING }
      }
    }
  }
};

export async function translateEmotion(
  text: string,
  tone: EmotionTone
): Promise<TranslationResult> {
  // Pre-check crisis keywords locally for faster safety
  const hasLocalCrisis = CRISIS_KEYWORDS.some(kw => text.includes(kw));
  
  try {
    // Fix: Using process.env.API_KEY directly as per SDK initialization guidelines
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `사용자 텍스트: "${text}", 톤: "${tone}", 언어: "ko-KR"`,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const result = JSON.parse(response.text || "{}") as TranslationResult;
    
    // Override if local check triggered but model missed it
    if (hasLocalCrisis) {
      result.safety.needs_crisis_ui = true;
      result.safety.risk_level = 'high';
    }

    return result;
  } catch (error) {
    console.error("Gemini Error:", error);
    return FALLBACK_RESULT;
  }
}
