import { Router } from 'express';

import loginController from '../controllers/login.controller';
import auth from '../../middlewares/auth';
import { validateLogin } from '../../validations';

const router = Router();

const { signToken } = auth;

router.route('/').post(validateLogin, loginController, signToken);

export default router;
