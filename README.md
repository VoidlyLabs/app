# Voidly App

[Українська версія](./README.uk.md)

Voidly App is the public storefront for Voidly, built with Next.js.

It consumes the Voidly backend API to show store configuration, categories, products, product details, customer authentication, profiles, and purchase flow.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- TanStack Query
- axios

## Features

- Storefront home page loaded from backend configuration.
- Product catalog and product details.
- Category filtering.
- Customer registration, sign in, profile, and logout.
- Product purchase flow.
- Image loading from the backend `/uploads` endpoint.

## Deployment

For production or VPS deployment, use the `stack` repository:

```bash
git clone --recurse-submodules https://github.com/VoidlyLabs/stack.git
cd stack
sh deploy.sh init
nano .env
sh deploy.sh up
```

In `stack/.env`, the storefront is configured by these values:

```env
PUBLIC_CORE_URL=http://YOUR_IP:3000
APP_PUBLIC_URL=http://YOUR_IP:3002
APP_BIND=0.0.0.0
APP_PORT=3002
```

`PUBLIC_CORE_URL` is passed as `NEXT_PUBLIC_BACKEND_URL` during the Docker build. `APP_PUBLIC_URL` is passed as `ORIGIN`. Rebuild the storefront after changing either value:

```bash
sh deploy.sh up app
```

The default production URL is:

```text
http://YOUR_IP:3002
```

See `VoidlyLabs/stack` for the full deployment guide, including Docker setup, HTTPS, updates, logs, memory tuning, and volumes.

## Local Requirements

- Node.js 20+
- npm
- Running Voidly backend API

## Local Environment

Create `.env`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3000
ORIGIN=http://localhost:3002
```

## Local Development

```bash
npm install
npm run dev -- -p 3002
```

Open:

```text
http://localhost:3002
```

## Build

```bash
npm run build
npm run start -- -p 3002
```

## Checks

```bash
npm run lint
npm run build
```
