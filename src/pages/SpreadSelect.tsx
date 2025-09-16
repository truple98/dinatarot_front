interface SpreadSelectProps {
  onSelect: (spreadType: string) => void;
}

const SpreadSelect = ({ onSelect }: SpreadSelectProps) => {
  const handleSelect = (type: string) => {
    onSelect(type);
  };

  return (
    <div>
      <h1>타로 방식 선택</h1>
      <button onClick={() => handleSelect('three-card')}>3장 스프레드</button>
      <button onClick={() => handleSelect('celtic-cross')}>켈틱 크로스</button>
      <button onClick={() => handleSelect('relationship')}>관계 스프레드</button>
      <button onClick={() => handleSelect('horoscope')}>호로스코프</button>
    </div>
  );
};

export default SpreadSelect;