'use client';

import clsx from 'clsx';
import type { Mode } from '@/types/index';
import { useLanguage } from '@/context/LanguageContext';

interface ModeSelectorProps {
  value: Mode;
  onChange: (mode: Mode) => void;
  loading: boolean;
}

const MODE: Mode[] = ['manual', 'prompt'];

export default function ModeSelector({ loading, value, onChange }: ModeSelectorProps) {
  const { messages } = useLanguage();

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 gap-4">
        {MODE.map((mode) => (
          <button
            key={mode}
            disabled={loading}
            onClick={() => onChange(mode)}
            className={clsx('rounded-xl btn-big p-3', value === mode ? 'btn-big--selected' : '')}
          >
            <p className="sm:text-lg font-semibold">{messages.modes[mode].label} </p>
            <p
              className={`mt-1 text-xs sm:text-sm 
              ${value === mode ? 'text-white' : 'text-gray-500'}`}
            >
              {messages.modes[mode].description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
