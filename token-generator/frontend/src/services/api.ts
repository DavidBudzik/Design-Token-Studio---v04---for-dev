import axios from 'axios';
import { GenerateRequest, GenerateResponse, ColorPalette, IndustryTheme } from '@token-generator/shared';

const API_BASE_URL = '/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 45000, // 45 seconds
});

export const api = {
  async getThemes(): Promise<IndustryTheme[]> {
    const response = await apiClient.get<{ themes: IndustryTheme[] }>('/palette/themes');
    return response.data.themes;
  },

  async generatePalette(request: GenerateRequest): Promise<GenerateResponse> {
    const response = await apiClient.post<GenerateResponse>('/palette/generate', request);
    return response.data;
  },

  async exportPalette(palette: ColorPalette, format: string): Promise<{ content: string; filename: string }> {
    const response = await apiClient.post<{ content: string; filename: string; format: string }>(
      '/palette/export',
      { palette, format }
    );
    return response.data;
  },

  async checkHealth(): Promise<{ status: string }> {
    const response = await apiClient.get<{ status: string }>('/health');
    return response.data;
  },
};