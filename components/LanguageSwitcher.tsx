'use client'

import clsx from "clsx";
import type { Language } from "@/types";
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher({loading}: {loading: boolean}) {
  const { locale, setLocale } = useLanguage();
  const languages: {label: string, value: Language}[] = [
    {label: '中文', value: 'zh'},
    {label: 'EN', value: 'en'}
  ]
      
  return (
    <div className="text-right mb-4">
      <div className="inline-flex overflow-hidden text-xs sm:text-sm border border-purple-600 rounded-full">
        {languages.map(opt => (
          <button
            key={opt.value}
            disabled={loading}
            onClick={() => setLocale(opt.value)}
            className={clsx(
              'w-[50px] sm:w-[60px] px-2 sm:px-4 py-1 transition',
              locale === opt.value
                ? 'bg-purple-500 text-white'
                : 'bg-white text-gray-700 hover:bg-purple-100',
                loading && 'cursor-not-allowed'
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  )
}