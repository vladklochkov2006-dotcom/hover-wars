// src/components/OceanScene.tsx
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import * as THREE from 'three';

// 👇 ОСЬ ТУТ БУЛА ПРОБЛЕМА. ТЕПЕР ТУТ ЧИСТО:
import { HoverBoat } from './HoverBoat';
import { AnomaliesManager } from './AnomaliesManager';
import { PredictionIsland } from './PredictionIsland';

interface SceneProps {
  gameState: string;
  onInteractionAvailable: (available: boolean, id?: string) => void;
}

export const OceanScene: React.FC<SceneProps> = ({ gameState, onInteractionAvailable }) => {
  const playerPos = useRef(new THREE.Vector3(0, 0, 0));
  const gridRef = useRef<THREE.GridHelper>(null);
  const floorRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (playerPos.current && gridRef.current && floorRef.current) {
      gridRef.current.position.x = playerPos.current.x;
      gridRef.current.position.z = playerPos.current.z;
      floorRef.current.position.x = playerPos.current.x;
      floorRef.current.position.z = playerPos.current.z;
    }
  });

  return (
    <>
      <color attach="background" args={['#050510']} />
      <fog attach="fog" args={['#050510', 20, 150]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[50, 50, 25]} intensity={1} castShadow />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <gridHelper ref={gridRef} args={[2000, 100, 0xff00cc, 0x1a1a40]} position={[0, -2, 0]} />
      <mesh ref={floorRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
        <planeGeometry args={[2000, 2000]} />
        <meshBasicMaterial color="#0a0a20" />
      </mesh>

      <HoverBoat 
        isPaused={gameState !== 'playing'} 
        onPositionUpdate={(pos) => playerPos.current.copy(pos)}
      />
      <AnomaliesManager />
      
      <PredictionIsland 
        position={[0, 0, -100]} 
        id="1" 
        playerPos={playerPos.current}
        onEnterRange={(id) => onInteractionAvailable(true, id)}
        onExitRange={() => onInteractionAvailable(false)}
      />
       <PredictionIsland 
        position={[40, 0, -300]} 
        id="2" 
        playerPos={playerPos.current}
        onEnterRange={(id) => onInteractionAvailable(true, id)}
        onExitRange={() => onInteractionAvailable(false)}
      />
    </>
  );
};