import Card from './Card';
import { useCardReveal } from '../hooks/useCardReveal';
import type { SpreadCardData } from '../utils/mockCards';
import './Relationship.css';

interface RelationshipProps {
  onComplete: (cards: SpreadCardData[]) => void;
}

const Relationship = ({ onComplete }: RelationshipProps) => {
  const cardPositions = [
    '나',
    '상대방',
    '상대방에 대한 나의 생각',
    '나에 대한 상대방의 생각',
    '관계에 대한 나의 생각',
    '관계에 대한 상대방의 생각',
    '현재 상황'
  ];

  const { isCardRevealed, getCard, handleNext } = useCardReveal(7, onComplete);

  return (
    <div className="relationship-container">
      <div className="relationship-layout">
        <div className="top">
          <div className="card-position">
            <Card card={getCard(0)} revealed={isCardRevealed(0)} position={cardPositions[0]} size="small" className="card-1" />
          </div>
          <div className="card-position">
            <Card card={getCard(1)} revealed={isCardRevealed(1)} position={cardPositions[1]} size="small" className="card-2" />
          </div>
        </div>
        <div className="middle-top">
          <div className="card-position">
            <Card card={getCard(2)} revealed={isCardRevealed(2)} position={cardPositions[2]} size="small" className="card-3" />
          </div>
          <div className="card-position">
            <Card card={getCard(3)} revealed={isCardRevealed(3)} position={cardPositions[3]} size="small" className="card-4" />
          </div>
        </div>
        <div className="middle-bottom">
          <div className="card-position">
            <Card card={getCard(4)} revealed={isCardRevealed(4)} position={cardPositions[4]} size="small" className="card-5" />
          </div>
          <div className="card-position">
            <Card card={getCard(5)} revealed={isCardRevealed(5)} position={cardPositions[5]} size="small" className="card-6" />
          </div>
        </div>
        <div className="bottom">
          <div className="card-position">
            <Card card={getCard(6)} revealed={isCardRevealed(6)} position={cardPositions[6]} size="small" className="card-7" />
          </div>
        </div>
      </div>
      <button onClick={handleNext} className="next-button">
        다음
      </button>      
    </div>
  )
}

export default Relationship;