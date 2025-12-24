# Deployment Guide for Pokemon TTRPG

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest and most optimized platform for Next.js applications.

### Steps:

1. **Push to GitHub** (if not already done)
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account
   - It's free for personal projects

3. **Import Project**
   - Click "Add New..." → "Project"
   - Select your `Pokemon-ttrpg` repository
   - Click "Import"

4. **Configure (Default settings work!)**
   - Framework Preset: Next.js (auto-detected)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
   - Install Command: `npm install` (default)
   - No environment variables needed

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build
   - Your app will be live at `https://your-project.vercel.app`

6. **Install as PWA**
   - Open the deployed URL on mobile or desktop
   - Browser will prompt to "Install App"
   - Click install for offline access

### Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Alternative Deployment Options

### Netlify

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Deploy

### Self-Hosted with Node.js

```bash
# On your server
git clone https://github.com/ray-seal/Pokemon-ttrpg.git
cd Pokemon-ttrpg
npm install
npm run build
npm start
```

Then set up a reverse proxy (nginx/Apache) to port 3000.

### Docker Deployment

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t pokemon-ttrpg .
docker run -p 3000:3000 pokemon-ttrpg
```

## Post-Deployment Checklist

- [ ] Test game start screen
- [ ] Create a new game and verify save system
- [ ] Test battle mechanics
- [ ] Verify Pokedex opens correctly
- [ ] Test PokeMart purchases
- [ ] Check mobile responsiveness
- [ ] Test PWA installation
- [ ] Verify offline functionality (after install)
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

## PWA Icon Setup (Optional but Recommended)

To complete the PWA experience, add icons:

1. Create or download Pokemon-themed icons:
   - `public/icon-192.png` (192x192 pixels)
   - `public/icon-512.png` (512x512 pixels)

2. Commit and redeploy:
   ```bash
   git add public/icon-*.png
   git commit -m "Add PWA icons"
   git push
   ```

3. Vercel will auto-deploy the update

## Performance Tips

The app is already optimized, but for even better performance:

1. **Enable Vercel Analytics** (optional)
   - Add `@vercel/analytics` package
   - Track user behavior

2. **Set up Vercel Speed Insights**
   - Monitor Core Web Vitals
   - Optimize based on real user data

3. **Edge Caching**
   - Already configured through Next.js
   - Static pages cached at edge

## Troubleshooting

### Build Fails

- Check Node.js version is 18+
- Verify all dependencies installed: `npm install`
- Try local build: `npm run build`

### PWA Not Installing

- Ensure HTTPS is enabled (Vercel does this automatically)
- Check manifest.json is accessible
- Verify service worker loads without errors
- Try on Chrome/Edge (best PWA support)

### Save Game Not Working

- Check browser localStorage is enabled
- Not available in incognito/private mode
- Clear browser cache and try again

### Performance Issues

- Check browser console for errors
- Disable browser extensions
- Try different browser
- Check internet connection

## Monitoring

After deployment, monitor:

- **Vercel Dashboard**: Build status, deployment logs
- **Browser Console**: JavaScript errors
- **Network Tab**: Loading times
- **Application Tab**: localStorage, service worker status

## Updates

To deploy updates:

```bash
# Make changes
git add .
git commit -m "Description of changes"
git push

# Vercel auto-deploys on push!
```

## Backup Strategy

Game saves are stored locally in browsers. To backup:

1. Export save data (feature can be added)
2. Or keep repository updated with new features
3. Users can copy localStorage manually

## Security

- No server-side code = no server vulnerabilities
- All game logic runs client-side
- No API keys or secrets needed
- HTTPS enforced by Vercel

## Support

If users need help:
- Direct them to README.md for game instructions
- Check Issues tab on GitHub
- Verify their browser supports:
  - ES6+ JavaScript
  - localStorage
  - Service Workers (for PWA)

---

**Deployment Time**: ~3 minutes  
**Build Time**: ~2 minutes  
**Total Setup**: ~5 minutes

Your Pokemon TTRPG will be live and playable worldwide! 🎮🔥💧🌱
