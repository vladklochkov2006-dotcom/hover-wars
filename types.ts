// types.ts
export type GameState = 'playing' | 'market-ui' | 'crashed';

export interface BoatStatus {
  speed: number;
  boost: number; // 0-100%
  health: number;
}

export type AnomalyType = 'neon-ring' | 'light-wave' | 'fog' | 'stream';

export interface MarketData {
  id: string;
  category: 'crypto' | 'sports' | 'politics';
  question: string;
  endsAt: number; // timestamp
  options: { label: string; odds: number }[];
}