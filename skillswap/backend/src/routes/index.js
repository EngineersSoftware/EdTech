import { Router } from 'express';
import authRoutes from '../modules/identity/routes/authRoutes.js';
import skillRoutes from '../modules/skills/routes/skillRoutes.js';

const globalRouter = Router();

globalRouter.use('/auth', authRoutes);
globalRouter.use('/skills', skillRoutes);

export default globalRouter;