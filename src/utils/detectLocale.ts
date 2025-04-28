export function detectLocaleByDomain() {
  const forcedLocale = import.meta.env.VITE_FORCE_LOCALE;
  if (forcedLocale) return forcedLocale;

  const host = window.location.hostname;

  if (host.includes("mercadolibre.com.br")) {
    return "pt";
  } else {
    return "es";
  }
}
