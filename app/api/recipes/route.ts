import { OpenAI } from 'openai'
import { NextResponse } from 'next/server';
import { Language } from '@/types';

export const runtime = 'nodejs'; // 確保使用 Node 環境（OpenAI SDK 在 Edge runtime 可能報錯）

// 產生 prompt 的 function
function generatePrompt({
  meal,
  preferences,
  language,
}: {
  meal: string;
  scene: string;
  preferences: string[];
  language: Language;
}) {
  return `
    你是一位美食推薦專家。

    請根據以下資訊，推薦5道適合在家自己煮的料理，每一道需包含：
    - 料理名稱
    - 推薦理由（為什麼推薦這道）
    - 食材列表
    - 製作步驟

    條件如下：
    - 時段：${meal}
    - 飲食偏好：${preferences.join('、')}
    - 語言：${language}

    請回傳以下格式的 **純 JSON 陣列**，不要加上任何 markdown 或 \`\`\` 符號：

    [
      {
        "name": "料理名稱",
        "reason": "為什麼推薦這道料理",
        "ingredients": ["食材1", "食材2", ...],
        "steps": ["步驟1", "步驟2", ...]
      },
      ...
    ]
  `;
}

export async function POST(request: Request) {
  let lang = 'en';
  try {
    const body = await request.json();
    const { meal, scene, preferences, language } = body;
    lang = language 

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // 或 'gpt-3.5-turbo'
      messages: [{ role: 'user', content: generatePrompt({ meal, scene, preferences, language }) }],
      temperature: 0.8,
    });

    const aiResponse = response.choices[0].message?.content || '';
    const recipes = JSON.parse(aiResponse);

    // Next.js 必須用 Response / NextResponse 回傳
    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      {
        error: lang === 'en'
            ? 'AI response could not be parsed, please try again later'
            : 'AI 回傳內容無法解析，請稍後再試',
      },
      { status: 500 }
    );
  }
}
