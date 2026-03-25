import { Scene } from "@/types";

export interface Recipe {
  name: string;
  reason: string;
  ingredients: string[];
  steps: string[];
}

export interface Restaurant {
  name: string;
  address: string;
  place_id: string;
  rating: number;
  google_maps_url: string;
  photoReference: string;
}

export interface Analysis {
  confidence: number;
  mood: string;
  intent_summary: string;
  scene: Scene;
  keywords: string[];
  preferred_cuisine: string[];
  follow_up_questions: string[];
}

export type ApiResult = {
  analysis: Analysis;
  result:
    | { type: "recipe"; source: "ai"; data: Recipe[] }
    | { type: "restaurant"; source: "google_places"; data: Restaurant[] };
};
