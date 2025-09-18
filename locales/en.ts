import type { DataStructure } from '@/types';

const en: DataStructure = {
  title: 'What to Eat Today?',
  subTitles: {
    meal: 'Select a Meal Time',
    scene: 'Where Are You Eating?',
    preference: 'Select Your Food Preferences (Multiple Select)'
  },
  mealTitle: 'Nearby Eats from AI',    
  meals: ['Breakfast', 'Lunch', 'Dinner', 'Midnight Snack'],
  scenes: ['Home Cooking', 'Dining Out'],
  preferences: [
    ['Street food', 'Bento', 'Restaurant'],
    ['No spicy food', 'No seafood', 'Vegetarian'],
    ['No carbs', 'Low carbs', 'Light', 'Strong flavor'],
    ['Must contain meat', 'Must contain vegetables', 'Must contain protein'],
    ['Rice dishes', 'Noodle dishes', 'Saucy dishes', 'Desserts', 'Snacks'],
    ['Chinese cuisine', 'American cuisine', 'European cuisine', 'Mediterranean cuisine', 'Middle Eastern cuisine', 'Indian cuisine', 'Japanese cuisine', 'Korean cuisine', 'Southeast Asian cuisine'],
  ],
  submit: 'Feed Me, AI!',
  makingRecipe: 'Cooking up your custom menu...',
  recipeTitle: 'Dishes Cooked Just for You!',
  searchingMeals: 'Looking for tasty bites nearby...',
  mealsTitle: 'Handpicked by AI – Delish Inside!',
  recommend: 'Why Recommended',
  ingredients: 'Ingredients',
  instruction: 'Instruction',
  noRestaurants: "No matching restaurants nearby 🥲"
}

export default en;