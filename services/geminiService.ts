
import { GoogleGenAI, Type } from "@google/genai";
import { UserInfo, FortuneResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateFortune = async (userInfo: UserInfo): Promise<FortuneResponse> => {
  const prompt = `당신은 2026년 '병오년(丙午年)' 붉은 말의 해를 맞이하여 운세를 점치는 최고 권위의 사주 명리학자입니다. 
  다음 사용자의 상세 정보를 바탕으로 2026년 신년 운세를 매우 상세하고 전문적으로 분석해주세요.
  
  [사용자 정보]
  - 이름: ${userInfo.name}
  - 생년월일: ${userInfo.birthDate} (${userInfo.birthType === 'solar' ? '양력' : '음력'})
  - 태어난 시간: ${userInfo.birthTime || '모름'}
  - 성별: ${userInfo.gender === 'male' ? '남성' : '여성'}

  [작성 가이드라인]
  1. 2026년 병오년의 '화(火)' 기운과 사용자의 사주가 어떻게 조화를 이루는지 설명하세요.
  2. 전체적인 총운, 재물운, 애정운, 건강운을 각각 전문 용어를 섞어 희망차게 작성하세요.
  3. 행운의 색상과 숫자를 선정하고, 왜 이 요소들이 사용자의 2026년 액운을 막아주거나 복을 부르는지 명리학적 근거를 들어 설명하세요.

  응답은 반드시 한국어로 작성하며, JSON 형식으로만 응답하세요.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          total: { type: Type.STRING, description: '전체적인 총운 (전문적 분석 포함)' },
          wealth: { type: Type.STRING, description: '재물 및 사업운' },
          love: { type: Type.STRING, description: '애정 및 대인관계운' },
          health: { type: Type.STRING, description: '신체 및 정신 건강운' },
          luckyColor: { type: Type.STRING, description: '추천 행운 색상명' },
          luckyColorReason: { type: Type.STRING, description: '해당 색상이 행운인 이유' },
          luckyNumber: { type: Type.NUMBER, description: '추천 행운 숫자' },
          luckyNumberReason: { type: Type.STRING, description: '해당 숫자가 행운인 이유' }
        },
        required: ['total', 'wealth', 'love', 'health', 'luckyColor', 'luckyColorReason', 'luckyNumber', 'luckyNumberReason']
      }
    }
  });

  const jsonStr = response.text?.trim() || '{}';
  return JSON.parse(jsonStr);
};
