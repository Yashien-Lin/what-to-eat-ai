import { NextResponse } from "next/server";
import { ApiResult, Language, Location, Scene } from "@/types";
import { searchRestaurants } from "@/services/googlePlaces";
import { getAIRecommendation } from "@/services/AIRecommendation";

export async function POST(request: Request) {
  try {
    // 串接openAI api，輸入prompt，並取得回傳的json
    const body = await request.json();
    const { location, scene, input, language } = body;

    const aiResult = await getAIRecommendation({ input, scene, language });

    if (!aiResult) {
      return NextResponse.json(
        { error: "Failed to analyze intent" },
        { status: 400 },
      );
    }

    // 若是home，直接回傳AI結果
    if (aiResult.analysis.scene === "home") {
      return NextResponse.json(aiResult, { status: 200 });
    }

    // 若是dine_out，找附近的餐廳
    const preferences = [
      ...aiResult.analysis.keywords,
      ...aiResult.analysis.preferred_cuisine,
    ];
    const restaurants = await searchRestaurants({
      location,
      preferences,
      language,
    });

    const response: ApiResult = {
      analysis: aiResult.analysis,
      result: {
        type: "restaurant",
        source: "google_places",
        data: restaurants,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("get-recommendation api error: ", error);

    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 },
    );
  }
}
