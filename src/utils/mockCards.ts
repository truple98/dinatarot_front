import card0 from '../assets/TarotCards/0.jpg';
import card1 from '../assets/TarotCards/1.jpg';
import card2 from '../assets/TarotCards/2.jpg';
import card3 from '../assets/TarotCards/3.jpg';
import card4 from '../assets/TarotCards/4.jpg';
import card5 from '../assets/TarotCards/5.jpg';
import card6 from '../assets/TarotCards/6.jpg';
import card7 from '../assets/TarotCards/7.jpg';
import card8 from '../assets/TarotCards/8.jpg';
import card9 from '../assets/TarotCards/9.jpg';
import card10 from '../assets/TarotCards/10.jpg';
import card11 from '../assets/TarotCards/11.jpg';
import card12 from '../assets/TarotCards/12.jpg';
import card13 from '../assets/TarotCards/13.jpg';
import card14 from '../assets/TarotCards/14.jpg';
import card15 from '../assets/TarotCards/15.jpg';
import card16 from '../assets/TarotCards/16.jpg';
import card17 from '../assets/TarotCards/17.jpg';
import card18 from '../assets/TarotCards/18.jpg';
import card19 from '../assets/TarotCards/19.jpg';
import card20 from '../assets/TarotCards/20.jpg';
import card21 from '../assets/TarotCards/21.jpg';

export interface CardData{
  id: string;
  name: string;
  image: string;
  meaning: string;
  description: string;
};

export interface SpreadCardData extends CardData {
  isForward: boolean;
};

const mockCards: CardData[] = [
  {
    id: "fool",
    name: "바보",
    image: card0,
    meaning: "새로운 시작",
    description: "순수함과 모험의 시작을 나타냅니다."
  },
  {
    id: "magician",
    name: "마법사",
    image: card1,
    meaning: "의지력과 창조",
    description: "자신의 능력을 발휘할 때입니다."
  },
  {
    id: "high-priestess",
    name: "여교황",
    image: card2,
    meaning: "직감과 내면의 지혜",
    description: "내면의 목소리에 귀 기울이세요."
  },
  {
    id: "empress",
    name: "여황제",
    image: card3,
    meaning: "풍요로움과 창조력",
    description: "풍요로운 에너지가 당신을 둘러싸고 있습니다."
  },
  {
    id: "emperor",
    name: "황제",
    image: card4,
    meaning: "권위와 안정",
    description: "질서와 체계를 통해 목표를 달성하세요."
  },
  {
    id: "hierophant",
    name: "교황",
    image: card5,
    meaning: "전통과 지혜",
    description: "기존의 지혜와 전통에서 답을 찾으세요."
  },
  {
    id: "lovers",
    name: "연인",
    image: card6,
    meaning: "사랑과 선택",
    description: "중요한 선택의 순간이 다가오고 있습니다."
  },
  {
    id: "chariot",
    name: "전차",
    image: card7,
    meaning: "의지와 승리",
    description: "강한 의지로 목표를 향해 나아가세요."
  },
  {
    id: "strength",
    name: "힘",
    image: card8,
    meaning: "내면의 힘",
    description: "부드러움으로 강함을 이겨내세요."
  },
  {
    id: "hermit",
    name: "은둔자",
    image: card9,
    meaning: "내면 탐구",
    description: "혼자만의 시간을 통해 진실을 발견하세요."
  },
  {
    id: "wheel-of-fortune",
    name: "운명의 수레바퀴",
    image: card10,
    meaning: "운명과 변화",
    description: "인생의 전환점이 다가오고 있습니다."
  },
  {
    id: "justice",
    name: "정의",
    image: card11,
    meaning: "균형과 공정",
    description: "공정한 판단이 필요한 시점입니다."
  },
  {
    id: "hanged-man",
    name: "매달린 남자",
    image: card12,
    meaning: "희생과 깨달음",
    description: "새로운 관점에서 상황을 바라보세요."
  },
  {
    id: "death",
    name: "죽음",
    image: card13,
    meaning: "변화와 재탄생",
    description: "끝은 새로운 시작을 의미합니다."
  },
  {
    id: "temperance",
    name: "절제",
    image: card14,
    meaning: "조화와 균형",
    description: "모든 것의 적절한 균형을 찾으세요."
  },
  {
    id: "devil",
    name: "악마",
    image: card15,
    meaning: "유혹과 속박",
    description: "자신을 구속하는 것들을 인식하세요."
  },
  {
    id: "tower",
    name: "탑",
    image: card16,
    meaning: "급작스런 변화",
    description: "예상치 못한 변화가 찾아올 것입니다."
  },
  {
    id: "star",
    name: "별",
    image: card17,
    meaning: "희망과 영감",
    description: "희망의 빛이 당신을 인도할 것입니다."
  },
  {
    id: "moon",
    name: "달",
    image: card18,
    meaning: "환상과 직감",
    description: "불확실함 속에서 직감을 믿으세요."
  },
  {
    id: "sun",
    name: "태양",
    image: card19,
    meaning: "성공과 기쁨",
    description: "밝은 에너지가 당신을 둘러싸고 있습니다."
  },
  {
    id: "judgement",
    name: "심판",
    image: card20,
    meaning: "각성과 부활",
    description: "과거를 정리하고 새롭게 태어나세요."
  },
  {
    id: "world",
    name: "세계",
    image: card21,
    meaning: "완성과 성취",
    description: "모든 것이 완성되어 가고 있습니다."
  }
];



const usedCardIds = new Set<string>();

export const generateRandomCard = (): SpreadCardData =>{
  const availableCards = mockCards.filter(card => !usedCardIds.has(card.id));

  if (availableCards.length === 0) {
    usedCardIds.clear();
    return generateRandomCard();
  }
  
  const randomIndex = Math.floor(Math.random() * availableCards.length);
  const selectedCard = availableCards[randomIndex];
  
  usedCardIds.add(selectedCard.id);

  const isForward = Math.random() >= 0.5;

  return {
    ...selectedCard,
    isForward
  };
};

export const resetCardSession = (): void => {
  usedCardIds.clear();
};