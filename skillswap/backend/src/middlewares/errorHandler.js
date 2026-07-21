import { AppError } from "../errors/AppError.js";
import { logger } from "../config/logger.js";
import { HTTP_STATUS } from "../constans/index.js";

export const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
  err.status = err.status || 'error';

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  logger.error(`ERROR NO CONTROLADO: ${err.message}\nStack: ${err.stack}`);

  return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Error interno del servidor',
  });
};
