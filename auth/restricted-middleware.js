const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ message: 'Unathorised. You have provided an invalid token.' });
      } else {
        console.log('decodedToken = ', decodedToken);
        req.user = { username: decodedToken.username, roles: decodedToken.roles };
        next();
      }
    })
  } else {
    res.status(401).json({ message: 'Missing authorization token. Please provide a valid token.' });
  }
};
