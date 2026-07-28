import { prisma } from '../../../database/prismaClient.js'

export const skillRepository = {
    async create(skillData){
        return await prisma.skill.create({
            data: {
                name: skillData.name,
                description: skillData.description,
                level: skillData.level,
                userId: skillData.userId
            }
        });
    },

    async findByUserId(userId){
        return await prisma.skill.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
    },

    async findByNameAndUserId(name, userId){
        return await prisma.skill.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive'
                },
                userId
            }
        });
    }
};