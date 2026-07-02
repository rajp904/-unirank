require('dotenv').config();

module.exports = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'production',
  rankingApiUrl: process.env.RANKING_API_URL || 'https://umz.vercel.app/api/ranking',
  frontendUrl: process.env.FRONTEND_URL || 'https://unirankapp.vercel.app',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX) || 100,
};
