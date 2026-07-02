const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./config');
const rankRoutes = require('./routes/rank');
const errorHandler = require('./middleware/errorHandler');
const { limiter } = require('./middleware/rateLimiter');

const app = express();

// ── Security headers ──────────────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────────────────────
// Open CORS — allows requests from any origin.
// This resolves the "No Access-Control-Allow-Origin" error from Vercel frontend.
app.use(cors());

// Explicit OPTIONS preflight handler — must come before route definitions.
// Use '/{*path}' syntax compatible with Express 5 / path-to-regexp v8.
app.options('/{*path}', cors());

// ── Logging ───────────────────────────────────────────────────────────────────
if (config.nodeEnv !== 'test') {
  app.use(morgan('combined'));
}

// ── Body parsing ──────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ── Rate limiting ─────────────────────────────────────────────────────────────
app.use(limiter);

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'University Rank Checker API is running',
    timestamp: new Date().toISOString(),
    environment: config.nodeEnv,
    frontendUrl: config.frontendUrl,   // printed so you can verify on Render logs
  });
});

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api', rankRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: 'Route not found', code: 'NOT_FOUND' });
});

// ── Error handler ─────────────────────────────────────────────────────────────
app.use(errorHandler);

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(config.port, () => {
  console.log('\n🚀 University Rank Checker API');
  console.log(`📡 Port        : ${config.port}`);
  console.log(`🌍 Environment : ${config.nodeEnv}`);
  console.log(`🔗 Frontend URL: ${config.frontendUrl}`);   // verify this on Render logs
  console.log(`✅ CORS        : open (all origins allowed)\n`);
});

module.exports = app;
