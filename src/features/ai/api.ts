import axios from 'axios';

// AI Server URL (Defaults to localhost:8000 if not set in .env)
const AI_BASE_URL = import.meta.env.VITE_AI_API_URL || 'http://localhost:8000';

export interface SuggestedTopic {
  category: string;
  topic: string;
}

export const aiApi = axios.create({
  baseURL: AI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSuggestedTopic = async (): Promise<SuggestedTopic> => {
  const { data } = await aiApi.get<SuggestedTopic>('/posts/suggest');
  return data;
};
