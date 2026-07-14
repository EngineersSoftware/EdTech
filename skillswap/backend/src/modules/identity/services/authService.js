import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository.js";
import { AppError } from "../../../errors/AppError.js";
import { generateToken } from "../../../utils/jwt.js";

export const authService = {
  async register({ fullName, email, password }) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError("El email ya se encuentra registrado", 400);
    }
    const satRounds = 12;
    const hashedPassword = await bcrypt.hash(password, satRounds);

    const newUser = await userRepository.create({
      fullName,
      email,
      password: hashedPassword,
    });

    const { password: _, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  },

  async login({ email, password }) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError("Credenciales incorrectas, intente nuevamente", 401);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new AppError("Contraseña incorrecta, intente nuevamente", 401);
    }

    const tokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const token = generateToken(tokenPayload);
    const { password: _, ...userWithoutPassword } = user;
    return {
      user: userWithoutPassword,
      token,
    };
  },
};
