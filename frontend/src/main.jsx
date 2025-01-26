import { createRoot } from "react-dom/client";
import "./index.css";
import { StrictMode } from "react";
import RoutesProvider from "./routes";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoutesProvider />
  </StrictMode>
);
