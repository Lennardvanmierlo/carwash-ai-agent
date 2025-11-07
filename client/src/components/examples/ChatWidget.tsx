import { useState } from "react";
import ChatWidget from "../ChatWidget";

export default function ChatWidgetExample() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative h-[700px] bg-gradient-to-br from-primary/5 to-background">
      <ChatWidget
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onMinimize={() => setIsOpen(false)}
      />
      {!isOpen && (
        <div className="absolute bottom-6 right-6">
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
          >
            Open Chat
          </button>
        </div>
      )}
    </div>
  );
}
