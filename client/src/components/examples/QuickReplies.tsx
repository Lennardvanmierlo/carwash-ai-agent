import QuickReplies from "../QuickReplies";

export default function QuickRepliesExample() {
  const suggestions = [
    "Wat kosten de wasprogramma's?",
    "Wat zijn de openingstijden?",
    "Hoe werkt de Waspas?",
  ];

  return (
    <div className="bg-background p-4">
      <QuickReplies
        suggestions={suggestions}
        onSelect={(msg) => console.log("Quick reply selected:", msg)}
      />
    </div>
  );
}
