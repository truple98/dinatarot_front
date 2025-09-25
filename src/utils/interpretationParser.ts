export interface ParsedInterpretation {
  introduction: string;
  cardInterpretations: CardInterpretationSection[];
  synthesis: string;
  conclusion: string;
}

export interface CardInterpretationSection {
  positionName: string;
  cardName: string;
  content: string;
  originalText: string;
}

export const parseInterpretation = (interpretation: string): ParsedInterpretation => {
  const result: ParsedInterpretation = {
    introduction: '',
    cardInterpretations: [],
    synthesis: '',
    conclusion: ''
  };

  // 구조화된 섹션들로 분할
  const sections = splitBySectionHeaders(interpretation);

  // 각 섹션을 파싱
  sections.forEach(section => {
    if (section.header.includes('시작 문구')) {
      // - "텍스트" 형태에서 텍스트만 추출
      result.introduction = section.content.replace(/^-\s*[""]?(.*?)[""]?$/m, '$1').trim();
    } else if (section.header.includes('카드 해석')) {
      result.cardInterpretations = parseCardSections(section.content);
    } else if (section.header.includes('해석 종합')) {
      // - "텍스트" 형태에서 텍스트만 추출
      result.synthesis = section.content.replace(/^-\s*[""]?(.*?)[""]?$/m, '$1').trim();
    } else if (section.header.includes('마무리')) {
      // - "텍스트" 형태에서 텍스트만 추출
      result.conclusion = section.content.replace(/^-\s*[""]?/m, '').trim();
    }
  });

  return result;
};

interface Section {
  header: string;
  content: string;
}

const splitBySectionHeaders = (interpretation: string): Section[] => {
  // **제목** 패턴으로 섹션 분할
  const sections: Section[] = [];
  const lines = interpretation.split('\n');

  let currentSection: Section | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    // **제목** 패턴 찾기
    const headerMatch = trimmed.match(/^\*\*(.*?)\*\*$/);

    if (headerMatch) {
      // 이전 섹션 저장
      if (currentSection) {
        sections.push(currentSection);
      }

      // 새 섹션 시작
      currentSection = {
        header: headerMatch[1],
        content: ''
      };
    } else if (currentSection && trimmed) {
      // 현재 섹션에 내용 추가
      currentSection.content += (currentSection.content ? '\n' : '') + trimmed;
    } else if (!currentSection && trimmed) {
      // 헤더 없이 시작하는 경우 (시작 문구)
      currentSection = {
        header: '시작 문구',
        content: trimmed
      };
    }
  }

  // 마지막 섹션 저장
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
};

const parseCardSections = (content: string): CardInterpretationSection[] => {
  const cardInterpretations: CardInterpretationSection[] = [];

  // **포지션: 카드명 (방향)** 패턴으로 분할
  const cardSectionRegex = /- \*\*(.*?):\s*(.*?)\s*\(([^)]+)\)\*\*\s*([\s\S]*?)(?=(?:- \*\*|$))/g;
  let match;

  while ((match = cardSectionRegex.exec(content)) !== null) {
    const [, positionName, cardName, orientation, interpretationText] = match;

    cardInterpretations.push({
      positionName: positionName.trim(),
      cardName: cardName.trim(),
      content: interpretationText.trim(),
      originalText: match[0]
    });
  }

  return cardInterpretations;
};

