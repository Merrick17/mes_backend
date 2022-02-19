const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("access_token");
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY);
    req.verifiedUser = verified;
    next();
  } catch (err) {
    return res.status(500).json({ message: "Invalid Token" });
  }
};
