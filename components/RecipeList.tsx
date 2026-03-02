import { useLanguage } from '@/context/LanguageContext';
import { Recipe } from '@/types';

export default function RecipeList({ recipes }: { recipes: Recipe[] }) {
  const { messages } = useLanguage();

  return (
    <>
      <h2>🍽️ {messages.result.recipe.recipeTitle}</h2>
      <div className="mb-8 space-y-6 text-sm sm:text-base">
        {/* 單欄卡片 */}
        {recipes.map((recipe, index) => (
          <div
            key={`recipe_${index}`}
            className="border border-purple-200 w-full p-4 bg-white shadow-sm rounded-xl space-y-3"
          >
            {/* 食譜標題 */}
            <h3 className="mb-2">🍳 {recipe.name}</h3>

            {/* 推薦理由 */}
            <div className="text-sm">
              <h4 className="text-start mb-1">💡 {messages.result.recipe.recommend}：</h4>
              <p>{recipe.reason}</p>
            </div>
            {/* 食材清單 */}
            <div className="text-sm">
              <h4 className="text-start mb-1">🛒 {messages.result.recipe.ingredients} ：</h4>
              <p>{recipe.ingredients.join('、')}</p>
            </div>
            {/* 步驟說明 */}
            <div className="text-sm">
              <h4 className="text-start mb-1">👨‍🍳 {messages.result.recipe.instruction}：</h4>
              <ol className="pl-4 space-y-1 text-gray-700 list-decimal">
                {recipe.steps.map((step, index) => (
                  <li key={`step_${index}`} className="mb-0 sm:mb-1">
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
