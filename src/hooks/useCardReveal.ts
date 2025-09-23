import { useState, useEffect } from 'react';
import { drawRandomCards, drawnCardToSpreadCard, type DrawnCard, type SpreadCardData } from '../utils/tarot';
import { apiService } from '../services/api';

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

  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      const cards = drawRandomCards(spreadType);
      setDrawnCards(cards);
    } catch (error) {
      setError(error instanceof Error ? error.message : '카드 추출을 실패했다요...');
    } finally {
      setLoading(false);
    }
  }, [spreadType, totalCards]);

  const handleNext = async () => {
    if (drawnCards.length === 0) return;

    if (currentStep < totalCards) {
      const cardIndex = currentStep;
      if (drawnCards[cardIndex]) {
        const newCard = drawnCardToSpreadCard(drawnCards[cardIndex]);
        setRevealedCards(prev => [...prev, newCard]);
      }
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalCards) {
      setLoading(true);
      try {
        const response = await apiService.getTarotInterpretation({
          userName: userInfo.name,
          userConcern: userInfo.concern,
          spreadType,
          drawnCards
        });

        if (response.success && response.data) {
          onComplete(revealedCards, response.data.interpretation);
        } else {
          setError(response.message || '해석 요청에 실패했다요...');
          onComplete(revealedCards);
        }
      } catch (error) {
        console.error('타로 해석 요청 실패:', error);
        setError('서버와 연결에 실패했다요... 다시 시도해주세요!');
        onComplete(revealedCards);
      } finally {
        setLoading(false);
      }
    }
  };

  const isCardRevealed = (index: number) => currentStep >= index + 1;
  const getCard = (index: number) => revealedCards[index];
  const isComplete = currentStep === totalCards + 1;
  const canProceed = drawnCards.length > 0 && !loading;

  return { currentStep, revealedCards, handleNext, isCardRevealed, getCard, totalCards, isComplete, loading, error, canProceed };
};