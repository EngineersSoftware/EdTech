import { prisma } from "../../../database/prismaClient.js";

export const userRepository = {
  async findByEmail(email) {
    return await prisma.user.findUnique({
      where: { email },
    });
  },

  async create(userData) {
    return await prisma.user.create({
      data: {
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
        wallet: {
          create: {
            balance: 5,
            transactions: {
              amount: 5,
              reason: "Bono de Bienvenida al ecosistema SkillSwap",
            },
          },
        },
      },
      include: {
        wallet: true,
      },
    });
  },
};