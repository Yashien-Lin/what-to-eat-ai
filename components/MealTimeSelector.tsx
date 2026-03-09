import clsx from "clsx";
import { Mealtime } from "@/types";
import { useLanguage } from "@/context/LanguageContext";

interface MealTimeSelectorProps {
  value: Mealtime | null;
  onChange: (m: Mealtime | null) => void;
  loading: boolean;
}

const MEALS: Mealtime[] = ["breakfast", "lunch", "dinner", "midnight"];

export default function MealTimeSelector({
  value,
  onChange,
  loading,
}: MealTimeSelectorProps) {
  const { messages } = useLanguage();

  return (
    <div className="mb-6">
      <h3 className="mb-3">{messages.meals.title}</h3>
      <div className="flex gap-2 justify-center items-center">
        {MEALS.map((m) => (
          <button
            key={m}
            disabled={loading}
            onClick={() => onChange(m)}
            className={clsx(
              "btn",
              value === m ? "btn--selected" : "",
              m === "midnight" ? "leading-none sm:leading-[1.5]" : "",
            )}
          >
            {messages.meals[m]}
          </button>
        ))}
      </div>
    </div>
  );
}
