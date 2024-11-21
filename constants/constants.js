// Environment constants
const ENVIRONMENT = {
  DEV_ENV: "development",
  PROD_ENV: "production",
};

// Server constants
const SERVER = {
  SERVER_ERROR: "Internal Server Error",
};

// Authentication Constatsn
const AUTH = {
  NO_TOKEN: "No token provided",
  INVALID_TOKEN: "Token is invalid",
  INVALID_EMAIL: "Invalid email",
  INVALID_PASSWORD: "Invalid password",
  LOGIN_SUCCESS: "Login success",
  LOGIN_FAIL: "Login failed",
  MISSING_PARAMS: "Username, email, and password are required",
};

const USER = {
  ALREADY_EXISTS: "User with this email already exists",
  CREATE_SUCCESS: "User created successfully.",
  CREATE_ERROR: "Error creating user",
};

// Database constants
const DATABASE = {
  MESSAGES: {
    SUCCESS_MESSAGE: "Database connection established successfully.",
    ERROR_MESSAGE: "Unable to connect to the database:",
    SYNC_SUCCESS: "Database synced successfully.",
    SYNC_FAIL: "Error syncing the database:",
  },
};

module.exports = { ENVIRONMENT, DATABASE, SERVER, AUTH, USER };
