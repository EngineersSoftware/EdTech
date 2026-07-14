import { body, validationResult } from 'express-validator';

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const formattedErrors = {};
    errors.array().forEach(error => {
      formattedErrors[error.path] = error.msg;
    });
    return res.status(400).json({
      status: 'fail',
      data: formattedErrors
    });
  }
  
  next();
};

export const validateRegister = [
  body('fullName')
    .trim()
    .notEmpty().withMessage('El nombre completo es obligatorio.')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres.'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('El correo electrónico es obligatorio.')
    .isEmail().withMessage('El formato del correo electrónico no es válido.')
    .normalizeEmail(), 
  
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres.'),

  validateResult
];

export const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('El correo electrónico es obligatorio.')
    .isEmail().withMessage('El formato del correo electrónico no es válido.')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria.'),
  
  validateResult
];