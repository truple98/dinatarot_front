import tarotCards from '../data/tarot-cards.json';
import spreads from '../data/spreads.json';

export interface TarotCard {
  id: number;
  name: string;
  nameKr: string;
  suit: string | null;
  arcana: 'major' | 'minor';
  card_description: string;
  esoteric_interpretation?: string | null;
  prime_elements: string | null;
  upright: {
    meaning: string;
    summary: string;
    keywords: string[];
  };
  reversed: {
    meaning: string;
    summary: string;
    keywords: string[];
  };
}

export interface DrawnCard {
  cardId: number;
  position: number;
  positionName: string;
  isForward: boolean;
}

export interface SpreadData {
  id: string;
  name: string;
  nameKr: string;
  cardCount: number;
  positions: string[];
}

export interface SpreadCardData {
  id: number;
  name: string;
  image: string;
  meaning: string;
  description: string;
  isForward: boolean;
  position?: string;
}

const typedTarotCards = tarotCards as { cards: TarotCard[] };
const typedSpreads = spreads as Record<string, SpreadData>;

export const drawRandomCards = (spreadType: string): DrawnCard[] => {
  const spreadData = typedSpreads[spreadType];

  if (!spreadData) {
    throw new Error(`스프레드 타입 ${spreadType}을 찾을 수 없습니다.`);
  }

  const { cardCount, positions } = spreadData;
  const drawnCards: DrawnCard[] = [];
  const totalCards = typedTarotCards.cards.length;

  const selectedCardIds = new Set<number>();

  for (let i = 0; i < cardCount; i++) {
    let cardId: number;

    do {
      cardId = Math.floor(Math.random() * totalCards);
    } while (selectedCardIds.has(cardId));

    selectedCardIds.add(cardId);

    drawnCards.push({
      cardId,
      position: i + 1,
      positionName: positions[i] || `포지션 ${i + 1}`,
      isForward: Math.random() >= 0.5
    });
  }

  return drawnCards;
};

export const getCardById = (cardId: number): TarotCard | undefined => {
  return typedTarotCards.cards.find(card => card.id === cardId);
};

export const getSpreadData = (spreadType: string): SpreadData | undefined => {
  return typedSpreads[spreadType];
};

export const getAllSpreads = (): SpreadData[] => {
  return Object.values(typedSpreads);
};

export const drawnCardToSpreadCard = (drawnCard: DrawnCard): SpreadCardData => {
  const card = getCardById(drawnCard.cardId);
  if (!card) {
    throw new Error(`카드 ID ${drawnCard.cardId}를 찾을 수 없습니다.`);
  }

  const { isForward, positionName } = drawnCard;

  return {
    id: card.id,
    name: card.nameKr,
    image: `/src/assets/cards/${card.id}.jpg`,
    meaning: isForward ? card.upright.summary : card.reversed.summary,
    description: isForward ? card.upright.meaning : card.reversed.meaning,
    isForward,
    position: positionName
  };
};