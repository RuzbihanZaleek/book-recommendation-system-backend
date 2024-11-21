const User = require("../../models/User");
const jwt = require("jsonwebtoken");
const isValidEmail = require("../../utils/emailValidation");
const { AUTH, USER } = require("../../constants/constants");

const signupService = async (username, email, password) => {
  try {
    if (!username || !email || !password) {
      return { status: 400, message: AUTH.MISSING_PARAMS, data: null };
    }

    if (!isValidEmail(email)) {
      return { status: 400, message: AUTH.INVALID_EMAIL, data: null };
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return { status: 400, message: USER.ALREADY_EXISTS, data: null };
    }

    const user = await User.create({ username, email, password });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { status: 201, message: USER.CREATE_SUCCESS, data: token };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: USER.CREATE_ERROR, data: null };
  }
};

const loginService = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { status: 401, message: AUTH.INVALID_EMAIL, data: null };
    }

    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return { status: 401, message: AUTH.INVALID_PASSWORD, data: null };
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return { status: 200, message: AUTH.LOGIN_SUCCESS, data: token };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: AUTH.LOGIN_FAIL, data: null };
  }
};

module.exports = { signupService, loginService };
