# Online Menu

A fast, mobile-friendly online menu built with [Next.js](https://nextjs.org). Customers can browse menu categories and items on any device, for example by scanning a QR code at the table.

## Features

- **Browse by category**: items grouped into clear, easy-to-navigate sections
- **Item details**: name, description, price, and image for each item
- **Mobile-first design**: responsive layout that works well on phones, tablets, and desktops
- **Fast loading**: built on the Next.js App Router with optimized fonts and images
- **Easy to update**: menu content is kept separate from the UI code

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [React](https://react.dev/)
- TypeScript
- [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) with [Geist](https://vercel.com/font)

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
├── app/            # Pages, layouts, and routes (App Router)
├── components/     # Reusable UI components
├── public/         # Static assets (images, icons)
└── ...
```

## Customizing the Menu

Update the menu items, categories, prices, and images in the project's menu data file, then redeploy. Place item images in the `public/` folder and reference them by path.

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

- [ ] Search and filter items
- [ ] Persian (RTL) language support
- [ ] Dark mode
- [ ] Admin panel for editing the menu
- [ ] QR code generation for tables

## Author

**Taranemp**: [GitHub](https://github.com/Taranemp)

## License

This project is currently unlicensed. All rights reserved.