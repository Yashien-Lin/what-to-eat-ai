"use client"
import clsx from "clsx";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import MealSelector from "@/components/MealSelector"
import SceneSelector from "@/components/SceneSelector";
import LoadingAnimation from "@/components/LoadingAnimation"
import PreferenceSelector from "@/components/PreferenceSelector";
import RestaurantList from "@/components/RestaurantList";
import RecipeList from "@/components/RecipeList";
import locales from "@/locales";
import type { Language, Recipe, Restaurant } from "@/types/index";

type Location = {
  lat: number,
  lng: number
}

type ResultType = 'recipe' | 'restaurant' | null;

export interface Selected {
  meal: string,
  scene: string,
  preferences: string[]
}

export default function Home() {
  
  // i18n
  const [language, setLanguage] = useState<Language>('en');
  const [selected, setSelected] = useState<Selected>({
    meal: '',
    scene: '',
    preferences: []
  })
  const [resultType, setResultType] = useState<ResultType>(null); // 搜尋類型
  const [restaurantList, setRestaurantList] = useState<Restaurant[]>([]);
  const [recipeList, setRecipeList] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  
  const data = locales[language];

  useEffect(() => {
    setSelected({
      meal: '',
      scene: '',
      preferences: []
    })
  }, [language])

  const getRecommendation = async () => {
    if (!selected.scene) {
      alert(
        language === 'en'
          ? 'Please select where you plan to dine'
          : '請先選擇你打算在哪裡用餐'
      )
      return;
    }

    setLoading(true);
    setNoData(false);
    setRecipeList([]);
    setRestaurantList([]);
    setResultType(null);

    // 判斷選擇場景
    const scene = selected.scene
    const isHome = scene === '自己煮' || scene === 'Home Cooking'
    const isOut = scene === '外面吃' || scene === 'Dining Out'

    if (isHome) {
      // 呼叫推薦餐點 API
      const data = await fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify({
          meal: selected.meal,
          scene,
          preferences: selected.preferences,
          language: language
        })
      }).then(res => res.json());

      setRecipeList(data);
      setResultType('recipe');
      
    } else if (isOut) {
      await getNearbyRestaurants();
    } 
    setLoading(false);
  }

  // 呼叫google api，取得定位及附近餐廳
  const getNearbyRestaurants = async () => {
    const { lat, lng } = await getUserLocation()
    const keyword = `${selected.meal} ${selected.scene} ${selected.preferences.join(' ')}`

    const data = await fetch('/api/restaurants', {
      method: 'POST',
      body: JSON.stringify({lat, lng, keyword, language: language })
    }).then(data => data.json());
    
    setResultType('restaurant');
    
    if (data.length > 0) {
      setRestaurantList(data);
    } else {
      setNoData(true);
    }
  }

  // 取得使用者位置
  const getUserLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          resolve({ lat, lng })
        },
        (err) => reject(err)
      )
    })
  }

  return (
    <div className="min-h-screen p-4 mx-auto">
      {/* 中英切換按鈕 */}
      <LanguageSwitcher language={language} setLanguage={setLanguage} loading={loading} />
      <div className="max-w-2xl p-6 mx-auto">
        <h1 className="mb-6">🍲{ data.title }</h1>

        {/* Step 1: 時段選擇 */}
        <MealSelector
          data={data}
          loading={loading}
          selectedMeal={selected.meal}
          onSelectMeal={meal =>
            setSelected(prev => ({...prev, meal}))
        }/>
      
        {/* Step 2: 場景選擇 */}
        <SceneSelector
          data={data}
          loading={loading}
          selectedScene={selected.scene}
          onSelectScene={scene =>
            setSelected(prev => ({...prev, scene}))
        }/>

        {/* Step 3: 偏好選擇 */}
        <PreferenceSelector
          data={data}
          loading={loading}
          selectedPreferences={selected.preferences}
          onSelectPreferences={(prefs: string[]) =>
            setSelected((prev) => ({ ...prev, preferences: prefs }))
          }
        />
      </div>
    
      {/* 送出按鈕 */}
      <div className="my-5 text-center">
        <button
          className={clsx('px-6 py-3 text-white transition rounded-full', loading ? 'bg-gray-400 cursor-not-allowed': 'bg-purple-800  hover:bg-purple-900')}
          onClick={() => getRecommendation()}
          disabled={loading}
        >
          🤖 { data.submit }
        </button>
      </div>
      {loading && (
        <LoadingAnimation scene={selected.scene} recipeMessage={data.makingRecipe} restaurantMessage={data.searchingMeals}/>
      )}

      {/* 分隔線 */}
      {!loading && <hr className="my-8 border-t-2 border-purple-200" />}

      {/* 食譜列表 */}
      {resultType === 'recipe' && ( 
        <RecipeList
          recipes={recipeList} 
          title={data.mealsTitle}
          recommendLabel={data.recommend}
          ingredientsLabel={data.ingredients}
          instructionLabel={data.instruction}
        />
      )}
      {/* 餐廳列表 */}
      {resultType === 'restaurant' && (
        noData ? (
          <h3 className="my-8 text-gray-500">{data.noRestaurants}</h3>
        ) : (
          <RestaurantList restaurants={restaurantList} language={language} title={data.mealsTitle} />
        )
      )}
    </div>
  );
}
