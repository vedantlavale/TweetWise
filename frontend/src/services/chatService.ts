import axios from 'axios';
import { authService } from './authService';

const API_URL = 'http://localhost:5000/api';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface Chat {
  _id: string;
  userId: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TweetHistory {
  _id: string;
  userId: string;
  type: 'tweet';
  tweetPrompt: string;
  tweetStyle: 'professional' | 'casual' | 'funny' | 'inspirational' | 'provocative';
  generatedTweet: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface DebateHistory {
  _id: string;
  userId: string;
  type: 'debate';
  debateTopic: string;
  debateFormat: 'formal' | 'academic' | 'casual' | 'humorous';
  generatedDebate: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export type HistoryItem = TweetHistory | DebateHistory;

export const chatService = {
  async createChat(title?: string): Promise<Chat> {
    try {
      const response = await axios.post(
        `${API_URL}/chat`,
        { title },
        {
          headers: { Authorization: `Bearer ${authService.getToken()}` }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to create chat');
      }
      throw error;
    }
  },

  async getChats(): Promise<Chat[]> {
    try {
      const response = await axios.get(`${API_URL}/chat`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch chats');
      }
      throw error;
    }
  },

  async addMessage(chatId: string, message: Message): Promise<Chat> {
    try {
      const response = await axios.post(
        `${API_URL}/chat/${chatId}/messages`,
        message,
        {
          headers: { Authorization: `Bearer ${authService.getToken()}` }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to add message');
      }
      throw error;
    }
  },

  async deleteChat(chatId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/chat/${chatId}`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to delete chat');
      }
      throw error;
    }
  }
};

export const historyService = {
  async saveTweetHistory(data: {
    tweetPrompt: string;
    tweetStyle: TweetHistory['tweetStyle'];
    generatedTweet: string;
  }): Promise<TweetHistory> {
    try {
      const response = await axios.post(
        `${API_URL}/chat/tweet`,
        data,
        {
          headers: { Authorization: `Bearer ${authService.getToken()}` }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to save tweet history');
      }
      throw error;
    }
  },

  async saveDebateHistory(data: {
    debateTopic: string;
    debateFormat: DebateHistory['debateFormat'];
    generatedDebate: string;
  }): Promise<DebateHistory> {
    try {
      const response = await axios.post(
        `${API_URL}/chat/debate`,
        data,
        {
          headers: { Authorization: `Bearer ${authService.getToken()}` }
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to save debate history');
      }
      throw error;
    }
  },

  async getHistory(type?: 'tweet' | 'debate'): Promise<HistoryItem[]> {
    try {
      const response = await axios.get(`${API_URL}/chat${type ? `?type=${type}` : ''}`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch history');
      }
      throw error;
    }
  },

  async deleteHistory(historyId: string): Promise<void> {
    try {
      await axios.delete(`${API_URL}/chat/${historyId}`, {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to delete history item');
      }
      throw error;
    }
  }
}; 