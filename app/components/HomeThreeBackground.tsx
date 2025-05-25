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
      meshRef.current.rotation.x += speed * 0.008;
      meshRef.current.rotation.y += speed * 0.012;
      meshRef.current.position.y = initialY + Math.sin(clock.getElapsedTime() * speed) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <primitive object={geometry} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.4}
        wireframe
        emissive={color}
        emissiveIntensity={0.15}
      />
    </mesh>
  );
};

// Advanced particle system with multiple layers
const AdvancedParticleSystem = ({ scrollY }: { scrollY: number }) => {
  const particlesRef = useRef<THREE.Points>(null!);
  const particles2Ref = useRef<THREE.Points>(null!);
  const particles3Ref = useRef<THREE.Points>(null!);

  const { particles1, particles2, particles3 } = useMemo(() => {
    const particleCount1 = 2500;
    const particleCount2 = 1200;
    const particleCount3 = 800;
    
    // First layer - smallest, fastest particles
    const positions1 = new Float32Array(particleCount1 * 3);
    const colors1 = new Float32Array(particleCount1 * 3);
    const sizes1 = new Float32Array(particleCount1);
    
    // Second layer - medium particles
    const positions2 = new Float32Array(particleCount2 * 3);
    const colors2 = new Float32Array(particleCount2 * 3);
    const sizes2 = new Float32Array(particleCount2);

    // Third layer - largest, slowest particles
    const positions3 = new Float32Array(particleCount3 * 3);
    const colors3 = new Float32Array(particleCount3 * 3);
    const sizes3 = new Float32Array(particleCount3);

    const color1 = new THREE.Color('#6366f1'); // Indigo
    const color2 = new THREE.Color('#8b5cf6'); // Purple
    const color3 = new THREE.Color('#06b6d4'); // Cyan
    const color4 = new THREE.Color('#ec4899'); // Pink

    // First layer particles
    for (let i = 0; i < particleCount1; i++) {
      positions1[i * 3] = (Math.random() - 0.5) * 35;
      positions1[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions1[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      const colorChoice = Math.random();
      const selectedColor = colorChoice < 0.25 ? color1 : colorChoice < 0.5 ? color2 : colorChoice < 0.75 ? color3 : color4;
      const intensity = Math.random() * 0.4 + 0.3;
      
      colors1[i * 3] = selectedColor.r * intensity;
      colors1[i * 3 + 1] = selectedColor.g * intensity;
      colors1[i * 3 + 2] = selectedColor.b * intensity;
      
      sizes1[i] = Math.random() * 1.5 + 0.3;
    }

    // Second layer particles
    for (let i = 0; i < particleCount2; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 45;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 45;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      const selectedColor = Math.random() < 0.5 ? color2 : color3;
      const intensity = Math.random() * 0.3 + 0.2;
      
      colors2[i * 3] = selectedColor.r * intensity;
      colors2[i * 3 + 1] = selectedColor.g * intensity;
      colors2[i * 3 + 2] = selectedColor.b * intensity;
      
      sizes2[i] = Math.random() * 3 + 1;
    }

    // Third layer particles
    for (let i = 0; i < particleCount3; i++) {
      positions3[i * 3] = (Math.random() - 0.5) * 60;
      positions3[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions3[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      const selectedColor = color1;
      const intensity = Math.random() * 0.2 + 0.1;
      
      colors3[i * 3] = selectedColor.r * intensity;
      colors3[i * 3 + 1] = selectedColor.g * intensity;
      colors3[i * 3 + 2] = selectedColor.b * intensity;
      
      sizes3[i] = Math.random() * 5 + 2;
    }

    return {
      particles1: { positions: positions1, colors: colors1, sizes: sizes1 },
      particles2: { positions: positions2, colors: colors2, sizes: sizes2 },
      particles3: { positions: positions3, colors: colors3, sizes: sizes3 }
    };
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.015;
      particlesRef.current.position.y = scrollY * 0.0003;
    }
    if (particles2Ref.current) {
      particles2Ref.current.rotation.y = -clock.getElapsedTime() * 0.008;
      particles2Ref.current.rotation.x = clock.getElapsedTime() * 0.003;
      particles2Ref.current.position.y = scrollY * 0.0006;
    }
    if (particles3Ref.current) {
      particles3Ref.current.rotation.y = clock.getElapsedTime() * 0.005;
      particles3Ref.current.rotation.z = clock.getElapsedTime() * 0.002;
      particles3Ref.current.position.y = scrollY * 0.001;
    }
  });

  return (
    <>
      {/* First layer - smallest particles */}
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
          size={0.015}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Second layer - medium particles */}
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
          size={0.03}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Third layer - largest particles */}
      <points ref={particles3Ref}>
        <bufferGeometry>
          <primitive 
            attach="attributes-position" 
            object={new THREE.BufferAttribute(particles3.positions, 3)} 
          />
          <primitive 
            attach="attributes-color" 
            object={new THREE.BufferAttribute(particles3.colors, 3)} 
          />
          <primitive 
            attach="attributes-size" 
            object={new THREE.BufferAttribute(particles3.sizes, 1)} 
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  );
};

// Main scene component
const HomeScene = ({ scrollY }: { scrollY: number }) => {
  const { camera } = useThree();
  
  const geometries = useMemo(() => [
    new THREE.OctahedronGeometry(0.4),
    new THREE.TetrahedronGeometry(0.5),
    new THREE.IcosahedronGeometry(0.3),
    new THREE.DodecahedronGeometry(0.25),
    new THREE.BoxGeometry(0.4, 0.4, 0.4),
  ], []);

  const shapes = useMemo(() => [
    { position: [-12, 6, -8], geometry: geometries[0], color: '#6366f1', speed: 0.4 },
    { position: [10, -3, -12], geometry: geometries[1], color: '#8b5cf6', speed: 0.6 },
    { position: [-8, -6, -5], geometry: geometries[2], color: '#06b6d4', speed: 0.3 },
    { position: [8, 8, -10], geometry: geometries[3], color: '#ec4899', speed: 0.5 },
    { position: [0, 10, -15], geometry: geometries[4], color: '#10b981', speed: 0.35 },
    { position: [-15, 2, -6], geometry: geometries[0], color: '#f59e0b', speed: 0.7 },
    { position: [12, -8, -9], geometry: geometries[1], color: '#ef4444', speed: 0.45 },
    { position: [-5, 12, -12], geometry: geometries[2], color: '#8b5cf6', speed: 0.55 },
  ], [geometries]);

  useFrame(() => {
    camera.position.y = scrollY * 0.0001;
    camera.rotation.x = scrollY * 0.00003;
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[15, 15, 8]} intensity={0.4} color="#6366f1" />
      <directionalLight position={[-15, -15, -8]} intensity={0.25} color="#8b5cf6" />
      <directionalLight position={[0, 10, 5]} intensity={0.3} color="#06b6d4" />
      
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

interface HomeThreeBackgroundProps {
  scrollY: number;
}

const HomeThreeBackground: React.FC<HomeThreeBackgroundProps> = ({ scrollY }) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 70 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance"
        }}
      >
        <HomeScene scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default HomeThreeBackground; 