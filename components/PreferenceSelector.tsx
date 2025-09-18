import clsx from "clsx";
import type { DataStructure } from '@/types';

interface PreferenceSelectorProps {
  data: DataStructure;
  selectedPreferences: string[];
  onSelectPreferences: (prefs: string[]) => void;
}

export default function MealSelector({ data, selectedPreferences, onSelectPreferences }: PreferenceSelectorProps) {
  const togglePreference = (pref: string) => {
    if (selectedPreferences.includes(pref)) {
      onSelectPreferences(selectedPreferences.filter((p) => p !== pref));
    } else {
      onSelectPreferences([...selectedPreferences, pref]);
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
      <h2 className="mb-3 text-lg font-semibold text-center text-gray-800">
        { data.subTitles.preference }
      </h2>
      {
        data.preferences.map((group, groupIndex) => (
          <div key={`group_${groupIndex}`} className="flex flex-wrap justify-center gap-2 mb-2">
            {
              group.map(option => (
                <button
                  key={option}
                  onClick={() => togglePreference(option)}
                  className={clsx(
                    'btn-small',
                    selectedPreferences.includes(option) && 'btn-small--selected'
                  )}
                >
                  { option }
                </button>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}