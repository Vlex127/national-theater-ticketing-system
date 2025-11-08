# Vercel Deployment Guide

## Critical Environment Variables

You **MUST** set these environment variables in your Vercel project settings:

### 1. AUTH_SECRET (Required)
Generate a secure random string for NextAuth:

```bash
# Using OpenSSL (Mac/Linux)
openssl rand -base64 32

# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"

# Using PowerShell (Windows)
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

### 2. DATABASE_URL (Required)
Your PostgreSQL database connection string from your provider (Neon, Supabase, etc.)

```
postgresql://username:password@host:5432/database_name?sslmode=require
```

## How to Set Environment Variables in Vercel

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `AUTH_SECRET` | [Generated secret from above] | Production, Preview, Development |
| `DATABASE_URL` | [Your database connection string] | Production, Preview, Development |

5. Click **Save**
6. **Redeploy** your application for changes to take effect

## Common Errors and Solutions

### Error: "Configuration" or "NEXTAUTH_SECRET" Error

**Cause:** Missing `AUTH_SECRET` environment variable

**Solution:** 
1. Generate a secret using one of the commands above
2. Add it to Vercel environment variables as `AUTH_SECRET`
3. Redeploy your application

### Error: Database Connection Failed

**Cause:** Incorrect `DATABASE_URL` or database not accessible from Vercel

**Solution:**
1. Verify your database URL is correct
2. Ensure your database allows connections from Vercel's IP addresses
3. For Neon/Supabase, connection pooling should be enabled

### Error: "CORS" or "Redirect" Issues

**Cause:** Incorrect domain configuration

**Solution:**
1. Ensure `trustHost: true` is set in `auth.ts` (already configured)
2. Vercel automatically sets `NEXTAUTH_URL`, but you can set it manually if needed:
   - `NEXTAUTH_URL=https://your-domain.vercel.app`

### Cookie Issues Between Localhost and Production

**Fixed:** The middleware now handles both cookie types:
- `authjs.session-token` (HTTP - localhost)
- `__Secure-authjs.session-token` (HTTPS - Vercel)

## Deployment Checklist

- [ ] Generated and set `AUTH_SECRET` in Vercel
- [ ] Set `DATABASE_URL` in Vercel
- [ ] Database is accessible from Vercel (check firewall/whitelist)
- [ ] Redeployed after setting environment variables
- [ ] Tested login on production URL

## Local Development

1. Create a `.env.local` file in the root directory:

```bash
DATABASE_URL="your-database-url"
AUTH_SECRET="your-generated-secret"
NODE_ENV="development"
```

2. Run the development server:

```bash
npm run dev
```

## Troubleshooting

If you still encounter issues:

1. Check Vercel deployment logs:
   - Go to your project → Deployments
   - Click on the latest deployment
   - Check "Building" and "Runtime Logs"

2. Enable debug mode (already configured for development):
   - Debug logs appear in development mode
   - Check browser console for NextAuth errors

3. Verify database connection:
   - Test if your database is reachable from Vercel
   - Check if Prisma migrations are applied

## Need Help?

- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Vercel Environment Variables Guide](https://vercel.com/docs/environment-variables)
- [Vercel Deployment Issues](https://vercel.com/docs/deployments/troubleshoot)
