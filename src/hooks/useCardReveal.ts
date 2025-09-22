import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { DrawnCard } from '../services/api';
import { drawnCardToSpreadCard, type SpreadCardData } from '../types/card.types';

export const useCardReveal = (spreadType: string, totalCards: number, onComplete: (cards: SpreadCardData[]) => void) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [revealedCards, setRevealedCards] = useState<SpreadCardData[]>([]);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const drawCards = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await apiService.drawCards({
          spreadType,
          count: totalCards
        });
        
        if (response.success) {
          setDrawnCards(response.data.cards);
        } else {
          setError(response.message);
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : '카드 추출을 실패했다요...');
      } finally {
        setLoading(false);
      }
    };
    
    drawCards();
  }, [spreadType, totalCards]);

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
      onComplete(revealedCards);
    }
  };

  const isCardRevealed = (index: number) => currentStep >= index + 2;
  const getCard = (index: number) => revealedCards[index];
  const isComplete = currentStep === totalCards + 1;
  const canProceed = drawnCards.length > 0 && !loading;

  return { currentStep, revealedCards, handleNext, isCardRevealed, getCard, totalCards, isComplete, loading, error, canProceed };
};
