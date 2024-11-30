const { USERBOOK } = require("../../constants/constants");
const { Book, UserBooks } = require("../../models/associations");

const addBookToLibraryService = async (userId, bookId) => {
  try {
    // check the book is already exists in the library
    const existingEntry = await UserBooks.findOne({
      where: { UserId: userId, BookId: bookId },
    });

    if (existingEntry) {
      return {
        status: 400,
        message: USERBOOK.VALIDATIONS.ALREADY_EXISTS,
        data: null,
      };
    }

    await UserBooks.create({
      UserId: userId,
      BookId: bookId,
    });

    return {
      status: 201,
      message: USERBOOK.MESSAGES.CREATE_SUCCESS,
      data: null,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: USERBOOK.MESSAGES.CREATE_ERROR, data: null };
  }
};

const getUserLibraryService = async (userId) => {
  try {
    const userLibrary = await UserBooks.findAll({
      where: { UserId: userId },
      include: [Book],
    });

    if (!userLibrary) {
      return {
        status: 404,
        message: USERBOOK.VALIDATIONS.NOT_FOUND_BY_USER,
        data: null,
      };
    }

    return {
      status: 200,
      message: USERBOOK.MESSAGES.FETCH_SUCCESS,
      data: userLibrary,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: USERBOOK.MESSAGES.FETCH_ERROR, data: null };
  }
};

const getUserLibraryBookByIdService = async (userId, bookId) => {
  try {
    const userLibrary = await UserBooks.findOne({
      where: { UserId: userId, BookId: bookId },
      include: [Book],
    });

    if (!userLibrary) {
      return {
        status: 404,
        message: USERBOOK.VALIDATIONS.NOT_FOUND_BY_USER,
        data: null,
      };
    }

    return {
      status: 200,
      message: USERBOOK.MESSAGES.FETCH_SUCCESS,
      data: userLibrary,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: USERBOOK.MESSAGES.FETCH_ERROR, data: null };
  }
};

const updateBookStatusService = async (userId, bookId, status) => {
  try {
    const validStatuses = ["reading", "finished", "plan_to_read"];
    console.log(status);
    console.log(validStatuses.includes(status));

    if (!validStatuses.includes(status)) {
      return {
        status: 400,
        message: USERBOOK.VALIDATIONS.INVALID_STATUS,
        data: null,
      };
    }

    const updatedRows = await UserBooks.update(
      { status },
      {
        where: {
          UserId: userId,
          BookId: bookId,
        },
      }
    );

    if (updatedRows[0] === 0) {
      return {
        status: 404,
        message: USERBOOK.VALIDATIONS.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: 200,
      message: USERBOOK.MESSAGES.UPDATE_SUCCESS,
      data: null,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: USERBOOK.MESSAGES.UPDATE_ERROR, data: null };
  }
};

const removeBookFromLibraryService = async (userId, bookId) => {
  try {
    console.log(userId, bookId);
    const deletedRows = await UserBooks.destroy({
      where: {
        UserId: userId,
        BookId: bookId,
      },
    });

    if (deletedRows === 0) {
      return {
        status: 404,
        message: USERBOOK.VALIDATIONS.NOT_FOUND,
        data: null,
      };
    }

    return {
      status: 200,
      message: USERBOOK.MESSAGES.DELETE_SUCCESS,
      data: null,
    };
  } catch (err) {
    console.error(err.message);
    return { status: 500, message: USERBOOK.MESSAGES.DELETE_ERROR, data: null };
  }
};

module.exports = {
  addBookToLibraryService,
  getUserLibraryService,
  getUserLibraryBookByIdService,
  updateBookStatusService,
  removeBookFromLibraryService,
};
