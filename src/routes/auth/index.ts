import { Router } from 'express'
import { login, logout, registerUser } from '../../controllers/auth';

const router = Router()

router.route('/users/create-account').post(registerUser)
router.route('/users/login').post(login)
router.route('/users/logout').post(logout)

export default router;