import { useState, useEffect } from 'react';
import { drawRandomCards, drawnCardToSpreadCard, type DrawnCard, type SpreadCardData } from '../utils/tarot';
import { apiService } from '../services/api';
import { parseInterpretation, type ParsedInterpretation } from '../utils/interpretationParser';

export const useCardReveal = (
  spreadType: string,
  totalCards: number,
  userInfo: { name: string; concern: string },
  onComplete: (cards: SpreadCardData[], interpretation?: string) => void
) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [revealedCards, setRevealedCards] = useState<SpreadCardData[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interpretation, setInterpretation] = useState<string | undefined>(undefined);
  const [parsedInterpretation, setParsedInterpretation] = useState<ParsedInterpretation | null>(null);

  useEffect(() => {
    const initializeCards = async () => {
      setLoading(true);
      setError(null);

      try {
        const cards = drawRandomCards(spreadType);
        setDrawnCards(cards);

        // 카드를 뽑은 즉시 API 요청 보내기
        const response = await apiService.getTarotInterpretation({
          userName: userInfo.name,
          userConcern: userInfo.concern,
          spreadType,
          drawnCards: cards
        });

        if (response.success && response.data) {
          setInterpretation(response.data.interpretation);

          // 응답 파싱
          const parsed = parseInterpretation(response.data.interpretation);
          setParsedInterpretation(parsed);

          console.log('파싱 결과:', parsed); // 디버깅용
        } else {
          setError(response.message || '해석 요청에 실패했다요...');
        }
      } catch (error) {
        console.error('카드 뽑기 또는 해석 요청 실패:', error);
        setError('서버와 연결에 실패했다요... 다시 시도해주세요!');
      } finally {
        setLoading(false);
      }
    };

    initializeCards();
  }, [spreadType, totalCards, userInfo.name, userInfo.concern]);

  const handleNext = () => {
    if (drawnCards.length === 0) return;

    if (currentStep < totalCards) {
      const cardIndex = currentStep;
      if (drawnCards[cardIndex]) {
        const newCard = drawnCardToSpreadCard(drawnCards[cardIndex]);
        setRevealedCards(prev => [...prev, newCard]);
      }
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalCards) {
      // 모든 카드를 다 뒤집었으면 해석과 함께 완료 처리
      const allCards = drawnCards.map(drawnCard => drawnCardToSpreadCard(drawnCard));
      onComplete(allCards, interpretation);
    }
  };

  const isCardRevealed = (index: number) => currentStep >= index + 1;
  const getCard = (index: number) => revealedCards[index];
  const isComplete = currentStep === totalCards + 1;
  const canProceed = drawnCards.length > 0 && !loading && interpretation !== undefined;

  // 현재 단계에서 표시할 텍스트 가져오기
  const getCurrentDialogueText = (): string => {
    if (currentStep === 0) {
      return `${userInfo.name}씨, 타로 해석이 준비되었다요. 첫 번째 카드를 보겠다요!`;
    }

    if (currentStep > totalCards) {
      return "모든 카드 해석이 완료되었다요!";
    }

    return "카드를 준비하고 있다요...";
  };

  return {
    currentStep,
    revealedCards,
    handleNext,
    isCardRevealed,
    getCard,
    totalCards,
    isComplete,
    loading,
    error,
    canProceed,
    interpretation,
    parsedInterpretation,
    getCurrentDialogueText
  };
};