/* eslint-disable react/no-unknown-property */
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { getProject, val } from "@theatre/core";
import studio from "@theatre/studio";
import { editable as e, SheetProvider, PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import { Gltf, ScrollControls, useScroll } from "@react-three/drei";

studio.initialize();

// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject("Fly Through").sheet("Scene");

const App = () => {
  return (
    <Canvas
    gl={{ preserveDrawingBuffer: true }}
      style={{
        width: "100vw",
        height: "100vh",
      }}
    >
      <ScrollControls pages={5}>
        <SheetProvider sheet={demoSheet}>
          <Scene />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
  );
};

const Scene = () => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  const bgColor = "#84a4f4";
  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" color={bgColor} near={-4} far={10} />

     

      <ambientLight intensity={0.5} />
      <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />


      <Gltf src="/environment.glb" castShadow receiveShadow />


      <PerspectiveCamera theatreKey="Camera" makeDefault position={[0, 0, 0]} fov={85} near={0.1} far={70} />
     
    </>
  );
};
export default App;
