import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GMATMock from "./gmat.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GMATMock />
  </StrictMode>
);
