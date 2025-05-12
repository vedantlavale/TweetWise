import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import { authService } from './authService';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_KEY);
const model = genAI.getGenerativeModel({ 
  model: 'gemini-2.0-flash', 
});

const API_URL = 'http://localhost:5000/api';

export type TweetStyle = 'professional' | 'casual' | 'funny' | 'inspirational' | 'provocative';
export type DebateFormat = 'formal' | 'academic' | 'casual' | 'humorous';

interface TweetResponse {
  enhancedText: string;
  error?: string;
}

interface DebateResponse {
  pro: string;
  con: string;
  error?: string;
}

export async function enhanceTweet(text: string, style: TweetStyle): Promise<TweetResponse> {
  const styleInstructions = {
    professional: "Transform into polished business English, fix grammar. Just use human language",
    casual: "Make this text normal, friendly (something casual) and use human language.",
    funny: "Add humor, jokes, or witty observations(something funny) and use human language.",
    inspirational: "Include motivational phrases and uplifting messages(something imspirational) and use human language.",
    provocative: "Make thought-provoking with controversial angle(something that can be a little offensive and provocative for others) and use human language."
  };

  try {
    const prompt = `Rephrase this tweet in ${style} style: "${text}"
    - Keep under 280 chars
    - ${styleInstructions[style]}
    - Maintain core message
    - Generate response in the language the user asked to generate it in(if not then the language in which user gave text)
    
    Enhanced version:`;
    
    const result = await model.generateContent(prompt);
    const enhanced = result.response.text().replace(/^"(.*)"$/, '$1'); // Remove quotes
    const enhancedText = enhanced.trim();

    // Save the generated tweet
    if (enhancedText) {
      await saveTweet(text, enhancedText);
    }

    return { enhancedText };
  } catch (error) {
    return { 
      enhancedText: '', 
      error: error instanceof Error ? error.message : 'Enhancement failed' 
    };
  }
}

export async function generateDebate(topic: string, format: DebateFormat): Promise<DebateResponse> {
  const formatTones = {
    formal: "you can use academic sources and formal logic. Directly present the argument without any other unnecessary text. Also only give argument supporting it not aginst the statement.",
    academic: "you can use statistics and research citations. Directly present the argument without any other unnecessary text. Also only give argument supporting it not aginst the statement.",
    casual: "you can use everyday examples and simple language. Directly present the argument without any other unnecessary text. Also only give argument supporting it not aginst the statement.", 
    humorous: "you can use funny comparisons and jokes regarding the topic. Directly present the argument without any other unnecessary text. Also only give argument supporting it not aginst the statement."
  };

  try {
    const prompt = `Generate STRONG arguments SUPPORTING "${topic}" using ${formatTones[format]}.
      Present as clear paragraph text in simple human language.`;
    
    const result = await model.generateContent(prompt);
    const proArguments = result.response.text().trim();
    
    // Save the generated debate
    if (proArguments) {
      await saveDebate(topic, format, proArguments);
    }

    return {
      pro: proArguments,
      con: ''
    };
  } catch (error) {
    return { 
      pro: '', 
      con: '', 
      error: error instanceof Error ? error.message : 'Debate generation failed' 
    };
  }
}

// Save generated tweet to backend
async function saveTweet(originalPrompt: string, enhancedTweet: string) {
  try {
    await axios.post(
      `${API_URL}/tweet`,
      { originalPrompt, enhancedTweet },
      {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      }
    );
  } catch (error) {
    console.error('Error saving tweet:', error);
  }
}

// Save generated debate to backend
async function saveDebate(topic: string, stance: string, counterArgument: string) {
  try {
    await axios.post(
      `${API_URL}/debate`,
      { topic, stance, counterArgument },
      {
        headers: { Authorization: `Bearer ${authService.getToken()}` }
      }
    );
  } catch (error) {
    console.error('Error saving debate:', error);
  }
}

// Get user's tweet history
export async function getUserTweets() {
  try {
    const response = await axios.get(`${API_URL}/tweet`, {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return [];
  }
}

// Get user's debate history
export async function getUserDebates() {
  try {
    const response = await axios.get(`${API_URL}/debate`, {
      headers: { Authorization: `Bearer ${authService.getToken()}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching debates:', error);
    return [];
  }
}
