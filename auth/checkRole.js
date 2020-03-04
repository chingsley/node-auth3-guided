module.exports = function (role) {
  return function (req, res, next) {
    if (req.user) {
      if (req.user.roles && req.user.roles.includes(role)) {
        next();
      } else {
        return res.status(403).json({ message: 'Forbidden. Only admin role has such priviledge.' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorised. Please login to get a valid token for authorisation. ' })
    }
  }
};
