import clsx from "clsx";
import { Analysis, Scene, Mode } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface MealAnalysisCardProps {
  analysis: Analysis;
  mode: Mode;
}

export default function MealAnalysisCard({
  analysis,
  mode,
}: MealAnalysisCardProps) {
  const { confidence, mood, intent_summary, scene } = analysis;
  const { messages } = useLanguage();

  const mealIntent =
    scene === "home" ? analysis.preferred_cuisine : analysis.preferred_cuisine;

  const followUpQuestions = analysis.follow_up_questions ?? [];

  // 根據信心值決定語氣
  const message =
    confidence > 0.85
      ? messages.analysisCard.confidenceLevel.high
      : confidence > 0.6
        ? messages.analysisCard.confidenceLevel.medium
        : messages.analysisCard.confidenceLevel.low;

  // 信心值視覺條
  const percent = Math.round(confidence * 100);

  if (!intent_summary && !mood && !mealIntent?.length) {
    return null;
  }

  return (
    <>
      <h2>{messages.analysisCard.title}</h2>
      {/* 第二層：分析結果標籤 */}
      <div className="p-4 border border-purple-300 rounded-xl bg-blue-50 mb-4">
        <div className="mb-4">
          <h3 className="mb-2 text-start">{messages.analysisCard.mood}</h3>
          <div className="flex flex-wrap gap-2">
            {mood?.split("，").map((m, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 text-start">
            {messages.analysisCard.mealIntent}
          </h3>
          <div className="flex flex-wrap gap-2">
            {mealIntent?.map((meal, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
              >
                {meal}
              </span>
            ))}
          </div>
        </div>
      </div>
      {/* 信心提示 */}
      <div className="p-4 border border-purple-300 rounded-xl bg-blue-50 mb-6">
        <div className="flex flex-col sm:flex-row justify-between mb-3 text-sm space-y-2 sm:space-y-0">
          <span className="font-semibold">{message}</span>
          <div className="text-end">
            <span className="px-2 py-1 mr-1 bg-purple-500 text-white rounded-full text-xs">
              {percent ? percent : 0}%
            </span>
            <span>{messages.analysisCard.match}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={clsx("h-2 rounded-full", percent ? "bg-purple-600" : "")}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* ❓ 低信心補問 */}
      {confidence < 0.6 &&
        followUpQuestions?.length > 0 &&
        mode === "prompt" && (
          <div className="p-4 border-l-4 border-yellow-400 bg-yellow-50 rounded mb-6 text-sm">
            <div className="font-semibold mb-2">
              <span className="mr-2">📌</span>
              <span>{messages.analysisCard.moreInfo}:</span>
            </div>
            <ul>
              {followUpQuestions?.map((question, i) => (
                <li key={i}>- {question}</li>
              ))}
            </ul>
          </div>
        )}
    </>
  );
}
