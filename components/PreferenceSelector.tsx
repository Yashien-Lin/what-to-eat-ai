import clsx from "clsx";
import type { DataStructure } from '@/types';

interface PreferenceSelectorProps {
  data: DataStructure;
  loading: boolean;
  selectedPreferences: string[];
  onSelectPreferences: (prefs: string[]) => void;
}

export default function MealSelector({ data, loading, selectedPreferences, onSelectPreferences }: PreferenceSelectorProps) {
  const togglePreference = (pref: string) => {
    if (selectedPreferences.includes(pref)) {
      onSelectPreferences(selectedPreferences.filter((p) => p !== pref));
    } else {
      onSelectPreferences([...selectedPreferences, pref]);
    }
  }

  return (
    <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
      <h3 className="mb-3">
        { data.subTitles.preference }
      </h3>
      {
        data.preferences.map((group, groupIndex) => (
          <div key={`group_${groupIndex}`} className="flex flex-wrap justify-center gap-2 mb-2">
            {
              group.map(option => (
                <button
                  key={option}
                  disabled={loading}
                  onClick={() => togglePreference(option)}
                  className={clsx(
                    'btn-small',
                    selectedPreferences.includes(option) && 'btn-small--selected',
                    loading && 'cursor-not-allowed'
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