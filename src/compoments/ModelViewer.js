import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// Load the 3D model of the person
function PersonModel() {
  const gltf = useLoader(GLTFLoader, '/models/person.gltf');
  return <primitive object={gltf.scene} scale={[2, 2, 2]} />;
}

function TexturedModel({ textureUrl }) {
  const texture = useTexture(textureUrl); // Load texture from URL
  const mesh = useRef();

  return (
    <mesh ref={mesh}>
      {/* Use the 3D person model */}
      <PersonModel />
      {/* Apply the texture to the model */}
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

function ModelViewer() {
  const [textureUrl, setTextureUrl] = useState(null); // State to store the image URL

  const handleImageUpload = (event) => {
    const file = event.target.files[0]; // Get the first file from the input
    if (file) {
      const url = URL.createObjectURL(file); // Create a URL from the file
      setTextureUrl(url); // Update the texture URL
    }
  };

  return (
    <div style={{ height: '100vh' }}>
      {/* Image upload button */}
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      
      {/* 3D canvas to display the model */}
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} /> {/* Ambient light */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} /> {/* Spot light */}
        <Suspense fallback={null}>
          {textureUrl && <TexturedModel textureUrl={textureUrl} />}
        </Suspense>
        <OrbitControls /> {/* Camera controls */}
      </Canvas>
    </div>
  );
}

export default ModelViewer;