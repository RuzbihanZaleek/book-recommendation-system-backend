function sendResponse(res, status = 200, message = "", data = null) {
  const response = {
    status: status >= 200 && status < 300 ? "success" : "error",
    statusCode: status,
    message:
      message ||
      (status >= 200 && status < 300
        ? "Request successful"
        : "An error occurred"),
    data: data,
  };

  return res.status(status).json(response);
}

module.exports = sendResponse;
