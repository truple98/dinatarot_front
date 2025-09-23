import { useNavigate } from "react-router-dom";
import type { SpreadCardData } from '../utils/tarot';
import './Result.css'

interface ResultProps {
  userInfo: { name: string; concern: string } | null;
  spreadType: string | null;
  selectedCards: SpreadCardData[];
  interpretation: string | null;
}

const Result = ({ userInfo, selectedCards, interpretation }: ResultProps) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  const handleRetry = () => {
    navigate('/spread');
  };

  const getOverallInterpretation = () => {
    if (!selectedCards.length || !userInfo) {
      return "타로 결과를 불러올 수 없다요.";
    }

    if (!interpretation) {
      return "해석을 가져오는데 실패했다요... 다시 시도해주세요!";
    }

    return interpretation;
  };

  return (
    <div className="result-container page-enter">
      <div className="interpretation-text">
        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
          {getOverallInterpretation()}
        </pre>
      </div>

      <div className="action-buttons">
        {!interpretation && (
          <button onClick={handleRetry} className="retry-btn animate-bounce">
            다시 해석받기
          </button>
        )}
        <button onClick={handleHome} className="home-btn animate-bounce">
          처음으로
        </button>
      </div>
    </div>
  );
};

export default Result;