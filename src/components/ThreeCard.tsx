import Card from './Card';
import type { SpreadCardData } from '../utils/tarot';
import './ThreeCard.css';

interface ThreeCardProps {
  isCardRevealed: (index: number) => boolean;
  getCard: (index: number) => SpreadCardData | undefined;
}

const ThreeCard = ({ isCardRevealed, getCard }: ThreeCardProps) => {
  const cardPositions = ['과거', '현재', '미래'];

  return (
    <div className="three-card-container">
      <div className="cards-layout">
        <Card position={cardPositions[0]} revealed={isCardRevealed(0)} card={getCard(0)} />
        <Card position={cardPositions[1]} revealed={isCardRevealed(1)} card={getCard(1)} />
        <Card position={cardPositions[2]} revealed={isCardRevealed(2)} card={getCard(2)} />
      </div>
    </div>
  );
};

export default ThreeCard;