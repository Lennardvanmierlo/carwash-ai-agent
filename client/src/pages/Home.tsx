import { useState } from "react";
import ChatWidget from "@/components/ChatWidget";
import ChatLauncher from "@/components/ChatLauncher";

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground" data-testid="text-main-heading">
              Zeister Carwash
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Schoon, veilig én duurzaam
            </p>
          </div>

          <div className="bg-card border border-card-border rounded-lg p-8 shadow-lg space-y-6">
            <h2 className="text-2xl font-semibold text-card-foreground">
              Welkom bij onze AI Support Assistent
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              Heeft u vragen over onze wasprogramma's, prijzen, openingstijden of speciale behandelingen? 
              Onze AI-assistent staat 24/7 voor u klaar om al uw vragen te beantwoorden!
            </p>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="p-4 bg-muted/50 rounded-md">
                <h3 className="font-semibold text-foreground mb-2">💧 Wasprogramma's</h3>
                <p className="text-sm text-muted-foreground">
                  Van basis tot premium, inclusief speciale programma's voor cabrio's en gewrapte auto's
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-md">
                <h3 className="font-semibold text-foreground mb-2">⭐ Waspas Voordelen</h3>
                <p className="text-sm text-muted-foreground">
                  Bespaar €1,50 per wasbeurt en ontvang exclusieve acties
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-md">
                <h3 className="font-semibold text-foreground mb-2">🕐 Openingstijden</h3>
                <p className="text-sm text-muted-foreground">
                  Ma-Za: 08:00-18:00 | Zo: 10:00-17:00
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-md">
                <h3 className="font-semibold text-foreground mb-2">✨ VIP-behandeling</h3>
                <p className="text-sm text-muted-foreground">
                  Luxe complete behandeling voor uw auto, online te reserveren
                </p>
              </div>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground mb-4">
                Klik op het chat-icoon rechtsonder om een gesprek te starten! 👇
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground space-y-2">
            <p>📍 Dijnselburgerlaan 2a, 3705 LP Zeist</p>
            <p>📞 030 7437990 | 📧 welkom@zeistercarwash.nl</p>
          </div>
        </div>
      </div>

      <ChatLauncher
        onClick={() => setIsChatOpen(true)}
        isOpen={isChatOpen}
      />
      <ChatWidget
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onMinimize={() => setIsChatOpen(false)}
      />
    </div>
  );
}
