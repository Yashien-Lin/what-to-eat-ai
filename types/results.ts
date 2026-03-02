import { Recipe, Restaurant } from './';

export interface Results {
  confidence: number;
  mood: string;
  intent_summary: string;
  restaurant_strategy?: {
    keywords: string[];
    preferred_cuisine: string[];
  };
  recipe_strategy?: {
    keywords: string[];
    preferred_cuisine: string[];
  };
  restaurants?: Restaurant[];
  recipes?: Recipe[];
  follow_up_questions?: string[];
}
