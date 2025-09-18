export type Language = 'zh' | 'en';

export interface DataStructure {
  title: string;
  subTitles: {
    meal: string;
    scene: string;
    preference: string;
  };
  mealTitle: string;
  meals: string[];
  scenes: string[];
  preferences: string[][];
  submit: string;
  makingRecipe: string;
  recipeTitle: string;
  searchingMeals: string;
  mealsTitle: string;
  recommend: string;
  ingredients: string;
  instruction: string;
  noRestaurants: string
}
