const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const indexRouter = require("./routes/index");
const worldcupRouter = require("./routes/worldcup.routes");
const authRouter = require("./routes/auth.routes");
const likeRouter = require("./routes/like.routes");
const mypageRouter = require("./routes/mypage.routes");
const commentRouter = require("./routes/comment.routes");

app.use("/", [indexRouter]);
app.use("/api/worldcup", [worldcupRouter, commentRouter, likeRouter]);
app.use("/api/auth", [authRouter]);
app.use("/api/mypage", [mypageRouter]);

app.listen(port, () => {
  console.log(`running http://localhost:${port}`);
});
