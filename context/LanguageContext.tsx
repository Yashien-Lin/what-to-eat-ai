"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Language } from "@/types";
import en from "@/messages/en";
import zh from "@/messages/zh";

type Messages = typeof en;

interface LanguageContextType {
  locale: Language;
  messages: Messages;
  setLocale: (locale: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Language>("en");

  const messages = locale === "en" ? en : zh;

  return (
    <LanguageContext.Provider value={{ locale, setLocale, messages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
