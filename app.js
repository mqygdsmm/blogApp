const config = require("./utils/config");
const express = require("express");
require("express-async-errors");

const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blogs");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");

const mongoUrl = config.MONGODB_URI;
mongoose
  .connect(mongoUrl)
  .then((result) => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("failed to connect MongoDB", error);
  });

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testing");
  app.use("/api/testing", testingRouter);
}
app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

module.exports = app;
