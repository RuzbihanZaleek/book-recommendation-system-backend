const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const sendResponse = require("../../utils/response");
const { USER, AUTH } = require("../../constants/constants");
const isValidEmail = require("../../utils/emailValidation");

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return sendResponse(res, 400, AUTH.MISSING_PARAMS, null);
    }

    if (!isValidEmail(email)) {
      return sendResponse(res, 400, AUTH.INVALID_EMAIL, null);
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendResponse(res, 400, USER.ALREADY_EXISTS, null);
    }

    const user = await User.create({ username, email, password });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    sendResponse(res, 201, USER.CREATE_SUCCESS, token);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, USER.CREATE_ERROR, null);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendResponse(res, 401, AUTH.INVALID_EMAIL, null);
    }

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, AUTH.INVALID_PASSWORD, null);
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    sendResponse(res, 200, AUTH.LOGIN_SUCCESS, token);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, AUTH.LOGIN_FAIL, null);
  }
};
