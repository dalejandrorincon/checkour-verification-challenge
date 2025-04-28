import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { changeLanguage } from "@utils/i18n";
import { detectLocaleByDomain } from "@utils/detectLocale";
import { VerificationPage } from "@pages/VerificationPage";
import { BrowserRouter } from "react-router-dom";

const root = createRoot(document.getElementById("root")!);

(async () => {
  const detectedLocale = detectLocaleByDomain();
  await changeLanguage(detectedLocale);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <VerificationPage />
      </BrowserRouter>
    </StrictMode>
  );
})();
