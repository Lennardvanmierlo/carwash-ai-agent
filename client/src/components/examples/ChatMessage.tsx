import ChatMessage from "../ChatMessage";

export default function ChatMessageExample() {
  return (
    <div className="space-y-4 p-4 bg-background">
      <ChatMessage
        role="assistant"
        content="Hallo! Hoe kan ik u helpen met uw vragen over Zeister Carwash?"
        timestamp="14:30"
        senderName="Zeister Carwash"
      />
      <ChatMessage
        role="user"
        content="Wat kosten de wasprogramma's?"
        timestamp="14:31"
      />
      <ChatMessage
        role="assistant"
        content="Wij hebben verschillende wasprogramma's:\n\n• Basis: €12 met Waspas (€13,50 zonder)\n• Normaal: €15 met Waspas (€17,50 zonder)\n• Meest gekozen: €17 met Waspas (€19,50 zonder)\n• Het beste: €19 met Waspas (€22,50 zonder)"
        timestamp="14:31"
        senderName="Zeister Carwash"
      />
      <ChatMessage
        role="system"
        content="Chat gestart om 14:30"
      />
    </div>
  );
}
