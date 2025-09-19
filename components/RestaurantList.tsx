import { Language } from '@/types';
import { Restaurant } from '@/types';
import Image from 'next/image';

interface RestaurantListProps {
  restaurants: Restaurant[];
  language: Language;
  title: string;
}

export default function RestaurantList({ restaurants, language = "en", title }: RestaurantListProps) {
  function getPhotoUrl(photoRef: string, maxWidth = 100) {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

    const thumbnailUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${maxWidth}&photoreference=${photoRef}&key=${apiKey}`
    return thumbnailUrl;
  }

  const openMap = (url: string) => {
    window.open(url, '_blank')
  }

  return (
    <div className="p-5 mt-6 bg-white rounded-lg">
      <h2 className="mb-5">🎯 { title }</h2>
      {restaurants.map(restaurant => (
        <div
          key={restaurant.place_id}
          className="flex items-center p-3 mb-4 transition bg-purple-100 border-purple-300 rounded-lg shadow cursor-pointer hover:shadow-md hover:bg-purple-200"
          onClick={() => openMap(restaurant.mapUrl)}
        >
          {
            restaurant.photos && restaurant.photos.length > 0 ? (
              <Image
                src={getPhotoUrl(restaurant.photos[0].photo_reference)}
                width={64}
                height={64}
                className="object-cover w-16 h-16 mr-3 rounded"
                alt="restaurant photo"
                priority
              />
            ) : (
              <div className="flex items-center justify-center w-16 h-16 mr-3 text-sm text-gray-400 bg-gray-200 rounded">
                No Image
              </div>
            )
          }

          <div className="flex-1 overflow-hidden">
            <h4 className="text-left truncate">{ restaurant.name }</h4>
            <p className="text-xs text-gray-500 truncate">{ restaurant.address }</p>
            <a
              href={restaurant.mapUrl}
              target="_blank"
              className="inline-block mt-1 text-sm font-bold text-purple-600"
              onClick={(e) => e.stopPropagation()}
            >
              { language === 'zh' ? '🗺️ 查看地圖' : '🗺️ View Map' }
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}