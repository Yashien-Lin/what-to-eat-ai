import OpenAI from "openai";
import { Language, Scene } from "@/types";

export async function getAIRecommendation({
  input,
  scene,
  language,
}: {
  input: string;
  scene: Scene;
  language: Language;
}) {
  const langMap: Record<Language, string> = {
    zh: "zh-TW",
    en: "en-US",
  };
  const promptLang = langMap[language as Language];
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `
		You are a Mood-Based Dining Agent.
    Your job is to analyze the user's emotional state and provide cuisine recommendations accordingly.

    Return strictly valid JSON only. Do NOT include explanations, markdown, or comments.
    The JSON must follow this structure:
    {
      "analysis": {
        "confidence": number (0-1),
        "mood": string,
        "intent_summary": string,
        "scene": "home" | "dine_out",
        "keywords": string[],
        "preferred_cuisine": string[],
        "follow_up_questions": string[]
      },
      "result": {
        "type": "recipe" | "restaurant", // "recipe" if scene is "home"; "restaurant" if "dine_out"
        "source": "ai" | "google_places" // "ai" if scene is "home"; "google_places" if "dine_out"
        "data": []  // recipes if scene is "home"; empty array if "dine_out"
      }
    }

    Rules:
    1. If scene is "home":
      - result.type must be "recipe"
      - result.data must contain an array of recipes (give at least 10 recipes):
      - steps no need to be numbered, just list the steps.
        {
          "name": string,
          "reason": string,
          "ingredients": string[],
          "steps": string[]
        }
    2. If scene is "dine_out":
      - result.type must be "restaurant"
      - result.data must be an empty array
    3. Aiways provide keywords and preferred_cuisine.
    4. Include all fields. Never omit required keys.
    5. Always ensure the JSON is parseable by JSON.parse().   
		6. If confidence < 0.6, include follow-up questions.

	`;

  const userPrompt = `
		Language: ${promptLang}
		Scene: ${scene}
		User mood input: ${input}
	`;

  const response = await openai.chat.completions.create({
    model: "gpt-5-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 1,
  });

  const aiResult = response.choices[0].message.content;

  if (!aiResult) {
    throw new Error("No content from AI");
  }

  let parsed;
  try {
    parsed = JSON.parse(aiResult);
  } catch {
    throw new Error("Invalid JSON from AI");
  }

  return parsed;
}
