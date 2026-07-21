import { authService } from '../services/authService.js';
import { catchAsync } from '../../../common/catchAsync.js';
import { HTTP_STATUS } from '../../../constans/index.js';

export const registerUser = catchAsync(async (req, res, next) => {
    const { fullName, email, password } = req.body;
    const user = await authService.register({ fullName, email, password });
  
    return res.status(HTTP_STATUS.CREATED).json({
      status: 'success',
      data: { user }
    });
  });
  
  export const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const { user, token } = await authService.login({ email, password });
  
    return res.status(HTTP_STATUS.OK).json({
      status: 'success',
      data: { user, token }
    });
  });