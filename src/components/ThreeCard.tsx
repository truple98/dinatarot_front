import { useState } from 'react';
import Card from './Card';
import { generateRandomCard } from '../utils/mockCards';
import type { SpreadCardData } from '../utils/mockCards';
import './ThreeCard.css';

interface ThreeCardProps {
  onComplete: (cards: SpreadCardData[]) => void;
}

const ThreeCard = ({ onComplete }: ThreeCardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [revealedCards, setRevealedCards] = useState<SpreadCardData[]>([]);

  const handleNext = () => {
    if (currentStep < 3) {
      const newCard = generateRandomCard();
      setRevealedCards(prev => [...prev, newCard]);
      setCurrentStep(prev => prev + 1);
    } else if (currentStep === 3) {
      onComplete(revealedCards);
    }
  };

  const getButtonText = () => {
    switch(currentStep) {
      case 0: return "다음";
      case 1: return "다음";
      case 2: return "다음";
      case 3: return "종합";
      default: return "다음";
    }
  };

  return (
    <div className="three-card-container">
      <div className="cards-layout">
      <Card position="past" revealed={currentStep >= 1} card={revealedCards[0]} />
      <Card position="present" revealed={currentStep >= 2} card={revealedCards[1]} />
      <Card position="future" revealed={currentStep >= 3} card={revealedCards[2]} />
      </div>

      <button onClick={handleNext} className="next-button">
        {getButtonText()}
      </button>
    </div>
  );
};

export default ThreeCard;