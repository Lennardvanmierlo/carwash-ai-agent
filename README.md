# Zeister Carwash AI Support Chatbot

AI-powered customer support chatbot for Zeister Carwash in Zeist, Netherlands. Built with React, TypeScript, Express, and Google Gemini AI.

## Features

- 🤖 AI-powered conversations in Dutch
- 💬 Real-time chat interface with typing indicators
- 📱 Fully responsive (mobile & desktop)
- 🔒 Production-ready security (CORS, Helmet, Rate Limiting)
- 🎨 Modern UI with Tailwind CSS and shadcn/ui components
- 💾 Session-based conversation history
- 🚀 Easy deployment to any Node.js hosting platform

## Tech Stack

**Frontend:**
- React 18.3 + TypeScript
- Vite (build tool)
- Tailwind CSS
- shadcn/ui components
- TanStack Query (React Query)
- Framer Motion (animations)

**Backend:**
- Express.js + TypeScript
- Google Gemini AI (`gemini-2.5-flash`)
- PostgreSQL support (optional, uses in-memory storage by default)
- Drizzle ORM

**Security:**
- Helmet.js for security headers
- CORS configuration
- Express Rate Limiting
- Input validation with Zod

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Google Gemini API key (get one at [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Lennardvanmierlo/carwash-ai-agent.git
   cd carwash-ai-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5000`
   - The chat widget appears in the bottom-right corner

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# AI Provider - Choose ONE:
GEMINI_API_KEY=your_gemini_api_key_here
# OR
# OPENAI_API_KEY=your_openai_api_key_here

# Security (Production)
ALLOWED_ORIGINS=https://autowasstraatzeist.nl,https://www.autowasstraatzeist.nl

# Database (Optional)
# DATABASE_URL=postgresql://user:password@localhost:5432/carwash_db
```

### Configuration Options

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | No | `5000` | Server port |
| `NODE_ENV` | No | `development` | Environment mode |
| `GEMINI_API_KEY` | Yes* | - | Google Gemini API key |
| `OPENAI_API_KEY` | Yes* | - | OpenAI API key (alternative) |
| `ALLOWED_ORIGINS` | Production | localhost | Comma-separated CORS origins |
| `DATABASE_URL` | No | In-memory | PostgreSQL connection string |

*One AI provider key is required

## Scripts

```bash
# Development (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run check

# Database migrations (if using PostgreSQL)
npm run db:push
```

## Project Structure

```
carwash-ai-agent/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/     # Chat UI components
│   │   │   ├── ChatWidget.tsx
│   │   │   ├── ChatLauncher.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   └── ui/        # shadcn/ui components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities
│   │   └── main.tsx       # Entry point
│   ├── index.html
│   └── src/index.css
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API endpoints
│   ├── gemini.ts          # Gemini AI integration
│   ├── openai.ts          # OpenAI integration
│   └── storage.ts         # Data persistence
├── shared/                # Shared TypeScript schemas
│   └── schema.ts
├── .env.example           # Environment template
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## API Endpoints

### POST `/api/chat`
Send a message and receive AI response.

**Request:**
```json
{
  "message": "Wat kost een wasbeurt?",
  "sessionId": "unique-session-id"
}
```

**Response:**
```json
{
  "response": "Een wasbeurt bij Zeister Carwash kost...",
  "timestamp": "2025-11-07T15:30:00.000Z"
}
```

### GET `/api/chat/history/:sessionId`
Retrieve conversation history for a session.

**Response:**
```json
[
  {
    "id": 1,
    "sessionId": "unique-session-id",
    "role": "user",
    "content": "Wat kost een wasbeurt?",
    "timestamp": "2025-11-07T15:30:00.000Z"
  },
  {
    "id": 2,
    "sessionId": "unique-session-id",
    "role": "assistant",
    "content": "Een wasbeurt kost...",
    "timestamp": "2025-11-07T15:30:05.000Z"
  }
]
```

## Deployment

### Production Checklist

Before deploying to production, ensure:

- [ ] Environment variables are set in your hosting platform
- [ ] `ALLOWED_ORIGINS` includes your website domain(s)
- [ ] `NODE_ENV` is set to `production`
- [ ] Valid Gemini API key is configured
- [ ] Database is set up (if using PostgreSQL)
- [ ] Rate limiting is configured appropriately
- [ ] SSL/HTTPS is enabled on your domain

#
