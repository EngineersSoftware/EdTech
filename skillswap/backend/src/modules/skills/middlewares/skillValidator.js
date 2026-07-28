import { body, validationResult } from "express-validator";
import { SKILL_LEVELS } from "../../../constans/index.js";

const validationResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach((error) => {
      formattedErrors[error.path] = error.msg;
    });
    return res.status(400).json({
      status: "fail",
      errors: formattedErrors,
    });
  }
  next();
};

export const validateCreateSkill = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la habilidad es requerido")
    .isLength({ max: 50 })
    .withMessage("El nombre de la habilidad no debe exceder los 50 caracteres"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("La descripción es requerida")
    .isLength({ min: 10, max: 300 })
    .withMessage("La descripción debe tener entre 10 y 300 caracteres"),
  body("level"),
  notEmpty()
    .withMessage("El nivel de la habilidad es requerido")
    .isIn(Object.values(SKILL_LEVELS))
    .withMessage(
      `El nivel debe ser uno de los siguientes: ${Object.values(SKILL_LEVELS).join(", ")}`,
    ),

  validationResult,
];
