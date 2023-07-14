const { validateJSONToken } = require('./utils');

function checkAuthMiddleware(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({
      status: 'failed',
      message: 'Unauthorized request. Not authenticated user.',
    });
  }
  const token = auth.split(' ')[1];

  const validToken = validateJSONToken(token);
  // validToken : { userId: '648c102fcf2b8b5996df02fe', iat: 1686937459, exp: 1686941059 }
  // console.log('--------------valid token----------------', validToken);

  if (validToken.status === 'failed') {
    return res.status(401).json({
      status: 'failed',
      message: validToken.message,
    });
  }
  req.userId = validToken.userId;

  next();
}

function checkingTokenValidity(req, res) {
  // Get auth token
  const authToken = req.headers.authorization.split(' ')[1];

  if (!authToken) {
    return res.status(401).json({
      message: 'User is not authenticated. JSON Web Token is not valid',
    });
  }
  const tokenIsValid = validateJSONToken(authToken);
  // jwt : { userId: '648c102fcf2b8b5996df02fe', iat: 1686937459, exp: 1686941059 }

  if (!tokenIsValid) {
    return res.status(401).json({
      message: 'Token is expired.',
    });
  }
}

exports.checkAuthMiddleware = checkAuthMiddleware;
exports.checkingTokenValidity = checkingTokenValidity;
