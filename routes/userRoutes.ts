import express from 'express';
import verifyToken from '../middleware/verifyToken';
import {
	register,
	login,
	forgotPassword,
	tokenVerification,
	getAllUser,
	updateUser,
	deleteUser,
	resetPassword,
	emailVerification,
	getDashboardStats,
} from '../controllers/userController';
const router = express.Router();
import authenticateAdmin from '../middleware/authenticateAdmin';

router.post('/login', login);
router.post('/register', register);
router.post('/forgotPassword', forgotPassword);
router.post('/tokenVerification/:token', tokenVerification);
router.post('/resetPassword', resetPassword);
router.post('/emailVerification', emailVerification);
// protected route
router.get('/getAllUser', verifyToken, getAllUser);
router.put('/updateUser/:id', verifyToken, updateUser);
router.delete('/deleteUser/:id', verifyToken, deleteUser);
router.get('/getdashboardstats', verifyToken, getDashboardStats);

export default router;
