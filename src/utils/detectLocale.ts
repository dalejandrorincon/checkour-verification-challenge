export function detectLocaleByDomain() {
  const host = window.location.hostname;

  if (host.includes("mercadolibre.com.br")) {
    return "pt";
  } else {
    return "es";
  }
}
