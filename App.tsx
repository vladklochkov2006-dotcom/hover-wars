import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OceanScene } from './components/OceanScene';
import { GameHUD } from './components/GameHUD';
import { MarketOverlay } from './components/MarketOverlay';
import { GameState } from './types';

function App() {
  const [gameState, setGameState] = useState<GameState>('playing');
  const [activeIslandId, setActiveIslandId] = useState<string | null>(null);
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'e' && canInteract && gameState === 'playing') {
        setGameState('market-ui');
      } else if (e.key === 'Escape' && gameState === 'market-ui') {
        setGameState('playing');
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [canInteract, gameState]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#050510', overflow: 'hidden' }}>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
        <OceanScene 
          gameState={gameState} 
          onInteractionAvailable={(avail, id) => {
            setCanInteract(avail);
            if(id) setActiveIslandId(id);
          }}
        />
      </Canvas>

      {gameState === 'playing' && (
        <GameHUD speed={0} interactionText={canInteract ? "OPEN MARKET" : null} />
      )}

      {gameState === 'market-ui' && activeIslandId && (
        <MarketOverlay islandId={activeIslandId} onClose={() => setGameState('playing')} />
      )}
    </div>
  );
}

export default App;