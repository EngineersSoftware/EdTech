import { authService } from '../services/authService.js';

export const registerUser = async (req, res, next) => {
    try {
        const { fullName, email, password } = req.body;
        const user = await authService.register({ fullName, email, password });
        return res.status(201).json({
            status: 'success',
            data: { user}
        })
    } catch (error) {
        next(error);
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login({ email, password });
        return res.status(200).json({
            status: 'success',
            data: { user, token }
        });
    } catch (error) {
        next(error);
    }
}