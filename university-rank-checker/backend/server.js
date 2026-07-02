const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const rankRoutes = require('./routes/rank');
const errorHandler = require('./middleware/errorHandler');
const { limiter } = require('./middleware/rateLimiter');

const app = express();

// Security headers
app.use(helmet());

// CORS — production origin + localhost origins for local development only
const allowedOrigins = [
  config.frontendUrl,                      // https://unirank-j7s4.onrender.com (prod)
  ...(config.nodeEnv !== 'production'
    ? ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:8080']
    : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow server-to-server requests (no origin) and listed origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS: origin '${origin}' not allowed`));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

// Logging
if (config.nodeEnv !== 'test') {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Global rate limiter
app.use(limiter);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'University Rank Checker API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
  });
});

// API Routes
app.use('/api', rankRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    code: 'NOT_FOUND',
  });
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`\n🚀 University Rank Checker API`);
  console.log(`📡 Server running on port ${config.port}`);
  console.log(`🌍 Environment: ${config.nodeEnv}`);
  console.log(`🔗 Health: http://0.0.0.0:${config.port}/health\n`);
});

module.exports = app;
