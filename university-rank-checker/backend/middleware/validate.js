const validateRegistrationNumber = (req, res, next) => {
  const { registrationNumber } = req.body;

  if (!registrationNumber) {
    return res.status(400).json({
      success: false,
      error: 'Registration number is required.',
      code: 'VALIDATION_ERROR',
    });
  }

  const trimmed = String(registrationNumber).trim();

  if (trimmed.length === 0) {
    return res.status(400).json({
      success: false,
      error: 'Registration number cannot be empty.',
      code: 'VALIDATION_ERROR',
    });
  }

  if (!/^\d{8,12}$/.test(trimmed)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid registration number format. It should be 8-12 digits.',
      code: 'INVALID_REG_NUMBER',
    });
  }

  req.body.registrationNumber = trimmed;
  next();
};

module.exports = { validateRegistrationNumber };
