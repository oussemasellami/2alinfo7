var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var http = require("http");
var mongo = require("mongoose");
var connectiondb = require("./config/dbconnection.json");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var osrouter = require("./routes/os");
var productrouter = require("./routes/products");
var joueurrouter = require("./routes/joueur");
var { add } = require("./controller/chatcontroller");
var {
  addpartiesocket,
  affichesocket,
} = require("./controller/joueurcontroller");
mongo
  .connect(connectiondb.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connect"))
  .catch(() => console.log("not connected"));

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/os", osrouter);
app.use("/product", productrouter);
app.use("/joueur", joueurrouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", (socket) => {
  console.log("user connected");
  socket.emit("msg", "user is connected");

  socket.on("partie", (data) => {
    addpartiesocket(data);
    // console.log("data:" + data.object, data.name);
    io.emit("partie", data);
  });

  socket.on("aff", async (data) => {
    const r = await affichesocket(data);
    // console.log("data:" + data.object, data.name);
    io.emit("aff", r);
  });

  socket.on("msg1", (data) => {
    add(data.object);
    console.log("data:" + data.object, data.name);
    io.emit("msg1", data);
  });

  socket.on("disconnect", () => {
    io.emit("msg", "user is disconnect");
  });
});

server.listen(3000, console.log("server run"));

module.exports = app;
