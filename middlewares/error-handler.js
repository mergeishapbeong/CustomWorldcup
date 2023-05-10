const Sentry = require("@sentry/node");

module.exports = (error, req, res, defaultMessage) => {
  console.error(
    `에러로그 ${error.errorCode} ${req.method} ${req.originalUrl} : ${error.message}`
  );
  console.error(error);
  return Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      if (
        error.errorCode === 403 ||
        error.errorCode === 404 ||
        error.errorCode === 500
      ) {
        return true;
      }
      return false;
    },
  })(error, req, res, () => {
    if (!error.errorCode) {
      return res.status(500).json({ errorMessage: defaultMessage });
    } else {
      return res.status(error.errorCode).json({ errorMessage: error.message });
    }
  });
};
