import type { DrawnCard } from '../services/api';

export interface SpreadCardData {
  id: number;
  name: string;
  image: string;
  meaning: string;
  description: string;
  isForward: boolean;
  position?: string;
}

export const drawnCardToSpreadCard = (drawnCard: DrawnCard): SpreadCardData => {
  const { card, isReversed, positionName } = drawnCard;
  const isForward = !isReversed;

  return {
    id: card.id,
    name: card.nameKr,
    image: `/src/assets/TarotCards/${card.id}.jpg`,
    meaning: isForward ? card.upright.meaning : card.reversed.meaning,
    description: isForward ? card.upright.description : card.reversed.description,
    isForward,
    position: positionName
  };
};