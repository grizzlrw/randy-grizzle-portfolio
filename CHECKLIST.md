# Deployment Checklist

Use this checklist to verify your dev/production setup is complete.

## ✅ Prerequisites

- [ ] GitHub repository created and connected
- [ ] Supabase Production project created
- [ ] Supabase Dev project created
- [ ] Vercel account created
- [ ] Resend API key obtained

## ✅ Supabase Configuration

### Production Database
- [ ] Created Supabase project: `randy-grizzle-portfolio-prod`
- [ ] Copied **Pooled Connection String** from Settings > Database
- [ ] Copied **Direct Connection String** from Settings > Database
- [ ] Noted project URL and API keys (if needed)

### Development Database
- [ ] Created Supabase project: `randy-grizzle-portfolio-dev`
- [ ] Copied **Pooled Connection String** from Settings > Database
- [ ] Copied **Direct Connection String** from Settings > Database
- [ ] Noted project URL and API keys (if needed)

## ✅ Local Development Setup

- [ ] Cloned repository locally
- [ ] Ran `npm install`
- [ ] Created `.env.local` from `.env.local.example`
- [ ] Added DEV database credentials to `.env.local`
- [ ] Added RESEND_API_KEY to `.env.local`
- [ ] Added CONTACT_TO_EMAIL to `.env.local`
- [ ] Ran `npm run check-env` (all checks pass)
- [ ] Ran `npm run prisma:generate` successfully
- [ ] Ran `npm run dev` successfully
- [ ] Visited http://localhost:3000 and app loads
- [ ] Verified database queries work (data loads correctly)

## ✅ GitHub Setup

- [ ] Created `main` branch (production)
- [ ] Created `dev` branch (development)
- [ ] Pushed both branches to GitHub
- [ ] Set `main` as default branch (optional)
- [ ] Added branch protection rules (optional)

## ✅ Vercel Setup

### Project Connection
- [ ] Connected Vercel to GitHub repository
- [ ] Vercel auto-detected Next.js framework
- [ ] Selected correct Git scope/organization

### Production Environment
- [ ] Added `DATABASE_URL` (PROD pooled) for **Production**
- [ ] Added `DIRECT_DATABASE_URL` (PROD direct) for **Production**
- [ ] Added `RESEND_API_KEY` for **Production**
- [ ] Added `CONTACT_TO_EMAIL` for **Production**

### Preview Environment
- [ ] Added `DATABASE_URL` (DEV pooled) for **Preview**
- [ ] Added `DIRECT_DATABASE_URL` (DEV direct) for **Preview**
- [ ] Added `RESEND_API_KEY` for **Preview**
- [ ] Added `CONTACT_TO_EMAIL` for **Preview**

### Git Integration
- [ ] Set Production Branch to `main`
- [ ] Enabled automatic deployments for `main`
- [ ] Enabled automatic deployments for `dev` (Preview)
- [ ] Verified build command: `prisma generate && next build`

## ✅ Database Connection Verification

### Development Database
- [ ] Prisma Client generated successfully
- [ ] App connects to DEV database
- [ ] Existing data loads correctly
- [ ] Database queries work as expected

### Production Database
- [ ] Prisma Client included in Vercel build
- [ ] App connects to PROD database
- [ ] Existing data loads correctly
- [ ] Database queries work as expected

**Note**: No migrations needed - your databases already have the schema and data!

## ✅ Test Deployments

### Preview Deployment (Dev Branch)
- [ ] Pushed commit to `dev` branch
- [ ] Vercel triggered automatic deployment
- [ ] Preview build succeeded
- [ ] Visited preview URL
- [ ] App loads correctly on preview
- [ ] Database queries work (Preview → DEV database)

### Production Deployment (Main Branch)
- [ ] Merged `dev` into `main`
- [ ] Pushed to `main` branch
- [ ] Vercel triggered production deployment
- [ ] Production build succeeded
- [ ] Visited production URL
- [ ] App loads correctly on production
- [ ] Database queries work (Production → PROD database)

## ✅ Security Verification

- [ ] `.env.local` is gitignored (not committed)
- [ ] `.env` file removed from repository (if it contained secrets)
- [ ] Database credentials are secure (not exposed)
- [ ] Supabase RLS policies configured (if using)
- [ ] API keys are stored in Vercel environment variables only

## ✅ Monitoring & Maintenance

- [ ] Reviewed Vercel deployment logs
- [ ] Checked Vercel Analytics (optional)
- [ ] Monitored Supabase database usage
- [ ] Set up error tracking (optional: Sentry, LogRocket)
- [ ] Documented custom deployment procedures

## ✅ Documentation

- [ ] Read `SETUP.md` for quick start guide
- [ ] Read `DEPLOYMENT.md` for detailed workflow
- [ ] Updated `README.md` with any custom notes
- [ ] Team members have access (if applicable)

---

## 🎉 All Done!

If all items are checked, your dev/production environment is fully configured!

### Quick Reference

**Local Development:**
```bash
npm run dev
```

**Deploy to Preview:**
```bash
git push origin dev
```

**Deploy to Production:**
```bash
git checkout main
git merge dev
git push origin main
```

---

## Need Help?

- See [DEPLOYMENT.md](./DEPLOYMENT.md) for troubleshooting
- Check Vercel deployment logs
- Review Supabase connection settings
- Run `npm run check-env` to validate environment variables
