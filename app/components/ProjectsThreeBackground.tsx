"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Floating geometric shapes component
const FloatingGeometry = ({ position, geometry, color, speed }: {
  position: [number, number, number];
  geometry: THREE.BufferGeometry;
  color: string;
  speed: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const initialY = position[1];

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += speed * 0.01;
      meshRef.current.rotation.y += speed * 0.015;
      meshRef.current.position.y = initialY + Math.sin(clock.getElapsedTime() * speed) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color={color}
        transparent={false}
        opacity={1}
        wireframe={false}
        emissive={color}
        emissiveIntensity={0.7}
      />
    </mesh>
  );
};

// Advanced particle system with multiple layers
const AdvancedParticleSystem = ({ scrollY }: { scrollY: number }) => {
  const particlesRef = useRef<THREE.Points>(null!);
  const particles2Ref = useRef<THREE.Points>(null!);

  const { particles1, particles2 } = useMemo(() => {
    const particleCount1 = 3000;
    const particleCount2 = 1500;
    
    // First layer - smaller, faster particles
    const positions1 = new Float32Array(particleCount1 * 3);
    const colors1 = new Float32Array(particleCount1 * 3);
    const sizes1 = new Float32Array(particleCount1);
    
    // Second layer - larger, slower particles
    const positions2 = new Float32Array(particleCount2 * 3);
    const colors2 = new Float32Array(particleCount2 * 3);
    const sizes2 = new Float32Array(particleCount2);

    const color1 = new THREE.Color('#6366f1'); // Indigo
    const color2 = new THREE.Color('#8b5cf6'); // Purple
    const color3 = new THREE.Color('#06b6d4'); // Cyan

    for (let i = 0; i < particleCount1; i++) {
      positions1[i * 3] = (Math.random() - 0.5) * 30;
      positions1[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions1[i * 3 + 2] = (Math.random() - 0.5) * 15;
      
      const colorChoice = Math.random();
      const selectedColor = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3;
      const intensity = Math.random() * 0.5 + 0.5;
      
      colors1[i * 3] = selectedColor.r * intensity;
      colors1[i * 3 + 1] = selectedColor.g * intensity;
      colors1[i * 3 + 2] = selectedColor.b * intensity;
      
      sizes1[i] = Math.random() * 2 + 0.5;
    }

    for (let i = 0; i < particleCount2; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 40;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const selectedColor = color2;
      const intensity = Math.random() * 0.3 + 0.2;
      
      colors2[i * 3] = selectedColor.r * intensity;
      colors2[i * 3 + 1] = selectedColor.g * intensity;
      colors2[i * 3 + 2] = selectedColor.b * intensity;
      
      sizes2[i] = Math.random() * 4 + 1;
    }

    return {
      particles1: { positions: positions1, colors: colors1, sizes: sizes1 },
      particles2: { positions: positions2, colors: colors2, sizes: sizes2 }
    };
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
      particlesRef.current.position.y = scrollY * 0.0005;
    }
    if (particles2Ref.current) {
      particles2Ref.current.rotation.y = -clock.getElapsedTime() * 0.01;
      particles2Ref.current.rotation.x = clock.getElapsedTime() * 0.005;
      particles2Ref.current.position.y = scrollY * 0.001;
    }
  });

  return (
    <>
      <points ref={particlesRef}>
        <bufferGeometry>
          <primitive 
            attach="attributes-position" 
            object={new THREE.BufferAttribute(particles1.positions, 3)} 
          />
          <primitive 
            attach="attributes-color" 
            object={new THREE.BufferAttribute(particles1.colors, 3)} 
          />
          <primitive 
            attach="attributes-size" 
            object={new THREE.BufferAttribute(particles1.sizes, 1)} 
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={particles2Ref}>
        <bufferGeometry>
          <primitive 
            attach="attributes-position" 
            object={new THREE.BufferAttribute(particles2.positions, 3)} 
          />
          <primitive 
            attach="attributes-color" 
            object={new THREE.BufferAttribute(particles2.colors, 3)} 
          />
          <primitive 
            attach="attributes-size" 
            object={new THREE.BufferAttribute(particles2.sizes, 1)} 
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.04}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

// Main scene component
const ProjectsScene = ({ scrollY }: { scrollY: number }) => {
  const { camera } = useThree();
  
  const geometries = useMemo(() => [
    new THREE.OctahedronGeometry(1),
    new THREE.TetrahedronGeometry(1.2),
    new THREE.IcosahedronGeometry(0.8),
    new THREE.DodecahedronGeometry(0.6),
  ], []);

  const shapes = useMemo(() => [
    { position: [-8, 4, -5], geometry: geometries[0], color: '#6366f1', speed: 0.5 },
    { position: [8, -2, -8], geometry: geometries[1], color: '#8b5cf6', speed: 0.7 },
    { position: [-6, -4, -3], geometry: geometries[2], color: '#06b6d4', speed: 0.3 },
    { position: [6, 6, -6], geometry: geometries[3], color: '#ec4899', speed: 0.6 },
    { position: [0, 8, -10], geometry: geometries[0], color: '#10b981', speed: 0.4 },
    { position: [-10, 0, -4], geometry: geometries[1], color: '#f59e0b', speed: 0.8 },
    { position: [10, 5, -7], geometry: geometries[2], color: '#f43f5e', speed: 0.45 },
    { position: [-5, 10, -9], geometry: geometries[3], color: '#38bdf8', speed: 0.65 },
    { position: [0, -10, -6], geometry: geometries[0], color: '#a3e635', speed: 0.35 },
    { position: [12, -8, -4], geometry: geometries[1], color: '#c084fc', speed: 0.75 },
  ], [geometries]);

  useFrame(() => {
    camera.position.y = scrollY * 0.0002;
    camera.rotation.x = scrollY * 0.00005;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#6366f1" />
      <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />
      
      <AdvancedParticleSystem scrollY={scrollY} />
      
      {shapes.map((shape, index) => (
        <FloatingGeometry
          key={index}
          position={shape.position as [number, number, number]}
          geometry={shape.geometry}
          color={shape.color}
          speed={shape.speed}
        />
      ))}
    </>
  );
};

interface ProjectsThreeBackgroundProps {
  scrollY: number;
}

const ProjectsThreeBackground: React.FC<ProjectsThreeBackgroundProps> = ({ scrollY }) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <ProjectsScene scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default ProjectsThreeBackground; 