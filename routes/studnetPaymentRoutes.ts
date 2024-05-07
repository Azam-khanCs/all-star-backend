import express from 'express';
import verifyToken from '../middleware/verifyToken';

import {
	getAllPayments,
	createPayment,
	getPaymentById,
	updatePayment,
	deletePayment,
	getPaymentSumByStdId,
} from '../controllers/studentPaymentController';

const router = express.Router();
router.get('/get', verifyToken, getAllPayments);
router.post('/add', verifyToken, createPayment);
router.get('/getPaymentById/:id', verifyToken, getPaymentById);
router.get('/getPaymentSumByStdId/:id', verifyToken, getPaymentSumByStdId);
router.put('/update/:id', verifyToken, updatePayment);
router.delete('/delete/:id', verifyToken, deletePayment);

export default router;
