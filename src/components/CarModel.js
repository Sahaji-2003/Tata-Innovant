// // src/components/CarModel.js
// import React, { Suspense, useEffect } from 'react';
// import { useLoader } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const CarModel = () => {
//   const gltf = useLoader(GLTFLoader, '/model/tata_punch.glb');

//   useEffect(() => {
//     console.log('Loaded model:', gltf);
//   }, [gltf]);

//   return (
//     <Suspense fallback={null}>
//       <primitive object={gltf.scene} scale={0.5} />
//     </Suspense>
//   );
// };

// export default CarModel;

// import React, { Suspense, useEffect, useRef } from 'react';
// import { useLoader, useFrame } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// const CarModel = ({ modelPath }) => {
//   const gltf = useLoader(GLTFLoader, modelPath);
//   const modelRef = useRef();

//   useEffect(() => {
//     console.log('Loaded model:', gltf);
//   }, [gltf]);

//   useFrame(({ clock }) => {
//     const elapsedTime = clock.getElapsedTime();
//     if (modelRef.current) {
//       // Rotate the model once over 5 seconds
//       modelRef.current.rotation.y = elapsedTime * (Math.PI / 6); // Adjust rotation speed as needed
//     }
//   });

//   return (
//     <Suspense fallback={null}>
//       <primitive ref={modelRef} object={gltf.scene} scale={1.3} /> {/* Adjust scale to zoom in */}
//     </Suspense>
//   );
// };

// export default CarModel;

// import React, { Suspense, useEffect, useRef, useState } from 'react';
// import { useLoader, useFrame } from '@react-three/fiber';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { HexColorPicker } from "react-colorful";
// import './CarModel.css';

// const CarModel = ({ modelPath }) => {
//   const gltf = useLoader(GLTFLoader, modelPath);
//   const modelRef = useRef();
//   const [color, setColor] = useState('#ffffff'); // Default color
//   const [showColorPicker, setShowColorPicker] = useState(false);

//   useEffect(() => {
//     console.log('Loaded model:', gltf);
//     if (modelRef.current) {
//       modelRef.current.traverse((child) => {
//         if (child.isMesh) {
//           child.material.color.set(color);
//         }
//       });
//     }
//   }, [gltf, color]);

//   useFrame(({ clock }) => {
//     const elapsedTime = clock.getElapsedTime();
//     if (modelRef.current) {
//       // Rotate the model once over 5 seconds
//       modelRef.current.rotation.y = elapsedTime * (Math.PI / 6); // Adjust rotation speed as needed
//     }
//   });

//   const handleColorChange = (newColor) => {
//     setColor(newColor);
//   };

//   return (
//     <>
//       <Suspense fallback={null}>
//         <primitive ref={modelRef} object={gltf.scene} scale={1.3} /> {/* Adjust scale to zoom in */}
//       </Suspense>
//       {showColorPicker && (
//         <div className="color-picker">
//           <HexColorPicker color={color} onChange={handleColorChange} />
//         </div>
//       )}
//     </>
//   );
// };

// export default CarModel;

import React, { Suspense, useEffect, useRef } from 'react';
import { useLoader, useFrame } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const CarModel = ({ modelPath, carColor }) => {
  const gltf = useLoader(GLTFLoader, modelPath);
  const modelRef = useRef();

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.material.color.set(carColor);
        }
      });
    }
  }, [carColor, gltf]);

  useEffect(() => {
    console.log('Loaded model:', gltf);
  }, [gltf]);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    if (modelRef.current) {
      modelRef.current.rotation.y = elapsedTime * (Math.PI / 10); // Adjust rotation speed as needed
    }
  });

  return (
    <Suspense fallback={null}>
      <primitive ref={modelRef} object={gltf.scene} scale={1.3} /> {/* Adjust scale to zoom in */}
    </Suspense>
  );
};

export default CarModel;
