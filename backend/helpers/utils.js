const bcrypt = require('bcryptjs');
const { sign, verify } = require('jsonwebtoken');
const jwtSecretKey = process.env.JWT_SECRET_KEY;

exports.getMonthDigit = monthName => {
  const date = new Date(`${monthName} 1, 2023`);
  const monthDigit = date.getMonth(); // Adding 1 to match the numerical representation
  return monthDigit;
};

exports.hashPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

exports.comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

exports.createJSONToken = userId => {
  return sign({ userId }, jwtSecretKey, { expiresIn: 60 * 60 * 24 });
};

exports.validateJSONToken = token => {
  try {
    const result = verify(token, jwtSecretKey);
    return result;
  } catch (error) {
    return {
      status: 'failed',
      message: error.message,
    };
  }
};
