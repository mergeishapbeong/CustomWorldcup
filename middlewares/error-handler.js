module.exports = (error, req, res, defaultMessage) => {
  console.error(`${req.method} ${req.originalUrl} : ${error.message}`);
  console.log(error.errorCode);
  if (!error.errorCode) {
    return res.status(500).json({ errorMessage: defaultMessage });
  } else {
    return res.status(error.errorCode).json({ errorMessage: error.message });
  }
};
