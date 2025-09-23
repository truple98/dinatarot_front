import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllSpreads, type SpreadData } from '../utils/tarot';

import './SpreadSelect.css';

interface SpreadSelectProps {
  onSelect: (spreadType: string) => void;
}

const SpreadSelect = ({ onSelect }: SpreadSelectProps) => {
  const navigate = useNavigate();
  const [spreads, setSpreads] = useState<SpreadData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      setLoading(true);
      const spreadsData = getAllSpreads();
      setSpreads(spreadsData);
    } catch (error) {
      setError(error instanceof Error ? error.message : '스프레드 목록을 불러오는데 실패했다요...');
    } finally {
      setLoading(false);
    }
  }, []);

  const getSpreadIcon = (spreadId: string) => {
    const icons = {
      'three-card': '✧',
      'celtic-cross': '✦',
      'relationship': '❋',
      'horoscope': '✤'
    };
    return icons[spreadId as keyof typeof icons] || '✧';
  };

  const handleSelect = (type: string) => {
    onSelect(type);
    navigate('/spread');
  };

  const handleBack = () => {
    navigate('/user-info');
  };

  if (loading) {
    return (
      <div className="spreadselect-container page-enter">
        <div className="loading-message">스프레드 목록을 불러오는 중이다요...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="spreadselect-container page-enter">
        <div className="error-message" style={{color: 'red', textAlign: 'center'}}>
          {error}
        </div>
      </div>
    );
  }

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
                <div className="spread-icon">{getSpreadIcon(spread.id)}</div>
                <h3 className="spread-title">{spread.name}</h3>
                <p className="spread-subtitle">{spread.nameKr}</p>
                <div className="spread-cards-count">
                  {spread.cardCount}장의 카드
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