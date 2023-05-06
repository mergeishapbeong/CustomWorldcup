const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const errorHandler = require("./middlewares/error-handler");
const { host } = require("./config/config");
const port = host.port;

// parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// logger
app.use(morgan("dev"));

// router
const apiMainRouter = require("./routes/index");
app.use("/api", [apiMainRouter]);

// errorHandler
app.use(errorHandler);

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});
