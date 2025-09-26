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

  const sections = splitBySectionHeaders(interpretation);

  sections.forEach(section => {
    if (section.header.includes('시작 문구')) {
      result.introduction = section.content.replace(/^-\s*[""]?(.*?)[""]?$/m, '$1').trim();
    } else if (section.header.includes('카드 해석')) {
      result.cardInterpretations = parseCardSections(section.content);
    } else if (section.header.includes('해석 종합')) {
      result.synthesis = section.content.replace(/^-\s*[""]?(.*?)[""]?$/m, '$1').trim();
    } else if (section.header.includes('마무리')) {
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
  const sections: Section[] = [];
  const lines = interpretation.split('\n');

  let currentSection: Section | null = null;

  for (const line of lines) {
    const trimmed = line.trim();

    const headerMatch = trimmed.match(/^\*\*(.*?)\*\*$/);

    if (headerMatch) {
      if (currentSection) {
        sections.push(currentSection);
      }

      currentSection = {
        header: headerMatch[1],
        content: ''
      };
    } else if (currentSection && trimmed) {
      currentSection.content += (currentSection.content ? '\n' : '') + trimmed;
    } else if (!currentSection && trimmed) {
      currentSection = {
        header: '시작 문구',
        content: trimmed
      };
    }
  }

  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
};

const parseCardSections = (content: string): CardInterpretationSection[] => {
  const cardInterpretations: CardInterpretationSection[] = [];

  const cardSectionRegex = /- \*\*(.*?):\s*(.*?)\s*\(([^)]+)\)\*\*\s*([\s\S]*?)(?=(?:- \*\*|$))/g;
  let match;

  while ((match = cardSectionRegex.exec(content)) !== null) {
    const [positionName, cardName, interpretationText] = match;

    cardInterpretations.push({
      positionName: positionName.trim(),
      cardName: cardName.trim(),
      content: interpretationText.trim(),
      originalText: match[0]
    });
  }

  return cardInterpretations;
};

