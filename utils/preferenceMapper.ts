import zh from "@/messages/zh";
import en from "@/messages/en";
import { Language, Preference } from "@/types";

const localeMessages = { zh, en };

export function preferenceMapper(preferences: Preference[], locale: Language) {
  const localizedPreferences = localeMessages[locale].preferences;

  return preferences.map((item) => localizedPreferences[item]);
}
