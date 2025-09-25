import clsx from "clsx";
import type { DataStructure } from '@/types';

interface MealSelectorProps {
  data: DataStructure;
  loading: boolean;
  selectedMeal: string;
  onSelectMeal: (meal: string) => void;
}

export default function MealSelector({ data, loading, selectedMeal, onSelectMeal }: MealSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-1">
        { data.subTitles.meal }
      </h3>
      <div className="flex flex-wrap justify-center gap-1 sm:gap-3">
        {data.meals.map(option => (
          <button
            key={option}
            disabled={loading}
            onClick={() => onSelectMeal(option)}
            className={ clsx(
              'btn',
              option === selectedMeal  && 'btn--selected',
              loading && 'cursor-not-allowed'
            )}>
            { option }
          </button>
        ))}
      </div>
    </div>
  )
}