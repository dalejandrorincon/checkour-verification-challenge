import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationFiles = import.meta.glob("/src/locales/**/translation.ts");

const loadLocales = async (lng: string) => {
  const path = `/src/locales/${lng}/translation.ts`;
  const loader = translationFiles[path];
  if (!loader) throw new Error(`No translations found for locale: ${lng}`);
  const module = (await loader()) as { default: Record<string, string> };
  return module.default;
};

i18n.use(initReactI18next).init({
  lng: "es",
  fallbackLng: "es",
  resources: {},
  interpolation: {
    escapeValue: false,
  },
});

export async function changeLanguage(lng: string) {
  const translations = await loadLocales(lng);
  console.log("Loaded translations for:", lng, translations);
  i18n.addResourceBundle(lng, "translation", translations, true, true);
  i18n.changeLanguage(lng);
}

export default i18n;
