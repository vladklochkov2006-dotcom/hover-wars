import { MarketData } from '../types';

const MOCK_MARKETS: MarketData[] = [
  {
    id: '1',
    category: 'Crypto',
    title: 'Bitcoin > $100k у 2025?',
    description: 'Чи перетне ціна BTC позначку $100,000 до кінця року?',
    endsAt: '2025-12-31',
    options: [{ label: 'Так', odds: 2.5 }, { label: 'Ні', odds: 1.4 }],
    volume: 12500
  },
  {
    id: '2',
    category: 'Sports',
    title: 'Переможець Super Bowl 2026',
    description: 'Хто виграє головний трофей?',
    endsAt: '2026-02-10',
    options: [{ label: 'Chiefs', odds: 3.0 }, { label: '49ers', odds: 4.5 }],
    volume: 5400
  }
];

export const getMarketForIsland = async (islandId: string): Promise<MarketData> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const market = MOCK_MARKETS.find(m => m.id === islandId) || MOCK_MARKETS[0];
      resolve(market);
    }, 500);
  });
};