import OpenAI from 'openai';
import { NextResponse } from 'next/server';
import { Language, Location, Scene } from '@/types';
import { searchRestaurants } from '@/lib/googlePlaces';

async function analyzeIntent(input: string, scene: Scene, language: Language) {
  const langMap: Record<Language, string> = {
    zh: 'zh-TW',
    en: 'en-US',
  };
  const promptLang = langMap[language as Language];

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  console.log(`scene: ${scene}, input: ${input},`, `language: ${promptLang}`);

  const systemPrompt = `
		You are a Mood-Based Dining Agent.

		Your job is to:
		1. Understand user's emotional state
		2. Translate mood into food needs
		3. Decide cuisine strategy
		4. Suggest recipe types
		5. Only return recipes if scene is 'home'. 
		6. Only return search restaurant_strategy if scene is 'dine_out'.
		6. Only return search recipe_strategy if scene is 'home'.
		7. Return STRICT JSON only
		8. If confidence < 0.6, include follow-up questions.

		Restaurant rules:
		- Produce search keywords for restaurant lookup.
		- Do NOT output restaurant names, just return search keywords.
		- Another system will query Google Maps using your keywords.

		Recipe rules:
		- Always give at least 10 recipes.
		- Analyze mood and output recipes accordingly.

		Return format as below:
		{
			"confidence": number,
			"mood": string,
			"intent_summary": string,
			"scene": "home" | "dine_out",
			"recipes"?: [{
				"name": string,
				"reason": string, 
				"ingredients": string[], 
				"steps": string[]
			}],
			"restaurant_strategy"?: {
				"keywords": string[],    
				"preferred_cuisine": string[],  
			},
			"recipe_strategy"?: {
				"keywords": string[],    
				"preferred_cuisine": string[],  
			},
			"follow_up_questions": []
		}
	`;
  const userPrompt = `
		Language: ${promptLang}
		Scene: ${scene}
		User mood input: ${input}
	`;

  const response = await openai.chat.completions.create({
    model: 'gpt-5-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 1,
  });

  const content = response.choices[0].message.content;
  console.log('content: ', content);

  if (!content) {
    throw new Error('No content from AI');
  }

  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error('Invalid JSON from AI');
  }

  return parsed;
}

async function getNearbyRestaurants(parsed: any, location: Location, language: Language) {
  const { keywords, preferred_cuisine } = parsed.restaurant_strategy;
  const aiParsed = [...keywords, ...preferred_cuisine];

  const nearbyRestaurents = await searchRestaurants({
    location,
    meal: null,
    preferences: aiParsed,
    language,
  });

  console.log('nearbyRestaurents:', nearbyRestaurents);

  return nearbyRestaurents;
}

export async function POST(request: Request) {
  let lang = 'en';
  try {
    // 串接openAI api，輸入prompt，並取得回傳的json
    const body = await request.json();
    const { location, scene, input, language } = body;
    lang = language;

    const parsed = await analyzeIntent(input, scene, language);

    // 若是家裡吃，直接回傳AI提供的食譜
    if (scene === 'home') {
      return NextResponse.json(parsed);
    }

    // 若是外食，找附近的餐廳
    const restaurants = await getNearbyRestaurants(parsed, location, language);
    return NextResponse.json({
      ...parsed,
      restaurants,
    });
  } catch (error) {
    console.log('get-recommendation error: ', error);
    return NextResponse.json(
      { error: lang === 'en' ? 'Failed to parse intent' : '解析意圖失敗' },
      { status: 500 },
    );
  }
}
