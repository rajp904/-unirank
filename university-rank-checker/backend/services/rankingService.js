const axios = require('axios');
const config = require('../config');

const fetchRanking = async (registrationNumber) => {
  try {
    const response = await axios.post(
      config.rankingApiUrl,
      { registrationNumber },
      {
        timeout: 15000,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    );

    if (!response.data) {
      throw {
        statusCode: 502,
        message: 'Invalid response from ranking service.',
        code: 'INVALID_RESPONSE',
      };
    }

    return response.data;
  } catch (error) {
    if (error.statusCode) throw error;

    if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
      throw {
        statusCode: 504,
        message: 'The ranking service took too long to respond. Please try again.',
        code: 'TIMEOUT_ERROR',
      };
    }

    throw error;
  }
};

module.exports = { fetchRanking };
