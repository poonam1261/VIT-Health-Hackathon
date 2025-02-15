// import React, { useRef, useEffect } from "react";
// import { GLView } from "expo-gl";
// import { Renderer, TextureLoader } from "expo-three";
// import * as THREE from "three";
// import { Asset } from "expo-asset";

// export default function HumanAnatomy() {
//   const loadModel = async (scene) => {
//     const { GLTFLoader } = await import("three/examples/jsm/loaders/GLTFLoader");

//     // Load the model correctly from the main assets folder
//     const modelAsset = require("../assets/human_anatomy.glb");
//     await modelAsset.downloadAsync();
//     const modelUri = modelAsset.localUri || modelAsset.uri;

//     const loader = new GLTFLoader();
//     loader.load(
//       modelUri,
//       (gltf) => {
//         scene.add(gltf.scene);
//       },
//       undefined,
//       (error) => console.error("Error loading model: ", error)
//     );
//   };

//   const setupScene = async (gl) => {
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
//     camera.position.z = 5;

//     const renderer = new Renderer({ gl });
//     renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

//     const light = new THREE.AmbientLight(0xffffff, 1);
//     scene.add(light);

//     await loadModel(scene);

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
//       renderer.render(scene, camera);
//       gl.endFrameEXP();
//     };

//     animate();
//   };

//   return <GLView style={{ flex: 1 }} onContextCreate={setupScene} />;
// };


import React, { useEffect, useRef } from 'react';
import { GLView } from 'expo-gl';
import { Renderer, TextureLoader } from 'expo-three';
import { PerspectiveCamera, Scene, AmbientLight, DirectionalLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeDModel = () => {
  const glViewRef = useRef(null);

  useEffect(() => {
    let renderer, scene, camera, model;

    const init = async (gl) => {
      renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

      scene = new Scene();

      camera = new PerspectiveCamera(75, gl.drawingBufferWidth / gl.drawingBufferHeight, 0.1, 1000);
      camera.position.z = 5;

      const ambientLight = new AmbientLight(0x404040);
      scene.add(ambientLight);

      const directionalLight = new DirectionalLight(0xffffff, 1);
      directionalLight.position.set(1, 1, 1).normalize();
      scene.add(directionalLight);

      const loader = new GLTFLoader();
      loader.load(
        './assets/human_anatomy.glb',
        (gltf) => {
          model = gltf.scene;
          scene.add(model);
        },
        undefined,
        (error) => {
          console.error('An error happened', error);
        }
      );

      const animate = () => {
        requestAnimationFrame(animate);
        if (model) {
          model.rotation.y += 0.01;
        }
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };

      animate();
    };

    if (glViewRef.current) {
      glViewRef.current.onContextCreate = init;
    }

    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return <GLView style={{ flex: 1 }} ref={glViewRef} />;
};

export default ThreeDModel;
