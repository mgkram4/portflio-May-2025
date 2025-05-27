"use client";
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Enhanced floating geometry with pulse, morph, and glow effects
const FloatingGeometry = ({ position, geometry, color, speed, index }: {
  position: [number, number, number];
  geometry: THREE.BufferGeometry;
  color: string;
  speed: number;
  index: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position]);
  const phase = useMemo(() => Math.random() * Math.PI * 2, []);
  
  useFrame(({ clock, mouse }) => {
    if (meshRef.current && glowRef.current) {
      const elapsedTime = clock.getElapsedTime();
      
      // Simplified rotation (slowed down further)
      meshRef.current.rotation.x = Math.sin(elapsedTime * speed * 0.075 + phase) * Math.PI * 0.25;
      meshRef.current.rotation.y = elapsedTime * speed * 0.125;
      meshRef.current.rotation.z = Math.cos(elapsedTime * speed * 0.05) * Math.PI * 0.125;
      
      // Reduced pulsing scale effect (slowed down further)
      const pulse = Math.sin(elapsedTime * speed * 0.5 + index) * 0.05 + 1; 
      meshRef.current.scale.setScalar(pulse);
      glowRef.current.scale.setScalar(pulse * 1.1); 
      
      // Reduced orbital movement and mouse influence (slowed down further)
      const orbitRadius = 1.25 + Math.sin(elapsedTime * speed * 0.125) * 0.1; 
      const orbitSpeed = speed * 0.075; 
      meshRef.current.position.x = initialPosition.x + Math.cos(elapsedTime * orbitSpeed + phase) * orbitRadius + mouse.x * 0.2; 
      meshRef.current.position.y = initialPosition.y + Math.sin(elapsedTime * orbitSpeed * 0.375 + phase) * orbitRadius + mouse.y * 0.2; 
      meshRef.current.position.z = initialPosition.z + Math.sin(elapsedTime * orbitSpeed * 0.175) * 0.5; 
      
      // Sync glow position
      glowRef.current.position.copy(meshRef.current.position);
      glowRef.current.rotation.copy(meshRef.current.rotation);
      
      // Reduced dynamic emissive intensity (slowed down further)
      const emissiveIntensity = (Math.sin(elapsedTime * speed * 0.75 + index * 0.5) + 1) * 0.15;
      (meshRef.current.material as THREE.MeshPhysicalMaterial).emissiveIntensity = emissiveIntensity * 0.8;
    }
  });

  return (
    <group>
      {/* Glow effect mesh */}
      <mesh ref={glowRef} position={position}>
        <primitive object={geometry} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* Main mesh with physical material */}
      <mesh ref={meshRef} position={position}>
        <primitive object={geometry} />
        <meshPhysicalMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          metalness={0.6}
          roughness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
};

// New Skyscraper Cityscape component
const SkyscraperCityscape = () => {
  const groupRef = useRef<THREE.Group>(null!);

  const buildings = useMemo(() => {
    const buildingData = [];
    const buildingCount = 50; // Number of buildings
    const cityRadius = 25; // How far out buildings can spawn
    const minHeight = 5;
    const maxHeight = 25;

    for (let i = 0; i < buildingCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * cityRadius * 0.8 + cityRadius * 0.2; // Avoid very center
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      const height = Math.random() * (maxHeight - minHeight) + minHeight;
      const width = Math.random() * 1 + 0.5;
      const depth = Math.random() * 1 + 0.5;
      
      // Varying shades of grey for buildings
      const greyShade = Math.random() * 0.3 + 0.1; // Darker greys: 0.1 to 0.4
      const color = new THREE.Color(greyShade, greyShade, greyShade);
      
      buildingData.push({
        position: [x, height / 2, z] as [number, number, number],
        args: [width, height, depth] as [number, number, number],
        color,
        emissiveIntensity: Math.random() * 0.1 + 0.05 // Subtle glow for some buildings
      });
    }
    return buildingData;
  }, []);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Slow rotation of the entire cityscape for a subtle dynamic feel
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <group ref={groupRef} position={[0, -5, 0]}> {/* Lower the cityscape slightly */}
      {buildings.map((building, index) => (
        <mesh key={index} position={building.position}>
          <boxGeometry args={building.args} />
          <meshStandardMaterial 
            color={building.color} 
            emissive={building.color} // Emissive color same as base for a glow effect
            emissiveIntensity={building.emissiveIntensity} 
            metalness={0.7} // Modern metallic look
            roughness={0.4} // Moderately smooth
          />
        </mesh>
      ))}
      {/* Add a ground plane - very dark grey */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#080808" metalness={0.5} roughness={0.8} />
      </mesh>
    </group>
  );
};

// Main scene component
const HomeScene = ({ scrollY }: { scrollY: number }) => {
  const { camera } = useThree();
  const lightRef1 = useRef<THREE.PointLight>(null!);
  const lightRef2 = useRef<THREE.PointLight>(null!);
  
  const geometries = useMemo(() => [
    new THREE.SphereGeometry(0.7, 32, 16),
    new THREE.BoxGeometry(0.8, 0.8, 0.8),
  ], []);

  const shapes = useMemo(() => [
    { position: [-6, 2, -4], geometry: geometries[0], color: '#FFFFFF', speed: 0.08 },
    { position: [5, -1, -3], geometry: geometries[1], color: '#777777', speed: 0.1 },
  ], [geometries]);

  useFrame(({ clock }) => {
    // Animate camera (slowed down further)
    camera.position.x = Math.sin(clock.getElapsedTime() * 0.025) * 0.5;
    camera.position.y = scrollY * 0.00005 + Math.cos(clock.getElapsedTime() * 0.0375) * 0.25;
    camera.rotation.z = Math.sin(clock.getElapsedTime() * 0.025) * 0.005;
    
    // Animate point lights (slowed down further, new colors)
    if (lightRef1.current && lightRef2.current) {
      const time = clock.getElapsedTime();
      lightRef1.current.position.x = Math.sin(time * 0.125) * 7;
      lightRef1.current.position.z = Math.cos(time * 0.125) * 7;
      lightRef1.current.intensity = (Math.sin(time * 0.5) + 1) * 1.0 + 0.25;
      
      lightRef2.current.position.x = Math.cos(time * 0.075) * 9;
      lightRef2.current.position.z = Math.sin(time * 0.075) * 9;
      lightRef2.current.intensity = (Math.cos(time * 0.375) + 1) * 1.0 + 0.25;
    }
  });

  return (
    <>
      <fog attach="fog" args={['#111111', 10, 22]} />
      
      <ambientLight intensity={0.05} />
      <pointLight ref={lightRef1} position={[8, 8, 4]} intensity={1.0} color="#FFFFFF" distance={30} />
      <pointLight ref={lightRef2} position={[-8, 8, 4]} intensity={0.8} color="#DDDDDD" distance={30} />
      <directionalLight position={[0, 15, 10]} intensity={0.3} color="#CCCCCC" />
      
      <SkyscraperCityscape />
      
      {shapes.map((shape, index) => (
        <FloatingGeometry
          key={index}
          position={shape.position as [number, number, number]}
          geometry={shape.geometry}
          color={shape.color}
          speed={shape.speed}
          index={index}
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-neutral-800" />
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2
        }}
      >
        <HomeScene scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default HomeThreeBackground;