
export enum AppTool {
  HOME = 'home',
  TEXT = 'text',
  IMAGE = 'image',
  VIDEO = 'video',
  VOICE = 'voice',
  PRODUCTS = 'products',
  ADMIN = 'admin'
}

export type Language = 'en' | 'vi';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  timestamp: number;
}

export interface ExternalProduct {
  id: string;
  name: string;
  url: string;
  description: string;
}
