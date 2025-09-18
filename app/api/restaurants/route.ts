import { NextResponse } from "next/server";

interface Restaurant {
  name: string;
  formatted_address: string;
  place_id: string;
  photos?: {
    photo_reference: string;
  }[];
}

export async function POST(request: Request) {
  let lang = 'en';
  try {
    // 這裡等同於 Nuxt 的 readBody(event)
    const body = await request.json();
    const { lat, lng, keyword, language } = body;
    lang = language;
    const apiKey = process.env.GOOGLE_API_KEY;

    const langMap: Record<string, string> = {
      en: 'en',
      zh: 'zh-TW',
    }

    const googleLang = langMap[language] || 'en'

    const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    url.searchParams.set('query', keyword || '餐廳')
    url.searchParams.set('location', `${lat},${lng}`)
    url.searchParams.set('radius', '1000') // 公尺
    url.searchParams.set('language', googleLang)
    url.searchParams.set('key', apiKey || '') // TODO: 筆記
    console.log('url: ', url.toString());

    const response = await fetch(url.toString())
    const data = await response.json()

    const results = data.results.slice(0, 10).map((restaurant: Restaurant) => ({
      name: restaurant.name,
      place_id: restaurant.place_id,
      address: restaurant.formatted_address,
      photos: restaurant.photos,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.name)}&query_place_id=${restaurant.place_id}`
    }))

    console.log('results: ', results);

    // Next.js 必須用 Response / NextResponse 回傳
    return  NextResponse.json(results)

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        error: lang === "en"
            ? "The response could not be parsed, please try again later"
            : "回傳內容無法解析，請稍後再試",
      },
      { status: 500 }
    );
  }
}