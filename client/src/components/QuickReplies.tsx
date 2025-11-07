import { Button } from "@/components/ui/button";

export interface QuickRepliesProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export default function QuickReplies({ suggestions, onSelect }: QuickRepliesProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="px-4 pb-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {suggestions.map((suggestion, index) => (
          <Button
            key={index}
            variant="secondary"
            size="sm"
            onClick={() => onSelect(suggestion)}
            className="rounded-full whitespace-nowrap flex-shrink-0 text-sm"
            data-testid={`button-quick-reply-${index}`}
          >
            {suggestion}
          </Button>
        ))}
      </div>
    </div>
  );
}
