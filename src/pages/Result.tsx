interface ResultProps {
  userInfo: { name: string; concern: string } | null;
  spreadType: string | null;
  selectedCards: any[];
}

const Result = ({ userInfo, spreadType, selectedCards }: ResultProps) => {
  return (
    <div>Result</div>
  );
};

export default Result;