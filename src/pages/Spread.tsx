import { useNavigate } from 'react-router-dom';
import ThreeCard from '../components/ThreeCard';
import CelticCross from '../components/CelticCross';
import Relationship from '../components/Relationship';
import Horoscope from '../components/Horoscope';
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
    switch(spreadType) {
      case 'three-card':
        return <ThreeCard onComplete={onComplete} />;
      case 'celtic-cross':
        return <CelticCross onComplete={onComplete} />;
      case 'relationship':
        return <Relationship onComplete={onComplete} />;
      case 'horoscope':
        return <Horoscope onComplete={onComplete} />;
      default:
        return <div>Unknown spread type</div>
    }
  };

  return (
    <div className="spread-container">
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
      </div>
    </div>
  );
};

export default Spread;