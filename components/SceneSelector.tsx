import clsx from "clsx";
import type { DataStructure } from '@/types';

interface MealSelectorProps {
  data: DataStructure;
  selectedScene: string;
  onSelectScene: (meal: string) => void;
}

export default function MealSelector({ data, selectedScene, onSelectScene }: MealSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="mb-1 text-lg font-semibold text-center text-gray-800">
        { data.subTitles.scene }
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {
          data.scenes.map(option => (
            <button
              key={option}
              onClick={() => onSelectScene(option)}
              className={ clsx(
              'btn',
              option === selectedScene && 'btn--selected'
            )}>
              { option }
            </button>
          ))
        }
      </div>
    </div>
  )
}