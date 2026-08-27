# MindSpace

A 3D-animated notes dashboard built with Next.js 14, Framer Motion, and Tailwind CSS.

## Features

- **Notes** — Create, edit, archive, and search notes with real-time filtering
- **3D Animations** — Glassmorphism cards with `perspective`, `rotateX/rotateY`, and `translateZ` depth
- **Tasks** — Priority-based todos (Low / Medium / High) with filter tabs
- **Focus Timer** — Pomodoro (25min) + Short (5min) + Long (15min) breaks with SVG progress ring
- **Archive** — Soft-delete notes into an archive view

## Tech Stack

- Next.js 14 (App Router)
- React 18 + TypeScript
- Framer Motion
- Tailwind CSS
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
mindspace-app/
├── app/
│   ├── page.tsx          ← Main dashboard (all views)
│   ├── layout.tsx        ← Root layout
│   └── globals.css       ← 3D animations + glassmorphism
├── components/
│   ├── note-card.tsx     ← 3D animated card
│   ├── todo-item.tsx     ← Checkbox + priority badge
│   ├── focus-timer.tsx   ← Pomodoro with SVG ring
│   ├── sidebar.tsx       ← Navigation with 3D hover
│   ├── search-bar.tsx    ← Search + category filter
│   ├── note-modal.tsx    ← Create/edit note modal
│   └── ui/               ← Button, Input, Badge, Textarea, Select
├── lib/
│   └── utils.ts          ← cn() helper
└── package.json
```
