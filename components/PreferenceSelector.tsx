import clsx from 'clsx';
import { Preference } from '@/types/preference';
import { useLanguage } from '@/context/LanguageContext';

interface PreferenceSelectorProps {
  values: Preference[];
  onChange: (prefs: Preference[]) => void;
  loading: boolean;
}

const preferenceList: Preference[][] = [
  ['streetFood', 'bento', 'restaurant'],
  ['light', 'strong', 'spicy'],
  ['meat', 'vegetables', 'seafood', 'vegetarian'],
  ['lowCarbs', 'protein', 'lowFat', 'lowCalories'],
  ['rice', 'noodles', 'saucy', 'dessert', 'snack'],
  [
    'chinese',
    'american',
    'european',
    'mediterranean',
    'middleEastern',
    'indian',
    'japanese',
    'korean',
    'southeastAsian',
  ],
];

export default function PreferenceSelector({ values, onChange, loading }: PreferenceSelectorProps) {
  const { messages, locale } = useLanguage();

  const togglePreference = (pref: Preference) => {
    if (values.includes(pref)) {
      onChange(values.filter((p) => p !== pref));
    } else {
      onChange([...values, pref]);
    }
  };

  return (
    <div>
      <h3 className="mb-3">
        {messages.preferences.title}
        <br />
        {locale === 'en' && <span>(multiple select)</span>}
      </h3>
      {preferenceList.map((group, groupIndex) => (
        <div key={`group_${groupIndex}`} className="flex flex-wrap justify-center gap-2 mb-2">
          {group.map((pref) => (
            <button
              key={pref}
              disabled={loading}
              onClick={() => togglePreference(pref)}
              className={clsx('btn', values.includes(pref) && 'btn--selected')}
            >
              {messages.preferences[pref]}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
