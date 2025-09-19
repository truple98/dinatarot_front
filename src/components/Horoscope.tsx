import Card from './Card';
import type { SpreadCardData } from '../utils/mockCards';
import './Horoscope.css'

interface HoroscopeProps {
  isCardRevealed: (index: number) => boolean;
  getCard: (index: number) => SpreadCardData | undefined;
}

const Horoscope = ({ isCardRevealed, getCard }: HoroscopeProps) => {
  const cardPositions = [
    '자아와 정체성',
    '재물과 소유',
    '의사소통과 학습',
    '가정과 뿌리',
    '창조와 자녀',
    '일상과 건강',
    '파트너십과 관계',
    '변화와 공유자원',
    '철학과 여행',
    '명예와 커리어',
    '우정과 꿈',
    '잠재의식과 영성'
  ];

  return (
    <div className="horoscope-container">
      <div className="horoscope-layout">
        <div className="horoscope-grid">
          <div className="first">
            <Card card={getCard(11)} revealed={isCardRevealed(11)} position={cardPositions[11]} size="small" className="card-12"/>
            <Card card={getCard(0)} revealed={isCardRevealed(0)} position={cardPositions[0]} size="small" className="card-1"/>
          </div>
          <div className="second">
            <Card card={getCard(10)} revealed={isCardRevealed(10)} position={cardPositions[10]} size="small" className="card-11"/>
            <Card card={getCard(1)} revealed={isCardRevealed(1)} position={cardPositions[1]} size="small" className="card-2"/>
          </div>
          <div className="third">
            <Card card={getCard(9)} revealed={isCardRevealed(9)} position={cardPositions[9]} size="small" className="card-10"/>
            <Card card={getCard(2)} revealed={isCardRevealed(2)} position={cardPositions[2]} size="small" className="card-3"/>
          </div>
          <div className="fourth">
            <Card card={getCard(8)} revealed={isCardRevealed(8)} position={cardPositions[8]} size="small" className="card-9"/>
            <Card card={getCard(3)} revealed={isCardRevealed(3)} position={cardPositions[3]} size="small" className="card-4"/>
          </div>
          <div className="fifth">
            <Card card={getCard(7)} revealed={isCardRevealed(7)} position={cardPositions[7]} size="small" className="card-8"/>
            <Card card={getCard(4)} revealed={isCardRevealed(4)} position={cardPositions[4]} size="small" className="card-5"/>
          </div>
          <div className="sixth">
            <Card card={getCard(6)} revealed={isCardRevealed(6)} position={cardPositions[6]} size="small" className="card-7"/>
            <Card card={getCard(5)} revealed={isCardRevealed(5)} position={cardPositions[5]} size="small" className="card-6"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Horoscope;