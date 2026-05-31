# Shortly - Complete MERN URL Shortener
#LIVE URL: https://shortly-orpin-one.vercel.app/

Shortly is a production-ready URL shortener website built with the MERN stack.  
It converts long URLs into short shareable links, tracks clicks, supports optional custom alias + expiration, and provides a modern responsive UI.

## Tech Stack

### Frontend
- React 19 + Vite 8
- Tailwind CSS 4
- React Router DOM 7
- Axios
- Framer Motion
- React Hot Toast

### Backend
- Node.js + Express 5
- MongoDB + Mongoose 9
- Helmet, CORS, rate limiting, input sanitization

## Step-by-Step Build Order

### 1) Project setup
- Created `client/` and `server/`.
- Added root scripts to run both together.

### 2) Install dependencies
- Installed frontend and backend dependencies with current stable versions.

### 3) Folder structure
```text
.
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   └── .env.example
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── .env.example
└── package.json
```

### 4) Backend setup
- Express app in `server/src/app.js`.
- Centralized middleware and route mounting.

### 5) MongoDB connection
- Added connection helper at `server/src/config/db.js`.
- Startup entry at `server/src/server.js`.

### 6) URL schema
- Added `server/src/models/url.model.js` with:
  - `originalUrl`
  - `shortCode` (unique + indexed)
  - `shortUrl`
  - `clicks`
  - `createdAt`/`updatedAt`
  - optional `expiresAt`

### 7) API routes
- Added `server/src/routes/url.routes.js`:
  - `POST /api/urls`
  - `GET /api/urls/recent`
  - `GET /api/urls/:shortCode`
  - `DELETE /api/urls/:shortCode`
- Redirect route:
  - `GET /:shortCode`

### 8) Controller logic
- Added `server/src/controllers/url.controller.js`:
  - create short URL
  - fetch details
  - fetch recent URLs
  - delete URL
  - redirect + click increment

### 9) Short URL generator
- Added `server/src/utils/generateShortCode.js` (crypto-based unique code generation).
- Added `server/src/utils/buildShortUrl.js`.

### 10) Frontend setup
- Configured Vite + Tailwind plugin in `client/vite.config.js`.
- Router + toast provider in `client/src/main.jsx`.

### 11) UI components
- Built responsive components:
  - Navbar + dark mode toggle
  - Hero section
  - URL form
  - Result card with copy + QR
  - Recent URL list
  - Footer
  - Loading spinner

### 12) API integration
- Axios service in `client/src/services/urlService.js`.
- Connected form to backend with loading/error states + toasts.

### 13) Redirect functionality
- `GET /:shortCode` redirects to original URL and increments clicks.

### 14) Deployment
- Backend:
  - Deploy `server` to Render/Railway/Fly/EC2.
  - Set env vars: `MONGO_URI`, `BASE_URL`, `CLIENT_URLS`, `PORT`.
- Frontend:
  - Deploy `client` to Vercel/Netlify/Cloudflare Pages.
  - Set `VITE_API_BASE_URL` to backend `/api` URL.

## Environment Variables

### Server (`server/.env`)
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/shortly
BASE_URL=http://localhost:5000
CLIENT_URLS=http://localhost:5173
```

### Client (`client/.env`)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Run Locally

From project root:

```bash
npm run dev
```

Or run independently:

```bash
npm run dev --prefix server
npm run dev --prefix client
```

## API Summary

### Create short URL
- `POST /api/urls`
- Body:
```json
{
  "originalUrl": "https://example.com/some/long/path",
  "customAlias": "optional-alias",
  "expiresInDays": 30
}
```

### Get URL details
- `GET /api/urls/:shortCode`

### Get recent URLs
- `GET /api/urls/recent?limit=8`

### Delete URL
- `DELETE /api/urls/:shortCode`

### Redirect
- `GET /:shortCode`

## Security + Performance Included
- URL validation
- Unique short code checks
- Rate limiting
- Helmet headers
- Mongo sanitization
- Small JSON payload limit
- Indexed Mongo queries
- Lightweight frontend build

## Verification Done
- `client`: lint passed, production build passed.
- `server`: syntax checks passed.
