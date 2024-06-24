import * as THREE from "three";
import { createRoot } from "react-dom/client";
import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { getProject } from "@theatre/core";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { editable as e, SheetProvider } from "@theatre/r3f";
import { PerspectiveCamera } from "@theatre/r3f";

studio.initialize();
studio.extend(extension);

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject("Demo Project").sheet("Demo Sheet");

const App = () => {
  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <SheetProvider sheet={demoSheet}>
        <PerspectiveCamera theatreKey="Camera" makeDefault position={[5, 5, -5]} fov={75} />

        <ambientLight />
        <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
        <e.mesh theatreKey="Cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </e.mesh>
      </SheetProvider>
    </Canvas>
  );
};

createRoot(document.getElementById("root")).render(<App />);
