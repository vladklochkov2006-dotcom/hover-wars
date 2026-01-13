import React, { useEffect, useState } from 'react';
import { MarketData } from '../types';
import { getMarketForIsland } from '../services/predictionService';

interface OverlayProps {
  islandId: string;
  onClose: () => void;
}

export const MarketOverlay: React.FC<OverlayProps> = ({ islandId, onClose }) => {
  const [market, setMarket] = useState<MarketData | null>(null);

  useEffect(() => {
    getMarketForIsland(islandId).then(setMarket);
  }, [islandId]);

  if (!market) return <div style={{color: 'white', padding: 20}}>Loading...</div>;

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
      backgroundColor: 'rgba(0, 10, 30, 0.85)', display: 'flex', justifyContent: 'center', 
      alignItems: 'center', color: 'white', fontFamily: 'Arial, sans-serif', zIndex: 10
    }}>
      <div style={{
        width: '500px', padding: '30px', background: 'linear-gradient(135deg, #1a1a40 0%, #0d0d20 100%)',
        border: '2px solid #00ffff', borderRadius: '10px', boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)'
      }}>
        <h2>{market.title}</h2>
        <p>{market.description}</p>
        <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
          {market.options.map((opt, i) => (
            <button key={i} style={{
              flex: 1, padding: '15px', background: 'transparent', border: '1px solid #00ffcc', 
              color: '#00ffcc', fontSize: '1.2rem', cursor: 'pointer'
            }}>
              {opt.label} (x{opt.odds})
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{background:'none', border:'none', color:'white', cursor:'pointer', textDecoration:'underline'}}>
          CLOSE [ESC]
        </button>
      </div>
    </div>
  );
};