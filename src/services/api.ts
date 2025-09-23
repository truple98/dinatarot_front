import type { DrawnCard } from "../utils/tarot";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface TarotInterpretationRequest {
  userName: string;
  userConcern: string;
  spreadType: string;
  drawnCards: DrawnCard[];
}

export interface TarotInterpretationResponse {
  success: boolean;
  data?: {
    userName: string;
    userConcern: string;
    spreadType: string;
    drawnCards: DrawnCard[];
    interpretation: string;
  };
  message: string;
}

export interface HealthCheckResponse {
  status: string;
  message: string;
}

export const apiService = {
  async healthCheck(): Promise<HealthCheckResponse> {
    const response = await fetch(`${API_BASE_URL}/health`);

    if (!response.ok) {
      throw new Error(`X( 오류: ${response.status}`);
    }

    return response.json();
  },

  async getTarotInterpretation(data: TarotInterpretationRequest): Promise<TarotInterpretationResponse> {
    const response = await fetch(`${API_BASE_URL}/interpret`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`타로 해석 요청 실패! status: ${response.status}`);
    }

    return response.json();
  }
};