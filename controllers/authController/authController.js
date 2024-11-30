const sendResponse = require("../../utils/response");
const { USER, AUTH } = require("../../constants/constants");
const {
  signupService,
  loginService,
} = require("../../services/authService/authService");

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await signupService(username, email, password);
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, USER.CREATE_ERROR, null);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await loginService(email, password);
    sendResponse(res, result.status, result.message, result.data);
  } catch (err) {
    console.error(err.message);
    sendResponse(res, 500, AUTH.LOGIN_FAIL, null);
  }
};

module.exports = {
  signup,
  login,
};
