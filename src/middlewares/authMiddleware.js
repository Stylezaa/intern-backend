const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  // Remove "Bearer " prefix if it exists
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length); // Remove "Bearer " (7 characters)
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
