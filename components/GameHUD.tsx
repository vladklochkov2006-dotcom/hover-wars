import React from 'react';

interface HUDProps {
  speed: number;
  interactionText?: string | null;
}

export const GameHUD: React.FC<HUDProps> = ({ speed, interactionText }) => {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', padding: '20px', boxSizing: 'border-box',
      fontFamily: "'Courier New', monospace", color: '#00ffff', textShadow: '0 0 5px #00ffff'
    }}>
      <div style={{ position: 'absolute', bottom: '20px', right: '20px', fontSize: '2rem' }}>
        SPEED: {(speed * 100).toFixed(0)} km/h
      </div>
      {interactionText && (
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.5)',
          padding: '10px 20px', border: '1px solid #00ffff'
        }}>
          [E] {interactionText}
        </div>
      )}
      <div style={{ fontSize: '1.2rem' }}>
        PREDICTION SEA <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>ALPHA</span>
      </div>
    </div>
  );
};