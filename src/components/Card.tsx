import type { SpreadCardData } from '../types/card.types';
import cardBackImage from '../assets/interface/tarot_card_back.jpg'
import './Card.css';

interface CardProps {
  card?: SpreadCardData;
  revealed: boolean;
  position?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  className?: string;
}

const Card = ({ card, revealed, position, size = 'medium', onClick, className = '' }: CardProps) => {
  return(
    <div
      className={`card ${size} ${revealed ? 'revealed' : 'hidden'} ${className} ${card?.isForward === false ? 'reversed' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-back">
          <img src={cardBackImage} alt="card-back" className="card-back-image" />
        </div>

        {revealed && card && (
          <div className="card-front">
              <img 
                src={card.image} 
                alt={card.name}
                className="card-front-image"
                style={{ transform: card.isForward ? 'none' : 'rotate(180deg)' }}
              />
          </div>
        )}
      </div>
      {position && (
        <div className="position-label">{position}</div>
      )}
    </div>
  );
};

export default Card;