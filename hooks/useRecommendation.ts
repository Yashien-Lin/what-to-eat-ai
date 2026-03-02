import { useState } from 'react';
import { getUserLocation } from '@/utils/getUserLocation';
import type { Recipe, Restaurant, Mode, Scene, Results, Location, Language } from '@/types/index';

interface RecommendationParams {
  scene: Scene;
  input: string;
  locale: Language;
}

export function useRecommendation() {
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [noResult, setNoResult] = useState(false);

  const ensureLocation = async () => {
    if (location) return location;

    const newLocation = await getUserLocation();
    setLocation(newLocation);
    return newLocation;
  };

  const resetResults = () => {
    setRecipeList([]);
    setRestaurantList([]);
    setResults(null);
    setNoResult(false);
  };

  const getRecommendation = async ({ scene, input, locale }: RecommendationParams) => {
    setNoResult(false);
    setRecipeList([]);
    setRestaurantList([]);
    setResults(null);

    try {
      let userLocation = null;
      if (scene === 'dine_out') {
        userLocation = await ensureLocation();
      }
      setLoading(true);

      const data = await fetch('/api/get-recommendation', {
        method: 'POST',
        body: JSON.stringify({
          scene,
          input,
          location: userLocation,
          language: locale,
        }),
      }).then((res) => res.json());
      console.log('ai results:', data);

      setResults(data);

      const resultList = scene === 'dine_out' ? data.restaurants : data.recipes;
      console.log('resultList:', resultList);

      if (resultList.length === 0) {
        setNoResult(true);
        return;
      }

      if (scene === 'dine_out') {
        setRestaurantList(resultList);
      } else {
        setRecipeList(resultList);
      }
    } catch (error) {
      console.log('error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    recipeList,
    restaurantList,
    results,
    loading,
    noResult,
    resetResults,
    getRecommendation,
  };
}
