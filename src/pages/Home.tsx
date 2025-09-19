import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleStartTarot = () => {
    navigate('/user-info');
  };

  return(
    <div className="home-container page-enter">
      <div className="home-card">
        <h1 className="home-title">DinaTarot</h1>
        <p className="home-description">아디나와 함께 타로 점을 보는거다요. <br/> 당신의 고민을 아디나가 들어주겠다요.</p>
        <button onClick={handleStartTarot} className="home-button animate-bounce">타로 보기</button>
      </div>
    </div>
  )
}

export default Home;