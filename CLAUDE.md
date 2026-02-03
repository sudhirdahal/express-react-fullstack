# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Run Commands

- **Start server**: `npm start` (runs `node server.js` on port 3000)
- **Install dependencies**: `npm install`

## Architecture

This is an Express.js e-commerce application with MongoDB and EJS templating, following MVC pattern.

### Entry Points
- `server.js` - Application entry point, MongoDB connection via Mongoose
- `app.js` - Express app configuration, middleware setup, route mounting

### Request Flow
1. Global middleware: `express.json()`, `express.urlencoded()`, custom `logger`
2. Static files served from `/public`
3. Routes mounted at `/api/v1/users` and `/api/v1/products`
4. Auth middleware (`x-api-key` header validation) applied selectively to POST product creation

### Key Directories
- `controllers/` - Request handlers (product CRUD, user endpoints)
- `routes/` - Route definitions with middleware binding
- `models/` - Mongoose schemas (Product: name, price, createdAt)
- `views/` - EJS templates with partials (head, nav, footer)
- `middleware/` - Logger and API key auth

### Product API Endpoints
- `GET /api/v1/products/view` - Renders product catalog with search/sort (`?search=term&sort=price_asc|price_desc|newest`)
- `POST /api/v1/products` - Create product (requires `x-api-key` header)
- `POST /api/v1/products/delete/:id` - Delete product by MongoDB ID

### Environment Variables
Required in `.env`:
- `PORT` - Server port (default 3000)
- `DATABASE_URL` - MongoDB Atlas connection string
- `API_KEY` - API key for authenticated endpoints

## Key Patterns

- Controllers use async/await with try-catch for error handling
- Product search uses case-insensitive regex on name field
- EJS templates receive `title`, `page_name`, `searchTerm`, `currentSort` for rendering context
- Static assets path uses `/CSS/style.css` (note capitalization)
