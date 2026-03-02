import { Location } from '@/types';

interface GooglePlacePhoto {
  name: string;
}

interface GooglePlaceResult {
  id: string;
  displayName: {
    text: string;
  };
  formattedAddress: string;
  rating?: number;
  photos?: GooglePlacePhoto[];
  googleMapsUri?: string;
}

export async function searchRestaurants({
  location,
  meal,
  preferences,
  language,
}: {
  location: Location;
  meal?: string | null;
  preferences: string[];
  language: string;
}) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const keyword = `${meal ?? ''} ${preferences.join(' ')}`.trim();
  const langMap: Record<string, string> = {
    en: 'en',
    zh: 'zh-TW',
  };

  const googleLang = langMap[language] || 'en';

  // 換算半徑為4km緯經度時的矩形範圍(locationRestriction 時，只能將區域指定為矩形檢視區塊)
  const radius = 4000;
  const lat = location.lat;
  const lng = location.lng;
  const deltaLat = radius / 111000; // 1度緯度 ≈ 111km
  const deltaLng = radius / (111000 * Math.cos((lat * Math.PI) / 180)); // 經度隨緯度修正

  const locationRestriction = {
    rectangle: {
      low: { latitude: lat - deltaLat, longitude: lng - deltaLng },
      high: { latitude: lat + deltaLat, longitude: lng + deltaLng },
    },
  };

  const res = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey || '',
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.rating,places.photos',
    },
    body: JSON.stringify({
      textQuery: `${keyword} restaurant`,
      languageCode: googleLang,
      locationRestriction, // 限制在特定區域
      pageSize: 20,
    }),
  });

  const data = await res.json();
  console.log('gogole map data:', JSON.stringify(data, null, 2));

  // 將Goolge Places API新版照片物件轉換成舊版可用 URL
  const getPhotoUrl = (photo?: GooglePlacePhoto, maxWidth = 400) => {
    if (!photo) return null;

    // 新版photo.name格式： "places/ChIJwa_W3cQjQRVgv24npgmoo/photos/ABC"，取 photoreference：ABC
    const parts = photo.name.split('/');
    const photoreference = parts[parts.length - 1];
    return photoreference
      ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoreference}&key=${apiKey}`
      : null;
  };

  return (
    data.places
      .sort((a: GooglePlaceResult, b: GooglePlaceResult) => (b.rating ?? 0) - (a.rating ?? 0))
      // .slice(0, 10)
      .map((place: GooglePlaceResult) => ({
        name: place.displayName?.text,
        address: place.formattedAddress,
        place_id: place.id,
        rating: place.rating,
        photoUrl: getPhotoUrl(place.photos?.[0]),
        google_maps_url: `https://www.google.com/maps/place/?q=place_id:${place.id}`,
      }))
  );
}
