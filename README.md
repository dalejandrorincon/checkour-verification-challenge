# POC - Checkout Verification

---

## 📝 Descripción

Este proyecto es una **prueba de concepto (POC)** que implementa un **flujo de verificación de usuarios**, integrando **reCAPTCHA v3**, manejo de **query params (token, referrer)**, e **internacionalización (i18n)** con soporte para **usuarios con y sin JavaScript habilitado** (fallback `<noscript>`).

---

## 🚀 Tecnologías utilizadas

- **React + TypeScript**
- **Vite** (build rápido y moderno)
- **TailwindCSS** (utilidades CSS)
- **react-i18next** (internacionalización)
- **Google reCAPTCHA v3** (protección contra bots)

---

## 📂 Estructura del proyecto

```plaintext
checkout-verification/
├── components/
│   ├── Form/
│   ├── Layout/
│   ├── LoadingStates/
├── hooks/
│   ├── useCountries/
├── locales/
│   ├── es/
│   └── pt/
├── pages/
│   └── VerificationPage.tsx
├── shared/
│   ├── types/
├── utils/
│   ├── i18n.ts
│   └── loadRecaptcha.ts
├── public/
│   └── noscript.css  # Estilos del fallback <noscript>
└── index.html        # Punto de entrada + fallback <noscript>
```

## Clonar el repositorio

git clone https://github.com/dalejandrorincon/checkour-verification-challenge.git

## Instalar dependencias

npm install

## Variables de entorno

cp .env.example .env

## Pruebas de i18n en local

Puedes forzar el idioma manualmente:

VITE_FORCE_LOCALE=pt o es

## Ejecutar en desarrollo

npm run dev
