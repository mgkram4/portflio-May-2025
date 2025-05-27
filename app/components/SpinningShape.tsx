"use client";

import { Icosahedron, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const Shape = () => {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.z += delta * 0.05;
    }
  });

  return (
    <Icosahedron ref={meshRef} args={[2, 0]} scale={1.2}>
      <meshStandardMaterial 
        color={new THREE.Color('#5D6D7E')} // A muted blue-gray, adjust as needed
        emissive={new THREE.Color('#2E86C1')} // Emissive color for a slight glow, adjust as needed
        emissiveIntensity={0.3}
        metalness={0.6}
        roughness={0.3}
        wireframe={true} 
        wireframeLinewidth={0.5} // Optional: if you want thicker lines for wireframe
      />
    </Icosahedron>
  );
};

const SpinningShape = () => {
  return (
    <Canvas style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.7} />
      <Shape />
      <OrbitControls 
        enableZoom={false} 
        enablePan={false} 
        autoRotate 
        autoRotateSpeed={0.5} 
      />
    </Canvas>
  );
};

export default SpinningShape; 