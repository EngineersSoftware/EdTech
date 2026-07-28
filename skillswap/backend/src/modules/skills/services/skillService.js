import { skillRepository } from "../repositories/skillRepository.js";
import { AppError } from "../../../errors/AppError.js";
import { logger } from "../../../config/logger.js";

export const skillService = {

    async addSkill(userId, skillData){
        logger.info(`Validando creaciom de habilidad '${skillData.name}' para el usuario: ${userId}`);

        const existingSkill = await skillRepository.findByNameAndUserId(skillData.name, userId);
        if(existingSkill){
            logger.warn(`El usuario ${userId} intento duplicar la habilidad '${skillData.name}'`);
            throw new AppError(`Ya tienes registrada la habilidad '${skillData.name}' en tu perfil.`, 400);
        }

        const newSkill = await skillRepository.create({
            ...skillData,
            userId
        });

        logger.info(`Habilidad '${skillData.name}' agregada exitosamente al usuario: ${userId}`);
        return newSkill;
    },

    async getUserSkills(userId){
        return await skillRepository.findByUserId(userId);
    }
}