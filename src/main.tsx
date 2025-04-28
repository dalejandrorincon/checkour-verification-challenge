import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { VerificationForm } from "./components/Form/VerificationForm";
import { changeLanguage } from "@utils/i18n";
import { detectLocaleByDomain } from "@utils/detectLocale";

const root = createRoot(document.getElementById("root")!);

(async () => {
  const detectedLocale = detectLocaleByDomain();
  await changeLanguage(detectedLocale);
  root.render(
    <StrictMode>
      <VerificationForm />
    </StrictMode>
  );
})();
