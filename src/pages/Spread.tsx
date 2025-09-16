interface SpreadProps {
  spreadType: string;
  userInfo: { name: string; concern: string };
  onComplete: (cards: any[]) => void;
}

const Spread = ({ spreadType, userInfo, onComplete } : SpreadProps) => {
  return (
    <div>Spread</div>
  );
};

export default Spread;