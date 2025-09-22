const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface DrawCardsRequest {
  spreadType: string;
  count: number;
}

export interface GenerateReadingRequest {
  cards: DrawnCard[];
  spread: SpreadData;
  userName: string;
  userConcern: string;
  question?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export interface SpreadData {
  id: string;
  name: string;
  nameKr: string;
  cardCount: number;
  description: string;
}

export interface TarotCard {
  id: number;
  name: string;
  nameKr: string;
  suit?: 'major' | 'cups' | 'wands' | 'swords' | 'pentacles';
  arcana: 'major' | 'minor';
  upright: {
    keywords: string[];
    meaning: string;
    description: string;
  };
  reversed: {
    keywords: string[];
    meaning: string;
    description: string;
  };
  imageFile: string;
  element?: 'fire' | 'water' | 'air' | 'earth';
  planet?: string;
  zodiac?: string;
}

export interface DrawnCard {
  card: TarotCard;
  position: number;
  positionName: string;
  isReversed: boolean;
}

export const apiService = {
  async getSpreads(): Promise<ApiResponse<SpreadData[]>> {
    const url = `${API_BASE_URL}/spreads`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('스프레드 목록 불러오기를 실패했다요...');
    }
    return await response.json();
  },

  async getSpread(spreadId: string): Promise<ApiResponse<SpreadData>> {
    const response = await fetch(`${API_BASE_URL}/spreads/${spreadId}`);
    if(!response.ok) {
      throw new Error('스프레드 정보 불러오기를 실패했다요...');
    }
    return await response.json();
  },

  async drawCards(request: DrawCardsRequest): Promise<ApiResponse<{spread: SpreadData, cards: DrawnCard[]}>> {
    const response = await fetch(`${API_BASE_URL}/cards/draw`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('카드 추출을 실패했다요...');
    }
    return await response.json();
  },

  async generateReading(request: GenerateReadingRequest): Promise<ApiResponse<{reading: string}>> {
    const response = await fetch(`${API_BASE_URL}/readings/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      throw new Error('타로 해석을 실패했다요...');
    }
    return await response.json();
  }
};