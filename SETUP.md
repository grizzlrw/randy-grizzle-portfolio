# Quick Setup Guide

Follow these steps to get your dev/prod environment working:

## 1. Local Development Setup (5 minutes)

### Create your local environment file:
```powershell
# Copy the example file
Copy-Item .env.local.example .env.local

# Edit .env.local with your DEV database credentials
notepad .env.local
```

### Add your Supabase DEV credentials to `.env.local`:
```env
DATABASE_URL="postgresql://postgres.xxxxx:password@aws-0-us-west-2.pooler.supabase.com:5432/postgres"
DIRECT_DATABASE_URL="postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres"
RESEND_API_KEY="re_xxxxxxxxxxxx"
CONTACT_TO_EMAIL="your-email@example.com"
```

### Generate Prisma Client:
```powershell
npm run prisma:generate
```

**Note**: No migrations needed! Your database already has the schema and data.

### Start development:
```powershell
npm run dev
```

Visit http://localhost:3000 ✅

---

## 2. Vercel Setup (10 minutes)

### Connect GitHub:
1. Go to https://vercel.com/new
2. Import `randy-grizzle-portfolio` repository
3. Vercel auto-detects Next.js

### Add Production Environment Variables:
In Vercel dashboard → Settings → Environment Variables

Add these for **Production** environment:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your Supabase PROD pooled URL | Production |
| `DIRECT_DATABASE_URL` | Your Supabase PROD direct URL | Production |
| `RESEND_API_KEY` | Your Resend API key | Production |
| `CONTACT_TO_EMAIL` | Your email | Production |

### Add Preview Environment Variables:
Add these for **Preview** environment:

| Variable | Value | Environment |
|----------|-------|-------------|
| `DATABASE_URL` | Your Supabase DEV pooled URL | Preview |
| `DIRECT_DATABASE_URL` | Your Supabase DEV direct URL | Preview |
| `RESEND_API_KEY` | Your Resend API key | Preview |
| `CONTACT_TO_EMAIL` | Your email | Preview |

### Configure Git:
- Settings → Git → Production Branch: `main`
- Enable automatic deployments

---

## 3. GitHub Branches

### Create dev branch (if not exists):
```powershell
git checkout -b dev
git push -u origin dev
```

---

## 4. Test Your Setup

### Test Local:
```powershell
npm run dev
# Visit http://localhost:3000
```

### Test Preview Deployment:
```powershell
git checkout dev
git add .
git commit -m "test: preview deployment"
git push origin dev
# Check Vercel dashboard for preview URL
```

### Test Production Deployment:
```powershell
git checkout main
git merge dev
git push origin main
# Check Vercel dashboard for production URL
```

---

## Workflow Summary

```
┌─────────────────────────────────────────────────────┐
│ Local Development (on `dev` branch)                 │
│  ↓                                                   │
│ Push to GitHub `dev` branch                         │
│  ↓                                                   │
│ Vercel Auto-Deploy to Preview (uses Dev DB)         │
│  ↓                                                   │
│ Merge `dev` → `main` when ready                     │
│  ↓                                                   │
│ Vercel Auto-Deploy to Production (uses Prod DB)     │
└─────────────────────────────────────────────────────┘
```

---

## Need Help?

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed documentation.
