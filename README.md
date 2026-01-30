# Policy Creation

Turnkey policy creator UI (Next.js app in `turnkey-policy-creator/`).

**Repository:** [https://github.com/samwtk/createpoly](https://github.com/samwtk/createpoly)

## Quick start

**Prerequisites:** Node 18+

### Clone & run from scratch

```bash
git clone https://github.com/samwtk/createpoly.git
cd createpoly
npm run bootstrap
```

Open [http://localhost:3000](http://localhost:3000).

### Already cloned

```bash
cd turnkey-policy-creator
npm install
npm run dev
```

Or from repo root: `npm run bootstrap` (installs deps + starts dev). Or `npm run install:app` then `npm run dev` separately.

## Scripts (root)

| Script | Description |
|--------|-------------|
| `npm run bootstrap` | Install deps + start dev server |
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Build for production |
| `npm run start` | Run production server |
| `npm run install:app` | Install app dependencies only |

## Node version

Use Node 18+. An `.nvmrc` is provided; run `nvm use` (or `fnm use`) if you use a version manager.
