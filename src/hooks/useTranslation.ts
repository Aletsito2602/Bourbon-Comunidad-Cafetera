"use client";

import { useState, useEffect } from 'react';
import { Language, getTranslation } from '@/constants/i18n';

export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>("es-AR");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Restore language preference from localStorage
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('bourbon_lang') : null;
    if (stored && (stored === "es-AR" || stored === "en-US" || stored === "pt-BR")) {
      setLanguage(stored as Language);
    }
    setIsLoaded(true);
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('bourbon_lang', lang);
    }
  };

  const t = (key: string): string => {
    // Return key if not loaded yet to prevent hydration issues
    if (!isLoaded) return key;
    return getTranslation(language, key);
  };

  return {
    language,
    changeLanguage,
    t,
    isLoaded
  };
};
