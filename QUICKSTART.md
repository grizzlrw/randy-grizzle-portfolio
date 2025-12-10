# Quick Start - Connecting to Existing Databases

Your Supabase databases already have the schema and data. This guide helps you connect your app without running migrations.

## ✅ What You Need

- Supabase DEV database connection string (pooled)
- Supabase PROD database connection string (pooled)
- Resend API key
- Contact email address

## 🚀 Setup Steps

### 1. Create Local Environment File

```bash
# Copy the template
Copy-Item .env.example .env.local
```

### 2. Add Your DEV Database Credentials

Edit `.env.local` with your Supabase **DEV** project credentials:

```env
DATABASE_URL="postgresql://postgres.YOUR_PROJECT:YOUR_PASSWORD@aws-0-us-west-2.pooler.supabase.com:5432/postgres"
RESEND_API_KEY="re_YOUR_KEY"
CONTACT_TO_EMAIL="your-email@example.com"
```

**Where to find these:**
- Supabase Dashboard → Your Project → Settings → Database
- Copy the **"Connection pooling"** URI (not the direct connection)

### 3. Install and Generate

```bash
# Install dependencies
npm install

# Generate Prisma Client (connects to your existing database)
npm run prisma:generate
```

### 4. Verify and Run

```bash
# Check environment variables
node scripts/check-env.js

# Start development server
npm run dev
```

Visit http://localhost:3000 - your app should load with existing data! ✅

## 🌐 Vercel Setup (Production & Preview)

### 1. Connect Repository

- Go to https://vercel.com/new
- Import `randy-grizzle-portfolio` repository

### 2. Add Environment Variables

**For Production Environment:**

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Supabase **PROD** pooled connection string | From production project |
| `RESEND_API_KEY` | Your Resend API key | Same for both environments |
| `CONTACT_TO_EMAIL` | Your email | Same for both environments |

**For Preview Environment:**

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Supabase **DEV** pooled connection string | From dev project |
| `RESEND_API_KEY` | Your Resend API key | Same for both environments |
| `CONTACT_TO_EMAIL` | Your email | Same for both environments |

### 3. Deploy

```bash
# Deploy preview (dev branch)
git checkout dev
git push origin dev

# Deploy production (main branch)
git checkout main
git merge dev
git push origin main
```

## 🎯 That's It!

No migrations needed - your databases already work!

## 📝 Common Questions

**Q: Do I need DIRECT_DATABASE_URL?**  
A: No! Only needed for running migrations. Since your databases already have the schema, you can skip it.

**Q: What if my schema changes?**  
A: Run `npx prisma db pull` to sync your `schema.prisma` file with the database, then run `prisma generate`.

**Q: How do I verify the connection?**  
A: Run `npm run dev` and check if data loads. You can also use `npm run prisma:studio` to browse your database.

**Q: What if I get connection errors?**  
A: Double-check:
- You're using the **pooled** connection string (contains "pooler.supabase.com")
- Your password is correct
- Your Supabase project is not paused

## 🆘 Troubleshooting

**Error: "Can't reach database server"**
- Verify connection string in `.env.local`
- Check Supabase project is running
- Try the connection string in Prisma Studio: `npm run prisma:studio`

**Error: "Prisma Client not generated"**
- Run: `npm run prisma:generate`
- Restart VS Code if using TypeScript

**Data not showing**
- Verify you're connected to the correct database (DEV vs PROD)
- Check Supabase database has data (use Supabase SQL Editor)

---

**Need more details?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive guide.
