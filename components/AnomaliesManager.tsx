interface AsteroidFieldProps {
  count?: number;
  radius?: number;
}

export const AsteroidField = ({ count = 200, radius = 500 }: AsteroidFieldProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    
    for (let i = 0; i < count; i++) {
      // Случайная позиция в сфере
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.5 + Math.random() * 0.5);

      dummy.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      // Случайный поворот
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      // Случайный размер
      const scale = 0.5 + Math.random() * 2;
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [count, radius]);

  useFrame((state) => {
    if (meshRef.current) {
      // Медленное вращение всего поля
      meshRef.current.rotation.y += 0.0001;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#555555" 
        roughness={0.8}
        metalness={0.2}
      />
    </instancedMesh>
  );
};

// ========================================
// 6. App.tsx - Главная логика с улучшениями
// ========================================

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';

function App() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused'>('menu');
  const [selectedMarket, setSelectedMarket] = useState<any>(null);

  return (
    <div className="w-full h-screen bg-black">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        
        <Stars radius={300} depth={50} count={5000} factor={4} fade speed={1} />
        
        <Spaceship />
        <AsteroidField count={300} radius={600} />
        
        {/* Planets would be mapped here from market data */}
        
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {gameState === 'playing' && (
        <HUD 
          score={0}
          level={1}
          combo={0}
          boost={100}
          shields={100}
          speed={0}
          marketsDiscovered={0}
          totalMarkets={10}
        />
      )}
    </div>
  );
}
