import { Router } from 'express';
import authRoutes from '../modules/identity/routes/authRoutes.js';

const globalRouter = Router();

globalRouter.use('/auth', authRoutes);

export default globalRouter;