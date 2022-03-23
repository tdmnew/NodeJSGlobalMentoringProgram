import { Router } from 'express';

import login from '../controllers';
import { validateLogin } from '../../validations';

const router = Router();

router.route('/').post(validateLogin, login);

export default router;
