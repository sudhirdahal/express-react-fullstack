# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands

**Backend (Express API):**
```bash
npm install
npm start        # Runs on http://localhost:3000
```

**Frontend (React):**
```bash
cd client
npm install
npm run dev      # Runs on http://localhost:5173
npm run build    # Production build for Vercel
```

## Architecture

This is a decoupled application with React frontend and Express API backend.

```
expressNreact/
├── server.js              # API entry point, MongoDB connection
├── app.js                 # Express config, CORS, routes
├── controllers/           # JSON API handlers
├── routes/                # API route definitions
├── models/                # Mongoose schemas (User, Product)
├── middleware/            # Logger, API key auth
└── client/                # React frontend (Vite)
    ├── src/
    │   ├── components/    # Navbar
    │   ├── pages/         # Home, Products, Users
    │   ├── services/      # API fetch functions
    │   └── App.jsx        # Router setup
    └── .env               # VITE_API_URL
```

## API Endpoints

**Users:**
- `GET /api/v1/users?search=&sort=newest|oldest|name_asc|name_desc`
- `GET /api/v1/users/:id`
- `POST /api/v1/users` - Body: `{ "name": "..." }`
- `DELETE /api/v1/users/:id`

**Products:**
- `GET /api/v1/products?search=&sort=newest|oldest|price_asc|price_desc`
- `GET /api/v1/products/:id`
- `POST /api/v1/products` - Requires `x-api-key` header, Body: `{ "name": "...", "price": 99 }`
- `DELETE /api/v1/products/:id`

## Environment Variables

**Backend (.env):**
- `PORT` - Server port (default 3000)
- `DATABASE_URL` - MongoDB Atlas connection string
- `API_KEY` - API key for product creation
- `FRONTEND_URL` - Frontend URL for CORS (default http://localhost:5173)

**Frontend (client/.env):**
- `VITE_API_URL` - Backend API URL (default http://localhost:3000/api/v1)

## Deployment

- **Backend**: Render (Web Service)
- **Frontend**: Vercel (Static Site)

Update environment variables on each platform to point to production URLs.
