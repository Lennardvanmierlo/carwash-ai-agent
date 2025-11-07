import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled, placeholder = "Type uw vraag..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-border bg-background">
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className={cn(
              "w-full h-12 px-4 py-3 rounded-full",
              "bg-muted border border-input",
              "text-[15px] text-foreground placeholder:text-muted-foreground",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
            data-testid="input-message"
            aria-label="Typ uw bericht"
          />
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || disabled}
          className="h-12 w-12 rounded-full flex-shrink-0"
          data-testid="button-send"
          aria-label="Verstuur bericht"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
}
