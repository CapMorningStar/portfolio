# Portfolio Architecture & Development Guide (SKILL.md)

This project is a high-performance **Data Science & AI/ML Engineer Portfolio** built with **Next.js 14+ (App Router)**, **TypeScript**, **Tailwind CSS**, and **HTML5 Canvas**.

---

## 📁 Directory Structure Overview

```text
D:\Projects\Porfolio\
├── public/                     # Static assets (images, project media, favicons)
├── src/
│   ├── app/                    # Next.js App Router (layout, page, globals.css)
│   │   └── SKILL.md            # App router & styling documentation
│   ├── components/             # Bento Grid, Canvas, Navigation & Section components
│   │   └── SKILL.md            # Component architecture & customization guide
│   ├── data/                   # Typed portfolio configuration layer
│   │   └── SKILL.md            # Guide for updating resume & portfolio items
│   └── lib/                    # Shared utilities (tailwind merge, clsx helper)
├── tailwind.config.ts          # Custom dark palette, fonts, and animation themes
├── tsconfig.json               # TypeScript path alias configuration (@/* -> ./src/*)
└── package.json                # Project dependencies & build scripts
```

---

## 🚀 Available Commands

- **Run Development Server**:
  ```bash
  npm run dev
  ```
  Open [http://localhost:3000](http://localhost:3000) to view the live site.

- **Build for Production**:
  ```bash
  npm run build
  ```

- **Run Production Server**:
  ```bash
  npm run start
  ```

---

## 🎨 Theme & Styling System

- **Background Palette**: Deep Space Dark (`#0a0a0a` & `#030014`)
- **Card Backgrounds**: Glassmorphism (`#111111`/70 with `backdrop-blur-xl` and `border-white/10`)
- **Accent Theme**: Emerald Glow (`emerald-400` / `emerald-500` - `#10b981`)
- **Selection Color**: Emerald translucent highlight (`selection:bg-emerald-500/30`)
