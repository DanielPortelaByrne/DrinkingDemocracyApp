import { AppLanguage, DEFAULT_LANGUAGE } from "../../constants/Languages";
import en from "../../languages/en.json";
import es from "../../languages/es.json";
import ga from "../../languages/ga.json";
import pl from "../../languages/pl.json";
import { LanguageData } from "./LanguageData";

const english = en as LanguageData;

const translations: Record<AppLanguage, Partial<LanguageData>> = {
  English: english,
  Irish: ga,
  Polish: pl,
  Spanish: es,
};

const resolvedTranslations = Object.fromEntries(
  Object.entries(translations).map(([language, translation]) => [
    language,
    Object.freeze({ ...english, ...translation }),
  ])
) as Record<AppLanguage, LanguageData>;

export const getLanguageData = (
  language: AppLanguage = DEFAULT_LANGUAGE
): LanguageData => resolvedTranslations[language];

// Kept as a hook-shaped API so screens can use the translations declaratively.
export const useLanguage = (language: AppLanguage = DEFAULT_LANGUAGE) =>
  getLanguageData(language);
