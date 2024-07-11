const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) {
    return res.status(401).json({ message: "Token is missing" });
  }

  jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
    if (error) {
      return res.status(403).send({ message: "Invalid Token" });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
