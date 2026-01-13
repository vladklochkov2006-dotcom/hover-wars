import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const CONFIG = {
  ACCELERATION: 0.2,
  FRICTION: 0.98,
  MAX_SPEED: 0.8,
  TURN_SPEED: 0.03,
  TILT_AMOUNT: 0.4,
  CAMERA_LAG: 0.1,
  CAMERA_OFFSET: new THREE.Vector3(0, 3, 8),
};

interface HoverBoatProps {
  isPaused?: boolean;
  onPositionUpdate?: (pos: THREE.Vector3) => void;
}

export const HoverBoat: React.FC<HoverBoatProps> = ({ isPaused = false, onPositionUpdate }) => {
  const boatRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  const speed = useRef(0);
  const rotation = useRef(0);
  const keys = useRef({ w: false, a: false, s: false, d: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'ArrowUp') keys.current.w = true;
      if (e.key === 's' || e.key === 'ArrowDown') keys.current.s = true;
      if (e.key === 'a' || e.key === 'ArrowLeft') keys.current.a = true;
      if (e.key === 'd' || e.key === 'ArrowRight') keys.current.d = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w' || e.key === 'ArrowUp') keys.current.w = false;
      if (e.key === 's' || e.key === 'ArrowDown') keys.current.s = false;
      if (e.key === 'a' || e.key === 'ArrowLeft') keys.current.a = false;
      if (e.key === 'd' || e.key === 'ArrowRight') keys.current.d = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((state, delta) => {
    if (isPaused || !boatRef.current) return;

    // Фізика
    if (keys.current.w) speed.current += CONFIG.ACCELERATION * delta * 10;
    if (keys.current.s) speed.current -= CONFIG.ACCELERATION * delta * 10;
    speed.current *= CONFIG.FRICTION;
    speed.current = Math.max(0, Math.min(speed.current, CONFIG.MAX_SPEED));

    if (keys.current.a) rotation.current += CONFIG.TURN_SPEED;
    if (keys.current.d) rotation.current -= CONFIG.TURN_SPEED;

    boatRef.current.rotation.y = rotation.current;

    const direction = new THREE.Vector3(0, 0, -1);
    direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current);
    boatRef.current.position.add(direction.multiplyScalar(speed.current));

    // Нахил
    const targetTilt = keys.current.a ? -CONFIG.TILT_AMOUNT : (keys.current.d ? CONFIG.TILT_AMOUNT : 0);
    boatRef.current.rotation.z = THREE.MathUtils.lerp(boatRef.current.rotation.z, targetTilt, 0.1);
    boatRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;

    // Камера
    const relativeCameraOffset = CONFIG.CAMERA_OFFSET.clone();
    relativeCameraOffset.applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current);
    const targetCameraPos = boatRef.current.position.clone().add(relativeCameraOffset);
    state.camera.position.lerp(targetCameraPos, CONFIG.CAMERA_LAG);
    const lookAtTarget = boatRef.current.position.clone().add(direction.multiplyScalar(5));
    state.camera.lookAt(lookAtTarget);

    // Оновлення позиції для зовнішнього світу
    if (onPositionUpdate) {
        onPositionUpdate(boatRef.current.position);
    }
  });

  return (
    <group ref={boatRef} position={[0, 0, 0]}>
      <mesh castShadow receiveShadow>
        <coneGeometry args={[0.5, 2, 4]} /> 
        <meshStandardMaterial color="#00ffff" emissive="#0044aa" emissiveIntensity={0.5} roughness={0.2} metalness={0.8} />
        <group rotation={[-Math.PI / 2, 0, 0]} />
      </mesh>
      <mesh position={[0, 0, 1.1]}>
        <boxGeometry args={[0.4, 0.2, 0.2]} />
        <meshBasicMaterial color="#ff00ff" />
      </mesh>
      <pointLight position={[0, -0.5, 0]} distance={5} intensity={2} color="#00ffff" />
    </group>
  );
};