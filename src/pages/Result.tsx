import { useNavigate } from "react-router-dom";
import type { SpreadCardData } from "../utils/mockCards";
import './Result.css'

interface ResultProps {
  userInfo: { name: string; concern: string } | null;
  spreadType: string | null;
  selectedCards: SpreadCardData[];
}

const Result = ({ userInfo, selectedCards }: ResultProps) => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate('/');
  };

  const getOverallInterpretation = () => {
    if (!selectedCards.length || !userInfo) {
      return "타로 결과를 불러올 수 없다요.";
    }

    return `${userInfo.name}씨의 고민에 대해 타로가 말하고 있는거다요.
    
    과거의 경험들이 현재 상황에 영향을 미치고 있으며, 앞으로의 길에는 새로운 변화와 기회가 기다리고 있다요. 

    카드들이 전하는 메시지를 마음 깊이 받아들이고, 자신의 직감을 믿으며 앞으로 나아가는 것이 중요하다요. 

    어려움이 있더라도 긍정적인 마음가짐을 유지하면서 한 걸음씩 나아간다면, 원하는 결과를 얻을 수 있을 것이다요.`;
  };

  return (
    <div className="result-container page-enter">
      <div className="interpretation-text">
        {getOverallInterpretation()}
      </div>

      <div className="action-buttons">
        <button onClick={handleHome} className="home-btn animate-bounce">
          처음으로
        </button>
      </div>
    </div>
  );
};

export default Result;