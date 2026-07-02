const express = require('express');
const router = express.Router();
const { checkRank } = require('../controllers/rankController');
const { validateRegistrationNumber } = require('../middleware/validate');
const { strictLimiter } = require('../middleware/rateLimiter');

router.post('/check-rank', strictLimiter, validateRegistrationNumber, checkRank);

module.exports = router;
