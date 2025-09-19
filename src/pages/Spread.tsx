import { useNavigate } from 'react-router-dom';
import ThreeCard from '../components/ThreeCard';
import CelticCross from '../components/CelticCross';
import Relationship from '../components/Relationship';
import Horoscope from '../components/Horoscope';
import { useCardReveal } from '../hooks/useCardReveal';
import type { SpreadCardData } from '../utils/mockCards';
import './Spread.css'

interface SpreadProps {
  spreadType: string;
  userInfo: { name: string; concern: string };
  onComplete: (cards: SpreadCardData[]) => void;
}

const Spread = ({ spreadType, userInfo, onComplete } : SpreadProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/spread-select');
  };

  const getCardCount = () => {
    const counts = {
      'three-card': 3,
      'celtic-cross': 10,
      'relationship': 7,
      'horoscope': 12
    };
    return counts[spreadType as keyof typeof counts] || 3;
  };

  const { handleNext, isComplete, isCardRevealed, getCard } = useCardReveal(getCardCount(), onComplete);

  const handleNextClick = () => {
    handleNext();
    if (isComplete) {
      navigate('/result');
    }
  };

  const getSpreadTitle = () => {
    const titles = {
      'three-card': 'Three Cards',
      'celtic-cross': 'Celtic Cross',
      'relationship': 'Relationship',
      'horoscope': 'Horoscope'
    };
    return titles[spreadType as keyof typeof titles] || 'Tarot Spread';
  };

  const renderSpreadComponent = () => {
    const spreadProps = {
      isCardRevealed,
      getCard
    };

    switch(spreadType) {
      case 'three-card':
        return <ThreeCard {...spreadProps} />;
      case 'celtic-cross':
        return <CelticCross {...spreadProps} />;
      case 'relationship':
        return <Relationship {...spreadProps} />;
      case 'horoscope':
        return <Horoscope {...spreadProps} />;
      default:
        return <div>Unknown spread type</div>
    }
  };

  return (
    <div className="spread-container page-enter">
      <div className="spread-header">
        <button onClick={handleBack} className="back-button">
          돌아가기
        </button>
        <h1 className="spread-title">{getSpreadTitle()}</h1>
      </div>

      <div className="spread-middle">
        <div className="card-spread-box">
          {renderSpreadComponent()}
        </div>
      </div>

      <div className="spread-bottom">
        <div className="text-box">
          {userInfo.name}
        </div>
        <button onClick={handleNextClick} className="next-button animate-bounce">
          다음
        </button>
      </div>
    </div>
  );
};

export default Spread;