import { type User, type InsertUser, type ChatMessage, type InsertChatMessage } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  saveChatMessage(message: InsertChatMessage): Promise<ChatMessage>;
  getChatHistory(sessionId: string, limit?: number): Promise<ChatMessage[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private chatMessages: ChatMessage[];

  constructor() {
    this.users = new Map();
    this.chatMessages = [];
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveChatMessage(insertMessage: InsertChatMessage): Promise<ChatMessage> {
    const message: ChatMessage = {
      id: randomUUID(),
      ...insertMessage,
      timestamp: new Date(),
    };
    this.chatMessages.push(message);
    return message;
  }

  async getChatHistory(sessionId: string, limit: number = 50): Promise<ChatMessage[]> {
    return this.chatMessages
      .filter((msg) => msg.sessionId === sessionId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      .slice(-limit);
  }
}

export const storage = new MemStorage();
