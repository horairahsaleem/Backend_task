import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import ErrorMiddleware from "./Middlewares/Error.js";
import user from "./Routes/userRoutes.js";
import task from "./Routes/taskRoutes.js";

config({
  path: "./Config/config.env",
});

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/v1", user);
app.use("/api/v1", task);
app.use(ErrorMiddleware);

export default app;
module.exports = app;