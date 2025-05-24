"use client";
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

const ParticleSystem = () => {
  const meshRef = useRef<THREE.Points>(null!);

  const particles = useMemo(() => {
    const particleCount = 5000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const baseColor = new THREE.Color('#8A2BE2'); // A vibrant purple

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 20; // Spread out more
      const y = (Math.random() - 0.5) * 20;
      const z = (Math.random() - 0.5) * 10; // Less depth to keep it somewhat flat
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const randomFactor = Math.random() * 0.5 + 0.5;
      colors[i * 3] = baseColor.r * randomFactor;
      colors[i * 3 + 1] = baseColor.g * randomFactor;
      colors[i * 3 + 2] = baseColor.b * randomFactor;
    }
    return { positions, colors };
  }, []);

  // Simplified useFrame for rotation only
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.01;
      meshRef.current.rotation.x = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry attach="geometry">
        <primitive attach="attributes-position" object={new THREE.BufferAttribute(particles.positions, 3)} />
        <primitive attach="attributes-color" object={new THREE.BufferAttribute(particles.colors, 3)} />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.025} // Slightly larger particles
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

const HeroThreeBackground: React.FC = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem />
      </Canvas>
    </div>
  );
};

export default HeroThreeBackground; 