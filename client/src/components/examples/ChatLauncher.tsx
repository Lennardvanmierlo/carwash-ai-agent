import { useState } from "react";
import ChatLauncher from "../ChatLauncher";

export default function ChatLauncherExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative h-32 bg-background">
      <ChatLauncher
        onClick={() => setIsOpen(!isOpen)}
        unreadCount={3}
        isOpen={isOpen}
      />
    </div>
  );
}
