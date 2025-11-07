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

### Deployment Options

#### Option 1: Deploy to Replit (Easiest)

1. Fork this Repl or import from GitHub
2. Add environment variables in Secrets tab
3. Click "Run" - automatically deploys!

#### Option 2: Deploy to Node.js Hosting (VPS, DigitalOcean, etc.)

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Transfer files to server**
   ```bash
   # Upload dist/, package.json, and .env to server
   scp -r dist package.json .env user@yourserver:/var/www/carwash-ai
   ```

3. **Install production dependencies**
   ```bash
   cd /var/www/carwash-ai
   npm install --production
   ```

4. **Start with PM2 (recommended)**
   ```bash
   npm install -g pm2
   pm2 start dist/index.js --name carwash-ai
   pm2 save
   pm2 startup
   ```

5. **Set up reverse proxy (nginx)**
   ```nginx
   server {
       listen 80;
       server_name api.autowasstraatzeist.nl;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

#### Option 3: Deploy to Vercel/Netlify

Use a Node.js adapter and configure the build settings:
- Build command: `npm run build`
- Start command: `npm start`
- Node version: 18+

### Database Setup (Optional)

To use PostgreSQL instead of in-memory storage:

1. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE carwash_db;
   ```

2. **Add DATABASE_URL to .env**
   ```env
   DATABASE_URL=postgresql://user:password@localhost:5432/carwash_db
   ```

3. **Push database schema**
   ```bash
   npm run db:push
   ```

4. **Update storage.ts** to use Drizzle ORM (implementation included)

## Website Integration

To embed the chat widget on your Autowasstraat Zeist website:

### Option 1: Full Integration (Recommended)

Host the entire app and load it in an iframe:

```html
<!-- Add to your website's HTML -->
<iframe
  src="https://your-chatbot-domain.com"
  style="position: fixed; bottom: 20px; right: 20px; width: 380px; height: 600px; border: none; z-index: 9999;"
  allow="clipboard-write"
></iframe>
```

### Option 2: API Integration

Call the API from your existing website JavaScript:

```javascript
// Your website's JavaScript
async function sendMessage(message, sessionId) {
  const response = await fetch('https://your-api-domain.com/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId })
  });
  const data = await response.json();
  return data.response;
}
```

### CORS Configuration

Make sure to add your website domain to `ALLOWED_ORIGINS`:

```env
ALLOWED_ORIGINS=https://autowasstraatzeist.nl,https://www.autowasstraatzeist.nl
```

## Customization

### Update Carwash Information

Edit the knowledge base in `server/gemini.ts`:

```typescript
const CARWASH_KNOWLEDGE = `
  // Update prices, services, contact info, etc.
`;
```

### Change AI Model

To use a different Gemini model:

```typescript
// server/gemini.ts
model: "gemini-2.5-pro", // or "gemini-2.5-flash"
```

### Styling

Customize colors in `client/src/index.css`:

```css
:root {
  --primary: 210 85% 42%;  /* Change primary color */
  --radius: .5rem;          /* Change border radius */
}
```

## Troubleshooting

### Chat doesn't load

- Check browser console for errors
- Verify API is running on correct port
- Check CORS configuration

### "API key not found" error

- Ensure `GEMINI_API_KEY` is set in `.env`
- Restart the server after adding environment variables

### Rate limiting blocks requests

- Adjust limits in `server/index.ts`:
  ```typescript
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200, // Increase limit
  });
  ```

### CORS errors in production

- Add your domain to `ALLOWED_ORIGINS` in `.env`
- Include both `https://` and `https://www.` variants

## Security Features

- **Helmet.js**: Sets secure HTTP headers
- **CORS**: Restricts API access to allowed domains
- **Rate Limiting**: Prevents abuse (100 requests/15min per IP)
- **Input Validation**: Zod schemas validate all inputs
- **XSS Protection**: React automatically escapes content
- **CSP**: Content Security Policy headers configured

## License

MIT License - feel free to use for your business!

## Support

For issues or questions:
- Email: welkom@zeistercarwash.nl
- Phone: 030 7437990

## Credits

Built for Zeister Carwash, Dijnselburgerlaan 2a, 3705 LP Zeist
