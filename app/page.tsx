"use client";

import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ModeSelector from "@/components/ModeSelector";
import MealTimeSelector from "@/components/MealTimeSelector";
import SceneSelector from "@/components/SceneSelector";
import PersonalizedButton from "@/components/PersonalizedButton";
import LoadingAnimation from "@/components/LoadingAnimation";
import PreferenceSelector from "@/components/PreferenceSelector";
import RestaurantList from "@/components/RestaurantList";
import RecipeList from "@/components/RecipeList";
import PromptInput from "@/components/PromptInput";
import MealAnalysisCard from "@/components/MealAnalysisCard";
import { useRecommendation } from "@/hooks/useRecommendation";
import type { Mode, Mealtime, Scene, Preference } from "@/types/index";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { messages, locale } = useLanguage();
  const [mode, setMode] = useState<Mode>("manual");
  const [scene, setScene] = useState<Scene>("home");
  const [mealtime, setMealtime] = useState<Mealtime | null>(null);
  const [preferences, setPreferences] = useState<Preference[]>([]);
  const [promptInput, setPromptInput] = useState<string>("");

  const { results, loading, resetResults, getRecommendation } =
    useRecommendation();

  // 確認是否可送出
  const manualReady = preferences.length > 0;
  const promptReady = promptInput.trim().length > 0;
  const canSubmit = mode === "manual" ? manualReady : promptReady;

  useEffect(() => {
    setMealtime(null);
    setPreferences([]);
    setPromptInput("");
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
        mode === "manual"
          ? messages.validation.selectPreferences
          : messages.validation.promptInputContent,
      );
      return;
    }

    try {
      const manualSelection =
        mode === "manual"
          ? mealtime
            ? [mealtime, ...preferences].join("、")
            : preferences.join("、")
          : "";

      await getRecommendation({
        scene,
        input: mode === "manual" ? manualSelection : promptInput,
        locale,
      });
    } catch (error) {
      if (error instanceof Error) {
        let message = "";

        switch (error.message) {
          case "PERMISSION_DENIED":
            message = messages.errors.permissionDenied;
            break;
          case "POSITION_UNAVAILABLE":
            message = messages.errors.positionUnavailable;
            break;
          case "TIMEOUT":
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
          <h1>{messages.titles.label}</h1>
          <p className="text-gray-500">{messages.titles.description}</p>
        </header>

        {/* Mode Selection */}
        <ModeSelector value={mode} onChange={setMode} loading={loading} />

        {/* Scene Selection */}
        <SceneSelector value={scene} onChange={setScene} loading={loading} />

        {mode === "manual" && (
          <section className="border border-purple-300 bg-blue-50 rounded-xl p-3 md:py-10 md:px-[64px]">
            {/* Mealtime Selection */}
            <MealTimeSelector
              value={mealtime}
              onChange={setMealtime}
              loading={loading}
            />

            {/* Preferences Selection*/}
            <PreferenceSelector
              values={preferences}
              onChange={setPreferences}
              loading={loading}
            />
          </section>
        )}
        {/* prompt輸入框 */}
        {mode === "prompt" && (
          <PromptInput
            loading={loading}
            value={promptInput}
            onChange={setPromptInput}
          />
        )}
        {/* CTA 送出按鈕 */}
        <div className="my-5 text-center">
          <PersonalizedButton
            submitText={messages.submit}
            loading={loading}
            onClick={handleSubmit}
          />
        </div>
        {/* loading */}
        {loading && <LoadingAnimation scene={scene} />}

        {/* 分隔線 */}
        {results?.result.data && (
          <hr className="my-8 border-t-2 border-gray-300" />
        )}
        {/* 分析需求 */}
        {results && results.analysis && (
          <MealAnalysisCard analysis={results.analysis} mode={mode} />
        )}

        {results && results.result.data && (
          <>
            {/* 食譜列表 */}
            {results.result.type === "recipe" && (
              <RecipeList recipes={results.result.data} />
            )}
            {/* 餐廳列表 */}
            {results.result.type === "restaurant" && (
              <RestaurantList restaurants={results.result.data} />
            )}
          </>
        )}

        {/* 查無結果 */}
        {results && results.result.data.length === 0 && (
          <h2 className="my-8 text-gray-500">{messages.result.noResult}</h2>
        )}
      </div>
    </div>
  );
}
