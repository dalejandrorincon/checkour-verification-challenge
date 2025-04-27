import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </div>
  </StrictMode>
);
