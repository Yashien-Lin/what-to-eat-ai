import clsx from 'clsx';
import { Meal } from '@/types';
import { useLanguage } from '@/context/LanguageContext';

interface MealTimeSelectorProps {
  value: Meal | null;
  onChange: (meal: Meal | null) => void;
  loading: boolean;
}

const MEALS: Meal[] = ['breakfast', 'lunch', 'dinner', 'midnight'];

export default function MealTimeSelector({ value, onChange, loading }: MealTimeSelectorProps) {
  const { messages } = useLanguage();

  return (
    <div className="mb-6">
      <h3 className="mb-3">{messages.meals.title}</h3>
      <div className="flex gap-2 justify-center items-center">
        {MEALS.map((meal) => (
          <button
            key={meal}
            disabled={loading}
            onClick={() => onChange(meal)}
            className={clsx(
              'btn',
              value === meal ? 'btn--selected' : '',
              meal === 'midnight' ? 'leading-none' : '',
            )}
          >
            {messages.meals[meal]}
          </button>
        ))}
      </div>
    </div>
  );
}
