const { StatusCodes } = require('http-status-codes')
const jwt = require("jsonwebtoken");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "No Token Provided" })
    return; 
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Not Authorised" })
    return; 
  }
};

module.exports = authenticationMiddleware; 
