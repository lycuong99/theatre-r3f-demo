// AudioComponent.js
import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import { AudioListener, Audio, AudioLoader } from "three";

const AudioComponent = ({ url, loop = true, autoplay = true, volume = 0.5 }) => {
  const { camera, scene } = useThree();
  const soundRef = useRef();

  useEffect(() => {
    // Create an AudioListener and add it to the camera
    const listener = new AudioListener();
    camera.add(listener);

    // Create a global audio source
    const sound = new Audio(listener);
    soundRef.current = sound;

    // Load the audio file
    const audioLoader = new AudioLoader();
    audioLoader.load(url, (buffer) => {
      sound.setBuffer(buffer);
      sound.setLoop(loop);
      sound.setVolume(volume);
      if (autoplay) sound.play();
    });

    // Add the audio to the scene or any specific object
    scene.add(sound);

    // Clean up on component unmount
    return () => {
      sound.stop();
      sound.disconnect();
      camera.remove(listener);
      scene.remove(sound);
    };
  }, [url, loop, autoplay, volume, camera, scene]);

  return null; // This component does not render anything
};

export default AudioComponent;
