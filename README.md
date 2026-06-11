# Cloudflare Full-Stack Template

[cloudflarebutton]

A production-ready full-stack application template built with React, Vite, and Cloudflare Workers. Features a modern UI with shadcn components, type-safe backend using Durable Objects, and seamless deployment to the Cloudflare edge.

## Features

- React + Vite frontend with Tailwind CSS and shadcn/ui components
- Cloudflare Workers backend powered by Hono
- Durable Objects for stateful entities (Users, Chats, Messages)
- Indexed entity storage with automatic seeding
- Theme support (light/dark) and responsive design
- Error reporting, React Query, and React Router included
- Type-safe TypeScript throughout
- One-click deployment to Cloudflare

## Tech Stack

**Frontend**
- React 18, Vite 6, TypeScript 5.8
- Tailwind CSS, shadcn/ui components, Framer Motion
- React Query, React Router, Zustand, Immer
- Lucide icons, Sonner toasts

**Backend**
- Cloudflare Workers + Hono
- Durable Objects (GlobalDurableObject for entities)
- Shared types between client and worker

**Tooling**
- Bun package manager
- Wrangler for deployment
- ESLint + TypeScript strict configuration

## Getting Started

### Prerequisites
- Bun (v1.0+)
- Cloudflare account (for deployment)

### Installation

```bash
bun install
```

### Development

Start the local development server:

```bash
bun run dev
```

This launches the Vite dev server with the Cloudflare Workers integration. The frontend is available at `http://localhost:3000` and API routes are proxied to the worker.

Key scripts:
- `bun run build` – Build production assets
- `bun run preview` – Preview production build locally
- `bun run deploy` – Build and deploy to Cloudflare
- `bun run cf-typegen` – Generate Cloudflare Workers types

## Project Structure

- `src/` – React frontend (pages, components, hooks)
- `worker/` – Cloudflare Workers backend (routes, entities, core utilities)
- `shared/` – Shared TypeScript types and mock data
- `worker/entities.ts` – UserEntity and ChatBoardEntity examples using Durable Objects

## Usage

The template includes example endpoints for managing users and chat boards with messages. Extend `worker/user-routes.ts` to add your own API logic. The frontend demonstrates theme toggling and a placeholder home page ready for customization.

API examples:
- `GET /api/users` – List users
- `POST /api/chats/:chatId/messages` – Send chat message

See `shared/types.ts` for entity definitions.

## Deployment

Deploy to Cloudflare Workers with a single command:

```bash
bun run deploy
```

[cloudflarebutton]

After deployment, your application will be live on your `*.workers.dev` subdomain. Update `wrangler.jsonc` for custom domains or additional bindings.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request. Ensure all TypeScript checks and linting pass before submitting.

## License

This project is provided as a template under the MIT License.