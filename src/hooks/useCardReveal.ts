import { useState } from 'react';
import { generateRandomCard } from '../utils/mockCards';
import type { SpreadCardData } from '../utils/mockCards';

export const useCardReveal = (totalCards: number, onComplete: (cards: SpreadCardData[]) => void) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [revealedCards, setRevealedCards] = useState<SpreadCardData[]>([]);

  const handleNext = () => {
    if (currentStep < totalCards) {
      const newCard = generateRandomCard();
      setRevealedCards(prev => [...prev, newCard]);
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === totalCards) {
      onComplete(revealedCards);
    }
  };

  const isCardRevealed = (index: number) => currentStep >= index + 1;
  const getCard = (index: number) => revealedCards[index];
  const isComplete = currentStep === totalCards;

  return { currentStep, revealedCards, handleNext, isCardRevealed, getCard, totalCards, isComplete };
};
