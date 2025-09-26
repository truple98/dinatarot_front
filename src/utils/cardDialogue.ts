import type { SpreadCardData, DrawnCard, TarotCard } from './tarot';
import tarotCards from '../data/tarot-cards.json';

const typedTarotCards = tarotCards as { cards: TarotCard[] };

const getTarotCard = (cardId: number): TarotCard | undefined => {
  return typedTarotCards.cards.find(card => card.id === cardId);
};

export interface CardDialogue {
  positionIntroduction: string;
  orientationExplanation: string;
  cardSummary: string;
  llmInterpretation: string;
}

export interface SpreadPosition {
  id: number;
  name: string;
  nameKr: string;
  description: string;
}

export interface SpreadData {
  id: string;
  name: string;
  nameKr: string;
  cardCount: number;
  description: string;
  positions: SpreadPosition[];
}

export interface OrientationMessages {
  upright: string;
  reversed: string;
}

export interface SpreadDialogueData {
  start: string;
  positionTemplates: string;
  orientationMessages: OrientationMessages;
  index: Record<string, string>;
}

import dialogueData from '../data/dialogue.json';
export const spreadDialogues: SpreadDialogueData = dialogueData as SpreadDialogueData;

import threeCardData from '../data/three-card.json';
import celticCrossData from '../data/celtic-cross.json';
import relationshipData from '../data/relationship.json';
import horoscopeData from '../data/horoscope.json';

const spreadDataMap: Record<string, SpreadData> = {
  'three-card': threeCardData as SpreadData,
  'celtic-cross': celticCrossData as SpreadData,
  'relationship': relationshipData as SpreadData,
  'horoscope': horoscopeData as SpreadData
};

export const getSpreadPositionDescription = (spreadType: string, cardIndex: number): string => {
  const spreadData = spreadDataMap[spreadType];
  return spreadData.positions[cardIndex].description;
};

export const generateCardDialogue = (
  spreadType: string,
  cardIndex: number,
  card: SpreadCardData,
  drawnCard: DrawnCard,
  llmInterpretation: string,
  userName: string
): CardDialogue => {

  const spreadPositionDescription = getSpreadPositionDescription(spreadType, cardIndex);

  const indexText = spreadDialogues.index[String(cardIndex + 1)] || `${cardIndex + 1}번째`;
  const positionIntroduction = spreadDialogues.positionTemplates
    .replace('{index}', indexText)
    .replace('{positionName}', drawnCard.positionName)
    .replace('{description}', spreadPositionDescription);


  const tarotCard = getTarotCard(card.id);
  let orientationExplanation = '';

  if (card.isForward) {
    const uprightSummary = tarotCard?.upright.summary || card.meaning;
    orientationExplanation = spreadDialogues.orientationMessages.upright
      .replace(/{cardName}/g, card.name)
      .replace(/{summary}/g, uprightSummary);
  } else {
    const uprightSummary = tarotCard?.upright.summary || card.meaning;
    const reversedSummary = tarotCard?.reversed.summary || card.meaning;

    const uprightPart = spreadDialogues.orientationMessages.upright
      .replace(/{cardName}/g, card.name)
      .replace(/{summary}/g, uprightSummary);

    const reversedPart = spreadDialogues.orientationMessages.reversed
      .replace(/{cardName}/g, card.name)
      .replace(/{summary}/g, reversedSummary);

    orientationExplanation = `${uprightPart} ${reversedPart}`;
  }

  const llmInterpretationWithIntro = `이제 아디나가 ${userName}씨를 위해 해석해보겠다요. ${llmInterpretation}`;

  return {
    positionIntroduction,
    orientationExplanation,
    cardSummary: card.meaning,
    llmInterpretation: llmInterpretationWithIntro
  };
};