'use client';

import { useEffect, useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ModeSelector from '@/components/ModeSelector';
import MealTimeSelector from '@/components/MealTimeSelector';
import SceneSelector from '@/components/SceneSelector';
import PersonalizedButton from '@/components/PersonalizedButton';
import LoadingAnimation from '@/components/LoadingAnimation';
import PreferenceSelector from '@/components/PreferenceSelector';
import RestaurantList from '@/components/RestaurantList';
import RecipeList from '@/components/RecipeList';
import PromptInput from '@/components/PromptInput';
import MealAnalysisCard from '@/components/MealAnalysisCard';
import { useRecommendation } from '@/hooks/useRecommendation';
import type { Mode, Meal, Scene, Preference, Results, Location } from '@/types/index';
import { useLanguage } from '@/context/LanguageContext';

export default function Home() {
  const { messages, locale } = useLanguage();

  const [mode, setMode] = useState<Mode>('manual');
  const [scene, setScene] = useState<Scene>('home');
  const [meal, setMeal] = useState<Meal | null>(null);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [promptInput, setPromptInput] = useState<string>('');

  const {
    recipeList,
    restaurantList,
    results,
    loading,
    noResult,
    resetResults,
    getRecommendation,
  } = useRecommendation();

  // 確認是否可送出
  const manualReady = preferences.length > 0;
  const promptReady = promptInput.trim().length > 0;
  const canSubmit = mode === 'manual' ? manualReady : promptReady;

  useEffect(() => {
    setMeal(null);
    setPreferences([]);
    setPromptInput('');
    resetResults();
  }, [mode]);

  useEffect(() => {
    resetResults();
  }, [scene]);

  const handleSubmit = async () => {
    if (!scene) {
      alert(messages.validation.selectScene);
      return;
    }

    if (!canSubmit) {
      alert(
        mode === 'manual'
          ? messages.validation.selectPreferences
          : messages.validation.promptInputContent,
      );
      return;
    }

    try {
      const manualSelection =
        mode === 'manual'
          ? meal
            ? [meal, ...preferences].join('、')
            : preferences.join('、')
          : '';

      await getRecommendation({
        scene,
        input: mode === 'manual' ? manualSelection : promptInput,
        locale,
      });
    } catch (error) {
      if (error instanceof Error) {
        let message = '';

        switch (error.message) {
          case 'PERMISSION_DENIED':
            message = messages.errors.permissionDenied;
            break;
          case 'POSITION_UNAVAILABLE':
            message = messages.errors.positionUnavailable;
            break;
          case 'TIMEOUT':
            message = messages.errors.timeout;
            break;
          default:
            message = messages.errors.unknown;
        }

        alert(message);
      }
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-6 text-sm sm:text-base">
      {/* 中英切換按鈕 */}
      <LanguageSwitcher loading={loading} />

      <div className="max-w-3xl mx-auto">
        {/* Title */}
        <header className="text-center space-y-2 mb-6">
          <h1 className="">{messages.titles.label}</h1>
          <p className="text-gray-500">{messages.titles.description}</p>
        </header>
        {/* Mode Selection */}
        <ModeSelector value={mode} onChange={setMode} loading={loading} />
        {/* Scene Selection */}
        <SceneSelector value={scene} onChange={setScene} loading={loading} />
        {mode === 'manual' && (
          <section className="border border-purple-300 bg-blue-50 rounded-xl p-3 md:py-10 md:px-[64px]">
            {/* Meal Selection */}
            <MealTimeSelector value={meal} onChange={setMeal} loading={loading} />
            {/* Preferences Selection*/}
            <PreferenceSelector values={preferences} onChange={setPreferences} loading={loading} />
          </section>
        )}
        {mode === 'prompt' && (
          <PromptInput loading={loading} value={promptInput} onChange={setPromptInput} />
        )}
        {/* CTA 送出按鈕 */}
        <div className="my-5 text-center">
          <PersonalizedButton
            submitText={messages.submit}
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
        {loading && <LoadingAnimation scene={scene} />}
        {/* 分隔線 */}
        {(recipeList.length > 0 || restaurantList.length > 0) && (
          <hr className="my-8 border-t-2 border-gray-300" />
        )}
        {/* 分析需求 */}
        {results && <MealAnalysisCard results={results} mode={mode} scene={scene} />}
        {/* 食譜列表 */}
        {scene === 'home' && recipeList.length > 0 && <RecipeList recipes={recipeList} />}
        {/* 餐廳列表 */}
        {scene === 'dine_out' && restaurantList.length > 0 && (
          <RestaurantList restaurants={restaurantList} />
        )}
        {noResult && <h2 className="my-8 text-gray-500">{messages.result.noResult}</h2>}
      </div>
    </div>
  );
}
