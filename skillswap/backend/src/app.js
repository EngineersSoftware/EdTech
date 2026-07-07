import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());

app.get("/health", (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "El servidor de skillswap está funcionando correctamente",
  });
});

app.all("/{*splat}", (req, res, next) => {
    const error = new Error(`No se puede encontrar el endpoint ${req.originalUrl} en este servidor`);
    error.statusCode = 404;
    error.status = 'fail';
    error.isOperational = true;
    next(error);
});

app.use(errorHandler);

export default app;