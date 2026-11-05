# Online Menu

A fast, mobile-friendly online menu built with [Next.js](https://nextjs.org). Customers can browse menu categories and items on any device, for example by scanning a QR code at the table.

## Features

- **Browse by category**: items grouped into clear, easy-to-navigate sections
- **Item details**: name, description, price, and image for each item
- **Mobile-first design**: responsive layout optimized for phones, tablets, and desktops
- **Smooth navigation**: “Menu” actions scroll to the menu section on the homepage (from desktop sidebar and mobile bottom nav), including cross-page navigation
- **Unified login & role flow**: `/login` lets users choose **Customer/Guest** (no password, redirects to `/`) or **Administrator** (password `admin123`, redirects to `/admin`)
- **Admin panel**: `/admin` for editing categories and menu items (client-side, persisted to `localStorage`); unauthenticated access redirects to `/login`
- **Mobile navigation integration**: mobile BottomNav includes an Account/Login entry and shows the Admin panel entry when an admin session is active
- **Client-side auth state**: role/auth persisted in `localStorage` (demo)
- **Fast loading**: built on the Next.js App Router with optimized fonts and images
- **Easy to update**: menu content can be managed via the admin panel or in source data files

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev/)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com/)
- [lucide-react](https://lucide.dev/) icons
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with Geist and Vazirmatn (Persian)

## Getting Started

### Prerequisites

- Node.js 18.18 or newer
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/Taranemp/online-menu.git
cd online-menu
npm install
```

### Environment Variables

If the project uses environment variables, copy the example file and fill in your values:

```bash
cp .env.example .env.local
```

> Never commit real `.env` files. Only `.env.example` is tracked.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page updates automatically as you edit files. The main page is in `app/page.tsx`.

### Build for Production

```bash
npm run build
npm run start
```

## Available Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the development server         |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production build             |
| `npm run lint`  | Run ESLint                           |

## Project Structure

```
.
├── app/
│   ├── login/             # Unified role-based login (Customer/Admin)
│   ├── admin/             # Admin panel for menu management (protected)
│   ├── account/login/     # Redirect alias to /login
│   ├── categories/[slug]/ # Category route
│   ├── layout.tsx         # Root layout (RTL, Persian font)
│   └── page.tsx           # Homepage
├── components/
│   ├── auth/              # Unified login UI
│   ├── admin/             # Admin UI (editors; legacy login retained)
│   └── restaurant/        # Menu UI (header, sidebar, bottom nav, hero, categories, sections)
├── lib/
│   ├── auth.ts            # Client-side role/auth helpers (localStorage)
│   ├── menuStore.ts       # Client-side menu persistence (localStorage)
│   └── utils.ts
├── public/                # Static assets (images, icons)
└── ...
```

## Key Routes

- `/` – Restaurant homepage/menu
- `/login` – Unified login (choose Customer/Guest or Administrator)
- `/admin` – Admin panel (manage categories/items; requires admin auth)
- `/account/login` – Redirects to `/login`
- `/categories/[slug]` – Category view

## Authentication & Roles (Demo)

- **Customer / Guest:** Select “Customer/Guest” on `/login` to set the customer role and redirect to `/` (no password ).
- **Administrator:** Select “Administrator” on `/login`, enter the demo password `admin123`, then redirect to `/admin`. Admin auth is persisted in `localStorage`.
- **Route protection:** Direct access to `/admin` without admin auth redirects to `/login` (client-side).
- **Mobile navigation:** BottomNav includes an **Account/Login** entry; when an admin session is active, it also shows an **Admin** entry.
- **Production note:** Replace client-side demo auth with secure server-side authentication/authorization.

## Admin Panel

- Visit `/login`, choose Administrator, and sign in with the demo password: `admin123`.
- Add, edit, or delete categories and menu items.
- Changes are saved to browser `localStorage` and reflected on the homepage in the same browser session.
- For production, persist data to a database/API and enforce server-side access control.

## Customizing the Menu

- **Via Admin UI:** Use `/admin` to manage categories and items (stored in `localStorage`).
- **Via Source:** Update default data in `components/restaurant/categories.ts` and `components/restaurant/menuData.ts`, then redeploy. Place item images in `public/` and reference them by path.

## Screenshots

<!-- Add screenshots here, e.g. ![Menu](docs/menu.png) -->

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project in Vercel and set the **Root Directory** to `w3_next_app` (this repo contains the Next.js app in that subfolder).
3. Vercel will detect Next.js automatically:
   - **Build Command:** `npm run build` (or `next build`)
   - **Output:** Next.js default
   - **Install Command:** default (npm/yarn/pnpm)
4. Add environment variables only if you introduce server-side features later.
5. Deploy.

Notes:
- `package.json` uses standard Next.js scripts (`dev`, `build`, `start`).
- Runtime app dependencies (React, Next.js, UI libs, Tailwind runtime helpers) are in `dependencies`; build/tooling deps are in `devDependencies`.
- The app is configured for clean Vercel builds (no local-only `next.config` origins in production config).
- Browser-only APIs (`localStorage`, `window`, `document`) are accessed in client components/effects with guards to avoid SSR build/runtime issues.

## Roadmap

- [x] Persian (RTL) language support (base layout + auth UI)
- [x] Admin panel for editing the menu (local/demo)
- [x] Unified login with Customer/Admin role selection (demo)
- [x] Mobile BottomNav access to login/admin flows
- [ ] Search and filter items
- [ ] Dark mode
- [ ] Real authentication (server-side, roles/permissions)
- [ ] Server-side persistence (database/API for menu data)
- [ ] QR code generation for tables

## Author

**Taranemp**: [GitHub](https://github.com/Taranemp)

## License

This project is currently unlicensed. All rights reserved.