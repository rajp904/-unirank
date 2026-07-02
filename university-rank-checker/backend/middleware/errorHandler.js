const errorHandler = (err, req, res, next) => {
  console.error('Error:', err.message);

  if (err.response) {
    // Axios error from external API
    const status = err.response.status;
    const message = err.response.data?.message || 'External API error';
    return res.status(status).json({
      success: false,
      error: message,
      code: 'EXTERNAL_API_ERROR',
    });
  }

  if (err.request) {
    // Network error
    return res.status(503).json({
      success: false,
      error: 'Unable to reach the ranking service. Please try again later.',
      code: 'NETWORK_ERROR',
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: err.message || 'Internal server error',
    code: err.code || 'SERVER_ERROR',
  });
};

module.exports = errorHandler;
