"use client";

import { useState, useEffect } from "react";
import { Language, getTranslation } from "@/constants/i18n";

const isValidLang = (v: string | null): v is Language =>
  v === "es-AR" || v === "en-US" || v === "pt-BR";

// SSR estable: devolver un idioma fijo para no romper la hidratación
const getSSRInitialLang = (): Language => "es-AR";

// Cliente: detectar preferencia guardada o idioma del navegador
const detectClientLang = (): Language => {
  try {
    const stored = window.localStorage.getItem("bourbon_lang");
    if (isValidLang(stored)) return stored;

    const nav =
      (navigator.language || navigator.languages?.[0] || "es").toLowerCase();

    if (nav.startsWith("pt")) return "pt-BR";
    if (nav.startsWith("en")) return "en-US";
    return "es-AR";
  } catch {
    return "es-AR";
  }
};

export const useTranslation = () => {
  // Igualamos el estado inicial (SSR) para evitar mismatch
  const [language, setLanguage] = useState<Language>(getSSRInitialLang());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const lang = detectClientLang();
    setLanguage(lang);
    setMounted(true);
  }, []);

  // Mantener <html lang="..."> sincronizado
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", language);
    }
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    try {
      window.localStorage.setItem("bourbon_lang", lang);
    } catch {}
  };

  // Siempre devolver una traducción (getTranslation ya tiene fallback)
  const t = (key: string): string => {
    return getTranslation(language, key);
  };

  return {
    language,
    changeLanguage,
    t,
    isLoaded: mounted,
  };
};
