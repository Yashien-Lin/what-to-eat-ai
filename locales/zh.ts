import type { DataStructure } from '@/types';

const zh: DataStructure = {
  title: '今天吃什麼？',
  subTitles: {
    meal: '請選擇用餐時段',
    scene: '你打算在哪裡用餐？',
    preference: '請勾選飲食偏好（可複選）'
  },
  mealTitle: '請選擇用餐時段',
  meals: ['早餐', '午餐', '晚餐', '宵夜'],
  scenes: ['自己煮', '外面吃'],
  preferences: [
    ['小吃', '便當', '餐廳'], 
    ['不吃辣', '不吃海鮮', '素食'],
    ['不吃澱粉', '低碳', '清爽', '重口味'],
    ['需含肉', '需含菜', '需含蛋白質'],
    ['飯類', '麵類', '醬汁類', '甜食', '點心'],
    ['中式料理', '美式料理', '歐式料理', '地中海料理','中東料理', '印度料理', '日式料理', '韓式料理', '東南亞料理'], 
  ],
  submit: '來點美味的吧，AI！',
  makingRecipe: ' AI 正在為您客製專屬菜單...',
  recipeTitle: '專屬你的美味上桌囉！',
  searchingMeals: 'AI 美食雷達偵測中...',
  mealsTitle: 'AI 為您精選推薦 ！',
  recommend: '推薦理由',
  ingredients: '食材',
  instruction: '作法',
  noRestaurants: '附近沒有符合的餐廳 🥲'
}

export default zh;

