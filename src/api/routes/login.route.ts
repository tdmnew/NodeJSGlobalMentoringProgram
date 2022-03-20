import { Router } from 'express';

import { validateLogin } from '../../validations';

const router = Router();

router.route('/').post(validateLogin);

export default router;
