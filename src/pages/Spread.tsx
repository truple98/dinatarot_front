import { useNavigate } from 'react-router-dom';
import ThreeCard from '../components/ThreeCard';
import CelticCross from '../components/CelticCross';
import Relationship from '../components/Relationship';
import Horoscope from '../components/Horoscope';
import { useCardReveal } from '../hooks/useCardReveal';
import { getSpreadData, type SpreadCardData } from '../utils/tarot';
import './Spread.css'

interface SpreadProps {
  spreadType: string;
  userInfo: { name: string; concern: string };
  onComplete: (cards: SpreadCardData[], interpretation?: string) => void;
}

const Spread = ({ spreadType, userInfo, onComplete } : SpreadProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/spread-select');
  };

  const getCardCount = () => {
    const spreadData = getSpreadData(spreadType);
    return spreadData?.cardCount || 3;
  };

  const { handleNext, isComplete, isCardRevealed, getCard, loading, error, canProceed, currentStep } = useCardReveal(spreadType, getCardCount(), userInfo, onComplete);

  const handleNextClick = async () => {
    if (loading) return;

    const wasLastStep = currentStep === getCardCount();
    await handleNext();

    if (wasLastStep) {
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
          {error && (
            <div className="error-message" style={{color: 'red', marginTop: '10px'}}>
              {error}
            </div>
          )}
        </div>
        <button onClick={handleNextClick} className="next-button animate-bounce" disabled={!canProceed || loading} >
          {loading ? '해석중...' : isComplete ? '완료!' : '다음'}
        </button>
      </div>
    </div>
  );
};

export default Spread;