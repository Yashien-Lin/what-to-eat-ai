import { useState } from "react";
import { getUserLocation } from "@/utils/getUserLocation";
import type {
  Recipe,
  Restaurant,
  Scene,
  ApiResult,
  Location,
  Language,
} from "@/types";

interface RecommendationParams {
  scene: Scene;
  input: string;
  locale: Language;
}

export function useRecommendation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ApiResult | null>(null);

  const ensureLocation = async () => {
    if (location) return location;

    const newLocation = await getUserLocation();
    setLocation(newLocation);
    return newLocation;
  };

  const resetResults = () => {
    setResults(null);
  };

  const getRecommendation = async ({
    scene,
    input,
    locale,
  }: RecommendationParams) => {
    setResults(null);

    try {
      let userLocation = null;
      if (scene === "dine_out") {
        userLocation = await ensureLocation();
      }
      setLoading(true);

      const res = await fetch("/api/get-recommendation", {
        method: "POST",
        body: JSON.stringify({
          scene,
          input,
          location: userLocation,
          language: locale,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error);
      }

      const data: ApiResult = await res.json();

      setResults(data);
    } catch (error) {
      console.error("error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    resetResults,
    getRecommendation,
  };
}
