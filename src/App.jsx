/* eslint-disable react/no-unknown-property */
import "./App.css";
import { Canvas, useFrame } from "@react-three/fiber";
import { getProject, val } from "@theatre/core";
import { editable as e, SheetProvider, PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import { Gltf, ScrollControls, useScroll } from "@react-three/drei";
import { useEffect, useRef } from "react";
import flyThrougState from "./vastLand.json";
import AudioComponent from "./AudioComp";

const MODEL_PATHs = {
  environment: "/environment.glb",
  vastLand: "/the_vast_land.glb",
};
// our Theatre.js project sheet, we'll use this later
const demoSheet = getProject("Fly Through", {
  state: flyThrougState,
}).sheet("Scene");

const App = ({ ready = true }) => {
  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={30}>
        <SheetProvider sheet={demoSheet}>
          <Scene ready={ready} />
        </SheetProvider>
      </ScrollControls>

      {ready && <AudioComponent url={"/audio.mp3"} loop={true} autoplay={true} volume={0.5} />}
    </Canvas>
  );
};
const Scene = ({ ready }) => {
  const sheet = useCurrentSheet();
  const scroll = useScroll();

  // useEffect(() => {
  //   const audioContext = new AudioContext();
  //   const audioBuffer = audioContext.createBuffer(1, 2, 44100);
  //   sheet.sequence.attachAudio({ source: "/audio.mp3" });
  // }, []);
  useEffect(() => {
    const runAudio = async () => {
      sheet.sequence.play();
    };
    if (ready) {
      runAudio();
    }
  }, [ready]);

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });
  const cameraTargetRef = useRef();
  const bgColor = "#84a4f4";
  const modelRef = useRef();
  return (
    <>
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" color={bgColor} near={-4} far={10} />

      <ambientLight intensity={0.5} />
      <e.pointLight theatreKey="Light" position={[10, 10, 10]} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />

      <Gltf ref={modelRef} onAfterRender={() => {}} src={MODEL_PATHs.vastLand} castShadow receiveShadow />

      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={85}
        near={0.1}
        far={70}
        lookAt={cameraTargetRef}
      />
      <e.mesh theatreKey="Camera Target" visible="editor" ref={cameraTargetRef}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshPhongMaterial color="yellow" />
      </e.mesh>
      {/* {ready && <PositionalAudio autoplay loop url="/audio.mp3" distance={3} />} */}
    </>
  );
};
export default App;
