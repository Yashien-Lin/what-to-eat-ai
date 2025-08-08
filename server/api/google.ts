export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()
  const apiKey = config.googleApiKey
  const { lat, lng, keyword, language } = body

  const langMap: Record<string, string> = {
    zh: 'zh-TW',
    en: 'en',
  }

  const googleLang = langMap[language] || 'zh-TW'

  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
  url.searchParams.set('query', keyword || '餐廳')
  url.searchParams.set('location', `${lat},${lng}`)
  url.searchParams.set('radius', '1000') // 公尺
  url.searchParams.set('language', googleLang)
  url.searchParams.set('key', apiKey)
  console.log('url: ', url.toString());

  const response = await fetch(url.toString())
  const data = await response.json()

  const results = data.results.slice(0, 10).map((place: any) => ({
    name: place.name,
    address: place.formatted_address,
    photos: place.photos,
    mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}&query_place_id=${place.place_id}`
  }))

  return { results }
})
