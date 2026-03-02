import { Restaurant } from '@/types';
import Rating from '@mui/material/Rating';
import { useLanguage } from '@/context/LanguageContext';

export default function RestaurantList({ restaurants }: { restaurants: Restaurant[] }) {
  const { messages } = useLanguage();

  const openMap = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <h2>🎯 {messages.result.restaurant.mealsTitle}</h2>
      <div className="border border-purple-300 bg-blue-50 rounded-lg text-sm sm:text-base p-4 md:p-7 space-y-4">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.place_id}
            className="border border-purple-200 flex items-center p-3 transition bg-purple-100 
              rounded-lg shadow cursor-pointer hover:shadow-md hover:bg-purple-200"
            onClick={() => openMap(restaurant.google_maps_url)}
          >
            {restaurant.photoUrl ? (
              <img
                src={restaurant.photoUrl || '/no-image.png'}
                className="object-cover mr-3 rounded w-18 h-18"
                alt={restaurant.name}
                loading="lazy"
              />
            ) : (
              <div className="flex items-center justify-center w-16 h-16 mr-3 text-xs text-gray-400 bg-gray-200 rounded">
                No Image
              </div>
            )}

            <div className="flex flex-col overflow-hidden">
              <h4 className="text-left mb-0 truncate">{restaurant.name}</h4>
              <p className="text-xs text-gray-500 truncate">{restaurant.address}</p>
              <Rating value={restaurant.rating} precision={0.5} size="small" readOnly />
              <a
                href={restaurant.google_maps_url}
                target="_blank"
                className="mt-1 text-sm font-bold text-purple-700"
                onClick={(e) => e.stopPropagation()}
              >
                <span>🗺️</span>
                <span className="ms-1 text-xs sm:text-sm">
                  {messages.result.restaurant.checkMap}
                </span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
