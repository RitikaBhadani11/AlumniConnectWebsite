const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "❌ Access Denied. No Token Provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.user = decoded; // Attach user payload to request
    next(); // Move to next middleware or route
  } catch (error) {
    return res.status(400).json({ message: "❌ Invalid Token" });
  }
};

module.exports = authMiddleware;
