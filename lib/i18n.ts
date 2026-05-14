export type AppLanguage = "es" | "en";

export function normalizeLanguage(value?: string | null): AppLanguage {
  return value === "en" ? "en" : "es";
}

export function languageSearchParam(language: AppLanguage) {
  return language === "en" ? "?lang=en" : "";
}
