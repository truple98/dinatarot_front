import Card from './Card';
import { useCardReveal } from '../hooks/useCardReveal';
import type { SpreadCardData } from '../utils/mockCards';
import './ThreeCard.css';

interface ThreeCardProps {
  onComplete: (cards: SpreadCardData[]) => void;
}

const ThreeCard = ({ onComplete }: ThreeCardProps) => {
  const cardPositions = ['과거', '현재', '미래'];

  const { isCardRevealed, getCard, handleNext } = useCardReveal(3, onComplete);

  return (
    <div className="three-card-container">
      <div className="cards-layout">
        <Card position={cardPositions[0]} revealed={isCardRevealed(0)} card={getCard(0)} />
        <Card position={cardPositions[1]} revealed={isCardRevealed(1)} card={getCard(1)} />
        <Card position={cardPositions[2]} revealed={isCardRevealed(2)} card={getCard(2)} />
      </div>

      <button onClick={handleNext} className="next-button">
        다음
      </button>
    </div>
  );
};

export default ThreeCard;