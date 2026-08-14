# Ruparagunath G — Portfolio

A creative minimalist portfolio built with React + Vite.

## Features
- Custom bronze cursor with ring effect on hover
- Scroll progress bar
- Dual-row infinite skill marquee
- Staggered scroll-reveal animations
- Active section nav tracking
- Social links: GitHub, LinkedIn, Gmail, WhatsApp
- Fully responsive

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run dev server (opens at http://localhost:5173)
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Project Structure

```
ruparagunath-portfolio/
├── index.html          ← HTML entry point
├── vite.config.js      ← Vite config
├── package.json        ← Dependencies
├── public/
│   └── favicon.svg     ← Tab icon
└── src/
    ├── main.jsx        ← React mount
    └── App.jsx         ← Full portfolio component
```

## Deploy to Netlify (free, ~2 min)

```bash
npm run build
```
Then drag the `dist/` folder to → https://app.netlify.com/drop

## Deploy to Vercel

Push to GitHub → import at vercel.com → auto-deploys on every push.

## Tech Stack
- React 18
- Vite 5
- lucide-react (icons)
- Google Fonts: Cormorant Garamond + Outfit
- Pure CSS animations (no extra libraries)
