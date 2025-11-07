export default function TypingIndicator() {
  return (
    <div className="flex gap-2 mb-3" data-testid="typing-indicator">
      <div className="flex flex-col gap-1 items-start max-w-[80%]">
        <span className="text-xs font-medium text-foreground px-1">
          Zeister Carwash
        </span>
        <div className="bg-card border border-card-border px-4 py-3 rounded-2xl rounded-bl-sm">
          <div className="flex gap-1 items-center">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
