# Randy Grizzle Portfolio

A modern, accessible portfolio built with Next.js.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: Material UI + Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **ORM**: Prisma
- **API**: GraphQL (Yoga)
- **Deployment**: Vercel
- **Testing**: Jest + React Testing Library

## Quick Start

### 1. Setup Environment

```bash
# Copy environment template
cp .env.local.example .env.local

# Edit with your credentials
notepad .env.local
```

### 2. Install & Run

```bash
# Install dependencies
npm install

# Generate Prisma Client (connects to existing database)
npm run prisma:generate

# Check environment
npm run check-env

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - Connect to existing databases (3 minutes)
- **[SETUP.md](./SETUP.md)** - Quick setup guide (5 minutes)
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Complete deployment guide (dev/prod environments)

## Development

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run test             # Run tests
npm run lint             # Lint code
npm run check-env        # Validate environment variables
```

## Prisma Commands

```bash
npm run prisma:generate        # Generate Prisma Client
npm run prisma:migrate:dev     # Create & run migration
npm run prisma:migrate:deploy  # Deploy migrations (prod)
npm run prisma:studio          # Open database GUI
npm run prisma:seed            # Seed database
```

## Environment Variables

Required variables (see `.env.local.example`):

- `DATABASE_URL` - Supabase connection string (pooled)
- `DIRECT_DATABASE_URL` - Direct connection for migrations
- `RESEND_API_KEY` - Email service API key
- `CONTACT_TO_EMAIL` - Contact form recipient

## Deployment

This project uses a dev/production workflow:

- **Local**: `dev` branch → Dev database
- **Preview**: Push to `dev` → Vercel preview deployment
- **Production**: Merge to `main` → Vercel production deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete setup instructions.

## Project Structure

```
├── app/
│   ├── (pages)/          # Route pages
│   ├── api/              # API routes (GraphQL)
│   ├── components/       # Reusable components
│   ├── features/         # Feature-specific components
│   └── layout.tsx        # Root layout
├── lib/                  # Utilities (Prisma, GraphQL client)
├── prisma/               # Database schema & migrations
├── graphql/              # GraphQL schema & queries
└── public/               # Static assets
```

## Features

- 📝 Dynamic forms with validation
- ♿ WCAG 2.1 AA accessibility compliance
- 🎨 Theme switching (light/dark mode)
- 📱 Fully responsive design
- 🧪 Comprehensive test coverage

## Contributing

This is a personal portfolio project. If you'd like to report an issue or suggest an improvement, feel free to open an issue.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Material UI](https://mui.com/material-ui/)
- [Supabase](https://supabase.com/docs)
