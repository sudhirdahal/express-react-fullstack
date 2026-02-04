const express = require('express');
const cors = require('cors');
const app = express();

const logger = require('./middleware/logger');

// Import Routers
const userRouter = require('./routes/user.routes.js');
const productRouter = require('./routes/product.routes.js');

// CORS - Allow requests from frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

// API Routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'API is running' });
});

// Fallback for undefined routes
app.use((req, res) => {
    res.status(404).json({ message: `Can't find ${req.originalUrl} on this server!` });
});

module.exports = app;
