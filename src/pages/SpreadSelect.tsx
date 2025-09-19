import { useNavigate } from 'react-router-dom';
import './SpreadSelect.css';

interface SpreadSelectProps {
  onSelect: (spreadType: string) => void;
}

const SpreadSelect = ({ onSelect }: SpreadSelectProps) => {
  const navigate = useNavigate();

  const handleSelect = (type: string) => {
    onSelect(type);
    navigate('/spread');
  };

  const handleBack = () => {
    navigate('/user-info');
  };

  const spreads = [
    {
      id: 'three-card',
      title: 'Three Cards',
      subtitle: '과거, 현재, 미래',
      description: '간단하고 명확한 3장의 카드로\n과거와 현재, 미래를 알아보는거다요.',
      icon: '✧',
      cards: 3
    },
    {
      id: 'celtic-cross',
      title: 'Celtic Cross',
      subtitle: '종합적인 운세',
      description: '10장의 카드로 상황을 깊이\n분석해보는거다요.',
      icon: '✦',
      cards: 10
    },
    {
      id: 'relationship',
      title: 'Relationship',
      subtitle: '인간관계 해석',
      description: '6장의 카드로 관계의 진실을\n들여다보는거다요.',
      icon: '❋',
      cards: 6
    },
    {
      id: 'horoscope',
      title: 'Horoscope',
      subtitle: '12궁도 운세',
      description: '12장의 카드로 전체적인\n운명을 보는거다요.',
      icon: '✤',
      cards: 12
    }
  ];

  return (
    <div className="spreadselect-container page-enter">
      <div className="spreadselect-content">
        <div className="top-section">
          <button onClick={handleBack} className="back-button">
            돌아가기
          </button>
        </div>

        <div className="middle-section">
          <h1 className="spreadselect-title">
            타로의 방식을 고르는거다요.
          </h1>
        </div>

        <div className="bottom-section">
          <div className="spreads-grid">
            {spreads.map((spread) => (
              <div
                key={spread.id}
                className="spread-card animate-pop"
                onClick={() => handleSelect(spread.id)}
              >
                <div className="spread-icon">{spread.icon}</div>
                <h3 className="spread-title">{spread.title}</h3>
                <p className="spread-subtitle">{spread.subtitle}</p>
                <p className="spread-description">
                  {spread.description.split('\n').map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < spread.description.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </p>
                <div className="spread-cards-count">
                  {spread.cards}장의 카드
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpreadSelect;