# Online Menu

A fast, mobile-friendly online menu built with [Next.js](https://nextjs.org). Customers can browse menu categories and items on any device, for example by scanning a QR code at the table.

## Features

- **Browse by category**: items grouped into clear, easy-to-navigate sections
- **Item details**: name, description, price, and image for each item
- **Mobile-first design**: responsive layout optimized for phones, tablets, and desktops
- **Smooth navigation**: “Menu” actions scroll to the menu section on the homepage (from desktop sidebar and mobile bottom nav), including cross-page navigation
- **Admin panel**: `/admin` for editing categories and menu items (client-side, persisted to `localStorage` with a simple password gate)
- **Authentication UI**: login/register page at `/account/login` with tabbed form, client-side validation, loading states, and RTL/Persian text support
- **Profile routing**: mobile bottom nav routes profile to login (or profile area when authenticated via mock localStorage check)
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
│   ├── admin/             # Admin panel for menu management
│   ├── account/login/     # Login/Register page
│   ├── categories/[slug]/ # Category route
│   ├── layout.tsx         # Root layout (RTL, Persian font)
│   └── page.tsx           # Homepage
├── components/
│   ├── admin/             # Admin UI (login gate, editors)
│   └── restaurant/        # Menu UI (header, sidebar, bottom nav, hero, categories, sections)
├── lib/
│   ├── menuStore.ts       # Client-side menu persistence (localStorage)
│   └── utils.ts
├── public/                # Static assets (images, icons)
└── ...
```

## Key Routes

- `/` – Restaurant homepage/menu
- `/admin` – Admin panel (manage categories/items)
- `/account/login` – Login and registration
- `/categories/[slug]` – Category view

## Admin Panel

- Visit `/admin` and sign in with the default password: `admin123` (development/demo only).
- Add, edit, or delete categories and menu items.
- Changes are saved to browser `localStorage` and reflected on the homepage in the same browser session.
- For production, replace the demo password gate with real authentication and persist data to a database/API.

## Customizing the Menu

- **Via Admin UI:** Use `/admin` to manage categories and items (stored in `localStorage`).
- **Via Source:** Update default data in `components/restaurant/categories.ts` and `components/restaurant/menuData.ts`, then redeploy. Place item images in `public/` and reference them by path.

## Screenshots

<!-- Add screenshots here, e.g. ![Menu](docs/menu.png) -->

## Deployment

The easiest way to deploy is with [Vercel](https://vercel.com/new):

1. Push the project to GitHub
2. Import the repository in Vercel
3. Add any environment variables in the project settings
4. Deploy

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for other hosting options.

## Roadmap

- [x] Persian (RTL) language support (base layout + auth UI)
- [x] Admin panel for editing the menu (local/demo)
- [ ] Search and filter items
- [ ] Dark mode
- [ ] Real authentication (replace mock/local gates)
- [ ] Server-side persistence (database/API for menu data)
- [ ] QR code generation for tables

## Author

**Taranemp**: [GitHub](https://github.com/Taranemp)

## License

This project is currently unlicensed. All rights reserved.