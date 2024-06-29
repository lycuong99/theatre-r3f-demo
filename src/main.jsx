import { createRoot } from "react-dom/client";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import App from "./App";
import React, { Suspense } from "react";
import Intro from "./Intro";
import "./index.css";

studio.initialize();
studio.extend(extension);
studio.ui.hide();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <Intro>
      <App />
      </Intro>
    </Suspense>
  </React.StrictMode>
);
