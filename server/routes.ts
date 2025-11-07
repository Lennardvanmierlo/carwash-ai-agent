import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";
import { getChatResponse } from "./gemini";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, sessionId } = req.body;

      if (!message || typeof message !== "string") {
        return res.status(400).json({ error: "Message is required" });
      }

      if (!sessionId || typeof sessionId !== "string") {
        return res.status(400).json({ error: "Session ID is required" });
      }

      const userMessageData = insertChatMessageSchema.parse({
        sessionId,
        role: "user",
        content: message,
      });
      await storage.saveChatMessage(userMessageData);

      const history = await storage.getChatHistory(sessionId);
      const conversationHistory = history.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const aiResponse = await getChatResponse(message, conversationHistory);

      const assistantMessageData = insertChatMessageSchema.parse({
        sessionId,
        role: "assistant",
        content: aiResponse,
      });
      const savedMessage = await storage.saveChatMessage(assistantMessageData);

      res.json({
        response: aiResponse,
        timestamp: savedMessage.timestamp,
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  app.get("/api/chat/history/:sessionId", async (req, res) => {
    try {
      const { sessionId } = req.params;
      const history = await storage.getChatHistory(sessionId);
      res.json(history);
    } catch (error) {
      console.error("History error:", error);
      res.status(500).json({ error: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
