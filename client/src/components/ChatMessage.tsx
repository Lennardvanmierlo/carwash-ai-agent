import { cn } from "@/lib/utils";

export interface ChatMessageProps {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
  senderName?: string;
}

export default function ChatMessage({ role, content, timestamp, senderName }: ChatMessageProps) {
  const isUser = role === "user";
  const isSystem = role === "system";

  if (isSystem) {
    return (
      <div className="flex justify-center py-2" data-testid="message-system">
        <p className="text-xs text-muted-foreground">{content}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex gap-2 mb-3",
        isUser ? "justify-end" : "justify-start"
      )}
      data-testid={`message-${role}`}
    >
      <div
        className={cn(
          "flex flex-col gap-1",
          isUser ? "items-end max-w-[75%]" : "items-start max-w-[80%]"
        )}
      >
        {!isUser && senderName && (
          <span className="text-xs font-medium text-foreground px-1">
            {senderName}
          </span>
        )}
        <div
          className={cn(
            "px-3 py-3 rounded-2xl",
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-card text-card-foreground border border-card-border rounded-bl-sm"
          )}
        >
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">
            {content}
          </p>
        </div>
        {timestamp && (
          <span className="text-xs text-muted-foreground opacity-70 px-1">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
}
