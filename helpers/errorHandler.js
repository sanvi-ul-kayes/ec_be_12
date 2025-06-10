function errorHandler(error, req, res, next) {
  if (error) {
    res
      .status(500)
      .send({ success: false, msg: error ? error : "Internal Server Error" });
  } else {
    next();
  }
}

module.exports = errorHandler;
