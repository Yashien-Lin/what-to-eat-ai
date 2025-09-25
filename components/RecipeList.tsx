
import { Recipe } from "@/types"

interface RecipeListProps {
  recipes: Recipe[];
  title: string;
  recommendLabel: string;
  ingredientsLabel: string;
  instructionLabel: string;
}

export default function RecipeList({
  recipes,
  title,
  recommendLabel,
  ingredientsLabel,
  instructionLabel
}: RecipeListProps) {
  return (
    <div className="max-w-3xl mx-auto mb-8 space-y-6 text-sm sm:text-base">
      <h2>🍽️ { title }</h2>
      
      {/* 單欄卡片 */}
      {recipes.map((recipe, index) => (
        <div key={`recipe_${index}`} className="w-full p-4 bg-white shadow-sm rounded-xl">
          {/* 食譜標題 */}
          <h3 className="mb-2 text-start">🍳 { recipe.name }</h3>

          {/* 推薦理由 */}
          <div className="mb-3 text-sm text-gray-600">
            💡 <label><strong>{ recommendLabel }：</strong></label>
            <p>{ recipe.reason || '無提供' }</p>
          </div>

          {/* 食材清單 */}
          <div className="mb-3 text-sm text-gray-700">
            🛒 <label><strong>{  ingredientsLabel } ：</strong></label>
            <p>{ recipe.ingredients.join('、') }</p>
          </div>
          {/* 步驟說明 */}
          <div>
            <p className="mb-1 text-sm font-medium text-gray-700">👨‍🍳 <strong>{ instructionLabel }：</strong></p>
            <ol className="pl-4 space-y-1 text-sm text-gray-700 list-decimal">
              {recipe.steps.map((step, index) => (
                  <li key={`step_${index}`}>{ step }</li>
                ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
}