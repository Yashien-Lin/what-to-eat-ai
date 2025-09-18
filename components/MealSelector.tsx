import clsx from "clsx";
import type { DataStructure } from '@/types';

interface MealSelectorProps {
  data: DataStructure;
  selectedMeal: string;
  onSelectMeal: (meal: string) => void;
}

export default function MealSelector({ data, selectedMeal, onSelectMeal }: MealSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-1 text-lg font-semibold text-center text-gray-800">
        { data.subTitles.meal }
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {data.meals.map(option => (
          <button
            key={option}
            onClick={() => onSelectMeal(option)}
            className={ clsx(
              'btn',
              option === selectedMeal  && 'btn--selected'
            )}>
            { option }
          </button>
        ))}
      </div>
    </div>
  )
}