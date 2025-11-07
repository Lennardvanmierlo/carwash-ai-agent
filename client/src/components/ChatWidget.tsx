import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Minus } from "lucide-react";
import ChatMessage, { type ChatMessageProps } from "./ChatMessage";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import QuickReplies from "./QuickReplies";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export interface ChatWidgetProps {
  onClose: () => void;
  onMinimize?: () => void;
  isOpen: boolean;
}

const QUICK_SUGGESTIONS = [
  "Wat kosten de wasprogramma's?",
  "Wat zijn de openingstijden?",
  "Hoe werkt de Waspas?",
  "Wat is een VIP-behandeling?",
];

export default function ChatWidget({ onClose, onMinimize, isOpen }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      role: "assistant",
      content: "Hallo! Hoe kan ik u helpen met uw vragen over Zeister Carwash?",
      timestamp: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
      senderName: "Zeister Carwash",
    },
  ]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [sessionId] = useState(() => `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", { message, sessionId });
      return await response.json();
    },
    onSuccess: (data: { response: string; timestamp: string }) => {
      const aiResponse: ChatMessageProps = {
        role: "assistant",
        content: data.response,
        timestamp: new Date(data.timestamp).toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
        senderName: "Zeister Carwash",
      };
      setMessages((prev) => [...prev, aiResponse]);
    },
    onError: (error) => {
      console.error("Chat error:", error);
      const errorMessage: ChatMessageProps = {
        role: "assistant",
        content: "Sorry, er is een fout opgetreden. Probeer het opnieuw.",
        timestamp: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
        senderName: "Zeister Carwash",
      };
      setMessages((prev) => [...prev, errorMessage]);
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, chatMutation.isPending]);

  const handleSendMessage = (content: string) => {
    const userMessage: ChatMessageProps = {
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString("nl-NL", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setShowSuggestions(false);
    chatMutation.mutate(content);
  };

  const handleQuickReply = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div
      className={cn(
        "fixed bottom-0 right-0 flex flex-col bg-background border border-border shadow-2xl transition-all duration-300 ease-in-out",
        "md:bottom-6 md:right-6 md:rounded-lg",
        "w-full h-full md:w-[380px] md:h-[600px]",
        isOpen ? "translate-y-0 opacity-100" : "translate-y-full md:translate-y-8 opacity-0 pointer-events-none"
      )}
      data-testid="chat-widget"
    >
      <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold" data-testid="text-widget-title">
              Zeister Carwash Support
            </h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-status-online" />
              <span className="text-sm opacity-90">Online</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {onMinimize && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onMinimize}
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
              data-testid="button-minimize"
              aria-label="Minimaliseren"
            >
              <Minus className="h-4 w-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/10"
            data-testid="button-close"
            aria-label="Sluiten"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto p-4 bg-background"
        data-testid="messages-container"
      >
        {messages.map((message, index) => (
          <ChatMessage key={index} {...message} />
        ))}
        {chatMutation.isPending && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {showSuggestions && messages.length === 1 && (
        <QuickReplies suggestions={QUICK_SUGGESTIONS} onSelect={handleQuickReply} />
      )}

      <ChatInput
        onSend={handleSendMessage}
        disabled={chatMutation.isPending}
        placeholder="Type uw vraag..."
      />
    </div>
  );
}
