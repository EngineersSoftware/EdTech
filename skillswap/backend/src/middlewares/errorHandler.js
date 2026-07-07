import { AppError } from "../errors/AppError.js";

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  console.error('💥 ERROR NO CONTROLADO: ', err);

  return res.status(500).json({
    stauts: 'error',
    message: 'Error interno del servidor',
  });
};
