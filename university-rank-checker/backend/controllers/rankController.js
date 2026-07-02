const { fetchRanking } = require('../services/rankingService');

const checkRank = async (req, res, next) => {
  try {
    const { registrationNumber } = req.body;

    const data = await fetchRanking(registrationNumber);

    if (!data.success) {
      return res.status(404).json({
        success: false,
        error: data.message || 'Student not found. Please check your registration number.',
        code: 'STUDENT_NOT_FOUND',
      });
    }

    return res.status(200).json({
      success: true,
      data: data.data,
      message: 'Rank fetched successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkRank };
