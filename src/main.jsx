import { createRoot } from "react-dom/client";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import App from "./App";
import React, { Suspense } from "react";

// studio.initialize();
// studio.extend(extension);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={null}>
      <App />
    </Suspense>
  </React.StrictMode>
);
