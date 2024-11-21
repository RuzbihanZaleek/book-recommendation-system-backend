const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/response");
const { AUTH } = require("../constants/constants");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return sendResponse(res, 401, AUTH.NO_TOKEN, null);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return sendResponse(res, 401, AUTH.INVALID_TOKEN, null);
    }
    req.user = decoded;
    next();
  });
};

module.exports = authenticate;
