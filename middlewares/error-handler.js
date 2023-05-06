module.exports = (error, req, res, defaultMessage) => {
  console.error(`${req.method} ${req.originalUrl} : ${error.message}`);

  if (!error.errorCode) {
    return res.status(400).json({ errorMessage: defaultMessage });
  } else {
    return res
      .status(error.errorCode)
      .json({ errorMessage: error.errorMessage });
  }
};
