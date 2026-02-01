# Cloudflare Pages Deployment Guide

## 🚀 Quick Deploy

### Option 1: Connect GitHub Repository (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/online-tools.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Click **Connect to Git**
   - Select your repository
   - Configure build settings:
     - **Production branch**: `main`
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/`
     - **Environment variables**: None needed (for now)

3. **Deploy**
   - Click **Save and Deploy**
   - Wait for build to complete
   - Your site will be live at `your-project.pages.dev`

### Option 2: Direct Upload (Quick Test)

```bash
# Build locally
npm run build

# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist --project-name=online-tools
```

## 🔧 Build Configuration

### Cloudflare Pages Settings

```yaml
Build command: npm run build
Build output directory: dist
Root directory: /
Node version: 18 (or latest LTS)
```

### Environment Variables (if needed in future)

For backend integration:

```
API_BASE_URL=https://api.yourdomain.com
```

Add in: **Pages Settings** → **Environment Variables**

## 🌐 Custom Domain Setup

1. Go to **Pages** → Your project → **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain: `tools.yourdomain.com`
4. Add the CNAME record to your DNS:
   ```
   CNAME tools.yourdomain.com your-project.pages.dev
   ```
5. Wait for DNS propagation (5-30 minutes)
6. SSL certificate is automatically provisioned

## 🔄 Automatic Deployments

Every push to `main` branch triggers automatic deployment:

```bash
git add .
git commit -m "Add new tool"
git push
# Cloudflare automatically builds and deploys
```

### Preview Deployments

Every pull request gets a preview URL:
- `https://[commit-hash].your-project.pages.dev`

## 📊 Performance Optimization

### Already Optimized
- ✅ Static site generation
- ✅ Vite production build
- ✅ Tree-shaking enabled
- ✅ Minified CSS/JS
- ✅ Cloudflare's global CDN

### Future Optimizations

1. **Add `_headers` file** for caching:
   ```
   # In public/_headers
   /assets/*
     Cache-Control: public, max-age=31536000, immutable
   
   /*.js
     Cache-Control: public, max-age=31536000, immutable
   
   /*.css
     Cache-Control: public, max-age=31536000, immutable
   ```

2. **Add `_redirects` file** for SPA routing:
   ```
   # In public/_redirects
   /*    /index.html   200
   ```

## 🔒 Security Headers

Add security headers in Cloudflare Pages:

```
# _headers file in public/ folder
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
```

## 📈 Analytics Setup

### Cloudflare Web Analytics (Free)

1. Go to **Analytics** → **Web Analytics**
2. Add your site
3. Copy the script snippet
4. Add to `index.html` before `</head>`:

```html
<script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
```

## 🐛 Troubleshooting

### Build Fails

Check Node version:
```bash
# In Cloudflare Pages settings, set Node version to 18 or latest LTS
```

### 404 on Direct URL Access

Add `_redirects` file:
```bash
echo "/*    /index.html   200" > public/_redirects
```

### Blank Page

Check browser console for errors. Common fixes:
- Ensure `base` in `vite.config.js` is correct
- Check all imports are correct

### CSS Not Loading

Verify `dist/` folder contains:
- `index.html`
- `assets/` folder with CSS/JS

## 🚀 Going Live Checklist

- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview works (`npm run preview`)
- [ ] All tools function correctly
- [ ] Mobile responsive checked
- [ ] SEO meta tags added
- [ ] Analytics configured
- [ ] Custom domain setup (optional)
- [ ] Social sharing image added
- [ ] Error pages customized

## 📝 Deployment Commands

```bash
# Build and preview locally before deploying
npm run build
npm run preview

# If using direct upload
wrangler pages deploy dist --project-name=online-tools

# Check deployment status
wrangler pages deployment list --project-name=online-tools
```

## 🔗 Useful Links

- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [React Router on Static Hosts](https://reactrouter.com/en/main/guides/deploying#static-hosting)

---

**Your app is now live and globally distributed! 🎉**
