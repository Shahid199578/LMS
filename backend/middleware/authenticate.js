const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token
  console.log("Received Token:", token);

  if (!token) {
    return res.status(401).json({ message: "Token is missing" });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        console.log("JWT Verification Error:", err.message);
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    console.error("Error in middleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = authenticateToken;
