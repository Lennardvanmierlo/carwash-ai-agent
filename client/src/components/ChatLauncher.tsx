import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChatLauncherProps {
  onClick: () => void;
  unreadCount?: number;
  isOpen: boolean;
}

export default function ChatLauncher({ onClick, unreadCount, isOpen }: ChatLauncherProps) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className={cn(
        "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300",
        "md:h-16 md:w-16",
        isOpen && "scale-0 opacity-0 pointer-events-none"
      )}
      data-testid="button-chat-launcher"
      aria-label="Open chat"
    >
      <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />
      {unreadCount !== undefined && unreadCount > 0 && (
        <span
          className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold flex items-center justify-center"
          data-testid="text-unread-count"
        >
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Button>
  );
}
