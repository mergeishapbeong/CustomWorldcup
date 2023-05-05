const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const { config } = require("./config/config");
const port = config.host.port

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const apiMainRouter = require("./routes/index");

app.use("/api", [apiMainRouter]);

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});
