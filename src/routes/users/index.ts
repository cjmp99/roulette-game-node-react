import { Router } from 'express'
import { checkSession } from '../../helpers/jwt';
import { getInfoUser, updateTurns, claimRewards } from '../../controllers/users';

const router = Router()

router.route('/users/:id').get(checkSession, getInfoUser);
router.route('/users/:id').put(checkSession, updateTurns);
router.route('/users/:id/:qty').put(checkSession, claimRewards);

export default router;