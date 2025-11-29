# The Eternal Quest - Global Interfaith Platform

A comprehensive, single-page application that serves as a central hub for knowledge regarding all world religions, fostering understanding and community.

## Features

### 🏛️ Religious Traditions
- **Comprehensive Database**: 9 major world religions with detailed information
- **Sect & Divisions**: Interactive tree visualization of religious subdivisions
- **Rituals & Practices**: Detailed explanations of ceremonies and practices
- **Core Beliefs & Holy Books**: Essential teachings and sacred texts

### 👨‍🏫 Scholars & Source Guide
- **Advanced Filtering**: Filter by religion, century, and language
- **Authenticity Ratings**: Identify universally respected scholars
- **Major Works**: Access to important scholarly contributions
- **Biographical Information**: Historical context and achievements

### 🤖 AI Spiritual Assistant
- **Academic Theologian AI**: Powered by z-ai-web-dev-sdk
- **Respectful & Unbiased**: Answers from authentic religious texts
- **Real-time Chat**: Floating chat interface for spiritual questions
- **Multi-faith Knowledge**: Comprehensive understanding of all traditions

### 💬 Community Chat Rooms
- **Real-time Communication**: Socket.io powered chat system
- **Themed Rooms**: Discussion rooms for different topics
- **User Presence**: See who's online in each room
- **Persistent Messages**: Chat history maintained in sessions

### 📊 Global Statistics
- **Interactive Visualizations**: Recharts-based religion distribution
- **Population Data**: Real-world follower statistics
- **Hover Details**: Detailed information on chart interactions

## Technology Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Real-time**: Socket.io Client

### Backend
- **Database**: SQLite with Prisma ORM
- **API**: Next.js API Routes
- **AI Integration**: z-ai-web-dev-sdk
- **Real-time**: Socket.io Server (Mini Service)

### Color Psychology
- **Primary Background**: #0F172A (Deep Midnight Blue)
- **Secondary**: #D4AF37 (Metallic Soft Gold)
- **Accent**: #F8FAFC (Clean Off-White)
- **Interactive**: #3B82F6 (Calm Royal Blue)

## Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### 1. Clone and Install Dependencies
```bash
# Install main project dependencies
npm install

# Install chat service dependencies
cd mini-services/chat-service
npm install
cd ../..
```

### 2. Database Setup
```bash
# Push database schema
npm run db:push

# Seed database with religions data
npx tsx prisma/seed.ts
```

### 3. Environment Variables
Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# AI Service (if needed)
# OPENAI_API_KEY="your-api-key-here"
```

### 4. Start Services

#### Start Main Application
```bash
npm run dev
```

#### Start Chat Service (in separate terminal)
```bash
cd mini-services/chat-service
npm run dev
```

### 5. Access the Application
- **Main App**: http://localhost:3000
- **Chat Service**: http://localhost:3003 (automatically proxied)

## Project Structure

```
my-project/
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── religions/    # Religion endpoints
│   │   │   ├── scholars/     # Scholars endpoints
│   │   │   └── chat/         # AI chat endpoint
│   │   ├── page.tsx          # Main application page
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   ├── ui/               # shadcn/ui components
│   │   ├── AIChatWidget.tsx  # AI spiritual assistant
│   │   ├── CommunityChat.tsx # Real-time chat
│   │   ├── ReligionDetail.tsx # Individual religion pages
│   │   └── ScholarsGuide.tsx # Scholar finder
│   └── lib/
│       ├── db.ts             # Database client
│       └── utils.ts          # Utility functions
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── seed.ts              # Database seeding script
├── mini-services/
│   └── chat-service/        # Socket.io chat service
│       ├── index.ts          # Chat server
│       └── package.json      # Service dependencies
└── public/                  # Static assets
```

## Database Schema

### Religion
- Basic information, population statistics
- Core beliefs and holy books
- Relationships to sects and rituals

### Sect
- Religious subdivisions and denominations
- Key characteristics and descriptions
- Associated scholars

### Scholar
- Historical and contemporary religious figures
- Works, era, and authenticity ratings
- Sect affiliations

### Ritual
- Religious practices and ceremonies
- Significance and frequency
- Visual representations

## API Endpoints

### Religions
- `GET /api/religions` - Get all religions
- `GET /api/religions/[id]` - Get specific religion
- `POST /api/religions` - Create new religion

### Scholars
- `GET /api/scholars` - Get scholars with filtering
- Query parameters: `religion`, `century`, `language`

### AI Chat
- `POST /api/chat` - Send message to AI assistant
- Request body: `{ message: "your question" }`

## Features in Detail

### 1. Landing Page
- **Hero Section**: Full-screen with animated philosophical text
- **Statistics**: Interactive pie chart of world religions
- **Feature Cards**: Navigation to main sections
- **Religion Preview**: Quick access to major religions

### 2. Religion Pages
- **Tabbed Interface**: Overview, Sects, Rituals, Scholars
- **Interactive Sect Tree**: Click to explore subdivisions
- **Scholar Profiles**: Detailed biographical information
- **Ritual Explanations**: Significance and practices

### 3. Scholar Guide
- **Advanced Search**: Name, works, religion filters
- **Filter Panel**: Century, language, tradition
- **Authenticity Badges**: Identify respected sources
- **Responsive Grid**: Mobile-friendly card layout

### 4. Community Chat
- **Room System**: Themed discussion rooms
- **Real-time Messages**: Instant communication
- **User Presence**: Online count and notifications
- **Username System**: Simple, anonymous participation

### 5. AI Assistant
- **Floating Widget**: Always accessible chat interface
- **Academic Responses**: Scholarly, respectful answers
- **Multi-faith Knowledge**: Comprehensive understanding
- **Message History**: Conversation persistence

## Development Notes

### Code Quality
- **TypeScript**: Strict typing throughout
- **ESLint**: Code quality enforcement
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA labels and semantic HTML

### Performance
- **Optimized Animations**: Framer Motion best practices
- **Lazy Loading**: Component-based code splitting
- **Database Optimization**: Efficient Prisma queries
- **Caching**: Appropriate data caching strategies

### Security
- **Input Validation**: API request sanitization
- **Rate Limiting**: Chat message throttling
- **CORS Configuration**: Proper cross-origin setup
- **Environment Variables**: Secure configuration management

## Contributing

1. Follow the existing code style and patterns
2. Add TypeScript types for new components
3. Test responsive design on multiple screen sizes
4. Ensure accessibility compliance
5. Update documentation for new features

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Media gallery with video content
- [ ] Advanced search with full-text search
- [ ] Comparative religion tools
- [ ] Mobile app development
- [ ] Multi-language support
- [ ] Advanced AI features
- [ ] Social sharing capabilities

## License

This project is open source and available under the [MIT License](LICENSE).

---

**The Eternal Quest** - Exploring Spiritual Wisdom Across Traditions 🌍✨