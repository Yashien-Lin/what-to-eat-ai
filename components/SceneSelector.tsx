import clsx from "clsx";
import type { DataStructure } from '@/types';

interface MealSelectorProps {
  data: DataStructure;
  loading: boolean;
  selectedScene: string;
  onSelectScene: (meal: string) => void;
}

export default function MealSelector({ data, loading, selectedScene, onSelectScene }: MealSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="mb-1">
        { data.subTitles.scene }
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {
          data.scenes.map(option => (
            <button
              key={option}
              disabled={loading}
              onClick={() => onSelectScene(option)}
              className={ clsx(
              'btn',
              option === selectedScene && 'btn--selected',
              loading && 'cursor-not-allowed'
            )}>
              { option }
            </button>
          ))
        }
      </div>
    </div>
  )
}