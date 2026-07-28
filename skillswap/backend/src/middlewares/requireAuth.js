import jwt from "jsonwebtoken";
import { promisify } from "util";
import { AppError } from "../errors/AppError.js";
import { catchAsync } from "../common/catchAsync.js";
import { config } from "../config/env.js";
import { userRepository } from "../modules/identity/repositories/userRepository.js";

export const requireAuth = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    throw new AppError(
      "No has iniciado sesion. Por favor, provee un token nuevo.",
      401,
    );
  }

  const decodedPayload = await promisify(jwt.verify)(token, config.jwt.secret);

  const currentUser = await userRepository.findByEmail(decodedPayload.email);
  if (!currentUser) {
    throw new AppError(
      "El usuario que genero este tokem ya no existe en el sistema.",
      401,
    );
  }

  req.user = currentUser;
  next();
});
