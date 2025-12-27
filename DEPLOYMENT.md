# Deployment Guide - RAG Playground

## ✅ Current Status
- ✅ Git repository initialized
- ✅ Initial commit completed
- ✅ Vercel CLI ready (via npx)
- ⏳ Ready for deployment

## 🚀 Deployment Options

### Option 1: Deploy via Vercel CLI (Quick)

```bash
# Navigate to project directory
cd /Users/jugalsheth/Desktop/RagsLLM

# Deploy to Vercel (will prompt for login if needed)
npx vercel

# For production deployment
npx vercel --prod
```

**Note**: First time will prompt you to:
1. Log in to Vercel (or create account)
2. Link to existing project or create new one
3. Configure settings (usually defaults work fine)

---

### Option 2: Deploy via GitHub + Vercel (Recommended)

This connects your GitHub repository to Vercel for automatic deployments.

#### Step 1: Create GitHub Repository

```bash
# Create a new repository on GitHub (go to https://github.com/new)
# Repository name: rag-playground (or your preferred name)
# Don't initialize with README, .gitignore, or license (we already have these)

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
cd /Users/jugalsheth/Desktop/RagsLLM
git remote add origin https://github.com/YOUR_USERNAME/rag-playground.git

# Or if using SSH:
# git remote add origin git@github.com:YOUR_USERNAME/rag-playground.git

# Push to GitHub
git branch -M main
git push -u origin main
```

#### Step 2: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Click "Deploy"

**Benefits**:
- Automatic deployments on every push
- Preview deployments for pull requests
- Easy rollbacks
- Team collaboration

---

## 📝 Vercel Configuration

The project includes optimized settings for Vercel:

- **Framework**: Next.js (auto-detected)
- **Build Command**: `next build` (default)
- **Output Directory**: `.next` (default)
- **Node Version**: 18.x (default)

### Environment Variables

Currently none required. If you add API keys later:
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add variables for Production, Preview, and Development

---

## 🔍 Verification

After deployment, check:
- ✅ Site loads correctly
- ✅ All routes work (`/`, `/playground`)
- ✅ Interactive features work
- ✅ Animations work
- ✅ Mobile responsiveness

---

## 🔄 Future Deployments

### Via CLI:
```bash
npx vercel --prod
```

### Via GitHub:
- Just push to main branch: `git push`
- Vercel automatically deploys

---

## 🐛 Troubleshooting

### Build Errors
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check Node version compatibility

### Runtime Errors
- Check function logs in Vercel dashboard
- Verify environment variables
- Check browser console for client errors

### Performance
- Enable Vercel Analytics (optional)
- Check bundle size
- Optimize images if added later

---

## 📚 Useful Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel Docs](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [GitHub Repository](https://github.com/jugalsheth?tab=repositories)

---

## 🎯 Next Steps

1. **Deploy via CLI**: Run `npx vercel` in project directory
2. **Or deploy via GitHub**: Follow Option 2 above
3. **Test the deployed site**: Verify all features work
4. **Share the URL**: Your site will be at `rag-playground.vercel.app` (or custom domain)

---

Ready to deploy! 🚀

