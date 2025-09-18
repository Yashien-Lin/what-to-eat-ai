import clsx from "clsx";
import type { Language } from "@/types";

interface LanguageSwitcherProps {
  language: Language;
  setLanguage: (language: Language) => void;
};

export default function LanguageSwitcher({language, setLanguage}: LanguageSwitcherProps) {
  const options: {label: string, value: Language}[] = [
    {label: '中文', value: 'zh'},
    {label: 'EN', value: 'en'}
  ]
  
  return (
    <div className="text-right">
      <div className="inline-flex overflow-hidden text-sm border border-purple-600 rounded-full">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => setLanguage(opt.value)}
            className={clsx(
              'w-[60px] px-4 py-1 transition',
              language === opt.value
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-purple-100'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}