import type { SpreadCardData, DrawnCard } from './tarot';

export interface CardDialogue {
  positionIntroduction: string;    // "첫 번째 카드는 '과거' 카드다요..."
  cardRevealPrompt: string;        // "그럼, 카드를 뒤집겠다요."
  cardName: string;               // "바보 카드가 나왔다요!"
  orientationExplanation: string; // 정방향/역방향 설명
  cardSummary: string;            // 카드 의미 요약
  llmInterpretation: string;      // "이제 아디나가 해석해 보겠다요..."
}

export interface SpreadDialogueData {
  [key: string]: {
    positionTemplates: string[];
    cardRevealPrompts: string[];
    orientationMessages: {
      upright: string[];
      reversed: string[];
    };
  };
}

// 대사 데이터를 JSON 파일에서 로드
import dialogueData from '../data/dialogue.json';
export const spreadDialogues: SpreadDialogueData = dialogueData;

export const generateCardDialogue = (
  spreadType: string,
  cardIndex: number,
  card: SpreadCardData,
  drawnCard: DrawnCard,
  positionDescription: string,
  llmInterpretation: string,
  userName: string
): CardDialogue => {
  const dialogueData = spreadDialogues[spreadType];
  if (!dialogueData) {
    throw new Error(`스프레드 ${spreadType}에 대한 대사 데이터를 찾을 수 없습니다.`);
  }

  // 포지션 소개
  const positionTemplate = dialogueData.positionTemplates[cardIndex] ||
    `${cardIndex + 1}번째 카드는 '{positionName}' 카드다요. {description}`;
  const positionIntroduction = positionTemplate
    .replace('{positionName}', drawnCard.positionName)
    .replace('{description}', positionDescription);

  // 카드 뒤집기 프롬프트
  const cardRevealPrompt = dialogueData.cardRevealPrompts[cardIndex] ||
    "카드를 뒤집어보겠다요.";

  // 카드 이름
  const cardName = `${card.name} 카드가 나왔다요!`;

  // 정방향/역방향 메시지
  const orientationMessages = card.isForward ?
    dialogueData.orientationMessages.upright :
    dialogueData.orientationMessages.reversed;

  const randomOrientation = orientationMessages[Math.floor(Math.random() * orientationMessages.length)];
  const orientationExplanation = randomOrientation
    .replace(/{cardName}/g, card.name)
    .replace(/{summary}/g, card.meaning);

  // LLM 해석 도입부
  const llmInterpretationWithIntro = `이제 아디나가 ${userName}씨를 위해 해석해보겠다요. ${llmInterpretation}`;

  return {
    positionIntroduction,
    cardRevealPrompt,
    cardName,
    orientationExplanation,
    cardSummary: card.meaning,
    llmInterpretation: llmInterpretationWithIntro
  };
};