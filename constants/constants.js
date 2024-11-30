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
  INVALID_CREDENTIALS: "Invalid email or password",
  LOGIN_SUCCESS: "Login success",
  LOGIN_FAIL: "Login failed",
  MISSING_PARAMS: "Username, email, and password are required",
  MISSING_LOGIN_PARAMS: "Email and password are required",
};

const USER = {
  ALREADY_EXISTS: "User with this email already exists",
  CREATE_SUCCESS: "User created successfully",
  CREATE_ERROR: "Error creating user",
};

const BOOK = {
  VALIDATIONS: {
    DESCRIPTION_CHAR_LIMIT: "Description cannot exceed 1000 characters",
    GENRE_CHAR_LIMIT: "Genre cannot exceed 100 characters",
    PARAMS_REQUIRED: "Title and author are required",
    INVALID_DATE_FORMAT:
      "The published date format is invalid. Please use YYYY-MM-DD.",
    NOT_FOUND: "Book not found",
    NOT_FOUND_BY_USER: "User not found or no books associated",
    DUPLICATE_BOOK: (title, author) =>
      `A book with the title "${title}" by ${author} already exists`,
    QUERY_REQUIRED: "Search query is required",
  },
  MESSAGES: {
    CREATE_SUCCESS: "Book created successfully",
    CREATE_ERROR: "Error creating book",
    FETCH_SUCCESS: "Books fetched successfully",
    FETCH_ERROR: "Error fetching books",
    UPDATE_SUCCESS: "Book updated successfully",
    UPDATE_ERROR: "Error updating book",
    DELETE_SUCCESS: "Book deleted successfully",
    DELETE_ERROR: "Error deleting book",
    NO_RESULTS_FOUND: "No results found",
    SEARCH_ERROR: "Error searching books",
  },
};

const USERBOOK = {
  VALIDATIONS: {
    NOT_FOUND: "No matching book found in your library",
    NOT_FOUND_BY_USER: "User not found or no books associated",
    ALREADY_EXISTS: "Book already exists in the library",
    INVALID_STATUS: "Invalid status value provided",
  },
  MESSAGES: {
    CREATE_SUCCESS: "Book added to your library",
    CREATE_ERROR: "Error adding book to the library",
    FETCH_SUCCESS: "User library fetched successfully",
    FETCH_ERROR: "Error fetching user library",
    UPDATE_SUCCESS: "Book status updated successfully",
    UPDATE_ERROR: "An error occurred while updating the book status",
    DELETE_SUCCESS: "Book removed from library",
    DELETE_ERROR: "Error removing book from library",
  },
};

const REVIEW = {
  VALIDATIONS: {
    NOT_FOUND: "No matching review found for the book",
    PARAMS_REQUIRED: "All fields are required",
    ALREADY_REVIEWED: "You have already reviewed this book",
  },
  MESSAGES: {
    CREATE_SUCCESS: "Review created successfully",
    CREATE_ERROR: "Error creating review",
    FETCH_SUCCESS: "Reviews fetched successfully",
    FETCH_ERROR: "Error fetching reviews",
    NO_REVIEWS_BY_USER: "No reviews found for this user",
    NO_REVIEWS_BY_BOOK: "No reviews found for this book",
    DELETE_SUCCESS: "Review deleted successfully",
    DELETE_ERROR: "Error deleting review",
  },
};

// Database constants
const DATABASE = {
  MESSAGES: {
    SUCCESS_MESSAGE: "Database connection established successfully",
    ERROR_MESSAGE: "Unable to connect to the database:",
    SYNC_SUCCESS: "Database synced successfully.",
    SYNC_FAIL: "Error syncing the database:",
  },
};

const DISCORD_COMMANDS = {
  USERBOOK: {
    NAME: "addBookToLibrary",
    DESCRIPTION: 'Adds a book to the user\'s library by its name.',
    VALIDATION: 'Please provide the name of the book. Usage: `!addBookToLibrary <book name>`',
    ADD_SUCCESS: (title) => `The book "${title}" was successfully added to your library!`,
  },
};

module.exports = {
  ENVIRONMENT,
  DATABASE,
  SERVER,
  AUTH,
  USER,
  BOOK,
  REVIEW,
  USERBOOK,
  DISCORD_COMMANDS
};
