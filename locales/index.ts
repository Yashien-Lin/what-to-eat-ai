import en from './en';
import zh from './zh'; // TODO:
import type { Language, DataStructure } from '@/types/i18n';

const locales: Record<Language, DataStructure> = {
  en,
  zh,
};

export default locales;
