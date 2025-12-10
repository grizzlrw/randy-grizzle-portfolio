# Deployment Guide

This guide explains how to set up and manage dev/production environments for this Next.js application using GitHub, Supabase, and Vercel.

## Architecture Overview

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   GitHub    │────▶│    Vercel    │────▶│  Supabase   │
│             │     │              │     │             │
│ main branch │     │ Production   │     │ Production  │
│ dev branch  │     │ Preview      │     │ Dev DB      │
│ Local dev   │     │              │     │             │
└─────────────┘     └──────────────┘     └─────────────┘
```

## Prerequisites

- **GitHub**: Repository with `main` (production) and `dev` (development) branches
- **Supabase**: Two projects (Production DB and Dev DB)
- **Vercel**: Account connected to your GitHub repository

---

## 1. Supabase Setup

### Create Two Projects

1. **Production Database**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Create project: `randy-grizzle-portfolio-prod`
   - Note the connection strings (pooled and direct)

2. **Development Database**
   - Create project: `randy-grizzle-portfolio-dev`
   - Note the connection strings

### Get Connection Strings

For each project, go to **Settings > Database**:

- **Pooled Connection** (for app runtime):
  ```
  postgresql://postgres.xxxxx:password@aws-0-us-west-2.pooler.supabase.com:5432/postgres
  ```

- **Direct Connection** (for migrations):
  ```
  postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
  ```

---

## 2. GitHub Branch Strategy

### Branch Setup

```bash
# Ensure you have both branches
git checkout main          # Production branch
git checkout -b dev        # Development branch (if not exists)
git push -u origin dev
```

### Branch Workflow

- **`main` branch** → Deploys to Vercel Production → Uses Production DB
- **`dev` branch** → Deploys to Vercel Preview → Uses Dev DB
- **Local development** → Uses Dev DB (via `.env.local`)

---

## 3. Local Development Setup

### Step 1: Environment Variables

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your **DEV** database credentials:
   ```env
   DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-us-west-2.pooler.supabase.com:5432/postgres"
   DIRECT_DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"
   RESEND_API_KEY="re_xxxxxxxxxxxx"
   CONTACT_TO_EMAIL="your-email@example.com"
   ```

### Step 2: Generate Prisma Client

```bash
# Generate Prisma Client (connects to your existing database)
npm run prisma:generate
```

**Important**: Your Supabase databases already have the schema and data. You don't need to run migrations unless you're making schema changes.

### Step 3: Start Development Server

```bash
npm run dev
```

Your app will run on `http://localhost:3000` using the **Dev database**.

---

## 4. Vercel Setup

### Step 1: Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New... > Project**
3. Import your GitHub repository: `randy-grizzle-portfolio`
4. Vercel will auto-detect Next.js settings

### Step 2: Configure Production Environment

1. In Vercel project settings, go to **Settings > Environment Variables**
2. Add variables for **Production** environment:

   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `DATABASE_URL` | `postgresql://postgres.xxxxx:password@...` (Prod pooled) | Production |
   | `DIRECT_DATABASE_URL` | `postgresql://postgres:password@...` (Prod direct) | Production |
   | `RESEND_API_KEY` | Your Resend API key | Production |
   | `CONTACT_TO_EMAIL` | Your email | Production |

### Step 3: Configure Preview (Dev) Environment

Add variables for **Preview** environment (used by `dev` branch):

   | Variable | Value | Environment |
   |----------|-------|-------------|
   | `DATABASE_URL` | `postgresql://postgres.xxxxx:password@...` (Dev pooled) | Preview |
   | `DIRECT_DATABASE_URL` | `postgresql://postgres:password@...` (Dev direct) | Preview |
   | `RESEND_API_KEY` | Your Resend API key (can be same) | Preview |
   | `CONTACT_TO_EMAIL` | Your email | Preview |

### Step 4: Configure Git Integration

1. Go to **Settings > Git**
2. Set **Production Branch**: `main`
3. Enable **Automatic Deployments** for:
   - Production: `main` branch
   - Preview: `dev` branch and all feature branches

### Step 5: Build Settings

Vercel should auto-detect, but verify:

- **Framework Preset**: Next.js
- **Build Command**: `prisma generate && next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

**Note**: The build command includes `prisma generate` to create the database client, but does **not** run migrations (your databases already have the schema).

---

## 5. Schema Synchronization (Only When Needed)

**Your databases already have the data** - you don't need to run migrations unless you're making schema changes.

### If You Need to Update the Schema Later:

#### Option 1: Introspect Existing Database
If you need to sync `schema.prisma` with your database:

```bash
npx prisma db pull
```

This updates your Prisma schema to match the database.

#### Option 2: Create New Migrations (for schema changes)
If you're adding new tables/columns:

```bash
# Development
npm run prisma:migrate:dev

# Production (after testing in dev)
npm run prisma:migrate:deploy
```

**For now**: Just run `prisma generate` to create the client. Your databases are ready to use.

---

## 6. Workflow Summary

### Local Development

```bash
git checkout dev
# Make changes locally
npm run dev              # Test locally with Dev DB
git add .
git commit -m "feat: new feature"
git push origin dev      # Triggers Vercel Preview deployment
```

### Deploy to Production

```bash
git checkout main
git merge dev            # Merge dev into main
git push origin main     # Triggers Vercel Production deployment
```

### Environment Resolution

| Environment | Branch | Database | Deployment |
|------------|--------|----------|-----------|
| **Local** | Any | Dev DB (`.env.local`) | `npm run dev` |
| **Preview** | `dev` or feature branch | Dev DB (Vercel Preview env vars) | Auto-deploy on push |
| **Production** | `main` | Prod DB (Vercel Production env vars) | Auto-deploy on push to main |

---

## 7. Testing Your Setup

### Test Local Development

```bash
npm run dev
# Visit http://localhost:3000
# Check database connection
```

### Test Preview Deployment

```bash
git checkout dev
git push origin dev
# Wait for Vercel deployment
# Visit preview URL (check Vercel dashboard)
```

### Test Production Deployment

```bash
git checkout main
git push origin main
# Wait for Vercel deployment
# Visit production URL
```

---

## 8. Common Commands

```bash
# Local development
npm run dev                    # Start dev server
npm run build                  # Build production locally
npm run start                  # Start production server locally

# Prisma commands
npm run prisma:generate        # Generate Prisma Client
npm run prisma:migrate:dev     # Create and run migration (dev)
npm run prisma:migrate:deploy  # Deploy migrations (prod)
npm run prisma:studio          # Open Prisma Studio GUI
npm run prisma:seed            # Seed database

# Testing
npm run test                   # Run tests
npm run test:watch             # Run tests in watch mode
npm run lint                   # Run linter
```

---

## 9. Security Best Practices

1. **Never commit `.env.local`** - It's gitignored for a reason
2. **Rotate credentials** - If exposed, regenerate Supabase and Resend keys
3. **Use connection pooling** - Use pooled URLs for app runtime
4. **Use direct connections for migrations** - Use direct URLs for Prisma migrations
5. **Restrict database access** - Configure Supabase connection pooler settings
6. **Enable RLS** - Use Row Level Security policies in Supabase for sensitive tables

---

## 10. Troubleshooting

### Build Fails on Vercel

**Error**: `Prisma Client could not be generated`

**Solution**: Ensure `prisma generate` runs in build command:
```json
"build": "prisma generate && next build"
```

### Database Connection Issues

**Error**: `Can't reach database server`

**Solution**: 
- Check connection string format
- Use **pooled URL** for runtime
- Use **direct URL** for migrations
- Verify Supabase project is running

### Environment Variables Not Loading

**Solution**:
- Check Vercel environment settings match branch
- Redeploy after changing environment variables
- Verify `.env.local` exists locally (not `.env`)

### Migrations Out of Sync

**Error**: `Migration ... has already been applied`

**Solution**:
```bash
# Reset dev database (DESTRUCTIVE)
npx prisma migrate reset

# Or manually sync
npx prisma migrate resolve --applied "20231201000000_migration_name"
```

---

## Resources

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [Prisma Migrations](https://www.prisma.io/docs/orm/prisma-migrate)
- [Supabase Database](https://supabase.com/docs/guides/database)
