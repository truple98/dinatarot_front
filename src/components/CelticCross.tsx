import Card from './Card';
import type { SpreadCardData } from '../utils/mockCards';
import './CelticCross.css';

interface CelticCrossProps {
  isCardRevealed: (index: number) => boolean;
  getCard: (index: number) => SpreadCardData | undefined;
}

const CelticCross = ({ isCardRevealed, getCard }: CelticCrossProps) => {
  const cardPositions = [
    '현재 상황',
    '도전과 장애물',
    '먼 과거',
    '가까운 과거',
    '가까운 미래',
    '가능한 미래',
    '현재 내면',
    '외적 영향',
    '희망과 두려움',
    '최종 결과'
  ];

  return (
    <div className="celtic-cross-container">
      <div className="celtic-cross-layout">
        <div className="cross-section">
          <div className="card-top">
            <Card card={getCard(4)} revealed={isCardRevealed(4)} position={cardPositions[4]} size="small" className="card-5"/>
          </div>
          <div className="card-left">
            <Card card={getCard(3)} revealed={isCardRevealed(3)} position={cardPositions[3]} size="small" className="card-4"/>
          </div>
          <div className="card-center">
            <Card card={getCard(0)} revealed={isCardRevealed(0)} position={cardPositions[0]} size="small" className="card-1 center-base"/>
            <Card card={getCard(1)} revealed={isCardRevealed(1)} position={cardPositions[1]} size="small" className="card-2 center-cross"/>
          </div>
          <div className="card-right">
            <Card card={getCard(5)} revealed={isCardRevealed(5)} position={cardPositions[5]} size="small" className="card-6"/>
          </div>
          <div className="card-bottom">
            <Card card={getCard(2)} revealed={isCardRevealed(2)} position={cardPositions[2]} size="small" className="card-3"/>
          </div>
        </div>
        <div className="staff-section">
          <div className="card-position staff">
            <Card card={getCard(9)} revealed={isCardRevealed(9)} position={cardPositions[9]} size="small" className="card-10"/>
          </div>
          <div className="card-position staff">
            <Card card={getCard(8)} revealed={isCardRevealed(8)} position={cardPositions[8]} size="small" className="card-9"/>
          </div>
          <div className="card-position staff">
            <Card card={getCard(7)} revealed={isCardRevealed(7)} position={cardPositions[7]} size="small" className="card-8"/>
          </div>
          <div className="card-position staff">
            <Card card={getCard(6)} revealed={isCardRevealed(6)} position={cardPositions[6]} size="small" className="card-7"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CelticCross;