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
├── server.js                 # Entry point, MongoDB connection
├── app.js                    # Express config, CORS, routes
├── package.json              # Backend dependencies
├── .env                      # Backend env vars (local)
├── CLAUDE.md                 # Project documentation
│
├── controllers/
│   ├── product.controller.js # Product API handlers
│   └── user.controller.js    # User API handlers
│
├── routes/
│   ├── product.routes.js     # Product endpoints
│   └── user.routes.js        # User endpoints
│
├── models/
│   ├── product.model.js      # Mongoose Product schema
│   └── user.model.js         # Mongoose User schema
│
├── middleware/
│   ├── auth.js               # API key authentication
│   └── logger.js             # Request logger
│
└── client/                   # React Frontend (Vite)
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── vercel.json           # SPA routing config
    ├── .env                  # Frontend env vars
    │
    ├── src/
    │   ├── main.jsx          # React entry point
    │   ├── App.jsx           # Router setup
    │   ├── App.css
    │   ├── index.css
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Navbar.css
    │   │
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Products.jsx
    │   │   ├── Users.jsx
    │   │   └── Pages.css
    │   │
    │   └── services/
    │       └── api.js        # API fetch functions
    │
    └── public/
        └── vite.svg
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

**Live URLs:**
- Frontend: https://express-react-fullstack.vercel.app
- Backend API: https://express-react-pi.onrender.com/api/v1

**Environment variables to set:**
- Render: `DATABASE_URL`, `API_KEY`, `FRONTEND_URL` (Vercel URL, no trailing slash)
- Vercel: `VITE_API_URL` (Render URL + /api/v1)
