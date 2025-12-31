import { Message } from 'ai';

export interface ChatRequest {
  id: string;
  messages: Array<Message>;
}

export type ProductCreationStep =
  | 'basic-info' // Brand & Category
  | 'details' // Name, Price, Description
  // | 'features' // Technical specs & features
  | 'images' // Product images
  | 'review'; // Final review

export interface ValidationError {
  field: string;
  message: string;
  suggestion?: string;
}

export interface AgentMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  name?: string;
}
