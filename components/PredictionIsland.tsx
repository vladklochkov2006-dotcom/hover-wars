import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface IslandProps {
  position: [number, number, number];
  id: string;
  onEnterRange: (id: string) => void;
  onExitRange: () => void;
  playerPos: THREE.Vector3;
}

export const PredictionIsland: React.FC<IslandProps> = ({ position, id, onEnterRange, onExitRange, playerPos }) => {
  const meshRef = useRef<THREE.Group>(null);
  const [inRange, setInRange] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.005;

    const islandPos = new THREE.Vector3(...position);
    const distance = islandPos.distanceTo(playerPos);

    if (distance < 15 && !inRange) {
      setInRange(true);
      onEnterRange(id);
    } else if (distance >= 15 && inRange) {
      setInRange(false);
      onExitRange();
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh castShadow receiveShadow>
          <dodecahedronGeometry args={[4, 0]} />
          <meshStandardMaterial 
            color={inRange ? "#ff00ff" : "#4400ff"} 
            emissive={inRange ? "#ff00ff" : "#2200aa"}
            emissiveIntensity={2}
            wireframe
          />
        </mesh>
        <pointLight intensity={5} distance={20} color="#ff00ff" />
        <Text position={[0, 6, 0]} fontSize={1.5} color="#ffffff" anchorX="center" anchorY="middle">
          MARKET
        </Text>
      </Float>
    </group>
  );
};